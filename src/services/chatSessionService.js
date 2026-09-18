/**
 * Chat Session Service
 * Manages persistent AI chat sessions in Firestore with sessionStorage write-through cache.
 * Firestore path: progress/{userId}/aiChatSessions/{sessionId}
 */

import { db } from '../firebase/config';
import {
  doc, collection, addDoc, getDoc, getDocs, updateDoc,
  query, where, orderBy, limit as firestoreLimit, serverTimestamp
} from 'firebase/firestore';

// Debounce tracking
const pendingWrites = new Map();
const DEBOUNCE_INTERVAL_MS = 30000; // 30 seconds
const DEBOUNCE_MESSAGE_COUNT = 3;

// sessionId -> { moduleId, lessonId } so the debounced / forced / flush writers
// (which only receive userId + sessionId) can refresh the module/lesson-keyed
// sessionStorage cache. Populated at saveSession + loadActiveSession time.
const sessionCacheMeta = new Map();

const cacheKeyFor = (userId, moduleId, lessonId) =>
  `aiChatSession_${userId}_${moduleId}_${lessonId}`;

// sessionStorage prefixes that hold user-scoped chat state. Kept here (next to
// the writers) so the logout cleanup has a single source of truth.
const CHAT_CACHE_PREFIXES = ['aiChatSession_', 'aiTutorChat_'];

/**
 * Clear every user-scoped chat cache from sessionStorage. Called on sign-out so
 * the next account on the same tab can't read the previous student's tutor chat
 * (the AiTutorChat fallback + this service's write-through cache both persist
 * conversations in sessionStorage). No-op when sessionStorage is unavailable.
 */
export const clearChatSessionStorage = () => {
  try {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && CHAT_CACHE_PREFIXES.some((p) => k.startsWith(p))) keys.push(k);
    }
    keys.forEach((k) => sessionStorage.removeItem(k));
  } catch (e) {
    // Storage unavailable — non-critical.
  }
};

const registerSessionCacheMeta = (userId, sessionId, moduleId, lessonId) => {
  if (!userId || !sessionId) return;
  sessionCacheMeta.set(`${userId}_${sessionId}`, { moduleId, lessonId });
};

const normalizeMessages = (messages) =>
  (messages || []).map(m => ({
    role: m.role,
    content: m.content,
    timestamp: m.timestamp || new Date().toISOString(),
  }));

/**
 * Refresh the module/lesson-keyed sessionStorage cache to the messages just
 * persisted. The cache was previously written ONLY at session creation and
 * never updated by the debounced writer, so returning to a chat replayed a
 * stale 1-message snapshot and the next write truncated Firestore's messages
 * array. Every write path now calls this so the cache tracks what Firestore
 * holds. No-op when the session's module/lesson mapping is unknown (nothing to
 * key the cache on) or sessionStorage is unavailable.
 */
const refreshSessionCache = (userId, sessionId, messages) => {
  try {
    const meta = sessionCacheMeta.get(`${userId}_${sessionId}`);
    if (!meta) return;
    const normalized = normalizeMessages(messages);
    sessionStorage.setItem(cacheKeyFor(userId, meta.moduleId, meta.lessonId), JSON.stringify({
      sessionId,
      moduleId: meta.moduleId,
      lessonId: meta.lessonId,
      messages: normalized,
      messageCount: normalized.length,
    }));
  } catch (e) {
    // Storage full / unavailable — non-critical.
  }
};

/**
 * Save a new chat session to Firestore
 */
export const saveSession = async (userId, sessionData) => {
  if (!userId) throw new Error('userId required');

  const sessionsRef = collection(db, 'progress', userId, 'aiChatSessions');
  const docRef = await addDoc(sessionsRef, {
    moduleId: sessionData.moduleId || null,
    lessonId: sessionData.lessonId || null,
    lessonTitle: sessionData.lessonTitle || null,
    context: sessionData.context || 'lesson',
    messages: sessionData.messages || [],
    messageCount: sessionData.messages?.length || 0,
    startedAt: serverTimestamp(),
    lastMessageAt: serverTimestamp(),
    topicsDiscussed: sessionData.topicsDiscussed || [],
    summary: null,
    keyInsights: null,
    teachingApproachNotes: null,
  });

  // Update sessionStorage cache
  registerSessionCacheMeta(userId, docRef.id, sessionData.moduleId, sessionData.lessonId);
  try {
    const cacheKey = cacheKeyFor(userId, sessionData.moduleId, sessionData.lessonId);
    sessionStorage.setItem(cacheKey, JSON.stringify({
      sessionId: docRef.id,
      ...sessionData,
      messageCount: sessionData.messages?.length || 0,
    }));
  } catch (e) {
    // Storage full — non-critical
  }

  return docRef.id;
};

/**
 * Update session messages with debouncing.
 * Writes immediately if messageCount threshold hit, otherwise debounces by time.
 */
export const updateSessionMessages = async (userId, sessionId, messages, force = false) => {
  if (!userId || !sessionId) return;

  // Never force-write an empty transcript over an existing session. The forced
  // path is used by unmount / tab-hide flushes; a conversation switch resets the
  // component's messages to [] right before the outgoing session's flush fires,
  // and persisting that would wipe the session's messages array. A legitimate
  // session always has at least one message by the time it's flushed.
  if (force && (!Array.isArray(messages) || messages.length === 0)) {
    console.warn('[chatSessionService] Ignoring forced empty-message write for', sessionId);
    return;
  }

  const key = `${userId}_${sessionId}`;
  const pending = pendingWrites.get(key);
  const messageCount = messages.length;

  // Check if we should write now
  const shouldWriteNow = force ||
    (pending && messageCount - pending.lastWrittenCount >= DEBOUNCE_MESSAGE_COUNT);

  if (shouldWriteNow) {
    // Clear any pending timer
    if (pending?.timer) clearTimeout(pending.timer);
    pendingWrites.delete(key);

    const sessionRef = doc(db, 'progress', userId, 'aiChatSessions', sessionId);
    await updateDoc(sessionRef, {
      messages: normalizeMessages(messages),
      messageCount,
      lastMessageAt: serverTimestamp(),
    });

    // Keep the sessionStorage cache in step with what we just wrote so a later
    // loadActiveSession returns the FULL conversation, not a creation-time stub.
    refreshSessionCache(userId, sessionId, messages);

    pendingWrites.set(key, { lastWrittenCount: messageCount });
    return;
  }

  // Set up debounced write
  if (pending?.timer) clearTimeout(pending.timer);

  const timer = setTimeout(async () => {
    try {
      const sessionRef = doc(db, 'progress', userId, 'aiChatSessions', sessionId);
      await updateDoc(sessionRef, {
        messages: normalizeMessages(messages),
        messageCount: messages.length,
        lastMessageAt: serverTimestamp(),
      });
      refreshSessionCache(userId, sessionId, messages);
      pendingWrites.set(key, { lastWrittenCount: messages.length });
    } catch (e) {
      console.error('Debounced session write failed:', e);
    }
  }, DEBOUNCE_INTERVAL_MS);

  pendingWrites.set(key, {
    timer,
    lastWrittenCount: pending?.lastWrittenCount || 0,
    // Carry the write args so flushPendingWrites can perform the pending
    // write itself (e.g. on tab close) instead of just cancelling it.
    userId,
    sessionId,
    messages,
  });
};

/**
 * Load the active session for a module/lesson, or the most recent sessions.
 */
export const loadActiveSession = async (userId, moduleId, lessonId) => {
  if (!userId) return null;

  const cacheKey = cacheKeyFor(userId, moduleId, lessonId);

  // Read the cache, but DON'T trust it blindly. A cache that was written at
  // creation and never refreshed replays an old 1-message snapshot, and the
  // next write would then truncate Firestore's messages array. We compare
  // messageCounts below and prefer whichever source holds MORE messages.
  let cached = null;
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.sessionId && parsed.messages?.length > 0) cached = parsed;
    }
  } catch (e) {
    // Ignore cache errors
  }
  const cacheCount = cached ? (cached.messageCount ?? cached.messages?.length ?? 0) : 0;

  // Query Firestore
  try {
    const sessionsRef = collection(db, 'progress', userId, 'aiChatSessions');
    const q = query(
      sessionsRef,
      where('moduleId', '==', moduleId),
      where('lessonId', '==', lessonId),
      orderBy('lastMessageAt', 'desc'),
      firestoreLimit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      // No server session yet — the cache (if any) is all we have.
      if (cached) registerSessionCacheMeta(userId, cached.sessionId, moduleId, lessonId);
      return cached;
    }

    const sessionDoc = snapshot.docs[0];
    const data = sessionDoc.data();
    const serverCount = data.messageCount ?? data.messages?.length ?? 0;

    registerSessionCacheMeta(userId, sessionDoc.id, moduleId, lessonId);

    // Belt-and-suspenders: only honor the cache when it's for the SAME session
    // and is at least as fresh as the server (>= server count). Otherwise the
    // server wins — a stale/short cache can never truncate the conversation.
    if (cached && cached.sessionId === sessionDoc.id && cacheCount >= serverCount) {
      return cached;
    }

    // Server wins — refresh the cache to the server snapshot.
    const result = { sessionId: sessionDoc.id, ...data };
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (e) {
      // Non-critical
    }
    return result;
  } catch (e) {
    console.error('Failed to load session from Firestore:', e);
    // Offline / query failed — fall back to the cache we already have.
    if (cached) registerSessionCacheMeta(userId, cached.sessionId, moduleId, lessonId);
    return cached;
  }
};

/**
 * Load recent sessions for a user (for learning memory context)
 */
export const loadRecentSessions = async (userId, count = 5) => {
  if (!userId) return [];

  try {
    const sessionsRef = collection(db, 'progress', userId, 'aiChatSessions');
    const q = query(
      sessionsRef,
      orderBy('lastMessageAt', 'desc'),
      firestoreLimit(count)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ sessionId: d.id, ...d.data() }));
  } catch (e) {
    console.error('Failed to load recent sessions:', e);
    return [];
  }
};

/**
 * Get the learningMemory field from the progress document
 */
export const getLearningMemory = async (userId) => {
  if (!userId) return null;

  try {
    const progressRef = doc(db, 'progress', userId);
    const progressDoc = await getDoc(progressRef);

    if (!progressDoc.exists()) return null;

    return progressDoc.data()?.learningMemory || null;
  } catch (e) {
    console.error('Failed to load learning memory:', e);
    return null;
  }
};

/**
 * Update the learningMemory field on the progress document
 */
export const updateLearningMemory = async (userId, learningMemory) => {
  if (!userId) return;

  try {
    const progressRef = doc(db, 'progress', userId);
    await updateDoc(progressRef, { learningMemory });
  } catch (e) {
    console.error('Failed to update learning memory:', e);
  }
};

/**
 * Flush any pending debounced writes (call on unmount / tab hide).
 * Performs the pending write immediately instead of dropping it — otherwise a
 * tab close inside the debounce window silently loses the last exchanges.
 */
export const flushPendingWrites = async (userId, sessionId) => {
  const key = `${userId}_${sessionId}`;
  const pending = pendingWrites.get(key);
  if (!pending?.timer) return;
  clearTimeout(pending.timer);
  pendingWrites.delete(key);
  if (!pending.userId || !pending.sessionId || !Array.isArray(pending.messages)) return;
  try {
    const sessionRef = doc(db, 'progress', pending.userId, 'aiChatSessions', pending.sessionId);
    await updateDoc(sessionRef, {
      messages: normalizeMessages(pending.messages),
      messageCount: pending.messages.length,
      lastMessageAt: serverTimestamp(),
    });
    refreshSessionCache(pending.userId, pending.sessionId, pending.messages);
    pendingWrites.set(key, { lastWrittenCount: pending.messages.length });
  } catch (e) {
    console.error('Flush of pending session write failed:', e);
  }
};

const chatSessionService = {
  saveSession,
  updateSessionMessages,
  loadActiveSession,
  loadRecentSessions,
  getLearningMemory,
  updateLearningMemory,
  flushPendingWrites,
  clearChatSessionStorage,
};

export default chatSessionService;
