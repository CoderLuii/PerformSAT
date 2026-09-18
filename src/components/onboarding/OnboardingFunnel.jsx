import React, { useState, useEffect, useMemo, useRef } from 'react';
import Wordmark from '../ui/Wordmark';
import {
  FUNNEL_QUESTIONS,
  FUNNEL_INTERSTITIALS,
  FUNNEL_STEPS,
  FUNNEL_CHAPTERS,
  FUNNEL_STORAGE_KEY,
  FUNNEL_STORAGE_VERSION,
  FUNNEL_PROOF_POINTS,
  DEFAULT_FUNNEL_GOAL,
  chapterFills,
  reassureHeading,
  buildInterludeLines,
  goalContextLine,
  normalizeFunnelGoal,
  buildFunnelProfile,
  funnelAckFor,
  reassureBody,
  rightMinutesCopy,
  neverStuckCopy,
  buildPathRecap,
  signupBodyLine,
  pathStepThreeSub,
} from './funnelConfig';
import { stashPendingPromoCode, clearPendingPromoCode } from '../../services/pendingPromo';
import { PRICE_MONTHLY, PRICE_ANNUAL_MONTHLY, PRICE_ANNUAL_TOTAL, ANNUAL_SAVINGS, TRIAL_DAYS, trialEndDateLabel } from '../../services/pricing';
import { phCapture } from '../../services/posthogClient';
import { getReferral } from '../../services/refTracker';
import './OnboardingFunnel.css';

/**
 * Pre-signup onboarding funnel — the flow behind every "Get started" CTA
 * on the landing page. One question per screen (tap to advance) organized
 * into four labeled chapters, three product-truth interstitials with
 * animated visuals, a goal slider, a navy plan-assembly interlude, a
 * personalized path summary, then the account form. Answers are staged in
 * sessionStorage until signup hands them to buildSignupUserDoc via
 * additionalInfo.funnelProfile.
 *
 * @param {Function} signup - useAuth signup(email, password, firstName, additionalInfo)
 * @param {Function} onExit - leave the funnel back to the landing page
 * @param {Function} onLogIn - open the login modal (existing accounts)
 * @param {boolean} billingLive - billing flag; keeps pricing copy honest
 * @param {('monthly'|'annual')} [presetPlan] - plan clicked on the landing
 *   pricing cards; when present the signup step confirms it instead of asking
 */
const QUESTION_BY_ID = Object.fromEntries(FUNNEL_QUESTIONS.map((q) => [q.id, q]));

const BUILD_ROW_MS = 650; // one interlude row checks in per beat
const BUILD_EXIT_MS = 900; // hold after the last row before the reveal

// sessionStorage on purpose: an accidental refresh mid-quiz resumes, but
// leaving the site discards every answer — abandoning the funnel saves
// NOTHING (founder decision 2026-08-03; was localStorage cross-visit resume).
const readSavedState = () => {
  // The pre-2026-08-03 build staged this same key in LOCALstorage (cross-visit
  // resume, since rejected). Sweep the orphan on mount so old visitors'
  // answers don't sit in persistent storage forever.
  try {
    window.localStorage.removeItem(FUNNEL_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  try {
    const raw = window.sessionStorage.getItem(FUNNEL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== FUNNEL_STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeSavedState = (state) => {
  try {
    window.sessionStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode) — the funnel still works in-memory */
  }
};

const clearSavedState = () => {
  try {
    window.sessionStorage.removeItem(FUNNEL_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

/** Check-mark that draws itself into a just-tapped option card. */
const OptionCheck = () => (
  <svg className="of-option-check" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path
      className="of-option-check-tick"
      d="M6 10.4 8.8 13 14 7.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Rising projected-score sketch — echoes the app's real projected-score chart. */
const TrajectoryVisual = () => (
  <div className="of-visual-card" aria-hidden="true">
    <div className="of-visual-label">Projected score</div>
    <svg className="of-trajectory" viewBox="0 0 320 130" role="presentation" focusable="false">
      <path
        className="of-trajectory-band"
        d="M16 104 C 70 98, 105 88, 150 72 C 200 54, 250 44, 304 30 L 304 74 C 250 84, 200 92, 150 102 C 105 110, 70 114, 16 116 Z"
      />
      <path
        className="of-trajectory-line"
        d="M16 110 C 70 106, 110 96, 152 84 C 202 70, 252 58, 304 48"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="100"
      />
      <circle className="of-trajectory-start" cx="16" cy="110" r="5" />
      <circle className="of-trajectory-end" cx="304" cy="48" r="6" />
      <text x="16" y="94" className="of-trajectory-tick">diagnostic</text>
      <text x="304" y="34" className="of-trajectory-tick" textAnchor="end">your target</text>
    </svg>
    <div className="of-visual-caption">Updated after every practice session, so you always know where you stand.</div>
  </div>
);

/** Example weak-spot diagnosis card — the shape a real check-in produces. */
const DiagnosisVisual = () => (
  <div className="of-visual-card" aria-hidden="true">
    <div className="of-visual-label">Example diagnosis</div>
    <div className="of-diag-rows">
      {[
        { name: 'Algebra', pct: 58, tone: 'orange' },
        { name: 'Craft and Structure', pct: 64, tone: 'purple' },
        { name: 'Problem-Solving and Data', pct: 71, tone: 'lime' },
      ].map((row, i) => (
        <div className="of-diag-row" key={row.name}>
          <div className="of-diag-meta">
            <span className="of-diag-name">{row.name}</span>
            <span className="of-diag-pct">{row.pct}% accuracy</span>
          </div>
          <div className="of-diag-track">
            <div
              className={`of-diag-fill of-diag-fill--${row.tone}`}
              style={{ '--of-diag-w': `${row.pct}%`, '--of-diag-delay': `${i * 140}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="of-visual-caption">Your diagnostic builds yours — down to the exact question types.</div>
  </div>
);

/** Tutor exchange sketch — the ask-anything explanation loop. */
const TutorVisual = () => (
  <div className="of-visual-card" aria-hidden="true">
    <div className="of-visual-label">SEVA tutor</div>
    <div className="of-chat">
      <div className="of-chat-bubble of-chat-bubble--student">
        I still don&rsquo;t see why B is wrong.
      </div>
      <div className="of-chat-bubble of-chat-bubble--tutor">
        B repeats the claim from the first sentence — but the blank needs the
        contrast that &ldquo;however&rdquo; sets up. Look at what follows it&hellip;
      </div>
    </div>
    <div className="of-visual-caption">Ask as many times as it takes. It never gets tired.</div>
  </div>
);

const VISUALS = {
  trajectory: TrajectoryVisual,
  diagnosis: DiagnosisVisual,
  tutor: TutorVisual,
};

const OnboardingFunnel = ({ signup, onExit, onLogIn, billingLive, presetPlan }) => {
  const saved = useMemo(readSavedState, []);
  const [stepIndex, setStepIndex] = useState(() => {
    const idx = saved?.stepIndex;
    return Number.isInteger(idx) && idx >= 0 && idx < FUNNEL_STEPS.length ? idx : 0;
  });
  const [answers, setAnswers] = useState(() => saved?.answers || {});
  const [name, setName] = useState(() => (typeof saved?.name === 'string' ? saved.name : ''));
  const [goal, setGoal] = useState(() => normalizeFunnelGoal(saved?.goal ?? DEFAULT_FUNNEL_GOAL));
  const [pendingAdvance, setPendingAdvance] = useState(null); // option value mid tap-animation
  const [buildProgress, setBuildProgress] = useState(0); // rows checked in on the build screen

  // Signup form state (last step)
  const [signupName, setSignupName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const presetIsValid = presetPlan === 'monthly' || presetPlan === 'annual';
  // Refresh-resume must not silently flip the plan back to the annual default:
  // a fresh pricing-card click (presetPlan) wins, then the plan staged before
  // the reload, then the default. Without the saved fallback, a student who
  // picked Monthly and refreshed mid-signup would be quietly charged $349.
  const savedPlanIsValid = saved?.plan === 'monthly' || saved?.plan === 'annual';
  const [plan, setPlan] = useState(
    presetIsValid ? presetPlan : (savedPlanIsValid ? saved.plan : 'annual'),
  ); // trial plan (billingLive only)
  // A plan clicked on the landing pricing cards is settled — the signup step
  // confirms it (with a Change escape) instead of asking again.
  const [planLocked, setPlanLocked] = useState(
    presetIsValid || (savedPlanIsValid && saved?.planLocked === true),
  );
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const advanceTimer = useRef(null);
  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  // Stage progress for reload-resume; cleared on successful signup.
  useEffect(() => {
    writeSavedState({ version: FUNNEL_STORAGE_VERSION, stepIndex, answers, name, goal, plan, planLocked });
  }, [stepIndex, answers, name, goal, plan, planLocked]);

  // Each step is its own "screen" — put focus/scroll back at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stepIndex]);

  // Funnel analytics ride phCapture directly: analyticsService is uid-gated
  // and pulls the firebase chain, both wrong for this pre-auth chunk. The
  // anonymous PostHog distinct_id merges into the account on phIdentify at
  // signup. copyVariant tags every event so before/after conversion is
  // comparable without A/B infra.
  const startedTracked = useRef(false);
  useEffect(() => {
    if (startedTracked.current) return;
    startedTracked.current = true;
    if (!saved) phCapture('funnel_started', { copyVariant: 'personal-v1', presetPlan: presetPlan || null });
  }, [saved, presetPlan]);
  useEffect(() => {
    phCapture('funnel_step_viewed', {
      copyVariant: 'personal-v1',
      step: FUNNEL_STEPS[stepIndex]?.id,
      index: stepIndex,
    });
  }, [stepIndex]);


  const step = FUNNEL_STEPS[stepIndex];
  const totalSteps = FUNNEL_STEPS.length;
  const progressPct = Math.round((stepIndex / (totalSteps - 1)) * 100);
  const fills = chapterFills(stepIndex);
  const trimmedName = name.trim();
  // ONE memoized array feeds BOTH the interlude render and its advance
  // timer — deriving them separately is how the row count and the beat
  // desync. Length is stable while the build screen is mounted (no input
  // exists there), so the effect below keying on it never restarts mid-run.
  const interludeLines = useMemo(
    () => buildInterludeLines(answers, goal, trimmedName),
    [answers, goal, trimmedName]
  );

  const goNext = () => setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  const goBack = () => {
    if (submitting) return;
    setError('');
    if (stepIndex === 0) {
      // Backing out on the first step is an exit — honor the same
      // "abandoning saves nothing" contract as the explicit Exit button.
      clearSavedState();
      onExit();
      return;
    }
    // Never land back on the auto-advancing interlude — return to the goal.
    setStepIndex((i) => {
      let prev = Math.max(i - 1, 0);
      if (FUNNEL_STEPS[prev]?.type === 'build') prev = Math.max(prev - 1, 0);
      return prev;
    });
  };

  // The plan-build interlude: rows check in on a beat, then auto-advance.
  // Reduced motion resolves every row immediately and shortens the hold.
  useEffect(() => {
    if (step.type !== 'build') return undefined;
    const lineCount = interludeLines.length;
    const reduce = prefersReducedMotion();
    setBuildProgress(reduce ? lineCount : 0);
    const timers = [];
    if (!reduce) {
      for (let i = 1; i <= lineCount; i++) {
        timers.push(setTimeout(() => setBuildProgress(i), i * BUILD_ROW_MS));
      }
    }
    const total = reduce ? BUILD_EXIT_MS : lineCount * BUILD_ROW_MS + BUILD_EXIT_MS;
    timers.push(setTimeout(() => {
      setStepIndex((i) => (FUNNEL_STEPS[i]?.type === 'build' ? i + 1 : i));
    }, total));
    return () => timers.forEach(clearTimeout);
  }, [step.type, interludeLines.length]);

  const handleOption = (questionId, value) => {
    if (pendingAdvance) return; // ignore double-taps mid-transition
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setPendingAdvance(value);
    advanceTimer.current = setTimeout(() => {
      setPendingAdvance(null);
      goNext();
    }, prefersReducedMotion() ? 60 : 300);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreedToTerms) {
      setError('Please confirm you are 13 or older and agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setSubmitting(true);
    // Stash a promo code (if any) BEFORE signup so it's already in place when
    // the new account's entitlement doc is seeded — useEntitlement redeems it
    // to grant permanent free ("comped") access, bypassing Stripe entirely.
    const trimmedPromo = promoCode.trim();
    if (trimmedPromo) stashPendingPromoCode(trimmedPromo);
    // Submit-intent event fires BEFORE the await: with billing live the
    // browser navigates to Stripe Checkout the moment signup resolves, and
    // a post-success capture would race posthog-js's batch flush and lose.
    phCapture('funnel_signup_submitted', {
      copyVariant: 'personal-v1',
      plan: billingLive ? plan : null,
      promo: !!trimmedPromo,
    });
    try {
      const funnelProfile = buildFunnelProfile(answers, goal);
      await signup(email, password, signupName, {
        agreedToTerms: true,
        hasTakenSAT: funnelProfile.hasTakenSAT,
        satScore: null,
        funnelProfile,
      });
      clearSavedState();
      // Pay-first contract (billing live, no promo code): go straight from
      // account creation into Stripe Checkout — the account is unusable until
      // the trial starts, so the student never lands in the app un-paid. The
      // auth flip may briefly paint the app shell before the redirect lands;
      // if the checkout call fails, the hard gate walls the account and the
      // paywall screen offers this same checkout again.
      // A promo signup (influencer codes) skips Stripe entirely: the stashed
      // code redeems during entitlement seeding and grants comped access.
      if (billingLive && !trimmedPromo) {
        // Dynamic import: billingService pulls the firebase config chain,
        // which must stay out of this pre-auth chunk's module graph.
        import('../../services/billingService')
          .then(({ startCheckout }) => startCheckout(plan))
          .catch(() => { /* wall is the fallback */ });
        return; // browser is navigating to Stripe; keep `submitting` on
      }
      // No navigation here — App.jsx's auth listener flips `user` and the
      // "/" route redirects to /course (same contract as the modal form).
    } catch (err) {
      // Don't strand a code against an account that never got created.
      if (trimmedPromo) clearPendingPromoCode();
      setError(err.message);
      setSubmitting(false);
    }
  };

  const renderEyebrow = (chapterIdx) => {
    const chapter = FUNNEL_CHAPTERS[chapterIdx];
    if (!chapter) return null;
    return (
      <div className={`of-eyebrow of-eyebrow--${chapter.tone}`}>
        {`0${chapterIdx + 1}`}
        <span className="of-eyebrow-sep" aria-hidden="true" />
        {chapter.label}
      </div>
    );
  };

  const renderName = () => (
    <div className="of-step" key="name">
      <div className="of-eyebrow of-eyebrow--orange">Before we start</div>
      <h1 className="of-title">What should we call you?</h1>
      <p className="of-body">
        Your plan is going to be personal, so it should know your name.
        Ten questions, about a minute.
      </p>
      <form
        className="of-form of-form--name"
        onSubmit={(e) => {
          e.preventDefault();
          goNext();
        }}
      >
        <input
          className="of-name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          aria-label="Your first name"
          autoComplete="given-name"
          maxLength={40}
        />
        <button type="submit" className="of-cta">
          {trimmedName ? `Let's go, ${trimmedName}` : 'Continue'}
        </button>
      </form>
      <button type="button" className="of-switch" onClick={onLogIn}>
        Already have an account? Log in
      </button>
    </div>
  );

  const renderQuestion = (question) => {
    const ack = funnelAckFor(stepIndex, answers);
    return (
    <div className="of-step" key={question.id}>
      {renderEyebrow(question.chapter)}
      {ack && <p className="of-ack">{ack}</p>}
      <h1 className="of-title">{question.title}</h1>
      <div className="of-options" role="group" aria-label={question.title}>
        {question.options.map((opt) => {
          const selected = answers[question.id] === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`of-option${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => handleOption(question.id, opt.value)}
            >
              <span>{opt.label}</span>
              {selected ? <OptionCheck /> : null}
            </button>
          );
        })}
      </div>
    </div>
    );
  };

  const renderInterstitial = (interstitial) => {
    const Visual = VISUALS[interstitial.visual];
    // Each interstitial adapts to the answers already given: the heading and
    // body quote the student's own reality back (fresh starters lose the
    // plateau framing, session length shapes rightMinutes, neverStuck
    // advances from the stuck habit to the mechanism without re-naming it).
    let heading = interstitial.heading;
    let body = interstitial.body;
    if (interstitial.id === 'reassure') {
      heading = reassureHeading(answers.feeling, trimmedName);
      body = reassureBody(answers);
    } else if (interstitial.id === 'rightMinutes') {
      ({ heading, body } = rightMinutesCopy(answers));
    } else if (interstitial.id === 'neverStuck') {
      ({ heading, body } = neverStuckCopy(answers));
    }
    return (
      <div className="of-step" key={interstitial.id}>
        <h1 className="of-title">{heading}</h1>
        <p className="of-body">{body}</p>
        {Visual ? <Visual /> : null}
        <button type="button" className="of-cta" onClick={goNext}>
          {interstitial.cta}
        </button>
      </div>
    );
  };

  const renderGoal = () => {
    const ack = funnelAckFor(stepIndex, answers);
    return (
    <div className="of-step" key="goal">
      {renderEyebrow(3)}
      {ack && <p className="of-ack">{ack}</p>}
      <h1 className="of-title">Set your target score.</h1>
      <p className="of-body">You can change this anytime. Your plan bends around it.</p>
      <div className="of-goal-readout" aria-live="polite">{goal}</div>
      <div className="of-goal-slider">
        <input
          type="range"
          min="400"
          max="1600"
          step="10"
          value={goal}
          aria-label="Target SAT score"
          onChange={(e) => setGoal(normalizeFunnelGoal(e.target.value))}
          style={{ '--of-slider-pct': `${((goal - 400) / 1200) * 100}%` }}
        />
        <div className="of-goal-ticks" aria-hidden="true">
          <span>400</span>
          <span>1000</span>
          <span>1600</span>
        </div>
      </div>
      <div className="of-goal-context">{goalContextLine(goal, answers.motivation)}</div>
      <button type="button" className="of-cta" onClick={goNext}>
        Build my plan
      </button>
    </div>
    );
  };

  const renderBuild = () => {
    const lines = interludeLines;
    return (
      <div className="of-step of-step--build" key="build">
        <div className="of-build-arc" aria-hidden="true">
          <svg viewBox="0 0 72 72" focusable="false">
            <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(246,244,239,0.14)" strokeWidth="4" />
            <circle
              className="of-build-arc-sweep"
              cx="36" cy="36" r="30"
              fill="none"
              stroke="url(#of-build-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="100"
            />
            <defs>
              <linearGradient id="of-build-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#EA580C" />
                <stop offset="0.55" stopColor="#7C5CC7" />
                <stop offset="1" stopColor="#C6EE4E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="of-title of-title--build" aria-live="polite">Assembling your plan</h1>
        <ul className="of-build-lines">
          {lines.map((line, i) => (
            <li
              key={line}
              className={`of-build-line${i < buildProgress ? ' is-done' : ''}`}
            >
              <span className="of-build-check" aria-hidden="true">
                <svg viewBox="0 0 16 16" focusable="false">
                  <path d="M3.5 8.5 6.5 11.5 12.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPath = () => {
    const recapRows = buildPathRecap(answers);
    return (
    <div className="of-step" key="path">
      <div className="of-goal-chip" aria-label={`Target score ${goal}`}>
        <span className="of-goal-chip-label">Target</span>
        <span className="of-goal-chip-score">{goal}</span>
      </div>
      <h1 className="of-title">
        {trimmedName
          ? `${trimmedName}, this is exactly what SEVA was built for.`
          : 'This is exactly what SEVA was built for.'}
      </h1>
      {recapRows.length > 0 ? (
        <div className="of-recap" aria-label="Built from your answers">
          <div className="of-recap-label">Built from your answers</div>
          <dl className="of-recap-list">
            {recapRows.map((row) => (
              <div className="of-recap-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <p className="of-body">Here&rsquo;s the path to {goal}:</p>
      )}
      <ol className="of-path">
        <li className="of-path-step">
          <span className="of-path-num of-path-num--orange">01</span>
          <div>
            <div className="of-path-head">
              {billingLive ? 'Create your account and start your free trial' : 'Create your free account'}
            </div>
            <div className="of-path-sub">
              {billingLive
                ? `Everything you just told us is saved into your plan. $0 today; ${TRIAL_DAYS} days free.`
                : 'Everything you just told us is saved into your plan.'}
            </div>
          </div>
        </li>
        <li className="of-path-step">
          <span className="of-path-num of-path-num--purple">02</span>
          <div>
            <div className="of-path-head">Take your diagnostic</div>
            <div className="of-path-sub">40 adaptive questions — about half a real SAT — find your real starting point.</div>
          </div>
        </li>
        <li className="of-path-step">
          <span className="of-path-num of-path-num--lime">03</span>
          <div>
            <div className="of-path-head">Watch the plan work</div>
            <div className="of-path-sub">{pathStepThreeSub(answers)}</div>
          </div>
        </li>
      </ol>
      <div className="of-proof" aria-label="What SEVA is built on">
        {FUNNEL_PROOF_POINTS.map((point, i) => (
          <React.Fragment key={point}>
            {i > 0 && <span className="of-proof-dot" aria-hidden="true" />}
            <span className="of-proof-item">{point}</span>
          </React.Fragment>
        ))}
      </div>
      <button type="button" className="of-cta" onClick={goNext}>
        {billingLive ? 'Start my free trial' : 'Create my free account'}
      </button>
      <p className="of-fineprint">
        {billingLive
          ? `Free for ${TRIAL_DAYS} days, then $${PRICE_MONTHLY}/month or $${PRICE_ANNUAL_TOTAL}/year. Cancel anytime before day ${TRIAL_DAYS} and you won't be charged.`
          : 'Free during early access: the full product, everything included.'}
      </p>
    </div>
    );
  };

  const renderSignup = () => (
    <div className="of-step" key="signup">
      <h1 className="of-title">
        {billingLive
          ? (trimmedName ? `Last step, ${trimmedName}. Start your free trial.` : 'Last step. Start your free trial.')
          : (trimmedName ? `Last step, ${trimmedName}. Save your plan.` : 'Last step. Save your plan.')}
      </h1>
      <p className="of-body">
        {signupBodyLine(answers)
          || 'Everything you just set up rides along. Your diagnostic is waiting on the other side.'}
      </p>
      <form className="of-form" onSubmit={handleSignup}>
        {billingLive && getReferral() && (
          <div className="of-ref-note" role="status">
            Creator discount: 20% off your first 3 months — applied automatically at checkout.
          </div>
        )}
        {billingLive && planLocked && (
          <div className="of-plan-chosen">
            <span className="of-plan-chosen-label">
              {plan === 'annual'
                ? `Annual plan: $${PRICE_ANNUAL_MONTHLY}/month, one $${PRICE_ANNUAL_TOTAL} payment per year`
                : `Monthly plan: $${PRICE_MONTHLY}/month`}
            </span>
            <button type="button" className="of-plan-change" onClick={() => setPlanLocked(false)}>
              Change
            </button>
          </div>
        )}
        {billingLive && !planLocked && (
          <div className="of-plan-grid" role="radiogroup" aria-label="Choose your plan">
            <button
              type="button"
              role="radio"
              aria-checked={plan === 'monthly'}
              className={`of-plan-card${plan === 'monthly' ? ' is-selected' : ''}`}
              onClick={() => setPlan('monthly')}
            >
              <span className="of-plan-name">Monthly</span>
              <span className="of-plan-price">{`$${PRICE_MONTHLY}`}<span className="of-plan-per">/month</span></span>
              <span className="of-plan-sub">{`Free for ${TRIAL_DAYS} days, then monthly. Cancel anytime.`}</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={plan === 'annual'}
              className={`of-plan-card${plan === 'annual' ? ' is-selected' : ''}`}
              onClick={() => setPlan('annual')}
            >
              <span className="of-plan-name">Annual</span>
              <span className="of-plan-price">{`$${PRICE_ANNUAL_MONTHLY}`}<span className="of-plan-per">/month</span></span>
              <span className="of-plan-sub">{`One payment of $${PRICE_ANNUAL_TOTAL} per year. Save $${ANNUAL_SAVINGS} vs monthly.`}</span>
            </button>
          </div>
        )}
        <label className="of-field">
          <span className="of-field-label">First name</span>
          <input
            type="text"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            placeholder="Your first name"
            autoComplete="given-name"
            required
          />
        </label>
        <label className="of-field">
          <span className="of-field-label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <label className="of-field">
          <span className="of-field-label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>
        {billingLive && (
          <label className="of-field of-field--promo">
            <span className="of-field-label">
              Promo code <span className="of-field-optional">(optional)</span>
            </span>
            <input
              type="text"
              className="of-promo-input"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter a code"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              aria-label="Promo code"
            />
            <span className="of-field-hint">
              Have a code? You&rsquo;ll get full access free, no card required.
            </span>
          </label>
        )}
        <label className="of-consent">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
          <span>
            I am 13 or older and agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </span>
        </label>
        {error && <div className="of-error" role="alert">{error}</div>}
        <button type="submit" className="of-cta" disabled={submitting}>
          {submitting
            ? (billingLive && !promoCode.trim() ? 'Setting up secure checkout…' : 'Creating your account…')
            : (billingLive
              ? (promoCode.trim() ? 'Redeem my code' : `Start my ${TRIAL_DAYS}-day free trial`)
              : 'Create my free account')}
        </button>
        {billingLive && !promoCode.trim() && (
          <p className="of-fineprint">
            {/* The date is computed at render and the trial starts at
                checkout completion (always later), so "not charged before
                {date}" stays literally true even for a stale tab. */}
            {plan === 'annual'
              ? `$0 today. Free for ${TRIAL_DAYS} days, then one $${PRICE_ANNUAL_TOTAL} payment per year ($${PRICE_ANNUAL_MONTHLY}/month). `
              : `$0 today. Free for ${TRIAL_DAYS} days, then $${PRICE_MONTHLY}/month. `}
            {`Start today and your card is not charged before ${trialEndDateLabel()}. Cancel from your profile before then and you pay nothing.`}
          </p>
        )}
      </form>
      <button type="button" className="of-switch" onClick={onLogIn}>
        Already have an account? Log in
      </button>
    </div>
  );

  // Pre-fill the signup name from the welcome step once the student
  // reaches the form (still editable there).
  useEffect(() => {
    if (step.type === 'signup') {
      setSignupName((current) => current || trimmedName);
    }
  }, [step.type, trimmedName]);

  let content;
  if (step.type === 'name') content = renderName();
  else if (step.type === 'question') content = renderQuestion(QUESTION_BY_ID[step.id]);
  else if (step.type === 'interstitial') content = renderInterstitial(FUNNEL_INTERSTITIALS[step.id]);
  else if (step.type === 'goal') content = renderGoal();
  else if (step.type === 'build') content = renderBuild();
  else if (step.type === 'path') content = renderPath();
  else content = renderSignup();

  const onBuildScreen = step.type === 'build';

  return (
    <div className={`onboarding-funnel${onBuildScreen ? ' is-navy' : ''}`}>
      <header className="of-topbar">
        {!onBuildScreen && (
          <button type="button" className="of-back" onClick={goBack} aria-label={stepIndex === 0 ? 'Back to home' : 'Back'}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
              <path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
        )}
        <div
          className="of-progress"
          role="progressbar"
          aria-label="Onboarding progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPct}
        >
          {fills.map((fill, i) => {
            // The chapter you're inside always shows a visible sliver — four
            // empty gray bars read as loading skeletons, not progress.
            const isActive = fill < 1 && fills.slice(0, i).every((f) => f >= 1);
            const shown = isActive ? Math.max(fill, 0.12) : fill;
            return (
              <div className="of-progress-seg" key={FUNNEL_CHAPTERS[i].id}>
                <div
                  className={`of-progress-fill of-progress-fill--${FUNNEL_CHAPTERS[i].tone}`}
                  style={{ width: `${shown * 100}%` }}
                />
              </div>
            );
          })}
        </div>
        {!onBuildScreen && (
          <button
            type="button"
            className="of-exit"
            onClick={() => { clearSavedState(); onExit(); }}
          >
            Exit
          </button>
        )}
        <div className="of-topbar-brand" aria-hidden="true">
          <Wordmark size="sm" />
        </div>
      </header>
      <main className="of-content">{content}</main>
    </div>
  );
};

export default OnboardingFunnel;
