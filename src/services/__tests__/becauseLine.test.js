/**
 * becauseLine.test.js — every personalized task carries one evidence-grounded
 * sentence explaining why it's on THIS student's plan (Phase 3).
 */

import { buildBecauseLine, buildSkillDrillActivity } from '../planFormatUpgrade';
import { generateStudyPlan } from '../studyPlanGenerator';

describe('buildBecauseLine', () => {
  test('cites test accuracy and the error class in plain language', () => {
    const line = buildBecauseLine({ testAccuracy: 33, primaryErrorType: 'conceptual_gap' });
    expect(line).toBe('You scored 33% on this on your last test — the misses trace to the concept itself, not carelessness.');
  });

  test('onboarding self-report gets the check-in framing', () => {
    expect(buildBecauseLine({ primaryErrorType: 'Self-reported weak area', testAccuracy: 55 }))
      .toMatch(/flagged this in onboarding/);
  });

  test('thin test evidence is hedged as a probe, not overclaimed', () => {
    expect(buildBecauseLine({ evidenceLevel: 'suspected', testAccuracy: 50, primaryErrorType: 'conceptual_gap' }))
      .toMatch(/doubles as a probe/);
  });

  test('declining trend is named', () => {
    expect(buildBecauseLine({ testAccuracy: 40, trend: 'declining' }))
      .toMatch(/slipped since the test before/);
  });

  test('no honest evidence → null (UI omits the line)', () => {
    expect(buildBecauseLine({})).toBeNull();
    expect(buildBecauseLine({ primaryErrorType: 'not-a-real-code' })).toBeNull();
  });

  test('skill-drill activities carry the line', () => {
    const act = buildSkillDrillActivity({ skillId: 'words-in-context', section: 'rw', testAccuracy: 20, primaryErrorType: 'trap_susceptibility' });
    expect(act.because).toMatch(/20%.*trap answers/);
  });
});

test('generated plans attach because-lines to practice activities', () => {
  const diag = {
    testId: 't1',
    score: { scaled: 920, isMultiSection: true, sections: { math: 480, rw: 440 }, percentCorrect: 45 },
    skillAnalysis: {
      weakSkills: [
        { skillId: 'words-in-context', name: 'Words In Context', domain: 'craft-and-structure', section: 'rw', testAccuracy: 25, correct: 1, total: 4, attempted: 4, evidenceLevel: 'measured', primaryErrorType: 'conceptual_gap', missedPatterns: [], modules: [], sections: [] },
      ],
      strongSkills: [],
    },
    prioritizedActions: [],
    errorPatterns: { totalWrong: 20, counts: {}, dominantPattern: null, summary: [] },
    difficultyAnalysis: {},
    timeAnalysis: { fadeEffect: 0 },
    trendAnalysis: { persistentWeaknesses: [] },
    scoreProjection: { easyWins: { count: 0, points: 0 } },
  };
  const plan = generateStudyPlan(diag, { targetScore: 1200, testDate: new Date(Date.now() + 30 * 86400000).toISOString() });
  const withBecause = plan.weeks.flatMap((w) => w.activities || []).filter((a) => a.because);
  expect(withBecause.length).toBeGreaterThan(0);
  // Order-independent: Plan v3's unified sessions (test-miss review, trap
  // drills) also carry because-lines and can schedule ahead of the skill
  // drill — the evidence-citing line just has to exist somewhere.
  expect(withBecause.some((a) => /25%/.test(a.because))).toBe(true);
});
