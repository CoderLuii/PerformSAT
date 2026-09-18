/**
 * Hybrid Study Plan Service
 *
 * Merges deterministic plan output (from studyPlanGenerator) with AI-augmented
 * plan output (from cloud function) into a single canonical artifact, then
 * persists versioned artifacts with full provenance and delta tracking.
 *
 * Each artifact carries:
 *  - The merged plan payload
 *  - Source metadata (which deterministic version, which AI model)
 *  - Longitudinal context (cross-test patterns, prior plan deltas)
 *  - Stable linkage IDs (attemptId, aiArtifactId)
 */

import { db } from '../firebase/config';
import {
  doc, getDoc, updateDoc, setDoc,
  collection, addDoc, getDocs,
  query, orderBy, limit, serverTimestamp,
  runTransaction,
} from 'firebase/firestore';
import { isSafeFirestoreFieldPathKey } from './firestoreFieldPath';
import { isOrphanArtifact } from './studyPlanReset';
import { generateStudyPlan as generateDeterministic } from './studyPlanGenerator';
import { generateStudyPlan as generateAIPlan } from './studyPlanService';
import {
  buildLongitudinalEvidence,
  buildSkillHistoryForAI,
  computePlanDelta,
  mergeHybridPlan,
  reconcileDrillEvidenceWithTest,
  MERGE_VERSION,
} from './studyPlanMerger';

export { buildLongitudinalEvidence, buildSkillHistoryForAI, computePlanDelta, mergeHybridPlan, MERGE_VERSION };

// Firestore rejects writes with `undefined` field values. Round-tripping through
// JSON.stringify drops every undefined key (and any non-serializable value), so
// it's a safe sanitizer for plain data subtrees. Sentinels like serverTimestamp
// must be re-attached AFTER sanitization.
function sanitizeForFirestore(value) {
  if (value === undefined) return null;
  return JSON.parse(JSON.stringify(value));
}

/**
 * Fetch the current studyPlan — first try loading the artifact pointed to
 * by currentStudyPlanArtifactId; fall back to the legacy root field.
 */
export const fetchCurrentStudyPlan = async (userId) => {
  if (!userId) return null;
  try {
    const progressRef = doc(db, 'progress', userId);
    const snap = await getDoc(progressRef);
    if (!snap.exists()) return null;
    const data = snap.data();

    // Prefer artifact-backed plan
    const artId = data.currentStudyPlanArtifactId;
    if (artId) {
      const art = await getStudyPlanArtifact(userId, artId);
      if (art?.plan?.weeks?.length) return art.plan;
    }
    return data.studyPlan || null;
  } catch (err) {
    console.warn('[hybridStudyPlanService] Failed to fetch current study plan:', err.message);
    return null;
  }
};

/**
 * Persist a deterministic-only plan as an artifact (same schema as hybrid,
 * with hasBothSources = false). Returns { artifactId, plan }.
 * This is the primary write path — the full plan lives only in the
 * subcollection doc; the root progress doc gets a lightweight pointer.
 */
export const persistDeterministicArtifact = async (userId, plan, { attemptId = null, sourceTestId = null } = {}) => {
  if (!userId || !plan) return null;

  const sanitized = JSON.parse(JSON.stringify(plan));

  const artifact = {
    plan: sanitized,
    provenance: {
      mergeVersion: MERGE_VERSION,
      sourceDeterministic: { generatedAt: sanitized.generatedAt || new Date().toISOString() },
      sourceAI: null,
      hasBothSources: false,
    },
    longitudinal: { totalTests: 0, totalAttempts: 0, persistentWeaknesses: [], scoreTrajectory: [] },
    delta: { isFirst: true, changes: [] },
    linkage: { attemptId, aiArtifactId: null, sourceTestId },
    version: 1,
    status: 'active',
    generatedAt: sanitized.generatedAt || new Date().toISOString(),
    createdAt: serverTimestamp(),
  };

  const colRef = collection(db, 'progress', userId, 'studyPlanArtifacts');
  const sanitizedArtifact = sanitizeForFirestore(artifact);
  sanitizedArtifact.createdAt = serverTimestamp();
  const artifactRef = await addDoc(colRef, sanitizedArtifact);
  console.log('[hybridStudyPlanService] Deterministic artifact written, id:', artifactRef.id);

  const preview = {
    headline: sanitized.summary?.headline || 'Study Plan',
    weeksCount: sanitized.weeks?.length || 0,
    generatedAt: artifact.generatedAt,
    totalActivities: (sanitized.weeks || []).reduce((s, w) => s + (w.activities?.length || 0), 0),
    totalAssignedQuestions: sanitized.targetedQuestionIds?.length || 0,
    adaptivePoolSize: sanitized.adaptivePractice?.poolIds?.length || 0,
    adaptiveProgress: sanitized.adaptivePracticeState ? {
      answered: sanitized.adaptivePracticeState.answered?.length || 0,
      target: sanitized.adaptivePracticeState.targetQuestions || 15,
      mastery: 0,
      isCompleted: sanitized.adaptivePracticeState.isCompleted || false,
      completedAt: sanitized.adaptivePracticeState.completedAt || null,
    } : null,
    version: 1,
    hasBothSources: false,
  };

  const progressRef = doc(db, 'progress', userId);
  const progressSnap = await getDoc(progressRef);
  const pointer = {
    currentStudyPlanArtifactId: artifactRef.id,
    studyPlanPreview: preview,
    lastUpdated: serverTimestamp(),
  };

  if (progressSnap.exists()) {
    await updateDoc(progressRef, pointer);
  } else {
    await setDoc(progressRef, { userId, ...pointer }, { merge: true });
  }
  console.log('[hybridStudyPlanService] Root pointer updated for artifact:', artifactRef.id);

  return { artifactId: artifactRef.id, plan: sanitized };
};

/**
 * Full hybrid plan generation pipeline.
 *
 * 1. Build longitudinal evidence from all test history
 * 2. Run deterministic generator
 * 3. Attempt AI generation (non-blocking fallback)
 * 4. Merge into canonical artifact
 * 5. Compute delta from previous plan
 * 6. Persist versioned artifact
 */
export const generateAndPersistHybridPlan = async ({
  userId,
  diagnostic,
  userProfile = {},
  completedLessons = {},
  practiceProgress = {},
  practiceTestResults = {},
  skillProgress = null,
  previousPlan = null,
  attemptId = null,
  aiArtifactId = null,
  groundTruth = null,
  answeredQuestionIds = [],
  // Retake guard: when provided and returning true, the pipeline stops before
  // any persistence — a newer attempt's generation owns the plan-of-record
  // now, and a stale write here would regress the pointer to an older
  // diagnosis. Returns null in that case.
  abortIfStale = null,
}) => {
  // Drills that the just-finished test proved didn't transfer must not be
  // credited as recovered (see reconcileDrillEvidenceWithTest).
  const longitudinal = reconcileDrillEvidenceWithTest(
    buildLongitudinalEvidence(practiceTestResults, skillProgress),
    diagnostic,
  );

  // Thread longitudinal + answeredQuestionIds through to the deterministic
  // generator. Dropping `longitudinal` here made `testsWithData` always 1,
  // so every plan (even after test 5) stayed first-plan-capped at 2 weeks
  // with the "Take Practice Test 2" unlock checkpoint.
  const deterministicPlan = generateDeterministic(
    diagnostic,
    userProfile,
    completedLessons,
    practiceProgress,
    previousPlan,
    longitudinal,
    answeredQuestionIds || [],
  );

  // Superseded before the (expensive) AI call — stop here, spend nothing.
  if (abortIfStale && abortIfStale()) return null;

  let aiPlan = null;
  try {
    const longitudinalForAI = {
      totalTests: longitudinal.totalTests,
      totalAttempts: longitudinal.totalAttempts,
      persistentWeaknesses: longitudinal.persistentWeaknesses.slice(0, 8),
      recoveredSkills: (longitudinal.recoveredSkills || []).slice(0, 6),
      scoreTrajectory: longitudinal.scoreTrajectory.slice(-6),
      // Per-test aggregated skill history. The Cloud Function's prompt
      // builder reads lc.skillHistory[skillId].appearances[i].accuracy to
      // emit the "improved since last test" / "new regressions" sections for
      // returning students; the local per-question shape (which
      // studyPlanGenerator consumes) carries no accuracy field, so it is
      // reshaped + size-bounded here (see buildSkillHistoryForAI).
      skillHistory: buildSkillHistoryForAI(longitudinal.skillHistory),
    };
    const aiResult = await generateAIPlan(
      diagnostic,
      userProfile,
      previousPlan ? [previousPlan] : [],
      longitudinalForAI,
      deterministicPlan, // narrate the REAL weeks, not an invented parallel plan
    );
    aiPlan = aiResult;
  } catch (err) {
    console.warn('[hybridStudyPlanService] AI plan generation failed, using deterministic only:', err.message);
  }

  const mergedPlan = mergeHybridPlan(deterministicPlan, aiPlan);

  // Embed diagnosis-personalization fields directly in the canonical plan
  // so the persisted artifact is the single source of truth.
  if (groundTruth) {
    mergedPlan.strengths = groundTruth.strengths;
    mergedPlan.weaknesses = groundTruth.weaknesses;
    mergedPlan.calculatorDependency = groundTruth.calculatorDependency;
    mergedPlan.eliminationEffectiveness = groundTruth.eliminationEffectiveness;
    mergedPlan.persistentWeaknesses = groundTruth.persistentWeaknesses;
    mergedPlan.staminaInsight = groundTruth.staminaInsight;
  }

  const delta = computePlanDelta(previousPlan, mergedPlan, longitudinal.recoveredSkills);

  const artifact = {
    plan: mergedPlan,
    provenance: {
      mergeVersion: MERGE_VERSION,
      sourceDeterministic: { generatedAt: deterministicPlan.generatedAt },
      sourceAI: aiPlan
        ? { generatedAt: aiPlan.generatedAt, model: aiPlan.model }
        : null,
      hasBothSources: !!aiPlan,
    },
    longitudinal: {
      totalTests: longitudinal.totalTests,
      totalAttempts: longitudinal.totalAttempts,
      persistentWeaknesses: longitudinal.persistentWeaknesses.slice(0, 10),
      scoreTrajectory: longitudinal.scoreTrajectory.slice(-10),
    },
    delta,
    linkage: {
      attemptId: attemptId || null,
      aiArtifactId: aiArtifactId || null,
      sourceTestId: diagnostic.testId || null,
    },
    version: 1,
    status: 'active',
    generatedAt: new Date().toISOString(),
    createdAt: serverTimestamp(),
  };

  // Final stale check AFTER the slow AI call, immediately before persistence:
  // a retake completed during the call means this artifact would point the
  // plan-of-record at the superseded diagnosis.
  if (abortIfStale && abortIfStale()) return null;

  const artifactId = await persistHybridArtifact(userId, artifact);

  return { artifactId, artifact };
};

/**
 * Persist a hybrid study-plan artifact and update the progress-doc pointer.
 * The full plan payload lives only in the subcollection doc; the root
 * progress doc gets a lightweight pointer + preview.
 */
async function persistHybridArtifact(userId, artifact) {
  if (!userId || !artifact) return null;

  const progressRef = doc(db, 'progress', userId);
  const colRef = collection(db, 'progress', userId, 'studyPlanArtifacts');
  const sanitizedArtifact = sanitizeForFirestore(artifact);
  sanitizedArtifact.createdAt = serverTimestamp();
  const artifactRef = await addDoc(colRef, sanitizedArtifact);

  const preview = {
    headline: artifact.plan?.summary?.headline || 'Study Plan',
    weeksCount: artifact.plan?.weeks?.length || 0,
    generatedAt: artifact.generatedAt,
    totalActivities: (artifact.plan?.weeks || []).reduce(
      (s, w) => s + (w.activities?.length || 0), 0
    ),
    totalAssignedQuestions: artifact.plan?.targetedQuestionIds?.length || 0,
    adaptivePoolSize: artifact.plan?.adaptivePractice?.poolIds?.length || 0,
    adaptiveProgress: artifact.plan?.adaptivePracticeState ? {
      answered: artifact.plan.adaptivePracticeState.answered?.length || 0,
      target: artifact.plan.adaptivePracticeState.targetQuestions || 15,
      mastery: 0,
      isCompleted: artifact.plan.adaptivePracticeState.isCompleted || false,
      completedAt: artifact.plan.adaptivePracticeState.completedAt || null,
    } : null,
    version: artifact.version,
    hasBothSources: artifact.provenance?.hasBothSources || false,
  };

  const progressSnap = await getDoc(progressRef);
  const artifactId = artifactRef.id;
  const historyEntry = buildHistoryEntry(artifactId, artifact);

  if (progressSnap.exists()) {
    // Top-level DOTTED field paths so the entry lands under
    // studyPlanHistory.entries.<id> and history ACCUMULATES. The old code
    // nested `{ ["entries."+id]: ... }` as the VALUE of studyPlanHistory, so
    // the dot was stored literally and every write replaced the prior history.
    const updatePayload = {
      currentStudyPlanArtifactId: artifactId,
      studyPlanPreview: preview,
      lastUpdated: serverTimestamp(),
    };
    if (isSafeFirestoreFieldPathKey(artifactId)) {
      updatePayload[`studyPlanHistory.entries.${artifactId}`] = historyEntry;
      updatePayload['studyPlanHistory.latestId'] = artifactId;
    } else {
      // Firestore auto-ids are always field-path-safe, so this is defensive:
      // merge into the existing history read above rather than a dotted path.
      const existingHistory = progressSnap.data()?.studyPlanHistory || {};
      updatePayload.studyPlanHistory = {
        ...existingHistory,
        entries: { ...(existingHistory.entries || {}), [artifactId]: historyEntry },
        latestId: artifactId,
      };
    }
    await updateDoc(progressRef, updatePayload);
  } else {
    // set()+merge treats dotted keys as literal fields, so the create case
    // writes a NESTED studyPlanHistory map.
    await setDoc(progressRef, {
      userId,
      currentStudyPlanArtifactId: artifactId,
      studyPlanPreview: preview,
      studyPlanHistory: { entries: { [artifactId]: historyEntry }, latestId: artifactId },
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  }

  return artifactId;
}

function buildHistoryEntry(artifactId, artifact) {
  return {
    id: artifactId,
    generatedAt: artifact.generatedAt,
    sourceTestId: artifact.linkage?.sourceTestId || null,
    headline: artifact.plan?.summary?.headline || 'Study Plan',
    currentScore: artifact.plan?.currentScore || null,
    deltaChanges: artifact.delta?.changes?.length || 0,
  };
}

/**
 * Fetch the N most recent study-plan artifacts for a user.
 */
export const getStudyPlanHistory = async (userId, maxResults = 10) => {
  if (!userId) return [];

  const colRef = collection(db, 'progress', userId, 'studyPlanArtifacts');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(maxResults));
  const snap = await getDocs(q);

  return snap.docs.map(d => ({
    id: d.id,
    generatedAt: d.data().generatedAt,
    headline: d.data().plan?.summary?.headline || 'Study Plan',
    sourceTestId: d.data().linkage?.sourceTestId || null,
    currentScore: d.data().plan?.currentScore || null,
    hasBothSources: d.data().provenance?.hasBothSources || false,
    deltaChanges: d.data().delta?.changes?.length || 0,
    status: d.data().status,
  }));
};

/**
 * Fetch a specific study-plan artifact by ID.
 */
export const getStudyPlanArtifact = async (userId, artifactId) => {
  if (!userId || !artifactId) return null;

  const artifactRef = doc(db, 'progress', userId, 'studyPlanArtifacts', artifactId);
  const snap = await getDoc(artifactRef);
  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
};

/**
 * Fetch the most recent study-plan artifact for a user (regardless of
 * whether the root pointer exists). Used as a last-resort fallback when
 * `currentStudyPlanArtifactId` is missing from the root progress doc.
 */
export const getLatestStudyPlanArtifact = async (userId) => {
  if (!userId) return null;

  const colRef = collection(db, 'progress', userId, 'studyPlanArtifacts');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;

  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};

/**
 * Newest study-plan artifact whose source data still exists.
 *
 * Artifacts can't be deleted client-side, so after a practice-test reset the
 * NEWEST artifact may be an orphan (its source test is gone) while an older
 * one — typically the diagnostic's starter plan — is still valid. The plain
 * latest-query would surface the orphan and the hydration guard would then
 * render the empty state, which reads as "you never took your diagnostic".
 * This walks the newest N artifacts and returns the first non-orphan with a
 * usable plan, or null when none survive. Read-only: the pointer is repaired
 * by the next reset/completion write, not here.
 *
 * @param {string} userId
 * @param {Object} practiceTestResults - current progress.practiceTestResults map
 * @param {number} [maxResults=10]
 * @returns {Promise<Object|null>} artifact ({ id, ...data }) or null
 */
export const getLatestSurvivingStudyPlanArtifact = async (userId, practiceTestResults = {}, maxResults = 10) => {
  if (!userId) return null;

  const colRef = collection(db, 'progress', userId, 'studyPlanArtifacts');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(maxResults));
  const snap = await getDocs(q);
  if (snap.empty) return null;

  for (const d of snap.docs) {
    const art = { id: d.id, ...d.data() };
    if (!art?.plan?.weeks?.length) continue;
    if (isOrphanArtifact(art, practiceTestResults || {})) continue;
    return art;
  }
  return null;
};

/**
 * Patch `plan.adaptivePracticeState` on the current artifact doc.
 * Used after each adaptive answer to persist resume-able progress.
 * Also updates the root preview with a lightweight progress summary.
 */
export const patchAdaptivePracticeState = async (userId, artifactId, serializedState) => {
  if (!userId || !artifactId || !serializedState) return;

  try {
    const answeredCount = serializedState.answered?.length || 0;
    const correctCount = serializedState.correct || 0;
    const mastery = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    const progressRef = doc(db, 'progress', userId);
    const artRef = doc(db, 'progress', userId, 'studyPlanArtifacts', artifactId);

    // One transaction, pointer-checked. The old two-updateDoc version could
    // interleave with a Phase-2 plan swap: the session's patch (targeting the
    // OLD artifact) landed its preview write after the new plan's preview,
    // stamping a superseded session's numbers onto the new plan's card — and
    // a second device mid-drill kept doing so indefinitely.
    await runTransaction(db, async (txn) => {
      const progressSnap = await txn.get(progressRef);
      const currentPointer = progressSnap.exists() ? progressSnap.data().currentStudyPlanArtifactId : null;
      if (currentPointer !== artifactId) return; // superseded — drop silently
      txn.update(artRef, { 'plan.adaptivePracticeState': serializedState });
      txn.update(progressRef, {
        'studyPlanPreview.adaptiveProgress': {
          answered: answeredCount,
          target: serializedState.targetQuestions || 15,
          mastery,
          isCompleted: serializedState.isCompleted || false,
          completedAt: serializedState.completedAt || null,
        },
      });
    });
  } catch (err) {
    console.warn('[hybridStudyPlanService] Failed to patch adaptive state:', err.message);
  }
};
