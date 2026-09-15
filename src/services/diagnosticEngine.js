/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DIAGNOSTIC ENGINE — The Brain of PerformSAT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This is the core analytical engine that transforms raw practice test results
 * into deep, actionable diagnostic intelligence.
 *
 * What it does:
 * 1. CLASSIFIES every wrong answer by WHY it was wrong (not just that it was)
 * 2. IDENTIFIES error patterns across the full test
 * 3. MAPS weaknesses to specific skills and SAT domains
 * 4. PROJECTS score improvements if specific skills are fixed
 * 5. COMPARES across multiple test attempts to track real improvement
 * 6. PRIORITIZES the highest-ROI fixes (what gives the most points fastest)
 *
 * The philosophy: A student who gets 15 questions wrong needs to know
 * "you fell for 4 trap answers, had 3 conceptual gaps in algebra, made
 * 2 careless errors, and ran out of time on 6 questions" — NOT just
 * "you scored 640."
 */

import { convertToSATScore, scaleResponseVector, getItemParams, isAnswerCorrect, estimatePercentile as _estimatePercentile, inferDomain } from './scoring';
import { isCompositeScaleTarget, DEFAULT_GOAL_SCORE } from './selectors/goalProgress';

import { getSkillById, skillTaxonomy } from '../data/skillTaxonomy';
// Pure-constant imports (Stage 2a bundle split): pulled from aliases.js /
// taxonomy.js so this engine stays corpus-free — importing the bank/rwBank
// indexes would weld both question corpora into every chunk that needs
// diagnostics (App.jsx imports runDiagnostic eagerly).
import { RW_CANONICAL_SKILLS, RW_DOMAINS } from '../data/questions/rwBank/taxonomy';
import { deriveRWPattern } from '../data/questions/rwBank/deriveRWPattern';
import { extractSatPattern } from '../data/questions/extractSatPattern';
import { getCBSkillLabel } from '../data/questions/cbSkillTaxonomy';
import { formatPatternLabel } from './selectors/missedPatternLabel';
// Zero-import selector (bundleGuard-safe) — the single source of truth for
// what counts as a blank/abandoned attempt.
import { isBlankAttempt } from './selectors/latestTestStats';
import { sectionModuleLabel } from './selectors/moduleLabel';

// R&W canonical skills as a Set for O(1) membership checks. Used to tag
// weakness entries with `section: 'rw'` and to infer domain when the math
// `getSkillById` taxonomy lookup misses.
const RW_SKILL_SET = new Set(RW_CANONICAL_SKILLS);
const RW_DOMAIN_SET = new Set(RW_DOMAINS);

// Skill → domain for R&W (mirror of rwBank's RW_SKILL_TO_DOMAIN — kept inline
// here so the engine doesn't depend on a non-exported constant).
const RW_SKILL_TO_DOMAIN = {
  'central-ideas-and-details':         'information-and-ideas',
  'inferences':                        'information-and-ideas',
  'command-of-evidence-textual':       'information-and-ideas',
  'command-of-evidence-quantitative':  'information-and-ideas',
  'words-in-context':                  'craft-and-structure',
  'text-structure-and-purpose':        'craft-and-structure',
  'cross-text-connections':            'craft-and-structure',
  'boundaries':                        'standard-english-conventions',
  'form-structure-and-sense':          'standard-english-conventions',
  'transitions':                       'expression-of-ideas',
  'rhetorical-synthesis':              'expression-of-ideas',
};

// Display names for R&W domains. skillTaxonomy.domains only covers the four
// math domains, so without this the raw slug ('craft-and-structure') leaks
// into domainAnalysis.displayName and scoreProjection.domainName.
const RW_DOMAIN_DISPLAY_NAMES = {
  'information-and-ideas':         'Information and Ideas',
  'craft-and-structure':           'Craft and Structure',
  'standard-english-conventions':  'Standard English Conventions',
  'expression-of-ideas':           'Expression of Ideas',
};

/**
 * Read a question's skills as an array, regardless of source shape.
 *
 * Math test bundles emit `q.skills: string[]` (array form, the canonical bank
 * shape). R&W test bundles emit `q.skill: string` (singular). Both feed into
 * `analyzeSkills` and `analyzeDomains`; this helper normalizes them so a
 * single iteration handles both sources.
 *
 * Exported: PracticeTest.jsx uses the same normalizer when persisting
 * questionDetails / questionsSnapshot and when recording skill attempts, so
 * R&W items carry their skills everywhere a math item would.
 *
 * @param {Object} q - a test-bundle or bank question
 * @returns {string[]} skill ids (empty array when the question carries none)
 */
const getQuestionSkills = (q) => {
  if (Array.isArray(q?.skills)) return q.skills;
  if (typeof q?.skill === 'string' && q.skill) return [q.skill];
  return [];
};

/**
 * Infer a question's SAT domain from its (normalized) skill id array,
 * section-aware. R&W skills resolve through RW_SKILL_TO_DOMAIN
 * (craft-and-structure etc.); everything else goes through the shared math
 * inferDomain (taxonomy lookup + label map + regex, 'algebra' fallback) —
 * byte-identical to the pre-R&W behavior for math inputs.
 *
 * Use this anywhere a per-question domain is derived inside the engine so
 * R&W items never pollute the four math domains.
 *
 * @param {string[]} skillIds - normalized skill ids (see getQuestionSkills)
 * @returns {string} a math domain id or an R&W domain id
 */
const inferQuestionDomain = (skillIds) => {
  for (const skillId of skillIds || []) {
    if (RW_SKILL_SET.has(skillId)) return RW_SKILL_TO_DOMAIN[skillId];
  }
  return inferDomain(skillIds);
};

/**
 * Convert a raw skill ID (which may be an alias like "mean-median-mode")
 * into a human-readable display name.
 */
const humanizeSkillId = (id) => {
  // Try taxonomy first
  const skill = getSkillById(id);
  if (skill?.name) return skill.name;
  // Canonical CB display name (both sections) — keeps official punctuation
  // ("Form, Structure, and Sense"), which naive de-slugging loses.
  const cbLabel = getCBSkillLabel(id);
  if (cbLabel) return cbLabel;
  // Last resort: polished de-slug (small words stay lowercase).
  return formatPatternLabel(id) || id;
};

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

// SAT domain weights (% of the test each domain represents)
const DOMAIN_WEIGHTS = {
  'algebra': 0.35,
  'problem-solving': 0.25,
  'advanced-math': 0.25,
  'geometry': 0.15,
};

// Approximate number of questions per domain on a 44-question test
const DOMAIN_QUESTION_COUNTS = {
  'algebra': 15,
  'problem-solving': 11,
  'advanced-math': 11,
  'geometry': 7,
};

// Time thresholds (seconds) for classifying time-related issues
const TIME_THRESHOLDS = {
  rushed: 30,            // Under 30s = probably rushing
  fast: 60,              // Under 60s = fast for medium/hard
  normal: 120,           // Under 2 min = normal pace
  slow: 180,             // Over 3 min = slow
  verySlowEasy: 90,      // Over 90s on an easy question
  verySlowMedium: 150,   // Over 2.5 min on medium
  verySlowHard: 210,     // Over 3.5 min on hard
};

// Error type definitions
const ERROR_TYPES = {
  CONCEPTUAL_GAP: 'conceptual_gap',
  PROCEDURAL_ERROR: 'procedural_error',
  TRAP_SUSCEPTIBILITY: 'trap_susceptibility',
  TIME_PRESSURE: 'time_pressure',
  CARELESS_ERROR: 'careless_error',
  UNANSWERED: 'unanswered',
};

// How much a miss of each error class counts toward flagging a CONCEPT gap
// (analyzeSkills.gapEvidence). Careless/rushed misses are real problems but
// not knowledge problems — they route to precision/pacing strategy work, not
// multi-week skill rebuilds.
const GAP_ERROR_WEIGHT = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: 1.0,
  [ERROR_TYPES.PROCEDURAL_ERROR]: 1.0,
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: 0.7,
  [ERROR_TYPES.CARELESS_ERROR]: 0.35,
  [ERROR_TYPES.TIME_PRESSURE]: 0.25,
  [ERROR_TYPES.UNANSWERED]: 0,
};

// Missing an EASY item is stronger evidence of a real gap than missing a hard
// one — this also softens the adaptive-route pooling problem (easy-route M2
// students meet easier items; their misses on them still register fully).
const GAP_DIFFICULTY_WEIGHT = { easy: 1.25, medium: 1.0, hard: 0.75 };

// Human-readable labels for error types
const ERROR_TYPE_LABELS = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: 'Conceptual Gap',
  [ERROR_TYPES.PROCEDURAL_ERROR]: 'Procedural Error',
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: 'Trap Answer',
  [ERROR_TYPES.TIME_PRESSURE]: 'Time Pressure',
  [ERROR_TYPES.CARELESS_ERROR]: 'Careless Mistake',
  [ERROR_TYPES.UNANSWERED]: 'Unanswered',
};

const ERROR_TYPE_DESCRIPTIONS = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: "You didn't understand the underlying concept needed to solve this",
  [ERROR_TYPES.PROCEDURAL_ERROR]: 'You understood the concept but made a mistake in the steps',
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: 'You chose an answer designed by College Board to catch a specific mistake',
  [ERROR_TYPES.TIME_PRESSURE]: 'You rushed or ran out of time on this question',
  [ERROR_TYPES.CARELESS_ERROR]: "You know this material — this was a slip-up, not a knowledge gap",
  [ERROR_TYPES.UNANSWERED]: "You didn't answer this question",
};

// No-emoji rule (project-wide hard rule): these were emoji glyphs leaking
// into DiagnosticReport, PastTestReview, and errorRecoveryService labels.
// Values are intentionally empty strings — string interpolations drop the
// icon cleanly and `|| '•'` fallbacks render a typographic bullet. Per-
// surface SVG icons are the eventual replacement (deferred sweep).
const ERROR_TYPE_ICONS = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: '',
  [ERROR_TYPES.PROCEDURAL_ERROR]: '',
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: '',
  [ERROR_TYPES.TIME_PRESSURE]: '',
  [ERROR_TYPES.CARELESS_ERROR]: '',
  [ERROR_TYPES.UNANSWERED]: '',
};

const ERROR_TYPE_COLORS = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: '#dc2626',      // Red — most serious
  [ERROR_TYPES.PROCEDURAL_ERROR]: '#f59e0b',     // Amber
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: '#7c3aed',  // Purple
  [ERROR_TYPES.TIME_PRESSURE]: '#2563eb',        // Blue
  [ERROR_TYPES.CARELESS_ERROR]: '#ea580c',        // Orange
  [ERROR_TYPES.UNANSWERED]: '#6b7280',           // Gray
};

// ═══════════════════════════════════════════════════════════════════════════
// ERROR CLASSIFICATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Classifies WHY a student got a question wrong.
 * This is the most important function in the entire system.
 *
 * Inputs:
 * - question: the question object (skills, difficulty, choices, correctAnswer)
 * - userAnswer: what the student answered
 * - telemetry: time spent, visits, answer changes, calculator usage
 * - skillProgress: the student's historical mastery of the skills tested
 *
 * Returns: { errorType, confidence, reasoning }
 */
const classifyError = (question, userAnswer, telemetry, skillProgress) => {
  const { difficulty } = question;
  // Normalize math (skills: array) and R&W (skill: string) shapes so R&W
  // misses classify against their real in-test mastery seed instead of the
  // default-50 fallback that calculateAvgSkillMastery returns for [].
  const skills = getQuestionSkills(question);
  const { timeSpent = 0, answerChanges = 0 } = telemetry || {};

  // ── UNANSWERED ──
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    // Was it at the end of the test (time ran out)?
    if (timeSpent < 5) {
      return {
        errorType: ERROR_TYPES.TIME_PRESSURE,
        confidence: 0.95,
        reasoning: 'No answer submitted — likely ran out of time',
      };
    }
    return {
      errorType: ERROR_TYPES.UNANSWERED,
      confidence: 0.90,
      reasoning: 'Question was left blank',
    };
  }

  // ── Check if student has strong mastery of the tested skills ──
  const avgSkillMastery = calculateAvgSkillMastery(skills, skillProgress);
  const hasStrongMastery = avgSkillMastery >= 75;
  const hasWeakMastery = avgSkillMastery < 40;
  const hasSomeMastery = avgSkillMastery >= 40 && avgSkillMastery < 75;

  // ── TIME PRESSURE DETECTION ──
  // Fast + wrong on medium/hard = rushing
  if (timeSpent < TIME_THRESHOLDS.rushed && difficulty !== 'easy') {
    return {
      errorType: ERROR_TYPES.TIME_PRESSURE,
      confidence: 0.85,
      reasoning: `Spent only ${Math.round(timeSpent)}s on a ${difficulty} question — likely rushing`,
    };
  }

  // Very fast on easy + wrong + strong mastery = rushing
  if (timeSpent < 15 && difficulty === 'easy' && hasStrongMastery) {
    return {
      errorType: ERROR_TYPES.CARELESS_ERROR,
      confidence: 0.80,
      reasoning: `Rushed through an easy question (${Math.round(timeSpent)}s) despite strong skill mastery`,
    };
  }

  // ── TRAP SUSCEPTIBILITY DETECTION ──
  // Check if the student's wrong answer matches a common trap pattern
  const trapAnalysis = detectTrapAnswer(question, userAnswer);
  if (trapAnalysis.isTrap) {
    return {
      errorType: ERROR_TYPES.TRAP_SUSCEPTIBILITY,
      confidence: trapAnalysis.confidence,
      reasoning: trapAnalysis.reasoning,
    };
  }

  // ── CARELESS ERROR DETECTION ──
  // Strong mastery + reasonable time + changed answer = careless
  if (hasStrongMastery && answerChanges > 0 && timeSpent > TIME_THRESHOLDS.rushed) {
    return {
      errorType: ERROR_TYPES.CARELESS_ERROR,
      confidence: 0.75,
      reasoning: 'Strong skill mastery but changed answer — second-guessed correct instinct',
    };
  }

  // Strong mastery + wrong on easy question
  if (hasStrongMastery && difficulty === 'easy') {
    return {
      errorType: ERROR_TYPES.CARELESS_ERROR,
      confidence: 0.80,
      reasoning: 'Strong mastery of this skill — likely a careless mistake on an easy question',
    };
  }

  // Some mastery + wrong on easy = careless
  if (hasSomeMastery && difficulty === 'easy' && timeSpent > TIME_THRESHOLDS.rushed) {
    return {
      errorType: ERROR_TYPES.CARELESS_ERROR,
      confidence: 0.65,
      reasoning: 'Moderate mastery and adequate time — likely a careless slip',
    };
  }

  // ── PROCEDURAL ERROR DETECTION ──
  // Some mastery + wrong on medium = procedural
  if (hasSomeMastery && difficulty === 'medium') {
    return {
      errorType: ERROR_TYPES.PROCEDURAL_ERROR,
      confidence: 0.70,
      reasoning: 'Understands the concept (moderate mastery) but made a mistake in execution',
    };
  }

  // Strong mastery + wrong on hard = procedural (knew concept but hard execution)
  if (hasStrongMastery && difficulty === 'hard') {
    return {
      errorType: ERROR_TYPES.PROCEDURAL_ERROR,
      confidence: 0.75,
      reasoning: 'Strong fundamentals but struggled with complex application',
    };
  }

  // Spent a long time but still wrong = understood what to do, struggled with execution
  if (hasSomeMastery && timeSpent > TIME_THRESHOLDS.normal) {
    return {
      errorType: ERROR_TYPES.PROCEDURAL_ERROR,
      confidence: 0.65,
      reasoning: 'Spent significant time working through it — knows the approach but made a procedural error',
    };
  }

  // ── CONCEPTUAL GAP (default for weak mastery) ──
  if (hasWeakMastery) {
    return {
      errorType: ERROR_TYPES.CONCEPTUAL_GAP,
      confidence: 0.85,
      reasoning: 'Low mastery of the tested skill(s) — needs to learn the underlying concept',
    };
  }

  // ── FALLBACK CLASSIFICATION ──
  // No strong signal — use difficulty as tiebreaker
  if (difficulty === 'hard') {
    return {
      errorType: ERROR_TYPES.CONCEPTUAL_GAP,
      confidence: 0.55,
      reasoning: 'Missed a hard question — may need to strengthen foundational understanding',
    };
  }

  return {
    errorType: ERROR_TYPES.PROCEDURAL_ERROR,
    confidence: 0.50,
    reasoning: 'Incorrect answer with no strong signal — likely a procedural or partial understanding gap',
  };
};

/**
 * Detects if a wrong answer matches a known College Board trap pattern.
 * Analyzes the relationship between the wrong answer chosen and the correct answer.
 */
const detectTrapAnswer = (question, userAnswer) => {
  const { choices, correctAnswer, type, skills = [], explanation = '' } = question;

  // ── Fill-in question analysis ──
  // For fill-in, we can detect patterns by comparing the numeric relationship
  if (type === 'fill-in') {
    const correctNum = typeof correctAnswer === 'number' ? correctAnswer : parseFloat(correctAnswer);
    const userNum = typeof userAnswer === 'number' ? userAnswer : parseFloat(userAnswer);

    if (!isNaN(correctNum) && !isNaN(userNum) && correctNum !== 0) {
      const ratio = userNum / correctNum;
      const diff = Math.abs(userNum - correctNum);

      // Student answered exactly half or double = partial calculation or missed step
      if (Math.abs(ratio - 0.5) < 0.01 || Math.abs(ratio - 2) < 0.01) {
        return {
          isTrap: true,
          trapType: 'partial_calculation',
          confidence: 0.80,
          reasoning: ratio < 1
            ? 'Your answer is exactly half the correct value — likely stopped one step early'
            : 'Your answer is double the correct value — likely applied an operation twice',
        };
      }

      // Sign error: correct magnitude, wrong sign
      if (Math.abs(userNum + correctNum) < 0.01 * Math.abs(correctNum)) {
        return {
          isTrap: true,
          trapType: 'sign_error',
          confidence: 0.85,
          reasoning: 'Correct magnitude but wrong sign — check for a dropped negative',
        };
      }

      // Off by one = classic counting or boundary error
      if (diff === 1 && Math.abs(correctNum) > 1) {
        return {
          isTrap: true,
          trapType: 'off_by_one',
          confidence: 0.70,
          reasoning: 'Off by exactly 1 — likely a fencepost or boundary error',
        };
      }

      // Very close (within 10%) = likely arithmetic slip
      if (diff / Math.abs(correctNum) < 0.10 && diff > 0.01) {
        return {
          isTrap: true,
          trapType: 'arithmetic_slip',
          confidence: 0.60,
          reasoning: `Answer is very close to correct (off by ${diff.toFixed(2)}) — likely an arithmetic mistake`,
        };
      }

      // Student answered a factor that appears in the problem (e.g., answered "3" when correct is "9" for 3²)
      if (ratio > 0 && ratio < 1 && (Math.abs(ratio - 1/3) < 0.02 || Math.abs(ratio - 1/4) < 0.02 || Math.abs(ratio - 1/5) < 0.02)) {
        return {
          isTrap: true,
          trapType: 'partial_calculation',
          confidence: 0.65,
          reasoning: 'Your answer is a clean fraction of the correct value — likely an intermediate step, not the final answer',
        };
      }
    }

    return { isTrap: false };
  }

  if (!choices || !Array.isArray(choices)) {
    return { isTrap: false };
  }

  // Find the index of the user's wrong answer
  const wrongIdx = choices.findIndex(c => c?.id === userAnswer);
  const correctIdx = choices.findIndex(c => c?.id === correctAnswer);
  if (wrongIdx === -1 || correctIdx === -1) return { isTrap: false };

  const wrongText = choices[wrongIdx]?.text || '';
  const correctText = choices[correctIdx]?.text || '';

  // Parse numeric values for comparison
  const wrongNum = extractNumber(wrongText);
  const correctNum = extractNumber(correctText);

  // ── Partial Calculation Trap ──
  // Wrong answer is a factor/component of the correct answer
  if (wrongNum !== null && correctNum !== null && correctNum !== 0) {
    const ratio = wrongNum / correctNum;
    if (ratio > 0 && ratio < 1 && (Math.abs(ratio - 0.5) < 0.05 || Math.abs(ratio - 0.333) < 0.05)) {
      return {
        isTrap: true,
        trapType: 'partial_calculation',
        confidence: 0.75,
        reasoning: 'Chose a partial result — stopped one step before the final answer',
      };
    }
  }

  // ── Sign Error Trap ──
  // Wrong answer is the negative of the correct answer
  if (wrongNum !== null && correctNum !== null && Math.abs(wrongNum + correctNum) < 0.01) {
    return {
      isTrap: true,
      trapType: 'sign_error',
      confidence: 0.80,
      reasoning: 'Chose the opposite sign — likely dropped or misapplied a negative',
    };
  }

  // ── Reversed Operation Trap ──
  // Wrong answer and correct answer are related by multiplication vs division
  if (wrongNum !== null && correctNum !== null && correctNum !== 0 && wrongNum !== 0) {
    if (Math.abs(wrongNum * correctNum - Math.round(wrongNum * correctNum)) < 0.01) {
      const product = wrongNum * correctNum;
      if (Math.abs(wrongNum - (product / correctNum)) < 0.01 &&
          Math.abs(correctNum - (product / wrongNum)) < 0.01 &&
          product < 10000) {
        // Check if one answer is the result of multiplying instead of dividing (or vice versa)
        // e.g., correct = 50/0.2 = 250, wrong = 50 * 0.2 = 10
      }
    }
  }

  // ── Percent Confusion Trap ──
  // Common in percent problems: "increased by 150%" vs "150% of"
  if (skills.some(s => typeof s === 'string' && s.includes('percent'))) {
    if (wrongNum !== null && correctNum !== null) {
      // Check for "of" vs "increase by" confusion
      if (Math.abs(wrongNum - correctNum * 0.6) < 1 || Math.abs(wrongNum - correctNum * 1.5) < 1) {
        return {
          isTrap: true,
          trapType: 'percent_confusion',
          confidence: 0.70,
          reasoning: 'Likely confused "increased by X%" with "X% of" — a classic SAT trap',
        };
      }
    }
  }

  // ── Check explanation for trap clues ──
  const explanationLower = explanation.toLowerCase();
  if (explanationLower.includes('trap') || explanationLower.includes('common mistake') ||
      explanationLower.includes('common error')) {
    // The explanation itself mentions it's a trap
    if (typeof userAnswer === 'string' && explanationLower.includes(userAnswer.toLowerCase())) {
      return {
        isTrap: true,
        trapType: 'explanation_identified',
        confidence: 0.70,
        reasoning: 'This wrong answer is specifically called out as a common mistake in the explanation',
      };
    }
  }

  // ── Adjacent Answer Trap (for ordered numeric choices) ──
  // If all choices are numeric and ordered, choosing one off from correct
  // suggests computational error in the right direction
  if (wrongNum !== null && correctNum !== null) {
    const allNums = choices.map(c => extractNumber(c.text)).filter(n => n !== null);
    if (allNums.length === choices.length) {
      allNums.sort((a, b) => a - b);
      const correctRank = allNums.indexOf(correctNum);
      const wrongRank = allNums.indexOf(wrongNum);
      if (Math.abs(correctRank - wrongRank) === 1) {
        return {
          isTrap: true,
          trapType: 'off_by_one_step',
          confidence: 0.60,
          reasoning: 'Chose the answer one computation step away from correct — a common trap placement',
        };
      }
    }
  }

  return { isTrap: false };
};

/**
 * Extract a numeric value from a choice text string.
 * Handles LaTeX formatting, fractions, etc.
 */
const extractNumber = (text) => {
  if (text === null || text === undefined) return null;
  if (typeof text === 'number') return text;
  if (typeof text !== 'string') text = String(text);

  // Remove LaTeX delimiters and common formatting
  let cleaned = text
    .replace(/\$+/g, '')
    .replace(/\\,/g, '')
    .replace(/,/g, '')
    .replace(/\\text\{[^}]*\}/g, '')
    .replace(/\\?%/g, '')
    .trim();

  // Handle simple fractions like "8\frac{1}{3}" = 8.333
  const mixedFracMatch = cleaned.match(/(-?\d+)\\frac\{(\d+)\}\{(\d+)\}/);
  if (mixedFracMatch) {
    const whole = parseFloat(mixedFracMatch[1]);
    const num = parseFloat(mixedFracMatch[2]);
    const den = parseFloat(mixedFracMatch[3]);
    return whole + (whole >= 0 ? num / den : -num / den);
  }

  // Handle simple fractions like "\frac{3}{5}"
  const fracMatch = cleaned.match(/\\frac\{(-?\d+)\}\{(\d+)\}/);
  if (fracMatch) {
    return parseFloat(fracMatch[1]) / parseFloat(fracMatch[2]);
  }

  // Try direct number parse
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
};

/**
 * Calculate average mastery across a set of skills.
 */
const calculateAvgSkillMastery = (skillIds, skillProgress) => {
  if (!skillIds || skillIds.length === 0 || !skillProgress) return 50; // Default: assume moderate

  let totalMastery = 0;
  let count = 0;

  for (const skillId of skillIds) {
    const data = skillProgress[skillId];
    if (data && data.attempts >= 1) {
      totalMastery += data.mastery;
      count++;
    }
  }

  return count > 0 ? totalMastery / count : 50; // Default to 50 if no history
};

// ═══════════════════════════════════════════════════════════════════════════
// FULL TEST DIAGNOSTIC ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Runs the complete diagnostic analysis on a practice test.
 * This is the main entry point.
 *
 * @param {Object} test - The practice test object
 * @param {Object} answers - Student's answers { "modIdx-qIdx": answer }
 * @param {Object} diagnosticData - Telemetry from PracticeTest (timeSpent, visits, etc.)
 * @param {Object} skillProgress - Student's skill mastery data
 * @param {Object} userProfile - { targetScore, currentScore, testDate }
 * @param {Object} previousTests - Previous test results for trend analysis
 * @returns {Object} Complete diagnostic report
 */
export const runDiagnostic = (test, answers, diagnosticData, skillProgress = {}, userProfile = {}, previousTests = {}) => {
  const questionDetails = diagnosticData?.questionDetails || {};

  // Seed the error classifier with THIS test's per-skill accuracy. On the
  // first diagnostic, historical skillProgress is empty, so
  // calculateAvgSkillMastery defaults every skill to 50 — which makes
  // classifyError treat every miss as "some mastery" and silently collapses
  // the 6-class taxonomy (CARELESS needs >=75, CONCEPTUAL_GAP needs <40).
  // Seeding in-test accuracy lets the taxonomy work on the first test; real
  // historical mastery still wins where it exists. (1.2)
  const inTestSkillTotals = {};
  test.modules.forEach((mod, modIdx) => {
    mod.questions.forEach((q, qIdx) => {
      const correct = isAnswerCorrect(q, answers[`${modIdx}-${qIdx}`]);
      getQuestionSkills(q).forEach((skillId) => {
        if (!inTestSkillTotals[skillId]) inTestSkillTotals[skillId] = { correct: 0, total: 0 };
        inTestSkillTotals[skillId].total++;
        if (correct) inTestSkillTotals[skillId].correct++;
      });
    });
  });
  const inTestSkillSeed = {};
  Object.entries(inTestSkillTotals).forEach(([skillId, s]) => {
    inTestSkillSeed[skillId] = {
      mastery: Math.round((s.correct / s.total) * 100),
      attempts: s.total,
    };
  });
  const classifySkillProgress = { ...inTestSkillSeed, ...skillProgress };

  // ═══ PHASE 1: Analyze every question ═══
  const questionAnalysis = [];
  // Real per-item response vector (params + 0/1) for IRT-based scoring and
  // projections — shares scoreTest's IRT path so the diagnosis never disagrees
  // with the headline score. (1.3)
  const scoredItems = [];
  let totalCorrect = 0;
  let totalQuestions = 0;

  test.modules.forEach((mod, modIdx) => {
    mod.questions.forEach((q, qIdx) => {
      const key = `${modIdx}-${qIdx}`;
      const userAnswer = answers[key];
      const telemetry = questionDetails[key] || {};

      totalQuestions++;

      const isCorrect = isAnswerCorrect(q, userAnswer);

      // getQuestionSkills handles both math (q.skills: array) and R&W
      // (q.skill: string) source shapes. Reading q.skills directly here was
      // the root defect that made R&W invisible to full-test diagnosis:
      // every R&W item entered analysis with zero skills, so analyzeSkills
      // emitted no R&W weaknesses and inferDomain([]) dumped ~54 R&W items
      // per full test into 'algebra'.
      const rawSkillIds = getQuestionSkills(q);
      const skillNames = rawSkillIds.map(s => { const sk = getSkillById(s); return sk ? sk.name : s; });
      const domain = inferQuestionDomain(rawSkillIds);
      const tSpent = telemetry.timeSpent || 0;

      const rawChanges = telemetry.answerChanges;
      const changeCount = typeof rawChanges === 'number' ? rawChanges : Array.isArray(rawChanges) ? rawChanges.length : 0;
      const changeEvents = telemetry.answerChangeEvents || (Array.isArray(rawChanges) ? rawChanges : []);

      const behaviorEvidence = {
        answerChangeCount: changeCount,
        answerChangeEvents: changeEvents.map(ev => ({
          from: ev.from, to: ev.to, timestamp: ev.timestamp,
        })),
        usedCalculator: telemetry.usedCalculator || false,
        markedForReview: telemetry.markedForReview || false,
        eliminatedChoices: telemetry.eliminatedChoices || [],
        visits: telemetry.visits || 0,
        timeVsDifficulty: categorizeTimeForDifficulty(tSpent, q.difficulty),
      };

      // Extract the SAT Pattern from the explanation so it's available to
      // skill aggregation (analyzeSkills) without re-reading the source
      // question. Returns null when the explanation is missing or doesn't
      // carry the standard `**SAT Pattern: <Title>**` header (graceful
      // fallback: weakness.missedPatterns just omits this item).
      //
      // R&W items carry no header, so for them extractSatPattern returns null
      // and deriveRWPattern supplies the pattern (boundaries / transitions /
      // text-structure). Same function the R&W bank indexes items under, so the
      // missedPattern a wrong R&W item emits matches its drill pool. Math items
      // short-circuit on the header above; deriveRWPattern returns null for
      // non-R&W skills, so there is no cross-section misfire.
      const satPattern = extractSatPattern(q.explanation) || deriveRWPattern(q) || null;

      // Section axis on each entry so stamina/fade analysis can split WITHIN a
      // section. On a full SAT items are ordered R&W-then-Math, so a whole-test
      // half/quarter split lands on the section boundary and misreads the
      // R&W-vs-Math accuracy gap as fatigue. (Mirrors the scoredItems split.)
      const itemSection = mod.section
        ? (mod.section === 'reading-writing' ? 'rw' : 'math')
        : (rawSkillIds.some(s => RW_SKILL_SET.has(s)) ? 'rw' : 'math');

      if (isCorrect) {
        totalCorrect++;
        questionAnalysis.push({
          key,
          questionNumber: questionAnalysis.length + 1,
          moduleIndex: modIdx,
          questionIndex: qIdx,
          section: itemSection,
          isCorrect: true,
          difficulty: q.difficulty,
          skills: rawSkillIds,
          skillNames,
          domain,
          satPattern,
          timeSpent: tSpent,
          // Additive: position-bias analysis needs the picked letter on
          // CORRECT answers too — counting only wrong-answer letters against
          // an all-answers denominator fabricated a bias for every student.
          userAnswer,
          ...behaviorEvidence,
        });
      } else {
        const errorClassification = classifyError(q, userAnswer, telemetry, classifySkillProgress);

        questionAnalysis.push({
          key,
          questionNumber: questionAnalysis.length + 1,
          moduleIndex: modIdx,
          questionIndex: qIdx,
          section: itemSection,
          isCorrect: false,
          difficulty: q.difficulty,
          skills: rawSkillIds,
          skillNames,
          domain,
          satPattern,
          timeSpent: tSpent,
          userAnswer,
          correctAnswer: q.correctAnswer,
          questionText: q.question,
          ...behaviorEvidence,
          ...errorClassification,
        });
      }

      // Real per-item entry for IRT scoring + projections (1.3). errorType is
      // read back from the questionAnalysis entry just pushed (null if correct).
      // `section` drives the per-section score split for multi-section tests:
      // the module's own section axis when present (buildFullTest sets it;
      // the report loader now preserves it), skill-set membership as the
      // fallback for legacy snapshots.
      scoredItems.push({
        params: getItemParams(q),
        response: isCorrect ? 1 : 0,
        section: mod.section
          ? (mod.section === 'reading-writing' ? 'rw' : 'math')
          : (rawSkillIds.some(s => RW_SKILL_SET.has(s)) ? 'rw' : 'math'),
        domain,
        difficulty: q.difficulty,
        errorType: isCorrect ? null : questionAnalysis[questionAnalysis.length - 1].errorType,
        isCorrect,
      });
    });
  });

  // ═══ PHASE 2: Calculate scores ═══
  // Real-response IRT score (matches scoreTest's section score), not a
  // synthetic raw-count estimate. (1.3)
  //
  // Multi-section tests score each section independently and sum to the
  // 400-1600 composite — exactly irtEngine scoreTest's convention. Scoring
  // the merged R&W+Math vector as one 200-800 number produced a headline
  // that was neither a math score nor a composite, and every comparison
  // built from it (gap, trend delta) was cross-scale nonsense.
  const rwScoredItems = scoredItems.filter(i => i.section === 'rw');
  const mathScoredItems = scoredItems.filter(i => i.section === 'math');
  const isMultiSection = rwScoredItems.length > 0 && mathScoredItems.length > 0;
  // The served Module-2 routes (per section), threaded on diagnosticData so
  // the diagnosis score uses the SAME table columns as scoreTest's headline.
  // Without them the table defaults to the hard route — which is also the
  // correct legacy default for attempts that predate the R&W easy variant.
  const mathRoute = diagnosticData?.mathRoute || 'hard';
  const rwRoute = diagnosticData?.rwRoute || 'hard';
  const singleSection = mathScoredItems.length > 0 ? 'math' : 'reading-writing';
  const sectionScaled = {
    math: mathScoredItems.length > 0
      ? scaleResponseVector(mathScoredItems, test.id, { section: 'math', route: mathRoute })
      : null,
    rw: rwScoredItems.length > 0
      ? scaleResponseVector(rwScoredItems, test.id, { section: 'reading-writing', route: rwRoute })
      : null,
  };
  const scaledScore = isMultiSection
    ? sectionScaled.math + sectionScaled.rw
    : scaleResponseVector(scoredItems, test.id, {
        section: singleSection,
        route: singleSection === 'math' ? mathRoute : rwRoute,
      });
  // Gap only when the target is provably on the same scale as the headline
  // (onboarding now stores 400-1600 composite goals; legacy profiles carry
  // 200-800 section targets).
  const targetScore = userProfile.targetScore || (isMultiSection ? DEFAULT_GOAL_SCORE : 700);
  const targetComparable = isCompositeScaleTarget(targetScore) === isMultiSection;
  const scoreGap = targetComparable ? Math.max(0, targetScore - scaledScore) : 0;

  // ═══ PHASE 3: Error pattern analysis ═══
  const wrongQuestions = questionAnalysis.filter(q => !q.isCorrect);
  const errorPatterns = analyzeErrorPatterns(wrongQuestions);

  // ═══ PHASE 4: Domain analysis ═══
  const domainAnalysis = analyzeDomains(questionAnalysis);

  // ═══ PHASE 5: Skill-level analysis ═══
  const skillAnalysis = analyzeSkills(questionAnalysis, skillProgress);

  // ═══ PHASE 6: Score projection ═══
  const scoreProjection = projectScoreImprovements(scoredItems, targetScore, test.id, mathRoute, rwRoute);

  // ═══ PHASE 7: Difficulty analysis ═══
  const difficultyAnalysis = analyzeDifficulty(questionAnalysis);

  // ═══ PHASE 8: Time management analysis ═══
  const timeAnalysis = analyzeTimeManagement(questionAnalysis, diagnosticData);

  // ═══ PHASE 9: Cross-test trend analysis ═══
  const trendAnalysis = analyzeTrends(test.id, scaledScore, previousTests, skillProgress, { isMultiSection });

  // ═══ PHASE 10: Priority ranking ═══
  const prioritizedActions = prioritizeActions(
    errorPatterns, domainAnalysis, skillAnalysis, scoreProjection, scoreGap
  );

  // ═══ ADVANCED ANALYTICS ═══
  const stamina = analyzeStamina(questionAnalysis);
  const answerPatterns = analyzeAnswerPatterns(questionAnalysis, diagnosticData);
  const skillClusters = analyzeSkillClusters(questionAnalysis);
  const rootCauseClusters = analyzeRootCauseClusters(questionAnalysis, stamina);

  return {
    score: {
      raw: totalCorrect,
      total: totalQuestions,
      scaled: scaledScore,
      // Section axis for the report UI: composite headline (400-1600) with
      // per-section 200-800 scores when both sections are present.
      isMultiSection,
      sections: sectionScaled,
      target: targetScore,
      targetComparable,
      gap: scoreGap,
      percentCorrect: Math.round((totalCorrect / totalQuestions) * 100),
    },

    questionAnalysis,
    errorPatterns,
    domainAnalysis,
    skillAnalysis,
    scoreProjection,
    difficultyAnalysis,
    timeAnalysis,
    trendAnalysis,
    prioritizedActions,

    confidenceInterval: calculateConfidenceInterval(totalCorrect, totalQuestions, scaledScore, isMultiSection, singleSection, singleSection === 'math' ? mathRoute : rwRoute),
    learningVelocity: calculateLearningVelocity(previousTests, scaledScore, isMultiSection),
    skillClusters,
    answerPatterns,
    stamina,
    // The calibration table is per-section (200-800); for composites the
    // average section score is the honest stand-in until a composite table
    // exists.
    percentile: estimatePercentile(isMultiSection ? Math.round(scaledScore / 2) : scaledScore),
    mistakeFingerprint: generateMistakeFingerprint(
      { errorPatterns, domainAnalysis, difficultyAnalysis, timeAnalysis },
      previousTests
    ),
    timeAllocation: analyzeTimeAllocation(questionAnalysis),
    rootCauseClusters,

    testId: test.id,
    testTitle: test.title,
    analyzedAt: new Date().toISOString(),
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// ANALYSIS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// inferDomain is imported from ./scoring/domainInference via the scoring barrel.

/**
 * Analyze error patterns across all wrong questions.
 */
const analyzeErrorPatterns = (wrongQuestions) => {
  const counts = {};
  Object.values(ERROR_TYPES).forEach(type => { counts[type] = 0; });

  const byType = {};
  Object.values(ERROR_TYPES).forEach(type => { byType[type] = []; });

  wrongQuestions.forEach(q => {
    const type = q.errorType || ERROR_TYPES.CONCEPTUAL_GAP;
    counts[type] = (counts[type] || 0) + 1;
    if (!byType[type]) byType[type] = [];
    byType[type].push(q);
  });

  const total = wrongQuestions.length;

  // Build sorted summary
  const summary = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([type, count]) => ({
      type,
      label: ERROR_TYPE_LABELS[type],
      description: ERROR_TYPE_DESCRIPTIONS[type],
      icon: ERROR_TYPE_ICONS[type],
      color: ERROR_TYPE_COLORS[type],
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      questions: byType[type],
    }))
    .sort((a, b) => b.count - a.count);

  // Identify dominant error pattern
  const dominantPattern = summary.length > 0 ? summary[0] : null;

  return {
    totalWrong: total,
    summary,
    dominantPattern,
    counts,
  };
};

/**
 * Analyze performance by SAT domain.
 */
const analyzeDomains = (questionAnalysis) => {
  const domains = {};

  questionAnalysis.forEach(q => {
    const domain = q.domain || 'unknown';
    if (!domains[domain]) {
      domains[domain] = {
        domain,
        total: 0,
        correct: 0,
        wrong: 0,
        byDifficulty: { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } },
        errorTypes: {},
        skills: new Set(),
        weakSkills: [],
      };
    }

    domains[domain].total++;
    if (q.isCorrect) {
      domains[domain].correct++;
    } else {
      domains[domain].wrong++;
      const errorType = q.errorType || ERROR_TYPES.CONCEPTUAL_GAP;
      domains[domain].errorTypes[errorType] = (domains[domain].errorTypes[errorType] || 0) + 1;
    }

    // Track by difficulty
    const diff = q.difficulty || 'medium';
    if (domains[domain].byDifficulty[diff]) {
      domains[domain].byDifficulty[diff].total++;
      if (q.isCorrect) domains[domain].byDifficulty[diff].correct++;
    }

    // Normalize across math (q.skills: array) and R&W (q.skill: string).
    getQuestionSkills(q).forEach(s => domains[domain].skills.add(s));
  });

  // Calculate percentages and rank.
  // R&W domains carry a section: 'rw' tag for downstream filtering. Math
  // domains stay implicit/section-blind (the existing math-only behavior).
  const domainSummary = Object.values(domains)
    .filter(d => d.domain !== 'unknown')
    .map(d => {
      const isRW = RW_DOMAIN_SET.has(d.domain);
      return {
        ...d,
        skills: [...d.skills],
        accuracy: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
        // satWeight: DOMAIN_WEIGHTS only covers math. R&W domains return 0 —
        // acceptable v1 behavior per /autoplan A2: R&W gets surfaced in the
        // weakness list but does not participate in math score projection.
        satWeight: DOMAIN_WEIGHTS[d.domain] || 0,
        displayName: skillTaxonomy.domains[d.domain]?.name || RW_DOMAIN_DISPLAY_NAMES[d.domain] || d.domain,
        color: skillTaxonomy.domains[d.domain]?.color || '#888',
        pointsAvailable: d.wrong * 10, // Rough: each question ≈ 10 scaled points
        section: isRW ? 'rw' : 'math',
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy); // Weakest first

  return domainSummary;
};

/**
 * Analyze performance at the individual skill level.
 */
const analyzeSkills = (questionAnalysis, skillProgress = {}) => {
  const skillMap = {};

  questionAnalysis.forEach(q => {
    // getQuestionSkills handles both math (q.skills: array) and R&W
    // (q.skill: string) source shapes — see top of file.
    getQuestionSkills(q).forEach(skillId => {
      if (!skillMap[skillId]) {
        const skill = getSkillById(skillId);
        const progress = skillProgress[skillId];
        const isRW = RW_SKILL_SET.has(skillId);
        skillMap[skillId] = {
          skillId,
          name: skill?.name || humanizeSkillId(skillId),
          // R&W skills aren't in the math taxonomy — derive their domain from
          // the R&W skill→domain map. Math skills go through the existing
          // taxonomy lookup + inferDomain fallback.
          domain: skill?.domain || (isRW ? RW_SKILL_TO_DOMAIN[skillId] : inferDomain([skillId])),
          satConcept: skill?.satConcept || '',
          modules: skill?.modules || [],
          sections: skill?.sections || [],
          // Section-tag contract (Day 0 / 1-2 of Acely-parity batch). Every
          // weakness flowing out of this engine carries its test subject so
          // the focus-area drill dispatcher in StudyPlanDashboard can route.
          section: isRW ? 'rw' : 'math',
          correct: 0,
          total: 0,
          blanks: 0,
          gapEvidence: 0,
          errorTypes: [],
          // Drill-routing: collects distinct SAT Patterns for wrong items
          // attributable to this skill. Feeds Tier 1 of the cascade in
          // getTargetedWeaknessSet (see docs/DRILL_ROUTING_PLAN.md).
          // Stored as a Set during aggregation, serialized to array below.
          missedPatternsSet: new Set(),
          // Historical data
          historicalMastery: progress?.mastery || null,
          historicalAttempts: progress?.attempts || 0,
          trend: progress ? getSkillTrendFromHistory(progress) : 'unknown',
        };
      }
      skillMap[skillId].total++;
      // Blanks split two ways. An END-OF-TEST blank (classifyError →
      // TIME_PRESSURE: near-zero time, never really seen) is a pacing fact —
      // excluded from knowledge evidence entirely. A DELIBERATE SKIP
      // (classifyError → UNANSWERED: the student spent real time, read it,
      // and moved on) is "saw it, couldn't do it" — genuine knowledge
      // evidence at a discount. Treating every blank as pacing made a skill
      // left entirely blank on purpose vanish from the weakness list.
      const isBlank = q.userAnswer === undefined || q.userAnswer === null || q.userAnswer === '';
      const isDeliberateSkip = isBlank && !q.isCorrect && q.errorType === ERROR_TYPES.UNANSWERED;
      if (isBlank && !q.isCorrect && !isDeliberateSkip) skillMap[skillId].blanks++;
      if (q.isCorrect) {
        skillMap[skillId].correct++;
      } else {
        skillMap[skillId].errorTypes.push(q.errorType);
        if (isDeliberateSkip) {
          const diffW = GAP_DIFFICULTY_WEIGHT[q.difficulty] ?? 1.0;
          skillMap[skillId].gapEvidence += 0.6 * diffW;
        }
        // Weighted "is this a real knowledge gap?" evidence. A careless slip
        // or rushed miss is weak evidence of a concept gap (it feeds the
        // strategy/precision activities instead); a missed EASY item is
        // stronger evidence than a missed hard one. Legacy/unknown error
        // types weight 1.0 so old snapshots keep the old behavior.
        if (!isBlank) {
          // TIME_PRESSURE with no recorded timing means ABSENT telemetry
          // (classifyError reads timeSpent 0 as "rushed"), not real rushing —
          // weight it as an ordinary miss so telemetry-less snapshots (legacy
          // attempts, seeded tests) don't have their gap evidence discounted.
          const timingIsReal = (q.timeSpent || 0) > 0;
          const errW = (q.errorType === ERROR_TYPES.TIME_PRESSURE && !timingIsReal)
            ? 1.0
            : (GAP_ERROR_WEIGHT[q.errorType] ?? 1.0);
          const diffW = GAP_DIFFICULTY_WEIGHT[q.difficulty] ?? 1.0;
          skillMap[skillId].gapEvidence += errW * diffW;
        }
        // Only wrong items contribute to missedPatterns. Items lacking
        // a parseable SAT Pattern (satPattern === null) are skipped —
        // they participate in Tier 3 (skill) fallback only.
        if (q.satPattern) {
          skillMap[skillId].missedPatternsSet.add(q.satPattern);
        }
      }
    });
  });

  // Calculate accuracies and sort by weakness
  const skills = Object.values(skillMap).map(s => {
    const { missedPatternsSet, ...rest } = s;
    const attempted = s.total - s.blanks;
    const attemptedAccuracy = attempted > 0 ? s.correct / attempted : 0;
    return {
      ...rest,
      missedPatterns: [...missedPatternsSet],
      testAccuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
      // Blank-excluded accuracy — the honest knowledge signal. testAccuracy
      // (all-items basis) is kept for display continuity.
      contentAccuracy: Math.round(attemptedAccuracy * 100),
      attempted,
      // Weak = the student ACTUALLY ATTEMPTED it at least twice, got under
      // half right, AND the misses carry at least ~one real-gap-equivalent of
      // weighted evidence (two purely-careless slips: 2×0.35 = 0.7 → not a
      // concept focus area; they surface through the strategy activities).
      isWeak: attempted >= 2 && attemptedAccuracy < 0.5 && s.gapEvidence >= 0.9,
      // Strong now requires n>=2 — one lucky correct answer used to mark a
      // skill a "strength" and feed the strength-focus assignments.
      isStrong: attempted >= 2 && attemptedAccuracy >= 0.8,
      // Sample-size honesty flag consumed by the study plan: 'suspected'
      // weaknesses get probe-sized time, not multi-week commitments.
      evidenceLevel: attempted >= 4 ? 'confirmed' : 'suspected',
      primaryErrorType: getMostCommonErrorType(s.errorTypes),
    };
  });

  const weakSkills = skills.filter(s => s.isWeak).sort((a, b) => a.contentAccuracy - b.contentAccuracy);
  const strongSkills = skills.filter(s => s.isStrong).sort((a, b) => b.testAccuracy - a.testAccuracy);
  const allSkills = skills.sort((a, b) => a.testAccuracy - b.testAccuracy);

  // skillMap is the raw aggregation state and carries live Set objects
  // (missedPatternsSet), which Firestore hard-rejects. It must never leave
  // this function: the report rides inside recordPracticeTestResult's score
  // transaction on a test's FIRST attempt, and a single Set fails the whole
  // save. Everything callers need is already on weakSkills/allSkills
  // (missedPatterns as a plain array).
  return { weakSkills, strongSkills, allSkills };
};

/**
 * Project how much score improvement is possible by fixing specific areas.
 */
const projectScoreImprovements = (scoredItems, targetScore, formId, mathRoute = 'hard', rwRoute = 'hard') => {
  // Everything is computed off the REAL response vector via the shared IRT
  // path, so the projection baseline equals the headline score and every
  // "+X points" gain reflects re-estimated ability, not a synthetic raw-count
  // delta. (1.3)
  //
  // Multi-section vectors score per section and sum to the composite so the
  // baseline and every projection live on the same axis as the headline
  // score (scoring the merged vector as one 200-800 number would understate
  // composite gains and disagree with the displayed score).
  const scoreVector = (items) => {
    const rw = items.filter(i => i.section === 'rw');
    const math = items.filter(i => i.section === 'math');
    if (rw.length > 0 && math.length > 0) {
      return scaleResponseVector(rw, formId, { section: 'reading-writing', route: rwRoute })
        + scaleResponseVector(math, formId, { section: 'math', route: mathRoute });
    }
    const sec = math.length > 0 ? 'math' : 'reading-writing';
    return scaleResponseVector(items, formId, {
      section: sec,
      route: sec === 'math' ? mathRoute : rwRoute,
    });
  };
  const currentScaled = scoreVector(scoredItems);

  // Re-score with every currently-wrong item matching `pred` flipped to correct.
  const scaledIfFixed = (pred) => scoreVector(
    scoredItems.map(i => ({
      ...i,
      response: (i.response === 0 && pred(i)) ? 1 : i.response,
    })),
  );

  // Domain projections — fix all wrong items in a domain.
  const domainAgg = {};
  scoredItems.forEach(i => {
    const domain = i.domain || 'unknown';
    if (!domainAgg[domain]) domainAgg[domain] = { correct: 0, wrong: 0, total: 0 };
    domainAgg[domain].total++;
    if (i.isCorrect) domainAgg[domain].correct++; else domainAgg[domain].wrong++;
  });
  const projections = Object.entries(domainAgg)
    .filter(([domain, d]) => domain !== 'unknown' && d.wrong > 0)
    .map(([domain, d]) => {
      const newScaled = scaledIfFixed(i => (i.domain || 'unknown') === domain);
      return {
        domain,
        domainName: skillTaxonomy.domains[domain]?.name || RW_DOMAIN_DISPLAY_NAMES[domain] || domain,
        color: skillTaxonomy.domains[domain]?.color || '#888',
        questionsToFix: d.wrong,
        currentAccuracy: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
        projectedPointGain: newScaled - currentScaled,
        projectedScore: newScaled,
      };
    })
    .sort((a, b) => b.projectedPointGain - a.projectedPointGain);

  // Error-type projections — fix all wrong items of one error type.
  const errorTypeCounts = {};
  scoredItems.forEach(i => {
    if (i.isCorrect) return;
    const type = i.errorType || ERROR_TYPES.CONCEPTUAL_GAP;
    errorTypeCounts[type] = (errorTypeCounts[type] || 0) + 1;
  });
  const errorTypeProjections = Object.entries(errorTypeCounts)
    .map(([type, count]) => {
      const newScaled = scaledIfFixed(i => (i.errorType || ERROR_TYPES.CONCEPTUAL_GAP) === type);
      return {
        errorType: type,
        label: ERROR_TYPE_LABELS[type],
        icon: ERROR_TYPE_ICONS[type],
        color: ERROR_TYPE_COLORS[type],
        questionsToFix: count,
        projectedPointGain: newScaled - currentScaled,
        projectedScore: newScaled,
      };
    })
    .sort((a, b) => b.projectedPointGain - a.projectedPointGain);

  // Quick wins (easy + medium missed) and easy-only.
  const isQuickWin = (i) => i.difficulty === 'easy' || i.difficulty === 'medium';
  const quickWinCount = scoredItems.filter(i => !i.isCorrect && isQuickWin(i)).length;
  const quickWinGain = scaledIfFixed(isQuickWin) - currentScaled;
  const easyWinCount = scoredItems.filter(i => !i.isCorrect && i.difficulty === 'easy').length;
  const easyWinGain = scaledIfFixed(i => i.difficulty === 'easy') - currentScaled;

  // Path to target: flip wrong items easiest-first (lowest b) until the
  // re-estimated score reaches the target.
  let questionsNeeded = 0;
  if (currentScaled < targetScore) {
    const wrongIdx = scoredItems
      .map((i, idx) => ({ i, idx }))
      .filter(x => !x.i.isCorrect)
      .sort((a, b) => (a.i.params?.b ?? 0) - (b.i.params?.b ?? 0))
      .map(x => x.idx);
    const v = scoredItems.map(i => ({ ...i }));
    for (let k = 0; k < wrongIdx.length; k++) {
      v[wrongIdx[k]] = { ...v[wrongIdx[k]], response: 1 };
      if (scoreVector(v) >= targetScore) { questionsNeeded = k + 1; break; }
    }
    if (questionsNeeded === 0) questionsNeeded = wrongIdx.length; // unreachable even at 100%
  }

  return {
    currentScore: currentScaled,
    targetScore,
    gap: targetScore - currentScaled,
    questionsNeededForTarget: questionsNeeded,
    domainProjections: projections,
    errorTypeProjections,
    quickWins: {
      count: quickWinCount,
      projectedGain: quickWinGain,
      potentialGain: quickWinGain,
      description: `Getting all missed easy & medium questions right would add +${quickWinGain} points`,
    },
    easyWins: {
      count: easyWinCount,
      projectedGain: easyWinGain,
      description: `Just fixing the ${easyWinCount} missed easy questions would add +${easyWinGain} points`,
    },
  };
};

/**
 * Analyze performance by difficulty level.
 */
const analyzeDifficulty = (questionAnalysis) => {
  const levels = { easy: { correct: 0, total: 0, avgTime: 0, totalTime: 0 },
                   medium: { correct: 0, total: 0, avgTime: 0, totalTime: 0 },
                   hard: { correct: 0, total: 0, avgTime: 0, totalTime: 0 } };

  questionAnalysis.forEach(q => {
    const diff = q.difficulty || 'medium';
    if (levels[diff]) {
      levels[diff].total++;
      levels[diff].totalTime += q.timeSpent || 0;
      if (q.isCorrect) levels[diff].correct++;
    }
  });

  Object.values(levels).forEach(l => {
    l.accuracy = l.total > 0 ? Math.round((l.correct / l.total) * 100) : 0;
    l.avgTime = l.total > 0 ? Math.round(l.totalTime / l.total) : 0;
  });

  // Identify the "difficulty cliff" — where accuracy drops dramatically
  let difficultyCliff = null;
  if (levels.easy.accuracy >= 80 && levels.medium.accuracy < 60) {
    difficultyCliff = 'medium';
  } else if (levels.medium.accuracy >= 60 && levels.hard.accuracy < 40) {
    difficultyCliff = 'hard';
  } else if (levels.easy.accuracy < 70) {
    difficultyCliff = 'easy'; // Struggling even with basics
  }

  return { levels, difficultyCliff };
};

/**
 * Analyze time management patterns.
 */
const analyzeTimeManagement = (questionAnalysis, diagnosticData) => {
  const times = questionAnalysis.map(q => q.timeSpent || 0);
  const totalTime = times.reduce((s, t) => s + t, 0);
  const avgTime = times.length > 0 ? totalTime / times.length : 0;

  // Time on correct vs incorrect
  const correctTimes = questionAnalysis.filter(q => q.isCorrect).map(q => q.timeSpent || 0);
  const incorrectTimes = questionAnalysis.filter(q => !q.isCorrect).map(q => q.timeSpent || 0);
  const avgCorrectTime = correctTimes.length > 0 ? correctTimes.reduce((s, t) => s + t, 0) / correctTimes.length : 0;
  const avgIncorrectTime = incorrectTimes.length > 0 ? incorrectTimes.reduce((s, t) => s + t, 0) / incorrectTimes.length : 0;

  // Questions where time was a factor (very fast + wrong, or very slow + wrong)
  const timeRelatedErrors = questionAnalysis.filter(q => {
    if (q.isCorrect) return false;
    const diff = q.difficulty || 'medium';
    const fast = q.timeSpent < TIME_THRESHOLDS.rushed;
    const slow = (diff === 'easy' && q.timeSpent > TIME_THRESHOLDS.verySlowEasy) ||
                 (diff === 'medium' && q.timeSpent > TIME_THRESHOLDS.verySlowMedium) ||
                 (diff === 'hard' && q.timeSpent > TIME_THRESHOLDS.verySlowHard);
    return fast || slow;
  });

  // Pacing analysis: did the student run out of steam? Compare first-half vs
  // second-half accuracy WITHIN each section, then average across sections. A
  // whole-test split on a full SAT lands on the R&W|Math boundary and misreads
  // the section accuracy gap as fatigue. Single-section tests collapse to one
  // group, so their behavior is unchanged.
  const halfGroups = new Map();
  for (const q of questionAnalysis) {
    const sec = q.section || 'math';
    if (!halfGroups.has(sec)) halfGroups.set(sec, []);
    halfGroups.get(sec).push(q);
  }
  const halfPairs = [];
  for (const items of halfGroups.values()) {
    if (items.length < 4) continue; // too short to split meaningfully
    const h = Math.floor(items.length / 2);
    const fh = items.slice(0, h);
    const sh = items.slice(h);
    halfPairs.push({
      first: fh.length ? fh.filter(q => q.isCorrect).length / fh.length : 0,
      second: sh.length ? sh.filter(q => q.isCorrect).length / sh.length : 0,
    });
  }
  const avgOf = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
  const firstHalfAccuracy = avgOf(halfPairs.map(p => p.first));
  const secondHalfAccuracy = avgOf(halfPairs.map(p => p.second));
  const fadeEffect = firstHalfAccuracy - secondHalfAccuracy;

  // Module time remaining analysis
  const moduleTimeRemaining = diagnosticData?.moduleTimeRemaining || {};
  // Map continuous module index → section so insights can name modules
  // section-relatively ("Math Module 1") instead of continuously ("Module 3").
  const moduleSectionByIndex = {};
  for (const q of questionAnalysis) {
    if (q.moduleIndex != null && moduleSectionByIndex[q.moduleIndex] == null) {
      moduleSectionByIndex[q.moduleIndex] = q.section ?? null;
    }
  }

  // Generate time insights
  const insights = [];
  if (fadeEffect > 0.15) {
    insights.push({
      type: 'warning',
      message: `Your accuracy dropped ${Math.round(fadeEffect * 100)}% in the second half — pacing may be an issue`,
    });
  }
  if (avgIncorrectTime < avgCorrectTime * 0.6 && incorrectTimes.length > 3) {
    insights.push({
      type: 'warning',
      message: 'You answered wrong questions faster than correct ones — slow down on uncertain questions',
    });
  }
  if (timeRelatedErrors.length > 3) {
    insights.push({
      type: 'info',
      message: `${timeRelatedErrors.length} questions had time-related issues (too fast or too slow)`,
    });
  }

  // Check for remaining time in modules
  Object.entries(moduleTimeRemaining).forEach(([modKey, remaining]) => {
    if (remaining > 600) { // More than 10 minutes remaining
      const mi = parseInt(modKey);
      insights.push({
        type: 'info',
        message: `${sectionModuleLabel(moduleSectionByIndex[mi], mi)}: ${Math.round(remaining / 60)} minutes unused — you could slow down and check work`,
      });
    }
  });

  return {
    totalTimeSeconds: Math.round(totalTime),
    avgTimePerQuestion: Math.round(avgTime),
    avgCorrectTime: Math.round(avgCorrectTime),
    avgIncorrectTime: Math.round(avgIncorrectTime),
    timeRelatedErrors: timeRelatedErrors.length,
    fadeEffect: Math.round(fadeEffect * 100),
    firstHalfAccuracy: Math.round(firstHalfAccuracy * 100),
    secondHalfAccuracy: Math.round(secondHalfAccuracy * 100),
    moduleTimeRemaining,
    insights,
  };
};

/**
 * Analyze trends across multiple test attempts.
 */
const analyzeTrends = (currentTestId, currentScore, previousTests = {}, skillProgress = {}, currentMeta = {}) => {
  // Collect all previous test scores
  const testHistory = [];

  Object.entries(previousTests).forEach(([testId, testData]) => {
    if (testData.attempts && Array.isArray(testData.attempts)) {
      testData.attempts.forEach((attempt, idx) => {
        if (typeof attempt.scaledScore !== 'number') return;
        // Blank/abandoned submissions carry no trend signal — the shared
        // selector is the single source of truth for what counts as blank.
        if (isBlankAttempt(attempt)) return;
        testHistory.push({
          testId,
          testTitle: testData.testTitle || testId,
          attemptIndex: idx,
          scaledScore: attempt.scaledScore,
          isMultiSection: !!attempt.isMultiSection,
          rawScore: attempt.rawScore,
          totalQuestions: attempt.totalQuestions,
          completedAt: attempt.completedAt,
        });
      });
    }
  });

  // Sort by date
  testHistory.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

  // The attempt being diagnosed may already be persisted in previousTests —
  // the dashboard's View Full Diagnosis regenerates the report long after
  // the attempt saved. Pushing a synthetic "This Test" entry would then
  // double-count the attempt AND compare the engine's recomputed score
  // against the same attempt's own persisted score ("-200 since last test").
  const newest = testHistory[testHistory.length - 1];
  if (newest && newest.testId === currentTestId) {
    newest.isCurrent = true;
    newest.testTitle = 'This Test';
  } else {
    testHistory.push({
      testId: currentTestId,
      testTitle: 'This Test',
      scaledScore: currentScore,
      isMultiSection: !!currentMeta.isMultiSection,
      completedAt: new Date().toISOString(),
      isCurrent: true,
    });
  }

  if (testHistory.length < 2) {
    return {
      hasHistory: false,
      testHistory,
      scoreChange: null,
      trend: 'first_test',
      message: 'This is your first test — take another after studying to track improvement!',
    };
  }

  // Calculate trend — only across like scales. History mixes single-section
  // 200-800 attempts with 400-1600 composites; a cross-scale delta reads as
  // a catastrophic drop that never happened.
  const currentEntry = testHistory[testHistory.length - 1];
  const prevEntry = testHistory[testHistory.length - 2];
  const scoreChange = (!!prevEntry.isMultiSection === !!currentEntry.isMultiSection)
    ? currentEntry.scaledScore - prevEntry.scaledScore
    : null;

  // Overall trend (endpoint slope over the last 5 like-scale tests)
  const recent = testHistory
    .filter(t => !!t.isMultiSection === !!currentEntry.isMultiSection)
    .slice(-5);
  let trend = 'stable';
  if (recent.length >= 2) {
    const firstScore = recent[0].scaledScore;
    const lastScore = recent[recent.length - 1].scaledScore;
    const avgChange = (lastScore - firstScore) / (recent.length - 1);
    if (avgChange > 10) trend = 'improving';
    else if (avgChange < -10) trend = 'declining';
  }

  // Identify skills that improved vs got worse
  // (based on skill progress trend data)
  const improvingSkills = [];
  const decliningSkills = [];
  Object.entries(skillProgress).forEach(([skillId, data]) => {
    const skillTrend = getSkillTrendFromHistory(data);
    const skill = getSkillById(skillId);
    if (skillTrend === 'improving' && skill) improvingSkills.push(skill.name);
    if (skillTrend === 'declining' && skill) decliningSkills.push(skill.name);
  });

  // ── Cross-test error persistence analysis ──
  // Track which error types and weak skills appear across multiple tests
  // This identifies "sticky" problems the student hasn't fixed
  const persistentWeakSkills = [];
  const errorTypeEvolution = []; // Error type counts per test over time
  const trapPatternCounts = {}; // Recurring trap types across tests

  Object.entries(previousTests).forEach(([testId, testData]) => {
    if (testData.attempts) {
      testData.attempts.forEach(attempt => {
        const diagData = attempt.diagnosticData;
        if (diagData?.questionDetails) {
          // Collect weak skills from this test
          const skillHits = {};
          const testErrorCounts = {};
          Object.values(diagData.questionDetails).forEach(qd => {
            if (qd && !qd.isCorrect) {
              // Track skills
              if (Array.isArray(qd.skills)) {
                qd.skills.forEach(s => {
                  skillHits[s] = (skillHits[s] || 0) + 1;
                });
              }
              // Track error types per test
              if (qd.errorType) {
                testErrorCounts[qd.errorType] = (testErrorCounts[qd.errorType] || 0) + 1;
              }
              // Track trap types across all tests
              if (qd.errorType === 'trap_susceptibility' && qd.trapType) {
                trapPatternCounts[qd.trapType] = (trapPatternCounts[qd.trapType] || 0) + 1;
              }
            }
          });

          // Store error type counts for this attempt
          if (Object.keys(testErrorCounts).length > 0) {
            errorTypeEvolution.push({
              testId,
              completedAt: attempt.completedAt,
              counts: testErrorCounts,
            });
          }

          Object.entries(skillHits).forEach(([skillId, count]) => {
            if (count >= 1) {
              const existing = persistentWeakSkills.find(p => p.skillId === skillId);
              if (existing) {
                existing.testCount++;
              } else {
                const skill = getSkillById(skillId);
                persistentWeakSkills.push({
                  skillId,
                  name: skill?.name || skillId,
                  testCount: 1,
                });
              }
            }
          });
        }
      });
    }
  });

  // Skills weak in 2+ tests = persistent weakness
  const trulyPersistent = persistentWeakSkills
    .filter(s => s.testCount >= 2)
    .sort((a, b) => b.testCount - a.testCount)
    .slice(0, 5);

  // Trap patterns recurring across 3+ tests
  const recurringTraps = Object.entries(trapPatternCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([trapType, count]) => ({ trapType, count }));

  // Sort error evolution by date
  errorTypeEvolution.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

  return {
    hasHistory: true,
    testHistory,
    scoreChange,
    trend,
    improvingSkills: improvingSkills.slice(0, 5),
    decliningSkills: decliningSkills.slice(0, 5),
    persistentWeaknesses: trulyPersistent,
    errorTypeEvolution,
    trapPatterns: recurringTraps,
    message: generateTrendMessage(scoreChange, trend),
  };
};

/**
 * Prioritize actions by ROI (which fix gives the most points per effort).
 */
const prioritizeActions = (errorPatterns, domainAnalysis, skillAnalysis, scoreProjection, scoreGap) => {
  const actions = [];

  // ── Quick wins: careless errors and trap susceptibility ──
  const carelessCount = errorPatterns.counts[ERROR_TYPES.CARELESS_ERROR] || 0;
  const trapCount = errorPatterns.counts[ERROR_TYPES.TRAP_SUSCEPTIBILITY] || 0;

  if (carelessCount >= 2) {
    actions.push({
      priority: 1,
      type: 'strategy',
      title: `Eliminate ${carelessCount} careless mistakes`,
      description: 'These are questions you know how to solve. Slow down and double-check your work.',
      estimatedGain: Math.round(carelessCount * (scoreGap > 0 ? scoreGap / (errorPatterns.totalWrong || 1) : 10)),
      effort: 'low',
      category: 'quick_win',
      actionItems: [
        'After answering, re-read the question — are you solving what they asked?',
        'For calculations, check by plugging your answer back in',
        'Use mark-for-review on questions you feel uncertain about',
      ],
    });
  }

  if (trapCount >= 2) {
    actions.push({
      priority: 2,
      type: 'strategy',
      title: `Stop falling for ${trapCount} trap answers`,
      description: 'College Board designs wrong answers to catch specific mistakes. Learn to spot them.',
      estimatedGain: Math.round(trapCount * (scoreGap > 0 ? scoreGap / (errorPatterns.totalWrong || 1) : 10)),
      effort: 'medium',
      category: 'quick_win',
      actionItems: [
        'Before picking an answer, predict what traps might be set',
        'If your answer matches a "too easy" path, verify it',
        'In percent problems, always check: "increased BY X%" vs "IS X%"',
      ],
    });
  }

  // ── Domain-based actions ──
  domainAnalysis.forEach(domain => {
    if (domain.accuracy < 60) {
      // R&W domains carry satWeight 0 (DOMAIN_WEIGHTS only covers math), so
      // the "% of the SAT" clause is math-only — for R&W it would read
      // "0% of the SAT".
      const weightClause = domain.satWeight > 0
        ? `, which is ${Math.round(domain.satWeight * 100)}% of the SAT`
        : '';
      actions.push({
        priority: domain.accuracy < 40 ? 3 : 5,
        type: 'domain',
        title: `Strengthen ${domain.displayName}`,
        description: `You got ${domain.correct}/${domain.total} (${domain.accuracy}%) in this domain${weightClause}`,
        estimatedGain: Math.round(domain.wrong * 10),
        effort: domain.accuracy < 30 ? 'high' : 'medium',
        category: 'content',
        domain: domain.domain,
        actionItems: [],
      });
    }
  });

  // ── Skill-based actions ──
  skillAnalysis.weakSkills.slice(0, 5).forEach((skill, idx) => {
    actions.push({
      priority: 4 + idx,
      type: 'skill',
      title: `Master: ${skill.name}`,
      description: `Got ${skill.correct}/${skill.total} on this test. ${skill.historicalMastery !== null ? `Historical mastery: ${skill.historicalMastery}%` : 'First time tested'}`,
      estimatedGain: Math.round((skill.total - skill.correct) * 10),
      effort: skill.historicalMastery !== null && skill.historicalMastery > 30 ? 'medium' : 'high',
      category: 'content',
      skillId: skill.skillId,
      modules: skill.modules,
      sections: skill.sections,
      primaryErrorType: skill.primaryErrorType,
      actionItems: generateSkillActionItems(skill),
    });
  });

  // ── Time management action ──
  const timeErrors = errorPatterns.counts[ERROR_TYPES.TIME_PRESSURE] || 0;
  if (timeErrors >= 3) {
    actions.push({
      priority: 3,
      type: 'strategy',
      title: 'Improve time management',
      description: `${timeErrors} questions were affected by time pressure`,
      estimatedGain: Math.round(timeErrors * 8),
      effort: 'medium',
      category: 'strategy',
      actionItems: [
        'Spend max 90 seconds per easy question, 2 minutes per medium',
        'If stuck for over 2 minutes on a hard question, flag it and move on',
        'Use the last 5 minutes of each module to review flagged questions',
      ],
    });
  }

  // ── Easy question accuracy action ──
  const easyMissed = scoreProjection.easyWins.count;
  if (easyMissed >= 2) {
    actions.push({
      priority: 1,
      type: 'strategy',
      title: `Stop missing easy questions (${easyMissed} missed)`,
      description: scoreProjection.easyWins.description,
      estimatedGain: scoreProjection.easyWins.projectedGain,
      effort: 'low',
      category: 'quick_win',
      actionItems: [
        'Easy questions should take under 90 seconds — if it\'s taking longer, re-read the problem',
        'These questions test straightforward application of concepts',
        'Getting all easy questions right is the #1 score booster on the SAT',
      ],
    });
  }

  // Sort by priority and estimated gain
  actions.sort((a, b) => {
    // Quick wins first, then by estimated gain
    if (a.category === 'quick_win' && b.category !== 'quick_win') return -1;
    if (b.category === 'quick_win' && a.category !== 'quick_win') return 1;
    return b.estimatedGain - a.estimatedGain;
  });

  return actions;
};

// ═══════════════════════════════════════════════════════════════════════════
// TIME-VS-DIFFICULTY HELPER
// ═══════════════════════════════════════════════════════════════════════════

const categorizeTimeForDifficulty = (timeSpent, difficulty) => {
  const diff = difficulty || 'medium';
  const thresholds = {
    easy:   { fast: 30, normal: 90,  slow: 150 },
    medium: { fast: 45, normal: 150, slow: 210 },
    hard:   { fast: 60, normal: 210, slow: 300 },
  };
  const t = thresholds[diff] || thresholds.medium;
  if (timeSpent < t.fast) return 'rushed';
  if (timeSpent <= t.normal) return 'normal';
  if (timeSpent <= t.slow) return 'slow';
  return 'very_slow';
};

// ═══════════════════════════════════════════════════════════════════════════
// ROOT-CAUSE CLUSTERING
// ═══════════════════════════════════════════════════════════════════════════

const analyzeRootCauseClusters = (questionAnalysis, stamina) => {
  const wrong = questionAnalysis.filter(q => !q.isCorrect);
  const clusters = [];

  const conceptGaps = wrong.filter(q => q.errorType === ERROR_TYPES.CONCEPTUAL_GAP);
  if (conceptGaps.length >= 2) {
    const skillFreq = {};
    conceptGaps.forEach(q => {
      (q.skills || []).forEach(s => { skillFreq[s] = (skillFreq[s] || 0) + 1; });
    });
    const recurring = Object.entries(skillFreq).filter(([, c]) => c >= 2);
    clusters.push({
      id: 'recurring-concept-gaps',
      label: 'Recurring Concept Gaps',
      severity: conceptGaps.length >= 4 ? 'critical' : 'moderate',
      count: conceptGaps.length,
      description: recurring.length > 0
        ? `${conceptGaps.length} questions missed due to concept gaps, with ${recurring.length} skill(s) appearing 2+ times`
        : `${conceptGaps.length} questions missed from conceptual gaps across different skills`,
      questions: conceptGaps.map(q => q.key),
      recurringSkills: recurring.map(([id, c]) => ({ skillId: id, name: (getSkillById(id) || {}).name || id, count: c })),
    });
  }

  const procedural = wrong.filter(q => q.errorType === ERROR_TYPES.PROCEDURAL_ERROR);
  if (procedural.length >= 2) {
    clusters.push({
      id: 'execution-instability',
      label: 'Execution / Procedural Instability',
      severity: procedural.length >= 4 ? 'critical' : 'moderate',
      count: procedural.length,
      description: `${procedural.length} questions where you understood the concept but made errors in execution`,
      questions: procedural.map(q => q.key),
    });
  }

  const pacingMisses = wrong.filter(q =>
    q.errorType === ERROR_TYPES.TIME_PRESSURE ||
    q.timeVsDifficulty === 'rushed'
  );
  if (pacingMisses.length >= 2) {
    clusters.push({
      id: 'pacing-related-misses',
      label: 'Pacing-Related Misses',
      severity: pacingMisses.length >= 4 ? 'critical' : 'moderate',
      count: pacingMisses.length,
      description: `${pacingMisses.length} questions lost to rushing or time pressure`,
      questions: pacingMisses.map(q => q.key),
    });
  }

  const answerChangeLosses = wrong.filter(q => q.answerChangeCount > 0);
  if (answerChangeLosses.length >= 2) {
    clusters.push({
      id: 'second-guessing-losses',
      label: 'Second-Guessing / Answer-Change Losses',
      severity: answerChangeLosses.length >= 3 ? 'critical' : 'moderate',
      count: answerChangeLosses.length,
      description: `${answerChangeLosses.length} wrong answers had at least one answer change — second-guessing may be hurting`,
      questions: answerChangeLosses.map(q => q.key),
    });
  }

  if (stamina?.hasData && stamina.dropoff > 15) {
    const q3q4 = wrong.filter(q => {
      const total = questionAnalysis.length;
      return q.questionNumber > Math.floor(total * 0.5);
    });
    if (q3q4.length >= 2) {
      clusters.push({
        id: 'fatigue-related-decline',
        label: 'Fatigue-Related Decline',
        severity: stamina.dropoff > 25 ? 'critical' : 'moderate',
        count: q3q4.length,
        description: `${q3q4.length} of your misses came in the second half (${stamina.dropoff}% accuracy drop)`,
        questions: q3q4.map(q => q.key),
      });
    }
  }

  const calcWrong = wrong.filter(q => q.usedCalculator);
  if (calcWrong.length >= 2) {
    clusters.push({
      id: 'calculator-dependency',
      label: 'Calculator Dependency',
      severity: calcWrong.length >= 4 ? 'moderate' : 'low',
      count: calcWrong.length,
      description: `${calcWrong.length} wrong answers involved calculator use — computation errors or over-reliance`,
      questions: calcWrong.map(q => q.key),
    });
  }

  return clusters.sort((a, b) => b.count - a.count);
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

const getSkillTrendFromHistory = (skillData) => {
  if (!skillData?.history || skillData.history.length < 4) return 'unknown';
  const history = skillData.history;
  const recent = history.slice(-Math.floor(history.length / 2));
  const older = history.slice(0, Math.floor(history.length / 2));
  const recentRate = recent.filter(h => h.correct).length / recent.length;
  const olderRate = older.filter(h => h.correct).length / older.length;
  if (recentRate - olderRate > 0.15) return 'improving';
  if (recentRate - olderRate < -0.15) return 'declining';
  return 'stable';
};

const getMostCommonErrorType = (errorTypes) => {
  if (!errorTypes || errorTypes.length === 0) return null;
  const counts = {};
  errorTypes.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};

const generateSkillActionItems = (skill) => {
  const items = [];
  if (skill.modules?.length > 0) {
    items.push(`Watch the ${skill.modules[0]} video lessons on this topic`);
  }
  if (skill.sections?.length > 0) {
    items.push(`Complete the "${skill.sections[0]}" practice section`);
  }
  if (skill.primaryErrorType === ERROR_TYPES.CONCEPTUAL_GAP) {
    items.push('Start with the lesson content before attempting practice questions');
  } else if (skill.primaryErrorType === ERROR_TYPES.PROCEDURAL_ERROR) {
    items.push('Practice more problems — you understand the concept but need to nail the execution');
  }
  return items;
};

const generateTrendMessage = (scoreChange, trend) => {
  // Null = the last two attempts are on different scales (section vs
  // composite) — no honest delta exists.
  if (scoreChange === null || scoreChange === undefined) {
    return 'Your recent tests were scored on different scales — keep taking full tests to track your composite trend.';
  }
  if (scoreChange > 30) return `Amazing improvement! You jumped +${scoreChange} points! Your study plan is working.`;
  if (scoreChange > 10) return `Good progress! +${scoreChange} points since your last test. Keep it up!`;
  if (scoreChange > 0) return `Slight improvement (+${scoreChange} points). Stay consistent with your study plan.`;
  if (scoreChange === 0) return 'Same score as last time. Review your study plan and focus on your weak areas.';
  if (scoreChange > -20) return `Score dipped ${scoreChange} points. Don't worry — focus on the areas flagged below.`;
  return `Score dropped ${scoreChange} points. Let's adjust your study plan to address the gaps.`;
};

// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED ANALYTICS — What makes PerformSAT #1
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Score Confidence Interval
 * Uses binomial confidence interval to estimate true score range.
 * A student who got 30/44 could truly be a 27-33/44 student.
 * This prevents over-indexing on a single test result.
 */
const calculateConfidenceInterval = (correct, total, scaledScore, isMultiSection = false, section = 'math', route = 'hard') => {
  const p = correct / total;
  const z95 = 1.96;
  const z80 = 1.28;

  // Wilson score interval (better than normal approximation for small n)
  const wilson = (z) => {
    const denom = 1 + z * z / total;
    const center = (p + z * z / (2 * total)) / denom;
    const spread = (z * Math.sqrt(p * (1 - p) / total + z * z / (4 * total * total))) / denom;
    return {
      low: Math.max(0, Math.round((center - spread) * total)),
      high: Math.min(total, Math.round((center + spread) * total)),
    };
  };

  const ci95 = wilson(z95);
  const ci80 = wilson(z80);

  const rawToScaledCI = (raw) => convertToSATScore(raw, total, {
    section,
    route: section === 'math' ? route : 'hard',
  });

  // The raw→scaled conversion is single-section (200-800); a composite
  // headline has no honest scaled CI on that curve, so multi-section reports
  // keep the raw bounds and a raw-count message instead of a wrong range.
  if (isMultiSection) {
    return {
      raw95: ci95,
      raw80: ci80,
      scaled95: null,
      scaled80: null,
      reliability: total >= 30 ? 'high' : total >= 20 ? 'moderate' : 'low',
      message: `On a retake you'd likely answer between ${ci80.low} and ${ci80.high} of ${total} correctly (80% confidence)`,
    };
  }

  return {
    raw95: ci95,
    raw80: ci80,
    scaled95: { low: rawToScaledCI(ci95.low), high: rawToScaledCI(ci95.high) },
    scaled80: { low: rawToScaledCI(ci80.low), high: rawToScaledCI(ci80.high) },
    reliability: total >= 30 ? 'high' : total >= 20 ? 'moderate' : 'low',
    message: `Your true score is likely between ${rawToScaledCI(ci80.low)} and ${rawToScaledCI(ci80.high)} (80% confidence)`,
  };
};

/**
 * Learning Velocity
 * Tracks how fast the student is improving per unit of effort.
 * Compares across tests to estimate points-per-week trajectory.
 */
const calculateLearningVelocity = (previousTests, currentScore, isMultiSection = false) => {
  const testHistory = Object.values(previousTests || {})
    .filter(t => t.bestScaledScore && t.completedAt)
    // Velocity is only meaningful across like scales — a 200-800 section-era
    // best next to a 400-1600 composite reads as a +600/week miracle.
    .filter(t => !!t.isMultiSection === !!isMultiSection)
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

  if (testHistory.length < 1) {
    return { hasData: false, velocity: 0, trend: 'insufficient_data', message: 'Take more tests to track your learning speed' };
  }

  const firstTest = testHistory[0];
  const firstScore = firstTest.bestScaledScore;
  const firstDate = new Date(firstTest.completedAt);
  const now = new Date();
  const weeksElapsed = Math.max(1, (now - firstDate) / (7 * 24 * 60 * 60 * 1000));

  const totalGain = currentScore - firstScore;
  const pointsPerWeek = totalGain / weeksElapsed;

  // Calculate acceleration (is velocity increasing or decreasing?)
  let acceleration = 0;
  if (testHistory.length >= 3) {
    const midIdx = Math.floor(testHistory.length / 2);
    const earlyGain = testHistory[midIdx].bestScaledScore - firstScore;
    const lateGain = currentScore - testHistory[midIdx].bestScaledScore;
    const earlyWeeks = Math.max(1, (new Date(testHistory[midIdx].completedAt) - firstDate) / (7 * 24 * 60 * 60 * 1000));
    const lateWeeks = Math.max(1, weeksElapsed - earlyWeeks);
    acceleration = (lateGain / lateWeeks) - (earlyGain / earlyWeeks);
  }

  let trend, message;
  if (pointsPerWeek > 5) {
    trend = 'rapid';
    message = `Gaining ~${Math.round(pointsPerWeek)} points/week — exceptional pace!`;
  } else if (pointsPerWeek > 2) {
    trend = 'strong';
    message = `Gaining ~${Math.round(pointsPerWeek)} points/week — solid progress.`;
  } else if (pointsPerWeek > 0.5) {
    trend = 'steady';
    message = `Gaining ~${pointsPerWeek.toFixed(1)} points/week — steady improvement.`;
  } else if (pointsPerWeek >= 0) {
    trend = 'plateau';
    message = 'Progress has plateaued. Time to change your approach.';
  } else {
    trend = 'declining';
    message = `Score declining ~${Math.abs(pointsPerWeek).toFixed(1)} points/week. Let's refocus.`;
  }

  return {
    hasData: true,
    velocity: Math.round(pointsPerWeek * 10) / 10,
    acceleration: Math.round(acceleration * 10) / 10,
    totalGain,
    weeksElapsed: Math.round(weeksElapsed * 10) / 10,
    testsCompleted: testHistory.length + 1,
    trend,
    message,
    // Project where student will be at test day
    projectedAtTestDay: (targetDate) => {
      if (!targetDate) return null;
      const weeksToTest = Math.max(0, (new Date(targetDate) - now) / (7 * 24 * 60 * 60 * 1000));
      const projected = Math.round(currentScore + pointsPerWeek * weeksToTest);
      return Math.min(800, Math.max(200, projected));
    }
  };
};

/**
 * Skill Clustering Analysis
 * Identifies skills that fail together — suggests underlying conceptual gaps.
 * If a student misses "slope-from-points" AND "parallel-line-slope",
 * the root issue is likely "understanding slope" not two separate skills.
 */
const analyzeSkillClusters = (questionAnalysis) => {
  const wrongBySkill = {};
  questionAnalysis.filter(q => !q.isCorrect).forEach(q => {
    (q.skills || []).forEach(skill => {
      if (!wrongBySkill[skill]) wrongBySkill[skill] = [];
      wrongBySkill[skill].push(q);
    });
  });

  // Define skill families (skills that share underlying concepts)
  const SKILL_FAMILIES = {
    'slope-mastery': ['slope-from-points', 'slope-intercept-form', 'parallel-line-slope', 'perpendicular-negative-reciprocal', 'writing-parallel-equation', 'writing-perpendicular-equation'],
    'equation-building': ['word-problem-to-equation', 'table-to-equation', 'systems-from-word-problems', 'inequality-from-context'],
    'quadratic-mastery': ['factoring', 'quadratic-formula', 'completing-the-square', 'vertex-form', 'discriminant', 'quadratic-functions'],
    'function-understanding': ['function-notation', 'domain-restrictions', 'function-composition', 'function-interpretation', 'function-evaluation'],
    'proportion-reasoning': ['ratio-setup', 'proportion-solving', 'unit-rate', 'scale-factor', 'percent-change', 'percent-of-percent'],
    'geometry-foundations': ['area-formulas', 'perimeter-formulas', 'volume-formulas', 'circle-area-circumference', 'pythagorean-theorem'],
    'coordinate-geometry': ['midpoint-formula', 'distance-formula', 'circle-equation', 'equation-of-line'],
    'data-literacy': ['mean-median-mode', 'standard-deviation-concept', 'reading-scatterplots', 'reading-bar-charts', 'line-of-best-fit'],
    'exponent-rules': ['exponent-rules', 'negative-exponents', 'rational-exponents', 'exponential-growth-decay'],
  };

  const clusters = [];
  const wrongSkillNames = Object.keys(wrongBySkill);

  for (const [familyName, familySkills] of Object.entries(SKILL_FAMILIES)) {
    const failedInFamily = familySkills.filter(s => wrongSkillNames.includes(s));
    if (failedInFamily.length >= 2) {
      clusters.push({
        name: familyName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        rootConcept: familyName,
        failedSkills: failedInFamily,
        totalSkillsInFamily: familySkills.length,
        failRate: Math.round((failedInFamily.length / familySkills.length) * 100),
        severity: failedInFamily.length >= 3 ? 'critical' : 'moderate',
        recommendation: failedInFamily.length >= 3
          ? `Start from the fundamentals of ${familyName.replace(/-/g, ' ')} — multiple related skills are weak`
          : `Review the core concept connecting these skills before practicing individually`,
        questionsAffected: failedInFamily.reduce((sum, s) => sum + wrongBySkill[s].length, 0),
      });
    }
  }

  return clusters.sort((a, b) => b.questionsAffected - a.questionsAffected);
};

/**
 * Answer Pattern Analysis
 * Detects systematic biases in how students pick answers:
 * - Position bias (always picks C)
 * - First instinct accuracy (changed answers help or hurt?)
 * - Elimination effectiveness (skip patterns)
 */
const analyzeAnswerPatterns = (questionAnalysis, diagnosticData) => {
  const choiceCounts = { A: 0, B: 0, C: 0, D: 0 };
  const choiceCorrect = { A: 0, B: 0, C: 0, D: 0 };
  let changedToCorrect = 0;
  let changedToWrong = 0;
  let totalChanged = 0;
  let totalAnswered = 0;
  // Denominator for position bias: only entries with an A-D letter answer
  // count. Fill-ins (numeric answers) and legacy correct-answer records
  // without a userAnswer would otherwise deflate every letter's share and
  // fabricate a "systematic bias" warning.
  let letterAnswered = 0;

  questionAnalysis.forEach((q, idx) => {
    if (q.isUnanswered) return;
    totalAnswered++;

    // Map answer to letter position
    const choiceIds = ['A', 'B', 'C', 'D'];
    const answerIdx = choiceIds.indexOf(q.userAnswer?.toUpperCase?.());
    if (answerIdx >= 0) {
      letterAnswered++;
      choiceCounts[choiceIds[answerIdx]]++;
      if (q.isCorrect) choiceCorrect[choiceIds[answerIdx]]++;
    }

    const telemetry = diagnosticData?.questionDetails?.[q.key] || diagnosticData?.questionTelemetry?.[q.key] || {};
    if (telemetry.answerChanges > 0) {
      totalChanged++;
      if (q.isCorrect) changedToCorrect++;
      else changedToWrong++;
    }
  });

  // Detect position bias
  const expectedPct = 25;
  const positionBias = Object.entries(choiceCounts).map(([letter, count]) => ({
    letter,
    count,
    percent: letterAnswered > 0 ? Math.round((count / letterAnswered) * 100) : 0,
    deviation: letterAnswered > 0 ? Math.round((count / letterAnswered) * 100) - expectedPct : 0,
  })).sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation));

  // Bias means OVER-picking a letter. An under-picked letter is just the
  // arithmetic complement of the others — warning on any |deviation| flagged
  // nearly every student.
  const strongBias = positionBias.find(p => p.deviation > 15);

  // First instinct analysis
  const firstInstinctAccuracy = totalChanged > 0
    ? Math.round((changedToCorrect / totalChanged) * 100)
    : null;

  const firstInstinctAdvice = firstInstinctAccuracy !== null
    ? firstInstinctAccuracy < 40
      ? 'Your first instinct is usually better — trust it more!'
      : firstInstinctAccuracy > 70
        ? 'Good instinct for when to change answers — keep reviewing when unsure'
        : 'Answer changes are 50/50 — only change if you find a clear reason'
    : 'Not enough data on answer changes yet';

  let eliminationsUsed = 0;
  let eliminationsCorrect = 0;
  questionAnalysis.forEach(q => {
    if ((q.eliminatedChoices || []).length > 0) {
      eliminationsUsed++;
      if (q.isCorrect) eliminationsCorrect++;
    }
  });
  const eliminationAccuracy = eliminationsUsed > 0
    ? Math.round((eliminationsCorrect / eliminationsUsed) * 100)
    : null;

  return {
    positionBias,
    hasPositionBias: !!strongBias,
    biasWarning: strongBias ? `You chose "${strongBias.letter}" ${strongBias.percent}% of the time (expected ~25%). Be careful of systematic bias.` : null,
    answerChanges: {
      total: totalChanged,
      changedToCorrect,
      changedToWrong,
      firstInstinctAccuracy,
      advice: firstInstinctAdvice,
    },
    elimination: {
      used: eliminationsUsed,
      correct: eliminationsCorrect,
      accuracy: eliminationAccuracy,
      insight: eliminationsUsed === 0
        ? 'No elimination used — try eliminating at least one wrong choice before answering'
        : eliminationAccuracy >= 70
          ? `Elimination used on ${eliminationsUsed} questions with ${eliminationAccuracy}% accuracy — effective strategy`
          : `Elimination used on ${eliminationsUsed} questions but only ${eliminationAccuracy}% accuracy — refine your elimination criteria`,
    },
    totalAnswered,
  };
};

/**
 * Stamina Score
 * Measures performance degradation over the course of the test.
 * Compares accuracy in quartiles to detect fatigue.
 */
const analyzeStamina = (questionAnalysis) => {
  const total = questionAnalysis.length;
  if (total < 8) return { hasData: false };

  // Quartile WITHIN each section, then pool by relative position. On a full SAT
  // items are ordered R&W-then-Math, so whole-test quartiles would put R&W in
  // Q1-Q2 and Math in Q3-Q4 and read the section accuracy gap as a stamina
  // collapse. Per-section quartiles measure real within-section fade; a
  // single-section test collapses to one group (legacy behavior preserved).
  const staminaBySection = new Map();
  for (const q of questionAnalysis) {
    const sec = q.section || 'math';
    if (!staminaBySection.has(sec)) staminaBySection.set(sec, []);
    staminaBySection.get(sec).push(q);
  }
  const buckets = [[], [], [], []];
  for (const items of staminaBySection.values()) {
    const n = items.length;
    if (n < 4) continue; // too short to quartile meaningfully
    const e1 = Math.floor(n * 0.25);
    const e2 = Math.floor(n * 0.5);
    const e3 = Math.floor(n * 0.75);
    [items.slice(0, e1), items.slice(e1, e2), items.slice(e2, e3), items.slice(e3)]
      .forEach((slice, i) => buckets[i].push(...slice));
  }
  // Degenerate fallback (no section had >= 4 items): quartile the whole list.
  if (buckets.every(b => b.length === 0)) {
    const e1 = Math.floor(total * 0.25);
    const e2 = Math.floor(total * 0.5);
    const e3 = Math.floor(total * 0.75);
    buckets[0] = questionAnalysis.slice(0, e1);
    buckets[1] = questionAnalysis.slice(e1, e2);
    buckets[2] = questionAnalysis.slice(e2, e3);
    buckets[3] = questionAnalysis.slice(e3);
  }

  const quarters = [
    { label: 'Q1 (Start)', questions: buckets[0] },
    { label: 'Q2', questions: buckets[1] },
    { label: 'Q3', questions: buckets[2] },
    { label: 'Q4 (End)', questions: buckets[3] },
  ].map(q => ({
    ...q,
    total: q.questions.length,
    correct: q.questions.filter(x => x.isCorrect).length,
    accuracy: q.questions.length > 0 ? Math.round((q.questions.filter(x => x.isCorrect).length / q.questions.length) * 100) : 0,
    avgTime: q.questions.length > 0
      ? Math.round(q.questions.reduce((s, x) => s + (x.timeSpent || 0), 0) / q.questions.length)
      : 0,
  }));

  const startAccuracy = quarters[0].accuracy;
  const endAccuracy = quarters[3].accuracy;
  const dropoff = startAccuracy - endAccuracy;

  // Stamina score: 100 = no dropoff, 0 = total collapse
  const staminaScore = Math.max(0, Math.min(100, 100 - Math.max(0, dropoff) * 2));

  let rating, message;
  if (staminaScore >= 85) {
    rating = 'excellent';
    message = 'Rock solid focus throughout the test. Your endurance is a strength.';
  } else if (staminaScore >= 70) {
    rating = 'good';
    message = 'Slight dip at the end. Practice full-length sessions to build stamina.';
  } else if (staminaScore >= 50) {
    rating = 'fair';
    message = `Accuracy dropped ${dropoff}% by test end. Build test-taking endurance with timed practice.`;
  } else {
    rating = 'needs_work';
    message = `Significant fatigue: ${dropoff}% accuracy drop. Try practice tests with breaks, then gradually eliminate breaks.`;
  }

  return {
    hasData: true,
    quarters,
    staminaScore,
    rating,
    dropoff,
    message,
  };
};

/**
 * National Percentile Estimation
 * Estimates where the student falls among all SAT test-takers.
 * Based on published College Board score distributions.
 */
const estimatePercentile = (scaledScore) => {
  const percentile = _estimatePercentile(scaledScore);

  let tier;
  if (percentile >= 95) tier = 'elite';
  else if (percentile >= 85) tier = 'excellent';
  else if (percentile >= 70) tier = 'above_average';
  else if (percentile >= 50) tier = 'average';
  else if (percentile >= 30) tier = 'below_average';
  else tier = 'needs_significant_work';

  return { percentile, tier, score: scaledScore };
};

/**
 * Mistake Fingerprint
 * Creates a unique "signature" of a student's error patterns that
 * persists across tests. This helps identify deep-rooted habits.
 */
const generateMistakeFingerprint = (diagnostic, previousTests) => {
  const { errorPatterns, domainAnalysis, difficultyAnalysis, timeAnalysis } = diagnostic;

  const fingerprint = {
    // Primary weakness archetype
    archetype: 'balanced',
    archetypeLabel: 'Balanced Learner',
    archetypeDescription: '',
    traits: [],
    persistentWeaknesses: [],
  };

  // Determine archetype from dominant error pattern
  const trapPct = (errorPatterns.summary.find(s => s.type === ERROR_TYPES.TRAP_SUSCEPTIBILITY)?.percentage || 0);
  const carelessPct = (errorPatterns.summary.find(s => s.type === ERROR_TYPES.CARELESS_ERROR)?.percentage || 0);
  const conceptPct = (errorPatterns.summary.find(s => s.type === ERROR_TYPES.CONCEPTUAL_GAP)?.percentage || 0);
  const timePct = (errorPatterns.summary.find(s => s.type === ERROR_TYPES.TIME_PRESSURE)?.percentage || 0);

  if (conceptPct >= 40) {
    fingerprint.archetype = 'knowledge_builder';
    fingerprint.archetypeLabel = 'The Knowledge Builder';
    fingerprint.archetypeDescription = 'Your main opportunity is building deeper understanding of key concepts. Once you fill these gaps, your score will jump significantly.';
  } else if (trapPct >= 30) {
    fingerprint.archetype = 'trap_prone';
    fingerprint.archetypeLabel = 'The Trap Dodger';
    fingerprint.archetypeDescription = 'You know the math but fall for cleverly designed wrong answers. Learning to spot traps is your fastest path to a higher score.';
  } else if (carelessPct >= 30) {
    fingerprint.archetype = 'precision_seeker';
    fingerprint.archetypeLabel = 'The Precision Seeker';
    fingerprint.archetypeDescription = 'You understand the material well but lose points to avoidable mistakes. Slowing down on easy questions will recover the most points.';
  } else if (timePct >= 30) {
    fingerprint.archetype = 'speed_builder';
    fingerprint.archetypeLabel = 'The Speed Builder';
    fingerprint.archetypeDescription = 'You can solve problems correctly but need more time. Building fluency through timed practice will unlock your full potential.';
  } else {
    fingerprint.archetype = 'balanced';
    fingerprint.archetypeLabel = 'The All-Rounder';
    fingerprint.archetypeDescription = 'Your errors are spread across categories. A well-rounded study plan will yield the best results.';
  }

  // Add specific traits
  if (difficultyAnalysis?.levels?.easy?.accuracy < 85) {
    fingerprint.traits.push({ trait: 'Easy question vulnerability', severity: 'high', tip: 'You\'re leaving easy points on the table' });
  }
  if (timeAnalysis?.fadeEffect > 20) {
    fingerprint.traits.push({ trait: 'Late-test fatigue', severity: 'moderate', tip: 'Practice with full-length timed tests' });
  }
  const weakestDomain = domainAnalysis?.sort((a, b) => a.accuracy - b.accuracy)?.[0];
  if (weakestDomain?.accuracy < 50) {
    fingerprint.traits.push({ trait: `${weakestDomain.displayName} gap`, severity: 'high', tip: `Focus study time on ${weakestDomain.displayName}` });
  }

  return fingerprint;
};

/**
 * Score Breakdown by Time Invested
 * Shows ROI: "You spent 40% of time on Algebra but only got 60% accuracy there"
 */
const analyzeTimeAllocation = (questionAnalysis) => {
  const domainTime = {};
  const domainCorrect = {};
  const domainTotal = {};
  let totalTime = 0;

  questionAnalysis.forEach(q => {
    const domain = q.domain || 'Unknown';
    const time = q.timeSpent || 0;
    domainTime[domain] = (domainTime[domain] || 0) + time;
    domainTotal[domain] = (domainTotal[domain] || 0) + 1;
    if (q.isCorrect) domainCorrect[domain] = (domainCorrect[domain] || 0) + 1;
    totalTime += time;
  });

  return Object.keys(domainTime).map(domain => ({
    domain,
    timeSpent: domainTime[domain],
    timePct: totalTime > 0 ? Math.round((domainTime[domain] / totalTime) * 100) : 0,
    accuracy: domainTotal[domain] > 0 ? Math.round(((domainCorrect[domain] || 0) / domainTotal[domain]) * 100) : 0,
    questionCount: domainTotal[domain],
    efficiency: domainTotal[domain] > 0 && domainTime[domain] > 0
      ? Math.round(((domainCorrect[domain] || 0) / domainTime[domain]) * 6000) // correct per minute * 100
      : 0,
    isOverinvested: (domainTime[domain] / totalTime) > 0.35 && ((domainCorrect[domain] || 0) / domainTotal[domain]) < 0.5,
  })).sort((a, b) => a.accuracy - b.accuracy);
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// DIAGNOSTIC SENTENCE — Day 5 D3 (italic editorial copy from a weakness)
// ═══════════════════════════════════════════════════════════════════════════

// Normalize the various errorType shapes that arrive on weakness objects:
//   - canonical id string ('conceptual_gap')
//   - capitalized label ('Conceptual Gap')
//   - title-cased + spaces ('Conceptual gap')
function normalizeErrorTypeId(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // Already a canonical id?
  const ids = Object.values(ERROR_TYPES);
  if (ids.includes(trimmed)) return trimmed;
  // snake_case / SCREAMING_SNAKE_CASE
  const snakeUp = trimmed.toLowerCase().replace(/[\s-]+/g, '_');
  if (ids.includes(snakeUp)) return snakeUp;
  // From label form
  const labelMatch = Object.entries(ERROR_TYPE_LABELS).find(
    ([, label]) => label.toLowerCase() === trimmed.toLowerCase(),
  );
  if (labelMatch) return labelMatch[0];
  return null;
}

// ── Editorial diagnostic sentences ──────────────────────────────────────────
//
// Each weakness gets ONE coach sentence under its Focus Area card, rendered
// serif-italic at the call site. Design rules (2026-06 personalization
// overhaul):
//
//   1. Never dump the raw `evidence` blob into the sentence — it repeats the
//      error type the sentence already states and reads like a log line
//      ("( 0/8 correct, primary error: Time Pressure, avg 3s/q...)").
//      Parse the structured facts out and weave them into prose instead.
//   2. Vary the frame. Six weaknesses sharing an error type used to render
//      the identical sentence six times — the single loudest "this is a
//      template" tell on the page. Frames rotate deterministically by
//      skillId so a given skill keeps its sentence across renders, but
//      neighboring cards read differently.
//   3. Cite history when we have it. "It's been sliding across your last
//      tests" is the difference between a coach and a label-maker.

/** Parse the structured facts PracticeTest embeds in the evidence string. */
function parseEvidenceFacts(evidence) {
  const facts = { correct: null, total: null, historicalMastery: null, trend: null, firstTime: false };
  if (!evidence || typeof evidence !== 'string') return facts;
  const frac = evidence.match(/(\d+)\s*\/\s*(\d+)\s*correct/);
  if (frac) {
    facts.correct = parseInt(frac[1], 10);
    facts.total = parseInt(frac[2], 10);
  }
  const hist = evidence.match(/historical mastery\s+(\d+)%/);
  if (hist) facts.historicalMastery = parseInt(hist[1], 10);
  if (/\(declining\)/.test(evidence)) facts.trend = 'declining';
  else if (/\(improving\)/.test(evidence)) facts.trend = 'improving';
  if (/first time tested/.test(evidence)) facts.firstTime = true;
  return facts;
}

/** Stable per-skill frame index so variation doesn't reshuffle every render. */
function frameIndexFor(key, frameCount) {
  if (!key || frameCount <= 1) return 0;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 997;
  return h % frameCount;
}

/** "0 of 8 this test" / "scored 32% here" — whichever facts we actually have. */
function missPhrase(facts, accuracy) {
  if (facts.correct !== null && facts.total !== null) {
    return `${facts.correct} of ${facts.total} this test`;
  }
  if (typeof accuracy === 'number') return `${Math.round(accuracy)}% on this test`;
  return null;
}

/** History clause — only when the data earns it. Always comma-led: most
 *  frames already carry one internal em-dash, and a dash-led clause chained
 *  a second one into routine two-dash run-ons (caught in review). */
function historyClause(facts) {
  if (facts.trend === 'declining' && facts.historicalMastery !== null) {
    return `, and it's been sliding, down from ${facts.historicalMastery}% across your earlier tests`;
  }
  if (facts.trend === 'declining') return `, and it's been sliding across your last tests`;
  if (facts.trend === 'improving') return `, though it's already trending back up`;
  if (facts.firstTime) return `, first time we've tested it`;
  if (facts.historicalMastery !== null) {
    return `, in line with your ${facts.historicalMastery}% across earlier tests`;
  }
  return '';
}

// Frame sets per error class. Every frame must cite at least one number the
// student can verify, and end with one concrete instruction (tips belong in
// the plan — that's the contract; the diagnostic REPORT stays pure narrative).
const FRAMES_BY_ERROR_TYPE = {
  [ERROR_TYPES.CONCEPTUAL_GAP]: [
    ({ skill, miss, hist }) =>
      `${skill} isn't rusty — it's missing: ${miss}${hist}. Rebuild it from the concept up, not with more timed reps.`,
    ({ skill, miss, hist }) =>
      `You're not slipping on ${skill} — the concept never landed (${miss}${hist}). Start from the definition, then drill.`,
  ],
  [ERROR_TYPES.PROCEDURAL_ERROR]: [
    // Verbs stay occasion-neutral ("slipped", "baited") — a repetition-
    // implying opener ("keeps", "leaks") contradicts the first-time-tested
    // history clause in the same sentence (caught in review).
    ({ skill, miss, hist }) =>
      `You know what ${skill} is asking — the execution slipped mid-solve (${miss}${hist}). Write every step this week; speed comes back on its own.`,
    ({ skill, miss, hist }) =>
      `${skill}: right idea, wrong arithmetic — ${miss}${hist}. Slow the algebra until it stops costing points.`,
  ],
  [ERROR_TYPES.TRAP_SUSCEPTIBILITY]: [
    ({ skill, miss, hist }) =>
      `Your ${skill} misses were the designed-to-tempt answers (${miss}${hist}). Predict the trap before you look at the choices.`,
    ({ skill, miss, hist }) =>
      `${skill} baited you into the first-glance answer — ${miss}${hist}. Eliminate before you choose.`,
  ],
  [ERROR_TYPES.TIME_PRESSURE]: [
    ({ skill, miss, hist }) =>
      `${skill} broke under the clock, not on the math — ${miss}${hist}. Drill it untimed until it's automatic, then add the timer back.`,
    ({ skill, miss, hist }) =>
      `The clock beat you on ${skill}, not the content (${miss}${hist}). Untimed first; bring time pressure back once accuracy holds.`,
  ],
  [ERROR_TYPES.CARELESS_ERROR]: [
    ({ skill, miss, hist }) =>
      `${skill} is yours on a careful day — these were slips, not gaps (${miss}${hist}). Re-read the question before you commit.`,
    ({ skill, miss, hist }) =>
      `Nothing about ${skill} is beyond you (${miss}${hist}) — these were avoidable. Check what the question actually asks before answering.`,
  ],
  [ERROR_TYPES.UNANSWERED]: [
    ({ skill, miss, hist }) =>
      `You left ${skill} questions blank (${miss}${hist}). After eliminating two choices, a guess beats a blank every time.`,
  ],
};

/**
 * formatDiagnosticSentence — turn a weakness into an italic editorial line.
 *
 * Parses the structured facts out of `weakness.evidence` (counts, history,
 * trend) and renders one of several rotating coach-voice frames per error
 * class, so adjacent Focus Area cards never repeat the same sentence shape.
 * Frame choice is deterministic per skillId.
 *
 * Input weakness shape (from `studyPlan.weaknesses` / `groundTruthDiagnosis`):
 *   {
 *     skill?: string,                  display name ("Slope-intercept form")
 *     skillId?: string,                fallback when skill is missing
 *     errorType?: string,              canonical id OR label OR snake/Title case
 *     evidence?: string,               e.g. "0/8 correct, primary error: ..."
 *     accuracy?: number,               percentage 0-100
 *   }
 *
 * Output: a single 1-2 sentence string. Always non-empty when a skill or
 * accuracy exists (generic fallback covers missing errorType).
 *
 * @param {object} weakness
 * @returns {string}
 */
export function formatDiagnosticSentence(weakness) {
  if (!weakness || typeof weakness !== 'object') return '';

  const skill = weakness.skill || (weakness.skillId
    ? (getCBSkillLabel(weakness.skillId) || formatPatternLabel(weakness.skillId) || weakness.skillId)
    : null);
  const errorTypeId = normalizeErrorTypeId(weakness.errorType);
  const facts = parseEvidenceFacts(weakness.evidence);
  const miss = missPhrase(facts, weakness.accuracy);

  // Sample-size honesty (evidence rework): a 'suspected' flag means fewer
  // than 4 attempted questions sit behind this card. Say so — students trust
  // a diagnosis more when it admits how much evidence it rests on, and the
  // first drill doubles as the probe that confirms or clears it.
  const suspectedClause = weakness.evidenceLevel === 'suspected'
    ? (typeof weakness.attempted === 'number' && weakness.attempted > 0
      ? ` That read comes from just ${weakness.attempted} question${weakness.attempted === 1 ? '' : 's'} — the first drill here confirms it.`
      : ' Thin evidence so far — the first drill here confirms it.')
    : '';

  if (errorTypeId && FRAMES_BY_ERROR_TYPE[errorTypeId] && skill && miss) {
    const frames = FRAMES_BY_ERROR_TYPE[errorTypeId];
    const frame = frames[frameIndexFor(weakness.skillId || skill, frames.length)];
    return frame({ skill, miss, hist: historyClause(facts) }) + suspectedClause;
  }

  // Fallback — generic prose that still reads like editorial.
  if (typeof weakness.accuracy === 'number') {
    const acc = Math.round(weakness.accuracy);
    if (skill) {
      return `${skill}: ${acc}% this test${historyClause(facts)}. Worth a closer look before it costs more points.${suspectedClause}`;
    }
    return `${acc}% here. Worth a closer look before it costs more points.${suspectedClause}`;
  }
  if (skill) {
    return `${skill} is the next focus area.${suspectedClause}`;
  }
  return '';
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  ERROR_TYPES,
  ERROR_TYPE_LABELS,
  ERROR_TYPE_DESCRIPTIONS,
  ERROR_TYPE_ICONS,
  ERROR_TYPE_COLORS,
  DOMAIN_WEIGHTS,
  DOMAIN_QUESTION_COUNTS,
  getQuestionSkills,
  calculateConfidenceInterval,
  calculateLearningVelocity,
  analyzeSkillClusters,
  analyzeAnswerPatterns,
  analyzeStamina,
  estimatePercentile,
  generateMistakeFingerprint,
  analyzeTimeAllocation,
  analyzeRootCauseClusters,
};
