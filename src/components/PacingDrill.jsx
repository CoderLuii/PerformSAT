/**
 * PacingDrill — the timed runner for pacingService's three modes.
 *
 *   speed_rounds     : per-question countdown (60s), auto-advance on answer or expiry.
 *   checkpoint_pacing: one cumulative countdown + checkpoint banners at Q4/8/11.
 *   last_8_min       : cumulative countdown, triage framing.
 *
 * The point is time PRESSURE, so the rhythm is fast: pick a choice -> brief
 * correct/incorrect flash -> next. On finish it grades via evaluatePacingSession
 * and shows an A/B/C summary. Wall-clock timing reuses timerClock (no drift).
 *
 * Look (2026-08-22, founder: "everything should look like the official
 * test-taking experience, like in our practice tests"): the drill wears the
 * SEVA Test chrome from PracticeTest.css — navy header with the tri-color
 * wordmark and the timer pill, cream canvas, white question card, Bluebook
 * answer choices with cross-out, the test's bottom bar — exactly as the
 * diagnostic check-in did before it (MiniDiagnosticShell). PacingDrill.css
 * holds the single-column adaptations, scoped under .pacing-shell. The
 * timing/grading logic is unchanged.
 *
 * Self-contained: App sources the questions + the mode config and renders this;
 * onComplete(summary, results) is for analytics, onExit returns to the dashboard.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MathText } from './MathText';
import QuestionRenderer from './QuestionRenderer';
import AnswerChoiceList from './shared/AnswerChoiceList';
import { evaluatePacingSession } from '../services/pacingService';
import { deriveDeadline, computeRemaining } from '../services/timerClock';
import './PracticeTest.css';
import './PacingDrill.css';

const RESULT_FLASH_MS = 800;

const fmtTime = (secs) => {
  const s = Math.max(0, Math.round(secs));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

const PacingDrill = ({ config = {}, questions = [], onComplete, onExit, user = null }) => {
  const total = questions.length;
  const isPerQuestion = !!config.showTimerPerQuestion;
  const perQ = config.timePerQuestion || 60;
  const sessionSeconds = config.totalTimeSeconds || (isPerQuestion ? perQ * Math.max(1, total) : 600);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [eliminated, setEliminated] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [remaining, setRemaining] = useState(isPerQuestion ? perQ : sessionSeconds);
  const [phase, setPhase] = useState('running'); // 'running' | 'done'
  const [summary, setSummary] = useState(null);
  const [checkpointMsg, setCheckpointMsg] = useState(null);

  // Refs the tick loop reads (avoids stale closures without re-creating the interval).
  const indexRef = useRef(0);
  const phaseRef = useRef('running');
  const answeredRef = useRef(false);
  const resultsRef = useRef([]);
  const deadlineRef = useRef(deriveDeadline(isPerQuestion ? perQ : sessionSeconds, Date.now()));
  const qStartRef = useRef(Date.now());
  const advanceTimer = useRef(null);
  const checkpointTimer = useRef(null);

  const finish = useCallback(() => {
    if (phaseRef.current === 'done') return;
    phaseRef.current = 'done';
    // Unanswered questions (ran out of time) count as wrong attempts.
    const padded = [...resultsRef.current];
    while (padded.length < total) padded.push({ wasCorrect: false, timeSpent: 0 });
    const result = evaluatePacingSession(config, padded);
    setSummary(result);
    setPhase('done');
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    try { onComplete?.(result, padded); } catch (e) { console.error('[PacingDrill] onComplete error:', e); }
  }, [config, total, onComplete]);

  const advance = useCallback(() => {
    if (advanceTimer.current) { clearTimeout(advanceTimer.current); advanceTimer.current = null; }
    const next = indexRef.current + 1;
    if (next >= total) { finish(); return; }
    indexRef.current = next;
    answeredRef.current = false;
    qStartRef.current = Date.now();
    if (isPerQuestion) deadlineRef.current = deriveDeadline(perQ, Date.now());
    setIndex(next);
    setSelected(null);
    setEliminated([]);
    setShowResult(false);
    // Checkpoint banner (checkpoint_pacing): config.checkpoints are 1-indexed question numbers.
    if (Array.isArray(config.checkpoints) && config.checkpoints.includes(next + 1)) {
      setCheckpointMsg(`Checkpoint: question ${next + 1}. Stay on pace.`);
      if (checkpointTimer.current) clearTimeout(checkpointTimer.current);
      checkpointTimer.current = setTimeout(() => setCheckpointMsg(null), 3000);
    }
  }, [total, isPerQuestion, perQ, config.checkpoints, finish]);

  const record = useCallback((wasCorrect, timeSpent) => {
    if (answeredRef.current) return;
    answeredRef.current = true;
    resultsRef.current = [...resultsRef.current, { wasCorrect, timeSpent }];
  }, []);

  const handleSelect = useCallback((choiceId) => {
    if (answeredRef.current || phaseRef.current !== 'running') return;
    const q = questions[indexRef.current];
    const wasCorrect = choiceId === q?.correctAnswer;
    const timeSpent = Math.round((Date.now() - qStartRef.current) / 1000);
    record(wasCorrect, timeSpent);
    setSelected(choiceId);
    setShowResult(true);
    advanceTimer.current = setTimeout(advance, RESULT_FLASH_MS);
  }, [questions, record, advance]);

  // Bluebook cross-out (eliminate a choice) — display-only, per question.
  const handleToggleEliminate = useCallback((choiceId) => {
    if (answeredRef.current || phaseRef.current !== 'running') return;
    setEliminated((prev) => (prev.includes(choiceId) ? prev.filter((id) => id !== choiceId) : [...prev, choiceId]));
  }, []);

  // Single tick loop: drives the countdown + expiry for both timer styles.
  useEffect(() => {
    const id = setInterval(() => {
      if (phaseRef.current !== 'running') return;
      const { remainingSeconds, isUp } = computeRemaining({ deadlineTs: deadlineRef.current, nowTs: Date.now() });
      setRemaining(remainingSeconds);
      if (!isUp) return;
      if (isPerQuestion) {
        // Per-question expiry: mark unanswered as wrong, then advance behind the
        // same brief flash as a manual answer (handleSelect) instead of jumping
        // instantly. Schedule once: advance() nulls advanceTimer when it runs, so
        // the guard stops later ticks (still firing every 250ms past the deadline)
        // from re-scheduling and deferring the advance forever.
        if (!answeredRef.current) { record(false, perQ); setShowResult(true); }
        if (!advanceTimer.current) advanceTimer.current = setTimeout(advance, RESULT_FLASH_MS);
      } else {
        finish(); // cumulative budget exhausted
      }
    }, 250);
    // Only tear down the interval here. The advance/checkpoint timeouts are NOT
    // owned by this effect: `advance`/`finish` change identity on every parent
    // render (onComplete is an inline prop), so this effect re-runs constantly —
    // clearing the pending advance timer on a re-run cancels an in-flight
    // answer-flash advance, and in cumulative modes nothing reschedules it
    // (the drill would freeze on the current question).
    return () => { clearInterval(id); };
  }, [isPerQuestion, perQ, record, advance, finish]);

  // Unmount-only cleanup for the pending advance/checkpoint timeouts (prevents a
  // setState-after-unmount without cancelling advances on benign effect re-runs).
  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (checkpointTimer.current) clearTimeout(checkpointTimer.current);
  }, []);

  // ── Shared chrome pieces ───────────────────────────────────────────────
  const Header = ({ subtitle, right }) => (
    <div className="test-session-header">
      <div className="header-left">
        <span className="test-wordmark">
          <span className="wm-s">S</span><span className="wm-e">E</span><span className="wm-v">V</span><span className="wm-a">A</span>
        </span>
        <span className="test-session-divider" aria-hidden="true" />
        <span className="test-name-tag">Pacing</span>
      </div>
      <div className="header-center">
        <div className="header-title">{config.label || 'Pacing drill'}</div>
        {subtitle && <div className="header-subtitle">{subtitle}</div>}
      </div>
      <div className="header-right">{right}</div>
      <div className="test-session-progress" aria-hidden="true">
        <div className="test-session-progress-fill" style={{ width: `${total ? ((phase === 'done' ? total : index + 1) / total) * 100 : 0}%` }} />
      </div>
    </div>
  );

  const BottomBar = ({ center, right }) => (
    <div className="test-session-bottom-bar">
      <div className="bottom-bar-left">{user?.firstName || 'Student'}</div>
      <div className="bottom-bar-center">{center}</div>
      <div className="bottom-bar-right">{right}</div>
    </div>
  );

  if (!total) {
    return (
      <div className="test-session-shell pacing-shell" data-section="math">
        <Header />
        <div className="test-session-body">
          <div className="test-module-complete">
            <div className="test-module-complete-card">
              <div className="test-module-complete-eyebrow">Pacing</div>
              <h2 className="test-module-complete-title">No questions available right now</h2>
              <p className="test-module-complete-note">Take a practice test or a drill first — the pacing runner draws from questions at your level.</p>
              <button type="button" className="test-module-complete-cta" onClick={onExit}>Back to dashboard</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'done' && summary) {
    return (
      <div className="test-session-shell pacing-shell" data-section="math">
        <Header subtitle="Complete" />
        <div className="test-session-body">
          <div className="test-module-complete">
            <div className="test-module-complete-card pacing-summary">
              <div className="test-module-complete-eyebrow">{config.label} complete</div>
              <div className={`pacing-grade is-${(summary.grade || 'c').toLowerCase()}`}>{summary.grade}</div>
              <div className="pacing-stats">
                <Stat label="Accuracy" value={`${summary.accuracy}%`} />
                <Stat label="Avg / question" value={`${summary.avgTimePerQuestion}s`} />
                {summary.underBudget != null && (
                  <Stat label="Under budget" value={`${summary.underBudget}/${summary.total}`} />
                )}
              </div>
              <p className="test-module-complete-note">{summary.message}</p>
              <button type="button" className="test-module-complete-cta" onClick={onExit}>Done</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const lowTime = remaining <= 10;
  // The timer pill reads by function: ample = neutral, getting tight = warn,
  // critical = low (the test's own red). Threshold is the remaining fraction of
  // the budget (color only; timing logic above is untouched).
  const timerBudget = isPerQuestion ? perQ : sessionSeconds;
  const remainingFraction = remaining / Math.max(1, timerBudget);
  const timerClass = lowTime || remainingFraction <= 0.15
    ? 'is-low'
    : remainingFraction <= 0.4
      ? 'is-warn'
      : '';

  return (
    <div className="test-session-shell pacing-shell" data-section="math">
      <Header
        subtitle={`Question ${index + 1} of ${total}`}
        right={(
          <span
            role="timer"
            aria-label={`Time remaining ${fmtTime(remaining)}${isPerQuestion ? ' per question' : ''}`}
            className={`test-timer-pill ${timerClass}`}
          >
            {fmtTime(remaining)}{isPerQuestion ? <span className="pacing-timer-unit"> / question</span> : null}
          </span>
        )}
      />

      <div className="test-session-body">
        <div className="test-workspace-main">
          <div className="test-workspace-left">
            <div className="question-panel">
              {config.personalizedReason && index === 0 && !showResult && (
                <p className="pacing-note">{config.personalizedReason}</p>
              )}
              {checkpointMsg && (
                <div className="pacing-checkpoint" role="status">{checkpointMsg}</div>
              )}

              <div className="pacing-stem">
                {Array.isArray(q.question) || (q.question && typeof q.question === 'object')
                  ? <QuestionRenderer content={q.question} />
                  : <MathText>{q.question}</MathText>}
              </div>

              <AnswerChoiceList
                choices={q.choices || []}
                selectedId={selected}
                eliminatedIds={eliminated}
                showResult={showResult}
                correctId={q.correctAnswer}
                onSelect={handleSelect}
                onToggleEliminate={handleToggleEliminate}
                crossOut="bluebook"
              />
            </div>
          </div>
        </div>
      </div>

      <BottomBar
        center={<span className="question-grid-toggle pacing-qcount">Question {index + 1} of {total}</span>}
        right={<button type="button" className="bottom-nav-btn" onClick={onExit}>Exit drill</button>}
      />
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="pacing-stat">
    <div className="pacing-stat-value">{value}</div>
    <div className="pacing-stat-label">{label}</div>
  </div>
);

export default PacingDrill;
