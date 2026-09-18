/* eslint-disable no-eval -- offline content validator run with node; evaluates generated snippets, never user input */
/**
 * Content Duplication & Coverage Checker
 *
 * Run with: node src/data/contentTabs/dedupeCheck.js
 *
 * Flags:
 * 1. Identical heading strings reused across 3+ modules
 * 2. Identical text block content reused across 2+ modules
 * 3. Sections exceeding block budget
 * 4. Near-duplicate n-grams (same 5-word phrase in NGRAM_MODULE_THRESHOLD+ modules)
 * 5. Pedagogical skeleton reuse — same block-type sequence in same section across 3+ modules
 * 6. Example difficulty progression — workedExamples lacking difficulty spread
 * 7. Trap density — modules with fewer than 2 trapCards across all sections
 * 8. Decision-rule coverage — satPatterns tips missing if/when/→ language
 */

const NGRAM_SIZE = 5;
const NGRAM_MODULE_THRESHOLD = 4; // fail if a 5-word phrase appears in 4+ modules

const fs = require('fs');
const path = require('path');

const BLOCK_BUDGET = {
  learn: 12,
  practice: 4,
};

function extractTextBlocks(contentTab) {
  const texts = [];
  if (!contentTab?.sections) return texts;
  for (const [sectionId, section] of Object.entries(contentTab.sections)) {
    if (!section?.blocks) continue;
    for (const block of section.blocks) {
      if ((block.type === 'heading' || block.type === 'text') && block.content) {
        texts.push({ moduleId: contentTab.moduleId, sectionId, type: block.type, content: block.content });
      }
    }
  }
  return texts;
}

function normalizeForNgram(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

function getWordNgrams(text, n) {
  const words = normalizeForNgram(text).split(/\s+/).filter(w => w.length > 0);
  const set = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    set.add(words.slice(i, i + n).join(' '));
  }
  return set;
}

function checkNearDuplicateNgrams(allTexts) {
  const ngramToModules = new Map();
  for (const item of allTexts) {
    const content = item.content;
    if (!content || content.length < 30) continue;
    const ng = getWordNgrams(content, NGRAM_SIZE);
    for (const phrase of ng) {
      if (phrase.length < 25) continue; // skip very short 5-word combos
      if (!ngramToModules.has(phrase)) ngramToModules.set(phrase, new Set());
      ngramToModules.get(phrase).add(item.moduleId);
    }
  }
  const overThreshold = [];
  for (const [phrase, modules] of ngramToModules.entries()) {
    if (modules.size >= NGRAM_MODULE_THRESHOLD) {
      overThreshold.push({ phrase: phrase.slice(0, 60), count: modules.size, modules: [...modules] });
    }
  }
  return overThreshold;
}

function checkBudgets(contentTab) {
  const violations = [];
  if (!contentTab?.sections) return violations;
  for (const [sectionId, section] of Object.entries(contentTab.sections)) {
    const budget = BLOCK_BUDGET[sectionId];
    if (budget && section.blocks && section.blocks.length > budget) {
      violations.push({
        moduleId: contentTab.moduleId,
        sectionId,
        count: section.blocks.length,
        budget,
      });
    }
  }
  return violations;
}

function extractSkeleton(section) {
  if (!section?.blocks) return '';
  return section.blocks.map(b => b.type).join('→');
}

function checkSkeletonReuse(allSections) {
  const skeletonMap = new Map();
  for (const { moduleId, sectionId, skeleton } of allSections) {
    if (!skeleton || skeleton.length < 3) continue;
    const key = `${sectionId}::${skeleton}`;
    if (!skeletonMap.has(key)) skeletonMap.set(key, new Set());
    skeletonMap.get(key).add(moduleId);
  }
  return [...skeletonMap.entries()]
    .filter(([, mods]) => mods.size >= 3)
    .map(([key, mods]) => {
      const [sectionId, skeleton] = key.split('::');
      return { sectionId, skeleton, count: mods.size, modules: [...mods] };
    });
}

function checkExampleProgression(allSections) {
  const issues = [];
  for (const { moduleId, sectionId, blocks } of allSections) {
    if (sectionId !== 'practice' || !blocks) continue;
    const examples = blocks.filter(b => b.type === 'example');
    if (examples.length < 2) continue;
    const diffs = new Set(examples.map(e => e.difficulty).filter(Boolean));
    if (diffs.size < 2) {
      issues.push({ moduleId, count: examples.length, difficulties: [...diffs] });
    }
  }
  return issues;
}

function checkTrapDensity(allSections) {
  const moduleTrapCount = new Map();
  for (const { moduleId, blocks } of allSections) {
    if (!blocks) continue;
    const trapCards = blocks.filter(b => b.type === 'trapCard').length;
    const trapHeadings = blocks.filter(b => b.type === 'heading' && /common\s+mistake/i.test(b.content)).length;
    moduleTrapCount.set(moduleId, (moduleTrapCount.get(moduleId) || 0) + trapCards + trapHeadings);
  }
  return [...moduleTrapCount.entries()]
    .filter(([, count]) => count < 1)
    .map(([moduleId, count]) => ({ moduleId, trapCount: count }));
}

function checkDecisionRuleCoverage(allSections) {
  const issues = [];
  for (const { moduleId, sectionId, blocks } of allSections) {
    if (sectionId !== 'learn' || !blocks) continue;
    const strategyHeadingIndex = blocks.findIndex(
      b => b.type === 'heading' && /test-day strategy|strategy/i.test(b.content || ''),
    );
    if (strategyHeadingIndex < 0) continue;
    const strategyText = blocks
      .slice(strategyHeadingIndex, strategyHeadingIndex + 3)
      .filter((b) => b.type === 'text')
      .map((b) => b.content || '')
      .join(' ');
    const hasDecisionRule = /if |when |then |first |second |decision rule|trigger/i.test(strategyText);
    if (!hasDecisionRule) {
      issues.push({ moduleId });
    }
  }
  return issues;
}

function run() {
  const dir = __dirname;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('Content.js'));
  
  const allTexts = [];
  const allBudgetViolations = [];
  const allSections = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    
    const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
    if (!match) {
      console.log(`SKIP: Could not parse export from ${file}`);
      continue;
    }
    
    let contentTab;
    try {
      contentTab = eval('(' + match[1] + ')');
    } catch (e) {
      console.log(`SKIP: eval failed for ${file}: ${e.message}`);
      continue;
    }
    
    allTexts.push(...extractTextBlocks(contentTab));
    allBudgetViolations.push(...checkBudgets(contentTab));
    for (const [sectionId, section] of Object.entries(contentTab.sections || {})) {
      allSections.push({
        moduleId: contentTab.moduleId,
        sectionId,
        blocks: section.blocks || [],
        skeleton: extractSkeleton(section),
      });
    }
  }

  // --- Lesson-level content tabs ---
  const lessonsDir = path.join(dir, 'lessons');
  if (fs.existsSync(lessonsDir)) {
    const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('Lessons.js'));
    for (const file of lessonFiles) {
      const filePath = path.join(lessonsDir, file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const match = raw.match(/export const \w+ = ({[\s\S]+});?\s*$/);
      if (!match) {
        console.log(`SKIP (lesson): Could not parse export from ${file}`);
        continue;
      }
      let lessonMap;
      try {
        lessonMap = eval('(' + match[1] + ')');
      } catch (e) {
        console.log(`SKIP (lesson): eval failed for ${file}: ${e.message}`);
        continue;
      }
      for (const [lessonId, tab] of Object.entries(lessonMap)) {
        const moduleId = tab.moduleId || file.replace('Lessons.js', '');
        allTexts.push(...extractTextBlocks(tab));
        allBudgetViolations.push(...checkBudgets(tab));
        for (const [sectionId, section] of Object.entries(tab.sections || {})) {
          allSections.push({
            moduleId: `${moduleId}/L${lessonId}`,
            sectionId,
            blocks: section.blocks || [],
            skeleton: extractSkeleton(section),
          });
        }
      }
    }
  }

  const ngramDupes = checkNearDuplicateNgrams(allTexts);

  // Find duplicated strings
  const contentMap = new Map();
  for (const item of allTexts) {
    const key = item.content?.trim();
    if (!key || key.length < 20) continue;
    if (!contentMap.has(key)) contentMap.set(key, []);
    contentMap.get(key).push(item);
  }
  
  const headingDupes = [];
  const textDupes = [];
  
  for (const [content, usages] of contentMap.entries()) {
    const uniqueModules = new Set(usages.map(u => u.moduleId));
    if (usages[0].type === 'heading' && uniqueModules.size >= 3) {
      headingDupes.push({ content, count: uniqueModules.size, modules: [...uniqueModules] });
    }
    if (usages[0].type === 'text' && uniqueModules.size >= 2) {
      textDupes.push({ content: content.slice(0, 80) + '...', count: uniqueModules.size, modules: [...uniqueModules] });
    }
  }
  
  const MAX_TOTAL_BLOCKS_PER_TAB = 400;

  const oversizedTabs = [];
  const allTabs = [...allTexts.reduce((map, t) => {
    if (!map.has(t.moduleId)) map.set(t.moduleId, 0);
    map.set(t.moduleId, map.get(t.moduleId) + 1);
    return map;
  }, new Map())].filter(([, count]) => count > MAX_TOTAL_BLOCKS_PER_TAB);

  const lowSignalPatterns = [
    /this is (a |an )?(common|important|key|critical)/i,
    /remember (that |to )?always/i,
    /make sure (you |to )/i,
    /it('|')s important to/i,
  ];
  const lowSignalHits = [];
  for (const item of allTexts) {
    if (!item.content) continue;
    for (const pat of lowSignalPatterns) {
      if (pat.test(item.content)) {
        lowSignalHits.push({ moduleId: item.moduleId, snippet: item.content.slice(0, 60), pattern: pat.source });
        break;
      }
    }
  }

  // Report
  console.log('\n=== CONTENT DUPLICATION REPORT ===\n');
  
  if (allBudgetViolations.length > 0) {
    console.log(`BUDGET VIOLATIONS (${allBudgetViolations.length}):`);
    for (const v of allBudgetViolations) {
      console.log(`  ${v.moduleId}.${v.sectionId}: ${v.count} blocks (budget: ${v.budget})`);
    }
  } else {
    console.log('BUDGET: All sections within limits.');
  }
  
  console.log('');
  
  if (headingDupes.length > 0) {
    console.log(`HEADING DUPES (same heading in 3+ modules, ${headingDupes.length} found):`);
    for (const d of headingDupes) {
      console.log(`  "${d.content}" — ${d.count} modules`);
    }
  } else {
    console.log('HEADINGS: No identical headings in 3+ modules.');
  }
  
  console.log('');
  
  if (textDupes.length > 0) {
    console.log(`TEXT DUPES (same text in 2+ modules, ${textDupes.length} found):`);
    for (const d of textDupes) {
      console.log(`  "${d.content}" — ${d.count} modules`);
    }
  } else {
    console.log('TEXT: No identical text blocks across modules.');
  }

  console.log('');

  if (ngramDupes.length > 0) {
    console.log(`N-GRAM NEAR-DUPES (same ${NGRAM_SIZE}-word phrase in ${NGRAM_MODULE_THRESHOLD}+ modules, ${ngramDupes.length} found):`);
    for (const d of ngramDupes.slice(0, 10)) {
      console.log(`  "${d.phrase}…" — ${d.count} modules`);
    }
    if (ngramDupes.length > 10) console.log(`  … and ${ngramDupes.length - 10} more`);
  } else {
    console.log(`N-GRAMS: No phrase repeated in ${NGRAM_MODULE_THRESHOLD}+ modules.`);
  }

  console.log('');

  if (oversizedTabs.length > 0 || allTabs.length > 0) {
    console.log(`OVERSIZED TABS (> ${MAX_TOTAL_BLOCKS_PER_TAB} text blocks, ${allTabs.length} found):`);
    for (const [moduleId, count] of allTabs) {
      console.log(`  ⚠ ${moduleId}: ${count} text/heading blocks`);
    }
  } else {
    console.log('TAB SIZE: All tabs within recommended block counts.');
  }

  console.log('');

  if (lowSignalHits.length > 0) {
    console.log(`LOW-SIGNAL TEXT PATTERNS (${lowSignalHits.length} found):`);
    for (const h of lowSignalHits.slice(0, 10)) {
      console.log(`  ⚠ ${h.moduleId}: "${h.snippet}…"`);
    }
    if (lowSignalHits.length > 10) console.log(`  … and ${lowSignalHits.length - 10} more`);
  } else {
    console.log('LOW-SIGNAL: No repeated low-signal text patterns detected.');
  }

  // --- Pedagogical checks ---

  const skeletonDupes = checkSkeletonReuse(allSections);
  console.log('');
  if (skeletonDupes.length > 0) {
    console.log(`SKELETON REUSE (same block-type sequence in 3+ modules, ${skeletonDupes.length} found):`);
    for (const d of skeletonDupes.slice(0, 10)) {
      console.log(`  ⚠ ${d.sectionId}: [${d.skeleton}] — ${d.count} modules`);
    }
    if (skeletonDupes.length > 10) console.log(`  … and ${skeletonDupes.length - 10} more`);
  } else {
    console.log('SKELETONS: No identical block-type sequences reused across 3+ modules.');
  }

  const progressionIssues = checkExampleProgression(allSections);
  console.log('');
  if (progressionIssues.length > 0) {
    console.log(`EXAMPLE PROGRESSION (same difficulty for all examples, ${progressionIssues.length} found):`);
    for (const p of progressionIssues) {
      console.log(`  ⚠ ${p.moduleId}: ${p.count} examples, all ${p.difficulties.join('/')}`);
    }
  } else {
    console.log('EXAMPLE PROGRESSION: All multi-example sections have difficulty spread.');
  }

  const trapIssues = checkTrapDensity(allSections);
  console.log('');
  if (trapIssues.length > 0) {
    console.log(`TRAP DENSITY (< 2 trapCards across all sections, ${trapIssues.length} found):`);
    for (const t of trapIssues) {
      console.log(`  ⚠ ${t.moduleId}: only ${t.trapCount} trapCard(s)`);
    }
  } else {
    console.log('TRAP DENSITY: All modules have adequate trap coverage.');
  }

  const decisionRuleIssues = checkDecisionRuleCoverage(allSections);
  console.log('');
  if (decisionRuleIssues.length > 0) {
    console.log(`DECISION-RULE GAPS (satPatterns tips without if/when/→, ${decisionRuleIssues.length} found):`);
    for (const d of decisionRuleIssues) {
      console.log(`  ⚠ ${d.moduleId}: satPatterns tip lacks decision-rule language`);
    }
  } else {
    console.log('DECISION RULES: All satPatterns tips contain decision-rule language.');
  }

  console.log('');

  const totalIssues = allBudgetViolations.length + headingDupes.length + textDupes.length;
  const totalPedagogicalWarnings = skeletonDupes.length + progressionIssues.length + trapIssues.length + decisionRuleIssues.length;

  console.log('═══════ SUMMARY ═══════');
  console.log(`Duplication/budget issues: ${totalIssues}`);
  console.log(`Pedagogical warnings:     ${totalPedagogicalWarnings}`);

  if (totalIssues === 0 && totalPedagogicalWarnings === 0) {
    console.log('\nALL CLEAR — no duplication, budget, or pedagogical issues found.');
  } else if (totalIssues === 0) {
    console.log(`\nPASS (duplication) with ${totalPedagogicalWarnings} pedagogical warnings.`);
  } else {
    console.log(`\nISSUES FOUND: ${totalIssues} duplication/budget + ${totalPedagogicalWarnings} pedagogical.`);
  }
  
  process.exit(totalIssues > 0 ? 1 : 0);
}

run();
