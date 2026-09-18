import { normalizeTestDates, splitTestDates, derivePrimaryTestDate, withPrimaryReplaced, getUserTestDates, todayKey } from '../testDates';

const TODAY = new Date(2026, 7, 25, 12);

describe('testDates', () => {
  it('normalizes: valid, unique, sorted; accepts a single string', () => {
    expect(normalizeTestDates(['2026-12-05', '2026-10-03', 'nope', '2026-10-03', null])).toEqual(['2026-10-03', '2026-12-05']);
    expect(normalizeTestDates('2026-10-03')).toEqual(['2026-10-03']);
    expect(normalizeTestDates(undefined)).toEqual([]);
  });
  it('splits around today (today counts as upcoming) and derives the primary', () => {
    expect(todayKey(TODAY)).toBe('2026-08-25');
    expect(splitTestDates(['2026-08-22', '2026-10-03', '2026-12-05'], TODAY)).toEqual({ upcoming: ['2026-10-03', '2026-12-05'], past: ['2026-08-22'] });
    expect(derivePrimaryTestDate(['2026-08-22', '2026-10-03', '2026-12-05'], TODAY)).toBe('2026-10-03');
    expect(derivePrimaryTestDate(['2026-03-14', '2026-08-22'], TODAY)).toBe('2026-08-22');
    expect(derivePrimaryTestDate(['2026-08-25'], TODAY)).toBe('2026-08-25');
    expect(derivePrimaryTestDate([], TODAY)).toBeNull();
  });
  it('a single-date editor swaps the primary and keeps the rest', () => {
    expect(withPrimaryReplaced(['2026-08-22', '2026-10-03'], '2026-08-22', '2026-09-12')).toEqual(['2026-09-12', '2026-10-03']);
    expect(withPrimaryReplaced(['2026-08-22'], '2026-08-22', null)).toEqual([]);
    expect(withPrimaryReplaced([], null, '2026-10-03')).toEqual(['2026-10-03']);
  });
  it('reads a pre-list profile', () => {
    expect(getUserTestDates({ testDate: '2026-08-22' })).toEqual(['2026-08-22']);
    expect(getUserTestDates({ testDate: '2026-08-22', testDates: ['2026-10-03', '2026-08-22'] })).toEqual(['2026-08-22', '2026-10-03']);
    expect(getUserTestDates(null)).toEqual([]);
  });
});
