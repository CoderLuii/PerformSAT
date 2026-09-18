/**
 * testDates.js — a student can hold MORE than one SAT date (Oct 3 and Dec 5
 * registered together is the norm). The user doc keeps:
 *   testDates: string[]   every planned sitting, 'YYYY-MM-DD', sorted
 *   testDate:  string     the PRIMARY — the next upcoming sitting (or the
 *                         latest past one when nothing is ahead) — so every
 *                         consumer that paces off one date (plan, countdown,
 *                         calendar eyebrow, advice, Cloud Functions) keeps
 *                         working unchanged.
 * The primary drifts as time passes, so it's re-derived at read time
 * (useAuth normalizes the profile) and re-persisted when it changed.
 */
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Local 'YYYY-MM-DD' for a Date. */
export function todayKey(today = new Date()) {
  const t = new Date(today);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

/**
 * Valid, unique, ascending. Accepts an array, a single string, or nothing.
 * @param {string[]|string|null|undefined} input
 * @returns {string[]}
 */
export function normalizeTestDates(input) {
  const list = Array.isArray(input) ? input : (typeof input === 'string' ? [input] : []);
  return Array.from(new Set(list.filter((d) => typeof d === 'string' && DATE_RE.test(d)))).sort();
}

/**
 * Sittings still ahead (today counts as ahead) vs. already behind.
 * @param {string[]} dates
 * @param {Date} [today]
 * @returns {{upcoming:string[], past:string[]}}
 */
export function splitTestDates(dates, today = new Date()) {
  const key = todayKey(today);
  const all = normalizeTestDates(dates);
  return { upcoming: all.filter((d) => d >= key), past: all.filter((d) => d < key) };
}

/**
 * The date the app paces toward: the next upcoming sitting, else the latest
 * past one (so the score prompt / "taken" states still have a subject).
 * @param {string[]} dates
 * @param {Date} [today]
 * @returns {string|null}
 */
export function derivePrimaryTestDate(dates, today = new Date()) {
  const { upcoming, past } = splitTestDates(dates, today);
  if (upcoming.length) return upcoming[0];
  if (past.length) return past[past.length - 1];
  return null;
}

/**
 * The list after a single-date editor (Profile, onboarding) sets the primary:
 * the old primary is swapped for the new date, everything else is kept.
 * @param {string[]} dates
 * @param {string|null} oldPrimary
 * @param {string|null} next  null = clear the primary
 * @returns {string[]}
 */
export function withPrimaryReplaced(dates, oldPrimary, next) {
  const rest = normalizeTestDates(dates).filter((d) => d !== oldPrimary);
  return normalizeTestDates(next ? [...rest, next] : rest);
}

/**
 * The student's full date list from a profile, tolerating pre-list docs
 * (only `testDate`).
 * @param {{testDate?:string|null, testDates?:string[]}|null} user
 * @returns {string[]}
 */
export function getUserTestDates(user) {
  if (!user) return [];
  if (Array.isArray(user.testDates) && user.testDates.length) return normalizeTestDates(user.testDates);
  return normalizeTestDates(user.testDate || []);
}
