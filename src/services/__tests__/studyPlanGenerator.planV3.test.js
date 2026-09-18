/**
 * studyPlanGenerator.planV3.test.js — Plan v3 "TRUE plan" substance:
 *
 *  A1 section floor  — a plan never goes single-section while both sections
 *                      carry gap evidence (founder-flagged: an all-R&W plan
 *                      with Math at its weakest).
 *  A2 density floor  — thin weak-flag lists backfill with reinforcement/
 *                      maintenance sets instead of producing half-empty weeks.
 *  A3 journey arc    — plan.arc: contiguous phases, milestones that match the
 *                      scheduled weeks, honest score trajectory.
 *  D  unified grammar — strategy cards are LAUNCHABLE sessions (trap/careless
 *                      → real drills with skillIds; pacing → pacingDrill;
 *                      mistake review → testMissReview with a testId, only
 *                      when the source test's misses are reviewable).
 *  A4 label hygiene  — R&W pattern slugs never surface as raw abbreviations.
 */

import { generateStudyPlan } from '../studyPlanGenerator';
import { formatPatternLabel } from '../selectors/missedPatternLabel';

const weakSkill = (over = {}) => ({
  skillId: 'words-in-context', name: 'Words In Context', domain: 'craft-and-structure',
  section: 'rw', testAccuracy: 25, contentAccuracy: 25, correct: 1, total: 4, attempted: 4,
  evidenceLevel: 'measured', primaryErrorType: 'conceptual_gap',
  errorTypes: ['conceptual_gap', 'conceptual_gap', 'conceptual_gap'],
  missedPatterns: [], modules: [], sections: [],
  ...over,
});

const mkDiag = (over = {}) => ({
  testId: 'practice-test-3',
  testTitle: 'Practice Test 3',
  score: { scaled: 920, isMultiSection: true, sections: { math: 480, rw: 440 }, percentCorrect: 45 },
  skillAnalysis: {
    weakSkills: [
      weakSkill(),
      weakSkill({ skillId: 'transitions', name: 'Transitions', domain: 'expression-of-ideas', primaryErrorType: 'trap_susceptibility', errorTypes: ['trap_susceptibility', 'trap_susceptibility'] }),
      weakSkill({ skillId: 'boundaries', name: 'Boundaries', domain: 'standard-english-conventions', testAccuracy: 30, contentAccuracy: 30 }),
      weakSkill({ skillId: 'linear-equations', name: 'Linear Equations', domain: 'algebra', section: 'math', testAccuracy: 20, contentAccuracy: 20, errorTypes: ['careless_error', 'careless_error', 'conceptual_gap'] }),
      weakSkill({ skillId: 'percents', name: 'Percents', domain: 'problem-solving', section: 'math', testAccuracy: 35, contentAccuracy: 35 }),
    ],
    strongSkills: [
      { skillId: 'calculate-mean', name: 'Calculating the Mean', section: 'math', testAccuracy: 95 },
    ],
    allSkills: [
      weakSkill(),
      weakSkill({ skillId: 'transitions', name: 'Transitions', domain: 'expression-of-ideas', errorTypes: ['trap_susceptibility', 'trap_susceptibility'] }),
      weakSkill({ skillId: 'linear-equations', name: 'Linear Equations', domain: 'algebra', section: 'math', errorTypes: ['careless_error', 'careless_error'] }),
      // Shaky (50-74%) — density-backfill reinforcement candidates.
      weakSkill({ skillId: 'triangles', name: 'Triangles', domain: 'geometry', section: 'math', testAccuracy: 60, contentAccuracy: 60, errorTypes: [] }),
      weakSkill({ skillId: 'inferences', name: 'Inferences', domain: 'information-and-ideas', section: 'rw', testAccuracy: 67, contentAccuracy: 67, errorTypes: [] }),
      // Strong (≥80%) — maintenance candidates.
      weakSkill({ skillId: 'calculate-mean', name: 'Calculating the Mean', domain: 'problem-solving', section: 'math', testAccuracy: 95, contentAccuracy: 95, errorTypes: [] }),
      weakSkill({ skillId: 'central-ideas-and-details', name: 'Central Ideas', domain: 'information-and-ideas', section: 'rw', testAccuracy: 85, contentAccuracy: 85, errorTypes: [] }),
    ],
  },
  prioritizedActions: [],
  errorPatterns: {
    totalWrong: 20,
    counts: { trap_susceptibility: 4, careless_error: 3, time_pressure: 3 },
    dominantPattern: null,
    summary: [],
  },
  difficultyAnalysis: {},
  timeAnalysis: { fadeEffect: 0 },
  trendAnalysis: { persistentWeaknesses: [] },
  scoreProjection: {
    easyWins: { count: 0, points: 0 },
    domainProjections: [
      { domain: 'algebra', projectedPointGain: 60 },
      { domain: 'craft-and-structure', projectedPointGain: 50 },
    ],
    errorTypeProjections: [
      { errorType: 'trap_susceptibility', projectedPointGain: 30 },
      { errorType: 'careless_error', projectedPointGain: 20 },
    ],
  },
  ...over,
});

const longitudinal = {
  scoreTrajectory: [
    { testId: 'prior-1', scaledScore: 900, date: '2026-05-01' },
    { testId: 'practice-test-3', scaledScore: 920, date: '2026-06-01' },
  ],
  persistentWeaknesses: [],
  skillHistory: {},
};

const dateWeeksOut = (w) => new Date(Date.now() + w * 7 * 86400000).toISOString();
const profile = { targetScore: 1300, testDate: dateWeeksOut(8) };
const genPlan = (diag = mkDiag(), prof = profile) =>
  generateStudyPlan(diag, prof, {}, {}, null, longitudinal);

const sectionOf = (a) => (a?.section === 'rw' ? 'rw' : 'math');
const skillActs = (week) => (week.activities || []).filter((a) => a.type === 'practice');

describe('A1 — section floor: a TRUE plan never goes single-section', () => {
  test('every week with skill work draws from BOTH sections while pools last', () => {
    const plan = genPlan();
    const weeksWithSkillWork = plan.weeks.filter((w) => skillActs(w).length >= 2);
    expect(weeksWithSkillWork.length).toBeGreaterThan(0);
    weeksWithSkillWork.forEach((w) => {
      const sections = new Set(skillActs(w).map(sectionOf));
      expect(sections.has('rw')).toBe(true);
      expect(sections.has('math')).toBe(true);
    });
  });

  test('a section-imbalanced diagnostic (R&W outranking) still schedules math weekly', () => {
    // R&W weak skills get extreme priority mass; math still must appear.
    const diag = mkDiag();
    diag.skillAnalysis.weakSkills = diag.skillAnalysis.weakSkills.map((s) =>
      s.section === 'rw' ? { ...s, testAccuracy: 5, contentAccuracy: 5 } : s,
    );
    const plan = genPlan(diag);
    plan.weeks.filter((w) => skillActs(w).length >= 2).forEach((w) => {
      expect(new Set(skillActs(w).map(sectionOf)).has('math')).toBe(true);
    });
  });

  test('a genuinely single-section diagnostic does not fabricate the other section', () => {
    const diag = mkDiag();
    diag.skillAnalysis.weakSkills = diag.skillAnalysis.weakSkills.filter((s) => s.section === 'math');
    diag.skillAnalysis.allSkills = diag.skillAnalysis.allSkills.filter((s) => s.section === 'math');
    const plan = genPlan(diag);
    const rw = plan.weeks.flatMap(skillActs).filter((a) => sectionOf(a) === 'rw');
    expect(rw.length).toBe(0);
  });
});

describe('A2 — density floor: thin weak-flags never produce half-empty weeks', () => {
  test('a one-weakness diagnostic backfills with reinforcement/maintenance sets', () => {
    const diag = mkDiag();
    diag.skillAnalysis.weakSkills = [weakSkill()]; // single confirmed gap
    diag.errorPatterns.counts = {}; // no strategy sessions either
    const plan = genPlan(diag);
    const backfill = plan.weeks.flatMap((w) => w.activities || [])
      .filter((a) => a.planRole === 'reinforce' || a.planRole === 'maintain');
    expect(backfill.length).toBeGreaterThan(0);
    // Backfill work is honest: named, sectioned, with a because-line.
    backfill.forEach((a) => {
      expect(a.because).toBeTruthy();
      expect(a.skillId).toBeTruthy();
      expect(['rw', 'math']).toContain(sectionOf(a));
    });
  });
});

describe('A1b — week 1 anchors forward, never onto past days (weekend fix)', () => {
  afterEach(() => { jest.useRealTimers(); });

  test('a Saturday-created plan schedules week 1 on Sat/Sun, not a past Friday', () => {
    // 2026-08-15 is a Saturday. Default schedule is Mon-Fri, so no study
    // days remain this week — the old clamp fell back to PAST Friday and
    // stuffed the full weekly budget onto it (review finding).
    jest.useFakeTimers({ doNotFake: ['performance'] });
    jest.setSystemTime(new Date(2026, 7, 15, 10, 0, 0));
    const plan = genPlan();
    const week1Days = new Set((plan.weeks[0].activities || []).map((a) => a.day));
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach((d) => {
      expect(week1Days.has(d)).toBe(false);
    });
    expect(plan.weeks[0].activities.length).toBeGreaterThan(0);
    // The reviewed harm was ~3 HOURS stuffed onto one clamped past day.
    // With the forward anchor + partial-week cap, no single weekend day
    // carries more than a generous day's load.
    const perDay = {};
    (plan.weeks[0].activities || []).forEach((a) => {
      perDay[a.day] = (perDay[a.day] || 0) + (a.duration || 0);
    });
    Object.values(perDay).forEach((mins) => expect(mins).toBeLessThanOrEqual(100));
  });

  test('a Thursday-created plan keeps Thu/Fri and drops Mon-Wed', () => {
    jest.useFakeTimers({ doNotFake: ['performance'] });
    jest.setSystemTime(new Date(2026, 7, 13, 10, 0, 0)); // Thursday
    const plan = genPlan();
    const week1Days = new Set((plan.weeks[0].activities || []).map((a) => a.day));
    ['Monday', 'Tuesday', 'Wednesday'].forEach((d) => expect(week1Days.has(d)).toBe(false));
    expect(plan.weeks[0].activities.length).toBeGreaterThan(0);
  });
});

describe('A3 — journey arc', () => {
  test('phases are contiguous, labeled, and cover every week exactly once', () => {
    const plan = genPlan();
    expect(plan.arc).toBeTruthy();
    const covered = plan.arc.phases.flatMap((p) => p.weekNumbers);
    expect(covered).toEqual(plan.weeks.map((w) => w.weekNumber));
    expect(plan.arc.phases[0].label).toBe('Foundation');
    expect(plan.arc.phases.length).toBeGreaterThanOrEqual(2);
  });

  test('milestones mirror the scheduled measurements and the exam date', () => {
    const plan = genPlan();
    const fullTestWeeks = plan.weeks.filter((w) => w.isTestWeek).map((w) => w.weekNumber);
    const arcTestWeeks = plan.arc.milestones.filter((m) => m.type === 'fullTest').map((m) => m.weekNumber);
    fullTestWeeks.forEach((wn) => expect(arcTestWeeks).toContain(wn));
    expect(plan.arc.milestones.some((m) => m.type === 'exam')).toBe(true);
    expect(plan.arc.startScore).toBe(920);
    expect(plan.arc.targetScore).toBe(1300);
  });

  test('projected gains are honest: capped at the real gap, multiples of 10', () => {
    const plan = genPlan();
    const total = plan.arc.phases.reduce((s, p) => s + (p.projectedGain || 0), 0);
    expect(total).toBeLessThanOrEqual(1300 - 920 + 10);
    plan.arc.phases.forEach((p) => {
      if (p.projectedGain != null) expect(p.projectedGain % 10).toBe(0);
    });
  });
});

describe('D — unified session grammar: every strategy card launches something real', () => {
  test('trap pattern becomes a real drill on the trap-bitten skill', () => {
    const plan = genPlan();
    const trap = plan.weeks.flatMap((w) => w.activities || []).find((a) => a.activityType === 'trapDrill');
    expect(trap).toBeTruthy();
    expect(trap.type).toBe('practice'); // routes through the shared drill router
    expect(trap.skillId).toBe('transitions'); // the skill with the trap errors
    expect(trap.because).toBeTruthy();
  });

  test('careless pattern becomes a precision drill on the careless skill', () => {
    const plan = genPlan();
    const prec = plan.weeks.flatMap((w) => w.activities || []).find((a) => a.activityType === 'precisionDrill');
    expect(prec).toBeTruthy();
    expect(prec.type).toBe('practice');
    expect(prec.skillId).toBe('linear-equations');
  });

  test('time pressure becomes a pacingDrill session (launchable, not tips)', () => {
    const plan = genPlan();
    const pacing = plan.weeks.flatMap((w) => w.activities || []).find((a) => a.activityType === 'pacingDrill');
    expect(pacing).toBeTruthy();
  });

  test('mistake review carries the source testId for the deep-link', () => {
    const plan = genPlan();
    const review = plan.weeks.flatMap((w) => w.activities || []).find((a) => a.activityType === 'testMissReview');
    expect(review).toBeTruthy();
    expect(review.testId).toBe('practice-test-3');
    expect(plan.weeks.flatMap((w) => w.activities || []).some((a) => a.activityType === 'reviewMistakes')).toBe(false);
  });

  test('a mini-diagnostic source emits NO test-miss review (nothing to open)', () => {
    const plan = genPlan(mkDiag({ testId: 'mini-diagnostic-v1', testTitle: 'Quick Check-In' }));
    const review = plan.weeks.flatMap((w) => w.activities || []).find((a) => a.activityType === 'testMissReview');
    expect(review).toBeUndefined();
  });
});

describe('A4 — label hygiene: no raw skill abbreviations reach students', () => {
  test('R&W pattern slugs expand their skill prefix', () => {
    expect(formatPatternLabel('tsp-overall-structure')).toBe('Text Structure & Purpose: Overall Structure');
    expect(formatPatternLabel('fss-subject-verb-agreement')).toBe('Form & Sense: Subject Verb Agreement');
    expect(formatPatternLabel('ctc-point-of-view')).toBe('Cross-Text: Point of View');
  });

  test('math pattern slugs keep the original formatting', () => {
    expect(formatPatternLabel('reverse-percent')).toBe('Reverse Percent');
    expect(formatPatternLabel('right-triangle-trig-ratios')).toBe('Right Triangle Trig Ratios');
  });
});
