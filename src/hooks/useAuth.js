import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { getUserTestDates, derivePrimaryTestDate, normalizeTestDates, withPrimaryReplaced } from '../services/selectors/testDates';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { doc, getDoc, getDocFromServer, setDoc, serverTimestamp } from 'firebase/firestore';
import { TERMS_VERSION } from '../constants/legal';
import { toCompositeGoal } from '../services/selectors/goalProgress';
import { setReviewStreakUser } from '../services/dailyReviewEngine';
import { clearChatSessionStorage } from '../services/chatSessionService';
import { phIdentify, phReset } from '../services/posthogClient';

export const ALREADY_SIGNED_IN_MSG = 'You are already signed in. Log out first to create a new account.';

/**
 * Throws ALREADY_SIGNED_IN_MSG when a signup is attempted over a live
 * Firebase session. Creating an account while signed in is never a valid
 * state here — the funnel is the only signup surface, and completing it
 * against an existing session risks writing onboarding data over the
 * signed-in account (bug filed 2026-08-13). Pure and exported so the guard
 * is testable without a renderer.
 *
 * @param {Object|null} currentUser - firebase auth.currentUser at call time
 */
export const assertNotAlreadySignedIn = (currentUser) => {
  if (currentUser) {
    throw new Error(ALREADY_SIGNED_IN_MSG);
  }
};

/**
 * Build the users/{uid} document written at signup.
 * Pure helper extracted from signup so the doc shape (including the
 * consent stamp: agreedToTermsAt + termsVersion) is unit-testable without
 * a renderer. Field order/values mirror the original signup literal.
 *
 * When the signup came through the pre-signup onboarding funnel,
 * additionalInfo.funnelProfile (built by buildFunnelProfile) lands the
 * goal + quiz answers in the SAME initial write — profile setters can't
 * run pre-auth, and a follow-up write would race the 1.5s hydration retry
 * below. goalScale:'composite' must ride along with targetScore or
 * normalizeProfileGoal doubles sub-800 goals on the next load.
 *
 * @param {string} email - The new account's email
 * @param {string} [firstName] - Display name; falls back to the email prefix
 * @param {Object} [additionalInfo] - Signup extras (hasTakenSAT, satScore, funnelProfile)
 * @returns {Object} The Firestore user document payload
 */
export const buildSignupUserDoc = (email, firstName = '', additionalInfo = {}) => {
  const userDoc = {
    email,
    firstName: firstName || email.split('@')[0],
    role: 'student',
    hasTakenSAT: additionalInfo.hasTakenSAT || false,
    satScore: additionalInfo.satScore || null,
    agreedToTermsAt: serverTimestamp(),
    termsVersion: TERMS_VERSION,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp()
  };

  const funnel = additionalInfo.funnelProfile;
  if (funnel && typeof funnel.targetScore === 'number') {
    userDoc.targetScore = funnel.targetScore;
    userDoc.goalScale = funnel.goalScale || 'composite';
    userDoc.onboardingProfile = funnel.onboardingProfile || null;
  }

  return userDoc;
};

/**
 * Migrate a freshly-loaded profile onto the composite (400-1600) goal scale.
 * SEVA used to be math-only, so legacy accounts stored a section-scale (≤800)
 * `targetScore` — a 750 Math goal, or a college Math median adopted via
 * updateTargetSchools. The app now covers BOTH sections, so that number is
 * converted to composite once on load (750 → 1500, "750 each section") and
 * (best-effort) persisted, so the stale math-only goal never resurfaces in the
 * goal tile, study plan, diagnosis, or anywhere else. Idempotent: a composite
 * goal or a profile without a numeric goal passes through untouched.
 *
 * The Firestore write-back is fire-and-forget — the returned (migrated) profile
 * is authoritative for this session even if the write fails, and the next load
 * simply retries the conversion (which is deterministic).
 *
 * @param {Object} profile - the assembled user profile (uid + Firestore data)
 * @returns {Object} the profile to hand to setUser, with a composite targetScore
 */
/**
 * Keep users/{uid}.testDate = the NEXT sitting in users/{uid}.testDates as
 * time passes (see selectors/testDates). Read-time derivation is what every
 * consumer sees; a drifted stored value is re-persisted best-effort so
 * server-side readers (re-engagement) catch up too.
 *
 * @param {Object} profile
 * @param {Date} [today]
 * @returns {Object}
 */
export const normalizeProfileTestDates = (profile, today = new Date()) => {
  if (!profile) return profile;
  const list = getUserTestDates(profile);
  if (list.length === 0) return profile;
  const primary = derivePrimaryTestDate(list, today);
  const listChanged = !Array.isArray(profile.testDates) || profile.testDates.length !== list.length || profile.testDates.some((d, i) => d !== list[i]);
  if (primary === profile.testDate && !listChanged) return profile;
  if (profile.uid && primary !== profile.testDate) {
    Promise.resolve(
      setDoc(doc(db, 'users', profile.uid), { testDate: primary, testDates: list }, { merge: true })
    ).catch((err) => console.error('Error persisting derived test date:', err));
  }
  return { ...profile, testDate: primary, testDates: list };
};

/** Every read-time profile normalization, in order. */
const normalizeProfile = (profile) => normalizeProfileTestDates(normalizeProfileGoal(profile));

export const normalizeProfileGoal = (profile) => {
  if (!profile || typeof profile.targetScore !== 'number') return profile;
  // A goal written through the composite slider (400-1600) is stamped
  // goalScale:'composite'. Trust the flag and never migrate, so a deliberate
  // sub-800 composite target (e.g. 750) isn't doubled by the legacy
  // section→composite migration on every page load. Magnitude alone can't
  // distinguish a legacy section goal from a low composite goal in [400,800].
  if (profile.goalScale === 'composite') return profile;
  const migrated = toCompositeGoal(profile.targetScore);
  if (migrated === profile.targetScore) return profile;
  if (profile.uid) {
    Promise.resolve(
      setDoc(doc(db, 'users', profile.uid), { targetScore: migrated }, { merge: true })
    ).catch((err) => console.error('Error persisting goal-scale migration:', err));
  }
  return { ...profile, targetScore: migrated };
};

/**
 * Read the student's profile doc, preferring a SERVER round trip.
 *
 * Why not plain getDoc: on the landing-page login path, `login()` writes
 * `lastLoginAt` (merge) on a doc this client has never read. The auth
 * listener's concurrent getDoc then resolves from the local write overlay —
 * a doc that "exists" with ONLY `lastLoginAt` — and the whole session runs
 * on that shell profile (no firstName, no testDate, no onboarding stamps →
 * inner onboarding re-seized returning students; reproduced 2026-08-22).
 * getDocFromServer bypasses the overlay; getDoc is the offline fallback.
 *
 * @param {import('firebase/firestore').DocumentReference} ref
 * @returns {Promise<import('firebase/firestore').DocumentSnapshot>}
 */
const readProfileDoc = async (ref) => {
  try {
    return await getDocFromServer(ref);
  } catch {
    return getDoc(ref);
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Scope the daily-review streak store to the active account (null =
      // anonymous) so a shared device never mixes two students' streaks. Runs
      // synchronously before any await / stale-guard bailout.
      setReviewStreakUser(firebaseUser?.uid || null);
      // PostHog identity follows auth state: uid only (no email/name — PII
      // stays out of product analytics), reset on sign-out so a shared device
      // never chains two students' events under one person. Lazy wrapper —
      // inert without REACT_APP_POSTHOG_KEY, never throws into auth.
      if (firebaseUser) phIdentify(firebaseUser.uid);
      else phReset();
      if (firebaseUser) {
        // The awaits below give a sign-out or account switch time to land
        // mid-callback, so every setUser is gated on the auth user being
        // unchanged — a stale callback must not resurrect the previous user.
        // Bailing skips setLoading(false) too; the listener invocation for
        // the NEW auth state owns it. (The hook mounts twice — App +
        // LandingPage — so this also keeps the listeners idempotent.)
        const isStale = () => auth.currentUser?.uid !== firebaseUser.uid;
        try {
          // Fetch user profile from Firestore
          let userDoc = await readProfileDoc(doc(db, 'users', firebaseUser.uid));
          if (!userDoc.exists() && !isStale()) {
            // Signup race: the signup flow's users-doc write usually lands
            // within ~1.5s of the auth user existing. Retry once before
            // settling for the minimal profile, so the other hook instance
            // doesn't strand a fresh signup without firstName/goal fields.
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (isStale()) return;
            userDoc = await readProfileDoc(doc(db, 'users', firebaseUser.uid));
          }
          if (isStale()) return;
          if (userDoc.exists()) {
            setUser(normalizeProfile({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data()
            }));
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email
            });
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError(err.message);
          if (isStale()) return;
          // A transient profile read failure must not render a signed-in
          // student the login page — fall back to the minimal auth profile.
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Sign up a new user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} firstName - User's first name
   * @param {Object} additionalInfo - Additional user info (hasTakenSAT, satScore, agreedToTerms)
   * @returns {Promise<Object>} User object
   */
  const signup = async (email, password, firstName = '', additionalInfo = {}) => {
    // Consent guard lives BEFORE the try block: the catch below rewrites
    // unknown errors (no err.code) to a generic message, which would
    // swallow this one.
    if (!additionalInfo.agreedToTerms) {
      const msg = 'Please confirm you are 13 or older and agree to the Terms of Service and Privacy Policy.';
      setError(msg);
      throw new Error(msg);
    }

    // Same before-the-try placement as the consent guard, for the same
    // reason: the catch below rewrites unknown errors to a generic message.
    if (auth.currentUser) {
      setError(ALREADY_SIGNED_IN_MSG);
      assertNotAlreadySignedIn(auth.currentUser);
    }

    try {
      setError(null);

      // 1. Create Firebase auth user
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Create user document in Firestore (includes the consent stamp)
      const userData = buildSignupUserDoc(result.user.email, firstName, additionalInfo);

      await setDoc(doc(db, 'users', result.user.uid), userData);

      // 3. Create progress document
      await setDoc(doc(db, 'progress', result.user.uid), {
        userId: result.user.uid,
        lastUpdated: serverTimestamp(),
        totalLessonsCompleted: 0,
        totalModulesCompleted: 0,
        completedLessons: {}
      });

      setUser({
        uid: result.user.uid,
        ...userData
      });

      return {
        uid: result.user.uid,
        ...userData
      };
    } catch (err) {
      console.error('Error signing up:', err);
      let errorMessage = 'Failed to create account. Please try again.';

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please log in instead.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  /**
   * Log in an existing user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User object
   */
  const login = async (email, password) => {
    try {
      setError(null);

      // Sign in with Firebase
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data FIRST — from the server. The lastLoginAt merge below
      // used to run before this read; on a doc this client had never read,
      // the concurrent auth-listener getDoc resolved from the local write
      // overlay ({ lastLoginAt } only) and the session ran on a shell
      // profile. Read, then stamp.
      const userDoc = await readProfileDoc(doc(db, 'users', result.user.uid));
      const userData = normalizeProfile({
        uid: result.user.uid,
        email: result.user.email,
        ...userDoc.data()
      });

      setUser(userData);

      // Update last login time — best-effort, never blocks the login.
      setDoc(doc(db, 'users', result.user.uid), {
        lastLoginAt: serverTimestamp()
      }, { merge: true }).catch((e) => console.warn('lastLoginAt stamp failed:', e?.message || e));

      return userData;
    } catch (err) {
      console.error('Error logging in:', err);
      let errorMessage = 'Failed to log in. Please try again.';

      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect email or password.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  /**
   * Logs out the current user
   */
  const logout = async () => {
    try {
      // Clear user-scoped chat caches from sessionStorage BEFORE the auth state
      // flips, so the next account on this tab can't restore the previous
      // student's tutor conversation from the fallback cache.
      clearChatSessionStorage();
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err.message);
      throw err;
    }
  };

  /**
   * Update user's test date
   * @param {string} testDate - Test date in YYYY-MM-DD format; '' clears it
   */
  const updateTestDate = async (testDate) => {
    if (!user?.uid) return;
    // Contract: users/{uid}.testDate is 'YYYY-MM-DD' (parseLocalDate /
    // getDaysUntilTest / plan pacing all consume it). An empty value is an
    // explicit clear, stored as null (every consumer null-guards a missing
    // date); anything else non-conforming is a no-op so a formatted display
    // string can never be persisted.
    const cleared = testDate === '' || testDate === null || testDate === undefined;
    if (!cleared && !/^\d{4}-\d{2}-\d{2}$/.test(testDate)) return;
    // Single-date editors (Profile, onboarding) set the PRIMARY: swap it in
    // the full list and keep the other sittings.
    const list = withPrimaryReplaced(getUserTestDates(user), user.testDate || null, cleared ? null : testDate);
    const nextTestDate = derivePrimaryTestDate(list) ?? null;

    try {
      await setDoc(doc(db, 'users', user.uid), {
        testDate: nextTestDate,
        testDates: list,
      }, { merge: true });

      setUser(prev => ({ ...prev, testDate: nextTestDate, testDates: list }));
    } catch (err) {
      console.error('Error updating test date:', err);
      throw err;
    }
  };

  /**
   * Replace the student's full list of SAT dates (the inline picker). The
   * primary (testDate) is re-derived from the list.
   *
   * @param {string[]} dates - 'YYYY-MM-DD' strings; [] clears everything
   */
  const updateTestDates = async (dates) => {
    if (!user?.uid) return;
    const list = normalizeTestDates(dates);
    const primary = derivePrimaryTestDate(list) ?? null;
    try {
      await setDoc(doc(db, 'users', user.uid), { testDate: primary, testDates: list }, { merge: true });
      setUser(prev => ({ ...prev, testDate: primary, testDates: list }));
    } catch (err) {
      console.error('Error updating test dates:', err);
      throw err;
    }
  };

  /**
   * Record what happened with an official SAT sitting (Home's score prompt).
   * Stored as users/{uid}.scoreReports[testDate] so the prompt never re-asks
   * for a date the student already answered. A reported composite also
   * becomes currentScore — an official score is the most authoritative
   * "where you are" the app can have.
   *
   * @param {string} testDate - 'YYYY-MM-DD'
   * @param {{status:'reported'|'declined'|'not-taken', composite?:number, rw?:number, math?:number}} report
   */
  const recordScoreReport = async (testDate, report) => {
    if (!user?.uid) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(testDate || '')) return;
    const status = ['reported', 'declined', 'not-taken'].includes(report?.status) ? report.status : null;
    if (!status) return;
    const entry = { status, reportedAt: new Date().toISOString() };
    if (status === 'reported') {
      if (!Number.isFinite(report.composite)) return;
      entry.composite = report.composite;
      if (Number.isFinite(report.rw)) entry.rw = report.rw;
      if (Number.isFinite(report.math)) entry.math = report.math;
    }
    const patch = { scoreReports: { [testDate]: entry } };
    if (status === 'reported') patch.currentScore = report.composite;
    try {
      // setDoc+merge deep-merges the map: other dates' entries survive.
      await setDoc(doc(db, 'users', user.uid), patch, { merge: true });
      setUser(prev => ({
        ...prev,
        scoreReports: { ...(prev?.scoreReports || {}), [testDate]: entry },
        ...(status === 'reported' ? { currentScore: report.composite } : {}),
      }));
    } catch (err) {
      console.error('Error recording score report:', err);
      throw err;
    }
  };

  /**
   * Update the user's profile photo.
   * @param {string|null} photoDataUrl - small data-URL JPEG (client-resized,
   *   ~10-60KB) stored inline on the user doc; pass null to remove the photo.
   *   Kept well under Firestore's 1MB doc limit by the caller's size guard.
   */
  const updateProfilePhoto = async (photoDataUrl) => {
    if (!user?.uid) return;
    const next = photoDataUrl || null;
    const prev = user.photoDataUrl ?? null;
    // Optimistic: every avatar updates immediately. The setDoc used to gate
    // the local update, and a hung write (SDK memory persistence + flaky
    // network never settles) left the UI stale until a refresh re-hydrated
    // the eventually-flushed doc. Race an 8s timeout so the caller's busy
    // state always clears; the SDK still flushes the write when it can.
    setUser((p) => ({ ...p, photoDataUrl: next }));
    try {
      let timer;
      await Promise.race([
        setDoc(doc(db, 'users', user.uid), { photoDataUrl: next }, { merge: true }),
        new Promise((resolve) => { timer = setTimeout(resolve, 8000); }),
      ]).finally(() => clearTimeout(timer));
    } catch (err) {
      // Definite rejection (rules/validation) — roll the avatar back.
      setUser((p) => ({ ...p, photoDataUrl: prev }));
      console.error('Error updating profile photo:', err);
      throw err;
    }
  };

  /**
   * Update the user's display name (what the app calls them everywhere:
   * greeting, plan hero, sidebar).
   * @param {string} firstName
   */
  const updateFirstName = async (firstName) => {
    if (!user?.uid) return;
    const clean = (firstName || '').trim().slice(0, 40);
    if (!clean) return;

    try {
      await setDoc(doc(db, 'users', user.uid), {
        firstName: clean
      }, { merge: true });

      setUser(prev => ({ ...prev, firstName: clean }));
    } catch (err) {
      console.error('Error updating name:', err);
      throw err;
    }
  };

  /**
   * Update user's target SAT score. The on-ramp wizard (2026-06) writes a
   * composite 400-1600 goal; legacy accounts may still hold a section-scale
   * 200-800 value. Scale-safe comparisons live in selectors/goalProgress.js.
   * @param {number} targetScore - Target score (composite 400-1600, or legacy section 200-800)
   */
  const updateTargetScore = async (targetScore) => {
    if (!user?.uid) return;
    if (!Number.isFinite(targetScore)) return; // never persist NaN/undefined

    try {
      await setDoc(doc(db, 'users', user.uid), {
        targetScore: targetScore,
        goalScale: 'composite', // provenance: came from the 400-1600 slider, never re-migrate
      }, { merge: true });

      setUser(prev => ({ ...prev, targetScore, goalScale: 'composite' }));
    } catch (err) {
      console.error('Error updating target score:', err);
      throw err;
    }
  };

  /**
   * Update user's self-reported current SAT score. The on-ramp wizard writes a
   * composite 400-1600 value; legacy accounts may hold a section-scale one.
   * @param {number} currentScore - Current score (composite 400-1600, or legacy section 200-800)
   */
  const updateCurrentScore = async (currentScore) => {
    if (!user?.uid) return;
    if (!Number.isFinite(currentScore)) return; // never persist NaN/undefined

    try {
      await setDoc(doc(db, 'users', user.uid), {
        currentScore: currentScore
      }, { merge: true });

      setUser(prev => ({ ...prev, currentScore }));
    } catch (err) {
      console.error('Error updating current score:', err);
      throw err;
    }
  };

  /**
   * Stamp the on-ramp as finished (wizard + mini-diagnostic complete). The
   * /course gate stops mounting onboarding once this exists on users/{uid}.
   */
  const markOnboardingComplete = async () => {
    if (!user?.uid) return;
    const onboardingCompletedAt = new Date().toISOString();

    try {
      await setDoc(doc(db, 'users', user.uid), {
        onboardingCompletedAt
      }, { merge: true });

      setUser(prev => ({ ...prev, onboardingCompletedAt }));
    } catch (err) {
      console.error('Error marking onboarding complete:', err);
      throw err;
    }
  };

  /**
   * Stamp the on-ramp as skipped ("Skip for now"). The gate stops auto-mounting
   * onboarding, and the dashboard offers a "finish your check-in" card instead.
   */
  const markOnboardingSkipped = async () => {
    if (!user?.uid) return;
    const onboardingSkippedAt = new Date().toISOString();

    try {
      await setDoc(doc(db, 'users', user.uid), {
        onboardingSkippedAt
      }, { merge: true });

      setUser(prev => ({ ...prev, onboardingSkippedAt }));
    } catch (err) {
      console.error('Error marking onboarding skipped:', err);
      throw err;
    }
  };

  /**
   * Persist the post-signup inner-onboarding answers in ONE merged write and
   * stamp it complete. Runs after the account already exists (unlike the
   * funnel, which rides its data into the signup doc). Batching all fields +
   * the completion stamp into a single setDoc avoids racing multiple profile
   * setters against hydration and makes the finish step atomic.
   *
   * Each field is guarded the same way its individual setter guards it, so a
   * skipped screen (undefined) or a malformed value is simply omitted rather
   * than persisted. `innerOnboardingCompletedAt` is always written so the
   * /course gate stops mounting the inner-onboarding flow next session.
   *
   * @param {Object} payload
   * @param {string} [payload.feeling] - test-prep feeling slug (confident|fine|stressed|heavy)
   * @param {string} [payload.testDate] - 'YYYY-MM-DD' exam date
   * @param {number} [payload.currentScore] - self-reported current composite 400-1600
   * @param {number} [payload.targetScore] - goal composite 400-1600
   * @param {string} [payload.confidentArea] - section slug they feel most confident about
   * @param {string} [payload.worryArea] - section slug that worries them most
   * @param {number} [payload.gradYear] - high-school graduation year
   * @returns {Promise<void>}
   */
  const completeInnerOnboarding = async (payload = {}) => {
    if (!user?.uid) return;
    const {
      feeling, testDate, currentScore, targetScore,
      confidentArea, worryArea, gradYear,
      weakMathAreas, weakRWAreas, studyDaysPerWeek,
    } = payload;

    const update = { innerOnboardingCompletedAt: new Date().toISOString() };

    if (typeof feeling === 'string' && feeling) update.feeling = feeling;
    // testDate: only a real 'YYYY-MM-DD' string is stored (plan pacing parses it).
    if (typeof testDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(testDate)) {
      update.testDate = testDate;
      update.testDates = [testDate];
    }
    if (Number.isFinite(currentScore)) update.currentScore = currentScore;
    if (Number.isFinite(targetScore)) {
      update.targetScore = targetScore;
      update.goalScale = 'composite'; // provenance — never re-migrate the 400-1600 value
    }
    if (typeof confidentArea === 'string' && confidentArea) update.confidentArea = confidentArea;
    if (typeof worryArea === 'string' && worryArea) update.worryArea = worryArea;
    if (Number.isFinite(gradYear)) update.gradYear = gradYear;
    // Detailed self-report — the starter plan's inputs (see starterPlanService).
    if (Array.isArray(weakMathAreas) && weakMathAreas.length) update.weakMathAreas = weakMathAreas;
    if (Array.isArray(weakRWAreas) && weakRWAreas.length) update.weakRWAreas = weakRWAreas;
    if (Number.isFinite(studyDaysPerWeek)) update.studyDaysPerWeek = studyDaysPerWeek;

    try {
      await setDoc(doc(db, 'users', user.uid), update, { merge: true });
      setUser(prev => ({ ...prev, ...update }));
    } catch (err) {
      console.error('Error saving inner onboarding:', err);
      throw err;
    }
  };

  /**
   * Update user's target schools and auto-calculate target score
   * @param {Array} schools - Array of school objects [{id, name, satMath}, ...]
   */
  const updateTargetSchools = async (schools) => {
    if (!user?.uid) return;

    try {
      // Calculate median score from selected schools. The Profile editor
      // submits schools as {name}-only (no satMath), so filter to finite
      // scores — an undefined/NaN median would either throw inside Firestore
      // ("Unsupported field value: undefined") or persist a NaN goal.
      const scores = schools.map(s => s.satMath).filter(Number.isFinite);
      const sorted = [...scores].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const medianScore = sorted.length === 0
        ? null
        : sorted.length % 2 === 0
          ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
          : sorted[mid];

      // School medians are MATH-section scale (collegeData has only satMath).
      // Never overwrite a composite (400-1600) on-ramp goal with one — that
      // silently rebrands the whole plan as a Math plan. Only adopt the median
      // when the existing goal is unset, and convert it onto the composite scale
      // first (a 750 Math median → a 1500 "750 each section" goal) so the app
      // never stores a stale math-only target. [composite goal migration]
      // Always save the schools list itself; only attach targetScore when the
      // computed composite is a real number.
      const keepExistingTarget = typeof user?.targetScore === 'number' && user.targetScore > 800;
      const compositeGoal = medianScore === null ? null : toCompositeGoal(medianScore);
      const payload = keepExistingTarget || !Number.isFinite(compositeGoal)
        ? { targetSchools: schools }
        : { targetSchools: schools, targetScore: compositeGoal };

      await setDoc(doc(db, 'users', user.uid), payload, { merge: true });

      setUser(prev => ({ ...prev, ...payload }));
    } catch (err) {
      console.error('Error updating target schools:', err);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateTestDate,
    updateTestDates,
    recordScoreReport,
    updateTargetScore,
    updateCurrentScore,
    updateTargetSchools,
    updateProfilePhoto,
    updateFirstName,
    markOnboardingComplete,
    markOnboardingSkipped,
    completeInnerOnboarding,
    isAuthenticated: !!user
  };
};
