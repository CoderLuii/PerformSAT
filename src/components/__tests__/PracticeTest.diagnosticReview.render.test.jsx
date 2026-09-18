/**
 * The review runner on a REBUILT diagnostic sitting (Home → View your
 * diagnosis → "Review every question"). The sitting comes from the exact
 * persistence round trip (buildQuestionsSnapshot → rebuildSittingTest) and
 * mounts PracticeTest the way App does for past-results review. Guards the
 * path no live account could reach yet (records predate the snapshot).
 */
jest.mock('../../firebase/config', () => ({ auth: {}, db: {} }));
jest.mock('../../services/practiceTestService', () => ({
  loadAttemptSnapshot: jest.fn(), saveDiagnosticSittingSnapshot: jest.fn(), recordPracticeTestResult: jest.fn(),
  getReadyAiDiagnostic: jest.fn(), saveAttemptSnapshot: jest.fn(), SNAPSHOT_VERSION: 1,
}));
global.IS_REACT_ACT_ENVIRONMENT = true;
// jsdom has no element.scrollTo; the live layout scrolls its panes on navigation.
if (typeof Element !== 'undefined' && !Element.prototype.scrollTo) Element.prototype.scrollTo = () => {};

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import PracticeTest from '../PracticeTest';
import { buildDiagnosticTest } from '../../services/miniDiagnostic/buildDiagnosticTest';
import { buildQuestionsSnapshot } from '../../services/miniDiagnostic/finishMiniDiagnostic';
import { rebuildSittingTest } from '../../services/diagnosticSittingLoader';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}

it('mounts the review runner on a rebuilt diagnostic sitting without throwing, for every module', async () => {
  const { test } = await buildDiagnosticTest({ userId: 'u-rev', attemptId: 'rev-1' });
  const answers = {};
  test.modules.forEach((m, mi) => m.questions.forEach((q, qi) => {
    if (qi % 4 !== 3) answers[`${mi}-${qi}`] = qi % 2 ? q.correctAnswer : (q.choices?.find((c) => c.id !== q.correctAnswer)?.id || 'A');
  }));
  const rebuilt = rebuildSittingTest({ isDiagnostic: true, testId: 'mini-diagnostic-v1', questionsSnapshot: buildQuestionsSnapshot(test), answers });
  expect(rebuilt.modules).toHaveLength(4);
  const errors = [];
  const origError = console.error;
  console.error = (...args) => { errors.push(args.map(String).join(' ')); };
  try {
    for (let mod = 0; mod < rebuilt.modules.length; mod += 1) {
      const { container, unmount } = mount(
        <PracticeTest
          test={rebuilt}
          savedProgress={{ answers }}
          initialReviewModule={mod}
          isTimed={false}
          user={{ uid: 'u-rev', targetScore: 1300 }}
          practiceTestResults={{}}
          reviewSnapshotMissing={false}
          reviewAttemptId="rev-1"
          onBack={() => {}}
        />
      );
      // The runner renders the module's questions in review mode.
      expect(container.textContent.length).toBeGreaterThan(200);
      unmount();
    }
  } finally {
    console.error = origError;
  }
  // Test-env noise only: the stubbed Firestore db makes the embedded tutor's
  // session loaders reject (they're fire-and-forget in the runner).
  const real = errors.filter((e) => !/act\(|ReactDOMTestUtils|Not implemented: HTMLCanvasElement|scrollIntoView|matchMedia|Failed to load (session|learning memory|recent sessions)/i.test(e));
  expect(real).toEqual([]);
});

describe('Bluebook-layout review (reviewLayout="bluebook")', () => {
  async function mountBluebook(extra = {}) {
    const { test } = await buildDiagnosticTest({ userId: 'u-bb', attemptId: 'bb-1' });
    const answers = {};
    test.modules.forEach((m, mi) => m.questions.forEach((q, qi) => {
      if (qi % 4 !== 3) answers[`${mi}-${qi}`] = qi % 2 ? q.correctAnswer : (q.choices?.find((c) => c.id !== q.correctAnswer)?.id || 'A');
    }));
    const rebuilt = rebuildSittingTest({ isDiagnostic: true, testId: 'mini-diagnostic-v1', questionsSnapshot: buildQuestionsSnapshot(test), answers });
    const onBack = jest.fn();
    const mounted = mount(
      <PracticeTest
        test={rebuilt}
        savedProgress={{ answers }}
        initialReviewModule={0}
        reviewLayout="bluebook"
        reviewBackLabel="Tests"
        isTimed={false}
        user={{ uid: 'u-bb', targetScore: 1300 }}
        practiceTestResults={{}}
        reviewAttemptId="bb-1"
        onBack={onBack}
        {...extra}
      />
    );
    return { ...mounted, rebuilt, answers, onBack };
  }
  const click = (el) => act(() => { el.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
  const byText = (container, sel, text) => [...container.querySelectorAll(sel)].find((el) => el.textContent.trim() === text);

  it('renders the live test screen read-only: tabs, marked choices, no clock, no tutor', async () => {
    const { container, unmount } = await mountBluebook();
    const shell = container.querySelector('.test-session-shell.is-review');
    expect(shell).toBeTruthy();
    expect(container.querySelectorAll('.review-module-tab')).toHaveLength(4);
    expect(container.querySelector('.review-module-tab.is-active').textContent).toContain('R&W M1');
    // Q1 was answered wrong: the pick is marked wrong, the key is marked correct.
    expect(container.querySelector('.answer-choice-card.is-correct')).toBeTruthy();
    expect(container.querySelector('.answer-choice-card.is-wrong')).toBeTruthy();
    expect(container.querySelector('.review-verdict-pill').textContent).toBe('Incorrect');
    // (Mark for Review stays in the DOM but is hidden by the .is-review stylesheet.)
    expect(container.textContent).not.toMatch(/Assisted Help|Ask me anything|Pause|Untimed Mode|End Test|Directions|Auto-Submit/);
    // Explanation is open by default; hiding is the secondary action and sticks across questions.
    expect(container.querySelector('.review-explanation')).toBeTruthy();
    click(byText(container, 'button', 'Hide explanation'));
    expect(container.querySelector('.review-explanation')).toBeNull();
    click([...container.querySelectorAll('button')].filter((b) => b.textContent.trim() === 'Next').pop());
    expect(container.querySelector('.review-explanation')).toBeNull();
    click(byText(container, 'button', 'Show explanation'));
    expect(container.querySelector('.review-explanation')).toBeTruthy();
    expect(byText(container, 'button', 'Tests')).toBeTruthy();
    // The tutor is on demand: absent until asked for, in a slide-over, closable.
    expect(container.querySelector('.review-tutor-panel')).toBeNull();
    click(byText(container, 'button', 'Ask the tutor'));
    expect(container.querySelector('.review-tutor-panel')).toBeTruthy();
    // We advanced one question above, so the panel is titled for Q2.
    expect(container.querySelector('.review-tutor-panel').textContent).toContain('Question 2');
    click(container.querySelector('.review-tutor-panel button[aria-label="Close chat"]'));
    expect(container.querySelector('.review-tutor-panel')).toBeNull();
    unmount();
  });

  it('shows the Premium note instead of the tutor when locked', async () => {
    const onSubscribe = jest.fn();
    const { container, unmount } = await mountBluebook({ tutorLocked: true, onSubscribe });
    click(byText(container, 'button', 'Ask the tutor'));
    expect(container.querySelector('.review-tutor-locked').textContent).toContain('Premium');
    click(byText(container, 'button', 'See plans'));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('Next crosses into the next module; Back on its first question returns; Done leaves', async () => {
    const { container, unmount, rebuilt, onBack } = await mountBluebook();
    const next = () => click([...container.querySelectorAll('button')].filter((b) => /^(Next|Done)$/.test(b.textContent.trim())).pop());
    const perModule = rebuilt.modules.map((m) => m.questions.length);
    for (let i = 0; i < perModule[0]; i += 1) next();
    expect(container.querySelector('.review-module-tab.is-active').textContent).toContain('R&W M2');
    expect(container.textContent).toContain('Question 1 of');
    click([...container.querySelectorAll('button')].filter((b) => b.textContent.trim() === 'Back').pop());
    expect(container.querySelector('.review-module-tab.is-active').textContent).toContain('R&W M1');
    expect(container.textContent).toContain(`Question ${perModule[0]} of ${perModule[0]}`);
    // Jump straight to the last module via its tab, walk to the end, Done → onBack.
    click(byText(container, 'button', [...container.querySelectorAll('.review-module-tab')].pop().textContent.trim()) || [...container.querySelectorAll('.review-module-tab')].pop());
    expect(container.querySelector('.review-module-tab.is-active').textContent).toContain('Math M2');
    for (let i = 0; i < perModule[3] - 1; i += 1) next();
    expect([...container.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Done')).toBe(true);
    next();
    expect(onBack).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('shows the answers-missing notice and Not answered when the sitting has no answers', async () => {
    const { test } = await buildDiagnosticTest({ userId: 'u-bb2', attemptId: 'bb-2' });
    const rebuilt = rebuildSittingTest({ isDiagnostic: true, testId: 'mini-diagnostic-v1', questionsSnapshot: buildQuestionsSnapshot(test), answers: {} });
    const { container, unmount } = mount(
      <PracticeTest test={rebuilt} savedProgress={{ answers: {} }} initialReviewModule={0} reviewLayout="bluebook" reviewAnswersMissing isTimed={false} user={{ uid: 'u-bb2' }} practiceTestResults={{}} reviewAttemptId="bb-2" onBack={() => {}} />
    );
    expect(container.querySelector('.review-notice').textContent).toContain('exact questions from your diagnostic');
    expect(container.querySelector('.review-verdict-pill').textContent).toBe('Not answered');
    expect(container.querySelector('.answer-choice-card.is-correct')).toBeTruthy();
    expect(container.querySelector('.answer-choice-card.is-wrong')).toBeNull();
    unmount();
  });
});
