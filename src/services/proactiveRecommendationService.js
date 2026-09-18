/**
 * Proactive Recommendation Service
 * Generates personalized, proactive recommendations for the AI Tutor
 * based on student skill progress and learning patterns.
 */

import { getWeakSkills, getSkillTrend } from './skillService';
import { getSkillById, getSkillsForModule, skillTaxonomy } from '../data/skillTaxonomy';
import { getCBSkillLabel } from '../data/questions/cbSkillTaxonomy';
import { formatPatternLabel } from './selectors/missedPatternLabel';

/**
 * A stored "persistent confusion" is only worth surfacing if it actually
 * describes a confusion. The tutor pipeline sometimes records a NEGATIVE
 * finding ("No active confusion demonstrated in this exchange") as a string,
 * and that sentinel must never be replayed to the student as something they
 * "mentioned confusion with."
 *
 * @param {string} c - a candidate confusion string from learningMemory
 * @returns {boolean} true when c reads like a real confusion, not a no-op sentinel
 */
const isRealConfusion = (c) => {
  if (typeof c !== 'string') return false;
  const s = c.trim().toLowerCase();
  if (s.length < 3) return false;
  // Reject AI no-confusion sentinels (e.g. "no active confusion demonstrated",
  // "no confusion", "none detected", "no specific misconception").
  return !/\bno\b.*\b(confusion|misconception)\b|\bnone\b\s*(detected|demonstrated|identified)?|not\s+confus/.test(s);
};

/**
 * Calculate days until test date
 */
const getDaysUntilTest = (testDate) => {
  if (!testDate) return null;
  const today = new Date();
  const test = new Date(testDate);
  const diffTime = test - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : null;
};

/**
 * Find skills with declining trend
 */
const findDecliningSkills = (skillProgress) => {
  if (!skillProgress) return [];

  return Object.entries(skillProgress)
    .filter(([skillId, data]) => {
      const trend = getSkillTrend(data);
      return trend === 'declining' && data.attempts >= 4;
    })
    .map(([skillId, data]) => ({
      skillId,
      ...data,
      skill: getSkillById(skillId),
      trend: 'declining'
    }))
    .sort((a, b) => a.mastery - b.mastery);
};

/**
 * Generate recommendation for struggling pattern (3+ wrong)
 */
const generateStruggleRecommendation = (skillId, skillProgress) => {
  const skill = getSkillById(skillId);
  const skillData = skillProgress[skillId];

  if (!skill) return null;

  return {
    type: 'struggle',
    title: `Let's try a different approach`,
    message: `Having trouble with ${skill.name}? That's okay - this is a tricky concept. Let me explain it in a simpler way, or we can try some easier practice problems first.`,
    skillId,
    skillName: skill.name,
    mastery: skillData?.mastery || 0,
    actionLabel: 'Get simpler explanation',
    action: 'simplify-explanation',
    suggestedPrompt: `Can you explain ${skill.name} in the simplest way possible, with a basic example?`
  };
};

/**
 * Generate alert for declining skill
 */
const generateDecliningSkillAlert = (decliningSkill, testDate) => {
  const daysLeft = getDaysUntilTest(testDate);
  const urgencyNote = daysLeft && daysLeft <= 14
    ? ` With ${daysLeft} days until your test, let's prioritize this.`
    : '';

  return {
    type: 'declining',
    title: `Skill needs attention`,
    message: `Your ${decliningSkill.skill?.name || decliningSkill.skillId} mastery has dropped to ${decliningSkill.mastery}%. Let's practice with some easier problems to rebuild confidence.${urgencyNote}`,
    skillId: decliningSkill.skillId,
    skillName: decliningSkill.skill?.name,
    mastery: decliningSkill.mastery,
    previousMastery: estimatePreviousMastery(decliningSkill),
    actionLabel: 'Practice this skill',
    action: 'practice-skill',
    daysUntilTest: daysLeft
  };
};

/**
 * Estimate what mastery was before decline
 */
const estimatePreviousMastery = (skillData) => {
  if (!skillData.history || skillData.history.length < 4) {
    return skillData.mastery + 15;
  }
  const olderHalf = skillData.history.slice(0, Math.floor(skillData.history.length / 2));
  const olderRate = olderHalf.filter(h => h.correct).length / olderHalf.length;
  return Math.round(olderRate * 100);
};

/**
 * Generate "what to study next" recommendation
 */
const generateNextStudyRecommendation = (weakSkills, testDate) => {
  if (weakSkills.length === 0) return null;

  const topWeakSkill = weakSkills[0];
  const domain = skillTaxonomy.domains[topWeakSkill.skill?.domain];
  const daysLeft = getDaysUntilTest(testDate);

  let message = `Focus on ${topWeakSkill.skill?.name || 'this skill'} (currently ${topWeakSkill.mastery}% mastery).`;

  if (domain) {
    message += ` This is part of ${domain.name}, which makes up ${Math.round(domain.satWeight * 100)}% of SAT Math.`;
  }

  if (daysLeft && daysLeft <= 30) {
    message += ` With ${daysLeft} days left, improving this skill could boost your score.`;
  }

  return {
    type: 'next-study',
    title: 'Recommended focus area',
    message,
    skillId: topWeakSkill.skillId,
    skillName: topWeakSkill.skill?.name,
    mastery: topWeakSkill.mastery,
    domain: domain?.name,
    satWeight: domain?.satWeight,
    actionLabel: 'Study this topic',
    action: 'study-topic',
    relatedSkills: getRelatedSkillSuggestions(topWeakSkill.skillId).slice(0, 2)
  };
};

/**
 * Generate proactive recommendation based on student's current context and skill data
 * @param {Object} skillProgress - Student's skill progress from Firestore
 * @param {Object} context - Current context (skillId, isCorrect, testDate, etc.)
 * @returns {Object|null} Recommendation object or null
 */
export const generateProactiveRecommendation = (skillProgress, context = {}) => {
  if (!skillProgress) return null;

  const { currentSkillId, isCorrect, wrongCount, testDate } = context;

  // Priority 1: Struggling pattern detection (3+ wrong on same skill)
  if (currentSkillId && isCorrect === false && wrongCount >= 3) {
    return generateStruggleRecommendation(currentSkillId, skillProgress);
  }

  // Priority 2: Declining skill alert
  const decliningSkills = findDecliningSkills(skillProgress);
  if (decliningSkills.length > 0) {
    return generateDecliningSkillAlert(decliningSkills[0], testDate);
  }

  // Priority 3: "What to study next" for weak skills
  const weakSkills = getWeakSkills(skillProgress);
  if (weakSkills.length > 0) {
    return generateNextStudyRecommendation(weakSkills, testDate);
  }

  return null;
};

/**
 * Check if we should proactively offer a hint for this question
 * @param {Object} skillProgress - Student's skill progress
 * @param {string[]} questionSkills - Skill IDs for the current question
 * @returns {Object} { offer: boolean, skillId, reason, skillName }
 */
export const shouldOfferProactiveHint = (skillProgress, questionSkills) => {
  if (!skillProgress || !questionSkills || questionSkills.length === 0) {
    return { offer: false };
  }

  for (const skillId of questionSkills) {
    const skillData = skillProgress[skillId];
    const skill = getSkillById(skillId);

    if (!skillData) continue;

    // Offer hint if low confidence AND low mastery
    if (skillData.confidenceLevel === 'low' && skillData.mastery < 50) {
      const displayName = skill?.name || getCBSkillLabel(skillId) || formatPatternLabel(skillId);
      return {
        offer: true,
        skillId,
        skillName: displayName || skillId,
        reason: 'low-confidence',
        message: displayName
          ? `This question involves ${displayName} — a skill you're still learning. Would you like a hint?`
          : `This question involves a concept you're still learning. Would you like a hint?`
      };
    }

    // Offer hint if skill is declining
    const trend = getSkillTrend(skillData);
    if (trend === 'declining' && skillData.mastery < 70) {
      const displayName = skill?.name || getCBSkillLabel(skillId) || formatPatternLabel(skillId);
      return {
        offer: true,
        skillId,
        skillName: displayName || skillId,
        reason: 'declining',
        message: `I noticed you've been having some trouble with ${displayName || 'this concept'} lately. Want me to give you a hint?`
      };
    }
  }

  return { offer: false };
};

/**
 * Get related skills to suggest when student struggles
 * @param {string} skillId - Current skill ID
 * @returns {Array} Related skills from same module
 */
export const getRelatedSkillSuggestions = (skillId) => {
  const skill = getSkillById(skillId);
  if (!skill || !skill.modules || skill.modules.length === 0) return [];

  // Get other skills from same module
  const moduleSkills = getSkillsForModule(skill.modules[0]);

  return moduleSkills
    .filter(s => s.id !== skillId)
    .map(s => ({
      id: s.id,
      name: s.name,
      satConcept: s.satConcept
    }))
    .slice(0, 3);
};

/**
 * Generate smart suggested prompts based on skill gaps
 * @param {Object} skillProgress - Student's skill progress
 * @param {Object} currentQuestion - Current question object (with skills array)
 * @returns {string[]} Array of suggested prompts
 */
export const generateSmartPrompts = (skillProgress, currentQuestion) => {
  const prompts = [];

  // If question has skills and student is weak on any
  if (currentQuestion?.skills && skillProgress) {
    const weakSkill = currentQuestion.skills.find(skillId => {
      const data = skillProgress[skillId];
      return data && data.mastery < 60;
    });

    if (weakSkill) {
      const skill = getSkillById(weakSkill);
      if (skill) {
        prompts.push(`Can you explain ${skill.name} step by step?`);
      }
    }
  }

  // Always include these helpful prompts
  prompts.push("What other concepts should I know to master this?");
  prompts.push("Can you give me a hint without telling the answer?");
  prompts.push("Why is my approach wrong?");

  return prompts.slice(0, 4); // Max 4 prompts
};

/**
 * Build skill context string for AI system prompt
 * @param {Object} skillProgress - Student's skill progress
 * @param {string[]} currentSkills - Skill IDs for current question
 * @returns {string} Context string for system prompt
 */
export const buildSkillContextForAI = (skillProgress, currentSkills) => {
  if (!skillProgress || !currentSkills || currentSkills.length === 0) {
    return '';
  }

  const relevantSkills = currentSkills.map(skillId => {
    const data = skillProgress[skillId];
    const skill = getSkillById(skillId);
    if (!data) return null;

    return {
      skillId,
      name: skill?.name || skillId,
      domain: skill?.domain || 'unknown',
      mastery: data.mastery,
      trend: getSkillTrend(data),
      confidence: data.confidenceLevel,
      attempts: data.attempts,
      recentAccuracy: data.recentScores ? (data.recentScores.slice(-3).reduce((a, b) => a + b, 0) / Math.min(data.recentScores.length, 3) * 100).toFixed(0) : null
    };
  }).filter(Boolean);

  if (relevantSkills.length === 0) return '';

  let context = `
[STUDENT SKILL PROFILE — USE THIS TO PERSONALIZE YOUR RESPONSE]
This student's performance on the skills tested by this question:
${relevantSkills.map(s =>
    `- ${s.name} (${s.domain}): ${s.mastery}% mastery | ${s.trend} trend | ${s.attempts} attempts | confidence: ${s.confidence}${s.recentAccuracy ? ` | last 3 accuracy: ${s.recentAccuracy}%` : ''}`
  ).join('\n')}
`;

  // Add strategic coaching notes based on student profile
  const hasDeclining = relevantSkills.some(s => s.trend === 'declining');
  const hasLowConfidence = relevantSkills.some(s => s.confidence === 'low');
  const hasStruggling = relevantSkills.some(s => s.mastery < 40);
  const hasStrong = relevantSkills.some(s => s.mastery > 75);
  const hasModerate = relevantSkills.some(s => s.mastery >= 40 && s.mastery <= 75);

  if (hasStruggling) {
    context += '\nTUTORING APPROACH: This student is struggling with this concept (<40% mastery). Start with the foundational idea before any technique. Use a simple, concrete example first. Be patient and encouraging — frame mistakes as learning, not failure. Avoid jargon. If explaining a solution, walk through every single step.';
  } else if (hasDeclining) {
    context += '\nTUTORING APPROACH: This student was doing better before but is now declining. They likely have a partial understanding with a specific gap or misconception. Try to identify what they might be confusing (common: sign errors, formula mix-ups, misreading what the question asks). Be encouraging — they have the foundation, they just need to fix one thing.';
  } else if (hasLowConfidence) {
    context += '\nTUTORING APPROACH: This student has few attempts on this skill — they are still building familiarity. Explain concepts thoroughly and offer to break things down step-by-step. Build their confidence by connecting to things they already know.';
  } else if (hasStrong) {
    context += '\nTUTORING APPROACH: This student is strong on this skill (75%+ mastery). Be concise — they do not need basics explained. Focus on speed optimization, edge cases, and advanced strategies (Desmos tricks, elimination shortcuts, time-saving techniques). Challenge them to find the fastest solve path.';
  } else if (hasModerate) {
    context += '\nTUTORING APPROACH: This student has a solid foundation but is not yet consistent. Focus on the specific step or concept where they tend to make errors. Reinforce the pattern recognition — help them categorize the question type quickly so they know which approach to use.';
  }

  return context;
};

/**
 * Generate cross-session recommendation using practice test results + learning memory.
 * Detects persistent weaknesses and recurring trap patterns across multiple sessions.
 * @param {Object} skillProgress - Student's skill progress
 * @param {Object} practiceTestResults - All practice test results
 * @param {Object} learningMemory - Student's learning memory from Firestore
 * @param {string[]} currentSkillIds - Skill IDs for the current lesson/question
 * @returns {Object|null} Recommendation or null
 */
export const generateCrossSessionRecommendation = (
  skillProgress, practiceTestResults, learningMemory, currentSkillIds
) => {
  if (!skillProgress || !currentSkillIds || currentSkillIds.length === 0) return null;

  // Priority 0: Persistent weakness across 3+ tests on current topic
  if (practiceTestResults) {
    for (const skillId of currentSkillIds) {
      const weakTestCount = countTestsWhereSkillWeak(practiceTestResults, skillId);
      if (weakTestCount >= 3) {
        const skill = getSkillById(skillId);
        const skillData = skillProgress[skillId];
        return {
          type: 'persistent-weakness',
          title: 'Persistent challenge detected',
          message: `${skill?.name || skillId} has been a challenge across ${weakTestCount} practice tests (${skillData?.mastery || 0}% mastery). Let me help you approach it differently this time.`,
          skillId,
          skillName: skill?.name || skillId,
          mastery: skillData?.mastery || 0,
          actionLabel: 'Try a new approach',
          action: 'reteach',
          suggestedPrompt: `I keep getting ${skill?.name || 'this concept'} wrong on tests. Can you teach it to me from scratch, in a completely different way?`,
          priority: 0,
        };
      }
    }
  }

  // Priority 0.5: Recurring trap pattern across 3+ tests
  if (practiceTestResults) {
    const trapPattern = findRecurringTrapForSkills(practiceTestResults, currentSkillIds);
    if (trapPattern) {
      return {
        type: 'recurring-trap',
        title: 'Watch out for this trap',
        message: `You've fallen for the "${trapPattern.trapType.replace(/_/g, ' ')}" trap ${trapPattern.count} times across tests. Let me show you how to spot it.`,
        skillId: currentSkillIds[0],
        skillName: trapPattern.trapType.replace(/_/g, ' '),
        actionLabel: 'Show me the trap',
        action: 'trap-awareness',
        suggestedPrompt: `I keep falling for ${trapPattern.trapType.replace(/_/g, ' ')} traps. Can you show me how to recognize and avoid them?`,
        priority: 0.5,
      };
    }
  }

  // Priority 0.8: Learning memory match — student asked about this topic before and was confused
  if (learningMemory?.persistentConfusions) {
    for (const skillId of currentSkillIds) {
      const skill = getSkillById(skillId);
      // Only the skill's name / id are valid match needles. An empty needle
      // makes String.includes('') match EVERY stored confusion — which it did
      // for R&W skills (getSkillById returns null → name undefined → ''),
      // surfacing a no-confusion sentinel as the student's confusion. Filter
      // empty needles AND reject sentinel strings via isRealConfusion.
      const needles = [skill?.name?.toLowerCase(), skillId?.toLowerCase()]
        .filter((n) => n && n.length > 0);
      const confusion = learningMemory.persistentConfusions.find(c =>
        isRealConfusion(c) && needles.some((n) => c.toLowerCase().includes(n))
      );
      if (confusion) {
        return {
          type: 'memory-match',
          title: 'Let me help with this',
          message: `Last time we talked about this, you mentioned confusion with: "${confusion}". Want to revisit that?`,
          skillId,
          skillName: skill?.name || skillId,
          actionLabel: 'Yes, let\'s revisit',
          action: 'revisit',
          suggestedPrompt: `Last time I was confused about ${confusion}. Can you help me understand it better?`,
          priority: 0.8,
        };
      }
    }
  }

  return null;
};

/**
 * Count how many tests a skill was weak in
 */
const countTestsWhereSkillWeak = (practiceTestResults, skillId) => {
  let weakCount = 0;

  Object.values(practiceTestResults).forEach(results => {
    if (!results?.attempts) return;
    results.attempts.forEach(attempt => {
      const questions = attempt.diagnosticData?.questionDetails;
      if (!questions) return;

      let correct = 0, total = 0;
      Object.values(questions).forEach(q => {
        if (q?.skills?.includes(skillId)) {
          total++;
          if (q.isCorrect) correct++;
        }
      });

      if (total >= 2 && (correct / total) < 0.5) {
        weakCount++;
      }
    });
  });

  return weakCount;
};

/**
 * Find recurring trap types across tests for given skills
 */
const findRecurringTrapForSkills = (practiceTestResults, skillIds) => {
  const trapCounts = {};

  Object.values(practiceTestResults).forEach(results => {
    if (!results?.attempts) return;
    results.attempts.forEach(attempt => {
      const questions = attempt.diagnosticData?.questionDetails;
      if (!questions) return;

      Object.values(questions).forEach(q => {
        if (!q || q.isCorrect) return;
        if (q.errorType === 'trap_susceptibility' && q.trapType) {
          const hasSkillOverlap = !skillIds.length || q.skills?.some(s => skillIds.includes(s));
          if (hasSkillOverlap) {
            trapCounts[q.trapType] = (trapCounts[q.trapType] || 0) + 1;
          }
        }
      });
    });
  });

  const topTrap = Object.entries(trapCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])[0];

  return topTrap ? { trapType: topTrap[0], count: topTrap[1] } : null;
};

const proactiveRecommendationService = {
  generateProactiveRecommendation,
  shouldOfferProactiveHint,
  getRelatedSkillSuggestions,
  generateSmartPrompts,
  buildSkillContextForAI,
  generateCrossSessionRecommendation
};

export default proactiveRecommendationService;
