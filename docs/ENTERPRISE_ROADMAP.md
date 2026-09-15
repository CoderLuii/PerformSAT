# Enterprise readiness roadmap

Status as of 2026-09-14. This is the working list of what separates SEVA from
enterprise-grade software, ranked by how much risk each item removes. Each item
carries a status so the list can be re-read in a month and still be true.

"Enterprise-grade" here means five concrete things:

1. **Reliable**: every change is automatically tested before it reaches students.
2. **Recoverable**: data can be restored after a mistake, and someone finds out
   when the site is down.
3. **Secure**: known vulnerabilities are patched on a cadence, abuse is rate
   limited, and browser-side protections are enforced rather than advisory.
4. **Maintainable**: a new engineer (or agent) can change the code without
   guessing, because types, lint, tests and structure catch mistakes.
5. **Compliant**: the privacy, billing and account-deletion promises in the
   legal pages are actually kept by the code.

## What the audit found (2026-09-14)

| Area | Finding | Severity |
|---|---|---|
| CI | **Never passed.** 0 green runs out of 300 since 2026-06-19. `npm ci` failed under npm 10 (Node 20 runner) because the lockfile lacked an optional `yaml@2` entry; locally on npm 11 it installed fine, so nobody noticed. Failures were emailed 300 times and ignored. | Critical |
| CI | A second blocker sat behind the first: under `CI=true` the production build treats lint warnings as errors, and 199 warnings across 59 source files accumulated since the last lint cleanup on 2026-08-03. | Critical |
| Backups | Point-in-time recovery (7 days) and delete protection are ON. **No scheduled backups** with longer retention. | High |
| Dependencies | 59 known vulnerabilities at root (20 high), 19 in functions (4 high). 10 Dependabot PRs and 1 outside-contributor PR unreviewed since July. Firebase SDK two majors behind (10 vs 12). | High |
| Platform | Create React App (`react-scripts` 5) is unmaintained; most remaining root vulnerabilities live inside it and cannot be patched without leaving it. | High (slow burn) |
| Monitoring | Sentry live with error-triggered replay. PostHog live. **Unconfirmed** from the July runbook: uptime check, error-rate alert, spend alerts, API-key referrer lock, App Check enforcement. | High |
| Browser security | Security headers are strong, but the Content Security Policy is still **report-only** with no report collector. | Medium |
| Functions | Lint config existed but was never run: 420 violations. Not in CI. | Medium |
| Code structure | 651 source files, 2 in TypeScript. `PracticeTest.jsx` 3,552 lines, `App.jsx` 3,427. 339 raw `console.*` calls in app code. Unit coverage 55% statements. | Medium |
| Repo hygiene | Two dead copies of the app tracked (`perform-sat-v3/`, `perform-sat-root/`). Repo is public. No branch protection (acceptable for a solo direct-to-main workflow, but only if CI is watched). | Low |
| What is healthy | 3,118 unit tests pass. 17 Firestore rules tests pass. Production build passes. Every Cloud Function checks auth, App Check (log-only) and per-user rate limits; Stripe webhooks verify signatures; secrets come from Secret Manager; account deletion exists; privacy policy covers under-13 users. | — |

## Tier 0: done today (2026-09-14, on main, awaiting push)

- [x] Lockfile repaired (one added entry, zero version changes); valid under npm 10 and 11.
- [x] CI on Node 24 for every job; superseded runs cancelled; Firestore rules suite runs in CI.
- [x] `.nvmrc` + `engines.node` pin Node 24; README shows the CI badge.
- [x] Functions lint gate: 420 → 0 with zero logic changes (verified by diffing compiled output); `Lint` step in CI.
- [x] In-range dependency updates + `npm audit fix`: root 59 → 42 vulnerabilities (20 → 15 high), functions 19 → 10 (4 → 0 high). Note: `firebase-functions` 7.3.2 pulls Express 5; tests and typecheck pass, but deploy functions deliberately and smoke-test the Stripe webhook afterwards.
- [x] Client lint debt: 199 warnings → 0 so the `CI=true` build passes. 134 dead imports/variables deleted (including a 198-line disabled legacy component and two never-called report builders), 19 escape fixes proved equivalent, 8 default exports named, 18 effect-dependency warnings left as reasoned inline disables (changing those arrays would change behavior), 2 fixed.

## Tier 1: founder actions (console or approval needed; 30 minutes total)

1. **Push and watch the first green run.** `git push origin main`, then confirm
   `gh run list --branch main --limit 1` shows success. If the E2E job fails on
   its first real run, that is expected debugging, not a regression.
2. **Daily backups** (one command, ~$0.03/GB/month):
   ```
   npx firebase-tools firestore:backups:schedules:create --database '(default)' --recurrence DAILY --retention 7w --project performsat-production
   ```
3. **Remove the dead app copies:** `git rm -r perform-sat-v3 perform-sat-root` and commit.
4. **Confirm the July runbook items** in `docs/SECURITY_LAUNCH_RUNBOOK.md`
   sections 2, 3, 4, 6, 7: API-key referrer restriction, GCP budget + Anthropic
   spend cap, App Check enforcement after soak, uptime check + error alert
   policy, MFA on every operator account. Tick each one in that file.
5. **Deploy functions** once comfortable with the Express 5 note above:
   `firebase deploy --only functions`, then run one Stripe test-mode checkout.

## Tier 2: next engineering batches (each is one focused session)

- **CSP enforcement.** Add a report endpoint (Sentry accepts CSP reports), walk
  the app with the console open (login, practice test with Desmos, tutor,
  video, checkout return), then rename the header from
  `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.
- **Dependabot triage cadence.** Close the superseded minor/patch PRs, keep the
  majors (React 19, Firebase 12, React Router 7, TypeScript 7) as planned
  migrations, and review the weekly group every Monday now that CI can judge it.
- **Firebase 12 upgrade.** Unlocks `@firebase/rules-unit-testing` 5 and clears
  the `undici` advisories. Outside PR #19 is a starting point but must be
  re-based and run through the full E2E, not merged as-is.
- **Client lint as an explicit CI step.** Fix the 173 test-file warnings
  (testing-library / jest rules) and add `eslint src --max-warnings 0` so the
  gate is visible rather than a side effect of the build.
- **Structured logging.** Route the 339 `console.*` calls through
  `src/utils/log.js` (scoped, silenced in production, verbose via
  `localStorage['performsat:logVerbose']`).
- **E2E depth.** One Playwright spec exists. Add smoke specs for sign-up,
  diagnostic, study-plan drill, and checkout return; they run hermetically
  against the emulators already.
- **Tutor prompt escape bug.** `src/services/aiTutorService.js` (~line 406) writes
  `\frac` and `\times` inside a JS template literal, so the model receives a
  form-feed and a tab instead of the LaTeX. Found during the lint pass, left
  untouched because fixing it changes the prompt; fix and eyeball one tutor
  reply.
- **Orphaned components.** `SkillDiagnosticSummary.jsx` and `CollegePicker.jsx`
  (1,182 lines) are no longer imported anywhere after the lint pass. Delete or
  re-wire deliberately.
- **Firestore schema guards.** Rules have no document shape or size checks
  (flagged 2026-07-18). Add field allowlists and size caps per collection.

## Tier 3: platform moves (multi-day, plan each with a spec)

- **Leave Create React App for Vite.** Removes the unpatchable vulnerability
  set, cuts build time, and unblocks modern tooling. Keep Jest or move to
  Vitest in the same pass. Prerequisite: green CI and the E2E smoke set.
- **TypeScript, incrementally.** Start with `services/` (diagnostic engine,
  study-plan generator, scoring) where the data contracts live; components
  later.
- **Decompose `App.jsx` and `PracticeTest.jsx`.** Move practice-session state
  into a reducer + context, and split the test runner into module / timer /
  review units. Do this after TypeScript reaches `services/` so the extracted
  state has types.
- **Staging environment.** A second Firebase project + Vercel preview wired to
  it, so functions and rules changes are exercised before production.

## Working agreements that keep this true

- A commit is not done until CI is green for it. After every push:
  `gh run list --branch main --limit 1`.
- Before committing: `CI=true npm run build` and the unit suite.
- After any dependency change: `npx -y npm@10 ci --dry-run --ignore-scripts`
  must print zero `npm error` lines.
- Dependabot PRs get a decision within a week: merge, close as superseded, or
  convert to a planned migration in this file.
- Update this file when an item changes state; stale roadmaps are worse than none.
