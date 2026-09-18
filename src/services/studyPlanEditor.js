/**
 * studyPlanEditor — pure transforms for student-initiated study-plan edits.
 *
 * Every function takes a `plan` (the generated study-plan object) plus edit
 * args and returns a NEW plan (immutable; the input is never mutated). Keeping
 * these pure makes them unit-testable and keeps mutation logic out of React /
 * the persistence layer (`useProgress.saveEditedStudyPlan` writes whatever
 * these return).
 *
 * Edits live on the current plan and are persisted to the Firestore artifact,
 * exactly like the existing `completed` flag. A new practice test still
 * regenerates a fresh plan (a new test == a new plan) — surviving edits across
 * regeneration is a deliberate non-goal for v1.
 *
 * Conventions added to activities by these edits:
 *   - `skipped: boolean`    — student set the task aside (kept, but excluded
 *                             from "today"/counts; see selectors/todaySlice).
 *   - `custom: boolean`     — a student-added task (no drill to launch).
 *   - `userEdited: boolean` — touched by any manual edit (drives a subtle
 *                             "edited" affordance and future regen-survival).
 */

const DAY_ORDER = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

/** Deep clone matching the codebase convention (plans are plain JSON). */
function clone(plan) {
  return JSON.parse(JSON.stringify(plan));
}

/** Guard: is this a valid (weekIndex, activityIndex) into the plan? */
function hasActivity(plan, weekIndex, activityIndex) {
  return !!plan?.weeks?.[weekIndex]?.activities?.[activityIndex];
}

/**
 * Recompute a week's rollup stats (totalMinutes + activity-type counts) from
 * its current activities so any structural edit keeps them consistent with the
 * generator's original fields. Skipped activities are excluded — matching the
 * plan's "skipped == kept but excluded from counts" convention (and the
 * totalMinutes math setPacing already used). Mutates `week` in place.
 *
 * @param {object} week - a plan week ({ activities: [] })
 * @returns {void}
 */
function recomputeWeekStats(week) {
  if (!week) return;
  const active = (week.activities || []).filter((a) => !a.skipped);
  week.totalMinutes = active.reduce(
    (sum, a) => sum + (Number.isFinite(a.duration) ? a.duration : 0),
    0,
  );
  week.practiceCount = active.filter((a) => a.type === 'practice').length;
  week.lessonCount = active.filter((a) => a.type === 'lesson').length;
  week.strategyCount = active.filter(
    (a) => a.type === 'strategy' || a.type === 'review',
  ).length;
}

/**
 * Move an activity to a different day of its week.
 * @param {object} plan
 * @param {number} weekIndex
 * @param {number} activityIndex
 * @param {string} newDay - one of Monday..Sunday
 * @returns {object} new plan (unchanged if args are invalid)
 */
export function rescheduleActivity(plan, weekIndex, activityIndex, newDay) {
  if (!hasActivity(plan, weekIndex, activityIndex) || !DAY_ORDER.includes(newDay)) {
    return plan;
  }
  const next = clone(plan);
  const act = next.weeks[weekIndex].activities[activityIndex];
  act.day = newDay;
  act.userEdited = true;
  return next;
}

/**
 * Skip (or un-skip) an activity. Skipped activities stay in the plan but are
 * excluded from the day slice and progress counts.
 * @returns {object} new plan
 */
export function setActivitySkipped(plan, weekIndex, activityIndex, skipped) {
  if (!hasActivity(plan, weekIndex, activityIndex)) return plan;
  const next = clone(plan);
  const act = next.weeks[weekIndex].activities[activityIndex];
  act.skipped = !!skipped;
  act.userEdited = true;
  recomputeWeekStats(next.weeks[weekIndex]);
  return next;
}

/**
 * Remove an activity from its week.
 * @returns {object} new plan
 */
// The edits ledger: student intent that must survive regeneration. The
// generator replays it — removed/de-focused skills stay suppressed (unless
// the newest test shows them regressing), custom tasks come back. Entries
// carry only defined fields (Firestore rejects undefined).
function appendEdit(next, entry) {
  if (!Array.isArray(next.planEdits)) next.planEdits = [];
  const cleaned = {};
  Object.entries(entry).forEach(([k, v]) => { if (v !== undefined) cleaned[k] = v; });
  next.planEdits.push({ ...cleaned, at: new Date().toISOString() });
}

export function removeActivity(plan, weekIndex, activityIndex) {
  if (!hasActivity(plan, weekIndex, activityIndex)) return plan;
  const next = clone(plan);
  const [removed] = next.weeks[weekIndex].activities.splice(activityIndex, 1);
  if (removed?.custom) {
    // Removing a custom task also retires its ledger entry so it stops
    // being replayed into future regenerations.
    next.planEdits = (next.planEdits || []).filter(
      (e) => !(e.type === 'custom' && e.task?.title === removed.title),
    );
  } else if (removed?.type === 'practice' && removed.skillId) {
    const w = (next.weaknesses || []).find((x) => x.skillId === removed.skillId);
    appendEdit(next, {
      type: 'remove',
      skillId: removed.skillId,
      accuracyAtEdit: Number.isFinite(w?.accuracy) ? w.accuracy : undefined,
    });
  }
  recomputeWeekStats(next.weeks[weekIndex]);
  return next;
}

/**
 * Append a student-authored task to a week. Custom tasks are checklist items —
 * they have no drill to launch, only a complete/skip/remove lifecycle.
 * @param {object} plan
 * @param {number} weekIndex
 * @param {{title:string, day?:string, duration?:number, section?:string}} task
 * @returns {object} new plan (unchanged if title is blank or week is invalid)
 */
export function addCustomActivity(plan, weekIndex, task) {
  const title = (task?.title || '').trim();
  if (!plan?.weeks?.[weekIndex] || !title) return plan;
  const next = clone(plan);
  const day = DAY_ORDER.includes(task.day) ? task.day : 'Monday';
  const duration = Number.isFinite(task.duration) && task.duration > 0
    ? Math.round(task.duration)
    : 20;
  if (!Array.isArray(next.weeks[weekIndex].activities)) {
    next.weeks[weekIndex].activities = [];
  }
  next.weeks[weekIndex].activities.push({
    type: 'custom',
    activityType: 'customTask',
    title,
    subtitle: 'Your task',
    duration,
    priority: 0,
    day,
    weekPhase: 'mid',
    section: task.section === 'rw' ? 'rw' : undefined,
    custom: true,
    userEdited: true,
  });
  appendEdit(next, {
    type: 'custom',
    task: { title, day, duration, ...(task.section === 'rw' ? { section: 'rw' } : {}) },
  });
  recomputeWeekStats(next.weeks[weekIndex]);
  return next;
}

/**
 * Replace the focus-area (weaknesses) list. Reconciles activities: practice
 * activities whose `skillId` was explicitly de-focused (dropped from the
 * previous focus set) are removed (unless completed), and any newly-added
 * focus skill gets one practice activity in the first week so the plan
 * actually reflects the new focus. Activities for skills that were never
 * focus areas (weekly work beyond the 8-weakness cap), custom tasks and
 * non-practice activities are never touched.
 *
 * @param {object} plan
 * @param {Array<object>} nextWeaknesses - the new weaknesses[] (drill-shape)
 * @returns {object} new plan (unchanged if nextWeaknesses is empty/invalid)
 */
export function setFocusAreas(plan, nextWeaknesses) {
  if (!plan || !Array.isArray(nextWeaknesses) || nextWeaknesses.length === 0) {
    return plan;
  }
  const next = clone(plan);
  const prevSkillIds = new Set((next.weaknesses || []).map((w) => w.skillId));
  const nextSkillIds = new Set(nextWeaknesses.map((w) => w.skillId));
  // Ledger: an explicit de-focus is durable student intent.
  (next.weaknesses || []).forEach((w) => {
    if (w.skillId && !nextSkillIds.has(w.skillId)) {
      appendEdit(next, {
        type: 'defocus',
        skillId: w.skillId,
        accuracyAtEdit: Number.isFinite(w.accuracy) ? w.accuracy : undefined,
      });
    }
  });
  next.weaknesses = nextWeaknesses.map((w) => ({ ...w }));

  // Drop generated practice activities ONLY for explicitly de-focused skills
  // (in the previous focus set but not the new one). plan.weaknesses is capped
  // at 8 while weekly activities are generated from UNCAPPED skill gaps, so
  // filtering on membership in the new set alone silently deleted scheduled
  // tasks for beyond-the-cap skills on every edit — even a pure add. Keep
  // completed work and anything the student customized or added.
  (next.weeks || []).forEach((week) => {
    week.activities = (week.activities || []).filter((act) => {
      const isGeneratedPractice = act.type === 'practice' && !act.custom && !act.completed;
      if (isGeneratedPractice && act.skillId
        && prevSkillIds.has(act.skillId) && !nextSkillIds.has(act.skillId)) {
        return false;
      }
      return true;
    });
  });

  // Add a practice activity for each newly-focused skill (first week).
  const added = nextWeaknesses.filter((w) => w.skillId && !prevSkillIds.has(w.skillId));
  if (added.length && next.weeks?.[0]) {
    added.forEach((w) => {
      next.weeks[0].activities.push({
        type: 'practice',
        activityType: 'practiceSection',
        title: `Practice: ${w.skill}`,
        subtitle: w.skill,
        duration: 20,
        priority: 5,
        skillId: w.skillId,
        skillName: w.skill,
        section: w.section === 'rw' ? 'rw' : 'math',
        day: 'Monday',
        weekPhase: 'start',
        userEdited: true,
      });
    });
  }
  return next;
}

/**
 * Compute the intensity label for a given minutes/day, matching the generator's
 * bands closely enough for display.
 */
export function intensityForMinutes(minutesPerDay) {
  if (minutesPerDay <= 20) return 'light';
  if (minutesPerDay <= 35) return 'moderate';
  if (minutesPerDay <= 55) return 'focused';
  if (minutesPerDay <= 80) return 'intensive';
  return 'marathon';
}

/**
 * Greedily re-bin a week's active (non-completed, non-skipped) activities across
 * the calendar so each day's total duration stays near `minutesPerDay`. Fills
 * Monday → Sunday, opening a new day when the current one is full, so a smaller
 * minutes/day naturally spreads work across more days. Completed and skipped
 * activities keep their existing day.
 */
function redistributeWeek(week, minutesPerDay, dayOrder = DAY_ORDER) {
  const cap = Math.max(10, minutesPerDay);
  const days = dayOrder.length > 0 ? dayOrder : DAY_ORDER;
  const active = (week.activities || []).filter((a) => !a.completed && !a.skipped);
  let dayIdx = 0;
  let dayTotal = 0;
  active.forEach((act) => {
    const dur = Number.isFinite(act.duration) ? act.duration : 20;
    if (dayTotal > 0 && dayTotal + dur > cap && dayIdx < days.length - 1) {
      dayIdx += 1;
      dayTotal = 0;
    }
    act.day = days[dayIdx];
    dayTotal += dur;
  });
}

/**
 * Apply a pacing change: new minutes/day and/or exam date. Updates the plan's
 * displayed stats + intensity, re-bins each week's activities to the new daily
 * load, and records the choice in `plan.userPrefs`. `todayISO` is passed in
 * (not read from the clock) so the transform stays pure/testable.
 *
 * @param {object} plan
 * @param {{minutesPerDay?:number, examDate?:string|null}} prefs
 * @param {string} todayISO - YYYY-MM-DD for computing daysUntilTest
 * @returns {object} new plan
 */
export function setPacing(plan, prefs, todayISO) {
  if (!plan) return plan;
  const next = clone(plan);
  const minutesPerDay = Number.isFinite(prefs?.minutesPerDay) && prefs.minutesPerDay > 0
    ? Math.round(prefs.minutesPerDay)
    : (next.summary?.stats?.minutesPerDay || next.intensityConfig?.minutesPerDay || 30);

  next.userPrefs = {
    ...(next.userPrefs || {}),
    minutesPerDay,
    examDate: prefs?.examDate ?? next.userPrefs?.examDate ?? next.examDate ?? null,
    edited: true,
  };
  next.intensity = intensityForMinutes(minutesPerDay);
  if (next.intensityConfig) next.intensityConfig.minutesPerDay = minutesPerDay;
  if (next.summary?.stats) {
    next.summary.stats.minutesPerDay = minutesPerDay;
    next.summary.stats.intensity = next.intensity;
  }

  if (prefs?.examDate) {
    next.examDate = prefs.examDate;
    if (todayISO) {
      const days = Math.round(
        (Date.parse(prefs.examDate) - Date.parse(todayISO)) / 86400000
      );
      if (Number.isFinite(days)) {
        next.daysUntilTest = Math.max(0, days);
        if (next.summary?.stats) next.summary.stats.daysUntilTest = Math.max(0, days);
      }
    }
  }

  // Pacing edits keep the student's day selection: update each enabled day's
  // minutes and re-bin within those days only.
  if (next.schedule?.days) {
    const enabled = DAY_ORDER.filter((d) => (next.schedule.days[d] || 0) > 0);
    enabled.forEach((d) => { next.schedule.days[d] = minutesPerDay; });
    next.userPrefs.schedule = { days: { ...next.schedule.days }, sessionCapMinutes: next.schedule.sessionCapMinutes ?? null, edited: next.schedule.source === 'edited' || next.userPrefs.schedule?.edited || false };
    (next.weeks || []).forEach((week) => {
      redistributeWeek(week, minutesPerDay, enabled);
      recomputeWeekStats(week);
    });
    return next;
  }

  (next.weeks || []).forEach((week) => {
    redistributeWeek(week, minutesPerDay);
    recomputeWeekStats(week);
  });

  return next;
}

/**
 * Apply a schedule change: which days of the week hold study sessions. Writes
 * the day map to plan.schedule AND plan.userPrefs.schedule (edited: true) so
 * the choice survives regeneration, then re-bins every week onto the enabled
 * days. Minimum two enabled days — a one-day plan can't hold a week's work.
 *
 * @param {object} plan
 * @param {Object<string,number>} days - {Monday: minutes|0, ...} (0 = off day)
 * @returns {object} new plan (or the original when the edit is invalid)
 */
export function setSchedule(plan, days) {
  if (!plan || !days) return plan;
  const enabled = DAY_ORDER.filter((d) => Number.isFinite(days[d]) && days[d] > 0);
  if (enabled.length < 2) return plan;

  const next = clone(plan);
  const normalized = {};
  DAY_ORDER.forEach((d) => {
    normalized[d] = Number.isFinite(days[d]) && days[d] > 0 ? Math.round(days[d]) : 0;
  });

  next.schedule = {
    days: normalized,
    sessionCapMinutes: next.schedule?.sessionCapMinutes ?? null,
    source: 'edited',
  };
  next.userPrefs = {
    ...(next.userPrefs || {}),
    schedule: { days: { ...normalized }, sessionCapMinutes: next.schedule.sessionCapMinutes, edited: true },
    edited: true,
  };
  if (next.intensityConfig) next.intensityConfig.daysPerWeek = enabled.length;

  const minutesPerDay = next.userPrefs?.minutesPerDay
    || next.intensityConfig?.minutesPerDay
    || Math.max(...enabled.map((d) => normalized[d]));
  (next.weeks || []).forEach((week) => {
    redistributeWeek(week, minutesPerDay, enabled);
    recomputeWeekStats(week);
  });

  return next;
}

export const __testing = { DAY_ORDER, redistributeWeek };
