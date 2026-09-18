// BULLETPROOF BASE COORDINATE SYSTEM
// - NO origin label (prevents "-2O" bug)
// - Skips labels near axes (prevents overlap)
// - Unique clip IDs (prevents conflicts)

import React from 'react';

/**
 * BULLETPROOF BASE COORDINATE SYSTEM
 * - NO origin label (prevents "-2O" bug)
 * - Skips labels near axes (prevents overlap)
 * - Unique clip IDs (prevents conflicts)
 */
export const BaseCoordinateSystem = ({
  xRange = [-10, 10],
  yRange = [-10, 10],
  width = 350,
  height = 350,
  showGrid = true,
  labelStep = 2,
  children
}) => {
  const padding = 45;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const graphWidth = width - 2 * padding;
  const graphHeight = height - 2 * padding;

  // Coordinate conversion
  const toSVG = (mathX, mathY) => ({
    x: padding + ((mathX - xMin) / (xMax - xMin)) * graphWidth,
    y: padding + ((yMax - mathY) / (yMax - yMin)) * graphHeight
  });

  // Generate labels (skip 0 entirely)
  const xLabels = [];
  const yLabels = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += labelStep) {
    if (x !== 0) xLabels.push(x);  // SKIP ZERO
  }
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += labelStep) {
    if (y !== 0) yLabels.push(y);  // SKIP ZERO
  }

  // Grid lines at every integer
  const gridLinesX = [];
  const gridLinesY = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    gridLinesX.push(x);
  }
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    gridLinesY.push(y);
  }

  const origin = toSVG(0, 0);
  const clipId = `clip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      style={{ backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={padding} y={padding} width={graphWidth} height={graphHeight} />
        </clipPath>
      </defs>

      {/* Grid */}
      {showGrid && gridLinesX.map(x => (
        <line
          key={`gx${x}`}
          x1={toSVG(x, yMin).x} y1={padding}
          x2={toSVG(x, yMax).x} y2={padding + graphHeight}
          stroke="#e0e0e0" strokeWidth="1"
        />
      ))}
      {showGrid && gridLinesY.map(y => (
        <line
          key={`gy${y}`}
          x1={padding} y1={toSVG(xMin, y).y}
          x2={padding + graphWidth} y2={toSVG(xMax, y).y}
          stroke="#e0e0e0" strokeWidth="1"
        />
      ))}

      {/* X-axis */}
      <line
        x1={padding} y1={origin.y}
        x2={padding + graphWidth + 5} y2={origin.y}
        stroke="#000" strokeWidth="1.5"
      />
      <polygon
        points={`${padding + graphWidth + 12},${origin.y} ${padding + graphWidth + 4},${origin.y - 4} ${padding + graphWidth + 4},${origin.y + 4}`}
        fill="#000"
      />

      {/* Y-axis */}
      <line
        x1={origin.x} y1={padding + graphHeight}
        x2={origin.x} y2={padding - 5}
        stroke="#000" strokeWidth="1.5"
      />
      <polygon
        points={`${origin.x},${padding - 12} ${origin.x - 4},${padding - 4} ${origin.x + 4},${padding - 4}`}
        fill="#000"
      />

      {/* X-axis labels - SKIP if within 25px of y-axis */}
      {xLabels.map(x => {
        const pos = toSVG(x, 0);
        if (Math.abs(pos.x - origin.x) < 25) return null;
        return (
          <g key={`xl${x}`}>
            <line x1={pos.x} y1={origin.y - 4} x2={pos.x} y2={origin.y + 4} stroke="#000" />
            <text x={pos.x} y={origin.y + 18} textAnchor="middle" fontSize="12">{x}</text>
          </g>
        );
      })}

      {/* Y-axis labels - SKIP if within 25px of x-axis */}
      {yLabels.map(y => {
        const pos = toSVG(0, y);
        if (Math.abs(pos.y - origin.y) < 25) return null;
        return (
          <g key={`yl${y}`}>
            <line x1={origin.x - 4} y1={pos.y} x2={origin.x + 4} y2={pos.y} stroke="#000" />
            <text x={origin.x - 10} y={pos.y + 4} textAnchor="end" fontSize="12">{y}</text>
          </g>
        );
      })}

      {/* Axis labels - x and y */}
      <text x={padding + graphWidth + 18} y={origin.y + 5} fontSize="14" fontStyle="italic">x</text>
      <text x={origin.x + 8} y={padding - 15} fontSize="14" fontStyle="italic">y</text>

      {/* NO "O" AT ORIGIN - This is intentional */}

      {/* Graph content - clipped */}
      <g clipPath={`url(#${clipId})`}>
        {React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child, { toSVG, xRange, yRange, padding, graphWidth, graphHeight })
            : child
        )}
      </g>
    </svg>
  );
};


/**
 * LINEAR GRAPH CONTENT
 * Use inside BaseCoordinateSystem
 */
export const LinearGraphContent = ({
  slope,
  yIntercept,
  functionLabel,
  highlightPoints = null,  // Must explicitly pass to show
  toSVG,
  xRange,
  padding,
  graphWidth
}) => {
  if (!toSVG) return null;

  const [xMin, xMax] = xRange;
  const x1 = xMin - 1;
  const x2 = xMax + 1;
  const y1 = slope * x1 + yIntercept;
  const y2 = slope * x2 + yIntercept;

  const start = toSVG(x1, y1);
  const end = toSVG(x2, y2);

  return (
    <g>
      {/* The line */}
      <line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke="#000" strokeWidth="2"
      />

      {/* Function label - fixed position top right */}
      {functionLabel && (
        <text
          x={padding + graphWidth - 20}
          y={40}
          fontSize="14"
          fontStyle="italic"
        >
          {functionLabel}
        </text>
      )}

      {/* Highlight points - ONLY if explicitly provided and not empty */}
      {highlightPoints && Array.isArray(highlightPoints) && highlightPoints.length > 0 && (
        highlightPoints.map(([px, py], i) => {
          const pt = toSVG(px, py);
          return <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#000" />;
        })
      )}
    </g>
  );
};


/**
 * CUBIC/EXPONENTIAL GRAPH CONTENT
 * NO random points - only the curve
 */
export const CubicGraphContent = ({
  // For y = a(x - h)³ + k or custom function
  fn,  // Function like (x) => x*x*x
  toSVG,
  xRange,
  functionLabel
}) => {
  if (!toSVG || !fn) return null;

  const [xMin, xMax] = xRange;

  // Generate curve points
  const points = [];
  const step = (xMax - xMin) / 100;
  for (let x = xMin; x <= xMax; x += step) {
    const y = fn(x);
    const pt = toSVG(x, y);
    points.push(`${pt.x},${pt.y}`);
  }

  return (
    <g>
      {/* The curve - NO DOTS */}
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Function label */}
      {functionLabel && (
        <text x={toSVG(xMax - 0.5, fn(xMax - 0.5)).x + 10} y={toSVG(xMax - 0.5, fn(xMax - 0.5)).y} fontSize="14" fontStyle="italic">
          {functionLabel}
        </text>
      )}

      {/* NO HIGHLIGHT POINTS BY DEFAULT */}
    </g>
  );
};


/**
 * COMPLETE LINEAR GRAPH COMPONENT
 * Usage: <LinearGraph slope={0.5} yIntercept={4} />
 */
export const LinearGraph = ({
  slope,
  yIntercept,
  xRange = [-10, 10],
  yRange = [-10, 12],
  functionLabel = 'g(x)',
  highlightPoints = null,
  width = 350,
  height = 350
}) => {
  return (
    <BaseCoordinateSystem
      xRange={xRange}
      yRange={yRange}
      width={width}
      height={height}
    >
      <LinearGraphContent
        slope={slope}
        yIntercept={yIntercept}
        functionLabel={functionLabel}
        highlightPoints={highlightPoints}
      />
    </BaseCoordinateSystem>
  );
};


/**
 * TWO LINE GRAPH - Guaranteed intersection
 */
export const TwoLineGraph = ({
  intersection,
  slope1,
  slope2,
  xRange = [-10, 10],
  yRange = [-10, 10],
  showIntersectionPoint = true,
  intersectionLabel = null,
  width = 350,
  height = 350
}) => {
  // Calculate y-intercepts from intersection point
  const [ix, iy] = intersection;
  const b1 = iy - slope1 * ix;
  const b2 = iy - slope2 * ix;

  return (
    <BaseCoordinateSystem xRange={xRange} yRange={yRange} width={width} height={height}>
      <TwoLineContent
        slope1={slope1} slope2={slope2}
        b1={b1} b2={b2}
        intersection={intersection}
        showIntersectionPoint={showIntersectionPoint}
        intersectionLabel={intersectionLabel}
      />
    </BaseCoordinateSystem>
  );
};

const TwoLineContent = ({
  slope1, slope2, b1, b2,
  intersection, showIntersectionPoint, intersectionLabel,
  toSVG, xRange
}) => {
  if (!toSVG) return null;

  const [xMin, xMax] = xRange;

  const line1Start = toSVG(xMin - 1, slope1 * (xMin - 1) + b1);
  const line1End = toSVG(xMax + 1, slope1 * (xMax + 1) + b1);
  const line2Start = toSVG(xMin - 1, slope2 * (xMin - 1) + b2);
  const line2End = toSVG(xMax + 1, slope2 * (xMax + 1) + b2);

  const intPt = toSVG(intersection[0], intersection[1]);

  return (
    <g>
      <line x1={line1Start.x} y1={line1Start.y} x2={line1End.x} y2={line1End.y} stroke="#000" strokeWidth="2" />
      <line x1={line2Start.x} y1={line2Start.y} x2={line2End.x} y2={line2End.y} stroke="#000" strokeWidth="2" />

      {showIntersectionPoint && (
        <circle cx={intPt.x} cy={intPt.y} r="4.5" fill="#000" />
      )}

      {intersectionLabel && (
        <text x={intPt.x + 10} y={intPt.y - 10} fontSize="12">{intersectionLabel}</text>
      )}
    </g>
  );
};


/**
 * Validation functions for coordinate system parameters
 * Kept for backward compatibility with existing components
 */
export const validateParams = {
  range: (range, name) => {
    if (!Array.isArray(range) || range.length !== 2) {
      return { valid: false, error: `${name} must be [min, max] array` };
    }
    const [min, max] = range;
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return { valid: false, error: `${name} values must be finite numbers` };
    }
    if (min >= max) {
      return { valid: false, error: `${name}[0] must be less than ${name}[1]` };
    }
    return { valid: true };
  },
  pointInRange: (point, xRange, yRange, name = 'point') => {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      return { valid: false, error: `${name} must have finite numeric x and y` };
    }
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    if (point.x < xMin || point.x > xMax) {
      return { valid: false, error: `${name}.x outside xRange` };
    }
    if (point.y < yMin || point.y > yMax) {
      return { valid: false, error: `${name}.y outside yRange` };
    }
    return { valid: true };
  },
};

export const calculateYInterceptFromIntersection = (intersection, slope) => {
  return intersection.y - slope * intersection.x;
};

export const verifyPointOnLine = (point, slope, yIntercept, tolerance = 0.0001) => {
  const expectedY = slope * point.x + yIntercept;
  return Math.abs(point.y - expectedY) < tolerance;
};


export default BaseCoordinateSystem;
