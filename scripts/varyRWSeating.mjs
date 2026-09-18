#!/usr/bin/env node
/**
 * varyRWSeating.mjs — vary the R&W skill "seating chart" per test (2026-09-07).
 *
 * Every R&W module in all 12 tests carried the identical 27-slot skill
 * sequence (WIC×4, TS×3, XT, CI×3, CoE-T, CoE-Q×2, INF×2, BND/FSS alternating,
 * TRN×3, RS×2) — students saw the same seating chart on every test. The
 * official flow is only a BLOCK order (Craft & Structure → Information &
 * Ideas → Standard English Conventions → Expression of Ideas, vocabulary
 * first, notes last); within a block the official tests interleave skills
 * differently on every form. This script re-deals each module's items
 * inside their blocks with a per-test seed, so the block flow and every
 * per-skill count stay exactly as before but no two modules share a seating.
 *
 * Deterministic + idempotent: the canonical order is rebuilt from each item's
 * skill and id (not from file order), then the seeded permutation is applied,
 * so re-running reproduces the same file.
 *
 * Usage:
 *   node scripts/varyRWSeating.mjs --all | --test=N   [--dry]
 *   node scripts/varyRWSeating.mjs --report            # seating census of the live files
 *
 * Constraints kept (official flow): slots 1-4 WIC; slots 5-8 TS/XT; slots 9-16
 * I&I with a CI item first and an INF item last; slots 17-22 BND/FSS;
 * slots 23-25 TRN; slots 26-27 RS. Item text is moved verbatim — nothing
 * inside an item changes, ids travel with their items.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TESTS_DIR = path.join(ROOT, 'src', 'data', 'practiceTests');
const args = Object.fromEntries(process.argv.slice(2).map(a => { const m = a.match(/^--([\w-]+)(?:=(.*))?$/); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));

const BLOCK = {
  'words-in-context': 0,
  'text-structure-and-purpose': 1, 'cross-text-connections': 1,
  'central-ideas-and-details': 2, 'command-of-evidence-textual': 2, 'command-of-evidence-quantitative': 2, 'inferences': 2,
  boundaries: 3, 'form-structure-and-sense': 3,
  transitions: 4,
  'rhetorical-synthesis': 5,
};
const hash32 = (s) => { let h = 2166136261 >>> 0; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
const mulberry32 = (seed) => () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffled = (arr, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/** Deal a module's items into a fresh seating. `items` = [{id, skill, ...}] in any order. Returns the new item order. */
export function dealSeating(items, seedKey) {
  const rnd = mulberry32(hash32(seedKey));
  // canonical order: by block, then by id (stable across re-runs)
  const canon = items.slice().sort((a, b) => (BLOCK[a.skill] - BLOCK[b.skill]) || (a.id - b.id));
  const blocks = [[], [], [], [], [], []];
  canon.forEach(q => blocks[BLOCK[q.skill]].push(q));
  const canonSeq = canon.map(q => q.skill).join('|');
  for (let attempt = 0; attempt < 200; attempt++) {
    const out = [];
    out.push(...shuffled(blocks[0], rnd));                      // WIC: any order
    out.push(...shuffled(blocks[1], rnd));                      // TS / XT interleave
    // I&I: first item central-ideas, last item inferences, rest free
    const ii = shuffled(blocks[2], rnd);
    const ciIdx = ii.findIndex(q => q.skill === 'central-ideas-and-details');
    if (ciIdx > 0) { const [ci] = ii.splice(ciIdx, 1); ii.unshift(ci); }
    let infIdx = -1; for (let i = ii.length - 1; i >= 0; i--) if (ii[i].skill === 'inferences') { infIdx = i; break; }
    if (infIdx >= 0 && infIdx !== ii.length - 1) { const [inf] = ii.splice(infIdx, 1); ii.push(inf); }
    out.push(...ii);
    out.push(...shuffled(blocks[3], rnd));                      // BND / FSS pattern
    out.push(...shuffled(blocks[4], rnd));                      // TRN
    out.push(...shuffled(blocks[5], rnd));                      // RS (notes last)
    if (out.map(q => q.skill).join('|') !== canonSeq || attempt === 199) return out;
  }
  throw new Error('unreachable');
}

/** Item object spans in a bundle file, tagged with the index of their enclosing `questions` array. */
function questionSpans(text, itemDepth) {
  const spans = []; const stack = []; let depth = 0, inStr = null, esc = false, inLine = false, inBlock = false, qArrays = -1;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (inLine) { if (c === '\n') inLine = false; continue; }
    if (inBlock) { if (c === '*' && n === '/') { inBlock = false; i++; } continue; }
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
    if (c === '/' && n === '/') { inLine = true; i++; continue; }
    if (c === '/' && n === '*') { inBlock = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '{' || c === '[') {
      depth++; stack.push({ kind: c === '{' ? 'obj' : 'arr', start: i });
      if (c === '[' && depth === itemDepth - 1 && /questions["']?\s*:\s*$/.test(text.slice(Math.max(0, i - 40), i))) qArrays++;
      continue;
    }
    if (c === '}' || c === ']') {
      const open = stack.pop();
      if (depth === itemDepth && c === '}' && open?.kind === 'obj') spans.push({ start: open.start, end: i + 1, moduleIndex: qArrays });
      depth--;
    }
  }
  return spans;
}

async function loadBundle(file) {
  const m = await import(pathToFileURL(file).href + `?t=${Date.now()}_${Math.random()}`);
  return m.default || Object.values(m).find(v => v && typeof v === 'object');
}

const BANNER = '// R&W seating varied 2026-09-07 (scripts/varyRWSeating.mjs): items re-dealt inside their official skill blocks with a per-test seed — block flow and per-skill counts unchanged.\n';

async function processFile(n, kind, { dry }) {
  const file = path.join(TESTS_DIR, kind === 'easy' ? `practiceTest${n}RWM2Easy.js` : `practiceTest${n}RW.js`);
  const text = fs.readFileSync(file, 'utf8');
  const bundle = await loadBundle(file);
  const modules = kind === 'easy' ? [bundle.questions] : bundle.modules.map(m => m.questions);
  const spans = questionSpans(text, kind === 'easy' ? 3 : 5);
  const plan = []; // { span, newText }
  let changedModules = 0;
  modules.forEach((qs, mi) => {
    const modSpans = spans.filter(s => s.moduleIndex === mi);
    if (modSpans.length !== qs.length) throw new Error(`${path.basename(file)} module ${mi}: ${modSpans.length} spans vs ${qs.length} items`);
    // sanity: span i carries item i (by id)
    modSpans.forEach((s, i) => { const m = text.slice(s.start, s.end).match(/(?:^|[\s{,])["']?id["']?\s*:\s*(\d+)/); if (!m || Number(m[1]) !== qs[i].id) throw new Error(`${path.basename(file)} module ${mi}: span ${i} id ${m?.[1]} ≠ item ${qs[i].id}`); });
    for (const q of qs) if (BLOCK[q.skill] === undefined) throw new Error(`${path.basename(file)}: unknown skill ${q.skill}`);
    const seedKey = `rw-seating:v2:test${n}:${kind === 'easy' ? 'm2easy' : `m${mi + 1}`}`;
    const order = dealSeating(qs.map((q, i) => ({ id: q.id, skill: q.skill, i })), seedKey);
    const before = qs.map(q => q.skill).join('|'), after = order.map(q => q.skill).join('|');
    if (before !== after) changedModules++;
    order.forEach((q, pos) => plan.push({ span: modSpans[pos], newText: text.slice(modSpans[q.i].start, modSpans[q.i].end) }));
  });
  if (dry) { console.log(`${path.basename(file)}: ${changedModules}/${modules.length} module(s) would change seating`); return; }
  let out = ''; let cursor = 0;
  plan.sort((a, b) => a.span.start - b.span.start).forEach(({ span, newText }) => { out += text.slice(cursor, span.start) + newText; cursor = span.end; });
  out += text.slice(cursor);
  if (!out.includes('R&W seating varied')) out = out.replace(/^(\/\/[^\n]*\n)/, `$1${BANNER}`);
  fs.writeFileSync(file, out);
  // re-import: same multiset of items per module, block order holds
  const after = await loadBundle(file);
  const mods2 = kind === 'easy' ? [after.questions] : after.modules.map(m => m.questions);
  mods2.forEach((qs, mi) => {
    const beforeIds = modules[mi].map(q => q.id).sort((a, b) => a - b).join(','), afterIds = qs.map(q => q.id).sort((a, b) => a - b).join(',');
    if (beforeIds !== afterIds) throw new Error(`${path.basename(file)} module ${mi}: item set changed — REVERT`);
    const byId = new Map(modules[mi].map(q => [q.id, q]));
    qs.forEach(q => { if (JSON.stringify(q) !== JSON.stringify(byId.get(q.id))) throw new Error(`${path.basename(file)} module ${mi}: item ${q.id} content changed — REVERT`); });
    const blocksSeq = qs.map(q => BLOCK[q.skill]);
    for (let i = 1; i < blocksSeq.length; i++) if (blocksSeq[i] < blocksSeq[i - 1]) throw new Error(`${path.basename(file)} module ${mi}: block order broken at slot ${i + 1}`);
  });
  console.log(`${path.basename(file)}: ${changedModules}/${modules.length} module(s) re-seated (verified by re-import)`);
}

async function report() {
  const seqs = new Map();
  for (let n = 1; n <= 12; n++) {
    for (const kind of ['std', 'easy']) {
      const file = path.join(TESTS_DIR, kind === 'easy' ? `practiceTest${n}RWM2Easy.js` : `practiceTest${n}RW.js`);
      const b = await loadBundle(file);
      const mods = kind === 'easy' ? [b.questions] : b.modules.map(m => m.questions);
      mods.forEach((qs, mi) => { const key = qs.map(q => q.skill.split('-').map(w => w[0]).join('')).join(' '); const label = `T${n} ${kind === 'easy' ? 'M2E' : `M${mi + 1}`}`; if (!seqs.has(key)) seqs.set(key, []); seqs.get(key).push(label); });
    }
  }
  console.log(`distinct seating charts across 36 modules: ${seqs.size}`);
  for (const [k, v] of seqs) console.log(`  ${v.length}× ${v.join(',')}: ${k}`);
}

(async () => {
  if (args.report) { await report(); return; }
  const tests = args.all ? Array.from({ length: 12 }, (_, i) => i + 1) : args.test ? String(args.test).split(',').map(Number) : null;
  if (!tests) { console.error('usage: varyRWSeating.mjs --all | --test=N [--dry] | --report'); process.exit(1); }
  for (const n of tests) { await processFile(n, 'std', { dry: !!args.dry }); await processFile(n, 'easy', { dry: !!args.dry }); }
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });
