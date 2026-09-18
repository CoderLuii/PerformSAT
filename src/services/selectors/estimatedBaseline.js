/**
 * estimatedBaseline — the diagnostic's estimated score band as the dashboard
 * starting score, shown ONLY until the first real practice test lands.
 *
 * Display rule (Diagnostic v2 spec, 2026-08-13): the estimate fills the
 * "Current Score" slot while the account has NO scoreable full-test attempt;
 * the moment one exists, full-test scores outrank and the estimate disappears
 * everywhere. It never writes user.currentScore — it's a read-time fallback.
 *
 * Pure selector: no Firebase, no React.
 */

import { isScoreableAttempt } from './latestTestStats';

/** A SCOREABLE attempt on any row (or a legacy aggregate-only row). Uses the
 *  same gate as the Current Score hero (isScoreableAttempt) — a blank/
 *  abandoned attempt persists a floor scaledScore that must not suppress the
 *  estimate while ALSO not rendering as a score (that left NO hero at all). */
const rowHasScore = (row) => {
  if (!row || typeof row !== 'object') return false;
  if (Array.isArray(row.attempts)) {
    return row.attempts.some((a) => isScoreableAttempt(a));
  }
  return Number.isFinite(row.bestScaledScore);
};

/**
 * @param {object|null} miniDiagnostic - progress.miniDiagnostic record (carries scoreBand)
 * @param {object|null} practiceTestResults - progress.practiceTestResults map
 * @returns {{low: number, high: number, mid: number, rwBand: object|null, mathBand: object|null}|null}
 *   Composite estimate (mid snapped to the 10-point grid), or null when a real
 *   test score exists / no diagnostic band is stored.
 */
/**
 * The stored diagnostic band's midpoint, but ONLY when the band is
 * representative (not focus-weighted). Snapped to the 10-point score grid.
 * Used as the score anchor for check-in plan generation: a check-in's own
 * band over-samples the plan's focus skills, so its center reads low — the
 * plan's arc must start from the last trustworthy measurement instead.
 *
 * @param {object|null} miniDiagnostic - progress.miniDiagnostic record
 * @returns {number|null} Composite midpoint, or null when no trusted band.
 */
export function getTrustedBandMidpoint(miniDiagnostic) {
  const band = miniDiagnostic?.scoreBand;
  if (!band || !Number.isFinite(band.low) || !Number.isFinite(band.high)) return null;
  if (miniDiagnostic?.scoreBandFocusWeighted) return null;
  return Math.round((band.low + band.high) / 2 / 10) * 10;
}

export function getEstimatedBaseline(miniDiagnostic, practiceTestResults) {
  const band = miniDiagnostic?.scoreBand;
  if (!band || !Number.isFinite(band.low) || !Number.isFinite(band.high)) return null;
  // A focus-weighted band was sampled from the student's WEAKEST skills —
  // never present it as their starting score (it reads as "studying made me
  // worse"). Only representative full-variant bands anchor the dashboard.
  if (miniDiagnostic?.scoreBandFocusWeighted) return null;
  const hasRealScore = Object.values(practiceTestResults || {}).some(rowHasScore);
  if (hasRealScore) return null;
  return {
    low: band.low,
    high: band.high,
    mid: Math.round((band.low + band.high) / 2 / 10) * 10,
    rwBand: band.rwBand || null,
    mathBand: band.mathBand || null,
  };
}
