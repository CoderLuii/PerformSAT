/**
 * studyPlanReset — pure decision helpers for keeping the study plan coherent
 * after a practice-test reset.
 *
 * Study-plan artifacts can't be deleted client-side (firestore.rules block
 * subcollection deletes), so when a test is reset we cannot remove the artifact
 * it generated. Instead we RE-POINT the current-plan pointer to the newest
 * SURVIVING artifact and let the hydration listener skip any orphan it still
 * finds via getLatestStudyPlanArtifact. This module holds the (unit-testable)
 * selection logic; the Firestore reads/writes live in useProgress.
 */

/**
 * True for a source id that names the DIAGNOSTIC rather than a catalog
 * practice test: null/undefined (v1 onboarding plans carried no source) or the
 * 'mini-diagnostic-*' id finishMiniDiagnostic stamps on the v2 starter plan
 * (MINI_DIAGNOSTIC_TEST_ID — not imported: that module drags the whole
 * plan-generation stack in). The diagnostic never lives in practiceTestResults,
 * so its plan can never be orphaned by a practice-test reset.
 *
 * @param {string|null|undefined} sourceTestId
 * @returns {boolean}
 */
export const isDiagnosticSourceTestId = (sourceTestId) =>
  sourceTestId == null || String(sourceTestId).startsWith('mini-diagnostic');

/**
 * Pick the newest study-plan artifact that still belongs to existing data.
 *
 * An artifact survives a reset when EITHER it was generated from the
 * diagnostic (isDiagnosticSourceTestId — the diagnostic is never a
 * practiceTestResults entry, so it can't be reset away) OR its source test is
 * still present in practiceTestResults. `history` is newest-first (the order
 * getStudyPlanHistory returns), so the first match is the newest survivor.
 *
 * @param {Array<{id: string, sourceTestId: string|null}>} history - artifacts, newest first
 * @param {Object} remainingTestResults - practiceTestResults map AFTER the reset
 * @returns {string|null} the surviving artifact id, or null if none survive
 */
export const pickSurvivingArtifactId = (history = [], remainingTestResults = {}) => {
  const results = remainingTestResults || {};
  const survivor = (history || []).find(
    (a) =>
      a &&
      a.id &&
      (isDiagnosticSourceTestId(a.sourceTestId) ||
        Object.prototype.hasOwnProperty.call(results, a.sourceTestId)),
  );
  return survivor ? survivor.id : null;
};

/**
 * True when a hydrated artifact is orphaned: it was generated from a test that
 * no longer exists in practiceTestResults (e.g. the test was reset). A
 * diagnostic artifact (sourceTestId null or 'mini-diagnostic-*') is never an
 * orphan — resetting every practice test must leave the student on the plan
 * their diagnostic built, not on the first-run "take your diagnostic" screen.
 *
 * Used as a last-resort guard in the latest-query hydration fallback so a
 * deleted test's undeletable artifact can't re-hydrate as the current plan.
 *
 * @param {Object|null} artifact - a study-plan artifact ({ linkage: { sourceTestId } })
 * @param {Object} practiceTestResults - current practiceTestResults map
 * @returns {boolean}
 */
export const isOrphanArtifact = (artifact, practiceTestResults = {}) => {
  const sourceTestId = artifact?.linkage?.sourceTestId;
  if (isDiagnosticSourceTestId(sourceTestId)) return false;
  return !Object.prototype.hasOwnProperty.call(practiceTestResults || {}, sourceTestId);
};
