global.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ScoreReportCard from '../ScoreReportCard';
import { getScoreReportState } from '../../services/selectors/scoreReport';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}
const setVal = (input, v) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  act(() => { setter.call(input, v); input.dispatchEvent(new Event('input', { bubbles: true })); });
};
const flush = () => act(async () => { await Promise.resolve(); });
const btn = (c, text) => Array.from(c.querySelectorAll('button')).find((b) => b.textContent.includes(text));

describe('ScoreReportCard', () => {
  it('waits until release day and only offers "didn\'t take it"', async () => {
    const onRecord = jest.fn(() => Promise.resolve());
    const st = getScoreReportState({ testDate: '2026-08-22', today: new Date(2026, 7, 24) });
    const { container, unmount } = mount(<ScoreReportCard state={st} testDates={['2026-08-22']} onRecord={onRecord} onUpdateTestDates={() => {}} today={new Date(2026, 7, 24)} />);
    expect(container.textContent).toContain('Scores are expected Sep 4 — in 11 days');
    expect(btn(container, 'Save my score')).toBeUndefined();
    act(() => { btn(container, "didn’t take it").click(); });
    await flush();
    expect(onRecord).toHaveBeenCalledWith('2026-08-22', { status: 'not-taken' });
    expect(container.textContent).toContain('you skipped Aug 22');
    // No other sitting on the calendar → the date manager opens in place.
    expect(container.querySelector('.tdp')).not.toBeNull();
    unmount();
  });
  it('asks after release, validates, and saves a reported score', async () => {
    const onRecord = jest.fn(() => Promise.resolve());
    const st = getScoreReportState({ testDate: '2026-08-22', today: new Date(2026, 8, 6) });
    const { container, unmount } = mount(<ScoreReportCard state={st} onRecord={onRecord} onUpdateTestDates={() => {}} today={new Date(2026, 8, 6)} />);
    expect(container.textContent).toContain('How did it go?');
    act(() => { btn(container, 'Save my score').click(); });
    expect(container.textContent).toContain('Enter a total between 400 and 1600');
    setVal(container.querySelector('input[aria-label="Total score"]'), '1450');
    setVal(container.querySelector('input[aria-label="Reading and Writing score"]'), '700');
    setVal(container.querySelector('input[aria-label="Math score"]'), '700');
    act(() => { btn(container, 'Save my score').click(); });
    expect(container.textContent).toContain('is 1400, not 1450');
    setVal(container.querySelector('input[aria-label="Math score"]'), '750');
    act(() => { btn(container, 'Save my score').click(); });
    await flush();
    expect(onRecord).toHaveBeenCalledWith('2026-08-22', { status: 'reported', composite: 1450, rw: 700, math: 750 });
    expect(container.textContent).toContain('official score 1450');
    unmount();
  });
  it('"Prefer not to say" records a decline', async () => {
    const onRecord = jest.fn(() => Promise.resolve());
    const st = getScoreReportState({ testDate: '2026-08-22', today: new Date(2026, 8, 6) });
    const { container, unmount } = mount(<ScoreReportCard state={st} onRecord={onRecord} onUpdateTestDates={() => {}} />);
    act(() => { btn(container, 'Prefer not to say').click(); });
    await flush();
    expect(onRecord).toHaveBeenCalledWith('2026-08-22', { status: 'declined' });
    expect(container.textContent).toContain('we won’t ask again');
    unmount();
  });
  it('with another sitting already set, the follow-up names it instead of opening the picker', async () => {
    const onRecord = jest.fn(() => Promise.resolve());
    const st = getScoreReportState({ testDates: ['2026-08-22', '2026-10-03'], today: new Date(2026, 8, 6) });
    const { container, unmount } = mount(<ScoreReportCard state={st} testDates={['2026-08-22', '2026-10-03']} onRecord={onRecord} onUpdateTestDates={() => {}} />);
    act(() => { btn(container, 'Prefer not to say').click(); });
    await flush();
    expect(container.textContent).toContain('Next up: Oct 3');
    expect(container.querySelector('.tdp')).toBeNull();
    unmount();
  });
});
