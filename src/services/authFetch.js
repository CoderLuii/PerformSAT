/**
 * Authenticated fetch helper — attaches Firebase ID token to requests.
 * Use this for all Cloud Function calls that require authentication.
 */
import { auth, appCheckHeaders } from '../firebase/config';

// Under the local emulator suite (`npm run dev:emulator` = auth + firestore,
// no functions emulator) the emulator's ID tokens are rejected by the DEPLOYED
// Cloud Functions with a 401 — one per tutor panel open (prewarm), plan
// generation, billing check… all noise, all wasted round-trips. In emulator
// mode, deployed (non-local) URLs are not called at all: the caller gets a
// synthetic 503 it can handle like any other failure, and the console gets one
// info line per host explaining why. Point the relevant *_URL env var at a
// local functions emulator to make that host reachable again.
const USE_EMULATOR = process.env.REACT_APP_USE_FIREBASE_EMULATOR === '1'
  || process.env.REACT_APP_USE_FIREBASE_EMULATOR === 'true';
const LOCAL_URL_RE = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:|\/|$)/i;
const notedHosts = new Set();

/**
 * Whether a Cloud Function URL will actually be called from this build.
 * False only in emulator mode for deployed (non-local) hosts.
 * @param {string} url
 * @returns {boolean}
 */
export function functionsReachable(url) {
  return !(USE_EMULATOR && !LOCAL_URL_RE.test(String(url)));
}

function unavailableUnderEmulator(url) {
  let host = String(url);
  try { host = new URL(url).host; } catch { /* keep the raw string */ }
  if (!notedHosts.has(host)) {
    notedHosts.add(host);
    // eslint-disable-next-line no-console
    console.info(`[performsat:authFetch] emulator mode — not calling ${host} (deployed Cloud Functions reject emulator tokens with 401). Point its *_URL env var at a local functions emulator to enable it.`);
  }
  return new Response(
    JSON.stringify({ error: 'unavailable-under-emulator', message: `Cloud Function ${host} is not reachable from the local emulator suite.` }),
    { status: 503, headers: { 'Content-Type': 'application/json' } },
  );
}

export async function authFetch(url, options = {}) {
  if (!functionsReachable(url)) return unavailableUnderEmulator(url);

  const user = auth.currentUser;
  if (!user) {
    throw new Error('Not authenticated');
  }

  const token = await user.getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    // App Check attestation ({} until the site key is configured) — proves the
    // request comes from the real app, not a script hitting our AI endpoints.
    ...(await appCheckHeaders()),
    ...(options.headers || {}),
  };

  // Client-side timeout: without one a stalled connection hangs the caller's
  // spinner / send-lock until the OS gives up (can be minutes). 120s is long
  // enough for the slowest Cloud Function (AI tutor / plan generation) yet
  // fails visibly instead of hanging. Merge with a caller-supplied signal
  // (e.g. the AI tutor's AbortController) via AbortSignal.any when available,
  // so either the caller's abort OR the timeout cancels the request.
  const timeoutSignal = (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function')
    ? AbortSignal.timeout(120000)
    : undefined;
  let signal;
  if (options.signal && timeoutSignal && typeof AbortSignal.any === 'function') {
    signal = AbortSignal.any([options.signal, timeoutSignal]);
  } else {
    signal = options.signal || timeoutSignal;
  }

  return fetch(url, { ...options, headers, ...(signal ? { signal } : {}) });
}
