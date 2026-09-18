/**
 * Tests for recordPracticeTestResult + loadAttemptSnapshot.
 *
 * Firestore is mocked with a small in-memory shim so we can verify:
 *  - main aggregate doc + per-attempt subcollection doc are written together
 *    via writeBatch (atomic)
 *  - trimAttempts strips diagnosticData/Report from non-latest attempts but
 *    leaves subcollection snapshots untouched
 *  - loadAttemptSnapshot returns the snapshot for an existing attemptId, null
 *    otherwise (legacy attempt)
 *  - missing questionsSnapshot logs a warning and skips the snapshot write but
 *    still writes the main doc
 *
 * NOTE on Jest hoisting: jest.mock() factories run before module-level vars
 * are initialized, so all helpers used by the mock live INSIDE the factory.
 * Tests grab the in-memory store via getMockStore() exported from the mock.
 */

jest.mock('../../firebase/config', () => ({ db: { __isFakeDb: true } }));

jest.mock('firebase/firestore', () => {
  // Variables prefixed with `mock` are the only out-of-scope refs jest's babel
  // plugin allows — but here we keep everything self-contained instead.
  const store = new Map();
  let nextBatchShouldFail = false;

  const deepClone = (v) => {
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) return v.map(deepClone);
    const out = {};
    Object.keys(v).forEach(k => { out[k] = deepClone(v[k]); });
    return out;
  };

  const isDeleteSentinel = (v) => !!v && typeof v === 'object' && v.__deleteField === true;

  // update() semantics: dotted keys are nested field PATHS (faithful to the
  // real SDK, which only splits dots in update — never in set).
  const applyDotted = (target, updates) => {
    const out = deepClone(target);
    Object.entries(updates).forEach(([key, value]) => {
      if (!key.includes('.')) {
        if (isDeleteSentinel(value)) { delete out[key]; return; }
        out[key] = deepClone(value);
        return;
      }
      const parts = key.split('.');
      let cursor = out;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!cursor[part] || typeof cursor[part] !== 'object') {
          if (isDeleteSentinel(value)) return; // nothing to delete along a missing path
          cursor[part] = {};
        }
        cursor = cursor[part];
      }
      if (isDeleteSentinel(value)) { delete cursor[parts[parts.length - 1]]; return; }
      cursor[parts[parts.length - 1]] = deepClone(value);
    });
    return out;
  };

  // set()+merge semantics: keys are LITERAL (a dotted key becomes a top-level
  // field whose NAME contains the dot — the real-SDK trap the service code
  // must avoid); plain-object values deep-merge, everything else replaces.
  const mergeLiteral = (target, patch) => {
    const isPlainObj = (v) => !!v && typeof v === 'object' && !Array.isArray(v);
    const out = deepClone(target);
    Object.entries(patch).forEach(([key, value]) => {
      if (isDeleteSentinel(value)) { delete out[key]; return; }
      out[key] = (isPlainObj(value) && isPlainObj(out[key]))
        ? mergeLiteral(out[key], value)
        : deepClone(value);
    });
    return out;
  };

  class FakeWriteBatch {
    constructor() { this.ops = []; }
    set(ref, data, options) {
      this.ops.push({ kind: 'set', path: ref.__path, data, merge: !!options?.merge });
    }
    update(ref, data) {
      this.ops.push({ kind: 'update', path: ref.__path, data });
    }
    delete(ref) {
      this.ops.push({ kind: 'delete', path: ref.__path });
    }
    async commit() {
      if (nextBatchShouldFail) {
        nextBatchShouldFail = false;
        throw new Error('Simulated batch commit failure');
      }
      const rollback = new Map(store);
      try {
        for (const op of this.ops) {
          if (op.kind === 'set') {
            if (op.merge) {
              const existing = store.get(op.path) || {};
              store.set(op.path, mergeLiteral(existing, op.data));
            } else {
              store.set(op.path, deepClone(op.data));
            }
          } else if (op.kind === 'update') {
            const existing = store.get(op.path) || {};
            store.set(op.path, applyDotted(existing, op.data));
          } else if (op.kind === 'delete') {
            store.delete(op.path);
          }
        }
      } catch (err) {
        store.clear();
        rollback.forEach((v, k) => store.set(k, v));
        throw err;
      }
    }
  }

  return {
    // ── test helpers (not exported by the real firebase/firestore module) ──
    __getStore: () => store,
    __resetStore: () => { store.clear(); nextBatchShouldFail = false; },
    __setBatchShouldFail: (v) => { nextBatchShouldFail = v; },

    // ── Firestore API surface ────────────────────────────────────────────
    doc: (...args) => ({ __path: args.slice(1).join('/') }),
    collection: (...args) => ({ __path: args.slice(1).join('/') }),
    getDoc: async (ref) => {
      const data = store.get(ref.__path);
      return {
        exists: () => data !== undefined,
        data: () => deepClone(data),
        id: ref.__path.split('/').pop(),
      };
    },
    setDoc: async (ref, data, options) => {
      if (options?.merge) {
        const existing = store.get(ref.__path) || {};
        store.set(ref.__path, mergeLiteral(existing, data));
      } else {
        store.set(ref.__path, deepClone(data));
      }
    },
    updateDoc: async (ref, data) => {
      const existing = store.get(ref.__path) || {};
      store.set(ref.__path, applyDotted(existing, data));
    },
    serverTimestamp: () => ({ __serverTimestamp: true }),
    arrayUnion: (...items) => ({ __arrayUnion: items }),
    deleteField: () => ({ __deleteField: true }),
    addDoc: async (colRef, data) => {
      const id = `auto-${Math.random().toString(36).slice(2, 10)}`;
      store.set(`${colRef.__path}/${id}`, deepClone(data));
      return { id };
    },
    query: (...args) => ({ __query: args }),
    where: (...args) => ({ __where: args }),
    orderBy: (...args) => ({ __orderBy: args }),
    limit: (n) => ({ __limit: n }),
    getDocs: async (qOrCol) => {
      // Store-aware: returns the direct child docs of a collection path so the
      // study-plan re-point (which queries studyPlanArtifacts) can be tested.
      // orderBy isn't honored — tests seed in the desired order (Map preserves
      // insertion order). Returns empty for unknown/missing collection refs.
      const colRef = qOrCol && qOrCol.__query ? qOrCol.__query[0] : qOrCol;
      const base = colRef && colRef.__path;
      if (!base) return { empty: true, docs: [] };
      const docs = [];
      for (const [path, value] of store.entries()) {
        if (path.startsWith(base + '/')) {
          const rest = path.slice(base.length + 1);
          if (rest.indexOf('/') === -1) {
            docs.push({ id: rest, data: () => deepClone(value), exists: () => true });
          }
        }
      }
      return { empty: docs.length === 0, docs };
    },
    writeBatch: () => new FakeWriteBatch(),
    // Transaction shim: get() reads the live store, set/update() buffer ops that
    // are applied atomically after the callback (mirrors FakeWriteBatch.commit).
    // Reuses nextBatchShouldFail so the existing failure/rollback test still
    // simulates a commit failure for the now-transactional save path.
    runTransaction: async (database, updateFn) => {
      const ops = [];
      const txn = {
        get: async (ref) => {
          const data = store.get(ref.__path);
          return {
            exists: () => data !== undefined,
            data: () => (data === undefined ? undefined : deepClone(data)),
            id: ref.__path.split('/').pop(),
          };
        },
        set: (ref, data, options) => { ops.push({ kind: 'set', path: ref.__path, data, merge: !!options?.merge }); },
        update: (ref, data) => { ops.push({ kind: 'update', path: ref.__path, data }); },
      };
      const result = await updateFn(txn);
      if (nextBatchShouldFail) {
        nextBatchShouldFail = false;
        throw new Error('Simulated transaction failure');
      }
      const rollback = new Map(store);
      try {
        for (const op of ops) {
          if (op.kind === 'set') {
            if (op.merge) {
              store.set(op.path, mergeLiteral(store.get(op.path) || {}, op.data));
            } else {
              store.set(op.path, deepClone(op.data));
            }
          } else if (op.kind === 'update') {
            store.set(op.path, applyDotted(store.get(op.path) || {}, op.data));
          }
        }
      } catch (err) {
        store.clear();
        rollback.forEach((v, k) => store.set(k, v));
        throw err;
      }
      return result;
    },
  };
});

// ── module under test (after jest.mock calls) ───────────────────────────────

const {
  recordPracticeTestResult,
  resetPracticeTest,
  removeTestAttempt,
  saveTestProgress,
  loadAttemptSnapshot,
  generateAttemptId,
  sanitizeForFirestore,
  restoreFromFirestore,
  SNAPSHOT_VERSION,
} = require('../practiceTestService');

const firestoreMock = require('firebase/firestore');
const getStore = () => firestoreMock.__getStore();

// pendingTestSaveQueue is a pure localStorage module (not mocked) — used to
// verify the reset flow purges the offline queue against real jsdom storage.
const { enqueuePendingSave, readPendingSaves } = require('../pendingTestSaveQueue');

// ── helpers ─────────────────────────────────────────────────────────────────

const buildSnapshot = (count = 4) => {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      id: `q-${i}`,
      type: 'mcq',
      stem: `Question ${i}: solve $x = ${i}$`,
      choices: [
        { id: 'A', text: 'A' },
        { id: 'B', text: 'B' },
        { id: 'C', text: 'C' },
        { id: 'D', text: 'D' },
      ],
      correctAnswer: 'A',
      explanation: `Explanation ${i}`,
      difficulty: 'easy',
      band: 3,
      skills: ['linear-equations'],
      moduleIndex: 0,
      questionIndex: i,
    });
  }
  return out;
};

const buildResults = (overrides = {}) => ({
  attemptId: 'attempt-fixed-1',
  rawScore: 18,
  totalQuestions: 22,
  scaledScore: 620,
  timedMode: true,
  moduleScores: [
    { module: 1, correct: 18, total: 22, scaledScore: 320 },
  ],
  diagnosticData: { questionDetails: {} },
  diagnosticReport: { score: { scaled: 620 } },
  scoringVersion: 'v1',
  thetaEstimate: 0.5,
  standardError: 0.3,
  routeTaken: 'easy',
  questionsSnapshot: buildSnapshot(4),
  answers: { '0-0': 'A', '0-1': 'B' },
  ...overrides,
});

// Helper: pull the test row off the (properly nested) main doc
const getTestRow = (mainDoc, testId) => mainDoc?.practiceTestResults?.[testId];

beforeEach(() => {
  firestoreMock.__resetStore();
  jest.clearAllMocks();
});

// ── tests ───────────────────────────────────────────────────────────────────

describe('generateAttemptId', () => {
  test('returns a non-empty string and is unique across calls', () => {
    const a = generateAttemptId();
    const b = generateAttemptId();
    expect(typeof a).toBe('string');
    expect(a.length).toBeGreaterThan(5);
    expect(a).not.toBe(b);
  });
});

describe('recordPracticeTestResult — new attempt', () => {
  test('writes main doc + per-attempt subcollection doc atomically', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1', buildResults());

    const main = getStore().get('progress/user-1');
    expect(main).toBeTruthy();
    expect(main.userId).toBe('user-1');
    const row = getTestRow(main, 'practice-test-1');
    expect(row).toBeTruthy();
    expect(row.attempts).toHaveLength(1);
    expect(row.attempts[0].attemptId).toBe('attempt-fixed-1');

    const snap = getStore().get('progress/user-1/attempts/attempt-fixed-1');
    expect(snap).toBeTruthy();
    expect(snap.attemptId).toBe('attempt-fixed-1');
    expect(snap.testId).toBe('practice-test-1');
    expect(snap.snapshotVersion).toBe(SNAPSHOT_VERSION);
    expect(snap.questionsSnapshot).toHaveLength(4);
    expect(snap.questionsSnapshot[0]).toMatchObject({
      id: 'q-0', type: 'mcq', correctAnswer: 'A', moduleIndex: 0, questionIndex: 0,
    });
    expect(snap.answers).toEqual({ '0-0': 'A', '0-1': 'B' });
  });

  test('throws when userId missing', async () => {
    await expect(
      recordPracticeTestResult(null, 'practice-test-1', 'Practice Test 1', buildResults())
    ).rejects.toThrow(/User ID is required/);
  });
});

describe('recordPracticeTestResult — update attempt', () => {
  test('appends a new subcollection doc per attempt (does not overwrite prior snapshots)', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'a-1', scaledScore: 540, rawScore: 16 }));
    // Move clock forward so trimAttempts ordering is deterministic
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'a-2', scaledScore: 660, rawScore: 19 }));

    const main = getStore().get('progress/user-1');
    const testRow = getTestRow(main, 'practice-test-1');
    expect(testRow.attempts).toHaveLength(2);
    expect(testRow.totalAttempts).toBe(2);
    expect(testRow.bestScaledScore).toBe(660);
    expect(testRow.bestRawScore).toBe(19);
    // Latest attempt sorts to index 0
    expect(testRow.attempts[0].attemptId).toBe('a-2');

    // Both subcollection docs survive — ONE PER ATTEMPT
    expect(getStore().get('progress/user-1/attempts/a-1')).toBeTruthy();
    expect(getStore().get('progress/user-1/attempts/a-2')).toBeTruthy();
  });

  test('keeps best scores when subsequent attempts score lower', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'a-1', scaledScore: 700, rawScore: 20 }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'a-2', scaledScore: 500, rawScore: 12 }));

    const main = getStore().get('progress/user-1');
    const testRow = getTestRow(main, 'practice-test-1');
    expect(testRow.bestScaledScore).toBe(700);
    expect(testRow.bestRawScore).toBe(20);
  });

  test('persists the scale signal (isMultiSection) at the test-row level for goal comparison (1.4)', async () => {
    // Single-section (math-only) attempt → row marked section-scale (create branch).
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'a-1', scaledScore: 620 }));
    let testRow = getTestRow(getStore().get('progress/user-1'), 'practice-test-1');
    expect(testRow.isMultiSection).toBe(false);

    // A later full-length (composite) attempt flips the row flag (update branch),
    // so the dashboard won't compare a 400-1600 composite against a section target.
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'a-2', scaledScore: 1280, isMultiSection: true }));
    testRow = getTestRow(getStore().get('progress/user-1'), 'practice-test-1');
    expect(testRow.isMultiSection).toBe(true);
  });
});

describe('recordPracticeTestResult — trimAttempts', () => {
  test('keeps only MAX_ATTEMPTS=5 in the main doc but preserves all subcollection snapshots', async () => {
    for (let i = 0; i < 7; i++) {
      // Stagger completedAt explicitly via real-time delays so trimAttempts ordering is deterministic
      await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
        buildResults({ attemptId: `a-${i}`, scaledScore: 500 + i, rawScore: 10 + i }));
      await new Promise(r => setTimeout(r, 3));
    }

    const main = getStore().get('progress/user-1');
    const testRow = getTestRow(main, 'practice-test-1');
    expect(testRow.attempts.length).toBe(5);
    expect(testRow.totalAttempts).toBe(7); // counter NOT trimmed

    // Newest first
    expect(testRow.attempts[0].attemptId).toBe('a-6');
    expect(testRow.attempts[4].attemptId).toBe('a-2');

    // Non-latest attempts keep aggregate fields but lose diagnosticReport/Data
    for (let i = 1; i < 5; i++) {
      expect(testRow.attempts[i].diagnosticReport).toBeUndefined();
      expect(testRow.attempts[i].diagnosticData).toBeUndefined();
      expect(testRow.attempts[i].attemptId).toBeTruthy();
    }
    // Latest keeps diagnosticData (read by trend/prediction services) but
    // strips diagnosticReport (regenerated on demand from diagnosticData by
    // App.jsx's ViewResults fallback) to keep the main doc under 1MB.
    expect(testRow.attempts[0].diagnosticReport).toBeUndefined();
    expect(testRow.attempts[0].diagnosticData).toBeTruthy();

    // ALL 7 subcollection snapshots survive — Review Answers can still find them
    for (let i = 0; i < 7; i++) {
      expect(getStore().get(`progress/user-1/attempts/a-${i}`)).toBeTruthy();
    }
  });
});

describe('recordPracticeTestResult — first-attempt payload safety (2026-08-13 Set-object data loss)', () => {
  // The bug: on a test's FIRST attempt the row was written WITHOUT trimAttempts,
  // so the full diagnosticReport — carrying live Set objects from the diagnostic
  // engine's internal skillMap — rode into the transaction. Firestore hard-
  // rejects Sets ("Unsupported field value: a custom Set object"), the whole
  // save failed, and the in-memory Retry replayed the same doomed payload
  // forever. Every user's first completion of any test hit the failure banner.

  const reportWithLiveSets = () => ({
    score: { scaled: 620 },
    skillAnalysis: {
      weakSkills: [],
      strongSkills: [],
      allSkills: [{ skillId: 'percents', missedPatterns: ['percent-change'] }],
      // Mimic the leaked internal aggregation state that caused the outage.
      skillMap: { percents: { missedPatternsSet: new Set(['percent-change']) } },
    },
  });

  test('FIRST attempt (new test row): diagnosticReport is stripped, so a Set inside it can never reach the write', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-9', 'Practice Test 9',
      buildResults({ diagnosticReport: reportWithLiveSets() }));

    const row = getTestRow(getStore().get('progress/user-1'), 'practice-test-9');
    expect(row.attempts).toHaveLength(1);
    expect(row.attempts[0].diagnosticReport).toBeUndefined();
    // diagnosticData (trend/prediction input) survives on the latest attempt.
    expect(row.attempts[0].diagnosticData).toBeTruthy();
  });

  test('FIRST attempt on a FRESH account (create-doc branch) also strips the report', async () => {
    // No prior progress doc at all — exercises the tx.set branch.
    await recordPracticeTestResult('brand-new-user', 'practice-test-1', 'Practice Test 1',
      buildResults({ diagnosticReport: reportWithLiveSets() }));

    const row = getTestRow(getStore().get('progress/brand-new-user'), 'practice-test-1');
    expect(row.attempts).toHaveLength(1);
    expect(row.attempts[0].diagnosticReport).toBeUndefined();
  });

  test('a Set anywhere else in the attempt payload is converted to a plain array (sanitize backstop)', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-9', 'Practice Test 9',
      buildResults({
        diagnosticData: { questionDetails: {}, oddFutureField: new Set(['a', 'b']) },
      }));

    const row = getTestRow(getStore().get('progress/user-1'), 'practice-test-9');
    expect(row.attempts[0].diagnosticData.oddFutureField).toEqual(['a', 'b']);
  });
});

describe('recordPracticeTestResult — missing snapshot', () => {
  test('logs warning and skips snapshot write when questionsSnapshot is absent', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const results = buildResults({ attemptId: 'no-snap-1' });
    delete results.questionsSnapshot;

    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1', results);

    // Main doc still written
    const main = getStore().get('progress/user-1');
    expect(main).toBeTruthy();
    expect(getTestRow(main, 'practice-test-1').attempts[0].attemptId).toBe('no-snap-1');

    // No subcollection doc
    expect(getStore().get('progress/user-1/attempts/no-snap-1')).toBeUndefined();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No questionsSnapshot provided')
    );
    warnSpy.mockRestore();
  });

  test('also skips snapshot when questionsSnapshot is an empty array', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'empty-snap', questionsSnapshot: [] }));

    expect(getStore().get('progress/user-1/attempts/empty-snap')).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('dotted-key merge trap — missing progress doc writes NESTED maps', () => {
  // set()+merge treats dotted keys as LITERAL field names (only update()
  // splits dots into paths), so the create branches must write nested
  // objects — a literal "practiceTestResults.practice-test-1" top-level
  // field would be invisible to every nested-map reader.
  test('recordPracticeTestResult creates a nested practiceTestResults map, no literal dotted field', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1', buildResults());

    const main = getStore().get('progress/user-1');
    expect(Object.keys(main).some((k) => k.includes('.'))).toBe(false);
    expect(main.practiceTestResults['practice-test-1'].totalAttempts).toBe(1);
  });

  test('saveTestProgress creates a nested inProgressTests map, no literal dotted field', async () => {
    await saveTestProgress('user-1', 'practice-test-1',
      { currentModule: 1, currentQuestion: 3, answers: { '0-0': 'A' }, isTimed: true });

    const main = getStore().get('progress/user-1');
    expect(Object.keys(main).some((k) => k.includes('.'))).toBe(false);
    expect(main.inProgressTests['practice-test-1']).toMatchObject({
      testId: 'practice-test-1', currentModule: 1, currentQuestion: 3,
    });
  });

  test('saveTestProgress on an EXISTING doc updates via dot path, keeping sibling in-progress tests', async () => {
    getStore().set('progress/user-1', {
      userId: 'user-1',
      inProgressTests: { 'practice-test-2': { testId: 'practice-test-2', currentModule: 0 } },
    });
    await saveTestProgress('user-1', 'practice-test-1', { currentModule: 2, answers: {} });

    const main = getStore().get('progress/user-1');
    expect(main.inProgressTests['practice-test-1']).toBeTruthy();
    expect(main.inProgressTests['practice-test-2']).toBeTruthy();
    expect(Object.keys(main).some((k) => k.includes('.'))).toBe(false);
  });
});

describe('recordPracticeTestResult — atomicity', () => {
  test('transaction failure rolls back: neither main nor snapshot is written', async () => {
    firestoreMock.__setBatchShouldFail(true);

    await expect(
      recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
        buildResults({ attemptId: 'will-fail' }))
    ).rejects.toThrow(/Simulated transaction failure/);

    // Verify NEITHER doc was created — atomic rollback
    expect(getStore().get('progress/user-1')).toBeUndefined();
    expect(getStore().get('progress/user-1/attempts/will-fail')).toBeUndefined();
  });
});

describe('recordPracticeTestResult — attemptId idempotency', () => {
  test('recording the SAME attemptId twice skips the duplicate write (attempts stay 1, totals not inflated)', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'dup-1', scaledScore: 620, rawScore: 18 }));

    // Replay of the same attempt (retry button / boot flush / hung commit
    // landing late) — even with a different score it must be a no-op.
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'dup-1', scaledScore: 700, rawScore: 21 }));

    const testRow = getTestRow(getStore().get('progress/user-1'), 'practice-test-1');
    expect(testRow.attempts).toHaveLength(1);
    expect(testRow.totalAttempts).toBe(1);
    // First write's values stand — the duplicate never reached the batch.
    expect(testRow.bestScaledScore).toBe(620);
    expect(testRow.bestRawScore).toBe(18);
    expect(testRow.attempts[0].scaledScore).toBe(620);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('already recorded — skipping duplicate write')
    );
    logSpy.mockRestore();
  });

  test('a DIFFERENT attemptId still appends normally (length 2)', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'idem-a', scaledScore: 540 }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'idem-b', scaledScore: 660 }));

    const testRow = getTestRow(getStore().get('progress/user-1'), 'practice-test-1');
    expect(testRow.attempts).toHaveLength(2);
    expect(testRow.totalAttempts).toBe(2);
  });
});

describe('loadAttemptSnapshot', () => {
  test('returns the snapshot for an existing attemptId', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'attempt-load-1' }));

    const loaded = await loadAttemptSnapshot('user-1', 'attempt-load-1');
    expect(loaded).toBeTruthy();
    expect(loaded.attemptId).toBe('attempt-load-1');
    expect(loaded.testId).toBe('practice-test-1');
    expect(loaded.questionsSnapshot).toHaveLength(4);
    expect(loaded.snapshotVersion).toBe(SNAPSHOT_VERSION);
    expect(loaded.id).toBe('attempt-load-1');
  });

  test('returns null for a non-existent attemptId (legacy attempt)', async () => {
    const result = await loadAttemptSnapshot('user-1', 'never-existed');
    expect(result).toBeNull();
  });

  test('returns null when userId or attemptId is missing', async () => {
    expect(await loadAttemptSnapshot(null, 'a-1')).toBeNull();
    expect(await loadAttemptSnapshot('user-1', null)).toBeNull();
    expect(await loadAttemptSnapshot('', '')).toBeNull();
  });
});

describe('snapshot payload shape', () => {
  test('payload includes all required fields', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1',
      buildResults({ attemptId: 'shape-check' }));

    const snap = getStore().get('progress/user-1/attempts/shape-check');
    expect(snap).toMatchObject({
      attemptId: 'shape-check',
      testId: 'practice-test-1',
      snapshotVersion: SNAPSHOT_VERSION,
    });
    expect(typeof snap.completedAt).toBe('string');
    expect(Array.isArray(snap.questionsSnapshot)).toBe(true);
    expect(typeof snap.answers).toBe('object');

    // Per-question fields preserved verbatim
    snap.questionsSnapshot.forEach(q => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('type');
      expect(q).toHaveProperty('stem');
      expect(q).toHaveProperty('choices');
      expect(q).toHaveProperty('correctAnswer');
      expect(q).toHaveProperty('moduleIndex');
      expect(q).toHaveProperty('questionIndex');
    });
  });

  test('uses attemptId from results when provided, generates one otherwise', async () => {
    const results = buildResults();
    delete results.attemptId;

    await recordPracticeTestResult('user-1', 'practice-test-1', 'Practice Test 1', results);

    const main = getStore().get('progress/user-1');
    const written = getTestRow(main, 'practice-test-1').attempts[0];
    expect(written.attemptId).toBeTruthy();
    expect(typeof written.attemptId).toBe('string');

    // The matching subcollection doc should exist under that generated id
    const snap = getStore().get(`progress/user-1/attempts/${written.attemptId}`);
    expect(snap).toBeTruthy();
  });
});

// ── Firestore-serialization safety (PT4 data-loss regression) ────────────────
//
// A full test whose questionsSnapshot carried a table question (questionTable.
// rows is a 2D array) used to reject the ENTIRE save transaction — Firestore
// forbids nested arrays — silently losing the student's score. Retries and the
// boot flush replayed the same doomed payload, so nothing EVER saved. Two-part
// fix: (1) sanitizeForFirestore boxes nested arrays / drops undefined so the
// snapshot itself serializes; (2) the snapshot write is decoupled from the
// score-row transaction, so even an unsaveable snapshot can't lose the score.

describe('sanitizeForFirestore / restoreFromFirestore', () => {
  test('boxes nested arrays (questionTable.rows) and round-trips losslessly', () => {
    const original = {
      questionTable: {
        headers: ['Platform', '2012', '2021'],       // flat array — untouched
        rows: [                                        // 2D array — Firestore rejects
          ['Facebook', '54%', '69%'],
          ['Instagram', '13%', '40%'],
        ],
      },
    };
    const safe = sanitizeForFirestore(original);

    // No array in `safe` may directly contain another array.
    const hasNestedArray = (v) =>
      Array.isArray(v)
        ? v.some((el) => Array.isArray(el)) || v.some(hasNestedArray)
        : v && typeof v === 'object'
          ? Object.values(v).some(hasNestedArray)
          : false;
    expect(hasNestedArray(safe)).toBe(false);

    // Round-trips back to the exact original shape the renderers expect.
    expect(restoreFromFirestore(safe)).toEqual(original);
  });

  test('drops undefined object properties and nulls non-finite numbers', () => {
    const safe = sanitizeForFirestore({
      keep: 'yes',
      gone: undefined,
      nan: NaN,
      inf: Infinity,
      nested: { alsoGone: undefined, keep: 1 },
    });
    expect(safe).toEqual({ keep: 'yes', nan: null, inf: null, nested: { keep: 1 } });
    expect('gone' in safe).toBe(false);
    expect('alsoGone' in safe.nested).toBe(false);
  });

  test('restore is a no-op on plain (pre-encoding) snapshots', () => {
    const plain = { a: [1, 2, 3], b: { c: 'x' }, rows: null };
    expect(restoreFromFirestore(plain)).toEqual(plain);
  });
});

describe('recordPracticeTestResult — snapshot decoupled from score (PT4 regression)', () => {
  // A table question: rows is a nested array, which the real Firestore SDK
  // rejects. Proves the payload now saves AND round-trips through the reader.
  const tableSnapshot = () => [{
    id: 'q-table',
    type: 'multiple-choice',
    stem: 'Per the table, which platform grew most?',
    choices: [{ id: 'A', text: 'Facebook' }, { id: 'B', text: 'Instagram' }],
    correctAnswer: 'B',
    moduleIndex: 2,
    questionIndex: 0,
    questionTable: {
      type: 'table',
      headers: ['Platform', '2012', '2021'],
      rows: [['Facebook', '54%', '69%'], ['Instagram', '13%', '40%']],
    },
  }];

  test('a table-question snapshot saves and loadAttemptSnapshot restores rows to their 2D shape', async () => {
    await recordPracticeTestResult('user-1', 'practice-test-4', 'Practice Test 4',
      buildResults({ attemptId: 'tbl-1', questionsSnapshot: tableSnapshot() }));

    // Score row saved.
    const row = getTestRow(getStore().get('progress/user-1'), 'practice-test-4');
    expect(row.attempts[0].attemptId).toBe('tbl-1');

    // Snapshot saved AND decodes back to the original nested-array rows.
    const loaded = await loadAttemptSnapshot('user-1', 'tbl-1');
    expect(loaded.questionsSnapshot[0].questionTable.rows).toEqual([
      ['Facebook', '54%', '69%'],
      ['Instagram', '13%', '40%'],
    ]);
  });

  test('a snapshot write that THROWS does not lose the score row (decoupling guarantee)', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const realSetDoc = firestoreMock.setDoc;
    // Simulate Firestore hard-rejecting the snapshot doc (nested array / quota /
    // 1MB). The score-row transaction has already committed by then.
    firestoreMock.setDoc = async () => { throw new Error('Nested arrays are not supported'); };
    try {
      await expect(
        recordPracticeTestResult('user-1', 'practice-test-4', 'Practice Test 4',
          buildResults({ attemptId: 'snap-throws', questionsSnapshot: tableSnapshot() }))
      ).resolves.toBeUndefined(); // MUST NOT reject
    } finally {
      firestoreMock.setDoc = realSetDoc;
    }

    // The score row survived even though the snapshot write blew up.
    const row = getTestRow(getStore().get('progress/user-1'), 'practice-test-4');
    expect(row).toBeTruthy();
    expect(row.attempts[0].attemptId).toBe('snap-throws');
    expect(row.bestScaledScore).toBe(620);
    // Snapshot doc absent (write threw) — Review Answers falls back to live content.
    expect(getStore().get('progress/user-1/attempts/snap-throws')).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('snapshot write failed'),
      expect.anything()
    );
    warnSpy.mockRestore();
  });
});

// ── resetPracticeTest ────────────────────────────────────────────────────────

describe('resetPracticeTest', () => {
  // Seed a progress doc carrying a target test plus sibling data that must
  // survive the reset (a second test, a bank-fed review item, etc).
  const seedProgress = (overrides = {}) => {
    getStore().set('progress/u1', {
      userId: 'u1',
      practiceTestResults: {
        'practice-test-1': { testId: 'practice-test-1', bestScaledScore: 600, totalAttempts: 1, attempts: [{ attemptId: 'a1' }] },
        'practice-test-2': { testId: 'practice-test-2', bestScaledScore: 700, totalAttempts: 1, attempts: [{ attemptId: 'b1' }] },
      },
      inProgressTests: {
        'practice-test-1': { testId: 'practice-test-1', currentModule: 1 },
        'practice-test-2': { testId: 'practice-test-2', currentModule: 0 },
      },
      reviewQueue: {
        'test::practice-test-1::std-craft-0-3': { moduleId: 'test::practice-test-1::std', questionId: '0-3' },
        'test::practice-test-1::easy-algebra-2-1': { moduleId: 'test::practice-test-1::easy', questionId: '2-1' },
        'test::practice-test-2::std-geo-1-0': { moduleId: 'test::practice-test-2::std', questionId: '1-0' },
        'bank-Algebra-q123': { moduleId: 'bank', questionId: 'q123' },
      },
      predictionLog: [
        { id: 'p1', createdAfterTestId: 'practice-test-1' },
        { id: 'p2', createdAfterTestId: 'practice-test-2' },
      ],
      studentFingerprint: { archetype: 'careful' },
      ...overrides,
    });
  };

  test('removes the target test result + in-progress state, preserves siblings', async () => {
    seedProgress();
    const summary = await resetPracticeTest('u1', 'practice-test-1');

    const doc = getStore().get('progress/u1');
    expect(doc.practiceTestResults['practice-test-1']).toBeUndefined();
    expect(doc.practiceTestResults['practice-test-2']).toBeDefined();
    expect(doc.inProgressTests['practice-test-1']).toBeUndefined();
    expect(doc.inProgressTests['practice-test-2']).toBeDefined();
    expect(summary.removedResult).toBe(true);
  });

  test('prunes only the review-queue items this test seeded (std + easy), keeping bank + other-test items', async () => {
    seedProgress();
    const summary = await resetPracticeTest('u1', 'practice-test-1');

    const rq = getStore().get('progress/u1').reviewQueue;
    expect(rq['test::practice-test-1::std-craft-0-3']).toBeUndefined();
    expect(rq['test::practice-test-1::easy-algebra-2-1']).toBeUndefined();
    expect(rq['test::practice-test-2::std-geo-1-0']).toBeDefined();
    expect(rq['bank-Algebra-q123']).toBeDefined();
    expect(summary.prunedReviewItems).toBe(2);
  });

  test('drops predictions created by this test, keeps the rest', async () => {
    seedProgress();
    const summary = await resetPracticeTest('u1', 'practice-test-1');

    const log = getStore().get('progress/u1').predictionLog;
    expect(log).toHaveLength(1);
    expect(log[0].id).toBe('p2');
    expect(summary.prunedPredictions).toBe(1);
  });

  test('keeps the student fingerprint when other tests remain', async () => {
    seedProgress();
    await resetPracticeTest('u1', 'practice-test-1');
    expect(getStore().get('progress/u1').studentFingerprint).toEqual({ archetype: 'careful' });
  });

  test('nulls the student fingerprint when the last test is reset', async () => {
    seedProgress({
      practiceTestResults: {
        'practice-test-1': { testId: 'practice-test-1', bestScaledScore: 600, totalAttempts: 1, attempts: [] },
      },
    });
    await resetPracticeTest('u1', 'practice-test-1');

    const doc = getStore().get('progress/u1');
    expect(Object.keys(doc.practiceTestResults)).toHaveLength(0);
    expect(doc.studentFingerprint).toBeNull();
  });

  test('is a no-op (no throw) when the progress doc does not exist', async () => {
    const summary = await resetPracticeTest('ghost-user', 'practice-test-1');
    expect(summary).toEqual({ removedResult: false, prunedReviewItems: 0, prunedPredictions: 0 });
  });

  test('re-points the study plan to the newest surviving artifact when the reset test owned the current plan', async () => {
    // Newest artifact belongs to the test being reset (becomes orphaned);
    // older artifact belongs to a surviving test. Seed newest-first.
    getStore().set('progress/u1/studyPlanArtifacts/art-new', { linkage: { sourceTestId: 'practice-test-1' }, plan: { weeks: [{}] } });
    getStore().set('progress/u1/studyPlanArtifacts/art-old', { linkage: { sourceTestId: 'practice-test-2' }, plan: { weeks: [{}] } });
    seedProgress({ currentStudyPlanArtifactId: 'art-new' });

    await resetPracticeTest('u1', 'practice-test-1');

    const doc = getStore().get('progress/u1');
    expect(doc.currentStudyPlanArtifactId).toBe('art-old'); // survivor (test-2 still exists)
    expect(doc.studyPlan).toBeNull();
  });

  test('keeps the current study-plan pointer untouched when an unrelated test is reset', async () => {
    // Current plan is the latest test's artifact; a DIFFERENT, older test is reset.
    getStore().set('progress/u1/studyPlanArtifacts/art-latest', { linkage: { sourceTestId: 'practice-test-3' }, plan: { weeks: [{}] } });
    getStore().set('progress/u1/studyPlanArtifacts/art-mid', { linkage: { sourceTestId: 'practice-test-2' }, plan: { weeks: [{}] } });
    seedProgress({
      practiceTestResults: {
        'practice-test-1': { testId: 'practice-test-1', attempts: [] },
        'practice-test-2': { testId: 'practice-test-2', attempts: [] },
        'practice-test-3': { testId: 'practice-test-3', attempts: [] },
      },
      currentStudyPlanArtifactId: 'art-latest',
    });

    await resetPracticeTest('u1', 'practice-test-1');

    // test-3 (the current plan's source) still exists → pointer must not churn.
    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBe('art-latest');
  });

  test('re-points to the surviving mini-diagnostic artifact when the last full test is reset', async () => {
    getStore().set('progress/u1/studyPlanArtifacts/art-test', { linkage: { sourceTestId: 'practice-test-1' }, plan: { weeks: [{}] } });
    getStore().set('progress/u1/studyPlanArtifacts/art-mini', { linkage: { sourceTestId: null }, plan: { weeks: [{}] } });
    seedProgress({
      practiceTestResults: { 'practice-test-1': { testId: 'practice-test-1', attempts: [] } },
      currentStudyPlanArtifactId: 'art-test',
    });

    await resetPracticeTest('u1', 'practice-test-1');

    // Onboarding mini-diagnostic plan (sourceTestId null) survives → becomes current.
    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBe('art-mini');
  });

  test('re-points to the v2 diagnostic artifact (sourceTestId "mini-diagnostic-v1") when the last full test is reset', async () => {
    // 2026-08-29 founder repro: the v2 diagnostic stamps MINI_DIAGNOSTIC_TEST_ID
    // (not null). The reset used to treat it as an orphan, null the pointer,
    // and the home fell back to the first-run "take your diagnostic" hero.
    getStore().set('progress/u1/studyPlanArtifacts/art-test', { linkage: { sourceTestId: 'practice-test-1' }, plan: { weeks: [{}] } });
    getStore().set('progress/u1/studyPlanArtifacts/art-diag', { linkage: { sourceTestId: 'mini-diagnostic-v1' }, plan: { weeks: [{}] } });
    seedProgress({
      practiceTestResults: { 'practice-test-1': { testId: 'practice-test-1', attempts: [] } },
      currentStudyPlanArtifactId: 'art-test',
    });

    await resetPracticeTest('u1', 'practice-test-1');

    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBe('art-diag');
  });

  test('keeps the pointer on the v2 diagnostic artifact when a practice test is reset while it is current', async () => {
    // Student took the diagnostic, then a practice test whose plan write failed
    // (pointer still on the diagnostic's plan). Resetting the test must not churn.
    getStore().set('progress/u1/studyPlanArtifacts/art-diag', { linkage: { sourceTestId: 'mini-diagnostic-v1' }, plan: { weeks: [{}] } });
    seedProgress({
      practiceTestResults: { 'practice-test-1': { testId: 'practice-test-1', attempts: [] } },
      currentStudyPlanArtifactId: 'art-diag',
    });

    await resetPracticeTest('u1', 'practice-test-1');

    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBe('art-diag');
  });

  test('clears the study-plan pointer when no artifact survives the reset', async () => {
    getStore().set('progress/u1/studyPlanArtifacts/art-only', { linkage: { sourceTestId: 'practice-test-1' }, plan: { weeks: [{}] } });
    seedProgress({
      practiceTestResults: { 'practice-test-1': { testId: 'practice-test-1', attempts: [] } },
      currentStudyPlanArtifactId: 'art-only',
    });

    await resetPracticeTest('u1', 'practice-test-1');

    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBeNull();
  });

  test('leaves the study-plan pointer untouched when the account has no study plan', async () => {
    getStore().set('progress/u1/studyPlanArtifacts/art-x', { linkage: { sourceTestId: 'practice-test-2' }, plan: { weeks: [{}] } });
    seedProgress(); // no currentStudyPlanArtifactId / studyPlan

    await resetPracticeTest('u1', 'practice-test-1');

    // Re-point block is guarded off — pointer field never introduced.
    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBeUndefined();
  });

  test('purges the offline pending-save queue for this test so it cannot resurrect on next boot', async () => {
    window.localStorage.clear();
    enqueuePendingSave('u1', { testId: 'practice-test-1', testTitle: 'T1', results: { attemptId: 'pa-1', scaledScore: 600 } });
    enqueuePendingSave('u1', { testId: 'practice-test-2', testTitle: 'T2', results: { attemptId: 'pa-2', scaledScore: 700 } });
    seedProgress();

    await resetPracticeTest('u1', 'practice-test-1');

    expect(readPendingSaves('u1').map((e) => e.testId)).toEqual(['practice-test-2']);
    window.localStorage.clear();
  });

  test('a concurrent save landing mid-reset survives (targeted field deletes, not a whole-map overwrite)', async () => {
    // The pre-transaction code rewrote the ENTIRE practiceTestResults map from
    // its own stale read — a save committing between the read and the write
    // (e.g. the boot-time pending-save flush) was silently erased. Simulate
    // that interleaving via the artifact re-point's getDoc, which runs inside
    // the reset callback AFTER the progress doc was read.
    getStore().set('progress/u1/studyPlanArtifacts/art-new', { linkage: { sourceTestId: 'practice-test-1' }, plan: { weeks: [{}] } });
    seedProgress({ currentStudyPlanArtifactId: 'art-new' });

    const realGetDoc = firestoreMock.getDoc;
    firestoreMock.getDoc = async (ref) => {
      if (ref.__path === 'progress/u1/studyPlanArtifacts/art-new') {
        // Concurrent commit: another test's result lands in the store now.
        getStore().get('progress/u1').practiceTestResults['practice-test-9'] = {
          testId: 'practice-test-9', bestScaledScore: 750, totalAttempts: 1, attempts: [{ attemptId: 'c1' }],
        };
      }
      return realGetDoc(ref);
    };
    try {
      await resetPracticeTest('u1', 'practice-test-1');
    } finally {
      firestoreMock.getDoc = realGetDoc;
    }

    const doc = getStore().get('progress/u1');
    expect(doc.practiceTestResults['practice-test-1']).toBeUndefined(); // reset applied
    expect(doc.practiceTestResults['practice-test-2']).toBeDefined();   // sibling kept
    expect(doc.practiceTestResults['practice-test-9']).toBeDefined();   // concurrent save survived
  });

  test('reports removedResult:false when the test was never taken but still clears in-progress', async () => {
    getStore().set('progress/u1', {
      userId: 'u1',
      practiceTestResults: { 'practice-test-2': { testId: 'practice-test-2', attempts: [] } },
      inProgressTests: { 'practice-test-1': { testId: 'practice-test-1' } },
    });
    const summary = await resetPracticeTest('u1', 'practice-test-1');

    expect(summary.removedResult).toBe(false);
    expect(getStore().get('progress/u1').inProgressTests['practice-test-1']).toBeUndefined();
  });
});

// ── removeTestAttempt (junk-retake cleanup) ──────────────────────────────────

describe('removeTestAttempt', () => {
  test('removes the junk attempt and keeps the real one as the authoritative result', async () => {
    // The reported scenario: a real 1490 (recovered) + a rushed 400 retake.
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'real-1490', scaledScore: 1490, rawScore: 90, isMultiSection: true }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'junk-400', scaledScore: 400, rawScore: 10, isMultiSection: true }));

    let row = getTestRow(getStore().get('progress/u1'), 'practice-test-4');
    expect(row.attempts).toHaveLength(2);

    const summary = await removeTestAttempt('u1', 'practice-test-4', 'junk-400');
    expect(summary).toMatchObject({ removed: true, testRemoved: false, remainingAttempts: 1 });

    row = getTestRow(getStore().get('progress/u1'), 'practice-test-4');
    expect(row.attempts).toHaveLength(1);
    expect(row.attempts[0].attemptId).toBe('real-1490');
    expect(row.bestScaledScore).toBe(1490);
    expect(row.totalAttempts).toBe(1);
  });

  test('recomputes best DOWNWARD when the high attempt is the one removed (not monotonic)', async () => {
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-1490', scaledScore: 1490, rawScore: 90 }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-400', scaledScore: 400, rawScore: 10 }));

    await removeTestAttempt('u1', 'practice-test-4', 'a-1490');
    const row = getTestRow(getStore().get('progress/u1'), 'practice-test-4');
    expect(row.attempts).toHaveLength(1);
    expect(row.bestScaledScore).toBe(400); // dropped from 1490 — recompute, not a stale max
    expect(row.bestRawScore).toBe(10);
  });

  test('removing the last attempt drops the whole test row', async () => {
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'only', scaledScore: 1200 }));
    const summary = await removeTestAttempt('u1', 'practice-test-4', 'only');
    expect(summary).toMatchObject({ removed: true, testRemoved: true, remainingAttempts: 0 });
    expect(getTestRow(getStore().get('progress/u1'), 'practice-test-4')).toBeUndefined();
  });

  test('unknown attemptId is a no-op (nothing removed)', async () => {
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'keep', scaledScore: 1200 }));
    const summary = await removeTestAttempt('u1', 'practice-test-4', 'does-not-exist');
    expect(summary.removed).toBe(false);
    expect(getTestRow(getStore().get('progress/u1'), 'practice-test-4').attempts).toHaveLength(1);
  });

  test('missing userId / testId / attemptId returns the empty summary without throwing', async () => {
    expect(await removeTestAttempt(null, 'practice-test-4', 'a')).toEqual({ removed: false, remainingAttempts: 0, testRemoved: false });
    expect(await removeTestAttempt('u1', null, 'a')).toEqual({ removed: false, remainingAttempts: 0, testRemoved: false });
    expect(await removeTestAttempt('u1', 'practice-test-4', null)).toEqual({ removed: false, remainingAttempts: 0, testRemoved: false });
  });

  test('purges the offline pending-save queue for the removed attempt (no boot-flush resurrection)', async () => {
    window.localStorage.clear();
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-keep', scaledScore: 1490 }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-junk', scaledScore: 400 }));
    enqueuePendingSave('u1', { testId: 'practice-test-4', testTitle: 'PT4', results: { attemptId: 'a-junk', scaledScore: 400 } });
    expect(readPendingSaves('u1').some((e) => e.results.attemptId === 'a-junk')).toBe(true);

    await removeTestAttempt('u1', 'practice-test-4', 'a-junk');
    expect(readPendingSaves('u1').some((e) => e.results.attemptId === 'a-junk')).toBe(false);
    window.localStorage.clear();
  });

  test('re-points the study plan when its artifact was built from the removed attempt', async () => {
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-real', scaledScore: 1490 }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-junk', scaledScore: 400 }));
    // Current plan came from the junk attempt; an older artifact came from the real one.
    getStore().set('progress/u1/studyPlanArtifacts/art-junk', { linkage: { attemptId: 'a-junk' }, plan: { weeks: [{}] } });
    getStore().set('progress/u1/studyPlanArtifacts/art-real', { linkage: { attemptId: 'a-real' }, plan: { weeks: [{}] } });
    const doc0 = getStore().get('progress/u1');
    getStore().set('progress/u1', { ...doc0, currentStudyPlanArtifactId: 'art-junk', studyPlan: { weeks: [{ stale: true }] } });

    await removeTestAttempt('u1', 'practice-test-4', 'a-junk');

    const after = getStore().get('progress/u1');
    expect(after.currentStudyPlanArtifactId).toBe('art-real'); // re-pointed off the junk artifact
    expect(after.studyPlan).toBeNull();                         // stale legacy copy dropped
  });

  test('leaves the study-plan pointer untouched when the current plan is unrelated to the removed attempt', async () => {
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-real', scaledScore: 1490 }));
    await new Promise(r => setTimeout(r, 5));
    await recordPracticeTestResult('u1', 'practice-test-4', 'PT4',
      buildResults({ attemptId: 'a-junk', scaledScore: 400 }));
    getStore().set('progress/u1/studyPlanArtifacts/art-real', { linkage: { attemptId: 'a-real' }, plan: { weeks: [{}] } });
    const doc0 = getStore().get('progress/u1');
    getStore().set('progress/u1', { ...doc0, currentStudyPlanArtifactId: 'art-real' });

    await removeTestAttempt('u1', 'practice-test-4', 'a-junk');

    // Plan was built from the SURVIVING attempt → pointer must not churn.
    expect(getStore().get('progress/u1').currentStudyPlanArtifactId).toBe('art-real');
  });
});
