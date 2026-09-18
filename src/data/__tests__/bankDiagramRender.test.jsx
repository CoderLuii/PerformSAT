/**
 * Every diagram spec in the math bank and the assembled practice tests must
 * actually RENDER through QuestionDiagram (2026-08-13, guard rail for the
 * figure backfill). A diagram field that throws, renders empty, or names an
 * unsupported type would ship a broken or missing figure to students — this
 * catches it at authoring time instead.
 *
 * Renders via ReactDOMServer (no RTL in this repo). Kept as one sweep so the
 * failure message names the exact item id.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import QuestionDiagram from '../../components/QuestionDiagrams';
import { SUPPORTED_FIGURE_TYPES } from '../../utils/explanationFigures';
import { questionBank } from '../questions/bank';
import { practiceTests } from '../practiceTests';

const collect = () => {
  const specs = [];
  questionBank.forEach((q) => {
    if (q.diagram) specs.push({ where: `bank ${q.id}`, diagram: q.diagram });
  });
  practiceTests.forEach((t) => {
    t.modules.forEach((m, mi) => {
      m.questions.forEach((q) => {
        if (q.diagram) specs.push({ where: `${t.id} m${mi} q${q.id}`, diagram: q.diagram });
      });
    });
    [t.module2Easy, t.rwModule2Easy].filter(Boolean).forEach((m) => {
      m.questions.forEach((q) => {
        if (q.diagram) specs.push({ where: `${t.id} m2e q${q.id}`, diagram: q.diagram });
      });
    });
  });
  return specs;
};

describe('every authored diagram spec renders', () => {
  const specs = collect();

  test('there are diagram specs to check', () => {
    expect(specs.length).toBeGreaterThan(100);
  });

  test('all types are supported by the dispatcher', () => {
    // SUPPORTED_FIGURE_TYPES is a Set
    const bad = specs.filter((s) => !SUPPORTED_FIGURE_TYPES.has(s.diagram.type));
    expect(bad.map((s) => `${s.where}: ${s.diagram.type}`)).toEqual([]);
  });

  test('all specs render non-empty markup without throwing', () => {
    const failures = [];
    specs.forEach(({ where, diagram }) => {
      let html = '';
      try {
        html = ReactDOMServer.renderToStaticMarkup(
          <QuestionDiagram type={diagram.type} params={diagram.params} />,
        );
      } catch (err) {
        failures.push(`${where}: threw ${err.message}`);
        return;
      }
      // Dev builds render a loud error SVG on invalid params — treat as failure.
      if (!html || html.length < 40) failures.push(`${where}: empty render`);
      if (/Validation Error|Error:/.test(html)) failures.push(`${where}: validator error frame`);
    });
    expect(failures).toEqual([]);
  });
});
