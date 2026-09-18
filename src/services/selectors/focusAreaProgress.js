/**
 * focusAreaProgress.js — live drill evidence for Focus Area cards.
 *
 * The adaptivity audit (2026-06) found the plan "event-driven-bursty":
 * Focus Area cards froze at test-time accuracy until the NEXT full test,
 * so a student who drilled a weakness from 40% to 90% still saw a red 40%
 * card. This selector blends the test-time baseline with recent drill
 * evidence from `skillProgress` (whose per-skill `history` array is updated
 * at drill answer time) so the cards visibly respond to effort daily.
 *
 * Pure read accessor — no Firebase, no corpus imports (it is consumed by
 * adaptivePlanService, which lives in the guarded main chunk).
 *
 * "Recent" means: history entries stamped AFTER the most recent full-test
 * attempt, plus a grace window. The grace window matters because the
 * full-test completion path (PracticeTest.jsx) folds the test's own answers
 * into skillProgress sequentially right after `completedAt` is stamped —
 * without the grace, the last test's own misses would masquerade as "drill
 * evidence since the test".
 */

/** Mastery gate: recent drill accuracy must reach this percentage. */
export const MASTERY_ACCURACY_THRESHOLD = 85;
/** Mastery gate: at least this many recent drill attempts (history caps at 10). */
export const MASTERY_MIN_RECENT_ATTEMPTS = 10;
/** Minimum recent attempts before drill accuracy is shown/trusted at all. */
export const DRILL_SIGNAL_MIN_ATTEMPTS = 3;
/** History entries within this window after the last test are treated as
 *  the test's own skill writes, not drill work. */
export const TEST_WRITE_GRACE_MS = 5 * 60 * 1000;

export function toMillis(ts) {
  if (!ts) return null;
  if (typeof ts === 'number') return ts;
  if (ts instanceof Date) return ts.getTime();
  if (typeof ts === 'object') {
    if (typeof ts.toMillis === 'function') return ts.toMillis();
    if (typeof ts.seconds === 'number') return ts.seconds * 1000;
  }
  if (typeof ts === 'string') {
    const t = Date.parse(ts);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}

/**
 * Timestamp (ms) of the most recent full-test attempt, or null when the
 * student has no recorded attempts. Used as the "since" cutoff for drill
 * evidence.
 *
 * @param {Object<string, {attempts?: Array<{completedAt:any}>, lastAttemptAt?:any}>} practiceTestResults
 * @returns {number | null}
 */
export function getLastTestMs(practiceTestResults) {
  if (!practiceTestResults || typeof practiceTestResults !== 'object') return null;
  let best = null;
  for (const row of Object.values(practiceTestResults)) {
    const attempts = (row && Array.isArray(row.attempts)) ? row.attempts : [];
    for (const a of attempts) {
      const ms = toMillis(a && a.completedAt);
      if (ms !== null && (best === null || ms > best)) best = ms;
    }
    if (attempts.length === 0) {
      const ms = toMillis(row && row.lastAttemptAt);
      if (ms !== null && (best === null || ms > best)) best = ms;
    }
  }
  return best;
}

/**
 * Recent drill stats for one skillProgress record: attempts/correct/accuracy
 * over history entries stamped after the last test (+ grace window). When
 * there is no test on record, ALL history counts (it is all practice work).
 *
 * @param {{history?: Array<{correct: boolean, timestamp: number}>}|null|undefined} skillRecord
 * @param {number|null} lastTestMs  cutoff from getLastTestMs
 * @returns {{ attempts: number, correct: number, accuracy: number } | null}
 *   null when no recent entries exist.
 */
export function getRecentDrillStats(skillRecord, lastTestMs) {
  const history = (skillRecord && Array.isArray(skillRecord.history)) ? skillRecord.history : [];
  if (history.length === 0) return null;
  const cutoff = (typeof lastTestMs === 'number') ? lastTestMs + TEST_WRITE_GRACE_MS : null;
  const recent = history.filter(h =>
    h && typeof h.timestamp === 'number' && (cutoff === null || h.timestamp > cutoff)
  );
  if (recent.length === 0) return null;
  const correct = recent.filter(h => h.correct).length;
  return {
    attempts: recent.length,
    correct,
    accuracy: Math.round((correct / recent.length) * 100),
  };
}

/**
 * True when recent drill evidence crosses the retirement threshold
 * (>= MASTERY_ACCURACY_THRESHOLD over >= MASTERY_MIN_RECENT_ATTEMPTS).
 *
 * @param {{attempts: number, accuracy: number}|null} stats  from getRecentDrillStats
 * @returns {boolean}
 */
export function isMasteredInPractice(stats) {
  return !!stats
    && stats.attempts >= MASTERY_MIN_RECENT_ATTEMPTS
    && stats.accuracy >= MASTERY_ACCURACY_THRESHOLD;
}

// Sort rank for the adaptive-overlay delta classification: declined skills
// rise, improved skills sink (the engine's call beats stale plan priority).
const DELTA_RANK = { declined: 0, stagnant: 1, new: 1, improved: 2 };

function buildAdaptiveLine(delta, currentAccuracy, baselineAccuracy) {
  // Narrative only (diagnostic voice — no tips). Render only the deltas a
  // student can act on emotionally: a slide or a climb.
  if (currentAccuracy === null || currentAccuracy === undefined) return null;
  if (delta === 'declined') {
    return typeof baselineAccuracy === 'number'
      ? `Slipping since your last test — recent work has this at ${currentAccuracy}%, down from ${baselineAccuracy}%.`
      : `Slipping since your last test — recent work has this at ${currentAccuracy}%.`;
  }
  if (delta === 'improved') {
    return `Improving since your last test — recent work has this at ${currentAccuracy}%.`;
  }
  return null;
}

/**
 * Annotate + re-order the study plan's weaknesses with live drill evidence
 * and the reprioritization engine's classifications.
 *
 * Each returned row is the original weakness plus:
 *   - `drillStats`        {attempts, correct, accuracy} | null  (recent drills)
 *   - `hasDrillSignal`    drillStats exists with >= DRILL_SIGNAL_MIN_ATTEMPTS
 *   - `isMastered`        retirement threshold crossed (card goes green)
 *   - `displayAccuracy`   the live signal: drill accuracy when trusted, else
 *                          the test-time baseline (drives the bar/severity)
 *   - `delta`             'improved'|'declined'|'stagnant'|'new'|null from overlay
 *   - `adaptiveLine`      small editorial sentence for improved/declined cards
 *
 * Ordering: active cards first — declined skills rise above stagnant, improved
 * sink below (overlay classification beats stale plan priority); ties keep the
 * caller's order (which already encodes test priority + prediction boost).
 * Mastered cards always drop to the bottom. The weakness is NEVER removed —
 * the next full test (diagnosticEngine) remains the arbiter.
 *
 * @param {object} args
 * @param {Array}  args.weaknesses           drill-shape weaknesses (plan order)
 * @param {Object} [args.skillProgress]      per-skill attempts/correct/history
 * @param {Object} [args.practiceTestResults] for the last-test cutoff
 * @param {object|null} [args.overlay]       adaptiveOverlay from reprioritizePlan
 * @returns {Array} annotated weaknesses, re-ordered
 */
export function annotateFocusAreas({ weaknesses, skillProgress, practiceTestResults, overlay, sinceMs = null } = {}) {
  const list = Array.isArray(weaknesses) ? weaknesses : [];
  if (list.length === 0) return [];

  // Drill signal = practice done since the LAST MEASUREMENT. practiceTestResults
  // alone missed the mini-diagnostic, whose skillProgress seeding then read as
  // "drill evidence" and fabricated day-one session progress on a brand-new
  // plan (founder-flagged). Callers pass the plan's generatedAt as sinceMs —
  // anything at/before the plan's birth is measurement-seeded, not drilling.
  const lastTestMs = Math.max(getLastTestMs(practiceTestResults) ?? 0, sinceMs ?? 0) || null;
  const overlayBySkill = {};
  if (overlay && Array.isArray(overlay.focusSkills)) {
    overlay.focusSkills.forEach(s => {
      if (s && s.skillId) overlayBySkill[s.skillId] = s;
    });
  }

  const annotated = list.map((w, originalIndex) => {
    const record = (skillProgress && w && w.skillId) ? skillProgress[w.skillId] : null;
    const drillStats = getRecentDrillStats(record, lastTestMs);
    const hasDrillSignal = !!drillStats && drillStats.attempts >= DRILL_SIGNAL_MIN_ATTEMPTS;
    const mastered = isMasteredInPractice(drillStats);
    const o = (w && w.skillId && overlayBySkill[w.skillId]) || null;
    const delta = o ? o.delta : null;
    const currentAccuracy = o && typeof o.currentAccuracy === 'number'
      ? o.currentAccuracy
      : (hasDrillSignal ? drillStats.accuracy : null);
    return {
      ...w,
      originalIndex,
      drillStats,
      hasDrillSignal,
      isMastered: mastered,
      displayAccuracy: hasDrillSignal ? drillStats.accuracy : (typeof w.accuracy === 'number' ? w.accuracy : null),
      delta,
      adaptiveLine: mastered ? null : buildAdaptiveLine(delta, currentAccuracy, typeof w.accuracy === 'number' ? w.accuracy : null),
    };
  });

  return annotated.sort((a, b) => {
    if (a.isMastered !== b.isMastered) return a.isMastered ? 1 : -1;
    const ra = DELTA_RANK[a.delta] ?? 1;
    const rb = DELTA_RANK[b.delta] ?? 1;
    if (ra !== rb) return ra - rb;
    return a.originalIndex - b.originalIndex;
  });
}
