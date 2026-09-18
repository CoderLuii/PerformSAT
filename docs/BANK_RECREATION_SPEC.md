# Question Bank Recreation Spec — Official-Calibration Rebuild (2026-09-04)

**Mission:** Recreate the drill question bank (the corpus behind the Practice
Bank tab, Study Plan drills, "Try similar", and the legacy diagnostic fallback)
so every item is indistinguishable in style, difficulty, and texture from the
official digital SAT — the same bar the 12 practice tests were rebuilt to in
`docs/TEST_RECREATION_SPEC.md`. Calibration references: the College Board
Educator Question Bank cache and the new-300 reference set.

**Provenance rule (non-negotiable):** Every recreated item is ORIGINAL. Study
official items for register, difficulty, and format — never copy, closely
paraphrase, or lift scenarios/numbers. The uniqueness gate (Jaccard + 3-gram vs
the official cache AND vs our recreated practice tests AND vs the rest of the
bank) runs in `node scripts/recreateBank.mjs check` and must pass.

## Scope

| Corpus | Where | Items | Notes |
|---|---|---|---|
| Math shards | `src/data/questions/bank/{algebra,problemSolving,advancedMath,geometry}.js` | 514 / 463 / 425 / 355 = 1,757 | ids `bank-alg-NNN` etc.; carry `**SAT Pattern**` headers (Tier-1 routing) |
| Topic files | `src/data/questions/{topic}.js` (14 files) | 364 | per-section arrays of ~5; ids are per-section integers; carry `hint`; NO pattern header (routing derives from the section name) |
| R&W drill fills | `src/data/questions/rwBank/authoredReadingItems.js` | 41 | ids 9001-9041; drill-only reading sub-type fills; the R&W bank otherwise flattens from the already-recreated tests |

Everything else in the R&W bank already comes from the recreated test bundles.

## Audit (measured 2026-09-04)

| Metric | Official (EQB) | Recreated tests (accepted bar) | Drill bank BEFORE |
|---|---|---|---|
| Items with a figure/table | ~20% | 18.6% | 8.8% |
| Numeric choices ascending | ~83% | 67% | 13% |
| Stem median words E / M / H | 32 / 40 / 49 | 26 / 23 / 24 (p90 40/47/48) | 15 / 18 / 22 |
| SPR share | 27% | 27% | 23% (fixed per item — type is frozen) |

Targets for the recreated bank: **figures ≥ 20% per chunk**, **numeric
choices ascending unless a documented rationale**, stems in the official
register (terse, formula-first, no decorative story; roughly E 20-35 / M 25-45 /
H 30-55 words, p90 ≤ 70), distractors that each encode a NAMED error.

## Hard invariants (frozen per item — the tooling refuses anything else)

- `id`, `domain`, `skills`, `difficulty`, `type`, `sourceStyleRef`, `tags`,
  `calculatorAllowed`, `sourceRef`, `createdAt`, and (shards) the exact
  `**SAT Pattern: <Title>**` header text are copied from the CURRENT item. A
  recreated item must still be a *bona fide* instance of that pattern and
  difficulty. Drill routing, review-queue resolution (index-based for topic
  files!), mastery telemetry, and pinned jest suites all depend on this.
- Topic files keep section order and count (review items resolve by index).
- MC = exactly 4 choices with ids A-D in order; fill-in = numeric/fraction
  `correctAnswer`, no choices.
- Explanation scaffold is a product feature — exact section headers:
  - shards start with `**SAT Pattern: <frozen title>**`; topic items do NOT
    carry the header.
  - MC: `**Choice X is correct.**` (X = correctAnswer) → `**The Fast Way
    (~Ns):**` → `**The Full Solution:**` (Step 1/2/3, with a check) → `**Why
    the wrong answers are tempting:**` (one `* Choice L ($value$): <named
    error>` line per distractor) → `**Test Day Takeaway:**`.
  - Fill-in: `**The correct answer is $N$.**` → Fast Way → Full Solution →
    `**Common Mistakes:**` → `**Test Day Takeaway:**`.
- KaTeX: every `$…$` pair balanced; `$` for inline math; `\\$` for money.
- A stem that names a visual (table, figure, scatterplot, dot plot, graph
  shown…) MUST carry a real `diagram` (or `questionTable`) object whose type is
  in the renderer registry (see below). Parameters must match the item's
  numbers exactly.
- No visual-cue words without a diagram; no `**SAT Pattern**` slug drift; no
  new fields beyond the authored contract.

## Authored JSON contract (what a chunk agent writes)

One file per item: `scripts/generated/authored/bank/{source}/{fileId}.json`
(committed). `fileId` = the shard id (`bank-alg-001`) or, for topic files,
`{moduleId}__{section-slug}__{id}` (e.g. `systems__substitution-method__3`).
Both are listed in the chunk file.

```json
{
  "id": "bank-alg-001",
  "question": "…stem, KaTeX inline…",
  "diagram": { "type": "scatterplot", "params": { … } },   // optional
  "questionTable": { "headers": [...], "rows": [[...]] },   // optional (table under the stem)
  "choices": [ { "id": "A", "text": "$12$" }, … ],          // MC only, 4, A-D, numeric ascending
  "distractorNotes": { "A": "drops the negative", "C": "…" }, // optional, MC: per wrong letter
  "choiceOrderNote": "…",   // ONLY if numeric choices are deliberately not ascending
  "correctAnswer": "B",     // or "6" / "-3" / "7/2" for fill-in
  "hint": "…",              // topic-file items only (required when the current item has one)
  "explanation": "**SAT Pattern: <frozen title>**\n\n**Choice B is correct.**\n\n…"
}
```

Anything else in the file is ignored (frozen fields are re-applied from the
source item at assembly).

## Register rules (from the official audit — apply to every item)

1. **Stem voice.** Official phrasing conventions: "In the $xy$-plane…", "The
   function $f$ is defined by…", "Which of the following…", "What is the value
   of…", "…is shown/given." Give the mathematical setup first; contexts are one
   clause, never a story. Variables and numbers in KaTeX. Units stated once.
2. **Difficulty is real.** Easy = one clean move; medium = two moves or one
   translation; hard = a trap, a parameter, a "must be true", or a
   non-obvious setup. Never make a hard slot a one-formula plug-in.
3. **Choices.** Numeric ascending. Each distractor = a specific, plausible
   error (sign slip, wrong variable reported, forgot to divide, used
   diameter for radius…), named in the explanation. Expression choices share
   one form. No "none of the above"-style choices.
4. **Figures.** Each chunk has a `figureTarget` (≥ 20% of its items).
   Items that already carry a diagram keep one (new params). Convert
   prose-described data (tables, plots, graphs, triangles, circles) into real
   `diagram` objects — types + params in `docs/AUTHORING_DIAGRAMS.md` and
   `DIAGRAM_GUIDE.md`. Supported types: rationalFunction, quadraticVertex,
   quadratic, absoluteValue, coordinatePoints, quadraticIntercepts,
   scatterplot, linearLine, simpleLine, table, linearFunctionGraph,
   wavyFunction, generalFunction, dotPlot, boxPlot, dataTable, linearGraph,
   parabola, barChart, circleWithSector, circleWithSquare,
   circleWithInscribedTriangle, intersectingLines, piecewiseLinear,
   cubicGraph, parallelLines, twoLineGraph, twoWayTable, rightTriangle,
   triangleWithAngles, rightTriangleWithAltitude, similarTriangles,
   nestedRightTriangles. Copy the params shape from an existing item of the
   same type in the bank/tests (grep `type: 'dotPlot'` etc.).
5. **Scenarios.** No two items in a chunk share a scenario. Retire the tired
   contexts (lemonade stands, generic "a store sells", "a car travels").
   Prefer the official flavor: measured data, defined functions, models with
   named constants, geometry with given lengths.
6. **Explanations** are full-length: rewrite every section for the new item,
   never thin the scaffold. Fast Way ≤ 2 sentences; Full Solution 3 steps
   ending in a check; Takeaway = the transferable move.
7. **Topic-file items** additionally get a fresh one-sentence `hint` (a nudge,
   not the method).

## Per-chunk workflow (authoring agent)

1. Read this spec, then your chunk file
   `scripts/generated/bankRecreation/chunks/{chunk}.json` (frozen metadata +
   `currentStem` for orientation only — do not reuse its scenario or numbers).
2. For each item pull 1-2 official exemplars on `cbSkillLabel` at the item's
   difficulty: `node scripts/qbankExemplars.mjs --section=math
   --skill="<cbSkillLabel>" --difficulty=E|M|H --n=2` (style anchors ONLY).
3. Write the item JSON. Honor the figure target. Keep a scratch list of
   scenarios used so none repeat.
4. Self-validate until clean: `node scripts/recreateBank.mjs check
   --chunk={chunk}` (schema, scaffold, KaTeX, ascending, visual-cue rule,
   uniqueness vs official + tests + bank). Fix every FAIL; read every warn.
5. Report: items written, figures, any item you could not keep on-pattern.

## Per-wave battery (orchestrator)

```
node scripts/recreateBank.mjs check --chunk=X            # each chunk
node scripts/recreateBank.mjs solvesheet --chunk=X       # → independent re-derivation agent (python)
node scripts/recreateBank.mjs assemble --source=<sources>
node scripts/recreateBank.mjs verify --source=<sources>
npm run bank:validate                                    # validateBank + auditMissingDiagrams --strict
node scripts/lintBankVoice.mjs                           # voice drift report
CI=true npx react-scripts test --watchAll=false          # full jest
git commit                                               # one commit per wave
```

## Learnings (append as waves land)

1. Tooling round-trip verified 2026-09-04 on synthetic items: assembly
   re-imports the file and deep-compares every untouched item (byte-identical
   text is preserved for them; only recreated spans are re-serialized).

## Status board (45 chunks)

| Chunk | Items | Authored | Verified | Assembled | Committed |
|---|---|---|---|---|---|
| algebra-01…09 | 514 | | | | |
| problemSolving-01…08 | 463 | | | | |
| advancedMath-01…08 | 425 | | | | |
| geometry-01…06 | 355 | | | | |
| topic files (14 chunks) | 364 | | | | |
| rw fills | 41 | | | | |
