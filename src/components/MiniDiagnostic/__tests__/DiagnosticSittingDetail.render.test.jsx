/**
 * DiagnosticSittingDetail — the full diagnostic report rebuilt from a sitting
 * snapshot. Builds a REAL 40-item diagnostic sitting (buildDiagnosticTest →
 * buildQuestionsSnapshot → rebuildSittingTest, the exact persistence round
 * trip) and checks every numbered section renders off the real engine.
 */
jest.mock('../../../firebase/config', () => ({ auth: {}, db: {} }));
jest.mock('../../../services/practiceTestService', () => ({ loadAttemptSnapshot: jest.fn(), saveDiagnosticSittingSnapshot: jest.fn() }));

global.IS_REACT_ACT_ENVIRONMENT = true;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import DiagnosticSittingDetail, { buildSittingReport, formatSeconds } from '../DiagnosticSittingDetail';
import MiniDiagnosticResults from '../MiniDiagnosticResults';
import { buildDiagnosticTest } from '../../../services/miniDiagnostic/buildDiagnosticTest';
import { buildQuestionsSnapshot } from '../../../services/miniDiagnostic/finishMiniDiagnostic';
import { rebuildSittingTest } from '../../../services/diagnosticSittingLoader';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}

async function buildSitting() {
  const { test } = await buildDiagnosticTest({ userId: 'u-detail', attemptId: 'detail-1' });
  const answers = {};
  const questionDetails = {};
  test.modules.forEach((m, mi) => m.questions.forEach((q, qi) => {
    const key = `${mi}-${qi}`;
    const ok = ((mi * 7 + qi * 13) % 10) / 10 < 0.6;
    const blank = mi === 3 && qi === 9;
    if (!blank) answers[key] = ok ? q.correctAnswer : (q.choices?.find((c) => c.id !== q.correctAnswer)?.id || 'A');
    questionDetails[key] = {
      timeSpent: 40 + qi * 3, visits: 1, answerChanges: qi === 2 ? 1 : 0,
      answerChangeEvents: qi === 2 ? [{ from: 'A', to: 'B', timestamp: 1 }] : [],
      usedCalculator: mi >= 2 && qi % 3 === 0, markedForReview: qi % 5 === 0, eliminatedChoices: [],
      isCorrect: !blank && ok, difficulty: q.difficulty || null, skills: q.skills || [],
    };
  }));
  const snapshotDoc = {
    isDiagnostic: true, testId: 'mini-diagnostic-v1', diagnosticVariant: 'full',
    questionsSnapshot: buildQuestionsSnapshot(test),
    answers,
    diagnosticData: { questionDetails, navigationPattern: 'strategic-skip', totalNavigationEvents: 4, moduleTimeRemaining: { 0: 120, 1: 30, 2: 300, 3: 0 }, questionsVisitedMultipleTimes: 0, calculatorUsageCount: 4, markedForReviewCount: 8, mathRoute: 'hard', rwRoute: 'hard' },
  };
  return { test: rebuildSittingTest(snapshotDoc), answers, diagnosticData: snapshotDoc.diagnosticData, attemptId: 'detail-1' };
}

describe('buildSittingReport', () => {
  it('runs the engine on a snapshot round-trip and shapes every section', async () => {
    const sitting = await buildSitting();
    const r = buildSittingReport(sitting, { targetScore: 1300 });
    expect(r.questions).toHaveLength(40);
    expect(r.questions[0].label).toBe('R&W M1 Q1');
    expect(r.questions[39].label).toBe('Math M2 Q10');
    expect(r.questions.filter((q) => q.result === 'blank')).toHaveLength(1);
    expect(r.questions.some((q) => q.result === 'wrong' && q.errorType)).toBe(true);
    expect(r.table.sections.map((s) => s.section)).toEqual(['math', 'rw']);
    expect(r.table.sections.every((s) => s.domains.length > 0 && s.domains.every((d) => d.skills.length > 0))).toBe(true);
    expect(r.diag.errorPatterns.totalWrong).toBeGreaterThan(0);
    expect(r.blocks.some((b) => b.id === 'context')).toBe(true);
    expect(formatSeconds(65)).toBe('1m 05s');
    expect(formatSeconds(48)).toBe('48s');
  });
});

describe('DiagnosticSittingDetail', () => {
  it('renders all numbered sections and routes review clicks by module', async () => {
    const sitting = await buildSitting();
    const onReview = jest.fn();
    const { container, unmount } = mount(<DiagnosticSittingDetail sitting={sitting} user={{ targetScore: 1300 }} onReviewQuestions={onReview} />);
    const text = container.textContent;
    ['Your Diagnosis', 'Domains & Skills', 'Why You Missed What You Missed', 'How You Took the Test', 'By Difficulty', 'Every Question', 'Your Test-Taker Profile']
      .forEach((h) => expect(text).toContain(h));
    // Section numbers run ① … ⑦ in order.
    expect(text).toContain('Reading & Writing');
    expect(text).toContain('Clock left at the end of each module');
    expect(text).toContain('Skipped and came back');
    // The engine's scaled score never appears as a headline number.
    expect(text).not.toMatch(/Composite Score|Current Score/);
    // Domain rows expand to their skills.
    const domainBtn = container.querySelector('[data-testid="sitting-domain-skills"] button.ds-domain-row');
    act(() => { domainBtn.click(); });
    expect(domainBtn.getAttribute('aria-expanded')).toBe('true');
    // "Review every question" opens module 0; a table row opens its own module.
    const reviewAll = Array.from(container.querySelectorAll('button')).find((b) => b.textContent.includes('Review every question'));
    act(() => { reviewAll.click(); });
    expect(onReview).toHaveBeenLastCalledWith(0);
    const lastRow = Array.from(container.querySelectorAll('tbody tr')).pop();
    act(() => { lastRow.click(); });
    expect(onReview).toHaveBeenLastCalledWith(expect.any(Number));
    unmount();
  });

  it('mounts inside MiniDiagnosticResults when a sitting is ready, replacing the lean error bars', async () => {
    const sitting = await buildSitting();
    const record = { completedAt: '2026-08-24', scoreBand: { low: 1000, high: 1100, rwBand: { low: 500, high: 560 }, mathBand: { low: 500, high: 560 } }, totalCount: 40, answeredCount: 39, attemptId: 'detail-1', sittingSaved: true, diagnosis: { headline: 'h', keyInsight: null, errorPatterns: { counts: { careless_error: 2 }, totalWrong: 2 }, strengths: [], weaknesses: [] } };
    const { container, unmount } = mount(<MiniDiagnosticResults record={record} plan={null} user={{ targetScore: 1300 }} onViewPlan={() => {}} sitting={sitting} sittingStatus="ready" onReviewQuestions={() => {}} />);
    expect(container.textContent).toContain('Every Question');
    expect(container.textContent).not.toContain('Why you missed what you missed'); // lean block hidden
    unmount();
  });

  it('shows the legacy domain rows when the sitting is missing', () => {
    const record = { completedAt: '2026-08-01', scoreBand: { low: 1360, high: 1440, rwBand: { low: 740, high: 800 }, mathBand: { low: 600, high: 660 } }, totalCount: 40, domains: { rw: { 'craft-and-structure': { correct: 6, total: 6 } }, math: { algebra: { correct: 5, total: 8 } } } };
    const { container, unmount } = mount(<MiniDiagnosticResults record={record} plan={{ summary: {}, strengths: [], weaknesses: [] }} user={{ targetScore: 1550 }} onViewPlan={() => {}} sittingStatus="missing" />);
    const text = container.textContent;
    expect(text).toContain('By domain');
    expect(text).toContain('Algebra');
    expect(text).toContain('63%');
    expect(text).toContain('predates that');
    unmount();
  });
});
