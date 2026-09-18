// SATPiecewiseLinear.jsx - Piecewise linear function (connected segments)
import React, { useMemo } from 'react';
import {
  SAT_GRAPH_STYLES,
  createCoordinateSystem,
  createClipPath,
  renderAxes,
  renderGrid,
  generateId,
} from './SATGraphCore';

const SATPiecewiseLinear = ({
  points = [],        // [[x1, y1], [x2, y2], ...] - points to connect
  data = [],          // Alternative format: [{ x: 1, y: 5 }, ...]
  xRange: providedXRange,
  yRange: providedYRange,
  xLabel = '',
  yLabel = '',
  title = '',
  showPoints = true,
  connectPoints = true,
  width = 320,
  height = 280,
  xTickInterval,
  yTickInterval,
  gridInterval = 1,
}) => {
  const componentId = useMemo(() => generateId(), []);
  const styles = SAT_GRAPH_STYLES;

  // Normalize points format
  let normalizedPoints = points;
  if (data && data.length > 0) {
    normalizedPoints = data.map(d => [d.x, d.y]);
  }

  // Calculate ranges from data
  const xValues = normalizedPoints.map(p => p[0]);
  const yValues = normalizedPoints.map(p => p[1]);

  const dataXMin = Math.min(...xValues);
  const dataXMax = Math.max(...xValues);
  const dataYMin = Math.min(...yValues);
  const dataYMax = Math.max(...yValues);

  const xPadding = (dataXMax - dataXMin) * 0.15 || 1;
  const yPadding = (dataYMax - dataYMin) * 0.15 || 1;

  // eslint-disable-next-line react-hooks/exhaustive-deps -- a fresh array each render, so the coordSystem useMemo below always recomputes; wrapping it would newly memoize and change render identity
  const xRange = providedXRange || [
    Math.floor(dataXMin - xPadding),
    Math.ceil(dataXMax + xPadding),
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps -- a fresh array each render, so the coordSystem useMemo below always recomputes; wrapping it would newly memoize and change render identity
  const yRange = providedYRange || [
    Math.floor(dataYMin - yPadding),
    Math.ceil(dataYMax + yPadding),
  ];

  // Auto-calculate tick intervals
  const xTick = xTickInterval || Math.ceil((xRange[1] - xRange[0]) / 8);
  const yTick = yTickInterval || Math.ceil((yRange[1] - yRange[0]) / 8);

  // Create coordinate system
  const coordSystem = useMemo(() =>
    createCoordinateSystem({
      xRange,
      yRange,
      svgDimensions: { width, height },
      padding: { top: 35, right: 30, bottom: 55, left: 55 },
    }),
    [xRange, yRange, width, height]
  );

  // Create clip path
  const { clipPathId, ClipPathDef } = useMemo(
    () => createClipPath(componentId, coordSystem.bounds),
    [componentId, coordSystem.bounds]
  );

  const { toSVG } = coordSystem;

  // Generate path for connected points
  const linePath = useMemo(() => {
    if (!connectPoints || normalizedPoints.length < 2) return '';

    const svgPoints = normalizedPoints.map(p => toSVG(p[0], p[1]));
    let path = `M ${svgPoints[0].x} ${svgPoints[0].y}`;
    for (let i = 1; i < svgPoints.length; i++) {
      path += ` L ${svgPoints[i].x} ${svgPoints[i].y}`;
    }
    return path;
  }, [normalizedPoints, connectPoints, toSVG]);

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

      {/* Title */}
      {title && (
        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          fontFamily={styles.font.axis}
          fontSize={14}
          fontWeight="bold"
          fill={styles.colors.axis}
        >
          {title}
        </text>
      )}

      {/* Grid */}
      {renderGrid(coordSystem, { xInterval: gridInterval, yInterval: gridInterval })}

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

      {/* Axes — after the data path so haloed tick labels paint over it */}
      {renderAxes(coordSystem, {
        xTickInterval: xTick,
        yTickInterval: yTick,
        xAxisLabel: xLabel,
        yAxisLabel: yLabel,
      })}

      {/* Data points */}
      {showPoints &&
        normalizedPoints.map((p, i) => {
          const pos = toSVG(p[0], p[1]);
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

export default SATPiecewiseLinear;
