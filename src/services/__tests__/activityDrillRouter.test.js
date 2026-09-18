/**
 * activityDrillRouter.test.js — pins the shared 3-tier activity→drill lookup
 * (extracted from StudyPlanDashboard's onStartActivity, commit 994933e) so
 * the HOME-dashboard TodaysTasksCard mount and the Study Plan mount stay
 * routing-identical. All corpus deps are stubbed — pure-function tests.
 */

import { resolveActivityDrill, pickModuleWeakness } from '../activityDrillRouter';

const mkQ = (id) => ({ id, choices: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] });

/** Build a deps bundle whose queries are jest mocks with simple defaults. */
function mkDeps(overrides = {}) {
  return {
    getTargetedWeaknessSet: jest.fn(() => []),
    getQuestionsBySkillIds: jest.fn(() => []),
    getRWTargetedWeaknessSet: jest.fn(() => []),
    getRWQuestionsBySkillIds: jest.fn(() => []),
    getDrillChipForWeakness: jest.fn(() => null),
    ...overrides,
  };
}

describe('resolveActivityDrill — guards', () => {
  test('null activity → null', () => {
    expect(resolveActivityDrill({ activity: null }, mkDeps())).toBeNull();
  });

  test('no skillId + moduleId → module route (legacy fallback path)', () => {
    const route = resolveActivityDrill(
      { activity: { moduleId: 'percents', sectionName: 'Percent Change' } },
      mkDeps(),
    );
    expect(route).toEqual({ kind: 'module', moduleId: 'percents', sectionName: 'Percent Change' });
  });

  test('no skillId + no moduleId → null (unroutable)', () => {
    expect(resolveActivityDrill({ activity: { title: 'Strategy tips' } }, mkDeps())).toBeNull();
  });

  test('missing bank deps → falls back to module route instead of throwing', () => {
    const route = resolveActivityDrill(
      { activity: { skillId: 'vertex-form', moduleId: 'quadratics', sectionName: 'Vertex Form' } },
      {},
    );
    expect(route).toEqual({ kind: 'module', moduleId: 'quadratics', sectionName: 'Vertex Form' });
  });
});

describe('resolveActivityDrill — lookup tiers', () => {
  test('(1) cached row by exact skillId wins without querying the bank', () => {
    const deps = mkDeps();
    const cachedRow = { skillId: 'vertex-form', section: 'math', qIds: ['q1', 'q2'] };
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'vertex-form', title: 'Practice: Vertex' },
        cachedRows: [cachedRow],
      },
      deps,
    );
    expect(route).toEqual({
      kind: 'assigned',
      questionIds: ['q1', 'q2'],
      label: 'Practice: Vertex',
      weakness: cachedRow,
    });
    expect(deps.getTargetedWeaknessSet).not.toHaveBeenCalled();
  });

  test('(2) exact weakness by skillId feeds the targeted query', () => {
    const deps = mkDeps({
      getTargetedWeaknessSet: jest.fn(() => [mkQ('m1'), mkQ('m2')]),
    });
    const weakness = {
      skillId: 'function-interpretation',
      skill: 'Function Interpretation',
      domain: 'algebra',
      section: 'math',
      missedPatterns: ['vertex-form-from-two-conditions'],
    };
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'function-interpretation', skillName: 'Function Interpretation' },
        weaknesses: [weakness],
        answeredQuestionIds: ['done1'],
      },
      deps,
    );
    expect(route.kind).toBe('assigned');
    expect(route.questionIds).toEqual(['m1', 'm2']);
    expect(route.label).toBe('Function Interpretation Practice');
    expect(route.weakness.section).toBe('math');
    expect(deps.getTargetedWeaknessSet).toHaveBeenCalledWith(expect.objectContaining({
      weakSkills: [expect.objectContaining({ skillId: 'function-interpretation' })],
      excludeIds: ['done1'],
      count: 15,
    }));
  });

  test('(3) granular skillId prefix-matches a weakness missedPattern (the Vertex catch)', () => {
    const deps = mkDeps({
      getTargetedWeaknessSet: jest.fn(() => [mkQ('v1')]),
    });
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'vertex-form', title: 'Practice: Vertex' },
        weaknesses: [{
          skillId: 'function-interpretation',
          domain: 'algebra',
          section: 'math',
          missedPatterns: ['vertex-form-from-two-conditions'],
        }],
      },
      deps,
    );
    expect(route.kind).toBe('assigned');
    // The synthetic weakness must carry the prefixed pattern for Tier-1 routing.
    const arg = deps.getTargetedWeaknessSet.mock.calls[0][0];
    expect(arg.weakSkills[0].missedPatterns).toEqual(['vertex-form-from-two-conditions']);
    expect(route.weakness.skillId).toBe('vertex-form');
  });

  test('chip restriction narrows math drills to the chip slug', () => {
    const deps = mkDeps({
      getTargetedWeaknessSet: jest.fn(() => [mkQ('c1')]),
      getDrillChipForWeakness: jest.fn(() => ({ slug: 'reverse-percent', label: 'Reverse Percent' })),
    });
    resolveActivityDrill(
      {
        activity: { skillId: 'percents' },
        weaknesses: [{ skillId: 'percents', domain: 'problem-solving', section: 'math', missedPatterns: ['reverse-percent', 'percent-change'] }],
      },
      deps,
    );
    const arg = deps.getTargetedWeaknessSet.mock.calls[0][0];
    expect(arg.weakSkills[0].missedPatterns).toEqual(['reverse-percent']);
  });

  test('rw weakness routes through the R&W queries; own patterns survive a null chip', () => {
    // Since format v2 the chip gate is consulted for BOTH sections
    // (getDrillChipForWeakness is section-aware, matching the dashboard's
    // skillPracticeRows). When it yields nothing, the weakness's own
    // missedPatterns must pass through untouched.
    const deps = mkDeps({
      getRWTargetedWeaknessSet: jest.fn(() => [mkQ('rw1')]),
    });
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'transitions' },
        weaknesses: [{ skillId: 'transitions', domain: 'expression-of-ideas', section: 'rw', missedPatterns: ['transition-contrast'] }],
      },
      deps,
    );
    expect(route.kind).toBe('assigned');
    expect(deps.getRWTargetedWeaknessSet).toHaveBeenCalled();
    expect(deps.getTargetedWeaknessSet).not.toHaveBeenCalled();
    const arg = deps.getRWTargetedWeaknessSet.mock.calls[0][0];
    expect(arg.weakSkills[0].missedPatterns).toEqual(['transition-contrast']);
  });
});

describe('resolveActivityDrill — fallbacks', () => {
  test('targeted query empty → skill-id fallback query serves the drill', () => {
    const deps = mkDeps({
      getTargetedWeaknessSet: jest.fn(() => []),
      getQuestionsBySkillIds: jest.fn(() => [mkQ('f1'), mkQ('f2')]),
    });
    const route = resolveActivityDrill(
      { activity: { skillId: 'slope-intercept-form' } },
      deps,
    );
    expect(route.kind).toBe('assigned');
    expect(route.questionIds).toEqual(['f1', 'f2']);
    expect(deps.getQuestionsBySkillIds).toHaveBeenCalledWith(['slope-intercept-form'], { limit: 15 });
  });

  test('questions without >=2 choices are filtered out (fill-in safety)', () => {
    const deps = mkDeps({
      getTargetedWeaknessSet: jest.fn(() => [{ id: 'fill1' }, mkQ('mc1')]),
    });
    const route = resolveActivityDrill({ activity: { skillId: 'circle-equation' } }, deps);
    expect(route.questionIds).toEqual(['mc1']);
  });

  test('all lookups empty + moduleId → legacy module route', () => {
    const route = resolveActivityDrill(
      { activity: { skillId: 'ghost-skill', moduleId: 'circles', sectionName: 'Arc Length' } },
      mkDeps(),
    );
    expect(route).toEqual({ kind: 'module', moduleId: 'circles', sectionName: 'Arc Length' });
  });

  test('all lookups empty + no moduleId → null', () => {
    expect(resolveActivityDrill({ activity: { skillId: 'ghost-skill' } }, mkDeps())).toBeNull();
  });

  test('label falls back to generic Practice when no title or skillName', () => {
    const deps = mkDeps({ getTargetedWeaknessSet: jest.fn(() => [mkQ('x1')]) });
    const route = resolveActivityDrill({ activity: { skillId: 'volume-cylinder' } }, deps);
    expect(route.label).toBe('Practice');
  });
});

describe('resolveActivityDrill — pool exhaustion (answered-question dedupe)', () => {
  test('retries the targeted cascade WITHOUT excludeIds when the deduped pool is empty', () => {
    // First call (with excludeIds) returns nothing — the student has already
    // answered every matching item. Second call (no excludeIds) must fire and
    // its repeats are accepted: repetition beats a dead button.
    const getTargetedWeaknessSet = jest.fn((args) =>
      args && Array.isArray(args.excludeIds) ? [] : [mkQ('q1'), mkQ('q2')]
    );
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'solving-equations', skillName: 'Solving Equations', title: 'Targeted Practice' },
        weaknesses: [],
        cachedRows: [],
        answeredQuestionIds: ['old-1', 'old-2'],
      },
      mkDeps({ getTargetedWeaknessSet }),
    );
    expect(getTargetedWeaknessSet).toHaveBeenCalledTimes(2);
    expect(getTargetedWeaknessSet.mock.calls[1][0].excludeIds).toBeUndefined();
    expect(route).toMatchObject({ kind: 'assigned', questionIds: ['q1', 'q2'] });
  });

  test('does NOT retry when there were no answeredQuestionIds (nothing was excluded)', () => {
    const getTargetedWeaknessSet = jest.fn(() => []);
    const route = resolveActivityDrill(
      { activity: { skillId: 'unmapped-skill' }, weaknesses: [], cachedRows: [], answeredQuestionIds: [] },
      mkDeps({ getTargetedWeaknessSet }),
    );
    expect(getTargetedWeaknessSet).toHaveBeenCalledTimes(1);
    expect(route).toBeNull(); // no moduleId — unroutable, caller shows the toast fallback
  });
});

describe('resolveActivityDrill — section awareness (format v2 R&W activities)', () => {
  test('activity.section rw routes to the R&W bank when NO weakness matches', () => {
    // The old synthetic fallback hardcoded section:'math' — an R&W activity
    // whose weakness aged out of the top-8 cap dead-ended on the math bank.
    const getRWTargetedWeaknessSet = jest.fn(() => [mkQ('rw-1'), mkQ('rw-2')]);
    const getTargetedWeaknessSet = jest.fn(() => []);
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'words-in-context', skillName: 'Words in Context', title: 'Practice: Words in Context', section: 'rw' },
        weaknesses: [],
        cachedRows: [],
      },
      mkDeps({ getRWTargetedWeaknessSet, getTargetedWeaknessSet }),
    );
    expect(getRWTargetedWeaknessSet).toHaveBeenCalled();
    expect(getTargetedWeaknessSet).not.toHaveBeenCalled();
    expect(route).toMatchObject({ kind: 'assigned', questionIds: ['rw-1', 'rw-2'] });
    expect(route.weakness.section).toBe('rw');
  });

  test('prefix-pattern match inherits the matched weakness section (rw)', () => {
    // A pattern-granular activity id ('transitions-contrast'-style lookup in
    // reverse): the activity skillId prefixes a weakness missedPattern. The
    // matched weakness is R&W — its section must survive into the synthetic.
    const getRWTargetedWeaknessSet = jest.fn(() => [mkQ('rw-9')]);
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'transitions', skillName: 'Transitions', title: 'Practice: Transitions' },
        weaknesses: [
          { skillId: 'expression-of-ideas-umbrella', section: 'rw', domain: 'expression-of-ideas', missedPatterns: ['transitions-contrast'] },
        ],
        cachedRows: [],
      },
      mkDeps({ getRWTargetedWeaknessSet }),
    );
    expect(getRWTargetedWeaknessSet).toHaveBeenCalled();
    expect(route).toMatchObject({ kind: 'assigned', questionIds: ['rw-9'] });
  });

  test('exact rw weakness match still dispatches to the R&W bank (pre-existing contract)', () => {
    const getRWTargetedWeaknessSet = jest.fn(() => [mkQ('rw-5')]);
    const route = resolveActivityDrill(
      {
        activity: { skillId: 'boundaries', title: 'Practice: Boundaries' },
        weaknesses: [{ skillId: 'boundaries', section: 'rw', domain: 'standard-english-conventions', missedPatterns: ['boundaries-semicolon'] }],
        cachedRows: [],
      },
      mkDeps({ getRWTargetedWeaknessSet }),
    );
    expect(getRWTargetedWeaknessSet).toHaveBeenCalled();
    expect(route).toMatchObject({ kind: 'assigned', questionIds: ['rw-5'] });
  });

  test('chip restriction now applies to R&W too (matches dashboard rows)', () => {
    const getRWTargetedWeaknessSet = jest.fn(() => [mkQ('rw-7')]);
    const getDrillChipForWeakness = jest.fn(() => ({ slug: 'boundaries-semicolon', label: 'Semicolons' }));
    resolveActivityDrill(
      {
        activity: { skillId: 'boundaries', title: 'Practice: Boundaries', section: 'rw' },
        weaknesses: [],
        cachedRows: [],
      },
      mkDeps({ getRWTargetedWeaknessSet, getDrillChipForWeakness }),
    );
    expect(getDrillChipForWeakness).toHaveBeenCalled();
    expect(getRWTargetedWeaknessSet.mock.calls[0][0].weakSkills[0].missedPatterns).toEqual(['boundaries-semicolon']);
  });

  test('math activities without section still default to the math bank', () => {
    const getTargetedWeaknessSet = jest.fn(() => [mkQ('m-1')]);
    const getRWTargetedWeaknessSet = jest.fn(() => []);
    const route = resolveActivityDrill(
      { activity: { skillId: 'vertex-form', title: 'Practice: Vertex' }, weaknesses: [], cachedRows: [] },
      mkDeps({ getTargetedWeaknessSet, getRWTargetedWeaknessSet }),
    );
    expect(getTargetedWeaknessSet).toHaveBeenCalled();
    expect(getRWTargetedWeaknessSet).not.toHaveBeenCalled();
    expect(route).toMatchObject({ kind: 'assigned', questionIds: ['m-1'] });
  });
});

describe('pickModuleWeakness (legacy module/section cards)', () => {
  const W = [
    { skillId: 'slope-intercept-form', skill: 'Slope-intercept form', modules: ['module-1'], sections: ['module-1'], errorType: 'conceptual_gap', accuracy: 40 },
    { skillId: 'circle-equations', skill: 'Circle equations', modules: ['geometry-circles'], sections: ['geometry-circles'], accuracy: 30 },
  ];
  test('exact skillId wins', () => {
    expect(pickModuleWeakness({ skillId: 'circle-equations', moduleId: 'module-1' }, W)).toBe(W[1]);
  });
  test('a module named in modules/sections matches when there is no skillId', () => {
    expect(pickModuleWeakness({ moduleId: 'geometry-circles', sectionName: 'Arcs' }, W)).toBe(W[1]);
    expect(pickModuleWeakness({ moduleId: 'module-1' }, W)).toBe(W[0]);
  });
  test('no match means null, never a guess', () => {
    expect(pickModuleWeakness({ moduleId: 'linear-equations', sectionName: 'Deriving Equations' }, W)).toBeNull();
    expect(pickModuleWeakness({ skillId: 'unknown' }, W)).toBeNull();
    expect(pickModuleWeakness(null, W)).toBeNull();
    expect(pickModuleWeakness({ moduleId: 'module-1' }, [])).toBeNull();
  });
});
