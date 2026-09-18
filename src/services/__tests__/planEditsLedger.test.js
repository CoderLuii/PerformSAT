/**
 * planEditsLedger.test.js — Phase 5: student edits survive regeneration.
 * Removals/de-focuses stay suppressed (unless the skill regressed), custom
 * tasks come back, and the ledger itself rides every new plan.
 */

import { generateStudyPlan } from '../studyPlanGenerator';
import { removeActivity, addCustomActivity, setFocusAreas } from '../studyPlanEditor';

const weakSkill = (skillId, name, testAccuracy) => ({
  skillId, name, domain: 'craft-and-structure', section: 'rw', testAccuracy,
  correct: 1, total: 4, attempted: 4, evidenceLevel: 'measured',
  primaryErrorType: 'conceptual_gap', missedPatterns: [], modules: [], sections: [],
});

const mkDiag = (over = {}) => ({
  testId: 'synthetic-1',
  score: { scaled: 920, isMultiSection: true, sections: { math: 480, rw: 440 }, percentCorrect: 45 },
  skillAnalysis: {
    weakSkills: [
      weakSkill('words-in-context', 'Words In Context', 40),
      weakSkill('transitions', 'Transitions', 45),
    ],
    strongSkills: [],
  },
  prioritizedActions: [],
  errorPatterns: { totalWrong: 20, counts: {}, dominantPattern: null, summary: [] },
  difficultyAnalysis: {},
  timeAnalysis: { fadeEffect: 0 },
  trendAnalysis: { persistentWeaknesses: [] },
  scoreProjection: { easyWins: { count: 0, points: 0 } },
  ...over,
});

const farDate = new Date(Date.now() + 40 * 86400000).toISOString();
const allActivities = (plan) => plan.weeks.flatMap((w) => w.activities || []);
const skillIds = (plan) => allActivities(plan).map((a) => a.skillId).filter(Boolean);

const removeSkillActivity = (plan, skillId) => {
  for (let wi = 0; wi < plan.weeks.length; wi++) {
    const ai = (plan.weeks[wi].activities || []).findIndex((a) => a.skillId === skillId && a.type === 'practice');
    if (ai !== -1) return removeActivity(plan, wi, ai);
  }
  return plan;
};

describe('planEdits ledger', () => {
  test('a removed skill stays out of the regenerated plan', () => {
    let plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farDate });
    plan = { ...plan, weaknesses: [{ skillId: 'words-in-context', skill: 'Words In Context', accuracy: 40 }] };
    const edited = removeSkillActivity(plan, 'words-in-context');
    expect(edited.planEdits.some((e) => e.type === 'remove' && e.skillId === 'words-in-context')).toBe(true);

    const regen = generateStudyPlan(mkDiag({ testId: 'synthetic-2' }), { targetScore: 1200, testDate: farDate }, {}, {}, edited);
    expect(skillIds(regen)).not.toContain('words-in-context');
    expect(skillIds(regen)).toContain('transitions');
    // Ledger rides the new plan for the regeneration after this one.
    expect(regen.planEdits.some((e) => e.skillId === 'words-in-context')).toBe(true);
  });

  test('a removed skill RESURFACES when the newest test shows it regressed', () => {
    let plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farDate });
    plan = { ...plan, weaknesses: [{ skillId: 'words-in-context', skill: 'Words In Context', accuracy: 40 }] };
    const edited = removeSkillActivity(plan, 'words-in-context');

    const regressedDiag = mkDiag({ testId: 'synthetic-2' });
    regressedDiag.skillAnalysis.weakSkills[0] = weakSkill('words-in-context', 'Words In Context', 15); // 40 → 15
    const regen = generateStudyPlan(regressedDiag, { targetScore: 1200, testDate: farDate }, {}, {}, edited);
    expect(skillIds(regen)).toContain('words-in-context');
  });

  test('custom tasks come back after regeneration until removed', () => {
    let plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farDate });
    plan = addCustomActivity(plan, 0, { title: 'Read 20 min before bed', day: 'Wednesday', duration: 20 });

    const regen = generateStudyPlan(mkDiag({ testId: 'synthetic-2' }), { targetScore: 1200, testDate: farDate }, {}, {}, plan);
    const custom = allActivities(regen).find((a) => a.custom && a.title === 'Read 20 min before bed');
    expect(custom).toBeTruthy();
    expect(custom.day).toBe('Wednesday');

    // Removing the custom task retires its ledger entry → gone next regen.
    const wi = regen.weeks.findIndex((w) => (w.activities || []).some((a) => a.custom));
    const ai = regen.weeks[wi].activities.findIndex((a) => a.custom);
    const removed = removeActivity(regen, wi, ai);
    const regen2 = generateStudyPlan(mkDiag({ testId: 'synthetic-3' }), { targetScore: 1200, testDate: farDate }, {}, {}, removed);
    expect(allActivities(regen2).some((a) => a.custom)).toBe(false);
  });

  test('a de-focused skill is suppressed like a removal', () => {
    let plan = generateStudyPlan(mkDiag(), { targetScore: 1200, testDate: farDate });
    plan = {
      ...plan,
      weaknesses: [
        { skillId: 'words-in-context', skill: 'Words In Context', accuracy: 40, section: 'rw' },
        { skillId: 'transitions', skill: 'Transitions', accuracy: 45, section: 'rw' },
      ],
    };
    const edited = setFocusAreas(plan, [{ skillId: 'transitions', skill: 'Transitions', accuracy: 45, section: 'rw' }]);
    expect(edited.planEdits.some((e) => e.type === 'defocus' && e.skillId === 'words-in-context')).toBe(true);

    const regen = generateStudyPlan(mkDiag({ testId: 'synthetic-2' }), { targetScore: 1200, testDate: farDate }, {}, {}, edited);
    expect(skillIds(regen)).not.toContain('words-in-context');
  });
});
