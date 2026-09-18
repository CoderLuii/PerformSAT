/**
 * dayNarrative.js — one short, plain-language coach line for a single day in
 * the Weekly View, rendered above that day's activity cards.
 *
 * Echoes Acely's per-day narrative: explain WHY this focus lands today, give
 * one concrete watch-for, and fold in a test-proximity nudge. Two sentences at
 * most. Plain text — no emoji, not italic (the study plan is where advice
 * belongs, per the diagnostic-vs-plan split).
 *
 * Pure and deterministic: a function of the day's activities, the section-
 * tagged weaknesses (read for accuracy/"why"), and days-until-test. No
 * Firestore, no network, no AI. Returns '' when there's nothing to say (an
 * empty or fully-skipped day) so the caller can omit the line entirely.
 */

const SECTION_LABEL = { math: 'Math', rw: 'Reading & Writing' };

// The one concrete habit to hold, by section. Lowercase — always follows
// "As you go, ".
const SECTION_WATCH = {
  math: 'name what the question is actually asking before you calculate — that is where the points usually leak',
  rw: 'read the whole sentence or short passage before you commit, since the tempting answer is often true but off-topic',
};

/** Strip the "Practice:"/"Drill:" prefix so skill names read clean. */
function cleanTitle(title) {
  return String(title || '').replace(/^(Practice|Drill)\s*:\s*/i, '').trim();
}

const sectionOf = (a) => (a && a.section === 'rw' ? 'rw' : 'math');
const skillNameOf = (a) => a.skillName || a.skill || cleanTitle(a.title);

/**
 * Test-proximity clause. Bounded so the same day reads differently far from vs
 * close to the exam. Empty when the date is unknown or already past.
 *
 * @param {number|null} days  signed days-until-test (null/negative → no clause)
 * @returns {string}
 */
function daysClause(days) {
  if (days == null || days < 0) return '';
  if (days === 0) return 'Your exam is today — trust the work you have put in and stay calm.';
  if (days <= 7) return `With the exam ${days} day${days === 1 ? '' : 's'} away, drill for consistency, not brand-new material.`;
  if (days <= 21) return `With ${days} days to go, favor accuracy over volume.`;
  if (days <= 60) return `With ${days} days left, keep steady, deliberate reps.`;
  return `With ${days} days until the exam, this is a good place to build the base carefully.`;
}

/**
 * Compose the day's narrative.
 *
 * @param {object} args
 * @param {Array} [args.activities]      that day's weeks[].activities[] entries
 * @param {Array} [args.weaknesses]      section-tagged weaknesses (for accuracy)
 * @param {number|null} [args.daysUntilTest]  signed days-until-test
 * @param {string} [args.dayLabel]       sentence lead — 'Today' (default) for
 *   the current day, otherwise the weekday name ('Monday') so a future day in
 *   the week doesn't read as if it were today
 * @returns {string}  one or two sentences, or '' when the day is empty
 */
export function buildDayNarrative({ activities = [], weaknesses = [], daysUntilTest = null, dayLabel = 'Today' } = {}) {
  const acts = (Array.isArray(activities) ? activities : [])
    .filter((a) => a && a.type !== 'lesson' && !a.skipped);
  if (acts.length === 0) return '';

  const lead = dayLabel || 'Today';
  const dc = daysClause(daysUntilTest);

  // Test day — the checkpoint short-circuits everything else.
  const test = acts.find((a) => a.type === 'test');
  if (test) {
    // The starter plan's check-in is the adaptive diagnostic, not a
    // full-length test — say so, or the coach line contradicts the card.
    const base = test.activityType === 'miniDiagnostic'
      ? `${lead} is your diagnostic — about half the length of a full SAT, adapting as you answer. Take it timed, and your plan rebuilds itself the moment you finish.`
      : /Practice Test 2/i.test(test.title || '')
        ? `${lead} is your Practice Test 2 — the checkpoint that unlocks a deeper, more personal plan. Take it timed and uninterrupted.`
        : `${lead} is a full practice test. Take it under real timed conditions so the result reflects where you actually stand.`;
    return dc ? `${base} ${dc}` : base;
  }

  const practice = acts.filter((a) => a.type === 'practice');
  const strategy = acts.filter((a) => a.type === 'strategy' || a.type === 'review');
  const sections = new Set(practice.map(sectionOf));
  const skillNames = practice.map(skillNameOf).filter(Boolean);

  const weaknessBySkill = new Map(
    (Array.isArray(weaknesses) ? weaknesses : [])
      .filter((w) => w && w.skillId)
      .map((w) => [w.skillId, w]),
  );

  let why;
  if (practice.length === 0 && strategy.length > 0) {
    // A tips/strategy-only day is a deliberately lighter day.
    why = `${lead} is a lighter, strategy-focused day — ${cleanTitle(strategy[0].title)} to sharpen your habits rather than cover new content.`;
  } else if (sections.size >= 2) {
    why = `${lead} spans both sections — ${SECTION_LABEL.math} and ${SECTION_LABEL.rw} — so warm up on each before switching gears.`;
  } else if (practice.length > 0) {
    const primary = practice[0];
    const skill = skillNameOf(primary);
    const section = sectionOf(primary);
    const weak = weaknessBySkill.get(primary.skillId);
    let clause;
    if (weak && typeof weak.accuracy === 'number') {
      clause = ` — you are at ${Math.round(weak.accuracy)}% there, so it stays a priority`;
    } else if (weak) {
      clause = ` in ${SECTION_LABEL[section]} — a flagged focus area`;
    } else {
      clause = ` in ${SECTION_LABEL[section]}, which is newer ground for you`;
    }
    const more = skillNames.length - 1;
    const extra = more > 0 ? `, plus ${more} more set${more === 1 ? '' : 's'}` : '';
    why = `${lead} centers on ${skill}${clause}${extra}.`;
  } else {
    why = `${lead} is targeted practice on your flagged skills.`;
  }

  // Watch-for — math takes precedence when the day mixes sections.
  const watchSection = sections.has('math') ? 'math' : (sections.has('rw') ? 'rw' : null);
  const watch = watchSection ? `As you go, ${SECTION_WATCH[watchSection]}.` : '';

  return [why, watch, dc].filter(Boolean).join(' ');
}
