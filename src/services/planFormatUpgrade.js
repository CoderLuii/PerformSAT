/**
 * planFormatUpgrade.js — plan format versioning + the drill-shaped activity
 * builder shared by the generator (new plans) and the read-time upgrade of
 * persisted plans (legacy plans).
 *
 * ZERO corpus imports by design: useProgress (main chunk) runs the upgrade on
 * hydration, so this module may only depend on pure-constant taxonomy files
 * (bundleGuard). The generator imports buildSkillDrillActivity from here so
 * generated and upgraded activities share one shape.
 *
 * Format history:
 *   1 (implicit) — weeks[].activities only contained math module/section
 *       practice + strategy/review/test items. R&W gaps and math gaps that
 *       missed the hand-authored module map emitted NOTHING ("targeted
 *       practice" weeks could be entirely empty).
 *   2 — drill-shaped activities (skillId + section, no moduleId) cover both
 *       sections; upgradeLegacyPlanWeeks backfills them into persisted plans
 *       from plan.weaknesses. (Dev-only stamp, never shipped.)
 *   3 — also heals the cross-scale "past your target" headline on upgraded
 *       plans. (Dev-only stamp, never shipped.)
 *   4 — backfilled activities carry a `day` assignment (getTodaySlice
 *       surfaces activities by day name; day-less additions existed only in
 *       the Weekly View). Re-running on a v2/v3 plan assigns days to any
 *       existing day-less augmented activities in place — positions never
 *       move, so completion indexes stay valid.
 */

import { CB_RW_SKILLS } from '../data/questions/cbSkillTaxonomy';

export const PLAN_FORMAT_VERSION = 4;

// Official display labels for R&W activity titles — weakness.name comes from
// humanizeSkillId kebab title-casing, which mangles official names
// ('Form Structure And Sense' vs 'Form, Structure, and Sense').
export const RW_SKILL_LABELS = Object.fromEntries(CB_RW_SKILLS.map(s => [s.slug, s.label]));

/**
 * Build a drill-shaped practice activity for a skill gap with no math-module
 * coordinates: every R&W gap, and any math gap whose skillId misses the
 * hand-authored module map. Launches through resolveActivityDrill →
 * AssignedPracticeShell (the focus-area Practice route), so it carries
 * skillId + section and deliberately NO moduleId — the module fallback route
 * serves the math topic corpus only.
 *
 * @param {{skillId: string, skillName?: string, section?: string, priority?: number}} gap
 * @returns {Object} a weeks[].activities[] entry
 */
// Plain-language reasons per error class (diagnosticEngine 6-class taxonomy).
// These become the "why this is on YOUR plan" line under each task.
const ERROR_PHRASES = {
  conceptual_gap: 'the misses trace to the concept itself, not carelessness',
  procedural_error: 'you know the idea but the steps break down mid-solve',
  trap_susceptibility: "you're falling for the trap answers, not the content",
  time_pressure: 'the misses cluster where you were rushing',
  careless_error: 'you know this — the misses were slips, and slips are fixable',
  unanswered: 'these went unanswered — a time problem, not a knowledge problem',
};

/**
 * One evidence-grounded sentence explaining why this gap earned a spot on the
 * plan. Built from the gap's own diagnostic fields; returns null when there is
 * no honest evidence to cite (the UI then just omits the line).
 *
 * @param {{testAccuracy?:number, primaryErrorType?:string, evidenceLevel?:string, trend?:string}} gap
 * @returns {string|null}
 */
export const buildBecauseLine = (gap = {}) => {
  if (!gap) return null;
  // Onboarding self-reports (the starter plan stamps this exact error type)
  // have no test evidence to cite — frame the check-in instead.
  if (String(gap.primaryErrorType || '').toLowerCase().startsWith('self-reported')) {
    return 'You flagged this in onboarding — the diagnostic measures your real level.';
  }
  const parts = [];
  if (Number.isFinite(gap.testAccuracy)) {
    parts.push(`You scored ${Math.round(gap.testAccuracy)}% on this on your last test`);
  }
  const phrase = ERROR_PHRASES[String(gap.primaryErrorType || '').toLowerCase()];
  if (phrase) parts.push(phrase);
  // 'suspected' here means a thin sample (<4 attempted) on a real test — be
  // honest about the evidence rather than overclaiming.
  if (gap.evidenceLevel === 'suspected' && parts.length > 0) {
    parts.push('small sample so far, so this session doubles as a probe');
  }
  if (gap.trend === 'declining') parts.push('and it slipped since the test before');
  if (parts.length === 0) return null;
  return `${parts.join(' — ')}.`;
};

export const buildSkillDrillActivity = (gap) => {
  const section = gap.section === 'rw' ? 'rw' : 'math';
  const label = section === 'rw'
    ? (RW_SKILL_LABELS[gap.skillId] || gap.skillName || gap.skillId)
    : (gap.skillName || gap.skillId);
  const because = buildBecauseLine(gap);
  return {
    ...(because ? { because } : {}),
    type: 'practice',
    activityType: 'skillDrill',
    title: `Practice: ${label}`,
    subtitle: section === 'rw' ? 'Reading & Writing drill' : 'Targeted drill',
    skillId: gap.skillId,
    skillName: label,
    section,
    duration: 15,
    priority: gap.priority ?? 50,
    icon: null,
    // Routing evidence that must survive the weakness aging out of the
    // top-8 list: missedPatterns keep Tier-1 alive, domain keeps the math
    // bank's Tier-3 domain fallback reachable (the router's synthetic used
    // to lose it — that was the dead-Launch-button class). Omit when absent,
    // never undefined — Firestore rejects undefined.
    ...(Array.isArray(gap.missedPatterns) && gap.missedPatterns.length > 0
      ? { missedPatterns: gap.missedPatterns }
      : {}),
    ...(gap.domain ? { domain: gap.domain } : {}),
  };
};

/**
 * Does this persisted plan need the format upgrade? True when the version
 * stamp is stale OR when the plan carries day-less augmented activities — a
 * partial-upgrade state (e.g. an interrupted write) that getTodaySlice can't
 * surface in Today's Tasks. The structural check makes the trigger
 * self-healing rather than trusting the stamp alone.
 *
 * @param {Object|null} plan
 * @returns {boolean}
 */
export const planNeedsUpgrade = (plan) => {
  if (!plan || !Array.isArray(plan.weeks) || plan.weeks.length === 0) return false;
  if ((plan.planFormatVersion || 1) < PLAN_FORMAT_VERSION) return true;
  return plan.weeks.some(w => w && !w.isTestWeek && (Array.isArray(w.activities) ? w.activities : []).some(
    a => a && a.augmented && a.type === 'practice' && !a.day
  ));
};

/**
 * One-time upgrade of a persisted format-1 plan: backfill drill-shaped
 * activities (both sections) into light weeks, derived from the plan's own
 * section-tagged weaknesses. APPEND-ONLY — completion marks are keyed by
 * (weekIndex, activityIndex), so existing positions must never shift.
 *
 * Returns the upgraded plan (always stamped with PLAN_FORMAT_VERSION so the
 * caller persists exactly once), or null when the plan is missing, has no
 * weeks, or is already current.
 *
 * @param {Object|null} plan - the persisted study plan
 * @returns {Object|null} upgraded plan or null when no upgrade applies
 */
export const upgradeLegacyPlanWeeks = (plan) => {
  if (!planNeedsUpgrade(plan)) return null;

  const weaknesses = Array.isArray(plan.weaknesses) ? plan.weaknesses : [];

  // Interleave sections so a math-heavy weakness list can't push every R&W
  // drill to the tail (and vice versa).
  const bySection = { math: [], rw: [] };
  weaknesses.forEach(w => {
    if (!w || !w.skillId) return;
    const section = w.section === 'rw' ? 'rw' : 'math';
    bySection[section].push(buildSkillDrillActivity({
      skillId: w.skillId,
      skillName: w.skill || w.name,
      section,
      missedPatterns: w.missedPatterns,
      domain: w.domain,
    }));
  });
  const interleaved = [];
  for (let i = 0; i < Math.max(bySection.math.length, bySection.rw.length); i++) {
    if (bySection.rw[i]) interleaved.push(bySection.rw[i]);
    if (bySection.math[i]) interleaved.push(bySection.math[i]);
  }

  let cursor = 0;
  const weeks = plan.weeks.map(week => {
    if (!week || week.isTestWeek) return week;
    const rawActivities = Array.isArray(week.activities) ? week.activities : [];

    // Day assignment: getTodaySlice surfaces activities by day NAME, so an
    // addition without one would exist only in the Weekly View and never in
    // Today's Tasks. Use the generator's mid-week scheme, skipping days the
    // week already occupies. Earlier upgrade formats (v2/v3, dev-only) left
    // augmented activities day-less — repair them IN PLACE (field addition
    // only; positions never move, completion indexes stay valid).
    const takenDays = new Set(rawActivities.map(a => a && a.day).filter(Boolean));
    const freeDays = ['Wednesday', 'Thursday', 'Friday', 'Tuesday', 'Saturday', 'Monday']
      .filter(d => !takenDays.has(d));
    let dayCursor = 0;
    const nextDay = () => {
      const pool = freeDays.length > 0 ? freeDays : ['Wednesday', 'Thursday', 'Friday'];
      const day = pool[dayCursor % pool.length];
      dayCursor += 1;
      return day;
    };
    const activities = rawActivities.map(a =>
      (a && a.augmented && a.type === 'practice' && !a.day) ? { ...a, day: nextDay() } : a
    );
    const repaired = activities.some((a, i) => a !== rawActivities[i]);

    const practiceCount = activities.filter(a => a && a.type === 'practice').length;
    const wanted = Math.max(0, 2 - practiceCount);
    const additions = [];
    for (let i = 0; i < wanted && i < interleaved.length; i++) {
      const candidate = interleaved[cursor % interleaved.length];
      cursor += 1;
      const dupe = activities.some(a => a && a.skillId === candidate.skillId)
        || additions.some(a => a.skillId === candidate.skillId);
      if (dupe) continue;
      additions.push({ ...candidate, day: nextDay(), weekPhase: 'mid', augmented: true });
    }
    if (additions.length === 0 && !repaired) return week;

    const addedMinutes = additions.reduce((s, a) => s + (a.duration || 0), 0);
    return {
      ...week,
      activities: [...activities, ...additions],
      totalMinutes: typeof week.totalMinutes === 'number' ? week.totalMinutes + addedMinutes : week.totalMinutes,
      practiceCount: typeof week.practiceCount === 'number' ? week.practiceCount + additions.length : week.practiceCount,
    };
  });

  // Heal the cross-scale headline lie: format-1 plans computed scoreGap by
  // raw subtraction, so a composite current score vs a legacy section-scale
  // target rendered "You're past your target". Detect that exact shape and
  // neutralize — the next real regeneration recomputes honestly.
  let summary = plan.summary;
  const crossScale = typeof plan.currentScore === 'number' && typeof plan.targetScore === 'number'
    && plan.currentScore > 800 && plan.targetScore <= 800;
  if (crossScale && summary?.headline && /past your target/i.test(summary.headline)) {
    summary = { ...summary, headline: 'The plan front-loads your costliest gaps.' };
  }

  // Always stamp, even when no week needed backfill — the caller persists
  // once and the upgrade never re-runs for this plan.
  return { ...plan, weeks, summary, planFormatVersion: PLAN_FORMAT_VERSION };
};
