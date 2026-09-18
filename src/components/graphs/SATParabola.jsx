// SATParabola.jsx - Parabola in vertex form y = a(x - h)² + k
import React, { useMemo } from 'react';
import {
  SAT_GRAPH_STYLES,
  createCoordinateSystem,
  createClipPath,
  renderAxes,
  renderGrid,
  generateId,
  LABEL_HALO,
} from './SATGraphCore';

/**
 * Generate parabola path points
 */
const generateParabolaPoints = (h, k, a, xMin, xMax, numPoints = 100) => {
  const step = (xMax - xMin) / numPoints;
  const points = [];

  for (let i = 0; i <= numPoints; i++) {
    const x = xMin + i * step;
    const y = a * Math.pow(x - h, 2) + k;
    points.push({ x, y });
  }

  return points;
};

/**
 * Convert points to SVG path string, filtering by visible y-range
 */
const parabolaToPath = (points, coordSystem, yMin, yMax) => {
  // Filter points within visible y-range (with some padding)
  const paddedYMin = yMin - (yMax - yMin);
  const paddedYMax = yMax + (yMax - yMin);
  const visiblePoints = points.filter(p => p.y >= paddedYMin && p.y <= paddedYMax);

  if (visiblePoints.length === 0) return '';

  const svgPoints = visiblePoints.map(p => coordSystem.toSVG(p.x, p.y));

  let path = `M ${svgPoints[0].x} ${svgPoints[0].y}`;
  for (let i = 1; i < svgPoints.length; i++) {
    path += ` L ${svgPoints[i].x} ${svgPoints[i].y}`;
  }

  return path;
};

const SATParabola = ({
  vertex,
  a = 1,
  xRange = [-10, 10],
  yRange = [-10, 10],
  showVertex = true,
  highlightPoints = [],
  overlayLine,  // { slope, yIntercept } - optional line to draw on same graph
  label = '',
  width = 320,
  height = 280,
  xTickInterval = 2,
  yTickInterval = 2,
  gridInterval = 1,
}) => {
  const componentId = useMemo(() => generateId(), []);
  const styles = SAT_GRAPH_STYLES;

  const { h, k } = vertex;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  // Create coordinate system
  const coordSystem = useMemo(() =>
    createCoordinateSystem({
      xRange,
      yRange,
      svgDimensions: { width, height },
      padding: { top: 25, right: 45, bottom: 45, left: 45 },
    }),
    [xRange, yRange, width, height]
  );

  // Create clip path
  const { clipPathId, ClipPathDef } = useMemo(
    () => createClipPath(componentId, coordSystem.bounds),
    [componentId, coordSystem.bounds]
  );

  // Generate parabola path
  const parabolaPath = useMemo(() => {
    const points = generateParabolaPoints(h, k, a, xMin - 5, xMax + 5, 200);
    return parabolaToPath(points, coordSystem, yMin, yMax);
  }, [h, k, a, xMin, xMax, yMin, yMax, coordSystem]);

  // Vertex in SVG coordinates
  const vertexSVG = coordSystem.toSVG(h, k);

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

      {/* Parabola curve and optional overlay line (clipped) */}
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d={parabolaPath}
          fill="none"
          stroke={styles.colors.dataLine}
          strokeWidth={styles.strokeWidth.dataLine}
        />
        {overlayLine && (() => {
          const extXMin = xMin - 10;
          const extXMax = xMax + 10;
          const ly1 = overlayLine.slope * extXMin + overlayLine.yIntercept;
          const ly2 = overlayLine.slope * extXMax + overlayLine.yIntercept;
          const start = coordSystem.toSVG(extXMin, ly1);
          const end = coordSystem.toSVG(extXMax, ly2);
          return (
            <line
              x1={start.x} y1={start.y}
              x2={end.x} y2={end.y}
              stroke={styles.colors.dataLine}
              strokeWidth={styles.strokeWidth.dataLine}
            />
          );
        })()}
      </g>

      {/* Axes — after the data path so haloed tick labels paint over it */}
      {renderAxes(coordSystem, { xTickInterval, yTickInterval })}

      {/* Vertex point */}
      {showVertex && (
        <g>
          <circle
            cx={vertexSVG.x}
            cy={vertexSVG.y}
            r={styles.dimensions.highlightRadius}
            fill={styles.colors.pointHighlight}
          />
          {/* Label OUTSIDE the bowl: below a minimum (a>0), above a maximum
              (a<0) — up-right of a minimum sits inside the curve and the
              rising branch strikes the text. Halo keeps gridlines off it. */}
          <text
            x={vertexSVG.x}
            y={a > 0 ? vertexSVG.y + 24 : vertexSVG.y - 16}
            textAnchor="middle"
            fontFamily={styles.font.axis}
            fontSize={styles.fontSize.tickLabel}
            fill={styles.colors.axis}
            fontWeight="500"
            {...LABEL_HALO}
          >
            ({h}, {k})
          </text>
        </g>
      )}

      {/* BUG FIX 2: Only render highlight points if array exists and has elements */}
      {highlightPoints && highlightPoints.length > 0 && highlightPoints.map(([x, y], i) => {
        const pos = coordSystem.toSVG(x, y);
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

      {/* Label - positioned in empty space away from the curve */}
      {label && (() => {
        const midY = (yMin + yMax) / 2;

        let placementX, placementY;
        if (a >= 0) {
          // Opens up → curve is high at edges, low at vertex
          // Place label below vertex area if vertex is high, or above if vertex is low
          if (k > midY) {
            placementX = xMax - 1;
            placementY = yMin + (yMax - yMin) * 0.15;
          } else {
            placementX = xMax - 1;
            placementY = yMax - (yMax - yMin) * 0.1;
          }
        } else {
          // Opens down → curve is low at edges, high at vertex
          if (k < midY) {
            placementX = xMax - 1;
            placementY = yMax - (yMax - yMin) * 0.1;
          } else {
            placementX = xMax - 1;
            placementY = yMin + (yMax - yMin) * 0.15;
          }
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

export default SATParabola;
