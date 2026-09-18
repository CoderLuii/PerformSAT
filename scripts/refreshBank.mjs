#!/usr/bin/env node
/**
 * refreshBank.mjs — freshness pass over the math DRILL bank (docs/BANK_FRESHNESS_SPEC.md).
 *
 * The 2026-09-04 bank recreation froze every item's pattern and showed authors
 * the old stem, so 810 of 2,121 items came back as the old item with new
 * numbers, and inside the bank 38% of items have a near-verbatim twin. This
 * pass (a) picks the minimal set of items to rewrite so that no drill is a
 * near-copy of its old self, of a current practice-test question, or of
 * another drill, (b) writes those items as chunks in recreateBank's format
 * (frozen metadata + a surface FORM per item, NO old stem), and (c) verifies
 * the live bank afterwards. Authoring/verification/assembly run through
 * scripts/recreateBank.mjs (check gains a freshness gate for `fresh` rows).
 *
 * Usage:
 *   node scripts/refreshBank.mjs plan            # rewrite set + seen corpus + chunks fresh-01..NN
 *   node scripts/refreshBank.mjs status          # authored / assembled per chunk
 *   node scripts/refreshBank.mjs verify          # live-bank census: old-self, tests, pairwise, register
 *
 * Lines: vs the item's own old versions and vs current tests: Dice ≥ 0.55 = FAIL;
 * vs any other bank item (kept or rewritten): Dice ≥ 0.65 = FAIL (drills are reps
 * of one archetype and may share more structure than test items).
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadSource, SOURCES, frozenOf, fileIdOf, keyOf, readAuthored, patternTitleOf, numericOf } from './recreateBank.mjs';
import { PATTERN_TO_CB_SKILL, CB_MATH_SKILLS } from '../src/data/questions/cbSkillTaxonomy.js';
import { extractSatPattern } from '../src/data/questions/extractSatPattern.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GEN = path.join(ROOT, 'scripts', 'generated');
const WORK = path.join(GEN, 'bankRecreation');
const FRESH = path.join(WORK, 'fresh');
const TESTS_DIR = path.join(ROOT, 'src', 'data', 'practiceTests');
const REF_OLD_BANK = '23fb00f';   // last commit before the 2026-09-04 bank recreation
const CHUNK_SIZE = 60;
export const FRESH_FAIL_SEEN = 0.55;   // vs own old versions + current tests
export const FRESH_FAIL_SIBLING = 0.65; // vs any other bank item
const SHORT = { easy: 19, medium: 24, hard: 29 }; // < 60% of the official stem norm → rewrite for register

const CB_LABEL = new Map(CB_MATH_SKILLS.map(s => [s.slug, s.label]));
const args = Object.fromEntries(process.argv.slice(3).map(a => { const m = a.match(/^--([\w-]+)(?:=(.*))?$/); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const cmd = process.argv[2];

export const normStem = (s) => String(s || '').toLowerCase().replace(/\d+([.,]\d+)?/g, '#').replace(/\s+/g, ' ').trim();
export const trigrams = (s) => { const m = new Map(); for (let i = 0; i < s.length - 2; i++) { const t = s.slice(i, i + 3); m.set(t, (m.get(t) || 0) + 1); } return m; };
export const diceOf = (a, b) => { let inter = 0, sa = 0, sb = 0; for (const [k, v] of a) { sa += v; const w = b.get(k) || 0; inter += Math.min(v, w); } for (const v of b.values()) sb += v; return sa + sb ? (2 * inter) / (sa + sb) : 0; };
const entry = (id, text, extra = {}) => { const t = normStem(text); return { id, text: t, tri: trigrams(t), len: t.length, ...extra }; };
export function nearest(text, corpus, skipId = null) {
  const t = normStem(text); const tri = trigrams(t); let best = { dice: 0, id: null, t: null };
  for (const s of corpus) {
    if (skipId && s.id === skipId) continue;
    if (s.len < t.length * 0.35 || s.len > t.length / 0.35) continue;
    const d = diceOf(tri, s.tri); if (d > best.dice) best = { dice: d, id: s.id, t: s.t ?? null };
  }
  return best;
}
const words = (s) => String(s || '').replace(/\\\$/g, 'S').replace(/\$[^$]*\$/g, 'M').split(/\s+/).filter(Boolean).length;
const hash32 = (s) => { let h = 2166136261 >>> 0; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
const mulberry32 = (seed) => () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

const FORMS = [
  { key: 'context', hint: 'one-clause real-world setup (measured data, a model with named constants) — no story', diffs: ['easy', 'medium', 'hard'] },
  { key: 'parameter', hint: 'parameter/constant version — a letter constant, "for what value of k", or "must be true"', diffs: ['medium', 'hard'] },
  { key: 'reverse', hint: 'reverse direction — the usual answer is given, solve back for an input or a coefficient', diffs: ['medium', 'hard'] },
  { key: 'interpret', hint: 'interpretation/which-statement form — choices are statements or expressions, not a computed number', diffs: ['easy', 'medium', 'hard'] },
  { key: 'figure', hint: 'figure- or table-driven: the given information lives in a real diagram/questionTable', diffs: ['easy', 'medium', 'hard'] },
];
const PALETTES = [
  'physical-science & engineering measurements', 'personal finance & budgeting', 'manufacturing & materials',
  'weather & climate data', 'ecology & wildlife populations', 'sports & athletic performance data',
  'public health & epidemiology', 'civil infrastructure (bridges, water systems, traffic)', 'visual & performing arts production',
  'transportation & logistics', 'food science & agriculture', 'astronomy & space instruments',
  'education & library statistics', 'retail pricing & inventory of specific goods', 'energy & utilities (solar, batteries, water use)',
  'geology & oceanography', 'music & audio engineering', 'urban planning & land use',
  'chemistry lab measurements', 'computing & data storage/networks', 'architecture & construction',
  'travel & tourism data', 'medicine & dosing', 'textiles & garment production',
];

// ─── corpora ───────────────────────────────────────────────────────────────
async function currentBank() {
  const out = [];
  for (const name of Object.keys(SOURCES)) {
    const { src, items } = await loadSource(name);
    for (const it of items) {
      const f = frozenOf(src.kind, it, name);
      out.push({ name, kind: src.kind, q: it.q, meta: it.meta, frozen: f, fileId: fileIdOf(src.kind, f), key: keyOf(src.kind, f), e: entry(`bank:${name}/${it.q.id}`, it.q.question) });
    }
  }
  return out;
}
async function oldBankById() {
  const map = new Map();
  fs.mkdirSync(path.join(FRESH, 'mods'), { recursive: true });
  for (const name of Object.keys(SOURCES)) {
    const rel = SOURCES[name].file; let txt;
    try { txt = execSync(`git -C "${ROOT}" show ${REF_OLD_BANK}:${rel}`, { maxBuffer: 1e8 }).toString(); } catch { continue; }
    const out = path.join(FRESH, 'mods', `old_${name}.mjs`); fs.writeFileSync(out, txt);
    const m = await import(pathToFileURL(out).href + `?t=${Date.now()}`); const data = m[SOURCES[name].exportName];
    const add = (q) => map.set(`${name}/${q.id}`, entry(`old:${name}/${q.id}`, q.question));
    if (Array.isArray(data)) data.forEach(add); else for (const arr of Object.values(data)) arr.forEach(add);
  }
  return map;
}
function currentTests() {
  const out = [];
  for (let n = 1; n <= 12; n++) for (const f of [`practiceTest${n}.js`, `practiceTest${n}M2Easy.js`]) {
    const txt = fs.readFileSync(path.join(TESTS_DIR, f), 'utf8');
    [...txt.matchAll(/question:\s*"((?:[^"\\]|\\.)*)"/g)].forEach((m, i) => out.push(entry(`test:${f}#${i + 1}`, JSON.parse(`"${m[1]}"`))));
  }
  return out;
}

// ─── plan ──────────────────────────────────────────────────────────────────
async function plan() {
  fs.mkdirSync(FRESH, { recursive: true }); fs.mkdirSync(path.join(WORK, 'chunks'), { recursive: true });
  const bank = await currentBank(); const old = await oldBankById(); const tests = currentTests();
  console.log(`bank ${bank.length} · old bank ${old.size} · current test stems ${tests.length}`);
  // 1. flags
  for (const b of bank) {
    const o = old.get(`${b.name}/${b.q.id}`);
    b.nearOld = o ? diceOf(b.e.tri, o.tri) >= FRESH_FAIL_SEEN && !(o.len < b.e.len * 0.35 || o.len > b.e.len / 0.35) : false;
    b.nearTest = nearest(b.q.question, tests).dice >= FRESH_FAIL_SEEN;
    b.short = words(b.q.question) < (SHORT[b.q.difficulty] || 24) && !(b.q.diagram || b.q.questionTable);
  }
  // 2. greedy keep set (prefer clean, figure-bearing, longer items)
  const order = bank.map((_, i) => i).sort((a, b) => {
    const A = bank[a], B = bank[b];
    const fa = (A.nearOld || A.nearTest || A.short) ? 1 : 0, fb = (B.nearOld || B.nearTest || B.short) ? 1 : 0;
    if (fa !== fb) return fa - fb;
    const ga = (A.q.diagram || A.q.questionTable) ? 1 : 0, gb = (B.q.diagram || B.q.questionTable) ? 1 : 0;
    if (ga !== gb) return gb - ga;
    return words(B.q.question) - words(A.q.question);
  });
  const kept = []; const rewrite = [];
  for (const i of order) {
    const b = bank[i];
    if (b.nearOld || b.nearTest || b.short) { rewrite.push(b); continue; }
    let ok = true; for (const k of kept) { if (k.e.len < b.e.len * 0.35 || k.e.len > b.e.len / 0.35) continue; if (diceOf(b.e.tri, k.e.tri) >= FRESH_FAIL_SIBLING) { ok = false; break; } }
    (ok ? kept : rewrite).push(b);
  }
  console.log(`keep ${kept.length} · rewrite ${rewrite.length} (near old self ${bank.filter(b => b.nearOld).length}, near test ${bank.filter(b => b.nearTest).length}, thin stem ${bank.filter(b => b.short).length})`);
  // 3. seen corpus: old versions of EVERY item (0.55), current versions of rewrite items (0.55), current tests (0.55), kept bank items (0.65)
  const seen = [];
  for (const [id, o] of old) seen.push({ id: o.id, text: o.text, t: FRESH_FAIL_SEEN });
  for (const b of rewrite) seen.push({ id: `cur:${b.name}/${b.q.id}`, text: b.e.text, t: FRESH_FAIL_SEEN });
  for (const s of tests) seen.push({ id: s.id, text: s.text, t: FRESH_FAIL_SEEN });
  for (const b of kept) seen.push({ id: `kept:${b.name}/${b.q.id}`, text: b.e.text, t: FRESH_FAIL_SIBLING });
  fs.writeFileSync(path.join(FRESH, 'seen.json'), JSON.stringify(seen));
  fs.writeFileSync(path.join(FRESH, 'keep.json'), JSON.stringify(kept.map(b => `${b.name}/${b.q.id}`)));
  // baseline = the CURRENT stem of every rewrite item; an authored JSON whose stem still equals it has not been rewritten yet
  fs.writeFileSync(path.join(FRESH, 'baseline.json'), JSON.stringify(Object.fromEntries(rewrite.map(b => [`${b.name}/${b.fileId}`, b.e.text]))));
  // 4. chunks: group by source, then pattern, then id; rotate forms inside a pattern group; palettes per chunk
  rewrite.sort((a, b) => a.name.localeCompare(b.name) || String(a.frozen.patternTitle || a.meta.sectionName || '').localeCompare(String(b.frozen.patternTitle || b.meta.sectionName || '')) || String(a.q.id).localeCompare(String(b.q.id)));
  const rnd = mulberry32(hash32('bank-fresh:v1'));
  const groupIdx = new Map();
  const rows = rewrite.map(b => {
    const f = b.frozen; const g = `${b.name}|${f.patternTitle || b.meta.sectionName}`; const gi = groupIdx.get(g) || 0; groupIdx.set(g, gi + 1);
    const hasFig = !!(b.q.diagram || b.q.questionTable);
    const formsOk = FORMS.filter(x => x.key !== 'figure' && x.diffs.includes(f.difficulty) && (f.type !== 'fill-in' || x.key !== 'interpret'));
    const form = hasFig ? FORMS[4] : formsOk[(gi + Math.floor(rnd() * 2)) % formsOk.length];
    const slug = extractSatPattern(b.q.explanation); const cb = slug ? PATTERN_TO_CB_SKILL[slug] : null;
    return {
      fileId: b.fileId, key: b.key, source: b.name, kind: b.kind, ...f,
      cbSkillSlug: cb, cbSkillLabel: cb ? CB_LABEL.get(cb) || cb : null, patternSlug: slug,
      hasDiagram: !!b.q.diagram, diagramType: b.q.diagram?.type || null, hasQuestionTable: !!b.q.questionTable,
      choicesNumeric: Array.isArray(b.q.choices) && b.q.choices.length === 4 && b.q.choices.every(c => !Number.isNaN(numericOf(c.text))),
      fresh: true, figure: hasFig, form: form.key, formHint: form.hint,
      why: [b.nearOld ? 'near its pre-09-04 version' : null, b.nearTest ? 'near a current test question' : null, b.short ? 'thin stem' : null].filter(Boolean).join('; ') || 'near another drill',
    };
  });
  // remove stale fresh chunks
  for (const f of fs.readdirSync(path.join(WORK, 'chunks'))) if (/^fresh-\d+\.json$/.test(f)) fs.unlinkSync(path.join(WORK, 'chunks', f));
  const chunks = [];
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) chunks.push(rows.slice(i, i + CHUNK_SIZE));
  chunks.forEach((items, ci) => {
    const id = `fresh-${String(ci + 1).padStart(2, '0')}`;
    const withFig = items.filter(r => r.figure).length;
    const figureTarget = Math.max(withFig, Math.round(items.length * 0.25));
    // top up figure slots so the chunk lands ≥ 25%, choosing the items whose archetype naturally
    // carries a figure or table (graphs, tables of values, geometry, data) before anything else
    let need = figureTarget - withFig;
    const FIGURE_WORDS = /table|graph|scatter|line of best|slope|intercept|linear function|function value|circle|triangle|angle|area|volume|perimeter|distance|midpoint|mean|median|probability|percent|rate|exponential|parabola|vertex|system|two-way|dot plot|box plot|histogram|residual|data/i;
    const suit = (r) => (FIGURE_WORDS.test(`${r.patternTitle || ''} ${(r.skills || []).join(' ')} ${r.sectionName || ''}`) ? 2 : 0) + (r.domain === 'geometry' || r.domain === 'problem-solving' ? 1 : 0);
    const candidates = items.filter(r => !r.figure && r.type === 'multiple-choice').sort((a, b) => suit(b) - suit(a));
    for (const r of candidates) { if (need <= 0) break; if (suit(r) === 0) break; r.figure = true; r.form = 'figure'; r.formHint = FORMS[4].hint; need--; }
    const palette = [0, 1, 2].map(k => PALETTES[((ci * 3) + k) % PALETTES.length]);
    const sources = [...new Set(items.map(r => r.source))];
    fs.writeFileSync(path.join(WORK, 'chunks', `${id}.json`), JSON.stringify({ chunk: id, sources, kind: 'mixed', count: items.length, figureTarget, existingFigures: withFig, palette, items }, null, 1));
  });
  const perSource = {}; rows.forEach(r => perSource[r.source] = (perSource[r.source] || 0) + 1);
  console.log(`chunks: ${chunks.length} × ≤${CHUNK_SIZE} · per source ${JSON.stringify(perSource)}`);
  const forms = {}; rows.forEach(r => forms[r.form] = (forms[r.form] || 0) + 1); console.log('forms', JSON.stringify(forms));
}

// ─── status / verify ───────────────────────────────────────────────────────
function freshChunks() { return fs.readdirSync(path.join(WORK, 'chunks')).filter(f => /^fresh-\d+\.json$/.test(f)).sort().map(f => JSON.parse(fs.readFileSync(path.join(WORK, 'chunks', f), 'utf8'))); }
async function status() {
  const rows = [];
  for (const c of freshChunks()) {
    const baseline = JSON.parse(fs.readFileSync(path.join(FRESH, 'baseline.json'), 'utf8'));
    let authored = 0; for (const r of c.items) { const got = readAuthored(r.source, r.fileId); if (got && !got.error && normStem(got.data.question) !== baseline[`${r.source}/${r.fileId}`]) authored++; }
    rows.push({ chunk: c.chunk, items: c.count, authored, sources: c.sources.join(',') });
  }
  console.table(rows);
}
async function verify() {
  const bank = await currentBank(); const old = await oldBankById(); const tests = currentTests();
  const rewriteIds = new Set(freshChunks().flatMap(c => c.items.map(r => `${r.source}/${r.id}`)));
  let fails = 0;
  for (const b of bank) {
    if (!rewriteIds.has(`${b.name}/${b.q.id}`)) continue;
    const o = old.get(`${b.name}/${b.q.id}`);
    if (o && !(o.len < b.e.len * 0.35 || o.len > b.e.len / 0.35) && diceOf(b.e.tri, o.tri) >= FRESH_FAIL_SEEN) { fails++; console.error(`FAIL ${b.name}/${b.q.id}: still near its pre-09-04 version (Dice ${diceOf(b.e.tri, o.tri).toFixed(2)})`); }
    const t = nearest(b.q.question, tests); if (t.dice >= FRESH_FAIL_SEEN) { fails++; console.error(`FAIL ${b.name}/${b.q.id}: near current test ${t.id} (Dice ${t.dice.toFixed(2)})`); }
  }
  // pairwise across the whole bank
  let pairs = 0; const worst = [];
  for (let a = 0; a < bank.length; a++) for (let b = a + 1; b < bank.length; b++) {
    const A = bank[a].e, B = bank[b].e; if (B.len < A.len * 0.35 || B.len > A.len / 0.35) continue;
    const d = diceOf(A.tri, B.tri); if (d >= FRESH_FAIL_SIBLING) { pairs++; if (worst.length < 12) worst.push(`${A.id} ~ ${B.id} ${d.toFixed(2)}`); }
  }
  console.log(`pairwise bank pairs at/above ${FRESH_FAIL_SIBLING}: ${pairs}`); worst.forEach(w => console.log('  ' + w));
  const med = (a) => { const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  for (const d of ['easy', 'medium', 'hard']) console.log(`stem median words ${d}: ${med(bank.filter(b => b.q.difficulty === d).map(b => words(b.q.question)))}`);
  console.log(`figures/tables: ${bank.filter(b => b.q.diagram || b.q.questionTable).length}/${bank.length}`);
  if (fails) { console.error(`${fails} failure(s)`); process.exit(1); }
  console.log('verify passed');
}

(async () => {
  switch (cmd) {
    case 'plan': await plan(); break;
    case 'status': await status(); break;
    case 'verify': await verify(); break;
    default: console.error('usage: refreshBank.mjs plan|status|verify'); process.exit(1);
  }
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });
