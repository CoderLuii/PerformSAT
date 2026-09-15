import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { useAnalytics } from './hooks/useAnalytics';
import { useFeatureFlag } from './hooks/useFeatureFlag';
import { useEntitlement } from './hooks/useEntitlement';
import { openBillingPortal } from './services/billingService';
import {
  dispatchSessionComplete,
  buildFullTestSession,
  buildDrillSession,
  buildReviewSession,
} from './services/sessionComplete';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import PushOptInCard from './components/PushOptInCard';
import { getDifficultyBadge } from './services/adaptiveService';
import { addToReviewQueue } from './services/reviewService';
import { calculateOptimalDifficulty } from './services/recommendationService';
import AppShell from './components/ui/AppShell';
import Wordmark from './components/ui/Wordmark';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Skeleton, { CardSkeleton } from './components/ui/Skeleton';
import { Toaster, showToast } from './components/ui/Toaster';
import CommandPalette from './components/ui/CommandPalette';
import { ChartBarIcon, PlayIcon, ClipboardIcon, TargetIcon, CalendarIcon, BrainIcon, BookOpenIcon } from './design/icons';
import { buildRounds, classifyRoundBoundary, findRoundIndexForQuestion } from './services/buildRounds';
import { restoreAnswerStateForQuestion, buildResumableDrill } from './services/practiceNavigation';
import { pickMostRecentTest } from './services/selectors/recentTest';
import { sectionModuleLabel } from './services/selectors/moduleLabel';
import { chooseDiagnosticVariant, DIAGNOSTIC_LAUNCH_FIRST, DIAGNOSTIC_LAUNCH_PLAN_CHECKIN } from './services/selectors/diagnosticVariant';
import { getTrustedBandMidpoint } from './services/selectors/estimatedBaseline';
// Corpus access (Stage 2b of the bundle-split plan): the question banks,
// practice-test bundles, and the two corpus-coupled services load as their
// own chunks via these memoized dynamic-import loaders. Handlers `await`
// them; the idle pre-warm effect below makes that await a cache hit.
import {
  loadMathBank,
  loadRWBank,
  loadTopicQuestions,
  loadPracticeTests,
  loadPracticeRouting,
  loadTrySimilar,
  preloadCorpus,
} from './data/corpusLoader';
import {
  resolveReviewItemToQuestion,
  reviewDisplaySection,
  BANK_REVIEW_MODULE,
} from './services/reviewQueueResolve';
import { selectPacingQuestions } from './services/pacingService';
import { trackPacingDrillDone, trackReengagementOpened, trackEvent } from './services/analyticsService';
import { phScreenView } from './services/posthogClient';
import { consumeTutorExchange, makeQuestionKey } from './services/tutorExchangeTracker';
import { buildDailySession } from './services/dailyReviewEngine';
import { getReadyAiDiagnostic, loadAttemptSnapshot } from './services/practiceTestService';
import { reprioritizePlan } from './services/adaptivePlanService';
import { findMatchingPlanActivity } from './services/selectors/planActivityMatch';
import { buildTestFlagEntries } from './services/selectors/flaggedQuestions';
import { logInfo, logWarn } from './utils/log';
import { CB_MATH_SKILLS, CB_RW_SKILLS } from './data/questions/cbSkillTaxonomy';
// Direct (non-lazy) import: the drill calculator must open instantly when the
// student clicks "Calculator" in a practice shell. Lazy-loading it would suspend
// the whole practice view (it renders inside the shared Suspense boundary) and
// blank the screen on first open. The heavy Desmos library still loads lazily at
// runtime via a script tag inside the component.
import DesmosCalculator from './components/DesmosCalculator';
// Pin the shared answer-choice + passage stylesheet order in the MAIN chunk.
// ReviewItemCard used to establish this order as an eager import; now that it's
// lazy (to keep MathText -> katex out of main), these two stylesheets would
// otherwise be pulled into a shared async chunk where mini-css-extract can't
// reconcile the order — MiniDiagnosticShell imports them passage-before-choices
// while every other consumer imports choices-before-passage, which fails the
// CI "Conflicting order" check. Loading them here (choices first, the majority
// order) keeps them in main and resolves the conflict globally. CSS only —
// zero JS weight, no katex. These three MUST stay last in the import block —
// import execution order is what pins the stylesheet cascade.
import './components/shared/AnswerChoiceList.css';
import './components/rw/HighlightablePassage.css';

// ── Code-split view components (Stage 1 of the bundle-split plan) ──────────
// Each heavy view loads as its own webpack chunk on first render. The single
// Suspense boundary inside #main-content (below) shows a skeleton while a
// chunk fetches; key={view} on that div remounts the boundary per navigation.
// KEEP EAGER: LandingPage, PrivacyPolicy/TermsOfService (render via early
// return BEFORE the router), AppShell, ErrorBoundary, Toaster, CommandPalette,
// PushOptInCard, icons. ReviewItemCard is lazy — a static import welded its
// MathText -> katex (1.2MB) chain into the main bundle for pre-auth visitors.
const StudentDashboard = React.lazy(() => import('./components/StudentDashboard'));
const AiTutorChat = React.lazy(() => import('./components/AiTutorChat'));
const PracticeTest = React.lazy(() => import('./components/PracticeTest'));
const PracticeTestList = React.lazy(() => import('./components/PracticeTestList'));
const TestResults = React.lazy(() => import('./components/TestResults'));
// On-ramp check-in: lazy chunk carries the sampler + diagnosis pipeline
// (banks, studyPlanGenerator) — never import it statically (bundle guard).
const MiniDiagnosticShell = React.lazy(() => import('./components/MiniDiagnostic/MiniDiagnosticShell'));
// Re-opened diagnosis (dashboard "View your diagnosis"): same results screen
// the diagnostic ends on, rebuilt from the persisted record. Lazy for the same
// reason as the shell — it imports diagnosticEngine (bundle guard).
const MiniDiagnosticResults = React.lazy(() => import('./components/MiniDiagnostic/MiniDiagnosticResults'));
// Post-signup inner onboarding: lazy chunk shown once, before the home screen.
const InnerOnboarding = React.lazy(() => import('./components/onboarding/InnerOnboarding'));
const Profile = React.lazy(() => import('./components/Profile'));
const StudyPlanDashboard = React.lazy(() => import('./components/StudyPlanDashboard'));
const AdaptivePracticeShell = React.lazy(() => import('./components/AdaptivePracticeShell'));
const AssignedPracticeShell = React.lazy(() => import('./components/AssignedPracticeShell'));
const PacingDrill = React.lazy(() => import('./components/PacingDrill'));
const PracticeBank = React.lazy(() => import('./components/PracticeBank'));
const LearnWorkspace = React.lazy(() => import('./components/learn/LearnWorkspace'));
const LessonBrowser = React.lazy(() => import('./components/LessonBrowser'));
const LearnTab = React.lazy(() => import('./components/learnTab/LearnTab'));
const ChapterReader = React.lazy(() => import('./components/learnTab/ChapterReader'));
const PaywallScreen = React.lazy(() => import('./components/billing/PaywallScreen'));
const TrialBanner = React.lazy(() => import('./components/billing/TrialBanner'));

// Text-free skeleton shown while a lazy view chunk loads. Composed from the
// shared Skeleton primitives. Renders INSIDE #main-content, so the takingTest
// scroll-lock (height/overflow on the wrapper div) still applies around it.
const ViewChunkFallback = () => (
  <div style={{
    maxWidth: '960px',
    margin: '0 auto',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }}>
    <Skeleton width="38%" height="28px" />
    <CardSkeleton lines={3} />
    <CardSkeleton lines={2} />
  </div>
);

// Memoized dynamic imports for two modules that are only needed deep in a
// flow, never on the main/landing path (bundle-split house style — mirrors
// data/corpusLoader.js and the useProgress.js:12 guard). A static import of
// either welded heavy code into the main chunk for every pre-auth visitor:
//   ./data/lessons        (~300KB) — used only in the Learn/Modules views
//   ./services/diagnosticEngine (~190KB source) — used only to regenerate a
//                          legacy attempt's diagnosis at review time
// Each caches its import PROMISE at module scope, so concurrent callers share
// one in-flight fetch and repeats resolve synchronously (cache hits).
// A REJECTED import must never be cached (a single flaky-network fetch would
// otherwise poison every future call). Each slot is cleared on rejection so
// the next call re-imports; the rejection still propagates to the awaiter,
// whose try/catch surfaces an error toast — so it's always handled.
let lessonsChunkPromise = null;
const loadLessonsChunk = () => {
  if (!lessonsChunkPromise) {
    lessonsChunkPromise = import(/* webpackChunkName: "lessons" */ './data/lessons')
      .catch((err) => { lessonsChunkPromise = null; throw err; });
  }
  return lessonsChunkPromise;
};
let diagnosticEngineChunkPromise = null;
const loadDiagnosticEngine = () => {
  if (!diagnosticEngineChunkPromise) {
    diagnosticEngineChunkPromise = import(/* webpackChunkName: "diagnostic-engine" */ './services/diagnosticEngine')
      .catch((err) => { diagnosticEngineChunkPromise = null; throw err; });
  }
  return diagnosticEngineChunkPromise;
};
// Shown when a corpus/chunk loader rejects at a launcher await (offline or a
// stale chunk after deploy). The loaders above evict their poisoned cache on
// rejection, so the same click works on retry once the network recovers.
const CORPUS_LOAD_ERROR = 'Could not load practice content. Check your connection and try again.';

// Grace window after a successful Checkout return during which launchers grant
// access while the activation webhook lands. Bounded so a dropped/failed
// webhook can't grant access indefinitely — after this we fall back to the
// normal paywall gate. ~3 min comfortably covers Stripe's webhook latency.
const CHECKOUT_GRACE_MS = 3 * 60 * 1000;

// Premium Design System - Clean, Modern, Professional
const design = {
  // Colors - Refined white/orange palette
  colors: {
    text: {
      primary: '#0a0a0a',      // Near black for maximum contrast
      secondary: '#525252',    // Neutral gray
      tertiary: '#737373',     // Light gray for labels
      muted: '#a3a3a3',        // Very light for subtle text
    },
    accent: {
      orange: '#ea580c',       // Primary accent
      orangeHover: '#c2410c',  // Darker orange for hover
      orangeLight: '#fff7ed',  // Light orange background
      orangeMuted: '#ffedd5',  // Muted orange for subtle backgrounds
    },
    surface: {
      white: '#ffffff',
      offWhite: '#fafafa',     // Subtle off-white
      gray: '#f5f5f5',         // Light gray backgrounds
      grayDark: '#e5e5e5',     // Borders
      dark: '#171717',         // Dark backgrounds for contrast cards
    },
    semantic: {
      success: '#16a34a',
      successLight: '#f0fdf4',
      error: '#dc2626',
      errorLight: '#fef2f2',
      info: '#2563eb',
      infoLight: '#eff6ff',
    }
  },
  // Typography - Premium scale with better hierarchy
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    fontFamilyMath: 'Georgia, "Times New Roman", serif',
    sizes: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      md: '17px',
      lg: '19px',
      xl: '22px',
      '2xl': '28px',
      '3xl': '36px',
      '4xl': '48px',
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.7',
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.1em',
    }
  },
  // Spacing - Generous, breathable
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
  },
  // Border radius - Softer, modern
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },
  // Shadows - Refined, subtle
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.16)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  }
};

// cbSkill slug → Practice-Bank domain slug, for landing a Learn chapter on its
// domain. Built once from the CB taxonomy (math + R&W skills each carry .domain).
const CB_SKILL_TO_DOMAIN = new Map(
  [...CB_MATH_SKILLS, ...CB_RW_SKILLS].map((s) => [s.slug, s.domain]),
);

const PerformSAT = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // For section-based practice
  // Learn-tab reader target — the chapter id open in ChapterReader (view 'learnChapter').
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  // Practice-Bank focus hand-off from the Learn reader: {section, domain,
  // skillSlugs, token}. A fresh token per request re-fires the scroll+highlight;
  // it is cleared when the student reaches Practice by normal navigation.
  const [practiceFocus, setPracticeFocus] = useState(null);
  // Lesson catalog (~300KB) loads as its own chunk only when a student enters
  // the Learn/Modules views — see loadLessonsChunk. `lessons` is the resolved
  // `allLessons` map, or null while the chunk is still in flight.
  const [lessons, setLessons] = useState(null);
  // True when the lazy lesson-catalog chunk failed to load. Lets the Learn
  // view render a retry affordance instead of an infinite skeleton (the
  // loader evicts its poisoned cache on rejection, so the retry re-imports).
  const [lessonsLoadError, setLessonsLoadError] = useState(false);
  // Bumped by the Learn-view retry button to re-run the lesson-load effect.
  const [lessonsRetryToken, setLessonsRetryToken] = useState(0);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'practice' | 'practiceTests' | 'takingTest' | 'profile' | 'studyPlan' | 'tutor' | 'diagnosticReport' | 'diagnosticResults' | 'reviewingPastResults' | 'pacingDrill'
  // On-ramp (signup mini-diagnostic) state. `onRampActive` is tri-state:
  // null = eligibility not yet decided, true = flow mounted instead of the
  // app shell, false = dismissed for this session. The activation effect
  // below decides ONCE per session so mid-flow profile stamps
  // (onboardingCompletedAt) can't unmount the results screen.
  // The old profile wizard stage is gone: the pre-signup funnel (LandingPage →
  // OnboardingFunnel) collects goal + context before the account exists, so
  // the on-ramp goes straight to the 24Q check-in.
  const ffOnRamp = useFeatureFlag('onRamp');
  const [onRampActive, setOnRampActive] = useState(null);
  // Diagnostic v2 (REACT_APP_FF_DIAGNOSTIC_V2 / ff:diagnosticV2): the
  // diagnostic runs as a synthetic adaptive test inside the real PracticeTest
  // runner (timed Bluebook modules, calculator, highlighting, fill-ins)
  // instead of the custom MiniDiagnosticShell. Flag OFF = old shell path,
  // which is the rollback. diagnosticTest: null = not built yet, 'error' =
  // build failed (renderOnRamp shows retry), object = ready to mount.
  const ffDiagnosticV2 = useFeatureFlag('diagnosticV2');
  const [diagnosticTest, setDiagnosticTest] = useState(null);
  // Inner onboarding (post-signup, pre-home) state — same tri-state contract as
  // onRampActive. A fresh account runs this ONCE, then lands on the first-run
  // home where the diagnostic CTA is waiting; the diagnostic no longer
  // auto-launches. Gated on the innerOnboarding flag (default ON).
  const ffInnerOnboarding = useFeatureFlag('innerOnboarding');
  const [innerOnboardingActive, setInnerOnboardingActive] = useState(null);
  // Active pacing drill: { config, questions }. Set by onStartPacing, rendered at view==='pacingDrill'.
  const [pacingSession, setPacingSession] = useState(null);
  // Which view a pacing drill was launched from, so onExit returns there
  // instead of always dumping the student on the Dashboard (a plan-launched
  // drill should return to the plan).
  const [pacingDrillEntryView, setPacingDrillEntryView] = useState('dashboard');
  // StudentDashboard's active tab, lifted here so it persists while the
  // dashboard unmounts during a pacing drill / past-test review and remounts
  // on return — a flow launched from the inline Study Plan tab then comes back
  // to that tab rather than the Dashboard tab.
  const [dashboardTab, setDashboardTab] = useState('dashboard');
  const [selectedPracticeTest, setSelectedPracticeTest] = useState(null);
  const [isTestTimed, setIsTestTimed] = useState(true);
  // 'reading-writing' | 'math' | null. When set, PracticeTest jumps to that
  // section's first module on fresh start (instead of always starting at M1).
  const [initialTestSection, setInitialTestSection] = useState(null);
  const [viewingResultsData, setViewingResultsData] = useState(null); // { test, answers, diagnosticData, diagnosticReport }
  // Profile deep-link: 'goals' lands on the SAT Goals card (target / test
  // date) — set by the score surfaces' nuance actions, cleared on leaving.
  const [profileFocus, setProfileFocus] = useState(null);
  // The diagnostic sitting snapshot behind "View your diagnosis": loaded on
  // demand when that view opens, keyed by the record's attemptId so a
  // re-open doesn't refetch. status: idle | loading | ready | missing | error.
  const [diagnosticSitting, setDiagnosticSitting] = useState({ status: 'idle', data: null, attemptId: null });
  // Where the re-opened diagnosis returns to: Home's "View your diagnosis"
  // link or the Diagnostic card at the top of the Practice Tests list.
  const [diagnosisReturnTo, setDiagnosisReturnTo] = useState('dashboard');
  const openDiagnosis = (returnTo) => { setDiagnosisReturnTo(returnTo); setView('diagnosticResults'); };
  // Question-by-question review of the diagnostic sitting in the same runner
  // past practice tests use. Needs the loaded snapshot; no-op until 'ready'.
  const openDiagnosticReview = (moduleIndex, returnTo) => {
    const data = diagnosticSitting.status === 'ready' ? diagnosticSitting.data : null;
    if (!data) return;
    setViewingResultsData({
      test: data.test,
      answers: data.answers,
      reviewModule: Number.isFinite(moduleIndex) ? moduleIndex : 0,
      attemptId: data.attemptId,
      snapshotMissing: false,
      answersMissing: !!data.answersMissing,
      returnTo,
    });
    setView('reviewingPastResults');
  };
  // The diagnosis REPORT needs the full snapshot (answers + timing); a
  // questions-only legacy rebuild keeps that screen on its by-domain fallback.
  const fullDiagnosticSitting = diagnosticSitting.status === 'ready' && diagnosticSitting.data && !diagnosticSitting.data.answersMissing
    ? diagnosticSitting.data
    : null;
  const openProfileGoals = () => { setProfileFocus('goals'); setView('profile'); };
  useEffect(() => {
    // Sidebar / palette routes into Profile must not inherit a stale deep-link.
    if (view !== 'profile' && profileFocus !== null) setProfileFocus(null);
  }, [view, profileFocus]);

  // Practice state.
  //
  // Shape contract — every full-replacement `setPracticeState({...})` call
  // must explicitly include or omit these optional fields:
  //   • reviewMode (boolean) — past-test-review retry-drill session. When
  //     true, AssignedPracticeShell renders the "Review session" banner
  //     and back-button label flips to "Back to Review". MUST be omitted
  //     (or set false) when starting any non-review session, otherwise a
  //     stale review banner persists into the next drill.
  //   • assignmentMeta (object) — drill metadata (label, weakness, source).
  //     Includes sourceTestId/sourceTestTitle/sourceWrongCount when the
  //     session is a Past-Test-Review retry.
  //   • adaptiveQueueSeed / adaptiveSessionState / adaptiveDomainLabel —
  //     adaptive-mode payload.
  //   • rounds / currentRoundIndex / showRoundComplete — round metadata.
  //
  // The spread setters (`setPracticeState(prev => ({...prev, ...}))`) DO
  // preserve these keys intentionally — that's how round completion +
  // navigation keep review-mode active across question advances.
  const [practiceState, setPracticeState] = useState({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    showHint: false,
    answers: {},
    isComplete: false,
    shuffledQuestions: [], // Store randomized questions
    practiceMode: 'standard' // pre-launch default; every live launcher sets 'assigned' | 'adaptive'
  });

  // Calculator state for practice
  const [showCalculator, setShowCalculator] = useState(false);



  // ESC key handler for calculator
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showCalculator) {
        setShowCalculator(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showCalculator]);

  const { user, loading, logout, updateTestDate, updateTestDates, recordScoreReport, updateTargetScore, updateCurrentScore, updateTargetSchools, updateProfilePhoto, updateFirstName, markOnboardingComplete, markOnboardingSkipped, completeInnerOnboarding } = useAuth();
  const { loading: progressLoading, hydrated: progressHydrated, completedLessons, practiceProgress, drillDays, reviewQueue, reviewStreak, skillProgress, answeredQuestionIds, practiceTestResults, inProgressTests, studyPlan, studyPlanMeta, studyPlanArtifact, predictionLog, interventionLog, studentFingerprint, miniDiagnostic, bankPractice, activeDrill, flaggedQuestions, recordDrillSkillAttempts, recordPracticedDay, recordBankPractice, saveActiveDrill, clearActiveDrill, toggleFlagQuestion, unflagQuestion, flagQuestionsBatch, getDueCount, getSkillDiagnosticSummary, getSkillBreakdown, recordPracticeTestAttempt, getTestBestScore, getTestAttempts, saveTestProgress, clearTestProgress, resetPracticeTest, removeTestAttempt, getTestProgress, hasTestProgress, saveMiniDiagnostic, saveStudyPlan, saveEditedStudyPlan, markStudyActivityComplete, unmarkStudyActivityComplete, markLessonComplete, isLessonCompleted, getModuleProgress, chaptersRead, markChapterComplete, unmarkChapterComplete, isChapterComplete, lastSaveStatus, retryLastSave } = useProgress(user?.uid);

  // Mount the analytics session lifecycle (session_start / session_end +
  // beforeunload flush). Previously orphaned — the hook existed but was never
  // mounted, so no engagement events ever fired. Completion events are fired
  // separately by the onSessionComplete seam (see dispatchSessionComplete).
  useAnalytics(user?.uid);

  // ── SEVA Premium entitlement (billing spec 2026-07-01) ───────────────────
  // Dark until REACT_APP_FF_BILLING flips: with the flag off the hook returns
  // a static permissive value and performs zero reads/calls. With it on, the
  // 3-day trial clock + subscription state live in the server-write-only
  // entitlements/{uid} doc.
  const entitlement = useEntitlement(user);
  const entitlementStateRef = useRef(entitlement);
  useEffect(() => { entitlementStateRef.current = entitlement; }, [entitlement]);


  // Lazy-load the lesson catalog on entry to the Learn/Modules views. The
  // render paths below read `lessons` (the resolved allLessons map); until the
  // chunk lands, the 'learn' view shows the shared chunk fallback.
  useEffect(() => {
    if ((view === 'modules' || view === 'learn') && !lessons) {
      let cancelled = false;
      setLessonsLoadError(false);
      loadLessonsChunk()
        .then((mod) => { if (!cancelled) setLessons(mod.allLessons); })
        .catch(() => { if (!cancelled) setLessonsLoadError(true); });
      return () => { cancelled = true; };
    }
  }, [view, lessons, lessonsRetryToken]);
  // Timestamp (ms) of the last successful Checkout return, so the hard-gate
  // auto-route below doesn't bounce a student who JUST paid back to the wall
  // during the brief window before the webhook flips their doc to trialing.
  // 0 = not awaiting. Bounded by CHECKOUT_GRACE_MS: if the activation webhook
  // never lands (dropped/failed), we stop granting after the grace window and
  // fall back to the normal paywall gate instead of granting forever.
  const awaitingCheckoutRef = useRef(0);

  // Single choke-point gate for every practice/test/tutor LAUNCHER. Reads
  // through a ref so useCallback'd launchers with [] deps stay correct.
  // Viewers (results, review, diagnosis, dashboard, profile) are never gated
  // — post-trial access is read-only by design (decision D5).
  const ensurePracticeAccess = useCallback(() => {
    const ent = entitlementStateRef.current;
    if (!ent.flagEnabled || ent.hasAccess) return true;
    // Just returned from a successful Checkout: the activation webhook hasn't
    // flipped the doc to trialing yet (the same window the hard-gate auto-route
    // already suppresses via awaitingCheckoutRef). Don't wall a student who
    // literally just paid — let the launcher through while entitlement catches
    // up; the onSnapshot flips hasAccess true within a beat. Bounded by
    // CHECKOUT_GRACE_MS so a webhook that never lands stops granting access.
    if (awaitingCheckoutRef.current &&
        Date.now() - awaitingCheckoutRef.current < CHECKOUT_GRACE_MS) {
      showToast({ type: 'info', message: 'Activating your subscription…' });
      return true;
    }
    if (ent.loading) {
      showToast({ type: 'info', message: 'Checking your access — one moment.' });
      return false;
    }
    setView('paywall');
    return false;
  }, []);

  // Render-time flavor of the same rule, for locked-state affordances
  // (test-card CTAs, the standalone tutor view, review-pane tutor note).
  // Gated on hasEntitlementDoc so a grandfathered/comped user never flashes
  // "locked" affordances in the window before their doc resolves.
  const billingLocked = entitlement.flagEnabled && entitlement.hasEntitlementDoc &&
    !entitlement.loading && !entitlement.hasAccess;

  // Card-up-front HARD gate: a logged-in account that has never put a card on
  // file (no access AND no Stripe customer) has NO access in this model — send
  // it straight to the start-trial wall. Lapsed accounts (canceled/expired
  // WITH a prior billing account) are excluded here: they keep the read-only
  // dashboard and only hit the wall via a launcher (ensurePracticeAccess).
  // GRANDFATHERED users (status "comped", created before billing launched) have
  // hasAccess === true, so they short-circuit below and never see the wall.
  // We also wait for hasEntitlementDoc before walling: a not-yet-seeded (null)
  // doc must not flash the paywall, since we can't yet tell a comped user from
  // a brand-new one until ensureEntitlement writes the doc. And if access is
  // granted while somehow sitting on the wall (comped doc lands, or the
  // activation webhook flips a fresh trial), bounce back to the dashboard.
  // Suppressed right after a successful Checkout return (awaitingCheckoutRef)
  // so we don't flash the wall while the activation webhook lands.
  useEffect(() => {
    if (!entitlement.flagEnabled || !user || entitlement.loading) return;
    if (entitlement.hasAccess) {
      awaitingCheckoutRef.current = 0; // trial/subscription/comped is live
      if (view === 'paywall') setView('dashboard'); // rescue off the wall
      return;
    }
    // Just paid — wait for the webhook, but only within the grace window. Once
    // it lapses (webhook never landed), fall through to the normal gate.
    if (awaitingCheckoutRef.current &&
        Date.now() - awaitingCheckoutRef.current < CHECKOUT_GRACE_MS) return;
    if (!entitlement.hasEntitlementDoc) return; // doc not seeded yet — don't wall
    if (!entitlement.hasBillingAccount && view !== 'paywall') {
      setView('paywall');
    }
  }, [entitlement.flagEnabled, entitlement.loading, entitlement.hasAccess, entitlement.hasBillingAccount, entitlement.hasEntitlementDoc, user, view]);

  // Mirror in-app screen changes to PostHog as synthetic pageviews (the URL
  // stays /course while `view` swaps, so history-based capture can't see
  // them). Keyed on uid, not the user object, so profile-field updates that
  // produce a new user identity don't re-fire the current screen.
  const analyticsUid = user?.uid;
  useEffect(() => {
    if (analyticsUid) phScreenView(view);
  }, [analyticsUid, view]);

  // ── Live plan reprioritization (adaptivity audit item 3) ─────────────────
  // reprioritizePlan used to run ONLY in the post-test save path, so its
  // improved/declined/triage read never moved between tests. It is pure and
  // cheap (a few O(n) passes over skillProgress / test attempts / the review
  // queue — no Firestore, no corpus), so we recompute it render-side: the
  // memo re-fires when the study-plan view loads with fresh data and after
  // every drill completion (recordDrillSkillAttempts → Firestore snapshot →
  // new skillProgress identity). Falls back to the persisted overlay (now
  // grafted through artifact hydration — see useProgress) when live
  // computation has nothing to say.
  const adaptiveOverlay = useMemo(() => {
    if (!studyPlan?.weeks?.length) return null;
    try {
      const live = reprioritizePlan(studyPlan, skillProgress, practiceTestResults, reviewQueue, user?.testDate);
      return live?.adaptiveOverlay || studyPlan.adaptiveOverlay || null;
    } catch (err) {
      logWarn('adaptivePlan', 'live reprioritization failed', err?.message);
      return studyPlan.adaptiveOverlay || null;
    }
  }, [studyPlan, skillProgress, practiceTestResults, reviewQueue, user?.testDate]);

  // Pre-warm the heaviest view chunks AND the corpus chunks (banks, practice
  // tests, routing services — see data/corpusLoader.js) once auth resolves so
  // the first post-login navigation and the first drill/test launch are cache
  // hits instead of a skeleton + fetch. requestIdleCallback keeps the fetches
  // off the critical path; the setTimeout(1500) branch covers Safari (no rIC).
  // Dynamic import() is idempotent — webpack caches the module record and
  // corpusLoader caches its promises — so StrictMode's double-invoke and
  // re-runs on uid change are free.
  useEffect(() => {
    if (!user?.uid) return undefined;
    const warmChunks = () => {
      import('./components/StudentDashboard');
      import('./components/PracticeTest');
      import('./components/StudyPlanDashboard');
      preloadCorpus().catch(() => { /* handlers re-await with their own error paths */ });
    };
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(warmChunks, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timerId = setTimeout(warmChunks, 1500);
    return () => clearTimeout(timerId);
  }, [user]);

  // Adaptive-session routing module (practiceAssignmentService namespace).
  // startAdaptivePractice resolves the loader and stashes the namespace HERE
  // BEFORE creating any session state, so handleNextQuestion — which runs
  // synchronously per answer mid-session — can read it without awaiting.
  // An adaptive session cannot exist without this ref being set first.
  const practiceRoutingRef = useRef(null);

  // Start a daily-review session from a list of due review items. Extracted from
  // the dashboard's onStartReview so the re-engagement deep-link (?next=review)
  // can launch the exact same flow. Defined BEFORE the deep-link effects below
  // because they list it in their dependency array (a const referenced before
  // its declaration in the same scope is a temporal-dead-zone ReferenceError).
  const startDailyReview = useCallback(async (items) => {
    const reviewItems = items || [];
    if (reviewItems.length === 0) return;
    if (!ensurePracticeAccess()) return;
    // Queue items resolve against the bank (routing service), the legacy
    // topic files, and the test catalog — load all three corpus slices.
    let routingMod, topicsMod, testsMod;
    try {
      [routingMod, topicsMod, testsMod] = await Promise.all([
        loadPracticeRouting(),
        loadTopicQuestions(),
        loadPracticeTests(),
      ]);
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    const questions = [];
    const reviewKeyByQuestionId = {};
    reviewItems.forEach(item => {
      const q = resolveReviewItemToQuestion(item, {
        resolveQuestionById: routingMod.resolveQuestionById,
        getQuestionsForSection: topicsMod.getQuestionsForSection,
        getTestById: testsMod.getPracticeTestById,
      });
      // MCQ-only: AssignedPracticeShell has no fill-in input, so a fill-in
      // test miss would be an unanswerable dead-end that blocks the whole
      // session from completing (and SM-2 from ever rescheduling it).
      if (q && Array.isArray(q.choices) && q.choices.length >= 2) {
        questions.push(q);
        if (item.key != null && q.id != null) {
          reviewKeyByQuestionId[q.id] = item.key;
        }
      }
    });
    if (questions.length === 0) {
      showToast({
        type: 'info',
        message: 'These review items cannot be drilled right now (fill-in and retired questions are skipped).',
      });
      return;
    }
    if (questions.length > 0) {
      setTrySimilarExhausted(new Set());
      setPracticeState({
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showFeedback: false,
        showHint: false,
        answers: {},
        isComplete: false,
        shuffledQuestions: questions.slice(0, 15),
        practiceMode: 'assigned',
        assignmentMeta: { label: 'Review Session', source: 'review-queue' },
        reviewKeyByQuestionId,
      });
      setActiveModule(null);
      setActiveSection('__assigned__');
      setShowCalculator(false);
      setView('practice');
    }
  }, [ensurePracticeAccess]);

  // ── Re-engagement nudge deep-link (?next=review|tasks) ──────────────────
  // A push nudge's click action lands the student on /course?next=review. Read
  // the param once on mount, strip it (so a refresh/share doesn't re-fire), and
  // record the pending target + a short routing deadline. Navigation in this app
  // is view-state (not URL routes), so we route by setView below once data loads.
  const pendingNudgeRef = useRef(null);
  const nudgeDeadlineRef = useRef(0);
  const nudgeRoutedRef = useRef(false);
  const nudgeOpenLoggedRef = useRef(false);
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next');
      if (next) {
        pendingNudgeRef.current = next;
        nudgeDeadlineRef.current = Date.now() + 10000; // only auto-route within 10s of arrival
        params.delete('next');
        const qs = params.toString();
        window.history.replaceState({}, '', window.location.pathname + (qs ? `?${qs}` : ''));
      }
    } catch { /* noop */ }
  }, []);

  // ── Stripe Checkout return (?checkout=success|canceled) ─────────────────
  // Hosted Checkout redirects back here. Strip the param (refresh/share must
  // not re-fire the toast) and acknowledge; the entitlement onSnapshot flips
  // access live the moment the webhook lands — no polling needed.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const checkout = params.get('checkout');
      if (!checkout) return;
      params.delete('checkout');
      const qs = params.toString();
      window.history.replaceState({}, '', window.location.pathname + (qs ? `?${qs}` : ''));
      if (checkout === 'success') {
        // Suppress the hard-gate auto-route until the webhook flips the doc to
        // trialing (entitlement.hasAccess) — otherwise a student who just added
        // their card would flash back to the start-trial wall for a beat.
        // Stamp the return time so the suppression self-expires (CHECKOUT_GRACE_MS)
        // if the activation webhook never lands.
        awaitingCheckoutRef.current = Date.now();
        showToast({
          type: 'success',
          message: 'Card saved — your 3-day free trial is starting.',
          duration: 6000,
        });
      } else if (checkout === 'canceled') {
        showToast({ type: 'info', message: 'Checkout canceled — you were not charged.' });
      }
    } catch { /* noop */ }
  }, []);

  // Attribution: fire reengagement.opened once the user is known. This is the
  // only place push open/click rate can be measured (the cron can't write
  // analytics). Independent of whether routing ultimately finds due items.
  useEffect(() => {
    if (user?.uid && pendingNudgeRef.current && !nudgeOpenLoggedRef.current) {
      nudgeOpenLoggedRef.current = true;
      trackReengagementOpened(user.uid, { next: pendingNudgeRef.current });
    }
  }, [user?.uid]);

  // Route the pending nudge once the data it needs has hydrated. next=review
  // launches the daily-review session as soon as due items exist; next=tasks
  // just lands on the dashboard. Bounded by a 10s deadline so a late reviewQueue
  // update can never yank a student who has since navigated elsewhere.
  useEffect(() => {
    const next = pendingNudgeRef.current;
    if (!next || nudgeRoutedRef.current || !user?.uid) return;
    if (Date.now() > nudgeDeadlineRef.current) { nudgeRoutedRef.current = true; return; }
    if (next === 'tasks') {
      nudgeRoutedRef.current = true;
      setView('dashboard');
    } else if (next === 'review') {
      const session = buildDailySession(reviewQueue);
      if (session.items.length > 0) {
        nudgeRoutedRef.current = true;
        startDailyReview(session.items);
      }
      // else: no due items yet — wait for reviewQueue to hydrate (effect re-runs).
    } else {
      nudgeRoutedRef.current = true; // unknown target — land on default dashboard.
    }
  }, [reviewQueue, user?.uid, startDailyReview]);

  // Holds the latest unsaved resumable bank-drill session so it can be FLUSHED
  // synchronously when the student leaves the drill before the debounce fires.
  const pendingBankDrillRef = useRef(null);

  // Auto-persist the in-flight Practice-Bank drill so it survives leaving or
  // refreshing (the "Continue your last drill" banner resumes it). Bank-sourced
  // 'assigned' drills only — study-plan / adaptive / review sessions are out of
  // scope. Clears the saved drill on completion. Debounced (600ms) so rapid
  // answer/navigation changes coalesce into a single Firestore write; the latest
  // session is mirrored into pendingBankDrillRef so the leave-flush below can
  // persist an answer made within the debounce window before navigating away.
  useEffect(() => {
    if (!user?.uid || view !== 'practice') return undefined;
    const ps = practiceState;
    const isBank = ps.practiceMode === 'assigned'
      && (ps.assignmentMeta?.source || '').startsWith('practice-bank');
    if (!isBank) { pendingBankDrillRef.current = null; return undefined; }
    if (ps.isComplete) { pendingBankDrillRef.current = null; clearActiveDrill(); return undefined; }
    const session = buildResumableDrill(ps, activeSection);
    if (!session) return undefined;
    pendingBankDrillRef.current = session;
    const timer = setTimeout(() => { saveActiveDrill(session); pendingBankDrillRef.current = null; }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deliberately keyed on the four practiceState fields that must trigger a save; whole-object `practiceState` would re-fire (and re-debounce) on every unrelated field change, and saveActiveDrill/clearActiveDrill/activeSection are fresh per render and are read live inside
  }, [user?.uid, view, practiceState.currentQuestionIndex, practiceState.answers, practiceState.currentRoundIndex, practiceState.isComplete]);

  // Flush a pending bank-drill save when the student LEAVES the practice view by
  // any route (Back, a nav click, etc.). Without this, answering and then
  // leaving within the 600ms debounce window would cancel the pending save and
  // resume one answer stale. Tracks the previous view so it fires only on the
  // practice → elsewhere transition.
  const prevViewRef = useRef(view);
  useEffect(() => {
    const leftPractice = prevViewRef.current === 'practice' && view !== 'practice';
    prevViewRef.current = view;
    if (leftPractice && pendingBankDrillRef.current) {
      saveActiveDrill(pendingBankDrillRef.current);
      pendingBankDrillRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- saveActiveDrill is a fresh closure every render (no useCallback), so depending on it would run this leave-flush on every render instead of only on a practice -> elsewhere transition
  }, [view]);

  // Best-effort flush when the tab is hidden / closed (covers a hard refresh
  // mid-answer). Firestore web writes are not guaranteed to complete on unload,
  // so this is a backstop on top of the reliable leave-flush above.
  useEffect(() => {
    const flush = () => {
      if (document.visibilityState === 'hidden' && pendingBankDrillRef.current) {
        saveActiveDrill(pendingBankDrillRef.current);
        pendingBankDrillRef.current = null;
      }
    };
    document.addEventListener('visibilitychange', flush);
    return () => document.removeEventListener('visibilitychange', flush);
    // Key on the user, not saveActiveDrill: saveActiveDrill is a fresh closure
    // every render (no useCallback), so depending on it would re-subscribe the
    // listener on every render. Re-running only when the user changes captures a
    // correct-userId saveActiveDrill once auth resolves (an empty dep array would
    // freeze the pre-auth, userId-null closure and never flush). The handler
    // reads pendingBankDrillRef.current live, so nothing goes stale between.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see the note above: depending on the per-render saveActiveDrill closure would re-subscribe the visibilitychange listener on every render
  }, [user?.uid]);

  // On-ramp eligibility — decided once per session after progress hydrates.
  // The diagnostic NO LONGER auto-launches at signup: a fresh account runs the
  // inner-onboarding flow (effect below) and lands on the home screen, where
  // the "Take your diagnostic" CTA is waiting. The only auto-mount left here is
  // resuming a check-in a student had genuinely already started
  // (inProgressTests['mini-diagnostic']); everything else falls through to the
  // app shell and reaches the diagnostic via the CTA.
  useEffect(() => {
    if (onRampActive !== null) return; // decided already this session
    // `progressHydrated` (not !progressLoading): in the commit where the
    // user first resolves, loading still reads false from the boot no-user
    // state, and deciding there would miss an in-flight check-in resume.
    if (!ffOnRamp || !user || !progressHydrated) return;
    const savedSitting = inProgressTests && inProgressTests['mini-diagnostic'];
    // With Diagnostic v2 on, only a v2 record (manifest present) is resumable
    // — a stale v1-shell record would be discarded by the build effect and
    // replaced with a brand-new 40Q sitting, i.e. an unprompted auto-LAUNCH,
    // which this effect must never do.
    const hasResume = !!savedSitting && (!ffDiagnosticV2 || !!savedSitting.diagnosticManifest);
    // Resume an in-flight check-in even past a skip stamp; never auto-launch
    // a fresh one. A student who deliberately exited mid-sitting gets a 24h
    // snooze (set by the exit handler) instead of a full-screen seize at
    // every login — the dashboard resume card stays as the way back in.
    let snoozed = false;
    try {
      const ts = Number(localStorage.getItem(`seva:onrampSnooze:${user.uid}`) || 0);
      snoozed = ts > 0 && (Date.now() - ts) < 24 * 60 * 60 * 1000;
    } catch { /* storage unavailable — default to resuming */ }
    setOnRampActive(hasResume === true && !snoozed);
  }, [onRampActive, ffOnRamp, ffDiagnosticV2, user, progressHydrated, inProgressTests]);

  // Inner-onboarding eligibility — decided once per session after hydration.
  // Eligible: flagged on, a fresh account with nothing behind it yet (no inner
  // onboarding / diagnostic completion or skip, no tests, no plan) and no
  // in-flight diagnostic to resume (that takes precedence). Runs the 9-screen
  // flow, then stamps innerOnboardingCompletedAt so it never re-shows.
  useEffect(() => {
    if (innerOnboardingActive !== null) return; // decided already this session
    if (!ffInnerOnboarding || !user || !progressHydrated) { return; }
    // Trial-first ordering (billing live): the card-up-front wall is the step
    // right after signup, and inner onboarding runs INSIDE the active trial.
    // While the account has no access yet (doc still seeding, promo still
    // redeeming, or the wall is owed), defer the decision — deciding true here
    // would paint onboarding first and then yank the student to the wall
    // mid-flow. hasAccess flips (trial/comped/grandfathered) → decide then.
    if (entitlement.flagEnabled && !entitlement.hasAccess) { return; }
    // Dev-only QA escape: ?forceInnerOnboarding=1 re-runs the flow for any
    // account (completion still stamps, so it won't loop on real accounts).
    const forced = process.env.NODE_ENV === 'development' &&
      new URLSearchParams(window.location.search).has('forceInnerOnboarding');
    // "Do this later" drops a local marker: from then on the flow never
    // auto-seizes the screen (refresh included) — the "Finish onboarding"
    // hero button is the way back in.
    let dismissed = false;
    try { dismissed = !!localStorage.getItem(`seva:innerOnboarding:dismissed:${user.uid}`); } catch { /* storage unavailable */ }
    const hasTests = Object.keys(practiceTestResults || {}).length > 0;
    const hasResume = !!(inProgressTests && inProgressTests['mini-diagnostic']);
    const eligible =
      !user.innerOnboardingCompletedAt &&
      !user.onboardingCompletedAt &&
      !user.onboardingSkippedAt &&
      !hasTests && !studyPlan && !hasResume;
    setInnerOnboardingActive(forced || (eligible && !dismissed) === true);
  }, [innerOnboardingActive, ffInnerOnboarding, user, progressHydrated, practiceTestResults, inProgressTests, studyPlan, entitlement.flagEnabled, entitlement.hasAccess]);

  const handleOnRampSkip = () => {
    setOnRampActive(false);
    markOnboardingSkipped().catch((e) => console.error('[onramp] skip stamp failed:', e));
  };

  // Re-entry from the dashboard "finish your check-in" card — straight to
  // the check-in runner (goal/context now arrive with signup via the funnel;
  // students without a goal get DEFAULT_GOAL_SCORE pacing and can edit it
  // in Profile).
  // Launch source decides the sitting (see selectors/diagnosticVariant): the
  // onboarding / home "Take your diagnostic" CTA is the starting point → full
  // 40Q even over a stale record; only the plan's scheduled check-in card
  // serves the short focus-weighted variant. Read by the build effect below.
  const diagLaunchSourceRef = useRef(null);
  const launchDiagnostic = (source) => {
    if (!ensurePracticeAccess()) return;
    diagLaunchSourceRef.current = source;
    // A deliberate launch clears the exit snooze — the student asked for it.
    try { localStorage.removeItem(`seva:onrampSnooze:${user?.uid}`); } catch { /* storage unavailable */ }
    setOnRampActive(true);
  };
  const handleResumeOnRamp = () => launchDiagnostic(DIAGNOSTIC_LAUNCH_FIRST);
  const handleStartPlanCheckIn = () => launchDiagnostic(DIAGNOSTIC_LAUNCH_PLAN_CHECKIN);

  // Sitting snapshot fetch for the re-opened diagnosis (needs user + the
  // miniDiagnostic record, both declared above). Also prefetched on the
  // Practice Tests list, whose Diagnostic card offers "Review answers" — one
  // doc read, and the attemptId key means the later diagnosis open is free.
  // Keyed by attemptId through a ref so the effect never re-arms on its own
  // status change (a cleanup on that re-run used to drop the in-flight result
  // and strand "Loading…").
  const sittingLoadedFor = useRef(null);
  useEffect(() => {
    if ((view !== 'diagnosticResults' && view !== 'practiceTests') || !user?.uid) return;
    const attemptId = miniDiagnostic?.attemptId || null;
    if (!attemptId) {
      if (sittingLoadedFor.current !== '__none__') {
        sittingLoadedFor.current = '__none__';
        setDiagnosticSitting({ status: 'missing', data: null, attemptId: null });
      }
      return;
    }
    if (sittingLoadedFor.current === attemptId) return; // loaded / in flight
    sittingLoadedFor.current = attemptId;
    setDiagnosticSitting({ status: 'loading', data: null, attemptId });
    // Records with no snapshot (pre-2026-08-24, or a failed snapshot write)
    // still rebuild their exact QUESTIONS from the record's item ids — the
    // loader marks those `answersMissing`, which the diagnosis screen treats
    // as 'missing' while the review runner still opens on them.
    const record = miniDiagnostic;
    import(/* webpackChunkName: "diagnostic-sitting-loader" */ './services/diagnosticSittingLoader')
      .then(({ loadDiagnosticSitting }) => loadDiagnosticSitting({
        userId: user.uid, attemptId, record, snapshotSaved: record?.sittingSaved,
      }))
      .then((data) => {
        // A late result is still the right result — state is keyed by attemptId.
        setDiagnosticSitting({ status: data ? 'ready' : 'missing', data, attemptId });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[App] diagnostic sitting load failed:', err && err.message);
        sittingLoadedFor.current = null; // let the next open retry
        setDiagnosticSitting({ status: 'error', data: null, attemptId });
      });
  }, [view, user?.uid, miniDiagnostic]);

  const handleOnRampFinished = async ({ plan, diagReport, miniDiagnosticRecord }) => {
    // Order matters for resilience: plan mirror first (the artifact is already
    // persisted by the pipeline), then the lean record, then the stamp. Each
    // step is independently recoverable; a failed stamp just re-offers the
    // flow next session, which resumes into the existing plan gate.
    try {
      await handleSaveStudyPlan(plan, diagReport);
    } catch (e) {
      console.error('[onramp] plan mirror failed (artifact already persisted):', e);
    }
    try {
      await saveMiniDiagnostic(miniDiagnosticRecord);
    } catch (e) {
      console.error('[onramp] mini-diagnostic record save failed:', e);
    }
    try {
      await markOnboardingComplete();
    } catch (e) {
      console.error('[onramp] completion stamp failed:', e);
    }
  };

  // Diagnostic v2 build/rebuild — runs only while the on-ramp is mounted with
  // the flag on. Resume rebuilds the EXACT sitting from the persisted manifest
  // (never re-sampled — saved modIdx-qIdx answers must stay aligned); bank
  // drift (a manifest id gone from the banks) discards the sitting and builds
  // fresh. First-ever diagnostic gets the full 40Q adaptive variant; once a
  // plan or a prior diagnostic exists, check-ins get the ~25-min focused
  // variant weighted toward the plan's current focus skills.
  // Inputs the async build reads at RUN time, held in a ref so their
  // per-render identities (plain closures from useProgress, snapshot-churned
  // objects) never re-trigger the effect — a restarted build re-rolls the
  // attemptId and re-samples the sitting mid-load.
  const diagBuildInputsRef = useRef(null);
  diagBuildInputsRef.current = { getTestProgress, clearTestProgress, answeredQuestionIds, studyPlan, miniDiagnostic, practiceTestResults };
  useEffect(() => {
    if (onRampActive !== true || !ffDiagnosticV2 || !user?.uid) return undefined;
    if (diagnosticTest) return undefined; // built already (or 'error' — retry is explicit)
    let cancelled = false;
    (async () => {
      try {
        const { buildDiagnosticTest, rebuildDiagnosticTest } =
          await import('./services/miniDiagnostic/buildDiagnosticTest');
        const inputs = diagBuildInputsRef.current;
        const saved = inputs.getTestProgress('mini-diagnostic');
        if (saved?.diagnosticManifest) {
          // A rebuild that THROWS (corrupt manifest, bank chunk error mid-
          // lookup) is bank drift too — fall through to a fresh sitting
          // instead of the error screen with the record stuck forever.
          let rebuilt = null;
          try { rebuilt = await rebuildDiagnosticTest(saved.diagnosticManifest); } catch { rebuilt = null; }
          if (rebuilt) {
            if (!cancelled) setDiagnosticTest(rebuilt);
            return;
          }
          if (!cancelled) inputs.clearTestProgress('mini-diagnostic');
        } else if (saved) {
          // A LEGACY v1-shell record (no manifest): its '0-*'/'1-*' answers
          // would pre-fill a freshly sampled v2 test with phantom answers on
          // questions the student never saw — corrupting routing, the band,
          // and the plan. Clear it and start a fresh sitting.
          if (!cancelled) inputs.clearTestProgress('mini-diagnostic');
        }
        if (cancelled) return;
        // Full vs check-in: the launch source decides (selectors/
        // diagnosticVariant). Onboarding / home CTA → always the full 40Q
        // starting point, even when a stale record exists (a check-in's band
        // never anchors the score, so serving it there carried a stale band
        // forward as the "starting score"). The plan's check-in card → the
        // short variant, but only for a measured student (diagnostic record
        // or scoreable real-test attempt — a funnel starter plan is a
        // scaffold, not evidence).
        const variant = chooseDiagnosticVariant({
          launchSource: diagLaunchSourceRef.current,
          miniDiagnostic: inputs.miniDiagnostic,
          practiceTestResults: inputs.practiceTestResults,
        });
        const focusSkills = (inputs.studyPlan?.weaknesses || [])
          .map((w) => w.skillId)
          .filter(Boolean)
          .slice(0, 6);
        const attemptId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        const { test } = await buildDiagnosticTest({
          userId: user.uid,
          attemptId,
          excludeIds: inputs.answeredQuestionIds || [],
          variant,
          focusSkills,
        });
        if (!cancelled) setDiagnosticTest(test);
      } catch (e) {
        console.error('[diagnosticV2] build failed:', e);
        if (!cancelled) setDiagnosticTest('error');
      }
    })();
    return () => { cancelled = true; };
  }, [onRampActive, ffDiagnosticV2, user?.uid, diagnosticTest]);

  // Leaving the on-ramp drops the built test so the next entry (a later
  // check-in) samples a fresh sitting instead of remounting a finished one.
  useEffect(() => {
    if (onRampActive === false && diagnosticTest) setDiagnosticTest(null);
    if (onRampActive === false) diagLaunchSourceRef.current = null;
  }, [onRampActive, diagnosticTest]);

  const renderOnRamp = () => {
    if (ffDiagnosticV2) {
      if (diagnosticTest === 'error') {
        return (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', padding: '24px' }}>
            <div style={{ textAlign: 'center', maxWidth: '420px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: '0 0 8px' }}>
                Couldn't load your diagnostic
              </h2>
              <p style={{ color: 'var(--color-slate-600)', fontSize: '15px', margin: '0 0 20px' }}>
                Check your connection and try again.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setDiagnosticTest(null)}
                  style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: '#ea580c', color: '#ffffff', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Same contract as the runner's exit: a persistent build
                    // failure must not re-seize the app at every login.
                    try { localStorage.setItem(`seva:onrampSnooze:${user?.uid}`, String(Date.now())); } catch { /* storage unavailable */ }
                    setOnRampActive(false);
                  }}
                  style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid var(--color-slate-300)', background: '#ffffff', color: 'var(--color-slate-700)', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>
        );
      }
      if (!diagnosticTest) {
        return <div style={{ minHeight: '100vh', background: '#ffffff' }} />;
      }
      return (
        // Mimic the takingTest scroll-lock (#main-content style) — the
        // runner's two-pane session shell manages its own scroll inside a
        // locked 100vh parent; renderOnRamp mounts OUTSIDE #main-content.
        <div style={{ height: '100vh', overflow: 'hidden' }}>
          <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#ffffff' }} />}>
            <PracticeTest
              test={diagnosticTest}
              user={user}
              isTimed={true}
              savedProgress={(() => {
                // Belt for the v1→v2 boundary: never feed the runner a saved
                // record that lacks the v2 manifest (its answer keys belong
                // to a different question set).
                const sp = getTestProgress('mini-diagnostic');
                return sp?.diagnosticManifest ? sp : null;
              })()}
              onSaveProgress={(progressData) => { if (user) saveTestProgress('mini-diagnostic', progressData); }}
              onClearProgress={() => clearTestProgress('mini-diagnostic')}
              onDiagnosticFinished={handleOnRampFinished}
              // Last trustworthy composite midpoint (the prior representative
              // band). A check-in's own band over-samples focus skills and
              // reads low — the finish pipeline anchors the regenerated plan's
              // arc on this instead of the fresh deflated center.
              diagnosticScoreAnchor={getTrustedBandMidpoint(miniDiagnostic)}
              onGoToStudyPlan={() => { setOnRampActive(false); setView('studyPlan'); }}
              onBack={() => {
                // Deliberate exit: don't re-seize the app at every login for
                // 24h (the dashboard resume card remains the way back in).
                try { localStorage.setItem(`seva:onrampSnooze:${user?.uid}`, String(Date.now())); } catch { /* storage unavailable */ }
                setOnRampActive(false);
              }}
              answeredQuestionIds={answeredQuestionIds}
              completedLessons={completedLessons}
              practiceProgress={practiceProgress}
            />
          </React.Suspense>
        </div>
      );
    }
    return (
      <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#ffffff' }} />}>
        <MiniDiagnosticShell
          user={user}
          savedProgress={getTestProgress('mini-diagnostic')}
          onSaveProgress={saveTestProgress}
          onClearProgress={clearTestProgress}
          answeredQuestionIds={answeredQuestionIds}
          completedLessons={completedLessons}
          practiceProgress={practiceProgress}
          onFinished={handleOnRampFinished}
          onViewPlan={() => { setOnRampActive(false); setView('studyPlan'); }}
          onSkip={handleOnRampSkip}
        />
      </React.Suspense>
    );
  };

  // Inner onboarding finished: persist the collected profile (one merged write)
  // then unmount → the app shell renders the first-run home. We land the student
  // home regardless of a write failure so a transient error can't trap them
  // (a failed stamp just re-offers the flow next session, per the on-ramp's
  // resilience model). The diagnostic is launched later, from the home CTA.
  const handleInnerOnboardingFinished = async (payload) => {
    // Post-auth funnel analytics: the pre-signup events ride phCapture with
    // an anonymous id; this one has a uid, closing the loop for the
    // personal-onboarding conversion read (copyVariant tags the cohort).
    trackEvent(user?.uid, 'onboarding', 'inner_onboarding_completed', {
      copyVariant: 'personal-v1',
      pickedAreas: (payload?.weakMathAreas?.length || 0) + (payload?.weakRWAreas?.length || 0),
      hasTestDate: !!payload?.testDate,
      studyDaysPerWeek: payload?.studyDaysPerWeek || null,
    });
    // completeInnerOnboarding does a Firestore setDoc, which HANGS (never
    // settles) on network loss under the SDK's memory persistence. A bare
    // await here would strand the student behind InnerOnboarding's disabled
    // Finish button forever. Race an ~8s timeout (same pattern as
    // useProgress.withTimeout) so we always land them home; persistence stays
    // best-effort — a failed stamp just re-offers the flow next session.
    let timer;
    let profileSaved = true;
    try {
      await Promise.race([
        completeInnerOnboarding(payload),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('onboarding-save-timeout')), 8000); }),
      ]);
    } catch (e) {
      profileSaved = false;
      console.error('[innerOnboarding] profile save failed or timed out:', e);
      showToast({ type: 'info', message: 'We could not save your answers, but you can keep going.' });
    } finally {
      clearTimeout(timer);
    }
    // Starter plan: the answers they just gave become their first study plan
    // (check-in as task 1). Guarded so a re-run of the flow (dev force param,
    // re-offered session) can never clobber a real, evidence-based plan.
    // ONLY when the profile stamp landed: a starter plan without the stamp
    // would make innerOnboardingPending false forever (its !studyPlan check),
    // silently orphaning the lost answers with no way to redo the flow. When
    // the stamp failed, saving nothing keeps the documented resilience model —
    // the flow simply re-offers next session.
    const hasTests = Object.keys(practiceTestResults || {}).length > 0;
    if (profileSaved && !studyPlan && !hasTests) {
      try {
        const { buildStarterPlan } = await import('./services/starterPlanService');
        const starter = buildStarterPlan({
          targetScore: payload?.targetScore,
          currentScore: payload?.currentScore,
          testDate: payload?.testDate || user?.testDate,
          worryArea: payload?.worryArea,
          confidentArea: payload?.confidentArea,
          weakMathAreas: payload?.weakMathAreas,
          weakRWAreas: payload?.weakRWAreas,
          studyDaysPerWeek: payload?.studyDaysPerWeek,
          // Pre-signup funnel answers (study window + session length) ride the
          // user doc, not the inner-onboarding payload.
          studyWindow: user?.onboardingProfile?.answers?.studyWindow,
          sessionLength: user?.onboardingProfile?.answers?.sessionLength,
        });
        if (starter) {
          let planTimer;
          await Promise.race([
            saveStudyPlan(starter),
            new Promise((_, reject) => { planTimer = setTimeout(() => reject(new Error('starter-plan-save-timeout')), 8000); }),
          ]).finally(() => clearTimeout(planTimer));
        }
      } catch (e) {
        console.error('[innerOnboarding] starter plan failed (non-blocking):', e);
      }
    }
    // A completed account never needs the "Do this later" marker again.
    try { if (user?.uid) localStorage.removeItem(innerOnboardingDismissKey(user.uid)); } catch { /* ignore */ }
    setInnerOnboardingActive(false);
    setView('dashboard');
  };

  // Leaving mid-flow saves NO answers — but it does drop a local dismissal
  // marker so a page refresh doesn't seize the screen with the flow again.
  // The "Finish onboarding" hero button is the re-entry from then on.
  const innerOnboardingDismissKey = (uid) => `seva:innerOnboarding:dismissed:${uid}`;
  const handleInnerOnboardingExit = () => {
    try { if (user?.uid) localStorage.setItem(innerOnboardingDismissKey(user.uid), new Date().toISOString()); } catch { /* storage unavailable */ }
    setInnerOnboardingActive(false);
    setView('dashboard');
  };

  // True while the setup flow is still owed (same predicate the auto-launch
  // uses). Surfaces the "Finish onboarding" hero button after a "Do this
  // later" dismissal, so the flow is one click away instead of next-login.
  const innerOnboardingPending = Boolean(
    ffInnerOnboarding && user && progressHydrated &&
    !user.innerOnboardingCompletedAt &&
    !user.onboardingCompletedAt &&
    !user.onboardingSkippedAt &&
    Object.keys(practiceTestResults || {}).length === 0 &&
    !studyPlan &&
    !(inProgressTests && inProgressTests['mini-diagnostic'])
  );
  const handleResumeInnerOnboarding = () => setInnerOnboardingActive(true);

  const renderInnerOnboarding = () => (
    <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#F6F4EF' }} />}>
      <InnerOnboarding user={user} onComplete={handleInnerOnboardingFinished} onExit={handleInnerOnboardingExit} />
    </React.Suspense>
  );

  // Study plan fast path: reprioritize + save the deterministic plan so the UI
  // has a plan immediately. AI augmentation happens ONLY in the hybrid
  // artifact pipeline (PracticeTest Phase 2 → generateAndPersistHybridPlan) —
  // a second fire-and-forget AI call used to live here and raced that path,
  // doubling the Anthropic spend per test to write a root field the artifact
  // hydration shadows anyway.
  const handleSaveStudyPlan = async (deterministicPlan) => {
    if (!deterministicPlan || !user?.uid) return;

    // The closure predates the optimistic insert of the just-saved attempt,
    // so on a student's SECOND test the map still has 1 entry — `<= 1` made
    // reprioritization first fire on test 3. Zero prior entries = first test.
    const isFirstTest = Object.keys(practiceTestResults || {}).length < 1;

    // Re-prioritize (skip on test 1 — no prior plan to reprioritize)
    const planToSave = isFirstTest
      ? deterministicPlan
      : reprioritizePlan(
          deterministicPlan,
          skillProgress,
          practiceTestResults,
          reviewQueue,
          user?.testDate
        );

    await saveStudyPlan(planToSave);
  };

  // Prescriptive practice - auto-selects difficulty based on performance
  const startPrescriptivePractice = async (moduleId, sectionName, opts = {}) => {
    if (!ensurePracticeAccess()) return;
    let getRandomQuestions;
    try {
      ({ getRandomQuestions } = await loadTopicQuestions());
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }

    // Get student's performance for this section
    const practiceKey = `${moduleId}-${sectionName}`;
    const performance = practiceProgress[practiceKey];

    // Calculate optimal difficulty based on past performance
    const difficulty = calculateOptimalDifficulty(performance?.bestScore);

    // Get questions at the recommended difficulty (with fallback)
    let questions = getRandomQuestions(moduleId, sectionName, 5, {
      difficulty,
      shuffle: true
    });

    // Fallback: if not enough questions at that difficulty, get mixed
    if (questions.length < 5) {
      questions = getRandomQuestions(moduleId, sectionName, 5, { shuffle: true });
    }

    if (questions.length === 0) {
      showToast({ type: 'info', message: 'No practice questions available for this topic right now.' });
      return;
    }

    // Launch in the modern assigned shell — the legacy 'prescriptive' view
    // diverged from the production drill experience (no rounds, no Assisted
    // Help panel) and study-plan fallbacks kept landing students on it.
    const rounds = buildRounds(questions.map(q => q.id), 8);
    const roundsWithStart = rounds.map((r, i) =>
      i === 0 ? { ...r, startedAt: new Date().toISOString() } : r,
    );

    setTrySimilarExhausted(new Set());
    setPracticeState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      showHint: false,
      showRoundComplete: false,
      answers: {},
      isComplete: false,
      shuffledQuestions: questions,
      rounds: roundsWithStart,
      currentRoundIndex: 0,
      practiceMode: 'assigned',
      assignmentMeta: {
        label: `${sectionName} Practice`,
        source: 'module-section',
        recommendedDifficulty: difficulty,
        // Legacy module/section plan cards pass the matching weakness so the
        // feedback panel's diagnostic sentence renders (it was always null).
        weakness: opts.weakness || null,
      },
    });
    setActiveModule(null);
    setActiveSection('__assigned__');
    setShowCalculator(false);
    setView('practice');
  };

  // Launch a timed pacing drill (Phase 2 — pacingService runner). The card
  // passes the chosen mode config; we source MCQ bank questions matching its
  // difficulty filter, then hand off to the self-contained PacingDrill runner.
  const startPacingDrill = async (config) => {
    if (!config) return;
    if (!ensurePracticeAccess()) return;
    // Remember where we launched from so onExit can return there. The plan
    // (inline tab or standalone) launches via the embedded Pacing section;
    // everything else falls back to the Dashboard.
    setPacingDrillEntryView(view === 'studyPlan' ? 'studyPlan' : 'dashboard');
    let getQuestionsByDomain;
    try {
      ({ getQuestionsByDomain } = await loadMathBank());
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    const pool = [];
    ['algebra', 'problem-solving', 'advanced-math', 'geometry'].forEach((domain) => {
      try { pool.push(...(getQuestionsByDomain(domain) || [])); } catch { /* domain absent */ }
    });
    // Fisher-Yates shuffle so each drill draws a fresh, representative set.
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const questions = selectPacingQuestions(pool, config);
    if (questions.length === 0) {
      showToast({ type: 'info', message: 'No pacing questions available right now. Try a practice test first.' });
      return;
    }
    setPacingSession({ config, questions });
    setView('pacingDrill');
  };

  // Land the Practice Bank on a Learn chapter's skills. Derives {section,
  // domain, skillSlugs} from the chapter (math → 'math', rw → 'rw'; domain via
  // the CB taxonomy), stamps a fresh token so the bank re-fires its scroll +
  // purple focus pulse, and navigates. Strategy chapters (cbSkills: []) never
  // reach here — the reader hides the CTA for them.
  const focusPracticeOnChapter = (chapter) => {
    const skillSlugs = Array.isArray(chapter?.cbSkills) ? chapter.cbSkills : [];
    if (skillSlugs.length === 0) { setPracticeFocus(null); setView('practiceBank'); return; }
    const section = chapter.unitId && chapter.unitId.startsWith('rw') ? 'rw' : 'math';
    let domain = null;
    for (const slug of skillSlugs) {
      if (CB_SKILL_TO_DOMAIN.has(slug)) { domain = CB_SKILL_TO_DOMAIN.get(slug); break; }
    }
    setPracticeFocus({ section, domain, skillSlugs, token: Date.now() });
    setView('practiceBank');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally a plain per-render function; wrapping it in useCallback would freeze the large set of state values it closes over and change launch behavior
  const startAssignedPractice = async (questionIds, meta = {}) => {
    if (!ensurePracticeAccess()) return;
    let resolveAssignedQuestions;
    try {
      ({ resolveAssignedQuestions } = await loadPracticeRouting());
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    const { resolved } = resolveAssignedQuestions(questionIds);
    if (resolved.length === 0) return;

    // Day-2 Acely-polish: split into rounds (default 8 questions each)
    // so the shell can show round progress + an interstitial between rounds.
    const rounds = buildRounds(resolved.map(q => q.id), 8);
    const roundsWithStart = rounds.map((r, i) =>
      i === 0 ? { ...r, startedAt: new Date().toISOString() } : r,
    );

    setTrySimilarExhausted(new Set());
    setPracticeState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      showHint: false,
      showRoundComplete: false,
      answers: {},
      isComplete: false,
      shuffledQuestions: resolved,
      rounds: roundsWithStart,
      currentRoundIndex: 0,
      practiceMode: 'assigned',
      assignmentMeta: {
        label: meta.label || 'Assigned Practice',
        weekNumber: meta.weekNumber ?? null,
        source: meta.source || 'study-plan-assigned',
        weakness: meta.weakness || null,
        // Carry the section forward so a re-drill (handleRedrillMisses reads
        // assignmentMeta.section) can route back into the same subject bank.
        section: meta.section ?? null,
      },
    });
    setActiveModule(null);
    setActiveSection('__assigned__');
    setShowCalculator(false);
    setView('practice');
  };

  // Post-drill loop: relaunch a fresh Practice-Bank drill containing only the
  // questions the student just missed. Reuses the exact bank launcher
  // (startAssignedPractice) so resume/persist/telemetry all behave identically —
  // the 'practice-bank-redrill' source keeps the resumable-drill machinery on.
  // Guarded: no-op on an empty/missing miss set so a stray click can't launch
  // an empty session.
  const handleRedrillMisses = (missedIds) => {
    if (!Array.isArray(missedIds) || missedIds.length === 0) return;
    startAssignedPractice(missedIds, {
      label: 'Missed questions rerun',
      source: 'practice-bank-redrill',
      section: practiceState.assignmentMeta?.section,
    });
  };

  // Resume a previously-saved, in-flight Practice-Bank drill (the "Continue
  // your last drill" banner). Re-resolves the saved question IDs from the bank,
  // restores answers + position + rounds, and re-paints the current question's
  // recorded answer so the student lands exactly where they left off.
  const resumeActiveDrill = async () => {
    if (!activeDrill || !Array.isArray(activeDrill.questionIds) || activeDrill.questionIds.length === 0) return;
    if (!ensurePracticeAccess()) return;
    let resolveAssignedQuestions;
    try {
      ({ resolveAssignedQuestions } = await loadPracticeRouting());
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    // resolveAssignedQuestions preserves input order and drops only stale ids.
    const { resolved } = resolveAssignedQuestions(activeDrill.questionIds);
    if (resolved.length === 0) { clearActiveDrill(); return; }

    const savedIds = activeDrill.questionIds.map(String);
    const answers = activeDrill.answers || {};

    // Realign the resume position by the saved CURRENT question's id, not its
    // numeric index: if an earlier id went stale and was dropped, `resolved` is
    // shorter and a raw index would land on the wrong question.
    const savedCurrentId = savedIds[activeDrill.currentQuestionIndex] ?? null;
    let idx = savedCurrentId != null
      ? resolved.findIndex(q => String(q.id) === savedCurrentId)
      : -1;
    if (idx < 0) idx = Math.min(activeDrill.currentQuestionIndex || 0, resolved.length - 1);

    // Trust the saved rounds only when nothing was dropped — otherwise they
    // still reference missing ids and their boundaries desync (the celebration
    // interstitial can never fire). Rebuild from the resolved ids and recompute
    // the current round from the realigned position.
    const dropped = resolved.length !== savedIds.length;
    const rounds = (!dropped && Array.isArray(activeDrill.rounds))
      ? activeDrill.rounds
      : buildRounds(resolved.map(q => q.id), 8);
    const roundIdx = findRoundIndexForQuestion(rounds, resolved[idx]?.id);
    const currentRoundIndex = roundIdx >= 0 ? roundIdx : (activeDrill.currentRoundIndex || 0);

    const restored = restoreAnswerStateForQuestion(answers, resolved[idx]);

    setTrySimilarExhausted(new Set());
    setPracticeState({
      currentQuestionIndex: idx,
      selectedAnswer: restored.selectedAnswer,
      showFeedback: restored.showFeedback,
      showHint: false,
      showRoundComplete: false,
      answers,
      isComplete: false,
      shuffledQuestions: resolved,
      rounds,
      currentRoundIndex,
      practiceMode: 'assigned',
      // Keep the original 'practice-bank-*' source so the auto-persist effect
      // keeps tracking this resumed session.
      assignmentMeta: activeDrill.assignmentMeta || { label: 'Practice Bank', source: 'practice-bank-resumed' },
    });
    setActiveModule(null);
    setActiveSection(activeDrill.section || '__assigned__');
    setShowCalculator(false);
    setView('practice');
  };

  const startAdaptivePractice = async (opts = {}) => {
    if (!ensurePracticeAccess()) return;
    // Resolve + stash the routing namespace BEFORE any session state exists:
    // handleNextQuestion reads practiceRoutingRef synchronously per answer.
    let routing;
    try {
      routing = await loadPracticeRouting();
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    practiceRoutingRef.current = routing;
    const {
      normalizeDomain,
      RW_DOMAIN_ORDER,
      buildDomainAdaptiveQueueSeed,
      buildAdaptiveSeedFromIds,
      createAdaptiveSessionState,
      deserializeAdaptiveState,
      getNextAdaptiveQuestion,
    } = routing;

    const rawDomain = opts.enforcedDomain;
    const resolvedDomain = rawDomain ? normalizeDomain(rawDomain) : null;
    const label = opts.label;

    let queueSeed;
    let sessionState;

    if (Array.isArray(opts.poolIds) && opts.poolIds.length > 0) {
      // Topic-scoped adaptive round (Practice Bank): the pool is an explicit
      // id list — every question type under one topic — and the adaptive engine
      // ladders difficulty up/down over it. Always ephemeral (free practice,
      // never persisted into the plan's adaptive slot).
      queueSeed = buildAdaptiveSeedFromIds({
        ids: opts.poolIds,
        label,
        weakDomains: resolvedDomain ? [resolvedDomain] : [],
        seed: `${label || 'topic'}:${opts.poolIds.length}`,
      });
      if (!queueSeed?.poolIds?.length) return;
      sessionState = createAdaptiveSessionState(queueSeed);
    } else if (resolvedDomain) {
      // Phase 2 parity: pass math weaknesses so the seed can bias its pool
      // toward currently-missed SAT Patterns within this domain (Tier-1
      // routing for the adaptive flow, matching what AssignedPracticeShell
      // already gets via getTargetedWeaknessSet). When the plan has no
      // weaknesses or none have missedPatterns, the seed falls back to the
      // plain domain shuffle — same behavior as before.
      // Filter weaknesses to the section the enforced domain belongs to. Math
      // keeps its Tier-1 SAT-pattern bias; an R&W domain scopes to R&W
      // weaknesses (no pattern bias — the seed builder gates that to math).
      const domainSection = RW_DOMAIN_ORDER.includes(resolvedDomain) ? 'rw' : 'math';
      const planWeaknesses = Array.isArray(studyPlan?.weaknesses)
        ? studyPlan.weaknesses.filter(w => w && ((w.section === 'rw' ? 'rw' : 'math') === domainSection))
        : [];
      queueSeed = buildDomainAdaptiveQueueSeed({
        enforcedDomain: resolvedDomain,
        existingPoolIds: studyPlan?.adaptivePractice?.poolIds || [],
        seed: resolvedDomain + (studyPlan?.adaptivePractice?.createdAt || ''),
        weaknesses: planWeaknesses,
      });
      if (!queueSeed?.poolIds?.length) return;
      sessionState = createAdaptiveSessionState(queueSeed);
    } else {
      queueSeed = studyPlan?.adaptivePractice;
      if (!queueSeed?.poolIds?.length) return;

      const persisted = studyPlan?.adaptivePracticeState;
      sessionState = (persisted?.answered?.length > 0 && !persisted?.isCompleted)
        ? deserializeAdaptiveState(persisted)
        : createAdaptiveSessionState(queueSeed);

      // A resumed session whose persisted state is already exhausted
      // (totalAnswered >= sessionLength with an empty retryQueue — see
      // getNextAdaptiveQuestion) deserializes to a state that immediately
      // yields no question, so the launcher below would silently no-op
      // forever. Detect that and restart from a fresh session so pressing
      // Start always opens a question.
      if (!getNextAdaptiveQuestion(queueSeed, sessionState).question) {
        sessionState = createAdaptiveSessionState(queueSeed);
      }
    }

    const { question } = getNextAdaptiveQuestion(queueSeed, sessionState);
    if (!question) return;

    setPracticeState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      showHint: false,
      answers: {},
      isComplete: false,
      shuffledQuestions: [question],
      practiceMode: 'adaptive',
      adaptiveQueueSeed: queueSeed,
      adaptiveSessionState: sessionState,
      adaptiveDomainLabel: label || null,
      // Practice Bank rounds are free practice: don't persist their session
      // into the study plan's adaptivePracticeState slot (would clobber it).
      adaptiveEphemeral: !!opts.ephemeral,
      // A 'practice-bank-*' source makes recordBankPractice fire (mastery
      // bands) AND routes the render to the SEVA Round shell in adaptive mode.
      ...(opts.source ? { assignmentMeta: { label: label || 'Practice', source: opts.source } } : {}),
    });
    setActiveModule(null);
    setActiveSection('__adaptive__');
    setShowCalculator(false);
    setView('practice');
  };

  /**
   * loadPastAttemptData — everything the diagnosis screen and the answer
   * review need for a test's NEWEST attempt: the exact questions the student
   * saw (per-attempt snapshot, live test as fallback), their answers, the
   * stored score, the diagnostic report (regenerated for legacy attempts)
   * and the saved AI narrative. Null when there is no attempt or a corpus
   * chunk failed to load (already toasted).
   */
  const loadPastAttemptData = async (test) => {
    // Pick the NEWEST attempt order-independently by completedAt. The
    // attempts array orientation is not stable: trimAttempts stores it
    // newest-first after Firestore hydration, but the in-session
    // optimistic write appends newest-last — so attempts[length-1]
    // returned the OLDEST attempt on hydrated/retaken tests, making
    // Review Answers show the first attempt's score/answers/diagnosis.
    const testResults = practiceTestResults?.[test.id];
    const lastAttempt = (testResults?.attempts || []).reduce((best, a) => {
      if (!a) return best;
      if (!best) return a;
      return (Date.parse(a.completedAt) || 0) >= (Date.parse(best.completedAt) || 0) ? a : best;
    }, null);
    if (!lastAttempt) return null;

    // Try to load the per-attempt snapshot. When present, Review Answers
    // renders the *original* question objects the student saw; otherwise
    // we fall back to the live test file and surface a stale-content
    // notice (legacy attempts predate the snapshot subcollection).
    let snapshotDoc = null;
    if (user?.uid && lastAttempt.attemptId) {
      try {
        snapshotDoc = await loadAttemptSnapshot(user.uid, lastAttempt.attemptId);
      } catch (err) {
        console.warn('[ViewResults] Snapshot load failed:', err.message);
      }
    }

    // Build a `reviewTest` shaped like the live `test` but populated
    // from the snapshot when available. Falls back to the live test.
    let reviewTest = test;
    let reconstructedAnswers = {};
    const snapshotMissing = !snapshotDoc;

    if (snapshotDoc?.questionsSnapshot?.length) {
      // Group snapshot rows back into modules so the review UI sees the
      // same shape it gets from a live test object.
      const moduleMap = new Map();
      snapshotDoc.questionsSnapshot.forEach(snap => {
        const modIdx = snap.moduleIndex ?? 0;
        if (!moduleMap.has(modIdx)) {
          const liveMod = test.modules?.[modIdx];
          // Keep the section axis ('reading-writing' | 'math') — without
          // it scoreTest collapses every module into one 'default'(=math)
          // bucket and the whole 98-item test scores as a single Math
          // section (~210). Mirrors diagnosticReportLoader.js.
          const section = snap.section ?? liveMod?.section ?? null;
          moduleMap.set(modIdx, {
            title: liveMod?.title || sectionModuleLabel(section, modIdx),
            section,
            questions: [],
          });
        }
        // Backfill stimulus fields (passage/diagram/table/formula)
        // from the live test at the same position — older snapshots
        // never persisted them, which left R&W review passage-less
        // and math review figure-less. Easy-route attempts saw an
        // easy variant in that section's M2 slot (math M2 = final
        // module; R&W M2 = second reading-writing module), so merge
        // from the module the student actually took.
        const mathRoute = lastAttempt.diagnosticData?.mathRoute;
        const rwRoute = lastAttempt.diagnosticData?.rwRoute;
        const rwSlots = (test.modules || [])
          .map((m, i) => (m.section === 'reading-writing' ? i : -1))
          .filter(i => i >= 0);
        let liveMod = test.modules?.[modIdx];
        if (mathRoute === 'easy'
            && test.module2Easy
            && modIdx === (test.modules?.length ?? 0) - 1) {
          liveMod = test.module2Easy;
        } else if (rwRoute === 'easy'
            && test.rwModule2Easy
            && modIdx === rwSlots[1]) {
          liveMod = test.rwModule2Easy;
        }
        const liveQ = liveMod?.questions?.[
          snap.questionIndex ?? moduleMap.get(modIdx).questions.length
        ];
        moduleMap.get(modIdx).questions.push({
          id: snap.id,
          type: snap.type,
          question: snap.stem,
          stem: snap.stem,
          choices: snap.choices,
          correctAnswer: snap.correctAnswer,
          explanation: snap.explanation,
          difficulty: snap.difficulty,
          band: snap.band,
          skills: snap.skills || [],
          passage: snap.passage ?? liveQ?.passage,
          passages: snap.passages ?? liveQ?.passages,
          studentNotes: snap.studentNotes ?? liveQ?.studentNotes,
          questionContinued: snap.questionContinued ?? liveQ?.questionContinued,
          diagram: snap.diagram ?? liveQ?.diagram,
          questionTable: snap.questionTable ?? liveQ?.questionTable,
          questionFormula: snap.questionFormula ?? liveQ?.questionFormula,
        });
      });
      reviewTest = {
        ...test,
        modules: Array.from(moduleMap.keys())
          .sort((a, b) => a - b)
          .map(k => moduleMap.get(k)),
      };
      // Snapshot-derived attempts persist exact answers, so use those.
      reconstructedAnswers = { ...(snapshotDoc.answers || {}) };
    } else {
      // Legacy fallback: rebuild a synthetic answer map from
      // diagnosticData.questionDetails so the review UI can color-code
      // correct/incorrect even without the saved per-attempt snapshot.
      const qDetails = lastAttempt.diagnosticData?.questionDetails || {};
      Object.entries(qDetails).forEach(([key, detail]) => {
        const [modIdx, qIdx] = key.split('-').map(Number);
        const question = test.modules[modIdx]?.questions[qIdx];
        if (!question) return;
        if (detail.isCorrect) {
          reconstructedAnswers[key] = question.correctAnswer;
        } else {
          reconstructedAnswers[key] = '__wrong__';
        }
      });
    }

    // Load saved diagnostic report — only regenerate if not saved
    // (legacy attempts). diagnosticEngine is a ~190KB lazy chunk
    // (loadDiagnosticEngine), awaited only on this legacy path.
    let diagReport = lastAttempt.diagnosticReport;
    if (!diagReport) {
      let runDiagnostic;
      try {
        ({ runDiagnostic } = await loadDiagnosticEngine());
      } catch (err) {
        console.warn('[ViewResults] diagnostic engine load failed:', err && err.message);
        showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
        return null;
      }
      diagReport = runDiagnostic(
        reviewTest, reconstructedAnswers, lastAttempt.diagnosticData,
        skillProgress || {},
        { targetScore: user?.targetScore, currentScore: user?.currentScore, testDate: user?.testDate },
        practiceTestResults || {}
      );
    }

    // Load saved AI diagnostic narrative from Firestore
    let aiState = { status: 'idle', narrative: null, error: null };
    if (user?.uid) {
      try {
        const savedAi = await getReadyAiDiagnostic(user.uid, test.id, lastAttempt.timestamp);
        if (savedAi?.narrative) {
          aiState = { status: 'ready', narrative: savedAi.narrative, error: null };
        }
      } catch (err) {
        console.warn('[ViewResults] AI narrative load failed:', err.message);
      }
    }

    return {
      test: reviewTest,
      liveTest: test,
      answers: reconstructedAnswers,
      // Authoritative score persisted at completion — the results
      // screen displays this rather than re-scoring the reconstructed
      // review test (which can diverge, e.g. a section-stripped or
      // content-swapped snapshot scoring as a single ~210 Math bucket).
      storedResult: (typeof lastAttempt.scaledScore === 'number') ? {
        scaledScore: lastAttempt.scaledScore,
        sectionScores: lastAttempt.sectionScores,
        isMultiSection: lastAttempt.isMultiSection,
      } : null,
      diagnosticData: lastAttempt.diagnosticData,
      diagnosticReport: diagReport,
      aiDiagnosticState: aiState,
      attemptId: lastAttempt.attemptId || null,
      snapshotMissing,
    };
  };

  // Study Plan / Review Queue deep link ("review your misses from Test N"):
  // the same read-only Bluebook review of that test's newest attempt.
  const handleReviewTestWrong = async (testId) => {
    if (!testId) return;
    let getAllPracticeTests;
    try {
      ({ getAllPracticeTests } = await loadPracticeTests());
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    const test = getAllPracticeTests().find((t) => t.id === testId);
    if (!test) {
      showToast({ type: 'error', message: 'Could not load that test.' });
      return;
    }
    openPastAttempt(test, 'review', view === 'dashboard' ? 'dashboard' : 'studyPlan');
  };

  // Tests list / Home → a past attempt's AI diagnosis ('diagnosis') or its
  // read-only Bluebook review ('review'). `returnTo` is where Back lands.
  const openPastAttempt = async (test, screen, returnTo = 'practiceTests') => {
    const data = await loadPastAttemptData(test);
    if (!data) return;
    setSelectedPracticeTest(test);
    if (screen === 'review') {
      setViewingResultsData({ ...data, reviewModule: 0, returnTo });
      setView('reviewingPastResults');
      return;
    }
    setViewingResultsData({ ...data, returnTo });
    setView('diagnosticReport');
  };

  /**
   * handleDrillFromResults — launch a targeted drill on ONE weak skill from
   * the post-test "Domains & Skills" block. Routes through the exact-question-
   * type 3-tier cascade (getTargetedWeaknessSet) and — critically — passes the
   * skill's missedPatterns so Tier 1 (SAT Pattern) can fire instead of the
   * blunt skill-alias Tier 3 (see project_skill_alias_routing_bug). Section-
   * routed: 'rw' weaknesses hit the R&W bank, everything else the math bank.
   *
   * @param {{skillId:string, skill?:string, domain?:string,
   *   section?:'math'|'rw', missedPatterns?:string[]}} weakness
   */
  const handleDrillFromResults = async (weakness) => {
    if (!weakness || !weakness.skillId) return;
    if (!ensurePracticeAccess()) return;
    const section = weakness.section === 'rw' ? 'rw' : 'math';
    const weakSkills = [{
      skillId: weakness.skillId,
      domain: weakness.domain,
      // The load-bearing bit: honest Tier-1 routing needs the exact patterns.
      missedPatterns: Array.isArray(weakness.missedPatterns) ? weakness.missedPatterns : [],
    }];
    let pool = [];
    try {
      const bank = section === 'rw' ? await loadRWBank() : await loadMathBank();
      pool = bank.getTargetedWeaknessSet({ weakSkills, count: 12 }) || [];
    } catch (err) {
      logWarn('testReview', 'drill_route_failed', { message: err?.message || String(err) });
    }
    const ids = pool.map(q => q && q.id).filter(Boolean);
    if (ids.length === 0) {
      showToast({ type: 'info', message: 'No drill questions are available for that skill yet.' });
      return;
    }
    setViewingResultsData(null);
    startAssignedPractice(ids, {
      label: `${weakness.skill || 'Skill'} Practice`,
      source: 'test-review-drill',
      weakness: {
        skillId: weakness.skillId,
        skill: weakness.skill,
        domain: weakness.domain,
        section,
        missedPatterns: weakSkills[0].missedPatterns,
      },
    });
  };

  const handleShowHint = () => {
    setPracticeState(prev => ({ ...prev, showHint: true }));
  };

  const handleSelectAnswer = (answerId) => {
    if (!practiceState.showFeedback) {
      setPracticeState(prev => ({ ...prev, selectedAnswer: answerId }));
    }
  };

  const handleNavigateToQuestion = (targetIdx) => {
    setPracticeState(prev => {
      if (targetIdx < 0 || targetIdx >= prev.shuffledQuestions.length) return prev;
      // Restore the answer already recorded for the target question so going
      // back shows the student's choice + feedback instead of a blank slate.
      // (Unanswered target → blank, same as advancing to a fresh question.)
      const restored = restoreAnswerStateForQuestion(prev.answers, prev.shuffledQuestions[targetIdx]);
      return { ...prev, currentQuestionIndex: targetIdx, ...restored, showHint: false };
    });
  };

  const handleCheckAnswer = (question) => {
    const isCorrect = practiceState.selectedAnswer === question.correctAnswer;
    setPracticeState(prev => ({
      ...prev,
      showFeedback: true,
      answers: {
        ...prev.answers,
        [question.id]: {
          selected: prev.selectedAnswer,
          correct: isCorrect,
          // Omit when absent — this map is persisted into activeDrill, and
          // Firestore rejects `undefined` field values (config has no
          // ignoreUndefinedProperties).
          ...(question.difficulty != null ? { difficulty: question.difficulty } : {}),
          skills: question.skills || []
        }
      }
    }));

    // Practice-Bank progress: record every answered bank question (right and
    // wrong) into the per-question bankPractice store so the bank can show
    // per-question-type progress. Bank-sourced drills only; kept out of the
    // study-plan dedup set on purpose.
    const isBankDrill = (practiceState.assignmentMeta?.source || '').startsWith('practice-bank');
    if (user?.uid && isBankDrill && question?.id != null) {
      recordBankPractice(question.id, isCorrect);
    }

    const isAdaptiveOrAssigned = practiceState.practiceMode === 'assigned' || practiceState.practiceMode === 'adaptive';
    const isReviewSession = practiceState.assignmentMeta?.source === 'review-queue';
    // Only bank-resolvable string ids can be re-served by the daily-review
    // resolver — numeric topic-file ids and retry::/tq:: synthetics would sit
    // in the queue as permanently-unresolvable phantoms that inflate the due
    // count and shrink sessions. Retry (reviewMode) sessions are excluded
    // outright: their banner promises they won't affect the study plan.
    const isQueueResolvableId = typeof question?.id === 'string' && !question.id.includes('::');
    if (user?.uid && isAdaptiveOrAssigned && !isReviewSession && !practiceState.reviewMode
        && isQueueResolvableId && !isCorrect) {
      // Phase 2: feed production-drill MISSES into the review queue. Stored
      // bank-resolvable (moduleId='bank' + real question id) so spaced repetition
      // can re-serve the exact item. Skip review sessions (the review-complete
      // path already reschedules those) and correct answers (nothing to review).
      addToReviewQueue(user.uid, BANK_REVIEW_MODULE, reviewDisplaySection(question), question.id, false);
    }

    // Next-item-correctness telemetry (the tutor A/B metric): if the student had
    // a tutor exchange on a DIFFERENT (earlier) question, this answer is the
    // "next item" after that exchange — log whether it landed. When the exchange
    // was on THIS question, consumeTutorExchange keeps it pending (the next item
    // hasn't happened yet). Fully fail-silent; adds no latency to the answer path.
    try {
      const nextKey = makeQuestionKey({ id: question?.id, text: question?.question });
      const exchange = consumeTutorExchange(nextKey);
      if (exchange && user?.uid) {
        trackEvent(user.uid, 'tutor', 'tutor_next_item', {
          tutoredQuestionKey: exchange.questionKey,
          nextQuestionKey: nextKey,
          correct: isCorrect,
          skills: question?.skills || [],
        });
      }
    } catch { /* telemetry must never break the answer path */ }
  };

  // onSessionComplete seam for drills (Phase 2). Called from handleNextQuestion's
  // completion branches (adaptive + assigned/standard/review-retry). Fires the
  // drill_completed analytics event and folds assigned/adaptive answers into
  // skillProgress (the drill→mastery loop, 2026-06 audit gap 1). The
  // orchestrator still skips the prediction pipeline for all non-full-test
  // sessions, so drills never pollute the prediction loop (review-retry is
  // doubly gated by reviewMode).
  const fireDrillSessionComplete = (questions) => {
    try {
      const answersMap = practiceState.answers || {};
      const total = Object.keys(answersMap).length || (Array.isArray(questions) ? questions.length : 0);
      const correct = Object.values(answersMap).filter(a => a && a.correct).length;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : null;

      // Daily-review session: close the SM-2 reschedule + streak loop. Maps each
      // answered question back to its reviewQueue key, then the orchestrator
      // advances the schedule, bumps the streak, and returns a summary to toast.
      if (practiceState.assignmentMeta?.source === 'review-queue') {
        const keyByQ = practiceState.reviewKeyByQuestionId || {};
        const reviewItems = Object.entries(answersMap)
          .map(([qid, a]) => ({ key: keyByQ[qid], wasCorrect: !!(a && a.correct) }))
          .filter(it => it.key);
        const reviewSession = buildReviewSession({ reviewItems, userId: user?.uid ?? null });
        // serverStreak: the Firestore-hydrated streak seeds the computation so
        // a fresh device (empty localStorage) can't clobber a longer streak.
        dispatchSessionComplete(reviewSession, { userId: user?.uid ?? null, serverStreak: reviewStreak ?? null })
          .then(out => {
            const s = out?.summary;
            if (s) {
              showToast({
                type: s.accuracy >= 70 ? 'success' : 'info',
                message: `Review complete · ${s.correct}/${s.total} correct${s.streak?.current ? ` · ${s.streak.current}-day streak` : ''}.`,
                duration: 4000,
              });
            }
          })
          .catch(err => console.error('[App] review sessionComplete dispatch error:', err));
        return;
      }

      // Close the drill→mastery loop: assigned/adaptive drill answers update
      // skillProgress just like full tests already do, so a week of drilling
      // moves mastery and the weakness lists between tests.
      // Excluded: daily-review sessions (early-returned above; SM-2 owns that
      // evidence) and review-retry sessions (the "won't affect your study
      // plan" banner is a promise we keep).
      const isAdaptiveOrAssigned = practiceState.practiceMode === 'assigned' || practiceState.practiceMode === 'adaptive';
      if (user?.uid && isAdaptiveOrAssigned && !practiceState.reviewMode) {
        recordDrillSkillAttempts(answersMap);

        // Effort registers (adaptivity audit item 4): a completed drill is
        // real practice — log the day so CalendarMonth + adherence count it.
        // Drill sessions never touch practiceProgress, so without this write
        // both surfaces ignored drill work entirely. Review-retry sessions
        // are excluded above ("won't affect your study plan" promise).
        recordPracticedDay();

        // …and auto-check the matching plan task. Same activity identity the
        // manual checkbox uses ({weekIndex, activityIndex} →
        // markStudyActivityComplete); matching lives in the pure selector
        // findMatchingPlanActivity (exact skillId, then the missed-pattern
        // granularity bridge). Assigned drills only — adaptive sessions have
        // no single skill identity to match against.
        if (practiceState.practiceMode === 'assigned') {
          const weakness = practiceState.assignmentMeta?.weakness;
          const todayDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
          const match = findMatchingPlanActivity(studyPlan, { weakness, todayDayName });
          if (match) {
            markStudyActivityComplete(match.weekIndex, match.activityIndex);
            const skillLabel = weakness?.skill || weakness?.skillName || match.activity?.skillName || match.activity?.title || 'assigned';
            showToast({
              type: 'success',
              message: `Today's ${skillLabel} practice checked off your plan.`,
              duration: 4500,
            });
          }
        }
      }

      const session = buildDrillSession({
        drillMode: practiceState.practiceMode || 'standard',
        section: activeSection || null,
        accuracy,
        itemCount: total,
        source: practiceState.reviewMode
          ? 'review-retry'
          : (practiceState.assignmentMeta?.source || practiceState.practiceMode || null),
        reviewMode: !!practiceState.reviewMode,
        userId: user?.uid ?? null,
      });
      dispatchSessionComplete(session, { userId: user?.uid ?? null })
        .catch(err => console.error('[App] drill sessionComplete dispatch error:', err));
    } catch (e) {
      console.error('[App] fireDrillSessionComplete error:', e);
    }
  };

  const handleNextQuestion = (questions) => {
    // Adaptive mode: ask the queue engine for the next question
    if (practiceState.practiceMode === 'adaptive') {
      // Routing namespace was stashed by startAdaptivePractice before this
      // session could exist. The guard covers the impossible-by-construction
      // case (e.g. a future code path mounting adaptive state another way).
      const routing = practiceRoutingRef.current;
      if (!routing) {
        logWarn('adaptive', 'routing module missing in handleNextQuestion — session cannot advance');
        return;
      }
      // If the student navigated BACK to an already-served question and clicks
      // "Next", just step forward through the existing queue. The generate-next
      // logic below must run ONLY when answering the newest (last-served)
      // question — otherwise re-answering an earlier item would re-score mastery
      // AND append a brand-new question, skipping past the queued ones.
      if (practiceState.currentQuestionIndex < questions.length - 1) {
        handleNavigateToQuestion(practiceState.currentQuestionIndex + 1);
        return;
      }
      const {
        applyAdaptiveResult,
        evaluateAdaptiveCompletion,
        serializeAdaptiveState,
        getNextAdaptiveQuestion,
      } = routing;
      const currentQ = questions[practiceState.currentQuestionIndex];
      // Retry serves are reminted with a `${bankId}::retry-N` serve id (see the
      // append branch below) so the id-keyed answers map can't collide with the
      // ORIGINAL serve of the same bank item — but the adaptive engine tracks
      // the bank id everywhere (retryQueue / seenIds / answered), so all engine
      // + persistence calls use engineId, never the serve id.
      const engineId = currentQ?._adaptiveOriginalId || currentQ?.id;
      const lastAnswer = practiceState.answers[currentQ?.id];
      const isRetry = practiceState.adaptiveSessionState?.seenIds?.has(engineId) &&
        practiceState.adaptiveSessionState.answered.some(a => a.id === engineId);

      let nextState = practiceState.adaptiveSessionState;
      if (currentQ && lastAnswer) {
        nextState = applyAdaptiveResult(nextState, engineId, lastAnswer.correct, isRetry);
      }

      // Evaluate both-rule completion (target + mastery)
      const completion = evaluateAdaptiveCompletion(nextState);

      // Persist state after each answer — but NOT for ephemeral Practice Bank
      // rounds, which must never overwrite the study plan's own adaptive slot.
      const artId = studyPlanMeta?.artifactId;
      if (user?.uid && artId && !practiceState.adaptiveEphemeral) {
        const toSave = { ...serializeAdaptiveState(nextState) };
        if (completion.isComplete) {
          toSave.isCompleted = true;
          toSave.completedAt = new Date().toISOString();
          toSave.sessionsCompleted = (nextState.sessionsCompleted || 0) + 1;
        }
        // hybridStudyPlanService statically imports studyPlanGenerator (which
        // pulls bank getQuestionById), so a static import here would weld the
        // math corpus back into the main chunk. Fire-and-forget persistence —
        // the call was never awaited — so a dynamic import is a drop-in.
        import('./services/hybridStudyPlanService')
          .then(({ patchAdaptivePracticeState }) => patchAdaptivePracticeState(user.uid, artId, toSave))
          .catch(err => console.warn('[App] Failed to persist adaptive state:', err?.message));

        // Also write answered question ID to progress doc for cross-plan dedup.
        // Use engineId (the bank id), never a `::retry-N` serve id — the dedup
        // set must stay resolvable against the bank.
        if (engineId) {
          import('firebase/firestore').then(({ doc: fsDoc, updateDoc: fsUpdate, arrayUnion: fsUnion, serverTimestamp: fsTs }) => {
            import('./firebase/config').then(({ db: fsDb }) => {
              const progressRef = fsDoc(fsDb, 'progress', user.uid);
              fsUpdate(progressRef, {
                answeredQuestionIds: fsUnion(engineId),
                lastUpdated: fsTs(),
              }).catch(err => console.warn('[App] Failed to save adaptive question ID:', err.message));
            });
          });
        }
      }

      const { question: rawNextQ, isComplete: queueExhausted, isRetry: nextIsRetry } = getNextAdaptiveQuestion(
        practiceState.adaptiveQueueSeed, nextState,
      );

      // A retry re-serves the SAME bank id. The session keys answers by
      // question.id, so appending the retry under its bank id would let it
      // restore the ORIGINAL miss's answer (revealed, pre-attempt) when the
      // student navigates back then forward. Remint the retry serve with a
      // unique id and stash the bank id on `_adaptiveOriginalId` (engineId
      // above reads it) so mastery/telemetry still attribute to the bank item.
      const nextQ = (rawNextQ && nextIsRetry)
        ? { ...rawNextQ, id: `${rawNextQ.id}::retry-${nextState.answered.length}`, _adaptiveOriginalId: rawNextQ.id }
        : rawNextQ;

      // Session ends when both rules are met OR queue is exhausted
      if (completion.isComplete || queueExhausted || !nextQ) {
        const finalState = completion.isComplete
          ? { ...nextState, isCompleted: true, completedAt: new Date().toISOString(), sessionsCompleted: (nextState.sessionsCompleted || 0) + 1 }
          : nextState;
        setPracticeState(prev => ({
          ...prev,
          isComplete: true,
          adaptiveSessionState: finalState,
          adaptiveCompletion: completion,
        }));
        fireDrillSessionComplete(questions);
      } else {
        setPracticeState(prev => ({
          ...prev,
          shuffledQuestions: [...prev.shuffledQuestions, nextQ],
          currentQuestionIndex: prev.shuffledQuestions.length,
          selectedAnswer: null,
          showFeedback: false,
          showHint: false,
          adaptiveSessionState: nextState,
        }));
      }
      return;
    }

    // Day-2 Acely-polish: round boundary check (assigned mode only).
    // When the just-answered question was the LAST in its round (and not
    // the last round of the session), pause on a "Round X complete"
    // interstitial in the shell instead of advancing immediately.
    if (practiceState.practiceMode === 'assigned' && Array.isArray(practiceState.rounds)) {
      const currentQ = questions[practiceState.currentQuestionIndex];
      const boundary = classifyRoundBoundary(
        practiceState.rounds,
        currentQ?.id,
        practiceState.answers,
      );
      // Only pause on the interstitial when genuinely finishing the ACTIVE
      // round for the first time. Revisiting an already-completed earlier round
      // (via Back / the navigator) and clicking Continue must NOT re-fire it —
      // that desyncs currentRoundIndex against the question-derived round and
      // can soft-lock a 2-round drill on a dead "Continue to next round".
      const boundaryRound = practiceState.rounds[boundary.roundIndex];
      const isActiveRound = boundary.roundIndex === (practiceState.currentRoundIndex ?? 0);
      if (boundary.isLastInRound && !boundary.isLastRound && isActiveRound && !boundaryRound?.completedAt) {
        const nowIso = new Date().toISOString();
        setPracticeState(prev => ({
          ...prev,
          rounds: prev.rounds.map(r =>
            r.index === boundary.roundIndex ? { ...r, completedAt: nowIso } : r,
          ),
          showRoundComplete: true,
          selectedAnswer: null,
          showFeedback: false,
          showHint: false,
        }));
        const round = practiceState.rounds[boundary.roundIndex];
        const correctInRound = round.questionIds.filter(
          id => practiceState.answers[id]?.correct,
        ).length;
        showToast({
          type: 'success',
          message: `Round ${boundary.roundIndex + 1} complete · ${correctInRound}/${round.questionIds.length} correct.`,
          duration: 3500,
        });
        return;
      }
    }

    if (practiceState.currentQuestionIndex < questions.length - 1) {
      setPracticeState(prev => {
        const nextIndex = prev.currentQuestionIndex + 1;
        // Restore any answer already recorded for the next question (going
        // back then clicking Continue must not present an answered question
        // as blank/re-answerable — re-checking would overwrite the result).
        const restored = restoreAnswerStateForQuestion(prev.answers, prev.shuffledQuestions[nextIndex]);
        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          ...restored,
          showHint: false,
        };
      });
    } else {
      setPracticeState(prev => ({ ...prev, isComplete: true }));
      fireDrillSessionComplete(questions);
    }
  };

  /**
   * handleAdvanceToNextRound — called by the shell's round-summary
   * interstitial. Closes the interstitial, advances currentQuestionIndex
   * to the first question of the next round, and stamps the next round's
   * startedAt.
   */
  const handleAdvanceToNextRound = () => {
    setPracticeState(prev => {
      const nextRoundIndex = (prev.currentRoundIndex ?? 0) + 1;
      if (!prev.rounds || nextRoundIndex >= prev.rounds.length) return prev;
      const nextIndex = prev.currentQuestionIndex + 1;
      // Restore rather than blank: the next round's opener may already be
      // answered (student navigated ahead, then finished this round).
      const restored = restoreAnswerStateForQuestion(prev.answers, prev.shuffledQuestions[nextIndex]);
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        currentRoundIndex: nextRoundIndex,
        showRoundComplete: false,
        rounds: prev.rounds.map((r, i) =>
          i === nextRoundIndex ? { ...r, startedAt: new Date().toISOString() } : r,
        ),
        ...restored,
        showHint: false,
      };
    });
  };

  // Skills whose try-similar pool has been exhausted in this session.
  // The shell disables the button when the current skill is in this set
  // (closes Phase-3 GAP-3 "disable on pool exhaustion").
  const [trySimilarExhausted, setTrySimilarExhausted] = useState(() => new Set());

  /**
   * handleTrySimilar — append a fresh question for the same weak skill after
   * a wrong answer. Inserts the new question right after the current index in
   * `shuffledQuestions` and advances, mirroring the adaptive-mode pattern at
   * handleNextQuestion lines 506-514.
   *
   * Dispatch and section routing live in `services/trySimilarService.js`. This
   * wrapper translates the service's tagged result into UI side effects
   * (toasts, state updates).
   *
   * Failure handling (closes Phase-3 GAP-3):
   *   - dispatcher throws  → error toast, no state change
   *   - dispatcher returns [] → mark skill exhausted (button disables), info toast
   *
   * @param {object} currentQuestion
   */
  const handleTrySimilar = useCallback(async (currentQuestion) => {
    const excludeIds = (practiceState.shuffledQuestions || []).map(q => q.id).filter(Boolean);
    const { pickSimilarQuestion } = await loadTrySimilar();
    const result = pickSimilarQuestion({ currentQuestion, excludeIds });

    switch (result.kind) {
      case 'invalid':
        return;
      case 'no-skill':
        showToast({ type: 'warn', message: 'No skill is tagged on this question — try the next one.' });
        return;
      case 'error':
        // eslint-disable-next-line no-console
        console.warn('[performsat:trySimilar] dispatcher threw:', result.error && result.error.message);
        showToast({ type: 'error', message: 'Could not load a similar question. Please try again.' });
        return;
      case 'exhausted':
        setTrySimilarExhausted(prev => {
          const next = new Set(prev);
          result.skillIds.forEach(s => next.add(s));
          return next;
        });
        showToast({ type: 'info', message: 'No more similar questions for this skill in the bank — try the next one.' });
        return;
      case 'ok':
        setPracticeState(prev => {
          const insertAt = prev.currentQuestionIndex + 1;
          const next = [
            ...prev.shuffledQuestions.slice(0, insertAt),
            result.question,
            ...prev.shuffledQuestions.slice(insertAt),
          ];
          // Add the inserted question to the SAME round as the current question.
          // Rounds are tracked by questionIds; without this the new id belongs to
          // no round, so findRoundIndexForQuestion returns -1 and the shell drops
          // the "Round N · Q M of K" header on the Try-Similar question.
          let rounds = prev.rounds;
          if (Array.isArray(prev.rounds) && prev.rounds.length > 0) {
            const curId = prev.shuffledQuestions[prev.currentQuestionIndex]?.id;
            const rIdx = findRoundIndexForQuestion(prev.rounds, curId);
            if (rIdx >= 0) {
              rounds = prev.rounds.map((r, i) => {
                if (i !== rIdx) return r;
                const ids = [...r.questionIds];
                const pos = ids.indexOf(curId);
                ids.splice(pos >= 0 ? pos + 1 : ids.length, 0, result.question.id);
                return { ...r, questionIds: ids };
              });
            }
          }
          return {
            ...prev,
            shuffledQuestions: next,
            rounds,
            currentQuestionIndex: insertAt,
            selectedAnswer: null,
            showFeedback: false,
            showHint: false,
          };
        });
        return;
      default:
        return;
    }
  }, [practiceState.shuffledQuestions]);

  /**
   * handleTrySimilarFromReview — launches a 1-question assigned-practice
   * session for the same skill as a snapshot item the student is reviewing.
   * Used by ReviewItemCard's Try-Similar CTA (Plan D4 of
   * PAST_TEST_REVIEW_PLAN.md). Differs from handleTrySimilar above (which
   * INSERTS into a running session) — this LAUNCHES a fresh practice flow.
   *
   * @param {object} snapshotItem  — review snapshot of the wrong item
   */
  const handleTrySimilarFromReview = useCallback(async (snapshotItem) => {
    if (!snapshotItem) return;
    let pickSimilarQuestion;
    try {
      ({ pickSimilarQuestion } = await loadTrySimilar());
    } catch (err) {
      showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
      return;
    }
    const result = pickSimilarQuestion({
      currentQuestion: snapshotItem,
      excludeIds: [snapshotItem.id].filter(Boolean),
    });

    switch (result.kind) {
      case 'invalid':
      case 'no-skill':
        showToast({ type: 'warn', message: 'No skill is tagged on this item — cannot drill a similar question.' });
        return;
      case 'error':
        // eslint-disable-next-line no-console
        console.warn('[performsat:trySimilar:review] dispatcher threw:', result.error && result.error.message);
        showToast({ type: 'error', message: 'Could not load a similar question. Please try again.' });
        return;
      case 'exhausted':
        showToast({ type: 'info', message: 'No more similar questions for this skill in the bank.' });
        return;
      case 'ok':
        startAssignedPractice([result.question.id], {
          label: 'Similar Practice',
          source: 'review-try-similar',
        });
        return;
      default:
        return;
    }
  }, [startAssignedPractice]);

  // Legal pages are real URLs that must render for logged-out AND logged-in
  // users without waiting on Firebase auth init. They are full-page navs
  // (plain <a> links), so pathname is immutable for this component's lifetime.
  const legalPath = (typeof window !== 'undefined' ? window.location.pathname : '/').replace(/\/+$/, '') || '/';
  if (legalPath === '/privacy') return <ErrorBoundary><PrivacyPolicy /></ErrorBoundary>;
  if (legalPath === '/terms') return <ErrorBoundary><TermsOfService /></ErrorBoundary>;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.75rem',
        background: 'var(--color-slate-50)',
      }}>
        {/* Branded boot screen — warm canvas + the seva lockup, not a bare
            spinner on white. Presumes nothing about the post-auth route. */}
        <Wordmark fontSize={40} tone="dark" />
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--color-slate-200)',
          borderTop: '3px solid var(--color-brand-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const paletteCommands = [
    { id: 'home', label: 'Go to Home', hint: 'Dashboard', icon: <ChartBarIcon size={16} />, run: () => { setView('dashboard'); setActiveModule(null); setActiveLesson(null); } },
    { id: 'practice', label: 'Practice', hint: 'Practice bank', icon: <TargetIcon size={16} />, run: () => { setPracticeFocus(null); setView('practiceBank'); } },
    { id: 'studyPlan', label: 'Open Study Plan', hint: 'Your plan', icon: <CalendarIcon size={16} />, run: () => setView('studyPlan') },
    { id: 'tests', label: 'Practice Tests', hint: 'Full-length', icon: <ClipboardIcon size={16} />, run: () => { setView('practiceTests'); setSelectedPracticeTest(null); } },
    { id: 'tutor', label: 'Open AI Tutor', hint: 'Ask anything', icon: <BrainIcon size={16} />, run: () => { setView('tutor'); } },
    { id: 'learn', label: 'Learn', hint: 'Chapters', icon: <BookOpenIcon size={16} />, run: () => { setView('learnTab'); setSelectedChapterId(null); } },
    { id: 'videos', label: 'Videos', hint: 'Lessons', icon: <PlayIcon size={16} />, run: () => { setView('modules'); setActiveModule(null); setActiveLesson(null); } },
    { id: 'profile', label: 'Profile & settings', run: () => setView('profile') },
  ];

  return (
    <ErrorBoundary>
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          // Auth-restore gate: while Firebase is still resolving the session,
          // render the same blank shell the lazy chunks use instead of the
          // landing page. Without this, a signed-in student refreshing on "/"
          // could mount the landing page (and its signup funnel) during the
          // restore window — the funnel-while-logged-in hole filed 2026-08-13.
          loading ? (
            <div style={{ minHeight: '100vh', background: '#ffffff' }} />
          ) : !user ? (
            <LandingPage />
          ) : (
            <Navigate to="/course" replace />
          )
        } />

        {/* App route (new) — redirects to /course for now */}
        <Route path="/app/*" element={<Navigate to="/course" replace />} />

        {/* Course Route */}
        <Route path="/course" element={
          user ? (
            innerOnboardingActive === true ? renderInnerOnboarding() :
            onRampActive === true ? renderOnRamp() : (
            <div style={{
              minHeight: '100vh',
              background: '#ffffff',
              fontFamily: design.typography.fontFamily,
              color: design.colors.text.primary,
              WebkitFontSmoothing: 'antialiased'
            }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .module-card { transition: all 0.2s ease; cursor: pointer; }
        .module-card:hover { background: #f5f5f7; }
        
        .module-card { 
          transition: all 0.2s ease; 
          cursor: pointer;
        }
        .module-card:hover { 
          border-color: rgba(234, 88, 12, 0.4) !important;
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.02), rgba(249, 115, 22, 0.02)) !important;
        }
        
        .lesson-row { 
          transition: all 0.2s ease; 
          cursor: pointer;
        }
        .lesson-row:hover { 
          background: rgba(234, 88, 12, 0.03);
        }
        
        .back-btn { transition: all 0.2s ease; }
        .back-btn:hover { opacity: 0.7; }
        
        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #ea580c !important;
        }
        
        ::selection { background: rgba(234, 88, 12, 0.15); }
      `}</style>

      {/* Accessibility: Skip to main content link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Cmd/Ctrl+K command palette (owns its own open state + global listener).
          Suppressed during a timed test sitting — a palette command would
          silently eject the student mid-module with no confirmation. */}
      {view !== 'takingTest' && <CommandPalette commands={paletteCommands} />}

      {/* Trial countdown / payment-issue chip. Hidden mid-test and on the
          wall itself; renders nothing while billing is dark or subscribed. */}
      {view !== 'takingTest' && view !== 'paywall' && user && (
        <React.Suspense fallback={null}>
          <TrialBanner
            entitlement={entitlement}
            onManageBilling={() => {
              openBillingPortal().catch((err) => {
                showToast({ type: 'error', message: err.message || 'Could not open billing.' });
              });
            }}
          />
        </React.Suspense>
      )}

      <AppShell
        currentView={view}
        onNavigate={(navId) => {
          if (navId === 'dashboard') { setView('dashboard'); setActiveModule(null); setActiveLesson(null); }
          else if (navId === 'learnTab') { setView('learnTab'); setSelectedChapterId(null); }
          else if (navId === 'modules') { setView('modules'); setActiveModule(null); setActiveLesson(null); }
          else if (navId === 'practiceTests') { setView('practiceTests'); setSelectedPracticeTest(null); }
          else if (navId === 'studyPlan') { setView('studyPlan'); }
          else if (navId === 'tutor') { setView('tutor'); }
          else if (navId === 'profile') { setView('profile'); }
          else if (navId === 'practiceBank') { setPracticeFocus(null); setView('practiceBank'); }
          else { setView(navId); }
        }}
        user={user}
        onLogout={logout}
        hideNav={view === 'takingTest' || view === 'pacingDrill' || view === 'reviewingPastResults' || view === 'practice' || view === 'learn'}
      >
      {/* Main Content — key={view} re-mounts the region on navigation so it fades
          in (fadeInUp keyframe in design/animations.js; reduced-motion handled
          globally). takingTest is excluded so the test-runner scroll-lock and the
          internal test->results flip (view stays 'takingTest') never animate. */}
      <div id="main-content" key={view} style={{
        maxWidth: view === 'takingTest' || view === 'pacingDrill' || view === 'reviewingPastResults' || view === 'practice' || view === 'dashboard' || view === 'learn' || view === 'learnTab' || view === 'learnChapter' || view === 'modules' || view === 'practiceBank' || view === 'paywall' || view === 'diagnosticResults' ? '100%' : view === 'studyPlan' ? '1220px' : view === 'practiceTests' ? '1040px' : '800px',
        margin: '0 auto',
        // Study Plan + Practice Tests paint their own warm canvas + framing, so
        // they want a tighter outer gutter than the default 32px content padding.
        padding: (view === 'dashboard' || view === 'reviewingPastResults' || view === 'practice' || view === 'takingTest' || view === 'pacingDrill' || view === 'learn' || view === 'learnTab' || view === 'learnChapter' || view === 'practiceBank' || view === 'paywall' || view === 'diagnosticResults') ? '0' : (view === 'studyPlan' || view === 'practiceTests') ? '20px 20px 80px' : '32px 32px 100px',
        ...((view === 'takingTest' || view === 'pacingDrill') ? { overflow: 'hidden', height: '100vh' } : { animation: 'fadeInUp 300ms cubic-bezier(0.25, 0.1, 0.25, 1)' })
      }}>
      {/* ONE Suspense boundary for the whole view-switch region: every lazy
          view below suspends into the same skeleton fallback. It sits INSIDE
          the #main-content wrapper so the takingTest scroll-lock (style on
          the div above) stays applied while a chunk loads. */}
      <React.Suspense fallback={<ViewChunkFallback />}>
        {/* Standalone AI Tutor View */}
        {view === 'tutor' && billingLocked && (
          <PaywallScreen
            entitlement={entitlement}
            onBack={() => setView('dashboard')}
            onLogout={logout}
          />
        )}
        {view === 'tutor' && !billingLocked && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <AiTutorChat
              isOpen={true}
              onClose={() => { setView('dashboard'); }}
              moduleId={activeModule}
              lessonId={activeLesson}
              currentQuestion={null}
              allQuestions={[]}
              currentQuestionIndex={0}
              userAnswer={null}
              skillProgress={skillProgress}
              practiceTestResults={practiceTestResults}
              completedLessons={completedLessons}
              user={user}
              studentFingerprint={studentFingerprint}
              interventionLog={interventionLog}
              predictionLog={predictionLog}
              standalone={true}
            />
          </div>
        )}

        {/* Profile View */}
        {view === 'profile' && (
          <Profile
            initialFocus={profileFocus}
            user={user}
            onLogout={logout}
            onUpdateTargetScore={updateTargetScore}
            onUpdateTestDate={updateTestDate}
            onUpdateCurrentScore={updateCurrentScore}
            onUpdateTargetSchools={updateTargetSchools}
            onUpdateProfilePhoto={updateProfilePhoto}
            onUpdateFirstName={updateFirstName}
            completedLessons={completedLessons}
            practiceTestResults={practiceTestResults}
            skillProgress={skillProgress}
            entitlement={entitlement}
            onSubscribe={() => setView('paywall')}
            onManageBilling={() => {
              openBillingPortal().catch((err) => {
                showToast({ type: 'error', message: err.message || 'Could not open billing.' });
              });
            }}
          />
        )}

        {/* SEVA Premium subscribe wall — every locked launcher routes here */}
        {view === 'paywall' && (
          <PaywallScreen
            entitlement={entitlement}
            onBack={() => setView('dashboard')}
            onLogout={logout}
          />
        )}

        {/* Practice Bank — browse question types and drill at will */}
        {view === 'practiceBank' && (
          <PracticeBank
            onStartPractice={startAssignedPractice}
            onStartAdaptive={startAdaptivePractice}
            bankPractice={bankPractice}
            weaknesses={studyPlan?.weaknesses || null}
            activeDrill={activeDrill}
            onResumeDrill={resumeActiveDrill}
            onDiscardDrill={clearActiveDrill}
            focusRequest={practiceFocus}
            progressHydrated={progressHydrated}
          />
        )}

        {/* Learn — Chapter Table of Contents */}
        {view === 'learnTab' && (
          <LearnTab
            chaptersRead={chaptersRead}
            onOpenChapter={(id) => { setSelectedChapterId(id); setView('learnChapter'); }}
          />
        )}

        {/* Learn — Chapter Reader */}
        {view === 'learnChapter' && selectedChapterId && (
          // Scoped boundary: a malformed content block used to bubble to the
          // ROOT boundary and take down the whole shell, not just the article.
          <ErrorBoundary message="This chapter hit a rendering problem. Go back to All Chapters and try again.">
          <ChapterReader
            chapterId={selectedChapterId}
            isChapterComplete={isChapterComplete}
            onToggleComplete={(id, meta) => {
              if (isChapterComplete(id)) unmarkChapterComplete(id);
              else markChapterComplete(id, meta || {});
            }}
            onBack={() => {
              setView('learnTab');
              setSelectedChapterId(null);
              // A long chapter leaves deep scroll behind; without this the
              // 42-card TOC opens mid-list.
              window.scrollTo(0, 0);
            }}
            onOpenChapter={(id) => setSelectedChapterId(id)}
            onPracticeSkills={focusPracticeOnChapter}
            onWatchVideos={(moduleId) => {
              const moduleLessons = (lessons && lessons[moduleId]) || [];
              setActiveModule(moduleId);
              setActiveLesson(moduleLessons[0]?.id || null);
              setView('learn');
            }}
          />
          </ErrorBoundary>
        )}

        {/* Videos — Module Catalog View */}
        {view === 'modules' && (
          <LessonBrowser
            completedLessons={completedLessons}
            skillProgress={skillProgress}
            lessons={lessons}
            onSelectModule={(moduleId) => {
              const moduleLessons = (lessons && lessons[moduleId]) || [];
              setActiveModule(moduleId);
              setActiveLesson(moduleLessons[0]?.id || null);
              setView('learn');
            }}
          />
        )}

        {/* Learn — Lesson Workspace View */}
        {view === 'learn' && activeModule && (() => {
          // Lesson catalog is a lazy chunk (loadLessonsChunk). On a load
          // failure, offer a retry instead of an infinite skeleton — the
          // loader evicted its poisoned cache, so retry re-imports cleanly.
          if (!lessons && lessonsLoadError) {
            return (
              <div style={{
                minHeight: '60vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center',
              }}>
                <p style={{ fontSize: '1rem', color: '#4B5563', maxWidth: '28rem' }}>
                  We could not load the lessons. Check your connection and try again.
                </p>
                <button
                  type="button"
                  onClick={() => { setLessonsLoadError(false); setLessonsRetryToken(t => t + 1); }}
                  style={{
                    padding: '0.65rem 1.4rem', borderRadius: '0.6rem', border: 'none',
                    background: '#EA580C', color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Retry
                </button>
              </div>
            );
          }
          // Show the shared fallback while the chunk is still in flight rather
          // than a lesson-less workspace.
          if (!lessons) return <ViewChunkFallback />;
          const moduleLessons = lessons[activeModule] || [];
          const currentLesson = moduleLessons.find(l => l.id === activeLesson) || moduleLessons[0] || null;
          // Find module title from LessonBrowser's MODULES if available; fall back to id.
          const moduleTitleMap = {
            'linear-equations': 'Linear Equations',
            'functions': 'Functions',
            'systems': 'System of Equations',
            'transformations': 'Transformations',
            'exponents': 'Exponents & Exponential Functions',
            'percents': 'Percents',
            'equivalent-expressions': 'Equivalent Expressions',
            'quadratics': 'Quadratic Functions & Equations',
            'radians-degrees': 'Radians & Degrees',
            'triangles': 'Triangles',
            'circles': 'Circles',
            'volume': 'Volume',
            'statistics': 'Statistics',
            'dimensional-analysis': 'Dimensional Analysis',
          };
          const moduleTitle = moduleTitleMap[activeModule] || activeModule;
          const moduleProgress = getModuleProgress
            ? getModuleProgress(activeModule, moduleLessons.length)
            : 0;
          return (
            <LearnWorkspace
              moduleId={activeModule}
              moduleLessons={moduleLessons}
              moduleTitle={moduleTitle}
              activeLessonId={currentLesson?.id || null}
              currentLesson={currentLesson}
              onSelectLesson={(lessonId) => setActiveLesson(lessonId)}
              onBack={() => { setView('modules'); setActiveLesson(null); }}
              onMarkComplete={(modId, lessonId) => {
                if (markLessonComplete) markLessonComplete(modId, lessonId, currentLesson);
              }}
              isLessonCompleted={isLessonCompleted || (() => false)}
              moduleProgress={moduleProgress}
              renderLessonContent={() => null}
              videoTranscript=""
              videoTimestamp={0}
            />
          );
        })()}

        {/* Student Dashboard View */}
        {view === 'dashboard' && (
          <>
          <PushOptInCard userId={user?.uid} />
          <StudentDashboard
            user={user}
            completedLessons={completedLessons}
            practiceProgress={practiceProgress}
            drillDays={drillDays}
            practiceTestResults={practiceTestResults}
            reviewQueue={reviewQueue}
            flaggedQuestions={flaggedQuestions}
            onUnflagQuestion={unflagQuestion}
            adaptiveOverlay={adaptiveOverlay}
            reviewStreak={reviewStreak}
            dueReviewCount={getDueCount()}
            skillDiagnosticSummary={getSkillDiagnosticSummary()}
            skillBreakdown={getSkillBreakdown()}
            studyPlan={studyPlan}
            studyPlanArtifact={studyPlanArtifact}
            studyPlanMeta={studyPlanMeta}
            dataLoading={progressLoading}
            predictionLog={predictionLog}
            skillProgress={skillProgress}
            answeredQuestionIds={answeredQuestionIds}
            showCheckInCard={
              ffOnRamp && !user?.onboardingCompletedAt && !studyPlan &&
              Object.keys(practiceTestResults || {}).length === 0
            }
            onStartCheckIn={handleResumeOnRamp}
            miniDiagnostic={miniDiagnostic}
            onUpdateTestDate={updateTestDate}
            onUpdateTargetScore={updateTargetScore}
            onUpdateCurrentScore={updateCurrentScore}
            onUpdateTargetSchools={updateTargetSchools}
            onStartPractice={(moduleId, sectionName, opts) => {
              if (opts?.adaptive) { startAdaptivePractice({ enforcedDomain: opts.enforcedDomain, label: opts.label }); return; }
              if (opts?.questionIds?.length) {
                startAssignedPractice(opts.questionIds, {
                  label: opts.label,
                  weekNumber: opts.weekNumber,
                  weakness: opts.weakness,
                });
                return;
              }
              startPrescriptivePractice(moduleId, sectionName, { weakness: opts?.weakness || null });
            }}
            onStartReview={startDailyReview}
            onStartPracticeTest={() => setView('practiceTests')}
            onStartDiagnostic={handleResumeOnRamp}
            onStartPlanCheckIn={handleStartPlanCheckIn}
            innerOnboardingPending={innerOnboardingPending}
            onResumeInnerOnboarding={handleResumeInnerOnboarding}
            onStartPacing={startPacingDrill}
            onReviewTestWrong={handleReviewTestWrong}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
            onOpenProfile={() => { setProfileFocus(null); setView('profile'); }}
            onEditGoals={openProfileGoals}
            onRetrySimilar={handleTrySimilarFromReview}
            onBrowseLessons={() => {
              // "Or warm up first" link on the day-0 banner → the Videos/
              // lessons view (same destination as the sidebar Videos item).
              setActiveModule(null);
              setActiveLesson(null);
              setView('modules');
            }}
            onOpenPractice={() => setView('practiceBank')}
            onOpenTutor={() => setView('tutor')}
            onViewFullDiagnosis={async () => {
              // Home → the AI diagnosis of the most recent practice test.
              const { testId, lastAttempt } = pickMostRecentTest(practiceTestResults);
              if (!testId || !lastAttempt) {
                showToast({ type: 'info', message: 'Take a practice test to see your diagnosis.' });
                return;
              }
              let getAllPracticeTests;
              try {
                ({ getAllPracticeTests } = await loadPracticeTests());
              } catch (err) {
                showToast({ type: 'error', message: CORPUS_LOAD_ERROR });
                return;
              }
              const test = getAllPracticeTests().find((t) => t.id === testId);
              if (!test) {
                showToast({ type: 'error', message: 'Could not load the test for your most recent attempt.' });
                return;
              }
              openPastAttempt(test, 'diagnosis', 'dashboard');
            }}
            onViewDiagnosis={miniDiagnostic ? () => openDiagnosis('dashboard') : undefined}
            onRecordScoreReport={recordScoreReport}
            onUpdateTestDates={updateTestDates}
            onCompleteActivity={markStudyActivityComplete}
            onUncompleteActivity={unmarkStudyActivityComplete}
            onEditPlan={saveEditedStudyPlan}
          />
          </>
        )}

        {/* Practice Tests List View */}
        {view === 'practiceTests' && (
          <PracticeTestList
            onSelectTest={(test) => {
              if (!ensurePracticeAccess()) return;
              // Clear any existing progress when starting fresh
              if (hasTestProgress(test.id)) {
                clearTestProgress(test.id);
              }
              setSelectedPracticeTest(test);
              setIsTestTimed(true);
              setView('takingTest');
            }}
            onSelectTestWithMode={(test, timed, section) => {
              if (!ensurePracticeAccess()) return;
              // Clear any existing progress when starting fresh
              if (hasTestProgress(test.id)) {
                clearTestProgress(test.id);
              }
              setSelectedPracticeTest(test);
              setIsTestTimed(timed);
              setInitialTestSection(section || null);
              setView('takingTest');
            }}
            onResumeTest={(test, timed) => {
              if (!ensurePracticeAccess()) return;
              // Resume with existing progress. Clear initialTestSection so a
              // stale value from a previous fresh-launch can't override the
              // savedProgress.currentModule on resume.
              setSelectedPracticeTest(test);
              setIsTestTimed(timed);
              setInitialTestSection(null);
              setView('takingTest');
            }}
            onBack={() => setView('dashboard')}
            user={user}
            billingLocked={billingLocked}
            onSubscribe={() => setView('paywall')}
            practiceTestResults={practiceTestResults}
            getTestBestScore={getTestBestScore}
            getTestAttempts={getTestAttempts}
            inProgressTests={inProgressTests}
            miniDiagnostic={miniDiagnostic}
            diagnosticReviewStatus={diagnosticSitting.status}
            onReviewDiagnosticQuestions={() => openDiagnosticReview(0, 'practiceTests')}
            onViewDiagnosis={(test) => openPastAttempt(test, 'diagnosis')}
            onViewResults={(test) => openPastAttempt(test, 'review')}
            onResetTest={(test) => resetPracticeTest(test.id)}
            onDeleteAttempt={(testId, attemptId) => removeTestAttempt(testId, attemptId)}
          />
        )}

        {/* A past practice test's AI diagnosis — the same screen the runner
            shows right after a test. Reached from the Tests list card and
            from Home's "View full diagnosis"; Back returns to `returnTo`. */}
        {view === 'diagnosticReport' && viewingResultsData && (
          <ErrorBoundary message="Unable to load your diagnosis. Please go back and try again.">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <TestResults
                screen="diagnosis"
                test={viewingResultsData.test}
                answers={viewingResultsData.answers}
                storedResult={viewingResultsData.storedResult}
                diagnosticData={viewingResultsData.diagnosticData}
                diagnosticReport={viewingResultsData.diagnosticReport}
                practiceTestResults={practiceTestResults}
                aiDiagnosticState={viewingResultsData.aiDiagnosticState}
                user={user}
                backLabel={viewingResultsData.returnTo === 'dashboard' ? 'Back to Home' : 'Back to Tests'}
                onBack={() => {
                  const to = viewingResultsData.returnTo || 'practiceTests';
                  setViewingResultsData(null);
                  setView(to);
                }}
                onReview={() => {
                  setViewingResultsData((prev) => ({ ...prev, reviewModule: 0, returnTo: 'diagnosticReport' }));
                  setView('reviewingPastResults');
                }}
                onDrillWeakness={handleDrillFromResults}
                onGoToStudyPlan={() => { setViewingResultsData(null); setView('studyPlan'); }}
              />
            </div>
          </ErrorBoundary>
        )}

        {/* Re-opened diagnostic diagnosis — the "Your starting point" screen
            the diagnostic ended on, rebuilt from progress.miniDiagnostic (its
            lean `diagnosis` copy; legacy records fall back to the plan mirror).
            Mounted from the dashboard's "View your diagnosis" link on the
            Estimated Starting Score card. */}
        {view === 'diagnosticResults' && miniDiagnostic && (
          <ErrorBoundary message="Unable to load your diagnosis. Please go back and try again.">
            <div style={{ minHeight: '100vh', background: 'var(--color-slate-100)', display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
              <MiniDiagnosticResults
                record={miniDiagnostic}
                plan={studyPlan}
                user={user}
                onViewPlan={() => setView('studyPlan')}
                onBack={() => setView(diagnosisReturnTo)}
                backLabel={diagnosisReturnTo === 'practiceTests' ? 'Back to Practice Tests' : 'Back to Home'}
                onEditGoals={openProfileGoals}
                onUpdateTestDate={updateTestDate}
                onUpdateTestDates={updateTestDates}
                onStartPracticeTest={() => setView('practiceTests')}
                sitting={fullDiagnosticSitting}
                sittingStatus={diagnosticSitting.status === 'ready' && !fullDiagnosticSitting ? 'missing' : diagnosticSitting.status}
                onReviewQuestions={fullDiagnosticSitting
                  // Same review runner as past practice tests, on the rebuilt
                  // sitting; back returns here, not to the results tab.
                  ? (moduleIndex) => openDiagnosticReview(moduleIndex, 'diagnosticResults')
                  : null}
              />
            </div>
          </ErrorBoundary>
        )}

        {/* Reviewing answers from past results */}
        {view === 'reviewingPastResults' && viewingResultsData && (
          <ErrorBoundary message="Unable to load answer review. Please go back and try again.">
          <PracticeTest
            test={viewingResultsData.test}
            savedProgress={{ answers: viewingResultsData.answers }}
            initialReviewModule={viewingResultsData.reviewModule ?? 0}
            isTimed={false}
            skillProgress={skillProgress}
            user={user}
            practiceTestResults={practiceTestResults}
            completedLessons={completedLessons}
            practiceProgress={practiceProgress}
            answeredQuestionIds={answeredQuestionIds}
            reviewSnapshotMissing={viewingResultsData.snapshotMissing}
            reviewAnswersMissing={!!viewingResultsData.answersMissing}
            reviewBackLabel={({ practiceTests: 'Tests', diagnosticResults: 'Diagnosis', diagnosticReport: 'Diagnosis', dashboard: 'Home', studyPlan: 'Study Plan' })[viewingResultsData.returnTo] || 'Results'}
            reviewAttemptId={viewingResultsData.attemptId}
            tutorLocked={billingLocked}
            onSubscribe={() => setView('paywall')}
            onBack={() => {
              setView(viewingResultsData.returnTo || 'practiceTests');
            }}
          />
          </ErrorBoundary>
        )}

        {/* Taking a Practice Test View */}
        {view === 'takingTest' && selectedPracticeTest && (
          <ErrorBoundary message="Something went wrong during the test. Your progress has been saved.">
          <PracticeTest
            test={selectedPracticeTest}
            isTimed={isTestTimed}
            initialSection={initialTestSection}
            savedProgress={getTestProgress(selectedPracticeTest.id)}
            skillProgress={skillProgress}
            user={user}
            practiceTestResults={practiceTestResults}
            completedLessons={completedLessons}
            practiceProgress={practiceProgress}
            answeredQuestionIds={answeredQuestionIds}
            onSaveStudyPlan={handleSaveStudyPlan}
            onGoToStudyPlan={() => { setSelectedPracticeTest(null); setView('studyPlan'); }}
            onStartPractice={(moduleId, sectionName, opts) => {
              if (opts?.adaptive) { startAdaptivePractice({ enforcedDomain: opts.enforcedDomain, label: opts.label }); setSelectedPracticeTest(null); return; }
              if (opts?.questionIds?.length) {
                startAssignedPractice(opts.questionIds, {
                  label: opts.label,
                  weekNumber: opts.weekNumber,
                  weakness: opts.weakness,
                });
                setSelectedPracticeTest(null);
                return;
              }
              // startPrescriptivePractice (async) sets module/section/view
              // itself once questions load — no bare setView('practice')
              // here, or the view would flash empty before state populates.
              startPrescriptivePractice(moduleId, sectionName, { weakness: opts?.weakness || null });
              setSelectedPracticeTest(null);
            }}
            onBack={() => {
              setSelectedPracticeTest(null);
              setView('practiceTests');
            }}
            onComplete={() => {
              setSelectedPracticeTest(null);
              setView('practiceTests');
            }}
            onSaveProgress={(progressData) => {
              if (user && selectedPracticeTest) {
                saveTestProgress(selectedPracticeTest.id, progressData);
              }
            }}
            onClearProgress={() => {
              if (user && selectedPracticeTest) {
                clearTestProgress(selectedPracticeTest.id);
              }
            }}
            onSaveResult={(results) => {
              // Scoped logger only — never console.log the user object or raw
              // results here: this fires in production on every completed test
              // and would expose PII in the browser console.
              logInfo('app', 'onSaveResult', { testId: selectedPracticeTest?.id, hasUser: !!user });
              if (user) {
                recordPracticeTestAttempt(selectedPracticeTest.id, selectedPracticeTest.title, results);
                // Fan the student's mark-for-review picks into the flag store so
                // they surface in the Study Plan's Flagged group. De-duped by key.
                if (Array.isArray(results.markedForReview) && results.markedForReview.length) {
                  const entryMap = buildTestFlagEntries(results.markedForReview, {
                    testId: selectedPracticeTest.id,
                    testLabel: selectedPracticeTest.title,
                  });
                  flagQuestionsBatch(entryMap);
                }
              } else {
                logWarn('app', 'onSaveResult: no user — cannot save results');
              }
            }}
            resultSaveStatus={lastSaveStatus}
            onRetrySave={retryLastSave}
            onSessionComplete={(raw) => {
              // Full-test seam: analytics (test_completed) + the intelligence
              // pipeline (validate prior prediction -> update fingerprint ->
              // generate next prediction -> save). Fire-and-forget; the
              // orchestrator is fully guarded internally.
              const session = buildFullTestSession({ ...raw, userId: user?.uid ?? null });
              dispatchSessionComplete(session, {
                userId: user?.uid ?? null,
                skillProgress,
                practiceTestResults,
                interventionLog,
              }).catch(err => console.error('[App] full-test sessionComplete dispatch error:', err));
            }}
          />
          </ErrorBoundary>
        )}

        {/* Timed Pacing Drill */}
        {view === 'pacingDrill' && pacingSession && (
          <ErrorBoundary message="The pacing drill hit a snag. Your progress is safe — head back to the dashboard.">
            <PacingDrill
              config={pacingSession.config}
              questions={pacingSession.questions}
              user={user}
              onComplete={(summary) => {
                if (user?.uid && summary) {
                  trackPacingDrillDone(user.uid, pacingSession.config.id, summary.accuracy, summary.avgTimePerQuestion);
                }
              }}
              onExit={() => { setPacingSession(null); setView(pacingDrillEntryView); }}
            />
          </ErrorBoundary>
        )}

        {view === 'studyPlan' && (
          <StudyPlanDashboard
            variant="immersive"
            onStartDiagnostic={handleStartPlanCheckIn}
            miniDiagnostic={miniDiagnostic}
            studyPlan={studyPlan}
            practiceTestResults={practiceTestResults}
            practiceProgress={practiceProgress}
            drillDays={drillDays}
            skillProgress={skillProgress}
            reviewQueue={reviewQueue}
            flaggedQuestions={flaggedQuestions}
            onUnflagQuestion={unflagQuestion}
            adaptiveOverlay={adaptiveOverlay}
            answeredQuestionIds={answeredQuestionIds}
            predictionLog={predictionLog}
            user={user}
            onStartPractice={(moduleId, sectionName, opts) => {
              if (opts?.adaptive) { startAdaptivePractice({ enforcedDomain: opts.enforcedDomain, label: opts.label }); return; }
              if (opts?.questionIds?.length) {
                startAssignedPractice(opts.questionIds, {
                  label: opts.label,
                  weekNumber: opts.weekNumber,
                  weakness: opts.weakness,
                });
                return;
              }
              // startPrescriptivePractice (async) sets module/section/view
              // itself once questions load.
              startPrescriptivePractice(moduleId, sectionName, { weakness: opts?.weakness || null });
            }}
            onStartPracticeTest={() => setView('practiceTests')}
            onCompleteActivity={markStudyActivityComplete}
            onUncompleteActivity={unmarkStudyActivityComplete}
            onEditPlan={saveEditedStudyPlan}
            onStartReview={startDailyReview}
            onStartPacing={startPacingDrill}
            onReviewTestWrong={handleReviewTestWrong}
          />
        )}

        {/* Practice View */}
        {view === 'practice' && activeSection && (() => {
          const isAssigned = practiceState.practiceMode === 'assigned';
          const isAdaptive = practiceState.practiceMode === 'adaptive';
          // Every path into view==='practice' populates shuffledQuestions
          // via an async start* handler (Stage 2b: the render path can no
          // longer reach the topic-question corpus synchronously). The empty
          // fallback + the length guard below render nothing for the brief
          // window between a handler's setView and its state population.
          const questions = practiceState.shuffledQuestions.length > 0
            ? practiceState.shuffledQuestions
            : [];
          if (questions.length === 0) return null;
          const currentQuestion = questions[practiceState.currentQuestionIndex];

          const studyPlanBackHandler = () => {
            setActiveSection(null);
            setActiveModule(null);
            setShowCalculator(false);
            setView('studyPlan');
          };
          // Past-Test-Review retry drill: route back to the per-test review
          // detail (Phase 5 of PAST_TEST_REVIEW_PLAN.md). The view route is
          // mounted in Phase 6.
          const pastTestReviewBackHandler = () => {
            setActiveSection(null);
            setActiveModule(null);
            setShowCalculator(false);
            setView('pastTestReviewDetail');
          };
          const practiceBankBackHandler = () => {
            setActiveSection(null);
            setActiveModule(null);
            setShowCalculator(false);
            setView('practiceBank');
          };
          // The legacy moduleBackHandler returned to view='learn' (the
          // deleted LearnWorkspace). Practice is now reachable via the
          // study plan, the Practice tab (browse by question type), or,
          // for review-mode drills, the past-test-review detail page.
          const source = practiceState.assignmentMeta?.source;
          // Practice Bank adaptive rounds (topic/domain) render in the SEVA
          // Round shell (AssignedPracticeShell) in "adaptive mode" — the design
          // the user approved: a target-based, growing progress rail with
          // locked placeholders for not-yet-served questions. The study-plan
          // adaptive flow still uses the dedicated AdaptivePracticeShell.
          const isBankAdaptive = isAdaptive
            && typeof source === 'string' && source.startsWith('practice-bank');
          // Every Practice-Bank launcher emits a 'practice-bank-*' source
          // (quick / full / mix / domain / skill / pattern / resumed), so match
          // on the prefix — otherwise finishing or backing out of a bank drill
          // lands the student on the Study Plan instead of the Practice Bank.
          const backHandler = practiceState.reviewMode
            ? pastTestReviewBackHandler
            : (typeof source === 'string' && source.startsWith('practice-bank'))
              ? practiceBankBackHandler
              : studyPlanBackHandler;
          // Label must match where the handler actually lands — the shell
          // hardcoding "Back to Study Plan" misled bank and review sessions.
          const backLabel = practiceState.reviewMode
            ? 'Back to Review'
            : (typeof source === 'string' && source.startsWith('practice-bank'))
              ? 'Back to Practice'
              : 'Back to Study Plan';
          // Only Practice-Bank drills persist a resumable session (activeDrill)
          // — the interstitial's exit button must not promise "resume later"
          // for study-plan/review sessions that restart from question 1.
          const sessionResumable = typeof source === 'string' && source.startsWith('practice-bank');
          const headerTitle = isBankAdaptive
            ? (practiceState.adaptiveDomainLabel || 'Practice')
            : isAdaptive
              ? (practiceState.adaptiveDomainLabel ? `Adaptive Practice — ${practiceState.adaptiveDomainLabel}` : 'Adaptive Practice')
              : isAssigned
                ? (practiceState.assignmentMeta?.label || 'Assigned Practice')
                : activeSection;

          // Assigned practice + Practice Bank adaptive rounds both render the
          // SEVA Round shell; adaptiveMode toggles the target-based rail.
          if (isAssigned || isBankAdaptive) {
            // Surface pool-exhaustion as a per-skill flag so the shell can
            // disable the Try-Similar button after the bank returns [].
            const cqSkills = Array.isArray(currentQuestion?.skills)
              ? currentQuestion.skills
              : (currentQuestion?.skill ? [currentQuestion.skill] : []);
            const isTrySimilarExhausted = cqSkills.some(s => trySimilarExhausted.has(s));
            return (
              <AssignedPracticeShell
                practiceState={practiceState}
                questions={questions}
                currentQuestion={currentQuestion}
                headerTitle={headerTitle}
                adaptiveMode={isBankAdaptive}
                adaptiveTarget={practiceState.adaptiveSessionState?.targetQuestions || 15}
                onBack={backHandler}
                backLabel={backLabel}
                sessionResumable={sessionResumable}
                onSelectAnswer={handleSelectAnswer}
                onCheckAnswer={handleCheckAnswer}
                onNextQuestion={handleNextQuestion}
                onAdvanceToNextRound={handleAdvanceToNextRound}
                // Try-Similar is only sound in fixed assigned drills. In a
                // Practice-Bank adaptive round the miss is applied on Continue
                // (handleNextQuestion -> applyAdaptiveResult); splicing a similar
                // question in bypasses that, desyncing the ladder and the
                // served/target counts. Omit the prop so the shell hides the
                // button (it guards on typeof onTrySimilar === 'function').
                onTrySimilar={isBankAdaptive ? undefined : handleTrySimilar}
                isTrySimilarExhausted={isTrySimilarExhausted}
                onShowHint={handleShowHint}
                onNavigateToQuestion={handleNavigateToQuestion}
                onToggleCalculator={() => setShowCalculator(!showCalculator)}
                showCalculator={showCalculator}
                flaggedQuestions={flaggedQuestions}
                onToggleFlag={toggleFlagQuestion}
                onRedrillMisses={handleRedrillMisses}
                onRetry={() => {
                  // Bank adaptive rounds relaunch a fresh adaptive session over
                  // the same topic/domain pool (not a fixed replay).
                  if (isBankAdaptive) {
                    startAdaptivePractice({
                      poolIds: practiceState.adaptiveQueueSeed?.poolIds,
                      enforcedDomain: practiceState.adaptiveQueueSeed?.enforcedDomain,
                      label: practiceState.adaptiveDomainLabel,
                      ephemeral: true,
                      source,
                    });
                  } else {
                    startAssignedPractice(
                      practiceState.shuffledQuestions.map(q => q.id),
                      practiceState.assignmentMeta,
                    );
                  }
                }}
                getDifficultyBadge={getDifficultyBadge}
                user={user}
                skillProgress={skillProgress}
                practiceTestResults={practiceTestResults}
                studentFingerprint={studentFingerprint}
                interventionLog={interventionLog}
                predictionLog={predictionLog}
              />
            );
          }

          // Study-plan adaptive practice uses the dedicated adaptive shell.
          // (Practice Bank adaptive rounds were handled above via the SEVA
          // Round shell in adaptiveMode.)
          if (isAdaptive && !isBankAdaptive) {
            return (
              <AdaptivePracticeShell
                practiceState={practiceState}
                questions={questions}
                currentQuestion={currentQuestion}
                headerTitle={headerTitle}
                onBack={studyPlanBackHandler}
                onSelectAnswer={handleSelectAnswer}
                onCheckAnswer={handleCheckAnswer}
                onNextQuestion={handleNextQuestion}
                onShowHint={handleShowHint}
                onNavigateToQuestion={handleNavigateToQuestion}
                onToggleCalculator={() => setShowCalculator(!showCalculator)}
                showCalculator={showCalculator}
                flaggedQuestions={flaggedQuestions}
                onToggleFlag={toggleFlagQuestion}
                onRelaunch={() => startAdaptivePractice({
                  enforcedDomain: practiceState.adaptiveQueueSeed?.enforcedDomain,
                  label: practiceState.adaptiveDomainLabel,
                })}
                getDifficultyBadge={getDifficultyBadge}
                user={user}
                skillProgress={skillProgress}
              />
            );
          }

          // All live paths are assigned/adaptive (828dc0a unified routing);
          // the legacy standard/prescriptive inline UI was removed.
          return null;
        })()}

        {/* Desmos calculator for the drill flows (assigned + adaptive practice).
            The shells' "Calculator" button toggles App-level showCalculator;
            this renders the actual calculator. (PracticeTest mounts its own
            instance for full tests.) Without this, the drill calculator button
            lit up but nothing appeared — the bug fixed 2026-06-18.

            Gated so the floating calculator only shows where it belongs: not on
            R&W items (no calculator on the digital SAT R&W), and not over the
            round-complete interstitial or the completion screen — those replace
            the question card and have no Calculator toggle, so a stranded
            calculator there would be unclosable from the visible UI. */}
        {view === 'practice' && (() => {
          const pq = practiceState.shuffledQuestions?.[practiceState.currentQuestionIndex];
          const calcVisible = showCalculator
            && pq?.section !== 'rw'
            && !pq?.passage // belt-and-suspenders: only R&W items carry a passage
            && !practiceState.showRoundComplete
            && !practiceState.isComplete;
          return <DesmosCalculator isOpen={calcVisible} onClose={() => setShowCalculator(false)} />;
        })()}

      </React.Suspense>
      </div>

      </AppShell>
    </div>
          )) : (
            <Navigate to="/" replace />
          )
        } />
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
};

export default PerformSAT;
