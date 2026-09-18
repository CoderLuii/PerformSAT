import { getScoreReportState, getLatestOfficialScore } from '../scoreReport';
import { getScoreReleaseDate } from '../../../data/satTestDates';

const d = (y, m, day) => new Date(y, m - 1, day, 12);

describe('getScoreReleaseDate', () => {
  it('is 13 days after a Saturday sitting (the second Friday) and flagged expected', () => {
    expect(getScoreReleaseDate('2026-08-22')).toEqual({ date: '2026-09-04', expected: true });
    expect(getScoreReleaseDate('2026-10-03')).toEqual({ date: '2026-10-16', expected: true });
    expect(getScoreReleaseDate('2026-12-05')).toEqual({ date: '2026-12-18', expected: true });
    expect(getScoreReleaseDate('nope')).toBeNull();
  });
});

describe('getScoreReportState', () => {
  it('nothing to do before the test or without a date', () => {
    expect(getScoreReportState({ testDate: '2026-10-03', today: d(2026, 8, 24) }).kind).toBe('none');
    expect(getScoreReportState({ testDate: null, today: d(2026, 8, 24) }).kind).toBe('none');
    expect(getScoreReportState({ testDate: '2026-08-24', today: d(2026, 8, 24) }).kind).toBe('none'); // test day itself
  });
  it('waits between the test and the release', () => {
    const s = getScoreReportState({ testDate: '2026-08-22', today: d(2026, 8, 24) });
    expect(s).toEqual({ kind: 'waiting', testDate: '2026-08-22', nextDate: null, releaseDate: '2026-09-04', daysSinceTest: 2, daysToRelease: 11, report: null });
  });
  it('with several dates: asks about the latest unreported past sitting and names the next one', () => {
    const dates = ['2026-08-22', '2026-10-03', '2026-12-05'];
    const s = getScoreReportState({ testDate: '2026-10-03', testDates: dates, today: d(2026, 9, 6) });
    expect(s.kind).toBe('ask');
    expect(s.testDate).toBe('2026-08-22');
    expect(s.nextDate).toBe('2026-10-03');
    // Once Aug 22 is answered, nothing to ask until Oct 3 passes.
    const done = getScoreReportState({ testDates: dates, scoreReports: { '2026-08-22': { status: 'declined' } }, today: d(2026, 9, 6) });
    expect(done.kind).toBe('none');
    expect(done.nextDate).toBe('2026-10-03');
    // Two past sittings, only the older reported → asks about the newer one.
    const two = getScoreReportState({ testDates: dates, scoreReports: { '2026-08-22': { status: 'reported', composite: 1300 } }, today: d(2026, 10, 20) });
    expect(two.kind).toBe('ask');
    expect(two.testDate).toBe('2026-10-03');
    expect(two.nextDate).toBe('2026-12-05');
  });
  it('asks from release day on', () => {
    expect(getScoreReportState({ testDate: '2026-08-22', today: d(2026, 9, 4) }).kind).toBe('ask');
    expect(getScoreReportState({ testDate: '2026-08-22', today: d(2026, 9, 20) }).kind).toBe('ask');
  });
  it('never re-asks a date that has any report', () => {
    for (const status of ['reported', 'declined', 'not-taken']) {
      const s = getScoreReportState({ testDate: '2026-08-22', scoreReports: { '2026-08-22': { status, composite: 1450 } }, today: d(2026, 9, 20) });
      expect(s.kind).toBe('none');
      expect(s.testDate).toBeNull();
    }
  });
});

describe('getLatestOfficialScore', () => {
  it('returns the newest reported composite, ignoring declines and skips', () => {
    const reports = {
      '2026-03-14': { status: 'reported', composite: 1310, rw: 680, math: 630 },
      '2026-05-02': { status: 'declined' },
      '2026-08-22': { status: 'reported', composite: 1450 },
      '2026-06-06': { status: 'not-taken' },
    };
    expect(getLatestOfficialScore(reports)).toEqual({ testDate: '2026-08-22', composite: 1450, rw: null, math: null });
    expect(getLatestOfficialScore({ '2026-05-02': { status: 'declined' } })).toBeNull();
    expect(getLatestOfficialScore(null)).toBeNull();
  });
});
