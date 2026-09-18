# Test Recreation v2 — Freshness Rebuild of the 12 Math Test Bundles (2026-09-07)

**Why.** The 2026-08-31 recreation (docs/TEST_RECREATION_SPEC.md) froze every
slot's SAT Pattern and handed authors the old item "for orientation". Measured
result: 59% of the 792 math items are the old question with new numbers, 18%
the same template, 23% new; 35% have a near-verbatim twin in another test.
Students who had taken the earlier tests reported the "new" tests as the same
tests. This pass fixes the cause, not the symptom:

1. **Every slot gets a different archetype** than it carried in BOTH earlier
   versions (pre-08-31 and 08-31), chosen from the Tier-1-routable pool and
   spread evenly across the 12 tests. The plan also assigns a surface **form**
   per slot (bare / context / figure / parameter / reverse / interpret) so an
   archetype never wears the same clothes twice.
2. **Freshness gate.** A stem is rejected if it is close (character-trigram
   Dice ≥ 0.55 on digit-masked text) to ANY stem a student may have met: the
   pre-08-31 tests, the 08-31 tests, the 2,121-item drill bank, or any other
   new item. Warn at ≥ 0.45. The old official-corpus gate still applies.
3. **Module 2 difficulty flow is re-dealt** per test (satisfies `M2_FLOW`,
   differs from both earlier sequences). M1/M2Easy keep their on-disk order
   (the runner shuffles them per test; the assembly seed is bumped to `v2` so
   returning students also see a new order and new key letters).

Everything else from the v1 spec stands: official register, figure density
≥ 20%, ascending numeric choices, stem norms E32/M40/H49 (median words),
5-6 SPR per module, explanation scaffold, KaTeX rules, approved pattern
registry (`APPROVED_PATTERN_NAMES` in `scripts/calibrateModule.mjs`).

## Pipeline — `scripts/recreateTestMath.mjs`

```
node scripts/recreateTestMath.mjs plan --all                # pool + seen corpus + per-test plan + chunks (gitignored WORK dir)
node scripts/recreateTestMath.mjs check --chunk=test1-m1    # schema, scaffold, KaTeX, ascending, figures, FRESHNESS, official uniqueness
node scripts/recreateTestMath.mjs solvesheet --chunk=test1-m1
node scripts/recreateTestMath.mjs assemble --test=1         # splice verified JSON into the bundle files (re-import verified)
node scripts/recreateTestMath.mjs verify --test=1           # live == authored, all gates on the live file
node scripts/recreateTestMath.mjs freshness --test=1        # report-only Dice census on live files
node scripts/recreateTestMath.mjs status
```

Authored JSON (COMMITTED): `scripts/generated/authored/tests2/test{N}/{m1|m2|m2easy}-q{NN}.json`.
Plans/chunks/seen corpus (gitignored): `scripts/generated/testRecreation2/` — regenerate with `plan --all`
(deterministic per test: seeded by test number, so re-planning reproduces the same assignments unless the
pool or the earlier-version refs change).

**Frozen per slot** (the tooling re-applies these at assembly): `id`, `type`, `difficulty`, `band`
(M2: from the re-dealt sequence), `skills` (from the archetype), the exact `patternTitle`.
**Authored per slot**: `question`, `diagram`/`questionTable`/`questionFormula`, `choices`, `correctAnswer`,
`explanation`, `distractorNotes` (REQUIRED for every wrong letter — the lint needs the `// distractor:` comment),
optional `choiceOrderNote`.

## Authored JSON contract (one file per slot)

```json
{
  "id": 7,
  "question": "…stem, KaTeX inline…",
  "diagram": { "type": "scatterplot", "params": { … } },      // when the slot's `figure` is true (or by choice)
  "questionTable": { "headers": [...], "rows": [[...]] },      // alternative to diagram
  "choices": [ { "id": "A", "text": "$12$" }, … ],             // MC only, 4, A-D, numeric ascending
  "distractorNotes": { "A": "drops the negative", "C": "…", "D": "…" },
  "correctAnswer": "B",                                        // or "6" / "-3" / "7/2" for fill-in
  "explanation": "**SAT Pattern: <patternTitle from the chunk>**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** …\n\n**The Full Solution:**\nStep 1: …\nStep 2: …\nStep 3: … check ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (…): …\n* Choice C (…): …\n* Choice D (…): …\n\n**Test Day Takeaway:** …"
}
```

Fill-in explanations use `**The correct answer is …**` and `**Common Mistakes:**` instead of the
choice lines. Diagram types + params: `docs/AUTHORING_DIAGRAMS.md`, `DIAGRAM_GUIDE.md`; copy a params
shape from an existing item of the same type (`grep -n "type: \"scatterplot\"" src/data/practiceTests/*.js`).
`diagram.params` must never contain `$` (renderers print raw text). Figures must not print the answer.

## Authoring rules (per chunk agent)

1. **Read the chunk file only.** Do NOT open the current bundle file or any earlier version for ideas —
   the gate compares against all of them and will reject anything close. `currentStem` is deliberately absent.
2. For each slot: archetype = `patternTitle` (+ `cbSkillLabel`), difficulty, type, `form`/`formHint`,
   `figure`. Pull 1-2 OFFICIAL exemplars for the CB skill as style anchors only:
   `node scripts/qbankExemplars.mjs --section=math --skill="<cbSkillLabel>" --difficulty=E|M|H --n=2`.
   Never lift an official scenario or its numbers.
3. Honor the **form**. If a form is genuinely impossible for an archetype, use the nearest other form and
   say so in your report. `figure: true` slots MUST carry a real `diagram`/`questionTable` whose params
   match the numbers.
4. **Fresh setups.** No two items in your chunk share a scenario; retire lemonade stands, generic stores,
   "a car travels". Prefer measured data, defined functions, models with named constants, geometry with
   given lengths. Stems ≥ 10 words unless a figure carries the setup (bare one-line equations are what
   produced the twins). Stem word medians E32/M40/H49.
5. Difficulty is real: easy = one clean move; medium = two moves or a translation; hard = a trap, a
   parameter, a "must be true", or a non-obvious setup — never a one-formula plug-in. M2 hard-track
   Q1-5 warm-ups are 2+ steps or a trap.
6. Choices: numeric ascending; each distractor encodes ONE named error, written in `distractorNotes`
   and named again in the explanation. Spread the correct letters (no letter > 40% in your chunk).
   Fill-in answers fit the Bluebook grid (≤ 5 characters, 6 with a leading minus).
7. Explanations are full length, rewritten for the item: Fast Way ≤ 2 sentences; Full Solution 3 steps
   ending in a check; Takeaway = the transferable move. The `**SAT Pattern: …**` header must equal the
   chunk's `patternTitle` exactly.
8. Compute every number you claim (answer, each distractor, each "Common Mistakes" value) with python
   before writing it. Verifiers' #1 finding in every prior wave: the distractor number does not match
   the stated error.
9. Self-validate until clean: `node scripts/recreateTestMath.mjs check --chunk=<chunk>`. A FRESHNESS
   fail means change the setup (different givens, different unknown, different form) — not the numbers.
   Score a draft stem before writing the whole item: `node scripts/recreateTestMath.mjs score --text="…"`
   (prints the nearest seen/new stem and a FAIL/warn/ok verdict). Bare one-line equation stems for the
   saturated algebra/geometry archetypes routinely score 0.6-0.9 — give them a specific setup.
   Stay inside the chunk's `palette` (three scenario themes) so parallel chunks never collide.
10. Report: items written, figures, any slot where you deviated from the form, anything you could not
    keep on-archetype.

## Verification (per chunk, independent agent)

`solvesheet --chunk=X` writes the authored items without the answer letter context to
`scripts/generated/testRecreation2/solvesheets/X.json`. The verifier re-derives every answer with python,
checks each distractor against its named error, checks diagram params against the stem's numbers (and
that the figure does not reveal the answer), checks the hard slots are actually hard, and writes fixes
directly into the authored JSON, then re-runs `check`.

## Orchestrator battery per test

```
node scripts/recreateTestMath.mjs check --test=N
node scripts/recreateTestMath.mjs assemble --test=N
node scripts/recreateTestMath.mjs verify --test=N
node scripts/calibrateModule.mjs --lint --test=N
node scripts/auditMissingDiagrams.mjs --strict
CI=true npx react-scripts test --watchAll=false --testPathPattern="testBundleIntegrity|answerKeyBalance|difficultyRampVariation|bankDiagramRender|recreatedBankRender|mathTestBank"
git commit   # one commit per test (or wave)
```

## Status board

| Test | m1 | m2 | m2easy | verified | committed |
|---|---|---|---|---|---|
| 1 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 2 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 3 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 4 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 5 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 6 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 7 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 8 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 9 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 10 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 11 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |
| 12 | done | done | done | done (lint 0, audit 0, jest 106/106, freshness 0/66) | 2026-09-07 |

## R&W seating variation (2026-09-07, `scripts/varyRWSeating.mjs`)

All 36 R&W modules carried one identical 27-slot skill sequence. Items are now re-dealt INSIDE their
official skill blocks with a per-test seed (vocab first, notes last, CI opens and INF closes the
Information & Ideas block, per-skill counts unchanged, item text untouched, ids travel with items).
Result: 36/36 distinct seating charts. Deterministic and idempotent (`--all` twice = no change);
`--report` prints the census. `testBundleIntegrity` now pins block flow + counts instead of the exact
order. Content-level R&W variation (different skill COUNTS within official ranges, which needs new
items) remains a possible follow-up.

## Learnings (append as waves land)

1. (from v1) Parallel content lanes collide on invented names and overshoot targets — keep the
   scenario ledger per chunk and run `check` across the whole test before assembling.
2. (Test 1) The `bare` form is unwritable under the gate: bare one-line stems for algebra/geometry
   archetypes score Dice 0.6-1.0 against the seen corpus (one draft was a literal twin of a bank
   item). Authors converted every bare slot to a one-clause context. From Test 4 on, `bare` is out
   of the rotation; a specific setup is the default. Side effect: easy stems run long (E median
   37-51 vs official 32) because length is what dilutes boilerplate trigrams — verifiers trim filler.
3. (Test 1 verify) `barChart` prints no value labels: every bar value must land on a `yStep` gridline
   and the tallest bar must sit below `yMax` (`check` now enforces both). Verifiers' other catches:
   a hard slot that was a one-move plug-in with a structurally guessable key (all four choices must
   share one shape), and a distractor whose stated error did not produce its number.
4. (Tests 2-5 verify) Recurring catches now mirrored in `check` where mechanical: DiagramValidator's
   required params (rightTriangle `vertices`, triangleWithAngles `angleLabels`, parabola `vertex`,
   twoLineGraph `intersection`+slopes), dotPlot window ≤ 50 units (12px dots overlap beyond that).
   Still human-only: physically wrong premises (an upward "arch", a 34 g apricot half, a "dinghy" with
   a 756 ft² sail), method/trap-revealing clauses, a hard slot that is a plug-in, a "check" that uses a
   non-solution, a decoy table row that reproduces the key, scenario collisions across a chunk,
   renderer proportions that contradict labels (→ `figureNote: true`).
5. (Tests 6-7) `linearGraph` applies ONE `gridInterval` to both axes — a tall yRange draws dozens of
   4px gridlines; `check` now caps each axis at 26 gridlines and warns when the line leaves the window.
   `score` no longer reports an already-saved copy of the stem as its own nearest new neighbour.
6. (Test 8) `auditMissingDiagrams --strict` maps the word "residual" to a REQUIRED scatterplot — a
   questionTable does not satisfy it. Table-based residual items must say "compares the recorded value
   with the model's prediction" instead of "residual" in the stem.
