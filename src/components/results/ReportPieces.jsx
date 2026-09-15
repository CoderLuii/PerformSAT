/**
 * ReportPieces — the shared render vocabulary of SEVA's diagnosis surfaces
 * (post-test TestResults and the diagnostic's re-openable report). Lifted out
 * of TestResults.jsx on 2026-08-24 so the diagnostic sitting report can use
 * the identical FindingCard / SectionHeader anatomy instead of a parallel
 * design. Bodies are unchanged from TestResults; only the export is new.
 *
 * Everything here expects to render inside a `.trx` root (TestResults.css
 * defines the --trx-* tokens there).
 */
import React from 'react';
import { MathText } from '../MathText';
import { buildScannable, emphasizeNumbers } from '../../services/scoring/scannableProse';

/**
 * Render one paragraph of prose with its numeric phrases bolded — the
 * deciding words of a diagnosis pop without breaking the sentence.
 */
export function EmphasizedProse({ text }) {
  const segs = emphasizeNumbers(text);
  if (segs.length === 0) return null;
  return segs.map((s, i) => s.bold
    ? <strong key={i} style={{ fontWeight: 700, color: 'var(--color-slate-900)' }}><MathText>{s.text}</MathText></strong>
    : <MathText key={i}>{s.text}</MathText>);
}

/**
 * Scannable finding: the first sentence renders as a bold lead the eye can
 * catch, the remaining sentences follow as short paragraphs with numbers
 * bolded inline. Same words, scannable shape (2026-07-19 layout ruling —
 * the diagnosis follows the tutor's TUTOR_LAYOUT, never book paragraphs).
 */
export function ScannableProse({ text, leadSize = '1.0625rem', bodySize = '1rem' }) {
  const s = buildScannable(text);
  if (!s) return null;
  return (
    <div>
      {s.lead && (
        <p style={{
          fontSize: leadSize, fontWeight: 650,
          color: 'var(--trx-text)', lineHeight: '1.55', margin: 0,
        }}>
          <MathText>{s.lead}</MathText>
        </p>
      )}
      {s.rest.map((para, i) => (
        <p key={i} style={{
          fontSize: bodySize, fontWeight: 400,
          color: 'var(--trx-text-2)', lineHeight: '1.65',
          margin: 0, marginTop: (i === 0 && !s.lead) ? 0 : i === 0 ? '8px' : '10px',
        }}>
          <EmphasizedProse text={para} />
        </p>
      ))}
    </div>
  );
}

export const canonKey = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]/g, '');

/** Short cost stat from an estimatedImpact string ("~30 points" → "~30 pts"). */
function shortCost(impact) {
  const m = String(impact || '').match(/([~≈+-]?\d[\d,]*(?:\s*[-–]\s*\d[\d,]*)?)\s*(?:points?|pts)/i);
  return m ? `${m[1]} pts` : null;
}

/** Semicolon-cited evidence → up to 4 short data pills. */
function evidencePills(evidence) {
  if (!evidence || typeof evidence !== 'string') return [];
  return evidence.split(';')
    .map(s => s.trim().replace(/[.]$/, ''))
    .filter(s => s.length > 1)
    .slice(0, 4)
    .map(s => (s.length > 64 ? `${s.slice(0, 61)}…` : s));
}

/**
 * One diagnosis finding as a structured card (2026-07-19, third round of
 * layout feedback — "still paragraph reading"): the AI already returns each
 * insight as claim + mechanism + impact + evidence citations, so render
 * those FIELDS in the trx design language — headline, short story, a "Why"
 * rule, a Bricolage cost stat, and the citations as data pills — instead of
 * flattening them back into prose. Voice untouched; structure visible.
 */
export function FindingCard({ point, index }) {
  const isStructured = typeof point === 'object' && point !== null;
  const claim = (isStructured ? (point.text || '') : String(point || '')).replace(/^(\(\d+\)|\d+\.)\s*/, '');
  if (!claim.trim()) return null;

  const s = buildScannable(claim) || { lead: null, rest: [claim] };
  const cost = isStructured ? shortCost(point.estimatedImpact) : null;
  const pills = isStructured ? evidencePills(point.evidence) : [];
  const mech = isStructured ? String(point.causalMechanism || '').trim() : '';
  const mechDistinct = mech.length > 15
    && !canonKey(claim).includes(canonKey(mech).slice(0, 40))
    && !canonKey(mech).includes(canonKey(claim).slice(0, 40));

  return (
    <div className="trx-card trx-finding">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {index != null && (
            <span style={{
              display: 'inline-grid', placeItems: 'center', width: '24px', height: '24px', borderRadius: '8px',
              background: 'var(--trx-purple-tint)', color: 'var(--trx-purple)',
              fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '13px', marginBottom: '10px',
            }}>{index}</span>
          )}
          {s.lead ? (
            <p style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--trx-text)', lineHeight: 1.45, margin: 0 }}>
              <MathText>{s.lead}</MathText>
            </p>
          ) : null}
          {s.rest.map((para, i) => (
            <p key={i} style={{ fontSize: '14.5px', fontWeight: 400, color: 'var(--trx-text-2)', lineHeight: 1.6, margin: 0, marginTop: (i === 0 && !s.lead) ? 0 : '8px' }}>
              <EmphasizedProse text={para} />
            </p>
          ))}
        </div>
        {cost && (
          <div style={{ flex: 'none', textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--trx-display)', fontWeight: 700, fontSize: '22px', lineHeight: 1, color: 'var(--trx-orange)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{cost}</div>
            <div style={{ fontWeight: 700, fontSize: '9.5px', letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--trx-text-3)', marginTop: '5px' }}>est. cost</div>
          </div>
        )}
      </div>
      {mechDistinct && (
        <p style={{ margin: '12px 0 0', paddingLeft: '12px', borderLeft: '2.5px solid rgba(124,92,199,.35)', fontSize: '14px', color: 'var(--trx-text-2)', lineHeight: 1.55 }}>
          <strong style={{ fontWeight: 700, color: 'var(--trx-text)' }}>Why: </strong>
          <MathText>{mech}</MathText>
        </p>
      )}
      {pills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
          {pills.map((pill, i) => (
            <span key={i} style={{
              fontSize: '11.5px', fontWeight: 600, fontVariantNumeric: 'tabular-nums',
              padding: '4px 9px', borderRadius: '7px',
              background: 'var(--trx-surface-2)', border: '1px solid var(--trx-line)', color: 'var(--trx-text-2)',
              whiteSpace: 'nowrap',
            }}>{pill}</span>
          ))}
        </div>
      )}
    </div>
  );
}


// Reusable Section Header Component. `deck` is an optional one-line editorial
// subtitle under the header — it tells the student what this section IS
// before they read it, which is most of what "organized" feels like.
export const SectionHeader = ({ number, title, deck }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: deck ? '24px' : '32px' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{
      width: '28px', height: '28px', borderRadius: '50%',
      background: 'var(--color-brand-primary)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '13px', fontWeight: '800', flexShrink: 0
    }}>
      {number}
    </div>
    <h2 style={{
      fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: '800',
      color: 'var(--color-slate-800)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0
    }}>
      {title}
    </h2>
    <div style={{ flex: 1, height: '1px', background: 'var(--color-slate-200)' }} />
  </div>
  {deck && (
    <p style={{
      fontFamily: 'var(--font-ui)', fontSize: '14px', fontStyle: 'italic',
      color: 'var(--color-slate-500)', lineHeight: '1.5', margin: 0, paddingLeft: '44px',
    }}>
      {deck}
    </p>
  )}
  </div>
);


