/**
 * R&W sub-pattern taggers. This module exports TWO functions with deliberately
 * different scopes — keep them straight:
 *
 *   deriveRWPattern(item)      — the ROUTING signal. Grammar/punctuation/structure
 *     only (boundaries / transitions / text-structure-and-purpose /
 *     form-structure-and-sense). Feeds diagnosticEngine's weakness.missedPatterns
 *     → Tier-1 drill routing and the bank's grammar pattern index. All seven
 *     reading-comprehension skills (incl. command-of-evidence-textual) return
 *     null — R&W exact-match routing is deferred (see
 *     index.js::getTargetedWeaknessSet).
 *
 *   deriveRWQuestionType(item) — the BROWSE type. Everything deriveRWPattern
 *     returns, PLUS the seven reading-comprehension skills' question types from
 *     the authoritative per-item map (rwReadingType.js): context-clue type,
 *     logical relation, Text-2 stance, rhetorical goal. Drives the Practice
 *     Bank's "question type" breakdown and the bank index's `rwPattern` field.
 *
 * Splitting them lets the Practice Bank surface reading sub-types for browsing
 * WITHOUT activating the deferred reading-type drill routing.
 *
 * Every grammar tag derives from `choices`/`correctAnswer`/`question` (present on
 * 100% of items), so it is immune to the sparse `_meta` fields; reading tags come
 * from the authoritative map (deterministic stem/goal rules + the
 * rw-reading-type-classify diverse-lens panel).
 *
 * @param {object} item - an R&W item (bundle shape or flattened bank shape)
 * @returns {string|null} kebab-case pattern slug, or null for skill-level
 */

import { getAuthoritativeGrammarType } from './rwGrammarType';
import { getReadingType } from './rwReadingType';

// Transition lexicons by bucket. Flattened + sorted longest-phrase-first so
// "on the other hand" wins over "on" and "therefore" wins over "then".
// 'moreover'/'furthermore'/'in addition' are deliberately absent — the
// 'addition' bucket is below the Tier-1 threshold, so those items stay Tier-3.
const TRANSITION_BUCKETS = {
  'transitions-contrast': [
    'on the other hand', 'in contrast', 'by contrast', 'even so', 'despite this',
    'however', 'nevertheless', 'nonetheless', 'conversely', 'instead', 'rather',
    'regardless', 'still', 'yet',
    // 2026-08-13 predictability fixes: concession/juxtaposition keys promoted
    // from permanent-decoy status ('granted' at PT10 M2E, 'by comparison' at
    // PT12) — bucketed here so they keep Tier-1 drill routing.
    'granted', 'by comparison',
  ],
  'transitions-example-emphasis': [
    'for example', 'for instance', 'in particular', 'in other words', 'in fact',
    'that is', 'specifically', 'indeed', 'notably', 'namely',
  ],
  'transitions-cause-effect': [
    'as a result', 'for this reason', 'because of this', 'therefore', 'thus',
    'consequently', 'hence', 'accordingly', 'so',
    // 2026-08-13: 'in turn' keys entered the corpus with the predictability
    // fixes (chained-consequence passages); bucket them here so those items
    // keep Tier-1 drill routing instead of falling to Tier-3.
    'in turn',
  ],
  'transitions-sequence-time': [
    'more recently', 'since then', 'in time', 'before long', 'meanwhile',
    'subsequently', 'afterward', 'eventually', 'ultimately', 'throughout',
    'finally', 'later', 'then', 'today', 'first', 'second', 'next',
    // 2026-08-13: 'thereafter' key promoted from permanent-decoy status (PT5).
    'thereafter',
  ],
};

const TRANSITION_LEXICON = Object.entries(TRANSITION_BUCKETS)
  .flatMap(([slug, phrases]) => phrases.map(phrase => [phrase, slug]))
  .sort((a, b) => b[0].length - a[0].length);

/** Text of the choice flagged as correct, or '' if not resolvable. */
function correctChoiceText(item) {
  const choices = Array.isArray(item.choices) ? item.choices : [];
  const correct = choices.find(c => c && c.id === item.correctAnswer);
  return correct && typeof correct.text === 'string' ? correct.text : '';
}

function boundariesPattern(item) {
  const text = correctChoiceText(item);
  if (!text) return null;
  if (/[—–]|--/.test(text)) return 'boundaries-dash';   // em-dash, en-dash, or '--' (highest priority)
  if (text.includes(';')) return 'boundaries-semicolon';
  if (text.includes(':')) return 'boundaries-colon';
  if (text.includes(',')) return 'boundaries-comma';
  return null;                                            // no-mark items stay Tier-3
}

function transitionsPattern(item) {
  const text = correctChoiceText(item).toLowerCase().replace(/^\s+/, '');
  if (!text) return null;
  for (const [phrase, slug] of TRANSITION_LEXICON) {
    if (text.startsWith(phrase)) {
      const after = text.charAt(phrase.length);
      if (after === '' || !/[a-z]/.test(after)) return slug;   // word boundary
    }
  }
  return null;
}

function tspPattern(item) {
  const stem = (item.question || '').toLowerCase();
  if (stem.includes('main purpose')) return 'tsp-main-purpose';
  if (stem.includes('overall structure')) return 'tsp-overall-structure';
  if (stem.includes('function of the underlined')) return 'tsp-function-of-underlined';
  return null;
}

// form-structure-and-sense grammar sub-patterns — FALLBACK heuristic only.
//
// As of 2026-06-17 every live FSS item is classified authoritatively in
// `rwGrammarType.js` (by what varies across the answer choices), and fssPattern
// consults that map first. This prose-scoped heuristic now serves only FSS items
// that are NOT yet in the authoritative map (e.g. newly authored ones) — and a
// regression test fails CI if any live FSS item ships untagged, so reliance on
// this fallback is bounded. It reads the FIRST paragraph of the explanation,
// before the distractor discussion; precedence runs most-distinctive-structural
// first and the generic verb-tense LAST. NOTE: this ordering is imperfect (it is
// exactly why the authoritative map exists — "opening phrase" wording could pull
// a verb-tense item into modifier-placement); the map supersedes it for all
// current items. Of the 7 buckets, only the 4 that clear the Tier-1 threshold
// are labeled (RW_PATTERN_LABELS); the rest route Tier-3 and show no chip.
const FSS_RULES = [
  ['fss-parallelism', /parallel|coordinated (?:series|list)|(?:three|two|four)-item (?:list|series)|gerund-gerund/],
  ['fss-modifier-placement', /dangling|introductory (?:participial|modifier)|participial (?:introductory|opener|phrase|modifier)|modifier (?:attaches|must|should)|fronted modifier|opening (?:phrase|participial)/],
  ['fss-possessive', /possessive|apostrophe/],
  ['fss-comparison', /\bfewer\b|comparative|superlative|count nouns?|non-?count/],
  ['fss-subject-verb-agreement', /subject[- ]verb agreement|agree (?:in number|with (?:its|the) (?:head|singular|plural))|verb (?:must|to) agree|singular verb|plural verb/],
  ['fss-pronoun', /\bpronoun|\bantecedent|\bwhom\b|relative pronoun|objective form|pronoun case/],
  ['fss-verb-tense', /simple past|present perfect|past perfect|simple present|verb tense|verb form|past tense|present tense|\btense\b|\baspect\b/],
];

function fssPattern(item) {
  // Authoritative per-item tag wins. It is decided by what varies across the
  // answer choices (the reliable signal) rather than by explanation prose, so
  // it never mis-files a verb-tense / subject-verb item into "Modifier
  // placement." Present for every live FSS item; `undefined` means untagged
  // (future items) → fall through to the heuristic below. A tagged `null` is
  // authoritative ("no surfaced bucket") and short-circuits the heuristic.
  const authoritative = getAuthoritativeGrammarType(item);
  if (authoritative !== undefined) return authoritative;

  const firstPara = (item.explanation || '').split(/Why the wrong answers/i)[0].toLowerCase();
  if (!firstPara) return null;
  for (const [slug, re] of FSS_RULES) {
    if (re.test(firstPara)) return slug;
  }
  return null;
}

/**
 * deriveRWPattern — the ROUTING signal: grammar/punctuation/structure sub-patterns
 * only (boundaries / transitions / text-structure-and-purpose / form-structure-
 * and-sense). These are stable mechanical sub-skills, so they feed diagnostic
 * `missedPatterns` → Tier-1 drill routing. Reading-comprehension skills (all
 * seven, incl. command-of-evidence-textual) return null here ON PURPOSE: R&W
 * exact-match drill routing is deliberately deferred (see
 * rwBank/index.js::getTargetedWeaknessSet). For the Practice Bank's "question
 * type" BROWSE breakdown — which DOES surface reading sub-types — use
 * deriveRWQuestionType below.
 */
export function deriveRWPattern(item) {
  if (!item) return null;
  const skill = item.skill || (Array.isArray(item.skills) ? item.skills[0] : null);
  switch (skill) {
    case 'boundaries': return boundariesPattern(item);
    case 'transitions': return transitionsPattern(item);
    case 'text-structure-and-purpose': return tspPattern(item);
    case 'form-structure-and-sense': return fssPattern(item);
    default: return null;
  }
}

// The seven reading-comprehension skills whose BROWSE question types come from
// the authoritative per-item map (rwReadingType.js) — context-clue type, logical
// relation, Text-2 stance, rhetorical goal — rather than a mechanical signal in
// the correct answer.
const READING_SKILLS = new Set([
  'words-in-context',
  'central-ideas-and-details',
  'inferences',
  'command-of-evidence-quantitative',
  'command-of-evidence-textual',
  'cross-text-connections',
  'rhetorical-synthesis',
]);

/**
 * deriveRWQuestionType — the BROWSE type for the Practice Bank's question-type
 * breakdown (PracticeBank.buildRWCategories + the bank index's `rwPattern`
 * field). For the seven reading skills it returns the authoritative reading
 * sub-type (rwReadingType.js); for grammar/structure skills it returns the same
 * slug as deriveRWPattern. Distinct from deriveRWPattern so that surfacing
 * reading types for BROWSING does not also activate the deferred reading-type
 * drill routing (deriveRWPattern stays the routing signal, grammar-only).
 *
 * @param {object} item - an R&W item (bundle shape or flattened bank shape)
 * @returns {string|null} kebab-case question-type slug, or null for skill-level
 */
export function deriveRWQuestionType(item) {
  if (!item) return null;
  const skill = item.skill || (Array.isArray(item.skills) ? item.skills[0] : null);
  if (READING_SKILLS.has(skill)) {
    const rt = getReadingType(item);
    return rt === undefined ? null : rt;   // authoritative (incl. null → Tier-3)
  }
  return deriveRWPattern(item);
}

/**
 * Human labels for the routing-useful R&W grammar/punctuation/structure
 * patterns, used by the "Practicing: <pattern>" drill chip. Sub-threshold
 * grammar buckets (fss-pronoun / fss-possessive / fss-comparison) are omitted —
 * they surface in the Practice Bank browse list (via RW_READING_TYPE_LABELS'
 * sibling map) but never as a routing chip.
 */
export const RW_PATTERN_LABELS = {
  'boundaries-semicolon': 'Semicolons & independent clauses',
  'boundaries-comma': 'Comma boundaries',
  'boundaries-dash': 'Dashes',
  'boundaries-colon': 'Colons',
  'transitions-contrast': 'Contrast transitions',
  'transitions-example-emphasis': 'Example & emphasis transitions',
  'transitions-cause-effect': 'Cause & effect transitions',
  'transitions-sequence-time': 'Sequence & time transitions',
  'tsp-main-purpose': 'Main purpose',
  'tsp-overall-structure': 'Overall text structure',
  'tsp-function-of-underlined': 'Function of a sentence',
  // form-structure-and-sense grammar sub-patterns (only the >=8 buckets are
  // labeled; pronoun/possessive/comparison stay sub-threshold + chip-less).
  'fss-subject-verb-agreement': 'Subject-verb agreement',
  'fss-verb-tense': 'Verb tense & form',
  'fss-modifier-placement': 'Modifier placement',
  'fss-parallelism': 'Parallel structure',
};
