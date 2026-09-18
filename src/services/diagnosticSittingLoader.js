/**
 * diagnosticSittingLoader — rebuild a diagnostic sitting from its per-attempt
 * snapshot (progress/{uid}/attempts/{attemptId}, written by
 * finishMiniDiagnostic → saveDiagnosticSittingSnapshot) into the
 * { test, answers, diagnosticData } triple the diagnostic engine and the
 * review runner consume.
 *
 * Counterpart of diagnosticReportLoader for scored practice tests, minus the
 * live-test backfill: the diagnostic snapshot is complete by construction
 * (stimulus fields included) and there is no catalog test to fall back to.
 *
 * Use it when Home's "View your diagnosis" opens (App lazy-loads this module).
 */
import { loadAttemptSnapshot } from './practiceTestService';
import { sectionModuleLabel } from './selectors/moduleLabel';
import { rebuildDiagnosticTest, manifestFromServedItemIds } from './miniDiagnostic/buildDiagnosticTest';

/** Matches finishMiniDiagnostic's MINI_DIAGNOSTIC_TEST_ID (not imported: that
 *  module drags the whole plan-generation stack into this chunk). */
export const DIAGNOSTIC_SITTING_TEST_ID = 'mini-diagnostic-v1';

/**
 * Turn a snapshot doc's flat questionsSnapshot back into a multi-module test.
 * Pure; exported for tests.
 *
 * @param {object} snapshotDoc - loadAttemptSnapshot result
 * @returns {object|null} test { id, title, isMiniDiagnostic, diagnosticVariant, modules[] }
 */
export function rebuildSittingTest(snapshotDoc) {
  const snaps = snapshotDoc?.questionsSnapshot;
  if (!Array.isArray(snaps) || snaps.length === 0) return null;
  const moduleMap = new Map();
  snaps.forEach((snap, i) => {
    const modIdx = Number.isFinite(snap.moduleIndex) ? snap.moduleIndex : 0;
    if (!moduleMap.has(modIdx)) {
      moduleMap.set(modIdx, {
        section: snap.section ?? null,
        title: sectionModuleLabel(snap.section ?? null, modIdx),
        questions: [],
      });
    }
    const mod = moduleMap.get(modIdx);
    const qIdx = Number.isFinite(snap.questionIndex) ? snap.questionIndex : mod.questions.length;
    mod.questions[qIdx] = {
      id: snap.id ?? `q-${i}`,
      type: snap.type ?? null,
      question: snap.stem ?? null,
      stem: snap.stem ?? null,
      choices: snap.choices ?? null,
      correctAnswer: snap.correctAnswer ?? null,
      explanation: snap.explanation ?? null,
      difficulty: snap.difficulty ?? null,
      band: snap.band ?? null,
      skills: Array.isArray(snap.skills) ? snap.skills : [],
      domain: snap.domain ?? null,
      passage: snap.passage ?? null,
      passages: snap.passages ?? null,
      studentNotes: snap.studentNotes ?? null,
      questionContinued: snap.questionContinued ?? null,
      diagram: snap.diagram ?? null,
      questionTable: snap.questionTable ?? null,
      questionFormula: snap.questionFormula ?? null,
    };
  });
  const modules = Array.from(moduleMap.keys()).sort((a, b) => a - b).map((k) => {
    const m = moduleMap.get(k);
    // Sparse holes (a missing questionIndex) would crash the engine's forEach.
    m.questions = m.questions.filter(Boolean);
    return m;
  });
  return {
    id: snapshotDoc.testId || DIAGNOSTIC_SITTING_TEST_ID,
    title: 'Your diagnostic',
    isMiniDiagnostic: true,
    diagnosticVariant: snapshotDoc.diagnosticVariant || 'full',
    modules,
  };
}

/**
 * Rebuild the exact QUESTIONS of a sitting that has no snapshot, from the
 * lean record's served item ids. The student's answer choices were never
 * persisted for those records, so `answers` is empty and `answersMissing`
 * is set — enough for the review runner (every question, correct answer,
 * explanation), NOT for the diagnosis report, which must keep its by-domain
 * fallback. Null when the ids don't fill the blueprint or any id has left
 * the banks.
 *
 * @param {object} record - progress.miniDiagnostic
 * @returns {Promise<object|null>} sitting shaped like loadDiagnosticSitting's, plus answersMissing:true
 */
export async function rebuildLegacySitting(record) {
  const manifest = manifestFromServedItemIds({
    variant: record?.diagnosticVariant || 'full',
    itemIds: record?.itemIds,
  });
  if (!manifest) return null;
  const built = await rebuildDiagnosticTest(manifest);
  if (!built) return null;
  // Same shape the snapshot path hands the runner: a plain reviewable test.
  // `isDiagnostic` + the manifest/easy variants are the LIVE runner's
  // routing/finish hooks and must not ride along into review.
  const { isDiagnostic, diagnosticManifest, rwModule2Easy, module2Easy, ...test } = built;
  return {
    test: { ...test, id: DIAGNOSTIC_SITTING_TEST_ID, title: 'Your diagnostic', isMiniDiagnostic: true },
    answers: {},
    answersMissing: true,
    diagnosticData: null,
    scoreBand: record?.scoreBand || null,
    routes: record?.routes || null,
    attemptId: record?.attemptId || null,
    completedAt: record?.completedAt || null,
  };
}

/**
 * Load + rebuild one diagnostic sitting. Prefers the per-attempt snapshot
 * (answers + timing + stimulus, complete by construction); falls back to
 * rebuilding just the questions from the record's item ids when there is no
 * snapshot (records from before 2026-08-24, or a failed snapshot write).
 *
 * @param {object} args
 * @param {string} args.userId
 * @param {string} args.attemptId - miniDiagnostic.attemptId
 * @param {object} [args.record] - progress.miniDiagnostic, enables the item-id fallback
 * @param {boolean} [args.snapshotSaved] - record.sittingSaved; `false` skips the snapshot read
 * @returns {Promise<{test:object, answers:object, answersMissing?:boolean, diagnosticData:object|null, scoreBand:object|null, routes:object|null, attemptId:string, completedAt:string|null}|null>}
 *   null when nothing can be rebuilt
 */
export async function loadDiagnosticSitting({ userId, attemptId, record = null, snapshotSaved } = {}) {
  if (!userId || !attemptId) return null;
  const snap = snapshotSaved === false ? null : await loadAttemptSnapshot(userId, attemptId);
  if (snap && snap.isDiagnostic === true) {
    const test = rebuildSittingTest(snap);
    if (test) {
      return {
        test,
        answers: { ...(snap.answers || {}) },
        diagnosticData: snap.diagnosticData || null,
        scoreBand: snap.scoreBand || null,
        routes: snap.routes || null,
        attemptId,
        completedAt: snap.completedAt || null,
      };
    }
  }
  return record ? rebuildLegacySitting(record) : null;
}
