/**
 * scoreBand.js — honest score-band estimate for the 24-question
 * mini-diagnostic (12 R&W + 12 Math).
 *
 * ── Scoring approach (and why) ──────────────────────────────────────────────
 * Each section's band CENTER comes from the canonical raw -> scaled table via
 * `convertToSATScore(rawCorrect, total, { section })` — the SAME lookup full
 * tests are scored on (scaleTables.js), so a mini-diagnostic band lands on the
 * same ruler as a later full-test `score.scaled`. (The mini-diagnostic is
 * untimed/non-adaptive, so it always uses the hard-route column.)
 *
 * We deliberately map raw-count -> scaled rather than running MLE over the
 * sampled items' params:
 *   1. With per-item params, WHICH items were right moves theta — a student
 *      with k+1 correct could band below one with k correct, violating the
 *      hard monotonicity guarantee. A raw-count mapping is monotone by
 *      construction.
 *   2. The honest Fisher SE at 12 items/section is ~0.65 theta (~±60
 *      section points), a 170+ point composite band — true but useless as
 *      a product surface. Instead the band carries an explicit, fixed
 *      ±1-SE-EQUIVALENT margin: ±30 per section, ±40 composite
 *      (~sqrt(2) * 30, snapped to the 10-point grid) — honest about being
 *      a 24-question estimate without drowning the signal.
 *
 * All values are multiples of 10 and clamped to [200, 800] per section /
 * [400, 1600] composite.
 */

import { convertToSATScore, isAnswerCorrect } from '../scoring/irtEngine';

const SECTION_MIN = 200;
const SECTION_MAX = 800;
const COMPOSITE_MIN = 400;
const COMPOSITE_MAX = 1600;

// ±1-SE-equivalent margins (see module comment). Section margins do not sum
// to the composite margin because section errors are treated as independent:
// composite ~ sqrt(30^2 + 30^2) ~ 42 -> 40 on the 10-point grid.
export const SECTION_MARGIN = 30;
export const COMPOSITE_MARGIN = 40;

// Diagnostic v2 low-evidence margins: when the student answered fewer than
// LOW_EVIDENCE_THRESHOLD of the served items (blitzed/abandoned sittings),
// the raw count under-measures ability and the honest band is wider.
export const SECTION_MARGIN_WIDE = 50;
export const COMPOSITE_MARGIN_WIDE = 70;
export const LOW_EVIDENCE_THRESHOLD = 0.8;

const roundTo10 = (n) => Math.round(n / 10) * 10;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/** Count correct answers for a section's items against answersById. */
function countCorrect(items, answers) {
  return items.reduce(
    (sum, item) => sum + (isAnswerCorrect(item, answers[item.id]) ? 1 : 0),
    0,
  );
}

/** Section band center on 200-800 via the engine's raw -> scaled path. */
function sectionCenter(items, answers, section, route) {
  if (items.length === 0) return SECTION_MIN;
  return clamp(
    roundTo10(convertToSATScore(countCorrect(items, answers), items.length, { section, route })),
    SECTION_MIN,
    SECTION_MAX,
  );
}

function sectionBand(center, margin) {
  return {
    low: clamp(roundTo10(center - margin), SECTION_MIN, SECTION_MAX),
    high: clamp(roundTo10(center + margin), SECTION_MIN, SECTION_MAX),
  };
}

/**
 * Compute the projected score band from a completed mini-diagnostic.
 * Pure and deterministic; monotone in correct-answer count (more correct
 * answers never lower any band edge). Use it once after the final answer.
 *
 * Diagnostic v2 additions (all default to v1 behavior when omitted):
 *  - `rwRoute` / `mathRoute` — the M2 variant the runner actually served, so
 *    a student routed to the easy module is scored on the easy column (its
 *    ceiling caps at ~600, same as real adaptive tests).
 *  - `lowEvidence` — widens margins to ±50 section / ±70 composite when the
 *    sitting answered under 80% of items (caller computes; see
 *    LOW_EVIDENCE_THRESHOLD).
 *
 * @param {object} args
 * @param {object[]} args.rwItems — the R&W items served
 * @param {object[]} args.mathItems — the Math items served
 * @param {Object<string, string>} args.answersById — item id -> chosen choice id
 * @param {'easy'|'hard'} [args.rwRoute='hard'] — R&W M2 route actually served
 * @param {'easy'|'hard'} [args.mathRoute='hard'] — Math M2 route actually served
 * @param {boolean} [args.lowEvidence=false] — widen margins for thin sittings
 * @returns {{low: number, high: number, rwBand: {low: number, high: number}, mathBand: {low: number, high: number}}}
 *   composite band on 400-1600; per-section bands on 200-800; all multiples of 10
 */
export function computeScoreBand({
  rwItems = [],
  mathItems = [],
  answersById = {},
  rwRoute = 'hard',
  mathRoute = 'hard',
  lowEvidence = false,
} = {}) {
  const rwCenter = sectionCenter(rwItems.filter(Boolean), answersById, 'reading-writing', rwRoute);
  const mathCenter = sectionCenter(mathItems.filter(Boolean), answersById, 'math', mathRoute);
  const sectionMargin = lowEvidence ? SECTION_MARGIN_WIDE : SECTION_MARGIN;
  const compositeMargin = lowEvidence ? COMPOSITE_MARGIN_WIDE : COMPOSITE_MARGIN;

  const composite = rwCenter + mathCenter;
  return {
    low: clamp(roundTo10(composite - compositeMargin), COMPOSITE_MIN, COMPOSITE_MAX),
    high: clamp(roundTo10(composite + compositeMargin), COMPOSITE_MIN, COMPOSITE_MAX),
    rwBand: sectionBand(rwCenter, sectionMargin),
    mathBand: sectionBand(mathCenter, sectionMargin),
  };
}
