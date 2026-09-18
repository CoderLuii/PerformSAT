import { activitySummary, activityBreakdown, estimateActivityQuestions } from '../activitySummary';

describe('estimateActivityQuestions', () => {
  it('uses an explicit questionIds length when present (exact, not estimated)', () => {
    expect(estimateActivityQuestions({ type: 'practice', questionIds: ['a', 'b', 'c'] })).toEqual({ n: 3, estimated: false });
  });
  it('treats a CB practice section as a fixed 5-question set', () => {
    expect(estimateActivityQuestions({ type: 'practice', activityType: 'practiceSection' })).toEqual({ n: 5, estimated: false });
  });
  it('estimates by section for a drill', () => {
    expect(estimateActivityQuestions({ type: 'practice', section: 'math' })).toEqual({ n: 12, estimated: true });
    expect(estimateActivityQuestions({ type: 'practice', section: 'rw' })).toEqual({ n: 10, estimated: true });
  });
  it('returns null questions for non-question activities', () => {
    expect(estimateActivityQuestions({ type: 'strategy' }).n).toBeNull();
    expect(estimateActivityQuestions({ type: 'test' }).n).toBeNull();
  });
});

describe('activitySummary', () => {
  it('uses the stored duration for minutes (no ~) and estimates questions (~)', () => {
    const s = activitySummary({ type: 'practice', section: 'math', duration: 25 });
    expect(s.label).toBe('25 MIN · ~12 Q');
    expect(s.minutesEstimated).toBe(false);
    expect(s.questionsEstimated).toBe(true);
  });
  it('marks both estimated when duration is missing', () => {
    const s = activitySummary({ type: 'practice', section: 'rw' });
    expect(s.label.startsWith('~')).toBe(true);
    expect(s.label).toContain('~10 Q');
  });
  it('labels a full test with minutes and "full test"', () => {
    expect(activitySummary({ type: 'test', duration: 70 }).label).toBe('70 MIN · full test');
  });
  it('shows minutes only for a strategy tip', () => {
    expect(activitySummary({ type: 'strategy', duration: 10 }).label).toBe('10 MIN');
  });
  it('returns null for a non-object', () => {
    expect(activitySummary(null)).toBeNull();
  });
});

describe('activityBreakdown', () => {
  it('returns nothing for non-practice activities', () => {
    expect(activityBreakdown({ type: 'strategy' })).toEqual([]);
  });
  it('makes one row per missed pattern (cap 3), humanized', () => {
    const rows = activityBreakdown({ type: 'practice', section: 'math', skillId: 'lin', missedPatterns: ['slope-from-two-points', 'interpret-slope'] });
    expect(rows).toHaveLength(2);
    // Conventional title case via the canonical formatter (small words stay lowercase).
    expect(rows[0].label).toBe('Slope from Two Points');
    // Never drilled → all to-do.
    expect(rows.every((r) => r.status === 'todo')).toBe(true);
  });
  it('marks every row done when the activity is completed', () => {
    const rows = activityBreakdown({ type: 'practice', skillId: 'lin', completed: true, missedPatterns: ['a-b', 'c-d'] });
    expect(rows.every((r) => r.complete)).toBe(true);
  });
  it('projects drill evidence from HISTORY entries after the cutoff', () => {
    const now = Date.now();
    const rows = activityBreakdown(
      { type: 'practice', skillId: 'lin', missedPatterns: ['a-a', 'b-b', 'c-c'] },
      { lin: { attempts: 6, correct: 4, mastery: 66, history: [
        { correct: true, timestamp: now - 1000 },
        { correct: true, timestamp: now - 900 },
        { correct: true, timestamp: now - 800 },
        { correct: false, timestamp: now - 700 },
      ] } },
    );
    expect(rows[0].status).toBe('done');
    expect(rows.some((r) => r.status === 'active')).toBe(true);
  });

  it('ignores measurement-seeded history at/before the plan cutoff (no phantom day-one progress)', () => {
    const planBorn = Date.now();
    const rows = activityBreakdown(
      { type: 'practice', skillId: 'lin', missedPatterns: ['a-a', 'b-b'] },
      // Diagnostic seeding lands AT plan-generation time — before the cutoff.
      { lin: { attempts: 3, correct: 1, mastery: 33, history: [
        { correct: true, timestamp: planBorn - 5000 },
        { correct: false, timestamp: planBorn - 5000 },
        { correct: false, timestamp: planBorn - 5000 },
      ] } },
      { sinceMs: planBorn },
    );
    expect(rows.every((r) => r.status === 'todo')).toBe(true);
    expect(rows.every((r) => r.prog.startsWith('0/'))).toBe(true);
  });
  it('falls back to a single skill row when no patterns are tagged', () => {
    const rows = activityBreakdown({ type: 'practice', skillName: 'Central ideas' });
    expect(rows).toHaveLength(1);
    expect(rows[0].label).toBe('Central ideas');
  });
});
