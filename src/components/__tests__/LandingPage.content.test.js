/**
 * Content / claims tests for the public landing page.
 *
 * @testing-library/react is NOT installed in this repo, so these use
 * ReactDOMServer.renderToString (server render = no effects fire, so the
 * Firebase auth listener inside useAuth never attaches).
 *
 * Two jobs:
 *  1. Pin the landing copy to the REAL content inventory — the honest
 *     "2,200+" question floor (actual ~2,280) and "12 full-length" tests.
 *     If the bank shrinks below a claimed floor, update the copy AND this
 *     test together — never let the page claim more than the bank holds.
 *  2. Guard against known-false / unverifiable marketing claims ever
 *     coming back (score guarantees, the excised video-course framing,
 *     dead `href="#"` links, competitor naming).
 *
 * Reconciled 2026-07-07 with the Results-carousel build: the assertions
 * were realigned to the current v2 landing copy (they had drifted to a
 * pre-`2210304` version), and the five named student testimonials + the
 * "Thousands of students" headline are real, product-owner-cleared claims,
 * so that specific "thousands of students" guard was intentionally removed.
 */

// Firebase is mocked following the useAuth.signup.test.js convention —
// src/firebase/config.js calls getAuth(app) at import time, which throws
// under jest (no API key in the test environment).
jest.mock('../../firebase/config', () => ({ auth: {}, db: {} }));
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  signOut: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import LandingPage from '../LandingPage';
import { setFeatureFlagForTest } from '../../hooks/useFeatureFlag';

// Emoji + dingbat/symbol blocks — UI copy must never contain emojis.
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

// renderToString inserts <!-- --> markers between adjacent text segments;
// strip them so substring assertions read like the rendered page.
const render = (el) => ReactDOMServer.renderToString(el).replace(/<!-- -->/g, '');

describe('LandingPage content', () => {
  let html;
  beforeAll(() => {
    html = render(<LandingPage />);
  });

  test('claims the derived (rounded-down) content inventory', () => {
    expect(html).toContain('2,200+'); // honest question-bank floor (actual ~2,280)
    expect(html).toContain('Hand-authored questions'); // stats strip
    // Stats strip (2026-07-19 rebuild): 12 tests / 42 chapters / 161 types.
    // 42 = strategyChapters(3) + mathChapters(23) + rwChapters(16);
    // 161 = 121 surfaced math types + 40 R&W types — "covered", NOT
    // "drilled" (reading types are browse-only; drill routing is skill-level).
    expect(html).toContain('Full-length adaptive tests');
    expect(html).toContain('Textbook chapters');
    expect(html).toContain('Question types covered');
    expect(html).toContain('Bluebook-format'); // format claim lives in the features grid
    expect(html).toContain('12 full-length adaptive practice tests'); // pricing "includes" list
  });

  test('leads with the honest differentiators', () => {
    expect(html).toContain('hand-authored');
    expect(html).toContain('why you missed it'); // comparison headline accent on "why you missed it"
    expect(html).toContain('pinpoints the exact skill behind each miss'); // "With SEVA" column
    expect(html).toContain('the exact question types you miss'); // pricing "includes" list
  });

  test('frames the free early-access packaging consistently', () => {
    expect(html).toMatch(/free during early access/i);
    expect(html).toContain('Get started for free'); // billing-off pricing CTA
    // The old CTA led nowhere (no payment flow exists).
    expect(html).not.toContain('Enroll Now');
    // The pricing section exists, but with the billing flag OFF it must render
    // the single "free during early access" card — never paid dollar prices
    // that would contradict the free packaging elsewhere on the page.
    expect(html).not.toContain('$85');
    expect(html).not.toContain('$349');
    expect(html).not.toContain('$29');
  });

  test('contains no known-false or unverifiable claims', () => {
    // NOTE: the "Thousands of students" Results headline + the five named
    // testimonials are real, product-owner-cleared claims (approved 2026-07-07),
    // so they're intentionally allowed. Everything below stays guarded.
    expect(html).not.toMatch(/guarantee/i);
    // The video-lesson product was excised; the landing must not sell it.
    expect(html).not.toMatch(/video/i);
    expect(html).not.toMatch(/instructor/i);
    expect(html).not.toMatch(/premier/i);
    expect(html).not.toMatch(/proven/i);
    // Quality-flank positioning never names the competitor.
    expect(html).not.toMatch(/acely/i);
  });

  test('has no dead links — every anchor points at a real route or section', () => {
    expect(html).not.toContain('href="#"');
    expect(html).toContain('href="/privacy"');
    expect(html).toContain('href="/terms"');
    expect(html).toContain('href="#features"');
    expect(html).toContain('href="#how"');
    expect(html).toContain('href="#why"');
    expect(html).toContain('href="#pricing"');
    // Every in-page anchor target must exist on the page.
    expect(html).toContain('id="features"');
    expect(html).toContain('id="how"');
    expect(html).toContain('id="why"');
    expect(html).toContain('id="pricing"');
    expect(html).toContain('id="results"'); // testimonial carousel section
  });

  test('keeps the College Board trademark line', () => {
    expect(html).toContain('SAT is a registered trademark of the College Board');
    expect(html).toContain('does not endorse this product');
  });

  test('contains no emojis', () => {
    expect(html).not.toMatch(EMOJI_RE);
  });
});

// Creator-link ribbon: shown only when a /r/<slug> referral is stored AND
// billing is live — the page must never promise a checkout discount that
// checkout can't apply.
describe('LandingPage creator-link ribbon', () => {
  const RIBBON =
    'Creator discount active — 20% off your first 3 months, applied automatically at checkout.';

  afterEach(() => {
    window.localStorage.removeItem('seva:ref');
    setFeatureFlagForTest('billing', undefined);
  });

  test('hidden for direct (non-referred) visitors', () => {
    setFeatureFlagForTest('billing', true);
    expect(render(<LandingPage />)).not.toContain('Creator discount');
  });

  test('shown for referred visitors while billing is live', () => {
    setFeatureFlagForTest('billing', true);
    window.localStorage.setItem('seva:ref', JSON.stringify({ slug: 'iksha', at: Date.now() }));
    expect(render(<LandingPage />)).toContain(RIBBON);
  });

  test('never promises the discount while billing is dark', () => {
    setFeatureFlagForTest('billing', false);
    window.localStorage.setItem('seva:ref', JSON.stringify({ slug: 'iksha', at: Date.now() }));
    expect(render(<LandingPage />)).not.toContain('Creator discount');
  });
});

// ── landingV2 (Acely-style rebuild, 2026-09-10) ───────────────────────────
// The flag-on page is LandingPageV2: a restrained, sectioned page that leads
// with the diagnosis recording, walks three steps, and hands the visitor one
// real question. Pin what it shows and what it stopped claiming.
describe('LandingPage v2 (ff:landingV2)', () => {
  let html;
  beforeAll(() => {
    setFeatureFlagForTest('landingV2', true);
    html = render(<LandingPage />);
  });
  afterAll(() => { setFeatureFlagForTest('landingV2', undefined); });

  test('leads with the diagnosis promise and the three steps', () => {
    expect(html).toContain('Find out why you miss SAT questions. Then fix exactly that.');
    expect(html).toContain('Three steps to a higher score.');
    expect(html).toContain('Take the diagnostic.');
    expect(html).toContain('Get your plan.');
    expect(html).toContain('Drill what costs you points.');
  });

  test('names the four ways the product raises a score', () => {
    for (const t of ['A plan that adapts.', 'The why behind every miss.', 'True-to-test practice.', 'A score you can watch move.']) {
      expect(html).toContain(t);
    }
  });

  test('hands the visitor a real question, rendered with the app\'s own choice list', () => {
    expect(html).toContain('Try a real question');
    expect(html).toContain('Adobe buildings are made of earthen bricks'); // rw-1201, verbatim from the bank
    expect(html).toContain('answer-choice-card'); // shared/AnswerChoiceList, the drill's rows
    expect(html).toContain('Check answer');
  });

  test('shows exactly one recording: the diagnosis, muted and inline', () => {
    expect(html.match(/<video /g)).toHaveLength(1);
    expect(html).toMatch(/<video [^>]*muted[^>]*playsinline/i);
    expect(html).toContain('/showcase/video/diagnosis.webm');
    expect(html).toContain('/showcase/video/diagnosis.mp4');
    expect(html).toContain('/showcase/video/diagnosis-poster@2x.webp');
    // The lossless still lives inside the <video> as its fallback.
    expect(html).toContain('/showcase/diagnosis@2x.webp 2880w');
    expect(html).toContain('/showcase/diagnosis@2x.png');
    // The five recordings the rebuild dropped are gone from the page.
    for (const shot of ['test-runner', 'study-plan', 'drill', 'practice-bank', 'dashboard']) {
      expect(html).not.toContain(`/showcase/video/${shot}.mp4`);
    }
  });

  test('answers the six questions a visitor actually asks', () => {
    expect(html).toContain('Frequently asked questions.');
    expect(html.match(/<details/g)).toHaveLength(6);
    expect(html).toContain('What is SEVA?');
    expect(html).toContain('How long is the diagnostic?');
    expect(html).toContain('What does it cost?');
  });

  test('drops the slogan-only sections and the unsupported crowd claim', () => {
    expect(html).not.toContain('Knows you like');
    expect(html).not.toContain('A prep course tells you');
    expect(html).not.toContain('Three steps to a smarter prep');
    expect(html).not.toContain('Thousands of students');
    expect(html).not.toContain('Ready to find your next 200 points?');
    expect(html).not.toContain("A Tutor's Heart");
    expect(html).toContain('Real students.');
  });

  test('keeps the honest inventory, the results, the pricing and the final CTA', () => {
    expect(html).toContain('2,200+');
    expect(html).toContain('Hand-authored questions');
    expect(html).toContain('Jake C.');
    expect(html).toMatch(/free during early access/i);
    expect(html).toContain('Get your diagnosis today.');
    expect(html).toContain('SAT is a registered trademark of the College Board');
    expect(html).not.toMatch(EMOJI_RE);
    expect(html).not.toContain('href="#"');
  });
});
