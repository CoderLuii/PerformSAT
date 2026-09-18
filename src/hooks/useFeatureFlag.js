/**
 * useFeatureFlag — read a CRA-style feature flag with a localStorage runtime override.
 *
 * Usage:
 *   const enabled = useFeatureFlag('todaysTasks');
 *
 * Resolution order:
 *   1. `localStorage["ff:<key>"] === "1"` — runtime override (set in DevTools)
 *   2. `process.env.REACT_APP_FF_<KEY>` === `"true"` — build-time default
 *   3. test mode: `process.env.NODE_ENV === 'test'` reads localStorage with no env fallback
 *   4. otherwise the per-flag default in `FLAG_DEFAULTS` (graduated flags default ON), else `false`
 *
 * Notes:
 *   - This is a Create React App project (`react-scripts 5.0.1`). Vite-style
 *     `import.meta.env.VITE_*` does NOT work here — env vars are surfaced via
 *     `process.env.REACT_APP_*` at build time.
 *   - localStorage override lets you toggle a flag in production (or a single
 *     browser session) without a rebuild. To turn ON: `localStorage.setItem('ff:todaysTasks','1')`.
 *   - Hook returns a stable boolean per render (no useState). Callers reading on
 *     mount + on a localStorage change should subscribe via `window` storage event
 *     if cross-tab live toggling is needed (rare).
 *
 * @param {string} key  Flag identifier in camelCase. Translates to env var
 *                      `REACT_APP_FF_TODAYS_TASKS` for `'todaysTasks'`.
 * @returns {boolean}   True if the flag is enabled in this runtime.
 */
// Flags that have graduated from experiment to permanent product behavior
// default ON, so they no longer depend on a production env var being set in the
// host (Vercel). The app is now both-sections — these ARE the current UX, not
// experiments. An explicit env var ("true"/"false") or a localStorage override
// still wins over this default.
const FLAG_DEFAULTS = {
  rwDrills: true,     // R&W weaknesses route to a real drill (not "coming soon")
  todaysTasks: true,  // dashboard shows the Today's Tasks hero, not the legacy banner
  innerOnboarding: true, // post-signup inner onboarding runs before the diagnostic; kill-switch via REACT_APP_FF_INNER_ONBOARDING=false
  tutorPrewarm: true, // panel-open cache prewarm (measured: tutor TTFB 6.5s → 3.9s). Safe since the prewarm-aware aiTutor deployed 2026-07-21; kill-switch via REACT_APP_FF_TUTOR_PREWARM=false
  planV3: true, // TRUE-plan generator + mission-control timeline (built 2026-08-13, live-verified on prod bundle 2026-08-14); kill-switch via REACT_APP_FF_PLAN_V3=false
  diagnosticV2: true, // 40Q adaptive diagnostic in the real test runner (built 2026-08-13, full 40Q E2E live-verified same day); kill-switch via REACT_APP_FF_DIAGNOSTIC_V2=false
};

function camelToScreamingSnake(key) {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toUpperCase();
}

function readLocalStorage(key) {
  // Wrapped in try/catch — Safari private mode throws on localStorage access.
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(`ff:${key}`);
  } catch {
    return null;
  }
}

function readEnv(key) {
  // process.env is a webpack-time substitution in CRA: DefinePlugin inlines
  // it as an object LITERAL, so `process.env[...]` is safe in the browser.
  // Never guard with bare `typeof process` — DefinePlugin does not replace
  // the bare identifier, the browser has no `process`, and the guard made
  // this whole branch return undefined in every production build (env-set
  // flags silently never activated; found when REACT_APP_FF_ON_RAMP=true
  // had no effect on the live site, 2026-06-10).
  try {
    return process.env[`REACT_APP_FF_${camelToScreamingSnake(key)}`];
  } catch {
    return undefined;
  }
}

export function useFeatureFlag(key) {
  // 1. localStorage runtime override
  const lsValue = readLocalStorage(key);
  if (lsValue === '1' || lsValue === 'true') return true;
  if (lsValue === '0' || lsValue === 'false') return false;

  // 2. build-time env var (CRA pattern)
  const envValue = readEnv(key);
  if (envValue === 'true') return true;
  if (envValue === 'false') return false;

  // 3. default — ON for graduated flags (see FLAG_DEFAULTS), otherwise off
  return FLAG_DEFAULTS[key] === true;
}

/**
 * Test helper — set a flag for the current Jest test only.
 * Resets on the next test that calls `setFeatureFlagForTest(key, undefined)`.
 *
 * @param {string} key   Flag key in camelCase.
 * @param {boolean|undefined} value  true/false to set; undefined to clear.
 */
export function setFeatureFlagForTest(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    if (value === undefined) {
      window.localStorage.removeItem(`ff:${key}`);
    } else {
      window.localStorage.setItem(`ff:${key}`, value ? '1' : '0');
    }
  } catch {
    // Safari private mode — silently no-op.
  }
}

export default useFeatureFlag;
