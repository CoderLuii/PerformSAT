/* eslint-disable no-eval -- offline content validator run with node; evaluates generated snippets, never user input */
/**
 * Schema validation for all content tabs (module-level and lesson-level).
 * Run with: node src/data/contentTabs/validateAll.js
 * Validates the Learn + Practice two-stage model.
 */

const fs = require('fs');
const path = require('path');

const BLOCK_BUDGET = {
  learn: 12,
  practice: 4,
};

const BLOCK_REQUIRED_FIELDS = {
  table:              ['headers', 'rows'],
  steps:              ['items'],
  example:            ['problem', 'steps'],
  trapCard:           ['wrong'],
  checkpointQuestion: ['question', 'answer'],
  formulaGrid:        ['items'],
  iconRow:            ['items'],
  formula:            ['content'],
  callout:            ['content'],
  comparison:         ['items'],
};

const SUPPORTED_VISUAL_TYPES = [
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
];

const SEMANTIC_RULES = [
  {
    titlePattern: /volume of a cube|cube example/i,
    required: [/s\^3/i],
    forbidden: [/v_\{\\text\{cyl\}\}|v_\{\\text\{cone\}\}|v_\{\\text\{sphere\}\}/i],
  },
  {
    titlePattern: /cylinder/i,
    required: [/\\pi\s*r\^2\s*h/i],
  },
  {
    titlePattern: /cone/i,
    required: [/\\frac\{1\}\{3\}\\pi r\^2h|\\frac\{1\}\{3\}\\pi r\^2\s*h/i],
  },
  {
    titlePattern: /sphere/i,
    required: [/\\frac\{4\}\{3\}\\pi r\^3/i],
  },
  {
    titlePattern: /discriminant/i,
    required: [/(b\^2\s*-\s*4ac|\\Delta)/i],
  },
];

function runSemanticCoherenceChecks(moduleId, contentTab, errors) {
  const title = contentTab?.title || '';
  const learnBlocks = contentTab?.sections?.learn?.blocks || [];
  const corpus = learnBlocks
    .map((b) => [b.content, b.note, b.title, b.description].filter(Boolean).join(' '))
    .join(' ')
    .replace(/\s+/g, ' ');
  for (const rule of SEMANTIC_RULES) {
    if (!rule.titlePattern.test(title)) continue;
    for (const re of rule.required || []) {
      if (!re.test(corpus)) errors.push(`${moduleId}: semantic mismatch for "${title}" (missing ${re})`);
    }
    for (const re of rule.forbidden || []) {
      if (re.test(corpus)) errors.push(`${moduleId}: semantic mismatch for "${title}" (contains ${re})`);
    }
  }
}

function validateContentTab(moduleId, contentTab) {
  const errors = [];
  const warnings = [];

  if (!contentTab) {
    errors.push(`${moduleId}: contentTab is null/undefined`);
    return { valid: false, errors, warnings };
  }

  if (!contentTab.moduleId || contentTab.moduleId !== moduleId) {
    errors.push(`${moduleId}: moduleId mismatch (got "${contentTab.moduleId}")`);
  }

  if (!contentTab.title) {
    errors.push(`${moduleId}: missing title`);
  }

  if (!contentTab.sections || typeof contentTab.sections !== 'object') {
    errors.push(`${moduleId}: missing sections object`);
    return { valid: false, errors, warnings };
  }

  const sectionIds = Object.keys(contentTab.sections);
  if (!sectionIds.includes('learn')) {
    errors.push(`${moduleId}: missing required "learn" section`);
  }
  if (!sectionIds.includes('practice')) {
    errors.push(`${moduleId}: missing required "practice" section`);
  }

  for (const [sectionId, section] of Object.entries(contentTab.sections)) {
    if (!section.title) {
      errors.push(`${moduleId}.${sectionId}: missing title`);
    }
    if (!Array.isArray(section.blocks) || section.blocks.length === 0) {
      errors.push(`${moduleId}.${sectionId}: blocks must be a non-empty array`);
      continue;
    }

    const budget = BLOCK_BUDGET[sectionId];
    if (budget && section.blocks.length > budget) {
      warnings.push(`${moduleId}.${sectionId}: ${section.blocks.length} blocks exceeds budget of ${budget}`);
    }

    for (let i = 0; i < section.blocks.length; i++) {
      const block = section.blocks[i];

      if (!block.type) {
        errors.push(`${moduleId}.${sectionId}.block[${i}]: missing type`);
        continue;
      }

      const required = BLOCK_REQUIRED_FIELDS[block.type];
      if (required) {
        for (const field of required) {
          if (block[field] === undefined || block[field] === null) {
            errors.push(`${moduleId}.${sectionId}.block[${i}] (${block.type}): missing required field '${field}'`);
          }
        }
      }

      if (block.type === 'diagramRef' && block.visualType) {
        if (!SUPPORTED_VISUAL_TYPES.includes(block.visualType)) {
          warnings.push(`${moduleId}.${sectionId}.block[${i}]: diagramRef visualType '${block.visualType}' not in supported list`);
        }
      }
    }
  }

  const practice = contentTab.sections.practice;
  if (practice && Array.isArray(practice.blocks)) {
    const hasExample = practice.blocks.some(b => b.type === 'example' || b.type === 'steps');
    const hasCheckpoint = practice.blocks.some(b => b.type === 'checkpointQuestion');
    if (!hasExample) {
      warnings.push(`${moduleId}.practice: missing worked example or steps`);
    }
    if (!hasCheckpoint) {
      warnings.push(`${moduleId}.practice: missing checkpoint question`);
    }
  }

  runSemanticCoherenceChecks(moduleId, contentTab, errors);

  return { valid: errors.length === 0, errors, warnings };
}

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('Content.js'));
let hadError = false;
let totalErrors = 0;
let totalWarnings = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
  if (!match) {
    console.error(`SKIP: Could not parse ${file}`);
    continue;
  }
  let contentTab;
  try {
    contentTab = eval('(' + match[1] + ')');
  } catch (e) {
    console.error(`SKIP: ${file}: ${e.message}`);
    hadError = true;
    continue;
  }
  const moduleId = contentTab.moduleId || file.replace('Content.js', '').replace(/([A-Z])/g, (m, c) => '-' + c.toLowerCase()).replace(/^-/, '');
  const { valid, errors, warnings } = validateContentTab(moduleId, contentTab);
  if (!valid) {
    hadError = true;
    totalErrors += errors.length;
    console.error(`\n${file} ERRORS:`);
    errors.forEach(e => console.error(`  ✗ ${e}`));
  }
  if (warnings.length > 0) {
    totalWarnings += warnings.length;
    console.warn(`\n${file} WARNINGS:`);
    warnings.forEach(w => console.warn(`  ⚠ ${w}`));
  }
}

const lessonsDir = path.join(dir, 'lessons');
if (fs.existsSync(lessonsDir)) {
  const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('Lessons.js'));
  for (const file of lessonFiles) {
    const raw = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
    const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
    if (!match) {
      console.error(`SKIP (lesson): Could not parse ${file}`);
      continue;
    }
    let lessonMap;
    try {
      lessonMap = eval('(' + match[1] + ')');
    } catch (e) {
      console.error(`SKIP (lesson): ${file}: ${e.message}`);
      hadError = true;
      continue;
    }
    for (const [lessonId, tab] of Object.entries(lessonMap)) {
      const label = `${file}[lesson ${lessonId}]`;
      const moduleId = tab.moduleId || label;
      const { valid, errors, warnings } = validateContentTab(moduleId, tab);
      if (!valid) {
        hadError = true;
        totalErrors += errors.length;
        console.error(`\n${label} ERRORS:`);
        errors.forEach(e => console.error(`  ✗ ${e}`));
      }
      if (warnings.length > 0) {
        totalWarnings += warnings.length;
        console.warn(`\n${label} WARNINGS:`);
        warnings.forEach(w => console.warn(`  ⚠ ${w}`));
      }
    }
  }
}

console.log(`\n══════ SCHEMA VALIDATION SUMMARY ══════`);
console.log(`Errors:   ${totalErrors}`);
console.log(`Warnings: ${totalWarnings}`);

if (hadError) {
  console.log(`\nRESULT: FAIL — fix schema errors above.`);
  process.exit(1);
}
console.log(`\nRESULT: PASS`);
