import { pickMostRecentTest } from './recentTest';

/**
 * recentMisses.js — "Questions you struggled with" (made-for-me item 16).
 *
 * Pulls up to three wrong answers from the most recent attempt's
 * diagnosticData.questionDetails (the per-question telemetry kept on the
 * LATEST attempt only — see practiceTestService trimAttempts). Each miss
 * carries enough to label the row (skills, difficulty) and a `question`
 * object suitable for pickSimilarQuestion's retry flow.
 *
 * Stems are resolved from the local test bundle by position — but adaptive
 * routing can swap Module 2 for its easy variant, so a positional lookup can
 * land on a question the student never saw. Two guards make resolution
 * self-validating:
 *   1. The served modules are reconstructed from attempt.routeTaken
 *      (mirroring PracticeTest's effectiveModules swap).
 *   2. The resolved question's skills must equal the skills recorded at
 *      submission time; any drift drops the stem (label-only row) rather
 *      than showing a stem the student never faced.
 *
 * Misses are ranked hardest-first (difficulty desc, then time spent desc) —
 * the question you fought longest and lost is the one worth retrying.
 */

const DIFFICULTY_RANK = { hard: 3, medium: 2, easy: 1 };

function sameSkills(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  return a.every((s, i) => s === b[i]);
}

/** Mirror PracticeTest's effectiveModules: swap in each section's easy variant on its easy route. */
export function reconstructServedModules(bundle, routeTaken, rwRoute) {
  if (!bundle || !Array.isArray(bundle.modules)) return null;
  let replaced = bundle.modules;
  if (routeTaken === 'easy' && bundle.module2Easy) {
    const mathM2Index = bundle.modules.length - 1; // math M2 is always the final module
    const slot = bundle.modules[mathM2Index];
    replaced = [...replaced];
    replaced[mathM2Index] = { ...slot, ...bundle.module2Easy, title: slot.title, section: slot.section };
  }
  if (rwRoute === 'easy' && bundle.rwModule2Easy) {
    const rwSlots = bundle.modules
      .map((m, i) => (m.section === 'reading-writing' ? i : -1))
      .filter(i => i >= 0);
    if (rwSlots.length > 1) {
      const slot = bundle.modules[rwSlots[1]];
      replaced = replaced === bundle.modules ? [...replaced] : replaced;
      replaced[rwSlots[1]] = { ...slot, ...bundle.rwModule2Easy, title: slot.title, section: slot.section };
    }
  }
  return replaced;
}

/**
 * Extract up to `limit` misses from the most recent test attempt.
 *
 * @param {Object<string, object>} practiceTestResults
 * @param {object} [opts]
 * @param {(testId: string) => object|null} [opts.resolveTest] - bundle lookup
 *   (inject getPracticeTestById; kept out of the selector so it stays pure
 *   and the heavy test-bundle import stays out of the module graph here)
 * @param {number} [opts.limit]
 * @returns {Array<{ key: string, skills: string[], difficulty: string|null,
 *   timeSpent: number|null, stem: string|null, question: object }>}
 */
export function getRecentMisses(practiceTestResults, { resolveTest = null, limit = 3 } = {}) {
  const { testId, lastAttempt } = pickMostRecentTest(practiceTestResults);
  const details = lastAttempt?.diagnosticData?.questionDetails;
  if (!testId || !details || typeof details !== 'object') return [];

  const bundle = typeof resolveTest === 'function' ? (resolveTest(testId) || null) : null;
  const modules = reconstructServedModules(bundle, lastAttempt?.routeTaken, lastAttempt?.diagnosticData?.rwRoute);

  return Object.entries(details)
    .filter(([, d]) => d && d.isCorrect === false)
    .map(([key, d]) => {
      const [modIdx, qIdx] = key.split('-').map(Number);
      const mod = modules?.[modIdx];
      const resolved = mod?.questions?.[qIdx];
      const recordedSkills = Array.isArray(d.skills) ? d.skills.filter(Boolean) : [];
      // Trust the positional lookup only when its skills agree with what the
      // attempt recorded — variant drift means a different question.
      const trusted = !!resolved && sameSkills(resolved.skills || [], recordedSkills);
      const section = mod?.section === 'reading-writing' ? 'rw' : 'math';
      return {
        key,
        skills: recordedSkills,
        difficulty: d.difficulty || null,
        timeSpent: typeof d.timeSpent === 'number' ? d.timeSpent : null,
        stem: trusted ? (resolved.question || null) : null,
        question: trusted
          ? { ...resolved, section }
          : { skills: recordedSkills, section },
      };
    })
    .sort((a, b) =>
      (DIFFICULTY_RANK[b.difficulty] || 0) - (DIFFICULTY_RANK[a.difficulty] || 0)
      || (b.timeSpent || 0) - (a.timeSpent || 0))
    .slice(0, limit);
}
