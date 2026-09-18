#!/usr/bin/env node
/**
 * fixProseDashes.mjs — convert prose " - " hyphens to em dashes " — " across
 * the question corpus, without touching math.
 *
 * Rules (all must hold for a site to convert):
 *   - the hyphen is exactly ` - ` (space hyphen space);
 *   - the site is NOT inside a $...$ / $$...$$ math span;
 *   - the word immediately left ends with ≥2 letters, or a closing quote/paren
 *     that follows ≥2 letters — so `x - y`, `f(2) - f(1)`, `3 - 2` never match;
 *   - the word immediately right starts with ≥2 letters or an opening
 *     quote/paren followed by a letter;
 *   - the line is data, not a JS comment (comments keep their bullets).
 *
 * Dry-run by default; pass --write to apply.
 *   node scripts/fixProseDashes.mjs [--write] [--verbose]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const VERBOSE = process.argv.includes('--verbose');

const TARGET_DIRS = [
  'src/data/questions/rwBank',
  'src/data/practiceTests',
  'src/data/questions/bank',
  'src/data/questions',
];

function collectFiles() {
  const files = new Set();
  for (const dir of TARGET_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (f.endsWith('.js') && !f.includes('.test.')) files.add(path.join(abs, f));
    }
  }
  return [...files];
}

// Mask $$..$$ and $..$ spans (honoring \$) so replacements never land in math.
function maskMath(line) {
  let masked = line.replace(/\\\$/g, '');
  masked = masked.replace(/\$\$[^$]*?\$\$/g, (m) => ''.repeat(m.length));
  masked = masked.replace(/\$[^$]*?\$/g, (m) => ''.repeat(m.length));
  return masked;
}

// left context: ...word - | must end with ≥2 letters optionally + closing "'")]
const LEFT_OK = /[A-Za-z]{2}["'”’)\]]*$/;
// right context: | - word... | must start with optional opening quote/paren then ≥2 letters
const RIGHT_OK = /^["'“‘(\[]*[A-Za-z]{2}/;

let totalSites = 0;
const perFile = {};

for (const file of collectFiles()) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let changed = 0;
  const outLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return line;
    const masked = maskMath(line);
    let out = '';
    let cursor = 0;
    let idx;
    while ((idx = masked.indexOf(' - ', cursor)) !== -1) {
      const left = masked.slice(0, idx);
      const right = masked.slice(idx + 3);
      // String-interior guard (added after the first run converted a code
      // subtraction): an odd count of unescaped double quotes to the left
      // means the site is inside a "..." literal. Sites in code or in
      // backtick templates are skipped — miss, never corrupt.
      const quotesBefore = (left.match(/(?<!\\)"/g) || []).length;
      if (quotesBefore % 2 === 1 && LEFT_OK.test(left) && RIGHT_OK.test(right)) {
        out += line.slice(cursor, idx) + ' — ';
        changed++;
        if (VERBOSE) {
          console.log('  ', path.basename(file) + ':', JSON.stringify(line.slice(Math.max(0, idx - 30), idx + 33)));
        }
      } else {
        out += line.slice(cursor, idx + 3);
      }
      cursor = idx + 3;
    }
    out += line.slice(cursor);
    return out;
  });
  if (changed > 0) {
    perFile[path.relative(ROOT, file)] = changed;
    totalSites += changed;
    if (WRITE) fs.writeFileSync(file, outLines.join('\n'));
  }
}

console.log((WRITE ? 'APPLIED' : 'DRY-RUN') + ' — prose dash sites: ' + totalSites);
Object.entries(perFile).sort((a, b) => b[1] - a[1]).slice(0, 20)
  .forEach(([f, n]) => console.log('  ' + String(n).padStart(4) + '  ' + f));
if (!WRITE) console.log('Run with --write to apply.');
