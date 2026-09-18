/**
 * Study schedule model — the single source of truth for WHICH days a student
 * studies and how many minutes each day holds.
 *
 * Before this module the generator hardcoded day names (review Monday, test
 * Saturday, mid-week Wed-Fri) and read exactly two profile fields. Onboarding
 * collects studyDaysPerWeek ("Your plan schedules exactly this many" —
 * InnerOnboarding), a study window (morning/evening/weekend/flexible), and a
 * session length (15m/30m/60m/varies); this module turns those into a concrete
 * per-day minutes map the generator and editor both obey.
 *
 * Precedence: an explicit student edit (userPrefs.schedule.edited) beats
 * everything; otherwise the schedule derives from profile + intensity.
 */

export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Which days get enabled first for a given study-window answer. Spread-out
// orders (Mon/Wed/Fri first) beat consecutive days for retention; the weekend
// answer front-loads Sat/Sun because that student TOLD us weekdays don't work.
const DAY_PICK_ORDER = {
  weekend: ['Saturday', 'Sunday', 'Friday', 'Wednesday', 'Monday', 'Tuesday', 'Thursday'],
  default: ['Monday', 'Wednesday', 'Friday', 'Tuesday', 'Thursday', 'Saturday', 'Sunday'],
};

const SESSION_CAP_MINUTES = { '15m': 15, '30m': 30, '60m': 60 };

const clampDayCount = (n) => Math.min(7, Math.max(2, Math.round(n)));

/**
 * Extract the plan-relevant profile fields from the user doc in one place so
 * every generateStudyPlan call site passes the same shape (previously each
 * call site hand-picked {targetScore, testDate} and dropped the rest).
 *
 * @param {object} user - the users/{uid} doc (useAuth user)
 * @returns {object} profile for generateStudyPlan
 */
export const buildPlanProfile = (user) => {
  if (!user) return {};
  const answers = user.onboardingProfile?.answers || {};
  return {
    targetScore: user.targetScore,
    testDate: user.testDate,
    currentScore: user.currentScore,
    studyDaysPerWeek: user.studyDaysPerWeek,
    studyWindow: answers.studyWindow,
    sessionLength: answers.sessionLength,
  };
};

/**
 * Derive the weekly schedule: which days, how many minutes each.
 *
 * @param {object} profile - {studyDaysPerWeek?, studyWindow?, sessionLength?}
 * @param {object} intensityConfig - {minutesPerDay, daysPerWeek} from the generator
 * @param {object|null} userPrefs - previous plan's userPrefs (survives regeneration)
 * @returns {{days: Object<string,number>, sessionCapMinutes: number|null, source: 'edited'|'derived'}}
 */
export const deriveSchedule = (profile = {}, intensityConfig = {}, userPrefs = null) => {
  // A student's explicit day edit is sacred — reuse it verbatim, only refreshing
  // per-day minutes if they also changed pacing since.
  const edited = userPrefs?.schedule?.edited ? userPrefs.schedule : null;
  if (edited && edited.days && Object.values(edited.days).some((m) => m > 0)) {
    return {
      days: normalizeDays(edited.days),
      sessionCapMinutes: edited.sessionCapMinutes ?? sessionCap(profile),
      source: 'edited',
    };
  }

  const minutesPerDay = Number.isFinite(intensityConfig.minutesPerDay) && intensityConfig.minutesPerDay > 0
    ? intensityConfig.minutesPerDay
    : 35;
  const dayCount = clampDayCount(
    Number.isFinite(profile.studyDaysPerWeek) && profile.studyDaysPerWeek > 0
      ? profile.studyDaysPerWeek
      : (intensityConfig.daysPerWeek || 5),
  );
  const pickOrder = DAY_PICK_ORDER[profile.studyWindow] || DAY_PICK_ORDER.default;
  const enabled = new Set(pickOrder.slice(0, dayCount));

  const days = {};
  DAY_NAMES.forEach((d) => { days[d] = enabled.has(d) ? minutesPerDay : 0; });
  return { days, sessionCapMinutes: sessionCap(profile), source: 'derived' };
};

const sessionCap = (profile = {}) => SESSION_CAP_MINUTES[profile.sessionLength] ?? null;

const normalizeDays = (days) => {
  const out = {};
  DAY_NAMES.forEach((d) => {
    const m = days?.[d];
    out[d] = Number.isFinite(m) && m > 0 ? Math.round(m) : 0;
  });
  return out;
};

/**
 * Enabled day names in calendar order (Monday first).
 */
export const scheduledDayNames = (schedule) =>
  DAY_NAMES.filter((d) => (schedule?.days?.[d] || 0) > 0);

/**
 * The day that should host a full practice test: the enabled day with the most
 * minutes; ties go to the LATEST such day in the week (tests close a week).
 * Falls back to Saturday when the schedule is missing/empty.
 */
export const testDayFor = (schedule) => {
  const names = scheduledDayNames(schedule);
  if (names.length === 0) return 'Saturday';
  let best = names[0];
  names.forEach((d) => {
    if (schedule.days[d] >= schedule.days[best]) best = d;
  });
  return best;
};

/** Total scheduled minutes per week. */
export const weeklyMinutes = (schedule) =>
  scheduledDayNames(schedule).reduce((sum, d) => sum + schedule.days[d], 0);
