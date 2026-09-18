import { parseLocalDate } from '../utils/localDate';

/**
 * Canonical list of official College Board SAT administration dates (US +
 * international — the same schedule applies to all students).
 *
 * SINGLE SOURCE OF TRUTH. Every place that needs an official SAT date — the
 * post-signup inner-onboarding date chips, the dashboard exam tile, any
 * date-select UI — reads from here. Do not re-declare this list anywhere else.
 *
 * SOURCE: College Board dates & deadlines page (verified 2026-07-06):
 *   https://satsuite.collegeboard.org/sat/dates-deadlines
 * The 2026-27 dates are confirmed (with registration + late-registration
 * deadlines). The 2027-28 dates are College Board's *anticipated* schedule
 * (`anticipated: true`, no deadlines published yet).
 *
 * MAINTENANCE: once per cycle, re-verify + extend this one array; every
 * consumer updates automatically. Past dates are filtered out at read time
 * (getUpcomingSATDates), and the inner-onboarding screen always offers a native
 * date picker, so a stale list only means fewer quick-pick chips — never a
 * wrong stored date.
 *
 * Fields: `name` human label, `date` 'YYYY-MM-DD' (local, matches the
 * users/{uid}.testDate contract), `regDeadline` regular registration deadline,
 * `lateDeadline` deadline for changes/cancellation/late registration.
 */
export const SAT_TEST_DATES = [
  // 2026-27 — confirmed
  { name: 'August 2026 SAT', date: '2026-08-22', regDeadline: '2026-08-07', lateDeadline: '2026-08-11' },
  { name: 'September 2026 SAT', date: '2026-09-12', regDeadline: '2026-08-28', lateDeadline: '2026-09-01' },
  { name: 'October 2026 SAT', date: '2026-10-03', regDeadline: '2026-09-18', lateDeadline: '2026-09-22' },
  { name: 'November 2026 SAT', date: '2026-11-07', regDeadline: '2026-10-23', lateDeadline: '2026-10-27' },
  { name: 'December 2026 SAT', date: '2026-12-05', regDeadline: '2026-11-20', lateDeadline: '2026-11-24' },
  { name: 'March 2027 SAT', date: '2027-03-06', regDeadline: '2027-02-19', lateDeadline: '2027-02-23' },
  { name: 'May 2027 SAT', date: '2027-05-01', regDeadline: '2027-04-16', lateDeadline: '2027-04-20' },
  { name: 'June 2027 SAT', date: '2027-06-05', regDeadline: '2027-05-21', lateDeadline: '2027-05-25' },
  // 2027-28 — anticipated (deadlines not yet published)
  { name: 'August 2027 SAT', date: '2027-08-28', anticipated: true },
  { name: 'September 2027 SAT', date: '2027-09-18', anticipated: true },
  { name: 'October 2027 SAT', date: '2027-10-02', anticipated: true },
  { name: 'November 2027 SAT', date: '2027-11-06', anticipated: true },
  { name: 'December 2027 SAT', date: '2027-12-04', anticipated: true },
  { name: 'March 2028 SAT', date: '2028-03-04', anticipated: true },
  { name: 'May 2028 SAT', date: '2028-05-06', anticipated: true },
  { name: 'June 2028 SAT', date: '2028-06-03', anticipated: true },
];

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Days from a Saturday SAT to its score release. College Board has released
 * scores 13 days after every administration since the digital SAT launched
 * (the second Friday after test day: Aug 23 2025 → Sep 5, Oct 4 → Oct 17,
 * Mar 14 2026 → Mar 27, …). Used for every date on the list AND for custom
 * (school-day) dates, always labelled "expected" in copy — College Board
 * publishes the exact day only weeks ahead.
 */
export const SCORE_RELEASE_LAG_DAYS = 13;

/**
 * Expected score-release date for a test date.
 *
 * @param {string} testDate - 'YYYY-MM-DD'
 * @returns {{date:string, expected:boolean}|null} null for a malformed date
 */
export function getScoreReleaseDate(testDate) {
  const d = parseLocalDate(testDate);
  if (!d) return null;
  d.setDate(d.getDate() + SCORE_RELEASE_LAG_DAYS);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return { date: `${y}-${m}-${day}`, expected: true };
}

/**
 * Official SAT dates on or after `from` (today by default), soonest first.
 * Parses via parseLocalDate so the "is it still upcoming?" comparison happens
 * at local midnight (avoids the `new Date('YYYY-MM-DD')`-is-UTC off-by-one).
 *
 * @param {Date} [from=new Date()] - reference "now"; entries before its day are dropped
 * @returns {{name:string, date:string, regDeadline?:string, lateDeadline?:string, anticipated?:boolean}[]}
 */
export function getUpcomingSATDates(from = new Date()) {
  const cutoff = new Date(from);
  cutoff.setHours(0, 0, 0, 0);
  return SAT_TEST_DATES
    .filter((sat) => {
      const d = parseLocalDate(sat.date);
      return d && d >= cutoff;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Map a stored 'YYYY-MM-DD' back to its official SAT name (e.g. "October 2026
 * SAT"), or null if the date isn't an official administration.
 *
 * @param {string} dateStr - 'YYYY-MM-DD'
 * @returns {string|null}
 */
export function getSATNameFromDate(dateStr) {
  const sat = SAT_TEST_DATES.find((s) => s.date === dateStr);
  return sat ? sat.name : null;
}

/**
 * Compact chip label for a date string, e.g. '2026-10-03' → 'Oct 3'.
 * Presentation helper for the onboarding date chips.
 *
 * @param {string} dateStr - 'YYYY-MM-DD'
 * @returns {string}
 */
export function formatSatChipLabel(dateStr) {
  const [, m, d] = String(dateStr).split('-');
  return `${MONTHS_SHORT[Number(m) - 1]} ${Number(d)}`;
}
