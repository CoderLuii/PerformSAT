/**
 * posthogClient — lazy PostHog wrapper.
 *
 * posthog-js is ~70KB gz; importing it statically from index.js /
 * analyticsService / useAuth would put it in the ENTRY chunk and undo the
 * bundle-size work. This wrapper dynamic-imports it after boot (async chunk),
 * and the rest of the app talks only to these thin functions.
 *
 * Inert without REACT_APP_POSTHOG_KEY. Calls made before the chunk loads are
 * buffered (capped) and replayed on load, so boot-time events aren't dropped.
 * Every entry point swallows errors — product analytics must never break the
 * app. Privacy contract: uid-only identify, no PII in event properties
 * (enforced by callers; see analyticsService taxonomy). Session replay is ON
 * (founder decision 2026-08-16) with all inputs masked, so keystrokes
 * (answers, passwords, emails) never leave the device; on-screen email text
 * is blocked with the `ph-no-capture` class (AppShell sidebar, Profile).
 */

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || 'https://us.i.posthog.com';
const MAX_QUEUE = 20;

let client = null;      // the loaded, initialized posthog instance
let loading = false;
const queue = [];       // [{fn, args}] buffered until the chunk loads

const drain = () => {
  while (queue.length) {
    const { fn, args } = queue.shift();
    try { client[fn](...args); } catch { /* analytics must never throw */ }
  }
};

const call = (fn, ...args) => {
  if (!POSTHOG_KEY) return;
  if (client) {
    try { client[fn](...args); } catch { /* analytics must never throw */ }
  } else if (queue.length < MAX_QUEUE) {
    queue.push({ fn, args });
  }
};

/**
 * Kick off the lazy load + init. Call once from index.js at boot.
 * No-op without REACT_APP_POSTHOG_KEY, on repeat calls, and outside a browser.
 */
export const initPostHog = () => {
  if (!POSTHOG_KEY || loading || client || typeof window === 'undefined') return;
  loading = true;
  import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        defaults: '2025-05-24',
        person_profiles: 'identified_only',
        // Session replay. The client config alone doesn't record — the
        // "Record user sessions" toggle in PostHog project settings must
        // also be ON (checked into the remote config this init fetches).
        enable_recording_console_log: true,
        session_recording: {
          maskAllInputs: true, // typed answers/passwords/emails never recorded
          // Local override of the remote canvas setting: Desmos (canvas) shows
          // in replays instead of a blank box. FPS defaults to 4 via remote.
          captureCanvas: { recordCanvas: true },
        },
      });
      client = posthog;
      // The npm module doesn't self-attach. PostHog's toolbar (heatmaps,
      // "launch toolbar" from the dashboard) and console debugging both
      // expect window.posthog — expose the initialized instance.
      window.posthog = posthog;
      drain();
    })
    .catch(() => { loading = false; }); // network fail: stay inert, allow retry
};

/** Mirror a product event. No-op until initPostHog ran and the key is set. */
export const phCapture = (event, properties) => call('capture', event, properties);

/**
 * Record an in-app screen change as a synthetic $pageview. The app swaps
 * `view` state without touching the URL, so PostHog's history-based pageview
 * capture sees one long /course page; a synthetic per-screen URL gives paths,
 * funnels, and replay timelines per screen instead.
 * @param {string} screen - the App.jsx view name (e.g. 'dashboard', 'paywall')
 */
export const phScreenView = (screen) =>
  call('capture', '$pageview', { $current_url: `${window.location.origin}/app/${screen}` });

/** Tie events to the signed-in student. uid ONLY — never email/name (PII). */
export const phIdentify = (uid) => call('identify', uid);

/** Drop identity on sign-out so a shared device never chains two students. */
export const phReset = () => call('reset');
