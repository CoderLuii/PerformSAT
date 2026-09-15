/**
 * Recommendation Engine Service
 * Generates prescriptive recommendations for what students should do next
 * Inspired by Acely AI SAT's "tell students what to do" approach
 */

import { parseLocalDate } from '../utils/localDate';

// Module metadata for context
const MODULE_INFO = {
  'linear-equations': { title: 'Linear Equations', sections: ['Deriving Equations', 'Solving Linear Equations', 'Rearranging Equations', 'Graphs & Slope', 'Parallel & Perpendicular Lines', 'Linear Models'] },
  'functions': { title: 'Functions', sections: ['Introduction to Functions', 'Function Notation', 'Linear Functions'] },
  'systems': { title: 'System of Equations', sections: ['Graphing Systems', 'Substitution', 'Elimination', 'Linear Inequalities'] },
  'transformations': { title: 'Transformations', sections: ['Shifts', 'Reflections', 'Stretches'] },
  'exponents': { title: 'Exponents & Exponential Functions', sections: ['Exponent Rules', 'Exponential Growth & Decay', 'Compound Interest'] },
  'percents': { title: 'Percents', sections: ['Percent Problems', 'Percent Change', 'Multi-Step Percent'] },
  'quadratics': { title: 'Quadratics', sections: ['Factoring', 'Completing the Square', 'Quadratic Formula', 'Vertex Form'] },
  'triangles': { title: 'Triangles', sections: ['Triangle Basics', 'Right Triangles', 'Trigonometry'] },
  'circles': { title: 'Circles', sections: ['Circle Equations', 'Arc Length', 'Sector Area'] },
  'statistics': { title: 'Statistics', sections: ['Mean, Median, Mode', 'Standard Deviation', 'Data Interpretation'] },
  'radians-degrees': { title: 'Radians & Degrees', sections: ['Converting Units', 'Unit Circle'] },
  'dimensional-analysis': { title: 'Dimensional Analysis', sections: ['Unit Conversion', 'Rate Problems'] },
  'equivalent-expressions': { title: 'Equivalent Expressions', sections: ['Simplifying', 'Combining Like Terms'] },
  'volume': { title: 'Volume', sections: ['Prisms', 'Cylinders', 'Cones & Spheres'] }
};

/**
 * Calculate days until a given date
 */
const getDaysUntil = (dateStr) => {
  if (!dateStr) return null;
  const targetDate = parseLocalDate(dateStr);
  if (!targetDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate optimal difficulty based on past performance
 * @param {number} bestScore - Best score out of 5
 * @returns {'easy' | 'medium' | 'hard'}
 */
export const calculateOptimalDifficulty = (bestScore) => {
  if (bestScore === undefined || bestScore === null) return 'easy';
  if (bestScore <= 2) return 'easy';      // 0-40% - needs basics
  if (bestScore <= 3) return 'medium';    // 40-60% - building up
  return 'hard';                          // 60%+ - ready for challenge
};

/**
 * Split a practiceProgress key (`${moduleId}-${sectionName}`) into its parts.
 * Module ids can themselves contain dashes ('linear-equations',
 * 'radians-degrees'), so a bare split('-') mangles both halves — resolve by
 * prefix against the known MODULE_INFO ids, falling back to the legacy
 * first-dash split for unknown keys.
 * @param {string} key - practiceProgress key
 * @returns {[string, string]} [moduleId, sectionName]
 */
const splitPracticeKey = (key) => {
  const moduleId = Object.keys(MODULE_INFO).find(id => key.startsWith(`${id}-`));
  if (moduleId) return [moduleId, key.slice(moduleId.length + 1)];
  const [first, ...rest] = key.split('-');
  return [first, rest.join('-')];
};

/**
 * Find sections with low scores that need more practice
 * @param {Object} practiceProgress - Practice progress data
 * @returns {Array} Weak sections sorted by score (lowest first)
 */
const findWeakSections = (practiceProgress) => {
  const weakSections = [];

  Object.entries(practiceProgress || {}).forEach(([key, data]) => {
    const [moduleId, sectionName] = splitPracticeKey(key);

    // Consider sections with score <= 3 as "weak"
    if (data.bestScore !== undefined && data.bestScore <= 3) {
      weakSections.push({
        moduleId,
        sectionName,
        moduleName: MODULE_INFO[moduleId]?.title || moduleId,
        bestScore: data.bestScore,
        totalAttempts: data.totalAttempts || 1
      });
    }
  });

  // Sort by score (lowest first), then by attempts (fewer attempts = higher priority)
  return weakSections.sort((a, b) => {
    if (a.bestScore !== b.bestScore) return a.bestScore - b.bestScore;
    return a.totalAttempts - b.totalAttempts;
  });
};

/**
 * Find sections that have been learned but not practiced
 * @param {Object} completedLessons - Completed lessons data
 * @param {Object} practiceProgress - Practice progress data
 * @returns {Array} Unpracticed sections
 */
const findUnpracticedSections = (completedLessons, practiceProgress) => {
  const unpracticed = [];

  // Get modules that have at least one completed lesson
  const startedModules = new Set();
  Object.keys(completedLessons || {}).forEach(key => {
    if (completedLessons[key]?.completed) {
      const moduleId = key.split('-')[0];
      startedModules.add(moduleId);
    }
  });

  // For each started module, check which sections haven't been practiced
  startedModules.forEach(moduleId => {
    const moduleInfo = MODULE_INFO[moduleId];
    if (!moduleInfo) return;

    moduleInfo.sections.forEach(sectionName => {
      const practiceKey = `${moduleId}-${sectionName}`;
      if (!practiceProgress?.[practiceKey]) {
        unpracticed.push({
          moduleId,
          sectionName,
          moduleName: moduleInfo.title
        });
      }
    });
  });

  return unpracticed.slice(0, 5); // Limit to top 5
};

/**
 * Find the next lessons to learn in modules that have been started
 * @param {Object} completedLessons - Completed lessons data
 * @param {Object} allLessons - All lessons data
 * @returns {Array} Next lessons to learn
 */
const findNextLessons = (completedLessons, allLessons) => {
  const nextLessons = [];

  Object.entries(allLessons || {}).forEach(([moduleId, lessons]) => {
    if (!Array.isArray(lessons)) return;

    // Check if module has been started
    const hasStarted = lessons.some(lesson =>
      completedLessons?.[`${moduleId}-${lesson.id}`]?.completed
    );

    if (hasStarted) {
      // Find next incomplete lesson
      const nextLesson = lessons.find(lesson =>
        !completedLessons?.[`${moduleId}-${lesson.id}`]?.completed
      );

      if (nextLesson) {
        nextLessons.push({
          moduleId,
          lessonId: nextLesson.id,
          title: nextLesson.title,
          type: nextLesson.type,
          moduleName: MODULE_INFO[moduleId]?.title || moduleId
        });
      }
    }
  });

  // Sort by module progress (prefer modules closer to completion)
  return nextLessons.slice(0, 3);
};

/**
 * Get review items that are due
 * @param {Object} reviewQueue - Review queue data
 * @returns {Array} Due review items
 */
const getDueReviewItems = (reviewQueue) => {
  if (!reviewQueue) return [];

  const now = new Date();
  return Object.entries(reviewQueue)
    .filter(([_, item]) => {
      const nextReview = new Date(item.nextReviewDate);
      return nextReview <= now;
    })
    .map(([key, item]) => ({
      key,
      ...item
    }))
    .sort((a, b) => b.wrongCount - a.wrongCount); // Most missed first
};

/**
 * Generate prioritized recommendations for what student should do next
 * @param {Object} params - Student data
 * @returns {Array} Ranked recommendations with actions
 */
export const generateRecommendations = ({
  completedLessons,
  practiceProgress,
  reviewQueue,
  testDate,
  allLessons
}) => {
  const recommendations = [];
  const daysUntilTest = getDaysUntil(testDate);

  // Priority 1: Review queue (spaced repetition items due)
  const dueReviews = getDueReviewItems(reviewQueue);
  if (dueReviews.length > 0) {
    recommendations.push({
      type: 'review',
      priority: 1,
      title: `Review ${dueReviews.length} ${dueReviews.length === 1 ? 'Question' : 'Questions'}`,
      reason: 'Strengthen memory of previously missed questions',
      urgency: 'high',
      action: { type: 'startReview', questions: dueReviews }
    });
  }

  // Priority 2: Weak sections (low scores need practice)
  const weakSections = findWeakSections(practiceProgress);
  weakSections.slice(0, 3).forEach((section, idx) => {
    recommendations.push({
      type: 'practice',
      priority: 2 + idx,
      title: `Practice: ${section.sectionName}`,
      subtitle: section.moduleName,
      reason: `Score: ${section.bestScore}/5 - needs improvement`,
      difficulty: calculateOptimalDifficulty(section.bestScore),
      urgency: section.bestScore <= 2 ? 'high' : 'medium',
      action: {
        type: 'startPractice',
        moduleId: section.moduleId,
        sectionName: section.sectionName,
        difficulty: calculateOptimalDifficulty(section.bestScore)
      }
    });
  });

  // Priority 3: Unpracticed sections in started modules
  const unpracticedSections = findUnpracticedSections(completedLessons, practiceProgress);
  unpracticedSections.slice(0, 2).forEach((section, idx) => {
    recommendations.push({
      type: 'practice',
      priority: 10 + idx,
      title: `New: ${section.sectionName}`,
      subtitle: section.moduleName,
      reason: 'You learned this - now practice it',
      difficulty: 'easy',
      urgency: 'medium',
      action: {
        type: 'startPractice',
        moduleId: section.moduleId,
        sectionName: section.sectionName,
        difficulty: 'easy'
      }
    });
  });

  // Priority 4: Continue learning (incomplete lessons)
  const nextLessons = findNextLessons(completedLessons, allLessons);
  nextLessons.forEach((lesson, idx) => {
    recommendations.push({
      type: 'learn',
      priority: 20 + idx,
      title: `Learn: ${lesson.title}`,
      subtitle: lesson.moduleName,
      reason: 'Continue your progress',
      urgency: 'normal',
      lessonType: lesson.type,
      action: {
        type: 'startLesson',
        moduleId: lesson.moduleId,
        lessonId: lesson.lessonId
      }
    });
  });

  // If no recommendations, suggest starting a new module
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'learn',
      priority: 100,
      title: 'Start Learning',
      subtitle: 'Begin your SAT prep journey',
      reason: 'Choose a module to get started',
      urgency: 'normal',
      action: { type: 'browseModules' }
    });
  }

  // Add urgency boost if test date is soon
  if (daysUntilTest !== null && daysUntilTest <= 14) {
    recommendations.forEach(rec => {
      if (rec.type === 'practice' || rec.type === 'review') {
        rec.urgency = 'high';
        rec.reason = `${rec.reason} (SAT in ${daysUntilTest} days!)`;
      }
    });
  }

  return recommendations.sort((a, b) => a.priority - b.priority);
};

/**
 * Generate daily study plan based on test date
 * @param {string} testDate - Test date string
 * @param {Object} completedLessons - Completed lessons
 * @param {number} totalLessons - Total lessons count
 * @returns {Object|null} Study plan
 */
export const generateStudyPlan = (testDate, completedLessons, totalLessons = 199) => {
  if (!testDate) return null;

  const daysLeft = getDaysUntil(testDate);
  if (daysLeft === null || daysLeft < 0) return null;

  const completedCount = Object.values(completedLessons || {}).filter(l => l?.completed).length;
  const lessonsRemaining = totalLessons - completedCount;

  // Estimate ~10 minutes per lesson, ~5 minutes per practice session
  const totalMinutesNeeded = lessonsRemaining * 10 + (lessonsRemaining * 0.5 * 5); // lessons + ~half as practice
  const minutesPerDay = daysLeft > 0 ? Math.ceil(totalMinutesNeeded / daysLeft) : totalMinutesNeeded;

  return {
    daysLeft,
    lessonsRemaining,
    completedCount,
    totalLessons,
    recommendedMinutesPerDay: Math.max(15, Math.min(90, minutesPerDay)),
    onTrack: minutesPerDay <= 30,
    urgency: daysLeft <= 7 ? 'critical' : daysLeft <= 14 ? 'high' : daysLeft <= 30 ? 'medium' : 'normal'
  };
};

/**
 * Get a single "what to do next" recommendation
 * @param {Object} params - Student data
 * @returns {Object} Top recommendation
 */
export const getNextAction = (params) => {
  const recommendations = generateRecommendations(params);
  return recommendations[0] || null;
};
