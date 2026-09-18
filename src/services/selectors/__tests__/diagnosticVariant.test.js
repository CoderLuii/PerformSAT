import {
  chooseDiagnosticVariant,
  hasRealTestScore,
  DIAGNOSTIC_LAUNCH_FIRST,
  DIAGNOSTIC_LAUNCH_PLAN_CHECKIN,
} from '../diagnosticVariant';

const staleRecord = { scoreBand: { low: 460, high: 540 }, completedAt: '2026-08-13T00:00:00.000Z' };
const scoredTests = {
  'practice-test-4': { attempts: [{ attemptId: 'a1', scaledScore: 1010, answeredCount: 98, completedAt: '2026-08-01' }] },
};
const blankTests = {
  // Abandoned attempt: floor score, nothing answered — NOT a measurement.
  'practice-test-4': { attempts: [{ attemptId: 'a0', scaledScore: 400, answeredCount: 0, completedAt: '2026-08-01' }] },
};

describe('chooseDiagnosticVariant', () => {
  test('onboarding / home CTA launch is ALWAYS the full 40Q sitting, even over a stale record', () => {
    // The 2026-08-22 founder repro: stale record + launched from the home
    // "Take your diagnostic" CTA → got the 18Q check-in and a carried 500.
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_FIRST, miniDiagnostic: staleRecord })).toBe('full');
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_FIRST, practiceTestResults: scoredTests })).toBe('full');
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_FIRST })).toBe('full');
  });

  test('plan check-in card serves the short variant for a measured student', () => {
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_PLAN_CHECKIN, miniDiagnostic: staleRecord })).toBe('checkin');
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_PLAN_CHECKIN, practiceTestResults: scoredTests })).toBe('checkin');
  });

  test('plan check-in card never demotes a never-measured student to the check-in', () => {
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_PLAN_CHECKIN })).toBe('full');
    expect(chooseDiagnosticVariant({ launchSource: DIAGNOSTIC_LAUNCH_PLAN_CHECKIN, practiceTestResults: blankTests })).toBe('full');
  });

  test('no launch source (resume fall-through) keeps the measured-or-not rule', () => {
    expect(chooseDiagnosticVariant({})).toBe('full');
    expect(chooseDiagnosticVariant({ miniDiagnostic: staleRecord })).toBe('checkin');
    expect(chooseDiagnosticVariant({ practiceTestResults: scoredTests })).toBe('checkin');
  });
});

describe('hasRealTestScore', () => {
  test('scoreable attempts and legacy aggregate rows count; blank attempts do not', () => {
    expect(hasRealTestScore(scoredTests)).toBe(true);
    expect(hasRealTestScore({ 'practice-test-1': { bestScaledScore: 900 } })).toBe(true);
    expect(hasRealTestScore(blankTests)).toBe(false);
    expect(hasRealTestScore({})).toBe(false);
    expect(hasRealTestScore(null)).toBe(false);
  });
});
