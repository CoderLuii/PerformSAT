/**
 * billingService — client calls into the Stripe Cloud Functions.
 *
 * No Stripe SDK on the client: hosted Checkout and the Customer Portal are
 * plain redirects to Stripe-owned URLs the functions mint. All calls go
 * through authFetch (Firebase ID token bearer auth).
 */
import { authFetch } from './authFetch';
import { getReferral } from './refTracker';
import { makeLogger } from '../utils/log';

const log = makeLogger('billing');

// v2 Cloud Run URLs follow the aiTutor precedent: lowercase function name +
// project hash. Env overrides support emulators/staging.
const ENSURE_ENTITLEMENT_URL = process.env.REACT_APP_ENSURE_ENTITLEMENT_URL ||
  'https://ensureentitlement-ki77ua6x2a-uc.a.run.app';
const CREATE_CHECKOUT_URL = process.env.REACT_APP_CREATE_CHECKOUT_URL ||
  'https://createcheckoutsession-ki77ua6x2a-uc.a.run.app';
const CREATE_PORTAL_URL = process.env.REACT_APP_CREATE_PORTAL_URL ||
  'https://createportalsession-ki77ua6x2a-uc.a.run.app';
const REDEEM_PROMO_URL = process.env.REACT_APP_REDEEM_PROMO_URL ||
  'https://redeempromocode-ki77ua6x2a-uc.a.run.app';

/**
 * Idempotently create the server-side entitlement doc in a NO-ACCESS "none"
 * state (card-up-front model — access only comes from a Stripe subscription
 * the webhook writes). Safe to call on every boot; the function never touches
 * an existing doc.
 *
 * @returns {Promise<object>} serialized entitlement ({status, trialEndsAt, ...})
 */
export async function ensureEntitlement() {
  const res = await authFetch(ENSURE_ENTITLEMENT_URL, { method: 'POST', body: '{}' });
  if (!res.ok) {
    throw new Error(`ensureEntitlement failed (${res.status})`);
  }
  const data = await res.json();
  return data.entitlement;
}

/**
 * Start hosted Stripe Checkout for a plan and redirect the browser to it.
 *
 * @param {'monthly'|'annual'} plan
 * @returns {Promise<string>} the checkout URL (already navigated to)
 */
export async function startCheckout(plan) {
  const res = await authFetch(CREATE_CHECKOUT_URL, {
    method: 'POST',
    // ref: creator-link attribution (first-touch, see refTracker). The server
    // validates it against creatorRefs and silently drops anything invalid.
    body: JSON.stringify({
      plan: plan === 'annual' ? 'annual' : 'monthly',
      ref: getReferral(),
    }),
  });
  if (res.status === 409) {
    // The account already has a live subscription. Opening a second Checkout
    // would create a duplicate subscription, so the server refuses. For a
    // past_due subscription (card failing in Stripe's dunning window) the fix
    // is the Customer Portal — send them there to update the card on the
    // EXISTING subscription rather than starting a new one.
    const data = await res.json().catch(() => ({}));
    if (data.error === 'past_due') {
      return openBillingPortal();
    }
    // adopted: the server found a subscription still live on this student's
    // original Stripe customer (they deleted their account while it was
    // running, then signed up again) and re-attached it to this account
    // instead of selling a duplicate. The entitlement doc has already been
    // written, so useEntitlement's onSnapshot unlocks them on its own — this
    // is a success, not an error. Nothing to navigate to.
    if (data.adopted) {
      log.info('existing subscription re-attached to this account');
      return null;
    }
    log.error('checkout session refused (409)', data.error || '');
    throw new Error('You already have an active subscription.');
  }
  if (!res.ok) {
    log.error('checkout session failed', res.status);
    throw new Error('Could not start checkout. Please try again.');
  }
  const { url } = await res.json();
  if (!url) throw new Error('Could not start checkout. Please try again.');
  window.location.assign(url);
  return url;
}

/**
 * Open the Stripe Customer Portal (manage plan, payment method, cancel).
 *
 * @returns {Promise<string>} the portal URL (already navigated to)
 */
export async function openBillingPortal() {
  const res = await authFetch(CREATE_PORTAL_URL, { method: 'POST', body: '{}' });
  if (res.status === 400) {
    throw new Error('No billing account yet — subscribe first.');
  }
  if (!res.ok) {
    log.error('portal session failed', res.status);
    throw new Error('Could not open billing. Please try again.');
  }
  const { url } = await res.json();
  if (!url) throw new Error('Could not open billing. Please try again.');
  window.location.assign(url);
  return url;
}

/**
 * Redeem a promo code for permanent free ("comped") access. The server
 * validates the code and grants the entitlement; on success the useEntitlement
 * onSnapshot listener flips to comped and the paywall dismisses on its own.
 *
 * @param {string} code the code the user typed
 * @returns {Promise<{entitlement: object, outcome: string}>}
 * @throws {Error} with a user-facing message on an invalid/exhausted code
 */
export async function redeemPromoCode(code) {
  const res = await authFetch(REDEEM_PROMO_URL, {
    method: 'POST',
    body: JSON.stringify({ code: String(code || '').trim() }),
  });
  if (res.status === 422 || res.status === 400) {
    // Expected "invalid / exhausted / empty" — surface the server's message.
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "That promo code isn't valid.");
  }
  if (!res.ok) {
    log.error('redeem promo failed', res.status);
    throw new Error('Could not redeem the code. Please try again.');
  }
  return res.json();
}
