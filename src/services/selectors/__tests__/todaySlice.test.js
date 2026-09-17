/**
 * todaySlice.test.js — countRemainingTodayTasks (the Dashboard tab badge).
 * Pins the stale-badge fix: for 'all-done' slices, `slice.activities` holds
 * the COMPLETED list (getTodaySlice contract), so the badge must derive
 * from the slice KIND, not from `activities.length`.
 */

import { getTodaySlice, countRemainingTodayTasks } from '../todaySlice';

const act = (day, completed = false, over = {}) => ({
  day,
  type: 'practice',
  title: 'Drill',
  completed,
  ...over,
});

describe('countRemainingTodayTasks', () => {
  test('null / malformed slice → 0', () => {
    expect(countRemainingTodayTasks(null)).toBe(0);
    expect(countRemainingTodayTasks(undefined)).toBe(0);
    expect(countRemainingTodayTasks({})).toBe(0);
  });

  test("'ready' counts the (all-incomplete) activities", () => {
    const slice = getTodaySlice(
      { weeks: [{ weekNumber: 1, activities: [act('Monday'), act('Monday')] }] },
      'Monday',
    );
    expect(slice.kind).toBe('ready');
    expect(countRemainingTodayTasks(slice)).toBe(2);
  });

  test("'partial' counts only the remaining activities", () => {
    const slice = getTodaySlice(
      { weeks: [{ weekNumber: 1, activities: [act('Monday', true), act('Monday')] }] },
      'Monday',
    );
    expect(slice.kind).toBe('partial');
    expect(countRemainingTodayTasks(slice)).toBe(1);
  });

  test("'all-done' → 0 even though slice.activities holds the completed list (stale-badge fix)", () => {
    const slice = getTodaySlice(
      {
        weeks: [{
          weekNumber: 1,
          activities: [act('Monday', true), act('Monday', true), act('Tuesday')],
        }],
      },
      'Monday',
    );
    expect(slice.kind).toBe('all-done');
    expect(slice.activities.length).toBe(2); // the trap the old badge fell into
    expect(countRemainingTodayTasks(slice)).toBe(0);
  });

  test("nextScheduledDay skips a day holding only skipped/lesson activities (rest day)", () => {
    // Monday is today (incomplete work). Wednesday holds only a skipped drill;
    // Thursday holds only a lesson. Neither is real work — nextScheduledDay
    // must skip both and land on Friday, which has a live drill.
    const slice = getTodaySlice(
      {
        weeks: [{
          weekNumber: 1,
          activities: [
            act('Monday'),
            act('Wednesday', false, { skipped: true }),
            act('Thursday', false, { type: 'lesson' }),
            act('Friday'),
          ],
        }],
      },
      'Monday',
    );
    // Monday has one done + we're asking Monday, so it's 'ready'; but the field
    // we care about is exercised via a rest-day. Ask Tuesday instead.
    const rest = getTodaySlice(
      {
        weeks: [{
          weekNumber: 1,
          activities: [
            act('Monday'),
            act('Wednesday', false, { skipped: true }),
            act('Thursday', false, { type: 'lesson' }),
            act('Friday'),
          ],
        }],
      },
      'Tuesday',
    );
    expect(rest.kind).toBe('rest-day');
    expect(rest.nextScheduledDay).toBe('Friday'); // skips skipped Wed + lesson Thu
    // sanity: the Monday slice is real work, unaffected
    expect(slice.kind).toBe('ready');
  });

  test("nextScheduledDay is null when every other day holds only skipped/lesson activities", () => {
    const rest = getTodaySlice(
      {
        weeks: [{
          weekNumber: 1,
          activities: [
            act('Monday'), // today's live work
            act('Wednesday', false, { skipped: true }),
            act('Friday', false, { type: 'lesson' }),
          ],
        }],
      },
      'Monday',
    );
    // Monday is 'ready' (live). getNextScheduledDay isn't attached to 'ready',
    // so probe rest-day directly on a plan whose only live day is Monday.
    const restProbe = getTodaySlice(
      {
        weeks: [{
          weekNumber: 1,
          activities: [
            act('Monday'),
            act('Wednesday', false, { skipped: true }),
            act('Friday', false, { type: 'lesson' }),
          ],
        }],
      },
      'Sunday',
    );
    expect(restProbe.kind).toBe('rest-day');
    expect(restProbe.nextScheduledDay).toBe('Monday'); // only live day, cycles to it
    expect(rest.kind).toBe('ready');
  });

  test("'rest-day', 'plan-complete', 'no-plan', 'refreshing' → 0", () => {
    const restDay = getTodaySlice(
      { weeks: [{ weekNumber: 1, activities: [act('Tuesday')] }] },
      'Monday',
    );
    expect(restDay.kind).toBe('rest-day');
    expect(countRemainingTodayTasks(restDay)).toBe(0);

    const planComplete = getTodaySlice(
      { weeks: [{ weekNumber: 1, activities: [act('Monday', true)] }] },
      'Monday',
    );
    expect(planComplete.kind).toBe('plan-complete');
    expect(countRemainingTodayTasks(planComplete)).toBe(0);

    expect(countRemainingTodayTasks(getTodaySlice(null, 'Monday'))).toBe(0);
    expect(countRemainingTodayTasks(getTodaySlice({ isRefreshing: true }, 'Monday'))).toBe(0);
  });
});

// ── Starter-plan diagnostic pin (2026-09-17) ────────────────────────────
// The onboarding starter plan schedules its check-in on one weekday. Until
// the diagnostic is taken it must lead TODAY every day — new users signing
// up on a rest day, or opening the app the day after, otherwise saw no
// diagnostic anywhere ("Nothing is scheduled for today").
describe('getTodaySlice — starter plan pins the owed diagnostic to today', () => {
  const checkIn = (day, over = {}) => ({
    day,
    type: 'test',
    activityType: 'miniDiagnostic',
    title: 'Take your diagnostic',
    completed: false,
    ...over,
  });
  const starter = (activities, over = {}) => ({
    planSource: 'onboarding-starter',
    weeks: [{ weekNumber: 1, activities }],
    ...over,
  });

  test('rest day → the check-in still leads today as a ready slice', () => {
    const slice = getTodaySlice(starter([checkIn('Monday'), act('Monday')]), 'Wednesday');
    expect(slice.kind).toBe('ready');
    expect(slice.activities).toHaveLength(1);
    expect(slice.activities[0]).toMatchObject({
      activityType: 'miniDiagnostic', pinned: true, weekIndex: 0, activityIndex: 0, day: 'Monday',
    });
    expect(countRemainingTodayTasks(slice)).toBe(1);
  });

  test('a study day with its own drills → the check-in goes first, drills follow', () => {
    const slice = getTodaySlice(starter([checkIn('Monday'), act('Monday'), act('Thursday')]), 'Thursday');
    expect(slice.kind).toBe('ready');
    expect(slice.activities.map((a) => a.activityType || a.type)).toEqual(['miniDiagnostic', 'practice']);
    expect(slice.activities[1].day).toBe('Thursday');
  });

  test('scheduled today → listed once, not duplicated', () => {
    const slice = getTodaySlice(starter([checkIn('Monday'), act('Monday')]), 'Monday');
    expect(slice.activities.filter((a) => a.activityType === 'miniDiagnostic')).toHaveLength(1);
    expect(slice.activities[0].pinned).toBeUndefined();
  });

  test("today's drills all done but the check-in pending elsewhere → 'partial' with the check-in", () => {
    const slice = getTodaySlice(starter([checkIn('Monday'), act('Wednesday', true)]), 'Wednesday');
    expect(slice.kind).toBe('partial');
    expect(slice.activities).toHaveLength(1);
    expect(slice.activities[0].activityType).toBe('miniDiagnostic');
  });

  test('completed or skipped check-in → no pin (plain rest day)', () => {
    expect(getTodaySlice(starter([checkIn('Monday', { completed: true }), act('Monday')]), 'Wednesday').kind).toBe('rest-day');
    expect(getTodaySlice(starter([checkIn('Monday', { skipped: true }), act('Monday')]), 'Wednesday').kind).toBe('rest-day');
  });

  test('a measured plan (not the starter) keeps its check-in on its scheduled day', () => {
    const plan = { planSource: 'test-t1', weeks: [{ weekNumber: 1, activities: [checkIn('Monday'), act('Monday')] }] };
    expect(getTodaySlice(plan, 'Wednesday').kind).toBe('rest-day');
    const noSource = { weeks: [{ weekNumber: 1, activities: [checkIn('Monday'), act('Monday')] }] };
    expect(getTodaySlice(noSource, 'Wednesday').kind).toBe('rest-day');
  });
});
