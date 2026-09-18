/**
 * pointLevers.js — the three home tiles, priced in points.
 *
 * "83% accuracy · R&W 95% · Math 70%" tells a student nothing they can act
 * on (founder, 2026-08-22). These tiles instead name AREAS (CB content
 * domains) and price them:
 *   - lever     — the domain with the most points on the table (orange)
 *   - next      — the runner-up (purple)
 *   - lockedIn  — the strongest domain (green; perfect domains first, the
 *                 largest sample wins ties; "also …" lists the other perfect ones)
 *
 * Points model (honest, and it sums): per section, the headroom to 800
 * (800 − the section's current center) is spread evenly over that section's
 * missed questions, so each domain's points = its misses × headroom-per-miss.
 * Every number is an estimate — render it with "~". A section with no misses
 * has no headroom to distribute.
 *
 * Two adapters feed the same builder so the tiles mean the same thing before
 * and after the first real test:
 *   - pointLeversFromDiagnostic(record)  — record.domains + band centers
 *   - pointLeversFromLatestTest(results, { resolveTest }) — the latest
 *     attempt's per-question questionDetails joined to the served bundle
 *     (route-aware) for each question's domain + sectionScores as centers.
 *
 * Pure: no Firebase, no React.
 */

import { CB_MATH_DOMAIN_LABELS, CB_RW_DOMAIN_LABELS } from '../../data/questions/cbSkillTaxonomy';
import { pickMostRecentTest } from './recentTest';
import { reconstructServedModules } from './recentMisses';

const DOMAIN_LABELS = { ...CB_MATH_DOMAIN_LABELS, ...CB_RW_DOMAIN_LABELS };
const SECTION_MAX = 800;

const labelFor = (slug) => DOMAIN_LABELS[slug]
  || String(slug || '').split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');

const round5 = (n) => Math.round(n / 5) * 5;

const EMPTY = { hasData: false, lever: null, next: null, lockedIn: null, domains: [] };

/**
 * Build the three tiles from per-domain counts + per-section score centers.
 *
 * @param {object} args
 * @param {{math?: Object<string,{correct:number,total:number}>, rw?: Object<string,{correct:number,total:number}>}} args.domains
 * @param {{math?: number|null, rw?: number|null}} args.sectionCenters - 200–800 section centers
 * @returns {{hasData:boolean, lever:object|null, next:object|null, lockedIn:object|null, domains:object[]}}
 */
export function buildPointLevers({ domains = {}, sectionCenters = {} } = {}) {
  const rows = [];
  ['math', 'rw'].forEach((section) => {
    const byDomain = domains?.[section];
    if (!byDomain || typeof byDomain !== 'object') return;
    const entries = Object.entries(byDomain)
      .map(([slug, v]) => ({
        slug,
        section,
        label: labelFor(slug),
        correct: Number.isFinite(v?.correct) ? Math.max(0, v.correct) : 0,
        total: Number.isFinite(v?.total) ? Math.max(0, v.total) : 0,
      }))
      .filter((d) => d.total > 0);
    if (entries.length === 0) return;
    const misses = entries.reduce((s, d) => s + Math.max(0, d.total - d.correct), 0);
    const center = sectionCenters?.[section];
    const headroom = Number.isFinite(center) ? Math.max(0, SECTION_MAX - center) : null;
    const perMiss = misses > 0 && headroom !== null ? headroom / misses : 0;
    entries.forEach((d) => {
      const dMisses = Math.max(0, d.total - d.correct);
      rows.push({
        ...d,
        misses: dMisses,
        accuracy: Math.round((d.correct / d.total) * 100),
        points: headroom === null ? null : round5(dMisses * perMiss),
      });
    });
  });
  if (rows.length === 0) return EMPTY;

  // Levers: most points first; ties → lower accuracy, then larger sample.
  const levers = rows
    .filter((d) => d.misses > 0)
    .sort((a, b) => ((b.points ?? 0) - (a.points ?? 0)) || (a.accuracy - b.accuracy) || (b.total - a.total));
  const lever = levers[0] || null;
  const next = levers[1] || null;

  // Locked in: perfect domains first (largest sample wins), else the most accurate.
  const perfect = rows.filter((d) => d.misses === 0).sort((a, b) => b.total - a.total);
  let lockedIn = null;
  if (perfect.length > 0) {
    lockedIn = { ...perfect[0], perfect: true, also: perfect.slice(1).map((d) => d.label) };
  } else {
    const best = [...rows].sort((a, b) => (b.accuracy - a.accuracy) || (b.total - a.total))[0];
    lockedIn = best ? { ...best, perfect: false, also: [] } : null;
  }
  return { hasData: true, lever, next, lockedIn, domains: rows };
}

const bandMid = (band) => (band && Number.isFinite(band.low) && Number.isFinite(band.high)
  ? Math.round((band.low + band.high) / 2)
  : null);

/**
 * Diagnostic adapter. Representative (full / v1) records only — a check-in's
 * items are focus-weighted, so its domain counts are not a picture of the
 * student.
 *
 * @param {object|null} miniDiagnostic - progress.miniDiagnostic record
 * @returns {ReturnType<typeof buildPointLevers> & {source?: 'diagnostic'}}
 */
export function pointLeversFromDiagnostic(miniDiagnostic) {
  if (!miniDiagnostic?.domains) return EMPTY;
  if ((miniDiagnostic.diagnosticVariant || 'full') === 'checkin') return EMPTY;
  const out = buildPointLevers({
    domains: miniDiagnostic.domains,
    sectionCenters: {
      math: bandMid(miniDiagnostic.scoreBand?.mathBand),
      rw: bandMid(miniDiagnostic.scoreBand?.rwBand),
    },
  });
  return out.hasData ? { ...out, source: 'diagnostic' } : EMPTY;
}

/**
 * Latest-test adapter: per-question correctness (attempt.diagnosticData
 * .questionDetails, keyed `${modIdx}-${qIdx}`) joined to the served bundle
 * (Module-2 routing honoured) for each question's domain; section centers
 * from attempt.sectionScores. Returns EMPTY until the bundle resolves or when
 * the attempt predates per-question details.
 *
 * @param {object} practiceTestResults
 * @param {{resolveTest?: (testId:string)=>object|null}} [opts]
 */
export function pointLeversFromLatestTest(practiceTestResults, { resolveTest = null } = {}) {
  const { testId, lastAttempt } = pickMostRecentTest(practiceTestResults || {});
  const details = lastAttempt?.diagnosticData?.questionDetails;
  if (!testId || !details || typeof details !== 'object') return EMPTY;
  const bundle = typeof resolveTest === 'function' ? (resolveTest(testId) || null) : null;
  const modules = reconstructServedModules(bundle, lastAttempt?.routeTaken, lastAttempt?.diagnosticData?.rwRoute);
  if (!modules) return EMPTY;
  const domains = { math: {}, rw: {} };
  let joined = 0;
  Object.entries(details).forEach(([key, d]) => {
    if (!d || typeof d.isCorrect !== 'boolean') return;
    const [modIdx, qIdx] = key.split('-').map(Number);
    const mod = modules[modIdx];
    const q = mod?.questions?.[qIdx];
    if (!q?.domain) return;
    const section = mod.section === 'reading-writing' ? 'rw' : 'math';
    const slot = domains[section][q.domain] || (domains[section][q.domain] = { correct: 0, total: 0 });
    slot.total += 1;
    if (d.isCorrect) slot.correct += 1;
    joined += 1;
  });
  if (joined === 0) return EMPTY;
  const ss = lastAttempt.sectionScores || {};
  const out = buildPointLevers({
    domains,
    sectionCenters: {
      math: Number.isFinite(ss.math) ? ss.math : null,
      rw: Number.isFinite(ss['reading-writing']) ? ss['reading-writing'] : (Number.isFinite(ss.rw) ? ss.rw : null),
    },
  });
  return out.hasData ? { ...out, source: 'test' } : EMPTY;
}
