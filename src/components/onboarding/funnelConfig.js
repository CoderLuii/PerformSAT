/**
 * Pre-signup onboarding funnel — content + profile mapping.
 *
 * All question/interstitial copy lives here as data so the flow component
 * stays a dumb renderer and the copy is unit-testable (no emoji, option
 * counts, id uniqueness). buildFunnelProfile is the single translation
 * point from quiz answers to users/{uid} profile fields.
 */

/** Persisted schema version for users/{uid}.onboardingProfile. */
export const FUNNEL_VERSION = 1;

/**
 * Staging-format version for the in-progress localStorage state. Separate
 * from FUNNEL_VERSION: bumping this discards half-finished sessions when
 * the step table changes shape, WITHOUT implying the persisted answers
 * schema changed.
 */
export const FUNNEL_STORAGE_VERSION = 3;

/** localStorage key for in-progress funnel state (pre-auth staging). */
export const FUNNEL_STORAGE_KEY = 'seva:onboardingFunnel:v1';

export const DEFAULT_FUNNEL_GOAL = 1400;

/**
 * The quiz's real arc, surfaced as chapters: eyebrow labels above each
 * question and the four segments of the progress bar. Tones map to the
 * tri-color brand (orange action / purple focus / lime mastery, navy ink).
 */
export const FUNNEL_CHAPTERS = [
  { id: 'test', label: 'Your test', tone: 'orange' },
  { id: 'how', label: 'How you work', tone: 'purple' },
  { id: 'way', label: "What's in the way", tone: 'lime' },
  { id: 'why', label: 'Why it matters', tone: 'navy' },
];

/**
 * Question definitions, in flow order. `id` is the answers-object key;
 * option `value`s are stable slugs persisted into onboardingProfile —
 * never rename them once shipped. `chapter` indexes FUNNEL_CHAPTERS.
 */
export const FUNNEL_QUESTIONS = [
  {
    id: 'timing',
    chapter: 0,
    title: 'When are you taking the SAT?',
    options: [
      { value: 'lt2m', label: 'In the next 2 months' },
      { value: '2to6m', label: '2–6 months from now' },
      { value: 'gt6m', label: 'More than 6 months out' },
      { value: 'undecided', label: "I haven't picked a date yet" },
    ],
  },
  {
    id: 'baseline',
    chapter: 0,
    title: 'Where are you starting from?',
    options: [
      { value: 'sat', label: "I've taken the real SAT" },
      { value: 'psat', label: "I've taken the PSAT" },
      { value: 'practice', label: "I've done practice tests on my own" },
      { value: 'fresh', label: 'Starting completely fresh' },
    ],
  },
  {
    id: 'feeling',
    chapter: 0,
    title: 'Honestly, how do you feel about this test?',
    options: [
      { value: 'confident', label: 'Confident. I just need reps' },
      { value: 'fine', label: 'Mostly fine, a little on edge' },
      { value: 'stressed', label: 'Stressed when I think about it' },
      { value: 'heavy', label: "It's genuinely weighing on me" },
    ],
  },
  {
    id: 'stuckHabit',
    chapter: 1,
    title: 'When a question stumps you, what do you usually do?',
    options: [
      { value: 'wrestle', label: 'Wrestle with it until it clicks' },
      { value: 'explanation', label: 'Read the explanation and move on' },
      { value: 'ask', label: 'Ask a teacher, tutor, or friend' },
      { value: 'skip', label: 'Skip it and hope' },
    ],
  },
  {
    id: 'studyWindow',
    chapter: 1,
    title: 'When would studying realistically happen?',
    options: [
      { value: 'morning', label: 'Before school or in free periods' },
      { value: 'evening', label: 'Evenings, after everything else' },
      { value: 'weekend', label: 'Mostly weekends' },
      { value: 'flexible', label: 'Wherever it fits' },
    ],
  },
  {
    id: 'sessionLength',
    chapter: 1,
    title: 'How long is a real study session for you?',
    options: [
      { value: '15m', label: 'About 15 focused minutes' },
      { value: '30m', label: 'Around half an hour' },
      { value: '60m', label: 'An hour or more' },
      { value: 'varies', label: 'Depends on the day' },
    ],
  },
  {
    id: 'blocker',
    chapter: 2,
    title: 'What gets between you and studying?',
    options: [
      { value: 'procrastinate', label: 'I keep putting it off' },
      { value: 'lost', label: "I don't know where to start" },
      { value: 'busy', label: 'School already takes everything I have' },
      { value: 'plateau', label: "I study, but the score won't move" },
    ],
  },
  {
    id: 'testReaction',
    chapter: 2,
    title: 'How do practice tests usually leave you feeling?',
    options: [
      { value: 'motivated', label: 'Ready to attack my weak spots' },
      { value: 'deflated', label: 'Deflated by the number' },
      { value: 'unsure', label: 'Unsure what to fix first' },
      { value: 'avoid', label: 'I avoid taking them' },
    ],
  },
  {
    id: 'motivation',
    chapter: 3,
    title: 'What would hitting your target actually change?',
    options: [
      { value: 'colleges', label: 'Which colleges I can realistically aim for' },
      { value: 'scholarships', label: 'Scholarship money' },
      { value: 'self', label: 'Proving to myself I can do it' },
      { value: 'pressure', label: 'Less pressure from everyone around me' },
    ],
  },
  // Pre-gate micro-commitment (Headway pattern: an easy yes right before the
  // ask builds buy-in). Both answers are affirmative on purpose — this is a
  // commitment device, not a filter — and it calls back INT-B's
  // "twenty minutes" promise.
  {
    id: 'commitment',
    chapter: 3,
    title: 'Could you give this 20 focused minutes a day?',
    options: [
      { value: 'allin', label: "I'm in. Let's do this" },
      { value: 'try', label: "I'll do my best" },
    ],
  },
];

/**
 * Interstitial copy. The reassure heading adapts to the `feeling` answer
 * and the student's name (see reassureHeading). Visuals are rendered by
 * the flow component (keyed on `visual`) — pure CSS/SVG product-truth
 * cards, no testimonials.
 */
export const FUNNEL_INTERSTITIALS = {
  reassure: {
    id: 'reassure',
    visual: 'trajectory',
    body:
      'Score plateaus usually aren’t about effort. They come from studying everything instead of the handful of question types actually costing you points. SEVA finds those, and builds your plan around them.',
    cta: 'Continue',
  },
  rightMinutes: {
    id: 'rightMinutes',
    visual: 'diagnosis',
    heading: "Hours don't raise scores. The right minutes do.",
    body:
      'Twenty minutes on the question types you actually miss beats two unfocused hours on everything else. Your diagnostic pinpoints exactly where your points are hiding.',
    cta: 'Continue',
  },
  neverStuck: {
    id: 'neverStuck',
    visual: 'tutor',
    heading: "Stuck shouldn't be a dead end.",
    body:
      'Every SEVA question ends with a real explanation — why the right answer is right, why each wrong one is tempting — plus a tutor you can ask anything, as many times as it takes.',
    cta: 'Continue',
  },
};

/**
 * Reassure-interstitial heading: mirrors the feeling answer back, with the
 * student's name woven in when we have one.
 */
export function reassureHeading(feeling, name = '') {
  const n = (name || '').trim();
  switch (feeling) {
    case 'confident':
      return n ? `Good, ${n}. Let's turn that into points.` : "Good. Let's turn that into points.";
    case 'fine':
      return n ? `${n}, that's a solid place to start from.` : "That's a solid place to start from.";
    case 'stressed':
    case 'heavy':
      return n ? `That feeling is common, ${n}. And fixable.` : 'That feeling is common. And fixable.';
    default:
      return 'Wherever you start, the path is the same.';
  }
}

/**
 * Acknowledgment lines — the tutor responding to the answer the student just
 * gave, shown at the top of the NEXT screen. Keyed by the PREVIOUS question's
 * id; funnelAckFor owns the display rule. Binding voice rules (pinned by
 * tests): at most 2 short sentences and 90 chars total, no emojis, no
 * em-dashes, an implication or honest observation (never praise-only), no
 * "You said/You mentioned" callbacks, aim/target framing only (never a
 * promise of reaching a score), and at least 3 distinct syntactic openings
 * per set so the device never reads as a mold.
 */
export const FUNNEL_ACKS = {
  timing: {
    lt2m: 'Under two months. Short runway, so every session has to earn its keep.',
    '2to6m': 'The sweet spot. Enough time to fix things properly, no cramming required.',
    gt6m: 'That much runway changes the plan. Depth first, speed later.',
    undecided: 'No date yet is fine. Your pace will tell us when you are ready.',
  },
  baseline: {
    sat: 'A real SAT on record. That gives your plan honest numbers to start from.',
    psat: 'The PSAT is a solid preview. It tells us roughly where the points are.',
    practice: 'Practice tests on your own says a lot. Now they get a direction.',
    fresh: 'Starting fresh cuts both ways. No baseline, but no bad habits either.',
  },
  stuckHabit: {
    wrestle: 'Wrestling with it builds real understanding. The goal is making that quicker.',
    explanation: 'Reading the explanation is a start. Catching why you fell for it is the fix.',
    ask: 'Good instinct, asking. Here, the tutor is on every single question.',
    skip: 'Skip and hope stops working eventually. Every question here has a way through.',
  },
  studyWindow: {
    morning: 'Before school is prime time. Fresh head, no homework debt yet.',
    evening: 'Evenings, after everything else. Sessions have to be tight to survive that.',
    weekend: 'Weekends it is. Fewer, longer sittings can still move a score.',
    flexible: 'Wherever it fits works, as long as it actually fits somewhere every week.',
  },
  blocker: {
    procrastinate: 'Putting it off usually means the task feels too big. Small sessions fix that.',
    lost: 'Not knowing where to start is the easiest problem here. Diagnosis is the whole point.',
    busy: 'A full plate is real. The plan has to fit your life, not the other way around.',
    plateau: 'A stuck score is the most fixable problem on this list. Effort is not your issue.',
  },
  motivation: {
    colleges: 'Which schools are realistic changes with every point band. Worth twenty minutes a day.',
    scholarships: 'Scholarship cutoffs are just numbers on a page. Aim above the one you need.',
    self: 'Proving it to yourself is the most durable fuel there is. Use it.',
    pressure: 'Less pressure comes from a plan you trust. That part we can build.',
  },
  commitment: {
    allin: 'Twenty focused minutes a day. Now point them at a number.',
    try: 'Doing your best is all this takes. Now give it a target.',
  },
};

/**
 * The ack display rule (pinned by tests): an ack renders only when the step
 * IMMEDIATELY before this one in FUNNEL_STEPS is a question — so screens that
 * follow an interstitial never double-acknowledge an answer the interstitial
 * just reflected. This naturally yields exactly 7 ack sites: baseline,
 * feeling, studyWindow, sessionLength, testReaction, commitment, and the
 * goal screen (whose predecessor is the commitment question — the flow's
 * loudest yes, reflected here and nowhere else).
 *
 * @param {number} stepIndex - index into FUNNEL_STEPS of the CURRENT screen
 * @param {Object} answers - {questionId: optionValue}
 * @returns {string|null} the ack line, or null (render nothing)
 */
export function funnelAckFor(stepIndex, answers = {}) {
  const prev = FUNNEL_STEPS[stepIndex - 1];
  if (!prev || prev.type !== 'question') return null;
  return FUNNEL_ACKS[prev.id]?.[answers[prev.id]] || null;
}

/** Display labels reused by the build interlude and the path recap. */
export const SESSION_LENGTH_LABELS = {
  '15m': 'about 15 focused minutes',
  '30m': 'around half an hour',
  '60m': 'an hour or more',
  varies: 'whatever the day gives',
};
export const STUDY_WINDOW_LABELS = {
  morning: 'mornings',
  evening: 'evenings',
  weekend: 'weekends',
  flexible: 'wherever it fits',
};

/**
 * Reassure-interstitial body: the current plateau framing assumes prior
 * study, which is wrong for a fresh starter — they get a from-zero framing
 * instead. Falls back to the studied-before body when baseline is missing.
 */
export function reassureBody(answers = {}) {
  if (answers.baseline === 'fresh') {
    return 'Starting from zero is simpler than it looks. The diagnostic finds where your points are hiding, and your plan starts there instead of page one of a giant book.';
  }
  return FUNNEL_INTERSTITIALS.reassure.body;
}

/**
 * rightMinutes interstitial, adapted to the student's own session length so
 * the pitch quotes their reality back instead of a generic "twenty minutes".
 * The 15m variant deliberately echoes the commitment question's
 * twenty-minutes ask so the two screens agree.
 * @returns {{heading:string, body:string}}
 */
export function rightMinutesCopy(answers = {}) {
  const shared = 'Your diagnostic pinpoints exactly where your points are hiding.';
  switch (answers.sessionLength) {
    case '15m':
      return {
        heading: 'Fifteen minutes, well aimed, is real progress.',
        body: `Twenty focused minutes on the question types you actually miss beats two unfocused hours on everything else. ${shared}`,
      };
    case '30m':
      return {
        heading: 'Half an hour, well aimed, is plenty.',
        body: `Thirty minutes on the question types you actually miss beats two unfocused hours on everything. ${shared}`,
      };
    case '60m':
      return {
        heading: 'An hour is a weapon if it is pointed right.',
        body: `Length is not the problem, direction is. An hour on the question types you actually miss compounds fast. ${shared}`,
      };
    case 'varies':
      return {
        heading: 'Uneven weeks are fine. Wasted minutes are not.',
        body: `Whatever a day gives you should go to the question types you actually miss. ${shared}`,
      };
    default:
      return {
        heading: FUNNEL_INTERSTITIALS.rightMinutes.heading,
        body: FUNNEL_INTERSTITIALS.rightMinutes.body,
      };
  }
}

/**
 * neverStuck interstitial: the heading softens for a student who leaves
 * practice tests deflated; the body ADVANCES from the stuck-habit answer to
 * the product mechanism (per-choice explanations + the tutor) without
 * re-naming the habit — the ack on the studyWindow screen already responded
 * to it, and reflecting the same answer twice reads as a script.
 * @returns {{heading:string, body:string}}
 */
export function neverStuckCopy(answers = {}) {
  const heading = answers.testReaction === 'deflated'
    ? 'A number without a plan just stings.'
    : FUNNEL_INTERSTITIALS.neverStuck.heading;
  const bodies = {
    wrestle: 'Every SEVA question ends with the full why: why the right answer is right, why each wrong one is tempting. Your instinct to dig gets a floor to stand on, plus a tutor for the rest.',
    explanation: 'Explanations here do not just re-solve the problem. They name the trap you fell for, choice by choice, and the tutor takes follow-ups as many times as it takes.',
    ask: 'Every question ships with a tutor that never gets tired of follow-ups. Ask until it clicks, at 11pm, three times in a row.',
    skip: 'Every SEVA question ends with a real way through: why the right answer is right, why each wrong one is tempting, and a tutor for whatever is still unclear.',
  };
  return { heading, body: bodies[answers.stuckHabit] || FUNNEL_INTERSTITIALS.neverStuck.body };
}

/**
 * The path screen's "Built from your answers" recap — the last impression
 * before the ask. Rows mirror the student's actual inputs; a row whose
 * answer is missing is omitted. Deliberately NO target row: the goal chip
 * already owns that number on this screen (it must appear exactly once).
 * @returns {Array<{label:string, value:string}>}
 */
export function buildPathRecap(answers = {}) {
  const rows = [];
  const timingValue = {
    lt2m: 'Test in the next 2 months',
    '2to6m': 'Test 2 to 6 months out',
    gt6m: '6+ months of runway',
    undecided: 'Date still open',
  }[answers.timing];
  if (timingValue) rows.push({ label: 'Timing', value: timingValue });
  const len = SESSION_LENGTH_LABELS[answers.sessionLength];
  const win = STUDY_WINDOW_LABELS[answers.studyWindow];
  if (len || win) {
    const sessions = len && win ? `${cap(len)}, ${win}` : cap(len || win);
    rows.push({ label: 'Sessions', value: sessions });
  }
  const firstJob = {
    plateau: 'Break the plateau',
    lost: 'Find your real starting point',
    busy: 'Fit prep into a full schedule',
    procrastinate: 'Make starting automatic',
  }[answers.blocker];
  if (firstJob) rows.push({ label: 'First job', value: firstJob });
  return rows;
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * Signup-screen body: ONE consequence line, never a re-list — the build
 * interlude narrated the process and the path screen just recapped the
 * facts; a third recitation would turn listening into a script. Null when
 * the student somehow has no answers (component falls back to current copy).
 */
export function signupBodyLine(answers = {}) {
  if (!Object.keys(answers).length) return null;
  return 'Everything you just told us is already shaped into your plan. It is saved the moment you are in.';
}

/**
 * The plan-build interlude: staged lines assembling the plan from the
 * student's own answers. Five lines when the student gave a session length,
 * four otherwise — render and the advance timer must BOTH derive the count
 * from this array (never hardcode it).
 */
export function buildInterludeLines(answers = {}, goal = DEFAULT_FUNNEL_GOAL, name = '') {
  const n = (name || '').trim();
  const timingPhrase = {
    lt2m: 'a test in the next 2 months',
    '2to6m': 'a test 2–6 months out',
    gt6m: 'a runway of 6+ months',
    undecided: 'a test date still to be picked',
  }[answers.timing];
  const len = SESSION_LENGTH_LABELS[answers.sessionLength];
  const win = STUDY_WINDOW_LABELS[answers.studyWindow];
  const lines = [
    n ? `Reading your answers, ${n}` : 'Reading your answers',
    'Locating where your points are hiding',
    timingPhrase ? `Calibrating pacing for ${timingPhrase}` : 'Calibrating your pacing',
  ];
  if (len) {
    lines.push(win ? `Sizing sessions to ${len}, ${win}` : `Sizing sessions to ${len}`);
  }
  lines.push(`Setting the bar at ${goal}`);
  return lines;
}

/**
 * Honest authority strip on the path screen — real content inventory only
 * (same rounded-down numbers the landing page asserts). Never student
 * counts or score promises.
 */
export const FUNNEL_PROOF_POINTS = [
  '2,200+ hand-authored questions',
  '12 full-length practice tests',
  'Every explanation written by a person',
];

/**
 * Flow order. `name` collects the personalization thread; `build` is the
 * auto-advancing plan-assembly interlude; chapters interleave with
 * interstitials at each chapter turn.
 */
export const FUNNEL_STEPS = [
  { type: 'name', id: 'name' },
  { type: 'question', id: 'timing' },
  { type: 'question', id: 'baseline' },
  { type: 'question', id: 'feeling' },
  { type: 'interstitial', id: 'reassure' },
  { type: 'question', id: 'stuckHabit' },
  { type: 'question', id: 'studyWindow' },
  { type: 'question', id: 'sessionLength' },
  { type: 'interstitial', id: 'rightMinutes' },
  { type: 'question', id: 'blocker' },
  { type: 'question', id: 'testReaction' },
  { type: 'interstitial', id: 'neverStuck' },
  { type: 'question', id: 'motivation' },
  { type: 'question', id: 'commitment' },
  { type: 'goal', id: 'goal' },
  { type: 'build', id: 'build' },
  { type: 'path', id: 'path' },
  { type: 'signup', id: 'signup' },
];

/**
 * Per-chapter fill fractions (0..1) for the segmented progress bar.
 * Chapter spans are step-index ranges over FUNNEL_STEPS; everything at or
 * past the build interlude reads as complete.
 */
const BUILD_STEP_INDEX = FUNNEL_STEPS.findIndex((s) => s.type === 'build');
const CHAPTER_SPANS = [
  { start: 1, end: 4 },
  { start: 5, end: 8 },
  { start: 9, end: 11 },
  { start: 12, end: 14 },
];

export function chapterFills(stepIndex) {
  return CHAPTER_SPANS.map(({ start, end }) => {
    if (stepIndex >= BUILD_STEP_INDEX) return 1;
    const span = end + 1 - start;
    return Math.min(1, Math.max(0, (stepIndex - start) / span));
  });
}

/**
 * Context line under the goal slider — mirrors the tiers students actually
 * ask about without naming a school list as a promise. The optional
 * motivation answer seasons the line for the two motivations the tier copy
 * does not already serve (colleges/scholarships are inherently score-tier
 * framed; self/pressure get one honest extra sentence).
 */
export function goalContextLine(goal, motivation) {
  let line;
  if (goal >= 1500) line = 'Competitive for the most selective schools in the country';
  else if (goal >= 1400) line = 'Strong for highly competitive universities';
  else if (goal >= 1300) line = 'Above the national average, solid for most flagships';
  else if (goal >= 1150) line = 'A real, reachable improvement target';
  else line = 'Every point from here is momentum';
  if (motivation === 'self') return `${line}. A target you chose for yourself tends to stick.`;
  if (motivation === 'pressure') return `${line}. A clear number quiets the noise around you.`;
  return line;
}

/**
 * Path-screen step 3 sub-line: the one blocker whose fix IS the product's
 * core loop gets the connection drawn explicitly. Everyone else keeps the
 * standard line.
 */
export function pathStepThreeSub(answers = {}) {
  if (answers.blocker === 'plateau') {
    return 'It rebuilds around what you miss. That is the fix for a stuck score.';
  }
  return 'It rebuilds itself around what you miss, every session.';
}

/** Snap to the SAT's 10-point grid and clamp to the composite range. */
export function normalizeFunnelGoal(goal) {
  const n = Number(goal);
  if (!Number.isFinite(n)) return DEFAULT_FUNNEL_GOAL;
  return Math.min(1600, Math.max(400, Math.round(n / 10) * 10));
}

/**
 * Translate funnel answers into the users/{uid} profile fields written at
 * signup. Pure — the only bridge between quiz slugs and profile schema.
 *
 * goalScale:'composite' must always accompany targetScore: it is the
 * provenance flag that stops normalizeProfileGoal from re-migrating
 * (doubling) sub-800 goals on the next hydration.
 *
 * @param {Object} answers - {questionId: optionValue} from the funnel
 * @param {number} goal - target score from the goal slider
 * @param {string} [completedAt] - ISO stamp (injectable for tests)
 * @returns {{targetScore:number, goalScale:'composite', hasTakenSAT:boolean, onboardingProfile:Object}}
 */
export function buildFunnelProfile(answers = {}, goal = DEFAULT_FUNNEL_GOAL, completedAt = new Date().toISOString()) {
  const cleanAnswers = {};
  for (const q of FUNNEL_QUESTIONS) {
    const v = answers[q.id];
    if (typeof v === 'string' && q.options.some((o) => o.value === v)) {
      cleanAnswers[q.id] = v;
    }
  }
  return {
    targetScore: normalizeFunnelGoal(goal),
    goalScale: 'composite',
    // hasTakenSAT keeps the legacy signup-doc semantics: a real SAT sitting,
    // not practice exposure. The PSAT/practice detail lives in the answers.
    hasTakenSAT: cleanAnswers.baseline === 'sat',
    onboardingProfile: {
      version: FUNNEL_VERSION,
      completedAt,
      answers: cleanAnswers,
    },
  };
}
