/**
 * Practice Bank = question-bank navigator wearing the Study Plan's clothes
 * (2026-09-07 reskin). Mounts the live component and pins the navigation
 * contract: the domain cards drive the day card, the domain tablist has a
 * roving tabindex, search replaces the day-card body with grouped matches, the
 * filter chips rewrite the card chips and produce an honest empty state, a
 * filtered launch serves a FIXED pool (never the adaptive path) while All/All
 * keeps the adaptive round, grammar rounds stay a Standard English Conventions
 * affordance, a chapter hand-off marks its cards, band signals wait for
 * hydration, and the session remembers the student's place. Plus the reskin's
 * own contract: the library head, the neutral domain and topic descriptions
 * (never a sentence addressed to the student), Start vs Continue, the rail
 * stat tiles, and the "Suggested" Go button.
 */
/* eslint-disable testing-library/no-unnecessary-act */
global.IS_REACT_ACT_ENVIRONMENT = true;

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import PracticeBank from '../PracticeBank';
import { questionBank as mathQuestionBank, getQuestionsByCBSkill } from '../../data/questions/bank';
import { extractSatPattern } from '../../data/questions/extractSatPattern';
import { CB_MATH_SKILLS, CB_DOMAIN_DESCRIPTIONS, PATTERN_TO_CB_SKILL } from '../../data/questions/cbSkillTaxonomy';

function mount(el) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => { root.render(el); });
  return {
    container,
    unmount: () => { act(() => root.unmount()); container.remove(); },
  };
}

const defaults = () => ({ onStartPractice: jest.fn(), onStartAdaptive: jest.fn() });
const mountBank = (props = {}) => {
  const handlers = defaults();
  const view = mount(<PracticeBank {...handlers} {...props} />);
  return { ...view, ...handlers };
};

const qa = (c, sel) => [...c.querySelectorAll(sel)];
const dayTitle = (c) => c.querySelector('h2').textContent;
const railTab = (c, domain) => c.querySelector(`[data-pb-domain="${domain}"]`);
const click = (el) => act(() => { el.click(); });
const key = (el, k) => act(() => { el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true })); });
const chip = (c, groupLabel, label) => qa(c, `[role="radiogroup"][aria-label="${groupLabel}"] [role="radio"]`)
  .find(b => b.textContent === label);
const byName = (c, sel, text) => qa(c, sel).find(b => b.textContent.includes(text));
// The topic cards, in DOM order (the rail's tiles are not cards).
const cards = (c) => qa(c, '.pb-card');
const cardChip = (card) => card.querySelector('.pb-c-chip').textContent;
const startBtn = (card) => card.querySelector('.pb-c-btn');
const domainBtn = (c) => byName(c, 'button', 'Practice this domain');
const tile = (c, eyebrow) => qa(c, '.pb-tile').find(t => t.querySelector('.pb-tile-eyebrow')?.textContent === eyebrow);

function typeSearch(container, value) {
  const input = container.querySelector('#pb-search-input');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  return input;
}

const isDrillable = (q) => Array.isArray(q.choices) && q.choices.length >= 2;
const practiced = (ids, correct) => ids.reduce((acc, id) => {
  acc[String(id)] = { c: correct, n: 1, t: new Date().toISOString() };
  return acc;
}, {});

beforeEach(() => { window.sessionStorage.clear(); });

describe('page head', () => {
  // The bank is a shared catalog, not the student's page: a library title
  // like Videos / Learn, never the Study Plan's avatar + "{name}'s …" bar
  // (founder, 2026-09-08).
  it('titles the page impersonally, with no avatar and no name', () => {
    const { container, unmount } = mountBank({ user: { firstName: 'Haresh' } });
    try {
      const h1 = container.querySelector('h1');
      expect(h1.textContent).toBe('Practice Bank');
      expect(container.textContent).not.toMatch(/Haresh/);
      expect(container.querySelector('.pb-titlebar img, .pb-titlebar [class*="avatar" i]')).toBeNull();
      expect(container.querySelector('.pb-title-sub').textContent).toMatch(/Pick a topic/);
      // The builder is one ghost button away, not a rail row.
      expect(byName(container, '.pb-ghost-btn', 'Build a custom drill')).toBeTruthy();
    } finally { unmount(); }
  });
});

describe('domain cards → day card', () => {
  it('selects the first domain by default and swaps the day card when a card is picked', () => {
    const { container, unmount } = mountBank();
    try {
      expect(dayTitle(container)).toBe('Algebra');
      expect(railTab(container, 'algebra').getAttribute('aria-selected')).toBe('true');

      click(railTab(container, 'advanced-math'));
      expect(dayTitle(container)).toBe('Advanced Math');
      expect(railTab(container, 'advanced-math').getAttribute('aria-selected')).toBe('true');
      expect(railTab(container, 'algebra').getAttribute('aria-selected')).toBe('false');
    } finally { unmount(); }
  });

  it('is one Tab stop: Down/Up/Home/End move the roving tabindex and the selection', () => {
    const { container, unmount } = mountBank();
    try {
      const algebra = railTab(container, 'algebra');
      expect(algebra.tabIndex).toBe(0);
      expect(railTab(container, 'advanced-math').tabIndex).toBe(-1);

      act(() => { algebra.focus(); });
      key(algebra, 'ArrowDown');
      expect(railTab(container, 'advanced-math').tabIndex).toBe(0);
      expect(railTab(container, 'algebra').tabIndex).toBe(-1);
      expect(dayTitle(container)).toBe('Advanced Math');

      key(railTab(container, 'advanced-math'), 'ArrowUp');
      expect(railTab(container, 'algebra').tabIndex).toBe(0);
      expect(dayTitle(container)).toBe('Algebra');

      key(railTab(container, 'algebra'), 'End');
      expect(dayTitle(container)).toBe('Geometry and Trigonometry');
      key(railTab(container, 'geometry'), 'Home');
      expect(dayTitle(container)).toBe('Algebra');
    } finally { unmount(); }
  });
});

describe('search', () => {
  it('≥2 characters replaces the day-card body with matches grouped under domain subheads', () => {
    const { container, unmount } = mountBank();
    try {
      typeSearch(container, 'linear');
      const heading = container.querySelector('#pb-search-heading');
      expect(heading.textContent).toMatch(/^\d+ topics? matching “linear”$/);
      expect(heading.getAttribute('aria-live')).toBe('polite');
      expect(qa(container, '.pb-sgroup-head').length).toBeGreaterThan(0);
      // The domain cards show per-domain match counts while a query is active.
      expect(railTab(container, 'algebra').textContent).toMatch(/\d+ matching/);
      // Every rendered card actually matches.
      qa(container, '.pb-c-title').forEach(n => expect(n.textContent.toLowerCase()).toContain('linear'));
      // The whole-domain launcher is hidden while searching (it would lie).
      expect(domainBtn(container)).toBeFalsy();
    } finally { unmount(); }
  });

  it('shows the no-match copy verbatim, and clearing the query restores the domain', () => {
    const { container, unmount } = mountBank();
    try {
      typeSearch(container, 'zzzz');
      expect(container.textContent).toContain('No topic matches “zzzz”. Try “linear”, “circles”, or “evidence”.');
      expect(cards(container).length).toBe(0);

      typeSearch(container, '');
      expect(dayTitle(container)).toBe('Algebra');
      expect(cards(container).length).toBeGreaterThan(0);
    } finally { unmount(); }
  });
});

describe('filters', () => {
  it('Difficulty = Hard rewrites the card chips to "N of M · Hard"', () => {
    const { container, unmount } = mountBank();
    try {
      expect(cardChip(cards(container)[0])).toMatch(/^[\d,]+ questions · E \d+ · M \d+ · H \d+$/);
      click(chip(container, 'Difficulty', 'Hard'));
      expect(chip(container, 'Difficulty', 'Hard').getAttribute('aria-checked')).toBe('true');
      const all = cards(container);
      expect(all.length).toBeGreaterThan(0);
      const dimmed = all.filter(c => c.classList.contains('is-dim'));
      const live = all.filter(c => !c.classList.contains('is-dim'));
      live.forEach(card => expect(cardChip(card)).toMatch(/^[\d,]+ of [\d,]+ · Hard$/));
      // A topic with nothing left under the filter: no sentence, no button.
      dimmed.forEach(card => expect(cardChip(card)).toMatch(/^0 of [\d,]+$/));
      dimmed.forEach(card => expect(card.querySelector('.pb-c-sub').textContent).toBe('Nothing here under these filters.'));
      dimmed.forEach(card => expect(startBtn(card)).toBeNull());
    } finally { unmount(); }
  });

  it('when every topic filters to zero it says so, names the filter, and offers Clear filters', () => {
    // A miss on an algebra question that maps to NO cb-skill topic: the domain
    // has a missed question (so the chip is live) while every topic has none.
    const orphan = mathQuestionBank.find(q => {
      if (!isDrillable(q) || (q.domain || 'algebra') !== 'algebra') return false;
      const pattern = extractSatPattern(q.explanation);
      return !pattern || !PATTERN_TO_CB_SKILL[pattern];
    });
    expect(orphan).toBeTruthy();

    const { container, unmount } = mountBank({ bankPractice: practiced([orphan.id], false) });
    try {
      click(chip(container, 'Show', 'Missed'));
      expect(cards(container).length).toBe(0);
      expect(container.querySelector('.pb-empty-copy').textContent).toBe("No questions you've missed in Algebra yet.");
      click(container.querySelector('.pb-empty-clear'));
      expect(cards(container).length).toBeGreaterThan(0);
      expect(chip(container, 'Show', 'All').getAttribute('aria-checked')).toBe('true');
    } finally { unmount(); }
  });
});

describe('launch semantics', () => {
  it('All + All launches the adaptive round for the domain', () => {
    const { container, unmount, onStartAdaptive, onStartPractice } = mountBank();
    try {
      click(domainBtn(container));
      expect(onStartPractice).not.toHaveBeenCalled();
      expect(onStartAdaptive).toHaveBeenCalledTimes(1);
      expect(onStartAdaptive.mock.calls[0][0]).toMatchObject({
        enforcedDomain: 'algebra',
        section: 'math',
        source: 'practice-bank-domain',
      });
    } finally { unmount(); }
  });

  it('a filtered topic launch serves a fixed pool drawn only from the filtered ids', () => {
    const { container, unmount, onStartAdaptive, onStartPractice } = mountBank();
    try {
      click(chip(container, 'Difficulty', 'Hard'));
      const card = cards(container).find(r => startBtn(r));
      expect(card).toBeTruthy();
      const link = startBtn(card);
      const label = link.getAttribute('aria-label');
      expect(label).toMatch(/^Practice .+, \d+ questions$/);
      const skillLabel = label.replace(/^Practice /, '').replace(/, \d+ questions$/, '');
      const slug = CB_MATH_SKILLS.find(s => s.label === skillLabel).slug;
      const topicIds = new Set(getQuestionsByCBSkill(slug).filter(isDrillable).map(q => String(q.id)));

      click(link);
      expect(onStartAdaptive).not.toHaveBeenCalled();
      expect(onStartPractice).toHaveBeenCalledTimes(1);
      const [ids, meta] = onStartPractice.mock.calls[0];
      expect(ids.length).toBeGreaterThan(0);
      expect(ids.length).toBeLessThanOrEqual(20);
      ids.forEach((id) => {
        expect(topicIds.has(String(id))).toBe(true);
        expect(mathQuestionBank.find(q => q.id === id).difficulty).toBe('hard');
      });
      expect(meta).toMatchObject({ source: 'practice-bank-filtered', section: 'math' });
      expect(meta.label).toBe(`${skillLabel} · Hard`);
    } finally { unmount(); }
  });

  it('an unfiltered topic launch stays on the adaptive path', () => {
    const { container, unmount, onStartAdaptive, onStartPractice } = mountBank();
    try {
      click(startBtn(cards(container)[0]));
      expect(onStartPractice).not.toHaveBeenCalled();
      expect(onStartAdaptive.mock.calls[0][0]).toMatchObject({ source: 'practice-bank-topic', section: 'math' });
    } finally { unmount(); }
  });

  it('the rail Start tile launches the mix and the quick drill', () => {
    const { container, unmount, onStartPractice } = mountBank();
    try {
      const start = tile(container, 'Adaptive set');
      expect(start.textContent).toContain('Start practice');
      click(byName(start, '.pb-c-btn', 'Start'));
      expect(onStartPractice.mock.calls[0][1]).toMatchObject({ source: 'practice-bank-mix', section: 'math' });

      click(byName(start, '.pb-c-btn', 'Quick drill'));
      expect(onStartPractice.mock.calls[1][1]).toMatchObject({ source: 'practice-bank-quick', section: 'math' });
    } finally { unmount(); }
  });
});

describe('topic cards', () => {
  // The one sentence under a topic's name is the taxonomy's neutral description
  // of the topic. It never speaks to the student; their numbers live in the
  // chip, the ring, and the rail.
  const descriptionOf = (card) => CB_MATH_SKILLS.find(s => s.slug === card.getAttribute('data-pb-skill')).description;
  const secondPerson = /\bYou['’]?(re|ve)\b/;

  it('an unseen topic carries its description and offers Start', () => {
    const { container, unmount } = mountBank();
    try {
      const card = cards(container)[0];
      expect(descriptionOf(card)).toBeTruthy();
      expect(card.querySelector('.pb-c-sub').textContent).toBe(descriptionOf(card));
      expect(startBtn(card).textContent).toContain('Start');
      expect(startBtn(card).textContent).not.toContain('Continue');
      // Unseen = the dashed static circle, no ring.
      expect(card.querySelector('.pb-c-ring').classList.contains('is-static')).toBe(true);
    } finally { unmount(); }
  });

  it('a practiced topic keeps the same description, shows its numbers in the chip, and offers Continue', () => {
    const ids = getQuestionsByCBSkill('linear-systems').filter(isDrillable).slice(0, 5).map(q => q.id);
    expect(ids.length).toBe(5);
    const { container, unmount } = mountBank({ bankPractice: practiced(ids, true) });
    try {
      const card = cards(container).find(c => c.getAttribute('data-pb-skill') === 'linear-systems');
      expect(card).toBeTruthy();
      expect(card.querySelector('.pb-c-sub').textContent).toBe(descriptionOf(card));
      expect(card.querySelector('.pb-c-sub').textContent).not.toMatch(/\d+%/);
      expect(startBtn(card).textContent).toContain('Continue');
      expect(card.textContent).toContain('5 practiced · 100%');
      // Strong = the filled green check, not a dashed circle.
      expect(card.querySelector('.pb-c-ring').classList.contains('is-strong')).toBe(true);
    } finally { unmount(); }
  });

  it('every card has a description and nothing on the page addresses the student', () => {
    const ids = getQuestionsByCBSkill('linear-systems').filter(isDrillable).slice(0, 5).map(q => q.id);
    const { container, unmount } = mountBank({ bankPractice: practiced(ids, true) });
    try {
      for (const card of cards(container)) {
        expect(card.querySelector('.pb-c-sub').textContent).toBe(descriptionOf(card));
      }
      expect(container.textContent).not.toMatch(secondPerson);
      click(railTab(container, 'geometry'));
      expect(container.textContent).not.toMatch(secondPerson);
    } finally { unmount(); }
  });
});

describe('Reading & Writing', () => {
  it('renders the grammar "rounds" list for Standard English Conventions only', () => {
    const { container, unmount } = mountBank();
    try {
      click(byName(container, '.pb-tab', 'Reading'));
      expect(railTab(container, 'standard-english-conventions')).toBeTruthy();

      click(railTab(container, 'standard-english-conventions'));
      expect(dayTitle(container)).toBe('Standard English Conventions');
      const rounds = qa(container, '.pb-c-round');
      expect(rounds.length).toBeGreaterThan(0);
      rounds.forEach(r => expect(r.querySelector('.pb-c-round-label').textContent.length).toBeGreaterThan(0));

      click(railTab(container, 'information-and-ideas'));
      expect(qa(container, '.pb-c-round').length).toBe(0);
    } finally { unmount(); }
  });

  it('the section tabs carry the question counts and toggle the section', () => {
    const { container, unmount } = mountBank();
    try {
      const [math, rw] = qa(container, '.pb-tab');
      expect(math.getAttribute('aria-pressed')).toBe('true');
      expect(math.querySelector('.pb-tab-count').textContent).toMatch(/^[\d,]+$/);
      expect(rw.querySelector('.pb-tab-count').textContent).toMatch(/^[\d,]+$/);
      click(rw);
      expect(qa(container, '.pb-tab')[1].getAttribute('aria-pressed')).toBe('true');
      expect(qa(container, '.pb-tab')[0].getAttribute('aria-pressed')).toBe('false');
    } finally { unmount(); }
  });
});

describe('domain tiles', () => {
  it('each domain card carries an icon badge, the count as the display number, and one pip per topic', () => {
    const { container, unmount } = mountBank();
    try {
      const tiles = qa(container, '.pb-dcard');
      expect(tiles.length).toBe(4);
      for (const t of tiles) {
        expect(t.querySelector('.pb-dcard-badge svg')).toBeTruthy();
        expect(t.querySelector('.pb-dcard-count b').textContent).toMatch(/^[\d,]+$/);
        expect(t.querySelector('.pb-dcard-count').textContent).toMatch(/^[\d,]+ questions$/);
        expect(t.className).toMatch(/\bt-(blue|lavender|lime|peach)\b/);
      }
      // Pips = topics: Algebra lists five, all unseen with no history.
      const algebra = railTab(container, 'algebra');
      const pips = qa(algebra, '.pb-pip');
      expect(pips.length).toBe(qa(container, '.pb-card').length);
      pips.forEach(p => expect(p.classList.contains('is-unseen')).toBe(true));
    } finally { unmount(); }
  });

  it('pips take the topic band once history has loaded, and stay neutral before it', () => {
    const ids = getQuestionsByCBSkill('linear-systems').filter(isDrillable).slice(0, 5).map(q => q.id);
    const bankPractice = practiced(ids, true);
    const warm = mountBank({ bankPractice });
    try {
      const pips = qa(railTab(warm.container, 'algebra'), '.pb-pip');
      expect(pips.filter(p => p.classList.contains('is-strong')).length).toBe(1);
      expect(pips.filter(p => p.classList.contains('is-unseen')).length).toBe(pips.length - 1);
    } finally { warm.unmount(); }
    const cold = mountBank({ bankPractice, progressHydrated: false });
    try {
      qa(railTab(cold.container, 'algebra'), '.pb-pip').forEach(p => expect(p.classList.contains('is-unseen')).toBe(true));
    } finally { cold.unmount(); }
  });

  it('the filter segments keep their radio semantics inside the track', () => {
    const { container, unmount } = mountBank();
    try {
      const track = container.querySelector('[role="radiogroup"][aria-label="Difficulty"] .pb-ftrack');
      expect(qa(track, '[role="radio"]').length).toBe(4);
      expect(chip(container, 'Difficulty', 'Hard').querySelectorAll('.pb-bars rect.is-lit').length).toBe(3);
      expect(chip(container, 'Difficulty', 'Easy').querySelectorAll('.pb-bars rect.is-lit').length).toBe(1);
      expect(chip(container, 'Difficulty', 'All').querySelector('.pb-bars')).toBeNull();
      expect(chip(container, 'Show', 'Missed').querySelector('.pb-fico')).toBeTruthy();
      click(chip(container, 'Difficulty', 'Hard'));
      expect(chip(container, 'Difficulty', 'Hard').classList.contains('is-on')).toBe(true);
      expect(chip(container, 'Difficulty', 'Hard').getAttribute('aria-checked')).toBe('true');
    } finally { unmount(); }
  });
});

describe('right rail', () => {
  it('hides the stat tiles with no history and shows them once there is', () => {
    const cold = mountBank();
    try {
      expect(tile(cold.container, 'Practiced this week')).toBeFalsy();
      expect(tile(cold.container, 'Strong topics')).toBeFalsy();
      expect(tile(cold.container, 'Focus topics')).toBeFalsy();
      // The Start tile is always there — a new student sees exactly one action.
      expect(tile(cold.container, 'Adaptive set')).toBeTruthy();
    } finally { cold.unmount(); }

    const ids = getQuestionsByCBSkill('linear-systems').filter(isDrillable).slice(0, 5).map(q => q.id);
    const warm = mountBank({ bankPractice: practiced(ids, true) });
    try {
      const week = tile(warm.container, 'Practiced this week');
      expect(week).toBeTruthy();
      expect(week.querySelector('.pb-tile-num').textContent).toBe('5');
      expect(week.textContent).toContain('100% accuracy');

      const strong = tile(warm.container, 'Strong topics');
      expect(strong.querySelector('.pb-tile-num').textContent).toBe('1');
      expect(strong.textContent).toMatch(/of \d+ in Math/);
      expect(tile(warm.container, 'Focus topics')).toBeTruthy();
    } finally { warm.unmount(); }
  });

  it('a "Suggested" Go button still selects the rec\'s domain and applies its filter', () => {
    // Five misses in a geometry topic → the fix-misses rec, which navigates to
    // that domain and switches Show to Missed.
    const ids = getQuestionsByCBSkill('circles').filter(isDrillable).slice(0, 5).map(q => q.id);
    expect(ids.length).toBe(5);
    const { container, unmount, onStartPractice, onStartAdaptive } = mountBank({
      bankPractice: practiced(ids, false),
    });
    try {
      expect(dayTitle(container)).toBe('Algebra');
      const foryou = tile(container, 'Suggested');
      expect(foryou).toBeTruthy();
      expect(foryou.textContent).toContain('Revisit');

      click(foryou.querySelector('.pb-rec-go'));
      expect(dayTitle(container)).toBe('Geometry and Trigonometry');
      expect(chip(container, 'Show', 'Missed').getAttribute('aria-checked')).toBe('true');
      // It navigates — it never launches.
      expect(onStartPractice).not.toHaveBeenCalled();
      expect(onStartAdaptive).not.toHaveBeenCalled();
    } finally { unmount(); }
  });
});

describe('states', () => {
  it('a chapter hand-off selects the domain and marks the matching cards', () => {
    const { container, unmount } = mountBank({
      focusRequest: { section: 'math', domain: 'algebra', skillSlugs: ['linear-functions'], token: 42 },
    });
    try {
      expect(dayTitle(container)).toBe('Algebra');
      const marked = qa(container, '.pb-card.is-from-chapter');
      expect(marked.length).toBe(1);
      expect(marked[0].getAttribute('data-pb-skill')).toBe('linear-functions');
      expect(marked[0].textContent).toContain('From your chapter');

      // A domain change drops the marker.
      click(railTab(container, 'geometry'));
      expect(qa(container, '.pb-card.is-from-chapter').length).toBe(0);
    } finally { unmount(); }
  });

  it('band signals and tallies wait for progressHydrated', () => {
    const ids = getQuestionsByCBSkill('linear-systems').filter(isDrillable).slice(0, 5).map(q => q.id);
    expect(ids.length).toBe(5);
    const bankPractice = practiced(ids, true);

    const hydrated = mountBank({ bankPractice, progressHydrated: true });
    try {
      expect(hydrated.container.textContent).toContain('5 practiced · 100%');
      expect(hydrated.container.querySelector('.pb-dcard-tally')).toBeTruthy();
    } finally { hydrated.unmount(); }

    const cold = mountBank({ bankPractice, progressHydrated: false });
    try {
      expect(cold.container.textContent).not.toContain('practiced');
      expect(cold.container.querySelector('.pb-dcard-tally')).toBeNull();
      expect(tile(cold.container, 'Suggested')).toBeFalsy();
      // Names and counts are on screen immediately — no spinner, no blank card.
      expect(cards(cold.container).length).toBeGreaterThan(0);
    } finally { cold.unmount(); }
  });

  it('the domain line is the taxonomy description, with or without history, and follows the domain', () => {
    const cold = mountBank();
    try {
      expect(cold.container.querySelector('.pb-desc').textContent).toBe(CB_DOMAIN_DESCRIPTIONS.algebra);
      click(railTab(cold.container, 'geometry'));
      expect(cold.container.querySelector('.pb-desc').textContent).toBe(CB_DOMAIN_DESCRIPTIONS.geometry);
      // Search replaces the day card's body, description included.
      typeSearch(cold.container, 'circ');
      expect(cold.container.querySelector('.pb-desc')).toBeNull();
    } finally { cold.unmount(); }

    // The cold mount left Geometry in the session; the warm mount starts fresh.
    window.sessionStorage.clear();
    const ids = getQuestionsByCBSkill('linear-systems').filter(isDrillable).slice(0, 5).map(q => q.id);
    const warm = mountBank({ bankPractice: practiced(ids, true) });
    try {
      // History changes the chips and tiles, never the description.
      expect(warm.container.querySelector('.pb-desc').textContent).toBe(CB_DOMAIN_DESCRIPTIONS.algebra);
      expect(warm.container.textContent).toContain('5 practiced · 100%');
    } finally { warm.unmount(); }
  });

  it('restores the section, domain and filters saved earlier in the session', () => {
    window.sessionStorage.setItem('pb:nav', JSON.stringify({
      section: 'math', domain: 'geometry', difficulty: 'hard', pool: 'all',
    }));
    const { container, unmount } = mountBank();
    try {
      expect(dayTitle(container)).toBe('Geometry and Trigonometry');
      expect(chip(container, 'Difficulty', 'Hard').getAttribute('aria-checked')).toBe('true');
    } finally { unmount(); }

    // And the current place is written back for the next mount.
    const saved = JSON.parse(window.sessionStorage.getItem('pb:nav'));
    expect(saved).toMatchObject({ section: 'math', domain: 'geometry', difficulty: 'hard' });
  });

  it('preselects the domain of the first weakness that maps into the section', () => {
    const { container, unmount } = mountBank({
      weaknesses: [{ skillId: 'circles', skill: 'Circles', domain: 'geometry', section: 'math' }],
    });
    try {
      expect(dayTitle(container)).toBe('Geometry and Trigonometry');
    } finally { unmount(); }
  });

  it('the resume drill becomes an orange rail tile, and the phone bar stays', () => {
    const onResumeDrill = jest.fn();
    const onDiscardDrill = jest.fn();
    const { container, unmount } = mountBank({
      activeDrill: { questionIds: [1, 2, 3, 4], currentQuestionIndex: 1, answers: { 1: 'A' }, assignmentMeta: { label: 'Circles drill' } },
      onResumeDrill,
      onDiscardDrill,
    });
    try {
      const resume = tile(container, 'Continue your drill');
      expect(resume).toBeTruthy();
      expect(resume.textContent).toContain('Circles drill');
      expect(resume.textContent).toContain('Question 2 of 4');
      click(byName(resume, '.pb-c-btn', 'Continue'));
      expect(onResumeDrill).toHaveBeenCalledTimes(1);
      click(byName(resume, '.pb-c-btn', 'Discard'));
      expect(onDiscardDrill).toHaveBeenCalledTimes(1);
      expect(container.querySelector('.pb-resume-bar')).toBeTruthy();
    } finally { unmount(); }
  });
});
