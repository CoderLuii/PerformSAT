/**
 * Bluebook-ink invariants for QuestionDiagram (2026-08-13 restyle).
 *
 * Two guards:
 *  1. figureNote: true on any diagram spec renders the official caption
 *     "Note: Figure not drawn to scale." beneath the figure (dispatcher-level,
 *     so every type supports it) and never leaks the param into the SVG.
 *  2. Question figures are INK: no legacy gray-plate, no blue/orange/purple
 *     accents in the rendered markup of the common types. Emphasis is
 *     geometry (dash, open point), never color — matching the official
 *     educator-bank figures. Dev-only error frames are exempt (not rendered
 *     by valid specs).
 *
 * No RTL in this repo — render to static markup and assert on the string.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import QuestionDiagram from '../QuestionDiagrams';

const render = (type, params) =>
  ReactDOMServer.renderToStaticMarkup(<QuestionDiagram type={type} params={params} />);

const NOTE = 'Note: Figure not drawn to scale.';

// A color-leak scan over the exact hexes the restyle removed. If one of these
// reappears in a question figure, the ink contract is broken.
const BANNED_COLORS = /#(?:e5e5e5|2563eb|dbeafe|7c3aed|1e40af|ea580c|9a3412|c92a2a|4a5568|e8f4fc|f3f4f6|f9fafb)\b/i;

const SPECS = [
  ['scatterplot', {
    points: [[1, 8], [4, 14], [7, 22], [10, 30]],
    xMin: 0, xMax: 10, yMin: 0, yMax: 32,
    bestFitLine: { slope: 2.5, intercept: 4 },
    highlightPoint: [4, 14], showResidual: true, highlightLabel: '(4, 14)',
  }],
  ['circleWithSector', { centralAngle: 90, angleLabel: '90°', radius: 10, showRadiusLabel: true }],
  ['rightTriangle', { sideLabels: ['9', '', '12'], rightAngleVertex: 1 }],
  ['table', { xHeader: 'x', yHeader: 'f(x)', rows: [['1', '5'], ['2', '8']] }],
  ['dataTable', { headers: ['x', 'f(x)'], rows: [['2', 't + 9'], ['5', 't']] }],
  ['twoWayTable', { headers: ['', 'A', 'B'], rows: [['X', '1', '2']] }],
  ['barChart', { data: [{ label: '0-9', value: 4 }, { label: '10-19', value: 7 }], yMax: 8, yStep: 2 }],
  ['linearGraph', { slope: -4, yIntercept: 8, xRange: [-4, 4], yRange: [-2, 16], xTickInterval: 2, yTickInterval: 4, gridInterval: 1 }],
];

describe('QuestionDiagram Bluebook-ink invariants', () => {
  test.each(SPECS)('%s renders without banned colors', (type, params) => {
    const html = render(type, params);
    expect(html.length).toBeGreaterThan(50);
    const match = html.match(BANNED_COLORS);
    expect(match ? `${type} leaks ${match[0]}` : null).toBeNull();
  });

  test('figureNote: true renders the official caption once, after the figure', () => {
    const html = render('rightTriangle', {
      sideLabels: ['9', '', '12'],
      rightAngleVertex: 1,
      figureNote: true,
    });
    const occurrences = html.split(NOTE).length - 1;
    expect(occurrences).toBe(1);
    // Caption follows the SVG, never precedes it
    expect(html.indexOf('</svg>')).toBeLessThan(html.indexOf(NOTE));
    // The stripped param never reaches the SVG as an attribute
    expect(html).not.toMatch(/figurenote/i);
  });

  test('figureNote works on table types too (no SVG present)', () => {
    const html = render('dataTable', {
      headers: ['x', 'y'],
      rows: [['1', '2']],
      figureNote: true,
    });
    expect(html).toContain(NOTE);
  });

  test('no figureNote param means no caption', () => {
    const html = render('rightTriangle', { sideLabels: ['9', '', '12'] });
    expect(html).not.toContain(NOTE);
  });
});
