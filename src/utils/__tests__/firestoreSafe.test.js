/**
 * Unit tests for firestoreSafe — the shared "make arbitrary data safe to
 * persist" util that every critical write path leans on.
 *
 * Regression anchor: 2026-08-13, a live Set (diagnosticReport.skillAnalysis
 * .skillMap.<skill>.missedPatternsSet) failed every first-attempt score save
 * with "Unsupported field value: a custom Set object". The old sanitize walked
 * a Set as a plain object and silently collapsed it to {}; the old
 * findFirestoreHostileValues never flagged it. Both are pinned here.
 */

const {
  sanitizeForFirestore,
  restoreFromFirestore,
  findFirestoreHostileValues,
  FS_NESTED_ARRAY_KEY,
} = require('../firestoreSafe');

describe('sanitizeForFirestore', () => {
  test('converts a Set to a plain array (was: silent collapse to {})', () => {
    expect(sanitizeForFirestore(new Set(['a', 'b']))).toEqual(['a', 'b']);
    expect(sanitizeForFirestore({ deep: { patterns: new Set(['x']) } }))
      .toEqual({ deep: { patterns: ['x'] } });
  });

  test('converts a Map to a plain object', () => {
    expect(sanitizeForFirestore(new Map([['k', 1], ['j', 2]]))).toEqual({ k: 1, j: 2 });
  });

  test('sanitizes INSIDE converted Sets/Maps too', () => {
    expect(sanitizeForFirestore(new Set([undefined, NaN, 'ok'])))
      .toEqual([null, null, 'ok']);
    expect(sanitizeForFirestore(new Map([['inner', new Set([1])]])))
      .toEqual({ inner: [1] });
  });

  test('passes Date through untouched (Firestore supports it natively)', () => {
    const d = new Date('2026-08-13T00:00:00Z');
    expect(sanitizeForFirestore(d)).toBe(d);
    expect(sanitizeForFirestore({ at: d }).at).toBe(d);
  });

  test('passes non-plain objects (Firestore sentinels like serverTimestamp/Timestamp) through untouched', () => {
    class FakeSentinel { constructor() { this._methodName = 'serverTimestamp'; } }
    const sentinel = new FakeSentinel();
    expect(sanitizeForFirestore({ ts: sentinel }).ts).toBe(sentinel);
  });

  test('still drops undefined props, nulls NaN/Infinity, boxes nested arrays (original contract)', () => {
    const out = sanitizeForFirestore({
      gone: undefined,
      nan: NaN,
      inf: Infinity,
      rows: [['a', 'b'], ['c']],
    });
    expect('gone' in out).toBe(false);
    expect(out.nan).toBeNull();
    expect(out.inf).toBeNull();
    expect(out.rows).toEqual([
      { [FS_NESTED_ARRAY_KEY]: ['a', 'b'] },
      { [FS_NESTED_ARRAY_KEY]: ['c'] },
    ]);
  });

  test('round-trips nested arrays losslessly via restoreFromFirestore', () => {
    const original = { questionTable: { rows: [['Facebook', '54%'], ['TikTok', '46%']] } };
    expect(restoreFromFirestore(sanitizeForFirestore(original))).toEqual(original);
  });
});

describe('findFirestoreHostileValues', () => {
  test('flags Set and Map as customObjects (the 2026-08-13 blind spot)', () => {
    const found = findFirestoreHostileValues({
      skillMap: { percents: { missedPatternsSet: new Set(['x']) } },
      lookup: new Map(),
    });
    expect(found.customObjects).toEqual([
      '$.skillMap.percents.missedPatternsSet = Set',
      '$.lookup = Map',
    ]);
  });

  test('flags arbitrary class instances', () => {
    class Weird {}
    const found = findFirestoreHostileValues({ w: new Weird() });
    expect(found.customObjects).toEqual(['$.w = Weird']);
  });

  test('does NOT flag Date or plain data', () => {
    const found = findFirestoreHostileValues({
      at: new Date(),
      s: 'str',
      n: 1,
      arr: [{ ok: true }],
      nul: null,
    });
    expect(found.customObjects).toEqual([]);
    expect(found.nestedArrays).toEqual([]);
    expect(found.nonFinite).toEqual([]);
    expect(found.undefinedValues).toEqual([]);
  });

  test('still finds nested arrays, undefined, and non-finite numbers', () => {
    const found = findFirestoreHostileValues({
      rows: [['a']],
      u: undefined,
      nan: NaN,
    });
    expect(found.nestedArrays).toEqual(['$.rows[0]']);
    expect(found.undefinedValues).toEqual(['$.u']);
    expect(found.nonFinite).toEqual(['$.nan']);
  });
});
