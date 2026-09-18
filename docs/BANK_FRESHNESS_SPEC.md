# Drill-Bank Freshness Pass (2026-09-07)

**Why.** The 2026-09-04 bank recreation (docs/BANK_RECREATION_SPEC.md) froze every item's pattern and
showed authors the old stem. Census on the live bank (same metric as the test rebuild): 810 of 2,121
items are their pre-09-04 item with new numbers, 38% have a near-verbatim twin elsewhere in the bank,
and stems run E27/M31/H36 words against the tests' E33/M38/H43. Students drilling one skill meet the
same setup again and again. This pass rewrites the minimal set that fixes it and leaves the rest.

**Scope (from `node scripts/refreshBank.mjs plan`).** 1,210 items to rewrite (21 chunks): every item that is near
its pre-09-04 version (Dice ≥ 0.55), near a current practice-test question (≥ 0.55), a thin stem
(under 60% of the official word norm), or one of a pair of drills closer than 0.65 to each other
(the greedy keep-set prefers figure-bearing, longer, clean items). 911 items are kept untouched.

**Lines.** A rewritten stem must sit below Dice 0.55 against its own old versions and every current
test question, and below 0.65 against every other drill (kept or rewritten). Drills are reps of one
archetype, so they may share more structure than two test questions may — but never the same setup.

**Frozen per item** (recreateBank re-applies at assembly): id, domain, skills, difficulty, type,
sourceStyleRef, tags, the exact `**SAT Pattern**` title (drill routing keys off it), topic-file hint
requirement. **Authored:** question, diagram/questionTable/questionFormula, choices, correctAnswer,
explanation, `distractorNotes` (required for every wrong letter), hint (topic items).

## Pipeline

```
node scripts/refreshBank.mjs plan                       # rewrite set, seen corpus, chunks fresh-01..fresh-21 (gitignored WORK dir)
node scripts/recreateBank.mjs check --chunk=fresh-01    # schema, scaffold, KaTeX, ascending, official gate + FRESHNESS gate
node scripts/recreateBank.mjs score --text="…" [--self=source/fileId]   # author helper: nearest seen / new drill + verdict
node scripts/recreateBank.mjs solvesheet --chunk=fresh-01
node scripts/recreateBank.mjs assemble --source=<sources of the chunk> --chunk=fresh-01,fresh-02
node scripts/recreateBank.mjs verify --source=<sources>
node scripts/refreshBank.mjs verify                     # live census: old-self, tests, pairwise ≥0.65 count, register
npm run bank:validate · CI=true npx react-scripts test --watchAll=false --testPathPattern="bankDiagramRender|recreatedBankRender|bank"
```

Chunk rows carry NO old stem. Each row gives: fileId, source, kind, frozen metadata, patternTitle,
cbSkillLabel, `figure` (must carry a real diagram/questionTable), `form` + `formHint` (rotates inside a
pattern group so reps of one archetype wear different clothes), and `why` it is being rewritten.
Each chunk carries a `palette` of three scenario themes.

## Authoring rules

Same as docs/TEST_RECREATION_V2_SPEC.md "Authoring rules" with these bank specifics:

1. Never open the bank shard/topic files or git history for ideas (the gate compares against all of
   them); the only allowed peek is a diagram `params` key shape via grep.
2. Keep the frozen `**SAT Pattern: <title>**` header exactly; the item must remain a genuine drill on
   that archetype at its difficulty and type.
3. Inside your chunk, items sharing a pattern are reps of one archetype: give each a different setup,
   a different unknown, or a different form — the 0.65 sibling line is the floor, not the goal.
4. Topic-file items need a fresh one-sentence `hint` (a nudge, not the method).
5. Stems ≥ 10 words unless a figure carries the setup; aim E32/M40/H49 words; official voice; premises
   physically and mathematically sound; every distractor a named error with its exact number.
6. Score drafts first (`recreateBank.mjs score --text="…"`); a FRESHNESS fail means change the setup.
7. Abstract stems ("The function $f$ is defined by…", "In the $xy$-plane, the graph of…", "In triangle
   $ABC$…") fail the gate outright — hundreds of seen items share that skeleton (fresh-06: 44/60 of a
   first draft). Every item needs a one-clause palette context with a distinctive noun and a named
   quantity with units. Lengthening with official-style boilerplate that restates the function pushes
   Dice back UP; length comes from the setup, never from restating the givens.
8. Thin stems FAIL `check`: a fresh item with no figure whose stem is under 60% of the official median
   for its CB skill × difficulty (math masked to one token both sides; all-skills median when the skill
   has < 5 official items). Symbolic skills have short norms (Equivalent expressions E7/M10/H22, Linear
   equations in one variable E11/M12/H19); contextual skills long ones (Nonlinear functions E52/M42/H39,
   Linear functions E32/M35/H45). Added 2026-09-07 after fresh-01/fresh-12 came in at H27 / M23 medians.

## Verification

Per chunk: `solvesheet` → an independent verifier re-derives every number with python, checks
distractor rationales, figure params against the renderers (rightTriangle `vertices` in true
proportion; barChart values on gridlines; dotPlot window ≤ 50; linearGraph ≤ 26 gridlines per axis;
"residual" needs a scatterplot), difficulty, register, scenario collisions — fixes in place — then
`check` again.

## Status board (2026-09-07)

| Chunk | Sources | Items | Authored | Verified | Assembled |
|---|---|---|---|---|---|
| fresh-01..05 | advancedMath | 300 | yes | yes | yes (wave A, 59b99ef4) |
| fresh-06 | advancedMath 9 + algebra 51 | 60 | yes | yes | yes (wave A) |
| fresh-07..11 | algebra | 300 | yes | yes | yes (wave A) |
| fresh-12 | algebra 17 + circles 21 + exponents 10 + functions 8 + equivalent-expressions 3 + dimensional-analysis 1 | 60 | yes | yes | yes (wave A; functions in wave B) |
| fresh-13 | geometry 57 + functions 3 | 60 | yes | yes | yes (wave B) |
| fresh-14..16 | geometry | 180 | yes | yes | yes (wave B) |
| fresh-17 | geometry 39 + linear-equations 21 | 60 | yes | yes | yes (wave B) |
| fresh-18 | problemSolving 58 + linear-equations 1 + percents 1 | 60 | yes | yes | yes (wave B) |
| fresh-19 | problemSolving 39 + quadratics 14 + radians-degrees 3 + statistics 3 + systems 1 | 60 | yes | yes | yes (wave B) |
| fresh-20 | transformations 32 + triangles 19 + systems 7 + volume 2 | 60 | yes | yes | yes (wave B) |
| fresh-21 | volume | 10 | yes | yes | yes (wave B) |

**Final census (`refreshBank.mjs verify`, 2026-09-07):** 0 items near their pre-09-04 version, 0 near a current
test question, 0 drill pairs at or above Dice 0.65 (was 38% of the bank); stem medians E32/M35/H39 (was
E27/M31/H36; tests E33/M38/H43); figures/tables 665 of 2,121 (was ~500).

## Learnings

1. Authors trade length for freshness: abstract algebra archetypes only clear the gate with a one-clause
   setup, and every lengthening pass that restated the givens raised Dice. The per-skill register gate
   (rule 8) is what kept the symbolic skills honest without padding.
2. The independent verifier pass earned its cost: no wrong keys in 1,210 items, but roughly one item in
   six needed a fix — distractor rationales that did not produce their number, explanation "checks" that
   used non-solutions, figures out of proportion or leaking the answer, unsound premises (negative tank
   volumes, saturated brines, 0.47 L road-salt hoppers), hard slots that were one-formula plug-ins,
   in-chunk twins, and topic hints that handed over the method (41 in fresh-20 alone).
3. Renderer traps found by verifiers: `TriangleWithAngles` silently drops `sideLabels` (a length given
   only there is invisible — put it in the stem); `SATIntersectingLines` draws angles[0] as the 60° wedge
   and angles[1] as 120°, so the larger measure must sit at index 1; `coordinatePoints` draws on a fixed
   square, so x- and y-spans must match when the stem says "each unit represents …"; `parabola` with
   `gridInterval: 2` hides odd intercepts.
5. MathText treats `$NN.NN ` (cents, then a space) as currency on any line with balanced `$` but no
   LaTeX command, which unpairs the rest of the line: 13 spans across 12 items rendered as raw text
   and one crashed KaTeX. `check` now mirrors that rule (`currencyTrapErrors`); the fix is to write
   such spans without spaces (`$38.10-31.60=6.50$`) or include a command.
4. `assemble` is chunk-scoped (`--chunk` allow-list) but `verify --source` compares every live item to
   its authored JSON, so assemble a source only once all of its chunks are verified.
