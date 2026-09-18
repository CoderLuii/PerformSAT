/**
 * Integration test: the finish pipeline runs the REAL diagnostic engine,
 * ground-truth builder, and plan generator on a real sampled 24-item
 * check-in. Only the Firestore-touching writes are mocked.
 */
import { buildMiniDiagnosticPlan, selectStage2 } from '../sampler';
import {
  finishMiniDiagnostic,
  buildSyntheticTest,
  withTimeout,
  MINI_DIAGNOSTIC_TEST_ID,
  MINI_DIAGNOSTIC_PLAN_SOURCE,
} from '../finishMiniDiagnostic';
import { persistDeterministicArtifact } from '../../hybridStudyPlanService';
import { recordSkillAttemptsBatch } from '../../skillService';
import { saveDiagnosticSittingSnapshot } from '../../practiceTestService';

jest.mock('../../hybridStudyPlanService', () => ({
  persistDeterministicArtifact: jest.fn(),
}));
jest.mock('../../skillService', () => ({
  recordSkillAttemptsBatch: jest.fn(),
}));
jest.mock('../../practiceTestService', () => ({
  saveDiagnosticSittingSnapshot: jest.fn(),
}));

const USER = {
  uid: 'test-uid-finish',
  targetScore: 1300,
  testDate: '2026-10-03',
};

/** Serve a full 24-item session the way the shell would. */
async function buildServedSession() {
  const plan = await buildMiniDiagnosticPlan({
    userId: USER.uid,
    attemptId: 'attempt-finish-test',
    excludeIds: [],
  });
  // Answer stage 1 with a deliberate split so stage 2 has weak domains to
  // target: first 4 of each section correct, last 4 wrong.
  const stage1Answers = (items, modIdx) => {
    const answers = {};
    items.forEach((q, qIdx) => {
      answers[`${modIdx}-${qIdx}`] = qIdx < 4
        ? q.correctAnswer
        : (q.choices.find(c => c.id !== q.correctAnswer)?.id || 'A');
    });
    return answers;
  };
  const rwAnswers = stage1Answers(plan.rw.stage1, 0);
  const mathAnswers = stage1Answers(plan.math.stage1, 1);

  const byId = (items, answers, modIdx) => {
    const out = {};
    items.forEach((q, qIdx) => { out[q.id] = answers[`${modIdx}-${qIdx}`]; });
    return out;
  };
  const rwServed = [
    ...plan.rw.stage1,
    ...selectStage2(plan.rw.stage1, byId(plan.rw.stage1, rwAnswers, 0), plan.rw.stage2Pools),
  ];
  const mathServed = [
    ...plan.math.stage1,
    ...selectStage2(plan.math.stage1, byId(plan.math.stage1, mathAnswers, 1), plan.math.stage2Pools),
  ];

  // Answer the stage-2 items too (alternate right/wrong).
  const answers = { ...rwAnswers, ...mathAnswers };
  const telemetry = {};
  [rwServed, mathServed].forEach((served, modIdx) => {
    served.forEach((q, qIdx) => {
      const key = `${modIdx}-${qIdx}`;
      if (answers[key] === undefined && qIdx >= 8) {
        answers[key] = qIdx % 2 === 0
          ? q.correctAnswer
          : (q.choices.find(c => c.id !== q.correctAnswer)?.id || 'A');
      }
      telemetry[key] = {
        timeSpent: 30 + qIdx,
        visits: 1,
        answerChanges: [{ from: null, to: answers[key], timestamp: 1000 + qIdx }],
        markedForReview: false,
        usedCalculator: false,
      };
    });
  });

  return { rwServed, mathServed, answers, telemetry };
}

describe('finishMiniDiagnostic (real engine, mocked persistence)', () => {
  beforeEach(() => {
    persistDeterministicArtifact.mockResolvedValue({ artifactId: 'artifact-1' });
    recordSkillAttemptsBatch.mockResolvedValue(undefined);
    saveDiagnosticSittingSnapshot.mockResolvedValue('attempt');
  });

  it('produces a tagged starter plan with drill routing and an honest band', async () => {
    const { rwServed, mathServed, answers, telemetry } = await buildServedSession();

    const result = await finishMiniDiagnostic({
      user: USER,
      rwQuestions: rwServed,
      mathQuestions: mathServed,
      answers,
      telemetry,
      eliminatedChoices: {},
      attemptId: 'attempt-finish-test',
      answeredQuestionIds: [],
    });

    // Plan identity + framing tags
    expect(result.plan.planSource).toBe(MINI_DIAGNOSTIC_PLAN_SOURCE);
    expect(result.plan.basedOnTest).toBe(MINI_DIAGNOSTIC_TEST_ID);
    expect(Array.isArray(result.plan.weeks) || Array.isArray(result.plan.weeklyPlan)).toBe(true);

    // The real diagnosis ran: weaknesses exist (we answered 1/3 wrong) and
    // carry the section-tag contract.
    expect(result.groundTruth.weaknesses.length).toBeGreaterThan(0);
    result.groundTruth.weaknesses.forEach(w => {
      expect(['math', 'rw']).toContain(w.section || 'math');
    });

    // Honest composite band, never a point estimate.
    const band = result.scoreBand;
    expect(band.low).toBeGreaterThanOrEqual(400);
    expect(band.high).toBeLessThanOrEqual(1600);
    expect(band.high - band.low).toBeGreaterThanOrEqual(40);

    // Lean record: 24 item ids, both section folds, no question bodies.
    expect(result.miniDiagnosticRecord.itemIds).toHaveLength(24);
    expect(Object.keys(result.miniDiagnosticRecord.domains.rw).length).toBeGreaterThan(0);
    expect(Object.keys(result.miniDiagnosticRecord.domains.math).length).toBeGreaterThan(0);
    expect(result.miniDiagnosticRecord.totalCount).toBe(24);
    expect(JSON.stringify(result.miniDiagnosticRecord)).not.toContain('choices');

    // Persistence: artifact written once with the synthetic source id;
    // skill seeding fired with one entry per skill-tagged question.
    expect(persistDeterministicArtifact).toHaveBeenCalledTimes(1);
    expect(persistDeterministicArtifact).toHaveBeenCalledWith(
      USER.uid,
      expect.objectContaining({ planSource: MINI_DIAGNOSTIC_PLAN_SOURCE }),
      expect.objectContaining({ sourceTestId: MINI_DIAGNOSTIC_TEST_ID }),
    );
    expect(recordSkillAttemptsBatch).toHaveBeenCalledTimes(1);
    const [, skillEntries] = recordSkillAttemptsBatch.mock.calls[0];
    expect(skillEntries.length).toBeGreaterThanOrEqual(20);

    // NEVER a practiceTestResults write — that path is mocked out entirely
    // here, but pin the absence of any score history field on the record.
    expect(result.miniDiagnosticRecord.bestScaledScore).toBeUndefined();
  });

  it('buildSyntheticTest keeps official section order (R&W then Math)', () => {
    const test = buildSyntheticTest([{ id: 'rw1' }], [{ id: 'm1' }]);
    expect(test.modules[0].section).toBe('reading-writing');
    expect(test.modules[1].section).toBe('math');
    expect(test.id).toBe(MINI_DIAGNOSTIC_TEST_ID);
    expect(test.isMiniDiagnostic).toBe(true);
  });

  it('throws without a user id (caller bug guard)', async () => {
    await expect(finishMiniDiagnostic({ user: null, rwQuestions: [], mathQuestions: [], answers: {} }))
      .rejects.toThrow('user.uid required');
  });
});

describe('withTimeout (offline-write hang guard)', () => {
  // Firestore writes hang forever offline (memory persistence never rejects);
  // the artifact write is raced against this timer so the shell's error
  // screen — whose "Try again" re-runs the finish — actually fires.
  it('rejects a never-settling write with save-timeout', async () => {
    await expect(withTimeout(new Promise(() => {}), 20)).rejects.toThrow('save-timeout');
  });

  it('passes a resolving write through untouched', async () => {
    await expect(withTimeout(Promise.resolve('ok'), 1000)).resolves.toBe('ok');
  });

  it('propagates a real write rejection (not masked by the timer)', async () => {
    await expect(withTimeout(Promise.reject(new Error('permission-denied')), 1000))
      .rejects.toThrow('permission-denied');
  });
});

// ─── Diagnostic v2: runner-hosted (effectiveTest) path ───────────────────────
// The v2 diagnostic runs inside the real PracticeTest runner: 4 modules,
// adaptive M2 per section, answers keyed to the RUNNER's modIdx-qIdx space.
// These tests drive finishMiniDiagnostic exactly the way the runner does.
const { buildDiagnosticTest } = require('../buildDiagnosticTest');
const { findFirestoreHostileValues } = require('../../../utils/firestoreSafe');

/** Answer a runner-shaped test: `fraction` of each module correct, rest wrong. */
function answerRunnerTest(modules, fraction = 0.5) {
  const answers = {};
  const telemetry = {};
  modules.forEach((mod, modIdx) => {
    mod.questions.forEach((q, qIdx) => {
      const key = `${modIdx}-${qIdx}`;
      const right = qIdx < Math.round(mod.questions.length * fraction);
      if (q.type === 'fill-in') {
        answers[key] = right ? String(q.correctAnswer) : '999999';
      } else {
        answers[key] = right
          ? q.correctAnswer
          : (q.choices.find((c) => c.id !== q.correctAnswer)?.id || 'A');
      }
      telemetry[key] = {
        timeSpent: 40 + qIdx,
        visits: 1,
        answerChanges: [{ from: null, to: answers[key], timestamp: 1000 + qIdx }],
        markedForReview: false,
        usedCalculator: false,
      };
    });
  });
  return { answers, telemetry };
}

describe('finishMiniDiagnostic — Diagnostic v2 runner path', () => {
  beforeEach(() => {
    persistDeterministicArtifact.mockResolvedValue({ artifactId: 'artifact-v2' });
    recordSkillAttemptsBatch.mockResolvedValue(undefined);
    saveDiagnosticSittingSnapshot.mockResolvedValue('attempt');
  });

  it('folds a 4-module effectiveTest into per-section domains and a full record', async () => {
    const { test } = await buildDiagnosticTest({ userId: USER.uid, attemptId: 'v2-finish-1' });
    const { answers, telemetry } = answerRunnerTest(test.modules, 0.6);

    const result = await finishMiniDiagnostic({
      user: USER,
      effectiveTest: test,
      answers,
      telemetry,
      attemptId: 'v2-finish-1',
      routes: { rw: 'hard', math: 'hard' },
      navigation: { navigationPattern: 'strategic-skip', totalNavigationEvents: 7 },
    });

    const rec = result.miniDiagnosticRecord;
    expect(rec.totalCount).toBe(40);
    expect(rec.itemIds).toHaveLength(40);
    expect(rec.diagnosticVariant).toBe('full');
    expect(rec.routes).toEqual({ rw: 'hard', math: 'hard' });
    // Domain folds span BOTH modules of each section (20 items per section).
    const sum = (domains) => Object.values(domains).reduce((s, d) => s + d.total, 0);
    expect(sum(rec.domains.rw)).toBe(20);
    expect(sum(rec.domains.math)).toBe(20);
    // The record carries a lean copy of what the results screen showed, so
    // the dashboard can re-open the diagnosis later (2026-08-24). It must
    // agree with the live pipeline output it was cut from.
    expect(rec.diagnosis).toBeDefined();
    expect(rec.diagnosis.headline).toBe(result.plan.summary.headline);
    expect(rec.diagnosis.keyInsight.title).toBe(result.plan.summary.keyInsight.title);
    expect(rec.diagnosis.errorPatterns.totalWrong).toBe(result.diagReport.errorPatterns.totalWrong);
    expect(rec.diagnosis.weaknesses.length).toBeGreaterThan(0);
    expect(rec.diagnosis.weaknesses.length).toBeLessThanOrEqual(4);
    expect(rec.diagnosis.weaknesses[0].skill).toBe(result.groundTruth.weaknesses[0].skill);
    expect(rec.diagnosis.weaknesses[0].evidence).toBe(result.groundTruth.weaknesses[0].evidence);
    expect(rec.diagnosis.strengths.length).toBeLessThanOrEqual(3);
    // Pace counts for Home's pacing tile: every served item lands in exactly
    // one bucket.
    const pace = rec.diagnosis.pacing;
    expect(pace.total).toBe(40);
    expect(pace.onPace + pace.rushed + pace.slow).toBe(40);
    expect(pace.avgSeconds).toBeGreaterThan(0);
    // Lean: no question payloads, no drill-routing arrays, nothing undefined.
    expect(JSON.stringify(rec.diagnosis)).not.toContain('missedPatterns');
    expect(JSON.stringify(rec.diagnosis)).not.toContain('choices');
    // The FULL sitting goes to the per-attempt snapshot (same shape as a
    // practice-test attempt) so "View your diagnosis" can rebuild the whole
    // report later; the lean record just flags that it exists.
    expect(rec.sittingSaved).toBe(true);
    expect(saveDiagnosticSittingSnapshot).toHaveBeenCalledTimes(1);
    const [uid, payload] = saveDiagnosticSittingSnapshot.mock.calls[0];
    expect(uid).toBe(USER.uid);
    expect(payload.attemptId).toBe('v2-finish-1');
    expect(payload.diagnosticVariant).toBe('full');
    expect(payload.questionsSnapshot).toHaveLength(40);
    expect(payload.questionsSnapshot[0]).toEqual(expect.objectContaining({ moduleIndex: 0, questionIndex: 0, section: 'reading-writing' }));
    expect(payload.questionsSnapshot.every((q) => q.correctAnswer != null && Array.isArray(q.skills))).toBe(true);
    expect(payload.answers).toBe(answers);
    expect(Object.keys(payload.diagnosticData.questionDetails)).toHaveLength(40);
    expect(payload.diagnosticData.moduleTimeRemaining).toBeUndefined();
    expect(payload.scoreBand).toEqual(result.scoreBand);
    expect(payload.routes).toEqual({ rw: 'hard', math: 'hard' });
    // Real plan out the other side, artifact persisted through the real path.
    expect(result.plan.planSource).toBe(MINI_DIAGNOSTIC_PLAN_SOURCE);
    expect(persistDeterministicArtifact).toHaveBeenCalledWith(
      USER.uid,
      expect.anything(),
      expect.objectContaining({ sourceTestId: MINI_DIAGNOSTIC_TEST_ID }),
    );
    // Every served item seeds skillProgress evidence.
    expect(recordSkillAttemptsBatch).toHaveBeenCalledTimes(1);
    expect(recordSkillAttemptsBatch.mock.calls[0][1].length).toBeGreaterThanOrEqual(38);
  });

  it('scores an easy-routed section on the easy column (band never above hard)', async () => {
    const { test } = await buildDiagnosticTest({ userId: USER.uid, attemptId: 'v2-finish-2' });
    // Simulate the runner's easy swap for math: M2 slot replaced by the easy module.
    const easyModules = [...test.modules];
    easyModules[3] = { ...easyModules[3], ...test.module2Easy, title: easyModules[3].title, section: 'math' };
    const easyTest = { ...test, modules: easyModules };
    const { answers, telemetry } = answerRunnerTest(easyTest.modules, 1.0);

    const easyResult = await finishMiniDiagnostic({
      user: USER, effectiveTest: easyTest, answers, telemetry,
      attemptId: 'v2-finish-2e', routes: { rw: 'hard', math: 'easy' },
    });
    // A perfect run on the EASY route must cap below the hard ceiling (the
    // easy raw→scaled column tops out ~600, mirroring real adaptive scoring).
    expect(easyResult.scoreBand.mathBand.high).toBeLessThanOrEqual(650);
    expect(easyResult.miniDiagnosticRecord.routes.math).toBe('easy');
  });

  it('a failed sitting-snapshot write degrades to sittingSaved:false, never fails the finish', async () => {
    saveDiagnosticSittingSnapshot.mockRejectedValue(new Error('offline'));
    const { test } = await buildDiagnosticTest({ userId: USER.uid, attemptId: 'v2-snap-fail' });
    const { answers, telemetry } = answerRunnerTest(test.modules, 0.6);
    const result = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers, telemetry, attemptId: 'v2-snap-fail',
      routes: { rw: 'hard', math: 'hard' },
    });
    expect(result.plan.planSource).toBe(MINI_DIAGNOSTIC_PLAN_SOURCE);
    expect(result.miniDiagnosticRecord.sittingSaved).toBe(false);
    expect(persistDeterministicArtifact).toHaveBeenCalledTimes(1);
  });

  it('widens the band on a thin sitting (under 80% answered)', async () => {
    const { test } = await buildDiagnosticTest({ userId: USER.uid, attemptId: 'v2-finish-3' });
    const full = answerRunnerTest(test.modules, 0.5);
    // Thin sitting: drop 40% of the answers (24/40 answered = 60% < 80%).
    const thinAnswers = {};
    Object.entries(full.answers).forEach(([k, v], i) => {
      if (i % 5 < 3) thinAnswers[k] = v;
    });

    const fullResult = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers: full.answers,
      telemetry: full.telemetry, attemptId: 'v2-3a', routes: { rw: 'hard', math: 'hard' },
    });
    const thinResult = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers: thinAnswers,
      telemetry: full.telemetry, attemptId: 'v2-3b', routes: { rw: 'hard', math: 'hard' },
    });

    const width = (b) => b.high - b.low;
    expect(width(thinResult.scoreBand)).toBeGreaterThan(width(fullResult.scoreBand));
  });

  it('the v2 record is Firestore-safe (no Sets/Maps/undefined/nested arrays)', async () => {
    const { test } = await buildDiagnosticTest({ userId: USER.uid, attemptId: 'v2-finish-4' });
    const { answers, telemetry } = answerRunnerTest(test.modules, 0.4);
    const result = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers, telemetry,
      attemptId: 'v2-finish-4', routes: { rw: 'hard', math: 'hard' },
    });
    const hostile = findFirestoreHostileValues(result.miniDiagnosticRecord, 'record');
    expect(hostile).toEqual({
      nestedArrays: [], undefinedValues: [], nonFinite: [], customObjects: [],
    });
  });

  it('check-in: the plan anchors on scoreAnchor, never the focus-weighted center', async () => {
    const { test } = await buildDiagnosticTest({
      userId: USER.uid, attemptId: 'v2-anchor-1', variant: 'checkin',
    });
    const { answers, telemetry } = answerRunnerTest(test.modules, 0.4);
    const result = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers, telemetry,
      attemptId: 'v2-anchor-1', routes: { rw: null, math: null },
      scoreAnchor: 980,
    });
    // The arc (and the whole gap basis) starts from the trusted prior
    // midpoint — a deflated check-in center must never become "Estimated now".
    expect(result.plan.arc.startScore).toBe(980);
    // The record's own band stays flagged as focus-weighted regardless.
    expect(result.miniDiagnosticRecord.scoreBandFocusWeighted).toBe(true);
  });

  it('check-in without an anchor falls back to its own band midpoint', async () => {
    const { test } = await buildDiagnosticTest({
      userId: USER.uid, attemptId: 'v2-anchor-2', variant: 'checkin',
    });
    const { answers, telemetry } = answerRunnerTest(test.modules, 0.4);
    const result = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers, telemetry,
      attemptId: 'v2-anchor-2', routes: { rw: null, math: null },
    });
    const mid = Math.round((result.scoreBand.low + result.scoreBand.high) / 2 / 10) * 10;
    expect(result.plan.arc.startScore).toBe(mid);
  });

  it('full variant ignores scoreAnchor (its band IS representative)', async () => {
    const { test } = await buildDiagnosticTest({ userId: USER.uid, attemptId: 'v2-anchor-3' });
    const { answers, telemetry } = answerRunnerTest(test.modules, 0.4);
    const result = await finishMiniDiagnostic({
      user: USER, effectiveTest: test, answers, telemetry,
      attemptId: 'v2-anchor-3', routes: { rw: 'hard', math: 'hard' },
      scoreAnchor: 1400,
    });
    const mid = Math.round((result.scoreBand.low + result.scoreBand.high) / 2 / 10) * 10;
    expect(result.plan.arc.startScore).toBe(mid);
    expect(result.plan.arc.startScore).not.toBe(1400);
  });

  it('v1 shell path is unchanged: no variant/routes fields on its record', async () => {
    const { rwServed, mathServed, answers, telemetry } = await buildServedSession();
    const result = await finishMiniDiagnostic({
      user: USER, rwQuestions: rwServed, mathQuestions: mathServed,
      answers, telemetry, attemptId: 'v1-compat',
    });
    expect(result.miniDiagnosticRecord.diagnosticVariant).toBeUndefined();
    expect(result.miniDiagnosticRecord.routes).toBeUndefined();
    expect(result.miniDiagnosticRecord.totalCount).toBe(24);
  });
});
