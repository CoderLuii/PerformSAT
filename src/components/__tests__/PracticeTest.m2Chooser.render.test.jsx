/**
 * Module 2 difficulty is chosen ONCE, on the module-complete screen after a
 * section's Module 1, and locks when the module begins (2026-09-07). This
 * mounts the live runner at that screen and pins: the chooser shows with the
 * routing recommendation, the Continue label follows the pick, and the
 * module itself renders with no in-module switcher.
 */
/* eslint-disable testing-library/no-unnecessary-act */
jest.mock('../../firebase/config', () => ({ auth: {}, db: {} }));
jest.mock('../../services/practiceTestService', () => ({
  loadAttemptSnapshot: jest.fn(), saveDiagnosticSittingSnapshot: jest.fn(), recordPracticeTestResult: jest.fn(),
  getReadyAiDiagnostic: jest.fn(), saveAttemptSnapshot: jest.fn().mockResolvedValue(undefined), SNAPSHOT_VERSION: 1,
  createAiDiagnosticArtifact: jest.fn().mockResolvedValue(null), completeAiDiagnosticArtifact: jest.fn(),
  failAiDiagnosticArtifact: jest.fn(), linkArtifactToAttempt: jest.fn(),
  generateAttemptId: jest.fn(() => `att-${Math.random().toString(36).slice(2, 8)}`),
}));
global.IS_REACT_ACT_ENVIRONMENT = true;
if (typeof Element !== 'undefined' && !Element.prototype.scrollTo) Element.prototype.scrollTo = () => {};

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import PracticeTest from '../PracticeTest';
import { practiceTests } from '../../data/practiceTests';
import { rawToScaled } from '../../services/scoring/scaleTables';

// The catalog entry carries the Easy variants (module2Easy / rwModule2Easy); the bare named export does not.
const practiceTest1 = practiceTests[0];

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}

const mathM1Index = practiceTest1.modules.findIndex(m => m.section === 'math');
const rwM1Index = practiceTest1.modules.findIndex(m => m.section === 'reading-writing');

/** Answers for every module up to and including `throughModule`; `mathHit` = fraction of math M1 answered correctly. */
function answersThrough(throughModule, { mathHit = 1 } = {}) {
  const answers = {};
  practiceTest1.modules.forEach((m, mi) => {
    if (mi > throughModule) return;
    m.questions.forEach((q, qi) => {
      const wrong = q.type === 'fill-in' ? '0' : (q.choices.find(c => c.id !== q.correctAnswer)?.id || 'A');
      const hit = mi === mathM1Index ? (qi / m.questions.length) < mathHit : true;
      answers[`${mi}-${qi}`] = hit ? q.correctAnswer : wrong;
    });
  });
  return answers;
}

function mountAtModuleComplete(currentModule, answers) {
  return mount(
    <PracticeTest
      test={practiceTest1}
      savedProgress={{ answers, currentModule, currentQuestion: 0, moduleCompleted: true }}
      isTimed={false}
      user={{ uid: 'u-m2', targetScore: 1300 }}
      practiceTestResults={{}}
      onBack={() => {}}
      onSaveProgress={() => {}}
    />
  );
}

const byText = (container, re) => [...container.querySelectorAll('button')].find(b => re.test(b.textContent));

describe('Module 2 chooser on the module-complete screen', () => {
  it('after Math Module 1 with a strong score: recommends Hard, lets the student pick Easy, then locks it in', () => {
    const { container, unmount } = mountAtModuleComplete(mathM1Index, answersThrough(mathM1Index, { mathHit: 1 }));
    try {
      expect(container.textContent).toContain('Choose your Module 2');
      const hard = byText(container, /^Module 2 \(Hard\)/);
      const easy = byText(container, /^Module 2 \(Easy\)/);
      expect(hard.textContent).toContain('Recommended');
      expect(easy.textContent).not.toContain('Recommended');
      expect(hard.getAttribute('aria-pressed')).toBe('true');
      expect(byText(container, /^Continue to Math Module 2 \(Hard\)/)).toBeTruthy();

      act(() => { easy.click(); });
      expect(easy.getAttribute('aria-pressed')).toBe('true');
      expect(byText(container, /^Continue to Math Module 2 \(Easy\)/)).toBeTruthy();

      act(() => { byText(container, /^Continue to Math Module 2 \(Easy\)/).click(); });
      // The module is live: a question is on screen, and there is no in-module switcher.
      expect(container.textContent).toMatch(/Question 1 of 22/);
      expect(container.textContent).not.toContain('Switch to');
      expect(container.textContent).not.toContain('Choose your Module 2');
      // The Easy variant's first question is the one on screen.
      expect(container.textContent).toContain(practiceTest1.module2Easy.questions[0].question.replace(/\$[^$]*\$/g, '').slice(0, 20).trim());
    } finally { unmount(); }
  });

  it('after Math Module 1 with a weak score: recommends Easy by default', () => {
    const { container, unmount } = mountAtModuleComplete(mathM1Index, answersThrough(mathM1Index, { mathHit: 0.3 }));
    try {
      const easy = byText(container, /^Module 2 \(Easy\)/);
      expect(easy.textContent).toContain('Recommended');
      expect(easy.getAttribute('aria-pressed')).toBe('true');
      expect(byText(container, /^Continue to Math Module 2 \(Easy\)/)).toBeTruthy();
    } finally { unmount(); }
  });

  it('after Reading and Writing Module 1: the same chooser, for the R&W variants', () => {
    const { container, unmount } = mountAtModuleComplete(rwM1Index, answersThrough(rwM1Index));
    try {
      expect(container.textContent).toContain('Choose your Module 2');
      expect(byText(container, /^Continue to Reading and Writing Module 2 \(Hard\)/)).toBeTruthy();
    } finally { unmount(); }
  });

  it('does not offer a choice after a Module 2 (nothing left to route)', () => {
    const { container, unmount } = mountAtModuleComplete(mathM1Index + 1, answersThrough(mathM1Index + 1));
    try {
      expect(container.textContent).not.toContain('Choose your Module 2');
    } finally { unmount(); }
  });
});

/** Pre-fill the Math Module 2 slot with every answer correct for the given variant's question set. */
function answerM2(answers, variantQuestions) {
  const slot = mathM1Index + 1;
  variantQuestions.forEach((q, qi) => { answers[`${slot}-${qi}`] = q.correctAnswer; });
  return answers;
}

async function finishTest(container) {
  // Header "End Test" opens the confirm modal; its destructive "End Test" button scores the test.
  act(() => { byText(container, /^End Test$/).click(); });
  const confirm = [...document.body.querySelectorAll('button')].filter(b => /^End Test$/.test(b.textContent)).pop();
  act(() => { confirm.click(); });
  // Completion runs on a yielded timer, then scores synchronously.
  await act(async () => { await new Promise(r => setTimeout(r, 150)); });
}

function mountAtMathM1Complete(answers, onSaveResult) {
  return mount(
    <PracticeTest
      test={practiceTest1}
      savedProgress={{ answers, currentModule: mathM1Index, currentQuestion: 0, moduleCompleted: true }}
      isTimed={false}
      user={{ uid: 'u-m2', targetScore: 1300 }}
      practiceTestResults={{}}
      onBack={() => {}}
      onSaveProgress={() => {}}
      onSaveResult={onSaveResult}
    />
  );
}

describe('the module the student takes is the module that is scored', () => {
  const mathM2Index = mathM1Index + 1;
  const hardM2 = practiceTest1.modules[mathM2Index].questions;
  const easyM2 = practiceTest1.module2Easy.questions;
  // Weak Module 1 (7 of 22) → routed to Easy. 7 + a perfect Module 2 (22) = raw 29 of 44 either way.
  const RAW = 7 + 22;

  it('routed Easy, chose Hard: Hard questions are served and graded, and the Hard curve scores the section', async () => {
    const onSaveResult = jest.fn();
    const answers = answerM2(answersThrough(mathM1Index, { mathHit: 0.3 }), hardM2);
    const { container, unmount } = mountAtMathM1Complete(answers, onSaveResult);
    try {
      expect(byText(container, /^Module 2 \(Easy\)/).textContent).toContain('Recommended');
      act(() => { byText(container, /^Module 2 \(Hard\)/).click(); });
      act(() => { byText(container, /^Continue to Math Module 2 \(Hard\)/).click(); });
      expect(container.textContent).toContain(hardM2[0].question.replace(/\$[^$]*\$/g, '').slice(0, 20).trim());
      await finishTest(container);
      expect(onSaveResult).toHaveBeenCalledTimes(1);
      const saved = onSaveResult.mock.calls[0][0];
      expect(saved.diagnosticData.mathRoute).toBe('hard');
      expect(saved.routeTaken).toBe('hard');
      expect(saved.moduleScores[mathM2Index].score).toBe(22);
      expect(saved.sectionScores.math).toBe(rawToScaled('math', RAW, 44, 'hard'));
      expect(saved.sectionScores.math).toBeGreaterThan(rawToScaled('math', RAW, 44, 'easy'));
    } finally { unmount(); }
  });

  it('routed Easy, kept Easy: Easy questions are served and graded, and the Easy curve (capped) scores the section', async () => {
    const onSaveResult = jest.fn();
    const answers = answerM2(answersThrough(mathM1Index, { mathHit: 0.3 }), easyM2);
    const { container, unmount } = mountAtMathM1Complete(answers, onSaveResult);
    try {
      act(() => { byText(container, /^Continue to Math Module 2 \(Easy\)/).click(); });
      expect(container.textContent).toContain(easyM2[0].question.replace(/\$[^$]*\$/g, '').slice(0, 20).trim());
      await finishTest(container);
      const saved = onSaveResult.mock.calls[0][0];
      expect(saved.diagnosticData.mathRoute).toBe('easy');
      expect(saved.routeTaken).toBe('easy');
      expect(saved.moduleScores[mathM2Index].score).toBe(22);
      expect(saved.sectionScores.math).toBe(rawToScaled('math', RAW, 44, 'easy'));
      expect(saved.sectionScores.math).toBeLessThanOrEqual(600);
    } finally { unmount(); }
  });
});
