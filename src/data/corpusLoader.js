/**
 * corpusLoader.js — memoized dynamic-import loaders for the question corpus
 * (Stage 2b of the bundle-split plan).
 *
 * The corpus (~9MB raw: math bank shards, the flattened R&W bank, all 36
 * practice-test bundles, topic question files) used to be statically welded
 * into the main chunk through App.jsx and two corpus-coupled services. Every
 * loader here wraps a webpack dynamic import() so each corpus slice ships as
 * its own named chunk, fetched on first use (or on idle via preloadCorpus).
 *
 * Memoization contract: each loader caches the import PROMISE at module
 * scope, so concurrent callers share one in-flight fetch, StrictMode's
 * double-invoke is free, and repeat calls are synchronous-resolving cache
 * hits. Never cache in component state — that re-fires per mount.
 *
 * When to use: any App.jsx handler (or main-chunk module) that needs bank
 * lookups, practice-test bundles, or the routing/try-similar services must
 * `await` the matching loader instead of importing the module statically.
 * Components that are already their own lazy chunks (PracticeBank,
 * StudyPlanDashboard, the practice shells) may keep their static imports —
 * the corpus lands in their chunk graph, not in main.
 */

// One memo slot per corpus chunk. A slot holds the in-flight/resolved import
// promise — or null once evicted so the next call re-imports.
const chunkCache = {
  mathBank: null,
  mathTestBank: null,
  topicQuestions: null,
  rwBank: null,
  practiceTests: null,
  practiceRouting: null,
  trySimilar: null,
};

/**
 * Memoize a chunk import, but NEVER cache a rejected promise. If the import
 * rejects (a flaky-network chunk fetch — e.g. the idle pre-warm), the memo
 * slot is cleared so the next call re-imports instead of handing every future
 * caller the same poisoned rejection. The rejection still propagates to THIS
 * call's awaiter (which surfaces an error toast), and because every launcher
 * that awaits a loader now has a catch, the rethrown rejection is always
 * handled — no unhandled-rejection warning.
 *
 * @param {keyof chunkCache} key
 * @param {() => Promise<object>} importer - the raw dynamic import() thunk
 * @returns {Promise<object>} the shared, cache-hit-on-repeat import promise
 */
const loadChunk = (key, importer) => {
  if (!chunkCache[key]) {
    chunkCache[key] = importer().catch((err) => {
      chunkCache[key] = null; // evict the poisoned slot so a retry re-imports
      throw err;              // still reject this awaiter — the caller toasts
    });
  }
  return chunkCache[key];
};

/**
 * Load the hand-authored math drill bank (4 shards + topic-file lift,
 * ~1373 items) as the "bank-math" chunk.
 *
 * @returns {Promise<typeof import('./questions/bank')>} module namespace
 *   (getQuestionById, getQuestionsByDomain, getTargetedWeaknessSet, ...)
 */
export const loadMathBank = () =>
  loadChunk('mathBank', () => import(/* webpackChunkName: "bank-math" */ './questions/bank'));

/**
 * Load the math TEST bank (792 recreated items flattened from the 12 math
 * practice-test bundles + M2Easy variants) as the "bank-math-test" chunk.
 * The diagnostic samples from this pool; drills keep using loadMathBank.
 *
 * @returns {Promise<typeof import('./questions/mathTestBank')>} module
 *   namespace (getQuestionById, getQuestionsByDomain, getAllQuestions, ...)
 */
export const loadMathTestBank = () =>
  loadChunk('mathTestBank', () => import(/* webpackChunkName: "bank-math-test" */ './questions/mathTestBank'));

/**
 * Load the legacy topic question files (free-practice sections keyed by
 * moduleId + sectionName).
 *
 * @returns {Promise<typeof import('./questions')>} module namespace
 *   (getQuestionsForSection, getRandomQuestions, hasQuestionsForSection, ...)
 */
export const loadTopicQuestions = () =>
  loadChunk('topicQuestions', () => import(/* webpackChunkName: "topic-questions" */ './questions'));

/**
 * Load the R&W bank (648 items flattened from the 12 R&W test bundles)
 * as the "bank-rw" chunk.
 *
 * @returns {Promise<typeof import('./questions/rwBank')>} module namespace
 *   (getQuestionById, getQuestionsBySkillIds, getTargetedWeaknessSet, ...)
 */
export const loadRWBank = () =>
  loadChunk('rwBank', () => import(/* webpackChunkName: "bank-rw" */ './questions/rwBank'));

/**
 * Load the full practice-test catalog (12 tests x [R&W + Math M1/M2 + M2
 * Easy variants]) as the "practice-tests" chunk.
 *
 * @returns {Promise<typeof import('./practiceTests')>} module namespace
 *   (getAllPracticeTests, getPracticeTestById, ...)
 */
export const loadPracticeTests = () =>
  loadChunk('practiceTests', () => import(/* webpackChunkName: "practice-tests" */ './practiceTests'));

/**
 * Load the practice-assignment/routing service (imports BOTH banks: drill
 * resolution, adaptive queue seeding + session-state machine).
 *
 * Mid-session adaptive calls must NOT await this per answer — App.jsx stashes
 * the resolved namespace in practiceRoutingRef when the session starts and
 * reads it synchronously from handleNextQuestion.
 *
 * @returns {Promise<typeof import('../services/practiceAssignmentService')>}
 */
export const loadPracticeRouting = () =>
  loadChunk('practiceRouting', () => import(/* webpackChunkName: "practice-routing" */ '../services/practiceAssignmentService'));

/**
 * Load the try-similar service (imports both banks' skill dispatchers).
 *
 * @returns {Promise<typeof import('../services/trySimilarService')>}
 */
export const loadTrySimilar = () =>
  loadChunk('trySimilar', () => import(/* webpackChunkName: "try-similar" */ '../services/trySimilarService'));

/**
 * Pre-warm every corpus chunk in parallel. Called from App.jsx's idle
 * pre-warm effect once auth resolves, so by the time a student clicks into
 * a drill or test every awaited loader above is a cache hit.
 *
 * @returns {Promise<Array<object>>} resolves when all corpus chunks loaded
 */
export const preloadCorpus = () => Promise.all([
  loadMathBank(),
  loadMathTestBank(),
  loadTopicQuestions(),
  loadRWBank(),
  loadPracticeTests(),
  loadPracticeRouting(),
  loadTrySimilar(),
]);
