/**
 * ScoreReportCard — Home's follow-up after a test date passes. The app knows
 * when they sat the SAT and when scores come out (getScoreReleaseDate), so it
 * waits until release day, then asks — with honest ways out:
 *
 *   waiting  "Scores are expected Sep 4 — we'll ask then."  [I didn't take it]
 *   ask      total (+ optional R&W / Math)  [Save]  [Prefer not to say]  [I didn't take it]
 *
 * "I didn't take it" records status 'not-taken' and opens the inline date
 * picker right here, so the next date gets set without a trip to Profile.
 * Every outcome writes users/{uid}.scoreReports[testDate] (useAuth), so the
 * card never asks twice.
 */
import React, { useState } from 'react';
import TestDatePicker from './TestDatePicker';
import { parseLocalDate } from '../utils/localDate';

function shortDate(dateStr) {
  const d = parseLocalDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : dateStr;
}

const clampSection = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 200 && n <= 800 ? Math.round(n / 10) * 10 : null;
};

/**
 * @param {object} props
 * @param {{kind:'waiting'|'ask', testDate:string, releaseDate:string|null, daysToRelease:number|null}} props.state  getScoreReportState output
 * @param {(testDate:string, report:object)=>Promise<void>|void} props.onRecord
 * @param {(dates:string[])=>Promise<void>|void} props.onUpdateTestDates
 * @param {string[]} [props.testDates]  the student's full date list (for the next-date step)
 * @param {Date} [props.today]
 */
export default function ScoreReportCard({ state, onRecord, onUpdateTestDates, testDates = [], today = new Date() }) {
  const [total, setTotal] = useState('');
  const [rw, setRw] = useState('');
  const [math, setMath] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pickingNext, setPickingNext] = useState(false);
  const [saved, setSaved] = useState(null);
  if (!state || (state.kind !== 'ask' && state.kind !== 'waiting')) return null;

  const composite = (() => {
    const n = Number(total);
    return Number.isFinite(n) && n >= 400 && n <= 1600 ? Math.round(n / 10) * 10 : null;
  })();
  const rwN = rw === '' ? null : clampSection(rw);
  const mathN = math === '' ? null : clampSection(math);

  const submit = async (report) => {
    setBusy(true);
    setError('');
    try {
      await onRecord(state.testDate, report);
      if (report.status === 'not-taken') setPickingNext(true);
      else setSaved(report);
    } catch {
      setError("Couldn't save — try again.");
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    if (composite === null) { setError('Enter a total between 400 and 1600.'); return; }
    if ((rw !== '' && rwN === null) || (math !== '' && mathN === null)) { setError('Section scores are 200–800.'); return; }
    if (rwN !== null && mathN !== null && rwN + mathN !== composite) { setError(`R&W ${rwN} + Math ${mathN} is ${rwN + mathN}, not ${composite}.`); return; }
    const report = { status: 'reported', composite };
    if (rwN !== null) report.rw = rwN;
    if (mathN !== null) report.math = mathN;
    submit(report);
  };

  const btn = (kind) => ({
    font: 'inherit', fontSize: '13px', fontWeight: 700, borderRadius: '9px', cursor: busy ? 'default' : 'pointer', padding: '9px 14px', border: 'none',
    ...(kind === 'primary' ? { background: 'var(--hv2-orange, #ea580c)', color: '#fff' }
      : kind === 'secondary' ? { background: 'var(--hv2-surface-2, #f1eee7)', color: 'var(--hv2-text, #15171c)' }
        : { background: 'none', color: 'var(--hv2-text-2, #5b6068)', padding: '9px 4px' }),
    opacity: busy ? .6 : 1,
  });
  const input = { font: 'inherit', fontSize: '15px', fontWeight: 700, width: '92px', padding: '8px 10px', borderRadius: '9px', border: '1.5px solid var(--hv2-line, #e7e3d9)', background: '#fff', color: 'var(--hv2-text, #15171c)', fontVariantNumeric: 'tabular-nums' };
  const lbl = { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--hv2-text-3, #9a9ea6)' };

  // After any answer: if another sitting is already on the calendar, just
  // say so; otherwise offer the date manager right here.
  const nextStep = (headline) => (
    <div className="hv2-card" data-testid="score-report-card">
      <div className="hv2-eyebrow" style={{ color: 'var(--hv2-text-3)' }}>{shortDate(state.testDate)} SAT</div>
      <div style={{ fontFamily: 'var(--hv2-font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--hv2-text)', marginTop: '4px' }}>{headline}</div>
      {state.nextDate ? (
        <p style={{ fontSize: '13.5px', color: 'var(--hv2-text-2)', margin: '6px 0 0', lineHeight: 1.5 }}>
          Next up: <strong style={{ color: 'var(--hv2-text)' }}>{shortDate(state.nextDate)}</strong> — the plan is pacing toward it.
        </p>
      ) : (
        <>
          <p style={{ fontSize: '13.5px', color: 'var(--hv2-text-2)', margin: '6px 0 0', lineHeight: 1.5 }}>Taking it again? Add the next date so the plan paces toward it.</p>
          <TestDatePicker selected={testDates} today={today} allowClear onChange={(d) => onUpdateTestDates(d)} onDone={() => { setPickingNext(false); setSaved(null); }} title="Your SAT dates" />
        </>
      )}
    </div>
  );

  if (pickingNext) return nextStep(`Got it — you skipped ${shortDate(state.testDate)}.`);
  if (saved) return nextStep(saved.status === 'reported' ? `Saved — official score ${saved.composite}.` : 'Got it — we won’t ask again.');

  if (state.kind === 'waiting') {
    return (
      <div className="hv2-card" data-testid="score-report-card">
        <div className="hv2-eyebrow" style={{ color: 'var(--hv2-text-3)' }}>{shortDate(state.testDate)} SAT</div>
        <div style={{ fontFamily: 'var(--hv2-font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--hv2-text)', marginTop: '4px' }}>
          Scores are expected {shortDate(state.releaseDate)}{state.daysToRelease === 1 ? ' — tomorrow' : state.daysToRelease > 1 ? ` — in ${state.daysToRelease} days` : ''}.
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--hv2-text-2)', margin: '6px 0 12px', lineHeight: 1.5 }}>
          College Board releases scores about two weeks after test day. We&rsquo;ll ask how it went once they&rsquo;re out.
        </p>
        <button type="button" style={btn('text')} disabled={busy} onClick={() => submit({ status: 'not-taken' })}>I didn&rsquo;t take it</button>
        {error && <div role="alert" style={{ fontSize: '13px', color: 'var(--hv2-orange)', marginTop: '8px' }}>{error}</div>}
      </div>
    );
  }

  return (
    <div className="hv2-card" data-testid="score-report-card">
      <div className="hv2-eyebrow" style={{ color: 'var(--hv2-text-3)' }}>{shortDate(state.testDate)} SAT</div>
      <div style={{ fontFamily: 'var(--hv2-font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--hv2-text)', marginTop: '4px' }}>How did it go?</div>
      <p style={{ fontSize: '13.5px', color: 'var(--hv2-text-2)', margin: '6px 0 14px', lineHeight: 1.5 }}>
        Scores {state.releaseDate ? `came out ${shortDate(state.releaseDate)}` : 'should be out'}. Your official score becomes the plan&rsquo;s starting point — sections are optional.
      </p>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label style={lbl}>Total<input style={input} inputMode="numeric" placeholder="1200" value={total} onChange={(e) => setTotal(e.target.value)} aria-label="Total score" /></label>
        <label style={lbl}>R&amp;W<input style={input} inputMode="numeric" placeholder="600" value={rw} onChange={(e) => setRw(e.target.value)} aria-label="Reading and Writing score" /></label>
        <label style={lbl}>Math<input style={input} inputMode="numeric" placeholder="600" value={math} onChange={(e) => setMath(e.target.value)} aria-label="Math score" /></label>
      </div>
      {error && <div role="alert" style={{ fontSize: '13px', color: 'var(--hv2-orange)', marginTop: '10px' }}>{error}</div>}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
        <button type="button" style={btn('primary')} disabled={busy} onClick={save}>Save my score</button>
        <button type="button" style={btn('secondary')} disabled={busy} onClick={() => submit({ status: 'declined' })}>Prefer not to say</button>
        <button type="button" style={btn('text')} disabled={busy} onClick={() => submit({ status: 'not-taken' })}>I didn&rsquo;t take it</button>
      </div>
    </div>
  );
}
