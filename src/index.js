import React from 'react';
import ReactDOM from 'react-dom/client';
import 'katex/dist/katex.min.css';
import './design-tokens.css';
import './design/global.css';
import App from './App';
import * as Sentry from '@sentry/react';
import { initPostHog } from './services/posthogClient';
import { captureReferral } from './services/refTracker';

// Creator-link attribution: persist ?ref= (from sevaprep.com/r/<slug>
// redirects) before anything else can navigate the URL away.
captureReferral();

// Dev-only diagram preview is code-split so the math bank it imports never
// rides in the entry chunk. Loaded only when the #__diag= hash is present.
const DiagramPreview = React.lazy(() => import('./components/__DiagramPreview'));

// Error reporting: Sentry. A frontend DSN is public by design (it ships in the
// client bundle), so the production DSN is committed here as a fallback — crash
// reporting then works without depending on a Vercel env var being set. Gated to
// production so local dev / test noise doesn't burn the error quota. An explicit
// REACT_APP_SENTRY_DSN still wins (e.g. point a dev/preview build at its own
// project). Do NOT add a manual unhandledrejection listener on the Sentry branch
// — Sentry's default globalHandlersIntegration already hooks it, and a second
// listener would double-report every rejection.
const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN
  || (process.env.NODE_ENV === 'production'
    ? 'https://027be0645dc9f0e762b5019c76c86444@o4511616418578432.ingest.us.sentry.io/4511616425000960'
    : '');
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    sendDefaultPii: false,
    // Session Replay, error-triggered ONLY: routine sessions are never
    // recorded (rate 0); when an error fires, Sentry uploads the buffered
    // minute leading up to it. Combined with maskAllText/blockAllMedia below,
    // a replay shows the student's clicks and navigation — never their
    // readable content. This mirrors the PostHog privacy contract
    // (no routine session recording) while making crash reports debuggable.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
  });
  // The replay integration is ~45KB gz, so it's lazy-loaded off the boot
  // path — the entry chunk stays flat. Errors thrown before it attaches
  // still report normally (just without a replay attached).
  Sentry.lazyLoadIntegration('replayIntegration')
    .then((replayIntegration) => {
      Sentry.addIntegration(replayIntegration({ maskAllText: true, blockAllMedia: true }));
    })
    .catch(() => { /* replay is best-effort; error reporting works without it */ });
} else {
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[performsat:unhandledrejection]', event.reason);
  });
}

// Product analytics: PostHog, lazy-loaded so its ~70KB gz never rides in the
// entry chunk (see services/posthogClient.js for config + privacy posture,
// incl. session replay with masked inputs). Inert until REACT_APP_POSTHOG_KEY
// is set. The app is view-state driven (URL stays /course), so per-screen
// pageviews come from phScreenView in App.jsx (synthetic $pageview per view)
// alongside analyticsService's mirrored product events.
initPostHog();

// Global KaTeX style fixes
const style = document.createElement('style');
style.textContent = `
  .katex-mathml {
    position: absolute !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    padding: 0 !important;
    border: 0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden !important;
  }
  /* Premium KaTeX typography polish (Global) */
  .katex .frac-line { border-bottom-width: 0.06em !important; }
  .katex-display { margin: 0.75em 0 !important; }
  /* Chat-specific sizing */
  .ai-coach-pane .katex {
    font-size: 1.05em;
    vertical-align: middle;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
// Dev-only diagram preview: gated on URL hash; never reaches production users
// unless they hand-craft the hash. Cheap escape hatch for visual iteration.
const isDiagramPreview = typeof window !== 'undefined' && window.location.hash.startsWith('#__diag=');
root.render(
  <React.StrictMode>
    {isDiagramPreview ? (
      <React.Suspense fallback={null}>
        <DiagramPreview />
      </React.Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
