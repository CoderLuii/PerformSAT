// answerKeyBalance.test.js
// ============================================================================
// Regression guard for the 2026-08-13 answer-key rebalance (predictability
// fix). Before it, the on-disk math bundles let "guess B" score 56% (every
// one of the 36 modules had a letter above 35%, PT8 M2Easy answered B on
// 14 of 15 questions), and the R&W keys were hard-balanced into an
// anti-random pattern (adjacent repeat rate 9.4% vs the ~25% of a real key,
// zero 4-streaks in 972 questions).
//
// These tests run against the ASSEMBLED tests (practiceTests from ../index),
// i.e. after the seeded rebalanceAnswerKey pass — the letters students see.
// Bands are deliberately loose: they catch systematic skew coming back, not
// natural randomness (a 16-MC module legitimately shows a 40% letter now and
// then, and real keys DO contain streaks).
// ============================================================================

import { practiceTests } from '../index';

const LETTERS = ['A', 'B', 'C', 'D'];

/** Collect per-module MC answer-letter sequences for one section. */
function sectionSequences(section) {
  const seqs = [];
  practiceTests.forEach((t) => {
    t.modules
      .filter((m) => m.section === section)
      .forEach((m, i) => {
        seqs.push({
          tag: `${t.id} ${section} module ${i + 1}`,
          seq: m.questions
            .filter((q) => q.type === 'multiple-choice')
            .map((q) => String(q.correctAnswer).toUpperCase()),
        });
      });
    const extra =
      section === 'math' ? t.module2Easy : t.rwModule2Easy;
    if (extra) {
      seqs.push({
        tag: `${t.id} ${section} M2Easy`,
        seq: extra.questions
          .filter((q) => q.type === 'multiple-choice')
          .map((q) => String(q.correctAnswer).toUpperCase()),
      });
    }
  });
  return seqs;
}

describe.each(['math', 'reading-writing'])('%s answer keys', (section) => {
  const seqs = sectionSequences(section);
  const all = seqs.flatMap((s) => s.seq);

  test('every letter lands in a sane aggregate band (18%-32%)', () => {
    LETTERS.forEach((L) => {
      const share = all.filter((x) => x === L).length / all.length;
      expect(share).toBeGreaterThan(0.18);
      expect(share).toBeLessThan(0.32);
    });
  });

  test('no module lets one letter dominate (>55% of its MC items)', () => {
    seqs.forEach(({ tag, seq }) => {
      LETTERS.forEach((L) => {
        const share = seq.filter((x) => x === L).length / seq.length;
        // eslint-disable-next-line jest/no-conditional-expect
        if (share > 0.55) throw new Error(`${tag}: ${L} is ${Math.round(share * 100)}% of the key`);
      });
    });
  });

  test('keys look random, not balanced-by-hand: adjacent repeat rate 15%-35%', () => {
    let pairs = 0;
    let repeats = 0;
    seqs.forEach(({ seq }) => {
      for (let i = 1; i < seq.length; i++) {
        pairs++;
        if (seq[i] === seq[i - 1]) repeats++;
      }
    });
    const rate = repeats / pairs;
    expect(rate).toBeGreaterThan(0.15);
    expect(rate).toBeLessThan(0.35);
  });

  test('same-letter streaks exist somewhere (a fully streak-free key is a tell)', () => {
    let streaks = 0;
    seqs.forEach(({ seq }) => {
      let run = 1;
      for (let i = 1; i < seq.length; i++) {
        run = seq[i] === seq[i - 1] ? run + 1 : 1;
        if (run === 3) streaks++;
      }
    });
    expect(streaks).toBeGreaterThan(0);
  });
});

describe('rebalance preserves the correct answer content', () => {
  // The transform swaps choice CONTENT between positions and moves the
  // letter with it — so the text of the correct choice must be identical
  // before and after. Compare the assembled tests against the raw bundles
  // position-by-position (the transform never reorders questions).
  /* eslint-disable global-require */
  const rawMath = [
    require('../practiceTest1').practiceTest1,
    require('../practiceTest7').practiceTest7,
  ];
  const rawRW = [
    require('../practiceTest1RW').practiceTest1RW,
    require('../practiceTest7RW').practiceTest7RW,
  ];
  /* eslint-enable global-require */

  test.each([
    ['practice-test-1', 0],
    ['practice-test-7', 1],
  ])('%s: correct choice text is unchanged in every module', (id, i) => {
    const assembled = practiceTests.find((t) => t.id === id);
    const rwModules = assembled.modules.filter((m) => m.section === 'reading-writing');
    const mathModules = assembled.modules.filter((m) => m.section === 'math');
    [
      [rawRW[i].modules, rwModules],
      [rawMath[i].modules, mathModules],
    ].forEach(([rawMods, builtMods]) => {
      rawMods.forEach((rawMod, mi) => {
        rawMod.questions.forEach((rawQ) => {
          if (rawQ.type !== 'multiple-choice') return;
          // Match by id WITHIN the module — assembly varies math question
          // order (ids are only unique per module, so no cross-module map).
          const builtQ = builtMods[mi].questions.find((q) => q.id === rawQ.id);
          const rawText = rawQ.choices.find(
            (c) => c.id === String(rawQ.correctAnswer).toUpperCase(),
          )?.text;
          const builtText = builtQ.choices.find(
            (c) => c.id === String(builtQ.correctAnswer).toUpperCase(),
          )?.text;
          expect(builtText).toEqual(rawText);
        });
      });
    });
  });
});
