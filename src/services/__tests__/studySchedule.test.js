/**
 * studySchedule.test.js — the schedule model that makes the plan honor what
 * onboarding collects: studyDaysPerWeek ("Your plan schedules exactly this
 * many"), study window (weekend students study weekends), session length.
 */

import {
  deriveSchedule,
  scheduledDayNames,
  testDayFor,
  weeklyMinutes,
  buildPlanProfile,
  DAY_NAMES,
} from '../studySchedule';

const intensity = { minutesPerDay: 35, daysPerWeek: 5 };

describe('deriveSchedule', () => {
  test('honors studyDaysPerWeek exactly', () => {
    const s = deriveSchedule({ studyDaysPerWeek: 3 }, intensity);
    expect(scheduledDayNames(s)).toHaveLength(3);
    expect(weeklyMinutes(s)).toBe(3 * 35);
  });

  test('defaults to the intensity band day count without a profile answer', () => {
    const s = deriveSchedule({}, intensity);
    expect(scheduledDayNames(s)).toHaveLength(5);
  });

  test('weekend study window enables Saturday and Sunday first', () => {
    const s = deriveSchedule({ studyDaysPerWeek: 2, studyWindow: 'weekend' }, intensity);
    expect(scheduledDayNames(s)).toEqual(['Saturday', 'Sunday']);
  });

  test('default pick order spreads across the week (Mon/Wed/Fri first)', () => {
    const s = deriveSchedule({ studyDaysPerWeek: 3 }, intensity);
    expect(scheduledDayNames(s)).toEqual(['Monday', 'Wednesday', 'Friday']);
  });

  test('day count clamps to [2,7]', () => {
    expect(scheduledDayNames(deriveSchedule({ studyDaysPerWeek: 1 }, intensity))).toHaveLength(2);
    expect(scheduledDayNames(deriveSchedule({ studyDaysPerWeek: 9 }, intensity))).toHaveLength(7);
  });

  test('session length maps to a cap; "varies" maps to none', () => {
    expect(deriveSchedule({ sessionLength: '15m' }, intensity).sessionCapMinutes).toBe(15);
    expect(deriveSchedule({ sessionLength: '60m' }, intensity).sessionCapMinutes).toBe(60);
    expect(deriveSchedule({ sessionLength: 'varies' }, intensity).sessionCapMinutes).toBeNull();
  });

  test('an edited userPrefs schedule wins over derivation', () => {
    const edited = { schedule: { edited: true, days: { Tuesday: 40, Sunday: 40 } } };
    const s = deriveSchedule({ studyDaysPerWeek: 6 }, intensity, edited);
    expect(s.source).toBe('edited');
    expect(scheduledDayNames(s)).toEqual(['Tuesday', 'Sunday']);
    expect(s.days.Tuesday).toBe(40);
  });

  test('an edited schedule with all-zero days falls back to derivation', () => {
    const edited = { schedule: { edited: true, days: {} } };
    const s = deriveSchedule({ studyDaysPerWeek: 4 }, intensity, edited);
    expect(s.source).toBe('derived');
    expect(scheduledDayNames(s)).toHaveLength(4);
  });
});

describe('testDayFor', () => {
  test('picks the enabled day with the most minutes, latest on ties', () => {
    const s = { days: { Monday: 35, Wednesday: 35, Friday: 35, Saturday: 0, Sunday: 0, Tuesday: 0, Thursday: 0 } };
    expect(testDayFor(s)).toBe('Friday');
  });

  test('a bigger day wins over a later day', () => {
    const s = { days: { Monday: 60, Wednesday: 35, Friday: 35, Saturday: 0, Sunday: 0, Tuesday: 0, Thursday: 0 } };
    expect(testDayFor(s)).toBe('Monday');
  });

  test('falls back to Saturday with no schedule', () => {
    expect(testDayFor(null)).toBe('Saturday');
    expect(testDayFor({ days: {} })).toBe('Saturday');
  });
});

describe('buildPlanProfile', () => {
  test('extracts plan fields incl. funnel answers from the user doc', () => {
    const user = {
      targetScore: 1400,
      testDate: '2026-10-03',
      currentScore: 1150,
      studyDaysPerWeek: 4,
      onboardingProfile: { answers: { studyWindow: 'weekend', sessionLength: '30m' } },
    };
    expect(buildPlanProfile(user)).toEqual({
      targetScore: 1400,
      testDate: '2026-10-03',
      currentScore: 1150,
      studyDaysPerWeek: 4,
      studyWindow: 'weekend',
      sessionLength: '30m',
    });
  });

  test('tolerates a missing user / missing onboardingProfile', () => {
    expect(buildPlanProfile(null)).toEqual({});
    expect(buildPlanProfile({ targetScore: 1300 }).studyWindow).toBeUndefined();
  });
});

test('DAY_NAMES is the full calendar week, Monday first', () => {
  expect(DAY_NAMES).toHaveLength(7);
  expect(DAY_NAMES[0]).toBe('Monday');
});
