# CLAUDE.md — SEVA orientation for Claude Code (and humans)

SEVA (formerly PerformSAT) is a digital-SAT prep web app: students take adaptive practice tests, get a diagnostic-driven study plan, drill weak skills, and track score trajectory toward a target. Built on Create React App + Firebase. ~256 JS/JSX files in `src/` (~9.7MB).

The product was renamed PerformSAT → SEVA on 2026-05-21 (briefly via Sura → Seva). The logo (2026-06-15) is all-caps **"SEVA"** in rounded Baloo 2 where the **S is the tri-color mark** (orange/purple/lime horizontal bands) and each remaining letter takes one brand color — **E orange, V purple, A lime**. `src/components/ui/Mark.jsx` is the tri-color S (a Baloo 2 "S" with a vertical gradient clipped to the glyph via `background-clip: text`); it doubles as the favicon and the collapsed-sidebar icon. `src/components/ui/Wordmark.jsx` is the full SEVA wordmark (Mark + colored E/V/A) and feeds every render site. The favicon/PWA/OG PNGs in `public/` are rendered from the mark/wordmark. In prose the brand name is still written **SEVA**. Internal identifiers (the `performsat:` log-scope prefix, `localStorage['performsat:logVerbose']`, the `PERFORMSAT_TEST_EMAIL`/`PERFORMSAT_TEST_PASSWORD` env vars, the `PerformSAT` React component name in `src/App.jsx`, the repo directory `~/PerformSAT/`) deliberately retain the old name to avoid coordinated-rename risk. New code may use either name in identifiers — be consistent within a module.

The codebase is mid-scale, mostly mature, with one large orchestrating file (`src/App.jsx`, ~2.5k lines) that owns view state and practice-session state. The recent direction is closing UX gaps vs Acely AI, surfacing the deeper diagnostic engine, and tightening drill routing to exact-question-type precision (see `docs/DRILL_ROUTING_PLAN.md`).

This file is the orientation document for new contributors and LLM agents. Keep it up to date when architecture moves.

## Quick start

```bash
npm install
npm start          # dev server (CRA, port 3000)
npm test           # Jest watcher
CI=true npx react-scripts test --watchAll=false   # run all tests once
CI=true npm run build                             # what CI runs: lint warnings FAIL the build
```

Node 24 is required (`.nvmrc`, `engines.node`); the functions runtime and CI use
it too. The lockfile must stay valid under npm 10 as well as npm 11 — after any
dependency change run `npx -y npm@10 ci --dry-run --ignore-scripts` and expect
zero `npm error` lines. CI (`.github/workflows/ci.yml`) is the gate: unit tests,
content-bank validators, a `CI=true` production build, functions typecheck +
lint + tests, Firestore rules tests, and a hermetic browser E2E. A commit is not
done until `gh run list --branch main --limit 1` shows it green.

Firebase config lives in `src/firebase/config.js`. To run against a real project you need a `.env.local` with the Firebase keys (template at `.env.local.template`). To dogfood the study plan or drill flow locally, run `npm run dev:emulator` then `npm run dev:seed` (seeds one student + a completed test + a study plan). No `schools` doc is needed: the school/principal (B2B2C) model was removed 2026-05-29 in favor of direct-to-consumer; the app is now owner-only.

## The big picture

```
Student logs in
   │
   ▼
StudentDashboard  ──────── Default landing. Two tabs with count badges:
   │                       "Dashboard (N)" + "Study Plan (N)"
   │   ├─ Dashboard tab → main column (TodaysTasksCard with per-activity
   │   │                  sub-cards + Predicted vs Actual) +
   │   │                  right rail (CalendarMonth + score-with-delta +
   │   │                  goal/exam two-up + DashboardDiagnosticWidget)
   │   └─ Study Plan tab → <StudyPlanDashboard /> with focus-area cards
   │                        (italic Diagnostic Sentence below each)
   │
   ▼  (student takes a practice test)
PracticeTest.jsx  ──────── Full-length test runner. Builds groundTruth diagnosis
                            on completion, persists studyPlanArtifact to Firestore.
   │
   ▼  (test completes)
diagnosticEngine.js  ──── Classifies errors (6-class taxonomy), aggregates skill
                            accuracy, builds weaknesses[]/strengths[]/etc.
   │
   ▼
studyPlanGenerator.js ── Generates week-by-week plan from the diagnosis.
   │
   ▼  (drill flow)
StudyPlanDashboard.jsx ── "Skills to Improve" cards. Each card calls
                            getTargetedWeaknessSet() with the weak skill →
                            returns drill question IDs.
   │
   ▼  (student clicks Practice)
AssignedPracticeShell.jsx ─ The PRODUCTION DRILL PATH. Renders the question +
                            feedback panel for assigned (study-plan-driven) drills.
```

## The three practice shells (important — pick the right one)

There are three components that look like "the drill UI." They serve different purposes:

| Shell | Purpose | Mount path | When to use |
|-------|---------|------------|-------------|
| `AssignedPracticeShell.jsx` | **Production drill path** for study-plan focus areas | `App.jsx` view='practice', `practiceMode='assigned'` | Anything the student reaches via "Practice" button on Study Plan |
| `AdaptivePracticeShell.jsx` | Alternate adaptive practice (difficulty adjusts) | `App.jsx` view='practice', `practiceMode='adaptive'` | The adaptive flow launched separately. Not study-plan-driven. |
| `PracticeTest.jsx` | Full-length timed practice test | `App.jsx` view='takingTest' | Only for full mock tests, not drills |

When the plan says "add a button to the drill flow" or "after a wrong answer in practice," it means **AssignedPracticeShell**. `QuestionRenderer.jsx` is just a math/text segment renderer — no answer state, no feedback panel.

The mutation rules also matter: `AssignedPracticeShell` is a **controlled component** with no local state for the question list. Session state (the `shuffledQuestions` array, current index, answers, **rounds[]**, **currentRoundIndex**) lives in `App.jsx` as `practiceState`. To insert / advance questions mid-session, the handler MUST live in `App.jsx` and the shell receives a callback prop.

### Round structure (Acely-polish Day 2)

`practiceState.rounds[]` carries `{ index, questionIds, label, startedAt, completedAt }`. `buildRounds(questionIds, 8)` from `services/buildRounds.js` splits the queue at session start. The shell renders the question header as `Round N · Q M of K` and pauses on a celebration interstitial between rounds. `handleNextQuestion` checks `classifyRoundBoundary` to decide whether to advance to the next question or show the interstitial; `handleAdvanceToNextRound` handles the user's "Continue to next round" click.

## The data flow that matters most

```
PracticeTest finishes
   │
   ▼
buildGroundTruthDiagnosis(diagReport)  ─── PracticeTest.jsx:41
   │  builds: { strengths, weaknesses, calculatorDependency, ... }
   │  ★ weakSkills entries are the DRILL-shape, fed into:
   │
   ▼
enrichPlanWithGroundTruth(plan, groundTruth)  ─── PracticeTest.jsx:140
   │  plan.weaknesses = groundTruth.weaknesses
   │  plan.targetedQuestionIds = getTargetedWeaknessSet(...)
   │
   ▼
studyPlanArtifact persisted to Firestore  (useProgress hydrates it)
   │
   ▼
StudyPlanDashboard renders weaknesses → calls getTargetedWeaknessSet
   │  per weakness → routes by weakness.section ('math' | 'rw')
   │
   ▼  ★ section-tag contract (Day 0 of Acely-parity batch — see below)
math weaknesses → src/data/questions/bank/getTargetedWeaknessSet
rw weaknesses   → (currently 'Drill coming soon'; lands in item #1)
```

## The weakness shape contract

Every drill-shape weakness on `studyPlan.weaknesses` carries a `section` field:

```js
{
  skillId: 'slope-intercept-form',         // canonical skill ID
  skill: 'Slope-intercept form',           // display name
  evidence: '4/6 correct, primary error: ...',
  accuracy: 42,                            // testAccuracy %
  errorType: 'Conceptual gap',
  domain: 'algebra',                       // e.g. 'algebra' | 'craft-and-structure'
  modules: ['module-1'],                   // legacy plural — modules where skill appears
  sections: [...],                         // legacy plural — same axis as `modules`
  section: 'math' | 'rw',                  // ← Day 0 contract (test subject axis)
}
```

Read with the selector module to apply the rollback-safety default (legacy weaknesses without `section` are treated as math):

```js
import { getMathWeaknesses, getRWWeaknesses, getWeaknessSection }
  from '@/services/selectors/weaknesses';
```

The legacy `sections` (plural array) and the new `section` (singular string) are **different axes**. `sections` is the modules-where-the-skill-appears list; `section` is math vs R&W. Don't conflate them.

The diagnostic adapter in `services/scoring/diagnosticAdapter.js` builds a **separate** narrative-shape weaknesses array (`{id, name, why, proof, impact, severity}`) for diagnostic-report rendering. That's not the same data as `plan.weaknesses` and isn't fed into `getTargetedWeaknessSet`. Don't confuse the two.

## What already exists (don't rebuild)

| Capability | Where | State |
|------------|-------|-------|
| Question banks (math + R&W) | `src/data/questions/bank/index.js` (math, **1373 hand-authored items** after the 2026-05-18 PT-coverage batch v3.4) and `src/data/questions/rwBank/index.js` (R&W, **678 items** — 648 flattened from 12 test bundles + 30 drill-only authored fills in `authoredReadingItems.js`). Plus `src/data/questions/mathTestBank/index.js` (**792 recreated items** flattened from the 12 math test bundles + M2Easy variants, 2026-09-02) — the DIAGNOSTIC samples math from this pool (`loadMathTestBank`), while drills keep the hand-authored bank. | Both production. Section-tag weakness contract dispatches by `weakness.section`. CB-skill coverage: **19 healthy / 0 thin / 0 empty**. Surfaced Practice Bank question types: math **121**; R&W **40** (16 grammar/punctuation/structure + **24 reading-comprehension sub-types** added 2026-06-18 via `rwReadingType.js` — every R&W skill now has a breakdown; was 7 skills with none). |
| Adaptive Module 2 (BOTH sections) | Content: `src/data/practiceTests/practiceTest{N}M2Easy.js` (math, 22q) + `practiceTest{N}RWM2Easy.js` (R&W, 27q — added 2026-07-31, all 12 tests). Wiring: `practiceTests/index.js` attaches `module2Easy` / `rwModule2Easy`. Runner: `PracticeTest.jsx` keeps independent `module2Variant` / `rwModule2Variant` state; each section routes off ITS OWN Module-1 accuracy at `M2_ROUTING_THRESHOLD` (60%) in `handleNextModule`, and `effectiveModules` swaps that section's M2 slot. The student picks the variant ONCE, on the module-complete screen after that section's Module 1 ("Choose your Module 2", recommendation pre-selected, `m2VariantManuallySet` persisted); the choice locks when the module begins — there is deliberately NO in-module switch (removed 2026-09-07; pinned by `__tests__/PracticeTest.m2Chooser.render.test.jsx`). Scoring: `scoreTest(..., { mathRoute, rwRoute })` → route-aware `scaleTables` columns (both easy curves cap at 600). | Production. Mirrors the official adaptive digital SAT, where both sections route. Invariants pinned in `practiceTests/__tests__/testBundleIntegrity.test.js` (blueprint order, 8E/16M/3H mix, id uniqueness); the R&W variants are linted by `node scripts/validateRWBank.mjs --all` alongside the standard modules. **Legacy attempts have no `rwRoute` and default to hard — never derive an R&W route from M1 accuracy, or old scores silently change.** |
| Three-tier drill routing (math) | `src/data/questions/extractSatPattern.js` (lazy SAT Pattern extractor + ~85-entry `PATTERN_ALIASES` map), `src/data/questions/bank/index.js::getTargetedWeaknessSet` (Tier 1 satPattern → Tier 2 sourceStyleRef → Tier 3 skill cascade with thresholds `TIER1_PATTERN=8` / `TIER2_STYLE=12`), `decideTier` helper (mirrors cascade without selection — used by drill-shell telemetry), plus a `TOPIC_SECTION_TO_PATTERN` fallback that lifts ~170 topic-file items into Tier 1 by mapping unambiguous (sourceModuleId, sectionName) pairs to canonical pattern slugs | Production. Tier 1 fires for ~83% of main-test items. R&W drill routing stays Tier 3 (skill) only (deferred — see `rwBank/index.js::getTargetedWeaknessSet`). NOTE the deliberate split in `rwBank/deriveRWPattern.js`: `deriveRWPattern` is the routing signal (grammar/punctuation/structure only; reading skills → null) while `deriveRWQuestionType` is the Practice Bank BROWSE type (adds the 24 reading sub-types from `rwReadingType.js`). Surfacing reading types for browsing does NOT activate reading drill routing. |
| Drill chip (`Practicing: <Pattern>`) | `src/services/selectors/missedPatternLabel.js` + chip render in `AssignedPracticeShell` and `AdaptivePracticeShell`. Chip is gated on the pattern bank pool actually being viable (≥ `TIER1_PATTERN_THRESHOLD`) so it doesn't mislead when only Tier 3 fires. | Production. Pairs with `drill_started` / `drill_chip_shown` analyticsService events for measuring routing precision impact. |
| 6-class error taxonomy | `src/services/diagnosticEngine.js:128-172` | Built. Surfaces as italic editorial sentences via `formatDiagnosticSentence(weakness)` below Focus Area cards + after wrong answers in AssignedPracticeShell. |
| Prediction engine + validation history | `src/services/predictionEngine.js` | Built. Surfaced via `<PredictedVsActualCard>` on the Dashboard tab; selector at `selectors/predictionSummary.js`. |
| Intervention tracker | `src/services/interventionTracker.js` | Built. Currently consumed by AiTutorChat. |
| 4 coach modes | `src/services/aiCoachModes.js` (hint ladder, mistake replay, teach-back, exam strategy) | Built. `CoachModePicker.jsx` is mounted in `AiTutorChat.jsx` above the input. |
| Study plan tab on homepage | `StudentDashboard.jsx` (activeTab state + tab bar with count badges + Study Plan tab mount) | Shipped 2026-03-27; refreshed in Acely-polish batch (right-rail composition). |
| Trend / longitudinal analysis | `src/services/studyPlanMerger.js`, `trendContextBuilder.js` | Built. Persistent-weakness escalation works; surfaces as a small banner. |
| Pacing analysis | `src/services/pacingService.js` | Built. PacingDrillCard.jsx component exists but is not yet wired into the dashboard. |
| Daily review queue | `src/services/dailyReviewEngine.js`, `DailyReviewCard.jsx` | Built; mounts on dashboard. Streak tracking lives here. |
| Today's Tasks hero | `src/components/TodaysTasksCard.jsx` | Built. Renders per-activity sub-cards (Acely-style). Uses `getTodaySlice(plan, todayDayName)` from `studyPlanGenerator.js`. |
| Calendar-month adherence | `src/components/CalendarMonth.jsx` + `selectors/practicedDays.js` | Built. Mounts in dashboard right rail. Replaces the v1 91-tick CalendarStrip. |
| Per-day editorial intro | `services/selectors/dailyIntro.js` | Built. Aggregates today's activities + latest score + top weakness into a 1-2 sentence coach paragraph above TodaysTasksCard. |
| Round-based drill flow | `src/services/buildRounds.js` + `practiceState.rounds[]` | Built. Splits a 24q drill into 3 rounds × 8 with celebration interstitial. Helpers: `buildRounds`, `findRoundIndexForQuestion`, `computeRoundProgress`, `classifyRoundBoundary`. |
| Try-Similar drill button | `services/trySimilarService.js` | Built. Mounts inside AssignedPracticeShell feedback panel. 500ms debounce + pool-exhaustion gate. |
| Toaster (transient notifications) | `components/ui/Toaster.jsx` | Built. Module-level pubsub + single useState queue. Mounted once at App root. `import { showToast } from './components/ui/Toaster'`. |
| Hand-Authored Stamp | `components/HandAuthoredStamp.jsx` | Built. 28×28 SVG monogram on every drill question card. |
| Post-test surface (2026-08-26) | `components/TestResults.jsx` (`screen='summary'` score overview / `screen='diagnosis'` AI diagnosis) + `components/PracticeTest.jsx` Bluebook review (`bluebookReview` state: the live test screen read-only — answers marked, explanation open by default, tutor in an on-demand slide-over) | Built. ONE post-test path: finish → score overview → **View diagnosis** / **Review answers** / Retake. The Tests list card offers the same two actions for past attempts (`App.jsx` `openPastAttempt(test, 'diagnosis'\|'review', returnTo)` → view `'diagnosticReport'` mounts `<TestResults screen="diagnosis">`, view `'reviewingPastResults'` mounts the runner review). Home's "View full diagnosis" and the plan's "review your misses" deep link route through the same two. Removed that day: the three-pane review runner branch, TestResults' tab bar + per-module tabs, view `'viewingResults'`, `DiagnosticReport.jsx`, `diagnosticReportLoader.js`, and the Past-Test-Review tier (`components/PastTestReview/*`, `selectors/completedTests.js`, its 3 views/handlers, `ff:pastTestReview`). |
| Scoped logging | `src/utils/log.js` | Built. `logError/logWarn/logInfo/logDebug` + `makeLogger(scope)`. `[performsat:scope]` prefix. Test-silent, prod-quiet for info/debug unless `localStorage['performsat:logVerbose']='1'`. |
| Firebase emulator + demo seed | `firebase.json` emulator block + `scripts/seedDemoData.mjs` | Built. `npm run dev:emulator` + `npm run dev:seed`. Seeds 1 student, 1 completed test, 1 plan with focus area weakness on TODAY's weekday. |
| SEVA Premium billing (Stripe) | Server: `functions/src/stripe.ts` (ensureEntitlement / createCheckoutSession / createPortalSession / stripeWebhook) + pure policy in `functions/src/stripePolicy.ts` (node --test covered) + a 402 gate inside `aiTutor`. Client: `src/hooks/useEntitlement.js` (onSnapshot on server-write-only `entitlements/{uid}`), `src/services/billingService.js`, `src/services/selectors/entitlementAccess.js`, `src/components/billing/{PaywallScreen,TrialBanner}.jsx`, `ensurePracticeAccess()` gate at every launcher in App.jsx. | Built, DARK behind `useFeatureFlag('billing')` (REACT_APP_FF_BILLING). Model: card-up-front 3-day trial (`TRIAL_DAYS` in stripePolicy.ts drives Stripe's `trial_period_days`; changed from the original 7-day/no-card model), then $85/mo or $349/yr via hosted Checkout (displayed prices — the CHARGED amount lives on the Stripe Price objects in `functions/.env`, keep them in sync); unpaid = hard lock with read-only score access (viewers stay open, launchers wall). Launch sequence: create Stripe Product/Prices → `firebase functions:secrets:set STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET` → fill `functions/.env` (see `functions/.env.example`) → `firebase deploy --only functions` → register the `stripewebhook` URL in the Stripe dashboard (events: checkout.session.completed, customer.subscription.updated/deleted) → verify test-mode E2E with `localStorage.setItem('ff:billing','1')` → set `BILLING_LAUNCH_EPOCH` to the real date **and `BILLING_ENFORCED=true`** (server-side enforcement switch — added 2026-07-17 security pass; while it's `false` the server access gate never walls a missing-doc account, so the paywall would be bypassable by any client that skips `ensureEntitlement`), redeploy functions, flip `REACT_APP_FF_BILLING=true` in Vercel. Rollback = flip the flag off (and `BILLING_ENFORCED=false`). NOTE: `past_due` grants only `currentPeriodEnd + PAST_DUE_GRACE_MS` (14d) of dunning grace, not indefinite access. |

## Canonical files (do not duplicate)

- `src/App.jsx` — the entrypoint mount target. ~2.5k lines (down from ~11k after the Acely-parity excisions and the 2026-06-12 legacy-practice excision: the inline standard/prescriptive practice UI, `startSectionPractice`, and `recordPracticeAttempt` are gone — every practice launcher lands on AssignedPracticeShell or AdaptivePracticeShell, and `practiceProgress` is frozen read-only data with no writer). A `<DashboardShell>` extraction is on the deferred TODOS list — not in this batch.
- `src/index.js:6` — the React entrypoint imports `./App` (resolves to `src/App.jsx`).
- `src/components/StudyPlanDashboard.jsx` — the active study plan view. Both App.jsx (view='studyPlan') and StudentDashboard's Study Plan tab mount it.

Recently removed (see git log for details — Day 0 of the Acely-parity batch):

- `src/components/ImmersiveStudyPlanView.jsx` — defined but never imported. Use `StudyPlanDashboard.jsx`.
- `src/data/questions/bank/generatedOfficial.js` — 1,750 incoherent regex-rewritten items. Pipeline parked at `scripts/officialQuestionBankPipeline.mjs`. See `src/data/questions/bank/index.js` lines 7-14 for the why.
- Root-level dead duplicates: `App.jsx` (root), `App_1.jsx`, `src/App.old.jsx`, root-level `DashboardDiagnosticWidget.jsx`, `DiagnosticReport.jsx`, `DiagnosticReport_1.jsx`, `PracticeTest.jsx`, `StudentDashboard.jsx`, `replace_script.js`, `replace_script_colors.js`, `update_app.py`.

## Conventions

### Feature flags

Use `useFeatureFlag(key)` from `src/hooks/useFeatureFlag.js`. CRA-style env vars (`process.env.REACT_APP_FF_*`) with localStorage runtime override (`ff:<key>`). For Jest, use `setFeatureFlagForTest(key, value)`.

```js
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
const enabled = useFeatureFlag('todaysTasks');
```

### Selectors

Pure read accessors over `studyPlan`, `practiceProgress`, `predictionLog`, `practiceTestResults` etc. live under `src/services/selectors/`. When you find yourself destructuring the same shape in multiple components, extract a selector here.

Existing selectors (all pure, all unit-tested):
- `weaknesses.js` — section-tagged weakness contract (`getMathWeaknesses`, `getRWWeaknesses`, `getWeaknessesBySection`, `getWeaknessSection`, `tagWeaknessSection`)
- `sessionAdherence.js` — "X of last N days" inline metric
- `practicedDays.js` — `Set<YYYY-MM-DD>` for the CalendarMonth filled-dot rendering
- `dailyIntro.js` — per-day editorial paragraph for TodaysTasksCard
- `recentTest.js` — `pickMostRecentTest(practiceTestResults)`
- `predictionSummary.js` — surfaces the latest validated prediction for `<PredictedVsActualCard>`

### JSDoc

New exported functions get a 4-8 line JSDoc with `@param`, `@returns`, a one-sentence "what it does", and a one-line "when to use it." Examples in `src/hooks/useFeatureFlag.js` and `src/services/selectors/weaknesses.js`.

### Tests

Unit tests live next to source as `__tests__/X.test.js`. Use `CI=true npx react-scripts test --watchAll=false --testPathPattern="..."` to run a subset. Test setup in `src/setupTests.js` polyfills `TextEncoder`/`TextDecoder` and the `stream/web` globals (`ReadableStream`, etc.) so any test that transitively imports `firebase/auth` (via `undici`) loads cleanly under jsdom.

### Scripts of note

| Command | What it does |
|---------|--------------|
| `npm test` | Jest watcher |
| `npm run bank:validate` | Validate math bank shape + uniqueness + skill coverage |
| `npm run bank:test` | Pipeline self-tests for the (parked) generatedOfficial pipeline |
| `node scripts/validateRWBank.mjs --all` | Validate R&W test-bundle authenticity / passage uniqueness |
| `npm run tabs:validate` | Validate lesson content tabs |
| `npm run test:e2e` | Playwright smoke E2E (skips without `PERFORMSAT_TEST_EMAIL` / `_PASSWORD` env vars). Tests in `e2e/`, config at `playwright.config.js`. Requires the dev server running. |
| `node scripts/auditPracticeBank.mjs` | Inventory math + R&W bank by pattern; flag patterns under the 4-item drillability threshold. Outputs `scripts/audit-output/practice-bank-inventory.{json,md}`. |
| `node scripts/runTier1.mjs` | AI-author pipeline for bank growth (see "Tier 1 pipeline" below). Needs `ANTHROPIC_API_KEY`. |

### Tier 1 pipeline (AI-authored bank growth)

Four scripts that grow thin patterns from 4 items to 10+ with a Claude-graded quality gate. Each script is single-purpose and composable:

| Script | Purpose |
|---|---|
| `scripts/authorMathItem.mjs --slug=X --count=10` | Generates N candidate items for a target pattern using Claude. Anchors on existing items in that pattern. Post-hoc validates: canonical `**SAT Pattern: ...**` header (no parenthetical qualifiers), no visual-cue stems without a `diagram` field, required fields present. Writes `scripts/generated/candidate-items-{slug}.jsonl`. |
| `scripts/gradeCandidates.mjs --in=...candidate-items-X.jsonl` | Scores each candidate on the 5-dim CB authenticity rubric (stem clarity, distractor quality, notation, difficulty calibration, overall). Accepts items with all dims ≥ 4/5. Writes `accepted-items-{slug}.jsonl` and `rejected-items-{slug}.jsonl`. |
| `scripts/appendCandidates.mjs --in=...accepted-items-X.jsonl` | Appends accepted items to the correct bank shard as JS object literals. Idempotent (skips IDs already present). |
| `scripts/runTier1.mjs [--patterns=a,b] [--count=10] [--target-depth=10] [--skip-grade]` | Orchestrator: iterates `scripts/audit-output/tier1-target-patterns.json` and runs author → grade → append → re-audit per pattern. Idempotent via cached candidate JSONL. |

Run example (full batch, ~50 patterns, ~500 candidates):

```
ANTHROPIC_API_KEY=sk-ant-... node scripts/runTier1.mjs --count=10 --target-depth=10
```

Run example (pilot one pattern):

```
ANTHROPIC_API_KEY=sk-ant-... node scripts/runTier1.mjs --patterns=slope-from-two-points
```

Two guardrails baked into the prompt + post-hoc validator (learned the hard way during Tier 0):

1. **No parenthetical qualifiers in the SAT Pattern header.** The extractor in `extractSatPattern.js` kebab-cases everything between `**SAT Pattern:` and `**`. `"Mean from List (back-solve)"` slugifies to `mean-from-list-back-solve` — a new long-tail variant — instead of contributing to `mean-from-list`.
2. **No visual-cue phrases in stems unless a `diagram` field is provided.** `scripts/auditMissingDiagrams.mjs --strict` flags "scatterplot", "line of best fit", "the figure", "the table above/below/shown", "histogram", "residual", "box plot", "dot plot". For interpretation items about a regression line that don't need a chart, reword to "linear model" / "using $\hat{y} = ...$".

For higher-rigor cross-model validation, you can also run `bun scripts/gradeBankAuthenticity.mjs --ids=...` (codex/OpenAI) after merging — that's the existing post-merge audit.

## Ship history (recent batches)

### Acely-parity batch (Days 0-6, May 2026) — COMPLETE
Full plan: `~/.gstack/projects/thehareshbhatia-tech-PerformSAT/hareshbhatia-main-plan-20260509-132835.md`.

- **Day 0:** section-tag weakness contract, `useFeatureFlag`, weaknesses selectors, dead-code cleanup, this CLAUDE.md.
- **Day 1-2:** R&W focus area drills — flatten R&W bank, extend `diagnosticEngine` for R&W, dispatcher routes by section.
- **Day 3:** Try-Similar button in `AssignedPracticeShell`, brand color → orange `#ea580c`, mobile-collapse pre-work, Toaster primitive (DX-6).
- **Day 4:** Today's Tasks hero (replaces AI Practice Banner), `DiagnosticReport.jsx` wired from dashboard, above-fold guards.
- **Day 5:** Predicted vs Actual card, Hand-Authored stamp, Diagnostic Sentence, Calendar Strip days-until-test, two-typeface lockup.
- **Day 6:** Firebase emulator + seed, README, log.js, .env.example, JSDoc audit, 375px mobile pass + a11y guards.

### Acely-polish batch (Days 1-3, May 2026) — COMPLETE
Plan: `~/.gstack/projects/thehareshbhatia-tech-PerformSAT/hareshbhatia-main-plan-acely-polish-20260509.md`. Triggered after the user shared an Acely AI screenshot flagging the visual gap.

- **Day 1:** Right-rail composition on the Dashboard tab (CalendarMonth + score-with-delta + goal/exam two-up), per-day editorial paragraph at top of TodaysTasksCard, tab count badges, CalendarStrip → CalendarMonth swap.
- **Day 2:** Round-based drill structure in AssignedPracticeShell (3 rounds × 8 questions with celebration interstitial between rounds), TodaysTasksCard renders per-activity sub-cards with PRACTICE COMPLETE! badge + collapsible completed view.
- **Day 3:** /design-review pass + 375px mobile + this CLAUDE.md update.

### Drill-routing batch (Phase 1 + Phase 2, May 2026) — COMPLETE

Plan: `docs/DRILL_ROUTING_PLAN.md`. Goal: route drills to questions of the same SAT Pattern first, fall back to broader `sourceStyleRef`, then to skill.

- **Phase 1 (commit `9a7c1a4`):** Two-tier cascade architecture — `extractSatPattern.js` lazy extractor + `patternIndex` / `patternToStyle` indexes at bank-module load + `getTargetedWeaknessSet` cascade. Diagnostic engine threads `satPattern` onto `questionAnalysis` records and aggregates `missedPatterns` per skill. Iron-rule regression test pins byte-identical Tier-3 behavior for legacy (no-`missedPatterns`) weaknesses.
- **Phase 2 (multi-batch, May 2026):**
  - `PATTERN_ALIASES` map in `extractSatPattern.js` — 55 entries — collapses variant kebab spellings (e.g., `volume-of-a-cylinder → cylinder-volume`, three 5-12-13 Pythagorean variants → `right-triangle-pythagorean`). Lifted Tier-1 coverage 76.5% → 82.8% of main-test items with no new bank items.
  - Bank expansion across batches 1-17: ~460 → ~890 items. Algebra, advanced math, geometry, problem-solving shards all got Tier-1-priority pattern coverage.
  - `AdaptivePracticeShell` parity — `buildDomainAdaptiveQueueSeed` now accepts `weaknesses` and biases up to half the seed pool with Tier-1 pattern-matched items when threshold is met. The adaptive shell renders the same `Practicing: <Pattern>` chip.
  - `Practicing: <Pattern>` chip in both shells, gated on bank pool ≥ threshold so the chip only fires when Tier 1 actually serves the drill. Telemetry: `drill_started` + `drill_chip_shown` events to `analyticsService`.
  - R&W exact-match audit — found <1% of R&W items carry parseable SAT Pattern headers. Documented decision in `rwBank/index.js::getTargetedWeaknessSet` JSDoc and pinned with a regression-style test that re-triggers the audit if R&W pattern coverage ever grows to ≥80 items.

Outstanding follow-ups (low priority): formal `decideTier(weakness)` exported helper if more callers need it; chip-mount render tests once `@testing-library/react` is installed; further bank expansion to push Tier-1 coverage toward 90%.

### Killed / explicitly deferred

- Generic persistent header (replaced by right-rail tiles)
- Plan-updated animation (replaced by typographic delta line)
- Purple/lavender palette experiment (deferred; orange wins)
- Illustration character on score card (deferred to /design-shotgun)
- Round progress persisted to Firestore (currently rounds live in `practiceState`; persistence is a follow-up)
- AdaptivePracticeShell rounds parity (~30 min follow-up once AssignedPracticeShell rounds prove out)

## Skill routing for Claude Code

When the user's request matches a /skill, invoke it with the Skill tool first instead of free-handing the work:

- **architecture / "what calls X" / "how does Y connect" / "where is Z handled" (source code)** → **query the graphify code graph first** instead of grepping the tree: from the repo root run `graphify query "<question>"` (or `graphify path "A" "B"` / `graphify explain "X"`). A built graph exists at `graphify-out/graph.json` — scope is `src/` **minus `src/data/`** (bank content excluded via `src/.graphifyignore`); `functions/` is **not** in it yet; refresh after code changes with `graphify update` (free, AST-only). Complements gbrain, which indexes docs/transcripts but **not** source symbols.
- "ship", "deploy", "create a PR" → invoke `/ship`
- "qa", "test the site", "find bugs" → invoke `/qa`
- "review my diff", "code review" → invoke `/review`
- "investigate", "why is this broken" → invoke `/investigate`
- "design audit", "visual polish" → invoke `/design-review`
- "plan review", "is this plan good" → invoke `/plan-eng-review` or `/autoplan`
- "what did we ship", "weekly retro" → invoke `/retro`
- "save progress", "checkpoint this" → invoke `/context-save` (formerly `/checkpoint`; renamed in gstack v1.1.3.0 because Claude Code now reserves `/checkpoint` as a native rewind alias)
- "resume", "where was I", "pick up where I left off" → invoke `/context-restore` (formerly `/checkpoint resume`)

Anything not on this list, just answer — don't force a skill match.

## GBrain Configuration (configured by /setup-gbrain)
- Mode: local-stdio
- Engine: pglite
- Config file: ~/.gbrain/config.json (mode 0600)
- Setup date: 2026-05-12
- MCP registered: yes (user scope, restart Claude Code to see `mcp__gbrain__*` tools)
- Artifacts sync: off (deferred — set up later with `/setup-gbrain` if cross-machine sync becomes useful)
- Current repo policy: read-write
- Embeddings: disabled (no OPENAI_API_KEY); keyword search works, semantic `gbrain query` degraded until you run `OPENAI_API_KEY=... gbrain embed --stale`

## GBrain Search Guidance (configured by /sync-gbrain)
<!-- gstack-gbrain-search-guidance:start -->

GBrain is set up locally (PGLite) and synced on this machine. 108 pages indexed: 74 markdown (docs/, CHANGELOG, READMEs), 25 prior session transcripts, 5 design-docs, 3 timelines, 1 learnings file. The agent should prefer gbrain over Grep when the question is semantic, when you don't know the exact identifier yet, or when you want prior session context.

Prefer gbrain when:
- "Where is X handled?" / semantic intent, no exact string yet:
    `gbrain search "<terms>"` (keyword, works today)
    `gbrain query "<question>"` (hybrid, needs embeddings — currently degraded)
- "What did we decide last time?" / past plans, retros, learnings:
    `gbrain search "<terms>"` against the brain corpus
- "What was I working on when X?":
    `gbrain search "<topic>"` finds matching session transcripts
- "Show me the drill routing plan":
    `gbrain get docs/drill_routing_plan`

Grep is still right for known exact strings, regex, multiline patterns, and file globs in source code (gbrain 0.18.2 doesn't yet index source code by symbol — only markdown + transcripts).

The brain auto-syncs incrementally on every gstack skill start. Run `/sync-gbrain` to force-refresh, `/sync-gbrain --full` for full reindex.

Restart Claude Code (this session won't see the new MCP) to use `mcp__gbrain__*` tools directly instead of shelling out to `gbrain`.

<!-- gstack-gbrain-search-guidance:end -->

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update` (bare — uses the saved `src` scan-root; do NOT pass `.`, which would scan the whole repo incl. `node_modules`/`src/data`) to keep the graph current (AST-only, no API cost).
