import {
  PRICE_MONTHLY,
  PRICE_ANNUAL_MONTHLY,
  PRICE_ANNUAL_TOTAL,
  ANNUAL_SAVINGS,
  TRIAL_DAYS,
  trialEndDateLabel,
} from '../pricing';

describe('pricing constants (display source of truth)', () => {
  // These pins are deliberate friction: a repricing must edit this test in
  // the same commit, which is the whole drift guard. Charged amounts live on
  // Stripe Price ids (functions/.env); trial length in stripePolicy.ts.
  test('pins the displayed prices', () => {
    expect(PRICE_MONTHLY).toBe(85);
    expect(PRICE_ANNUAL_MONTHLY).toBe(29);
    expect(PRICE_ANNUAL_TOTAL).toBe(349);
    expect(ANNUAL_SAVINGS).toBe(671);
    expect(TRIAL_DAYS).toBe(3);
  });
});

describe('trialEndDateLabel', () => {
  test('adds TRIAL_DAYS using local date parts', () => {
    expect(trialEndDateLabel(new Date(2026, 7, 14, 10, 0))).toBe('Aug 17');
  });

  test('crosses month and year boundaries correctly', () => {
    expect(trialEndDateLabel(new Date(2026, 11, 30, 21, 30))).toBe('Jan 2');
    expect(trialEndDateLabel(new Date(2026, 7, 30, 23, 59))).toBe('Sep 2');
  });

  test('late-evening local time never rolls to the previous day (UTC-slice regression)', () => {
    // 11:59pm local on Aug 14 + 3 days must print Aug 17 regardless of TZ.
    expect(trialEndDateLabel(new Date(2026, 7, 14, 23, 59))).toBe('Aug 17');
  });
});
