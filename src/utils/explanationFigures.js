/**
 * Explanation inline-figure spec: extract + validate.
 *
 * An authored explanation can carry a figure by embedding a fenced
 * ```seva-figure``` block whose body is JSON of the exact shape the existing
 * `QuestionDiagram` dispatcher accepts — `{ type, params }` — plus an optional
 * top-level `caption` string. Same contract as the tutor's ```seva-graph```
 * blocks (utils/graphSpec.js), but for AUTHORED bank/test content rather than
 * model output, so every dispatcher type is allowed and correctness is
 * enforced at authoring time by the bank lint (scripts/validateBank.mjs),
 * not by per-type runtime validators. The render-side error boundary in
 * SolutionExplanation is the last line of defense.
 *
 * This module is PURE (no React, no DOM): `extractExplanationFigures` swaps
 * each valid block for a single-line placeholder that survives the
 * line-oriented explanation parser, and strips invalid blocks entirely so raw
 * JSON is never shown to a student.
 */

export const FIGURE_FENCE_LANG = 'seva-figure';

// Every `case` in the QuestionDiagram dispatcher switch
// (src/components/QuestionDiagrams.jsx). Keep in sync when adding renderers —
// the bank lint fails on any authored type not listed here.
export const SUPPORTED_FIGURE_TYPES = new Set([
  'rationalFunction', 'quadraticVertex', 'quadratic', 'absoluteValue',
  'coordinatePoints', 'quadraticIntercepts', 'scatterplot', 'linearLine',
  'simpleLine', 'table', 'linearFunctionGraph', 'wavyFunction',
  'generalFunction', 'dotPlot', 'boxPlot', 'dataTable', 'linearGraph',
  'parabola', 'barChart', 'circleWithSector', 'circleWithSquare',
  'circleWithInscribedTriangle', 'intersectingLines', 'piecewiseLinear',
  'cubicGraph', 'parallelLines', 'twoLineGraph', 'twoWayTable',
  'rightTriangle', 'triangleWithAngles', 'rightTriangleWithAltitude',
  'similarTriangles', 'nestedRightTriangles',
]);

// U+0001 never appears in authored content; the placeholder sits on its own
// line so the line-oriented parseExplanation can attach the figure to
// whatever section is open at that point.
const PLACEHOLDER_PREFIX = '\u0001FIG';
const PLACEHOLDER_SUFFIX = '\u0001';
// eslint-disable-next-line no-control-regex -- U+0001 is the deliberate figure-placeholder sentinel documented above; it never appears in authored content
export const FIGURE_PLACEHOLDER_RE = /^\u0001FIG(\d+)\u0001$/;

const CLOSED_BLOCK_RE_G = /```[ \t]*seva-figure\b[^\n]*\n([\s\S]*?)```/g;
const OPEN_FENCE_RE = /```[ \t]*seva-figure\b/;

/**
 * Parse one block body into a validated `{ type, params, caption }`.
 *
 * @param {string} jsonStr - raw text between the fences
 * @returns {{type: string, params: object, caption: string|null} | null}
 *   null ALWAYS means "no figure, strip the block" — it never throws.
 */
export function parseFigureSpec(jsonStr) {
  if (typeof jsonStr !== 'string' || !jsonStr.trim()) return null;
  let obj;
  try {
    obj = JSON.parse(jsonStr.trim());
  } catch {
    return null;
  }
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return null;
  const { type, params, caption } = obj;
  if (typeof type !== 'string' || !SUPPORTED_FIGURE_TYPES.has(type)) return null;
  if (params !== undefined && (typeof params !== 'object' || params === null || Array.isArray(params))) return null;
  if (caption !== undefined && typeof caption !== 'string') return null;
  return { type, params: params || {}, caption: caption || null };
}

/**
 * Pull every seva-figure block out of an explanation.
 *
 * Valid blocks become numbered placeholder lines (index into `figures`);
 * invalid blocks and a trailing unclosed fence are stripped outright.
 *
 * @param {string} text - the full explanation
 * @returns {{text: string, figures: Array<{type,params,caption}>}}
 */
export function extractExplanationFigures(text) {
  if (typeof text !== 'string' || !text.includes('```')) {
    return { text: text || '', figures: [] };
  }
  const figures = [];
  let out = text.replace(CLOSED_BLOCK_RE_G, (_, body) => {
    const spec = parseFigureSpec(body);
    if (!spec) return '\n';
    figures.push(spec);
    return `\n${PLACEHOLDER_PREFIX}${figures.length - 1}${PLACEHOLDER_SUFFIX}\n`;
  });
  const open = OPEN_FENCE_RE.exec(out);
  if (open) out = out.slice(0, open.index);
  return { text: out, figures };
}
