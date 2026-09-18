/**
 * Practice Assignment Service
 *
 * Deterministically assigns practice questions from the bank to a user's
 * study plan based on their diagnostic weak skills.  Produces both:
 *   - targetedQuestionIds  (flat ID list — legacy-compatible)
 *   - practiceAssignments  (structured per-week bundles with metadata)
 *
 * Selection priority: skill match → domain fallback → global fill.
 * Seeded shuffle keeps assignments stable within the same plan version
 * while rotating on every regeneration.
 */

import {
  getQuestionsBySkillIds,
  getQuestionsByDomain,
  getQuestionsBySatPatterns,
  getQuestionById as getMathQuestionById,
  DRILL_ROUTING_THRESHOLDS,
} from '../data/questions/bank';
import {
  getQuestionById as getRWQuestionById,
  getQuestionsBySkillIds as getRWQuestionsBySkillIds,
  getQuestionsByDomain as getRWQuestionsByDomain,
  getSkillSection,
} from '../data/questions/rwBank';

/**
 * Section-aware question resolver. R&W IDs are namespaced as
 * `rw-test{N}-...`; math IDs use bank-* / topic-* prefixes. This wrapper
 * picks the right bank so R&W focus area drill IDs resolve cleanly when
 * a study plan replays them.
 *
 * @param {string} id
 * @returns {object | null}
 */
function getQuestionById(id) {
  if (typeof id === 'string' && id.startsWith('rw-')) {
    return getRWQuestionById(id) || null;
  }
  return getMathQuestionById(id) || null;
}

// Exposed for the review queue's bank-item resolution (Phase 2 review feeding).
// Same math+R&W dispatch the assigned-drill resolver uses, so a missed drill
// item resolves back to the exact question regardless of bank.
export { getQuestionById as resolveQuestionById };

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_QUESTIONS_PER_WEEK = 10;
const MIN_TOTAL_QUESTIONS = 15;
const DEFAULT_DIFFICULTY_MIX = { easy: 0.30, medium: 0.45, hard: 0.25 };

// Math domain order — preserved as the legacy CANONICAL_DOMAINS export. Many
// callers were written when math was the only section and consume this name.
const DOMAIN_ORDER = ['algebra', 'problem-solving', 'advanced-math', 'geometry'];
export { DOMAIN_ORDER as CANONICAL_DOMAINS };

// R&W domain order — added in Day 1-2 of the Acely-parity batch (closes /autoplan
// Phase 3 hard merge blocker A1). The College Board canonical order is
// information-and-ideas → craft-and-structure → standard-english-conventions →
// expression-of-ideas.
const RW_DOMAIN_ORDER = [
  'information-and-ideas',
  'craft-and-structure',
  'standard-english-conventions',
  'expression-of-ideas',
];
export { RW_DOMAIN_ORDER };

/**
 * Section-aware accessor for the canonical domain order. Use this instead of
 * importing CANONICAL_DOMAINS directly when the caller knows which test section
 * the weakness lives in.
 *
 * @param {'math' | 'rw'} section
 * @returns {string[]}
 */
export function getCanonicalDomains(section) {
  return section === 'rw' ? [...RW_DOMAIN_ORDER] : [...DOMAIN_ORDER];
}

// ─── Section-aware bank resolver ──────────────────────────────────────────────
// The math and R&W banks expose the same selection surface, so a builder can
// stay section-agnostic by routing skill/domain lookups through bankFor(section).
// Math is the default; an unknown section falls back to math.
const SECTION_BANK = {
  math: { getQuestionsBySkillIds, getQuestionsByDomain, domainOrder: DOMAIN_ORDER },
  rw: {
    getQuestionsBySkillIds: getRWQuestionsBySkillIds,
    getQuestionsByDomain: getRWQuestionsByDomain,
    domainOrder: RW_DOMAIN_ORDER,
  },
};
const bankFor = (section) => SECTION_BANK[section === 'rw' ? 'rw' : 'math'];
const sectionForDomain = (domain) => (RW_DOMAIN_ORDER.includes(domain) ? 'rw' : 'math');

const DOMAIN_ALIAS_MAP = {
  // Math
  'algebra': 'algebra',
  'heart of algebra': 'algebra',
  'problem-solving': 'problem-solving',
  'problem solving': 'problem-solving',
  'problem solving and data analysis': 'problem-solving',
  'problem-solving-and-data-analysis': 'problem-solving',
  'advanced-math': 'advanced-math',
  'advanced math': 'advanced-math',
  'passport to advanced math': 'advanced-math',
  'passport-to-advanced-math': 'advanced-math',
  'geometry': 'geometry',
  'geometry & trigonometry': 'geometry',
  'geometry-and-trigonometry': 'geometry',
  'additional topics in math': 'geometry',
  // R&W
  'information-and-ideas': 'information-and-ideas',
  'information and ideas': 'information-and-ideas',
  'craft-and-structure': 'craft-and-structure',
  'craft and structure': 'craft-and-structure',
  'standard-english-conventions': 'standard-english-conventions',
  'standard english conventions': 'standard-english-conventions',
  'expression-of-ideas': 'expression-of-ideas',
  'expression of ideas': 'expression-of-ideas',
};

const ALL_CANONICAL_DOMAINS = [...DOMAIN_ORDER, ...RW_DOMAIN_ORDER];

export function normalizeDomain(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const key = raw.trim().toLowerCase();
  if (DOMAIN_ALIAS_MAP[key]) return DOMAIN_ALIAS_MAP[key];
  for (const canonical of ALL_CANONICAL_DOMAINS) {
    if (key.includes(canonical)) return canonical;
  }
  return null;
}

// ─── Deterministic seeded shuffle ────────────────────────────────────────────

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

// ─── Weak-skill payload builder ──────────────────────────────────────────────

/**
 * Build a normalised weak-skill payload from a diagnostic report.
 *
 * @param {Object} diagnostic  — output of diagnosticEngine.runDiagnostic()
 * @returns {{ skillId: string, domain: string, priority: number, errorType: string }[]}
 */
export function buildWeakSkillPayload(diagnostic) {
  if (!diagnostic?.skillAnalysis) return [];

  const weakSkills = diagnostic.skillAnalysis.weakSkills || [];

  return weakSkills
    .filter(s => s.skillId)
    .map(s => ({
      skillId: s.skillId,
      domain: s.domain || null,
      // Test subject, so the builders route each weakness to the right bank.
      // Prefer the diagnostic's own tag; derive from the skill id otherwise.
      section: s.section || getSkillSection(s.skillId),
      priority: 100 - (s.testAccuracy || 0),
      errorType: s.primaryErrorType || 'unknown',
    }))
    .sort((a, b) => b.priority - a.priority);
}

// ─── Core assignment logic ───────────────────────────────────────────────────

/**
 * Generate practice question assignments for a study plan.
 *
 * @param {Object}   opts
 * @param {Object}   opts.diagnostic         — runDiagnostic() output
 * @param {number}   opts.weekCount          — number of weeks in the plan
 * @param {string[]} opts.excludeIds         — IDs to skip (already completed)
 * @param {string}   opts.seed               — deterministic seed (userId + planTimestamp)
 * @param {number}   opts.questionsPerWeek   — per-week target (default 10)
 * @param {Object}   opts.difficultyMix      — { easy, medium, hard } fractions
 * @returns {{ targetedQuestionIds: string[], practiceAssignments: Object[] }}
 */
export function generatePracticeAssignments({
  diagnostic,
  weekCount = 4,
  excludeIds = [],
  seed = '',
  questionsPerWeek = DEFAULT_QUESTIONS_PER_WEEK,
  difficultyMix = DEFAULT_DIFFICULTY_MIX,
} = {}) {
  const weakPayload = buildWeakSkillPayload(diagnostic);
  const numericSeed = hashString(seed || new Date().toISOString());

  const totalNeeded = Math.max(MIN_TOTAL_QUESTIONS, weekCount * questionsPerWeek);
  const usedIds = new Set(excludeIds);

  // Sections present in the weaknesses, math first. A math-only plan runs a
  // single math pass at seed offset 0 — byte-identical to the pre-R&W behavior;
  // a mixed plan also draws R&W items from the R&W bank.
  const sectionsWithWeakness = ['math', 'rw'].filter(sec => weakPayload.some(w => w.section === sec));
  const activeSections = sectionsWithWeakness.length > 0 ? sectionsWithWeakness : ['math'];
  // Split the budget across sections so a mixed plan can't let math starve R&W.
  // For a single (math) section this equals totalNeeded — byte-identical.
  const perSectionTarget = Math.ceil(totalNeeded / activeSections.length);

  // Phase 1 + 2 — skill-targeted + weak-domain fallback, per section, per bank.
  let pool = [];
  for (const sec of activeSections) {
    if (pool.length >= totalNeeded) break;
    const secPool = selectSectionPool({
      section: sec,
      payload: weakPayload.filter(w => w.section === sec),
      targetCount: perSectionTarget,
      numericSeed,
      usedIds,
      difficultyMix,
    });
    pool.push(...secPool);
  }

  // Phase 3 — global fill: round-robin across the present sections' domains.
  if (pool.length < MIN_TOTAL_QUESTIONS) {
    for (const sec of activeSections) {
      const bank = bankFor(sec);
      const fillSeed = numericSeed + 999 + (sec === 'rw' ? 500 : 0);
      for (const domain of bank.domainOrder) {
        if (pool.length >= MIN_TOTAL_QUESTIONS) break;
        const extras = bank.getQuestionsByDomain(domain, { excludeIds: [...usedIds] }).filter(isMCQGlobal);
        const shuffled = seededShuffle(extras, fillSeed);
        const batch = shuffled.slice(0, Math.max(3, MIN_TOTAL_QUESTIONS - pool.length));
        for (const q of batch) { pool.push(q); usedIds.add(q.id); }
      }
    }
  }

  // Deterministic final shuffle
  pool = seededShuffle(pool, numericSeed);

  // Partition into per-week bundles
  const assignments = [];
  for (let w = 0; w < weekCount; w++) {
    const start = w * questionsPerWeek;
    const weekQuestions = pool.slice(start, start + questionsPerWeek);
    if (weekQuestions.length === 0) continue;

    const byDomain = {};
    weekQuestions.forEach(q => {
      byDomain[q.domain] = (byDomain[q.domain] || 0) + 1;
    });

    assignments.push({
      weekNumber: w + 1,
      questionIds: weekQuestions.map(q => q.id),
      count: weekQuestions.length,
      domainBreakdown: byDomain,
      difficultyBreakdown: {
        easy: weekQuestions.filter(q => q.difficulty === 'easy').length,
        medium: weekQuestions.filter(q => q.difficulty === 'medium').length,
        hard: weekQuestions.filter(q => q.difficulty === 'hard').length,
      },
    });
  }

  const allIds = pool.map(q => q.id);

  return {
    targetedQuestionIds: allIds,
    practiceAssignments: assignments,
    summary: {
      totalAssigned: allIds.length,
      weekCount: assignments.length,
      selectionPhases: {
        skillTargeted: Math.min(pool.length, totalNeeded),
        domainFallback: 0,
        globalFill: 0,
      },
    },
  };
}

/**
 * Resolve a list of persisted question IDs back to full question objects,
 * filtering out any IDs that no longer exist in the bank.
 */
export function resolveAssignedQuestions(questionIds) {
  if (!Array.isArray(questionIds)) return { resolved: [], staleCount: 0 };

  const resolved = [];
  let staleCount = 0;

  for (const id of questionIds) {
    const q = getQuestionById(id);
    if (q) {
      resolved.push(q);
    } else {
      staleCount++;
    }
  }

  return { resolved, staleCount };
}

// ═══════════════════════════════════════════════════════════════════════════
// Adaptive Practice Queue Engine (Acely-style)
//
// Instead of pre-assigned fixed bundles, the queue selects the next question
// dynamically based on the student's in-session performance.  Difficulty
// steps up after consecutive correct answers and down after misses.
// Missed questions are reinserted later in the queue for spaced retry.
// ═══════════════════════════════════════════════════════════════════════════

const DIFFICULTY_LADDER = ['easy', 'medium', 'hard'];
const DEFAULT_SESSION_LENGTH = 15;
const DEFAULT_MIN_MASTERY_PERCENT = 80;
const STREAK_THRESHOLD_UP = 2;
const STREAK_THRESHOLD_DOWN = 1;
const RETRY_GAP = 4;

const isMCQGlobal = q => Array.isArray(q.choices) && q.choices.length >= 2;

/**
 * Select a deterministic MCQ pool for ONE section's weaknesses, using that
 * section's bank + domain order so math and R&W never cross-contaminate.
 * Runs the same two-phase cascade the builders used before R&W existed:
 * skill-targeted (Phase 1) then weak-domain fallback (Phase 2). Math uses seed
 * offset 0, so a math-only plan is byte-identical to the pre-R&W behavior;
 * R&W uses a fixed offset to stay deterministic yet distinct from math.
 *
 * @param {Object} opts
 * @param {('math'|'rw')} opts.section
 * @param {Array} opts.payload - weak-skill payload entries for THIS section
 * @param {number} opts.targetCount - pool size target
 * @param {number} opts.numericSeed
 * @param {Set<string>} opts.usedIds - shared dedup set, mutated in place
 * @param {Object|null} opts.difficultyMix - { easy, medium, hard } or null for a flat slice
 * @returns {object[]} selected question objects
 */
function selectSectionPool({ section, payload, targetCount, numericSeed, usedIds, difficultyMix }) {
  const bank = bankFor(section);
  const offset = section === 'rw' ? 500 : 0;
  let pool = [];

  // Phase 1 — skill-targeted
  if (payload.length > 0) {
    const skillIds = payload.map(w => w.skillId);
    const candidates = bank.getQuestionsBySkillIds(skillIds, { excludeIds: [...usedIds] }).filter(isMCQGlobal);
    const shuffled = seededShuffle(candidates, numericSeed + offset);

    if (difficultyMix) {
      const easy = shuffled.filter(q => q.difficulty === 'easy')
        .slice(0, Math.ceil(targetCount * (difficultyMix.easy || 0.3)));
      const medium = shuffled.filter(q => q.difficulty === 'medium')
        .slice(0, Math.ceil(targetCount * (difficultyMix.medium || 0.45)));
      const hard = shuffled.filter(q => q.difficulty === 'hard')
        .slice(0, Math.ceil(targetCount * (difficultyMix.hard || 0.25)));
      pool = seededShuffle([...easy, ...medium, ...hard], numericSeed + offset + 1);
    } else {
      pool = shuffled.slice(0, targetCount);
    }
  }
  pool.forEach(q => usedIds.add(q.id));

  // Phase 2 — weak-domain fallback
  if (pool.length < targetCount) {
    const weakDomains = [...new Set(payload.map(w => w.domain).filter(Boolean))];
    for (const domain of weakDomains) {
      if (pool.length >= targetCount) break;
      const extras = bank.getQuestionsByDomain(domain, { excludeIds: [...usedIds] }).filter(isMCQGlobal);
      const shuffled = seededShuffle(extras, numericSeed + offset + domain.length);
      const batch = shuffled.slice(0, targetCount - pool.length);
      batch.forEach(q => { pool.push(q); usedIds.add(q.id); });
    }
  }

  return pool;
}

/**
 * Build the initial adaptive queue seed from diagnostic weak-skill signals.
 * Stored in the plan artifact so sessions can be bootstrapped deterministically.
 */
export function buildAdaptiveQueueSeed({
  diagnostic,
  seed = '',
  poolSize = 80,
  excludeIds = [],
} = {}) {
  const weakPayload = buildWeakSkillPayload(diagnostic);
  const numericSeed = hashString(seed || new Date().toISOString());
  const usedIds = new Set(excludeIds);
  let pool = [];

  // Math-first section order; math-only plans run a single math pass at seed
  // offset 0 (byte-identical to the pre-R&W behavior).
  const sectionsWithWeakness = ['math', 'rw'].filter(sec => weakPayload.some(w => w.section === sec));
  const activeSections = sectionsWithWeakness.length > 0 ? sectionsWithWeakness : ['math'];
  // Split the pool across sections so a mixed plan represents both. For a single
  // (math) section this equals poolSize — byte-identical to the pre-R&W seed.
  const perSectionTarget = Math.ceil(poolSize / activeSections.length);

  // Phase 1 + 2 — skill-targeted + weak-domain fallback, per section, per bank.
  for (const sec of activeSections) {
    if (pool.length >= poolSize) break;
    const secPool = selectSectionPool({
      section: sec,
      payload: weakPayload.filter(w => w.section === sec),
      targetCount: perSectionTarget,
      numericSeed,
      usedIds,
      difficultyMix: null,
    });
    pool.push(...secPool);
  }

  // Phase 3 — global fill across the present sections' domains
  if (pool.length < 20) {
    for (const sec of activeSections) {
      const bank = bankFor(sec);
      const fillSeed = numericSeed + 999 + (sec === 'rw' ? 500 : 0);
      for (const domain of bank.domainOrder) {
        if (pool.length >= poolSize) break;
        const extras = bank.getQuestionsByDomain(domain, { excludeIds: [...usedIds] }).filter(isMCQGlobal);
        const batch = seededShuffle(extras, fillSeed).slice(0, Math.max(5, poolSize - pool.length));
        batch.forEach(q => { pool.push(q); usedIds.add(q.id); });
      }
    }
  }

  // Organise by difficulty for the queue engine
  const byDifficulty = { easy: [], medium: [], hard: [] };
  pool.forEach(q => {
    const d = q.difficulty || 'medium';
    if (byDifficulty[d]) byDifficulty[d].push(q.id);
    else byDifficulty.medium.push(q.id);
  });

  // Shuffle each difficulty bucket
  Object.keys(byDifficulty).forEach(d => {
    byDifficulty[d] = seededShuffle(byDifficulty[d], numericSeed + d.length);
  });

  const weakSkillIds = weakPayload.map(w => w.skillId);
  const weakDomains = [...new Set(weakPayload.map(w => w.domain).filter(Boolean))];

  return {
    poolIds: pool.map(q => q.id),
    byDifficulty,
    weakSkillIds,
    weakDomains,
    sessionLength: DEFAULT_SESSION_LENGTH,
    targetQuestions: DEFAULT_SESSION_LENGTH,
    minMasteryPercent: DEFAULT_MIN_MASTERY_PERCENT,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Build an adaptive queue seed focused on a single domain.
 * Domain questions fill first, then broader pool as fallback.
 * Deterministic, MCQ-only, same shape as buildAdaptiveQueueSeed.
 *
 * @param {Array} [opts.weaknesses] — optional weakness objects with
 *   `missedPatterns` (Phase 2 routing). When provided, the seed BIASES
 *   the pool toward pattern-matched items first (Tier 1 routing parity
 *   with the assigned drill flow). Falls back to plain domain shuffle
 *   when weaknesses don't include missedPatterns or pattern pools are
 *   too thin. Filter your weaknesses array to math+domain BEFORE passing.
 *   `getWeaknessesByDomain(plan, enforcedDomain)` would do this cleanly
 *   but is currently implicit at the call site (App.jsx).
 */
export function buildDomainAdaptiveQueueSeed({
  enforcedDomain,
  existingPoolIds = [],
  seed = '',
  poolSize = 60,
  weaknesses = [],
} = {}) {
  if (!enforcedDomain) return null;

  const numericSeed = hashString(seed || enforcedDomain);
  // Route to the right bank by the enforced domain's section. R&W has no SAT
  // Pattern signal, so the Tier-1 pattern bias below is gated to math.
  const section = sectionForDomain(enforcedDomain);
  const bank = bankFor(section);
  const usedIds = new Set();
  let pool = [];

  // ── Tier-1 BIAS (Phase 2 parity with AssignedPracticeShell) ──
  // Collect missedPatterns from weaknesses, prefer items matching them
  // at the FRONT of the pool. Only kicks in when the pattern pool meets
  // the same TIER1_PATTERN threshold the cascade uses for assigned drills.
  // Otherwise the pool falls through to plain domain shuffle below.
  const missedPatterns = Array.isArray(weaknesses)
    ? [...new Set(
        weaknesses
          .filter(w => w && (!w.domain || w.domain === enforcedDomain))
          .flatMap(w => Array.isArray(w.missedPatterns) ? w.missedPatterns : []),
      )]
    : [];

  if (section === 'math' && missedPatterns.length > 0) {
    const patternPool = getQuestionsBySatPatterns(missedPatterns, {
      excludeIds: [],
    }).filter(isMCQGlobal).filter(q => q.domain === enforcedDomain);
    if (patternPool.length >= DRILL_ROUTING_THRESHOLDS.TIER1_PATTERN) {
      const patternShuffled = seededShuffle(patternPool, numericSeed + 1);
      // Reserve up to half the pool for pattern-matched items (caps the
      // bias — student still gets domain breadth, not a single-pattern
      // tunnel). The other half is plain-domain MCQs.
      const patternQuota = Math.min(patternShuffled.length, Math.floor(poolSize / 2));
      const patternPicks = patternShuffled.slice(0, patternQuota);
      patternPicks.forEach(q => {
        pool.push(q);
        usedIds.add(q.id);
      });
    }
  }

  // ── Plain domain fill ──
  const domainCandidates = bank.getQuestionsByDomain(enforcedDomain, {
    excludeIds: [...usedIds],
  }).filter(isMCQGlobal);
  const shuffled = seededShuffle(domainCandidates, numericSeed);
  const remaining = poolSize - pool.length;
  const domainBatch = shuffled.slice(0, remaining);
  domainBatch.forEach(q => {
    pool.push(q);
    usedIds.add(q.id);
  });

  // ── Cross-domain fallback only when pool is still thin ──
  if (pool.length < 20) {
    for (const domain of bank.domainOrder) {
      if (domain === enforcedDomain || pool.length >= poolSize) continue;
      const extras = bank.getQuestionsByDomain(domain, { excludeIds: [...usedIds] }).filter(isMCQGlobal);
      const batch = seededShuffle(extras, numericSeed + domain.length).slice(0, poolSize - pool.length);
      batch.forEach(q => { pool.push(q); usedIds.add(q.id); });
    }
  }

  const byDifficulty = { easy: [], medium: [], hard: [] };
  pool.forEach(q => {
    const d = q.difficulty || 'medium';
    if (byDifficulty[d]) byDifficulty[d].push(q.id);
    else byDifficulty.medium.push(q.id);
  });
  Object.keys(byDifficulty).forEach(d => {
    byDifficulty[d] = seededShuffle(byDifficulty[d], numericSeed + d.length);
  });

  return {
    poolIds: pool.map(q => q.id),
    byDifficulty,
    weakSkillIds: [],
    weakDomains: [enforcedDomain],
    enforcedDomain,
    // Surface the missedPatterns the seed was biased toward, so the
    // adaptive shell can show a "Practicing: <patterns>" chip (UI parity
    // with AssignedPracticeShell).
    missedPatterns,
    sessionLength: DEFAULT_SESSION_LENGTH,
    targetQuestions: DEFAULT_SESSION_LENGTH,
    minMasteryPercent: DEFAULT_MIN_MASTERY_PERCENT,
    createdAt: new Date().toISOString(),
  };
}

/**
 * buildAdaptiveSeedFromIds — build an adaptive queue seed from an EXPLICIT
 * question-id pool (e.g. every question that lives under one Practice Bank
 * topic, across all of that topic's question types). Unlike
 * buildDomainAdaptiveQueueSeed this doesn't re-query a bank by domain — the
 * caller already knows exactly which items belong in the round; we just
 * resolve, MCQ-filter, shuffle, and bin them by difficulty so the adaptive
 * engine can ladder up/down on performance.
 *
 * This is what makes a Practice Bank topic round adaptive AND type-inclusive:
 * the pool is the union of the topic's types, and difficulty (not a fixed
 * list) drives what the student sees next.
 *
 * @param {Object}   args
 * @param {string[]} args.ids          — candidate question ids (a topic's qids)
 * @param {string}   [args.seed='']    — deterministic shuffle seed
 * @param {string}   [args.label=null] — display label for the round
 * @param {string[]} [args.weakDomains=[]] — domain(s) the topic belongs to
 * @param {number}   [args.poolSize=60] — cap on pool size
 * @returns {Object|null} queueSeed (same shape as buildDomainAdaptiveQueueSeed) or null if empty
 */
export function buildAdaptiveSeedFromIds({
  ids = [],
  seed = '',
  label = null,
  weakDomains = [],
  poolSize = 60,
} = {}) {
  const numericSeed = hashString(seed || `${label || ''}:${ids.length}`);

  const seen = new Set();
  const pool = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    const q = getQuestionById(id);
    if (q && isMCQGlobal(q)) { seen.add(id); pool.push(q); }
  }
  if (pool.length === 0) return null;

  const shuffled = seededShuffle(pool, numericSeed).slice(0, poolSize);

  const byDifficulty = { easy: [], medium: [], hard: [] };
  shuffled.forEach(q => {
    const d = q.difficulty || 'medium';
    if (byDifficulty[d]) byDifficulty[d].push(q.id);
    else byDifficulty.medium.push(q.id);
  });
  Object.keys(byDifficulty).forEach(d => {
    byDifficulty[d] = seededShuffle(byDifficulty[d], numericSeed + d.length);
  });

  return {
    poolIds: shuffled.map(q => q.id),
    byDifficulty,
    weakSkillIds: [],
    weakDomains,
    enforcedDomain: null,
    missedPatterns: [],
    sessionLength: DEFAULT_SESSION_LENGTH,
    targetQuestions: DEFAULT_SESSION_LENGTH,
    minMasteryPercent: DEFAULT_MIN_MASTERY_PERCENT,
    createdAt: new Date().toISOString(),
    topicLabel: label || null,
  };
}

// ─── Fixed domain assignments for Strengths & Focus Areas ─────────────────

const DEFAULT_DOMAIN_ASSIGN_COUNT = 10;

/**
 * Build fixed MCQ question ID bundles per canonical domain for the
 * Strengths & Focus Areas section.  Each domain gets a deterministic
 * set of MCQ-only question IDs persisted in the plan artifact.
 *
 * @param {Object}   opts
 * @param {Object}   opts.diagnostic  — runDiagnostic() output
 * @param {string}   opts.seed        — deterministic seed
 * @param {number}   opts.countPerDomain — questions per domain (default 10)
 * @param {string[]} opts.excludeIds  — IDs to skip
 * @returns {Object} keyed by canonical domain, value = { domain, questionIds, count, source }
 */
export function buildStrengthFocusAssignments({
  diagnostic,
  seed = '',
  countPerDomain = DEFAULT_DOMAIN_ASSIGN_COUNT,
  excludeIds = [],
} = {}) {
  const weakPayload = buildWeakSkillPayload(diagnostic);
  const numericSeed = hashString(seed || 'domain-assign');
  const weakDomains = new Set(weakPayload.map(w => normalizeDomain(w.domain)).filter(Boolean));

  const result = {};
  const globalUsed = new Set(excludeIds);

  // Math domains first (DOMAIN_ORDER), then R&W. Math output is byte-identical
  // to the pre-R&W behavior (same order, same globalUsed progression — R&W
  // items are disjoint and selected after); R&W domains add their own bundles.
  for (const domain of ALL_CANONICAL_DOMAINS) {
    const isWeak = weakDomains.has(domain);
    const source = isWeak ? 'focus' : 'strength';

    const bank = bankFor(sectionForDomain(domain));
    const candidates = bank.getQuestionsByDomain(domain, { excludeIds: [...globalUsed] }).filter(isMCQGlobal);
    const shuffled = seededShuffle(candidates, numericSeed + hashString(domain));
    const picked = shuffled.slice(0, countPerDomain);
    picked.forEach(q => globalUsed.add(q.id));

    result[domain] = {
      domain,
      questionIds: picked.map(q => q.id),
      count: picked.length,
      source,
    };
  }

  return result;
}

/**
 * Return a small deterministic preview of MCQ questions for a domain.
 * Used by the UI to show concrete assigned questions under each domain.
 */
export function getDomainAssignmentPreview(domain, { seed = '', count = 3 } = {}) {
  const canonical = normalizeDomain(domain);
  if (!canonical) return { domain: null, questions: [], total: 0 };

  const numericSeed = hashString(seed || canonical);
  const candidates = getQuestionsByDomain(canonical, { excludeIds: [] }).filter(isMCQGlobal);
  const shuffled = seededShuffle(candidates, numericSeed);

  return {
    domain: canonical,
    questions: shuffled.slice(0, count),
    total: candidates.length,
  };
}

/**
 * Create a fresh adaptive session state (stored in-memory during a session,
 * persisted for resume across page loads).
 */
export function createAdaptiveSessionState(queueSeed) {
  return {
    cursor: 0,
    currentDifficulty: 'easy',
    streak: 0,
    answered: [],
    correct: 0,
    incorrect: 0,
    retryQueue: [],
    seenIds: new Set(),
    sessionLength: queueSeed?.sessionLength || DEFAULT_SESSION_LENGTH,
    targetQuestions: queueSeed?.targetQuestions || DEFAULT_SESSION_LENGTH,
    minMasteryPercent: queueSeed?.minMasteryPercent || DEFAULT_MIN_MASTERY_PERCENT,
    sessionsCompleted: 0,
    isCompleted: false,
    completedAt: null,
  };
}

/**
 * Evaluate whether adaptive assignment is complete.
 * Both conditions must be met:
 *   1. answered >= targetQuestions
 *   2. mastery percent >= minMasteryPercent
 */
export function evaluateAdaptiveCompletion(sessionState) {
  if (!sessionState) return { isComplete: false, mastery: 0, answeredCount: 0, meetsTarget: false, meetsMastery: false };

  const answeredCount = sessionState.answered?.length || 0;
  const correctCount = sessionState.correct || 0;
  const mastery = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const target = sessionState.targetQuestions || DEFAULT_SESSION_LENGTH;
  const minMastery = sessionState.minMasteryPercent || DEFAULT_MIN_MASTERY_PERCENT;

  const meetsTarget = answeredCount >= target;
  const meetsMastery = mastery >= minMastery;

  return {
    isComplete: meetsTarget && meetsMastery,
    mastery,
    answeredCount,
    targetQuestions: target,
    minMasteryPercent: minMastery,
    meetsTarget,
    meetsMastery,
  };
}

/**
 * Pick the next question from the adaptive queue based on session state.
 * Returns { question, isRetry, isComplete } — when the session target is
 * reached, isComplete is true and question is null.
 */
export function getNextAdaptiveQuestion(queueSeed, sessionState) {
  if (!queueSeed || !sessionState) return { question: null, isRetry: false, isComplete: true };

  const totalAnswered = sessionState.answered.length;
  if (totalAnswered >= sessionState.sessionLength && sessionState.retryQueue.length === 0) {
    return { question: null, isRetry: false, isComplete: true };
  }

  // Priority: serve retry questions when due
  if (sessionState.retryQueue.length > 0) {
    const retryEntry = sessionState.retryQueue[0];
    if (totalAnswered >= retryEntry.serveAt) {
      const q = getQuestionById(retryEntry.id);
      if (q && isMCQGlobal(q)) {
        return { question: q, isRetry: true, isComplete: false };
      }
      // Stale retry — drop it and recurse WITHOUT mutating the caller's state.
      // getNextAdaptiveQuestion is also used as a read-only probe (App.jsx
      // resume + completion checks), so an in-place retryQueue.shift() here
      // would silently corrupt the caller's session. Recurse on a pruned copy.
      const pruned = { ...sessionState, retryQueue: sessionState.retryQueue.slice(1) };
      return getNextAdaptiveQuestion(queueSeed, pruned);
    }
  }

  if (totalAnswered >= sessionState.sessionLength) {
    // Only retries remain but not yet due — session is effectively complete
    if (sessionState.retryQueue.length > 0) {
      const nextRetry = sessionState.retryQueue[0];
      const q = getQuestionById(nextRetry.id);
      if (q && isMCQGlobal(q)) {
        return { question: q, isRetry: true, isComplete: false };
      }
    }
    return { question: null, isRetry: false, isComplete: true };
  }

  // Normal pick: use current difficulty bucket
  const diff = sessionState.currentDifficulty;
  const bucket = queueSeed.byDifficulty[diff] || [];
  for (const id of bucket) {
    if (!sessionState.seenIds.has(id)) {
      const q = getQuestionById(id);
      if (q && isMCQGlobal(q)) {
        return { question: q, isRetry: false, isComplete: false };
      }
    }
  }

  // Fallback: try adjacent difficulties
  for (const fallbackDiff of DIFFICULTY_LADDER) {
    if (fallbackDiff === diff) continue;
    const fb = queueSeed.byDifficulty[fallbackDiff] || [];
    for (const id of fb) {
      if (!sessionState.seenIds.has(id)) {
        const q = getQuestionById(id);
        if (q && isMCQGlobal(q)) {
          return { question: q, isRetry: false, isComplete: false };
        }
      }
    }
  }

  return { question: null, isRetry: false, isComplete: true };
}

/**
 * Record a student's answer and update adaptive session state.
 * Adjusts difficulty ladder and schedules missed questions for retry.
 */
export function applyAdaptiveResult(sessionState, questionId, isCorrect, isRetry = false) {
  const next = { ...sessionState, seenIds: new Set(sessionState.seenIds) };

  next.answered = [...next.answered, { id: questionId, correct: isCorrect, isRetry }];
  next.seenIds.add(questionId);

  if (isRetry) {
    next.retryQueue = next.retryQueue.filter(r => r.id !== questionId);
  }

  if (isCorrect) {
    next.correct++;
    next.streak = (next.streak >= 0 ? next.streak + 1 : 1);

    if (next.streak >= STREAK_THRESHOLD_UP) {
      const idx = DIFFICULTY_LADDER.indexOf(next.currentDifficulty);
      if (idx < DIFFICULTY_LADDER.length - 1) {
        next.currentDifficulty = DIFFICULTY_LADDER[idx + 1];
        next.streak = 0;
      }
    }
  } else {
    next.incorrect++;
    next.streak = (next.streak <= 0 ? next.streak - 1 : -1);

    if (Math.abs(next.streak) >= STREAK_THRESHOLD_DOWN) {
      const idx = DIFFICULTY_LADDER.indexOf(next.currentDifficulty);
      if (idx > 0) {
        next.currentDifficulty = DIFFICULTY_LADDER[idx - 1];
        next.streak = 0;
      }
    }

    // Schedule retry for missed question
    if (!isRetry) {
      const serveAt = next.answered.length + RETRY_GAP;
      next.retryQueue = [...next.retryQueue, { id: questionId, serveAt }];
    }
  }

  return next;
}

/**
 * Serialize adaptive session state for persistence (Sets -> Arrays).
 */
export function serializeAdaptiveState(state) {
  if (!state) return null;
  return {
    ...state,
    seenIds: [...state.seenIds],
  };
}

/**
 * Deserialize persisted adaptive state back to runtime format.
 */
export function deserializeAdaptiveState(raw) {
  if (!raw) return null;
  return {
    ...raw,
    seenIds: new Set(raw.seenIds || []),
    retryQueue: raw.retryQueue || [],
    answered: raw.answered || [],
    sessionsCompleted: raw.sessionsCompleted || 0,
    isCompleted: raw.isCompleted || false,
    completedAt: raw.completedAt || null,
    targetQuestions: raw.targetQuestions || DEFAULT_SESSION_LENGTH,
    minMasteryPercent: raw.minMasteryPercent || DEFAULT_MIN_MASTERY_PERCENT,
  };
}
