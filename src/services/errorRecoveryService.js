/**
 * Error Recovery Service
 *
 * For each dominant error type (conceptual gap, trap susceptibility,
 * time pressure, procedural error, careless error), provides a structured
 * "recovery drill" definition:  what to practice, how many items,
 * estimated time, and a mapping back into the existing practice/lesson
 * infrastructure so the user gets one-tap access from the diagnostic report.
 */

import { ERROR_TYPES, ERROR_TYPE_ICONS, ERROR_TYPE_COLORS } from './diagnosticEngine';

/**
 * Per-error-type drill blueprints.
 * Each blueprint describes:
 *   strategy   — what the drill actually does
 *   itemCount  — ideal number of questions per session
 *   minutes    — approximate time
 *   sources    — where questions come from (existing modules / sections)
 *   aiTutor    — which AI tutor mode to engage post-drill
 */
const DRILL_BLUEPRINTS = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: {
    label: 'Concept Rebuild',
    icon: ERROR_TYPE_ICONS[ERROR_TYPES.CONCEPTUAL_GAP],
    color: ERROR_TYPE_COLORS[ERROR_TYPES.CONCEPTUAL_GAP],
    strategy: 'Re-teach the underlying concept via the lesson first, then run a focused 5-question easy-difficulty set for the same skill.',
    itemCount: 5,
    minutes: 12,
    steps: [
      { type: 'lesson', description: 'Watch / read the lesson for this skill' },
      { type: 'practice', description: 'Complete 5 easy-level questions', difficulty: 'easy' },
      { type: 'ai_tutor', description: 'Explain the concept in your own words (Teach-Back)', mode: 'teach_back' },
    ],
  },
  [ERROR_TYPES.PROCEDURAL_ERROR]: {
    label: 'Step-by-Step Repair',
    icon: ERROR_TYPE_ICONS[ERROR_TYPES.PROCEDURAL_ERROR],
    color: ERROR_TYPE_COLORS[ERROR_TYPES.PROCEDURAL_ERROR],
    strategy: 'Walk through the exact procedure with guided steps, then repeat with slight variations to lock in the correct sequence.',
    itemCount: 6,
    minutes: 10,
    steps: [
      { type: 'ai_tutor', description: 'AI shows the correct procedure step-by-step', mode: 'mistake_replay' },
      { type: 'practice', description: 'Solve 6 procedurally-similar questions', difficulty: 'medium' },
    ],
  },
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: {
    label: 'Trap Recognition',
    icon: ERROR_TYPE_ICONS[ERROR_TYPES.TRAP_SUSCEPTIBILITY],
    color: ERROR_TYPE_COLORS[ERROR_TYPES.TRAP_SUSCEPTIBILITY],
    strategy: 'Present questions that contain known trap patterns. Before selecting an answer, the student must identify which choice is the trap and why.',
    itemCount: 5,
    minutes: 8,
    steps: [
      { type: 'ai_tutor', description: 'Review the trap taxonomy for this question type', mode: 'hint_ladder' },
      { type: 'practice', description: 'Answer 5 questions — identify the trap before answering', difficulty: 'medium' },
    ],
  },
  [ERROR_TYPES.TIME_PRESSURE]: {
    label: 'Speed Drill',
    icon: ERROR_TYPE_ICONS[ERROR_TYPES.TIME_PRESSURE],
    color: ERROR_TYPE_COLORS[ERROR_TYPES.TIME_PRESSURE],
    strategy: 'Present easy/medium questions under a strict per-question timer to build fluency and reduce rushed errors on test day.',
    itemCount: 8,
    minutes: 8,
    steps: [
      { type: 'timed_drill', description: 'Answer 8 questions with a 60-second timer per question', timePerQuestion: 60 },
      { type: 'ai_tutor', description: 'Debrief — which shortcuts save the most time?', mode: 'exam_strategy' },
    ],
  },
  [ERROR_TYPES.CARELESS_ERROR]: {
    label: 'Precision Check',
    icon: ERROR_TYPE_ICONS[ERROR_TYPES.CARELESS_ERROR],
    color: ERROR_TYPE_COLORS[ERROR_TYPES.CARELESS_ERROR],
    strategy: 'Run a set of easy questions with a mandatory "re-read and verify" step before submitting. Builds the habit of double-checking.',
    itemCount: 6,
    minutes: 6,
    steps: [
      { type: 'practice', description: 'Answer 6 easy questions — re-read each answer before submitting', difficulty: 'easy', requireVerify: true },
    ],
  },
  [ERROR_TYPES.UNANSWERED]: {
    label: 'Time Management',
    icon: ERROR_TYPE_ICONS[ERROR_TYPES.UNANSWERED],
    color: ERROR_TYPE_COLORS[ERROR_TYPES.UNANSWERED],
    strategy: 'Practice strategic guessing and time allocation so no question is left blank on test day.',
    itemCount: 6,
    minutes: 6,
    steps: [
      { type: 'ai_tutor', description: 'Learn the "no blank answers" strategy', mode: 'exam_strategy' },
      { type: 'timed_drill', description: 'Practice rapid elimination under time pressure', timePerQuestion: 45 },
    ],
  },
};

/**
 * Given a diagnostic result, produce an ordered list of recovery drills.
 * The drills are sorted by point-impact descending so the biggest
 * leak gets fixed first.
 *
 * @param {Object} diagnostic — output of diagnosticEngine.runDiagnostic()
 * @returns {Array<Object>} recovery drills, richest first
 */
export const generateRecoveryDrills = (diagnostic) => {
  if (!diagnostic?.errors?.byType) return [];

  const { byType } = diagnostic.errors;
  const drills = [];

  Object.entries(byType).forEach(([errorType, errorData]) => {
    const count = errorData.count || (Array.isArray(errorData.questions) ? errorData.questions.length : 0);
    if (count === 0) return;

    const blueprint = DRILL_BLUEPRINTS[errorType];
    if (!blueprint) return;

    const skills = errorData.topSkills || errorData.skills || [];
    const potentialPoints = errorData.potentialPointGain || count * 10;

    drills.push({
      errorType,
      ...blueprint,
      questionCount: count,
      affectedSkills: skills.slice(0, 5),
      potentialPoints,
      questions: (errorData.questions || []).slice(0, 8),
    });
  });

  drills.sort((a, b) => b.potentialPoints - a.potentialPoints);
  return drills;
};

/**
 * For use from the DiagnosticReport "Fix This" button — maps an
 * error type + skill list into a navigable action the App router
 * can handle.
 */
export const buildDrillAction = (errorType, skills = [], moduleId) => {
  const blueprint = DRILL_BLUEPRINTS[errorType];
  if (!blueprint) return null;

  return {
    type: 'recovery_drill',
    errorType,
    label: blueprint.label,
    steps: blueprint.steps,
    skills,
    moduleId,
    minutes: blueprint.minutes,
  };
};

export { DRILL_BLUEPRINTS };
