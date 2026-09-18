import { extractSatPattern } from '../../questions/extractSatPattern';
import { practiceTest1 } from '../practiceTest1';
import { practiceTest2 } from '../practiceTest2';
import { practiceTest3 } from '../practiceTest3';
import { practiceTest4 } from '../practiceTest4';
import { practiceTest5 } from '../practiceTest5';
import { practiceTest6 } from '../practiceTest6';
import { practiceTest7 } from '../practiceTest7';
import { practiceTest8 } from '../practiceTest8';
import { practiceTest9 } from '../practiceTest9';
import { practiceTest10 } from '../practiceTest10';
import { practiceTest11 } from '../practiceTest11';
import { practiceTest12 } from '../practiceTest12';

const ALL_TESTS = [
  { name: 'PT1', test: practiceTest1 },
  { name: 'PT2', test: practiceTest2 },
  { name: 'PT3', test: practiceTest3 },
  { name: 'PT4', test: practiceTest4 },
  { name: 'PT5', test: practiceTest5 },
  { name: 'PT6', test: practiceTest6 },
  { name: 'PT7', test: practiceTest7 },
  { name: 'PT8', test: practiceTest8 },
  { name: 'PT9', test: practiceTest9 },
  { name: 'PT10', test: practiceTest10 },
  { name: 'PT11', test: practiceTest11 },
  { name: 'PT12', test: practiceTest12 },
];

// Drill routing Tier 1 (exact SAT Pattern) depends on every test-bundle
// item carrying `**SAT Pattern: <Title>**` in its explanation. If a new
// test item ships without one, diagnosis will silently omit it from
// `missedPatterns` — the cascade still works (falls to Tier 2/3), but
// Tier 1 precision degrades. Catch this at test time.

describe('practice test bundle integrity — SAT Pattern coverage', () => {
  ALL_TESTS.forEach(({ name, test }) => {
    describe(`${name}`, () => {
      it('every item has a parseable **SAT Pattern: <Title>** in its explanation', () => {
        const offenders = [];
        test.modules.forEach((mod, modIdx) => {
          (mod.questions || []).forEach((q, qIdx) => {
            const pattern = extractSatPattern(q.explanation);
            if (!pattern) {
              offenders.push(
                `${name} module-${modIdx} q${qIdx + 1} (id=${q.id}): no parseable SAT Pattern`,
              );
            }
          });
        });
        expect(offenders).toEqual([]);
      });
    });
  });

  it('all 12 tests combined cover at least 500 items (sanity check)', () => {
    let total = 0;
    ALL_TESTS.forEach(({ test }) => {
      test.modules.forEach(mod => {
        total += (mod.questions || []).length;
      });
    });
    // 12 tests × 44 items/test = 528. Floor at 500 to allow for the
    // M2Easy alternates which aren't in this list, without locking in
    // the exact count.
    expect(total).toBeGreaterThanOrEqual(500);
  });
});

// ── Adaptive R&W Module 2 Easy variants (2026-07) ──────────────────────────
// Every catalog test must carry an R&W easy variant with the exact official
// module blueprint (skill order: vocab first, notes last) and the easy
// difficulty mix. The runner swaps this module in when R&W M1 < 60%, so a
// malformed variant would corrupt the served test for the lowest scorers.

describe('R&W Module 2 Easy variants', () => {
  // Import via the catalog so the wiring (rwEasyVariants map) is what's tested.
  const { practiceTests } = require('../index');

  const BLUEPRINT_SKILLS = [
    'words-in-context', 'words-in-context', 'words-in-context', 'words-in-context',
    'text-structure-and-purpose', 'text-structure-and-purpose', 'text-structure-and-purpose',
    'cross-text-connections',
    'central-ideas-and-details', 'central-ideas-and-details', 'central-ideas-and-details',
    'command-of-evidence-textual',
    'command-of-evidence-quantitative', 'command-of-evidence-quantitative',
    'inferences', 'inferences',
    'boundaries', 'form-structure-and-sense', 'boundaries',
    'form-structure-and-sense', 'boundaries', 'form-structure-and-sense',
    'transitions', 'transitions', 'transitions',
    'rhetorical-synthesis', 'rhetorical-synthesis',
  ];

  it('all 12 catalog tests carry both easy variants', () => {
    expect(practiceTests).toHaveLength(12);
    practiceTests.forEach(t => {
      expect(t.module2Easy?.questions?.length).toBe(22);
      expect(t.rwModule2Easy?.questions?.length).toBe(27);
      expect(t.rwModule2Easy.variant).toBe('easy');
      expect(t.rwModule2Easy.timeLimit).toBe(32);
    });
  });

  practiceTests.forEach(t => {
    describe(t.id, () => {
      const qs = t.rwModule2Easy?.questions || [];

      // 2026-09-07: the exact 27-slot order is no longer pinned — every module
      // used to share one seating chart, so students learned it. Items are now
      // re-dealt inside their official skill BLOCKS per test
      // (scripts/varyRWSeating.mjs). What stays invariant: the per-skill
      // counts and the official block flow (vocab first, notes last).
      it('keeps the official blueprint counts and block flow', () => {
        const counts = {};
        qs.forEach(q => { counts[q.skill] = (counts[q.skill] || 0) + 1; });
        const want = {};
        BLUEPRINT_SKILLS.forEach(s => { want[s] = (want[s] || 0) + 1; });
        expect(counts).toEqual(want);
        const BLOCK = {
          'words-in-context': 0,
          'text-structure-and-purpose': 1, 'cross-text-connections': 1,
          'central-ideas-and-details': 2, 'command-of-evidence-textual': 2, 'command-of-evidence-quantitative': 2, 'inferences': 2,
          boundaries: 3, 'form-structure-and-sense': 3,
          transitions: 4,
          'rhetorical-synthesis': 5,
        };
        const blocks = qs.map(q => BLOCK[q.skill]);
        blocks.forEach((b, i) => { if (i > 0) expect(b).toBeGreaterThanOrEqual(blocks[i - 1]); });
        expect(qs.slice(0, 4).every(q => q.skill === 'words-in-context')).toBe(true);
        expect(qs[8].skill).toBe('central-ideas-and-details');
        expect(qs[15].skill).toBe('inferences');
        expect(qs.slice(25).every(q => q.skill === 'rhetorical-synthesis')).toBe(true);
      });

      it('has the easy difficulty mix (8E/16M/3H)', () => {
        const dist = { easy: 0, medium: 0, hard: 0 };
        qs.forEach(q => { dist[q.difficulty] += 1; });
        expect(dist).toEqual({ easy: 8, medium: 16, hard: 3 });
      });

      it('every item is a well-formed 4-choice MCQ with unique bank-wide ids', () => {
        const standardIds = new Set(t.modules.flatMap(m => m.questions.map(q => q.id)));
        qs.forEach(q => {
          expect(q.choices).toHaveLength(4);
          expect(['A', 'B', 'C', 'D']).toContain(q.correctAnswer);
          expect(typeof q.explanation).toBe('string');
          expect(standardIds.has(q.id)).toBe(false);
        });
      });

      it('special stimulus shapes are present', () => {
        const bySkill = (s) => qs.filter(q => q.skill === s);
        expect(bySkill('cross-text-connections').every(q => Array.isArray(q.passages))).toBe(true);
        expect(bySkill('command-of-evidence-quantitative').every(q => q.questionTable)).toBe(true);
        const rs = bySkill('rhetorical-synthesis');
        expect(rs.every(q => (q.studentNotes?.bullets?.length || 0) >= 5)).toBe(true);
        expect(rs.every(q => q.studentNotes?.goal)).toBe(true);
      });
    });
  });
});
