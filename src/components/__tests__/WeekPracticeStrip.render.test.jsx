global.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import WeekPracticeStrip from '../WeekPracticeStrip';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}
const THU = new Date(2026, 7, 27, 9);

describe('WeekPracticeStrip', () => {
  it('renders seven day tiles with states and a progress caption', () => {
    const { container, unmount } = mount(<WeekPracticeStrip practicedDays={new Set(['2026-08-24', '2026-08-26', '2026-08-27'])} today={THU} />);
    const tiles = [...container.querySelectorAll('.wps-day')];
    expect(tiles).toHaveLength(7);
    expect(tiles.map((t) => t.className.replace('wps-day ', ''))).toEqual(['is-done', 'is-missed', 'is-done', 'is-today-done', 'is-upcoming', 'is-upcoming', 'is-upcoming']);
    expect(tiles[3].getAttribute('aria-current')).toBe('date');
    expect(container.querySelector('.wps-caption').textContent).toBe('3 of 4 days so far · today is in.');
    unmount();
  });
  it('invites the first practice when the week is empty', () => {
    const { container, unmount } = mount(<WeekPracticeStrip practicedDays={new Set()} today={THU} />);
    expect(container.querySelector('.wps-caption').textContent).toBe('No sparks yet this week. Today counts.');
    expect(container.querySelectorAll('.wps-day.is-done')).toHaveLength(0);
    unmount();
  });
});
