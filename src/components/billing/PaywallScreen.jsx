/**
 * PaywallScreen — the SEVA Premium subscribe wall (card-up-front 3-day trial).
 *
 * Mounted at view='paywall'. Two states:
 *   (a) never-subscribed  → "Start your 3-day free trial" — a card is required
 *       via hosted Stripe Checkout to START the trial; nothing is charged
 *       until day 3. This is a HARD gate (no card = no access), so the
 *       "Back to dashboard" escape is hidden.
 *   (b) lapsed/canceled   → "Your access has ended" — re-subscribe via
 *       Checkout. These accounts keep read-only score access, so the back
 *       button stays.
 *   (grace / past_due)    → "Update your payment method" → Customer Portal.
 *
 * No card form ever renders in-app — Checkout and the Portal are Stripe-owned
 * redirects.
 *
 * Escape hatches: even the hard-gated wall always offers "Sign out", and a
 * never-subscribed account can also delete itself right here (type-DELETE
 * confirm → deleteAccount Cloud Function → onLogout). Without these, a fresh
 * signup that stops at the wall was permanently trapped: the sidebar (and its
 * sign-out) is hidden on view='paywall', and Profile — the only other delete
 * path — sits behind the very gate they can't pass.
 */
import React, { useState, useEffect } from 'react';
import { startCheckout, openBillingPortal, redeemPromoCode } from '../../services/billingService';
import { deleteAccount } from '../../services/accountService';
import { takeFailedPromoCode } from '../../services/pendingPromo';
import { PRICE_MONTHLY, PRICE_ANNUAL_MONTHLY, PRICE_ANNUAL_TOTAL, ANNUAL_SAVINGS, TRIAL_DAYS } from '../../services/pricing';
import './PaywallScreen.css';

const FEATURES = [
  'All 12 full-length adaptive practice tests',
  'AI tutor on every question — explanations that actually teach',
  'Unlimited drills, review queue, and pacing practice',
  'Personalized study plan that updates with every test',
];

function CheckIcon() {
  return (
    <svg className="pw-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Which wall to render. Derived from the entitlement phase so a lapsed account
 * gets re-subscribe framing while a fresh account gets the start-trial framing.
 * @param {object|null} entitlement useEntitlement() view
 * @returns {'start'|'resubscribe'|'grace'}
 */
function paywallMode(entitlement) {
  if (!entitlement) return 'start';
  if (entitlement.phase === 'grace') return 'grace';
  // Anyone who has ever had a Stripe customer/subscription (lapsed, canceled,
  // or a still-running plan reaching this wall by accident) sees re-subscribe.
  if (entitlement.hasBillingAccount || entitlement.phase === 'expired' || entitlement.phase === 'ending') {
    return 'resubscribe';
  }
  return 'start';
}

function statusLine(entitlement) {
  if (!entitlement) return null;
  if (entitlement.phase === 'trial') {
    const d = entitlement.trialDaysLeft;
    return { cls: 'is-trial', text: `Free trial: ${d} day${d === 1 ? '' : 's'} left — you have not been charged` };
  }
  if (entitlement.phase === 'expired') {
    return { cls: 'is-expired', text: 'Your access has ended' };
  }
  if (entitlement.phase === 'grace') {
    return { cls: 'is-grace', text: 'Payment issue — update your card to keep access' };
  }
  return null;
}

function PaywallScreen({ entitlement, onBack, onLogout }) {
  const [redirecting, setRedirecting] = useState(null); // 'monthly' | 'annual' | 'portal' | null
  const [error, setError] = useState(null);

  // Returning from Stripe Checkout via the browser back-button can restore this
  // page from the bfcache with `redirecting` still set, permanently disabling
  // every CTA. Clear it when the page is shown from cache (e.persisted).
  useEffect(() => {
    const onPageShow = (e) => { if (e.persisted) setRedirecting(null); };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  const subscribe = async (plan) => {
    if (redirecting) return;
    setError(null);
    setRedirecting(plan);
    try {
      await startCheckout(plan);
      // Browser navigates away on success; nothing to reset.
    } catch (err) {
      setError(err.message || 'Could not start checkout. Please try again.');
      setRedirecting(null);
    }
  };

  const openPortal = async () => {
    if (redirecting) return;
    setError(null);
    setRedirecting('portal');
    try {
      await openBillingPortal();
    } catch (err) {
      setError(err.message || 'Could not open billing. Please try again.');
      setRedirecting(null);
    }
  };

  // Promo code — redeems into permanent free access. On success the
  // useEntitlement onSnapshot flips to comped and App.jsx routes off the
  // paywall on its own; we show a brief success line for the interim.
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoBusy, setPromoBusy] = useState(false);
  const [promoError, setPromoError] = useState(null);
  const [promoDone, setPromoDone] = useState(false);

  // A code typed during onboarding whose background redeem failed lands the
  // student here with no idea why. Surface it: open the promo form prefilled
  // with their code and say what happened (a typo'd comp code can be retried;
  // a creator DISCOUNT code only works on Stripe's payment page).
  useEffect(() => {
    const failed = takeFailedPromoCode();
    if (!failed) return;
    setPromoOpen(true);
    setPromoCode(failed);
    setPromoError(
      `We couldn't apply the code "${failed}". Check it and try again — or if it's a percent-off code from a creator, enter it on the payment page after you click below.`,
    );
  }, []);

  const redeem = async (e) => {
    e?.preventDefault?.();
    if (promoBusy || !promoCode.trim()) return;
    setPromoBusy(true);
    setPromoError(null);
    try {
      await redeemPromoCode(promoCode);
      setPromoDone(true); // entitlement listener dismisses the wall
    } catch (err) {
      setPromoError(err.message || "That promo code isn't valid.");
    } finally {
      setPromoBusy(false);
    }
  };

  // Delete-account escape (hard-gated accounts only). Mirrors Profile's flow:
  // type DELETE to confirm → server removes all data + the Auth record →
  // onLogout routes to the landing page.
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const confirmDelete = async (e) => {
    e?.preventDefault?.();
    if (deleteBusy || deleteText !== 'DELETE') return;
    setDeleteBusy(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      // Auth record is gone server-side, but the local ID token stays valid
      // for up to an hour — sign out so the app doesn't keep acting on it.
      onLogout?.();
    } catch (err) {
      setDeleteError(err?.message || 'Could not delete your account. Please try again.');
      setDeleteBusy(false);
    }
  };

  const mode = paywallMode(entitlement);
  const status = statusLine(entitlement);
  // Hard gate: a never-subscribed account (no access, no card on file) has
  // nowhere to go — hide the back escape so it can't bounce against the
  // App.jsx auto-route. Lapsed accounts keep the read-only dashboard.
  const hardGated = !entitlement?.hasAccess && !entitlement?.hasBillingAccount;
  const startCta = mode === 'start' ? 'Start free trial' : 'Subscribe';

  let title = `Start your ${TRIAL_DAYS}-day free trial`;
  let sub = `Add a card to unlock everything free for ${TRIAL_DAYS} days. You will not be charged until day ${TRIAL_DAYS} — cancel anytime before then and you pay nothing.`;
  if (mode === 'resubscribe') {
    title = 'Your access has ended';
    sub = 'Your scores and progress are saved. Subscribe to pick up exactly where you left off — every test, drill, and tutor session unlocks instantly.';
  } else if (mode === 'grace') {
    title = 'Update your payment method';
    sub = 'There was a problem charging your card. Update it to keep your Premium access — nothing else changes.';
  }

  return (
    <div className="pw-shell">
      <div className="pw-column">
        {!hardGated && onBack && (
          <button type="button" className="pw-back" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to dashboard
          </button>
        )}

        {status && <div className={`pw-status ${status.cls}`}>{status.text}</div>}

        <h1 className="pw-title">{title}</h1>
        <p className="pw-sub">{sub}</p>

        {error && <p className="pw-error" role="alert">{error}</p>}

        {mode === 'grace' ? (
          <div className="pw-grace-actions">
            <button
              type="button"
              className="pw-plan-cta is-primary"
              onClick={openPortal}
              disabled={!!redirecting}
            >
              {redirecting === 'portal' ? 'Opening billing…' : 'Update payment method'}
            </button>
          </div>
        ) : (
          <div className="pw-plans">
            <div className="pw-plan">
              <h2 className="pw-plan-name">Monthly</h2>
              <div className="pw-plan-price">
                <span className="pw-plan-amount">{`$${PRICE_MONTHLY}`}</span>
                <span className="pw-plan-cadence">/ month</span>
              </div>
              <p className="pw-plan-note">{`Free for ${TRIAL_DAYS} days, then $${PRICE_MONTHLY}/month. Cancel anytime.`}</p>
              <button
                type="button"
                className="pw-plan-cta is-secondary"
                onClick={() => subscribe('monthly')}
                disabled={!!redirecting}
              >
                {redirecting === 'monthly' ? 'Opening checkout…' : startCta}
              </button>
              <ul className="pw-features">
                {FEATURES.map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
            </div>

            <div className="pw-plan is-featured">
              <span className="pw-plan-flag">Best value</span>
              <h2 className="pw-plan-name">Annual</h2>
              <div className="pw-plan-price">
                <span className="pw-plan-amount">{`$${PRICE_ANNUAL_MONTHLY}`}</span>
                <span className="pw-plan-cadence">/ month</span>
              </div>
              <p className="pw-plan-note">{`Free for ${TRIAL_DAYS} days, then one payment of $${PRICE_ANNUAL_TOTAL} per year — save $${ANNUAL_SAVINGS} vs monthly.`}</p>
              <button
                type="button"
                className="pw-plan-cta is-primary"
                onClick={() => subscribe('annual')}
                disabled={!!redirecting}
              >
                {redirecting === 'annual' ? 'Opening checkout…' : startCta}
              </button>
              <ul className="pw-features">
                {FEATURES.map((f) => (
                  <li key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {mode !== 'grace' && (
          <div className="pw-promo">
            {promoDone ? (
              <p className="pw-promo-done" role="status">Code applied — unlocking your account…</p>
            ) : !promoOpen ? (
              <button type="button" className="pw-promo-toggle" onClick={() => setPromoOpen(true)}>
                Have a promo code?
              </button>
            ) : (
              <form className="pw-promo-form" onSubmit={redeem}>
                <input
                  type="text"
                  className="pw-promo-input"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(null); }}
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-label="Promo code"
                  disabled={promoBusy}
                />
                <button type="submit" className="pw-promo-apply" disabled={promoBusy || !promoCode.trim()}>
                  {promoBusy ? 'Applying…' : 'Apply'}
                </button>
              </form>
            )}
            {promoError && <p className="pw-promo-error" role="alert">{promoError}</p>}
          </div>
        )}

        <p className="pw-fineprint">
          Secure checkout by Stripe. {mode === 'grace'
            ? 'Manage or cancel your plan anytime from Profile.'
            : `You will not be charged until your ${TRIAL_DAYS}-day free trial ends — cancel anytime before then and you pay nothing. Manage or cancel anytime from Profile.`}{' '}
          By {mode === 'start' ? 'starting your trial' : 'subscribing'} you agree
          to the <a href="/terms" target="_blank" rel="noreferrer">Terms</a> and{' '}
          <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.
        </p>

        {onLogout && (
          <div className="pw-escape">
            <p className="pw-escape-line">
              Not ready to start?{' '}
              <button type="button" className="pw-escape-link" onClick={onLogout} disabled={deleteBusy}>
                Sign out
              </button>
              {hardGated && (
                <>
                  {' · '}
                  <button
                    type="button"
                    className="pw-escape-link is-danger"
                    onClick={() => { setDeleteOpen((v) => !v); setDeleteError(null); }}
                    disabled={deleteBusy}
                  >
                    Delete my account
                  </button>
                </>
              )}
            </p>
            {hardGated && deleteOpen && (
              <form className="pw-delete" onSubmit={confirmDelete}>
                <p className="pw-delete-warn">
                  This permanently deletes your account and all of its data — there is no
                  way to undo it. Type <strong>DELETE</strong> to confirm.
                </p>
                <div className="pw-delete-row">
                  <input
                    type="text"
                    className="pw-delete-input"
                    placeholder="DELETE"
                    value={deleteText}
                    onChange={(e) => { setDeleteText(e.target.value); setDeleteError(null); }}
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck="false"
                    aria-label="Type DELETE to confirm account deletion"
                    disabled={deleteBusy}
                  />
                  <button
                    type="submit"
                    className="pw-delete-confirm"
                    disabled={deleteBusy || deleteText !== 'DELETE'}
                  >
                    {deleteBusy ? 'Deleting…' : 'Delete account'}
                  </button>
                </div>
                {deleteError && <p className="pw-promo-error" role="alert">{deleteError}</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaywallScreen;
