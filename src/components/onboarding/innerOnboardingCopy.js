/**
 * innerOnboardingCopy — the post-signup flow's continuity copy, keyed on the
 * answers the pre-signup funnel already collected (users/{uid}
 * .onboardingProfile.answers) plus the choices made inside the inner flow
 * itself. Pure data + functions, same contract as funnelConfig: the
 * component stays a dumb renderer, every fn falls back to null (render the
 * current generic copy) for legacy docs without funnel answers.
 *
 * Voice rules (shared with funnelConfig, pinned by tests): no emojis, no
 * em-dashes, no score promises. Explicit "Earlier you said" callbacks are
 * BUDGETED to two per flow — screen 0 (the confirm) and screen 11 (the
 * payoff); every other line folds the fact in silently. Real listening
 * mostly uses what it heard without citing it.
 *
 * Imports ONLY funnelConfig (pure). Never import starterPlanService here:
 * it would drag the study-plan generator into this chunk, and the finish
 * preview deliberately promises only student-picked facts (areas, days,
 * goal, date) so it stays true across generator swaps.
 */

// ── Option sets (moved from InnerOnboarding.jsx so exhaustiveness tests can
//    iterate them) ────────────────────────────────────────────────────────
// The `value` slugs are a persisted schema shared with starterPlanService's
// area→skill maps — labels can change, values cannot.

export const SECTION_OPTIONS = [
  { value: 'math', label: 'Math' },
  { value: 'rw', label: 'Reading and Writing' },
  { value: 'timing', label: 'Time management' },
  { value: 'strategy', label: 'Test-taking strategy' },
];

export const MATH_AREA_OPTIONS = [
  { value: 'algebra', label: 'Algebra: equations, lines, systems' },
  { value: 'advanced-math', label: 'Advanced math: quadratics, functions' },
  { value: 'problem-solving', label: 'Percents, ratios, and data' },
  { value: 'geometry', label: 'Geometry and trig' },
];

export const RW_AREA_OPTIONS = [
  { value: 'reading', label: 'Understanding what I read' },
  { value: 'evidence', label: 'Choosing evidence-backed answers' },
  { value: 'vocab', label: 'Vocabulary in context' },
  { value: 'grammar', label: 'Grammar and punctuation' },
];

/** Short phrases for the finish-screen preview, one per persisted area value. */
export const AREA_PREVIEW_PHRASES = {
  algebra: 'algebra',
  'advanced-math': 'advanced math',
  'problem-solving': 'percents and data',
  geometry: 'geometry',
  reading: 'reading comprehension',
  evidence: 'evidence',
  vocab: 'vocabulary',
  grammar: 'grammar',
};

// ── Screen copy variants ─────────────────────────────────────────────────

/**
 * Screen 0 (feeling, pre-selected from the funnel): confirm, never
 * re-interview — the funnel asked this three minutes ago. Callback #1 of
 * the flow's budget of two. Keeps a permission clause.
 */
export function feelingBody(funnelAnswers = {}) {
  switch (funnelAnswers.feeling) {
    case 'stressed':
    case 'heavy':
      return "Earlier you said this was weighing on you. If that's still right, we set the tone for it. No wrong answer here.";
    case 'confident':
      return 'Earlier you said you mostly need reps. Still true? No wrong answer here.';
    case 'fine':
      return 'You were mostly fine, a little on edge. Still the case? No wrong answer here.';
    default:
      return null;
  }
}

/** Screen 1 (exam date): the timing answer folded in silently. */
export function examDateIntro(funnelAnswers = {}) {
  switch (funnelAnswers.timing) {
    case 'lt2m':
      return 'With a test inside two months, these next dates are the ones that matter.';
    case '2to6m':
      return 'A few of these fit your two-to-six-month window.';
    case 'gt6m':
      return 'No rush on your timeline. Locking a date still sharpens the plan.';
    case 'undecided':
      return "No pressure here. This is what's coming up, in case one looks right.";
    default:
      return null;
  }
}

/**
 * Screen 2 (current score): the question ITSELF changes with the baseline —
 * a student who told the funnel they took the real SAT should be asked what
 * it gave them, not whether they have tested. `skipPrimary` flips the
 * screen's affordances for a fresh starter: skipping becomes the primary
 * CTA (the copy invites it, so the button must agree), score entry stays
 * available as the secondary path.
 * @returns {{title:string, body:string, skipPrimary:boolean, skipLabel:string}|null}
 */
export function scoreScreenCopy(funnelAnswers = {}) {
  switch (funnelAnswers.baseline) {
    case 'sat':
      return {
        title: 'What did the real SAT give you?',
        body: 'Your official score aims the plan exactly. Change it later anytime.',
        skipPrimary: false,
        skipLabel: "I'd rather not say",
      };
    case 'psat':
      return {
        title: 'What did the PSAT give you?',
        body: 'Enter it as-is. PSAT scores sit on the same scale, it just tops out lower.',
        skipPrimary: false,
        skipLabel: "I'd rather not say",
      };
    case 'practice':
      return {
        title: 'Where did your practice tests land?',
        body: 'A rough number is enough to aim the plan.',
        skipPrimary: false,
        skipLabel: "I don't remember",
      };
    case 'fresh':
      return {
        title: "No scores yet, and that's fine.",
        body: 'The diagnostic finds your real starting point.',
        skipPrimary: true,
        skipLabel: 'Skip, the diagnostic will find it',
      };
    default:
      return null;
  }
}

/** Screen 6 (biggest worry): the funnel's blocker answer folded in silently. */
export function worryBody(funnelAnswers = {}) {
  switch (funnelAnswers.blocker) {
    case 'plateau':
      return "This is where a stuck score usually lives. We'll spend the most time here.";
    case 'busy':
      return 'With a full schedule, this is where the limited time should go.';
    case 'lost':
      return 'This is the first thing the diagnostic pins down.';
    case 'procrastinate':
      return 'This is where starting gets easy.';
    default:
      return null;
  }
}

/**
 * Screen 7 (weak math areas): keyed on the worry picked at screen 6 of THIS
 * flow (inner-session state, not a funnel answer). Every SECTION_OPTIONS
 * value has a stance; the copy must never restate the title's question.
 */
export function mathAreasBody(worryArea) {
  switch (worryArea) {
    case 'math':
      return 'You flagged Math. Getting specific means week one lands there.';
    case 'rw':
      return 'Math first to cover it quickly. Your Reading and Writing focus comes next.';
    case 'timing':
      return 'Timing pressure usually hides in specific question types. Start with the shakiest.';
    case 'strategy':
      return 'Strategy gaps show up as question types too. Pick the shakiest.';
    default:
      return null;
  }
}

/** Screen 8 (weak R&W areas): only the flagged-R&W case earns a variant. */
export function rwAreasBody(worryArea) {
  if (worryArea === 'rw') {
    return "This is the area you flagged. Pick whatever feels shakiest.";
  }
  return null;
}

/** Screen 9 (study days): the funnel's study window folded in silently. */
export function studyDaysBody(funnelAnswers = {}) {
  switch (funnelAnswers.studyWindow) {
    case 'weekend':
      return 'Weekends, then. Three focused days can genuinely move a score.';
    case 'evening':
      return 'Evenings after everything else burn out fast. Pick a number that survives a bad week.';
    case 'morning':
      return 'Mornings tend to stick. Pick what you can actually protect.';
    default:
      return null;
  }
}

// "2026-08-22" → "Aug 22" (local parts, no Date parsing — TZ safe).
const PREVIEW_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const previewDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  return `${PREVIEW_MONTHS[Number(m[2]) - 1]} ${Number(m[3])}`;
};

/**
 * Screen 11 (finish) — the payoff, and callback #2 of the flow's budget:
 * the flow proves it was listening by previewing the starter plan from the
 * student's own picks. Promises ONLY student-picked facts (never generator
 * internals), clauses omit independently, at most two named areas, and a
 * max-skip student gets an honest floor instead of a hollow shell.
 *
 * @param {Object} picks - {weakMathAreas, weakRWAreas, studyDaysPerWeek, goal, testDate}
 * @returns {string} the full finish-screen body line
 */
export function finishPreviewLine({ weakMathAreas = [], weakRWAreas = [], studyDaysPerWeek = null, goal = null, testDate = '' } = {}) {
  const phrases = [...weakMathAreas, ...weakRWAreas]
    .map((v) => AREA_PREVIEW_PHRASES[v])
    .filter(Boolean);
  const hasDays = Number.isFinite(studyDaysPerWeek) && studyDaysPerWeek > 0;
  if (!hasDays && phrases.length === 0) {
    return 'Your starter plan is ready. The diagnostic fills in whatever you skipped.';
  }
  const parts = [];
  if (hasDays) parts.push(`${studyDaysPerWeek} days a week`);
  if (phrases.length === 1) parts.push(`opening with ${phrases[0]}`);
  else if (phrases.length === 2) parts.push(`opening with ${phrases[0]} and ${phrases[1]}`);
  else if (phrases.length > 2) parts.push(`opening with ${phrases[0]}, ${phrases[1]} and more`);
  if (Number.isFinite(goal)) parts.push(`aimed at ${goal}`);
  const dateLabel = previewDate(testDate);
  const dateSentence = dateLabel ? ` Test day ${dateLabel} is on the calendar.` : '';
  return `Your starter plan: ${parts.join(', ')}.${dateSentence} The diagnostic on your home screen sharpens it.`;
}
