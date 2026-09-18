#!/usr/bin/env node
/**
 * Central verification for the official-calibration test rebuild
 * (docs/TEST_RECREATION_SPEC.md). Runs the uniqueness gate with the CORRECT
 * corpus shape (see "corpora" below — get it wrong and the gate silently
 * passes everything), plus KaTeX $-pair checks, over every recreated file of
 * one test.
 *
 * Usage:
 *   node scripts/verifyRecreation.mjs --test=1
 *
 * Exit 1 on any failure. Shell validators (lint, validateRWBank, jest
 * testBundleIntegrity, auditMissingDiagrams) are run separately by the
 * orchestrator — this script owns what they don't cover.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkUniquenessSliding, indexCorpus } from './calibrateModule.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GEN = path.join(ROOT, 'scripts', 'generated');
const TESTS = path.join(ROOT, 'src', 'data', 'practiceTests');

const testN = (() => {
  const a = process.argv.find(a => a.startsWith('--test='));
  if (!a) { console.error('need --test=N'); process.exit(1); }
  return parseInt(a.split('=')[1], 10);
})();

const mathCache = JSON.parse(fs.readFileSync(path.join(GEN, 'cbEducatorQBank.json'), 'utf8')).items;
const rwCache = JSON.parse(fs.readFileSync(path.join(GEN, 'cbEducatorQBankRW.json'), 'utf8')).items;

// ---- corpora ---------------------------------------------------------------
// TWO corpus-shape gotchas, both of which make the gate pass everything:
//
//  1. indexCorpus must see the cache `items` OBJECT (or an explicit
//     [{id, text}] list). An array of cache VALUES indexes nothing.
//  2. For an object corpus indexCorpus reads `stemPlain || stimulusPlain`.
//     That is right for MATH — every math cache item has a stemPlain and none
//     has a stimulusPlain — but WRONG for R&W, where `stemPlain` is the
//     canonical CB stock stem ("Which choice most logically completes the
//     text?", median 14 words) and the PASSAGE lives in `stimulusPlain`
//     (median 64 words). Handing the R&W cache object to indexCorpus builds a
//     corpus of STOCK STEMS, so a verbatim CB stimulus scored jaccard ~0.05
//     and sailed through. Build the R&W corpus explicitly from stimulusPlain,
//     HTML-entity decoded (the cache stores &rsquo; / &mdash; / &amp; and the
//     tokenizer would otherwise emit junk tokens), falling back to the stem
//     for any item that has no stimulus. Same shape recreateRWFills.mjs uses.
const ENTITIES = { '&rsquo;': '’', '&lsquo;': '‘', '&rdquo;': '”', '&ldquo;': '“', '&mdash;': '—', '&ndash;': '–', '&amp;': '&', '&nbsp;': ' ', '&hellip;': '…', '&quot;': '"', '&#39;': "'" };
const decodeEntities = s => String(s || '').replace(/&(?:rsquo|lsquo|rdquo|ldquo|mdash|ndash|amp|nbsp|hellip|quot|#39);/g, m => ENTITIES[m] || ' ');

const mathCorpus = indexCorpus(mathCache); // stemPlain — unchanged behaviour
const rwCorpus = indexCorpus(
  Object.entries(rwCache)
    .map(([id, v]) => ({ id, text: decodeEntities(v.stimulusPlain || v.stemPlain || '') }))
    .filter(r => r.text.trim())
);

// Two matchers, because the two sections present different-shaped surfaces.
//
// MATH — whole text. A math stem is one short self-contained field; the legacy
// checkUniqueness() behaviour, preserved byte-for-byte. (checkUniqueness()
// re-indexes its corpus on EVERY call; checkUniquenessSliding takes a
// PRE-indexed corpus, and with a window wider than any authored text it
// degenerates to exactly the same single whole-text comparison — same numbers,
// corpus indexed once.)
const WHOLE_TEXT = { window: Number.MAX_SAFE_INTEGER, step: Number.MAX_SAFE_INTEGER };
function match(text, corpus) {
  const r = checkUniquenessSliding(text, corpus, WHOLE_TEXT);
  return { pass: r.pass, jaccard: r.jaccard, ngramOverlap: r.ngramOverlap, closestQbankId: r.closestId };
}

// R&W — 25-token sliding windows (checkUniquenessSliding's default). The R&W
// uniqueness surface is a 100-160 word passage plus its choices, and a
// whole-text comparison DILUTES a partial lift: 25 verbatim tokens buried in a
// 160-word passage score ~0.38 3-gram overlap against a 64-word official
// stimulus and slip under the 0.60 threshold. Windowing scores the worst
// window instead, so a lifted paragraph is caught even when the rest of the
// item is original. Same check recreateRWFills.mjs runs on the drill fills.
function matchSliding(text, corpus) {
  const r = checkUniquenessSliding(text, corpus);
  return { pass: r.pass, jaccard: r.jaccard, ngramOverlap: r.ngramOverlap, closestQbankId: r.closestId };
}

// sanity: the gate must actually catch a verbatim official item — probed on
// the field each section is really compared against (math = stem, R&W =
// stimulus/passage). If either passes, the corpus shape regressed.
{
  const mProbe = Object.values(mathCache).find(v => (v.stemPlain || '').split(' ').length > 20);
  if (match(mProbe.stemPlain, mathCorpus).pass) {
    console.error('FATAL: uniqueness gate control failed — a verbatim official math stem passed. Corpus shape bug.');
    process.exit(1);
  }
  // No entry over 40 words means the R&W corpus is stock STEMS (median 14
  // words), not stimuli — the exact regression this probe exists to catch.
  const rProbe = rwCorpus.find(c => c.text.split(/\s+/).length > 40);
  if (!rProbe) {
    console.error('FATAL: R&W corpus has no entry over 40 words — it is indexed on stock stems, not stimuli. Corpus shape bug.');
    process.exit(1);
  }
  if (matchSliding(rProbe.text, rwCorpus).pass) {
    console.error('FATAL: uniqueness gate control failed — a verbatim official R&W stimulus passed. Corpus shape bug.');
    process.exit(1);
  }
}

let failures = 0;
const flag = (where, msg) => { failures++; console.error(`FAIL ${where}: ${msg}`); };

function checkDollarPairs(text, where) {
  // strip escaped \$ then count unescaped $
  const n = (text.replace(/\\\$/g, '').match(/\$/g) || []).length;
  if (n % 2 !== 0) flag(where, `unbalanced $ delimiters (${n})`);
}

// `matcher` picks the comparison for the section: match (whole text) for math,
// matchSliding (25-token windows) for R&W. See the two matchers above.
function uniq(text, corpus, where, matcher = match) {
  if (!text || text.split(/\s+/).length < 8) return; // too short to fingerprint
  const r = matcher(text, corpus);
  if (!r.pass) flag(where, `uniqueness gate: jaccard=${r.jaccard} ngram=${r.ngramOverlap} closest=${r.closestQbankId}`);
}

// ---- math JS files (regex extraction of stems/explanations) ----
function checkMathFile(file) {
  const p = path.join(TESTS, file);
  if (!fs.existsSync(p)) { flag(file, 'missing'); return; }
  const src = fs.readFileSync(p, 'utf8');
  const stems = [...src.matchAll(/question:\s*"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
  const expl = [...src.matchAll(/explanation:\s*"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
  if (!stems.length) flag(file, 'no stems extracted');
  stems.forEach((s, i) => {
    uniq(s.replace(/\\n/g, ' '), mathCorpus, `${file} stem#${i + 1}`);
    checkDollarPairs(s, `${file} stem#${i + 1}`);
  });
  expl.forEach((e, i) => checkDollarPairs(e, `${file} explanation#${i + 1}`));
  console.log(`${file}: ${stems.length} stems checked`);
}

// ---- RW authored JSON + easy-variant JS ----
function rwTextOf(item) {
  // NOTE: item.question is deliberately EXCLUDED — R&W stems are mandated
  // verbatim canonical CB stock stems (RW_STEM_REGISTRY), so they match
  // official items by design. Passages, notes, and choices must be original.
  const parts = [];
  if (item.passage) parts.push(item.passage);
  if (Array.isArray(item.passages)) parts.push(...item.passages.map(p => p.text));
  if (item.studentNotes?.bullets) parts.push(...item.studentNotes.bullets);
  for (const c of item.choices || []) parts.push(c.text);
  return parts.join(' ');
}

function checkRWAuthored() {
  const dir = path.join(GEN, 'authored', `test${testN}`);
  const files = fs.readdirSync(dir).filter(f => /^q\d+\.json$/.test(f)).sort();
  if (files.length !== 54) flag(`authored/test${testN}`, `expected 54 files, found ${files.length}`);
  for (const f of files) {
    let item;
    try { item = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); }
    catch (e) { flag(f, `JSON parse: ${e.message}`); continue; }
    uniq(rwTextOf(item), rwCorpus, `authored/${f}`, matchSliding);
    const words = (item.passage || '').split(/\s+/).filter(Boolean).length;
    if (words > 160) flag(f, `passage ${words} words (>160)`);
  }
  console.log(`authored/test${testN}: ${files.length} items checked`);
}

function checkRWEasy() {
  const p = path.join(TESTS, `practiceTest${testN}RWM2Easy.js`);
  const src = fs.readFileSync(p, 'utf8');
  // match quoted AND unquoted key styles — an unquoted `passage:` key must
  // not silently dodge the uniqueness gate (caught on test 3's first draft)
  const passages = [...src.matchAll(/["']?passage["']?\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
  if (passages.length < 20) {
    flag(`practiceTest${testN}RWM2Easy.js`, `only ${passages.length} passages extracted (expect ~24) — key-style dodge or structural break`);
  }
  passages.forEach((s, i) => uniq(s.replace(/\\n/g, ' '), rwCorpus, `RWM2Easy passage#${i + 1}`, matchSliding));
  console.log(`practiceTest${testN}RWM2Easy.js: ${passages.length} passages checked`);
}

checkMathFile(`practiceTest${testN}.js`);
checkMathFile(`practiceTest${testN}M2Easy.js`);
checkRWAuthored();
checkRWEasy();

if (failures) { console.error(`\n${failures} failure(s)`); process.exit(1); }
console.log('\nAll recreation checks passed.');
