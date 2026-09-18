/**
 * buildDiagnosticTest.js — Diagnostic v2: builds a synthetic ADAPTIVE test
 * object that the real PracticeTest runner executes, replacing the custom
 * MiniDiagnosticShell experience (spec: gstack specs/20260813-*-diagnostic-v2).
 *
 * Full variant (first-ever diagnostic, ~56 min, "about half a real SAT"):
 *   R&W M1 (10Q/12min) → R&W M2 (10Q/12min) → Math M1 (10Q/16min) → Math M2
 *   (10Q/16min), with `rwModule2Easy` / `module2Easy` variant modules attached
 *   so the runner's own 60%-threshold routing serves an easier or harder
 *   second module per section — the exact machinery real practice tests use.
 *
 * Check-in variant (biweekly plan re-measure, ~25 min):
 *   R&W (10Q/12min) → Math (8Q/13min), no M2 routing, ~60% of slots weighted
 *   toward the plan's current focus skills.
 *
 * Sampling: per-module, 2 items per domain (stratified, skill-diverse) plus
 * coverage slots that reach for skills the diagnostic hasn't probed yet.
 * Math modules include up to MAX_FILLINS_PER_MODULE grid-ins (the runner
 * renders SPR natively — the old shell was MC-only). Every module draws from
 * one shared per-section `used` set, so no item repeats across M1/M2-easy/
 * M2-hard. Deterministic for a given `${userId}:${attemptId}` seed.
 *
 * Resume: the builder returns a `manifest` (item ids per module slot) that
 * the runner persists inside the in-progress record. `rebuildDiagnosticTest`
 * reconstructs the identical test object from the manifest — never
 * re-sampled, so saved `modIdx-qIdx` answers stay aligned. If any id has
 * left the bank, rebuild returns null and the caller starts fresh.
 *
 * Pools (diagnostic recreation, 2026-09-02): math draws from the
 * mathTestBank flatten of the 12 recreated practice-test bundles; R&W draws
 * from the bundle-fed rwBank minus its drill-only `rw-authored-*` fills. So
 * every question a diagnostic serves is recreated official-register content
 * with the production explanation scaffold. Rebuild falls back to the legacy
 * math drill bank for manifests persisted before the switch.
 *
 * Banks are reached ONLY through `data/corpusLoader.js` dynamic imports
 * (bundleGuard contract) — safe to import from App.jsx.
 */

import { loadMathBank, loadMathTestBank, loadRWBank } from '../../data/corpusLoader';

// Canonical domain orders — mirror sampler.js / practiceAssignmentService.js
// (private there; duplicated by the same bundle-isolation rationale).
export const MATH_DOMAIN_ORDER = ['algebra', 'problem-solving', 'advanced-math', 'geometry'];
export const RW_DOMAIN_ORDER = [
  'information-and-ideas',
  'craft-and-structure',
  'standard-english-conventions',
  'expression-of-ideas',
];

/**
 * The runner-facing test id. Deliberately 'mini-diagnostic': the in-progress
 * record key (inProgressTests['mini-diagnostic']) is what App.jsx's on-ramp
 * eligibility + resume guards already gate on, so v2 inherits resume
 * detection with zero App-side key changes.
 */
export const DIAGNOSTIC_TEST_ID = 'mini-diagnostic';

export const MANIFEST_VERSION = 1;

/** Grid-ins per MATH module, mirroring the real ~25% mix at 10-item scale. */
const MAX_FILLINS_PER_MODULE = 2;

/** Fraction of check-in slots weighted toward the plan's focus skills. */
const CHECKIN_FOCUS_FRACTION = 0.6;

const STRATIFIED_PER_DOMAIN = 2;

// Module shapes per variant. timeLimit is minutes (Timer initialMinutes) and
// tracks real Bluebook pace: R&W ~71s/item, Math ~96s/item.
const VARIANT_CONFIG = {
  full: {
    title: 'SEVA Diagnostic',
    rw: [
      { title: 'Reading and Writing Module 1', count: 10, timeLimit: 12, difficulty: 'medium' },
      { title: 'Reading and Writing Module 2', count: 10, timeLimit: 12, difficulty: 'hard' },
    ],
    rwEasy: { title: 'Reading and Writing Module 2', count: 10, timeLimit: 12, difficulty: 'easy' },
    math: [
      { title: 'Math Module 1', count: 10, timeLimit: 16, difficulty: 'medium' },
      { title: 'Math Module 2', count: 10, timeLimit: 16, difficulty: 'hard' },
    ],
    mathEasy: { title: 'Math Module 2', count: 10, timeLimit: 16, difficulty: 'easy' },
  },
  checkin: {
    title: 'SEVA Check-In',
    rw: [
      { title: 'Reading and Writing', count: 10, timeLimit: 12, difficulty: 'medium' },
    ],
    rwEasy: null,
    math: [
      { title: 'Math', count: 8, timeLimit: 13, difficulty: 'medium' },
    ],
    mathEasy: null,
  },
};

// ─── Deterministic helpers (same LCG/djb2 as sampler.js) ─────────────────────

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

/** 4-choice MC with a correctAnswer matching a choice id (sampler contract). */
function isEligibleMC(item) {
  if (!item || typeof item !== 'object') return false;
  if (item.type && item.type !== 'multiple-choice') return false;
  if (!Array.isArray(item.choices) || item.choices.length !== 4) return false;
  const answer = item.correctAnswer;
  if (answer === undefined || answer === null || answer === '') return false;
  return item.choices.some((c) => c && String(c.id) === String(answer));
}

/** Math grid-in: fill-in type with a non-empty correctAnswer. The runner's
 *  SPR input + canonical grader handle these natively (MiniDiagnosticShell
 *  couldn't, which is why the old sampler excluded them). */
function isEligibleFillIn(item) {
  if (!item || typeof item !== 'object') return false;
  if (item.type !== 'fill-in') return false;
  const answer = item.correctAnswer;
  return answer !== undefined && answer !== null && answer !== '';
}

/** Primary skill key for skill-diversity bookkeeping (sampler contract). */
function getItemSkillKey(item) {
  if (Array.isArray(item.skills) && item.skills.length) return String(item.skills[0]);
  if (item.skill) return String(item.skill);
  if (item.skillId) return String(item.skillId);
  return `domain:${item.domain || 'unknown'}`;
}

/** Every skill key an item carries (focus matching wants the full set). */
function getItemSkillKeys(item) {
  const keys = new Set();
  if (Array.isArray(item.skills)) item.skills.forEach((s) => s && keys.add(String(s)));
  if (item.skill) keys.add(String(item.skill));
  if (item.skillId) keys.add(String(item.skillId));
  return keys;
}

const DIFFICULTY_PREF = {
  medium: (q) => q.difficulty === 'medium',
  easy: (q) => q.difficulty === 'easy' || q.difficulty === 'medium',
  hard: (q) => q.difficulty === 'hard' || q.difficulty === 'medium',
};

/**
 * Take up to `count` items from a shuffled list, walking relaxation phases:
 * preferred difficulty + novel skill → preferred difficulty → novel skill →
 * anything not excluded → excludeIds relaxed. `used` ids are never re-picked.
 * `sectionSkills` (when given) biases early phases toward skills the section
 * hasn't probed yet, so coverage compounds across modules.
 */
function pick(shuffled, count, { preferred, excluded, used, sectionSkills = null }) {
  const novel = (q) => !sectionSkills || !sectionSkills.has(getItemSkillKey(q));
  const phases = [
    (q) => preferred(q) && !excluded.has(q.id) && novel(q),
    (q) => preferred(q) && !excluded.has(q.id),
    (q) => !excluded.has(q.id) && novel(q),
    (q) => !excluded.has(q.id),
    (q) => preferred(q),
    () => true,
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
      if (sectionSkills) sectionSkills.add(getItemSkillKey(q));
    }
  }
  return picks;
}

// ─── Module assembly ─────────────────────────────────────────────────────────

/** Items already in this module for a domain (fill-in tail ordering). */
const domainCountForFillins = (questions, domain) =>
  questions.filter((q) => q.domain === domain).length;

/**
 * Assemble one module's question list.
 *
 * Layout: STRATIFIED_PER_DOMAIN per domain (skill-diverse at the preferred
 * difficulty), then coverage slots walking domains round-robin reaching for
 * skills this SECTION hasn't probed yet. Math modules reserve up to
 * MAX_FILLINS_PER_MODULE coverage slots for grid-ins (appended last, like the
 * tail of a real module), falling back to MC when the fill-in pools are dry.
 * Check-in focus weighting happens before stratification: up to
 * `focusTarget` slots go to focus-skill items first, and the stratified pass
 * fills what remains.
 */
function buildModule({
  spec,
  perDomain,
  fillinsByDomain,
  used,
  excluded,
  sectionSkills,
  allowFillins,
  focusMatcher = null,
  focusTarget = 0,
}) {
  const preferred = DIFFICULTY_PREF[spec.difficulty] || DIFFICULTY_PREF.medium;
  const questions = [];

  // 1. Focus-skill slots (check-in only): walk every domain's list picking
  //    focus matches at the preferred difficulty, then any difficulty.
  if (focusMatcher && focusTarget > 0) {
    const allShuffled = perDomain.flatMap(({ shuffled }) => shuffled);
    const focusPool = allShuffled.filter((q) => focusMatcher(q));
    const picks = pick(focusPool, focusTarget, { preferred, excluded, used, sectionSkills });
    picks.forEach((q) => used.add(q.id));
    questions.push(...picks);
  }

  // 2. Stratified pass: 2 per domain (fewer if focus already filled slots).
  const focusCount = questions.length;
  const remainingAfterFocus = spec.count - focusCount;
  const fillinBudget = allowFillins ? Math.min(MAX_FILLINS_PER_MODULE, remainingAfterFocus) : 0;
  const mcTarget = remainingAfterFocus - fillinBudget;
  let mcPicked = 0;
  // Per-domain quota adapts to the slot count: a fixed 2-per-domain over a
  // 6-slot check-in module consumed everything on the first three domains
  // and NEVER served the fourth (geometry vanished from every check-in).
  // floor(target/domains) guarantees one lap over ALL domains first; the
  // coverage loop below distributes any remainder.
  const strataQuota = Math.max(1, Math.min(STRATIFIED_PER_DOMAIN, Math.floor(mcTarget / Math.max(1, perDomain.length))));
  perDomain.forEach(({ shuffled }) => {
    if (mcPicked >= mcTarget) return;
    const want = Math.min(strataQuota, mcTarget - mcPicked);
    const picks = pick(shuffled, want, { preferred, excluded, used, sectionSkills });
    picks.forEach((q) => used.add(q.id));
    mcPicked += picks.length;
    questions.push(...picks);
  });

  // 3. Coverage slots: fill remaining MC targets prioritizing domains with
  //    ZERO items in this module so far (focus picks + a small quota can
  //    leave a domain — geometry, in the founder-flagged case — entirely
  //    unrepresented; unrepresented-first closes that before round-robin).
  const domainCount = (domain) => questions.filter((q) => q.domain === domain).length;
  let guard = 0;
  while (mcPicked < mcTarget && guard < 40) {
    guard += 1;
    let progressed = false;
    const ordered = [...perDomain].sort((a, b) => domainCount(a.domain) - domainCount(b.domain));
    for (const { shuffled } of ordered) {
      if (mcPicked >= mcTarget) break;
      const picks = pick(shuffled, 1, { preferred, excluded, used, sectionSkills });
      if (picks.length) {
        used.add(picks[0].id);
        questions.push(picks[0]);
        mcPicked += 1;
        progressed = true;
      }
    }
    if (!progressed) break; // banks exhausted — ship what we have
  }

  // 4. Grid-in tail (math only): novel-skill fill-ins at the preferred
  //    difficulty, MC backfill when the fill-in pools can't field enough.
  if (fillinBudget > 0) {
    // Unrepresented domains first — the grid-in tail is the check-in's last
    // chance to field a domain the focus picks crowded out.
    const fillinAll = [...perDomain]
      .sort((a, b) => domainCountForFillins(questions, a.domain) - domainCountForFillins(questions, b.domain))
      .flatMap(({ domain }) => fillinsByDomain[domain] || []);
    const fills = pick(fillinAll, fillinBudget, { preferred, excluded, used, sectionSkills });
    fills.forEach((q) => used.add(q.id));
    questions.push(...fills);
    if (fills.length < fillinBudget) {
      const backfill = [];
      for (const { shuffled } of perDomain) {
        if (backfill.length >= fillinBudget - fills.length) break;
        const picks = pick(shuffled, fillinBudget - fills.length - backfill.length, {
          preferred, excluded, used, sectionSkills,
        });
        picks.forEach((q) => { used.add(q.id); backfill.push(q); });
      }
      questions.push(...backfill);
    }
  }

  return {
    title: spec.title,
    timeLimit: spec.timeLimit,
    questions,
  };
}

/** Deterministic per-domain shuffles for one section (MC + fill-in pools). */
function buildSectionPools({ getQuestionsByDomain, domains, baseSeed, sectionKey, allowFillins }) {
  const perDomain = domains.map((domain) => ({
    domain,
    shuffled: seededShuffle(
      (getQuestionsByDomain(domain) || []).filter(isEligibleMC),
      (baseSeed + hashString(`v2:${sectionKey}:${domain}`)) & 0x7fffffff,
    ),
  }));
  const fillinsByDomain = {};
  if (allowFillins) {
    domains.forEach((domain) => {
      fillinsByDomain[domain] = seededShuffle(
        (getQuestionsByDomain(domain) || []).filter(isEligibleFillIn),
        (baseSeed + hashString(`v2:fillin:${sectionKey}:${domain}`)) & 0x7fffffff,
      );
    });
  }
  return { perDomain, fillinsByDomain };
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Build the Diagnostic v2 synthetic test + resume manifest.
 *
 * @param {object} args
 * @param {string} args.userId — seed component (stable per student)
 * @param {string} args.attemptId — seed component (new id re-rolls the items)
 * @param {string[]} [args.excludeIds] — question ids the student has already seen
 * @param {'full'|'checkin'} [args.variant='full']
 * @param {string[]} [args.focusSkills] — plan focus skills (check-in weighting)
 * @returns {Promise<{test: object, manifest: object}>}
 */
export async function buildDiagnosticTest({
  userId,
  attemptId,
  excludeIds = [],
  variant = 'full',
  focusSkills = [],
}) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.full;
  // Diagnostic recreation (2026-09-02): every served item comes from the
  // recreated practice-test bundles — math via the mathTestBank flatten
  // (replacing the pre-recreation hand-authored drill bank), R&W via the
  // bundle-fed rwBank MINUS its drill-only `rw-authored-*` fills, which were
  // out of the recreation's scope. Drills keep their own banks.
  const [mathBank, rwBank] = await Promise.all([loadMathTestBank(), loadRWBank()]);
  const rwRecreatedByDomain = (domain) => (rwBank.getQuestionsByDomain(domain) || [])
    .filter((q) => !String(q.id).startsWith('rw-authored-'));
  const baseSeed = hashString(`${userId}:${attemptId}`);
  const excluded = new Set(excludeIds);

  const focusSet = new Set((focusSkills || []).map(String));
  const focusMatcher = focusSet.size > 0
    ? (q) => { for (const k of getItemSkillKeys(q)) { if (focusSet.has(k)) return true; } return false; }
    : null;

  const buildSection = ({ bank, domains, sectionKey, section, specs, easySpec, allowFillins }) => {
    const { perDomain, fillinsByDomain } = buildSectionPools({
      getQuestionsByDomain: bank.getQuestionsByDomain,
      domains,
      baseSeed,
      sectionKey,
      allowFillins,
    });
    const used = new Set();
    const sectionSkills = new Set();
    const useFocus = variant === 'checkin' && focusMatcher;
    const modules = specs.map((spec) => ({
      section,
      ...buildModule({
        spec,
        perDomain,
        fillinsByDomain,
        used,
        excluded,
        sectionSkills,
        allowFillins,
        focusMatcher: useFocus ? focusMatcher : null,
        focusTarget: useFocus ? Math.round(spec.count * CHECKIN_FOCUS_FRACTION) : 0,
      }),
    }));
    const easy = easySpec
      ? {
          section,
          ...buildModule({
            spec: easySpec,
            perDomain,
            fillinsByDomain,
            used,
            excluded,
            sectionSkills,
            allowFillins,
          }),
        }
      : null;
    return { modules, easy };
  };

  const rw = buildSection({
    bank: { getQuestionsByDomain: rwRecreatedByDomain },
    domains: RW_DOMAIN_ORDER,
    sectionKey: 'rw',
    section: 'reading-writing',
    specs: config.rw,
    easySpec: config.rwEasy,
    allowFillins: false,
  });
  const math = buildSection({
    bank: mathBank,
    domains: MATH_DOMAIN_ORDER,
    sectionKey: 'math',
    section: 'math',
    specs: config.math,
    easySpec: config.mathEasy,
    allowFillins: true,
  });

  const modules = [...rw.modules, ...math.modules];

  const test = {
    id: DIAGNOSTIC_TEST_ID,
    isDiagnostic: true,
    diagnosticVariant: variant,
    title: config.title,
    name: config.title,
    modules,
    ...(rw.easy ? { rwModule2Easy: rw.easy } : {}),
    ...(math.easy ? { module2Easy: math.easy } : {}),
  };

  const moduleManifest = (mod) => ({
    title: mod.title,
    section: mod.section,
    timeLimit: mod.timeLimit,
    itemIds: mod.questions.map((q) => q.id),
  });
  const manifest = {
    version: MANIFEST_VERSION,
    variant,
    testId: DIAGNOSTIC_TEST_ID,
    attemptId,
    modules: modules.map(moduleManifest),
    rwModule2Easy: rw.easy ? moduleManifest(rw.easy) : null,
    module2Easy: math.easy ? moduleManifest(math.easy) : null,
  };
  test.diagnosticManifest = manifest;

  return { test, manifest };
}

/**
 * Manifest for a sitting that only left behind its served item ids — the
 * lean `miniDiagnostic.itemIds` on records from before the per-attempt
 * snapshot existed (2026-08-24). finishMiniDiagnostic writes those ids as
 * the served R&W modules then the served Math modules, in module order and
 * with the routed Module 2 already in place, so slicing by the variant's
 * blueprint recovers the exact modules the student saw. Pure; feed the
 * result to `rebuildDiagnosticTest`.
 *
 * @param {object} args
 * @param {string} [args.variant='full'] - record.diagnosticVariant
 * @param {string[]} args.itemIds - record.itemIds (served order)
 * @returns {object|null} manifest, or null when the ids don't fill the blueprint
 */
export function manifestFromServedItemIds({ variant = 'full', itemIds } = {}) {
  if (!Array.isArray(itemIds) || itemIds.length === 0) return null;
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.full;
  const specs = [
    ...config.rw.map((spec) => ({ ...spec, section: 'reading-writing' })),
    ...config.math.map((spec) => ({ ...spec, section: 'math' })),
  ];
  const expected = specs.reduce((n, spec) => n + spec.count, 0);
  if (itemIds.length !== expected) return null;
  let cursor = 0;
  const modules = specs.map((spec) => {
    const ids = itemIds.slice(cursor, cursor + spec.count);
    cursor += spec.count;
    return { title: spec.title, section: spec.section, timeLimit: spec.timeLimit, itemIds: ids };
  });
  return {
    version: MANIFEST_VERSION,
    variant: VARIANT_CONFIG[variant] ? variant : 'full',
    testId: DIAGNOSTIC_TEST_ID,
    attemptId: null,
    modules,
    rwModule2Easy: null,
    module2Easy: null,
  };
}

/**
 * Reconstruct the exact synthetic test from a persisted manifest (resume
 * path). Returns null when the manifest is unusable or ANY item id has left
 * the banks — indices would shift and saved `modIdx-qIdx` answers would
 * grade against the wrong questions, so the caller must start fresh instead.
 *
 * @param {object} manifest — from buildDiagnosticTest / the in-progress record
 * @returns {Promise<object|null>}
 */
export async function rebuildDiagnosticTest(manifest) {
  if (!manifest || manifest.version !== MANIFEST_VERSION || !Array.isArray(manifest.modules)) {
    return null;
  }
  const [mathTestBank, rwBank] = await Promise.all([loadMathTestBank(), loadRWBank()]);

  // Manifests written before the diagnostic served recreated content
  // (2026-09-02) hold hand-authored drill-bank math ids. Load the legacy bank
  // only when such an id appears, so a mid-migration in-progress sitting still
  // resumes instead of restarting — new manifests never pay for the old chunk.
  const allManifestModules = [
    ...manifest.modules,
    ...(manifest.rwModule2Easy ? [manifest.rwModule2Easy] : []),
    ...(manifest.module2Easy ? [manifest.module2Easy] : []),
  ];
  const needsLegacyMath = allManifestModules.some((mod) => (
    mod && mod.section !== 'reading-writing' && Array.isArray(mod.itemIds)
      && mod.itemIds.some((id) => !mathTestBank.getQuestionById(id))
  ));
  const legacyMathBank = needsLegacyMath ? await loadMathBank() : null;

  const lookup = (section, id) => (
    section === 'reading-writing'
      ? rwBank.getQuestionById(id)
      : (mathTestBank.getQuestionById(id)
          || (legacyMathBank ? legacyMathBank.getQuestionById(id) : undefined))
  );

  const rebuildModule = (modManifest) => {
    if (!modManifest || !Array.isArray(modManifest.itemIds)) return null;
    const questions = [];
    for (const id of modManifest.itemIds) {
      const item = lookup(modManifest.section, id);
      if (!item) return null; // bank drift — abandon resume
      questions.push(item);
    }
    return {
      title: modManifest.title,
      section: modManifest.section,
      timeLimit: modManifest.timeLimit,
      questions,
    };
  };

  const modules = [];
  for (const modManifest of manifest.modules) {
    const mod = rebuildModule(modManifest);
    if (!mod) return null;
    modules.push(mod);
  }
  const rwEasy = manifest.rwModule2Easy ? rebuildModule(manifest.rwModule2Easy) : null;
  const mathEasy = manifest.module2Easy ? rebuildModule(manifest.module2Easy) : null;
  if (manifest.rwModule2Easy && !rwEasy) return null;
  if (manifest.module2Easy && !mathEasy) return null;

  const config = VARIANT_CONFIG[manifest.variant] || VARIANT_CONFIG.full;
  return {
    id: DIAGNOSTIC_TEST_ID,
    isDiagnostic: true,
    diagnosticVariant: manifest.variant,
    title: config.title,
    name: config.title,
    modules,
    ...(rwEasy ? { rwModule2Easy: rwEasy } : {}),
    ...(mathEasy ? { module2Easy: mathEasy } : {}),
    diagnosticManifest: manifest,
  };
}
