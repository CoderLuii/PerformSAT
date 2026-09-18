/**
 * pricing.js — the single client-side source of truth for DISPLAYED billing
 * numbers. Deliberately imports NOTHING (no Firebase) so the pre-auth
 * onboarding funnel chunk can use it (same contract as pendingPromo.js).
 *
 * CHARGED amounts live on the Stripe Price objects referenced in
 * functions/.env, and the authoritative trial length is TRIAL_DAYS in
 * functions/src/stripePolicy.ts (drives Stripe's trial_period_days).
 * If either changes there, change it HERE in the same commit — the
 * pinning test in __tests__/pricing.test.js exists to make that loud.
 *
 * Display sites: LandingPage.jsx, onboarding/OnboardingFunnel.jsx,
 * billing/PaywallScreen.jsx.
 */

export const PRICE_MONTHLY = 85; // $/month on the monthly plan
export const PRICE_ANNUAL_MONTHLY = 29; // effective $/month on annual
export const PRICE_ANNUAL_TOTAL = 349; // one annual payment
export const ANNUAL_SAVINGS = PRICE_MONTHLY * 12 - PRICE_ANNUAL_TOTAL; // vs monthly
export const TRIAL_DAYS = 3; // mirrors functions/src/stripePolicy.ts TRIAL_DAYS

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * "Aug 17"-style label for the earliest possible charge date if the trial
 * starts NOW. Uses local date parts (never toISOString().slice — UTC slicing
 * prints the wrong day for evening signups in US timezones). Because the
 * trial actually starts at Stripe Checkout completion (always at or after
 * render time), the rendered date is always <= the true charge instant, so
 * "your card is not charged before {date}" stays literally true even for a
 * stale tab.
 *
 * @param {Date} [from] - injectable clock for tests
 * @returns {string} e.g. "Aug 17"
 */
export function trialEndDateLabel(from = new Date()) {
  const d = new Date(from.getTime());
  d.setDate(d.getDate() + TRIAL_DAYS);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
