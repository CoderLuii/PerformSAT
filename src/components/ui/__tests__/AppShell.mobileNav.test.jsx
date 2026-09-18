/**
 * AppShell mobile bottom nav — the 390px phone contract.
 *
 * Seven tabs used to be a flex row of `min-width: 56px` buttons: 7 x 56 = 392px,
 * so on a 390px phone the bar overflowed, Profile clipped, every page scrolled
 * sideways, and the two-word "Study Plan" wrapped to a second line (60px tall
 * inside a 56px bar). The bar is now a 7-track grid of `minmax(0, 1fr)`.
 *
 * jsdom does no layout, so these assert the STYLE CONTRACT that produces the
 * right layout; the measured widths were verified in headless Chromium
 * (nav scrollWidth 392 -> 390 at 390px, clean from 320px through 767px).
 */
/* eslint-disable testing-library/no-unnecessary-act --
   `root.render` here is react-dom/client's createRoot, not a Testing Library
   render (@testing-library/react isn't a dependency), so act IS required. */
global.IS_REACT_ACT_ENVIRONMENT = true;
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import AppShell from '../AppShell';

function mount(el, width) {
  window.innerWidth = width;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => { act(() => root.unmount()); container.remove(); } };
}

function shell(props = {}) {
  return (
    <AppShell currentView="dashboard" onNavigate={() => {}} user={{ firstName: 'Ada', email: 'a@b.co' }} onLogout={() => {}} {...props}>
      <div>content</div>
    </AppShell>
  );
}

const PHONE = 390;
const DESKTOP = 1400;

describe('AppShell mobile bottom nav fits a 390px phone', () => {
  it('lays 7 tabs out as equal, shrinkable grid tracks (never a 392px flex row)', () => {
    const { container, unmount } = mount(shell(), PHONE);
    const nav = container.querySelector('nav[aria-label="Mobile navigation"]');
    expect(nav).not.toBeNull();
    expect(nav.style.display).toBe('grid');
    // minmax(0, 1fr): tracks may shrink below their content, so 7 columns
    // always sum to exactly the viewport width.
    expect(nav.style.gridTemplateColumns).toBe('repeat(7, minmax(0, 1fr))');
    expect(nav.style.boxSizing).toBe('border-box');
    expect(nav.style.overflow).toBe('hidden');

    const tabs = nav.querySelectorAll('button');
    expect(tabs).toHaveLength(7);
    unmount();
  });

  it('gives every tab min-width:0, a >=44px touch target, and no fixed 56px floor', () => {
    const { container, unmount } = mount(shell(), PHONE);
    const tabs = [...container.querySelectorAll('nav[aria-label="Mobile navigation"] button')];
    tabs.forEach(tab => {
      // A grid item's automatic minimum is its content width; 0 hands control
      // back to the track and is what stops the bar re-widening.
      expect(parseFloat(tab.style.minWidth)).toBe(0); // jsdom serializes 0px as "0"
      expect(tab.style.minHeight).toBe('44px');
      expect(tab.style.boxSizing).toBe('border-box');
      expect(tab.style.overflow).toBe('hidden');
      // 12px of side padding per button was 168px of the 390px budget.
      expect(tab.style.padding).toBe('6px 2px');
    });
    unmount();
  });

  it('keeps every label on ONE 10px line, ellipsised rather than wrapped', () => {
    const { container, unmount } = mount(shell(), PHONE);
    const labels = [...container.querySelectorAll('nav[aria-label="Mobile navigation"] button span')];
    expect(labels).toHaveLength(7);
    labels.forEach(span => {
      expect(span.style.fontSize).toBe('10px');
      expect(span.style.whiteSpace).toBe('nowrap');
      expect(span.style.overflow).toBe('hidden');
      expect(span.style.textOverflow).toBe('ellipsis');
      expect(span.style.maxWidth).toBe('100%');
      expect(parseFloat(span.style.minWidth)).toBe(0);
    });
    unmount();
  });

  it('shows "Plan" on the phone but keeps "Study Plan" as the accessible name', () => {
    const { container, unmount } = mount(shell(), PHONE);
    const tab = container.querySelector('nav[aria-label="Mobile navigation"] button[aria-label="Study Plan"]');
    expect(tab).not.toBeNull();
    expect(tab.querySelector('span').textContent).toBe('Plan');
    // WCAG "Label in Name": the accessible name still contains the visible text.
    expect(tab.getAttribute('aria-label')).toContain('Plan');
    // The other six are unabbreviated.
    const visible = [...container.querySelectorAll('nav[aria-label="Mobile navigation"] button span')].map(s => s.textContent);
    expect(visible).toEqual(['Home', 'Learn', 'Videos', 'Tests', 'Practice', 'Plan', 'Profile']);
    unmount();
  });

  it('leaves the desktop sidebar alone: full "Study Plan" label, no grid', () => {
    const { container, unmount } = mount(shell(), DESKTOP);
    expect(container.querySelector('nav[aria-label="Mobile navigation"]')).toBeNull();
    const aside = container.querySelector('aside[aria-label="Desktop navigation"]');
    expect(aside).not.toBeNull();
    const labels = [...aside.querySelectorAll('nav button span')].map(s => s.textContent);
    expect(labels).toEqual(['Home', 'Learn', 'Videos', 'Tests', 'Practice', 'Study Plan', 'Profile']);
    unmount();
  });

  it('keeps the tri-color active states (Practice = green) on phone and desktop', () => {
    const phone = mount(shell({ currentView: 'practiceBank' }), PHONE);
    const phoneTab = phone.container.querySelector('nav[aria-label="Mobile navigation"] button[aria-label="Practice"]');
    expect(phoneTab.getAttribute('aria-current')).toBe('page');
    expect(phoneTab.querySelector('svg').getAttribute('stroke')).toBe('var(--color-brand-green-text)');
    expect(phone.container.querySelector('button[aria-label="Study Plan"] svg').getAttribute('stroke'))
      .toBe('var(--color-slate-400)'); // inactive
    phone.unmount();

    const desktop = mount(shell({ currentView: 'practiceBank' }), DESKTOP);
    const deskBtn = desktop.container.querySelector('aside[aria-label="Desktop navigation"] button[aria-label="Practice"]');
    expect(deskBtn.querySelector('svg').getAttribute('stroke')).toBe('var(--color-brand-green)');
    desktop.unmount();
  });
});
