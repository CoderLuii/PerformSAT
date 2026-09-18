import { rwQuestionBank } from '../index';
import { deriveRWQuestionType } from '../deriveRWPattern';
import {
  RW_READING_TYPE_BY_ID,
  RW_READING_TYPE_LABELS,
  getReadingType,
} from '../rwReadingType';

/**
 * Pins the authoritative reading-comprehension question-type categorization
 * (rwReadingType.js) — the analog of rwGrammarType.js for the seven reading
 * skills that have no mechanical signal in the correct answer.
 *
 * Before this map (2026-06-18) those skills surfaced NO question types in the
 * Practice Bank. These tests guarantee every live reading item is typed and the
 * map stays correct as the bank evolves.
 */

const READING_SKILLS = new Set([
  'words-in-context',
  'central-ideas-and-details',
  'inferences',
  'command-of-evidence-quantitative',
  'command-of-evidence-textual',
  'cross-text-connections',
  'rhetorical-synthesis',
]);

// Every valid reading sub-type slug, plus the *-other escapes and null (route
// Tier-3). Mirrors rwGrammarType's VALID_SLUGS guard.
const VALID_SLUGS = new Set([
  'cid-main-idea', 'cid-supporting-detail',
  'wic-restatement', 'wic-contrast', 'wic-cause-effect', 'wic-example-or-illustration', 'wic-other',
  'inf-cause-effect', 'inf-generalization-conclusion', 'inf-contrast-qualification',
  'inf-comparison', 'inf-prediction-expectation', 'inf-other',
  'coe-quant-complete-statement', 'coe-quant-support-claim',
  'coe-text-support-finding', 'coe-text-illustrate-quote',
  'ctc-disagree-challenge', 'ctc-qualify-complicate', 'ctc-support-extend', 'ctc-alternative-explanation', 'ctc-other',
  'rs-emphasize-significance', 'rs-emphasize-difference', 'rs-emphasize-similarity',
  'rs-introduce-unfamiliar', 'rs-present-claim', 'rs-explain-finding', 'rs-other',
]);

const readingItems = rwQuestionBank.filter((q) => READING_SKILLS.has(q.skill));
const liveReadingIds = new Set(readingItems.map((q) => q.sourceQuestionId));

describe('rwReadingType — authoritative reading-comprehension categorization', () => {
  it('there are 398 live reading-comprehension items (360 from tests + 38 authored fills)', () => {
    expect(readingItems.length).toBe(398);
  });

  it('every live reading item has an authoritative entry (none falls through to Tier-3 untyped)', () => {
    const untagged = readingItems.filter(
      (q) => !Object.prototype.hasOwnProperty.call(RW_READING_TYPE_BY_ID, q.sourceQuestionId),
    );
    expect(untagged.map((q) => q.sourceQuestionId)).toEqual([]);
  });

  it('the map has no stale keys — every key is a live reading item id', () => {
    const stale = Object.keys(RW_READING_TYPE_BY_ID).filter((k) => !liveReadingIds.has(Number(k)));
    expect(stale).toEqual([]);
    expect(Object.keys(RW_READING_TYPE_BY_ID).length).toBe(398);
  });

  it('every map value is a valid reading-* slug (or null)', () => {
    const bad = Object.entries(RW_READING_TYPE_BY_ID)
      .filter(([, v]) => v !== null && !VALID_SLUGS.has(v));
    expect(bad).toEqual([]);
  });

  it('deriveRWQuestionType routes reading items through the authoritative map', () => {
    // Spot-check one per skill against its known authoritative tag.
    const sample = {
      101: 'wic-example-or-illustration', // words-in-context
      115: 'inf-generalization-conclusion', // inferences
      108: 'ctc-disagree-challenge', // cross-text
      153: 'rs-present-claim', // rhetorical-synthesis
    };
    for (const [id, expected] of Object.entries(sample)) {
      const item = rwQuestionBank.find((q) => q.sourceQuestionId === Number(id));
      expect(item).toBeTruthy();
      expect(deriveRWQuestionType(item)).toBe(expected);
    }
  });

  it('getReadingType returns undefined for an item not in the map (future item falls through)', () => {
    expect(getReadingType({ skill: 'words-in-context', id: 999999, choices: [], correctAnswer: 'A' })).toBeUndefined();
    expect(getReadingType(null)).toBeUndefined();
  });

  it('every surfaced label maps to a valid, non-other slug', () => {
    for (const slug of Object.keys(RW_READING_TYPE_LABELS)) {
      expect(VALID_SLUGS.has(slug)).toBe(true);
      expect(slug.endsWith('-other')).toBe(false);
    }
  });
});
