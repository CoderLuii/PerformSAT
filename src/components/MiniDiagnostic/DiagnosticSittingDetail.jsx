/**
 * DiagnosticSittingDetail — the FULL report for a diagnostic sitting, rebuilt
 * from its persisted snapshot (questions + answers + telemetry) by running the
 * same engine the post-test report runs (runDiagnostic → adapter → unified
 * narrative), and rendered in the same trx vocabulary (FindingCard,
 * SectionHeader, Domains & Skills rows) so the diagnostic's diagnosis reads
 * like the practice-test one instead of a thin summary.
 *
 * Numbered sections, structure rendered (never prose walls):
 *   ① Your Diagnosis      — thesis + finding cards + bottom line
 *   ② Domains & Skills    — section → domain → skill accuracy, points on the table
 *   ③ Why You Missed      — error-type breakdown with the questions behind each
 *   ④ How You Took It     — behavior findings + pacing / clock / changes / stamina
 *   ⑤ By Difficulty       — easy / medium / hard
 *   ⑥ Every Question      — the full item table, click-through to the review runner
 *   ⑦ Test-Taker Profile  — mistake fingerprint archetype + traits
 *
 * Deliberately never shows the engine's scaled point score: a 40-item
 * adaptive sitting reports a BAND (the parent renders it), never a number.
 * Diagnostic, not prescriptive — no tips here; those live in the study plan.
 */
import React, { useMemo, useState } from 'react';
import '../TestResults.css';
import { MathText } from '../MathText';
import { runDiagnostic, ERROR_TYPE_LABELS, ERROR_TYPE_COLORS } from '../../services/diagnosticEngine';
import { adaptDiagnosticForUI, buildUnifiedReport, buildNarrativeFlow } from '../../services/scoring/diagnosticAdapter';
import { buildDomainSkillTable } from '../../services/selectors/domainSkillTable';
import { sectionModuleShort, sectionModuleLabel } from '../../services/selectors/moduleLabel';
import { EmphasizedProse, FindingCard, SectionHeader, canonKey } from '../results/ReportPieces';
import { buildScannable } from '../../services/scoring/scannableProse';

// A diagnostic reports a BAND, never a point score — so any finding that
// restates the engine's hidden scaled score ("80 points below your target of
// 1300") is dropped, not just the ones TestResults drops.
const SCORE_RESTATE_RE = /^(you scored|you'?re (at|scoring|currently) ?\d|your score|you got \d+\/|you are \d+ points|your percentile|scoring at the \d+)|\d+ points (below|above|from|past|to) your (target|goal)|your (target|goal) of \d+|scored? (of )?\d{3,4}\b/i;

/** "1m 05s" / "48s". */
export function formatSeconds(s) {
  if (!Number.isFinite(s) || s <= 0) return '0s';
  if (s < 60) return `${Math.round(s)}s`;
  const m = Math.floor(s / 60);
  const ss = Math.round(s % 60);
  return `${m}m ${String(ss).padStart(2, '0')}s`;
}

const DIFF_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
const barColor = (p) => (p < 25 ? 'var(--trx-red)' : p < 50 ? 'var(--trx-amber)' : p < 75 ? 'var(--trx-purple)' : 'var(--trx-lime-deep)');

/**
 * Run the engine on a rebuilt sitting and shape everything the sections
 * render. Pure; exported for tests.
 *
 * @param {{test:object, answers:object, diagnosticData:object|null}} sitting
 * @param {object} user
 * @returns {{diag:object, blocks:Array, table:object|null, questions:Array, skillNames:Object}|null}
 */
export function buildSittingReport(sitting, user = {}) {
  if (!sitting?.test?.modules?.length) return null;
  const diagnosticData = sitting.diagnosticData || { questionDetails: {} };
  const diag = runDiagnostic(
    sitting.test,
    sitting.answers || {},
    diagnosticData,
    {},
    { targetScore: user?.targetScore, testDate: user?.testDate, currentScore: user?.currentScore },
    {},
  );
  const ui = adaptDiagnosticForUI(diag, diagnosticData);
  const uni = ui?.report ? buildUnifiedReport(ui.report) : null;
  const narrative = uni ? buildNarrativeFlow(uni) : null;
  const blocks = narrative?.blocks || [];

  const skillNames = {};
  (diag.skillAnalysis?.allSkills || []).forEach((s) => { if (s?.skillId) skillNames[s.skillId] = s.name || s.skillId; });
  const domainNames = {};
  (diag.domainAnalysis || []).forEach((d) => { if (d?.domain) domainNames[d.domain] = d.displayName || d.domain; });
  const qa = Array.isArray(diag.questionAnalysis) ? diag.questionAnalysis : [];
  const table = qa.length ? buildDomainSkillTable(qa, { skillNames, domainNames }) : null;

  const skillLabel = (q) => {
    const id = Array.isArray(q.skills) && q.skills[0] ? q.skills[0] : null;
    return id ? (skillNames[id] || id.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())) : '—';
  };
  const questions = qa
    .slice()
    .sort((a, b) => (a.moduleIndex - b.moduleIndex) || (a.questionIndex - b.questionIndex))
    .map((q) => {
      const blank = q.userAnswer === undefined || q.userAnswer === null || q.userAnswer === '';
      return {
        key: q.key,
        moduleIndex: q.moduleIndex,
        label: `${sectionModuleShort(q.section, q.moduleIndex)} Q${q.questionIndex + 1}`,
        skill: skillLabel(q),
        difficulty: DIFF_LABEL[q.difficulty] || '—',
        result: q.isCorrect ? 'correct' : blank ? 'blank' : 'wrong',
        timeSpent: q.timeSpent || 0,
        errorType: (!q.isCorrect && !blank && q.errorType) ? (ERROR_TYPE_LABELS[q.errorType] || q.errorType) : null,
        errorColor: q.errorType ? (ERROR_TYPE_COLORS[q.errorType] || null) : null,
        changed: q.answerChangeCount > 0,
        marked: !!q.markedForReview,
      };
    });

  return { diag, blocks, table, questions, skillNames };
}

const th = { textAlign: 'left', fontSize: '10.5px', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--trx-text-3)', padding: '0 10px 10px 0', whiteSpace: 'nowrap' };
const td = { fontSize: '13.5px', color: 'var(--trx-text)', padding: '9px 10px 9px 0', borderTop: '1px solid var(--trx-line)', verticalAlign: 'top' };
const RESULT_STYLE = {
  correct: { label: 'Correct', color: 'var(--trx-lime-deep)', bg: 'rgba(90,138,22,.12)' },
  wrong: { label: 'Wrong', color: 'var(--trx-red)', bg: 'rgba(217,72,59,.10)' },
  blank: { label: 'Blank', color: 'var(--trx-text-2)', bg: 'var(--trx-surface-2)' },
};

function Stat({ label, value, sub, tone }) {
  const color = tone === 'warn' ? 'var(--trx-amber)' : tone === 'good' ? 'var(--trx-lime-deep)' : 'var(--trx-text)';
  return (
    <div style={{ background: 'var(--trx-surface-2)', border: '1px solid var(--trx-line)', borderRadius: '14px', padding: '14px 16px' }}>
      <div style={{ fontFamily: 'var(--trx-display)', fontSize: '24px', fontWeight: 700, lineHeight: 1, color, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--trx-text-3)', marginTop: '8px' }}>{label}</div>
      {sub && <div style={{ fontSize: '12.5px', color: 'var(--trx-text-2)', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

function QuestionChip({ q, onClick }) {
  const inner = (
    <>
      <span style={{ fontWeight: 700, color: 'var(--trx-text)' }}>{q.label}</span>
      <span style={{ color: 'var(--trx-text-3)' }}> · </span>
      <span>{q.skill}</span>
    </>
  );
  const style = { fontSize: '12px', fontWeight: 600, padding: '5px 10px', borderRadius: '8px', background: 'var(--trx-surface-2)', border: '1px solid var(--trx-line)', color: 'var(--trx-text-2)', whiteSpace: 'nowrap', cursor: onClick ? 'pointer' : 'default', font: 'inherit' };
  return onClick
    ? <button type="button" onClick={onClick} style={style} title="Review this question">{inner}</button>
    : <span style={style}>{inner}</span>;
}

export default function DiagnosticSittingDetail({ sitting, user, onReviewQuestions = null, startNumber = 1 }) {
  const report = useMemo(() => buildSittingReport(sitting, user), [sitting, user]);
  const [openDomains, setOpenDomains] = useState(() => new Set());
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  if (!report) return null;
  const { diag, blocks, table, questions } = report;
  const getBlock = (id) => blocks.find((b) => b.id === id);
  let n = startNumber - 1;
  const num = () => ++n;

  const review = typeof onReviewQuestions === 'function' ? (moduleIndex) => onReviewQuestions(moduleIndex ?? 0) : null;
  const byKey = new Map(questions.map((q) => [q.key, q]));

  // ── ① Your Diagnosis ──
  const context = getBlock('context');
  const thesis = context?.narrative?.thesis || null;
  const thesisCanon = canonKey(thesis);
  const findingPoints = (context?.items || []).filter((pt) => {
    const text = (typeof pt === 'string' ? pt : (pt && pt.text) || '').trim();
    if (!text || SCORE_RESTATE_RE.test(text)) return false;
    const k = canonKey(text).slice(0, 45);
    return !(k && thesisCanon.includes(k));
  });
  const closingCause = context?.narrative?.closingCause || null;

  // ── ③ error types ──
  const errorSummary = (diag.errorPatterns?.summary || []).filter((e) => e.count > 0);
  const totalWrong = diag.errorPatterns?.totalWrong || 0;

  // ── ④ behavior + pacing ──
  const behavior = getBlock('behaviorAmplifier');
  const behaviorItems = (behavior?.items || []).filter((it) => {
    const t = typeof it === 'string' ? it : (it && it.text) || '';
    return t.replace(/^(\(\d+\)|\d+\.)\s*/, '').trim().length > 0;
  });
  const ta = diag.timeAnalysis || {};
  const ap = diag.answerPatterns || {};
  const changes = ap.answerChanges || {};
  const dd = sitting.diagnosticData || {};
  const details = dd.questionDetails || {};
  const detailList = Object.values(details);
  const markedCount = detailList.filter((d) => d.markedForReview).length;
  const calcCount = detailList.filter((d) => d.usedCalculator).length;
  const moduleClocks = Object.entries(dd.moduleTimeRemaining || {})
    .map(([idx, left]) => ({ idx: Number(idx), left: Number(left) }))
    .filter((m) => Number.isFinite(m.idx) && Number.isFinite(m.left))
    .sort((a, b) => a.idx - b.idx)
    .map((m) => ({ ...m, label: sectionModuleLabel(sitting.test.modules[m.idx]?.section ?? null, m.idx) }));
  const quarters = diag.stamina?.hasData ? (diag.stamina.quarters || []) : [];
  const navLabel = { linear: 'Straight through', 'strategic-skip': 'Skipped and came back', jumping: 'Jumped around' }[dd.navigationPattern] || null;

  // ── ⑤ difficulty ──
  const levels = diag.difficultyAnalysis?.levels || {};
  const diffRows = ['easy', 'medium', 'hard'].map((k) => ({ k, label: DIFF_LABEL[k], ...(levels[k] || { correct: 0, total: 0, accuracy: 0, avgTime: 0 }) })).filter((r) => r.total > 0);

  // ── ② points on the table ──
  const levers = (diag.scoreProjection?.domainProjections || []).filter((d) => d.projectedPointGain > 0).slice(0, 3);

  // ── ⑦ profile ──
  const fp = diag.mistakeFingerprint || null;
  const traits = (fp?.traits || []).slice(0, 4);

  const visibleQuestions = showAllQuestions ? questions : questions.filter((q) => q.result !== 'correct');

  return (
    <div className="trx" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* ① YOUR DIAGNOSIS */}
      {(thesis || findingPoints.length > 0) && (
        <section>
          <SectionHeader number={num()} title="Your Diagnosis" deck="The story of this sitting — what happened, and why." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {thesis && (() => {
              const t = buildScannable(thesis) || { lead: thesis, rest: [] };
              return (
                <div className="trx-card" style={{ borderLeft: '3px solid var(--trx-purple)' }}>
                  {(t.lead || t.rest.length === 0) && (
                    <p style={{ fontFamily: 'var(--trx-display)', fontSize: '20px', fontWeight: 700, color: 'var(--trx-text)', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
                      <MathText>{t.lead || thesis}</MathText>
                    </p>
                  )}
                  {t.rest.map((para, i) => (
                    <p key={i} style={{ fontSize: '15px', color: 'var(--trx-text-2)', lineHeight: 1.6, margin: 0, marginTop: (i === 0 && t.lead) ? '10px' : i === 0 ? 0 : '8px' }}>
                      <EmphasizedProse text={para} />
                    </p>
                  ))}
                </div>
              );
            })()}
            {findingPoints.map((pt, i) => (
              <FindingCard key={i} point={pt} index={findingPoints.length > 1 ? i + 1 : null} />
            ))}
            {closingCause && (
              <div style={{ background: 'var(--trx-navy)', borderRadius: '16px', padding: '20px 26px', color: '#fff' }}>
                <div style={{ fontWeight: 700, fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: '7px' }}>The bottom line</div>
                <p style={{ fontSize: '15.5px', fontWeight: 600, lineHeight: 1.55, margin: 0 }}><MathText>{closingCause}</MathText></p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ② DOMAINS & SKILLS */}
      {table && table.sections.length > 0 && (
        <section>
          <SectionHeader number={num()} title="Domains & Skills" deck="Accuracy by section, content domain, and the individual skills inside each. Open a domain to see its skills." />
          <div className="trx-card" data-testid="sitting-domain-skills">
            {table.sections.map((sec, sIdx) => (
              <div key={sec.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: sIdx === 0 ? '0 0 12px' : '28px 0 12px' }}>
                  <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '17px', color: 'var(--trx-text)' }}>{sec.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--trx-text-3)', fontVariantNumeric: 'tabular-nums' }}>{sec.accuracy}% · {sec.correct}/{sec.total}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sec.domains.map((dom, dIdx) => {
                    const key = `${sec.section}:${dom.domainId}`;
                    const open = openDomains.has(key);
                    const isFocus = dIdx === 0 && !dom.isStrong && dom.total > 0;
                    return (
                      <div key={key} className={`ds-domain${dom.isStrong ? ' is-strong' : ''}`}>
                        <button
                          type="button"
                          className="ds-domain-row"
                          style={{ cursor: 'pointer' }}
                          aria-expanded={open}
                          onClick={() => setOpenDomains((prev) => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next; })}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--trx-text-3)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s', flex: 'none' }}><path d="m9 6 6 6-6 6" /></svg>
                          <span className="ds-domain-name">{dom.domainName}</span>
                          {isFocus && <span className="ds-tag ds-tag-focus">Focus</span>}
                          {dom.isStrong && <span className="ds-tag ds-tag-strong">Strong</span>}
                          <span className="ds-flex-spacer" />
                          <span className="ds-bar" aria-hidden="true"><span className="ds-bar-fill" style={{ width: `${dom.accuracy}%`, background: barColor(dom.accuracy) }} /></span>
                          <span className="ds-domain-pct" style={{ color: dom.isStrong ? 'var(--trx-lime-deep)' : 'var(--trx-text)' }}>{dom.accuracy}%</span>
                          <span className="ds-domain-count">{dom.correct}/{dom.total}</span>
                        </button>
                        {open && (
                          <div style={{ padding: '2px 16px 12px 38px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {dom.skills.map((sk) => (
                              <div key={sk.skillId} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                                <span style={{ color: 'var(--trx-text)', fontWeight: 600 }}>{sk.skillName}</span>
                                <span className="ds-flex-spacer" />
                                <span className="ds-bar" aria-hidden="true"><span className="ds-bar-fill" style={{ width: `${sk.accuracy}%`, background: barColor(sk.accuracy) }} /></span>
                                <span style={{ fontWeight: 800, minWidth: '42px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: sk.isStrong ? 'var(--trx-lime-deep)' : 'var(--trx-text)' }}>{sk.accuracy}%</span>
                                <span className="ds-domain-count">{sk.correct}/{sk.total}</span>
                                {review && sk.missedKeys.length > 0 && (
                                  <button type="button" onClick={() => review(sk.firstMissModuleIndex ?? 0)} style={{ font: 'inherit', fontSize: '12px', fontWeight: 700, color: 'var(--trx-orange)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                    Review {sk.misses}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {levers.length > 0 && (
            <div className="trx-card" style={{ marginTop: '12px' }}>
              <div className="trx-micro">Points on the table</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                {levers.map((l) => (
                  <div key={l.domain} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '20px', color: 'var(--trx-orange)', minWidth: '84px', fontVariantNumeric: 'tabular-nums' }}>+{l.projectedPointGain} pts</span>
                    <span style={{ fontSize: '14px', color: 'var(--trx-text-2)' }}>
                      <strong style={{ color: 'var(--trx-text)' }}>{l.domainName}</strong> — {l.questionsToFix} missed question{l.questionsToFix === 1 ? '' : 's'} at {l.currentAccuracy}% accuracy
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ③ WHY YOU MISSED */}
      {errorSummary.length > 0 && (
        <section>
          <SectionHeader number={num()} title="Why You Missed What You Missed" deck={`Your ${totalWrong} ${totalWrong === 1 ? 'miss' : 'misses'}, classified by cause — and the exact questions behind each.`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {errorSummary.map((e) => {
              const color = ERROR_TYPE_COLORS[e.type] || e.color || 'var(--trx-text-2)';
              const qs = (e.questions || []).map((q) => byKey.get(q.key)).filter(Boolean);
              return (
                <div key={e.type} className="trx-card" style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '16px', color: 'var(--trx-text)' }}>{ERROR_TYPE_LABELS[e.type] || e.label}</span>
                    <span className="ds-flex-spacer" />
                    <span className="ds-bar" style={{ flexBasis: '120px' }} aria-hidden="true"><span className="ds-bar-fill" style={{ width: `${e.percentage}%`, background: color }} /></span>
                    <span style={{ fontWeight: 800, fontSize: '15px', fontVariantNumeric: 'tabular-nums', color: 'var(--trx-text)' }}>{e.count}</span>
                    <span className="ds-domain-count">{e.percentage}%</span>
                  </div>
                  {e.description && <p style={{ fontSize: '13.5px', color: 'var(--trx-text-2)', margin: '6px 0 0', lineHeight: 1.5 }}>{e.description}</p>}
                  {qs.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {qs.map((q) => <QuestionChip key={q.key} q={q} onClick={review ? () => review(q.moduleIndex) : null} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ④ HOW YOU TOOK IT */}
      <section>
        <SectionHeader number={num()} title="How You Took the Test" deck="The habits under the clock — pacing, changes, and where the sitting sagged." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {behaviorItems.map((item, i) => <FindingCard key={i} point={item} index={null} />)}
          <div className="trx-card">
            <div className="trx-micro">Pacing</div>
            <div className="trx-kpis">
              <Stat label="Time on questions" value={formatSeconds(ta.totalTimeSeconds)} />
              <Stat label="Avg per question" value={formatSeconds(ta.avgTimePerQuestion)} />
              <Stat label="Avg when correct" value={formatSeconds(ta.avgCorrectTime)} tone="good" />
              <Stat label="Avg when wrong" value={formatSeconds(ta.avgIncorrectTime)} tone={ta.avgIncorrectTime < ta.avgCorrectTime ? 'warn' : undefined} sub={ta.avgIncorrectTime < ta.avgCorrectTime ? 'Faster than your correct answers' : undefined} />
            </div>
            {moduleClocks.length > 0 && (
              <div style={{ marginTop: '18px' }}>
                <div className="trx-micro">Clock left at the end of each module</div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, moduleClocks.length)}, 1fr)`, gap: '10px', marginTop: '10px' }}>
                  {moduleClocks.map((m) => (
                    <div key={m.idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--trx-text-2)' }}>{m.label}</span>
                      <span style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '18px', color: m.left < 60 ? 'var(--trx-amber)' : 'var(--trx-text)', fontVariantNumeric: 'tabular-nums' }}>{formatSeconds(m.left)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="trx-card">
            <div className="trx-micro">Decisions</div>
            <div className="trx-kpis">
              <Stat label="Answers changed" value={changes.total ?? 0} sub={changes.total > 0 ? `${changes.changedToCorrect ?? 0} to right, ${changes.changedToWrong ?? 0} to wrong` : undefined} tone={changes.changedToWrong > (changes.changedToCorrect ?? 0) ? 'warn' : undefined} />
              <Stat label="Marked for review" value={markedCount} />
              <Stat label="Calculator opened" value={calcCount} sub="math questions" />
              <Stat label="Path through" value={navLabel || '—'} />
            </div>
            {ap.hasPositionBias && ap.biasWarning && (
              <p style={{ fontSize: '13.5px', color: 'var(--trx-text-2)', margin: '14px 0 0', paddingLeft: '12px', borderLeft: '2.5px solid var(--trx-amber)', lineHeight: 1.5 }}>{ap.biasWarning}</p>
            )}
          </div>
          {quarters.length > 0 && (
            <div className="trx-card">
              <div className="trx-micro">Stamina — accuracy by quarter of the sitting</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${quarters.length}, 1fr)`, gap: '10px', marginTop: '12px' }}>
                {quarters.map((qt) => (
                  <div key={qt.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--trx-text-2)' }}>
                      <span>{qt.label}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatSeconds(qt.avgTime)}/q</span>
                    </div>
                    <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(0,0,0,.06)', overflow: 'hidden', margin: '6px 0' }}>
                      <div style={{ width: `${qt.accuracy}%`, height: '100%', background: barColor(qt.accuracy), borderRadius: '4px' }} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '15px', fontVariantNumeric: 'tabular-nums', color: 'var(--trx-text)' }}>{qt.accuracy}% <span className="ds-domain-count">{qt.correct}/{qt.total}</span></div>
                  </div>
                ))}
              </div>
              {Number.isFinite(ta.firstHalfAccuracy) && Number.isFinite(ta.secondHalfAccuracy) && (
                <p style={{ fontSize: '13.5px', color: 'var(--trx-text-2)', margin: '12px 0 0' }}>
                  First half <strong style={{ color: 'var(--trx-text)' }}>{ta.firstHalfAccuracy}%</strong> · second half <strong style={{ color: 'var(--trx-text)' }}>{ta.secondHalfAccuracy}%</strong>
                  {ta.fadeEffect > 0 ? ` — a ${ta.fadeEffect}-point fade.` : ' — no fade.'}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ⑤ BY DIFFICULTY */}
      {diffRows.length > 0 && (
        <section>
          <SectionHeader number={num()} title="By Difficulty" deck="Where the misses sit on the ladder — easy misses cost the most." />
          <div className="trx-diff-grid">
            {diffRows.map((r) => (
              <div key={r.k} className="trx-card" style={{ padding: '20px 22px' }}>
                <div className="trx-micro">{r.label}</div>
                <div style={{ fontFamily: 'var(--trx-display)', fontSize: '30px', fontWeight: 700, color: barColor(r.accuracy), marginTop: '8px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{r.accuracy}%</div>
                <div style={{ fontSize: '13px', color: 'var(--trx-text-2)', marginTop: '8px' }}>{r.correct}/{r.total} correct · {formatSeconds(r.avgTime)} avg</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ⑥ EVERY QUESTION */}
      {questions.length > 0 && (
        <section>
          <SectionHeader number={num()} title="Every Question" deck={`All ${questions.length} items, in the order you saw them. ${review ? 'Click a row to open it in the review runner.' : ''}`} />
          <div className="trx-card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <button type="button" onClick={() => setShowAllQuestions(false)} className={`trx-tab${!showAllQuestions ? ' on' : ''}`} style={{ font: 'inherit', background: 'none', border: 'none', borderBottom: `2px solid ${!showAllQuestions ? 'var(--trx-orange)' : 'transparent'}`, padding: '6px 2px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', color: !showAllQuestions ? 'var(--trx-text)' : 'var(--trx-text-3)' }}>Misses &amp; blanks ({questions.filter((q) => q.result !== 'correct').length})</button>
              <button type="button" onClick={() => setShowAllQuestions(true)} className={`trx-tab${showAllQuestions ? ' on' : ''}`} style={{ font: 'inherit', background: 'none', border: 'none', borderBottom: `2px solid ${showAllQuestions ? 'var(--trx-orange)' : 'transparent'}`, padding: '6px 2px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', color: showAllQuestions ? 'var(--trx-text)' : 'var(--trx-text-3)', marginLeft: '14px' }}>All {questions.length}</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={th}>Item</th><th style={th}>Skill</th><th style={th}>Difficulty</th><th style={th}>Result</th><th style={th}>Time</th><th style={th}>Cause</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleQuestions.map((q) => {
                    const rs = RESULT_STYLE[q.result];
                    return (
                      <tr key={q.key} onClick={review ? () => review(q.moduleIndex) : undefined} style={{ cursor: review ? 'pointer' : 'default' }}>
                        <td style={{ ...td, fontWeight: 700, whiteSpace: 'nowrap' }}>{q.label}{q.marked && <span title="Marked for review" style={{ marginLeft: '6px', color: 'var(--trx-amber)' }}>•</span>}</td>
                        <td style={td}>{q.skill}</td>
                        <td style={{ ...td, color: 'var(--trx-text-2)' }}>{q.difficulty}</td>
                        <td style={td}><span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '6px', color: rs.color, background: rs.bg }}>{rs.label}</span>{q.changed && <span style={{ fontSize: '11px', color: 'var(--trx-text-3)', marginLeft: '6px' }}>changed</span>}</td>
                        <td style={{ ...td, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{formatSeconds(q.timeSpent)}</td>
                        <td style={{ ...td, color: q.errorColor || 'var(--trx-text-2)', fontWeight: q.errorType ? 600 : 400 }}>{q.errorType || '—'}</td>
                      </tr>
                    );
                  })}
                  {visibleQuestions.length === 0 && (
                    <tr><td colSpan={6} style={{ ...td, color: 'var(--trx-text-2)' }}>Nothing missed — every attempted question landed.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {review && (
              <button type="button" onClick={() => review(0)} className="trx-hero-btn-primary" style={{ marginTop: '18px', font: 'inherit', cursor: 'pointer' }}>
                Review every question
              </button>
            )}
          </div>
        </section>
      )}

      {/* ⑦ PROFILE */}
      {fp?.archetypeLabel && (
        <section>
          <SectionHeader number={num()} title="Your Test-Taker Profile" deck="The pattern this sitting fits, from the shape of your misses." />
          <div className="trx-card" style={{ borderLeft: '3px solid var(--trx-orange)' }}>
            <div style={{ fontFamily: 'var(--trx-display)', fontSize: '20px', fontWeight: 700, color: 'var(--trx-text)' }}>{fp.archetypeLabel}</div>
            {fp.archetypeDescription && <p style={{ fontSize: '14.5px', color: 'var(--trx-text-2)', lineHeight: 1.6, margin: '8px 0 0' }}>{fp.archetypeDescription}</p>}
            {traits.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                {traits.map((t, i) => (
                  <span key={i} style={{ fontSize: '12px', fontWeight: 700, padding: '5px 10px', borderRadius: '8px', background: t.severity === 'high' ? 'rgba(217,72,59,.10)' : 'var(--trx-surface-2)', border: '1px solid var(--trx-line)', color: t.severity === 'high' ? 'var(--trx-red)' : 'var(--trx-text-2)' }}>{t.trait}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
