// varyDifficultyOrder.js
// ============================================================================
// Deterministic, seeded difficulty-order variation for practice-test modules
// (2026-08-13 predictability fix). Before this, 11 of 12 math Module 1s ran
// the exact same EEEEE MMMMMMMMM HHHHHHHH ramp position for position, and all
// 12 math M2Easy modules shared ONE identical difficulty sequence — students
// learned the rhythm ("the last three are always the hard ones") after a
// single test.
//
// The transform reorders a module's questions with a NOISY difficulty ramp:
// each question sorts by (difficulty rank + seeded noise), so the module still
// opens approachable and finishes hard — matching the official test's feel —
// but easies, mediums, and the odd hard interleave differently on every test.
// Two hard guarantees are enforced after the sort: the first question is easy
// and the last is hard (when the module contains those bands at all).
//
// Seeded per test+module (same seeding contract as rebalanceAnswerKey), so a
// given test's order is STABLE across loads and sessions: new attempts, their
// snapshots, and telemetry all see one consistent order. Applied at assembly
// (index.js) — raw bundle files keep their canonical blueprint order, which
// testBundleIntegrity.test.js continues to pin as authoring QA.
//
// SAFETY (verified 2026-08-13): review of past attempts renders from
// per-attempt snapshots; diagnosticReportLoader backfills stimulus fields by
// question id within the module (with index fallback for pre-id snapshots),
// so reordering assembly does not cross-wire old reviews. R&W modules are
// NEVER passed through this transform — their question order follows the
// official vocab-first→notes-last flow, which is authentic and must not vary.
// ============================================================================

const RANK = { easy: 0, medium: 1, hard: 2 };

// Noise amplitude just under two bands: easies interleave freely with
// mediums and mediums with hards (real mid-module texture, like official
// M1s), but an easy can never land after a hard (E < 0+1.9 ≤ 2 ≤ H) and a
// hard can never open the module. 1.15 was tried first and produced nearly
// identical E-block/M-block/H-block strings across all 12 tests — only
// within-band order changed, which kept the learnable rhythm.
const NOISE = 1.9;

/** FNV-1a string hash (same as rebalanceAnswerKey's). */
function hashSeed(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Mulberry32 PRNG — tiny, deterministic, good enough for ordering noise. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Reorder a module's questions along a seeded noisy difficulty ramp.
 * Pure and deterministic: same module + same seed → same order, every load.
 * The question set is untouched (same objects, same multiset) — only the
 * order changes. Modules with fewer than 4 questions, or where any question
 * lacks a recognized difficulty, are returned unchanged.
 *
 * @param {object} module  A practice-test module ({ questions, ... }).
 * @param {string} seed    Context seed, e.g. `${testId}:math:0`.
 * @returns {object} the module with reordered questions (or unchanged).
 */
export function varyDifficultyOrder(module, seed) {
  const qs = module?.questions;
  if (!Array.isArray(qs) || qs.length < 4) return module;
  if (!qs.every((q) => q && RANK[q.difficulty] !== undefined)) return module;

  const rng = mulberry32(hashSeed(String(seed)));
  const keyed = qs.map((q, i) => ({ q, i, key: RANK[q.difficulty] + rng() * NOISE }));
  keyed.sort((a, b) => a.key - b.key || a.i - b.i);
  const ordered = keyed.map((k) => k.q);

  // Guarantee an approachable opening and a hard finish when possible.
  const firstEasy = ordered.findIndex((q) => q.difficulty === 'easy');
  if (firstEasy > 0) {
    const [e] = ordered.splice(firstEasy, 1);
    ordered.unshift(e);
  }
  let lastHard = -1;
  for (let i = ordered.length - 1; i >= 0; i--) {
    if (ordered[i].difficulty === 'hard') { lastHard = i; break; }
  }
  if (lastHard !== -1 && lastHard !== ordered.length - 1) {
    const [h] = ordered.splice(lastHard, 1);
    ordered.push(h);
  }

  return { ...module, questions: ordered };
}

export default varyDifficultyOrder;
