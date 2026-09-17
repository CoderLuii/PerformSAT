import { buildDayNarrative } from '../dayNarrative';

const mathAct = (over = {}) => ({ type: 'practice', section: 'math', skillId: 'lin', skillName: 'Linear equations', ...over });
const rwAct = (over = {}) => ({ type: 'practice', section: 'rw', skillId: 'ci', skillName: 'Central ideas', ...over });

describe('buildDayNarrative', () => {
  it('returns empty string for an empty day', () => {
    expect(buildDayNarrative({ activities: [] })).toBe('');
    expect(buildDayNarrative({})).toBe('');
  });

  it('returns empty string when every activity is skipped or a lesson', () => {
    const activities = [
      { type: 'practice', section: 'math', skillId: 'lin', skipped: true },
      { type: 'lesson', title: 'Watch: slope' },
    ];
    expect(buildDayNarrative({ activities })).toBe('');
  });

  it('names accuracy from a matching weakness (the "why")', () => {
    const out = buildDayNarrative({
      activities: [mathAct()],
      weaknesses: [{ skillId: 'lin', accuracy: 42, section: 'math' }],
      daysUntilTest: null,
    });
    expect(out).toContain('Linear equations');
    expect(out).toContain('42%');
    // A concrete watch-for is always appended for practice days.
    expect(out).toContain('As you go,');
  });

  it('falls back gracefully for an unknown skill (no matching weakness)', () => {
    const out = buildDayNarrative({
      activities: [mathAct({ skillId: 'mystery', skillName: 'Mystery skill' })],
      weaknesses: [{ skillId: 'lin', accuracy: 42, section: 'math' }],
      daysUntilTest: null,
    });
    expect(out).toContain('Mystery skill');
    expect(out).toContain('Math');
    expect(out).toContain('newer ground');
    // No test date passed → no day-count clause.
    expect(out).not.toMatch(/\bdays?\b/);
  });

  it('covers both sections when the day mixes Math and R&W', () => {
    const out = buildDayNarrative({
      activities: [mathAct(), rwAct()],
      weaknesses: [],
      daysUntilTest: 45,
    });
    expect(out).toContain('both sections');
    expect(out).toContain('Math');
    expect(out).toContain('Reading & Writing');
    // 45 days → the "steady" band.
    expect(out).toContain('steady');
  });

  it('treats a strategy-only day as a lighter day', () => {
    const out = buildDayNarrative({
      activities: [{ type: 'strategy', title: 'Pacing Reset', tips: ['Move on when stuck.'] }],
      weaknesses: [],
    });
    expect(out).toContain('lighter');
    expect(out).toContain('Pacing Reset');
    // A tips-only day has no section watch-for line.
    expect(out).not.toContain('As you go,');
  });

  it('short-circuits to a test-day narrative and flags the PT2 checkpoint', () => {
    const pt2 = buildDayNarrative({ activities: [{ type: 'test', title: 'Take Practice Test 2' }], daysUntilTest: 10 });
    expect(pt2).toContain('Practice Test 2');
    expect(pt2).toContain('checkpoint');

    const generic = buildDayNarrative({ activities: [{ type: 'test', title: 'Final Practice Test' }] });
    expect(generic).toContain('full practice test');
  });

  it("names the starter plan's check-in as the diagnostic, never a full practice test", () => {
    const diag = buildDayNarrative({
      activities: [{ type: 'test', activityType: 'miniDiagnostic', title: 'Take your diagnostic' }],
      daysUntilTest: 79,
    });
    expect(diag).toContain('your diagnostic');
    expect(diag).toContain('half the length');
    expect(diag).not.toContain('full practice test');
  });

  describe('days-until-test phrasing bounds', () => {
    const day = { activities: [mathAct()], weaknesses: [] };
    const at = (d) => buildDayNarrative({ ...day, daysUntilTest: d });

    it('far out → build the base carefully', () => {
      expect(at(90)).toContain('build the base carefully');
      expect(at(61)).toContain('build the base carefully');
    });
    it('mid-range → steady, deliberate reps', () => {
      expect(at(40)).toContain('keep steady, deliberate reps');
      expect(at(22)).toContain('keep steady, deliberate reps');
    });
    it('closing in → accuracy over volume', () => {
      expect(at(21)).toContain('accuracy over volume');
      expect(at(8)).toContain('accuracy over volume');
    });
    it('final week → consistency, not new material', () => {
      expect(at(7)).toContain('days away');
      expect(at(5)).toContain('drill for consistency');
      expect(at(1)).toContain('1 day away');
    });
    it('exam day → today', () => {
      expect(at(0)).toContain('exam is today');
    });
    it('past the exam → no day-count clause', () => {
      const out = at(-3);
      expect(out).not.toMatch(/With .*exam|days? away|days? to go|days? left/);
    });
  });
});
