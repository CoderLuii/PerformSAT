/**
 * Calibration ingestion layer.
 *
 * Provides item-level IRT parameters, module-routing rules, and
 * theta-to-scale conversion tables for each practice-test form.
 *
 * The system is designed so official/proprietary calibration data can
 * be plugged in later without replacing the scoring engine.  Until then
 * it falls back to sensible research-based estimates.
 */

import {
  MODULE_ROUTE,
  resolveItemParams,
} from './scoringSchema';

// ═══════════════════════════════════════════════════════════════════════════
// 1. ITEM PARAMETER STORE
// ═══════════════════════════════════════════════════════════════════════════

// Map questionId -> { a, b, c } for items that have been individually
// calibrated.  Empty by default — filled when external calibration is loaded.
const _calibratedItems = new Map();

/**
 * Load official or proprietary item calibration data.
 * Call this at app startup if calibration JSON is available.
 *
 * @param {Array<{questionId: string, a: number, b: number, c: number}>} items
 */
export function loadItemCalibration(items) {
  items.forEach(({ questionId, a, b, c }) => {
    _calibratedItems.set(questionId, { a, b, c });
  });
}

/**
 * Get IRT parameters for a question, using calibrated values if available,
 * otherwise falling back to difficulty-based defaults.
 */
export function getItemParams(question) {
  const qId = question.id != null ? String(question.id) : null;
  const override = qId ? _calibratedItems.get(qId) : null;
  return resolveItemParams(question, override);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. MODULE ROUTING
// ═══════════════════════════════════════════════════════════════════════════

// Default: route to "hard" Module 2 if Module 1 accuracy >= 60 %.
const DEFAULT_ROUTING_THRESHOLD = 0.60;

// Per-form overrides (formId -> threshold).
const _routingOverrides = new Map();

export function loadRoutingOverrides(overrides) {
  overrides.forEach(({ formId, threshold }) => {
    _routingOverrides.set(formId, threshold);
  });
}

/**
 * Determine Module 2 route based on Module 1 performance.
 *
 * @param {string} formId  Practice-test ID
 * @param {number} mod1Correct  Correct answers in Module 1
 * @param {number} mod1Total    Total items in Module 1
 * @returns {'easy'|'hard'}
 */
export function determineRoute(formId, mod1Correct, mod1Total) {
  const threshold = _routingOverrides.get(formId) ?? DEFAULT_ROUTING_THRESHOLD;
  const accuracy = mod1Total > 0 ? mod1Correct / mod1Total : 0;
  return accuracy >= threshold ? MODULE_ROUTE.HARD : MODULE_ROUTE.EASY;
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. THETA-TO-SCALE CONVERSION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Default theta-to-scaled-score conversion for SAT (200-800 per section).
 *
 * Anchored to the per-section raw→scaled patterns observed across the
 * eight College Board digital practice tests (PT 4-11, linear form).
 * The midrange (~theta 0 → 500) reflects the published CB user norm
 * where 500 sits near the 50th percentile, not the 65th.  The shape
 * is piecewise-linear; SAT scores are reported in 10-point steps.
 *
 * Per-form overrides via `loadScaleOverrides` take precedence when
 * official equating tables are wired in for a specific form.
 */
const DEFAULT_THETA_SCALE = [
  // { theta, score }
  { theta: -4.0, score: 200 },
  { theta: -3.0, score: 240 },
  { theta: -2.5, score: 290 },
  { theta: -2.0, score: 340 },
  { theta: -1.5, score: 400 },
  { theta: -1.0, score: 450 },
  { theta: -0.5, score: 480 },
  { theta:  0.0, score: 510 },
  { theta:  0.5, score: 550 },
  { theta:  1.0, score: 600 },
  { theta:  1.5, score: 660 },
  { theta:  2.0, score: 720 },
  { theta:  2.5, score: 770 },
  { theta:  3.0, score: 790 },
  { theta:  4.0, score: 800 },
];

// Per-form scale overrides (formId -> scale array).
const _scaleOverrides = new Map();

export function loadScaleOverrides(overrides) {
  overrides.forEach(({ formId, scale }) => {
    _scaleOverrides.set(formId, scale);
  });
}

/**
 * Convert an ability estimate (theta) to the SAT reported scale.
 * Uses piecewise linear interpolation over the scale table.
 */
export function thetaToScaledScore(theta, formId = null) {
  const table = (formId && _scaleOverrides.get(formId)) || DEFAULT_THETA_SCALE;

  if (theta <= table[0].theta) return table[0].score;
  if (theta >= table[table.length - 1].theta) return table[table.length - 1].score;

  for (let i = 0; i < table.length - 1; i++) {
    const lo = table[i];
    const hi = table[i + 1];
    if (theta >= lo.theta && theta <= hi.theta) {
      const t = (theta - lo.theta) / (hi.theta - lo.theta);
      const raw = lo.score + t * (hi.score - lo.score);
      return Math.round(raw / 10) * 10; // SAT scores are multiples of 10
    }
  }

  return 500; // defensive fallback
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. PERCENTILE TABLE
// ═══════════════════════════════════════════════════════════════════════════

// Aligned with College Board's published SAT user-norm percentile tables
// (per-section, 200-800).  500 ≈ 50th, 600 ≈ 75th, 700 ≈ 94th.
export const PERCENTILE_TABLE = {
  200: 1, 210: 1, 220: 1, 230: 1, 240: 1, 250: 1, 260: 2, 270: 2,
  280: 3, 290: 3, 300: 4, 310: 5, 320: 6, 330: 7, 340: 9,
  350: 10, 360: 12, 370: 14, 380: 17, 390: 19, 400: 22, 410: 24,
  420: 27, 430: 30, 440: 33, 450: 36, 460: 39, 470: 42, 480: 44,
  490: 47, 500: 50, 510: 53, 520: 56, 530: 59, 540: 62, 550: 65,
  560: 68, 570: 70, 580: 73, 590: 75, 600: 78, 610: 80, 620: 82,
  630: 84, 640: 86, 650: 88, 660: 89, 670: 90, 680: 92, 690: 93,
  700: 94, 710: 95, 720: 96, 730: 96, 740: 97, 750: 97, 760: 98,
  770: 98, 780: 99, 790: 99, 800: 99,
};

export function estimatePercentile(scaledScore) {
  const rounded = Math.round(scaledScore / 10) * 10;
  return PERCENTILE_TABLE[Math.min(800, Math.max(200, rounded))] || 50;
}
