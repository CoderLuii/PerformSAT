import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MathText } from './MathText';
import QuestionDiagram from './QuestionDiagrams';
import QuestionRenderer from './QuestionRenderer';
import SolutionExplanation from './SolutionExplanation';
import AiTutorChat from './AiTutorChat';
import { formatPatternLabel } from '../services/selectors/missedPatternLabel';
import { getDesmosTip } from '../services/selectors/desmosTip';
import { flagKeyFor } from '../services/selectors/flaggedQuestions';
import { decideTier } from '../data/questions/bank';
import { trackDrillStarted, trackDrillChipShown } from '../services/analyticsService';
import { TargetIcon } from '../design/icons';

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

function QuestionGrid({ questions, currentIndex, answers, markedForReview, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {questions.map((q, idx) => {
        const ans = answers[q.id];
        const isCurrent = idx === currentIndex;
        const isMarked = markedForReview.includes(idx);
        let bg = C.white;
        let border = C.border;
        let color = C.textSec;
        if (ans) {
          bg = ans.correct ? C.successBg : C.errorBg;
          border = ans.correct ? C.success : C.error;
          color = ans.correct ? C.success : C.error;
        }
        if (isCurrent) {
          border = C.brand;
          if (!ans) bg = C.brandLight;
        }
        return (
          <button
            key={idx}
            onClick={() => onNavigate(idx)}
            style={{
              width: '36px', height: '36px', borderRadius: '8px',
              border: `2px solid ${border}`, background: bg, color,
              fontSize: '13px', fontWeight: '700', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', transition: 'all 0.15s',
            }}
          >
            {idx + 1}
            {isMarked && (
              <span style={{
                position: 'absolute', top: '-3px', right: '-3px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: C.warning, border: `1px solid ${C.white}`,
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function ProgressBar({ answered, target, mastery, minMastery, isComplete }) {
  const pct = target > 0 ? Math.min(100, Math.round((answered / target) * 100)) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: C.textSec, fontWeight: '600' }}>
      <div style={{ flex: 1, height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: '3px',
          background: isComplete ? C.success : C.brand,
          transition: 'width 0.3s',
        }} />
      </div>
      <span>{answered}/{target}</span>
      <span style={{ color: mastery >= minMastery ? C.success : C.textMuted }}>{mastery}%</span>
    </div>
  );
}

const AdaptivePracticeShell = ({
  practiceState,
  questions,
  currentQuestion,
  headerTitle,
  onBack,
  onSelectAnswer,
  onCheckAnswer,
  onNextQuestion,
  onShowHint,
  onNavigateToQuestion,
  onToggleCalculator,
  showCalculator,
  flaggedQuestions = {},
  onToggleFlag,
  onRelaunch,
  getDifficultyBadge,
  user,
  skillProgress,
}) => {
  const [markedForReview, setMarkedForReview] = useState([]);
  const [eliminatedChoices, setEliminatedChoices] = useState({});
  const [showGrid, setShowGrid] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);

  const sessionState = practiceState.adaptiveSessionState;
  const answeredCount = sessionState?.answered?.length || 0;
  const targetCount = sessionState?.targetQuestions || sessionState?.sessionLength || 15;
  const correctCount = sessionState?.correct || 0;
  const mastery = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const minMastery = sessionState?.minMasteryPercent || 80;
  const isSessionComplete = practiceState.isComplete;

  const idx = practiceState.currentQuestionIndex;
  const totalServed = questions.length;
  const diffBadge = currentQuestion?.difficulty ? getDifficultyBadge(currentQuestion.difficulty) : null;

  // Phase 2 parity with AssignedPracticeShell: when the adaptive seed was
  // biased toward specific SAT Patterns (from studyPlan weaknesses with
  // missedPatterns in this domain), surface the first one as a chip so
  // students see WHY the pool is targeted. Falls back to no chip on
  // legacy seeds or domain-only sessions with no weaknesses.
  //
  // Precision: `buildDomainAdaptiveQueueSeed` only attaches `missedPatterns`
  // to the seed when its internal pattern pool meets TIER1_PATTERN_THRESHOLD.
  // So if `missedPatterns` is present here, Tier 1 has fired by construction —
  // the chip is precise without an extra pool-size check at this layer.
  const { drillPatternLabel, drillPatternSlug } = useMemo(() => {
    const patterns = practiceState?.adaptiveQueueSeed?.missedPatterns;
    if (!Array.isArray(patterns) || patterns.length === 0) {
      return { drillPatternLabel: null, drillPatternSlug: null };
    }
    const slug = patterns[0];
    return { drillPatternLabel: formatPatternLabel(slug), drillPatternSlug: slug };
  }, [practiceState?.adaptiveQueueSeed?.missedPatterns]);

  // Drill-launch + chip-shown telemetry. Same shape as AssignedPracticeShell
  // — see analyticsService.js doc comment for the event taxonomy.
  //
  // Tier classification: the adaptive seed already encodes Tier-1 firing
  // (buildDomainAdaptiveQueueSeed only attaches `missedPatterns` to the seed
  // when its internal pool meets threshold). We synthesize a weakness-shaped
  // input for `decideTier` to make the classification consistent with
  // AssignedPracticeShell — same source-of-truth helper, same cascade logic.
  const drillStartTrackedRef = useRef(false);
  // Timestamp of the last Check Answer click. Check swaps to Continue IN
  // PLACE, so a fast double-click's second hit would land on Continue and
  // skip the feedback. Swallow Continue clicks within ~350ms of the check.
  const checkClickRef = useRef(0);
  useEffect(() => {
    if (drillStartTrackedRef.current) return;
    const uid = user?.uid;
    if (!uid) return;
    const seed = practiceState?.adaptiveQueueSeed;
    const enforcedDomain = seed?.enforcedDomain || null;
    // Adaptive sessions are always math today — the enforcedDomain is the
    // math domain (algebra / advanced-math / problem-solving / geometry).
    const section = enforcedDomain ? 'math' : null;
    const source = 'adaptive';
    const synthesizedWeakness = Array.isArray(seed?.missedPatterns) && seed.missedPatterns.length
      ? { missedPatterns: seed.missedPatterns, domain: enforcedDomain }
      : null;
    const decision = synthesizedWeakness
      ? decideTier({ weakSkills: [synthesizedWeakness] })
      : { tier: 'skill', matchedPatterns: [] };
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
  }, [user?.uid, drillPatternLabel, drillPatternSlug, practiceState?.adaptiveQueueSeed, questions]);

  // Key crossed-out choices by the stable question id, not the array index, so
  // a growing/reordered queue can't drag eliminations onto the wrong question.
  const currentElimKey = String(currentQuestion?.id ?? `idx-${idx}`);
  const eliminated = eliminatedChoices[currentElimKey] || [];

  // Context for the on-demand AI tutor (adaptive practice had no tutor before).
  // Mirrors the assigned shell so trap-coaching fires; only surfaces the
  // answer/choice once feedback is shown.
  const tutorRecorded = practiceState.answers[currentQuestion?.id];
  const tutorPracticeContext = {
    // Stable id for next-item-correctness telemetry (tutorExchangeTracker).
    questionId: currentQuestion?.id,
    question: currentQuestion?.question || '',
    choices: currentQuestion?.choices || [],
    hint: currentQuestion?.hint || '',
    answerRevealed: practiceState.showFeedback,
    correctAnswer: practiceState.showFeedback
      ? (currentQuestion?.type === 'fill-in'
          ? currentQuestion?.correctAnswer
          : currentQuestion?.choices?.find((c) => c.id === currentQuestion?.correctAnswer)?.text || currentQuestion?.correctAnswer)
      : undefined,
    explanation: practiceState.showFeedback ? (currentQuestion?.explanation || '') : '',
    isCorrect: practiceState.showFeedback ? tutorRecorded?.correct : undefined,
    selectedAnswer: practiceState.showFeedback && tutorRecorded?.selected
      ? (currentQuestion?.type === 'fill-in'
          ? tutorRecorded.selected
          : (currentQuestion?.choices?.find((c) => c.id === tutorRecorded.selected)?.text
              ? `${tutorRecorded.selected}) ${currentQuestion.choices.find((c) => c.id === tutorRecorded.selected).text}`
              : tutorRecorded.selected))
      : undefined,
    // Raw selected choice id (not the display string) — keys the explicit
    // misconception injection in AiTutorChat's buildPracticeContext.
    userAnswer: practiceState.showFeedback ? tutorRecorded?.selected : undefined,
    skills: currentQuestion?.skills || (currentQuestion?.skill ? [currentQuestion.skill] : []),
    section: currentQuestion?.section || 'math',
    domain: currentQuestion?.domain,
    passage: currentQuestion?.passage,
    passages: currentQuestion?.passages,
    studentNotes: currentQuestion?.studentNotes,
    questionTable: currentQuestion?.questionTable,
  };

  const handleNavigate = (targetIdx) => {
    if (targetIdx >= 0 && targetIdx < totalServed) {
      const q = questions[targetIdx];
      const hasAnswer = !!practiceState.answers[q?.id];
      // Allow stepping forward to the frontier (the immediate next served tile)
      // once the current question is answered — otherwise that tile is a dead
      // click. Backward + answered tiles stay freely navigable.
      const currentAnswered = !!practiceState.answers[currentQuestion?.id];
      const isFrontier = targetIdx === idx + 1 && currentAnswered;
      if (hasAnswer || targetIdx <= idx || isFrontier) {
        onNavigateToQuestion(targetIdx);
      }
    }
  };

  const handleToggleMark = () => {
    setMarkedForReview(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleToggleEliminate = (choiceId) => {
    setEliminatedChoices(prev => {
      const key = currentElimKey;
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(choiceId)
          ? current.filter(c => c !== choiceId)
          : [...current, choiceId],
      };
    });
  };

  const isMarked = markedForReview.includes(idx);

  // Flag-a-question: persistent bookmark entry for the current adaptive item.
  // Adaptive sessions are math-only today; pull skill/domain off the question.
  const seedDomain = practiceState?.adaptiveQueueSeed?.enforcedDomain || null;
  const currentFlagEntry = currentQuestion ? {
    questionId: currentQuestion.id,
    section: currentQuestion.section === 'rw' ? 'rw' : 'math',
    source: 'adaptive',
    skillId: (Array.isArray(currentQuestion.skills) ? currentQuestion.skills[0] : currentQuestion.skill) || null,
    domain: currentQuestion.domain || seedDomain || null,
    missedPatterns: Array.isArray(practiceState?.adaptiveQueueSeed?.missedPatterns)
      ? practiceState.adaptiveQueueSeed.missedPatterns : null,
    snippet: typeof currentQuestion.question === 'string'
      ? currentQuestion.question
      : (currentQuestion.stem || null),
  } : null;
  const isCurrentFlagged = !!(currentFlagEntry && flaggedQuestions[flagKeyFor(currentFlagEntry)]);

  if (isSessionComplete) {
    const answeredEntries = Object.values(practiceState.answers);
    const total = answeredEntries.length;
    const correct = answeredEntries.filter(a => a.correct).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
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

    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', padding: 0, fontSize: '14px',
          color: C.brand, cursor: 'pointer', display: 'flex', alignItems: 'center',
          gap: '6px', marginBottom: '48px', fontWeight: '500',
        }}>
          ← Back to Study Plan
        </button>

        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: isGood ? C.successBg : isOkay ? C.warningBg : C.errorBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 32px',
        }}>
          <span style={{ fontSize: '48px', fontWeight: '700', color: isGood ? C.success : isOkay ? C.warning : C.error }}>{correct}</span>
          <span style={{ fontSize: '24px', color: C.textSec }}>/{total}</span>
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: '700', color: C.text, marginBottom: '12px', textAlign: 'center' }}>
          {isGood ? 'Excellent!' : isOkay ? 'Good effort!' : 'Keep practicing!'}
        </h2>
        <p style={{ fontSize: '16px', color: C.textSec, marginBottom: '16px', textAlign: 'center' }}>
          You got {correct} out of {total} questions correct ({pct}%)
        </p>

        {practiceState.adaptiveCompletion && (
          <div style={{
            background: practiceState.adaptiveCompletion.isComplete ? C.successBg : C.warningBg,
            borderRadius: '12px', padding: '14px 20px', marginBottom: '24px',
            border: `1px solid ${practiceState.adaptiveCompletion.isComplete ? 'var(--color-brand-green-border)' : 'var(--color-warning-300, #FCD34D)'}`,
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: practiceState.adaptiveCompletion.isComplete ? C.success : C.warning, marginBottom: '6px' }}>
              {practiceState.adaptiveCompletion.isComplete ? 'Assignment Complete' : 'Assignment In Progress'}
            </div>
            <div style={{ fontSize: '12px', color: C.textSec, lineHeight: '1.5' }}>
              Target: {practiceState.adaptiveCompletion.answeredCount}/{practiceState.adaptiveCompletion.targetQuestions} questions
              {practiceState.adaptiveCompletion.meetsTarget ? ' (met)' : ''} &middot; Mastery: {practiceState.adaptiveCompletion.mastery}%/{practiceState.adaptiveCompletion.minMasteryPercent}%
              {practiceState.adaptiveCompletion.meetsMastery ? ' (met)' : ''}
            </div>
          </div>
        )}

        {/* Difficulty breakdown */}
        <div style={{ background: C.bg, borderRadius: '16px', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: C.textSec, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>By Difficulty</h3>
          {[
            { key: 'easy', label: 'Easy', color: C.success, bg: C.successBg },
            { key: 'medium', label: 'Medium', color: C.warning, bg: C.warningBg },
            { key: 'hard', label: 'Hard', color: C.error, bg: C.errorBg },
          ].map(({ key, label, color, bg }) => {
            const s = difficultyStats[key];
            if (s.total === 0) return null;
            const p = Math.round((s.correct / s.total) * 100);
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '10px', background: bg, color, width: '70px', textAlign: 'center' }}>{label}</span>
                <div style={{ flex: 1, marginLeft: '16px', marginRight: '12px' }}>
                  <div style={{ height: '8px', background: 'var(--color-slate-200)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p}%`, background: color, borderRadius: '4px', transition: 'width 0.3s' }} />
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-slate-700)', minWidth: '80px', textAlign: 'right' }}>{s.correct}/{s.total} ({p}%)</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={onRelaunch} style={{
            padding: '16px 32px', borderRadius: '12px', border: `2px solid ${C.brand}`,
            background: C.white, color: C.brand, fontSize: '16px', fontWeight: '600', cursor: 'pointer',
          }}>
            {practiceState.adaptiveCompletion?.isComplete ? 'New Session' : 'Continue Practice'}
          </button>
          <button onClick={onBack} style={{
            padding: '16px 32px', borderRadius: '12px', border: 'none',
            background: C.brand, color: C.white, fontSize: '16px', fontWeight: '600', cursor: 'pointer',
          }}>
            Back to Study Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 'calc(100vh - 120px)' }}>
      {/* ── TOP BAR ──────────────────────────────────────────────── */}
      <div style={{
        background: C.dark, color: C.white, padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderRadius: '12px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
            fontSize: '14px', fontWeight: '500', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            ← Exit
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: '600' }}>{headerTitle}</span>
            {drillPatternLabel && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
                title="The adaptive pool is biased toward this SAT Pattern based on your study plan."
              >
                <TargetIcon size={13} aria-hidden="true" />
                Practicing: {drillPatternLabel}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            Q {idx + 1} of {totalServed}
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            {answeredCount}/{targetCount} answered
          </span>
          <span style={{
            fontSize: '12px', fontWeight: '700',
            padding: '3px 10px', borderRadius: '12px',
            background: mastery >= minMastery ? 'rgba(198,244,50,0.2)' : 'rgba(255,255,255,0.1)',
            color: mastery >= minMastery ? 'var(--color-brand-green)' : 'rgba(255,255,255,0.8)',
          }}>
            {mastery}% mastery
          </span>
          <button onClick={() => setShowGrid(g => !g)} style={{
            background: showGrid ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
            padding: '6px 10px', cursor: 'pointer', color: C.white,
            fontSize: '12px', fontWeight: '600',
          }}>
            {showGrid ? 'Hide Grid' : 'Grid'}
          </button>
          {/* Calculator is Math-only — not offered on R&W in the digital SAT. */}
          {currentQuestion?.section !== 'rw' && (
            <button onClick={onToggleCalculator} style={{
              background: showCalculator ? 'var(--color-brand-purple-deep)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
              padding: '6px 10px', cursor: 'pointer', color: C.white,
              fontSize: '12px', fontWeight: '600',
            }}>
              Calculator
            </button>
          )}
          {onToggleFlag && currentFlagEntry && (
            <button
              type="button"
              onClick={() => onToggleFlag(currentFlagEntry)}
              aria-pressed={isCurrentFlagged}
              aria-label={isCurrentFlagged ? 'Remove this question from your review list' : 'Flag this question to review later'}
              title={isCurrentFlagged ? 'Flagged for review — click to remove' : 'Flag to review later'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                background: isCurrentFlagged ? 'rgba(234,88,12,0.18)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${isCurrentFlagged ? 'rgba(234,88,12,0.55)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '6px', padding: '6px 10px', cursor: 'pointer',
                color: isCurrentFlagged ? '#F2733F' : C.white,
                fontSize: '12px', fontWeight: '600',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill={isCurrentFlagged ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {isCurrentFlagged ? 'Flagged' : 'Flag'}
            </button>
          )}
          <button onClick={() => setTutorOpen(true)} style={{
            background: tutorOpen ? 'var(--color-brand-purple-deep)' : 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
            padding: '6px 10px', cursor: 'pointer', color: C.white,
            fontSize: '12px', fontWeight: '600',
          }}>
            Ask SEVA
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '12px', padding: '0 4px' }}>
        <ProgressBar answered={answeredCount} target={targetCount} mastery={mastery} minMastery={minMastery} isComplete={false} />
      </div>

      {/* Question Grid (collapsible) */}
      {showGrid && (
        <div style={{
          background: C.bg, borderRadius: '12px', padding: '16px',
          marginBottom: '16px', border: `1px solid ${C.border}`,
        }}>
          <QuestionGrid
            questions={questions}
            currentIndex={idx}
            answers={practiceState.answers}
            markedForReview={markedForReview}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* ── MAIN WORKSPACE ──────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', gap: '24px', minHeight: 0 }}>

        {/* Left: Question Panel */}
        <div style={{
          flex: '1 1 55%', background: C.white, borderRadius: '16px',
          border: `1px solid ${C.border}`, padding: '32px',
          overflow: 'auto', display: 'flex', flexDirection: 'column',
        }}>
          {/* Question header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: C.textSec }}>
                Question {idx + 1}
              </span>
              {diffBadge && (
                <span style={{
                  fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px',
                  background: diffBadge.color === '#10b981' ? C.successBg : diffBadge.color === '#f59e0b' ? C.warningBg : C.errorBg,
                  color: diffBadge.color,
                }}>
                  {diffBadge.label}
                </span>
              )}
              {sessionState?.currentDifficulty && (
                <span style={{ fontSize: '11px', color: C.textMuted }}>
                  Adaptive: {sessionState.currentDifficulty}
                </span>
              )}
            </div>
            <button onClick={handleToggleMark} style={{
              background: isMarked ? C.warningBg : 'transparent',
              border: `1px solid ${isMarked ? C.warning : C.border}`,
              borderRadius: '6px', padding: '5px 10px', cursor: 'pointer',
              fontSize: '11px', fontWeight: '600', color: isMarked ? C.warning : C.textSec,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={isMarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {isMarked ? 'Flagged' : 'Flag'}
            </button>
          </div>

          {/* Diagram */}
          {currentQuestion.diagram && (
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <QuestionDiagram type={currentQuestion.diagram.type} params={currentQuestion.diagram.params} />
            </div>
          )}

          {/* Question table */}
          {currentQuestion.questionTable && (
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
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

          {/* Question text */}
          <div style={{ fontSize: '17px', fontWeight: '500', color: C.text, lineHeight: '1.6', marginBottom: '24px' }}>
            {Array.isArray(currentQuestion.question) || (currentQuestion.question && typeof currentQuestion.question === 'object')
              ? <QuestionRenderer content={currentQuestion.question} />
              : <MathText>{currentQuestion.question}</MathText>
            }
          </div>

          {/* Formula */}
          {currentQuestion.questionFormula && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px', fontSize: '20px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: C.text,
            }}>
              {currentQuestion.questionFormula.text}
              {currentQuestion.questionFormula.fraction && (
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginLeft: currentQuestion.questionFormula.text ? '4px' : '0' }}>
                  <span style={{ padding: '0 6px' }}>{currentQuestion.questionFormula.fraction.numerator}</span>
                  <span style={{ width: '100%', height: '2px', background: C.text, margin: '2px 0' }} />
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
            <div style={{ fontSize: '16px', color: C.text, lineHeight: '1.6', marginBottom: '20px' }}>
              {Array.isArray(currentQuestion.questionContinued) || (typeof currentQuestion.questionContinued === 'object')
                ? <QuestionRenderer content={currentQuestion.questionContinued} />
                : <MathText>{currentQuestion.questionContinued}</MathText>
              }
            </div>
          )}
        </div>

        {/* Right: Answer Panel */}
        <div style={{
          flex: '1 1 45%', display: 'flex', flexDirection: 'column',
          background: C.white, borderRadius: '16px',
          border: `1px solid ${C.border}`, padding: '32px', overflow: 'auto',
        }}>
          {/* Answer choices */}
          <div style={{ flex: 1 }}>
            {currentQuestion.choices?.map((choice) => {
              const isSelected = practiceState.selectedAnswer === choice.id;
              const isCorrect = choice.id === currentQuestion.correctAnswer;
              const showResult = practiceState.showFeedback;
              const isEliminated = eliminated.includes(choice.id);

              let borderColor = C.border;
              let bgColor = C.white;

              if (showResult) {
                if (isCorrect) { borderColor = C.success; bgColor = C.successBg; }
                else if (isSelected && !isCorrect) { borderColor = C.error; bgColor = C.errorBg; }
              } else if (isSelected && !isEliminated) {
                borderColor = C.brand; bgColor = C.brandLight;
              }

              return (
                <div
                  key={choice.id}
                  onClick={() => !showResult && !isEliminated && onSelectAnswer(choice.id)}
                  style={{
                    padding: '14px 18px', borderRadius: '10px',
                    border: `2px solid ${borderColor}`, background: bgColor,
                    cursor: showResult || isEliminated ? 'default' : 'pointer',
                    marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px',
                    transition: 'all 0.15s', opacity: isEliminated && !showResult ? 0.4 : 1,
                    textDecoration: isEliminated && !showResult ? 'line-through' : 'none',
                    position: 'relative',
                  }}
                >
                  {/* Eliminate button */}
                  {!showResult && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleEliminate(choice.id); }}
                      title={isEliminated ? 'Undo cross-out' : 'Cross out'}
                      style={{
                        position: 'absolute', top: '6px', right: '6px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: isEliminated ? C.error : C.textMuted, fontSize: '10px', padding: '2px',
                        opacity: 0.6,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="2" y1="2" x2="10" y2="10" />
                        <line x1="10" y1="2" x2="2" y2="10" />
                      </svg>
                    </button>
                  )}

                  <span style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: showResult
                      ? (isCorrect ? C.success : isSelected ? C.error : 'var(--color-slate-100)')
                      : (isSelected && !isEliminated ? C.brand : 'var(--color-slate-100)'),
                    color: (showResult && (isCorrect || isSelected)) || (isSelected && !isEliminated) ? C.white : C.textSec,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '700', flexShrink: 0,
                  }}>
                    {showResult && isCorrect ? '✓' : showResult && isSelected && !isCorrect ? '✗' : choice.id}
                  </span>
                  <span style={{ fontSize: '15px', color: C.text, display: 'flex', alignItems: 'center', flex: 1 }}>
                    {choice.table ? (
                      <table style={{ borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                          <tr>
                            {choice.table.headers.map((h, i) => (
                              <th key={i} style={{
                                border: `1px solid ${C.border}`, padding: '4px 12px',
                                background: 'var(--color-slate-100)', fontWeight: '600', fontStyle: 'italic'
                              }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {choice.table.rows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td key={j} style={{
                                  border: `1px solid ${C.border}`, padding: '4px 12px', textAlign: 'center'
                                }}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : choice.fraction ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {choice.text && <MathText>{choice.text}</MathText>}
                        <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginLeft: choice.text ? '4px' : '0', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                          <span style={{ padding: '0 4px' }}>{choice.fraction.numerator}</span>
                          <span style={{ width: '100%', height: '1px', background: C.text, margin: '2px 0' }} />
                          <span style={{ padding: '0 4px' }}>{choice.fraction.denominator}</span>
                        </span>
                        {choice.textAfter && <span style={{ marginLeft: '4px' }}>{choice.textAfter}</span>}
                      </span>
                    ) : Array.isArray(choice.text) || (choice.text && typeof choice.text === 'object') ? (
                      <QuestionRenderer content={choice.text} />
                    ) : (
                      <MathText>{choice.text || ''}</MathText>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hint */}
          {currentQuestion.hint && !practiceState.showFeedback && (
            <div style={{ marginBottom: '12px' }}>
              {!practiceState.showHint ? (
                <button onClick={onShowHint} style={{
                  background: 'none', border: `1px solid ${C.border}`, borderRadius: '8px',
                  padding: '8px 14px', fontSize: '13px', fontWeight: '500', color: C.textSec,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Hint
                </button>
              ) : (
                <div style={{ background: 'var(--color-brand-purple-soft)', borderRadius: '10px', padding: '14px 18px', borderLeft: '3px solid var(--color-brand-purple-border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-brand-purple-text)', marginBottom: '6px' }}>Hint</div>
                  <p style={{ fontSize: '14px', color: C.text, lineHeight: 1.5, margin: 0 }}>{currentQuestion.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback / explanation */}
          {practiceState.showFeedback && (
            <div style={{
              background: practiceState.answers[currentQuestion.id]?.correct ? C.successBg : C.errorBg,
              borderRadius: '10px', padding: '18px', marginBottom: '12px',
              borderLeft: `3px solid ${practiceState.answers[currentQuestion.id]?.correct ? C.success : C.error}`,
            }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: practiceState.answers[currentQuestion.id]?.correct ? C.success : C.error, marginBottom: '8px' }}>
                {practiceState.answers[currentQuestion.id]?.correct ? 'Correct!' : 'Incorrect'}
              </div>
              <SolutionExplanation explanation={currentQuestion.explanation} />

              {/* Desmos route — the calculator play for this question family (math only) */}
              {(() => {
                const tip = getDesmosTip(currentQuestion);
                if (!tip) return null;
                return (
                  <div style={{ marginTop: '12px', background: 'var(--color-slate-100)', borderRadius: '10px', padding: '12px 16px', borderLeft: '3px solid var(--color-slate-600)' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-slate-600)', marginBottom: '4px' }}>
                      Desmos route — {tip.name} ({tip.timeEstimate})
                    </div>
                    <p style={{ fontSize: '14px', color: C.text, lineHeight: 1.5, margin: 0 }}>{tip.technique}</p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Action buttons */}
          {!practiceState.showFeedback ? (
            <button
              onClick={() => { checkClickRef.current = Date.now(); onCheckAnswer(currentQuestion); }}
              disabled={!practiceState.selectedAnswer}
              style={{
                width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                background: practiceState.selectedAnswer ? C.brand : 'var(--color-slate-200)',
                color: C.white, fontSize: '15px', fontWeight: '600',
                cursor: practiceState.selectedAnswer ? 'pointer' : 'default',
              }}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={() => { if (Date.now() - checkClickRef.current < 350) return; onNextQuestion(questions); }}
              style={{
                width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                background: C.brand, color: C.white, fontSize: '15px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Next Question →
            </button>
          )}
        </div>
      </div>

      {/* ── BOTTOM NAV BAR ──────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 0', marginTop: '12px',
        borderTop: `1px solid ${C.border}`,
      }}>
        <button
          onClick={() => handleNavigate(idx - 1)}
          disabled={idx === 0}
          style={{
            padding: '8px 18px', borderRadius: '8px',
            border: `1px solid ${C.border}`,
            background: idx === 0 ? C.bg : C.white,
            color: idx === 0 ? C.textMuted : C.textSec,
            fontSize: '13px', fontWeight: '600', cursor: idx === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Previous
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={handleToggleMark} style={{
            padding: '8px 14px', borderRadius: '8px',
            background: isMarked ? C.warningBg : 'transparent',
            border: `1px solid ${isMarked ? C.warning : C.border}`,
            fontSize: '12px', fontWeight: '600', color: isMarked ? C.warning : C.textSec,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill={isMarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            Come Back Later
          </button>
        </div>

        <button
          onClick={() => {
            if (practiceState.showFeedback) {
              onNextQuestion(questions);
            } else if (idx < totalServed - 1) {
              handleNavigate(idx + 1);
            }
          }}
          disabled={!practiceState.showFeedback && idx >= totalServed - 1}
          style={{
            padding: '8px 18px', borderRadius: '8px', border: 'none',
            background: practiceState.showFeedback ? C.brand : (idx < totalServed - 1 ? C.brand : 'var(--color-slate-200)'),
            color: C.white, fontSize: '13px', fontWeight: '600',
            cursor: (!practiceState.showFeedback && idx >= totalServed - 1) ? 'not-allowed' : 'pointer',
          }}
        >
          {practiceState.showFeedback ? 'Next Question →' : 'Next →'}
        </button>
      </div>

      {/* On-demand AI tutor — a fixed overlay panel (additive; doesn't touch the
          single-column layout). Closes the gap where adaptive practice had no
          tutor at all. The tutor itself can expand to full screen on mobile. */}
      {tutorOpen && (
        <>
          <div onClick={() => setTutorOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1500 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)', zIndex: 1600, background: '#fff', boxShadow: '-8px 0 32px -8px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>
            <AiTutorChat
              // Remount per question so an in-flight answer for the previous
              // question can never land in (and persist under) this one's chat.
              key={`adaptive-tutor-${currentQuestion?.id || idx}`}
              isOpen={true}
              onClose={() => setTutorOpen(false)}
              moduleId="adaptive-practice"
              lessonId={`adaptive-${currentQuestion?.id || idx}`}
              lessonTitle={headerTitle}
              isVideoLesson={false}
              isPracticeQuestion={true}
              practiceContext={tutorPracticeContext}
              embedded={true}
              headerCompact={true}
              standalone={false}
              skillProgress={skillProgress}
              testDate={user?.testDate}
              user={user}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdaptivePracticeShell;
