# TODOS

## QA sweep — deferred low-severity findings (2026-08-04)

From the /qa sweep of the onboarding/billing batch (9 med/high bugs fixed in
`56e895f..b936244`; adversarial review by 3 agents + live browse walk). All
verified-real but low severity; none block the billing flip.

- **[LAUNCH/OPS] `BILLING_LAUNCH_EPOCH` still `2026-07-04` in `functions/.env`.**
  Every account created since July 4 fails `isGrandfathered` and gets the
  card-required wall at flag flip. The .env comment says to bump it right before
  flipping `REACT_APP_FF_BILLING` — it has NOT been bumped. Do it at launch,
  then redeploy functions.
- **[P3/S] `?checkout=success` is spoofable** (App.jsx ~696-715): any walled,
  signed-in user who appends it gets a 3-min client-side practice window.
  Bounded + client-content-only. Fix: stamp sessionStorage in
  `billingService.startCheckout` before the redirect and honor the URL param
  only when the stamp exists.
- **[P3/S] Price strings hardcoded in three components** (LandingPage,
  OnboardingFunnel, PaywallScreen: $85/$29/$349/"save $671") with no shared
  constant or pinning test; the $50→$85 repricing already proved drift. Charged
  amounts live on Stripe Price ids in `functions/.env`.
- **[P3/S] Late subscription webhook can clobber a promo comp**
  (stripe.ts: redeem nulls the event watermark; a terminal sub event then
  merge-sets `status: 'canceled'` over `comped`). Needs a pending/terminating
  sub + redeem in between — rare.
- **[P3/S] Activation webhook slower than the 3-min grace re-walls a just-paid
  user** whose Subscribe click then 409s ("already subscribed") — confusing
  terminal state, self-heals when the snapshot lands.
- **[P3/S] InnerOnboarding multi-select screens' Continue lacks the
  double-tap guard** (weak-areas screens, InnerOnboarding.jsx ~472/488): a
  double-click can silently skip the next screen. The file's own
  `pendingAdvance` pattern is the fix; steps 1-3 share the gap (pre-existing).
- **[P3/S] `updateProfilePhoto` optimistic rollback** (useAuth.js ~319-345):
  rapid double upload can roll back to a stale value; the 8s timeout resolves
  (never rejects) so a late definitive failure never rolls back the UI.
- **[P3/S] "Finish onboarding" resume bypasses the entitlement deferral** the
  auto-launch has (benign — the wall catches the next gated action); the
  per-uid dismissal marker is never cleaned when onboarding completes via the
  test path (harmless orphan).

## Both-sections study plan — deferred goal-system work (2026-06-12)

The plan now drills both sections (format v4, commits 4d12e36..c54fe33), but the GOAL
system is still math-framed end-to-end. Deferred as a coherent future batch:

- **[P2/M] collegeData has only satMath.** No satRW/satComposite columns, so the college
  anchor ("Median Math: 710"), score tiers, and getCollegesByScoreRange are structurally
  math-only. Real R&W/composite medians are a content task — don't double satMath.
- **[P2/S] CollegePicker copy vs the new guard.** updateTargetSchools now refuses to
  overwrite a composite (>800) goal with the math median, but CollegePicker still
  ANNOUNCES the median as the target being set — copy now lies for composite accounts.
  Reframe the picker (and its "{N} Math" badges) when collegeData grows R&W data.
- **[P2/S] Profile goal editor clamps 200-800** (Profile.jsx ~284-300) — a composite-era
  user cannot view/edit a 1300 goal there, and saving forces the account back to
  section scale. StudentDashboard tempTargetScore defaults are section-scale too.
- **[P3/S] Header "path to 750 Math"** stays for legacy section-goal accounts (honest —
  the goal IS a math goal) until goals migrate to composite or per-section.
- **[P3/S] mergeHybridPlan's AI nextAction** doesn't carry the new skillId/skillName/
  section fields, so an AI-authored next action can't deep-route to a drill (falls back
  to non-clickable). Carry the fields through the merge when AI output names a skill.
- **[P3/S] R&W drill pools spoil future test items** — the R&W drill bank IS the 12
  practice tests; plan-scheduled R&W volume raises exposure (24-item pools on
  cross-text + COE-textual thin fastest). Future: dedicated R&W drill authoring.

## Loose-threads closeout — pre-existing gaps flagged by adversarial review (2026-06-12)

The 16-agent review of the blank-attempt/prediction/excision commits confirmed these
same-class gaps OUTSIDE the changed range (verified real but pre-existing; all are
small, most are one-liners applying `isBlankAttempt` from `selectors/latestTestStats`):

- **[P2/S] Timer-expiry still persists fresh blank attempts.** The zero-answers discard
  guard lives only in `handleConfirmEndTest` (PracticeTest.jsx ~2017); the module-advance/
  timer-expiry completion path (~1896) persists a fully-blank timed test (answeredCount 0,
  floor score). Display surfaces now filter these, but stopping them at the source keeps
  Firestore clean. Decide UX for silent-expiry discard (toast?) before changing.
- **[P3/S] AiTutorChat reads the newest attempt unfiltered** (AiTutorChat.jsx ~731, ~825):
  a blank newest attempt's empty-sheet errorPatterns become the tutor's "most recent test"
  evidence. Also `trendContextBuilder.js` passes floor-400 scores (truthy check only).
- **[P3/S] predictionEngine.getRecentAttempts (~443) feeds blank attempts into
  trap-vulnerability predictions** (gated by trapResistance<50, so low blast radius; flows
  into the AI tutor prompt via intelligenceContextBuilder).
- **[P3/S] Dead-code/doc sweep:** `calculateWeightedScore` in adaptiveService.js is a
  zero-importer orphan; `docs/PRACTICE_ASSIGNMENT_SCHEMA.md` + `docs/PAST_TEST_REVIEW_PLAN.md`
  still document the deleted `recordPracticeAttempt` path; StudentDashboard.jsx ~398 comment
  ("Legacy prescriptive shell — reachable as a FALLBACK") describes a removed shell.
- **[P2/M] Mixed-scale score-history axis normalization** (long-deferred, now confirmed as
  the real cause of the "Test 23 400 bar"): the diagnosis trend and dashboard history chart
  March-era 200-800 section attempts beside 400-1600 composites. The low bar in the owner
  account's trend is a GENUINE section attempt (400/800, 16 raw) — not a blank. Needs a
  design decision: label scale per bar, segregate eras, or normalize.
- **[P3/S] Review-shell toolbar shows a "Calculator" badge on R&W items** (seen in dogfood
  on a cross-text item in the daily-review session; verify whether the badge is static
  shell chrome or per-item metadata).

## Practice-tab navigator — deferred by /plan-design-review (2026-09-07)

- **[P3/S] Practice Bank: builder-modal chip rows as radiogroups.** The custom-drill builder's
  Difficulty / Questions rows are single-select but use `aria-pressed` buttons; the section toggle
  and topic multi-select are fine as pressed buttons. Reuse `onChipKeyDown` from the pane filters.
  Found by /design-review 2026-09-07 (subagent), modal internals were out of the navigator's scope.
- **[P3/S] Practice Bank spacing to tokens.** PracticeBank.css uses ~24 raw px values and no
  `--space-*` (nothing in `src/` does — see the 2026-06-08 "Spacing scale 0% adopted" note). Snap to
  4/8/12/16/24/32 when the file is next touched; not a mass refactor.
- **[P2/M] Brand-level contrast pass for filled orange buttons.** White text on `#EA580C` is 3.6:1
  (below the 4.5:1 floor at 13-14px bold) on every filled CTA app-wide. The Practice-tab rebuild darkened
  only orange TEXT (`--pb-orange-text: #C2410C`) and kept filled buttons at the brand orange for
  consistency. Fix options: darken the filled-button orange to `#C2410C` (5.2:1) via the shared token, or
  raise CTA text to 18.66px bold. Why: readability on phones outdoors; a11y audit item. Cons: touches every
  page; needs a visual pass on the home tiles (protected UI) and landing. Depends on: nothing.

## Landing-page design review — deferred findings (2026-06-08)

From the /design-review fix loop on both surfaces (6 commits `d2199cc`..`a4a75e3`,
FINDING-001..006 fixed). Full report: `.gstack/design-audit-20260608/design-audit-localhost.md`.
Fixed this run: landing+app buttons now inherit Inter (was Arial, 14/18 app buttons);
landing reads tri-color; placeholders aria-hidden; dead auth-modal CSS removed; heading
balance. Landing Design C+ → B-, AI-slop C → C+.

- **[CRITICAL/content] Landing placeholder imagery.** Hero "Platform Preview" + 3 "How SEVA Works" boxes (Diagnostic/Learn/Practice) are empty gray voids (`LandingPage.jsx` `.hero-visual`/`.step-visual`). Same as FINDING-010 in the 2026-05-19 review — open 3 weeks. Needs real screenshots (from demo-seed, NOT the PII-bearing logged-in app) or illustrations. I can wire them in once provided.
- **[HIGH/content] Unsubstantiated landing copy.** "thousands of students" (`LandingPage.jsx:188`, the false-claim blocker), "comprehensive video course / proven curriculum" (:80), "top instructors" (:119), "premier platform" (:207). User decision — won't rewrite blind.
- **[HIGH/content] Dead footer links.** Pricing/About/Contact/**Privacy/Terms** all `href="#"` (`LandingPage.jsx:215-224`). Privacy/Terms are launch blockers (need pages + routes).
- **[HIGH/typography] Cross-surface voice.** App uses editorial serif for big headings; landing hero is heavy Inter. Bring Fraunces/editorial into the hero — mockup-worthy (`/design-shotgun`).
- **[MEDIUM/ai-slop] Landing section rhythm.** Centered-everything + 3-col icon-in-box grid + uniform cards + dark CTA band + cookie-cutter rhythm. Tri-color helped; full de-slop is a redesign.
- **[MEDIUM/a11y] Signup radio group** uses bare `<label>` not `<fieldset>/<legend>` (`LandingPage.jsx:264`).
- **[POLISH] Landing touch targets** < 44px (Log in 31px, nav/footer links 20px, CTAs 42px) — tight on mobile.
- **[POLISH] `transition: all`** on `.btn-primary`/`.btn-secondary`/`.feature-card` — list properties explicitly.
- **[HIGH/app, incremental] Spacing scale 0% adopted.** `--space-1..8` used 0 times in `src/`; snap ad-hoc px/rem as you touch files (project policy — not a mass refactor). Overlaps the 2026-06-05 "Token adoption refactor" note below.
- **[HIGH/app, incremental] Dual gray systems.** Apple-warm slate tokens vs Tailwind cool-slate hardcodes (`#64748b`/`#6b7280`/`#111827`) coexist; tri-color hardcoded at call sites.
- **[MEDIUM/app] Wordmark fallback dup.** `App.jsx:~1300` + `ui/AppShell.jsx:~292` re-implement the SEVA mark with divergent Fraunces fallbacks instead of `<Wordmark>`. Only visible if Fraunces fails to load.
- **[MEDIUM/app] Breakpoint sprawl.** 768/1024 dominate; many one-offs (640/800/600/1200/480…); declared 375/1440 tokens unused in CSS.

## Made-For-Me personalization — deferred by /autoplan review (2026-06-06)

Plan: `docs/MADE_FOR_ME_PERSONALIZATION_PLAN.md` (approved scope = Phases 0-4 therein).

- **[P2/M] Score-journey timeline.** "Your Score Journey" chart: full scoreTrajectory (10+ nodes live in studyPlanArtifact.longitudinal; ScoreTrajectory component renders only 5) with prediction bands overlaid, click-through to that test's diagnostic. Why: visualizes progress + prediction accuracy together — the moat made visible. Deferred: deserves its own design pass (/design-shotgun for the chart treatment). Start: `StudyPlanDashboard.jsx` ScoreTrajectory + `predictionEngine.js` validated entries.
- **[P2/M] Testing-personality card.** Surface the 6D studentFingerprint (speed, conceptualDepth, trapResistance, stamina, confidenceCalibration, learningVelocity + archetype) — stored at progress/{uid}.studentFingerprint, never rendered. Why: only-this-student content nobody can copy. Caution: diagnostic-content rule (pure narrative, no tips). Deferred: own batch + design pass.
- **[P3/M] Prediction-history surface.** "How we've predicted your score" — all validated predictionLog entries vs outcomes (only the latest renders today via predictionSummary). Why: builds trust in the prediction loop. Start: `selectors/predictionSummary.js`.
- **[P3/S] Streak milestone moments.** 7/14/21-day review-streak acknowledgments (subtle, no emoji). Deferred: new behavior pattern, outside the identity batch.
- **[P2/S] analyticsEvents unbounded arrayUnion.** `analyticsService.js:96` appends to `progress/{uid}.analyticsEvents` forever — latent 1MB-doc failure + write-cost sink on a hot doc. Fix: cap (keep last N) or move to a subcollection. Pre-existing; flagged by both review voices.
- **[P3/S] Install @testing-library/react.** Unlocks component render tests (hero variants, Avatar onError) that the personalization batch had to cover via dogfood. Also unblocks the long-deferred chip-mount render tests (CLAUDE.md).
- **[P3/S] Consolidate design/gemini/* into root DESIGN.md.** plan-design-review expects one; today the system source is split across design-system-spec.md + style-guardrails.md.
- **[P3/S] College data: source real 25th/75th percentiles.** collegeData.js stores a single median; a true mid-50% range would make the school anchor honest and richer. Until then both surfaces say "Median Math".
- **[P3/S] TestResults score-valence treatment.** The identity stamp ships emotion-neutral by design; a goal-hit vs regression vs first-test treatment is a named gap, not an omission.
- **[P3/S] Mobile bottom-nav overflow at 375px (pre-existing, spotted in dogfood 2026-06-06).** AppShell's 7-item mobile nav (Home…Profile) is wider than the viewport — the Profile item clips at ~392px and the page gets ~17px of horizontal scroll on EVERY view (verified on Home and Tests). Fix in AppShell mobile nav (tighter item padding, smaller labels, or `minmax(0,1fr)` columns).
- **[P3/S] Drill-shell React DOM-prop warnings (pre-existing, spotted in dogfood 2026-06-06).** Mounting AssignedPracticeShell ("Similar Practice") logs `React does not recognize the fontVariantNumeric/boxShadow prop on a DOM element` — somewhere in the drill render path a style object is spread as props (`{...styles}`) instead of `style={styles}`. Dev-only console noise, no user impact. Find with React DevTools or by bisecting the drill render tree.
- **[P3/S] recentMisses stems currently label-only in practice.** The struggled-with card's self-validating stem guard (skills-equality vs the bundle) rejected stems for the dogfood account's latest attempt — rows render skill+difficulty only, which is the designed fallback. If stems matter, the robust source is the per-attempt snapshot subcollection (exact served question, PastTestReview already loads it) — an async upgrade, not a selector tweak.
- **[P2/M] Growth measurement + acquisition gate (queued at /autoplan final gate 2026-06-06).** The independent CEO reviewer's challenge, accepted as backlog: (1) real aggregate analytics (PostHog-class, ~1h — `analyticsService` arrayUnion events are per-user and owner-locked, cannot answer retention/funnel questions); (2) landing-page SEO/OG basics (index.html has a bare meta description, no OG tags); (3) one acquisition experiment — strongest candidate: a SHAREABLE personalized diagnostic report (student's name/face + score story as a rendered image) which doubles as the next personalization artifact and a lead magnet. Context: this is the known Phase-0 GTM fork from the 2026-05-29 competitive assessment. Why now-ish: without it, feature bets (including this personalization batch) can't be measured against real users.

## Study Plan design review — deferred findings (2026-06-05)

From the /design-review fix loop (6 commits, FINDING-001..010 fixed; full report:
`~/.gstack/projects/thehareshbhatia-tech-PerformSAT/designs/design-audit-20260605/`).

- **[medium] Token adoption refactor.** `spacing.` / `radius.` / `typography.` from
  `src/design/tokens.js` are imported but used 0 times in StudyPlanDashboard — every
  dimension is a hand-typed literal. Adopting the tokens would also let the
  165-line `.sp-weekly-tight` `!important` override block die: give the study-plan
  cards their own un-shared classes so the calm look is the base style, not a
  forced override of Dashboard-tab shared classes.
- **[medium] CONTENT TRUST: module-vs-composite copy collision.** The generated
  delta narrative says "Score dropped 400 to 200 (-200 pts)" (module scale) while
  the rail says "920 composite, up 520 pts". Both can be true; side-by-side they
  read as a bug. The generator should name the scale ("Math module score") or
  convert to composite-consistent framing.
- **[low] Generated-copy dedupe at the source.** FINDING-002 hoists the shared
  closing advice sentence at render time; the real fix is variety in
  `formatDiagnosticSentence` so 7 weaknesses don't get the same boilerplate.
- **[low] `--color-brand-amber-400` resolves to blue** (`#3b82f6`) in
  design-tokens.css — misnamed token; `colors.badge.bronze` maps to it. No longer
  consumed by the study plan (FINDING-007) but still a trap.
- **[low] Rail cards pop in late** (Firestore profile hydration) — the rail renders
  calendar-only for a beat, then score/goal/exam cards appear. Skeleton tiles
  would stop the layout jump.
- **[polish] Bottom background seam** (FINDING-011): short pages show a white band
  under the `#f8fafc` body background.

## Past-Test-Review

### AbortController for in-flight test fetches — DECISION: DEFERRED (2026-05-11)

**Audit conclusion:** Firebase JS SDK v10.7.1 (current) does NOT accept `AbortSignal` on `getDoc()` or any other read primitive. There is no client-side cancellation API. Implementing an "abort wrapper" at the app level would:

  1. Drop the promise's result on signal (equivalent to what `reviewBundleRequestRef` already does — request-ID guard catches and discards stale data on arrival).
  2. NOT save the Firestore read — the network call still completes server-side and the document is still billed.
  3. Add code complexity (wrapper + signal threading through 2 service layers) for zero observable benefit.

The TODO's premise — that aborting saves cost — is incorrect given the current Firestore SDK. The cost-saving win requires either:
- Firebase adding native cancel (not on their roadmap as of 2026-05),
- Or replacing Firestore reads with a different transport (e.g., fetch + signed URLs), which is a much larger architectural change.

**Decision:** DEFER until either condition above changes. Re-evaluate when upgrading Firebase to v11+ — check release notes for cancel support.

**Adjacent ideas that WOULD save reads (if cost becomes a real concern):**
- Client-side dedupe: if the same `getDoc(refX)` is requested while one is in flight, return the same promise. Net: one read for N concurrent callers.
- Debounce the trigger: 200-300ms debounce on `handleSelectReviewTest` would collapse rapid card-clicks BEFORE the fetch starts. Net: fewer reads when a user scrolls quickly past N cards.

Both are different concerns from AbortController; either could be its own TODO if Firestore cost shows up in production.

### Wire Try-Similar onto ReviewItemCard — DONE (2026-05-11, commit `c217ed9`)

`ReviewItemCard` now accepts an optional `onTrySimilar` prop. When provided, renders a "🔁 Try a similar question" CTA below the explanation. `App.jsx::handleTrySimilarFromReview` calls `pickSimilarQuestion({ currentQuestion: snapshotItem, excludeIds: [snapshotItem.id] })` and on success launches a 1-question `startAssignedPractice` session with `source: 'review-try-similar'`.

Distinct from the in-session `handleTrySimilar` (which inserts into the current drill) — this LAUNCHES a fresh practice flow from review mode.

## AI Tutor

### Section context inside retry-drill review-mode — DONE (2026-05-11, commit `13d597a`)

Shipped option B: AiTutorChat now accepts a `reviewMode` prop (default false). When true, the proactive-recommendation useEffect early-returns — no cross-section "Skill X mastery has dropped" alerts during review mode. AssignedPracticeShell threads `practiceState.reviewMode` through automatically. The student is in INSPECTION mode during review, not LEARNING mode; cross-question advice is noise.

Why option B over option A (threading section through advice picker): treats the symptom at the call site, reversible, no surface-area change to `proactiveRecommendationService`.

## Drill Routing (exact-question-type)

### R&W exact-match parity — DECISION MADE, DEFERRED (2026-05-11)

**Audit conclusion:** Only ~6 of 648 R&W items (<1%) carry `**SAT Pattern: <Title>**` headers — all in `practiceTest9RW.js` with vocab-specific patterns. Far too sparse for any pattern bucket to reach the Tier-1 threshold of 8 items.

**What was done in this PR:**
- Documented audit conclusion inline in `rwBank/index.js::getTargetedWeaknessSet` JSDoc.
- Added `missedPatterns` to the signature for API symmetry — accepted but a no-op (R&W never produces missedPatterns since the diagnostic engine only populates them for items with `q.satPattern`, which R&W items don't have).
- Pinned the audit in `rwBank.test.js` with a regression-style assertion: if R&W pattern coverage ever grows >= 80 items (~12% of bank), revisit the decision.

**Future work (if R&W routing precision becomes a real complaint):**
- Option A: bulk retro-tag the 648 R&W items with an SAT Pattern taxonomy (12 weeks of authoring; needs canonical R&W pattern list first).
- Option B: route by passage type or question-stem family ("Which choice most strongly supports..." vs "The main purpose of the underlined sentence is...") — finer-grain signal that's already implicit in the data.
- Trigger: real diagnostic telemetry showing students complain about R&W drill targeting feeling generic vs. math drills.

**Status:** DECISION MADE. R&W stays on Tier-3 (skill+domain) routing — already production behavior, no UX regression.

### AdaptivePracticeShell exact-match parity — DONE (2026-05-11, commit `75d8aff`)

`buildDomainAdaptiveQueueSeed` now accepts an optional `weaknesses` argument. When weaknesses carry `missedPatterns` matching the enforced domain AND the resulting pattern pool meets `TIER1_PATTERN_THRESHOLD`, up to half the seed pool is prepended with pattern-matched items (the other half is plain domain shuffle for breadth). Legacy callers (no `weaknesses` arg) get byte-identical seed — pinned by a ★REGRESSION★ test.

`startAdaptivePractice` in `App.jsx` now passes `studyPlan.weaknesses` (filtered to math) into the seed builder. `AdaptivePracticeShell` displays the same "🎯 PRACTICING: <Pattern>" chip beneath its header that `AssignedPracticeShell` uses.

7 new unit tests pin the parity invariant + cross-domain exclusion + dedup behavior.

### Surface `missedPatterns` in drill UI — DONE (2026-05-11, commit earlier this session)

`AssignedPracticeShell` and `AdaptivePracticeShell` both show a "🎯 PRACTICING: <Pattern>" chip beneath the headerTitle whenever the weakness/seed carries a missed SAT Pattern. Powered by `src/services/selectors/missedPatternLabel.js` (formatPatternLabel + pickPrimaryMissedPattern, 15 unit tests covering acronym preservation like SOH/CAH/TOA/FOIL and small-word handling).

Tier-1 routing precision is now VISIBLE to students. With 75 Tier-1 patterns covering 82.8% of main-test items, the chip fires often enough to make the targeting feel real.

### Drill chip precision gate + Tier telemetry — DONE (2026-05-11)

**Problem found mid-session:** the chip in AssignedPracticeShell read from `weakness.missedPatterns` and rendered whenever ANY pattern was carried — regardless of whether the bank actually had enough items to serve a Tier-1 drill for that pattern. Result: chip could say "Practicing: Reverse Percent" while the actual drill served Tier-3 skill-bucket items because the pattern pool was sub-threshold.

**Fix:** AssignedPracticeShell now checks `getBankRoutingStats().byPattern[slug] >= TIER1_PATTERN_THRESHOLD` before surfacing the chip. AdaptivePracticeShell already had this precision implicitly (`buildDomainAdaptiveQueueSeed` only attaches `missedPatterns` to the seed when its own pattern pool meets threshold).

**Telemetry:** added `trackDrillStarted` + `trackDrillChipShown` to `analyticsService`. Both shells fire `drill_started` on mount with `{ tier: 'pattern'|'style'|'skill'|'empty', pattern, section, source, questionCount }`. Lets us answer "does the chip fire often enough?" and later "do students complete more questions when the chip surfaces?" from the buffered analytics events.

**`decideTier({ weakSkills })`** added to `bank/index.js` as the source-of-truth tier classifier — mirrors `getTargetedWeaknessSet`'s cascade without selection. Both shells use it for the `tier` telemetry field. Parity with the actual routing function is pinned by 13 specs in `decideTier.test.js`.

Chip-shown ≡ Tier-1 fired ≡ exact pattern match was viable. This effectively closes the "tierFired surfacing" follow-up — the chip is the visible tier indicator, the telemetry is the measurable one.

### Tier-2 fuel via missedStyles aggregation — DECISION: NO ACTION POSSIBLE (2026-05-11)

**Audit conclusion:** test bundles (`src/data/practiceTests/practiceTest{1..12}.js`) do NOT carry `sourceStyleRef` fields on items. `grep -c sourceStyleRef src/data/practiceTests/practiceTest1.js` returns 0. The proposed architectural fix — have `diagnosticEngine.analyzeSkills` aggregate `q.sourceStyleRef` from wrong test items into `weakness.missedStylesSet` — would aggregate undefined onto undefined.

**What this means:** Tier 2 of the drill-routing cascade derives styles via `patternToStyle.get(pattern)`, built from BANK items that have BOTH a SAT Pattern AND a sourceStyleRef. This is the only viable Tier-2 input path given the data shape. Adding a parallel `missedStyles` field would either be empty (no fuel from tests) or require re-tagging all 528 test items.

**Decision:** No action. Tier 2 fires as well as it can with current bank coverage of the `patternToStyle` map. Future option if Tier-2 firing rate becomes a real concern: extend test bundle items to carry `sourceStyleRef`, or expand the `patternToStyle` map by hand-curating it as a standalone file.

## Completed

## From /qa 2026-07-28 (drill shell, live)
- [x] ISSUE-002: forward-jump lock is BY DESIGN (frontier rule in handleNavigate) — real defect was affordance: locked rows kept pointer cursor + hover highlight, and the navigable frontier tile was styled as locked. Fixed same day: is-locked now mirrors the frontier rule, cursor default, hover suppressed, aria-disabled.
- [x] ISSUE-003: FALSE POSITIVE — AnswerChoiceList cards already carry role="button" + aria-pressed + Enter/Space handlers (tabIndex -1 only post-submit, which is correct). QA probe's grep filters hid them. No change needed.
- [ ] MEDIUM: tutor SSE arrives as ONE lump client-side (measured first==settled) despite correct server re-emit per delta and client onChunk — suspect response compression buffering on the Cloud Run path (direct run.app URL, no hosting proxy). Investigate: curl the deployed fn with stream:true and time chunk arrivals; if buffered, disable gzip for text/event-stream or add padding flush.

## From /design-review 2026-08-03 (onboarding, deferred)
- [ ] POLISH: OnboardingFunnel.css + InnerOnboarding.css share ~500 duplicated lines (var block, topbar, options, CTA, slider) with unexplained twin drift — extract a shared sheet or accept and document the fork. Drift already re-aligned once (FINDING-010); it will regrow.
- [ ] POLISH: ad-hoc border-radius ramp across both onboarding CSS files (9/10/12/13/14/16/18/24) — collapse to 3 scoped steps (e.g. 8 controls / 12 inputs / 16 cards).
- [ ] POLISH: breakpoint drift — funnel collapses at 720px, inner at 560px; two halves of one journey should break at the same width.
- [x] POLISH (DONE 2026-08-14, personal-onboarding batch): InnerOnboarding score screen title asked yes/no while collecting a number — the per-baseline variants ("What did the real SAT give you?" etc.) fix it for funnel-profiled accounts; legacy accounts keep the old title by design (fallback).

## From /autoplan personal-onboarding review 2026-08-14 (deferred)
- [ ] **[P2] Show-don't-tell funnel moment.** One real hand-authored bank question + its per-choice explanation inside the funnel (likely replacing or augmenting the neverStuck interstitial's mockup). **Why:** answers "I could just use ChatGPT" with proof instead of copy; the bank + explanations are the moat and the funnel only tells about them. **Cons:** adds a screen/interaction to a deliberately tight flow (violates the current no-new-screens premise); needs its own design pass. **Context:** proposed by the CEO-phase outside voice; deferred because the personal-onboarding batch holds flow length constant. Start at FUNNEL_INTERSTITIALS.neverStuck. Effort M (CC ~1-2h). Depends on: personal-onboarding batch shipped + funnel instrumentation live (measure before/after).
- [ ] **[P2] Server-side trial funnel events.** `trial_started` / `trial_converted` / `trial_canceled` emitted from the Stripe webhook (functions/src/stripe.ts) into PostHog. **Why:** client events stop at signup; the money question (trial→paid) is invisible without these. **Cons:** functions deploy required; PostHog server key handling. **Context:** client-side funnel events ship in the personal-onboarding batch with copyVariant tagging; this completes the funnel. Effort S-M (CC ~30min + deploy). Depends on: next functions deploy window.
- [ ] **[P3] Personalization spine consumers.** First-run home hero line + coach tone reading `onboardingProfile.answers` (blocker → first-run copy, feeling → tutor register: the "stored-but-unused" levers noted since 2026-07-02). **Why:** extends the onboarding thread into day-1 product; the 12-month-ideal direction from the CEO review. **Context:** consume via the same pure-fn pattern as funnelConfig; do NOT persist derived copy. Effort M. Depends on: personal-onboarding batch (establishes the fn vocabulary).

## From getReferral hotfix 2026-08-03 (lint re-enable, deferred)
- [x] HIGH-VALUE CLEANUP (DONE same day, 18f0d40..ec8f97e): react-hooks/rules-of-hooks violations in StudyPlanDashboard.jsx (gate-wrapper split), SATLinearGraph.jsx, SATTwoLineGraph.jsx (guarded memos); rule promoted back to error. Original note: conditional useMemo in App.jsx, StudyPlanDashboard.jsx, SATLinearGraph.jsx, SATTwoLineGraph.jsx — currently demoted to "warn" in package.json eslintConfig. These are latent "Rendered fewer hooks than expected" crashes if the early-return condition ever flips mid-mount. Fix by moving the early return below the hooks. Re-promote the rule to error when clean.
- [x] POLISH (DONE same day, ec8f97e): import/first violations in src/design/animations.js, src/services/diagnosticEngine.js — imports hoisted to top; rule promoted to error with a test-file override.
