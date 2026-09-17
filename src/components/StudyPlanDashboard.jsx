import React, { useState, useMemo } from 'react';
import { colors } from '../design/tokens';
import { MathText } from './MathText';
import { getQuestionsBySkillIds, getTargetedWeaknessSet } from '../data/questions/bank';
import {
  getQuestionsBySkillIds as getRWQuestionsBySkillIds,
  getTargetedWeaknessSet as getRWTargetedWeaknessSet,
} from '../data/questions/rwBank';
import { showToast } from './ui/Toaster';
import { getWeaknessSection, getMathWeaknesses, getRWWeaknesses } from '../services/selectors/weaknesses';
import { activitySection, matchesSectionFilter, SECTION_FILTERS } from '../services/selectors/planSection';
import { DOMAIN_DISPLAY_NAMES } from '../services/scoring/domainInference';
import { CB_RW_DOMAIN_LABELS } from '../data/questions/cbSkillTaxonomy';
import { resolveActivityDrill, pickModuleWeakness } from '../services/activityDrillRouter';
import { applyPredictionBoost } from '../services/selectors/predictionBoost';
import { annotateFocusAreas } from '../services/selectors/focusAreaProgress';
import { getDrillChipForWeakness } from '../services/selectors/drillChip';
import { formatDiagnosticSentence } from '../services/diagnosticEngine';
import {
  rescheduleActivity,
  setActivitySkipped,
  removeActivity,
  addCustomActivity,
  setFocusAreas,
  setPacing,
  setSchedule,
} from '../services/studyPlanEditor';
import { scheduledDayNames, deriveSchedule } from '../services/studySchedule';
import { countRemainingTodayTasks, isStarterPlan } from '../services/selectors/todaySlice';
import { buildLivingDaySlice } from '../services/livingPlan';
import { activitySummary, activityBreakdown } from '../services/selectors/activitySummary';
import { buildDayNarrative } from '../services/selectors/dayNarrative';
import { getIdentityInsights, getPredictionTrust } from '../services/selectors/identityInsights';
import { getReviewStreak } from '../services/dailyReviewEngine';
import { formatDailyIntro } from '../services/selectors/dailyIntro';
import { getPracticedDayKeys } from '../services/selectors/practicedDays';
import { isGoalAchieved, goalDelta, isSectionScaleScore } from '../services/selectors/goalProgress';
import { getDaysUntilTest } from '../services/selectors/daysUntilTest';
import { parseLocalDate } from '../utils/localDate';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import CalendarMonth from './CalendarMonth';
import Avatar, { AVATAR_SIZES } from './ui/Avatar';
import StudyPlanReviewSection from './StudyPlanReviewSection';
import StudyPlanPacingSection from './StudyPlanPacingSection';
import { getEstimatedBaseline } from '../services/selectors/estimatedBaseline';
import { buildPacingTelemetry } from '../services/selectors/pacingTelemetry';
import { buildPacingSession } from '../services/pacingService';
import { formatPatternLabel } from '../services/selectors/missedPatternLabel';
import { getPacingStruggle } from '../services/selectors/pacingStruggle';
import { groupFlaggedBySection, flaggedCount as countFlagged, toDrillSeeds } from '../services/selectors/flaggedQuestions';
import { partitionReviewQueue } from '../services/selectors/planReviewQueue';
import {
  ClipboardIcon,
  BookOpenIcon,
  PencilIcon,
  BrainIcon,
  SearchIcon,
  DocumentIcon,
  PinIcon,
  CheckIcon,
  ChevronDownIcon,
} from '../design/icons';
import './StudyPlanDashboard.css';
import './StudentDashboard.css';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Design-review FINDING-007: activity accents were semantic.info (blue) and
// badge.bronze (a token that actually resolves to blue) — off-brand in an
// orange app. One accent (brand) for actionable rows, quiet slate for tips.
const TYPE_META = {
  lesson:   { label: 'Lesson',   fg: colors.text.tertiary },
  practice: { label: 'Practice', fg: colors.focus },
  strategy: { label: 'Tip',      fg: colors.text.tertiary },
  review:   { label: 'Tip',      fg: colors.text.tertiary },
  test:     { label: 'Test',     fg: colors.focus },
};

// Tinted icon-chip palette, diagnostic-report style: each activity kind gets
// an identity color. Math/R&W use the section hues (orange / info-blue) the
// section chips use; strategy = amber, review = purple (plan domain),
// test = navy. Tri-color semantics preserved — purple stays plan/focus,
// green stays completion (the done state).
const chipColorsFor = (act) => {
  if (act.type === 'test') return { bg: 'var(--color-slate-100)', fg: 'var(--color-brand-navy)' };
  if (act.type === 'strategy' || act.type === 'review') {
    // Both render the user-facing label "Tip" — one shared hue (amber), so
    // color stays a one-to-one encoding on a page where it now means section.
    return { bg: 'var(--color-warning-100)', fg: 'var(--color-warning-600)' };
  }
  const section = activitySection(act);
  if (section === 'rw') return { bg: 'var(--color-info-100)', fg: 'var(--color-info-700)' };
  // orange-600 (not primary): the lighter primary fails contrast at chip size
  return { bg: 'var(--color-brand-primary-light)', fg: 'var(--color-brand-orange-600)' };
};

const SECTION_CHIP_LABEL = { math: 'Math', rw: 'R&W' };

// Focus-card domain eyebrow: official display names, never raw kebab slugs
// ("ADVANCED-MATH" next to the polished section chip read as a bug).
const domainLabel = (domain) => {
  if (!domain) return 'Skill';
  return DOMAIN_DISPLAY_NAMES[domain]
    || CB_RW_DOMAIN_LABELS[domain]
    || domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// Week titles persisted by the generator embed their own "Week N:" prefix
// ("Week 2: targeted practice"), which the header template then doubles
// ("Week 2 — Week 2: targeted practice"). Strip at render so both new and
// persisted plans read clean.
const cleanWeekTitle = (title) => {
  if (!title) return '';
  const stripped = title.replace(/^week\s*\d+\s*[:—–-]\s*/i, '').trim();
  if (!stripped) return '';
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
};

// Icons inherit the tinted chip's color (chipColorsFor) via currentColor —
// passing explicit hues here would fight the section/type tint.
function activityIcon(type) {
  if (type === 'lesson')   return <BookOpenIcon size={16} color="currentColor" />;
  if (type === 'practice') return <PencilIcon size={16} color="currentColor" />;
  if (type === 'strategy') return <BrainIcon size={16} color="currentColor" />;
  if (type === 'review')   return <SearchIcon size={16} color="currentColor" />;
  if (type === 'test')     return <DocumentIcon size={16} color="currentColor" />;
  return <PinIcon size={16} color="currentColor" />;
}

// Monday-first weekday order for the Weekly View day-row timeline. Module
// scope so the useMemo that consumes it stays dependency-stable.
const WEEKDAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
/** First N sentences of a coach paragraph (the simple plan page keeps the
 *  day intro to one or two lines; the full text stays in the narrative). */
const firstSentences = (text, n) => {
  const str = String(text || '').trim();
  if (!str) return '';
  const parts = str.match(/[^.!?]+[.!?]+(?:\s+|$)/g);
  if (!parts) return str;
  return parts.slice(0, n).join('').trim();
};

// Humanize a kebab pattern slug into a short, title-cased round label
// ("vertex-form-from-two-conditions" → "Vertex Form From Two…"). Capped at
// four words so a round row never wraps.
function humanizePattern(slug) {
  if (!slug || typeof slug !== 'string') return '';
  // Delegate to the canonical formatter (it expands R&W skill abbreviations —
  // 'fss-subject-verb-agreement' → 'Form & Sense: Subject Verb Agreement';
  // the old local title-caser leaked 'Fss …' to students), then cap length
  // so a round row never wraps.
  const label = formatPatternLabel(slug) || '';
  const words = label.split(' ');
  return words.length > 5 ? `${words.slice(0, 5).join(' ')}…` : label;
}

// Rough drill-time estimate from a question count (~1.2 min/Q, floored at 10).
const estMinutes = (qCount) => Math.max(10, Math.round((qCount || 0) * 1.2));

/**
 * buildPlanModule — turn a focus-area weakness row into the "module card with
 * rounds" model the redesigned Today panel renders.
 *
 * Rounds surface the skill's missed SAT patterns (real sub-skills the drill
 * targets). Round status/progress is the skill's *drill evidence* projected
 * onto those rounds — mastered → every round done; drilled-but-not-mastered →
 * earlier rounds done + the next active; never-drilled → all to-do. This is
 * honest at skill grain; per-pattern telemetry would refine it (follow-up).
 *
 * @param {object} w  a focus-area weakness (from skillPracticeRows)
 * @param {number} i  index in the (sectioned) focus list — top row gets KEY FOCUS
 * @param {object|undefined} skillProgress  uid skill-progress map
 * @param {string} diagnosticSentence  editorial sentence for this row
 * @returns {object} module model { section, tag, title, desc, acc, accBand,
 *   status, meta, qIds, rounds[], weakness, adaptiveLine, predictedStruggle }
 */
function buildPlanModule(w, i, skillProgress, diagnosticSentence) {
  const section = w.section === 'rw' ? 'rw' : 'math';
  const rawAcc = typeof w.displayAccuracy === 'number' ? w.displayAccuracy : (w.accuracy ?? null);
  const acc = rawAcc != null ? Math.round(rawAcc) : null;
  const accBand = (w.isMastered || (acc != null && acc >= 70)) ? 'high'
    : (acc != null && acc < 40) ? 'low' : 'mid';

  // RECENT drill evidence only (same contract as activityBreakdown):
  // lifetime sp.mastery includes test/diagnostic-seeded answers, which
  // fabricated "done" rounds on sessions the student never opened — the
  // phantom-progress class, surviving here after the other two sites were
  // fixed (review finding). recentDrill comes from annotateFocusAreas
  // (already sinceMs-cut to this plan's generatedAt).
  const recent = w.drillStats || null;
  const mastery = recent?.accuracy ?? 0;
  const hasStarted = !!w.hasDrillSignal;

  const status = w.isMastered ? 'complete' : hasStarted ? 'progress' : 'start';

  // Rounds from missed patterns (cap 3); fall back to a single skill round.
  const patterns = Array.isArray(w.missedPatterns) ? w.missedPatterns.filter(Boolean).slice(0, 3) : [];
  const roundCount = Math.max(1, patterns.length);
  const total = w.qCount || roundCount * 8;
  const perRound = Math.max(4, Math.round(total / roundCount));
  const doneRounds = status === 'complete' ? roundCount
    : status === 'progress' ? Math.min(roundCount - 1, Math.floor((mastery / 100) * roundCount))
    : 0;

  const rounds = [];
  for (let r = 0; r < roundCount; r++) {
    const label = patterns[r] ? humanizePattern(patterns[r]) : (w.skill || 'Targeted drill');
    let rstatus, prog;
    if (r < doneRounds) { rstatus = 'done'; prog = `${perRound}/${perRound}`; }
    else if (r === doneRounds && status === 'progress') {
      rstatus = 'active';
      const within = Math.min(perRound - 1, Math.max(1, Math.round((mastery / 100) * perRound)));
      prog = `${within}/${perRound}`;
    } else { rstatus = 'todo'; prog = `0/${perRound}`; }
    rounds.push({
      label: `Round ${r + 1} · ${label}`,
      keyFocus: r === 0 && status !== 'complete',
      status: rstatus,
      prog,
    });
  }

  return {
    section,
    tag: section === 'math' ? 'MATH' : 'R&W',
    title: w.skill || 'Focus skill',
    desc: diagnosticSentence || w.errorType || '',
    acc,
    accBand,
    status,
    meta: `${estMinutes(total)} MIN · ${total} Q`,
    qIds: Array.isArray(w.qIds) ? w.qIds : [],
    rounds,
    weakness: w,
    domain: w.domain,
    adaptiveLine: w.adaptiveLine,
    predictedStruggle: w.predictedStruggle,
    isMastered: w.isMastered,
  };
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ScoreTrajectory = ({ artifact }) => {
  const full = artifact?.longitudinal?.scoreTrajectory;
  if (!full?.length) return null;

  // Don't mix 200-800 single-section scores with 400-1600 composites on one
  // axis — show only entries on the latest attempt's scale. (Legacy nodes saved
  // before isMultiSection inferred from the score magnitude as a fallback.)
  const scaleOf = (e) => (e.isMultiSection ?? (e.scaledScore > 800));
  const latestScale = scaleOf(full[full.length - 1]);
  const trajectory = full.filter(e => scaleOf(e) === latestScale);
  if (!trajectory.length) return null;

  return (
    <div className="sp-trajectory">
      <span className="sp-trajectory-label">Score History</span>
      {trajectory.map((entry, i) => (
        <span key={i} className={`sp-trajectory-node ${i === trajectory.length - 1 ? 'is-latest' : ''}`}>
          {entry.scaledScore}
        </span>
      ))}
    </div>
  );
};

// LOCAL-day key (YYYY-MM-DD, zero-padded) — matches dailyReviewEngine.localDayKey
// so streak/pacing date math follows the student's calendar day, not UTC. An
// evening reviewer in a negative-UTC-offset timezone must not have their day
// roll early (which hid a continuable streak). See dailyReviewEngine.js:76-80.
const localDateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Thin gate: the loaded dashboard below calls 40+ hooks, so it must never
// render without a plan. Switching between the empty state and the loaded
// component here (instead of an early return above the hooks) keeps every
// render of each component calling the same hooks — when studyPlan arrives
// on a mounted instance, React swaps children instead of panicking with
// "Rendered more hooks than during the previous render."
const StudyPlanDashboard = (props) => {
  const { studyPlan, user, onStartPracticeTest } = props;
  if (!studyPlan || !studyPlan.weeks || studyPlan.weeks.length === 0) {
    return (
      <div className="study-plan-dashboard">
        <div className="sp-empty-state">
          <div className="sp-empty-icon">
            <ClipboardIcon size={40} />
          </div>
          <div className="sp-empty-title">
            No Study Plan Yet
          </div>
          <div className="sp-empty-desc">
            {user?.firstName
              ? `${user.firstName}, here's where your plan will live. One practice test builds it — which skills cost you points, where you rush, and what to fix first.`
              : 'Take one practice test. Your plan gets built from every answer — which skills cost you points, where you rush, and what to fix first.'}
          </div>
          {onStartPracticeTest && (
            <button onClick={onStartPracticeTest} className="sp-empty-btn">
              Take a Practice Test
            </button>
          )}
        </div>
      </div>
    );
  }
  return <StudyPlanLoaded {...props} />;
};

const StudyPlanLoaded = ({
  variant = 'default',
  studyPlan,
  studyPlanArtifact,
  studyPlanMeta,
  practiceTestResults,
  miniDiagnostic = null,
  practiceProgress,
  drillDays = [],
  skillProgress,
  reviewQueue,
  adaptiveOverlay = null,
  user,
  onStartPractice,
  onStartPracticeTest,
  onStartDiagnostic,
  onCompleteActivity,
  onUncompleteActivity,
  onEditPlan,
  studyPlanHistory,
  onSelectPlanVersion,
  onStartReview,
  onStartPacing,
  onReviewTestWrong,
  flaggedQuestions = {},
  onUnflagQuestion,
  answeredQuestionIds = [],
  predictionLog = null,
}) => {
  // ── Hooks — studyPlan is guaranteed non-empty by the gate above ──────
  const [deltaDismissed, setDeltaDismissed] = useState(() =>
    !!studyPlanMeta?.artifactId && !!localStorage.getItem(`dismissedDelta:${studyPlanMeta.artifactId}`)
  );
  // Acely-polish v2: top-level sub-tabs ("Today's Tasks" / "Weekly View")
  // matching the reference. BOTH mounts — the standalone view (variant=
  // 'default') and the home-screen Study Plan tab (variant='inline') — show
  // the sub-tabs and default to Today's Tasks (the day-grain view), so
  // clicking "Study Plan" lands on today's work with the Weekly View one tap
  // away. (Earlier the inline mount was weekly-only and hid the tabs; users
  // expected to see today's tasks there too, not just the weekly timeline.)
  const [activeView, setActiveView] = useState('todaysTasks');
  const [showAllSkillChanges, setShowAllSkillChanges] = useState(false);
  // Math / Reading & Writing switcher (Practice-Bank-style). Scopes the
  // Weekly Schedule, Focus Areas, coming-up preview, and the plan-progress
  // counts. Section-agnostic items (review/strategy/test) show everywhere.
  const [sectionFilter, setSectionFilter] = useState('all');

  // ── Edit-plan mode (student-initiated edits) ──────────────────────────
  // Off by default; the Weekly view's "Edit plan" toggle flips it on, which
  // reveals per-task controls (reschedule / skip / remove), an "add task"
  // form per week, and the Plan Settings panel (focus areas + pacing).
  const [editMode, setEditMode] = useState(false);
  const [addTaskWeek, setAddTaskWeek] = useState(null); // week index with an open add-task form
  const [addTaskTitle, setAddTaskTitle] = useState('');
  const [addTaskDay, setAddTaskDay] = useState('Monday');
  // Weekly View week-carousel: which plan week is shown (defaults to the
  // current week once derived). Tip cards expand inline; state lifted here
  // (keyed weekIdx:actIdx) so it survives ActivityRow re-creation each render.
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [expandedTips, setExpandedTips] = useState({});
  const toggleTip = (key) => setExpandedTips((m) => ({ ...m, [key]: !m[key] }));
  // Per-card breakdown disclosure in the Weekly View (keyed weekIdx:actIdx).
  // Today's cards open by default (see ActivityRow's defaultOpen); the map only
  // stores explicit user overrides.
  const [expandedBreakdowns, setExpandedBreakdowns] = useState({});
  // Weekly View week-picker dropdown open/closed.
  const [weekMenuOpen, setWeekMenuOpen] = useState(false);

  // ── Derived data ─────────────────────────────────────────────────────
  // Render-time guard: legacy plan artifacts in Firestore may still
  // carry type='lesson' activities — those routed to the legacy
  // LearnWorkspace, which the product no longer surfaces. Drop them
  // before rendering so users only ever see practice/review/strategy/
  // test activities. Generator no longer emits lessons (see
  // studyPlanGenerator.js:472), but this defends against old plans
  // already persisted server-side.
  const isVisibleActivity = (a) => a && a.type !== 'lesson' && !a.skipped && matchesSectionFilter(a, sectionFilter);
  const visibleActivities = (week) => (week?.activities || []).filter(isVisibleActivity);

  const delta = studyPlanArtifact?.delta || studyPlan._diff || null;
  const { weeks } = studyPlan;
  // Prediction-aware Focus Areas ordering (2026-06 audit gap 2): weaknesses
  // the engine flags as likely struggle areas on the NEXT test move to the
  // front, annotated so the card can say why. Render-time re-rank — the
  // persisted plan order is untouched, and the selector returns the original
  // array reference when there is no active prediction.
  const weaknesses = useMemo(
    () => applyPredictionBoost(studyPlan.weaknesses, predictionLog),
    [studyPlan.weaknesses, predictionLog],
  );
  // Live drill evidence + reprioritization annotations (adaptivity audit
  // items 1-3): each weakness gains recent-drill stats from skillProgress,
  // a mastered-in-practice flag, and the engine's improved/declined call —
  // and the list re-orders so declined skills rise, improved sink, and
  // mastered drop to the bottom. Pure selector; plan data untouched.
  const annotatedWeaknesses = useMemo(
    () => annotateFocusAreas({
      weaknesses,
      skillProgress,
      practiceTestResults,
      overlay: adaptiveOverlay,
      // Drill evidence must postdate THIS plan — the diagnostic's own
      // skillProgress seeding otherwise reads as day-one drill progress.
      sinceMs: studyPlan?.generatedAt ? Date.parse(studyPlan.generatedAt) || null : null,
    }),
    [weaknesses, skillProgress, practiceTestResults, adaptiveOverlay, studyPlan?.generatedAt],
  );
  const totalActivities = weeks.reduce((s, w) => s + visibleActivities(w).length, 0);
  const completedActivities = weeks.reduce((s, w) => s + visibleActivities(w).filter(a => a.completed).length, 0);
  // Current-week derivation is section-filter-INDEPENDENT on purpose:
  // mondayForWeek anchors every week's date range on it and the THIS WEEK
  // chip compares against it, so deriving it from the filtered activity list
  // let a Math/R&W toggle slide all the week date labels by a week. The
  // section filter still drives per-week task counts/visibility via
  // visibleActivities.
  const currentWeekIndex = weeks.findIndex(w => (w?.activities || [])
    .some(a => a && a.type !== 'lesson' && !a.skipped && !a.completed));
  const displayCurrentWeek = currentWeekIndex >= 0 ? currentWeekIndex : weeks.length - 1;

  // Past-Test-Review CTA gate. Hooks live here (after the empty-state
  // early return) instead of at the top of the component to keep the
  // hook order consistent across the loading→loaded transition. Putting
  // them above the early return shifts the hook count between renders
  // and trips React's "Rendered more hooks than during the previous
  // render" check the first time studyPlan hydrates from Firestore.
  // Plan v3 (ff:planV3): one timeline instead of the Today/Weekly tabs — the
  // mission-control arc header on top, today's sessions expanded, the rest of
  // the week beneath, and the old orphan sections (Beyond this week / Review
  // Queue widget / Pacing card / How-you-test footer) folded into the plan
  // itself. Flag OFF = the previous two-tab page, byte-identical (rollback).
  const ffPlanV3 = useFeatureFlag('planV3');

  // Acely-polish v2: right-rail derived state.
  const practicedDayKeys = useMemo(
    () => getPracticedDayKeys({ practiceProgress, practiceTestResults, drillDays }),
    [practiceProgress, practiceTestResults, drillDays],
  );
  const sortedTests = useMemo(() => {
    if (!practiceTestResults) return [];
    return Object.values(practiceTestResults)
      .filter(t => typeof t.bestScaledScore === 'number')
      .sort((a, b) => {
        const at = a.lastAttemptAt?.toDate?.() || new Date(a.lastAttemptAt || 0);
        const bt = b.lastAttemptAt?.toDate?.() || new Date(b.lastAttemptAt || 0);
        return at - bt;
      });
  }, [practiceTestResults]);
  const latestTest = sortedTests.length > 0 ? sortedTests[sortedTests.length - 1] : null;
  const latestScore = latestTest ? latestTest.bestScaledScore : null;
  // Diagnostic v2: the estimated band fills the rail's score tile until the
  // first real test score exists (same selector + outranking rule as Home).
  const estimatedBaseline = useMemo(
    () => (latestScore === null ? getEstimatedBaseline(miniDiagnostic, practiceTestResults) : null),
    [latestScore, miniDiagnostic, practiceTestResults],
  );
  // Delta from the first test to the latest — but only when both are on the
  // SAME scale. A math-only single-section baseline (200-800) against a full
  // composite (400-1600) latest would render a nonsense "+700 pts" (the same
  // cross-scale trap latestTestStats.js:170 and goalProgress guard against).
  const oldestTest = sortedTests.length >= 2 ? sortedTests[0] : null;
  const scoreDelta = (latestTest && oldestTest
    && !!latestTest.isMultiSection === !!oldestTest.isMultiSection)
    ? latestTest.bestScaledScore - oldestTest.bestScaledScore
    : null;
  // Shared selector — one day-count for the SAT date everywhere. Negative
  // values (test date in the past) are common in dogfood/seed data and look
  // terrible as "-57"; flag + remap below.
  const daysUntilTest = getDaysUntilTest(user?.testDate);
  const testDateIsPast = daysUntilTest !== null && daysUntilTest < 0;
  // Pacing & Timing section: per-question timing from the most recent test +
  // the plan's timing-struggle signal (the generator's "Pacing Reset"
  // activity). The section gates/boosts itself on these.
  const pacingTelemetry = useMemo(
    () => buildPacingTelemetry(practiceTestResults),
    [practiceTestResults]
  );
  const pacingStruggle = useMemo(() => getPacingStruggle(studyPlan), [studyPlan]);
  // "Beyond this week" gating: only show the section (and its divider) when at
  // least one of Review Queue / Pacing / past-test review will actually render.
  const reviewDue = useMemo(() => partitionReviewQueue(reviewQueue).sessionSize, [reviewQueue]);
  // Flagged questions (flag-a-question, review-it-later) grouped by section for
  // the Review Queue's Flagged block. Count feeds the "Beyond this week" gate.
  const flaggedGroups = useMemo(() => groupFlaggedBySection(flaggedQuestions), [flaggedQuestions]);
  const flaggedTotal = useMemo(() => countFlagged(flaggedQuestions), [flaggedQuestions]);
  // Goal already achieved? Common in mid-test cycles where a recent score
  // already exceeds onboarding-time target. Compared scale-safely (1.4): a
  // 400-1600 composite must never "achieve" a 200-800 section target.
  const goalArgs = { latestScore, targetScore: user?.targetScore, isMultiSection: latestTest?.isMultiSection };
  const goalAchieved = isGoalAchieved(goalArgs);
  const goalAboveDelta = goalDelta(goalArgs);

  // ── Personalization overhaul (2026-06): the dark signals ────────────
  // The plan artifact has carried eliminationEffectiveness, staminaInsight,
  // and calculatorDependency since the groundTruth graft — rendered nowhere.
  // These three memos surface them: identity insights ("How you test"),
  // the prediction-trust record, and the target-school anchor.
  const identityInsights = useMemo(() => getIdentityInsights(studyPlan), [studyPlan]);
  const predictionTrust = useMemo(() => getPredictionTrust(predictionLog), [predictionLog]);
  // Review streak — localStorage-backed; only show a LIVE streak (touched
  // today or yesterday, at least 2 days). A stale or 1-day "streak" is noise.
  const reviewStreak = useMemo(() => {
    const streak = getReviewStreak();
    if (!streak || streak.current < 2 || !streak.lastDate) return null;
    const today = localDateKey(new Date());
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yesterday = localDateKey(y);
    return (streak.lastDate === today || streak.lastDate === yesterday) ? streak : null;
  }, []);

  // Day-1 of Acely-polish v2: extract just the FIRST sentence of the
  // adaptive-plan delta paragraph so the banner reads like a tight summary
  // rather than a wall of strategy text. The full paragraph is available
  // behind a "Show more" disclosure.
  //
  // Design-review FINDING-001: the generated paragraphs are often ONE long
  // semicolon-chained sentence, so the first-sentence regex matched the whole
  // wall of text and the clamp never fired. Hard-cap at a word boundary so
  // the collapsed note is always 1-2 lines, never a paragraph.
  const clampToSentence = (text, max = 170) => {
    if (!text) return '';
    const m = text.match(/^[^.!?]+[.!?]/);
    let first = m ? m[0] : text;
    if (first.length > max) {
      const cut = first.slice(0, max);
      const lastSpace = cut.lastIndexOf(' ');
      first = cut.slice(0, lastSpace > 80 ? lastSpace : max).replace(/[,;:\s]+$/, '') + '…';
    }
    return first;
  };
  const [deltaExpanded, setDeltaExpanded] = useState(false);
  const deltaText = studyPlan.deltaFromPrevious || '';
  const deltaFirstSentence = clampToSentence(deltaText);
  const deltaHasMore = deltaText.length > deltaFirstSentence.length + 4;
  // FINDING-001: the "stuck skill" strategy note rendered its full paragraph
  // with no disclosure at all — same treatment as the delta note.
  const [strategyExpanded, setStrategyExpanded] = useState(false);
  const strategyText = studyPlan.persistentWeaknessStrategy || '';
  const strategyFirstSentence = clampToSentence(strategyText);
  const strategyHasMore = strategyText.length > strategyFirstSentence.length + 4;
  // FINDING-002: Focus Areas disclosure state — only the top 3 focus modules
  // render in the Today panel until expanded.
  const [showAllFocus, setShowAllFocus] = useState(false);

  // Today's-Tasks tab derived state.
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = DAY_NAMES[new Date().getDay()];
  // Living slice — same evidence-reshaped day the dashboard hero shows.
  const todaySlice = useMemo(
    () => buildLivingDaySlice(studyPlan, { todayDayName, skillProgress, practiceTestResults, reviewQueue }),
    [studyPlan, todayDayName, skillProgress, practiceTestResults, reviewQueue]
  );
  const topWeakness = useMemo(() => {
    if (!studyPlan) return null;
    const math = getMathWeaknesses(studyPlan);
    const rw = getRWWeaknesses(studyPlan);
    const merged = [...math, ...rw].sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));
    return merged[0] || null;
  }, [studyPlan]);
  const dailyIntro = useMemo(
    () => formatDailyIntro({ todaySlice, latestScore, topWeakness, firstName: user?.firstName }),
    [todaySlice, latestScore, topWeakness, user?.firstName],
  );

  // Tab count badges — 'Today's Tasks (N) / Weekly View (N)' matches the
  // Acely reference exactly. countRemainingTodayTasks re-derives from the
  // slice KIND — in 'all-done' the activities array holds the COMPLETED
  // list, so a naive .length badge kept nagging "(3)" after finishing.
  const todaysTasksCount = countRemainingTodayTasks(todaySlice);
  const weeklyViewCount = totalActivities - completedActivities;

  // Coming-up preview for the Today's Tasks tab — when today is a rest-day
  // or all-done, the page would otherwise leave a huge gap below a small
  // card. Build a 4-day rolling preview of the current week, starting
  // tomorrow, showing each day's activity count + nameplate. We inline the
  // currentWeek lookup since the named binding is declared lower in the
  // file (avoids a TDZ hoisting issue).
  const comingUpDays = useMemo(() => {
    const week = weeks[displayCurrentWeek];
    if (!week || !Array.isArray(week.activities)) return [];
    const todayIdx = DAY_NAMES.indexOf(todayDayName);
    const visible = week.activities.filter(a => a && a.type !== 'lesson' && !a.skipped);
    const out = [];
    for (let offset = 1; offset <= 6; offset++) {
      const dayIdx = (todayIdx + offset) % 7;
      const dayName = DAY_NAMES[dayIdx];
      const dayActs = visible.filter(a => a.day === dayName);
      const incomplete = dayActs.filter(a => !a.completed);
      if (dayActs.length === 0) continue;
      out.push({
        day: dayName,
        offset,
        total: dayActs.length,
        incomplete: incomplete.length,
        sample: incomplete[0] || dayActs[0],
      });
      if (out.length >= 4) break;
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- DAY_NAMES is a per-render literal with fixed contents; adding it would recompute every render without ever changing the result
  }, [weeks, displayCurrentWeek, todayDayName]);

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleGo = (activity) => {
    // Unified session grammar (Plan v3): every plan card launches something
    // real. Test-miss review deep-links the actual missed questions; the
    // pacing session launches the real pacing drill tuned to the student's
    // own telemetry.
    if (activity.activityType === 'testMissReview' && activity.testId && onReviewTestWrong) {
      onReviewTestWrong(activity.testId);
      return;
    }
    if (activity.activityType === 'pacingDrill' && onStartPacing) {
      onStartPacing(buildPacingSession(pacingTelemetry).config);
      return;
    }
    // Lesson branch removed — generator no longer emits type='lesson'
    // and the legacy LearnWorkspace mount is gone.
    if (activity.type === 'test') {
      // Starter-plan check-in launches the mini-diagnostic, not a full test.
      if (activity.activityType === 'miniDiagnostic' && onStartDiagnostic) {
        onStartDiagnostic();
        return;
      }
      if (onStartPracticeTest) onStartPracticeTest();
      return;
    }
    if (activity.type !== 'practice' || !onStartPractice) return;

    // 3-tier activity routing (shared with the module-card launch path) — the
    // Weekly View previously called the raw 2-arg module/section form, which
    // App.jsx routed to the legacy 'prescriptive' screen instead of
    // AssignedPracticeShell.
    const route = resolveActivityDrill(
      {
        activity,
        weaknesses,
        cachedRows: skillPracticeRows,
        answeredQuestionIds,
      },
      {
        getTargetedWeaknessSet,
        getQuestionsBySkillIds,
        getRWTargetedWeaknessSet,
        getRWQuestionsBySkillIds,
        getDrillChipForWeakness,
      },
    );
    if (route?.kind === 'assigned') {
      onStartPractice(null, null, {
        questionIds: route.questionIds,
        source: 'study-plan-weekly',
        label: route.label,
        weakness: route.weakness,
      });
    } else if (route?.kind === 'module') {
      // Legacy module/section cards: hand the launcher the matching weakness
      // (if any) so the drill's diagnostic sentence has something to say.
      onStartPractice(route.moduleId, route.sectionName, {
        weakness: pickModuleWeakness(activity, weaknesses),
      });
    } else {
      // Unroutable (no drill pool, no module) — say so instead of a dead click.
      showToast({ type: 'info', message: 'No drill set is available for this activity yet.' });
    }
  };

  const handleToggle = (e, weekIdx, actIdx, done) => {
    e.stopPropagation();
    if (done) {
      onUncompleteActivity?.(weekIdx, actIdx);
    } else {
      onCompleteActivity?.(weekIdx, actIdx);
    }
  };

  // ── Edit handlers ─────────────────────────────────────────────────────
  // Each applies a pure transform (studyPlanEditor) to the current plan and
  // hands the result to onEditPlan (= useProgress.saveEditedStudyPlan), which
  // persists the whole plan to the Firestore artifact.
  const EDIT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayISO = () => localDateKey(new Date());
  const applyEdit = (transform) => {
    if (!onEditPlan || !studyPlan) return;
    const next = transform(studyPlan);
    if (next && next !== studyPlan) onEditPlan(next);
  };
  const handleReschedule = (weekIdx, actIdx, day) => applyEdit(p => rescheduleActivity(p, weekIdx, actIdx, day));
  const handleToggleSkip = (weekIdx, actIdx, currentlySkipped) => applyEdit(p => setActivitySkipped(p, weekIdx, actIdx, !currentlySkipped));
  const handleRemoveActivity = (weekIdx, actIdx) => applyEdit(p => removeActivity(p, weekIdx, actIdx));
  const handleAddTask = (weekIdx) => {
    const title = addTaskTitle.trim();
    if (!title) return;
    applyEdit(p => addCustomActivity(p, weekIdx, { title, day: addTaskDay }));
    setAddTaskTitle('');
    setAddTaskWeek(null);
    showToast({ type: 'success', message: 'Task added to your plan.' });
  };
  const handleRemoveFocus = (skillId) => {
    const remaining = (studyPlan.weaknesses || []).filter(w => w.skillId !== skillId);
    if (remaining.length === 0) {
      showToast({ type: 'info', message: 'Keep at least one focus area.' });
      return;
    }
    applyEdit(p => setFocusAreas(p, remaining));
  };
  const handleAddFocus = (gap) => {
    if (!gap?.skillId) return;
    const weakness = {
      skillId: gap.skillId,
      skill: gap.skillName || gap.skill || gap.skillId,
      section: gap.section === 'rw' ? 'rw' : 'math',
      accuracy: gap.testAccuracy ?? gap.accuracy ?? 0,
      domain: gap.domain || '',
      missedPatterns: gap.missedPatterns || [],
      evidence: gap.evidence || 'Added to your focus areas.',
      errorType: gap.errorType || 'Focus area',
    };
    applyEdit(p => setFocusAreas(p, [...(p.weaknesses || []), weakness]));
  };
  const handlePacing = (minutesPerDay, examDate) => applyEdit(p => setPacing(p, { minutesPerDay, examDate }, todayISO()));
  // Plans generated before the schedule model shipped carry no schedule field;
  // synthesize one from the plan's own intensity so the day-chip editor works
  // immediately instead of waiting for the next regeneration.
  const planSchedule = useMemo(() => {
    if (studyPlan?.schedule?.days) return studyPlan.schedule;
    if (!studyPlan?.weeks) return null;
    return deriveSchedule({}, studyPlan.intensityConfig || {}, studyPlan.userPrefs || null);
  }, [studyPlan]);
  // Toggle one study day on/off. Off→on uses the plan's minutes/day; the
  // editor enforces the 2-day minimum (invalid toggles return the plan as-is).
  const handleToggleDay = (day) => applyEdit(p => {
    const minutes = p.summary?.stats?.minutesPerDay || p.intensityConfig?.minutesPerDay || 30;
    const baseDays = p.schedule?.days
      || deriveSchedule({}, p.intensityConfig || {}, p.userPrefs || null).days;
    const days = { ...baseDays };
    days[day] = (days[day] || 0) > 0 ? 0 : minutes;
    return setSchedule(p, days);
  });

  // Skills the diagnosis surfaced that aren't currently in the focus list —
  // the pool the student can re-add via the Plan Settings panel.
  const addableFocusSkills = useMemo(() => {
    const current = new Set((studyPlan?.weaknesses || []).map(w => w.skillId));
    const gaps = studyPlan?.skillGaps || [];
    const seen = new Set();
    return gaps.filter(g => {
      if (!g?.skillId || current.has(g.skillId) || seen.has(g.skillId)) return false;
      seen.add(g.skillId);
      return true;
    });
  }, [studyPlan]);

  // ── Skill practice data ──────────────────────────────────────────────
  // Section-tag contract (Day 0): each weakness now has `section: 'math' | 'rw'`.
  // Today only the math bank ships (R&W bank lands in Day 1-2 / item #1), so we
  // route only math-section weaknesses into the dispatcher and surface R&W ones
  // as "drill coming soon" rows. Once the R&W bank ships, the rw branch will
  // route to its own getTargetedWeaknessSet from `data/questions/rwBank`.
  const skillPracticeRows = useMemo(() => {
    if (!annotatedWeaknesses?.length || !onStartPractice) return [];

    // Build a difficulty mix from the student's accuracy profile
    // A student struggling at easy questions needs more easy practice
    const diffMix = (() => {
      const diffLevels = studyPlan?.difficultyAnalysis?.levels;
      if (!diffLevels) return undefined; // let getTargetedWeaknessSet use default
      const easyAcc = diffLevels.easy?.accuracy ?? 70;
      const medAcc = diffLevels.medium?.accuracy ?? 50;
      if (easyAcc < 60) return { easy: 0.55, medium: 0.35, hard: 0.10 };
      if (easyAcc >= 75 && medAcc < 55) return { easy: 0.20, medium: 0.60, hard: 0.20 };
      if (easyAcc >= 80 && medAcc >= 65) return { easy: 0.15, medium: 0.45, hard: 0.40 };
      return undefined;
    })();

    return annotatedWeaknesses.slice(0, 6).map(w => {
      const section = getWeaknessSection(w);

      // Section-aware dispatcher. Pick the bank API matching the weakness's
      // test subject. Both banks expose the same `getTargetedWeaknessSet` and
      // `getQuestionsBySkillIds` signature, so the rest of the logic is shared.
      const targetedQuery = section === 'rw' ? getRWTargetedWeaknessSet : getTargetedWeaknessSet;
      const fallbackQuery = section === 'rw' ? getRWQuestionsBySkillIds : getQuestionsBySkillIds;

      // Drill-routing precision: pass `missedPatterns` through so the cascade
      // can fire Tier 1 (exact SAT Pattern) instead of falling all the way to
      // Tier 3 (skill alias). When the chip is viable on this section, restrict
      // to the chip's single pattern so the drill content matches the chip's
      // "Practicing: <Pattern>" claim. Without restriction, the chip names one
      // pattern but the pool unions every missed pattern on the weakness — a
      // student opens "Scatterplots Practice" and gets mean-of-running-times
      // problems because skillId 'Scatterplots' aliases to 'calculate-mean'
      // in Tier 3 (see SKILL_ALIAS_MAP). R&W goes without chip restriction
      // for now — its drill chip wiring lands in a separate batch.
      // Restrict the drill to the chip's single pattern (both sections now that
      // the chip is section-aware) so the content matches the "Practicing: X"
      // claim. R&W chips resolve against the R&W pattern pool + labels.
      let missedPatterns = Array.isArray(w.missedPatterns) ? w.missedPatterns : undefined;
      const chip = getDrillChipForWeakness({ ...w, section });
      if (chip) missedPatterns = [chip.slug];

      const questions = targetedQuery({
        weakSkills: [{ skillId: w.skillId, domain: w.domain, missedPatterns }],
        difficultyMix: diffMix,
        count: 15,
        excludeIds: answeredQuestionIds,
      }).filter(q => Array.isArray(q.choices) && q.choices.length >= 2);

      if (questions.length === 0) {
        // Fallback: if targeted set is empty (all answered or skill missing
        // from this section's bank), use the basic query without excludes.
        const fallback = fallbackQuery(w.skillId ? [w.skillId] : [], { limit: 15 })
          .filter(q => Array.isArray(q.choices) && q.choices.length >= 2);
        if (fallback.length === 0) return null;
        return { ...w, section, qCount: fallback.length, qIds: fallback.map(q => q.id) };
      }
      return { ...w, section, qCount: questions.length, qIds: questions.map(q => q.id) };
    }).filter(Boolean);
  }, [annotatedWeaknesses, onStartPractice, answeredQuestionIds, studyPlan?.difficultyAnalysis]);

  // FINDING-002: the per-skill diagnostic sentences close with the same
  // boilerplate advice ("Untimed first; bring time pressure back once
  // accuracy holds."), repeated verbatim under every card — the single
  // loudest "generated, not written" signal on the page. When 3+ rows share
  // Section switcher scope: Focus Areas show only the selected section's
  // weaknesses. Computed BEFORE focusDiagnostics so the per-row diagnostic
  // sentences (index-aligned) stay matched to their cards.
  const sectionedFocusRows = useMemo(() => {
    if (sectionFilter === 'all') return skillPracticeRows;
    return skillPracticeRows.filter(w => (w.section === 'rw' ? 'rw' : 'math') === sectionFilter);
  }, [skillPracticeRows, sectionFilter]);

  // Re-drill flagged questions through the SAME 3-tier cascade as focus areas:
  // collapse the flagged items into weakSkills seeds (skillId + unioned
  // missedPatterns) so Tier 1 (exact SAT Pattern) fires instead of the
  // SKILL_ALIAS_MAP-only Tier 3 (see the skill-alias-routing gotcha). Falls back
  // to the flagged questions' own ids when routing yields nothing. Accepts one
  // flag (per-item Re-drill) or many (per-section "Drill all flagged").
  const handleRedrillFlagged = (flags, section) => {
    if (!onStartPractice || !Array.isArray(flags) || flags.length === 0) return;
    const sec = section === 'rw' ? 'rw' : 'math';
    const targetedQuery = sec === 'rw' ? getRWTargetedWeaknessSet : getTargetedWeaknessSet;
    const seeds = toDrillSeeds(flags);
    const weakSkills = seeds
      .filter(s => s.skillId || (s.missedPatterns && s.missedPatterns.length))
      .map(s => ({ skillId: s.skillId, domain: s.domain, missedPatterns: s.missedPatterns }));
    let questions = [];
    if (weakSkills.length) {
      // Do NOT exclude answered ids — revisiting is the whole point of a flag.
      questions = targetedQuery({
        weakSkills,
        count: Math.max(8, Math.min(20, flags.length * 4)),
      }).filter(q => Array.isArray(q.choices) && q.choices.length >= 2);
    }
    const flaggedIds = flags.map(f => f.questionId).filter(Boolean);
    const questionIds = questions.length ? questions.map(q => q.id) : flaggedIds;
    if (!questionIds.length) {
      showToast({ type: 'info', message: 'No matching drill questions available yet.' });
      return;
    }
    const primary = flags.find(f => f.skillId) || flags[0];
    onStartPractice(null, null, {
      questionIds,
      label: flags.length === 1 ? 'Flagged question review' : 'Flagged questions review',
      weakness: primary
        ? { skillId: primary.skillId, domain: primary.domain, section: sec, missedPatterns: primary.missedPatterns || undefined }
        : undefined,
    });
  };

  // a closing sentence, hoist it to ONE section-level coach line and strip
  // it from each card. Pure render-time presentation; plan data untouched.
  const focusDiagnostics = useMemo(() => {
    const rows = sectionedFocusRows.map(w => formatDiagnosticSentence(w) || '');
    const lastSentence = (t) => {
      const m = t.trim().match(/[^.!?]+[.!?]$/);
      return m ? m[0].trim() : '';
    };
    const counts = new Map();
    rows.forEach(t => {
      const s = lastSentence(t);
      if (s) counts.set(s, (counts.get(s) || 0) + 1);
    });
    let shared = '';
    counts.forEach((n, s) => {
      if (n >= 3 && n > (counts.get(shared) || 0)) shared = s;
    });
    const perRow = rows.map(t => {
      const trimmed = t.trim();
      if (shared && trimmed.endsWith(shared)) {
        return trimmed.slice(0, trimmed.length - shared.length).trim();
      }
      return trimmed;
    });
    return { shared, perRow };
  }, [sectionedFocusRows]);

  // ── Activity row ─────────────────────────────────────────────────────
  // hideDay suppresses the day chip when the row is rendered under a day
  // header in the weekly schedule (the day is already the group label).
  // ── Activity row — weekly "session" task card (week-carousel design) ──
  // Checkbox + day/icon column + title + subject/type/NEEDS FOCUS chips + an
  // action (Launch / Start test / Tips dropdown). Tip cards expand their
  // coaching bullets inline. Edit mode swaps the action for reschedule / skip /
  // remove controls. Tip-open state lives in the parent (expandedTips) because
  // ActivityRow is re-created each render.
  const ActivityRow = ({ act, weekIdx, actIdx, hideDow = false, defaultOpen = false, skin = 'classic' }) => {
    const done = act.completed;
    const isTip = act.type === 'strategy' || act.type === 'review';
    const isTest = act.type === 'test';
    // The starter plan's check-in launches the diagnostic, not a full test —
    // label it as such so the button matches the card's promise.
    const isDiagnostic = isTest && act.activityType === 'miniDiagnostic';
    const isNavigable = act.type === 'lesson' || act.type === 'practice' || act.type === 'test';
    const meta = TYPE_META[act.type] || TYPE_META.lesson;
    const chip = chipColorsFor(act);
    const section = act.type === 'practice' ? activitySection(act) : null;
    const tips = act.tips || [];
    const tipKey = `${weekIdx}:${actIdx}`;
    const tipsOpen = !!expandedTips[tipKey];
    // The "Practice:" / "Drill:" prefix is redundant beside the type label.
    const title = (act.title || '').replace(/^(Practice|Drill)\s*:\s*/i, '');
    const sp = (!done && act.skillId && skillProgress) ? skillProgress[act.skillId] : null;
    const needsFocus = !!(sp && sp.attempts >= 2 && (sp.mastery ?? (sp.correct / sp.attempts * 100)) < 40);
    // Summary chip (minutes + estimated question count) + the expandable
    // per-skill breakdown. Breakdown is offered only for open practice cards;
    // today's cards start open (defaultOpen), the rest collapsed.
    const summary = activitySummary(act);
    const breakdown = (act.type === 'practice' && !done && !act.custom)
      ? activityBreakdown(act, skillProgress, {
          // Drill evidence must postdate THIS plan — measurement seeding
          // otherwise fabricates day-one round progress.
          sinceMs: studyPlan?.generatedAt ? Date.parse(studyPlan.generatedAt) || null : null,
        })
      : [];
    const hasBreakdown = breakdown.length > 0;
    const bdOpen = (tipKey in expandedBreakdowns) ? expandedBreakdowns[tipKey] : defaultOpen;

    // ── Simple skin (Plan v3 page, 2026-08-22) ─────────────────────────
    // Acely-grammar card: title, one line, one chip, one button. Same
    // handlers, same edit controls, same rounds/tips — only the dressing
    // changes. Rounds open by default ONLY when the session is in progress
    // (otherwise every card grows a sub-row — the clutter the founder
    // flagged); the chip is the toggle.
    if (skin === 'simple') {
      // The role prefix ("Push past shaky:", "Keep sharp:") is redundant next
      // to the because-line that spells it out — the card leads with the skill.
      const simpleTitle = title.replace(/^(Push past shaky|Keep sharp)\s*:\s*/i, '');
      const inProgress = hasBreakdown && breakdown.some((r) => r.status === 'active' || r.status === 'done');
      const bdOpenSimple = (tipKey in expandedBreakdowns) ? expandedBreakdowns[tipKey] : inProgress;
      const sectionLabel = section === 'rw' ? 'Reading & Writing' : (section === 'math' ? 'Math' : null);
      const chipParts = [];
      if (summary?.minutes) chipParts.push(`${summary.minutesEstimated ? '~' : ''}${summary.minutes} min`);
      if (summary?.questions != null) chipParts.push(`${summary.questionsEstimated ? '~' : ''}${summary.questions} questions`);
      if (sectionLabel) chipParts.push(sectionLabel);
      const chipText = chipParts.join(' · ');
      const canLaunch = !done && (
        isNavigable
        || (act.activityType === 'pacingDrill' && typeof onStartPacing === 'function')
        || (act.activityType === 'testMissReview' && !!act.testId && typeof onReviewTestWrong === 'function')
      );
      const launchLabel = isDiagnostic ? 'Start diagnostic' : isTest ? 'Start test' : (inProgress ? 'Continue' : 'Start');
      return (
        <div className={`sp-s-card${done ? ' is-done' : ''}${act.skipped ? ' is-skipped' : ''}`}>
          <div className="sp-s-head">
            <button
              type="button"
              className={`sp-s-check${done ? ' is-done' : ''}`}
              aria-label={done ? `Mark "${title}" incomplete` : `Mark "${title}" complete`}
              onClick={(e) => handleToggle(e, weekIdx, actIdx, done)}
            >
              {done && <CheckIcon size={11} color="#fff" />}
            </button>
            <h3 className="sp-s-title"><MathText>{simpleTitle}</MathText></h3>
          </div>
          {!done && (act.because || act.subtitle) && (
            <p className="sp-s-sub">{act.because || act.subtitle}</p>
          )}
          <div className="sp-s-row">
            <div className="sp-s-chips">
              {done ? (
                <span className="sp-s-chip is-done">Practice complete</span>
              ) : (chipText && (hasBreakdown ? (
                <button
                  type="button"
                  className="sp-s-chip is-toggle"
                  aria-expanded={bdOpenSimple}
                  onClick={() => setExpandedBreakdowns((m) => ({ ...m, [tipKey]: !bdOpenSimple }))}
                >
                  {chipText}
                  <span className={`sp-task-summary-chev${bdOpenSimple ? ' is-open' : ''}`} aria-hidden="true"><ChevronDownIcon size={12} color="currentColor" /></span>
                </button>
              ) : (
                <span className="sp-s-chip">{chipText}</span>
              )))}
              {act.custom && <span className="sp-s-chip is-ghost">Your task</span>}
              {act.skipped && <span className="sp-s-chip is-ghost">Skipped</span>}
            </div>
            {editMode ? (
              <div className="sp-edit-controls" onClick={(e) => e.stopPropagation()}>
                <select
                  className="sp-edit-day"
                  value={EDIT_DAYS.includes(act.day) ? act.day : 'Monday'}
                  onChange={(e) => handleReschedule(weekIdx, actIdx, e.target.value)}
                  aria-label={`Move "${title}" to a different day`}
                >
                  {EDIT_DAYS.map((d) => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
                </select>
                <button type="button" className="sp-edit-btn" onClick={() => handleToggleSkip(weekIdx, actIdx, act.skipped)}>
                  {act.skipped ? 'Unskip' : 'Skip'}
                </button>
                <button type="button" className="sp-edit-btn sp-edit-remove" aria-label={`Remove "${title}"`} onClick={() => handleRemoveActivity(weekIdx, actIdx)}>
                  Remove
                </button>
              </div>
            ) : canLaunch ? (
              <button type="button" className="sp-s-btn" onClick={(e) => { e.stopPropagation(); handleGo(act); }}>
                {launchLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            ) : (isTip && tips.length > 0 && (
              <button type="button" className="sp-s-btn is-ghost" aria-expanded={tipsOpen} onClick={() => toggleTip(tipKey)}>
                Tips
                <span className={`sp-task-tipschev${tipsOpen ? ' is-open' : ''}`} aria-hidden="true"><ChevronDownIcon size={14} color="currentColor" /></span>
              </button>
            ))}
          </div>
          {hasBreakdown && bdOpenSimple && (
            <div className="sp-s-rounds">
              {breakdown.map((r, ri) => (
                <div className="sp-s-round" key={ri}>
                  <span className={`sp-round-dot is-${r.status}`} aria-hidden="true">
                    {r.status === 'done' && <CheckIcon size={12} color="#fff" />}
                  </span>
                  <span className="sp-s-round-label"><MathText>{r.label}</MathText></span>
                  <span className={`sp-s-round-prog${r.status === 'active' ? ' is-active' : ''}`}>{r.prog} questions</span>
                </div>
              ))}
            </div>
          )}
          {isTip && tipsOpen && tips.length > 0 && (
            <ul className="sp-task-tips">
              {tips.map((tip, i) => (
                <li key={i} className="sp-task-tip"><MathText>{tip}</MathText></li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div className={`sp-task${done ? ' is-done' : ''}${(needsFocus && !done) ? ' is-needsfocus' : ''}${act.skipped ? ' is-skipped' : ''}`}>
        <div className="sp-task-main">
          <button
            type="button"
            className={`sp-task-check${done ? ' is-done' : ''}`}
            aria-label={done ? `Mark "${title}" incomplete` : `Mark "${title}" complete`}
            onClick={(e) => handleToggle(e, weekIdx, actIdx, done)}
          >
            {done && <CheckIcon size={13} color="#fff" />}
          </button>

          <div className={`sp-task-daycol${hideDow ? ' is-icononly' : ''}`}>
            {!hideDow && <span className="sp-task-dow">{(act.day || '').slice(0, 3).toUpperCase()}</span>}
            <span className="sp-task-icon" style={{ background: chip.bg, color: chip.fg }}>
              {activityIcon(act.type)}
            </span>
          </div>

          <div className="sp-task-text">
            <div className="sp-task-title"><MathText>{title}</MathText></div>
            {act.because && !done && (
              <div className="sp-task-because">{act.because}</div>
            )}
            <div className="sp-task-meta">
              {section && <span className={`sp-sec-chip is-${section}`}>{SECTION_CHIP_LABEL[section]}</span>}
              {act.custom && <span className="sp-sec-chip sp-sec-chip-ghost">CUSTOM</span>}
              {act.skipped && <span className="sp-sec-chip sp-sec-chip-ghost">SKIPPED</span>}
              <span className="sp-task-type">{act.custom ? 'Your task' : meta.label}</span>
              {needsFocus && <span className="sp-task-needs">NEEDS FOCUS</span>}
            </div>
            {summary && (hasBreakdown ? (
              <button
                type="button"
                className="sp-task-summary is-toggle"
                aria-expanded={bdOpen}
                onClick={() => setExpandedBreakdowns((m) => ({ ...m, [tipKey]: !bdOpen }))}
              >
                {summary.label}
                <span className={`sp-task-summary-chev${bdOpen ? ' is-open' : ''}`} aria-hidden="true">
                  <ChevronDownIcon size={13} color="currentColor" />
                </span>
              </button>
            ) : (
              <span className="sp-task-summary">{summary.label}</span>
            ))}
          </div>

          {editMode ? (
            <div className="sp-edit-controls" onClick={(e) => e.stopPropagation()}>
              <select
                className="sp-edit-day"
                value={EDIT_DAYS.includes(act.day) ? act.day : 'Monday'}
                onChange={(e) => handleReschedule(weekIdx, actIdx, e.target.value)}
                aria-label={`Move "${title}" to a different day`}
              >
                {EDIT_DAYS.map((d) => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
              </select>
              <button type="button" className="sp-edit-btn" onClick={() => handleToggleSkip(weekIdx, actIdx, act.skipped)}>
                {act.skipped ? 'Unskip' : 'Skip'}
              </button>
              <button type="button" className="sp-edit-btn sp-edit-remove" aria-label={`Remove "${title}"`} onClick={() => handleRemoveActivity(weekIdx, actIdx)}>
                Remove
              </button>
            </div>
          ) : isTip ? (
            tips.length > 0 && (
              <button type="button" className="sp-task-tipsbtn" aria-expanded={tipsOpen} onClick={() => toggleTip(tipKey)}>
                Tips
                <span className={`sp-task-tipschev${tipsOpen ? ' is-open' : ''}`} aria-hidden="true"><ChevronDownIcon size={14} color="currentColor" /></span>
              </button>
            )
          ) : (!done && isNavigable && (
            <button className={`sp-task-action${isTest ? ' is-test' : ''}`} onClick={(e) => { e.stopPropagation(); handleGo(act); }}>
              {isDiagnostic ? 'Start diagnostic' : isTest ? 'Start test' : 'Launch'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          ))}
        </div>

        {hasBreakdown && bdOpen && (
          <div className="sp-task-rounds">
            {breakdown.map((r, ri) => (
              <div className="sp-task-round" key={ri}>
                <span className={`sp-round-dot is-${r.status}`} aria-hidden="true">
                  {r.status === 'done' && <CheckIcon size={12} color="#fff" />}
                </span>
                <span className="sp-task-round-label"><MathText>{r.label}</MathText></span>
                <span className="sp-round-spacer" />
                <span className={`sp-round-prog${r.status === 'active' ? ' is-active' : ''}`}>{r.prog} Q</span>
              </div>
            ))}
          </div>
        )}

        {isTip && tipsOpen && tips.length > 0 && (
          <ul className="sp-task-tips">
            {tips.map((tip, i) => (
              <li key={i} className="sp-task-tip"><MathText>{tip}</MathText></li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // ── Render a week's activities as a flat list ────────────────────────
  // The Monday (00:00) of THIS calendar week — anchor for laying plan weeks
  // onto real dates in the day-grouped schedule.
  const thisMonday = useMemo(() => {
    const now = new Date();
    const dow = now.getDay(); // 0 Sun … 6 Sat
    const m = new Date(now);
    m.setDate(now.getDate() + (dow === 0 ? -6 : 1 - dow));
    m.setHours(0, 0, 0, 0);
    return m;
  }, []);
  // The Monday of a given plan week, offset from this calendar week by how far
  // that plan week sits from the current one.
  const mondayForWeek = (weekIdx) => {
    const m = new Date(thisMonday);
    m.setDate(thisMonday.getDate() + (weekIdx - displayCurrentWeek) * 7);
    return m;
  };

  // Format a week's calendar span as "Jun 22 – 28" (same month) or
  // "Jun 29 – Jul 5" (crossing a month boundary).
  const fmtWeekRange = (monday) => {
    const end = new Date(monday);
    end.setDate(monday.getDate() + 6);
    const m1 = monday.toLocaleString('en-US', { month: 'short' });
    const m2 = end.toLocaleString('en-US', { month: 'short' });
    return m1 === m2
      ? `${m1} ${monday.getDate()} – ${end.getDate()}`
      : `${m1} ${monday.getDate()} – ${m2} ${end.getDate()}`;
  };

  // ── Render one plan week's sessions grouped under day headers ──────────
  // Acely-style organization: each day gets a "Friday, July 3" header, a short
  // plain-language narrative (buildDayNarrative), then that day's cards. Cards
  // in today's group open their breakdown by default. Returns null when the
  // week has no visible sessions so the caller shows the "unlocks" state.
  const renderWeekDays = (week, weekIdx, opts = {}) => {
    // Plan v3 timeline mode: today's sessions render above as the anchored
    // module list, so this shows only what's AHEAD this week; days already
    // behind fold into a one-line summary instead of re-listing.
    const {
      upcomingOnly = false,
      // Simple skin (Plan v3 page): todayOnly renders just today's group;
      // narrative 'today' = up to two sentences, 'short' = one, 'none' = off;
      // reviewSession adds the due-review card at the end of today's list.
      skin = 'classic',
      todayOnly = false,
      narrative: narrativeMode = 'full',
      reviewSession = null,
    } = opts;
    const fullActivities = week?.activities || [];
    // Starter plan, Today panel: the owed diagnostic is today's first session
    // every day until it's taken, whatever weekday it was pinned to. Nothing
    // is measured without it, yet a check-in on a rest day (or a day already
    // behind the student) otherwise fell out of this panel entirely
    // ("Nothing is scheduled for today") — new users couldn't find their
    // diagnostic (founder, 2026-09-17). Same rule as getTodaySlice.
    const pinDiagnostic = todayOnly && isStarterPlan(studyPlan);
    // In edit mode, also surface skipped tasks (greyed) so they can be
    // un-skipped or removed; otherwise hidden.
    const acts = fullActivities
      .map((act, origIdx) => ({
        act: (pinDiagnostic && act?.activityType === 'miniDiagnostic' && !act.completed && !act.skipped)
          ? { ...act, day: todayDayName }
          : act,
        origIdx,
      }))
      .filter(({ act }) => (editMode
        ? (act.type !== 'lesson' && matchesSectionFilter(act, sectionFilter))
        : isVisibleActivity(act)));
    if (acts.length === 0) return null;

    const monday = mondayForWeek(weekIdx);
    const todayStr = new Date().toDateString();

    // Bucket by weekday; anything with an unknown/missing day falls into a
    // single "Anytime this week" group rendered last.
    const byDay = new Map();
    const anytime = [];
    acts.forEach((entry) => {
      const d = entry.act.day;
      if (WEEKDAY_FULL.includes(d)) {
        if (!byDay.has(d)) byDay.set(d, []);
        byDay.get(d).push(entry);
      } else {
        anytime.push(entry);
      }
    });

    let dayGroups = WEEKDAY_FULL
      .filter((d) => byDay.has(d))
      .map((dayName) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + WEEKDAY_FULL.indexOf(dayName));
        return { dayName, date, entries: byDay.get(dayName) };
      });

    // v3 timeline: today and everything ahead render as day groups (today
    // expanded first); days already behind compress to a one-line fold.
    let earlierFold = null;
    if (upcomingOnly) {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const past = dayGroups.filter((g) => g.date < startOfToday);
      dayGroups = dayGroups.filter((g) => g.date >= startOfToday);
      const pastEntries = past.flatMap((g) => g.entries);
      if (pastEntries.length > 0) {
        const doneCount = pastEntries.filter(({ act }) => act.completed).length;
        earlierFold = { total: pastEntries.length, done: doneCount };
      }
      if (dayGroups.length === 0 && anytime.length === 0 && !earlierFold) return null;
    }
    if (todayOnly) {
      dayGroups = dayGroups.filter((g) => g.date.toDateString() === todayStr);
      if (dayGroups.length === 0) return null;
    }

    const renderGroup = ({ key, heading, date, entries }) => {
      const isToday = date ? date.toDateString() === todayStr : false;
      const dayActs = entries.map((e) => e.act);
      // Only today's line carries the exam-proximity nudge — repeating it under
      // every day header would read as noise. Non-today days lead with their
      // weekday name so they don't read as if they were today.
      const narrative = date
        ? buildDayNarrative({
            activities: dayActs,
            weaknesses: annotatedWeaknesses,
            daysUntilTest: isToday ? daysUntilTest : null,
            dayLabel: isToday ? 'Today' : heading.split(',')[0],
          })
        : '';
      if (skin === 'simple') {
        const coach = narrativeMode === 'none' ? '' : firstSentences(narrative, narrativeMode === 'today' ? 2 : 1);
        const review = isToday && reviewSession?.sessionSize > 0 && typeof onStartReview === 'function' ? reviewSession : null;
        return (
          <section className="sp-s-day" key={key}>
            <div className="sp-s-dayhead">
              <h2 className="sp-s-daytitle">{heading}</h2>
              {isToday && !todayOnly && <span className="sp-day-today">Today</span>}
              <span className="sp-s-daycount">{entries.length} {entries.length === 1 ? 'session' : 'sessions'}</span>
            </div>
            {coach && <p className="sp-s-coach">{coach}</p>}
            <div className="sp-s-list">
              {entries.map(({ act, origIdx }) => (
                <ActivityRow key={origIdx} act={act} weekIdx={weekIdx} actIdx={origIdx} hideDow skin="simple" />
              ))}
              {review && (
                <div className="sp-s-card is-review">
                  <div className="sp-s-head">
                    <span className="sp-s-check is-static" aria-hidden="true" />
                    <h3 className="sp-s-title">Review {review.sessionSize} due {review.sessionSize === 1 ? 'question' : 'questions'}</h3>
                  </div>
                  <p className="sp-s-sub">Questions you missed before, back at the right moment to stick.</p>
                  <div className="sp-s-row">
                    <span className="sp-s-chip">{review.estimatedMinutes ? `~${review.estimatedMinutes} min · ` : ''}{review.sessionSize} questions</span>
                    <button type="button" className="sp-s-btn is-ghost" onClick={() => onStartReview(review.items)}>
                      Start review
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      }
      return (
        <section className="sp-daygroup" key={key}>
          <div className="sp-day-head">
            <span className="sp-day-date">{heading}</span>
            {isToday && <span className="sp-day-today">Today</span>}
            <span className="sp-day-count">{entries.length} {entries.length === 1 ? 'session' : 'sessions'}</span>
          </div>
          {narrative && <p className="sp-day-narrative">{narrative}</p>}
          <div className="sp-tasklist">
            {entries.map(({ act, origIdx }) => (
              <ActivityRow key={origIdx} act={act} weekIdx={weekIdx} actIdx={origIdx} hideDow defaultOpen={isToday} />
            ))}
          </div>
        </section>
      );
    };

    return (
      <div className={skin === 'simple' ? 'sp-s-daygroups' : 'sp-daygroups'}>
        {earlierFold && (
          <p className="sp-earlier-fold">
            Earlier this week: {earlierFold.done} of {earlierFold.total} session{earlierFold.total === 1 ? '' : 's'} done
          </p>
        )}
        {dayGroups.map(({ dayName, date, entries }) => renderGroup({
          key: dayName,
          heading: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
          date,
          entries,
        }))}
        {anytime.length > 0 && renderGroup({ key: 'anytime', heading: 'Anytime this week', date: null, entries: anytime })}
      </div>
    );
  };

  // ── Week carousel (Weekly View) ──────────────────────────────────────
  // selectedWeek is null until the user navigates; default to the current week.
  const selWeek = selectedWeek == null
    ? displayCurrentWeek
    : Math.min(Math.max(0, selectedWeek), weeks.length - 1);
  const shownWeek = weeks[selWeek];
  const shownVisible = visibleActivities(shownWeek);
  const shownDone = shownVisible.filter((a) => a.completed).length;
  const shownTotal = shownVisible.length;
  const shownRange = fmtWeekRange(mondayForWeek(selWeek));
  const isCurrentShown = selWeek === displayCurrentWeek;
  // Does the shown week have ANY real sessions (ignoring the section filter)?
  // Distinguishes a genuinely empty "unlocks later" week from one filtered out.
  const shownAnyTasks = (shownWeek?.activities || []).some((a) => a && a.type !== 'lesson' && !a.skipped);
  const pacingWillShow = pacingTelemetry.length > 0 && !testDateIsPast;
  const hasBeyond = reviewDue > 0 || pacingWillShow || flaggedTotal > 0;

  // ── Week-picker dropdown metadata ─────────────────────────────────────
  // Whether the plan carries the first-plan "Take Practice Test 2" checkpoint —
  // if so, empty (not-yet-unlocked) weeks name that unlock condition rather
  // than showing fake content, honoring the 2-week first-plan cap.
  const pt2Checkpoint = useMemo(
    () => weeks.some((w) => (w?.activities || []).some(
      (a) => a && a.type === 'test' && /Practice Test 2/i.test(a.title || ''))),
    [weeks],
  );
  // Per-week menu meta: session progress (filter-independent for stable nav),
  // or the unlock note for a week with no real sessions yet.
  const weekMenuMeta = (wk, wi) => {
    const real = (wk?.activities || []).filter((a) => a && a.type !== 'lesson' && !a.skipped);
    const hasTasks = real.length > 0;
    return {
      isCurrent: wi === displayCurrentWeek,
      hasTasks,
      done: real.filter((a) => a.completed).length,
      total: real.length,
      unlockNote: hasTasks ? '' : (pt2Checkpoint ? 'After Test 2' : 'Unlocks later'),
      range: fmtWeekRange(mondayForWeek(wi)),
    };
  };

  // ── Plan modules (Today panel) ────────────────────────────────────────
  // The focus-area weaknesses, rendered as the redesigned "module cards with
  // rounds". sectionedFocusRows already respects the Math/R&W filter, and
  // focusDiagnostics.perRow is index-aligned to it.
  const modules = useMemo(
    () => sectionedFocusRows.map((w, i) =>
      buildPlanModule(w, i, skillProgress, focusDiagnostics.perRow[i])),
    [sectionedFocusRows, skillProgress, focusDiagnostics]
  );
  const visibleModules = showAllFocus ? modules : modules.slice(0, 3);

  const todayLongDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  // practicedDayKeys are LOCAL-time day keys, so the month prefix must come
  // from local date parts — a UTC prefix (toISOString) undercounts on the
  // last evening of each month in US timezones.
  const nowLocal = new Date();
  const ymPrefix = `${nowLocal.getFullYear()}-${String(nowLocal.getMonth() + 1).padStart(2, '0')}`;
  const practicedThisMonth = Array.from(practicedDayKeys || []).filter(
    (k) => typeof k === 'string' && k.startsWith(ymPrefix)
  ).length;

  // One focus "module card" with its drill rounds. Launches the same assigned
  // drill the legacy Focus Area "Practice" button did (qIds + weakness).
  const renderModule = (m, idx) => (
    <div className="sp-module" key={m.weakness?.skillId || idx}>
      <div className="sp-module-top">
        <span className={`sp-module-tag is-${m.section}`}>{m.tag}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {m.domain && <div className="sp-module-domain">{domainLabel(m.domain)}</div>}
          <div className="sp-module-titlerow">
            <span className="sp-module-title"><MathText>{m.title}</MathText></span>
            {typeof m.acc === 'number' && (
              <span className={`sp-module-acc is-${m.accBand}`}>{m.acc}%</span>
            )}
          </div>
          {m.desc && <div className="sp-module-desc"><MathText>{m.desc}</MathText></div>}
        </div>
      </div>
      <div className="sp-module-actions">
        {m.status === 'complete' ? (
          <span className="sp-module-complete-badge">
            <CheckIcon size={14} color="currentColor" /> PRACTICE COMPLETE
          </span>
        ) : (
          <span className="sp-module-meta">{m.meta}</span>
        )}
        <button
          type="button"
          className={`sp-module-btn ${m.status === 'complete' ? 'is-review' : m.status === 'progress' ? 'is-continue' : 'is-start'}`}
          onClick={() => (m.qIds.length
            ? onStartPractice(null, null, {
                questionIds: m.qIds,
                source: 'study-plan-assigned',
                label: `${m.title} Practice`,
                weakness: m.weakness,
              })
            : showToast({ type: 'info', message: 'No drill set is available for this skill yet.' }))}
        >
          {m.status === 'complete' ? 'Review session' : m.status === 'progress' ? 'Continue' : 'Start'}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
      <div className="sp-rounds">
        {m.rounds.map((r, ri) => (
          <div className="sp-round" key={ri}>
            <span className={`sp-round-dot is-${r.status}`} aria-hidden="true">
              {r.status === 'done' && <CheckIcon size={13} color="#fff" />}
            </span>
            <span className="sp-round-label">{r.label}</span>
            {r.keyFocus && <span className="sp-round-key">KEY FOCUS</span>}
            <span className="sp-round-spacer" />
            <span className={`sp-round-prog${r.status === 'active' ? ' is-active' : ''}`}>{r.prog} Q</span>
          </div>
        ))}
      </div>
      {m.adaptiveLine && (
        <p className="sp-card-diagnostic sp-card-adaptive"><MathText>{m.adaptiveLine}</MathText></p>
      )}
      {m.predictedStruggle && (
        <p className="sp-prediction-flag">
          Prioritized in your plan — flagged as a likely struggle area on your next test{m.predictedStruggle.reason ? ` (${m.predictedStruggle.reason.toLowerCase()})` : ''}.
        </p>
      )}
    </div>
  );

  // ====================================================================
  // RENDER
  // ====================================================================

  // Shared edit-plan controls — rendered in the legacy Weekly tab AND the
  // v3 timeline (the tab that used to own them is gone when ff:planV3 is on).
  const editPlanControls = (
    <>
        {/* Edit-plan toggle (legacy Weekly view; Plan v3 puts it in the title bar) */}
        {onEditPlan && !ffPlanV3 && (
          <div className="sp-edit-bar">
            <button
              type="button"
              className={`sp-edit-toggle${editMode ? ' is-active' : ''}`}
              aria-pressed={editMode}
              onClick={() => { setEditMode((v) => !v); setAddTaskWeek(null); }}
            >
              {editMode ? 'Done editing' : 'Edit plan'}
            </button>
          </div>
        )}

        {/* Plan Settings — focus areas + pacing (edit mode only) */}
        {editMode && (
          <div className="sp-edit-settings">
            <div className="sp-edit-section">
              <div className="sp-edit-section-title">Focus areas</div>
              <div className="sp-focus-chips">
                {(studyPlan.weaknesses || []).map((w) => (
                  <span key={w.skillId} className="sp-focus-chip">
                    {w.skill}
                    <button type="button" aria-label={`Remove ${w.skill} from focus areas`} onClick={() => handleRemoveFocus(w.skillId)}>×</button>
                  </span>
                ))}
              </div>
              {addableFocusSkills.length > 0 && (
                <select
                  className="sp-focus-add"
                  value=""
                  aria-label="Add a focus area"
                  onChange={(e) => {
                    const gap = addableFocusSkills.find((g) => g.skillId === e.target.value);
                    if (gap) handleAddFocus(gap);
                  }}
                >
                  <option value="" disabled>+ Add a focus skill…</option>
                  {addableFocusSkills.map((g) => (
                    <option key={g.skillId} value={g.skillId}>{g.skillName || g.skill || g.skillId}</option>
                  ))}
                </select>
              )}
            </div>

            {planSchedule?.days && (
              <div className="sp-edit-section">
                <div className="sp-edit-section-title">Your study days</div>
                <div className="sp-pacing-row">
                  <div className="sp-pacing-opts" role="group" aria-label="Days of the week you study">
                    {WEEKDAY_FULL.map((d) => {
                      const on = (planSchedule.days[d] || 0) > 0;
                      return (
                        <button
                          key={d}
                          type="button"
                          className={`sp-pacing-opt${on ? ' is-active' : ''}`}
                          aria-pressed={on}
                          onClick={() => handleToggleDay(d)}
                        >{d.slice(0, 3)}</button>
                      );
                    })}
                  </div>
                </div>
                <div className="sp-pacing-hint">
                  {scheduledDayNames(planSchedule).length} days a week · your plan schedules work only on these days
                </div>
              </div>
            )}

            <div className="sp-edit-section">
              <div className="sp-edit-section-title">Pacing</div>
              <div className="sp-pacing-row">
                <span className="sp-pacing-label">Minutes per day</span>
                <div className="sp-pacing-opts">
                  {[20, 35, 50, 75, 100].map((m) => {
                    const cur = studyPlan.summary?.stats?.minutesPerDay || studyPlan.intensityConfig?.minutesPerDay || 30;
                    return (
                      <button
                        key={m}
                        type="button"
                        className={`sp-pacing-opt${cur === m ? ' is-active' : ''}`}
                        onClick={() => handlePacing(m, studyPlan.userPrefs?.examDate || studyPlan.examDate || null)}
                      >{m}</button>
                    );
                  })}
                </div>
              </div>
              <div className="sp-pacing-row">
                <span className="sp-pacing-label">Test date</span>
                <input
                  type="date"
                  className="sp-pacing-date"
                  value={(studyPlan.userPrefs?.examDate || studyPlan.examDate || '').slice(0, 10)}
                  onChange={(e) => handlePacing(studyPlan.summary?.stats?.minutesPerDay || studyPlan.intensityConfig?.minutesPerDay || 30, e.target.value || null)}
                />
              </div>
            </div>
          </div>
        )}
    </>
  );

  return (
    <div className="study-plan-dashboard sp-with-rail" data-theme="light">
      <div className="sp-main">

      {studyPlan?.planSource === 'onboarding-starter' && (
        <div className="sp-starter-note" role="note">
          Starter plan from your answers. Your diagnostic check-in rebuilds it from real evidence.
        </div>
      )}

      {/* ── Title bar ─────────────────────────────────────────────── */}
      {(user?.firstName || user?.targetScore || latestScore !== null) && (
        <header className="sp-titlebar">
          <div className="sp-titlebar-id">
            {variant !== 'inline' && <Avatar user={user} size={AVATAR_SIZES.md} />}
            <div style={{ minWidth: 0 }}>
              <h1 className="sp-title">
                {user?.firstName ? `${user.firstName}'s Study Plan` : 'Your Study Plan'}
              </h1>
              <div className="sp-title-meta">
                {latestScore !== null && (
                  <span>
                    <strong>{latestScore}</strong>
                    {isSectionScaleScore(latestScore, { isMultiSection: latestTest?.isMultiSection }) ? ' now' : ' composite'}
                  </span>
                )}
                {user?.testDate && !testDateIsPast && daysUntilTest !== null && (
                  <span>test in <strong>{daysUntilTest} day{daysUntilTest === 1 ? '' : 's'}</strong></span>
                )}
                {user?.targetScore && (
                  <span>path to <strong>{user.targetScore}{user.targetScore <= 800 ? ' Math' : ''}</strong></span>
                )}
              </div>
            </div>
          </div>
          {ffPlanV3 && onEditPlan && (
            <button
              type="button"
              className={`sp-edit-toggle${editMode ? ' is-active' : ''}`}
              aria-pressed={editMode}
              onClick={() => { setEditMode((v) => !v); setAddTaskWeek(null); setActiveView('weeklyView'); }}
            >
              {editMode ? 'Done editing' : 'Edit plan'}
            </button>
          )}
        </header>
      )}

      {/* ── Tabs (+ date pills on the legacy page) ─────────────────── */}
      <div className={`sp-tabs-row${ffPlanV3 ? ' is-simple' : ''}`}>
          <div className="sp-tabs" role="tablist" aria-label="Study plan view">
            <button
              type="button" role="tab"
              aria-selected={activeView === 'todaysTasks'}
              className={`sp-tab${activeView === 'todaysTasks' ? ' is-active' : ''}`}
              onClick={() => setActiveView('todaysTasks')}
            >
              {ffPlanV3 ? "Today's tasks" : "Today's Tasks"}
              {todaysTasksCount > 0 && <span className="sp-tab-count">{todaysTasksCount}</span>}
            </button>
            <button
              type="button" role="tab"
              aria-selected={activeView === 'weeklyView'}
              className={`sp-tab${activeView === 'weeklyView' ? ' is-active' : ''}`}
              onClick={() => setActiveView('weeklyView')}
            >
              {ffPlanV3 ? 'This week' : 'Weekly View'}
              {weeklyViewCount > 0 && <span className="sp-tab-count">{weeklyViewCount}</span>}
            </button>
          </div>
          {!ffPlanV3 && (
          <div className="sp-datepills">
            {practicedThisMonth > 0 && (
              <span className="sp-datepill is-streak">
                {practicedThisMonth} DAY{practicedThisMonth === 1 ? '' : 'S'} PRACTICED
              </span>
            )}
            <span className="sp-datepill">{todayLongDate.toUpperCase()}</span>
          </div>
          )}
      </div>

      {!ffPlanV3 && adaptiveOverlay?.isTriage && (
        <div className="sp-triage-banner" role="status">
          Triage mode: prioritizing your highest-impact skills before test day.
        </div>
      )}

      {/* ════════════ PLAN V3 — simple page: Today's tasks / This week ════════════
          One date, one coach paragraph, one card per session (title · line ·
          chip · button). The week tab holds the rest of the week, plan editing,
          upcoming weeks and the secondary review/pacing surfaces. */}
      {ffPlanV3 && activeView === 'todaysTasks' && (
        <div className="sp-today-panel sp-s-panel">
          {!deltaDismissed && delta && !delta.isFirst && delta.headline && (
            <div className="sp-banner is-info" style={{ marginBottom: '12px' }}>
              <div className="sp-banner-header">
                <span className="sp-banner-title">Plan updated</span>
                <button className="sp-banner-close" onClick={() => {
                  if (studyPlanMeta?.artifactId) localStorage.setItem(`dismissedDelta:${studyPlanMeta.artifactId}`, '1');
                  setDeltaDismissed(true);
                }}>&times;</button>
              </div>
              <div className="sp-banner-content">{delta.headline}</div>
            </div>
          )}
          {(weeks[displayCurrentWeek] && renderWeekDays(weeks[displayCurrentWeek], displayCurrentWeek, {
            todayOnly: true, skin: 'simple', narrative: 'today', reviewSession: todaySlice?.reviewSession,
          })) || (
            <section className="sp-s-day">
              <div className="sp-s-dayhead"><h2 className="sp-s-daytitle">{todayLongDate}</h2></div>
              <p className="sp-s-coach">
                {todaySlice?.kind === 'all-done'
                  ? 'Everything scheduled for today is done. Tomorrow is queued in This week.'
                  : 'Nothing is scheduled for today. Your next sessions are in This week.'}
              </p>
              {todaySlice?.reviewSession?.sessionSize > 0 && typeof onStartReview === 'function' && (
                <div className="sp-s-list">
                  <div className="sp-s-card is-review">
                    <div className="sp-s-head">
                      <span className="sp-s-check is-static" aria-hidden="true" />
                      <h3 className="sp-s-title">Review {todaySlice.reviewSession.sessionSize} due {todaySlice.reviewSession.sessionSize === 1 ? 'question' : 'questions'}</h3>
                    </div>
                    <p className="sp-s-sub">Questions you missed before, back at the right moment to stick.</p>
                    <div className="sp-s-row">
                      <span className="sp-s-chip">{todaySlice.reviewSession.estimatedMinutes ? `~${todaySlice.reviewSession.estimatedMinutes} min · ` : ''}{todaySlice.reviewSession.sessionSize} questions</span>
                      <button type="button" className="sp-s-btn is-ghost" onClick={() => onStartReview(todaySlice.reviewSession.items)}>Start review</button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {ffPlanV3 && activeView === 'weeklyView' && (
        <div className="sp-today-panel sp-s-panel">
          {weeks[displayCurrentWeek] && (
            renderWeekDays(weeks[displayCurrentWeek], displayCurrentWeek, { upcomingOnly: !editMode, skin: 'simple', narrative: 'short' })
              || (
                <div className="sp-today-empty">
                  Nothing scheduled this week — take a test or check-in to refresh your plan.
                </div>
              )
          )}
          {editMode && (
            <div className="sp-add-task">
              {addTaskWeek === displayCurrentWeek ? (
                <div className="sp-add-task-form">
                  <input
                    type="text"
                    className="sp-add-task-input"
                    placeholder="Add your own task (e.g. Redo Test 3 misses)"
                    value={addTaskTitle}
                    onChange={(e) => setAddTaskTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(displayCurrentWeek); }}
                  />
                  <select className="sp-edit-day" value={addTaskDay} onChange={(e) => setAddTaskDay(e.target.value)} aria-label="Day for new task">
                    {EDIT_DAYS.map((d) => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
                  </select>
                  <button type="button" className="sp-edit-btn" onClick={() => handleAddTask(displayCurrentWeek)}>Add</button>
                  <button type="button" className="sp-edit-btn" onClick={() => { setAddTaskWeek(null); setAddTaskTitle(''); }}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="sp-add-task-btn" onClick={() => { setAddTaskWeek(displayCurrentWeek); setAddTaskDay('Monday'); }}>
                  + Add a task
                </button>
              )}
            </div>
          )}
          {editMode && <div style={{ marginTop: '18px' }}>{editPlanControls}</div>}
          {weeks.length > displayCurrentWeek + 1 && (
            <div style={{ marginTop: '18px' }}>
              {weeks.slice(displayCurrentWeek + 1).map((w, offset) => {
                const weekIdx = displayCurrentWeek + 1 + offset;
                const phase = studyPlan?.arc?.phases?.find((p) => p.weekNumbers.includes(w.weekNumber));
                const visibleCount = (w.activities || []).filter(isVisibleActivity).length;
                if (editMode) {
                  return (
                    <div key={w.weekNumber} style={{ marginTop: '14px' }}>
                      <div className="sp-upcoming-week">
                        <span className="sp-upcoming-week-title">Week {w.weekNumber}{w.title ? ` — ${w.title}` : ''}</span>
                        <span className="sp-upcoming-week-meta">{phase ? `${phase.label} · ` : ''}editing</span>
                      </div>
                      {renderWeekDays(w, weekIdx, { skin: 'simple', narrative: 'none' })}
                    </div>
                  );
                }
                return (
                  <div key={w.weekNumber} className="sp-upcoming-week">
                    <span className="sp-upcoming-week-title">
                      Week {w.weekNumber}{w.title ? ` — ${w.title}` : ''}
                    </span>
                    <span className="sp-upcoming-week-meta">
                      {phase ? `${phase.label} · ` : ''}{visibleCount} session{visibleCount === 1 ? '' : 's'}
                      {w.isTestWeek ? ' · full test' : w.isCheckInWeek ? ' · check-in' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ marginTop: '22px' }}>
            <StudyPlanReviewSection
              reviewQueue={reviewQueue}
              onReviewTestWrong={onReviewTestWrong}
              onStartReview={onStartReview}
              flaggedGroups={flaggedGroups}
              onRedrillFlagged={handleRedrillFlagged}
              onUnflagQuestion={onUnflagQuestion}
            />
            <StudyPlanPacingSection
              questionTelemetry={pacingTelemetry}
              struggle={pacingStruggle}
              onStartPacing={onStartPacing}
              testDateIsPast={testDateIsPast}
            />
          </div>
        </div>
      )}

      {/* ════════════ TODAY'S TASKS — legacy tab (flag OFF) ════════════ */}
      {!ffPlanV3 && activeView === 'todaysTasks' && (
        <div className="sp-today-panel">
          <div className="sp-today-head">
            <h2 className="sp-today-date">{todayLongDate}</h2>
            <div className="sp-seg" role="tablist" aria-label="Plan section">
              {SECTION_FILTERS.map((tab) => (
                <button
                  key={tab.id} type="button" role="tab"
                  aria-selected={sectionFilter === tab.id}
                  className={`sp-seg-btn${sectionFilter === tab.id ? ' is-active' : ''}`}
                  onClick={() => setSectionFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {dailyIntro && <p className="sp-today-narrative">{dailyIntro}</p>}
          {(modules.length > 0 ? (
            <>
              <div className="sp-module-list">
                {visibleModules.map((m, idx) => renderModule(m, idx))}
              </div>
              {modules.length > 3 && (
                <button type="button" className="sp-showall" onClick={() => setShowAllFocus((v) => !v)}>
                  {showAllFocus ? 'Show fewer' : `Show all ${modules.length} focus skills`}
                </button>
              )}
            </>
          ) : (
            <div className="sp-today-empty">
              {sectionFilter !== 'all'
                ? `No ${sectionFilter === 'rw' ? 'Reading & Writing' : 'Math'} focus skills flagged right now. Switch to All to see your full plan.`
                : 'No focus skills flagged right now — your latest test came back clean. Take another test to refresh your plan.'}
            </div>
          ))}

          {(todaySlice?.kind === 'rest-day'
            || todaySlice?.kind === 'all-done'
            || todaySlice?.kind === 'plan-complete')
            && comingUpDays.length > 0 && (
            <section className="sp-coming-up" aria-label="Coming up this week" style={{ marginTop: '16px' }}>
              <div className="sp-coming-up-header">
                <span className="sp-coming-up-eyebrow">Coming up this week</span>
                <span className="sp-coming-up-week">Week {displayCurrentWeek + 1}</span>
              </div>
              <div className="sp-coming-up-list">
                {comingUpDays.map((cu) => {
                  const dayShort = cu.day.slice(0, 3).toUpperCase();
                  const sampleTitle = cu.sample?.title || 'Practice';
                  return (
                    <div key={cu.day} className="sp-coming-up-row">
                      <div className="sp-coming-up-day">
                        <span className="sp-coming-up-daychip">{dayShort}</span>
                        {cu.offset === 1 && <span className="sp-coming-up-soon">Tomorrow</span>}
                      </div>
                      <div className="sp-coming-up-text">
                        <div className="sp-coming-up-title">{sampleTitle}</div>
                        <div className="sp-coming-up-meta">
                          {cu.incomplete} of {cu.total} task{cu.total === 1 ? '' : 's'}
                          {cu.incomplete < cu.total && ` · ${cu.total - cu.incomplete} done`}
                        </div>
                      </div>
                      <button type="button" className="sp-coming-up-cta" onClick={() => setActiveView('weeklyView')}>
                        View →
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      )}

      {/* ════════════ WEEKLY VIEW TAB (legacy — flag OFF) ════════════ */}
      {!ffPlanV3 && activeView === 'weeklyView' && (
      <div className="sp-weekly">

        {/* Plan-updated banner (adaptive plan diff) */}
        {!deltaDismissed && delta && !delta.isFirst && delta.headline && (
          <div className="sp-banner is-info">
            <div className="sp-banner-header">
              <span className="sp-banner-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
              </span>
              <span className="sp-banner-title">Plan Updated</span>
              <button className="sp-banner-close" onClick={() => {
                if (studyPlanMeta?.artifactId) localStorage.setItem(`dismissedDelta:${studyPlanMeta.artifactId}`, '1');
                setDeltaDismissed(true);
              }}>&times;</button>
            </div>
            <div className="sp-banner-content">{delta.headline}</div>
            {delta.skillChanges?.length > 0 && (
              <div className="sp-banner-changes">
                {(showAllSkillChanges ? delta.skillChanges : delta.skillChanges.slice(0, 2)).map((sc, i) => {
                  const dotColor = sc.direction === 'improved' ? 'var(--sp-done)'
                    : sc.direction === 'worsened' ? 'var(--sp-error)'
                    : sc.direction === 'new' ? 'var(--sp-orange)'
                    : 'var(--sp-text-3)';
                  const label = (sc.direction === 'improved' || sc.direction === 'worsened')
                    ? `${sc.skill}: ${sc.oldAccuracy}% → ${sc.newAccuracy}%`
                    : sc.direction === 'new'
                    ? `${sc.skill}: new gap found on this test`
                    : `${sc.skill}: was ${sc.oldAccuracy}%, no longer a weakness`;
                  return (
                    <div key={i} className="sp-banner-change">
                      <span className="sp-banner-change-dot" style={{ background: dotColor }} aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  );
                })}
                {delta.skillChanges.length > 2 && (
                  <button type="button" className="sp-banner-morebtn" onClick={() => setShowAllSkillChanges(v => !v)}>
                    {showAllSkillChanges ? 'Show less' : `Show ${delta.skillChanges.length - 2} more`}
                  </button>
                )}
              </div>
            )}
            {delta.scoreChange && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--sp-text-3)' }}>
                Score: {delta.scoreChange.old} → {delta.scoreChange.new} ({delta.scoreChange.delta > 0 ? '+' : ''}{delta.scoreChange.delta} points)
              </div>
            )}
          </div>
        )}

        {delta?.isFirst && (
          <div className="sp-banner is-success">
            <div className="sp-banner-header">
              <span className="sp-banner-icon"><CheckIcon size={14} color="#fff" /></span>
              <span className="sp-banner-title">Your First Study Plan</span>
            </div>
            <div className="sp-banner-content">
              This is your focused starter plan, built from your first test. Work through it, then take Practice Test&nbsp;2 — that gathers the data to unlock your full, more personalized plan.
            </div>
          </div>
        )}

        {/* Adaptive coach notes */}
        {(studyPlan.deltaFromPrevious || studyPlan.persistentWeaknessStrategy) && (
          <div className="sp-notes">
            {studyPlan.deltaFromPrevious && (
              <div className="sp-note">
                <span className="sp-note-eyebrow">Updated since your last test</span>
                <p className="sp-note-text">
                  {deltaExpanded ? deltaText : deltaFirstSentence}
                  {deltaHasMore && (
                    <button type="button" className="sp-note-toggle" onClick={() => setDeltaExpanded(v => !v)}>
                      {deltaExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </p>
              </div>
            )}
            {studyPlan.persistentWeaknessStrategy && (
              <div className="sp-note">
                <span className="sp-note-eyebrow">Stuck skill — different approach needed</span>
                <p className="sp-note-text">
                  {strategyExpanded ? strategyText : strategyFirstSentence}
                  {strategyHasMore && (
                    <button type="button" className="sp-note-toggle" onClick={() => setStrategyExpanded(v => !v)}>
                      {strategyExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {editPlanControls}

        {/* This week — week carousel */}
        <div className="sp-wk">
          <div className="sp-wk-head">
            <button
              type="button"
              className="sp-wk-nav"
              onClick={() => setSelectedWeek(Math.max(0, selWeek - 1))}
              disabled={selWeek === 0}
              aria-label="Previous week"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="sp-wk-id">
              <button
                type="button"
                className="sp-wk-select"
                aria-haspopup="listbox"
                aria-expanded={weekMenuOpen}
                onClick={() => setWeekMenuOpen((v) => !v)}
              >
                <span className="sp-wk-id-top">
                  <span className="sp-wk-label">Week {shownWeek?.weekNumber ?? selWeek + 1}</span>
                  <span className="sp-wk-of">of {weeks.length}</span>
                  {isCurrentShown && <span className="sp-wk-chip">NOW</span>}
                  <span className={`sp-wk-select-chev${weekMenuOpen ? ' is-open' : ''}`} aria-hidden="true">
                    <ChevronDownIcon size={16} color="currentColor" />
                  </span>
                </span>
                {(cleanWeekTitle(shownWeek?.title) || shownWeek?.goalDescription) && (
                  <span className="sp-wk-theme">{cleanWeekTitle(shownWeek?.title) || shownWeek?.goalDescription}</span>
                )}
              </button>
              {weekMenuOpen && (
                <>
                  <div className="sp-wk-menu-backdrop" onClick={() => setWeekMenuOpen(false)} aria-hidden="true" />
                  <ul className="sp-wk-menu" role="listbox" aria-label="Choose a week">
                    {weeks.map((wk, wi) => {
                      const wm = weekMenuMeta(wk, wi);
                      return (
                        <li key={wi} role="option" aria-selected={wi === selWeek}>
                          <button
                            type="button"
                            className={`sp-wk-menu-item${wi === selWeek ? ' is-active' : ''}`}
                            onClick={() => { setSelectedWeek(wi); setWeekMenuOpen(false); }}
                          >
                            <span className="sp-wk-menu-main">
                              <span className="sp-wk-menu-name">Week {wk?.weekNumber ?? wi + 1}</span>
                              <span className="sp-wk-menu-range">{wm.range}</span>
                            </span>
                            {wm.isCurrent ? (
                              <span className="sp-wk-menu-now">Now</span>
                            ) : wm.hasTasks ? (
                              <span className="sp-wk-menu-count">{wm.done}/{wm.total}</span>
                            ) : (
                              <span className="sp-wk-menu-lock">{wm.unlockNote}</span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
            <div className="sp-wk-prog">
              <div className="sp-wk-prog-num">{shownAnyTasks ? `${shownDone} / ${shownTotal} sessions` : 'Unlocks later'}</div>
              <div className="sp-wk-prog-range">{shownRange}</div>
            </div>
            <button
              type="button"
              className="sp-wk-nav"
              onClick={() => setSelectedWeek(Math.min(weeks.length - 1, selWeek + 1))}
              disabled={selWeek === weeks.length - 1}
              aria-label="Next week"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <div className="sp-wk-bar">
            <div className="sp-wk-bar-fill" style={{ width: shownTotal > 0 ? `${Math.round((shownDone / shownTotal) * 100)}%` : '0%' }} />
          </div>

          {shownAnyTasks ? (
            <>
              <div className="sp-wk-sessions-head">
                <span className="sp-wk-sessions-label">This week's sessions</span>
                <div className="sp-seg sp-seg-sm" role="tablist" aria-label="Plan section">
                  {SECTION_FILTERS.map((tab) => (
                    <button
                      key={tab.id} type="button" role="tab"
                      aria-selected={sectionFilter === tab.id}
                      className={`sp-seg-btn${sectionFilter === tab.id ? ' is-active' : ''}`}
                      onClick={() => setSectionFilter(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              {renderWeekDays(shownWeek, selWeek) || (
                <div className="sp-wk-empty">No sessions match this filter — switch to All.</div>
              )}
              {editMode && (
                <div className="sp-add-task">
                  {addTaskWeek === selWeek ? (
                    <div className="sp-add-task-form">
                      <input
                        type="text"
                        className="sp-add-task-input"
                        placeholder="Add your own task (e.g. Redo Test 3 misses)"
                        value={addTaskTitle}
                        onChange={(e) => setAddTaskTitle(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(selWeek); }}
                      />
                      <select className="sp-edit-day" value={addTaskDay} onChange={(e) => setAddTaskDay(e.target.value)} aria-label="Day for new task">
                        {EDIT_DAYS.map((d) => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
                      </select>
                      <button type="button" className="sp-edit-btn" onClick={() => handleAddTask(selWeek)}>Add</button>
                      <button type="button" className="sp-edit-btn" onClick={() => { setAddTaskWeek(null); setAddTaskTitle(''); }}>Cancel</button>
                    </div>
                  ) : (
                    <button type="button" className="sp-add-task-btn" onClick={() => { setAddTaskWeek(selWeek); setAddTaskDay('Monday'); }}>
                      + Add a task
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="sp-wk-empty-state">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <div className="sp-wk-empty-title">Sessions unlock as you go</div>
              <div className="sp-wk-empty-sub">Your next practice test fills this week with targeted work.</div>
            </div>
          )}
        </div>

        {/* Beyond this week — review queue + pacing + past-test review */}
        {hasBeyond && (
          <>
            <div className="sp-beyond-head">
              <span className="sp-beyond-label">Beyond this week</span>
              <div className="sp-beyond-rule" aria-hidden="true" />
            </div>
            <StudyPlanReviewSection
              prominent
              reviewQueue={reviewQueue}
              onReviewTestWrong={onReviewTestWrong}
              onStartReview={onStartReview}
              flaggedGroups={flaggedGroups}
              onRedrillFlagged={handleRedrillFlagged}
              onUnflagQuestion={onUnflagQuestion}
            />
            <StudyPlanPacingSection
              prominent
              questionTelemetry={pacingTelemetry}
              struggle={pacingStruggle}
              onStartPacing={onStartPacing}
              testDateIsPast={testDateIsPast}
            />
          </>
        )}

        {/* How you test — identity insights */}
        {identityInsights.length > 0 && (
          <div>
            <h3 className="sp-section-title">How you test</h3>
            <div className="sp-identity-grid">
              {identityInsights.map((insight) => (
                <div key={insight.key} className="sp-identity-card">
                  <div className="sp-identity-stat">{insight.stat}</div>
                  <div className="sp-identity-label">{insight.label}</div>
                  <p className="sp-identity-text">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <ScoreTrajectory artifact={studyPlanArtifact} />

      </div>
      )}

      </div> {/* /.sp-main */}

      {/* ── Right rail — calendar heatmap + colored summary tiles ────── */}
      <aside className="sp-rail" aria-label="Study plan summary">
        <CalendarMonth practicedDays={practicedDayKeys} testDate={user?.testDate} />

        {latestScore === null && estimatedBaseline && (
          <div className="sp-tile is-score">
            <div className="sp-tile-eyebrow">Estimated Score</div>
            <div className="sp-tile-row">
              <span className="sp-tile-num">{estimatedBaseline.mid}</span>
              {user?.targetScore > 800 && (
                <span className={`sp-tile-delta ${estimatedBaseline.mid >= user.targetScore ? 'is-up' : 'is-down'}`}>
                  {Math.abs(estimatedBaseline.mid - user.targetScore)} {estimatedBaseline.mid >= user.targetScore ? 'above goal' : 'to goal'}
                </span>
              )}
            </div>
            <div className="sp-tile-sub">{estimatedBaseline.low}–{estimatedBaseline.high} from your diagnostic · a full test sharpens it</div>
          </div>
        )}

        {latestScore !== null && (
          <div className="sp-tile is-score">
            <div className="sp-tile-eyebrow">Current Score</div>
            <div className="sp-tile-row">
              <span className="sp-tile-num">{latestScore}</span>
              {scoreDelta !== null && (
                <span className={`sp-tile-delta ${scoreDelta >= 0 ? 'is-up' : 'is-down'}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    {scoreDelta >= 0 ? <path d="M7 17 17 7M9 7h8v8"/> : <path d="M7 7 17 17M17 9v8H9"/>}
                  </svg>
                  {Math.abs(scoreDelta)} pts
                </span>
              )}
            </div>
            {sortedTests.length > 0 && (
              <div className="sp-tile-sub">Across {sortedTests.length} test{sortedTests.length !== 1 ? 's' : ''}</div>
            )}
          </div>
        )}

        {(user?.targetScore || user?.testDate) && (
          <div className="sp-tile-pair">
            {user?.targetScore && (
              <div className="sp-tile is-goal">
                <div className="sp-tile-eyebrow">{goalAchieved ? 'Goal Achieved' : 'Goal Score'}</div>
                <div className="sp-tile-num">{user.targetScore}</div>
                <div className="sp-tile-sub">{goalAchieved ? `+${goalAboveDelta} pts above` : 'From onboarding'}</div>
              </div>
            )}
            {user?.testDate && (
              <div className="sp-tile is-exam">
                <div className="sp-tile-eyebrow">{testDateIsPast ? 'Test Date' : 'Days Until Exam'}</div>
                <div className="sp-tile-num">{testDateIsPast ? '—' : (daysUntilTest ?? '—')}</div>
                <div className="sp-tile-sub">
                  {testDateIsPast
                    ? `Was ${Math.abs(daysUntilTest)} days ago`
                    : parseLocalDate(user.testDate)?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prediction record — "trust this plan" evidence. */}
        {predictionTrust && (
          <div className="sp-tile is-plain">
            <div className="sp-tile-eyebrow">Prediction Record</div>
            <div className="sp-tile-num">{predictionTrust.hits}/{predictionTrust.total}</div>
            <div className="sp-tile-sub">
              {predictionTrust.total === 1
                ? 'test where we called your struggle areas early'
                : 'tests where we called your struggle areas early'}
            </div>
          </div>
        )}

        {/* Live review streak — hidden unless touched today/yesterday. */}
        {reviewStreak && (
          <div className="sp-tile is-plain">
            <div className="sp-tile-eyebrow">Review Streak</div>
            <div className="sp-tile-num">{reviewStreak.current}</div>
            <div className="sp-tile-sub">
              days in a row{reviewStreak.best > reviewStreak.current ? ` · best ${reviewStreak.best}` : ' · personal best'}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default StudyPlanDashboard;
