/**
 * sampler.test.js — pins the mini-diagnostic sampling contract:
 * determinism, stage-1 stratification (2 per domain, medium-preferred),
 * excludeIds handling, pool-exhaustion fallbacks, the MC-only guarantee,
 * and selectStage2's weak-domain routing. corpusLoader is mocked so no
 * real bank chunk ever loads here.
 */

import {
  buildMiniDiagnosticPlan,
  selectStage2,
  MATH_DOMAIN_ORDER,
  RW_DOMAIN_ORDER,
} from '../sampler';
import { loadMathTestBank, loadRWBank } from '../../../data/corpusLoader';

jest.mock('../../../data/corpusLoader', () => ({
  loadMathTestBank: jest.fn(),
  loadRWBank: jest.fn(),
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mkItem = (id, domain, difficulty, overrides = {}) => ({
  id,
  domain,
  difficulty,
  type: 'multiple-choice',
  question: `Stem for ${id}`,
  choices: [
    { id: 'A', text: '1' },
    { id: 'B', text: '2' },
    { id: 'C', text: '3' },
    { id: 'D', text: '4' },
  ],
  correctAnswer: 'A',
  ...overrides,
});

/** 6 easy + 6 medium + 6 hard per domain — comfortably non-exhausted. */
const richDomainItems = (domain, prefix) =>
  ['easy', 'medium', 'hard'].flatMap((diff) =>
    [1, 2, 3, 4, 5, 6].map((i) => mkItem(`${prefix}-${domain}-${diff}-${i}`, domain, diff)));

const richMathItems = () => MATH_DOMAIN_ORDER.flatMap((d) => richDomainItems(d, 'm'));
const richRWItems = () => RW_DOMAIN_ORDER.flatMap((d) => richDomainItems(d, 'r'));

const mkBank = (items) => ({
  getQuestionsByDomain: (domain) => items.filter((q) => q.domain === domain),
});

const setBanks = ({ math = richMathItems(), rw = richRWItems() } = {}) => {
  loadMathTestBank.mockResolvedValue(mkBank(math));
  loadRWBank.mockResolvedValue(mkBank(rw));
};

const planIds = (plan) => ({
  rwStage1: plan.rw.stage1.map((q) => q.id),
  mathStage1: plan.math.stage1.map((q) => q.id),
  rwPools: Object.fromEntries(Object.entries(plan.rw.stage2Pools).map(
    ([d, p]) => [d, { easier: p.easier.map((q) => q.id), harder: p.harder.map((q) => q.id) }])),
  mathPools: Object.fromEntries(Object.entries(plan.math.stage2Pools).map(
    ([d, p]) => [d, { easier: p.easier.map((q) => q.id), harder: p.harder.map((q) => q.id) }])),
});

const allPlanIds = (plan) => {
  const ids = [...plan.rw.stage1, ...plan.math.stage1].map((q) => q.id);
  [plan.rw.stage2Pools, plan.math.stage2Pools].forEach((pools) => {
    Object.values(pools).forEach(({ easier, harder }) => {
      ids.push(...easier.map((q) => q.id), ...harder.map((q) => q.id));
    });
  });
  return ids;
};

beforeEach(() => {
  jest.clearAllMocks();
  setBanks();
});

// ─── buildMiniDiagnosticPlan ─────────────────────────────────────────────────

describe('buildMiniDiagnosticPlan — determinism', () => {
  test('same userId:attemptId seed produces an identical plan', async () => {
    const a = await buildMiniDiagnosticPlan({ userId: 'user-1', attemptId: 'attempt-1' });
    setBanks(); // fresh bank objects — determinism must come from the seed
    const b = await buildMiniDiagnosticPlan({ userId: 'user-1', attemptId: 'attempt-1' });
    expect(planIds(a)).toEqual(planIds(b));
  });

  test('a different attemptId re-rolls the items', async () => {
    const a = await buildMiniDiagnosticPlan({ userId: 'user-1', attemptId: 'attempt-1' });
    const b = await buildMiniDiagnosticPlan({ userId: 'user-1', attemptId: 'attempt-2' });
    expect(planIds(a)).not.toEqual(planIds(b));
  });
});

describe('buildMiniDiagnosticPlan — stage-1 stratification', () => {
  test('8 items per section, exactly 2 per domain, medium-preferred', async () => {
    const plan = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });

    [['rw', RW_DOMAIN_ORDER], ['math', MATH_DOMAIN_ORDER]].forEach(([section, domains]) => {
      const stage1 = plan[section].stage1;
      expect(stage1).toHaveLength(8);
      domains.forEach((domain) => {
        expect(stage1.filter((q) => q.domain === domain)).toHaveLength(2);
      });
      // The rich bank has 6 mediums per domain, so the preference is absolute.
      stage1.forEach((q) => expect(q.difficulty).toBe('medium'));
    });
  });

  test('stage-2 pools carry ~4 easy and ~4 hard candidates per domain, all disjoint', async () => {
    const plan = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });

    [['rw', RW_DOMAIN_ORDER], ['math', MATH_DOMAIN_ORDER]].forEach(([section, domains]) => {
      const { stage1, stage2Pools } = plan[section];
      const stage1Ids = new Set(stage1.map((q) => q.id));
      domains.forEach((domain) => {
        const { easier, harder } = stage2Pools[domain];
        expect(easier).toHaveLength(4);
        expect(harder).toHaveLength(4);
        easier.forEach((q) => expect(q.difficulty).toBe('easy'));
        harder.forEach((q) => expect(q.difficulty).toBe('hard'));
        [...easier, ...harder].forEach((q) => {
          expect(stage1Ids.has(q.id)).toBe(false);
          expect(q.domain).toBe(domain);
        });
        const poolIds = [...easier, ...harder].map((q) => q.id);
        expect(new Set(poolIds).size).toBe(poolIds.length); // easier/harder disjoint
      });
    });
  });

  test('no duplicate ids anywhere in the plan', async () => {
    const plan = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });
    const ids = allPlanIds(plan);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('buildMiniDiagnosticPlan — excludeIds', () => {
  test('excluded ids are absent from stage 1 and every pool when alternatives exist', async () => {
    const first = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });
    const excludeIds = [
      ...first.rw.stage1.slice(0, 3).map((q) => q.id),
      ...first.math.stage1.slice(0, 3).map((q) => q.id),
    ];

    setBanks();
    const second = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a', excludeIds });
    const ids = new Set(allPlanIds(second));
    excludeIds.forEach((id) => expect(ids.has(id)).toBe(false));
    expect(second.rw.stage1).toHaveLength(8);
    expect(second.math.stage1).toHaveLength(8);
  });
});

describe('buildMiniDiagnosticPlan — exhaustion fallbacks', () => {
  test('relaxes the medium preference when a domain has no mediums', async () => {
    const math = [
      ...richDomainItems('problem-solving', 'm'),
      ...richDomainItems('advanced-math', 'm'),
      ...richDomainItems('geometry', 'm'),
      // algebra: hard-only — stage 1 must still field 2 algebra items
      mkItem('m-algebra-hard-1', 'algebra', 'hard'),
      mkItem('m-algebra-hard-2', 'algebra', 'hard'),
    ];
    setBanks({ math });

    const plan = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });
    const algebra = plan.math.stage1.filter((q) => q.domain === 'algebra');
    expect(algebra).toHaveLength(2);
    algebra.forEach((q) => expect(q.difficulty).toBe('hard'));
  });

  test('relaxes excludeIds when a domain has nothing else left', async () => {
    const math = [
      ...richDomainItems('problem-solving', 'm'),
      ...richDomainItems('advanced-math', 'm'),
      ...richDomainItems('geometry', 'm'),
      mkItem('m-algebra-only-1', 'algebra', 'medium'),
      mkItem('m-algebra-only-2', 'algebra', 'medium'),
    ];
    setBanks({ math });

    const plan = await buildMiniDiagnosticPlan({
      userId: 'u',
      attemptId: 'a',
      excludeIds: ['m-algebra-only-1', 'm-algebra-only-2'],
    });
    const algebraIds = plan.math.stage1.filter((q) => q.domain === 'algebra').map((q) => q.id).sort();
    expect(algebraIds).toEqual(['m-algebra-only-1', 'm-algebra-only-2']);
  });

  test('backfills across domains so stage 1 never under-fills while the bank has items', async () => {
    const math = [
      // algebra is physically empty; the other three domains are rich
      ...richDomainItems('problem-solving', 'm'),
      ...richDomainItems('advanced-math', 'm'),
      ...richDomainItems('geometry', 'm'),
    ];
    setBanks({ math });

    const plan = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });
    expect(plan.math.stage1).toHaveLength(8);
    expect(plan.math.stage1.filter((q) => q.domain === 'algebra')).toHaveLength(0);
  });
});

describe('buildMiniDiagnosticPlan — MC-only guarantee', () => {
  test('fill-in, wrong-choice-count, and invalid-answer items are never sampled', async () => {
    const junk = [
      mkItem('m-algebra-fillin', 'algebra', 'medium', { type: 'fill-in', choices: undefined, correctAnswer: '3' }),
      mkItem('m-algebra-3choice', 'algebra', 'medium', {
        choices: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }, { id: 'C', text: '3' }],
      }),
      mkItem('m-algebra-5choice', 'algebra', 'medium', {
        choices: ['A', 'B', 'C', 'D', 'E'].map((id) => ({ id, text: id })),
      }),
      mkItem('m-algebra-bad-answer', 'algebra', 'medium', { correctAnswer: 'E' }),
      mkItem('m-algebra-no-answer', 'algebra', 'medium', { correctAnswer: '' }),
    ];
    const valid = [mkItem('m-algebra-ok-1', 'algebra', 'medium'), mkItem('m-algebra-ok-2', 'algebra', 'easy')];
    setBanks({
      math: [
        ...junk,
        ...valid,
        ...richDomainItems('problem-solving', 'm'),
        ...richDomainItems('advanced-math', 'm'),
        ...richDomainItems('geometry', 'm'),
      ],
    });

    const plan = await buildMiniDiagnosticPlan({ userId: 'u', attemptId: 'a' });
    const ids = new Set(allPlanIds(plan));
    junk.forEach((q) => expect(ids.has(q.id)).toBe(false));
    const algebraIds = plan.math.stage1.filter((q) => q.domain === 'algebra').map((q) => q.id).sort();
    expect(algebraIds).toEqual(['m-algebra-ok-1', 'm-algebra-ok-2']);
    // Every sampled item satisfies the runner's contract.
    [...plan.rw.stage1, ...plan.math.stage1].forEach((q) => {
      expect(q.choices).toHaveLength(4);
      expect(q.choices.some((c) => String(c.id) === String(q.correctAnswer))).toBe(true);
    });
  });
});

// ─── selectStage2 ────────────────────────────────────────────────────────────

/** Stage-1 fixture: 2 items per R&W domain, ids `<domain>-s1-{1,2}`. */
const rwStage1 = () => RW_DOMAIN_ORDER.flatMap((d) => [
  mkItem(`${d}-s1-1`, d, 'medium'),
  mkItem(`${d}-s1-2`, d, 'medium'),
]);

/** Pools fixture: 4 easier + 4 harder per domain, ids `<domain>-{easy,hard}-{i}`. */
const rwPools = (overrides = {}) => Object.fromEntries(RW_DOMAIN_ORDER.map((d) => [d, {
  easier: [1, 2, 3, 4].map((i) => mkItem(`${d}-easy-${i}`, d, 'easy')),
  harder: [1, 2, 3, 4].map((i) => mkItem(`${d}-hard-${i}`, d, 'hard')),
  ...(overrides[d] || {}),
}]));

/**
 * Answers giving each domain the requested number of correct stage-1
 * responses (correct = 'A'). Unlisted items are answered wrong.
 */
const answersWithCorrectPerDomain = (correctByDomain) => {
  const answers = {};
  RW_DOMAIN_ORDER.forEach((d) => {
    const correct = correctByDomain[d] ?? 0;
    answers[`${d}-s1-1`] = correct >= 1 ? 'A' : 'B';
    answers[`${d}-s1-2`] = correct >= 2 ? 'A' : 'B';
  });
  return answers;
};

describe('selectStage2 — weak-domain routing', () => {
  test('two weakest domains get 2 items each; accuracy <= 0.5 routes to the easier pool', () => {
    const answers = answersWithCorrectPerDomain({
      'information-and-ideas': 0,        // 0.0 — weakest
      'craft-and-structure': 1,          // 0.5 — second weakest
      'standard-english-conventions': 2,
      'expression-of-ideas': 2,
    });
    const picked = selectStage2(rwStage1(), answers, rwPools());
    expect(picked.map((q) => q.id)).toEqual([
      'information-and-ideas-easy-1',
      'information-and-ideas-easy-2',
      'craft-and-structure-easy-1',
      'craft-and-structure-easy-2',
    ]);
  });

  test('a probed domain above 0.5 accuracy routes to the harder pool', () => {
    // info 0.5 is weakest; the three 1.0 domains tiebreak on fixed domain
    // order, so craft-and-structure is probed second — at 1.0 -> harder.
    const answers = answersWithCorrectPerDomain({
      'information-and-ideas': 1,
      'craft-and-structure': 2,
      'standard-english-conventions': 2,
      'expression-of-ideas': 2,
    });
    const picked = selectStage2(rwStage1(), answers, rwPools());
    expect(picked.map((q) => q.id)).toEqual([
      'information-and-ideas-easy-1',
      'information-and-ideas-easy-2',
      'craft-and-structure-hard-1',
      'craft-and-structure-hard-2',
    ]);
  });

  test('falls back to the other pool when the routed pool is empty', () => {
    const answers = answersWithCorrectPerDomain({ 'information-and-ideas': 0, 'craft-and-structure': 0 });
    const pools = rwPools({ 'information-and-ideas': { easier: [] } });
    const picked = selectStage2(rwStage1(), answers, pools);
    expect(picked.map((q) => q.id)).toEqual([
      'information-and-ideas-hard-1',
      'information-and-ideas-hard-2',
      'craft-and-structure-easy-1',
      'craft-and-structure-easy-2',
    ]);
  });

  test('tiebreak prefers fewer correct when accuracies tie across unequal totals', () => {
    // expression-of-ideas probed at 4 items (cross-domain backfill shape):
    // 2/4 = 0.5 accuracy with 2 correct; boundaries domain 1/2 = 0.5 with 1
    // correct -> fewer correct ranks weaker.
    const stage1 = [
      ...rwStage1(),
      mkItem('expression-of-ideas-s1-3', 'expression-of-ideas', 'medium'),
      mkItem('expression-of-ideas-s1-4', 'expression-of-ideas', 'medium'),
    ];
    const answers = {
      ...answersWithCorrectPerDomain({
        'information-and-ideas': 2,
        'craft-and-structure': 2,
        'standard-english-conventions': 1, // 0.5, 1 correct
        'expression-of-ideas': 2,          // plus 2 wrong extras -> 0.5, 2 correct
      }),
      'expression-of-ideas-s1-3': 'B',
      'expression-of-ideas-s1-4': 'B',
    };
    const picked = selectStage2(stage1, answers, rwPools());
    expect(picked.slice(0, 2).map((q) => q.domain))
      .toEqual(['standard-english-conventions', 'standard-english-conventions']);
    expect(picked.slice(2).map((q) => q.domain))
      .toEqual(['expression-of-ideas', 'expression-of-ideas']);
  });
});

describe('selectStage2 — count, floor, and determinism guarantees', () => {
  test('returns exactly 4, backfilling from next-weakest domains on pool exhaustion', () => {
    const answers = answersWithCorrectPerDomain({ 'information-and-ideas': 0, 'craft-and-structure': 0 });
    const pools = rwPools({
      'information-and-ideas': { easier: [], harder: [] },
      'craft-and-structure': {
        easier: [mkItem('craft-and-structure-easy-1', 'craft-and-structure', 'easy')],
        harder: [],
      },
    });
    const picked = selectStage2(rwStage1(), answers, pools);
    expect(picked).toHaveLength(4);
    expect(picked.map((q) => q.id)).toEqual([
      'craft-and-structure-easy-1',
      'standard-english-conventions-easy-1',
      'standard-english-conventions-easy-2',
      'standard-english-conventions-easy-3',
    ]);
  });

  test('every probed domain ends with at least 2 items across both stages', () => {
    const stage1 = rwStage1();
    const answers = answersWithCorrectPerDomain({ 'information-and-ideas': 0 });
    const picked = selectStage2(stage1, answers, rwPools());
    const totals = new Map();
    [...stage1, ...picked].forEach((q) => totals.set(q.domain, (totals.get(q.domain) || 0) + 1));
    RW_DOMAIN_ORDER.forEach((d) => expect(totals.get(d)).toBeGreaterThanOrEqual(2));
  });

  test('pure and deterministic: identical inputs give identical picks', () => {
    const answers = answersWithCorrectPerDomain({ 'craft-and-structure': 0, 'expression-of-ideas': 1 });
    const a = selectStage2(rwStage1(), answers, rwPools());
    const b = selectStage2(rwStage1(), answers, rwPools());
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });

  test('never re-serves a stage-1 item even if pools overlap stage 1', () => {
    const stage1 = rwStage1();
    const answers = answersWithCorrectPerDomain({ 'information-and-ideas': 0, 'craft-and-structure': 0 });
    const pools = rwPools({
      'information-and-ideas': {
        easier: [stage1[0], mkItem('information-and-ideas-easy-x', 'information-and-ideas', 'easy')],
      },
    });
    const picked = selectStage2(stage1, answers, pools);
    expect(picked.map((q) => q.id)).not.toContain(stage1[0].id);
    expect(picked).toHaveLength(4);
  });
});
