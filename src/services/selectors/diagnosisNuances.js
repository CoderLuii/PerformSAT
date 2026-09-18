/**
 * diagnosisNuances — the "but here's the catch" layer on top of a score band.
 *
 * A band and a target on their own can mislead: a student whose whole range
 * clears their goal sees "100 above target" and a full progress bar, when the
 * honest read is "your goal is too low to shape a plan." This selector turns
 * those situations into short, specific advice with a real next action
 * (raise the target, fix a past test date, take a full test), so the
 * diagnosis screen and the home card say the nuanced thing instead of the
 * hollow one.
 *
 * Pure: everything is computed from the inputs at RENDER time (never
 * persisted), so the advice tracks the student's current target and date.
 *
 * Use it wherever a band/score is shown next to a goal: MiniDiagnosticResults
 * ("Worth knowing"), the home score hero (one line, highest priority only).
 */
import { parseLocalDate } from '../../utils/localDate';
import { getUpcomingSATDates, formatSatChipLabel, getScoreReleaseDate } from '../../data/satTestDates';

/** Kinds, in priority order (most urgent first). Also drives pickHomeNuance. */
export const NUANCE_PRIORITY = [
  'test-date-passed',
  'no-target',
  'target-below-range',
  'target-inside-range',
  'gap-vs-time',
  'thin-sitting',
];

/** Kinds that speak to the target itself — the band card's plan headline
 *  ("You're past your target. Hold 1400…") is suppressed when one fires so
 *  the screen doesn't say two different things about the same goal. */
export const TARGET_NUANCE_KINDS = new Set(['no-target', 'target-below-range', 'target-inside-range']);

/** Points per day of climb (from the TOP of the range) past which the gap is
 *  flagged as steep. 6/day ≈ 180 a month; consistent daily prep usually moves
 *  a score 50–100 points a month, so anything above this is worth naming. */
const STEEP_POINTS_PER_DAY = 6;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysBetween(testDate, today) {
  const d = parseLocalDate(testDate);
  if (!d) return null;
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - t) / MS_PER_DAY);
}

function formatShortDate(dateStr) {
  const d = parseLocalDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : String(dateStr);
}

/** Next round 50 above the top of the range, capped at the 1600 ceiling. */
export function suggestRaisedTarget(bandHigh) {
  if (!Number.isFinite(bandHigh)) return null;
  return Math.min(1600, Math.ceil((bandHigh + 50) / 50) * 50);
}

/**
 * Build the nuance list for one diagnosis (or one home-card hero).
 *
 * @param {object} args
 * @param {{low:number, high:number}|null} [args.band]  composite score band (diagnostic)
 * @param {number|null} [args.score]   a single composite score (post-test home card) — used when no band
 * @param {number|null} [args.officialScore]  a reported official SAT composite — outranks band/score for target rules
 * @param {object|null} [args.scoreReports]  users/{uid}.scoreReports map — shapes the past-date advice
 * @param {number|null} [args.targetScore]  composite target (400–1600); section-scale targets are ignored
 * @param {string|null} [args.testDate]  'YYYY-MM-DD'
 * @param {Date} [args.today]  injectable "now" (tests)
 * @param {number} [args.answeredCount]  questions answered in the sitting
 * @param {number} [args.totalCount]  questions served in the sitting
 * @param {boolean} [args.isCheckin]  focus-weighted check-in — its band is not representative, so band rules are skipped
 * @returns {Array<{kind:string, eyebrow:string, title:string, message:string, short:string, action:{kind:string,label:string}|null, suggestedTarget?:number}>}
 */
export function buildDiagnosisNuances({
  band = null,
  score = null,
  officialScore = null,
  targetScore = null,
  testDate = null,
  scoreReports = null,
  today = new Date(),
  answeredCount = null,
  totalCount = null,
  isCheckin = false,
} = {}) {
  const out = [];
  const hasTarget = Number.isFinite(targetScore);
  // Section-scale (≤800) legacy targets can't be compared to a composite band.
  const compositeTarget = hasTarget && targetScore > 800 && targetScore <= 1600;

  // Range we can reason about: an OFFICIAL reported score outranks everything
  // (it's the real thing); else the band; else a point score as a zero-width band.
  let range = null;
  if (Number.isFinite(officialScore)) range = { low: officialScore, high: officialScore, isPoint: true, official: true };
  else if (!isCheckin) {
    if (band && Number.isFinite(band.low) && Number.isFinite(band.high)) range = { low: band.low, high: band.high, isPoint: false };
    else if (Number.isFinite(score)) range = { low: score, high: score, isPoint: true };
  }

  // 1. Test date already behind them. What we say depends on whether they've
  //    told us how it went (scoreReports[testDate]).
  const days = testDate ? daysBetween(testDate, today) : null;
  if (days !== null && days < 0) {
    const next = getUpcomingSATDates(today).slice(0, 2).map((s) => formatSatChipLabel(s.date));
    const nextClause = next.length
      ? ` The next official sittings are ${next.join(' and ')} — pick the one you're registered for, or aiming at.`
      : '';
    const report = scoreReports && typeof scoreReports === 'object' ? scoreReports[testDate] : null;
    const release = getScoreReleaseDate(testDate);
    const releaseDays = release ? daysBetween(release.date, today) : null;
    if (report?.status === 'not-taken') {
      out.push({
        kind: 'test-date-passed',
        eyebrow: 'Your test date',
        title: `You didn't sit the ${formatShortDate(testDate)} SAT`,
        message: `The plan is still pacing itself toward that date.${nextClause}`,
        short: `You skipped ${formatShortDate(testDate)} — pick the date you're aiming at.`,
        action: { kind: 'testDate', label: 'Pick your next test date' },
      });
    } else if (report) {
      out.push({
        kind: 'test-date-passed',
        eyebrow: 'Your test date',
        title: `${formatShortDate(testDate)} is done`,
        message: `That sitting is behind you${report.status === 'reported' && Number.isFinite(report.composite) ? ` (official score: ${report.composite})` : ''}. If you're taking it again, set the next date so the plan paces toward it; if you're finished, clear it.${nextClause}`,
        short: `${formatShortDate(testDate)} is done — set your next date, or clear it.`,
        action: { kind: 'testDate', label: 'Set your next test date' },
      });
    } else {
      const scoresClause = releaseDays !== null && releaseDays > 0
        ? ` Scores are expected ${formatShortDate(release.date)} — we'll ask how it went then.`
        : ' Scores should be out now — tell us how it went on Home.';
      out.push({
        kind: 'test-date-passed',
        eyebrow: 'Your test date',
        title: `${formatShortDate(testDate)} has come and gone`,
        message: `The plan paces itself off your test date, and right now that date is ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} in the past.${scoresClause}${nextClause}`,
        short: `Your ${formatShortDate(testDate)} test date has passed.`,
        action: { kind: 'testDate', label: 'Update your test date' },
      });
    }
  }

  // 2. No target at all.
  if (!hasTarget) {
    out.push({
      kind: 'no-target',
      eyebrow: 'Your target',
      title: 'No target score yet',
      message: "Without a goal, the diagnosis can't price your gaps in points or say how far there is to go. Pick a number — your goal school's median is a good first anchor.",
      short: 'Set a target so your gaps can be priced in points.',
      action: { kind: 'target', label: 'Set a target' },
    });
  }

  if (range && compositeTarget) {
    const { low, high, isPoint } = range;
    // 3. The whole range clears the target — the goal is too low to steer.
    if (low >= targetScore) {
      const suggested = suggestRaisedTarget(high);
      const clears = range.official
        ? `Your official SAT score, ${low}, clears it.`
        : isPoint
          ? `Your latest score, ${low}, clears it.`
          : `Even the low end of your range, ${low}, clears it.`;
      const nearCeiling = low >= 1550;
      out.push({
        kind: 'target-below-range',
        eyebrow: 'Your target',
        title: nearCeiling
          ? `You've met your ${targetScore} goal — and you're near the ceiling`
          : `Your ${targetScore} target is below where you already stand`,
        message: nearCeiling
          ? `${clears} There's almost no scale left above you, so set the target to 1600 and use the plan to protect what you have: the misses that remain are the expensive kind.`
          : `${clears} A goal you've already met can't shape a plan — every session would be maintenance. Raise it so the work points somewhere: ${suggested} is a real stretch from here, ${suggested - high} points past the top of your range.`,
        short: isPoint
          ? `Your ${low} clears your ${targetScore} goal — it's time to raise it.`
          : `Your whole range clears your ${targetScore} goal — it's time to raise it.`,
        action: { kind: 'target', label: 'Raise your target' },
        suggestedTarget: nearCeiling ? 1600 : suggested,
      });
    } else if (!isPoint && targetScore <= high) {
      // 4. Target sits inside the band — can't call it either way yet.
      out.push({
        kind: 'target-inside-range',
        eyebrow: 'Your target',
        title: `Your ${targetScore} target may already be in hand`,
        message: `It sits inside your ${low}–${high} range, so this diagnostic can't tell whether it's a done deal or a coin flip. A full practice test will — and either way, plan for a number above it, not at it.`,
        short: `Your ${targetScore} goal sits inside your range — a full test will settle it.`,
        action: { kind: 'practiceTest', label: 'Take a full practice test' },
      });
    } else if (days !== null && days > 0) {
      // 5. Steep climb for the time left.
      const gap = targetScore - high;
      if (gap / days > STEEP_POINTS_PER_DAY) {
        const perWeek = Math.round((gap / days) * 7 / 5) * 5;
        out.push({
          kind: 'gap-vs-time',
          eyebrow: 'Your timeline',
          title: `${gap} points in ${days} day${days === 1 ? '' : 's'} is a steep climb`,
          message: `That's about ${perWeek} points a week, every week, from the top of your range. Consistent daily prep usually moves a score 50–100 points a month. Either give yourself a later date, or set a milestone for this sitting and keep ${targetScore} as the long-run goal.`,
          short: `${gap} points in ${days} days is a steep climb — consider a later date.`,
          action: { kind: 'testDate', label: 'Adjust your test date' },
        });
      }
    }
  }

  // 6. Thin sitting — blanks widen the band.
  if (!isCheckin && Number.isFinite(answeredCount) && Number.isFinite(totalCount) && totalCount > 0) {
    const blanks = totalCount - answeredCount;
    if (blanks > 0 && answeredCount / totalCount < 0.8) {
      out.push({
        kind: 'thin-sitting',
        eyebrow: 'This sitting',
        title: `You left ${blanks} of ${totalCount} questions blank`,
        message: 'Blanks are pacing evidence, not knowledge misses — but they also widen the range above. The fewer blanks next time, the tighter the read.',
        short: `${blanks} blanks widened this range.`,
        action: null,
      });
    }
  }

  return out.sort((a, b) => NUANCE_PRIORITY.indexOf(a.kind) - NUANCE_PRIORITY.indexOf(b.kind));
}

/**
 * The single most important nuance for a one-line surface (the home hero).
 * Only the kinds a student should ACT on from Home qualify.
 *
 * @param {Array} nuances  buildDiagnosisNuances output
 * @returns {object|null}
 */
export function pickHomeNuance(nuances) {
  const HOME_KINDS = ['test-date-passed', 'target-below-range', 'no-target', 'gap-vs-time'];
  return (nuances || []).find((n) => HOME_KINDS.includes(n.kind)) || null;
}
