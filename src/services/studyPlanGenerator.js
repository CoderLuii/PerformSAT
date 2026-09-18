/**
 * ═══════════════════════════════════════════════════════════════════════════
 * STUDY PLAN GENERATOR — The Prescriptive Engine of PerformSAT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Takes the output of the Diagnostic Engine and creates a concrete,
 * week-by-week study plan mapped to actual lessons and practice sections
 * in the PerformSAT curriculum.
 *
 * The philosophy: Students don't need to figure out what to study.
 * The system tells them EXACTLY what to do, in what order, and for how long.
 *
 * After each subsequent practice test, the plan adapts:
 * - Skills that improved get less time
 * - Skills that didn't improve get more time + different approach
 * - New weaknesses discovered get added
 * - Target date urgency increases appropriately
 */

import { hasQuestionsForSection, getSectionsWithQuestions } from '../data/questions';
// Servability gate for drill-shaped math activities — mirrors the router's
// cascade so an unmapped math gap whose skillId the bank can't serve emits
// no activity (the pre-feature status quo) instead of a dead Launch button.
import { getTargetedWeaknessSet as bankTargetedWeaknessSet, getQuestionsBySkillIds as bankQuestionsBySkillIds } from '../data/questions/bank';
import { DEFAULT_GOAL_SCORE } from './selectors/goalProgress';
import { getSkillById, skillTaxonomy } from '../data/skillTaxonomy';
import { ERROR_TYPES } from './diagnosticEngine';
import { generatePracticeAssignments, buildAdaptiveQueueSeed, buildStrengthFocusAssignments, serializeAdaptiveState, createAdaptiveSessionState } from './practiceAssignmentService';
// SKILL_ALIAS_MAP from aliases.js (pure constants, Stage 2a bundle split);
// resolveQuestionById (practiceAssignmentService) dispatches by id namespace
// to the right bank — wrong-answer reinsertion must resolve rw- ids too.
import { SKILL_ALIAS_MAP } from '../data/questions/bank/aliases';
import { resolveQuestionById } from './practiceAssignmentService';
import { getSkillSection } from '../data/questions/rwBank/taxonomy';
// Shared with the read-time legacy-plan upgrade (useProgress) so generated
// and upgraded activities have one shape. planFormatUpgrade is corpus-free.
import { buildSkillDrillActivity, buildBecauseLine, PLAN_FORMAT_VERSION } from './planFormatUpgrade';
import { parseLocalDate } from '../utils/localDate';
// Display-band mapping shared with the plan editor's setPacing so a
// user-minutes override keeps intensity/label/minutes mutually consistent.
import { intensityForMinutes } from './studyPlanEditor';
// Schedule truth: the per-day minutes map derived from what onboarding actually
// collected (days/week, study window, session length) or the student's edit.
import { deriveSchedule, scheduledDayNames, testDayFor, weeklyMinutes } from './studySchedule';

// R&W domain weights for gap priority — the math side reads
// skillTaxonomy.domains[..].satWeight; the R&W taxonomy has no weight field.
// Approximate official R&W domain share of the section.
const RW_DOMAIN_SAT_WEIGHT = {
  'information-and-ideas': 0.26,
  'craft-and-structure': 0.28,
  'standard-english-conventions': 0.26,
  'expression-of-ideas': 0.20,
};

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

// How many minutes per day is realistic at each intensity level
const INTENSITY_LEVELS = {
  light:     { minutesPerDay: 20, label: 'Light', description: '20 min/day — maintaining skills', daysPerWeek: 5 },
  moderate:  { minutesPerDay: 35, label: 'Moderate', description: '35 min/day — steady progress', daysPerWeek: 5 },
  focused:   { minutesPerDay: 50, label: 'Focused', description: '50 min/day — significant gains', daysPerWeek: 6 },
  intensive: { minutesPerDay: 75, label: 'Intensive', description: '75 min/day — aggressive improvement', daysPerWeek: 6 },
  marathon:  { minutesPerDay: 100, label: 'Marathon', description: '100 min/day — maximum push', daysPerWeek: 7 },
};

// The first plan from a single diagnostic stays short and in-depth: a focused
// 2-week cycle on the student's top weaknesses, capped here, that ends with a
// "Take Practice Test 2" checkpoint. The second test gathers the evidence to
// generate the full, longer, more personalized plan. One test is too little
// signal to confidently schedule 10 weeks — and a 10-week wall reads as noise.
const INITIAL_PLAN_WEEKS = 2;

// The plan arc now spans the student's real runway (capped here). Near weeks
// are fully scheduled from the activity pool; far weeks render as themed
// outlines ("Sessions unlock as you go") and fill in as each regeneration
// approaches them — so a 10-week runway reads as a 10-week arc, not a wall of
// stale detail. The first plan stays short (INITIAL_PLAN_WEEKS) because one
// test is too little signal to schedule months.
const MAX_PLAN_WEEKS = 12;

// Approximate time for different activity types (in minutes)
const ACTIVITY_DURATIONS = {
  watchLesson: 8,         // Watch a video lesson
  readLesson: 5,          // Read a text lesson
  practiceSection: 15,    // Complete a 5-question practice section
  reviewMistakes: 10,     // Review past mistakes
  practiceTest: 70,       // Full practice test (35 min × 2 modules)
  strategyDrill: 10,      // Trap recognition or time management drill
};

// Module to skill mapping — skill IDs must match canonical IDs in the question bank
const MODULE_SKILL_MAP = {
  'linear-equations':      ['slope-from-points', 'slope-intercept-form', 'word-problem-to-equation', 'table-to-equation', 'function-evaluation', 'parallel-line-slope', 'writing-parallel-equation', 'perpendicular-negative-reciprocal', 'writing-perpendicular-equation'],
  'functions':             ['function-notation', 'domain-restrictions', 'function-composition', 'function-transformations', 'finding-function-from-conditions'],
  'systems':               ['system-solution-types', 'setting-up-systems', 'substitution-method', 'elimination-method', 'graphing-systems', 'infinite-solutions-condition'],
  'transformations':       ['function-transformations', 'vertical-shifts', 'horizontal-shifts', 'reflections'],
  'exponents':             ['exponent-laws', 'zero-negative-exponents', 'exponential-growth-decay', 'exponential-y-intercept', 'comparing-exponentials'],
  'percents':              ['percent-decimal-conversion', 'percent-of-value', 'percent-change', 'percent-word-problems', 'successive-percent-change', 'ratio-proportion', 'unit-rates'],
  'quadratics':            ['identify-quadratic', 'finding-roots-factoring', 'discriminant-analysis', 'vertex-formula', 'vertex-form', 'completing-square-circles', 'parabola-direction', 'roots-from-factors', 'converting-quadratic-forms'],
  'triangles':             ['pythagorean-theorem', 'soh-cah-toa', 'special-right-triangles', 'similar-triangles', 'triangle-angle-sum', 'triangle-area', 'triangle-inequality', 'triangle-types'],
  'circles':               ['circle-equation', 'circle-area', 'circle-parts', 'sector-area', 'degrees-to-radians', 'radians-to-degrees', 'arc-length', 'circumference', 'tangent-lines'],
  'statistics':            ['calculate-mean', 'weighted-mean', 'find-median', 'find-mode', 'range-calculation', 'standard-deviation-concept', 'margin-of-error', 'two-way-table', 'probability-basics', 'conditional-probability'],
  'radians-degrees':       ['degrees-to-radians', 'radians-to-degrees', 'radian-measure-understanding'],
  'dimensional-analysis':  ['unit-conversion', 'squared-cubed-units', 'rate-conversion', 'ratio-proportion', 'unit-rates'],
  'equivalent-expressions':['distributive-property', 'combining-like-terms', 'simplifying-rational-expressions', 'difference-of-squares', 'perfect-square-trinomial'],
  'volume':                ['volume-prism', 'volume-sphere', 'volume-pyramid-cone', 'volume-scaling'],
};

// Reverse mapping: skill → modules that teach it
const buildSkillToModuleMap = () => {
  const map = {};
  Object.entries(MODULE_SKILL_MAP).forEach(([moduleId, skills]) => {
    skills.forEach(skillId => {
      if (!map[skillId]) map[skillId] = [];
      map[skillId].push(moduleId);
    });
  });
  return map;
};

const SKILL_TO_MODULE_MAP = buildSkillToModuleMap();

// ═══════════════════════════════════════════════════════════════════════════
// MAIN STUDY PLAN GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Compute a difficulty mix tailored to the student's actual accuracy profile.
 */
function computeDifficultyMix(difficultyAnalysis) {
  if (!difficultyAnalysis?.levels) {
    return { easy: 0.30, medium: 0.45, hard: 0.25 };
  }
  const { easy, medium } = difficultyAnalysis.levels;
  const easyAcc = easy?.accuracy ?? 70;
  const medAcc = medium?.accuracy ?? 50;
  const cliff = difficultyAnalysis.difficultyCliff;

  if (cliff === 'easy' || easyAcc < 60) {
    return { easy: 0.55, medium: 0.35, hard: 0.10 };
  }
  if (cliff === 'medium' || (easyAcc >= 75 && medAcc < 55)) {
    return { easy: 0.20, medium: 0.60, hard: 0.20 };
  }
  if (easyAcc >= 80 && medAcc >= 65) {
    return { easy: 0.15, medium: 0.45, hard: 0.40 };
  }
  if (easyAcc >= 70 && medAcc >= 50) {
    return { easy: 0.25, medium: 0.50, hard: 0.25 };
  }
  return { easy: 0.30, medium: 0.45, hard: 0.25 };
}

/**
 * Extract question IDs the student answered incorrectly in the previous plan's
 * adaptive session for cross-session wrong-answer reinsertion.
 */
function extractWrongAnswerIds(previousPlan, currentExcludeIds) {
  if (!previousPlan?.adaptivePracticeState?.answered) return [];
  const excludeSet = new Set(currentExcludeIds);
  return previousPlan.adaptivePracticeState.answered
    .filter(a => !a.correct && !a.isRetry)
    .map(a => a.id)
    .filter(id => id && !excludeSet.has(id))
    .slice(-10);
}

/**
 * Generate a complete study plan from diagnostic results.
 *
 * @param {Object} diagnostic - Output from diagnosticEngine.runDiagnostic()
 * @param {Object} userProfile - { targetScore, testDate, currentScore }
 * @param {Object} completedLessons - Student's completed lessons map
 * @param {Object} practiceProgress - Student's practice progress map
 * @param {Object|null} previousPlan - Previous study plan (for adaptation)
 * @returns {Object} Complete study plan
 */
export const generateStudyPlan = (diagnostic, userProfile = {}, completedLessons = {}, practiceProgress = {}, previousPlan = null, longitudinal = null, answeredQuestionIds = []) => {
  const { targetScore = DEFAULT_GOAL_SCORE, testDate } = userProfile;
  const currentScore = diagnostic.score.scaled;

  // ═══ Scale-guarded gap basis ═══
  // currentScore is composite (400-1600) for multi-section tests but legacy
  // targets (≤800) are section-scale math goals — raw subtraction produced
  // "You're past your target" for a 920-composite student chasing 750 Math.
  // Compare like with like: same scale directly; a section-scale target vs a
  // composite current falls back to the diagnosis's own math section score
  // (legacy section targets are math goals by provenance). When no honest
  // comparison exists, scoreGap is null and copy/intensity use defaults.
  const currentIsComposite = diagnostic.score?.isMultiSection === true || currentScore > 800;
  const targetIsComposite = targetScore > 800;
  let gapBasis = null; // { current, target, label } on ONE scale
  if (currentIsComposite === targetIsComposite) {
    gapBasis = { current: currentScore, target: targetScore, label: '' };
  } else if (!targetIsComposite && typeof diagnostic.score?.sections?.math === 'number') {
    gapBasis = { current: diagnostic.score.sections.math, target: targetScore, label: ' in Math' };
  }
  const scoreGap = gapBasis ? Math.max(0, gapBasis.target - gapBasis.current) : null;

  // ═══ Calculate time constraints ═══
  const daysUntilTest = getDaysUntil(testDate);
  const weeksUntilTest = daysUntilTest !== null ? Math.ceil(daysUntilTest / 7) : MAX_PLAN_WEEKS;
  let effectiveWeeks = Math.min(Math.max(1, weeksUntilTest), MAX_PLAN_WEEKS); // Cap at 5 weeks

  // ═══ First-plan gating: short focused cycle → retest → deeper plan ═══
  // Count the distinct tests that have produced data, the triggering one
  // included. Counting (rather than checking `previousPlan`) is timing-
  // independent: it holds whether or not the just-finished test has hydrated
  // into practiceTestResults yet, AND across the deterministic + hybrid
  // generation phases (the hybrid phase re-reads the freshly-persisted first
  // plan as `previousPlan`, so a `!previousPlan` check would misfire there).
  const testsWithData = new Set(
    [
      ...((longitudinal?.scoreTrajectory || []).map((t) => t.testId)),
      diagnostic.testId,
    ].filter(Boolean),
  ).size;
  const isFirstPlan = testsWithData <= 1;
  if (isFirstPlan) {
    effectiveWeeks = Math.min(effectiveWeeks, INITIAL_PLAN_WEEKS);
  }

  // ═══ Determine study intensity ═══
  // Null gap (cross-scale, no per-section data) → a moderate default climb.
  let intensity = calculateIntensity(scoreGap ?? 100, daysUntilTest);

  // Adherence right-sizing: intensity used to come purely from score gap ÷
  // days, so a student who completed 20% of a 50-min/day plan got prescribed
  // MORE. If they finished under 40% of the previous plan, step one band down
  // (floor at moderate) — a plan they'll actually do beats one they won't.
  //
  // Self-echo guard: a "previous plan" generated from THIS SAME test within
  // the last few hours is our own Phase-1 artifact (or a rapid re-run), whose
  // activities are all trivially incomplete — 0% completion there is not
  // adherence evidence. Without this, the Phase-2 hybrid plan stepped
  // intensity down on ~every test.
  const planIsFromThisTest = !!(
    previousPlan?.basedOnTest &&
    previousPlan.basedOnTest === diagnostic.testId &&
    previousPlan.generatedAt &&
    (Date.now() - Date.parse(previousPlan.generatedAt)) < 6 * 3600 * 1000
  );
  const prevCompletion = planIsFromThisTest ? null : computePlanCompletionRate(previousPlan);
  if (prevCompletion !== null && prevCompletion < 0.4) {
    const order = ['light', 'moderate', 'focused', 'intensive', 'marathon'];
    const idx = order.indexOf(intensity);
    if (idx > 1) intensity = order[idx - 1];
  }

  let intensityConfig = INTENSITY_LEVELS[intensity];

  // The student's explicit pacing edit (Study Plan editor → setPacing writes
  // plan.userPrefs) survives regeneration — their stated minutes/day beats
  // the band's prescription.
  const userPrefs = previousPlan?.userPrefs?.edited ? previousPlan.userPrefs : null;
  const userMinutes = userPrefs && Number.isFinite(userPrefs.minutesPerDay) && userPrefs.minutesPerDay > 0
    ? Math.round(userPrefs.minutesPerDay)
    : null;
  if (userMinutes) {
    // Recompute the band from the user's minutes so intensity, label, and
    // description stay consistent — patching minutesPerDay alone persisted
    // "Intensive / 75 min/day — aggressive improvement" beside 20 minutes.
    intensity = intensityForMinutes(userMinutes);
    intensityConfig = { ...INTENSITY_LEVELS[intensity], minutesPerDay: userMinutes };
  }

  // ═══ Weekly schedule: which days, how many minutes each ═══
  // Derived from the profile (studyDaysPerWeek promise, weekend window,
  // session length) or reused verbatim from a student edit. The generator
  // schedules ONLY onto these days from here on.
  const schedule = deriveSchedule(userProfile, intensityConfig, userPrefs);
  // Keep the displayed daysPerWeek honest — it previously came from the
  // intensity band even when the student said 3 days.
  intensityConfig = { ...intensityConfig, daysPerWeek: scheduledDayNames(schedule).length };
  const minutesPerWeek = weeklyMinutes(schedule) || intensityConfig.minutesPerDay * intensityConfig.daysPerWeek;

  // ═══ Replay the edits ledger: student intent survives regeneration ═══
  // A skill the student explicitly removed/de-focused stays suppressed —
  // UNLESS the newest test shows it regressed meaningfully below where it
  // stood when they removed it (then the evidence outranks the edit and it
  // resurfaces). Custom tasks are re-added after distribution below.
  const planEdits = Array.isArray(previousPlan?.planEdits) ? previousPlan.planEdits : [];
  const suppressedSkills = new Map();
  planEdits.forEach((e) => {
    if ((e.type === 'remove' || e.type === 'defocus') && e.skillId) {
      suppressedSkills.set(e.skillId, e);
    }
  });

  // ═══ Gather all skill gaps from the diagnostic ═══
  const skillGaps = gatherSkillGaps(diagnostic).filter((g) => {
    const edit = suppressedSkills.get(g.skillId);
    if (!edit) return true;
    const base = Number.isFinite(edit.accuracyAtEdit) ? edit.accuracyAtEdit : 100;
    const regressed = Number.isFinite(g.testAccuracy) && g.testAccuracy <= base - 15;
    return regressed;
  });

  // ═══ Map skill gaps to specific curriculum activities ═══
  const activities = mapGapsToActivities(skillGaps, completedLessons, practiceProgress, diagnostic);

  // ═══ Add strategy activities (trap avoidance, time management, etc.) ═══
  const strategyActivities = generateStrategyActivities(diagnostic);

  // ═══ Distribute activities across weeks ═══
  // ═══ Gap-aware mix: a 200-point climb and a 40-point polish are different
  // plans, not different intensities of the same plan ═══
  // Large gap: protect strengths with short maintenance sets so they don't
  // decay while every session attacks weaknesses.
  if (scoreGap !== null && scoreGap > 150) {
    (diagnostic.skillAnalysis?.strongSkills || []).slice(0, 2).forEach((s) => {
      if (!s?.skillId) return;
      activities.push({
        ...buildSkillDrillActivity({ skillId: s.skillId, skillName: s.name, section: s.section, priority: 30 }),
        title: `Keep sharp: ${s.name || s.skillId}`,
        subtitle: 'Maintenance set — protect a strength while the plan rebuilds weaknesses',
        because: "You're strong here — one short set keeps it that way during a big climb.",
      });
    });
  }

  const weeklyPlan = distributeAcrossWeeks(
    activities,
    strategyActivities,
    effectiveWeeks,
    minutesPerWeek,
    diagnostic,
    previousPlan,
    longitudinal,
    isFirstPlan,
    schedule,
    scoreGap,
    DAY_ORDER[(new Date().getDay() + 6) % 7] // JS Sunday-first → Monday-first
  );

  // ═══ Replay custom tasks from the ledger into the fresh plan ═══
  // Their ledger entries survive (carried onto the new plan below), so a task
  // the student wrote keeps coming back until they remove it.
  const customEdits = planEdits.filter((e) => e.type === 'custom' && e.task?.title);
  if (customEdits.length > 0 && weeklyPlan[0]) {
    const firstDay = scheduledDayNames(schedule)[0] || 'Monday';
    customEdits.forEach((e) => {
      weeklyPlan[0].activities.push({
        type: 'custom',
        activityType: 'customTask',
        title: e.task.title,
        subtitle: 'Your task',
        duration: Number.isFinite(e.task.duration) ? e.task.duration : 20,
        priority: 0,
        day: e.task.day || firstDay,
        weekPhase: 'mid',
        ...(e.task.section === 'rw' ? { section: 'rw' } : {}),
        custom: true,
        userEdited: true,
      });
    });
  }

  // ═══ Generate the executive summary ═══
  const summary = generatePlanSummary(
    diagnostic, weeklyPlan, intensity, effectiveWeeks,
    daysUntilTest, currentScore, targetScore, skillGaps, gapBasis
  );
  // Summary stats read the band's minutes; the student's explicit pacing
  // preference wins there too.
  if (userMinutes && summary?.stats) {
    summary.stats.minutesPerDay = userMinutes;
  }

  // NOTE (2026-07-19): milestones, spacedRepetitionSchedule, microGoals, and
  // adherenceProjection were generated + persisted here for months with zero
  // consumers anywhere in the UI — pure artifact bloat, and their numbers were
  // invented interpolation curves that contradicted predictionEngine. If a
  // milestone/adherence surface ever ships, ground it in predictionEngine
  // instead of resurrecting those generators (see git history).

  const nextAction = deriveSignalAwareNextAction(weeklyPlan, diagnostic);

  // ═══ Journey arc (Plan v3 A3): the plan's visible destination ═══
  // Phases + dated milestones + a score trajectory, so the plan reads as a
  // route to the goal instead of a list of drills. Consumed by the plan
  // page's mission-control header.
  const arc = buildPlanArc({
    weeks: weeklyPlan,
    gapBasis,
    currentScore,
    targetScore,
    testDate,
    daysUntilTest,
    scoreProjection: diagnostic.scoreProjection || null,
  });

  const generatedAt = new Date().toISOString();

  // ═══ Assign practice questions from the bank ═══
  const assignmentSeed = `${diagnostic.testId || 'diag'}-${generatedAt}`;
  const dynamicMix = computeDifficultyMix(diagnostic.difficultyAnalysis);
  const { targetedQuestionIds, practiceAssignments, summary: assignmentSummary } =
    generatePracticeAssignments({
      diagnostic,
      weekCount: effectiveWeeks,
      excludeIds: answeredQuestionIds,
      seed: assignmentSeed,
      questionsPerWeek: 10,
      difficultyMix: dynamicMix,
    });

  // ═══ Fixed domain assignments for Strengths & Focus Areas ═══
  const domainAssignments = buildStrengthFocusAssignments({
    diagnostic,
    seed: assignmentSeed,
    countPerDomain: 10,
    excludeIds: [...targetedQuestionIds, ...answeredQuestionIds],
  });

  // ═══ Adaptive practice queue seed + initial state (Acely-style) ═══
  const adaptivePractice = buildAdaptiveQueueSeed({
    diagnostic,
    seed: assignmentSeed,
    poolSize: 80,
    excludeIds: answeredQuestionIds,
  });

  // ═══ Cross-session wrong-answer reinsertion ═══
  // Front-load the questions the student missed in the PREVIOUS plan's adaptive
  // session into the NEW seed so the session engine actually re-serves them.
  // getNextAdaptiveQuestion picks from byDifficulty[currentDifficulty] in order
  // (skipping seen ids), so placing a missed id at the FRONT of its matching
  // difficulty bucket guarantees it is the first item served at that level.
  // Deduped, capped at 5, MCQ-only (the adaptive engine only serves MCQ).
  //
  // Historical note: these ids used to be written to weeklyPlan[0]
  // .targetedQuestionIds / .wrongAnswerReinsertion, which NOTHING read — the
  // reinsertion feature was dead. Wiring them into the adaptive seed makes it
  // function through the same path adaptive sessions already consume.
  const wrongQuestionIds = extractWrongAnswerIds(previousPlan, answeredQuestionIds);
  const reinsertedWrongIds = [];
  if (wrongQuestionIds.length > 0) {
    const wrongQuestions = wrongQuestionIds
      .map(id => resolveQuestionById(id)) // section-aware: rw- ids hit the R&W bank
      .filter(q => q && Array.isArray(q.choices) && q.choices.length >= 2)
      .slice(0, 5);
    wrongQuestions.forEach(q => {
      const diff = adaptivePractice.byDifficulty[q.difficulty] ? q.difficulty : 'medium';
      const bucket = adaptivePractice.byDifficulty[diff] || [];
      // Front-load, removing any existing occurrence so ids stay unique.
      adaptivePractice.byDifficulty[diff] = [q.id, ...bucket.filter(id => id !== q.id)];
      if (!adaptivePractice.poolIds.includes(q.id)) {
        adaptivePractice.poolIds = [q.id, ...adaptivePractice.poolIds];
      }
      reinsertedWrongIds.push(q.id);
    });
    if (reinsertedWrongIds.length > 0) {
      adaptivePractice.wrongAnswerReinsertion = reinsertedWrongIds.length;
      adaptivePractice.reinsertedWrongIds = reinsertedWrongIds;
    }
  }

  const adaptivePracticeState = serializeAdaptiveState(
    createAdaptiveSessionState(adaptivePractice),
  );

  return {
    // Core plan data
    weeks: weeklyPlan,
    summary,
    nextAction,
    // Journey arc (Plan v3): phases + milestones + trajectory for the
    // mission-control header. Older plans lack it — every reader must
    // null-guard.
    arc,

    // Adaptive practice (primary — Acely-style)
    adaptivePractice,
    adaptivePracticeState,

    // Fixed domain assignments for Strengths & Focus Areas
    domainAssignments,

    // Legacy practice assignments (fallback)
    targetedQuestionIds,
    practiceAssignments,
    assignmentSummary,

    // Metadata
    intensity,
    intensityConfig,
    // The weekly schedule this plan was built around — the UI renders it and
    // the editor mutates it (via userPrefs.schedule, which wins next time).
    schedule,
    // Sticky pacing preference: setPacing writes this on the plan; carrying
    // it across regenerations is what makes the student's edit durable.
    userPrefs: userPrefs || null,
    // The edits ledger rides every regeneration (suppressions + custom tasks
    // replayed above keep working across the NEXT regeneration too).
    planEdits,
    previousPlanCompletion: prevCompletion,
    currentScore,
    targetScore,
    scoreGap, // null when current/target scales can't be honestly compared
    planFormatVersion: PLAN_FORMAT_VERSION,
    daysUntilTest,
    weeksUntilTest: effectiveWeeks,
    minutesPerWeek,
    totalActivities: activities.length + strategyActivities.length,

    // The raw prioritized gaps (for reference)
    skillGaps,

    // Timestamp
    generatedAt,
    basedOnTest: diagnostic.testId,

    // Adaptation data (for next plan generation)
    previousPlanId: previousPlan?.generatedAt || null,
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// GAP ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Gather all skill gaps from the diagnostic, prioritized by ROI.
 */
const gatherSkillGaps = (diagnostic) => {
  const gaps = [];

  // From weak skills identified in the test
  diagnostic.skillAnalysis.weakSkills.forEach((skill, idx) => {
    // Find what module(s) and section(s) can address this skill
    const moduleMatches = findModulesForSkill(skill.skillId);

    gaps.push({
      skillId: skill.skillId,
      skillName: skill.name,
      domain: skill.domain,
      // Test-subject axis ('math' | 'rw') + pattern evidence — both needed
      // downstream so R&W gaps can become drill-shaped activities instead
      // of dying in the math module map.
      section: skill.section || 'math',
      missedPatterns: skill.missedPatterns || [],
      testAccuracy: skill.testAccuracy,
      // Blank-excluded accuracy + sample size + honesty tier from
      // analyzeSkills. 'suspected' (n < 4 attempted) gaps get discounted
      // priority and probe-sized time instead of multi-week commitments.
      contentAccuracy: skill.contentAccuracy ?? skill.testAccuracy,
      attempted: skill.attempted ?? null,
      evidenceLevel: skill.evidenceLevel || 'suspected',
      historicalMastery: skill.historicalMastery,
      primaryErrorType: skill.primaryErrorType,
      modules: moduleMatches,
      sections: skill.sections || [],
      // Priority scoring:
      // - Low accuracy = higher priority
      // - Domain weight = higher priority
      // - Conceptual gaps > procedural > other (harder to fix = start earlier)
      priority: calculateGapPriority(skill, diagnostic),
      estimatedMinutes: estimateTimeToFix(skill),
    });
  });

  // Also add skills from prioritized actions that aren't already covered
  diagnostic.prioritizedActions
    .filter(a => a.type === 'skill' && !gaps.find(g => g.skillId === a.skillId))
    .forEach(action => {
      gaps.push({
        skillId: action.skillId,
        skillName: action.title.replace('Master: ', ''),
        section: getSkillSection(action.skillId), // actions carry no tag; derive from the R&W taxonomy
        evidenceLevel: 'suspected', // prioritizedActions carry no attempt counts
        missedPatterns: [],
        modules: action.modules?.map(m => ({ moduleId: m, lessons: [], sections: [] })) || [],
        sections: action.sections || [],
        // Same suspected-evidence treatment as weakSkills-derived gaps: these
        // carry zero attempt counts, so raw estimatedGain must not outrank a
        // thin-but-real evidence gap, and they get a probe, not a rebuild.
        priority: Math.round((action.estimatedGain || 0) * 0.65),
        primaryErrorType: action.primaryErrorType,
        estimatedMinutes: 15,
      });
    });

  // Sort by priority (highest first)
  gaps.sort((a, b) => b.priority - a.priority);

  return gaps;
};

/**
 * Find which modules and sections can teach a given skill.
 */
const findModulesForSkill = (skillId) => {
  const skill = getSkillById(skillId);
  const results = [];

  // Step 1: direct lookup in SKILL_TO_MODULE_MAP (canonical ID hits)
  let directModules = SKILL_TO_MODULE_MAP[skillId] || [];

  // Step 2: if not found directly, expand via SKILL_ALIAS_MAP to canonical IDs
  // This handles practice-test skill IDs like "Quadratic Equations" or "solving-equations"
  if (directModules.length === 0 && SKILL_ALIAS_MAP[skillId]) {
    const canonicalIds = SKILL_ALIAS_MAP[skillId];
    const expanded = new Set();
    canonicalIds.forEach(cid => {
      (SKILL_TO_MODULE_MAP[cid] || []).forEach(m => expanded.add(m));
    });
    directModules = [...expanded];
  }

  // Step 3: taxonomy module associations
  const taxonomyModules = skill?.modules || [];

  const allModuleIds = [...new Set([...directModules, ...taxonomyModules])];

  allModuleIds.forEach(moduleId => {
    const relevantSections = findRelevantSections(moduleId, skill);

    results.push({
      moduleId,
      moduleName: getModuleName(moduleId),
      sections: relevantSections,
    });
  });

  // Step 4: last resort — fuzzy match on the skill ID string
  if (results.length === 0) {
    const fuzzyModule = fuzzyMatchModule(skillId);
    if (fuzzyModule) {
      results.push({
        moduleId: fuzzyModule,
        moduleName: getModuleName(fuzzyModule),
        sections: [],
      });
    }
  }

  return results;
};

/**
 * Find practice sections relevant to a skill within a module.
 */
const findRelevantSections = (moduleId, skill) => {
  if (!skill) return [];

  const taxonomySections = skill.sections || [];
  const results = [];

  taxonomySections.forEach(sectionName => {
    if (hasQuestionsForSection(moduleId, sectionName)) {
      results.push({ moduleId, sectionName });
    }
  });

  // If no taxonomy sections match, try getting all available sections
  if (results.length === 0) {
    try {
      const available = getSectionsWithQuestions(moduleId);
      if (available && available.length > 0) {
        results.push({ moduleId, sectionName: available[0] });
      }
    } catch (e) {
      // getSectionsWithQuestions might not exist
    }
  }

  return results;
};

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVITY GENERATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Map skill gaps to specific, actionable study activities.
 */
const mapGapsToActivities = (skillGaps, completedLessons, practiceProgress, diagnostic) => {
  const activities = [];

  skillGaps.forEach(gap => {
    // R&W gaps and unmapped math gaps become drill-shaped activities —
    // they used to be silently skipped here (gap.modules is empty), which
    // left every "targeted practice" week with zero tasks for students
    // whose weaknesses missed the hand-authored math module map.
    if (gap.section === 'rw' || !gap.modules || gap.modules.length === 0) {
      if (gap.section !== 'rw') {
        // Every R&W canonical skill has a drill pool; unmapped MATH skillIds
        // may serve zero bank items (a dozen real test skillIds do). Mirror
        // the router's cascade — no pool means no activity, not a dead button.
        const servable =
          bankTargetedWeaknessSet({
            weakSkills: [{ skillId: gap.skillId, domain: gap.domain, missedPatterns: gap.missedPatterns }],
            count: 1,
          }).length > 0
          || bankQuestionsBySkillIds([gap.skillId], { limit: 1 }).length > 0;
        if (!servable) return;
      }
      activities.push(buildSkillDrillActivity(gap));
      return;
    }
    // ACTIVITY TYPE 1: Watch/re-watch lessons
    //
    // ── REMOVED 2026-05-09 ───────────────────────────────────────────
    // Lesson-type activities used to flow into the weekly schedule and
    // navigated to LearnWorkspace (the legacy lesson reader). The
    // product no longer surfaces that flow as a primary engagement —
    // students engage via focus-area drills (AssignedPracticeShell)
    // and full mock tests. The block that emitted `type: 'lesson'`
    // activities is intentionally gone; downstream filters in
    // StudyPlanDashboard.jsx + render-time guards drop any lesson
    // activities still present in legacy plan artifacts in Firestore.
    //
    // To re-enable: re-introduce a `mod.lessons.forEach(...)` push
    // inside `gap.modules.forEach(mod => { ... })` below. See git blame
    // on this comment for the full history.
    // ─────────────────────────────────────────────────────────────────

    gap.modules.forEach(mod => {
      // ACTIVITY TYPE 2: Practice sections
      // (For all error types — practice is always valuable)
      mod.sections.forEach(section => {
        const practiceKey = `${section.moduleId}-${section.sectionName}`;
        const prevAttempts = practiceProgress[practiceKey]?.totalAttempts || 0;
        const prevBest = practiceProgress[practiceKey]?.bestScore;

        const because = buildBecauseLine(gap);
        activities.push({
          ...(because ? { because } : {}),
          type: 'practice',
          activityType: 'practiceSection',
          title: `Practice: ${section.sectionName}`,
          subtitle: `${mod.moduleName}${prevBest !== undefined ? ` (Best: ${prevBest}/5)` : ''}`,
          moduleId: section.moduleId,
          sectionName: section.sectionName,
          duration: ACTIVITY_DURATIONS.practiceSection,
          priority: gap.priority + (prevBest !== undefined && prevBest < 3 ? 5 : 0),
          skillId: gap.skillId,
          skillName: gap.skillName,
          previousAttempts: prevAttempts,
          previousBest: prevBest,
          icon: null,
        });
      });
    });
  });

  // Deduplicate: same lesson/section/skill-drill shouldn't appear twice.
  // Drill-shaped activities have no module coordinates — keying them on
  // moduleId/sectionName would collapse them ALL to one entry.
  const seen = new Set();
  const deduped = activities.filter(a => {
    const key = a.type === 'lesson'
      ? `lesson-${a.moduleId}-${a.lessonId}`
      : a.moduleId
        ? `practice-${a.moduleId}-${a.sectionName}`
        : `drill-${a.skillId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by priority
  deduped.sort((a, b) => b.priority - a.priority);

  return deduped;
};

/**
 * Pick the skill (from allSkills) that best evidences a given error type —
 * most occurrences of that error, tiebreak lower accuracy. Powers the
 * unified-session rule: every strategy card launches a REAL drill built
 * from the student's own misses, never advice-only tips.
 */
const topSkillForErrorType = (diagnostic, errorType) => {
  const all = diagnostic.skillAnalysis?.allSkills || [];
  let best = null;
  let bestCount = 0;
  all.forEach((s) => {
    if (!s?.skillId || !Array.isArray(s.errorTypes)) return;
    const count = s.errorTypes.filter((e) => e === errorType).length;
    if (count > bestCount || (count === bestCount && count > 0 && (s.contentAccuracy ?? 100) < (best?.contentAccuracy ?? 100))) {
      best = s;
      bestCount = count;
    }
  });
  return bestCount > 0 ? best : null;
};

/**
 * Generate strategy-focused activities based on error patterns.
 *
 * Unified session grammar (Plan v3): every card here is a LAUNCHABLE session
 * with the standard card anatomy — no advice-only cards. Trap and careless
 * patterns become real drills targeted at the student's own trap/careless
 * skills (type 'practice' so the shared drill router serves them); pacing
 * becomes a pacing session (activityType 'pacingDrill' → onStartPacing);
 * the mistake review becomes a test-miss review session deep-linking the
 * actual missed questions (activityType 'testMissReview' → onReviewTestWrong)
 * and is only emitted when the source test's misses are reviewable (real
 * catalog tests — a mini-diagnostic's misses have no review store).
 * The old `tips` arrays survive as expandable coaching on the real session.
 */
const generateStrategyActivities = (diagnostic) => {
  const activities = [];
  const errorCounts = diagnostic.errorPatterns.counts;

  // Trap-answer drill — a REAL set on the skill where the traps actually bit.
  if ((errorCounts[ERROR_TYPES.TRAP_SUSCEPTIBILITY] || 0) >= 2) {
    const trapSkill = topSkillForErrorType(diagnostic, ERROR_TYPES.TRAP_SUSCEPTIBILITY);
    if (trapSkill) {
      activities.push({
        ...buildSkillDrillActivity({
          skillId: trapSkill.skillId,
          skillName: trapSkill.name,
          section: trapSkill.section,
          missedPatterns: trapSkill.missedPatterns,
          priority: 90,
        }),
        activityType: 'trapDrill',
        title: `Beat the trap answers: ${trapSkill.name || trapSkill.skillId}`,
        subtitle: `You picked ${errorCounts[ERROR_TYPES.TRAP_SUSCEPTIBILITY]} designed-to-tempt answers last test — most on this skill`,
        because: `Your ${trapSkill.name || 'top'} misses were the designed-to-tempt answers. Predict the trap before you look at the choices.`,
        duration: ACTIVITY_DURATIONS.strategyDrill,
        priority: 90,
        tips: [
          'Before choosing, predict what trap answers might look like',
          ...(trapSkill.section === 'rw' ? [
            'The tempting wrong answer is usually TRUE — it just doesn\'t answer THIS question',
            'Distrust extreme wording — "always", "never", "proves" usually overstate what the passage supports',
          ] : [
            'In percent problems: "increased by X%" ≠ "X% of"',
            'In multi-step problems: check that you answered the FINAL question, not an intermediate step',
          ]),
          'If your answer came too easily on a hard question, it\'s probably a trap',
        ],
      });
    }
  }

  // Pacing session — launches the real pacing drill (buildPacingSession),
  // not a tips card. The gate is an OR: the fade branch can fire with
  // timeRelatedErrors at 0-2, so the subtitle must cite whichever evidence
  // actually triggered it.
  const timePressureCount = errorCounts[ERROR_TYPES.TIME_PRESSURE] || 0;
  const fadeEffect = diagnostic.timeAnalysis.fadeEffect || 0;
  if (timePressureCount >= 3 || fadeEffect > 15) {
    activities.push({
      type: 'strategy',
      activityType: 'pacingDrill',
      title: 'Pacing session',
      subtitle: timePressureCount >= 3
        ? `The clock cost you ${timePressureCount} question${timePressureCount === 1 ? '' : 's'} last test`
        : `Your accuracy dropped ${fadeEffect}% in the second half — pacing faded`,
      because: timePressureCount >= 3
        ? `The clock cost you ${timePressureCount} question${timePressureCount === 1 ? '' : 's'} last test — timed sets at target pace rebuild the rhythm.`
        : `Your accuracy dropped ${fadeEffect}% from module start to end — timed sets rebuild the endurance.`,
      duration: ACTIVITY_DURATIONS.strategyDrill,
      priority: 85,
      icon: null,
      tips: [
        'Easy: max 90 seconds. Medium: max 2 minutes. Hard: max 3 minutes.',
        'If stuck, flag it and move on — come back with fresh eyes',
        'Use the last 5 minutes to review flagged questions',
      ],
    });
  }

  // Precision drill — re-drill the skill where knowing-how still went wrong.
  if ((errorCounts[ERROR_TYPES.CARELESS_ERROR] || 0) >= 2) {
    const carelessSkill = topSkillForErrorType(diagnostic, ERROR_TYPES.CARELESS_ERROR);
    if (carelessSkill) {
      activities.push({
        ...buildSkillDrillActivity({
          skillId: carelessSkill.skillId,
          skillName: carelessSkill.name,
          section: carelessSkill.section,
          missedPatterns: carelessSkill.missedPatterns,
          priority: 95,
        }),
        activityType: 'precisionDrill',
        title: `Stop the avoidable misses: ${carelessSkill.name || carelessSkill.skillId}`,
        subtitle: `${errorCounts[ERROR_TYPES.CARELESS_ERROR]} questions you knew how to solve went wrong last test`,
        because: `You know how to solve these — ${errorCounts[ERROR_TYPES.CARELESS_ERROR]} went wrong anyway. This set is about finishing clean, not learning new content.`,
        duration: ACTIVITY_DURATIONS.strategyDrill,
        priority: 95,
        tips: [
          'Re-read the last sentence of EVERY question before answering',
          'After solving, plug your answer back in to verify',
          'Circle/highlight what the question is actually asking for (x? 2x+1? y?)',
        ],
      });
    }
  }

  // Test-miss review session — the real missed questions from the source
  // test, launched through the review deep-link. Only when reviewable: a
  // mini-diagnostic's misses have no review store to open.
  const sourceTestId = diagnostic.testId || null;
  const reviewable = sourceTestId && !String(sourceTestId).startsWith('mini-diagnostic');
  if (diagnostic.errorPatterns.totalWrong > 5 && reviewable) {
    activities.push({
      type: 'review',
      activityType: 'testMissReview',
      testId: sourceTestId,
      title: `Review: ${diagnostic.testTitle || 'your last test'} — ${diagnostic.errorPatterns.totalWrong} misses`,
      subtitle: 'Walk the questions you missed, then re-drill the ones worth points',
      because: `${diagnostic.errorPatterns.totalWrong} misses from ${diagnostic.testTitle || 'your last test'} are sitting there with your reasoning attached — understanding WHY beats new reps.`,
      duration: ACTIVITY_DURATIONS.reviewMistakes,
      priority: 100, // Always high priority
      icon: null,
      tips: [
        'For each wrong answer, understand WHY the correct answer is right',
        'Focus on questions you "almost" got right — these are your quick wins',
      ],
    });
  }

  return activities;
};

// ═══════════════════════════════════════════════════════════════════════════
// WEEKLY DISTRIBUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Distribute activities across weeks in a sensible order.
 * Week structure:
 * - Start of week: Strategy + review
 * - Mid-week: Lessons + practice on new skills
 * - End of week: More practice + self-assessment
 * - Every 3-4 weeks: Take a practice test
 */
const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const distributeAcrossWeeks = (activities, strategyActivities, totalWeeks, minutesPerWeek, diagnostic, previousPlan, longitudinal = null, isFirstPlan = false, schedule = null, scoreGap = null, createdDayName = null) => {
  const weeks = [];

  // ═══ SCHEDULE-AWARE DAY PLAN ═══
  // Every activity lands on a day the student actually studies. Before this,
  // review was always Monday, tests always Saturday, mid-week always Wed-Fri —
  // regardless of what the student told us in onboarding.
  const studyDays = schedule ? scheduledDayNames(schedule) : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // ═══ WEEK 1 ANCHORS TO TODAY (Plan v3) ═══
  // Week 1 shares its calendar week with the plan's creation moment. Filling
  // it Monday-first scheduled a Thursday-born plan's whole first week into
  // days already behind the student ("0 of 6 sessions" on day one, nothing
  // to do today — founder-flagged). Week 1 only uses days from TODAY onward:
  // remaining STUDY days when any exist, otherwise the remaining CALENDAR
  // days (a Saturday-created plan under a Mon-Fri schedule schedules onto
  // Sat/Sun — the student opening the app today is here to work today; the
  // old fallback clamped onto the final PAST study day). Week 1's budget is
  // also capped to its real days' capacity so a short first week never has
  // a full week's minutes stuffed onto one or two days.
  const createdIdx = createdDayName ? DAY_ORDER.indexOf(createdDayName) : -1;
  const remainingStudyDays = createdIdx >= 0
    ? studyDays.filter((d) => DAY_ORDER.indexOf(d) >= createdIdx)
    : studyDays;
  const remainingCalendarDays = createdIdx >= 0
    ? DAY_ORDER.slice(createdIdx)
    : studyDays;
  const week1Days = remainingStudyDays.length > 0 ? remainingStudyDays : remainingCalendarDays;
  const dayBudget = (day) => (schedule?.days?.[day] > 0 ? schedule.days[day] : 35);
  const week1BudgetCap = week1Days.reduce((sum, d) => sum + dayBudget(d), 0);
  const testDay = schedule ? testDayFor(schedule) : 'Saturday';
  const phaseFor = (day) => {
    const idx = studyDays.indexOf(day);
    if (idx <= 0) return 'start';
    return idx >= studyDays.length - 1 ? 'end' : 'mid';
  };

  // ═══ ADAPTIVE PRIORITY ADJUSTMENT ═══
  // If we have a previous plan, adjust priorities based on what improved/worsened
  const adaptedActivities = activities.map(act => {
    let priorityBoost = 0;

    // Check longitudinal persistent weaknesses — 2x priority for skills failing across multiple tests
    if (longitudinal?.persistentWeaknesses?.length > 0 && act.skillId) {
      const persistent = longitudinal.persistentWeaknesses.find(pw => pw.skillId === act.skillId);
      if (persistent) {
        priorityBoost += 20; // Significant boost for persistent weaknesses
      }
    }

    // Check longitudinal skill trends — reduce priority for improving skills.
    // Recent drill evidence (fresher than any test) outranks the recency-
    // weighted test accuracy: a student who drilled a gap to 70%+ since the
    // last test shouldn't have the new plan re-prescribe it at full priority.
    if (longitudinal?.skillHistory && act.skillId) {
      const history = longitudinal.skillHistory[act.skillId];
      if (history?.recentDrill && history.recentDrill.accuracy >= 70) {
        priorityBoost -= 25;
      } else if (history && history.attempts >= 3) {
        const accuracy = history.weightedAccuracy != null
          ? history.weightedAccuracy / 100
          : history.correct / history.attempts;
        if (accuracy >= 0.7) {
          priorityBoost -= 10; // Reduce priority for skills student is mastering
        }
      }
    }

    // If previous plan exists, deprioritize activities the student already
    // completed. Match by skillId when both sides carry one (titles are
    // re-worded across versions — the skill is the stable identity), falling
    // back to the exact title for skill-less activities (strategy, review).
    if (previousPlan?.weeks && (act.skillId || act.title)) {
      const wasCompleted = previousPlan.weeks.some(w =>
        w.activities?.some(a => a.completed && (
          (act.skillId && a.skillId)
            ? a.skillId === act.skillId
            : a.title === act.title
        ))
      );
      if (wasCompleted) {
        priorityBoost -= 15; // Deprioritize already-completed activities
      }
    }

    return priorityBoost !== 0
      ? { ...act, priority: (act.priority || 0) + priorityBoost }
      : act;
  });

  // Build a pool of all activities sorted by priority
  const allActivities = [
    ...strategyActivities,
    ...adaptedActivities,
  ].sort((a, b) => b.priority - a.priority);

  // Track which activities have been assigned
  const activityPool = [...allActivities];

  // ═══ SECTION BALANCE (Plan v3 A1) ═══
  // A TRUE plan never goes single-section. Weekly skill minutes split between
  // R&W and Math weighted toward the section carrying more gap evidence,
  // clamped to 60/40 — so the weaker section leads but the other NEVER
  // disappears while its pool has work. Activities without a section (module
  // practice is math-bank by construction; strategy/review are neutral) count
  // as math/neutral respectively.
  const sectionOf = (a) => (a?.section === 'rw' ? 'rw' : 'math');
  const isSkillWork = (a) => a && a.type === 'practice';
  const gapMass = { rw: 0, math: 0 };
  adaptedActivities.forEach((a) => {
    if (isSkillWork(a)) gapMass[sectionOf(a)] += Math.max(1, a.priority || 1);
  });
  const bothSections = gapMass.rw > 0 && gapMass.math > 0;
  const rwShare = bothSections
    ? Math.min(0.6, Math.max(0.4, gapMass.rw / (gapMass.rw + gapMass.math)))
    : (gapMass.rw > 0 ? 1 : 0);

  // ═══ DENSITY BACKFILL POOL (Plan v3 A2) ═══
  // When confirmed weak-flags can't fill the student's stated weekly minutes,
  // the plan backfills with honest, personally-earned work instead of running
  // thin: shaky skills (passed the attempt bar but sit 50-74%) get
  // reinforcement sets, then strengths get short maintenance sets. Every
  // entry carries a because-line naming what it is — no anonymous filler.
  const scheduledSkillIds = new Set(
    allActivities.map((a) => a.skillId).filter(Boolean),
  );
  const backfillPool = [];
  (diagnostic.skillAnalysis?.allSkills || []).forEach((s) => {
    if (!s?.skillId || scheduledSkillIds.has(s.skillId)) return;
    const acc = s.contentAccuracy ?? s.testAccuracy ?? null;
    if (acc === null || (s.attempted ?? 0) < 2) return;
    if (acc >= 50 && acc < 75) {
      backfillPool.push({
        ...buildSkillDrillActivity({
          skillId: s.skillId,
          skillName: s.name,
          section: s.section,
          missedPatterns: s.missedPatterns,
          priority: 40,
        }),
        title: `Push past shaky: ${s.name || s.skillId}`,
        subtitle: 'Reinforcement set — solid start, not yet reliable',
        because: `You're at ${acc}% here — real footing, not yet reliable. One focused set moves it from coin-flip to counted-on.`,
        planRole: 'reinforce',
      });
    } else if (acc >= 80) {
      backfillPool.push({
        ...buildSkillDrillActivity({
          skillId: s.skillId,
          skillName: s.name,
          section: s.section,
          priority: 25,
        }),
        title: `Keep sharp: ${s.name || s.skillId}`,
        subtitle: 'Maintenance set — protect a strength',
        because: "You're strong here — one short set keeps it that way while the plan rebuilds weaknesses.",
        planRole: 'maintain',
      });
    }
  });
  backfillPool.sort((a, b) => b.priority - a.priority);

  // Measurement cadence: inside a month of test day, every week ends with a
  // full test. On a longer arc, FULL tests land every third week (a 70-minute
  // mock every other week is over-prescription students skip) and the
  // short check-ins inserted below fill the gaps — so something measures
  // the student every 1-2 weeks, but it's usually the light thing. A small
  // score gap (final polish) doesn't add tests — it adds precision/strategy
  // work (see the strategy slot below).
  const smallGap = scoreGap !== null && scoreGap < 50;
  const testCadence = totalWeeks < 4 ? 1 : 3;

  for (let weekNum = 1; weekNum <= totalWeeks; weekNum++) {
    const isFirstWeek = weekNum === 1;
    const isLastWeek = weekNum === totalWeeks;
    // Week 1 never hosts a full test (the plan was just generated FROM one),
    // so don't flag it — except a one-week plan, whose only week is the last.
    const isTestWeek = (!isFirstWeek || totalWeeks === 1)
      && (weekNum % testCadence === 0 || isLastWeek);

    const weekActivities = [];
    let weekMinutesUsed = 0;
    // Week 1 can be a partial week (created mid-week): its budget is the
    // smaller of the weekly promise and its remaining days' real capacity.
    const weekMinutesBudget = weekNum === 1
      ? Math.min(minutesPerWeek, week1BudgetCap)
      : minutesPerWeek;

    // Per-day remaining minutes for this week. Activities bin into the first
    // study day with room, so each day's load tracks the student's schedule
    // instead of a hardcoded Mon-Fri spread. Week 1 only schedules from the
    // plan's creation day onward (see week1Days above).
    const weekDays = weekNum === 1 ? week1Days : studyDays;
    const dayRemaining = {};
    weekDays.forEach((d) => { dayRemaining[d] = dayBudget(d); });
    const placeOn = (duration) => {
      let day = weekDays.find((d) => dayRemaining[d] >= duration);
      // No day fits the whole activity: put it where the most room is left —
      // a slightly-overfull study day beats scheduling on a day the student
      // told us they don't study.
      if (!day) day = weekDays.reduce((a, b) => (dayRemaining[a] >= dayRemaining[b] ? a : b));
      dayRemaining[day] -= duration;
      return day;
    };

    // ── PHASE 1: Start of week — Review + Strategy ──
    if (isFirstWeek) {
      // First week: review mistakes from the test that triggered this plan
      const reviewActivity = activityPool.find(a => a.type === 'review');
      if (reviewActivity) {
        const day = placeOn(reviewActivity.duration);
        weekActivities.push({
          ...reviewActivity,
          day,
          weekPhase: 'start',
        });
        weekMinutesUsed += reviewActivity.duration;
        // Same effect as `activityPool.filter(a => a !== reviewActivity)`, done
        // in place so the pool stays a const (and the per-week helpers below
        // are not closures over a reassignable binding).
        for (let i = activityPool.length - 1; i >= 0; i--) {
          if (activityPool[i] === reviewActivity) activityPool.splice(i, 1);
        }
      }
    }

    // Add one strategy activity per week (two for small-gap students — the
    // last 50 points are usually pacing and trap discipline, not new content)
    const strategySlots = smallGap ? 2 : 1;
    for (let s = 0; s < strategySlots; s++) {
      const strategyIdx = activityPool.findIndex(a => a.type === 'strategy');
      if (strategyIdx === -1 || weekMinutesUsed + activityPool[strategyIdx].duration > weekMinutesBudget) break;
      const day = placeOn(activityPool[strategyIdx].duration);
      weekActivities.push({
        ...activityPool[strategyIdx],
        day,
        weekPhase: phaseFor(day),
      });
      weekMinutesUsed += activityPool[strategyIdx].duration;
      activityPool.splice(strategyIdx, 1);
    }

    // ── PHASE 2: Practice and drills — SECTION-AWARE fill (Plan v3 A1) ──
    // Instead of draining one priority-sorted pool (which produced entire
    // single-section weeks whenever one section's gaps outranked the
    // other's), each week fills toward per-section minute targets. The
    // section with the larger unmet target picks next; neutral work
    // (leftover strategy/review) fills alongside. Priority order is
    // preserved WITHIN each section.
    const sectionMinutes = { rw: 0, math: 0 };
    const targetFor = (sec) => Math.round(weekMinutesBudget * (sec === 'rw' ? rwShare : 1 - rwShare));
    // First pool index of the wanted kind that fits the remaining budget
    // (keeps the original +10 overflow tolerance and shorter-search).
    const nextFittingIdx = (wantSection) => {
      let firstOfKind = -1;
      for (let i = 0; i < activityPool.length; i++) {
        const a = activityPool[i];
        const matches = wantSection === 'any'
          ? true
          : (isSkillWork(a) ? sectionOf(a) === wantSection : wantSection === 'neutral');
        if (!matches) continue;
        if (firstOfKind === -1) firstOfKind = i;
        if (weekMinutesUsed + a.duration <= weekMinutesBudget + 10) return i;
      }
      return firstOfKind === -1 ? -1 : -2; // -2: kind exists but nothing fits
    };
    while (activityPool.length > 0 && weekMinutesUsed < weekMinutesBudget) {
      const rwDeficit = targetFor('rw') - sectionMinutes.rw;
      const mathDeficit = targetFor('math') - sectionMinutes.math;
      // Preference order: bigger-deficit section → other section → neutral.
      const order = rwDeficit >= mathDeficit
        ? ['rw', 'math', 'neutral']
        : ['math', 'rw', 'neutral'];
      let idx = -1;
      for (const want of order) {
        const found = nextFittingIdx(want);
        if (found >= 0) { idx = found; break; }
      }
      if (idx === -1) {
        // Nothing of any preferred kind fits — fall back to any fitting item.
        const anyIdx = nextFittingIdx('any');
        if (anyIdx < 0) break;
        idx = anyIdx;
      }
      const picked = activityPool[idx];
      const day = placeOn(picked.duration);
      weekActivities.push({ ...picked, day, weekPhase: phaseFor(day) });
      weekMinutesUsed += picked.duration;
      if (isSkillWork(picked)) sectionMinutes[sectionOf(picked)] += picked.duration;
      activityPool.splice(idx, 1);
    }

    // ── PHASE 2.5: Density floor (Plan v3 A2) ──
    // The student promised these minutes; a thin weak-flag list must not
    // produce a half-empty week. Fill up to ~85% of budget from the
    // reinforcement/maintenance backfill, still section-aware.
    while (
      backfillPool.length > 0
      && weekMinutesUsed < Math.round(weekMinutesBudget * 0.85)
    ) {
      const wantSection = (sectionMinutes.rw - targetFor('rw')) <= (sectionMinutes.math - targetFor('math')) ? 'rw' : 'math';
      // Snapshot the running total: both predicates below read it synchronously
      // and it is only bumped after the picks, so this is the same value.
      const usedSoFar = weekMinutesUsed;
      let bIdx = backfillPool.findIndex(
        (a) => sectionOf(a) === wantSection && usedSoFar + a.duration <= weekMinutesBudget + 10,
      );
      if (bIdx === -1) {
        bIdx = backfillPool.findIndex((a) => usedSoFar + a.duration <= weekMinutesBudget + 10);
      }
      if (bIdx === -1) break;
      const picked = backfillPool[bIdx];
      const day = placeOn(picked.duration);
      weekActivities.push({ ...picked, day, weekPhase: phaseFor(day) });
      weekMinutesUsed += picked.duration;
      sectionMinutes[sectionOf(picked)] += picked.duration;
      backfillPool.splice(bIdx, 1);
    }

    // ── PHASE 3: Test week — add practice test ──
    if (isTestWeek && !isFirstWeek) {
      // On the FIRST plan, the closing test is the unlock checkpoint: completing
      // it gives the engine a second data point and regenerates the full, deeper
      // plan. Frame it that way rather than as a generic "final" test.
      const isUnlockCheckpoint = isFirstPlan && isLastWeek;
      weekActivities.push({
        type: 'test',
        activityType: 'practiceTest',
        title: isUnlockCheckpoint
          ? 'Take Practice Test 2'
          : isLastWeek ? 'Final Practice Test' : 'Progress Check: Practice Test',
        subtitle: isUnlockCheckpoint
          ? 'Unlock your full, personalized plan — this test shows exactly how far you have come and where to go deeper'
          : isLastWeek
            ? 'Full-length timed test to measure your final readiness'
            : 'Take a practice test to measure improvement and adjust your plan',
        duration: ACTIVITY_DURATIONS.practiceTest,
        priority: 100,
        icon: null,
        // The student's biggest study day hosts the full-length test — not a
        // hardcoded Saturday a weekday-only student would never sit.
        day: testDay,
        weekPhase: 'end',
        tips: isUnlockCheckpoint
          ? [
              'Take it under real conditions — timed, no breaks, no phone',
              'Your results build a longer, more personalized plan tuned to where you are now',
            ]
          : [
              'Take this test under real conditions — timed, no breaks, no phone',
              'After completing, review the diagnostic to see what improved',
            ],
      });
    }

    // ── Calculate week summary ──
    const weekLessonCount = weekActivities.filter(a => a.type === 'lesson').length;
    const weekPracticeCount = weekActivities.filter(a => a.type === 'practice').length;
    const weekStrategyCount = weekActivities.filter(a => a.type === 'strategy' || a.type === 'review').length;

    // Determine the focus areas for this week
    const weekSkills = [...new Set(weekActivities.filter(a => a.skillName).map(a => a.skillName))];
    const weekDomains = [...new Set(weekActivities.map(a => {
      // Drill-shaped activities carry section instead of module coordinates.
      if (a.section === 'rw') return 'Reading & Writing';
      if (!a.moduleId) return null;
      // Infer domain from module
      if (['linear-equations', 'functions', 'systems'].includes(a.moduleId)) return 'Algebra';
      if (['percents', 'statistics', 'dimensional-analysis'].includes(a.moduleId)) return 'Problem Solving';
      if (['quadratics', 'exponents', 'equivalent-expressions', 'transformations'].includes(a.moduleId)) return 'Advanced Math';
      if (['triangles', 'circles', 'volume', 'radians-degrees'].includes(a.moduleId)) return 'Geometry';
      return 'Other';
    }).filter(Boolean))];

    weeks.push({
      weekNumber: weekNum,
      title: generateWeekTitle(weekNum, totalWeeks, isTestWeek, weekDomains, weekSkills),
      activities: weekActivities,
      totalMinutes: weekMinutesUsed,
      lessonCount: weekLessonCount,
      practiceCount: weekPracticeCount,
      strategyCount: weekStrategyCount,
      isTestWeek,
      focusSkills: weekSkills.slice(0, 3),
      focusDomains: weekDomains,
      goalDescription: generateWeekGoal(weekNum, totalWeeks, weekSkills, isTestWeek),
    });
  }

  // ═══ Check-in cadence: never two consecutive weeks without a measurement ═══
  // Full tests anchor the cadence; a short adaptive check-in fills any
  // 2-week stretch between them so the diagnosis (and therefore every
  // personalized piece of the plan) never goes stale. Founder decision D3.
  let weeksSinceMeasurement = 0;
  weeks.forEach((week) => {
    if (week.isTestWeek) {
      weeksSinceMeasurement = 0;
      return;
    }
    weeksSinceMeasurement += 1;
    if (weeksSinceMeasurement >= 2) {
      const day = testDay;
      week.activities.push({
        type: 'test',
        activityType: 'miniDiagnostic',
        // Duration is deliberately loose: the v2 focused check-in runs ~20-25
        // timed minutes, the legacy shell ~15 — the title stays untimed so a
        // stored plan never promises a length the flag state can't deliver.
        title: 'Quick check-in',
        subtitle: 'A short adaptive check re-measures you and re-tunes the plan between full tests',
        because: 'Two weeks since your last measurement — fresh evidence keeps every task on this plan honest.',
        duration: 20,
        priority: 100,
        icon: null,
        day,
        weekPhase: 'end',
      });
      week.totalMinutes = (week.totalMinutes || 0) + 20;
      week.isCheckInWeek = true;
      weeksSinceMeasurement = 0;
    }
  });

  return weeks;
};

// ═══════════════════════════════════════════════════════════════════════════
// JOURNEY ARC (Plan v3 A3)
// ═══════════════════════════════════════════════════════════════════════════

/** Phase label sets by phase count — the narrative spine of the plan. */
const PHASE_LABELS = {
  1: ['Foundation'],
  2: ['Foundation', 'Sharpen'],
  3: ['Foundation', 'Build', 'Sharpen'],
};

/**
 * Build the plan's journey arc: contiguous phases over the weeks, dated
 * milestones (check-ins, full tests, exam day), and a score trajectory.
 * This is what makes the plan read as a ROUTE — "you're here, this is the
 * next checkpoint, this is where it ends" — instead of a drill list.
 *
 * Milestones carry weekNumber + day (the UI resolves calendar dates the same
 * way it dates weeks); the exam milestone carries the real date. Phase
 * projectedGain splits the diagnostic's projected recovery across phases by
 * week count, capped at the actual score gap — an honest "≈ +N pts" range,
 * omitted entirely when no projection exists.
 *
 * @returns {{startScore:number|null,targetScore:number|null,gapLabel:string,
 *   phases:Array,milestones:Array}}
 */
const buildPlanArc = ({ weeks, gapBasis, currentScore, targetScore, testDate, daysUntilTest, scoreProjection }) => {
  const totalWeeks = weeks.length;
  const phaseCount = totalWeeks <= 1 ? 1 : totalWeeks <= 3 ? 2 : 3;
  const labels = PHASE_LABELS[phaseCount];

  // Split weeks into contiguous phases, front-loading the remainder so the
  // Foundation phase is never shorter than the ones after it.
  const base = Math.floor(totalWeeks / phaseCount);
  const extra = totalWeeks % phaseCount;
  const phases = [];
  let cursor = 1;
  for (let p = 0; p < phaseCount; p++) {
    const span = base + (p < extra ? 1 : 0);
    if (span === 0) continue;
    const phaseStart = cursor;
    const weekNumbers = Array.from({ length: span }, (_, i) => phaseStart + i);
    const phaseWeeks = weekNumbers.map((n) => weeks[n - 1]).filter(Boolean);
    const focusDomains = [...new Set(phaseWeeks.flatMap((w) => w.focusDomains || []))].slice(0, 3);
    phases.push({ index: p, label: labels[p], weekNumbers, focusDomains });
    cursor += span;
  }

  // Honest projected trajectory: the diagnostic's top domain projections,
  // capped at the real gap, spread across phases by week share.
  const gap = gapBasis ? Math.max(0, gapBasis.target - gapBasis.current) : null;
  const projectedTotal = Array.isArray(scoreProjection?.domainProjections)
    ? scoreProjection.domainProjections.slice(0, 4).reduce((s, p) => s + Math.max(0, p.projectedPointGain || 0), 0)
    : null;
  const trajectoryTotal = projectedTotal !== null && gap !== null
    ? Math.min(projectedTotal, gap)
    : projectedTotal;
  if (trajectoryTotal !== null && trajectoryTotal > 0) {
    phases.forEach((phase) => {
      const share = phase.weekNumbers.length / totalWeeks;
      phase.projectedGain = Math.round((trajectoryTotal * share) / 10) * 10;
    });
  }

  // Milestones from the scheduled measurement activities themselves — the
  // arc can never disagree with what the weeks actually contain.
  const milestones = [];
  weeks.forEach((week) => {
    (week.activities || []).forEach((a) => {
      if (a.type !== 'test') return;
      milestones.push({
        type: a.activityType === 'miniDiagnostic' ? 'checkIn' : 'fullTest',
        title: a.title,
        weekNumber: week.weekNumber,
        day: a.day || null,
      });
    });
  });
  if (testDate && Number.isFinite(daysUntilTest) && daysUntilTest >= 0) {
    milestones.push({ type: 'exam', title: 'SAT test day', date: testDate });
  }

  return {
    startScore: Number.isFinite(currentScore) ? currentScore : null,
    targetScore: Number.isFinite(targetScore) ? targetScore : null,
    gapLabel: gapBasis?.label || '',
    phases,
    milestones,
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// SUMMARY & MESSAGING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate the executive summary of the study plan.
 */
const generatePlanSummary = (diagnostic, weeklyPlan, intensity, totalWeeks, daysUntilTest, currentScore, targetScore, skillGaps, gapBasis = null) => {
  // gapBasis is the scale-guarded {current, target, label} pair computed in
  // generateStudyPlan; null means current and target sit on incomparable
  // scales with no honest conversion — never fabricate a gap from raw
  // subtraction (composite 920 minus a math-section 750 is not "past your
  // target").
  const scoreGap = gapBasis ? gapBasis.target - gapBasis.current : null;
  const gapLabel = gapBasis?.label || '';
  const totalWrong = diagnostic.errorPatterns.totalWrong;
  const dominantError = diagnostic.errorPatterns.dominantPattern;

  // Build the "headline diagnosis" — coach voice: short, numeric, names the
  // student's actual top gap where one exists. This is the deterministic
  // fallback; the AI headline (when present) overrides it in mergeHybridPlan.
  // When the gap basis is the MATH section (' in Math'), the named gap must
  // be a math gap — "270 points to go in Math, starting with Words in
  // Context" would be incoherent.
  const labelMatchedGaps = gapLabel === ' in Math'
    ? skillGaps.filter(g => g.section !== 'rw')
    : skillGaps;
  const topGapName = labelMatchedGaps[0]?.skillName || null;
  let headline;
  if (scoreGap === null) {
    headline = topGapName
      ? `The plan front-loads your costliest gaps, starting with ${topGapName}.`
      : 'The plan front-loads your costliest gaps.';
  } else if (scoreGap <= 0) {
    headline = `You're past your target${gapLabel}. Hold ${gapBasis.current} and stretch higher.`;
  } else if (scoreGap <= 30) {
    headline = topGapName
      ? `${scoreGap} points to go${gapLabel} — most of it sitting in ${topGapName}.`
      : `${scoreGap} points to go${gapLabel}. A handful of fixes covers it.`;
  } else if (scoreGap <= 80) {
    headline = topGapName
      ? `${scoreGap} points to go${gapLabel}, starting with ${topGapName}.`
      : `${scoreGap} points to go${gapLabel}, concentrated in a few fixable skills.`;
  } else if (scoreGap <= 150) {
    headline = `${scoreGap} points to go${gapLabel}. The plan front-loads your costliest gaps.`;
  } else {
    headline = `${scoreGap} points${gapLabel} is a long climb — the plan starts where the points are cheapest. More runway helps if your test date can move.`;
  }

  // Build the "key insight" — the single most important thing the student should know
  let keyInsight;
  const carelessCount = diagnostic.errorPatterns.counts[ERROR_TYPES.CARELESS_ERROR] || 0;
  const trapCount = diagnostic.errorPatterns.counts[ERROR_TYPES.TRAP_SUSCEPTIBILITY] || 0;
  const quickWinCount = carelessCount + trapCount;
  const easyMissed = diagnostic.scoreProjection.easyWins.count;

  if (totalWrong === 0) {
    // A perfect run has no miss pattern to narrate — the generic else-branch
    // below would interpolate "Your 0 misses spread across error types".
    // Diagnostic narrative only: state what happened, no advice.
    keyInsight = {
      title: 'Clean run — no error pattern to chase',
      message: 'Every question you attempted landed correct, so there is no miss pattern to diagnose. The plan starts from your strengths and raises the difficulty from there.',
      type: 'clean_run',
    };
  } else if (quickWinCount >= 4) {
    keyInsight = {
      title: 'Your biggest opportunity: quick wins',
      message: `${quickWinCount} of your ${totalWrong} wrong answers were careless mistakes or trap answers. Fixing just these would add ~${diagnostic.scoreProjection.errorTypeProjections.slice(0, 2).reduce((s, p) => s + p.projectedPointGain, 0)} points.`,
      type: 'quick_win',
    };
  } else if (easyMissed >= 3) {
    keyInsight = {
      title: 'Stop missing easy questions',
      message: `You missed ${easyMissed} easy questions. ${diagnostic.scoreProjection.easyWins.description}. This is the fastest path to improvement.`,
      type: 'easy_wins',
    };
  } else if (dominantError && dominantError.type === ERROR_TYPES.CONCEPTUAL_GAP) {
    const topGap = skillGaps[0];
    keyInsight = {
      title: `Critical gap: ${topGap?.skillName || 'foundational concepts'}`,
      message: topGap && typeof topGap.testAccuracy === 'number'
        ? `Most of your misses trace to concepts that never landed — ${topGap.skillName} is at ${topGap.contentAccuracy ?? topGap.testAccuracy}%. The plan rebuilds it from the definition before any timed work.`
        : topGap
          ? `Most of your misses trace to concepts that never landed — starting with ${topGap.skillName}. The plan rebuilds it from the definition before any timed work.`
          : `Most of your misses trace to concepts that never landed. The plan rebuilds them from the definition before any timed work.`,
      type: 'conceptual',
    };
  } else if (dominantError && dominantError.type === ERROR_TYPES.TIME_PRESSURE) {
    keyInsight = {
      title: 'The clock is costing you points',
      message: `${dominantError.count} of your misses came under time pressure, not from the math. Pacing work comes first — it's worth 30-50 points on its own.`,
      type: 'time',
    };
  } else {
    keyInsight = {
      title: 'No single leak — several small ones',
      message: `Your ${totalWrong} misses spread across error types instead of one big cause. The plan works each leak in priority order, costliest first.`,
      type: 'general',
    };
  }

  // Build "the numbers"
  const totalLessons = weeklyPlan.reduce((s, w) => s + w.lessonCount, 0);
  const totalPractice = weeklyPlan.reduce((s, w) => s + w.practiceCount, 0);
  const totalTests = weeklyPlan.filter(w => w.isTestWeek).length;
  const totalMinutes = weeklyPlan.reduce((s, w) => s + w.totalMinutes, 0);

  // Build a concise, evidence-linked diagnosis sentence deterministically.
  // This is the fallback when AI output is absent or fails.
  const diagnosis = buildDeterministicDiagnosis(diagnostic, skillGaps);

  return {
    headline,
    diagnosis,
    keyInsight,
    stats: {
      // Current/Target render side-by-side (DiagnosticReport StatBoxes) —
      // they must share one scale. Use the gap basis pair; when no honest
      // comparison exists, null the target so the consumer renders a dash
      // instead of a cross-scale contradiction.
      currentScore: gapBasis ? gapBasis.current : currentScore,
      targetScore: gapBasis ? gapBasis.target : null,
      scoreGap,
      daysUntilTest,
      weeksInPlan: totalWeeks,
      totalLessons,
      totalPractice,
      totalTests,
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10,
      minutesPerDay: INTENSITY_LEVELS[intensity].minutesPerDay,
      intensity: INTENSITY_LEVELS[intensity].label,
    },
    topFocusAreas: skillGaps.slice(0, 3).map(g => ({
      name: g.skillName,
      accuracy: g.contentAccuracy ?? g.testAccuracy,
      domain: g.domain,
    })),
    errorBreakdown: diagnostic.errorPatterns.summary,
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Derive the highest-leverage next action from week-1 activities using
 * diagnosis signals: persistent weaknesses > dominant error type >
 * quick-win opportunity > first incomplete activity.
 */
const deriveSignalAwareNextAction = (weeklyPlan, diagnostic) => {
  const week1 = weeklyPlan[0];
  if (!week1?.activities?.length) return null;

  const incomplete = week1.activities.filter(a => !a.completed);
  if (incomplete.length === 0) return null;

  const errorCounts = diagnostic.errorPatterns?.counts || {};
  const persistentIds = new Set(
    (diagnostic.trendAnalysis?.persistentWeaknesses || []).map(pw => pw.skillId)
  );
  const carelessCount = errorCounts[ERROR_TYPES.CARELESS_ERROR] || 0;
  const trapCount = errorCounts[ERROR_TYPES.TRAP_SUSCEPTIBILITY] || 0;

  const scored = incomplete.map(a => {
    let score = a.priority || 0;
    // Boost persistent-weakness activities — they need reteaching, highest ROI
    if (a.skillId && persistentIds.has(a.skillId)) score += 50;
    // Boost review/strategy when careless+trap errors dominate
    if ((a.type === 'review' || a.type === 'strategy') && carelessCount + trapCount >= 4) score += 40;
    // Boost lessons for conceptual gaps
    if (a.type === 'lesson' && a.activityType === 'watchLesson') score += 10;
    return { activity: a, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0].activity;

  const reason = best.skillId && persistentIds.has(best.skillId)
    ? `${best.skillName || 'This skill'} has stayed weak across multiple tests — fixing it pays the most`
    : best.type === 'review'
      ? `${diagnostic.errorPatterns?.totalWrong || 0} wrong answers to learn from before new material`
      : best.type === 'strategy' && carelessCount + trapCount >= 4
        ? `${carelessCount + trapCount} of your misses were avoidable — the fastest points on the board`
        : best.subtitle || 'Highest-priority activity in your plan';

  return {
    title: best.title,
    reason,
    type: best.type,
    duration: best.duration,
    moduleId: best.moduleId || null,
    lessonId: best.lessonId || null,
    // Drill-shaped activities (format v2) route by skill instead of module —
    // consumers need these to launch the Do-This-First CTA.
    skillId: best.skillId || null,
    skillName: best.skillName || null,
    section: best.section || null,
  };
};

/**
 * Build a concise, evidence-based diagnosis sentence from diagnostic signals.
 * Prioritises the dominant root cause of the score gap so users understand
 * *why* the plan is structured the way it is — even without AI.
 */
const buildDeterministicDiagnosis = (diagnostic, skillGaps) => {
  const parts = [];
  const errorCounts = diagnostic.errorPatterns?.counts || {};
  const careless = errorCounts[ERROR_TYPES.CARELESS_ERROR] || 0;
  const traps = errorCounts[ERROR_TYPES.TRAP_SUSCEPTIBILITY] || 0;
  const conceptual = errorCounts[ERROR_TYPES.CONCEPTUAL_GAP] || 0;
  const timePressure = errorCounts[ERROR_TYPES.TIME_PRESSURE] || 0;
  const fadeEffect = diagnostic.timeAnalysis?.fadeEffect || 0;
  const totalWrong = diagnostic.errorPatterns?.totalWrong || 0;
  const topGaps = skillGaps.slice(0, 3);

  if (careless + traps >= 4 && careless + traps >= totalWrong * 0.4) {
    parts.push(`${careless + traps} of ${totalWrong} errors are avoidable (${careless} careless, ${traps} trap)`);
  }
  if (conceptual >= 3) {
    const gapNames = topGaps.filter(g => g.primaryErrorType === ERROR_TYPES.CONCEPTUAL_GAP).map(g => g.skillName).slice(0, 2);
    parts.push(`Concept gaps in ${gapNames.length > 0 ? gapNames.join(' and ') : 'foundational skills'} need reteaching`);
  }
  if (timePressure >= 3 || fadeEffect > 15) {
    parts.push(`Time pressure caused ${timePressure} errors${fadeEffect > 15 ? ` with a ${fadeEffect}% accuracy drop in the second half` : ''}`);
  }

  if (parts.length === 0 && topGaps.length > 0) {
    // contentAccuracy is blank-excluded — the honest knowledge figure.
    parts.push(`Weakest areas: ${topGaps.map(g => `${g.skillName} (${g.contentAccuracy ?? g.testAccuracy}%)`).join(', ')}`);
  }

  return parts.join('. ') + (parts.length > 0 ? '.' : '');
};

/**
 * Fraction of the previous plan's activities the student completed, or null
 * when there's no meaningful signal (no previous plan, or fewer than 5
 * scheduled activities). Drives the adherence step-down in generateStudyPlan.
 */
const computePlanCompletionRate = (previousPlan) => {
  const weeks = previousPlan?.weeks;
  if (!Array.isArray(weeks) || weeks.length === 0) return null;
  let total = 0;
  let completed = 0;
  weeks.forEach(w => {
    (w.activities || []).forEach(a => {
      total += 1;
      if (a.completed) completed += 1;
    });
  });
  if (total < 5) return null;
  return completed / total;
};

const getDaysUntil = (dateStr) => {
  if (!dateStr) return null;
  // parseLocalDate: date-only strings must parse as LOCAL midnight, or the
  // UTC shift makes every plan one day shorter in negative-offset timezones.
  const target = parseLocalDate(dateStr);
  if (!target) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  // Both ends are local midnight, so the true difference is a whole number
  // of days ± 1 hour of DST skew. Math.round absorbs the skew; Math.ceil
  // inflated any span crossing a fall-back boundary by a day (a 63-day
  // runway read as 64 → a 9-week plan rendered a phantom 10th week).
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
};

const calculateIntensity = (scoreGap, daysLeft) => {
  if (daysLeft !== null && daysLeft <= 7) return 'marathon';
  if (daysLeft !== null && daysLeft <= 14) return 'intensive';

  const pointsPerDay = daysLeft ? scoreGap / daysLeft : scoreGap / 56; // default 8 weeks

  if (pointsPerDay <= 0.5) return 'light';
  if (pointsPerDay <= 1.5) return 'moderate';
  if (pointsPerDay <= 3) return 'focused';
  if (pointsPerDay <= 5) return 'intensive';
  return 'marathon';
};

const calculateGapPriority = (skill, diagnostic) => {
  let priority = 0;

  // Base: inverse of accuracy (0% = 100 priority, 100% = 0). Blank-excluded
  // contentAccuracy is the knowledge figure; testAccuracy is the legacy
  // fallback.
  priority += (100 - (skill.contentAccuracy ?? skill.testAccuracy ?? 0));

  // Bonus for domain weight — math domains from the taxonomy, R&W domains
  // from the local share map (the generic 0.15 fallback systematically
  // ranked every R&W gap below weighted math domains).
  const domainWeight = skillTaxonomy.domains[skill.domain]?.satWeight
    ?? RW_DOMAIN_SAT_WEIGHT[skill.domain]
    ?? 0.15;
  priority += domainWeight * 50;

  // Bonus for conceptual gaps (harder to fix = start earlier)
  if (skill.primaryErrorType === ERROR_TYPES.CONCEPTUAL_GAP) priority += 20;

  // Bonus for declining trend
  if (skill.trend === 'declining') priority += 15;

  // Thin evidence (fewer than 4 attempted items behind the flag) — the gap
  // may be one unlucky test. Discount so confirmed gaps outrank it; its
  // first activity doubles as the probe that confirms or clears it.
  if (skill.evidenceLevel === 'suspected') priority *= 0.65;

  return priority;
};

const estimateTimeToFix = (skill) => {
  // Suspected gaps get a probe, not a rebuild: enough questions to confirm
  // the gap is real before the next plan commits serious minutes to it.
  if (skill.evidenceLevel === 'suspected') return 15;
  const errorType = skill.primaryErrorType;
  if (errorType === ERROR_TYPES.CONCEPTUAL_GAP) return 45; // Lessons + practice
  if (errorType === ERROR_TYPES.PROCEDURAL_ERROR) return 30; // Practice focused
  if (errorType === ERROR_TYPES.TRAP_SUSCEPTIBILITY) return 20; // Strategy
  if (errorType === ERROR_TYPES.CARELESS_ERROR) return 10; // Awareness
  return 25; // Default
};

const getModuleName = (moduleId) => {
  const names = {
    'linear-equations': 'Linear Equations',
    'functions': 'Functions',
    'systems': 'System of Equations',
    'transformations': 'Transformations',
    'exponents': 'Exponents & Exponential Functions',
    'percents': 'Percents',
    'quadratics': 'Quadratic Functions',
    'triangles': 'Triangles',
    'circles': 'Circles',
    'statistics': 'Statistics',
    'radians-degrees': 'Radians & Degrees',
    'dimensional-analysis': 'Dimensional Analysis',
    'equivalent-expressions': 'Equivalent Expressions',
    'volume': 'Volume',
  };
  return names[moduleId] || moduleId;
};

const fuzzyMatchModule = (skillId) => {
  const skillStr = skillId.toLowerCase().replace(/-/g, ' ');
  if (skillStr.includes('linear') || skillStr.includes('slope') || skillStr.includes('solving') || skillStr.includes('algebra') || skillStr.includes('equation') || skillStr.includes('word problem')) return 'linear-equations';
  if (skillStr.includes('function') && !skillStr.includes('quadratic')) return 'functions';
  if (skillStr.includes('system') || skillStr.includes('elimination') || skillStr.includes('substitution')) return 'systems';
  if (skillStr.includes('quadratic') || skillStr.includes('factor') || skillStr.includes('vertex') || skillStr.includes('discriminant') || skillStr.includes('parabola') || skillStr.includes('root') || skillStr.includes('zero')) return 'quadratics';
  if (skillStr.includes('triangle') || skillStr.includes('pythagorean') || skillStr.includes('trig') || skillStr.includes('sohcahtoa') || skillStr.includes('soh cah toa') || skillStr.includes('sin') || skillStr.includes('cos') || skillStr.includes('tan')) return 'triangles';
  if (skillStr.includes('circle') || skillStr.includes('arc') || skillStr.includes('sector')) return 'circles';
  if (skillStr.includes('exponent') || skillStr.includes('exponential') || skillStr.includes('growth') || skillStr.includes('decay') || skillStr.includes('half life') || skillStr.includes('radical')) return 'exponents';
  if (skillStr.includes('percent') || skillStr.includes('ratio') || skillStr.includes('proportion') || skillStr.includes('rate')) return 'percents';
  if (skillStr.includes('statistic') || skillStr.includes('mean') || skillStr.includes('median') || skillStr.includes('mode') || skillStr.includes('standard deviation') || skillStr.includes('probability') || skillStr.includes('data')) return 'statistics';
  if (skillStr.includes('volume') || skillStr.includes('cylinder') || skillStr.includes('sphere') || skillStr.includes('prism') || skillStr.includes('cone')) return 'volume';
  if (skillStr.includes('radian') || skillStr.includes('degree')) return 'radians-degrees';
  if (skillStr.includes('polynomial') || skillStr.includes('expression') || skillStr.includes('simplif') || skillStr.includes('combining') || skillStr.includes('distribut')) return 'equivalent-expressions';
  if (skillStr.includes('transform') || skillStr.includes('shift') || skillStr.includes('reflect')) return 'transformations';
  if (skillStr.includes('unit') || skillStr.includes('dimensional') || skillStr.includes('conversion')) return 'dimensional-analysis';
  if (skillStr.includes('geometry') || skillStr.includes('area') || skillStr.includes('angle') || skillStr.includes('polygon')) return 'triangles';
  return null;
};

// Week titles carry the student's actual content, not phase labels.
// "Quick Wins & Foundations" reads identical in every student's plan;
// "Slope-intercept + the avoidable misses" reads like it was written
// after watching their test — because it was.
const generateWeekTitle = (weekNum, totalWeeks, isTestWeek, domains, skills = []) => {
  if (weekNum === 1) {
    return skills.length > 0
      ? `${skills[0]} + the avoidable misses`
      : 'The avoidable misses first';
  }
  if (weekNum === totalWeeks) return 'Lock it in before test day';
  if (isTestWeek) return 'Practice test — measure what moved';
  if (domains.length === 1) return `${domains[0]} rebuild`;
  if (domains.length > 0) return `${domains.slice(0, 2).join(' & ')}`;
  if (skills.length > 0) return `${skills.slice(0, 2).join(' & ')}`;
  return `Week ${weekNum}: targeted practice`;
};

const generateWeekGoal = (weekNum, totalWeeks, skills, isTestWeek) => {
  if (weekNum === 1) {
    return skills.length > 0
      ? `Clear your missed questions, then rebuild ${skills[0]}`
      : 'Clear your missed questions — the avoidable ones first';
  }
  if (weekNum === totalWeeks) return 'Full-speed practice — accuracy under real timing';
  if (isTestWeek) return 'Take a timed practice test to measure what moved';
  if (skills.length > 0) return `Get ${skills.slice(0, 2).join(' and ')} above 70%`;
  return 'Keep the reps going on your weakest areas';
};

// ═══════════════════════════════════════════════════════════════════════════
// PLAN ADAPTATION (for subsequent tests)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Compare two diagnostic reports and identify what changed.
 * Used to adapt the study plan after a follow-up test.
 */
export const compareDiagnostics = (previousDiag, currentDiag) => {
  const scoreChange = currentDiag.score.scaled - previousDiag.score.scaled;

  // Skills that improved
  const improved = [];
  const worsened = [];
  const unchanged = [];

  currentDiag.skillAnalysis.allSkills.forEach(currentSkill => {
    const prevSkill = previousDiag.skillAnalysis.allSkills.find(s => s.skillId === currentSkill.skillId);
    if (prevSkill) {
      const change = currentSkill.testAccuracy - prevSkill.testAccuracy;
      if (change > 20) improved.push({ ...currentSkill, change });
      else if (change < -20) worsened.push({ ...currentSkill, change });
      else unchanged.push({ ...currentSkill, change });
    }
  });

  // Error pattern changes
  const prevErrorCounts = previousDiag.errorPatterns.counts;
  const currErrorCounts = currentDiag.errorPatterns.counts;
  const errorChanges = {};
  Object.values(ERROR_TYPES).forEach(type => {
    errorChanges[type] = (currErrorCounts[type] || 0) - (prevErrorCounts[type] || 0);
  });

  // Domain accuracy changes
  const domainChanges = {};
  currentDiag.domainAnalysis.forEach(currDomain => {
    const prevDomain = previousDiag.domainAnalysis.find(d => d.domain === currDomain.domain);
    domainChanges[currDomain.domain] = {
      name: currDomain.displayName,
      current: currDomain.accuracy,
      previous: prevDomain?.accuracy || 0,
      change: currDomain.accuracy - (prevDomain?.accuracy || 0),
    };
  });

  return {
    scoreChange,
    improved: improved.sort((a, b) => b.change - a.change),
    worsened: worsened.sort((a, b) => a.change - b.change),
    unchanged,
    errorChanges,
    domainChanges,
    overallProgress: scoreChange > 0 ? 'improving' : scoreChange < 0 ? 'declining' : 'stable',
    message: generateComparisonMessage(scoreChange, improved, worsened),
  };
};

const generateComparisonMessage = (scoreChange, improved, worsened) => {
  if (scoreChange > 30) {
    return `+${scoreChange} points. ${improved.length > 0 ? `${improved[0].name} drove most of it.` : 'The work is showing up in the score.'}`;
  }
  if (scoreChange > 10) {
    return `+${scoreChange} points. ${improved.length > 0 ? `${improved[0].name} is clearly getting stronger.` : 'Steady gains — the plan holds course.'}`;
  }
  if (scoreChange >= 0) {
    if (worsened.length > 0) {
      return `Score held steady, but ${worsened[0].name} slipped. Let's focus there next.`;
    }
    return 'Score is stable. Let\'s push harder on your remaining weak areas.';
  }
  if (worsened.length > 0) {
    return `Score dipped ${Math.abs(scoreChange)} points — ${worsened[0].name} drove the slide. The plan adds reps there.`;
  }
  return `Score dropped ${Math.abs(scoreChange)} points. One test is noise, not a verdict — the plan refocuses on what this one revealed.`;
};

// ═══════════════════════════════════════════════════════════════════════════
// READ ACCESSORS — pure helpers consumed by dashboard cards
// ═══════════════════════════════════════════════════════════════════════════

// getTodaySlice moved to services/selectors/todaySlice.js (Stage 2c of the
// bundle-split plan) so dashboard components can read "what's on today"
// without dragging this module's bank/routing imports into their chunk.
// Re-exported here for back-compat; new consumers import the selector.
export { getTodaySlice } from './selectors/todaySlice';
