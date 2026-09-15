/**
 * Shared helpers for Cloud Functions endpoints.
 *
 * Extracted from index.ts so sibling modules (stripe.ts) can use the same
 * CORS allowlist, bearer-token auth, and per-user rate limiting without a
 * circular import. IMPORTANT: nothing here may call getFirestore()/getAuth()
 * at module scope — initializeApp() runs in index.ts AFTER imports evaluate,
 * so admin access must stay inside function bodies.
 */

import {getAuth, DecodedIdToken} from "firebase-admin/auth";
import {getAppCheck} from "firebase-admin/app-check";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

// Allowed CORS origins — restrict to your production domains. EVERY origin the
// app is served from MUST be listed here, or authenticated function calls (the
// AI tutor, AI study-plan generation, billing, etc.) are CORS-blocked by the
// browser and surface to the user as a generic connection error. The live
// custom domain is sevaprep.com (apex 308-redirects to www); keep both. Add
// any new domain here AND redeploy functions when the served origin changes.
export const ALLOWED_ORIGINS = [
  "https://sevaprep.com",
  "https://www.sevaprep.com",
  "https://perform-sat.vercel.app",
  "https://performsat-production.web.app",
  "https://performsat-production.firebaseapp.com",
  "https://performsat.com",
  "https://www.performsat.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

/**
 * Auth helper — verifies the Firebase ID token from the Authorization header.
 * @param {object} request incoming request carrying headers
 * @return {Promise<DecodedIdToken|null>} decoded token, or null when invalid
 */
export async function verifyAuth(
  request: {headers: {authorization?: string}},
): Promise<DecodedIdToken | null> {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    return await getAuth().verifyIdToken(authHeader.substring(7));
  } catch {
    return null;
  }
}

// ─── LLM observability (Helicone) ──────────────────────────────────────────
// When HELICONE_API_KEY is set (functions/.env — gitignored), every Anthropic
// call routes through Helicone's pass-through gateway: same API and latency
// profile, but each request is logged with model, tokens, cost, latency, and
// (where provided) the student uid — the per-student cost/latency dashboard
// we otherwise fly blind on. Inert without the key: URL and headers collapse
// to the plain Anthropic values.
export const ANTHROPIC_MESSAGES_URL = process.env.HELICONE_API_KEY ?
  "https://anthropic.helicone.ai/v1/messages" :
  "https://api.anthropic.com/v1/messages";

/**
 * Standard Anthropic request headers, plus Helicone auth/attribution when
 * observability is enabled.
 * @param {string} apiKey Anthropic API key
 * @param {string} [userId] student uid for per-user cost attribution
 * @return {Record<string, string>} headers for the /v1/messages fetch
 */
export function anthropicHeaders(
  apiKey: string,
  userId?: string,
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  };
  const heliconeKey = process.env.HELICONE_API_KEY;
  if (heliconeKey) {
    headers["Helicone-Auth"] = `Bearer ${heliconeKey}`;
    if (userId) headers["Helicone-User-Id"] = userId;
  }
  return headers;
}

/**
 * App Check gate — verifies the X-Firebase-AppCheck attestation header.
 *
 * Staged rollout, mirroring the BILLING_ENFORCED pattern:
 * - APP_CHECK_ENFORCED unset/false (default): NEVER rejects. Unattested or
 *   invalid tokens are logged (`appcheck_unattested` / `appcheck_invalid`)
 *   so the attested-request % can be watched in Cloud Logging before any
 *   enforcement. Zero behavior change on deploy.
 * - APP_CHECK_ENFORCED=true: requests without a valid attestation are
 *   rejected by the caller (return false → 401). Flip ONLY after the client
 *   with REACT_APP_APPCHECK_SITE_KEY has been live long enough that cached
 *   old bundles are gone, and logs show attested % ~100.
 * @param {object} request incoming request carrying headers
 * @param {string} endpoint logical endpoint name (for log lines)
 * @return {Promise<boolean>} true when the request may proceed
 */
export async function verifyAppCheck(
  request: {headers: {[key: string]: unknown}},
  endpoint: string,
): Promise<boolean> {
  const enforced = process.env.APP_CHECK_ENFORCED === "true";
  const token = request.headers["x-firebase-appcheck"];
  if (typeof token !== "string" || token === "") {
    logger.info(`appcheck_unattested endpoint=${endpoint} enforced=${enforced}`);
    return !enforced;
  }
  try {
    await getAppCheck().verifyToken(token);
    return true;
  } catch (err) {
    logger.warn(`appcheck_invalid endpoint=${endpoint} enforced=${enforced}`, err);
    return !enforced;
  }
}

// Simple per-user rate limiter using Firestore
export const RATE_LIMIT_COLLECTION = "_rateLimits";

/**
 * Per-user, per-endpoint hourly rate limiter backed by Firestore.
 * @param {string} userId caller uid
 * @param {string} endpoint logical endpoint name
 * @param {number} maxPerHour allowed calls per rolling hour
 * @return {Promise<boolean>} true when the call is allowed
 */
export async function checkRateLimit(
  userId: string,
  endpoint: string,
  maxPerHour = 60,
): Promise<boolean> {
  const db = getFirestore();
  const ref = db.collection(RATE_LIMIT_COLLECTION).doc(`${userId}_${endpoint}`);
  const now = Date.now();
  const hourAgo = now - 3600000;

  try {
    // Atomic read-modify-write: a plain get()->set() lets concurrent requests
    // read the same pre-write timestamp array and each decide they're under the
    // cap, silently bypassing the limit. runTransaction serializes the window
    // update so the Nth concurrent call sees the (N-1) it races with.
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.data();
      const timestamps: number[] = (data?.timestamps || [])
        .filter((t: number) => t > hourAgo);

      if (timestamps.length >= maxPerHour) return false;

      timestamps.push(now);
      tx.set(ref, {timestamps, updatedAt: FieldValue.serverTimestamp()});
      return true;
    });
  } catch (err) {
    // Fail open (availability over enforcement) but never SILENTLY — a
    // persistently failing limiter that swallows its error is invisible abuse
    // surface, so surface it in the logs.
    logger.warn(`checkRateLimit failed for ${userId}_${endpoint} — allowing`, err);
    return true; // Allow on rate limit check failure
  }
}
