/**
 * SEVA Premium billing endpoints (Stripe) — CARD-UP-FRONT 3-day trial.
 *
 * Four endpoints + one gate helper:
 *   ensureEntitlement     — idempotently creates the entitlement doc in a
 *                           NO-ACCESS state ("none") until Checkout completes
 *   createCheckoutSession — hosted Stripe Checkout (subscription mode) that
 *                           collects a card up front and starts a 3-day trial
 *   createPortalSession   — Stripe Customer Portal (manage/cancel/card)
 *   stripeWebhook         — signature-verified event sink -> entitlements/{uid}
 *   hasEntitlementAccess  — server-side gate used by aiTutor (402)
 *
 * The entitlement doc (entitlements/{uid}) is SERVER-WRITE-ONLY — firestore
 * rules deny all client writes; the Admin SDK bypasses rules. The client only
 * ever reads it (useEntitlement onSnapshot). Access comes ONLY from a real
 * Stripe subscription (trialing/active) — there is no no-card grant.
 *
 * Deploy-time params (functions/.env or `firebase functions:secrets:set`):
 *   secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
 *   strings: STRIPE_PRICE_MONTHLY, STRIPE_PRICE_ANNUAL, BILLING_APP_BASE_URL,
 *            BILLING_LAUNCH_EPOCH (grandfather cutoff — accounts created before
 *            it get permanent comped access; accounts created at/after it must
 *            start a paid trial. Set this to the moment you flip the flag.)
 */

import Stripe from "stripe";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {defineSecret, defineString} from "firebase-functions/params";
import {getAuth} from "firebase-admin/auth";
import {
  getFirestore,
  FieldValue,
  Timestamp,
  DocumentSnapshot,
} from "firebase-admin/firestore";
import {ALLOWED_ORIGINS, verifyAuth, checkRateLimit} from "./shared";
import {
  subscriptionToEntitlementPatch,
  shouldApplyEvent,
  hasAccessMs,
  accessOnMissingDoc,
  isGrandfathered,
  shouldGrandfatherExisting,
  normalizePromoCode,
  sanitizeRefSlug,
  evaluatePromoRedemption,
  subscriptionPatchUsedTrial,
  trialDaysForCheckout,
  subscriptionsShowTrialUsed,
  CANCELABLE_STATUSES,
  EntitlementPatch,
} from "./stripePolicy";

export const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");
const stripePriceMonthly = defineString("STRIPE_PRICE_MONTHLY", {default: ""});
const stripePriceAnnual = defineString("STRIPE_PRICE_ANNUAL", {default: ""});
const appBaseUrl = defineString("BILLING_APP_BASE_URL", {
  default: "https://www.sevaprep.com",
});
// Grandfather cutoff: accounts created before this instant are the free
// early-access cohort and get permanent comped access; accounts created at/
// after it must start a paid trial. Set to the moment billing goes live.
const billingLaunchEpoch = defineString("BILLING_LAUNCH_EPOCH", {default: ""});
// Server-side billing ENFORCEMENT switch (separate from the client
// REACT_APP_FF_BILLING flag). "false" (default) = the server gate never walls
// a missing-doc account — the pre-launch/dark state where nobody is charged or
// blocked. Flip to "true" TOGETHER with the client billing flag at launch so
// the paid endpoints actually fail closed for un-seeded post-epoch accounts
// (otherwise the paywall is opt-in: any client that skips ensureEntitlement
// gets the paid tutor for free). Kept as a distinct param — the launch epoch
// governs grandfathering, NOT whether enforcement is live.
const billingEnforced = defineString("BILLING_ENFORCED", {default: "false"});
// PostHog project API key (public ingestion key). Empty = server analytics off.
const posthogKey = defineString("POSTHOG_KEY", {default: ""});

const getStripe = () => new Stripe(stripeSecretKey.value());

const entitlementRef = (uid: string) =>
  getFirestore().collection("entitlements").doc(uid);

const promoCodeRef = (code: string) =>
  getFirestore().collection("promoCodes").doc(code);

const tsToMs = (v: unknown): number | null => {
  if (v instanceof Timestamp) return v.toMillis();
  if (typeof v === "number") return v;
  return null;
};

/**
 * Server-side access gate for the paid endpoints (aiTutor / tutorMathCheck).
 *
 * Missing-doc policy is gated by BILLING_ENFORCED (see accessOnMissingDoc):
 *   - enforcement OFF (dark/pre-launch): missing doc => ALLOW, and a Firestore
 *     error => ALLOW (availability over enforcement; nobody is being charged).
 *   - enforcement ON (post-launch): a missing doc falls back to the grandfather
 *     rule (pre-epoch allow, post-epoch deny) instead of blanket-allowing, so
 *     the paywall can't be bypassed by simply never calling ensureEntitlement;
 *     and a Firestore error fails CLOSED (a transient blip must not hand out
 *     paid Anthropic calls). A present doc is always evaluated by hasAccessMs.
 * @param {string} uid the authenticated caller's uid
 * @return {Promise<boolean>} whether the account has premium/trial access
 */
export async function hasEntitlementAccess(uid: string): Promise<boolean> {
  const enforced = billingEnforced.value() === "true";
  try {
    const snap = await entitlementRef(uid).get();
    if (!snap.exists) {
      // No doc: decide by enforcement + grandfather (unspoofable Auth time).
      if (!enforced) return true;
      let createdMs: number | null = null;
      try {
        const authUser = await getAuth().getUser(uid);
        const parsed = Date.parse(authUser.metadata.creationTime);
        createdMs = Number.isNaN(parsed) ? null : parsed;
      } catch (ghErr) {
        // Can't establish creation time while enforcing -> deny (fail closed).
        logger.warn(`hasEntitlementAccess: creation-time lookup failed for ${uid} — denying`, ghErr);
        return false;
      }
      const epochMs = Date.parse(billingLaunchEpoch.value());
      return accessOnMissingDoc(
        createdMs,
        Number.isNaN(epochMs) ? null : epochMs,
        enforced,
      );
    }
    const doc = snap.data() || {};
    return hasAccessMs(
      {
        status: doc.status,
        trialEndsAtMs: tsToMs(doc.trialEndsAt),
        currentPeriodEndMs: tsToMs(doc.currentPeriodEnd),
      },
      Date.now(),
    );
  } catch (err) {
    // Fail open only while billing is dark; fail closed once enforcing so a
    // Firestore error can't be used to farm free paid calls.
    logger.error(`hasEntitlementAccess failed — ${enforced ? "denying" : "allowing"}`, err);
    return !enforced;
  }
}

/**
 * Serialize an entitlement snapshot for a JSON response (Timestamps -> ms).
 * @param {DocumentSnapshot} snap the entitlement doc snapshot
 * @return {object} JSON-safe entitlement view
 */
function serializeEntitlement(snap: DocumentSnapshot) {
  const d = snap.data() || {};
  return {
    status: d.status || null,
    trialEndsAt: tsToMs(d.trialEndsAt),
    currentPeriodEnd: tsToMs(d.currentPeriodEnd),
    plan: d.plan || null,
    cancelAtPeriodEnd: !!d.cancelAtPeriodEnd,
    hasBillingAccount: !!d.stripeCustomerId,
  };
}

export const ensureEntitlement = onRequest(
  {cors: ALLOWED_ORIGINS, invoker: "public"},
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }
    if (!(await checkRateLimit(user.uid, "ensureEntitlement", 30))) {
      response.status(429).json({error: "Too many requests."});
      return;
    }

    try {
      // Grandfather the free early-access cohort: an account created BEFORE
      // billing launched keeps permanent free access ("comped"), never a
      // paywall and never a charge. Only accounts created AT/AFTER the launch
      // epoch enter the card-up-front trial. Reads the authoritative account
      // creation time from Firebase Auth (unspoofable). Any failure falls
      // through to the no-access seed (billing only ever charges a card via an
      // explicit Checkout the user initiates, so failing this way never bills
      // anyone silently — it only means an existing user could see the wall,
      // which the grandfather rule exists to prevent; hence we log loudly).
      let comped = false;
      try {
        const epochMs = Date.parse(billingLaunchEpoch.value());
        const authUser = await getAuth().getUser(user.uid);
        const createdMs = Date.parse(authUser.metadata.creationTime);
        comped = isGrandfathered(
          Number.isNaN(createdMs) ? null : createdMs,
          Number.isNaN(epochMs) ? null : epochMs,
        );
      } catch (ghErr) {
        logger.error(
          `grandfather check failed for ${user.uid} — seeding no-access`,
          ghErr,
        );
      }

      const ref = entitlementRef(user.uid);
      await getFirestore().runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (snap.exists) {
          // Self-heal grandfathered accounts seeded BEFORE the grandfather rule
          // existed: an old no-card "trialing" doc (or a "none" seed) on a
          // pre-launch account is upgraded to comped so a current free
          // early-access user is never shown a trial or paywall. Conservative —
          // never touches a comped doc or one backed by a real Stripe
          // customer/subscription (that path is owned by the webhook).
          if (shouldGrandfatherExisting(snap.data() ?? null, comped)) {
            tx.update(ref, {
              status: "comped",
              grandfathered: true,
              trialEndsAt: null,
              plan: null,
              updatedAt: FieldValue.serverTimestamp(),
            });
            logger.info(`self-healed ${user.uid} to comped (grandfathered)`);
          }
          return; // otherwise idempotent — never touch an existing doc
        }
        if (comped) {
          // Pre-launch account: permanent free access. No Stripe customer, no
          // subscription, no trial clock — hasAccessMs("comped") is always
          // true, so the client never walls them and aiTutor never 402s them.
          tx.set(ref, {
            uid: user.uid,
            status: "comped",
            grandfathered: true,
            trialEndsAt: null,
            stripeCustomerId: null,
            subscriptionId: null,
            plan: null,
            currentPeriodEnd: null,
            cancelAtPeriodEnd: false,
            lastEventCreated: null,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          });
          return;
        }
        // Card-up-front model: post-launch signup grants NO access. Seed the
        // doc in a no-access "none" state so the aiTutor gate
        // (hasEntitlementAccess) and the client both read "locked" until the
        // student starts a trial via Checkout (the webhook then flips this doc
        // to "trialing").
        tx.set(ref, {
          uid: user.uid,
          status: "none",
          trialEndsAt: null,
          stripeCustomerId: null,
          subscriptionId: null,
          plan: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
          lastEventCreated: null,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      });
      const snap = await ref.get();
      response.json({entitlement: serializeEntitlement(snap)});
    } catch (err) {
      logger.error("ensureEntitlement failed", err);
      response.status(500).json({error: "Could not initialize entitlement"});
    }
  },
);

/**
 * Redeem a promo code for permanent free ("comped") access — the promo path
 * into the same grandfathered state ensureEntitlement grants pre-launch users.
 *
 * SERVER-SIDE ONLY grant: entitlements/{uid} is server-write-only, so this is
 * the only way a client can reach comped without paying — the code is validated
 * here against promoCodes/{CODE} (server-write-only too), never trusted from
 * the client. One transaction enforces the cap (maxRedemptions) + entitlement
 * grant together, and a redeemers/{uid} sub-doc makes a repeat redemption a
 * no-op that never double-counts a slot. Callers who already have access get a
 * clean no-op success so a trialing/comped user never burns a slot.
 */
export const redeemPromoCode = onRequest(
  {cors: ALLOWED_ORIGINS, invoker: "public"},
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }
    if (!(await checkRateLimit(user.uid, "redeemPromoCode", 20))) {
      response
        .status(429)
        .json({error: "Too many attempts. Please wait a moment."});
      return;
    }

    const code = normalizePromoCode(String(request.body?.code ?? ""));
    if (!code) {
      response.status(400).json({error: "Enter a promo code."});
      return;
    }

    try {
      const codeRef = promoCodeRef(code);
      const entRef = entitlementRef(user.uid);
      const redeemerRef = codeRef.collection("redeemers").doc(user.uid);

      const decision = await getFirestore().runTransaction(async (tx) => {
        // All reads BEFORE any writes (Firestore transaction rule).
        const [codeSnap, entSnap, redeemerSnap] = await Promise.all([
          tx.get(codeRef),
          tx.get(entRef),
          tx.get(redeemerRef),
        ]);
        const codeData = codeSnap.exists ? codeSnap.data() || {} : null;
        const entData = entSnap.exists ? entSnap.data() || {} : {};
        const alreadyHasAccess = hasAccessMs(
          {
            status: entData.status,
            trialEndsAtMs: tsToMs(entData.trialEndsAt),
            currentPeriodEndMs: tsToMs(entData.currentPeriodEnd),
          },
          Date.now(),
        );

        const d = evaluatePromoRedemption(
          codeData && {
            active: codeData.active,
            maxRedemptions: codeData.maxRedemptions ?? null,
            redemptions: codeData.redemptions ?? 0,
          },
          {alreadyHasAccess, alreadyRedeemed: redeemerSnap.exists},
        );

        if (d.consumeSlot) {
          tx.update(codeRef, {
            redemptions: FieldValue.increment(1),
            lastRedeemedAt: FieldValue.serverTimestamp(),
          });
          tx.set(redeemerRef, {
            uid: user.uid,
            redeemedAt: FieldValue.serverTimestamp(),
          });
        }

        if (d.grantComped) {
          const patch: Record<string, unknown> = {
            uid: user.uid,
            status: "comped",
            grandfathered: false,
            comped: true,
            compedVia: "promo",
            promoCode: code,
            trialEndsAt: null,
            stripeCustomerId: null,
            subscriptionId: null,
            plan: null,
            currentPeriodEnd: null,
            cancelAtPeriodEnd: false,
            lastEventCreated: null,
            updatedAt: FieldValue.serverTimestamp(),
          };
          if (!entSnap.exists) patch.createdAt = FieldValue.serverTimestamp();
          tx.set(entRef, patch, {merge: true});
        }

        return d;
      });

      if (!decision.ok) {
        const msg = decision.outcome === "exhausted" ?
          "This code has reached its redemption limit." :
          "That promo code isn't valid.";
        response.status(422).json({error: msg, outcome: decision.outcome});
        return;
      }

      const snap = await entRef.get();
      response.json({
        entitlement: serializeEntitlement(snap),
        outcome: decision.outcome,
      });
    } catch (err) {
      logger.error("redeemPromoCode failed", err);
      response
        .status(500)
        .json({error: "Could not redeem the code. Please try again."});
    }
  },
);

/**
 * Find the Stripe customer that already represents this email address, if any.
 *
 * Used by createCheckoutSession before creating a customer, so a student who
 * deleted their account and signed up again lands back on their original
 * Stripe customer — which is what makes their trial history (and therefore the
 * one-trial-per-customer rule) survive the deletion.
 *
 * Returns the OLDEST match: if duplicates already exist from before this
 * lookup shipped, the oldest is the one carrying the original trial history,
 * so it is the safe one to converge on. Never throws — a lookup failure just
 * means "no match", and the caller creates a fresh customer.
 * @param {string} email the authenticated account's email
 * @return {Promise<Stripe.Customer|null>} the matching customer, or null
 */
async function findCustomerByEmail(
  email: string,
): Promise<Stripe.Customer | null> {
  try {
    const found = await getStripe().customers.list({email, limit: 100});
    const live = found.data.filter((c) => !c.deleted);
    if (!live.length) return null;
    return live.reduce(
      (oldest, c) => (c.created < oldest.created ? c : oldest));
  } catch (err) {
    logger.warn(`customer lookup by email failed for ${email}`, err);
    return null;
  }
}

/**
 * Re-attach a Stripe subscription that is still live on a REUSED customer to
 * the account asking for Checkout, instead of selling them a second one.
 *
 * Reached when a student deletes their account while a subscription is still
 * running (possible for anyone who deleted before deleteAccount learned to
 * cancel) and then signs up again with the same email: findCustomerByEmail
 * hands back their original customer, whose subscription nobody canceled.
 * Opening Checkout there would put a SECOND subscription on the same customer
 * and bill them twice.
 *
 * Adoption is also the fair outcome — they are still paying, so they should
 * have access. Stamps the entitlement doc from the live subscription and
 * re-points subscription.metadata.uid at the new account so future webhooks
 * resolve to it.
 * @param {string} uid the account that just tried to check out
 * @param {string} customerId the reused Stripe customer
 * @param {string} monthlyPriceId configured STRIPE_PRICE_MONTHLY
 * @param {string} annualPriceId configured STRIPE_PRICE_ANNUAL
 * @return {Promise<boolean>} true when a live subscription was adopted
 */
async function adoptLiveSubscription(
  uid: string,
  customerId: string,
  monthlyPriceId: string,
  annualPriceId: string,
): Promise<boolean> {
  const subs = await getStripe().subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 100,
  });
  const live = subs.data.find((x) => CANCELABLE_STATUSES.has(x.status));
  if (!live) return false;

  await getStripe().subscriptions.update(live.id, {
    metadata: {...(live.metadata || {}), uid},
  });
  const patch = subscriptionToEntitlementPatch(
    live, monthlyPriceId, annualPriceId);
  // "now" as the watermark: this is read straight from Stripe, so it is the
  // freshest truth available and must not lose to a replayed older event.
  await applyEntitlementPatch(
    uid, patch, customerId, Math.floor(Date.now() / 1000), null, false);
  logger.info(
    `Adopted live subscription ${live.id} (${live.status}) onto ${uid}`,
  );
  return true;
}

export const createCheckoutSession = onRequest(
  {cors: ALLOWED_ORIGINS, secrets: [stripeSecretKey], invoker: "public"},
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }
    if (!(await checkRateLimit(user.uid, "createCheckoutSession", 20))) {
      response.status(429).json({error: "Too many requests."});
      return;
    }

    try {
      const plan = request.body?.plan === "annual" ? "annual" : "monthly";
      const price = plan === "annual" ?
        stripePriceAnnual.value() :
        stripePriceMonthly.value();
      if (!price) {
        logger.error(`Stripe price id for plan '${plan}' is not configured`);
        response.status(500).json({error: "Billing is not configured"});
        return;
      }

      const entSnap = await entitlementRef(user.uid).get();
      const existing = entSnap.exists ? entSnap.data() : null;

      // Don't sell a subscription to someone who already has access. trialing/
      // active means a live Stripe subscription; comped is a grandfathered/promo
      // free grant. Any of these should manage billing via the Customer Portal,
      // not start a second Checkout (which would create a duplicate subscription).
      // (still-in-period canceled is intentionally NOT blocked — those users
      // legitimately need to re-subscribe.)
      const existingStatus = existing?.status;
      if (existingStatus === "trialing" ||
          existingStatus === "active" ||
          existingStatus === "comped") {
        response.status(409).json({error: "already_subscribed"});
        return;
      }
      // A past_due subscription is STILL LIVE — Stripe is retrying the card in
      // its dunning window. Opening a fresh Checkout would create a SECOND
      // subscription alongside the one being retried (double billing). Send the
      // client to the Customer Portal to fix the card on the existing sub. The
      // distinct code lets billingService route to createPortalSession.
      if (existingStatus === "past_due") {
        response.status(409).json({error: "past_due"});
        return;
      }

      // Create (or reuse) the Stripe customer OURSELVES and persist its id to the
      // entitlement doc BEFORE opening Checkout. Letting Checkout mint the
      // customer via customer_email means every abandoned checkout can leave an
      // orphan customer; pre-creating + persisting makes the next attempt reuse
      // this one. The entitlement doc is server-write-only, so this Admin write
      // is the only way the id gets there.
      let customerId: string | null = existing?.stripeCustomerId || null;
      // Set when this checkout landed on a pre-existing Stripe customer found
      // by email — that customer may still carry a live subscription.
      let reusedCustomer: Stripe.Customer | null = null;
      if (!customerId) {
        // Before minting a customer, look for one Stripe already has for this
        // email. Load-bearing for two reasons:
        //   1. deleteAccount erases entitlements/{uid} (and its trialUsed
        //      marker), so a student who deletes and re-registers arrives here
        //      with a clean doc. Without this lookup they'd get a brand-new
        //      customer and a brand-new free trial — on every loop, forever.
        //   2. It stops a duplicate customer per re-signup, which fragments
        //      the billing history for the same human.
        // Stripe retains customers after account deletion (financial records),
        // which is exactly what makes this reliable.
        reusedCustomer = user.email ?
          await findCustomerByEmail(user.email) :
          null;
        if (reusedCustomer) {
          // Re-point the reused customer at the CURRENT uid so subscription
          // webhooks that fall back to customer metadata resolve to the live
          // account rather than the deleted one.
          await getStripe().customers.update(reusedCustomer.id, {
            metadata: {uid: user.uid},
          });
          logger.info(
            `Reusing Stripe customer ${reusedCustomer.id} for ${user.uid}`,
          );
        }
        customerId = reusedCustomer ?
          reusedCustomer.id :
          (await getStripe().customers.create({
            email: user.email || undefined,
            metadata: {uid: user.uid},
          })).id;
        // Transactional: this call races ensureEntitlement on first signup
        // (the funnel fires both back-to-back). A bare merge-set landing first
        // used to leave a doc with ONLY {stripeCustomerId, updatedAt} forever
        // — ensureEntitlement then sees "exists" and never seeds status/uid.
        // Seed the full no-access shape when the doc is missing; otherwise
        // only stamp the customer id (never touch status — if ensure landed
        // first and seeded comped/none, that state is owned elsewhere).
        const stampRef = entitlementRef(user.uid);
        await getFirestore().runTransaction(async (tx) => {
          const snap = await tx.get(stampRef);
          if (snap.exists) {
            tx.update(stampRef, {
              stripeCustomerId: customerId,
              updatedAt: FieldValue.serverTimestamp(),
            });
          } else {
            tx.set(stampRef, {
              uid: user.uid,
              status: "none",
              trialEndsAt: null,
              stripeCustomerId: customerId,
              subscriptionId: null,
              plan: null,
              currentPeriodEnd: null,
              cancelAtPeriodEnd: false,
              lastEventCreated: null,
              createdAt: FieldValue.serverTimestamp(),
              updatedAt: FieldValue.serverTimestamp(),
            });
          }
        });
      }

      // A reused customer can still own a live subscription (a pre-fix
      // deletion left it running). Adopt it onto this account rather than
      // stacking a second subscription on the same customer — the entitlement
      // doc flips to their real status and the client unlocks off the
      // snapshot, no charge, no duplicate.
      if (reusedCustomer) {
        const adopted = await adoptLiveSubscription(
          user.uid,
          reusedCustomer.id,
          stripePriceMonthly.value(),
          stripePriceAnnual.value(),
        );
        if (adopted) {
          response.status(409)
            .json({error: "already_subscribed", adopted: true});
          return;
        }
      }

      // Exactly ONE trial per customer, enforced against TWO sources:
      //   - the app-side trialUsed marker (stamped by the webhook the first
      //     time this customer trialed), and
      //   - Stripe's own subscription history for this customer.
      // The second source is what survives account deletion: deleteAccount
      // erases the entitlement doc, so the marker alone would hand a fresh
      // trial to anyone who deletes and re-registers. Stripe keeps
      // trial_start/trial_end on every past subscription, so one list call
      // settles it. Only consulted when the local marker isn't already set.
      let trialUsed = existing?.trialUsed === true;
      if (!trialUsed && customerId) {
        try {
          const prior = await getStripe().subscriptions.list({
            customer: customerId,
            status: "all",
            limit: 100,
          });
          trialUsed = subscriptionsShowTrialUsed(prior.data);
          if (trialUsed) {
            logger.info(
              `Prior trial found in Stripe for ${user.uid} — no new trial`,
            );
          }
        } catch (histErr) {
          // Availability over strictness: a Stripe blip must not block a
          // student from subscribing. Worst case they get one extra trial.
          logger.warn(
            `trial-history lookup failed for ${user.uid} — allowing trial`,
            histErr,
          );
        }
      }
      const trialDays = trialDaysForCheckout({trialUsed});
      const subscriptionData: Stripe.Checkout.SessionCreateParams
        .SubscriptionData = {
          // uid on BOTH the session and the subscription: the webhook resolves
          // checkout.session.completed via client_reference_id and later
          // customer.subscription.* events via subscription.metadata.uid.
          metadata: {uid: user.uid},
        };
      if (trialDays != null) {
        // Card-up-front free trial (TRIAL_DAYS in stripePolicy.ts is authoritative):
        // the saved card is charged only
        // when the trial ends (unless canceled first).
        subscriptionData.trial_period_days = trialDays;
        // Safety net: if the trial somehow ends with no usable payment
        // method on file, cancel the subscription instead of charging.
        subscriptionData.trial_settings = {
          end_behavior: {missing_payment_method: "cancel"},
        };
      }

      // Creator link attribution (?ref= landing links → sevaprep.com/r/<slug>).
      // The ref is only honored when a server-write-only creatorRefs/{slug}
      // doc exists and is active — otherwise anyone could self-discount by
      // guessing ?ref= values. A valid ref is stamped into the subscription
      // metadata (payouts.mjs attributes by it) and, when the shared creator
      // coupon is configured, auto-applies the audience discount. Stripe
      // forbids discounts + allow_promotion_codes together, so a ref checkout
      // drops the manual code box (the link IS the discount).
      const refSlug = sanitizeRefSlug(request.body?.ref);
      let refValid = false;
      if (refSlug) {
        const refSnap = await getFirestore()
          .collection("creatorRefs").doc(refSlug).get();
        refValid = refSnap.exists && refSnap.data()?.active === true;
      }
      if (refValid && refSlug) {
        subscriptionData.metadata = {...subscriptionData.metadata, ref: refSlug};
      }
      const creatorCoupon = process.env.CREATOR_LINK_COUPON || "";
      const useRefDiscount = refValid && !!creatorCoupon;

      const base = appBaseUrl.value().replace(/\/$/, "");
      const session = await getStripe().checkout.sessions.create({
        mode: "subscription",
        client_reference_id: user.uid,
        customer: customerId,
        line_items: [{price, quantity: 1}],
        ...(useRefDiscount ?
          {discounts: [{coupon: creatorCoupon}]} :
          {allow_promotion_codes: true}),
        // payment_method_collection stays at its default ("always") so the
        // card IS collected during Checkout even though the first charge is
        // deferred to trial end — that is the whole point of card-up-front.
        subscription_data: subscriptionData,
        metadata: {uid: user.uid, ...(refValid && refSlug ? {ref: refSlug} : {})},
        success_url: `${base}/course?checkout=success`,
        cancel_url: `${base}/course?checkout=canceled`,
      });

      response.json({url: session.url});
    } catch (err) {
      logger.error("createCheckoutSession failed", err);
      response.status(500).json({error: "Could not start checkout"});
    }
  },
);

export const createPortalSession = onRequest(
  {cors: ALLOWED_ORIGINS, secrets: [stripeSecretKey], invoker: "public"},
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }
    if (!(await checkRateLimit(user.uid, "createPortalSession", 20))) {
      response.status(429).json({error: "Too many requests."});
      return;
    }

    try {
      const entSnap = await entitlementRef(user.uid).get();
      const customer = entSnap.exists ? entSnap.data()?.stripeCustomerId : null;
      if (!customer) {
        response.status(400).json({error: "no_billing_account"});
        return;
      }
      const base = appBaseUrl.value().replace(/\/$/, "");
      const portal = await getStripe().billingPortal.sessions.create({
        customer,
        return_url: `${base}/course`,
      });
      response.json({url: portal.url});
    } catch (err) {
      logger.error("createPortalSession failed", err);
      response.status(500).json({error: "Could not open billing portal"});
    }
  },
);

/**
 * Apply an absolute entitlement state derived from a Stripe event, guarded
 * against out-of-order delivery by event.created (see shouldApplyEvent).
 * @param {string} uid target account
 * @param {EntitlementPatch} patch absolute state from the event
 * @param {string|null} stripeCustomerId customer to record, when known
 * @param {number} eventCreatedSec event.created watermark (unix seconds)
 * @param {string|null} eventId Stripe event id (same-second tie-breaking)
 * @param {boolean} isTerminalEvent true for customer.subscription.deleted
 */
async function applyEntitlementPatch(
  uid: string,
  patch: EntitlementPatch,
  stripeCustomerId: string | null,
  eventCreatedSec: number,
  eventId: string | null = null,
  isTerminalEvent = false,
): Promise<void> {
  const ref = entitlementRef(uid);
  await getFirestore().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existing = snap.exists ? snap.data() : null;
    if (!shouldApplyEvent(
      eventCreatedSec,
      existing?.lastEventCreated,
      eventId,
      existing?.lastEventId || null,
      isTerminalEvent,
    )) {
      logger.info(`Skipping stale Stripe event for ${uid}`);
      return;
    }
    tx.set(ref, {
      uid,
      status: patch.status,
      plan: patch.plan,
      subscriptionId: patch.subscriptionId,
      currentPeriodEnd: patch.currentPeriodEndMs != null ?
        Timestamp.fromMillis(patch.currentPeriodEndMs) :
        null,
      // Stripe's trial_end drives the client's "N days left / won't be
      // charged until <date>" copy — never app-side math.
      trialEndsAt: patch.trialEndsAtMs != null ?
        Timestamp.fromMillis(patch.trialEndsAtMs) :
        null,
      cancelAtPeriodEnd: patch.cancelAtPeriodEnd,
      ...(stripeCustomerId ? {stripeCustomerId} : {}),
      // Durable one-trial-per-customer marker: once an observed subscription
      // carries a trial we stamp trialUsed permanently (merge-set, never unset)
      // so a re-subscribe after cancel can't mint a fresh trial. Read back by
      // createCheckoutSession via trialDaysForCheckout.
      ...(subscriptionPatchUsedTrial(patch) ? {trialUsed: true} : {}),
      lastEventCreated: eventCreatedSec,
      lastEventId: eventId,
      updatedAt: FieldValue.serverTimestamp(),
    }, {merge: true});
  });
}

/**
 * Resolve the uid for a subscription event: metadata first, then a
 * customer-id lookup against existing entitlement docs.
 * @param {object} sub the Stripe subscription (metadata + customer)
 * @return {Promise<string|null>} the owning uid, or null if unresolvable
 */
async function uidForSubscription(sub: {
  metadata?: {uid?: string};
  customer?: string | {id?: string} | null;
}): Promise<string | null> {
  if (sub.metadata?.uid) return sub.metadata.uid;
  const customerId = typeof sub.customer === "string" ?
    sub.customer :
    sub.customer?.id;
  if (!customerId) return null;
  const q = await getFirestore()
    .collection("entitlements")
    .where("stripeCustomerId", "==", customerId)
    .limit(1)
    .get();
  return q.empty ? null : q.docs[0].id;
}


/**
 * Server-side product analytics. The client funnel events stop at the Stripe
 * redirect, so the money events (trial started / converted / ended) are
 * captured here — the webhook is the only place that observes them
 * truthfully. Fire-and-forget: analytics must never fail a webhook (a non-2xx
 * would make Stripe retry the whole event). distinct_id = uid, joining the
 * client's phIdentify(uid) person graph. Inert when POSTHOG_KEY is unset.
 * @param {string} eventName PostHog event name
 * @param {string} uid Firebase uid (= PostHog distinct_id)
 * @param {Object} properties event properties (no PII)
 */
function phServerCapture(
  eventName: string,
  uid: string,
  properties: Record<string, unknown>,
): void {
  const key = posthogKey.value();
  if (!key) return;
  void fetch("https://us.i.posthog.com/batch/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      api_key: key,
      batch: [{
        event: eventName,
        distinct_id: uid,
        properties: {...properties, source: "stripe-webhook"},
        timestamp: new Date().toISOString(),
      }],
    }),
  }).then((r) => {
    if (!r.ok) {
      logger.warn(`posthog capture ${eventName} rejected: ${r.status}`);
    }
  }).catch((err) => {
    logger.warn(`posthog capture ${eventName} failed`, err);
  });
}

/**
 * Cancel every live Stripe subscription owned by this account — called by
 * deleteAccount BEFORE any data is removed.
 *
 * Deleting the app account used to leave the Stripe subscription running: the
 * customer kept getting billed with no account, and could not even reach the
 * Customer Portal to stop it (createPortalSession reads
 * entitlements/{uid}.stripeCustomerId, which deletion had just erased, and
 * requires an Auth login that no longer exists). Money must never outlive the
 * account that authorized it.
 *
 * Cancels IMMEDIATELY (not at period end) — the account is going away, so
 * there is nothing left to keep access for. Canceling a trialing subscription
 * never charges. The Stripe CUSTOMER object is deliberately retained
 * (financial records, and it is what keeps a deleted-and-resurrected account
 * from minting a fresh trial — see subscriptionsShowTrialUsed).
 *
 * Throws on Stripe failure so the caller aborts the deletion with nothing
 * removed yet; a retry is strictly better than orphaning a billable
 * subscription.
 * @param {string} uid the account being deleted
 * @param {string|undefined} email the account's email, used as a fallback way
 *   to locate the Stripe customer when the entitlement doc never got the
 *   customer id stamped (e.g. Checkout created the customer but the stamping
 *   transaction failed). Without it that subscription would survive deletion.
 * @return {Promise<string[]>} ids of the subscriptions that were canceled
 */
export async function cancelSubscriptionsForUid(
  uid: string,
  email?: string,
): Promise<string[]> {
  const snap = await entitlementRef(uid).get();
  const data = snap.exists ? snap.data() : null;
  let customerId: string | null = data?.stripeCustomerId || null;
  const recordedSubId: string | null = data?.subscriptionId || null;
  if (!customerId && email) {
    const byEmail = await findCustomerByEmail(email);
    if (byEmail) {
      customerId = byEmail.id;
      logger.info(
        `[deleteAccount] resolved customer ${byEmail.id} for ${uid} by email`,
      );
    }
  }

  // Collect candidates from BOTH sources — the customer's subscription list
  // (authoritative) and the id recorded on the doc (covers the case where the
  // customer id was never stamped but a subscription id was) — carrying each
  // one's STATUS along. Status is load-bearing: Stripe rejects cancel() on an
  // already-canceled subscription, and an unguarded throw here would abort the
  // whole deletion, permanently blocking anyone whose doc names an old
  // canceled subscription from ever deleting their account.
  const targets = new Map<string, string>(); // subscription id -> status
  if (customerId) {
    const subs = await getStripe().subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 100,
    });
    for (const s of subs.data) targets.set(s.id, s.status);
  }
  if (recordedSubId && !targets.has(recordedSubId)) {
    try {
      const s = await getStripe().subscriptions.retrieve(recordedSubId);
      targets.set(s.id, s.status);
    } catch (err) {
      // A subscription id that no longer exists in Stripe is nothing to
      // cancel; anything else is a real failure worth aborting on.
      if ((err as {code?: string})?.code !== "resource_missing") throw err;
    }
  }

  const canceled: string[] = [];
  for (const [id, status] of targets) {
    if (!CANCELABLE_STATUSES.has(status)) continue;
    try {
      await getStripe().subscriptions.cancel(id);
      canceled.push(id);
      logger.info(
        `[deleteAccount] canceled subscription ${id} for ${uid} ` +
        `(was ${status})`,
      );
    } catch (err) {
      if ((err as {code?: string})?.code === "resource_missing") continue;
      throw err;
    }
  }
  return canceled;
}

export const stripeWebhook = onRequest(
  {secrets: [stripeSecretKey, stripeWebhookSecret], invoker: "public"},
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }

    let event: Stripe.Event;
    try {
      const signature = request.headers["stripe-signature"] as string;
      event = getStripe().webhooks.constructEvent(
        request.rawBody,
        signature,
        stripeWebhookSecret.value(),
      );
    } catch (err) {
      logger.warn("stripeWebhook signature verification failed", err);
      response.status(400).send("Invalid signature");
      return;
    }

    try {
      const monthly = stripePriceMonthly.value();
      const annual = stripePriceAnnual.value();

      switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.client_reference_id || session.metadata?.uid;
        const customerId = typeof session.customer === "string" ?
          session.customer :
          session.customer?.id || null;
        const subId = typeof session.subscription === "string" ?
          session.subscription :
          session.subscription?.id;
        if (!uid || !subId) {
          logger.warn("checkout.session.completed without uid/subscription", {
            uid, subId, sessionId: session.id,
          });
          break;
        }
        // Fetch the subscription for authoritative status + period end.
        const sub = await getStripe().subscriptions.retrieve(subId);
        const patch = subscriptionToEntitlementPatch(sub, monthly, annual);
        await applyEntitlementPatch(uid, patch, customerId, event.created, event.id, false);
        logger.info(`Entitlement activated for ${uid} (${patch.plan})`);
        phServerCapture(
          sub.status === "trialing" ? "trial_started" : "subscription_started",
          uid,
          {plan: patch.plan, copyVariant: "personal-v1"},
        );
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const uid = await uidForSubscription(sub);
        if (!uid) {
          logger.warn(`No uid resolvable for subscription ${sub.id}`);
          break;
        }
        const patch = subscriptionToEntitlementPatch(sub, monthly, annual);
        const customerId = typeof sub.customer === "string" ?
          sub.customer :
          sub.customer?.id || null;
        await applyEntitlementPatch(
          uid, patch, customerId, event.created, event.id,
          event.type === "customer.subscription.deleted",
        );
        // trial_converted = the exact trialing -> active transition (Stripe
        // sends the prior status in previous_attributes on updated events).
        const prevStatus = (event.data.previous_attributes as
          {status?: string} | undefined)?.status;
        if (event.type === "customer.subscription.updated" &&
            prevStatus === "trialing" && sub.status === "active") {
          phServerCapture("trial_converted", uid, {plan: patch.plan});
        }
        if (event.type === "customer.subscription.deleted") {
          phServerCapture("subscription_ended", uid, {
            plan: patch.plan, lastStatus: sub.status,
          });
        }
        break;
      }
      default:
        // Unhandled event types are acknowledged and ignored.
        break;
      }
      response.json({received: true});
    } catch (err) {
      // Non-2xx makes Stripe retry with backoff — correct for transient
      // Firestore failures.
      logger.error(`stripeWebhook handler failed for ${event.type}`, err);
      response.status(500).send("Handler error");
    }
  },
);
