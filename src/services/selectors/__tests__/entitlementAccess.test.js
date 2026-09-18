/**
 * entitlementAccess selector — the client-side access rule. Must stay in
 * sync with functions/src/stripePolicy.ts (hasAccessMs); the phase strings
 * here additionally drive the paywall/banner UI.
 */
import {
  deriveEntitlementAccess,
  hasSubscriptionEvidence,
  toMillisFlexible,
} from '../entitlementAccess';

const DAY = 86400000;
const NOW = Date.parse('2026-07-15T12:00:00Z');

describe('toMillisFlexible', () => {
  it('coerces every stored timestamp shape', () => {
    expect(toMillisFlexible(NOW)).toBe(NOW);
    expect(toMillisFlexible({ toMillis: () => NOW })).toBe(NOW);
    expect(toMillisFlexible({ seconds: NOW / 1000 })).toBe(NOW);
    expect(toMillisFlexible('2026-07-15T12:00:00Z')).toBe(NOW);
    expect(toMillisFlexible(new Date(NOW))).toBe(NOW);
  });

  it('returns null for unusable values, never epoch 0', () => {
    expect(toMillisFlexible(null)).toBeNull();
    expect(toMillisFlexible(undefined)).toBeNull();
    expect(toMillisFlexible('not a date')).toBeNull();
    expect(toMillisFlexible(NaN)).toBeNull();
    expect(toMillisFlexible({})).toBeNull();
  });
});

describe('deriveEntitlementAccess', () => {
  it('no doc: locked, phase none', () => {
    const v = deriveEntitlementAccess(null, NOW);
    expect(v.hasAccess).toBe(false);
    expect(v.phase).toBe('none');
  });

  it('trial running: access with correct days-left ceiling', () => {
    const v = deriveEntitlementAccess(
      { status: 'trialing', trialEndsAt: NOW + 2.5 * DAY },
      NOW,
    );
    expect(v.hasAccess).toBe(true);
    expect(v.phase).toBe('trial');
    expect(v.trialDaysLeft).toBe(3); // ceil(2.5)
  });

  it('trial on its last minute still counts as 1 day left', () => {
    const v = deriveEntitlementAccess(
      { status: 'trialing', trialEndsAt: NOW + 60000 },
      NOW,
    );
    expect(v.hasAccess).toBe(true);
    expect(v.trialDaysLeft).toBe(1);
  });

  it('trialing keeps access even if the local clock has passed (Stripe owns it)', () => {
    // Card-up-front: Stripe flips trialing->active/canceled at trial_end via
    // webhook. If the doc still reads trialing (webhook lag) we grant access
    // rather than lock a customer Stripe is about to charge. Days-left floors.
    const v = deriveEntitlementAccess(
      { status: 'trialing', trialEndsAt: NOW - 1 },
      NOW,
    );
    expect(v.hasAccess).toBe(true);
    expect(v.phase).toBe('trial');
    expect(v.trialDaysLeft).toBe(0);
  });

  it('trialing with no clock still has access (card on file, display-only clock)', () => {
    const v = deriveEntitlementAccess({ status: 'trialing' }, NOW);
    expect(v.hasAccess).toBe(true);
    expect(v.phase).toBe('trial');
    expect(v.trialDaysLeft).toBe(0);
  });

  it("no-access seed state ('none') is locked", () => {
    const v = deriveEntitlementAccess({ status: 'none' }, NOW);
    expect(v.hasAccess).toBe(false);
    expect(v.phase).toBe('none');
  });

  it('comped (grandfathered free early-access user) has permanent access, no billing UI', () => {
    const v = deriveEntitlementAccess({ status: 'comped' }, NOW);
    expect(v.hasAccess).toBe(true);
    expect(v.phase).toBe('comped');
    expect(v.plan).toBeNull();
    expect(v.cancelAtPeriodEnd).toBe(false);
    expect(v.trialDaysLeft).toBe(0);
  });

  it('active subscriber: premium phase with renewal date', () => {
    const v = deriveEntitlementAccess(
      {
        status: 'active',
        plan: 'monthly',
        currentPeriodEnd: NOW + 20 * DAY,
        cancelAtPeriodEnd: false,
      },
      NOW,
    );
    expect(v.hasAccess).toBe(true);
    expect(v.phase).toBe('premium');
    expect(v.plan).toBe('monthly');
    expect(v.endsAtMs).toBe(NOW + 20 * DAY);
  });

  it('active but canceling at period end: phase ending, still has access', () => {
    const v = deriveEntitlementAccess(
      { status: 'active', cancelAtPeriodEnd: true, currentPeriodEnd: NOW + 5 * DAY },
      NOW,
    );
    expect(v.hasAccess).toBe(true);
    expect(v.phase).toBe('ending');
  });

  it('past_due keeps access within the 14-day dunning grace, then locks', () => {
    // Inside grace: card is being retried on a period that ended yesterday.
    const inGrace = deriveEntitlementAccess(
      { status: 'past_due', currentPeriodEnd: NOW - 1 * DAY },
      NOW,
    );
    expect(inGrace.hasAccess).toBe(true);
    expect(inGrace.phase).toBe('grace');
    // Past the ceiling: a permanently failing card no longer shows premium.
    const expired = deriveEntitlementAccess(
      { status: 'past_due', currentPeriodEnd: NOW - 15 * DAY },
      NOW,
    );
    expect(expired.hasAccess).toBe(false);
    expect(expired.phase).toBe('expired');
    // No recorded period end -> deny (matches the server gate).
    expect(deriveEntitlementAccess({ status: 'past_due' }, NOW).hasAccess).toBe(false);
  });

  it('canceled with future period end: access until it passes', () => {
    const paid = deriveEntitlementAccess(
      { status: 'canceled', currentPeriodEnd: NOW + 3 * DAY },
      NOW,
    );
    expect(paid.hasAccess).toBe(true);
    expect(paid.phase).toBe('ending');

    const done = deriveEntitlementAccess(
      { status: 'canceled', currentPeriodEnd: NOW - 1 },
      NOW,
    );
    expect(done.hasAccess).toBe(false);
    expect(done.phase).toBe('expired');
  });

  it('unknown status is locked', () => {
    expect(deriveEntitlementAccess({ status: 'mystery' }, NOW).hasAccess).toBe(false);
  });

  it('handles Firestore Timestamp-shaped fields', () => {
    const v = deriveEntitlementAccess(
      { status: 'trialing', trialEndsAt: { toMillis: () => NOW + DAY } },
      NOW,
    );
    expect(v.hasAccess).toBe(true);
    expect(v.trialDaysLeft).toBe(1);
  });
});

describe('hasSubscriptionEvidence', () => {
  // Regression: abandoned first checkout escaped the card-up-front hard gate.
  // createCheckoutSession persists stripeCustomerId BEFORE Checkout opens, so
  // a pre-created customer alone must never count as billing history — the
  // account would skip the start-trial wall and see "Your access has ended".
  // Found by /qa on 2026-08-04.
  it('a pre-created Checkout customer alone is NOT billing history', () => {
    expect(hasSubscriptionEvidence({ status: 'none', stripeCustomerId: 'cus_x' })).toBe(false);
    // The createCheckoutSession/ensureEntitlement race can leave a doc with
    // ONLY {stripeCustomerId, updatedAt} — still not billing history.
    expect(hasSubscriptionEvidence({ stripeCustomerId: 'cus_x' })).toBe(false);
    expect(hasSubscriptionEvidence(null)).toBe(false);
    expect(hasSubscriptionEvidence({})).toBe(false);
    expect(hasSubscriptionEvidence({ status: 'comped' })).toBe(false);
  });

  it('a real subscription — live or lapsed — IS billing history', () => {
    expect(hasSubscriptionEvidence({ status: 'trialing' })).toBe(true);
    expect(hasSubscriptionEvidence({ status: 'active' })).toBe(true);
    expect(hasSubscriptionEvidence({ status: 'past_due' })).toBe(true);
    expect(hasSubscriptionEvidence({ status: 'canceled' })).toBe(true);
    expect(hasSubscriptionEvidence({ status: 'none', subscriptionId: 'sub_x' })).toBe(true);
    expect(hasSubscriptionEvidence({ status: 'none', trialUsed: true })).toBe(true);
  });
});
