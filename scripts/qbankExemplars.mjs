#!/usr/bin/env node
/**
 * Print official Educator Question Bank items as authoring style anchors.
 *
 * Usage:
 *   node scripts/qbankExemplars.mjs --section=math --skill="Linear functions" --difficulty=H --n=3
 *   node scripts/qbankExemplars.mjs --section=rw --skill="Words in Context" --difficulty=E --n=2
 *   node scripts/qbankExemplars.mjs --section=math --list-skills
 *
 * Options:
 *   --section=math|rw     which cache to read (required)
 *   --skill="..."         CB skill_desc, exact match (case-insensitive)
 *   --difficulty=E|M|H    optional filter
 *   --type=mcq|spr        optional filter (math)
 *   --n=3                 how many items (default 3, random but seeded by skill)
 *   --list-skills         print available skills with counts and exit
 *
 * Output is PLAIN TEXT for reading, with MathML rendered via alttext ([...]).
 * These items are Ⓒ College Board — style reference ONLY, never copy content.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN = path.join(__dirname, 'generated');

const arg = (name, dflt = null) => {
  const a = process.argv.find(a => a.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : dflt;
};
const has = (name) => process.argv.includes(`--${name}`);

const section = arg('section');
if (!section || !['math', 'rw'].includes(section)) {
  console.error('need --section=math|rw');
  process.exit(1);
}
const cachePath = path.join(GEN, section === 'math' ? 'cbEducatorQBank.json' : 'cbEducatorQBankRW.json');
const { items } = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
const all = Object.values(items);

if (has('list-skills')) {
  const counts = {};
  for (const v of all) {
    const key = `${v.domain} :: ${v.skill}`;
    counts[key] = counts[key] || { E: 0, M: 0, H: 0 };
    counts[key][v.difficulty] = (counts[key][v.difficulty] || 0) + 1;
  }
  for (const [k, c] of Object.entries(counts).sort()) {
    console.log(`${k}  (E=${c.E} M=${c.M} H=${c.H})`);
  }
  process.exit(0);
}

const skill = (arg('skill') || '').toLowerCase();
const diff = arg('difficulty');
const type = arg('type');
const n = parseInt(arg('n', '3'), 10);

let pool = all.filter(v =>
  (!skill || (v.skill || '').toLowerCase() === skill) &&
  (!diff || v.difficulty === diff) &&
  (!type || v.type === type)
);
if (!pool.length) {
  console.error(`no items match (skill="${arg('skill')}", difficulty=${diff}, type=${type}). Try --list-skills.`);
  process.exit(1);
}

// deterministic shuffle seeded by skill+diff so reruns show the same anchors
let seed = [...(skill + (diff || ''))].reduce((a, c) => a + c.charCodeAt(0), 7);
const rand = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
pool = pool.map(v => [rand(), v]).sort((a, b) => a[0] - b[0]).map(([, v]) => v);

const hasFig = v => /(<svg|<img|<table)/.test((v.stemHtml || '') + (v.stimulusHtml || ''));

for (const v of pool.slice(0, n)) {
  console.log('='.repeat(78));
  console.log(`${v.questionId} | ${v.domain} > ${v.skill} | ${v.difficulty} band ${v.scoreBandRangeCd} | ${v.type}${hasFig(v) ? ' | HAS FIGURE/TABLE' : ''}`);
  if (v.stimulusPlain) console.log(`STIMULUS: ${v.stimulusPlain}`);
  console.log(`STEM: ${v.stemPlain}`);
  if (v.answerOptions) {
    for (const o of v.answerOptions) console.log(`   ${o.letter}. ${o.contentPlain}`);
  }
  const key = v.correctKeys?.[0];
  const letter = v.answerOptions
    ? (v.answerOptions[['a', 'b', 'c', 'd'].indexOf((v.correctAnswer || '').toLowerCase?.() || -1)]?.letter || v.correctAnswer)
    : v.correctKeys?.join(', ');
  console.log(`ANSWER: ${letter ?? key ?? '?'}`);
  if (v.rationalePlain) console.log(`RATIONALE (first 400): ${v.rationalePlain.slice(0, 400)}`);
}
