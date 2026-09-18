/**
 * sampler.js — deterministic item sampling for the 24-question adaptive
 * mini-diagnostic (12 R&W then 12 Math, ~16 min).
 *
 * Stage 1 is a stratified 8-item probe per section (2 items per domain,
 * medium-preferred). Stage 2 routes 4 more items per section into the two
 * weakest domains, easier or harder depending on stage-1 accuracy, drawn
 * from pre-built per-domain reserve pools so the mid-test adaptation is a
 * pure synchronous lookup (no bank await between questions).
 *
 * Banks are reached ONLY through `data/corpusLoader.js` dynamic imports —
 * never import the bank modules statically here (bundleGuard contract).
 * Every sampled item is guaranteed multiple-choice with exactly 4 choices
 * and a correctAnswer that matches a choice id; math fill-in items are
 * excluded because the mini-diagnostic runner is MC-only.
 */

import { loadMathTestBank, loadRWBank } from '../../data/corpusLoader';
import { isAnswerCorrect } from '../scoring/irtEngine';

// Canonical domain orders — mirror DOMAIN_ORDER / RW_DOMAIN_ORDER in
// practiceAssignmentService.js (not importable from there without welding
// both banks into this chunk; those constants are also private).
export const MATH_DOMAIN_ORDER = ['algebra', 'problem-solving', 'advanced-math', 'geometry'];
export const RW_DOMAIN_ORDER = [
  'information-and-ideas',
  'craft-and-structure',
  'standard-english-conventions',
  'expression-of-ideas',
];

const CANONICAL_DOMAIN_ORDER = [...RW_DOMAIN_ORDER, ...MATH_DOMAIN_ORDER];

const STAGE1_PER_DOMAIN = 2;
const STAGE1_PER_SECTION = 8; // 2 x 4 domains
const STAGE2_POOL_SIZE = 4;   // reserve candidates per pool per domain
const STAGE2_COUNT = 4;       // items selectStage2 returns per section
const STAGE2_PER_DOMAIN = 2;  // items added to each probed weak domain
const WEAK_DOMAINS_PROBED = 2;
const EASIER_ROUTE_MAX_ACCURACY = 0.5; // accuracy <= 0.5 routes to the easier pool
const CROSS_POOL_NEW_SKILL_REACH = 1;  // at most 1 off-difficulty item per domain, to probe a skill the routed pool can't field

// ─── Deterministic helpers ───────────────────────────────────────────────────
// Same LCG shuffle + djb2 hash as practiceAssignmentService.js's private
// seededShuffle/hashString — duplicated (20 lines) because importing that
// module statically would pull both banks into this chunk graph.

function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = Math.abs(seed) || 1;
  const rng = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0x7fffffff;
  }
  return hash;
}

// ─── Eligibility ─────────────────────────────────────────────────────────────

/**
 * MC-only gate: the mini-diagnostic runner renders exactly 4 choice buttons,
 * so every sampled item must be multiple-choice with 4 choices and a
 * correctAnswer that matches one of the choice ids. Math `type: 'fill-in'`
 * items (no choices array) and malformed items are rejected here.
 * Passages, diagrams, and tables are allowed — the runner renders them.
 */
function isEligibleMC(item) {
  if (!item || typeof item !== 'object') return false;
  if (item.type && item.type !== 'multiple-choice') return false;
  if (!Array.isArray(item.choices) || item.choices.length !== 4) return false;
  const answer = item.correctAnswer;
  if (answer === undefined || answer === null || answer === '') return false;
  return item.choices.some((c) => c && String(c.id) === String(answer));
}

// ─── Pool picking with exhaustion fallbacks ─────────────────────────────────

// Primary skill key for stage-1 skill diversity. Math items carry `skills[]`,
// R&W items carry `skill` + `skills[]`; fall back to domain so an untagged item
// never silently collapses a whole domain into one bucket.
function getItemSkillKey(item) {
  if (Array.isArray(item.skills) && item.skills.length) return String(item.skills[0]);
  if (item.skill) return String(item.skill);
  if (item.skillId) return String(item.skillId);
  return `domain:${item.domain || 'unknown'}`;
}

/**
 * Take up to `count` items from an already-shuffled pool, walking fallback
 * phases in contract order: relax skill diversity first, then difficulty
 * preference, then excludeIds. `used` ids are never re-picked.
 *
 * With `diversifyKey` set (stage 1), earlier phases additionally avoid
 * repeating a key already chosen IN THIS CALL — so a 2-per-domain probe spans
 * two distinct skills when the bank allows, while difficulty preference still
 * wins (a same-skill medium is taken before an off-difficulty novel skill).
 * When `diversifyKey` is null the novel() guard is always true and the phase
 * list collapses to the original four — byte-identical behavior for the
 * stage-2 pool picks that don't pass it.
 */
function pickWithFallback(shuffled, count, { preferred, excluded, used, diversifyKey = null }) {
  const seenKeys = new Set();
  const novel = (q) => !diversifyKey || !seenKeys.has(diversifyKey(q));
  const phases = [
    (q) => preferred(q) && !excluded.has(q.id) && novel(q), // preferred difficulty, new skill
    (q) => preferred(q) && !excluded.has(q.id),             // preferred difficulty, any skill
    (q) => !excluded.has(q.id) && novel(q),                 // any difficulty, new skill
    (q) => !excluded.has(q.id),                             // any difficulty, any skill
    (q) => preferred(q) && excluded.has(q.id),              // excludeIds relaxed, preferred difficulty
    () => true,                                             // anything left
  ];
  const picks = [];
  const pickedIds = new Set();
  for (const phase of phases) {
    for (const q of shuffled) {
      if (picks.length >= count) return picks;
      if (used.has(q.id) || pickedIds.has(q.id)) continue;
      if (!phase(q)) continue;
      picks.push(q);
      pickedIds.add(q.id);
      if (diversifyKey) seenKeys.add(diversifyKey(q));
    }
  }
  return picks;
}

// ─── Section plan builder ────────────────────────────────────────────────────

function buildSectionPlan({ getQuestionsByDomain, domains, baseSeed, sectionKey, excludeIds }) {
  const excluded = new Set(excludeIds);
  const used = new Set();

  // One deterministic shuffle per domain; every later pick preserves this
  // order, so the whole plan is a pure function of (userId, attemptId).
  const perDomain = domains.map((domain) => ({
    domain,
    shuffled: seededShuffle(
      (getQuestionsByDomain(domain) || []).filter(isEligibleMC),
      (baseSeed + hashString(`${sectionKey}:${domain}`)) & 0x7fffffff,
    ),
  }));

  // Stage 1 — 2 medium-preferred items per domain, spanning 2 distinct skills
  // when the domain's bank allows (skill diversity sharpens the per-domain read
  // without changing the count or the medium preference).
  const stage1 = [];
  perDomain.forEach(({ shuffled }) => {
    const picks = pickWithFallback(shuffled, STAGE1_PER_DOMAIN, {
      preferred: (q) => q.difficulty === 'medium',
      excluded,
      used,
      diversifyKey: getItemSkillKey,
    });
    picks.forEach((q) => used.add(q.id));
    stage1.push(...picks);
  });

  // Count guarantee: if a domain is physically too thin (even after both
  // relaxations), backfill from the other domains' leftovers — never return
  // fewer than 8 while the section bank still has eligible items.
  if (stage1.length < STAGE1_PER_SECTION) {
    const leftovers = perDomain.flatMap(({ shuffled }) => shuffled);
    const backfill = pickWithFallback(leftovers, STAGE1_PER_SECTION - stage1.length, {
      preferred: (q) => q.difficulty === 'medium',
      excluded,
      used,
    });
    backfill.forEach((q) => used.add(q.id));
    stage1.push(...backfill);
  }

  // Stage 2 reserve pools — per domain, ~4 easy candidates and ~4 hard
  // candidates, disjoint from stage1, from each other, and from excludeIds
  // (excludeIds relaxed only on exhaustion, same contract as stage 1).
  // Reserve pools are also skill-diverse so stage 2 has more than one skill to
  // reach for when it deepens a weak domain (selectStage2 then prefers the
  // skills stage 1 didn't probe).
  const stage2Pools = {};
  perDomain.forEach(({ domain, shuffled }) => {
    const easier = pickWithFallback(shuffled, STAGE2_POOL_SIZE, {
      preferred: (q) => q.difficulty === 'easy',
      excluded,
      used,
      diversifyKey: getItemSkillKey,
    });
    easier.forEach((q) => used.add(q.id));
    const harder = pickWithFallback(shuffled, STAGE2_POOL_SIZE, {
      preferred: (q) => q.difficulty === 'hard',
      excluded,
      used,
      diversifyKey: getItemSkillKey,
    });
    harder.forEach((q) => used.add(q.id));
    stage2Pools[domain] = { easier, harder };
  });

  return { stage1, stage2Pools };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Build the full mini-diagnostic sampling plan for one attempt: a stratified
 * 8-item stage-1 set plus per-domain { easier, harder } stage-2 reserve
 * pools, for both sections. Deterministic for a given `${userId}:${attemptId}`
 * seed. Use it once at attempt start; pass the pools to `selectStage2` after
 * the 8th answer of each section.
 *
 * @param {object} args
 * @param {string} args.userId — seed component (stable per student)
 * @param {string} args.attemptId — seed component (new id per attempt re-rolls the items)
 * @param {string[]} [args.excludeIds] — question ids the student has already seen
 * @returns {Promise<{rw: {stage1: object[], stage2Pools: object}, math: {stage1: object[], stage2Pools: object}}>}
 */
export async function buildMiniDiagnosticPlan({ userId, attemptId, excludeIds = [] }) {
  // Same recreated pools as buildDiagnosticTest (this legacy path is the
  // diagnosticV2 flag-off rollback): math test bank + rwBank minus the
  // drill-only `rw-authored-*` fills.
  const [mathBank, rwBank] = await Promise.all([loadMathTestBank(), loadRWBank()]);
  const baseSeed = hashString(`${userId}:${attemptId}`);

  const rw = buildSectionPlan({
    getQuestionsByDomain: (domain) => (rwBank.getQuestionsByDomain(domain) || [])
      .filter((q) => !String(q.id).startsWith('rw-authored-')),
    domains: RW_DOMAIN_ORDER,
    baseSeed,
    sectionKey: 'rw',
    excludeIds,
  });
  const math = buildSectionPlan({
    getQuestionsByDomain: mathBank.getQuestionsByDomain,
    domains: MATH_DOMAIN_ORDER,
    baseSeed,
    sectionKey: 'math',
    excludeIds,
  });

  return { rw, math };
}

// Fixed tiebreak rank: canonical domains first (R&W then math order), then
// unknown domains after them (alphabetical via the comparator's last leg).
const domainRank = (domain) => {
  const i = CANONICAL_DOMAIN_ORDER.indexOf(domain);
  return i === -1 ? CANONICAL_DOMAIN_ORDER.length : i;
};

/**
 * Select the 4 stage-2 items for one section from the reserve pools, based
 * on stage-1 answers. Pure and deterministic: per-domain accuracy on the 8
 * stage-1 items picks the 2 weakest domains (tiebreak: lower accuracy, then
 * fewer correct, then fixed domain order); each gets 2 items from its
 * `easier` pool when accuracy <= 0.5, else from `harder`, falling back to
 * the other pool — then to the next-weakest domains' pools — on exhaustion.
 * Every probed domain still ends with >= 2 items total because stage 1
 * already placed 2 per domain and stage 2 only ever adds.
 *
 * @param {object[]} stage1Items — the section's 8 stage-1 items (as answered)
 * @param {Object<string, string>} answersById — item id -> chosen choice id
 * @param {Object<string, {easier: object[], harder: object[]}>} stage2Pools
 * @returns {object[]} exactly 4 items (fewer only if every pool is empty)
 */
export function selectStage2(stage1Items, answersById, stage2Pools) {
  const items = Array.isArray(stage1Items) ? stage1Items.filter(Boolean) : [];
  const answers = answersById || {};
  const pools = stage2Pools || {};

  // Per-domain stage-1 accuracy (unanswered counts as incorrect).
  const statsByDomain = new Map();
  items.forEach((item) => {
    const domain = item.domain || 'unknown';
    if (!statsByDomain.has(domain)) {
      statsByDomain.set(domain, { domain, correct: 0, total: 0 });
    }
    const s = statsByDomain.get(domain);
    s.total += 1;
    if (isAnswerCorrect(item, answers[item.id])) s.correct += 1;
  });

  const ranked = [...statsByDomain.values()]
    .map((s) => ({ ...s, accuracy: s.total > 0 ? s.correct / s.total : 0 }))
    .sort((a, b) =>
      (a.accuracy - b.accuracy) ||
      (a.correct - b.correct) ||
      (domainRank(a.domain) - domainRank(b.domain)) ||
      String(a.domain).localeCompare(String(b.domain)));

  const stage1Ids = new Set(items.map((i) => i.id));
  // Skills each domain already probed in stage 1. Stage 2 reaches for the
  // skills NOT in here first, so a deepened weak domain pinpoints WHICH skill
  // is the problem instead of re-asking one we already measured.
  const stage1SkillsByDomain = new Map();
  items.forEach((item) => {
    const d = item.domain || 'unknown';
    if (!stage1SkillsByDomain.has(d)) stage1SkillsByDomain.set(d, new Set());
    stage1SkillsByDomain.get(d).add(getItemSkillKey(item));
  });

  const picked = [];
  const pickedIds = new Set();

  // Take up to `max` items from a pool. With onlyNewSkill, skip items whose
  // skill the domain already probed (`seenSkills` grows as we pick, so the two
  // stage-2 items also differ from each other). Without it, take anything left.
  const takeFrom = (list, max, seenSkills, onlyNewSkill) => {
    let taken = 0;
    for (const q of (list || [])) {
      if (taken >= max) return taken;
      if (!q || pickedIds.has(q.id) || stage1Ids.has(q.id)) continue;
      if (onlyNewSkill && seenSkills && seenSkills.has(getItemSkillKey(q))) continue;
      picked.push(q);
      pickedIds.add(q.id);
      if (seenSkills) seenSkills.add(getItemSkillKey(q));
      taken += 1;
    }
    return taken;
  };

  const drawForDomain = (stat, want) => {
    if (want <= 0) return;
    const pool = pools[stat.domain] || {};
    const routeEasier = stat.accuracy <= EASIER_ROUTE_MAX_ACCURACY;
    const primary = routeEasier ? pool.easier : pool.harder;
    const secondary = routeEasier ? pool.harder : pool.easier;
    const seenSkills = new Set(stage1SkillsByDomain.get(stat.domain) || []);
    // 1. un-probed skills at the routed difficulty — best: a new skill, right level.
    let got = takeFrom(primary, want, seenSkills, true);
    // 2. reach the OTHER difficulty for a skill the routed pool can't field,
    //    capped so a weak domain keeps at least one at-level item. Some R&W
    //    skills (command-of-evidence, inference) barely exist as "easy" items,
    //    so this is the only way a weak reader gets probed on them at all —
    //    and mapping a new skill beats re-asking one stage 1 already measured.
    if (got < want) got += takeFrom(secondary, Math.min(want - got, CROSS_POOL_NEW_SKILL_REACH), seenSkills, true);
    // 3. fill the remainder at the routed difficulty (any skill).
    if (got < want) got += takeFrom(primary, want - got, seenSkills, false);
    // 4. last resort: the other pool, any skill.
    if (got < want) takeFrom(secondary, want - got, seenSkills, false);
  };

  // Primary pass: 2 items into each of the 2 weakest domains.
  ranked.slice(0, WEAK_DOMAINS_PROBED).forEach((stat) => {
    drawForDomain(stat, STAGE2_PER_DOMAIN);
  });

  // Exhaustion backfill: walk the remaining domains weakest-first until the
  // section's stage-2 count is met.
  for (const stat of ranked) {
    if (picked.length >= STAGE2_COUNT) break;
    drawForDomain(stat, STAGE2_COUNT - picked.length);
  }

  // Last resort: pools for domains that never appeared in stage 1 (only
  // reachable when stage-1 backfill collapsed a domain entirely).
  if (picked.length < STAGE2_COUNT) {
    Object.keys(pools)
      .sort((a, b) => (domainRank(a) - domainRank(b)) || a.localeCompare(b))
      .forEach((domain) => {
        if (picked.length >= STAGE2_COUNT) return;
        takeFrom(pools[domain].easier, STAGE2_COUNT - picked.length);
        takeFrom(pools[domain].harder, STAGE2_COUNT - picked.length);
      });
  }

  return picked;
}
