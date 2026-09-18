import { buildHomeTiles, classifyPace, summarizePace } from '../homeTiles';

const NOW = new Date(2026, 7, 24, 12);
const DIAG = {
  answeredCount: 40, totalCount: 40,
  domains: {
    rw: { 'craft-and-structure': { correct: 6, total: 6 }, 'information-and-ideas': { correct: 5, total: 6 } },
    math: { algebra: { correct: 5, total: 8 }, 'advanced-math': { correct: 2, total: 4 } },
  },
};
const attempt = (over = {}) => ({
  scaledScore: 1200, rawScore: 60, totalQuestions: 98, isMultiSection: true, completedAt: '2026-08-20T10:00:00.000Z',
  moduleScores: [{ correct: 30, total: 49 }, { correct: 30, total: 49 }], ...over,
});

describe('buildHomeTiles — accuracy', () => {
  it('diagnostic only', () => {
    const t = buildHomeTiles({ miniDiagnostic: DIAG, now: NOW });
    expect(t.hasData).toBe(true);
    expect(t.accuracy).toEqual({ percent: 75, correct: 18, total: 24, detail: '18 of 24 correct · your diagnostic' });
    expect(t.sourceLabel).toBe('Your diagnostic');
  });
  it('diagnostic + tests are pooled', () => {
    const t = buildHomeTiles({ miniDiagnostic: DIAG, practiceTestResults: { 1: { attempts: [attempt(), attempt({ rawScore: 70 })] } }, now: NOW });
    expect(t.accuracy.correct).toBe(18 + 60 + 70);
    expect(t.accuracy.total).toBe(24 + 196);
    expect(t.accuracy.detail).toContain('your diagnostic + 2 practice tests');
    expect(t.sourceLabel).toBe('Diagnostic + practice tests');
  });
  it('blank / unscoreable attempts are skipped; no source → hasData false', () => {
    const t = buildHomeTiles({ practiceTestResults: { 1: { attempts: [attempt({ scaledScore: undefined })] } }, now: NOW });
    expect(t.hasData).toBe(false);
    expect(t.accuracy).toBeNull();
  });
});

describe('buildHomeTiles — consistency', () => {
  it('counts days in the last 7 and carries the review streak', () => {
    const t = buildHomeTiles({ miniDiagnostic: DIAG, drillDays: ['2026-08-24', '2026-08-23', '2026-08-20', '2026-08-01'], reviewStreak: { current: 3 }, now: NOW });
    expect(t.consistency.uniqueDays).toBe(3);
    expect(t.consistency.value).toBe(3);
    expect(t.consistency.unit).toBe('days');
    expect(t.consistency.percent).toBeUndefined();
    expect(t.consistency.name).toBe('In the last 7 days');
    expect(t.consistency.detail).toBe('3-day review streak');
  });
  it('zero state is honest', () => {
    const t = buildHomeTiles({ miniDiagnostic: DIAG, now: NOW });
    expect(t.consistency.value).toBe(0);
    expect(t.consistency.unit).toBe('days');
    expect(t.consistency.detail).toBe('Practice today to start a streak');
  });
});

describe('buildHomeTiles — pacing', () => {
  it('classifies against difficulty thresholds', () => {
    expect(classifyPace(20, 'easy')).toBe('rushed');
    expect(classifyPace(60, 'easy')).toBe('normal');
    expect(classifyPace(100, 'easy')).toBe('slow');
    expect(classifyPace(100, 'hard')).toBe('normal');
    expect(classifyPace(50, null)).toBe('normal');
    expect(summarizePace([{ timeSpent: 20, difficulty: 'easy' }, { timeSpent: 60, difficulty: 'easy' }, { timeSpent: 300, difficulty: 'hard' }]))
      .toEqual({ total: 3, onPace: 1, rushed: 1, slow: 1, avgSeconds: 127 });
    expect(summarizePace([])).toBeNull();
  });
  it('prefers the latest test telemetry', () => {
    const details = {};
    for (let i = 0; i < 10; i += 1) details[`0-${i}`] = { timeSpent: i < 8 ? 70 : 10, difficulty: 'medium', isCorrect: true };
    const t = buildHomeTiles({ miniDiagnostic: { ...DIAG, diagnosis: { pacing: { total: 40, onPace: 10, rushed: 30, slow: 0 } } }, practiceTestResults: { 1: { attempts: [attempt({ diagnosticData: { questionDetails: details } })] } }, now: NOW });
    expect(t.pacing).toEqual({ value: 2, unit: 'off pace', name: 'Healthy pace', detail: '8 of 10 at a healthy pace · 2 rushed · 0 slow', source: 'test' });
  });
  it('falls back to the diagnostic pace summary, then to the legacy time-pressure count', () => {
    const fromDiag = buildHomeTiles({ miniDiagnostic: { ...DIAG, diagnosis: { pacing: { total: 40, onPace: 22, rushed: 15, slow: 3, avgSeconds: 50 } } }, now: NOW });
    expect(fromDiag.pacing).toEqual({ value: 18, unit: 'off pace', name: 'Rushing', detail: '22 of 40 at a healthy pace · 15 rushed · 3 slow', source: 'diagnostic' });
    const legacy = buildHomeTiles({ miniDiagnostic: DIAG, studyPlan: { summary: { errorBreakdown: [{ type: 'conceptual_gap', count: 5 }, { type: 'time_pressure', count: 7 }] } }, now: NOW });
    expect(legacy.pacing).toEqual({ value: 7, unit: 'off pace', name: 'Mostly on pace', detail: '7 misses under time pressure · your diagnostic', source: 'legacy' });
    const none = buildHomeTiles({ miniDiagnostic: DIAG, now: NOW });
    expect(none.pacing).toBeNull();
  });
});
