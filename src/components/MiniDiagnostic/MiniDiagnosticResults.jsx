/**
 * MiniDiagnosticResults — the "Your starting point" screen shown the moment the
 * 24-question check-in finishes, before the student lands on their plan.
 *
 * Its whole job is to make the diagnosis LEGIBLE — to answer "exactly what does
 * this student need?" in one screen:
 *   - where you stand (score band + the goal-gap headline),
 *   - the single most important finding (key insight),
 *   - WHY you missed what you missed (error-type breakdown), and
 *   - where you're strong vs. where to focus, with an editorial "why" per area.
 *
 * All of this is already computed by the finish pipeline (finishMiniDiagnostic →
 * runDiagnostic → buildGroundTruthDiagnosis + generateStudyPlan) and was
 * previously discarded — the old results screen showed only the band + three
 * bare skill names. This surfaces it.
 *
 * Diagnostic, not prescriptive: it explains where you stand and why. The
 * "what to do" lives in the starter plan behind the CTA.
 */
import React, { useMemo, useState } from 'react';
import { MathText } from '../MathText';
import { Button } from '../ui/Button';
import { colors, typography, spacing } from '../../design/tokens';
import { formatDiagnosticSentence, ERROR_TYPE_LABELS, ERROR_TYPE_COLORS } from '../../services/diagnosticEngine';
import { buildDiagnosisNuances, TARGET_NUANCE_KINDS } from '../../services/selectors/diagnosisNuances';
import { DOMAIN_DISPLAY_NAMES } from '../../services/scoring/domainInference';
import DiagnosticSittingDetail from './DiagnosticSittingDetail';
import TestDatePicker from '../TestDatePicker';
import { getLatestOfficialScore } from '../../services/selectors/scoreReport';
import { getUserTestDates } from '../../services/selectors/testDates';

const cardStyle = {
  padding: spacing.xl,
  borderRadius: '16px',
  border: `1px solid ${colors.surface.grayDark}`,
  marginBottom: spacing.lg,
};
const sectionStyle = { marginBottom: spacing.lg };
const sectionHeadingStyle = {
  fontSize: typography.sizes.sm,
  fontWeight: typography.weights.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: spacing.sm,
};
const chip = (color) => ({
  fontSize: typography.sizes.xs,
  fontWeight: typography.weights.semibold,
  color,
  background: `${color}1a`,
  borderRadius: '6px',
  padding: '2px 8px',
  whiteSpace: 'nowrap',
});

/**
 * Rebuild a finish-pipeline-shaped `result` from what was PERSISTED, so the
 * same screen can be re-opened from the dashboard long after the sitting.
 * Prefers the record's own lean `diagnosis` copy (written at finish since
 * 2026-08-24); records from before that fall back to the plan mirror, whose
 * strengths / weaknesses / summary came from the same diagnostic while no
 * full practice test has replaced it. Pure; exported for tests.
 *
 * @param {object|null} record  progress.miniDiagnostic
 * @param {object|null} plan    the current study plan (mirror), legacy fallback
 * @returns {object|null} { scoreBand, plan, groundTruth, diagReport, miniDiagnosticRecord }
 */
export function resultFromRecord(record, plan) {
  if (!record) return null;
  const d = record.diagnosis || null;
  const summary = d
    ? { headline: d.headline || null, keyInsight: d.keyInsight || null }
    : (plan?.summary || {});
  const groundTruth = d
    ? { strengths: d.strengths || [], weaknesses: d.weaknesses || [] }
    : { strengths: plan?.strengths || [], weaknesses: plan?.weaknesses || [] };
  const errorPatterns = d ? (d.errorPatterns || {}) : {};
  return {
    scoreBand: record.scoreBand || null,
    plan: { summary },
    groundTruth,
    diagReport: { errorPatterns },
    miniDiagnosticRecord: record,
  };
}

/**
 * Pull the display model out of the finish-pipeline result. Pure; everything
 * here was already computed upstream — we only select and shape it.
 */
function buildView(result) {
  if (!result) return null;
  const gt = result.groundTruth || {};
  const dr = result.diagReport || {};
  const summary = (result.plan && result.plan.summary) || {};
  const ep = dr.errorPatterns || {};
  const counts = ep.counts || {};

  // Only the error types that actually occurred, biggest first.
  const errorBreakdown = Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([type, n]) => ({
      type,
      count: n,
      label: ERROR_TYPE_LABELS[type] || type,
      color: ERROR_TYPE_COLORS[type] || colors.text.tertiary,
    }))
    .sort((a, b) => b.count - a.count);

  const focus = (gt.weaknesses || []).slice(0, 4).map((w) => ({
    name: w.skill || w.name || 'This skill',
    sentence: formatDiagnosticSentence(w),
    accuracy: typeof w.accuracy === 'number' ? Math.round(w.accuracy) : null,
  }));

  const strengths = (gt.strengths || []).slice(0, 3).map((s) => ({
    name: s.skill || s.name || 'This skill',
    accuracy: typeof s.accuracy === 'number' ? Math.round(s.accuracy) : null,
  }));

  return {
    // Focus-weighted (check-in) bands over-sample weaknesses — showing that
    // range as "Estimated starting range" reads as a score DROP right after
    // two weeks of studying. The check-in results lead with the diagnosis.
    band: result?.miniDiagnosticRecord?.scoreBandFocusWeighted ? null : (result.scoreBand || null),
    headline: summary.headline || null,
    keyInsight: summary.keyInsight || null,
    totalWrong: ep.totalWrong || 0,
    errorBreakdown,
    strengths,
    focus,
  };
}

/**
 * Mount either straight off the finish pipeline (`result`) or from persisted
 * state (`record` + `plan`, the dashboard's "View your diagnosis" path).
 * `onBack` adds a back link above the title for the re-opened case.
 */
/**
 * Legacy "by domain" rows for records that predate the sitting snapshot
 * (no per-question detail exists for them — only per-domain correct/total).
 */
const SAT_DOMAIN_NAMES = {
  'information-and-ideas': 'Information and Ideas',
  'craft-and-structure': 'Craft and Structure',
  'expression-of-ideas': 'Expression of Ideas',
  'standard-english-conventions': 'Standard English Conventions',
  algebra: 'Algebra',
  'advanced-math': 'Advanced Math',
  'problem-solving-and-data-analysis': 'Problem Solving & Data Analysis',
  'geometry-and-trigonometry': 'Geometry & Trigonometry',
};

function LegacyDomainSection({ domains }) {
  const sections = [
    { key: 'rw', label: 'Reading & Writing', rows: domains?.rw || {} },
    { key: 'math', label: 'Math', rows: domains?.math || {} },
  ].map((sec) => ({
    ...sec,
    rows: Object.entries(sec.rows)
      .map(([id, v]) => ({ id, name: SAT_DOMAIN_NAMES[id] || DOMAIN_DISPLAY_NAMES[id] || id.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), correct: v.correct || 0, total: v.total || 0, accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0 }))
      .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total),
  })).filter((sec) => sec.rows.length > 0);
  if (sections.length === 0) return null;
  const barColor = (p) => (p < 25 ? '#D9483B' : p < 50 ? '#C98A12' : p < 75 ? '#7C5CC7' : '#5A8A16');
  return (
    <div style={sectionStyle}>
      <h3 style={{ ...sectionHeadingStyle, color: colors.text.primary }}>By domain</h3>
      {sections.map((sec) => (
        <div key={sec.key} style={{ marginBottom: spacing.md }}>
          <div style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.secondary, marginBottom: '6px' }}>{sec.label}</div>
          {sec.rows.map((r) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: '6px' }}>
              <span style={{ flex: '0 0 220px', fontSize: typography.sizes.sm, color: colors.text.primary }}>{r.name}</span>
              <span style={{ flex: 1, height: '8px', background: colors.surface.gray, borderRadius: '4px', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${r.accuracy}%`, background: barColor(r.accuracy), borderRadius: '4px' }} />
              </span>
              <span style={{ flex: '0 0 44px', textAlign: 'right', fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>{r.accuracy}%</span>
              <span style={{ flex: '0 0 36px', textAlign: 'right', fontSize: typography.sizes.xs, color: colors.text.tertiary }}>{r.correct}/{r.total}</span>
            </div>
          ))}
        </div>
      ))}
      <p style={{ fontSize: typography.sizes.xs, color: colors.text.tertiary, margin: 0, lineHeight: 1.5 }}>
        Question-by-question detail is kept for diagnostics taken from now on — this sitting predates that, so only its domain totals survive.
      </p>
    </div>
  );
}

/**
 * @param {object|null} sitting  { test, answers, diagnosticData } from diagnosticSittingLoader — unlocks the full report
 * @param {'idle'|'loading'|'ready'|'missing'|'error'} sittingStatus
 * @param {(moduleIndex:number)=>void|null} onReviewQuestions  opens the review runner on the sitting
 */
export default function MiniDiagnosticResults({ result: liveResult, record = null, plan = null, user, onViewPlan, onBack = null, backLabel = 'Back to Home', onEditGoals = null, onUpdateTestDate = null, onUpdateTestDates = null, onStartPracticeTest = null, sitting = null, sittingStatus = 'idle', onReviewQuestions = null }) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const result = useMemo(
    () => liveResult || resultFromRecord(record, plan),
    [liveResult, record, plan],
  );
  const view = useMemo(() => buildView(result), [result]);
  // The nuance layer: what the band + target + date imply that the numbers
  // alone don't say (goal already met → raise it; date passed; steep climb;
  // thin sitting). Computed live so it tracks the current profile.
  const nuances = useMemo(() => {
    const rec = result?.miniDiagnosticRecord || {};
    return buildDiagnosisNuances({
      band: result?.scoreBand || null,
      officialScore: getLatestOfficialScore(user?.scoreReports)?.composite ?? null,
      targetScore: user?.targetScore ?? null,
      testDate: user?.testDate ?? null,
      scoreReports: user?.scoreReports ?? null,
      answeredCount: rec.answeredCount ?? null,
      totalCount: rec.totalCount ?? null,
      isCheckin: rec.diagnosticVariant === 'checkin' || !!rec.scoreBandFocusWeighted,
    });
  }, [result, user?.targetScore, user?.testDate, user?.scoreReports]);
  const hasTargetNuance = nuances.some((n) => TARGET_NUANCE_KINDS.has(n.kind));
  const handleNuanceAction = (action) => {
    if (!action) return;
    if (action.kind === 'practiceTest') {
      if (typeof onStartPracticeTest === 'function') onStartPracticeTest();
      return;
    }
    // The test date is edited right here (inline picker); the target still
    // lives on Profile.
    if (action.kind === 'testDate' && (typeof onUpdateTestDates === 'function' || typeof onUpdateTestDate === 'function')) {
      setDatePickerOpen((v) => !v);
      return;
    }
    if (typeof onEditGoals === 'function') onEditGoals(action.kind);
  };
  const actionAvailable = (action) => {
    if (!action) return false;
    if (action.kind === 'practiceTest') return typeof onStartPracticeTest === 'function';
    if (action.kind === 'testDate') return typeof onUpdateTestDates === 'function' || typeof onUpdateTestDate === 'function' || typeof onEditGoals === 'function';
    return typeof onEditGoals === 'function';
  };
  // Question count comes from the record (Diagnostic v2 serves 40 full / 18
  // check-in; the legacy shell served 24) — never hardcode it.
  const questionCount = result?.miniDiagnosticRecord?.totalCount || 24;
  // A check-in isn't a starting point — the student is weeks into a plan and
  // this sitting re-tunes it. "Starting point" copy here would read as the
  // plan resetting on them.
  const isCheckin = result?.miniDiagnosticRecord?.diagnosticVariant === 'checkin';
  if (!view) return null;
  const { band, headline, keyInsight, totalWrong, errorBreakdown, strengths, focus } = view;
  const maxCount = errorBreakdown[0]?.count || 1;
  // The full report (from the sitting snapshot) replaces the lean error bars
  // and needs the wider column; the lean screen keeps its reading width.
  const hasSitting = !!(sitting && sittingStatus === 'ready');
  const wide = hasSitting || sittingStatus === 'loading';

  return (
    <div style={{ marginTop: '5vh', maxWidth: wide ? '880px' : '640px', width: '100%', animation: 'fadeInUp 400ms ease', paddingBottom: spacing.xl }}>
      {typeof onBack === 'function' && (
        <button
          type="button"
          onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: spacing.lg, padding: 0, border: 'none', background: 'none', cursor: 'pointer', fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.secondary }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          {backLabel}
        </button>
      )}
      <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.text.primary, marginBottom: spacing.xs, textAlign: 'center' }}>
        {isCheckin
          ? (user?.firstName ? `Your progress check, ${user.firstName}` : 'Your progress check')
          : (user?.firstName ? `Your starting point, ${user.firstName}` : 'Your starting point')}
      </h1>
      <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary, textAlign: 'center', margin: `0 auto ${spacing.xl}`, maxWidth: '52ch', lineHeight: 1.5 }}>
        {isCheckin
          ? <>Based on {questionCount} questions aimed at your current focus areas. Your plan has been re-tuned around what this found.</>
          : <>Based on {questionCount} questions &mdash; a first read your first full practice test will sharpen. Here&rsquo;s exactly what it found.</>}
      </p>

      {/* Where you stand — score band + the goal-gap headline */}
      {band && (
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.secondary, marginBottom: spacing.xs }}>
            Estimated starting range
          </div>
          <div style={{ fontSize: '44px', fontWeight: typography.weights.bold, color: colors.accent.orange, lineHeight: 1.1 }}>
            {band.low}&ndash;{band.high}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: spacing.lg, marginTop: spacing.sm, fontSize: typography.sizes.sm, color: colors.text.secondary }}>
            <span>Reading &amp; Writing {band.rwBand.low}&ndash;{band.rwBand.high}</span>
            <span>Math {band.mathBand.low}&ndash;{band.mathBand.high}</span>
          </div>
          {headline && !hasTargetNuance && (
            <div style={{ marginTop: spacing.md, paddingTop: spacing.md, borderTop: `1px solid ${colors.surface.gray}`, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, lineHeight: 1.5 }}>
              <MathText>{headline}</MathText>
            </div>
          )}
        </div>
      )}

      {/* Worth knowing — the nuances the band alone hides. Each carries a
          real next action (raise the target, fix the date, take a full test). */}
      {nuances.length > 0 && (
        <div style={sectionStyle}>
          <h3 style={{ ...sectionHeadingStyle, color: colors.text.primary }}>Worth knowing</h3>
          {nuances.map((n) => (
            <div key={n.kind} style={{ ...cardStyle, padding: spacing.lg, marginBottom: spacing.sm }}>
              <div style={{ fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.text.tertiary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                {n.eyebrow}
              </div>
              <div style={{ fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.text.primary, marginBottom: '4px' }}>
                {n.title}
              </div>
              <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, lineHeight: 1.5, margin: 0 }}>
                {n.message}
              </p>
              {actionAvailable(n.action) && (
                <button
                  type="button"
                  onClick={() => handleNuanceAction(n.action)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: spacing.sm, padding: 0, border: 'none', background: 'none', cursor: 'pointer', fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.accent.orange }}
                >
                  {n.action.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              )}
              {n.action?.kind === 'testDate' && datePickerOpen && (typeof onUpdateTestDates === 'function' || typeof onUpdateTestDate === 'function') && (
                <TestDatePicker
                  selected={getUserTestDates(user)}
                  allowClear
                  onChange={(dates) => (typeof onUpdateTestDates === 'function' ? onUpdateTestDates(dates) : onUpdateTestDate(dates[0] || null))}
                  onDone={() => setDatePickerOpen(false)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* What matters most — the single most important finding */}
      {keyInsight && (
        <div style={{ ...cardStyle, background: colors.accent.orangeLight, border: `1px solid ${colors.accent.orange}33` }}>
          <div style={{ fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.accent.orange, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: spacing.xs }}>
            What matters most
          </div>
          <div style={{ fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.text.primary, marginBottom: '4px' }}>
            <MathText>{keyInsight.title}</MathText>
          </div>
          <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, lineHeight: 1.5, margin: 0 }}>
            <MathText>{keyInsight.message}</MathText>
          </p>
        </div>
      )}

      {/* Full report from the sitting snapshot (diagnostics from 2026-08-24 on) */}
      {hasSitting && (
        <div style={{ marginBottom: spacing.xl }}>
          <DiagnosticSittingDetail sitting={sitting} user={user} onReviewQuestions={onReviewQuestions} />
        </div>
      )}
      {sittingStatus === 'loading' && (
        <div style={{ ...cardStyle, textAlign: 'center', color: colors.text.secondary, fontSize: typography.sizes.sm }} role="status">
          Loading your full report&hellip;
        </div>
      )}
      {sittingStatus === 'error' && (
        <div style={{ ...cardStyle, color: colors.text.secondary, fontSize: typography.sizes.sm }} role="alert">
          Couldn&rsquo;t load the full report right now. The summary below is still accurate.
        </div>
      )}
      {sittingStatus === 'missing' && result?.miniDiagnosticRecord?.domains && (
        <LegacyDomainSection domains={result.miniDiagnosticRecord.domains} />
      )}

      {/* Why you missed — error-type breakdown (the "why", visualized).
          Superseded by the full report's section when the sitting exists. */}
      {!hasSitting && errorBreakdown.length > 0 && (
        <div style={sectionStyle}>
          <h3 style={{ ...sectionHeadingStyle, color: colors.text.primary }}>Why you missed what you missed</h3>
          <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, margin: `0 0 ${spacing.sm}` }}>
            Your {totalWrong} {totalWrong === 1 ? 'miss' : 'misses'}, by cause:
          </p>
          {errorBreakdown.map((e) => (
            <div key={e.type} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: '8px' }}>
              <span style={{ flex: '0 0 132px', fontSize: typography.sizes.sm, color: colors.text.primary }}>{e.label}</span>
              <span style={{ flex: 1, height: '8px', background: colors.surface.gray, borderRadius: '4px', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${Math.round((e.count / maxCount) * 100)}%`, background: e.color, borderRadius: '4px' }} />
              </span>
              <span style={{ flex: '0 0 18px', fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary, textAlign: 'right' }}>{e.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Looking strong */}
      {strengths.length > 0 && (
        <div style={sectionStyle}>
          <h3 style={{ ...sectionHeadingStyle, color: colors.accent.green }}>Looking strong</h3>
          {strengths.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, padding: `${spacing.xs} 0` }}>
              <span style={{ fontSize: typography.sizes.base, color: colors.text.primary }}>{s.name}</span>
              {s.accuracy != null && <span style={chip(colors.accent.green)}>{s.accuracy}%</span>}
            </div>
          ))}
        </div>
      )}

      {/* Where to focus first — each with the editorial "why" */}
      {focus.length > 0 && (
        <div style={sectionStyle}>
          <h3 style={{ ...sectionHeadingStyle, color: colors.accent.purple }}>Where to focus first</h3>
          {focus.map((f, i) => (
            <div key={i} style={{ marginBottom: spacing.sm }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: '2px' }}>
                <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary }}>{f.name}</span>
                {f.accuracy != null && <span style={chip(colors.accent.purple)}>{f.accuracy}%</span>}
              </div>
              {f.sentence && (
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, lineHeight: 1.45, margin: 0 }}>
                  <MathText>{f.sentence}</MathText>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <Button variant="primary" onClick={onViewPlan} style={{ width: '100%', fontSize: typography.sizes.md, marginTop: spacing.sm }}>
        {isCheckin ? 'See my updated plan' : 'See my starter plan'}
      </Button>
    </div>
  );
}
