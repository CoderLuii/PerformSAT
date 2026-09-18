/**
 * TestDatePicker — inline manager for the student's SAT dates (plural: most
 * students register for two sittings at once). Shows the next official
 * College Board sittings (src/data/satTestDates — the single source of
 * truth) as toggle chips with their registration state, the student's
 * chosen dates as a removable list (past ones read "taken"), a native date
 * input for a school-day or later sitting, and "clear all" for a student
 * who's done. Renders IN PLACE wherever a "change your test date" action
 * lives (Home hero, diagnosis screen, score prompt) — never a trip to
 * Profile. Every change calls onChange with the FULL list.
 *
 * @param {object} props
 * @param {string[]} props.selected       current 'YYYY-MM-DD' list
 * @param {(dates:string[])=>void} props.onChange
 * @param {()=>void} [props.onDone]
 * @param {boolean} [props.allowClear=false]
 * @param {Date} [props.today]
 * @param {string} [props.title]
 */
import React, { useMemo, useState } from 'react';
import './TestDatePicker.css';
import { getUpcomingSATDates, formatSatChipLabel } from '../data/satTestDates';
import { parseLocalDate } from '../utils/localDate';
import { normalizeTestDates, todayKey } from '../services/selectors/testDates';

function longLabel(dateStr) {
  const d = parseLocalDate(dateStr);
  return d ? d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }) : dateStr;
}

export default function TestDatePicker({ selected = [], onChange, onDone = null, allowClear = false, today = new Date(), title = 'Your SAT dates' }) {
  const upcoming = useMemo(() => getUpcomingSATDates(today).slice(0, 6), [today]);
  const [custom, setCustom] = useState('');
  const todayStr = useMemo(() => todayKey(today), [today]);
  const chosen = useMemo(() => normalizeTestDates(selected), [selected]);
  const has = (d) => chosen.includes(d);
  const toggle = (d) => onChange(has(d) ? chosen.filter((x) => x !== d) : [...chosen, d]);
  const remove = (d) => onChange(chosen.filter((x) => x !== d));
  const customValid = /^\d{4}-\d{2}-\d{2}$/.test(custom) && custom >= todayStr && !has(custom);

  return (
    <div className="tdp" role="group" aria-label={title}>
      <div className="tdp-title">{title}</div>
      <p className="tdp-hint">Pick every sitting you&rsquo;re registered for or aiming at — the plan paces toward the next one.</p>
      {chosen.length > 0 && (
        <>
          <div className="tdp-label">Chosen</div>
          <div className="tdp-chosen">
            {chosen.map((d) => {
              const past = d < todayStr;
              return (
                <span key={d} className={`tdp-chosen-item${past ? ' is-past' : ''}`}>
                  <span className="tdp-chosen-date">{formatSatChipLabel(d)}</span>
                  {past && <span className="tdp-chosen-sub">taken</span>}
                  <button type="button" className="tdp-chosen-remove" aria-label={`Remove ${longLabel(d)}`} onClick={() => remove(d)}>×</button>
                </span>
              );
            })}
          </div>
        </>
      )}
      {upcoming.length > 0 && (
        <>
          <div className="tdp-label">Official dates</div>
          <div className="tdp-chips">
            {upcoming.map((sat) => {
              const on = has(sat.date);
              const regPast = sat.regDeadline && sat.regDeadline < todayStr;
              const latePast = sat.lateDeadline && sat.lateDeadline < todayStr;
              const sub = latePast
                ? 'Registration closed'
                : regPast
                  ? `Late reg. by ${formatSatChipLabel(sat.lateDeadline)}`
                  : sat.regDeadline
                    ? `Register by ${formatSatChipLabel(sat.regDeadline)}`
                    : 'Date anticipated';
              return (
                <button
                  key={sat.date}
                  type="button"
                  className={`tdp-chip${on ? ' is-selected' : ''}`}
                  aria-pressed={on}
                  onClick={() => toggle(sat.date)}
                  title={longLabel(sat.date)}
                >
                  <span className="tdp-chip-date">{on ? '✓ ' : ''}{formatSatChipLabel(sat.date)}</span>
                  <span className={`tdp-chip-sub${latePast ? ' is-closed' : ''}`}>{sub}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
      <div className="tdp-label">{upcoming.length > 0 ? 'Or add a different date (school-day SAT, later sitting)' : 'Add a test date'}</div>
      <div className="tdp-custom">
        <input
          type="date"
          className="tdp-input"
          value={custom}
          min={todayStr}
          onChange={(e) => setCustom(e.target.value)}
          aria-label="Custom test date"
        />
        <button type="button" className="tdp-btn tdp-btn-primary" disabled={!customValid} onClick={() => { onChange([...chosen, custom]); setCustom(''); }}>
          Add this date
        </button>
      </div>
      <div className="tdp-foot">
        {allowClear && chosen.length > 0 ? (
          <button type="button" className="tdp-btn tdp-btn-text" onClick={() => onChange([])}>
            I'm done with the SAT — clear all dates
          </button>
        ) : <span />}
        {typeof onDone === 'function' && (
          <button type="button" className="tdp-btn tdp-btn-secondary" onClick={onDone}>Done</button>
        )}
      </div>
    </div>
  );
}
