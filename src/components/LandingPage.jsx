import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { getReferral } from '../services/refTracker';
import { PRICE_MONTHLY, PRICE_ANNUAL_MONTHLY, PRICE_ANNUAL_TOTAL, ANNUAL_SAVINGS, TRIAL_DAYS } from '../services/pricing';
import { Modal } from './ui/Modal';
import Wordmark from './ui/Wordmark';
import LandingPageV2 from './LandingPageV2';
import { Avatar, svgBase } from './landingShared';
import { ROSTER, PRICING_INCLUDES } from '../data/landingRoster';
import './LandingPage.css';

// The pre-signup quiz funnel is its own chunk: the landing page must stay
// light (it's an eager import in App.jsx), and most visitors bounce before
// clicking a CTA.
const OnboardingFunnel = React.lazy(() => import('./onboarding/OnboardingFunnel'));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ── Inline icon helpers (match the mockup's SVGs exactly) ──────────────── */
const ArrowRight = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" {...svgBase}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const CheckMark = ({ size = 15, stroke = 'var(--lp-lime-deep)', sw = 2.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke={stroke} strokeWidth={sw} {...svgBase}><path d="M20 6 9 17l-5-5" /></svg>
);
const XMark = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="var(--lp-text-3)" strokeWidth="2.8" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

/* ── Count-up: animates 0 → `to` when the number scrolls into view ──────── */
const CountUp = ({ to, suffix = '', duration = 1500, className, style }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { setVal(to); return undefined; }
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setVal(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} className={className} style={style}>{val.toLocaleString('en-US')}{suffix}</span>;
};

/* ── Score-trajectory chart: the line draws itself when scrolled into view ─ */
const TRAJ = [
  { score: 1190, label: 'Diagnostic' },
  { score: 1240, label: 'Test 2' },
  { score: 1310, label: 'Test 3' },
  { score: 1360, label: 'Test 4' },
  { score: 1450, label: 'Test 5' },
];
const TrajectoryChart = () => {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const [len, setLen] = useState(1200);

  const W = 680; const H = 320; const PX = 56; const PT = 46; const PB = 58;
  const MIN = 1120; const MAX = 1560;
  const x = (i) => PX + (i / (TRAJ.length - 1)) * (W - PX * 2);
  const y = (s) => PT + (1 - (s - MIN) / (MAX - MIN)) * (H - PT - PB);
  const d = TRAJ.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.score)}`).join(' ');
  const goalY = y(1500);
  const areaD = `${d} L${x(TRAJ.length - 1)},${H - PB} L${x(0)},${H - PB} Z`;

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength() + 2);
  }, []);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { setDrawn(true); return undefined; }
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`lp-traj-chart${drawn ? ' is-drawn' : ''}`}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Score trajectory from 1190 to 1450, approaching a 1500 goal">
        <defs>
          <linearGradient id="lpTrajLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F2865C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="lpTrajArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(234,88,12,.28)" />
            <stop offset="100%" stopColor="rgba(234,88,12,0)" />
          </linearGradient>
        </defs>

        {/* Goal line */}
        <line className="lp-traj-goal" x1={PX - 10} y1={goalY} x2={W - PX + 10} y2={goalY} />
        <text className="lp-traj-goal-label" x={W - PX + 10} y={goalY - 9} textAnchor="end">GOAL 1500</text>

        {/* Area under the line */}
        <path className="lp-traj-area" d={areaD} fill="url(#lpTrajArea)" />

        {/* The line itself — drawn via dashoffset */}
        <path
          ref={pathRef}
          className="lp-traj-line"
          d={d}
          stroke="url(#lpTrajLine)"
          style={{ strokeDasharray: len, strokeDashoffset: drawn ? 0 : len }}
        />

        {/* Dots + score labels pop in sequence as the line reaches them */}
        {TRAJ.map((p, i) => (
          <g key={p.label} className="lp-traj-pt" style={{ transitionDelay: `${350 + i * 320}ms` }}>
            <circle cx={x(i)} cy={y(p.score)} r={i === TRAJ.length - 1 ? 7 : 5.5} />
            <text className="lp-traj-score" x={x(i)} y={y(p.score) - 15} textAnchor="middle">{p.score}</text>
            <text className="lp-traj-xlabel" x={x(i)} y={H - PB + 26} textAnchor="middle">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Feature cards — icon inherits `currentColor` from the wrapper's color.
const FEATURES = [
  { title: 'Adaptive Diagnostic', iconBg: 'var(--lp-orange-tint)', iconCol: 'var(--lp-orange)',
    desc: 'A full adaptive diagnostic — about half the length of a real SAT — that pinpoints every weak skill, the foundation the rest of your prep is built on.',
    icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" /></> },
  { title: 'Diagnostic-Driven Plan', iconBg: 'var(--lp-purple-tint)', iconCol: 'var(--lp-purple)',
    desc: 'A week-by-week study plan that starts where the points are cheapest to win and adapts as you improve.',
    icon: <><rect x="8" y="3" width="8" height="4" rx="1.5" /><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><path d="m9 14 2 2 4-4" /></> },
  { title: '2,200+ Question Bank', iconBg: 'rgba(90,138,22,.12)', iconCol: 'var(--lp-lime-deep)',
    desc: 'Hand-authored questions across every SAT domain and skill, each with a worked explanation you can drill on demand.',
    icon: <><path d="M12 2 2 7l10 5 10-5z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></> },
  { title: 'AI Tutor', iconBg: 'var(--lp-orange-tint)', iconCol: 'var(--lp-orange)',
    desc: 'Instant hints and step-by-step explanations on any question — the second you get stuck, not the next day.',
    icon: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M5 16l.8 2L8 18.8 6 19.6 5 22l-.8-2.4L2 18.8 4.2 18z" /></> },
  { title: 'Full-Length Tests', iconBg: 'var(--lp-purple-tint)', iconCol: 'var(--lp-purple)',
    desc: 'Realistic, Bluebook-format practice tests with highlighting, cross-out, and a live pacing timer.',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" /></> },
  { title: 'Score-Trajectory Tracking', iconBg: 'rgba(90,138,22,.12)', iconCol: 'var(--lp-lime-deep)',
    desc: 'Watch your projected score climb toward your goal, section by section, after every session.',
    icon: <><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-6" /></> },
];

const STEPS = [
  { n: '1', title: 'Take your diagnostic', bg: 'orange',
    desc: 'An adaptive diagnostic finds exactly which skills are costing you points.',
    icon: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6M8 11h6" /></> },
  { n: '2', title: 'Get your custom plan', bg: 'purple',
    desc: 'SEVA builds a week-by-week plan around your weak spots and your test date.',
    icon: <><rect x="8" y="3" width="8" height="4" rx="1.5" /><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><path d="m9 14 2 2 4-4" /></> },
  { n: '3', title: 'Practice what matters', bg: 'lime',
    desc: 'Drill the right questions with an AI tutor beside you, and watch your score climb.',
    icon: <path d="M13 2 3 14h9l-1 8 10-12h-9z" /> },
];

// Skill marquee rows — real skills from the bank, math up top, R&W below.
const SKILLS_MATH = ['Linear equations', 'Systems of equations', 'Quadratic functions', 'Exponential growth', 'Percents', 'Ratios & rates', 'Probability', 'Scatterplots', 'Circle theorems', 'Right triangles', 'Function notation', 'Absolute value'];
const SKILLS_RW = ['Transitions', 'Command of Evidence', 'Words in Context', 'Central Ideas', 'Sentence boundaries', 'Subject-verb agreement', 'Pronouns', 'Verb tense', 'Rhetorical synthesis', 'Cross-text connections', 'Text structure', 'Inferences'];

// Philosophy statement, revealed word by word on scroll.
const PHILOSOPHY_WORDS = [
  ...("We don't promise you a score.".split(' ').map((w) => ({ w }))),
  { br: true },
  ...('We build the'.split(' ').map((w) => ({ w }))),
  ...('student that earns it.'.split(' ').map((w) => ({ w, cls: 'lp-c-orange' }))),
];

const LandingPage = () => {
  // Billing dark-launch: pricing copy flips with the same flag as the app's
  // paywall so the landing page never promises "free forever" once the
  // 3-day-trial model is live (and never promises a trial before it exists).
  const billingLive = useFeatureFlag('billing');
  // landingV2: the "show, don't tell" page (try-it hero + product tour).
  // `?lp=v2` previews it without touching the flag, so a reviewer can open the
  // new page by link on any deploy; `?lp=v1` forces the old page the same way.
  const v2Flag = useFeatureFlag('landingV2');
  const lpParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('lp') : null;
  const v2 = lpParam === 'v2' ? true : lpParam === 'v1' ? false : v2Flag;
  // Creator-link visitors (sevaprep.com/r/<slug>) get a confirmation ribbon so
  // the promised 20% reads as real before the Stripe page finally shows it.
  // getReferral never throws and returns null for everyone else.
  const creatorRef = getReferral();
  const [showAuth, setShowAuth] = useState(false); // login modal
  const [showFunnel, setShowFunnel] = useState(false); // signup quiz funnel
  const [active, setActive] = useState(0); // results carousel index (can go +/-, wrapped on read)
  const [navScrolled, setNavScrolled] = useState(false);

  // Login Form State (signup now lives inside the funnel)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, login, user, loading: authLoading } = useAuth();
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const plxRefs = useRef([]);
  const addPlx = useCallback((el) => {
    if (el && !plxRefs.current.includes(el)) plxRefs.current.push(el);
  }, []);

  // Scroll-reveal: fade sections up as they enter the viewport. `data-anim`
  // variants slide from the left/right or scale in; `.lp-stag` staggers its
  // children. Re-runs when we come back from the funnel.
  useEffect(() => {
    if (showFunnel || v2) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;
    const els = Array.from(root.querySelectorAll('.lp-reveal, .lp-stag'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const t = en.target;
        if (t.classList.contains('lp-stag')) {
          Array.from(t.children).forEach((c, i) => { c.style.transitionDelay = `${i * 90}ms`; });
        }
        t.classList.add('in');
        io.unobserve(t);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    els.forEach((e) => io.observe(e));
    const fallback = setTimeout(() => els.forEach((e) => e.classList.add('in')), 2800);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [showFunnel, v2]);

  // One scroll pass drives everything scroll-linked: the tri-color progress
  // bar, the nav elevation, and the parallax glow blobs. rAF-throttled,
  // passive, transform-only — no layout writes outside the frame.
  useEffect(() => {
    if (showFunnel || v2) return undefined;
    const reduced = prefersReducedMotion();
    plxRefs.current = plxRefs.current.filter((el) => el && el.isConnected);
    let raf = 0;
    const update = () => {
      raf = 0;
      const sY = window.scrollY;
      const doc = document.documentElement;
      const denom = doc.scrollHeight - doc.clientHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${denom > 0 ? sY / denom : 0})`;
      setNavScrolled(sY > 8);
      if (!reduced) {
        const vh2 = window.innerHeight / 2;
        plxRefs.current.forEach((el) => {
          const r = el.getBoundingClientRect();
          const mid = r.top + r.height / 2 - vh2;
          el.style.setProperty('--lp-plx', `${(mid * -parseFloat(el.dataset.speed || '0.08')).toFixed(1)}px`);
        });
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [showFunnel, v2]);

  // Pointer tilt on the hero product panel — desktop pointers only.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // User will be redirected automatically by App.jsx routing
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Every signup CTA routes through the quiz funnel; only "Log in" opens
  // the modal directly. A plan-specific pricing CTA carries its plan into
  // the funnel (the signup step then skips the plan question); generic CTAs
  // pass none and the funnel asks.
  const [funnelPlan, setFunnelPlan] = useState(null); // 'monthly' | 'annual' | null
  const openAuth = (loginMode = false, plan = null) => {
    if (loginMode) {
      setShowFunnel(false);
      setShowAuth(true);
    } else if (user || authLoading) {
      // Defense-in-depth behind the App route gate: a live (or still
      // resolving) session must never reach the signup funnel — completing
      // it against an existing account mutates that account (bug filed
      // 2026-08-13). The route redirects signed-in visitors anyway; this
      // guard covers any direct mount during the auth-restore window.
      return;
    } else {
      setFunnelPlan(plan === 'monthly' || plan === 'annual' ? plan : null);
      setShowAuth(false);
      setShowFunnel(true);
    }
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Results carousel: `active` is unbounded; wrap on read so prev/next always
  // resolve to a real roster entry.
  const cycle = (d) => setActive((a) => a + d);
  const rn = ROSTER.length;
  const ri = ((active % rn) + rn) % rn;
  const cur = ROSTER[ri];
  const prevCard = ROSTER[(ri - 1 + rn) % rn];
  const nextCard = ROSTER[(ri + 1) % rn];

  if (showFunnel && !user) {
    return (
      <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#F6F4EF' }} />}>
        <OnboardingFunnel
          signup={signup}
          billingLive={billingLive}
          presetPlan={funnelPlan}
          onExit={() => setShowFunnel(false)}
          onLogIn={() => openAuth(true)}
        />
      </React.Suspense>
    );
  }

  // The login modal is shared by both landing pages (signup always goes
  // through the funnel), so it is built once and rendered after whichever
  // page body is active.
  const loginModal = (
    <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} title="Welcome Back" maxWidth="480px">
      <p className="auth-form-subtitle" style={{ marginTop: '-0.5rem', marginBottom: '1.5rem', color: 'var(--color-slate-500)' }}>
        Log in to continue learning
      </p>
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label className="auth-form-label" htmlFor="email">Email</label>
          <input id="email" type="email" className="auth-form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div className="auth-form-group">
          <label className="auth-form-label" htmlFor="password">Password</label>
          <input id="password" type="password" className="auth-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength="6" />
        </div>
        {error && <div className="auth-form-error">{error}</div>}
        <button type="submit" className="auth-form-submit" disabled={loading}>{loading ? 'Please wait...' : 'Log In'}</button>
        <button type="button" className="auth-form-toggle" onClick={() => { setShowAuth(false); openAuth(false); }}>
          Don't have an account? Sign up
        </button>
      </form>
    </Modal>
  );

  // landingV2 — the Acely-style rebuild. Its own component, its own CSS; this
  // file keeps only the behaviour (auth, funnel, billing flag, modal).
  if (v2) {
    return (
      <>
        <LandingPageV2
          openAuth={openAuth}
          billingLive={billingLive}
          creatorRibbon={Boolean(creatorRef) && billingLive}
          pricing={{ TRIAL_DAYS, PRICE_MONTHLY, PRICE_ANNUAL_MONTHLY, PRICE_ANNUAL_TOTAL, ANNUAL_SAVINGS }}
        />
        {loginModal}
      </>
    );
  }

  const findingCard = (
          <div className="lp-finding lp-stag" aria-label="Example diagnosis finding">
            <div className="lp-finding-head">
              <span className="lp-finding-chip">1</span>
              <div className="lp-finding-cost">
                <div className="lp-finding-cost-num">~40 pts</div>
                <div className="lp-finding-cost-label">est. cost</div>
              </div>
            </div>
            <p className="lp-finding-headline">Word problems break at the translation step, not the algebra.</p>
            <p className="lp-finding-story">You set up the wrong relationship before the math even starts — and you give these <strong>38 seconds</strong> against <strong>64</strong> on the ones you get right.</p>
            <p className="lp-finding-why"><strong>Why:</strong> you feel the uncertainty early and rush to commit instead of re-reading the setup.</p>
            <div className="lp-finding-pills">
              <span>Word problems: 2/7</span>
              <span>38s vs 64s on correct</span>
              <span>4 misses · same setup slip</span>
            </div>
          </div>
  );
  const brandSection = (
      <section id="why" className="lp-brand lp-reveal">
        <div className="lp-brand-card">
          <div className="lp-brand-blob-a lp-plx" data-speed="0.06" ref={addPlx} aria-hidden="true" />
          <div className="lp-brand-blob-b lp-plx" data-speed="0.1" ref={addPlx} aria-hidden="true" />
          <div className="lp-brand-grid">
            <div>
              <div className="lp-brand-kicker">
                <span className="lp-brand-kicker-line" />
                <span className="lp-brand-kicker-text">The SEVA promise</span>
              </div>
              <h2 className="lp-brand-title">
                <span>A Tutor's</span>
                <span className="grad">Heart.</span>
                <span className="mt">A Machine's</span>
                <span className="lime">Reach.</span>
              </h2>
            </div>
            <div>
              <p className="lp-brand-copy">The patience and insight of a great tutor — the kind who notices <i>why</i> you missed a question, not just that you did — delivered to every student, on every question, at any hour.</p>
              <div className="lp-brand-rows">
                <div className="lp-brand-row">
                  <span className="lp-brand-row-icon orange">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#F2865C" stroke="none"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 1.7 5 4.9 5c2 0 3.3 1.2 4.1 2.4l.9 1.3.9-1.3C11.7 6.2 13 5 15 5c3.3 0 4.7 3.4 2.9 6.7C19.5 16.4 12 21 12 21z" /></svg>
                  </span>
                  <span>Explanations that adapt to how <i>you</i> think</span>
                </div>
                <div className="lp-brand-row">
                  <span className="lp-brand-row-icon lime">
                    <svg width="20" height="20" viewBox="0 0 24 24" stroke="#C0F054" strokeWidth="2" {...svgBase}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>
                  </span>
                  <span>Available the second you're stuck — never a wait</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );

  return (
    <div className="landing-container" ref={rootRef}>
      {/* Tri-color scroll progress — the brand S, stretched across the page. */}
      <div className="lp-progress" ref={progressRef} aria-hidden="true" />

      {creatorRef && billingLive && (
        <div className="lp-ref-banner" role="status">
          Creator discount active — 20% off your first 3 months, applied automatically at checkout.
        </div>
      )}

      {/* ===== NAV ===== */}
      <nav className={`lp-nav${navScrolled ? ' is-scrolled' : ''}`}>
        <div className="lp-nav-inner">
          <a href="/" className="brand-logo" aria-label="SEVA"><Wordmark size="lg" tone="dark" /></a>
          <div className="lp-nav-links">
            <a className="lp-nav-link" href="#diagnosis" onClick={scrollTo('diagnosis')}>The diagnosis</a>
            <a className="lp-nav-link" href="#features" onClick={scrollTo('features')}>Features</a>
            <a className="lp-nav-link" href="#how" onClick={scrollTo('how')}>How it works</a>
            <a className="lp-nav-link" href="#why" onClick={scrollTo('why')}>Why SEVA</a>
          </div>
          <div className="lp-nav-actions">
            <button type="button" className="lp-btn lp-btn-ghost" onClick={() => openAuth(true)}>Log in</button>
            <button type="button" className="lp-btn lp-btn-orange" onClick={() => openAuth(false)}>Start free</button>
          </div>
        </div>
      </nav>

      {/* ===== HERO: slogan + dashboard stage ===== */}
      <header className="lp-hero">
        <div className="lp-hero-blob lp-hero-blob-a lp-plx" data-speed="0.10" ref={addPlx} aria-hidden="true" />
        <div className="lp-hero-blob lp-hero-blob-b lp-plx" data-speed="0.16" ref={addPlx} aria-hidden="true" />
        <div className="lp-hero-inner is-centered">
          <div>
            <span className="lp-badge lp-enter" style={{ '--d': '0ms' }}><span className="lp-badge-dot" />Built for the Digital SAT</span>
            <h1 className="lp-hero-title">
              <span className="lp-enter" style={{ '--d': '60ms' }}>Knows you like <span className="lp-c-orange">no&nbsp;course&nbsp;can</span>.</span><br />
              <span className="lp-enter" style={{ '--d': '160ms' }}>Shows up like <span className="lp-c-purple">no&nbsp;tutor&nbsp;does</span>.</span><br />
              <span className="lp-enter" style={{ '--d': '260ms' }}>Tells you the truth <span className="lp-c-lime">neither&nbsp;does</span>.</span>
            </h1>
            <p className="lp-hero-desc lp-enter" style={{ '--d': '380ms' }}>
              SEVA is AI-powered Digital SAT prep that diagnoses exactly <i>why</i> you miss each question — then builds the plan that fixes it.
            </p>
            <div className="lp-hero-actions lp-enter" style={{ '--d': '470ms' }}>
              <button type="button" className="lp-btn lp-btn-orange lp-btn-orange-lg" onClick={() => openAuth(false)}>
                Start your free diagnostic<ArrowRight />
              </button>
              <a className="lp-btn-ghost-bordered" href="#how" onClick={scrollTo('how')}>See how it works</a>
            </div>
            {billingLive ? (
              <p className="lp-hero-note lp-enter" style={{ '--d': '560ms' }}>{`Free for ${TRIAL_DAYS} days, then $${PRICE_MONTHLY}/month or $${PRICE_ANNUAL_TOTAL}/year. Cancel anytime before day ${TRIAL_DAYS} and you won't be charged.`}</p>
            ) : (
              <div className="lp-hero-trust lp-enter" style={{ '--d': '560ms' }}>
                <span><CheckMark />Free to start</span>
                <span><CheckMark />No credit card</span>
              </div>
            )}
          </div>

        </div>

        {/* The product itself, right under the promise: the Home dashboard a
            student sees every day, on a navy stage that runs into the stats. */}
        <div className="lp-hero-stage">
          <figure className="lp-hero-product lp-enter" style={{ '--d': '520ms' }}>
            <div className="lp-shot-bar" aria-hidden="true"><span /><span /><span /></div>
            <picture>
              <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/showcase/dashboard.webp 1440w, ${process.env.PUBLIC_URL}/showcase/dashboard@2x.webp 2880w`} sizes="(max-width: 1264px) calc(100vw - 64px), 1200px" />
              <img
                src={`${process.env.PUBLIC_URL}/showcase/dashboard@2x.png`}
                srcSet={`${process.env.PUBLIC_URL}/showcase/dashboard.png 1440w, ${process.env.PUBLIC_URL}/showcase/dashboard@2x.png 2880w`}
                sizes="(max-width: 1264px) calc(100vw - 64px), 1200px"
                alt="SEVA Home dashboard: performance snapshot with overall accuracy, consistency and pacing tiles, an estimated starting score of 1400 with Math and R&W ranges, days until the test, a practice calendar, and weak spots to pick up"
                width="2880"
                height="1800"
                fetchpriority="high" decoding="async"
              />
            </picture>
          </figure>
        </div>
      </header>

      {/* ===== STATS STRIP (count-up on scroll) ===== */}
      <section className="lp-stats lp-reveal">
        <div className="lp-stats-inner lp-stag">
          <div className="lp-stat"><div className="lp-stat-num"><CountUp to={2200} suffix="+" /></div><div className="lp-stat-label">Hand-authored questions</div></div>
          <div className="lp-stat"><div className="lp-stat-num is-lime"><CountUp to={12} duration={1100} /></div><div className="lp-stat-label">Full-length adaptive tests</div></div>
          <div className="lp-stat"><div className="lp-stat-num is-purple"><CountUp to={42} duration={1300} /></div><div className="lp-stat-label">Textbook chapters</div></div>
          <div className="lp-stat"><div className="lp-stat-num is-orange"><CountUp to={161} duration={1600} /></div><div className="lp-stat-label">Question types covered</div></div>
        </div>
      </section>

      {/* ===== SKILL MARQUEE ===== */}
      <section className="lp-marquee" aria-hidden="true">
        <div className="lp-marquee-row">
          <div className="lp-marquee-track">
            {[...SKILLS_MATH, ...SKILLS_MATH].map((s, i) => <span className="lp-chip" key={`m${i}`}>{s}</span>)}
          </div>
        </div>
        <div className="lp-marquee-row is-reverse">
          <div className="lp-marquee-track">
            {[...SKILLS_RW, ...SKILLS_RW].map((s, i) => <span className="lp-chip is-alt" key={`r${i}`}>{s}</span>)}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section className="lp-compare">
        <div className="lp-compare-head lp-reveal">
          <h2 className="lp-compare-title">
            A prep course tells you <span className="muted">what to study</span>.<br />
            SEVA tells you <span className="lp-c-orange">why you missed it</span>.
          </h2>
        </div>
        <div className="lp-compare-grid">
          <div className="lp-compare-card lp-compare-card-neg lp-reveal" data-anim="left">
            <div className="lp-compare-eyebrow">A typical prep course</div>
            <div className="lp-compare-list">
              {['The same syllabus for every student', "You're left to find your own weak spots", 'Help only when class is in session'].map((t) => (
                <div className="lp-compare-row" key={t}>
                  <span className="lp-compare-mark lp-compare-mark-x"><XMark /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-compare-card lp-compare-card-pos lp-reveal" data-anim="right">
            <div className="lp-compare-blob" aria-hidden="true" />
            <div className="lp-compare-eyebrow">With SEVA</div>
            <div className="lp-compare-list">
              {['Every session is built around your diagnosis', 'It pinpoints the exact skill behind each miss', "An AI tutor is there the second you're stuck"].map((t) => (
                <div className="lp-compare-row" key={t}>
                  <span className="lp-compare-mark lp-compare-mark-check"><CheckMark stroke="#C0F054" sw={3} size={12} /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE DIAGNOSIS (product-true finding card) ===== */}
      <section id="diagnosis" className="lp-diag">
        <div className="lp-diag-grid">
          <div className="lp-diag-copy lp-reveal" data-anim="left">
            <span className="lp-eyebrow">The diagnosis</span>
            <h2 className="lp-section-title is-left">It doesn't just grade you.<br />It <span className="lp-c-purple">explains you</span>.</h2>
            <p className="lp-diag-sub">
              After every test, SEVA reads your timing, your error patterns, and your answer changes — then hands you the why behind every miss, with the points each one is worth.
            </p>
            <div className="lp-diag-rows">
              <div className="lp-diag-row">
                <span className="lp-diag-row-icon" style={{ background: 'var(--lp-orange-tint)', color: 'var(--lp-orange)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...svgBase}><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 12V2a10 10 0 0 1 10 10z" /></svg>
                </span>
                <span>Every finding priced in points, so you know what it costs you</span>
              </div>
              <div className="lp-diag-row">
                <span className="lp-diag-row-icon" style={{ background: 'var(--lp-purple-tint)', color: 'var(--lp-purple)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...svgBase}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                </span>
                <span>The habit underneath the misses, not just the topic name</span>
              </div>
              <div className="lp-diag-row">
                <span className="lp-diag-row-icon" style={{ background: 'rgba(90,138,22,.12)', color: 'var(--lp-lime-deep)' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...svgBase}><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" rx="1" /><rect x="12" y="8" width="3" height="10" rx="1" /><rect x="17" y="5" width="3" height="13" rx="1" /></svg>
                </span>
                <span>Backed by your actual numbers — never a generic tip</span>
              </div>
            </div>
          </div>

          {findingCard}
        </div>
      </section>

      {/* ===== TRAJECTORY (line draws on scroll) ===== */}
      <section className="lp-traj lp-reveal">
        <div className="lp-section-head">
          <span className="lp-eyebrow">The payoff</span>
          <h2 className="lp-section-title">Watch the line move.</h2>
          <p className="lp-section-sub">Every test updates your trajectory. Every drill bends it toward your goal.</p>
        </div>
        <div className="lp-traj-panel">
          <div className="lp-traj-blob lp-plx" data-speed="0.07" ref={addPlx} aria-hidden="true" />
          <TrajectoryChart />
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="lp-features lp-reveal">
        <div className="lp-section-head">
          <span className="lp-eyebrow">Everything in one place</span>
          <h2 className="lp-section-title">A complete prep system, not just a question dump.</h2>
          <p className="lp-section-sub">Every feature works off one thing: your diagnostic. So the whole app points at the exact points standing between you and your goal.</p>
        </div>
        <div className="lp-feat-grid lp-stag">
          {FEATURES.map((f) => (
            <div className="lp-feat" key={f.title}>
              <span className="lp-feat-icon" style={{ background: f.iconBg, color: f.iconCol }}>
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" {...svgBase}>{f.icon}</svg>
              </span>
              <h3 className="lp-feat-title">{f.title}</h3>
              <p className="lp-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="lp-showcase lp-reveal">
        <div className="lp-section-head">
          <span className="lp-eyebrow">See it in action</span>
          <h2 className="lp-section-title">This is what your prep looks like.</h2>
          <p className="lp-section-sub">The real product, not a mockup — the test runner, the answer review, and the diagnosis that comes after every test.</p>
        </div>

        <div className="lp-shot-row">
          <figure className="lp-shot-frame">
            <div className="lp-shot-bar" aria-hidden="true"><span /><span /><span /></div>
            <picture>
              <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/showcase/test-runner.webp 1440w, ${process.env.PUBLIC_URL}/showcase/test-runner@2x.webp 2880w`} sizes="(max-width: 960px) calc(100vw - 64px), (max-width: 1264px) calc((100vw - 112px) * 0.58), 660px" />
              <img
                src={`${process.env.PUBLIC_URL}/showcase/test-runner@2x.png`}
                srcSet={`${process.env.PUBLIC_URL}/showcase/test-runner.png 1440w, ${process.env.PUBLIC_URL}/showcase/test-runner@2x.png 2880w`}
                sizes="(max-width: 960px) calc(100vw - 64px), (max-width: 1264px) calc((100vw - 112px) * 0.58), 660px"
                alt="SEVA test runner on a Reading and Writing question: Bluebook-style two-pane layout with the passage on the left, the question and four answer choices on the right, a question strip, Mark for Review, timer and Pause"
                width="2880"
                height="1800"
                loading="lazy" decoding="async"
              />
            </picture>
          </figure>
          <div className="lp-shot-copy">
            <h3 className="lp-shot-title">Practice tests that feel like the real thing</h3>
            <ul className="lp-shot-list">
              <li><strong>Bluebook-format runner</strong> — the same two-pane layout, question strip, and Mark for Review you'll see on test day.</li>
              <li><strong>Built-in Desmos graphing calculator</strong> and reference sheet on every math question.</li>
              <li><strong>Timed or untimed.</strong> Practice against the clock, or slow down and think.</li>
              <li><strong>Adaptive Module 2.</strong> Your second module adjusts to your first — exactly like the official digital SAT.</li>
            </ul>
          </div>
        </div>

        <div className="lp-shot-row is-flipped">
          <figure className="lp-shot-frame">
            <div className="lp-shot-bar" aria-hidden="true"><span /><span /><span /></div>
            <picture>
              <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/showcase/review.webp 1440w, ${process.env.PUBLIC_URL}/showcase/review@2x.webp 2880w`} sizes="(max-width: 960px) calc(100vw - 64px), (max-width: 1264px) calc((100vw - 112px) * 0.58), 660px" />
              <img
                src={`${process.env.PUBLIC_URL}/showcase/review@2x.png`}
                srcSet={`${process.env.PUBLIC_URL}/showcase/review.png 1440w, ${process.env.PUBLIC_URL}/showcase/review@2x.png 2880w`}
                sizes="(max-width: 960px) calc(100vw - 64px), (max-width: 1264px) calc((100vw - 112px) * 0.58), 660px"
                alt="SEVA answer review on the same test screen: module tabs showing 15 of 27 and 16 of 27 correct, the correct choice marked with a green check, a Correct pill, the explanation open below, and an Ask the tutor button"
                width="2880"
                height="1800"
                loading="lazy" decoding="async"
              />
            </picture>
          </figure>
          <div className="lp-shot-copy">
            <h3 className="lp-shot-title">Every question, marked — with the why</h3>
            <ul className="lp-shot-list">
              <li><strong>Review on the screen you took the test on.</strong> Correct and wrong answers marked, module by module.</li>
              <li><strong>The explanation is already open</strong> — a full walkthrough, every step written out, plus why the other choices are wrong.</li>
              <li><strong>Your score per module</strong> in the tabs, so you can see exactly where the points went.</li>
              <li><strong>Ask the AI tutor</strong> the second an explanation doesn't land.</li>
            </ul>
          </div>
        </div>

        <div className="lp-shot-row">
          <figure className="lp-shot-frame">
            <div className="lp-shot-bar" aria-hidden="true"><span /><span /><span /></div>
            <picture>
              <source type="image/webp" srcSet={`${process.env.PUBLIC_URL}/showcase/diagnosis.webp 1440w, ${process.env.PUBLIC_URL}/showcase/diagnosis@2x.webp 2880w`} sizes="(max-width: 960px) calc(100vw - 64px), (max-width: 1264px) calc((100vw - 112px) * 0.58), 660px" />
              <img
                src={`${process.env.PUBLIC_URL}/showcase/diagnosis@2x.png`}
                srcSet={`${process.env.PUBLIC_URL}/showcase/diagnosis.png 1440w, ${process.env.PUBLIC_URL}/showcase/diagnosis@2x.png 2880w`}
                sizes="(max-width: 960px) calc(100vw - 64px), (max-width: 1264px) calc((100vw - 112px) * 0.58), 660px"
                alt="SEVA diagnosis after a practice test: score 990 against a 1500 target, 510 points to target, easy wins worth 50 points, Geometry and Trigonometry named the biggest lever, and the diagnosis naming recurring concept gaps as the biggest challenge"
                width="2880"
                height="1800"
                loading="lazy" decoding="async"
              />
            </picture>
          </figure>
          <div className="lp-shot-copy">
            <h3 className="lp-shot-title">A diagnosis, not just a score</h3>
            <ul className="lp-shot-list">
              <li><strong>Your biggest challenge, named.</strong> Pacing misses, concept gaps, execution slips — in that order, from your actual answers and timing.</li>
              <li><strong>Points to target and the easy wins</strong> you can bank first.</li>
              <li><strong>The one domain</strong> that is your biggest lever right now.</li>
              <li><strong>What to focus on next</strong> — wired straight into your study plan.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== BRAND MOMENT ===== */}
      {brandSection}

      {/* ===== PHILOSOPHY (word-by-word reveal) ===== */}
      <section className="lp-philosophy lp-reveal">
        <div className="lp-philosophy-eyebrow">Our philosophy</div>
        <h2 className="lp-philosophy-title">
          {PHILOSOPHY_WORDS.map((item, i) => (
            item.br
              ? <br key={`br${i}`} />
              : <span key={i} className={`lp-word${item.cls ? ` ${item.cls}` : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>{item.w}&nbsp;</span>
          ))}
        </h2>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="lp-how lp-reveal">
        <div className="lp-section-head">
          <span className="lp-eyebrow">How it works</span>
          <h2 className="lp-section-title">Three steps to a smarter prep.</h2>
        </div>
        <div className="lp-steps lp-stag">
          <div className="lp-steps-line" aria-hidden="true" />
          {STEPS.map((s) => (
            <div className="lp-step" key={s.n}>
              <div className={`lp-step-badge ${s.bg}`}>
                <svg width="30" height="30" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" {...svgBase}>{s.icon}</svg>
              </div>
              <div className="lp-step-num">STEP {s.n}</div>
              <h3 className="lp-step-title">{s.title}</h3>
              <p className="lp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RESULTS SHOWCASE (real, cleared student testimonials) ===== */}
      <section id="results" className="lp-results lp-reveal">
        <h2 className="lp-results-title">Thousands of students.<br />Life-changing results.</h2>
        <p className="lp-results-sub">Real score gains, for students at every level.</p>
        <div className="lp-results-stage">
          <div className="lp-peek lp-peek-prev" aria-hidden="true">
            <span className="lp-peek-pill">{prevCard.from} → {prevCard.to}</span>
            <p className="lp-peek-quote">“{prevCard.quote}”</p>
          </div>
          <div className="lp-peek lp-peek-next" aria-hidden="true">
            <span className="lp-peek-pill">{nextCard.from} → {nextCard.to}</span>
            <p className="lp-peek-quote">“{nextCard.quote}”</p>
          </div>
          <div className="lp-featcard" key={ri}>
            <span className="lp-result-pill">{cur.from} <span className="to">→</span> {cur.to}</span>
            <p className="lp-result-quote">“{cur.quote}”</p>
            <div className="lp-result-person">
              <Avatar src={cur.img} name={cur.name} />
              <div>
                <div className="lp-result-name">{cur.name}</div>
                <div className="lp-result-meta">{cur.meta}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lp-results-nav">
          <button type="button" className="lp-arrow" onClick={() => cycle(-1)} aria-label="Previous result">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" {...svgBase}><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" className="lp-arrow" onClick={() => cycle(1)} aria-label="Next result">
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4" {...svgBase}><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
        <p className="lp-results-foot">Real students used SEVA to boost their SAT scores and open doors to top colleges nationwide.</p>
      </section>

      {/* ===== PRICING (kept + restyled; gated on the billing flag) ===== */}
      <section id="pricing" className="lp-pricing lp-reveal">
        <div className="lp-section-head">
          <span className="lp-eyebrow">Simple, honest pricing</span>
          <h2 className="lp-section-title" style={{ marginTop: '14px' }}>
            {billingLive ? 'One plan. Everything included.' : 'Free during early access.'}
          </h2>
          <p className="lp-section-sub">
            {billingLive
              ? "Start with a 3-day free trial. You won't be charged until day 3, and you can cancel anytime before then. Then keep going month to month, or save with an annual plan."
              : 'SEVA is free during early access — the full product, everything included. One plan.'}
          </p>
        </div>

        <div className="lp-pricing-includes">
          <p className="lp-pricing-includes-title">Everything is included</p>
          <ul className="lp-includes-grid">
            {PRICING_INCLUDES.map((item) => (
              <li className="lp-include" key={item}>
                <span className="lp-include-check" aria-hidden="true"><CheckMark size={13} stroke="var(--lp-lime-deep)" sw={3} /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {billingLive ? (
          <>
            <div className="lp-pricing-cards">
              <div className="lp-pricing-card">
                <h3 className="lp-plan-name">Monthly</h3>
                <div className="lp-plan-amount"><span className="lp-plan-price">{`$${PRICE_MONTHLY}`}</span><span className="lp-plan-period">/month</span></div>
                <p className="lp-plan-note">Billed monthly. Cancel anytime.</p>
                <button type="button" className="lp-pricing-cta" onClick={() => openAuth(false, 'monthly')}>{`Start your ${TRIAL_DAYS}-day free trial`}</button>
              </div>
              <div className="lp-pricing-card is-featured">
                <span className="lp-pricing-badge">Best value</span>
                <h3 className="lp-plan-name">Annual</h3>
                <div className="lp-plan-amount"><span className="lp-plan-price">{`$${PRICE_ANNUAL_MONTHLY}`}</span><span className="lp-plan-period">/month</span></div>
                <p className="lp-plan-savings">{`One payment of $${PRICE_ANNUAL_TOTAL} per year — save $${ANNUAL_SAVINGS} vs monthly`}</p>
                <button type="button" className="lp-pricing-cta" onClick={() => openAuth(false, 'annual')}>{`Start your ${TRIAL_DAYS}-day free trial`}</button>
              </div>
            </div>
            <p className="lp-pricing-reassurance">Cancel anytime before day 3 and you won't be charged.</p>
          </>
        ) : (
          <div className="lp-pricing-cards is-single">
            <div className="lp-pricing-card is-featured">
              <span className="lp-pricing-badge">Early access</span>
              <h3 className="lp-plan-name">Free during early access</h3>
              <div className="lp-plan-amount"><span className="lp-plan-price">Free</span></div>
              <p className="lp-plan-note">The full product, everything included.</p>
              <button type="button" className="lp-pricing-cta" onClick={() => openAuth(false)}>Get started for free</button>
            </div>
          </div>
        )}
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="lp-final lp-reveal" data-anim="scale">
        <div className="lp-final-card">
          <div className="lp-final-blob-a lp-plx" data-speed="0.08" ref={addPlx} aria-hidden="true" />
          <div className="lp-final-blob-b lp-plx" data-speed="0.12" ref={addPlx} aria-hidden="true" />
          <div className="lp-final-eyebrow">Everything a tutor sees. Nothing a tutor costs.</div>
          <h2 className="lp-final-title">Ready to find your next 200 points?</h2>
          <p className="lp-final-sub">
            {billingLive
              ? "Take the free diagnostic. In about an hour you'll know exactly where they are — then try everything free for 3 days."
              : "Take the free diagnostic. In about an hour you'll know exactly where they are."}
          </p>
          <button type="button" className="lp-final-cta" onClick={() => openAuth(false)}>
            Start your free diagnostic<ArrowRight />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="lp-footer">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand">
            <Wordmark size="md" tone="dark" />
            <p className="lp-footer-desc">AI-powered Digital SAT prep. A tutor's heart, a machine's reach.</p>
          </div>
          <div>
            <div className="lp-footer-col-title">Product</div>
            <div className="lp-footer-links">
              <a className="lp-foot-link" href="#features" onClick={scrollTo('features')}>Features</a>
              <a className="lp-foot-link" href="#how" onClick={scrollTo('how')}>How it works</a>
              <a className="lp-foot-link" href="#why" onClick={scrollTo('why')}>Why SEVA</a>
              <a className="lp-foot-link" href="#pricing" onClick={scrollTo('pricing')}>Pricing</a>
            </div>
          </div>
          <div>
            <div className="lp-footer-col-title">Legal</div>
            <div className="lp-footer-links">
              <a className="lp-foot-link" href="/privacy">Privacy</a>
              <a className="lp-foot-link" href="/terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <div className="lp-footer-bottom-inner">
            <span>&copy; {new Date().getFullYear()} SEVA. All rights reserved.</span>
            <span>SAT is a registered trademark of the College Board, which does not endorse this product.</span>
          </div>
        </div>
      </footer>

      {/* ===== Login Modal (signup happens in the onboarding funnel) ===== */}
      {loginModal}
    </div>
  );
};

export default LandingPage;
