import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc, deleteField, serverTimestamp, collection, addDoc, query, where, orderBy, limit, getDocs, runTransaction } from 'firebase/firestore';
import { sanitizeForFirestore, restoreFromFirestore } from '../utils/firestoreSafe';
import { TEST_REVIEW_MODULE_PREFIX } from './reviewQueueResolve';
import { clearPendingSavesForTest, removePendingSave } from './pendingTestSaveQueue';
import { pickSurvivingArtifactId, isDiagnosticSourceTestId } from './studyPlanReset';
import { isSafeFirestoreFieldPathKey } from './firestoreFieldPath';

/**
 * Schema version for the per-attempt snapshot doc.
 * Bump when shape of `progress/{userId}/attempts/{attemptId}` changes.
 */
export const SNAPSHOT_VERSION = 1;

/**
 * Generate a short unique attempt identifier.
 * Format: timestamp-based hex + random suffix for collision safety.
 */
export const generateAttemptId = () => {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}`;
};

// Firestore-safety helpers (nested-array boxing + undefined/NaN scrubbing) are
// imported from the shared pure util (top of file) and re-exported here because
// existing callers/tests import them from this service.
export { sanitizeForFirestore, restoreFromFirestore };

/**
 * Records a practice test result to Firestore.
 *
 * Writes are atomic via Firestore writeBatch:
 *  1. Main aggregate doc at progress/{userId} (existing behavior).
 *  2. Per-attempt snapshot doc at progress/{userId}/attempts/{attemptId} —
 *     contains the question objects the student saw (stem/choices/explanation),
 *     so Review Answers can render the original problem even after content
 *     swaps under the same question ID.
 *
 * If results.questionsSnapshot is missing, the snapshot doc is skipped (a
 * warning is logged) but the main doc is still written so existing flows
 * continue to work during rollout.
 *
 * @param {string} userId - User ID
 * @param {string} testId - Test ID (e.g., "practice-test-1")
 * @param {string} testTitle - Test title (e.g., "Practice Test 1")
 * @param {Object} results - Test results object
 * @param {number} results.rawScore - Number of correct answers
 * @param {number} results.totalQuestions - Total number of questions
 * @param {number} results.scaledScore - SAT scaled score (200-800)
 * @param {boolean} results.timedMode - Whether test was taken in timed mode
 * @param {Array} results.moduleScores - Array of module score objects
 * @param {Array} [results.questionsSnapshot] - Per-question snapshot ([{id, type, stem, choices, ...}])
 * @param {Object} [results.answers] - Answers map { "modIdx-qIdx": userAnswer }
 * @returns {Promise<void>}
 */
export const recordPracticeTestResult = async (userId, testId, testTitle, results) => {
  console.log('[practiceTestService] recordPracticeTestResult called:', { userId, testId, testTitle });

  if (!userId) {
    console.error('[practiceTestService] No userId provided!');
    throw new Error('User ID is required to save practice test results');
  }

  try {
    const progressRef = doc(db, 'progress', userId);

    const attemptId = results.attemptId || generateAttemptId();
    const completedAt = new Date().toISOString();

    const attemptData = {
      attemptId,
      completedAt,
      rawScore: results.rawScore ?? null,
      totalQuestions: results.totalQuestions ?? null,
      // Participation signal: lets downstream consumers (dashboard stats,
      // trend analysis) tell a blank/abandoned submission from a real one.
      answeredCount: results.answers
        ? Object.values(results.answers).filter(v => v !== null && v !== undefined && v !== '').length
        : null,
      scaledScore: results.scaledScore ?? null,
      timedMode: results.timedMode ?? false,
      moduleScores: results.moduleScores ?? [],
      sectionScores: results.sectionScores ?? null,
      isMultiSection: results.isMultiSection ?? false,
      diagnosticData: results.diagnosticData || null,
      diagnosticReport: results.diagnosticReport || null,
      scoringVersion: results.scoringVersion || null,
      thetaEstimate: results.thetaEstimate ?? null,
      standardError: results.standardError ?? null,
      routeTaken: results.routeTaken || null,
      aiArtifactId: results.aiArtifactId || null,
      studyPlanArtifactId: results.studyPlanArtifactId || null,
      // "Mark for Review" refs the student flagged during the test, persisted so
      // they survive reload (and feed the Review Queue's Flagged group). Purely
      // user-driven — no correctness signal is written mid-test.
      markedForReview: Array.isArray(results.markedForReview) ? results.markedForReview : null,
    };

    // Keep only the last MAX_ATTEMPTS per test to prevent document bloat.
    // diagnosticReport is stripped from ALL attempts — it's regenerated on
    // demand from diagnosticData via runDiagnostic when the user views past
    // results (see App.jsx ViewResults fallback). diagnosticData (the per-
    // question telemetry) is preserved on the latest attempt because several
    // services read attempt.diagnosticData.questionDetails for trend
    // analysis, prediction, and study plan generation.
    // NOTE: subcollection snapshot docs are NOT trimmed here — they live under
    // progress/{userId}/attempts/{attemptId} and remain available for Review
    // Answers even when the aggregate row falls off the main doc.
    const MAX_ATTEMPTS = 5;

    const trimAttempts = (attempts) => {
      const sorted = [...attempts].sort((a, b) =>
        new Date(b.completedAt) - new Date(a.completedAt)
      );
      return sorted.slice(0, MAX_ATTEMPTS).map((a, i) => {
        if (i === 0) {
          // Latest: keep diagnosticData, strip the (regenerable) report.
          const { diagnosticReport, ...rest } = a;
          return rest;
        }
        // Older: strip both report and data to keep the main doc lean.
        const { diagnosticReport, diagnosticData, ...slim } = a;
        return slim;
      });
    };

    // EVERY attempts array that enters the transaction goes through this:
    // trim (strips the regenerable diagnosticReport — which historically rode
    // in un-trimmed on a test's FIRST attempt and carried live Set objects
    // Firestore hard-rejects, failing the whole save) and sanitize (scrubs
    // undefined/NaN, boxes nested arrays, converts Set/Map — so the NEXT
    // unserializable value that sneaks into scoring/diagnostic output degrades
    // gracefully instead of losing the student's score).
    const safeAttempts = (attempts) => sanitizeForFirestore(trimAttempts(attempts));

    // Build the snapshot doc payload (or null when caller didn't provide one).
    // Without a snapshot, Review Answers will fall back to the live test file —
    // acceptable during rollout, but the eventual contract is "every attempt
    // carries its own snapshot."
    const hasSnapshot = Array.isArray(results.questionsSnapshot) && results.questionsSnapshot.length > 0;
    if (!hasSnapshot) {
      console.warn('[practiceTestService] No questionsSnapshot provided — skipping per-attempt snapshot write. Review Answers will fall back to live test for this attempt.');
    }

    const snapshotRef = hasSnapshot ? doc(db, 'progress', userId, 'attempts', attemptId) : null;
    const snapshotPayload = hasSnapshot ? {
      attemptId,
      testId,
      completedAt,
      questionsSnapshot: results.questionsSnapshot,
      answers: results.answers || {},
      markedForReview: Array.isArray(results.markedForReview) ? results.markedForReview : null,
      snapshotVersion: SNAPSHOT_VERSION,
    } : null;

    // Atomic transactional read-modify-write. The progress doc (attempts arrays
    // + best-score/counters) and the per-attempt snapshot are committed in ONE
    // transaction, so two concurrent completions (e.g. the same test finished on
    // two devices) or a boot-flush replay overlapping a fresh save can't clobber
    // each other's attempts. Firestore re-runs the callback on contention
    // (re-reading the doc), so attemptId/completedAt are computed ABOVE the
    // transaction to stay stable across retries; the idempotency guard still
    // catches exact-duplicate replays.
    await runTransaction(db, async (tx) => {
      const progressSnap = await tx.get(progressRef);

      if (!progressSnap.exists()) {
        console.log('[practiceTestService] Creating new progress document...');
        // Nested object, NOT a dotted key: set()+merge treats dotted keys as
        // LITERAL field names (only update() splits dots into field paths), so
        // the old dotted form created a junk top-level "practiceTestResults.x"
        // field instead of the nested map every reader expects.
        tx.set(progressRef, {
          userId,
          practiceTestResults: {
            [testId]: {
              testId,
              testTitle,
              attempts: safeAttempts([attemptData]),
              bestScaledScore: results.scaledScore ?? 0,
              bestRawScore: results.rawScore ?? 0,
              // Scale of the latest attempt, surfaced at row level so the goal
              // comparison can distinguish a section score from a composite (1.4).
              isMultiSection: results.isMultiSection ?? false,
              totalAttempts: 1,
              lastAttemptAt: serverTimestamp()
            }
          },
          lastUpdated: serverTimestamp()
        }, { merge: true });
        // NOTE: the per-attempt snapshot is written AFTER this transaction (see
        // below), decoupled so an unserializable snapshot can't lose the score.
        return;
      }

      const currentData = progressSnap.data();
      const existingTest = currentData.practiceTestResults?.[testId];

      // Idempotency guard: a hung offline write can land AFTER the client already
      // timed out, queued the payload, and replayed it (retry button or boot
      // flush). Without this check a replay would append a duplicate attempt and
      // inflate totalAttempts/best-score rows. Returning commits an empty transaction.
      if (existingTest?.attempts?.some(a => a.attemptId === attemptId)) {
        console.log('[practiceTestService] Attempt ' + attemptId + ' already recorded — skipping duplicate write');
        return;
      }

      // Diagnostic: dump per-test sizes when the doc is approaching the 1MB
      // Firestore limit so we can see what's bloating it. No-op for healthy
      // docs to keep logs clean in normal operation.
      try {
        const docKB = Math.round(JSON.stringify(currentData).length / 1024);
        if (docKB > 700) {
          const ptr = currentData.practiceTestResults || {};
          const sizes = Object.entries(ptr).map(([tid, t]) => {
            const totalBytes = JSON.stringify(t).length;
            const attempts = t?.attempts || [];
            const reportBytes = attempts.reduce((s, a) => s + (a?.diagnosticReport ? JSON.stringify(a.diagnosticReport).length : 0), 0);
            const dataBytes = attempts.reduce((s, a) => s + (a?.diagnosticData ? JSON.stringify(a.diagnosticData).length : 0), 0);
            return `${tid}:${Math.round(totalBytes / 1024)}KB(rep=${Math.round(reportBytes / 1024)}KB,data=${Math.round(dataBytes / 1024)}KB,n=${attempts.length})`;
          });
          console.warn('[practiceTestService] DOC AUDIT (>700KB) — total=' + docKB + 'KB | ' + sizes.join(' | '));
        }
      } catch (auditErr) {
        console.warn('[practiceTestService] Audit failed (non-fatal):', auditErr.message);
      }

      // Accumulate every field-path write into ONE update object (a single write
      // to the progress doc inside the transaction).
      const updates = { lastUpdated: serverTimestamp() };

      // Sanitation: trim every OTHER test's attempts to MAX_ATTEMPTS and strip
      // diagnosticReport from the survivors so the doc stays under Firestore's
      // 1MB limit. The report is regenerated on demand via runDiagnostic when the
      // user views past results, so dropping it here is lossless.
      const existingResults = currentData.practiceTestResults || {};
      Object.entries(existingResults).forEach(([otherTestId, otherTest]) => {
        if (otherTestId === testId) return; // current test handled below
        const attempts = otherTest?.attempts || [];
        const overSized = attempts.length > MAX_ATTEMPTS;
        const hasReport = attempts.some((a) => a?.diagnosticReport != null);
        if (!overSized && !hasReport) return;

        const sortedAttempts = [...attempts].sort((a, b) =>
          new Date(b.completedAt || 0) - new Date(a.completedAt || 0)
        );
        const cleaned = sortedAttempts.slice(0, MAX_ATTEMPTS).map((a, i) => {
          if (i === 0) {
            const { diagnosticReport, ...rest } = a;
            return rest;
          }
          const { diagnosticReport, diagnosticData, ...slim } = a;
          return slim;
        });
        updates[`practiceTestResults.${otherTestId}.attempts`] = cleaned;
      });

      if (existingTest) {
        // Update existing test results, trimming old attempts to stay under Firestore 1MB limit
        console.log('[practiceTestService] Updating existing test results...');
        updates[`practiceTestResults.${testId}.attempts`] = safeAttempts([attemptData, ...(existingTest.attempts || [])]);
        updates[`practiceTestResults.${testId}.bestScaledScore`] = Math.max(existingTest.bestScaledScore ?? 0, results.scaledScore ?? 0);
        updates[`practiceTestResults.${testId}.bestRawScore`] = Math.max(existingTest.bestRawScore ?? 0, results.rawScore ?? 0);
        updates[`practiceTestResults.${testId}.isMultiSection`] = results.isMultiSection ?? false; // scale signal for goal comparison (1.4)
        updates[`practiceTestResults.${testId}.totalAttempts`] = (existingTest.totalAttempts ?? 0) + 1;
        updates[`practiceTestResults.${testId}.lastAttemptAt`] = serverTimestamp();
      } else {
        // Add new test to results
        console.log('[practiceTestService] Adding new test to existing document...');
        updates[`practiceTestResults.${testId}`] = {
          testId,
          testTitle,
          attempts: safeAttempts([attemptData]),
          bestScaledScore: results.scaledScore ?? 0,
          bestRawScore: results.rawScore ?? 0,
          isMultiSection: results.isMultiSection ?? false, // scale signal for goal comparison (1.4)
          totalAttempts: 1,
          lastAttemptAt: serverTimestamp()
        };
      }

      tx.update(progressRef, updates);
      // Snapshot is written AFTER the transaction (see below) — decoupled on
      // purpose so a snapshot Firestore can't serialize can't fail the score.
    });

    // Per-attempt snapshot write — DECOUPLED from the score-row transaction
    // above, and best-effort. A snapshot Firestore can't serialize (a table
    // question whose questionTable.rows is a nested array; a stray undefined)
    // must NEVER take down the score row. That coupling was the PT4 data-loss
    // bug: the whole transaction rejected, the score was lost, and every
    // retry/boot-flush replayed the same doomed payload forever. The score is
    // committed by the time we get here; sanitizeForFirestore makes the snapshot
    // itself succeed so Review Answers still works. Runs unconditionally (even
    // when the idempotency guard skipped the score write) so a boot-flush replay
    // can heal a snapshot that failed on an earlier attempt.
    if (snapshotRef && snapshotPayload) {
      try {
        await setDoc(snapshotRef, sanitizeForFirestore(snapshotPayload));
      } catch (snapErr) {
        console.warn('[practiceTestService] Per-attempt snapshot write failed (score row IS saved; Review Answers falls back to live test content for this attempt):', snapErr && snapErr.message);
      }
    }
    console.log('[practiceTestService] Save complete (attemptId=' + attemptId + ', snapshot=' + hasSnapshot + ')');
  } catch (error) {
    console.error('[practiceTestService] Error recording practice test result:', error);
    throw error;
  }
};

/**
 * Persist a DIAGNOSTIC sitting to the same per-attempt snapshot subcollection
 * practice tests use (progress/{uid}/attempts/{attemptId}), so the diagnosis
 * can be rebuilt in full later (Home → "View your diagnosis"). A diagnostic
 * never enters the progress doc's attempts arrays / score history, so this
 * doc is the ONLY durable record of the exact questions, answers and
 * telemetry the student produced. Flagged `isDiagnostic: true` so readers
 * that enumerate attempts can tell it apart from a scored practice test.
 *
 * @param {string} userId
 * @param {object} payload - { attemptId, testId, diagnosticVariant, completedAt,
 *   questionsSnapshot, answers, diagnosticData, scoreBand, routes }
 * @returns {Promise<string>} the attemptId written
 */
export const saveDiagnosticSittingSnapshot = async (userId, payload) => {
  if (!userId || !payload?.attemptId) {
    throw new Error('saveDiagnosticSittingSnapshot: userId and payload.attemptId are required');
  }
  const ref = doc(db, 'progress', userId, 'attempts', payload.attemptId);
  await setDoc(ref, sanitizeForFirestore({
    ...payload,
    isDiagnostic: true,
    snapshotVersion: SNAPSHOT_VERSION,
  }));
  return payload.attemptId;
};

/**
 * Loads the per-attempt snapshot doc (questionsSnapshot + answers).
 * Returns null when the doc is missing — typical for legacy attempts recorded
 * before the snapshot subcollection was wired in. Callers should treat null as
 * "fall back to the live practiceTest{N}.js content + show stale-content notice."
 *
 * @param {string} userId
 * @param {string} attemptId
 * @returns {Promise<Object|null>}
 */
export const loadAttemptSnapshot = async (userId, attemptId) => {
  if (!userId || !attemptId) return null;

  try {
    const snapshotRef = doc(db, 'progress', userId, 'attempts', attemptId);
    const snap = await getDoc(snapshotRef);
    if (!snap.exists()) return null;
    // Reverse the nested-array boxing applied at write time so table questions'
    // questionTable.rows come back as the original [[...],[...]] shape the
    // renderers expect. No-op for snapshots written without the encoding.
    return restoreFromFirestore({ id: snap.id, ...snap.data() });
  } catch (error) {
    console.warn('[practiceTestService] loadAttemptSnapshot error (non-blocking):', error.message);
    return null;
  }
};

/**
 * Gets all practice test results for a user
 * @param {Object} practiceTestResults - Practice test results from user data
 * @returns {Array} Array of test result summaries sorted by last attempt date
 */
export const getPracticeTestSummaries = (practiceTestResults) => {
  if (!practiceTestResults) return [];

  return Object.values(practiceTestResults)
    .map(test => ({
      testId: test.testId,
      testTitle: test.testTitle,
      bestScaledScore: test.bestScaledScore,
      bestRawScore: test.bestRawScore,
      totalAttempts: test.totalAttempts,
      lastAttemptAt: test.lastAttemptAt
    }))
    .sort((a, b) => {
      // Sort by last attempt date, most recent first
      const dateA = a.lastAttemptAt?.toDate?.() || new Date(0);
      const dateB = b.lastAttemptAt?.toDate?.() || new Date(0);
      return dateB - dateA;
    });
};

/**
 * Gets the best score for a specific test
 * @param {Object} practiceTestResults - Practice test results from user data
 * @param {string} testId - Test ID
 * @returns {number|null} Best scaled score or null if not taken
 */
export const getPracticeTestBestScore = (practiceTestResults, testId) => {
  if (!practiceTestResults || !practiceTestResults[testId]) return null;
  return practiceTestResults[testId].bestScaledScore;
};

/**
 * Gets the number of attempts for a specific test
 * @param {Object} practiceTestResults - Practice test results from user data
 * @param {string} testId - Test ID
 * @returns {number} Number of attempts or 0
 */
export const getPracticeTestAttempts = (practiceTestResults, testId) => {
  if (!practiceTestResults || !practiceTestResults[testId]) return 0;
  return practiceTestResults[testId].totalAttempts;
};

/**
 * Saves in-progress test state to Firestore
 * This allows users to resume a test if they leave mid-test
 * @param {string} userId - User ID
 * @param {string} testId - Test ID
 * @param {Object} progressData - Current test progress
 * @param {number} progressData.currentModule - Current module index
 * @param {number} progressData.currentQuestion - Current question index
 * @param {Object} progressData.answers - Answers object { "modIdx-qIdx": answer }
 * @param {Array} progressData.markedForReview - Array of question indices marked for review
 * @param {boolean} progressData.isTimed - Whether test is in timed mode
 * @param {number} progressData.timeRemaining - Remaining time in seconds (for timed mode)
 * @returns {Promise<void>}
 */
export const saveTestProgress = async (userId, testId, progressData) => {
  if (!userId || !testId) {
    console.error('[practiceTestService] saveTestProgress: Missing userId or testId');
    return;
  }

  try {
    const progressRef = doc(db, 'progress', userId);

    // Pass the caller's payload through instead of rebuilding a fixed shape.
    // The old fixed shape silently DROPPED unknown fields (module2Variant /
    // m2VariantManuallySet never survived a resume) and wrote `undefined`
    // for any field the caller omitted — which Firestore rejects outright
    // (the mini-diagnostic's differently-shaped payload hit exactly that).
    // The JSON round-trip deep-strips undefined values.
    //
    // questionTelemetry IS persisted, but SLIMMED to the per-key behavioral
    // signals (timeSpent/visits/answerChanges/usedCalculator/markedForReview).
    // Without it, a mid-test resume re-seeds every pre-resume answer with
    // timeSpent 0 and the diagnostic misclassifies those misses as rushing.
    // Slimming (dropping firstAnswerTime/finalAnswerTime and rounding) keeps
    // the doc-size cost bounded.
    const { questionTelemetry: rawTelemetry, ...passthrough } = progressData;
    const slimTelemetry = rawTelemetry && typeof rawTelemetry === 'object'
      ? Object.fromEntries(Object.entries(rawTelemetry).map(([k, v]) => [k, {
          timeSpent: Math.round(((v && v.timeSpent) || 0) * 10) / 10,
          visits: (v && v.visits) || 0,
          answerChanges: Array.isArray(v && v.answerChanges) ? v.answerChanges : [],
          usedCalculator: !!(v && v.usedCalculator),
          markedForReview: !!(v && v.markedForReview),
        }]))
      : null;
    const inProgressData = JSON.parse(JSON.stringify({
      ...passthrough,
      testId,
      markedForReview: progressData.markedForReview || [],
      eliminatedChoices: progressData.eliminatedChoices || {},
      ...(slimTelemetry ? { questionTelemetry: slimTelemetry } : {}),
      lastSavedAt: new Date().toISOString()
    }));

    // Write first, ask questions only if it fails. This runs on every answer,
    // and the progress doc carries the student's whole history (skillProgress
    // alone serializes to ~70KB), so an existence-check read here meant
    // dragging that entire document down the wire once per saved answer.
    // updateDoc rejects with 'not-found' on a first-ever save; that one case
    // pays an extra round trip, every other save saves a full-doc read.
    //
    // The dotted path is deliberate: it REPLACES this test's entry outright.
    // A nested-object set()+merge would deep-merge instead, so answers the
    // student cleared (e.g. the M2 variant switch wiping that module) would
    // resurrect from the stored copy on the next save.
    try {
      await updateDoc(progressRef, {
        [`inProgressTests.${testId}`]: inProgressData,
        lastUpdated: serverTimestamp()
      });
    } catch (err) {
      if (err?.code !== 'not-found') throw err;
      // Nested object, NOT a dotted key: set()+merge treats dotted keys as
      // literal field names (only update() splits dots into field paths).
      await setDoc(progressRef, {
        userId,
        inProgressTests: { [testId]: inProgressData },
        lastUpdated: serverTimestamp()
      }, { merge: true });
    }
    console.log('[practiceTestService] Test progress saved for:', testId);
  } catch (error) {
    console.error('[practiceTestService] Error saving test progress:', error);
  }
};

/**
 * Clears in-progress test state (called when test is completed or abandoned)
 * @param {string} userId - User ID
 * @param {string} testId - Test ID
 * @returns {Promise<void>}
 */
export const clearTestProgress = async (userId, testId) => {
  if (!userId || !testId) return;

  try {
    const progressRef = doc(db, 'progress', userId);
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const data = progressSnap.data();
      if (data.inProgressTests && data.inProgressTests[testId]) {
        // Targeted field-path delete (mirrors resetPracticeTest) instead of a
        // whole-map rewrite: touching only this key can't clobber a concurrent
        // save of another in-progress test on a second device.
        await updateDoc(progressRef, {
          [`inProgressTests.${testId}`]: deleteField(),
          lastUpdated: serverTimestamp()
        });
        console.log('[practiceTestService] Cleared in-progress test:', testId);
      }
    }
  } catch (error) {
    console.error('[practiceTestService] Error clearing test progress:', error);
  }
};

/**
 * Resets a single practice test so the app behaves as if it was never taken.
 *
 * "Complete reset" without a Cloud Function: the Firestore rules block the
 * client from deleting subcollection docs (attempts / aiDiagnostics /
 * studyPlanArtifacts), but everything a STUDENT actually sees — score history,
 * diagnostic, study-plan weaknesses, projected score, dashboard stats — is
 * live-recomputed from the root-doc fields this function clears, so dropping
 * them makes the test disappear from the entire experience. The orphaned
 * subcollection snapshots stay physically present but unreferenced (the same
 * residue deleteAccount leaves) and are never surfaced again.
 *
 * Clears in ONE transaction (read-modify-write on the progress doc), using
 * targeted field paths (deleteField) rather than whole-map rewrites so a
 * concurrent save of ANY other test (e.g. the boot-time pending-save flush)
 * can never be clobbered:
 *   1. practiceTestResults[testId] — scores + every attempt for this test
 *   2. inProgressTests[testId]     — resumable mid-test state
 *   3. reviewQueue entries this test seeded — full-test misses are keyed
 *      'test::<testId>::std|easy' (reviewQueueResolve.buildTestReviewEntry),
 *      so attribution is exact (no shared-question-id risk)
 *   4. predictionLog entries this test generated (createdAfterTestId === testId)
 *   5. studentFingerprint — only when NO tests remain (it's a whole-student
 *      aggregate; with other tests left it self-heals on the next completion)
 *   6. study-plan pointer — re-points currentStudyPlanArtifactId to the newest
 *      SURVIVING artifact (one whose source test still exists, or a mini-
 *      diagnostic plan), or null when none survive. Plan artifacts can't be
 *      deleted client-side, so re-pointing is how the Study Plan tab stops
 *      showing the reset test's weaknesses. The legacy root studyPlan copy is
 *      dropped so the pointer wins; the hydration listener recomputes the
 *      score-history strip live and skips any orphan artifact it still finds.
 * Then purges any queued offline save for this test (clearPendingSavesForTest)
 * so the boot-time flush can't resurrect the deleted result.
 *
 * Intentionally NOT cleared — no clean per-test attribution and not surfaced as
 * ghost data: skillProgress mastery (entries carry createdAt, not testId, and
 * are also drill-fed), interventionLog (lesson-scoped, no testId), and
 * answeredQuestionIds (a drill-exclusion list shared across tests + the
 * onboarding mini-diagnostic).
 *
 * @param {string} userId - User ID
 * @param {string} testId - Catalog test ID (e.g., "practice-test-1")
 * @returns {Promise<{removedResult: boolean, prunedReviewItems: number, prunedPredictions: number}>}
 */
export const resetPracticeTest = async (userId, testId) => {
  if (!userId || !testId) return { removedResult: false, prunedReviewItems: 0, prunedPredictions: 0 };

  try {
    const progressRef = doc(db, 'progress', userId);

    // Transactional read-modify-write (mirrors recordPracticeTestResult): the
    // boot-time pending-save flush or a completion on another device can write
    // practiceTestResults between a plain read and write. Firestore re-runs
    // this callback on contention, and the map fields are cleared via targeted
    // field paths (deleteField) instead of whole-map rewrites, so a reset can
    // never clobber another test's freshly-saved attempt.
    const summary = await runTransaction(db, async (tx) => {
      // Fresh counters every attempt — the callback re-runs on contention.
      const result = { removedResult: false, prunedReviewItems: 0, prunedPredictions: 0 };
      const snap = await tx.get(progressRef);
      if (!snap.exists()) return result;

      const data = snap.data();
      const updates = { lastUpdated: serverTimestamp() };

      // 1. Completed results — the source every visible surface recomputes from.
      //    `results` (the map minus the reset test) still feeds the fingerprint
      //    and artifact-survivor checks below.
      const results = { ...(data.practiceTestResults || {}) };
      if (Object.prototype.hasOwnProperty.call(results, testId)) {
        delete results[testId];
        result.removedResult = true;
        updates[`practiceTestResults.${testId}`] = deleteField();
      }

      // 2. In-progress (resumable) state.
      if (Object.prototype.hasOwnProperty.call(data.inProgressTests || {}, testId)) {
        updates[`inProgressTests.${testId}`] = deleteField();
      }

      // 3. Review-queue items this test seeded (exact attribution via moduleId).
      const stdMod = `${TEST_REVIEW_MODULE_PREFIX}${testId}::std`;
      const easyMod = `${TEST_REVIEW_MODULE_PREFIX}${testId}::easy`;
      const reviewQueue = data.reviewQueue || {};
      const prunedKeys = Object.keys(reviewQueue).filter((key) => {
        const mod = reviewQueue[key]?.moduleId;
        return mod === stdMod || mod === easyMod;
      });
      if (prunedKeys.length > 0) {
        result.prunedReviewItems = prunedKeys.length;
        // Targeted per-key deletes when every key is a safe string field path
        // (update() splits on '.' and rejects ~*/[] outright). Queue keys are
        // `${moduleId}-${sectionName}-${questionId}` with free-form section
        // names, so guard rather than assume; the whole-map fallback is still
        // race-safe here because it derives from THIS transaction's read.
        if (prunedKeys.every((key) => isSafeFirestoreFieldPathKey(key))) {
          prunedKeys.forEach((key) => { updates[`reviewQueue.${key}`] = deleteField(); });
        } else {
          const prunedQueue = { ...reviewQueue };
          prunedKeys.forEach((key) => { delete prunedQueue[key]; });
          updates.reviewQueue = prunedQueue;
        }
      }

      // 4. Predictions this test generated (an array — no per-element field
      //    path exists, so the filtered array is written whole; atomic in-tx).
      const predictionLog = Array.isArray(data.predictionLog) ? data.predictionLog : [];
      const remainingPredictions = predictionLog.filter((p) => p?.createdAfterTestId !== testId);
      if (remainingPredictions.length !== predictionLog.length) {
        result.prunedPredictions = predictionLog.length - remainingPredictions.length;
        updates.predictionLog = remainingPredictions;
      }

      // 5. Fingerprint only when this was the last test on the account.
      if (Object.keys(results).length === 0 && data.studentFingerprint) {
        updates.studentFingerprint = null;
      }

      // 6. Re-point the study plan to the newest SURVIVING artifact. The plan is a
      //    persisted artifact (regenerated only on test completion) whose docs
      //    can't be deleted client-side, so without this the Study Plan tab keeps
      //    showing the reset test's weaknesses / "What Changed" banner. Folding the
      //    pointer move into THIS write means one snapshot (no flash of a stale
      //    plan); buildLongitudinalEvidence (hydration) keeps the score-history
      //    strip honest, and the hydration orphan guard covers the no-survivor case.
      // Guard on the artifact pointer specifically: a legacy root-only studyPlan
      // (no artifact, no sourceTestId) can't be attributed to a test, so leave it
      // untouched rather than wipe it on an unrelated reset.
      // NOTE: the artifact reads stay PLAIN getDoc/getDocs — the web SDK's
      // tx.get cannot run queries, and these are read-only inputs to the
      // pointer choice (same non-transactional semantics as before); the
      // progress-doc read-modify-write itself is what the transaction protects.
      if (data.currentStudyPlanArtifactId) {
        try {
          // Check the CURRENT artifact directly first. If its source test still
          // exists (or it's the diagnostic's plan — sourceTestId null or
          // 'mini-diagnostic-*', see isDiagnosticSourceTestId), keep the
          // pointer untouched — resetting an unrelated test must not churn the
          // plan. Reading the doc by id also dodges the top-N window: an old
          // current artifact that survives is honored even past any query limit.
          const currentRef = doc(db, 'progress', userId, 'studyPlanArtifacts', data.currentStudyPlanArtifactId);
          const currentSnap = await getDoc(currentRef);
          const currentSourceTestId = currentSnap.exists() ? (currentSnap.data()?.linkage?.sourceTestId ?? null) : undefined;
          const currentSurvives = currentSnap.exists()
            && (isDiagnosticSourceTestId(currentSourceTestId) || Object.prototype.hasOwnProperty.call(results, currentSourceTestId));

          if (!currentSurvives) {
            // Current plan's source test was reset (or the artifact is gone) —
            // re-point to the newest SURVIVING artifact, or null when none
            // survive (the hydration orphan guard then renders the empty state).
            const artifactsCol = collection(db, 'progress', userId, 'studyPlanArtifacts');
            const artSnap = await getDocs(query(artifactsCol, orderBy('createdAt', 'desc'), limit(50)));
            const history = artSnap.docs.map((d) => ({ id: d.id, sourceTestId: d.data()?.linkage?.sourceTestId || null }));
            updates.currentStudyPlanArtifactId = pickSurvivingArtifactId(history, results);
          }
          // Either way, drop the stale legacy root copy so the pointer (or the
          // empty state) wins. NOTE: when the current artifact survives we keep
          // its persisted plan.weaknesses as-is — if a now-reset MIDDLE test
          // contributed a weakness it may briefly linger on Focus Areas until the
          // next completed test regenerates the plan. The Score History strip is
          // always live-correct (buildLongitudinalEvidence at hydration); this
          // weakness staleness is an accepted, self-healing tradeoff.
          updates.studyPlan = null;
        } catch (planErr) {
          console.warn('[practiceTestService] Study-plan re-point skipped (non-fatal):', planErr.message);
        }
      }

      tx.update(progressRef, updates);
      return result;
    });

    // 7. Stop the offline queue from resurrecting the result on next boot.
    clearPendingSavesForTest(userId, testId);

    console.log('[practiceTestService] Reset test', testId, summary);
    return summary;
  } catch (error) {
    console.error('[practiceTestService] Error resetting practice test:', error);
    throw error;
  }
};

/**
 * Removes ONE attempt from a test, recomputing the row's aggregates from the
 * survivors. Unlike resetPracticeTest (which drops the whole test), this
 * surgically deletes a single attempt — e.g. a junk retake a student only did
 * because a prior save silently failed, which would otherwise become the
 * "most recent" attempt driving Review Answers, the dashboard latest-score,
 * and the study plan while the real result hides behind the best-score badge.
 *
 * Behavior:
 *   - Recomputes bestScaledScore / bestRawScore from the SURVIVING attempts.
 *     Unlike the record path (monotonic max), a delete MUST be able to LOWER
 *     the best — that's the whole point — so best* is recomputed from scratch.
 *   - isMultiSection tracks the newest surviving attempt (row-level scale signal).
 *   - When the removed attempt was the last one, the whole test row is dropped.
 *   - Purges any queued offline save for that attemptId so the boot flush can't
 *     resurrect it.
 *   - If the CURRENT study-plan artifact was built from the removed attempt,
 *     re-points to the newest surviving artifact (or null) and drops the stale
 *     legacy root copy — so the plan stops reflecting the deleted attempt.
 *
 * Firestore rules block client deletes of the attempts/{attemptId} snapshot
 * subcollection doc, so (like resetPracticeTest) it's left as harmless orphaned
 * residue — nothing references it once it's out of the attempts array.
 *
 * @param {string} userId - User ID
 * @param {string} testId - Catalog test ID (e.g., "practice-test-4")
 * @param {string} attemptId - attemptId of the attempt to remove
 * @returns {Promise<{removed: boolean, remainingAttempts: number, testRemoved: boolean}>}
 */
export const removeTestAttempt = async (userId, testId, attemptId) => {
  const empty = { removed: false, remainingAttempts: 0, testRemoved: false };
  if (!userId || !testId || !attemptId) return empty;

  try {
    const progressRef = doc(db, 'progress', userId);

    const summary = await runTransaction(db, async (tx) => {
      const result = { removed: false, remainingAttempts: 0, testRemoved: false };
      const snap = await tx.get(progressRef);
      if (!snap.exists()) return result;

      const data = snap.data();
      const testRow = data.practiceTestResults?.[testId];
      if (!testRow || !Array.isArray(testRow.attempts)) return result;

      const remaining = testRow.attempts.filter((a) => a?.attemptId !== attemptId);
      if (remaining.length === testRow.attempts.length) {
        // attemptId not present — nothing to do (already removed / never saved).
        result.remainingAttempts = testRow.attempts.length;
        return result;
      }

      result.removed = true;
      const updates = { lastUpdated: serverTimestamp() };

      if (remaining.length === 0) {
        // Deleting the only attempt = the test has no result anymore. Drop the
        // whole row via a targeted field path (race-safe like resetPracticeTest).
        updates[`practiceTestResults.${testId}`] = deleteField();
        result.testRemoved = true;
      } else {
        // Recompute row aggregates from the SURVIVING attempts. best* recomputed
        // from scratch so a delete can lower them.
        const finiteScaled = remaining
          .map((a) => a.scaledScore)
          .filter((v) => typeof v === 'number' && Number.isFinite(v));
        const finiteRaw = remaining
          .map((a) => a.rawScore)
          .filter((v) => typeof v === 'number' && Number.isFinite(v));
        const newest = [...remaining].sort(
          (a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0)
        )[0];

        updates[`practiceTestResults.${testId}.attempts`] = remaining;
        updates[`practiceTestResults.${testId}.bestScaledScore`] = finiteScaled.length ? Math.max(...finiteScaled) : 0;
        updates[`practiceTestResults.${testId}.bestRawScore`] = finiteRaw.length ? Math.max(...finiteRaw) : 0;
        updates[`practiceTestResults.${testId}.totalAttempts`] = remaining.length;
        updates[`practiceTestResults.${testId}.isMultiSection`] = !!newest?.isMultiSection;
      }

      // Re-point the study plan when it was built from the deleted attempt.
      // Artifacts link by linkage.attemptId (hybridStudyPlanService). Reads stay
      // plain getDoc/getDocs — tx.get can't run queries; the progress-doc RMW is
      // what the transaction protects.
      if (data.currentStudyPlanArtifactId) {
        try {
          const currentRef = doc(db, 'progress', userId, 'studyPlanArtifacts', data.currentStudyPlanArtifactId);
          const currentSnap = await getDoc(currentRef);
          const currentAttemptId = currentSnap.exists() ? (currentSnap.data()?.linkage?.attemptId ?? null) : undefined;
          if (currentSnap.exists() && currentAttemptId === attemptId) {
            const artifactsCol = collection(db, 'progress', userId, 'studyPlanArtifacts');
            const artSnap = await getDocs(query(artifactsCol, orderBy('createdAt', 'desc'), limit(50)));
            // Newest artifact NOT linked to the removed attempt; null if none.
            const survivor = artSnap.docs.find((d) => (d.data()?.linkage?.attemptId ?? null) !== attemptId);
            updates.currentStudyPlanArtifactId = survivor ? survivor.id : null;
            updates.studyPlan = null; // drop stale legacy copy so the pointer wins
          }
        } catch (planErr) {
          console.warn('[practiceTestService] Attempt-delete study-plan re-point skipped (non-fatal):', planErr.message);
        }
      }

      tx.update(progressRef, updates);
      result.remainingAttempts = remaining.length;
      return result;
    });

    // Stop the offline queue from resurrecting this exact attempt on next boot.
    removePendingSave(userId, attemptId);

    console.log('[practiceTestService] Removed attempt', attemptId, 'from', testId, summary);
    return summary;
  } catch (error) {
    console.error('[practiceTestService] Error removing test attempt:', error);
    throw error;
  }
};

/**
 * Gets in-progress test data from the progress object
 * @param {Object} inProgressTests - In-progress tests from user progress data
 * @param {string} testId - Test ID to check
 * @returns {Object|null} In-progress data or null if not found
 */
export const getInProgressTest = (inProgressTests, testId) => {
  if (!inProgressTests || !inProgressTests[testId]) return null;
  return inProgressTests[testId];
};

/**
 * Gets all in-progress tests for display in the test list
 * @param {Object} inProgressTests - In-progress tests from user progress data
 * @returns {Array} Array of in-progress test summaries
 */
export const getInProgressTestSummaries = (inProgressTests) => {
  if (!inProgressTests) return [];

  return Object.values(inProgressTests).map(test => ({
    testId: test.testId,
    currentModule: test.currentModule,
    currentQuestion: test.currentQuestion,
    answeredCount: Object.keys(test.answers || {}).length,
    lastSavedAt: test.lastSavedAt,
    isTimed: test.isTimed
  }));
};

/**
 * Back-link artifact IDs onto a stored attempt record.
 * Called after AI diagnostic or study plan artifacts are created,
 * so the attempt carries pointers to its associated artifacts.
 */
export const linkArtifactToAttempt = async (userId, testId, attemptId, links = {}) => {
  if (!userId || !testId || !attemptId) return;

  try {
    const progressRef = doc(db, 'progress', userId);

    // Transactional read-modify-write (mirrors recordPracticeTestResult): this
    // rewrites the whole attempts array, so a plain getDoc→updateDoc raced a
    // concurrent test-completion write and could drop the just-saved attempt.
    // Firestore re-runs the callback on contention, re-reading the array.
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(progressRef);
      if (!snap.exists()) return;

      const data = snap.data();
      const testRecord = data.practiceTestResults?.[testId];
      if (!testRecord?.attempts) return;

      const attemptIdx = testRecord.attempts.findIndex(a => a.attemptId === attemptId);
      if (attemptIdx === -1) return;

      const patch = {};
      if (links.aiArtifactId) patch.aiArtifactId = links.aiArtifactId;
      if (links.studyPlanArtifactId) patch.studyPlanArtifactId = links.studyPlanArtifactId;
      if (Object.keys(patch).length === 0) return;

      const nextAttempts = testRecord.attempts.map((a, i) =>
        i === attemptIdx ? { ...a, ...patch } : a
      );
      tx.update(progressRef, {
        [`practiceTestResults.${testId}.attempts`]: nextAttempts,
      });
    });
  } catch (err) {
    console.warn('[practiceTestService] linkArtifactToAttempt error (non-blocking):', err.message);
  }
};

// ===== AI Diagnostic Artifact Storage =====

/**
 * AI diagnostic status lifecycle:
 *   'generating' -> 'ready' | 'failed'
 *
 * Stored per-attempt in a subcollection so each test run carries its own
 * AI narrative artifact that the results page can hydrate from.
 */

export const AI_DIAGNOSTIC_STATUS = {
  GENERATING: 'generating',
  READY: 'ready',
  FAILED: 'failed',
};

/**
 * Creates a placeholder artifact when generation starts, returns its ID.
 */
export const createAiDiagnosticArtifact = async (userId, testId, attemptTimestamp, attemptId = null) => {
  if (!userId || !testId) return null;

  const colRef = collection(db, 'progress', userId, 'aiDiagnostics');
  const data = {
    testId,
    attemptTimestamp,
    status: AI_DIAGNOSTIC_STATUS.GENERATING,
    createdAt: serverTimestamp(),
  };
  if (attemptId) data.attemptId = attemptId;

  const artifactRef = await addDoc(colRef, data);
  return artifactRef.id;
};

/**
 * Marks an artifact as ready with the full narrative payload.
 */
export const completeAiDiagnosticArtifact = async (userId, artifactId, narrative, meta = {}) => {
  if (!userId || !artifactId) return;

  const artifactRef = doc(db, 'progress', userId, 'aiDiagnostics', artifactId);
  const updatePayload = {
    status: AI_DIAGNOSTIC_STATUS.READY,
    narrative,
    generatedAt: meta.generatedAt || new Date().toISOString(),
    model: meta.model || 'unknown',
    completedAt: serverTimestamp(),
  };

  if (meta.promptVersion) updatePayload.promptVersion = meta.promptVersion;
  if (meta.quality) {
    updatePayload.qualityScore = meta.quality.total ?? null;
    updatePayload.qualityRepaired = meta.quality.repaired ?? false;
    updatePayload.qualityFailed = meta.quality.repairFailed ?? false;
    updatePayload.qualityOutcome = meta.quality.repairFailed ? 'fallback' : meta.quality.repaired ? 'repaired' : 'accepted';
  }

  await updateDoc(artifactRef, updatePayload);
};

/**
 * Marks an artifact as failed so the UI can show fallback + retry.
 */
export const failAiDiagnosticArtifact = async (userId, artifactId, errorMessage) => {
  if (!userId || !artifactId) return;

  const artifactRef = doc(db, 'progress', userId, 'aiDiagnostics', artifactId);
  await updateDoc(artifactRef, {
    status: AI_DIAGNOSTIC_STATUS.FAILED,
    errorMessage: errorMessage || 'Unknown error',
    failedAt: serverTimestamp(),
  });
};

/**
 * Fetches the latest AI diagnostic artifact for a specific test.
 * Returns null if nothing exists or the artifact is still generating.
 */
export const getLatestAiDiagnostic = async (userId, testId) => {
  if (!userId || !testId) return null;

  const colRef = collection(db, 'progress', userId, 'aiDiagnostics');
  const q = query(
    colRef,
    where('testId', '==', testId),
    orderBy('createdAt', 'desc'),
    limit(1),
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
};

/**
 * Fetches a ready AI diagnostic artifact for a specific test attempt.
 * Filters by attemptTimestamp (when provided) and status === 'ready'.
 * Falls back to the latest ready artifact for the test if no
 * attempt-specific match is found.
 */
export const getReadyAiDiagnostic = async (userId, testId, attemptTimestamp) => {
  if (!userId || !testId) return null;

  const colRef = collection(db, 'progress', userId, 'aiDiagnostics');

  if (attemptTimestamp) {
    const attemptQ = query(
      colRef,
      where('testId', '==', testId),
      where('attemptTimestamp', '==', attemptTimestamp),
      where('status', '==', AI_DIAGNOSTIC_STATUS.READY),
      orderBy('createdAt', 'desc'),
      limit(1),
    );
    const attemptSnap = await getDocs(attemptQ);
    if (!attemptSnap.empty) {
      const d = attemptSnap.docs[0];
      return { id: d.id, ...d.data() };
    }
  }

  const fallbackQ = query(
    colRef,
    where('testId', '==', testId),
    where('status', '==', AI_DIAGNOSTIC_STATUS.READY),
    orderBy('createdAt', 'desc'),
    limit(1),
  );
  const fallbackSnap = await getDocs(fallbackQ);
  if (fallbackSnap.empty) return null;

  const d = fallbackSnap.docs[0];
  return { id: d.id, ...d.data() };
};
