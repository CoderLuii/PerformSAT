/**
 * activityDrillRouter.js — shared 3-tier lookup that turns a study-plan
 * activity into an AssignedPracticeShell drill payload.
 *
 * Extracted from StudyPlanDashboard's TodaysTasksCard onStartActivity
 * handler (commit 994933e) so the HOME-dashboard mount of TodaysTasksCard
 * routes through the exact same cascade instead of falling into the legacy
 * `practiceMode: 'prescriptive'` 5-question shell (since removed from
 * App.jsx — every launcher now lands on a dedicated practice shell).
 *
 * The activity's skillId (set by studyPlanGenerator from `gap.skillId`) is
 * more granular than the weakness skillId from the diagnostic engine.
 * E.g. the "Practice: Vertex" activity has skillId='vertex-form', but the
 * matching weakness is "Function Interpretation" with missedPattern
 * 'vertex-form-from-two-conditions'. We try three lookups in order:
 *   (1) cached row by exact skillId,
 *   (2) weakness by exact skillId,
 *   (3) any weakness whose missedPatterns prefix-matches the activity's
 *       skillId — the third is what catches Vertex.
 *
 * BUNDLE NOTE: this module must stay corpus-free (it is imported statically
 * by StudentDashboard, a guarded main-chunk file — see bundleGuard.test.js).
 * Every bank/chip query is INJECTED via `deps`; main-chunk callers load them
 * through data/corpusLoader.js, lazy-chunk callers (StudyPlanDashboard) pass
 * their static imports.
 */

import { getWeaknessSection } from './selectors/weaknesses';

/**
 * Resolve a study-plan activity to a drill route.
 *
 * @param {object} args
 * @param {object} args.activity            plan activity ({ skillId?, skillName?, title?, moduleId?, sectionName? })
 * @param {Array}  [args.weaknesses]        studyPlan.weaknesses (drill-shape)
 * @param {Array}  [args.cachedRows]        pre-resolved skill rows ({ skillId, qIds, ... }) — pass [] when none
 * @param {Array}  [args.answeredQuestionIds] question ids to exclude from the targeted query
 * @param {object} deps                     injected corpus-coupled queries
 * @param {Function} deps.getTargetedWeaknessSet     math bank cascade
 * @param {Function} deps.getQuestionsBySkillIds     math bank skill fallback
 * @param {Function} deps.getRWTargetedWeaknessSet   R&W bank cascade
 * @param {Function} deps.getRWQuestionsBySkillIds   R&W bank skill fallback
 * @param {Function} [deps.getDrillChipForWeakness]  chip gate (restricts math drills to the chip's pattern)
 * @returns {{ kind: 'assigned', questionIds: string[], label: string, weakness: object }
 *         | { kind: 'module', moduleId: string, sectionName: string|undefined }
 *         | null}  null when the activity is unroutable (caller should no-op)
 */
export function resolveActivityDrill(
  { activity, weaknesses = [], cachedRows = [], answeredQuestionIds = [] },
  deps = {},
) {
  if (!activity) return null;

  const moduleRoute = activity.moduleId
    ? { kind: 'module', moduleId: activity.moduleId, sectionName: activity.sectionName }
    : null;

  // No skillId — nothing to look up; fall through to the module path.
  if (!activity.skillId) return moduleRoute;

  const {
    getTargetedWeaknessSet,
    getQuestionsBySkillIds,
    getRWTargetedWeaknessSet,
    getRWQuestionsBySkillIds,
    getDrillChipForWeakness,
  } = deps;
  if (typeof getTargetedWeaknessSet !== 'function' || typeof getQuestionsBySkillIds !== 'function') {
    return moduleRoute;
  }

  // Lookup (1): cached pre-resolved row by exact skillId.
  const cachedRow = (Array.isArray(cachedRows) ? cachedRows : [])
    .find(r => r && r.skillId === activity.skillId);
  // Lookup (2): weakness by exact skillId.
  const exactWeakness = !cachedRow
    ? (Array.isArray(weaknesses) ? weaknesses : []).find(wk => wk && wk.skillId === activity.skillId)
    : null;
  // Lookup (3): scan every weakness's missedPatterns for a slug that
  // prefix-matches the activity's skillId. The first hit gives us a
  // Tier-1-routable pattern for this drill. Keep the matched weakness too —
  // its section/domain tags must survive into the synthetic (dropping them
  // used to send R&W patterns to the math bank).
  let prefixedPattern = null;
  let prefixedWeakness = null;
  if (!cachedRow && !exactWeakness && Array.isArray(weaknesses)) {
    for (const w of weaknesses) {
      if (!w || !Array.isArray(w.missedPatterns)) continue;
      const hit = w.missedPatterns.find(p =>
        p === activity.skillId || (typeof p === 'string' && p.startsWith(activity.skillId + '-'))
      );
      if (hit) { prefixedPattern = hit; prefixedWeakness = w; break; }
    }
  }

  let qIds = Array.isArray(cachedRow?.qIds) && cachedRow.qIds.length > 0 ? cachedRow.qIds : null;
  let weaknessForShell = cachedRow;

  if (!qIds) {
    // The synthetic fallback inherits the best section evidence available:
    // the prefix-matched weakness's own tags first, then the activity's
    // section (drill-shaped plan activities carry one since format v2),
    // defaulting to math last — it used to hardcode math, which dead-ended
    // any R&W activity that outlived its top-8 weakness slot.
    const syntheticSection = prefixedWeakness?.section || activity.section || 'math';
    const baseW = exactWeakness || {
      skillId: activity.skillId,
      skill: activity.skillName || activity.skillId,
      // Real domain unlocks the math bank's Tier-3 domain fallback; the old
      // literal 'math' matched no domain index and dead-ended unknown skills.
      domain: prefixedWeakness?.domain || activity.domain || (syntheticSection === 'rw' ? undefined : 'math'),
      section: syntheticSection,
      // Pattern priority: a prefix-matched weakness pattern, else the
      // activity's own persisted evidence (format v4 carries it).
      missedPatterns: prefixedPattern
        ? [prefixedPattern]
        : (Array.isArray(activity.missedPatterns) && activity.missedPatterns.length > 0
          ? activity.missedPatterns
          : undefined),
    };
    const section = getWeaknessSection(baseW);
    const targetedQuery = section === 'rw' ? getRWTargetedWeaknessSet : getTargetedWeaknessSet;
    const fallbackQuery = section === 'rw' ? getRWQuestionsBySkillIds : getQuestionsBySkillIds;
    if (typeof targetedQuery !== 'function' || typeof fallbackQuery !== 'function') {
      return moduleRoute;
    }
    let mp = Array.isArray(baseW.missedPatterns) ? baseW.missedPatterns : undefined;
    // Chip restriction applies to both sections — getDrillChipForWeakness is
    // section-aware (R&W resolves against RW_PATTERN_LABELS + pool gating),
    // matching the dashboard's own skillPracticeRows behavior.
    if (typeof getDrillChipForWeakness === 'function') {
      const chip = getDrillChipForWeakness(baseW);
      if (chip) mp = [chip.slug];
    }
    let qs = targetedQuery({
      weakSkills: [{ skillId: baseW.skillId, domain: baseW.domain, missedPatterns: mp }],
      count: 15,
      excludeIds: answeredQuestionIds,
    }).filter(q => Array.isArray(q.choices) && q.choices.length >= 2);
    if (qs.length === 0 && Array.isArray(answeredQuestionIds) && answeredQuestionIds.length > 0) {
      // Pool exhausted by the answered-question dedupe — long-tenured
      // accounts can have answered every matching item. Repetition beats a
      // dead button: retry the same cascade without the exclusion.
      qs = targetedQuery({
        weakSkills: [{ skillId: baseW.skillId, domain: baseW.domain, missedPatterns: mp }],
        count: 15,
      }).filter(q => Array.isArray(q.choices) && q.choices.length >= 2);
    }
    if (qs.length === 0) {
      qs = fallbackQuery([baseW.skillId], { limit: 15 })
        .filter(q => Array.isArray(q.choices) && q.choices.length >= 2);
    }
    if (qs.length > 0) {
      qIds = qs.map(q => q.id);
      weaknessForShell = { ...baseW, section };
    }
  }

  if (qIds && qIds.length > 0) {
    return {
      kind: 'assigned',
      questionIds: qIds,
      label: activity.title || (activity.skillName ? `${activity.skillName} Practice` : 'Practice'),
      weakness: weaknessForShell,
    };
  }

  // Last-resort fallback. Both targeted and skill-id lookups came up empty —
  // hand back the legacy module/section route so the user at least lands
  // SOMEWHERE rather than a dead button.
  return moduleRoute;
}

/**
 * Best-effort weakness for a MODULE-routed plan card (legacy activities that
 * carry only moduleId/sectionName, no skillId). The prescriptive launcher used
 * to hard-code `weakness: null`, so the drill's diagnostic sentence never
 * rendered on those cards. Match conservatively — a sentence about the wrong
 * skill is worse than none: exact skillId first, then a weakness whose
 * `modules` / `sections` name this module.
 *
 * @param {object} activity   plan activity ({ skillId?, moduleId? })
 * @param {Array}  weaknesses studyPlan.weaknesses (drill-shape)
 * @returns {object|null}     the matching weakness, or null
 */
export function pickModuleWeakness(activity, weaknesses = []) {
  if (!activity || !Array.isArray(weaknesses) || weaknesses.length === 0) return null;
  if (activity.skillId) {
    const exact = weaknesses.find(w => w && w.skillId === activity.skillId);
    if (exact) return exact;
  }
  if (!activity.moduleId) return null;
  return weaknesses.find(w => w && (
    (Array.isArray(w.modules) && w.modules.includes(activity.moduleId))
    || (Array.isArray(w.sections) && w.sections.includes(activity.moduleId))
  )) || null;
}
