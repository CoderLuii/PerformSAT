// rwPredictabilityGuards.test.js
// ============================================================================
// Regression guards for the 2026-08-13 R&W predictability overhaul. Before it,
// test-savvy students could exploit: the longest choice winning 33.5% overall
// (72% in CoE-Quantitative), the shortest never winning in two skills, and a
// transitions decoy pool where "meanwhile" was offered 20 times and correct
// zero — a crossable-out word. Official CB baseline (2026-08 educator-bank
// release, n=150): longest wins 15.3%, shortest ~23%, and 21 transition items
// had 21 different correct words.
//
// These bands are deliberately loose. They fail when a TELL returns (a skill
// drifting monotone in either direction, a dead decoy pool), not on normal
// authoring variance. Both directions are pinned: 0% longest-correct is as
// exploitable as 70% (it eliminates a choice for free).
// ============================================================================

import { rwQuestionBank } from '../index';

const skillOf = (q) =>
  (q.skill || (Array.isArray(q.skills) ? q.skills[0] : '') || '').toLowerCase();

const MC = rwQuestionBank.filter(
  (q) => Array.isArray(q.choices) && q.choices.length === 4 && q.correctAnswer,
);

const keyText = (q) => {
  const key = String(q.correctAnswer).toUpperCase();
  return (q.choices.find((c) => c.id === key)?.text || '');
};
const isStrictLongest = (q) => {
  const lens = q.choices.map((c) => (c.text || '').length);
  const kl = keyText(q).length;
  return kl === Math.max(...lens) && lens.filter((l) => l === kl).length === 1;
};
const isStrictShortest = (q) => {
  const lens = q.choices.map((c) => (c.text || '').length);
  const kl = keyText(q).length;
  return kl === Math.min(...lens) && lens.filter((l) => l === kl).length === 1;
};

describe('length tells', () => {
  const TARGET_SKILLS = [
    'central-ideas-and-details',
    'command-of-evidence-quantitative',
    'command-of-evidence-textual',
    'rhetorical-synthesis',
  ];

  test.each(TARGET_SKILLS)('%s: longest-correct rate stays in the natural band (3%%-35%%)', (skill) => {
    const items = MC.filter((q) => skillOf(q) === skill);
    expect(items.length).toBeGreaterThan(20);
    const rate = items.filter(isStrictLongest).length / items.length;
    expect(rate).toBeGreaterThan(0.03); // exactly-zero is an inverse tell
    expect(rate).toBeLessThan(0.35);    // the original tell was 52-72%
  });

  test('overall longest-correct rate near the official 15% (8%-22%)', () => {
    const rate = MC.filter(isStrictLongest).length / MC.length;
    expect(rate).toBeGreaterThan(0.08);
    expect(rate).toBeLessThan(0.22);
  });

  test('the shortest choice sometimes wins in rhetorical synthesis', () => {
    const items = MC.filter((q) => skillOf(q) === 'rhetorical-synthesis');
    expect(items.filter(isStrictShortest).length).toBeGreaterThan(0);
  });
});

describe('transitions decoy liveness', () => {
  const transItems = MC.filter((q) =>
    (q.question || '').toLowerCase().includes('logical transition'),
  );
  const table = {};
  transItems.forEach((q) => {
    const key = String(q.correctAnswer).toUpperCase();
    q.choices.forEach((c) => {
      const w = (c.text || '').replace(/[,.]/g, '').trim().toLowerCase();
      if (!w) return;
      table[w] = table[w] || { offered: 0, wins: 0 };
      table[w].offered++;
      if (c.id === key) table[w].wins++;
    });
  });

  test('there is a real transitions corpus to guard', () => {
    expect(transItems.length).toBeGreaterThan(60);
  });

  test('no word offered 8+ times is a dead giveaway (zero wins)', () => {
    const dead = Object.entries(table)
      .filter(([, v]) => v.offered >= 8 && v.wins === 0)
      .map(([w, v]) => `${w} (0/${v.offered})`);
    expect(dead).toEqual([]);
  });

  test('correct words are genuinely varied (20+ distinct winners)', () => {
    const winners = Object.values(table).filter((v) => v.wins > 0).length;
    expect(winners).toBeGreaterThanOrEqual(20);
  });

  test('no single word dominates the keys (max 20% of items)', () => {
    const maxWins = Math.max(...Object.values(table).map((v) => v.wins));
    expect(maxWins / transItems.length).toBeLessThanOrEqual(0.2);
  });
});
