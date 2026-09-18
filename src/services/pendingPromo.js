/**
 * pendingPromo — a tiny, dependency-free localStorage shuttle for a promo code
 * entered during PRE-SIGNUP onboarding.
 *
 * A code typed in the funnel can't be redeemed yet: there's no authenticated
 * user until the account exists. We stash it here; useEntitlement redeems it the
 * moment the new account's entitlement doc is first seeded, so a valid code
 * seeds straight to "comped" (permanent free, no card, no Stripe) and the
 * student bypasses the paywall entirely.
 *
 * Deliberately imports NOTHING (no Firebase) so the onboarding funnel can use it
 * without pulling the auth/firestore init into its bundle or its test env.
 */
const PENDING_PROMO_KEY = 'seva:pendingPromoCode';

/** Stash a code for redemption right after the pending signup completes. */
export function stashPendingPromoCode(code) {
  try {
    const c = String(code || '').trim();
    if (c) window.localStorage.setItem(PENDING_PROMO_KEY, c);
  } catch {
    /* private mode — the code just won't carry across; harmless */
  }
}

/** The code stashed during onboarding, or null. */
export function readPendingPromoCode() {
  try {
    const c = window.localStorage.getItem(PENDING_PROMO_KEY);
    return c && c.trim() ? c.trim() : null;
  } catch {
    return null;
  }
}

/** Clear the stashed code (after a redeem attempt, success or fail). */
export function clearPendingPromoCode() {
  try {
    window.localStorage.removeItem(PENDING_PROMO_KEY);
  } catch {
    /* ignore */
  }
}

// A code that FAILED background redemption right after signup. Without this,
// the failure was log-only: the student typed a code in the funnel, was told
// "full access free, no card required", then landed on the paywall with no
// explanation and the code silently gone. The paywall reads this once and
// prefills its promo form so the student can see what happened and retry.
const FAILED_PROMO_KEY = 'seva:failedPromoCode';

/** Record a code whose background redeem failed, for the paywall to surface. */
export function markPendingPromoFailed(code) {
  try {
    const c = String(code || '').trim();
    if (c) window.sessionStorage.setItem(FAILED_PROMO_KEY, c);
  } catch {
    /* ignore */
  }
}

/** One-shot read of the failed code (clears on read), or null. */
export function takeFailedPromoCode() {
  try {
    const c = window.sessionStorage.getItem(FAILED_PROMO_KEY);
    window.sessionStorage.removeItem(FAILED_PROMO_KEY);
    return c && c.trim() ? c.trim() : null;
  } catch {
    return null;
  }
}
