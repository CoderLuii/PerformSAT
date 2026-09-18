/* eslint-disable no-eval -- offline content validator run with node; evaluates generated snippets, never user input */
/**
 * Quality Check for Learn + Practice model.
 *
 * Run with: node src/data/contentTabs/tutorGradeQualityCheck.js
 *
 * Validates:
 *   - learn section has at least 2 blocks with explanation/formula content
 *   - practice section has a worked example + checkpoint question
 *   - No low-signal filler phrases
 */

const fs = require('fs');
const path = require('path');

const SECTION_QUALITY = {
  learn: {
    minBlocks: 2,
    requiredElements: [
      { label: 'explanation or formula', matchTypes: ['text', 'keyInsight', 'formula', 'formulaGrid', 'callout', 'table'] },
    ],
  },
  practice: {
    minBlocks: 2,
    requiredElements: [
      { label: 'worked example', matchTypes: ['example', 'steps'] },
      { label: 'checkpoint question', matchTypes: ['checkpointQuestion'] },
    ],
  },
};

const LOW_SIGNAL_PATTERNS = [
  { re: /the SAT loves/i, label: '"the SAT loves"' },
  { re: /college board (often|frequently|typically) (tests|asks)/i, label: 'generic CB frequency claim' },
  { re: /\d+[–-]\d+ questions per/i, label: 'unverifiable question-count claim' },
  { re: /you (should|need to|must) (know|understand|remember)/i, label: 'generic instruction' },
  { re: /this is (important|key|crucial)/i, label: 'filler emphasis' },
  { re: /this is (a |an )?(common|important|key|critical)/i, label: 'filler importance claim' },
  { re: /remember (that |to )?always/i, label: 'generic "remember" instruction' },
  { re: /make sure (you |to )/i, label: 'generic "make sure" instruction' },
  { re: /don'?t forget to/i, label: '"don\'t forget" instruction' },
  { re: /keep in mind (that )?/i, label: '"keep in mind" filler' },
  { re: /practice makes perfect/i, label: 'cliche filler' },
  { re: /let'?s (take a |have a )?look at/i, label: 'conversational filler' },
  { re: /in this (lesson|section|module)/i, label: 'self-referential filler' },
  { re: /as (we|you) (can |will )?(see|learn|discover)/i, label: 'narration filler' },
];

function extractAllText(blocks) {
  return blocks
    .map(b => [b.content, b.wrong, b.correction, b.title, b.question, b.summary, b.note]
      .filter(Boolean).join(' '))
    .join(' ');
}

function checkSection(label, sectionId, section) {
  const warnings = [];
  const errors = [];
  const quality = SECTION_QUALITY[sectionId];

  if (!section || !Array.isArray(section.blocks)) {
    errors.push(`${label}.${sectionId}: no blocks array`);
    return { errors, warnings };
  }

  if (quality) {
    if (section.blocks.length < quality.minBlocks) {
      warnings.push(`${label}.${sectionId}: ${section.blocks.length} blocks (min ${quality.minBlocks})`);
    }

    const blockTypes = section.blocks.map(b => b.type);
    for (const req of quality.requiredElements) {
      if (!req.matchTypes.some(t => blockTypes.includes(t))) {
        warnings.push(`${label}.${sectionId}: missing ${req.label} — need one of: ${req.matchTypes.join(', ')}`);
      }
    }
  }

  const allText = extractAllText(section.blocks);
  for (const { re, label: patLabel } of LOW_SIGNAL_PATTERNS) {
    if (re.test(allText)) {
      warnings.push(`${label}.${sectionId}: low-signal phrase — ${patLabel}`);
    }
  }

  return { errors, warnings };
}

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
  if (!match) return null;
  try { return eval('(' + match[1] + ')'); } catch { return null; }
}

function run() {
  const dir = __dirname;
  let totalErrors = 0;
  let totalWarnings = 0;
  let tabsChecked = 0;
  const moduleReport = {};

  const moduleFiles = fs.readdirSync(dir).filter(f => f.endsWith('Content.js'));
  for (const file of moduleFiles) {
    const contentTab = parseFile(path.join(dir, file));
    if (!contentTab) { console.log(`SKIP: ${file}`); continue; }
    const moduleId = contentTab.moduleId || file.replace('Content.js', '');
    const label = `[module] ${moduleId}`;
    tabsChecked++;
    const modWarnings = [];
    const modErrors = [];

    for (const [sectionId, section] of Object.entries(contentTab.sections || {})) {
      const { errors, warnings } = checkSection(label, sectionId, section);
      modErrors.push(...errors);
      modWarnings.push(...warnings);
    }

    moduleReport[moduleId] = { errors: modErrors.length, warnings: modWarnings.length };
    totalErrors += modErrors.length;
    totalWarnings += modWarnings.length;
    for (const e of modErrors) console.error(`  ✗ ${e}`);
    for (const w of modWarnings) console.warn(`  ⚠ ${w}`);
  }

  const lessonsDir = path.join(dir, 'lessons');
  if (fs.existsSync(lessonsDir)) {
    const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('Lessons.js'));
    for (const file of lessonFiles) {
      const lessonMap = parseFile(path.join(lessonsDir, file));
      if (!lessonMap) { console.log(`SKIP (lesson): ${file}`); continue; }
      for (const [lessonId, tab] of Object.entries(lessonMap)) {
        const moduleId = tab.moduleId || file.replace('Lessons.js', '');
        const label = `[lesson] ${moduleId}/L${lessonId}`;
        tabsChecked++;

        for (const [sectionId, section] of Object.entries(tab.sections || {})) {
          const { errors, warnings } = checkSection(label, sectionId, section);
          totalErrors += errors.length;
          totalWarnings += warnings.length;
          for (const e of errors) console.error(`  ✗ ${e}`);
          for (const w of warnings) console.warn(`  ⚠ ${w}`);

          if (!moduleReport[moduleId]) moduleReport[moduleId] = { errors: 0, warnings: 0 };
          moduleReport[moduleId].errors += errors.length;
          moduleReport[moduleId].warnings += warnings.length;
        }
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log('  QUALITY REPORT (Learn + Practice)');
  console.log('═══════════════════════════════════════════════\n');
  console.log(`Tabs checked:   ${tabsChecked}`);
  console.log(`Total errors:   ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);

  console.log('\n── Per-Module Summary ──');
  const sortedModules = Object.entries(moduleReport).sort((a, b) => (b[1].errors + b[1].warnings) - (a[1].errors + a[1].warnings));
  for (const [mod, stats] of sortedModules) {
    const status = stats.errors > 0 ? '✗ FAIL' : stats.warnings > 0 ? '⚠ WARN' : '✓ PASS';
    console.log(`  ${status}  ${mod}: ${stats.errors} errors, ${stats.warnings} warnings`);
  }

  console.log('');
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('ALL CLEAR — every tab meets Learn + Practice quality rubric.');
  } else if (totalErrors === 0) {
    console.log(`PASS with ${totalWarnings} warnings. No hard errors.`);
  } else {
    console.log(`FAIL — ${totalErrors} errors and ${totalWarnings} warnings to resolve.`);
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

run();
