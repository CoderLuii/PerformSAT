import { rwQuestionBank } from '../index';
import { deriveRWPattern, deriveRWQuestionType, RW_PATTERN_LABELS } from '../deriveRWPattern';

describe('deriveRWPattern (routing signal — grammar/punctuation/structure only)', () => {
  // Frozen distribution snapshot — a tripwire. If anyone re-authors R&W items
  // these counts shift; update them intentionally and re-check that every
  // routing-useful pattern still clears the Tier-1 threshold (>=8).
  //
  // deriveRWPattern is the ROUTING signal (feeds diagnostic missedPatterns), so
  // it tags ONLY grammar/punctuation/structure. The reading-comprehension BROWSE
  // types live in deriveRWQuestionType (separate describe below).
  const EXPECTED_COUNTS = {
    // FSS counts re-frozen 2026-06-17: grammar sub-types are decided by the
    // authoritative `rwGrammarType.js` map (per-item, by what varies across the
    // answer choices) instead of the explanation-prose heuristic.
    'boundaries-semicolon': 26,
    'boundaries-comma': 25,
    'boundaries-dash': 8,
    'boundaries-colon': 9,
    // transitions re-frozen 2026-09-01: recreated test 4 q51 converted from an
    // addition winner (Tier-3) to "Eventually," (sequence-time), restoring the
    // sequence-time bucket to the Tier-1 threshold of 8.
    'transitions-contrast': 26,
    'transitions-example-emphasis': 12,
    'transitions-cause-effect': 20,
    'transitions-sequence-time': 8,
    'tsp-main-purpose': 25,
    'tsp-overall-structure': 32,
    'tsp-function-of-underlined': 15,
    'fss-subject-verb-agreement': 26,
    'fss-verb-tense': 17,
    'fss-modifier-placement': 11,
    'fss-parallelism': 8,
    'fss-pronoun': 3,
    'fss-possessive': 5,
  };

  const counts = {};
  for (const item of rwQuestionBank) {
    const p = deriveRWPattern(item);
    if (p) counts[p] = (counts[p] || 0) + 1;
  }

  it('produces the frozen pattern distribution over the live bank (648 test items + authored fills)', () => {
    expect(counts).toEqual(EXPECTED_COUNTS);
  });

  it('tags exactly 276 grammar/structure items', () => {
    // 206 non-FSS (boundaries 68 + transitions 66 incl. 2 authored craft-pilot
    // fills — one test-5 item re-keyed to "Likewise," routes Tier-3 — + tsp 72
    // incl. 1 authored literary fill) + 70 FSS (72 items, 2 route Tier-3)
    // = 276. All reading skills return null here.
    const tagged = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(tagged).toBe(276);
  });

  it('returns null for every reading-comprehension item (routing stays deferred)', () => {
    const READING = new Set([
      'words-in-context', 'central-ideas-and-details', 'inferences',
      'command-of-evidence-quantitative', 'command-of-evidence-textual',
      'cross-text-connections', 'rhetorical-synthesis',
    ]);
    const tagged = rwQuestionBank.filter((q) => READING.has(q.skill) && deriveRWPattern(q) !== null);
    expect(tagged).toEqual([]);
  });

  it('every routing-useful pattern (label map) clears the Tier-1 threshold of 8', () => {
    for (const slug of Object.keys(RW_PATTERN_LABELS)) {
      expect(counts[slug]).toBeGreaterThanOrEqual(8);
    }
  });

  it('label map covers the 15 routing patterns and omits the sub-threshold slugs', () => {
    expect(Object.keys(RW_PATTERN_LABELS)).toHaveLength(15);
    expect(RW_PATTERN_LABELS['fss-pronoun']).toBeUndefined();
    expect(RW_PATTERN_LABELS['fss-possessive']).toBeUndefined();
    expect(RW_PATTERN_LABELS['fss-comparison']).toBeUndefined();
  });

  it('form-structure-and-sense FALLBACK heuristic: scopes to the first paragraph + verb-tense is the fallback', () => {
    // These synthetic items carry no id, so they are NOT in the authoritative
    // rwGrammarType map and exercise the explanation-prose fallback heuristic
    // (the path that still serves any future FSS item not yet classified).
    const mk = (explanation) => ({ skill: 'form-structure-and-sense', explanation, correctAnswer: 'A', choices: [{ id: 'A', text: 'x' }] });
    // Parallelism wins even though the distractor prose later mentions verb forms.
    expect(deriveRWPattern(mk('The items in a coordinated list must be parallel. Why the wrong answers are tempting: they use a different verb tense.'))).toBe('fss-parallelism');
    // Subject-verb agreement is detected before the generic verb-tense fallback.
    expect(deriveRWPattern(mk('The singular subject requires subject-verb agreement with a singular verb.'))).toBe('fss-subject-verb-agreement');
    // Plain tense item falls to the verb-tense bucket.
    expect(deriveRWPattern(mk('A completed historical event requires the simple past tense.'))).toBe('fss-verb-tense');
    // Subjunctive has no bucket → null → Tier-3.
    expect(deriveRWPattern(mk('Standard English uses the subjunctive mood in a that-clause governed by a verb of recommendation.'))).toBeNull();
  });

  it('returns null for math skills (no misfire on the diagnostic seam)', () => {
    expect(deriveRWPattern({ skill: 'slope-intercept-form', correctAnswer: 'A', choices: [{ id: 'A', text: 'x = 5;' }], question: 'Solve.' })).toBeNull();
    expect(deriveRWPattern({ skills: ['quadratic-formula'], correctAnswer: 'A', choices: [] })).toBeNull();
    expect(deriveRWPattern(null)).toBeNull();
  });

  it('boundaries: punctuation priority dash > semicolon > colon > comma', () => {
    const mk = (text) => ({ skill: 'boundaries', correctAnswer: 'A', choices: [{ id: 'A', text }] });
    expect(deriveRWPattern(mk('one thing—and, another'))).toBe('boundaries-dash'); // dash wins over comma
    expect(deriveRWPattern(mk('a clause; a clause'))).toBe('boundaries-semicolon');
    expect(deriveRWPattern(mk('a clause: a list'))).toBe('boundaries-colon');
    expect(deriveRWPattern(mk('a phrase, a phrase'))).toBe('boundaries-comma');
    expect(deriveRWPattern(mk('no marks here'))).toBeNull();
  });

  it('transitions: longest-phrase-first wins, addition stays Tier-3', () => {
    const mk = (text) => ({ skill: 'transitions', correctAnswer: 'A', choices: [{ id: 'A', text }] });
    expect(deriveRWPattern(mk('On the other hand,'))).toBe('transitions-contrast');
    expect(deriveRWPattern(mk('Therefore,'))).toBe('transitions-cause-effect');
    expect(deriveRWPattern(mk('For example,'))).toBe('transitions-example-emphasis');
    expect(deriveRWPattern(mk('Meanwhile,'))).toBe('transitions-sequence-time');
    expect(deriveRWPattern(mk('Moreover,'))).toBeNull(); // addition bucket is below threshold
  });

  it('text-structure-and-purpose: derives from the question stem', () => {
    const mk = (question) => ({ skill: 'text-structure-and-purpose', question, correctAnswer: 'A', choices: [{ id: 'A', text: 'x' }] });
    expect(deriveRWPattern(mk('Which choice best states the main purpose of the text?'))).toBe('tsp-main-purpose');
    expect(deriveRWPattern(mk('Which choice best describes the overall structure of the text?'))).toBe('tsp-overall-structure');
    expect(deriveRWPattern(mk('Which choice best describes the function of the underlined sentence?'))).toBe('tsp-function-of-underlined');
  });
});

describe('deriveRWQuestionType (browse type — grammar patterns PLUS reading sub-types)', () => {
  // Full question-type distribution surfaced in the Practice Bank. This is
  // deriveRWPattern's grammar tags (minus the tag-only coe-textual-illustrate-
  // claim, which reading-typing supersedes) PLUS all 398 reading items tagged
  // via rwReadingType.js (360 from tests + 38 authored drill-only fills). Counts
  // shift when items are authored — re-run buildMap.mjs + appendAuthored.mjs.
  const EXPECTED_QT_COUNTS = {
    // grammar / punctuation / structure (same as deriveRWPattern)
    'boundaries-semicolon': 26,
    'boundaries-comma': 25,
    'boundaries-dash': 8,
    'boundaries-colon': 9,
    'transitions-contrast': 26,
    'transitions-example-emphasis': 12,
    'transitions-cause-effect': 20,
    'transitions-sequence-time': 8,
    'tsp-main-purpose': 25,
    'tsp-overall-structure': 32,
    'tsp-function-of-underlined': 15,
    'fss-subject-verb-agreement': 26,
    'fss-verb-tense': 17,
    'fss-modifier-placement': 11,
    'fss-parallelism': 8,
    'fss-pronoun': 3,
    'fss-possessive': 5,
    // reading-comprehension question types (rwReadingType.js)
    'cid-main-idea': 49,
    'cid-supporting-detail': 24,
    'wic-restatement': 38,
    'wic-contrast': 38,
    'wic-cause-effect': 21,
    'wic-example-or-illustration': 7,
    'inf-cause-effect': 20,
    'inf-generalization-conclusion': 19,
    'inf-contrast-qualification': 5,
    'inf-comparison': 4,
    'inf-prediction-expectation': 9,
    'coe-quant-complete-statement': 33,
    'coe-quant-support-claim': 15,
    'coe-text-support-finding': 23,
    'coe-text-illustrate-quote': 11,
    'ctc-qualify-complicate': 11,
    'ctc-disagree-challenge': 7,
    'ctc-alternative-explanation': 6,
    'rs-emphasize-significance': 21,
    'rs-emphasize-difference': 10,
    'rs-explain-finding': 8,
    'rs-introduce-unfamiliar': 6,
    'rs-present-claim': 6,
    'rs-emphasize-similarity': 7,
  };

  const counts = {};
  for (const item of rwQuestionBank) {
    const p = deriveRWQuestionType(item);
    if (p) counts[p] = (counts[p] || 0) + 1;
  }

  it('produces the frozen browse-type distribution over the live bank', () => {
    expect(counts).toEqual(EXPECTED_QT_COUNTS);
  });

  it('tags 674 items (276 grammar/structure + 398 reading — 41 authored fills total)', () => {
    const tagged = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(tagged).toBe(674);
  });

  it('falls back to deriveRWPattern for grammar/structure skills', () => {
    const mk = (text) => ({ skill: 'boundaries', correctAnswer: 'A', choices: [{ id: 'A', text }] });
    expect(deriveRWQuestionType(mk('a clause; a clause'))).toBe('boundaries-semicolon');
    expect(deriveRWQuestionType(null)).toBeNull();
  });
});
