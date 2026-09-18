/**
 * diagnosticVariant — which diagnostic sitting to build: the full 40Q
 * starting-point diagnostic or the short focus-weighted check-in.
 *
 * The LAUNCH SOURCE decides, not merely "does an old record exist":
 *   - A sitting started from onboarding / the home "Take your diagnostic"
 *     CTA IS the student's starting point → always the full variant, even
 *     when a stale diagnostic record is lying around (a re-run onboarding, a
 *     QA reset, a v1-shell record). Serving the check-in there discards the
 *     student's answers for the score (check-in bands are focus-weighted and
 *     never anchor the dashboard) and carries a stale band forward as their
 *     "starting score" — the 2026-08-22 founder repro.
 *   - The plan's scheduled check-in card serves the short variant it
 *     promises — but only for a MEASURED student (a diagnostic record or a
 *     scoreable real-test attempt). A never-measured student's first sitting
 *     is never demoted to the check-in.
 *   - No source (resume fall-through after a drifted manifest) keeps the
 *     measured-or-not rule.
 *
 * Pure selector: no Firebase, no React.
 */

import { isScoreableAttempt } from './latestTestStats';

/** Onboarding / home "Take your diagnostic" CTA — the starting point. */
export const DIAGNOSTIC_LAUNCH_FIRST = 'first';
/** The study plan's scheduled "Quick check-in" activity. */
export const DIAGNOSTIC_LAUNCH_PLAN_CHECKIN = 'plan-checkin';

/**
 * True when the account carries a real measurement: any scoreable full-test
 * attempt (blank/abandoned attempts persist a floor scaledScore and must not
 * count — isScoreableAttempt is the canonical gate) or a legacy aggregate row.
 *
 * @param {object|null} practiceTestResults - progress.practiceTestResults map
 * @returns {boolean}
 */
export function hasRealTestScore(practiceTestResults) {
  return Object.values(practiceTestResults || {}).some((row) => (
    Array.isArray(row?.attempts)
      ? row.attempts.some((a) => isScoreableAttempt(a))
      : Number.isFinite(row?.bestScaledScore)
  ));
}

/**
 * @param {object} args
 * @param {'first'|'plan-checkin'|null} [args.launchSource] - where the sitting was launched from
 * @param {object|null} [args.miniDiagnostic] - progress.miniDiagnostic record
 * @param {object|null} [args.practiceTestResults] - progress.practiceTestResults map
 * @returns {'full'|'checkin'}
 */
export function chooseDiagnosticVariant({ launchSource = null, miniDiagnostic = null, practiceTestResults = null } = {}) {
  if (launchSource === DIAGNOSTIC_LAUNCH_FIRST) return 'full';
  const measured = !!miniDiagnostic || hasRealTestScore(practiceTestResults);
  return measured ? 'checkin' : 'full';
}
