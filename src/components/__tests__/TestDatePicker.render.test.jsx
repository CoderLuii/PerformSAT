global.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import TestDatePicker from '../TestDatePicker';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()), rerender: (next) => act(() => { root.render(next); }) };
}
const TODAY = new Date(2026, 7, 25, 12);
const chipDates = (c) => Array.from(c.querySelectorAll('.tdp-chip')).map((b) => b.querySelector('.tdp-chip-date').textContent.replace('✓ ', ''));

describe('TestDatePicker (multi-date)', () => {
  it('lists the next official sittings, shows chosen dates (past ones as taken), toggles with the full list', () => {
    const onChange = jest.fn();
    const { container, unmount } = mount(<TestDatePicker selected={['2026-08-22', '2026-10-03']} today={TODAY} onChange={onChange} />);
    expect(chipDates(container)).toEqual(['Sep 12', 'Oct 3', 'Nov 7', 'Dec 5', 'Mar 6', 'May 1']);
    const chosen = Array.from(container.querySelectorAll('.tdp-chosen-item'));
    expect(chosen.map((c) => c.querySelector('.tdp-chosen-date').textContent)).toEqual(['Aug 22', 'Oct 3']);
    expect(chosen[0].classList.contains('is-past')).toBe(true);
    expect(chosen[0].textContent).toContain('taken');
    const oct = Array.from(container.querySelectorAll('.tdp-chip'))[1];
    expect(oct.getAttribute('aria-pressed')).toBe('true');
    // Toggle Dec 5 on → full list; toggle Oct 3 off → full list without it.
    act(() => { Array.from(container.querySelectorAll('.tdp-chip'))[3].click(); });
    expect(onChange).toHaveBeenLastCalledWith(['2026-08-22', '2026-10-03', '2026-12-05']);
    act(() => { oct.click(); });
    expect(onChange).toHaveBeenLastCalledWith(['2026-08-22']);
    // Remove Aug 22 from the chosen list.
    act(() => { chosen[0].querySelector('.tdp-chosen-remove').click(); });
    expect(onChange).toHaveBeenLastCalledWith(['2026-10-03']);
    unmount();
  });
  it('adds a custom date (today or later, not already chosen), clears all, and reports Done', () => {
    const onChange = jest.fn();
    const onDone = jest.fn();
    const { container, unmount } = mount(<TestDatePicker selected={['2026-10-03']} today={TODAY} onChange={onChange} onDone={onDone} allowClear />);
    const input = container.querySelector('input[type=date]');
    const add = Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Add this date');
    expect(add.disabled).toBe(true);
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    act(() => { setter.call(input, '2026-09-30'); input.dispatchEvent(new Event('input', { bubbles: true })); });
    expect(add.disabled).toBe(false);
    act(() => { add.click(); });
    expect(onChange).toHaveBeenLastCalledWith(['2026-10-03', '2026-09-30']);
    const clear = Array.from(container.querySelectorAll('button')).find((b) => b.textContent.includes('clear all dates'));
    act(() => { clear.click(); });
    expect(onChange).toHaveBeenLastCalledWith([]);
    act(() => { Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Done').click(); });
    expect(onDone).toHaveBeenCalledTimes(1);
    // Closed-registration copy.
    const { container: c2, unmount: u2 } = mount(<TestDatePicker selected={[]} today={new Date(2026, 8, 5)} onChange={() => {}} />);
    expect(c2.querySelector('.tdp-chip .tdp-chip-sub').textContent).toBe('Registration closed');
    u2();
    unmount();
  });
});
