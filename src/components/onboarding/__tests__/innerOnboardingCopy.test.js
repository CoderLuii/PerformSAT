/**
 * Contract tests for the inner-onboarding continuity copy. Same rules as
 * funnelConfig: exhaustive over the persisted option values, graceful null
 * fallback for legacy docs without funnel answers, no emojis/em-dashes in
 * new copy, callbacks budgeted to screens 0 + 11, and a finish preview
 * that promises only student-picked facts with an honest floor.
 */

import { FUNNEL_QUESTIONS } from '../funnelConfig';
import {
  SECTION_OPTIONS,
  MATH_AREA_OPTIONS,
  RW_AREA_OPTIONS,
  AREA_PREVIEW_PHRASES,
  feelingBody,
  examDateIntro,
  scoreScreenCopy,
  worryBody,
  mathAreasBody,
  rwAreasBody,
  studyDaysBody,
  finishPreviewLine,
} from '../innerOnboardingCopy';

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

const optionValues = (qid) => FUNNEL_QUESTIONS.find((q) => q.id === qid).options.map((o) => o.value);

describe('variant coverage over persisted funnel values', () => {
  test('feelingBody covers every feeling; legacy doc falls back to null', () => {
    for (const v of optionValues('feeling')) {
      expect(feelingBody({ feeling: v })).toBeTruthy();
    }
    expect(feelingBody({})).toBeNull();
  });

  test('examDateIntro covers every timing; legacy doc falls back to null', () => {
    for (const v of optionValues('timing')) {
      expect(examDateIntro({ timing: v })).toBeTruthy();
    }
    expect(examDateIntro({})).toBeNull();
  });

  test('scoreScreenCopy covers every baseline; only fresh promotes skip to primary', () => {
    for (const v of optionValues('baseline')) {
      const sc = scoreScreenCopy({ baseline: v });
      expect(sc.title.length).toBeGreaterThan(10);
      expect(sc.body.length).toBeGreaterThan(10);
      expect(typeof sc.skipLabel).toBe('string');
      expect(sc.skipPrimary).toBe(v === 'fresh');
    }
    expect(scoreScreenCopy({})).toBeNull();
  });

  test('worryBody covers every blocker; studyDaysBody covers the anchored windows', () => {
    for (const v of optionValues('blocker')) {
      expect(worryBody({ blocker: v })).toBeTruthy();
    }
    expect(worryBody({})).toBeNull();
    for (const v of ['weekend', 'evening', 'morning']) {
      expect(studyDaysBody({ studyWindow: v })).toBeTruthy();
    }
    // flexible keeps the generic "honest beats ambitious" body on purpose.
    expect(studyDaysBody({ studyWindow: 'flexible' })).toBeNull();
    expect(studyDaysBody({})).toBeNull();
  });

  test('mathAreasBody handles ALL FOUR section worries (incl. timing/strategy bridges) and never restates the title', () => {
    for (const { value } of SECTION_OPTIONS) {
      const line = mathAreasBody(value);
      expect(line).toBeTruthy();
      expect(line).not.toMatch(/which math areas feel shakiest\?/i);
    }
    expect(mathAreasBody(null)).toBeNull();
    expect(rwAreasBody('rw')).toBeTruthy();
    expect(rwAreasBody('math')).toBeNull();
  });
});

describe('voice rules', () => {
  test('no emojis, no em-dashes, budgeted callbacks (screens 0 and 11 only)', () => {
    const all = JSON.stringify({
      s0: optionValues('feeling').map((v) => feelingBody({ feeling: v })),
      s1: optionValues('timing').map((v) => examDateIntro({ timing: v })),
      s2: optionValues('baseline').map((v) => scoreScreenCopy({ baseline: v })),
      s6: optionValues('blocker').map((v) => worryBody({ blocker: v })),
      s7: SECTION_OPTIONS.map(({ value }) => mathAreasBody(value)),
      s8: [rwAreasBody('rw')],
      s9: ['weekend', 'evening', 'morning'].map((v) => studyDaysBody({ studyWindow: v })),
    });
    expect(all).not.toMatch(EMOJI_RE);
    expect(all).not.toMatch(/—/);
    expect(all).not.toContain('undefined');
    // Callback budget: "Earlier you said" lives on screen 0 only; every
    // other screen folds the fact in silently.
    const nonCallbackScreens = JSON.stringify({
      s1: optionValues('timing').map((v) => examDateIntro({ timing: v })),
      s2: optionValues('baseline').map((v) => scoreScreenCopy({ baseline: v })),
      s6: optionValues('blocker').map((v) => worryBody({ blocker: v })),
      s9: ['weekend', 'evening', 'morning'].map((v) => studyDaysBody({ studyWindow: v })),
    });
    expect(nonCallbackScreens).not.toMatch(/you (said|mentioned)/i);
  });
});

describe('finishPreviewLine', () => {
  test('full picks compose days, two named areas, goal, and the test date', () => {
    const line = finishPreviewLine({
      weakMathAreas: ['algebra'],
      weakRWAreas: ['grammar'],
      studyDaysPerWeek: 5,
      goal: 1500,
      testDate: '2027-03-14',
    });
    expect(line).toBe('Your starter plan: 5 days a week, opening with algebra and grammar, aimed at 1500. Test day Mar 14 is on the calendar. The diagnostic on your home screen sharpens it.');
  });

  test('more than two areas collapses to "and more"; clauses omit independently', () => {
    const line = finishPreviewLine({
      weakMathAreas: ['algebra', 'geometry'],
      weakRWAreas: ['vocab'],
      studyDaysPerWeek: null,
      goal: 1400,
      testDate: '',
    });
    expect(line).toContain('opening with algebra, geometry and more');
    expect(line).not.toContain('days a week');
    expect(line).not.toContain('Test day');
  });

  test('a max-skip student gets the honest floor, never a hollow shell', () => {
    const line = finishPreviewLine({ weakMathAreas: [], weakRWAreas: [], studyDaysPerWeek: null, goal: 1400, testDate: '' });
    expect(line).toBe('Your starter plan is ready. The diagnostic fills in whatever you skipped.');
    expect(finishPreviewLine()).toContain('fills in whatever you skipped');
  });

  test('every persisted area value has a preview phrase (schema lockstep)', () => {
    for (const { value } of [...MATH_AREA_OPTIONS, ...RW_AREA_OPTIONS]) {
      expect(AREA_PREVIEW_PHRASES[value]).toBeTruthy();
    }
  });

  test('never prints undefined and never promises reaching a score by a date', () => {
    const line = finishPreviewLine({ weakMathAreas: ['algebra'], weakRWAreas: [], studyDaysPerWeek: 4, goal: 1450, testDate: '2026-11-07' });
    expect(line).not.toContain('undefined');
    expect(line).not.toMatch(/reach|hit|by (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/);
  });
});
