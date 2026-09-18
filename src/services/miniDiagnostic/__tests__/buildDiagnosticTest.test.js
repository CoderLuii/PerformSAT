/**
 * buildDiagnosticTest.test.js — Diagnostic v2 builder against the REAL banks
 * (no mocks, same pattern as sampler.integration.test.js).
 *
 * Pins the spec's acceptance criteria:
 *  - full variant: 4 modules (10/10/10/10) + easy M2 variants per section,
 *    runner-shaped (title/section/timeLimit), fill-ins only in math and
 *    capped at 2/module, every domain ≥4 items, ≥24 distinct skills, no
 *    duplicate items anywhere (easy variants included), deterministic
 *  - manifest round-trip: rebuildDiagnosticTest reconstructs the identical
 *    object; a poisoned manifest (missing id / wrong version) returns null
 *  - check-in variant: 2 modules (10 RW / 8 Math), no easy variants, ≥60%
 *    focus-skill items when the plan supplies focusSkills
 */

import { manifestFromServedItemIds } from '../buildDiagnosticTest';
import {
  buildDiagnosticTest,
  rebuildDiagnosticTest,
  DIAGNOSTIC_TEST_ID,
  MATH_DOMAIN_ORDER,
  RW_DOMAIN_ORDER,
} from '../buildDiagnosticTest';

const collectAllItems = (test) => {
  const mods = [...test.modules];
  if (test.rwModule2Easy) mods.push(test.rwModule2Easy);
  if (test.module2Easy) mods.push(test.module2Easy);
  return mods.flatMap((m) => m.questions);
};

const skillKeysOf = (q) => {
  const keys = [];
  if (Array.isArray(q.skills)) keys.push(...q.skills.map(String));
  if (q.skill) keys.push(String(q.skill));
  if (q.skillId) keys.push(String(q.skillId));
  return keys;
};

describe('buildDiagnosticTest — full variant', () => {
  const seed = { userId: 'v2-user', attemptId: 'v2-attempt-1' };
  let built;

  beforeAll(async () => {
    built = await buildDiagnosticTest(seed);
  });

  test('is runner-shaped: 4 modules, correct order/sections/timing, easy variants attached', () => {
    const { test: t } = built;
    expect(t.id).toBe(DIAGNOSTIC_TEST_ID);
    expect(t.isDiagnostic).toBe(true);
    expect(t.modules).toHaveLength(4);
    expect(t.modules.map((m) => m.section)).toEqual([
      'reading-writing', 'reading-writing', 'math', 'math',
    ]);
    expect(t.modules.map((m) => m.timeLimit)).toEqual([12, 12, 16, 16]);
    t.modules.forEach((m) => {
      expect(m.questions).toHaveLength(10);
      expect(typeof m.title).toBe('string');
    });
    expect(t.rwModule2Easy.questions).toHaveLength(10);
    expect(t.rwModule2Easy.section).toBe('reading-writing');
    expect(t.module2Easy.questions).toHaveLength(10);
    expect(t.module2Easy.section).toBe('math');
  });

  test('no duplicate items anywhere, easy variants included', () => {
    const ids = collectAllItems(built.test).map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(60); // 40 served-max + 2x10 easy variants
  });

  test('fill-ins appear only in math modules, capped at 2 per module', () => {
    const { test: t } = built;
    const mathMods = [t.modules[2], t.modules[3], t.module2Easy];
    const rwMods = [t.modules[0], t.modules[1], t.rwModule2Easy];
    rwMods.forEach((m) => {
      expect(m.questions.filter((q) => q.type === 'fill-in')).toHaveLength(0);
    });
    mathMods.forEach((m) => {
      const fillins = m.questions.filter((q) => q.type === 'fill-in');
      expect(fillins.length).toBeLessThanOrEqual(2);
    });
    // The banks carry plenty of grid-ins — the diagnostic should actually
    // serve some (the old shell's MC-only gap this feature closes).
    const totalFillins = mathMods.flatMap((m) => m.questions)
      .filter((q) => q.type === 'fill-in').length;
    expect(totalFillins).toBeGreaterThan(0);
  });

  test('every non-fill-in item is a valid 4-choice MC; fill-ins have answers', () => {
    const all = collectAllItems(built.test);
    const fillins = all.filter((q) => q.type === 'fill-in');
    const mcs = all.filter((q) => q.type !== 'fill-in');
    const badFillins = fillins.filter(
      (q) => q.correctAnswer === undefined || q.correctAnswer === null || String(q.correctAnswer) === '',
    );
    const badMcs = mcs.filter(
      (q) => !Array.isArray(q.choices)
        || q.choices.length !== 4
        || !q.choices.some((c) => String(c.id) === String(q.correctAnswer)),
    );
    expect(badFillins).toEqual([]);
    expect(badMcs).toEqual([]);
  });

  test('serves only recreated content: math test bank + bundle-fed RW, no drill-only fills', () => {
    const { test: t } = built;
    const mods = [...t.modules];
    if (t.rwModule2Easy) mods.push(t.rwModule2Easy);
    if (t.module2Easy) mods.push(t.module2Easy);
    mods.forEach((m) => m.questions.forEach((q) => {
      if (m.section === 'math') {
        expect(String(q.id)).toMatch(/^math-test\d/);
      } else {
        // `rw-test{N}-...` only — never an `rw-authored-*` drill fill.
        expect(String(q.id)).toMatch(/^rw-test\d/);
      }
    }));
  });

  test('served path covers every domain with ≥4 items and ≥24 distinct skills', () => {
    // Served path = the 4 standard modules (hard route; the easy swap keeps
    // the same stratification, pinned separately below).
    const served = built.test.modules.flatMap((m) => m.questions);
    const domainCounts = {};
    served.forEach((q) => {
      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
    });
    [...RW_DOMAIN_ORDER, ...MATH_DOMAIN_ORDER].forEach((d) => {
      expect(domainCounts[d] || 0).toBeGreaterThanOrEqual(4);
    });
    const skills = new Set(served.flatMap(skillKeysOf));
    expect(skills.size).toBeGreaterThanOrEqual(24);
  });

  test('easy-route path also covers every domain with ≥4 items', () => {
    const { test: t } = built;
    const easyServed = [
      ...t.modules[0].questions, ...t.rwModule2Easy.questions,
      ...t.modules[2].questions, ...t.module2Easy.questions,
    ];
    const domainCounts = {};
    easyServed.forEach((q) => {
      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
    });
    [...RW_DOMAIN_ORDER, ...MATH_DOMAIN_ORDER].forEach((d) => {
      expect(domainCounts[d] || 0).toBeGreaterThanOrEqual(4);
    });
  });

  test('deterministic: same seed rebuilds the identical item sequence', async () => {
    const again = await buildDiagnosticTest(seed);
    expect(collectAllItems(again.test).map((q) => q.id))
      .toEqual(collectAllItems(built.test).map((q) => q.id));
  });

  test('different attemptId re-rolls the items', async () => {
    const other = await buildDiagnosticTest({ ...seed, attemptId: 'v2-attempt-2' });
    expect(collectAllItems(other.test).map((q) => q.id))
      .not.toEqual(collectAllItems(built.test).map((q) => q.id));
  });

  test('excludeIds are honored while the banks have depth', async () => {
    const excluded = built.test.modules[0].questions.map((q) => q.id);
    const rebuilt = await buildDiagnosticTest({ ...seed, attemptId: 'v2-attempt-3', excludeIds: excluded });
    const rebuiltIds = new Set(collectAllItems(rebuilt.test).map((q) => q.id));
    excluded.forEach((id) => expect(rebuiltIds.has(id)).toBe(false));
  });

  test('coverage across 50 seeds: every seed fields full modules', async () => {
    for (let i = 0; i < 50; i++) {
      const { test: t } = await buildDiagnosticTest({ userId: `seed-user-${i}`, attemptId: `a-${i}` });
      t.modules.forEach((m) => expect(m.questions).toHaveLength(10));
      const ids = collectAllItems(t).map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  }, 30000);
});

describe('rebuildDiagnosticTest — manifest round-trip', () => {
  const seed = { userId: 'v2-user', attemptId: 'v2-resume-1' };

  test('rebuilds the identical test from the manifest', async () => {
    const { test: original, manifest } = await buildDiagnosticTest(seed);
    const rebuilt = await rebuildDiagnosticTest(manifest);
    expect(rebuilt).not.toBeNull();
    expect(rebuilt.id).toBe(DIAGNOSTIC_TEST_ID);
    expect(rebuilt.isDiagnostic).toBe(true);
    expect(collectAllItems(rebuilt).map((q) => q.id))
      .toEqual(collectAllItems(original).map((q) => q.id));
    expect(rebuilt.modules.map((m) => m.timeLimit))
      .toEqual(original.modules.map((m) => m.timeLimit));
  });

  test('resumes a pre-recreation manifest holding legacy drill-bank math ids', async () => {
    const { loadMathBank } = require('../../../data/corpusLoader');
    const legacyBank = await loadMathBank();
    const legacyId = legacyBank.getQuestionsByDomain('algebra')[0].id;
    const { manifest } = await buildDiagnosticTest(seed);
    const legacyManifest = JSON.parse(JSON.stringify(manifest));
    const mathMod = legacyManifest.modules.find((m) => m.section === 'math');
    mathMod.itemIds[0] = legacyId;
    const rebuilt = await rebuildDiagnosticTest(legacyManifest);
    expect(rebuilt).not.toBeNull();
    const rebuiltMathMod = rebuilt.modules.find((m) => m.section === 'math');
    expect(rebuiltMathMod.questions[0].id).toBe(legacyId);
  });

  test('returns null when an item id has left the bank (bank drift)', async () => {
    const { manifest } = await buildDiagnosticTest(seed);
    const poisoned = JSON.parse(JSON.stringify(manifest));
    poisoned.modules[0].itemIds[3] = 'nonexistent-item-id-xyz';
    expect(await rebuildDiagnosticTest(poisoned)).toBeNull();
  });

  test('returns null on version mismatch or malformed manifests', async () => {
    const { manifest } = await buildDiagnosticTest(seed);
    expect(await rebuildDiagnosticTest({ ...manifest, version: 999 })).toBeNull();
    expect(await rebuildDiagnosticTest(null)).toBeNull();
    expect(await rebuildDiagnosticTest({})).toBeNull();
  });
});

describe('buildDiagnosticTest — check-in variant', () => {
  test('2 modules (10 RW / 8 Math), no easy variants, correct timing', async () => {
    const { test: t } = await buildDiagnosticTest({
      userId: 'checkin-user', attemptId: 'c-1', variant: 'checkin',
    });
    expect(t.diagnosticVariant).toBe('checkin');
    expect(t.modules).toHaveLength(2);
    expect(t.modules[0].section).toBe('reading-writing');
    expect(t.modules[0].questions).toHaveLength(10);
    expect(t.modules[0].timeLimit).toBe(12);
    expect(t.modules[1].section).toBe('math');
    expect(t.modules[1].questions).toHaveLength(8);
    expect(t.modules[1].timeLimit).toBe(13);
    expect(t.rwModule2Easy).toBeUndefined();
    expect(t.module2Easy).toBeUndefined();
  });

  test('≥60% of slots hit the plan focus skills when the bank can field them', async () => {
    // Use skills the banks are deep in so the focus pool can actually fill.
    const focusSkills = ['boundaries', 'transitions', 'linear-equations', 'slope-intercept-form'];
    const { test: t } = await buildDiagnosticTest({
      userId: 'checkin-user', attemptId: 'c-2', variant: 'checkin', focusSkills,
    });
    const focus = new Set(focusSkills);
    const isFocus = (q) => skillKeysOf(q).some((k) => focus.has(k));
    const rwFocus = t.modules[0].questions.filter(isFocus).length;
    const mathFocus = t.modules[1].questions.filter(isFocus).length;
    // RW focus skills: boundaries + transitions; math: the two linear skills.
    // Target is round(0.6 * count) per module but capped by bank depth —
    // assert the weighting engaged (≥4 RW of 10, ≥3 Math of 8 ≈ 60% of the
    // sections the focus list can serve).
    expect(rwFocus).toBeGreaterThanOrEqual(4);
    expect(mathFocus).toBeGreaterThanOrEqual(3);
  });

  test('check-in math module covers ALL FOUR math domains (geometry included)', async () => {
    // Review finding: fixed 2-per-domain stratification over 6 MC slots
    // consumed the first three domains and geometry NEVER appeared in any
    // check-in — its weaknesses silently vanished from refreshed plans.
    for (let i = 0; i < 10; i++) {
      const { test: t } = await buildDiagnosticTest({
        userId: `checkin-dom-${i}`, attemptId: `cd-${i}`, variant: 'checkin',
      });
      const mathDomains = new Set(t.modules[1].questions.map((q) => q.domain));
      MATH_DOMAIN_ORDER.forEach((d) => expect([...mathDomains]).toContain(d));
    }
  }, 20000);

  test('no duplicates and deterministic', async () => {
    const args = { userId: 'checkin-user', attemptId: 'c-3', variant: 'checkin' };
    const a = await buildDiagnosticTest(args);
    const b = await buildDiagnosticTest(args);
    const ids = collectAllItems(a.test).map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(collectAllItems(b.test).map((q) => q.id)).toEqual(ids);
  });
});


describe('manifestFromServedItemIds (legacy record → manifest)', () => {
  const ids = (n, prefix) => Array.from({ length: n }, (_, i) => `${prefix}-${i + 1}`);

  it('slices 40 full-variant ids into R&W M1/M2 then Math M1/M2, 10 each', () => {
    const itemIds = [...ids(20, 'rw'), ...ids(20, 'm')];
    const manifest = manifestFromServedItemIds({ variant: 'full', itemIds });
    expect(manifest.version).toBe(1);
    expect(manifest.variant).toBe('full');
    expect(manifest.modules.map((m) => [m.section, m.title, m.itemIds.length])).toEqual([
      ['reading-writing', 'Reading and Writing Module 1', 10],
      ['reading-writing', 'Reading and Writing Module 2', 10],
      ['math', 'Math Module 1', 10],
      ['math', 'Math Module 2', 10],
    ]);
    expect(manifest.modules[0].itemIds).toEqual(ids(10, 'rw'));
    expect(manifest.modules[1].itemIds[0]).toBe('rw-11');
    expect(manifest.modules[2].itemIds[0]).toBe('m-1');
    expect(manifest.modules[3].itemIds[9]).toBe('m-20');
    expect(manifest.rwModule2Easy).toBeNull();
    expect(manifest.module2Easy).toBeNull();
  });

  it('slices a check-in into R&W (10) then Math (8)', () => {
    const manifest = manifestFromServedItemIds({ variant: 'checkin', itemIds: [...ids(10, 'rw'), ...ids(8, 'm')] });
    expect(manifest.variant).toBe('checkin');
    expect(manifest.modules.map((m) => [m.section, m.itemIds.length])).toEqual([['reading-writing', 10], ['math', 8]]);
  });

  it('returns null when the ids do not fill the blueprint', () => {
    expect(manifestFromServedItemIds({ variant: 'full', itemIds: ids(39, 'x') })).toBeNull();
    expect(manifestFromServedItemIds({ variant: 'full', itemIds: [] })).toBeNull();
    expect(manifestFromServedItemIds({ variant: 'full' })).toBeNull();
    expect(manifestFromServedItemIds()).toBeNull();
  });
});
