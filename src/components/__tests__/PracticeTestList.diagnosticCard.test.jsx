/**
 * PracticeTestList — the Diagnostic card that leads the list once a student
 * has a completed diagnostic record (progress.miniDiagnostic). It sits above
 * Digital SAT #1, never shows a scaled score, and re-opens the diagnosis.
 */
jest.mock('../../data/practiceTests', () => ({
  getAllPracticeTests: () => [
    { id: 'pt-1', modules: [{ section: 'reading-writing', timeLimit: 32, questions: [] }, { section: 'math', timeLimit: 35, questions: [] }] },
  ],
}));

global.IS_REACT_ACT_ENVIRONMENT = true;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import PracticeTestList from '../PracticeTestList';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}

const baseProps = {
  user: { targetScore: 1300 },
  practiceTestResults: {},
  onBack: () => {},
  getTestBestScore: () => null,
  getTestAttempts: () => 0,
  inProgressTests: {},
};

const record = { attemptId: 'diag-1', completedAt: '2026-08-22T15:00:00.000Z', totalCount: 40, answeredCount: 39, scoreBand: { low: 1360, high: 1440 } };

describe('PracticeTestList diagnostic card', () => {
  test('leads the list above Digital SAT #1 and opens the diagnosis on click', () => {
    const onViewDiagnosis = jest.fn();
    const { container, unmount } = mount(<PracticeTestList {...baseProps} miniDiagnostic={record} onViewDiagnosis={onViewDiagnosis} />);
    const list = container.querySelector('.pt-list');
    const first = list.firstElementChild;
    expect(first.classList.contains('is-diagnostic')).toBe(true);
    expect(first.textContent).toContain('Diagnostic');
    expect(first.textContent).toContain('40 questions');
    expect(first.textContent).toContain('Aug 22');
    // Never a scaled score / band on the card.
    expect(first.textContent).not.toMatch(/1360|1440|TOTAL/);
    // The practice tests still follow.
    expect(list.children[1].textContent).toContain('Digital SAT #1');
    act(() => { first.querySelector('.pt-btn').click(); });
    expect(onViewDiagnosis).toHaveBeenCalledTimes(1);
    unmount();
  });

  test('absent without a diagnostic record or without a handler', () => {
    const a = mount(<PracticeTestList {...baseProps} miniDiagnostic={null} onViewDiagnosis={() => {}} />);
    expect(a.container.querySelector('.pt-card.is-diagnostic')).toBeNull();
    a.unmount();
    const b = mount(<PracticeTestList {...baseProps} miniDiagnostic={record} />);
    expect(b.container.querySelector('.pt-card.is-diagnostic')).toBeNull();
    b.unmount();
  });

  test('"Review answers" appears once the sitting snapshot is ready and opens the review', () => {
    const onReview = jest.fn();
    const ready = mount(<PracticeTestList {...baseProps} miniDiagnostic={record} onViewDiagnosis={() => {}} diagnosticReviewStatus="ready" onReviewDiagnosticQuestions={onReview} />);
    const btn = [...ready.container.querySelectorAll('.pt-card.is-diagnostic .pt-btn')].find((b) => b.textContent.trim() === 'Review answers');
    expect(btn).toBeTruthy();
    expect(btn.disabled).toBe(false);
    act(() => { btn.click(); });
    expect(onReview).toHaveBeenCalledTimes(1);
    ready.unmount();

    const loading = mount(<PracticeTestList {...baseProps} miniDiagnostic={record} onViewDiagnosis={() => {}} diagnosticReviewStatus="loading" onReviewDiagnosticQuestions={onReview} />);
    const pending = [...loading.container.querySelectorAll('.pt-card.is-diagnostic .pt-btn')].find((b) => b.textContent.trim() === 'Review answers');
    expect(pending.disabled).toBe(true);
    loading.unmount();

    // Legacy record with no snapshot → no review button, diagnosis still opens.
    const missing = mount(<PracticeTestList {...baseProps} miniDiagnostic={record} onViewDiagnosis={() => {}} diagnosticReviewStatus="missing" onReviewDiagnosticQuestions={onReview} />);
    expect(missing.container.querySelector('.pt-card.is-diagnostic').textContent).not.toContain('Review answers');
    expect(missing.container.querySelector('.pt-card.is-diagnostic').textContent).toContain('View diagnosis');
    missing.unmount();
  });

  test('labels a check-in variant', () => {
    const { container, unmount } = mount(<PracticeTestList {...baseProps} miniDiagnostic={{ ...record, diagnosticVariant: 'checkin' }} onViewDiagnosis={() => {}} />);
    expect(container.querySelector('.pt-card.is-diagnostic').textContent).toContain('Check-in');
    unmount();
  });
});
