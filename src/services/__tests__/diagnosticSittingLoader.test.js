import { loadDiagnosticSitting, rebuildSittingTest, rebuildLegacySitting, DIAGNOSTIC_SITTING_TEST_ID } from '../diagnosticSittingLoader';
import { loadAttemptSnapshot } from '../practiceTestService';
import { rebuildDiagnosticTest } from '../miniDiagnostic/buildDiagnosticTest';

jest.mock('../practiceTestService', () => ({ loadAttemptSnapshot: jest.fn() }));
jest.mock('../miniDiagnostic/buildDiagnosticTest', () => ({
  ...jest.requireActual('../miniDiagnostic/buildDiagnosticTest'),
  rebuildDiagnosticTest: jest.fn(),
}));

const LEGACY_RECORD = {
  attemptId: 'legacy-1',
  completedAt: '2026-08-22T18:00:33.363Z',
  diagnosticVariant: 'full',
  itemIds: [
    ...Array.from({ length: 20 }, (_, i) => `rw-${i + 1}`),
    ...Array.from({ length: 20 }, (_, i) => `m-${i + 1}`),
  ],
  scoreBand: { low: 1360, high: 1440 },
  routes: { rw: 'hard', math: 'hard' },
};
const BUILT = {
  id: 'mini-diagnostic',
  isDiagnostic: true,
  diagnosticVariant: 'full',
  title: 'SEVA Diagnostic',
  modules: [{ title: 'Reading and Writing Module 1', section: 'reading-writing', timeLimit: 12, questions: [{ id: 'rw-1' }] }],
  diagnosticManifest: { version: 1 },
  module2Easy: { questions: [] },
};

const SNAP = {
  isDiagnostic: true,
  testId: 'mini-diagnostic-v1',
  diagnosticVariant: 'full',
  completedAt: '2026-08-24T00:00:00.000Z',
  questionsSnapshot: [
    { id: 'rw-2', type: 'mc', stem: 'Second R&W', choices: [{ id: 'A', text: 'a' }], correctAnswer: 'A', skills: ['transitions'], domain: 'expression-of-ideas', section: 'reading-writing', moduleIndex: 0, questionIndex: 1, passage: 'P2' },
    { id: 'rw-1', type: 'mc', stem: 'First R&W', choices: [{ id: 'A', text: 'a' }], correctAnswer: 'B', skills: ['inferences'], domain: 'information-and-ideas', section: 'reading-writing', moduleIndex: 0, questionIndex: 0, passage: 'P1' },
    { id: 'm-1', type: 'spr', stem: 'x=?', choices: null, correctAnswer: '4', skills: ['linear-equations'], domain: 'algebra', section: 'math', moduleIndex: 1, questionIndex: 0, questionTable: { rows: [['a', 'b']] } },
  ],
  answers: { '0-0': 'B', '0-1': 'C', '1-0': '4' },
  diagnosticData: { questionDetails: { '0-0': { timeSpent: 30 } }, navigationPattern: 'linear' },
  scoreBand: { low: 1000, high: 1100 },
  routes: { rw: 'hard', math: 'easy' },
};

describe('rebuildSittingTest', () => {
  it('regroups the flat snapshot into ordered modules with the runner/engine question shape', () => {
    const test = rebuildSittingTest(SNAP);
    expect(test.id).toBe('mini-diagnostic-v1');
    expect(test.isMiniDiagnostic).toBe(true);
    expect(test.modules).toHaveLength(2);
    expect(test.modules[0].section).toBe('reading-writing');
    expect(test.modules[0].title).toBe('Reading & Writing Module 1');
    // questionIndex wins over array order.
    expect(test.modules[0].questions.map((q) => q.id)).toEqual(['rw-1', 'rw-2']);
    expect(test.modules[0].questions[0]).toEqual(expect.objectContaining({ question: 'First R&W', stem: 'First R&W', passage: 'P1', correctAnswer: 'B', domain: 'information-and-ideas' }));
    expect(test.modules[1].section).toBe('math');
    expect(test.modules[1].questions[0].questionTable).toEqual({ rows: [['a', 'b']] });
  });

  it('returns null without questions', () => {
    expect(rebuildSittingTest(null)).toBeNull();
    expect(rebuildSittingTest({ questionsSnapshot: [] })).toBeNull();
  });
});

describe('loadDiagnosticSitting', () => {
  it('returns the rebuilt triple for a diagnostic snapshot', async () => {
    loadAttemptSnapshot.mockResolvedValue(SNAP);
    const out = await loadDiagnosticSitting({ userId: 'u1', attemptId: 'a1' });
    expect(loadAttemptSnapshot).toHaveBeenCalledWith('u1', 'a1');
    expect(out.test.id).toBe(DIAGNOSTIC_SITTING_TEST_ID);
    expect(out.answers).toEqual(SNAP.answers);
    expect(out.diagnosticData).toBe(SNAP.diagnosticData);
    expect(out.scoreBand).toEqual({ low: 1000, high: 1100 });
    expect(out.routes).toEqual({ rw: 'hard', math: 'easy' });
    expect(out.attemptId).toBe('a1');
  });

  it('is null for a missing doc, a practice-test attempt, or missing ids', async () => {
    loadAttemptSnapshot.mockResolvedValue(null);
    expect(await loadDiagnosticSitting({ userId: 'u1', attemptId: 'a1' })).toBeNull();
    loadAttemptSnapshot.mockResolvedValue({ ...SNAP, isDiagnostic: undefined });
    expect(await loadDiagnosticSitting({ userId: 'u1', attemptId: 'a1' })).toBeNull();
    expect(await loadDiagnosticSitting({ userId: 'u1' })).toBeNull();
    expect(await loadDiagnosticSitting({})).toBeNull();
  });
});


describe('legacy fallback (record with item ids, no snapshot)', () => {
  beforeEach(() => { loadAttemptSnapshot.mockReset(); rebuildDiagnosticTest.mockReset(); });

  it('rebuilds the exact questions with empty answers and answersMissing', async () => {
    rebuildDiagnosticTest.mockResolvedValue(BUILT);
    const sitting = await rebuildLegacySitting(LEGACY_RECORD);
    const manifest = rebuildDiagnosticTest.mock.calls[0][0];
    expect(manifest.modules).toHaveLength(4);
    expect(manifest.modules[0].itemIds).toEqual(LEGACY_RECORD.itemIds.slice(0, 10));
    expect(manifest.modules[3].itemIds).toEqual(LEGACY_RECORD.itemIds.slice(30, 40));
    expect(sitting.answers).toEqual({});
    expect(sitting.answersMissing).toBe(true);
    expect(sitting.attemptId).toBe('legacy-1');
    expect(sitting.completedAt).toBe(LEGACY_RECORD.completedAt);
    expect(sitting.scoreBand).toEqual(LEGACY_RECORD.scoreBand);
    // Review-shaped test: no live-runner hooks ride along.
    expect(sitting.test.id).toBe(DIAGNOSTIC_SITTING_TEST_ID);
    expect(sitting.test.isMiniDiagnostic).toBe(true);
    expect(sitting.test.isDiagnostic).toBeUndefined();
    expect(sitting.test.diagnosticManifest).toBeUndefined();
    expect(sitting.test.module2Easy).toBeUndefined();
    expect(sitting.test.modules[0].questions[0].id).toBe('rw-1');
  });

  it('loadDiagnosticSitting falls back to the record when the snapshot is absent', async () => {
    loadAttemptSnapshot.mockResolvedValue(null);
    rebuildDiagnosticTest.mockResolvedValue(BUILT);
    const sitting = await loadDiagnosticSitting({ userId: 'u', attemptId: 'legacy-1', record: LEGACY_RECORD });
    expect(loadAttemptSnapshot).toHaveBeenCalledWith('u', 'legacy-1');
    expect(sitting.answersMissing).toBe(true);
  });

  it('skips the snapshot read when the record says the write failed', async () => {
    rebuildDiagnosticTest.mockResolvedValue(BUILT);
    const sitting = await loadDiagnosticSitting({ userId: 'u', attemptId: 'legacy-1', record: LEGACY_RECORD, snapshotSaved: false });
    expect(loadAttemptSnapshot).not.toHaveBeenCalled();
    expect(sitting.answersMissing).toBe(true);
  });

  it('prefers the snapshot when it exists', async () => {
    loadAttemptSnapshot.mockResolvedValue(SNAP);
    const sitting = await loadDiagnosticSitting({ userId: 'u', attemptId: 'a', record: LEGACY_RECORD });
    expect(rebuildDiagnosticTest).not.toHaveBeenCalled();
    expect(sitting.answersMissing).toBeUndefined();
    expect(sitting.answers).toEqual(SNAP.answers);
  });

  it('is null when the ids do not fit the blueprint or have left the banks', async () => {
    expect(await rebuildLegacySitting({ ...LEGACY_RECORD, itemIds: LEGACY_RECORD.itemIds.slice(0, 39) })).toBeNull();
    expect(await rebuildLegacySitting({ ...LEGACY_RECORD, itemIds: undefined })).toBeNull();
    rebuildDiagnosticTest.mockResolvedValue(null);
    expect(await rebuildLegacySitting(LEGACY_RECORD)).toBeNull();
    loadAttemptSnapshot.mockResolvedValue(null);
    expect(await loadDiagnosticSitting({ userId: 'u', attemptId: 'x' })).toBeNull();
  });
});
