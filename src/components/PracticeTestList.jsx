import { useState, useRef, useEffect } from 'react';
import { getAllPracticeTests } from '../data/practiceTests';
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, TimerIcon, CircleDotIcon, TargetIcon } from '../design/icons';
import { Modal } from './ui/Modal';
import { showToast } from './ui/Toaster';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { hasRealTestScore } from '../services/selectors/diagnosticVariant';
import './PracticeTestList.css';

// SAT section scores top out at 800; used for the section progress bars.
const SECTION_MAX = 800;

const fmtShortDate = (v) => {
  if (!v) return '';
  const d = v?.toDate?.() || new Date(v);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
const attemptDate = (result) => {
  const v = result?.lastAttemptAt;
  const d = v?.toDate?.() || new Date(v || 0);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};
// sectionScores is persisted PER ATTEMPT, not on the aggregate row — reading
// result.sectionScores was always null, so the section chips/bars never showed.
// Pick the attempt backing the displayed TOTAL (max scaledScore; newest
// completedAt as tiebreak — by score/date, not array position, since the
// attempts array orientation is not a stable contract).
const bestAttempt = (result) => {
  const attempts = Array.isArray(result?.attempts) ? result.attempts : [];
  return attempts.reduce((best, a) => {
    if (!a) return best;
    if (!best) return a;
    const as = a.scaledScore ?? -Infinity;
    const bs = best.scaledScore ?? -Infinity;
    if (as !== bs) return as > bs ? a : best;
    return new Date(a.completedAt || 0) >= new Date(best.completedAt || 0) ? a : best;
  }, null);
};
const sectionScore = (result, key) => {
  const best = bestAttempt(result);
  if (!best) return null;
  // bestScaledScore is a persisted monotonic max that can outlive its backing
  // attempt (trimAttempts keeps only the 5 newest). If the best RETAINED
  // attempt isn't the one driving the displayed TOTAL, suppress the section
  // chips rather than show numbers that won't sum to the TOTAL.
  if (typeof result?.bestScaledScore === 'number' && best.scaledScore !== result.bestScaledScore) {
    return null;
  }
  const s = best.sectionScores;
  return s && typeof s[key] === 'number' ? s[key] : null;
};

const PracticeTestList = ({
  user,
  practiceTestResults,
  onSelectTest,
  onBack,
  onSelectTestWithMode,
  getTestBestScore,
  getTestAttempts,
  inProgressTests,
  onResumeTest,
  onViewResults,
  // Opens a completed test's AI diagnosis (the screen shown right after a test).
  onViewDiagnosis: onViewTestDiagnosis,
  onResetTest,
  onDeleteAttempt,
  billingLocked = false,
  onSubscribe,
  // Completed diagnostic record (progress.miniDiagnostic). When present the
  // list leads with a Diagnostic card above #1 that re-opens the diagnosis.
  miniDiagnostic = null,
  onViewDiagnosis,
  // Sitting-snapshot load state ('idle'|'loading'|'ready'|'missing'|'error')
  // gating the card's "Review answers"; the handler opens the review runner.
  diagnosticReviewStatus = 'idle',
  onReviewDiagnosticQuestions,
  // Launches the diagnostic (the home "Take your diagnostic" path). While the
  // student is unmeasured — no diagnostic record, no scoreable full test —
  // the list leads with a "Diagnostic · Not taken yet" card so the diagnostic
  // is findable from the Tests page too, not only from Home.
  onStartDiagnostic,
}) => {
  const tests = getAllPracticeTests();
  const ffDiagnosticV2 = useFeatureFlag('diagnosticV2');
  const diagnosticOwed = !miniDiagnostic
    && typeof onStartDiagnostic === 'function'
    && !hasRealTestScore(practiceTestResults);
  // One open launch dropdown at a time, keyed by `${testId}:launch`.
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedTestId, setExpandedTestId] = useState(null);
  const [userToggled, setUserToggled] = useState(false);
  const dropdownRef = useRef(null);
  const [resetTarget, setResetTarget] = useState(null);
  const [resetting, setResetting] = useState(false);

  const closeResetModal = () => {
    if (resetting) return;
    setResetTarget(null);
  };

  const handleConfirmReset = async () => {
    if (!resetTarget || resetting) return;
    const { test, testNum } = resetTarget;
    setResetting(true);
    try {
      await onResetTest?.(test);
      showToast({ type: 'success', message: `Digital SAT #${testNum} has been reset.` });
      setResetTarget(null);
    } catch {
      showToast({ type: 'error', message: 'Could not reset the test. Please try again.' });
    } finally {
      setResetting(false);
    }
  };

  const [deleteAttemptTarget, setDeleteAttemptTarget] = useState(null);
  const [deletingAttempt, setDeletingAttempt] = useState(false);

  const closeDeleteAttemptModal = () => {
    if (deletingAttempt) return;
    setDeleteAttemptTarget(null);
  };

  const handleConfirmDeleteAttempt = async () => {
    if (!deleteAttemptTarget || deletingAttempt) return;
    const { test, attempt } = deleteAttemptTarget;
    setDeletingAttempt(true);
    try {
      await onDeleteAttempt?.(test.id, attempt.attemptId);
      showToast({ type: 'success', message: 'That attempt has been removed.' });
      setDeleteAttemptTarget(null);
    } catch {
      showToast({ type: 'error', message: 'Could not remove the attempt. Please try again.' });
    } finally {
      setDeletingAttempt(false);
    }
  };

  // Default-expand the most recently completed test (until the user toggles a card).
  useEffect(() => {
    if (userToggled || expandedTestId) return;
    const completed = tests
      .filter((t) => getTestBestScore?.(t.id) != null && !inProgressTests?.[t.id])
      .sort((a, b) => attemptDate(practiceTestResults?.[a.id]) - attemptDate(practiceTestResults?.[b.id]));
    if (completed.length) setExpandedTestId(completed[completed.length - 1].id);
  }, [tests, getTestBestScore, inProgressTests, practiceTestResults, userToggled, expandedTestId]);

  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  const toggleExpand = (id) => {
    setOpenDropdown(null);
    setUserToggled(true);
    setExpandedTestId((prev) => (prev === id ? null : id));
  };

  // ── Summary stats (latest score / completed / goal progress) ──────────
  const completedList = tests
    .map((t) => ({ id: t.id, score: getTestBestScore?.(t.id) ?? null, result: practiceTestResults?.[t.id] }))
    .filter((x) => x.score != null)
    .sort((a, b) => attemptDate(a.result) - attemptDate(b.result));
  const latestScore = completedList.length ? completedList[completedList.length - 1].score : null;
  const prevScore = completedList.length >= 2 ? completedList[completedList.length - 2].score : null;
  const scoreDelta = latestScore != null && prevScore != null ? latestScore - prevScore : null;
  const completedCount = completedList.length;
  const goal = typeof user?.targetScore === 'number' ? user.targetScore : null;
  const remaining = goal != null && latestScore != null ? goal - latestScore : null;
  const goalPct = goal && latestScore != null ? Math.max(4, Math.min(100, Math.round((latestScore / goal) * 100))) : 0;

  return (
    <div className="pt-screen" data-theme="light">
      <div className="pt-inner">
      <button type="button" className="pt-back" onClick={onBack}>
        <ArrowLeftIcon size={14} color="currentColor" /> Back to Dashboard
      </button>
      <h1 className="pt-title">Practice Tests</h1>
      <p className="pt-subtitle">Full-length digital SAT practice tests — Reading &amp; Writing, then Math.</p>

      {latestScore != null && (
        <div className="pt-summary">
          <div className="pt-summary-stat">
            <span className="pt-summary-num">{latestScore}</span>
            <span className="pt-summary-label">Latest score</span>
          </div>
          <div className="pt-summary-divider" aria-hidden="true" />
          <div className="pt-summary-stat">
            <span className="pt-summary-num">{completedCount}<small> / {tests.length}</small></span>
            <span className="pt-summary-label">Completed</span>
          </div>
          {goal != null && (
            <>
              <div className="pt-summary-divider" aria-hidden="true" />
              <div className="pt-summary-goal">
                <div className="pt-summary-goal-row">
                  <span className="pt-summary-goal-text">
                    {remaining > 0
                      ? <><strong>{remaining}</strong> points to your {goal} goal</>
                      : `You're at your ${goal} goal`}
                  </span>
                  {scoreDelta != null && scoreDelta !== 0 && (
                    <span className={`pt-summary-goal-delta${scoreDelta < 0 ? ' is-down' : ''}`}>
                      {scoreDelta > 0 ? '+' : ''}{scoreDelta} last test
                    </span>
                  )}
                </div>
                <div className="pt-summary-bar">
                  <div className="pt-summary-bar-fill" style={{ width: `${goalPct}%` }} />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="pt-list">
        {diagnosticOwed && (
          <DiagnosticPendingCard
            inProgress={!!inProgressTests?.['mini-diagnostic']}
            fullLength={ffDiagnosticV2}
            onStart={onStartDiagnostic}
          />
        )}
        {miniDiagnostic && typeof onViewDiagnosis === 'function' && (
          <DiagnosticCard
            record={miniDiagnostic}
            onView={onViewDiagnosis}
            reviewStatus={diagnosticReviewStatus}
            onReview={onReviewDiagnosticQuestions}
          />
        )}
        {tests.map((test, idx) => (
          <TestCard
            key={test.id}
            test={test}
            testNum={idx + 1}
            result={practiceTestResults?.[test.id]}
            bestScore={getTestBestScore?.(test.id) ?? null}
            attempts={getTestAttempts?.(test.id) ?? 0}
            inProgress={inProgressTests?.[test.id]}
            isExpanded={expandedTestId === test.id}
            onToggleExpand={() => toggleExpand(test.id)}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            dropdownRef={dropdownRef}
            onSelectTest={onSelectTest}
            onSelectTestWithMode={onSelectTestWithMode}
            onResumeTest={onResumeTest}
            onViewResults={onViewResults}
            onViewDiagnosis={onViewTestDiagnosis}
            onRequestReset={onResetTest ? () => setResetTarget({ test, testNum: idx + 1, inProgress: !!inProgressTests?.[test.id] }) : undefined}
            onRequestDeleteAttempt={onDeleteAttempt ? (attempt) => setDeleteAttemptTarget({ test, testNum: idx + 1, attempt }) : undefined}
            billingLocked={billingLocked}
            onSubscribe={onSubscribe}
          />
        ))}
      </div>

      </div>{/* /.pt-inner */}

      <Modal
        isOpen={!!resetTarget}
        onClose={closeResetModal}
        disabled={resetting}
        title="Reset this test?"
        maxWidth="440px"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={closeResetModal}
              disabled={resetting}
              style={{
                padding: '9px 16px', background: 'var(--color-white)', border: '1px solid var(--color-slate-300)',
                borderRadius: 'var(--radius-md)', color: 'var(--color-slate-600)', fontSize: '14px', fontWeight: 600,
                cursor: resetting ? 'default' : 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReset}
              disabled={resetting}
              style={{
                padding: '9px 16px', background: 'var(--color-error-600)', border: 'none',
                borderRadius: 'var(--radius-md)', color: 'var(--color-white)', fontSize: '14px', fontWeight: 700,
                cursor: resetting ? 'default' : 'pointer', opacity: resetting ? 0.7 : 1,
              }}
            >
              {resetting ? 'Resetting…' : 'Reset test'}
            </button>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--color-slate-600)' }}>
          {resetTarget?.inProgress ? (
            <>This discards your saved progress for{' '}
            <strong style={{ color: 'var(--color-slate-900)' }}>Digital SAT #{resetTarget?.testNum}</strong>
            {' '}— as if you never started it. You&rsquo;ll begin again from question 1. Your other tests aren&rsquo;t affected, and this can&rsquo;t be undone.</>
          ) : (
            <>This permanently erases your scores, attempt history, and saved progress for{' '}
            <strong style={{ color: 'var(--color-slate-900)' }}>Digital SAT #{resetTarget?.testNum}</strong>
            {' '}— as if you never took it. Your other tests aren&rsquo;t affected, and this can&rsquo;t be undone.</>
          )}
        </p>
      </Modal>

      <Modal
        isOpen={!!deleteAttemptTarget}
        onClose={closeDeleteAttemptModal}
        disabled={deletingAttempt}
        title="Delete this attempt?"
        maxWidth="440px"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={closeDeleteAttemptModal}
              disabled={deletingAttempt}
              style={{
                padding: '9px 16px', background: 'var(--color-white)', border: '1px solid var(--color-slate-300)',
                borderRadius: 'var(--radius-md)', color: 'var(--color-slate-600)', fontSize: '14px', fontWeight: 600,
                cursor: deletingAttempt ? 'default' : 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDeleteAttempt}
              disabled={deletingAttempt}
              style={{
                padding: '9px 16px', background: 'var(--color-error-600)', border: 'none',
                borderRadius: 'var(--radius-md)', color: 'var(--color-white)', fontSize: '14px', fontWeight: 700,
                cursor: deletingAttempt ? 'default' : 'pointer', opacity: deletingAttempt ? 0.7 : 1,
              }}
            >
              {deletingAttempt ? 'Deleting…' : 'Delete attempt'}
            </button>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--color-slate-600)' }}>
          This removes the{' '}
          <strong style={{ color: 'var(--color-slate-900)' }}>
            {typeof deleteAttemptTarget?.attempt?.scaledScore === 'number' ? deleteAttemptTarget.attempt.scaledScore : ''}
          </strong>
          {' '}attempt on <strong style={{ color: 'var(--color-slate-900)' }}>Digital SAT #{deleteAttemptTarget?.testNum}</strong>.
          Your best score, review, and study plan will reflect your remaining attempts. Your other attempts and tests aren&rsquo;t affected, and this can&rsquo;t be undone.
        </p>
      </Modal>
    </div>
  );
};

const LaunchMenu = ({ totalTime, onPick, up }) => (
  <div className={`pt-dropdown${up ? ' opens-up' : ''}`}>
    <button type="button" className="pt-dropdown-btn" onClick={() => onPick(true)}>
      <TimerIcon size={16} color="var(--sp-text-2)" /> Timed
      <span className="pt-dropdown-hint">~{totalTime}m</span>
    </button>
    <button type="button" className="pt-dropdown-btn" onClick={() => onPick(false)}>
      <CircleDotIcon size={16} color="var(--sp-text-2)" /> Untimed
      <span className="pt-dropdown-hint">No limit</span>
    </button>
  </div>
);

/**
 * The diagnostic the student still owes, listed above Digital SAT #1 until a
 * sitting completes (then DiagnosticCard takes the slot). One action: take
 * it — or resume it when a sitting is saved mid-way.
 */
const DiagnosticPendingCard = ({ inProgress = false, fullLength = true, onStart }) => {
  const meta = fullLength
    ? 'Adaptive · 40 questions · about half a full test · builds your study plan'
    : 'Adaptive · 24 questions · about 15 minutes · builds your study plan';
  return (
    <div className="pt-card is-diagnostic">
      <div className="pt-card-row">
        <span className="pt-badge is-diagnostic" aria-hidden="true">
          <TargetIcon size={20} color="currentColor" />
        </span>
        <div className="pt-card-main">
          <div className="pt-card-titlerow">
            <span className="pt-card-title">Diagnostic</span>
            <span className={`pt-pill ${inProgress ? 'is-progress' : 'is-notstarted'}`}>{inProgress ? 'In progress' : 'Not taken yet'}</span>
          </div>
          <div className="pt-card-meta">{meta}</div>
        </div>
        <div className="pt-diag-actions">
          <button type="button" className="pt-btn is-primary" onClick={onStart}>
            {inProgress ? 'Resume diagnostic' : 'Take diagnostic'} <ArrowRightIcon size={16} color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * The student's diagnostic sitting, listed above Digital SAT #1. It is a
 * different kind of test (adaptive, ~40 questions, no scaled score), so it
 * never shows a TOTAL. Actions: review the exact questions (once the sitting
 * snapshot has loaded — legacy records without one get no review button)
 * and re-open the full diagnosis.
 */
const DiagnosticCard = ({ record, onView, reviewStatus = 'idle', onReview }) => {
  const dateStr = fmtShortDate(record?.completedAt);
  const total = typeof record?.totalCount === 'number' && record.totalCount > 0 ? record.totalCount : null;
  const isCheckin = record?.diagnosticVariant === 'checkin';
  const meta = [isCheckin ? 'Check-in' : 'Adaptive', total ? `${total} questions` : null, dateStr ? `Completed ${dateStr}` : null]
    .filter(Boolean)
    .join(' · ');
  return (
    <div className="pt-card is-diagnostic">
      <div className="pt-card-row">
        <span className="pt-badge is-diagnostic" aria-hidden="true">
          <TargetIcon size={20} color="currentColor" />
        </span>
        <div className="pt-card-main">
          <div className="pt-card-titlerow">
            <span className="pt-card-title">Diagnostic</span>
            <span className="pt-pill is-completed">Completed</span>
          </div>
          <div className="pt-card-meta">{meta}</div>
        </div>
        <div className="pt-diag-actions">
          {typeof onReview === 'function' && (reviewStatus === 'ready' || reviewStatus === 'loading') && (
            <button
              type="button"
              className="pt-btn is-outline"
              onClick={onReview}
              disabled={reviewStatus !== 'ready'}
              title="Go through every question from your diagnostic with the answers and explanations"
            >
              Review answers
            </button>
          )}
          <button type="button" className="pt-btn is-primary" onClick={onView}>
            View diagnosis <ArrowRightIcon size={16} color="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionScoreRow = ({ kind, title, q, time, score }) => {
  const pct = typeof score === 'number' ? Math.max(3, Math.min(100, Math.round((score / SECTION_MAX) * 100))) : 0;
  return (
    <div className="pt-secrow">
      <span className={`pt-secrow-dot is-${kind}`} aria-hidden="true" />
      <div className="pt-secrow-info">
        <div className="pt-secrow-title">{title}</div>
        <div className="pt-secrow-meta">{q} questions · {time} min</div>
      </div>
      <div className="pt-secrow-track">
        <div className={`pt-secrow-fill is-${kind}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="pt-secrow-score">{score != null ? score : '—'}</span>
    </div>
  );
};

const TestCard = ({
  test,
  testNum,
  result,
  bestScore,
  attempts,
  inProgress,
  isExpanded,
  onToggleExpand,
  openDropdown,
  setOpenDropdown,
  dropdownRef,
  onSelectTest,
  onSelectTestWithMode,
  onResumeTest,
  onViewResults,
  onViewDiagnosis,
  onRequestReset,
  onRequestDeleteAttempt,
  billingLocked = false,
  onSubscribe,
}) => {
  const status = inProgress ? 'progress' : (bestScore != null || attempts > 0) ? 'completed' : 'notstarted';
  const rwMods = test.modules.filter((m) => m.section === 'reading-writing');
  const mathMods = test.modules.filter((m) => m.section === 'math');
  const rwTime = rwMods.reduce((s, m) => s + (m.timeLimit || 0), 0);
  const mathTime = mathMods.reduce((s, m) => s + (m.timeLimit || 0), 0);
  const rwQ = rwMods.reduce((s, m) => s + (m.questions?.length || 0), 0);
  const mathQ = mathMods.reduce((s, m) => s + (m.questions?.length || 0), 0);
  const totalQ = rwQ + mathQ;
  const totalTime = rwTime + mathTime;
  const rwScore = sectionScore(result, 'reading-writing');
  const mathScore = sectionScore(result, 'math');
  const answered = inProgress ? Object.keys(inProgress.answers || {}).length : 0;
  const dateStr = fmtShortDate(result?.lastAttemptAt);

  const dropKey = `${test.id}:launch`;
  const launchOpen = openDropdown === dropKey;
  const launch = (timed) => {
    setOpenDropdown(null);
    if (onSelectTestWithMode) onSelectTestWithMode(test, timed, null);
    else if (onSelectTest) onSelectTest(test);
  };

  if (status === 'progress') {
    const pct = totalQ ? Math.max(3, Math.round((answered / totalQ) * 100)) : 0;
    return (
      <div className="pt-card is-progress">
        <div className="pt-card-row">
          <span className="pt-badge is-progress">#{testNum}</span>
          <div className="pt-card-main">
            <div className="pt-card-titlerow">
              <span className="pt-card-title">Digital SAT #{testNum}</span>
              <span className="pt-pill is-progress">In progress</span>
            </div>
            <div className="pt-progress">
              <div className="pt-progress-track"><div className="pt-progress-fill" style={{ width: `${pct}%` }} /></div>
              <span className="pt-progress-label">{answered}/{totalQ}</span>
            </div>
          </div>
          <div className="pt-progress-actions">
            {onRequestReset && (
              <button
                type="button"
                className="pt-reset"
                onClick={onRequestReset}
                title="Discard your progress on this test and start over from question 1"
              >
                Reset
              </button>
            )}
            {billingLocked ? (
              <button type="button" className="pt-btn is-outline" onClick={() => onSubscribe && onSubscribe()}>
                Subscribe to continue
              </button>
            ) : (
              <button type="button" className="pt-btn is-primary" onClick={() => onResumeTest && onResumeTest(test, inProgress?.isTimed)}>
                Continue <ArrowRightIcon size={16} color="currentColor" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'notstarted') {
    return (
      <div className="pt-card">
        <div className="pt-card-row">
          <span className="pt-badge is-notstarted">#{testNum}</span>
          <div className="pt-card-main">
            <div className="pt-card-titlerow">
              <span className="pt-card-title">Digital SAT #{testNum}</span>
              <span className="pt-pill is-notstarted">Not started</span>
            </div>
            <div className="pt-card-meta">Full-length · {totalQ} questions · ~{totalTime} min</div>
          </div>
          <div className="pt-launch" ref={launchOpen ? dropdownRef : null}>
            {billingLocked ? (
              <button type="button" className="pt-btn is-outline" onClick={() => onSubscribe && onSubscribe()}>
                Subscribe to unlock
              </button>
            ) : (
              <button type="button" className="pt-btn is-outline" onClick={() => setOpenDropdown(launchOpen ? null : dropKey)}>
                Start test
              </button>
            )}
            {!billingLocked && launchOpen && <LaunchMenu totalTime={totalTime} onPick={launch} />}
          </div>
        </div>
      </div>
    );
  }

  // Completed (expandable)
  return (
    <div className="pt-card is-completed">
      <button type="button" className={`pt-card-head${isExpanded ? ' is-open' : ''}`} onClick={onToggleExpand} aria-expanded={isExpanded}>
        <span className="pt-badge is-completed">#{testNum}</span>
        <div className="pt-card-main">
          <div className="pt-card-titlerow">
            <span className="pt-card-title">Digital SAT #{testNum}</span>
            <span className="pt-pill is-completed">Completed</span>
          </div>
          {(rwScore != null || mathScore != null || dateStr) && (
            <div className="pt-chips">
              {rwScore != null && <span className="pt-chip is-rw">R&amp;W {rwScore}</span>}
              {mathScore != null && <span className="pt-chip is-math">Math {mathScore}</span>}
              {dateStr && <span className="pt-chip-date">· {dateStr}</span>}
            </div>
          )}
        </div>
        <div className="pt-card-total">
          <span className="pt-card-total-num">{bestScore}</span>
          <span className="pt-card-total-label">TOTAL</span>
        </div>
        <span className={`pt-card-chev${isExpanded ? ' is-open' : ''}`} aria-hidden="true">
          <ChevronDownIcon size={18} color="currentColor" />
        </span>
      </button>

      {isExpanded && (
        <div className="pt-card-body">
          <SectionScoreRow kind="rw" title="Reading and Writing" q={rwQ} time={rwTime} score={rwScore} />
          <SectionScoreRow kind="math" title="Math" q={mathQ} time={mathTime} score={mathScore} />
          {/* Attempt history — only when there's more than one, so a student can
              remove a junk retake (e.g. one taken because a prior save failed)
              instead of nuking the whole test. Newest first; the best score is
              badged so it's clear which one the card total reflects. */}
          {onRequestDeleteAttempt && Array.isArray(result?.attempts) && result.attempts.length > 1 && (
            <div className="pt-attempts">
              <div className="pt-attempts-title">Attempts ({result.attempts.length})</div>
              {[...result.attempts]
                .sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0))
                .map((a, i) => {
                  const scoreLabel = typeof a.scaledScore === 'number' ? a.scaledScore : '—';
                  const isBest = typeof bestScore === 'number' && a.scaledScore === bestScore;
                  const when = fmtShortDate(a.completedAt);
                  return (
                    <div key={a.attemptId || i} className="pt-attempt-row">
                      <span className="pt-attempt-score">{scoreLabel}</span>
                      {isBest && <span className="pt-attempt-badge">Best</span>}
                      {when && <span className="pt-attempt-date">{when}</span>}
                      <button
                        type="button"
                        className="pt-attempt-del"
                        onClick={(e) => { e.stopPropagation(); onRequestDeleteAttempt(a); }}
                        disabled={!a.attemptId}
                        title={a.attemptId ? 'Delete this attempt' : 'This older attempt cannot be deleted individually'}
                        aria-label={`Delete the attempt scoring ${scoreLabel}`}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="pt-card-foot">
            <div className="pt-foot-left">
              <span className="pt-foot-date">{dateStr ? `Completed ${dateStr}` : 'Completed'}</span>
              {onRequestReset && (
                <button
                  type="button"
                  className="pt-reset"
                  onClick={(e) => { e.stopPropagation(); onRequestReset(); }}
                  title="Erase this test's scores and progress — as if you never took it"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="pt-foot-actions">
              <div className="pt-launch" ref={launchOpen ? dropdownRef : null}>
                <button type="button" className="pt-btn is-outline is-sm" onClick={() => setOpenDropdown(launchOpen ? null : dropKey)}>
                  Retake
                </button>
                {launchOpen && <LaunchMenu totalTime={totalTime} onPick={launch} up />}
              </div>
              {onViewResults && attempts > 0 && (
                <button
                  type="button"
                  className="pt-btn is-outline is-sm"
                  onClick={() => onViewResults(test)}
                  title="Go through every question with the answers and explanations"
                >
                  Review answers
                </button>
              )}
              {onViewDiagnosis && attempts > 0 && (
                <button type="button" className="pt-btn is-primary is-sm" onClick={() => onViewDiagnosis(test)}>
                  View diagnosis <ArrowRightIcon size={16} color="currentColor" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeTestList;
