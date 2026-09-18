/**
 * Plan invariants — structural guarantees every generated plan must hold,
 * regardless of the diagnostic that produced it. These are the properties the
 * dashboard, drill router, and adaptive session engine silently rely on.
 */
import { generateStudyPlan } from '../studyPlanGenerator';

const mkWeak = (skillId, over = {}) => ({
  skillId,
  name: skillId,
  domain: 'algebra',
  section: 'math',
  testAccuracy: 30,
  contentAccuracy: 30,
  attempted: 5,
  evidenceLevel: 'confirmed',
  missedPatterns: [],
  sections: [],
  primaryErrorType: 'conceptual_gap',
  historicalMastery: null,
  ...over,
});

const mkDiag = (over = {}) => ({
  testId: 'inv-test',
  testTitle: 'Invariants',
  score: { scaled: 480, isMultiSection: false, sections: null, percentCorrect: 45 },
  skillAnalysis: {
    weakSkills: [
      mkWeak('slope-intercept-form'),
      mkWeak('percent-change', { testAccuracy: 40, contentAccuracy: 40 }),
      mkWeak('central-ideas-details', { section: 'rw', domain: 'information-and-ideas' }),
    ],
    strongSkills: [],
    allSkills: [],
  },
  prioritizedActions: [],
  errorPatterns: {
    totalWrong: 12,
    counts: { careless_error: 3, conceptual_gap: 6, time_pressure: 3 },
    summary: [],
    dominantPattern: null,
  },
  timeAnalysis: { fadeEffect: 20 },
  scoreProjection: { easyWins: { count: 2, description: 'desc' }, errorTypeProjections: [] },
  difficultyAnalysis: null,
  domainAnalysis: [],
  ...over,
});

const SCENARIOS = [
  ['first plan, no history', mkDiag(), {}, null, null],
  ['returning student', mkDiag(), { targetScore: 700 }, null, {
    scoreTrajectory: [{ testId: 'a' }, { testId: 'b' }],
    persistentWeaknesses: [{ skillId: 'slope-intercept-form' }],
    skillHistory: {},
    recoveredSkills: [],
  }],
  ['no goal set', mkDiag(), {}, null, null],
];

describe.each(SCENARIOS)('plan invariants — %s', (_label, diag, profile, prevPlan, longitudinal) => {
  const plan = generateStudyPlan(diag, profile, {}, {}, prevPlan, longitudinal);

  it('week count stays within product bounds', () => {
    expect(plan.weeks.length).toBeGreaterThanOrEqual(1);
    // Runway-sized arc (Living Study Plan P4): full plans follow the real
    // runway up to a 12-week cap; first plans stay <=2 below.
    expect(plan.weeks.length).toBeLessThanOrEqual(12);
    const isFirst = !longitudinal || (longitudinal.scoreTrajectory || []).length <= 1;
    if (isFirst) expect(plan.weeks.length).toBeLessThanOrEqual(2);
  });

  it('every activity is launchable: title, type, positive duration', () => {
    plan.weeks.forEach(w => {
      (w.activities || []).forEach(a => {
        expect(typeof a.title).toBe('string');
        expect(a.title.length).toBeGreaterThan(0);
        expect(['lesson', 'practice', 'strategy', 'review', 'test', 'drill', 'skill-drill']).toContain(a.type);
        expect(a.duration).toBeGreaterThan(0);
      });
    });
  });

  it('drill-shaped activities carry a routable skillId + section', () => {
    plan.weeks.forEach(w => {
      (w.activities || []).forEach(a => {
        if (!a.moduleId && a.type === 'practice' && a.skillId) {
          expect(typeof a.skillId).toBe('string');
          expect(['math', 'rw']).toContain(a.section || 'math');
        }
      });
    });
  });

  it('assigned question ids are unique', () => {
    const ids = plan.targetedQuestionIds || [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('adaptive pool ids are unique and buckets only reference pool members', () => {
    const pool = plan.adaptivePractice?.poolIds || [];
    expect(new Set(pool).size).toBe(pool.length);
    const poolSet = new Set(pool);
    Object.values(plan.adaptivePractice?.byDifficulty || {}).forEach(bucket => {
      bucket.forEach(id => expect(poolSet.has(id)).toBe(true));
    });
  });

  it('summary stats are internally consistent', () => {
    expect(plan.summary.stats.weeksInPlan).toBe(plan.weeks.length);
    expect(plan.summary.stats.minutesPerDay).toBeGreaterThan(0);
    expect(plan.minutesPerWeek).toBeGreaterThan(0);
  });

  it('nextAction (when present) points at a real week-1 activity', () => {
    if (!plan.nextAction) return;
    const week1Titles = (plan.weeks[0]?.activities || []).map(a => a.title);
    expect(week1Titles).toContain(plan.nextAction.title);
  });

  it('no emojis leak into student-facing plan text', () => {
    const emoji = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/u;
    expect(plan.summary.headline).not.toMatch(emoji);
    plan.weeks.forEach(w => {
      expect(w.title || '').not.toMatch(emoji);
      (w.activities || []).forEach(a => {
        expect(a.title || '').not.toMatch(emoji);
        expect(a.subtitle || '').not.toMatch(emoji);
      });
    });
  });
});

describe('plan invariants — answered questions are never re-assigned', () => {
  it('excludes answeredQuestionIds from targeted assignments and the adaptive pool', () => {
    const first = generateStudyPlan(mkDiag(), {}, {}, {}, null, null, []);
    const answered = [
      ...(first.targetedQuestionIds || []).slice(0, 5),
      ...(first.adaptivePractice?.poolIds || []).slice(0, 5),
    ];
    if (answered.length === 0) return; // bank served nothing for this diagnostic — nothing to assert

    const second = generateStudyPlan(mkDiag(), {}, {}, {}, null, null, answered);
    const answeredSet = new Set(answered);
    (second.targetedQuestionIds || []).forEach(id => expect(answeredSet.has(id)).toBe(false));
    (second.adaptivePractice?.poolIds || []).forEach(id => expect(answeredSet.has(id)).toBe(false));
  });
});
