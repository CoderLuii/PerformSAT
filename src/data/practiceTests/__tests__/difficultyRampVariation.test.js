// difficultyRampVariation.test.js
// ============================================================================
// Regression guard for the assembly-level difficulty-order variation
// (2026-08-13 predictability fix). Raw bundles share one M1 ramp across 11 of
// 12 tests and ONE identical sequence across all 12 math M2Easy files; the
// assembled tests must not. Composition (which questions a module contains)
// must be untouched — only order varies, only for math M1 and math M2Easy,
// and deterministically (stable across loads).
// ============================================================================

import { practiceTests } from '../index';
import { practiceTest3RW } from '../practiceTest3RW';

const diffSeq = (qs) => qs.map((q) => (q.difficulty || '?')[0].toUpperCase()).join('');

const mathM1s = practiceTests.map((t) => t.modules.filter((m) => m.section === 'math')[0]);
const m2Easies = practiceTests.map((t) => t.module2Easy).filter(Boolean);

test('math Module 1 ramps genuinely differ across the 12 tests', () => {
  const seqs = mathM1s.map((m) => diffSeq(m.questions));
  expect(new Set(seqs).size).toBeGreaterThanOrEqual(8); // raw: 2 distinct
});

test('math M2Easy sequences genuinely differ across the 12 tests', () => {
  const seqs = m2Easies.map((m) => diffSeq(m.questions));
  expect(m2Easies).toHaveLength(12);
  expect(new Set(seqs).size).toBeGreaterThanOrEqual(8); // raw: 1 distinct
});

test('every varied module still opens easy and closes hard', () => {
  [...mathM1s, ...m2Easies].forEach((m) => {
    expect(m.questions[0].difficulty).toBe('easy');
    expect(m.questions[m.questions.length - 1].difficulty).toBe('hard');
  });
});

test('variation is order-only: module composition is unchanged', () => {
  // Compare the multiset of question ids per assembled module against raw.
  /* eslint-disable global-require */
  const raw = require('../practiceTest5').practiceTest5;
  const rawM2E = require('../practiceTest5M2Easy').practiceTest5M2Easy;
  /* eslint-enable global-require */
  const assembled = practiceTests.find((t) => t.id === 'practice-test-5');
  const assembledM1 = assembled.modules.filter((m) => m.section === 'math')[0];
  const ids = (qs) => qs.map((q) => q.id).sort((a, b) => String(a).localeCompare(String(b)));
  expect(ids(assembledM1.questions)).toEqual(ids(raw.modules[0].questions));
  expect(ids(assembled.module2Easy.questions)).toEqual(ids(rawM2E.questions));
});

test('R&W question order is never touched (official flow is authentic)', () => {
  const assembled = practiceTests.find((t) => t.id === 'practice-test-3');
  const assembledRW = assembled.modules.filter((m) => m.section === 'reading-writing');
  assembledRW.forEach((m, i) => {
    expect(m.questions.map((q) => q.id)).toEqual(
      practiceTest3RW.modules[i].questions.map((q) => q.id),
    );
  });
});

test('order is deterministic across assemblies (stable for snapshots/telemetry)', () => {
  jest.resetModules();
  // eslint-disable-next-line global-require
  const fresh = require('../index').practiceTests;
  const freshM1 = fresh.map((t) => t.modules.filter((m) => m.section === 'math')[0]);
  mathM1s.forEach((m, i) => {
    expect(freshM1[i].questions.map((q) => q.id)).toEqual(m.questions.map((q) => q.id));
  });
});
