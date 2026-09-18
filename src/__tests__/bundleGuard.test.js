/**
 * bundleGuard.test.js — CI guard for the bundle-split (Stage 2, risk 2).
 *
 * The question corpus (~9MB raw / ~1.5MB gz) ships as async chunks
 * (bank-math, bank-rw, practice-tests — see src/data/corpusLoader.js).
 * A single accidental STATIC import of a corpus module from any module in
 * the main-chunk graph silently re-welds the whole corpus into main and
 * undoes the split — with no test failure and no visible breakage.
 *
 * This test reads the source of the main-chunk modules most likely to
 * regress (App.jsx plus the eager services it imports, and the post-login
 * dashboard) and fails if any contains a top-level static import of a
 * corpus module.
 *
 * Allowed and NOT flagged:
 *   - dynamic `import('...')` (no whitespace after the keyword — the regex
 *     below requires whitespace, so loader calls never match)
 *   - the pure-constant split modules: data/questions/bank/aliases,
 *     data/questions/rwBank/taxonomy (Stage 2a)
 *   - services/selectors/todaySlice (Stage 2c)
 *   These end with different path segments, so the $-anchored patterns
 *   below cannot match them.
 */

import fs from 'fs';
import path from 'path';

const SRC = path.join(__dirname, '..');

// Main-chunk modules that must stay corpus-free. Paths relative to src/.
// hooks/useProgress.js is here because it was the leak Stage 2b actually
// found in the wild: its static hybridStudyPlanService import re-welded
// both banks into main through studyPlanGenerator.
const GUARDED_FILES = [
  'App.jsx',
  'hooks/useProgress.js',
  'services/sessionComplete.js',
  'services/diagnosticEngine.js',
  'services/predictionEngine.js',
  'components/StudentDashboard.jsx',
];

// Module specifiers (path-suffix anchored) that re-weld the corpus. The two
// service entries at the bottom are TRANSITIVE corpus carriers:
// studyPlanGenerator imports bank getQuestionById + the routing service, and
// hybridStudyPlanService imports studyPlanGenerator.
const FORBIDDEN_SPECIFIERS = [
  { name: 'data/questions/bank (math corpus)', pattern: /(?:^|\/)data\/questions\/bank$/ },
  { name: 'data/questions/mathTestBank (recreated math corpus)', pattern: /(?:^|\/)data\/questions\/mathTestBank$/ },
  { name: 'data/questions/rwBank (R&W corpus)', pattern: /(?:^|\/)data\/questions\/rwBank$/ },
  { name: 'data/practiceTests (test catalog)', pattern: /(?:^|\/)data\/practiceTests$/ },
  { name: 'data/questions (topic files)', pattern: /(?:^|\/)data\/questions$/ },
  { name: 'services/practiceAssignmentService (imports both banks)', pattern: /(?:^|\/)practiceAssignmentService$/ },
  { name: 'services/trySimilarService (imports both banks)', pattern: /(?:^|\/)trySimilarService$/ },
  { name: 'services/studyPlanGenerator (imports math bank + routing)', pattern: /(?:^|\/)studyPlanGenerator$/ },
  { name: 'services/hybridStudyPlanService (imports studyPlanGenerator)', pattern: /(?:^|\/)hybridStudyPlanService$/ },
];

/**
 * Extract every STATIC import specifier from a JS/JSX source string.
 * Matches `import X from '...'`, `import { a, b } from '...'` (including
 * multi-line bindings — the negated char class crosses newlines), and
 * side-effect `import '...'`. Does NOT match dynamic `import('...')`
 * because `\s+` requires whitespace after the `import` keyword.
 */
function staticImportSpecifiers(source) {
  const specifiers = [];
  const re = /(?:^|\n)\s*import\s+(?:[^'"]*?from\s+)?['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    specifiers.push(m[1]);
  }
  return specifiers;
}

describe('bundle guard — main chunk stays corpus-free', () => {
  GUARDED_FILES.forEach((relPath) => {
    test(`${relPath} has no static corpus imports`, () => {
      const source = fs.readFileSync(path.join(SRC, relPath), 'utf8');
      const specifiers = staticImportSpecifiers(source);
      const violations = [];
      specifiers.forEach((spec) => {
        FORBIDDEN_SPECIFIERS.forEach(({ name, pattern }) => {
          if (pattern.test(spec)) {
            violations.push(`'${spec}' — ${name}`);
          }
        });
      });
      expect(violations).toEqual([]); // use data/corpusLoader.js (dynamic) instead
    });
  });

  test('guard self-check: the regex catches a forbidden static import', () => {
    const bad = "import { getQuestionById } from '../data/questions/bank';\n";
    const specs = staticImportSpecifiers(bad);
    expect(specs).toEqual(['../data/questions/bank']);
    expect(FORBIDDEN_SPECIFIERS.some(({ pattern }) => pattern.test(specs[0]))).toBe(true);
  });

  test('guard self-check: dynamic imports and split constants are allowed', () => {
    const ok = [
      "const mod = await import('../data/questions/bank');",
      "import { SKILL_ALIAS_MAP } from '../data/questions/bank/aliases';",
      "import { getSkillSection } from '../data/questions/rwBank/taxonomy';",
      "import { getTodaySlice } from '../services/selectors/todaySlice';",
    ].join('\n');
    const specs = staticImportSpecifiers(ok);
    // The dynamic import must not be captured at all...
    expect(specs).not.toContain('../data/questions/bank');
    // ...and the constant/selector modules must not trip any pattern.
    specs.forEach((spec) => {
      expect(FORBIDDEN_SPECIFIERS.some(({ pattern }) => pattern.test(spec))).toBe(false);
    });
  });
});
