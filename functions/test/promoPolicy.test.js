/**
 * Tests for the promo-code policy (normalization + the pure redemption
 * decision). Runs against the compiled output with Node's built-in test
 * runner. Run with: npm test (which builds first).
 */
const test = require("node:test");
const assert = require("node:assert");
const {
  normalizePromoCode,
  evaluatePromoRedemption,
} = require("../lib/stripePolicy");

// ── normalizePromoCode ─────────────────────────────────────────────────────

test("normalizePromoCode trims + uppercases", () => {
  assert.strictEqual(normalizePromoCode("  hareshrajbhatia1 "), "HARESHRAJBHATIA1");
  assert.strictEqual(normalizePromoCode("AbC123"), "ABC123");
});

test("normalizePromoCode rejects empty / whitespace / bad input", () => {
  assert.strictEqual(normalizePromoCode(""), null);
  assert.strictEqual(normalizePromoCode("   "), null);
  assert.strictEqual(normalizePromoCode(null), null);
  assert.strictEqual(normalizePromoCode(undefined), null);
  assert.strictEqual(normalizePromoCode(1234), null);
});

test("normalizePromoCode rejects non-alphanumeric (no dots/slashes/spaces — safe doc id)", () => {
  assert.strictEqual(normalizePromoCode("has space"), null);
  assert.strictEqual(normalizePromoCode("dot.code"), null);
  assert.strictEqual(normalizePromoCode("slash/code"), null);
  assert.strictEqual(normalizePromoCode("under_score"), null);
});

// ── evaluatePromoRedemption ────────────────────────────────────────────────

const active = (over = {}) => ({active: true, maxRedemptions: 50, redemptions: 0, ...over});

test("valid code, new user under cap -> grant + consume a slot", () => {
  const d = evaluatePromoRedemption(active(), {alreadyHasAccess: false, alreadyRedeemed: false});
  assert.deepStrictEqual(d, {outcome: "granted", grantComped: true, consumeSlot: true, ok: true});
});

test("caller already has access -> no-op success, never burns a slot", () => {
  const d = evaluatePromoRedemption(active(), {alreadyHasAccess: true, alreadyRedeemed: false});
  assert.strictEqual(d.ok, true);
  assert.strictEqual(d.grantComped, false);
  assert.strictEqual(d.consumeSlot, false);
  assert.strictEqual(d.outcome, "already_has_access");
});

test("caller already redeemed THIS code -> re-grant, do NOT consume a 2nd slot", () => {
  const d = evaluatePromoRedemption(active({redemptions: 5}), {alreadyHasAccess: false, alreadyRedeemed: true});
  assert.strictEqual(d.grantComped, true);
  assert.strictEqual(d.consumeSlot, false);
  assert.strictEqual(d.outcome, "already_redeemed");
});

test("unknown code (null) -> invalid, no grant", () => {
  const d = evaluatePromoRedemption(null, {alreadyHasAccess: false, alreadyRedeemed: false});
  assert.deepStrictEqual(d, {outcome: "inactive", grantComped: false, consumeSlot: false, ok: false});
});

test("disabled code (active:false) -> invalid", () => {
  const d = evaluatePromoRedemption(active({active: false}), {alreadyHasAccess: false, alreadyRedeemed: false});
  assert.strictEqual(d.ok, false);
  assert.strictEqual(d.outcome, "inactive");
});

test("cap reached (redemptions >= maxRedemptions) -> exhausted", () => {
  const d = evaluatePromoRedemption(
    active({maxRedemptions: 50, redemptions: 50}), {alreadyHasAccess: false, alreadyRedeemed: false});
  assert.strictEqual(d.ok, false);
  assert.strictEqual(d.outcome, "exhausted");
  assert.strictEqual(d.consumeSlot, false);
});

test("last slot (49/50) still grants", () => {
  const d = evaluatePromoRedemption(
    active({maxRedemptions: 50, redemptions: 49}), {alreadyHasAccess: false, alreadyRedeemed: false});
  assert.strictEqual(d.outcome, "granted");
  assert.strictEqual(d.consumeSlot, true);
});

test("null maxRedemptions = unlimited (never exhausts)", () => {
  const d = evaluatePromoRedemption(
    active({maxRedemptions: null, redemptions: 999}), {alreadyHasAccess: false, alreadyRedeemed: false});
  assert.strictEqual(d.outcome, "granted");
});

test("already-has-access wins even when the code is exhausted (no error for a comped user)", () => {
  const d = evaluatePromoRedemption(active({redemptions: 50}), {alreadyHasAccess: true, alreadyRedeemed: false});
  assert.strictEqual(d.ok, true);
  assert.strictEqual(d.outcome, "already_has_access");
});
