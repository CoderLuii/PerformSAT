/**
 * StudyPlanDashboard render smoke test (2026-06 redesign).
 *
 * No RTL in this repo, so we mount with react-dom + act directly. The goal is
 * coverage that the redesigned component RENDERS with realistic data without
 * throwing — exercising both the Today branch (module cards with rounds, the
 * default landing for every mount) and the Weekly branch (day-row timeline,
 * reached by clicking the "Weekly View" sub-tab). This guards the new
 * buildPlanModule / weekDayRows derivations against runtime regressions.
 */
// StudyPlanDashboard transitively imports firebase/config (via the daily
// review engine). Stub it before that import runs (per setupTests convention).
jest.mock('../../firebase/config', () => ({ auth: {}, db: {} }));

// react-dom 18 concurrent act() opt-in (silences the act-environment warning).
global.IS_REACT_ACT_ENVIRONMENT = true;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import StudyPlanDashboard from '../StudyPlanDashboard';
import { setFeatureFlagForTest } from '../../hooks/useFeatureFlag';

const todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];

const STUDY_PLAN = {
  summary: { headline: 'Build algebra fluency', diagnosis: 'Linear functions cost you the most points.' },
  deltaFromPrevious: 'We moved Geometry up after your last test.',
  persistentWeaknessStrategy: 'Slope keeps slipping — try graphing first, then solving.',
  weaknesses: [
    { skillId: 'slope-intercept-form', skill: 'Slope-intercept form', section: 'math', domain: 'algebra', accuracy: 42, errorType: 'Conceptual gap', missedPatterns: ['write-equation-from-two-points', 'interpret-slope'] },
    { skillId: 'systems-of-equations', skill: 'Systems of equations', section: 'math', domain: 'algebra', accuracy: 61, missedPatterns: ['solve-system-substitution'] },
    { skillId: 'central-ideas', skill: 'Central ideas', section: 'rw', domain: 'information-and-ideas', accuracy: 55, missedPatterns: [] },
  ],
  weeks: [
    {
      weekNumber: 1,
      title: 'Week 1: algebra core',
      activities: [
        { type: 'practice', day: todayName, title: 'Slope-intercept drill', completed: false, skillId: 'slope-intercept-form', section: 'math', duration: 25 },
        { type: 'strategy', day: 'Monday', title: 'Trap-answer recognition', completed: false, tips: ['Watch the sign on the slope.'] },
        { type: 'practice', day: 'Friday', title: 'Mixed math set', completed: true, skillId: 'systems-of-equations', section: 'math' },
      ],
    },
    {
      weekNumber: 2,
      title: 'Week 2: reading',
      activities: [
        { type: 'practice', day: 'Tuesday', title: 'Central ideas', completed: false, skillId: 'central-ideas', section: 'rw' },
      ],
    },
  ],
};

const USER = { firstName: 'Demo', targetScore: 700, testDate: '2026-08-15' };
const PRACTICE_TEST_RESULTS = {
  t1: { bestScaledScore: 1180, lastAttemptAt: new Date('2026-06-01').toISOString(), isMultiSection: true },
  t2: { bestScaledScore: 1240, lastAttemptAt: new Date('2026-06-10').toISOString(), isMultiSection: true },
};
const SKILL_PROGRESS = {
  'slope-intercept-form': { attempts: 6, correct: 3, mastery: 50 },
  'systems-of-equations': { attempts: 8, correct: 7, mastery: 88 },
};

// Mounts the component and returns the live container + root so a test can
// inspect the DOM and drive interactions (e.g. clicking a sub-tab) before
// unmounting. Caller is responsible for cleanup via the returned teardown.
function mount(props) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <StudyPlanDashboard
        studyPlan={STUDY_PLAN}
        user={USER}
        practiceTestResults={PRACTICE_TEST_RESULTS}
        skillProgress={SKILL_PROGRESS}
        onStartPractice={() => {}}
        onStartPracticeTest={() => {}}
        onCompleteActivity={() => {}}
        onUncompleteActivity={() => {}}
        {...props}
      />
    );
  });
  const teardown = () => {
    act(() => root.unmount());
    container.remove();
  };
  return { container, teardown };
}

function renderWith(props) {
  const { container, teardown } = mount(props);
  const text = container.textContent || '';
  teardown();
  return text;
}

describe('StudyPlanDashboard redesign render', () => {
  // These tests pin the LEGACY two-tab plan page, which remains reachable via
  // the planV3 kill-switch (REACT_APP_FF_PLAN_V3=false / ff:planV3=0) after
  // the flag graduated to default-ON (2026-08-14). The v3 timeline has its own
  // render pins; here the flag is explicitly forced OFF.
  beforeEach(() => setFeatureFlagForTest('planV3', false));
  afterEach(() => setFeatureFlagForTest('planV3', undefined));

  it('renders the Today branch (module cards) without throwing', () => {
    const text = renderWith({ variant: 'default' });
    expect(text).toContain("Demo's Study Plan");
    // Module cards surface the focus-skill names and round structure.
    expect(text).toContain('Slope-intercept form');
    expect(text).toMatch(/Round 1/);
  });

  it('defaults the inline (home-screen Study Plan tab) mount to Today\'s Tasks', () => {
    // Regression guard: the inline mount used to be weekly-only and hid the
    // sub-tabs. It now lands on Today's Tasks (module cards) with both sub-
    // tabs visible, matching the standalone view.
    const { container, teardown } = mount({ variant: 'inline' });
    const text = container.textContent || '';
    expect(text).toContain('Slope-intercept form'); // a Today-branch module card
    const todayTab = Array.from(container.querySelectorAll('button.sp-tab'))
      .find((b) => /Today's Tasks/.test(b.textContent));
    expect(todayTab).toBeTruthy();
    expect(todayTab.className).toContain('is-active');
    teardown();
  });

  it('renders the Weekly branch (week carousel) when the Weekly View tab is clicked', () => {
    const { container, teardown } = mount({ variant: 'inline' });
    const weeklyTab = Array.from(container.querySelectorAll('button.sp-tab'))
      .find((b) => /Weekly View/.test(b.textContent));
    expect(weeklyTab).toBeTruthy();
    act(() => {
      weeklyTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const text = container.textContent || '';
    // Week carousel: "Week N" + "of M", the THIS WEEK chip, the sessions
    // header, and launchable session task cards.
    expect(text).toContain("This week's sessions");
    expect(text).toContain('of 2');
    expect(container.querySelector('.sp-wk')).toBeTruthy();
    expect(container.querySelector('.sp-task')).toBeTruthy();
    expect(container.querySelectorAll('.sp-task-action').length).toBeGreaterThan(0);
    teardown();
  });

  it('renders the empty state when there is no plan', () => {
    const text = renderWith({ studyPlan: null });
    expect(text).toContain('No Study Plan Yet');
  });
});

// ── Plan v3 Today panel: the starter plan's owed diagnostic (2026-09-17) ──
// A freshly onboarded student's check-in sits on ONE weekday of week 1. The
// Today panel used to filter strictly by weekday, so on any other day it read
// "Nothing is scheduled for today" and the diagnostic was nowhere on the
// page. Until it's taken, the check-in must lead today's list every day.
describe('StudyPlanDashboard v3 Today panel — starter-plan diagnostic', () => {
  const otherDay = todayName === 'Monday' ? 'Tuesday' : 'Monday';
  const STARTER_PLAN = {
    ...STUDY_PLAN,
    planSource: 'onboarding-starter',
    weeks: [
      {
        weekNumber: 1,
        title: 'Week 1',
        activities: [
          { type: 'test', activityType: 'miniDiagnostic', day: otherDay, title: 'Take your diagnostic', subtitle: '40 adaptive questions measure your real starting point.', duration: 55, completed: false, tips: [] },
          { type: 'practice', day: otherDay, title: 'Slope-intercept drill', completed: false, skillId: 'slope-intercept-form', section: 'math', duration: 25 },
        ],
      },
    ],
  };

  beforeEach(() => setFeatureFlagForTest('planV3', true));
  afterEach(() => setFeatureFlagForTest('planV3', undefined));

  it('leads Today with the owed check-in even when it was scheduled on another day', () => {
    const onStartDiagnostic = jest.fn();
    const { container, teardown } = mount({
      variant: 'inline', studyPlan: STARTER_PLAN, practiceTestResults: {}, onStartDiagnostic,
    });
    const panel = container.querySelector('.sp-today-panel');
    expect(panel).toBeTruthy();
    const text = panel.textContent || '';
    expect(text).toContain('Take your diagnostic');
    expect(text).not.toContain('Nothing is scheduled for today');
    // The other-day drill stays on its own day — only the diagnostic moves.
    expect(text).not.toContain('Slope-intercept drill');
    const start = Array.from(panel.querySelectorAll('button'))
      .find((b) => /Start diagnostic/.test(b.textContent));
    expect(start).toBeTruthy();
    act(() => { start.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(onStartDiagnostic).toHaveBeenCalledTimes(1);
    teardown();
  });

  it('a measured plan keeps its check-in on its scheduled day (no pin)', () => {
    const { container, teardown } = mount({
      variant: 'inline', studyPlan: { ...STARTER_PLAN, planSource: 'test-t1' }, practiceTestResults: {},
    });
    const panel = container.querySelector('.sp-today-panel');
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain('Nothing is scheduled for today');
    teardown();
  });
});
