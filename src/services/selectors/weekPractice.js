/**
 * weekPractice.js — the Monday-to-Sunday view of the current calendar week
 * for the Study Plan "This week" strip: which days the student practiced,
 * which is today, which are still ahead. Pure; feeds <WeekPracticeStrip>.
 */

const LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function localDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Build the seven-day strip for the calendar week containing `today`.
 * Use it wherever the student needs "how is my week going" at a glance.
 *
 * @param {Set<string>|string[]|null|undefined} practicedDays  YYYY-MM-DD keys (local)
 * @param {Date} [today]
 * @returns {{
 *   days: Array<{key:string, letter:string, name:string, date:number, state:'done'|'today'|'today-done'|'missed'|'upcoming'}>,
 *   done: number,      // practiced days so far this week (Mon..today)
 *   elapsed: number,   // days elapsed this week including today (1..7)
 *   todayDone: boolean,
 *   streak: number     // consecutive practiced days ending today (or yesterday if today isn't done yet), within this week
 * }}
 */
export function getWeekPractice(practicedDays, today = new Date()) {
  const set = practicedDays instanceof Set ? practicedDays : new Set(Array.isArray(practicedDays) ? practicedDays : []);
  const todayKey = localDateKey(today);
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const offset = (monday.getDay() + 6) % 7; // Mon=0 … Sun=6
  monday.setDate(monday.getDate() - offset);

  const days = [];
  let done = 0;
  let todayDone = false;
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const key = localDateKey(d);
    const practiced = set.has(key);
    let state;
    if (key === todayKey) {
      state = practiced ? 'today-done' : 'today';
      todayDone = practiced;
    } else if (i < offset) {
      state = practiced ? 'done' : 'missed';
    } else {
      state = 'upcoming';
    }
    if (practiced && i <= offset) done += 1;
    days.push({ key, letter: LETTERS[i], name: NAMES[i], date: d.getDate(), state });
  }

  let streak = 0;
  for (let i = todayDone ? offset : offset - 1; i >= 0; i -= 1) {
    if (days[i].state === 'done' || days[i].state === 'today-done') streak += 1;
    else break;
  }

  return { days, done, elapsed: offset + 1, todayDone, streak };
}
