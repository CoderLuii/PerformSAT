#!/usr/bin/env node
/**
 * recreateTestMath.mjs — v2 freshness rebuild of the 12 practice-test MATH
 * bundles (docs/TEST_RECREATION_V2_SPEC.md).
 *
 * Why v2: the 2026-08-31 recreation froze every slot's SAT Pattern and showed
 * authors the old item, so 59% of the 792 math items came back as the old
 * question with new numbers and 35% had a near-verbatim twin in another test.
 * Students noticed. This pipeline (a) reassigns the pattern of every slot so no
 * slot keeps the pattern students saw in either earlier version, (b) refuses
 * any stem that is close to ANY item a student may have seen — the pre-08-31
 * tests, the 08-31 tests, the drill bank — or to any other new item, and
 * (c) re-deals the Module 2 difficulty flow per test.
 *
 * Usage:
 *   node scripts/recreateTestMath.mjs plan       [--all | --test=N]            # pattern plan + chunks + seen corpus
 *   node scripts/recreateTestMath.mjs check      --chunk=test1-m1[,test1-m2] | --test=N | --all
 *   node scripts/recreateTestMath.mjs solvesheet --chunk=test1-m1
 *   node scripts/recreateTestMath.mjs assemble   --test=N [--chunk=...] [--dry]
 *   node scripts/recreateTestMath.mjs verify     --test=N | --all
 *   node scripts/recreateTestMath.mjs status
 *   node scripts/recreateTestMath.mjs freshness  --test=N | --all              # report-only on live files
 *   node scripts/recreateTestMath.mjs score      --text="candidate stem" | --file=stems.json   # author helper: freshness of a draft
 *
 * Authored JSON: scripts/generated/authored/tests2/test{N}/{m1|m2|m2easy}-q{NN}.json (committed).
 * Plans/chunks/seen corpus: scripts/generated/testRecreation2/ (gitignored; regenerate with `plan --all`).
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  checkItem, findSpans as _unusedFindSpans, serializeItem, deepEq, officialIndex, loadSource, SOURCES,
  patternTitleOf, wordCount, numericOf, median,
} from './recreateBank.mjs';
import { SKILL_TO_CB, CB_SKILL_TO_DOMAIN, M2_FLOW, checkUniquenessSliding, tokenize } from './calibrateModule.mjs';
import { CB_MATH_SKILLS, PATTERN_TO_CB_SKILL } from '../src/data/questions/cbSkillTaxonomy.js';
import { extractSatPattern } from '../src/data/questions/extractSatPattern.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GEN = path.join(ROOT, 'scripts', 'generated');
const AUTHORED = path.join(GEN, 'authored', 'tests2');
const WORK = path.join(GEN, 'testRecreation2');
const TESTS_DIR = path.join(ROOT, 'src', 'data', 'practiceTests');

// Git refs of the two versions students have already seen.
const REF_PRE_RECREATION = 'abd3d4c';   // last commit before the 2026-08-31 rebuild
const REF_V1_RECREATION = '482040d';    // last commit of the 08-31 content before this v2 pass

const DOMAINS = ['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry'];
const MODULES = ['m1', 'm2', 'm2easy'];
const FIGURE_TARGET = { m1: 5, m2: 5, m2easy: 5 }; // ≥ 20% per module (official ~20%)
const FRESH_FAIL = 0.55;                 // trigram-Dice on digit-masked stems: ≥ this vs any seen/sibling stem = FAIL
const FRESH_WARN = 0.45;
const MIN_STEM_WORDS = 10;
// Scenario palettes: each chunk gets three themes so parallel authors never collide on a scenario
// and the same theme does not recur module after module. Rotates by (test, module).
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
const paletteFor = (n, modIdx) => { const g = (3 * (n - 1) + modIdx) % 8; return [0, 1, 2].map(k => PALETTES[(g * 3 + k) % PALETTES.length]); };

const CB_LABEL = new Map(CB_MATH_SKILLS.map(s => [s.slug, s.label]));
const args = Object.fromEntries(process.argv.slice(3).map(a => { const m = a.match(/^--([\w-]+)(?:=(.*))?$/); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const cmd = process.argv[2];

// ─── small utils ───────────────────────────────────────────────────────────
const hash32 = (s) => { let h = 2166136261 >>> 0; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; };
const mulberry32 = (seed) => () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffled = (arr, rnd) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const normStem = (s) => String(s || '').toLowerCase().replace(/\d+([.,]\d+)?/g, '#').replace(/\s+/g, ' ').trim();
const trigrams = (s) => { const m = new Map(); for (let i = 0; i < s.length - 2; i++) { const t = s.slice(i, i + 3); m.set(t, (m.get(t) || 0) + 1); } return m; };
const diceOf = (a, b) => { if (!a.size || !b.size) return 0; let inter = 0, sa = 0, sb = 0; for (const [k, v] of a) { sa += v; const w = b.get(k) || 0; inter += Math.min(v, w); } for (const v of b.values()) sb += v; return (2 * inter) / (sa + sb); };
const fileOf = (n, mod) => path.join(TESTS_DIR, mod === 'm2easy' ? `practiceTest${n}M2Easy.js` : `practiceTest${n}.js`);
const relFileOf = (n, mod) => path.relative(ROOT, fileOf(n, mod));
const chunkIdOf = (n, mod) => `test${n}-${mod}`;
const fileIdOf = (mod, id) => `${mod}-q${String(id).padStart(2, '0')}`;
const testsOf = () => (args.all ? Array.from({ length: 12 }, (_, i) => i + 1) : args.test ? String(args.test).split(',').map(Number) : null);

function domainOfSkills(skills) {
  const tally = {};
  for (const s of skills || []) for (const cb of new Set(SKILL_TO_CB[s] || [])) { const d = CB_SKILL_TO_DOMAIN[cb]; if (d) tally[d] = (tally[d] || 0) + 1; }
  let best = null, top = 0; for (const [d, c] of Object.entries(tally)) if (c > top) { top = c; best = d; }
  return best;
}
function domainOfPattern(slug) { const cb = slug ? PATTERN_TO_CB_SKILL[slug] : null; return cb ? CB_SKILL_TO_DOMAIN[cb] || null : null; }

// ─── loading live modules ──────────────────────────────────────────────────
async function loadTestModule(n, mod) {
  const m = await import(pathToFileURL(fileOf(n, mod)).href + `?t=${Date.now()}_${Math.random()}`);
  const data = m.default || Object.values(m).find(v => v && typeof v === 'object');
  if (mod === 'm2easy') return data.questions;
  return data.modules[mod === 'm1' ? 0 : 1].questions;
}
function stemsFromSource(src) {
  return [...src.matchAll(/question:\s*"((?:[^"\\]|\\.)*)"/g)].map(m => JSON.parse(`"${m[1]}"`));
}
function gitFile(ref, rel) { return execSync(`git -C "${ROOT}" show ${ref}:${rel}`, { maxBuffer: 1e8 }).toString(); }
function itemsFromSourceText(text) {
  // full item objects from a JS bundle via a sandboxed eval of the exported object
  const body = text.replace(/^export const \w+ = /m, 'module.exports = ').replace(/^export default .*$/m, '');
  const mod = { exports: null }; new Function('module', body)(mod);
  const data = mod.exports;
  return data.modules ? data.modules.map(m => m.questions) : [data.questions];
}

// ─── approved pattern registry (calibrateModule.mjs lint enforces it) ──────
function approvedPatternNames() {
  const src = fs.readFileSync(path.join(__dirname, 'calibrateModule.mjs'), 'utf8');
  const start = src.indexOf('const APPROVED_PATTERN_NAMES = new Set([') + 'const APPROVED_PATTERN_NAMES = new Set(['.length;
  const block = src.slice(start, src.indexOf(']);', start));
  // mixed single/double-quoted string literals with JS escapes — let the JS parser read them
  return new Set(new Function(`return [${block}]`)());
}

// ─── pattern pool: Tier-1-routable archetypes ──────────────────────────────
// A pattern is eligible only if (a) its title is in the lint's approved
// registry and (b) the drill bank holds ≥ 8 items with the same slug, so every
// test item can route a student to a real drill pool. Title variants that
// kebab to one slug collapse; the canonical title is the one the corpus uses
// most. Domain comes from the bank items' own `domain` field.
const BANK_DOMAIN_LABEL = { algebra: 'Algebra', 'advanced-math': 'Advanced Math', 'problem-solving': 'Problem-Solving and Data Analysis', geometry: 'Geometry and Trigonometry' };
const MIN_BANK_ITEMS = 8;
const FORMS = [
  { key: 'bare', hint: 'bare algebraic form — equation/function given symbolically, no context', diffs: ['easy', 'medium', 'hard'] },
  { key: 'context', hint: 'one-clause real-world setup (measured data, a model with named constants) — no story', diffs: ['easy', 'medium', 'hard'] },
  { key: 'figure', hint: 'figure- or table-driven: the given information lives in a real diagram/questionTable', diffs: ['easy', 'medium', 'hard'] },
  { key: 'parameter', hint: 'parameter/constant version — a letter constant, "for what value of k", or "must be true"', diffs: ['medium', 'hard'] },
  { key: 'reverse', hint: 'reverse direction — the usual answer is given, solve back for an input or a coefficient', diffs: ['medium', 'hard'] },
  { key: 'interpret', hint: 'interpretation/which-statement form — choices are statements or expressions, not a computed number', diffs: ['easy', 'medium', 'hard'] },
];
async function buildPool() {
  const approved = approvedPatternNames();
  const slugOfTitle = (t) => extractSatPattern(`**SAT Pattern: ${t}**`);
  const bySlug = new Map();
  const touch = (slug) => { let e = bySlug.get(slug); if (!e) { e = { slug, titles: new Map(), bankCount: 0, domainTally: {}, diffs: { easy: 0, medium: 0, hard: 0 }, fillin: 0, numericMC: 0, figure: 0, count: 0, skillsTally: new Map() }; bySlug.set(slug, e); } return e; };
  const addItem = (q, fromBank) => {
    const slug = extractSatPattern(q.explanation); if (!slug) return;
    const e = touch(slug); const title = patternTitleOf(q.explanation);
    if (title) e.titles.set(title, (e.titles.get(title) || 0) + 1);
    e.count++; e.diffs[q.difficulty] = (e.diffs[q.difficulty] || 0) + 1;
    if (fromBank) { e.bankCount++; if (q.domain) e.domainTally[q.domain] = (e.domainTally[q.domain] || 0) + 1; }
    if (q.type === 'fill-in') e.fillin++;
    if (Array.isArray(q.choices) && q.choices.length === 4 && q.choices.every(c => !Number.isNaN(numericOf(c.text)))) e.numericMC++;
    if (q.diagram || q.questionTable) e.figure++;
    const sk = JSON.stringify(q.skills || []); e.skillsTally.set(sk, (e.skillsTally.get(sk) || 0) + 1);
  };
  for (const name of ['algebra', 'problemSolving', 'advancedMath', 'geometry']) (await loadSource(name)).items.forEach(it => addItem(it.q, true));
  for (let n = 1; n <= 12; n++) for (const mod of MODULES) (await loadTestModule(n, mod)).forEach(q => addItem(q, false));
  const out = [];
  for (const e of bySlug.values()) {
    if (e.bankCount < MIN_BANK_ITEMS) continue;
    const approvedTitles = [...e.titles.entries()].filter(([t]) => approved.has(t)).sort((x, y) => y[1] - x[1]);
    const fallback = [...approved].find(t => slugOfTitle(t) === e.slug);
    const title = approvedTitles[0]?.[0] || fallback; if (!title) continue;
    let dom = null, top = 0; for (const [d, c] of Object.entries(e.domainTally)) if (c > top) { top = c; dom = d; }
    const domain = BANK_DOMAIN_LABEL[dom]; if (!domain) continue;
    let bestSk = '[]', topSk = 0; for (const [k, c] of e.skillsTally) if (c > topSk) { topSk = c; bestSk = k; }
    const cb = PATTERN_TO_CB_SKILL[e.slug] || null;
    out.push({ title, slug: e.slug, cbSkillSlug: cb, cbSkillLabel: cb ? CB_LABEL.get(cb) || cb : null, domain, diffs: e.diffs, fillin: e.fillin, numericMC: e.numericMC, figure: e.figure, count: e.count, bankCount: e.bankCount, skills: JSON.parse(bestSk) });
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

// ─── seen corpus (everything a student may already have met) ───────────────
async function buildSeen() {
  const seen = [];
  const push = (id, text) => { const t = normStem(text); if (t.length >= 20) seen.push({ id, text: t }); };
  for (const ref of [REF_PRE_RECREATION, REF_V1_RECREATION]) {
    for (let n = 1; n <= 12; n++) for (const mod of MODULES) {
      const rel = relFileOf(n, mod);
      let src; try { src = gitFile(ref, rel); } catch { continue; }
      stemsFromSource(src).forEach((s, i) => push(`${ref}:${path.basename(rel)}#${i + 1}`, s));
    }
  }
  for (const name of Object.keys(SOURCES)) (await loadSource(name)).items.forEach(it => push(`bank:${name}/${it.q.id}`, it.q.question));
  return seen;
}

// ─── M2 flow re-deal ───────────────────────────────────────────────────────
function m2FlowOk(seq) {
  // seq: [{difficulty, band}] length 22, 1-indexed positions in comments
  const d = seq.map(x => x.difficulty); const b = seq.map(x => x.band || 4);
  const at = (i) => d[i - 1];
  const count = (df, from, to) => { let c = 0; for (let i = from; i <= to; i++) if (at(i) === df) c++; return c; };
  const E = count('easy', 1, 22), M = count('medium', 1, 22), H = count('hard', 1, 22);
  if (at(1) === 'hard') return false;
  if (E < M2_FLOW.easyMin || E > M2_FLOW.easyMax) return false;
  if (count('easy', 1, M2_FLOW.earlyEasyZoneEnd) < M2_FLOW.earlyEasyMin) return false;
  if (count('easy', M2_FLOW.breatherZone[0], M2_FLOW.breatherZone[1]) > 1) return false;
  if (count('easy', M2_FLOW.closerZone[0], M2_FLOW.closerZone[1]) > 0) return false;
  if (M < M2_FLOW.mediumMin || M > M2_FLOW.mediumMax) return false;
  if (H < M2_FLOW.hardMin) return false;
  if (at(21) !== 'hard' || at(22) !== 'hard') return false;
  if (count('hard', M2_FLOW.lateHardZone[0], M2_FLOW.lateHardZone[1]) < M2_FLOW.lateHardMin) return false;
  const mean = (from, to) => { let s = 0; for (let i = from; i <= to; i++) s += b[i - 1]; return s / (to - from + 1); };
  if (!(mean(1, 5) < mean(18, 22))) return false;
  return true;
}
function redealM2(current, forbiddenSeqs, rnd) {
  const pairs = current.map(q => ({ difficulty: q.difficulty, band: q.band }));
  const sig = (s) => s.map(x => x.difficulty[0]).join('');
  for (let tries = 0; tries < 20000; tries++) {
    const cand = shuffled(pairs, rnd);
    if (!m2FlowOk(cand)) continue;
    if (forbiddenSeqs.has(sig(cand))) continue;
    // keep it recognisably a hard module: at most 1 easy in the first 3? no — official varies. Accept.
    return cand;
  }
  throw new Error('could not re-deal an M2 flow satisfying M2_FLOW — check the module counts');
}

// ─── plan ──────────────────────────────────────────────────────────────────
async function plan(tests) {
  fs.mkdirSync(path.join(WORK, 'plan'), { recursive: true });
  fs.mkdirSync(path.join(WORK, 'chunks'), { recursive: true });
  const pool = await buildPool();
  fs.writeFileSync(path.join(WORK, 'pool.json'), JSON.stringify(pool, null, 1));
  const seen = await buildSeen();
  fs.writeFileSync(path.join(WORK, 'seen.json'), JSON.stringify(seen));
  console.log(`pool: ${pool.length} approved patterns · seen corpus: ${seen.length} stems`);
  const byDomain = {}; for (const p of pool) (byDomain[p.domain] ||= []).push(p);
  for (const d of DOMAINS) console.log(`  ${d}: ${(byDomain[d] || []).length} patterns`);

  // usage across ALL 12 tests (previous plans count, so partial re-plans stay consistent)
  const usage = new Map();
  for (let n = 1; n <= 12; n++) {
    if (tests.includes(n)) continue;
    const p = path.join(WORK, 'plan', `test${n}.json`);
    if (fs.existsSync(p)) for (const row of JSON.parse(fs.readFileSync(p, 'utf8')).slots) usage.set(row.patternSlug, (usage.get(row.patternSlug) || 0) + 1);
  }
  const rank = { easy: 0, medium: 1, hard: 2 };
  const usageAt = new Map(); // `${slug}|${difficulty}` → count across tests
  for (let n = 1; n <= 12; n++) {
    if (tests.includes(n)) continue;
    const p = path.join(WORK, 'plan', `test${n}.json`);
    if (fs.existsSync(p)) for (const row of JSON.parse(fs.readFileSync(p, 'utf8')).slots) usageAt.set(`${row.patternSlug}|${row.difficulty}`, (usageAt.get(`${row.patternSlug}|${row.difficulty}`) || 0) + 1);
  }
  const poolBySlug = new Map(pool.map(p => [p.slug, p]));
  for (const n of tests) {
    const rnd = mulberry32(hash32(`v2:test${n}`));
    // versions students saw: pre-recreation + v1 (per module, per slot) — compared by SLUG
    const seenSlugs = { pre: {}, v1: {} }; const seenAll = new Set(); const seenM2Seqs = new Set();
    for (const [key, ref] of [['pre', REF_PRE_RECREATION], ['v1', REF_V1_RECREATION]]) {
      for (const mod of MODULES) {
        let src; try { src = gitFile(ref, relFileOf(n, mod)); } catch { continue; }
        const mods = itemsFromSourceText(src); const qs = mod === 'm2easy' ? mods[0] : mods[mod === 'm1' ? 0 : 1];
        seenSlugs[key][mod] = qs.map(q => extractSatPattern(q.explanation));
        qs.forEach(q => seenAll.add(extractSatPattern(q.explanation)));
        if (mod === 'm2') seenM2Seqs.add(qs.map(q => q.difficulty[0]).join(''));
      }
    }
    const usedInModule = { m1: new Set(), m2: new Set(), m2easy: new Set() };
    const slots = [];
    for (const mod of MODULES) {
      const current = await loadTestModule(n, mod);
      let seqPairs = current.map(q => ({ difficulty: q.difficulty, band: q.band }));
      if (mod === 'm2') seqPairs = redealM2(current, seenM2Seqs, rnd);
      // figure slots: spread across the module (one per fifth), any type
      const figIdx = new Set();
      const order = shuffled(current.map((_, i) => i), rnd).sort((a, b) => (a % 5) - (b % 5));
      for (const i of order) { if (figIdx.size >= FIGURE_TARGET[mod]) break; figIdx.add(i); }
      current.forEach((q, i) => {
        const domain = domainOfSkills(q.skills) || poolBySlug.get(extractSatPattern(q.explanation))?.domain || 'Algebra';
        const difficulty = seqPairs[i].difficulty, band = seqPairs[i].band;
        const forbidden = new Set([seenSlugs.pre[mod]?.[i], seenSlugs.v1[mod]?.[i], extractSatPattern(q.explanation)].filter(Boolean));
        // M1 never shares an archetype with either M2 track (they co-occur); M2 vs M2Easy is a soft penalty only
        const coOccur = mod === 'm1' ? new Set() : usedInModule.m1;
        const cands = (byDomain[domain] || []).filter(p => !forbidden.has(p.slug) && !usedInModule[mod].has(p.slug) && !coOccur.has(p.slug));
        const scored = cands.map(p => {
          let cost = (usage.get(p.slug) || 0) * 1.0 + (usageAt.get(`${p.slug}|${difficulty}`) || 0) * 1.5;
          if (seenAll.has(p.slug)) cost += 0.75;
          if (mod !== 'm1' && (usedInModule.m2.has(p.slug) || usedInModule.m2easy.has(p.slug))) cost += 1.0;
          const seenAt = p.diffs[difficulty] || 0;
          if (seenAt === 0) { const adj = Object.entries(p.diffs).filter(([d, c]) => c > 0 && Math.abs(rank[d] - rank[difficulty]) === 1).length; cost += adj ? 2.5 : 100; }
          else cost -= Math.min(1, seenAt / p.count);
          if (q.type === 'fill-in') { if (p.fillin === 0 && p.numericMC === 0) cost += 100; else if (p.fillin === 0) cost += 1; }
          if (figIdx.has(i) && p.figure === 0) cost += 1.5;
          cost += rnd() * 0.75;
          return { p, cost };
        }).sort((a, b) => a.cost - b.cost);
        if (!scored.length || scored[0].cost >= 100) throw new Error(`test ${n} ${mod} slot ${i + 1}: no viable pattern (domain ${domain}, ${difficulty}, ${q.type})`);
        const pick = scored[0].p;
        const uses = usage.get(pick.slug) || 0;
        usedInModule[mod].add(pick.slug); usage.set(pick.slug, uses + 1); usageAt.set(`${pick.slug}|${difficulty}`, (usageAt.get(`${pick.slug}|${difficulty}`) || 0) + 1);
        // rotate the surface FORM per archetype use so the same archetype never wears the same clothes twice in a row
        // 'bare' is excluded from rotation: Test 1 authors found bare one-line stems score Dice 0.6-1.0 against the saturated seen corpus
        const formsOk = FORMS.filter(f => f.key !== 'figure' && f.key !== 'bare' && f.diffs.includes(difficulty) && (q.type !== 'fill-in' || f.key !== 'interpret'));
        const form = figIdx.has(i) ? FORMS[2] : formsOk[uses % formsOk.length];
        slots.push({
          chunk: chunkIdOf(n, mod), fileId: fileIdOf(mod, q.id), test: n, module: mod, index: i, id: q.id, type: q.type, difficulty, band,
          domain, patternTitle: pick.title, patternSlug: pick.slug, cbSkillLabel: pick.cbSkillLabel, skills: pick.skills,
          figure: figIdx.has(i), form: form.key, formHint: form.hint, previousSlugs: [...forbidden],
        });
      });
    }
    const planObj = { test: n, generatedAt: new Date().toISOString(), refs: { pre: REF_PRE_RECREATION, v1: REF_V1_RECREATION }, slots };
    fs.writeFileSync(path.join(WORK, 'plan', `test${n}.json`), JSON.stringify(planObj, null, 1));
    for (const mod of MODULES) {
      const items = slots.filter(s => s.module === mod).map(({ previousSlugs, ...rest }) => rest);
      const chunk = { chunk: chunkIdOf(n, mod), test: n, module: mod, file: relFileOf(n, mod), count: items.length, figureTarget: FIGURE_TARGET[mod], palette: paletteFor(n, MODULES.indexOf(mod)), items };
      fs.writeFileSync(path.join(WORK, 'chunks', `${chunk.chunk}.json`), JSON.stringify(chunk, null, 1));
    }
    const dist = {}; slots.forEach(s => { dist[s.module] ||= { easy: 0, medium: 0, hard: 0 }; dist[s.module][s.difficulty]++; });
    const reusedFromSeen = slots.filter(s => seenAll.has(s.patternSlug)).length;
    console.log(`test ${n}: ${slots.length} slots · distinct archetypes ${new Set(slots.map(s => s.patternSlug)).size} · archetypes also in this test's earlier versions: ${reusedFromSeen} · M2 flow ${slots.filter(s => s.module === 'm2').map(s => s.difficulty[0].toUpperCase()).join('')} · mix ${JSON.stringify(dist)}`);
  }
  // global usage report
  const all = new Map();
  const forms = {};
  for (let n = 1; n <= 12; n++) { const p = path.join(WORK, 'plan', `test${n}.json`); if (fs.existsSync(p)) for (const row of JSON.parse(fs.readFileSync(p, 'utf8')).slots) { all.set(row.patternSlug, (all.get(row.patternSlug) || 0) + 1); forms[row.form] = (forms[row.form] || 0) + 1; } }
  const hist = {}; for (const c of all.values()) hist[c] = (hist[c] || 0) + 1;
  console.log(`archetypes used across plans: ${all.size}/${pool.length} · uses-per-archetype histogram ${JSON.stringify(hist)} · forms ${JSON.stringify(forms)}`);
}

// ─── chunks / authored JSON ────────────────────────────────────────────────
function readChunk(id) { const p = path.join(WORK, 'chunks', `${id}.json`); if (!fs.existsSync(p)) throw new Error(`no chunk ${id} — run plan first`); return JSON.parse(fs.readFileSync(p, 'utf8')); }
function readAuthored(n, fileId) {
  const p = path.join(AUTHORED, `test${n}`, `${fileId}.json`);
  if (!fs.existsSync(p)) return null;
  try { return { data: JSON.parse(fs.readFileSync(p, 'utf8')), path: p }; } catch (e) { return { error: `JSON parse: ${e.message}`, path: p }; }
}
function selectChunks() {
  if (args.chunk) return String(args.chunk).split(',').map(s => s.trim()).map(readChunk);
  const tests = testsOf(); if (!tests) throw new Error('need --chunk, --test, or --all');
  return tests.flatMap(n => MODULES.map(mod => readChunk(chunkIdOf(n, mod))));
}
let _seen = null;
function seenCorpus() {
  if (_seen) return _seen;
  const p = path.join(WORK, 'seen.json'); if (!fs.existsSync(p)) throw new Error('seen.json missing — run plan first');
  _seen = JSON.parse(fs.readFileSync(p, 'utf8')).map(s => ({ id: s.id, text: s.text, tri: trigrams(s.text), len: s.text.length }));
  return _seen;
}
function allAuthoredStems(exceptTest = null) {
  const out = [];
  if (!fs.existsSync(AUTHORED)) return out;
  for (const dir of fs.readdirSync(AUTHORED)) {
    const n = Number(dir.replace('test', '')); if (!Number.isFinite(n)) continue;
    for (const f of fs.readdirSync(path.join(AUTHORED, dir))) {
      if (!f.endsWith('.json')) continue;
      try { const a = JSON.parse(fs.readFileSync(path.join(AUTHORED, dir, f), 'utf8')); const t = normStem(a.question); if (t.length >= 20) out.push({ id: `${dir}/${f.replace('.json', '')}`, test: n, text: t, tri: trigrams(t), len: t.length }); } catch { /* reported by check */ }
    }
  }
  return exceptTest === null ? out : out.filter(s => s.test !== exceptTest);
}
function nearest(text, corpus, skipId = null) {
  const t = normStem(text); const tri = trigrams(t); let best = { dice: 0, id: null };
  for (const s of corpus) {
    if (skipId && s.id === skipId) continue;
    if (s.len < t.length * 0.35 || s.len > t.length / 0.35) continue; // length prefilter: multiset Dice ≤ 2·min/(a+b), so below 0.35 it cannot reach FRESH_FAIL
    const d = diceOf(tri, s.tri); if (d > best.dice) best = { dice: d, id: s.id };
  }
  return best;
}

// ─── check ─────────────────────────────────────────────────────────────────
function testChecks(row, a, chunk) {
  const errs = [], warns = [];
  if (row.type === 'multiple-choice') {
    const notes = a.distractorNotes || {};
    for (const L of ['A', 'B', 'C', 'D']) if (L !== a.correctAnswer && !(notes[L] && String(notes[L]).trim())) errs.push(`distractorNotes.${L} missing (every wrong letter needs a named error — the lint requires the // distractor: comment)`);
  }
  const wc = wordCount(a.question);
  if (wc < MIN_STEM_WORDS && !a.diagram && !a.questionTable) errs.push(`stem ${wc} words (<${MIN_STEM_WORDS}) — give the setup in words; bare equations invite twins`);
  if (row.figure && !a.diagram && !a.questionTable) errs.push('this slot is a FIGURE slot in the plan — add a real diagram/questionTable (params must match the numbers)');
  if (a.skills !== undefined && JSON.stringify(a.skills) !== JSON.stringify(row.skills)) warns.push(`skills in JSON ignored (plan assigns ${JSON.stringify(row.skills)})`);
  // Mirror of the app's DiagramValidator required-param rules (src/components/graphs/DiagramValidator.js —
  // not importable here: it pulls a .jsx). Keep in sync when that file gains a rule.
  if (a.diagram && a.diagram.params && typeof a.diagram.params === 'object') {
    const P = a.diagram.params, T = a.diagram.type;
    const req = (cond, msg) => { if (!cond) errs.push(`diagram ${T}: ${msg}`); };
    if (T === 'rightTriangle') req(Array.isArray(P.vertices) && P.vertices.length === 3, 'must have exactly 3 vertices (the renderer draws the legs from them — without them the drawn proportions contradict the labels)');
    if (T === 'triangleWithAngles') req(Array.isArray(P.angleLabels) && P.angleLabels.length === 3, 'must have exactly 3 angleLabels');
    if (T === 'parabola') req(P.vertex && typeof P.vertex === 'object', 'missing required vertex');
    if (T === 'twoLineGraph') { req(P.intersection && typeof P.intersection.x === 'number' && typeof P.intersection.y === 'number', 'missing required intersection {x,y}'); req(typeof P.slope1 === 'number' && typeof P.slope2 === 'number', 'missing required slope1/slope2'); }
    if (T === 'table') req((Array.isArray(P.headers) && Array.isArray(P.rows)) || (P.xHeader && P.yHeader), 'must have headers/rows or xHeader/yHeader');
    if (T === 'scatterplot') req(Array.isArray(P.points) && P.points.every(pt => (Array.isArray(pt) && pt.length === 2 && pt.every(Number.isFinite)) || (pt && Number.isFinite(pt.x) && Number.isFinite(pt.y))), 'every point must be [x, y] or {x, y} with finite numbers');
  }
  // SATLinearGraph applies ONE gridInterval to both axes (SATGraphCore.renderGrid) — a tall yRange with a small
  // interval draws dozens of ~4px gridlines; the line must also stay inside the window at both x ends.
  if (a.diagram?.type === 'linearGraph' && a.diagram.params && typeof a.diagram.params === 'object') {
    const P = a.diagram.params; const gi = P.gridInterval || 1;
    const xr = Array.isArray(P.xRange) ? P.xRange : null, yr = Array.isArray(P.yRange) ? P.yRange : null;
    if (yr && (yr[1] - yr[0]) / gi > 26) errs.push(`linearGraph: yRange spans ${(yr[1] - yr[0]) / gi} gridlines at gridInterval ${gi} (one interval serves BOTH axes) — unreadable; keep each axis ≤ 26 gridlines`);
    if (xr && (xr[1] - xr[0]) / gi > 26) errs.push(`linearGraph: xRange spans ${(xr[1] - xr[0]) / gi} gridlines at gridInterval ${gi} — unreadable; keep each axis ≤ 26 gridlines`);
    if (xr && yr && typeof P.slope === 'number' && typeof P.yIntercept === 'number') {
      for (const x of xr) { const y = P.slope * x + P.yIntercept; if (y < yr[0] - 1e-9 || y > yr[1] + 1e-9) warns.push(`linearGraph: the line leaves the window at x=${x} (y=${y}) — the renderer does not clip; adjust xRange/yRange`); }
    }
  }
  // SATDotPlot scales to xMin..xMax with 12px dots — a wide window packs adjacent values into an unreadable blob
  if (a.diagram?.type === 'dotPlot' && a.diagram.params && typeof a.diagram.params.xMin === 'number' && typeof a.diagram.params.xMax === 'number') {
    const span = a.diagram.params.xMax - a.diagram.params.xMin;
    // SATDotPlot plots ~780px wide: 36 units ≈ 22px per unit (readable); 54 units ≈ 14px (12px dots touch); beyond that they overlap
    if (span > 50) errs.push(`dotPlot window spans ${span} units — adjacent values render ≤ 14px apart and overlap; keep xMax - xMin ≤ 50 (rescale the data or drop the far outlier)`);
    else if (span > 36) warns.push(`dotPlot window spans ${span} units — check adjacent dots/labels do not overlap`);
  }
  // SATBarChart draws no value labels — a bar between gridlines cannot be read to the precision an answer needs
  if (a.diagram?.type === 'barChart' && a.diagram.params && Array.isArray(a.diagram.params.data)) {
    const P = a.diagram.params; const step = P.yStep || Math.ceil((P.yMax || 0) / 5);
    const off = P.data.filter(d => typeof d.value === 'number' && step > 0 && Math.abs(d.value / step - Math.round(d.value / step)) > 1e-9).map(d => `${d.label}=${d.value}`);
    if (off.length) errs.push(`barChart values must sit on yStep gridlines (${step}) — the renderer prints no bar labels: ${off.join(', ')}`);
    if (typeof P.yMax === 'number' && P.data.some(d => d.value >= P.yMax)) warns.push('barChart: a bar touches yMax — raise yMax one step so the tallest bar is readable');
  }
  return { errs, warns };
}
function freshnessOf(row, a, siblings) {
  const s = nearest(a.question, seenCorpus());
  const sib = nearest(a.question, siblings, `test${row.test}/${row.fileId}`);
  return { seen: s, sibling: sib };
}
async function check(chunks) {
  let errors = 0, missing = 0, checked = 0; const lens = { easy: [], medium: [], hard: [] };
  const siblings = allAuthoredStems();
  for (const chunk of chunks) {
    const ctx = { numeric: 0, ascending: 0, figures: 0, stems: [] }; let keyTally = { A: 0, B: 0, C: 0, D: 0 }; let present = 0;
    for (const row of chunk.items) {
      const got = readAuthored(row.test, row.fileId);
      if (!got) { missing++; continue; }
      if (got.error) { errors++; console.error(`FAIL ${chunk.chunk}/${row.fileId}: ${got.error}`); continue; }
      checked++; present++;
      const a = got.data;
      const { errs, warns } = checkItem({ ...row, kind: 'shard', source: chunk.chunk }, a, ctx);
      const t = testChecks(row, a, chunk); errs.push(...t.errs); warns.push(...t.warns);
      const fr = freshnessOf(row, a, siblings);
      if (fr.seen.dice >= FRESH_FAIL) errs.push(`FRESHNESS: stem is a near-copy of a question students have seen (${fr.seen.id}, Dice ${fr.seen.dice.toFixed(2)} ≥ ${FRESH_FAIL}) — change the setup, not just the numbers`);
      else if (fr.seen.dice >= FRESH_WARN) warns.push(`freshness: close to seen ${fr.seen.id} (Dice ${fr.seen.dice.toFixed(2)})`);
      if (fr.sibling.dice >= FRESH_FAIL) errs.push(`FRESHNESS: stem is a near-copy of another new item (${fr.sibling.id}, Dice ${fr.sibling.dice.toFixed(2)} ≥ ${FRESH_FAIL})`);
      else if (fr.sibling.dice >= FRESH_WARN) warns.push(`freshness: close to new item ${fr.sibling.id} (Dice ${fr.sibling.dice.toFixed(2)})`);
      warns.forEach(w => console.warn(`warn ${chunk.chunk}/${row.fileId}: ${w}`));
      if (errs.length) { errors += errs.length; errs.forEach(e => console.error(`FAIL ${chunk.chunk}/${row.fileId}: ${e}`)); }
      if (lens[row.difficulty]) lens[row.difficulty].push(wordCount(a.question));
      if (row.type === 'multiple-choice' && keyTally[a.correctAnswer] !== undefined) keyTally[a.correctAnswer]++;
    }
    // official-corpus uniqueness (existing gate, Jaccard/3-gram)
    const off = officialIndex();
    for (const s of ctx.stems) { if (tokenize(s.text).length < 12) continue; const r = checkUniquenessSliding(s.text, off); if (!r.pass) { errors++; console.error(`FAIL ${chunk.chunk}/${s.id}: too close to official item ${r.closestId} (jaccard ${r.jaccard}, ngram ${r.ngramOverlap})`); } }
    if (present) {
      const maxKey = Math.max(...Object.values(keyTally)); const mc = Object.values(keyTally).reduce((x, y) => x + y, 0);
      if (present === chunk.count && ctx.figures < chunk.figureTarget) { errors++; console.error(`FAIL ${chunk.chunk}: ${ctx.figures} figures < target ${chunk.figureTarget}`); }
      if (mc && maxKey / mc > 0.45) console.warn(`warn ${chunk.chunk}: on-disk key letter skew ${JSON.stringify(keyTally)} (assembly rebalances, but keep authored keys spread)`);
      console.log(`${chunk.chunk}: ${present}/${chunk.count} authored · figures ${ctx.figures}/${chunk.figureTarget} · numeric ascending ${ctx.ascending}/${ctx.numeric}`);
    }
  }
  console.log(`\nchecked ${checked} (missing ${missing}) · stem medians E${median(lens.easy)}/M${median(lens.medium)}/H${median(lens.hard)}`);
  if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
  console.log('check passed');
}

// ─── solvesheet ────────────────────────────────────────────────────────────
function solvesheet(chunkId) {
  const c = readChunk(chunkId); const out = [];
  for (const row of c.items) {
    const got = readAuthored(row.test, row.fileId); if (!got || got.error) continue; const a = got.data;
    out.push({ fileId: row.fileId, type: row.type, difficulty: row.difficulty, patternTitle: row.patternTitle, question: a.question, diagram: a.diagram || null, questionTable: a.questionTable || null, questionFormula: a.questionFormula || null, choices: a.choices || null, correctAnswer: a.correctAnswer, distractorNotes: a.distractorNotes || null, explanation: a.explanation });
  }
  const p = path.join(WORK, 'solvesheets', `${chunkId}.json`); fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(out, null, 1)); console.log(`${p}: ${out.length} items`);
}

// ─── assemble ──────────────────────────────────────────────────────────────
const KEY_ORDER = ['id', 'type', 'difficulty', 'band', 'question', 'questionFormula', 'questionTable', 'diagram', 'choices', 'correctAnswer', 'explanation', 'skills'];
function mergeTestItem(oldQ, row, a) {
  const merged = { ...oldQ, difficulty: row.difficulty, band: row.band, skills: row.skills };
  for (const k of ['question', 'diagram', 'questionTable', 'questionFormula', 'choices', 'correctAnswer', 'explanation']) {
    if (a[k] !== undefined && a[k] !== null) merged[k] = a[k];
    else if (['diagram', 'questionTable', 'questionFormula'].includes(k)) delete merged[k];
  }
  if (row.type === 'fill-in') delete merged.choices;
  const out = {}; for (const k of KEY_ORDER) if (merged[k] !== undefined) out[k] = merged[k];
  for (const k of Object.keys(merged)) if (out[k] === undefined && merged[k] !== undefined) out[k] = merged[k];
  return out;
}
function questionSpans(text, mod) {
  // item object spans in source order, tagged with the index of their enclosing `questions` array
  const itemDepth = mod === 'm2easy' ? 3 : 5;
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
async function assemble(tests, { dry = false, chunkFilter = null } = {}) {
  for (const n of tests) {
    for (const mod of MODULES) {
      const chunk = readChunk(chunkIdOf(n, mod));
      if (chunkFilter && !chunkFilter.has(chunk.chunk)) continue;
      const file = fileOf(n, mod); const text = fs.readFileSync(file, 'utf8');
      const current = await loadTestModule(n, mod);
      const modIdx = mod === 'm2easy' ? 0 : (mod === 'm1' ? 0 : 1);
      const spans = questionSpans(text, mod).filter(s => s.moduleIndex === modIdx);
      if (spans.length !== current.length) throw new Error(`${chunk.chunk}: ${spans.length} spans vs ${current.length} items`);
      const authored = chunk.items.map(row => ({ row, got: readAuthored(n, row.fileId) }));
      const have = authored.filter(x => x.got && !x.got.error).length;
      if (have === 0) { console.log(`${chunk.chunk}: nothing to assemble`); continue; }
      if (mod === 'm2' && have !== chunk.count) throw new Error(`${chunk.chunk}: M2 is re-dealt as a whole — all ${chunk.count} slots must be authored (have ${have})`);
      const siblings = allAuthoredStems();
      const expected = new Map(); const plan = [];
      spans.forEach((span, i) => {
        const row = chunk.items[i]; const q = current[i];
        const idInSpan = text.slice(span.start, span.end).match(/\bid:\s*(\d+)/);
        if (!idInSpan || Number(idInSpan[1]) !== q.id || q.id !== row.id) throw new Error(`${chunk.chunk}: span ${i} id ${idInSpan?.[1]} ≠ item ${q.id} ≠ plan ${row.id}`);
        const got = authored[i].got;
        if (!got || got.error) { plan.push({ span, text: null }); return; }
        const ctx = { numeric: 0, ascending: 0, figures: 0, stems: [] };
        const { errs } = checkItem({ ...row, kind: 'shard', source: chunk.chunk }, got.data, ctx);
        errs.push(...testChecks(row, got.data, chunk).errs);
        const fr = freshnessOf(row, got.data, siblings);
        if (fr.seen.dice >= FRESH_FAIL || fr.sibling.dice >= FRESH_FAIL) errs.push('freshness gate');
        if (errs.length) throw new Error(`${chunk.chunk}/${row.fileId} fails check (${errs[0]}) — run check first`);
        const merged = mergeTestItem(q, row, got.data); expected.set(i, merged);
        const indent = span.start - text.lastIndexOf('\n', span.start) - 1;
        plan.push({ span, text: serializeItem(merged, indent, got.data.distractorNotes).trimStart() });
      });
      let out = ''; let cursor = 0;
      plan.forEach(({ span, text: t }) => { if (t === null) return; out += text.slice(cursor, span.start) + t; cursor = span.end; });
      out += text.slice(cursor);
      const banner = '// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md\n';
      if (!out.includes('v2 freshness rebuild')) out = out.replace(/^(\/\/[^\n]*\n)/, `$1${banner}`);
      if (dry) { console.log(`${chunk.chunk}: would replace ${expected.size}/${current.length}`); continue; }
      fs.writeFileSync(file, out);
      const after = await loadTestModule(n, mod);
      if (after.length !== current.length) throw new Error(`${chunk.chunk}: item count changed — REVERT ${file}`);
      after.forEach((q, i) => { const want = expected.has(i) ? expected.get(i) : current[i]; if (!deepEq(q, want)) throw new Error(`${chunk.chunk}: item ${i + 1} differs after assembly — inspect ${file}`); });
      console.log(`${chunk.chunk}: assembled ${expected.size}/${current.length} (verified by re-import)`);
    }
  }
}

// ─── verify / freshness / status ───────────────────────────────────────────
async function verify(tests) {
  let errors = 0;
  for (const n of tests) {
    for (const mod of MODULES) {
      const chunk = readChunk(chunkIdOf(n, mod)); const live = await loadTestModule(n, mod); let ok = 0;
      const siblings = allAuthoredStems();
      chunk.items.forEach((row, i) => {
        const got = readAuthored(n, row.fileId); if (!got || got.error) return;
        const want = mergeTestItem(live[i], row, got.data);
        if (!deepEq(live[i], want)) { errors++; console.error(`FAIL ${chunk.chunk}/${row.fileId}: live ≠ authored (not assembled or drifted)`); return; }
        const ctx = { numeric: 0, ascending: 0, figures: 0, stems: [] };
        const { errs } = checkItem({ ...row, kind: 'shard', source: chunk.chunk }, got.data, ctx); errs.push(...testChecks(row, got.data, chunk).errs);
        const fr = freshnessOf(row, got.data, siblings);
        if (fr.seen.dice >= FRESH_FAIL) errs.push(`freshness vs seen ${fr.seen.id} ${fr.seen.dice.toFixed(2)}`);
        if (fr.sibling.dice >= FRESH_FAIL) errs.push(`freshness vs sibling ${fr.sibling.id} ${fr.sibling.dice.toFixed(2)}`);
        if (tokenize(got.data.question).length >= 12) { const r = checkUniquenessSliding(got.data.question, officialIndex()); if (!r.pass) errs.push(`too close to official item ${r.closestId} (jaccard ${r.jaccard}, ngram ${r.ngramOverlap})`); }
        errs.forEach(e => { errors++; console.error(`FAIL ${chunk.chunk}/${row.fileId}: ${e}`); });
        ok++;
      });
      console.log(`${chunk.chunk}: ${ok}/${chunk.count} live items verified`);
    }
  }
  if (errors) { console.error(`${errors} failure(s)`); process.exit(1); }
  console.log('verify passed');
}
async function freshness(tests) {
  // report-only: how the LIVE files score against the seen corpus + the other live tests
  const seen = seenCorpus(); const liveAll = [];
  for (let n = 1; n <= 12; n++) for (const mod of MODULES) (await loadTestModule(n, mod)).forEach((q, i) => { const t = normStem(q.question); liveAll.push({ id: `live:test${n}/${mod}#${i + 1}`, test: n, text: t, tri: trigrams(t), len: t.length }); });
  for (const n of tests) {
    let nSeen = 0, nSib = 0, tot = 0; const worst = [];
    for (const it of liveAll.filter(x => x.test === n)) {
      tot++;
      const s = nearest(it.text, seen.filter(x => !x.id.startsWith(`${REF_V1_RECREATION}:practiceTest${n}.`) && !x.id.startsWith(`${REF_V1_RECREATION}:practiceTest${n}M2Easy.`)));
      const b = nearest(it.text, liveAll.filter(x => x.test !== n));
      if (s.dice >= FRESH_FAIL) { nSeen++; worst.push(`${it.id}~${s.id}(${s.dice.toFixed(2)})`); }
      if (b.dice >= FRESH_FAIL) nSib++;
    }
    console.log(`test ${n}: ${nSeen}/${tot} live stems still near a SEEN stem (excluding this test's own v1 text) · ${nSib}/${tot} near another live test`);
    if (args.verbose) worst.slice(0, 10).forEach(w => console.log('   ' + w));
  }
}
async function status() {
  const rows = [];
  for (let n = 1; n <= 12; n++) {
    for (const mod of MODULES) {
      const p = path.join(WORK, 'chunks', `${chunkIdOf(n, mod)}.json`); if (!fs.existsSync(p)) { rows.push({ test: n, module: mod, planned: false }); continue; }
      const chunk = JSON.parse(fs.readFileSync(p, 'utf8')); const live = await loadTestModule(n, mod);
      let authored = 0, liveOk = 0, figures = 0;
      chunk.items.forEach((row, i) => { const got = readAuthored(n, row.fileId); if (got && !got.error) { authored++; if (deepEq(live[i], mergeTestItem(live[i], row, got.data))) liveOk++; } if (live[i].diagram || live[i].questionTable) figures++; });
      rows.push({ test: n, module: mod, planned: true, authored: `${authored}/${chunk.count}`, live: `${liveOk}/${chunk.count}`, figures });
    }
  }
  console.table(rows);
}

// ─── score (author helper: how fresh is a candidate stem?) ────────────────
function score(texts) {
  const siblings = allAuthoredStems();
  for (const text of texts) {
    const s = nearest(text, seenCorpus());
    const self = normStem(text); const b = nearest(text, siblings.filter(x => x.text !== self)); // an already-saved copy of this stem is not a neighbour
    const verdict = Math.max(s.dice, b.dice) >= FRESH_FAIL ? 'FAIL' : Math.max(s.dice, b.dice) >= FRESH_WARN ? 'warn' : 'ok';
    console.log(`${verdict}  seen ${s.dice.toFixed(2)} (${s.id})  ·  new ${b.dice.toFixed(2)} (${b.id || '-'})  ·  ${wordCount(text)} words`);
  }
}

// ─── main ──────────────────────────────────────────────────────────────────
(async () => {
  switch (cmd) {
    case 'score': { const texts = args.file ? JSON.parse(fs.readFileSync(String(args.file), 'utf8')) : [String(args.text || '')]; score(Array.isArray(texts) ? texts : [texts]); break; }
    case 'plan': await plan(testsOf() || Array.from({ length: 12 }, (_, i) => i + 1)); break;
    case 'check': await check(selectChunks()); break;
    case 'solvesheet': solvesheet(args.chunk); break;
    case 'assemble': { const tests = testsOf() || [...new Set(String(args.chunk || '').split(',').map(c => Number(c.match(/test(\d+)/)?.[1])).filter(Boolean))]; if (!tests.length) throw new Error('need --test or --chunk'); await assemble(tests, { dry: !!args.dry, chunkFilter: args.chunk ? new Set(String(args.chunk).split(',')) : null }); break; }
    case 'verify': await verify(testsOf() || (() => { throw new Error('need --test or --all'); })()); break;
    case 'freshness': await freshness(testsOf() || Array.from({ length: 12 }, (_, i) => i + 1)); break;
    case 'status': await status(); break;
    default: console.error('usage: recreateTestMath.mjs plan|check|solvesheet|assemble|verify|freshness|status|score'); process.exit(1);
  }
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });
