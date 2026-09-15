// SATGraphCore.js - Shared utilities for SAT-style graph components
import React from 'react';

// SAT Graph Styling Constants
export const SAT_GRAPH_STYLES = {
  // Serif figure typography (2026-08-13 Bluebook-ink restyle): official
  // educator-bank figures set tick numbers and labels in the serif math
  // face, matching KaTeX stems — verified against the 2026-08 CB release.
  font: {
    primary: "'Times New Roman', Georgia, serif",
    axis: "'Times New Roman', Georgia, serif",
  },
  colors: {
    axis: '#000000',
    gridLine: '#e0e0e0',
    dataLine: '#000000',
    pointFill: '#000000',
    pointHighlight: '#000000',  // emphasis by geometry (open point), never color
    background: '#ffffff',
    border: '#d1d5db',
  },
  strokeWidth: {
    axis: 1.5,
    grid: 0.5,
    dataLine: 2,
    tick: 1,
  },
  dimensions: {
    pointRadius: 5,
    highlightRadius: 6,
    tickLength: 6,
    arrowSize: 8,
    labelOffset: 15,
  },
  fontSize: {
    axisLabel: 16,
    tickLabel: 12,
    origin: 12,
  },
};

/**
 * Creates a coordinate transformation system for math-to-SVG conversion
 * @param {Object} config - Configuration object
 * @param {[number, number]} config.xRange - [xMin, xMax] in math coordinates
 * @param {[number, number]} config.yRange - [yMin, yMax] in math coordinates
 * @param {Object} config.svgDimensions - {width, height} of SVG viewport
 * @param {Object} config.padding - {top, right, bottom, left} padding in pixels
 * @returns {Object} - Transformation functions and metadata
 */
export function createCoordinateSystem({ xRange, yRange, svgDimensions, padding }) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const { width, height } = svgDimensions;
  const { top, right, bottom, left } = padding;

  // Calculate the drawable area
  const drawWidth = width - left - right;
  const drawHeight = height - top - bottom;

  // Calculate scale factors
  const xScale = drawWidth / (xMax - xMin);
  const yScale = drawHeight / (yMax - yMin);

  // Transform from math coordinates to SVG coordinates
  const toSVG = (mathX, mathY) => ({
    x: left + (mathX - xMin) * xScale,
    y: top + (yMax - mathY) * yScale, // Y is inverted in SVG
  });

  // Transform from SVG coordinates to math coordinates
  const toMath = (svgX, svgY) => ({
    x: xMin + (svgX - left) / xScale,
    y: yMax - (svgY - top) / yScale,
  });

  // Get the SVG position of the origin (0, 0)
  const origin = toSVG(0, 0);

  return {
    toSVG,
    toMath,
    origin,
    xScale,
    yScale,
    bounds: {
      left,
      right: width - right,
      top,
      bottom: height - bottom,
    },
    mathBounds: { xMin, xMax, yMin, yMax },
  };
}

/**
 * Generates a unique clip path ID and the rect definition
 * @param {string} componentId - Unique identifier for the component
 * @param {Object} bounds - {left, right, top, bottom} in SVG coordinates
 * @returns {Object} - clipPathId and ClipPathDef component
 */
export function createClipPath(componentId, bounds) {
  const clipPathId = `graph-clip-${componentId}`;

  const ClipPathDef = () => (
    <defs>
      <clipPath id={clipPathId}>
        <rect
          x={bounds.left}
          y={bounds.top}
          width={bounds.right - bounds.left}
          height={bounds.bottom - bounds.top}
        />
      </clipPath>
    </defs>
  );

  return { clipPathId, ClipPathDef };
}

/**
 * Renders SAT-style axes with arrows, ticks, and labels
 * @param {Object} coordSystem - From createCoordinateSystem()
 * @param {Object} options - Customization options
 */
export function renderAxes(coordSystem, options = {}) {
  const {
    showXAxis = true,
    showYAxis = true,
    xTickInterval = 1,
    yTickInterval = 1,
    xAxisLabel = 'x',
    yAxisLabel = 'y',
  } = options;

  const { toSVG, bounds, mathBounds, origin } = coordSystem;
  const { xMin, xMax, yMin, yMax } = mathBounds;
  const styles = SAT_GRAPH_STYLES;

  const elements = [];

  // Check if origin is within visible range
  const originVisible = xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0;

  // X-Axis
  if (showXAxis) {
    const xAxisY = originVisible ? origin.y : bounds.bottom;

    // X-axis line
    elements.push(
      <line
        key="x-axis"
        x1={bounds.left}
        y1={xAxisY}
        x2={bounds.right}
        y2={xAxisY}
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />
    );

    // X-axis arrow
    elements.push(
      <polygon
        key="x-arrow"
        points={`
          ${bounds.right + styles.dimensions.arrowSize},${xAxisY}
          ${bounds.right},${xAxisY - styles.dimensions.arrowSize / 2}
          ${bounds.right},${xAxisY + styles.dimensions.arrowSize / 2}
        `}
        fill={styles.colors.axis}
      />
    );

    // X-axis label (italic)
    elements.push(
      <text
        key="x-label"
        x={bounds.right + styles.dimensions.arrowSize + 5}
        y={xAxisY + 5}
        fontFamily={styles.font.axis}
        fontSize={styles.fontSize.axisLabel}
        fontStyle="italic"
        fill={styles.colors.axis}
      >
        {xAxisLabel}
      </text>
    );

    // X-axis tick marks and labels
    for (let x = Math.ceil(xMin / xTickInterval) * xTickInterval; x <= xMax; x += xTickInterval) {
      if (x === 0 && originVisible) continue; // Skip origin tick
      const pos = toSVG(x, 0);

      // Only draw if within bounds
      if (pos.x >= bounds.left && pos.x <= bounds.right) {
        // BUG FIX 3: Skip labels too close to y-axis (within 20px)
        const yAxisX = originVisible ? origin.x : bounds.left;
        const tooCloseToYAxis = Math.abs(pos.x - yAxisX) < 20;

        elements.push(
          <line
            key={`x-tick-${x}`}
            x1={pos.x}
            y1={xAxisY - styles.dimensions.tickLength / 2}
            x2={pos.x}
            y2={xAxisY + styles.dimensions.tickLength / 2}
            stroke={styles.colors.axis}
            strokeWidth={styles.strokeWidth.tick}
          />
        );

        // Only render label if not too close to y-axis
        if (!tooCloseToYAxis) {
          elements.push(
            <text
              key={`x-tick-label-${x}`}
              x={pos.x}
              y={xAxisY + styles.dimensions.labelOffset + styles.fontSize.tickLabel / 2}
              textAnchor="middle"
              fontFamily={styles.font.axis}
              fontSize={styles.fontSize.tickLabel}
              fill={styles.colors.axis}
              stroke="#ffffff"
              strokeWidth={3}
              paintOrder="stroke"
            >
              {x}
            </text>
          );
        }
      }
    }
  }

  // Y-Axis
  if (showYAxis) {
    const yAxisX = originVisible ? origin.x : bounds.left;

    // Y-axis line
    elements.push(
      <line
        key="y-axis"
        x1={yAxisX}
        y1={bounds.bottom}
        x2={yAxisX}
        y2={bounds.top}
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />
    );

    // Y-axis arrow
    elements.push(
      <polygon
        key="y-arrow"
        points={`
          ${yAxisX},${bounds.top - styles.dimensions.arrowSize}
          ${yAxisX - styles.dimensions.arrowSize / 2},${bounds.top}
          ${yAxisX + styles.dimensions.arrowSize / 2},${bounds.top}
        `}
        fill={styles.colors.axis}
      />
    );

    // Y-axis label (italic)
    elements.push(
      <text
        key="y-label"
        x={yAxisX + 5}
        y={bounds.top - styles.dimensions.arrowSize - 2}
        fontFamily={styles.font.axis}
        fontSize={styles.fontSize.axisLabel}
        fontStyle="italic"
        fill={styles.colors.axis}
      >
        {yAxisLabel}
      </text>
    );

    // Y-axis tick marks and labels
    for (let y = Math.ceil(yMin / yTickInterval) * yTickInterval; y <= yMax; y += yTickInterval) {
      if (y === 0 && originVisible) continue; // Skip origin tick
      const pos = toSVG(0, y);

      // Only draw if within bounds
      if (pos.y >= bounds.top && pos.y <= bounds.bottom) {
        // BUG FIX 3: Skip labels too close to x-axis (within 20px)
        const xAxisY = originVisible ? origin.y : bounds.bottom;
        const tooCloseToXAxis = Math.abs(pos.y - xAxisY) < 20;

        elements.push(
          <line
            key={`y-tick-${y}`}
            x1={yAxisX - styles.dimensions.tickLength / 2}
            y1={pos.y}
            x2={yAxisX + styles.dimensions.tickLength / 2}
            y2={pos.y}
            stroke={styles.colors.axis}
            strokeWidth={styles.strokeWidth.tick}
          />
        );

        // Only render label if not too close to x-axis
        if (!tooCloseToXAxis) {
          elements.push(
            <text
              key={`y-tick-label-${y}`}
              x={yAxisX - styles.dimensions.labelOffset}
              y={pos.y + styles.fontSize.tickLabel / 3}
              textAnchor="end"
              fontFamily={styles.font.axis}
              fontSize={styles.fontSize.tickLabel}
              fill={styles.colors.axis}
              stroke="#ffffff"
              strokeWidth={3}
              paintOrder="stroke"
            >
              {y}
            </text>
          );
        }
      }
    }
  }

  // BUG FIX 1: REMOVED "O" origin label - College Board doesn't use it

  return elements;
}

/**
 * Renders light gray grid lines
 */
export function renderGrid(coordSystem, options = {}) {
  const { xInterval = 1, yInterval = 1 } = options;
  const { toSVG, bounds, mathBounds } = coordSystem;
  const { xMin, xMax, yMin, yMax } = mathBounds;
  const styles = SAT_GRAPH_STYLES;

  const lines = [];

  // Vertical grid lines
  for (let x = Math.ceil(xMin / xInterval) * xInterval; x <= xMax; x += xInterval) {
    const pos = toSVG(x, 0);
    if (pos.x >= bounds.left && pos.x <= bounds.right) {
      lines.push(
        <line
          key={`grid-v-${x}`}
          x1={pos.x}
          y1={bounds.top}
          x2={pos.x}
          y2={bounds.bottom}
          stroke={styles.colors.gridLine}
          strokeWidth={styles.strokeWidth.grid}
        />
      );
    }
  }

  // Horizontal grid lines
  for (let y = Math.ceil(yMin / yInterval) * yInterval; y <= yMax; y += yInterval) {
    const pos = toSVG(0, y);
    if (pos.y >= bounds.top && pos.y <= bounds.bottom) {
      lines.push(
        <line
          key={`grid-h-${y}`}
          x1={bounds.left}
          y1={pos.y}
          x2={bounds.right}
          y2={pos.y}
          stroke={styles.colors.gridLine}
          strokeWidth={styles.strokeWidth.grid}
        />
      );
    }
  }

  return lines;
}

/**
 * Generates a unique component ID
 */
let idCounter = 0;
export function generateId() {
  return `sat-graph-${++idCounter}-${Math.random().toString(36).substr(2, 9)}`;
}

// =============================================================================
// OFFICIAL-SAT FIGURE HELPERS
// Shared styling + label-placement utilities so geometry figures read like the
// Digital SAT (Bluebook): borderless white frame, labels held off the strokes
// with a white halo, single-letter variables in italic, side labels pushed
// perpendicular to their segment so they never sit on a line.
// =============================================================================

/**
 * Props spread onto any <text> so a white "halo" is painted behind the glyphs.
 * Keeps a label legible even when it sits close to a line — the stroke is drawn
 * first (paintOrder), so the figure's line never cuts through the letters.
 * Usage: <text {...LABEL_HALO} ...>29</text>
 */
export const LABEL_HALO = {
  stroke: '#ffffff',
  strokeWidth: 3,
  strokeLinejoin: 'round',
  paintOrder: 'stroke',
};

/**
 * SVG container style for a pure geometry figure. The official SAT draws
 * figures on white with NO bounding box, so we drop the border the old
 * components used. (Charts/scatterplots keep their plotting frame separately.)
 */
export const SAT_FIGURE_STYLE = {
  background: '#ffffff',
  borderRadius: 12,
  display: 'block',
  margin: '0 auto',
  overflow: 'visible',
};

/**
 * Serif math font for figure labels so a figure's "a" / "29" match the
 * KaTeX-rendered variables and numbers in the question stem (KaTeX renders
 * math in a Computer-Modern-style serif; Times is the web-safe approximation
 * the app already uses for the axis "y").
 */
export const SAT_FIGURE_FONT = "'Times New Roman', Georgia, serif";

/**
 * True when a label should be rendered as an italic math variable.
 * Single letters (a, x, ℓ, θ) and short algebraic expressions (a + 1, 2x,
 * (3x+10)°) are italic — matching the stem's math typography. Pure numbers
 * (29, 45°), radicals (√41, s√2), equations (BC = 15), unknowns (?), and
 * multi-word prose (axis captions) stay upright.
 * @param {string|number} label
 * @returns {boolean}
 */
export function isVariableLabel(label) {
  if (label == null) return false;
  const s = String(label).trim();
  if (!s) return false;
  // Equations, radicals, and explicit unknowns read as upright math, not a variable.
  if (/[=√?]/.test(s)) return false;
  const core = s.replace(/°/g, '');
  // Must contain a variable letter (latin or greek, incl. the script-ell ℓ).
  if (!/[A-Za-zα-ωΑ-Ωℓ]/.test(core)) return false;
  // Reject multi-word prose (two or more alphabetic words of length ≥ 3).
  const proseWords = core.split(/\s+/).filter((w) => /^[A-Za-z]{3,}$/.test(w));
  if (proseWords.length >= 2) return false;
  return true;
}

/**
 * Returns the anchor point for a segment's length label, pushed PERPENDICULAR
 * to the segment and onto the outside (the side away from the figure interior).
 * This replaces the old "offset radially from the centroid" trick, which shoved
 * hypotenuse labels straight onto the line.
 * Pair with textAnchor="middle" + dominantBaseline="central" so the glyph
 * centers on the returned point.
 * @param {[number,number]} v1 - segment start (SVG coords)
 * @param {[number,number]} v2 - segment end (SVG coords)
 * @param {[number,number]} interior - a point inside the figure (e.g. centroid)
 * @param {number} [gap=16] - distance from the segment to the label center
 * @returns {{x:number,y:number}}
 */
export function perpendicularLabelPos(v1, v2, interior, gap = 16) {
  const mid = [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2];
  let dx = v2[0] - v1[0];
  let dy = v2[1] - v1[1];
  const len = Math.hypot(dx, dy) || 1;
  dx /= len; dy /= len;
  // Two unit normals; pick the one pointing away from the interior point.
  let nx = -dy;
  let ny = dx;
  const towardInteriorX = interior[0] - mid[0];
  const towardInteriorY = interior[1] - mid[1];
  if (nx * towardInteriorX + ny * towardInteriorY > 0) { nx = -nx; ny = -ny; }
  return { x: mid[0] + nx * gap, y: mid[1] + ny * gap };
}
