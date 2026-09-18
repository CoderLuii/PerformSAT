/**
 * RENDER sweep over the recreated question bank (2026-09-05).
 *
 * The bank recreation (docs/BANK_RECREATION_SPEC.md) rewrote 2,121 math drill
 * items — the four shards in `bank/` (1,757) and the 14 topic files (364) —
 * plus the 41 R&W drill fills in `rwBank/authoredReadingItems.js`. Every one of
 * those items carries authored KaTeX (`$…$`), markdown scaffolds, optional
 * `diagram: {type, params}` specs, optional `questionTable`, and occasional
 * ```seva-figure JSON blocks inside the explanation. None of that is checked by
 * the content lints — they validate SHAPE, not whether the thing draws.
 *
 * This test drives every item through the REAL render path in jsdom:
 *   - `<MathText>` for question / every choice / hint / explanation
 *     (and every `questionTable` cell, through the shell's own table markup),
 *   - `<SolutionExplanation>` — the PRODUCTION explanation renderer — so the
 *     markdown scaffold is parsed into cards the way a student sees it, not
 *     just fed to MathText as one string,
 *   - `<QuestionDiagram>` for `diagram` and for every ```seva-figure block,
 *   - `<HighlightablePassage>` for R&W passages / studentNotes, which is what
 *     turns the authored `__…__` convention into a real <u> and `____` into a
 *     Conventions blank.
 *
 * It asserts, per item: no thrown error, no console.error / console.warn, a
 * non-empty mount, and — via a katex.renderToString interceptor that sees
 * exactly the spans MathText's own `$`-pairing (utils/inlineMathScan) produces —
 * no KaTeX parse error under `throwOnError: true, strict: 'warn'`.
 *
 * Failures are aggregated and reported as compact (source, id, field, error)
 * tuples so one run names every broken item instead of stopping at the first.
 *
 * Two guards keep a green run meaningful: a skip-none item-count assertion, and
 * a negative control that re-runs the same machinery over deliberately broken
 * content and fails if the sweep no longer detects it.
 *
 * Runtime ~55s standalone (2,162 items · ~71k KaTeX spans).
 */
global.IS_REACT_ACT_ENVIRONMENT = true;

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import katex from 'katex';

import { MathText } from '../../../components/MathText';
import QuestionDiagram from '../../../components/QuestionDiagrams';
import HighlightablePassage from '../../../components/rw/HighlightablePassage';
import SolutionExplanation from '../../../components/SolutionExplanation';
import {
  extractExplanationFigures,
  FIGURE_PLACEHOLDER_RE,
} from '../../../utils/explanationFigures';

import { algebraBank } from '../bank/algebra';
import { problemSolvingBank } from '../bank/problemSolving';
import { advancedMathBank } from '../bank/advancedMath';
import { geometryBank } from '../bank/geometry';

import { linearEquationsQuestions } from '../linearEquations';
import { circlesQuestions } from '../circles';
import { dimensionalAnalysisQuestions } from '../dimensionalAnalysis';
import { equivalentExpressionsQuestions } from '../equivalentExpressions';
import { exponentsQuestions } from '../exponents';
import { functionsQuestions } from '../functions';
import { percentsQuestions } from '../percents';
import { quadraticsQuestions } from '../quadratics';
import { radiansDegreesQuestions } from '../radiansDegrees';
import { statisticsQuestions } from '../statistics';
import { systemsQuestions } from '../systems';
import { transformationsQuestions } from '../transformations';
import { trianglesQuestions } from '../triangles';
import { volumeQuestions } from '../volume';

import { authoredReadingItems } from '../rwBank/authoredReadingItems';

// ── Expected corpus size (the skip-none guard) ───────────────────────────────
// If a shard/topic file loses items — or a future refactor makes an import
// resolve to undefined — the sweep would silently cover fewer items and still
// pass. These counts come from `node scripts/recreateBank.mjs status`.
const EXPECTED_SHARD_ITEMS = 1757;
const EXPECTED_TOPIC_ITEMS = 364;
const EXPECTED_RW_ITEMS = 41;

const SHARD_SOURCES = [
  ['algebra', algebraBank],
  ['problemSolving', problemSolvingBank],
  ['advancedMath', advancedMathBank],
  ['geometry', geometryBank],
];

const TOPIC_SOURCES = [
  ['linear-equations', linearEquationsQuestions],
  ['circles', circlesQuestions],
  ['dimensional-analysis', dimensionalAnalysisQuestions],
  ['equivalent-expressions', equivalentExpressionsQuestions],
  ['exponents', exponentsQuestions],
  ['functions', functionsQuestions],
  ['percents', percentsQuestions],
  ['quadratics', quadraticsQuestions],
  ['radians-degrees', radiansDegreesQuestions],
  ['statistics', statisticsQuestions],
  ['systems', systemsQuestions],
  ['transformations', transformationsQuestions],
  ['triangles', trianglesQuestions],
  ['volume', volumeQuestions],
];

// ── Flatten to a uniform {source, id, item} list ─────────────────────────────
const collectShardItems = () =>
  SHARD_SOURCES.flatMap(([source, bank]) =>
    (bank || []).map((item) => ({ source, id: String(item.id), item })));

const collectTopicItems = () =>
  TOPIC_SOURCES.flatMap(([source, sections]) =>
    Object.entries(sections || {}).flatMap(([section, items]) =>
      (items || []).map((item) => ({
        source,
        // Topic ids restart at 1 inside every section, so the section name is
        // part of the identity a failure report has to print.
        id: `${source}/${section}#${item.id}`,
        item,
      }))));

const collectRwItems = () =>
  (authoredReadingItems || []).map((item) => ({
    source: 'rwFills',
    id: `rw-authored-${item.id}`,
    item,
  }));

// ── Failure ledger ───────────────────────────────────────────────────────────
// `ledger` is swappable so the negative control below can run the SAME sweep
// machinery against a deliberately broken item without polluting the real run.
const failures = [];
const controlFailures = [];
let ledger = failures;
const fail = (kind, source, id, field, error) =>
  ledger.push({ kind, source, id, field, error: String(error).slice(0, 240) });

const byKind = (kind) => failures.filter((f) => f.kind === kind);

const report = (kind) => {
  const rows = byKind(kind);
  if (rows.length === 0) return '';
  const lines = rows.map(
    (f) => `  ${f.source} · ${f.id} · ${f.field} → ${f.error}`);
  return `\n${rows.length} ${kind} failure(s):\n${lines.join('\n')}\n`;
};

// ── Console capture ──────────────────────────────────────────────────────────
// React's warnings (duplicate keys, unknown DOM props, NaN attributes) and
// KaTeX's strict-mode warnings only surface on the console, so the sweep has to
// watch it. React dedupes many warnings by message+component, so the FIRST
// offending item is the one named — that is enough to find the content bug.
let consoleHits = [];
let capturing = false;
const realConsoleError = console.error;
const realConsoleWarn = console.warn;

// Narrow allow-list for warnings that are NOT caused by the recreation. Each
// entry must first be PROVEN pre-existing by rendering pre-recreation items the
// same way (`git show b1b3e50:src/data/questions/bank/algebra.js`) and seeing it
// fire there too — and then be written tightly enough to match only that one
// message.
//
// It is deliberately EMPTY: as of 2026-09-05 the full sweep produces zero
// console output, and the pre-recreation algebra shard produced zero as well,
// so nothing needs excusing. A broad entry here would mask a real regression.
const ALLOWED_CONSOLE = [];
let allowlisted = 0;

const installConsoleCapture = () => {
  console.error = (...args) => {
    if (capturing) consoleHits.push({ level: 'error', text: args.map(String).join(' ') });
    else realConsoleError(...args);
  };
  console.warn = (...args) => {
    if (capturing) consoleHits.push({ level: 'warn', text: args.map(String).join(' ') });
    else realConsoleWarn(...args);
  };
};
const restoreConsole = () => {
  console.error = realConsoleError;
  console.warn = realConsoleWarn;
};

// ── KaTeX interceptor ────────────────────────────────────────────────────────
// MathText calls `katex.renderToString(span, { throwOnError: false })` for every
// span its own `$`-pairing (utils/inlineMathScan) produced. Wrapping the shared
// katex object means the sweep sees EXACTLY those spans — no reimplementation of
// the pairing — and can re-assert them under `throwOnError: true`.
let katexErrors = [];
let katexSpansSeen = 0;
const realRenderToString = katex.renderToString;
const strictRenderToString = function patchedRenderToString(tex, options) {
  katexSpansSeen += 1;
  const opts = options || {};
  try {
    return realRenderToString.call(katex, tex, {
      ...opts,
      throwOnError: true,
      strict: 'warn',
    });
  } catch (e) {
    katexErrors.push({ tex: String(tex), message: e.message });
    // Fall back to the caller's own options so the render still completes and
    // downstream assertions (non-empty mount) stay meaningful.
    return realRenderToString.call(katex, tex, opts);
  }
};

// ── Mount helpers ────────────────────────────────────────────────────────────
// One container + one root for the whole sweep: re-creating a root per render
// is the dominant cost at this corpus size. `root.render` replaces the tree,
// and the root is unmounted once at the end.
let container;
let root;

const mountInto = (element) => {
  act(() => { root.render(element); });
};

// ── Field extraction ─────────────────────────────────────────────────────────
const choiceText = (c) => (typeof c === 'string' ? c : c && c.text);

/**
 * The plain-text fields an item renders through MathText, plus the explanation
 * with its ```seva-figure blocks already lifted out (that is what
 * SolutionExplanation feeds MathText).
 */
const textFieldsOf = (item) => {
  const fields = [];
  if (item.question != null) fields.push(['question', item.question]);
  (item.choices || []).forEach((c, i) => {
    fields.push([`choices[${i}]`, choiceText(c)]);
  });
  if (item.hint) fields.push(['hint', item.hint]);
  // Rhetorical-synthesis items carry `studentNotes` as a STRUCTURED object
  // ({ intro, bullets[], goal }) — the shells render intro/bullets through
  // HighlightablePassage and goal through MathText, so flatten to those parts
  // rather than handing the object to MathText.
  const notes = item.studentNotes;
  if (notes) {
    if (notes.intro) fields.push(['studentNotes.intro', notes.intro]);
    (Array.isArray(notes.bullets) ? notes.bullets : []).forEach((b, i) => {
      fields.push([`studentNotes.bullets[${i}]`, b]);
    });
    if (notes.goal) fields.push(['studentNotes.goal', notes.goal]);
  }
  return fields;
};

/** The R&W reader segments that go through HighlightablePassage. */
const passageSegmentsOf = (item) => {
  const segs = [];
  if (typeof item.passage === 'string' && item.passage) segs.push(['passage', item.passage]);
  (Array.isArray(item.passages) ? item.passages : []).forEach((p, i) => {
    const t = typeof p === 'string' ? p : p && p.text;
    if (t) segs.push([`passages[${i}]`, t]);
  });
  const notes = item.studentNotes;
  if (notes) {
    if (notes.intro) segs.push(['studentNotes.intro', notes.intro]);
    (Array.isArray(notes.bullets) ? notes.bullets : []).forEach((b, i) => {
      segs.push([`studentNotes.bullets[${i}]`, b]);
    });
  }
  return segs;
};

const explanationParts = (item) => {
  if (typeof item.explanation !== 'string') {
    return { text: item.explanation == null ? null : String(item.explanation), figures: [] };
  }
  const { text, figures } = extractExplanationFigures(item.explanation);
  // Drop the figure placeholder lines — SolutionExplanation swaps them for the
  // figure itself, so MathText never sees them.
  const cleaned = text
    .split('\n')
    .filter((line) => !FIGURE_PLACEHOLDER_RE.test(line.trim()))
    .join('\n');
  return { text: cleaned, figures };
};

// ── The probe components (mirror the practice shells) ────────────────────────
const TextProbe = ({ fields, table }) => (
  <div>
    {fields.map(([name, value]) => (
      <div key={name} data-field={name}>
        <MathText>{value}</MathText>
      </div>
    ))}
    {table && (
      // Same markup AssignedPracticeShell.jsx uses for `questionTable`.
      <table>
        <thead>
          <tr>
            {(table.headers || []).map((h, i) => (
              <th key={i}><MathText>{h}</MathText></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(table.rows || []).map((row, i) => (
            <tr key={i}>
              {(row || []).map((cell, j) => (
                <td key={j}><MathText>{cell}</MathText></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const FigureProbe = ({ specs }) => (
  <div>
    {specs.map((s, i) => (
      <div key={i} data-figure={i}>
        <QuestionDiagram type={s.type} params={s.params} />
      </div>
    ))}
  </div>
);

// ── One item, two passes ─────────────────────────────────────────────────────
let figureSpecsSeen = 0;
let figuresDrawn = 0;
let tablesSeen = 0;
let explanationsRendered = 0;

const sweepItem = ({ source, id, item }) => {
  const { text: explanationText, figures } = explanationParts(item);

  // ---- Pass A: text surface (MathText + questionTable) ----
  const fields = textFieldsOf(item);
  if (explanationText != null) fields.push(['explanation', explanationText]);

  const nonStringField = fields.find(
    ([, v]) => v != null && typeof v !== 'string');
  if (nonStringField) {
    fail('renderer-throw', source, id, nonStringField[0],
      `non-string field (${typeof nonStringField[1]}) — MathText expects a string`);
  }

  consoleHits = [];
  katexErrors = [];
  try {
    mountInto(<TextProbe fields={fields} table={item.questionTable} />);
    const html = container.innerHTML;
    if (!html || html.length === 0) {
      fail('empty-mount', source, id, 'text', 'MathText pass produced no markup');
    }
    if (item.questionTable) {
      tablesSeen += 1;
      if (!container.querySelector('table td')) {
        fail('empty-mount', source, id, 'questionTable', 'table mounted with no cells');
      }
    }
    // A question that is a non-empty string must produce visible text.
    if (typeof item.question === 'string' && item.question.trim() &&
        !container.textContent.trim() && !container.querySelector('svg')) {
      fail('empty-mount', source, id, 'question', 'rendered to empty text');
    }
  } catch (e) {
    fail('renderer-throw', source, id, 'text', e && e.message ? e.message : e);
  }
  drainConsole(source, id, 'text');
  drainKatex(source, id, fields);

  // ---- Pass B: figures (diagram + seva-figure blocks) ----
  const specs = [];
  if (item.diagram) specs.push({ ...item.diagram, _field: 'diagram' });
  figures.forEach((f, i) => specs.push({ ...f, _field: `seva-figure[${i}]` }));

  if (specs.length === 0) {
    return;
  }
  figureSpecsSeen += specs.length;

  consoleHits = [];
  katexErrors = [];
  try {
    mountInto(<FigureProbe specs={specs} />);
    specs.forEach((s, i) => {
      const host = container.querySelector(`[data-figure="${i}"]`);
      const drew = host && (host.querySelector('svg') || host.querySelector('table'));
      if (drew) figuresDrawn += 1;
      else {
        fail('empty-diagram', source, id, s._field,
          `type "${s.type}" mounted nothing (unknown type or missing params)`);
      }
    });
  } catch (e) {
    fail('renderer-throw', source, id, specs.map((s) => s._field).join('+'),
      e && e.message ? e.message : e);
  }
  drainConsole(source, id, specs.map((s) => s._field).join('+'));
  drainKatex(source, id, []);
};

/**
 * Pass C: the explanation through its PRODUCTION renderer.
 *
 * `SolutionExplanation` is what students actually see. It parses the authored
 * markdown scaffold (**SAT Pattern**, The Fast Way, Step N, Why the wrong
 * answers are tempting, Test Day Takeaway) into cards and feeds the pieces to
 * MathText — so a `$…$` span that straddles a scaffold boundary, or a bullet
 * list that mis-parses, only shows up here and not in the whole-string Pass A.
 */
const sweepExplanation = ({ source, id, item }) => {
  if (typeof item.explanation !== 'string' || !item.explanation.trim()) return;
  explanationsRendered += 1;
  consoleHits = [];
  katexErrors = [];
  try {
    mountInto(<SolutionExplanation explanation={item.explanation} isCorrect={false} />);
    if (!container.textContent.trim()) {
      fail('empty-mount', source, id, 'explanation(SolutionExplanation)',
        'the production explanation renderer produced no text');
    }
  } catch (e) {
    fail('renderer-throw', source, id, 'explanation(SolutionExplanation)',
      e && e.message ? e.message : e);
  }
  drainConsole(source, id, 'explanation(SolutionExplanation)');
  drainKatex(source, id, [['explanation', item.explanation]]);
};

function drainConsole(source, id, field) {
  consoleHits.forEach(({ level, text }) => {
    if (ALLOWED_CONSOLE.some((re) => re.test(text))) { allowlisted += 1; return; }
    const kind = /LaTeX-incompatible input|KaTeX/.test(text)
      ? 'katex-strict'
      : `console.${level}`;
    fail(kind, source, id, field, text.replace(/\s+/g, ' '));
  });
  consoleHits = [];
}

function drainKatex(source, id, fields) {
  katexErrors.forEach(({ tex, message }) => {
    const owner = fields.find(([, v]) => typeof v === 'string' && v.includes(tex));
    fail('katex-parse', source, id, owner ? owner[0] : 'math-span',
      `$${tex}$ → ${message}`);
  });
  katexErrors = [];
}

// ── The sweep ────────────────────────────────────────────────────────────────
const shardItems = collectShardItems();
const topicItems = collectTopicItems();
const rwItems = collectRwItems();

let sweepMs = 0;

beforeAll(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  katex.renderToString = strictRenderToString;
  installConsoleCapture();
  capturing = true;

  const started = Date.now();
  [...shardItems, ...topicItems, ...rwItems].forEach((entry) => {
    sweepItem(entry);
    sweepExplanation(entry);
  });

  // R&W passages go through HighlightablePassage (the Bluebook reader), which
  // is where the authored `__…__` / `*…*` markup becomes real <u> / <em>.
  rwItems.forEach(({ source, id, item }) => {
    passageSegmentsOf(item).forEach(([field, text]) => {
      consoleHits = [];
      try {
        mountInto(
          <HighlightablePassage
            text={text}
            highlights={[]}
            onAddHighlight={() => {}}
            onRemoveHighlight={() => {}}
          />);
        if (!container.textContent.trim()) {
          fail('empty-mount', source, id, field, 'passage rendered to empty text');
        }
        // The authored inline markup must never leak its delimiters into the
        // reader. Two distinct conventions share the underscore:
        //   `____` (4+)   → a Conventions/vocab blank  → <span class="rw-blank">
        //   `__text__`    → an underlined sentence      → <u>
        // Strip the blanks first so a blank is never read as an underline.
        const withoutBlanks = text.replace(/_{4,}/g, ' ');
        if (/__[\s\S]+?__/.test(withoutBlanks) && !container.querySelector('u')) {
          fail('underline-markup', source, id, field,
            '`__…__` present in the source but no <u> in the rendered passage');
        }
        if (/_{4,}/.test(text) && !container.querySelector('.rw-blank')) {
          fail('underline-markup', source, id, field,
            '`____` blank present in the source but no .rw-blank in the rendered passage');
        }
        if (/_{2,}/.test(container.textContent)) {
          fail('underline-markup', source, id, field,
            'raw `__` delimiters leaked into the rendered passage text');
        }
      } catch (e) {
        fail('renderer-throw', source, id, field, e && e.message ? e.message : e);
      }
      drainConsole(source, id, field);
    });
  });

  sweepMs = Date.now() - started;
  // Freeze the receipts BEFORE the negative control runs, so the control's own
  // traffic is never counted as coverage.
  const realCounts = { katexSpansSeen, figureSpecsSeen, figuresDrawn, tablesSeen, allowlisted, explanationsRendered };

  // ── Negative control ───────────────────────────────────────────────────────
  // A green sweep is only meaningful if the machinery can still go red. Run the
  // SAME `sweepItem` over deliberately broken items: bad LaTeX, a NaN diagram
  // param, and a diagram type the dispatcher does not know. If any of these
  // stops being detected (a katex interceptor that never installs, a console spy
  // that never fires), the control fails and the whole file fails with it —
  // instead of every real assertion passing vacuously.
  //
  // It runs LAST on purpose: React dedupes warnings by message, so a control
  // that fired first could consume the dedup slot for a warning a real item
  // would otherwise have raised.
  ledger = controlFailures;
  // (a) bad LaTeX → the katex interceptor must raise `katex-parse`.
  // (b) an unknown dispatcher type → the mount check must raise `empty-diagram`.
  sweepItem({
    source: '__control__',
    id: 'deliberately-broken',
    item: {
      id: 'deliberately-broken',
      question: 'Broken span: $\\notacommand{x}$ and $\\frac{1}{2$.',
      choices: [{ id: 'A', text: '$1$' }],
      explanation: 'plain',
      diagram: { type: 'thisTypeDoesNotExist', params: {} },
    },
  });
  // (c) a React warning → the console spy must raise `console.error`. A keyless
  // list is the most version-stable trigger; it lives on its own component type
  // so React's per-type dedup cannot have spent it on a real item.
  const KeylessListProbe = () => <div>{[<span>a</span>, <span>b</span>]}</div>;
  consoleHits = [];
  mountInto(<KeylessListProbe />);
  drainConsole('__control__', 'keyless-list', 'render');
  ledger = failures;
  ({ katexSpansSeen, figureSpecsSeen, figuresDrawn, tablesSeen, allowlisted, explanationsRendered } = realCounts);
  capturing = false;
  restoreConsole();
  // eslint-disable-next-line no-console
  console.log(`[render sweep] ${shardItems.length + topicItems.length + rwItems.length} items · ${katexSpansSeen} math spans · ${figureSpecsSeen} figures · ${explanationsRendered} explanations · ${(sweepMs / 1000).toFixed(1)}s · ${failures.length} failure(s)`);
}, 900000);

afterAll(() => {
  katex.renderToString = realRenderToString;
  restoreConsole();
  if (root) act(() => root.unmount());
  if (container && container.parentNode) container.parentNode.removeChild(container);
});

describe('recreated question bank — render sweep', () => {
  // ── skip-none guard ────────────────────────────────────────────────────────
  it('covers every recreated item (skip-none guard)', () => {
    const shardCounts = Object.fromEntries(
      SHARD_SOURCES.map(([s, b]) => [s, (b || []).length]));
    expect(shardCounts).toEqual({
      algebra: 514,
      problemSolving: 463,
      advancedMath: 425,
      geometry: 355,
    });
    expect(shardItems.length).toBe(EXPECTED_SHARD_ITEMS);
    expect(topicItems.length).toBe(EXPECTED_TOPIC_ITEMS);
    expect(rwItems.length).toBe(EXPECTED_RW_ITEMS);
    // Every item must carry an id and a question — a shape hole would make the
    // per-item passes trivially "pass".
    const hollow = [...shardItems, ...topicItems, ...rwItems]
      .filter(({ item }) => item.id == null || !item.question);
    expect(hollow.map((h) => h.id)).toEqual([]);
  });

  it('renders every math span without a KaTeX parse error', () => {
    expect(report('katex-parse') || null).toBeNull();
  });

  it('renders every span without a KaTeX strict-mode warning', () => {
    expect(report('katex-strict') || null).toBeNull();
  });

  it('renders every item without a renderer throw', () => {
    expect(report('renderer-throw') || null).toBeNull();
  });

  it('renders every item without a React console.error', () => {
    expect(report('console.error') || null).toBeNull();
  });

  it('renders every item without a console.warn', () => {
    expect(report('console.warn') || null).toBeNull();
  });

  it('mounts real markup for every diagram and questionTable', () => {
    expect(report('empty-diagram') || null).toBeNull();
    expect(report('empty-mount') || null).toBeNull();
  });

  it('renders the authored inline markup in every R&W passage', () => {
    expect(report('underline-markup') || null).toBeNull();
  });

  // ── the authored underline convention ─────────────────────────────────────
  it('renders the __…__ underline convention in rw-authored-9039 as a real <u>', () => {
    const item = authoredReadingItems.find((q) => q.id === 9039);
    expect(item).toBeTruthy();
    expect(item.passage).toContain('__');

    const c = document.createElement('div');
    document.body.appendChild(c);
    const r = createRoot(c);
    act(() => {
      r.render(
        <HighlightablePassage
          text={item.passage}
          highlights={[]}
          onAddHighlight={() => {}}
        />);
    });

    const underlined = c.querySelector('u');
    expect(underlined).toBeTruthy();
    expect(underlined.textContent).toContain(
      'That proportion is the only one that survives being halved');
    // The delimiters themselves must not survive into the reader.
    expect(c.textContent).not.toContain('__');

    act(() => r.unmount());
    c.remove();
  });

  // ── Anti-vacuity ──────────────────────────────────────────────────────────
  it('actually exercised the render path (no vacuous pass)', () => {
    expect(shardItems.length + topicItems.length + rwItems.length).toBe(
      EXPECTED_SHARD_ITEMS + EXPECTED_TOPIC_ITEMS + EXPECTED_RW_ITEMS);
    expect(sweepMs).toBeGreaterThan(0);
    // The katex interceptor must have seen the real span traffic — if MathText
    // ever stops routing through the shared `katex` object, this drops to ~0
    // and the "no parse error" tests would pass without checking anything.
    expect(katexSpansSeen).toBeGreaterThan(20000);
    // Every figure spec the CONTENT declares must have been rendered, and every
    // one rendered must have drawn an <svg>/<table>. Derived from the live data
    // rather than hard-coded, so adding authored figures cannot skip the check.
    const allItems = [...shardItems, ...topicItems, ...rwItems];
    const declaredFigures = allItems.reduce(
      (n, { item }) => n + (item.diagram ? 1 : 0) + explanationParts(item).figures.length, 0);
    const declaredTables = allItems.filter(({ item }) => item.questionTable).length;
    expect(figureSpecsSeen).toBe(declaredFigures);
    expect(figuresDrawn).toBe(figureSpecsSeen);
    expect(tablesSeen).toBe(declaredTables);
    // Every item with an explanation went through the PRODUCTION explanation
    // renderer too, not just the raw-string MathText pass.
    const declaredExplanations = allItems.filter(
      ({ item }) => typeof item.explanation === 'string' && item.explanation.trim()).length;
    expect(explanationsRendered).toBe(declaredExplanations);
    expect(declaredExplanations).toBe(allItems.length);
    // `node scripts/recreateBank.mjs status` counts diagram-or-questionTable as
    // one "figure": 499 diagrams + 30 tables = 529, plus 3 ```seva-figure
    // blocks the status line does not count. Guards against a silent collapse.
    expect(declaredFigures).toBeGreaterThanOrEqual(500);
    expect(declaredTables).toBeGreaterThanOrEqual(30);
    // The allow-list is empty, so nothing may be excused.
    expect(allowlisted).toBe(0);
  });

  it('negative control: the sweep still detects broken content', () => {
    const kinds = [...new Set(controlFailures.map((f) => f.kind))].sort();
    // Bad LaTeX is caught by the katex interceptor; a NaN SVG attribute and an
    // unknown diagram type are caught by the console spy / mount check.
    expect(kinds).toContain('katex-parse');
    expect(kinds).toContain('console.error');
    expect(kinds).toContain('empty-diagram');
  });
});
