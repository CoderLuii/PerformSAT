// DiagramValidator.js - Automated validation for all diagram types
// BULLETPROOF SAT Diagram System - Catches errors at build/startup time

import {
  validateParams,
  calculateYInterceptFromIntersection,
  verifyPointOnLine,
} from './BaseCoordinateSystem';

/**
 * Validation rules for each diagram type
 */
const diagramValidators = {
  // Two-line graph validation - MOST CRITICAL
  twoLineGraph: (params) => {
    const errors = [];
    const warnings = [];

    const { intersection, slope1, slope2, xRange = [-10, 10], yRange = [-10, 10] } = params;

    // Validate intersection exists
    if (!intersection) {
      errors.push('Missing required: intersection point');
      return { valid: false, errors, warnings };
    }

    // Validate intersection format
    if (typeof intersection.x !== 'number' || typeof intersection.y !== 'number') {
      errors.push('intersection must have numeric x and y properties');
      return { valid: false, errors, warnings };
    }

    // Validate slopes
    if (typeof slope1 !== 'number') {
      errors.push('Missing required: slope1');
    }
    if (typeof slope2 !== 'number') {
      errors.push('Missing required: slope2');
    }
    if (slope1 === slope2) {
      errors.push('slope1 and slope2 must be different for lines to intersect');
    }

    // Validate ranges
    const xRangeValid = validateParams.range(xRange, 'xRange');
    if (!xRangeValid.valid) errors.push(xRangeValid.error);

    const yRangeValid = validateParams.range(yRange, 'yRange');
    if (!yRangeValid.valid) errors.push(yRangeValid.error);

    // Validate intersection is within range
    if (errors.length === 0) {
      const rangeCheck = validateParams.pointInRange(intersection, xRange, yRange, 'intersection');
      if (!rangeCheck.valid) errors.push(rangeCheck.error);
    }

    // Mathematical verification
    if (errors.length === 0) {
      const b1 = calculateYInterceptFromIntersection(intersection, slope1);
      const b2 = calculateYInterceptFromIntersection(intersection, slope2);

      // Verify both lines pass through intersection
      if (!verifyPointOnLine(intersection, slope1, b1)) {
        errors.push('Line 1 does not pass through intersection point');
      }
      if (!verifyPointOnLine(intersection, slope2, b2)) {
        errors.push('Line 2 does not pass through intersection point');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  },

  // Linear graph validation
  linearGraph: (params) => {
    const errors = [];
    const warnings = [];

    const { slope, yIntercept, xRange = [-10, 10], yRange = [-10, 10] } = params;

    // Validate slope and yIntercept
    if (typeof slope !== 'number' || !isFinite(slope)) {
      errors.push('slope must be a finite number');
    }
    if (typeof yIntercept !== 'number' || !isFinite(yIntercept)) {
      errors.push('yIntercept must be a finite number');
    }

    // Validate ranges
    const xRangeValid = validateParams.range(xRange, 'xRange');
    if (!xRangeValid.valid) errors.push(xRangeValid.error);

    const yRangeValid = validateParams.range(yRange, 'yRange');
    if (!yRangeValid.valid) errors.push(yRangeValid.error);

    // Check if line is visible in range
    if (errors.length === 0) {
      const yAtXMin = slope * xRange[0] + yIntercept;
      const yAtXMax = slope * xRange[1] + yIntercept;
      const lineVisible =
        (yAtXMin >= yRange[0] && yAtXMin <= yRange[1]) ||
        (yAtXMax >= yRange[0] && yAtXMax <= yRange[1]) ||
        (yAtXMin < yRange[0] && yAtXMax > yRange[1]) ||
        (yAtXMin > yRange[1] && yAtXMax < yRange[0]);

      if (!lineVisible) {
        warnings.push('Line may not be visible within the specified range');
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Parabola validation
  parabola: (params) => {
    const errors = [];
    const warnings = [];

    const { vertex, a, xRange = [-10, 10], yRange = [-10, 10] } = params;

    // Validate vertex
    if (!vertex) {
      errors.push('Missing required: vertex');
    } else {
      if (typeof vertex.h !== 'number' || !isFinite(vertex.h)) {
        errors.push('vertex.h must be a finite number');
      }
      if (typeof vertex.k !== 'number' || !isFinite(vertex.k)) {
        errors.push('vertex.k must be a finite number');
      }
    }

    // Validate coefficient
    if (typeof a !== 'number' || a === 0 || !isFinite(a)) {
      errors.push('coefficient a must be a non-zero finite number');
    }

    // Validate ranges
    const xRangeValid = validateParams.range(xRange, 'xRange');
    if (!xRangeValid.valid) errors.push(xRangeValid.error);

    const yRangeValid = validateParams.range(yRange, 'yRange');
    if (!yRangeValid.valid) errors.push(yRangeValid.error);

    // Check if vertex is visible
    if (vertex && errors.length === 0) {
      if (vertex.h < xRange[0] || vertex.h > xRange[1]) {
        warnings.push('Vertex x-coordinate is outside xRange');
      }
      if (vertex.k < yRange[0] || vertex.k > yRange[1]) {
        warnings.push('Vertex y-coordinate is outside yRange');
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Bar chart validation
  barChart: (params) => {
    const errors = [];
    const warnings = [];

    const { data } = params;

    // Validate data array
    if (!Array.isArray(data) || data.length === 0) {
      errors.push('data must be a non-empty array');
      return { valid: false, errors, warnings };
    }

    // Validate each data item
    data.forEach((item, index) => {
      if (typeof item.label !== 'string' && typeof item.label !== 'number') {
        errors.push(`data[${index}].label must be a string or number`);
      }
      if (typeof item.value !== 'number' || !isFinite(item.value)) {
        errors.push(`data[${index}].value must be a finite number`);
      }
    });

    // Check for negative values (warning only)
    const hasNegative = data.some((item) => item.value < 0);
    if (hasNegative) {
      warnings.push('Bar chart contains negative values');
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Dot plot validation
  dotPlot: (params) => {
    const errors = [];
    const warnings = [];

    const { data, sets } = params;

    // Either data or sets must be provided
    if ((!data || data.length === 0) && (!sets || sets.length === 0)) {
      errors.push('Either data or sets must be provided');
      return { valid: false, errors, warnings };
    }

    // Validate single data format
    if (data && data.length > 0) {
      data.forEach((item, index) => {
        if (typeof item.value !== 'number') {
          errors.push(`data[${index}].value must be a number`);
        }
        if (typeof item.count !== 'number' || item.count < 1) {
          errors.push(`data[${index}].count must be a positive number`);
        }
      });
    }

    // Validate multi-set format
    if (sets && sets.length > 0) {
      sets.forEach((set, index) => {
        if (!set.name) {
          warnings.push(`sets[${index}] missing name`);
        }
        if (!Array.isArray(set.data)) {
          errors.push(`sets[${index}].data must be an array`);
        }
      });
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Scatterplot validation
  scatterplot: (params) => {
    const errors = [];
    const warnings = [];

    const { points, data } = params;
    const pointArray = points || data;

    if (!Array.isArray(pointArray) || pointArray.length === 0) {
      errors.push('points or data must be a non-empty array');
      return { valid: false, errors, warnings };
    }

    // Validate point format
    pointArray.forEach((point, index) => {
      if (Array.isArray(point)) {
        if (point.length !== 2 || typeof point[0] !== 'number' || typeof point[1] !== 'number') {
          errors.push(`points[${index}] must be [x, y] with numbers`);
        }
      } else if (typeof point.x !== 'number' || typeof point.y !== 'number') {
        errors.push(`points[${index}] must have numeric x and y`);
      }
    });

    return { valid: errors.length === 0, errors, warnings };
  },

  // Table validation
  table: (params) => {
    const errors = [];
    const warnings = [];

    const { headers, rows, xHeader, yHeader } = params;

    // Check either format is provided
    if ((!headers || !rows) && (!xHeader || !yHeader)) {
      errors.push('Table must have headers/rows or xHeader/yHeader');
      return { valid: false, errors, warnings };
    }

    // Validate headers/rows format
    if (headers && rows) {
      if (!Array.isArray(headers)) {
        errors.push('headers must be an array');
      }
      if (!Array.isArray(rows)) {
        errors.push('rows must be an array');
      }
      if (Array.isArray(rows) && rows.length === 0) {
        errors.push('rows must not be empty');
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Circle diagram validations
  circleWithSector: (params) => {
    const errors = [];
    const warnings = [];

    const { centralAngle } = params;

    if (typeof centralAngle !== 'number' || centralAngle <= 0 || centralAngle >= 360) {
      errors.push('centralAngle must be between 0 and 360 degrees');
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Triangle validations
  rightTriangle: (params) => {
    const errors = [];
    const warnings = [];

    const { vertices } = params;

    if (!vertices || vertices.length !== 3) {
      errors.push('rightTriangle must have exactly 3 vertices');
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  triangleWithAngles: (params) => {
    const errors = [];
    const warnings = [];

    const { angleLabels } = params;

    if (!angleLabels || angleLabels.length !== 3) {
      errors.push('triangleWithAngles must have exactly 3 angleLabels');
    }

    return { valid: errors.length === 0, errors, warnings };
  },

  // Default validator for unknown types
  default: (params) => {
    return { valid: true, errors: [], warnings: ['No specific validation for this diagram type'] };
  },
};

/**
 * Validate a single diagram configuration
 */
export function validateDiagram(type, params) {
  const validator = diagramValidators[type] || diagramValidators.default;
  const result = validator(params);

  return {
    type,
    ...result,
    params,
  };
}

/**
 * Validate all diagrams in a practice test
 */
export function validatePracticeTest(testData) {
  const results = {
    testName: testData.name || 'Unknown Test',
    total: 0,
    valid: 0,
    invalid: 0,
    withWarnings: 0,
    errors: [],
    warnings: [],
  };

  const questions = testData.questions || [];

  questions.forEach((question, index) => {
    if (question.diagram) {
      results.total++;
      const { type, params } = question.diagram;
      const validation = validateDiagram(type, params || {});

      if (validation.valid) {
        results.valid++;
        if (validation.warnings.length > 0) {
          results.withWarnings++;
          results.warnings.push({
            questionId: question.id,
            questionIndex: index,
            type,
            warnings: validation.warnings,
          });
        }
      } else {
        results.invalid++;
        results.errors.push({
          questionId: question.id,
          questionIndex: index,
          type,
          errors: validation.errors,
        });
      }
    }
  });

  return results;
}

/**
 * Validate all practice tests
 */
export function validateAllPracticeTests(practiceTests) {
  const allResults = {
    totalTests: practiceTests.length,
    totalDiagrams: 0,
    totalValid: 0,
    totalInvalid: 0,
    totalWarnings: 0,
    testResults: [],
    allErrors: [],
    allWarnings: [],
  };

  practiceTests.forEach((test) => {
    const result = validatePracticeTest(test);
    allResults.testResults.push(result);
    allResults.totalDiagrams += result.total;
    allResults.totalValid += result.valid;
    allResults.totalInvalid += result.invalid;
    allResults.totalWarnings += result.withWarnings;
    allResults.allErrors.push(...result.errors);
    allResults.allWarnings.push(...result.warnings);
  });

  return allResults;
}

/**
 * Console reporter for validation results
 */
export function reportValidationResults(results, verbose = false) {
  console.log('\n========================================');
  console.log('SAT Diagram Validation Report');
  console.log('========================================\n');

  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Total Diagrams: ${results.totalDiagrams}`);
  console.log(`Valid: ${results.totalValid}`);
  console.log(`Invalid: ${results.totalInvalid}`);
  console.log(`With Warnings: ${results.totalWarnings}`);

  if (results.allErrors.length > 0) {
    console.log('\n--- ERRORS ---\n');
    results.allErrors.forEach((error) => {
      console.log(`[${error.questionId}] ${error.type}:`);
      error.errors.forEach((e) => console.log(`  - ${e}`));
    });
  }

  if (verbose && results.allWarnings.length > 0) {
    console.log('\n--- WARNINGS ---\n');
    results.allWarnings.forEach((warning) => {
      console.log(`[${warning.questionId}] ${warning.type}:`);
      warning.warnings.forEach((w) => console.log(`  - ${w}`));
    });
  }

  console.log('\n========================================\n');

  return results.totalInvalid === 0;
}

/**
 * Run validation on app startup (development only)
 */
export function runStartupValidation(practiceTests) {
  if (process.env.NODE_ENV !== 'development') {
    return true;
  }

  const results = validateAllPracticeTests(practiceTests);
  const allValid = reportValidationResults(results, false);

  if (!allValid) {
    console.error(
      `\n⚠️  ${results.totalInvalid} diagram(s) have validation errors!\n` +
        'Fix these issues before deploying.\n'
    );
  } else {
    console.log('✓ All diagrams validated successfully!\n');
  }

  return allValid;
}

const diagramValidator = {
  validateDiagram,
  validatePracticeTest,
  validateAllPracticeTests,
  reportValidationResults,
  runStartupValidation,
};

export default diagramValidator;
