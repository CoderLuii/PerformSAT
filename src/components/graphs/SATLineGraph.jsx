// SATLineGraph.jsx - Time series / connected points with custom x-axis labels
import React, { useMemo } from 'react';
import {
  SAT_GRAPH_STYLES,
  createCoordinateSystem,
  createClipPath,
  renderGrid,
  generateId,
} from './SATGraphCore';

const SATLineGraph = ({
  data = [],
  xLabel = '',
  yLabel = '',
  xTickLabels = null, // Custom labels for x-axis (e.g., years)
  yRange: providedYRange,
  showPoints = true,
  connectPoints = true,
  width = 320,
  height = 280,
  yTickInterval,
  gridInterval = 1,
}) => {
  const componentId = useMemo(() => generateId(), []);
  const styles = SAT_GRAPH_STYLES;

  // Calculate x range from data
  const xValues = data.map(d => d.x);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- a fresh array each render, so the coordSystem useMemo below always recomputes; wrapping it would newly memoize and change render identity
  const xRange = [xMin - 0.5, xMax + 0.5];

  // Calculate y range (auto or provided)
  const yValues = data.map(d => d.y);
  const dataYMin = Math.min(...yValues);
  const dataYMax = Math.max(...yValues);
  const yPadding = (dataYMax - dataYMin) * 0.1;
  // eslint-disable-next-line react-hooks/exhaustive-deps -- a fresh array each render, so the coordSystem useMemo below always recomputes; wrapping it would newly memoize and change render identity
  const yRange = providedYRange || [
    Math.floor(dataYMin - yPadding),
    Math.ceil(dataYMax + yPadding),
  ];

  // Auto-calculate y tick interval
  const yTick = yTickInterval || Math.ceil((yRange[1] - yRange[0]) / 8);

  // Create coordinate system
  const coordSystem = useMemo(() =>
    createCoordinateSystem({
      xRange,
      yRange,
      svgDimensions: { width, height },
      padding: { top: 30, right: 30, bottom: 55, left: 55 },
    }),
    [xRange, yRange, width, height]
  );

  // Create clip path
  const { clipPathId, ClipPathDef } = useMemo(
    () => createClipPath(componentId, coordSystem.bounds),
    [componentId, coordSystem.bounds]
  );

  const { bounds, toSVG, mathBounds } = coordSystem;
  const { yMin: mathYMin, yMax: mathYMax } = mathBounds;

  // Generate path for connected points
  const linePath = useMemo(() => {
    if (!connectPoints || data.length < 2) return '';

    const svgPoints = data.map(d => toSVG(d.x, d.y));
    let path = `M ${svgPoints[0].x} ${svgPoints[0].y}`;
    for (let i = 1; i < svgPoints.length; i++) {
      path += ` L ${svgPoints[i].x} ${svgPoints[i].y}`;
    }
    return path;
  }, [data, connectPoints, toSVG]);

  // Check if origin is in range
  const originVisible = yRange[0] <= 0 && yRange[1] >= 0;
  const xAxisY = originVisible ? toSVG(0, 0).y : bounds.bottom;
  const yAxisX = bounds.left;

  return (
    <svg
      width={width}
      height={height}
      style={{
        background: styles.colors.background,
        border: `1px solid ${styles.colors.border}`,
        borderRadius: 12,
      }}
    >
      <ClipPathDef />

      {/* Grid */}
      {renderGrid(coordSystem, { xInterval: gridInterval, yInterval: gridInterval })}

      {/* X-Axis */}
      <line
        x1={bounds.left}
        y1={xAxisY}
        x2={bounds.right}
        y2={xAxisY}
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />
      <polygon
        points={`
          ${bounds.right + styles.dimensions.arrowSize},${xAxisY}
          ${bounds.right},${xAxisY - styles.dimensions.arrowSize / 2}
          ${bounds.right},${xAxisY + styles.dimensions.arrowSize / 2}
        `}
        fill={styles.colors.axis}
      />

      {/* X-axis label */}
      {xLabel && (
        <text
          x={bounds.right + styles.dimensions.arrowSize + 5}
          y={xAxisY + 5}
          fontFamily={styles.font.axis}
          fontSize={styles.fontSize.axisLabel}
          fontStyle="italic"
          fill={styles.colors.axis}
        >
          {xLabel}
        </text>
      )}

      {/* X-axis ticks with custom labels */}
      {data.map((d, i) => {
        const pos = toSVG(d.x, 0);
        const label = xTickLabels ? xTickLabels[i] : (d.label || d.x);

        return (
          <g key={`x-tick-${i}`}>
            <line
              x1={pos.x}
              y1={xAxisY - styles.dimensions.tickLength / 2}
              x2={pos.x}
              y2={xAxisY + styles.dimensions.tickLength / 2}
              stroke={styles.colors.axis}
              strokeWidth={styles.strokeWidth.tick}
            />
            <text
              x={pos.x}
              y={xAxisY + styles.dimensions.labelOffset + styles.fontSize.tickLabel / 2}
              textAnchor="middle"
              fontFamily={styles.font.axis}
              fontSize={styles.fontSize.tickLabel}
              fill={styles.colors.axis}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Y-Axis */}
      <line
        x1={yAxisX}
        y1={bounds.bottom}
        x2={yAxisX}
        y2={bounds.top}
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />
      <polygon
        points={`
          ${yAxisX},${bounds.top - styles.dimensions.arrowSize}
          ${yAxisX - styles.dimensions.arrowSize / 2},${bounds.top}
          ${yAxisX + styles.dimensions.arrowSize / 2},${bounds.top}
        `}
        fill={styles.colors.axis}
      />

      {/* Y-axis label */}
      {yLabel && (
        <text
          x={yAxisX + 5}
          y={bounds.top - styles.dimensions.arrowSize - 2}
          fontFamily={styles.font.axis}
          fontSize={styles.fontSize.axisLabel}
          fontStyle="italic"
          fill={styles.colors.axis}
        >
          {yLabel}
        </text>
      )}

      {/* Y-axis ticks */}
      {Array.from(
        { length: Math.floor((mathYMax - mathYMin) / yTick) + 1 },
        (_, i) => Math.ceil(mathYMin / yTick) * yTick + i * yTick
      )
        .filter(y => y >= mathYMin && y <= mathYMax)
        .map(y => {
          const pos = toSVG(0, y);
          return (
            <g key={`y-tick-${y}`}>
              <line
                x1={yAxisX - styles.dimensions.tickLength / 2}
                y1={pos.y}
                x2={yAxisX + styles.dimensions.tickLength / 2}
                y2={pos.y}
                stroke={styles.colors.axis}
                strokeWidth={styles.strokeWidth.tick}
              />
              <text
                x={yAxisX - styles.dimensions.labelOffset}
                y={pos.y + styles.fontSize.tickLabel / 3}
                textAnchor="end"
                fontFamily={styles.font.axis}
                fontSize={styles.fontSize.tickLabel}
                fill={styles.colors.axis}
              >
                {y}
              </text>
            </g>
          );
        })}

      {/* Connected line (clipped) */}
      {connectPoints && linePath && (
        <g clipPath={`url(#${clipPathId})`}>
          <path
            d={linePath}
            fill="none"
            stroke={styles.colors.dataLine}
            strokeWidth={styles.strokeWidth.dataLine}
          />
        </g>
      )}

      {/* Data points */}
      {showPoints &&
        data.map((d, i) => {
          const pos = toSVG(d.x, d.y);
          return (
            <circle
              key={`point-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={styles.dimensions.pointRadius}
              fill={styles.colors.pointFill}
            />
          );
        })}
    </svg>
  );
};

export default SATLineGraph;
