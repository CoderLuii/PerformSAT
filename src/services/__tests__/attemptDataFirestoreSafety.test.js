/**
 * Guard: the SCORE-TRANSACTION payload must stay Firestore-safe for every
 * live practice test.
 *
 * The 2026-07-04 PT4 data-loss bug taught us that anything Firestore can't
 * serialize inside recordPracticeTestResult's score transaction loses the
 * student's score. The per-attempt snapshot was decoupled + sanitized then,
 * and firestoreSnapshotSafety.test.js guards the QUESTION content. But
 * attemptData still carries GENERATED objects into the transaction —
 * scoreTest's moduleScores/sectionScores, the diagnosticData telemetry, and
 * (on the FIRST attempt of a test, where trimAttempts doesn't run) the full
 * runDiagnostic report. None of those shapes were pinned anywhere: if a
 * future report/scoring change introduces a nested array (a 2D chart matrix,
 * a confusion table), first-attempt score saves would silently start failing
 * again — the exact class of bug this suite exists to prevent.
 *
 * This test runs the REAL completion pipeline (real catalog test → simulated
 * answers → scoreTest → runDiagnostic, mirroring PracticeTest.jsx) for every
 * live test and asserts the transaction payload contains no nested arrays and
 * no non-finite numbers. `undefined` is NOT asserted here — the Firestore
 * instance is initialized with ignoreUndefinedProperties (pinned by
 * src/firebase/__tests__/config.guard.test.js).
 */

const { findFirestoreHostileValues } = require('../../utils/firestoreSafe');
const { getAllPracticeTests } = require('../../data/practiceTests');
const { runDiagnostic, getQuestionSkills } = require('../diagnosticEngine');
const { scoreTest, isAnswerCorrect } = require('../scoring');

/**
 * Simulate a realistic completion: roughly 60% correct, a few blanks, and
 * per-question telemetry shaped exactly like PracticeTest.jsx builds it
 * (flat fields + answerChangeEvents + eliminatedChoices).
 */
function simulateCompletion(test) {
  const answers = {};
  const questionDetails = {};
  let i = 0;
  test.modules.forEach((mod, modIdx) => {
    mod.questions.forEach((q, qIdx) => {
      const key = `${modIdx}-${qIdx}`;
      i += 1;
      if (i % 7 === 0) {
        // blank — student skipped it
      } else if (i % 3 === 0) {
        answers[key] = 'Z-not-a-real-answer'; // wrong
      } else {
        answers[key] = q.correctAnswer; // right
      }
      questionDetails[key] = {
        timeSpent: 42.5,
        visits: (i % 4) + 1,
        answerChanges: 1,
        answerChangeEvents: [{ from: 'A', to: 'B', timestamp: 1720000000000 }],
        usedCalculator: i % 2 === 0,
        markedForReview: i % 11 === 0,
        eliminatedChoices: ['C'],
        isCorrect: isAnswerCorrect(q, answers[key]),
        difficulty: q.difficulty || null,
        skills: getQuestionSkills(q),
      };
    });
  });

  const diagnosticData = {
    questionDetails,
    navigationPattern: 'strategic-skip',
    totalNavigationEvents: 12,
    moduleTimeRemaining: { 0: 120, 1: 0 },
    questionsVisitedMultipleTimes: 3,
    calculatorUsageCount: 5,
    markedForReviewCount: 2,
  };
  return { answers, diagnosticData };
}

/** Assert helper — fails with the offending paths so the culprit is obvious. */
function expectTransactionSafe(label, value) {
  const hostile = findFirestoreHostileValues(value, label);
  // customObjects catches Set/Map/class instances — the 2026-08-13 outage was
  // a live Set (skillMap.missedPatternsSet) leaking out of runDiagnostic and
  // failing EVERY first-attempt score save with "Unsupported field value: a
  // custom Set object". The earlier version of this suite only checked
  // nestedArrays/nonFinite, which is exactly why it never caught that.
  expect({ nestedArrays: hostile.nestedArrays, nonFinite: hostile.nonFinite, customObjects: hostile.customObjects })
    .toEqual({ nestedArrays: [], nonFinite: [], customObjects: [] });
}

describe('score-transaction payload Firestore safety (every live test)', () => {
  const tests = getAllPracticeTests();

  test('catalog is non-trivial (guard has data)', () => {
    expect(tests.length).toBeGreaterThanOrEqual(10);
  });

  tests.forEach((t) => {
    test(`${t.id}: scoreTest + runDiagnostic outputs carry no nested arrays / non-finite numbers`, () => {
      const { answers, diagnosticData } = simulateCompletion(t);

      const scored = scoreTest(t, answers, { timedMode: true, diagnosticData });
      const report = runDiagnostic(
        t, answers, diagnosticData,
        {},
        { targetScore: 1500, currentScore: 1180, testDate: '2026-08-01' },
        {}
      );

      // Mirror of attemptData in practiceTestService.recordPracticeTestResult —
      // every generated object that rides INSIDE the score transaction. On a
      // FIRST attempt the full diagnosticReport is written un-trimmed, so it
      // must be transaction-safe on its own.
      const attemptDataMirror = {
        attemptId: 'attempt-guard-test',
        completedAt: new Date().toISOString(),
        rawScore: scored.rawScore ?? null,
        totalQuestions: scored.totalQuestions ?? null,
        scaledScore: scored.scaledScore ?? null,
        timedMode: true,
        moduleScores: scored.moduleScores ?? [],
        sectionScores: scored.sectionScores ?? null,
        isMultiSection: scored.isMultiSection ?? false,
        diagnosticData,
        diagnosticReport: report,
        markedForReview: ['0-3', '1-7'],
      };

      expectTransactionSafe(`${t.id}.attemptData`, attemptDataMirror);
    });
  });
});
