import React, { useState, useMemo, useEffect } from 'react';
import { showToast } from './ui/Toaster';
import { generateRecommendations } from '../services/recommendationService';
import ScoreSlider from './ScoreSlider';
import StudyPlanDashboard from './StudyPlanDashboard';
import PredictedVsActualCard from './PredictedVsActualCard';
import CalendarMonth from './CalendarMonth';
import { countRemainingTodayTasks } from '../services/selectors/todaySlice';
import { buildLivingDaySlice } from '../services/livingPlan';
import { resolveActivityDrill, pickModuleWeakness } from '../services/activityDrillRouter';
import { summarizePredictions } from '../services/selectors/predictionSummary';
import { getPracticedDayKeys } from '../services/selectors/practicedDays';
import { getMathWeaknesses, getRWWeaknesses } from '../services/selectors/weaknesses';
import { isGoalAchieved, goalDelta } from '../services/selectors/goalProgress';
import { isScoreableAttempt, getLatestTestStats } from '../services/selectors/latestTestStats';
import { getEstimatedBaseline } from '../services/selectors/estimatedBaseline';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { buildPerformanceTiles, buildDiagnosticTiles } from '../services/selectors/performanceTiles';
import { buildHomeTiles } from '../services/selectors/homeTiles';
import { getScoreReportState, getLatestOfficialScore } from '../services/selectors/scoreReport';
import { getUserTestDates, splitTestDates } from '../services/selectors/testDates';
import TestDatePicker from './TestDatePicker';
import ScoreReportCard from './ScoreReportCard';
import TestDayCountdown from './TestDayCountdown';
import WeekPracticeStrip from './WeekPracticeStrip';
import { hasRealTestScore } from '../services/selectors/diagnosticVariant';
import { snapToScale } from '../services/scoring/scaleTables';
import { getDaysUntilTest } from '../services/selectors/daysUntilTest';
import { buildDiagnosisNuances, pickHomeNuance } from '../services/selectors/diagnosisNuances';
import { buildPacingTelemetry } from '../services/selectors/pacingTelemetry';
import { buildPacingSession } from '../services/pacingService';
import { getRecentMisses } from '../services/selectors/recentMisses';
import { buildDailySession } from '../services/dailyReviewEngine';
import { formatPatternLabel } from '../services/selectors/missedPatternLabel';
import { loadPracticeTests, loadMathBank, loadRWBank } from '../data/corpusLoader';
import { trackAddPhotoClicked } from '../services/analyticsService';
import { ClipboardIcon, CameraIcon, MicroscopeIcon, TimerIcon, ArrowRightIcon, BrainIcon, TargetIcon, VideoCameraIcon, CheckCircleIcon, CrossIcon, LockIcon } from '../design/icons';
import { parseLocalDate } from '../utils/localDate';
import { injectAnimations, useCountUp } from '../design/animations';
import { DashboardSkeleton } from './ui/Skeleton';
import Avatar, { AVATAR_SIZES } from './ui/Avatar';
import './StudentDashboard.css';
import './StudentDashboardV2.css';

// Official SAT test dates live in the canonical source: src/data/satTestDates.js
// (import { SAT_TEST_DATES, getUpcomingSATDates, getSATNameFromDate } when the
// dashboard needs an official-date picker; see the inner-onboarding chips).


const StudentDashboard = ({
  user,
  dataLoading = false,
  completedLessons,
  practiceProgress,
  drillDays = [],
  practiceTestResults,
  reviewQueue,
  flaggedQuestions = {},
  onUnflagQuestion,
  adaptiveOverlay = null,
  reviewStreak,
  dueReviewCount = 0,
  onUpdateTestDate,
  onUpdateTargetScore,
  onUpdateCurrentScore,
  onUpdateTargetSchools,
  onStartPractice,
  onStartReview,
  onStartPracticeTest,
  onStartDiagnostic,
  // Plan check-in activity launch (short focus-weighted sitting). Falls back
  // to onStartDiagnostic for callers that don't pass it.
  onStartPlanCheckIn,
  innerOnboardingPending = false,
  onResumeInnerOnboarding,
  onStartPacing,
  onOpenProfile,
  onRetrySimilar,
  onViewFullDiagnosis,
  // Diagnostic-only state: re-open the diagnosis screen the student saw when
  // the diagnostic finished (no practice test yet, so no DiagnosticReport).
  onViewDiagnosis,
  // Nuance actions on the score hero (raise a too-low target, fix a past test
  // date): opens Profile at SAT Goals. Falls back to onOpenProfile.
  onEditGoals,
  // Score prompt after a test date passes (useAuth.recordScoreReport).
  onRecordScoreReport,
  // Full-list date writes (useAuth.updateTestDates) for the inline picker.
  onUpdateTestDates,
  onBrowseLessons,
  onOpenPractice,
  onOpenTutor,
  answeredQuestionIds = [],
  allLessons,
  skillDiagnosticSummary,
  studyPlan,
  studyPlanArtifact,
  studyPlanMeta,
  predictionLog,
  skillProgress,
  onCompleteActivity,
  onUncompleteActivity,
  onEditPlan,
  onReviewTestWrong,
  activeTab: controlledActiveTab,
  onTabChange,
  showCheckInCard = false,
  onStartCheckIn,
  miniDiagnostic = null,
}) => {
  // Tab state is lifted to App when controlled (activeTab + onTabChange) so it
  // survives this component unmounting during a pacing drill / test review and
  // remounting on return — that's what lets a plan-launched flow come back to
  // the Study Plan tab instead of the Dashboard tab. Falls back to local state
  // when mounted without the controlled props.
  const [internalActiveTab, setInternalActiveTab] = useState('dashboard');
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const setActiveTab = onTabChange || setInternalActiveTab;
  // Diagnostic v2 changes the first-run hero's promise copy (40Q adaptive in
  // the real test runner vs the legacy 24Q shell). Same flag App gates the
  // experience on, so copy and experience can never disagree.
  const ffDiagnosticV2 = useFeatureFlag('diagnosticV2');
  // Practice-test resolver for the recent-misses card (Stage 2c of the
  // bundle-split plan). The test catalog is its own async chunk now, so we
  // hold the resolver FUNCTION in state once the chunk arrives — note the
  // updater form: setState(fn) would otherwise CALL the resolver as an
  // updater. Until it lands, recentMisses below short-circuits to [].
  const [resolveTest, setResolveTest] = useState(null);
  useEffect(() => {
    let cancelled = false;
    loadPracticeTests()
      .then((mod) => { if (!cancelled) setResolveTest(() => mod.getPracticeTestById); })
      .catch(() => { /* card stays empty; non-fatal */ });
    return () => { cancelled = true; };
  }, []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // The rail countdown's own copy of the date manager (the hero has another).
  const [countdownManaging, setCountdownManaging] = useState(false);
  const [showCurrentScorePicker, setShowCurrentScorePicker] = useState(false);
  const [tempCurrentScore, setTempCurrentScore] = useState(user?.currentScore || 500);

  const practiceEntries = Object.entries(practiceProgress || {}).filter(([_, p]) => p.bestScore !== undefined);
  // Performance data for the three colorful tiles, derived from the most
  // recent full-length practice test (the only clean, true-count, per-section
  // accuracy source — see services/selectors/performanceTiles.js).
  const performanceTiles = useMemo(
    () => buildPerformanceTiles(practiceTestResults),
    [practiceTestResults],
  );

  const { projectedScore, projectedRange, projectedTestsCount, scoreHistory, latestIsMultiSection } = useMemo(() => {
    if (!practiceTestResults || Object.keys(practiceTestResults).length === 0) {
      return { projectedScore: null, projectedRange: null, projectedTestsCount: 0, scoreHistory: [], latestIsMultiSection: undefined };
    }
    // Recompute each row's best from its REAL attempts — the row-level
    // bestScaledScore can be poisoned by a blank/abandoned submission (IRT
    // floor: composite 400), which would feed the Current Score tile, the
    // projection, and the score-trend chart. Only attempts on the ROW's scale
    // count (a row mixing 200-800 section-era attempts with 400-1600
    // composites must not take its "best" across scales).
    const tests = Object.values(practiceTestResults)
      .map(t => {
        const scoreable = Array.isArray(t.attempts)
          ? t.attempts.filter(a => isScoreableAttempt(a) && !!a.isMultiSection === !!t.isMultiSection)
          : [];
        if (scoreable.length > 0) {
          return { ...t, bestScaledScore: Math.max(...scoreable.map(a => a.scaledScore)) };
        }
        // No attempts array at all (legacy aggregate-only row): trust the
        // stored best. Rows whose every attempt is junk (or off-scale) are dropped.
        return Array.isArray(t.attempts) ? null : t;
      })
      .filter(t => t && t.bestScaledScore)
      .sort((a, b) => {
        const dateA = a.lastAttemptAt?.toDate?.() || new Date(a.lastAttemptAt);
        const dateB = b.lastAttemptAt?.toDate?.() || new Date(b.lastAttemptAt);
        return dateA - dateB;
      });
    if (tests.length === 0) return { projectedScore: null, projectedRange: null, projectedTestsCount: 0, scoreHistory: [], latestIsMultiSection: undefined };

    // Project on ONE consistent scale: the latest test's. Averaging a 200-800
    // section-only row together with a 400-1600 composite produced impossible
    // numbers (e.g. 886, neither a valid section nor composite score). Restrict
    // the basis to same-scale tests before averaging.
    const latestIsMultiSection = !!tests[tests.length - 1]?.isMultiSection;
    const sameScale = tests.filter(t => !!t.isMultiSection === latestIsMultiSection);
    const basis = sameScale.length > 0 ? sameScale : tests;

    const history = basis.map(t => t.bestScaledScore);
    const recentTests = basis.slice(-3).reverse();
    const weights = [0.5, 0.3, 0.2];
    let totalWeight = 0;
    let weightedSum = 0;
    recentTests.forEach((t, i) => {
      const weight = weights[i] || 0.2;
      weightedSum += t.bestScaledScore * weight;
      totalWeight += weight;
    });

    // Center + band, snapped to the 10-point SAT grid and clamped to the valid
    // band for the scale — so the projection is always a real, possible score.
    const center = snapToScale(weightedSum / totalWeight, latestIsMultiSection);
    const halfWidth = latestIsMultiSection ? 40 : 30; // ±1-SE-equivalent (mirrors scoreBand)
    const low = snapToScale(center - halfWidth, latestIsMultiSection);
    const high = snapToScale(center + halfWidth, latestIsMultiSection);

    return {
      projectedScore: center,
      projectedRange: { low, high },
      projectedTestsCount: basis.length,
      scoreHistory: history,
      // Scale of the most recent test, so the goal tile compares like-for-like (1.4).
      latestIsMultiSection,
    };
  }, [practiceTestResults]);

  // Shared selector — one day-count for the SAT date everywhere (CalendarMonth,
  // study-plan hero, and this rail all consume the same signed integer).
  const daysUntilTest = getDaysUntilTest(user?.testDate);
  // Every sitting the student holds; user.testDate is the primary (next one).
  const userTestDates = useMemo(() => getUserTestDates(user), [user?.testDate, user?.testDates]); // eslint-disable-line react-hooks/exhaustive-deps
  const otherTestDates = useMemo(() => {
    const { upcoming } = splitTestDates(userTestDates);
    return upcoming.filter((d) => d !== user?.testDate);
  }, [userTestDates, user?.testDate]);
  const applyTestDates = (dates) => {
    if (typeof onUpdateTestDates === 'function') return onUpdateTestDates(dates);
    if (typeof onUpdateTestDate === 'function') return onUpdateTestDate(dates[0] || null);
    return undefined;
  };

  const recommendations = useMemo(() => {
    return generateRecommendations({
      completedLessons,
      practiceProgress,
      reviewQueue,
      testDate: user?.testDate,
      allLessons
    });
  }, [completedLessons, practiceProgress, reviewQueue, user?.testDate, allLessons]);

  // Today's Tasks slice + session adherence (Day 4 of Acely-parity batch).
  // Day name comes from the user's local clock at component-mount time —
  // no auto-refresh on midnight rollover (the user can refresh).
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = DAY_NAMES[new Date().getDay()];
  // Living slice: today's list reshaped by the newest drill/review evidence
  // (proven skills drop, weakest pending skill pulls forward). Falls back to
  // the plain scheduled slice internally on any error.
  const todaySlice = useMemo(
    () => buildLivingDaySlice(studyPlan, { todayDayName, skillProgress, practiceTestResults, reviewQueue }),
    [studyPlan, todayDayName, skillProgress, practiceTestResults, reviewQueue]
  );
  const hasStudyPlan = !!(studyPlan && Array.isArray(studyPlan.weeks) && studyPlan.weeks.length > 0);
  // First-run (no-data) dashboard: no scored practice test, no study plan AND
  // no completed diagnostic. In this state the protected performance grid +
  // projected chart are already gated off, so we replace the flat "everything
  // is locked" dump with a single welcoming get-started layout (one CTA +
  // goal/exam tiles + what-you'll-unlock). The diagnostic record is checked
  // directly (same "completed" signal the Tests page uses) so a plan-hydration
  // gap — e.g. right after resetting the only practice test — can never tell a
  // measured student to "take your diagnostic" again.
  const hasCompletedDiagnostic = !!miniDiagnostic;
  const noData = !performanceTiles.hasData && !hasStudyPlan && !hasCompletedDiagnostic;
  // Predicted vs Actual (Day 5 ADD B). summarizePredictions returns null when
  // no validated prediction exists yet, so the card hides itself pre-2nd-test.
  const predictionSummary = useMemo(
    () => summarizePredictions(predictionLog, practiceTestResults),
    [predictionLog, practiceTestResults],
  );
  // Acely-polish (Day 1): derived state for the right-rail composition.
  const practicedDayKeys = useMemo(
    () => getPracticedDayKeys({ practiceProgress, practiceTestResults, drillDays }),
    [practiceProgress, practiceTestResults, drillDays],
  );
  // "Current Score" tile = the literal LATEST attempt (matches the diagnostic
  // widget). scoreHistory is best-per-test and stays the basis for the trend +
  // projection only — using it here showed best-of-latest-test, which could
  // disagree with the widget when the latest attempt wasn't the best.
  const latestStats = useMemo(() => getLatestTestStats(practiceTestResults), [practiceTestResults]);
  const latestScore = latestStats ? latestStats.scaledScore : null;
  // Diagnostic v2: the diagnostic's estimated band fills the Current Score
  // hero ONLY until the first real test score exists (selector enforces the
  // outranking rule). Read-time fallback — never written to the profile.
  // Flag-gated: the estimated hero is part of Diagnostic v2's dark ship —
  // legacy v1 records must not light it up on flag-OFF production (that
  // would make the flag no longer a rollback).
  const estimatedBaseline = useMemo(
    () => (ffDiagnosticV2 ? getEstimatedBaseline(miniDiagnostic, practiceTestResults) : null),
    [ffDiagnosticV2, miniDiagnostic, practiceTestResults],
  );
  // Diagnostic v2: between finishing the diagnostic and the first scoreable
  // practice test, the protected snapshot tiles read from the diagnostic —
  // same tiles, same look, source labelled "your diagnostic" — instead of
  // sitting empty above the estimated hero. Full tests outrank (the same
  // rule the estimated hero uses); check-in records never feed them.
  const diagnosticTiles = useMemo(
    () => (ffDiagnosticV2 && !performanceTiles.hasData && !hasRealTestScore(practiceTestResults)
      ? buildDiagnosticTiles(miniDiagnostic)
      : null),
    [ffDiagnosticV2, performanceTiles.hasData, miniDiagnostic, practiceTestResults],
  );
  const tilesFromDiagnostic = !!diagnosticTiles?.hasData;
  // The three snapshot tiles: overall accuracy / consistency / pacing.
  const homeTiles = useMemo(
    () => buildHomeTiles({ miniDiagnostic, practiceTestResults, practiceProgress, drillDays, reviewStreak, studyPlan }),
    [miniDiagnostic, practiceTestResults, practiceProgress, drillDays, reviewStreak, studyPlan],
  );
  // Delta vs the PREVIOUS attempt, from the SAME selector as the headline, so
  // the arrow can never contradict the number (e.g. an up-arrow on a lower
  // retake). getLatestTestStats returns null on a single attempt or a
  // section/composite scale mismatch, and the render already hides null deltas.
  // "Questions you struggled with" (item 16) — wrong answers from the last
  // test, hardest first, each with a retry-similar path into the bank.
  // Empty until the practice-tests chunk delivers the resolver (effect
  // above) — getRecentMisses tolerates a null resolveTest, but rendering
  // stem-less rows for one frame and then re-rendering is worse than
  // rendering the card a beat later.
  const recentMisses = useMemo(
    () => (resolveTest ? getRecentMisses(practiceTestResults, { resolveTest }) : []),
    [practiceTestResults, resolveTest],
  );
  // Diagnostic-state twin of the "Pick up where you struggled" rail card: no
  // test misses exist yet, so the card lists the diagnostic's weakest skills
  // (the starter plan's weaknesses, lowest accuracy first) with a one-tap
  // drill — same card, same rows, a practice path instead of a retry.
  const diagnosticWeakSpots = useMemo(() => {
    if (!tilesFromDiagnostic || recentMisses.length > 0 || !studyPlan) return [];
    // plan.weaknesses is the ground-truth drill shape (can be EMPTY on a
    // strong diagnostic — nothing crossed the weakness bar); plan.skillGaps
    // carries every scored skill the plan is built from, so it's the
    // fallback. Normalize both to { skillId, skill, accuracy, section }.
    const fromWeaknesses = [...getMathWeaknesses(studyPlan), ...getRWWeaknesses(studyPlan)]
      .filter((w) => w && w.skillId)
      .map((w) => ({ skillId: w.skillId, skill: w.skill, accuracy: w.accuracy, section: w.section }));
    const fromGaps = (Array.isArray(studyPlan.skillGaps) ? studyPlan.skillGaps : [])
      .filter((g) => g && g.skillId)
      .map((g) => ({
        skillId: g.skillId,
        skill: g.skillName,
        accuracy: Number.isFinite(g.contentAccuracy) ? g.contentAccuracy : g.testAccuracy,
        section: g.section === 'rw' ? 'rw' : 'math',
      }));
    // Last resort: the plan's own "Push past shaky" reinforcement drills
    // (planRole 'reinforce' — skills that passed the attempt bar but sit
    // 50-74% on the diagnostic). No per-row number here: the activity
    // carries its accuracy only in prose, and skillProgress is all-time
    // (drills + old tests), so a number from it would contradict the plan.
    const fromReinforce = [];
    (studyPlan.weeks || []).forEach((w) => (w?.activities || []).forEach((a) => {
      if (!a || a.planRole !== 'reinforce' || !a.skillId) return;
      fromReinforce.push({ skillId: a.skillId, skill: a.skillName, accuracy: null, section: a.section === 'rw' ? 'rw' : 'math', metaLabel: 'Not yet reliable' });
    }));
    const source = fromWeaknesses.length > 0 ? fromWeaknesses : (fromGaps.length > 0 ? fromGaps : fromReinforce);
    const merged = source.sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));
    const seen = new Set();
    const out = [];
    for (const w of merged) {
      if (seen.has(w.skillId)) continue;
      seen.add(w.skillId);
      out.push(w);
      if (out.length === 3) break;
    }
    return out;
  }, [tilesFromDiagnostic, recentMisses.length, studyPlan]);
  // Tab count badges (Day 1 Acely-polish):
  //   dashboardCount = activities scheduled today that aren't completed
  //   studyPlanCount = total incomplete activities across all weeks
  // countRemainingTodayTasks re-derives from the slice KIND — for 'all-done',
  // slice.activities holds the COMPLETED list, so the old `.length` read kept
  // the badge nagging after the day's work was finished (stale-badge defect).
  const dashboardCount = useMemo(() => countRemainingTodayTasks(todaySlice), [todaySlice]);
  const studyPlanCount = useMemo(() => {
    if (!studyPlan || !Array.isArray(studyPlan.weeks)) return 0;
    return studyPlan.weeks.reduce((sum, w) => {
      const acts = Array.isArray(w?.activities) ? w.activities : [];
      return sum + acts.filter(a => !a.completed).length;
    }, 0);
  }, [studyPlan]);

  const handleSelectCurrentScore = (score) => {
    if (score && onUpdateCurrentScore) {
      onUpdateCurrentScore(score);
    }
    setShowCurrentScorePicker(false);
  };

  const handleRecommendationClick = (rec) => {
    if (!rec || !rec.action) return;
    if (rec.action.type === 'startPractice' && onStartPractice) {
      onStartPractice(rec.action.moduleId, rec.action.sectionName);
    } else if (rec.action.type === 'startReview' && onStartReview) {
      onStartReview(rec.action.questions);
    }
    // 'startLesson' and 'browseModules' branches removed — both routed
    // into the legacy LearnWorkspace flow which is gone.
  };

  // "Or warm up first" link in the day-0 banner. Actionable recommendations
  // (drill / review) run directly; lesson-flavored ones ('startLesson',
  // 'browseModules' — e.g. the day-0 fallback "Start Learning") route to the
  // Videos/lessons view instead of silently no-opping.
  const handleWarmUpClick = (rec) => {
    const actionType = rec?.action?.type;
    if (actionType === 'startPractice' || actionType === 'startReview') {
      handleRecommendationClick(rec);
      return;
    }
    if (onBrowseLessons) onBrowseLessons();
  };

  // Today's Tasks "Start" from the HOME dashboard mount. Routes through the
  // SAME 3-tier lookup as the sidebar Study Plan view (commit 994933e) so
  // both mounts land in AssignedPracticeShell with Tier-1 precision. The
  // bank modules are corpus chunks (bundleGuard), so they're awaited via
  // corpusLoader; the drillChip selector statically imports both banks, so
  // it rides along as a dynamic import too. On any load failure we fall back
  // to the legacy module/section path rather than a dead button.
  const handleStartTodaysActivity = async (activity) => {
    if (!activity || !onStartPractice) return;
    try {
      const [bank, rwBank, chipMod] = await Promise.all([
        loadMathBank(),
        loadRWBank(),
        import('../services/selectors/drillChip'),
      ]);
      const route = resolveActivityDrill(
        {
          activity,
          weaknesses: Array.isArray(studyPlan?.weaknesses) ? studyPlan.weaknesses : [],
          cachedRows: [],
          answeredQuestionIds,
        },
        {
          getTargetedWeaknessSet: bank.getTargetedWeaknessSet,
          getQuestionsBySkillIds: bank.getQuestionsBySkillIds,
          getRWTargetedWeaknessSet: rwBank.getTargetedWeaknessSet,
          getRWQuestionsBySkillIds: rwBank.getQuestionsBySkillIds,
          getDrillChipForWeakness: chipMod.getDrillChipForWeakness,
        },
      );
      if (route?.kind === 'assigned') {
        onStartPractice(null, null, {
          questionIds: route.questionIds,
          source: 'home-todays-tasks',
          label: route.label,
          weakness: route.weakness,
        });
        return;
      }
      if (route?.kind === 'module') {
        // Legacy prescriptive shell — reachable as a FALLBACK only. Hand it the
        // matching weakness (if any) so the drill's diagnostic sentence renders.
        onStartPractice(route.moduleId, route.sectionName, {
          weakness: pickModuleWeakness(activity, Array.isArray(studyPlan?.weaknesses) ? studyPlan.weaknesses : []),
        });
        return;
      }
      // Unroutable activity (no drill pool, no module) — never leave a dead
      // button: send the student to the plan view where the activity's full
      // context (and its Weekly View fallbacks) live.
      showToast({ type: 'info', message: 'No drill set is available for this activity yet — opening your Study Plan.' });
      setActiveTab('studyPlan');
    } catch {
      if (activity?.moduleId) onStartPractice(activity.moduleId, activity.sectionName);
    }
  };

  // Strategy activities (Pacing Reset etc.) carry no moduleId/skillId — they
  // route to the timed pacing runner with a personalized config built from
  // real test telemetry.
  const handleStartStrategyActivity = () => {
    const session = buildPacingSession(buildPacingTelemetry(practiceTestResults));
    const launch = onStartPacing || onStartPracticeTest;
    if (typeof launch === 'function') launch(session.config);
  };

  useEffect(() => { injectAnimations(); }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const animatedScore = useCountUp(projectedScore || user?.currentScore || 0, 800, 300);

  // For the projected-score line draw-on (#15) — skip the reveal entirely for
  // reduced-motion users so the chart just appears static (no delayed flash).
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dismissedDelta = useMemo(() => {
    try { return studyPlanMeta?.artifactId ? localStorage.getItem(`dismissedDelta:${studyPlanMeta.artifactId}`) : null; }
    catch { return null; }
  }, [studyPlanMeta?.artifactId]);

  const buildScorePath = () => {
    if (!scoreHistory || scoreHistory.length === 0) {
      return "M 20 100 Q 60 90, 100 60 T 180 50 T 260 20 L 300 10";
    }
    const minScore = Math.min(...scoreHistory) - 20;
    const maxScore = Math.max(...scoreHistory) + 20;
    const range = maxScore - minScore || 1;
    const points = scoreHistory.map((s, i) => {
      const x = 20 + (i / Math.max(scoreHistory.length - 1, 1)) * 280;
      const y = 110 - ((s - minScore) / range) * 100;
      return { x, y };
    });
    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y} L ${points[0].x + 1} ${points[0].y}`;
    }
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1].x + points[i].x) / 2;
      path += ` C ${cpx} ${points[i - 1].y}, ${cpx} ${points[i].y}, ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const handleAvatarClick = () => {
    trackAddPhotoClicked(user?.uid);
    if (onOpenProfile) onOpenProfile();
  };

  // #9b — while a returning user's data hydrates, show a skeleton instead of
  // flashing the empty/teaser state. Placed after all hooks; a genuinely new
  // account (not loading, no data) falls through to the designed empty states.
  const hasAnyData = !!studyPlan || practiceEntries.length > 0 || performanceTiles.hasData || (Object.keys(practiceTestResults || {}).length > 0);
  if (dataLoading && !hasAnyData) {
    return <DashboardSkeleton />;
  }

  const countdownBlock = (
        <TestDayCountdown
          className="is-header"
          testDate={user?.testDate}
          testDates={userTestDates}
          managing={countdownManaging}
          onManage={(typeof onUpdateTestDates === 'function' || typeof onUpdateTestDate === 'function') ? () => setCountdownManaging((v) => !v) : null}
        >
          <TestDatePicker
            selected={userTestDates}
            allowClear
            onChange={(dates) => { applyTestDates(dates); }}
            onDone={() => setCountdownManaging(false)}
          />
        </TestDayCountdown>
  );
  const renderHeader = (withAside) => (
        <div className="dashboard-header-row">
          <div className="dashboard-header-main">
          <div className="dashboard-greeting-row">
            <button
              type="button"
              className="dashboard-avatar-btn"
              aria-label={user?.photoDataUrl ? 'Open your profile' : 'Add a profile photo'}
              onClick={handleAvatarClick}
            >
              <Avatar user={user} size={AVATAR_SIZES.md} />
              {!user?.photoDataUrl && (
                <span className="dashboard-avatar-camera" aria-hidden="true">
                  <CameraIcon size={11} />
                </span>
              )}
            </button>
            <h1 className="dashboard-greeting">
              {getGreeting()}{user?.firstName ? `, ${user.firstName}` : ''}
            </h1>
          </div>
          {/* D-IH-2: hide the subtitle when the Today's focus section already
              anchors the user — it has its own copy. Brand-new users still see
              the longer pitch. */}
          {!(activeTab === 'dashboard' && hasStudyPlan) && (
            <p className="dashboard-subtitle">
              Study with your personalized AI learning plan and get instant hints, explanations, and more with our AI Tutor.
            </p>
          )}
          <div className="dashboard-top-tabs">
            <button
              className={`dashboard-top-tab${activeTab === 'dashboard' ? ' active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
              {dashboardCount > 0 && (
                <span className="tab-count" aria-label={`${dashboardCount} tasks today`}>
                  {dashboardCount}
                </span>
              )}
            </button>
            <button
              className={`dashboard-top-tab${activeTab === 'studyPlan' ? ' active' : ''}`}
              onClick={() => setActiveTab('studyPlan')}
            >
              Study Plan
              {studyPlanCount > 0 && (
                <span className="tab-count" aria-label={`${studyPlanCount} activities remaining`}>
                  {studyPlanCount}
                </span>
              )}
              {studyPlanArtifact?.delta?.skillChanges?.length > 0 && !dismissedDelta && (
                <span className="tab-badge">Updated</span>
              )}
            </button>
          </div>
          </div>
          {/* Test-day countdown beside the greeting — only when the page isn't
              the v2 grid (Study Plan tab, first-run); on the v2 dashboard the
              countdown + week sparks lead the right rail instead, so the rail
              starts level with the greeting and the left column has no gap
              (founder 2026-08-25). */}
          {withAside && <div className="dashboard-header-aside">{countdownBlock}</div>}
        </div>
  );

  return (
    <div className="student-dashboard-container">
      {/* Greeting — original layout, plus the profile pic (user call
          2026-06-06: the hero-card redesign was reverted; identity is a
          small avatar beside the greeting, nothing more). Avatar click
          opens Profile; camera badge signals add-a-photo when none set.
          firstName, not displayName — the user doc never carries
          displayName, so the old read rendered a nameless greeting. */}
      {(activeTab === 'studyPlan' || noData) && renderHeader(true)}

      {activeTab === 'studyPlan' ? (
        <div className="studyplan-tab-content">
          {studyPlan?.weeks?.length ? (
            <StudyPlanDashboard
              variant="inline"
              studyPlan={studyPlan}
              studyPlanArtifact={studyPlanArtifact}
              studyPlanMeta={studyPlanMeta}
              practiceTestResults={practiceTestResults}
              practiceProgress={practiceProgress}
              drillDays={drillDays}
              skillProgress={skillProgress}
              reviewQueue={reviewQueue}
              flaggedQuestions={flaggedQuestions}
              onUnflagQuestion={onUnflagQuestion}
              adaptiveOverlay={adaptiveOverlay}
              predictionLog={predictionLog}
              answeredQuestionIds={answeredQuestionIds}
              user={user}
              onStartPractice={onStartPractice}
              onStartPracticeTest={onStartPracticeTest}
              onStartDiagnostic={onStartPlanCheckIn || onStartDiagnostic}
              miniDiagnostic={miniDiagnostic}
              onCompleteActivity={onCompleteActivity}
              onUncompleteActivity={onUncompleteActivity}
              onEditPlan={onEditPlan}
              onStartReview={onStartReview}
              onStartPacing={onStartPacing}
              onReviewTestWrong={onReviewTestWrong}
            />
          ) : (
            <div className="studyplan-empty-state">
              <div className="empty-state-icon"><ClipboardIcon size={36} /></div>
              <h3>No Study Plan Yet</h3>
              <p>
                {user?.firstName
                  ? `${user.firstName}, here's where your plan will live. One practice test builds it — which skills cost you points, where you rush, and what to fix first.`
                  : 'Take one practice test. Your plan gets built from every answer — which skills cost you points, where you rush, and what to fix first.'}
              </p>
              <button className="btn-primary" onClick={onStartPracticeTest}>Start Practice Test</button>
            </div>
          )}
        </div>
      ) : (
      <>
      {/* Home v2: the performance snapshot (protected tiles) and the score
          trajectory hero now live inside the v2 grid's left column below —
          see the `.hv2` block in the !noData branch. */}
      {/* Dashboard Content Grid */}
      {noData ? (
        <div className="firstrun-dashboard">
          {/* ── HERO: the diagnostic is the first step. Left = promise + CTA +
              meta; right = the goal/exam panel (the real data a day-0 user has). */}
          <div className="fr-hero">
            <div className="fr-hero-main">
              <span className="fr-badge">First step</span>
              <h2 className="fr-hero-title">Let&rsquo;s find out exactly where you stand.</h2>
              <p className="fr-hero-desc">
                {ffDiagnosticV2
                  ? 'Take an adaptive diagnostic — the real test experience, about half the length of a full SAT. SEVA pinpoints every weak skill, then builds your entire study plan around it.'
                  : 'Take a 15-minute adaptive diagnostic. SEVA pinpoints every weak skill, then builds your entire study plan around it.'}
              </p>
              <div className="fr-hero-actions">
                <button type="button" className="fr-cta" onClick={onStartDiagnostic}>
                  Take your diagnostic <ArrowRightIcon size={17} color="currentColor" />
                </button>
                {innerOnboardingPending && onResumeInnerOnboarding ? (
                  <button type="button" className="fr-cta fr-cta--ghost" onClick={onResumeInnerOnboarding}>
                    Finish onboarding
                  </button>
                ) : null}
                {recommendations[0] ? (
                  <button type="button" className="fr-warmup" onClick={() => handleWarmUpClick(recommendations[0])}>
                    or warm up first: {recommendations[0].title.toLowerCase()}
                  </button>
                ) : null}
              </div>
              <div className="fr-hero-meta">
                {ffDiagnosticV2 ? (
                  <>
                    <span><TimerIcon size={14} color="currentColor" /> ~55 minutes</span>
                    <span><CheckCircleIcon size={14} color="currentColor" /> 40 adaptive questions</span>
                    <span><CrossIcon size={13} color="currentColor" /> half a full test</span>
                  </>
                ) : (
                  <>
                    <span><TimerIcon size={14} color="currentColor" /> ~15 minutes</span>
                    <span><CheckCircleIcon size={14} color="currentColor" /> 24 adaptive questions</span>
                    <span><CrossIcon size={13} color="currentColor" /> not a full test</span>
                  </>
                )}
              </div>
            </div>
            {(user?.targetScore || user?.testDate) && (
              <div className="fr-hero-panel">
                {user?.targetScore && (
                  <div className="fr-stat">
                    <div className="fr-stat-label">Goal Score</div>
                    <div className="fr-stat-num">{user.targetScore}</div>
                    <div className="fr-stat-sub">{user?.targetSchools?.[0]?.name || 'From onboarding'}</div>
                  </div>
                )}
                {user?.testDate && (() => {
                  // Past test date: mirror the main dashboard tile — never
                  // render a raw negative day count.
                  const frTestDateIsPast = daysUntilTest !== null && daysUntilTest < 0;
                  return (
                    <div className="fr-stat">
                      <div className="fr-stat-label">{frTestDateIsPast ? 'Test Date' : 'Days Until Exam'}</div>
                      <div className="fr-stat-num">{frTestDateIsPast ? '—' : (daysUntilTest ?? '—')}</div>
                      <div className="fr-stat-sub">
                        {frTestDateIsPast
                          ? `Was ${Math.abs(daysUntilTest)} days ago — update in settings`
                          : parseLocalDate(user.testDate)?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* ── YOUR PATH: step 1 (diagnostic) is live and routes to the
              mini-diagnostic; steps 2 + 3 are locked previews the diagnostic
              unlocks. The heading names the student's real goal score. */}
          <div className="fr-section-head">
            <h3 className="fr-section-title">{user?.targetScore ? `Your path to ${user.targetScore}` : 'Your path'}</h3>
            <span className="fr-section-sub">Your diagnostic unlocks everything else.</span>
          </div>
          <div className="fr-path">
            <button type="button" className="fr-step is-active" onClick={onStartDiagnostic}>
              <div className="fr-step-top">
                <span className="fr-step-icon is-diag"><MicroscopeIcon size={22} color="currentColor" /></span>
                <span className="fr-step-num is-active">Step 1</span>
              </div>
              <div className="fr-step-title">Take your diagnostic</div>
              <p className="fr-step-desc">See exactly why you miss each question — the skill, the trap, and the fix.</p>
              <span className="fr-step-cta">Start now <ArrowRightIcon size={15} color="currentColor" /></span>
            </button>
            <div className="fr-step is-locked">
              <div className="fr-step-top">
                <span className="fr-step-icon is-plan"><ClipboardIcon size={21} color="currentColor" /></span>
                <span className="fr-step-num is-locked"><LockIcon size={11} color="currentColor" /> Step 2</span>
              </div>
              <div className="fr-step-title">A week-by-week plan</div>
              <p className="fr-step-desc">Built from your diagnostic — what to drill first, scheduled day by day.</p>
              <span className="fr-step-note">Unlocks with your diagnostic <ArrowRightIcon size={14} color="currentColor" /></span>
            </div>
            <div className="fr-step is-locked">
              <div className="fr-step-top">
                <span className="fr-step-icon is-pace"><TimerIcon size={21} color="currentColor" /></span>
                <span className="fr-step-num is-locked"><LockIcon size={11} color="currentColor" /> Step 3</span>
              </div>
              <div className="fr-step-title">Pacing &amp; timing</div>
              <p className="fr-step-desc">Where you rush or stall, with timed drills to fix it.</p>
              <span className="fr-step-note">Unlocks with your diagnostic <ArrowRightIcon size={14} color="currentColor" /></span>
            </div>
          </div>

          {/* ── EXPLORE: tools the student can use right now, before the
              diagnostic. Each card navigates into that feature. */}
          <div className="fr-section-head">
            <h3 className="fr-section-title">Or explore while you&rsquo;re here</h3>
            <span className="fr-section-sub">No test required — get a feel for the app.</span>
          </div>
          <div className="fr-explore">
            <button type="button" className="fr-xcard" onClick={onOpenTutor}>
              <span className="fr-xicon is-tutor"><BrainIcon size={22} color="currentColor" /></span>
              <div className="fr-xtitle">AI Tutor</div>
              <p className="fr-xdesc">Stuck on a question? Get instant hints and step-by-step explanations, any time.</p>
              <span className="fr-xcta">Open AI Tutor <ArrowRightIcon size={14} color="currentColor" /></span>
            </button>
            <button type="button" className="fr-xcard" onClick={onOpenPractice}>
              <span className="fr-xicon is-practice"><TargetIcon size={22} color="currentColor" /></span>
              <div className="fr-xtitle">Practice questions</div>
              <p className="fr-xdesc">Drill any skill on demand — thousands of questions, each with a worked explanation.</p>
              <span className="fr-xcta">Browse practice <ArrowRightIcon size={14} color="currentColor" /></span>
            </button>
            <button type="button" className="fr-xcard" onClick={onBrowseLessons}>
              <span className="fr-xicon is-video"><VideoCameraIcon size={22} color="currentColor" /></span>
              <div className="fr-xtitle">Video lessons</div>
              <p className="fr-xdesc">Short lessons on every SAT skill, from linear equations to grammar rules.</p>
              <span className="fr-xcta">Watch lessons <ArrowRightIcon size={14} color="currentColor" /></span>
            </button>
          </div>
        </div>
      ) : (
      <div className="hv2">
        {/* Edit current-score overlay (kept from v1 — functional) */}
        {showCurrentScorePicker && (
          <ScoreSlider
            value={tempCurrentScore}
            onChange={setTempCurrentScore}
            min={400}
            max={1600}
            label="What's your current SAT score?"
            description="Enter your most recent practice test or official score"
            onSave={() => handleSelectCurrentScore(tempCurrentScore)}
            onCancel={() => setShowCurrentScorePicker(false)}
          />
        )}

        <div className="hv2-grid is-page">
          {renderHeader(false)}
          {/* ============ LEFT COLUMN ============ */}
          <div className="hv2-main">

            {/* PERFORMANCE SNAPSHOT (protected tile design; data from
                selectors/homeTiles — founder 2026-08-24: orange = overall
                accuracy, green = practice consistency, purple = pacing) */}
            {homeTiles.hasData && (
              <div>
                <div className="hv2-section-head">
                  <h2 className="hv2-section-title">Performance snapshot</h2>
                  <span className="hv2-section-meta">{homeTiles.sourceLabel}</span>
                </div>
                <div className="hv2-perf">
                  <div className="hv2-perf-accuracy">
                    <div className="hv2-eyebrow">Overall accuracy</div>
                    <div className="hv2-big-pct">{homeTiles.accuracy.percent}<span>%</span></div>
                    <div className="hv2-perf-detail">{homeTiles.accuracy.detail}</div>
                  </div>
                  <div className="hv2-perf-stack">
                    <div className="hv2-split hv2-split-strong">
                      <div className="hv2-split-num">
                        <span className="hv2-split-figure">{homeTiles.consistency.value}<span className="hv2-split-unit">{homeTiles.consistency.unit}</span></span>
                      </div>
                      <div className="hv2-split-body">
                        <div className="hv2-split-eyebrow">Consistency</div>
                        <div className="hv2-split-name">{homeTiles.consistency.name}</div>
                        <div className="hv2-split-detail">{homeTiles.consistency.detail}</div>
                      </div>
                    </div>
                    <div className="hv2-split hv2-split-opp">
                      {homeTiles.pacing ? (
                        <>
                          <div className="hv2-split-num">
                            <span className="hv2-split-figure">{homeTiles.pacing.value}<span className="hv2-split-unit">{homeTiles.pacing.unit}</span></span>
                          </div>
                          <div className="hv2-split-body">
                            <div className="hv2-split-eyebrow">Pacing</div>
                            <div className="hv2-split-name">{homeTiles.pacing.name}</div>
                            <div className="hv2-split-detail">{homeTiles.pacing.detail}</div>
                          </div>
                        </>
                      ) : (
                        <div className="hv2-split-empty">
                          <div className="hv2-split-eyebrow">Pacing</div>
                          <div className="hv2-empty-hint">Take a timed practice test to measure your pacing</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCORE TRAJECTORY HERO — falls back to the diagnostic's
                estimated band until the first real test score exists
                (Diagnostic v2; the selector enforces full-tests-outrank). */}
            {(latestScore !== null || estimatedBaseline) && (() => {
              const isEstimated = latestScore === null;
              const heroScore = isEstimated ? estimatedBaseline.mid : latestScore;
              const heroIsMultiSection = isEstimated ? true : latestIsMultiSection;
              const goalArgs = { latestScore: heroScore, targetScore: user?.targetScore, isMultiSection: heroIsMultiSection };
              const goalAchieved = isGoalAchieved(goalArgs);
              const goalGap = goalDelta(goalArgs);
              const goalForBar = (user?.targetScore && user.targetScore > 800) ? user.targetScore : 1500;
              // Progress is measured against the 400-1600 composite band (the
              // bar's floor label is "400"), so anchor the fill at 400 — not 0.
              // A raw latestScore/goalForBar made a 400 composite read 27% full.
              const pct = Math.max(0, Math.min(100, Math.round(((heroScore - 400) / (goalForBar - 400)) * 100)));
              const testDateIsPast = daysUntilTest !== null && daysUntilTest < 0;
              // One nuance line, most urgent first: a goal the whole range
              // already clears is a goal that can't steer a plan — say so and
              // hand over the action, instead of "100% of the way there".
              const officialScore = getLatestOfficialScore(user?.scoreReports);
              const heroNuance = pickHomeNuance(buildDiagnosisNuances({
                band: isEstimated ? { low: estimatedBaseline.low, high: estimatedBaseline.high } : null,
                score: (!isEstimated && heroIsMultiSection) ? heroScore : null,
                officialScore: officialScore?.composite ?? null,
                targetScore: user?.targetScore ?? null,
                testDate: user?.testDate ?? null,
                scoreReports: user?.scoreReports ?? null,
              }));
              // Test-date actions open the inline picker right here; only the
              // target still lives on Profile.
              const openGoals = (kind) => {
                if (kind === 'testDate' && (typeof onUpdateTestDates === 'function' || typeof onUpdateTestDate === 'function')) { setShowDatePicker(true); return; }
                if (typeof onEditGoals === 'function') onEditGoals(kind);
                else if (typeof onOpenProfile === 'function') onOpenProfile();
              };
              return (
                <div className="hv2-score-hero">
                  <div className="hv2-score-top">
                    <div>
                      <div className="hv2-score-eyebrow">{isEstimated ? 'Estimated Starting Score' : 'Current Score'}</div>
                      <div className="hv2-score-numrow">
                        <span className="hv2-score-num">{heroScore}</span>
                        {user?.targetScore != null && goalGap != null && (
                          <span className={`hv2-goal-pill${goalAchieved ? ' is-achieved' : ''}`}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
                            {goalAchieved ? `${Math.abs(goalGap)} above target` : `${Math.abs(goalGap)} to goal`}
                          </span>
                        )}
                      </div>
                      {isEstimated && (
                        <div className="hv2-hero-foot-label" style={{ marginTop: '6px' }}>
                          Estimated {estimatedBaseline.low}&ndash;{estimatedBaseline.high} from your diagnostic &middot; a full practice test sharpens it
                        </div>
                      )}
                    </div>
                    {(latestStats?.math?.scaled != null || latestStats?.rw?.scaled != null) && (
                      <div className="hv2-sub-tiles">
                        {latestStats?.math?.scaled != null && (
                          <div className="hv2-sub-tile"><div className="hv2-sub-tile-label">Math</div><div className="hv2-sub-tile-num">{latestStats.math.scaled}</div></div>
                        )}
                        {latestStats?.rw?.scaled != null && (
                          <div className="hv2-sub-tile"><div className="hv2-sub-tile-label">R&amp;W</div><div className="hv2-sub-tile-num">{latestStats.rw.scaled}</div></div>
                        )}
                      </div>
                    )}
                    {isEstimated && (estimatedBaseline.mathBand || estimatedBaseline.rwBand) && (
                      <div className="hv2-sub-tiles">
                        {estimatedBaseline.mathBand && (
                          <div className="hv2-sub-tile"><div className="hv2-sub-tile-label">Math</div><div className="hv2-sub-tile-num">{estimatedBaseline.mathBand.low}&ndash;{estimatedBaseline.mathBand.high}</div></div>
                        )}
                        {estimatedBaseline.rwBand && (
                          <div className="hv2-sub-tile"><div className="hv2-sub-tile-label">R&amp;W</div><div className="hv2-sub-tile-num">{estimatedBaseline.rwBand.low}&ndash;{estimatedBaseline.rwBand.high}</div></div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Only meaningful for a 400-1600 composite: a single-section
                      200-800 latest against a composite goal is apples-to-oranges,
                      so hide the bar entirely when the latest isn't multi-section.
                      The estimated baseline is always composite. */}
                  {user?.targetScore != null && heroIsMultiSection && (
                    <div className="hv2-progress-wrap">
                      <div className="hv2-progress-bar">
                        <div className="hv2-progress-fill" style={{ width: `${pct}%` }} />
                        <div className="hv2-progress-goal" />
                      </div>
                      <div className="hv2-progress-labels">
                        <span className="lo">400</span>
                        <span className="mid">{goalAchieved ? "You're past your goal" : `You're ${pct}% of the way there`}</span>
                        <span className="hi">Goal {goalForBar}</span>
                      </div>
                    </div>
                  )}
                  {heroNuance && (
                    <div className="hv2-hero-note" role="note">
                      <span>{heroNuance.short}</span>
                      {heroNuance.action && (
                        <button type="button" className="hv2-hero-note-link" onClick={() => openGoals(heroNuance.action.kind)}>
                          {heroNuance.action.label}
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                        </button>
                      )}
                    </div>
                  )}
                  {showDatePicker && (
                    <TestDatePicker
                      selected={userTestDates}
                      allowClear
                      onChange={(dates) => { applyTestDates(dates); }}
                      onDone={() => setShowDatePicker(false)}
                    />
                  )}
                  {(user?.testDate || user?.targetSchools?.[0] || officialScore) && (
                    <div className="hv2-hero-footer">
                      {user?.testDate && (
                        <button
                          type="button"
                          className="hv2-hero-foot-item hv2-hero-foot-btn"
                          onClick={() => openGoals('testDate')}
                          title="Change your test date"
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--hv2-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                          <div>
                            <div className="hv2-hero-foot-label">{otherTestDates.length > 0 ? `Exam · ${otherTestDates.length + 1} dates` : 'Exam'}</div>
                            <div className={`hv2-hero-foot-val${testDateIsPast ? ' is-warn' : ''}`}>
                              {parseLocalDate(user.testDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{!testDateIsPast && daysUntilTest != null ? ` · ${daysUntilTest} days` : testDateIsPast ? ' · taken' : ''}
                              {otherTestDates.length > 0 && <span style={{ color: 'var(--hv2-text-3)', fontWeight: 600 }}>{` · then ${otherTestDates.map((d) => parseLocalDate(d)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).join(', ')}`}</span>}
                            </div>
                          </div>
                        </button>
                      )}
                      {officialScore && (
                        <div className="hv2-hero-foot-item">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--hv2-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"/><path d="m8.2 13.9-1.7 8.1 5.5-3 5.5 3-1.7-8.1"/></svg>
                          <div>
                            <div className="hv2-hero-foot-label">Official SAT · {parseLocalDate(officialScore.testDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                            <div className="hv2-hero-foot-val">{officialScore.composite}{officialScore.rw != null && officialScore.math != null ? ` · ${officialScore.rw} R&W / ${officialScore.math} Math` : ''}</div>
                          </div>
                        </div>
                      )}
                      {user?.targetSchools?.[0] && (
                        <div className="hv2-hero-foot-item">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--hv2-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>
                          <div>
                            <div className="hv2-hero-foot-label">Goal school</div>
                            <div className="hv2-hero-foot-val">{user.targetSchools[0].name}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {typeof onViewFullDiagnosis === 'function' && latestStats && (
                    <button type="button" className="hv2-hero-link" onClick={onViewFullDiagnosis}>
                      View full diagnosis
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  )}
                  {/* Estimated (diagnostic-only) state: the diagnosis behind
                      this band is the results screen from the diagnostic
                      itself — same entry-point shape as the post-test link. */}
                  {isEstimated && typeof onViewDiagnosis === 'function' && miniDiagnostic && (
                    <button type="button" className="hv2-hero-link" onClick={onViewDiagnosis}>
                      View your diagnosis
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  )}
                </div>
              );
            })()}

            {/* SCORE PROMPT — the test date is behind them: wait for release
                day, then ask (with "prefer not to say" / "didn't take it"). */}
            {(() => {
              if (typeof onRecordScoreReport !== 'function' || (typeof onUpdateTestDates !== 'function' && typeof onUpdateTestDate !== 'function')) return null;
              const st = getScoreReportState({ testDate: user?.testDate, testDates: userTestDates, scoreReports: user?.scoreReports });
              if (st.kind === 'none') return null;
              return <ScoreReportCard state={st} testDates={userTestDates} onRecord={onRecordScoreReport} onUpdateTestDates={applyTestDates} />;
            })()}

            {/* PROJECTED SCORE — re-added per user (protected UI); v2-styled, gated on 2+ tests */}
            {scoreHistory.length >= 2 && (
              <div className="hv2-proj-card">
                <div className="hv2-proj-graph">
                  <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
                    {[60, 120, 180, 240, 300].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(12,16,38,0.06)" strokeWidth="1" />
                    ))}
                    <path
                      d={buildScorePath()}
                      fill="none"
                      stroke="var(--hv2-orange)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="100"
                      style={prefersReducedMotion ? undefined : {
                        strokeDasharray: 100,
                        animation: 'drawLine 800ms cubic-bezier(0.25, 0.1, 0.25, 1) 300ms both',
                      }}
                    />
                  </svg>
                </div>
                <div className="hv2-proj-info">
                  <div className="hv2-proj-eyebrow">Projected Score</div>
                  <div className="hv2-proj-num">{animatedScore || '--'}</div>
                  {projectedRange && (
                    <div className="hv2-proj-detail">Likely range {projectedRange.low}–{projectedRange.high}</div>
                  )}
                  {projectedTestsCount > 0 && (
                    <div className="hv2-proj-detail">Based on {projectedTestsCount} test{projectedTestsCount !== 1 ? 's' : ''}</div>
                  )}
                </div>
              </div>
            )}

            {/* TODAY'S FOCUS */}
            {hasStudyPlan && todaySlice?.activities?.length > 0 ? (
              <div>
                <div className="hv2-section-head">
                  <h2 className="hv2-section-title">Today's focus</h2>
                  {(() => {
                    // getTodaySlice puts only INCOMPLETE activities in
                    // slice.activities for 'ready'/'partial' — so the header
                    // must add back the day's already-completed count from
                    // completedToday. For 'all-done', activities already IS the
                    // completed list, so don't double-count it.
                    const doneToday = todaySlice.completedToday?.length || 0;
                    const totalToday = todaySlice.activities.length + (todaySlice.kind !== 'all-done' ? doneToday : 0);
                    return (
                      <span className="hv2-section-meta">{todaySlice.day || 'Today'} · {doneToday} of {totalToday} done</span>
                    );
                  })()}
                </div>
                {/* Home shows ONE thing here: the next session, with its Start
                    button. The full day — every reinforcement/maintenance set,
                    the because-lines, the review block — lives in the Study
                    Plan tab. The home is for starting, not reading (founder,
                    2026-08-22: "this information is for the study plan, not
                    the home screen"). */}
                <div className="hv2-card">
                  {(() => {
                    const allDone = todaySlice.kind === 'all-done';
                    const a = allDone ? null : todaySlice.activities[0];
                    const arrow = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
                    if (allDone || !a) {
                      return (
                        <div className="hv2-focus-row">
                          <div className="hv2-focus-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>
                          </div>
                          <div className="hv2-focus-text">
                            <div className="hv2-focus-titlerow"><span className="hv2-focus-title">Today's sessions are done</span></div>
                            <p className="hv2-focus-desc">Tomorrow's work is already queued in your plan.</p>
                          </div>
                          <button type="button" className="hv2-hero-link" style={{ marginTop: 0 }} onClick={() => setActiveTab('studyPlan')}>
                            See your plan
                            {arrow}
                          </button>
                        </div>
                      );
                    }
                    // Same routing as the Study Plan timeline: 'strategyDrill' =
                    // legacy plans; 'pacingDrill' = Plan v3 unified sessions
                    // (both → the real pacing runner); testMissReview deep-links
                    // the source test's misses; miniDiagnostic → the plan
                    // check-in; test → the runner; anything with a skill/module
                    // → the drill resolver.
                    const isStrategy = a?.activityType === 'strategyDrill' || a?.activityType === 'pacingDrill';
                    const isMissReview = a?.activityType === 'testMissReview';
                    const isCheckIn = a?.activityType === 'miniDiagnostic';
                    const startCheckIn = onStartPlanCheckIn || onStartDiagnostic;
                    const isTest = !isCheckIn && (a?.type === 'test' || a?.activityType === 'practiceTest');
                    const isStartable = !!(a?.moduleId || a?.skillId || (isStrategy && typeof handleStartStrategyActivity === 'function') || (isMissReview && a?.testId && typeof onReviewTestWrong === 'function') || (isTest && typeof onStartPracticeTest === 'function') || (isCheckIn && typeof startCheckIn === 'function'));
                    const minutes = typeof a?.duration === 'number' ? a.duration : null;
                    const onStart = () => {
                      if (!isStartable) return;
                      if (isCheckIn) { startCheckIn(); return; }
                      if (isMissReview) { onReviewTestWrong(a.testId); return; }
                      if (isTest) { onStartPracticeTest(); return; }
                      if (isStrategy) { handleStartStrategyActivity(a); return; }
                      handleStartTodaysActivity(a);
                    };
                    const more = Math.max(0, todaySlice.activities.length - 1)
                      + (todaySlice.reviewSession?.sessionSize > 0 ? 1 : 0);
                    return (
                      <>
                        <div className="hv2-focus-row">
                          <div className="hv2-focus-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>
                          </div>
                          <div className="hv2-focus-text">
                            <div className="hv2-focus-titlerow">
                              <span className="hv2-focus-title">{a?.title || 'Practice session'}</span>
                              {minutes !== null && <span className="hv2-chip">~{minutes} MIN</span>}
                            </div>
                            {(a?.subtitle || a?.skillName) && <p className="hv2-focus-desc">{a.subtitle || a.skillName}</p>}
                          </div>
                          <button type="button" className="hv2-btn-primary" onClick={onStart} disabled={!isStartable}>
                            {isTest ? 'Start test' : 'Start now'}
                            {arrow}
                          </button>
                        </div>
                        {more > 0 && (
                          <button type="button" className="hv2-hero-link hv2-focus-more" onClick={() => setActiveTab('studyPlan')}>
                            {more} more {more === 1 ? 'session' : 'sessions'} today · see your plan
                            {arrow}
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            ) : !hasStudyPlan ? (
              <div>
                <div className="hv2-section-head"><h2 className="hv2-section-title">Get started</h2></div>
                <div className="hv2-card">
                  <div className="hv2-focus-row">
                    <div className="hv2-focus-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg></div>
                    <div className="hv2-focus-text">
                      <div className="hv2-focus-titlerow"><span className="hv2-focus-title">{showCheckInCard ? (ffDiagnosticV2 ? 'Take your diagnostic' : 'Take your 15-minute check-in') : 'Take your first practice test'}</span></div>
                      <p className="hv2-focus-desc">{showCheckInCard ? (ffDiagnosticV2 ? 'The real test experience, about half a full SAT — it builds your plan from every answer.' : '24 quick questions build your starter plan — no prep needed.') : 'One test builds your personalized plan from every answer.'}</p>
                    </div>
                    <button type="button" className="hv2-btn-primary" onClick={showCheckInCard ? onStartCheckIn : onStartPracticeTest}>
                      {showCheckInCard ? 'Start check-in' : 'Start test'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* DAILY REVIEW */}
            {(() => {
              const session = buildDailySession(reviewQueue);
              if (!session || session.sessionSize <= 0) return null;
              const prettifyTopic = (s) =>
                String(s || 'General')
                  .split(/[-_\s]+/)
                  .filter(Boolean)
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');
              const groups = {};
              session.items.forEach((it) => {
                const k = prettifyTopic(it.sectionName || 'General');
                if (!groups[k]) groups[k] = { name: k, count: 0 };
                groups[k].count += 1;
              });
              const topics = Object.values(groups).slice(0, 4);
              const purpleRe = /read|writ|english|convention|vocab|grammar|rhetor/i;
              return (
                <div>
                  <div className="hv2-section-head">
                    <h2 className="hv2-section-title">Daily review</h2>
                    <span className="hv2-section-meta">{session.sessionSize} due today</span>
                  </div>
                  <div className="hv2-card">
                    <p className="hv2-review-desc">{session.hasMore ? session.totalDue : session.sessionSize} questions waiting for spaced-repetition review — these are the ones your memory is about to lose.</p>
                    {topics.length > 0 && (
                      <div className="hv2-review-topics">
                        {topics.map((t) => (
                          <div className="hv2-review-topic" key={t.name}>
                            <span className="hv2-review-topic-dot" style={{ background: purpleRe.test(t.name) ? 'var(--hv2-purple)' : 'var(--hv2-orange)' }} />
                            <span className="hv2-review-topic-name">{t.name}</span>
                            <span className="hv2-review-topic-count">{t.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="hv2-review-actions">
                      <button type="button" className="hv2-btn-primary" onClick={() => onStartReview && onStartReview(session.items)}>Review {session.sessionSize} due</button>
                      <button type="button" className="hv2-btn-secondary" onClick={handleStartStrategyActivity}>Timed practice</button>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

          {/* ============ RIGHT RAIL ============ */}
          <div className="hv2-side">
            {/* Countdown + this week's sparks lead the rail, level with the
                greeting (founder 2026-08-25). */}
            <div className="hv2-side-top">
              {countdownBlock}
              <WeekPracticeStrip variant="aside" practicedDays={practicedDayKeys} />
            </div>
            {hasStudyPlan && (
              <CalendarMonth practicedDays={practicedDayKeys} testDate={user?.testDate}
                testDates={userTestDates} />
            )}

            {recentMisses.length > 0 && (
              <div className="hv2-card">
                <div className="hv2-side-card-title">Pick up where you struggled</div>
                <p className="hv2-struggled-sub">Hard misses from your last test.</p>
                <div className="hv2-struggled-list">
                  {recentMisses.map((m) => {
                    const canRetry = onRetrySimilar && m.question?.skills?.length > 0;
                    return canRetry ? (
                      <button type="button" className="hv2-struggled-row hv2-hov-soft" key={m.key} onClick={() => onRetrySimilar(m.question)}>
                        <span className="hv2-struggled-dot" style={{ background: 'var(--hv2-orange)' }} />
                        <div className="hv2-struggled-main">
                          <div className="hv2-struggled-name">{m.skills?.length > 0 ? formatPatternLabel(m.skills[0]) : 'Mixed skills'}</div>
                          <div className="hv2-struggled-meta">{m.difficulty ? m.difficulty : 'Review'}</div>
                        </div>
                        <span className="hv2-struggled-retry">Retry →</span>
                      </button>
                    ) : (
                      <div className="hv2-struggled-row" key={m.key}>
                        <span className="hv2-struggled-dot" style={{ background: 'var(--hv2-orange)' }} />
                        <div className="hv2-struggled-main">
                          <div className="hv2-struggled-name">{m.skills?.length > 0 ? formatPatternLabel(m.skills[0]) : 'Mixed skills'}</div>
                          <div className="hv2-struggled-meta">{m.difficulty ? m.difficulty : 'Review'}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {recentMisses.length === 0 && diagnosticWeakSpots.length > 0 && (
              <div className="hv2-card">
                <div className="hv2-side-card-title">Pick up where you struggled</div>
                <p className="hv2-struggled-sub">Weak spots from your diagnostic.</p>
                <div className="hv2-struggled-list">
                  {diagnosticWeakSpots.map((w) => {
                    const name = w.skill || formatPatternLabel(w.skillId);
                    const meta = w.metaLabel
                      || (Number.isFinite(w.accuracy)
                        ? `${Math.round(w.accuracy)}% on your diagnostic`
                        : (w.section === 'rw' ? 'Reading & Writing' : 'Math'));
                    return (
                      <button
                        type="button"
                        className="hv2-struggled-row hv2-hov-soft"
                        key={w.skillId}
                        onClick={() => handleStartTodaysActivity({ skillId: w.skillId, skillName: w.skill, section: w.section, title: `${name} Practice` })}
                      >
                        <span className="hv2-struggled-dot" style={{ background: 'var(--hv2-orange)' }} />
                        <div className="hv2-struggled-main">
                          <div className="hv2-struggled-name">{name}</div>
                          <div className="hv2-struggled-meta">{meta}</div>
                        </div>
                        <span className="hv2-struggled-retry">Practice →</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {predictionSummary && (
              <PredictedVsActualCard summary={predictionSummary} />
            )}

            {studyPlan?.weeks?.length ? (
              <div className="hv2-nudge">
                <div className="hv2-nudge-head">
                  <span className="hv2-nudge-icon"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="3" width="8" height="4" rx="1.5"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="m9 14 2 2 4-4"/></svg></span>
                  <span className="hv2-nudge-title">Your {studyPlan.weeks.length}-week plan</span>
                </div>
                <p className="hv2-nudge-desc">{studyPlan.weeks.reduce((s, w) => s + (w.activities?.length || 0), 0)} activities scheduled. The plan starts where the points are cheapest to win.</p>
                <button type="button" className="hv2-nudge-link" onClick={() => setActiveTab('studyPlan')}>
                  View full plan
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      )}
      </>
      )}
    </div>
  );
};

export default StudentDashboard;