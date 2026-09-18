/**
 * Starter plan: onboarding answers → provisional study plan via the REAL
 * generateStudyPlan. Pins the contract the dashboard and drill routing
 * depend on: weeks render, weaknesses are drill-shaped with section tags,
 * the check-in opens week 1, and the plan is marked provisional.
 */
import { buildStarterPlan, buildStarterDiagnostic, STARTER_PLAN_SOURCE } from '../starterPlanService';

const FULL_PROFILE = {
  targetScore: 1400,
  currentScore: 1050,
  testDate: '2026-11-07',
  worryArea: 'math',
  weakMathAreas: ['algebra', 'geometry'],
  weakRWAreas: ['grammar'],
  studyDaysPerWeek: 4,
};

describe('buildStarterDiagnostic', () => {
  test('carries self-reported areas as suspected weak skills with section tags', () => {
    const diag = buildStarterDiagnostic(FULL_PROFILE);
    const skills = diag.skillAnalysis.weakSkills;
    expect(skills.length).toBeGreaterThan(0);
    expect(skills.every((s) => s.evidenceLevel === 'suspected' && s.attempted === 0)).toBe(true);
    const sections = new Set(skills.map((s) => s.section));
    expect(sections.has('math')).toBe(true);
    expect(sections.has('rw')).toBe(true);
  });

  test('falls back to the coarse worry area when detailed screens were skipped', () => {
    const diag = buildStarterDiagnostic({ targetScore: 1300, worryArea: 'rw' });
    const skills = diag.skillAnalysis.weakSkills;
    expect(skills.length).toBeGreaterThan(0);
    expect(skills.every((s) => s.section === 'rw')).toBe(true);
  });

  test('estimates a current score when none was given', () => {
    const diag = buildStarterDiagnostic({ targetScore: 1500 });
    expect(diag.score.scaled).toBe(1250);
    expect(buildStarterDiagnostic({}).score.scaled).toBe(1150);
  });
});

describe('buildStarterPlan', () => {
  test('produces a renderable plan marked as the onboarding starter', () => {
    const plan = buildStarterPlan(FULL_PROFILE);
    expect(plan).not.toBeNull();
    expect(plan.planSource).toBe(STARTER_PLAN_SOURCE);
    expect(plan.basedOnTest).toBe(STARTER_PLAN_SOURCE);
    expect(Array.isArray(plan.weeks)).toBe(true);
    expect(plan.weeks.length).toBeGreaterThan(0);
    expect(plan.weeks[0].activities.length).toBeGreaterThan(0);
  });

  test('week 1 opens with the mini-diagnostic check-in and no other tests survive', () => {
    const plan = buildStarterPlan(FULL_PROFILE);
    const first = plan.weeks[0].activities[0];
    expect(first.activityType).toBe('miniDiagnostic');
    expect(first.type).toBe('test');
    const otherTests = plan.weeks.flatMap((w) => w.activities).filter(
      (a) => a.type === 'test' && a.activityType !== 'miniDiagnostic'
    );
    expect(otherTests).toHaveLength(0);
  });

  test('caps non-check-in activities at the student’s stated days per week', () => {
    const plan = buildStarterPlan({ ...FULL_PROFILE, studyDaysPerWeek: 3 });
    plan.weeks.forEach((week, wi) => {
      const nonCheckIn = week.activities.filter((a) => a.activityType !== 'miniDiagnostic');
      expect(nonCheckIn.length).toBeLessThanOrEqual(3);
    });
  });

  test('every plan weakness is drill-shaped with a section tag', () => {
    // Regression: the starter plan shipped without a weaknesses array at all,
    // so Focus Area cards rendered empty despite the onboarding promise —
    // the old (plan.weaknesses || []).forEach pinned nothing on undefined.
    // Found by /qa on 2026-08-04.
    const plan = buildStarterPlan(FULL_PROFILE);
    expect(Array.isArray(plan.weaknesses)).toBe(true);
    expect(plan.weaknesses.length).toBeGreaterThan(0);
    plan.weaknesses.forEach((w) => {
      expect(typeof w.skillId).toBe('string');
      expect(typeof w.skill).toBe('string');
      expect(['math', 'rw']).toContain(w.section);
      expect(w.evidenceLevel).toBe('suspected');
      expect(typeof w.evidence).toBe('string');
    });
    // The dashboard routes drills off these — a weakness for every selected
    // area must survive into the plan (FULL_PROFILE picks math + rw areas).
    const sections = new Set(plan.weaknesses.map((w) => w.section));
    expect(sections.has('math')).toBe(true);
    expect(sections.has('rw')).toBe(true);
  });

  test('never throws on an empty profile — returns a plan or null', () => {
    expect(() => buildStarterPlan({})).not.toThrow();
    expect(() => buildStarterPlan()).not.toThrow();
  });
});

// The Today-slice selector mirrors the starter planSource string (it cannot
// import this service without dragging the whole generator into every
// dashboard chunk). Keep the two in lockstep.
describe('STARTER_PLAN_SOURCE contract', () => {
  test('matches the copy mirrored in selectors/todaySlice', () => {
    // eslint-disable-next-line global-require
    const { STARTER_PLAN_SOURCE: mirrored, isStarterPlan } = require('../selectors/todaySlice');
    expect(mirrored).toBe(STARTER_PLAN_SOURCE);
    expect(isStarterPlan(buildStarterPlan({ targetScore: 1300, weakMathAreas: ['algebra'], studyDaysPerWeek: 3 }))).toBe(true);
  });
});
