import { getWeekPractice } from '../weekPractice';

// Tue 2026-08-25
const TUE = new Date(2026, 7, 25, 12);

describe('getWeekPractice', () => {
  it('lays out Monday to Sunday around today with the right states', () => {
    const r = getWeekPractice(new Set(['2026-08-24']), TUE);
    expect(r.days.map((d) => d.key)).toEqual(['2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28', '2026-08-29', '2026-08-30']);
    expect(r.days.map((d) => d.state)).toEqual(['done', 'today', 'upcoming', 'upcoming', 'upcoming', 'upcoming', 'upcoming']);
    expect(r.days.map((d) => d.letter).join('')).toBe('MTWTFSS');
    expect(r.done).toBe(1);
    expect(r.elapsed).toBe(2);
    expect(r.todayDone).toBe(false);
    expect(r.streak).toBe(1);
  });
  it('marks skipped past days as missed and counts today when practiced', () => {
    const thu = new Date(2026, 7, 27, 9);
    const r = getWeekPractice(['2026-08-24', '2026-08-26', '2026-08-27'], thu);
    expect(r.days.map((d) => d.state)).toEqual(['done', 'missed', 'done', 'today-done', 'upcoming', 'upcoming', 'upcoming']);
    expect(r.done).toBe(3);
    expect(r.elapsed).toBe(4);
    expect(r.todayDone).toBe(true);
    expect(r.streak).toBe(2);
  });
  it('treats Sunday as the last day of the week and ignores keys outside the week', () => {
    const sun = new Date(2026, 7, 30, 20);
    const r = getWeekPractice(new Set(['2026-08-23', '2026-08-31', '2026-08-30']), sun);
    expect(r.days[0].key).toBe('2026-08-24');
    expect(r.days[6].state).toBe('today-done');
    expect(r.done).toBe(1);
    expect(r.elapsed).toBe(7);
  });
  it('handles no data', () => {
    const r = getWeekPractice(null, TUE);
    expect(r.done).toBe(0);
    expect(r.streak).toBe(0);
    expect(r.days).toHaveLength(7);
  });
});
