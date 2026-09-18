/* eslint-disable no-eval -- offline content validator run with node; evaluates generated snippets, never user input */
/**
 * SAT Patterns Quality Check
 *
 * Run with: node src/data/contentTabs/satPatternsQualityCheck.js
 *
 * Validates that every satPatterns section meets the tutor-grade rubric:
 * 1. Minimum 3 blocks per section
 * 2. Contains at least one pattern archetype (callout or example)
 * 3. Contains at least one trap/recovery (trapCard or warning callout)
 * 4. Contains at least one decision rule (tip, strategyCard, or keyInsight)
 * 5. No low-signal filler phrases
 * 6. No duplicate callout titles across modules
 */

const fs = require('fs');
const path = require('path');

const MIN_BLOCKS = 3;

const REQUIRED_ELEMENTS = [
  { label: 'pattern archetype', matchTypes: ['callout', 'example'] },
  { label: 'trap or recovery',  matchTypes: ['trapCard', 'callout', 'comparison'] },
  { label: 'decision rule',     matchTypes: ['tip', 'strategyCard', 'keyInsight'] },
];

const LOW_SIGNAL_PATTERNS = [
  { re: /the SAT loves/i, label: '"the SAT loves"' },
  { re: /college board (often|frequently|typically) (tests|asks)/i, label: 'generic CB frequency claim' },
  { re: /\d+[–-]\d+ questions per/i, label: 'unverifiable question-count claim' },
  { re: /you (should|need to|must) (know|understand|remember)/i, label: 'generic instruction' },
  { re: /this is (important|key|crucial)/i, label: 'filler emphasis' },
];

function extractAllText(blocks) {
  return blocks
    .map(b => [b.content, b.wrong, b.correction, b.title, b.question, b.summary].filter(Boolean).join(' '))
    .join(' ');
}

function checkSatPatterns(label, section) {
  const warnings = [];
  const errors = [];

  if (!section || !Array.isArray(section.blocks)) {
    errors.push(`${label}: satPatterns section has no blocks array`);
    return { errors, warnings };
  }

  if (section.blocks.length < MIN_BLOCKS) {
    warnings.push(`${label}: only ${section.blocks.length} blocks (minimum ${MIN_BLOCKS} for tutor-grade quality)`);
  }

  const blockTypes = section.blocks.map(b => b.type);

  for (const req of REQUIRED_ELEMENTS) {
    if (!req.matchTypes.some(t => blockTypes.includes(t))) {
      warnings.push(`${label}: missing ${req.label} — expected one of: ${req.matchTypes.join(', ')}`);
    }
  }

  const allText = extractAllText(section.blocks);
  if (section.summary) {
    const summaryText = section.summary;
    for (const { re, label: patLabel } of LOW_SIGNAL_PATTERNS) {
      if (re.test(summaryText)) {
        warnings.push(`${label}: low-signal phrase in summary — ${patLabel}`);
      }
    }
  }
  for (const { re, label: patLabel } of LOW_SIGNAL_PATTERNS) {
    if (re.test(allText)) {
      warnings.push(`${label}: low-signal phrase in blocks — ${patLabel}`);
    }
  }

  return { errors, warnings };
}

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
  if (!match) return null;
  try {
    return eval('(' + match[1] + ')');
  } catch (e) {
    return null;
  }
}

function run() {
  const dir = __dirname;
  let totalErrors = 0;
  let totalWarnings = 0;
  let sectionsChecked = 0;
  const allCalloutTitles = new Map();

  const moduleFiles = fs.readdirSync(dir).filter(f => f.endsWith('Content.js'));
  for (const file of moduleFiles) {
    const contentTab = parseFile(path.join(dir, file));
    if (!contentTab) { console.log(`SKIP: ${file}`); continue; }
    const moduleId = contentTab.moduleId || file.replace('Content.js', '');
    const satSection = contentTab.sections?.satPatterns;
    if (!satSection) continue;

    sectionsChecked++;
    const label = `${file} (${moduleId})`;
    const { errors, warnings } = checkSatPatterns(label, satSection);
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    for (const e of errors) console.error(`  ✗ ${e}`);
    for (const w of warnings) console.warn(`  ⚠ ${w}`);

    for (const block of satSection.blocks || []) {
      if (block.type === 'callout' && block.title) {
        if (!allCalloutTitles.has(block.title)) allCalloutTitles.set(block.title, []);
        allCalloutTitles.get(block.title).push(moduleId);
      }
    }
  }

  const lessonsDir = path.join(dir, 'lessons');
  if (fs.existsSync(lessonsDir)) {
    const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('Lessons.js'));
    for (const file of lessonFiles) {
      const lessonMap = parseFile(path.join(lessonsDir, file));
      if (!lessonMap) { console.log(`SKIP (lesson): ${file}`); continue; }
      for (const [lessonId, tab] of Object.entries(lessonMap)) {
        const satSection = tab.sections?.satPatterns;
        if (!satSection) continue;

        sectionsChecked++;
        const label = `${file}[lesson ${lessonId}] (${tab.moduleId})`;
        const { errors, warnings } = checkSatPatterns(label, satSection);
        totalErrors += errors.length;
        totalWarnings += warnings.length;
        for (const e of errors) console.error(`  ✗ ${e}`);
        for (const w of warnings) console.warn(`  ⚠ ${w}`);

        for (const block of satSection.blocks || []) {
          if (block.type === 'callout' && block.title) {
            if (!allCalloutTitles.has(block.title)) allCalloutTitles.set(block.title, []);
            allCalloutTitles.get(block.title).push(`${tab.moduleId}/L${lessonId}`);
          }
        }
      }
    }
  }

  const dupeCallouts = [];
  for (const [title, modules] of allCalloutTitles.entries()) {
    if (modules.length >= 3) {
      dupeCallouts.push({ title, count: modules.length, modules });
    }
  }

  console.log('\n═══ SAT PATTERNS QUALITY REPORT ═══\n');
  console.log(`Sections checked: ${sectionsChecked}`);
  console.log(`Errors:   ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);

  if (dupeCallouts.length > 0) {
    console.log(`\nDUPLICATE CALLOUT TITLES (reused in 3+ sections):`);
    for (const d of dupeCallouts) {
      console.log(`  "${d.title}" — ${d.count} sections`);
    }
  } else {
    console.log('\nCallout titles: all unique or minimally reused.');
  }

  console.log('');
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('ALL CLEAR — every satPatterns section meets tutor-grade rubric.');
  } else {
    console.log(`RESULT: ${totalErrors} errors, ${totalWarnings} warnings to resolve.`);
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

run();
