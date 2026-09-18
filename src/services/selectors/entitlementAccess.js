/**
 * entitlementAccess — pure selector over the entitlements/{uid} doc.
 *
 * Mirrors the server-side rule in functions/src/stripePolicy.ts (hasAccessMs)
 * — keep the two in sync (CARD-UP-FRONT 7-day trial):
 *   comped    -> access (grandfathered free early-access user; unconditional,
 *                no billing, no trial clock — see isGrandfathered server-side)
 *   trialing  -> access (card on file; Stripe owns the trial clock and flips
 *                the status at trial_end, so we never re-gate on a local
 *                clock — trialEndsAt is display-only). cancel-at-period-end
 *                during the trial keeps access until day 7.
 *   active    -> access ('ending' phase when cancel-at-period-end is set)
 *   past_due  -> access only through currentPeriodEnd + 14d dunning grace
 *   canceled  -> access only until a still-future currentPeriodEnd
 *   none / anything else -> NO access (the ensureEntitlement no-access seed
 *                state and lapsed trials both land here)
 *
 * The doc is SERVER-WRITE-ONLY (see firestore.rules) — this selector never
 * mutates, it only derives what the UI needs.
 */

const DAY_MS = 86400000;
// Bounded dunning grace for a past_due subscription — MUST match
// PAST_DUE_GRACE_MS in functions/src/stripePolicy.ts (server gate). Keeps the
// client's shown access in sync with the server's 402 so a permanently failing
// card doesn't display premium after the server has locked it.
const PAST_DUE_GRACE_MS = 14 * DAY_MS;

/**
 * Coerce a Firestore Timestamp / {seconds} shape / number / ISO string into
 * unix ms. Returns null for anything unusable — callers treat null as
 * "no such moment", never as epoch 0.
 *
 * @param {*} v raw field value from the entitlement doc
 * @returns {number|null} unix ms or null
 */
export function toMillisFlexible(v) {
  if (v == null) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v.toMillis === 'function') return v.toMillis();
  if (typeof v.seconds === 'number') return v.seconds * 1000;
  if (typeof v === 'string') {
    const parsed = Date.parse(v);
    return Number.isNaN(parsed) ? null : parsed;
  }
  if (v instanceof Date) return v.getTime();
  return null;
}

/**
 * Whether this entitlement doc proves the account went through a real
 * Stripe subscription at some point (current or lapsed) — as opposed to
 * merely having a pre-created Checkout customer. createCheckoutSession
 * persists stripeCustomerId BEFORE the student ever sees the card form,
 * so `stripeCustomerId` alone must never count as billing history: an
 * abandoned first checkout would escape the card-up-front hard gate and
 * get lapsed/"re-subscribe" framing on the paywall.
 *
 * Evidence accepted: webhook-written subscriptionId, the durable trialUsed
 * marker, or a subscription-lifecycle status.
 *
 * @param {object|null} doc entitlements/{uid} data (or null)
 * @returns {boolean}
 */
export function hasSubscriptionEvidence(doc) {
  if (!doc || typeof doc !== 'object') return false;
  return !!(
    doc.subscriptionId ||
    doc.trialUsed ||
    ['trialing', 'active', 'past_due', 'canceled'].includes(doc.status)
  );
}

/**
 * Derive the access view the UI renders from an entitlement doc.
 *
 * Phases: 'trial' (clock running), 'premium' (paying), 'grace' (past_due),
 * 'ending' (canceled/cancel-at-period-end but still inside the paid period),
 * 'expired' (locked), 'none' (no doc yet — treat as locked, the hook layers
 * loading on top).
 *
 * @param {object|null} doc entitlements/{uid} data (or null)
 * @param {number} [nowMs] current time, injectable for tests
 * @returns {{hasAccess: boolean, phase: string, trialDaysLeft: number,
 *   endsAtMs: number|null, plan: string|null, cancelAtPeriodEnd: boolean}}
 */
export function deriveEntitlementAccess(doc, nowMs = Date.now()) {
  const base = {
    hasAccess: false,
    phase: 'none',
    trialDaysLeft: 0,
    endsAtMs: null,
    plan: null,
    cancelAtPeriodEnd: false,
  };
  if (!doc || typeof doc !== 'object') return base;

  const plan = doc.plan || null;
  const cancelAtPeriodEnd = !!doc.cancelAtPeriodEnd;
  const trialEndsAtMs = toMillisFlexible(doc.trialEndsAt);
  const periodEndMs = toMillisFlexible(doc.currentPeriodEnd);

  switch (doc.status) {
    case 'comped':
      // Grandfathered free early-access user: permanent access, no billing UI.
      return {
        ...base,
        hasAccess: true,
        phase: 'comped',
        plan: null,
        cancelAtPeriodEnd: false,
      };
    case 'trialing': {
      // Card-up-front: a trialing subscription always has access. Stripe flips
      // the status to active/canceled at trial_end, so we don't lock on a
      // local clock — trialEndsAt is only for the "N days left / won't be
      // charged until <date>" copy (floored at 0 if the webhook lags).
      return {
        ...base,
        hasAccess: true,
        phase: 'trial',
        trialDaysLeft: trialEndsAtMs != null ? Math.max(0, Math.ceil((trialEndsAtMs - nowMs) / DAY_MS)) : 0,
        endsAtMs: trialEndsAtMs,
        plan,
        cancelAtPeriodEnd,
      };
    }
    case 'active':
      return {
        ...base,
        hasAccess: true,
        phase: cancelAtPeriodEnd ? 'ending' : 'premium',
        endsAtMs: periodEndMs,
        plan,
        cancelAtPeriodEnd,
      };
    case 'past_due': {
      // Bounded dunning grace (matches the server gate): access only through
      // periodEnd + PAST_DUE_GRACE_MS. A missing period end denies, so a
      // permanently failing card can't display premium forever.
      const inGrace = periodEndMs != null && periodEndMs + PAST_DUE_GRACE_MS > nowMs;
      return {
        ...base,
        hasAccess: inGrace,
        phase: inGrace ? 'grace' : 'expired',
        endsAtMs: periodEndMs,
        plan,
        cancelAtPeriodEnd,
      };
    }
    case 'canceled': {
      const stillPaid = periodEndMs != null && periodEndMs > nowMs;
      return {
        ...base,
        hasAccess: stillPaid,
        phase: stillPaid ? 'ending' : 'expired',
        endsAtMs: periodEndMs,
        plan,
        cancelAtPeriodEnd,
      };
    }
    default:
      return base;
  }
}
