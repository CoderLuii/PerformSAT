import React, { useMemo } from 'react';
import katex from 'katex';
import { pairInlineMath } from '../utils/inlineMathScan';

// HTML-escape the five significant characters so raw (LLM-generated or
// AI-authored bank) text can never inject markup into the dangerouslySetInnerHTML
// sink below. Ampersand first so existing entities are not double-broken. This is
// the same escape-first + private-use-placeholder-stash model as
// renderChatMarkdown.jsx: every construct that must emit real HTML (KaTeX output,
// <em>, table markup) is rendered and stashed into an inert private-use token
// BEFORE this runs, so escaping only ever touches plain narrative text.
const escapeHtml = (s) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

// Hoisted to module scope (was defined inline in the component body) so the
// per-render useMemo below can key purely on `content`. This pipeline runs a
// dozen regex passes plus katex.renderToString per span; before memoization it
// re-typeset every question on every PracticeTest fill-in keystroke.
const renderMath = (inputText) => {
    if (!inputText) return '';

    let result = String(inputText);

    // Step A: strip zero-width / BOM characters and normalize non-breaking
    // spaces. These silently break KaTeX ("No character metrics for ...") or
    // throw off the $-delimiter pairing, and are invisible in source review.
    result = result
      .replace(/[​‌‍⁠﻿]/g, '')
      .replace(/ /g, ' ');

    // Private-use-area placeholders — codepoints the model / bank text can never
    // emit, so a token can never be forged from input:
    //     escaped-dollar (\$)  → literal $  at the end
    //     newline              → <br>        at the end
    //     currency ($NN.NN)    → literal $NN.NN at the end
    //    …   trusted-HTML token (KaTeX / table / <em> stash)
    // The trusted-HTML stash is the security core: constructs that must emit
    // real HTML are rendered, escaped where appropriate, and hidden behind an
    // inert token; the surrounding prose is then HTML-escaped; tokens are
    // restored last. So a raw `<img onerror=...>` in a narrative or a table cell
    // becomes inert text, while legitimate math / tables / emphasis render.
    const ESCAPED_DOLLAR_PLACEHOLDER = '';
    const NEWLINE_PLACEHOLDER = '';
    const CURRENCY_PLACEHOLDER = '';
    const HTML_OPEN = '';
    const HTML_CLOSE = '';
    const HTML_TOKEN_RE = /(\d+)/g;

    const htmlChunks = [];
    const stashHtml = (html) => {
      htmlChunks.push(html);
      return HTML_OPEN + (htmlChunks.length - 1) + HTML_CLOSE;
    };

    // Render $$...$$ then $...$ into stashed trusted-HTML tokens. Runs on any
    // fragment (the whole string, or a single table cell) BEFORE that fragment
    // is escaped, so `<`, `>`, `&` living inside LaTeX (e.g. $a<b$, common in the
    // bank) reach KaTeX intact instead of as entities. A `*` inside math is
    // masked here too, so the later italic pass can never inject <em> into LaTeX.
    const renderMathSpans = (str) => {
      const renderSeg = (latex, displayMode, original) => {
        const clean = latex
          .replace(new RegExp(NEWLINE_PLACEHOLDER, 'g'), '\n')
          .replace(new RegExp(ESCAPED_DOLLAR_PLACEHOLDER, 'g'), '\\$')
          .trim();
        let html;
        try {
          html = katex.renderToString(clean, { displayMode, throwOnError: false });
        } catch (e) {
          // throwOnError:false rarely throws; on the rare failure keep the raw
          // text but ESCAPE it — a failed span must never funnel raw markup to
          // innerHTML.
          console.warn('KaTeX render error:', e);
          html = escapeHtml(original);
        }
        return stashHtml(html);
      };
      let out = str.replace(/\$\$([\s\S]*?)\$\$/g, (m, latex) => renderSeg(latex, true, m));
      // Inline $...$ via the shared strict scanner (2026-07-15, replacing the
      // naive non-greedy regex): an unbalanced or misread $ now stays a
      // literal dollar instead of swallowing everything up to the next $ —
      // the failure mode that garbled AI-generated narratives ("$1,200 and
      // $x$" pairing "1,200 and " as math). Spans stop at line breaks (real
      // newlines are NEWLINE_PLACEHOLDER by now, so that is the boundary).
      out = pairInlineMath(out, (latex, original) => renderSeg(latex, false, original), {
        lineBreakChars: '\n' + NEWLINE_PLACEHOLDER,
        // Authored-bank idiom: "$|expr| = $ a negative number" closes after an
        // operator + space. Safe here because MathText input is authored and
        // lint-gated; chat/AI rendering keeps the strict closer rule.
        operatorSpacedClose: true,
      });
      return out;
    };

    // Markdown bold **foo** → <strong>foo</strong> and italic *foo* → <em>foo</em>,
    // both run on already-escaped text (so the only `<`/`>` they produce are their
    // own tags — same trusted-transform contract). Bold MUST run before italic so
    // the doubled stars are consumed first; the leftover single stars — including
    // the outer *…* of a *sentence with a **bold** word*, which the Learn bodies
    // use in grammar tables — then italicize correctly. Single-line; content
    // excludes `*` so the passes never overlap.
    const applyBold = (str) => str.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
    const applyItalic = (str) => applyBold(str).replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

    // Step 0: Protect escaped dollar signs (\$) BEFORE any processing.
    // Handles \$25 style currency notation.
    result = result.replace(/\\\$/g, ESCAPED_DOLLAR_PLACEHOLDER);

    // Step 1: Convert Markdown tables to HTML. Must run on the raw text while
    // newlines are still real \n (the row detector keys on them). Each cell is
    // rendered through the SAME escape-first pipeline (math → escape → italic)
    // and the finished <table> is stashed as one trusted-HTML token, so a
    // `<script>` in a cell is inert while `$x$` / *emphasis* still render.
    const fmtCell = (raw) => applyItalic(escapeHtml(renderMathSpans(raw)));
    result = result.replace(
      /(^|\n)((?:\|[^\n]*\|\s*\n){2,}\|[^\n]*\|)/g,
      (match, prefix, tableBlock) => {
        const lines = tableBlock.split('\n').filter(l => l.trim());
        if (lines.length < 2) return match;
        // Second line must be the separator (|---|---|)
        if (!/^\|[\s\-:|]+\|$/.test(lines[1].trim())) return match;

        const parseCells = (row) =>
          row.split('|').slice(1, -1).map(c => c.trim());

        const headers = parseCells(lines[0]);
        const dataRows = lines.slice(2).map(parseCells);

        // Official table skin (2026-08-13 Bluebook-ink unification): white
        // cells, black rules, bold sans headers, serif values — the same skin
        // as DataTableDiagram, so stem pipe-tables match figure tables.
        let html = '<table style="border-collapse:collapse;margin:12px auto;font-size:15px;background:#fff;color:#111;font-family:\'Times New Roman\',Georgia,serif;">';
        html += '<thead><tr>';
        for (const h of headers) {
          html += '<th style="border:1.5px solid #111;padding:7px 16px;background:#fff;font-weight:bold;font-family:system-ui,-apple-system,sans-serif;font-size:14px;text-align:center;">' + fmtCell(h) + '</th>';
        }
        html += '</tr></thead><tbody>';
        for (const row of dataRows) {
          html += '<tr>';
          for (const cell of row) {
            html += '<td style="border:1px solid #111;padding:6px 16px;text-align:center;">' + fmtCell(cell) + '</td>';
          }
          html += '</tr>';
        }
        html += '</tbody></table>';

        return prefix + stashHtml(html);
      }
    );

    // Step 2: Convert newlines to a placeholder BEFORE math processing. KaTeX
    // SVG output contains newlines that should NOT become <br>; the survivors
    // become <br> at the end.
    result = result.replace(/\n/g, NEWLINE_PLACEHOLDER);

    // Step 3: Protect currency amounts ($12.50) BEFORE math extraction so a
    // currency $ never pairs with a later inline $x$. Deliberately matches only
    // $NN.NN (cents required): a cents-optional guard ($45) creates so many
    // placeholders that, in strings mixing currency with math, they leak into
    // mis-paired math segments and crash KaTeX. Authored content escapes
    // currency as \$, so this stays minimal. Skip when the whole string is one
    // math expression ($...$ / $$...$$) — every $ is a delimiter then.
    const currencies = [];
    const trimmed = result.trim();
    const isMathExpression = (trimmed.startsWith('$') && trimmed.endsWith('$')) ||
                             (trimmed.startsWith('$$') && trimmed.endsWith('$$'));

    // Escaped \$ are already placeholders, so this counts only unescaped $.
    // When they're balanced (even) and LaTeX is present, every $ is a math
    // delimiter — skip currency so a math span beginning with a decimal like
    // "$0.30 \times 80$" is not mis-grabbed as "$0.30" currency (which would
    // leave the closing $ unpaired and crash the whole segment). An odd count
    // means one $ really is stray currency, so detection still runs.
    // The LaTeX signal must read the ORIGINAL input, not `result`: Step 0 has
    // already eaten the backslash of every escaped \$, and \% has no letter,
    // so a line whose only commands are \% (or whose only backslash was \$
    // currency) would test command-free here and get a math opener like
    // "$1.03 " consumed as currency, garbling the rest of the line. The
    // escaped-dollar placeholder itself also counts as a signal — a \$ means
    // the content was authored LaTeX-aware.
    const dollarCount = (result.match(/\$/g) || []).length;
    const hasLatexCmd = /\\[a-zA-Z%]/.test(String(inputText)) ||
      result.includes(ESCAPED_DOLLAR_PLACEHOLDER);
    const balancedMath = dollarCount >= 2 && dollarCount % 2 === 0 && hasLatexCmd;

    if (!isMathExpression && !balancedMath) {
      result = result.replace(/\$(\d+(?:,\d{3})*\.\d{2})(?=[\s,;:.!?)}\]]|$)/g, (match, amount) => {
        currencies.push(amount);
        return CURRENCY_PLACEHOLDER;
      });
    }

    // Step 4: Render remaining (non-table) math spans into trusted-HTML tokens —
    // display $$...$$ first, then inline $...$. Doing this before the italic step
    // guarantees a `*` inside an inline math expression ($a * b$) is never seen
    // by the italic regex, which would otherwise inject <em> into LaTeX.
    result = renderMathSpans(result);

    // Step 5: HTML-escape everything that remains. At this point the only
    // non-plain-text in `result` is inert placeholders (- + digits),
    // so escaping cannot touch a single KaTeX / table byte — it only neutralizes
    // raw markup that lived in the surrounding narrative.
    result = escapeHtml(result);

    // Step 6: Markdown italic *foo* → <em>foo</em> on the escaped prose. Math is
    // already masked, so the only `*` left are genuine emphasis (book titles).
    result = applyItalic(result);

    // Step 7: Restore stashed trusted HTML (KaTeX + tables). A table token
    // expands to markup that still contains math tokens, so loop until stable
    // (bounded — nesting is at most table → math, one level).
    let restoreGuard = 0;
    while (result.indexOf(HTML_OPEN) !== -1 && restoreGuard++ < 5) {
      result = result.replace(HTML_TOKEN_RE, (m, i) => htmlChunks[+i] || '');
    }

    // Step 8: Restore currency amounts with $ sign (digits only — safe).
    let currencyIndex = 0;
    result = result.replace(new RegExp(CURRENCY_PLACEHOLDER, 'g'), () => {
      return '$' + currencies[currencyIndex++];
    });

    // Step 9: Restore escaped dollar signs as literal $ (e.g., \$25 → $25).
    result = result.replace(new RegExp(ESCAPED_DOLLAR_PLACEHOLDER, 'g'), '$');

    // Step 10: Convert surviving newline placeholders to <br>.
    result = result.replace(new RegExp(NEWLINE_PLACEHOLDER, 'g'), '<br>');

    return result;
};

// React.memo + useMemo: skip both the reconcile and the expensive typeset when
// the resolved content is unchanged (the common case while a sibling fill-in
// input re-renders the question on every keystroke). Output is byte-identical
// to the pre-memo version.
const MathTextInner = ({ children, text, className = '', style = {} }) => {
  const content = text !== undefined ? text : children;
  const html = useMemo(() => renderMath(content), [content]);

  return (
    <span
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const MathText = React.memo(MathTextInner);

export const MathBlock = ({ children, className = '', style = {} }) => {
  if (!children) return null;

  try {
    const latex = String(children).replace(/^\$\$|\$\$$/g, '').trim();
    const html = katex.renderToString(latex, { displayMode: true, throwOnError: false });
    return (
      <div
        className={className}
        style={{ textAlign: 'center', margin: '1rem 0', ...style }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (e) {
    return <div className={className} style={style}>{String(children)}</div>;
  }
};

export default MathText;
