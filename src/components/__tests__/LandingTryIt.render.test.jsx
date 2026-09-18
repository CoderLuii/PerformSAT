/**
 * LandingTryIt — the landing page's "try a real question" demo. Pins that a
 * visitor can pick a choice, check it, and see the product's own feedback:
 * the verdict, the label the answer is filed under, and the worked
 * explanation; and that "Try another" moves to the next real item.
 */
/* eslint-disable testing-library/no-unnecessary-act */
global.IS_REACT_ACT_ENVIRONMENT = true;

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import LandingTryIt from '../LandingTryIt';
import { LANDING_DEMO_ITEMS } from '../../data/landingDemoItems';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return { container, unmount: () => { act(() => root.unmount()); container.remove(); } };
}
const click = (el) => act(() => { el.click(); });
const qa = (c, sel) => [...c.querySelectorAll(sel)];

describe('LandingTryIt', () => {
  test('ships four real items with varied answers and a filing label each', () => {
    expect(LANDING_DEMO_ITEMS).toHaveLength(4);
    expect(new Set(LANDING_DEMO_ITEMS.map(i => i.correctAnswer)).size).toBeGreaterThan(1);
    for (const it of LANDING_DEMO_ITEMS) {
      expect(it.choices).toHaveLength(4);
      expect(it.filedUnder).toBeTruthy();
      expect(it.explanation.length).toBeGreaterThan(200);
    }
  });

  test('a wrong pick is marked, filed, and explained; Try another moves on', () => {
    const onStart = jest.fn();
    const { container, unmount } = mount(<LandingTryIt onStart={onStart} />);
    try {
      const first = LANDING_DEMO_ITEMS[0];
      expect(qa(container, '[role="tab"]')).toHaveLength(4);
      expect(container.querySelector('.lp-try-check').disabled).toBe(true);
      // Pick a wrong choice, then check.
      const wrong = first.choices.find(c => c.id !== first.correctAnswer).id;
      const cards = qa(container, '.answer-choice-card');
      expect(cards).toHaveLength(4);
      click(cards[first.choices.findIndex(c => c.id === wrong)]);
      expect(container.querySelector('.lp-try-check').disabled).toBe(false);
      click(container.querySelector('.lp-try-check'));
      expect(container.querySelector('.lp-try-verdict').textContent).toBe('Not quite');
      expect(container.querySelector('.lp-try-filed').textContent).toContain(first.filedUnder);
      expect(container.querySelector('.lp-try-expl').textContent.length).toBeGreaterThan(100);
      expect(container.querySelector('.lp-try-learn').textContent).toContain(`A miss on ${first.filedUnder}`);
      // The CTA in the after-state opens the funnel.
      click(qa(container, '.lp-try-cta button')[0]);
      expect(onStart).toHaveBeenCalledTimes(1);
      // Try another → the second item, clean state.
      click(container.querySelector('.lp-try-next'));
      expect(qa(container, '[role="tab"]')[1].getAttribute('aria-selected')).toBe('true');
      expect(container.querySelector('.lp-try-verdict')).toBeNull();
      expect(container.querySelector('.lp-try-check').disabled).toBe(true);
    } finally { unmount(); }
  });

  test('a right pick reads Correct and the choice cannot change after checking', () => {
    const { container, unmount } = mount(<LandingTryIt onStart={() => {}} />);
    try {
      const first = LANDING_DEMO_ITEMS[0];
      const cards = qa(container, '.answer-choice-card');
      const rightIdx = first.choices.findIndex(c => c.id === first.correctAnswer);
      click(cards[rightIdx]);
      click(container.querySelector('.lp-try-check'));
      expect(container.querySelector('.lp-try-verdict').textContent).toBe('Correct');
      click(cards[(rightIdx + 1) % 4]);
      expect(container.querySelector('.lp-try-verdict').textContent).toBe('Correct');
    } finally { unmount(); }
  });
});
