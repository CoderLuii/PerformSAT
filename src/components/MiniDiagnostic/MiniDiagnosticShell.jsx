/**
 * MiniDiagnosticShell — the ~15-minute onboarding check-in.
 *
 * 24 questions: 12 Reading & Writing (7:00) then 12 Math (9:00), official
 * section order. Each section serves 8 stage-1 items (2 per domain, medium-
 * weighted) and then 4 stage-2 items routed at the weakest two domains by
 * stage-1 accuracy (easier pool when a domain is under 50%, harder otherwise).
 *
 * On finish it runs the REAL diagnosis pipeline (finishMiniDiagnostic →
 * runDiagnostic → groundTruth → generateStudyPlan → artifact persist) and
 * hands the results up via onFinished for App-level persistence
 * (progress.miniDiagnostic, onboardingCompletedAt stamp, plan mirror).
 *
 * This component is LAZY-LOADED (App.jsx React.lazy). It statically imports
 * the sampler + finish pipeline (which reach banks and the plan generator),
 * so it must never be imported statically from a main-chunk module —
 * same rule as PracticeTest.jsx.
 *
 * Resume: progress is saved under inProgressTests['mini-diagnostic'] on a
 * 2s debounce. Sampling is deterministic in (userId, attemptId, excludeIds),
 * so resume re-derives the exact same items from the stored attemptId +
 * excludeIds snapshot instead of persisting full question bodies.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MathText } from '../MathText';
import { parsePassageMarkup, buildSegments } from '../rw/HighlightablePassage';
import QuestionDiagram from '../QuestionDiagrams';
import QuestionRenderer from '../QuestionRenderer';
import AnswerChoiceList from '../shared/AnswerChoiceList';
import DesmosCalculator from '../DesmosCalculator';
import SATReferenceSheet from '../SATReferenceSheet';
import { Button } from '../ui/Button';
import { colors, typography, spacing } from '../../design/tokens';
// The active check-in adopts the SEVA Test chrome: PracticeTest.css owns the
// --pt-* cream palette + navy header + workspace card; the local sheet adapts
// it to the single-column, forward-only check-in. Both are imported here so
// the (lazy) diagnostic chunk pulls the stylesheet even if PracticeTest never
// loaded (its global classes dedupe across chunks in webpack).
import '../PracticeTest.css';
import './MiniDiagnosticShell.css';
import { injectAnimations } from '../../design/animations';
import { deriveDeadline, computeRemaining } from '../../services/timerClock';
import { generateAttemptId } from '../../services/practiceTestService';
import { buildMiniDiagnosticPlan, selectStage2 } from '../../services/miniDiagnostic/sampler';
import { finishMiniDiagnostic } from '../../services/miniDiagnostic/finishMiniDiagnostic';
import MiniDiagnosticResults from './MiniDiagnosticResults';
import { logError, logInfo } from '../../utils/log';

export const MINI_DIAG_PROGRESS_KEY = 'mini-diagnostic';
const RESUME_VERSION = 'v1';

const SECTION_CONFIG = {
  rw: { modIdx: 0, label: 'Reading & Writing', seconds: 7 * 60, count: 12 },
  math: { modIdx: 1, label: 'Math', seconds: 9 * 60, count: 12 },
};

const STAGE1_COUNT = 8;

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Read-only R&W passage renderer for the check-in. Parses the shared inline
 * markup (*italic*, __underline__, 4+ underscores = a Conventions blank)
 * through the SAME parser the drill/test HighlightablePassage uses and
 * renders the same elements (em/u/.rw-blank), minus the highlighting layer —
 * no annotation during onboarding. The drill path renders passages without
 * MathText (R&W passages carry no math), mirrored here.
 */
const PassageText = ({ text }) => {
  const { plain, formats } = parsePassageMarkup(text);
  const segments = buildSegments(plain, [], formats, false);
  return (
    <>
      {segments.map((s) => {
        if (s.blank) return <span key={s.key} className="rw-blank" aria-label="blank" />;
        let node = s.text;
        if (s.em) node = <em>{node}</em>;
        if (s.u) node = <u>{node}</u>;
        return <span key={s.key}>{node}</span>;
      })}
    </>
  );
};

/** Map answers keyed `${modIdx}-${qIdx}` onto item-id keys for the sampler. */
function answersByItemId(items, answers, modIdx) {
  const out = {};
  items.forEach((q, qIdx) => {
    const a = answers[`${modIdx}-${qIdx}`];
    if (a !== undefined && a !== null && a !== '') out[q.id] = a;
  });
  return out;
}

const MiniDiagnosticShell = ({
  user,
  savedProgress = null,
  onSaveProgress,
  onClearProgress,
  answeredQuestionIds = [],
  completedLessons = {},
  practiceProgress = {},
  onFinished,
  onViewPlan,
  onSkip,
}) => {
  // 'loading' | 'intro' | 'rw' | 'interstitial' | 'math' | 'finishing' | 'results' | 'error'
  const [phase, setPhase] = useState('loading');
  const [samplePlan, setSamplePlan] = useState(null); // { rw:{stage1,stage2Pools}, math:{...} }
  const [rwServed, setRwServed] = useState([]);   // stage1 (+stage2 once appended)
  const [mathServed, setMathServed] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [eliminatedChoices, setEliminatedChoices] = useState({});
  const [deadlineTs, setDeadlineTs] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [finishResult, setFinishResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  // Math-section tools (parity with PracticeTest). Modals reuse the exact
  // components the full test uses; gated to the Math phase below.
  const [showCalculator, setShowCalculator] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const attemptIdRef = useRef(savedProgress?.attemptId || generateAttemptId());
  // Snapshot exclusions ONCE (or restore the saved snapshot) so resume
  // re-samples identically even if answeredQuestionIds moved underneath us.
  const excludeIdsRef = useRef(
    savedProgress?.excludeIdsSnapshot || (answeredQuestionIds || []).slice(0, 400)
  );
  const telemetryRef = useRef(savedProgress?.telemetry || {});
  const enteredAtRef = useRef(null);
  const saveTimerRef = useRef(null);
  const finishingRef = useRef(false);
  const pendingFinishRef = useRef(null); // section payload while finishing
  // Latest-state mirror for callbacks that fire from stale closures (the
  // section-clock tick captures state from when the effect was armed; a
  // timer-expiry auto-finish must still see every answer). Same pattern as
  // PracticeTest's answersRef.
  const latestRef = useRef({});
  latestRef.current = { answers, eliminatedChoices, rwServed, mathServed, currentIndex, phase, deadlineTs };
  // useProgress recreates its save/clear functions on every App render; held
  // as refs so scheduleSave stays referentially stable (a changing identity
  // re-armed the save effect on each optimistic update → a 2s save loop).
  const onSaveProgressRef = useRef(onSaveProgress);
  onSaveProgressRef.current = onSaveProgress;

  useEffect(() => { injectAnimations(); }, []);

  // ── Sampling (deterministic; doubles as resume rehydration) ──────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const plan = await buildMiniDiagnosticPlan({
          userId: user?.uid || 'anon',
          attemptId: attemptIdRef.current,
          excludeIds: excludeIdsRef.current,
        });
        if (cancelled) return;
        setSamplePlan(plan);

        const saved = savedProgress && savedProgress.version === RESUME_VERSION ? savedProgress : null;
        if (saved && saved.phase && saved.phase !== 'intro' && saved.phase !== 'loading') {
          // Rebuild served arrays: stage1 always; stage2 re-derived (pure fn
          // of stage1 answers + pools, so identical to what the student saw).
          const savedAnswers = saved.answers || {};
          let rw = plan.rw.stage1;
          // Only re-append stage 2 when it was actually served (rwStage2 is
          // persisted as rwServed.length > STAGE1_COUNT at save time). An
          // R&W timeout at Q<=8 reaches math/interstitial WITHOUT stage 2 —
          // force-appending here scored 4 never-seen items as wrong.
          if (saved.rwStage2 && rw.length === STAGE1_COUNT) {
            rw = [...rw, ...selectStage2(plan.rw.stage1, answersByItemId(plan.rw.stage1, savedAnswers, 0), plan.rw.stage2Pools)];
          }
          let math = plan.math.stage1;
          if (saved.mathStage2 && math.length === STAGE1_COUNT) {
            math = [...math, ...selectStage2(plan.math.stage1, answersByItemId(plan.math.stage1, savedAnswers, 1), plan.math.stage2Pools)];
          }
          setRwServed(rw);
          setMathServed(math);
          setAnswers(savedAnswers);
          setEliminatedChoices(saved.eliminatedChoices || {});
          setCurrentIndex(saved.currentIndex || 0);
          if (saved.phase === 'rw' || saved.phase === 'math') {
            // Non-numeric/corrupt saved clock falls back to the full section
            // budget rather than instantly expiring the section.
            const savedRemaining = Number.isFinite(saved.remainingSeconds) && saved.remainingSeconds > 0
              ? saved.remainingSeconds
              : SECTION_CONFIG[saved.phase].seconds;
            setDeadlineTs(deriveDeadline(savedRemaining, Date.now()));
          }
          setPhase(saved.phase);
          logInfo('miniDiagnostic', 'resumed in-flight check-in');
        } else {
          setRwServed(plan.rw.stage1);
          setMathServed(plan.math.stage1);
          setPhase('intro');
        }
      } catch (err) {
        if (cancelled) return;
        logError('miniDiagnostic', 'sampling failed', err);
        setErrorMessage('We could not load your check-in questions. Check your connection and try again.');
        setPhase('error');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only sampling/resume; savedProgress and user?.uid are read once on purpose, and re-running on either would re-sample the check-in mid-session
  }, []);

  const inSection = phase === 'rw' || phase === 'math';
  const section = inSection ? SECTION_CONFIG[phase] : null;
  const served = phase === 'math' ? mathServed : rwServed;
  const currentQuestion = inSection ? served[currentIndex] : null;
  const qKey = inSection ? `${section.modIdx}-${currentIndex}` : null;

  // ── Telemetry ─────────────────────────────────────────────────────────────
  const getOrCreateTelemetry = useCallback((key) => {
    if (!telemetryRef.current[key]) {
      telemetryRef.current[key] = {
        timeSpent: 0,
        visits: 0,
        answerChanges: [],
        markedForReview: false,
        usedCalculator: false,
      };
    }
    return telemetryRef.current[key];
  }, []);

  // Visit tracking: stamp entry, accumulate timeSpent on exit.
  useEffect(() => {
    if (!inSection || !currentQuestion) return;
    const key = qKey;
    const telem = getOrCreateTelemetry(key);
    telem.visits += 1;
    enteredAtRef.current = Date.now();
    return () => {
      if (enteredAtRef.current) {
        telem.timeSpent += (Date.now() - enteredAtRef.current) / 1000;
        enteredAtRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- visits are counted per question KEY; adding currentQuestion (a fresh lookup each render) would re-run the enter/exit pair and inflate visits and timeSpent
  }, [qKey, inSection]);

  // ── Section clock ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!inSection || !deadlineTs) return;
    const tick = () => {
      const { remainingSeconds, isUp } = computeRemaining({ deadlineTs, nowTs: Date.now() });
      setRemaining(remainingSeconds);
      if (isUp) handleSectionEnd();
    };
    tick();
    const interval = setInterval(tick, 500);
    const onVisible = () => tick();
    window.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleSectionEnd is a per-render function; depending on it would tear down and restart the 500ms section clock on every render
  }, [inSection, deadlineTs, phase]);

  // ── Resume persistence (2s debounce, PracticeTest convention) ────────────
  const scheduleSave = useCallback((phaseOverride, indexOverride) => {
    if (!onSaveProgressRef.current) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      // Read through latestRef: the debounce can fire after the closure that
      // scheduled it went stale (e.g. scheduled from the clock tick).
      const live = latestRef.current;
      const activePhase = phaseOverride || live.phase;
      if (activePhase !== 'rw' && activePhase !== 'math' && activePhase !== 'interstitial') return;
      onSaveProgressRef.current(MINI_DIAG_PROGRESS_KEY, {
        version: RESUME_VERSION,
        attemptId: attemptIdRef.current,
        excludeIdsSnapshot: excludeIdsRef.current,
        phase: activePhase,
        currentIndex: indexOverride ?? live.currentIndex,
        answers: live.answers,
        eliminatedChoices: live.eliminatedChoices,
        telemetry: telemetryRef.current,
        rwStage2: live.rwServed.length > STAGE1_COUNT,
        mathStage2: live.mathServed.length > STAGE1_COUNT,
        remainingSeconds: live.deadlineTs
          ? computeRemaining({ deadlineTs: live.deadlineTs, nowTs: Date.now() }).remainingSeconds
          : null,
      });
    }, 2000);
  }, []);

  useEffect(() => {
    if (inSection) scheduleSave();
    return () => clearTimeout(saveTimerRef.current);
  }, [answers, eliminatedChoices, currentIndex, inSection, scheduleSave]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleStart = () => {
    setCurrentIndex(0);
    setDeadlineTs(deriveDeadline(SECTION_CONFIG.rw.seconds, Date.now()));
    setPhase('rw');
  };

  const handleStartMath = () => {
    setCurrentIndex(0);
    setDeadlineTs(deriveDeadline(SECTION_CONFIG.math.seconds, Date.now()));
    setPhase('math');
  };

  const handleSelectAnswer = (answerId) => {
    if (!inSection) return;
    const key = qKey;
    const telem = getOrCreateTelemetry(key);
    const oldAnswer = answers[key];
    telem.answerChanges.push({ from: oldAnswer || null, to: answerId, timestamp: Date.now() });
    setAnswers(prev => {
      if (prev[key] === answerId) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: answerId };
    });
  };

  const handleToggleEliminate = (choiceId) => {
    if (!inSection) return;
    const key = qKey;
    setEliminatedChoices(prev => {
      const current = prev[key] || [];
      if (current.includes(choiceId)) {
        const updated = current.filter(id => id !== choiceId);
        if (updated.length === 0) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        return { ...prev, [key]: updated };
      }
      return { ...prev, [key]: [...current, choiceId] };
    });
  };

  /** Append the adaptive stage-2 items the moment the student leaves Q8. */
  const maybeAppendStage2 = (sectionKey) => {
    if (!samplePlan) return null;
    if (sectionKey === 'rw' && rwServed.length === STAGE1_COUNT) {
      const stage2 = selectStage2(
        samplePlan.rw.stage1,
        answersByItemId(samplePlan.rw.stage1, answers, 0),
        samplePlan.rw.stage2Pools,
      );
      const next = [...rwServed, ...stage2];
      setRwServed(next);
      return next;
    }
    if (sectionKey === 'math' && mathServed.length === STAGE1_COUNT) {
      const stage2 = selectStage2(
        samplePlan.math.stage1,
        answersByItemId(samplePlan.math.stage1, answers, 1),
        samplePlan.math.stage2Pools,
      );
      const next = [...mathServed, ...stage2];
      setMathServed(next);
      return next;
    }
    return null;
  };

  const handleNext = () => {
    if (!inSection) return;
    let activeServed = served;
    if (currentIndex === STAGE1_COUNT - 1) {
      activeServed = maybeAppendStage2(phase) || served;
    }
    if (currentIndex < activeServed.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scheduleSave(phase, nextIndex);
    } else {
      handleSectionEnd();
    }
  };

  const handleSectionEnd = () => {
    // Read through latestRef — this can fire from the clock tick, whose
    // closure is as old as the last deadline change.
    const live = latestRef.current;
    const livePhase = live.phase;
    if (livePhase !== 'rw' && livePhase !== 'math') return;
    // Flush in-flight question time before leaving the section.
    if (enteredAtRef.current) {
      const liveKey = `${SECTION_CONFIG[livePhase].modIdx}-${live.currentIndex}`;
      const telem = getOrCreateTelemetry(liveKey);
      telem.timeSpent += (Date.now() - enteredAtRef.current) / 1000;
      enteredAtRef.current = null;
    }
    if (livePhase === 'rw') {
      setDeadlineTs(null);
      setRemaining(null);
      setPhase('interstitial');
      setCurrentIndex(0);
      scheduleSave('interstitial', 0);
    } else {
      setDeadlineTs(null);
      runFinish();
    }
  };

  const runFinish = async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    setPhase('finishing');
    clearTimeout(saveTimerRef.current);
    const live = latestRef.current;
    const payload = pendingFinishRef.current || {
      rwQuestions: live.rwServed,
      mathQuestions: live.mathServed,
      answers: live.answers,
      telemetry: telemetryRef.current,
      eliminatedChoices: live.eliminatedChoices,
    };
    pendingFinishRef.current = payload;
    try {
      const result = await finishMiniDiagnostic({
        user,
        rwQuestions: payload.rwQuestions,
        mathQuestions: payload.mathQuestions,
        answers: payload.answers,
        telemetry: payload.telemetry,
        eliminatedChoices: payload.eliminatedChoices,
        attemptId: attemptIdRef.current,
        answeredQuestionIds: excludeIdsRef.current,
        completedLessons,
        practiceProgress,
      });
      setFinishResult(result);
      if (onFinished) {
        try { await onFinished({ ...result, attemptId: attemptIdRef.current }); } catch (e) {
          logError('miniDiagnostic', 'onFinished handler error (continuing to results)', e);
        }
      }
      if (onClearProgress) {
        try { onClearProgress(MINI_DIAG_PROGRESS_KEY); } catch (e) { /* non-blocking */ }
      }
      setPhase('results');
    } catch (err) {
      logError('miniDiagnostic', 'finish pipeline failed', err);
      setErrorMessage('We could not save your results. Your answers are safe on this device — check your connection and try again.');
      setPhase('error');
    } finally {
      finishingRef.current = false;
    }
  };

  // ── Screens ───────────────────────────────────────────────────────────────
  const pageWrap = {
    minHeight: '100vh',
    background: `linear-gradient(180deg, ${colors.accent.orangeLight} 0%, ${colors.surface.white} 30%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing.xl,
    fontFamily: typography.fontFamily,
  };

  if (phase === 'loading') {
    return (
      <div style={pageWrap}>
        <div style={{ marginTop: '30vh', textAlign: 'center', color: colors.text.secondary, fontSize: typography.sizes.md }}>
          Preparing your check-in...
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div style={pageWrap}>
        <div style={{ marginTop: '24vh', textAlign: 'center', maxWidth: '440px' }}>
          <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.text.primary, marginBottom: spacing.sm }}>
            Something went wrong
          </h2>
          <p role="alert" style={{ fontSize: typography.sizes.base, color: colors.text.secondary, marginBottom: spacing.xl }}>
            {errorMessage}
          </p>
          <Button variant="primary" onClick={() => {
            if (pendingFinishRef.current) { runFinish(); } else { window.location.reload(); }
          }}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div style={pageWrap}>
        <div style={{ marginTop: '14vh', maxWidth: '480px', textAlign: 'center', animation: 'fadeInUp 400ms ease' }}>
          <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.text.primary, marginBottom: spacing.sm }}>
            Your 15-minute check-in
          </h1>
          <p style={{ fontSize: typography.sizes.md, color: colors.text.secondary, lineHeight: typography.lineHeights.relaxed, marginBottom: spacing.lg }}>
            24 questions across Reading & Writing and Math. It adapts to how you
            do, finds where you stand, and builds your starter study plan the
            moment you finish.
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: spacing.lg,
            fontSize: typography.sizes.sm, color: colors.text.secondary, marginBottom: spacing['2xl'],
          }}>
            <span>12 Reading & Writing, 7 min</span>
            <span aria-hidden="true">·</span>
            <span>12 Math, 9 min</span>
          </div>
          <Button variant="primary" onClick={handleStart} style={{ width: '100%', maxWidth: '320px', fontSize: typography.sizes.md }}>
            Start the check-in
          </Button>
          {onSkip && (
            <div>
              <button
                onClick={onSkip}
                style={{
                  marginTop: spacing.lg, background: 'none', border: 'none', padding: spacing.xs,
                  fontSize: typography.sizes.sm, color: colors.text.muted, textDecoration: 'underline',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'interstitial') {
    // Between-section handoff — reuse the runner's module-complete card so the
    // R&W → Math transition stays inside the SEVA Test visual world.
    return (
      <div className="test-module-complete">
        <div className="test-module-complete-card" style={{ animation: 'fadeInUp 400ms ease' }}>
          <div className="test-module-complete-eyebrow">Section 1 of 2 complete</div>
          <div className="test-module-complete-title">Reading &amp; Writing done</div>
          <p className="test-module-complete-note" style={{ margin: '0 0 4px' }}>
            Next up: 12 Math questions in 9 minutes. The clock starts when you do.
          </p>
          <button type="button" className="test-module-complete-cta" onClick={handleStartMath}>
            Start Math
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'finishing') {
    return (
      <div style={pageWrap}>
        <div style={{ marginTop: '28vh', textAlign: 'center' }}>
          <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.text.primary, marginBottom: spacing.sm }}>
            Building your starter plan
          </h2>
          <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary }}>
            Scoring your answers and mapping your focus areas...
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'results' && finishResult) {
    return (
      <div style={{ ...pageWrap, background: colors.surface.white }}>
        <MiniDiagnosticResults result={finishResult} user={user} onViewPlan={onViewPlan} />
      </div>
    );
  }

  // ── Active section ────────────────────────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div style={pageWrap}>
        <div style={{ marginTop: '30vh', color: colors.text.secondary }}>Loading question...</div>
      </div>
    );
  }

  const total = served.length > STAGE1_COUNT ? served.length : SECTION_CONFIG[phase].count;
  const lowTime = remaining !== null && remaining <= 60;
  const isMath = phase === 'math';
  const isLast = currentIndex + 1 >= total && served.length > STAGE1_COUNT;

  return (
    // Reuse the SEVA Test shell (navy header, cream canvas, workspace card).
    // data-section="math" pins the single-column workspace layout for both
    // sections — the check-in stacks passage + question in one linear column
    // rather than the runner's two-pane split. The Math tools below are gated
    // on `isMath`, not on this attribute.
    <div className="test-session-shell mini-diag-shell" data-section="math">
      {/* Math-section tools — same modals the full test uses */}
      <DesmosCalculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />
      <SATReferenceSheet isOpen={showReference} onClose={() => setShowReference(false)} />

      {/* Header — navy top bar with the tri-color SEVA wordmark */}
      <div className="test-session-header">
        <div className="header-left">
          <span className="test-wordmark">
            <span className="wm-s">S</span><span className="wm-e">E</span><span className="wm-v">V</span><span className="wm-a">A</span>
          </span>
          <span className="test-session-divider" aria-hidden="true" />
          <span className="test-name-tag">Check-In</span>
        </div>

        <div className="header-center">
          <div className="header-title">{section.label}</div>
          <div className="header-subtitle">Question {currentIndex + 1} of {total}</div>
        </div>

        <div className="header-right">
          {isMath && (
            <button
              type="button"
              className="btn-launch"
              onClick={() => {
                const telem = getOrCreateTelemetry(qKey);
                telem.usedCalculator = true;
                setShowCalculator(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="10" y2="10" />
                <line x1="14" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="10" y2="14" />
                <line x1="8" y1="18" x2="16" y2="18" />
                <line x1="14" y1="18" x2="16" y2="18" />
              </svg>
              Calculator
            </button>
          )}
          {isMath && (
            <button type="button" className="btn-launch" onClick={() => setShowReference(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Reference
            </button>
          )}
          <span
            role="timer"
            aria-label={`Time remaining ${remaining !== null ? formatClock(remaining) : ''}`}
            className={`test-timer-pill ${lowTime ? 'is-low' : ''}`}
          >
            {remaining !== null ? formatClock(remaining) : '--:--'}
          </span>
        </div>

        <div className="test-session-progress" aria-hidden="true">
          <div className="test-session-progress-fill" style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
        </div>
      </div>

      {/* Body — single centered workspace card */}
      <div className="test-session-body">
        <div className="test-workspace-main">
          <div className="test-workspace-left">
            <div className="question-panel">
              {/* R&W passage shapes (single passage, paired passages, student notes) */}
              {currentQuestion.passage && (
                <div className="mini-diag-passage">
                  <PassageText text={currentQuestion.passage} />
                </div>
              )}

              {Array.isArray(currentQuestion.passages) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
                  {currentQuestion.passages.map((p, i) => (
                    <div key={i}>
                      <div className="mini-diag-passage-label">{p.label || `Text ${i + 1}`}</div>
                      <div className="mini-diag-passage" style={{ marginBottom: 0 }}>
                        <PassageText text={p.text} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.studentNotes && (
                <div className="mini-diag-passage">
                  {currentQuestion.studentNotes.intro && (
                    <div style={{ marginBottom: '8px' }}>{currentQuestion.studentNotes.intro}</div>
                  )}
                  {Array.isArray(currentQuestion.studentNotes.bullets) && (
                    <ul style={{ paddingLeft: '1.25rem', margin: '8px 0' }}>
                      {currentQuestion.studentNotes.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>
                          <MathText>{b}</MathText>
                        </li>
                      ))}
                    </ul>
                  )}
                  {currentQuestion.studentNotes.goal && (
                    <div style={{ marginTop: '8px' }}>
                      <MathText>{currentQuestion.studentNotes.goal}</MathText>
                    </div>
                  )}
                </div>
              )}

              {currentQuestion.diagram && (
                <div className="mini-diag-media">
                  <QuestionDiagram type={currentQuestion.diagram.type} params={currentQuestion.diagram.params} />
                </div>
              )}

              {currentQuestion.questionTable && (
                <div className="mini-diag-media">
                  <table className="mini-diag-table">
                    <thead>
                      <tr>
                        {currentQuestion.questionTable.headers.map((header, i) => (
                          <th key={i}><MathText>{header}</MathText></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentQuestion.questionTable.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}><MathText>{cell}</MathText></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mini-diag-stem">
                {Array.isArray(currentQuestion.question) || (currentQuestion.question && typeof currentQuestion.question === 'object')
                  ? <QuestionRenderer content={currentQuestion.question} />
                  : <MathText>{currentQuestion.question}</MathText>
                }
              </div>

              <AnswerChoiceList
                choices={currentQuestion.choices || []}
                selectedId={answers[qKey] ?? null}
                eliminatedIds={eliminatedChoices[qKey] || []}
                showResult={false}
                correctId={null}
                onSelect={handleSelectAnswer}
                onToggleEliminate={handleToggleEliminate}
                crossOut="bluebook"
              />

              {/* Footer — single forward-only primary action */}
              <div className="mini-diag-footer">
                <button type="button" className="bottom-nav-btn is-primary" onClick={handleNext}>
                  {isLast ? (phase === 'rw' ? 'Finish section' : 'Finish check-in') : 'Next'}
                </button>
              </div>
              <p className="mini-diag-hint">
                You can leave a question blank — blanks just tell us where to start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniDiagnosticShell;
