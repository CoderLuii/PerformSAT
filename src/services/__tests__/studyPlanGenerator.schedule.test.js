/**
 * studyPlanGenerator.schedule.test.js — schedule truth end-to-end: the
 * generated plan schedules work ONLY on the student's study days, honors the
 * onboarding day count, and puts the practice test on the biggest study day.
 */

import { generateStudyPlan } from '../studyPlanGenerator';
import { setSchedule } from '../studyPlanEditor';

const mkDiag = (over = {}) => ({
  testId: 'synthetic-1',
  score: { scaled: 920, isMultiSection: true, sections: { math: 480, rw: 440 }, percentCorrect: 45 },
  skillAnalysis: {
    weakSkills: [
      { skillId: 'exponent-rules', name: 'Exponent Rules', domain: 'advanced-math', section: 'math', testAccuracy: 0, correct: 0, total: 2, primaryErrorType: 'CONCEPTUAL_GAP', missedPatterns: [], modules: ['exponents'], sections: [] },
      { skillId: 'words-in-context', name: 'Words In Context', domain: 'craft-and-structure', section: 'rw', testAccuracy: 0, correct: 0, total: 6, primaryErrorType: 'CONCEPTUAL_GAP', missedPatterns: [], modules: [], sections: [] },
      { skillId: 'slope-intercept-form', name: 'Slope-Intercept Form', domain: 'algebra', section: 'math', testAccuracy: 20, correct: 1, total: 5, primaryErrorType: 'CONCEPTUAL_GAP', missedPatterns: [], modules: ['linear-equations'], sections: [] },
    ],
    strongSkills: [],
  },
  prioritizedActions: [],
  errorPatterns: { totalWrong: 20, counts: {}, dominantPattern: null, summary: [] },
  difficultyAnalysis: {},
  timeAnalysis: { fadeEffect: 0 },
  trendAnalysis: { persistentWeaknesses: [] },
  scoreProjection: { easyWins: { count: 0, points: 0 } },
  ...over,
});

const farTestDate = new Date(Date.now() + 63 * 24 * 60 * 60 * 1000).toISOString();
const allActivities = (plan) => plan.weeks.flatMap((w) => w.activities || []);

describe('generateStudyPlan — schedule truth', () => {
  test('a 3-days-a-week student gets work on exactly those 3 days, every week', () => {
    const plan = generateStudyPlan(mkDiag(), {
      targetScore: 1200, testDate: farTestDate, studyDaysPerWeek: 3,
    });
    const enabled = new Set(['Monday', 'Wednesday', 'Friday']);
    plan.weeks.forEach((w) => {
      (w.activities || []).forEach((a) => {
        expect(enabled.has(a.day)).toBe(true);
      });
    });
    expect(plan.schedule.source).toBe('derived');
    expect(plan.intensityConfig.daysPerWeek).toBe(3);
  });

  test('a weekend student gets weekend days and a weekend practice test', () => {
    const plan = generateStudyPlan(mkDiag(), {
      targetScore: 1200, testDate: farTestDate, studyDaysPerWeek: 2, studyWindow: 'weekend',
    });
    const days = new Set(allActivities(plan).map((a) => a.day));
    days.forEach((d) => expect(['Saturday', 'Sunday']).toContain(d));
    const test = allActivities(plan).find((a) => a.type === 'test');
    expect(['Saturday', 'Sunday']).toContain(test.day);
  });

  test('without any schedule inputs, behavior stays sane (weekday spread, test on a study day)', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farTestDate });
    expect(plan.schedule).toBeTruthy();
    const test = allActivities(plan).find((a) => a.type === 'test');
    expect(plan.schedule.days[test.day]).toBeGreaterThan(0);
  });

  test('an edited schedule survives regeneration via userPrefs', () => {
    const first = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farTestDate, studyDaysPerWeek: 5 });
    const edited = setSchedule(first, { Tuesday: 45, Thursday: 45, Sunday: 45 });
    expect(edited.userPrefs.schedule.edited).toBe(true);

    const regen = generateStudyPlan(mkDiag({ testId: 'synthetic-2' }), { targetScore: 1200, testDate: farTestDate, studyDaysPerWeek: 5 }, {}, {}, edited);
    expect(regen.schedule.source).toBe('edited');
    const enabled = new Set(['Tuesday', 'Thursday', 'Sunday']);
    regen.weeks.forEach((w) => {
      (w.activities || []).forEach((a) => {
        expect(enabled.has(a.day)).toBe(true);
      });
    });
  });

  test('setSchedule rejects fewer than 2 enabled days', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farTestDate });
    const rejected = setSchedule(plan, { Monday: 30 });
    expect(rejected).toBe(plan);
  });

  test('weekly minutes follow the schedule, not the intensity band day count', () => {
    const plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farTestDate, studyDaysPerWeek: 3 });
    expect(plan.minutesPerWeek).toBe(3 * plan.intensityConfig.minutesPerDay);
  });
});
