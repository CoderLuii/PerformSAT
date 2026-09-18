/**
 * scoreReport.js — what Home should do about a test date that has passed.
 *
 * users/{uid}.scoreReports is a map keyed by test date:
 *   { [testDate]: { status: 'reported'|'declined'|'not-taken',
 *                   composite?, rw?, math?, reportedAt } }
 * written by useAuth.recordScoreReport. This selector turns the test date +
 * that map + today into ONE of:
 *   none     — nothing to ask (no date, date still ahead, or already answered)
 *   waiting  — the test is behind them but scores aren't out yet
 *   ask      — scores are (expected to be) out and we haven't asked
 *
 * Pure; `today` is injectable for tests.
 */
import { parseLocalDate } from '../../utils/localDate';
import { getScoreReleaseDate } from '../../data/satTestDates';
import { normalizeTestDates, splitTestDates } from './testDates';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function dayDiff(dateStr, today) {
  const d = parseLocalDate(dateStr);
  if (!d) return null;
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - t) / MS_PER_DAY);
}

/**
 * @param {object} args
 * @param {string|null} [args.testDate]   users/{uid}.testDate (primary)
 * @param {string[]|null} [args.testDates] users/{uid}.testDates (every sitting; wins over testDate)
 * @param {object|null} [args.scoreReports]
 * @param {Date} [args.today]
 * @returns {{kind:'none'|'waiting'|'ask', testDate:string|null, nextDate:string|null, releaseDate:string|null, daysSinceTest:number|null, daysToRelease:number|null, report:object|null}}
 */
export function getScoreReportState({ testDate = null, testDates = null, scoreReports = null, today = new Date() } = {}) {
  // Every sitting the student holds; a pre-list profile only has testDate.
  const all = normalizeTestDates(Array.isArray(testDates) && testDates.length ? testDates : (testDate ? [testDate] : []));
  const { upcoming, past } = splitTestDates(all, today);
  const nextDate = upcoming[0] || null;
  const reports = scoreReports && typeof scoreReports === 'object' ? scoreReports : {};
  const none = { kind: 'none', testDate: null, nextDate, releaseDate: null, daysSinceTest: null, daysToRelease: null, report: null };
  // The most recent past sitting we haven't heard about is the subject.
  const subject = [...past].reverse().find((d) => !reports[d]) || null;
  if (!subject) return none;
  const daysToTest = dayDiff(subject, today);
  if (daysToTest === null || daysToTest >= 0) return none;
  const release = getScoreReleaseDate(subject);
  const daysToRelease = release ? dayDiff(release.date, today) : null;
  const base = { testDate: subject, nextDate, releaseDate: release?.date || null, daysSinceTest: -daysToTest, daysToRelease, report: null };
  if (daysToRelease !== null && daysToRelease > 0) return { ...base, kind: 'waiting' };
  return { ...base, kind: 'ask' };
}

/**
 * The most recent OFFICIAL score the student reported, or null.
 *
 * @param {object|null} scoreReports
 * @returns {{testDate:string, composite:number, rw:number|null, math:number|null}|null}
 */
export function getLatestOfficialScore(scoreReports) {
  if (!scoreReports || typeof scoreReports !== 'object') return null;
  const reported = Object.entries(scoreReports)
    .filter(([date, r]) => r && r.status === 'reported' && Number.isFinite(r.composite) && /^\d{4}-\d{2}-\d{2}$/.test(date))
    .sort((a, b) => b[0].localeCompare(a[0]));
  if (reported.length === 0) return null;
  const [testDate, r] = reported[0];
  return { testDate, composite: r.composite, rw: Number.isFinite(r.rw) ? r.rw : null, math: Number.isFinite(r.math) ? r.math : null };
}
