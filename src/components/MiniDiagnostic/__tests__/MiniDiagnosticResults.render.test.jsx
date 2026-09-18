/**
 * MiniDiagnosticResults re-open path (2026-08-24): the dashboard's "View your
 * diagnosis" mounts this screen from the PERSISTED record instead of the live
 * finish-pipeline result. Guards resultFromRecord (record-first, plan-mirror
 * fallback for legacy records) and that the screen renders both ways.
 *
 * No RTL in this repo — mount with react-dom + act directly.
 */
jest.mock('../../../firebase/config', () => ({ auth: {}, db: {} }));

global.IS_REACT_ACT_ENVIRONMENT = true;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import MiniDiagnosticResults, { resultFromRecord } from '../MiniDiagnosticResults';

const BAND = { low: 1360, high: 1440, rwBand: { low: 740, high: 800 }, mathBand: { low: 600, high: 660 } };

const RECORD_WITH_DIAGNOSIS = {
  completedAt: '2026-08-22T10:00:00.000Z',
  scoreBand: BAND,
  totalCount: 40,
  diagnosticVariant: 'full',
  diagnosis: {
    headline: '100 points above your 1300 goal',
    keyInsight: { title: 'Your biggest opportunity: quick wins', message: '4 of your 9 wrong answers were careless mistakes.' },
    errorPatterns: { counts: { careless_error: 4, conceptual_gap: 3, time_pressure: 2 }, totalWrong: 9 },
    strengths: [{ skill: 'Craft and Structure', accuracy: 100 }],
    weaknesses: [
      { skillId: 'function-interpretation', skill: 'Function Interpretation', accuracy: 50, attempted: 4, evidenceLevel: 'confirmed', errorType: 'Conceptual gap', evidence: '2/4 correct, primary error: Conceptual gap, first time tested' },
      { skillId: 'transitions', skill: 'Transitions', accuracy: 33, attempted: 3, evidenceLevel: 'suspected', errorType: 'Careless error', evidence: '1/3 correct, primary error: Careless error, first time tested' },
    ],
  },
};

const LEGACY_RECORD = { completedAt: '2026-08-01T10:00:00.000Z', scoreBand: BAND, totalCount: 40 };
const PLAN_MIRROR = {
  summary: { headline: 'From the plan mirror', keyInsight: { title: 'Mirror insight', message: 'From the plan.' } },
  strengths: [{ skill: 'Mirror strength', accuracy: 90 }],
  weaknesses: [{ skillId: 'algebra', skill: 'Algebra', accuracy: 63, errorType: 'Conceptual gap', evidence: '5/8 correct, primary error: Conceptual gap' }],
};

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}

describe('resultFromRecord', () => {
  it('prefers the record\'s own diagnosis copy over the plan mirror', () => {
    const r = resultFromRecord(RECORD_WITH_DIAGNOSIS, PLAN_MIRROR);
    expect(r.plan.summary.headline).toBe('100 points above your 1300 goal');
    expect(r.groundTruth.weaknesses).toHaveLength(2);
    expect(r.diagReport.errorPatterns.totalWrong).toBe(9);
    expect(r.scoreBand).toBe(BAND);
    expect(r.miniDiagnosticRecord).toBe(RECORD_WITH_DIAGNOSIS);
  });

  it('falls back to the plan mirror for records written before the diagnosis copy existed', () => {
    const r = resultFromRecord(LEGACY_RECORD, PLAN_MIRROR);
    expect(r.plan.summary.headline).toBe('From the plan mirror');
    expect(r.groundTruth.weaknesses[0].skill).toBe('Algebra');
    expect(r.groundTruth.strengths[0].skill).toBe('Mirror strength');
    expect(r.diagReport.errorPatterns).toEqual({});
  });

  it('returns null without a record', () => {
    expect(resultFromRecord(null, PLAN_MIRROR)).toBeNull();
  });
});

describe('MiniDiagnosticResults from a persisted record', () => {
  it('renders the full diagnosis screen with a back link', () => {
    const onBack = jest.fn();
    const onViewPlan = jest.fn();
    const { container, unmount } = mount(
      <MiniDiagnosticResults record={RECORD_WITH_DIAGNOSIS} plan={null} user={{ firstName: 'Haresh' }} onViewPlan={onViewPlan} onBack={onBack} />
    );
    const text = container.textContent;
    expect(text).toContain('Your starting point, Haresh');
    expect(text).toContain('Based on 40 questions');
    expect(text).toContain('1360–1440');
    expect(text).toContain('Your biggest opportunity: quick wins');
    expect(text).toContain('Why you missed what you missed');
    expect(text).toContain('Craft and Structure');
    expect(text).toContain('Function Interpretation');
    expect(text).toContain('Back to Home');

    const buttons = Array.from(container.querySelectorAll('button'));
    act(() => { buttons.find(b => b.textContent.includes('Back to Home')).click(); });
    expect(onBack).toHaveBeenCalledTimes(1);
    act(() => { buttons.find(b => b.textContent.includes('See my starter plan')).click(); });
    expect(onViewPlan).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('surfaces the nuance layer: a cleared target hides the plan headline and offers to raise it', () => {
    const onEditGoals = jest.fn();
    const { container, unmount } = mount(
      <MiniDiagnosticResults
        record={RECORD_WITH_DIAGNOSIS}
        plan={null}
        user={{ firstName: 'Haresh', targetScore: 1300, testDate: '2099-10-03' }}
        onViewPlan={() => {}}
        onEditGoals={onEditGoals}
      />
    );
    const text = container.textContent;
    expect(text).toContain('Worth knowing');
    expect(text).toContain('Your 1300 target is below where you already stand');
    expect(text).toContain('1500');
    // The plan's "past your target" headline would contradict the advice.
    expect(text).not.toContain('100 points above your 1300 goal');
    const raise = Array.from(container.querySelectorAll('button')).find(b => b.textContent.includes('Raise your target'));
    expect(raise).toBeTruthy();
    act(() => { raise.click(); });
    expect(onEditGoals).toHaveBeenCalledWith('target');
    unmount();
  });

  it('keeps the plan headline when no target nuance fires, and hides actions without handlers', () => {
    const { container, unmount } = mount(
      <MiniDiagnosticResults
        record={RECORD_WITH_DIAGNOSIS}
        plan={null}
        user={{ targetScore: 1550, testDate: '2020-01-01' }}
        onViewPlan={() => {}}
      />
    );
    const text = container.textContent;
    expect(text).toContain('100 points above your 1300 goal');
    expect(text).toContain('Jan 1 has come and gone');
    expect(text).not.toContain('Update your test date'); // no onEditGoals → no dead button
    unmount();
  });

  it('renders a legacy record off the plan mirror (no error breakdown, no crash)', () => {
    const { container, unmount } = mount(
      <MiniDiagnosticResults record={LEGACY_RECORD} plan={PLAN_MIRROR} user={{ targetScore: 1550 }} onViewPlan={() => {}} onBack={() => {}} />
    );
    const text = container.textContent;
    expect(text).toContain('Your starting point');
    expect(text).toContain('From the plan mirror');
    expect(text).toContain('Algebra');
    expect(text).not.toContain('Why you missed what you missed');
    unmount();
  });

  it('still mounts straight off a live finish result (no back link)', () => {
    const live = resultFromRecord(RECORD_WITH_DIAGNOSIS, null);
    const { container, unmount } = mount(
      <MiniDiagnosticResults result={live} user={{}} onViewPlan={() => {}} />
    );
    expect(container.textContent).toContain('Your starting point');
    expect(container.textContent).not.toContain('Back to Home');
    unmount();
  });
});
