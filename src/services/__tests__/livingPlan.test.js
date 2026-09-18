/**
 * livingPlan.test.js — the living daily engine: proven skills drop off today's
 * list, the next weakest skill pulls forward into the freed minutes, due
 * review items surface, and any failure falls back to the plain schedule.
 */

import { buildLivingDaySlice } from '../livingPlan';
import { DRILL_SIGNAL_MIN_ATTEMPTS } from '../selectors/focusAreaProgress';

const drillHistory = (accuracyPct, n = Math.max(4, DRILL_SIGNAL_MIN_ATTEMPTS)) => ({
  history: Array.from({ length: n }, (_, i) => ({
    correct: i < Math.round((accuracyPct / 100) * n),
    timestamp: Date.now() - i * 60000,
  })),
});

const mkPlan = () => ({
  weeks: [{
    weekNumber: 1,
    activities: [
      { type: 'practice', activityType: 'skillDrill', title: 'Practice: Exponent Rules', skillId: 'exponent-rules', skillName: 'Exponent Rules', section: 'math', duration: 15, day: 'Monday' },
      { type: 'practice', activityType: 'skillDrill', title: 'Practice: Words in Context', skillId: 'words-in-context', skillName: 'Words in Context', section: 'rw', duration: 15, day: 'Monday' },
      { type: 'strategy', activityType: 'strategyDrill', title: 'Trap recognition', duration: 10, day: 'Monday', tips: [] },
    ],
  }],
  weaknesses: [
    { skillId: 'exponent-rules', skill: 'Exponent Rules', section: 'math', accuracy: 30 },
    { skillId: 'words-in-context', skill: 'Words in Context', section: 'rw', accuracy: 40 },
    { skillId: 'slope-intercept-form', skill: 'Slope-Intercept Form', section: 'math', accuracy: 45 },
  ],
});

describe('buildLivingDaySlice', () => {
  test('a recovered skill drops and the next weakest pulls forward', () => {
    const slice = buildLivingDaySlice(mkPlan(), {
      todayDayName: 'Monday',
      skillProgress: { 'exponent-rules': drillHistory(90) },
      practiceTestResults: {},
    });
    const ids = slice.activities.map((a) => a.skillId).filter(Boolean);
    expect(ids).not.toContain('exponent-rules');
    expect(ids).toContain('slope-intercept-form');
    expect(slice.living.active).toBe(true);
    expect(slice.living.droppedSkills[0].skillId).toBe('exponent-rules');
    const pulled = slice.activities.find((a) => a.skillId === 'slope-intercept-form');
    expect(pulled.living).toBe(true);
  });

  test('a slipping unscheduled skill outranks a merely-weak one when pulling', () => {
    const plan = mkPlan();
    plan.weaknesses.push({ skillId: 'circle-equation', skill: 'Circle Equations', section: 'math', accuracy: 60 });
    const slice = buildLivingDaySlice(plan, {
      todayDayName: 'Monday',
      skillProgress: {
        'exponent-rules': drillHistory(90),
        'circle-equation': drillHistory(25),
      },
      practiceTestResults: {},
    });
    const pulledIds = slice.living.pulledSkills;
    expect(pulledIds[0]).toBe('circle-equation');
  });

  test('no strong evidence → the scheduled day passes through unchanged', () => {
    const slice = buildLivingDaySlice(mkPlan(), {
      todayDayName: 'Monday',
      skillProgress: { 'exponent-rules': drillHistory(90, 1) }, // below min attempts
      practiceTestResults: {},
    });
    expect(slice.activities.map((a) => a.skillId).filter(Boolean))
      .toEqual(['exponent-rules', 'words-in-context']);
    expect(slice.living.active).toBe(false);
  });

  test('strategy, completed, and student-added tasks never drop', () => {
    const plan = mkPlan();
    plan.weeks[0].activities[1].userEdited = true;
    const slice = buildLivingDaySlice(plan, {
      todayDayName: 'Monday',
      skillProgress: {
        'exponent-rules': drillHistory(90),
        'words-in-context': drillHistory(95),
      },
      practiceTestResults: {},
    });
    const titles = slice.activities.map((a) => a.title);
    expect(titles).toContain('Practice: Words in Context'); // userEdited stays
    expect(titles).toContain('Trap recognition');            // strategy stays
  });

  test('due review items surface as a reviewSession on the slice', () => {
    const past = new Date(Date.now() - 2 * 86400000).toISOString();
    const slice = buildLivingDaySlice(mkPlan(), {
      todayDayName: 'Monday',
      reviewQueue: {
        q1: { nextReviewDate: past, wrongCount: 2 },
        q2: { nextReviewDate: past, wrongCount: 1 },
      },
    });
    expect(slice.reviewSession.sessionSize).toBe(2);
  });

  test('rest day still surfaces the review session', () => {
    const past = new Date(Date.now() - 86400000).toISOString();
    const slice = buildLivingDaySlice(mkPlan(), {
      todayDayName: 'Tuesday',
      reviewQueue: { q1: { nextReviewDate: past, wrongCount: 1 } },
    });
    expect(slice.kind).toBe('rest-day');
    expect(slice.reviewSession.sessionSize).toBe(1);
  });

  test('malformed evidence falls back to the plain scheduled slice', () => {
    const slice = buildLivingDaySlice(mkPlan(), {
      todayDayName: 'Monday',
      skillProgress: { 'exponent-rules': { history: 'not-an-array' } },
      practiceTestResults: {},
    });
    expect(Array.isArray(slice.activities)).toBe(true);
    expect(slice.activities.length).toBeGreaterThan(0);
  });
});
