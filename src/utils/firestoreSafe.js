/**
 * firestoreSafe — make arbitrary JSON-ish data safe to persist to Firestore.
 *
 * The Firestore Web SDK HARD-REJECTS two things that plain app data routinely
 * contains, and a rejection fails the ENTIRE write — which, on a critical path,
 * is silent data loss:
 *   1. Nested arrays — an array whose element is itself an array. A table
 *      question's `questionTable.rows` is [["Facebook","54%"],…]; a matrix or a
 *      scatter's [[x,y],…] points are the same shape. ("Nested arrays are not
 *      supported.")
 *   2. `undefined` field values (unless the app sets ignoreUndefinedProperties)
 *      and non-finite numbers (NaN, Infinity).
 *
 * This bit a real student: a full practice test whose snapshot carried a table
 * question rejected the whole save transaction, the score was lost with the
 * snapshot, and every retry/boot-flush replayed the same doomed payload — so
 * nothing ever saved. See src/services/practiceTestService.js and the
 * firestoreSnapshotSafety data test.
 *
 * sanitizeForFirestore() returns a deep copy Firestore will accept;
 * restoreFromFirestore() reverses it losslessly so readers see the original
 * shape. Pure — no Firestore, no React. Any write path that serializes
 * arbitrary question / diagram / user-authored data should run its payload
 * through sanitizeForFirestore and decode with restoreFromFirestore on read.
 */

/**
 * Sentinel key that boxes a nested array so Firestore will accept it. An inner
 * array [a,b] becomes { [FS_NESTED_ARRAY_KEY]: [a,b] }; restoreFromFirestore
 * unboxes it. Chosen to never collide with real field names.
 */
export const FS_NESTED_ARRAY_KEY = '__fsNestedArray';

/**
 * Deep-copies a value into a Firestore-safe shape:
 *  - undefined object properties are DROPPED,
 *  - undefined / non-finite (NaN, Infinity) values become null,
 *  - any array element that is itself an array is boxed as
 *    { [FS_NESTED_ARRAY_KEY]: [...] }.
 * Lossless round-trip with restoreFromFirestore.
 *
 * @param {*} value - Arbitrary JSON-ish value
 * @returns {*} Firestore-safe deep copy
 */
export const sanitizeForFirestore = (value) => {
  if (value === undefined || value === null) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (Array.isArray(value)) {
    return value.map((el) =>
      Array.isArray(el)
        ? { [FS_NESTED_ARRAY_KEY]: sanitizeForFirestore(el) }
        : sanitizeForFirestore(el)
    );
  }
  // Set / Map — Firestore hard-rejects both ("Unsupported field value: a
  // custom Set object"), and the old object-walk collapsed them to {} (silent
  // data loss). Convert to their JSON-natural shapes instead. This bit a real
  // student: a live Set inside the diagnostic report failed every first-
  // attempt score save (2026-08-13).
  if (value instanceof Set) return sanitizeForFirestore([...value]);
  if (value instanceof Map) return sanitizeForFirestore(Object.fromEntries(value));
  // Date is natively supported by Firestore (stored as a Timestamp); walking
  // it as a plain object would corrupt it to {}. Same for Firestore sentinel/
  // Timestamp instances (serverTimestamp(), Timestamp) — any non-plain object
  // that isn't a Set/Map passes through untouched.
  if (value instanceof Date) return value;
  if (typeof value === 'object') {
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) return value;
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue; // Firestore rejects undefined; omit the field.
      out[k] = sanitizeForFirestore(v);
    }
    return out;
  }
  return value; // string, boolean
};

/**
 * Reverses sanitizeForFirestore: unboxes { [FS_NESTED_ARRAY_KEY]: [...] } back
 * into a nested array so callers see the original shape (e.g. a table's
 * questionTable.rows as a 2D array). No-op on data written before this encoding
 * existed — a plain payload never contains the sentinel key.
 *
 * @param {*} value
 * @returns {*}
 */
export const restoreFromFirestore = (value) => {
  if (Array.isArray(value)) {
    return value.map((el) => {
      if (
        el && typeof el === 'object' && !Array.isArray(el) &&
        Array.isArray(el[FS_NESTED_ARRAY_KEY]) &&
        Object.keys(el).length === 1
      ) {
        return restoreFromFirestore(el[FS_NESTED_ARRAY_KEY]);
      }
      return restoreFromFirestore(el);
    });
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = restoreFromFirestore(v);
    return out;
  }
  return value;
};

/**
 * Test/assertion helper: deep-scans a value for anything Firestore would
 * hard-reject and returns the offending paths. Empty arrays => safe to write.
 * Used by the firestoreSnapshotSafety guard test to prove real question data
 * (all practice tests + banks) survives the save path.
 *
 * @param {*} value
 * @param {string} [path='$']
 * @returns {{ nestedArrays: string[], undefinedValues: string[], nonFinite: string[], customObjects: string[] }}
 */
export const findFirestoreHostileValues = (value, path = '$') => {
  const found = { nestedArrays: [], undefinedValues: [], nonFinite: [], customObjects: [] };
  const walk = (v, p) => {
    if (v === undefined) { found.undefinedValues.push(p); return; }
    if (v === null) return;
    if (typeof v === 'number') { if (!Number.isFinite(v)) found.nonFinite.push(p); return; }
    if (Array.isArray(v)) {
      v.forEach((el, i) => {
        if (Array.isArray(el)) found.nestedArrays.push(`${p}[${i}]`);
        walk(el, `${p}[${i}]`);
      });
      return;
    }
    if (typeof v === 'object') {
      // Set / Map / class instances are hard-rejected by the SDK ("Unsupported
      // field value: a custom Set object"). Date and Firestore's own Timestamp/
      // FieldValue sentinels are natively supported — don't flag those.
      if (v instanceof Date) return;
      const proto = Object.getPrototypeOf(v);
      if (proto !== Object.prototype && proto !== null) {
        found.customObjects.push(`${p} = ${v.constructor?.name || 'unknown'}`);
        return;
      }
      for (const [k, val] of Object.entries(v)) walk(val, `${p}.${k}`);
    }
  };
  walk(value, path);
  return found;
};
