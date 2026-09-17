/**
 * todaySlice.js — pure "what should the student do today" read accessor.
 *
 * Extracted from studyPlanGenerator.js (Stage 2c of the bundle-split plan):
 * the generator statically imports the math bank (getQuestionById) and the
 * practice-routing service, so dashboard components that only needed this
 * selector dragged the whole corpus into their chunk. This module has ZERO
 * service/data imports — keep it that way.
 *
 * studyPlanGenerator re-exports getTodaySlice for back-compat; new consumers
 * should import from here (matches the selectors/ convention in CLAUDE.md).
 */

const DAY_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * planSource stamped by starterPlanService on the onboarding scaffold plan —
 * the plan that exists BEFORE any measurement (no diagnostic, no scored test).
 * Mirrored here rather than imported so this module stays import-free
 * (starterPlanService pulls the whole generator); starterPlanService.test
 * pins the two strings equal.
 */
export const STARTER_PLAN_SOURCE = 'onboarding-starter';

/** True for the provisional plan built from onboarding answers alone. */
export const isStarterPlan = (plan) => !!plan && plan.planSource === STARTER_PLAN_SOURCE;

/**
 * An activity that actually shows up as work in the day slice: not a lesson,
 * not skipped. Mirrors the same predicate used in getTodaySlice so "next work
 * on Thursday" can never point at a rest day (a day holding only skipped or
 * lesson activities).
 */
const isVisibleActivity = (a) => a && a.type !== 'lesson' && !a.skipped;

/** The starter plan's diagnostic check-in (its first activity) while still owed. */
const isPendingDiagnostic = (a) => isVisibleActivity(a) && a.activityType === 'miniDiagnostic' && !a.completed;

/**
 * Return the next day name (Sunday-cycled) in the same week that has at
 * least one VISIBLE scheduled activity. Returns null if no such day exists.
 *
 * @param {{activities?: Array<{day: string}>}} week
 * @param {string} fromDayName
 * @returns {string | null}
 */
function getNextScheduledDay(week, fromDayName) {
  const all = (week && Array.isArray(week.activities)) ? week.activities : [];
  const activities = all.filter(isVisibleActivity);
  if (activities.length === 0) return null;
  const startIdx = DAY_ORDER.indexOf(fromDayName);
  if (startIdx < 0) return null;
  const scheduledDays = new Set(activities.map(a => a.day));
  for (let step = 1; step <= 7; step++) {
    const candidate = DAY_ORDER[(startIdx + step) % 7];
    if (scheduledDays.has(candidate)) return candidate;
  }
  return null;
}

/**
 * getTodaySlice — return a tagged result describing what (if anything)
 * the student should do today. Pure function over a plan + a day name.
 *
 * The returned `kind` lets a card pick its visual state without re-deriving
 * the same logic at render time:
 *   - `'no-plan'`        plan is null/undefined/empty
 *   - `'refreshing'`     plan.isRefreshing flag is set (post-test regen)
 *   - `'plan-complete'`  every week's activities are completed
 *   - `'rest-day'`       no activities scheduled today this week
 *   - `'all-done'`       activities were scheduled today, all completed
 *   - `'partial'`        activities scheduled today, some done
 *   - `'ready'`          activities scheduled today, none done
 *
 * The day field on activities is a NAME ('Wednesday'), not an index — HC2
 * from the /autoplan eng review. We string-match accordingly.
 *
 * @param {object|null} plan          studyPlan with `weeks[].activities[].day`
 * @param {string} todayDayName       e.g. 'Wednesday'
 * @returns {{
 *   kind: string,
 *   activities: Array,
 *   completedToday?: Array,
 *   day: string,
 *   weekNumber: number | null,
 *   nextScheduledDay?: string | null,
 * }}
 */
export function getTodaySlice(plan, todayDayName) {
  const empty = { kind: 'no-plan', activities: [], day: todayDayName, weekNumber: null };

  if (!plan || typeof plan !== 'object') return empty;
  if (plan.isRefreshing === true) {
    return { kind: 'refreshing', activities: [], day: todayDayName, weekNumber: null };
  }
  if (!Array.isArray(plan.weeks) || plan.weeks.length === 0) return empty;

  const { weeks } = plan;

  // Current week = first week with any incomplete activity. Mirrors the
  // existing StudyPlanDashboard.jsx:123 derivation. Lesson-type activities
  // are excluded — see studyPlanGenerator.js:472 for the cleanup note.
  // (isVisibleActivity is defined at module scope and shared with
  // getNextScheduledDay so both agree on what counts as "work".)
  const currentWeekIndex = weeks.findIndex(
    w => Array.isArray(w?.activities) && w.activities.filter(isVisibleActivity).some(a => !a.completed),
  );

  if (currentWeekIndex < 0) {
    // Every week's activities are completed.
    return {
      kind: 'plan-complete',
      activities: [],
      day: todayDayName,
      weekNumber: weeks[weeks.length - 1]?.weekNumber || weeks.length,
    };
  }

  const week = weeks[currentWeekIndex];
  // Carry the (weekIndex, activityIndex) so a non-launchable item (e.g. a
  // student-added custom task) can be completed from the Today card via the
  // same mark-complete handler the Weekly view uses. Index is taken BEFORE
  // filtering so it points at the real position in week.activities.
  const stamped = (week.activities || [])
    .map((a, i) => ({ ...a, weekIndex: currentWeekIndex, activityIndex: i }))
    .filter(isVisibleActivity);
  let todayActivities = stamped.filter(a => a.day === todayDayName);

  // Starter plan: the owed diagnostic leads TODAY every day until it's taken,
  // whatever weekday the generator pinned it to. It is the gate for the whole
  // plan (nothing is measured without it), yet a check-in scheduled on a
  // rest day, or on a day the student has already passed, otherwise vanishes
  // from Home and the Today panel — new users couldn't find their diagnostic
  // (founder, 2026-09-17). Only the scaffold plan gets this treatment: a
  // measured student's periodic check-in keeps its scheduled day.
  if (isStarterPlan(plan) && !todayActivities.some(isPendingDiagnostic)) {
    const owed = stamped.find(isPendingDiagnostic);
    if (owed) todayActivities = [{ ...owed, pinned: true }, ...todayActivities];
  }

  if (todayActivities.length === 0) {
    return {
      kind: 'rest-day',
      activities: [],
      day: todayDayName,
      weekNumber: week.weekNumber,
      nextScheduledDay: getNextScheduledDay(week, todayDayName),
    };
  }

  const incomplete = todayActivities.filter(a => !a.completed);
  const completedToday = todayActivities.filter(a => a.completed);

  if (incomplete.length === 0) {
    return {
      kind: 'all-done',
      activities: completedToday,
      completedToday,
      day: todayDayName,
      weekNumber: week.weekNumber,
      nextScheduledDay: getNextScheduledDay(week, todayDayName),
    };
  }

  return {
    kind: completedToday.length > 0 ? 'partial' : 'ready',
    activities: incomplete,
    completedToday,
    day: todayDayName,
    weekNumber: week.weekNumber,
  };
}

/**
 * countRemainingTodayTasks — how many of today's activities are still TO DO.
 * Drives the Dashboard tab count badge. Only 'ready' and 'partial' slices
 * carry incomplete activities in `slice.activities`; for 'all-done' the same
 * field holds the COMPLETED list (see getTodaySlice's contract), so a naive
 * `activities.length` badge keeps nagging after the day's work is finished.
 *
 * @param {{kind?: string, activities?: Array} | null | undefined} slice  result of getTodaySlice
 * @returns {number} remaining-task count (0 for done/rest/empty states)
 */
export function countRemainingTodayTasks(slice) {
  if (!slice || !Array.isArray(slice.activities)) return 0;
  if (slice.kind !== 'ready' && slice.kind !== 'partial') return 0;
  return slice.activities.length;
}
