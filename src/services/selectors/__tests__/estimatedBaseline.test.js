/**
 * Pins the Diagnostic v2 baseline display rule: the diagnostic's estimated
 * band fills the dashboard starting-score slot ONLY while no scoreable
 * full-test attempt exists; any real test score makes it disappear.
 */
import { getEstimatedBaseline, getTrustedBandMidpoint } from '../estimatedBaseline';

const BAND = {
  low: 980, high: 1060,
  rwBand: { low: 490, high: 550 },
  mathBand: { low: 460, high: 520 },
};

describe('getEstimatedBaseline', () => {
  test('a focus-weighted (check-in) band never anchors the baseline', () => {
    // Review finding: the check-in over-samples weaknesses — presenting its
    // band as the starting score reads as "studying made me worse".
    expect(getEstimatedBaseline({ scoreBand: BAND, scoreBandFocusWeighted: true }, {})).toBeNull();
  });

  test('returns the band with a grid-snapped midpoint when no tests exist', () => {
    const out = getEstimatedBaseline({ scoreBand: BAND }, {});
    expect(out).toEqual({
      low: 980, high: 1060, mid: 1020,
      rwBand: BAND.rwBand, mathBand: BAND.mathBand,
    });
  });

  test('null when any test row has a scoreable attempt (full tests outrank)', () => {
    const results = {
      'practice-test-1': { attempts: [{ scaledScore: 1100, isMultiSection: true }] },
    };
    expect(getEstimatedBaseline({ scoreBand: BAND }, results)).toBeNull();
  });

  test('null on legacy aggregate-only rows with a stored best score', () => {
    const results = { 'practice-test-2': { bestScaledScore: 620 } };
    expect(getEstimatedBaseline({ scoreBand: BAND }, results)).toBeNull();
  });

  test('a BLANK real-test attempt (floor score, nothing answered) does NOT suppress the estimate', () => {
    // Review finding: blank submissions persist a numeric floor scaledScore;
    // counting them as "real scores" hid the estimate AND the score hero —
    // no hero at all, the exact gap this feature fills.
    const results = {
      'practice-test-1': { attempts: [{ scaledScore: 400, isMultiSection: true, answeredCount: 0, rawScore: 0 }] },
    };
    expect(getEstimatedBaseline({ scoreBand: BAND }, results)).not.toBeNull();
  });

  test('junk rows (no finite score anywhere) do NOT suppress the estimate', () => {
    const results = {
      'practice-test-3': { attempts: [{ scaledScore: null }, { scaledScore: undefined }] },
    };
    expect(getEstimatedBaseline({ scoreBand: BAND }, results)).not.toBeNull();
  });

  test('null without a stored diagnostic band', () => {
    expect(getEstimatedBaseline(null, {})).toBeNull();
    expect(getEstimatedBaseline({}, {})).toBeNull();
    expect(getEstimatedBaseline({ scoreBand: { low: NaN, high: 1000 } }, {})).toBeNull();
  });

  test('handles missing practiceTestResults map', () => {
    expect(getEstimatedBaseline({ scoreBand: BAND }, null)).not.toBeNull();
  });
});

describe('getTrustedBandMidpoint (check-in plan anchor)', () => {
  test('representative band yields its snapped midpoint', () => {
    expect(getTrustedBandMidpoint({ scoreBand: BAND })).toBe(1020);
  });

  test('focus-weighted band is never trusted', () => {
    expect(getTrustedBandMidpoint({ scoreBand: BAND, scoreBandFocusWeighted: true })).toBeNull();
  });

  test('null without a usable band', () => {
    expect(getTrustedBandMidpoint(null)).toBeNull();
    expect(getTrustedBandMidpoint({})).toBeNull();
    expect(getTrustedBandMidpoint({ scoreBand: { low: NaN, high: 1000 } })).toBeNull();
  });
});
