import { buildDiagnosisNuances, pickHomeNuance, suggestRaisedTarget, TARGET_NUANCE_KINDS } from '../diagnosisNuances';

const TODAY = new Date(2026, 7, 24); // 2026-08-24 local
const kinds = (list) => list.map((n) => n.kind);

describe('buildDiagnosisNuances', () => {
  it('flags a target the whole range already clears, with a raised suggestion', () => {
    const out = buildDiagnosisNuances({ band: { low: 1360, high: 1440 }, targetScore: 1300, testDate: '2026-10-03', today: TODAY });
    expect(kinds(out)).toEqual(['target-below-range']);
    const n = out[0];
    expect(n.suggestedTarget).toBe(1500);
    expect(n.message).toContain('1360');
    expect(n.message).toContain('1500');
    expect(n.action).toEqual({ kind: 'target', label: 'Raise your target' });
    expect(TARGET_NUANCE_KINDS.has(n.kind)).toBe(true);
  });

  it('near the ceiling it points at 1600 instead of a round-up', () => {
    const out = buildDiagnosisNuances({ band: { low: 1560, high: 1600 }, targetScore: 1500, today: TODAY });
    expect(out[0].kind).toBe('target-below-range');
    expect(out[0].suggestedTarget).toBe(1600);
    expect(out[0].title).toContain('ceiling');
  });

  it('a point score (post-test home card) works as a zero-width band', () => {
    const out = buildDiagnosisNuances({ score: 1400, targetScore: 1300, today: TODAY });
    expect(out[0].kind).toBe('target-below-range');
    expect(out[0].message).toContain('Your latest score, 1400');
    expect(out[0].short).toContain('1400');
  });

  it('a target inside the band asks for a full test rather than a new goal', () => {
    const out = buildDiagnosisNuances({ band: { low: 1260, high: 1340 }, targetScore: 1300, testDate: '2026-10-03', today: TODAY });
    expect(kinds(out)).toEqual(['target-inside-range']);
    expect(out[0].action.kind).toBe('practiceTest');
  });

  it('a point score equal to or above the target never reads as "inside range"', () => {
    expect(kinds(buildDiagnosisNuances({ score: 1300, targetScore: 1300, today: TODAY }))).toEqual(['target-below-range']);
    expect(kinds(buildDiagnosisNuances({ score: 1250, targetScore: 1300, today: TODAY }))).toEqual([]);
  });

  it('flags a steep climb for the time left, but not a reasonable one', () => {
    // 1500 - 1140 = 360 points in 19 days → steep.
    const steep = buildDiagnosisNuances({ band: { low: 1060, high: 1140 }, targetScore: 1500, testDate: '2026-09-12', today: TODAY });
    expect(kinds(steep)).toEqual(['gap-vs-time']);
    expect(steep[0].title).toContain('360 points in 19 days');
    expect(steep[0].action.kind).toBe('testDate');
    // Same gap with 3 months → fine.
    const ok = buildDiagnosisNuances({ band: { low: 1060, high: 1140 }, targetScore: 1500, testDate: '2026-12-05', today: TODAY });
    expect(kinds(ok)).toEqual([]);
  });

  it('a past test date comes first and names the next official sittings', () => {
    const out = buildDiagnosisNuances({ band: { low: 1360, high: 1440 }, targetScore: 1300, testDate: '2026-08-22', today: TODAY });
    expect(kinds(out)).toEqual(['test-date-passed', 'target-below-range']);
    expect(out[0].title).toContain('Aug 22');
    expect(out[0].message).toContain('2 days in the past');
    expect(out[0].message).toContain('Sep 12');
    expect(out[0].message).toContain('Oct 3');
    expect(out[0].action.kind).toBe('testDate');
  });

  it('an official reported score outranks the band for the target rule', () => {
    const out = buildDiagnosisNuances({ band: { low: 1160, high: 1240 }, officialScore: 1350, targetScore: 1300, today: TODAY });
    expect(kinds(out)).toEqual(['target-below-range']);
    expect(out[0].message).toContain('Your official SAT score, 1350, clears it.');
    expect(out[0].suggestedTarget).toBe(1400);
  });

  it('a past date with a report changes the advice instead of nagging', () => {
    const reported = buildDiagnosisNuances({ testDate: '2026-08-22', scoreReports: { '2026-08-22': { status: 'reported', composite: 1450 } }, today: TODAY });
    expect(reported[0].title).toBe('Aug 22 is done');
    expect(reported[0].message).toContain('official score: 1450');
    expect(reported[0].action.label).toBe('Set your next test date');
    const skipped = buildDiagnosisNuances({ testDate: '2026-08-22', scoreReports: { '2026-08-22': { status: 'not-taken' } }, today: TODAY });
    expect(skipped[0].title).toBe("You didn't sit the Aug 22 SAT");
    // No report yet, before release: says when scores are expected.
    const pending = buildDiagnosisNuances({ testDate: '2026-08-22', today: TODAY });
    expect(pending[0].message).toContain('Scores are expected Sep 4');
    // After release: points at Home's prompt.
    const out = buildDiagnosisNuances({ testDate: '2026-08-22', today: new Date(2026, 8, 10) });
    expect(out[0].message).toContain('Scores should be out now');
  });

  it('asks for a target when none is set', () => {
    const out = buildDiagnosisNuances({ band: { low: 1200, high: 1280 }, targetScore: null, today: TODAY });
    expect(kinds(out)).toEqual(['no-target']);
  });

  it('ignores section-scale legacy targets for band rules', () => {
    const out = buildDiagnosisNuances({ band: { low: 1360, high: 1440 }, targetScore: 750, today: TODAY });
    expect(kinds(out)).toEqual([]);
  });

  it('notes a thin sitting', () => {
    const out = buildDiagnosisNuances({ band: { low: 1000, high: 1140 }, targetScore: 1100, answeredCount: 24, totalCount: 40, today: TODAY });
    expect(kinds(out)).toEqual(['target-inside-range', 'thin-sitting']);
    expect(out[1].title).toBe('You left 16 of 40 questions blank');
    expect(out[1].action).toBeNull();
  });

  it('skips every band rule for a focus-weighted check-in but keeps the date rule', () => {
    const out = buildDiagnosisNuances({ band: { low: 1100, high: 1180 }, targetScore: 1000, testDate: '2026-08-01', answeredCount: 10, totalCount: 18, isCheckin: true, today: TODAY });
    expect(kinds(out)).toEqual(['test-date-passed']);
  });

  it('suggestRaisedTarget rounds up to the next 50 above the top and caps at 1600', () => {
    expect(suggestRaisedTarget(1440)).toBe(1500);
    expect(suggestRaisedTarget(1450)).toBe(1500);
    expect(suggestRaisedTarget(1460)).toBe(1550);
    expect(suggestRaisedTarget(1590)).toBe(1600);
    expect(suggestRaisedTarget(NaN)).toBeNull();
  });
});

describe('pickHomeNuance', () => {
  it('returns the most urgent actionable nuance, and null when only informational ones exist', () => {
    const list = buildDiagnosisNuances({ band: { low: 1360, high: 1440 }, targetScore: 1300, testDate: '2026-08-22', today: TODAY });
    expect(pickHomeNuance(list).kind).toBe('test-date-passed');
    const inside = buildDiagnosisNuances({ band: { low: 1260, high: 1340 }, targetScore: 1300, answeredCount: 20, totalCount: 40, today: TODAY });
    expect(pickHomeNuance(inside)).toBeNull();
    expect(pickHomeNuance([])).toBeNull();
    expect(pickHomeNuance(null)).toBeNull();
  });
});
