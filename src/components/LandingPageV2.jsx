/**
 * LandingPageV2 — the public landing page behind `ff:landingV2` (`?lp=v2`).
 *
 * Rebuilt 2026-09-10 in the restrained, editorial register the founder asked
 * for ("simple yet powerful"): a green announcement strip, a white nav, one
 * navy hero holding the real diagnosis recording, then white sections that
 * each make ONE point. Brand tokens stay SEVA's (navy, orange for actions,
 * green for gains, pastel tiles); there are no gradients, glows, parallax or
 * scroll reveals, and the only motion on the page is the hero recording and
 * the score-gain marquee.
 *
 * Purely presentational: every behaviour (auth, the signup funnel, the login
 * modal, the billing flag) stays in LandingPage.jsx and arrives as props.
 */
import React, { useEffect, useRef, useState } from 'react';
import Wordmark from './ui/Wordmark';
import LandingTryIt from './LandingTryIt';
import { Avatar, svgBase } from './landingShared';
import { ROSTER, PRICING_INCLUDES } from '../data/landingRoster';
import './LandingPageV2.css';

const PU = process.env.PUBLIC_URL;
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ── Line icons (1.75px stroke, no fills, no emoji) ─────────────────────── */
const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" {...svgBase}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const Check = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" {...svgBase}><path d="M20 6 9 17l-5-5" /></svg>
);
const CheckCircle = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" {...svgBase}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.2 2.4 2.4 4.6-5" /></svg>
);
const Chevron = ({ size = 18 }) => (
  <svg className="lpv2-faq-chev" width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" {...svgBase}><path d="m6 9 6 6 6-6" /></svg>
);
// Gain arrow for the "7 PTS" chip — an SVG triangle, never the ▲ character.
const GainTriangle = ({ size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1.5 9 8.5H1z" fill="currentColor" /></svg>
);

/* ── Section content ────────────────────────────────────────────────────── */
const INVENTORY = [
  { n: '2,200+', label: 'Hand-authored questions' },
  { n: '12', label: 'Full-length adaptive tests' },
  { n: '42', label: 'Textbook chapters' },
  { n: '161', label: 'Question types covered' },
];

const STEPS = [
  { n: '01', title: 'Take the diagnostic.', line: 'Forty questions, adaptive like the real test, about half the length of an SAT.' },
  { n: '02', title: 'Get your plan.', line: 'Built from your misses and sized to your test date.' },
  { n: '03', title: 'Drill what costs you points.', line: 'The exact question types, with the reason behind every miss.' },
];

const DIAGNOSIS_POINTS = [
  'Every miss is filed under the SAT skill and the error type behind it.',
  'The explanation shows the fast method, not just the answer.',
  'Drills target the exact question type, not the whole section.',
  'Your plan re-sorts itself after every session.',
];

const HERO_ALT = 'The diagnosis screen: your biggest challenge named, the points it costs, and the skills behind it';
const PLAN_ALT = 'SEVA Study Plan: the score now, the days to the test, and one card per session with the skill it works on and a Start button';
const PLAN_SIZES = '(max-width: 960px) calc(100vw - 88px), 520px';

/** The six questions a visitor actually asks. Facts only: no guarantees, no crowd numbers. */
const faqItems = (billingLive, p) => [
  { q: 'What is SEVA?',
    a: 'SEVA is Digital SAT prep built around a diagnosis. You take an adaptive diagnostic, SEVA names the skills and error types costing you points, and it builds a plan and drills around them.' },
  { q: 'Is the practice like the real Digital SAT?',
    a: 'Yes. Practice tests are adaptive with two modules per section, in the Bluebook layout, with highlighting, cross-out and a pacing timer. The bank has 2,200+ hand-authored questions across every SAT domain.' },
  { q: 'How long is the diagnostic?',
    a: 'Forty questions, about half the length of a real SAT. Module 2 adapts to how you did on Module 1, like the official test.' },
  { q: 'What does a study session look like?',
    a: 'A plan card names the skill and why it is on your plan. You drill that question type, and every miss comes back with the fast method and the error type behind it.' },
  { q: 'Do I need to be aiming for a top score?',
    a: 'No. The plan starts wherever your diagnostic puts you and works on the cheapest points first.' },
  { q: 'What does it cost?',
    a: billingLive
      ? `Free for ${p.TRIAL_DAYS} days, then $${p.PRICE_MONTHLY} a month or $${p.PRICE_ANNUAL_TOTAL} a year. Cancel anytime before day ${p.TRIAL_DAYS} and you won't be charged.`
      : 'Nothing during early access. The full product, everything included.' },
];

/**
 * @param {{
 *   openAuth: (loginMode?: boolean, plan?: 'monthly'|'annual'|null) => void,
 *   billingLive: boolean,
 *   creatorRibbon?: boolean,
 *   pricing: { TRIAL_DAYS: number, PRICE_MONTHLY: number, PRICE_ANNUAL_MONTHLY: number,
 *              PRICE_ANNUAL_TOTAL: number, ANNUAL_SAVINGS: number },
 * }} props
 */
const LandingPageV2 = ({ openAuth, billingLive, creatorRibbon = false, pricing }) => {
  const { TRIAL_DAYS, PRICE_MONTHLY, PRICE_ANNUAL_MONTHLY, PRICE_ANNUAL_TOTAL, ANNUAL_SAVINGS } = pricing;
  const videoRef = useRef(null);
  const [navLine, setNavLine] = useState(false);

  const freeLine = billingLive
    ? `Free for ${TRIAL_DAYS} days. Cancel anytime before day ${TRIAL_DAYS} and you won't be charged.`
    : 'Free during early access. No credit card required.';

  // The hero recording plays (muted, looping) only while it is on screen. A
  // reduced-motion reader gets controls and no autoplay; preload="none" means
  // nothing downloads until it is about to play.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      v.controls = true;
      v.preload = 'metadata';
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && en.intersectionRatio >= 0.35) {
          const play = en.target.play();
          if (play && typeof play.catch === 'function') play.catch(() => { en.target.controls = true; });
        } else if (!en.target.paused) {
          en.target.pause();
        }
      });
    }, { threshold: [0, 0.35, 0.6] });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // A 1px rule appears under the nav once the page has scrolled. No elevation
  // animation, no transform: one class toggle.
  useEffect(() => {
    const onScroll = () => setNavLine(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const marqueeItems = [...ROSTER, ...ROSTER];

  return (
    <div className="lpv2">
      {creatorRibbon && (
        <div className="lpv2-ribbon" role="status">
          Creator discount active: 20% off your first 3 months, applied automatically at checkout.
        </div>
      )}

      {/* ── 0. Announcement strip ─────────────────────────────────────── */}
      <div className="lpv2-strip">{freeLine}</div>

      {/* ── 1. Nav ────────────────────────────────────────────────────── */}
      <nav className={`lpv2-nav${navLine ? ' is-scrolled' : ''}`}>
        <div className="lpv2-wrap lpv2-nav-inner">
          <a href="/" className="lpv2-brand" aria-label="SEVA"><Wordmark size="lg" tone="dark" /></a>
          <div className="lpv2-nav-links">
            <a href="#how" onClick={scrollTo('how')}>How it works</a>
            <a href="#why" onClick={scrollTo('why')}>The diagnosis</a>
            <a href="#pricing" onClick={scrollTo('pricing')}>Pricing</a>
            <a href="#faq" onClick={scrollTo('faq')}>FAQ</a>
          </div>
          <div className="lpv2-nav-actions">
            <button type="button" className="lpv2-btn lpv2-btn-secondary lpv2-btn-sm lpv2-nav-login" onClick={() => openAuth(true)}>Log in</button>
            <button type="button" className="lpv2-btn lpv2-btn-primary lpv2-btn-sm" onClick={() => openAuth(false)}>Start free</button>
          </div>
        </div>
      </nav>

      {/* ── 2. Hero ───────────────────────────────────────────────────── */}
      <header className="lpv2-hero">
        <div className="lpv2-wrap lpv2-hero-grid">
          <div className="lpv2-hero-copy">
            <h1 className="lpv2-h1">Find out why you miss SAT questions. Then fix exactly that.</h1>
            <p className="lpv2-hero-sub">
              An adaptive diagnostic finds the skills costing you points. A plan and drills fix them, with the reason behind every miss.
            </p>
            <div className="lpv2-hero-cta">
              <button type="button" className="lpv2-btn lpv2-btn-primary" onClick={() => openAuth(false)}>
                Start free<ArrowRight />
              </button>
            </div>
            <p className="lpv2-hero-note"><Check size={15} />{freeLine}</p>
          </div>

          <div className="lpv2-hero-media">
            {/* The still inside the <video> is what a browser without video
                support, or a failed load, shows. */}
            <video
              ref={videoRef}
              className="lpv2-hero-video"
              muted
              playsInline
              loop
              preload="none"
              poster={`${PU}/showcase/video/diagnosis-poster@2x.webp`}
              width="1920"
              height="1200"
              aria-label={HERO_ALT}
            >
              <source src={`${PU}/showcase/video/diagnosis.webm`} type="video/webm" />
              <source src={`${PU}/showcase/video/diagnosis.mp4`} type="video/mp4" />
              <picture>
                <source type="image/webp" srcSet={`${PU}/showcase/diagnosis.webp 1440w, ${PU}/showcase/diagnosis@2x.webp 2880w`} sizes="(max-width: 960px) calc(100vw - 48px), 560px" />
                <img
                  src={`${PU}/showcase/diagnosis@2x.png`}
                  srcSet={`${PU}/showcase/diagnosis.png 1440w, ${PU}/showcase/diagnosis@2x.png 2880w`}
                  sizes="(max-width: 960px) calc(100vw - 48px), 560px"
                  alt={HERO_ALT}
                  width="2880"
                  height="1800"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </video>
            {/* A real finding from this recording, set beside the frame rather
                than over it so the product stays uncovered. */}
            <p className="lpv2-hero-caption">
              <span className="lpv2-hero-caption-num">−40 pts</span>
              <span className="lpv2-hero-caption-text">Word problems break at the translation step</span>
            </p>
          </div>
        </div>
      </header>

      {/* ── 3. Inventory strip ────────────────────────────────────────── */}
      <section className="lpv2-inventory">
        <div className="lpv2-wrap">
          <p className="lpv2-eyebrow lpv2-center">What&rsquo;s inside</p>
          <div className="lpv2-inv-grid">
            {INVENTORY.map((it) => (
              <div className="lpv2-inv" key={it.label}>
                <div className="lpv2-inv-n">{it.n}</div>
                <div className="lpv2-inv-label">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How it works ───────────────────────────────────────────── */}
      <section id="how" className="lpv2-section">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">Three steps to a higher score.</h2>
          <div className="lpv2-how-grid">
            <div className="lpv2-how-tile">
              <picture>
                <source type="image/webp" srcSet={`${PU}/showcase/study-plan.webp 1440w, ${PU}/showcase/study-plan@2x.webp 2880w`} sizes={PLAN_SIZES} />
                <img
                  className="lpv2-how-shot"
                  src={`${PU}/showcase/study-plan@2x.png`}
                  srcSet={`${PU}/showcase/study-plan.png 1440w, ${PU}/showcase/study-plan@2x.png 2880w`}
                  sizes={PLAN_SIZES}
                  alt={PLAN_ALT}
                  width="2880"
                  height="1800"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <ol className="lpv2-steps">
              {STEPS.map((s) => (
                <li className="lpv2-step" key={s.n}>
                  <span className="lpv2-step-n" aria-hidden="true">{s.n}</span>
                  <div>
                    <h3 className="lpv2-step-title">{s.title}</h3>
                    <p className="lpv2-step-line">{s.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 5. Score-gain marquee ─────────────────────────────────────── */}
      <div className="lpv2-marquee" aria-hidden="true">
        <div className="lpv2-marquee-track">
          {marqueeItems.map((r, i) => (
            <span className="lpv2-marquee-item" key={`${r.name}-${i}`}>
              <Avatar src={r.img} name={r.name} size={32} />
              <span className="lpv2-marquee-text">{r.name}{'  '}SAT {r.from} → {r.to}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 6. Features ───────────────────────────────────────────────── */}
      <section className="lpv2-section">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">How you&rsquo;ll raise your score.</h2>
          <div className="lpv2-feat-grid">
            <article className="lpv2-feat">
              <div className="lpv2-tile lpv2-tile-peach">
                <div className="lpv2-mini">
                  <span className="lpv2-mini-meta">Thursday · 20 min</span>
                  <span className="lpv2-mini-title">Slope-intercept form</span>
                  <span className="lpv2-mini-pill">Start</span>
                </div>
              </div>
              <h3 className="lpv2-feat-title">A plan that adapts.</h3>
              <p className="lpv2-feat-line">Each session is built from your latest misses and your test date.</p>
            </article>

            <article className="lpv2-feat">
              <div className="lpv2-tile lpv2-tile-navy">
                <span className="lpv2-tile-figure lpv2-tile-figure-lime">−40 pts</span>
                <span className="lpv2-tile-caption">Word problems break at the translation step</span>
              </div>
              <h3 className="lpv2-feat-title">The why behind every miss.</h3>
              <p className="lpv2-feat-line">Six error classes, named in plain language after every test.</p>
            </article>

            <article className="lpv2-feat">
              <div className="lpv2-tile lpv2-tile-lime">
                <span className="lpv2-tile-eyebrow lpv2-ink-green">Focus area</span>
                <span className="lpv2-tile-figure lpv2-tile-figure-sm">Linear equations</span>
                <span className="lpv2-chip lpv2-chip-white">Hard</span>
              </div>
              <h3 className="lpv2-feat-title">True-to-test practice.</h3>
              <p className="lpv2-feat-line">2,200+ hand-authored questions and 12 adaptive full-length tests in the Bluebook layout.</p>
            </article>

            <article className="lpv2-feat">
              <div className="lpv2-tile lpv2-tile-lavender">
                <span className="lpv2-tile-eyebrow">Math accuracy</span>
                <span className="lpv2-tile-figure">64%</span>
                <span className="lpv2-chip lpv2-chip-green"><GainTriangle />7 PTS</span>
              </div>
              <h3 className="lpv2-feat-title">A score you can watch move.</h3>
              <p className="lpv2-feat-line">Projected score, accuracy and pacing after every session.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── 7. Results ────────────────────────────────────────────────── */}
      <section id="results" className="lpv2-section">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">Real students. Real score gains.</h2>
          <div className="lpv2-results">
            {ROSTER.slice(0, 3).map((r) => (
              <figure className="lpv2-quote" key={r.name}>
                <span className="lpv2-quote-badge">SAT {r.from} → {r.to}</span>
                <blockquote className="lpv2-quote-text">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="lpv2-quote-person">
                  <Avatar src={r.img} name={r.name} size={48} />
                  <span>
                    <span className="lpv2-quote-name">{r.name}</span>
                    <span className="lpv2-quote-meta">{r.meta}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. The diagnosis ──────────────────────────────────────────── */}
      <section id="why" className="lpv2-section">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">See exactly why you missed it.</h2>
          <p className="lpv2-sub">Answer one real question. SEVA marks it, explains it, and tells you what it just learned about you.</p>
          <div className="lpv2-try-tile">
            <LandingTryIt onStart={() => openAuth(false)} />
          </div>
          <ul className="lpv2-points">
            {DIAGNOSIS_POINTS.map((t) => (
              <li key={t}><span className="lpv2-point-icon"><CheckCircle /></span>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 9. Pricing ────────────────────────────────────────────────── */}
      <section id="pricing" className="lpv2-section">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">{billingLive ? 'Simple pricing. Everything included.' : 'Free during early access.'}</h2>
          <p className="lpv2-sub">
            {billingLive
              ? `Start with a ${TRIAL_DAYS}-day free trial. You won't be charged until day ${TRIAL_DAYS}, and you can cancel anytime before then. Then keep going month to month, or save with an annual plan.`
              : 'SEVA is free during early access. The full product, everything included. One plan.'}
          </p>

          {billingLive ? (
            <>
              <div className="lpv2-plans">
                <div className="lpv2-plan">
                  <h3 className="lpv2-plan-name">Monthly</h3>
                  <p className="lpv2-plan-line">Keep going month to month.</p>
                  <p className="lpv2-plan-price">{`$${PRICE_MONTHLY}`}<span className="lpv2-plan-per">/month</span></p>
                  <p className="lpv2-plan-billed">Billed monthly. Cancel anytime.</p>
                  <button type="button" className="lpv2-btn lpv2-btn-primary lpv2-plan-cta" onClick={() => openAuth(false, 'monthly')}>{`Start your ${TRIAL_DAYS}-day free trial`}</button>
                </div>
                <div className="lpv2-plan is-featured">
                  <span className="lpv2-plan-badge">Best value</span>
                  <h3 className="lpv2-plan-name">Annual</h3>
                  <p className="lpv2-plan-line">One payment, the lowest monthly price.</p>
                  <p className="lpv2-plan-price">{`$${PRICE_ANNUAL_MONTHLY}`}<span className="lpv2-plan-per">/month</span></p>
                  <p className="lpv2-plan-billed">{`One payment of $${PRICE_ANNUAL_TOTAL} per year, save $${ANNUAL_SAVINGS} vs monthly`}</p>
                  <button type="button" className="lpv2-btn lpv2-btn-primary lpv2-plan-cta" onClick={() => openAuth(false, 'annual')}>{`Start your ${TRIAL_DAYS}-day free trial`}</button>
                </div>
              </div>
              <p className="lpv2-plan-foot">{`Cancel anytime before day ${TRIAL_DAYS} and you won't be charged.`}</p>
            </>
          ) : (
            <div className="lpv2-plans is-single">
              <div className="lpv2-plan is-featured">
                <span className="lpv2-plan-badge">Early access</span>
                <h3 className="lpv2-plan-name">Free during early access</h3>
                <p className="lpv2-plan-line">The full product, everything included.</p>
                <p className="lpv2-plan-price">Free</p>
                <p className="lpv2-plan-billed">No credit card required.</p>
                <button type="button" className="lpv2-btn lpv2-btn-primary lpv2-plan-cta" onClick={() => openAuth(false)}>Get started for free</button>
              </div>
            </div>
          )}

          <div className="lpv2-includes">
            <ul>
              {PRICING_INCLUDES.map((item) => (
                <li key={item}><span className="lpv2-include-icon"><Check size={15} /></span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ───────────────────────────────────────────────────── */}
      <section id="faq" className="lpv2-section">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">Frequently asked questions.</h2>
          <div className="lpv2-faq">
            {faqItems(billingLive, { TRIAL_DAYS, PRICE_MONTHLY, PRICE_ANNUAL_TOTAL }).map((f) => (
              <details className="lpv2-faq-item" key={f.q}>
                <summary>{f.q}<Chevron /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Final CTA ─────────────────────────────────────────────── */}
      <section className="lpv2-final">
        <div className="lpv2-wrap">
          <h2 className="lpv2-h2">Get your diagnosis today.</h2>
          <p className="lpv2-sub">In about an hour you&rsquo;ll know exactly which skills to fix.</p>
          <button type="button" className="lpv2-btn lpv2-btn-primary" onClick={() => openAuth(false)}>
            Start free<ArrowRight />
          </button>
        </div>
      </section>

      {/* ── 12. Footer ────────────────────────────────────────────────── */}
      <footer className="lpv2-footer">
        <div className="lpv2-wrap">
          <div className="lpv2-foot-grid">
            <div className="lpv2-foot-brand">
              <Wordmark size="md" tone="dark" />
              <p>Digital SAT prep built around a diagnosis.</p>
            </div>
            <div className="lpv2-foot-col">
              <p className="lpv2-foot-title">Product</p>
              <a href="#how" onClick={scrollTo('how')}>How it works</a>
              <a href="#why" onClick={scrollTo('why')}>The diagnosis</a>
              <a href="#pricing" onClick={scrollTo('pricing')}>Pricing</a>
              <a href="#faq" onClick={scrollTo('faq')}>FAQ</a>
            </div>
            <div className="lpv2-foot-col">
              <p className="lpv2-foot-title">Account</p>
              <button type="button" onClick={() => openAuth(true)}>Log in</button>
              <button type="button" onClick={() => openAuth(false)}>Start free</button>
            </div>
            <div className="lpv2-foot-col">
              <p className="lpv2-foot-title">Legal</p>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
          <div className="lpv2-foot-bottom">
            <span>&copy; {new Date().getFullYear()} SEVA. All rights reserved.</span>
            <span>SAT is a registered trademark of the College Board, which does not endorse this product.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV2;
