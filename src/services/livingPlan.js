/**
 * Living plan — today's tasks rebuilt from the newest evidence.
 *
 * The scheduled plan (the "spine") only changes when a test or check-in
 * regenerates it. This selector makes each DAY alive between those moments:
 *  - DROP a task whose skill the student has already proven since the last
 *    test (recent drills ≥ RECOVERED_ACCURACY over ≥ MIN_ATTEMPTS)
 *  - PULL forward a replacement drill for the weakest not-yet-scheduled focus
 *    skill (persistent weaknesses first), inside the freed minutes
 *  - SURFACE the due review-queue session alongside the day's tasks
 *
 * Pure and deterministic: same plan + same evidence → same day, so every
 * device renders the same list without server coordination. Consumers call
 * buildLivingDaySlice and fall back to the plain schedule on any error.
 */

import { getTodaySlice } from './selectors/todaySlice';
import { getLastTestMs, getRecentDrillStats, DRILL_SIGNAL_MIN_ATTEMPTS } from './selectors/focusAreaProgress';

const RECOVERED_ACCURACY = 70;

/**
 * Decide the living verdict for one skill from post-test drill evidence.
 * @returns {'recovered'|'slipping'|null} null = no strong recent signal
 */
const drillVerdict = (skillProgress, skillId, lastTestMs) => {
  if (!skillId || !skillProgress) return null;
  const stats = getRecentDrillStats(skillProgress[skillId], lastTestMs);
  if (!stats || stats.attempts < DRILL_SIGNAL_MIN_ATTEMPTS) return null;
  if (stats.accuracy >= RECOVERED_ACCURACY) return 'recovered';
  if (stats.accuracy < 50) return 'slipping';
  return null;
};

/**
 * Build today's LIVING slice: the scheduled day, minus proven skills, plus
 * pulled-forward work and the due review session.
 *
 * @param {object} plan - current study plan (schedule-aware, Phase 1)
 * @param {object} args
 * @param {string} args.todayDayName - 'Monday'..'Sunday'
 * @param {object} [args.skillProgress] - per-skill drill history (useProgress)
 * @param {object} [args.practiceTestResults] - for the last-test cutoff
 * @param {object} [args.reviewQueue] - spaced-repetition queue
 * @returns {object} slice shaped like getTodaySlice + {living} metadata
 */
export const buildLivingDaySlice = (plan, {
  todayDayName,
  skillProgress = null,
  practiceTestResults = null,
  reviewQueue = null,
} = {}) => {
  const base = getTodaySlice(plan, todayDayName);
  try {
    if (!base || !Array.isArray(base.activities) || base.activities.length === 0) {
      return attachReview(base, reviewQueue);
    }

    const lastTestMs = getLastTestMs(practiceTestResults || {});
    const dropped = [];
    const kept = [];

    base.activities.forEach((act) => {
      // Only practice work is droppable — strategy, review, tests, and the
      // student's own custom tasks always stand.
      const droppable = act.type === 'practice' && act.skillId && !act.completed && !act.userEdited;
      if (droppable && drillVerdict(skillProgress, act.skillId, lastTestMs) === 'recovered') {
        dropped.push(act);
      } else {
        kept.push(act);
      }
    });

    // Freed minutes get refilled with the weakest focus skill not already on
    // today's list — persistent/slipping first, then lowest test accuracy.
    const pulled = [];
    let freedMinutes = dropped.reduce((s, a) => s + (a.duration || 15), 0);
    if (freedMinutes > 0) {
      const onDeck = new Set(kept.map((a) => a.skillId).filter(Boolean));
      const candidates = (plan.weaknesses || [])
        .filter((w) => w.skillId && !onDeck.has(w.skillId))
        .filter((w) => drillVerdict(skillProgress, w.skillId, lastTestMs) !== 'recovered')
        .map((w) => ({
          ...w,
          _slipping: drillVerdict(skillProgress, w.skillId, lastTestMs) === 'slipping' ? 1 : 0,
        }))
        .sort((a, b) => (b._slipping - a._slipping) || ((a.accuracy ?? 100) - (b.accuracy ?? 100)));

      for (const w of candidates) {
        if (freedMinutes < 15) break;
        pulled.push({
          type: 'practice',
          activityType: 'skillDrill',
          title: `Practice: ${w.skill || w.skillName || w.skillId}`,
          subtitle: w._slipping
            ? 'Pulled forward — this skill slipped in your recent drills'
            : 'Pulled forward — your next weakest skill',
          skillId: w.skillId,
          skillName: w.skill || w.skillName || w.skillId,
          section: w.section,
          missedPatterns: w.missedPatterns || [],
          duration: 15,
          priority: 90,
          day: todayDayName,
          weekPhase: 'mid',
          living: true,
          // Mirror the base slice's index stamping contract: living additions
          // carry no weekIndex/activityIndex, and consumers must not try to
          // mark them complete inside plan.weeks (they complete via drills).
        });
        freedMinutes -= 15;
        onDeck.add(w.skillId);
      }
    }

    const slice = {
      ...base,
      activities: [...kept, ...pulled],
      living: {
        droppedSkills: dropped.map((a) => ({ skillId: a.skillId, skillName: a.skillName, title: a.title })),
        pulledSkills: pulled.map((a) => a.skillId),
        active: dropped.length > 0 || pulled.length > 0,
      },
    };
    return attachReview(slice, reviewQueue);
  } catch (err) {
    // The living layer must never break Today's Tasks — fall back to the
    // plain scheduled slice.
    return attachReview(base, reviewQueue);
  }
};

/** Attach the due review session as slice metadata (not a plan activity). */
const attachReview = (slice, reviewQueue) => {
  if (!slice) return slice;
  try {
    const session = reviewQueue ? buildReviewSession(reviewQueue) : null;
    if (session && session.sessionSize > 0) {
      return { ...slice, reviewSession: session };
    }
  } catch (err) { /* review layer is optional — never break the slice */ }
  return slice;
};

// Mirrors dailyReviewEngine.buildDailySession (due items sorted most-missed
// first, capped, ~1.5 min each) WITHOUT importing it: that module transitively
// pulls the Firestore-backed reviewService at load time, and the living slice
// must stay a pure selector. Keep the two in sync if session rules change.
const MAX_REVIEW_ITEMS = 15;
const buildReviewSession = (reviewQueue = {}) => {
  const now = Date.now();
  const due = Object.entries(reviewQueue)
    .map(([key, item]) => ({ key, ...item }))
    .filter((item) => {
      const t = Date.parse(item.nextReviewDate);
      return Number.isFinite(t) && t < now;
    })
    .sort((a, b) => (b.wrongCount || 0) - (a.wrongCount || 0));
  const items = due.slice(0, MAX_REVIEW_ITEMS);
  return {
    items,
    totalDue: due.length,
    sessionSize: items.length,
    hasMore: due.length > MAX_REVIEW_ITEMS,
    estimatedMinutes: Math.max(1, Math.ceil(items.length * 1.5)),
  };
};
