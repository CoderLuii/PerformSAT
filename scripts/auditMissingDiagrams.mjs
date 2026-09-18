#!/usr/bin/env node
/**
 * auditMissingDiagrams.mjs — find questions whose stem references a visual
 * artifact (chart, plot, table, figure) but ships without a `diagram` field.
 *
 * The contract (docs/AUTHORING_DIAGRAMS.md): if a stem mentions a visual,
 * the item must carry a `diagram` block. This script is the lint that
 * catches violations.
 *
 * Usage:
 *   node scripts/auditMissingDiagrams.mjs
 *   node scripts/auditMissingDiagrams.mjs --json   # machine output
 *   node scripts/auditMissingDiagrams.mjs --strict # exit 1 on any finding
 */

import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// Sources to audit
const TEST_FILES = [];
const ptDir = path.join(repoRoot, 'src/data/practiceTests');
for (const f of fs.readdirSync(ptDir)) {
  if (/^practiceTest\d+(M2Easy|RW)?\.js$/.test(f)) {
    TEST_FILES.push(path.join(ptDir, f));
  }
}

const BANK_FILES = [
  'src/data/questions/bank/algebra.js',
  'src/data/questions/bank/advancedMath.js',
  'src/data/questions/bank/problemSolving.js',
  'src/data/questions/bank/geometry.js',
].map(p => path.join(repoRoot, p));

// Cue patterns. Order matters — most specific first so we tag the right type.
// `type` is the renderer that SHOULD be used.
const CUES = [
  // 2026-08-13: two phrasings that slipped past the original cue list
  { re: /\bgraph\b[^.\n]{0,40}\bis shown\b/i, label: 'graph …is shown' },
  { re: /\ba graph shows\b/i, label: 'a graph shows' },
  { type: 'boxPlot',     re: /\bbox[\s-]?plots?\b/i },
  { type: 'scatterplot', re: /\bscatter[\s-]?plots?\b/i },
  { type: 'scatterplot', re: /\bline of best fit\b/i },
  { type: 'scatterplot', re: /\bresidual\b/i },
  { type: 'dotPlot',     re: /\bdot[\s-]?plots?\b/i },
  { type: 'dotPlot',     re: /\bline plots?\b/i },
  { type: 'barChart',    re: /\bhistograms?\b/i },
  { type: 'barChart',    re: /\bbar (?:chart|graph)s?\b/i },
  { type: 'barChart',    re: /\bfrequency (?:distribution|table)\b/i },
  { type: 'twoWayTable', re: /\btwo[\s-]?way table\b/i },
  { type: 'twoWayTable', re: /\bcontingency table\b/i },
  { type: 'dataTable',   re: /\btable (?:above|below|shown|gives|shows)\b/i },
  { type: 'dataTable',   re: /\b(?:the|following) table\b/i },
  { type: 'figure',      re: /\b(?:the )?figure (?:above|below|shown)\b/i },
  { type: 'figure',      re: /\bthe figure shows\b/i },
  { type: 'figure',      re: /\bin the figure\b/i },
  { type: 'figure',      re: /\b(?:the diagram|the picture|the drawing) (?:above|below|shown)\b/i },
  // NOTE: "graph of f(x)" is an abstract function reference, not a literal
  // chart. Only flag when the stem says the graph is shown/above/below.
  { type: 'graph',       re: /\bthe graph (?:above|below|shown)\b/i },
  { type: 'graph',       re: /\bgraph (?:above|below|shown)\b/i },
  { type: 'triangle',    re: /\bin (?:the )?(?:right )?triangle [A-Z]{3,}\b/ },
  { type: 'triangle',    re: /\btriangle [A-Z]{3,} (?:shown|above|below)\b/ },
];

// False-positive guards: if a stem matches one of these, skip the cue.
// (Phrases that look visual but aren't.)
const FALSE_POSITIVE_GUARDS = [
  /\bdata set\b.*\bvalues?\b/i,  // "the data set has values 4, 7, 9 ..." — usually inline
];

// Heuristic: extract questions from a JS source string.
// The bank/test files are plain JS — easier to import dynamically than parse.
async function loadItems(file) {
  const url = pathToFileURL(file).href;
  try {
    const mod = await import(url);
    const items = [];
    // Practice tests: { practiceTestN: { sections: [...] | modules: [...] } } and named exports.
    // The files export the same object as BOTH a named export and `default`;
    // dedupe by reference or every item is scanned twice and the per-file
    // summary double-counts (it used to report 4 missing where there were 2).
    const seenVals = new Set();
    for (const [name, val] of Object.entries(mod)) {
      if (!val || typeof val !== 'object') continue;
      if (seenVals.has(val)) continue;
      seenVals.add(val);

      // Direct array of items? (rare)
      if (Array.isArray(val) && val[0]?.id && val[0]?.question) {
        items.push(...val);
        continue;
      }

      // Test object with modules/sections
      const collect = (container) => {
        if (!container) return;
        for (const m of (container.modules || container.sections || [])) {
          for (const q of (m.questions || [])) {
            items.push({ ...q, _source: name, _module: m.id || m.name });
          }
        }
      };
      collect(val);

      // Single-module shape (the practiceTestNM2Easy files): the export IS
      // one module — { id: 'module-2-easy', questions: [...] } — with no
      // modules/sections wrapper. Without this branch all 12 M2Easy files
      // scanned 0 items and were never audited.
      if (!val.modules && !val.sections && Array.isArray(val.questions)) {
        for (const q of val.questions) {
          items.push({ ...q, _source: name, _module: val.id || name });
        }
      }

      // Bank shards export named arrays of items
      if (Array.isArray(val) && val.length && val[0]?.question) {
        for (const q of val) items.push({ ...q, _source: name });
      }
    }
    return items;
  } catch (e) {
    return { __error: e.message };
  }
}

// Detect inline markdown table: a pipe row followed by a divider row.
// Renders inline — no diagram needed for these items.
function hasInlineMarkdownTable(text) {
  return /\|.*\|\s*\n\s*\|[\s:|-]+\|/.test(text);
}

// Detect inline data-set of values: "data set 4, 7, 9, 11" / "values 12, 15, 18, 22".
function hasInlineDataSet(text) {
  return /\b(?:data set|values?|the (?:numbers|integers))\b[^.]{0,40}\d+(?:\s*,\s*\d+){2,}/i.test(text);
}

function classify(stem) {
  if (!stem || typeof stem !== 'string') return null;
  const text = stem.replace(/<[^>]+>/g, ' ');
  for (const guard of FALSE_POSITIVE_GUARDS) {
    if (guard.test(text)) return null;
  }
  for (const cue of CUES) {
    if (!cue.re.test(text)) continue;
    if ((cue.type === 'dataTable' || cue.type === 'twoWayTable')
        && hasInlineMarkdownTable(text)) return null;
    if (cue.type === 'dotPlot' && hasInlineDataSet(text)) return null;
    return cue.type;
  }
  return null;
}

const findings = []; // { file, source, id, expectedType, currentType, hasDiagram, snippet }
const fileBuckets = new Map(); // file -> {scanned, withDiag, missing}
const seen = new Set(); // dedupe key: file::module::id

async function main() {
  for (const file of [...BANK_FILES, ...TEST_FILES]) {
    const rel = path.relative(repoRoot, file);
    const items = await loadItems(file);
    if (items.__error) {
      console.error(`[skip] ${rel}: ${items.__error}`);
      continue;
    }
    let scanned = 0, withDiag = 0, missing = 0;
    for (const q of items) {
      if (!q.question) continue;
      scanned++;
      const expectedType = classify(q.question);
      if (!expectedType) continue;
      // questionTable satisfies dataTable / twoWayTable cues — it's the R&W
      // mechanism for inlining a table next to the stem.
      const hasVisualField = q.diagram
        || ((expectedType === 'dataTable' || expectedType === 'twoWayTable') && q.questionTable);
      if (hasVisualField) { withDiag++; continue; }
      missing++;
      const key = `${rel}::${q._module || ''}::${q.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      findings.push({
        file: rel,
        source: q._source,
        module: q._module,
        id: q.id,
        expectedType,
        snippet: q.question.replace(/<[^>]+>/g, ' ').slice(0, 200),
      });
    }
    fileBuckets.set(rel, { scanned, withDiag, missing });
  }

  const json = process.argv.includes('--json');
  const strict = process.argv.includes('--strict');

  if (json) {
    console.log(JSON.stringify({ findings, summary: Object.fromEntries(fileBuckets) }, null, 2));
  } else {
    // Group findings by expected diagram type
    const byType = new Map();
    for (const f of findings) {
      const list = byType.get(f.expectedType) || [];
      list.push(f);
      byType.set(f.expectedType, list);
    }
    console.log('\n=== Missing-diagram audit ===\n');
    for (const [type, list] of [...byType.entries()].sort((a, b) => b[1].length - a[1].length)) {
      console.log(`\n### ${type} — ${list.length} item${list.length === 1 ? '' : 's'}`);
      for (const f of list.slice(0, 20)) {
        console.log(`  · [${f.id}] ${path.basename(f.file)}${f.module ? '/' + f.module : ''}`);
        console.log(`    "${f.snippet}…"`);
      }
      if (list.length > 20) console.log(`    … and ${list.length - 20} more`);
    }
    console.log('\n=== Per-file summary ===\n');
    let totalScan = 0, totalWith = 0, totalMissing = 0;
    for (const [rel, b] of fileBuckets) {
      if (b.missing > 0) {
        console.log(`  ${rel}: ${b.missing} missing / ${b.withDiag} ok / ${b.scanned} scanned`);
      }
      totalScan += b.scanned; totalWith += b.withDiag; totalMissing += b.missing;
    }
    console.log(`\nTotal: ${totalMissing} missing across ${totalScan} items (${totalWith} already carry diagrams)`);
  }

  if (strict && findings.length > 0) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
