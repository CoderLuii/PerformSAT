/**
 * CalendarMonth render — the SAT-day states: upcoming (gold star), taken
 * (green check badge, no star + "SAT taken"), and the expected score-release marker.
 */
global.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import CalendarMonth from '../CalendarMonth';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}

describe('CalendarMonth SAT-day states', () => {
  it('upcoming test: gold star, legend "SAT test day", countdown eyebrow', () => {
    const { container, unmount } = mount(<CalendarMonth practicedDays={[]} testDate="2026-08-22" today={new Date(2026, 7, 10)} />);
    const cell = container.querySelector('.cm-cell-test');
    expect(cell.classList.contains('is-past')).toBe(false);
    expect(cell.querySelector('.cm-star path').getAttribute('fill')).toBe('#F5B301');
    expect(container.textContent).toContain('SAT test day');
    expect(container.textContent).toContain('Test day in 12 days');
    unmount();
  });
  it('taken: green check badge instead of the star, "SAT taken", and the release marker with its countdown', () => {
    const { container, unmount } = mount(<CalendarMonth practicedDays={[]} testDate="2026-08-22" today={new Date(2026, 7, 24)} />);
    const cell = container.querySelector('.cm-cell-test');
    expect(cell.classList.contains('is-past')).toBe(true);
    expect(cell.querySelector('.cm-star')).toBeNull(); // a past SAT is never a (dimmed) star
    expect(cell.querySelector('.cm-taken circle')).not.toBeNull();
    expect(cell.getAttribute('title')).toBe('SAT taken');
    expect(container.querySelector('.cm-legend-taken')).not.toBeNull();
    expect(container.textContent).toContain('SAT taken');
    // Sep 4 isn't in the August grid → no release legend, eyebrow falls back to practice count.
    expect(container.querySelector('.cm-cell-release')).toBeNull();
    expect(container.textContent).toContain('0 days practiced');
    // Flip to September: the release day is marked and counted down.
    act(() => { container.querySelector('button[aria-label="Next month"]').click(); });
    const release = container.querySelector('.cm-cell-release');
    expect(release).not.toBeNull();
    expect(release.getAttribute('aria-label')).toContain('SAT scores expected');
    expect(container.textContent).toContain('Scores expected');
    expect(container.textContent).toContain('Scores expected in 11 days');
    unmount();
  });
  it('several sittings: past ones checked, upcoming gold, both legends, countdown to the next upcoming', () => {
    const { container, unmount } = mount(<CalendarMonth practicedDays={[]} testDate="2026-10-03" testDates={['2026-08-22', '2026-08-29', '2026-10-03']} today={new Date(2026, 7, 25)} />);
    const cells = Array.from(container.querySelectorAll('.cm-cell-test'));
    expect(cells).toHaveLength(2); // Aug 22 (past) + Aug 29 (upcoming) in the August grid
    expect(cells[0].classList.contains('is-past')).toBe(true);
    expect(cells[0].querySelector('.cm-taken')).not.toBeNull();
    expect(cells[0].querySelector('.cm-star')).toBeNull();
    expect(cells[1].classList.contains('is-past')).toBe(false);
    expect(cells[1].querySelector('.cm-star')).not.toBeNull();
    expect(cells[1].querySelector('.cm-taken')).toBeNull();
    expect(container.textContent).toContain('SAT taken');
    expect(container.textContent).toContain('SAT test day');
    expect(container.textContent).toContain('Test day in 4 days');
    act(() => { container.querySelector('button[aria-label="Next month"]').click(); });
    // September: only the PAST sitting (Aug 22) has a release marker (Sep 4);
    // Aug 29 hasn't happened yet.
    const releases = container.querySelectorAll('.cm-cell-release');
    expect(releases).toHaveLength(1);
    expect(releases[0].getAttribute('aria-label')).toContain('September 4');
    unmount();
  });
});
