/* eslint-disable no-eval -- offline content validator run with node; evaluates generated snippets, never user input */
/**
 * Rendering Fidelity Check
 *
 * Run with: node src/data/contentTabs/renderingFidelityCheck.js
 *
 * Validates that all content can be rendered correctly:
 *   1. All LaTeX ($..$ and $$..$$) parses without KaTeX errors
 *   2. Every block type used has a renderer in ContentTabRenderer
 *   3. Every diagramRef visualType is in the visual registry
 *   4. No unicode math symbols that should be LaTeX
 *   5. No unmatched dollar signs that break math parsing
 */

const fs = require('fs');
const path = require('path');

let katex;
try {
  katex = require('katex');
} catch {
  console.error('katex not installed — run: npm install katex');
  process.exit(1);
}

const REGISTERED_BLOCK_TYPES = new Set([
  'heading', 'text', 'formula', 'table', 'formulaGrid',
  'callout', 'tip', 'keyInsight', 'trapCard', 'strategyCard',
  'example', 'steps', 'checkpointQuestion', 'comparison',
  'iconRow', 'diagramRef',
  'parallelLinesDiagram', 'perpendicularLinesDiagram',
  'slopeFromGraphDiagram', 'slopeFromTableDiagram',
  'yInterceptDiagram',
]);

const VISUAL_REGISTRY = new Set([
  'parallelLinesDiagram', 'perpendicularLinesDiagram',
  'slopeFromGraphDiagram', 'slopeFromTableDiagram',
  'yInterceptDiagram', 'parabolaFromGraphDiagram',
  'rightTriangleDiagram', 'specialTrianglesDiagram',
  'similarTrianglesDiagram', 'triangleAreaDiagram',
  'circlePartsDiagram', 'arcLengthDiagram', 'circleEquationDiagram',
  'cubeDiagram', 'rectangularPrismDiagram', 'cylinderDiagram',
  'sphereDiagram', 'coneDiagram',
  'meanMedianDiagram',
  'horizontalShiftDiagram', 'verticalShiftDiagram',
  'exponentialGrowthDiagram',
  'percentChangeDiagram',
  'adaptiveModuleFlowDiagram', 'scoreCompositionDiagram',
  'moduleTimeBudgetDiagram', 'sentenceBoundaryDiagram',
  'subjectVerbAgreementDiagram', 'transitionMapDiagram',
]);

const UNICODE_MATH_PATTERNS = [
  { re: /[x̄ȳ]/u, label: 'combining overline (use $\\bar{x}$)' },
  { re: /[Σ∑]/u, label: 'sigma symbol (use $\\sum$)' },
  { re: /[≠≥≤≈∞±√∫∂∇]/u, label: 'unicode math operator (use LaTeX)' },
  { re: /[×÷]/u, label: 'unicode multiply/divide (use $\\times$ / $\\div$)' },
  { re: /[αβγδεζηθικλμνξπρστυφχψω]/u, label: 'greek letter (use LaTeX e.g. $\\alpha$)' },
];

function testLatex(latex, displayMode) {
  try {
    katex.renderToString(latex.trim(), { displayMode, throwOnError: true });
    return null;
  } catch (e) {
    return e.message;
  }
}

function extractAndTestMath(text, label) {
  const issues = [];
  if (!text || typeof text !== 'string') return issues;

  const ESCAPED_DOLLAR = '\uFFFD';
  let processed = text.replace(/\\\$/g, ESCAPED_DOLLAR);

  const CURRENCY_RE = /\$(\d+(?:,\d{3})*\.\d{2})(?=[\s,;:.!?)}\]]|$)/g;
  processed = processed.replace(CURRENCY_RE, 'CURRENCY');

  const displayMatches = [...processed.matchAll(/\$\$([\s\S]*?)\$\$/g)];
  for (const m of displayMatches) {
    const err = testLatex(m[1], true);
    if (err) issues.push({ label, latex: m[1].slice(0, 60), error: err, mode: 'display' });
    processed = processed.replace(m[0], '');
  }

  const inlineMatches = [...processed.matchAll(/\$([^$]+?)\$/g)];
  for (const m of inlineMatches) {
    const err = testLatex(m[1], false);
    if (err) issues.push({ label, latex: m[1].slice(0, 60), error: err, mode: 'inline' });
    processed = processed.replace(m[0], '');
  }

  const leftover = processed.replace(new RegExp(ESCAPED_DOLLAR, 'g'), '').replace(/CURRENCY/g, '');
  const unmatched = (leftover.match(/\$/g) || []).length;
  if (unmatched > 0) {
    issues.push({ label, latex: '', error: `${unmatched} unmatched $ sign(s)`, mode: 'parse' });
  }

  return issues;
}

function checkUnicodeMath(text, label) {
  const issues = [];
  if (!text || typeof text !== 'string') return issues;
  for (const { re, label: patLabel } of UNICODE_MATH_PATTERNS) {
    if (re.test(text)) {
      issues.push({ label, pattern: patLabel });
    }
  }
  return issues;
}

function extractAllStrings(block) {
  const strings = [];
  for (const key of ['content', 'wrong', 'correction', 'title', 'question', 'answer', 'summary', 'note', 'problem', 'label', 'description']) {
    if (typeof block[key] === 'string') strings.push({ field: key, text: block[key] });
  }
  if (Array.isArray(block.items)) {
    for (const item of block.items) {
      if (typeof item === 'string') {
        strings.push({ field: 'items', text: item });
      } else if (typeof item === 'object' && item) {
        for (const k of ['formula', 'label', 'note', 'content', 'description']) {
          if (typeof item[k] === 'string') strings.push({ field: `items.${k}`, text: item[k] });
        }
      }
    }
  }
  if (Array.isArray(block.steps)) {
    for (const step of block.steps) {
      if (typeof step === 'string') {
        strings.push({ field: 'steps', text: step });
      } else if (typeof step === 'object' && step) {
        for (const k of ['content', 'label']) {
          if (typeof step[k] === 'string') strings.push({ field: `steps.${k}`, text: step[k] });
        }
      }
    }
  }
  if (Array.isArray(block.headers)) {
    for (const h of block.headers) {
      if (typeof h === 'string') strings.push({ field: 'headers', text: h });
    }
  }
  if (Array.isArray(block.rows)) {
    for (const row of block.rows) {
      if (Array.isArray(row)) {
        for (const cell of row) {
          if (typeof cell === 'string') strings.push({ field: 'rows', text: cell });
        }
      }
    }
  }
  return strings;
}

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
  if (!match) return null;
  try { return eval('(' + match[1] + ')'); } catch { return null; }
}

function run() {
  const dir = __dirname;
  let latexErrors = [];
  let unicodeIssues = [];
  let unknownBlocks = [];
  let unknownVisuals = [];
  let tabsChecked = 0;
  let mathExpressionsChecked = 0;

  function checkTab(label, tab) {
    tabsChecked++;
    for (const [sectionId, section] of Object.entries(tab.sections || {})) {
      if (section.summary) {
        const summaryLabel = `${label}.${sectionId}.summary`;
        latexErrors.push(...extractAndTestMath(section.summary, summaryLabel));
        unicodeIssues.push(...checkUnicodeMath(section.summary, summaryLabel));
      }
      for (let i = 0; i < (section.blocks || []).length; i++) {
        const block = section.blocks[i];
        const blockLabel = `${label}.${sectionId}.block[${i}](${block.type})`;

        if (!REGISTERED_BLOCK_TYPES.has(block.type)) {
          unknownBlocks.push({ label: blockLabel, type: block.type });
        }

        if (block.type === 'diagramRef' && block.visualType && !VISUAL_REGISTRY.has(block.visualType)) {
          unknownVisuals.push({ label: blockLabel, visualType: block.visualType });
        }

        const strings = extractAllStrings(block);
        for (const { field, text } of strings) {
          const fieldLabel = `${blockLabel}.${field}`;
          const mathIssues = extractAndTestMath(text, fieldLabel);
          mathExpressionsChecked++;
          latexErrors.push(...mathIssues);
          unicodeIssues.push(...checkUnicodeMath(text, fieldLabel));
        }
      }
    }
  }

  const moduleFiles = fs.readdirSync(dir).filter(f => f.endsWith('Content.js'));
  for (const file of moduleFiles) {
    const tab = parseFile(path.join(dir, file));
    if (!tab) continue;
    const moduleId = tab.moduleId || file.replace('Content.js', '');
    checkTab(`[module] ${moduleId}`, tab);
  }

  const lessonsDir = path.join(dir, 'lessons');
  if (fs.existsSync(lessonsDir)) {
    const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('Lessons.js'));
    for (const file of lessonFiles) {
      const lessonMap = parseFile(path.join(lessonsDir, file));
      if (!lessonMap) continue;
      for (const [lessonId, tab] of Object.entries(lessonMap)) {
        const moduleId = tab.moduleId || file.replace('Lessons.js', '');
        checkTab(`[lesson] ${moduleId}/L${lessonId}`, tab);
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log('  RENDERING FIDELITY REPORT');
  console.log('═══════════════════════════════════════════════\n');
  console.log(`Tabs checked:         ${tabsChecked}`);
  console.log(`Text fields scanned:  ${mathExpressionsChecked}`);

  if (latexErrors.length > 0) {
    console.log(`\nLATEX ERRORS (${latexErrors.length}):`);
    for (const e of latexErrors) {
      console.error(`  ✗ ${e.label} [${e.mode}]: ${e.error}`);
      if (e.latex) console.error(`    LaTeX: ${e.latex}`);
    }
  } else {
    console.log('\nLATEX: All math expressions render correctly.');
  }

  if (unicodeIssues.length > 0) {
    console.log(`\nUNICODE MATH (${unicodeIssues.length}):`);
    for (const u of unicodeIssues.slice(0, 20)) {
      console.warn(`  ⚠ ${u.label}: ${u.pattern}`);
    }
    if (unicodeIssues.length > 20) console.warn(`  … and ${unicodeIssues.length - 20} more`);
  } else {
    console.log('UNICODE: No raw unicode math symbols found.');
  }

  if (unknownBlocks.length > 0) {
    console.log(`\nUNKNOWN BLOCK TYPES (${unknownBlocks.length}):`);
    for (const b of unknownBlocks) {
      console.error(`  ✗ ${b.label}: "${b.type}" has no renderer`);
    }
  } else {
    console.log('BLOCK TYPES: All block types have registered renderers.');
  }

  if (unknownVisuals.length > 0) {
    console.log(`\nUNKNOWN VISUAL TYPES (${unknownVisuals.length}):`);
    for (const v of unknownVisuals) {
      console.warn(`  ⚠ ${v.label}: "${v.visualType}" not in visual registry`);
    }
  } else {
    console.log('VISUAL TYPES: All diagramRef visualTypes are registered.');
  }

  console.log('');
  const totalErrors = latexErrors.length + unknownBlocks.length;
  const totalWarnings = unicodeIssues.length + unknownVisuals.length;

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('ALL CLEAR — rendering fidelity validated.');
  } else if (totalErrors === 0) {
    console.log(`PASS with ${totalWarnings} warnings.`);
  } else {
    console.log(`FAIL — ${totalErrors} rendering errors, ${totalWarnings} warnings.`);
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

run();
