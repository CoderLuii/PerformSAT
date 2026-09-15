// QuestionRenderer.jsx - Renders question content with explicit math/text segments
// NO REGEX PARSING - math segments are explicitly marked in data

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { MathText } from './MathText';

/**
 * Renders a single segment (either text or math)
 */
const Segment = ({ segment }) => {
  if (typeof segment === 'string') {
    return <MathText>{segment}</MathText>;
  }

  if (segment.text) {
    return <MathText>{segment.text}</MathText>;
  }

  if (segment.math) {
    if (segment.display) {
      return (
        <div style={{ margin: '8px 0' }}>
          <BlockMath math={segment.math} />
        </div>
      );
    }
    return <InlineMath math={segment.math} />;
  }

  return <MathText>{String(segment)}</MathText>;
};

/**
 * QuestionRenderer - Renders question content from structured data
 *
 * Accepts either:
 * 1. Array of segments: [{ math: "x^2" }, { text: " equals " }, { math: "4" }]
 * 2. Single string (legacy format - rendered as plain text)
 * 3. Object with segments array
 *
 * Segment types:
 * - { text: "plain text" } - Plain text
 * - { math: "x^2" } - Inline math
 * - { math: "y = mx + b", display: true } - Display math (centered, own line)
 * - "plain string" - Plain text (shorthand)
 */
// React.memo: every caller passes a stable `content` reference off the current
// question object (e.g. currentQuestion.question) and no fn/object literals, so
// when a sibling fill-in input re-renders the question on each keystroke this
// whole subtree — and its per-segment MathText typesetting — is skipped.
const QuestionRenderer = React.memo(({ content, className = '', style = {} }) => {
  // Handle null/undefined
  if (!content) return null;

  // Handle legacy string format - use MathText to process $...$ patterns
  if (typeof content === 'string') {
    return <MathText className={className} style={style}>{content}</MathText>;
  }

  // Handle array of segments
  if (Array.isArray(content)) {
    return (
      <span className={className} style={style}>
        {content.map((segment, index) => (
          <Segment key={index} segment={segment} />
        ))}
      </span>
    );
  }

  // Handle object with segments array
  if (content.segments && Array.isArray(content.segments)) {
    return (
      <span className={className} style={style}>
        {content.segments.map((segment, index) => (
          <Segment key={index} segment={segment} />
        ))}
      </span>
    );
  }

  // Fallback
  return <MathText className={className} style={style}>{String(content)}</MathText>;
});

/**
 * Helper function to create question content from a template string
 * This is a migration helper - converts old format to new format
 *
 * Usage:
 *   createQuestion("Solve $x^2 = 4$ for $x$.")
 *   // Returns: [{ text: "Solve " }, { math: "x^2 = 4" }, { text: " for " }, { math: "x" }, { text: "." }]
 */
export const createQuestion = (template) => {
  if (typeof template !== 'string') return template;

  const segments = [];

  // Match $...$ patterns
  const mathRegex = /\$([^$]+)\$/g;
  let lastIndex = 0;
  let match;

  while ((match = mathRegex.exec(template)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      segments.push({ text: template.slice(lastIndex, match.index) });
    }
    // Add the math segment
    segments.push({ math: match[1] });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last match
  if (lastIndex < template.length) {
    segments.push({ text: template.slice(lastIndex) });
  }

  return segments;
};

export default QuestionRenderer;
