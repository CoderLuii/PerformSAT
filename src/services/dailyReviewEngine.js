/**
 * Daily Review Engine
 *
 * Promotes spaced-repetition review from a background queue into a
 * first-class daily loop. Consumes the existing reviewService data and
 * produces a structured "today's session" with priority ordering,
 * streak tracking, and post-session summary logic.
 */

const MAX_DAILY_ITEMS = 15;

/**
 * Categorise due items by urgency so the UI can colour-code them.
 *   overdue  — past due by > 1 day
 *   due      — due today
 *   upcoming — due within the next 24 h (preview)
 */
export const categorizeDueItems = (reviewQueue = {}) => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const overdue = [];
  const dueToday = [];
  const upcoming = [];

  Object.entries(reviewQueue).forEach(([key, item]) => {
    const nextReview = new Date(item.nextReviewDate);
    const enriched = { key, ...item };

    if (nextReview < now) {
      const daysOverdue = Math.floor((now - nextReview) / (1000 * 60 * 60 * 24));
      enriched.daysOverdue = daysOverdue;
      if (daysOverdue >= 1) {
        overdue.push(enriched);
      } else {
        dueToday.push(enriched);
      }
    } else if (nextReview <= tomorrow) {
      upcoming.push(enriched);
    }
  });

  overdue.sort((a, b) => b.wrongCount - a.wrongCount);
  dueToday.sort((a, b) => b.wrongCount - a.wrongCount);

  return { overdue, dueToday, upcoming };
};

/**
 * Build a single ordered session of review items, capped at MAX_DAILY_ITEMS.
 * Priority: overdue first (most-missed at top), then dueToday.
 */
export const buildDailySession = (reviewQueue = {}) => {
  const { overdue, dueToday } = categorizeDueItems(reviewQueue);
  const pool = [...overdue, ...dueToday];
  const session = pool.slice(0, MAX_DAILY_ITEMS);

  return {
    items: session,
    totalDue: pool.length,
    sessionSize: session.length,
    hasMore: pool.length > MAX_DAILY_ITEMS,
    estimatedMinutes: Math.max(1, Math.ceil(session.length * 1.5)),
  };
};

/**
 * Compute a daily review "streak" from the history of review sessions
 * stored in localStorage (lightweight, no Firestore round-trip).
 *
 * The streak is now UID-SCOPED so two accounts sharing a device (a tutor + a
 * student, siblings, a library machine) don't inherit each other's streak. The
 * active uid is set via setReviewStreakUser (wired from useAuth on every auth
 * transition) rather than threaded through every call site — getReviewStreak /
 * recordReviewSessionComplete / buildSessionSummary keep their existing
 * signatures, so their callers (DailyReviewCard, StudyPlanDashboard,
 * sessionComplete) are untouched.
 */
const LEGACY_STREAK_KEY = 'performsat_review_streak';

// Set by useAuth's onAuthStateChanged. null → anonymous (falls back to the
// legacy unscoped key, so a signed-out visitor still gets a working streak).
let streakUid = null;

/**
 * Point the streak store at a specific user (or null for anonymous). Called
 * from useAuth on login/logout/account-switch so subsequent reads and writes
 * land under a per-uid localStorage key.
 * @param {string|null} uid
 */
export const setReviewStreakUser = (uid) => {
  streakUid = uid || null;
};

const streakKey = () =>
  streakUid ? `${LEGACY_STREAK_KEY}_${streakUid}` : LEGACY_STREAK_KEY;

// LOCAL-day key (YYYY-MM-DD, zero-padded — same format as practicedDays.js'
// localDateKey). Streak days must follow the student's calendar: the old
// UTC key (`toISOString().slice(0, 10)`) rolled the day boundary hours early
// for US-evening reviewers, wrongly resetting (or no-oping) their streaks.
// Stored lastDate values keep the identical YYYY-MM-DD format.
const localDayKey = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const getReviewStreak = () => {
  const key = streakKey();
  try {
    let raw = localStorage.getItem(key);
    // One-time migration: a signed-in user whose uid-scoped key has never been
    // written inherits the pre-scoping unscoped streak once, so an existing
    // single-account device keeps its history the first time it upgrades.
    if (raw == null && streakUid) {
      const legacy = localStorage.getItem(LEGACY_STREAK_KEY);
      if (legacy != null) {
        try { localStorage.setItem(key, legacy); } catch { /* noop */ }
        raw = legacy;
      }
    }
    if (!raw) return { current: 0, best: 0, lastDate: null };
    return JSON.parse(raw);
  } catch {
    return { current: 0, best: 0, lastDate: null };
  }
};

/**
 * Increment the daily review streak (no-op on a same-day repeat).
 *
 * @param {{ current: number, best: number, lastDate: string|null }|null}
 *   [serverStreak] - the Firestore-hydrated streak (progress.reviewStreak).
 *   localStorage is per-device: without this seed a fresh device computes
 *   streak 1 and the caller persists it server-side, wiping a long streak.
 *   When the server state is fresher (newer lastDate) or further along on
 *   the same day, it seeds the computation; `best` always merges as max.
 * @returns {{ current: number, best: number, lastDate: string }}
 */
export const recordReviewSessionComplete = (serverStreak = null) => {
  const todayStr = localDayKey(new Date());
  let streak = getReviewStreak();

  let seededFromServer = false;
  if (serverStreak && typeof serverStreak === 'object') {
    const serverLast = typeof serverStreak.lastDate === 'string' ? serverStreak.lastDate : null;
    const localLast = typeof streak.lastDate === 'string' ? streak.lastDate : null;
    // YYYY-MM-DD compares correctly as a string.
    const serverFresher = !!serverLast && (!localLast || serverLast > localLast);
    const serverFurther = !!serverLast && serverLast === localLast
      && (serverStreak.current || 0) > (streak.current || 0);
    if (serverFresher || serverFurther) {
      streak = {
        current: serverStreak.current || 0,
        best: serverStreak.best || 0,
        lastDate: serverLast,
      };
      seededFromServer = true;
    }
    const mergedBest = Math.max(streak.best || 0, serverStreak.best || 0);
    if (mergedBest !== streak.best) {
      streak = { ...streak, best: mergedBest };
      seededFromServer = true;
    }
  }

  if (streak.lastDate === todayStr) {
    // Same-day repeat: no increment, but let the device cache catch up to a
    // server-seeded value so later reads (and persists) don't regress it.
    if (seededFromServer) {
      try { localStorage.setItem(streakKey(), JSON.stringify(streak)); } catch { /* noop */ }
    }
    return streak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = localDayKey(yesterday);

  const isConsecutive = streak.lastDate === yesterdayStr;
  const newCurrent = isConsecutive ? (streak.current || 0) + 1 : 1;
  const newBest = Math.max(streak.best || 0, newCurrent);

  const updated = { current: newCurrent, best: newBest, lastDate: todayStr };
  try { localStorage.setItem(streakKey(), JSON.stringify(updated)); } catch { /* noop */ }
  return updated;
};

/**
 * Summary after a review session completes.
 *
 * @param {Array<{wasCorrect: boolean}>} [results]
 * @param {{ current: number, best: number, lastDate: string|null }|null}
 *   [serverStreak] - Firestore-hydrated streak, threaded through so a fresh
 *   device can't clobber a longer server-side streak (see
 *   recordReviewSessionComplete).
 */
export const buildSessionSummary = (results = [], serverStreak = null) => {
  const correct = results.filter(r => r.wasCorrect).length;
  const total = results.length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const streak = recordReviewSessionComplete(serverStreak);

  return {
    correct,
    total,
    accuracy,
    streak,
    message:
      accuracy >= 90 ? 'Outstanding recall — keep it up!'
      : accuracy >= 70 ? 'Solid session. A few items need another pass.'
      : 'Some concepts are slipping. We\'ll bring them back sooner.',
  };
};

