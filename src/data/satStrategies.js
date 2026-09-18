/**
 * SAT Strategies — Curated Knowledge Base
 * Targeted trap guides, misconception guides, and Desmos techniques
 * keyed for fast lookup by error pattern or skill ID.
 */

// ═══════════════════════════════════════════════════════════════════════════
// TRAP GUIDES — keyed by trap type (from diagnosticEngine error classification)
// ═══════════════════════════════════════════════════════════════════════════

export const trapGuides = {
  partial_calculation: {
    name: 'Partial Calculation Trap',
    description: 'You stopped one step before the answer the question actually asked for.',
    recognition: 'Any time the question asks for a TOTAL, FINAL RESULT, or a TRANSFORMED value (like 2x + 1 instead of x).',
    fix: 'After solving, re-read the final sentence of the question. What did they actually ask for? If you found x, do they want x, 2x, x + 5, or the total cost?',
    example: 'Question asks "What is the total cost?" You find the tax is $12. But the total cost is $62 + $12 = $74. Choice $12 is the trap.',
    frequency: 'Appears on nearly every SAT — the most common trap type.',
  },
  sign_error: {
    name: 'Sign Error Trap',
    description: 'You dropped or flipped a negative sign during calculation.',
    recognition: 'Any problem involving subtraction, distributing negatives, or moving terms across the equals sign.',
    fix: 'When you distribute a negative: -(3x - 5) = -3x + 5, NOT -3x - 5. When moving a term across =, flip the sign. Write out every step — do not skip.',
    example: 'Solving x^2 - 6x + 9 = 0. Student writes (x - 3)(x + 3) instead of (x - 3)(x - 3). The +3 trap answer catches the sign error.',
    frequency: 'Top 3 most common. Appears in algebra, quadratics, and geometry.',
  },
  misread_question: {
    name: 'Misread Question Trap',
    description: 'You solved for the wrong variable or answered a different question than what was asked.',
    recognition: 'Questions with multiple variables, "which of the following" phrasing, or when the question asks for something other than the obvious variable.',
    fix: 'READ THE LAST SENTENCE FIRST. Before solving, underline exactly what they are asking for. After solving, check: did I answer THAT question?',
    example: 'System of equations, solve for x and y. Question asks "What is x + y?" You found x = 3. The answer is not 3 — it is x + y.',
    frequency: 'Appears 2-3 times per test. Costs the most points per occurrence because students are confident in their wrong answer.',
  },
  reversed_operation: {
    name: 'Reversed Operation Trap',
    description: 'You multiplied when you should have divided, or vice versa.',
    recognition: 'Percent problems ("20% of x is 50"), rate problems, and any "working backwards" question.',
    fix: 'Translate the words directly: "20% of x is 50" means 0.20 * x = 50, so x = 50 / 0.20 = 250. The trap answer is 50 * 0.20 = 10.',
    example: 'If 20% of x is 50, find x. Trap: 50 * 0.20 = 10. Correct: 50 / 0.20 = 250.',
    frequency: 'Appears 1-2 times per test, especially in problem-solving section.',
  },
  percentage_direction: {
    name: 'Percentage Direction Trap',
    description: 'You confused "increased BY x%" with "IS x% of."',
    recognition: 'Any problem with percent increase, percent decrease, or percent comparison.',
    fix: '"Increased by 150%" = original * 2.5 (add the 150% to the 100% base). "Is 150% of" = original * 1.5. Write out the multiplier explicitly.',
    example: 'Price increased by 60%. Original = $100. Trap: $100 * 0.60 = $60. Correct: $100 * 1.60 = $160.',
    frequency: 'Appears on nearly every test. The single most common trap in Problem Solving & Data Analysis.',
  },
  off_by_one: {
    name: 'Off-by-One Trap',
    description: 'You forgot the "+1" when counting inclusive ranges.',
    recognition: '"How many integers from a to b inclusive?" or any counting problem with "including both endpoints."',
    fix: 'Inclusive count = last - first + 1. From 3 to 17 inclusive = 17 - 3 + 1 = 15, not 14.',
    example: 'How many integers from 5 to 20 inclusive? Trap: 20 - 5 = 15. Correct: 20 - 5 + 1 = 16.',
    frequency: 'Appears 1-2 times per test.',
  },
  sequential_percent: {
    name: 'Sequential Percent Change Trap',
    description: 'You added sequential percentages instead of multiplying.',
    recognition: 'Any problem with two or more successive percent changes.',
    fix: 'NEVER add percentages. Multiply the multipliers: up 20% then down 15% = 1.20 * 0.85 = 1.02 (2% net increase, NOT 5%).',
    example: 'Price up 20% then down 20%. Trap: net 0% change. Correct: 1.20 * 0.80 = 0.96 = 4% net DECREASE.',
    frequency: 'Appears on nearly every test because students keep falling for it.',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// MISCONCEPTION GUIDES — keyed by skill ID (from skillTaxonomy)
// ═══════════════════════════════════════════════════════════════════════════

export const misconceptionGuides = {
  'linear-equations-one-variable': {
    commonErrors: [
      'Forgetting to flip the inequality when multiplying/dividing by a negative',
      'Distributing incorrectly: 2(x + 3) = 2x + 6, NOT 2x + 3',
    ],
    correctApproach: 'Isolate the variable step by step. Check by substituting your answer back in.',
    satFrequency: 'Very high — 3-4 questions per test',
  },
  'linear-equations-two-variables': {
    commonErrors: [
      'Confusing slope with y-intercept in y = mx + b',
      'Getting slope sign wrong when converting from standard form Ax + By = C',
    ],
    correctApproach: 'Slope = -A/B in standard form. Always convert to slope-intercept to read slope and intercept.',
    satFrequency: 'High — 2-3 questions per test',
  },
  'systems-of-equations': {
    commonErrors: [
      'Setting up equations with variables reversed in word problems',
      'Confusing no-solution (parallel lines) with the-solution-is-zero',
    ],
    correctApproach: 'Word problems: one equation for total count, one for total value. No solution: same slope, different intercepts.',
    satFrequency: 'High — 2-3 questions per test',
  },
  'quadratic-equations': {
    commonErrors: [
      'Forgetting to set the equation to zero before factoring',
      'Sign errors in the quadratic formula, especially with negative b',
      'Confusing (x - 3)^2 with (x + 3)(x - 3)',
    ],
    correctApproach: 'Always set = 0 first. For "how many solutions": use discriminant b^2 - 4ac (skip solving). Desmos is fastest for vertex/root questions.',
    satFrequency: 'High — 2-4 questions per test',
  },
  'completing-the-square': {
    commonErrors: [
      'Forgetting to add the same value to BOTH sides of the equation',
      'Not dividing by the leading coefficient first when a is not 1',
      'Sign error on the (x - h) term: x^2 + 6x becomes (x + 3)^2, not (x - 3)^2',
    ],
    correctApproach: 'Step 1: If a is not 1, divide everything by a. Step 2: Move constant to right side. Step 3: Take half of b, square it, add to both sides. Step 4: Write as (x + b/2)^2.',
    satFrequency: 'Medium-high — often tested through circle equations',
  },
  'exponential-functions': {
    commonErrors: [
      'Confusing growth rate with multiplier: 5% growth means multiply by 1.05, not 0.05',
      'Mishandling time units: if model uses years but question asks months, adjust exponent',
    ],
    correctApproach: 'Growth: y = a(1 + r)^t. Decay: y = a(1 - r)^t. The base tells the rate: 1.05 = 5% growth.',
    satFrequency: 'Medium — 1-2 questions per test',
  },
  'ratios-and-proportions': {
    commonErrors: [
      'Setting up the proportion with mismatched units',
      'Forgetting to check if the ratio is part-to-part or part-to-whole',
    ],
    correctApproach: 'Label every number with its unit. Cross-multiply only after confirming units match position.',
    satFrequency: 'High — 2-3 questions per test',
  },
  'percentages': {
    commonErrors: [
      '"Increased by 150%" vs "is 150% of" confusion',
      'Adding sequential percentages instead of multiplying',
      'Reversing percent change direction',
    ],
    correctApproach: 'Always write the multiplier explicitly. "Increased by X%" = multiply by (1 + X/100). For sequential changes, multiply the multipliers.',
    satFrequency: 'Very high — 2-4 questions per test',
  },
  'circle-equations': {
    commonErrors: [
      'Forgetting to complete the square before identifying center/radius',
      'Sign error: (x + 3)^2 means center x = -3, not +3',
      'Confusing r^2 with r when reading the radius',
    ],
    correctApproach: 'Standard form: (x - h)^2 + (y - k)^2 = r^2. Center (h, k), radius r. Complete the square for both x and y terms.',
    satFrequency: 'High — appears on nearly every test',
  },
  'right-triangle-trig': {
    commonErrors: [
      'Mixing up opposite and adjacent (they depend on which angle you reference)',
      'Using wrong special triangle ratios (30-60-90 vs 45-45-90)',
    ],
    correctApproach: 'Label the triangle from the angle the question references. SOHCAHTOA. sin(x) = cos(90 - x) for complementary angles.',
    satFrequency: 'Medium — 1-2 questions per test',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// DESMOS TECHNIQUES — keyed by problem type
// ═══════════════════════════════════════════════════════════════════════════

export const desmosTechniques = {
  systems: {
    name: 'Systems of Equations',
    technique: 'Enter equation 1 on line 1 and equation 2 on line 2, exactly as written — no rearranging needed. Click the intersection point; its (x, y) coordinates are the solution. No intersection means no solution; identical overlapping graphs mean infinitely many.',
    when: 'Any system of two equations asking for the solution or one coordinate of it.',
    timeEstimate: '15 seconds',
  },
  'single-variable': {
    name: 'Solve Any One-Variable Equation',
    technique: 'Type the equation exactly as written (2x + 3 = 11) and Desmos draws a vertical line at the solution. If the variable is not x (3p + 10 = 25), rewrite it with x first — otherwise Desmos offers a slider instead of solving. Backup: graph y = [left side] and y = [right side] on separate lines and click the intersection; its x-coordinate is the solution.',
    when: 'Linear, absolute value, radical, rational, or exponential — any single-variable equation.',
    timeEstimate: '15 seconds',
  },
  'solution-count': {
    name: 'Number of Solutions',
    technique: 'Graph y = [left side] and y = [right side] on separate lines and count intersection points. Zero intersections means no real solutions; identical graphs mean infinitely many. Zoom out before concluding zero — a crossing may sit outside the window.',
    when: '"How many solutions does this equation (or system) have?"',
    timeEstimate: '10 seconds',
  },
  quadratic: {
    name: 'Quadratic Analysis',
    technique: 'Type y = [quadratic] and click the curve — Desmos marks the vertex and intercepts with gray dots. Click a dot to read its exact coordinates. Vertex answers max/min questions; x-intercepts answer roots/zeros/solutions questions.',
    when: 'Any question about a vertex, minimum, maximum, roots, zeros, or intercepts.',
    timeEstimate: '15 seconds',
  },
  'parameter-slider': {
    name: 'Unknown Constant via Slider',
    technique: 'Enter the equation keeping the unknown constant as a letter other than x or y, then click "add slider." Drag until the graph meets the stated condition — tangent for exactly one solution, no crossing for no solution, or passing through a required point. The slider value at that moment is the answer. Click the slider endpoints to widen its range if needed.',
    when: '"For what value of the constant does the equation have exactly one solution / no solution / pass through (a, b)?"',
    timeEstimate: '20 seconds',
  },
  'verify-answer': {
    name: 'Answer Verification',
    technique: 'After solving by hand, type the original equation and your answer as a point, or substitute it on a new line. If the point lands on the graph (or both sides evaluate equal), move on with confidence.',
    when: 'After any hand-solved equation — cheap insurance against arithmetic slips.',
    timeEstimate: '5 seconds',
  },
  'function-evaluation': {
    name: 'Define and Evaluate Functions',
    technique: 'Define the function on one line (f(x) = 3x^2 - 4x), then type f(3) on the next line to evaluate. Combinations work too: f(2) - g(1). For "for what value of x does f(x) = 10," graph the function plus the horizontal line y = 10 and click the intersection.',
    when: 'Any f(x) evaluation, combined-function arithmetic, or find-the-input question.',
    timeEstimate: '10 seconds',
  },
  'table-lookup': {
    name: 'Function Value Lookup',
    technique: 'Type the function, open a table for it, and read the outputs directly. For f(3) + f(-1), look up both rows and add.',
    when: 'Repeated evaluations of the same function at several inputs.',
    timeEstimate: '10 seconds',
  },
  'equivalent-expressions': {
    name: 'Equivalent-Expression Overlap Test',
    technique: 'Graph the given expression as y = [expression] on line 1, then each answer choice on the lines below. The choice whose graph lies exactly on top of the original is the equivalent one. Click a colored circle to flash that curve off and on — if the original never peeks out from under it, the overlap is perfect.',
    when: '"Which expression is equivalent to ...?" — skips the algebra entirely.',
    timeEstimate: '20 seconds',
  },
  'inequality-region': {
    name: 'Inequality Graphing',
    technique: 'Type the inequality directly (y > 2x + 1) and Desmos shades the solution region. For a system of inequalities, enter both — the answer lives where the shaded regions overlap. Type <= and >= for the closed versions.',
    when: '"Which point satisfies the inequality (or system)?" or any shaded-region question.',
    timeEstimate: '10 seconds',
  },
  'store-values': {
    name: 'Store Values as Variables',
    technique: 'Assign letters on their own lines (a = 19, b = -37), then compute with them on the next line ((a^2 + 2b)/(a - b)). Desmos keeps exact values, so nothing is lost to mid-problem rounding.',
    when: 'Multi-step numeric evaluation where retyping or rounding invites errors.',
    timeEstimate: '20 seconds',
  },
  'fraction-toggle': {
    name: 'Decimal-to-Fraction Toggle',
    technique: 'When a result displays as a decimal, click the fraction button beside it to convert to the exact fraction (5.125 becomes 41/8).',
    when: 'Your result is a decimal but the answer choices are fractions, or vice versa.',
    timeEstimate: '3 seconds',
  },
  'percent-shortcut': {
    name: 'Percent Operator',
    technique: 'Type a number with the % sign (35%) and Desmos prompts "of" — complete it (35% of 80) to get the value directly, no decimal conversion needed.',
    when: 'Quick percent-of computations inside a longer problem.',
    timeEstimate: '5 seconds',
  },
  regression: {
    name: 'Table + Regression',
    technique: 'Type "table" and enter the points (x-values under x_1, y-values under y_1). On a new line type y_1 ~ mx_1 + b — the tilde (not =) tells Desmos to fit, and the subscript-1 names tie the model to your table. Desmos reports m and b. For curved data swap the model: y_1 ~ ax_1^2 + bx_1 + c (quadratic) or y_1 ~ ab^(x_1) (exponential).',
    when: 'Given data points and asked for a line/curve of best fit, a trend slope, or a model constant.',
    timeEstimate: '40 seconds',
  },
  statistics: {
    name: 'Statistics Commands',
    technique: 'Type mean(85, 90, 78), median(...), stdev(...) for sample standard deviation, or stdevp(...) for population. Better: store the list once as L = [85, 90, 78] and run mean(L) or median(L) without retyping the numbers.',
    when: 'Any mean, median, or standard-deviation computation — especially when comparing two data sets.',
    timeEstimate: '15 seconds',
  },
  'number-theory': {
    name: 'LCM, GCF, and Remainders',
    technique: 'Type lcm(10, 20) for the least common multiple and gcd(10, 20) for the greatest common factor (gcf also works; both accept more than two inputs). For remainders, mod(155, 7) gives the remainder when 155 is divided by 7.',
    when: 'Factor/multiple questions and "what is the remainder" questions.',
    timeEstimate: '5 seconds',
  },
  'distance-midpoint': {
    name: 'Distance and Midpoint Commands',
    technique: 'Type distance((1, 2), (4, 6)) or midpoint((1, 2), (4, 6)) directly. Cleaner: store the points first (A = (1, 2), B = (4, 6)) and run distance(A, B) — Desmos also plots the stored points so you can see the setup.',
    when: 'Distance or midpoint between coordinates — no formula recall needed.',
    timeEstimate: '10 seconds',
  },
  'circle-geometry': {
    name: 'Graph the Circle',
    technique: 'Type the circle equation exactly as given — Desmos draws it, and you can read the center and radius off the graph. Add any points or lines from the problem on the lines below to see tangency, intersections, or inside/outside relationships instead of sketching by hand.',
    when: 'Circle equations and any coordinate-geometry setup described without a figure.',
    timeEstimate: '20 seconds',
  },
  'domain-restriction': {
    name: 'Domain Restriction Braces',
    technique: 'Append curly braces to limit a graph to an interval: f(x) = x^2 {x > 0} draws only the right half. Compound conditions work too: {0 <= x <= 5}.',
    when: 'Piecewise functions or any "for x greater than ..." condition.',
    timeEstimate: '10 seconds',
  },
  'angle-mode': {
    name: 'Radian/Degree Check',
    technique: 'Before any trig computation, open the wrench (settings) icon and confirm the angle mode matches the question. The test version defaults to DEGREES while desktop Desmos defaults to radians, so students who practice on the desktop site get burned both directions. The wrong mode returns a wrong answer with no warning — the most expensive silent Desmos mistake.',
    when: 'Every trigonometry question, before typing anything else.',
    timeEstimate: '3 seconds',
  },
  'zoom-window': {
    name: 'Fix the Viewing Window',
    technique: 'If you graph something and see nothing, the graph is outside the default window — zoom out with the minus button or press the home icon to reset. For models with large numbers (populations, prices), set the axis ranges in settings instead of scrolling.',
    when: 'Any time a graph appears blank or an expected intersection seems missing.',
    timeEstimate: '5 seconds',
  },
  'when-to-skip': {
    name: 'When NOT to Use Desmos',
    technique: 'One-step arithmetic and simple algebra are faster in your head or on paper — typing costs more than it saves. Desmos pays off on systems, tangency and solution-count conditions, regressions, statistics, and equations with messy numbers. When in doubt: solve by hand, then spend 5 seconds verifying in Desmos.',
    when: 'Deciding whether to open the calculator at all.',
    timeEstimate: '0 seconds',
  },
};

// Weak-skill id → the Desmos play that attacks that skill. Keys align with
// the canonical skill ids carried on studyPlan.weaknesses and question.skills.
export const DESMOS_SKILL_MAP = {
  'systems-of-equations': 'systems',
  'linear-equations': 'single-variable',
  'linear-functions': 'single-variable',
  'quadratic-equations': 'quadratic',
  'polynomial-functions': 'function-evaluation',
  'function-interpretation': 'function-evaluation',
  'circle-equations': 'circle-geometry',
  inequalities: 'inequality-region',
  'exponential-functions': 'regression',
  statistics: 'statistics',
  'data-analysis': 'statistics',
  percents: 'percent-shortcut',
  'percent-change': 'percent-shortcut',
  trigonometry: 'angle-mode',
  'coordinate-geometry': 'distance-midpoint',
};

/**
 * Get relevant strategies based on error patterns and weak skill IDs.
 * Returns the 2-3 most relevant strategy entries as a formatted string.
 */
export const getRelevantStrategies = (errorPatterns, weakSkillIds) => {
  const strategies = [];

  // Match trap guides to error patterns
  if (errorPatterns) {
    const trapTypeMap = {
      partial_calculation: 'partial_calculation',
      sign_error: 'sign_error',
      misread: 'misread_question',
      reversed_operation: 'reversed_operation',
      percentage_direction: 'percentage_direction',
      off_by_one: 'off_by_one',
      sequential_percent: 'sequential_percent',
    };

    Object.entries(errorPatterns).forEach(([errorType, count]) => {
      if (count >= 2) {
        const trapKey = trapTypeMap[errorType];
        if (trapKey && trapGuides[trapKey]) {
          strategies.push({
            type: 'trap',
            relevance: count,
            content: trapGuides[trapKey],
          });
        }
      }
    });
  }

  // Match misconception guides to weak skills
  if (weakSkillIds && Array.isArray(weakSkillIds)) {
    weakSkillIds.forEach(skillId => {
      if (misconceptionGuides[skillId]) {
        strategies.push({
          type: 'misconception',
          relevance: 1,
          content: { skillId, ...misconceptionGuides[skillId] },
        });
      }
    });
  }

  // Match Desmos plays to weak skills (at most one — the most relevant play,
  // so Desmos coaching never crowds out trap/misconception guidance)
  if (weakSkillIds && Array.isArray(weakSkillIds)) {
    const desmosKey = weakSkillIds
      .map(skillId => DESMOS_SKILL_MAP[skillId])
      .find(key => key && desmosTechniques[key]);
    if (desmosKey) {
      strategies.push({
        type: 'desmos',
        relevance: 1,
        content: { key: desmosKey, ...desmosTechniques[desmosKey] },
      });
    }
  }

  // Sort by relevance and take top 3
  strategies.sort((a, b) => b.relevance - a.relevance);
  const topStrategies = strategies.slice(0, 3);

  if (topStrategies.length === 0) return '';

  let result = '\n--- TARGETED STRATEGY GUIDES ---\n';
  result += 'Use these curated strategies when helping this student:\n\n';

  topStrategies.forEach(s => {
    if (s.type === 'trap') {
      result += `TRAP: ${s.content.name}\n`;
      result += `Recognition: ${s.content.recognition}\n`;
      result += `Fix: ${s.content.fix}\n`;
      result += `Example: ${s.content.example}\n\n`;
    } else if (s.type === 'desmos') {
      result += `DESMOS PLAY: ${s.content.name}\n`;
      result += `How: ${s.content.technique}\n`;
      result += `When: ${s.content.when} (about ${s.content.timeEstimate})\n\n`;
    } else {
      result += `MISCONCEPTION: ${s.content.skillId}\n`;
      result += `Common errors: ${s.content.commonErrors.join('; ')}\n`;
      result += `Correct approach: ${s.content.correctApproach}\n\n`;
    }
  });

  return result;
};

const satStrategies = {
  trapGuides,
  misconceptionGuides,
  desmosTechniques,
  DESMOS_SKILL_MAP,
  getRelevantStrategies,
};

export default satStrategies;
