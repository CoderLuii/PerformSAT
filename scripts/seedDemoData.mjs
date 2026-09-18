#!/usr/bin/env node
/**
 * scripts/seedDemoData.mjs
 *
 * Seed the local Firebase emulators with the minimum data a contributor
 * needs to dogfood PerformSAT end-to-end:
 *   - 1 student (auth user + users/{uid} profile + progress/{uid} doc)
 *   - 1 completed practice test attempt
 *   - 1 generated study plan
 *
 * Usage:
 *   1) Start the emulators in another shell:
 *        npm run dev:emulator
 *      (or: firebase emulators:start --only auth,firestore)
 *   2) In a third shell, run:
 *        npm run dev:seed
 *
 * Requires the standard emulator-discovery env vars, which the npm script
 * sets for you:
 *   FIRESTORE_EMULATOR_HOST=localhost:8080
 *   FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
 *   GCLOUD_PROJECT=performsat-demo  (any string; emulator doesn't care)
 *
 * Idempotent — re-running re-seeds (overwrites existing demo docs by id).
 */

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// ───────────────────────────────────────────────────────────────────────
// Setup
// ───────────────────────────────────────────────────────────────────────

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  console.error('ERROR: FIRESTORE_EMULATOR_HOST is not set. Run via `npm run dev:seed`.');
  process.exit(1);
}
if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.error('ERROR: FIREBASE_AUTH_EMULATOR_HOST is not set. Run via `npm run dev:seed`.');
  process.exit(1);
}

initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'performsat-demo' });
const db = getFirestore();
const auth = getAuth();

// ───────────────────────────────────────────────────────────────────────
// Demo data shapes
// ───────────────────────────────────────────────────────────────────────

const STUDENT_EMAIL = 'demo-student@performsat.local';
// Emulator-only credential (never a real account) — lets the E2E suite and
// local dogfooding log in through the normal email/password form.
const STUDENT_PASSWORD = 'demo-password-123';
const STUDENT_UID = 'demo-student-uid';
const STUDENT_NAME = 'Demo Student';

const studentProfile = {
  uid: STUDENT_UID,
  email: STUDENT_EMAIL,
  displayName: STUDENT_NAME,
  testDate: '2026-08-15',
  targetScore: 700,
  currentScore: 540,
  createdAt: FieldValue.serverTimestamp(),
};

// One completed test attempt — minimum shape useProgress needs to render
// the dashboard's Practice Tests view + drive the diagnostic surface.
const completedTestAttempt = {
  completedAt: new Date().toISOString(),
  rawScore: 28,
  totalQuestions: 44,
  scaledScore: 540,
  sectionScores: null,
  isMultiSection: false,
  timedMode: true,
  moduleScores: { 'module-1': 16, 'module-2': 12 },
  // Minimal item-level telemetry: the Past-Test-Review CTA filters attempts
  // with getCompletedTests(..., { requireItemDetails: true }), which needs a
  // non-empty diagnosticData.questionDetails (keys are `${modIdx}-${qIdx}`).
  // Without this the seeded attempt is invisible to the review surface (and
  // the e2e smoke that exercises it).
  diagnosticData: {
    questionDetails: {
      '0-0': { timeSpent: 45, visits: 1 },
      '0-1': { timeSpent: 30, visits: 1 },
      '0-2': { timeSpent: 62, visits: 2 },
    },
  },
  diagnosticReport: null,
  scoringVersion: 'demo-1',
  thetaEstimate: -0.3,
  standardError: 0.4,
  routeTaken: 'M2-Hard',
};

const practiceTestResults = {
  'practice-test-1': {
    attempts: [completedTestAttempt],
    bestScaledScore: 540,
    bestRawScore: 28,
    totalAttempts: 1,
    lastAttemptAt: new Date(),
  },
};

// Minimal study plan with one focus area weakness so TodaysTasksCard +
// Focus Area cards have something to render. Activities placed on the
// current weekday so the "ready" state of TodaysTasksCard fires.
const today = new Date();
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todayName = DAY_NAMES[today.getDay()];

const studyPlan = {
  weeks: [
    {
      weekNumber: 1,
      title: 'Week 1 — Foundations',
      activities: [
        {
          type: 'practice',
          activityType: 'practiceSection',
          title: 'Practice: Linear Equations',
          subtitle: 'Algebra → Core',
          moduleId: 'linear-equations',
          sectionName: 'Deriving Equations',
          // Format-v2 drill fields (what studyPlanGenerator emits today): the
          // Study Plan routes these through the targeted-weakness drill, which
          // carries the weakness into the shell (diagnostic sentence, chip).
          skillId: 'slope-intercept-form',
          skillName: 'Slope-intercept form',
          section: 'math',
          domain: 'algebra',
          duration: 20,
          completed: false,
          day: todayName,
          icon: '📝',
        },
      ],
      isTestWeek: false,
      focusSkills: ['slope-intercept-form'],
      focusDomains: ['Algebra'],
    },
  ],
  weaknesses: [
    {
      skillId: 'slope-intercept-form',
      skill: 'Slope-intercept form',
      evidence: '2 of 5 misses',
      accuracy: 40,
      errorType: 'conceptual_gap',
      domain: 'algebra',
      modules: ['module-1'],
      sections: ['module-1'],
      section: 'math',
    },
  ],
  summary: { diagnosis: 'Demo plan with one focus area for dogfood testing.' },
};

const progress = {
  userId: STUDENT_UID,
  practiceTestResults,
  studyPlan,
  practiceProgress: {},
  completedLessons: {},
  reviewQueue: [],
  predictionLog: [],
  lastUpdated: FieldValue.serverTimestamp(),
};

// ───────────────────────────────────────────────────────────────────────
// Write
// ───────────────────────────────────────────────────────────────────────

async function seed() {
  // Auth user — overwrite if exists (idempotent re-seed).
  try {
    await auth.deleteUser(STUDENT_UID);
  } catch (err) {
    if (err && err.code !== 'auth/user-not-found') throw err;
  }
  await auth.createUser({
    uid: STUDENT_UID,
    email: STUDENT_EMAIL,
    password: STUDENT_PASSWORD,
    emailVerified: true,
    displayName: STUDENT_NAME,
  });

  // Firestore docs.
  await db.collection('users').doc(STUDENT_UID).set(studentProfile);
  await db.collection('progress').doc(STUDENT_UID).set(progress);

  console.info('✅ Seeded demo data:');
  console.info(`   student: ${STUDENT_EMAIL} / ${STUDENT_PASSWORD} (uid: ${STUDENT_UID})`);
  console.info('   1 completed test, 1 study plan, 1 weakness on the current weekday.');
  console.info('');
  console.info('Sign in via the magic-link emulator UI at http://localhost:4000/auth.');
}

seed()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  });
