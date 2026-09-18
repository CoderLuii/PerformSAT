/**
 * OnboardingFunnel render + interaction smoke tests.
 *
 * No RTL in this repo — mount with react-dom/client + act (the
 * StudyPlanDashboard.render.test.jsx convention). Covers: the name step
 * opens the flow, tapping an option advances (fake timers — the tap
 * animation delay), state persists to sessionStorage for same-visit reload-resume,
 * the build interlude auto-advances to the path reveal, every step
 * renders emoji-free, and the signup step hands buildFunnelProfile
 * output (+ the staged name) to the signup callback then clears staging.
 */

global.IS_REACT_ACT_ENVIRONMENT = true;

// Funnel analytics transport: mocked so tests pin event names + the
// capture-before-signup ordering (the Stripe redirect races a late flush).
jest.mock('../../../services/posthogClient', () => ({
  phCapture: jest.fn(),
}));

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import OnboardingFunnel from '../OnboardingFunnel';
import { phCapture } from '../../../services/posthogClient';
import {
  FUNNEL_QUESTIONS,
  FUNNEL_STEPS,
  FUNNEL_STORAGE_KEY,
  FUNNEL_STORAGE_VERSION,
} from '../funnelConfig';
import { trialEndDateLabel } from '../../../services/pricing';

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

const noop = () => {};

let container;
let root;

const mount = (props = {}) => {
  act(() => {
    root.render(
      <OnboardingFunnel
        signup={props.signup || jest.fn(() => Promise.resolve())}
        onExit={props.onExit || noop}
        onLogIn={props.onLogIn || noop}
        billingLive={props.billingLive ?? false}
      />
    );
  });
};

const seedStep = (stepIndex, extra = {}) => {
  window.sessionStorage.setItem(
    FUNNEL_STORAGE_KEY,
    JSON.stringify({ version: FUNNEL_STORAGE_VERSION, stepIndex, answers: {}, name: '', goal: 1400, ...extra })
  );
};

// React 18 reads inputs through the value tracker — set via the native
// setter so the change event isn't swallowed as a no-op.
const setInput = (input, value) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

beforeEach(() => {
  jest.useFakeTimers();
  window.sessionStorage.clear();
  window.scrollTo = jest.fn();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

test('opens on the name step and personalizes the continue button', () => {
  mount();
  expect(container.textContent).toContain('What should we call you?');
  act(() => {
    setInput(container.querySelector('.of-name-input'), 'Maya');
  });
  expect(container.querySelector('.of-cta').textContent).toContain('Maya');
});

test('continuing past the name step lands on the first question with 4 options and a chapter eyebrow', () => {
  mount();
  act(() => {
    container.querySelector('form.of-form--name').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  expect(container.textContent).toContain(FUNNEL_QUESTIONS[0].title);
  expect(container.querySelectorAll('.of-option')).toHaveLength(4);
  expect(container.querySelector('.of-eyebrow').textContent).toContain('Your test');
});

test('tapping an option advances to the next question and stages the answer', () => {
  seedStep(1);
  mount();
  const first = container.querySelector('.of-option');
  act(() => {
    first.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  act(() => {
    jest.advanceTimersByTime(500);
  });
  expect(container.textContent).toContain(FUNNEL_QUESTIONS[1].title);
  const staged = JSON.parse(window.sessionStorage.getItem(FUNNEL_STORAGE_KEY));
  expect(staged.stepIndex).toBe(2);
  expect(staged.answers.timing).toBe(FUNNEL_QUESTIONS[0].options[0].value);
});

test('resumes from staged localStorage state (name included)', () => {
  seedStep(2, { name: 'Maya' });
  mount();
  expect(container.textContent).toContain(FUNNEL_QUESTIONS[1].title);
});

test('the build interlude checks rows in on a beat then auto-advances to the path reveal', () => {
  const buildIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'build');
  seedStep(buildIdx, { name: 'Maya', answers: { timing: '2to6m' }, goal: 1450 });
  mount();
  expect(container.textContent).toContain('Assembling your plan');
  expect(container.textContent).toContain('Maya');
  expect(container.textContent).toContain('1450');
  expect(container.querySelectorAll('.of-build-line.is-done')).toHaveLength(0);
  act(() => {
    jest.advanceTimersByTime(2 * 650 + 10);
  });
  expect(container.querySelectorAll('.of-build-line.is-done')).toHaveLength(2);
  act(() => {
    jest.advanceTimersByTime(4 * 650 + 900);
  });
  expect(container.textContent).toContain('this is exactly what SEVA was built for');
});

test('ack line responds to the previous answer on question screens (tutor thread)', () => {
  const baselineIdx = FUNNEL_STEPS.findIndex((s) => s.id === 'baseline');
  seedStep(baselineIdx, { answers: { timing: 'lt2m' } });
  mount();
  expect(container.querySelector('.of-ack').textContent).toContain('Under two months');
});

test('no ack directly after an interstitial (double-ack rule)', () => {
  const stuckIdx = FUNNEL_STEPS.findIndex((s) => s.id === 'stuckHabit');
  // The reassure interstitial precedes stuckHabit and already reflected the
  // feeling answer — the screen must NOT acknowledge again.
  seedStep(stuckIdx, { answers: { timing: 'lt2m', baseline: 'sat', feeling: 'stressed' } });
  mount();
  expect(container.querySelector('.of-ack')).toBeNull();
});

test('the goal screen carries the commitment ack (the only reflection of the flow\'s loudest yes)', () => {
  const goalIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'goal');
  seedStep(goalIdx, { answers: { commitment: 'allin' } });
  mount();
  expect(container.querySelector('.of-ack').textContent).toContain('Twenty focused minutes');
});

test('interstitials adapt to the answers already given', () => {
  const rmIdx = FUNNEL_STEPS.findIndex((s) => s.id === 'rightMinutes');
  seedStep(rmIdx, { answers: { sessionLength: '60m' } });
  mount();
  expect(container.textContent).toContain('An hour is a weapon');
});

test('a session-length answer grows the build interlude to 5 rows and stretches the beat', () => {
  const buildIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'build');
  seedStep(buildIdx, { name: 'Maya', answers: { timing: '2to6m', sessionLength: '30m', studyWindow: 'evening' }, goal: 1450 });
  mount();
  expect(container.querySelectorAll('.of-build-line')).toHaveLength(5);
  expect(container.textContent).toContain('Sizing sessions to around half an hour, evenings');
  // 4-line timing would already have advanced by now; 5 lines must not have.
  act(() => { jest.advanceTimersByTime(4 * 650 + 900); });
  expect(container.textContent).toContain('Assembling your plan');
  act(() => { jest.advanceTimersByTime(650 + 10); });
  expect(container.textContent).toContain('this is exactly what SEVA was built for');
});

test('the path screen recaps the answers once, with the goal number owned by the chip alone', () => {
  const pathIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'path');
  seedStep(pathIdx, {
    goal: 1510,
    answers: { timing: 'lt2m', sessionLength: '15m', studyWindow: 'evening', blocker: 'plateau' },
  });
  mount();
  expect(container.textContent).toContain('Built from your answers');
  expect(container.textContent).toContain('About 15 focused minutes, evenings');
  expect(container.textContent).toContain('Break the plateau');
  expect(container.textContent).toContain('That is the fix for a stuck score.');
  expect(container.textContent).not.toContain('path to 1510');
  // The goal number renders exactly once (the chip).
  expect(container.textContent.split('1510')).toHaveLength(2);
});

test('a recap-less student keeps the current path body line (fallback)', () => {
  const pathIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'path');
  seedStep(pathIdx, { goal: 1400, answers: {} });
  mount();
  expect(container.textContent).toContain('path to 1400');
  expect(container.querySelector('.of-recap')).toBeNull();
});

test('billing signup shows the computed payer trust date (local date parts)', () => {
  jest.setSystemTime(new Date(2026, 7, 14, 22, 30));
  const signupIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'signup');
  seedStep(signupIdx, { answers: { timing: 'lt2m' } });
  mount({ billingLive: true });
  expect(container.textContent).toContain(`not charged before ${trialEndDateLabel(new Date(2026, 7, 14))}`);
  expect(container.textContent).toContain('not charged before Aug 17');
});

test('analytics: fresh entry fires funnel_started; resume does not; steps are tracked', () => {
  mount();
  expect(phCapture).toHaveBeenCalledWith('funnel_started', expect.objectContaining({ copyVariant: 'personal-v1' }));
  expect(phCapture).toHaveBeenCalledWith('funnel_step_viewed', expect.objectContaining({ step: 'name', index: 0 }));
  phCapture.mockClear();
  act(() => root.unmount());
  root = createRoot(container);
  seedStep(3, { answers: { timing: 'lt2m', baseline: 'sat' } });
  mount();
  expect(phCapture).not.toHaveBeenCalledWith('funnel_started', expect.anything());
  expect(phCapture).toHaveBeenCalledWith('funnel_step_viewed', expect.objectContaining({ step: 'feeling', index: 3 }));
});

test('analytics: funnel_signup_submitted fires BEFORE the signup promise (redirect-race guard)', async () => {
  const order = [];
  phCapture.mockImplementation((name) => order.push(name));
  const signup = jest.fn(() => { order.push('signup()'); return Promise.resolve(); });
  const signupIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'signup');
  seedStep(signupIdx, { name: 'Maya', answers: { timing: 'lt2m' } });
  mount({ signup });
  act(() => {
    setInput(container.querySelector('input[type="email"]'), 'maya@example.com');
    setInput(container.querySelector('input[type="password"]'), 'secret123');
  });
  const consent = container.querySelector('.of-consent input[type="checkbox"]');
  act(() => { consent.click(); });
  await act(async () => {
    container.querySelector('form.of-form:not(.of-form--name)').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  const submitIdx = order.indexOf('funnel_signup_submitted');
  const signupIdx2 = order.indexOf('signup()');
  expect(submitIdx).toBeGreaterThanOrEqual(0);
  expect(signupIdx2).toBeGreaterThan(submitIdx);
});

test('back from the path step skips over the build interlude to the goal slider', () => {
  const pathIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'path');
  seedStep(pathIdx);
  mount();
  act(() => {
    container.querySelector('.of-back').dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(container.textContent).toContain('Set your target score.');
});

test('every step renders without throwing and without emojis', () => {
  for (let i = 0; i < FUNNEL_STEPS.length; i++) {
    seedStep(i, { answers: { feeling: 'stressed', timing: '2to6m' }, name: 'Maya' });
    const stepContainer = document.createElement('div');
    document.body.appendChild(stepContainer);
    const stepRoot = createRoot(stepContainer);
    act(() => {
      stepRoot.render(
        <OnboardingFunnel signup={noop} onExit={noop} onLogIn={noop} billingLive={false} />
      );
    });
    expect(stepContainer.textContent.length).toBeGreaterThan(0);
    expect(stepContainer.textContent).not.toMatch(EMOJI_RE);
    expect(stepContainer.textContent).not.toMatch(/acely/i);
    act(() => stepRoot.unmount());
    stepContainer.remove();
  }
});

test('signup step shows the creator-discount note only for referred visitors with billing live', () => {
  const signupIndex = FUNNEL_STEPS.findIndex((s) => s.type === 'signup');
  seedStep(signupIndex, { answers: { timing: '2to6m' }, name: 'Maya' });

  // No stored referral: no note.
  mount({ billingLive: true });
  expect(container.textContent).not.toContain('Creator discount');

  // Stored referral + billing live: the note pins the promised terms.
  window.localStorage.setItem('seva:ref', JSON.stringify({ slug: 'iksha', at: Date.now() }));
  mount({ billingLive: true });
  expect(container.textContent).toContain(
    'Creator discount: 20% off your first 3 months — applied automatically at checkout.'
  );

  // Billing dark: never promise a discount checkout can't apply.
  mount({ billingLive: false });
  expect(container.textContent).not.toContain('Creator discount');
  window.localStorage.removeItem('seva:ref');
});

test('back on the first step exits to the landing page', () => {
  const onExit = jest.fn();
  mount({ onExit });
  act(() => {
    container.querySelector('.of-back').dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(onExit).toHaveBeenCalled();
});

test('signup step pre-fills the staged name and submits the funnel profile, clearing staging on success', async () => {
  const signup = jest.fn(() => Promise.resolve());
  const signupIndex = FUNNEL_STEPS.findIndex((s) => s.type === 'signup');
  seedStep(signupIndex, { answers: { timing: '2to6m', baseline: 'sat' }, goal: 1450, name: 'Maya' });
  mount({ signup });

  const inputs = container.querySelectorAll('.of-field input');
  expect(inputs[0].value).toBe('Maya'); // pre-filled from the name step
  act(() => {
    setInput(inputs[1], 'maya@example.com'); // email
    setInput(inputs[2], 'hunter22'); // password
  });
  const consent = container.querySelector('.of-consent input');
  act(() => {
    consent.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await act(async () => {
    container.querySelector('form.of-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  expect(signup).toHaveBeenCalledTimes(1);
  const [email, password, firstName, additionalInfo] = signup.mock.calls[0];
  expect(email).toBe('maya@example.com');
  expect(password).toBe('hunter22');
  expect(firstName).toBe('Maya');
  expect(additionalInfo.agreedToTerms).toBe(true);
  expect(additionalInfo.hasTakenSAT).toBe(true); // baseline 'sat'
  expect(additionalInfo.funnelProfile.targetScore).toBe(1450);
  expect(additionalInfo.funnelProfile.goalScale).toBe('composite');
  expect(additionalInfo.funnelProfile.onboardingProfile.answers).toEqual({ timing: '2to6m', baseline: 'sat' });
  // Staged state is consumed — a later visitor starts fresh.
  expect(window.sessionStorage.getItem(FUNNEL_STORAGE_KEY)).toBeNull();
});

test('signup without consent shows the guard error and never calls signup', async () => {
  const signup = jest.fn(() => Promise.resolve());
  const signupIndex = FUNNEL_STEPS.findIndex((s) => s.type === 'signup');
  seedStep(signupIndex);
  mount({ signup });

  await act(async () => {
    container.querySelector('form.of-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  expect(signup).not.toHaveBeenCalled();
  expect(container.textContent).toContain('13 or older');
});
