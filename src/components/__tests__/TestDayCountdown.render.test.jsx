global.IS_REACT_ACT_ENVIRONMENT = true;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import TestDayCountdown from '../TestDayCountdown';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => act(() => root.unmount()) };
}
const TODAY = new Date(2026, 7, 25, 12);
const text = (c) => c.textContent;

describe('TestDayCountdown', () => {
  it('counts down to the next sitting, with registration deadline and the later dates', () => {
    const { container, unmount } = mount(<TestDayCountdown testDate="2026-11-07" testDates={['2026-11-07', '2026-12-05']} today={TODAY} onManage={() => {}} />);
    expect(container.querySelector('.hv2-countdown-num').textContent).toBe('74');
    expect(container.querySelector('.hv2-countdown-unit').textContent).toBe('days');
    expect(text(container)).toContain('Days until test');
    expect(container.querySelector('.hv2-countdown-chip').textContent).toBe('Nov 7');
    expect(container.querySelector('.hv2-countdown-link').getAttribute('aria-label')).toContain('Saturday, November 7');
    expect(text(container)).toContain('Register by Oct 23 · then Dec 5');
    expect(text(container)).toContain('Change dates');
    unmount();
  });
  it('derives the next sitting itself when the primary is stale, and handles today / taken / none', () => {
    const stale = mount(<TestDayCountdown testDate="2026-08-22" testDates={['2026-08-22', '2026-10-03']} today={TODAY} />);
    expect(stale.container.querySelector('.hv2-countdown-num').textContent).toBe('39');
    stale.unmount();
    const today = mount(<TestDayCountdown testDate="2026-08-25" today={TODAY} />);
    expect(today.container.querySelector('.hv2-countdown-num').textContent).toBe('Today');
    today.unmount();
    const taken = mount(<TestDayCountdown testDate="2026-08-22" today={TODAY} onManage={() => {}} />);
    expect(taken.container.querySelector('.hv2-countdown-num').textContent).toBe('Taken');
    expect(text(taken.container)).toContain('3 days ago');
    expect(text(taken.container)).toContain('Add your next date');
    taken.unmount();
    const none = mount(<TestDayCountdown testDate={null} today={TODAY} onManage={() => {}} />);
    expect(none.container.querySelector('.hv2-countdown-num').textContent).toBe('Not set');
    expect(none.container.querySelector('.hv2-countdown-chip')).toBeNull();
    expect(text(none.container)).toContain('Pick a date');
    none.unmount();
  });
  it('toggles the manager and renders children while managing', () => {
    const onManage = jest.fn();
    const { container, unmount } = mount(<TestDayCountdown testDate="2026-11-07" today={TODAY} onManage={onManage} managing><div data-testid="child">picker</div></TestDayCountdown>);
    expect(container.querySelector('[data-testid=child]')).not.toBeNull();
    expect(text(container)).toContain('Close');
    act(() => { container.querySelector('.hv2-countdown-link').click(); });
    expect(onManage).toHaveBeenCalledTimes(1);
    unmount();
  });
});
