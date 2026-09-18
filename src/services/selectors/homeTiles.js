/**
 * homeTiles.js — data for the three colorful Performance-snapshot tiles on
 * Home (founder 2026-08-24):
 *
 *   orange  → OVERALL ACCURACY   correct ÷ answered across the diagnostic and
 *                                 every scored practice test (never drills —
 *                                 there's no clean per-question drill record,
 *                                 see performanceTiles.js for the history)
 *   green   → CONSISTENCY        days practiced out of the last 7, plus the
 *                                 daily-review streak
 *   purple  → PACING             questions answered OFF a healthy pace for
 *                                 their difficulty (engine thresholds)
 *
 * Pure selector. Only accuracy is a percentage (it carries its counts so
 * "78%" always reads as "31 of 40"); consistency and pacing are plain counts
 * with a unit — founder 2026-08-29: "0%" for days practiced and "83%" for
 * pacing read as scores, not as what they measure. The tile DESIGN is
 * protected — this module only decides what the numbers mean.
 */
import { isScoreableAttempt } from './latestTestStats';
import { getSessionAdherence } from './sessionAdherence';
import { buildPacingTelemetry } from './pacingTelemetry';

/**
 * Same thresholds as diagnosticEngine's categorizeTimeForDifficulty (not
 * imported: the engine is bundle-guarded out of the main chunk). Seconds.
 */
export const PACE_THRESHOLDS = {
  easy: { fast: 30, normal: 90 },
  medium: { fast: 45, normal: 150 },
  hard: { fast: 60, normal: 210 },
};

/**
 * Classify one question's time against its difficulty.
 * @param {number} timeSpent seconds
 * @param {string|null} difficulty
 * @returns {'rushed'|'normal'|'slow'}
 */
export function classifyPace(timeSpent, difficulty) {
  const t = PACE_THRESHOLDS[difficulty] || PACE_THRESHOLDS.medium;
  const s = Number.isFinite(timeSpent) ? timeSpent : 0;
  if (s < t.fast) return 'rushed';
  if (s <= t.normal) return 'normal';
  return 'slow';
}

/**
 * Fold per-question timing into pace counts.
 * @param {Array<{timeSpent:number, difficulty?:string|null}>} items
 * @returns {{ total:number, onPace:number, rushed:number, slow:number, avgSeconds:number }|null}
 */
export function summarizePace(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (list.length === 0) return null;
  let onPace = 0;
  let rushed = 0;
  let slow = 0;
  let seconds = 0;
  list.forEach((q) => {
    const c = classifyPace(q.timeSpent, q.difficulty);
    if (c === 'normal') onPace += 1; else if (c === 'rushed') rushed += 1; else slow += 1;
    seconds += Number.isFinite(q.timeSpent) ? q.timeSpent : 0;
  });
  return { total: list.length, onPace, rushed, slow, avgSeconds: Math.round(seconds / list.length) };
}

const pct = (n, d) => (d > 0 ? Math.round((n / d) * 100) : 0);

function paceName(p) {
  if (!p) return null;
  const share = pct(p.onPace, p.total);
  if (share >= 80) return 'Healthy pace';
  if (share >= 60) return 'Mostly on pace';
  return p.rushed > p.slow ? 'Rushing' : 'Running slow';
}

/**
 * @param {object} args
 * @param {object|null} [args.miniDiagnostic]      progress.miniDiagnostic record
 * @param {object} [args.practiceTestResults]      keyed by testId
 * @param {object} [args.practiceProgress]
 * @param {string[]} [args.drillDays]
 * @param {{current?:number}|null} [args.reviewStreak]
 * @param {object|null} [args.studyPlan]           plan mirror (legacy pacing fallback)
 * @param {Date} [args.now]
 * @returns {{
 *   hasData: boolean, sourceLabel: string,
 *   accuracy: {percent:number, correct:number, total:number, detail:string}|null,
 *   consistency: {percent:number, uniqueDays:number, totalDays:number, streak:number, name:string, detail:string},
 *   pacing: {percent:number, name:string, detail:string, source:string}|null
 * }}
 */
export function buildHomeTiles({
  miniDiagnostic = null,
  practiceTestResults = {},
  practiceProgress = {},
  drillDays = [],
  reviewStreak = null,
  studyPlan = null,
  now = new Date(),
} = {}) {
  // ── Overall accuracy: diagnostic + every scored practice-test attempt ──
  let correct = 0;
  let total = 0;
  let testCount = 0;
  Object.values(practiceTestResults || {}).forEach((t) => {
    (t?.attempts || []).forEach((a) => {
      if (!isScoreableAttempt(a)) return;
      if (typeof a.rawScore !== 'number' || typeof a.totalQuestions !== 'number' || a.totalQuestions <= 0) return;
      correct += a.rawScore;
      total += a.totalQuestions;
      testCount += 1;
    });
  });
  let diagCorrect = 0;
  let diagTotal = 0;
  const domains = miniDiagnostic?.domains;
  if (domains && typeof domains === 'object') {
    ['rw', 'math'].forEach((sec) => {
      Object.values(domains[sec] || {}).forEach((d) => {
        if (!d || typeof d.total !== 'number' || d.total <= 0) return;
        diagTotal += d.total;
        diagCorrect += typeof d.correct === 'number' ? d.correct : 0;
      });
    });
  }
  const hasDiag = diagTotal > 0;
  correct += diagCorrect;
  total += diagTotal;

  let sourceText = '';
  let sourceLabel = '';
  if (hasDiag && testCount > 0) {
    sourceText = `your diagnostic + ${testCount} practice test${testCount === 1 ? '' : 's'}`;
    sourceLabel = 'Diagnostic + practice tests';
  } else if (testCount > 0) {
    sourceText = testCount === 1 ? 'your practice test' : `${testCount} practice tests`;
    sourceLabel = testCount === 1 ? 'Your practice test' : 'All practice tests';
  } else if (hasDiag) {
    sourceText = 'your diagnostic';
    sourceLabel = 'Your diagnostic';
  }
  const accuracy = total > 0
    ? { percent: pct(correct, total), correct, total, detail: `${correct} of ${total} correct · ${sourceText}` }
    : null;

  // ── Consistency: days practiced in the last 7 + review streak ──
  const adherence = getSessionAdherence({ practiceProgress, practiceTestResults, drillDays }, { now });
  const streak = Number.isFinite(reviewStreak?.current) ? reviewStreak.current : 0;
  // Big figure: the day count with its unit ("3 days"), never a percent —
  // the name supplies the window so the tile reads "3 days · in the last 7
  // days".
  const consistency = {
    value: adherence.uniqueDays,
    unit: adherence.uniqueDays === 1 ? 'day' : 'days',
    uniqueDays: adherence.uniqueDays,
    totalDays: adherence.totalDays,
    streak,
    name: `In the last ${adherence.totalDays} days`,
    detail: streak > 0
      ? `${streak}-day review streak`
      : (adherence.uniqueDays > 0 ? 'No review streak yet' : 'Practice today to start a streak'),
  };

  // ── Pacing: latest test telemetry → diagnostic's lean pace summary →
  //    legacy time-pressure fallback ──
  let pacing = null;
  const telemetry = buildPacingTelemetry(practiceTestResults);
  const fromTest = summarizePace(telemetry);
  const diagPace = miniDiagnostic?.diagnosis?.pacing;
  // Big figure: how many questions were answered OFF a healthy pace (rushed
  // or slow) — lower is better; the name ("Mostly on pace") gives the read
  // and the detail gives the split.
  if (fromTest) {
    pacing = {
      value: fromTest.rushed + fromTest.slow,
      unit: 'off pace',
      name: paceName(fromTest),
      detail: `${fromTest.onPace} of ${fromTest.total} at a healthy pace · ${fromTest.rushed} rushed · ${fromTest.slow} slow`,
      source: 'test',
    };
  } else if (diagPace && Number.isFinite(diagPace.total) && diagPace.total > 0) {
    pacing = {
      value: (diagPace.rushed || 0) + (diagPace.slow || 0),
      unit: 'off pace',
      name: paceName(diagPace),
      detail: `${diagPace.onPace || 0} of ${diagPace.total} at a healthy pace · ${diagPace.rushed || 0} rushed · ${diagPace.slow || 0} slow`,
      source: 'diagnostic',
    };
  } else if (hasDiag) {
    // Records from before the pace summary existed: the only timing signal
    // that survived is the plan's error breakdown (misses under time pressure).
    const breakdown = Array.isArray(studyPlan?.summary?.errorBreakdown) ? studyPlan.summary.errorBreakdown : [];
    const tp = breakdown.find((e) => e?.type === 'time_pressure');
    const tpCount = Number.isFinite(tp?.count) ? tp.count : null;
    if (tpCount !== null) {
      const answered = miniDiagnostic?.answeredCount || diagTotal;
      pacing = {
        value: tpCount,
        unit: 'off pace',
        name: tpCount === 0 ? 'Healthy pace' : tpCount >= answered * 0.2 ? 'Rushing' : 'Mostly on pace',
        detail: tpCount === 0
          ? `No misses under time pressure · ${sourceText}`
          : `${tpCount} miss${tpCount === 1 ? '' : 'es'} under time pressure · ${sourceText}`,
        source: 'legacy',
      };
    }
  }

  return { hasData: !!accuracy, sourceLabel, accuracy, consistency, pacing };
}
