import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MathText } from './MathText';
import QuestionDiagram from './QuestionDiagrams';
import QuestionRenderer from './QuestionRenderer';
import SolutionExplanation from './SolutionExplanation';
import AiTutorChat from './AiTutorChat';
import HandAuthoredStamp from './HandAuthoredStamp';
import AnswerChoiceList from './shared/AnswerChoiceList';
import HighlightablePassage, { mergeHighlights } from './rw/HighlightablePassage';
import { formatDiagnosticSentence } from '../services/diagnosticEngine';
import { findRoundIndexForQuestion, computeRoundProgress } from '../services/buildRounds';
import { getDrillChipForWeakness } from '../services/selectors/drillChip';
import { getDesmosTip } from '../services/selectors/desmosTip';
import { extractMissedIds } from '../services/selectors/drillSummary';
import { sectionModuleShort } from '../services/selectors/moduleLabel';
import { flagKeyFor } from '../services/selectors/flaggedQuestions';
import { decideTier } from '../data/questions/bank';
import { trackDrillStarted, trackDrillChipShown } from '../services/analyticsService';
import { InfoIcon } from '../design/icons';
import './AssignedPracticeShell.css';

const C = {
  // Primary action / CTA = the ORANGE brand domain (tri-color system).
  brand: 'var(--color-brand-primary)',
  brandHover: 'var(--color-brand-primary-hover)',
  brandLight: 'var(--color-brand-primary-light)',
  success: 'var(--color-brand-green-text)',
  successBg: 'var(--color-brand-green-soft)',
  error: 'var(--color-error-500)',
  errorBg: 'var(--color-error-50)',
  warning: 'var(--color-warning-500)',
  warningBg: 'var(--color-warning-50)',
  text: 'var(--color-slate-900)',
  textSec: 'var(--color-slate-600)',
  textMuted: 'var(--color-slate-500)',
  border: 'var(--color-slate-200)',
  bg: 'var(--color-slate-50)',
  white: 'var(--color-white)',
  dark: 'var(--color-brand-navy)',
};

// ── Sidebar: persistent question list (Acely-style left pane) ──────────
// One row per question. Status icon + 2-line stem preview. Current row
// gets an orange highlight; answered rows get green ✓ or red ✗.
function QuestionSidebar({ questions, currentIndex, answers, onNavigate, onBack, backLabel, headerTitle, drillPatternLabel, answeredCount, total, adaptiveMode = false }) {
  const pct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;
  // In adaptive mode `total` is the session TARGET; the questions after the
  // served ones aren't chosen yet, so they render as locked placeholders.
  const placeholderCount = adaptiveMode ? Math.max(0, total - questions.length) : 0;
  return (
    <aside className="aps-sidebar">
      <div className="aps-sidebar-head">
        <button onClick={onBack} className="aps-sidebar-back" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          {backLabel || 'Back to Study Plan'}
        </button>

        <div className="aps-sidebar-title">{drillPatternLabel || headerTitle}</div>

        <div className="aps-sidebar-progress">
          <div className="aps-sidebar-progress-track">
            <div className="aps-sidebar-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="aps-sidebar-progress-count">
            {answeredCount}<span className="aps-count-total">/{adaptiveMode ? '~' : ''}{total}</span>
          </span>
        </div>
      </div>

      <div className="aps-sidebar-list">
        {questions.map((q, idx) => {
          const ans = answers[q.id];
          const isCurrent = idx === currentIndex;
          const stem = stemPreview(q);
          // Mirror handleNavigate's frontier rule so a row only LOOKS
          // clickable when clicking it will actually navigate: answered and
          // backward rows always; the immediate next tile once the current
          // question is answered. Everything further ahead is locked.
          const currentAnswered = !!answers[questions[currentIndex]?.id];
          const navigable = !!ans || idx <= currentIndex || (idx === currentIndex + 1 && currentAnswered);
          let rowClass = 'aps-sidebar-row';
          if (isCurrent) rowClass += ' is-current';
          else if (ans?.correct) rowClass += ' is-correct';
          else if (ans && !ans.correct) rowClass += ' is-wrong';
          else if (!navigable) rowClass += ' is-locked';

          return (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={rowClass}
              type="button"
              title={stem}
              aria-disabled={!navigable}
            >
              <span className="aps-sidebar-dot" aria-hidden="true">
                {ans?.correct
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : ans
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    : null
                }
              </span>
              <span className="aps-sidebar-stem">{stem}</span>
            </button>
          );
        })}
        {Array.from({ length: placeholderCount }).map((_, k) => (
          <div key={`ph-${k}`} className="aps-sidebar-row is-locked" aria-hidden="true">
            <span className="aps-sidebar-dot" />
            <span className="aps-sidebar-stem aps-sidebar-stem-ph">
              {k === 0 ? 'Next — picked from how you answer' : ''}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

// Extracts a clean text preview from a question. Handles the various
// question shapes: plain string, segments array, object form, fill-in
// stems with passages, etc. Always returns a single-line string.
export function stemPreview(q) {
  // Prefer the passage's first sentence for R&W; otherwise the question.
  let raw = '';
  if (typeof q?.passage === 'string') raw = q.passage;
  else if (Array.isArray(q?.passages) && q.passages.length > 0 && q.passages[0]?.text) raw = q.passages[0].text;
  else if (typeof q?.question === 'string') raw = q.question;
  else if (Array.isArray(q?.question)) raw = q.question.map(s => s.text || s.math || '').join(' ');
  else if (q?.question?.segments) raw = q.question.segments.map(s => s.text || s.math || '').join(' ');
  else if (q?.question && typeof q.question === 'object') raw = q.question.text || '';
  if (!raw) return q?.id || 'Question';
  // Strip LaTeX delimiters and collapse whitespace. Escaped dollars (money
  // amounts like `$\$8{,}400$`) must be protected BEFORE the $-pair strip:
  // the naive pair regex ate `$\$` as a pair, leaving `\8,400` in the
  // sidebar and an orphaned `$` that mis-paired the rest of the line.
  return raw
    .replace(/\\\$/g, '\uE000')
    .replace(/\$([^$]*)\$/g, '$1')
    .replace(/\uE000/g, '$')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}]/g, '')
    // Markdown emphasis renders in the main pane but the sidebar is plain
    // text \u2014 drop paired markers so titles don't show literal asterisks.
    .replace(/\*\*([^*\n]+?)\*\*/g, '$1')
    .replace(/\*([^*\n]+?)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

// Top progress strip — segmented dots like Acely's question-bar chips.
function ProgressDots({ total, currentIndex, answers, questions, onNavigate }) {
  return (
    <div className="aps-progress-dots" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={currentIndex + 1}>
      {Array.from({ length: total }).map((_, i) => {
        const q = questions[i];
        const ans = q ? answers[q.id] : null;
        const isCurrent = i === currentIndex;
        // Calm, positional progress (Acely-style): the filled bar shows how far
        // along you are; the current question carries the number badge.
        // Correctness is NOT repeated here in red/green — it already lives in
        // the left navigator, so the top bar stays quiet.
        let cls = 'aps-progress-dot';
        if (isCurrent) cls += ' is-current';
        else if (ans) cls += ' is-answered';
        return (
          <button
            key={i}
            type="button"
            onClick={() => onNavigate(i)}
            aria-label={`Go to question ${i + 1}${ans ? (ans.correct ? ' (correct)' : ' (incorrect)') : ''}`}
            className={cls}
          >
            {isCurrent && <span className="aps-progress-dot-num">{i + 1}</span>}
          </button>
        );
      })}
    </div>
  );
}

const AssignedPracticeShell = ({
  practiceState,
  questions,
  currentQuestion,
  headerTitle,
  // Adaptive mode (Practice Bank topic/domain rounds): the round serves one
  // question at a time and ladders difficulty. The rail/progress show a target
  // (`adaptiveTarget`) with locked placeholders for not-yet-served questions.
  adaptiveMode = false,
  adaptiveTarget = 0,
  onBack,
  backLabel = 'Back to Study Plan',
  sessionResumable = false,
  onSelectAnswer,
  onCheckAnswer,
  onNextQuestion,
  onAdvanceToNextRound,
  onTrySimilar,
  isTrySimilarExhausted = false,
  onShowHint,
  onNavigateToQuestion,
  onToggleCalculator,
  showCalculator,
  // Flag-a-question store (map { flagKey: entry }) + toggle. When absent the
  // bookmark control simply doesn't render (e.g. a shell mounted without a user).
  flaggedQuestions = {},
  onToggleFlag,
  onRetry,
  // Optional (bank drills only): relaunch a fresh drill of just the missed
  // questions. Absent for study-plan / adaptive / review sessions, where the
  // "What's next" re-drill row does not render. Receives the missed-question ids.
  onRedrillMisses,
  getDifficultyBadge,
  user,
  skillProgress,
  practiceTestResults,
  studentFingerprint = null,
  interventionLog = null,
  predictionLog = null,
}) => {
  const [eliminatedChoices, setEliminatedChoices] = useState({});
  // Bluebook-style passage highlights, mirroring the timed test (PracticeTest).
  // Transient local UI state (not persisted) keyed by `${questionId}-${passageKey}`
  // so a Try-Similar splice — which shifts later array indexes — never drags a
  // highlight onto the wrong question. `highlightsHidden` toggles all on/off.
  const [highlightsByKey, setHighlightsByKey] = useState({});
  const [highlightsHidden, setHighlightsHidden] = useState(false);
  // Debounce trap so a rapid double-click doesn't insert two questions.
  const trySimilarLockRef = useRef(0);
  // Timestamp of the last Check Answer click. The Check button swaps to
  // Continue IN PLACE, so the second click of a fast double-click would land
  // on Continue and skip past the feedback. Swallow Continue clicks that land
  // within ~350ms of the check (timestamp only — no timer to leak).
  const checkClickRef = useRef(0);

  // Resizable Assisted Help pane — the AI chat is a co-equal pane (Acely-style)
  // the student can widen with a drag handle. Presentation-only state, persisted
  // locally; it never touches the controlled session state in App.jsx.
  const [panelWidth, setPanelWidth] = useState(() => {
    try {
      const saved = Number(localStorage.getItem('performsat:drillPanelW'));
      if (saved >= 360 && saved <= 680) return saved;
    } catch (_) { /* ignore unavailable storage */ }
    return 460;
  });
  // Hold the live drag listeners so an unmount MID-DRAG (before mouseup) can tear
  // them down — otherwise the window listeners leak and setPanelWidth fires after
  // unmount.
  const dragCleanupRef = useRef(null);
  const startPanelDrag = (e) => {
    e.preventDefault();
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    const onMove = (ev) => {
      const w = Math.min(680, Math.max(360, window.innerWidth - ev.clientX));
      setPanelWidth(w);
    };
    const teardown = () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dragCleanupRef.current = null;
    };
    const onUp = () => {
      teardown();
      setPanelWidth((w) => {
        try { localStorage.setItem('performsat:drillPanelW', String(Math.round(w))); } catch (_) { /* ignore */ }
        return w;
      });
    };
    dragCleanupRef.current = teardown;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };
  useEffect(() => () => { if (dragCleanupRef.current) dragCleanupRef.current(); }, []);

  const idx = practiceState.currentQuestionIndex;
  const total = questions.length;
  const answeredCount = Object.keys(practiceState.answers).length;
  const correctCount = Object.values(practiceState.answers).filter(a => a.correct).length;
  const diffBadge = currentQuestion?.difficulty ? getDifficultyBadge(currentQuestion.difficulty) : null;
  // Adaptive mode: the rail/dots/counter show a target with locked placeholders
  // for questions the engine hasn't chosen yet. displayTotal never shrinks below
  // what's already served.
  const displayTotal = adaptiveMode ? Math.max(adaptiveTarget || 0, total) : total;
  // Difficulty trend vs the previously served question — drives the "stepping
  // up / easing back" cue so the adaptation is legible.
  const DIFF_RANK = { easy: 0, medium: 1, hard: 2 };
  const difficultyTrend = (() => {
    if (!adaptiveMode || idx <= 0) return null;
    const cur = DIFF_RANK[String(currentQuestion?.difficulty || '').toLowerCase()];
    const prev = DIFF_RANK[String(questions[idx - 1]?.difficulty || '').toLowerCase()];
    if (cur == null || prev == null || cur === prev) return null;
    return cur > prev ? 'up' : 'down';
  })();

  // Key crossed-out choices by the STABLE question id, not the array index — a
  // Try-Similar insertion splices a question into the queue and shifts every
  // later index, which would otherwise drag eliminations onto the wrong question.
  const currentElimKey = String(currentQuestion?.id ?? `idx-${idx}`);
  const eliminated = eliminatedChoices[currentElimKey] || [];

  // Highlight handlers — scoped per passage within the current question. Keyed
  // by stable question id (same rationale as currentElimKey above) plus a
  // passageKey ('main' for a single passage, `p${i}` for paired-text items).
  const buildHlKey = (passageKey) => `${currentQuestion?.id ?? `idx-${idx}`}-${passageKey}`;
  const handleAddHighlight = (passageKey, range) => {
    setHighlightsByKey((prev) => {
      const k = buildHlKey(passageKey);
      const existing = prev[k] || [];
      return { ...prev, [k]: mergeHighlights([...existing, range]) };
    });
  };
  const handleRemoveHighlight = (passageKey, range) => {
    setHighlightsByKey((prev) => {
      const k = buildHlKey(passageKey);
      const existing = prev[k] || [];
      return { ...prev, [k]: existing.filter((h) => !(h.start === range.start && h.end === range.end)) };
    });
  };
  const handleClearHighlights = () => {
    setHighlightsByKey((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${currentQuestion?.id ?? `idx-${idx}`}-`)) delete next[k];
      });
      return next;
    });
  };
  const hasPassageToHighlight = !!(currentQuestion?.passage || Array.isArray(currentQuestion?.passages) ||
    Array.isArray(currentQuestion?.studentNotes?.bullets));

  // Answer context for the AI tutor's trap-analysis branch (only meaningful
  // after the student has answered + revealed). Without these the "name the
  // trap you fell for" coaching can never fire. selectedAnswer is the readable
  // "C) <choice text>" form, not a bare letter, so feedback is specific.
  const tutorRecordedAnswer = practiceState.answers[currentQuestion?.id];
  const tutorSelectedDisplay = (() => {
    const sel = tutorRecordedAnswer?.selected;
    if (!sel) return undefined;
    if (currentQuestion?.type === 'fill-in') return sel;
    const t = currentQuestion?.choices?.find(c => c.id === sel)?.text;
    return t ? `${sel}) ${t}` : sel;
  })();

  const handleNavigate = (targetIdx) => {
    if (targetIdx >= 0 && targetIdx < total) {
      const q = questions[targetIdx];
      const hasAnswer = !!practiceState.answers[q?.id];
      // Allow stepping forward to the frontier (the immediate next tile) once
      // the current question is answered — otherwise that tile is a dead click
      // with no affordance. Backward + answered tiles stay freely navigable.
      const currentAnswered = !!practiceState.answers[currentQuestion?.id];
      const isFrontier = targetIdx === idx + 1 && currentAnswered;
      if (hasAnswer || targetIdx <= idx || isFrontier) {
        onNavigateToQuestion(targetIdx);
      }
    }
  };

  // Closes E4 (gate) + GAP-3 (debounce). The lock is a timestamp, not a flag,
  // so it self-clears when the next click is >=500ms after the previous and
  // we never need a setTimeout that could leak across question advances.
  const handleTrySimilarClick = () => {
    if (typeof onTrySimilar !== 'function') return;
    const now = Date.now();
    if (now - trySimilarLockRef.current < 500) return;
    trySimilarLockRef.current = now;
    onTrySimilar(currentQuestion);
  };

  // Day-2 Acely-polish: round-aware question header. The current round is
  // determined by the question id, not by currentRoundIndex (which may lag
  // briefly during state transitions).
  // eslint-disable-next-line react-hooks/exhaustive-deps -- the else branch is a fresh [] each render, so roundProgress below simply recomputes; memoizing it would change render identity
  const rounds = Array.isArray(practiceState.rounds) ? practiceState.rounds : [];
  const currentRoundIdx = currentQuestion
    ? findRoundIndexForQuestion(rounds, currentQuestion.id)
    : -1;
  const currentRound = currentRoundIdx >= 0 ? rounds[currentRoundIdx] : null;
  const roundProgress = useMemo(
    () => computeRoundProgress(rounds, practiceState.answers || {}),
    [rounds, practiceState.answers],
  );

  // Phase 2 surfacing: when the weakness that triggered this drill carries
  // a specific SAT Pattern (e.g., 'reverse-percent'), show a "Practicing:"
  // chip in the header. Makes Tier-1 routing precision visible — students
  // see WHY their drill was assembled (not just "Algebra Practice" but
  // "Practicing: Reverse Percent"). Falls back to no chip when the weakness
  // is legacy/skill-only — graceful, never a worse experience.
  //
  // `getDrillChipForWeakness` returns null when the bank pool for the
  // weakness's pattern is below TIER1_PATTERN_THRESHOLD, so chip-shown ≡
  // Tier-1 fired ≡ exact pattern match was viable.
  const drillChip = useMemo(
    () => getDrillChipForWeakness(practiceState?.assignmentMeta?.weakness),
    [practiceState?.assignmentMeta?.weakness],
  );
  const drillPatternLabel = drillChip?.label || null;
  const drillPatternSlug = drillChip?.slug || null;

  // Drill-launch + chip-shown telemetry. Fires once per shell mount.
  // Tier classification comes from `decideTier` — the source-of-truth
  // cascade mirror of `getTargetedWeaknessSet`. So `tier: 'pattern'` here
  // ≡ Tier 1 actually fired, `tier: 'style'` ≡ Tier 2 fired, etc. Pairs
  // with `recovery_drill_done` downstream to measure completion-rate-by-tier.
  // Stable userId guard prevents anonymous mounts from logging.
  const drillStartTrackedRef = useRef(false);
  useEffect(() => {
    if (drillStartTrackedRef.current) return;
    const uid = user?.uid;
    if (!uid) return;
    const weakness = practiceState?.assignmentMeta?.weakness;
    const section = weakness?.section || null;
    const source = practiceState?.reviewMode
      ? 'review-retry'
      : (practiceState?.assignmentMeta?.source || 'assigned');
    const decision = weakness ? decideTier({ weakSkills: [weakness] }) : { tier: 'empty' };
    trackDrillStarted(uid, {
      tier: decision.tier,
      pattern: drillPatternSlug || decision.matchedPatterns?.[0] || null,
      section,
      source,
      questionCount: Array.isArray(questions) ? questions.length : 0,
    });
    if (drillPatternLabel && drillPatternSlug) {
      trackDrillChipShown(uid, {
        pattern: drillPatternSlug,
        section,
        source,
      });
    }
    drillStartTrackedRef.current = true;
  }, [user?.uid, drillPatternLabel, drillPatternSlug, practiceState?.assignmentMeta, practiceState?.reviewMode, questions]);

  const handleToggleEliminate = (choiceId) => {
    setEliminatedChoices(prev => {
      const current = prev[currentElimKey] || [];
      return {
        ...prev,
        [currentElimKey]: current.includes(choiceId)
          ? current.filter(c => c !== choiceId)
          : [...current, choiceId],
      };
    });
  };

  // ── ROUND-COMPLETE INTERSTITIAL (Day-2 Acely-polish) ──
  // Renders between rounds — celebrates the just-finished round + offers a
  // pause point before the user clicks into the next one.
  if (practiceState.showRoundComplete && currentRound && rounds.length > 1) {
    const justFinished = roundProgress[currentRoundIdx];
    const nextRound = rounds[currentRoundIdx + 1];
    const correctText = justFinished
      ? `${justFinished.correct} of ${justFinished.total} correct`
      : '';
    return (
      <div className="aps-interstitial" role="status" aria-live="polite">
        <div className="aps-interstitial-card">
          <div className="aps-interstitial-eyebrow">Round complete</div>
          <h2 className="aps-interstitial-title">{currentRound.label}</h2>
          {correctText && <p className="aps-interstitial-sub">{correctText}</p>}
          <div className="aps-interstitial-circles" aria-hidden="true">
            {rounds.map((r, i) => {
              const p = roundProgress[i];
              const cls = [
                'aps-circle',
                p?.isComplete && 'aps-circle-complete',
                p?.isInProgress && 'aps-circle-progress',
              ].filter(Boolean).join(' ');
              return <span key={r.index} className={cls}>{i + 1}</span>;
            })}
          </div>
          <button
            type="button"
            className="aps-interstitial-cta"
            onClick={() => onAdvanceToNextRound && onAdvanceToNextRound()}
          >
            Continue to {nextRound?.label || 'next round'}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8, verticalAlign: '-2px' }}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          <button
            type="button"
            className="aps-interstitial-secondary"
            onClick={() => onBack && onBack()}
          >
            {sessionResumable
              ? 'Pause and resume later'
              : 'Exit drill — progress won\'t be saved'}
          </button>
        </div>
      </div>
    );
  }

  // ── COMPLETION SCREEN ──
  if (practiceState.isComplete) {
    const answeredEntries = Object.values(practiceState.answers);
    const totalQ = answeredEntries.length;
    const correct = answeredEntries.filter(a => a.correct).length;
    const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
    const isGood = pct >= 80;
    const isOkay = pct >= 40;

    const difficultyStats = { easy: { total: 0, correct: 0 }, medium: { total: 0, correct: 0 }, hard: { total: 0, correct: 0 } };
    questions.forEach(q => {
      const d = q.difficulty || 'medium';
      if (difficultyStats[d]) {
        difficultyStats[d].total++;
        if (practiceState.answers[q.id]?.correct) difficultyStats[d].correct++;
      }
    });

    // "What's next" forward action — Practice-Bank drills only (every bank
    // launcher emits a 'practice-bank-*' source). Study-plan / adaptive /
    // review-retry summaries keep the plain Try Again / Back row below.
    const isBankSession = (practiceState.assignmentMeta?.source || '').startsWith('practice-bank');
    const missedIds = isBankSession ? extractMissedIds(questions, practiceState.answers) : [];

    return (
      <div style={{ maxWidth: '580px', margin: '0 auto', padding: '48px 24px' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', padding: 0, fontSize: '14px',
          color: C.brand, cursor: 'pointer', display: 'flex', alignItems: 'center',
          gap: '6px', marginBottom: '48px', fontWeight: '500',
        }}>
          ← {backLabel}
        </button>

        {/* Score circle */}
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: isGood ? C.successBg : isOkay ? C.warningBg : C.errorBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
        }}>
          <span style={{ fontSize: '44px', fontWeight: '700', color: isGood ? C.success : isOkay ? C.warning : C.error }}>{correct}</span>
          <span style={{ fontSize: '22px', color: C.textSec }}>/{totalQ}</span>
        </div>

        <h2 style={{ fontSize: '26px', fontWeight: '700', color: C.text, marginBottom: '10px', textAlign: 'center' }}>
          {isGood ? 'Excellent work!' : isOkay ? 'Good effort!' : 'Keep practicing!'}
        </h2>
        <p style={{ fontSize: '15px', color: C.textSec, marginBottom: '12px', textAlign: 'center' }}>
          You got {correct} out of {totalQ} correct ({pct}%)
        </p>
        <p style={{ fontSize: '13px', color: C.textMuted, marginBottom: '32px', textAlign: 'center' }}>
          {headerTitle}
        </p>

        {/* Difficulty breakdown */}
        <div style={{ background: C.bg, borderRadius: '14px', padding: '22px', marginBottom: '32px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: C.textSec, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            By Difficulty
          </h3>
          {[
            { key: 'easy', label: 'Easy', color: C.success, bg: C.successBg },
            { key: 'medium', label: 'Medium', color: C.warning, bg: C.warningBg },
            { key: 'hard', label: 'Hard', color: C.error, bg: C.errorBg },
          ].map(({ key, label, color, bg }) => {
            const s = difficultyStats[key];
            if (s.total === 0) return null;
            const p = Math.round((s.correct / s.total) * 100);
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '10px', background: bg, color, width: '68px', textAlign: 'center' }}>{label}</span>
                <div style={{ flex: 1, marginLeft: '14px', marginRight: '12px' }}>
                  <div style={{ height: '7px', background: 'var(--color-slate-200)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p}%`, background: color, borderRadius: '4px', transition: 'width 0.3s' }} />
                  </div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-slate-700)', minWidth: '76px', textAlign: 'right' }}>{s.correct}/{s.total} ({p}%)</span>
              </div>
            );
          })}
        </div>

        {/* Question review grid */}
        <div style={{ background: C.bg, borderRadius: '14px', padding: '22px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: C.textSec, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Question Review
          </h3>
          {/* Status row, NOT buttons — these tiles used to render as
              clickable <button>s wired to onNavigateToQuestion, which is a
              no-op while isComplete is true (the parent never un-completes),
              so they looked interactive but did nothing. Per-question review
              from the summary has no cheap existing surface (drill items
              aren't past-test snapshots), so the honest fix is to read as
              status. Missed drill questions already feed the daily review
              queue for spaced-repetition follow-up. */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {questions.map((q, i) => {
              const ans = practiceState.answers[q.id];
              const isCorrect = ans?.correct;
              return (
                <span
                  key={i}
                  role="img"
                  aria-label={`Question ${i + 1}: ${isCorrect ? 'correct' : 'incorrect'}`}
                  title={`Question ${i + 1}: ${isCorrect ? 'correct' : 'incorrect'}`}
                  style={{
                    width: '38px', height: '38px', borderRadius: '8px',
                    border: `2px solid ${isCorrect ? C.success : C.error}`,
                    background: isCorrect ? C.successBg : C.errorBg,
                    color: isCorrect ? C.success : C.error,
                    fontSize: '13px', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {isCorrect ? '✓' : '✗'}
                </span>
              );
            })}
          </div>
        </div>

        {/* What's next — Practice-Bank drills only. The load-bearing post-drill
            loop: re-drill the exact questions you just missed (primary), rerun
            the whole set, or return. This IS the action zone for bank sessions,
            so the generic Try Again / Back row below is suppressed to avoid a
            duplicate back button. */}
        {isBankSession ? (
          <div style={{ background: C.bg, borderRadius: '14px', padding: '22px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: C.textSec, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              What's Next
            </h3>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {missedIds.length >= 2 && typeof onRedrillMisses === 'function' && (
                <button
                  type="button"
                  onClick={() => onRedrillMisses(missedIds)}
                  style={{
                    padding: '14px 28px', borderRadius: '12px', border: 'none',
                    background: C.brand, color: C.white, fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                  }}
                >
                  Re-drill your misses ({missedIds.length})
                </button>
              )}
              <button
                type="button"
                onClick={onRetry}
                style={{
                  padding: '14px 28px', borderRadius: '12px', border: `2px solid ${C.brand}`,
                  background: C.white, color: C.brand, fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                Try again
              </button>
              <button
                type="button"
                onClick={onBack}
                style={{
                  padding: '14px 28px', borderRadius: '12px', border: `1px solid var(--color-slate-300)`,
                  background: 'transparent', color: C.textSec, fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                Back to Practice Bank
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={onRetry} style={{
              padding: '14px 28px', borderRadius: '12px', border: `2px solid ${C.brand}`,
              background: C.white, color: C.brand, fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            }}>
              Try Again
            </button>
            <button onClick={onBack} style={{
              padding: '14px 28px', borderRadius: '12px', border: 'none',
              background: C.brand, color: C.white, fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            }}>
              {backLabel}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── ACTIVE PRACTICE — three-pane Practice Round ───────────────────────

  // Topic chip (e.g. "ALGEBRA") — the broad domain; uppercase via CSS. The
  // specific pattern ("No Solution Condition") is the title, not the chip.
  const rawTopic = currentQuestion?.domain || currentQuestion?.skills?.[0] || currentQuestion?.skill || '';
  const topicLabel = rawTopic ? String(rawTopic).replace(/[-_]/g, ' ') : '';
  const isReviewItem = practiceState.reviewMode && typeof currentQuestion?.moduleIndex === 'number';
  const eyebrowText = isReviewItem
    ? 'REVIEW SESSION'
    : currentRound ? currentRound.label.toUpperCase() : `QUESTION ${idx + 1}`;
  const titleText = drillPatternLabel || headerTitle;
  const answeredCorrect = practiceState.answers[currentQuestion?.id]?.correct;

  // Flag-a-question: build the raw store entry for the current question so the
  // bookmark can toggle + reflect persisted state. Pulls routing context off the
  // drill's weakness (skillId + missedPatterns) so the Review Queue's Re-drill
  // can fire Tier-1 exact-pattern routing later.
  const flagWeakness = practiceState?.assignmentMeta?.weakness || null;
  const currentFlagEntry = currentQuestion ? {
    questionId: currentQuestion.id,
    section: currentQuestion.section
      || flagWeakness?.section
      || (currentQuestion.passage || Array.isArray(currentQuestion.passages) ? 'rw' : 'math'),
    source: practiceState?.reviewMode
      ? 'review-retry'
      : (practiceState?.assignmentMeta?.source || 'assigned'),
    skillId: (Array.isArray(currentQuestion.skills) ? currentQuestion.skills[0] : currentQuestion.skill)
      || flagWeakness?.skillId || null,
    domain: currentQuestion.domain || flagWeakness?.domain || null,
    missedPatterns: Array.isArray(flagWeakness?.missedPatterns) ? flagWeakness.missedPatterns : null,
    snippet: typeof currentQuestion.question === 'string'
      ? currentQuestion.question
      : (currentQuestion.stem || null),
  } : null;
  const isCurrentFlagged = !!(currentFlagEntry && flaggedQuestions[flagKeyFor(currentFlagEntry)]);

  return (
    <div className="aps-shell" style={{ '--pr-panel-w': `${panelWidth}px` }}>

      {/* ── LEFT: question navigator ── */}
      <QuestionSidebar
        questions={questions}
        currentIndex={idx}
        answers={practiceState.answers}
        onNavigate={handleNavigate}
        onBack={onBack}
        backLabel={backLabel}
        headerTitle={headerTitle}
        drillPatternLabel={drillPatternLabel}
        answeredCount={answeredCount}
        total={displayTotal}
        adaptiveMode={adaptiveMode}
      />

      {/* ── CENTER: flat question column ── */}
      <main className="aps-center">

        {/* Segmented progress bar */}
        <div className="aps-seg-row">
          <ProgressDots
            total={displayTotal}
            currentIndex={idx}
            answers={practiceState.answers}
            questions={questions}
            onNavigate={handleNavigate}
          />
        </div>

        <div className="aps-scroll">
          <div className="aps-content">

            {/* Review-mode banner */}
            {practiceState.reviewMode && (
              <div className="aps-review-banner" role="status" aria-live="polite">
                <InfoIcon size={16} aria-hidden="true" />
                <span><strong>Review session.</strong> This won't affect your study plan or skill mastery.</span>
              </div>
            )}

            {/* Question header — eyebrow / title / badges / calculator */}
            <header className="aps-q-header">
              <div style={{ minWidth: 0 }}>
                <div className="aps-q-eyebrow">
                  {eyebrowText}
                  {adaptiveMode && <span className="aps-adaptive-pill">Adaptive</span>}
                </div>
                <div className="aps-q-title">
                  {isReviewItem
                    ? `${sectionModuleShort(currentQuestion.section, currentQuestion.moduleIndex)}·Q${(currentQuestion.questionIndex ?? 0) + 1} (originally missed)`
                    : titleText}
                </div>
              </div>

              <div className="aps-q-tools">
                {diffBadge && (
                  <span className={`aps-badge aps-badge-${diffBadge.label.toLowerCase()}`}>
                    {diffBadge.label}
                  </span>
                )}
                {topicLabel && (
                  <span className="aps-badge aps-badge-topic">{topicLabel}</span>
                )}
                {onToggleFlag && currentFlagEntry && (
                  <button
                    type="button"
                    className={`aps-flag-btn${isCurrentFlagged ? ' is-flagged' : ''}`}
                    onClick={() => onToggleFlag(currentFlagEntry)}
                    aria-pressed={isCurrentFlagged}
                    aria-label={isCurrentFlagged ? 'Remove this question from your review list' : 'Flag this question to review later'}
                    title={isCurrentFlagged ? 'Flagged for review — click to remove' : 'Flag to review later'}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isCurrentFlagged ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="aps-flag-label">{isCurrentFlagged ? 'Flagged' : 'Flag'}</span>
                  </button>
                )}
                <HandAuthoredStamp />
                {/* Calculator is a Math-only tool — the digital SAT does not
                    offer it on Reading & Writing. Hide it for R&W items.
                    Passage presence is the fallback signal for test-sourced
                    items whose resolver didn't tag `section`. */}
                {currentQuestion?.section !== 'rw' && !currentQuestion?.passage && (
                  <button
                    onClick={onToggleCalculator}
                    className={`aps-tool-btn ${showCalculator ? 'is-active' : ''}`}
                    type="button"
                    title="Toggle calculator"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <line x1="8" y1="6" x2="16" y2="6"/>
                      <line x1="8" y1="10" x2="8.01" y2="10"/>
                      <line x1="12" y1="10" x2="12.01" y2="10"/>
                      <line x1="16" y1="10" x2="16.01" y2="10"/>
                      <line x1="8" y1="14" x2="8.01" y2="14"/>
                      <line x1="12" y1="14" x2="12.01" y2="14"/>
                      <line x1="8" y1="18" x2="12" y2="18"/>
                    </svg>
                    Calculator
                  </button>
                )}
              </div>
            </header>

            {/* Adaptive difficulty cue — makes the per-answer laddering legible */}
            {adaptiveMode && difficultyTrend && (
              <div className={`aps-adapt-cue is-${difficultyTrend}`} role="status" aria-live="polite">
                {difficultyTrend === 'up'
                  ? 'Stepping up — you’re on a streak, so this one’s harder. Miss one and the next eases back.'
                  : 'Easing back — this one’s a little gentler. String some together and it steps back up.'}
              </div>
            )}

            {/* Numbered question tag */}
            <div className="aps-qtag">
              <span className="aps-qtag-num">{idx + 1}</span>
              <span className="aps-qtag-label">Question {idx + 1} of {adaptiveMode ? `~${displayTotal}` : total}</span>
            </div>

            {/* R&W passage — Bluebook-style highlightable rendering, shared with
                the timed test (PracticeTest) so students annotate the same way
                in drills. Covers the single `passage`, paired `passages`, and
                `studentNotes` (rhetorical-synthesis) shapes — notes bullets are
                highlightable exactly like the timed test. The toolbar only
                appears when there is something to mark. */}
            {hasPassageToHighlight && (
              <div className="aps-rw-toolbar">
                <span className="aps-rw-toolbar-hint">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 11l-4 4v3h3l4-4"/><path d="M13 7l4 4"/><path d="M3 21h7"/><path d="M14.5 5.5l4 4L21 7l-4-4z"/></svg>
                  Select text to highlight it · click a highlight to remove
                </span>
                <div className="aps-rw-toolbar-actions">
                  <button
                    type="button"
                    className="aps-rw-btn"
                    onClick={() => setHighlightsHidden((v) => !v)}
                    aria-pressed={highlightsHidden}
                    title={highlightsHidden ? 'Show highlights' : 'Hide highlights'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {highlightsHidden ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                    {highlightsHidden ? 'Show Highlights' : 'Hide Highlights'}
                  </button>
                  <button
                    type="button"
                    className="aps-rw-btn"
                    onClick={handleClearHighlights}
                    title="Clear all highlights on this question"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                    </svg>
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {currentQuestion.passage && (
              <HighlightablePassage
                className="aps-rw-passage"
                text={currentQuestion.passage}
                highlights={highlightsByKey[buildHlKey('main')] || []}
                hidden={highlightsHidden}
                onAddHighlight={(r) => handleAddHighlight('main', r)}
                onRemoveHighlight={(r) => handleRemoveHighlight('main', r)}
                ariaLabel="Reading passage"
              />
            )}

            {Array.isArray(currentQuestion.passages) && (
              <div className="aps-rw-passage-stack">
                {currentQuestion.passages.map((p, i) => (
                  <div key={i}>
                    <div className="aps-rw-passage-label">{p.label || `Text ${i + 1}`}</div>
                    <HighlightablePassage
                      className="aps-rw-passage"
                      text={p.text}
                      highlights={highlightsByKey[buildHlKey(`p${i}`)] || []}
                      hidden={highlightsHidden}
                      onAddHighlight={(r) => handleAddHighlight(`p${i}`, r)}
                      onRemoveHighlight={(r) => handleRemoveHighlight(`p${i}`, r)}
                      ariaLabel={p.label || `Text ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.studentNotes && (
              <div style={{
                fontFamily: "'Georgia', 'Cambria', 'Times New Roman', serif",
                fontSize: '17px',
                lineHeight: '1.65',
                color: 'var(--pr-text)',
                margin: '18px 0 4px',
              }}>
                {/* Notes are highlightable like passages (parity with the
                    timed test). The goal stays below the bullets here: this
                    single-column surface reads it straight into the question
                    stem, matching Bluebook's linear order. */}
                {currentQuestion.studentNotes.intro && (
                  <div style={{ marginBottom: '8px' }}>
                    <HighlightablePassage
                      text={currentQuestion.studentNotes.intro}
                      className="aps-note-segment"
                      highlights={highlightsByKey[buildHlKey('notesIntro')] || []}
                      hidden={highlightsHidden}
                      onAddHighlight={(r) => handleAddHighlight('notesIntro', r)}
                      onRemoveHighlight={(r) => handleRemoveHighlight('notesIntro', r)}
                    />
                  </div>
                )}
                {Array.isArray(currentQuestion.studentNotes.bullets) && (
                  <ul style={{ paddingLeft: '1.25rem', margin: '8px 0' }}>
                    {currentQuestion.studentNotes.bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>
                        <HighlightablePassage
                          text={b}
                          className="aps-note-segment"
                          highlights={highlightsByKey[buildHlKey(`note${i}`)] || []}
                          hidden={highlightsHidden}
                          onAddHighlight={(r) => handleAddHighlight(`note${i}`, r)}
                          onRemoveHighlight={(r) => handleRemoveHighlight(`note${i}`, r)}
                        />
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

            {/* Diagram */}
            {currentQuestion.diagram && (
              <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                <QuestionDiagram type={currentQuestion.diagram.type} params={currentQuestion.diagram.params} />
              </div>
            )}

            {/* Question table */}
            {currentQuestion.questionTable && (
              <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                <table style={{ borderCollapse: 'collapse', fontSize: '15px', fontFamily: 'Times New Roman, Georgia, serif', background: '#fff', color: '#111' }}>
                  <thead>
                    <tr>
                      {currentQuestion.questionTable.headers.map((header, i) => (
                        <th key={i} style={{
                          border: '1.5px solid #111', padding: '7px 16px',
                          background: '#fff', fontWeight: 'bold',
                          fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '14px',
                        }}>
                          <MathText>{header}</MathText>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestion.questionTable.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} style={{
                            border: '1px solid #111', padding: '6px 16px', textAlign: 'center', background: '#fff'
                          }}>
                            <MathText>{cell}</MathText>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Question stem — serif to match the official Bluebook test stem;
                same family the shared AnswerChoiceList uses. */}
            <div className="aps-stem">
              {Array.isArray(currentQuestion.question) || (currentQuestion.question && typeof currentQuestion.question === 'object')
                ? <QuestionRenderer content={currentQuestion.question} />
                : <MathText>{currentQuestion.question}</MathText>
              }
            </div>

            {/* Formula */}
            {currentQuestion.questionFormula && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px', fontSize: '20px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--pr-text)',
              }}>
                {currentQuestion.questionFormula.text}
                {currentQuestion.questionFormula.fraction && (
                  <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginLeft: currentQuestion.questionFormula.text ? '4px' : '0' }}>
                    <span style={{ padding: '0 6px' }}>{currentQuestion.questionFormula.fraction.numerator}</span>
                    <span style={{ width: '100%', height: '2px', background: 'var(--pr-text)', margin: '2px 0' }} />
                    <span style={{ padding: '0 6px' }}>{currentQuestion.questionFormula.fraction.denominator}</span>
                  </span>
                )}
                {currentQuestion.questionFormula.textAfter && (
                  <span style={{ marginLeft: '4px' }}>{currentQuestion.questionFormula.textAfter}</span>
                )}
              </div>
            )}

            {/* Continued text */}
            {currentQuestion.questionContinued && (
              <div style={{
                fontFamily: "'Times New Roman', 'Georgia', 'Cambria', serif",
                fontSize: '16px',
                color: 'var(--pr-text)',
                lineHeight: '1.7',
                marginBottom: '20px',
              }}>
                {Array.isArray(currentQuestion.questionContinued) || (typeof currentQuestion.questionContinued === 'object')
                  ? <QuestionRenderer content={currentQuestion.questionContinued} />
                  : <MathText>{currentQuestion.questionContinued}</MathText>
                }
              </div>
            )}

            {/* ── Answer choices (shared AnswerChoiceList, scoped to the
                  Round palette via .aps-answers overrides) ── */}
            <div className="aps-answers">
              <AnswerChoiceList
                choices={currentQuestion.choices || []}
                selectedId={practiceState.selectedAnswer}
                eliminatedIds={eliminated}
                showResult={practiceState.showFeedback}
                correctId={currentQuestion.correctAnswer}
                onSelect={onSelectAnswer}
                onToggleEliminate={handleToggleEliminate}
              />
            </div>

            {/* Center inline hint (main hints come from the Assisted Help panel) */}
            {currentQuestion.hint && !practiceState.showFeedback && (
              !practiceState.showHint ? (
                <button onClick={onShowHint} className="aps-hint-btn" type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Hint
                </button>
              ) : (
                <div className="aps-hint-box">
                  <div className="aps-hint-box-label">Hint</div>
                  <p>{currentQuestion.hint}</p>
                </div>
              )
            )}

            {/* Feedback / explanation */}
            {practiceState.showFeedback && (
              <div className={`aps-feedback ${answeredCorrect ? 'is-correct' : 'is-wrong'}`}>
                <span className="aps-feedback-icon" aria-hidden="true">
                  {answeredCorrect ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--pr-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" fill="rgba(46,158,99,.12)" stroke="none"/><path d="M8 12.5l2.5 2.5 5-5.5"/>
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--pr-red)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" fill="rgba(217,72,59,.1)" stroke="none"/><path d="M15 9l-6 6M9 9l6 6"/>
                    </svg>
                  )}
                </span>
                <div className="aps-feedback-main">
                  <div className="aps-feedback-title">
                    {answeredCorrect ? 'Correct — nicely done.' : 'Not quite — here’s why.'}
                  </div>
                  <div className="aps-feedback-body">
                    <SolutionExplanation explanation={currentQuestion.explanation} />
                  </div>

                  {/* Day 5 D3 — italic editorial sentence after a wrong answer.
                      Only renders when the assignment carries a weakness shape
                      (focus-area drills do; review-queue and ad-hoc don't). */}
                  {!answeredCorrect
                    && practiceState.assignmentMeta?.weakness
                    && (() => {
                      const sentence = formatDiagnosticSentence(practiceState.assignmentMeta.weakness);
                      if (!sentence) return null;
                      return <p className="aps-diagnostic-sentence">{sentence}</p>;
                    })()}

                  {/* Desmos route — the calculator play for this question family (math only) */}
                  {(() => {
                    const tip = getDesmosTip(currentQuestion);
                    if (!tip) return null;
                    return (
                      <div className="aps-desmos-route">
                        <div className="aps-desmos-route-label">
                          Desmos route — {tip.name} ({tip.timeEstimate})
                        </div>
                        <p>{tip.technique}</p>
                      </div>
                    );
                  })()}

                  {/* Try-similar — only when wrong (E4) and skill pool isn't exhausted (GAP-3) */}
                  {!answeredCorrect && typeof onTrySimilar === 'function' && (
                    <button
                      type="button"
                      onClick={handleTrySimilarClick}
                      disabled={isTrySimilarExhausted}
                      className="aps-trysimilar"
                      aria-label={isTrySimilarExhausted
                        ? 'No more similar questions for this skill'
                        : 'Try a similar question for the same skill'}
                    >
                      {isTrySimilarExhausted
                        ? 'No more similar questions'
                        : 'Try a similar question'}
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>{/* /aps-content */}
        </div>{/* /aps-scroll */}

        {/* Footer: Previous · counter · Check Answer / Continue */}
        <footer className="aps-footer-row">
          <button
            type="button"
            onClick={() => handleNavigate(idx - 1)}
            disabled={idx === 0}
            className="aps-footer-prev"
            aria-label="Previous question"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Previous
          </button>

          <span className="aps-footer-counter">
            {answeredCount} of {adaptiveMode ? `~${displayTotal}` : total} answered
            {correctCount > 0 && <span className="aps-footer-correct"> · {correctCount} correct</span>}
          </span>

          {!practiceState.showFeedback ? (
            <button
              type="button"
              onClick={() => { checkClickRef.current = Date.now(); onCheckAnswer(currentQuestion); }}
              disabled={!practiceState.selectedAnswer}
              className="aps-footer-cta"
            >
              Check Answer
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { if (Date.now() - checkClickRef.current < 350) return; onNextQuestion(questions); }}
              className="aps-footer-cta is-next"
            >
              {/* Adaptive rounds end dynamically (target + mastery, or pool dry) —
                  the engine flips isComplete and the completion screen renders,
                  so the button is always "Continue" until then. */}
              {adaptiveMode ? 'Continue' : (idx < total - 1 ? 'Continue' : 'See Results')}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          )}
        </footer>

      </main>{/* /aps-center */}

      {/* ── RIGHT: Assisted Help (AI Tutor) — resizable co-equal pane ── */}
      <aside className="aps-right">
        {/* Drag handle on the pane's left edge to widen / narrow the chat. */}
        <div
          className="aps-resize-handle"
          onMouseDown={startPanelDrag}
          role="separator"
          aria-orientation="vertical"
          aria-label="Drag to resize the help panel"
          title="Drag to resize"
        />
        <AiTutorChat
          key={`assigned-${idx}`}
          isOpen={true}
          onClose={() => {}}
          moduleId="assigned-practice"
          lessonId={`assigned-${currentQuestion?.id || idx}`}
          lessonTitle={headerTitle}
          isVideoLesson={false}
          isPracticeQuestion={true}
          practiceContext={{
            // Stable id for next-item-correctness telemetry (tutorExchangeTracker).
            questionId: currentQuestion?.id,
            question: currentQuestion?.question || '',
            choices: currentQuestion?.choices || [],
            hint: currentQuestion?.hint || '',
            answerRevealed: practiceState.showFeedback,
            correctAnswer: practiceState.showFeedback
              ? (currentQuestion?.type === 'fill-in'
                  ? currentQuestion?.correctAnswer
                  : currentQuestion?.choices?.find(c => c.id === currentQuestion?.correctAnswer)?.text || currentQuestion?.correctAnswer)
              : undefined,
            explanation: practiceState.showFeedback ? (currentQuestion?.explanation || '') : '',
            // Revive the trap-analysis + emotional-state coaching: what the
            // student picked and whether it was right (only post-reveal).
            isCorrect: practiceState.showFeedback ? tutorRecordedAnswer?.correct : undefined,
            selectedAnswer: practiceState.showFeedback ? tutorSelectedDisplay : undefined,
            userAnswer: practiceState.showFeedback ? tutorRecordedAnswer?.selected : undefined,
            skills: currentQuestion?.skills || (currentQuestion?.skill ? [currentQuestion.skill] : []),
            // R&W stimulus + classification (undefined for math items → tutor stays math)
            section: currentQuestion?.section || (currentQuestion?.passage ? 'rw' : 'math'),
            domain: currentQuestion?.domain,
            passage: currentQuestion?.passage,
            passages: currentQuestion?.passages,
            studentNotes: currentQuestion?.studentNotes,
            questionTable: currentQuestion?.questionTable,
          }}
          embedded={true}
          headerCompact={true}
          standalone={false}
          reviewMode={!!practiceState.reviewMode}
          skillProgress={skillProgress}
          testDate={user?.testDate}
          user={user}
          practiceTestResults={practiceTestResults}
          studentFingerprint={studentFingerprint}
          interventionLog={interventionLog}
          predictionLog={predictionLog}
        />
      </aside>

    </div>
  );
};

export default AssignedPracticeShell;
