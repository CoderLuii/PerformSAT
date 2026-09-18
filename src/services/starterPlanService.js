/**
 * starterPlanService — the initial study plan built from onboarding answers.
 *
 * The moment a student finishes inner onboarding they have told us, in their
 * own words, where they're weak, when their test is, and what they're aiming
 * for. That's enough signal for a REAL first plan — low evidence, but real.
 * Rather than invent a second plan format, we synthesize a minimal
 * runDiagnostic()-shaped object from the self-report and feed it to the same
 * generateStudyPlan() the diagnostic pipeline uses. Self-reported gaps enter
 * at evidenceLevel 'suspected' (attempted: 0), which the generator already
 * treats as probe-sized commitments rather than multi-week bets.
 *
 * The diagnostic is injected as the plan's first activity; completing
 * it runs the real diagnostic pipeline, which regenerates and REPLACES this
 * plan wholesale (plan.planSource === 'onboarding-starter' marks it as
 * provisional for the UI).
 *
 * All skillIds below are bank alias-map vocabulary (bank/aliases.js and
 * rwBank/taxonomy.js), so Tier-3 drill routing resolves them to real pools.
 */
import { generateStudyPlan } from './studyPlanGenerator';

export const STARTER_PLAN_SOURCE = 'onboarding-starter';

// Self-reported math area → representative drill-routable skills.
const MATH_AREA_SKILLS = {
  'algebra': [
    { skillId: 'linear-equations', name: 'Linear equations' },
    { skillId: 'linear-functions', name: 'Linear functions' },
  ],
  'advanced-math': [
    { skillId: 'quadratics', name: 'Quadratics' },
    { skillId: 'algebraic-expressions', name: 'Working with expressions' },
  ],
  'problem-solving': [
    { skillId: 'percentages', name: 'Percentages' },
    { skillId: 'ratios', name: 'Ratios and rates' },
  ],
  'geometry': [
    { skillId: 'triangles', name: 'Triangles' },
    { skillId: 'circles', name: 'Circles' },
  ],
};

// Self-reported R&W area → representative drill-routable skills.
const RW_AREA_SKILLS = {
  'reading': [
    { skillId: 'central-ideas', name: 'Central ideas and details' },
    { skillId: 'inferences', name: 'Inferences' },
  ],
  'evidence': [
    { skillId: 'command-of-evidence', name: 'Command of evidence' },
  ],
  'vocab': [
    { skillId: 'words-in-context', name: 'Words in context' },
  ],
  'grammar': [
    { skillId: 'grammar', name: 'Grammar and sentence structure' },
    { skillId: 'transitions', name: 'Transitions' },
  ],
};

const MATH_DOMAIN_BY_AREA = {
  'algebra': 'algebra',
  'advanced-math': 'advanced-math',
  'problem-solving': 'problem-solving',
  'geometry': 'geometry',
};

const RW_DOMAIN_BY_AREA = {
  'reading': 'information-and-ideas',
  'evidence': 'information-and-ideas',
  'vocab': 'craft-and-structure',
  'grammar': 'standard-english-conventions',
};

/** Self-report weakness entry in the analyzeSkills weakSkills shape. */
const starterWeakSkill = ({ skillId, name }, section, domain) => ({
  skillId,
  name,
  domain,
  section,
  // Self-reported: no attempts behind it. 'suspected' + attempted 0 is the
  // generator's existing low-evidence tier — probe-sized time, honest copy.
  testAccuracy: 55,
  contentAccuracy: 55,
  attempted: 0,
  evidenceLevel: 'suspected',
  missedPatterns: [],
  sections: [],
  historicalMastery: null,
  primaryErrorType: 'Self-reported weak area',
});

/**
 * Pick the weak-skill list from the onboarding answers, falling back to the
 * coarse worry area (or a balanced default) when the student skipped the
 * detailed screens.
 */
const collectWeakSkills = ({ weakMathAreas, weakRWAreas, worryArea }) => {
  const out = [];
  const mathAreas = Array.isArray(weakMathAreas) ? weakMathAreas.filter((a) => MATH_AREA_SKILLS[a]) : [];
  const rwAreas = Array.isArray(weakRWAreas) ? weakRWAreas.filter((a) => RW_AREA_SKILLS[a]) : [];

  mathAreas.forEach((area) => {
    MATH_AREA_SKILLS[area].forEach((s) => out.push(starterWeakSkill(s, 'math', MATH_DOMAIN_BY_AREA[area])));
  });
  rwAreas.forEach((area) => {
    RW_AREA_SKILLS[area].forEach((s) => out.push(starterWeakSkill(s, 'rw', RW_DOMAIN_BY_AREA[area])));
  });

  if (out.length === 0) {
    // Nothing detailed selected — fall back to the coarse worry area.
    const fallbackAreas = worryArea === 'math'
      ? { math: ['algebra', 'problem-solving'], rw: [] }
      : worryArea === 'rw'
        ? { math: [], rw: ['reading', 'grammar'] }
        : { math: ['algebra'], rw: ['reading'] }; // timing/strategy/unknown: balanced probe
    fallbackAreas.math.forEach((area) => {
      MATH_AREA_SKILLS[area].forEach((s) => out.push(starterWeakSkill(s, 'math', MATH_DOMAIN_BY_AREA[area])));
    });
    fallbackAreas.rw.forEach((area) => {
      RW_AREA_SKILLS[area].forEach((s) => out.push(starterWeakSkill(s, 'rw', RW_DOMAIN_BY_AREA[area])));
    });
  }

  return out;
};

/**
 * Minimal runDiagnostic()-shaped object from self-report. Every field listed
 * here is read (some unguarded) by generateStudyPlan — keep them all.
 */
export const buildStarterDiagnostic = (profile = {}) => {
  const targetScore = Number.isFinite(profile.targetScore) ? profile.targetScore : 1400;
  const currentScore = Number.isFinite(profile.currentScore)
    ? profile.currentScore
    : Math.max(400, targetScore - 250); // conservative estimate until the check-in measures it

  return {
    testId: STARTER_PLAN_SOURCE,
    testTitle: 'Your onboarding answers',
    score: {
      scaled: currentScore,
      isMultiSection: true,
      sections: { math: null },
    },
    skillAnalysis: {
      weakSkills: collectWeakSkills(profile),
      strongSkills: [],
    },
    errorPatterns: { counts: {}, dominantPattern: null, summary: '', totalWrong: 0 },
    timeAnalysis: { fadeEffect: 0 },
    scoreProjection: { easyWins: { count: 0, description: '' }, errorTypeProjections: [] },
    prioritizedActions: [],
  };
};

/** First activity of every starter plan: the diagnostic that replaces it. */
const checkInActivity = (day) => ({
  type: 'test',
  activityType: 'miniDiagnostic',
  title: 'Take your diagnostic',
  subtitle: '40 adaptive questions measure your real starting point and rebuild this plan from evidence.',
  duration: 55,
  priority: 100,
  icon: null,
  day,
  weekPhase: 'start',
  tips: [
    'No prep needed — it adapts to you as you answer',
    'Your plan upgrades itself the moment you finish',
  ],
});

/**
 * Build the provisional study plan from onboarding answers.
 *
 * @param {Object} profile - inner-onboarding payload + user doc fields:
 *   { targetScore, currentScore, testDate, worryArea, confidentArea,
 *     weakMathAreas: string[], weakRWAreas: string[], studyDaysPerWeek }
 * @returns {Object|null} generateStudyPlan output stamped as a starter plan,
 *   with the check-in as week 1's first activity; null if generation throws.
 */
export const buildStarterPlan = (profile = {}) => {
  try {
    const diagnostic = buildStarterDiagnostic(profile);
    const plan = generateStudyPlan(diagnostic, {
      targetScore: Number.isFinite(profile.targetScore) ? profile.targetScore : undefined,
      testDate: profile.testDate || undefined,
      // Schedule truth: the starter plan honors the same day/session answers
      // the real plan does (deriveSchedule reads these three).
      studyDaysPerWeek: profile.studyDaysPerWeek,
      studyWindow: profile.studyWindow,
      sessionLength: profile.sessionLength,
    });
    if (!plan || !Array.isArray(plan.weeks) || plan.weeks.length === 0) return null;

    const daysPerWeek = Number.isFinite(profile.studyDaysPerWeek)
      ? Math.min(7, Math.max(2, profile.studyDaysPerWeek))
      : null;

    const weeks = plan.weeks.map((week, wi) => {
      // The generator's practice-test checkpoints assume a first test already
      // happened; the starter plan's only test is the check-in.
      let activities = (week.activities || []).filter((a) => a?.type !== 'test');
      // Honor the student's own capacity: at most one activity per study day.
      if (daysPerWeek != null && activities.length > daysPerWeek) {
        activities = activities.slice(0, daysPerWeek);
      }
      if (wi === 0) {
        const firstDay = activities[0]?.day || 'Monday';
        activities = [checkInActivity(firstDay), ...activities];
      }
      return { ...week, activities, isTestWeek: wi === 0 };
    });

    // Drill-shape weaknesses for the Focus Area cards (the test/check-in
    // paths get these from enrichPlanWithGroundTruth, which the starter path
    // skips — without them the dashboard renders zero Focus Areas despite
    // the onboarding promise). Same field shape as buildGroundTruthDiagnosis,
    // with honest self-report copy; the check-in replaces all of it.
    const weaknesses = (diagnostic.skillAnalysis.weakSkills || []).map((s) => ({
      skillId: s.skillId,
      skill: s.name,
      evidence: 'Self-reported in onboarding — the diagnostic measures your real starting point',
      accuracy: s.testAccuracy,
      attempted: 0,
      blanks: 0,
      contentAccuracy: s.contentAccuracy,
      evidenceLevel: 'suspected',
      errorType: 'Self-reported weak area',
      domain: s.domain,
      modules: [],
      sections: [],
      section: s.section,
      missedPatterns: [],
    }));

    return {
      ...plan,
      weeks,
      weaknesses,
      planSource: STARTER_PLAN_SOURCE,
      basedOnTest: STARTER_PLAN_SOURCE,
    };
  } catch (err) {
    // A starter plan is a nice-to-have — never let it block onboarding.
    // eslint-disable-next-line no-console
    console.error('[starterPlan] generation failed:', err);
    return null;
  }
};
