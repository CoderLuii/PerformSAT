/**
 * studyPlanGenerator.runway.test.js — Phase 4: the plan arc follows the
 * student's real runway, tests follow a runway-based cadence, a 15-minute
 * check-in fills any two-week stretch without a measurement, and the score
 * gap shapes the content mix.
 */

import { generateStudyPlan } from '../studyPlanGenerator';

const mkDiag = (over = {}) => ({
  testId: 'synthetic-1',
  score: { scaled: 920, isMultiSection: true, sections: { math: 480, rw: 440 }, percentCorrect: 45 },
  skillAnalysis: {
    weakSkills: [
      { skillId: 'words-in-context', name: 'Words In Context', domain: 'craft-and-structure', section: 'rw', testAccuracy: 25, correct: 1, total: 4, attempted: 4, evidenceLevel: 'measured', primaryErrorType: 'conceptual_gap', missedPatterns: [], modules: [], sections: [] },
      { skillId: 'transitions', name: 'Transitions', domain: 'expression-of-ideas', section: 'rw', testAccuracy: 40, correct: 2, total: 5, attempted: 5, evidenceLevel: 'measured', primaryErrorType: 'trap_susceptibility', missedPatterns: [], modules: [], sections: [] },
    ],
    strongSkills: [
      { skillId: 'calculate-mean', name: 'Calculating the Mean', section: 'math', testAccuracy: 95 },
    ],
  },
  prioritizedActions: [],
  errorPatterns: { totalWrong: 20, counts: {}, dominantPattern: null, summary: [] },
  difficultyAnalysis: {},
  timeAnalysis: { fadeEffect: 0 },
  trendAnalysis: { persistentWeaknesses: [] },
  scoreProjection: { easyWins: { count: 0, points: 0 } },
  ...over,
});

// Longitudinal with two tests so the first-plan 2-week gate opens.
const longitudinal = {
  scoreTrajectory: [
    { testId: 'prior-1', scaledScore: 900, date: '2026-05-01' },
    { testId: 'synthetic-1', scaledScore: 920, date: '2026-06-01' },
  ],
  persistentWeaknesses: [],
  skillHistory: {},
};

// Pin the clock: "w weeks out" from the REAL Date.now() flips between w-1 and
// w week-buckets depending on the time of day the suite runs (the generator
// rounds day fractions), which made this suite pass by day and fail by night.
// A fixed mid-day system time keeps runway arithmetic deterministic.
beforeAll(() => {
  jest.useFakeTimers({ now: new Date('2026-08-12T12:00:00Z') });
});
afterAll(() => {
  jest.useRealTimers();
});

// Sit 6 hours INSIDE the runway rather than on the exact w-week instant: a
// test date at precisely 63.0 days is a rounding knife-edge the generator's
// midnight normalization can resolve as 9 or 10 weeks. Real test dates are
// calendar days, never exact instants.
const dateWeeksOut = (w) => new Date(Date.now() + w * 7 * 86400000 - 6 * 3600000).toISOString();
const allActivities = (plan) => plan.weeks.flatMap((w) => w.activities || []);

describe('runway-sized arc', () => {
  test('a 9-week runway produces a 9-week arc (old cap was 5)', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(9) }, {}, {}, null, longitudinal);
    expect(plan.weeks.length).toBe(9);
  });

  test('the arc caps at 12 weeks for very long runways', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(30) }, {}, {}, null, longitudinal);
    expect(plan.weeks.length).toBe(12);
  });

  test('the first plan stays a short 2-week cycle (unchanged gate)', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(9) });
    expect(plan.weeks.length).toBeLessThanOrEqual(2);
  });
});

describe('measurement cadence', () => {
  test('long arc: full tests land every third week, and week 1 is never a test week', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(8) }, {}, {}, null, longitudinal);
    expect(plan.weeks[0].isTestWeek).toBe(false);
    expect(plan.weeks[2].isTestWeek).toBe(true);
    expect(plan.weeks[5].isTestWeek).toBe(true);
    expect(plan.weeks[7].isTestWeek).toBe(true); // last week
  });

  test('long arc: check-ins actually appear in the gaps between full tests', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(10) }, {}, {}, null, longitudinal);
    const checkIns = allActivities(plan).filter((a) => a.activityType === 'miniDiagnostic');
    expect(checkIns.length).toBeGreaterThan(0);
  });

  test('no two consecutive weeks lack a measurement (test or check-in)', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(10) }, {}, {}, null, longitudinal);
    let since = 0;
    plan.weeks.forEach((w) => {
      const measured = w.isTestWeek
        || (w.activities || []).some((a) => a.activityType === 'miniDiagnostic' || a.activityType === 'practiceTest');
      if (measured) { since = 0; } else { since += 1; }
      expect(since).toBeLessThan(2);
    });
  });

  test('check-ins carry the mini-diagnostic shape and a because-line', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(10) }, {}, {}, null, longitudinal);
    const checkIns = allActivities(plan).filter((a) => a.activityType === 'miniDiagnostic');
    // Biweekly tests on a 10-week arc leave no 2-week hole in most layouts,
    // so only assert shape when one was inserted.
    checkIns.forEach((c) => {
      expect(c.type).toBe('test');
      expect(c.duration).toBe(20);
      expect(c.because).toMatch(/fresh evidence/i);
    });
  });
});

describe('gap-aware mix', () => {
  test('a big gap adds strengths-maintenance sets', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: dateWeeksOut(8) }, {}, {}, null, longitudinal); // gap 280
    const keepSharp = allActivities(plan).filter((a) => /^Keep sharp:/.test(a.title || ''));
    expect(keepSharp.length).toBeGreaterThan(0);
    expect(keepSharp[0].because).toMatch(/strong here/);
  });

  test('a small gap gets no maintenance sets', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 950, testDate: dateWeeksOut(8) }, {}, {}, null, longitudinal); // gap 30
    const keepSharp = allActivities(plan).filter((a) => /^Keep sharp:/.test(a.title || ''));
    expect(keepSharp.length).toBe(0);
  });
});
