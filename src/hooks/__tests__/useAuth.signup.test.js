/**
 * Tests for the signup consent contract in useAuth.
 *
 * buildSignupUserDoc is the pure helper extracted from signup so the
 * users/{uid} doc shape — including the new consent stamp
 * (agreedToTermsAt + termsVersion) — is testable without a renderer
 * (@testing-library/react is NOT installed; module-API tests only, per
 * the Toaster.test.js convention). The hook's throw-on-no-consent guard
 * needs a renderer to invoke, so the testable surface is this doc
 * contract plus the LandingPage required+guard.
 *
 * Firebase is mocked following the skillService.test.js convention.
 */

jest.mock('../../firebase/config', () => ({ auth: {}, db: {} }));
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  signOut: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

import { serverTimestamp } from 'firebase/firestore';
import { buildSignupUserDoc, assertNotAlreadySignedIn, ALREADY_SIGNED_IN_MSG } from '../useAuth';
import { TERMS_VERSION } from '../../constants/legal';

// CRA's jest config sets resetMocks: true, so implementations must be
// (re)installed per test, not in the module factory.
beforeEach(() => {
  serverTimestamp.mockReturnValue('SERVER_TS');
});

describe('buildSignupUserDoc', () => {
  test('stamps consent fields: agreedToTermsAt + termsVersion', () => {
    const userDoc = buildSignupUserDoc('a@b.com', 'Ana', { agreedToTerms: true });
    expect(userDoc.agreedToTermsAt).toBe('SERVER_TS');
    expect(userDoc.termsVersion).toBe(TERMS_VERSION);
  });

  test('legacy field regression: shape matches the original signup literal', () => {
    const userDoc = buildSignupUserDoc('a@b.com', 'Ana', {
      hasTakenSAT: true,
      satScore: 640,
      agreedToTerms: true,
    });
    expect(userDoc).toEqual({
      email: 'a@b.com',
      firstName: 'Ana',
      role: 'student',
      hasTakenSAT: true,
      satScore: 640,
      agreedToTermsAt: 'SERVER_TS',
      termsVersion: TERMS_VERSION,
      createdAt: 'SERVER_TS',
      lastLoginAt: 'SERVER_TS',
    });
  });

  test('firstName falls back to the email prefix', () => {
    const userDoc = buildSignupUserDoc('study.buddy@example.com', '', {});
    expect(userDoc.firstName).toBe('study.buddy');
  });

  test('defaults: hasTakenSAT false, satScore null when additionalInfo omitted', () => {
    const userDoc = buildSignupUserDoc('a@b.com', 'Ana');
    expect(userDoc.hasTakenSAT).toBe(false);
    expect(userDoc.satScore).toBeNull();
    expect(userDoc.role).toBe('student');
  });

  test('funnelProfile lands goal + answers in the initial doc, with the composite provenance stamp', () => {
    const userDoc = buildSignupUserDoc('a@b.com', 'Ana', {
      agreedToTerms: true,
      hasTakenSAT: true,
      funnelProfile: {
        targetScore: 1450,
        goalScale: 'composite',
        hasTakenSAT: true,
        onboardingProfile: {
          version: 1,
          completedAt: '2026-07-02T00:00:00.000Z',
          answers: { timing: '2to6m', feeling: 'stressed' },
        },
      },
    });
    expect(userDoc.targetScore).toBe(1450);
    // Without this stamp normalizeProfileGoal doubles sub-800 goals on next load.
    expect(userDoc.goalScale).toBe('composite');
    expect(userDoc.onboardingProfile.answers).toEqual({ timing: '2to6m', feeling: 'stressed' });
    expect(userDoc.hasTakenSAT).toBe(true);
  });

  test('funnelProfile without a numeric targetScore adds no goal fields', () => {
    const userDoc = buildSignupUserDoc('a@b.com', 'Ana', {
      agreedToTerms: true,
      funnelProfile: { targetScore: 'not-a-number' },
    });
    expect(userDoc).not.toHaveProperty('targetScore');
    expect(userDoc).not.toHaveProperty('goalScale');
    expect(userDoc).not.toHaveProperty('onboardingProfile');
  });

  test('no funnelProfile → legacy doc shape unchanged (no goal keys)', () => {
    const userDoc = buildSignupUserDoc('a@b.com', 'Ana', { agreedToTerms: true });
    expect(userDoc).not.toHaveProperty('targetScore');
    expect(userDoc).not.toHaveProperty('goalScale');
    expect(userDoc).not.toHaveProperty('onboardingProfile');
  });
});

describe('assertNotAlreadySignedIn (funnel-while-logged-in guard)', () => {
  // Regression guard for the bug filed 2026-08-13: the signup funnel was
  // walkable with a live session and mutated the existing account. signup()
  // now calls this before creating anything; the App route + LandingPage
  // refuse the funnel earlier still (defense in depth).
  test('throws the exact user-facing message when a session exists', () => {
    expect(() => assertNotAlreadySignedIn({ uid: 'existing-uid' }))
      .toThrow(ALREADY_SIGNED_IN_MSG);
  });

  test('passes through when no session exists', () => {
    expect(() => assertNotAlreadySignedIn(null)).not.toThrow();
    expect(() => assertNotAlreadySignedIn(undefined)).not.toThrow();
  });
});

describe('TERMS_VERSION', () => {
  test('is a non-empty YYYY-MM-DD string', () => {
    expect(typeof TERMS_VERSION).toBe('string');
    expect(TERMS_VERSION).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
