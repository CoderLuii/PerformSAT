/**
 * Trend Context Builder
 * Builds a compact cross-test trend summary (~200-300 tokens) for the AI system prompt.
 * Analyzes practiceTestResults and skillProgress to surface persistent patterns.
 */

import { getSkillById } from '../data/skillTaxonomy';

/**
 * Build a cross-test trend context string for the AI system prompt.
 * @param {Object} practiceTestResults - All practice test results from Firestore
 * @param {Object} skillProgress - Student's skill progress map
 * @returns {string} Trend context string or empty string
 */
export const buildTrendContext = (practiceTestResults, skillProgress) => {
  if (!practiceTestResults || Object.keys(practiceTestResults).length === 0) return '';

  const testAttempts = extractTestAttempts(practiceTestResults);
  if (testAttempts.length < 2) return '';

  const parts = [];
  parts.push('\n═══════════════════════════════════');
  parts.push('CROSS-TEST PATTERNS (use to personalize guidance)');
  parts.push('═══════════════════════════════════');

  // Error type evolution
  const errorEvolution = analyzeErrorEvolution(testAttempts);
  if (errorEvolution.length > 0) {
    parts.push('Error evolution:');
    errorEvolution.forEach(e => parts.push(`- ${e}`));
  }

  // Trap pattern tracking
  const trapPatterns = analyzeTrapPatterns(testAttempts);
  if (trapPatterns.length > 0) {
    parts.push('Recurring traps:');
    trapPatterns.forEach(t => parts.push(`- ${t}`));
  }

  // Persistent weaknesses from skillProgress
  const persistentWeaknesses = findPersistentWeaknesses(testAttempts, skillProgress);
  if (persistentWeaknesses.length > 0) {
    parts.push('Persistent weaknesses:');
    persistentWeaknesses.forEach(w => parts.push(`- ${w}`));
  }

  // Score trajectory
  const trajectory = buildScoreTrajectory(testAttempts);
  if (trajectory) {
    parts.push(`Score trend: ${trajectory}`);
  }

  if (parts.length <= 3) return ''; // Only headers, no content
  return parts.join('\n');
};

/**
 * Extract sorted test attempts from practiceTestResults
 */
const extractTestAttempts = (practiceTestResults) => {
  const attempts = [];

  Object.entries(practiceTestResults).forEach(([testId, results]) => {
    if (results?.attempts && Array.isArray(results.attempts)) {
      results.attempts.forEach((attempt, idx) => {
        attempts.push({
          testId,
          testTitle: results.testTitle || testId,
          attemptIndex: idx,
          scaledScore: attempt.scaledScore,
          rawScore: attempt.rawScore,
          totalQuestions: attempt.totalQuestions,
          completedAt: attempt.completedAt,
          diagnosticData: attempt.diagnosticData || null,
          errorTypeCounts: attempt.errorTypeCounts || null,
        });
      });
    }
  });

  attempts.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
  return attempts;
};

/**
 * Analyze how error type counts change across tests
 */
const analyzeErrorEvolution = (testAttempts) => {
  const lines = [];
  const recentAttempts = testAttempts.slice(-4); // Last 4 attempts

  // Collect error type counts from each attempt
  const errorSeries = recentAttempts
    .map(a => a.errorTypeCounts || a.diagnosticData?.errorPatterns?.counts)
    .filter(Boolean);

  if (errorSeries.length < 2) return lines;

  const first = errorSeries[0];
  const last = errorSeries[errorSeries.length - 1];

  const errorTypes = {
    careless_error: 'Careless errors',
    trap_susceptibility: 'Trap susceptibility',
    conceptual_gap: 'Conceptual gaps',
    time_pressure: 'Time pressure',
    procedural_error: 'Procedural errors',
  };

  Object.entries(errorTypes).forEach(([key, label]) => {
    const firstCount = first[key] || 0;
    const lastCount = last[key] || 0;
    const diff = lastCount - firstCount;
    if (Math.abs(diff) >= 2) {
      const direction = diff > 0 ? 'increasing' : 'declining';
      lines.push(`${label} ${direction} (${firstCount} -> ${lastCount})`);
    }
  });

  return lines;
};

/**
 * Find recurring trap types across tests
 */
const analyzeTrapPatterns = (testAttempts) => {
  const lines = [];
  const trapCounts = {};

  testAttempts.forEach(attempt => {
    const questions = attempt.diagnosticData?.questionDetails;
    if (!questions) return;

    Object.values(questions).forEach(q => {
      if (q && !q.isCorrect && q.errorType === 'trap_susceptibility' && q.trapType) {
        trapCounts[q.trapType] = (trapCounts[q.trapType] || 0) + 1;
      }
    });
  });

  Object.entries(trapCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([trap, count]) => {
      const label = trap.replace(/_/g, ' ');
      lines.push(`"${label}" trap in ${count} questions across tests`);
    });

  return lines;
};

/**
 * Find skills that are persistently weak across multiple tests
 */
const findPersistentWeaknesses = (testAttempts, skillProgress) => {
  const lines = [];
  const skillTestMap = {};

  // Count how many tests each skill appeared as weak
  testAttempts.forEach(attempt => {
    const questions = attempt.diagnosticData?.questionDetails;
    if (!questions) return;

    const testSkillAccuracy = {};
    Object.values(questions).forEach(q => {
      if (!q || !q.skills) return;
      q.skills.forEach(skillId => {
        if (!testSkillAccuracy[skillId]) {
          testSkillAccuracy[skillId] = { correct: 0, total: 0 };
        }
        testSkillAccuracy[skillId].total++;
        if (q.isCorrect) testSkillAccuracy[skillId].correct++;
      });
    });

    Object.entries(testSkillAccuracy).forEach(([skillId, data]) => {
      const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
      if (accuracy < 50 && data.total >= 2) {
        if (!skillTestMap[skillId]) skillTestMap[skillId] = { count: 0, avgAccuracy: 0, totalAcc: 0 };
        skillTestMap[skillId].count++;
        skillTestMap[skillId].totalAcc += accuracy;
        skillTestMap[skillId].avgAccuracy = skillTestMap[skillId].totalAcc / skillTestMap[skillId].count;
      }
    });
  });

  Object.entries(skillTestMap)
    .filter(([_, data]) => data.count >= 2)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 4)
    .forEach(([skillId, data]) => {
      const skill = getSkillById(skillId);
      const name = skill?.name || skillId;
      lines.push(`"${name}" weak across ${data.count} tests (${Math.round(data.avgAccuracy)}% avg accuracy)`);
    });

  return lines;
};

/**
 * Build a compact score trajectory string
 */
const buildScoreTrajectory = (testAttempts) => {
  const scores = testAttempts
    .filter(a => a.scaledScore)
    .slice(-5)
    .map(a => a.scaledScore);

  if (scores.length < 2) return null;

  const first = scores[0];
  const last = scores[scores.length - 1];
  const diff = last - first;
  const direction = diff > 0 ? `+${diff}` : `${diff}`;

  return `${scores.join(' -> ')} (${direction} over ${scores.length} tests)`;
};

const trendContextBuilder = { buildTrendContext };

export default trendContextBuilder;
