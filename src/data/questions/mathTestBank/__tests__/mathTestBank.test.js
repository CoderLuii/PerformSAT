/**
 * mathTestBank.test.js — pins the flatten of the 12 recreated math
 * practice-test bundles that the diagnostic samples from.
 *
 * Guards: nothing dropped at flatten (every bundle item is servable), unique
 * namespaced ids, every item domain-tagged/skilled/difficulty-tagged, and
 * per-domain × per-difficulty depth floors so the diagnostic builder's
 * stratified sampling (2/domain + coverage + grid-in tail + excludeIds up to
 * 400) never starves. Floors sit safely under the 2026-09-02 audit counts —
 * a failure means a bundle edit materially thinned a pool the diagnostic
 * depends on, not normal churn.
 */

import {
  getAllQuestions,
  getQuestionsByDomain,
  getQuestionById,
  MATH_TEST_DOMAINS,
  MATH_TEST_BANK_SIZE,
  MATH_TEST_BANK_DROPPED,
} from '../index';

const DIFFICULTIES = ['easy', 'medium', 'hard'];

describe('mathTestBank flatten', () => {
  const all = getAllQuestions();

  test('flattens the full recreated corpus with zero drops', () => {
    // 12 tests × (44 main + 22 M2Easy) = 792.
    expect(MATH_TEST_BANK_SIZE).toBe(792);
    expect(MATH_TEST_BANK_DROPPED).toBe(0);
    expect(all).toHaveLength(792);
  });

  test('ids are unique, namespaced, and round-trip through getQuestionById', () => {
    const ids = new Set();
    for (const q of all) {
      expect(q.id).toMatch(/^math-test\d{1,2}-module/);
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
      expect(getQuestionById(q.id)).toBe(q);
    }
  });

  test('every item is domain-tagged, skilled, difficulty-tagged, and servable', () => {
    const domainSet = new Set(MATH_TEST_DOMAINS);
    for (const q of all) {
      expect(domainSet.has(q.domain)).toBe(true);
      expect(Array.isArray(q.skills) && q.skills.length > 0).toBe(true);
      expect(DIFFICULTIES).toContain(q.difficulty);
      expect(q.section).toBe('math');
      if (q.type === 'fill-in') {
        expect(q.correctAnswer).not.toBeUndefined();
        expect(q.correctAnswer).not.toBeNull();
        expect(q.correctAnswer).not.toBe('');
      } else {
        expect(q.type).toBe('multiple-choice');
        expect(q.choices).toHaveLength(4);
        expect(q.choices.some((c) => String(c.id) === String(q.correctAnswer))).toBe(true);
      }
    }
  });

  test('every domain has the depth the diagnostic sampler needs', () => {
    for (const domain of MATH_TEST_DOMAINS) {
      const pool = getQuestionsByDomain(domain);
      const mc = pool.filter((q) => q.type === 'multiple-choice');
      const fillins = pool.filter((q) => q.type === 'fill-in');
      // Audit floors (2026-09-02): min MC/domain was 87 (geometry), min
      // easy+medium MC was 41 (geometry), min hard MC was 25
      // (problem-solving), min fill-ins was 47 (advanced-math).
      expect(mc.length).toBeGreaterThanOrEqual(80);
      expect(mc.filter((q) => q.difficulty !== 'hard').length).toBeGreaterThanOrEqual(35);
      expect(mc.filter((q) => q.difficulty === 'hard').length).toBeGreaterThanOrEqual(20);
      expect(fillins.length).toBeGreaterThanOrEqual(30);
    }
  });

  test('getQuestionsByDomain partitions the whole bank', () => {
    const counted = MATH_TEST_DOMAINS
      .reduce((n, d) => n + getQuestionsByDomain(d).length, 0);
    expect(counted).toBe(all.length);
  });
});
