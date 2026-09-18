/**
 * useEntitlement — live view of the student's SEVA Premium entitlement.
 *
 * Subscribes to entitlements/{uid} (server-write-only doc) and derives the
 * access view via deriveEntitlementAccess. When the doc doesn't exist yet it
 * calls ensureEntitlement once, which (card-up-front model) seeds the doc in a
 * NO-ACCESS "none" state — access only ever comes from a real Stripe
 * subscription (trialing/active) written by the webhook. The client can never
 * write the doc (firestore.rules denies it), so a devtools user can't grant
 * themselves access.
 *
 * FLAG OFF (`billing` / REACT_APP_FF_BILLING): returns a static, permissive
 * value and makes ZERO reads or function calls — the entire billing system
 * stays dark until launch.
 *
 * While loading (flag on, first snapshot pending): hasAccess is false and
 * loading is true — gate call sites show a brief pending state rather than
 * failing open (a fast student could otherwise start a test during boot) or
 * flashing the paywall.
 *
 * @param {object|null} user - the auth user ({uid}) from useAuth
 * @returns {{loading: boolean, flagEnabled: boolean, hasAccess: boolean,
 *   phase: string, trialDaysLeft: number, endsAtMs: number|null,
 *   plan: string|null, cancelAtPeriodEnd: boolean, hasBillingAccount: boolean}}
 */
import { useState, useEffect, useRef, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useFeatureFlag } from './useFeatureFlag';
import { deriveEntitlementAccess, hasSubscriptionEvidence } from '../services/selectors/entitlementAccess';
import { ensureEntitlement, redeemPromoCode } from '../services/billingService';
import { readPendingPromoCode, clearPendingPromoCode, markPendingPromoFailed } from '../services/pendingPromo';
import { makeLogger } from '../utils/log';

const log = makeLogger('billing');

const FLAG_OFF_VALUE = {
  loading: false,
  flagEnabled: false,
  hasAccess: true,
  phase: 'flag-off',
  trialDaysLeft: 0,
  endsAtMs: null,
  plan: null,
  cancelAtPeriodEnd: false,
  hasBillingAccount: false,
  hasEntitlementDoc: false,
};

export function useEntitlement(user) {
  const flagEnabled = useFeatureFlag('billing');
  const uid = user?.uid || null;

  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Re-derive on a slow tick so an expiry mid-session flips the UI without
  // a reload (the trial clock crosses zero exactly once a week per student —
  // a 60s tick is plenty).
  const [nowMs, setNowMs] = useState(() => Date.now());
  const ensureRequestedRef = useRef(null); // uid we already called ensure for
  const healRequestedRef = useRef(null); // uid we already asked to self-heal

  useEffect(() => {
    if (!flagEnabled || !uid) {
      setDocData(null);
      setLoading(!!uid && flagEnabled);
      return undefined;
    }
    setLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, 'entitlements', uid),
      (snap) => {
        const data = snap.exists() ? snap.data() : null;
        setDocData(data);
        setLoading(false);
        // Self-heal a grandfathered account stranded on a stale pre-grandfather
        // doc (an old no-card "trialing" doc, or a "none" seed). The server's
        // ensureEntitlement only seeds a MISSING doc, so a pre-launch user who
        // already had one keeps seeing a trial/paywall. Re-call ensureEntitlement
        // ONCE per session for a heal-candidate doc — non-comped, no
        // grandfathered flag, no Stripe customer/subscription. The server
        // re-checks the authoritative account age (isGrandfathered) and only
        // upgrades a genuine pre-launch account; for anyone else it's a no-op.
        if (
          data &&
          healRequestedRef.current !== uid &&
          data.status !== 'comped' &&
          !data.grandfathered &&
          !data.stripeCustomerId &&
          !data.subscriptionId &&
          (data.status === 'trialing' || data.status === 'none')
        ) {
          healRequestedRef.current = uid;
          ensureEntitlement().catch((err) => {
            healRequestedRef.current = null;
            log.error('entitlement self-heal request failed', err);
          });
        }
        if (!snap.exists() && ensureRequestedRef.current !== uid) {
          // First session for this account (or pre-launch account's first
          // post-launch session). Seed the entitlement doc exactly once.
          ensureRequestedRef.current = uid;
          const seedNoAccess = () => ensureEntitlement().catch((err) => {
            // Allow a retry on the next mount/sign-in rather than wedging
            // this account in the doc-less state forever.
            ensureRequestedRef.current = null;
            log.error('ensureEntitlement failed', err);
          });
          const pendingPromo = readPendingPromoCode();
          if (pendingPromo) {
            // A code entered during onboarding: redeem it FIRST. On success the
            // server writes the doc directly as "comped" (permanent free, no
            // card, no Stripe subscription), so the student bypasses the paywall
            // entirely — no "none" flash. On any failure (invalid/exhausted/
            // transient) fall back to the no-access seed, and hand the code to
            // the paywall (markPendingPromoFailed) so the wall can EXPLAIN and
            // prefill it for retry — a silent drop left students who were told
            // "full access free, no card required" staring at a paywall.
            redeemPromoCode(pendingPromo)
              .then(() => clearPendingPromoCode())
              .catch((err) => {
                clearPendingPromoCode();
                markPendingPromoFailed(pendingPromo);
                log.error('onboarding promo redeem failed', err);
                seedNoAccess();
              });
          } else {
            seedNoAccess();
          }
        }
      },
      (err) => {
        log.error('entitlement subscription failed', err);
        // Fail closed but not stuck: loading=false with no doc reads as
        // locked; a reload re-subscribes.
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [flagEnabled, uid]);

  useEffect(() => {
    if (!flagEnabled || !uid) return undefined;
    const id = setInterval(() => setNowMs(Date.now()), 60000);
    return () => clearInterval(id);
  }, [flagEnabled, uid]);

  return useMemo(() => {
    if (!flagEnabled) return FLAG_OFF_VALUE;
    const derived = deriveEntitlementAccess(docData, nowMs);
    return {
      loading,
      flagEnabled: true,
      ...derived,
      // "Has billing" must mean a real (current or past) subscription, NOT
      // just a pre-created Checkout customer — see hasSubscriptionEvidence.
      hasBillingAccount: hasSubscriptionEvidence(docData),
      // Whether the server-write-only entitlement doc has actually been read
      // yet. The hard-gate must NOT wall on a not-yet-seeded (null) doc — a
      // grandfathered "comped" user would otherwise flash the paywall in the
      // window before ensureEntitlement's doc lands via onSnapshot.
      hasEntitlementDoc: docData != null,
    };
  }, [flagEnabled, docData, loading, nowMs]);
}

export default useEntitlement;
