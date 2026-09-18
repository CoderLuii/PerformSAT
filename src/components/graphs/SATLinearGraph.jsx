// SATLinearGraph.jsx - Single line graph with slope and y-intercept
// BULLETPROOF: Uses validated coordinate system
import React, { useMemo } from 'react';
import {
  SAT_GRAPH_STYLES,
  createCoordinateSystem,
  createClipPath,
  renderAxes,
  renderGrid,
  generateId,
} from './SATGraphCore';
import { validateParams } from './BaseCoordinateSystem';

const SATLinearGraph = ({
  slope,
  yIntercept,
  xRange = [-10, 10],
  yRange = [-10, 10],
  highlightPoints = [],
  label = '',
  width = 320,
  height = 280,
  xTickInterval = 2,
  yTickInterval = 2,
  gridInterval = 1,
  showValidationErrors = process.env.NODE_ENV === 'development',
}) => {
  const componentId = useMemo(() => generateId(), []);
  const styles = SAT_GRAPH_STYLES;

  // Validate parameters
  const validationErrors = useMemo(() => {
    const errors = [];
    if (typeof slope !== 'number' || !isFinite(slope)) {
      errors.push('slope must be a finite number');
    }
    if (typeof yIntercept !== 'number' || !isFinite(yIntercept)) {
      errors.push('yIntercept must be a finite number');
    }
    const xCheck = validateParams.range(xRange, 'xRange');
    if (!xCheck.valid) errors.push(xCheck.error);
    const yCheck = validateParams.range(yRange, 'yRange');
    if (!yCheck.valid) errors.push(yCheck.error);
    return errors;
  }, [slope, yIntercept, xRange, yRange]);

  // Create coordinate system. Guarded so it runs on EVERY render (Rules of
  // Hooks) — invalid params fall through to the error state below.
  const coordSystem = useMemo(() =>
    validationErrors.length > 0 ? null : createCoordinateSystem({
      xRange,
      yRange,
      svgDimensions: { width, height },
      padding: { top: 25, right: 45, bottom: 45, left: 45 },
    }),
    [validationErrors, xRange, yRange, width, height]
  );

  // Create clip path
  const { clipPathId, ClipPathDef } = useMemo(
    () => coordSystem
      ? createClipPath(componentId, coordSystem.bounds)
      : { clipPathId: '', ClipPathDef: () => null },
    [componentId, coordSystem]
  );

  // Show validation errors in development (after all hooks)
  if (validationErrors.length > 0) {
    if (showValidationErrors) {
      return (
        <svg width={width} height={height} style={{ background: '#fff', border: '2px solid #cc0000' }}>
          <text x={10} y={20} fill="#cc0000" fontSize={12} fontFamily="Arial">LinearGraph Error:</text>
          {validationErrors.map((err, i) => (
            <text key={i} x={10} y={40 + i * 16} fill="#cc0000" fontSize={11} fontFamily="Arial">{err}</text>
          ))}
        </svg>
      );
    }
    return null;
  }

  // Calculate line endpoints (extend beyond visible range for clipping)
  const [xMin, xMax] = xRange;
  const extendedXMin = xMin - 10;
  const extendedXMax = xMax + 10;
  const y1 = slope * extendedXMin + yIntercept;
  const y2 = slope * extendedXMax + yIntercept;

  const startPoint = coordSystem.toSVG(extendedXMin, y1);
  const endPoint = coordSystem.toSVG(extendedXMax, y2);

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

      {/* Grid (behind everything) */}
      {renderGrid(coordSystem, { xInterval: gridInterval, yInterval: gridInterval })}

      {/* Line (clipped to graph area) — drawn BEFORE the axes so the haloed
          tick labels paint over it instead of the line striking through them
          (visible whenever the line crosses the negative-quadrant label margin) */}
      <g clipPath={`url(#${clipPathId})`}>
        <line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={endPoint.x}
          y2={endPoint.y}
          stroke={styles.colors.dataLine}
          strokeWidth={styles.strokeWidth.dataLine}
        />
      </g>

      {/* Axes */}
      {renderAxes(coordSystem, { xTickInterval, yTickInterval })}

      {/* BUG FIX 2: Only render highlight points if array exists and has elements */}
      {highlightPoints && highlightPoints.length > 0 && highlightPoints.map((point, i) => {
        if (!Array.isArray(point) || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return null;
        const pos = coordSystem.toSVG(point[0], point[1]);
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

      {/* Label - positioned in empty space away from the line */}
      {label && (() => {
        const [xLo, xHi] = xRange;
        const [yLo, yHi] = yRange;
        // Check where line is at edges to find empty space
        const lineAtLeft = slope * (xLo + 1) + yIntercept;
        const lineAtRight = slope * (xHi - 1) + yIntercept;
        const midY = (yLo + yHi) / 2;

        let placementX, placementY;
        if (lineAtRight > midY) {
          // Line is high on right → place label in upper-left
          placementX = xLo + 2;
          placementY = yHi - (yHi - yLo) * 0.1;
        } else if (lineAtLeft > midY) {
          // Line is high on left → place label in upper-right
          placementX = xHi - 1;
          placementY = yHi - (yHi - yLo) * 0.1;
        } else {
          // Line is low → place label in upper-right
          placementX = xHi - 1;
          placementY = yHi - (yHi - yLo) * 0.1;
        }

        const labelPos = coordSystem.toSVG(placementX, placementY);

        return (
          <text
            x={labelPos.x}
            y={labelPos.y}
            fontFamily={styles.font.axis}
            fontSize={14}
            fontStyle="italic"
            fill={styles.colors.axis}
            stroke="#ffffff"
            strokeWidth={3}
            paintOrder="stroke"
            textAnchor="end"
          >
            {label}
          </text>
        );
      })()}
    </svg>
  );
};

export default SATLinearGraph;
