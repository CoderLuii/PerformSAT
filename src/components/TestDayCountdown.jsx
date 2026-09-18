/**
 * TestDayCountdown — the "N days until test" call-to-action beside the
 * greeting on Home (founder 2026-08-25: keep the placement, lose the navy
 * tile — a light, compact card in the style of a calendar widget: icon,
 * small-caps label, big day count, date chip, edit control). The whole card
 * is the button that opens the date manager, which floats below the card as
 * a popover (never in flow — founder 2026-08-25: pushing the whole dashboard
 * down was "uncomfortable"). Escape or a click outside closes it. Reads the
 * same primary date every other surface paces off.
 *
 * States: counting down · test day today · last sitting behind them with
 * nothing ahead ("add your next date") · no date at all ("pick a date").
 *
 * @param {object} props
 * @param {string|null} props.testDate      primary sitting (next upcoming, or latest past)
 * @param {string[]} [props.testDates]      every sitting
 * @param {Date} [props.today]
 * @param {()=>void} [props.onManage]       opens/closes the date manager
 * @param {boolean} [props.managing]        whether the manager is open (children render below)
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]       e.g. 'is-header' for the header placement
 */
import React, { useEffect, useRef } from 'react';
import { getDaysUntilTest } from '../services/selectors/daysUntilTest';
import { getUserTestDates, splitTestDates } from '../services/selectors/testDates';
import { SAT_TEST_DATES, formatSatChipLabel } from '../data/satTestDates';
import { parseLocalDate } from '../utils/localDate';

function longDate(dateStr) {
  const d = parseLocalDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : dateStr;
}

function CalendarGlyph() {
  return (
    <svg className="hv2-countdown-glyph" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="28" height="25" rx="6" fill="#fff" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v3H3z" fill="currentColor" />
      <path d="M11 3v6M23 3v6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="11" cy="21" r="1.7" fill="currentColor" /><circle cx="17" cy="21" r="1.7" fill="currentColor" /><circle cx="23" cy="21" r="1.7" fill="currentColor" />
      <circle cx="11" cy="26.5" r="1.7" fill="currentColor" /><circle cx="17" cy="26.5" r="1.7" fill="currentColor" />
    </svg>
  );
}

function PencilGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function TestDayCountdown({ testDate = null, testDates = null, today = new Date(), onManage = null, managing = false, children = null, className = '' }) {
  const all = getUserTestDates({ testDate, testDates });
  const { upcoming, past } = splitTestDates(all, today);
  const primary = upcoming[0] || past[past.length - 1] || null;
  const days = primary ? getDaysUntilTest(primary, today) : null;
  const official = primary ? SAT_TEST_DATES.find((s) => s.date === primary) : null;
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const regOpen = official?.regDeadline && official.regDeadline >= todayKey;
  const later = upcoming.slice(1);

  let label = 'Days until test';
  let big = null;
  let unit = '';
  let chip = primary ? formatSatChipLabel(primary) : '';
  let meta = '';
  let action = 'Change dates';
  let tone = '';
  if (!primary) {
    label = 'Test date';
    big = 'Not set';
    meta = 'Pick a sitting and the plan paces itself toward it.';
    action = 'Pick a date';
    tone = 'is-empty';
  } else if (days === 0) {
    label = 'Test day';
    big = 'Today';
    meta = 'Sleep well, eat breakfast, bring your ID and calculator.';
    tone = 'is-today';
  } else if (days > 0) {
    big = String(days);
    unit = days === 1 ? 'day' : 'days';
    meta = [
      regOpen ? `Register by ${formatSatChipLabel(official.regDeadline)}` : null,
      later.length ? `then ${later.map(formatSatChipLabel).join(', ')}` : null,
    ].filter(Boolean).join(' · ');
  } else {
    label = 'Your SAT';
    big = 'Taken';
    meta = `${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago · nothing scheduled after this one`;
    action = 'Add your next date';
    tone = 'is-taken';
  }

  const canManage = typeof onManage === 'function';
  const rootRef = useRef(null);
  useEffect(() => {
    if (!managing || !canManage) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onManage(); };
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) onManage(); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [managing, canManage, onManage]);
  const summary = !primary ? 'No test date yet' : days === 0 ? `Test day today, ${longDate(primary)}` : days > 0 ? `${big} ${unit} until your SAT on ${longDate(primary)}` : `SAT taken ${longDate(primary)}`;

  const body = (
    <>
      <span className="hv2-countdown-icon"><CalendarGlyph /></span>
      <span className="hv2-countdown-body">
        <span className="hv2-countdown-eyebrow">{label}</span>
        <span className="hv2-countdown-row">
          <span className="hv2-countdown-num">{big}</span>
          {unit && <span className="hv2-countdown-unit">{unit}</span>}
          {chip && <span className="hv2-countdown-chip">{chip}</span>}
        </span>
        {meta && <span className="hv2-countdown-meta">{meta}</span>}
      </span>
      {canManage && (
        <span className="hv2-countdown-edit" aria-hidden="true">{managing ? <CloseGlyph /> : <PencilGlyph />}</span>
      )}
    </>
  );

  return (
    <div ref={rootRef} className={`hv2-countdown${className ? ` ${className}` : ''}${tone ? ` ${tone}` : ''}${managing ? ' is-managing' : ''}`} data-testid="test-day-countdown">
      {canManage ? (
        <button type="button" className="hv2-countdown-link" onClick={onManage} aria-expanded={managing} aria-label={`${summary}. ${managing ? 'Close' : action}`}>
          {body}
          <span className="hv2-sr-only">{managing ? 'Close' : action}</span>
        </button>
      ) : (
        <div className="hv2-countdown-link is-static" role="group" aria-label={summary}>{body}</div>
      )}
      {managing && children && (
        <div className="hv2-countdown-pop" role="dialog" aria-label="Your SAT dates">{children}</div>
      )}
    </div>
  );
}
