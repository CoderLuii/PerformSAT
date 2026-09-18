#!/usr/bin/env node
/**
 * recreateRWFills.mjs — orchestrator for the R&W drill-fill recreation
 * (docs/BANK_RECREATION_SPEC.md, scope row "R&W drill fills").
 *
 * Target corpus: the 41 drill-only reading items in
 * src/data/questions/rwBank/authoredReadingItems.js (raw ids 9001..9041,
 * flattened into the bank as `rw-authored-<id>`). They exist to fill reading
 * sub-type buckets that the 12 recreated practice tests leave under the
 * drillable threshold, so each item's BUCKET is frozen — as are its id, skill,
 * domain, difficulty, band, and type. Only the student-facing content is
 * replaced.
 *
 * WHY: the current fills cite FICTIONAL poets, novelists, critics, and works
 * ("the fictional poet Marguerite Vell", "Edith Calloway's 1889 novel The
 * Return to Wychwood"). Every literary quotation must become genuine
 * public-domain text, verbatim and correctly attributed, and every named
 * person must be real and registered in scripts/generated/rwSources/.
 *
 * Usage:
 *   node scripts/recreateRWFills.mjs manifest
 *   node scripts/recreateRWFills.mjs check [--id=9001 | --all] [--from-live] [--no-uniq]
 *   node scripts/recreateRWFills.mjs assemble [--dry] [--id=9001,9002]
 *   node scripts/recreateRWFills.mjs verify [--no-uniq]
 *   node scripts/recreateRWFills.mjs status
 *   node scripts/recreateRWFills.mjs solvesheet
 *   node scripts/recreateRWFills.mjs --help
 *
 * Authored JSON lives at
 *   scripts/generated/authored/bank/rwFills/rw-authored-{rawId}.json   (committed)
 * Manifest / chunk / solvesheet at
 *   scripts/generated/rwFillRecreation/                                (gitignored)
 *
 * NOTE (node ESM): src/data/questions/rwBank/{index,deriveRWPattern}.js use
 * extensionless relative imports, so they do not load under plain node. This
 * script imports authoredReadingItems.js + rwReadingType.js directly (both
 * import-free) and loads deriveRWPattern through a rewritten shim written to
 * scripts/generated/rwFillRecreation/.cache/ — never touching src/.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { indexCorpus, checkUniquenessSliding, tokenize } from './calibrateModule.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GEN = path.join(ROOT, 'scripts', 'generated');
const SOURCES_DIR = path.join(GEN, 'rwSources');
const AUTHORED = path.join(GEN, 'authored', 'bank', 'rwFills');
const WORK = path.join(GEN, 'rwFillRecreation');
const CHUNK_ID = 'rw-fills-01';
const RWBANK = path.join(ROOT, 'src', 'data', 'questions', 'rwBank');
const SHARD = path.join(RWBANK, 'authoredReadingItems.js');
const TESTS_DIR = path.join(ROOT, 'src', 'data', 'practiceTests');
const LEDGER = path.join(GEN, 'recreation-topic-ledger.md');

const PASSAGE_MAX_WORDS = 160;
const PARITY_MAX = 2.4;
const PARITY_MIN_WORDS = 6;          // single-word transition choices are exempt
const LONGEST_TELL_MAX = 0.45;
const INTRA_JACCARD = 0.78;
const PD_CUTOFF_YEAR = 1929;         // US public domain as of 2026: published before 1929

const USAGE = `recreateRWFills.mjs — R&W drill-fill recreation (41 items, ids 9001-9041)

  manifest                       write manifest.json + chunks/${CHUNK_ID}.json
  check [--id=N | --all]         validate authored JSON against the contract
        [--from-live]            ...using the CURRENT live items as the authored input
        [--no-uniq]              skip the uniqueness gate (fast iteration)
  assemble [--dry] [--id=N,...]  splice authored JSON into authoredReadingItems.js
  verify [--no-uniq]             live items == authored JSON + all gates on live data
  status                         authored / live / buckets / fictional-attribution count
  solvesheet                     write solvesheets/${CHUNK_ID}.json for the verifier

Authored JSON: scripts/generated/authored/bank/rwFills/rw-authored-{id}.json
Briefs:        scripts/generated/rwFillRecreation/RW_FILL_{,VERIFY_}BRIEF.md`;

// ─── argv ───────────────────────────────────────────────────────────────────
const cmd = process.argv[2];
const args = Object.fromEntries(process.argv.slice(3).map(a => {
  const m = a.match(/^--([\w-]+)(?:=(.*))?$/);
  return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true];
}));

// ─── small helpers ──────────────────────────────────────────────────────────
const wordCount = s => String(s || '').split(/\s+/).filter(Boolean).length;
const median = a => { if (!a.length) return null; const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };
const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const stripDiacritics = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');

// Content fields an authoring agent may set. Everything else is frozen.
const CONTENT_FIELDS = ['question', 'passage', 'studentNotes', 'choices', 'correctAnswer', 'explanation'];
// Provenance the author supplies; carried into the live item's `_meta`, not to top level.
const PROVENANCE_FIELDS = ['source', 'people'];
const FROZEN_FIELDS = ['id', 'rawId', 'type', 'difficulty', 'band', 'domain', 'skill', 'bucket'];

// ─── bucket contract ────────────────────────────────────────────────────────
// `container` — 'passage' | 'notes'      (which stimulus shape the bucket takes)
// `stem`      — expected stem shape (WARN on mismatch; stems are CB stock text)
// `derived`   — true when the bucket is DERIVED from the item's content by
//               deriveRWQuestionType (transitions / text-structure), so the
//               content must reproduce it exactly (FAIL on mismatch). Buckets
//               keyed in RW_READING_TYPE_BY_ID are frozen by id instead.
export const BUCKET_FORMS = {
  'coe-text-illustrate-quote': {
    container: 'passage',
    stem: /Which quotation from .+ most effectively illustrates/i,
    quotesRequired: true,
    mechanics: 'Passage frames a named literary work and states a reader\'s/critic\'s CLAIM about it. The four choices are verbatim quotations from that work; only one enacts BOTH halves of the claim.',
  },
  'coe-text-support-finding': {
    container: 'passage',
    stem: /would be most useful|most (?:strongly|effectively) supports?/i,
    mechanics: 'Passage states a researcher\'s hypothesis/finding; the choices are candidate findings and one supports the stated claim.',
  },
  'inf-prediction-expectation': {
    container: 'passage',
    blank: true,
    stem: /Which choice most logically completes the text\?/,
    mechanics: 'Passage states a general rule plus a specific case, then breaks off at ______. The answer is the FORWARD-LOOKING expectation the rule forces for that case — not a restatement, not a stronger claim than the rule licenses.',
  },
  'inf-generalization-conclusion': {
    container: 'passage',
    blank: true,
    stem: /Which choice most logically completes the text\?/,
    mechanics: 'Passage supplies evidence with a stated limit; the answer is the GENERAL conclusion that the evidence supports and no more (the limit must survive in the correct choice).',
  },
  'inf-cause-effect': { container: 'passage', blank: true, stem: /Which choice most logically completes the text\?/, mechanics: 'Completion whose logical relation is causal.' },
  'inf-contrast-qualification': { container: 'passage', blank: true, stem: /Which choice most logically completes the text\?/, mechanics: 'Completion that qualifies or contrasts with the preceding claim.' },
  'inf-comparison': { container: 'passage', blank: true, stem: /Which choice most logically completes the text\?/, mechanics: 'Completion resting on a comparison between two cases.' },
  'cid-main-idea': {
    container: 'passage',
    stem: /Which choice best states the main idea of the text\?/,
    mechanics: 'Whole-text main idea. Distractors: a true supporting detail, an over-generalization, an out-of-scope claim.',
  },
  'cid-supporting-detail': { container: 'passage', stem: /According to the text|Based on the text/i, mechanics: 'A specific detail the text states, not the main idea.' },
  'wic-example-or-illustration': {
    container: 'passage',
    blank: true,
    stem: /Which choice completes the text with the most logical and precise word or phrase\?/,
    mechanics: 'The context clue is a LIST of concrete examples before/after the blank; the answer is the category word those examples instantiate.',
  },
  'wic-contrast': {
    container: 'passage',
    blank: true,
    stem: /Which choice completes the text with the most logical and precise word or phrase\?/,
    mechanics: 'The context clue is a CONTRAST (but / yet / rather than / not…so much as); the answer opposes the flagged term.',
  },
  'wic-restatement': { container: 'passage', blank: true, stem: /Which choice completes the text with the most logical and precise word or phrase\?/, mechanics: 'The clue restates the blank in other words.' },
  'wic-cause-effect': { container: 'passage', blank: true, stem: /Which choice completes the text with the most logical and precise word or phrase\?/, mechanics: 'The clue is a cause/consequence relation.' },
  'rs-emphasize-similarity': {
    container: 'notes',
    stem: /Which choice most effectively uses relevant information from the notes to accomplish this goal\?/,
    goal: /similarit|both|in common|share/i,
    mechanics: 'studentNotes describe TWO subjects; the goal asks to emphasize a similarity. Only the choice that names both subjects AND the shared property works; distractors are true-but-one-sided or emphasize a difference.',
  },
  'rs-present-claim': {
    container: 'notes',
    stem: /Which choice most effectively uses relevant information from the notes to accomplish this goal\?/,
    goal: /claim|argu|thesis|position/i,
    mechanics: 'studentNotes summarize a scholar\'s argument; the goal asks to present the central CLAIM. Distractors report method, biography, or a subsidiary observation.',
  },
  'rs-explain-finding': {
    container: 'notes',
    stem: /Which choice most effectively uses relevant information from the notes to accomplish this goal\?/,
    goal: /explain|why|account for/i,
    mechanics: 'studentNotes supply a puzzle plus its explanation; the goal asks to EXPLAIN the finding, so the answer must state the causal link, not merely restate the finding.',
  },
  'rs-emphasize-significance': { container: 'notes', stem: /Which choice most effectively uses relevant information from the notes to accomplish this goal\?/, goal: /significan|importan|impact/i, mechanics: 'Goal asks why the work matters.' },
  'rs-emphasize-difference': { container: 'notes', stem: /Which choice most effectively uses relevant information from the notes to accomplish this goal\?/, goal: /differen|contrast|unlike/i, mechanics: 'Goal asks to emphasize a difference between two subjects.' },
  'rs-introduce-unfamiliar': { container: 'notes', stem: /Which choice most effectively uses relevant information from the notes to accomplish this goal\?/, goal: /unfamiliar|introduce|audience/i, mechanics: 'Goal asks to introduce the subject to readers who do not know it.' },
  'transitions-contrast': { container: 'passage', blank: true, derived: true, stem: /Which choice completes the text with the most logical transition\?/, mechanics: 'Blank takes a CONTRAST transition (however / by contrast / nevertheless …). The correct choice must START with a phrase in the contrast lexicon — that is what freezes the bucket.' },
  'transitions-cause-effect': { container: 'passage', blank: true, derived: true, stem: /Which choice completes the text with the most logical transition\?/, mechanics: 'Blank takes a CAUSE/EFFECT transition (therefore / as a result / consequently …). The correct choice must START with a phrase in the cause-effect lexicon.' },
  'transitions-sequence-time': { container: 'passage', blank: true, derived: true, stem: /Which choice completes the text with the most logical transition\?/, mechanics: 'Blank takes a SEQUENCE/TIME transition (meanwhile / eventually / subsequently …). The correct choice must START with a phrase in the sequence-time lexicon.' },
  'transitions-example-emphasis': { container: 'passage', blank: true, derived: true, stem: /Which choice completes the text with the most logical transition\?/, mechanics: 'Blank takes an EXAMPLE/EMPHASIS transition (for example / in fact / indeed …).' },
  'tsp-function-of-underlined': {
    container: 'passage',
    derived: true,
    underline: true,
    stem: /function of the underlined sentence/i,
    mechanics: 'One sentence is wrapped in __double underscores__ in the passage; the stem asks for its function in the text as a whole. The stem MUST contain "function of the underlined" — that is what freezes the bucket.',
  },
  'tsp-main-purpose': { container: 'passage', derived: true, stem: /main purpose of the text/i, mechanics: 'Stem must contain "main purpose" (freezes the bucket).' },
  'tsp-overall-structure': { container: 'passage', derived: true, stem: /overall structure of the text/i, mechanics: 'Stem must contain "overall structure" (freezes the bucket).' },
};

// ─── live shard + bucket derivation ─────────────────────────────────────────
async function loadLive() {
  const mod = await import(pathToFileURL(SHARD).href + `?t=${Date.now()}`);
  return mod.authoredReadingItems;
}

let _readingMap = null;
async function readingTypeMap() {
  if (_readingMap) return _readingMap;
  const mod = await import(pathToFileURL(path.join(RWBANK, 'rwReadingType.js')).href);
  _readingMap = mod.RW_READING_TYPE_BY_ID;
  return _readingMap;
}

// deriveRWPattern.js uses extensionless relative imports (CRA resolves them,
// node does not). Copy it + its deps into a cache dir with the imports
// rewritten to absolute file URLs. src/ is never written to.
let _derive = null;
async function deriveFns() {
  if (_derive) return _derive;
  const cache = path.join(WORK, '.cache');
  fs.mkdirSync(cache, { recursive: true });
  for (const f of ['deriveRWPattern', 'rwGrammarType', 'rwReadingType']) {
    const src = fs.readFileSync(path.join(RWBANK, `${f}.js`), 'utf8')
      .replace(/from '\.\/([A-Za-z0-9_]+)'/g, (_m, n) => `from '${pathToFileURL(path.join(RWBANK, `${n}.js`)).href}'`);
    fs.writeFileSync(path.join(cache, `${f}.mjs`), src);
  }
  _derive = await import(pathToFileURL(path.join(cache, 'deriveRWPattern.mjs')).href + `?t=${Date.now()}`);
  return _derive;
}

/** The frozen bucket for an item: the authoritative map first, else derived. */
async function bucketOf(item) {
  const map = await readingTypeMap();
  if (Object.prototype.hasOwnProperty.call(map, item.id)) return map[item.id];
  const { deriveRWQuestionType } = await deriveFns();
  return deriveRWQuestionType(item) || null;
}

function frozenOf(item, bucket) {
  return {
    id: `rw-authored-${item.id}`,
    rawId: item.id,
    fileId: `rw-authored-${item.id}`,
    type: item.type,
    difficulty: item.difficulty,
    band: item.band,
    domain: item.domain,
    skill: item.skill,
    bucket,
    mappedBucket: null,   // filled by rows()
  };
}

async function rows() {
  const live = await loadLive();
  const map = await readingTypeMap();
  const out = [];
  for (const it of live) {
    const bucket = await bucketOf(it);
    const f = frozenOf(it, bucket);
    f.mappedBucket = Object.prototype.hasOwnProperty.call(map, it.id) ? map[it.id] : null;
    f.hasPassage = typeof it.passage === 'string' && it.passage.length > 0;
    f.hasStudentNotes = !!it.studentNotes;
    f.currentQuestion = String(it.question || '').slice(0, 160);
    f.currentPassageHead = String(it.passage || (it.studentNotes?.bullets || []).join(' | ')).slice(0, 120);
    out.push(f);
  }
  return out;
}

// ─── manifest ───────────────────────────────────────────────────────────────
async function manifest() {
  fs.mkdirSync(path.join(WORK, 'chunks'), { recursive: true });
  const all = await rows();
  fs.writeFileSync(path.join(WORK, 'manifest.json'), JSON.stringify(all, null, 1));
  const byBucket = {};
  for (const r of all) byBucket[r.bucket || 'UNBUCKETED'] = (byBucket[r.bucket || 'UNBUCKETED'] || 0) + 1;
  const chunk = {
    chunk: CHUNK_ID,
    source: 'rwFills',
    file: 'src/data/questions/rwBank/authoredReadingItems.js',
    authoredDir: 'scripts/generated/authored/bank/rwFills',
    count: all.length,
    buckets: byBucket,
    passageMaxWords: PASSAGE_MAX_WORDS,
    brief: 'scripts/generated/rwFillRecreation/RW_FILL_BRIEF.md',
    items: all,
  };
  fs.writeFileSync(path.join(WORK, 'chunks', `${CHUNK_ID}.json`), JSON.stringify(chunk, null, 1));
  console.log(`rwFills: ${all.length} items → ${path.relative(ROOT, path.join(WORK, 'chunks', `${CHUNK_ID}.json`))}`);
  console.table(Object.entries(byBucket).sort((a, b) => b[1] - a[1]).map(([bucket, count]) => ({ bucket, count })));
}

// ─── authored JSON ──────────────────────────────────────────────────────────
function authoredPath(rawId) { return path.join(AUTHORED, `rw-authored-${rawId}.json`); }
function readAuthored(rawId) {
  const p = authoredPath(rawId);
  if (!fs.existsSync(p)) return null;
  try { return { data: JSON.parse(fs.readFileSync(p, 'utf8')), path: p }; }
  catch (e) { return { error: `JSON parse: ${e.message}`, path: p }; }
}
/** The live item projected into the authored contract (for --from-live / verify). */
function liveAsAuthored(item) {
  const a = { id: item.id };
  for (const k of CONTENT_FIELDS) if (item[k] !== undefined) a[k] = item[k];
  if (item._meta?.source) a.source = item._meta.source;
  if (item._meta?.people) a.people = item._meta.people;
  return a;
}

// ─── source registries ──────────────────────────────────────────────────────
let _registry = null;
function registry() {
  if (_registry) return _registry;
  const read = f => JSON.parse(fs.readFileSync(path.join(SOURCES_DIR, f), 'utf8'));
  const works = read('literaryWorks.json');
  const researchers = read('researchers.json');
  const people = new Map();      // normalized name → label
  const addPerson = (name, where) => { const k = norm(stripDiacritics(name)); if (k) people.set(k, where); };
  for (const r of researchers) addPerson(r.name, 'researchers.json');
  for (const w of works) addPerson(w.author, 'literaryWorks.json');
  // surnames let "Hansen argues" resolve after "Valerie Hansen" is registered
  const surnames = new Map();
  for (const [k, where] of people) { const parts = k.split(' '); if (parts.length > 1) surnames.set(parts[parts.length - 1], where); }
  const worksByTitle = new Map();
  for (const w of works) worksByTitle.set(norm(stripDiacritics(w.title)), w);
  _registry = { works, researchers, people, surnames, worksByTitle };
  return _registry;
}

let _ledger = null;
function ledger() {
  if (_ledger === null) _ledger = fs.existsSync(LEDGER) ? fs.readFileSync(LEDGER, 'utf8').toLowerCase() : '';
  return _ledger;
}

// ─── attribution extraction ─────────────────────────────────────────────────
const ROLE_CUE = [
  'poet', 'novelist', 'writer', 'author', 'essayist', 'playwright', 'critic', 'reviewer',
  'historian', 'literary historian', 'art historian', 'scholar', 'professor', 'philosopher',
  'scientist', 'researcher', 'biologist', 'marine biologist', 'ecologist', 'botanist',
  'zoologist', 'ornithologist', 'entomologist', 'paleontologist', 'archaeologist',
  'anthropologist', 'astronomer', 'astrophysicist', 'physicist', 'chemist', 'geochemist',
  'geologist', 'volcanologist', 'seismologist', 'oceanographer', 'climatologist',
  'meteorologist', 'economist', 'psychologist', 'neuroscientist', 'sociologist',
  'linguist', 'musicologist', 'composer', 'painter', 'sculptor', 'photographer',
  'architect', 'engineer', 'mathematician', 'geographer', 'conservator', 'curator',
  'physician', 'epidemiologist', 'geneticist', 'instrument maker', 'inventor',
].sort((a, b) => b.length - a.length);
const NAME = "[A-Z][\\p{L}'’.\\-]+(?:\\s+(?:van|von|de|del|della|da|di|du|la|le|dos|bin|al|af|ten|ter)\\b)?(?:\\s+[A-Z][\\p{L}'’.\\-]+){0,3}";
const ROLE_RE = new RegExp(`\\b(?:${ROLE_CUE.join('|')})s?\\s+(${NAME})`, 'gu');
const POSSESSIVE_RE = new RegExp(`\\b(${NAME})['’]s\\s+(?:\\d{4}\\s+)?(?:[a-z-]+\\s+){0,2}(?:poem|novel|novella|short story|story|collection|essay|memoir|play|monologue|lyric|sonnet|ballad|elegy|autobiography|biography|treatise|book)\\b`, 'gu');
const BY_RE = new RegExp(`\\b(?:poem|novel|novella|short story|story|collection|essay|memoir|play|monologue|lyric|sonnet|ballad|elegy|book)\\b[^.]{0,60}?\\bby\\s+(${NAME})`, 'gu');
const ADAPTED_RE = new RegExp(`adapted from\\s+(?:the\\s+)?(?:\\d{4}\\s+)?(?:[a-z-]+\\s+){0,2}(${NAME})`, 'gu');
// Named-person mentions that carry no role cue but sit in an attribution frame.
const ARGUES_RE = new RegExp(`\\b(${NAME})\\s+(?:argues|contends|claims|found|showed|reports?|notes?|writes|observed|proposed|concluded)\\b`, 'gu');
// "Hilma af Klint (1862-1944) was a Swedish painter", "Adolphe Sax was a Belgian
// instrument maker" — the role follows the name, optionally after a parenthetical
// and one or more (possibly capitalized) adjectives.
const IS_ROLE_RE = new RegExp(`\\b(${NAME})\\s*(?:\\([^)]{0,40}\\)\\s*)?(?:is|was|were|are)\\s+(?:an?|the)\\s+(?:[A-Za-z-]+\\s+){0,3}(?:${ROLE_CUE.join('|')})s?\\b`, 'gu');

// Words that can only be sentence glue, never the first token of a person's name.
const LEADING_STOP = new Set(['In', 'On', 'At', 'By', 'The', 'A', 'An', 'And', 'But', 'Yet', 'For', 'From', 'With', 'After', 'Before', 'When', 'While', 'Though', 'Although', 'Because', 'Since', 'So', 'Her', 'His', 'Their', 'Its', 'This', 'That', 'These', 'Those', 'Some', 'Now', 'Then', 'Here', 'There', 'Both', 'Each', 'Every', 'Yet', 'Later', 'Today']);
const TRAILING_STOP = /\s+(?:And|But|The|A|An|In|On|Of|At|By|For|That|Which|Who|When|Was|Is)$/u;

function cleanName(raw) {
  let n = String(raw || '').replace(/\s+/g, ' ').trim().replace(/['’]s$/u, '').replace(TRAILING_STOP, '');
  let parts = n.split(' ');
  while (parts.length > 1 && LEADING_STOP.has(parts[0])) parts.shift();
  return parts.join(' ').replace(/[.,;:]+$/, '').trim();
}

// Titles: "Quoted Title", *Italic Title*, or an unquoted Title before a year+form clause.
const TITLE_DQ_RE = /"([A-Z][^"]{2,80})"/g;
const TITLE_CQ_RE = /[“]([A-Z][^”]{2,80})[”]/g;
const TITLE_SQ_RE = /'([A-Z][^']{2,80})'/g;
const TITLE_STAR_RE = /\*([A-Z][^*]{2,80})\*/g;
const TITLE_BEFORE_YEAR_RE = /\b((?:The\s+|A\s+|An\s+)?[A-Z][\p{L}'’-]*(?:\s+(?:of|the|a|an|to|and|in|on|for)\s+|\s+)(?:[A-Z][\p{L}'’-]*\s*){0,5})[,–—-]?\s*(?:an?\s+)?(\d{4})\s+(?:novel|poem|short story|story|collection|play|essay|memoir)\b/gu;
const AFTER_ADAPTED_TITLE_RE = /adapted from\s+[^.]*?\b(?:novel|poem|short story|story|collection|play|essay|memoir)\s+["“']?([A-Z][^."“”']{2,70})/gu;
// A quoted string only counts as a literary title when a work-form word sits near it.
const WORK_CUE_RE = /\b(?:poem|poetry|novel|novella|short story|story|collection|play|lyric|sonnet|ballad|elegy|monologue|memoir|essay|verse|stanza|quotation from)\b/i;

function uniqStrings(list) { return [...new Set(list.map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean))]; }

/**
 * Every candidate person name in the item's student-facing text. Names that are
 * a bare surname of a longer name in the same text are folded into it, and
 * single-token leftovers (passage characters — "Margaret", "Elinor") are
 * dropped: characters inside a real work are not attributions.
 */
function extractPeople(text) {
  const found = [];
  for (const re of [ROLE_RE, POSSESSIVE_RE, BY_RE, ADAPTED_RE, ARGUES_RE, IS_ROLE_RE]) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) found.push(cleanName(m[1]));
  }
  const all = uniqStrings(found);
  const multi = all.filter(n => n.split(' ').length > 1);
  return multi.filter((n, i) => !multi.some((o, j) => j !== i && o !== n && o.endsWith(` ${n}`)));
}

/** Candidate literary titles + the year claimed for them. */
function extractWorks(text) {
  const out = [];
  const push = (title, year) => {
    const t = String(title || '').replace(/[.,;:]+$/, '').trim();
    if (!t || /['’]s$/u.test(t) || t.split(/\s+/).length > 12) return;   // possessive = the author, not the title
    out.push({ title: t, year: year ? Number(year) : null });
  };
  const nearWorkCue = idx => WORK_CUE_RE.test(text.slice(Math.max(0, idx - 80), idx + 80));
  for (const re of [TITLE_DQ_RE, TITLE_CQ_RE, TITLE_SQ_RE, TITLE_STAR_RE]) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) if (nearWorkCue(m.index)) push(m[1]);
  }
  for (const m of text.matchAll(TITLE_BEFORE_YEAR_RE)) push(m[1], m[2]);
  for (const m of text.matchAll(AFTER_ADAPTED_TITLE_RE)) push(m[1]);
  // attach any 4-digit year that sits next to the title
  const dedup = new Map();
  for (const w of out) {
    const key = norm(w.title);
    if (!key) continue;
    const prev = dedup.get(key);
    if (!prev || (w.year && !prev.year)) dedup.set(key, w);
  }
  for (const w of dedup.values()) {
    if (w.year) continue;
    const esc = w.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const after = text.match(new RegExp(`${esc}["”']?\\s*[,(]?\\s*\\(?(1[2-9]\\d\\d|20[0-2]\\d)`));
    const before = text.match(new RegExp(`(1[2-9]\\d\\d|20[0-2]\\d)\\s+(?:[a-z-]+\\s+){0,3}["“']?${esc}`));
    if (after) w.year = Number(after[1]);
    else if (before) w.year = Number(before[1]);
  }
  return [...dedup.values()];
}

/** The whole student-facing surface of an item (never the explanation's prose about choices). */
function stimulusText(a) {
  const parts = [];
  if (a.passage) parts.push(a.passage);
  if (a.studentNotes) {
    if (a.studentNotes.intro) parts.push(a.studentNotes.intro);
    parts.push(...(a.studentNotes.bullets || []));
    if (a.studentNotes.goal) parts.push(a.studentNotes.goal);
  }
  if (a.question) parts.push(a.question);
  return parts.join('\n');
}

/** Uniqueness surface — question EXCLUDED (R&W stems are canonical CB stock stems). */
function uniquenessText(a) {
  const parts = [];
  if (a.passage) parts.push(a.passage);
  if (a.studentNotes) parts.push(...(a.studentNotes.bullets || []));
  for (const c of a.choices || []) parts.push(c.text);
  return parts.join(' ');
}

// ─── corpora ────────────────────────────────────────────────────────────────
const ENTITIES = { '&rsquo;': '’', '&lsquo;': '‘', '&rdquo;': '”', '&ldquo;': '“', '&mdash;': '—', '&ndash;': '–', '&amp;': '&', '&nbsp;': ' ', '&hellip;': '…', '&quot;': '"', '&#39;': "'" };
const decodeEntities = s => String(s || '').replace(/&(?:rsquo|lsquo|rdquo|ldquo|mdash|ndash|amp|nbsp|hellip|quot|#39);/g, m => ENTITIES[m] || ' ');

let _official = null;
function officialRWIndex() {
  if (_official) return _official;
  const cache = JSON.parse(fs.readFileSync(path.join(GEN, 'cbEducatorQBankRW.json'), 'utf8')).items;
  // GOTCHA (two of them):
  //  1. indexCorpus must see the cache `items` OBJECT, never an array of values.
  //  2. For R&W that object indexes `stemPlain` FIRST — and R&W stems are the
  //     canonical CB stock stems ("Which choice most logically completes the
  //     text?", median 14 words). Indexing the object directly therefore builds
  //     a corpus of STEMS and silently passes every passage. Feed the
  //     STIMULUS explicitly as an [{id, text}] list instead.
  const list = Object.entries(cache)
    .map(([id, v]) => ({ id, text: decodeEntities(v.stimulusPlain || '') }))
    .filter(r => r.text.trim());
  _official = indexCorpus(list);
  const probe = list.find(r => r.text.split(/\s+/).length > 40);
  if (checkUniquenessSliding(probe.text, _official).pass) throw new Error('uniqueness gate control failed — a verbatim official R&W stimulus passed. Corpus shape bug.');
  return _official;
}

let _tests = null;
function testRWIndex() {
  if (_tests) return _tests;
  const list = [];
  for (let t = 1; t <= 12; t++) {
    const dir = path.join(GEN, 'authored', `test${t}`);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => /^q\d+\.json$/.test(f))) {
      try {
        const it = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        const text = uniquenessText(it) + ' ' + (Array.isArray(it.passages) ? it.passages.map(p => p.text).join(' ') : '');
        if (text.trim()) list.push({ id: `test${t}/${f}`, text });
      } catch { /* ignore unreadable authored file */ }
    }
  }
  // the RW M2Easy variants live only as JS bundles — regex their passages
  if (fs.existsSync(TESTS_DIR)) {
    for (const f of fs.readdirSync(TESTS_DIR)) {
      if (!/^practiceTest\d+RW(M2Easy)?\.js$/.test(f)) continue;
      const src = fs.readFileSync(path.join(TESTS_DIR, f), 'utf8');
      [...src.matchAll(/["']?passage["']?\s*:\s*"((?:[^"\\]|\\.)*)"/g)]
        .forEach((m, i) => list.push({ id: `${f}#${i + 1}`, text: m[1].replace(/\\n/g, ' ') }));
    }
  }
  _tests = indexCorpus(list);
  return _tests;
}

// ─── per-item check ─────────────────────────────────────────────────────────
function textHygiene(label, v, errs) {
  if (!v) return;
  const s = String(v);
  if (/\\"/.test(s)) errs.push(`${label}: backslash-escaped quote (\\") renders as a literal backslash — use a plain "`);
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(s)) errs.push(`${label}: control character in text (a bad JSON escape?)`);
  const dq = (s.match(/"/g) || []).length;
  if (dq % 2 !== 0) errs.push(`${label}: unbalanced straight quotes (${dq})`);
  const open = (s.match(/[“]/g) || []).length, close = (s.match(/[”]/g) || []).length;
  if (open !== close) errs.push(`${label}: unbalanced curly quotes (${open} open / ${close} close)`);
}

function scaffoldErrors(a) {
  const errs = [];
  const e = String(a.explanation || '');
  if (!e) return ['explanation missing'];
  const m = e.match(/\*\*Choice ([A-D]) is correct\.\*\*/);
  if (!m) errs.push('explanation missing the exact **Choice X is correct.** opener');
  else if (m[1] !== a.correctAnswer) errs.push(`explanation says Choice ${m[1]} but correctAnswer is ${a.correctAnswer}`);
  if (!e.trimStart().startsWith('**Choice ')) errs.push('explanation must START with **Choice X is correct.**');
  if (!/\*\*The Full Solution:\*\*/.test(e)) errs.push('missing **The Full Solution:**');
  if (!/\*\*Why the other choices are wrong:\*\*/.test(e)) errs.push('missing **Why the other choices are wrong:**');
  if (/\*\*Why the wrong answers are tempting:\*\*/.test(e)) errs.push('R&W uses **Why the other choices are wrong:** (the math-bank header is wrong here)');
  for (const L of ['A', 'B', 'C', 'D']) {
    if (L === a.correctAnswer) continue;
    if (!new RegExp(`^[-*]\\s*(?:Choice\\s+)?${L}[:.)]`, 'm').test(e)) errs.push(`no distractor line for Choice ${L} (expected a "- ${L}: …" bullet)`);
  }
  return errs;
}

function attributionErrors(a, row) {
  const errs = []; const warns = [];
  const reg = registry();
  const text = stimulusText(a);

  // 1. self-declared fiction
  for (const m of text.matchAll(/\b(fictional|fictitious|imagined|invented|made-up|hypothetical (?:poet|novelist|author|writer|critic))\b/gi)) {
    errs.push(`FICTIONAL ATTRIBUTION: passage says "${m[1]}" — every quoted work and named person must be genuine`);
  }

  // 2. literary works
  const works = extractWorks(text);
  const quotesWork = /Which quotation from/i.test(a.question || '') || BUCKET_FORMS[row.bucket]?.quotesRequired;
  for (const w of works) {
    const hit = reg.worksByTitle.get(norm(stripDiacritics(w.title)));
    if (!hit) {
      errs.push(`literary work “${w.title}”${w.year ? ` (${w.year})` : ''} is not in rwSources/literaryWorks.json — quote a registered public-domain work, or add the work (title+author+year+publicDomain+sourceUrl) to the registry first`);
    } else if (a.source && norm(a.source.title) === norm(w.title) && norm(stripDiacritics(a.source.author || '')) !== norm(stripDiacritics(hit.author))) {
      errs.push(`source.author "${a.source.author}" ≠ literaryWorks.json author "${hit.author}" for “${w.title}”`);
    }
    if (w.year && w.year >= PD_CUTOFF_YEAR) {
      errs.push(`literary work “${w.title}” is dated ${w.year} — not US public domain (must be published before ${PD_CUTOFF_YEAR})`);
    }
  }
  if (quotesWork) {
    if (!a.source) errs.push('quotation item carries no `source` object — add {title, author, year, publicDomain:true, sourceUrl} naming the public-domain text the four quotations are copied from');
    else {
      for (const k of ['title', 'author', 'year', 'sourceUrl']) if (!a.source[k]) errs.push(`source.${k} missing`);
      if (a.source.publicDomain !== true) errs.push('source.publicDomain must be true');
      if (a.source.year && Number(a.source.year) >= PD_CUTOFF_YEAR) errs.push(`source.year ${a.source.year} is not public domain (need < ${PD_CUTOFF_YEAR})`);
      if (a.source.title && !reg.worksByTitle.get(norm(stripDiacritics(a.source.title)))) errs.push(`source “${a.source.title}” is not registered in rwSources/literaryWorks.json — add it, then re-run check`);
      if (a.source.sourceUrl && !/^https?:\/\//.test(a.source.sourceUrl)) errs.push('source.sourceUrl must be an absolute http(s) URL');
    }
  } else if (a.source) {
    for (const k of ['title', 'author', 'sourceUrl']) if (!a.source[k]) warns.push(`source.${k} missing`);
  }

  // 3. named people
  const declared = new Set((a.people || []).map(p => norm(stripDiacritics(p.name || p))));
  for (const name of extractPeople(text)) {
    const k = norm(stripDiacritics(name));
    const last = k.split(' ').pop();
    if (reg.people.has(k) || reg.surnames.has(last)) continue;
    if (declared.has(k)) {
      errs.push(`named person "${name}" is declared in \`people\` but is NOT in rwSources/researchers.json — register the entry (name, field, affiliation, publications, sourceUrl) before using it`);
    } else {
      errs.push(`named person "${name}" is not in rwSources/researchers.json (or literaryWorks.json authors) — every named researcher, scholar, critic, and author must be real and registered`);
    }
  }

  // 4. topic-ledger collision (warn only)
  const led = ledger();
  if (led) {
    for (const name of extractPeople(text)) if (led.includes(stripDiacritics(name).toLowerCase())) warns.push(`topic ledger already claims "${name}" — a specific anchor may appear only once across the catalog`);
    for (const w of works) if (led.includes(stripDiacritics(w.title).toLowerCase())) warns.push(`topic ledger already claims the work “${w.title}”`);
  }
  return { errs, warns };
}

function formErrors(a, row, derivedBucket) {
  const errs = []; const warns = [];
  const form = BUCKET_FORMS[row.bucket];
  if (!form) { warns.push(`bucket "${row.bucket}" has no form contract in BUCKET_FORMS — mechanics unpinned`); return { errs, warns }; }

  if (form.container === 'notes') {
    if (!a.studentNotes) errs.push(`bucket ${row.bucket} requires a studentNotes object {intro, bullets[], goal}`);
    else {
      const b = a.studentNotes.bullets;
      if (!Array.isArray(b) || b.length < 5) errs.push('studentNotes.bullets must have at least 5 bullets (the recreated tests run 5-6)');
      if (!a.studentNotes.goal) errs.push('studentNotes.goal missing (the goal sentence must live in the notes, not the stem)');
      else if (form.goal && !form.goal.test(a.studentNotes.goal)) warns.push(`studentNotes.goal does not read like ${row.bucket} (${form.goal})`);
      if (!a.studentNotes.intro) warns.push('studentNotes.intro missing (CB uses "While researching a topic, a student has taken the following notes:")');
    }
    if (a.passage) {
      if (/following notes/i.test(a.passage)) errs.push('notes are embedded in `passage` — rhetorical-synthesis items must use the studentNotes object so the notes box renders');
      else warns.push('bucket takes studentNotes; a `passage` is also present');
    }
  } else {
    if (!a.passage) errs.push(`bucket ${row.bucket} requires a \`passage\` string`);
    if (a.studentNotes) errs.push(`bucket ${row.bucket} must not carry studentNotes`);
  }

  if (a.passage) {
    const w = wordCount(a.passage);
    if (w > PASSAGE_MAX_WORDS) errs.push(`passage ${w} words (> ${PASSAGE_MAX_WORDS})`);
    if (form.blank && !/_{4,}/.test(a.passage)) errs.push('passage is missing the ______ blank this bucket requires');
    if (!form.blank && /_{4,}/.test(a.passage)) warns.push('passage contains a ______ blank but the bucket is not a completion type');
    if (form.underline && !/__[^_]{10,}__/.test(a.passage)) errs.push('passage is missing the __underlined sentence__ this bucket requires');
  }
  if (form.stem && a.question && !form.stem.test(a.question)) {
    warns.push(`stem does not match the canonical ${row.bucket} stem (${form.stem})`);
  }
  if (form.quotesRequired && Array.isArray(a.choices)) {
    const quoted = a.choices.filter(c => /^["“']/.test(String(c.text || '').trim())).length;
    if (quoted !== a.choices.length) errs.push(`${row.bucket}: all four choices must be quotations from the work (${quoted}/4 are quoted)`);
  }
  if (form.derived) {
    if (derivedBucket === undefined) warns.push('could not derive the bucket (deriveRWPattern shim unavailable) — bucket freeze unverified');
    else if (derivedBucket !== row.bucket) errs.push(`content derives bucket "${derivedBucket}" but the frozen bucket is "${row.bucket}" — the correct choice / stem must reproduce the frozen sub-type`);
  }
  return { errs, warns };
}

async function checkItem(row, a, ctx) {
  const errs = []; const warns = [];

  // frozen fields
  if (a.id !== undefined && String(a.id) !== String(row.rawId) && String(a.id) !== String(row.id)) errs.push(`id mismatch ${a.id} vs ${row.rawId}`);
  for (const k of FROZEN_FIELDS) {
    if (k === 'id' || a[k] === undefined) continue;
    const frozen = row[k];
    if (JSON.stringify(a[k]) !== JSON.stringify(frozen)) warns.push(`${k} in JSON ignored (frozen ${JSON.stringify(frozen)})`);
  }
  for (const k of Object.keys(a)) {
    if (!CONTENT_FIELDS.includes(k) && !PROVENANCE_FIELDS.includes(k) && !FROZEN_FIELDS.includes(k)) warns.push(`unknown field "${k}" ignored`);
  }

  // required content
  if (!a.question || wordCount(a.question) < 4) errs.push('question missing/too short');
  if (!Array.isArray(a.choices) || a.choices.length !== 4) errs.push('needs exactly 4 choices');
  else {
    const ids = a.choices.map(c => c && c.id).join('');
    if (ids !== 'ABCD') errs.push(`choice ids must be A,B,C,D in order (got ${ids})`);
    a.choices.forEach(c => { if (!c || !String(c.text || '').trim()) errs.push(`choice ${c?.id}: empty`); });
    if (new Set(a.choices.map(c => String(c?.text).trim())).size !== 4) errs.push('duplicate choice text');
    const lens = a.choices.map(c => wordCount(c?.text));
    const mx = Math.max(...lens), mn = Math.min(...lens);
    if (mx > PARITY_MIN_WORDS && mn > 0 && mx / mn > PARITY_MAX) errs.push(`choice-length parity ${(mx / mn).toFixed(2)}x (max ${mx} / min ${mn} words, limit ${PARITY_MAX}x)`);
    const ci = a.choices.findIndex(c => c?.id === a.correctAnswer);
    if (ci >= 0) { ctx.items++; if (lens[ci] === mx && lens.filter(v => v === mx).length === 1) { ctx.longest++; ctx.longestIds.push(row.rawId); } }
  }
  if (!['A', 'B', 'C', 'D'].includes(a.correctAnswer)) errs.push('correctAnswer must be A-D');

  // hygiene
  textHygiene('question', a.question, errs);
  textHygiene('passage', a.passage, errs);
  textHygiene('explanation', a.explanation, errs);
  (a.choices || []).forEach(c => textHygiene(`choice ${c?.id}`, c?.text, errs));
  for (const b of a.studentNotes?.bullets || []) textHygiene('studentNotes bullet', b, errs);

  errs.push(...scaffoldErrors(a));

  // bucket form (+ derivation freeze)
  let derived;
  if (BUCKET_FORMS[row.bucket]?.derived) {
    try {
      const { deriveRWQuestionType } = await deriveFns();
      derived = deriveRWQuestionType({ ...a, id: row.rawId, skill: row.skill }) || null;
    } catch { derived = undefined; }
  }
  const f = formErrors(a, row, derived);
  errs.push(...f.errs); warns.push(...f.warns);

  const at = attributionErrors(a, row);
  errs.push(...at.errs); warns.push(...at.warns);

  ctx.stems.push({ id: row.fileId, text: uniquenessText(a) });
  if (a.passage) ctx.passageLens.push(wordCount(a.passage));
  ctx.buckets[row.bucket] = (ctx.buckets[row.bucket] || 0) + 1;
  return { errs, warns };
}

// ─── uniqueness ─────────────────────────────────────────────────────────────
function uniquenessErrors(stems) {
  const errs = [];
  const off = officialRWIndex();
  const tests = testRWIndex();
  for (const s of stems) {
    if (tokenize(s.text).length < 12) continue;
    const r = checkUniquenessSliding(s.text, off);
    if (!r.pass) errs.push(`${s.id}: too close to official CB R&W item ${r.closestId} (jaccard ${r.jaccard}, ngram ${r.ngramOverlap})`);
    const t = checkUniquenessSliding(s.text, tests);
    if (!t.pass) errs.push(`${s.id}: too close to recreated practice-test R&W ${t.closestId} (jaccard ${t.jaccard}, ngram ${t.ngramOverlap})`);
  }
  const toks = stems.map(s => ({ id: s.id, set: new Set(tokenize(s.text)) }));
  for (let i = 0; i < toks.length; i++) for (let j = i + 1; j < toks.length; j++) {
    const A = toks[i].set, B = toks[j].set;
    if (A.size < 12 || B.size < 12) continue;
    let inter = 0; for (const v of A) if (B.has(v)) inter++;
    const jac = inter / (A.size + B.size - inter);
    if (jac >= INTRA_JACCARD) errs.push(`${toks[i].id} ~ ${toks[j].id}: near-duplicate fills (jaccard ${jac.toFixed(2)})`);
  }
  return errs;
}

// ─── check ──────────────────────────────────────────────────────────────────
function selectIds(all) {
  if (args.all || args.id === undefined) return all;
  const want = new Set(String(args.id).split(',').map(s => s.trim()));
  const sel = all.filter(r => want.has(String(r.rawId)) || want.has(r.fileId));
  if (!sel.length) throw new Error(`no items matched --id=${args.id}`);
  return sel;
}

async function check() {
  const all = await rows();
  const selected = selectIds(all);
  const fromLive = !!args['from-live'];
  const live = fromLive ? await loadLive() : null;
  const ctx = { stems: [], passageLens: [], buckets: {}, items: 0, longest: 0, longestIds: [] };
  let errors = 0, missing = 0, checked = 0;

  for (const row of selected) {
    let a;
    if (fromLive) a = liveAsAuthored(live.find(x => x.id === row.rawId));
    else {
      const got = readAuthored(row.rawId);
      if (!got) { missing++; continue; }
      if (got.error) { errors++; console.error(`FAIL ${row.fileId}: ${got.error}`); continue; }
      a = got.data;
    }
    checked++;
    const { errs, warns } = await checkItem(row, a, ctx);
    warns.forEach(w => console.warn(`warn ${row.fileId}: ${w}`));
    errs.forEach(e => { errors++; console.error(`FAIL ${row.fileId}: ${e}`); });
  }

  if (!args['no-uniq'] && ctx.stems.length) {
    const u = uniquenessErrors(ctx.stems);
    u.forEach(e => { errors++; console.error(`FAIL ${e}`); });
  }

  // corpus-level: longest-answer tell
  if (ctx.items) {
    const rate = ctx.longest / ctx.items;
    const line = `longest-answer tell ${ctx.longest}/${ctx.items} (${(100 * rate).toFixed(0)}%, limit ${(100 * LONGEST_TELL_MAX).toFixed(0)}%)`;
    if (rate > LONGEST_TELL_MAX && ctx.items >= 20) { errors++; console.error(`FAIL ${line} — ids ${ctx.longestIds.join(',')}`); }
    else if (rate > LONGEST_TELL_MAX) console.warn(`warn ${line}`);
  }

  console.log(`\nchecked ${checked}/${selected.length} (missing ${missing})${fromLive ? ' [--from-live]' : ''} · buckets ${Object.keys(ctx.buckets).length} · passage median ${median(ctx.passageLens)} max ${ctx.passageLens.length ? Math.max(...ctx.passageLens) : '-'} words`);
  if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
  console.log('check passed');
}

// ─── assemble ───────────────────────────────────────────────────────────────
function readShard() {
  const text = fs.readFileSync(SHARD, 'utf8');
  const marker = 'export const authoredReadingItems = ';
  const at = text.indexOf(marker);
  if (at < 0) throw new Error('authoredReadingItems.js: export marker not found');
  const header = text.slice(0, at + marker.length);
  const body = text.slice(at + marker.length).replace(/;\s*$/, '');
  const items = JSON.parse(body);
  return { text, header, items };
}
const renderShard = (header, items) => `${header}${JSON.stringify(items, null, 2)};\n`;

/** Merge authored content over the live item, preserving key order + frozen fields. */
function mergeItem(orig, a) {
  const out = {};
  const wantsNotes = a.studentNotes !== undefined;
  const wantsPassage = a.passage !== undefined;
  for (const k of Object.keys(orig)) {
    if (k === 'authoredBy') { out[k] = 'seva-rw-fill-recreation'; continue; }
    if (k === '_meta') {
      const meta = { ...(orig._meta || {}) };
      if (a.source) meta.source = a.source;
      if (a.people) meta.people = a.people;
      out[k] = meta;
      continue;
    }
    if (k === 'passage') { if (wantsPassage) out[k] = a.passage; else if (!wantsNotes) out[k] = orig[k]; continue; }
    if (k === 'studentNotes') { if (wantsNotes) out[k] = a.studentNotes; else if (!wantsPassage) out[k] = orig[k]; continue; }
    if (CONTENT_FIELDS.includes(k)) { out[k] = a[k] !== undefined ? a[k] : orig[k]; continue; }
    out[k] = orig[k];
  }
  if (!('authoredBy' in out)) out.authoredBy = 'seva-rw-fill-recreation';
  if (wantsPassage && !('passage' in out)) out.passage = a.passage;
  if (wantsNotes && !('studentNotes' in out)) out.studentNotes = a.studentNotes;
  return out;
}

async function assemble() {
  const all = await rows();
  const allow = args.id !== undefined && !args.all
    ? new Set(String(args.id).split(',').map(s => s.trim()))
    : null;
  const { text, header, items } = readShard();

  // Safety: the file is a pure JSON array literal produced by this exact
  // serializer, so untouched items round-trip byte-identically. Prove it first.
  if (renderShard(header, items) !== text) {
    throw new Error('authoredReadingItems.js is not a clean JSON-array round-trip (hand edits?) — assemble would rewrite untouched items. Inspect the file first.');
  }
  if (items.length !== all.length) throw new Error(`parsed ${items.length} items but the module exports ${all.length}`);

  const expected = new Map();
  let replaced = 0, untouched = 0;
  const merged = items.map((orig, i) => {
    const row = all[i];
    if (String(orig.id) !== String(row.rawId)) throw new Error(`array position ${i}: id ${orig.id} ≠ module item ${row.rawId}`);
    if (allow && !allow.has(String(row.rawId))) { untouched++; return orig; }
    const got = readAuthored(row.rawId);
    if (!got || got.error) { untouched++; return orig; }
    const ctx = { stems: [], passageLens: [], buckets: {}, items: 0, longest: 0, longestIds: [] };
    return { got, row, ctx, orig, i };
  });

  // second pass so checkItem (async) can run
  for (let i = 0; i < merged.length; i++) {
    const m = merged[i];
    if (!m || !m.got) continue;
    const { errs } = await checkItem(m.row, m.got.data, m.ctx);
    if (errs.length) throw new Error(`${m.row.fileId}: authored JSON fails check — run check first (${errs[0]})`);
    const out = mergeItem(m.orig, m.got.data);
    merged[i] = out;
    expected.set(i, out);
    replaced++;
  }

  if (args.dry) {
    console.log(`rwFills: would replace ${replaced}/${items.length} items (${untouched} untouched, no authored JSON or filtered out)`);
    if (replaced) {
      const before = renderShard(header, items).split('\n').length;
      const after = renderShard(header, merged).split('\n').length;
      console.log(`  ${path.relative(ROOT, SHARD)}: ${before} → ${after} lines`);
    }
    return;
  }
  if (!replaced) { console.log('rwFills: nothing to assemble'); return; }

  fs.writeFileSync(SHARD, renderShard(header, merged));
  const after = await loadLive();
  if (after.length !== items.length) throw new Error(`item count changed after assembly (${after.length} vs ${items.length}) — REVERT`);
  after.forEach((it, i) => {
    const want = expected.has(i) ? expected.get(i) : items[i];
    if (!deepEq(it, want)) throw new Error(`item ${i} (${it.id}) differs from expected after assembly — inspect the file`);
  });
  console.log(`rwFills: assembled ${replaced}/${items.length} items (verified by re-import + deep compare)`);
}

// ─── verify ─────────────────────────────────────────────────────────────────
async function verify() {
  const all = await rows();
  const live = await loadLive();
  const ctx = { stems: [], passageLens: [], buckets: {}, items: 0, longest: 0, longestIds: [] };
  let errors = 0, recreated = 0;

  for (const row of all) {
    const got = readAuthored(row.rawId);
    if (!got || got.error) continue;
    recreated++;
    const orig = live.find(x => x.id === row.rawId);
    if (!deepEq(orig, mergeItem(orig, got.data))) { errors++; console.error(`FAIL ${row.fileId}: live item ≠ authored JSON (not assembled, or drifted)`); }
    // gates re-run on the LIVE data, not the authored file
    const { errs, warns } = await checkItem(row, liveAsAuthored(orig), ctx);
    warns.forEach(w => console.warn(`warn ${row.fileId}: ${w}`));
    errs.forEach(e => { errors++; console.error(`FAIL ${row.fileId}: ${e}`); });
  }
  console.log(`rwFills: ${recreated}/${all.length} recreated items verified`);

  if (!args['no-uniq'] && ctx.stems.length) {
    // full flattened bank: rwBank/index.js has extensionless imports and will
    // not load under node, so the corpus = the recreated tests' authored JSON
    // + the RW bundles' passages (see testRWIndex).
    const u = uniquenessErrors(ctx.stems);
    u.forEach(e => { errors++; console.error(`FAIL ${e}`); });
  }
  if (ctx.items) {
    const rate = ctx.longest / ctx.items;
    if (rate > LONGEST_TELL_MAX && ctx.items >= 20) { errors++; console.error(`FAIL longest-answer tell ${ctx.longest}/${ctx.items} (${(100 * rate).toFixed(0)}%)`); }
  }
  if (errors) { console.error(`${errors} failure(s)`); process.exit(1); }
  console.log('verify passed');
}

// ─── status ─────────────────────────────────────────────────────────────────
const FICTION_RE = /\b(fictional|fictitious|invented|made-up)\b/i;

async function status() {
  const all = await rows();
  const live = await loadLive();
  const byBucket = new Map();
  let authored = 0, liveMatched = 0, fictional = 0;
  const fictionalIds = [];

  for (const row of all) {
    const it = live.find(x => x.id === row.rawId);
    const got = readAuthored(row.rawId);
    const hasAuthored = !!(got && !got.error);
    if (hasAuthored) authored++;
    const isLive = hasAuthored && deepEq(it, mergeItem(it, got.data));
    if (isLive) liveMatched++;
    if (FICTION_RE.test(stimulusText(liveAsAuthored(it)))) { fictional++; fictionalIds.push(row.rawId); }
    const b = row.bucket || 'UNBUCKETED';
    const rec = byBucket.get(b) || { bucket: b, items: 0, authored: 0, live: 0, container: BUCKET_FORMS[b]?.container || '?' };
    rec.items++; if (hasAuthored) rec.authored++; if (isLive) rec.live++;
    byBucket.set(b, rec);
  }

  console.table([...byBucket.values()].sort((a, b) => b.items - a.items || a.bucket.localeCompare(b.bucket)));
  console.log(`TOTAL ${all.length} items · authored ${authored} · live ${liveMatched} · buckets ${byBucket.size} · self-declared fictional attributions remaining ${fictional}${fictional ? ` (ids ${fictionalIds.join(',')})` : ''}`);
  console.log(`passage items ${all.filter(r => r.hasPassage).length} · studentNotes items ${all.filter(r => r.hasStudentNotes).length}`);
}

// ─── solvesheet ─────────────────────────────────────────────────────────────
async function solvesheet() {
  const all = await rows();
  const out = [];
  for (const row of all) {
    const got = readAuthored(row.rawId);
    if (!got || got.error) continue;
    const a = got.data;
    out.push({
      id: row.fileId, rawId: row.rawId, bucket: row.bucket, skill: row.skill, difficulty: row.difficulty,
      mechanics: BUCKET_FORMS[row.bucket]?.mechanics || null,
      passage: a.passage ?? null, studentNotes: a.studentNotes ?? null,
      question: a.question, choices: a.choices, correctAnswer: a.correctAnswer,
      explanation: a.explanation, source: a.source ?? null, people: a.people ?? null,
    });
  }
  const p = path.join(WORK, 'solvesheets', `${CHUNK_ID}.json`);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(out, null, 1));
  console.log(`${path.relative(ROOT, p)}: ${out.length} items`);
}

// ─── main ───────────────────────────────────────────────────────────────────
(async () => {
  if (args.help || cmd === '--help' || cmd === 'help') { console.log(USAGE); return; }
  switch (cmd) {
    case 'manifest': await manifest(); break;
    case 'check': await check(); break;
    case 'assemble': await assemble(); break;
    case 'verify': await verify(); break;
    case 'status': await status(); break;
    case 'solvesheet': await solvesheet(); break;
    default: console.error(USAGE); process.exit(1);
  }
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });
