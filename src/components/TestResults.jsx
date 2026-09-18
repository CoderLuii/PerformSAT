/**
 * TestResults Component
 * Displays practice test results in Test Innovators style
 * Features: Tab navigation, score badges with progress bars,
 * difficulty donut charts, and content domain bars
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { colors } from '../design/tokens';
import { MathText } from './MathText';
import { isGoalAchieved, isCompositeScaleTarget, DEFAULT_GOAL_SCORE } from '../services/selectors/goalProgress';
import { isBlankAttempt } from '../services/selectors/latestTestStats';
import './TestResults.css';
import { ChartBarIcon, ArrowRightIcon, BookOpenIcon, PencilIcon, BrainIcon, SearchIcon, PinIcon } from '../design/icons';
import Avatar, { AVATAR_SIZES } from './ui/Avatar';
import { scoreTest, isAnswerCorrect, estimatePercentile, adaptDiagnosticForUI, mergeAiIntoReport, buildUnifiedReport, buildNarrativeFlow } from '../services/scoring';
import { getDomainInfo } from '../data/skillTaxonomy';
import { buildDomainSkillTable } from '../services/selectors/domainSkillTable';
import { buildScannable } from '../services/scoring/scannableProse';
import QuestionInsightCard from './QuestionInsightCard';
import { EmphasizedProse, ScannableProse, FindingCard, SectionHeader, canonKey } from './results/ReportPieces';

/**
 * Resolve the scores to DISPLAY on the results screen. Prefers the authoritative
 * score persisted at completion (scored against the exact modules the student
 * saw + the served math route); falls back to a live recompute only for legacy
 * attempts saved before scores were persisted.
 *
 * This is the guard against the "1370 then Math 210" bug: a reconstructed review
 * `test` that lost its per-module section makes scoreTest() collapse the whole
 * test into one ~210 Math bucket. Trusting the stored score makes the displayed
 * number match what was actually scored, regardless of recompute drift.
 *
 * @param {{scaledScore?:number, sectionScores?:Object, isMultiSection?:boolean}|null} storedResult
 * @param {{sectionScore:number, sectionScores?:Object, isMultiSection?:boolean}} fallbackScored
 * @returns {{satScore:number, sectionScores:Object, isMultiSection:boolean}}
 */
export function resolveDisplayScores(storedResult, fallbackScored) {
  if (storedResult && typeof storedResult.scaledScore === 'number') {
    const sectionScores = storedResult.sectionScores || {};
    return {
      satScore: storedResult.scaledScore,
      sectionScores,
      isMultiSection: storedResult.isMultiSection ?? (Object.keys(sectionScores).length > 1),
    };
  }
  return {
    satScore: fallbackScored.sectionScore,
    sectionScores: fallbackScored.sectionScores || {},
    isMultiSection: !!fallbackScored.isMultiSection,
  };
}

// (splitToScannable / extractMetrics / cleanBullet removed 2026-07-19 —
// the diagnosis renders flowing tutor-voice prose, never shredded bullets.
// formatSkillName removed 2026-07-19 with the Domains & Skills dropdown:
// its only call sites were the per-skill expansion rows.)

// Donut Chart Component for difficulty breakdown
// Score Badge Component with progress bar
// Domain Bar Component — shows per-domain accuracy percentage
// Legend Component for donut charts
const CollapsibleSection = ({ icon, iconBg, iconColor, label, expanded, onToggle, children }) => (
  <div style={{
    background: '#ffffff', borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-slate-200)',
    boxShadow: expanded ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    overflow: 'hidden', transition: 'all 0.3s ease',
  }}>
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '20px 24px', border: 'none', background: 'none',
        cursor: 'pointer', outline: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor }}>
          {icon}
        </div>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', fontWeight: '700', color: 'var(--color-slate-800)' }}>
          {label}
        </span>
      </div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-slate-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    <div className={`diag-collapsible${expanded ? ' diag-expanded' : ''}`}>
      <div style={{ borderTop: '1px solid var(--color-slate-100)' }}>
        {children}
      </div>
    </div>
  </div>
);

const TestResults = ({
  test,
  answers,
  // The authoritative score persisted at completion (scored against the exact
  // modules the student saw + the served math route). When present it is the
  // source of truth for the displayed scores; scoreTest(test, answers) is only
  // a legacy fallback for attempts saved before scores were persisted.
  storedResult = null,
  // The Module-2 variants the student was actually served (per section).
  // Threaded into the legacy scoreTest fallback so the brief pre-storedResult
  // paint doesn't re-derive the route from Module-1 accuracy (which is wrong
  // whenever the student manually overrode the variant). diagnosticData's
  // routes win when present; these are the fallback for the first paint.
  servedMathRoute = null,
  servedRwRoute = null,
  diagnosticData,
  diagnosticReport,
  practiceTestResults,
  aiDiagnosticState,
  onRetryAiDiagnostic,
  saveStatus = null,
  onRetrySave = null,
  onBack,
  backLabel = 'Back to Tests',
  onRetake,
  onReview,
  // 'summary' = the score overview; 'diagnosis' = the AI diagnosis screen.
  screen = 'summary',
  onViewDiagnosis = null,
  // Opt-in: launch a targeted drill on one weak skill through the app's
  // 3-tier drill router (passes exact missedPatterns). Only wired on the
  // past-results mount — the completion screen (test runner) leaves it
  // undefined, so the Drill button simply doesn't render there.
  onDrillWeakness,
  onGoToStudyPlan,
  savedStudyPlan,
  user,
}) => {
  const [showEvidenceDetail, setShowEvidenceDetail] = useState(false);
  // Domains & Skills block: which domain rows are expanded to their skills.
  // Keyed `${section}:${domainId}`. Collapsed by default (empty set).
  const [diagEntrance, setDiagEntrance] = useState(true);
  const diagEntranceTimer = useRef(null);
  // Latches once the post-test save fails so the banner can keep narrating
  // the retry (saving) and recovery (saved) states instead of vanishing.
  const [hadSaveFailure, setHadSaveFailure] = useState(false);

  useEffect(() => {
    if (saveStatus === 'failed') setHadSaveFailure(true);
  }, [saveStatus]);

  useEffect(() => {
    if (diagEntrance) {
      diagEntranceTimer.current = setTimeout(() => setDiagEntrance(false), 1200);
    }
    return () => clearTimeout(diagEntranceTimer.current);
  }, [diagEntrance]);

  const diagUI = useMemo(
    () => adaptDiagnosticForUI(diagnosticReport, diagnosticData),
    [diagnosticReport, diagnosticData]
  );

  // The organized Math / R&W → domain → skill accuracy table (Acely-parity).
  // Recomputed from the engine's per-question questionAnalysis — which
  // runDiagnostic regenerates on every mount (the stored report is stripped),
  // so accuracy here is always re-derived, never a trusted stored aggregate.
  const domainSkillTable = useMemo(() => {
    const qa = diagnosticReport?.questionAnalysis;
    if (!Array.isArray(qa) || qa.length === 0) return null;
    const skillNames = {};
    (diagnosticReport?.skillAnalysis?.allSkills || []).forEach(s => {
      if (s?.skillId) skillNames[s.skillId] = s.name || s.skillId;
    });
    const domainNames = {};
    (diagnosticReport?.domainAnalysis || []).forEach(d => {
      if (d?.domain) domainNames[d.domain] = d.displayName || d.domain;
    });
    return buildDomainSkillTable(qa, { skillNames, domainNames });
  }, [diagnosticReport]);

  // AI diagnostic comes pre-populated from PracticeTest's auto-generation pipeline
  const aiStatus = aiDiagnosticState?.status || 'idle';
  const aiNarrative = aiDiagnosticState?.narrative || null;

  // Calculate scores
  const calculateModuleScore = (moduleIndex) => {
    const module = test.modules[moduleIndex];
    let correct = 0;
    module.questions.forEach((q, qIdx) => {
      const key = `${moduleIndex}-${qIdx}`;
      if (isAnswerCorrect(q, answers[key])) correct++;
    });
    return { correct, total: module.questions.length };
  };

  const calculateTotalScore = () => {
    let total = 0;
    test.modules.forEach((_, idx) => {
      total += calculateModuleScore(idx).correct;
    });
    return total;
  };

  // Calculate difficulty breakdown for a module
  const calculateDifficultyBreakdown = (moduleIndex) => {
    const module = test.modules[moduleIndex];
    const breakdown = {
      easy: { correct: 0, incorrect: 0, unanswered: 0 },
      medium: { correct: 0, incorrect: 0, unanswered: 0 },
      hard: { correct: 0, incorrect: 0, unanswered: 0 }
    };

    module.questions.forEach((q, qIdx) => {
      const key = `${moduleIndex}-${qIdx}`;
      const userAnswer = answers[key];
      const difficulty = q.difficulty || 'medium';

      if (!userAnswer) {
        breakdown[difficulty].unanswered++;
      } else if (isAnswerCorrect(q, userAnswer)) {
        breakdown[difficulty].correct++;
      } else {
        breakdown[difficulty].incorrect++;
      }
    });

    return breakdown;
  };

  // Calculate domain breakdown for a module using the shared inferDomain helper

  const totalQuestions = test.modules.reduce((sum, m) => sum + m.questions.length, 0);
  const totalCorrect = calculateTotalScore();
  // Section-aware scoring: a full-length SAT (R&W + Math) returns a 400-1600
  // composite; a single-section test returns a 200-800 score.
  // _scored is still computed for the per-question review grid + diagnostics,
  // but the DISPLAYED scores prefer the authoritative storedResult when present.
  // Re-deriving from scoreTest(test, answers) can diverge from the persisted
  // score when `test` was reconstructed for review (e.g. a snapshot that lost
  // its per-module section collapses all items into one math bucket -> ~210).
  const _scored = scoreTest(test, answers, {
    mathRoute: diagnosticData?.mathRoute ?? servedMathRoute ?? undefined,
    rwRoute: diagnosticData?.rwRoute ?? servedRwRoute ?? undefined,
  });
  const { satScore, sectionScores, isMultiSection } = resolveDisplayScores(storedResult, _scored);
  const headlineLabel = isMultiSection
    ? 'Total Score'
    : (test.modules[0]?.section === 'reading-writing' ? 'Reading & Writing Score' : 'Math Score');

  // Header meta: total attempt time ("1h 13m") from telemetry, when present.
  const headerTimeSeconds = Object.values(diagnosticData?.questionDetails || {})
    .reduce((s, q) => s + (q.timeSpent || 0), 0);
  const headerTimeLabel = headerTimeSeconds > 0
    ? (headerTimeSeconds >= 3600
      ? `${Math.floor(headerTimeSeconds / 3600)}h ${Math.round((headerTimeSeconds % 3600) / 60)}m`
      : `${Math.round(headerTimeSeconds / 60)}m`)
    : null;

  // ── Domains & Skills: one organized, expandable Math / R&W → domain → skill
  // accuracy block. Folds the old math-only "Domain Performance" bars and the
  // diagnostic tab's "Skill Gaps by Domain" grid into a single hierarchy with
  // per-skill deep-links (into the answer review) and drill actions.
  const renderDomainSkills = () => {
    if (!domainSkillTable || domainSkillTable.sections.length === 0) return null;
    const multiSection = domainSkillTable.sections.length > 1;
    // Accuracy bar palette from the 07-19 mockup: red < 25, amber < 50,
    // purple < 75, deep lime above.
    const barCol = (p) => p < 25 ? 'var(--trx-red)' : p < 50 ? 'var(--trx-amber)' : p < 75 ? 'var(--trx-purple)' : 'var(--trx-lime-deep)';

    return (
      <div className="trx-card trx-lift" data-testid="domain-skills">
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <span className="trx-icon-chip" style={{ background: 'var(--trx-purple-tint)', color: 'var(--trx-purple)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" rx="1" /><rect x="12" y="8" width="3" height="10" rx="1" /><rect x="17" y="5" width="3" height="13" rx="1" /></svg>
          </span>
          <div className="trx-micro">Domains &amp; Skills</div>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--trx-text-2)', lineHeight: 1.5, marginTop: '6px', marginBottom: 0 }}>
          Accuracy by content domain across this test.
        </p>

        {domainSkillTable.sections.map((sec, sIdx) => (
          <div key={sec.section}>
            {multiSection && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: sIdx === 0 ? '24px 0 12px' : '28px 0 12px' }}>
                <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '17px', color: 'var(--trx-text)' }}>{sec.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--trx-text-3)', fontVariantNumeric: 'tabular-nums' }}>
                  {sec.accuracy}% · {sec.correct}/{sec.total}
                </span>
              </div>
            )}
            {!multiSection && sIdx === 0 && <div style={{ height: '18px' }} />}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sec.domains.map((dom, dIdx) => {
                const key = `${sec.section}:${dom.domainId}`;
                // Weakest domain in the section (and not already strong) is the
                // focus area — purple tag (purple = focus/study-plan role).
                const isFocus = dIdx === 0 && !dom.isStrong && dom.total > 0;
                const pctColor = dom.isStrong ? 'var(--trx-lime-deep)' : 'var(--trx-text)';
                return (
                  <div
                    key={key}
                    className={`ds-domain${dom.isStrong ? ' is-strong' : ''}`}
                  >
                    <div
                      className="ds-domain-row is-static"
                      aria-label={`${dom.domainName}, ${dom.accuracy} percent, ${dom.correct} of ${dom.total} correct`}
                    >
                      <span className="ds-domain-name">{dom.domainName}</span>
                      {isFocus && <span className="ds-tag ds-tag-focus">Focus</span>}
                      {dom.isStrong && <span className="ds-tag ds-tag-strong">Strong</span>}
                      <span className="ds-flex-spacer" />
                      <span className="ds-bar" aria-hidden="true"><span className="ds-bar-fill" style={{ width: `${dom.accuracy}%`, background: barCol(dom.accuracy) }} /></span>
                      <span className="ds-domain-pct" style={{ color: pctColor }}>{dom.accuracy}%</span>
                      <span className="ds-domain-count">{dom.correct}/{dom.total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSummaryView = () => {
    // The Module-1/Module-2 two-up describes the adaptive MATH routing. On a
    // full SAT the math modules aren't 0/1 (R&W comes first), so select the
    // math modules explicitly; fall back to 0/1 for a math-only or R&W-only
    // test. "(Hard)" reflects the actually-served route, not a recompute.
    const mathModuleIndices = test.modules
      .map((m, i) => ((m.section || test.section) === 'math' ? i : -1))
      .filter((i) => i >= 0);
    const statM1Idx = mathModuleIndices[0] ?? 0;
    const statM2Idx = mathModuleIndices.length >= 2
      ? mathModuleIndices[1]
      : (mathModuleIndices.length === 0 && test.modules.length > 1 ? 1 : null);
    const mod1 = calculateModuleScore(statM1Idx);
    const mod2 = statM2Idx != null ? calculateModuleScore(statM2Idx) : null;
    const mod2Hard = mathModuleIndices.length >= 2
      && (diagnosticData?.mathRoute || storedResult?.mathRoute) === 'hard';
    const statModuleLabel = mathModuleIndices.length >= 1 && isMultiSection ? 'Math Module' : 'Module';
    const targetScore = user?.targetScore || DEFAULT_GOAL_SCORE;
    // Compare only when goal and score are on the SAME scale: a composite goal
    // (> 800) against a composite full-length result, or a legacy section goal
    // (<= 800) against a section-only result. Never compare across scales.
    const targetComparable = isCompositeScaleTarget(targetScore) === isMultiSection;
    const gap = targetComparable ? Math.max(0, targetScore - satScore) : 0;
    const isAtTarget = isGoalAchieved({ latestScore: satScore, targetScore, isMultiSection });
    const accuracyPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // estimatePercentile uses a 200-800 per-section table. A full-test composite
    // (400-1600) would clamp to 800 -> 99th for almost everyone; reduce it to a
    // per-section average first (mirrors diagnosticEngine.js).
    const percentile = estimatePercentile(isMultiSection ? Math.round(satScore / 2) : satScore);

    // ── Difficulty aggregates ──
    const diffAll = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };
    test.modules.forEach((_, modIdx) => {
      const bd = calculateDifficultyBreakdown(modIdx);
      ['easy', 'medium', 'hard'].forEach(d => {
        diffAll[d].correct += bd[d].correct;
        diffAll[d].total += bd[d].correct + bd[d].incorrect + bd[d].unanswered;
      });
    });

    // Domain/skill mastery is rendered by the organized "Domains & Skills"
    // block (renderDomainSkills) — the old math-only domain aggregate here
    // was folded into it.

    // ── Telemetry extraction (current attempt) ──
    const qDetails = diagnosticData?.questionDetails || {};
    const qEntries = Object.entries(qDetails);
    const hasTelemetry = qEntries.length > 0;
    const totalTimeSpent = qEntries.reduce((s, [, q]) => s + (q.timeSpent || 0), 0);
    const avgTimePerQ = hasTelemetry ? totalTimeSpent / qEntries.length : 0;

    const incorrectEntries = qEntries.filter(([, q]) => !q.isCorrect);
    const unansweredCount = qEntries.filter(([key]) => !answers[key]).length;

    const carelessCount = incorrectEntries.filter(([, q]) =>
      (q.difficulty === 'easy') || (avgTimePerQ > 0 && (q.timeSpent || 0) < avgTimePerQ * 0.5)
    ).length;
    const timePressureCount = incorrectEntries.filter(([, q]) =>
      (q.timeSpent || 0) > avgTimePerQ * 1.5
    ).length;
    const contentGapCount = Math.max(0, incorrectEntries.length - carelessCount - timePressureCount);

    const totalAnswerChanges = qEntries.reduce((s, [, q]) => s + (q.answerChanges || 0), 0);
    const reviewedCount = diagnosticData?.markedForReviewCount || 0;
    const navPattern = diagnosticData?.navigationPattern || 'linear';

    // First-half vs second-half accuracy (stamina)
    const halfIdx = Math.floor(qEntries.length / 2);
    const firstHalf = qEntries.slice(0, halfIdx);
    const secondHalf = qEntries.slice(halfIdx);
    const firstHalfAcc = firstHalf.length > 0 ? firstHalf.filter(([, q]) => q.isCorrect).length / firstHalf.length : 0;
    const secondHalfAcc = secondHalf.length > 0 ? secondHalf.filter(([, q]) => q.isCorrect).length / secondHalf.length : 0;
    const staminaDrop = Math.round((firstHalfAcc - secondHalfAcc) * 100);

    // Difficulty cliff: biggest accuracy drop between adjacent levels
    const diffLevels = ['easy', 'medium', 'hard'];
    const diffPcts = diffLevels.map(d => diffAll[d].total > 0 ? Math.round((diffAll[d].correct / diffAll[d].total) * 100) : null);
    let diffCliff = null;
    for (let i = 0; i < diffPcts.length - 1; i++) {
      if (diffPcts[i] !== null && diffPcts[i + 1] !== null) {
        const drop = diffPcts[i] - diffPcts[i + 1];
        if (!diffCliff || drop > diffCliff.drop) {
          diffCliff = { from: diffLevels[i], to: diffLevels[i + 1], drop };
        }
      }
    }

    // Easy misses (high-value recoverable points)
    const easyMissed = qEntries.filter(([, q]) => q.difficulty === 'easy' && !q.isCorrect).length;

    // Module delta
    const mod1Pct = mod1.total > 0 ? Math.round((mod1.correct / mod1.total) * 100) : 0;
    const mod2Pct = mod2 && mod2.total > 0 ? Math.round((mod2.correct / mod2.total) * 100) : null;

    // ── Historical attempt data ──
    // Blank/abandoned submissions are excluded: a floor-400 first attempt
    // would inflate "improvement from first" and chart on the trajectory.
    const testHistory = practiceTestResults?.[test.id];
    const attempts = (testHistory?.attempts || []).filter(a => !isBlankAttempt(a));
    const hasHistory = attempts.length > 1;
    const bestScore = testHistory?.bestScaledScore || satScore;
    // attempts is newest-first after Firestore hydration (trimAttempts sorts
    // desc), so attempts[0] is the LATEST. Sort chronologically to baseline the
    // "Change" stat on the genuine FIRST attempt (matches the trajectory chart).
    const chronoAttempts = [...attempts].sort((a, b) => new Date(a.completedAt || 0) - new Date(b.completedAt || 0));
    const firstAttemptScore = chronoAttempts.length > 0 ? (chronoAttempts[0].scaledScore ?? satScore) : satScore;
    const improvementFromFirst = satScore - firstAttemptScore;

    // Linear gauge geometry — 200-800 single-section, 400-1600 full SAT.
    const gaugeMin = isMultiSection ? 400 : 200;
    const gaugeMax = isMultiSection ? 1600 : 800;
    const gaugeRange = gaugeMax - gaugeMin;
    const scorePct = ((satScore - gaugeMin) / gaugeRange) * 100;
    const targetPct = ((targetScore - gaugeMin) / gaugeRange) * 100;
    const accentHex = isAtTarget ? '#22c55e' : '#06b6d4';

    const formatTime = (seconds) => {
      if (seconds < 60) return `${Math.round(seconds)}s`;
      const m = Math.floor(seconds / 60);
      const s = Math.round(seconds % 60);
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    };

    // Progress toward the goal (drives the hero's center caption). The bar
    // fill stays positional on the 400-1600 / 200-800 scale; this caption is
    // distance covered from scale floor to the goal, per the 07-19 mockup.
    const goalProgressPct = targetComparable && targetScore > gaugeMin
      ? Math.min(100, Math.round(((satScore - gaugeMin) / (targetScore - gaugeMin)) * 100))
      : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>

        {/* ═══════════ SCORE HERO (navy, from the 07-19 mockup) ═══════════ */}
        <div style={{ background: 'var(--trx-navy)', borderRadius: '22px', padding: '32px 34px', boxShadow: 'var(--trx-shadow)', position: 'relative', overflow: 'hidden', color: '#fff' }}>
          <div style={{ position: 'absolute', right: '-70px', top: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,92,43,.28), transparent 70%)' }} />
          <div style={{ position: 'absolute', left: '24%', bottom: '-140px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,229,.22), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)' }}>
                    {isMultiSection ? 'Current Score' : headlineLabel}
                  </div>
                  {targetComparable && !isAtTarget && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(194,232,58,.16)', color: 'var(--trx-lime)', fontWeight: 700, fontSize: '12.5px', padding: '5px 11px', borderRadius: '20px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
                      {gap} to goal
                    </span>
                  )}
                  {targetComparable && isAtTarget && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(194,232,58,.16)', color: 'var(--trx-lime)', fontWeight: 700, fontSize: '12.5px', padding: '5px 11px', borderRadius: '20px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Goal reached
                    </span>
                  )}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '78px', lineHeight: .8, letterSpacing: '-.03em' }}>{satScore}</span>
                </div>
              </div>
              {isMultiSection && (
                <div style={{ display: 'flex', gap: '12px', flex: 'none' }}>
                  {sectionScores['math'] !== undefined && (
                    <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '13px', padding: '14px 22px', textAlign: 'center', minWidth: '104px' }}>
                      <div style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Math</div>
                      <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '28px', marginTop: '4px' }}>{sectionScores['math']}</div>
                    </div>
                  )}
                  {sectionScores['reading-writing'] !== undefined && (
                    <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '13px', padding: '14px 22px', textAlign: 'center', minWidth: '104px' }}>
                      <div style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>R&W</div>
                      <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '28px', marginTop: '4px' }}>{sectionScores['reading-writing']}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ marginTop: '26px' }}>
              <div style={{ position: 'relative', height: '9px', borderRadius: '6px', background: 'rgba(255,255,255,.12)' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${scorePct}%`, borderRadius: '6px', background: 'linear-gradient(90deg, #EC5C2B, #F2865C)' }} />
                {targetComparable && (
                  <div style={{ position: 'absolute', left: `${targetPct}%`, top: '-3px', bottom: '-3px', width: '2.5px', borderRadius: '2px', background: 'var(--trx-lime)' }} />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '9px', fontSize: '12px', fontWeight: 600 }}>
                <span style={{ color: 'rgba(255,255,255,.5)' }}>{gaugeMin}</span>
                {goalProgressPct !== null && (
                  <span style={{ color: 'rgba(255,255,255,.82)' }}>You're {goalProgressPct}% of the way there</span>
                )}
                {targetComparable
                  ? <span style={{ color: 'var(--trx-lime)' }}>Goal {targetScore}</span>
                  : <span style={{ color: 'rgba(255,255,255,.5)' }}>{gaugeMax}</span>}
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '22px', borderTop: '1px solid rgba(255,255,255,.1)', flexWrap: 'wrap' }}>
            {onViewDiagnosis && (
              <button className="trx-hero-btn-primary" onClick={onViewDiagnosis}>
                View diagnosis
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            )}
            <button className={onViewDiagnosis ? 'trx-hero-btn-ghost' : 'trx-hero-btn-primary'} onClick={onReview}>
              Review answers
            </button>
            {onRetake && <button className="trx-hero-btn-ghost" onClick={onRetake}>Retake</button>}
          </div>
        </div>

          {/* ═══════════ KPI ROW ═══════════ */}
        <div className="trx-kpis">
          <div className="trx-lift" style={{ background: 'var(--trx-orange)', borderRadius: '18px', padding: '22px 20px', color: '#fff' }}>
            <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '34px', lineHeight: 1 }}>{accuracyPct}<span style={{ fontSize: '20px' }}>%</span></div>
            <div style={{ fontWeight: 700, fontSize: '10.5px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.88)', marginTop: '11px' }}>Accuracy</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.8)', marginTop: '2px' }}>{totalCorrect} of {totalQuestions} correct</div>
          </div>
          <div className="trx-lift" style={{ background: 'var(--trx-lime)', borderRadius: '18px', padding: '22px 20px', color: 'var(--trx-lime-ink)' }}>
            <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '34px', lineHeight: 1 }}>{percentile}<span style={{ fontSize: '20px' }}>th</span></div>
            <div style={{ fontWeight: 700, fontSize: '10.5px', letterSpacing: '.1em', textTransform: 'uppercase', opacity: .72, marginTop: '11px' }}>Percentile</div>
            <div style={{ fontSize: '12px', opacity: .7, marginTop: '2px' }}>national rank</div>
          </div>
          <div className="trx-lift" style={{ background: 'var(--trx-navy)', borderRadius: '18px', padding: '22px 20px', color: '#fff' }}>
            <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '34px', lineHeight: 1 }}>{mod1Pct}<span style={{ fontSize: '20px', color: 'rgba(255,255,255,.5)' }}>%</span></div>
            <div style={{ fontWeight: 700, fontSize: '10.5px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginTop: '11px' }}>{statModuleLabel} 1</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', marginTop: '2px' }}>standard</div>
          </div>
          {mod2Pct !== null && (
            <div className="trx-lift" style={{ background: 'var(--trx-purple)', borderRadius: '18px', padding: '22px 20px', color: '#fff' }}>
              <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '34px', lineHeight: 1 }}>{mod2Pct}<span style={{ fontSize: '20px', color: 'rgba(255,255,255,.6)' }}>%</span></div>
              <div style={{ fontWeight: 700, fontSize: '10.5px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)', marginTop: '11px' }}>{statModuleLabel} 2</div>
              <div style={{ fontSize: '12px', color: '#fff', fontWeight: mod2Hard ? 700 : 400, marginTop: '2px' }}>{mod2Hard ? 'Hard module' : 'standard'}</div>
            </div>
          )}
        </div>

        {/* ═══════════ DOMAINS & SKILLS (organized, expandable) ═══════════ */}
        {renderDomainSkills()}

        {/* ═══════════ BLOCK 2: ATTEMPT DATA ═══════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* ── 2A  ATTEMPT SNAPSHOT ── */}
          <div className="trx-card trx-lift">
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '20px' }}>
              <span className="trx-icon-chip" style={{ background: 'rgba(90,138,22,.12)', color: 'var(--trx-lime-deep)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 1.5" /><path d="M9 2h6" /></svg>
              </span>
              <div className="trx-micro">Attempt Snapshot</div>
            </div>
            <div className="trx-snapshot">
              {[
                { label: 'Total Time', value: hasTelemetry ? formatTime(totalTimeSpent) : '—' },
                { label: 'Avg / Question', value: hasTelemetry ? formatTime(avgTimePerQ) : '—' },
                { label: 'Incorrect', value: `${incorrectEntries.length}`, color: 'var(--trx-red)', subLabel: `of ${totalQuestions}`, subColor: 'var(--trx-red)' },
                { label: 'Unanswered', value: `${unansweredCount}` },
                { label: 'Easy Missed', value: `${easyMissed}`, color: easyMissed > 0 ? 'var(--trx-orange)' : undefined, subLabel: easyMissed > 0 ? 'recoverable' : null, subColor: 'var(--trx-orange)' },
                { label: 'Flagged', value: `${reviewedCount}` },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '26px', lineHeight: 1, color: m.color || 'var(--trx-text)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{m.value}</div>
                  <div style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--trx-text-3)', marginTop: '7px' }}>
                    {m.label}{m.subLabel && <> <span style={{ color: m.subColor }}>{m.subLabel}</span></>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2B  POINT-LOSS BREAKDOWN ── */}
          {incorrectEntries.length > 0 && (
            <div className="trx-card trx-lift">
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '20px' }}>
                <span className="trx-icon-chip" style={{ background: 'var(--trx-orange-tint)', color: 'var(--trx-orange)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 12V2a10 10 0 0 1 10 10z" /></svg>
                </span>
                <div className="trx-micro">Point-Loss Breakdown</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { label: 'Careless Errors', count: carelessCount, color: 'var(--trx-amber)', desc: 'Easy Qs wrong or rushed answers' },
                  { label: 'Time Pressure', count: timePressureCount, color: 'var(--trx-orange)', desc: 'Spent 50%+ more time than average' },
                  { label: 'Content Gaps', count: contentGapCount, color: 'var(--trx-red)', desc: 'Skill or concept not yet learned' },
                ].map(b => {
                  const pct = incorrectEntries.length > 0 ? Math.round((b.count / incorrectEntries.length) * 100) : 0;
                  return (
                    <div key={b.label}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '15px' }}>
                          <strong style={{ fontWeight: 700, color: 'var(--trx-text)' }}>{b.label}</strong>{' '}
                          <span style={{ color: 'var(--trx-text-3)' }}>{b.desc}</span>
                        </span>
                        <span style={{ flex: 'none' }}>
                          <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '17px', color: b.color, fontVariantNumeric: 'tabular-nums' }}>{b.count}</span>{' '}
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--trx-text-3)' }}>{pct}%</span>
                        </span>
                      </div>
                      <div style={{ height: '8px', borderRadius: '5px', background: 'var(--trx-surface-2)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: '5px', width: `${pct}%`, background: b.color, transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--trx-text-3)', marginTop: '18px', marginBottom: 0, fontVariantNumeric: 'tabular-nums' }}>
                {incorrectEntries.length} incorrect out of {totalQuestions} total.
              </p>
            </div>
          )}

          {/* ── 2C  PERFORMANCE BY DIFFICULTY ── */}
          <div className="trx-card trx-lift">
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '22px' }}>
              <span className="trx-icon-chip" style={{ background: 'var(--trx-purple-tint)', color: 'var(--trx-purple)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
              </span>
              <div className="trx-micro">Performance by Difficulty</div>
            </div>
            <div className="trx-diff-grid">
              {diffLevels.map(d => {
                const stats = diffAll[d];
                const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                const tone = d === 'easy'
                  ? { bg: 'rgba(90,138,22,.1)', fg: 'var(--trx-lime-deep)', track: 'rgba(90,138,22,.16)' }
                  : d === 'medium'
                    ? { bg: 'var(--trx-purple-tint)', fg: 'var(--trx-purple)', track: 'rgba(124,92,199,.18)' }
                    : { bg: 'var(--trx-orange-tint)', fg: 'var(--trx-orange)', track: 'rgba(236,92,43,.18)' };
                return (
                  <div key={d} style={{ background: tone.bg, borderRadius: '16px', padding: '22px 18px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '38px', lineHeight: 1, color: tone.fg, fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', marginTop: '8px', textTransform: 'capitalize', color: 'var(--trx-text)' }}>{d}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--trx-text-3)', fontVariantNumeric: 'tabular-nums' }}>{stats.correct}/{stats.total}</div>
                    <div style={{ height: '7px', borderRadius: '5px', background: tone.track, overflow: 'hidden', marginTop: '12px' }}>
                      <div style={{ height: '100%', width: `${pct}%`, borderRadius: '5px', background: tone.fg, transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                    </div>
                    {diffCliff && diffCliff.to === d && diffCliff.drop > 10 && (
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--trx-red)', marginTop: '8px' }}>-{diffCliff.drop}pp drop</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Domain & skill mastery now lives in the organized "Domains &
              Skills" block above (both sections, expandable, deep-linked). */}

          {/* ── 2E  STAMINA & BEHAVIOR (two-up, from the 07-19 mockup) ── */}
          {hasTelemetry && (
            <div className="trx-two-up" style={{ marginTop: 0 }}>
              <div className="trx-card" style={{ padding: '24px 26px' }}>
                <div className="trx-micro" style={{ marginBottom: '20px' }}>Accuracy Split</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '34px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(firstHalfAcc * 100)}%</div>
                    <div style={{ fontSize: '12px', color: 'var(--trx-text-3)', marginTop: '4px' }}>1st Half</div>
                  </div>
                  <span style={{
                    background: staminaDrop > 5 ? 'var(--trx-orange-tint)' : 'rgba(90,138,22,.12)',
                    color: staminaDrop > 5 ? 'var(--trx-orange)' : 'var(--trx-lime-deep)',
                    fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '14px', padding: '6px 12px', borderRadius: '20px',
                  }}>
                    {staminaDrop > 0 ? `−${staminaDrop}pp` : staminaDrop < 0 ? `+${Math.abs(staminaDrop)}pp` : '='}
                  </span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '34px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(secondHalfAcc * 100)}%</div>
                    <div style={{ fontSize: '12px', color: 'var(--trx-text-3)', marginTop: '4px' }}>2nd Half</div>
                  </div>
                </div>
              </div>
              <div className="trx-card" style={{ padding: '24px 26px' }}>
                <div className="trx-micro" style={{ marginBottom: '16px' }}>Test Behavior</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Answer Changes', value: totalAnswerChanges },
                    { label: 'Flagged for Review', value: reviewedCount },
                    { label: 'Navigation Style', value: navPattern === 'strategic-skip' ? 'Strategic Skip' : navPattern === 'jumping' ? 'Jumping' : 'Linear' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: i > 0 ? '1px solid var(--trx-line)' : 'none', paddingTop: i > 0 ? '12px' : 0 }}>
                      <span style={{ fontSize: '14px', color: 'var(--trx-text-2)' }}>{row.label}</span>
                      <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '16px', color: 'var(--trx-text)', fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══════════ BLOCK 3: SCORE HISTORY ═══════════ */}
        {(() => {
          if (!hasHistory && attempts.length <= 1) {
            return (
              <div className="trx-card" style={{ padding: '34px 28px', textAlign: 'center' }}>
                <div className="trx-micro" style={{ marginBottom: '16px' }}>Score Trajectory</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff', display: 'grid', placeItems: 'center', color: 'var(--trx-text-3)', margin: '0 auto 14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-6" /></svg>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--trx-text-2)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
                  This is your first recorded attempt. Retake to start tracking your progress over time.
                </p>
              </div>
            );
          }

          const sortedAttempts = [...attempts].sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
          const scores = sortedAttempts.map(a => a.scaledScore);
          const minS = Math.min(...scores, targetScore) - 20;
          const maxS = Math.max(...scores, targetScore) + 20;
          const range = maxS - minS || 1;

          const chartW = 340;
          const chartH = 100;
          const padX = 30;
          const padY = 10;
          const plotW = chartW - padX * 2;
          const plotH = chartH - padY * 2;

          const pts = scores.map((s, i) => ({
            x: padX + (scores.length > 1 ? (i / (scores.length - 1)) * plotW : plotW / 2),
            y: padY + plotH - ((s - minS) / range) * plotH,
            score: s,
            idx: i + 1,
          }));
          const targetY = padY + plotH - ((targetScore - minS) / range) * plotH;
          const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

          return (
            <div className="trx-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div className="trx-micro">Score Trajectory</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {[
                    { label: 'Best', value: bestScore },
                    { label: 'Attempts', value: attempts.length },
                    ...(improvementFromFirst !== 0 ? [{ label: 'Change', value: `${improvementFromFirst > 0 ? '+' : ''}${improvementFromFirst}` }] : []),
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: colors.text.primary, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                      <div style={{ fontSize: '10px', fontWeight: '600', color: colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width={chartW} height={chartH + 20} viewBox={`0 0 ${chartW} ${chartH + 20}`} style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={`${accentHex}66`} />
                      <stop offset="100%" stopColor={accentHex} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <g transform={`translate(0, 10)`}>
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
                      const y = padY + plotH - f * plotH;
                      const val = Math.round(minS + f * range);
                      return (
                        <g key={i}>
                          <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                          <text x={padX - 8} y={y + 3} textAnchor="end" fontSize="9" fill="rgba(0,0,0,0.3)" fontWeight="600" fontVariantNumeric="tabular-nums">{val}</text>
                        </g>
                      );
                    })}
                    {/* Target line */}
                    <line x1={padX} y1={targetY} x2={chartW - padX} y2={targetY}
                      stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                    <text x={chartW - padX + 8} y={targetY + 3} fontSize="9" fill="#f97316" fontWeight="700">Target</text>
                    
                    {/* Score line */}
                    {pts.length > 1 && (
                      <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0px 4px 6px rgba(6,182,212,0.3))" />
                    )}
                    
                    {/* Data points */}
                    {pts.map((p, i) => (
                      <g key={i}>
                        {i === pts.length - 1 && (
                          <circle cx={p.x} cy={p.y} r={12} fill={`${accentHex}20`} filter="blur(4px)" />
                        )}
                        <circle cx={p.x} cy={p.y} r={i === pts.length - 1 ? 6 : 4}
                          fill={i === pts.length - 1 ? accentHex : '#fff'}
                          stroke={i === pts.length - 1 ? '#fff' : accentHex} strokeWidth={i === pts.length - 1 ? 2 : 2.5} 
                          boxShadow={i === pts.length - 1 ? `0 0 10px ${accentHex}` : 'none'}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        <text x={p.x} y={p.y - (i === pts.length - 1 ? 14 : 12)} textAnchor="middle" fontSize="10" fontWeight="800"
                          fill={i === pts.length - 1 ? accentHex : 'rgba(0,0,0,0.5)'} fontVariantNumeric="tabular-nums">{p.score}</text>
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const renderDiagnosticView = () => {
    if (!diagUI) {
      return (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: colors.text.secondary }}>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChartBarIcon size={40} color={colors.text.muted} />
            </div>
          </div>
          <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '22px', fontWeight: '600', color: colors.text.primary, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Diagnostic Insights Unavailable
          </h3>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', color: colors.text.secondary, maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
            Complete a full practice test to unlock AI-powered analysis and detailed performance breakdowns.
          </p>
        </div>
      );
    }

    const isGenerating = aiStatus === 'generating';
    const hasFailed = aiStatus === 'failed';
    const hasAI = aiStatus === 'ready' && !!aiNarrative;
    const merged = hasAI ? mergeAiIntoReport(diagUI.report, aiNarrative) : diagUI.report;
    if (!merged) return null;

    const uni = buildUnifiedReport(merged);
    if (!uni) return null;
    const narrative = buildNarrativeFlow(uni);
    if (!narrative) return null;

    const { blocks, meta } = narrative;

    const renderBlock = (block, idx) => {
      if (block.id === 'context') {
        const scoreRestateRe = /^(you scored|you'?re (at|scoring) ?\d|your score|you got \d+\/|you are \d+ points|your percentile|scoring at the \d+)/i;
        const nar = block.narrative;

        // Structured diagnosis (2026-07-19, third layout round): the thesis
        // opens as its own statement card, every finding renders as a
        // FindingCard (headline + story + Why rule + cost stat + evidence
        // pills — the AI's own fields, no longer flattened into prose), and
        // the root cause closes the section as a navy band.
        const thesis = nar?.thesis || null;
        const thesisCanon = canonKey(thesis);
        const cardPoints = (block.items || []).filter(pt => {
          const text = (typeof pt === 'string' ? pt : (pt && pt.text) || '').trim();
          if (!text || scoreRestateRe.test(text)) return false;
          const k = canonKey(text).slice(0, 45);
          return !(k && thesisCanon.includes(k));
        });

        if (!thesis && cardPoints.length === 0) return null;

        return (
          <div key={block.id} className="diag-narrative" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {thesis && (() => {
              const t = buildScannable(thesis) || { lead: thesis, rest: [] };
              return (
                <div className="trx-card" style={{ borderLeft: '3px solid var(--trx-purple)' }}>
                  {(t.lead || t.rest.length === 0) && (
                    <p style={{
                      fontFamily: 'var(--trx-display)', fontSize: '20px', fontWeight: 700,
                      color: 'var(--trx-text)', lineHeight: 1.4, letterSpacing: '-0.01em',
                      margin: 0,
                    }}>
                      <MathText>{t.lead || thesis}</MathText>
                    </p>
                  )}
                  {t.rest.map((para, i) => (
                    <p key={i} style={{ fontSize: '15px', fontWeight: 400, color: 'var(--trx-text-2)', lineHeight: 1.6, margin: 0, marginTop: (i === 0 && t.lead) ? '10px' : i === 0 ? 0 : '8px' }}>
                      <EmphasizedProse text={para} />
                    </p>
                  ))}
                </div>
              );
            })()}

            {cardPoints.map((pt, i) => (
              <FindingCard key={i} point={pt} index={cardPoints.length > 1 ? i + 1 : null} />
            ))}

            {nar?.closingCause && (
              <div style={{ background: 'var(--trx-navy)', borderRadius: '16px', padding: '20px 26px', color: '#fff' }}>
                <div style={{ fontWeight: 700, fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: '7px' }}>The bottom line</div>
                <p style={{ fontSize: '15.5px', fontWeight: 600, lineHeight: 1.55, margin: 0 }}>
                  <MathText>{nar.closingCause}</MathText>
                </p>
              </div>
            )}
          </div>
        );
      }

      if (block.id === 'metaStrip') {
        return (
          <div key={block.id} style={{ padding: '0 48px 40px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {block.items.map((s, i) => {
                const valColor = s.type === 'warning' ? 'var(--color-warning-600)' : s.type === 'success' ? 'var(--color-success-600)' : s.type === 'info' ? 'var(--color-info-600)' : colors.text.primary;
                return (
                  <div key={i} className="diag-stat-card" style={{ flex: '1 1 220px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '36px', fontWeight: '800', color: valColor, lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: '700', color: colors.text.secondary, marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                    {s.subtext && <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: colors.text.muted, marginTop: '8px', fontWeight: '500' }}>{s.subtext}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      if (block.id === 'behaviorAmplifier') {
        const confRank = { high: 0, medium: 1, low: 2 };
        const sortedItems = [...block.items].sort((a, b) => {
          const aStruct = typeof a === 'object' && a !== null;
          const bStruct = typeof b === 'object' && b !== null;
          const aFill = (aStruct ? [a.mechanism, a.evidence, a.estimatedImpact].filter(Boolean).length : 0);
          const bFill = (bStruct ? [b.mechanism, b.evidence, b.estimatedImpact].filter(Boolean).length : 0);
          const aConf = aStruct ? (confRank[a.confidence] ?? 1) : 1;
          const bConf = bStruct ? (confRank[b.confidence] ?? 1) : 1;
          if (aConf !== bConf) return aConf - bConf;
          return bFill - aFill;
        });

        // Behavior insights use the same FindingCard anatomy as the diagnosis
        // (2026-07-19 third layout round) — headline + story + Why + cost +
        // evidence pills from the structured fields. No advice chips: pills
        // are data citations, and tips still live in the study plan only.
        //
        // Cross-section dedupe: older stored narratives repeat changesSinceLast
        // verbatim as a behavior point — and it now has its own "Since Your
        // Last Test" section, so the same paragraph rendered twice.
        const changesKey = canonKey(uni.changesSinceLast).slice(0, 45);
        const visibleItems = sortedItems.filter(item => {
          const claimText = typeof item === 'object' && item !== null ? (item.text || '') : (typeof item === 'string' ? item : '');
          const cleaned = claimText.replace(/^(\(\d+\)|\d+\.)\s*/, '');
          if (!cleaned) return false;
          return !(changesKey && canonKey(cleaned).includes(changesKey));
        });
        if (visibleItems.length === 0) return null;
        return (
          <div key={block.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '14.5px', color: 'var(--trx-text-2)', marginBottom: '4px' }}>These patterns in your test-taking behavior affected your score.</div>
            {visibleItems.map((item, i) => (
              <FindingCard key={i} point={item} index={null} />
            ))}
          </div>
        );
      }

      // remediationPath block intentionally unmounted — RemediationPathBlock
      // was deleted along with the legacy LearnWorkspace flow it linked into.

      if (block.id === 'evidence') {
        const TIME_RE = /time|speed|stamina|half|pace|rush|fast|slow|minute|second|avg.*time|timing/i;
        const ACCURACY_RE = /accuracy|correct|miss|error|wrong|score|gap|wins|easy|domain|cause|lever|point|projected|impact/i;

        function classifyEvidence(ev) {
          const text = `${ev.label} ${ev.value} ${ev.group || ''}`;
          if (TIME_RE.test(text)) return 'Time & Pacing';
          if (ACCURACY_RE.test(text)) return 'Accuracy & Score';
          return 'Other Signals';
        }

        function interpretEvidence(ev) {
          const lbl = (ev.label || '').toLowerCase();
          const val = (ev.value || '').toString();
          const isWarning = ev.type === 'warning';
          const isGood = ev.type === 'success' || ev.type === 'good';

          if (/avg.*time|time.*question/i.test(lbl)) {
            return isWarning ? 'You spent more time per question than ideal, which may signal hesitation.' : 'Your pacing per question looks healthy.';
          }
          if (/correct.*wrong.*speed|speed/i.test(lbl)) {
            return isWarning ? 'Wrong answers came faster than correct ones — quick commits to trap answers.' : 'You spent similar time on correct and incorrect answers.';
          }
          if (/time.*error/i.test(lbl)) {
            return `${val} question(s) were likely rushed, causing avoidable mistakes.`;
          }
          if (/stamina/i.test(lbl)) {
            return isWarning ? 'Endurance dropped — later questions suffered from fatigue.' : 'You maintained consistent energy throughout the test.';
          }
          if (/half.*accuracy|1st.*2nd/i.test(lbl)) {
            return isWarning ? 'Accuracy fell in the second half, suggesting fatigue or time pressure.' : 'Your accuracy stayed steady from start to finish.';
          }
          if (/navigation/i.test(lbl)) {
            return isWarning ? 'Jumping between questions may reduce focus and waste time.' : 'You moved through questions in a steady order.';
          }
          if (/calculator/i.test(lbl)) {
            return isWarning ? 'Heavy calculator use may slow you down on simpler problems.' : 'Calculator use was moderate and appropriate.';
          }
          if (/flag|review/i.test(lbl)) {
            return isWarning ? 'Flagging many questions dilutes your review time on the hardest ones.' : 'You flagged selectively, keeping review focused.';
          }
          if (/easy.*win/i.test(lbl)) {
            return `These are straightforward questions you missed — fixing them is the fastest path to more points.`;
          }
          if (/point.*target|gap/i.test(lbl)) {
            return `You are ${val} point${val === '1' ? '' : 's'} away from your target score.`;
          }
          if (/lever|domain/i.test(lbl)) {
            return `Focusing here has the highest potential point gain.`;
          }
          if (/trend/i.test(lbl)) {
            return isGood ? 'Your scores are improving — keep up the momentum.' : isWarning ? 'Recent scores have dipped — revisit fundamentals.' : 'Scores are holding steady.';
          }
          if (/velocity|learning.*speed/i.test(lbl)) {
            return isGood ? 'You are learning at a healthy pace.' : 'Progress has slowed — consider changing your study approach.';
          }
          if (/projected.*gain/i.test(lbl)) {
            return `Fixing this area could recover ${val}.`;
          }
          if (isWarning) return 'This metric is outside the ideal range and may be costing you points.';
          if (isGood) return 'This is a strength — keep it up.';
          return 'A supporting data point for context.';
        }

        const themeOrder = ['Accuracy & Score', 'Time & Pacing', 'Other Signals'];
        const grouped = {};
        block.items.forEach(ev => {
          const theme = classifyEvidence(ev);
          if (!grouped[theme]) grouped[theme] = [];
          grouped[theme].push(ev);
        });

        const themeIcons = {
          'Accuracy & Score': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
          'Time & Pacing': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
          'Other Signals': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>,
        };

        return (
          <div key={block.id} style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {themeOrder.filter(t => grouped[t]?.length > 0).map(theme => (
                <div key={theme}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ color: 'var(--color-slate-500)' }}>{themeIcons[theme]}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: '800', color: 'var(--color-slate-800)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{theme}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {grouped[theme].map((ev, i) => {
                      const evColor = ev.type === 'warning' ? 'var(--color-error-600)' : ev.type === 'success' || ev.type === 'good' ? 'var(--color-success-600)' : 'var(--color-slate-900)';
                      const interpretation = interpretEvidence(ev);
                      return (
                        <div key={i} style={{ 
                          background: '#ffffff', 
                          borderRadius: 'var(--radius-lg)', 
                          padding: '20px 24px',
                          border: '1px solid var(--color-slate-200)',
                          boxShadow: 'var(--shadow-sm)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: '8px' }}>
                            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: '700', color: 'var(--color-slate-800)' }}><MathText>{ev.label}</MathText></span>
                            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', fontWeight: '800', color: evColor, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}><MathText>{ev.value}</MathText></span>
                          </div>
                          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: '500', color: 'var(--color-slate-500)', lineHeight: '1.5' }}>
                            <MathText>{interpretation}</MathText>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (block.id === 'nextMove') {
        const item = block.items[0] || {};

        return (
          <div key={block.id} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(198, 244, 50, 0.15) 0%, rgba(198, 244, 50, 0.05) 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px 40px',
              border: '1px solid rgba(198, 244, 50, 0.3)',
              display: 'flex', flexDirection: 'column', gap: '24px'
            }}>
              {block.transition && (
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', color: 'var(--color-accent-dark-green)', lineHeight: '1.6', fontWeight: '500' }}><MathText>{block.transition}</MathText></div>
              )}
              {/* Whole flowing sentence — never shredded into headline+bullets */}
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.5rem', fontWeight: '400', color: 'var(--color-accent-dark-green)', lineHeight: '1.5', letterSpacing: '-0.02em' }}>
                <MathText>{item.text}</MathText>
              </div>
              {item.reasons?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                  {item.reasons.map((r, i) => {
                    const cleanedReason = r.replace(/^(\(\d+\)|\d+\.)\s*/, '');
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ 
                          width: '24px', height: '24px', borderRadius: '50%', 
                          background: 'var(--color-brand-neon)', color: 'var(--color-accent-dark-green)', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          fontSize: '12px', fontWeight: '800', flexShrink: 0, marginTop: '4px'
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.125rem', color: 'var(--color-accent-dark-green)', lineHeight: '1.6', fontWeight: '400' }}>
                          <MathText>{cleanedReason}</MathText>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Inline Study Plan Preview */}
              {savedStudyPlan && savedStudyPlan.weeks && savedStudyPlan.weeks.length > 0 && (() => {
                const week1 = savedStudyPlan.weeks[0];
                const activities = (week1.activities || []).slice(0, 3);
                // No-emoji rule: SVG icons matching StudyPlanDashboard's activityIcon map.
                const typeIcons = {
                  lesson: <BookOpenIcon size={18} />,
                  practice: <PencilIcon size={18} />,
                  strategy: <BrainIcon size={18} />,
                  review: <SearchIcon size={18} />,
                };
                return (
                  <div style={{
                    marginTop: '16px', padding: '24px', borderRadius: 'var(--radius-lg)',
                    background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: '800', color: 'var(--color-accent-dark-green)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Week 1: {week1.theme || 'Getting Started'}
                      </div>
                      {onGoToStudyPlan && (
                        <button onClick={onGoToStudyPlan} style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: '700', color: 'var(--color-accent-dark-green)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          See full plan <ArrowRightIcon size={14} />
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {activities.map((act, ai) => (
                        <div key={ai} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-sm)' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-slate-500)', flexShrink: 0 }}>{typeIcons[act.type] || <PinIcon size={18} />}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: '600', color: 'var(--color-slate-800)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.title}</div>
                          </div>
                          {act.duration && (
                            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: '600', color: 'var(--color-slate-400)', flexShrink: 0 }}>{act.duration}m</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              
              {!savedStudyPlan && (
                <div style={{
                  marginTop: '16px', padding: '24px', borderRadius: 'var(--radius-lg)',
                  background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', textAlign: 'center'
                }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: '500', color: 'var(--color-accent-dark-green)' }}>
                    Your personalized study plan is being generated...
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
                {onGoToStudyPlan && (
                  <button onClick={onGoToStudyPlan} style={{
                    fontFamily: 'var(--font-ui)', padding: '16px 32px', borderRadius: '9999px', border: 'none',
                    background: 'var(--color-accent-dark-green)', color: 'var(--color-brand-neon)', fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    View Study Plan <ArrowRightIcon size={16} />
                  </button>
                )}
                <button onClick={onReview} style={{
                  fontFamily: 'var(--font-ui)', padding: '16px 32px', background: '#fff', color: 'var(--color-accent-dark-green)',
                  border: '1px solid rgba(46,78,44,0.2)', borderRadius: '9999px', fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease'
                }}>
                  Review Missed Questions
                </button>
              </div>
            </div>
          </div>
        );
      }

      return null;
    };

    const getBlock = (id) => blocks.find(b => b.id === id);
    const hasEvidence = getBlock('evidence');

    // ─── Extract the #1 hero finding from context block (skip score restatements) ───
    const contextBlock = getBlock('context');
    const contextItems = contextBlock?.items || [];
    const scoreRestateRe = /^(you scored|you're scoring|your score|you got \d+\/|you are \d+ points|your percentile|scoring at the \d+)/i;

    // All context items are diagnosis findings (no prescriptive content)
    const allFindings = contextItems.filter(item => {
      const text = typeof item === 'string' ? item : item?.text || '';
      return text.length > 0 && !scoreRestateRe.test(text.trim());
    });

    const weakSkillsList = diagnosticReport?.skillAnalysis?.weakSkills || [];

    // ─── Deduplicate and group weak skills by domain ───
    // Two-pass dedup: first build canonical keys, then filter duplicates.
    // Canonical key: lowercase, strip non-alphanumeric, strip trailing 's'.
    // Catches: "Systems of Equations" = "systems-of-equations", "Percents" = "percent".
    const canonicalKey = (s) => {
      const base = (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return base.endsWith('s') && base.length > 3 ? base.slice(0, -1) : base;
    };
    const domainNameIds = new Set(['algebra', 'advancedmath', 'geometry', 'problemsolving', 'problemsolvinganddataanalysis', 'geometryandtrigonometry']);

    // Pass 1: collect all canonical keys so we can detect generic-prefix overlaps
    const allKeys = weakSkillsList.map(ws => canonicalKey(ws.skillId || ws.name));

    // Pass 2: deduplicate + filter
    const seenSkills = new Set();
    const domainGroups = {};
    weakSkillsList.forEach((ws, idx) => {
      const key = allKeys[idx];
      if (!key || seenSkills.has(key)) return;
      // Skip entries where the skill is just the domain name itself
      if (domainNameIds.has(key)) return;
      // Skip generic single-word skills that are a prefix of a more specific skill
      // e.g., "circle" when "circleequation" exists — keep the more specific one
      if (key.length <= 10) {
        const hasMoreSpecific = allKeys.some(other => other !== key && other.startsWith(key) && other.length > key.length + 2);
        if (hasMoreSpecific) return;
      }
      seenSkills.add(key);
      const domainId = ws.domain || 'algebra';
      if (!domainGroups[domainId]) {
        const info = getDomainInfo(domainId);
        domainGroups[domainId] = {
          id: domainId,
          name: info?.name || domainId,
          color: info?.color || '#94a3b8',
          skills: [],
          avgPct: 0,
        };
      }
      const pct = ws.total > 0 ? Math.round((ws.correct / ws.total) * 100) : 0;
      domainGroups[domainId].skills.push({ ...ws, pct });
    });
    Object.values(domainGroups).forEach(g => {
      g.avgPct = g.skills.length > 0
        ? Math.round(g.skills.reduce((s, sk) => s + sk.pct, 0) / g.skills.length)
        : 0;
      g.skills.sort((a, b) => a.pct - b.pct || a.name.localeCompare(b.name));
    });
    const sortedDomains = Object.values(domainGroups).sort((a, b) => a.avgPct - b.avgPct);

    let sectionNum = 0;

    // Compute our 4 custom metrics
    const targetScore = user?.targetScore || DEFAULT_GOAL_SCORE;
    // Scale-aware: composite full-length results render against /1600; the goal
    // compares only when it's on the same scale as the score (composite goal +
    // composite result, or legacy section goal + section result).
    const scaleMax = isMultiSection ? 1600 : 800;
    const targetComparable = isCompositeScaleTarget(targetScore) === isMultiSection;
    const gapToTarget = targetComparable ? Math.max(0, targetScore - satScore) : 0;

    const qDetails = diagnosticData?.questionDetails || {};
    const qEntries = Object.entries(qDetails);
    const easyMissed = qEntries.filter(([, q]) => q.difficulty === 'easy' && !q.isCorrect).length;
    const easyWinsPts = easyMissed * 10;
    
    const weakestDomName = sortedDomains.length > 0 ? sortedDomains[0].name : 'Algebra';

    return (
      <div style={{ padding: '0 0 48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* ═══════ SCORE HEADER (Acely Style, Differentiated) ═══════ */}
        <div className="acely-projected-card diag-hero-card" style={{ marginBottom: '0.5rem' }}>
          <div className="acely-projected-graph diag-hero-graph" style={{ opacity: 1, paddingLeft: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '200px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-slate-500)', fontVariantNumeric: 'tabular-nums' }}>{satScore} / {scaleMax}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--color-slate-100)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, (satScore/scaleMax)*100)}%`, height: '100%', background: 'var(--color-brand-primary)', borderRadius: '9999px', transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>

              {targetComparable && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-slate-500)', fontVariantNumeric: 'tabular-nums' }}>{satScore + gapToTarget} / {scaleMax}</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--color-slate-100)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, ((satScore + gapToTarget)/scaleMax)*100)}%`, height: '100%', background: 'var(--color-slate-400)', borderRadius: '9999px' }} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="acely-projected-info">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              {meta.hasAI && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '9999px', background: 'var(--color-brand-primary-light)', border: '1px solid var(--color-brand-primary)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-brand-primary)' }} />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-brand-primary)' }}>AI Analysis</span>
                </div>
              )}
            </div>
            <div className="acely-metric-value">{satScore}</div>
            <div className="acely-metric-label" style={{ fontWeight: 500 }}>Diagnostic Score</div>
          </div>
        </div>

        {/* ═══════ KEY METRICS (Acely Style, Differentiated) ═══════ */}
        <div className="acely-performance-grid">
          <div className="acely-metric-card acely-accuracy-card">
            <div className="acely-metric-label">Points to Target</div>
            <div className="acely-metric-value">{targetComparable ? gapToTarget : '—'}</div>
            <div className="acely-metric-lines">
              <div className="line"></div>
              <div className="line short"></div>
            </div>
          </div>
          <div className="acely-metric-stack">
            <div className="diag-metric-dial-card">
              <div className="diag-metric-dial-info">
                <div className="acely-metric-value" style={{ color: 'var(--color-brand-neon)' }}>+{easyWinsPts}</div>
                <div className="acely-metric-label" style={{ color: 'white' }}>Easy Wins</div>
              </div>
              <div className="diag-metric-dial-chart">
                <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                    <circle cx="30" cy="30" r="26" fill="none" stroke="var(--color-brand-neon)" strokeWidth="6" strokeDasharray="163" strokeDashoffset="50" strokeLinecap="round" transform="rotate(-90 30 30)" />
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-neon)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="diag-metric-bar-card">
              <div className="diag-metric-bar-info">
                <div className="acely-metric-value" style={{ fontSize: '1.5rem', color: 'white', lineHeight: 1.2, paddingRight: '1rem', wordBreak: 'break-word' }}>
                  {weakestDomName}
                </div>
                <div className="acely-metric-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Biggest Lever</div>
              </div>
              <div className="diag-metric-bar-chart">
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', background: 'rgba(0,0,0,0.1)', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ width: '8px', height: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
                  <div style={{ width: '8px', height: '28px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
                  <div style={{ width: '8px', height: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
                  <div style={{ width: '8px', height: '36px', background: '#fff', borderRadius: '2px', boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ ① YOUR DIAGNOSIS (via renderBlock) ═══════ */}
        {isGenerating && getBlock('context') ? (
          // Optimistic: the deterministic diagnosis is already computed (merged ===
          // diagUI.report while the AI call is in flight), so show it immediately with
          // a quiet "Refining with AI" cue instead of a blank spinner. When the AI
          // narrative lands the section re-renders into the richer version in place —
          // the student reads real analysis at zero latency.
          <div className="diag-story-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>{++sectionNum}</div>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: '800', color: 'var(--color-slate-800)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Your Diagnosis</h2>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '700', color: 'var(--color-brand-orange-600)', background: 'rgba(251,146,60,0.12)', borderRadius: '999px', padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ width: '8px', height: '8px', border: '2px solid rgba(251,146,60,0.3)', borderTopColor: 'var(--color-brand-orange-600)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                Refining with AI
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-slate-200)' }} />
            </div>
            {renderBlock(getBlock('context'), 0)}
          </div>
        ) : isGenerating ? (
          <div className="diag-story-section">
            <div style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid rgba(59, 130, 246, 0.15)', borderTopColor: 'var(--color-brand-primary)', borderRadius: '50%', animation: 'spin 1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite' }} />
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', fontWeight: '600', color: 'var(--color-slate-700)' }}>Analyzing your test...</div>
            </div>
          </div>
        ) : hasFailed && allFindings.length === 0 ? (
          <div className="diag-story-section">
            <div style={{ padding: '24px', background: 'var(--color-warning-50)', borderRadius: '8px', border: '1px solid var(--color-warning-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--color-slate-700)' }}>AI analysis unavailable. Your score data is shown above.</div>
              {onRetryAiDiagnostic && <button onClick={onRetryAiDiagnostic} style={{ fontFamily: 'var(--font-ui)', padding: '8px 16px', borderRadius: '6px', border: 'none', background: 'var(--color-warning-600)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Retry</button>}
            </div>
          </div>
        ) : getBlock('context') ? (
          <div className="diag-story-section">
            <SectionHeader number={++sectionNum} title="Your Diagnosis" deck="The story of this test — what happened, and why." />
            {renderBlock(getBlock('context'), 0)}
          </div>
        ) : null}

        {/* ═══════ SINCE YOUR LAST TEST (returning students) ═══════ */}
        {uni.changesSinceLast && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SectionHeader number={++sectionNum} title="Since Your Last Test" deck="What moved between then and now." />
            <div className="trx-card" style={{ borderLeft: '3px solid var(--trx-lime-deep)' }}>
              <ScannableProse text={uni.changesSinceLast} />
            </div>
          </div>
        )}

        {/* Skill-gap-by-domain detail intentionally lives on the TEST OVERVIEW
            tab now (the organized, expandable "Domains & Skills" block with
            per-skill review deep-links + drills). Keeping it off the
            diagnostic tab preserves this tab as pure narrative "why" and
            avoids duplicating the same domain/skill data in two places. The
            sortedDomains computation is retained above — it feeds the
            protected "Biggest Lever" tile. */}

        {/* ═══════ HOW YOU TOOK THE TEST (via renderBlock) ═══════ */}
        {getBlock('behaviorAmplifier') && getBlock('behaviorAmplifier').items.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SectionHeader number={++sectionNum} title="How You Took the Test" deck="The habits under pressure that shaped this score." />
            {renderBlock(getBlock('behaviorAmplifier'), 2)}
          </div>
        )}

        {/* ═══════ THE QUESTIONS THAT GOT YOU (trap stories) ═══════ */}
        {Array.isArray(uni.questionInsights) && uni.questionInsights.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SectionHeader
              number={++sectionNum}
              title="The Questions That Got You"
              deck={`${uni.questionInsights.length} wrong answer${uni.questionInsights.length === 1 ? '' : 's'} worth a second look — the trap each one set, and the way through it.`}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {uni.questionInsights.slice(0, 5).map((qi) => {
                const [modIdx, qIdx] = String(qi.questionKey || '').split('-').map(Number);
                const label = Number.isFinite(modIdx) && Number.isFinite(qIdx)
                  ? `Module ${modIdx + 1} · Q${qIdx + 1}`
                  : 'Question';
                return <QuestionInsightCard key={qi.questionKey || label} insight={qi} questionLabel={label} />;
              })}
            </div>
          </div>
        )}

        {/* ═══════ WHERE THE EVIDENCE IS THIN (honesty footnote — unnumbered) ═══════ */}
        {uni.uncertainties && (
          <div style={{ borderLeft: '3px solid var(--color-slate-300)', paddingLeft: '20px' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-slate-500)', marginBottom: '6px' }}>
              Where the evidence is thin
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontStyle: 'italic', color: 'var(--color-slate-600)', lineHeight: '1.6', margin: 0 }}>
              <MathText>{uni.uncertainties}</MathText>
            </p>
          </div>
        )}

        {/* ═══════ WHAT TO FOCUS ON NEXT (via renderBlock) ═══════ */}
        {getBlock('nextMove') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SectionHeader number={++sectionNum} title="What to Focus on Next" deck="Where the next points come from." />
            {renderBlock(getBlock('nextMove'), 3)}
          </div>
        )}

        {/* ═══════ SUPPORTING DATA (collapsed) ═══════ */}
        {hasEvidence && (
          <div style={{ marginTop: '16px' }}>
            <CollapsibleSection
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>}
              iconBg="var(--color-slate-100)" iconColor="var(--color-slate-600)"
              label="View Supporting Data" expanded={showEvidenceDetail}
              onToggle={() => setShowEvidenceDetail(!showEvidenceDetail)}
            >
              {renderBlock(getBlock('evidence'), 4)}
            </CollapsibleSection>
          </div>
        )}

        {/* ═══════ FALLBACK ACTIONS (only if nextMove block is missing) ═══════ */}
        {!getBlock('nextMove') && (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--color-slate-200)' }}>
            {onGoToStudyPlan && (
              <button onClick={onGoToStudyPlan} style={{
                fontFamily: 'var(--font-ui)', padding: '12px 24px', borderRadius: '9999px', border: 'none',
                background: 'var(--color-brand-primary)', color: '#fff',
                fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)'
              }}>
                View Study Plan <ArrowRightIcon size={14} />
              </button>
            )}
            <button onClick={onReview} style={{
              fontFamily: 'var(--font-ui)', padding: '12px 24px', background: '#fff', color: 'var(--color-slate-700)',
              border: '1px solid var(--color-slate-200)', borderRadius: '9999px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)'
            }}>
              Review Answers
            </button>
          </div>
        )}
      </div>
    );
  };

  // Save-status banner (silent data-loss fix). Only the post-completion
  // PracticeTest mount threads saveStatus/onRetrySave; the Firestore-sourced
  // mounts (App viewingResults, past-test review) leave the props null so
  // nothing ever renders there. Visual aesthetic mirrors the Toaster.css
  // border-left variants.
  const renderSaveStatusBanner = () => {
    const visible =
      saveStatus === 'failed' ||
      (hadSaveFailure && (saveStatus === 'saving' || saveStatus === 'saved'));
    if (!visible) return null;

    const accent = saveStatus === 'failed'
      ? { bg: colors.semantic.errorBg, border: colors.semantic.error }
      : saveStatus === 'saving'
        ? { bg: colors.semantic.warningBg, border: colors.semantic.warning }
        : { bg: colors.semantic.successBg, border: colors.semantic.success };

    const containerStyle = {
      background: accent.bg,
      borderLeft: `3px solid ${accent.border}`,
      borderRadius: '12px',
      padding: '14px 16px',
      fontFamily: 'var(--font-ui)',
      fontSize: '14px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      justifyContent: 'space-between',
    };

    const retryButtonStyle = (disabled) => ({
      padding: '10px 16px',
      minHeight: '44px',
      borderRadius: '10px',
      border: '1px solid var(--color-slate-200)',
      background: colors.surface.white,
      fontFamily: 'var(--font-ui)',
      fontSize: '14px',
      fontWeight: '600',
      color: colors.text.primary,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    });

    if (saveStatus === 'failed') {
      return (
        <div role="alert" style={containerStyle}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: '700', color: colors.text.primary, marginBottom: '2px' }}>
              Your results couldn't be saved to your account.
            </div>
            <div style={{ color: colors.text.secondary }}>
              They're stored safely on this device — we'll retry automatically next time you open SEVA, or you can retry now.
            </div>
          </div>
          {onRetrySave && (
            <button type="button" onClick={onRetrySave} style={retryButtonStyle(false)}>
              Retry save
            </button>
          )}
        </div>
      );
    }

    if (saveStatus === 'saving') {
      return (
        <div role="alert" style={containerStyle}>
          <div style={{ fontWeight: '600', color: colors.text.primary }}>
            Saving your results...
          </div>
          <button type="button" disabled style={retryButtonStyle(true)}>
            Retry save
          </button>
        </div>
      );
    }

    // saved after an earlier failure — recovery confirmation, no auto-dismiss.
    return (
      <div role="status" style={containerStyle}>
        <div style={{ fontWeight: '600', color: colors.text.primary }}>
          Your results are saved to your account.
        </div>
      </div>
    );
  };

  return (
    <div className="trx" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 0 40px' }}>
      {/* Back navigation */}
      <div style={{ paddingTop: '16px', marginBottom: '4px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', margin: '-8px -14px',
            background: 'none', border: 'none', borderRadius: '10px',
            fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: '600',
            color: colors.text.secondary, cursor: 'pointer',
            transition: 'color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = colors.text.primary; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = colors.text.secondary; e.currentTarget.style.background = 'none'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          {backLabel}
        </button>
      </div>

      {renderSaveStatusBanner()}

      {/* Header Area — identity stamp MERGED into the page's single h1
          (made-for-me item 11): the student's face + possessive on the
          highest-emotion screen, emotion-NEUTRAL by design, always paired
          with a visible forward action (the diagnostic tab) so a bad score
          never dead-ends. */}
      <div style={{
        marginBottom: '24px',
        paddingTop: '8px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
          <Avatar user={user} size={AVATAR_SIZES.md} />
          <div style={{ minWidth: 0 }}>
            <h1 style={{
              fontFamily: 'var(--trx-display)',
              fontSize: '29px',
              fontWeight: '700',
              color: 'var(--trx-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
            }}>
              {user?.firstName ? `${user.firstName}'s ${screen === 'diagnosis' ? 'diagnosis' : 'results'} — ${test.title}` : test.title}
            </h1>
            <div style={{ fontSize: '13.5px', color: 'var(--trx-text-2)', marginTop: '4px' }}>
              Completed {new Date(test.completedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {` · ${totalQuestions} questions`}
              {headerTimeLabel ? ` · ${headerTimeLabel}` : ''}
            </div>
          </div>
        </div>
      </div>

      {/* One screen at a time: the score overview, or the AI diagnosis. */}
      <div>
        {screen === 'diagnosis'
          ? <div className={`diagnostic-ui${diagEntrance ? ' diag-entrance' : ''}`}>{renderDiagnosticView()}</div>
          : renderSummaryView()}
      </div>
    </div>
  );
};

export default TestResults;
