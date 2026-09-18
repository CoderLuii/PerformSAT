// SATBoxPlot.jsx - Box-and-whisker plot for SAT-style one-variable-data items.
//
// Two modes:
//
//   1. Single: pass { min, q1, median, q3, max } as top-level fields.
//   2. Comparison: pass `distributions: [{label, min, q1, median, q3, max,
//      outliers?}]` to render multiple plots stacked vertically on a shared
//      axis. Each plot gets a small label on its left.
//
// Visual style matches the rest of the SAT graph family: black axis, light
// gray gridlines, Arial labels. Box is unfilled (white interior) with thick
// black borders; median is a thick vertical bar inside the box; whiskers are
// thin horizontal lines extending to min/max.
//
// Supports an optional `outliers` array of x-values plotted as small circles
// just above the axis line.

import React from 'react';
import { SAT_GRAPH_STYLES } from './SATGraphCore';

const SATBoxPlot = ({
  min,
  q1,
  median,
  q3,
  max,
  outliers = [],
  distributions,
  xMin: providedXMin,
  xMax: providedXMax,
  xGridStep,
  xLabelStep,
  xLabel = '',
  title = '',
  width = 420,
  height,
}) => {
  // If `distributions` is provided, delegate to the comparison renderer.
  if (Array.isArray(distributions) && distributions.length > 0) {
    return (
      <SATBoxPlotComparison
        distributions={distributions}
        xMin={providedXMin}
        xMax={providedXMax}
        xGridStep={xGridStep}
        xLabelStep={xLabelStep}
        xLabel={xLabel}
        title={title}
        width={width}
      />
    );
  }

  if (height === undefined) height = 180;
  const styles = SAT_GRAPH_STYLES;

  // Determine axis range with 5-10% padding on each side
  const dataMin = Math.min(min, ...outliers);
  const dataMax = Math.max(max, ...outliers);
  const range = dataMax - dataMin || 1;
  const pad = range * 0.08;
  const xMin = providedXMin !== undefined ? providedXMin : Math.floor((dataMin - pad) * 10) / 10;
  const xMax = providedXMax !== undefined ? providedXMax : Math.ceil((dataMax + pad) * 10) / 10;

  // Pick sensible default grid/label step if not given (5-10 ticks)
  const autoStep = (() => {
    const span = xMax - xMin;
    const roughStep = span / 8;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const norm = roughStep / magnitude;
    let nice;
    if (norm < 1.5) nice = 1;
    else if (norm < 3) nice = 2;
    else if (norm < 7) nice = 5;
    else nice = 10;
    return nice * magnitude;
  })();
  const gridStep = xGridStep || autoStep;
  const labelStep = xLabelStep || gridStep;

  // SVG geometry
  const padding = { top: 30, right: 20, bottom: 50, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const xToSvg = (x) => padding.left + ((x - xMin) / (xMax - xMin)) * chartWidth;

  // Box vertical span — sits centered in the chart area
  const boxTop = padding.top + chartHeight * 0.25;
  const boxBottom = padding.top + chartHeight * 0.75;
  const whiskerY = padding.top + chartHeight * 0.5;
  const axisY = height - padding.bottom + 8;

  // Gridlines + ticks
  const gridXs = [];
  for (let x = Math.ceil(xMin / gridStep) * gridStep; x <= xMax + 1e-9; x += gridStep) {
    gridXs.push(Number(x.toFixed(6)));
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '16px 0',
    }}>
      {/* viewBox + width:100%/max-width keeps the drawing pixel-identical at
          desktop (the card is wider than `width`) while letting the 420px-wide
          box plot scale down inside a phone-width card instead of overflowing. */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ background: styles.colors.background, width: '100%', maxWidth: width, height: 'auto' }}
      >
        {title && (
          <text x={width / 2} y={16} textAnchor="middle" fontFamily={styles.font.primary} fontSize={14} fontWeight="bold">
            {title}
          </text>
        )}

        {/* Gridlines */}
        {gridXs.map((g) => (
          <line key={`g-${g}`} x1={xToSvg(g)} y1={padding.top} x2={xToSvg(g)} y2={axisY} stroke={styles.colors.gridLine} strokeWidth={styles.strokeWidth.grid} />
        ))}

        {/* Whiskers — horizontal line from min to max */}
        <line x1={xToSvg(min)} y1={whiskerY} x2={xToSvg(max)} y2={whiskerY} stroke={styles.colors.axis} strokeWidth={1.5} />
        {/* Whisker caps */}
        <line x1={xToSvg(min)} y1={boxTop + chartHeight * 0.08} x2={xToSvg(min)} y2={boxBottom - chartHeight * 0.08} stroke={styles.colors.axis} strokeWidth={2} />
        <line x1={xToSvg(max)} y1={boxTop + chartHeight * 0.08} x2={xToSvg(max)} y2={boxBottom - chartHeight * 0.08} stroke={styles.colors.axis} strokeWidth={2} />

        {/* Box from Q1 to Q3 */}
        <rect x={xToSvg(q1)} y={boxTop} width={xToSvg(q3) - xToSvg(q1)} height={boxBottom - boxTop} fill="#ffffff" stroke={styles.colors.axis} strokeWidth={2} />

        {/* Median line */}
        <line x1={xToSvg(median)} y1={boxTop} x2={xToSvg(median)} y2={boxBottom} stroke={styles.colors.axis} strokeWidth={2.5} />

        {/* Outliers (if any) */}
        {outliers.map((o, i) => (
          <circle key={`o-${i}`} cx={xToSvg(o)} cy={whiskerY} r={3.5} fill="none" stroke={styles.colors.axis} strokeWidth={1.5} />
        ))}

        {/* Axis line */}
        <line x1={padding.left} y1={axisY} x2={width - padding.right} y2={axisY} stroke={styles.colors.axis} strokeWidth={styles.strokeWidth.axis} />

        {/* Tick labels */}
        {gridXs.map((g) => {
          // Show label only at labelStep intervals
          const showLabel = Math.abs(g / labelStep - Math.round(g / labelStep)) < 1e-6;
          if (!showLabel) return null;
          return (
            <g key={`tick-${g}`}>
              <line x1={xToSvg(g)} y1={axisY} x2={xToSvg(g)} y2={axisY + 5} stroke={styles.colors.axis} strokeWidth={styles.strokeWidth.tick} />
              <text x={xToSvg(g)} y={axisY + 18} textAnchor="middle" fontFamily={styles.font.axis} fontSize={styles.fontSize.tickLabel}>
                {Number.isInteger(g) ? g : g.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* x-axis label */}
        {xLabel && (
          <text x={width / 2} y={height - 6} textAnchor="middle" fontFamily={styles.font.primary} fontSize={styles.fontSize.axisLabel} fontStyle="italic">
            {xLabel}
          </text>
        )}
      </svg>
    </div>
  );
};

// Comparison renderer — multiple box plots stacked on a shared axis.
const SATBoxPlotComparison = ({
  distributions,
  xMin: providedXMin,
  xMax: providedXMax,
  xGridStep,
  xLabelStep,
  xLabel = '',
  title = '',
  width = 420,
}) => {
  const styles = SAT_GRAPH_STYLES;

  // Shared axis range across all distributions
  const allMins = distributions.flatMap(d => [d.min, ...(d.outliers || [])]);
  const allMaxs = distributions.flatMap(d => [d.max, ...(d.outliers || [])]);
  const dataMin = Math.min(...allMins);
  const dataMax = Math.max(...allMaxs);
  const range = dataMax - dataMin || 1;
  const pad = range * 0.08;
  const xMin = providedXMin !== undefined ? providedXMin : Math.floor((dataMin - pad) * 10) / 10;
  const xMax = providedXMax !== undefined ? providedXMax : Math.ceil((dataMax + pad) * 10) / 10;

  const autoStep = (() => {
    const span = xMax - xMin;
    const roughStep = span / 8;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const norm = roughStep / magnitude;
    let nice;
    if (norm < 1.5) nice = 1;
    else if (norm < 3) nice = 2;
    else if (norm < 7) nice = 5;
    else nice = 10;
    return nice * magnitude;
  })();
  const gridStep = xGridStep || autoStep;
  const labelStep = xLabelStep || gridStep;

  // Per-distribution row height + chart geometry
  const rowHeight = 70;
  const headerH = title ? 24 : 8;
  const axisLabelsH = 30;
  const xLabelH = xLabel ? 18 : 0;
  const labelGutter = 64; // left space for distribution labels
  const height = headerH + distributions.length * rowHeight + axisLabelsH + xLabelH;

  const chartLeft = labelGutter;
  const chartRight = width - 20;
  const chartWidth = chartRight - chartLeft;
  const xToSvg = (x) => chartLeft + ((x - xMin) / (xMax - xMin)) * chartWidth;

  const gridXs = [];
  for (let x = Math.ceil(xMin / gridStep) * gridStep; x <= xMax + 1e-9; x += gridStep) {
    gridXs.push(Number(x.toFixed(6)));
  }

  const axisY = headerH + distributions.length * rowHeight + 8;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
      {/* viewBox + width:100%/max-width keeps the drawing pixel-identical at
          desktop (the card is wider than `width`) while letting the 420px-wide
          box plot scale down inside a phone-width card instead of overflowing. */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ background: styles.colors.background, width: '100%', maxWidth: width, height: 'auto' }}
      >
        {title && (
          <text x={width / 2} y={16} textAnchor="middle" fontFamily={styles.font.primary} fontSize={14} fontWeight="bold">
            {title}
          </text>
        )}

        {/* Full-height gridlines spanning all rows */}
        {gridXs.map((g) => (
          <line key={`g-${g}`} x1={xToSvg(g)} y1={headerH} x2={xToSvg(g)} y2={axisY} stroke={styles.colors.gridLine} strokeWidth={styles.strokeWidth.grid} />
        ))}

        {distributions.map((d, i) => {
          const top = headerH + i * rowHeight;
          const boxTop = top + rowHeight * 0.25;
          const boxBottom = top + rowHeight * 0.75;
          const whiskerY = top + rowHeight * 0.5;
          return (
            <g key={`d-${i}`}>
              <text x={chartLeft - 10} y={whiskerY + 4} textAnchor="end" fontFamily={styles.font.primary} fontSize={13} fontWeight={600}>
                {d.label}
              </text>
              <line x1={xToSvg(d.min)} y1={whiskerY} x2={xToSvg(d.max)} y2={whiskerY} stroke={styles.colors.axis} strokeWidth={1.5} />
              <line x1={xToSvg(d.min)} y1={boxTop + rowHeight * 0.08} x2={xToSvg(d.min)} y2={boxBottom - rowHeight * 0.08} stroke={styles.colors.axis} strokeWidth={2} />
              <line x1={xToSvg(d.max)} y1={boxTop + rowHeight * 0.08} x2={xToSvg(d.max)} y2={boxBottom - rowHeight * 0.08} stroke={styles.colors.axis} strokeWidth={2} />
              <rect x={xToSvg(d.q1)} y={boxTop} width={xToSvg(d.q3) - xToSvg(d.q1)} height={boxBottom - boxTop} fill="#ffffff" stroke={styles.colors.axis} strokeWidth={2} />
              <line x1={xToSvg(d.median)} y1={boxTop} x2={xToSvg(d.median)} y2={boxBottom} stroke={styles.colors.axis} strokeWidth={2.5} />
              {(d.outliers || []).map((o, oi) => (
                <circle key={`o-${i}-${oi}`} cx={xToSvg(o)} cy={whiskerY} r={3.5} fill="none" stroke={styles.colors.axis} strokeWidth={1.5} />
              ))}
            </g>
          );
        })}

        {/* Axis */}
        <line x1={chartLeft} y1={axisY} x2={chartRight} y2={axisY} stroke={styles.colors.axis} strokeWidth={styles.strokeWidth.axis} />

        {/* Tick labels */}
        {gridXs.map((g) => {
          const showLabel = Math.abs(g / labelStep - Math.round(g / labelStep)) < 1e-6;
          if (!showLabel) return null;
          return (
            <g key={`tick-${g}`}>
              <line x1={xToSvg(g)} y1={axisY} x2={xToSvg(g)} y2={axisY + 5} stroke={styles.colors.axis} strokeWidth={styles.strokeWidth.tick} />
              <text x={xToSvg(g)} y={axisY + 18} textAnchor="middle" fontFamily={styles.font.axis} fontSize={styles.fontSize.tickLabel}>
                {Number.isInteger(g) ? g : g.toFixed(1)}
              </text>
            </g>
          );
        })}

        {xLabel && (
          <text x={(chartLeft + chartRight) / 2} y={height - 4} textAnchor="middle" fontFamily={styles.font.primary} fontSize={styles.fontSize.axisLabel} fontStyle="italic">
            {xLabel}
          </text>
        )}
      </svg>
    </div>
  );
};

export default SATBoxPlot;
