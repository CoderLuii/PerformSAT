#!/usr/bin/env node
/**
 * evalTutorVoice.mjs — does the AI tutor sound like a person?
 *
 * Extracts the LIVE system prompts from src/services/aiTutorService.js, runs
 * realistic student scenarios through the exact production model settings
 * (claude-sonnet-5, thinking disabled, effort medium, max_tokens 4000), and
 * lints every reply for the AI-tells the VOICE section bans: formulaic
 * openers, closing ceremony, missing contractions, exclamation spam,
 * bullet-pointed conversation, self-reference as an AI.
 *
 * Two ways to run:
 *   1. Direct Anthropic call (fastest):
 *      ANTHROPIC_API_KEY=sk-ant-... node scripts/evalTutorVoice.mjs
 *   2. Through the DEPLOYED aiTutor Cloud Function — the real production path,
 *      authenticated as the dogfood test account (same env vars the e2e suite
 *      uses; the Firebase web key is read from .env.local automatically):
 *      PERFORMSAT_TEST_EMAIL=... PERFORMSAT_TEST_PASSWORD=... node scripts/evalTutorVoice.mjs
 *
 * Flags: --scenario=<id> to run one, --full to print untruncated replies.
 * Exit code 0 when every scenario passes the lint; 1 otherwise — safe to wire
 * into a pre-deploy check later.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API_KEY = process.env.ANTHROPIC_API_KEY;
const TEST_EMAIL = process.env.PERFORMSAT_TEST_EMAIL;
const TEST_PASSWORD = process.env.PERFORMSAT_TEST_PASSWORD;
if (!API_KEY && !(TEST_EMAIL && TEST_PASSWORD)) {
  console.error('Provide ANTHROPIC_API_KEY (direct mode) or PERFORMSAT_TEST_EMAIL + PERFORMSAT_TEST_PASSWORD (production-function mode).');
  process.exit(1);
}

// ── Production-function mode helpers ─────────────────────────────────────────
// Reads CRA-style keys out of .env.local without a dotenv dependency.
const readEnvLocal = (key) => {
  try {
    const env = readFileSync(join(ROOT, '.env.local'), 'utf8');
    const line = env.split('\n').find((l) => l.startsWith(`${key}=`));
    return line ? line.slice(key.length + 1).trim() : null;
  } catch {
    return null;
  }
};

const AI_TUTOR_URL = readEnvLocal('REACT_APP_AI_TUTOR_URL') || 'https://aitutor-ki77ua6x2a-uc.a.run.app';

/** Sign in the dogfood test account via the Identity Toolkit REST API. */
const signInTestAccount = async () => {
  const webKey = readEnvLocal('REACT_APP_FIREBASE_API_KEY');
  if (!webKey) throw new Error('REACT_APP_FIREBASE_API_KEY not found in .env.local');
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD, returnSecureToken: true }),
    }
  );
  if (!res.ok) throw new Error(`Test-account sign-in failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).idToken;
};

const args = process.argv.slice(2);
const onlyScenario = (args.find((a) => a.startsWith('--scenario=')) || '').split('=')[1] || null;
const printFull = args.includes('--full');

// ── Extract the live prompts from the service source ────────────────────────
// The prompts are template literals; internal backticks are escaped (\`), so
// the raw sequence "`;" only appears at each literal's true end.
const source = readFileSync(join(ROOT, 'src/services/aiTutorService.js'), 'utf8');

const extractLiteral = (constName) => {
  const start = source.indexOf(`const ${constName} = \``);
  if (start === -1) throw new Error(`Could not find ${constName} in aiTutorService.js`);
  const bodyStart = start + `const ${constName} = \``.length;
  const end = source.indexOf('`;', bodyStart);
  if (end === -1) throw new Error(`Unterminated literal for ${constName}`);
  return source
    .slice(bodyStart, end)
    .replace(/\\`/g, '`')
    .replace(/\\\$\{/g, '${');
};

const TUTOR_VOICE = extractLiteral('TUTOR_VOICE');
const TUTOR_LAYOUT = extractLiteral('TUTOR_LAYOUT');
// The prompts interpolate ${TUTOR_VOICE} + ${TUTOR_LAYOUT}; substitute them the way the bundle does.
const SYSTEM_PROMPT = extractLiteral('SYSTEM_PROMPT')
  .replace('${TUTOR_VOICE}', TUTOR_VOICE)
  .replace('${TUTOR_LAYOUT}', TUTOR_LAYOUT);

// ── Scenarios: realistic practice contexts + student messages ───────────────
const QUESTION_CONTEXT = `
>>> PRACTICE QUESTION CONTEXT <<<
The student is working on this SAT Math practice question:
DIFFICULTY: MEDIUM
SKILLS TESTED: Linear equations in two variables
TYPE: Multiple choice

QUESTION: A gym charges a one-time membership fee of $50 plus $15 per month. Which equation gives the total cost C, in dollars, after m months?

ANSWER CHOICES:
A) C = 50m + 15
B) C = 15m + 50
C) C = 65m
D) C = 15m - 50

>>> ANSWER HAS BEEN REVEALED — EXPERT BREAKDOWN MODE <<<
STUDENT CHOSE: A
RESULT: WRONG
CORRECT ANSWER: B
FULL EXPLANATION: **Choice B is correct.** The monthly rate $15$ multiplies the number of months $m$, and the one-time fee $50$ is the constant.
**Why the wrong answers are tempting:**
* Choice A ($C = 50m + 15$): swaps the rate and the fee — treats the one-time fee as if it repeats monthly.
* Choice C ($C = 65m$): adds the fee into the monthly rate.
* Choice D ($C = 15m - 50$): subtracts the fee instead of adding it.

THE STUDENT'S SPECIFIC ERROR (from the answer key): Choice A = swaps the rate and the fee — treats the one-time fee as if it repeats monthly. Do not guess at their mistake — this IS their mistake; coach them on recognizing and avoiding exactly this trap.
`;

const SCENARIOS = [
  {
    id: 'frustrated',
    label: 'Frustrated student, wrong answer',
    system: SYSTEM_PROMPT + '\n\n' + QUESTION_CONTEXT,
    messages: [{ role: 'user', content: "ugh i ALWAYS mix these up. i'm so bad at word problems" }],
  },
  {
    id: 'quick',
    label: 'Quick narrow question',
    system: SYSTEM_PROMPT + '\n\n' + QUESTION_CONTEXT,
    messages: [{ role: 'user', content: 'why is it B and not A' }],
  },
  {
    id: 'followup',
    label: 'Multi-turn follow-up (opener variety check)',
    system: SYSTEM_PROMPT + '\n\n' + QUESTION_CONTEXT,
    messages: [
      { role: 'user', content: 'why is it B and not A' },
      { role: 'assistant', content: "B puts the $15 where it belongs — multiplying the months. The $50 fee happens once, so it stands alone as the constant. A swaps them: it charges you the $50 fee every single month and tacks the monthly rate on once. Same numbers, opposite jobs." },
      { role: 'user', content: 'ok but how do i not fall for that next time' },
    ],
  },
  {
    id: 'walkthrough',
    label: 'Full walkthrough after a miss (LAYOUT check)',
    system: SYSTEM_PROMPT + '\n\n' + QUESTION_CONTEXT,
    messages: [{ role: 'user', content: "i got this wrong. can you walk me through the whole thing start to finish — i want to actually get it" }],
  },
  {
    id: 'wantsanswer',
    label: 'Wants the answer (Socratic, pre-reveal)',
    system: SYSTEM_PROMPT + '\n\n' + QUESTION_CONTEXT.replace(/>>> ANSWER HAS BEEN REVEALED[\s\S]*$/, ''),
    messages: [{ role: 'user', content: 'just tell me the answer i dont have time' }],
  },
];

// ── The AI-tell lint ─────────────────────────────────────────────────────────
const BANNED_PATTERNS = [
  [/^\s*(great|good|excellent|awesome) question/i, 'formulaic opener ("Great question")'],
  [/^\s*(certainly|absolutely|of course|sure)[!,.]/i, 'formulaic opener ("Certainly!")'],
  [/i'?d be happy to/i, '"I\'d be happy to"'],
  [/let'?s dive in/i, '"Let\'s dive in"'],
  [/it'?s worth noting/i, '"It\'s worth noting"'],
  [/i hope this helps/i, '"I hope this helps"'],
  [/feel free to (ask|reach)/i, '"Feel free to ask"'],
  [/does (that|this) make sense\s*\?\s*$/im, 'closing "Does that make sense?"'],
  [/as an ai\b|as a language model|i'?m an ai\b/i, 'self-identifies as AI'],
  [/the information provided|based on the context/i, 'mentions its context'],
];

const lintReply = (text) => {
  const problems = [];
  for (const [re, label] of BANNED_PATTERNS) {
    if (re.test(text)) problems.push(label);
  }
  const bangs = (text.match(/!/g) || []).length;
  if (bangs > 1) problems.push(`${bangs} exclamation points (max 1)`);
  // Stiff register: uncontracted forms in prose. Allow a couple (quotes of the
  // question, formal statements); flag when they dominate.
  const stiff = (text.match(/\b(do not|that is|it is|you are|there is)\b/gi) || []).length;
  const loose = (text.match(/\b(don't|that's|it's|you're|there's|here's|can't|won't|isn't)\b/gi) || []).length;
  if (stiff > 2 && stiff > loose) problems.push(`stiff register (${stiff} uncontracted vs ${loose} contracted)`);
  // Bullet-pointed conversation: lists in a short reply.
  const bullets = (text.match(/^\s*[-*•]\s/gm) || []).length;
  if (bullets > 0 && text.length < 500) problems.push(`${bullets} bullets in a short reply`);
  // LAYOUT contract (2026-07-15): a long teaching reply must be scannable.
  // Mid-length replies (>900 chars) need bold on the deciding words and no
  // wall paragraphs — bullets + short paragraphs already make them scannable.
  // Full walkthroughs (>1400 chars) additionally need ### subheadings.
  if (text.length > 900) {
    if (!/\*\*[^*\n]+\*\*/.test(text)) problems.push('long reply with no **bold** (LAYOUT)');
    const wallParagraphs = text.split(/\n\s*\n/).filter((p) => p.replace(/\s+/g, ' ').length > 420).length;
    if (wallParagraphs > 0) problems.push(`${wallParagraphs} wall paragraph(s) >420 chars (LAYOUT)`);
  }
  if (text.length > 1400 && !/^###\s/m.test(text)) {
    problems.push('walkthrough-length reply with no ### subheadings (LAYOUT)');
  }
  return problems;
};

// ── Run ──────────────────────────────────────────────────────────────────────
let idTokenPromise = null;

const callClaude = async (system, messages) => {
  if (API_KEY) {
    // Direct mode: mirror the Cloud Function's exact production parameters.
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 4000,
        thinking: { type: 'disabled' },
        output_config: { effort: 'medium' },
        system,
        messages,
      }),
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    return (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
  }
  // Production-function mode: the REAL path students hit — deployed proxy,
  // deployed model settings, buffered response ({content: string}).
  if (!idTokenPromise) idTokenPromise = signInTestAccount();
  const idToken = await idTokenPromise;
  const res = await fetch(AI_TUTOR_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
    body: JSON.stringify({ messages, system, stream: false }),
  });
  if (!res.ok) throw new Error(`aiTutor ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  if (typeof data.content !== 'string') throw new Error(`Unexpected aiTutor response shape: ${JSON.stringify(data).slice(0, 200)}`);
  return data.content;
};

let failures = 0;
for (const scenario of SCENARIOS) {
  if (onlyScenario && scenario.id !== onlyScenario) continue;
  process.stdout.write(`\n━━━ ${scenario.label} (${scenario.id}) ━━━\n`);
  try {
    const reply = await callClaude(scenario.system, scenario.messages);
    const problems = lintReply(reply);
    const preview = printFull ? reply : reply.slice(0, 600) + (reply.length > 600 ? '\n…[truncated, use --full]' : '');
    console.log(preview);
    if (problems.length) {
      failures++;
      console.log(`\nVOICE LINT: FAIL — ${problems.join('; ')}`);
    } else {
      console.log(`\nVOICE LINT: PASS (${reply.length} chars)`);
    }
  } catch (err) {
    failures++;
    console.error(`ERROR: ${err.message}`);
  }
}

console.log(`\n${failures === 0 ? 'ALL SCENARIOS PASS' : `${failures} scenario(s) FAILED the voice lint`}`);
process.exit(failures === 0 ? 0 : 1);
