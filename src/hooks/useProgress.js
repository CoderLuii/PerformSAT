import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc, setDoc, getDoc, serverTimestamp, arrayUnion, deleteField, runTransaction } from 'firebase/firestore';
import { buildFlagEntry, flagKeyFor } from '../services/selectors/flaggedQuestions';
import { markLessonComplete as markComplete, markLessonIncomplete, markChapterComplete as markChapterRead, markChapterIncomplete as markChapterUnread } from '../services/progressService';
// Corpus-free (bundleGuard-safe): one-time upgrade of persisted format-1
// plans whose weeks lack both-section drill activities.
import { upgradeLegacyPlanWeeks, planNeedsUpgrade, PLAN_FORMAT_VERSION } from '../services/planFormatUpgrade';
import { getDueReviewCount, getReviewStats } from '../services/reviewService';
import { recordSkillAttemptsBatch, getSkillDiagnosticSummary as getDiagnostic, getSkillBreakdown as getBreakdown } from '../services/skillService';
import { recordPracticeTestResult as recordTestResult, getPracticeTestBestScore, getPracticeTestAttempts, saveTestProgress as saveProgress, clearTestProgress as clearProgress, resetPracticeTest as resetTest, removeTestAttempt as removeAttempt, getInProgressTest } from '../services/practiceTestService';
// hybridStudyPlanService statically imports studyPlanGenerator, which pulls
// the math bank + topic files + routing service (the whole question corpus)
// into whatever chunk imports it. This hook lives in the MAIN chunk (App.jsx
// imports it eagerly), so the two artifact fetchers below are loaded via
// dynamic import() at their call sites instead (Stage 2b bundle split). Both
// call sites are already promise-chained, so the extra hop is invisible.
import { enqueuePendingSave, removePendingSave, flushPendingSaves } from '../services/pendingTestSaveQueue';
// buildLongitudinalEvidence lives in studyPlanMerger, which is corpus-free
// (imports only a selector) — safe to pull into the main chunk, unlike the
// generators above. Used to keep the score-history strip live-accurate.
import { buildLongitudinalEvidence } from '../services/studyPlanMerger';
import { isOrphanArtifact } from '../services/studyPlanReset';
import { showToast } from '../components/ui/Toaster';

/** How long a test-result save may run before we declare it failed. */
const SAVE_TIMEOUT_MS = 15000;

/**
 * Races a promise against a rejection timer.
 * REQUIRED for test-result saves: with the Firestore web SDK's default
 * memory persistence, batch.commit() HANGS (stays pending forever) on
 * network loss instead of rejecting — a bare catch never fires, so the
 * failure banner would never show without this race.
 *
 * @param {Promise} promise - The save promise to race
 * @param {number} [ms=SAVE_TIMEOUT_MS] - Timeout in milliseconds
 * @returns {Promise} Rejects with Error('save-timeout') when the timer wins
 */
const withTimeout = (promise, ms = SAVE_TIMEOUT_MS) => {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('save-timeout')), ms);
    }),
  ]).finally(() => clearTimeout(timer));
};

// The drill/mid-test autosaves below (skill attempts, bank practice, active
// drill, test progress) are best-effort: they swallow errors so a save blip
// never interrupts a session. Without any signal, though, a student on a dead
// connection silently loses progress. Warn ONCE per session (module-level
// latch) across all four paths so a flaky link can't spam a toast on every
// autosave. Reset on real logout is unnecessary — a reload clears the module.
let bestEffortSaveWarned = false;
const warnBestEffortSaveOnce = () => {
  if (bestEffortSaveWarned) return;
  bestEffortSaveWarned = true;
  showToast({
    type: 'warn',
    message: 'Having trouble saving your progress — your connection may be offline.',
  });
};

/**
 * Hook for managing user progress with real-time Firestore sync
 * @param {string} userId - User ID
 * @returns {Object} Progress state and functions
 */
export const useProgress = (userId) => {
  const [completedLessons, setCompletedLessons] = useState({});
  // Learn-tab chapter read-state — a keyed map { [chapterId]: { completed } } on
  // progress/{uid}, cloned from the completedLessons pattern (see progressService).
  const [chaptersRead, setChaptersRead] = useState({});
  const [practiceProgress, setPracticeProgress] = useState({});
  const [drillDays, setDrillDays] = useState([]);
  const [reviewQueue, setReviewQueue] = useState({});
  const [reviewStreak, setReviewStreak] = useState(null);
  const [skillProgress, setSkillProgress] = useState({});
  const [practiceTestResults, setPracticeTestResults] = useState({});
  const [inProgressTests, setInProgressTests] = useState({});
  const [studyPlan, setStudyPlan] = useState(null);
  const [studyPlanMeta, setStudyPlanMeta] = useState({ artifactId: null, preview: null });
  const [studyPlanArtifact, setStudyPlanArtifact] = useState(null); // Full artifact: { plan, delta, longitudinal, version }
  const [studentFingerprint, setStudentFingerprint] = useState(null);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  // Practice-Bank progress — a SEPARATE store from answeredQuestionIds (which
  // drives study-plan / mini-diagnostic dedup) on purpose: browsing the
  // question bank must never change which questions the study plan serves.
  // `bankPractice` is a per-question result map { [qid]: { c, t } } (c =
  // last-correct, t = last-answered ISO); powers the per-question-type progress
  // shown in the Practice Bank.
  const [bankPractice, setBankPractice] = useState({});
  // The single in-flight, resumable Practice-Bank drill session (or null).
  const [activeDrill, setActiveDrill] = useState(null);
  // "Flag a question, review it later" store — a keyed MAP { [flagKey]: entry }
  // on the progress doc (rides this same onSnapshot listener, needs no rules
  // change, de-dups by key). Written by flagQuestion / unflagQuestion / batch.
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [interventionLog, setInterventionLog] = useState([]);
  const [predictionLog, setPredictionLog] = useState([]);
  // Lean record of the onboarding mini-diagnostic (band + per-domain folds +
  // item ids). Deliberately NOT a practiceTestResults entry — a 24-item
  // check-in must never enter score history or projections.
  const [miniDiagnostic, setMiniDiagnostic] = useState(null);
  const studyPlanWriteInFlight = useRef(false);
  const hydratingArtifact = useRef(false);
  const artifactHydrationFailed = useRef(false); // prevent retry flood on permission errors
  // Pointer-race bookkeeping: the current pointer from the FRESHEST snapshot,
  // the freshest snapshot data (for fallbacks when a re-kicked fetch runs off
  // a dropped snapshot), and a dedupe stamp so a burst of snapshots doesn't
  // re-fetch the same unchanged artifact on every one.
  const latestPointerRef = useRef(null);
  const latestSnapDataRef = useRef(null);
  const lastArtifactFetchRef = useRef({ id: null, ts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Test-save-specific status — deliberately separate from the shared `error`
  // string above, which every write path (lessons/practice/study-plan) reuses.
  const [lastSaveStatus, setLastSaveStatus] = useState(null); // 'saving' | 'saved' | 'failed' | null
  const lastFailedSaveRef = useRef(null);
  const flushedForUid = useRef(null);
  // True once THIS user's first progress snapshot has landed. Distinct from
  // !loading: in the commit where userId first appears, `loading` still
  // renders as false (boot set it false for the no-user state), so effects
  // gating on !loading fire against empty data. Decision-making effects
  // (e.g. the on-ramp gate) must require `hydrated` instead.
  const [hydrated, setHydrated] = useState(false);
  // True when the progress listener errored before any snapshot landed. We
  // still flip `hydrated` true in that case (below) so hydration-gated effects
  // degrade deliberately instead of hanging forever; this flag lets a consumer
  // that cares tell "loaded, genuinely empty" from "load failed".
  const [hydrationFailed, setHydrationFailed] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Per-effect-run guard. `getStudyPlanArtifact` / `getLatestStudyPlanArtifact`
    // promises launched from a snapshot for THIS userId can resolve AFTER the
    // account has switched (the effect re-ran with a new userId). Without this
    // a late resolve would setStudyPlan(previous user's plan). Cleanup flips it
    // true, and every deferred .then / .catch bails when stale.
    let cancelled = false;

    // Re-arm the loading flag for this subscription. Boot renders with no
    // userId (auth still resolving), which lands in the branch above and
    // flips loading false — so when auth resolves, consumers would otherwise
    // see loading=false with EMPTY data until the first snapshot arrives.
    // The on-ramp gate decided "fresh user" inside exactly that window and
    // missed an in-flight check-in resume.
    setLoading(true);
    setHydrated(false);
    setHydrationFailed(false);
    // Re-arm the artifact-hydration failure latch for this subscription. It
    // survives in a ref, so without this reset one transient fetch failure
    // (network blip, or a stale code-split chunk right after a deploy) would
    // keep study-plan hydration disabled for the rest of the session — and
    // even for a DIFFERENT account signing in on the same tab.
    artifactHydrationFailed.current = false;
    // Same account-switch hazard for the other latches: a fetch or write hung
    // when the previous user signed out would leave these true and silently
    // disable ALL plan hydration for the next account on this tab.
    hydratingArtifact.current = false;
    studyPlanWriteInFlight.current = false;
    latestPointerRef.current = null;
    latestSnapDataRef.current = null;
    lastArtifactFetchRef.current = { id: null, ts: 0 };

    const progressRef = doc(db, 'progress', userId);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      progressRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          // Handle both old format (fields with dots) and new format (nested object)
          let completedLessonsData = {};

          if (data.completedLessons && Object.keys(data.completedLessons).length > 0) {
            // New format: nested object
            completedLessonsData = data.completedLessons;
          } else {
            // Old format: check for fields with "completedLessons." prefix
            Object.keys(data).forEach(key => {
              if (key.startsWith('completedLessons.')) {
                const lessonKey = key.replace('completedLessons.', '');
                completedLessonsData[lessonKey] = data[key];
              }
            });
          }

          setCompletedLessons(completedLessonsData);

          // Learn-tab chapter read-state (nested map).
          setChaptersRead(data.chaptersRead || {});

          // Also get practice progress
          setPracticeProgress(data.practiceProgress || {});

          // Per-day drill log (assigned/adaptive drill completions) — feeds
          // CalendarMonth + sessionAdherence via selectors/practicedDays.
          setDrillDays(Array.isArray(data.drillDays) ? data.drillDays : []);

          // Get review queue
          setReviewQueue(data.reviewQueue || {});
          setReviewStreak(data.reviewStreak || null);

          // Get skill progress
          setSkillProgress(data.skillProgress || {});

          // Get practice test results
          setPracticeTestResults(data.practiceTestResults || {});

          // Get in-progress tests, dropping any orphaned IDs that no longer
          // exist in the test list (e.g. `practice-test-1-rw`, which was
          // merged into `practice-test-1` as a full-length SAT).
          {
            const raw = data.inProgressTests || {};
            const orphanedIds = ['practice-test-1-rw'];
            const cleaned = { ...raw };
            orphanedIds.forEach((id) => { delete cleaned[id]; });
            setInProgressTests(cleaned);
          }

          // Get data loop fields
          setStudentFingerprint(data.studentFingerprint || null);
          setAnsweredQuestionIds(data.answeredQuestionIds || []);
          setBankPractice(data.bankPractice || {});
          setActiveDrill(data.activeDrill || null);
          setFlaggedQuestions(data.flaggedQuestions || {});
          setInterventionLog(data.interventionLog || []);
          setPredictionLog(data.predictionLog || []);
          setMiniDiagnostic(data.miniDiagnostic || null);

          // Hydrate study plan: artifact-first, with legacy root field fallback.
          // Guard: never wipe an optimistic plan that saveStudyPlan() set while
          // the artifact write is still in flight or hydration hasn't resolved.
          const incomingPlan = data.studyPlan || null;
          const artifactId = data.currentStudyPlanArtifactId || null;

          setStudyPlanMeta({
            artifactId,
            preview: data.studyPlanPreview || null,
          });

          // Track the freshest pointer + snapshot data for the re-kick path:
          // a snapshot arriving while a fetch is in flight is DROPPED by the
          // hydratingArtifact guard, so the fetch's finally must be able to
          // notice the pointer moved and hydrate the newer artifact itself.
          latestPointerRef.current = artifactId;
          latestSnapDataRef.current = data;

          // When an artifact pointer exists, always hydrate from the artifact
          // subcollection — it carries practiceAssignments and full plan data
          // that the legacy root studyPlan field may lack.
          const hydrateFromPointer = (targetId) => {
            const snapData = latestSnapDataRef.current || {};
            const rootPlan = snapData.studyPlan || null;
            // Dedupe: same artifact fetched successfully moments ago — a
            // burst of unrelated progress-doc writes (drill saves, flags)
            // doesn't need a re-read per snapshot.
            const last = lastArtifactFetchRef.current;
            if (last.id === targetId && Date.now() - last.ts < 2000) return;
            hydratingArtifact.current = true;
            const source = `pointer:${targetId}`;
            console.log('[useProgress] Hydrating study plan via', source);

            import('../services/hybridStudyPlanService')
              .then(({ getStudyPlanArtifact }) => getStudyPlanArtifact(userId, targetId))
              .then(art => {
              // Stale-resolve guard: account switched while this fetch was in
              // flight — do not write the previous user's plan into state.
              if (cancelled) return;
              // Fetch resolved: clear the failure latch so a later transient
              // failure only skips retries until the next success or session.
              artifactHydrationFailed.current = false;
              // Pointer moved while we fetched — drop this stale result
              // silently; the finally block re-kicks for the current pointer.
              if (latestPointerRef.current !== targetId) return;
              if (art?.plan?.weeks?.length) {
                console.log('[useProgress] Artifact hydrated OK via', source, '— weeks:', art.plan.weeks.length);
                lastArtifactFetchRef.current = { id: targetId, ts: Date.now() };
                // Overlay graft (adaptivity audit item 3): reprioritizePlan's
                // adaptiveOverlay is persisted on the ROOT studyPlan field
                // (saveStudyPlan), but the artifact copy — which wins here by
                // design — predates it, so a reload silently discarded the
                // overlay. The artifact stays the source of truth for the
                // PLAN itself (that contract is load-bearing: it carries
                // practiceAssignments + full plan data the root field may
                // lack); only the overlay rides across from the root copy.
                const hydratedPlan = (!art.plan.adaptiveOverlay && rootPlan?.adaptiveOverlay)
                  ? { ...art.plan, adaptiveOverlay: rootPlan.adaptiveOverlay }
                  : art.plan;
                setStudyPlan(hydratedPlan);
                // longitudinal is recomputed live from the CURRENT test results
                // rather than read from the (possibly stale) stored artifact —
                // so the Score History strip drops a reset test's dot
                // immediately instead of waiting for the next plan regeneration.
                setStudyPlanArtifact({ plan: art.plan, delta: art.delta || null, longitudinal: buildLongitudinalEvidence(snapData.practiceTestResults || {}, snapData.skillProgress || null), version: art.version || null });
                setStudyPlanMeta(prev => ({ ...prev, artifactId: art.id }));
              } else if (rootPlan?.weeks?.length) {
                setStudyPlan(rootPlan);
              } else if (!studyPlanWriteInFlight.current) {
                setStudyPlan(prev => prev?.weeks?.length ? prev : null);
              }
            }).catch(err => {
              if (cancelled) return;
              console.warn('[useProgress] Artifact hydration skipped:', err.code || err.message);
              artifactHydrationFailed.current = true; // stop retrying on every snapshot
              if (rootPlan?.weeks?.length) {
                setStudyPlan(rootPlan);
              } else if (!studyPlanWriteInFlight.current) {
                setStudyPlan(prev => prev?.weeks?.length ? prev : null);
              }
            }).finally(() => {
              hydratingArtifact.current = false;
              // Re-kick when the pointer moved during this fetch — the
              // snapshot that carried the new pointer was dropped by the
              // in-flight guard, and nothing else would hydrate it.
              if (!cancelled &&
                  latestPointerRef.current &&
                  latestPointerRef.current !== targetId &&
                  !studyPlanWriteInFlight.current &&
                  !artifactHydrationFailed.current) {
                hydrateFromPointer(latestPointerRef.current);
              }
            });
          };

          if (artifactId && !hydratingArtifact.current && !studyPlanWriteInFlight.current && !artifactHydrationFailed.current) {
            hydrateFromPointer(artifactId);
          } else if (incomingPlan?.weeks?.length && !studyPlanWriteInFlight.current) {
            setStudyPlan(incomingPlan);
          } else if (!artifactId && !hydratingArtifact.current && !studyPlanWriteInFlight.current && !artifactHydrationFailed.current) {
            hydratingArtifact.current = true;
            console.log('[useProgress] Hydrating study plan via latest-query');

            // Survivor-aware: after a practice-test reset the NEWEST artifact
            // can be an orphan (its source test is gone) while the diagnostic's
            // starter plan underneath it is still valid — the plain latest
            // query returned the orphan and the account fell into the
            // first-run "take your diagnostic" state despite a completed
            // diagnostic (2026-08-29 founder repro).
            import('../services/hybridStudyPlanService')
              .then(({ getLatestSurvivingStudyPlanArtifact }) => getLatestSurvivingStudyPlanArtifact(userId, data.practiceTestResults || {}))
              .then(art => {
              // Stale-resolve guard: account switched while this fetch was in
              // flight — do not write the previous user's plan into state.
              if (cancelled) return;
              // Fetch resolved: clear the failure latch so a later transient
              // failure only skips retries until the next success or session.
              artifactHydrationFailed.current = false;
              // Orphan guard: a reset test's artifact can't be deleted
              // client-side, so getLatestStudyPlanArtifact can still surface it
              // after the pointer was cleared. Don't re-hydrate a plan whose
              // source test no longer exists — render the empty state instead.
              const orphan = isOrphanArtifact(art, data.practiceTestResults || {});
              if (art?.plan?.weeks?.length && !orphan) {
                console.log('[useProgress] Artifact hydrated OK via latest-query — weeks:', art.plan.weeks.length);
                // Same overlay graft as the pointer branch above — keep the
                // artifact plan, carry the root field's adaptiveOverlay.
                const hydratedPlan = (!art.plan.adaptiveOverlay && incomingPlan?.adaptiveOverlay)
                  ? { ...art.plan, adaptiveOverlay: incomingPlan.adaptiveOverlay }
                  : art.plan;
                setStudyPlan(hydratedPlan);
                // longitudinal is recomputed live from the CURRENT test results
                // rather than read from the (possibly stale) stored artifact —
                // so the Score History strip drops a reset test's dot
                // immediately instead of waiting for the next plan regeneration.
                setStudyPlanArtifact({ plan: art.plan, delta: art.delta || null, longitudinal: buildLongitudinalEvidence(data.practiceTestResults || {}, data.skillProgress || null), version: art.version || null });
                // NOTE: studyPlanWriteInFlight is OWNED by the writers
                // (saveStudyPlan / saveEditedStudyPlan / plan-upgrade), each
                // of which clears it in a finally. Hydration clearing it here
                // let a slow stale fetch re-open the door for stale snapshots
                // to clobber an optimistic write still in flight.
                setStudyPlanMeta(prev => ({ ...prev, artifactId: art.id }));
              } else if (orphan) {
                setStudyPlan(null);
                setStudyPlanArtifact(null);
              } else if (!studyPlanWriteInFlight.current) {
                setStudyPlan(prev => prev?.weeks?.length ? prev : null);
              }
            }).catch(err => {
              if (cancelled) return;
              console.warn('[useProgress] Artifact hydration skipped:', err.code || err.message);
              artifactHydrationFailed.current = true; // stop retrying on every snapshot
              if (!studyPlanWriteInFlight.current) {
                setStudyPlan(prev => prev?.weeks?.length ? prev : null);
              }
            }).finally(() => {
              hydratingArtifact.current = false;
            });
          }
        } else {
          setCompletedLessons({});
          setChaptersRead({});
          setPracticeProgress({});
          setDrillDays([]);
          setReviewQueue({});
          setReviewStreak(null);
          setSkillProgress({});
          setPracticeTestResults({});
          setInProgressTests({});
          setStudyPlan(null);
          setStudyPlanMeta({ artifactId: null, preview: null });
          setStudyPlanArtifact(null);
          setStudentFingerprint(null);
          setAnsweredQuestionIds([]);
          setBankPractice({});
          setActiveDrill(null);
          // Reset flags too — without this, account A's flagged questions bled
          // into a fresh account B whose progress doc doesn't exist yet.
          setFlaggedQuestions({});
          setInterventionLog([]);
          setPredictionLog([]);
          setMiniDiagnostic(null);
        }
        setLoading(false);
        setHydrated(true);
      },
      (err) => {
        console.error('Error listening to progress:', err);
        setError(err.message);
        setLoading(false);
        // Make failure explicit rather than leaving hydration-gated effects
        // (the on-ramp + inner-onboarding gates in App.jsx) hanging forever on
        // a single listener error. They only require `hydrated`, so flip it
        // true with whatever data we have; `hydrationFailed` records that this
        // was a degraded, not a genuine-empty, hydration.
        setHydrationFailed(true);
        setHydrated(true);
      }
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [userId]);

  // Boot-time flush of test saves that failed in a previous session.
  // The flushedForUid ref guard is mandatory: index.js wraps the app in
  // React.StrictMode, which double-invokes effects in dev — without it the
  // flush (and its toast) would fire twice per login. Firestore-side dupes
  // are additionally blocked by the attemptId idempotency guard in
  // practiceTestService.recordPracticeTestResult.
  useEffect(() => {
    if (!userId || flushedForUid.current === userId) return;
    flushedForUid.current = userId;

    flushPendingSaves(userId, (entry) =>
      withTimeout(recordTestResult(userId, entry.testId, entry.testTitle, entry.results))
    )
      .then(({ flushed }) => {
        if (flushed > 0) {
          showToast({
            type: 'success',
            message: flushed === 1
              ? 'A test result from a previous session has been saved to your account.'
              : `${flushed} test results from a previous session have been saved to your account.`,
          });
        }
      })
      .catch((err) => console.error('[useProgress] Pending test-save flush failed:', err));
  }, [userId]);

  /**
   * Marks a lesson as complete with optimistic update
   * @param {string} moduleId - Module ID
   * @param {number} lessonId - Lesson ID
   * @param {Object} lessonData - Lesson metadata
   */
  const markLessonComplete = async (moduleId, lessonId, lessonData) => {
    const lessonKey = `${moduleId}-${lessonId}`;

    // Optimistic update
    setCompletedLessons(prev => ({
      ...prev,
      [lessonKey]: {
        completed: true,
        moduleId,
        lessonId,
        lessonTitle: lessonData.title,
        lessonType: lessonData.type,
        completedAt: new Date()
      }
    }));

    try {
      await markComplete(userId, moduleId, lessonId, lessonData);
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
      // Rollback optimistic update
      setCompletedLessons(prev => {
        const updated = { ...prev };
        delete updated[lessonKey];
        return updated;
      });
      setError(err.message);
      showToast({ type: 'error', message: 'Could not save your change — check your connection.' });
    }
  };

  /**
   * Toggles lesson completion status
   * @param {string} moduleId - Module ID
   * @param {number} lessonId - Lesson ID
   * @param {Object} lessonData - Lesson metadata
   */
  const toggleLessonComplete = async (moduleId, lessonId, lessonData) => {
    const lessonKey = `${moduleId}-${lessonId}`;
    const isCompleted = completedLessons[lessonKey]?.completed;

    if (isCompleted) {
      // Optimistic update for incomplete
      setCompletedLessons(prev => ({
        ...prev,
        [lessonKey]: {
          ...prev[lessonKey],
          completed: false
        }
      }));

      try {
        await markLessonIncomplete(userId, moduleId, lessonId);
      } catch (err) {
        console.error('Failed to mark lesson incomplete:', err);
        // Rollback
        setCompletedLessons(prev => ({
          ...prev,
          [lessonKey]: {
            ...prev[lessonKey],
            completed: true
          }
        }));
        setError(err.message);
      }
    } else {
      await markLessonComplete(moduleId, lessonId, lessonData);
    }
  };

  /**
   * Checks if a lesson is completed
   * @param {string} moduleId - Module ID
   * @param {number} lessonId - Lesson ID
   * @returns {boolean}
   */
  const isLessonCompleted = (moduleId, lessonId) => {
    const lessonKey = `${moduleId}-${lessonId}`;
    return completedLessons[lessonKey]?.completed || false;
  };

  // ===== Learn-tab chapter read-state =====
  // Mirrors markLessonComplete: optimistic update + rollback + error toast.

  /**
   * Marks a Learn-tab chapter as read (optimistic + rollback on failure).
   * @param {string} chapterId - Chapter ID (e.g. 'math-quadratics')
   * @param {Object} [chapterMeta] - Optional metadata (title, unitId)
   */
  const markChapterComplete = async (chapterId, chapterMeta = {}) => {
    setChaptersRead(prev => ({
      ...prev,
      [chapterId]: { completed: true, chapterId, chapterTitle: chapterMeta.title || null, unitId: chapterMeta.unitId || null, completedAt: new Date() },
    }));
    try {
      await markChapterRead(userId, chapterId, chapterMeta);
    } catch (err) {
      console.error('Failed to mark chapter complete:', err);
      setChaptersRead(prev => {
        const updated = { ...prev };
        delete updated[chapterId];
        return updated;
      });
      setError(err.message);
      showToast({ type: 'error', message: 'Could not save your change — check your connection.' });
    }
  };

  /**
   * Marks a Learn-tab chapter as unread (optimistic + rollback on failure).
   * @param {string} chapterId - Chapter ID
   */
  const unmarkChapterComplete = async (chapterId) => {
    const prevEntry = chaptersRead[chapterId];
    if (!prevEntry?.completed) return;
    setChaptersRead(prev => ({ ...prev, [chapterId]: { ...prev[chapterId], completed: false } }));
    try {
      await markChapterUnread(userId, chapterId);
    } catch (err) {
      console.error('Failed to mark chapter incomplete:', err);
      setChaptersRead(prev => ({ ...prev, [chapterId]: prevEntry }));
      setError(err.message);
      showToast({ type: 'error', message: 'Could not save your change — check your connection.' });
    }
  };

  /**
   * Checks whether a Learn-tab chapter is marked read.
   * @param {string} chapterId - Chapter ID
   * @returns {boolean}
   */
  const isChapterComplete = (chapterId) => !!chaptersRead[chapterId]?.completed;

  /**
   * Gets module progress percentage
   * @param {string} moduleId - Module ID
   * @param {number} totalLessons - Total lessons in module
   * @returns {number} Completion percentage (0-100)
   */
  const getModuleProgress = (moduleId, totalLessons) => {
    if (!totalLessons || totalLessons === 0) return 0;

    const completedCount = Object.keys(completedLessons).filter(key => {
      return key.startsWith(`${moduleId}-`) && completedLessons[key]?.completed;
    }).length;

    return Math.round((completedCount / totalLessons) * 100);
  };

  // ===== Practice Progress Functions =====
  // practiceProgress is FROZEN data: its only writer (recordPracticeAttempt,
  // the legacy free-practice recorder) was removed with the standard/
  // prescriptive practice UI. Existing Firestore data still hydrates into
  // state above; every consumer defaults to {} when it's absent.

  /**
   * Records skill attempts for a completed assigned/adaptive drill session.
   * Never touches practiceProgress (drills have no module/section best-score
   * row) — it only folds the session's answers into skillProgress, so
   * drilling moves mastery and the weakness lists between full tests.
   * One batched Firestore write per session.
   * Best-effort: errors are logged, never thrown.
   * @param {Object} answers - { questionId: { selected, correct, skills } }
   */
  const recordDrillSkillAttempts = async (answers) => {
    if (!userId || !answers) return;
    try {
      const attempts = Object.values(answers)
        .filter(a => a && Array.isArray(a.skills) && a.skills.length > 0)
        .map(a => ({ skills: a.skills, correct: !!a.correct }));
      if (attempts.length === 0) return;
      await recordSkillAttemptsBatch(userId, attempts);
    } catch (err) {
      console.error('[useProgress] Failed to record drill skill attempts:', err);
      warnBestEffortSaveOnce();
    }
  };

  /**
   * Records today as a practiced day in the `drillDays` log. Called when an
   * assigned/adaptive drill session completes — those sessions never write
   * practiceProgress (no module/section row), so without this CalendarMonth
   * and sessionAdherence were blind to drill effort (adaptivity audit item 4).
   * Idempotent: arrayUnion dedupes the YYYY-MM-DD key server-side and the
   * optimistic update dedupes locally. Best-effort: errors logged, not thrown.
   */
  const recordPracticedDay = async () => {
    if (!userId) return;
    const d = new Date();
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    // Optimistic — the calendar dot fills the moment the drill completes.
    setDrillDays(prev => (Array.isArray(prev) && prev.includes(key) ? prev : [...(prev || []), key]));
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, {
        drillDays: arrayUnion(key),
        lastUpdated: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.error('[useProgress] Failed to record practiced day:', err);
    }
  };

  // ===== Practice-Bank progress + resume =====

  /**
   * Records one answered Practice-Bank question into the `bankPractice` map:
   * `{ [questionId]: { c: lastCorrect, t: lastAnsweredAtISO } }`.
   * Powers the per-question-type progress shown in the Practice Bank. Kept
   * separate from `answeredQuestionIds` on purpose (see the state declaration):
   * bank practice must not change study-plan / mini-diagnostic question dedup.
   * Optimistic + best-effort; onSnapshot reconciles.
   *
   * @param {string|number} questionId
   * @param {boolean} correct
   */
  const recordBankPractice = async (questionId, correct) => {
    if (!userId || questionId == null) return;
    const key = String(questionId);
    const rec = { c: !!correct, t: new Date().toISOString() };
    setBankPractice(prev => ({ ...prev, [key]: rec }));
    try {
      const progressRef = doc(db, 'progress', userId);
      // Nested-object merge updates just this key inside bankPractice without
      // a dynamic field path (ids contain '-', never '.', so this is safe).
      await setDoc(progressRef, {
        bankPractice: { [key]: rec },
        lastUpdated: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.error('[useProgress] Failed to record bank practice:', err);
      warnBestEffortSaveOnce();
    }
  };

  /**
   * Persists the in-flight Practice-Bank drill so the student can resume it
   * after leaving or refreshing (mirrors how full tests persist via
   * saveTestProgress). Stores only the resumable essentials (question ids +
   * answers + position + rounds + meta), never the resolved question objects.
   * Optimistic + best-effort.
   *
   * @param {object} session - lean resumable session from buildResumableDrill
   */
  const saveActiveDrill = async (session) => {
    if (!userId || !session) return;
    const withTs = { ...session, savedAt: new Date().toISOString() };
    setActiveDrill(withTs);
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, { activeDrill: withTs, lastUpdated: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.error('[useProgress] Failed to save active drill:', err);
      warnBestEffortSaveOnce();
    }
  };

  /** Clears the saved in-flight Practice-Bank drill (on completion or abandon). */
  const clearActiveDrill = async () => {
    if (!userId) return;
    setActiveDrill(null);
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, { activeDrill: null, lastUpdated: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.error('[useProgress] Failed to clear active drill:', err);
    }
  };

  // ===== Flagged-Questions Functions =====
  // The store is a map field on progress/{uid}. `update` is allowed on the
  // progress doc (only its subcollection DELETES are blocked — see the
  // reset-test gotcha), so unflag is a true delete via deleteField(), no rules
  // change or firebase deploy required. Keys are sanitized in flagKeyFor, so
  // both the nested-merge write and the dotted deleteField path are safe.

  /**
   * Flags one question for later review. Optimistic + best-effort. De-duped by
   * key (re-flagging overwrites its own key, never a duplicate).
   * @param {object} rawEntry - see buildFlagEntry (questionId + section + source + …)
   */
  const flagQuestion = async (rawEntry) => {
    if (!userId || !rawEntry) return;
    const { key, entry } = buildFlagEntry(rawEntry);
    if (!key) return;
    setFlaggedQuestions(prev => ({ ...prev, [key]: entry }));
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, { flaggedQuestions: { [key]: entry }, lastUpdated: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.error('[useProgress] Failed to flag question:', err);
    }
  };

  /**
   * Removes a flag. Accepts a flagKey string or a raw entry (from which the key
   * is derived). Optimistic + best-effort.
   * @param {string|object} keyOrEntry
   */
  const unflagQuestion = async (keyOrEntry) => {
    if (!userId || keyOrEntry == null) return;
    const key = typeof keyOrEntry === 'string' ? keyOrEntry : flagKeyFor(keyOrEntry);
    if (!key) return;
    setFlaggedQuestions(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    try {
      const progressRef = doc(db, 'progress', userId);
      await updateDoc(progressRef, { [`flaggedQuestions.${key}`]: deleteField(), lastUpdated: serverTimestamp() });
    } catch (err) {
      console.error('[useProgress] Failed to unflag question:', err);
    }
  };

  /**
   * Toggles a flag: flag if absent, unflag if present. Returns a promise of the
   * resulting boolean (true = now flagged). Reads current state by key.
   * @param {object} rawEntry
   * @returns {Promise<boolean>}
   */
  const toggleFlagQuestion = async (rawEntry) => {
    if (!rawEntry) return false;
    const key = flagKeyFor(rawEntry);
    if (key && flaggedQuestions[key]) {
      await unflagQuestion(key);
      return false;
    }
    await flagQuestion(rawEntry);
    return true;
  };

  /**
   * Batch-flags many questions in one write (used when a test is submitted with
   * marked-for-review items). Input is a pre-keyed map { [flagKey]: entry } from
   * buildTestFlagEntries — already de-duped. Merges over any existing flags.
   * @param {Object.<string, object>} entryMap
   */
  const flagQuestionsBatch = async (entryMap) => {
    if (!userId || !entryMap || Object.keys(entryMap).length === 0) return;
    setFlaggedQuestions(prev => ({ ...prev, ...entryMap }));
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, { flaggedQuestions: entryMap, lastUpdated: serverTimestamp() }, { merge: true });
    } catch (err) {
      console.error('[useProgress] Failed to batch-flag questions:', err);
    }
  };

  // ===== Review Queue Functions =====

  /**
   * Gets count of questions due for review
   * @returns {number}
   */
  const getDueCount = () => {
    return getDueReviewCount(reviewQueue);
  };

  /**
   * Gets review statistics
   * @returns {{ dueCount: number, totalCount: number, masteredRecently: number }}
   */
  const getReviewStatistics = () => {
    return getReviewStats(reviewQueue);
  };

  // ===== Skill Progress Functions =====

  /**
   * Gets skill diagnostic summary for the dashboard
   * @returns {Object} Diagnostic summary with weak/strong skills, domain progress
   */
  const getSkillDiagnosticSummary = () => {
    return getDiagnostic(skillProgress);
  };

  /**
   * Gets hierarchical skill breakdown (domain > module > section > skills)
   * @returns {Object} Hierarchical skill breakdown
   */
  const getSkillBreakdown = () => {
    return getBreakdown(skillProgress);
  };

  // ===== Practice Test Results Functions =====

  /**
   * Records a practice test result with optimistic update
   * @param {string} testId - Test ID
   * @param {string} testTitle - Test title
   * @param {Object} results - Test results { rawScore, totalQuestions, scaledScore, timedMode, moduleScores }
   */
  const recordPracticeTestAttempt = async (testId, testTitle, results) => {
    console.log('[useProgress] recordPracticeTestAttempt called:', { userId, testId, testTitle, results });

    // Optimistic update
    setPracticeTestResults(prev => {
      const existing = prev[testId];
      const attemptData = {
        attemptId: results.attemptId ?? null,
        completedAt: new Date().toISOString(),
        rawScore: results.rawScore,
        totalQuestions: results.totalQuestions,
        // Mirror practiceTestService's participation signal so the optimistic
        // row matches what Firestore hydrates on the next load.
        answeredCount: results.answers
          ? Object.values(results.answers).filter(v => v !== null && v !== undefined && v !== '').length
          : null,
        scaledScore: results.scaledScore,
        sectionScores: results.sectionScores || null,
        isMultiSection: results.isMultiSection || false,
        timedMode: results.timedMode,
        moduleScores: results.moduleScores,
        diagnosticData: results.diagnosticData || null,
        diagnosticReport: results.diagnosticReport || null,
        scoringVersion: results.scoringVersion || null,
        thetaEstimate: results.thetaEstimate ?? null,
        standardError: results.standardError ?? null,
        routeTaken: results.routeTaken || null,
      };

      if (existing) {
        return {
          ...prev,
          [testId]: {
            ...existing,
            // Prepend: the hydrated invariant is newest-FIRST (trimAttempts
            // sorts desc), so the optimistic row must match or in-session
            // consumers reading attempts[0] would get the PREVIOUS attempt
            // right after a retake.
            attempts: [attemptData, ...(existing.attempts || [])],
            bestScaledScore: Math.max(existing.bestScaledScore, results.scaledScore),
            bestRawScore: Math.max(existing.bestRawScore, results.rawScore),
            // Scale of the latest attempt, surfaced at row level so the goal
            // comparison can tell a section score from a 400-1600 composite (1.4).
            isMultiSection: results.isMultiSection || false,
            totalAttempts: existing.totalAttempts + 1,
            lastAttemptAt: new Date()
          }
        };
      } else {
        return {
          ...prev,
          [testId]: {
            testId,
            testTitle,
            attempts: [attemptData],
            bestScaledScore: results.scaledScore,
            bestRawScore: results.rawScore,
            isMultiSection: results.isMultiSection || false, // scale signal for goal comparison (1.4)
            totalAttempts: 1,
            lastAttemptAt: new Date()
          }
        };
      }
    });

    // NOTE: the optimistic update above is intentionally NOT rolled back on
    // failure — the student must keep seeing their score. The localStorage
    // queue + retry path below makes the failure durable instead.
    setLastSaveStatus('saving');
    try {
      console.log('[useProgress] Calling Firestore recordTestResult...');
      // withTimeout is load-bearing: Firestore's batch.commit() hangs (never
      // rejects) on network loss under default memory persistence.
      await withTimeout(recordTestResult(userId, testId, testTitle, results));
      console.log('[useProgress] Firestore save successful!');
      setLastSaveStatus('saved');
      lastFailedSaveRef.current = null;
      removePendingSave(userId, results.attemptId);
    } catch (err) {
      console.error('[useProgress] Failed to record practice test result:', err);
      setError(err.message);
      lastFailedSaveRef.current = { testId, testTitle, results };
      enqueuePendingSave(userId, lastFailedSaveRef.current);
      setLastSaveStatus('failed');
    }
  };

  /**
   * Retries the most recent failed test-result save (Retry button on the
   * TestResults save-status banner). Safe to call repeatedly: the attemptId
   * idempotency guard in practiceTestService skips duplicate writes when a
   * hung original commit eventually lands.
   */
  const retryLastSave = async () => {
    const pending = lastFailedSaveRef.current;
    if (!pending || !userId) return;
    setLastSaveStatus('saving');
    try {
      await withTimeout(recordTestResult(userId, pending.testId, pending.testTitle, pending.results));
      removePendingSave(userId, pending.results.attemptId);
      lastFailedSaveRef.current = null;
      setLastSaveStatus('saved');
    } catch (err) {
      console.error('[useProgress] Retry of test-result save failed:', err);
      setLastSaveStatus('failed');
    }
  };

  /**
   * Gets best SAT score for a test
   * @param {string} testId - Test ID
   * @returns {number|null} Best scaled score or null
   */
  const getTestBestScore = (testId) => {
    return getPracticeTestBestScore(practiceTestResults, testId);
  };

  /**
   * Gets number of attempts for a test
   * @param {string} testId - Test ID
   * @returns {number} Number of attempts
   */
  const getTestAttempts = (testId) => {
    return getPracticeTestAttempts(practiceTestResults, testId);
  };

  // ===== In-Progress Test Functions =====

  /**
   * Saves test progress (called when user answers questions or navigates)
   * @param {string} testId - Test ID
   * @param {Object} progressData - Current progress state
   */
  const saveTestProgress = async (testId, progressData) => {
    if (!userId) return;

    // Optimistic update
    setInProgressTests(prev => ({
      ...prev,
      [testId]: {
        testId,
        ...progressData,
        lastSavedAt: new Date().toISOString()
      }
    }));

    try {
      await saveProgress(userId, testId, progressData);
    } catch (err) {
      console.error('Failed to save test progress:', err);
      warnBestEffortSaveOnce();
    }
  };

  /**
   * Persist the completed onboarding mini-diagnostic record and fold its item
   * ids into answeredQuestionIds so starter-plan drills exclude seen items.
   * Root-field write (no new subcollection → no firestore.rules change).
   * withTimeout is load-bearing here for the same reason as test saves:
   * Firestore writes hang forever offline, and this fires at the worst
   * possible moment — minute 15 of a brand-new user's first session.
   *
   * @param {Object} record - lean summary from finishMiniDiagnostic
   * @returns {Promise<boolean>} true if persisted, false on timeout/failure
   */
  const saveMiniDiagnostic = async (record) => {
    if (!userId || !record) return false;

    // A focus-weighted check-in's band is sampled from the student's WEAKEST
    // skills — treating it as a representative score deflates the baseline
    // right after two weeks of studying. Carry the last representative
    // (full-variant) band forward; the check-in still refreshes everything
    // else (domains, skills, plan).
    // The carried band inherits the PRIOR record's flag — stamping it clean
    // would launder a deflated first-checkin band into "representative" on
    // the following check-in.
    const toSave = (record?.scoreBandFocusWeighted && miniDiagnostic?.scoreBand)
      ? {
          ...record,
          scoreBand: miniDiagnostic.scoreBand,
          scoreBandFocusWeighted: !!miniDiagnostic.scoreBandFocusWeighted,
        }
      : record;

    // Optimistic update — onSnapshot will confirm.
    setMiniDiagnostic(toSave);

    try {
      const progressRef = doc(db, 'progress', userId);
      const itemIds = (toSave.itemIds || []).slice(0, 400); // arrayUnion limit guard
      // updateDoc (dotted-path semantics on a top-level key) REPLACES the
      // miniDiagnostic map outright. setDoc+merge deep-merged it, so a v2
      // check-in record (no geometry key, different shape) merged INTO the
      // old full-diagnostic record produced chimera data whose domain totals
      // no longer summed to totalCount.
      try {
        await withTimeout(updateDoc(progressRef, {
          miniDiagnostic: toSave,
          ...(itemIds.length > 0 ? { answeredQuestionIds: arrayUnion(...itemIds) } : {}),
          lastUpdated: serverTimestamp(),
        }));
      } catch (err) {
        if (err?.code !== 'not-found') throw err;
        await withTimeout(setDoc(progressRef, {
          miniDiagnostic: toSave,
          ...(itemIds.length > 0 ? { answeredQuestionIds: arrayUnion(...itemIds) } : {}),
          lastUpdated: serverTimestamp(),
        }, { merge: true }));
      }
      return true;
    } catch (err) {
      console.error('Failed to save mini-diagnostic record:', err);
      return false;
    }
  };

  /**
   * Clears test progress (called when test is completed or abandoned)
   * @param {string} testId - Test ID
   */
  const clearTestProgress = async (testId) => {
    if (!userId) return;

    // Optimistic update
    setInProgressTests(prev => {
      const { [testId]: _, ...rest } = prev;
      return rest;
    });

    try {
      await clearProgress(userId, testId);
    } catch (err) {
      console.error('Failed to clear test progress:', err);
    }
  };

  /**
   * Resets a single practice test as if it was never taken — clears its scores,
   * attempt history, resumable progress, and the derived data it seeded (review
   * queue, predictions, and the fingerprint when no tests remain). Optimistically
   * drops the test from both result maps so the catalog card snaps to a clean
   * state; onSnapshot reconciles, re-adding it if the Firestore write fails.
   * Rethrows so the caller can surface a failure toast.
   * @param {string} testId - Test ID
   * @returns {Promise<void>}
   */
  const resetPracticeTest = async (testId) => {
    if (!userId || !testId) return;

    // Optimistic update — clear the two maps the catalog card reads.
    setPracticeTestResults(prev => {
      const { [testId]: _omit, ...rest } = prev;
      return rest;
    });
    setInProgressTests(prev => {
      const { [testId]: _omit, ...rest } = prev;
      return rest;
    });

    try {
      // withTimeout is load-bearing for the same reason as test-result saves:
      // Firestore's updateDoc hangs (never rejects) on network loss under the
      // default memory persistence. Without it a hung write leaves the optimistic
      // clear in state forever — the test looks reset but reappears on reload.
      await withTimeout(resetTest(userId, testId));
    } catch (err) {
      console.error('[useProgress] Failed to reset practice test:', err);
      throw err; // caller shows a failure toast; onSnapshot re-hydrates the row
    }
  };

  /**
   * Removes a single attempt from a test (e.g. a junk retake). onSnapshot
   * re-hydrates the recomputed row; the optimistic update below just avoids a
   * flash of the stale attempt while the write lands.
   * @param {string} testId - Test ID
   * @param {string} attemptId - attemptId to remove
   * @returns {Promise<{removed: boolean, remainingAttempts: number, testRemoved: boolean}>}
   */
  const removeTestAttempt = async (testId, attemptId) => {
    if (!userId || !testId || !attemptId) return { removed: false, remainingAttempts: 0, testRemoved: false };

    // Optimistic: drop the attempt from the row (or the whole row if it was the
    // last one) and recompute best/total so the card updates immediately.
    setPracticeTestResults(prev => {
      const row = prev[testId];
      if (!row || !Array.isArray(row.attempts)) return prev;
      const remaining = row.attempts.filter(a => a?.attemptId !== attemptId);
      if (remaining.length === row.attempts.length) return prev;
      if (remaining.length === 0) {
        const { [testId]: _omit, ...rest } = prev;
        return rest;
      }
      const finiteScaled = remaining.map(a => a.scaledScore).filter(v => typeof v === 'number' && Number.isFinite(v));
      const finiteRaw = remaining.map(a => a.rawScore).filter(v => typeof v === 'number' && Number.isFinite(v));
      const newest = [...remaining].sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0))[0];
      return {
        ...prev,
        [testId]: {
          ...row,
          attempts: remaining,
          bestScaledScore: finiteScaled.length ? Math.max(...finiteScaled) : 0,
          bestRawScore: finiteRaw.length ? Math.max(...finiteRaw) : 0,
          totalAttempts: remaining.length,
          isMultiSection: !!newest?.isMultiSection,
        },
      };
    });

    try {
      return await withTimeout(removeAttempt(userId, testId, attemptId));
    } catch (err) {
      console.error('[useProgress] Failed to remove test attempt:', err);
      throw err; // caller shows a failure toast; onSnapshot re-hydrates the row
    }
  };

  /**
   * Gets in-progress test data
   * @param {string} testId - Test ID
   * @returns {Object|null} In-progress data or null
   */
  const getTestProgress = (testId) => {
    return getInProgressTest(inProgressTests, testId);
  };

  /**
   * Checks if a test has saved progress
   * @param {string} testId - Test ID
   * @returns {boolean}
   */
  const hasTestProgress = (testId) => {
    return !!inProgressTests[testId];
  };

  // ===== Study Plan Functions =====

  /**
   * Saves a study plan to Firestore
   * @param {Object} plan - The generated study plan
   */
  const saveStudyPlan = async (plan) => {
    if (!userId || !plan) return;

    console.log('[useProgress] saveStudyPlan called, hasWeeks:', !!plan?.weeks, 'weeksCount:', plan?.weeks?.length || 0);

    // Optimistic update — show the plan immediately in the UI
    studyPlanWriteInFlight.current = true;
    setStudyPlan(plan);

    // Persist to Firestore so the plan survives page reloads
    try {
      const progressRef = doc(db, 'progress', userId);
      const progressSnap = await getDoc(progressRef);
      // Strip undefined values — Firestore rejects them
      const sanitizedPlan = JSON.parse(JSON.stringify(plan));
      if (progressSnap.exists()) {
        await updateDoc(progressRef, { studyPlan: sanitizedPlan, lastUpdated: serverTimestamp() });
      } else {
        await setDoc(progressRef, { userId, studyPlan: sanitizedPlan, lastUpdated: serverTimestamp() }, { merge: true });
      }
      console.log('[useProgress] Study plan persisted to Firestore');
    } catch (err) {
      console.error('[useProgress] Failed to persist study plan to Firestore:', err);
    } finally {
      studyPlanWriteInFlight.current = false;
    }
  };

  // ===== One-time plan format upgrade (v2: both-section weekly activities) =====
  // Persisted format-1 plans have math-only (often EMPTY) targeted-practice
  // weeks: the generator used to silently drop every R&W gap and any math gap
  // missing the hand-authored module map. upgradeLegacyPlanWeeks backfills
  // drill-shaped activities from plan.weaknesses, APPEND-ONLY (completion is
  // keyed by week/activity index), and stamps planFormatVersion so this runs
  // exactly once per plan. Persists to BOTH the root field and the artifact —
  // completion writes read the artifact, so the two must agree on indexes.
  const planUpgradeInFlight = useRef(false);
  useEffect(() => {
    if (!userId || !studyPlan || planUpgradeInFlight.current) return;
    // CRITICAL guard (adversarial review): while artifact hydration is in
    // flight, a second snapshot can set state to the stale ROOT-field plan
    // copy (the listener's fallback branch). Upgrading THAT copy and writing
    // it over the artifact doc would permanently replace the plan-of-record
    // (which carries practiceAssignments and richer data) with an upgraded
    // stale copy. Bail; the effect re-fires via the studyPlan dep when
    // hydration resolves with the artifact plan.
    if (hydratingArtifact.current || studyPlanWriteInFlight.current) return;
    if (!planNeedsUpgrade(studyPlan)) return;
    const upgraded = upgradeLegacyPlanWeeks(studyPlan);
    if (!upgraded) return;
    planUpgradeInFlight.current = true;
    studyPlanWriteInFlight.current = true;
    setStudyPlan(upgraded);
    (async () => {
      try {
        const sanitized = JSON.parse(JSON.stringify(upgraded));
        const progressRef = doc(db, 'progress', userId);
        await setDoc(progressRef, { studyPlan: sanitized, lastUpdated: serverTimestamp() }, { merge: true });
        const artId = studyPlanMeta.artifactId;
        if (artId) {
          const artRef = doc(db, 'progress', userId, 'studyPlanArtifacts', artId);
          const artSnap = await getDoc(artRef);
          if (artSnap.exists()) {
            await updateDoc(artRef, { plan: sanitized, lastUpdated: serverTimestamp() });
          }
        }
        console.log('[useProgress] Study plan upgraded to format v' + PLAN_FORMAT_VERSION);
      } catch (err) {
        console.error('[useProgress] Plan format upgrade failed (will retry next load):', err);
      } finally {
        studyPlanWriteInFlight.current = false;
        planUpgradeInFlight.current = false;
      }
    })();
  }, [userId, studyPlan, studyPlanMeta.artifactId]);

  /**
   * Marks a study plan activity as complete
   * @param {number} weekIndex - Index of the week (0-based)
   * @param {number} activityIndex - Index of the activity within the week (0-based)
   */
  const markStudyActivityComplete = async (weekIndex, activityIndex) => {
    if (!userId || !studyPlan) return;

    // Optimistic update
    setStudyPlan(prev => {
      if (!prev || !prev.weeks || !prev.weeks[weekIndex]) return prev;
      const updated = JSON.parse(JSON.stringify(prev));
      if (updated.weeks[weekIndex].activities[activityIndex]) {
        updated.weeks[weekIndex].activities[activityIndex].completed = true;
        updated.weeks[weekIndex].activities[activityIndex].completedAt = new Date().toISOString();
      }
      return updated;
    });

    try {
      // Atomic across the artifact + legacy root field. The whole `plan` object
      // must be rewritten (Firestore can't field-path into the weeks ARRAY), so
      // a transaction re-reads and retries if another device wrote concurrently
      // — without it, marking a task done on the iPad would clobber an edit just
      // made on the laptop (read-modify-write lost-update). Firestore offline
      // persistence is disabled, so this carries no offline regression.
      const artId = studyPlanMeta.artifactId;
      const artRef = artId ? doc(db, 'progress', userId, 'studyPlanArtifacts', artId) : null;
      const progressRef = doc(db, 'progress', userId);
      await runTransaction(db, async (tx) => {
        // All reads must precede all writes inside a transaction.
        const artSnap = artRef ? await tx.get(artRef) : null;
        const progressSnap = await tx.get(progressRef);
        const stamp = new Date().toISOString();
        if (artSnap && artSnap.exists()) {
          const plan = artSnap.data().plan ? JSON.parse(JSON.stringify(artSnap.data().plan)) : null;
          if (plan?.weeks?.[weekIndex]?.activities?.[activityIndex]) {
            plan.weeks[weekIndex].activities[activityIndex].completed = true;
            plan.weeks[weekIndex].activities[activityIndex].completedAt = stamp;
            tx.update(artRef, { plan });
          }
        }
        if (progressSnap.exists()) {
          const data = progressSnap.data();
          if (data.studyPlan?.weeks?.[weekIndex]?.activities?.[activityIndex]) {
            const plan = JSON.parse(JSON.stringify(data.studyPlan));
            plan.weeks[weekIndex].activities[activityIndex].completed = true;
            plan.weeks[weekIndex].activities[activityIndex].completedAt = stamp;
            tx.update(progressRef, { studyPlan: plan });
          }
        }
      });
    } catch (err) {
      console.error('[useProgress] Failed to mark activity complete:', err);
      setError(err.message);
      showToast({ type: 'error', message: 'Could not save your change — check your connection.' });
    }
  };

  /**
   * Unmarks a study plan activity (sets it back to incomplete)
   * @param {number} weekIndex - Index of the week (0-based)
   * @param {number} activityIndex - Index of the activity within the week (0-based)
   */
  const unmarkStudyActivityComplete = async (weekIndex, activityIndex) => {
    if (!userId || !studyPlan) return;

    // Optimistic update
    setStudyPlan(prev => {
      if (!prev || !prev.weeks || !prev.weeks[weekIndex]) return prev;
      const updated = JSON.parse(JSON.stringify(prev));
      if (updated.weeks[weekIndex].activities[activityIndex]) {
        updated.weeks[weekIndex].activities[activityIndex].completed = false;
        delete updated.weeks[weekIndex].activities[activityIndex].completedAt;
      }
      return updated;
    });

    try {
      // Atomic across artifact + root, same transaction rationale as
      // markStudyActivityComplete (the weeks array forces a whole-plan rewrite).
      const artId = studyPlanMeta.artifactId;
      const artRef = artId ? doc(db, 'progress', userId, 'studyPlanArtifacts', artId) : null;
      const progressRef = doc(db, 'progress', userId);
      await runTransaction(db, async (tx) => {
        const artSnap = artRef ? await tx.get(artRef) : null;
        const progressSnap = await tx.get(progressRef);
        if (artSnap && artSnap.exists()) {
          const plan = artSnap.data().plan ? JSON.parse(JSON.stringify(artSnap.data().plan)) : null;
          if (plan?.weeks?.[weekIndex]?.activities?.[activityIndex]) {
            plan.weeks[weekIndex].activities[activityIndex].completed = false;
            delete plan.weeks[weekIndex].activities[activityIndex].completedAt;
            tx.update(artRef, { plan });
          }
        }
        if (progressSnap.exists()) {
          const data = progressSnap.data();
          if (data.studyPlan?.weeks?.[weekIndex]?.activities?.[activityIndex]) {
            const plan = JSON.parse(JSON.stringify(data.studyPlan));
            plan.weeks[weekIndex].activities[activityIndex].completed = false;
            delete plan.weeks[weekIndex].activities[activityIndex].completedAt;
            tx.update(progressRef, { studyPlan: plan });
          }
        }
      });
    } catch (err) {
      console.error('[useProgress] Failed to unmark activity:', err);
      setError(err.message);
      showToast({ type: 'error', message: 'Could not save your change — check your connection.' });
    }
  };

  /**
   * Persist a fully-edited study plan (student edits: reschedule / skip / remove
   * / add task / focus areas / pacing). Writes the WHOLE plan to the current
   * artifact and the legacy root field — same dual-write as
   * markStudyActivityComplete — so edits survive reloads (the artifact is the
   * hydration source of truth). Pass the new plan from the studyPlanEditor
   * transforms. A subsequent practice test still regenerates a fresh plan.
   * @param {object} nextPlan - the edited plan to persist
   */
  const saveEditedStudyPlan = async (nextPlan) => {
    if (!userId || !nextPlan?.weeks) return;

    // Optimistic update so the edit shows immediately.
    studyPlanWriteInFlight.current = true;
    setStudyPlan(nextPlan);

    try {
      const sanitized = JSON.parse(JSON.stringify(nextPlan));
      // One transaction for BOTH writes (artifact `plan` field + legacy root
      // `studyPlan`). The previous read-then-write pair could tear under a
      // concurrent edit from another device — artifact holding one version and
      // the root field another, so what the student saw depended on which
      // hydration path won. Whole-plan replacement stays last-writer-wins by
      // design (it's a whole-plan editor); the transaction guarantees the two
      // copies can never diverge from each other.
      const artId = studyPlanMeta.artifactId;
      const progressRef = doc(db, 'progress', userId);
      await runTransaction(db, async (txn) => {
        const artRef = artId ? doc(db, 'progress', userId, 'studyPlanArtifacts', artId) : null;
        const artSnap = artRef ? await txn.get(artRef) : null;
        const progressSnap = await txn.get(progressRef);
        // Whole-plan replacement is last-writer-wins for what the editor
        // EDITS — but adaptive session state is not something the editor
        // touches, and the editor's captured copy can be minutes stale
        // (another device drilling). Carry the freshest persisted adaptive
        // state across so a plan edit never rolls back drill progress.
        const freshAdaptive = artSnap?.exists() ? artSnap.data()?.plan?.adaptivePracticeState : null;
        if (freshAdaptive) sanitized.adaptivePracticeState = freshAdaptive;
        if (artSnap?.exists()) {
          txn.update(artRef, { plan: sanitized, editedAt: serverTimestamp() });
        }
        if (progressSnap.exists()) {
          txn.update(progressRef, { studyPlan: sanitized, lastUpdated: serverTimestamp() });
        } else {
          txn.set(progressRef, { userId, studyPlan: sanitized, lastUpdated: serverTimestamp() }, { merge: true });
        }
      });
    } catch (err) {
      console.error('[useProgress] Failed to save edited study plan:', err);
      setError(err.message);
      showToast({ type: 'error', message: 'Could not save your change — check your connection.' });
    } finally {
      studyPlanWriteInFlight.current = false;
    }
  };

  return {
    completedLessons,
    chaptersRead,
    practiceProgress,
    drillDays,
    reviewQueue,
    reviewStreak,
    skillProgress,
    answeredQuestionIds,
    practiceTestResults,
    inProgressTests,
    studyPlan,
    studyPlanMeta,
    studyPlanArtifact,
    studentFingerprint,
    interventionLog,
    predictionLog,
    miniDiagnostic,
    bankPractice,
    activeDrill,
    flaggedQuestions,
    loading,
    hydrated,
    hydrationFailed,
    error,
    markLessonComplete,
    toggleLessonComplete,
    isLessonCompleted,
    // Learn-tab chapter read-state
    markChapterComplete,
    unmarkChapterComplete,
    isChapterComplete,
    getModuleProgress,
    // Practice functions (drill-based; legacy section-based writers/readers
    // were removed with the standard/prescriptive practice UI)
    recordDrillSkillAttempts,
    recordPracticedDay,
    // Practice-Bank progress + resume
    recordBankPractice,
    saveActiveDrill,
    clearActiveDrill,
    // Flagged-questions (flag-a-question, review-it-later)
    flagQuestion,
    unflagQuestion,
    toggleFlagQuestion,
    flagQuestionsBatch,
    // Review queue functions
    getDueCount,
    getReviewStatistics,
    // Skill progress functions
    getSkillDiagnosticSummary,
    getSkillBreakdown,
    // Practice test results functions
    recordPracticeTestAttempt,
    lastSaveStatus,
    retryLastSave,
    getTestBestScore,
    getTestAttempts,
    // In-progress test functions
    saveTestProgress,
    clearTestProgress,
    resetPracticeTest,
    removeTestAttempt,
    getTestProgress,
    hasTestProgress,
    // Onboarding mini-diagnostic
    saveMiniDiagnostic,
    // Study plan functions
    saveStudyPlan,
    saveEditedStudyPlan,
    markStudyActivityComplete,
    unmarkStudyActivityComplete
  };
};
