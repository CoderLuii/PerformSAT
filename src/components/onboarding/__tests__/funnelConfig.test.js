/**
 * Contract tests for the pre-signup funnel content + profile mapping.
 *
 * The option `value` slugs are persisted into users/{uid}.onboardingProfile
 * at signup — they are a storage schema, not just copy. These tests pin
 * the invariants a refactor must not break: id/slug stability rules,
 * 4-option screens, step-table integrity, chapter mapping, the no-emoji
 * policy, and the exact translation buildFunnelProfile performs (goal
 * snapping + the goalScale:'composite' provenance stamp that keeps
 * normalizeProfileGoal from doubling sub-800 goals).
 */

import {
  FUNNEL_QUESTIONS,
  FUNNEL_INTERSTITIALS,
  FUNNEL_STEPS,
  FUNNEL_CHAPTERS,
  FUNNEL_VERSION,
  FUNNEL_PROOF_POINTS,
  DEFAULT_FUNNEL_GOAL,
  chapterFills,
  reassureHeading,
  buildInterludeLines,
  goalContextLine,
  normalizeFunnelGoal,
  buildFunnelProfile,
  FUNNEL_ACKS,
  funnelAckFor,
  reassureBody,
  rightMinutesCopy,
  neverStuckCopy,
  buildPathRecap,
  signupBodyLine,
  pathStepThreeSub,
} from '../funnelConfig';

// Emoji + dingbat/symbol blocks — UI copy must never contain emojis.
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

describe('funnel content invariants', () => {
  test('question ids are unique', () => {
    const ids = FUNNEL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every question has 2-4 options with unique stable values', () => {
    for (const q of FUNNEL_QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.options.length).toBeLessThanOrEqual(4);
      const values = q.options.map((o) => o.value);
      expect(new Set(values).size).toBe(values.length);
      for (const v of values) expect(v).toMatch(/^[a-z0-9]+$/i);
    }
    // The commitment micro-question is deliberately binary — a commitment
    // device (both answers affirmative), not a filter.
    const commitment = FUNNEL_QUESTIONS.find((q) => q.id === 'commitment');
    expect(commitment.options).toHaveLength(2);
    // Standard quiz questions keep the 4-option pattern.
    for (const q of FUNNEL_QUESTIONS) {
      if (q.id !== 'commitment') expect(q.options).toHaveLength(4);
    }
  });

  test('every question maps to a real chapter', () => {
    for (const q of FUNNEL_QUESTIONS) {
      expect(FUNNEL_CHAPTERS[q.chapter]).toBeDefined();
    }
    // Chapters are traversed in order — question chapter indexes never decrease.
    const chapterSeq = FUNNEL_STEPS
      .filter((s) => s.type === 'question')
      .map((s) => FUNNEL_QUESTIONS.find((q) => q.id === s.id).chapter);
    for (let i = 1; i < chapterSeq.length; i++) {
      expect(chapterSeq[i]).toBeGreaterThanOrEqual(chapterSeq[i - 1]);
    }
  });

  test('FUNNEL_STEPS references only real questions/interstitials, converts via goal → build → path → signup', () => {
    for (const step of FUNNEL_STEPS) {
      if (step.type === 'question') {
        expect(FUNNEL_QUESTIONS.some((q) => q.id === step.id)).toBe(true);
      }
      if (step.type === 'interstitial') {
        expect(FUNNEL_INTERSTITIALS[step.id]).toBeDefined();
      }
    }
    // Every question appears exactly once in the flow.
    const questionSteps = FUNNEL_STEPS.filter((s) => s.type === 'question');
    expect(questionSteps).toHaveLength(FUNNEL_QUESTIONS.length);
    // The name step opens the flow (personalization thread starts there).
    expect(FUNNEL_STEPS[0].type).toBe('name');
    // The funnel must end by converting: goal → build → path → signup.
    const tail = FUNNEL_STEPS.slice(-4).map((s) => s.type);
    expect(tail).toEqual(['goal', 'build', 'path', 'signup']);
  });

  test('copy contains no emojis and never names the competitor', () => {
    const allCopy = JSON.stringify({
      FUNNEL_QUESTIONS,
      FUNNEL_INTERSTITIALS,
      FUNNEL_CHAPTERS,
      FUNNEL_PROOF_POINTS,
      lines: buildInterludeLines({ timing: '2to6m' }, 1450, 'Maya'),
      headings: ['confident', 'fine', 'stressed', 'heavy', undefined].map((f) =>
        reassureHeading(f, 'Maya')
      ),
      FUNNEL_ACKS,
      variants: FUNNEL_QUESTIONS.flatMap((q) => q.options.map((o) => JSON.stringify([
        reassureBody({ baseline: o.value }),
        rightMinutesCopy({ sessionLength: o.value }),
        neverStuckCopy({ stuckHabit: o.value, testReaction: o.value }),
        buildPathRecap({ [q.id]: o.value }),
        signupBodyLine({ [q.id]: o.value }),
        pathStepThreeSub({ blocker: o.value }),
      ]))),
    });
    expect(allCopy).not.toMatch(EMOJI_RE);
    expect(allCopy).not.toMatch(/acely/i);
  });

  test('proof points claim only the real content inventory (no student counts, no guarantees)', () => {
    const joined = FUNNEL_PROOF_POINTS.join(' ');
    expect(joined).not.toMatch(/students?/i);
    expect(joined).not.toMatch(/guarantee/i);
    expect(joined).toContain('2,200+');
    expect(joined).toContain('12 full-length');
  });
});

describe('reassureHeading', () => {
  test('covers every feeling answer, with and without a name', () => {
    const feelings = FUNNEL_QUESTIONS.find((q) => q.id === 'feeling').options.map((o) => o.value);
    for (const f of feelings) {
      expect(reassureHeading(f, 'Maya')).toContain('Maya');
      expect(reassureHeading(f, '').length).toBeGreaterThan(10);
    }
  });

  test('unknown feeling falls back to the neutral heading', () => {
    expect(reassureHeading(undefined, 'Maya')).toBe('Wherever you start, the path is the same.');
  });
});

describe('buildInterludeLines', () => {
  test('weaves name, timing, and goal into the four lines', () => {
    const lines = buildInterludeLines({ timing: '2to6m' }, 1450, 'Maya');
    expect(lines).toHaveLength(4);
    expect(lines[0]).toContain('Maya');
    expect(lines[2]).toContain('2–6 months');
    expect(lines[3]).toContain('1450');
  });

  test('degrades cleanly without name or timing', () => {
    const lines = buildInterludeLines({}, DEFAULT_FUNNEL_GOAL, '');
    expect(lines[0]).toBe('Reading your answers');
    expect(lines[2]).toBe('Calibrating your pacing');
    expect(lines[3]).toContain(String(DEFAULT_FUNNEL_GOAL));
  });
});

describe('FUNNEL_ACKS + funnelAckFor (the tutor-thread contract)', () => {
  const ACKED_QUESTIONS = ['timing', 'baseline', 'stuckHabit', 'studyWindow', 'blocker', 'motivation', 'commitment'];

  test('every option value of every acked question has a voice-rule-compliant line', () => {
    for (const qid of ACKED_QUESTIONS) {
      const q = FUNNEL_QUESTIONS.find((x) => x.id === qid);
      for (const opt of q.options) {
        const line = FUNNEL_ACKS[qid][opt.value];
        expect(typeof line).toBe('string');
        expect(line.length).toBeGreaterThan(10);
        expect(line.length).toBeLessThanOrEqual(90); // <=2 short sentences, 90 chars total
        expect(line.split('. ').length).toBeLessThanOrEqual(2);
        expect(line).not.toMatch(/—/); // no em-dashes in new copy
        expect(line).not.toMatch(/you (said|mentioned)/i); // callback budget lives in the inner flow
        expect(line).not.toContain('undefined');
      }
    }
    // No stray ack sets for questions the display rule can never reach.
    expect(Object.keys(FUNNEL_ACKS).sort()).toEqual([...ACKED_QUESTIONS].sort());
  });

  test('display rule: ack renders ONLY when the preceding step is a question (7 sites, incl. goal)', () => {
    const answers = Object.fromEntries(
      FUNNEL_QUESTIONS.map((q) => [q.id, q.options[0].value])
    );
    const ackedStepIds = FUNNEL_STEPS
      .map((step, i) => ({ step, ack: funnelAckFor(i, answers) }))
      .filter(({ ack }) => ack !== null)
      .map(({ step }) => step.id);
    // baseline/feeling follow questions; stuckHabit/blocker/motivation follow
    // interstitials (no ack — the interstitial already reflected the answer);
    // the goal screen follows the commitment question, the flow's loudest yes.
    expect(ackedStepIds).toEqual([
      'baseline', 'feeling', 'studyWindow', 'sessionLength', 'testReaction', 'commitment', 'goal',
    ]);
  });

  test('missing or unknown answers render no ack (never "undefined")', () => {
    const baselineIdx = FUNNEL_STEPS.findIndex((s) => s.id === 'baseline');
    expect(funnelAckFor(baselineIdx, {})).toBeNull();
    expect(funnelAckFor(baselineIdx, { timing: 'not-a-slug' })).toBeNull();
    expect(funnelAckFor(0, { timing: 'lt2m' })).toBeNull(); // name step has no predecessor question
  });
});

describe('adaptive interstitials', () => {
  test('reassureBody: fresh gets the from-zero framing, studied keeps the plateau body', () => {
    expect(reassureBody({ baseline: 'fresh' })).toContain('Starting from zero');
    for (const b of ['sat', 'psat', 'practice', undefined]) {
      expect(reassureBody({ baseline: b })).toBe(FUNNEL_INTERSTITIALS.reassure.body);
    }
  });

  test('rightMinutesCopy: every sessionLength variant is authored; fallback = current copy', () => {
    const values = FUNNEL_QUESTIONS.find((q) => q.id === 'sessionLength').options.map((o) => o.value);
    for (const v of values) {
      const { heading, body } = rightMinutesCopy({ sessionLength: v });
      expect(heading.length).toBeGreaterThan(10);
      expect(body).toContain('question types you actually miss');
      expect(body).toContain('diagnostic');
    }
    const fallback = rightMinutesCopy({});
    expect(fallback.heading).toBe(FUNNEL_INTERSTITIALS.rightMinutes.heading);
    expect(fallback.body).toBe(FUNNEL_INTERSTITIALS.rightMinutes.body);
  });

  test('rightMinutesCopy 15m coheres with the commitment question (twenty minutes, not fifteen-is-enough)', () => {
    expect(rightMinutesCopy({ sessionLength: '15m' }).body).toContain('Twenty focused minutes');
  });

  test('neverStuckCopy: deflated softens the heading; bodies advance to the mechanism without re-naming the habit', () => {
    expect(neverStuckCopy({ testReaction: 'deflated' }).heading).toBe('A number without a plan just stings.');
    expect(neverStuckCopy({}).heading).toBe(FUNNEL_INTERSTITIALS.neverStuck.heading);
    const values = FUNNEL_QUESTIONS.find((q) => q.id === 'stuckHabit').options.map((o) => o.value);
    for (const v of values) {
      const { body } = neverStuckCopy({ stuckHabit: v });
      expect(body).toMatch(/tutor/i); // advances to the product mechanism
      expect(body).not.toMatch(/skip and hope|read the explanation/i); // never re-names the habit
    }
    expect(neverStuckCopy({}).body).toBe(FUNNEL_INTERSTITIALS.neverStuck.body);
  });
});

describe('buildPathRecap', () => {
  test('mirrors timing, sessions, and the blocker reframe; never a target row', () => {
    const rows = buildPathRecap({ timing: 'lt2m', sessionLength: '15m', studyWindow: 'evening', blocker: 'plateau' });
    expect(rows.map((r) => r.label)).toEqual(['Timing', 'Sessions', 'First job']);
    expect(rows[1].value).toBe('About 15 focused minutes, evenings');
    expect(rows[2].value).toBe('Break the plateau');
    expect(JSON.stringify(rows)).not.toMatch(/target|goal/i); // the chip owns the number
  });

  test('each row omits independently; empty answers yield no rows', () => {
    expect(buildPathRecap({}).length).toBe(0);
    expect(buildPathRecap({ timing: 'gt6m' }).map((r) => r.label)).toEqual(['Timing']);
    expect(buildPathRecap({ studyWindow: 'weekend' }).map((r) => r.label)).toEqual(['Sessions']);
    expect(buildPathRecap({ blocker: 'lost' }).map((r) => r.label)).toEqual(['First job']);
    expect(JSON.stringify(buildPathRecap({ sessionLength: 'varies' }))).not.toContain('undefined');
  });
});

describe('signupBodyLine + pathStepThreeSub + goalContextLine seasoning', () => {
  test('signup body is one consequence line with answers, null without', () => {
    expect(signupBodyLine({ timing: 'lt2m' })).toContain('saved the moment');
    expect(signupBodyLine({})).toBeNull();
  });

  test('path step 3 adapts only for the plateau blocker', () => {
    expect(pathStepThreeSub({ blocker: 'plateau' })).toContain('stuck score');
    expect(pathStepThreeSub({ blocker: 'busy' })).toBe('It rebuilds itself around what you miss, every session.');
    expect(pathStepThreeSub({})).toBe('It rebuilds itself around what you miss, every session.');
  });

  test('goalContextLine seasons self/pressure and leaves other motivations on the tier line', () => {
    expect(goalContextLine(1400, 'self')).toContain('chose for yourself');
    expect(goalContextLine(1400, 'pressure')).toContain('quiets the noise');
    expect(goalContextLine(1400, 'colleges')).toBe(goalContextLine(1400));
    expect(goalContextLine(1400, undefined)).toBe(goalContextLine(1400));
  });
});

describe('buildInterludeLines session sizing', () => {
  test('adds a fifth sizing line when sessionLength is answered', () => {
    const lines = buildInterludeLines({ timing: 'lt2m', sessionLength: '30m', studyWindow: 'evening' }, 1500, 'Maya');
    expect(lines).toHaveLength(5);
    expect(lines[3]).toBe('Sizing sessions to around half an hour, evenings');
    expect(lines[4]).toContain('1500');
  });

  test('sizing line works without a study window and never prints undefined', () => {
    const lines = buildInterludeLines({ sessionLength: '60m' }, 1500, '');
    expect(lines).toHaveLength(5);
    expect(lines[3]).toBe('Sizing sessions to an hour or more');
    expect(JSON.stringify(lines)).not.toContain('undefined');
  });
});

describe('chapterFills', () => {
  test('all empty at the name step, all full from the build step on', () => {
    expect(chapterFills(0)).toEqual([0, 0, 0, 0]);
    const buildIdx = FUNNEL_STEPS.findIndex((s) => s.type === 'build');
    expect(chapterFills(buildIdx)).toEqual([1, 1, 1, 1]);
    expect(chapterFills(FUNNEL_STEPS.length - 1)).toEqual([1, 1, 1, 1]);
  });

  test('fills are monotonic and bounded as the flow advances', () => {
    let prevTotal = -1;
    for (let i = 0; i < FUNNEL_STEPS.length; i++) {
      const fills = chapterFills(i);
      for (const f of fills) {
        expect(f).toBeGreaterThanOrEqual(0);
        expect(f).toBeLessThanOrEqual(1);
      }
      const total = fills.reduce((a, b) => a + b, 0);
      expect(total).toBeGreaterThanOrEqual(prevTotal);
      prevTotal = total;
    }
  });
});

describe('normalizeFunnelGoal', () => {
  test('snaps to the 10-point grid and clamps to 400-1600', () => {
    expect(normalizeFunnelGoal(1447)).toBe(1450);
    expect(normalizeFunnelGoal(200)).toBe(400);
    expect(normalizeFunnelGoal(2000)).toBe(1600);
    expect(normalizeFunnelGoal('1490')).toBe(1490);
  });

  test('falls back to the default on garbage', () => {
    expect(normalizeFunnelGoal('not-a-score')).toBe(DEFAULT_FUNNEL_GOAL);
    expect(normalizeFunnelGoal(undefined)).toBe(DEFAULT_FUNNEL_GOAL);
    expect(normalizeFunnelGoal(NaN)).toBe(DEFAULT_FUNNEL_GOAL);
  });
});

describe('goalContextLine', () => {
  test('returns a non-empty line at every tier boundary', () => {
    for (const goal of [400, 1140, 1150, 1290, 1300, 1390, 1400, 1490, 1500, 1600]) {
      const line = goalContextLine(goal);
      expect(typeof line).toBe('string');
      expect(line.length).toBeGreaterThan(10);
    }
  });
});

describe('buildFunnelProfile', () => {
  const VALID_ANSWERS = {
    timing: '2to6m',
    baseline: 'sat',
    feeling: 'stressed',
    stuckHabit: 'wrestle',
    studyWindow: 'evening',
    sessionLength: '30m',
    blocker: 'lost',
    testReaction: 'unsure',
    motivation: 'colleges',
  };

  test('maps a full quiz into the signup profile payload', () => {
    const p = buildFunnelProfile(VALID_ANSWERS, 1450, '2026-07-02T12:00:00.000Z');
    expect(p.targetScore).toBe(1450);
    expect(p.goalScale).toBe('composite');
    expect(p.hasTakenSAT).toBe(true); // baseline === 'sat'
    expect(p.onboardingProfile).toEqual({
      version: FUNNEL_VERSION,
      completedAt: '2026-07-02T12:00:00.000Z',
      answers: VALID_ANSWERS,
    });
  });

  test('hasTakenSAT is only true for a real SAT sitting', () => {
    expect(buildFunnelProfile({ baseline: 'psat' }, 1400).hasTakenSAT).toBe(false);
    expect(buildFunnelProfile({ baseline: 'practice' }, 1400).hasTakenSAT).toBe(false);
    expect(buildFunnelProfile({ baseline: 'fresh' }, 1400).hasTakenSAT).toBe(false);
    expect(buildFunnelProfile({}, 1400).hasTakenSAT).toBe(false);
  });

  test('drops unknown question keys and invalid option values', () => {
    const p = buildFunnelProfile(
      { timing: '2to6m', feeling: 'invented-slug', hacker: '<script>' },
      1400,
      'T'
    );
    expect(p.onboardingProfile.answers).toEqual({ timing: '2to6m' });
  });

  test('normalizes the goal (snap + clamp + default)', () => {
    expect(buildFunnelProfile({}, 1447).targetScore).toBe(1450);
    expect(buildFunnelProfile({}, 99999).targetScore).toBe(1600);
    expect(buildFunnelProfile({}, 'garbage').targetScore).toBe(DEFAULT_FUNNEL_GOAL);
  });

  test('tolerates a skipped quiz (empty answers) — goal-only profile', () => {
    const p = buildFunnelProfile(undefined, undefined, 'T');
    expect(p.targetScore).toBe(DEFAULT_FUNNEL_GOAL);
    expect(p.goalScale).toBe('composite');
    expect(p.onboardingProfile.answers).toEqual({});
  });
});
