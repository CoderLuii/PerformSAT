#!/usr/bin/env node
/**
 * fixTopicMath.mjs — bring the legacy topic-file items (src/data/questions/
 * *.js) up to the bank's KaTeX conventions. Their explanations were
 * rehabilitated in the 2026-07-15 math-render hardening; their stems, hints,
 * and choices still carry plain-text math ("C = 25 + 0.10t", unicode −/²/×,
 * bare $25 currency). This codemod:
 *
 *   1. choice text that is equation/expression-shaped → unicode → LaTeX,
 *      wrapped in $...$ (comma-separated systems become "$eq1$, $eq2$");
 *   2. question/hint fields: equation runs containing =/</> are wrapped the
 *      same way; bare currency $N becomes \$N (JS-source \\$N); standalone
 *      x², x³ tokens are wrapped.
 *
 * Dry-run by default; --write applies; --verbose prints every rewrite.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const VERBOSE = process.argv.includes('--verbose');

const DIR = path.join(ROOT, 'src/data/questions');
const SKIP = new Set(['extractSatPattern.js', 'cbSkillTaxonomy.js', 'index.js']);
const FILES = fs.readdirSync(DIR)
  .filter(f => f.endsWith('.js') && !SKIP.has(f))
  .map(f => path.join(DIR, f));

// unicode → LaTeX inside a math span
function toLatex(seg) {
  return seg
    .replace(/−/g, '-')
    .replace(/×/g, '\\times ')
    .replace(/÷/g, '\\div ')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/≠/g, '\\ne ')
    .replace(/π/g, '\\pi ')
    .replace(/([A-Za-z0-9)])²/g, '$1^2')
    .replace(/([A-Za-z0-9)])³/g, '$1^3')
    .replace(/\\pi\s+(?=[+\-*/=)])/g, '\\pi')
    .replace(/ {2,}/g, ' ')
    .trim();
}

// A choice string is "pure math" when it only uses equation vocabulary and
// contains a relation or a variable next to an operator.
const MATHY_CHARS = /^[A-Za-z0-9\s.,+=<>≤≥()²³×÷−*/^-]+$/;
const HAS_RELATION = /[=<>≤≥]/;
const HAS_VAR_EXPR = /[0-9.]\s*[A-Za-z]\b|[A-Za-z]\s*[+\-−×÷*/^]|[+\-−×÷*/^]\s*[A-Za-z0-9]|²|³/;

// Split at top level only: commas inside parentheses (coordinates, intervals)
// stay together, and the connector words "and"/"or" stay prose.
function splitTopLevel(text) {
  const parts = [];
  let depth = 0, cur = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') depth++;
    if (ch === ')') depth = Math.max(0, depth - 1);
    if (depth === 0) {
      const rest = text.slice(i);
      const conn = rest.match(/^,\s+|^\s+(and|or)\s+/);
      if (conn && cur.trim()) {
        parts.push({ seg: cur, sep: conn[0] });
        cur = '';
        i += conn[0].length - 1;
        continue;
      }
    }
    cur += ch;
  }
  if (cur.trim()) parts.push({ seg: cur, sep: '' });
  return parts;
}

function convertChoice(text) {
  if (!MATHY_CHARS.test(text)) return null;
  if (!HAS_RELATION.test(text) && !HAS_VAR_EXPR.test(text)) return null;
  if (/^[0-9.,\s-]+$/.test(text)) return null; // plain number(s): leave
  const parts = splitTopLevel(text);
  return parts.map(p => '$' + toLatex(p.seg) + '$' + p.sep).join('');
}

// Equation-run matcher for prose fields: a term sequence with at least one
// relation sign. A TERM is a juxtaposition of atoms — 0.10t, 2πr, πr²,
// (x - h)², f(x) — so mixed formulas stay whole instead of half-wrapping.
const PAREN = String.raw`\([A-Za-z0-9+\-−×÷/., ]{1,30}\)[²³]?`;
const ATOM = String.raw`(?:π|[0-9]+(?:\.[0-9]+)?|[A-Za-z][²³]?|${PAREN})`;
const TERM = String.raw`${ATOM}+`;
const OP = String.raw`(?: ?[+\-−×÷/] ?)`;
const SIDE = String.raw`(?:[-−] ?)?${TERM}(?:${OP}${TERM})*`;
const EQ_RUN = new RegExp(String.raw`(?<![\w$\\])(-?${SIDE} ?[=<>≤≥] ?-?${SIDE})(?![\w²³(])`, 'g');

function convertProse(text) {
  let out = text;
  // 1) currency: $25 → \$25 (source-level \\$25) unless already escaped
  out = out.replace(/(?<!\\)\$([0-9])/g, '\\\\$$$1');
  // 2) equation runs → $...$
  out = out.replace(EQ_RUN, (m) => {
    if (m.includes('$')) return m;
    return '$' + toLatex(m) + '$';
  });
  // 3) standalone x² tokens — only when truly isolated (no adjacent formula
  //    characters), so a run the equation pass missed is left whole rather
  //    than half-wrapped.
  out = out.replace(/([A-Za-z])([²³])/g, (m, v, sup, off, str) => {
    const before = str.slice(Math.max(0, off - 2), off);
    const after = str.slice(off + m.length, off + m.length + 2);
    if (/[$\w]$/.test(before)) return m;
    if (/[=+\-−×÷/()π²³]\s?$/.test(before)) return m;
    if (/^\s?[=+\-−×÷/()π²³$\w]/.test(after)) return m;
    return '$' + v + (sup === '²' ? '^2' : '^3') + '$';
  });
  return out;
}

let filesChanged = 0, choicesChanged = 0, proseChanged = 0;

for (const file of FILES) {
  const src = fs.readFileSync(file, 'utf8');
  let out = src;

  // choices: text: "..." (single-line string literals)
  out = out.replace(/(text:\s*")((?:[^"\\]|\\.)*)(")/g, (m, pre, body, post) => {
    const conv = convertChoice(body);
    if (conv && conv !== body) {
      choicesChanged++;
      if (VERBOSE) console.log('  choice:', JSON.stringify(body), '→', JSON.stringify(conv));
      return pre + conv + post;
    }
    return m;
  });

  // question / hint: "..." string literals (may contain escaped quotes)
  out = out.replace(/((?:question|hint):\s*")((?:[^"\\]|\\.)*)(")/g, (m, pre, body, post) => {
    const conv = convertProse(body);
    if (conv !== body) {
      proseChanged++;
      if (VERBOSE) console.log('  prose :', JSON.stringify(body.slice(0, 90)), '\n       →', JSON.stringify(conv.slice(0, 110)));
      return pre + conv + post;
    }
    return m;
  });

  if (out !== src) {
    filesChanged++;
    if (WRITE) fs.writeFileSync(file, out);
  }
}

console.log((WRITE ? 'APPLIED' : 'DRY-RUN') +
  ` — files: ${filesChanged}, choices rewritten: ${choicesChanged}, prose fields rewritten: ${proseChanged}`);
if (!WRITE) console.log('Run with --write to apply.');
