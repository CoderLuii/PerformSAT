/**
 * corpusLoader.test.js — sanity checks for the memoized corpus loaders
 * (Stage 2b of the bundle-split plan).
 *
 * CRA's jest babel config rewrites dynamic import() to deferred require, so
 * these tests exercise the real module graph: each loader must resolve to
 * the actual corpus namespace with its query functions intact, and repeat
 * calls must return the SAME promise (the memoization contract that makes
 * pre-warm + StrictMode double-invoke free).
 */

import {
  loadMathBank,
  loadTopicQuestions,
  loadRWBank,
  loadPracticeTests,
  loadPracticeRouting,
  loadTrySimilar,
  preloadCorpus,
} from '../corpusLoader';

describe('corpusLoader — loaders resolve to the real corpus modules', () => {
  test('loadMathBank resolves the math bank namespace', async () => {
    const mod = await loadMathBank();
    expect(typeof mod.getQuestionById).toBe('function');
    expect(typeof mod.getQuestionsByDomain).toBe('function');
    expect(typeof mod.getTargetedWeaknessSet).toBe('function');
    expect(Array.isArray(mod.questionBank)).toBe(true);
    expect(mod.questionBank.length).toBeGreaterThan(0);
    // A real lookup round-trips: any bank item is findable by its own id.
    const sample = mod.questionBank[0];
    expect(mod.getQuestionById(sample.id)).toBe(sample);
  });

  test('loadTopicQuestions resolves the topic-file namespace', async () => {
    const mod = await loadTopicQuestions();
    expect(typeof mod.getQuestionsForSection).toBe('function');
    expect(typeof mod.getRandomQuestions).toBe('function');
  });

  test('loadRWBank resolves the R&W bank namespace', async () => {
    const mod = await loadRWBank();
    expect(typeof mod.getQuestionById).toBe('function');
    expect(Array.isArray(mod.rwQuestionBank)).toBe(true);
    expect(mod.rwQuestionBank.length).toBeGreaterThan(0);
  });

  test('loadPracticeTests resolves the test catalog', async () => {
    const mod = await loadPracticeTests();
    expect(typeof mod.getAllPracticeTests).toBe('function');
    expect(typeof mod.getPracticeTestById).toBe('function');
    const tests = mod.getAllPracticeTests();
    expect(tests.length).toBeGreaterThan(0);
    expect(mod.getPracticeTestById(tests[0].id)).toBeTruthy();
  });

  test('loadPracticeRouting resolves the routing service', async () => {
    const mod = await loadPracticeRouting();
    // The full surface App.jsx destructures from the ref mid-session:
    [
      'resolveAssignedQuestions',
      'resolveQuestionById',
      'normalizeDomain',
      'buildDomainAdaptiveQueueSeed',
      'createAdaptiveSessionState',
      'getNextAdaptiveQuestion',
      'applyAdaptiveResult',
      'evaluateAdaptiveCompletion',
      'serializeAdaptiveState',
      'deserializeAdaptiveState',
    ].forEach((fn) => expect(typeof mod[fn]).toBe('function'));
    expect(Array.isArray(mod.RW_DOMAIN_ORDER)).toBe(true);
  });

  test('loadTrySimilar resolves the try-similar service', async () => {
    const mod = await loadTrySimilar();
    expect(typeof mod.pickSimilarQuestion).toBe('function');
  });
});

describe('corpusLoader — memoization contract', () => {
  test('repeat calls return the same cached promise', () => {
    expect(loadMathBank()).toBe(loadMathBank());
    expect(loadTopicQuestions()).toBe(loadTopicQuestions());
    expect(loadRWBank()).toBe(loadRWBank());
    expect(loadPracticeTests()).toBe(loadPracticeTests());
    expect(loadPracticeRouting()).toBe(loadPracticeRouting());
    expect(loadTrySimilar()).toBe(loadTrySimilar());
  });

  test('preloadCorpus resolves all seven corpus slices', async () => {
    const mods = await preloadCorpus();
    expect(mods).toHaveLength(7);
    mods.forEach((mod) => expect(mod).toBeTruthy());
  });
});
