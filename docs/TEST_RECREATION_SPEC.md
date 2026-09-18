# Test Recreation Spec — Official-Calibration Rebuild (2026-08-31)

**Mission:** Recreate all 12 practice tests so they are indistinguishable in
style, difficulty, and texture from the official digital SAT, using the College
Board Educator Question Bank and the new-300 reference set as the calibration
bar. Students said the tests don't feel real; this rebuild closes that gap.

**Provenance rule (non-negotiable):** Every recreated item is ORIGINAL. We
study official items for register, difficulty, and format — we never copy,
closely paraphrase, or lift scenarios/numbers from them. The uniqueness gate
(`checkUniqueness` in `scripts/calibrateModule.mjs`, Jaccard + 3-gram vs the
official cache) must pass for every authored stem. Literary R&W excerpts must
be genuine public-domain text, verbatim, with correct attribution.

## Reference corpus (local, gitignored or generated)

| What | Where | Notes |
|---|---|---|
| Official SAT Math items (full) | `scripts/generated/cbEducatorQBank.json` | stems/choices/answers/rationales; MathML + plain text |
| Official SAT R&W items (full) | `scripts/generated/cbEducatorQBankRW.json` | same shape; fetched 2026-08-31 |
| Newest ~300 official questions | `knowledge/reference/cb-new-300/` | PDFs + page PNGs + text layers; math equations only visible in PNGs |
| Exemplar CLI | `node scripts/qbankExemplars.mjs --section=math --skill="Linear functions" --difficulty=H --n=3` | prints official items as style anchors |

## Audit findings driving the rebuild (measured 2026-08-31)

1. **Figure/table density.** Official: ~20% of math items carry a figure or
   table (and graph items show a real rendered graph). Ours: 8%, mostly prose
   descriptions. Target: **4-5 visual items per 22-question module**, using the
   existing components in `src/components/graphs/` (25+ types; see
   `DIAGRAM_GUIDE.md` and `QuestionDiagrams.jsx` for the schema).
2. **Numeric choice ordering.** Official sorts numeric choices ascending in
   ~83% of items. Ours is unordered. Rule: sort numeric choices ascending
   unless a distractor-position rationale demands otherwise.
3. **Stem register.** Official median stem length: E=32 / M=40 / H=49 words
   (p90: 60/70/82). Terse, formula-first, zero decorative story. Our hard items
   run short and our easy items over-explain. Match the norms per difficulty.
4. **SPR share.** Official 27% student-produced response. Ours 25% — keep 5-6
   fill-in per 22-question module, including late-module hard SPRs.
5. **R&W structure** already matches the official module flow (vocab first,
   notes last) and blueprint counts — keep them exactly. The gap is passage
   register and question texture, not structure. Passage cap: **150 words**.

## Hard invariants (pinned by tests — breaking these fails CI)

- Math main file `practiceTest{N}.js`: 2 modules × 22 questions.
  - M1: domains 7 Algebra / 6 Advanced / 5 PSDA / 4 Geo-Trig; mix ≈ 4E/9M/9H.
  - M2 (hard): 0E/6M/16H, band-6/7 ceilings, Q1-5 warm-ups are never trivial
    (2+ steps or a trap — see `feedback` memory + Bluebook hard register).
  - M2Easy `practiceTest{N}M2Easy.js`: 22 questions, 3E/13M/6H, Q1-3 easy openers.
- **Every math item's explanation must carry `**SAT Pattern: <Title>**`** whose
  slug (kebab-case of the title) is an EXISTING pattern from
  `scripts/audit-output/practice-bank-inventory.json` / `PATTERN_ALIASES` in
  `src/data/questions/extractSatPattern.js`. New slugs break Tier-1 drill
  routing. No parenthetical qualifiers in the header.
- No visual-cue words in stems ("scatterplot", "the table", "the figure",
  "histogram"…) unless the item carries a real `diagram`/`table` object
  (`scripts/auditMissingDiagrams.mjs --strict` enforces).
- Bands: easy=1-3, medium=4-5, hard=6-7 (official `scoreBandRangeCd` axis).
- R&W modules: exact 27-slot blueprint order (see `BLUEPRINT_SKILLS` in
  `src/data/practiceTests/__tests__/testBundleIntegrity.test.js`): 4 words-in-context,
  3 text-structure, 1 cross-text (`passages` array), 3 central-ideas,
  1 COE-textual, 2 COE-quantitative (`questionTable` required), 2 inferences,
  6 conventions (boundaries/form alternating), 3 transitions,
  2 rhetorical-synthesis (`studentNotes` with ≥5 bullets + goal).
  RWM2Easy: 8E/16M/3H. RW question stems must use the canonical CB stems in
  `RW_STEM_REGISTRY` (`scripts/validateRWBank.mjs`).
- IDs: math 1-22 per module; RW 101-154; M2Easy variants use their existing
  id ranges (never colliding with the standard modules). KEEP existing id
  schemes — first-match lookups and drill routing depend on them.
- Explanation format (both sections) is a product feature — keep the exact
  scaffold: `**SAT Pattern: X**` (math) / layout headers, `**Choice X is
  correct.**`, The Fast Way (~Ns), The Full Solution, Why the wrong answers
  are tempting (one line per distractor, naming the specific error), Test Day
  Takeaway. Rewrite content to fit the new item; never thin it out.
- KaTeX: every `$...$` pair balanced (`scripts/inlineMathScan.js` axis);
  `$` for inline math everywhere, `\\$` escaped dollars in money contexts.

## Per-module recreation workflow

1. Read the current module file (structure + metadata skeleton = keep;
   stems/choices/scenarios = replace).
2. For each slot: pull 2-3 official exemplars on the same CB skill and
   difficulty via `qbankExemplars.mjs`; write a FRESH item in that register
   (new scenario, new numbers, official phrasing conventions), same
   skills/pattern metadata, difficulty, band, and type as the slot demands —
   upgrading 3-4 prose-described slots per module to real diagram/table items.
3. Choices: 4 options A-D (math MC), numeric ascending; distractors must each
   encode a NAMED error mode (documented in the explanation).
4. Validate (all must pass):
   - `node scripts/calibrateModule.mjs --lint --test=N`
   - `node scripts/auditMissingDiagrams.mjs --strict` (scoped to the test)
   - `CI=true npx react-scripts test --watchAll=false --testPathPattern="testBundleIntegrity"`
   - R&W: `node scripts/validateRWBank.mjs --test=N` (or `--all`)
   - uniqueness gate vs official cache (script hook in calibrateModule)
5. R&W authored JSON lives in `scripts/generated/authored/test{N}/q{NN}.json`;
   regenerate the bundle with `node scripts/assembleRWTest.mjs --test=N --ship`.
   NEVER hand-edit `practiceTest{N}RW.js`.

## Learnings baked in from Test 1 (apply to all subsequent tests)

1. **R&W explanations carry the production scaffold IN THE AUTHORED JSON** —
   exactly: `**Choice X is correct.** <verdict>` … `**The Full Solution:**` …
   `**Why the other choices are wrong:**` with per-letter named failures.
   (Production bundles were reformatted post-assembly in the past; authored
   source is now the single source of truth.)
2. **Pre-assign disjoint topic palettes** to concurrent R&W module agents —
   they cannot see each other's work. M1 co-occurs with both M2 tracks; M2
   and M2Easy never co-occur with each other. No specific topic (e.g. "seed
   vaults", "urban birdsong") may repeat across co-occurring modules.
3. **Uniqueness gate:** run `node scripts/verifyRecreation.mjs --test=N`.
   Never hand-roll the corpus load — TWO shapes silently pass everything:
   (a) `indexCorpus` must receive the cache `items` OBJECT, never an array of
   cache values (that indexes nothing); (b) for an OBJECT corpus `indexCorpus`
   reads `stemPlain || stimulusPlain`, which is right for math (no math item
   has a stimulus) but WRONG for R&W — an R&W `stemPlain` is the canonical CB
   stock stem (median 14 words) and the passage lives in `stimulusPlain`
   (median 64). The R&W corpus must be built explicitly as an `[{id, text}]`
   list off HTML-entity-decoded `stimulusPlain` (see `verifyRecreation.mjs`
   and `recreateRWFills.mjs`); until 2026-09-05 it was not, and a verbatim CB
   stimulus scored jaccard 0.05 and passed. Both scripts now carry a control
   probe that hard-exits if a verbatim official stimulus passes.
4. **Math M2 hard-track Q1-5 warm-up rule:** 2+ steps or a trap — one-formula
   plug-ins are forbidden even on easy-band slots (e.g. hypotenuse-from-legs
   is out; missing-LEG with the add-squares trap is in).
5. **Longest-answer tell (R&W):** the correct choice may be uniquely longest
   in at most ~45% of prose items per module.
6. **Named people in R&W items** must be real and registered in
   `scripts/generated/rwSources/researchers.json`; literary quotes must be
   verifiably genuine public-domain verbatim (never fabricate attributions).
7. **Answer keys:** rebalance so no letter dominates (roughly 5-9 per letter
   per 27; math MC spread similar per module).
8. **Independent math answer verification** (re-solve all items with python,
   check distractor derivations and diagram-param consistency) runs as a
   separate pass before commit.
9. **Preserve each slot's SUB-TYPE, not just its skill** (added after wave 1;
   amended after wave 2): for boundaries slots keep the punctuation convention,
   for transitions slots the winner's relation category (bucket lists in
   src/data/questions/rwBank/deriveRWPattern.js). **Baseline = the OLD
   PRODUCTION BUNDLE** (`git show HEAD:src/data/practiceTests/practiceTest{N}RW.js`),
   NOT the authored JSON — bundles diverged from authored sources historically,
   and the live bank flattens from bundles. The frozen deriveRWPattern
   distributions churn (and Tier-1 pools can dip under 8) when sub-types drift.
10. **Choice-length parity**: max/min ≤ 2.4x in words per item. When
    rebalancing the longest-correct tell, pad moderately — overshooting
    creates parity violations.
11. **Topic ledger**: `scripts/generated/recreation-topic-ledger.md` lists
    every topic/anchor used by recreated tests — grep candidates against it
    and against the recreated authored dirs before finalizing.

## Rollout / safety

- Rebuild happens IN PLACE, test by test, one commit per test
  (`git commit` locally; the founder pushes when satisfied — Vercel deploys
  from main on push).
- Past attempts are safe: review renders from per-attempt snapshots; legacy
  attempts fall back to the live file behind the existing stale-content notice.
- The R&W drill bank flattens from the test bundles automatically; the math
  drill bank is separate and untouched by this rebuild.

## Status board

| Test | Math M1+M2 | Math M2Easy | RW 54 | RW M2Easy | Validated | Committed |
|---|---|---|---|---|---|---|
| 1 | done | done | done | done | done | done |
| 2 | done | done | done | done | done | done |
| 3 | done | done | done | done | done | done |
| 4 | done | done | done | done | done | done |
| 5 | done | done | done | done | done | done |
| 6 | done | done | done | done | done | done |
| 7 | done | done | done | done | done | done |
| 8 | done | done | done | done | done | done |
| 9 | done | done | done | done | done | done |
| 10 | done | done | done | done | done | done |
| 11 | done | done | done | done | done | done |
| 12 | done | done | done | done | done | done |

Catalog complete 2026-09-01: commits 64e7d5b, 8d40023, 1f9d194, 7661bb6, 62fa6c3, ff678b0, 9f2dcff. validateRWBank --all: 0 violations across 972 items. Full jest: 3,045/3,045.

**Diagnostic recreated 2026-09-02:** the diagnostic (full + check-in, plus the
legacy flag-off sampler) now serves ONLY recreated content — math via
`src/data/questions/mathTestBank/` (792 items flattened from the 12 math
bundles + M2Easy variants, namespaced `math-test{N}-{moduleId}-{qId}`) and R&W
via the bundle-fed rwBank minus its drill-only `rw-authored-*` fills. Resume of
pre-switch in-progress sittings falls back to the legacy math drill bank. The
hand-authored math drill bank still serves Study Plan drills and remains the
one large pre-recreation-register corpus (candidate for a future wave).
