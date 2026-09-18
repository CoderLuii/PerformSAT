import { buildPointLevers, pointLeversFromDiagnostic, pointLeversFromLatestTest } from '../pointLevers';

// The founder's 2026-08-22 full diagnostic: R&W 19/20 (band 740–800), Math 14/20 (band 600–660).
const RECORD = {
  diagnosticVariant: 'full',
  scoreBand: { low: 1360, high: 1440, rwBand: { low: 740, high: 800 }, mathBand: { low: 600, high: 660 } },
  domains: {
    rw: {
      'information-and-ideas': { correct: 6, total: 6 },
      'craft-and-structure': { correct: 6, total: 6 },
      'standard-english-conventions': { correct: 4, total: 4 },
      'expression-of-ideas': { correct: 3, total: 4 },
    },
    math: {
      algebra: { correct: 5, total: 8 },
      'problem-solving': { correct: 3, total: 4 },
      'advanced-math': { correct: 2, total: 4 },
      geometry: { correct: 4, total: 4 },
    },
  },
};

describe('buildPointLevers — points on the table, per domain', () => {
  test('spreads each section\'s headroom over its misses; levers rank by points, locked-in is the biggest perfect domain', () => {
    const t = pointLeversFromDiagnostic(RECORD);
    expect(t.hasData).toBe(true);
    expect(t.source).toBe('diagnostic');
    // Math center 630 → 170 pts over 6 misses ≈ 28/miss: Algebra 3 misses ≈ 85, Advanced Math 2 ≈ 55, PSDA 1 ≈ 30.
    expect(t.lever).toMatchObject({ slug: 'algebra', label: 'Algebra', correct: 5, total: 8, points: 85, section: 'math' });
    expect(t.next).toMatchObject({ slug: 'advanced-math', label: 'Advanced Math', correct: 2, total: 4, points: 55 });
    // Locked in: the largest perfect domain; the rest are listed.
    expect(t.lockedIn).toMatchObject({ slug: 'information-and-ideas', label: 'Information and Ideas', correct: 6, total: 6, perfect: true });
    expect(t.lockedIn.also).toEqual(['Craft and Structure', 'Geometry and Trigonometry', 'Standard English Conventions']);
    // Section points sum to the section headroom (rounded to 5s).
    const mathPts = t.domains.filter((d) => d.section === 'math').reduce((s, d) => s + d.points, 0);
    expect(mathPts).toBe(170);
    // R&W center 770 → 30 pts on its single miss.
    expect(t.domains.find((d) => d.slug === 'expression-of-ideas').points).toBe(30);
  });

  test('labels are the official CB domain names', () => {
    const t = pointLeversFromDiagnostic(RECORD);
    expect(t.domains.find((d) => d.slug === 'problem-solving').label).toBe('Problem-Solving and Data Analysis');
    expect(t.domains.find((d) => d.slug === 'geometry').label).toBe('Geometry and Trigonometry');
  });

  test('no perfect domain → locked-in is the most accurate one, flagged not perfect', () => {
    const t = buildPointLevers({
      domains: { math: { algebra: { correct: 7, total: 8 }, geometry: { correct: 1, total: 4 } } },
      sectionCenters: { math: 600 },
    });
    expect(t.lockedIn).toMatchObject({ slug: 'algebra', perfect: false, also: [] });
    // Math 600 → 200 pts over 4 misses = 50/miss: geometry 3 misses ≈ 150, algebra 1 ≈ 50.
    expect(t.lever).toMatchObject({ slug: 'geometry', points: 150 });
    expect(t.next).toMatchObject({ slug: 'algebra', points: 50 });
  });

  test('a perfect section has no headroom to distribute (no levers from it)', () => {
    const t = buildPointLevers({
      domains: { rw: { 'craft-and-structure': { correct: 5, total: 5 } }, math: { algebra: { correct: 4, total: 6 } } },
      sectionCenters: { rw: 800, math: 650 },
    });
    expect(t.lever).toMatchObject({ slug: 'algebra', points: 150 });
    expect(t.lockedIn.slug).toBe('craft-and-structure');
  });

  test('without a section center the domain still ranks, with points null', () => {
    const t = buildPointLevers({ domains: { math: { algebra: { correct: 2, total: 6 } } }, sectionCenters: {} });
    expect(t.lever).toMatchObject({ slug: 'algebra', points: null });
  });

  test('check-in / empty / malformed records are a no-op', () => {
    expect(pointLeversFromDiagnostic({ ...RECORD, diagnosticVariant: 'checkin' }).hasData).toBe(false);
    expect(pointLeversFromDiagnostic(null).hasData).toBe(false);
    expect(pointLeversFromDiagnostic({ domains: { math: { algebra: { correct: 1, total: 0 } } } }).hasData).toBe(false);
  });
});

describe('pointLeversFromLatestTest — same tiles from the latest attempt', () => {
  const bundle = {
    modules: [
      { section: 'reading-writing', questions: [{ domain: 'craft-and-structure' }, { domain: 'expression-of-ideas' }] },
      { section: 'math', questions: [{ domain: 'algebra' }, { domain: 'algebra' }, { domain: 'geometry' }] },
    ],
  };
  const results = {
    't1': {
      lastAttemptAt: 2000,
      attempts: [{
        attemptId: 'a1', completedAt: 2000, scaledScore: 1200, isMultiSection: true,
        sectionScores: { math: 600, 'reading-writing': 750 },
        diagnosticData: { questionDetails: {
          '0-0': { isCorrect: true }, '0-1': { isCorrect: false },
          '1-0': { isCorrect: false }, '1-1': { isCorrect: true }, '1-2': { isCorrect: false },
        } },
      }],
    },
  };

  test('joins per-question correctness to the served bundle and prices the domains', () => {
    const t = pointLeversFromLatestTest(results, { resolveTest: () => bundle });
    expect(t.hasData).toBe(true);
    expect(t.source).toBe('test');
    // Math 600 → 200 pts over 2 misses = 100/miss; algebra 1 miss, geometry 1 miss → tie broken by lower accuracy (geometry 0%).
    expect(t.lever).toMatchObject({ slug: 'geometry', points: 100 });
    expect(t.next).toMatchObject({ slug: 'algebra', points: 100, correct: 1, total: 2 });
    expect(t.lockedIn).toMatchObject({ slug: 'craft-and-structure', perfect: true });
    // R&W 750 → 50 pts on its single miss.
    expect(t.domains.find((d) => d.slug === 'expression-of-ideas').points).toBe(50);
  });

  test('returns nothing until the bundle resolves, or without per-question details', () => {
    expect(pointLeversFromLatestTest(results, { resolveTest: () => null }).hasData).toBe(false);
    expect(pointLeversFromLatestTest(results, {}).hasData).toBe(false);
    expect(pointLeversFromLatestTest({ t1: { attempts: [{ attemptId: 'x', scaledScore: 900 }] } }, { resolveTest: () => bundle }).hasData).toBe(false);
  });
});
