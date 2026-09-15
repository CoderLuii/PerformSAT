/**
 * Firebase Cloud Functions for PerformSAT
 * Includes secure AI Tutor endpoint and Study Plan generator
 */

import {setGlobalOptions} from "firebase-functions/v2/options";
import {defineSecret} from "firebase-functions/params";
import {onRequest} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {
  getFirestore,
  FieldValue,
  FieldPath,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import {getMessaging, Messaging} from "firebase-admin/messaging";
import {
  classifyNudge,
  buildNudgeContent,
  countDueReviews,
  daysUntilTest,
  toMillis,
} from "./reengagementPolicy";
// Shared endpoint helpers (CORS allowlist, bearer auth, rate limiting) —
// extracted to shared.ts so billing endpoints (stripe.ts) reuse them without
// a circular import. Same objects, same behavior.
import {ALLOWED_ORIGINS, verifyAuth, verifyAppCheck, checkRateLimit, RATE_LIMIT_COLLECTION, ANTHROPIC_MESSAGES_URL, anthropicHeaders} from "./shared";
// SEVA Premium billing (spec 2026-07-01): entitlement bootstrap, hosted
// Checkout, Customer Portal, webhook sink, and the aiTutor access gate.
import {
  ensureEntitlement,
  redeemPromoCode,
  createCheckoutSession,
  createPortalSession,
  stripeWebhook,
  hasEntitlementAccess,
  cancelSubscriptionsForUid,
  stripeSecretKey,
} from "./stripe";
// AI-tutor systemBlocks v2 (cacheable multi-block system) + the deterministic
// math-verification pass. Pure validation/mapping/parsing lives in these
// modules (node --test covered); index.ts only does the plumbing.
import {
  validateSystemBlocks,
  toAnthropicSystem,
  withOperatingConstraint,
  AnthropicSystemBlock,
  TUTOR_CACHE_TTL,
} from "./tutorSystemBlocks";
import {parseMathCheckResult, MathCheckResult} from "./tutorMathCheckPolicy";

initializeApp();
const db = getFirestore();

const anthropicApiKey = defineSecret("ANTHROPIC_API_KEY");

setGlobalOptions({maxInstances: 10});

export {ensureEntitlement, redeemPromoCode, createCheckoutSession, createPortalSession, stripeWebhook};

// Reject oversized request bodies before they reach an LLM call. A serialized
// payload above this cap is almost always abuse or a client bug, and it blows
// up both token cost and function memory. 150KB comfortably fits a legitimate
// tutor history, study-plan diagnostic, or diagnostic-narrative evidence blob.
const MAX_REQUEST_BYTES = 150 * 1024;
// tutorMathCheck carries only one reply + one question + choices, never a full
// tutor history, so it enforces its own much tighter cap.
const MATH_CHECK_MAX_BYTES = 50 * 1024;

/**
 * True when the combined UTF-8 byte size of the given payload parts exceeds
 * capBytes. Strings are measured as-is; anything else is JSON serialized first.
 * Short-circuits as soon as the cap is passed.
 * @param {number} capBytes the byte ceiling to enforce
 * @param {...unknown} parts payload pieces (messages, system, request.body, …)
 * @return {boolean} true when the payload is too large and must be rejected
 */
function exceedsByteCap(capBytes: number, ...parts: unknown[]): boolean {
  let bytes = 0;
  for (const part of parts) {
    if (part == null) continue;
    bytes += Buffer.byteLength(
      typeof part === "string" ? part : JSON.stringify(part),
      "utf8",
    );
    if (bytes > capBytes) return true;
  }
  return false;
}

/**
 * True when the combined UTF-8 byte size of the given payload parts exceeds
 * MAX_REQUEST_BYTES. Thin wrapper over exceedsByteCap for the standard cap.
 * @param {...unknown} parts payload pieces (messages, system, request.body, …)
 * @return {boolean} true when the request is too large and must be rejected
 */
function exceedsRequestBodyCap(...parts: unknown[]): boolean {
  return exceedsByteCap(MAX_REQUEST_BYTES, ...parts);
}

interface TranscriptSegment {
  start: number;
  duration: number;
  text: string;
}

interface TranscriptResult {
  videoId: string;
  segments: TranscriptSegment[];
  fullText: string;
  fetchedAt: number;
}

async function fetchFromYouTube(videoId: string): Promise<TranscriptResult | null> {
  try {
    const innertubeResponse = await fetch(
      "https://www.youtube.com/youtubei/v1/player",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify({
          videoId,
          context: {
            client: {
              clientName: "WEB",
              clientVersion: "2.20240101.00.00",
              hl: "en",
              gl: "US",
            },
          },
        }),
      }
    );

    if (!innertubeResponse.ok) return null;

    const data = await innertubeResponse.json() as Record<string, unknown>;
    const captions = data?.captions as Record<string, unknown> | undefined;
    const renderer = captions?.playerCaptionsTracklistRenderer as Record<string, unknown> | undefined;
    const captionTracks = renderer?.captionTracks as Array<{languageCode: string; baseUrl: string}> | undefined;

    if (!captionTracks || captionTracks.length === 0) return null;

    const englishTrack = captionTracks.find((t) => t.languageCode === "en") || captionTracks[0];
    let captionUrl = englishTrack.baseUrl;
    if (!captionUrl.includes("fmt=json3")) captionUrl += "&fmt=json3";

    const captionResponse = await fetch(captionUrl);
    if (!captionResponse.ok) return null;

    const captionData = await captionResponse.json() as {
      events?: Array<{tStartMs?: number; dDurationMs?: number; segs?: Array<{utf8?: string}>}>;
    };
    const segments: TranscriptSegment[] = [];

    if (captionData.events) {
      for (const event of captionData.events) {
        if (event.segs) {
          const text = event.segs.map((s) => s.utf8 || "").join("");
          if (text.trim()) {
            segments.push({
              start: (event.tStartMs || 0) / 1000,
              duration: (event.dDurationMs || 3000) / 1000,
              text: text.trim(),
            });
          }
        }
      }
    }

    if (segments.length === 0) return null;

    return {
      videoId,
      segments,
      fullText: segments.map((s) => s.text).join(" "),
      fetchedAt: Date.now(),
    };
  } catch (error) {
    logger.warn(`YouTube fetch failed for ${videoId}:`, (error as Error).message);
    return null;
  }
}

/**
 * Fetch YouTube transcript for a video.
 * Checks Firestore cache first, then falls back to YouTube API.
 */
export const getTranscript = onRequest(
  {cors: ALLOWED_ORIGINS},
  async (request, response) => {
    // Was an UNAUTHENTICATED public endpoint that fetched YouTube and wrote to
    // Firestore — anyone could drive arbitrary reads/writes. Gate it like every
    // other endpoint: bearer auth + per-user rate limit + strict input shape.
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }

    if (!(await verifyAppCheck(request, "getTranscript"))) {
      response.status(401).json({error: "App attestation failed"});
      return;
    }

    if (!(await checkRateLimit(user.uid, "getTranscript", 30))) {
      response.status(429).json({error: "Too many requests. Please try again later."});
      return;
    }

    const videoId = (request.query.videoId as string) || request.body?.videoId;

    // A YouTube video id is exactly 11 URL-safe base64 chars. Validate BEFORE
    // any fetch or Firestore write so a malformed/hostile id can never reach
    // the network or the transcripts collection doc path.
    if (typeof videoId !== "string" || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      response.status(400).json({error: "A valid videoId is required"});
      return;
    }

    try {
      logger.info(`Fetching transcript for video: ${videoId}`);

      const docRef = db.collection("transcripts").doc(videoId);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const transcript = docSnap.data();
        logger.info(`Found cached transcript for ${videoId}`);
        response.json(transcript);
        return;
      }

      logger.info(`No cached transcript for ${videoId}, trying YouTube API...`);
      const transcript = await fetchFromYouTube(videoId);

      if (transcript && transcript.segments && transcript.segments.length > 0) {
        await docRef.set(transcript);
        logger.info(`Cached new transcript for ${videoId}`);
        response.json(transcript);
        return;
      }

      response.status(404).json({
        error: "Transcript not available for this video",
        videoId,
        hint: "Run the fetchTranscripts.js script locally to populate transcripts",
      });
    } catch (error) {
      // Log the real error server-side only; never leak internal error detail
      // (stack, upstream URLs, library messages) back to the client.
      logger.error(`Transcript fetch error for ${videoId}:`, (error as Error).message);
      response.status(500).json({error: "Failed to fetch transcript"});
    }
  }
);

/**
 * AI Tutor endpoint — proxies requests to Anthropic Claude API
 *
 * v2.0: Extended thinking enabled.
 * The model reasons through each math problem internally before responding —
 * like a tutor working the problem on scratch paper before explaining it.
 */
export const aiTutor = onRequest(
  {
    cors: ALLOWED_ORIGINS,
    secrets: [anthropicApiKey],
    timeoutSeconds: 120,
    memory: "512MiB",
    // The hottest endpoint (every tutor message, long-lived streams). The
    // global maxInstances: 10 is a cost backstop for the fleet; this endpoint
    // gets its own higher ceiling so a burst of concurrent tutoring sessions
    // queues at Anthropic's rate limit, not at our instance cap.
    maxInstances: 30,
    // One always-warm instance: a gen2 cold start adds 2-5s before the first
    // token of the FIRST tutor message after any idle period — the single
    // biggest chunk of "the tutor is slow" for light traffic. Costs roughly
    // $5-10/month idle for 512MiB; revisit if traffic makes it redundant.
    minInstances: 1,
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }

    // Auth check
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }

    if (!(await verifyAppCheck(request, "aiTutor"))) {
      response.status(401).json({error: "App attestation failed"});
      return;
    }

    // Rate limit (200/hr — 60 was too low for an active tutoring session) and
    // the SEVA Premium gate (the tutor is the one endpoint with real marginal
    // cost; accounts with NO entitlement doc are allowed — see
    // hasEntitlementAccess). Both key on uid only, so they run in PARALLEL:
    // each is its own Firestore round-trip (the limiter is a transaction),
    // and serially they added ~100-200ms before every tutor reply.
    const [rateOk, entitled] = await Promise.all([
      checkRateLimit(user.uid, "aiTutor", 200),
      hasEntitlementAccess(user.uid),
    ]);
    if (!rateOk) {
      response.status(429).json({error: "Too many requests. Please wait a minute and try again."});
      return;
    }
    if (!entitled) {
      response.status(402).json({error: "subscription_required"});
      return;
    }

    try {
      const {messages, system, systemBlocks} = request.body;

      if (!messages || !Array.isArray(messages) || messages.length > 100) {
        response.status(400).json({error: "Messages array is required (max 100)"});
        return;
      }

      // Cap on serialized SIZE, not just count: 100 short turns is fine, but 100
      // turns each carrying a giant pasted blob would blow up token cost/memory.
      // systemBlocks is measured too so a giant blocks array can't bypass the cap.
      if (exceedsRequestBodyCap(messages, system, systemBlocks)) {
        response.status(400).json({error: "Request too large", code: "payload_too_large"});
        return;
      }

      // Messages are forwarded with role/content ONLY, and content blocks are
      // stripped of cache_control — the systemBlocks sanitizer already
      // guaranteed nothing could be smuggled into `system`, but raw message
      // pass-through let a modified client attach its own cache breakpoints
      // (arbitrary-TTL cache writes at 2x, or >4 breakpoints → upstream 400
      // surfaced as a confusing 502).
      const sanitizedMessages = (messages as Array<Record<string, unknown>>).map((m) => {
        if (!m || typeof m !== "object") return m;
        const content = (m as Record<string, unknown>).content;
        if (!Array.isArray(content)) return {role: m.role, content};
        return {
          role: m.role,
          content: content.map((b) => {
            if (!b || typeof b !== "object") return b;
            const {cache_control: _cc, ...rest} = b as Record<string, unknown>;
            return rest;
          }),
        };
      });

      // systemBlocks v2: when present, a small array of cacheable {text, cache}
      // blocks takes precedence over the legacy `system` string. We construct
      // the Anthropic system array ourselves (only .text/.cache survive) so no
      // client key can be smuggled upstream. Invalid systemBlocks is a hard 400
      // — the client sends it deliberately, so there is NO silent fallback. When
      // absent, the legacy string path below is byte-identical to before.
      let anthropicSystem: string | AnthropicSystemBlock[];
      if (systemBlocks != null) {
        const validated = validateSystemBlocks(systemBlocks);
        if (!validated) {
          response.status(400).json({error: "Invalid systemBlocks"});
          return;
        }
        anthropicSystem = toAnthropicSystem(validated);
      } else {
        anthropicSystem = system ?
          [{
            type: "text",
            text: typeof system === "string" ? system : String(system),
            cache_control: {type: "ephemeral", ttl: TUTOR_CACHE_TTL},
          }] :
          "";
      }
      // Append the server-owned operating constraint LAST. The persona is
      // client-authored, so without this a caller could send an arbitrary
      // system prompt and use aiTutor as a general LLM proxy on our key; the
      // constraint keeps the endpoint on-task regardless of client input.
      const constrainedSystem = withOperatingConstraint(anthropicSystem);

      const apiKey = anthropicApiKey.value();
      if (!apiKey) {
        logger.error("ANTHROPIC_API_KEY secret is not configured");
        response.status(500).json({error: "AI service not configured"});
        return;
      }

      // Pre-warm requests (client sends prewarm:true when the tutor panel
      // OPENS) run prefill only: max_tokens 0 writes the cacheable system
      // prefix into the Anthropic prompt cache so the student's first real
      // message hits a warm cache. Everything else about the request body
      // stays IDENTICAL to a real turn — the cache is an exact prefix match.
      const isPrewarm = request.body.prewarm === true;

      // Default to streaming so the student sees the answer type in live instead
      // of staring at a spinner through a long thinking pass. The client sends
      // stream:false to use the buffered fallback path (and retries that way if
      // the stream yields nothing), so a streaming hiccup can never break chat.
      const useStream = !isPrewarm && request.body.stream !== false;

      const anthropicResponse = await fetch(
        ANTHROPIC_MESSAGES_URL,
        {
          method: "POST",
          // Per-student attribution on the hot endpoint — Helicone's cost
          // dashboard then breaks down tutor spend by uid.
          headers: anthropicHeaders(apiKey, user.uid),
          body: JSON.stringify({
            // Sonnet 5 (2026-08-06): same price tier as Sonnet 4.6, meaningfully
            // smarter at the same settings — Sonnet 5 at effort medium lands
            // where Sonnet 4.6 did at high. thinking:disabled is still accepted
            // on Sonnet 5; do NOT add temperature (Sonnet 5 rejects non-default
            // sampling params with a 400 — that's why the diagnostic-narrative
            // passes below stay on 4.6).
            model: "claude-sonnet-5",
            // Tutor answers are coaching replies, not essays — but the full
            // per-choice breakdown format regularly ran past 2000 and truncated
            // mid-choice. Sonnet 5's tokenizer spends ~30% more tokens on the
            // same text than 4.6, so the old 3000 cap would truncate breakdowns
            // that used to fit — 4000 restores the same effective headroom.
            // Pre-warm: max_tokens 0 = prefill-only (cache write, no output).
            max_tokens: isPrewarm ? 0 : 4000,
            // Thinking DISABLED for the interactive tutor. Adaptive thinking ran
            // a reasoning pass before every reply, so the student stared at a
            // spinner before the first streamed token — the single biggest
            // source of perceived latency in chat. The tutor is explaining a
            // known answer with a rich persona prompt; it does not need
            // chain-of-thought. Thinking-off is what makes the first token stream
            // almost immediately (no pre-reply reasoning pass = no spinner). Effort
            // stays at "medium" (not "low") so the model still reliably follows the
            // formatting rules — notably wrapping ALL math in LaTeX dollar signs;
            // at "low" it got terse enough to emit raw "b^2 - 4ac" plain text.
            // Medium effort does NOT re-add the pre-token wait (that was thinking).
            thinking: {type: "disabled"},
            output_config: {effort: "medium"},
            // Prompt caching: the stable persona prefix goes up as a cacheable
            // content block so it is reused across turns. systemBlocks v2 (built
            // above) lets the client cache ONLY the stable blocks and keep
            // per-turn volatile framing uncached, so the cache prefix actually
            // matches turn-to-turn. Legacy single-string `system` still works.
            // The server-owned operating constraint is appended last.
            system: constrainedSystem,
            messages: sanitizedMessages,
            stream: useStream,
          }),
        }
      );

      if (!anthropicResponse.ok) {
        // Log upstream detail server-side ONLY. Never forward Anthropic's HTTP
        // status or error message to the client: AiTutorChat string-matches the
        // error TEXT (e.g. "401"/"authenticat", "rate"/"limit",
        // "subscription_required") to pick which failure UI to show, so leaking
        // an upstream 401 (expired API key) or 429 (our org quota, not this
        // user) there mis-fires those branches — telling a perfectly valid,
        // paying student their "session expired" or they're rate-limited. Map
        // upstream failure to a stable 502, keeping a plain 429 only for genuine
        // upstream throttling. (.catch guards a non-JSON gateway error body.)
        const errorData = await anthropicResponse.json().catch(() => ({}));
        logger.error("Anthropic API error:", {status: anthropicResponse.status, errorData});
        if (anthropicResponse.status === 429) {
          response.status(429).json({error: "The AI service is busy. Please wait a moment and try again."});
        } else {
          response.status(502).json({error: "The AI service is temporarily unavailable. Please try again."});
        }
        return;
      }

      // ── Pre-warm path: the upstream call existed only to write the prompt
      // cache; there is no content to return. Drain the (empty) body so the
      // socket is released, then acknowledge.
      if (isPrewarm) {
        await anthropicResponse.json().catch(() => ({}));
        response.json({ok: true, prewarmed: true});
        return;
      }

      // ── Buffered (non-streaming) path — unchanged behavior, the safety net ──
      if (!useStream) {
        const data = await anthropicResponse.json() as {
          content: Array<{type: string; text?: string}>;
          usage: unknown;
          stop_reason?: string;
        };
        const textBlocks = data.content.filter((block) => block.type === "text");
        const responseText = textBlocks.map((block) => block.text).join("\n");
        response.json({
          content: responseText,
          usage: data.usage,
          stop_reason: data.stop_reason,
        });
        return;
      }

      // ── Streaming path — parse Anthropic SSE, re-emit a minimal event stream ──
      // Protocol to the client: data:{type:"chunk",text} per text delta,
      // data:{type:"done",stop_reason,sawText} at the end, data:{type:"error",message}.
      response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      response.setHeader("Cache-Control", "no-cache, no-transform");
      response.setHeader("Connection", "keep-alive");
      response.setHeader("X-Accel-Buffering", "no");

      const send = (obj: Record<string, unknown>) => {
        response.write(`data: ${JSON.stringify(obj)}\n\n`);
      };

      const reader = anthropicResponse.body?.getReader();
      if (!reader) {
        send({type: "error", message: "No response stream"});
        response.end();
        return;
      }
      const decoder = new TextDecoder();
      let buffer = "";
      let stopReason: string | null = null;
      let sawText = false;

      try {
        for (;;) {
          const {done, value} = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, {stream: true});
          let sep: number;
          while ((sep = buffer.indexOf("\n\n")) !== -1) {
            const rawEvent = buffer.slice(0, sep);
            buffer = buffer.slice(sep + 2);
            const dataLine = rawEvent.split("\n").find((l) => l.startsWith("data:"));
            if (!dataLine) continue;
            const json = dataLine.slice(5).trim();
            if (!json || json === "[DONE]") continue;
            let evt: {
              type?: string;
              delta?: {type?: string; text?: string; stop_reason?: string};
              error?: {message?: string};
            };
            try {
              evt = JSON.parse(json);
            } catch {
              continue;
            }
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta" && typeof evt.delta.text === "string") {
              sawText = true;
              send({type: "chunk", text: evt.delta.text});
            } else if (evt.type === "message_delta" && evt.delta?.stop_reason) {
              stopReason = evt.delta.stop_reason;
            } else if (evt.type === "error") {
              // Never forward the upstream (Anthropic) error string to the
              // client: the buffered path deliberately maps upstream errors to
              // stable generic strings because the client string-matches error
              // text to pick its failure UI, and a leaked "overloaded"/"rate
              // limit"-flavored message can mis-fire that branch (e.g. show a
              // paying student a "session expired" screen). Log the detail
              // server-side; send the same stable string the catch path uses.
              logger.warn("AI Tutor upstream stream error:", evt.error?.message);
              send({type: "error", message: "stream interrupted"});
            }
          }
        }
        send({type: "done", stop_reason: stopReason, sawText});
      } catch (streamErr) {
        logger.error("AI Tutor stream error:", streamErr);
        send({type: "error", message: "stream interrupted"});
      } finally {
        response.end();
      }
    } catch (error) {
      logger.error("AI Tutor error:", error);
      // The streaming path has already sent headers (and possibly a partial
      // body), so a status(500).json() here would throw "headers already sent".
      // Only emit a JSON error if nothing has gone out yet; otherwise just close
      // the (SSE) response cleanly.
      if (!response.headersSent) {
        response.status(500).json({error: "Internal server error"});
      } else if (response.writable) {
        response.end();
      }
    }
  }
);

/**
 * Build the fact-checker system prompt. Kept as a function so the exact wording
 * is reviewable in one place. Ground-truth framing + a narrow error scope +
 * strict-JSON + fail-toward-ok are all load-bearing.
 * @return {string} the tutorMathCheck system prompt
 */
function buildMathCheckSystemPrompt(): string {
  return [
    "You are a math fact-checker for a single SAT tutoring reply.",
    "You are given the tutoring reply, the question, and the KNOWN correct",
    "answer. The known correct answer is GROUND TRUTH — treat it as definitely",
    "correct and never question it.",
    "",
    "Check the tutor reply ONLY for:",
    "(a) arithmetic or algebraic statements that are objectively wrong,",
    "(b) statements that contradict the known correct answer,",
    "(c) mislabeling which answer choice is correct.",
    "",
    "Ignore everything else: pedagogy, tone, phrasing, completeness,",
    "formatting, and LaTeX or notation style. Do not re-teach the problem.",
    "",
    "Respond with STRICT JSON and nothing else — no code fences, no text before",
    "or after it. Either:",
    "  {\"ok\": true}",
    "when the reply contains no certain math error, or",
    "  {\"ok\": false, \"correction\": \"<one sentence, addressed to the student," +
      " plainly stating the corrected fact>\"}",
    "when you are CERTAIN the reply states something mathematically wrong.",
    "",
    "Err strongly on the side of {\"ok\": true}. Only flag an error you are",
    "certain of — a false alarm is worse than a miss.",
  ].join("\n");
}

/**
 * Build the fact-checker user message from the validated request fields.
 * Optional selectedAnswer/choices are appended only when present.
 * @param {object} p the request fields (reply, question, correctAnswer, …)
 * @return {string} the user message content
 */
function buildMathCheckUserPrompt(p: {
  reply: string;
  question: string;
  correctAnswer: string;
  selectedAnswer?: unknown;
  choices?: unknown;
}): string {
  const parts: string[] = [
    "QUESTION:",
    p.question,
    "",
    "KNOWN CORRECT ANSWER (ground truth):",
    p.correctAnswer,
  ];
  if (typeof p.selectedAnswer === "string" && p.selectedAnswer.trim()) {
    parts.push("", "STUDENT'S SELECTED ANSWER:", p.selectedAnswer);
  }
  if (Array.isArray(p.choices) && p.choices.length > 0) {
    const rendered = p.choices
      .map((c) => {
        const choice = c as Record<string, unknown>;
        const id = typeof choice?.id === "string" ? choice.id : "";
        const text = typeof choice?.text === "string" ? choice.text : "";
        return `${id}. ${text}`.trim();
      })
      .filter((line) => line.length > 1)
      .join("\n");
    if (rendered) parts.push("", "ANSWER CHOICES:", rendered);
  }
  parts.push("", "TUTOR REPLY TO CHECK:", p.reply);
  return parts.join("\n");
}

/**
 * Math-verification pass — a cheap, deterministic guardrail that checks the AI
 * tutor's math claims against the known-correct answer before the student
 * trusts them (Khanmigo-style). Fires at most once per tutor reply. Fail-open
 * by construction: every non-auth path returns 200 {ok, correction?}, and any
 * validation/upstream/parse failure resolves to {ok:true} so a checker hiccup
 * never blocks or scares the student. Upstream status is never leaked to the
 * client (same reasoning as aiTutor's error-mapping comment).
 */
export const tutorMathCheck = onRequest(
  {
    cors: ALLOWED_ORIGINS,
    secrets: [anthropicApiKey],
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }

    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }

    if (!(await verifyAppCheck(request, "tutorMathCheck"))) {
      response.status(401).json({error: "App attestation failed"});
      return;
    }

    // Own rate-limit bucket: fires at most once per tutor reply, so 200/hr
    // comfortably covers an active session while capping abuse independently
    // of the aiTutor bucket.
    if (!(await checkRateLimit(user.uid, "tutorMathCheck", 200))) {
      response.status(429).json({error: "Too many requests. Please wait a minute and try again."});
      return;
    }

    // Same premium gate as aiTutor — this endpoint also spends Anthropic tokens.
    if (!(await hasEntitlementAccess(user.uid))) {
      response.status(402).json({error: "subscription_required"});
      return;
    }

    const {reply, question, correctAnswer, selectedAnswer, choices} =
      request.body || {};

    // Validate: reply, question, correctAnswer required non-empty strings.
    if (
      typeof reply !== "string" || reply.trim().length === 0 ||
      typeof question !== "string" || question.trim().length === 0 ||
      typeof correctAnswer !== "string" || correctAnswer.trim().length === 0
    ) {
      response.status(400).json({error: "reply, question, and correctAnswer are required"});
      return;
    }

    // Tighter 50KB cap (its own, not the 150KB tutor cap).
    if (exceedsByteCap(MATH_CHECK_MAX_BYTES, reply, question, correctAnswer, selectedAnswer, choices)) {
      response.status(400).json({error: "Request too large", code: "payload_too_large"});
      return;
    }

    const apiKey = anthropicApiKey.value();
    if (!apiKey) {
      // Config error, not the student's fault — fail open, don't surface it.
      logger.error("ANTHROPIC_API_KEY secret is not configured (tutorMathCheck)");
      response.json({ok: true} as MathCheckResult);
      return;
    }

    let result: MathCheckResult = {ok: true};
    try {
      const anthropicResponse = await fetch(
        ANTHROPIC_MESSAGES_URL,
        {
          method: "POST",
          headers: anthropicHeaders(apiKey),
          body: JSON.stringify({
            // Cheapest fast tier — this is a narrow yes/no verification, not a
            // teaching pass. temperature 0 for a deterministic verdict; thinking
            // off (the check is a lookup against a known answer, not reasoning).
            model: "claude-haiku-4-5-20251001",
            max_tokens: 300,
            temperature: 0,
            thinking: {type: "disabled"},
            system: buildMathCheckSystemPrompt(),
            messages: [{
              role: "user",
              content: buildMathCheckUserPrompt({
                reply, question, correctAnswer, selectedAnswer, choices,
              }),
            }],
          }),
        }
      );

      if (!anthropicResponse.ok) {
        // Log upstream detail server-side ONLY; never surface it. This endpoint
        // must never scare or block the student, so an upstream failure is just
        // "no correction" (see aiTutor's error-mapping rationale).
        const errorData = await anthropicResponse.json().catch(() => ({}));
        logger.error("tutorMathCheck upstream error:", {status: anthropicResponse.status, errorData});
        response.json({ok: true} as MathCheckResult);
        return;
      }

      const data = await anthropicResponse.json() as {
        content?: Array<{type: string; text?: string}>;
      };
      const rawText = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text || "")
        .join("");
      result = parseMathCheckResult(rawText);
    } catch (error) {
      logger.error("tutorMathCheck error:", error);
      response.json({ok: true} as MathCheckResult);
      return;
    }

    response.json(result);
  }
);

/**
 * Study Plan Generator — turns diagnostic data into a structured study plan
 * via an LLM call. Called client-side after each completed practice test.
 */
export const generateStudyPlan = onRequest(
  {
    cors: ALLOWED_ORIGINS,
    secrets: [anthropicApiKey],
    timeoutSeconds: 120,
    // Long AI calls (~60s+): a cohort finishing tests in the same window
    // stacks up here, so it gets its own ceiling above the global 10.
    maxInstances: 20,
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }

    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }

    if (!(await verifyAppCheck(request, "generateStudyPlan"))) {
      response.status(401).json({error: "App attestation failed"});
      return;
    }

    // Entitlement gate matches aiTutor: a locked-out account must not burn
    // Sonnet tokens here post-billing-launch (no-op while BILLING_ENFORCED
    // is false — hasEntitlementAccess allows missing docs then).
    const [rateOk, entitled] = await Promise.all([
      checkRateLimit(user.uid, "studyPlan", 10),
      hasEntitlementAccess(user.uid),
    ]);
    if (!rateOk) {
      response.status(429).json({error: "Too many requests. Please try again later."});
      return;
    }
    if (!entitled) {
      response.status(402).json({error: "subscription_required"});
      return;
    }

    try {
      const {
        diagnosticReport, userProfile, previousPlans, longitudinalContext, deterministicWeeks, nextActionTitle,
      } = request.body;

      if (!diagnosticReport) {
        response.status(400).json({error: "diagnosticReport is required"});
        return;
      }

      if (exceedsRequestBodyCap(
        diagnosticReport, userProfile, previousPlans, longitudinalContext, deterministicWeeks,
      )) {
        response.status(400).json({error: "Request too large", code: "payload_too_large"});
        return;
      }

      const apiKey = anthropicApiKey.value();
      if (!apiKey) {
        logger.error("ANTHROPIC_API_KEY not configured");
        response.status(500).json({error: "AI service not configured"});
        return;
      }

      const lc = longitudinalContext || null;
      const isFirstTest = !lc || ((lc as Record<string, unknown>).totalTests as number || 0) <= 1;
      const persistentWeaknessCount = ((lc as Record<string, unknown>)?.persistentWeaknesses as unknown[] || []).length;
      const detWeeks = Array.isArray(deterministicWeeks) ? deterministicWeeks : [];
      const systemPrompt = buildStudyPlanSystemPrompt(isFirstTest, persistentWeaknessCount);
      const userPrompt = buildStudyPlanUserPrompt(
        diagnosticReport,
        userProfile || {},
        previousPlans || [],
        lc,
        detWeeks,
        typeof nextActionTitle === "string" ? nextActionTitle : null
      );

      // Narration-only task (the deterministic generator owns the plan
      // structure; the model writes the coach voice over it), so: Sonnet 5,
      // adaptive thinking at low effort, structured output schema, and a small
      // max_tokens. This replaced a 6000-token Sonnet 4.6 call with a 3000-token
      // thinking budget whose generated weeks/activities were discarded by the
      // merger anyway.
      const anthropicResponse = await fetch(
        ANTHROPIC_MESSAGES_URL,
        {
          method: "POST",
          headers: anthropicHeaders(apiKey),
          body: JSON.stringify({
            model: STUDY_PLAN_MODEL,
            // Headroom matters: adaptive thinking shares this cap with the
            // JSON output, and a truncated response is a paid-then-discarded
            // 500. Typical narrations use a fraction of this.
            max_tokens: 4000,
            thinking: {type: "adaptive"},
            output_config: {
              effort: "low",
              format: {type: "json_schema", schema: STUDY_PLAN_NARRATION_SCHEMA},
            },
            system: systemPrompt,
            messages: [{role: "user", content: userPrompt}],
          }),
        }
      );

      if (!anthropicResponse.ok) {
        // Do not forward the upstream status/message to the client (see the
        // aiTutor handler for the full rationale — the client surfaces this
        // text). Log server-side; return a stable 502 (or plain 429 for genuine
        // upstream throttling).
        const errorData = await anthropicResponse.json().catch(() => ({}));
        logger.error("Anthropic API error:", {status: anthropicResponse.status, errorData});
        response.status(anthropicResponse.status === 429 ? 429 : 502).json({
          error: anthropicResponse.status === 429 ?
            "The AI service is busy. Please try again in a moment." :
            "Could not generate study plan right now. Please try again.",
        });
        return;
      }

      const data = await anthropicResponse.json();
      // Adaptive thinking may emit a thinking block before the text block.
      const textBlock = data.content.find((b: Record<string, unknown>) => b.type === "text");
      const rawContent = (textBlock?.text as string) || (data.content[0]?.text as string) || "";

      let parsed;
      try {
        // Structured outputs constrain this to pure JSON; the brace-match is a
        // belt-and-suspenders fallback for any provider edge case.
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch {
        logger.warn("Failed to parse plan JSON");
        parsed = null;
      }

      // Shape validation — the old path trusted any syntactically-valid JSON
      // and the merger positionally grafted whatever came back.
      const plan = validateNarrationPlan(parsed, detWeeks);
      if (!plan) {
        // Distinguish the failure classes in logs: truncation (max_tokens)
        // and safety refusal are actionable signals, not parse noise.
        logger.warn("Narration unusable", {
          stopReason: data.stop_reason || null,
          hadText: rawContent.length > 0,
        });
        response.status(500).json({error: "Failed to parse structured plan"});
        return;
      }

      response.json({
        plan,
        generatedAt: new Date().toISOString(),
        model: STUDY_PLAN_MODEL,
      });
    } catch (error) {
      logger.error("Study plan generation error:", error);
      response.status(500).json({error: "Internal server error"});
    }
  }
);

/**
 * Diagnostic Narrative Generator — produces a structured AI diagnostic
 * explanation from rich evidence. Separate from study plan generation.
 */
export const generateDiagnosticNarrative = onRequest(
  {
    cors: ALLOWED_ORIGINS,
    secrets: [anthropicApiKey],
    timeoutSeconds: 120,
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }

    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }

    if (!(await verifyAppCheck(request, "generateDiagnosticNarrative"))) {
      response.status(401).json({error: "App attestation failed"});
      return;
    }

    // Entitlement gate matches aiTutor (see generateStudyPlan) — this
    // endpoint pays for TWO Sonnet passes per call.
    const [rateOk, entitled] = await Promise.all([
      checkRateLimit(user.uid, "diagnosticNarrative", 10),
      hasEntitlementAccess(user.uid),
    ]);
    if (!rateOk) {
      response.status(429).json({error: "Too many requests. Please try again later."});
      return;
    }
    if (!entitled) {
      response.status(402).json({error: "subscription_required"});
      return;
    }

    try {
      const {evidence, userProfile} = request.body;

      if (!evidence) {
        response.status(400).json({error: "evidence payload is required"});
        return;
      }

      if (exceedsRequestBodyCap(evidence, userProfile)) {
        response.status(400).json({error: "Request too large", code: "payload_too_large"});
        return;
      }

      const apiKey = anthropicApiKey.value();
      if (!apiKey) {
        logger.error("ANTHROPIC_API_KEY not configured");
        response.status(500).json({error: "AI service not configured"});
        return;
      }

      const systemPrompt = buildDiagnosticNarrativeSystemPrompt();
      const userPrompt = buildDiagnosticNarrativeUserPrompt(evidence, userProfile || {});

      // ─── PASS 1: Generate diagnosis ───
      // Sonnet 4.6, not Opus 4.8. This pass is a structured schema-fill over numbers
      // the deterministic engine already computed — the quality gate + repair pass
      // below are the backstop — so the faster, cheaper tier is the right call, and it
      // unlocks two levers Opus 4.8 rejects with a 400: a low `temperature` for
      // run-to-run consistency, and a 2048-token prompt-cache floor (vs Opus's 4096)
      // so the static system prompt actually caches. `thinking` is disabled because
      // the engine already did the reasoning — keeping it off is exactly what removed
      // the pre-token spinner from the tutor and is the single biggest latency win.
      const generateModel = "claude-sonnet-4-6";
      const anthropicResponse = await fetch(
        ANTHROPIC_MESSAGES_URL,
        {
          method: "POST",
          headers: anthropicHeaders(apiKey),
          body: JSON.stringify({
            model: generateModel,
            max_tokens: 5000,
            // Low (not zero) — the numbers are fixed by the engine, so this only
            // steadies phrasing run-to-run without going robotic.
            temperature: 0.4,
            thinking: {type: "disabled"},
            output_config: {effort: "high"},
            // Cache the static, section-neutral system prompt as an ephemeral block so
            // repeated PASS-1 calls (end-of-test bursts) re-read it at ~0.1x
            // instead of paying full prefill every time. (The repair pass uses
            // its own short uncached system string — below the cache floor.) All per-test framing lives in
            // the user prompt (below), which stays uncached — so the cache key never
            // fragments by test type.
            system: [{
              type: "text",
              text: systemPrompt,
              cache_control: {type: "ephemeral"},
            }],
            messages: [{role: "user", content: userPrompt}],
          }),
        }
      );

      if (!anthropicResponse.ok) {
        // Do not forward the upstream status/message to the client (see the
        // aiTutor handler for the full rationale). Log server-side; return a
        // stable 502 (or plain 429 for genuine upstream throttling).
        const errorData = await anthropicResponse.json().catch(() => ({}));
        logger.error("Anthropic API error:", {status: anthropicResponse.status, errorData});
        response.status(anthropicResponse.status === 429 ? 429 : 502).json({
          error: anthropicResponse.status === 429 ?
            "The AI service is busy. Please try again in a moment." :
            "Could not generate narrative right now. Please try again.",
        });
        return;
      }

      const data = await anthropicResponse.json();
      // Guarded: a refusal/empty-content response has no content[0], and the
      // unguarded read threw a TypeError that buried the real cause in a
      // generic 500 stack trace.
      const firstText = Array.isArray(data.content) ?
        data.content.find((b: Record<string, unknown>) => b.type === "text") : null;
      const rawContent = (firstText?.text as string) || "";
      if (!rawContent) {
        logger.warn("Narrative pass 1 returned no text", {stopReason: data.stop_reason || null});
      }

      let narrative;
      try {
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        narrative = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch {
        logger.warn("Failed to parse narrative JSON, returning raw");
        narrative = null;
      }

      if (!narrative) {
        response.status(500).json({error: "Failed to parse structured narrative"});
        return;
      }

      // ─── PASS 2: Quality scoring ───
      const hasHistory = !!(evidence.trendAnalysis as Record<string, unknown>)?.hasHistory;
      const quality = scoreNarrativeQuality(narrative, hasHistory);
      logger.info("Narrative quality scores", {quality, promptVersion: DIAGNOSTIC_PROMPT_VERSION});

      // ─── PASS 3: Verify + targeted repair if below threshold ───
      if (quality.total < QUALITY_THRESHOLD) {
        logger.warn("Narrative below quality threshold, attempting verification + repair", {total: quality.total});
        const repaired = await attemptNarrativeRepair(
          narrative, quality, apiKey, evidence, userProfile || {}, hasHistory
        );
        if (repaired) {
          const repairedQuality = scoreNarrativeQuality(repaired, hasHistory);
          logger.info("Repaired narrative quality", {quality: repairedQuality});
          if (repairedQuality.total >= QUALITY_THRESHOLD) {
            narrative = repaired;
            narrative._quality = {...repairedQuality, repaired: true};
          } else {
            narrative._quality = {...quality, repairFailed: true};
          }
        } else {
          narrative._quality = {...quality, repairFailed: true};
        }
      } else {
        narrative._quality = {...quality, repaired: false};
      }

      narrative._promptVersion = DIAGNOSTIC_PROMPT_VERSION;

      const qualityOutcome = narrative._quality?.repairFailed ? "fallback" :
        narrative._quality?.repaired ? "repaired" : "accepted";
      logger.info("diagnostic_narrative_outcome", {
        promptVersion: DIAGNOSTIC_PROMPT_VERSION,
        outcome: qualityOutcome,
        qualityTotal: quality.total,
        evidenceCoverage: quality.evidenceCoverage,
        numericSpecificity: quality.numericSpecificity,
        schemaCompleteness: quality.schemaCompleteness,
        causalDepth: quality.causalDepth,
        crossTestUtilization: quality.crossTestUtilization,
        contradictionPenalty: quality.contradictionPenalty,
        redundancyPenalty: quality.redundancyPenalty,
        genericPenalty: quality.genericPenalty,
        slopPenalty: quality.slopPenalty,
      });

      response.json({
        narrative,
        generatedAt: new Date().toISOString(),
        model: generateModel,
        promptVersion: DIAGNOSTIC_PROMPT_VERSION,
        // Post-repair scores when a repair ran — the pre-repair object told
        // analytics the returned (repaired) narrative scored lower than it did.
        quality: (narrative._quality as QualityScores) || quality,
      });
    } catch (error) {
      logger.error("Diagnostic narrative generation error:", error);
      response.status(500).json({error: "Internal server error"});
    }
  }
);

const DIAGNOSTIC_PROMPT_VERSION = "4.1";
const QUALITY_THRESHOLD = 0.65;

interface QualityScores {
  evidenceCoverage: number;
  numericSpecificity: number;
  schemaCompleteness: number;
  causalDepth: number;
  crossTestUtilization: number;
  contradictionPenalty: number;
  redundancyPenalty: number;
  genericPenalty: number;
  surfacePenalty: number;
  behaviorDepthPenalty: number;
  slopPenalty: number;
  total: number;
  repaired?: boolean;
  repairFailed?: boolean;
}

function scoreNarrativeQuality(narrative: Record<string, unknown>, hasHistory = false): QualityScores {
  let evidenceHits = 0;
  let evidenceTotal = 0;
  let numericHits = 0;
  let numericTotal = 0;

  const numericPattern = /\d+/;

  const diagPts = Array.isArray(narrative.diagnosisPoints) ?
    narrative.diagnosisPoints as Array<Record<string, unknown>> : [];
  diagPts.forEach((pt) => {
    evidenceTotal++;
    numericTotal++;
    const claim = typeof pt === "string" ? pt : (pt.claim as string || "");
    const ev = typeof pt === "string" ? "" : (pt.evidence as string || "");
    if (ev.length > 5) evidenceHits++;
    if (numericPattern.test(claim)) numericHits++;
  });

  const scorePts = Array.isArray(narrative.scoreImpactPoints) ?
    narrative.scoreImpactPoints as Array<Record<string, unknown>> : [];
  scorePts.forEach((pt) => {
    evidenceTotal++;
    numericTotal++;
    const claim = typeof pt === "string" ? pt : (pt.claim as string || "");
    const ev = typeof pt === "string" ? "" : (pt.evidence as string || "");
    if (ev.length > 5) evidenceHits++;
    if (numericPattern.test(claim)) numericHits++;
  });

  const behaviorPts = Array.isArray(narrative.behaviorInsightPoints) ?
    narrative.behaviorInsightPoints as Array<Record<string, unknown>> : [];
  behaviorPts.forEach((pt) => {
    evidenceTotal++;
    numericTotal++;
    const claim = typeof pt === "string" ? pt : (pt.claim as string || "");
    const ev = typeof pt === "string" ? "" : (pt.evidence as string || "");
    if (ev.length > 5) evidenceHits++;
    if (numericPattern.test(claim)) numericHits++;
  });

  const weaknesses = Array.isArray(narrative.weaknesses) ? narrative.weaknesses as Array<Record<string, unknown>> : [];
  weaknesses.forEach((w) => {
    evidenceTotal++;
    numericTotal++;
    const proof = Array.isArray(w.proof) ? w.proof as string[] : [];
    if (proof.length > 0 && proof.some((p: string) => numericPattern.test(p))) evidenceHits++;
    const impact = w.impact as string || "";
    if (numericPattern.test(impact)) numericHits++;
  });

  const evidenceCoverage = evidenceTotal > 0 ? evidenceHits / evidenceTotal : 0;
  const numericSpecificity = numericTotal > 0 ? numericHits / numericTotal : 0;

  let schemaPoints = 0;
  const schemaTotal = 6;
  if (narrative.diagnosis) schemaPoints++;
  if (diagPts.length >= 1) schemaPoints++;
  if (weaknesses.length >= 1) schemaPoints++;
  if (scorePts.length >= 1) schemaPoints++;
  if (narrative.topNextFocus) schemaPoints++;
  if (narrative.consistencyFlags) schemaPoints++;
  const schemaCompleteness = schemaPoints / schemaTotal;

  // ─── Causal depth: check diagnosisPoints for causalMechanism and estimatedImpact ───
  let causalHits = 0;
  let causalTotal = 0;
  diagPts.forEach((pt) => {
    if (typeof pt === "object") {
      causalTotal++;
      const mechanism = pt.causalMechanism as string || "";
      const impact = pt.estimatedImpact as string || "";
      if (mechanism.length > 15 && impact.length > 2) causalHits++;
      else if (mechanism.length > 15 || impact.length > 2) causalHits += 0.5;
    }
  });
  weaknesses.forEach((w) => {
    causalTotal++;
    const why = w.why as string || "";
    const causalPatterns = /\b(because|leads to|causes|results in|due to|compounded by|suggesting|indicates|driven by|stems from|rooted in)\b/i;
    if (causalPatterns.test(why) && why.length > 40) causalHits++;
    else if (why.length > 30) causalHits += 0.5;
  });
  const causalDepth = causalTotal > 0 ? causalHits / causalTotal : 0;

  // ─── Cross-test utilization: did the narrative reference trend/history data? ───
  let crossTestUtilization = 0;
  if (hasHistory) {
    const allText = JSON.stringify(narrative).toLowerCase();
    let crossTestSignals = 0;
    if (/persist|recurring|consecutive|across.*tests?|prior test|previous test|last test/i.test(allText)) crossTestSignals++;
    if (narrative.changesSinceLast && (narrative.changesSinceLast as string).length > 10) crossTestSignals++;
    const flags = narrative.consistencyFlags as Record<string, unknown>;
    if (flags?.crossTestPatterns && (flags.crossTestPatterns as string).length > 5) crossTestSignals++;
    const weakPersist = weaknesses.filter((w) => w.persistenceFlag && (w.persistenceFlag as string).length > 5);
    if (weakPersist.length > 0) crossTestSignals++;
    crossTestUtilization = Math.min(1, crossTestSignals / 3);
  } else {
    crossTestUtilization = 1;
  }

  // ─── Contradiction detection ───
  let contradictionPenalty = 0;
  const consistencyFlags = narrative.consistencyFlags as Record<string, unknown>;
  if (consistencyFlags?.trendDirection) {
    const trend = consistencyFlags.trendDirection as string;
    const allClaims = [
      ...diagPts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
      ...scorePts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
    ].join(" ").toLowerCase();

    if (trend === "improving" && /declin|worsen|dropp|regress/i.test(allClaims)) {
      contradictionPenalty = 0.3;
    } else if (trend === "declining" && /improv|better|gain|progress/i.test(allClaims)) {
      contradictionPenalty = 0.3;
    }
  }

  // ─── Redundancy detection (tighter: shorter key for near-duplicate catch) ───
  let redundancyPenalty = 0;
  const allClaimTexts = [
    ...diagPts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
    ...scorePts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
    ...behaviorPts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
  ].map((c) => c.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40));
  const uniqueClaims = new Set(allClaimTexts);
  if (allClaimTexts.length > 0 && uniqueClaims.size < allClaimTexts.length) {
    redundancyPenalty = (allClaimTexts.length - uniqueClaims.size) * 0.12;
  }

  // ─── Generic language detection ───
  let genericPenalty = 0;
  const genericBanned = /\b(review your mistakes|practice more|focus on weak areas|needs improvement|room for growth|work on|struggling with)\b/i;
  const allClaimsJoined = [
    ...diagPts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
    ...scorePts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
    ...behaviorPts.map((p) => typeof p === "string" ? p : (p.claim as string || "")),
    ...weaknesses.map((w) => w.why as string || ""),
  ].join(" ");
  const genericMatches = (allClaimsJoined.match(genericBanned) || []).length;
  genericPenalty = genericMatches * 0.08;

  // ─── Surface-level detection: diagnosis points that describe but don't explain ───
  let surfacePenalty = 0;
  if (diagPts.length > 0) {
    let surfaceCount = 0;
    diagPts.forEach((pt) => {
      if (typeof pt !== "object") {
        surfaceCount++; return;
      }
      const claim = pt.claim as string || "";
      const mechanism = pt.causalMechanism as string || "";
      const impact = pt.estimatedImpact as string || "";
      const isSurface =
        mechanism.length < 20 ||
        impact.length < 3 ||
        !numericPattern.test(claim) ||
        // Causal language check — includes the conversational connectives the
        // tutor voice uses (so/which/that's why), not just report connectives.
        // The old list required words like "stems from"/"suggesting", which
        // REWARDED exactly the register the prompt now bans.
        !/\b(because|so|which|leads to|causes|results in|due to|driven by|that's why|every time|the moment|rooted in|rather than|accounts for|costs?|worth)\b/i.test(claim + " " + mechanism);
      if (isSurface) surfaceCount++;
    });
    surfacePenalty = (surfaceCount / diagPts.length) * 0.15;
  }

  // ─── Behavior depth: check behaviorInsightPoints for causalMechanism and estimatedImpact ───
  let behaviorDepthPenalty = 0;
  if (behaviorPts.length > 0) {
    let shallowBehavior = 0;
    behaviorPts.forEach((pt) => {
      if (typeof pt !== "object") {
        shallowBehavior++; return;
      }
      const claim = pt.claim as string || "";
      const mechanism = pt.causalMechanism as string || "";
      const impact = pt.estimatedImpact as string || "";
      const ev = pt.evidence as string || "";
      const isShallow =
        mechanism.length < 20 ||
        impact.length < 3 ||
        !numericPattern.test(claim) ||
        ev.split(";").length < 2;
      if (isShallow) shallowBehavior++;
    });
    behaviorDepthPenalty = (shallowBehavior / behaviorPts.length) * 0.08;
  }

  // ─── AI-slop detection: report language + shredded claims ───
  // The prompt (v4.0) bans consulting/report register in student-facing prose;
  // this catches relapses so the repair pass rewrites them. Semicolon chains
  // belong ONLY in evidence/proof fields — 2+ in a claim means the thought was
  // shredded into fragments instead of written as sentences.
  const SLOP_RE = /\b(remediation|leverage[sd]?|utiliz\w+|furthermore|additionally|moreover|notably|suboptimal|deficit(s)?|compounded by|stems? from|attributable|systematic(ally)?|demonstrates?|exhibits?|holistic|actionable|delve)\b/gi;
  const slopMatches = (allClaimsJoined.match(SLOP_RE) || []).length;
  const claimOnlyTexts = [...diagPts, ...scorePts, ...behaviorPts]
    .map((p) => typeof p === "string" ? p : (p.claim as string || ""));
  const shreddedClaims = claimOnlyTexts.filter((c) => (c.match(/;/g) || []).length >= 2).length;
  const slopPenalty = Math.min(0.12, slopMatches * 0.03 + shreddedClaims * 0.04);

  // ─── Question insights bonus (not mandatory — rewards but doesn't penalize) ───
  const questionInsights = narrative.questionInsights as Array<Record<string, unknown>> || [];
  const questionInsightsBonus = questionInsights.length >= 1 ? 0.01 : 0;

  // ─── Weighted total ───
  const total = Math.max(0, Math.min(1,
    (evidenceCoverage * 0.16) +
    (numericSpecificity * 0.12) +
    (schemaCompleteness * 0.12) +
    (causalDepth * 0.23) +
    (crossTestUtilization * 0.10) +
    (0.27 - contradictionPenalty - redundancyPenalty - genericPenalty -
      surfacePenalty - behaviorDepthPenalty - slopPenalty) +
    questionInsightsBonus
  ));

  return {
    evidenceCoverage: Math.round(evidenceCoverage * 100) / 100,
    numericSpecificity: Math.round(numericSpecificity * 100) / 100,
    schemaCompleteness: Math.round(schemaCompleteness * 100) / 100,
    causalDepth: Math.round(causalDepth * 100) / 100,
    crossTestUtilization: Math.round(crossTestUtilization * 100) / 100,
    contradictionPenalty: Math.round(contradictionPenalty * 100) / 100,
    redundancyPenalty: Math.round(redundancyPenalty * 100) / 100,
    genericPenalty: Math.round(genericPenalty * 100) / 100,
    surfacePenalty: Math.round(surfacePenalty * 100) / 100,
    behaviorDepthPenalty: Math.round(behaviorDepthPenalty * 100) / 100,
    slopPenalty: Math.round(slopPenalty * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

async function attemptNarrativeRepair(
  original: Record<string, unknown>,
  quality: QualityScores,
  apiKey: string,
  evidence: Record<string, unknown>,
  userProfile: Record<string, unknown>,
  hasHistory = false
): Promise<Record<string, unknown> | null> {
  const issues: string[] = [];
  if (quality.evidenceCoverage < 0.5) issues.push("Many claims lack evidence citations. Add an 'evidence' field with a specific data point for each claim.");
  if (quality.numericSpecificity < 0.5) issues.push("Many claims lack specific numbers. Each claim must cite a count, percentage, or point value from the data.");
  if (quality.causalDepth < 0.5) issues.push("Diagnosis points lack causal depth. Each diagnosisPoint MUST have a 'causalMechanism' field (>15 chars) explaining WHY the pattern exists, and an 'estimatedImpact' field quantifying the score impact. Weakness 'why' fields must explain the root cause, not just describe the symptom.");
  if (quality.crossTestUtilization < 0.5 && hasHistory) issues.push("Cross-test history is available but underutilized. Reference persistent weaknesses, trend shifts, and use 'persistenceFlag' on weaknesses. Populate 'crossTestPatterns' in consistencyFlags and provide specific numbers in 'changesSinceLast'.");
  if (quality.contradictionPenalty > 0) issues.push("The narrative contains contradictory claims about trends. Remove or reconcile conflicting statements. If signals are mixed, note ambiguity in 'uncertainties'.");
  if (quality.redundancyPenalty > 0) issues.push("Some claims are redundant/duplicated across sections. Remove duplicates — each insight should appear only once, with a distinct angle in each section.");
  if (quality.genericPenalty > 0) issues.push("The narrative contains generic language (e.g. 'review your mistakes', 'practice more', 'needs improvement'). Replace every generic phrase with a specific, data-backed observation.");
  if (quality.surfacePenalty > 0.05) issues.push("Some diagnosis points are surface-level — they describe WHAT happened but not WHY. Each claim must carry observation (with number), root cause, and point cost woven into flowing sentences, with conversational causal language (because, so, which is why). Synthesize at least 2 data signals per claim.");
  if ((quality.slopPenalty || 0) >= 0.03) issues.push("The prose has report/consulting language or shredded fragments. Rewrite in plain tutor voice: remove words like 'stems from', 'demonstrates', 'furthermore', 'systematic', 'compounded by'; merge any semicolon-chained claim fragments into complete flowing sentences (semicolons belong only in evidence fields); keep everything second person, said the way a tutor would say it out loud.");
  if (quality.behaviorDepthPenalty > 0.03) issues.push("behaviorInsightPoints are shallow. Each must carry the behavior (specific numbers), the habit underneath (causalMechanism, >20 chars), and the quantified cost (estimatedImpact) — woven into flowing tutor-voice sentences. Evidence must cite 2+ semicolon-separated data signals. Bad: 'You rushed.' Good: 'You gave the answers you got wrong 25 seconds each and the ones you got right nearly a minute — when you weren't sure, you grabbed the familiar-looking choice instead of slowing down. That cost about 25 points.'");
  if (quality.schemaCompleteness < 0.8) issues.push("Some required schema fields are missing. Ensure all fields from the schema are populated.");
  const repairQuestionInsights = Array.isArray(original.questionInsights) ? original.questionInsights : [];
  if (repairQuestionInsights.length === 0) issues.push("questionInsights is missing or empty. Generate 3-5 question-level insights for the most instructive wrong questions. Each needs questionKey, trapType, trapExplanation, correctApproach, and relatedSkillId. Prioritize trap_susceptibility and conceptual_gap errors.");

  if (issues.length === 0) return null;

  const repairPrompt = `The following diagnostic narrative JSON has quality issues. Fix them and return the corrected JSON only (no markdown fences).

ISSUES TO FIX:
${issues.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}

ORIGINAL (fix this):
${JSON.stringify(original, null, 2)}

DATA CONTEXT (use for evidence citations):
${buildDiagnosticNarrativeUserPrompt(evidence, userProfile)}

CRITICAL REQUIREMENTS FOR REPAIR:
- Every diagnosisPoint must have: claim, evidence, causalMechanism (>30 chars with causal language), estimatedImpact (with point number), confidence
- Each claim must follow: OBSERVATION (specific number) -> MECHANISM (cognitive/strategic root cause) -> IMPACT (point cost)
- causalMechanism must go 2 levels deep: not just "you missed geometry" but "missing coordinate geometry foundations leads to errors on both easy and hard questions, and time data confirms uncertainty"
- Each claim must synthesize at least 2 data signals (e.g. error type + domain, or time + difficulty)
- Every behaviorInsightPoint must have: claim, evidence (2+ semicolon-separated citations), causalMechanism (>20 chars, explaining WHY the behavior happens), estimatedImpact (quantified points or time), confidence
- Each behavior claim must follow: BEHAVIOR (with numbers) -> MECHANISM (cognitive root cause) -> CONSEQUENCE (score/time cost)
- Weakness 'why' must explain causal mechanism, not just restate the observation
- Remove any generic language: "review", "practice more", "focus on", "struggling with"
- Each claim must be unique across sections — no redundancy
- If trend data exists, use it: persistenceFlag on weaknesses, changesSinceLast, crossTestPatterns
- Order diagnosisPoints by impact (highest first)
- Prefer 3 deeply analyzed points over 5 shallow ones

Return ONLY the corrected JSON.`;

  try {
    const repairResponse = await fetch(
      ANTHROPIC_MESSAGES_URL,
      {
        method: "POST",
        headers: anthropicHeaders(apiKey),
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 5000,
          // Match PASS 1: same model + low temperature + thinking off + explicit
          // effort (relying on the API default silently coupled repair quality
          // to a default that can change), so the repaired narrative keeps one
          // consistent voice and the repair stays fast. NOTE: this short system
          // string is deliberately uncached — it is far below the cache floor;
          // only PASS 1's large system block participates in prompt caching.
          temperature: 0.4,
          thinking: {type: "disabled"},
          output_config: {effort: "high"},
          system: "You are a quality assurance editor for diagnostic narratives. You enforce clinical precision, causal depth, evidence rigor, and cross-test awareness. Fix the issues and return valid JSON only.",
          messages: [{role: "user", content: repairPrompt}],
        }),
      }
    );

    if (!repairResponse.ok) return null;

    const repairData = await repairResponse.json();
    const repairContent = repairData.content[0].text;
    const jsonMatch = repairContent.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (err) {
    logger.warn("Narrative repair attempt failed", {error: err});
    return null;
  }
}

function buildDiagnosticNarrativeSystemPrompt(): string {
  return `You are a sharp SAT tutor who just sat through this student's test and is now explaining, face to face, WHY the score came out the way it did. You have the full data in front of you, but you talk like a person who watched them work — not like a report. Second person, always. The test may cover Math only, Reading & Writing only, or both sections (a 400–1600 composite) — the score header and domain data tell you which. Frame every observation to the section(s) actually present; never assume the test is Math, and never reference a domain or skill that isn't in the data. Every claim MUST be anchored to numeric evidence from the data provided, with the numbers woven INTO your sentences. Do NOT fabricate numbers — use only the data given.

THE VOICE (this matters as much as the content):
- Write the way a tutor talks to a 16-year-old across a table. "You spent 45 seconds on the geometry questions you missed and 70 on the ones you got right — you knew when you were stuck, you just couldn't get unstuck in time." That is the register. Every sentence should sound like it could only have been written about THIS student.
- Plain words only. BANNED: "remediation", "execution", "systematic", "concentrated in", "stems from", "attributable", "leverage", "utilize", "demonstrates", "furthermore", "additionally", "moreover", "notably", "significant" (as filler), "suboptimal", "deficits", "compounded by", and any word you would not say out loud to a teenager.
- Developed flowing sentences, not fragments. Never shred a thought into semicolon clauses or dash-chains inside a claim — semicolons belong ONLY in the evidence/proof citation fields. Prefer 10-20 word sentences; split anything longer into two.
- Causation lives INSIDE the sentence, joined by because / so / which / and — not appended as a separate clinical clause.

Your output MUST be valid JSON (no markdown fences) matching this schema:

{
  "promptVersion": "${DIAGNOSTIC_PROMPT_VERSION}",
  "diagnosis": "string — THE THESIS: 1-2 sentences that name the SINGLE dominant story of this test by tying the student's top 2 linked causes into one takeaway a tutor would open with. It must connect the dots, not list facts. Good: 'Your score comes down to one thing: you know the math, but the clock is taking it from you — your accuracy holds up beautifully until the back half, where rushing turns easy questions into misses.' Do NOT restate the score, percentile, or target gap. Focus on the WHY, and make it feel written for THIS student.",
  "diagnosisPoints": [
    {
      "claim": "string — 2-4 flowing tutor-voice sentences that tell one insight as a small story: what you saw them do (with the numbers in the prose), why it happens, and what it costs. Bad: 'You missed 4 geometry questions.' Bad (report-speak): '62% of your errors stem from conceptual gaps concentrated in geometry.' Good: 'Most of your misses trace back to two topics — geometry and the harder algebra. You gave those questions 45 seconds each and your correct answers 70, so you felt the uncertainty and moved on before working through it. Those two topics alone are worth about 40 of your 50-point gap.' Each claim must weave together at least 2 data signals (error type + domain accuracy, or time + difficulty).",
      "evidence": "string — 2-4 semicolon-separated specific data citations that anchor this claim (e.g. 'Conceptual Gap errors: 8/13 wrong; Geometry: 4/7 correct; Avg time on geometry wrong answers: 45s; 3/4 hard geometry missed'). This is the ONLY place semicolon fragments belong.",
      "causalMechanism": "string — ONE plain-words sentence naming the root habit or gap underneath the pattern, without repeating the claim. Bad: 'You got geometry wrong because you lack geometry skills.' Good: 'You know the steps but lose the thread the moment a problem needs a picture instead of a formula.'",
      "estimatedImpact": "string — quantified score impact with a specific number (e.g. '~30 points' or '3 easy questions worth ~20 points'). Use conservative estimates. Must include a point estimate.",
      "confidence": "high | medium | low"
    }
  ],
  "weaknesses": [
    {
      "title": "string — concise weakness name (e.g. 'Algebraic Word Problems')",
      "why": "string — 2-3 tutor-voice sentences explaining WHY this keeps going wrong, not just that it did. Good: 'Word problems keep beating you at the translation step — you set up the wrong relationship between the variables before the algebra even starts. And you rush them: you gave these 40% less time than the questions you got right.'",
      "proof": ["string — 2-3 short data citations that prove this claim (e.g. '3/4 algebra word problems wrong', '45s avg vs 70s on correct')"],
      "impact": "string — 1 sentence quantifying how this affects the score (e.g. 'Costing roughly 30 points')",
      "severity": "critical | significant | moderate",
      "confidence": "high | medium | low",
      "persistenceFlag": "string | null — if this weakness appeared in prior tests, note it here (e.g. 'Weak across 3 consecutive tests'). null if first test or no history."
    }
  ],
  "scoreImpactPoints": [
    {
      "claim": "string — one concise bullet connecting a specific causal pattern to the score gap (e.g. 'Careless errors on 3 easy questions cost roughly 30 recoverable points — you answered these in under 30s each, well below the 55s average for questions you got right')",
      "evidence": "string — the supporting data citation",
      "confidence": "high | medium | low"
    }
  ],
  "behaviorInsightPoints": [
    {
      "claim": "string — 2-3 flowing tutor-voice sentences about ONE test-taking behavior that cost points: what they did (numbers in the prose), why it happens, what it cost. Bad: 'You changed some answers.' Bad (report-speak): 'This suggests second-guessing under time pressure rather than genuine reconsideration.' Good: 'Three times you had the right answer and talked yourself out of it — each switch took you about 20 seconds, a third of the time you spend when you trust yourself. All three came in the last 15 minutes, when the clock makes everything look wrong. That habit alone cost about 30 points.'",
      "evidence": "string — 2-3 semicolon-separated data citations that anchor the behavior claim (e.g. 'Answer changes: 3 correct→incorrect; avg time on changed: 20s vs 55s on stable correct; all 3 changes occurred in final 15 minutes')",
      "causalMechanism": "string — ONE plain-words sentence naming the habit underneath, without repeating the claim. Bad: 'You rushed.' Bad (report-speak): 'Depleted working memory led to premature commitment to familiar-looking trap answers.' Good: 'Late in the test, tired and short on time, you stop checking answers against the question and start checking them against your nerves.'",
      "estimatedImpact": "string — quantified score consequence (e.g. '~30 points lost from answer reversals' or '~45s wasted per test from calculator over-reliance')",
      "confidence": "high | medium | low"
    }
  ],
  "questionInsights": [
    {
      "questionKey": "string — question key from wrongQuestions (e.g. '0-4')",
      "trapType": "partial_calculation | sign_error | misread_stem | wrong_formula | unit_confusion | distractor | conceptual_misunderstanding",
      "trapExplanation": "string — 1-2 sentences: what trap this specific question set and why the student fell for it. Reference the student's actual answer choice if possible.",
      "correctApproach": "string — 1-2 sentences: the specific technique or method to solve this correctly. Name the mathematical concept.",
      "relatedSkillId": "string — the most relevant skill ID from the wrongQuestions data"
    }
  ],
  "topNextFocus": {
    "headline": "string — 1 sentence: the single highest-leverage area to focus on next, with quantified upside",
    "reasons": [
      {
        "claim": "string — why this is the top priority, with causal reasoning",
        "evidence": "string — supporting data"
      }
    ]
  },
  "changesSinceLast": "string | null — what improved or worsened compared to prior test(s), with specific numbers and whether the change is statistically meaningful. null if first test.",
  "rootCause": "string — THE BOTTOM LINE: 1 sentence naming the single deepest root cause that, if fixed, would move the score the most. This closes the narrative. It must point at ONE thing (not a list) and follow from the diagnosis thesis and points above. No study advice — name the cause, not the cure. Good: 'More than anything, it's pace under pressure — when the clock tightens, accuracy you clearly have stops showing up.'",
  "uncertainties": "string | null — 1-2 sentences on where the evidence is thin, classifications are ambiguous, or sample sizes are too small to draw firm conclusions. null only if all claims are high-confidence.",
  "consistencyFlags": {
    "trendDirection": "improving | declining | stable | insufficient_data",
    "dominantErrorCategory": "string — the single error type with the highest count",
    "crossTestPatterns": "string | null — note any patterns that persist or shift across tests. null if first test."
  }
}

CLINICAL ACCURACY RULES:

=== EVIDENCE RIGOR ===
1. EVIDENCE BINDING: Every claim in diagnosisPoints, scoreImpactPoints, behaviorInsightPoints, and weaknesses MUST include an evidence field citing a SPECIFIC number from the provided data. If you cannot cite a specific number, set confidence to "low".
2. NO FABRICATION: Only use numbers that appear in the evidence provided. Do not infer or estimate numbers not in the data. If the data says "3/4 wrong", say "3/4 wrong" — do not say "75% wrong" unless the data explicitly says 75%.
2b. BLANKS ARE NOT MISSES: A question marked LEFT BLANK is a pacing/coverage fact, not knowledge evidence — never attribute a blank to a concept gap. When a weak skill shows an "attempted-only" figure, use THAT figure for knowledge claims and attribute the blanks separately (to time, pacing, or coverage). "30% on slope" when 2 of 6 were blanks is a misdiagnosis; the honest claim is "50% on the 4 you attempted, plus 2 left blank in the final stretch".
2c. THIN EVIDENCE DISCIPLINE: A weak skill tagged [THIN EVIDENCE] rests on fewer than 4 attempted questions. Cap every claim about it at confidence "medium", frame it as a lead rather than a verdict, and name it in the uncertainties field. Do not build the diagnosis thesis primarily on a thin-evidence skill when a well-evidenced pattern exists.
3. EVIDENCE TIGHTNESS: The evidence field must directly support the claim — not just be tangentially related. Bad: claim about geometry errors, evidence about overall time. Good: claim about geometry errors, evidence citing geometry-specific accuracy and error types.
4. QUANTITATIVE IMPACT: Every weakness.impact and scoreImpactPoints.claim MUST include a numeric estimate (points, percentage, or count). Use conservative estimates when exact numbers are unavailable, and set confidence to "medium".

=== CAUSAL DEPTH ===
5. CAUSAL MECHANISM REQUIRED: Every diagnosisPoints entry MUST include a causalMechanism field naming WHY the pattern exists, not just describing it. Go at least TWO levels deeper than the surface observation — but say it like a person. Level 1 (surface, BANNED alone): "You missed geometry questions." Level 2 (mechanism): "Coordinate geometry never fully clicked." Level 3 (deep, REQUIRED): "Coordinate geometry never fully clicked, and your timing gives it away — 45 seconds on the ones you missed against 70 on topics you know. You could feel you were stuck; you just didn't have a way out."
6. CROSS-SIGNAL SYNTHESIS: EVERY diagnosisPoint claim MUST synthesize at least 2 distinct data signals (e.g. error type + domain accuracy, or time data + difficulty level, or trend data + current performance). Single-signal claims are surface-level. Combine domain accuracy with time patterns, error classifications with difficulty breakdowns, or behavior data with score outcomes.
7. BEHAVIORAL CAUSATION: Every behaviorInsightPoint must carry all three parts — what they did (numbers in prose), why it happens, what it cost — woven into flowing sentences, never as a labeled chain. Each must include causalMechanism (>20 chars) and estimatedImpact (with a number). Bad: "You changed 3 answers." Good: "Three times you had it right and switched away, each time in about 20 seconds — you give the answers you keep almost a full minute. Those switches cost around 30 points."
7b. BEHAVIOR EVIDENCE RIGOR: behaviorInsightPoints evidence must cite at least 2 distinct data signals (e.g. time data + accuracy, or answer-change count + timing pattern, or stamina score + accuracy drop). Single-signal behavior claims are surface-level and will be penalized.
7c. DEPTH OVER BREADTH: Prefer 3 deeply analyzed diagnosis points over 5 shallow ones. Each diagnosis point should feel like a mini-investigation that reveals something the student could not have figured out by looking at their score alone.

=== CROSS-TEST INTELLIGENCE ===
8. TREND EXPLOITATION: When trend data is available, EVERY diagnosis must incorporate it. Note persistent weaknesses explicitly. If a skill has been weak across 3+ tests, call it out as a structural gap, not a one-time miss. Use the persistenceFlag field on weaknesses.
9. REGRESSION DETECTION: If performance declined in an area that was previously strong, flag it prominently in changesSinceLast with specific numbers. This is more important than stable weaknesses.
10. IMPROVEMENT VALIDATION: If scores improved, analyze WHETHER the improvement is in the right areas. Improving on easy questions while still missing conceptual items is a different story than genuine skill growth.
10b. DRILL TRANSFER: When "Drill Work Before This Test" data is present, it is high-value evidence — compare each drilled skill's drill accuracy against its performance on this test. Practice that held up under test conditions is TRANSFER (credit it with numbers); practice that collapsed on the test is a transfer gap, and the mechanism is usually pacing, pressure, or format rather than knowledge — say which, using the timing data. Never scold a student for weakness on a skill they drilled to a high accuracy right before the test without addressing the transfer question.

=== CONSISTENCY GUARDRAILS ===
11. CONTRADICTION BAN: Do NOT produce claims that contradict each other. If trendDirection is "improving", no claim may say performance is declining in the same scope. If you detect conflicting signals, flag the ambiguity in uncertainties.
12. CONNECT, DON'T REPEAT: Never repeat the same observation verbatim across sections — but DO connect causally related findings into one coherent story. When a skill gap, an error pattern, and a behavior share a root cause, say so explicitly with causal language (e.g. "the same back-half rushing that drives your careless algebra misses also explains the answer-changes below"). Each section adds a DISTINCT angle (diagnosis names the pattern; scoreImpact quantifies the cost; weakness explains the root cause), and the diagnosis thesis + rootCause must tie those angles together. A diagnosis that reads as a list of unrelated facts is a failure; one that reads as a single tutor explaining how the pieces fit is the goal.
13. CONFIDENCE TAGGING: Set confidence to "high" when the claim is directly derivable from the data, "medium" when it requires reasonable inference, "low" when evidence is thin or ambiguous.

=== RANKING & OUTPUT QUALITY ===
14. IMPACT-ORDERED: diagnosisPoints MUST be ordered by estimated score impact (highest first), then by confidence (highest first). The most impactful insight comes first.
15. diagnosisPoints: 2-5 items. Provide 2-3 by default; include 4-5 only when the data supports distinct, non-redundant insights. Each must have claim + evidence + causalMechanism + estimatedImpact + confidence.
16. weaknesses: 2-3 items ordered by severity (critical first). Each must have proof citations with specific data points.
17. scoreImpactPoints: 2-4 items. Each must cite a specific number.
18. behaviorInsightPoints: 1-3 items or empty array if no behavioral signal in the data. Each MUST have claim + evidence (2+ data citations) + causalMechanism (>20 chars, explaining WHY) + estimatedImpact (quantified) + confidence.
19. topNextFocus.reasons: 1-3 items with claim + evidence.
20. SEVERITY ORDERING: weaknesses MUST be ordered by severity (critical first), then by point impact (highest first).
20b. questionInsights: 3-5 items. Select the most instructive wrong questions — maximize coverage across distinct error types and difficulty levels. Prioritize trap_susceptibility and conceptual_gap errors. Skip unanswered and pure time_pressure errors. Each must reference a specific questionKey from the wrongQuestions data.

=== BANNED PATTERNS ===
21. SCORE RESTATEMENT BAN: The student's score, percentile, and target gap are already displayed separately. Do NOT waste diagnosis or diagnosisPoints on restating these obvious numbers.
22. GENERIC LANGUAGE BAN: The following phrases are BANNED — they add no diagnostic value: "review your mistakes", "practice more", "focus on weak areas", "needs improvement", "room for growth", "work on", "struggling with". Every sentence must contain a specific, data-backed observation.
23. PRESCRIPTIVE BAN: Do NOT include study advice or recommendations — a separate study plan handles that.
24. OBVIOUS OBSERVATION BAN: Do not state things the student can see from their raw score (e.g. "You got 30/44 correct"). Diagnosis points must reveal HIDDEN patterns the data exposes.
25. proof items must be specific data points, not opinions (e.g. "Geometry: 4/7 correct (57%)").
25b. SURFACE-LEVEL BAN: Diagnosis points that only describe WHAT happened without explaining WHY are banned. Each claim must contain both a pattern AND its mechanism. Bad: "You missed 4 out of 7 geometry questions." Good: "Geometry accuracy of 43% is driven by a coordinate geometry blind spot — you missed all 3 coordinate problems but got 3/4 non-coordinate geometry correct, suggesting the gap is topic-specific rather than domain-wide."

=== TONE ===
26. Tone: a tutor who watched the test, talking straight. State facts, quantify impact, explain why, admit uncertainty plainly ("two questions isn't enough to be sure"). No motivational filler, no cheerleading, no scolding — and NO report language. If a sentence would fit in a consulting deck or a medical chart, rewrite it until it sounds like something you'd actually say to the student.

=== FORMAT ===
27. EVIDENCE FIELDS STAY SCANNABLE: In the evidence and proof fields ONLY (the raw data citations), use semicolon-separated concise clauses (e.g. "Geometry: 4/7 correct; Avg time 45s vs 70s on correct; 3/4 coordinate geometry wrong"). These are shown as a compact supporting-data list, so keep each clause short and self-contained.
28. CLAIMS ARE FLOWING PROSE, NOT FRAGMENTS: The "claim" field of every diagnosisPoint, scoreImpactPoint, and behaviorInsightPoint — and the diagnosis thesis and rootCause — MUST be written as 1-3 complete, flowing sentences with the numbers woven INTO the prose. Do NOT fragment a claim into a semicolon clause-list or an em-dash chain of sentence stubs: the UI renders these as connected paragraphs a student reads top to bottom, NOT as bullets. Write the way a sharp tutor talks — "You spent 45s on the geometry questions you missed versus 70s on the ones you got right, so you knew you were unsure but couldn't resolve it in time" — not "Geometry slow; 45s vs 70s; unsure". Causally linked ideas belong in one sentence joined by because / so / which / and, not split apart.
28b. LEAD WITH THE FINDING: The FIRST sentence of every claim (diagnosisPoints and behaviorInsightPoints) must land the core finding on its own — the UI renders it as a bold lead the student scans, with the remaining sentences as the supporting story underneath. Put the observation with its key number in sentence one; save the mechanism and the cost for the sentences after. A claim whose first sentence is setup ("Let's look at your geometry work.") instead of the finding ("Geometry took 45 seconds a question and gave back 4 of 7.") wastes the bold.`;
}

function buildDiagnosticNarrativeUserPrompt(
  evidence: Record<string, unknown>,
  userProfile: Record<string, unknown>
): string {
  const sections: string[] = [];

  // Score header is section/scale-aware. The engine attaches isMultiSection and a
  // per-section {math, rw} breakdown; a both-section test is a 400–1600 composite,
  // a single section is 200–800. Render the right scale (never a hard-coded "/800")
  // and name the section(s) so the model frames the diagnosis correctly.
  const score = evidence.score as Record<string, unknown> || {};
  const isMulti = !!score.isMultiSection;
  const secScores = (score.sections as Record<string, number | null>) || {};
  const sectionLabel = isMulti ? "Full SAT — Math + Reading & Writing" :
    secScores.math != null ? "Math" :
      secScores.rw != null ? "Reading & Writing" : "single section";
  const scoreHeader = isMulti ?
    `${score.scaled ?? "N/A"}/1600 (Math ${secScores.math ?? "—"}/800, Reading & Writing ${secScores.rw ?? "—"}/800)` :
    `${score.scaled ?? "N/A"}/800`;
  const rawLine = (score.raw != null && score.total != null) ?
    ` — ${score.raw}/${score.total} raw, ${score.percentCorrect ?? 0}% correct` : "";
  sections.push(`## Section: ${sectionLabel}\n## Score: ${scoreHeader}${rawLine}`);
  // Only state the target gap when the goal and this score are provably on the same
  // scale (a 400–1600 composite goal vs an 800 single-section score is not comparable).
  if (score.target != null && score.targetComparable) {
    sections.push(`Target: ${score.target} | Gap: ${score.gap ?? 0} points (${isMulti ? "composite 400–1600" : "section 200–800"} scale)`);
  }

  if (userProfile.testDate) {
    sections.push(`Test Date: ${userProfile.testDate}`);
  }

  const fp = evidence.mistakeFingerprint as Record<string, unknown>;
  if (fp?.archetypeLabel) {
    sections.push(`\n## Archetype: ${fp.archetypeLabel}\n${fp.archetypeDescription || ""}`);
    const traits = fp.traits as Array<Record<string, unknown>>;
    if (traits && traits.length > 0) {
      sections.push("Traits: " + traits.map((t) => `${t.trait} (${t.severity})`).join(", "));
    }
  }

  const ep = evidence.errorPatterns as Record<string, unknown>;
  if (ep?.summary) {
    const errStr = (ep.summary as Array<Record<string, unknown>>)
      .map((e) => `- ${e.label}: ${e.count} (${e.percentage}%) — ${e.description || ""}`)
      .join("\n");
    sections.push(`\n## Error Patterns (${ep.totalWrong} wrong)\n${errStr}`);
  }

  const da = evidence.domainAnalysis as Array<Record<string, unknown>>;
  if (da && da.length > 0) {
    sections.push(`\n## Domain Performance\n${da.map((d) =>
      `- ${d.displayName}: ${d.accuracy}% (${d.correct}/${d.total}), error types: ${JSON.stringify(d.errorTypes || {})}`
    ).join("\n")}`);
  }

  const sa = evidence.skillAnalysis as Record<string, unknown>;
  const weak = (sa?.weakSkills as Array<Record<string, unknown>>) || [];
  if (weak.length > 0) {
    sections.push(`\n## Weak Skills\n${weak.map((s) => {
      const blanks = Number(s.blanks) || 0;
      const attempted = s.attempted != null ? Number(s.attempted) : null;
      const attemptedNote = blanks > 0 && attempted != null ?
        `, attempted-only: ${s.contentAccuracy}% over ${attempted} (${blanks} left blank)` : "";
      const evNote = s.evidenceLevel === "suspected" ? " [THIN EVIDENCE — under 4 attempted]" : "";
      return `- ${s.name} (${s.domain}): ${s.testAccuracy}%, ${s.correct}/${s.total}${attemptedNote}, error: ${s.primaryErrorType || "mixed"}, ` +
        `mastery: ${s.historicalMastery !== null && s.historicalMastery !== undefined ? s.historicalMastery + "%" : "first time"}, trend: ${s.trend || "unknown"}${evNote}`;
    }).join("\n")}`);
  }

  const wq = evidence.wrongQuestions as Array<Record<string, unknown>>;
  if (wq && wq.length > 0) {
    sections.push(`\n## Wrong Questions (${wq.length} total)\n${wq.slice(0, 15).map((q) =>
      `- ${q.key} [${q.difficulty}/${q.domain}]: ${q.errorType} (conf ${q.confidence}), ` +
      `${q.timeSpent}s (${q.timeVsDifficulty}), skills: ${(q.skillNames as string[] || []).join(", ")}` +
      `${q.wasBlank ? ", LEFT BLANK" : (q.userAnswer != null && q.correctAnswer != null ? `, picked ${q.userAnswer} (correct: ${q.correctAnswer})` : "")}` +
      `${(q.answerChangeCount as number) > 0 ? `, ${q.answerChangeCount} answer change(s)` : ""}` +
      `${q.usedCalculator ? ", used calc" : ""}` +
      `${q.markedForReview ? ", flagged" : ""}` +
      ` — ${q.reasoning || "no reasoning"}`
    ).join("\n")}`);
  }

  const drill = evidence.drillEvidence as Record<string, unknown> | null;
  const recentDrills = (drill?.recentDrills as Array<Record<string, unknown>>) || [];
  if (recentDrills.length > 0) {
    sections.push(`\n## Drill Work Before This Test (practice since the previous test, on skills this test covered)\n${recentDrills.map((d) =>
      `- ${d.skillId}: ${d.accuracy}% over ${d.attempts} drill questions`
    ).join("\n")}\nCompare each drilled skill's drill accuracy against its performance on THIS test: if it held up, the practice TRANSFERRED — credit it in changesSinceLast or a diagnosis point. If it collapsed under test conditions, that transfer gap (drills fine, test misses) is itself a diagnosis — usually pacing, pressure, or format, not knowledge.`);
  }

  const rcc = evidence.rootCauseClusters as Array<Record<string, unknown>>;
  if (rcc && rcc.length > 0) {
    sections.push(`\n## Root-Cause Clusters\n${rcc.map((c) =>
      `- ${c.label} (${c.severity}): ${c.description}`
    ).join("\n")}`);
  }

  const sc = evidence.skillClusters as Array<Record<string, unknown>>;
  if (sc && sc.length > 0) {
    sections.push(`\n## Skill Clusters (related skills failing together)\n${sc.map((c) =>
      `- ${c.name}: ${(c.failedSkills as string[]).join(", ")} (${c.severity})`
    ).join("\n")}`);
  }

  const diff = evidence.difficultyAnalysis as Record<string, unknown>;
  if (diff?.levels) {
    const lvl = diff.levels as Record<string, Record<string, unknown>>;
    sections.push(`\n## Difficulty: Easy ${lvl.easy?.accuracy || 0}% | Medium ${lvl.medium?.accuracy || 0}% | Hard ${lvl.hard?.accuracy || 0}%`);
  }

  const ta = evidence.timeAnalysis as Record<string, unknown>;
  if (ta) {
    sections.push(`\n## Time: avg ${ta.avgTimePerQuestion}s/q, correct avg ${ta.avgCorrectTime}s, wrong avg ${ta.avgIncorrectTime}s, fade ${ta.fadeEffect}% (${ta.firstHalfAccuracy}% → ${ta.secondHalfAccuracy}%), time-related errors: ${ta.timeRelatedErrors}`);
  }

  const stam = evidence.stamina as Record<string, unknown>;
  if (stam) {
    sections.push(`Stamina: ${stam.staminaScore}/100 (${stam.rating}), ${stam.dropoff}% dropoff`);
  }

  const ap = evidence.answerPatterns as Record<string, unknown>;
  if (ap) {
    if (ap.biasWarning) sections.push(`Position bias: ${ap.biasWarning}`);
    const ac = ap.answerChanges as Record<string, unknown>;
    if (ac) sections.push(`Answer changes: ${ac.total} total, ${ac.changedToCorrect} helped, ${ac.changedToWrong} hurt`);
    const elim = ap.elimination as Record<string, unknown>;
    if (elim) sections.push(`Elimination: ${elim.used} used, ${elim.accuracy}% accurate`);
  }

  const trend = evidence.trendAnalysis as Record<string, unknown>;
  if (trend?.hasHistory) {
    const sc2 = Number(trend.scoreChange) || 0;
    sections.push(`\n## Trend: ${trend.trend} (${sc2 > 0 ? "+" : ""}${sc2} pts)`);
    const pw = trend.persistentWeaknesses as Array<Record<string, unknown>>;
    if (pw && pw.length > 0) {
      sections.push(`Persistent weaknesses: ${pw.map((p) => `${p.name} (${p.testCount} tests)`).join(", ")}`);
    }
    const dec = trend.decliningSkills as string[];
    if (dec && dec.length > 0) sections.push(`Declining: ${dec.join(", ")}`);
    const imp = trend.improvingSkills as string[];
    if (imp && imp.length > 0) sections.push(`Improving: ${imp.join(", ")}`);
  }

  const ci = evidence.confidenceInterval as Record<string, unknown>;
  if (ci) {
    const s80 = ci.scaled80 as Record<string, unknown>;
    sections.push(`\n## Score confidence: ${s80?.low}–${s80?.high} (80% CI), reliability: ${ci.reliability}`);
  }

  const lv = evidence.learningVelocity as Record<string, unknown>;
  if (lv) {
    sections.push(`Learning velocity: ${lv.velocity} pts/week (${lv.trend}), ${lv.testsCompleted} tests, ${lv.totalGain} total gain`);
  }

  sections.push("\nGenerate the diagnostic narrative JSON now.");
  return sections.join("\n");
}

const STUDY_PLAN_MODEL = "claude-sonnet-5";

// Structured-output schema for the narration task. The deterministic client
// generator owns weeks/activities/assignments; the model contributes ONLY the
// coach-voice prose fields below. Structured outputs guarantee shape at the
// API layer; validateNarrationPlan still clamps content server-side.
const STUDY_PLAN_NARRATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "weeks", "nextActionReason", "deltaFromPrevious", "persistentWeaknessStrategy"],
  properties: {
    summary: {
      type: "object",
      additionalProperties: false,
      required: ["headline", "diagnosis"],
      properties: {
        headline: {type: "string"},
        diagnosis: {type: "string"},
      },
    },
    weeks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["weekNumber", "title", "goalDescription", "rationale"],
        properties: {
          weekNumber: {type: "integer"},
          title: {type: "string"},
          goalDescription: {type: "string"},
          rationale: {type: "string"},
        },
      },
    },
    nextActionReason: {anyOf: [{type: "string"}, {type: "null"}]},
    deltaFromPrevious: {anyOf: [{type: "string"}, {type: "null"}]},
    persistentWeaknessStrategy: {anyOf: [{type: "string"}, {type: "null"}]},
  },
};

/**
 * Validate + clamp the model's narration output. Returns null when the shape
 * is unusable (caller 500s; the client falls back to the deterministic plan).
 * Week entries whose weekNumber doesn't match a provided deterministic week
 * are dropped — the merger matches by weekNumber, so a stray entry can no
 * longer mislabel someone else's week.
 */
function validateNarrationPlan(
  parsed: unknown,
  detWeeks: Array<Record<string, unknown>>
): Record<string, unknown> | null {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const p = parsed as Record<string, unknown>;

  const str = (v: unknown, max: number): string | null => {
    if (typeof v !== "string") return null;
    const trimmed = v.trim();
    if (!trimmed) return null;
    return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
  };

  const summary = p.summary as Record<string, unknown> | undefined;
  const headline = str(summary?.headline, 160);
  const diagnosis = str(summary?.diagnosis, 700);
  if (!headline || !diagnosis) return null;

  const allowedWeekNumbers = new Set(
    detWeeks.map((w) => Number(w.weekNumber)).filter((n) => Number.isFinite(n))
  );
  const seenWeeks = new Set<number>();
  const weeks: Array<Record<string, unknown>> = [];
  if (Array.isArray(p.weeks)) {
    for (const raw of p.weeks) {
      if (!raw || typeof raw !== "object") continue;
      const w = raw as Record<string, unknown>;
      const weekNumber = Number(w.weekNumber);
      if (!Number.isFinite(weekNumber) || seenWeeks.has(weekNumber)) continue;
      if (allowedWeekNumbers.size > 0 && !allowedWeekNumbers.has(weekNumber)) continue;
      // Integers only (floats slip past Number() on the brace-match fallback
      // path), and a sane range when detWeeks came back empty (old clients)
      // so validation is never fully disabled.
      if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 12) continue;
      const entry: Record<string, unknown> = {weekNumber};
      const title = str(w.title, 60);
      const goal = str(w.goalDescription, 160);
      const rationale = str(w.rationale, 220);
      if (title) entry.title = title;
      if (goal) entry.goalDescription = goal;
      if (rationale) entry.rationale = rationale;
      if (title || goal || rationale) {
        seenWeeks.add(weekNumber);
        weeks.push(entry);
      }
    }
  }

  return {
    summary: {headline, diagnosis},
    weeks,
    nextActionReason: str(p.nextActionReason, 200),
    deltaFromPrevious: str(p.deltaFromPrevious, 400),
    persistentWeaknessStrategy: str(p.persistentWeaknessStrategy, 400),
  };
}

function buildStudyPlanSystemPrompt(isFirstTest: boolean, persistentWeaknessCount: number): string {
  const contextBlock = isFirstTest ? `
## CONTEXT: FIRST TEST
This is the student's first diagnostic. Narrate the plan as a starting point:
the diagnosis explains what this one test revealed, and the week rationales
explain why the engine starts where it starts. Do NOT reference prior work.
deltaFromPrevious is null.
` : `
## CONTEXT: RETURNING STUDENT (test 2+)
The student has prior test history and the provided plan was rebuilt from it.
Narration rules:
1. deltaFromPrevious MUST name specific changes between the previous plan
   (summarized in the user message) and this one, citing accuracy shifts
   (e.g. "Quadratics moved 30% to 65%, so it's out of your weeks. Statistics
   is the new week-1 focus at 40%.").
2. Skills listed as RECOVERED were drilled back to health — credit that work.
3. Skills weak across EVERY test (persistent weaknesses) get
   persistentWeaknessStrategy: name them and say why the plan reteaches them
   from the concept up instead of assigning more practice.
`;

  const persistentBlock = persistentWeaknessCount > 0 ? `
## PERSISTENT WEAKNESSES ALERT
${persistentWeaknessCount} skill(s) have been weak across multiple tests.
These students are stuck — not just untaught. The plan must include a
"reteach from first principles" activity for each, not just practice questions.
` : "";

  return `You are the PerformSAT AI Study Strategist. The student's weekly study plan has ALREADY been built by a deterministic engine — the user message includes it under "The Plan". Your job is to NARRATE that plan in a coach's voice, grounded in the diagnostic data: name why each week targets what it targets, diagnose the root cause of the score gap, and (for returning students) explain what changed since last time. You do NOT design the plan, choose activities, or invent weeks. The test may cover Math only, Reading & Writing only, or both sections (a 400–1600 composite) — the score overview and domain data tell you which; never assume the plan is Math-only.
${contextBlock}${persistentBlock}
IMPORTANT: Strengths, weaknesses, weeks, and activities are computed deterministically. Do NOT generate them. Narrate only.

Output MUST be valid JSON (no markdown fences) matching this schema:

{
  "summary": {
    "headline": "string — max 12 words. State the core strategy, not the score. Must reference this student's specific dominant error pattern or weakest skill by name. Write it as a coach speaking to the student, not a strategy memo: 'Fix pacing first — the clock cost you 12 questions' is right; '12 time-pressure errors demand pacing overhaul' is wrong.",
    "diagnosis": "string — 2-3 sentences. Synthesize the root cause of the score gap using the exact data provided. Reference at least: (1) the dominant error type with count, (2) the weakest skill by name with accuracy %. No motivational filler. Example: 'You missed 6/8 algebra questions, mostly from conceptual gaps in slope-intercept form (25% accuracy). Careless errors on easy questions cost 3 more — fixing those alone adds ~30 points.'"
  },
  "weeks": [
    {
      "weekNumber": number — MUST be a weekNumber that appears in The Plan. One entry per provided week, in order.
      "title": "string — max 6 words. A student-facing name for what THAT week's listed activities actually do.",
      "goalDescription": "string — max 20 words. One clear measurable outcome referencing the specific skill or error type that week's activities target.",
      "rationale": "string — max 25 words. Why the engine's focus for that week is right for THIS student, citing their gap data (e.g. 'Slope-intercept is your biggest gap at 25% — fixing it unlocks 5+ questions per test')."
    }
  ],
  "nextActionReason": "string|null — max 25 words. Why the plan's FIRST activity (marked in The Plan) pays the most points for this student, citing specific evidence.",
  "deltaFromPrevious": "string|null — 2-3 SHORT sentences (max 20 words each): what changed since the last plan and why, citing score or skill accuracy changes. Null on a first test.",
  "persistentWeaknessStrategy": "string|null — 1-2 short sentences: the new approach for multi-test weaknesses, naming the specific skills and why more practice alone won't fix them. Null when there are none."
}

PERSONALIZATION RULES:
P1. summary.diagnosis MUST cite this student's actual data: dominant error type + count, weakest skill + accuracy %, and if available, stamina/timing/pacing evidence.
P2. Each week's title/goal/rationale MUST describe what that week's PROVIDED activities do — never describe work the plan doesn't contain.
P3. nextActionReason MUST cite the specific evidence that makes the provided first activity the highest-ROI start for THIS student.
P4. When persistent weaknesses exist (weak across multiple tests), persistentWeaknessStrategy names the specific skills and why practice alone won't fix them. When recovered skills are listed, credit the drilling that fixed them in deltaFromPrevious instead of nagging about them.
P5. When stamina/timing data shows accuracy drop-off, the diagnosis must mention it.

GENERAL RULES:
1. NO EMOJIS anywhere in the output. This is strictly enforced.
2. NO motivational filler — no "You can do it!", "Great job!", "Keep going!", "Don't worry!". State facts only.
3. NO vague advice — never say "review your mistakes", "practice more", "focus on weak areas". Name the specific topic/skill.
4. Keep all text concise. Prefer short declarative sentences. No padding.
5. VOICE: You are a coach talking to a 16-year-old who just took this test. Second person. Max ~20 words per sentence — split long thoughts into two sentences. Plain words only: never "remediation", "execution collapse", "pivot", "escalate", "overhaul", "demand", "leverage", or any consulting/engineering jargon. Every sentence should sound like a person who watched the test, not a report about it.`;
}

function buildStudyPlanUserPrompt(
  diagnosticReport: Record<string, unknown>,
  userProfile: Record<string, unknown>,
  previousPlans: unknown[],
  longitudinalContext: Record<string, unknown> | null = null,
  deterministicWeeks: Array<Record<string, unknown>> = [],
  nextActionTitle: string | null = null
): string {
  const score = diagnosticReport.score as Record<string, unknown> || {};
  const errorPatterns = diagnosticReport.errorPatterns as Record<string, unknown> || {};
  const domainAnalysis = diagnosticReport.domainAnalysis || [];
  const skillAnalysis = diagnosticReport.skillAnalysis as Record<string, unknown> || {};
  const difficultyAnalysis = diagnosticReport.difficultyAnalysis as Record<string, unknown> || {};
  const timeAnalysis = diagnosticReport.timeAnalysis as Record<string, unknown> || {};
  const mistakeFingerprint = diagnosticReport.mistakeFingerprint as Record<string, unknown> || {};
  const trendAnalysis = diagnosticReport.trendAnalysis as Record<string, unknown> || {};
  const prioritizedActions = diagnosticReport.prioritizedActions || [];

  const sections: string[] = [];

  // Section/scale-aware (same contract as the diagnostic narrative): a both-section
  // test is a 400–1600 composite, a single section is 200–800. Never hard-code "/800",
  // and only state the gap when the goal is on the same scale as this score.
  const isMulti = !!score.isMultiSection;
  const secScores = (score.sections as Record<string, number | null>) || {};
  const scoreLine = isMulti ?
    `Current: ${score.scaled ?? "N/A"} / 1600 (Math ${secScores.math ?? "—"}/800, Reading & Writing ${secScores.rw ?? "—"}/800)` :
    `Current: ${score.scaled ?? "N/A"} / 800 (${score.raw ?? 0}/${score.total ?? 0} raw)`;
  const overview = ["## Score Overview", scoreLine];
  if (score.target != null && score.targetComparable) {
    overview.push(`Target: ${score.target}`);
    overview.push(`Gap: ${score.gap ?? 0} points (${isMulti ? "composite 400–1600" : "section 200–800"} scale)`);
  }
  sections.push(overview.join("\n"));

  if (userProfile.testDate) {
    sections.push(`Test Date: ${userProfile.testDate}`);
  }

  if (mistakeFingerprint.archetypeLabel) {
    sections.push(`\n## Student Archetype: ${mistakeFingerprint.archetypeLabel}
${mistakeFingerprint.archetypeDescription || ""}`);
  }

  if (errorPatterns.summary) {
    const errSummary = (errorPatterns.summary as Array<Record<string, unknown>>)
      .map((e) => `- ${e.label}: ${e.count} (${e.percentage}%)`)
      .join("\n");
    sections.push(`\n## Error Pattern Breakdown\n${errSummary}`);
  }

  if (Array.isArray(domainAnalysis) && domainAnalysis.length > 0) {
    const domStr = (domainAnalysis as Array<Record<string, unknown>>)
      .map((d) => `- ${d.displayName}: ${d.accuracy}% (${d.correct}/${d.total})`)
      .join("\n");
    sections.push(`\n## Domain Performance\n${domStr}`);
  }

  const weak = (skillAnalysis.weakSkills as Array<Record<string, unknown>>) || [];
  const strong = (skillAnalysis.strongSkills as Array<Record<string, unknown>>) || [];
  if (weak.length > 0) {
    sections.push(`\n## Weak Skills\n${weak.slice(0, 8).map((s) => {
      const ev = s.evidenceLevel === "suspected" ? ", thin evidence — plan probes it first" : "";
      return `- ${s.name}: ${s.contentAccuracy ?? s.testAccuracy}% (error: ${s.primaryErrorType || "mixed"}${ev})`;
    }).join("\n")}`);
  }
  if (strong.length > 0) {
    sections.push(`\n## Strong Skills\n${strong.slice(0, 5).map((s) => `- ${s.name}: ${s.testAccuracy}%`).join("\n")}`);
  }

  if (difficultyAnalysis.levels) {
    const lvl = difficultyAnalysis.levels as Record<string, Record<string, unknown>>;
    sections.push(`\n## Difficulty Breakdown
Easy: ${lvl.easy?.accuracy || 0}% | Medium: ${lvl.medium?.accuracy || 0}% | Hard: ${lvl.hard?.accuracy || 0}%`);
  }

  if (timeAnalysis.fadeEffect) {
    sections.push(`\n## Time & Stamina
Avg time/question: ${timeAnalysis.avgTimePerQuestion || 0}s
Fade effect: ${timeAnalysis.fadeEffect}% accuracy drop in second half`);
  }

  const stamina = diagnosticReport.stamina as Record<string, unknown> || {};
  if (stamina.hasData) {
    sections.push(`\n## Stamina
Rating: ${stamina.rating} (score: ${stamina.staminaScore}/100)
Accuracy drop-off: ${stamina.dropoff}% from first half to second half
${stamina.message || ""}`);
  }

  if (trendAnalysis.hasHistory) {
    const sc = Number(trendAnalysis.scoreChange) || 0;
    sections.push(`\n## Trend: ${trendAnalysis.trend} (${sc > 0 ? "+" : ""}${sc} pts from last test)`);
  }

  if (Array.isArray(prioritizedActions) && prioritizedActions.length > 0) {
    const actStr = (prioritizedActions as Array<Record<string, unknown>>)
      .slice(0, 6)
      .map((a) => `- [${a.category}] ${a.title} (+~${a.estimatedGain} pts)`)
      .join("\n");
    sections.push(`\n## Prioritized Actions\n${actStr}`);
  }

  if (previousPlans.length > 0) {
    const prev = previousPlans[previousPlans.length - 1] as Record<string, unknown>;
    const prevSummary = prev?.summary as Record<string, unknown>;
    const prevLines = [`\n## Previous Plan Summary: "${prevSummary?.headline || "N/A"}"`];
    // Compact prior-plan structure (week titles + focus skills) so
    // deltaFromPrevious can compare real plans instead of guessing from one
    // headline — the old prompt demanded a specific delta while showing the
    // model essentially nothing about the previous plan.
    const prevWeeks = prev?.weeks as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(prevWeeks) && prevWeeks.length > 0) {
      prevWeeks.slice(0, 6).forEach((w) => {
        const skills = Array.isArray(w.focusSkills) ? (w.focusSkills as string[]).slice(0, 3).join(", ") : "";
        prevLines.push(`- Week ${w.weekNumber}: ${w.title || "untitled"}${skills ? ` (${skills})` : ""}`);
      });
    }
    prevLines.push("Note what changed and why in your deltaFromPrevious field.");
    sections.push(prevLines.join("\n"));
  }

  if (deterministicWeeks.length > 0) {
    // The Do-This-First card is the SIGNAL-AWARE pick (deriveSignalAwareNextAction),
    // which is routinely not week-1's first listed activity — marking activity
    // [0][0] made nextActionReason narrate a different activity than the CTA
    // it's attached to. Mark the actual nextAction; fall back to [0][0] only
    // when no title was provided or nothing matches.
    let firstMarked = false;
    const markFor = (title: unknown) =>
      !firstMarked && nextActionTitle && title === nextActionTitle;
    const planLines: string[] = ["\n## The Plan (already built — narrate THIS, do not redesign it)"];
    deterministicWeeks.forEach((w) => {
      const skills = Array.isArray(w.focusSkills) ? (w.focusSkills as string[]).join(", ") : "";
      planLines.push(`Week ${w.weekNumber}${skills ? ` — focus: ${skills}` : ""}`);
      const acts = Array.isArray(w.activities) ? (w.activities as Array<Record<string, unknown>>) : [];
      acts.forEach((a) => {
        const isMarked = markFor(a.title);
        if (isMarked) firstMarked = true;
        planLines.push(`  - [${a.type}] ${a.title}${a.skillName ? ` (${a.skillName})` : ""}${isMarked ? " <- DO-THIS-FIRST (nextActionReason narrates this)" : ""}`);
      });
    });
    if (!firstMarked) {
      // No match — mark week 1's first activity by rewriting its line.
      const firstActIdx = planLines.findIndex((l) => l.startsWith("  - "));
      if (firstActIdx !== -1) planLines[firstActIdx] += " <- DO-THIS-FIRST (nextActionReason narrates this)";
    }
    sections.push(planLines.join("\n"));
  }

  if (longitudinalContext) {
    const lc = longitudinalContext;
    const totalTests = lc.totalTests as number || 0;
    const scoreTrajectory = lc.scoreTrajectory as Array<Record<string, unknown>> || [];
    const persistentWeaknesses = lc.persistentWeaknesses as Array<Record<string, unknown>> || [];
    const skillHistory = lc.skillHistory as Record<string, unknown> || {};

    sections.push(`\n## Longitudinal Evidence (${totalTests} tests)`);

    if (scoreTrajectory.length >= 2) {
      const trend = scoreTrajectory.map((s) => s.scaledScore).join(" → ");
      const delta = Number(scoreTrajectory[scoreTrajectory.length - 1]?.scaledScore || 0) -
                    Number(scoreTrajectory[0]?.scaledScore || 0);
      sections.push(`Score trajectory: ${trend} (net change: ${delta >= 0 ? "+" : ""}${delta})`);
    }

    if (persistentWeaknesses.length > 0) {
      sections.push(`\nPERSISTENT WEAKNESSES — weak across ${totalTests} tests. These need reteaching, not practice:`);
      persistentWeaknesses.forEach((pw) => {
        const trend = pw.trend === "declining" ? "↓ declining" : pw.trend === "flat" ? "→ flat" : "↑ improving";
        sections.push(`  - ${pw.skillId}: ${pw.accuracy}% avg accuracy across ${pw.testCount} tests (${trend})`);
      });
    }

    // Skills the student drilled back to health since the last test — the
    // narration should credit this work, not re-flag the skill.
    const recovered = lc.recoveredSkills as Array<Record<string, unknown>> || [];
    if (recovered.length > 0) {
      sections.push("\nRECOVERED SINCE LAST TEST (drilled back to health — credit this, don't nag):");
      recovered.forEach((r) => {
        sections.push(`  - ${r.skillId}: was ${r.testAccuracy}% on tests, now ${r.drillAccuracy}% over ${r.drillAttempts} recent drills`);
      });
    }

    // Identify skills that improved since last plan — de-emphasize these
    const improvedSkills: string[] = [];
    const newWeaknesses: string[] = [];
    Object.entries(skillHistory).forEach(([skillId, hist]) => {
      const h = hist as Record<string, unknown>;
      const appearances = (h.appearances as Array<Record<string, unknown>>) || [];
      if (appearances.length >= 2) {
        const first = Number(appearances[0]?.accuracy || 0);
        const last = Number(appearances[appearances.length - 1]?.accuracy || 0);
        if (last - first >= 20) improvedSkills.push(`${skillId} (${first}%→${last}%)`);
        if (first >= 70 && last < 50) newWeaknesses.push(`${skillId} (was ${first}%, now ${last}%)`);
      }
    });

    if (improvedSkills.length > 0) {
      sections.push(`\nImproved since last test — reduce plan weight on these: ${improvedSkills.join(", ")}`);
    }
    if (newWeaknesses.length > 0) {
      sections.push(`\nNew regressions — add to plan immediately: ${newWeaknesses.join(", ")}`);
    }

    sections.push("\nCRITICAL: deltaFromPrevious must explicitly name what changed and why. Example: \"Quadratics moved 30% to 65%, so it's out of your weeks. Statistics is the new week-1 focus (40% this test). Slope-intercept gets retaught from the concept up — it's been weak across all 3 tests.\"");
  }

  sections.push("\nGenerate the JSON narration now.");
  return sections.join("\n");
}

/**
 * Summarize Chat Session — triggered when an AI chat session is updated.
 * Generates summary, keyInsights, and teachingApproachNotes using Haiku 4.5.
 * Also updates the parent learningMemory.recentSessionSummaries.
 */
export const summarizeChatSession = onDocumentUpdated(
  {
    document: "progress/{userId}/aiChatSessions/{sessionId}",
    secrets: [anthropicApiKey],
  },
  async (event) => {
    const before = event.data?.before?.data();
    const after = event.data?.after?.data();

    if (!after) return;

    // Only summarize if: messageCount >= 4, summary is null, and messages actually changed
    if (after.summary !== null) return;
    if ((after.messageCount || 0) < 4) return;
    if (before?.messageCount === after.messageCount) return;

    const userId = event.params.userId;
    const sessionId = event.params.sessionId;

    // Abuse guard: a client can loop update({summary:null, messageCount:n++}) to
    // fire an unbounded number of (paid) Haiku calls, since resetting summary to
    // null re-arms the trigger every time. Enforce a per-session cooldown and a
    // hard lifetime cap so a single session can never cost more than a handful of
    // summarization calls no matter how the client mutates the doc.
    const SUMMARY_COOLDOWN_MS = 10 * 60 * 1000;
    const MAX_SUMMARIES_PER_SESSION = 20;
    const lastSummarizedAt = after.lastSummarizedAt;
    const lastSummarizedMs = typeof lastSummarizedAt?.toMillis === "function" ?
      lastSummarizedAt.toMillis() :
      (typeof lastSummarizedAt === "number" ? lastSummarizedAt : null);
    if (lastSummarizedMs !== null &&
        Date.now() - lastSummarizedMs < SUMMARY_COOLDOWN_MS) {
      logger.info(`Skipping summary for ${sessionId} — cooldown active`);
      return;
    }
    if ((after.summaryCount || 0) >= MAX_SUMMARIES_PER_SESSION) {
      logger.info(`Skipping summary for ${sessionId} — per-session summary cap reached`);
      return;
    }

    // Cross-session per-user ceiling: the per-session guards above bound ONE
    // session, but a client can create unlimited aiChatSessions docs, so a
    // per-session cap alone leaves total (paid Haiku) summarizations unbounded
    // per user. Enforce a per-user hourly cap too. Over the cap → skip: the
    // summary is a best-effort personalization aid, never user-facing, so not
    // generating it is a safe degradation.
    const SUMMARIES_PER_USER_PER_HOUR = 30;
    const underUserCap = await checkRateLimit(
      userId, "summarizeChatSession", SUMMARIES_PER_USER_PER_HOUR,
    );
    if (!underUserCap) {
      logger.info(`Skipping summary for ${sessionId} — per-user hourly cap reached`);
      return;
    }

    logger.info(`Summarizing chat session ${sessionId} for user ${userId}`);

    const apiKey = anthropicApiKey.value();
    if (!apiKey) {
      logger.error("ANTHROPIC_API_KEY not configured for session summarization");
      return;
    }

    // Client-writable doc: a non-array `messages` (or non-string content)
    // must not throw outside the try below.
    const messages = Array.isArray(after.messages) ? after.messages : [];
    const conversationText = messages
      .map((m: {role: string; content: string}) => `${m?.role || "user"}: ${typeof m?.content === "string" ? m.content : ""}`)
      .join("\n")
      .slice(0, 4000); // Limit to ~4000 chars

    const summarizePrompt = `Analyze this SAT tutoring conversation and return JSON (no markdown fences):

{
  "summary": "1-2 sentence summary of what was discussed and learned",
  "keyInsights": ["insight1", "insight2"],
  "teachingApproachNotes": "What teaching approach worked or didn't work for this student",
  "effectiveApproaches": ["approach that worked well"],
  "confusionPoints": ["concept or step the student was confused about"],
  "pendingInterventions": [{"targetSkillIds": ["skillId"], "message": "brief intervention note", "suggestedPrompt": "prompt to offer", "shown": false}]
}

Rules:
- keyInsights: What the student learned or is still confused about (max 3)
- teachingApproachNotes: How the student responds (concrete examples, Socratic, direct, etc.)
- effectiveApproaches: Specific techniques that helped this student understand
- confusionPoints: What they still don't get (be specific — not "math" but "sign errors when distributing negatives")
- pendingInterventions: If the student left confused about something, create an intervention to address it next time (max 1)
- Keep everything concise — this will be compressed into a system prompt

Conversation:
${conversationText}`;

    try {
      const response = await fetch(
        ANTHROPIC_MESSAGES_URL,
        {
          method: "POST",
          headers: anthropicHeaders(apiKey),
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1000,
            messages: [{role: "user", content: summarizePrompt}],
          }),
        }
      );

      if (!response.ok) {
        logger.error("Summarization API error:", await response.text());
        return;
      }

      const data = await response.json();
      const rawContent = data.content[0].text;

      let parsed;
      try {
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch {
        logger.warn("Failed to parse session summary JSON");
        return;
      }

      if (!parsed) return;

      // Update the session document with summary
      const sessionRef = db.collection("progress").doc(userId)
        .collection("aiChatSessions").doc(sessionId);

      await sessionRef.update({
        summary: parsed.summary || null,
        keyInsights: parsed.keyInsights || null,
        teachingApproachNotes: parsed.teachingApproachNotes || null,
        // Stamp the cooldown watermark + lifetime counter that the guards above
        // read, so a re-armed (summary reset to null) session can't loop the LLM.
        lastSummarizedAt: FieldValue.serverTimestamp(),
        summaryCount: FieldValue.increment(1),
      });

      // Update parent learningMemory. Read-modify-write in a transaction so a
      // concurrent summarization for the same user can't clobber the merged
      // arrays (get -> merge -> set is a lost-update race outside a txn). Merge
      // semantics are preserved exactly — the reads and array math just moved
      // inside tx.get/tx.set.
      const progressRef = db.collection("progress").doc(userId);
      await db.runTransaction(async (tx) => {
        const progressDoc = await tx.get(progressRef);
        const currentMemory = progressDoc.exists ?
          (progressDoc.data()?.learningMemory || {}) : {};

        const recentSummaries = currentMemory.recentSessionSummaries || [];
        recentSummaries.unshift({
          sessionId,
          moduleId: after.moduleId,
          summary: parsed.summary,
          keyInsights: parsed.keyInsights,
          lastMessageAt: after.lastMessageAt,
        });

        // Merge effective approaches and confusions
        const effectiveApproaches = [
          ...(currentMemory.effectiveApproaches || []),
          ...(parsed.effectiveApproaches || []),
        ].slice(0, 10);

        const persistentConfusions = [
          ...(parsed.confusionPoints || []),
          ...(currentMemory.persistentConfusions || []),
        ].slice(0, 10);

        // Merge pending interventions
        const existingInterventions = (currentMemory.pendingInterventions || [])
          .filter((i: {shown: boolean}) => !i.shown);
        const newInterventions = parsed.pendingInterventions || [];
        const allInterventions = [...newInterventions, ...existingInterventions]
          .slice(0, 5);

        // Update topic frequency
        const topicFrequency = currentMemory.topicFrequency || {};
        (after.topicsDiscussed || []).forEach((skillId: string) => {
          topicFrequency[skillId] = (topicFrequency[skillId] || 0) + 1;
        });

        tx.set(progressRef, {
          learningMemory: {
            totalSessions: (currentMemory.totalSessions || 0) + 1,
            lastSessionAt: FieldValue.serverTimestamp(),
            recentSessionSummaries: recentSummaries.slice(0, 5),
            effectiveApproaches,
            persistentConfusions,
            pendingInterventions: allInterventions,
            topicFrequency,
          },
        }, {merge: true});
      });

      logger.info(`Successfully summarized session ${sessionId}`);
    } catch (error) {
      logger.error("Session summarization error:", error);
    }
  }
);

/**
 * Scheduled cleanup: purge stale rate limit documents daily.
 * Runs every day at 3:00 AM UTC.
 */
export const cleanupRateLimits = onSchedule("every day 03:00", async () => {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
  // Loop batches: a single 500-doc pass fell behind whenever daily active
  // uid×endpoint churn exceeded 500, growing the backlog forever. Bounded at
  // 10 batches/run (5000 docs) as a runaway guard.
  let totalDeleted = 0;
  for (let i = 0; i < 10; i++) {
    const snapshot = await db.collection("_rateLimits")
      .where("updatedAt", "<", cutoff)
      .limit(500)
      .get();
    if (snapshot.empty) break;
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    totalDeleted += snapshot.size;
    if (snapshot.size < 500) break;
  }
  logger.info(`[cleanupRateLimits] Deleted ${totalDeleted} stale rate limit docs`);
});

// ─── Re-engagement nudges (Phase 3) ──────────────────────────────────────────
//
// A daily scheduled job that pulls lapsed / at-risk students back via web push.
// It only contacts students who opted in (the browser permission prompt is the
// consent), so the candidate set is bounded by opt-in count and we can read each
// one's progress doc directly instead of scanning the whole collection. Sends
// DATA-ONLY messages (the service worker renders them) deep-linked to the daily-
// review loop, dedupes on lastReengagementAt, prunes dead FCM tokens, and logs
// every send to reEngagementLog for client-side open-rate attribution.

const REENGAGE_DEDUP_HOURS = 20;
// Canonical production origin is www.sevaprep.com (apex 308-redirects to www —
// see ALLOWED_ORIGINS in shared.ts). Deep-link re-engagement pushes there, not
// the raw Vercel origin.
const REENGAGE_LINK = "https://www.sevaprep.com/course?next=review";

/**
 * Process one opted-in user: dedup, read engagement signals, classify, send,
 * prune dead tokens, log. Returns true if at least one push was delivered.
 */
async function processReengagementUser(
  userDoc: QueryDocumentSnapshot,
  now: number,
  messaging: Messaging,
): Promise<boolean> {
  const user = userDoc.data() || {};
  const uid = userDoc.id;

  const tokens: string[] = Array.isArray(user.fcmTokens) ?
    user.fcmTokens.filter((t: unknown): t is string => typeof t === "string") : [];
  if (!tokens.length) return false;

  // Dedup: don't nudge again within the window (guards retries / double-runs).
  const lastReengage = toMillis(user.lastReengagementAt);
  if (lastReengage != null && (now - lastReengage) < REENGAGE_DEDUP_HOURS * 60 * 60 * 1000) {
    return false;
  }

  const progSnap = await db.collection("progress").doc(uid).get();
  const prog = progSnap.exists ? (progSnap.data() || {}) : {};
  const dueReviewCount = countDueReviews(prog.reviewQueue, now);
  const reviewStreak = prog.reviewStreak || null;
  const lastEventMs = toMillis(prog.lastEventAt);
  const lastLoginMs = toMillis(user.lastLoginAt);
  const lastActiveMs = Math.max(lastEventMs || 0, lastLoginMs || 0) || null;

  const reason = classifyNudge({now, reviewStreak, dueReviewCount, lastActiveMs});
  if (!reason) return false;

  const content = buildNudgeContent(reason, {
    firstName: typeof user.firstName === "string" ? user.firstName : undefined,
    streakCurrent: (reviewStreak && reviewStreak.current) || 0,
    dueReviewCount,
    daysToTest: daysUntilTest(user.testDate, now),
  });

  const resp = await messaging.sendEachForMulticast({
    tokens,
    data: {
      title: content.title,
      body: content.body,
      url: REENGAGE_LINK,
      reason,
      tag: "seva-reengagement",
    },
    webpush: {fcmOptions: {link: REENGAGE_LINK}},
  });

  // Prune tokens FCM reports as permanently invalid.
  const dead: string[] = [];
  resp.responses.forEach((r, i) => {
    if (!r.success) {
      const code = (r.error && r.error.code) || "";
      if (
        code === "messaging/registration-token-not-registered" ||
        code === "messaging/invalid-registration-token" ||
        code === "messaging/invalid-argument"
      ) {
        dead.push(tokens[i]);
      }
    }
  });

  const update: Record<string, unknown> = {
    lastReengagementAt: FieldValue.serverTimestamp(),
  };
  if (dead.length) {
    update.fcmTokens = FieldValue.arrayRemove(...dead);
  }
  await userDoc.ref.set(update, {merge: true});

  await db.collection("reEngagementLog").add({
    userId: uid,
    reason,
    dueReviewCount,
    tokenCount: tokens.length,
    successCount: resp.successCount,
    deadCount: dead.length,
    sentAt: FieldValue.serverTimestamp(),
  });

  return resp.successCount > 0;
}

/**
 * Scheduled re-engagement nudges. Runs daily at 23:00 UTC (revisit per-timezone
 * delivery later). Only contacts students who opted in to push.
 */
export const sendReEngagementNudges = onSchedule("every day 23:00", async () => {
  const now = Date.now();
  const messaging = getMessaging();

  const snap = await db.collection("users")
    .where("notificationPrefs.reengagementOptIn", "==", true)
    .limit(500)
    .get();

  if (snap.empty) {
    logger.info("[sendReEngagementNudges] no opted-in users");
    return;
  }
  if (snap.size === 500) {
    logger.warn("[sendReEngagementNudges] hit 500-user cap — add pagination as opt-in grows");
  }

  let sent = 0;
  for (const userDoc of snap.docs) {
    try {
      if (await processReengagementUser(userDoc, now, messaging)) sent += 1;
    } catch (err) {
      logger.error(`[sendReEngagementNudges] user ${userDoc.id} failed:`, err);
    }
  }
  logger.info(`[sendReEngagementNudges] opted-in=${snap.size} nudged=${sent}`);
});

/**
 * Account deletion — permanently removes all Firestore data tied to the
 * caller's uid, then deletes the Auth user record. Order matters: Firestore
 * first so a failed Auth delete can be retried while still authenticated.
 */
export const deleteAccount = onRequest(
  // secrets: deletion now cancels the Stripe subscription first, so this
  // function needs the Stripe key bound to it.
  {
    cors: ALLOWED_ORIGINS,
    timeoutSeconds: 300,
    memory: "512MiB",
    secrets: [stripeSecretKey],
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }
    const user = await verifyAuth(request);
    if (!user) {
      response.status(401).json({error: "Authentication required"});
      return;
    }
    if (!(await verifyAppCheck(request, "deleteAccount"))) {
      response.status(401).json({error: "App attestation failed"});
      return;
    }
    // Explicit confirmation guard — client must send {confirm: "DELETE"}
    if (request.body?.confirm !== "DELETE") {
      response.status(400).json({error: "Missing confirmation"});
      return;
    }
    const uid = user.uid;
    try {
      // 0. STRIPE FIRST — cancel any live subscription before a byte of data
      //    is removed. Deleting the account while the subscription runs bills
      //    a customer who no longer has an account, and strands them: the
      //    Customer Portal needs entitlements/{uid}.stripeCustomerId plus a
      //    live Auth login, both of which the steps below destroy. Doing this
      //    first also means a Stripe failure aborts the whole deletion with
      //    nothing removed yet, so the retry below is clean.
      const canceledSubs = await cancelSubscriptionsForUid(uid, user.email);
      // 1. progress/{uid} + ALL subcollections (studyPlanArtifacts, attempts,
      //    aiDiagnostics, aiChatSessions, and any added later)
      await db.recursiveDelete(db.collection("progress").doc(uid));
      // 2. users/{uid} (flat today; recursiveDelete is future-proof)
      await db.recursiveDelete(db.collection("users").doc(uid));
      // 2b. entitlements/{uid} — billing state is user data. The Stripe
      // customer object itself is retained in Stripe (financial records);
      // deleting the app-side doc severs the app linkage.
      await db.recursiveDelete(db.collection("entitlements").doc(uid));
      // 3. _rateLimits docs keyed `${uid}_${endpoint}` — prefix range on doc ID
      const rlSnap = await db.collection(RATE_LIMIT_COLLECTION)
        .where(FieldPath.documentId(), ">=", `${uid}_`)
        .where(FieldPath.documentId(), "<=", `${uid}_\uf8ff`)
        .get();
      if (!rlSnap.empty) {
        const batch = db.batch();
        rlSnap.docs.forEach((d) => batch.delete(d.ref));
        await batch.commit();
      }
      // 4. reEngagementLog rows for this user (paged; collection is small)
      let logSnap = await db.collection("reEngagementLog")
        .where("userId", "==", uid).limit(450).get();
      while (!logSnap.empty) {
        const batch = db.batch();
        logSnap.docs.forEach((d) => batch.delete(d.ref));
        await batch.commit();
        logSnap = await db.collection("reEngagementLog")
          .where("userId", "==", uid).limit(450).get();
      }
      // 5. Auth record LAST
      await getAuth().deleteUser(uid);
      logger.info(
        `[deleteAccount] deleted all data for ${uid}` +
        (canceledSubs.length ?
          ` (canceled ${canceledSubs.length} subscription(s): ` +
          `${canceledSubs.join(", ")})` :
          " (no live subscription)"),
      );
      response.json({ok: true});
    } catch (error) {
      logger.error(`[deleteAccount] failed for ${uid}:`, error);
      response.status(500).json({error: "Account deletion failed. Try again."});
    }
  }
);
