/**
 * Pure billing/entitlement policy — no Firebase or Stripe SDK imports, so it
 * is unit-testable with node --test (same pattern as reengagementPolicy.ts).
 *
 * The entitlement model (CARD-UP-FRONT 3-day trial, 2026-07-03):
 *   - Signup grants NO access. To start the free trial (TRIAL_DAYS) the student must
 *     enter a card via hosted Stripe Checkout (payment_method_collection
 *     stays "always"; subscription_data.trial_period_days = 3).
 *   - During the trial the Stripe subscription status is "trialing" — full
 *     access, card on file, not yet charged. Stripe owns the trial clock
 *     (subscription.trial_end); the app never stamps it.
 *   - At trial end Stripe auto-charges and the subscription flips to "active"
 *     (the amount lives on the Stripe Price objects named by STRIPE_PRICE_* in
 *     functions/.env — displayed prices live in src/services/pricing.js; keep
 *     the two in sync) — UNLESS the student canceled during the trial, in
 *     which case it flips to "canceled" at trial_end with no charge.
 *   - Access rule: "trialing" OR "active" grants full access. "past_due"
 *     keeps access (dunning grace). "canceled" keeps access only until any
 *     still-future currentPeriodEnd, then locks (read-only score access on
 *     the client; the aiTutor endpoint enforces server-side).
 *   - There is NO app-side trial clock and NO no-card grant anymore.
 */

export type EntitlementStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  // "comped" = grandfathered permanent free access for accounts that existed
  // before billing launched (the free early-access cohort). Never billed,
  // never walled, no Stripe subscription. Set once by ensureEntitlement at the
  // account's first post-launch session (see isGrandfathered) and never
  // overwritten by subscription events (a comped user has no subscription).
  | "comped";
export type PlanId = "monthly" | "annual" | null;

export interface EntitlementPatch {
  status: EntitlementStatus;
  plan: PlanId;
  subscriptionId: string | null;
  /** Unix ms; null when the subscription carries no period end. */
  currentPeriodEndMs: number | null;
  /**
   * Unix ms of the Stripe trial end (subscription.trial_end), for display.
   * Null when the subscription is not (and never was) in a trial.
   */
  trialEndsAtMs: number | null;
  cancelAtPeriodEnd: boolean;
}

/** Minimal shape of a Stripe Subscription this policy needs. */
export interface StripeSubscriptionLike {
  id: string;
  status: string;
  cancel_at_period_end?: boolean;
  current_period_end?: number | null; // unix SECONDS (older API versions)
  trial_end?: number | null; // unix SECONDS; set while status is "trialing"
  items?: {
    data?: Array<{
      price?: {id?: string};
      // Newer Stripe API versions (2025-03+) moved the billing period from
      // the subscription onto its items — verified live 2026-07-01: the
      // top-level field is absent and items[0].current_period_end carries it.
      current_period_end?: number | null;
    }>;
  };
}

export const TRIAL_DAYS = 3;
export const DAY_MS = 86400000;

// Dunning grace for a past_due subscription: how long a subscriber keeps
// access AFTER their paid period ends while Stripe retries the card. Bounds
// what was previously unconditional past_due access — a permanently failing
// card must not grant premium forever. Stripe's smart-retry schedule runs up
// to ~2 weeks before the subscription transitions, so 14 days covers legitimate
// dunning without an open-ended free ride. Tunable.
export const PAST_DUE_GRACE_MS = 14 * DAY_MS;

/**
 * Map Stripe's subscription status to our four-state entitlement status.
 * "trialing" is now a first-class state — the card-up-front trial IS a Stripe
 * trial (subscription_data.trial_period_days), so trialing must survive the
 * mapping (it grants access and carries the Stripe trial_end for display).
 * past_due keeps access (Stripe dunning window); everything terminal or
 * unstarted (canceled/unpaid/incomplete/incomplete_expired/paused) locks.
 * @param {string} stripeStatus Stripe subscription.status
 * @return {EntitlementStatus} our four-state status
 */
export function mapStripeStatus(stripeStatus: string): EntitlementStatus {
  switch (stripeStatus) {
  case "active":
    return "active";
  case "trialing":
    return "trialing";
  case "past_due":
    return "past_due";
  default:
    return "canceled";
  }
}

/**
 * Resolve which of our two plans a Stripe price id refers to.
 * @param {string|undefined} priceId Stripe price id on the subscription item
 * @param {string} monthlyPriceId configured STRIPE_PRICE_MONTHLY
 * @param {string} annualPriceId configured STRIPE_PRICE_ANNUAL
 * @return {PlanId} 'monthly' | 'annual' | null
 */
export function planFromPriceId(
  priceId: string | undefined,
  monthlyPriceId: string,
  annualPriceId: string,
): PlanId {
  if (!priceId) return null;
  if (priceId === monthlyPriceId) return "monthly";
  if (priceId === annualPriceId) return "annual";
  return null;
}

/**
 * Build the entitlement patch a subscription event implies.
 * @param {StripeSubscriptionLike} sub the Stripe subscription
 * @param {string} monthlyPriceId configured STRIPE_PRICE_MONTHLY
 * @param {string} annualPriceId configured STRIPE_PRICE_ANNUAL
 * @return {EntitlementPatch} absolute entitlement state to persist
 */
export function subscriptionToEntitlementPatch(
  sub: StripeSubscriptionLike,
  monthlyPriceId: string,
  annualPriceId: string,
): EntitlementPatch {
  const firstItem = sub.items?.data?.[0];
  // Period end lives on the subscription in older API versions and on the
  // ITEM in newer ones — read whichever is present.
  const periodEndSec = typeof sub.current_period_end === "number" ?
    sub.current_period_end :
    (typeof firstItem?.current_period_end === "number" ?
      firstItem.current_period_end :
      null);
  // Stripe owns the trial clock — carry subscription.trial_end straight
  // through for display ("N days left", "won't be charged until <date>").
  const trialEndSec = typeof sub.trial_end === "number" ?
    sub.trial_end :
    null;
  return {
    status: mapStripeStatus(sub.status),
    plan: planFromPriceId(firstItem?.price?.id, monthlyPriceId, annualPriceId),
    subscriptionId: sub.id || null,
    currentPeriodEndMs: periodEndSec != null ? periodEndSec * 1000 : null,
    trialEndsAtMs: trialEndSec != null ? trialEndSec * 1000 : null,
    cancelAtPeriodEnd: !!sub.cancel_at_period_end,
  };
}

/**
 * Does the entitlement state a subscription event implies mean the customer has
 * (ever) consumed a free trial? True when the observed subscription is trialing
 * or carries a trial_end (Stripe keeps trial_end on the subscription even after
 * it converts to active, so the marker is durable once stamped). The webhook
 * path stamps a permanent `trialUsed: true` off this so a later re-subscribe
 * (after a cancel) never gets a fresh trial — exactly ONE trial per customer.
 * @param {object} patch the entitlement patch (status + trialEndsAtMs) derived
 *   from the observed subscription
 * @return {boolean} true when this subscription carries/carried a trial
 */
export function subscriptionPatchUsedTrial(
  patch: Pick<EntitlementPatch, "status" | "trialEndsAtMs">,
): boolean {
  return patch.status === "trialing" || patch.trialEndsAtMs != null;
}

/**
 * How many trial days a NEW Checkout should grant this customer. Returns null
 * (omit trial_period_days entirely — start billing immediately) once the
 * entitlement carries the durable `trialUsed` marker, so a canceled customer
 * who re-runs Checkout on the same Stripe customer can't mint a fresh
 * trial forever. Otherwise the standard TRIAL_DAYS.
 * @param {object|null} existing the current entitlement doc (reads trialUsed)
 * @return {number|null} trial days to pass, or null to omit the trial
 */
export function trialDaysForCheckout(
  existing: {trialUsed?: boolean} | null | undefined,
): number | null {
  if (existing && existing.trialUsed === true) return null;
  return TRIAL_DAYS;
}

/**
 * Stripe subscription statuses that are still LIVE — i.e. the subscription can
 * still bill (or start billing) and therefore must be canceled when the owning
 * account is deleted. "canceled" and "incomplete_expired" are already terminal;
 * canceling them again is a no-op Stripe rejects.
 *
 * Deliberately includes "incomplete" (a first payment still awaiting
 * confirmation can still succeed) and "paused" (resumable), so no path leaves
 * a chargeable subscription behind a deleted account.
 */
export const CANCELABLE_STATUSES: ReadonlySet<string> = new Set([
  "trialing",
  "active",
  "past_due",
  "unpaid",
  "incomplete",
  "paused",
]);

/**
 * Has this Stripe customer ever consumed a free trial? Reads the customer's
 * FULL subscription history (any status) and returns true when any of them
 * started a trial — Stripe keeps trial_start/trial_end on the subscription
 * forever, including after it converts or is canceled.
 *
 * This is the durable, delete-proof half of "exactly ONE trial per customer".
 * The app-side `trialUsed` marker lives on entitlements/{uid}, which
 * deleteAccount erases; without this check a student could delete their
 * account, sign up again with the same email, and mint a fresh 3-day trial on
 * every loop. Stripe retains the customer (financial records), so its
 * subscription history outlives the app account and closes that hole.
 *
 * @param {Array} subs the customer's subscriptions (status=all)
 * @return {boolean} true when any subscription carried a trial
 */
export function subscriptionsShowTrialUsed(
  subs: ReadonlyArray<{trial_start?: number | null; trial_end?: number | null}>,
): boolean {
  if (!Array.isArray(subs)) return false;
  return subs.some((s) =>
    typeof s?.trial_start === "number" || typeof s?.trial_end === "number");
}

/**
 * Webhook ordering guard: Stripe does not guarantee event delivery order, so
 * an older subscription.updated must never overwrite a newer one.
 *
 * Same-second ties: a replay of the SAME event id re-applies (idempotent
 * absolute-state writes). A DIFFERENT event created in the same second applies
 * only when it is terminal — subscription.deleted must win ties, because an
 * updated(active) re-applied after a same-second deleted would resurrect a
 * canceled subscription until the next event. Callers without id information
 * keep the legacy idempotent-replay behavior.
 * @param {number} eventCreatedSec event.created (unix seconds)
 * @param {number|null|undefined} lastAppliedEventSec stored watermark
 * @param {string|null} eventId incoming Stripe event id
 * @param {string|null} lastEventId stored id of the last applied event
 * @param {boolean} isTerminalEvent true for customer.subscription.deleted
 * @return {boolean} true when the event should be applied
 */
export function shouldApplyEvent(
  eventCreatedSec: number,
  lastAppliedEventSec: number | null | undefined,
  eventId: string | null = null,
  lastEventId: string | null = null,
  isTerminalEvent = false,
): boolean {
  if (typeof lastAppliedEventSec !== "number") return true;
  if (eventCreatedSec > lastAppliedEventSec) return true;
  if (eventCreatedSec < lastAppliedEventSec) return false;
  if (!eventId || !lastEventId) return true;
  if (eventId === lastEventId) return true;
  return isTerminalEvent;
}

/** Plain-ms view of an entitlement doc for access decisions. */
export interface EntitlementAccessInput {
  status?: string | null;
  trialEndsAtMs?: number | null;
  currentPeriodEndMs?: number | null;
}

/**
 * The single access rule, shared conceptually with the client selector
 * (src/services/selectors/entitlementAccess.js — keep the two in sync):
 *   comped    -> access (grandfathered free early-access user; unconditional)
 *   trialing  -> access (card on file, Stripe owns the trial clock; Stripe
 *                flips the status to active/canceled at trial_end, so we do
 *                NOT re-gate on a local clock and risk locking a paying
 *                customer during the trial->active webhook window)
 *   active    -> access (covers cancel-at-period-end until Stripe flips it)
 *   past_due  -> access only through currentPeriodEnd + PAST_DUE_GRACE_MS
 *               (bounded dunning grace; a permanently failing card must not
 *               keep premium forever). DENIES when no period end is recorded
 *               rather than granting a bare grace window — Stripe always
 *               writes the period end, so a missing one is corruption.
 *   canceled  -> access only until any still-future currentPeriodEnd
 *   anything else (incl. "none"/undefined) -> NO access
 * @param {EntitlementAccessInput|null} doc plain-ms entitlement view
 * @param {number} nowMs current time (unix ms)
 * @return {boolean} whether the account has premium/trial access
 */
export function hasAccessMs(
  doc: EntitlementAccessInput | null,
  nowMs: number,
): boolean {
  if (!doc) return false;
  switch (doc.status) {
  case "comped":
  case "trialing":
  case "active":
    return true;
  case "past_due":
    // Bounded grace: keep access while Stripe retries, but never forever.
    // A past_due doc normally carries the period end; if it's missing, deny
    // rather than grant (conservative — Stripe always writes it on the sub).
    return typeof doc.currentPeriodEndMs === "number" &&
        doc.currentPeriodEndMs + PAST_DUE_GRACE_MS > nowMs;
  case "canceled":
    return typeof doc.currentPeriodEndMs === "number" &&
        doc.currentPeriodEndMs > nowMs;
  default:
    return false;
  }
}

/**
 * Access decision when an account has NO entitlement doc yet.
 *
 * The doc is seeded only by the client's ensureEntitlement call, which runs
 * ONLY while billing is enabled (REACT_APP_FF_BILLING). So a missing doc means
 * either (a) billing is still dark — nobody should be walled — or (b) billing
 * is live and this is a brand-new/never-seeded account.
 *
 * When enforcement is OFF, allow (preserves the pre-launch "nobody is walled"
 * behavior). When enforcement is ON, a missing doc must NOT blanket-grant the
 * paid tutor — otherwise the paywall is opt-in for any client that simply
 * never calls ensureEntitlement. Fall back to the grandfather rule: a pre-epoch
 * account is comped (allow); a post-epoch account with no doc has no
 * subscription and is denied until it subscribes.
 *
 * @param {number|null} accountCreatedMs Auth creation time (unix ms)
 * @param {number|null} launchEpochMs billing-launch cutoff (unix ms)
 * @param {boolean} enforced whether server-side billing enforcement is on
 * @return {boolean} whether to grant access in the absence of a doc
 */
export function accessOnMissingDoc(
  accountCreatedMs: number | null | undefined,
  launchEpochMs: number | null | undefined,
  enforced: boolean,
): boolean {
  if (!enforced) return true;
  return isGrandfathered(accountCreatedMs, launchEpochMs);
}

/**
 * Grandfather rule: an account is a "current" (free early-access) user — and
 * therefore gets permanent comped access, never billing — when it was created
 * before billing launched. Post-launch accounts (created at/after the epoch)
 * go through the card-up-front trial instead.
 *
 * Conservative by design: if either timestamp is missing/unparseable we return
 * false (NOT grandfathered) so a bad clock never silently comps every new
 * signup and quietly disables billing. The caller treats a thrown/failed
 * lookup the same way. Because the ONLY path that charges a card is the user
 * actively completing Checkout, a mis-classified existing user is never billed
 * without first being sent to (and choosing to act on) the paywall — and this
 * rule is exactly what keeps them off it.
 *
 * @param {number|null} accountCreatedMs account creation time (unix ms)
 * @param {number|null} launchEpochMs billing-launch cutoff (unix ms)
 * @return {boolean} true when the account predates billing launch
 */
export function isGrandfathered(
  accountCreatedMs: number | null | undefined,
  launchEpochMs: number | null | undefined,
): boolean {
  if (typeof accountCreatedMs !== "number" ||
      !Number.isFinite(accountCreatedMs)) {
    return false;
  }
  if (typeof launchEpochMs !== "number" || !Number.isFinite(launchEpochMs)) {
    return false;
  }
  return accountCreatedMs < launchEpochMs;
}

/** Minimal view of an existing entitlement doc for the self-heal decision. */
export interface ExistingEntitlementView {
  status?: string | null;
  stripeCustomerId?: string | null;
  subscriptionId?: string | null;
}

/**
 * Should ensureEntitlement upgrade an ALREADY-EXISTING entitlement doc to
 * comped? The grandfather seed only ran for accounts with no doc yet, so a
 * pre-launch user who already had a doc (an old no-card "trialing" doc, or a
 * "none" seed) from before the grandfather rule shipped stayed non-comped and
 * kept seeing a trial/paywall. This heals them on their next ensureEntitlement
 * call.
 *
 * Conservative — returns false unless ALL hold:
 *   - the account is grandfathered (created before billing launch), AND
 *   - the existing doc is not already comped (no pointless write), AND
 *   - the doc is NOT backed by a real Stripe customer/subscription.
 * The last guard is load-bearing: a doc with a stripeCustomerId/subscriptionId
 * is owned by the Stripe webhook lifecycle, so we never overwrite it here (that
 * could free a genuinely paying account or race a subscription event). Such a
 * case — a pre-launch account that later entered Checkout — is left for manual
 * handling, never silently comped.
 *
 * @param {ExistingEntitlementView|null} existing current entitlement doc data
 * @param {boolean} grandfathered whether the account predates billing launch
 * @return {boolean} true when the existing doc should be upgraded to comped
 */
export function shouldGrandfatherExisting(
  existing: ExistingEntitlementView | null | undefined,
  grandfathered: boolean,
): boolean {
  if (!grandfathered) return false;
  if (!existing) return false;
  if (existing.status === "comped") return false;
  if (existing.stripeCustomerId || existing.subscriptionId) return false;
  return true;
}

// ── Promo codes (comp a user into permanent free access) ───────────────────

/** Server-side view of a promoCodes/{CODE} doc for the redemption decision. */
export interface PromoCodeState {
  active?: boolean;
  /** null/undefined = unlimited; a number caps total redemptions. */
  maxRedemptions?: number | null;
  redemptions?: number;
}

export type PromoRedeemOutcome =
  | "granted" // valid code, access newly comped, slot consumed
  | "already_has_access" // caller already has access — no-op, no slot burned
  | "already_redeemed" // caller redeemed this code before — re-grant, no slot
  | "inactive" // unknown or disabled code
  | "exhausted"; // code hit its maxRedemptions cap

export interface PromoRedeemDecision {
  outcome: PromoRedeemOutcome;
  /** Set the caller's entitlement to comped. */
  grantComped: boolean;
  /** Increment the code's redemptions + record the redeemer. */
  consumeSlot: boolean;
  /** Success from the caller's POV (they end up with access). */
  ok: boolean;
}

/**
 * Normalize a user-entered promo code into its canonical doc-id form:
 * trimmed, uppercased, and restricted to [A-Z0-9] (letters/digits only, which
 * is what our codes use). Returns null for empty/invalid input so the caller
 * can reject before any Firestore read.
 *
 * @param {string} raw the code as typed
 * @return {string|null} canonical code, or null when unusable
 */
export function normalizePromoCode(raw: string): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase();
  if (!code) return null;
  if (!/^[A-Z0-9]{1,64}$/.test(code)) return null;
  return code;
}

/**
 * Canonicalize a creator referral slug from a ?ref= landing link
 * (sevaprep.com/r/<slug>). Lowercase kebab, 1-32 chars, must start
 * alphanumeric — anything else returns null so the caller drops the ref
 * silently (a bad ref must never break checkout).
 *
 * @param {string} raw the ref as received from the client
 * @return {string|null} canonical slug, or null when unusable
 */
export function sanitizeRefSlug(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const slug = raw.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,31}$/.test(slug)) return null;
  return slug;
}

/**
 * Pure decision for a promo-code redemption. Firestore reads/writes stay in the
 * caller's transaction; this just says what to do given the code state and the
 * caller's current standing. Order matters:
 *   1. already has access  -> no-op success (never burn a slot on someone who
 *      doesn't need it — e.g. a trialing/active/comped/grandfathered account)
 *   2. code missing/disabled -> invalid
 *   3. caller already redeemed THIS code -> re-grant, don't consume a 2nd slot
 *   4. cap reached -> exhausted
 *   5. otherwise -> grant + consume one slot
 *
 * @param {PromoCodeState|null} code the code doc (null when it doesn't exist)
 * @param {object} ctx caller state (alreadyHasAccess, alreadyRedeemed)
 * @return {PromoRedeemDecision} what the transaction should do
 */
export function evaluatePromoRedemption(
  code: PromoCodeState | null,
  ctx: {alreadyHasAccess: boolean; alreadyRedeemed: boolean},
): PromoRedeemDecision {
  if (ctx.alreadyHasAccess) {
    return {
      outcome: "already_has_access",
      grantComped: false,
      consumeSlot: false,
      ok: true,
    };
  }
  if (!code || code.active !== true) {
    return {
      outcome: "inactive",
      grantComped: false,
      consumeSlot: false,
      ok: false,
    };
  }
  if (ctx.alreadyRedeemed) {
    return {
      outcome: "already_redeemed",
      grantComped: true,
      consumeSlot: false,
      ok: true,
    };
  }
  const max = code.maxRedemptions;
  const used = typeof code.redemptions === "number" ? code.redemptions : 0;
  if (typeof max === "number" && Number.isFinite(max) && used >= max) {
    return {
      outcome: "exhausted",
      grantComped: false,
      consumeSlot: false,
      ok: false,
    };
  }
  return {outcome: "granted", grantComped: true, consumeSlot: true, ok: true};
}
