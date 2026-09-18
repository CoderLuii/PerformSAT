import React, { useState, useRef, useEffect } from 'react';
import { chatWithTutor, checkTutorMath, prewarmTutor } from '../services/aiTutorService';
import CoachModePicker from './CoachModePicker';
import { trackCoachModeUsed, trackEvent } from '../services/analyticsService';
import ProactiveHint from './ProactiveHint';
import {
  generateProactiveRecommendation,
  shouldOfferProactiveHint,
  generateSmartPrompts,
  buildSkillContextForAI,
  generateCrossSessionRecommendation
} from '../services/proactiveRecommendationService';
import { getSkillById } from '../data/skillTaxonomy';
import { getDesmosTip } from '../services/selectors/desmosTip';
import { colors as designColors, typography as designTypo, shadows as designShadows } from '../design/tokens';
import renderMarkdown from '../utils/renderChatMarkdown';
import {
  saveSession,
  updateSessionMessages,
  loadActiveSession,
  getLearningMemory,
  loadRecentSessions,
  flushPendingWrites
} from '../services/chatSessionService';
import { buildTrendContext } from '../services/trendContextBuilder';
import { startIntervention, inferApproach, computeApproachEffectiveness } from '../services/interventionTracker';
import { buildIntelligenceContext, getRecommendedApproach } from '../services/intelligenceContextBuilder';
import { buildTutorSkillContext } from '../services/selectors/tutorSkillContext';
import { buildTutorKnowledgeContext, buildTutorPlaybookContext } from '../services/selectors/tutorKnowledgeContext';
import { extractChoiceMisconceptions } from '../services/selectors/choiceMisconceptions';
import { buildFollowUpPrompts, buildTrapWelcome } from '../services/selectors/tutorEngagement';
import { noteTutorExchange, makeQuestionKey } from '../services/tutorExchangeTracker';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import Mark from './ui/Mark';

// The tutor's identity mark, app-wide: the tri-color SEVA "S" on the brand-navy
// tile (matches the favicon / collapsed-sidebar mark) — never a generic chat
// bubble. One source of truth for every tutor avatar/header in this file.
const TutorMark = ({ size = 32, radius = 8, style }) => (
  <span
    aria-hidden="true"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${radius}px`,
      background: '#0B132B', // --color-brand-navy
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}
  >
    <Mark size={Math.round(size * 0.6)} decorative />
  </span>
);

// Design system — sourced from shared tokens
const design = {
  colors: {
    text: {
      primary: designColors.text.primary,
      secondary: designColors.text.secondary,
      tertiary: designColors.text.tertiary,
    },
    accent: {
      primary: designColors.semantic.info,
      orange: designColors.accent.orange,
    },
    surface: {
      primary: designColors.surface.white,
      secondary: designColors.surface.gray,
      tertiary: designColors.surface.offWhite,
    },
    border: {
      light: designColors.surface.grayDark,
      medium: designColors.surface.grayMedium,
    }
  },
  typography: {
    fontFamily: designTypo.fontFamily,
  },
  shadow: {
    small: designShadows.sm,
    medium: designShadows.md,
    large: designShadows.lg,
  }
};

// Concept-level suggestion chip for practice questions. A suggestion chip is
// normally a plain string (its own label AND the message it sends); this pair lets
// a short button label send a richer directive that makes the tutor teach the
// underlying concept — name it, explain it generally, then tie it to this question.
// Works for both math and R&W via the existing section-selected system prompt.
const CONCEPT_CHIP = {
  label: 'Teach me this concept',
  prompt: "Teach me the concept this question is testing. First name the concept, then explain the general idea in plain language, and finally connect it back to this specific question.",
};

// Per-assistant-message action row: Copy (paste worked solutions to notes),
// Regenerate (re-ask, last message only), and 👍/👎 feedback. Encapsulates its
// own transient state so the parent message list stays stateless.
const ACTION_ICON = {
  base: {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '3px 8px', borderRadius: '8px', border: 'none',
    background: 'transparent', fontSize: '12px', fontWeight: 600,
    cursor: 'pointer', transition: 'color 0.15s ease', color: '#9ca3af',
  },
};
const MessageActions = ({ text, onRegenerate, onFeedback }) => {
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState(null);
  const doVote = (v) => { setVote(v); onFeedback?.(v); };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '8px', flexWrap: 'wrap' }}>
      <button
        type="button"
        aria-label="Copy this answer"
        onClick={() => {
          try {
            navigator.clipboard?.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch { /* clipboard unavailable */ }
        }}
        style={{ ...ACTION_ICON.base, color: copied ? '#16a34a' : '#9ca3af' }}
      >
        {copied
          ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>}
        {copied ? 'Copied' : 'Copy'}
      </button>
      {onRegenerate && (
        <button type="button" aria-label="Regenerate this answer" onClick={onRegenerate} style={ACTION_ICON.base}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>
          Retry
        </button>
      )}
      <button type="button" aria-label="This answer helped" onClick={() => doVote('up')} style={{ ...ACTION_ICON.base, color: vote === 'up' ? '#16a34a' : '#9ca3af', padding: '3px 6px' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={vote === 'up' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
      </button>
      <button type="button" aria-label="This answer did not help" onClick={() => doVote('down')} style={{ ...ACTION_ICON.base, color: vote === 'down' ? '#dc2626' : '#9ca3af', padding: '3px 6px' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={vote === 'down' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></svg>
      </button>
    </div>
  );
};

// One chat bubble, memoized so only the streaming (last) message re-renders per
// chunk instead of the entire transcript. Comparison is keyed on the message
// content + the display flags that actually change what renders; the handler
// props are refreshed at every load/stream state transition (isLoading /
// isStreaming are in the comparator), which is the only moment a non-last bubble
// needs current handlers. renderMarkdown itself is separately LRU-cached, so
// even a forced re-render here is cheap.
const messageBubblePropsEqual = (prev, next) => (
  prev.msg.role === next.msg.role &&
  prev.msg.content === next.msg.content &&
  prev.msg.isError === next.msg.isError &&
  prev.msg.retryText === next.msg.retryText &&
  prev.msg.correction === next.msg.correction &&
  prev.isLast === next.isLast &&
  prev.premiumLearnMode === next.premiumLearnMode &&
  prev.isLoading === next.isLoading &&
  prev.isStreaming === next.isStreaming
);

const MessageBubble = React.memo(({ msg, isLast, premiumLearnMode, isLoading, isStreaming, onRetry, onRegenerate, onFeedback }) => (
  <div
    style={{
      marginBottom: '16px',
      display: 'flex',
      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
    }}
  >
    {premiumLearnMode && msg.role === 'assistant' && (
      <TutorMark size={28} style={{ marginRight: '12px' }} />
    )}
    <div
      style={premiumLearnMode ? {
        maxWidth: msg.role === 'user' ? '80%' : '85%',
        padding: msg.role === 'user' ? '12px 18px' : '16px 20px',
        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        background: msg.role === 'user'
          ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
          : '#ffffff',
        color: msg.role === 'user' ? 'white' : design.colors.text.primary,
        fontSize: '15px',
        lineHeight: '1.55',
        boxShadow: msg.role === 'user'
          ? '0 4px 12px rgba(234, 88, 12, 0.2)'
          : '0 2px 12px rgba(0, 0, 0, 0.03)',
        border: msg.role === 'user' ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
        letterSpacing: '0',
        whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
      } : {
        maxWidth: '88%',
        padding: msg.role === 'user' ? '12px 18px' : '16px 20px',
        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: msg.role === 'user'
          ? design.colors.accent.orange
          : design.colors.surface.primary,
        color: msg.role === 'user' ? 'white' : design.colors.text.primary,
        fontSize: '15px',
        lineHeight: '1.55',
        boxShadow: msg.role === 'user'
          ? 'none'
          : design.shadow.small,
        letterSpacing: '0',
        whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
      }}
    >
      {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
      {msg.role === 'assistant' && msg.correction && (
        <div
          role="note"
          style={{
            marginTop: '10px',
            padding: '8px 12px',
            borderLeft: `3px solid ${design.colors.accent.orange}`,
            background: 'rgba(234, 88, 12, 0.06)',
            borderRadius: '8px',
            fontSize: '13px',
            lineHeight: '1.5',
            color: design.colors.text.primary,
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: design.colors.accent.orange,
              marginBottom: '3px',
            }}
          >
            Correction
          </span>
          {renderMarkdown(msg.correction)}
        </div>
      )}
      {msg.isError && msg.retryText && (
        <button
          type="button"
          onClick={() => onRetry(msg.retryText)}
          aria-label="Retry sending your message"
          style={{
            marginTop: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '14px',
            cursor: 'pointer',
            background: 'transparent',
            border: `1px solid ${design.colors.semantic?.error || '#dc2626'}`,
            color: design.colors.semantic?.error || '#dc2626',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: design.typography.fontFamily,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Retry
        </button>
      )}
      {msg.role === 'assistant' && !msg.isError && msg.content && !((isLoading || isStreaming) && isLast) && (
        <MessageActions
          text={msg.content}
          onRegenerate={isLast && !isLoading && !isStreaming ? onRegenerate : undefined}
          onFeedback={onFeedback}
        />
      )}
    </div>
  </div>
), messageBubblePropsEqual);

const AiTutorChat = ({
  isOpen,
  onClose,
  moduleId,
  lessonId,
  lessonTitle,
  isVideoLesson,
  videoTranscript,
  videoTimestamp,
  isPracticeQuestion = false,
  practiceContext = null,
  skillProgress = null,
  testDate = null,
  user = null,
  practiceTestResults = null,
  standalone = false,
  embedded = false,
  headerCompact = false,
  premiumLearnMode = true,
  studentFingerprint = null,
  interventionLog = null,
  predictionLog = null,
  // When true, suppresses cross-section proactive recommendations.
  // In retry-drill review mode the snapshot items are mixed-section
  // (e.g., reviewing an R&W item with Math skill drift advice → mismatch).
  // See TODOS.md "Section context inside retry-drill review-mode" (P2).
  reviewMode = false,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // Expand the tutor to a full-screen overlay — primarily a mobile escape from
  // the cramped 50vh strip, but available everywhere. Additive (a fixed overlay
  // on the existing chat), so it doesn't restructure the shell's layout grid.
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // True for the WHOLE send round-trip. isLoading is cleared on the first
  // streamed token (so the typing dots hand off to the streaming bubble), which
  // means it cannot gate re-entry — a second send mid-stream would run two
  // concurrent streams both writing to "the last assistant message". Every
  // send entry point checks isLoading || isStreaming.
  const [isStreaming, setIsStreaming] = useState(false);
  // Active coach mode (null = default tutor). Activates a structured system
  // overlay in chatWithTutor — the modes existed but were never wired.
  const [coachMode, setCoachMode] = useState(null);
  const [lastSendTime, setLastSendTime] = useState(0);
  const [proactiveRec, setProactiveRec] = useState(null);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [learningMemory, setLearningMemory] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageCountSinceWrite = useRef(0);
  const messagesRef = useRef(messages);
  const interventionStarted = useRef(false);
  // Smart scroll: only auto-follow new/streamed content when the student is
  // already near the bottom — otherwise a re-reading student gets yanked down on
  // every streamed token. nearBottomRef drives the auto-scroll; showJumpPill
  // surfaces a "jump to latest" affordance when they've scrolled up.
  const nearBottomRef = useRef(true);
  const [showJumpPill, setShowJumpPill] = useState(false);
  // Set true when messages were restored from the sessionStorage fallback
  // (Firestore load failed/empty). While true we do NOT auto-create a Firestore
  // session doc — otherwise every reload of a fallback-restored chat would
  // addDoc a brand-new duplicate session. Cleared as soon as the student sends
  // a new message, at which point the (restored + new) history is persisted once.
  const restoredFromFallbackRef = useRef(false);
  // Transient inline notice under the composer when a send is swallowed (rate
  // limit / mid-stream), so a rate-limited Retry / proactive-accept isn't a
  // silent no-op.
  const [sendNotice, setSendNotice] = useState('');
  const sendNoticeTimerRef = useRef(null);
  const flashSendNotice = (msg) => {
    setSendNotice(msg);
    if (sendNoticeTimerRef.current) clearTimeout(sendNoticeTimerRef.current);
    sendNoticeTimerRef.current = setTimeout(() => setSendNotice(''), 2600);
  };
  // True when a send would currently be blocked (mid-flight or inside the rate
  // window). Lets the proactive-accept / Retry paths give feedback synchronously
  // instead of firing a no-op.
  const sendIsBlocked = () => isLoading || isStreaming || (Date.now() - lastSendTime < RATE_LIMIT_MS);
  // The persist effect fires on every streamed-chunk render; saveSession is an
  // unconditional addDoc. This guard keeps a new conversation from creating a
  // duplicate session doc per chunk while the first create is still in flight.
  const sessionCreateInFlightRef = useRef(false);
  // Aborts the in-flight tutor request when the conversation changes or the
  // component unmounts — otherwise the fetch keeps running (burning rate limit)
  // and its callbacks fire against a dead conversation.
  const abortRef = useRef(null);
  // Fire tutor_opened once per open (reset when closed) — engagement telemetry.
  const openTrackedRef = useRef(false);
  // Stale-guards for the async math guardrail (checkTutorMath): a correction can
  // resolve seconds after the reply, by which point the chat may have closed or
  // the component unmounted. Read these before attaching so a late correction is
  // dropped silently instead of writing to a dead / hidden conversation.
  const mountedRef = useRef(true);
  const isOpenRef = useRef(isOpen);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);
  useEffect(() => () => { mountedRef.current = false; }, []);
  const handleMessagesScroll = (e) => {
    const el = e.currentTarget;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    nearBottomRef.current = near;
    setShowJumpPill(!near);
  };

  // Rate limiting: minimum 2 seconds between sends
  const RATE_LIMIT_MS = 2000;

  // Build student profile snapshot for AI personalization
  const buildStudentProfile = () => {
    const parts = [];
    const profileSection = practiceContext?.section === 'rw' ? 'rw' : 'math';

    parts.push('═══════════════════════════════════');
    parts.push('STUDENT PROFILE — PERSONALIZE YOUR RESPONSES USING THIS');
    parts.push('═══════════════════════════════════');

    // Basic info
    if (user?.firstName) {
      parts.push(`Name: ${user.firstName}`);
    }

    // Score context
    const scores = [];
    // A composite score (> 800) is the whole SAT; only a section-scale score is "Math".
    if (user?.currentScore) scores.push(`${(user.currentScore > 800 || profileSection === 'rw') ? 'Current SAT score' : 'Current SAT Math score'}: ${user.currentScore}`);
    if (user?.targetScore) scores.push(`Target score: ${user.targetScore}`);
    if (user?.currentScore && user?.targetScore) {
      // Only state a gap when goal and current score are on the same scale
      // (both composite > 800, or both section <= 800) — never cross-scale.
      const sameScale = (user.targetScore > 800) === (user.currentScore > 800);
      const gap = user.targetScore - user.currentScore;
      if (sameScale && gap > 0) {
        scores.push(`Needs to gain: ${gap} points`);
      } else if (sameScale) {
        scores.push(`Already at or above target`);
      }
    }
    if (scores.length > 0) parts.push(scores.join(' | '));

    // Test date urgency
    if (testDate || user?.testDate) {
      const dateStr = testDate || user.testDate;
      const today = new Date();
      const test = new Date(dateStr);
      const daysUntil = Math.ceil((test - today) / (1000 * 60 * 60 * 24));
      if (daysUntil > 0 && daysUntil <= 7) {
        parts.push(`TEST IN ${daysUntil} DAY${daysUntil === 1 ? '' : 'S'} — Focus on confidence-building and quick wins. No time for new concepts; reinforce what they know and drill weak spots.`);
      } else if (daysUntil > 7 && daysUntil <= 30) {
        parts.push(`Test in ${daysUntil} days — Time for targeted improvement. Focus practice on weak areas with highest point-gain potential.`);
      } else if (daysUntil > 30) {
        parts.push(`Test in ${daysUntil} days — Plenty of time. Can work on building deep understanding and mastering all question types.`);
      }
    }

    // Overall skill mastery
    if (skillProgress && Object.keys(skillProgress).length > 0) {
      const entries = Object.entries(skillProgress);
      const attempted = entries.filter(([_, d]) => d.attempts >= 1);

      if (attempted.length > 0) {
        // Overall mastery
        let totalWeighted = 0, totalWeight = 0;
        attempted.forEach(([_, d]) => {
          totalWeighted += d.mastery * d.attempts;
          totalWeight += d.attempts;
        });
        const overallMastery = Math.round(totalWeighted / totalWeight);
        parts.push(`Overall mastery: ${overallMastery}% across ${attempted.length} skills practiced`);

        // Weak skills (mastery < 60%, at least 3 attempts)
        const weak = entries
          .filter(([_, d]) => d.attempts >= 3 && d.mastery < 60)
          .sort((a, b) => a[1].mastery - b[1].mastery)
          .slice(0, 4);

        if (weak.length > 0) {
          parts.push(`Weak areas: ${weak.map(([id, d]) => {
            const skill = getSkillById(id);
            return `${skill?.name || id} (${d.mastery}%)`;
          }).join(', ')}`);
        }

        // Strong skills (mastery >= 80%, at least 3 attempts)
        const strong = entries
          .filter(([_, d]) => d.attempts >= 3 && d.mastery >= 80)
          .sort((a, b) => b[1].mastery - a[1].mastery)
          .slice(0, 3);

        if (strong.length > 0) {
          parts.push(`Strengths: ${strong.map(([id, d]) => {
            const skill = getSkillById(id);
            return `${skill?.name || id} (${d.mastery}%)`;
          }).join(', ')}`);
        }
      }
    }

    // Practice test history
    if (practiceTestResults && Object.keys(practiceTestResults).length > 0) {
      const testScores = [];
      Object.entries(practiceTestResults).forEach(([testId, results]) => {
        if (results?.attempts && results.attempts.length > 0) {
          const best = results.attempts.reduce((max, a) =>
            (a.scaledScore || 0) > (max.scaledScore || 0) ? a : max, results.attempts[0]);
          if (best.scaledScore) {
            testScores.push(best.scaledScore);
          }
        }
      });
      if (testScores.length > 0) {
        const avg = Math.round(testScores.reduce((a, b) => a + b, 0) / testScores.length);
        const best = Math.max(...testScores);
        parts.push(`Practice tests taken: ${testScores.length} | Average score: ${avg} | Best score: ${best}`);
      }

      // Inject cross-test trend context
      const trendContext = buildTrendContext(practiceTestResults, skillProgress);
      if (trendContext) {
        parts.push(trendContext);
      }
    }

    // Strategic coaching note based on score gap — only when goal and current
    // score are on the same scale (both composite > 800, or both section).
    if (user?.currentScore && user?.targetScore
        && ((user.targetScore > 800) === (user.currentScore > 800))) {
      const gap = user.targetScore - user.currentScore;
      if (gap >= 100) {
        parts.push(`COACHING STRATEGY: ${gap}-point gap requires systematic improvement. Focus on the highest-frequency domains first — ${profileSection === 'rw' ? 'Information & Ideas and Standard English Conventions are together about half the section' : 'Algebra alone is 35% of the test'}. Every easy question they currently miss is the fastest possible point gain. Do NOT waste time on the hardest 5% of questions until they are nailing everything else.`);
      } else if (gap >= 40) {
        parts.push(`COACHING STRATEGY: ${gap}-point gap is very achievable. At this level, points come from two places: (1) eliminating careless errors on questions they know how to solve, and (2) shoring up 2-3 specific weak skills. Time management is also key — are they running out of time and guessing on the last few questions?`);
      } else if (gap > 0) {
        parts.push(`COACHING STRATEGY: Close to target — only ${gap} points to go. At this level, gains come from precision: catching trap answers they currently fall for, ${profileSection === 'rw' ? 'going back to the text to prove the answer instead of guessing' : 'using Desmos to verify instead of guessing'}, and optimizing time on hard questions so they can double-check medium ones.`);
      }
    }

    // NOTE: the conversation-momentum SESSION NOTE used to live here, but its
    // text changes every message, which busted the cached (stable) prompt
    // prefix this profile lands in. It now rides the volatile practice-context
    // block in handleSend.

    // Only return if we have meaningful data beyond the headers
    if (parts.length <= 3) return '';
    return parts.join('\n');
  };

  // Build the R&W practice-question context block. Parallels the math path but
  // renders the passage / paired texts / student notes / table stimulus and
  // frames coaching around textual evidence and grammar rules instead of
  // Desmos and backsolving. Without this an R&W item reaches the model as a
  // bare stem ("Which choice best states the main idea?") with no text to read.
  // R&W items are always multiple choice.
  const buildRWPracticeContextBlock = ({
    question, choices, hint, answerRevealed, correctAnswer, explanation,
    difficulty, skills, isCorrect, selectedAnswer, userAnswer,
    passage, passages, studentNotes, questionTable, domain, emotionalState,
  }) => {
    // Serialize the stimulus the student is actually looking at.
    let stimulus = '';
    if (passage) {
      stimulus += `\nPASSAGE:\n${passage}\n`;
    }
    if (Array.isArray(passages) && passages.length > 0) {
      stimulus += '\n' + passages.map(p => `${p.label || 'Text'}:\n${p.text}`).join('\n\n') + '\n';
    }
    if (studentNotes) {
      stimulus += `\nSTUDENT NOTES:\n`;
      if (studentNotes.intro) stimulus += `${studentNotes.intro}\n`;
      if (Array.isArray(studentNotes.bullets)) stimulus += studentNotes.bullets.map(b => `- ${b}`).join('\n') + '\n';
      if (studentNotes.goal) stimulus += `Goal: ${studentNotes.goal}\n`;
    }
    if (questionTable) {
      stimulus += `\nTABLE${questionTable.caption ? ': ' + questionTable.caption : ''}\n`;
      if (Array.isArray(questionTable.headers)) stimulus += questionTable.headers.join(' | ') + '\n';
      if (Array.isArray(questionTable.rows)) stimulus += questionTable.rows.map(r => r.join(' | ')).join('\n') + '\n';
    }

    let context = `
>>> PRACTICE QUESTION CONTEXT <<<
The student is working on this SAT Reading and Writing practice question:
${difficulty ? `DIFFICULTY: ${difficulty.toUpperCase()}` : ''}
${domain ? `DOMAIN: ${domain}` : ''}
${skills?.length ? `SKILL TESTED: ${skills.join(', ')}` : ''}
TYPE: Multiple choice (the answer is always provable from the text above)

STUDENT EMOTIONAL STATE: ${emotionalState}
${emotionalState === 'frustrated' ? 'ADAPT: Be warm and direct. Give a quick win — go back to the text and find the one sentence that decides this. Do not lecture.' : ''}
${emotionalState === 'confused' ? 'ADAPT: Simplify. Strip the question to its core: "Ignore the extra words — this is really asking: [core question]." Point to the deciding sentence.' : ''}
${emotionalState === 'impatient' ? 'ADAPT: Acknowledge the impulse but redirect. "I get it — but finding the proof yourself is worth 10x. Which sentence answers this?"' : ''}
${emotionalState === 'seeking-validation' ? 'ADAPT: Do not confirm or deny. Redirect to the text: "Before I weigh in, point to the exact words that support your choice. Do they?"' : ''}
${emotionalState === 'persistent' ? 'ADAPT: They are working hard — acknowledge it and give a more direct nudge toward the deciding evidence.' : ''}
${stimulus}
QUESTION: ${question}

${choices?.length ? `ANSWER CHOICES:\n${choices.map(c => `${c.id}) ${c.text}`).join('\n')}` : ''}

${hint ? `HINT PROVIDED TO STUDENT: ${hint}` : ''}
`;

    if (answerRevealed) {
      // Lift the human-authored per-choice reasons out of the explanation so the
      // model is told the mistake behind each choice instead of guessing it.
      const misconceptions = extractChoiceMisconceptions(explanation);

      let trapAnalysis = '';
      if (choices && correctAnswer) {
        const wrongChoices = choices.filter(c => c.id !== correctAnswer);
        trapAnalysis = `\nWRONG ANSWER ANALYSIS (name the trap class for each):`;
        wrongChoices.forEach(c => {
          trapAnalysis += misconceptions[c.id]
            ? `\n- Choice ${c.id} (${c.text}): ${misconceptions[c.id]}`
            : `\n- Choice ${c.id} (${c.text}): which trap is this — surface match, inverse/opposite, scope shift, too extreme, half right, or out of scope? For a grammar item, name the error (comma splice, run-on, agreement, modifier, pronoun).`;
        });
      }

      // When the student picked a specific wrong choice we KNOW the mistake —
      // hand it over explicitly rather than letting the model infer it.
      let explicitError = '';
      const chosenWrongId = isCorrect === false ? userAnswer : null;
      if (chosenWrongId && misconceptions[chosenWrongId]) {
        explicitError = `\nTHE STUDENT'S SPECIFIC ERROR (from the answer key): Choice ${chosenWrongId} = ${misconceptions[chosenWrongId]}. Do not guess at their mistake — this IS their mistake; coach them on recognizing and avoiding exactly this trap.\n`;
      }

      context += `
>>> ANSWER HAS BEEN REVEALED — EXPERT BREAKDOWN MODE <<<
${selectedAnswer ? `STUDENT CHOSE: ${selectedAnswer}` : ''}
${isCorrect !== undefined ? `RESULT: ${isCorrect ? 'CORRECT' : 'WRONG'}` : ''}
CORRECT ANSWER: ${correctAnswer}
FULL EXPLANATION: ${explanation}
${trapAnalysis}
${explicitError}

When the student wants the full breakdown of a question (especially one they just missed), write it the way the cleanest answer keys read — verdict first, then scannable sections. Follow this exact shape:

OPEN WITH THE VERDICT — The very first sentence states the answer outright: "The correct answer is **${correctAnswer} — <the full text of that choice>.**" Follow it with one or two sentences of the core reason, built on the passage's own words. No warm-up sentence before it — the answer leads.

### Key ideas from the text
2-4 bullets, each starting with a short **bold label:** and one tight sentence. Walk the chain of evidence that forces the answer, quoting the passage's exact deciding words in at least one bullet. For a grammar item, state the rule being tested instead.

### Why the other choices are wrong
One bullet per wrong choice, in letter order, each starting with its bold letter ("**A:**"). Name the specific reason each fails in plain language — it matches a word but misses the point, it's the opposite of the goal, it's out of scope, it's too extreme, it's only half right, it's true but doesn't do what the question asks. Never skip a wrong choice.${!isCorrect && selectedAnswer ? ` Give the student's choice ${selectedAnswer} the fullest bullet: name exactly what pulled them to it and how to catch it next time.` : ''}

### The takeaway
One sentence the student can carry to test day.

But if they're only asking a NARROW follow-up ("why C and not D?", "why does that sentence matter?"), just answer that briefly — don't force the whole structure.

Use the provided explanation as a foundation, but write the clearer, sharper version: exact textual evidence and a specific, plain-language reason for every choice.
`;
    } else {
      context += `
>>> ANSWER NOT YET REVEALED — SOCRATIC COACHING MODE <<<

ABSOLUTE RULES (violating these harms the student's learning):
1. NEVER reveal the correct answer — not directly, not indirectly, not through elimination
2. NEVER name the choice — stop before the final pick
3. NEVER confirm or deny a specific choice

USE YOUR JUDGMENT to pick the right Socratic technique for this student's state:

${emotionalState === 'frustrated' ?
  'THE STUDENT IS FRUSTRATED. Drop pure Socratic — point them to the deciding part of the text. "Let us just look at this one sentence together..."' :
  emotionalState === 'confused' ?
  'THE STUDENT IS CONFUSED. Simplify the question first. "Ignore the extra words. This question is really asking: [core question]."' :
  emotionalState === 'impatient' ?
  'THE STUDENT WANTS THE ANSWER. Acknowledge it, then redirect. "I know — but finding the proof yourself is worth 10x. Which sentence decides this?"' :
  `Available techniques:
- REFRAME: "What is this question actually asking you to find?"
- EVIDENCE HUNT: "Which sentence in the passage decides this? Point to it."
- PREDICT: "Before you look at the choices, what word or idea do you expect here?"
- RELATIONSHIP (transitions): "What is the logical link between these two sentences — cause, contrast, addition, example?"
- GRAMMAR CHECK (boundaries): "Is each side of this punctuation a complete sentence? What does that tell you?"
- TRAP SCAN: "Which choices just repeat a word from the passage without answering the question?"
- WALKTHROUGH: If truly stuck, narrow to the deciding sentence but stop before naming the choice.`}

Your goal is to build their reading and reasoning instincts. Every question they crack themselves is worth ten they are told.
`;
    }

    return context;
  };

  // Build practice question context with smart restrictions
  const buildPracticeContext = () => {
    if (!isPracticeQuestion || !practiceContext) return '';

    const section = practiceContext.section === 'rw' ? 'rw' : 'math';
    const { question, choices, hint, answerRevealed, correctAnswer, explanation, difficulty, skills, isCorrect, selectedAnswer, userAnswer, passage, passages, studentNotes, questionTable, domain } = practiceContext;

    const isFillin = !choices || choices.length === 0;

    // Detect emotional state from message history for adaptive tone
    const detectEmotionalState = () => {
      if (messages.length === 0) return 'neutral';
      const recentMessages = messages.slice(-4).filter(m => m.role === 'user');
      const recentText = recentMessages.map(m => m.content.toLowerCase()).join(' ');

      if (/i (don'?t|dont) (get|understand|know)|confused|lost|what\??$|huh|help/i.test(recentText)) return 'confused';
      if (/stupid|hate|ugh|give up|quit|impossible|can'?t|this is hard/i.test(recentText)) return 'frustrated';
      if (/just tell me|what'?s the answer|answer\??$/i.test(recentText)) return 'impatient';
      if (/is it [a-d]\??|am i right|did i get/i.test(recentText)) return 'seeking-validation';
      if (recentMessages.length >= 3) return 'persistent'; // Still trying after multiple messages
      return 'neutral';
    };

    const emotionalState = detectEmotionalState();

    // R&W items carry passage/notes/table stimulus the math path never reads.
    // Route them to the verbal builder so the model actually sees the text.
    if (section === 'rw') {
      return buildRWPracticeContextBlock({
        question, choices, hint, answerRevealed, correctAnswer, explanation,
        difficulty, skills, isCorrect, selectedAnswer, userAnswer: practiceContext.userAnswer,
        passage, passages, studentNotes, questionTable, domain, emotionalState,
      });
    }

    let context = `
>>> PRACTICE QUESTION CONTEXT <<<
The student is working on this SAT Math practice question:
${difficulty ? `DIFFICULTY: ${difficulty.toUpperCase()}` : ''}
${skills?.length ? `SKILLS TESTED: ${skills.join(', ')}` : ''}
${isFillin ? 'TYPE: Student-produced response (fill-in — no answer choices, no traps, but no backsolving either)' : 'TYPE: Multiple choice'}

STUDENT EMOTIONAL STATE: ${emotionalState}
${emotionalState === 'frustrated' ? 'ADAPT: Be warm and direct. Give them a quick win. Show the simplest path first. Do not lecture.' : ''}
${emotionalState === 'confused' ? 'ADAPT: Simplify. Strip the problem to its core. Use concrete numbers. Ask what specifically is confusing.' : ''}
${emotionalState === 'impatient' ? 'ADAPT: Acknowledge the impulse but redirect. "I get it — but solving this yourself is worth 10x more than me telling you. Let me make it easier..."' : ''}
${emotionalState === 'seeking-validation' ? 'ADAPT: Do not confirm or deny. Redirect to self-verification: "Before I weigh in, check it yourself — plug your answer back in. What do you get?"' : ''}
${emotionalState === 'persistent' ? 'ADAPT: They are putting in effort — acknowledge it. Give a more direct nudge since they have been trying.' : ''}

QUESTION: ${question}

${!isFillin ? `ANSWER CHOICES:\n${choices.map(c => `${c.id}) ${c.text}`).join('\n')}` : ''}

${hint ? `HINT PROVIDED TO STUDENT: ${hint}` : ''}
${(() => {
  // Per-question Desmos route from the curated playbook — gives the model
  // the specific calculator play instead of a generic "try graphing it".
  const desmosTip = getDesmosTip({ question, skills });
  return desmosTip
    ? `RECOMMENDED DESMOS ROUTE FOR THIS QUESTION (teach it with exact keystrokes when relevant): ${desmosTip.name} — ${desmosTip.technique}`
    : '';
})()}
`;

    if (answerRevealed) {
      // Pull the human-authored per-choice trap reasons out of the explanation
      // so the model is TOLD the mistake behind each choice instead of asked to
      // infer it (frontier models reliably fail that inference — GuideEval).
      const misconceptions = extractChoiceMisconceptions(explanation);

      // Build wrong-answer trap analysis for the AI. State the parsed reason
      // where we have one; fall back to today's infer-prompt otherwise.
      let trapAnalysis = '';
      if (!isFillin && choices && correctAnswer) {
        const wrongChoices = choices.filter(c => c.id !== correctAnswer);
        trapAnalysis = `\nWRONG ANSWER ANALYSIS (use this to explain traps):`;
        wrongChoices.forEach(c => {
          trapAnalysis += misconceptions[c.id]
            ? `\n- Choice ${c.id} (${c.text}): ${misconceptions[c.id]}`
            : `\n- Choice ${c.id} (${c.text}): Identify what specific mistake leads here — is it a partial calculation, sign error, misread, reversed operation, or wrong formula?`;
        });
      }

      // When the student picked a specific wrong choice we KNOW the mistake —
      // hand it over explicitly rather than letting the model guess.
      let explicitError = '';
      const chosenWrongId = isCorrect === false ? userAnswer : null;
      if (chosenWrongId && misconceptions[chosenWrongId]) {
        explicitError = `\nTHE STUDENT'S SPECIFIC ERROR (from the answer key): Choice ${chosenWrongId} = ${misconceptions[chosenWrongId]}. Do not guess at their mistake — this IS their mistake; coach them on recognizing and avoiding exactly this trap.\n`;
      } else if (isFillin && isCorrect === false && misconceptions._common) {
        explicitError = `\nTHE STUDENT'S LIKELY ERROR (from the answer key's common mistakes): ${misconceptions._common} Coach them on recognizing and avoiding exactly this trap.\n`;
      }

      context += `
>>> ANSWER HAS BEEN REVEALED — EXPERT BREAKDOWN MODE <<<
${selectedAnswer ? `STUDENT CHOSE: ${selectedAnswer}` : ''}
${isCorrect !== undefined ? `RESULT: ${isCorrect ? 'CORRECT' : 'WRONG'}` : ''}
CORRECT ANSWER: ${correctAnswer}
FULL EXPLANATION: ${explanation}
${trapAnalysis}
${explicitError}

When the student wants the full breakdown of a question (especially one they just missed), write it the way the cleanest answer keys read — verdict first, then scannable sections. Follow this exact shape:

OPEN WITH THE VERDICT — The very first sentence states the answer outright: ${!isFillin ? `"The correct answer is **${correctAnswer} — <that choice, math in LaTeX>.**"` : `"The correct answer is **<the value, in LaTeX>.**"`} Follow it with one or two sentences naming what the question is really testing and the core of why. No warm-up sentence before it — the answer leads.

### How to get it
2-4 bullets, each starting with a short **bold label:** and one tight step. Lead with the fastest correct path — Desmos (say exactly what to type, not "try graphing it"), backsolving, plugging in — before the algebra. End with a **Check:** bullet showing how to confirm the answer (Desmos keystrokes or substituting back in).
${!isFillin ?
`
### Why the other choices are wrong
One bullet per wrong choice, in letter order, each starting with its bold letter ("**A:**"). Name the SPECIFIC slip that produces it — a sign error, a partial calculation, a reversed operation, the value one step early, a misread.${!isCorrect && selectedAnswer ? ` Give the student's choice ${selectedAnswer} the fullest bullet: name exactly the slip that led there and how to catch it next time.` : ''} Never skip a wrong choice.` :
`
### Common mistakes
Bullets for the wrong values students most often produce on this question, with the specific slip behind each.${!isCorrect && selectedAnswer ? ` The student answered ${selectedAnswer}; name exactly the slip that led there and how to catch it next time.` : ''}`}

### The takeaway
One memorable rule for test day.

But if they're only asking a NARROW follow-up ("why divide by 3?", "where did the 2 come from?"), just answer that briefly — don't force the whole structure.

Use the provided explanation as a foundation, but write the clearer, sharper version — the fast path, the specific reason behind every wrong choice, and the "why" a textbook explanation skips.
`;
    } else {
      context += `
>>> ANSWER NOT YET REVEALED — SOCRATIC COACHING MODE <<<

ABSOLUTE RULES (violating these harms the student's learning):
1. NEVER reveal the correct answer — not directly, not indirectly, not through elimination
2. NEVER solve to completion — stop before the final step
3. NEVER confirm or deny a specific choice
4. NEVER narrow down by eliminating choices through implication

USE YOUR JUDGMENT to pick the right Socratic technique for this student's state:

${emotionalState === 'frustrated' ?
  'THE STUDENT IS FRUSTRATED. Drop pure Socratic — give them a concrete first step. "Here is how I would start this one..." Walk them through the setup, let them do the final step.' :
  emotionalState === 'confused' ?
  'THE STUDENT IS CONFUSED. Start by simplifying the question. "Ignore all the extra words. This question is really just asking: [core question]."' :
  emotionalState === 'impatient' ?
  'THE STUDENT WANTS THE ANSWER. Acknowledge it, then redirect. "I know — but getting this yourself is worth 10x. Let me make it easier. What type of question is this?"' :
  `Available techniques:
- REFRAME: "What is this question actually asking? Read the last sentence again."
- TYPE ID: "What category of problem is this? Have you seen this shape before?"
- CONCEPT NUDGE: Give the relevant formula without applying it.
- FIRST STEP: "What would be your first move here?"
- ESTIMATION: "Should the answer be big or small? Positive or negative?"
- SIMPLIFICATION: "What if the numbers were simpler — say 10 instead of 347?"
- DESMOS: Be specific — "Type y = [left side] and y = [right side]. What do you see?"
- ANSWER SCAN: "Look at all four choices. Can you eliminate any just by reasoning?"
- WALKTHROUGH: If truly stuck, walk through setup but stop before the final calculation.`}

${!isFillin ? 'If the student seems stuck on the algebra, always offer a specific Desmos approach — tell them exactly what to type, not just "try Desmos."' : ''}

Your goal is to build their problem-solving instincts. Every question they solve themselves is worth ten they are told the answer to.
`;
    }

    return context;
  };

  // Keep messagesRef in sync with state for unmount / tab-hide flushes. Updated
  // in a POST-COMMIT effect (not during render): a conversation switch resets
  // messages to [] before the old session's flush-cleanup runs, and a
  // render-time assignment would feed that [] to the forced flush and clobber
  // the old session. Updating after commit means the cleanup for the outgoing
  // (userId, sessionId) still sees the previous conversation's committed messages.
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Clear the transient send-notice timer on unmount so it can't setState on a
  // dead component.
  useEffect(() => () => {
    if (sendNoticeTimerRef.current) clearTimeout(sendNoticeTimerRef.current);
  }, []);

  // Generate storage key based on user + lesson. The userId segment scopes the
  // sessionStorage fallback per account, so User B on the same tab can never
  // read User A's cached tutor chat ('anon' when signed out).
  const userId = user?.uid || null;
  const storageKey = `aiTutorChat_${userId || 'anon'}_${moduleId}_${lessonId}`;

  // Load chat history from Firestore (with sessionStorage cache fallback) on lesson change
  useEffect(() => {
    let cancelled = false;

    const loadSession = async () => {
      // Reset state
      setMessages([]);
      setInput('');
      setIsLoading(false);
      setIsStreaming(false);
      setProactiveRec(null);
      setHintDismissed(false);
      setSessionId(null);
      messageCountSinceWrite.current = 0;
      interventionStarted.current = false;
      sessionCreateInFlightRef.current = false;
      restoredFromFallbackRef.current = false;

      if (!userId) {
        // No user — fall back to sessionStorage
        try {
          const saved = sessionStorage.getItem(storageKey);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setMessages(parsed);
            }
          }
        } catch (e) { /* ignore */ }
        return;
      }

      // Try Firestore via chatSessionService (checks sessionStorage cache first)
      try {
        const session = await loadActiveSession(userId, moduleId, lessonId);
        if (!cancelled && session?.messages?.length > 0) {
          setMessages(session.messages);
          setSessionId(session.sessionId);
          return;
        }
      } catch (e) {
        console.error('Failed to load session:', e);
      }

      // Final fallback: sessionStorage. Mark it as fallback-restored so the
      // persist effect does NOT addDoc a new session for this reload-restored
      // history — a fresh session doc is only created once the student sends a
      // new message (see restoredFromFallbackRef).
      if (!cancelled) {
        try {
          const saved = sessionStorage.getItem(storageKey);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setMessages(parsed);
              restoredFromFallbackRef.current = true;
            }
          }
        } catch (e) { /* ignore */ }
      }
    };

    loadSession();
    return () => {
      cancelled = true;
      // Cancel any in-flight tutor request for the conversation being left —
      // on unmount too. Keeps a stale stream from burning rate limit and from
      // resolving into a conversation the student is no longer in.
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, [storageKey, userId, moduleId, lessonId]);

  // Load learning memory and recent sessions on mount
  useEffect(() => {
    if (!userId) return;

    // cancelled guard mirrors the loadSession effect above: a slow resolve for
    // the OLD uid on account switch must not feed the previous student's memory
    // into the tutor prompt.
    let cancelled = false;

    const loadMemory = async () => {
      try {
        const [memory, sessions] = await Promise.all([
          getLearningMemory(userId),
          loadRecentSessions(userId, 5),
        ]);
        if (cancelled) return;
        setLearningMemory(memory);
        setRecentSessions(sessions);
      } catch (e) {
        if (!cancelled) console.error('Failed to load learning memory:', e);
      }
    };

    loadMemory();
    return () => { cancelled = true; };
  }, [userId]);

  // Save to Firestore (debounced) + sessionStorage (immediate) when messages change
  useEffect(() => {
    if (messages.length === 0) return;

    // Always write-through to sessionStorage for instant restore
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (e) { /* Storage full */ }

    // Firestore persistence (debounced via chatSessionService)
    if (!userId) return;

    const persistToFirestore = async () => {
      try {
        if (!sessionId && messages.length >= 1 && !restoredFromFallbackRef.current) {
          // Create new session — at most one create in flight. Streaming
          // re-runs this effect per chunk while sessionId is still null, and
          // each unguarded run would addDoc another duplicate session.
          if (sessionCreateInFlightRef.current) return;
          sessionCreateInFlightRef.current = true;
          try {
            const newSessionId = await saveSession(userId, {
              moduleId,
              lessonId,
              lessonTitle,
              context: standalone ? 'standalone' : (isPracticeQuestion ? 'practice' : 'lesson'),
              messages,
              topicsDiscussed: practiceContext?.skills || [],
            });
            setSessionId(newSessionId);
            messageCountSinceWrite.current = messages.length;
          } finally {
            // Success: setSessionId above lands before any later effect run, so
            // those runs take the update branch. Failure: clearing lets the
            // next messages change retry the create.
            sessionCreateInFlightRef.current = false;
          }
        } else if (sessionId) {
          // Update existing session (debounced)
          messageCountSinceWrite.current++;
          await updateSessionMessages(userId, sessionId, messages);
        }
      } catch (e) {
        console.error('Firestore persist failed:', e);
      }
    };

    persistToFirestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- practiceContext?.skills is only stamped onto a newly created session; practiceContext is a prop object rebuilt by the parent, so depending on it would re-fire this Firestore persist on every render
  }, [messages, storageKey, userId, sessionId, moduleId, lessonId, lessonTitle, standalone, isPracticeQuestion]);

  // Flush pending writes on unmount / conversation switch. Snapshot the ref in
  // the cleanup body and only force-write a NON-empty transcript: on a
  // conversation switch messages is reset to [], and forcing that empty array
  // would clobber the outgoing session's messages. (updateSessionMessages also
  // rejects forced empty writes as a second line of defense.)
  useEffect(() => {
    return () => {
      if (userId && sessionId) {
        const snapshot = messagesRef.current;
        if (Array.isArray(snapshot) && snapshot.length > 0) {
          updateSessionMessages(userId, sessionId, snapshot, true).catch(() => {});
        }
        flushPendingWrites(userId, sessionId);
      }
    };
  }, [userId, sessionId]);

  // Best-effort flush when the tab is hidden / closed — a tab close inside the
  // 30s debounce window would otherwise drop the last exchanges. Mirrors the
  // bank-drill backstop in App.jsx: Firestore web writes are not guaranteed to
  // complete on unload, so this is a backstop on top of the unmount flush.
  // force=true writes the freshest messages immediately and clears the debounce.
  useEffect(() => {
    if (!userId || !sessionId) return undefined;
    const flush = () => {
      if (document.visibilityState === 'hidden') {
        updateSessionMessages(userId, sessionId, messagesRef.current, true).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', flush);
    return () => document.removeEventListener('visibilitychange', flush);
  }, [userId, sessionId]);

  useEffect(() => {
    // Only follow the conversation down when the student hasn't scrolled up to
    // re-read — keeps streamed tokens from hijacking their scroll position.
    if (nearBottomRef.current) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !embedded) {
      setTimeout(() => {
        inputRef.current?.focus();
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (isOpen && embedded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, embedded]);

  // Engagement telemetry: tutor_opened (once per open).
  useEffect(() => {
    if (isOpen && !openTrackedRef.current && user?.uid) {
      openTrackedRef.current = true;
      trackEvent(user.uid, 'tutor', 'opened', {
        section: practiceContext?.section === 'rw' ? 'rw' : 'math',
        isPracticeQuestion: !!isPracticeQuestion,
        embedded: !!embedded,
      });
    }
    if (!isOpen) openTrackedRef.current = false;
  }, [isOpen, embedded, isPracticeQuestion, practiceContext, user?.uid]);

  // Generate proactive recommendations based on skill progress
  useEffect(() => {
    if (!skillProgress || hintDismissed || messages.length > 0) return;

    // Review-mode suppression (TODOS.md "Section context inside retry-drill
    // review-mode", P2): in retry-drill review the snapshot questions are
    // mixed-section, so any "Skill X has dropped to Y%" advice that doesn't
    // match the visible question's section is noise. Suppress the proactive
    // panel entirely during review mode — the student is in inspection mode,
    // not learning mode.
    if (reviewMode) return;

    // Check if we should offer a proactive hint for the current question
    if (isPracticeQuestion && practiceContext?.skills) {
      const hintCheck = shouldOfferProactiveHint(skillProgress, practiceContext.skills);
      if (hintCheck.offer) {
        setProactiveRec({
          type: 'hint-offer',
          title: 'Need a hint?',
          message: hintCheck.message,
          skillId: hintCheck.skillId,
          skillName: hintCheck.skillName,
          action: 'get-hint',
          actionLabel: 'Yes, give me a hint',
          suggestedPrompt: `Can you help me understand ${hintCheck.skillName}? I'm not sure how to approach this problem.`
        });
        return;
      }
    }

    // Priority 2.5: Cross-session pattern detection
    if (practiceTestResults && learningMemory) {
      const crossSessionRec = generateCrossSessionRecommendation(
        skillProgress, practiceTestResults, learningMemory,
        practiceContext?.skills || []
      );
      if (crossSessionRec) {
        setProactiveRec(crossSessionRec);
        return;
      }
    }

    // Otherwise, check for general recommendations (weak/declining skills)
    const rec = generateProactiveRecommendation(skillProgress, {
      currentSkillId: practiceContext?.skills?.[0],
      isCorrect: practiceContext?.isCorrect,
      wrongCount: practiceContext?.wrongCount || 0,
      testDate
    });

    if (rec) {
      setProactiveRec(rec);
    }
  }, [skillProgress, isPracticeQuestion, practiceContext, testDate, hintDismissed, messages.length, practiceTestResults, learningMemory, reviewMode]);

  // Track intervention when chat session reaches 4+ messages
  useEffect(() => {
    if (!userId || interventionStarted.current || messages.length < 4) return;
    if (!skillProgress) return;

    const currentSkills = practiceContext?.skills || [];
    if (currentSkills.length === 0) return;

    // Set flag AFTER validation so we don't permanently block if skills were empty on first check
    interventionStarted.current = true;

    // Build pre-metrics from current skill state
    const skillMastery = {};
    for (const skillId of currentSkills) {
      skillMastery[skillId] = skillProgress[skillId]?.mastery ?? 0;
    }

    // Get error types from most recent test
    let errorTypes = {};
    if (practiceTestResults) {
      const allAttempts = [];
      Object.values(practiceTestResults).forEach(r => {
        if (r?.attempts) allAttempts.push(...r.attempts);
      });
      allAttempts.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
      if (allAttempts[0]?.diagnosticData?.errorPatterns?.counts) {
        errorTypes = allAttempts[0].diagnosticData.errorPatterns.counts;
      }
    }

    const archetype = studentFingerprint?.archetype || 'unknown';
    const approach = inferApproach(learningMemory, null);

    startIntervention(userId, {
      type: 'tutoring_session',
      skillIds: currentSkills,
      approach,
      context: isPracticeQuestion ? 'practice' : 'lesson',
      moduleId,
      lessonId,
      preMetrics: { skillMastery, errorTypes, archetype },
    }).catch(err => console.error('[AiTutorChat] Failed to start intervention:', err));
  }, [messages.length, userId, skillProgress, practiceContext, practiceTestResults, studentFingerprint, learningMemory, isPracticeQuestion, moduleId, lessonId]);

  // Handle accepting a proactive recommendation
  // Re-ask the last user question and replace the assistant reply.
  const handleRegenerate = () => {
    if (isLoading || isStreaming) return;
    let i = messages.length - 1;
    while (i >= 0 && messages[i].role !== 'user') i--;
    if (i < 0) return;
    // Pass the trimmed history (everything before that user turn) as an ARGUMENT
    // so it only takes effect once the send passes handleSend's rate-limit
    // guard. Previously this was stashed in a ref BEFORE the guard, so a
    // swallowed (rate-limited) regenerate left a stale base that silently
    // truncated the next real send.
    handleSend(messages[i].content, messages.slice(0, i));
  };

  // 👍/👎 on an assistant answer — a quality signal we otherwise lack.
  const handleMessageFeedback = (vote) => {
    if (user?.uid) {
      trackEvent(user.uid, 'tutor', 'message_feedback', {
        vote,
        section: practiceContext?.section === 'rw' ? 'rw' : 'math',
        isPracticeQuestion: !!isPracticeQuestion,
        coachMode: coachMode || null,
      });
    }
  };

  const handleProactiveAccept = (recommendation) => {
    if (recommendation.suggestedPrompt) {
      // Don't dismiss the hint if the send would be swallowed (rate limit /
      // mid-stream) — keep it and tell the student, so accepting isn't a no-op.
      if (sendIsBlocked()) {
        flashSendNotice('One moment — finishing the last reply.');
        return;
      }
      // Auto-send the nudge instead of just filling the box — one tap to ask.
      handleSend(recommendation.suggestedPrompt);
    }
    setProactiveRec(null);
  };

  // Handle dismissing a proactive recommendation
  const handleProactiveDismiss = () => {
    setProactiveRec(null);
    setHintDismissed(true);
  };

  // Error-bubble Retry: surface a brief notice instead of a silent no-op when a
  // send is currently blocked (rate window / mid-stream).
  const handleRetry = (retryText) => {
    if (sendIsBlocked()) {
      flashSendNotice('One moment — try again in a second.');
      return;
    }
    handleSend(retryText);
  };

  // Generate smart prompts based on skill progress
  const getSmartPrompts = () => {
    if (skillProgress && practiceContext) {
      return generateSmartPrompts(skillProgress, practiceContext);
    }
    return null;
  };

  // Contextual follow-up chips shown UNDER the latest assistant reply so the
  // Socratic loop keeps going past turn one (Khanmigo/Claude-style). Logic
  // lives in selectors/tutorEngagement.js (pure, tested): wrong answers lead
  // with the parsed trap, correct answers upgrade toward speed and pattern.
  const getFollowUpPrompts = () => buildFollowUpPrompts(practiceContext, isPracticeQuestion);

  // Personalized empty-state welcome when the answer key names the exact trap
  // the student fell for; null keeps the generic copy below.
  const trapWelcome = isPracticeQuestion ? buildTrapWelcome(practiceContext) : null;

  // ── Stable-prefix contexts — ONE assembly for send AND pre-warm ─────────
  // Everything that rides the CACHED stable system-prompt prefix (persona +
  // profile + skill history + playbook + knowledge briefs + memory + strategy
  // + intelligence). handleSend and the pre-warm effect below must both build
  // these through this ONE function: the Anthropic prompt cache is an exact
  // prefix match, so any drift makes the pre-warm silently useless.
  const buildPrefixContexts = () => {
    // Subject of the active item — selects the system prompt + gates math-only context.
    const section = practiceContext?.section === 'rw' ? 'rw' : 'math';

    // Skill-history block (the +6pp lever): demonstrated level on THIS
    // question's skills + related weak areas so the tutor calibrates depth.
    const skillHistoryBlock = isPracticeQuestion
      ? buildTutorSkillContext({ practiceTestResults, skillProgress, skills: practiceContext?.skills })
      : '';
    // Expert misconception map for THIS question's skill(s), distilled from the
    // SAT knowledge graph. masteryPct selects the level-matched coaching tier;
    // it only shifts on a bucket boundary, so the prefix stays cache-stable.
    let knowledgeMasteryPct;
    if (isPracticeQuestion && skillProgress && Array.isArray(practiceContext?.skills)) {
      for (const s of practiceContext.skills) {
        const m = skillProgress[s]?.mastery;
        if (typeof m === 'number') { knowledgeMasteryPct = m; break; }
      }
    }
    const knowledgeBlock = isPracticeQuestion
      ? buildTutorKnowledgeContext({ skills: practiceContext?.skills, masteryPct: knowledgeMasteryPct })
      : '';
    // Section-wide expert playbook (triage, elimination, Desmos judgment …) —
    // constant per section.
    const playbookBlock = isPracticeQuestion ? buildTutorPlaybookContext({ section }) : '';
    const studentProfileStr = [buildStudentProfile(), skillHistoryBlock, playbookBlock, knowledgeBlock].filter(Boolean).join('\n\n');

    // Learning memory context for cross-session awareness
    const learningMemoryCtx = (learningMemory || recentSessions.length > 0)
      ? { memory: learningMemory, recentSessions }
      : null;

    // Strategy context from error patterns and weak skills
    let strategyCtx = null;
    if (skillProgress) {
      const weakSkillIds = Object.entries(skillProgress)
        .filter(([_, d]) => d.attempts >= 3 && d.mastery < 60)
        .map(([id]) => id);
      // Get error patterns from most recent test attempt
      let errorPatterns = null;
      if (practiceTestResults) {
        const allAttempts = [];
        Object.values(practiceTestResults).forEach(r => {
          if (r?.attempts) allAttempts.push(...r.attempts);
        });
        allAttempts.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
        if (allAttempts[0]?.diagnosticData?.errorPatterns?.counts) {
          errorPatterns = allAttempts[0].diagnosticData.errorPatterns.counts;
        }
      }
      if (weakSkillIds.length > 0 || errorPatterns) {
        strategyCtx = { errorPatterns, weakSkillIds };
      }
    }

    // Intelligence context from data loop
    let intelligenceCtx = '';
    if (studentFingerprint || interventionLog?.length > 0 || predictionLog?.length > 0) {
      // Get approach guidance for current skills
      let approachGuidance = null;
      const currentSkills = practiceContext?.skills || [];
      if (currentSkills.length > 0 && interventionLog?.length > 0) {
        const effectiveness = computeApproachEffectiveness(interventionLog, currentSkills[0]);
        approachGuidance = getRecommendedApproach(effectiveness, studentFingerprint, currentSkills);
      } else if (studentFingerprint) {
        approachGuidance = getRecommendedApproach(null, studentFingerprint, currentSkills);
      }

      const latestPrediction = predictionLog?.length > 0
        ? predictionLog[predictionLog.length - 1]
        : null;

      intelligenceCtx = buildIntelligenceContext(
        studentFingerprint,
        latestPrediction,
        interventionLog,
        approachGuidance,
        section
      );
    }

    return { section, studentProfileStr, learningMemoryCtx, strategyCtx, intelligenceCtx };
  };

  // ── Prompt-cache pre-warm ────────────────────────────────────────────────
  // When the panel opens, fire a max_tokens:0 warm request so the ~10k-token
  // stable prefix is already in the Anthropic prompt cache before the student
  // finishes typing their first message — the first reply then streams its
  // first token seconds sooner. Best-effort and deduped per question: a failed
  // or stale warm just means the old (cold) speed. Cost note: the cache write
  // happens anyway on the first real message; the pre-warm only moves it
  // earlier, so the marginal cost is panels opened with no message sent.
  // DARK until the aiTutor function that understands prewarm:true is deployed:
  // the OLD server would treat a pre-warm as a real buffered turn and generate
  // a full (paid, invisible) reply on every panel open. Flip ON via
  // REACT_APP_FF_TUTOR_PREWARM=true (or localStorage 'ff:tutorPrewarm'='1')
  // only AFTER `firebase deploy --only functions`.
  const prewarmEnabled = useFeatureFlag('tutorPrewarm');
  const prewarmedKeyRef = useRef(null);
  useEffect(() => {
    if (!isOpen || !prewarmEnabled) return;
    const key = `${moduleId}|${lessonId}|${practiceContext?.questionId || ''}`;
    if (prewarmedKeyRef.current === key) return;
    prewarmedKeyRef.current = key;
    const { section, studentProfileStr, learningMemoryCtx, strategyCtx, intelligenceCtx } = buildPrefixContexts();
    prewarmTutor({
      currentModuleId: moduleId,
      currentLessonId: lessonId,
      studentProfile: studentProfileStr,
      learningMemoryContext: learningMemoryCtx,
      strategyContext: strategyCtx,
      intelligenceContext: intelligenceCtx,
      section,
    });
    // Deps are deliberately narrower than everything buildPrefixContexts
    // reads: the warm should fire once per question-open, not on every
    // progress-state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see the note above: buildPrefixContexts is a per-render function, and the pre-warm must fire once per question-open, not on every progress-state change
  }, [isOpen, prewarmEnabled, moduleId, lessonId, practiceContext?.questionId]);

  const handleSend = async (overrideText, regenBase) => {
    const now = Date.now();
    // overrideText lets a suggestion chip or the error Retry button send
    // directly. Guard against an event object reaching us via onClick={handleSend}.
    const text = (typeof overrideText === 'string' && overrideText.trim() ? overrideText : input).trim();
    // isStreaming (not just isLoading) blocks re-entry for the whole round-trip:
    // isLoading clears on the first streamed token, and a second send mid-stream
    // would run two concurrent streams corrupting the last assistant bubble.
    // Returns false when swallowed so callers can react instead of assuming
    // the message went out.
    if (!text || isLoading || isStreaming || (now - lastSendTime < RATE_LIMIT_MS)) return false;

    setLastSendTime(now);
    setSendNotice('');
    // A real new user message means this session is no longer merely
    // fallback-restored history — allow the persist effect to create/update the
    // Firestore session from here on.
    restoredFromFallbackRef.current = false;
    const userMessage = { role: 'user', content: text };
    // Regenerate supplies the trimmed history (everything before the last user
    // turn) as an ARGUMENT so it only applies once this send passes the guard
    // above; otherwise drop just a trailing error bubble so a retry replaces it
    // instead of stacking.
    const base = Array.isArray(regenBase)
      ? regenBase
      : (messages[messages.length - 1]?.isError ? messages.slice(0, -1) : messages);
    const newMessages = [...base, userMessage];
    setMessages(newMessages);
    setInput('');
    // Reset the auto-grown composer back to one row after sending.
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setIsLoading(true);
    setIsStreaming(true);
    // One controller per send; the conversation effect's cleanup aborts it on
    // unmount / conversation switch so a stale stream can't keep running.
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const videoContext = isVideoLesson && videoTranscript ? {
        transcript: videoTranscript,
        currentTime: videoTimestamp
      } : null;

      // Stable-prefix contexts — built through the SAME function as the
      // pre-warm effect (byte-identity contract on buildPrefixContexts).
      const { section, studentProfileStr, learningMemoryCtx, strategyCtx, intelligenceCtx } = buildPrefixContexts();

      // Next-item-correctness telemetry: remember which question the student is
      // asking the tutor about, so the drill answer path can later tell whether
      // the NEXT item landed. Fail-silent, zero-latency, never blocks a send.
      if (isPracticeQuestion && practiceContext) {
        try {
          noteTutorExchange(makeQuestionKey({
            id: practiceContext.questionId,
            text: practiceContext.question,
          }));
        } catch { /* telemetry must never block a send */ }
      }

      // Build practice context string with restrictions
      let practiceContextStr = buildPracticeContext();

      // Add skill context if available (math-only — the corpus is math-flavored,
      // referencing sign errors, formulas, and Desmos that do not apply to R&W).
      if (section === 'math' && skillProgress && practiceContext?.skills) {
        const skillContext = buildSkillContextForAI(skillProgress, practiceContext.skills);
        practiceContextStr = skillContext + '\n' + practiceContextStr;
      }

      // Conversation momentum — changes EVERY message, so it must ride the
      // volatile block (the practiceContext param), never the cached stable
      // prefix (it used to live in buildStudentProfile and busted the cache).
      if (newMessages.length > 6) {
        practiceContextStr += `\n\nSESSION NOTE: This is message ${newMessages.length} in the conversation. The student has been engaged for a while — maintain energy and keep explanations focused.`;
      }

      // Coach mode: when a structured mode is active, pass its id + a context
      // object matching the mode's contract. buildCoachContext guards each
      // field, so a superset is safe (missing fields are simply omitted).
      const coachModePayload = coachMode ? {
        modeId: coachMode,
        context: {
          question: practiceContext?.question ?? practiceContext?.questionText ?? null,
          userAnswer: practiceContext?.userAnswer,
          correctAnswer: practiceContext?.correctAnswer,
          skills: practiceContext?.skills,
          skillId: practiceContext?.skills?.[0],
          skillName: practiceContext?.skillName,
          errorType: practiceContext?.errorType,
          difficulty: practiceContext?.difficulty,
          currentScore: user?.currentScore,
          targetScore: user?.targetScore,
          // R&W stimulus + classification (rendered guarded in buildCoachContext)
          section,
          domain: practiceContext?.domain,
          passage: practiceContext?.passage,
          passages: practiceContext?.passages,
          studentNotes: practiceContext?.studentNotes,
          questionTable: practiceContext?.questionTable,
        },
      } : null;
      if (coachModePayload && user?.uid) {
        trackCoachModeUsed(user.uid, coachMode, newMessages.filter(m => m.role === 'user').length);
      }

      // Stream the answer in live: the loading dots show until the first token,
      // then a streaming assistant bubble fills as tokens arrive. If the proxy
      // can't stream (or it's the buffered fallback), onChunk simply never fires
      // and the full answer is appended once below — same as before.
      let streamStarted = false;
      const onChunk = (fullText) => {
        setMessages(prev => {
          if (!streamStarted) return [...prev, { role: 'assistant', content: fullText }];
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'assistant') next[next.length - 1] = { ...last, content: fullText };
          return next;
        });
        if (!streamStarted) { streamStarted = true; setIsLoading(false); }
      };

      const response = await chatWithTutor(
        newMessages,
        moduleId,
        lessonId,
        null,
        videoContext,
        practiceContextStr,
        studentProfileStr,
        coachModePayload,
        learningMemoryCtx,
        strategyCtx,
        intelligenceCtx,
        section,
        onChunk,
        controller.signal
      );
      // Pin the final text: updates the streamed bubble, or appends it when the
      // buffered fallback returned everything at once (no chunks streamed). Stamp
      // a stable id so the async math guardrail below can find THIS reply later
      // even if the message list shifts (or fail to find it if the thread reset).
      const replyId = `reply-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          const next = [...prev];
          next[next.length - 1] = { ...last, content: response, id: replyId };
          return next;
        }
        return [...prev, { role: 'assistant', content: response, id: replyId }];
      });

      // ── Server math guardrail (fire-and-forget) ──────────────────────────
      // Only for a REVEALED MATH item whose reply makes a numeric claim: verify
      // the reply doesn't contradict the answer key and attach a small
      // "Correction" note if it does. Never blocks or delays the reply —
      // checkTutorMath fails open ({ ok: true }) on any error/timeout/non-200.
      // Runs at most once per assistant reply (single call after completion).
      if (
        section !== 'rw' &&
        practiceContext?.answerRevealed &&
        practiceContext?.correctAnswer &&
        typeof response === 'string' &&
        /\d/.test(response)
      ) {
        const pc = practiceContext;
        checkTutorMath({
          reply: response,
          question: pc.question,
          correctAnswer: pc.correctAnswer,
          selectedAnswer: pc.selectedAnswer,
          choices: pc.choices,
        })
          .then((verdict) => {
            if (!verdict || verdict.ok !== false || !verdict.correction) return;
            // Stale-guard: drop silently if the chat closed, the component
            // unmounted, or the thread moved on to another question (the id is
            // gone from the committed message list).
            if (!mountedRef.current || !isOpenRef.current) return;
            if (!messagesRef.current.some(m => m.id === replyId)) return;
            setMessages(prev => {
              const idx = prev.findIndex(m => m.id === replyId);
              if (idx === -1) return prev;
              const next = [...prev];
              next[idx] = { ...next[idx], correction: verdict.correction };
              return next;
            });
            // Telemetry (fail-silent): only when a correction is actually shown.
            if (user?.uid) {
              try {
                trackEvent(user.uid, 'tutor', 'tutor_math_correction', {
                  questionKey: makeQuestionKey({ id: pc.questionId, text: pc.question }),
                });
              } catch { /* telemetry must never throw */ }
            }
          })
          .catch(() => { /* fail open: never surface a guardrail error */ });
      }
    } catch (error) {
      // A deliberate abort (unmount / conversation switch) is not a failure —
      // no error bubble, no retry.
      if (error?.name === 'AbortError') return;
      // Classify the failure by HTTP status first (aiTutorService attaches
      // err.status when the server responded), falling back to message text
      // for status-less errors (network failures, mid-stream errors).
      //
      // Server contract (functions/src/index.ts, aiTutor handler):
      //   401 "Authentication required"                 → session expired
      //   402 "subscription_required"                   → paywall
      //   429 "Too many requests. Please wait a minute" → per-user rate limit
      //   429 "The AI service is busy..."               → upstream throttle
      //   5xx (500/502) generic messages                → server/upstream fault
      // A server outage must NOT fall through to the "check your internet
      // connection" default — it isn't a client network problem.
      const raw = (error.message || '').toLowerCase();
      const status = typeof error.status === 'number' ? error.status : null;
      let errorMessage = "I couldn't connect right now. Please check your internet connection and try again.";
      if (status === 402 || raw.includes('subscription_required') || raw.includes('subscription required')) {
        errorMessage = 'Your free trial has ended, so the AI tutor is paused. Subscribe from your Profile to keep going.';
      } else if (status === 429 && raw.includes('busy')) {
        errorMessage = "The AI tutor is temporarily unavailable. Please try again in a moment.";
      } else if (status === 429 || raw.includes('too many') || raw.includes('rate') || raw.includes('limit')) {
        errorMessage = "You've sent a lot of messages in a short time. Please wait a minute, then try again.";
      } else if (status === 401 || raw.includes('authenticat') || raw.includes('sign in') || raw.includes('401')) {
        errorMessage = "Your session expired. Refresh the page (or sign out and back in), then try again.";
      } else if ((status !== null && status >= 500) || raw.includes('busy') || raw.includes('unavailable') || raw.includes('temporarily') || raw.includes('server error') || raw.includes('not configured')) {
        errorMessage = "The AI tutor is temporarily unavailable. Please try again in a moment.";
      } else if (raw.includes('timeout') || raw.includes('took too long')) {
        errorMessage = "The request took too long. Please try again with a shorter question.";
      }
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: errorMessage,
          isError: true,
          retryText: text,
        }
      ]);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsLoading(false);
      setIsStreaming(false);
    }
    return true;
  };

  const handleKeyDown = (e) => {
    // Enter sends; Shift+Enter inserts a newline; Cmd/Ctrl+Enter also sends.
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Whether to render the header close button. Several embedded shells pass a
  // no-op `onClose={() => {}}` to mean "no close affordance here." The old
  // check compared onClose.toString() to the literal '() => {}', which a
  // production minifier rewrites (`()=>{}`, whitespace stripped, etc.) so the
  // button rendered but did nothing. Match any empty-bodied function form
  // instead — robust across minification, and touches only this file. (Cleaner
  // long-term: those shells should omit onClose / pass undefined.)
  const NOOP_FN_RE = /^\s*(?:function\s*)?\(\s*\)\s*(?:=>)?\s*\{\s*\}\s*$/;
  const showCloseButton = typeof onClose === 'function' && !NOOP_FN_RE.test(onClose.toString());

  if (!isOpen) return null;

  return (
    <div
      ref={chatContainerRef}
      role="dialog"
      aria-label="AI Tutor Chat"
      aria-modal={isExpanded ? 'true' : 'false'}
      style={{
        ...(premiumLearnMode ? {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'saturate(180%) blur(24px)',
          WebkitBackdropFilter: 'saturate(180%) blur(24px)',
          fontFamily: design.typography.fontFamily,
          borderRadius: standalone ? '16px' : (embedded ? '0px' : '24px'),
        } : {
          marginTop: '0px',
          borderRadius: standalone ? '16px' : (embedded ? '0px' : '20px'),
          background: design.colors.surface.primary,
          boxShadow: standalone || embedded ? 'none' : design.shadow.large,
          overflow: 'hidden',
          fontFamily: design.typography.fontFamily,
          animation: standalone || embedded ? 'none' : 'chatSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          border: embedded ? 'none' : `1px solid ${design.colors.border.light}`,
          display: 'flex',
          flexDirection: 'column',
          height: standalone ? 'calc(100vh - 160px)' : (embedded ? '100%' : '100%'),
          minHeight: standalone ? '500px' : (embedded ? '0' : undefined),
        }),
        // Full-screen overlay when expanded — overrides the embedded strip.
        ...(isExpanded ? {
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: 'none',
          maxHeight: 'none',
          minHeight: 0,
          borderRadius: 0,
          zIndex: 2000,
          background: premiumLearnMode ? 'rgba(255,255,255,0.92)' : design.colors.surface.primary,
        } : {}),
      }}
    >
      {/* Header */}
      {!headerCompact && !premiumLearnMode && (
        <div
          style={{
            padding: '18px 24px',
            background: design.colors.surface.primary,
            borderBottom: `1px solid ${design.colors.border.light}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TutorMark size={28} />
            <span style={{
              fontSize: '17px',
              fontWeight: '600',
              color: design.colors.text.primary,
              letterSpacing: '-0.02em'
            }}>
              SEVA
            </span>
            {isVideoLesson && videoTranscript && (
              <span style={{
                background: 'rgba(52, 199, 89, 0.12)',
                color: designColors.semantic.success,
                padding: '5px 12px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0.01em'
              }}>
                Watching with you
              </span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? 'Collapse tutor' : 'Expand tutor to full screen'}
            title={isExpanded ? 'Collapse' : 'Expand'}
            style={{
              background: design.colors.surface.secondary,
              border: 'none', width: '30px', height: '30px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: design.colors.text.secondary, marginRight: '6px',
            }}
          >
            {isExpanded
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" /></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>}
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            style={{
              background: design.colors.surface.secondary,
              border: 'none',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: design.colors.text.secondary,
              fontSize: '16px',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = design.colors.border.medium;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = design.colors.surface.secondary;
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {headerCompact && !premiumLearnMode && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '28px 28px 16px',
          borderBottom: `1px solid ${design.colors.border.light}`,
          background: design.colors.surface.primary,
        }}>
          <TutorMark size={32} />
          <h3 style={{
            fontSize: '18px', fontWeight: '700',
            color: design.colors.text.primary, margin: 0,
          }}>
            AI Tutor
          </h3>
        </div>
      )}

      {premiumLearnMode && (
        <div
          style={{
            padding: '24px 24px 16px',
            borderBottom: `1px solid rgba(0,0,0,0.06)`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'transparent',
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <TutorMark size={24} radius={6} />
              <span style={{
                fontSize: '18px',
                fontWeight: '800',
                color: design.colors.text.primary,
                letterSpacing: '-0.03em'
              }}>
                Assisted Help
              </span>
            </div>
            {lessonTitle && (
              <div style={{ fontSize: '13px', color: design.colors.text.secondary, fontWeight: '500', marginTop: '2px' }}>
                {lessonTitle}
              </div>
            )}
            {isVideoLesson && videoTranscript && (
              <div style={{ marginTop: '8px' }}>
                <span style={{
                  background: 'rgba(52, 199, 89, 0.1)',
                  color: designColors.semantic.success,
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: designColors.semantic.success, animation: 'pulse 2s infinite' }} />
                  Watching with you
                </span>
              </div>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close chat"
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                border: 'none',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: design.colors.text.secondary,
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
              }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        onScroll={handleMessagesScroll}
        style={premiumLearnMode ? {
          flex: 1,
          minHeight: '200px',
          overflowY: 'auto',
          padding: '24px',
          background: 'transparent',
          position: 'relative',
        } : {
          flex: 1,
          minHeight: '200px',
          overflowY: 'auto',
          padding: '24px',
          background: design.colors.surface.tertiary,
          position: 'relative',
        }}
      >
        {/* Proactive Recommendation */}
        {proactiveRec && messages.length === 0 && (
          <ProactiveHint
            recommendation={proactiveRec}
            onDismiss={handleProactiveDismiss}
            onAccept={handleProactiveAccept}
          />
        )}

        {messages.length === 0 ? (
          <div style={premiumLearnMode ? {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '10px 0',
          } : {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '20px'
          }}>
            {premiumLearnMode ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                marginBottom: '24px'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: design.colors.text.primary,
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}>
                  {isPracticeQuestion
                    ? (trapWelcome ? trapWelcome.title : (practiceContext?.answerRevealed ? "Let's review" : "Need a hint?"))
                    : (isVideoLesson && videoTranscript
                      ? "I'm watching with you"
                      : "How can I help?")
                  }
                </div>
                <div style={{
                  fontSize: '14px',
                  color: design.colors.text.secondary,
                  lineHeight: '1.5'
                }}>
                  {isPracticeQuestion
                    ? (trapWelcome ? trapWelcome.body : (practiceContext?.answerRevealed
                      ? "I can explain the solution and answer any questions."
                      : "I can guide your thinking without giving away the answer."))
                    : (isVideoLesson && videoTranscript
                      ? "Ask me about any step in the video, and I'll explain it."
                      : "Ask me anything about this lesson or how it applies to the test.")
                  }
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '16px' }} aria-hidden="true">
                  <TutorMark size={56} radius={16} />
                </div>
                <div style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: design.colors.text.primary,
                  marginBottom: '6px',
                  letterSpacing: '-0.02em'
                }}>
                  {isPracticeQuestion
                    ? (trapWelcome ? trapWelcome.title : (practiceContext?.answerRevealed ? "Let's review" : "Need a hint?"))
                    : (isVideoLesson && videoTranscript
                      ? "Ask about any step"
                      : "How can I help?")
                  }
                </div>
                <div style={{
                  fontSize: '14px',
                  color: design.colors.text.tertiary,
                  marginBottom: '28px',
                  textAlign: 'center',
                  maxWidth: '280px',
                  lineHeight: '1.5'
                }}>
                  {isPracticeQuestion
                    ? (trapWelcome ? trapWelcome.body : (practiceContext?.answerRevealed
                      ? "I can explain the solution and answer any questions."
                      : "I can guide your thinking without giving away the answer."))
                    : (isVideoLesson && videoTranscript
                      ? "I can see what's happening in the video and explain it."
                      : "Ask me anything about this lesson.")
                  }
                </div>
              </>
            )}
            <div style={premiumLearnMode ? {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '100%'
            } : {
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              maxWidth: '340px'
            }}>
              {(() => {
                // Use smart prompts if skill progress is available; else defaults.
                const base = (
                  (skillProgress && isPracticeQuestion && getSmartPrompts()) ||
                  (isPracticeQuestion
                    ? (practiceContext?.answerRevealed
                      ? [
                        "Explain the solution",
                        "Why is that the answer?",
                        "Show me the steps"
                      ]
                      : [
                        "Explain the hint",
                        "What formula do I use?",
                        "How do I start?"
                      ])
                    : (isVideoLesson
                      ? [
                        "Explain this step",
                        "Why did he do that?",
                        "What formula is this?"
                      ]
                      : [
                        "Why this formula?",
                        "Explain again",
                        "Common mistakes?"
                      ]))
                );
                // When the answer key names the student's exact trap, lead with
                // it — that chip is the single highest-signal question they can
                // ask, and the system prompt already carries the parsed slip.
                const withTrap = trapWelcome
                  ? [{ label: 'Show me my exact mistake', prompt: 'Show me my exact mistake and how to catch it next time.' }, ...base]
                  : base;
                // Add the concept-teaching chip on practice questions (both math
                // and R&W). Kept last so the existing smart-prompt order is intact.
                return isPracticeQuestion ? [...withTrap, CONCEPT_CHIP] : withTrap;
              })().map((suggestion, i) => {
                // A chip is either a plain string (label === prompt) or a
                // { label, prompt } pair so a short label can send a richer prompt.
                const chip = typeof suggestion === 'string'
                  ? { label: suggestion, prompt: suggestion }
                  : suggestion;
                return (
                <button
                  key={i}
                  onClick={() => handleSend(chip.prompt)}
                  style={premiumLearnMode ? {
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: design.colors.text.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: design.typography.fontFamily,
                    textAlign: 'left',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  } : {
                    padding: '10px 18px',
                    background: design.colors.surface.primary,
                    border: `1px solid ${design.colors.border.medium}`,
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: design.colors.text.secondary,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: design.typography.fontFamily,
                  }}
                  onMouseOver={(e) => {
                    if (premiumLearnMode) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                    } else {
                      e.currentTarget.style.background = design.colors.surface.secondary;
                      e.currentTarget.style.borderColor = design.colors.border.medium;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (premiumLearnMode) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
                    } else {
                      e.currentTarget.style.background = design.colors.surface.primary;
                      e.currentTarget.style.borderColor = design.colors.border.medium;
                    }
                  }}
                >
                  {chip.label}
                  {premiumLearnMode && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  )}
                </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                msg={msg}
                isLast={idx === messages.length - 1}
                premiumLearnMode={premiumLearnMode}
                isLoading={isLoading}
                isStreaming={isStreaming}
                onRetry={handleRetry}
                onRegenerate={handleRegenerate}
                onFeedback={handleMessageFeedback}
              />
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                {premiumLearnMode && (
                  <TutorMark size={28} style={{ marginRight: '12px' }} />
                )}
                <div
                  style={premiumLearnMode ? {
                    padding: '16px 20px',
                    borderRadius: '4px 18px 18px 18px',
                    background: '#ffffff',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                  } : {
                    padding: '16px 20px',
                    borderRadius: '18px 18px 18px 4px',
                    background: design.colors.surface.primary,
                    boxShadow: design.shadow.small,
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: design.colors.text.tertiary,
                          animation: `typingPulse 1.4s ease-in-out ${i * 0.15}s infinite`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {!isLoading && !isStreaming && messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && !messages[messages.length - 1]?.isError && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px', marginBottom: '4px', paddingLeft: premiumLearnMode ? '40px' : '0' }}>
                {getFollowUpPrompts().map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(p)}
                    style={{
                      padding: '7px 13px',
                      borderRadius: '999px',
                      border: '1px solid rgba(234, 88, 12, 0.25)',
                      background: 'rgba(234, 88, 12, 0.06)',
                      color: '#9a3412',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      fontFamily: design.typography.fontFamily,
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(234, 88, 12, 0.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(234, 88, 12, 0.06)'; }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
        {showJumpPill && (
          <button
            type="button"
            onClick={() => {
              nearBottomRef.current = true;
              setShowJumpPill(false);
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Jump to latest message"
            style={{
              position: 'sticky',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: design.typography.fontFamily,
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
            }}
          >
            New messages
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Input Area */}
      <div
        style={premiumLearnMode ? {
          padding: '16px 24px 24px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,1) 100%)',
          position: 'relative',
          zIndex: 10,
        } : {
          padding: '16px 20px',
          background: design.colors.surface.primary,
          borderTop: `1px solid ${design.colors.border.light}`,
        }}
      >
        {sendNotice && (
          <div
            role="status"
            style={{
              margin: '0 0 8px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#9a3412',
              fontFamily: design.typography.fontFamily,
            }}
          >
            {sendNotice}
          </div>
        )}
        <CoachModePicker
          activeMode={coachMode}
          onSelectMode={setCoachMode}
          answerRevealed={practiceContext?.answerRevealed}
          isCorrect={practiceContext?.isCorrect}
        />
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end'
        }}>
          <div style={{
            flex: 1,
            position: 'relative',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Auto-grow: fit the content up to the 120px max-height.
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={premiumLearnMode ? "Ask me anything..." : "Message..."}
              aria-label="Type your message"
              rows={1}
              style={premiumLearnMode ? {
                width: '100%',
                padding: '16px 20px',
                borderRadius: '24px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                // 16px (not 15px) so iOS/iPadOS Safari does not auto-zoom the
                // page when the composer is focused.
                fontSize: '16px',
                fontFamily: design.typography.fontFamily,
                resize: 'none',
                outline: 'none',
                maxHeight: '120px',
                lineHeight: '1.5',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'rgba(255, 255, 255, 0.8)',
                color: design.colors.text.primary,
                boxSizing: 'border-box',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              } : {
                width: '100%',
                padding: '14px 18px',
                borderRadius: '24px',
                border: `1px solid ${design.colors.border.medium}`,
                // 16px (not 15px) so iOS/iPadOS Safari does not auto-zoom the
                // page when the composer is focused.
                fontSize: '16px',
                fontFamily: design.typography.fontFamily,
                resize: 'none',
                outline: 'none',
                maxHeight: '120px',
                lineHeight: '1.5',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                background: design.colors.surface.secondary,
                color: design.colors.text.primary,
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (premiumLearnMode) {
                  e.target.style.borderColor = 'rgba(234, 88, 12, 0.35)';
                  e.target.style.boxShadow = `0 4px 24px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(234, 88, 12, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.5)`;
                  e.target.style.background = '#ffffff';
                } else {
                  e.target.style.borderColor = design.colors.accent.orange;
                  e.target.style.boxShadow = `0 0 0 3px rgba(234, 88, 12, 0.1)`;
                  e.target.style.background = design.colors.surface.primary;
                }
              }}
              onBlur={(e) => {
                if (premiumLearnMode) {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  e.target.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(255, 255, 255, 0.5)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                } else {
                  e.target.style.borderColor = design.colors.border.medium;
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = design.colors.surface.secondary;
                }
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isStreaming}
            aria-label={isLoading || isStreaming ? "Sending message" : "Send message"}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: input.trim() && !isLoading && !isStreaming
                ? design.colors.accent.orange
                : design.colors.surface.secondary,
              cursor: input.trim() && !isLoading && !isStreaming ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseOver={(e) => {
              if (input.trim() && !isLoading && !isStreaming) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{
                transform: 'rotate(-45deg)',
                marginLeft: '2px',
              }}
            >
              <path
                d="M22 2L11 13"
                stroke={input.trim() && !isLoading && !isStreaming ? 'white' : design.colors.text.tertiary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke={input.trim() && !isLoading && !isStreaming ? 'white' : design.colors.text.tertiary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typingPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

// AiTutorButton (the "Ask SEVA" pill) was extracted to ./AiTutorButton.jsx in
// the Stage-1 code-split so App.jsx can keep it eager while this chat module
// (katex + aiTutorService + knowledgeBase) loads as its own lazy chunk.

export default AiTutorChat;
