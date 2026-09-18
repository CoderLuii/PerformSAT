// Practice Tests Index
// Each test merges Reading & Writing modules followed by Math modules.

import { rebalanceAnswerKey } from '../questions/bank/rebalanceAnswerKey';
import { varyDifficultyOrder } from './varyDifficultyOrder';

// Math sections (file exports `practiceTestN`; alias to *Math here so the
// merged test can claim the public name).
import { practiceTest1 as practiceTest1Math } from './practiceTest1';
import { practiceTest2 as practiceTest2Math } from './practiceTest2';
import { practiceTest3 as practiceTest3Math } from './practiceTest3';
import { practiceTest4 as practiceTest4Math } from './practiceTest4';
import { practiceTest5 as practiceTest5Math } from './practiceTest5';
import { practiceTest6 as practiceTest6Math } from './practiceTest6';
import { practiceTest7 as practiceTest7Math } from './practiceTest7';
import { practiceTest8 as practiceTest8Math } from './practiceTest8';
import { practiceTest9 as practiceTest9Math } from './practiceTest9';
import { practiceTest10 as practiceTest10Math } from './practiceTest10';
import { practiceTest11 as practiceTest11Math } from './practiceTest11';
import { practiceTest12 as practiceTest12Math } from './practiceTest12';

// R&W sections — split from Math for modular authoring.
import { practiceTest1RW } from './practiceTest1RW';
import { practiceTest2RW } from './practiceTest2RW';
import { practiceTest3RW } from './practiceTest3RW';
import { practiceTest4RW } from './practiceTest4RW';
import { practiceTest5RW } from './practiceTest5RW';
import { practiceTest6RW } from './practiceTest6RW';
import { practiceTest7RW } from './practiceTest7RW';
import { practiceTest8RW } from './practiceTest8RW';
import { practiceTest9RW } from './practiceTest9RW';
import { practiceTest10RW } from './practiceTest10RW';
import { practiceTest11RW } from './practiceTest11RW';
import { practiceTest12RW } from './practiceTest12RW';

// Module 2 Easy variants — for adaptive routing.
// When a student scores below ~60% on Math Module 1, they receive these
// easier questions instead of the standard (Hard) Module 2.
import { practiceTest1M2Easy } from './practiceTest1M2Easy';
import { practiceTest2M2Easy } from './practiceTest2M2Easy';
import { practiceTest3M2Easy } from './practiceTest3M2Easy';
import { practiceTest4M2Easy } from './practiceTest4M2Easy';
import { practiceTest5M2Easy } from './practiceTest5M2Easy';
import { practiceTest6M2Easy } from './practiceTest6M2Easy';
import { practiceTest7M2Easy } from './practiceTest7M2Easy';
import { practiceTest8M2Easy } from './practiceTest8M2Easy';
import { practiceTest9M2Easy } from './practiceTest9M2Easy';
import { practiceTest10M2Easy } from './practiceTest10M2Easy';
import { practiceTest11M2Easy } from './practiceTest11M2Easy';
import { practiceTest12M2Easy } from './practiceTest12M2Easy';

// R&W Module 2 Easy variants — same adaptive contract as the math variants:
// score below ~60% on R&W Module 1 and the runner swaps these 27 questions
// into the R&W Module 2 slot.
import { practiceTest1RWM2Easy } from './practiceTest1RWM2Easy';
import { practiceTest2RWM2Easy } from './practiceTest2RWM2Easy';
import { practiceTest3RWM2Easy } from './practiceTest3RWM2Easy';
import { practiceTest4RWM2Easy } from './practiceTest4RWM2Easy';
import { practiceTest5RWM2Easy } from './practiceTest5RWM2Easy';
import { practiceTest6RWM2Easy } from './practiceTest6RWM2Easy';
import { practiceTest7RWM2Easy } from './practiceTest7RWM2Easy';
import { practiceTest8RWM2Easy } from './practiceTest8RWM2Easy';
import { practiceTest9RWM2Easy } from './practiceTest9RWM2Easy';
import { practiceTest10RWM2Easy } from './practiceTest10RWM2Easy';
import { practiceTest11RWM2Easy } from './practiceTest11RWM2Easy';
import { practiceTest12RWM2Easy } from './practiceTest12RWM2Easy';

const easyVariants = {
  'practice-test-1': practiceTest1M2Easy,
  'practice-test-2': practiceTest2M2Easy,
  'practice-test-3': practiceTest3M2Easy,
  'practice-test-4': practiceTest4M2Easy,
  'practice-test-5': practiceTest5M2Easy,
  'practice-test-6': practiceTest6M2Easy,
  'practice-test-7': practiceTest7M2Easy,
  'practice-test-8': practiceTest8M2Easy,
  'practice-test-9': practiceTest9M2Easy,
  'practice-test-10': practiceTest10M2Easy,
  'practice-test-11': practiceTest11M2Easy,
  'practice-test-12': practiceTest12M2Easy,
};

const rwEasyVariants = {
  'practice-test-1': practiceTest1RWM2Easy,
  'practice-test-2': practiceTest2RWM2Easy,
  'practice-test-3': practiceTest3RWM2Easy,
  'practice-test-4': practiceTest4RWM2Easy,
  'practice-test-5': practiceTest5RWM2Easy,
  'practice-test-6': practiceTest6RWM2Easy,
  'practice-test-7': practiceTest7RWM2Easy,
  'practice-test-8': practiceTest8RWM2Easy,
  'practice-test-9': practiceTest9RWM2Easy,
  'practice-test-10': practiceTest10RWM2Easy,
  'practice-test-11': practiceTest11RWM2Easy,
  'practice-test-12': practiceTest12RWM2Easy,
};

// Answer-key rebalance at assembly (2026-08-13 predictability fix). The
// on-disk math bundles skew B=56%/D=2.2% ("guess B" scored 56% on every
// test) and the R&W keys are hard-balanced into an anti-random pattern
// (adjacent repeat rate 9.4% vs the ~25% a real key shows). The same
// deterministic transform the drill bank has used since June is applied
// per-module here, seeded with test+section+module so (a) the reused ids
// 1-27 land in different slots on every test and (b) the slot layout is
// stable across sessions — a given test always renders the same letters,
// so attempt snapshots, review, and telemetry stay consistent.
// SAFETY: past attempts are unaffected — review renders from per-attempt
// snapshots, the legacy fallback keys off the CURRENT correct letter, and
// stored scores are never recomputed from current keys (verified 2026-08-13).
// Seeds carry a `:v2` suffix since the 2026-09-07 freshness rebuild so that
// returning students meet a new letter layout and a new M1/M2Easy order along
// with the re-authored content (docs/TEST_RECREATION_V2_SPEC.md).
const rebalanceModule = (m, seed) => ({
  ...m,
  questions: m.questions.map((q) => rebalanceAnswerKey(q, seed)),
});

// Build a full-length practice test from R&W + Math sections. R&W modules
// come first, Math modules follow. Module titles are numbered WITHIN their
// section (matching the official digital SAT), not continuously across the
// whole test — so the math modules are "Math Module 1/2", never "Module 3/4".
// Each module carries a `section` so the test session UI can switch between
// R&W layout (passage split, annotate tools) and Math layout (calculator,
// reference sheet) appropriately.
const buildFullTest = (id, title, rw, math) => {
  const rwModules = rw.modules.map((m, idx) => ({
    ...rebalanceModule(m, `${id}:rw:${idx}:v2`),
    section: 'reading-writing',
    title: `Reading and Writing Module ${idx + 1}`,
  }));
  // Math Module 1 additionally gets seeded difficulty-order variation: the
  // raw bundles share one EEEEE→M→H ramp across 11 of 12 tests (students
  // learn the rhythm). Module 2 hard is left alone — its sequences are
  // already genuinely varied on disk. R&W modules are NEVER reordered
  // (official vocab-first flow is authentic and position-meaningful).
  const mathModules = math.modules.map((m, idx) => ({
    ...rebalanceModule(
      idx === 0 ? varyDifficultyOrder(m, `${id}:math:${idx}:order:v2`) : m,
      `${id}:math:${idx}:v2`,
    ),
    section: 'math',
    title: `Math Module ${idx + 1}`,
  }));
  return {
    id,
    title,
    description: 'Full-length digital SAT practice test — Reading & Writing followed by Math.',
    totalQuestions:
      (rw.totalQuestions || rwModules.reduce((s, m) => s + m.questions.length, 0)) +
      (math.totalQuestions || mathModules.reduce((s, m) => s + m.questions.length, 0)),
    timePerModule: 32,
    modules: [...rwModules, ...mathModules],
  };
};

export const practiceTest1 = buildFullTest('practice-test-1', 'Practice Test 1', practiceTest1RW, practiceTest1Math);
export const practiceTest2 = buildFullTest('practice-test-2', 'Practice Test 2', practiceTest2RW, practiceTest2Math);
export const practiceTest3 = buildFullTest('practice-test-3', 'Practice Test 3', practiceTest3RW, practiceTest3Math);
export const practiceTest4 = buildFullTest('practice-test-4', 'Practice Test 4', practiceTest4RW, practiceTest4Math);
export const practiceTest5 = buildFullTest('practice-test-5', 'Practice Test 5', practiceTest5RW, practiceTest5Math);
export const practiceTest6 = buildFullTest('practice-test-6', 'Practice Test 6', practiceTest6RW, practiceTest6Math);
export const practiceTest7 = buildFullTest('practice-test-7', 'Practice Test 7', practiceTest7RW, practiceTest7Math);
export const practiceTest8 = buildFullTest('practice-test-8', 'Practice Test 8', practiceTest8RW, practiceTest8Math);
export const practiceTest9 = buildFullTest('practice-test-9', 'Practice Test 9', practiceTest9RW, practiceTest9Math);
export const practiceTest10 = buildFullTest('practice-test-10', 'Practice Test 10', practiceTest10RW, practiceTest10Math);
export const practiceTest11 = buildFullTest('practice-test-11', 'Practice Test 11', practiceTest11RW, practiceTest11Math);
export const practiceTest12 = buildFullTest('practice-test-12', 'Practice Test 12', practiceTest12RW, practiceTest12Math);

// Spread is intentional so the original test object stays untouched and
// the variants are added only on the exported copy used by the app.
// module2Easy = math M2 easy (legacy field name); rwModule2Easy = R&W M2 easy.
// Easy variants get the same seeded key rebalance as the standard modules
// (PT8's math M2Easy shipped 14-of-15 B before this).
const withEasyVariant = (t) => {
  const math = easyVariants[t.id];
  const rw = rwEasyVariants[t.id];
  if (!math && !rw) return t;
  // Math M2Easy also gets order variation — all 12 raw files share ONE
  // identical difficulty sequence, the single worst monotony in the audit.
  // R&W M2Easy keeps its official skill-flow order.
  return {
    ...t,
    ...(math
      ? {
          module2Easy: rebalanceModule(
            varyDifficultyOrder(math, `${t.id}:math-m2easy:order:v2`),
            `${t.id}:math-m2easy:v2`,
          ),
        }
      : {}),
    ...(rw ? { rwModule2Easy: rebalanceModule(rw, `${t.id}:rw-m2easy:v2`) } : {}),
  };
};

export const practiceTests = [
  practiceTest1,
  practiceTest2,
  practiceTest3,
  practiceTest4,
  practiceTest5,
  practiceTest6,
  practiceTest7,
  practiceTest8,
  practiceTest9,
  practiceTest10,
  practiceTest11,
  practiceTest12,
].map(withEasyVariant);

export const getPracticeTestById = (id) => {
  return practiceTests.find(test => test.id === id);
};

export const getAllPracticeTests = () => {
  return practiceTests;
};

export { practiceTest1RW };
