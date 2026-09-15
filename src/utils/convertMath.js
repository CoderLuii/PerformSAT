/**
 * Math Conversion Utilities
 *
 * Converts plain text math notation to LaTeX for KaTeX rendering.
 * Used to batch-convert existing question data.
 */

/**
 * Convert plain text math to LaTeX notation
 * @param {string} text - Text containing plain math notation
 * @returns {string} - Text with LaTeX math notation
 */
export const convertToLaTeX = (text) => {
  if (!text || typeof text !== 'string') return text;

  let result = text;

  // Convert fractions like "3/4" to "$\frac{3}{4}$"
  // But avoid converting things like "2x/3y" which need manual handling
  result = result.replace(/(?<![a-zA-Z])(\d+)\/(\d+)(?![a-zA-Z\d])/g, '$$\\frac{$1}{$2}$$');

  // Convert exponents like "x^2" or "x^12" to "$x^{2}$"
  result = result.replace(/([a-zA-Z])(\^)(\d+)/g, '$$$1^{$3}$$');

  // Convert sqrt(x) or √x to "$\sqrt{x}$"
  result = result.replace(/sqrt\(([^)]+)\)/gi, '$$\\sqrt{$1}$$');
  result = result.replace(/√(\d+)/g, '$$\\sqrt{$1}$$');
  result = result.replace(/√\(([^)]+)\)/g, '$$\\sqrt{$1}$$');

  // Convert pi symbol
  result = result.replace(/\bpi\b/gi, '$$\\pi$$');

  // Convert degree symbol - "90°" or "90 degrees"
  result = result.replace(/(\d+)°/g, '$$$1^\\circ$$');
  result = result.replace(/(\d+)\s*degrees/gi, '$$$1^\\circ$$');

  // Convert inequality symbols
  result = result.replace(/>=/g, '$$\\geq$$');
  result = result.replace(/<=/g, '$$\\leq$$');
  result = result.replace(/!=/g, '$$\\neq$$');

  // Convert plus-minus
  result = result.replace(/\+\/-/g, '$$\\pm$$');
  result = result.replace(/±/g, '$$\\pm$$');

  // Consolidate adjacent math regions (e.g., $x$$y$ → $xy$)
  result = result.replace(/\$\$\$/g, '$$');

  return result;
};

/**
 * Convert a single question object to use LaTeX notation
 * @param {Object} question - Question object with text and choices
 * @returns {Object} - Question with LaTeX math notation
 */
export const convertQuestion = (question) => {
  if (!question) return question;

  return {
    ...question,
    question: question.question ? convertToLaTeX(question.question) : question.question,
    text: question.text ? convertToLaTeX(question.text) : question.text,
    choices: question.choices?.map(choice => ({
      ...choice,
      text: choice.text ? convertToLaTeX(choice.text) : choice.text,
      label: choice.label ? convertToLaTeX(choice.label) : choice.label,
    })),
    explanation: question.explanation ? convertToLaTeX(question.explanation) : question.explanation,
  };
};

/**
 * Convert all questions in an array to use LaTeX notation
 * @param {Array} questions - Array of question objects
 * @returns {Array} - Questions with LaTeX math notation
 */
export const convertAllQuestions = (questions) => {
  if (!Array.isArray(questions)) return questions;
  return questions.map(convertQuestion);
};

/**
 * Check if text contains any math that needs rendering
 * @param {string} text - Text to check
 * @returns {boolean} - True if text contains math notation
 */
export const containsMath = (text) => {
  if (!text || typeof text !== 'string') return false;

  // Check for LaTeX delimiters
  if (/\$[^$]+\$/.test(text)) return true;
  if (/\$\$[\s\S]+\$\$/.test(text)) return true;

  // Check for plain math notation that might need conversion
  if (/\d+\/\d+/.test(text)) return true;  // Fractions
  if (/[a-zA-Z]\^\d+/.test(text)) return true;  // Exponents
  if (/sqrt\(/i.test(text)) return true;  // Square roots
  if (/√/.test(text)) return true;  // Square root symbol

  return false;
};

/**
 * Common LaTeX templates for SAT math
 */
export const LaTeXTemplates = {
  fraction: (num, den) => `\\frac{${num}}{${den}}`,
  exponent: (base, exp) => `${base}^{${exp}}`,
  sqrt: (x) => `\\sqrt{${x}}`,
  nthRoot: (n, x) => `\\sqrt[${n}]{${x}}`,
  degrees: (deg) => `${deg}^\\circ`,
  subscript: (base, sub) => `${base}_{${sub}}`,
  absolute: (x) => `|${x}|`,
  angle: (label) => `\\angle ${label}`,
  triangle: (label) => `\\triangle ${label}`,
  parallel: () => '\\parallel',
  perpendicular: () => '\\perp',
  pi: () => '\\pi',
  infinity: () => '\\infty',
  leq: () => '\\leq',
  geq: () => '\\geq',
  neq: () => '\\neq',
  pm: () => '\\pm',
  times: () => '\\times',
  div: () => '\\div',
};

const convertMath = {
  convertToLaTeX,
  convertQuestion,
  convertAllQuestions,
  containsMath,
  LaTeXTemplates,
};

export default convertMath;
