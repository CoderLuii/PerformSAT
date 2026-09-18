/**
 * WeekPracticeStrip — Monday-to-Sunday practice tracker in the Home header,
 * stacked under the test-day countdown card (founder 2026-08-25: "there should
 * be something like this on the homescreen … something unique like the
 * fire; a little more playful"). Each practiced day earns a SPARK — a
 * tri-color burst in the SEVA mark's purple / orange / lime that pops in.
 * Today is an orange ring with a ghosted spark inside; days ahead are
 * hollow circles; a missed day is a soft grey circle. Deliberately its own
 * thing — no flames.
 *
 * @param {object} props
 * @param {Set<string>|string[]} props.practicedDays  YYYY-MM-DD keys
 * @param {Date} [props.today]
 * @param {'card'|'bare'|'aside'} [props.variant]  'bare' = no card chrome; 'aside' = stacked under the countdown card
 */
import React from 'react';
import { getWeekPractice } from '../services/selectors/weekPractice';
import './WeekPracticeStrip.css';

// Four-point star with soft concave sides, centered at (12,12) in a 24 box.
const STAR = 'M12 1C13.6 7.6 16.4 10.4 23 12C16.4 13.6 13.6 16.4 12 23C10.4 16.4 7.6 13.6 1 12C7.6 10.4 10.4 7.6 12 1Z';

function Spark({ ghost = false }) {
  if (ghost) {
    return (
      <svg className="wps-spark is-ghost" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d={STAR} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeDasharray="2.2 2" />
      </svg>
    );
  }
  return (
    <svg className="wps-spark" viewBox="0 0 40 40" width="44" height="44" aria-hidden="true">
      <g transform="translate(8 8) rotate(45 12 12) scale(1.15) translate(-1.8 -1.8)"><path d={STAR} fill="var(--wps-purple, #7C5CC7)" opacity=".92" /></g>
      <g transform="translate(8 8)"><path d={STAR} fill="var(--wps-orange, #EA580C)" /></g>
      <g transform="translate(24.5 2) scale(.55)"><path d={STAR} fill="var(--wps-lime, #C2E83A)" /></g>
      <circle cx="16.5" cy="17" r="2.4" fill="#fff" opacity=".92" />
    </svg>
  );
}

function caption({ done, elapsed, todayDone, streak }) {
  if (done === 0) return elapsed === 1 ? 'Practice today to light the first spark.' : 'No sparks yet this week. Today counts.';
  if (done === 7) return 'Seven sparks. A full week — rare air.';
  const soFar = `${done} of ${elapsed} day${elapsed === 1 ? '' : 's'} so far`;
  if (todayDone) return streak >= 3 ? `${soFar} · ${streak} in a row.` : `${soFar} · today is in.`;
  return `${soFar} · today is still open.`;
}

export default function WeekPracticeStrip({ practicedDays, today = new Date(), variant = 'card' }) {
  const week = getWeekPractice(practicedDays, today);
  return (
    <section className={`wps${variant !== 'card' ? ` is-${variant}` : ''}`} aria-label="Your week" data-testid="week-practice-strip">
      <ol className="wps-days">
        {week.days.map((d, i) => {
          const practiced = d.state === 'done' || d.state === 'today-done';
          const isToday = d.state === 'today' || d.state === 'today-done';
          const title = `${d.name} ${d.date} · ${practiced ? 'practiced' : isToday ? 'today' : d.state === 'missed' ? 'no practice' : 'ahead'}`;
          return (
            <li key={d.key} className={`wps-day is-${d.state}`} style={{ '--i': i }} title={title} aria-label={title} aria-current={isToday ? 'date' : undefined}>
              <span className="wps-day-icon" aria-hidden="true">
                {practiced ? <Spark /> : d.state === 'today' ? <Spark ghost /> : null}
              </span>
              <span className="wps-day-letter" aria-hidden="true">{d.letter}</span>
            </li>
          );
        })}
      </ol>
      <div className="wps-head">
        <span className="wps-eyebrow">Your week</span>
        <span className="wps-caption">{caption(week)}</span>
      </div>
    </section>
  );
}
