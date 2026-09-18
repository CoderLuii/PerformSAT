/**
 * InnerOnboarding render + flow smoke tests.
 *
 * No RTL in this repo — mount with react-dom/client + act (the
 * OnboardingFunnel.render.test.jsx convention). Covers: feeling + goal arrive
 * PRE-FILLED from the user doc, tap-to-advance questions advance (fake timers
 * for the tap delay), per-screen skip links advance without setting a value,
 * every step renders emoji-free, and finishing hands the collected profile to
 * onComplete with the expected shape.
 */

global.IS_REACT_ACT_ENVIRONMENT = true;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import InnerOnboarding from '../InnerOnboarding';

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const noop = () => {};

let container;
let root;

const USER = {
  firstName: 'Sam',
  targetScore: 1450,
  onboardingProfile: { answers: { feeling: 'stressed' } },
};

const mount = (props = {}) => {
  act(() => {
    root.render(
      <InnerOnboarding
        user={props.user || USER}
        onComplete={props.onComplete || noop}
      />
    );
  });
};

const flush = () => { act(() => { jest.advanceTimersByTime(250); }); };

// Click the first button whose trimmed text starts with `text`, then flush
// the guarded-advance timer (every CTA/skip defers goNext ~60ms so a
// double-tap can never skip a screen).
const clickByText = (selector, text) => {
  const el = [...container.querySelectorAll(selector)]
    .find((b) => b.textContent.trim().startsWith(text));
  if (!el) throw new Error(`no ${selector} matching "${text}"`);
  act(() => { el.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
  flush();
};

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

test('opens on the feeling step with the funnel answer pre-selected', () => {
  mount();
  expect(container.textContent).toContain("where's your head at with the SAT");
  const selected = container.querySelector('.io-option.is-selected');
  expect(selected).toBeTruthy();
  expect(selected.textContent).toContain('Stressed when I think about it');
});

test('tapping feeling advances to the exam-date step', () => {
  mount();
  clickByText('.io-option', "It's genuinely weighing on me");
  flush();
  expect(container.textContent).toContain('locked in a test date');
});

test('goal step is pre-filled from the user target score', () => {
  mount();
  clickByText('.io-option', 'Confident'); flush();          // feeling -> exam date
  clickByText('.io-skip', "I haven't registered yet");         // exam date -> current score
  clickByText('.io-skip', "I haven't tested yet");       // current score -> goal
  expect(container.querySelector('.io-goal-readout').textContent).toBe('1450');
});

test('walks to the end and reports the collected profile', () => {
  const onComplete = jest.fn();
  mount({ onComplete });

  clickByText('.io-option', 'Confident'); flush();           // 0 feeling
  clickByText('.io-skip', "I haven't registered yet");          // 1 exam date (skip)
  clickByText('.io-skip', "I haven't tested yet");        // 2 current score (skip)
  clickByText('.io-cta', 'Continue');                         // 3 goal -> interlude
  clickByText('.io-cta', 'Keep going');                       // 4 interlude -> confident
  clickByText('.io-option', 'Math'); flush();                 // 5 confident = math
  clickByText('.io-option', 'Reading and Writing'); flush();  // 6 worry = rw
  clickByText('.io-option', 'Algebra'); flush();              // 7 math areas: toggle
  clickByText('.io-option', 'Geometry and trig'); flush();    //   second toggle
  clickByText('.io-cta', 'Continue');                         //   confirm set
  clickByText('.io-cta', 'Not sure yet, skip');               // 8 rw areas skipped
  clickByText('.io-chip', '4 days'); flush();                 // 9 study days
  const year = String(new Date().getFullYear() + 2);
  clickByText('.io-chip', year); flush();                     // 10 grad year
  clickByText('.io-cta', 'Take me to my diagnostic');         // 11 finish

  expect(onComplete).toHaveBeenCalledTimes(1);
  const payload = onComplete.mock.calls[0][0];
  expect(payload.feeling).toBe('confident');       // edited from the pre-fill
  expect(payload.targetScore).toBe(1450);
  expect(payload.confidentArea).toBe('math');
  expect(payload.worryArea).toBe('rw');
  expect(payload.weakMathAreas).toEqual(['algebra', 'geometry']);
  expect(payload.weakRWAreas).toBeUndefined();      // skipped
  expect(payload.studyDaysPerWeek).toBe(4);
  expect(payload.gradYear).toBe(new Date().getFullYear() + 2);
  expect(payload.testDate).toBeUndefined();         // skipped
  expect(payload.currentScore).toBeUndefined();     // skipped
});

test('continuity: screens fold the funnel answers in (confirm on S0, timing on S1, baseline question on S2)', () => {
  const user = {
    firstName: 'Sam',
    targetScore: 1450,
    onboardingProfile: { answers: { feeling: 'heavy', timing: 'lt2m', baseline: 'sat', blocker: 'plateau', studyWindow: 'weekend' } },
  };
  mount({ user });
  expect(container.textContent).toContain('Earlier you said this was weighing on you');
  clickByText('.io-option', "It's genuinely weighing on me");
  expect(container.textContent).toContain('a test inside two months');
  clickByText('.io-skip', "I haven't registered yet");
  // The score question itself changed with the baseline.
  expect(container.textContent).toContain('What did the real SAT give you?');
  expect(container.textContent).toContain('Your official score aims the plan exactly');
});

test('legacy account without funnel answers keeps every generic body (no undefined, no blanks)', () => {
  mount({ user: { firstName: 'Sam', targetScore: 1400 } });
  expect(container.textContent).toContain('No wrong answer. It just helps us set the tone.');
  clickByText('.io-option', 'Confident');
  expect(container.textContent).toContain("Nothing's final here. You can change it whenever.");
  clickByText('.io-skip', "I haven't registered yet");
  expect(container.textContent).toContain('Have you taken the SAT or a full practice test?');
  expect(container.textContent).not.toContain('undefined');
});

test('fresh starter: skip is the PRIMARY action on the score screen and clears typed digits', () => {
  const onComplete = jest.fn();
  const user = {
    firstName: 'Sam',
    targetScore: 1400,
    onboardingProfile: { answers: { feeling: 'confident', baseline: 'fresh' } },
  };
  mount({ user, onComplete });
  clickByText('.io-option', 'Confident');
  clickByText('.io-skip', "I haven't registered yet");
  expect(container.textContent).toContain("No scores yet, and that's fine.");
  const primary = container.querySelector('.io-cta');
  expect(primary.textContent).toContain('Skip, the diagnostic will find it');
  expect(primary.disabled).toBe(false);
  // Type a score, then skip anyway — the digits must not survive.
  const input = container.querySelector('.io-score-input');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  act(() => {
    setter.call(input, '1100');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  clickByText('.io-cta', 'Skip, the diagnostic will find it');
  expect(container.querySelector('.io-goal-readout')).toBeTruthy();
  // Goal runway shows the no-score baseline, not the abandoned 1100.
  expect(container.textContent).toContain('Start 400');
});

test('double-click on a Continue CTA advances exactly one screen (guard regression)', () => {
  mount();
  clickByText('.io-option', 'Confident'); // -> exam date
  const skip = [...container.querySelectorAll('.io-skip')]
    .find((b) => b.textContent.includes("I haven't registered yet"));
  act(() => {
    skip.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    skip.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  flush();
  // One advance only: the score screen, not the goal screen.
  expect(container.textContent).toContain('Have you taken the SAT or a full practice test?');
  expect(container.querySelector('.io-goal-readout')).toBeNull();
});

test('the finish screen previews the starter plan from the student\'s own picks', () => {
  mount();
  clickByText('.io-option', 'Confident');
  clickByText('.io-skip', "I haven't registered yet");
  clickByText('.io-skip', "I haven't tested yet");
  clickByText('.io-cta', 'Continue');                      // goal 1450
  clickByText('.io-cta', 'Keep going');
  clickByText('.io-option', 'Math');
  clickByText('.io-option', 'Reading and Writing');        // worry = rw
  // Worry=rw renders the bridge on the math screen and the flagged line on R&W.
  expect(container.textContent).toContain('Math first to cover it quickly');
  clickByText('.io-option', 'Algebra');
  clickByText('.io-cta', 'Continue');
  expect(container.textContent).toContain('This is the area you flagged');
  clickByText('.io-option', 'Grammar and punctuation');
  clickByText('.io-cta', 'Continue');
  clickByText('.io-chip', '5 days');
  clickByText('.io-chip', String(new Date().getFullYear() + 1));
  expect(container.textContent).toContain('Your starter plan: 5 days a week, opening with algebra and grammar, aimed at 1450.');
  expect(container.textContent).not.toContain('undefined');
});

test('every step renders emoji-free', () => {
  mount();
  const steps = [
    () => clickByText('.io-option', 'Confident'),
    () => clickByText('.io-skip', "I haven't registered yet"),
    () => clickByText('.io-skip', "I haven't tested yet"),
    () => clickByText('.io-cta', 'Continue'),
    () => clickByText('.io-cta', 'Keep going'),
    () => clickByText('.io-option', 'Math'),
    () => clickByText('.io-option', 'Reading and Writing'),
    () => clickByText('.io-cta', 'Not sure yet, skip'),
    () => clickByText('.io-cta', 'Not sure yet, skip'),
    () => clickByText('.io-chip', '5 days'),
    () => clickByText('.io-chip', String(new Date().getFullYear())),
  ];
  expect(container.textContent).not.toMatch(EMOJI_RE);
  for (const advance of steps) {
    advance();
    flush();
    expect(container.textContent).not.toMatch(EMOJI_RE);
  }
});
