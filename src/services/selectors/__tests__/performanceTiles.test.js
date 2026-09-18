/**
 * performanceTiles.test.js — the home-screen performance tiles (orange
 * Practice Accuracy + green Strongest Section + purple Biggest Opportunity).
 *
 * These tiles are derived from the most recent full-length practice test —
 * the only clean, true-count, per-section accuracy source. (Earlier versions
 * summed per-skill skillProgress, which double-counts: one question tagged
 * with N skills bumped N tallies, producing nonsense like "6376 of 25706".)
 * Every % is plain accuracy and every tile carries its raw count.
 */

import { buildPerformanceTiles, buildDiagnosticTiles } from '../performanceTiles';

// A scoreable multi-section attempt: 18/22 Math, 12/18 R&W, 30/40 overall.
const MULTI = {
  t1: {
    testTitle: 'Practice Test 1',
    lastAttemptAt: 2000,
    attempts: [{
      completedAt: 2000,
      scaledScore: 1200,
      rawScore: 30,
      totalQuestions: 40,
      isMultiSection: true,
      sectionScores: { math: 600, 'reading-writing': 600 },
      moduleScores: [
        { moduleSection: 'math', score: 18, total: 22 },
        { moduleSection: 'reading-writing', score: 12, total: 18 },
      ],
    }],
  },
};

// A legacy math-only attempt (no sectionScores / moduleScores): 20/30.
const MATH_ONLY = {
  t1: {
    testTitle: 'Old Test',
    lastAttemptAt: 1000,
    attempts: [{ completedAt: 1000, scaledScore: 600, rawScore: 20, totalQuestions: 30, isMultiSection: false }],
  },
};

describe('buildPerformanceTiles — latest-test, section-level, with raw counts', () => {
  test('overall accuracy comes from the test raw score (sane count, not inflated)', () => {
    const r = buildPerformanceTiles(MULTI);
    expect(r.overall).toEqual({ correct: 30, total: 40, percent: 75 });
    expect(r.hasData).toBe(true);
  });

  test('each section carries accuracy AND the raw count behind it', () => {
    const r = buildPerformanceTiles(MULTI);
    expect(r.sections.math).toEqual({ correct: 18, total: 22, accuracy: 82 });
    expect(r.sections.rw).toEqual({ correct: 12, total: 18, accuracy: 67 });
  });

  test('strongest = higher-accuracy section, opportunity = lower (with counts)', () => {
    const r = buildPerformanceTiles(MULTI);
    expect(r.strongest).toEqual({ key: 'math', label: 'Math', accuracy: 82, correct: 18, total: 22 });
    expect(r.opportunity).toEqual({ key: 'rw', label: 'Reading & Writing', accuracy: 67, correct: 12, total: 18 });
  });

  test('legacy math-only test → Math present, R&W opportunity is an empty prompt', () => {
    const r = buildPerformanceTiles(MATH_ONLY);
    expect(r.overall).toEqual({ correct: 20, total: 30, percent: 67 });
    expect(r.sections.math).toEqual({ correct: 20, total: 30, accuracy: 67 });
    expect(r.sections.rw).toBeNull();
    expect(r.strongest).toEqual({ key: 'math', label: 'Math', accuracy: 67, correct: 20, total: 30 });
    expect(r.opportunity).toEqual({ key: 'rw', label: 'Reading & Writing', accuracy: null, correct: null, total: null, empty: true });
  });

  test('no scored test → hasData false, nothing to show', () => {
    const r = buildPerformanceTiles({});
    expect(r.hasData).toBe(false);
    expect(r.strongest).toBeNull();
    expect(r.opportunity).toBeNull();
    expect(r.overall.percent).toBe(0);
  });

  test('null / undefined input is handled', () => {
    expect(buildPerformanceTiles(null).hasData).toBe(false);
    expect(buildPerformanceTiles(undefined).hasData).toBe(false);
  });
});


describe('buildDiagnosticTiles — the same tiles, read from the diagnostic record', () => {
  const FULL = {
    diagnosticVariant: 'full',
    totalCount: 40,
    domains: {
      rw: {
        'information-and-ideas': { correct: 5, total: 5 },
        'craft-and-structure': { correct: 5, total: 6 },
        'standard-english-conventions': { correct: 4, total: 4 },
        'expression-of-ideas': { correct: 5, total: 5 },
      },
      math: {
        algebra: { correct: 5, total: 6 },
        'problem-solving': { correct: 3, total: 5 },
        'advanced-math': { correct: 3, total: 6 },
        geometry: { correct: 2, total: 3 },
      },
    },
  };

  test('folds per-domain counts into overall + per-section accuracy with raw counts', () => {
    const t = buildDiagnosticTiles(FULL);
    expect(t.hasData).toBe(true);
    expect(t.source).toBe('diagnostic');
    expect(t.overall).toEqual({ correct: 32, total: 40, percent: 80 });
    expect(t.sections.rw).toEqual({ correct: 19, total: 20, accuracy: 95 });
    expect(t.sections.math).toEqual({ correct: 13, total: 20, accuracy: 65 });
    expect(t.strongest).toMatchObject({ key: 'rw', label: 'Reading & Writing', accuracy: 95, correct: 19, total: 20 });
    expect(t.opportunity).toMatchObject({ key: 'math', label: 'Math', accuracy: 65, correct: 13, total: 20 });
  });

  test('v1 records (no diagnosticVariant) count as representative', () => {
    const { diagnosticVariant: _v, ...v1 } = FULL;
    expect(buildDiagnosticTiles(v1).hasData).toBe(true);
  });

  test('a focus-weighted check-in record never feeds the tiles', () => {
    expect(buildDiagnosticTiles({ ...FULL, diagnosticVariant: 'checkin' }).hasData).toBe(false);
  });

  test('empty / malformed records are a no-op', () => {
    expect(buildDiagnosticTiles(null).hasData).toBe(false);
    expect(buildDiagnosticTiles({}).hasData).toBe(false);
    expect(buildDiagnosticTiles({ domains: { rw: {}, math: {} } }).hasData).toBe(false);
    expect(buildDiagnosticTiles({ domains: { rw: { x: { correct: 1, total: 0 } } } }).hasData).toBe(false);
  });

  test('one section only → strongest is that section, opportunity is the empty placeholder', () => {
    const t = buildDiagnosticTiles({ domains: { math: { algebra: { correct: 4, total: 5 } } } });
    expect(t.strongest).toMatchObject({ key: 'math', accuracy: 80 });
    expect(t.opportunity).toMatchObject({ key: 'rw', empty: true });
  });
});
