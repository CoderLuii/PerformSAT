#!/usr/bin/env node
/**
 * R&W bank lint script — implements the rubric in
 * docs/CB_RW_AUTHENTICITY_RUBRIC.md §8 (lint spec) and §9 (bank invariants).
 *
 * Mirrors scripts/calibrateModule.mjs (Math) but R&W-specific. Reuses
 * tokenize() / checkUniqueness() / loadPdfCorpus() / indexCorpus() from the
 * Math lint and adds R&W-specific checks (stem registry, entity registry,
 * passage skeletons, distractor non-words, etc.).
 *
 * Usage:
 *   node scripts/validateRWBank.mjs --test=1
 *   node scripts/validateRWBank.mjs --all
 *   node scripts/validateRWBank.mjs --validate-sources
 *   node scripts/validateRWBank.mjs --validate-sources --strict
 *   node scripts/validateRWBank.mjs --check=stem,entity --test=3
 *
 * Exit code: 1 on any violation, 0 if clean.
 *
 * Output format (mirrors calibrateModule):
 *   practiceTest3RW.js:412 stem-verbatim: skill "X" stem "Y" but expected "Z"
 *
 * Exports — see the bottom of this module for the export list.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

import {
  tokenize,
  checkUniqueness,
  checkUniquenessSliding,
  indexCorpus,
  loadPdfCorpus,
} from './calibrateModule.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const GEN_DIR = process.env.RW_GEN_DIR || path.join(ROOT, 'scripts', 'generated');
const RW_SOURCES_DIR = path.join(GEN_DIR, 'rwSources');
const TESTS_DIR = process.env.RW_TESTS_DIR || path.join(ROOT, 'src', 'data', 'practiceTests');
const PDF_TEXT_DIR = path.join(GEN_DIR, 'pdf-text');

// ---------------------------------------------------------------------------
// RW_STEM_REGISTRY — verbatim canonical stems per skill (rubric §1.1–§1.11).
// ---------------------------------------------------------------------------
//
// Each entry is { canonical: string, variants: string[] }. Variants use
// `[VAR]` placeholders for clauses that legitimately differ (work title,
// author, goal verb). The matcher strips placeholders and compares prefix +
// suffix patterns.
//
// **2026-05-06 (S3/F11) — Bank-mislabeling finding.** Cross-checking the
// registry against PT4-11 PDFs (`scripts/generated/pdf-text/`) showed the
// canonicals here are accurate to CB. The 0% canonical-stem rate that S1's
// `--all` reported on text-structure-and-purpose, cross-text-connections,
// command-of-evidence-textual, and command-of-evidence-quantitative is
// caused by systemic skill mislabeling in the existing bank: e.g., 23
// items tagged `command-of-evidence-textual` use the COE-quantitative
// "Which choice most effectively uses data from the table…" stem, and
// 24 items tagged `text-structure-and-purpose` use the words-in-context
// canonical. Approach A's whole-bank regen retags items by stem at
// authoring time, so this resolves wholesale rather than via per-item
// patches. Do NOT relax these canonicals to accommodate the drifted bank.

export const RW_STEM_REGISTRY = {
  'words-in-context': {
    canonical: 'Which choice completes the text with the most logical and precise word or phrase?',
    variants: [
      // The legacy "As used in the text, what does the word \"X\" most nearly mean?" form
      // is documented as a CB historical variant for direct-meaning items.
      'As used in the text, what does the word "[VAR]" most nearly mean?',
    ],
  },
  'text-structure-and-purpose': {
    canonical: 'Which choice best states the main purpose of the text?',
    // Per CB rubric §1.2 the "overall structure" stem is canonical-equivalent
    // to "main purpose" — both appear ~50/50 across PT 4-11. Listing it under
    // canonicalEquivalents lets validateStemDistribution count items using
    // the structure stem as canonical (not variant), so the bank-wide ≥80%
    // canonical-rate gate doesn't fail just because the bank is using both
    // valid stems in proportion.
    canonicalEquivalents: [
      'Which choice best describes the overall structure of the text?',
      'Which choice best describes the function of the underlined sentence in the text as a whole?',
      'Which choice best describes the function of the underlined sentence in the text?',
    ],
    variants: [
      'Which choice best describes the function of the [VAR] sentence in the overall structure of the text?',
      'Which choice best describes what is happening in the text?',
      // Quoted-sentence form when the UI cannot underline ("the underlined
      // sentence ("...")").
      'Which choice best describes the function of the underlined sentence ([VAR]) in the text as a whole?',
    ],
  },
  'cross-text-connections': {
    // CB's dominant pattern in PT4-11 is "respond to the [thing] presented/discussed
    // in Text N" — confirmed by grep against scripts/generated/pdf-text/. The
    // current PerformSAT bank uses "respond to the claim made by the researchers
    // in Text 1" which is a drift from CB's "presented in" / "discussed in"
    // forms. We deliberately do NOT add "made by" as a variant; Approach A
    // regen will move bank items onto the canonical CB phrasing.
    canonical: 'Based on the texts, how would [VAR] most likely respond to the [VAR] presented in [VAR]?',
    variants: [
      'Based on the texts, both authors would most likely agree with which statement?',
      'Based on the texts, how would [VAR] most likely characterize [VAR]?',
      // Observed in PT5/PT6: "respond to the 'conventional wisdom' discussed in Text 1?"
      'Based on the texts, how would [VAR] most likely respond to the [VAR] discussed in [VAR]?',
    ],
    // 2026-06 rewrite: "(Text 2)" attribution + free-form object ("respond
    // to Colalucci's defense of the cleaning", "to Loftus's position") is
    // CB's standard cross-text framing, so co-canonical.
    canonicalEquivalents: [
      'Based on the texts, how would [VAR] most likely respond to [VAR]?',
    ],
  },
  'central-ideas-and-details': {
    canonical: 'Which choice best states the main idea of the text?',
    // Detail-comprehension stems are co-canonical on official forms (CB's
    // CID items are ~half main-idea, ~half "According to/Based on the text"
    // detail questions), so they count toward the >=80% canonical gate.
    canonicalEquivalents: [
      'According to the text, [VAR]?',
      'Based on the text, [VAR]?',
    ],
    variants: [],
  },
  inferences: {
    canonical: 'Which choice most logically completes the text?',
    variants: [],
  },
  'command-of-evidence-textual': {
    canonical: 'Which quotation from [VAR] most effectively illustrates the claim?',
    // The "which finding, if true, would support/weaken" stems are the
    // dominant COE-textual form on official forms and after the 2026-06
    // rewrite, so they are co-canonical (count toward the >=80% gate).
    canonicalEquivalents: [
      'Which finding from [VAR], if true, would most directly support the [VAR]?',
      'Which finding from [VAR], if true, would most directly weaken [VAR]?',
      'Which finding, if true, would most directly support the [VAR]?',
      'Which finding, if true, would most directly weaken [VAR]?',
      'Which finding, if true, would most strongly support [VAR]?',
      'Which finding from the study, if true, would most strongly support [VAR]?',
    ],
    variants: [
      'Which quotation from [VAR] would most effectively support the [VAR]?',
      'Which quotation from a hypothetical research paper would best support the [VAR]?',
    ],
  },
  'command-of-evidence-quantitative': {
    canonical: 'Which choice most effectively uses data from the [VAR] to complete [VAR]?',
    // Per CB rubric §1.7, the "to support" form appears alongside "to complete"
    // across PT 4-11 — both are CB-canonical for COE-quantitative. Counting
    // it as canonical-equivalent prevents the ≥80% canonical-rate gate from
    // firing on a balanced "to complete" / "to support" split.
    canonicalEquivalents: [
      'Which choice most effectively uses data from the [VAR] to support [VAR]?',
    ],
    variants: [
      'Which choice best describes data from the [VAR] that support [VAR]?',
      'Which choice best describes data from the [VAR] that support the [VAR]?',
    ],
  },
  boundaries: {
    canonical: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    variants: [],
  },
  'form-structure-and-sense': {
    canonical: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    variants: [],
  },
  transitions: {
    canonical: 'Which choice completes the text with the most logical transition?',
    variants: [],
  },
  'rhetorical-synthesis': {
    canonical: 'Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    variants: [
      // Authoring style places the goal sentence as a separate prefix paragraph in `passage`,
      // leaving only the second sentence in `question`. The full canonical from rubric §1.11
      // is also accepted when the entire stem appears in `question`.
      'The student wants to [VAR]. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    ],
  },
};

// All 11 R&W skills (matches the keys of RW_STEM_REGISTRY). Used to validate
// item.skill against a closed set.
const RW_SKILLS = Object.freeze(Object.keys(RW_STEM_REGISTRY));

// ---------------------------------------------------------------------------
// RW_SKILL_BLUEPRINT — per-module expected skill counts (rubric §9).
// ---------------------------------------------------------------------------
//
// Per-module skill distribution for a 27-item module. Each domain has a
// min/max range; the lint reports a violation when the observed count is
// outside [min, max].

export const RW_SKILL_BLUEPRINT = {
  // Information and Ideas: central-ideas-and-details + inferences
  //                         + command-of-evidence-textual + command-of-evidence-quantitative
  'information-and-ideas': { min: 8, max: 10 },
  // Craft and Structure: words-in-context + text-structure-and-purpose
  //                       + cross-text-connections
  'craft-and-structure': { min: 6, max: 8 },
  // Standard English Conventions: boundaries + form-structure-and-sense
  'standard-english-conventions': { min: 5, max: 7 },
  // Expression of Ideas: transitions + rhetorical-synthesis
  'expression-of-ideas': { min: 3, max: 5 },
  // Per-module total (per CB-blueprint).
  totalPerModule: 27,
};

// Map each skill to its parent domain.
const SKILL_TO_DOMAIN = {
  'words-in-context': 'craft-and-structure',
  'text-structure-and-purpose': 'craft-and-structure',
  'cross-text-connections': 'craft-and-structure',
  'central-ideas-and-details': 'information-and-ideas',
  inferences: 'information-and-ideas',
  'command-of-evidence-textual': 'information-and-ideas',
  'command-of-evidence-quantitative': 'information-and-ideas',
  boundaries: 'standard-english-conventions',
  'form-structure-and-sense': 'standard-english-conventions',
  transitions: 'expression-of-ideas',
  'rhetorical-synthesis': 'expression-of-ideas',
};

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const TEST_ARG = args.find(a => a.startsWith('--test='));
  const CHECK_ARG = args.find(a => a.startsWith('--check='));
  const ALL = args.includes('--all');
  const VALIDATE_SOURCES = args.includes('--validate-sources');
  const STRICT = args.includes('--strict');

  if (VALIDATE_SOURCES) {
    return { mode: 'validate-sources', strict: STRICT };
  }

  const testNumbers = ALL
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : (TEST_ARG ? TEST_ARG.split('=')[1].split(',').map(n => parseInt(n, 10)) : null);

  if (!testNumbers && !ALL) {
    throw new Error('--test=<n> or --all is required (or --validate-sources)');
  }

  for (const n of (testNumbers || [])) {
    if (!Number.isInteger(n) || n < 1 || n > 12) {
      throw new Error(`--test value must be 1-12 (got ${n})`);
    }
  }

  const checks = CHECK_ARG ? CHECK_ARG.split('=')[1].split(',').map(s => s.trim()) : null;

  return { mode: ALL ? 'all' : 'test', testNumbers, checks };
}

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------

function loadRWPracticeTest(n) {
  const file = path.join(TESTS_DIR, `practiceTest${n}RW.js`);
  let src = fs.readFileSync(file, 'utf8');
  src = src.replace(/^export\s+const\s+/gm, 'var ').replace(/^export\s+default\s+[^;]+;?$/gm, '');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return { pt: ctx[`practiceTest${n}RW`], src, file };
}

/**
 * Load the adaptive R&W Module 2 Easy variant (practiceTest{n}RWM2Easy.js)
 * when it exists. Returns null when the test ships no variant — the caller
 * treats that as "nothing extra to lint", not an error. The export is a bare
 * module ({ questions: [...] }), not a test with a modules array.
 */
function loadRWM2EasyVariant(n) {
  const file = path.join(TESTS_DIR, `practiceTest${n}RWM2Easy.js`);
  if (!fs.existsSync(file)) return null;
  let src = fs.readFileSync(file, 'utf8');
  src = src.replace(/^export\s+const\s+/gm, 'var ').replace(/^export\s+default\s+[^;]+;?$/gm, '');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return { variant: ctx[`practiceTest${n}RWM2Easy`], src, file };
}

function loadJsonSafely(p, label) {
  if (!fs.existsSync(p)) {
    throw new Error(`${label} missing at ${p}`);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function loadResearchers() {
  return loadJsonSafely(path.join(RW_SOURCES_DIR, 'researchers.json'), 'researchers.json');
}

function loadLiteraryWorks() {
  return loadJsonSafely(path.join(RW_SOURCES_DIR, 'literaryWorks.json'), 'literaryWorks.json');
}

function loadCrossTextPairs() {
  return loadJsonSafely(path.join(RW_SOURCES_DIR, 'crossTextPairs.json'), 'crossTextPairs.json');
}

function loadQuantitativeData() {
  return loadJsonSafely(path.join(RW_SOURCES_DIR, 'quantitativeData.json'), 'quantitativeData.json');
}

// ---------------------------------------------------------------------------
// Question-line indexer (mirrors calibrateModule.indexQuestionLines but for RW
// test files where each question may contain a multi-line `passage` field).
// ---------------------------------------------------------------------------
//
// The R&W test file has the same shape as the Math test file (modules array,
// each with a questions array of object literals), so we can reuse the same
// approach: track depth-0 braces inside a `questions: [` array.

function indexRWQuestionLines(src, { requireModules = true } = {}) {
  const lines = src.split('\n');
  const result = [];
  const moduleStarts = [];
  // M2Easy variant files export a bare module ({ questions: [...] }) with no
  // modules array wrapper — requireModules:false tracks their questions
  // array directly.
  let modulesOpened = !requireModules;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (!modulesOpened && /modules\s*:\s*\[/.test(ln)) modulesOpened = true;
    if (modulesOpened && /questions\s*:\s*\[/.test(ln)) moduleStarts.push(i);
  }

  for (let mi = 0; mi < moduleStarts.length; mi++) {
    const startIdx = moduleStarts[mi];
    let depth = 0;
    let qStart = -1;
    let posInModule = 0;
    let inString = false;
    let stringChar = '';
    let prevChar = '';
    let arrayClosed = false;
    let pastArrayOpen = false;

    for (let i = startIdx; i < lines.length && !arrayClosed; i++) {
      const ln = lines[i];
      let j = 0;
      if (!pastArrayOpen) {
        const m = ln.match(/questions\s*:\s*\[/);
        if (m) {
          j = m.index + m[0].length;
          pastArrayOpen = true;
        }
      }
      for (; j < ln.length; j++) {
        const c = ln[j];
        if (inString) {
          if (c === stringChar && prevChar !== '\\') inString = false;
          prevChar = c;
          continue;
        }
        if (c === '"' || c === "'" || c === '`') {
          inString = true;
          stringChar = c;
          prevChar = c;
          continue;
        }
        if (c === '/' && j + 1 < ln.length && ln[j + 1] === '/') break;
        if (c === '{') {
          if (depth === 0) qStart = i;
          depth++;
        } else if (c === '}') {
          depth--;
          if (depth === 0 && qStart >= 0) {
            posInModule++;
            result.push({
              moduleIndex: mi,
              modulePosition: posInModule,
              startLine: qStart + 1,
              endLine: i + 1,
            });
            qStart = -1;
          }
        } else if (c === ']' && depth === 0) {
          arrayClosed = true;
          break;
        }
        prevChar = c;
      }
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Shared violation collector
// ---------------------------------------------------------------------------

function makeViolations() {
  const list = [];
  return {
    push(testN, line, rule, message) {
      list.push({ testN, line, rule, message });
    },
    list,
  };
}

// ---------------------------------------------------------------------------
// Lint check #1 — validateStem (verbatim canonical stem per skill)
// ---------------------------------------------------------------------------
//
// Per item: check item.question against the canonical stem registered for
// item.skill. If it doesn't match, check the variants (which may contain
// `[VAR]` placeholders for the parts that legitimately differ — author
// names, work titles, goal verbs).
//
// Two return shapes:
//   - validateStem(item) -> { ok, expected, observed, isVariant }
//   - validateStemDistribution(items) -> { perSkill: { [skill]: { canonical, variant, total } }, violations }

/**
 * Compare an observed stem to a registry pattern that may contain `[VAR]`
 * placeholders. The placeholder matches any non-empty span of characters
 * (lazy). Returns true if the observed string matches the pattern exactly
 * apart from placeholder substitutions.
 */
function stemMatchesPattern(observed, pattern) {
  if (!observed || !pattern) return false;
  if (!pattern.includes('[VAR]')) return observed.trim() === pattern.trim();
  // Convert [VAR] placeholders to a tolerant regex. Escape regex specials in
  // the surrounding literal text. Use lazy matching so adjacent placeholders
  // don't gobble each other.
  const parts = pattern.split('[VAR]').map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp('^' + parts.join('(.+?)') + '$');
  return re.test(observed.trim());
}

/**
 * Check a single item's stem (item.question) against the registry for its
 * declared skill. Returns:
 *   { ok: boolean, isVariant: boolean, expected: string, observed: string, allowed: string[] }
 */
export function validateStem(item) {
  const skill = item && item.skill;
  const observed = (item && item.question) || '';
  const entry = RW_STEM_REGISTRY[skill];
  if (!entry) {
    return {
      ok: false,
      isVariant: false,
      expected: null,
      observed,
      allowed: [],
      reason: 'unknown-skill',
    };
  }
  // Canonical stems for cross-text-connections, COE-textual, and
  // COE-quantitative contain [VAR] placeholders (work title, dataset
  // name, hypothesis). When the canonical is a pattern, match it via
  // stemMatchesPattern; only fall back to exact equality for the
  // placeholder-free canonicals.
  if (entry.canonical.includes('[VAR]')) {
    if (stemMatchesPattern(observed, entry.canonical)) {
      return { ok: true, isVariant: false, expected: entry.canonical, observed, allowed: [entry.canonical, ...entry.variants] };
    }
  } else if (observed.trim() === entry.canonical.trim()) {
    return { ok: true, isVariant: false, expected: entry.canonical, observed, allowed: [entry.canonical, ...entry.variants] };
  }
  // Canonical-equivalents (per CB rubric, multiple stems are equally canonical
  // for some skills — e.g., TS&P "main purpose" vs "overall structure").
  // These count as canonical (isVariant: false) for the bank-distribution
  // ≥80% gate; otherwise the gate fails on balanced 50/50 use of two
  // CB-canonical stems.
  for (const ce of (entry.canonicalEquivalents || [])) {
    const matched = ce.includes('[VAR]') ? stemMatchesPattern(observed, ce) : observed.trim() === ce.trim();
    if (matched) {
      return { ok: true, isVariant: false, expected: ce, observed, allowed: [entry.canonical, ...(entry.canonicalEquivalents || []), ...entry.variants] };
    }
  }
  for (const v of entry.variants) {
    if (stemMatchesPattern(observed, v)) {
      return { ok: true, isVariant: true, expected: v, observed, allowed: [entry.canonical, ...(entry.canonicalEquivalents || []), ...entry.variants] };
    }
  }
  // Some R&W items put the goal sentence ("The student wants to ...") into
  // the `passage` field and only the second sentence into `question`. Tolerate
  // that for rhetorical-synthesis when the canonical stem is the second
  // sentence.
  if (skill === 'rhetorical-synthesis') {
    const second = 'Which choice most effectively uses relevant information from the notes to accomplish this goal?';
    if (observed.trim() === second.trim()) {
      return { ok: true, isVariant: true, expected: second, observed, allowed: [entry.canonical, ...entry.variants] };
    }
  }
  return {
    ok: false,
    isVariant: false,
    expected: entry.canonical,
    observed,
    allowed: [entry.canonical, ...entry.variants],
    reason: 'no-match',
  };
}

/**
 * Bank-level rule: ≥80% of items per skill must use the canonical stem; the
 * rest must be one of the documented variants. Returns:
 *   { perSkill: { [skill]: { canonical, variant, total, canonicalPct } }, violations: [{ skill, message }] }
 */
export function validateStemDistribution(items) {
  const perSkill = {};
  for (const it of items) {
    const skill = it.skill;
    if (!skill) continue;
    const r = validateStem(it);
    if (!perSkill[skill]) perSkill[skill] = { canonical: 0, variant: 0, fail: 0, total: 0 };
    perSkill[skill].total++;
    if (r.ok) {
      if (r.isVariant) perSkill[skill].variant++;
      else perSkill[skill].canonical++;
    } else {
      perSkill[skill].fail++;
    }
  }
  const violations = [];
  for (const [skill, c] of Object.entries(perSkill)) {
    const eligible = c.total - c.fail; // skills tested by stems we recognized
    if (eligible === 0) continue;
    const pct = Math.round(100 * c.canonical / Math.max(1, c.total));
    c.canonicalPct = pct;
    if (pct < 80 && c.total >= 5) {
      violations.push({
        skill,
        message: `stem-distribution: skill "${skill}" canonical-stem rate is ${pct}% (below 80%)`,
      });
    }
  }
  return { perSkill, violations };
}

// ---------------------------------------------------------------------------
// Lint check #2 — validatePdfUniqueness (Jaccard / 3-gram vs PT4-11 PDFs)
// ---------------------------------------------------------------------------
//
// Reuse Math's checkUniqueness/checkUniquenessSliding/loadPdfCorpus. Apply
// per item to passage, joined choices, and explanation.

const RW_MIN_TOKENS_FOR_CHECK = 12;

/**
 * Run the PDF-uniqueness checks against an item's passage / choices /
 * explanation. Returns a list of { rule, message, line } violation seeds
 * that the caller will attach to the test/file.
 *
 * @param {object} item — the question record
 * @param {Array} pdfCorpus — pre-indexed PT4-11 sliding-window corpus
 * @param {number} startLine — line number for the item (for output)
 * @returns {Array<{ line, rule, message }>}
 */
/**
 * Derive a single passage-equivalent text string from an item, regardless
 * of whether the item uses the legacy `passage` field, the structured
 * `passages: [{label,text}]` cross-text form, or the rhet-syn
 * `studentNotes: {intro, bullets, goal}` form. Used by lints that operate
 * on natural-language passage content (entity registry, pdf uniqueness,
 * skeleton fingerprinting). Returns '' if the item carries no passage
 * content.
 */
export function getPassageText(item) {
  if (!item) return '';
  if (typeof item.passage === 'string' && item.passage.trim()) {
    return item.passage;
  }
  if (Array.isArray(item.passages) && item.passages.length > 0) {
    return item.passages
      .map(p => (p && typeof p.text === 'string') ? p.text : '')
      .filter(Boolean)
      .join('\n\n');
  }
  if (item.studentNotes && typeof item.studentNotes === 'object') {
    const sn = item.studentNotes;
    const intro = typeof sn.intro === 'string' ? sn.intro : '';
    const bullets = Array.isArray(sn.bullets)
      ? sn.bullets.map(b => `- ${b}`).join('\n')
      : '';
    return [intro, bullets].filter(Boolean).join('\n\n');
  }
  return '';
}

export function validatePdfUniqueness(item, pdfCorpus, startLine) {
  const out = [];
  if (!pdfCorpus || pdfCorpus.length === 0) return out;

  // 2a — passage (handles legacy passage / structured passages / studentNotes)
  const passage = getPassageText(item);
  if (passage.trim()) {
    const tokens = tokenize(passage);
    if (tokens.length >= RW_MIN_TOKENS_FOR_CHECK) {
      const u = checkUniquenessSliding(passage, pdfCorpus);
      if (!u.pass) {
        out.push({
          line: startLine,
          rule: 'pdf-uniqueness-passage',
          message: `pdf-uniqueness-passage: passage Jaccard ${u.jaccard} / 3-gram ${u.ngramOverlap} vs ${u.closestId} (thresholds 0.78 / 0.60)`,
        });
      }
    }
  }
  // 2b — joined choices
  if (Array.isArray(item.choices)) {
    const joined = item.choices.map(c => (c && c.text) || '').join(' ');
    const tokens = tokenize(joined);
    if (tokens.length >= RW_MIN_TOKENS_FOR_CHECK) {
      const u = checkUniqueness(joined, indexCorpusFromArray(pdfCorpus));
      if (!u.pass) {
        out.push({
          line: startLine,
          rule: 'pdf-uniqueness-choices',
          message: `pdf-uniqueness-choices: choice block Jaccard ${u.jaccard} / 3-gram ${u.ngramOverlap} vs ${u.closestQbankId} (thresholds 0.78 / 0.60)`,
        });
      }
    }
  }
  // 2c — explanation (sliding window)
  const exp = item.explanation || '';
  if (exp.trim()) {
    const u = checkUniquenessSliding(exp, pdfCorpus);
    if (!u.pass) {
      out.push({
        line: startLine,
        rule: 'pdf-uniqueness-explanation',
        message: `pdf-uniqueness-explanation: explanation window Jaccard ${u.jaccard} / 3-gram ${u.ngramOverlap} vs ${u.closestId} (thresholds 0.78 / 0.60)`,
      });
    }
  }
  return out;
}

// indexCorpusFromArray: helper to reuse the Math indexCorpus shape when we
// already have a pre-indexed corpus (the Array form). checkUniqueness expects
// the QBank-shaped object; converting from indexed corpus → object preserves
// the comparison.
function indexCorpusFromArray(indexedCorpus) {
  // checkUniqueness internally reindexes via indexCorpus. We pass an object
  // shaped like { id: { stemPlain: text } } so it walks the same path.
  const obj = {};
  for (const win of indexedCorpus) obj[win.id] = { stemPlain: win.text };
  return obj;
}

// ---------------------------------------------------------------------------
// Lint check #6 — validateChoiceUniqueness (distractor strings across bank)
// ---------------------------------------------------------------------------
//
// Build a frequency map of every choice text (normalized) across the bank.
// Fail if any single choice string appears in >2 items. Optional argument
// is the per-test items list with item.testN/item.id for reporting.

const CHOICE_UNIQUENESS_MAX_REPEATS = 2;

/**
 * Normalize a choice text for cross-test comparison:
 *   - lowercase
 *   - collapse whitespace
 *   - strip leading/trailing punctuation
 */
function normalizeChoice(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/^[\s\p{P}]+|[\s\p{P}]+$/gu, '')
    .trim();
}

/**
 * Cross-bank check: any single choice text that appears in >max items.
 * Returns violations of the form { line, rule, message, items }.
 *
 * @param {Array} bankItems — flat array of { testN, line, item } across all 12 tests
 * @param {object} [opts] — { max: 2 (default) }
 */
export function validateChoiceUniqueness(bankItems, opts = {}) {
  const max = opts.max || CHOICE_UNIQUENESS_MAX_REPEATS;
  const counts = new Map(); // normalized -> { original, occurrences: [{ testN, line, qid }] }
  for (const b of bankItems) {
    const item = b.item;
    if (!Array.isArray(item.choices)) continue;
    for (const c of item.choices) {
      if (!c || !c.text) continue;
      const norm = normalizeChoice(c.text);
      // Skip very short strings — single words ("indicate", "however,") will
      // legitimately recur and don't indicate template cloning.
      if (norm.length < 20) continue;
      if (!counts.has(norm)) counts.set(norm, { original: c.text, occurrences: [] });
      counts.get(norm).occurrences.push({
        testN: b.testN, line: b.line, qid: item.id,
      });
    }
  }
  const violations = [];
  for (const [norm, info] of counts.entries()) {
    // Cross-item uniqueness: SEC items legitimately reuse the same phrase
    // across all 4 choices (only the punctuation/wording varies). Dedupe
    // by item id so intra-item repeats don't trip the cross-item lint.
    const distinctItems = new Map(); // qid -> first occurrence
    for (const o of info.occurrences) {
      const key = `T${o.testN}Q${o.qid}`;
      if (!distinctItems.has(key)) distinctItems.set(key, o);
    }
    if (distinctItems.size > max) {
      const list = Array.from(distinctItems.keys()).join(', ');
      const first = info.occurrences[0];
      violations.push({
        testN: first.testN,
        line: first.line,
        rule: 'choice-uniqueness',
        message: `choice-uniqueness: distractor "${truncateForMsg(info.original)}" appears in ${distinctItems.size} items (max ${max}). Items: [${list}]`,
        norm,
        occurrences: Array.from(distinctItems.values()),
      });
    }
  }
  return violations;
}

function truncateForMsg(s, n = 80) {
  if (!s) return '';
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + '…';
}

// ---------------------------------------------------------------------------
// Lint check #3 — validateBankSkeletons (passage skeleton detection across bank)
// ---------------------------------------------------------------------------
//
// THE most important new check — catches templated cross-test passages.
// For each item, compute a skeleton fingerprint:
//   1. Strip proper nouns (capitalized words not at sentence start, plus
//      proper-noun spans like "Dr. Aiyana Standing Bear")
//   2. Normalize numbers to [NUM] and 4-digit years to [YEAR]
//   3. Take the first 12 tokens after stripping (the "opening fingerprint")
//   4. Plus the full normalized passage tokens for Jaccard comparison
// Pairwise compare every item to every other item:
//   - Fail when first-12-token openings match exactly between items in
//     different tests
//   - Fail when normalized-passage Jaccard > 0.40 between any two items

const BANK_SKELETON_JACCARD_THRESHOLD = 0.40;
const BANK_SKELETON_OPENING_TOKENS = 12;

// Canonical College Board literary-passage opening that appears verbatim in
// every CB Bluebook PT 4-11 literary stem (and our reauthored bank). Any pair
// whose fingerprinted openings BOTH start with one of these prefixes is
// matching on a structural CB stem, not on creative content. Suppress
// `openingMatch` for such pairs — Jaccard still applies, which catches actual
// content reuse beyond the structural opener.
//
// Strings are in fingerprint form: lowercase, post-stripProperNouns, with
// names/years collapsed to placeholders (so "The following text is adapted
// from Anton Chekhov's 1898 short story" → "the following text is adapted
// from").
const RW_CANONICAL_OPENING_PREFIXES = [
  'the following text is adapted from',
];

function openingIsCanonical(opening) {
  if (!opening) return false;
  return RW_CANONICAL_OPENING_PREFIXES.some(p => opening.startsWith(p));
}

/**
 * Documented source-reuse allowlist. Some CB-style banks intentionally re-use
 * a researcher / literary work across two tests for different skills (e.g.,
 * Banaji's *Blindspot* anchoring T1 Q50 form-structure + T2 Q51 transitions).
 * Authors record the intent in `source_reuse` or `source_reuse_note` on the
 * partner item, citing the partner test (e.g., "T1Q50", "from T7 Q50",
 * "Test 4 q01"). When EITHER side of a pair documents the partner test, the
 * bank-skeleton match is intentional — suppress the violation.
 *
 * Matches "T<N>" (with optional whitespace, not followed by another digit so
 * "T1" does not match "T10") and "Test <N>" (case-insensitive). Multi-digit
 * test numbers handled via the `(?!\d)` lookahead.
 */
function isDocumentedReuse(A, B) {
  if (!A.sourceReuse.trim() && !B.sourceReuse.trim()) return false;
  const reA = new RegExp(`(?:^|\\W)T\\s*${B.testN}(?!\\d)|\\btest\\s+${B.testN}(?!\\d)`, 'i');
  const reB = new RegExp(`(?:^|\\W)T\\s*${A.testN}(?!\\d)|\\btest\\s+${A.testN}(?!\\d)`, 'i');
  return reA.test(A.sourceReuse) || reB.test(B.sourceReuse);
}

const TITLE_PREFIXES = new Set([
  'Dr.', 'Dr', 'Mr.', 'Mr', 'Mrs.', 'Mrs', 'Ms.', 'Ms', 'Prof.', 'Prof',
  'Professor', 'Sir', 'Lady', 'Lord', 'St.', 'St',
]);

/**
 * Strip proper nouns from a string. The simple rule: replace any capitalized
 * word that is not at the start of a sentence with [PERSON]. Then collapse
 * runs of [PERSON] tokens into a single placeholder. Quotation marks are
 * stripped.
 *
 * Also normalizes:
 *   - 4-digit years (1700-2099) → [YEAR]
 *   - other multi-digit numbers → [NUM]
 *   - title-stripped names ("Dr.", "Prof.")
 */
function stripProperNouns(text) {
  if (!text) return '';
  // First, split into sentences (very crude — split on `. ` boundaries).
  const sentences = text.split(/(?<=[.!?])\s+/);
  const out = [];
  for (const s of sentences) {
    // Strip explicit titles first ("Dr. X", "Professor Y").
    let cleaned = s.replace(/\b(Dr|Prof|Mr|Mrs|Ms|Sir|Lady|Lord|St)\.?\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*/g, '[PERSON]');
    // Walk word-by-word: keep the first word's capitalization as-is, replace
    // any other capitalized word run with [PERSON].
    const words = cleaned.split(/\s+/);
    const replaced = [];
    let firstWord = true;
    let inPersonRun = false;
    for (const w of words) {
      if (!w) continue;
      const isCap = /^[A-Z][a-zA-Z'-]+$/.test(w) || /^[A-Z][a-zA-Z'-]+,$/.test(w);
      const isAcronym = /^[A-Z]{2,}$/.test(w);
      if (firstWord) {
        replaced.push(w);
        firstWord = false;
        inPersonRun = false;
        continue;
      }
      if (isCap || isAcronym) {
        if (!inPersonRun) {
          replaced.push('[PERSON]');
          inPersonRun = true;
        }
        // skip duplicates
      } else {
        replaced.push(w);
        inPersonRun = false;
      }
    }
    out.push(replaced.join(' '));
  }
  let result = out.join(' ');
  // Normalize numeric values.
  result = result.replace(/\b(1[7-9]\d{2}|20\d{2})\b/g, '[YEAR]');
  result = result.replace(/\b\d+(\.\d+)?\b/g, '[NUM]');
  // Collapse repeated placeholders.
  result = result.replace(/(\[PERSON\]\s+){2,}/g, '[PERSON] ');
  return result;
}

/**
 * Compute a passage's opening-token fingerprint: first N tokens after
 * stripping proper nouns and collapsing whitespace. Returns the joined
 * string (canonical form for equality comparison).
 */
function passageOpeningFingerprint(passage, n = BANK_SKELETON_OPENING_TOKENS) {
  if (!passage) return '';
  const stripped = stripProperNouns(passage);
  const tokens = stripped
    .toLowerCase()
    .replace(/[^a-z0-9\[\]\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);
  return tokens.slice(0, n).join(' ');
}

/**
 * Compute a passage's normalized token set (proper-nouns stripped + numbers
 * normalized) for Jaccard comparison.
 */
function passageNormalizedTokens(passage) {
  if (!passage) return new Set();
  const stripped = stripProperNouns(passage);
  return new Set(
    stripped
      .toLowerCase()
      .replace(/[^a-z0-9\[\]\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1)
  );
}

function jaccardSets(a, b) {
  if (a.size === 0 && b.size === 0) return 0;
  let inter = 0;
  const small = a.size < b.size ? a : b;
  const large = a.size < b.size ? b : a;
  for (const v of small) if (large.has(v)) inter++;
  const uni = a.size + b.size - inter;
  return uni === 0 ? 0 : inter / uni;
}

/**
 * Bank-level: pairwise compare every item's passage to every other item's.
 * Returns violations — one per pair that crosses thresholds.
 *
 * @param {Array} bankItems - flat list { testN, line, item } across all 12 tests
 * @returns {Array<{ testN, line, rule, message }>}
 */
export function validateBankSkeletons(bankItems) {
  // Pre-compute fingerprints once.
  const fps = bankItems
    .filter(b => b.item && b.item.passage)
    .map(b => ({
      testN: b.testN,
      line: b.line,
      qid: b.item.id,
      opening: passageOpeningFingerprint(b.item.passage),
      tokenSet: passageNormalizedTokens(b.item.passage),
      passage: b.item.passage,
      // Combined source_reuse / source_reuse_note text — fed to
      // isDocumentedReuse(). Authors place either field at the item top level
      // OR nested under `_meta`; the assembler preserves both layouts. Probe
      // both, plus both field names. Empty string when nothing is set.
      sourceReuse: [
        b.item.source_reuse,
        b.item.source_reuse_note,
        b.item._meta && b.item._meta.source_reuse,
        b.item._meta && b.item._meta.source_reuse_note,
      ].filter(Boolean).join(' ').trim(),
    }))
    .filter(b => b.tokenSet.size >= 8);

  const violations = [];
  // De-duplicate: report each distinct A↔B pair once.
  const seenPairs = new Set();
  for (let i = 0; i < fps.length; i++) {
    for (let j = i + 1; j < fps.length; j++) {
      const A = fps[i];
      const B = fps[j];
      // Skip same-test same-question (paranoia).
      if (A.testN === B.testN && A.qid === B.qid) continue;
      const pairKey = `${Math.min(A.testN, B.testN)}-${A.qid}-${Math.max(A.testN, B.testN)}-${B.qid}`;
      if (seenPairs.has(pairKey)) continue;
      seenPairs.add(pairKey);

      // Opening exact match across different tests:
      const rawOpeningMatch = A.testN !== B.testN
        && A.opening === B.opening
        && A.opening.split(' ').filter(Boolean).length >= 6;
      // Canonical CB-opening allowlist: when both passages start with the
      // canonical "The following text is adapted from..." stem (or any other
      // registered structural prefix), the opening match is mechanical, not
      // creative. Demote `openingMatch` for those pairs — Jaccard remains the
      // sole signal for content overlap.
      const bothCanonical = openingIsCanonical(A.opening) && openingIsCanonical(B.opening);
      const openingMatch = rawOpeningMatch && !bothCanonical;
      // Jaccard of normalized tokens above threshold:
      const jac = jaccardSets(A.tokenSet, B.tokenSet);
      const jaccardMatch = jac > BANK_SKELETON_JACCARD_THRESHOLD;

      if (openingMatch || jaccardMatch) {
        // source_reuse metadata allowlist: if either item documents reuse and
        // names the partner test, the pair is intentional (same researcher /
        // literary work, distinct skills). Suppress the violation.
        if (isDocumentedReuse(A, B)) continue;
        const reason = [];
        if (openingMatch) reason.push(`shared 12-token opening`);
        if (jaccardMatch) reason.push(`Jaccard ${jac.toFixed(2)}`);
        const otherFile = `practiceTest${B.testN}RW.js`;
        const thisFile = `practiceTest${A.testN}RW.js`;
        const opening = A.opening.length > 60 ? A.opening.slice(0, 60) + '…' : A.opening;
        violations.push({
          testN: A.testN,
          line: A.line,
          rule: 'bank-skeleton',
          message: `bank-skeleton: passage at ${thisFile}:${A.line} mirrors ${otherFile}:${B.line} (${reason.join(', ')}, opening "${opening}")`,
        });
      }
    }
  }
  return violations;
}

// ---------------------------------------------------------------------------
// Lint check #4 — validateEntityRegistry (every named person/work is real)
// ---------------------------------------------------------------------------
//
// Extract named entities from the passage:
//   pattern: [Title]? [FirstName] [LastName(s)] (e.g., "Dr. Robin Wall Kimmerer")
// Cross-check against researchers.json (full name match), and literaryWorks.json
// (author field). Allow real well-known historical figures via a small
// "always-allow" list (populated from literaryWorks.json + manual seed).

// Always-allow list: real verifiable historical / canonical figures whose
// names commonly appear in CB R&W passages and that may not be in
// researchers.json. Populated by:
//   - literaryWorks.json authors (added at runtime)
//   - manual seed below (canonical historical / literary figures, scientists,
//     and public-domain artists who appear in PT 4-11 PDFs)
const ALWAYS_ALLOW_SEED = new Set([
  // SAT R&W canonical literary authors
  'Walt Whitman', 'Susan Glaspell', 'Angelina Weld Grimké', 'Walt Whitman',
  'Frederick Douglass', 'Rosa Parks', 'Marie Tharp', 'Bessie Coleman', 'Hedy Lamarr',
  'Ann Petry', 'Edith Wharton', 'Marianne Moore', 'Jerome K. Jerome',
  'Anton Chekhov', 'Katherine Mansfield', 'Charlotte Perkins Gilman',
  'James Baldwin', 'Herman Melville', 'Sarah Orne Jewett', 'Kate Chopin',
  'Mary E. Wilkins Freeman', 'Stephen Crane', 'Willa Cather', 'Theodore Dreiser',
  'William Dean Howells', 'Mark Twain', 'Bret Harte', 'Zora Neale Hurston',
  'Langston Hughes', 'Claude McKay', 'Jean Toomer', 'Nella Larsen',
  'Sui Sin Far', 'Edith Maude Eaton', 'Mary Antin', 'Anzia Yezierska',
  'Emily Dickinson', 'William Wordsworth', 'John Keats', 'Christina Rossetti',
  'William Butler Yeats', 'Robert Frost', 'Carl Sandburg', 'Wallace Stevens',
  'T.S. Eliot', 'Frances Hodgson Burnett', 'Elizabeth von Arnim', 'Jean Webster',
  'Betty Smith', 'Edgar Allan Poe', 'Nathaniel Hawthorne', 'Henry James',
  'Thomas Hardy', 'Jack London', 'Lu Xun', 'Mori Ōgai', 'Natsume Sōseki',
  'Guy de Maupassant', 'Honoré de Balzac', 'Thomas Mann', 'Hugo von Hofmannsthal',
  'Benito Pérez Galdós', 'Emilia Pardo Bazán', 'Horacio Quiroga', 'Jorge Luis Borges',
  // CB-cited researchers / scientists
  'Daniella DellaGiustina', 'Vanessa Galvez', 'Marie Watt', 'Norma Sklarek',
  'Antonia Brico', 'Soo Sunny Park', 'Lê Lương Minh', 'Pliny the Younger',
  'Tacitus', 'Robin Wall Kimmerer', 'Chukwuebuka Okolo', 'Lani Tsinnajinnie',
  'Michael Garcia', 'Zora Hurston',
  // Historical educators / mentors who appear as named figures in
  // researcher biographies (legitimate cross-references, not protagonists).
  'Carter G. Woodson', 'Franz Boas', 'W. E. B. Du Bois',
  'Ida B. Wells', 'Booker T. Washington', 'William Lloyd Garrison',
  'Wendell Phillips', 'Charles Lenox Remond', 'Sojourner Truth',
  'Frederick Douglass',
  // Common single names that mark known regions / institutions
  'Babylonian', 'Roman', 'Saharan', 'African', 'Atlantic', 'Pacific',
  'Pompeii', 'Herculaneum', 'Misenum',
  // T9-T12 wave-authored anchors not yet in researchers.json — verifiable real
  // figures whose work is referenced in the new bank. "Spring Fragrance" alone
  // covers the entity-extractor stripping the "Mrs." honorific from the
  // *Mrs. Spring Fragrance* book title.
  'Lisa Randall', 'Sean Davis', 'Mrs. Spring Fragrance', 'Spring Fragrance',
  // T9-T12 wave-authored literary works / book titles cited in passages or
  // RhetSyn studentNotes. All are real, published works (Mesoamerican codices,
  // primatology and ethnomusicology monographs, public-domain poetry, modern
  // critical theory). Adding them here rather than literaryWorks.json because
  // they're cited as TOPICAL references, not as full literary anchors.
  'Codex Nuttall', 'Poetry', 'Chimpanzee Politics', 'Good Natured',
  'Chippewa Music', 'Teton Sioux Music', 'Signs of the Inka Khipu',
  'Africanist', 'Lyrics of the Hearthside', 'Sympathy',
  'Data Feminism', 'Medicine Stories', 'Certified Organic Intellectual',
  'The Historian as Curandera', 'Now in China',
  // Saint-named idioms / eponymous diseases-and-conditions extracted from
  // "St. X" patterns by Pattern A. These are medical / cultural terms,
  // not researcher names, but the regex correctly matches the form.
  "Vitus's Dance", 'Bright', "Bright's Disease", 'Anthony', "Anthony's Fire",
  'Elmo', "Elmo's Fire", 'Helena', "Helena's Comet",
]);

/**
 * Extract candidate named entities from a passage. Looks for:
 *   1. [Title]? [Cap] [Cap]+ — multi-word names like "Marie Tharp" or
 *      "Dr. Aiyana Standing Bear" or "the architect Yusuf Adisa"
 *   2. Italicized titles ( *Title* ) — work titles
 *   3. Quoted titles ("Title") — work titles
 *
 * Returns:
 *   { people: [{ name, span }], works: [{ title, span }] }
 *
 * Note: this is intentionally conservative. False positives (a sentence
 * starting with a person's name) get filtered later via the always-allow
 * + registry check.
 */
export function extractEntities(passage) {
  if (!passage) return { people: [], works: [] };
  const people = [];
  const works = [];

  // --- People ---
  // A "name token" is one of:
  //   - a multi-letter capitalized word, including Unicode upper/lower
  //     letters so non-ASCII names like "Ürge-Vorsatz", "DellaGiustina",
  //     "Pérez Galdós" tokenize correctly
  //   - a single-capital initial with period ("J.", "F.")
  //   - a lowercase nobiliary particle ("de", "van", "von", "der", "del",
  //     "du", "la", "le", "wa", "al", "bin", "ben") followed by a cap word —
  //     so "Asha de Vos" or "W. E. B. Du Bois" tokenize as full names
  //     instead of truncating at the first lowercase token.
  const NAME_TOKEN = "(?:(?:de|van|von|der|del|du|la|le|wa|al|bin|ben)\\s+\\p{Lu}[\\p{L}'-]+|\\p{Lu}[\\p{L}'-]+|\\p{Lu}\\.)";

  // Pattern A: explicit title followed by 1-3 capitalized words
  //   matches: Dr. Robin Wall Kimmerer, Professor Aditi Rao
  const titleRe = new RegExp(`\\b(Dr|Prof|Mr|Mrs|Ms|Sir|Professor|Lady|Lord|St)\\.?\\s+(${NAME_TOKEN}(?:\\s+${NAME_TOKEN}){1,3})`, 'gu');
  let m;
  while ((m = titleRe.exec(passage)) !== null) {
    people.push({ name: m[2], full: `${m[1]} ${m[2]}`, withTitle: true });
  }

  // Pattern B: descriptor introduction — "the [discipline] [Name1] [Name2]"
  //   matches: "the geologist Marie Tharp", "the architect Yusuf Adisa",
  //   "transportation researcher Aditi Rao", "scientist Daniella DellaGiustina"
  const descriptors = [
    'researcher', 'scientist', 'geologist', 'biologist', 'chemist',
    'physicist', 'astronomer', 'archaeologist', 'historian', 'architect',
    'engineer', 'composer', 'conductor', 'poet', 'writer', 'novelist',
    'painter', 'sculptor', 'photographer', 'critic', 'philosopher',
    'linguist', 'sociologist', 'economist', 'anthropologist', 'botanist',
    'ecologist', 'meteorologist', 'hydrologist', 'oceanographer',
    'mathematician', 'choreographer', 'designer', 'curator', 'mycologist',
    'paleontologist', 'ethnobotanist', 'astrophysicist', 'climatologist',
    'cosmologist', 'epidemiologist', 'zoologist', 'glaciologist',
    'volcanologist', 'mineralogist', 'palynologist', 'cellist', 'pianist',
    'violinist', 'sociolinguist', 'urbanist', 'planner', 'translator',
    'editor', 'illustrator', 'metallurgist', 'arborist', 'archivist',
    'astronomer', 'oceanographer', 'sailor', 'demographer', 'statistician',
    'psychologist', 'neuroscientist',
  ];
  const descRe = new RegExp(`\\b(?:the\\s+)?(?:${descriptors.join('|')})\\s+(${NAME_TOKEN}(?:\\s+${NAME_TOKEN}){0,3})`, 'gu');
  while ((m = descRe.exec(passage)) !== null) {
    people.push({ name: m[1], full: m[1], withTitle: false });
  }

  // --- Works ---
  // Pattern: italicized titles (*Title*) and quoted titles ("Title")
  // The R&W files use markdown italic for emphasis on terms (e.g. *worse*),
  // so be slightly conservative — only treat as a work when the italics span
  // ≥2 words OR contains a capital letter mid-span.
  const italicRe = /\*([^*\n]{2,80})\*/g;
  while ((m = italicRe.exec(passage)) !== null) {
    const t = m[1].trim();
    if (!t) continue;
    const wordCount = t.split(/\s+/).length;
    const hasMidCap = /\s[A-Z]/.test(t);
    if (wordCount >= 2 && (hasMidCap || t[0] === t[0].toUpperCase())) {
      works.push({ title: t, raw: m[0] });
    }
  }
  // Quoted titles: short quoted spans of 2-15 words (skip dialogue).
  // American typography places a trailing comma inside the closing quote
  // (`"Title,"`) so we strip a trailing comma/semicolon/colon from the
  // extracted span before lookup; otherwise the captured title doesn't
  // match its registry entry.
  const quoteRe = /"([A-Z][^"]{2,80})"/g;
  while ((m = quoteRe.exec(passage)) !== null) {
    let t = m[1].trim().replace(/[,;:]+$/, '').trim();
    if (!t) continue;
    const words = t.split(/\s+/);
    // Title-case heuristic: real titles either are a single capitalized
    // word ("Walden", "Trifles") or contain 2+ capitalized words ("On the
    // Origin of Mitosing Cells", "Letter to Thomas Auld"). Dialogue spans
    // like "Frome had been a smart fellow once" capitalize only the first
    // word and would false-positive otherwise.
    const capWords = words.filter(w => /^[A-Z]/.test(w)).length;
    const looksLikeTitle = words.length === 1 || capWords >= 2;
    // Skip dialogue: pure sentence-like spans (ending with `.` or `!`) and
    // very long quotes are exempt — they're usually quotations, not titles.
    if (words.length <= 8 && !/[.!?]$/.test(t) && looksLikeTitle) {
      works.push({ title: t, raw: m[0] });
    }
  }

  return { people, works };
}

/**
 * Cross-check extracted entities against the source registries.
 *
 * @param {object} item - the question
 * @param {Array} researchers - researchers.json
 * @param {Array} literaryWorks - literaryWorks.json
 * @param {Set<string>} alwaysAllow - extra always-allow set (literary authors etc.)
 * @returns {Array<{ rule, message, kind }>}
 */
export function validateEntityRegistry(item, researchers, literaryWorks, alwaysAllow) {
  const out = [];
  if (!item) return out;
  const passageText = getPassageText(item);
  if (!passageText) return out;

  // Index registries for fast lookup.
  const researcherSet = new Set(
    (researchers || []).map(r => (r.name || '').trim()).filter(Boolean)
  );
  const literaryAuthorSet = new Set(
    (literaryWorks || []).map(w => (w.author || '').trim()).filter(Boolean)
  );
  // Known work-titles include both canonical literary works AND scholarly
  // publication titles cited in researchers.json. We also fold in the
  // pre-colon "main title" form ("South to America" alongside "South to
  // America: A Journey…") because passages routinely cite the short form,
  // not the full subtitle.
  const expandTitle = (t) => {
    if (!t) return [];
    const trimmed = t.trim();
    if (!trimmed) return [];
    const beforeColon = trimmed.split(':')[0].trim();
    return beforeColon !== trimmed && beforeColon ? [trimmed, beforeColon] : [trimmed];
  };
  const literaryTitleSet = new Set([
    ...(literaryWorks || []).flatMap(w => expandTitle(w.title)),
    ...(researchers || []).flatMap(r => (r.publications || []).flatMap(p => expandTitle(p.title))),
  ]);
  const allowSet = new Set([
    ...alwaysAllow,
    ...researcherSet,
    ...literaryAuthorSet,
  ]);

  const { people, works } = extractEntities(passageText);

  // Track per-passage names already reported (don't duplicate per item).
  const reportedNames = new Set();
  for (const p of people) {
    const name = p.name && p.name.trim();
    if (!name) continue;
    if (reportedNames.has(name)) continue;
    if (allowSet.has(name)) continue;
    // Exact match at registry. Try also Last-name only for two-word names.
    if (researcherSet.has(name)) continue;
    if (literaryAuthorSet.has(name)) continue;
    // Fallback: a name that's just a last name we've already seen via title:
    // skip — we report only the introducing form.
    reportedNames.add(name);
    out.push({
      kind: 'person',
      rule: 'entity-registry',
      message: `entity-registry: researcher "${name}" not in researchers.json or literaryWorks.json`,
      name,
    });
  }
  for (const w of works) {
    if (!w.title) continue;
    if (literaryTitleSet.has(w.title)) continue;
    // Also allowlist titles named in ALWAYS_ALLOW_SEED — the seed serves as a
    // shared name/title acceptance list for canonical works (Mesoamerican
    // codices, primatology monographs, modern critical theory, etc.) that
    // aren't worth their own literaryWorks.json entry but are real, cited
    // works.
    if (allowSet.has(w.title)) continue;
    out.push({
      kind: 'work',
      rule: 'entity-registry',
      message: `entity-registry: literary work "${w.title}" not in literaryWorks.json`,
      title: w.title,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Lint check #5 — validateDistractorWords (every word in choices is a word)
// ---------------------------------------------------------------------------
//
// Use a curated denylist of audit-flagged non-words. Optionally augment with
// a wordlist if `words` package is available (left as a soft dictionary check
// — fails closed by default).

// Denylist of audit-flagged malformed tokens. These are exact (case-insensitive)
// matches; any choice text containing one of these tokens fires a
// distractor-word violation.
const DISTRACTOR_DENYLIST_TOKENS = new Set([
  'comprehensiver', 'comprehensivest', 'more comprehensiver',
  'complexs', 'detaileder', 'detailedest', 'more detaileder',
  // possessive doubles / mismatched apostrophes
  "library's'", 'librarys', "denmark's'", 'valleys\'s', "valleys's",
  // pronoun apostrophe nonsense
  "whom's", "which's",
  // any token ending with `'s'` (single-quote double): pure bank fingerprint
  // (legitimate possessive-of-plural is `parents'`, never `parent's'`)
]);

// Pattern denylist: tokens that match these regexes are non-words.
const DISTRACTOR_DENYLIST_PATTERNS = [
  // double-apostrophe possessive: "Library's'"
  /\b[A-Za-z]+'s'\b/,
  // wrong comparative/superlative on already-comparative words (-er-er, -est-er).
  // The lookahead excludes common -er words that are not comparatives ("save
  // more over their lifetimes", "carried more water") — only flag when the
  // following word plausibly double-marks a comparative.
  /\b(more|most)\s+(?!(?:over|water|other|after|never|under|whether|together|either|neither|rather|former|latter|inner|outer|upper|proper|paper|summer|winter|member|number|order|layer|matter|manner|chapter|counter|filter|master|quarter|silver|theater|wonder|power|career|consumer|computer|farmer|worker|writer|reader|teacher|researcher|painter|printer)\b)\w+er\b/i,
  /\bcomprehensiv(?:er|est)\b/i,
  /\bdetaileder\b/i,
];

/**
 * Tokenize a choice text into rough word tokens (preserves apostrophes inside
 * the token so "library's'" survives as a single token to test against the
 * denylist).
 */
function choiceTokenize(text) {
  if (!text) return [];
  // Split on whitespace and dashes; keep apostrophes inside tokens.
  return text
    .replace(/[—–]/g, ' ')
    .split(/\s+/)
    .map(t => t.replace(/^[\s,.;:?!()[\]"<>{}]+|[\s,.;:?!()[\]"<>{}]+$/g, ''))
    .filter(Boolean);
}

/**
 * Per-item lint: any non-word in any choice is a hard fail.
 *
 * @param {object} item - question record
 * @returns {Array<{ rule, message }>}
 */
export function validateDistractorWords(item) {
  const out = [];
  if (!Array.isArray(item.choices)) return out;
  for (const c of item.choices) {
    if (!c || !c.text) continue;
    const tokens = choiceTokenize(c.text);
    const offenders = new Set();
    for (const t of tokens) {
      const lower = t.toLowerCase();
      if (DISTRACTOR_DENYLIST_TOKENS.has(lower)) {
        offenders.add(t);
        continue;
      }
      for (const re of DISTRACTOR_DENYLIST_PATTERNS) {
        if (re.test(t)) {
          offenders.add(t);
          break;
        }
      }
    }
    // Also pattern-test the whole choice (catches multi-word patterns like
    // "more comprehensiver", "more detaileder").
    for (const re of DISTRACTOR_DENYLIST_PATTERNS) {
      const m = c.text.match(re);
      if (m) offenders.add(m[0]);
    }
    if (offenders.size > 0) {
      for (const off of offenders) {
        out.push({
          rule: 'distractor-word',
          message: `distractor-word: choice ${c.id} contains non-word "${off}"`,
        });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Lint check #7 — validateWithinTestCloning (no two passages ≥0.30 Jaccard)
// ---------------------------------------------------------------------------
//
// For each test, pairwise compare every item's passage to every other item's
// (within the same test only). Fail when Jaccard > 0.30 between any two.

// Within-test Jaccard threshold. Bumped 0.30 → 0.35 after the T9-T12 reauthor:
// short (~85-word) passages on different topics can still share 30-32% of
// post-stripped tokens through generic stop-word/connector overlap (e.g.,
// T10 q01 Nuttall codex vs T10 q35 Charpentier CRISPR scored 0.32 on stop
// words alone). Real clones of the same passage land Jaccard 0.6+, so the new
// threshold preserves clone detection while killing short-passage noise.
const WITHIN_TEST_JACCARD_THRESHOLD = 0.35;

/**
 * Per-test pairwise passage comparison.
 *
 * @param {Array} testItems - items in the test, each { line, item }
 * @param {number} testN
 * @returns {Array<{ testN, line, rule, message }>}
 */
export function validateWithinTestCloning(testItems, testN) {
  const fps = testItems
    .filter(b => b.item && b.item.passage)
    .map(b => ({
      line: b.line,
      qid: b.item.id,
      tokens: passageNormalizedTokens(b.item.passage),
    }))
    .filter(b => b.tokens.size >= 8);

  const violations = [];
  const seen = new Set();
  for (let i = 0; i < fps.length; i++) {
    for (let j = i + 1; j < fps.length; j++) {
      const A = fps[i];
      const B = fps[j];
      if (A.qid === B.qid) continue;
      const key = `${Math.min(A.qid, B.qid)}-${Math.max(A.qid, B.qid)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const jac = jaccardSets(A.tokens, B.tokens);
      if (jac > WITHIN_TEST_JACCARD_THRESHOLD) {
        violations.push({
          testN,
          line: A.line,
          rule: 'within-test-cloning',
          message: `within-test-cloning: practiceTest${testN}RW.js:${A.line} ↔ practiceTest${testN}RW.js:${B.line} share Jaccard ${jac.toFixed(2)} (threshold ${WITHIN_TEST_JACCARD_THRESHOLD})`,
        });
      }
    }
  }
  return violations;
}

// ---------------------------------------------------------------------------
// CLI driver
// ---------------------------------------------------------------------------
//
// `main()` dispatches by `--validate-sources` (schema check on the source
// JSON files) vs the lint pipeline (`--all` or `--test=N[,M…]`, optionally
// narrowed with `--check=stem,entity,…`). Output convention mirrors
// calibrateModule.mjs:
//
//   <file>:<line> <rule>: <message>          (per-violation, on stdout)
//   N violation(s) across K test(s) — M items linted   (summary, on stderr)
//
// Exit code is 1 if any violation fired, 0 otherwise. Bank-level findings
// (stem-distribution, choice-uniqueness, bank-skeleton) are attributed to
// the first occurrence's file:line where possible; pure bank-wide ones use
// `bank:0` as a synthetic source.

// `--check=` filter: pass-through `null` runs everything; an explicit list
// keeps only matching rule families. Names match the `rule:` prefix in
// emitted messages so `--check=stem,entity` is self-documenting.
function makeChecksFilter(checks) {
  if (!checks || checks.length === 0) return () => true;
  const set = new Set(checks);
  return (name) => set.has(name);
}

/**
 * `--validate-sources` mode: minimal schema check on the four source JSON
 * files. Per Eng F17, deeper schema validation and URL-rot scanning are
 * deferred to a future `scripts/checkSourceUrls.mjs`; this mode only
 * verifies each file loads, parses, and is a non-empty array.
 */
function runValidateSources({ strict }) {
  const sources = [
    { name: 'researchers.json', loader: loadResearchers },
    { name: 'literaryWorks.json', loader: loadLiteraryWorks },
    { name: 'crossTextPairs.json', loader: loadCrossTextPairs },
    { name: 'quantitativeData.json', loader: loadQuantitativeData },
  ];
  const violations = [];
  for (const s of sources) {
    try {
      const data = s.loader();
      if (!Array.isArray(data)) {
        violations.push({ file: s.name, line: 1, message: `source-schema: ${s.name} must export a JSON array (got ${typeof data})` });
        continue;
      }
      if (data.length === 0) {
        violations.push({ file: s.name, line: 1, message: `source-empty: ${s.name} contains 0 entries` });
        continue;
      }
      console.log(`OK   ${s.name}: ${data.length} entries`);
    } catch (e) {
      violations.push({ file: s.name, line: 1, message: `source-load: ${s.name} failed to load (${e.message})` });
    }
  }
  for (const v of violations) console.log(`${v.file}:${v.line} ${v.message}`);
  console.error(`\n${violations.length} source violation(s)${strict ? ' [strict]' : ''}`);
  process.exit(violations.length > 0 ? 1 : 0);
}

/**
 * `--all` / `--test=N` driver: load the target tests, build a flat bank-items
 * array, run every per-item / bank-level / per-test lint, aggregate the
 * violations, sort by test then line, and exit nonzero if any fired.
 */
function runLint({ mode, testNumbers, checks }) {
  const targetTests = mode === 'all'
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : testNumbers;
  const enabled = makeChecksFilter(checks);

  // Source DBs — fail fast on missing/corrupt files. Every meaningful lint
  // mode needs at least researchers / literaryWorks (for the entity-allow
  // set), so loading them up front gives a clear error if rwSources/ is
  // unset. crossTextPairs / quantitativeData are reserved for future
  // per-skill checks; load lazily when those lints land.
  const researchers = loadResearchers();
  const literaryWorks = loadLiteraryWorks();
  // crossTextPairs.json supplies the canonical Author 1 / Author 2 pairings
  // for cross-text-connections items. Fold both authors into alwaysAllow so
  // CTC items don't fail entity-registry just because the source DB for
  // pairs is separate from researchers.json.
  let crossTextPairs = [];
  try {
    crossTextPairs = loadCrossTextPairs();
  } catch (e) {
    console.error(`warning: crossTextPairs.json unavailable — CTC entity-registry checks may over-flag (${e.message})`);
  }

  // For each registered name, also include its trailing-period-stripped
  // form so passages that drop the period from "Jr.", "Sr.", or "St."
  // suffixes still match. ("Roger Pielke Jr" should look up the same
  // entry as "Roger Pielke Jr.")
  const expandName = (s) => {
    const t = (s || '').trim();
    if (!t) return [];
    const noTrailingPeriod = t.replace(/\.$/, '');
    return noTrailingPeriod !== t ? [t, noTrailingPeriod] : [t];
  };
  const alwaysAllow = new Set([
    ...ALWAYS_ALLOW_SEED,
    ...literaryWorks.flatMap(w => expandName(w.author)),
    ...crossTextPairs.flatMap(p => expandName(p?.text1?.author).concat(expandName(p?.text2?.author))),
  ]);

  // PDF corpus is whole-bank: per-item PDF uniqueness compares against the
  // entire PT4-11 cache (PTs 1-3 and 12 have no CB PDF, but the check still
  // fingerprints against the 8 available forms). Soft-fail to empty corpus
  // if the cache is absent — it's a developer-machine artifact, not a
  // shipped bank invariant.
  let pdfCorpus = [];
  if (enabled('pdf')) {
    try {
      pdfCorpus = loadPdfCorpus();
    } catch (e) {
      console.error(`warning: PDF corpus unavailable — pdf-uniqueness lints will be skipped (${e.message})`);
      pdfCorpus = [];
    }
  }

  const violations = [];
  const bankItems = []; // flat: { testN, file, line, item }

  // F13: wrap each loadRWPracticeTest in try/catch. A vm.runInContext parse
  // error in one file becomes a single `parse-error` violation rather than
  // aborting the whole run. (F13's deeper JSON-balance pre-check for
  // better line numbers is deferred to a follow-up.)
  for (const testN of targetTests) {
    let pt, src, file;
    try {
      ({ pt, src, file } = loadRWPracticeTest(testN));
    } catch (e) {
      violations.push({
        testN,
        file: `practiceTest${testN}RW.js`,
        line: 1,
        message: `parse-error: practiceTest${testN}RW.js failed to load (${e.message})`,
      });
      continue;
    }
    const fileBase = path.basename(file);
    if (!pt || !Array.isArray(pt.modules)) {
      violations.push({
        testN,
        file: fileBase,
        line: 1,
        message: `parse-error: practiceTest${testN}RW.js exports no .modules array`,
      });
      continue;
    }
    const lineIndex = indexRWQuestionLines(src);
    for (let mi = 0; mi < pt.modules.length; mi++) {
      const mod = pt.modules[mi];
      const qs = mod && Array.isArray(mod.questions) ? mod.questions : [];
      for (let qi = 0; qi < qs.length; qi++) {
        const li = lineIndex.find(L => L.moduleIndex === mi && L.modulePosition === qi + 1);
        bankItems.push({
          testN,
          file: fileBase,
          line: li ? li.startLine : 1,
          item: qs[qi],
        });
      }
    }

    // Adaptive R&W Module 2 Easy variant — lint its questions under the same
    // testN so per-item checks AND within-test-cloning (variant vs. the
    // standard modules) both fire. Absent variant file = nothing to lint.
    let variantBundle = null;
    try {
      variantBundle = loadRWM2EasyVariant(testN);
    } catch (e) {
      violations.push({
        testN,
        file: `practiceTest${testN}RWM2Easy.js`,
        line: 1,
        message: `parse-error: practiceTest${testN}RWM2Easy.js failed to load (${e.message})`,
      });
    }
    if (variantBundle?.variant?.questions) {
      const vFileBase = path.basename(variantBundle.file);
      const vIndex = indexRWQuestionLines(variantBundle.src, { requireModules: false });
      const vQs = variantBundle.variant.questions;
      for (let qi = 0; qi < vQs.length; qi++) {
        const li = vIndex.find(L => L.moduleIndex === 0 && L.modulePosition === qi + 1);
        bankItems.push({
          testN,
          file: vFileBase,
          line: li ? li.startLine : 1,
          item: vQs[qi],
          isVariant: true,
        });
      }
    }
  }

  // ---- Per-item lints -----------------------------------------------------
  for (const b of bankItems) {
    if (enabled('stem')) {
      const r = validateStem(b.item);
      if (!r.ok) {
        const skill = (b.item && b.item.skill) || '<no-skill>';
        const observed = (r.observed || '').slice(0, 100);
        const msg = r.reason === 'unknown-skill'
          ? `stem-verbatim: skill "${skill}" not in registry — no canonical stem`
          : `stem-verbatim: skill "${skill}" stem ${JSON.stringify(observed)} (expected ${JSON.stringify(r.expected)})`;
        violations.push({ testN: b.testN, file: b.file, line: b.line, message: msg });
      }
    }
    if (enabled('pdf') && pdfCorpus.length > 0) {
      for (const s of validatePdfUniqueness(b.item, pdfCorpus, b.line)) {
        violations.push({ testN: b.testN, file: b.file, line: s.line, message: s.message });
      }
    }
    if (enabled('entity')) {
      for (const s of validateEntityRegistry(b.item, researchers, literaryWorks, alwaysAllow)) {
        violations.push({ testN: b.testN, file: b.file, line: b.line, message: s.message });
      }
    }
    if (enabled('distractor')) {
      for (const s of validateDistractorWords(b.item)) {
        violations.push({ testN: b.testN, file: b.file, line: b.line, message: s.message });
      }
    }
  }

  // ---- Bank-level lints ---------------------------------------------------
  if (enabled('stem-distribution')) {
    const { violations: vs } = validateStemDistribution(bankItems.map(b => b.item));
    for (const v of vs) {
      violations.push({ testN: 0, file: 'bank', line: 0, message: v.message });
    }
  }
  if (enabled('choice-uniqueness')) {
    for (const v of validateChoiceUniqueness(bankItems)) {
      violations.push({
        testN: v.testN,
        file: `practiceTest${v.testN}RW.js`,
        line: v.line,
        message: v.message,
      });
    }
  }
  if (enabled('skeleton')) {
    for (const v of validateBankSkeletons(bankItems)) {
      violations.push({
        testN: v.testN,
        file: `practiceTest${v.testN}RW.js`,
        line: v.line,
        message: v.message,
      });
    }
  }

  // ---- Underline-markup contract (2026-09-01) -----------------------------
  // A question that says "underlined" must have a passage carrying paired
  // __...__ markup (parsePassageMarkup's underline token). Caught in the wild:
  // wave-1 items italicized the target sentence with *...* (renders as <em>,
  // not <u>) and one item carried no markup at all — students saw "the
  // underlined sentence" with nothing underlined.
  if (enabled('underline-markup')) {
    for (const b of bankItems) {
      if (!targetTests.includes(b.testN) || !b.item) continue;
      const q = b.item.question || '';
      if (!/underlined/i.test(q)) continue;
      const p = b.item.passage || '';
      if (!/__[^_]{10,}__/.test(p)) {
        violations.push({
          testN: b.testN,
          file: `practiceTest${b.testN}RW.js`,
          line: b.line,
          message: `underline-markup: question references "underlined" but the passage has no paired __...__ markup (id ${b.item.id})`,
        });
      }
    }
  }

  // ---- Per-test lints -----------------------------------------------------
  if (enabled('within-test-cloning')) {
    for (const testN of targetTests) {
      const items = bankItems.filter(b => b.testN === testN);
      for (const v of validateWithinTestCloning(items, testN)) {
        violations.push({
          testN: v.testN,
          file: `practiceTest${v.testN}RW.js`,
          line: v.line,
          message: v.message,
        });
      }
    }
  }

  // ---- Exploit-layer lints (2026-06-10 audit) ------------------------------
  // Encode the audit's exploitable patterns as permanent gates: answer-key
  // letter bias, longest-answer-is-correct giveaways, the cross-text
  // By-gerund choice skeleton, recipe-label explanations, choice bloat, the
  // frozen blueprint, and cross-test primary-anchor reuse. Each gate exists
  // because the 2026-05 reauthoring shipped lint-clean while a student
  // could still pattern-match their way through the catalog.
  for (const testN of targetTests) {
    const allRows = bankItems.filter(b => b.testN === testN);
    if (allRows.length === 0) continue;
    // Aggregate checks run per served test form: the standard 54-item form
    // and (when present) the M2-easy variant as its own 27-item module.
    // Mixing them would count 81 items against 54-item bands and blame the
    // wrong file.
    const groups = [
      { rows: allRows.filter(b => !b.isVariant), fileLabel: `practiceTest${testN}RW.js`, isVariant: false },
    ];
    const varRows = allRows.filter(b => b.isVariant);
    if (varRows.length > 0) {
      groups.push({ rows: varRows, fileLabel: `practiceTest${testN}RWM2Easy.js`, isVariant: true });
    }
    for (const g of groups) {
      if (g.rows.length === 0) continue;
      if (enabled('answer-key-balance')) {
        for (const v of validateAnswerKeyBalance(g.rows, testN, g)) violations.push(v);
      }
      if (enabled('longest-answer')) {
        for (const v of validateLongestAnswerRate(g.rows, testN, g.fileLabel)) violations.push(v);
      }
      if (enabled('xtx-skeleton')) {
        for (const v of validateCrossTextChoiceForms(g.rows, testN)) violations.push(v);
      }
      if (enabled('recipe-labels')) {
        for (const v of validateExplanationHygiene(g.rows, testN)) violations.push(v);
      }
      if (enabled('choice-caps')) {
        for (const v of validateChoiceCaps(g.rows, testN)) violations.push(v);
      }
      if (enabled('blueprint')) {
        for (const v of validateModuleBlueprint(g.rows, testN, g)) violations.push(v);
      }
    }
  }
  if (enabled('anchor-uniqueness') && targetTests.length === 12) {
    for (const v of validatePrimaryAnchorUniqueness(bankItems)) violations.push(v);
  }

  // ---- Emit ---------------------------------------------------------------
  // Sort by testN numerically (0 = bank-wide synthesized rows first), then
  // by line. Alphabetic sort would put PT10 before PT1, which is annoying
  // when triaging a long output.
  violations.sort((a, b) => {
    if (a.testN !== b.testN) return a.testN - b.testN;
    return (a.line || 0) - (b.line || 0);
  });
  for (const v of violations) {
    console.log(`${v.file}:${v.line || 0} ${v.message}`);
  }
  // Summary on stderr so stdout stays a clean stream of violations.
  console.error(`\n${violations.length} violation(s) across ${targetTests.length} test(s) — ${bankItems.length} items linted`);
  process.exit(violations.length > 0 ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Exploit-layer lints (2026-06-10 audit). All operate on the flat
// { testN, file, line, item } rows that runLint builds.
// ---------------------------------------------------------------------------

const EXPLOIT_PROSE_SKILLS = new Set([
  'cross-text-connections', 'rhetorical-synthesis', 'command-of-evidence-textual',
  'central-ideas-and-details', 'inferences', 'text-structure-and-purpose',
]);
const EXPLOIT_CHOICE_CAPS = {
  'cross-text-connections': 40, 'rhetorical-synthesis': 45,
  'command-of-evidence-textual': 45, 'central-ideas-and-details': 40,
  'inferences': 40, 'text-structure-and-purpose': 40,
};
// Per-module skill counts after the 2026-06-10 re-blueprint (official-range
// midpoints: C&S 8, I&I 8, SEC 6, EoI 5 per 27-question module).
const EXPLOIT_MODULE_COUNTS = {
  'words-in-context': 4, 'text-structure-and-purpose': 3, 'cross-text-connections': 1,
  'central-ideas-and-details': 3, 'command-of-evidence-textual': 1,
  'command-of-evidence-quantitative': 2, 'inferences': 2,
  boundaries: 3, 'form-structure-and-sense': 3, transitions: 3, 'rhetorical-synthesis': 2,
};

function exploitWordCount(s) {
  return ((s || '').match(/[\w'-]+/g) || []).length;
}

/** Each answer letter must appear 10-17 times per 54-item test (random keys
 *  land ~13.5; the audit found A keyed on 96% of one test's items). The
 *  27-item M2-easy variant scales the band to 4-10 (~6.75 expected). */
function validateAnswerKeyBalance(items, testN, { fileLabel = null, isVariant = false } = {}) {
  const out = [];
  const [lo, hi] = isVariant ? [4, 10] : [10, 17];
  const unitLabel = isVariant ? 'per module' : 'per test';
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const b of items) counts[b.item.correctAnswer] = (counts[b.item.correctAnswer] || 0) + 1;
  for (const letter of ['A', 'B', 'C', 'D']) {
    if (counts[letter] < lo || counts[letter] > hi) {
      out.push({
        testN, file: fileLabel || `practiceTest${testN}RW.js`, line: 0,
        message: `[answer-key-balance] letter ${letter} keyed ${counts[letter]}x (allowed ${lo}-${hi} ${unitLabel})`,
      });
    }
  }
  return out;
}

/** The uniquely-longest choice must not be the correct one in more than 45%
 *  of a test's prose-choice items (audit: 81.5% product-wide, 100% in
 *  rhetorical synthesis — a no-read scoring strategy). */
function validateLongestAnswerRate(items, testN, fileLabel = null) {
  const prose = items.filter(b => EXPLOIT_PROSE_SKILLS.has(b.item.skill)
    && Array.isArray(b.item.choices) && b.item.choices.length === 4);
  if (prose.length < 8) return [];
  let longestCorrect = 0;
  for (const b of prose) {
    const lens = b.item.choices.map(c => exploitWordCount(c.text));
    const maxLen = Math.max(...lens);
    const winners = b.item.choices.filter((c, i) => lens[i] === maxLen);
    if (winners.length === 1 && winners[0].id === b.item.correctAnswer) longestCorrect++;
  }
  const rate = longestCorrect / prose.length;
  if (rate > 0.45) {
    return [{
      testN, file: fileLabel || `practiceTest${testN}RW.js`, line: 0,
      message: `[longest-answer] uniquely-longest choice is correct in ${longestCorrect}/${prose.length} prose items (${Math.round(rate * 100)}%; cap 45%)`,
    }];
  }
  return [];
}

/** Cross-text items must not present all four choices in the 'By <gerund>'
 *  frame (the single most recognizable generator tell), and 'By concluding'
 *  must not recur as a distractor opener (audit: 26 distractors, 0 correct). */
function validateCrossTextChoiceForms(items, testN) {
  const out = [];
  let byConcluding = 0;
  for (const b of items) {
    if (b.item.skill !== 'cross-text-connections') continue;
    const choices = b.item.choices || [];
    if (choices.length === 4 && choices.every(c => /^By\s+\w+ing\b/.test((c.text || '').trim()))) {
      out.push({
        testN, file: b.file, line: b.line,
        message: `[xtx-skeleton] all four cross-text choices use the By-gerund frame (id ${b.item.id})`,
      });
    }
    for (const c of choices) {
      if (/^By concluding\b/.test((c.text || '').trim()) && c.id !== b.item.correctAnswer) byConcluding++;
    }
  }
  if (byConcluding > 1) {
    out.push({
      testN, file: `practiceTest${testN}RW.js`, line: 0,
      message: `[xtx-skeleton] 'By concluding...' opens ${byConcluding} distractors in this test (product-wide elimination tell; allow at most 1)`,
    });
  }
  return out;
}

/** Explanations must not carry the labeled-distractor recipe the generator
 *  used ('Why the wrong answers are tempting:' + surface/inverse/scope
 *  labels), and the stated correct letter must match the key. */
function validateExplanationHygiene(items, testN) {
  const out = [];
  for (const b of items) {
    const exp = b.item.explanation || '';
    if (exp.includes('Why the wrong answers are tempting')) {
      out.push({
        testN, file: b.file, line: b.line,
        message: `[recipe-labels] explanation still contains the recipe block (id ${b.item.id})`,
      });
    }
    const m = exp.match(/answer is\s+([A-D])\b/);
    if (m && m[1] !== b.item.correctAnswer) {
      out.push({
        testN, file: b.file, line: b.line,
        message: `[recipe-labels] explanation names ${m[1]} but key is ${b.item.correctAnswer} (id ${b.item.id})`,
      });
    }
  }
  return out;
}

/** Prose choices are capped per skill (audit: 50-90-word cross-text choices
 *  vs CB's 15-40) and must stay within ~2.4x of each other in length. */
function validateChoiceCaps(items, testN) {
  const out = [];
  for (const b of items) {
    const cap = EXPLOIT_CHOICE_CAPS[b.item.skill];
    if (!cap || !Array.isArray(b.item.choices)) continue;
    const lens = b.item.choices.map(c => exploitWordCount(c.text));
    if (Math.max(...lens) > cap) {
      out.push({
        testN, file: b.file, line: b.line,
        message: `[choice-caps] ${b.item.skill} choice runs ${Math.max(...lens)}w (cap ${cap}w) (id ${b.item.id})`,
      });
    }
    if (Math.min(...lens) >= 4 && Math.max(...lens) / Math.min(...lens) > 2.4) {
      out.push({
        testN, file: b.file, line: b.line,
        message: `[choice-caps] choice length spread ${Math.min(...lens)}-${Math.max(...lens)}w exceeds 2.4x parity (id ${b.item.id})`,
      });
    }
  }
  return out;
}

/** Each 27-question module must match the official-range blueprint counts.
 *  (Order within the module is enforced by the authoring gate; counts are
 *  the shippable invariant here.) */
function validateModuleBlueprint(items, testN, { fileLabel = null, isVariant = false } = {}) {
  const out = [];
  const byModule = new Map();
  if (isVariant) {
    // The M2-easy variant is a single 27-question module held to the same
    // per-module blueprint counts as the standard modules.
    byModule.set('2-easy', items);
  } else if (items.length === 54 && items.some(b => b.item.module == null)) {
    // Assembled tests carry module via position: first 27 = module 1.
    byModule.set(1, items.slice(0, 27));
    byModule.set(2, items.slice(27));
  } else {
    for (const b of items) {
      const mod = b.item.module ?? 1;
      if (!byModule.has(mod)) byModule.set(mod, []);
      byModule.get(mod).push(b);
    }
  }
  for (const [mod, rows] of byModule) {
    const counts = {};
    for (const b of rows) counts[b.item.skill] = (counts[b.item.skill] || 0) + 1;
    for (const [skill, want] of Object.entries(EXPLOIT_MODULE_COUNTS)) {
      if ((counts[skill] || 0) !== want) {
        out.push({
          testN, file: fileLabel || `practiceTest${testN}RW.js`, line: 0,
          message: `[blueprint] module ${mod}: ${skill} x${counts[skill] || 0} (blueprint wants ${want})`,
        });
      }
    }
  }
  return out;
}

/** The primary anchor (first person-shaped proper noun in the passage) must
 *  not be the subject of items in more than one test — the audit found Vera
 *  Rubin in 9 items across 7 tests, retelling the same discovery story. */
function validatePrimaryAnchorUniqueness(bankItems) {
  const namePat = /\b([A-Z][a-zé'-]+(?:\s+(?:de|van|von|al-|El-)?[A-Z][a-zA-Zé'-]+){1,2})\b/;
  const skip = new Set(['The Following', 'Standard English', 'United States', 'New York', 'World War',
    'Project Gutenberg', 'College Board', 'North America', 'South America', 'Civil War', 'Middle Ages',
    // Institutional data sources CB itself cites across many forms, plus
    // regional adjectives and phrase noise the first-noun heuristic catches.
    'Pew Research Center', 'The Pew Research', 'Disease Control', 'Census Bureau',
    'North American', 'South American', 'West African', 'East African', 'Each September',
    'Ottoman Empire', 'United Nations', 'National Oceanic', 'European Space',
    'Second World War', 'First World War', 'Cold War', 'Great Depression']);
  const anchorTests = new Map(); // anchor -> Map(testN -> [ids])
  for (const b of bankItems) {
    let text = b.item.passage || '';
    if (!text && Array.isArray(b.item.passages)) text = b.item.passages.map(p => p.text).join(' ');
    const m = text.match(namePat);
    if (!m || skip.has(m[1])) continue;
    const anchor = m[1];
    if (!anchorTests.has(anchor)) anchorTests.set(anchor, new Map());
    const perTest = anchorTests.get(anchor);
    if (!perTest.has(b.testN)) perTest.set(b.testN, []);
    perTest.get(b.testN).push(b.item.id);
  }
  const out = [];
  for (const [anchor, perTest] of anchorTests) {
    if (perTest.size > 1) {
      const where = Array.from(perTest.entries()).map(([t, ids]) => `T${t}:${ids.join(',')}`).join(' ');
      out.push({
        testN: 0, file: 'bank', line: 0,
        message: `[anchor-uniqueness] "${anchor}" is the primary anchor in ${perTest.size} tests (${where}) — one owner per anchor`,
      });
    }
  }
  return out;
}

function main() {
  const opts = parseArgs(process.argv);
  if (opts.mode === 'validate-sources') {
    return runValidateSources(opts);
  }
  return runLint(opts);
}

function isMainModule() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === `file://${entry}`
    || import.meta.url.endsWith(path.basename(entry));
}

if (isMainModule()) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
