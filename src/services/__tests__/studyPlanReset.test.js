import { pickSurvivingArtifactId, isOrphanArtifact, isDiagnosticSourceTestId } from '../studyPlanReset';

describe('pickSurvivingArtifactId', () => {
  // history is newest-first (getStudyPlanHistory order)
  const history = [
    { id: 'art-3', sourceTestId: 'practice-test-3' },
    { id: 'art-2', sourceTestId: 'practice-test-2' },
    { id: 'art-mini', sourceTestId: null }, // mini-diagnostic plan
  ];

  test('returns the newest artifact whose source test still exists', () => {
    // test-3 was reset → newest survivor is test-2's artifact
    const remaining = { 'practice-test-1': {}, 'practice-test-2': {} };
    expect(pickSurvivingArtifactId(history, remaining)).toBe('art-2');
  });

  test('keeps the newest artifact when a non-latest test was reset', () => {
    // test-2 reset, test-3 remains → newest survivor is still test-3's artifact
    const remaining = { 'practice-test-1': {}, 'practice-test-3': {} };
    expect(pickSurvivingArtifactId(history, remaining)).toBe('art-3');
  });

  test('falls back to the mini-diagnostic artifact when no full tests survive', () => {
    expect(pickSurvivingArtifactId(history, {})).toBe('art-mini');
  });

  test('falls back to the v2 diagnostic artifact (sourceTestId "mini-diagnostic-v1") when no full tests survive', () => {
    // finishMiniDiagnostic stamps MINI_DIAGNOSTIC_TEST_ID, not null. Resetting
    // the only practice test must land on this plan, not on null (which put a
    // measured student back on the first-run "take your diagnostic" home).
    const v2History = [
      { id: 'art-test1', sourceTestId: 'practice-test-1' },
      { id: 'art-diag', sourceTestId: 'mini-diagnostic-v1' },
    ];
    expect(pickSurvivingArtifactId(v2History, {})).toBe('art-diag');
  });

  test('returns null when nothing survives (no mini-diagnostic, no tests)', () => {
    const onlyTests = [
      { id: 'art-3', sourceTestId: 'practice-test-3' },
      { id: 'art-2', sourceTestId: 'practice-test-2' },
    ];
    expect(pickSurvivingArtifactId(onlyTests, {})).toBeNull();
  });

  test('handles empty / missing history', () => {
    expect(pickSurvivingArtifactId([], { 'practice-test-1': {} })).toBeNull();
    expect(pickSurvivingArtifactId(undefined, undefined)).toBeNull();
  });
});

describe('isOrphanArtifact', () => {
  test('true when the source test was deleted', () => {
    const art = { linkage: { sourceTestId: 'practice-test-1' } };
    expect(isOrphanArtifact(art, { 'practice-test-2': {} })).toBe(true);
  });

  test('false when the source test still exists', () => {
    const art = { linkage: { sourceTestId: 'practice-test-1' } };
    expect(isOrphanArtifact(art, { 'practice-test-1': {} })).toBe(false);
  });

  test('false for the v2 diagnostic artifact (sourceTestId "mini-diagnostic-v1")', () => {
    expect(isOrphanArtifact({ linkage: { sourceTestId: 'mini-diagnostic-v1' } }, {})).toBe(false);
  });

  test('false for a mini-diagnostic artifact (no source test)', () => {
    expect(isOrphanArtifact({ linkage: { sourceTestId: null } }, {})).toBe(false);
    expect(isOrphanArtifact({ linkage: {} }, {})).toBe(false);
    expect(isOrphanArtifact({}, {})).toBe(false);
    expect(isOrphanArtifact(null, {})).toBe(false);
  });
});

describe('isDiagnosticSourceTestId', () => {
  test('null / undefined (v1 onboarding plans) count as diagnostic', () => {
    expect(isDiagnosticSourceTestId(null)).toBe(true);
    expect(isDiagnosticSourceTestId(undefined)).toBe(true);
  });

  test('the v2 diagnostic id and any future mini-diagnostic-* id count', () => {
    expect(isDiagnosticSourceTestId('mini-diagnostic-v1')).toBe(true);
    expect(isDiagnosticSourceTestId('mini-diagnostic-v2')).toBe(true);
  });

  test('catalog practice tests do not', () => {
    expect(isDiagnosticSourceTestId('practice-test-1')).toBe(false);
    expect(isDiagnosticSourceTestId('')).toBe(false);
  });
});
