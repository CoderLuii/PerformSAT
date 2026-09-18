// rebalanceAnswerKey.js
// ============================================================================
// The hand-authored drill bank has a heavily skewed correct-answer position
// (A 59% / B 24% / C 13% / D 4%), and the drill shells render choices in array
// order without shuffling — so a student could game drills by pattern-matching
// "guess A". This pure transform repositions each MCQ item's correct answer to
// a deterministic slot derived from the question id (hash % 4 → ~uniform),
// keeping everything internally consistent:
//   - swaps the CONTENT (text/fraction/table…) of the correct choice with the
//     choice at the target position; the A/B/C/D ids stay in array order,
//   - updates correctAnswer to the target letter,
//   - remaps the two affected letters in the explanation's "Choice X" refs (the
//     letter↔value pairings stay correct because the value moves with content).
//
// Seeded by id, so a question's answer position is STABLE across loads/sessions
// (drill review + telemetry-by-id stay consistent). NON-destructive: the source
// shards are untouched; this runs once at bank assembly (bank/index.js).
//
// SAFETY: the transform never changes WHICH answer is correct (the correct
// choice's content is preserved and correctAnswer follows it), so the worst case
// is a cosmetic letter label — never a wrong answer. It also only remaps items
// whose explanation references choices EXCLUSIVELY via the canonical "Choice
// [A-D]" form; any item with a non-canonical reference (e.g. "(A)", "option B")
// or no "Choice X is correct" anchor is returned byte-identical. (Audit
// 2026-06-27: 1263/1268 are canonical; the rest are skipped.)
// ============================================================================

const LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Stable, deterministic string hash (FNV-1a). No Math.random so the result is
 * reproducible across loads — a question id always maps to the same slot.
 * @param {string} id
 * @returns {number} unsigned 32-bit hash
 */
function hashId(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Murmur3-style avalanche finalizer. Needed for the SEEDED path only: practice
 * tests reuse tiny sequential ids (1, 2, 3, …), and bare FNV of one/two-char
 * strings leaves the low bits correlated with the digit — adjacent questions
 * would nearly cycle A→B→C→D (an anti-random tell of its own) and every test
 * would share one sequence. Finalizing decorrelates the slots. The UNSEEDED
 * path keeps bare FNV so the drill bank's existing letter layout is untouched.
 * @param {number} h  unsigned 32-bit hash
 * @returns {number} unsigned 32-bit avalanched hash
 */
function avalanche(h) {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/**
 * True only when the explanation references choices EXCLUSIVELY via the
 * canonical "Choice [A-D]" form AND carries a "Choice X is correct" line that
 * matches the key. Used to gate which items are safe to remap. Geometric point
 * labels ("point A", "triangle ABC") are NOT flagged — only choice-like refs.
 * @param {string} explanation
 * @param {string} correctLetter  Uppercase A-D.
 * @returns {boolean}
 */
export function isCanonicalExplanation(explanation, correctLetter) {
  if (typeof explanation !== 'string') return false;
  const prose = explanation.replace(/\$[^$]*\$/g, '§'); // ignore $…$ math
  const m = prose.match(/choice\s+([A-D])\s+is\s+correct/i);
  if (!m || m[1].toUpperCase() !== correctLetter) return false;
  // After removing canonical "Choice X" refs (either case), any remaining
  // choice-LIKE letter reference is ambiguous → not safe to remap.
  const stripped = prose.replace(/choice\s+[A-D]\b/gi, '');
  const nonCanonical = /\([A-D]\)|\b[A-D]\)|\b(?:option|answer)\s+[A-D]\b|\b[A-D]\s+(?:is|was)\s+(?:correct|wrong|incorrect|right)\b/i;
  return !nonCanonical.test(stripped);
}

/**
 * Reposition an MCQ item's correct answer to a deterministic, id-seeded slot to
 * flatten the bank-wide answer-key distribution. Pure: returns a NEW item (or
 * the same reference unchanged when it can't be safely/usefully transformed).
 * Idempotent — applying twice is a no-op (the id already maps to its slot).
 *
 * @param {object} item  A bank question.
 * @param {string} [seed]  Optional context seed (e.g. `${testId}:${section}:${moduleIdx}`).
 *   REQUIRED when ids are not globally unique — practice tests reuse ids 1-22
 *   across every test and module, so without a seed all tests would share one
 *   letter sequence. Seeded slots also get an avalanche finalizer (see above).
 *   Omitting the seed preserves the original drill-bank behavior byte-for-byte.
 * @returns {object} the rebalanced item, or `item` unchanged.
 */
export function rebalanceAnswerKey(item, seed) {
  if (!item || item.type !== 'multiple-choice') return item;
  const choices = item.choices;
  if (!Array.isArray(choices) || choices.length !== 4) return item;

  const correctLetter = String(item.correctAnswer || '').toUpperCase();
  const correctIdx = LETTERS.indexOf(correctLetter);
  if (correctIdx === -1) return item;
  // Choices must be in canonical A,B,C,D id order for the position swap to hold.
  if (!choices.every((c, i) => c && c.id === LETTERS[i])) return item;
  if (!isCanonicalExplanation(item.explanation, correctLetter)) return item;

  const targetIdx = seed
    ? avalanche(hashId(`${seed}:${item.id}`)) % 4
    : hashId(String(item.id)) % 4;
  if (targetIdx === correctIdx) return item; // already balanced for this id

  const L1 = LETTERS[correctIdx];
  const L2 = LETTERS[targetIdx];

  // Swap CONTENT (everything but id) between the two positions; ids stay A-D.
  const newChoices = choices.map((c) => ({ ...c }));
  const correctContent = { ...newChoices[correctIdx] }; delete correctContent.id;
  const targetContent = { ...newChoices[targetIdx] }; delete targetContent.id;
  newChoices[correctIdx] = { id: L1, ...targetContent };
  newChoices[targetIdx] = { id: L2, ...correctContent };

  // Swap the two letters in "Choice X" refs in one pass (avoids double-swap),
  // preserving the original "Choice"/"choice" casing.
  const newExplanation = item.explanation.replace(/(choice\s+)([A-D])\b/gi, (full, pre, L) => {
    const U = L.toUpperCase();
    if (U === L1) return pre + L2;
    if (U === L2) return pre + L1;
    return full;
  });

  return { ...item, choices: newChoices, correctAnswer: L2, explanation: newExplanation };
}

export default rebalanceAnswerKey;
