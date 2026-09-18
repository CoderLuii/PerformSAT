/**
 * Math test bank — flattened from the 12 recreated math practice-test bundles
 * (`src/data/practiceTests/practiceTest{N}.js` M1+M2 plus the
 * `practiceTest{N}M2Easy.js` adaptive variants).
 *
 * The 2026-08/09 test recreation rebuilt every practice-test math item at the
 * official College Board register (docs/TEST_RECREATION_SPEC.md) with
 * independently re-derived answer keys. The diagnostic samples from THIS pool
 * so a student's first sitting serves that recreated content — the R&W side
 * already works exactly this way (`rwBank/index.js` flattens the R&W
 * bundles). The hand-authored drill bank (`../bank`) predates the recreation
 * bar and keeps serving Study Plan drills only.
 *
 * Namespaces IDs as `math-test{N}-{moduleId}-{originalId}` (bundle question
 * ids repeat 1..22 across every test and module, so the raw ids collide) and
 * derives each item's `domain` from its skills via the engine's own
 * `inferDomain` — bundle items carry `skills[]` but no per-item domain.
 *
 * Reached ONLY through `data/corpusLoader.js` dynamic imports (bundleGuard
 * contract) — never import this module statically from the main-chunk graph.
 */

import { practiceTest1 } from '../../practiceTests/practiceTest1';
import { practiceTest2 } from '../../practiceTests/practiceTest2';
import { practiceTest3 } from '../../practiceTests/practiceTest3';
import { practiceTest4 } from '../../practiceTests/practiceTest4';
import { practiceTest5 } from '../../practiceTests/practiceTest5';
import { practiceTest6 } from '../../practiceTests/practiceTest6';
import { practiceTest7 } from '../../practiceTests/practiceTest7';
import { practiceTest8 } from '../../practiceTests/practiceTest8';
import { practiceTest9 } from '../../practiceTests/practiceTest9';
import { practiceTest10 } from '../../practiceTests/practiceTest10';
import { practiceTest11 } from '../../practiceTests/practiceTest11';
import { practiceTest12 } from '../../practiceTests/practiceTest12';
import { practiceTest1M2Easy } from '../../practiceTests/practiceTest1M2Easy';
import { practiceTest2M2Easy } from '../../practiceTests/practiceTest2M2Easy';
import { practiceTest3M2Easy } from '../../practiceTests/practiceTest3M2Easy';
import { practiceTest4M2Easy } from '../../practiceTests/practiceTest4M2Easy';
import { practiceTest5M2Easy } from '../../practiceTests/practiceTest5M2Easy';
import { practiceTest6M2Easy } from '../../practiceTests/practiceTest6M2Easy';
import { practiceTest7M2Easy } from '../../practiceTests/practiceTest7M2Easy';
import { practiceTest8M2Easy } from '../../practiceTests/practiceTest8M2Easy';
import { practiceTest9M2Easy } from '../../practiceTests/practiceTest9M2Easy';
import { practiceTest10M2Easy } from '../../practiceTests/practiceTest10M2Easy';
import { practiceTest11M2Easy } from '../../practiceTests/practiceTest11M2Easy';
import { practiceTest12M2Easy } from '../../practiceTests/practiceTest12M2Easy';
import { inferDomain, SAT_MATH_DOMAINS } from '../../../services/scoring/domainInference';

export const MATH_TEST_DOMAINS = SAT_MATH_DOMAINS;

const MATH_TEST_SOURCES = [
  { num: 1,  main: practiceTest1,  easy: practiceTest1M2Easy  },
  { num: 2,  main: practiceTest2,  easy: practiceTest2M2Easy  },
  { num: 3,  main: practiceTest3,  easy: practiceTest3M2Easy  },
  { num: 4,  main: practiceTest4,  easy: practiceTest4M2Easy  },
  { num: 5,  main: practiceTest5,  easy: practiceTest5M2Easy  },
  { num: 6,  main: practiceTest6,  easy: practiceTest6M2Easy  },
  { num: 7,  main: practiceTest7,  easy: practiceTest7M2Easy  },
  { num: 8,  main: practiceTest8,  easy: practiceTest8M2Easy  },
  { num: 9,  main: practiceTest9,  easy: practiceTest9M2Easy  },
  { num: 10, main: practiceTest10, easy: practiceTest10M2Easy },
  { num: 11, main: practiceTest11, easy: practiceTest11M2Easy },
  { num: 12, main: practiceTest12, easy: practiceTest12M2Easy },
];

/** Valid MC (4 choices, answer matches a choice id) or grid-in (answer present). */
function hasServableShape(q) {
  if (q.type === 'fill-in') {
    return q.correctAnswer !== undefined && q.correctAnswer !== null && q.correctAnswer !== '';
  }
  if (q.type !== 'multiple-choice') return false;
  if (!Array.isArray(q.choices) || q.choices.length !== 4) return false;
  return q.choices.some((c) => c && String(c.id) === String(q.correctAnswer));
}

function flatten() {
  const out = [];
  let dropped = 0;

  for (const { num, main, easy } of MATH_TEST_SOURCES) {
    const modules = [
      ...(Array.isArray(main?.modules) ? main.modules : []),
      ...(easy ? [easy] : []),
    ];
    for (const module of modules) {
      if (!module || !Array.isArray(module.questions)) continue;
      const moduleId = module.id || 'module';
      for (const q of module.questions) {
        if (!q || !Array.isArray(q.skills) || !q.skills.length || !hasServableShape(q)) {
          dropped++;
          continue;
        }
        out.push({
          ...q,
          id: `math-test${num}-${moduleId}-${q.id}`,
          sourceTest: num,
          sourceModuleId: moduleId,
          sourceQuestionId: q.id,
          domain: inferDomain(q.skills),
          section: 'math',
          difficulty: q.difficulty || 'medium',
        });
      }
    }
  }

  return { items: out, dropped };
}

const { items: ALL_ITEMS, dropped: DROPPED_COUNT } = flatten();

const byId = new Map(ALL_ITEMS.map((q) => [q.id, q]));
const byDomain = new Map();
for (const q of ALL_ITEMS) {
  if (!byDomain.has(q.domain)) byDomain.set(q.domain, []);
  byDomain.get(q.domain).push(q);
}

/** Every flattened item (frozen order: test 1→12, M1 → M2 → M2Easy). */
export function getAllQuestions() {
  return ALL_ITEMS;
}

/**
 * All items whose derived domain matches (same surface as the drill banks'
 * getQuestionsByDomain, so the diagnostic builder swaps in transparently).
 *
 * @param {string} domain - one of MATH_TEST_DOMAINS
 * @returns {object[]} items (shared array — do not mutate)
 */
export function getQuestionsByDomain(domain) {
  return byDomain.get(domain) || [];
}

/**
 * Lookup by namespaced id (`math-test{N}-{moduleId}-{qId}`); used by the
 * diagnostic manifest rebuild on resume.
 *
 * @param {string} id
 * @returns {object|undefined}
 */
export function getQuestionById(id) {
  return byId.get(id);
}

/** Flatten stats, pinned by the bank test. */
export const MATH_TEST_BANK_SIZE = ALL_ITEMS.length;
export const MATH_TEST_BANK_DROPPED = DROPPED_COUNT;
