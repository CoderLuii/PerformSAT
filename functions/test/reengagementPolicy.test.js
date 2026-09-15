/**
 * Tests for the re-engagement nudge policy (the logic that decides WHO gets a
 * push and WHY). Runs against the compiled output with Node's built-in test
 * runner — zero extra deps. Run with: npm test (which builds first).
 */
const test = require("node:test");
const assert = require("node:assert");
const {
  classifyNudge,
  buildNudgeContent,
  countDueReviews,
  daysUntilTest,
  toMillis,
} = require("../lib/reengagementPolicy");

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse("2026-05-31T12:00:00Z");
const YESTERDAY = "2026-05-30";

test("classifyNudge: active today is never nudged", () => {
  const r = classifyNudge({
    now: NOW,
    reviewStreak: {current: 5, lastDate: YESTERDAY},
    dueReviewCount: 9,
    lastActiveMs: Date.parse("2026-05-31T08:00:00Z"),
  });
  assert.strictEqual(r, null);
});

test("classifyNudge: streak alive yesterday but not today => streak_at_risk", () => {
  const r = classifyNudge({
    now: NOW,
    reviewStreak: {current: 5, lastDate: YESTERDAY},
    dueReviewCount: 0,
    lastActiveMs: NOW - 2 * DAY,
  });
  assert.strictEqual(r, "streak_at_risk");
});

test("classifyNudge: streak_at_risk outranks reviews_due", () => {
  const r = classifyNudge({
    now: NOW,
    reviewStreak: {current: 3, lastDate: YESTERDAY},
    dueReviewCount: 5,
    lastActiveMs: NOW - 2 * DAY,
  });
  assert.strictEqual(r, "streak_at_risk");
});

test("classifyNudge: broken streak (older than yesterday) falls through to reviews_due", () => {
  const r = classifyNudge({
    now: NOW,
    reviewStreak: {current: 4, lastDate: "2026-05-25"},
    dueReviewCount: 2,
    lastActiveMs: NOW - 2 * DAY,
  });
  assert.strictEqual(r, "reviews_due");
});

test("classifyNudge: due items, no streak => reviews_due", () => {
  const r = classifyNudge({now: NOW, reviewStreak: null, dueReviewCount: 2, lastActiveMs: NOW - 2 * DAY});
  assert.strictEqual(r, "reviews_due");
});

test("classifyNudge: inactive >= LAPSE_DAYS, nothing due => lapsed", () => {
  const r = classifyNudge({now: NOW, reviewStreak: null, dueReviewCount: 0, lastActiveMs: NOW - 4 * DAY});
  assert.strictEqual(r, "lapsed");
});

test("classifyNudge: inactive only 1 day, nothing due => null", () => {
  const r = classifyNudge({now: NOW, reviewStreak: null, dueReviewCount: 0, lastActiveMs: NOW - 1 * DAY});
  assert.strictEqual(r, null);
});

test("classifyNudge: zero-current streak does not trigger streak_at_risk", () => {
  const r = classifyNudge({
    now: NOW,
    reviewStreak: {current: 0, lastDate: YESTERDAY},
    dueReviewCount: 0,
    lastActiveMs: NOW - 1 * DAY,
  });
  assert.strictEqual(r, null);
});

test("countDueReviews: counts only items due at/before now", () => {
  const queue = {
    a: {nextReviewDate: new Date(NOW - DAY).toISOString()},
    b: {nextReviewDate: new Date(NOW + DAY).toISOString()},
    c: {},
    d: {nextReviewDate: new Date(NOW).toISOString()},
  };
  assert.strictEqual(countDueReviews(queue, NOW), 2);
  assert.strictEqual(countDueReviews(undefined, NOW), 0);
  assert.strictEqual(countDueReviews({}, NOW), 0);
});

test("daysUntilTest: positive for a future date, null for unset/invalid", () => {
  const d = daysUntilTest("2026-06-07", NOW);
  assert.ok(typeof d === "number" && d > 0 && d <= 8);
  assert.strictEqual(daysUntilTest(null, NOW), null);
  assert.strictEqual(daysUntilTest("not-a-date", NOW), null);
  assert.strictEqual(daysUntilTest(20260607, NOW), null);
});

test("toMillis: handles Timestamp-like, number, ISO string, junk", () => {
  assert.strictEqual(toMillis(null), null);
  assert.strictEqual(toMillis(1234), 1234);
  assert.strictEqual(toMillis("2026-05-31T00:00:00Z"), Date.parse("2026-05-31T00:00:00Z"));
  assert.strictEqual(toMillis({toMillis: () => 999}), 999);
  assert.strictEqual(toMillis("garbage"), null);
  assert.strictEqual(toMillis({}), null);
});

test("buildNudgeContent: streak copy is personalized and emoji-free", () => {
  const c = buildNudgeContent("streak_at_risk", {firstName: "Sam", streakCurrent: 5, dueReviewCount: 0, daysToTest: null});
  assert.strictEqual(c.title, "Keep your 5-day streak");
  assert.ok(c.body.startsWith("Sam, "));
  assert.ok(!/\p{Extended_Pictographic}/u.test(c.title + c.body));
});

test("buildNudgeContent: reviews_due pluralizes correctly", () => {
  const one = buildNudgeContent("reviews_due", {streakCurrent: 0, dueReviewCount: 1, daysToTest: null});
  assert.strictEqual(one.title, "1 review due today");
  const many = buildNudgeContent("reviews_due", {streakCurrent: 0, dueReviewCount: 3, daysToTest: null});
  assert.strictEqual(many.title, "3 reviews due today");
});

test("buildNudgeContent: lapsed appends test-date tail only when set", () => {
  const withTest = buildNudgeContent("lapsed", {streakCurrent: 0, dueReviewCount: 0, daysToTest: 5});
  assert.ok(withTest.body.includes("Your SAT is 5 days away."));
  const noTest = buildNudgeContent("lapsed", {streakCurrent: 0, dueReviewCount: 0, daysToTest: null});
  assert.ok(!noTest.body.includes("Your SAT"));
  const oneDay = buildNudgeContent("lapsed", {streakCurrent: 0, dueReviewCount: 0, daysToTest: 1});
  assert.ok(oneDay.body.includes("1 day away."));
});

test("buildNudgeContent: no firstName omits the name prefix", () => {
  const c = buildNudgeContent("reviews_due", {streakCurrent: 0, dueReviewCount: 2, daysToTest: null});
  assert.ok(c.body.startsWith("clear your"));
});
