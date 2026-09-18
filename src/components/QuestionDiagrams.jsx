import React from 'react';
import SATLinearGraph from './graphs/SATLinearGraph';
import SATParabola from './graphs/SATParabola';
import SATBarChart from './graphs/SATBarChart';
import { CircleWithSector, CircleWithSquare, CircleWithInscribedTriangle } from './graphs/SATCircleDiagrams';
import SATIntersectingLines from './graphs/SATIntersectingLines';
import SATPiecewiseLinear from './graphs/SATPiecewiseLinear';
import SATCubicGraph from './graphs/SATCubicGraph';
import SATParallelLines from './graphs/SATParallelLines';
import SATTwoLineGraph from './graphs/SATTwoLineGraph';
import SATTable from './graphs/SATTable';
import SATDotPlot from './graphs/SATDotPlot';
import SATBoxPlot from './graphs/SATBoxPlot';
import { RightTriangle, TriangleWithAngles, RightTriangleWithAltitude, SimilarTriangles } from './graphs/SATTriangleDiagrams';
import {
  SAT_FIGURE_STYLE,
  SAT_FIGURE_FONT,
  LABEL_HALO,
  isVariableLabel,
  perpendicularLabelPos,
} from './graphs/SATGraphCore';

/**
 * Professional SAT-style SVG diagram components for practice questions.
 * Bluebook ink conventions (2026-08-13 restyle, founder-approved direction):
 * white ground, faint #e0e0e0 gridlines, pure-black axes/curves/points, serif
 * tick numbers and labels, emphasis by geometry (dash, open point) never color.
 */

// =============================================================================
// SHARED GRID COMPONENT - official Bluebook ink style
// =============================================================================
const SATGrid = ({
  size = 300,
  padding = 30,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  // --- New, all optional (back-compat) ---
  xGridStep = 1,       // grid-line interval on x
  yGridStep = 1,       // grid-line interval on y
  xLabelStep,          // tick-label interval on x; falls back to auto if unset
  yLabelStep,          // tick-label interval on y; falls back to auto if unset
  xLabel,              // contextual axis label (e.g., "Hours studied")
  yLabel,              // contextual axis label (e.g., "Test score")
  title,               // optional chart title above the grid
  children
}) => {
  // Non-uniform padding: only grows when labels are present, so old callers
  // see identical SVG geometry (300x300, padding 30 on all sides).
  const padTop = padding + (title ? 18 : 0);
  const padBottom = padding + (xLabel ? 22 : 0);
  const padLeft = padding + (yLabel ? 22 : 0);
  const padRight = padding;

  // Width grows to keep the grid roughly square when y-axis label is present.
  const width = size + (yLabel ? 22 : 0);
  const height = size + (title ? 18 : 0) + (xLabel ? 22 : 0);
  const gridWidth = width - padLeft - padRight;
  const gridHeight = height - padTop - padBottom;
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  const unitSizeX = gridWidth / xRange;
  const unitSizeY = gridHeight / yRange;

  // Convert math coords to SVG coords
  const toX = (x) => padLeft + (x - xMin) * unitSizeX;
  const toY = (y) => padTop + (yMax - y) * unitSizeY;

  // Grid-line positions stepped by xGridStep / yGridStep
  const xGridLines = [];
  for (let n = xMin; n <= xMax + 1e-9; n += xGridStep) xGridLines.push(Math.round(n * 1e6) / 1e6);
  const yGridLines = [];
  for (let n = yMin; n <= yMax + 1e-9; n += yGridStep) yGridLines.push(Math.round(n * 1e6) / 1e6);

  // X-axis renders at y=0 if 0 is in range, otherwise at yMin (so it sits on the grid bottom).
  const axisY = (yMin <= 0 && yMax >= 0) ? 0 : yMin;
  const axisX = (xMin <= 0 && xMax >= 0) ? 0 : xMin;

  // Determine which labels to show. We always exclude the value sitting on
  // the perpendicular axis: that label would overlap the axis line itself.
  // (For the classic 0-centered case, axisY=axisX=0, so this preserves the
  // old "filter !== 0" behavior. For shifted ranges where axisY=yMin > 0, it
  // also drops the redundant yMin label that would collide with the x-axis.)
  const getXLabels = () => {
    if (xLabelStep) {
      const out = [];
      for (let n = xMin; n <= xMax + 1e-9; n += xLabelStep) {
        const v = Math.round(n * 1e6) / 1e6;
        if (v !== axisX) out.push(v);
      }
      return out;
    }
    if (xRange <= 12) return Array.from({ length: xRange + 1 }, (_, i) => xMin + i).filter(x => x !== axisX && x % 2 === 0);
    if (xRange <= 24) return Array.from({ length: xRange + 1 }, (_, i) => xMin + i).filter(x => x !== axisX && x % 5 === 0);
    return [xMin, Math.round(xMin/2), Math.round(xMax/2), xMax].filter(x => x !== axisX);
  };

  const getYLabels = () => {
    if (yLabelStep) {
      const out = [];
      for (let n = yMin; n <= yMax + 1e-9; n += yLabelStep) {
        const v = Math.round(n * 1e6) / 1e6;
        if (v !== axisY) out.push(v);
      }
      return out;
    }
    if (yRange <= 12) return Array.from({ length: yRange + 1 }, (_, i) => yMin + i).filter(y => y !== axisY && y % 2 === 0);
    if (yRange <= 24) return Array.from({ length: yRange + 1 }, (_, i) => yMin + i).filter(y => y !== axisY && y % 5 === 0);
    return [yMin, Math.round(yMin/2), Math.round(yMax/2), yMax].filter(y => y !== axisY);
  };

  return (
    <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
      {/* Title (top center) */}
      {title && (
        <text x={padLeft + gridWidth / 2} y={padTop - 6} fontSize="13" fontFamily="Times New Roman, Georgia, serif" textAnchor="middle" fontWeight="bold" fill="#000">{title}</text>
      )}

      {/* Faint gridlines on white (official ink style — no gray plate) */}
      {xGridLines.map(n => (
        <line key={`v${n}`} x1={toX(n)} y1={padTop} x2={toX(n)} y2={padTop + gridHeight} stroke="#e0e0e0" strokeWidth="0.8" />
      ))}
      {yGridLines.map(n => (
        <line key={`h${n}`} x1={padLeft} y1={toY(n)} x2={padLeft + gridWidth} y2={toY(n)} stroke="#e0e0e0" strokeWidth="0.8" />
      ))}

      {/* X-axis with arrow */}
      <line x1={padLeft - 10} y1={toY(axisY)} x2={padLeft + gridWidth + 10} y2={toY(axisY)} stroke="#000" strokeWidth="1.5" />
      <polygon points={`${padLeft + gridWidth + 18},${toY(axisY)} ${padLeft + gridWidth + 8},${toY(axisY) - 4} ${padLeft + gridWidth + 8},${toY(axisY) + 4}`} fill="#000" />

      {/* Y-axis with arrow */}
      <line x1={toX(axisX)} y1={padTop + gridHeight + 10} x2={toX(axisX)} y2={padTop - 10} stroke="#000" strokeWidth="1.5" />
      <polygon points={`${toX(axisX)},${padTop - 18} ${toX(axisX) - 4},${padTop - 8} ${toX(axisX) + 4},${padTop - 8}`} fill="#000" />

      {/* Axis letters at the arrow tips (serif italic, official convention) */}
      {!yLabel && (
        <text x={toX(axisX) + 8} y={padTop - 10} fontSize="14" fontFamily="Times New Roman, serif" fontStyle="italic" fill="#000">y</text>
      )}
      {!xLabel && (
        <text x={padLeft + gridWidth + 12} y={toY(axisY) + 16} fontSize="14" fontFamily="Times New Roman, serif" fontStyle="italic" fill="#000">x</text>
      )}

      {/* X-axis tick labels */}
      {getXLabels().map(x => (
        <text key={`xl${x}`} x={toX(x)} y={toY(axisY) + 15} fontSize="12" fontFamily="Times New Roman, Georgia, serif" textAnchor="middle" fill="#000">{x}</text>
      ))}

      {/* Y-axis tick labels */}
      {getYLabels().map(y => (
        <text key={`yl${y}`} x={toX(axisX) - 5} y={toY(y) + 4} fontSize="12" fontFamily="Times New Roman, Georgia, serif" textAnchor="end" fill="#000">{y}</text>
      ))}

      {/* Contextual axis labels (serif upright, like official figure captions) */}
      {xLabel && (
        <text x={padLeft + gridWidth / 2} y={height - 6} fontSize="13" fontFamily="Times New Roman, Georgia, serif" textAnchor="middle" fill="#000">{xLabel}</text>
      )}
      {yLabel && (
        <text x={12} y={padTop + gridHeight / 2} fontSize="13" fontFamily="Times New Roman, Georgia, serif" textAnchor="middle" fill="#000" transform={`rotate(-90, 12, ${padTop + gridHeight / 2})`}>{yLabel}</text>
      )}

      {/* Clip path for drawing inside grid only */}
      <defs>
        <clipPath id="gridClip">
          <rect x={padLeft} y={padTop} width={gridWidth} height={gridHeight} />
        </clipPath>
      </defs>

      {/* Render children with coordinate conversion functions */}
      {typeof children === 'function' ? children({ toX, toY, padding, gridArea: gridWidth, gridWidth, gridHeight, padLeft, padTop }) : children}
    </svg>
  );
};

// =============================================================================
// LINEAR FUNCTION DIAGRAM - y = mx + b
// =============================================================================
export const LinearFunctionGraphDiagram = ({ slope = 2, yIntercept = -4 }) => {
  const getY = (x) => slope * x + yIntercept;

  return (
    <SATGrid>
      {({ toX, toY }) => (
        <line
          x1={toX(-15)} y1={toY(getY(-15))}
          x2={toX(15)} y2={toY(getY(15))}
          stroke="#333" strokeWidth="2"
          clipPath="url(#gridClip)"
        />
      )}
    </SATGrid>
  );
};

// =============================================================================
// RATIONAL FUNCTION DIAGRAM - f(x) = a/(x+b) + c
// =============================================================================
export const RationalFunctionDiagram = ({ a = 6, b = 2, c = 0, xMin: domainMin, label, showPoints = [] }) => {
  const asymptote = -b;
  const xLo = domainMin !== undefined ? domainMin : -10;

  // Generate curve path
  const generatePath = (toX, toY) => {
    const step = 0.1;
    let leftPath = '';
    let rightPath = '';

    // Left of asymptote
    for (let x = xLo; x < asymptote - 0.3; x += step) {
      const y = a / (x + b) + c;
      if (y >= -10 && y <= 10) {
        if (!leftPath) leftPath = `M ${toX(x)} ${toY(y)}`;
        else leftPath += ` L ${toX(x)} ${toY(y)}`;
      }
    }

    // Right of asymptote
    const rightStart = Math.max(asymptote + 0.3, xLo);
    for (let x = rightStart; x <= 10; x += step) {
      const y = a / (x + b) + c;
      if (y >= -10 && y <= 10) {
        if (!rightPath) rightPath = `M ${toX(x)} ${toY(y)}`;
        else rightPath += ` L ${toX(x)} ${toY(y)}`;
      }
    }

    return leftPath + ' ' + rightPath;
  };

  return (
    <SATGrid>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          {/* Vertical asymptote dashed line (only if visible in domain) */}
          {asymptote >= xLo && (
            <line
              x1={toX(asymptote)} y1={toY(10)}
              x2={toX(asymptote)} y2={toY(-10)}
              stroke="#999" strokeWidth="1" strokeDasharray="5,5"
            />
          )}
          {/* Horizontal asymptote dashed line */}
          {c !== 0 && (
            <line
              x1={toX(xLo)} y1={toY(c)}
              x2={toX(10)} y2={toY(c)}
              stroke="#999" strokeWidth="1" strokeDasharray="5,5"
            />
          )}
          {/* Curve */}
          <path d={generatePath(toX, toY)} fill="none" stroke="#333" strokeWidth="2" />
          {/* Points */}
          {showPoints.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
          {/* Label */}
          {label && (
            <text x={toX(8)} y={toY(c + 1.5)} fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" fill="#333">
              {label}
            </text>
          )}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// QUADRATIC DIAGRAM - y = a(x-h)² + k
// =============================================================================
export const QuadraticDiagram = ({ vertex = [0, 0], a = 0.5, showPoints = [], showVertex = true }) => {
  const [h, k] = vertex;

  const generatePath = (toX, toY) => {
    let path = '';
    for (let x = -10; x <= 10; x += 0.2) {
      const y = a * Math.pow(x - h, 2) + k;
      if (y >= -10 && y <= 10) {
        if (!path) path = `M ${toX(x)} ${toY(y)}`;
        else path += ` L ${toX(x)} ${toY(y)}`;
      }
    }
    return path;
  };

  return (
    <SATGrid>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          <path d={generatePath(toX, toY)} fill="none" stroke="#333" strokeWidth="2" />
          {showVertex && <circle cx={toX(h)} cy={toY(k)} r="5" fill="#333" />}
          {showPoints.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// ABSOLUTE VALUE DIAGRAM - y = a|x-h| + k
// =============================================================================
export const AbsoluteValueDiagram = ({ vertex = [0, 0], slope = 1, showPoints = [] }) => {
  const [h, k] = vertex;

  return (
    <SATGrid>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          {/* Left arm */}
          <line
            x1={toX(-10)} y1={toY(k + slope * Math.abs(-10 - h))}
            x2={toX(h)} y2={toY(k)}
            stroke="#333" strokeWidth="2"
          />
          {/* Right arm */}
          <line
            x1={toX(h)} y1={toY(k)}
            x2={toX(10)} y2={toY(k + slope * Math.abs(10 - h))}
            stroke="#333" strokeWidth="2"
          />
          {/* Vertex */}
          <circle cx={toX(h)} cy={toY(k)} r="5" fill="#333" />
          {showPoints.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// COORDINATE POINTS DIAGRAM - Just points on grid
// =============================================================================
export const CoordinatePointsDiagram = ({ points = [], xMin = -10, xMax = 10, yMin = -10, yMax = 10 }) => {
  return (
    <SATGrid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}>
      {({ toX, toY }) => (
        <g>
          {points.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// QUADRATIC INTERCEPTS DIAGRAM - Parabola with x-intercepts marked
// =============================================================================
export const QuadraticInterceptsDiagram = ({ intercepts = [0, 4], vertex = null }) => {
  const [x1, x2] = intercepts;

  const generatePath = (toX, toY) => {
    let path = '';
    for (let x = -10; x <= 10; x += 0.2) {
      const y = 0.3 * (x - x1) * (x - x2);
      if (y >= -10 && y <= 10) {
        if (!path) path = `M ${toX(x)} ${toY(y)}`;
        else path += ` L ${toX(x)} ${toY(y)}`;
      }
    }
    return path;
  };

  return (
    <SATGrid>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          <path d={generatePath(toX, toY)} fill="none" stroke="#333" strokeWidth="2" />
          <circle cx={toX(x1)} cy={toY(0)} r="5" fill="#333" />
          <circle cx={toX(x2)} cy={toY(0)} r="5" fill="#333" />
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// SCATTERPLOT DIAGRAM - Points for best-fit questions
// =============================================================================
export const ScatterplotDiagram = ({
  points = [],
  xMin = 0,
  xMax = 10,
  yMin = 0,
  yMax = 10,
  xGridStep = 1,
  yGridStep = 1,
  xLabelStep,
  yLabelStep,
  xLabel,
  yLabel,
  title,
  bestFitLine,
  // Single point to render in brand-orange + larger + optional label.
  // Use for residual-style questions where one specific data point matters
  // (e.g. "the data point at (5, 13)").
  highlightPoint,            // [x, y] | null
  highlightLabel,            // optional string drawn next to the highlight
  // When true (and a bestFitLine + highlightPoint are both present),
  // draws a dashed vertical line from the highlight point down/up to the
  // best-fit line — a visual residual.
  showResidual = false,
}) => {
  return (
    <SATGrid
      xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}
      xGridStep={xGridStep} yGridStep={yGridStep}
      xLabelStep={xLabelStep} yLabelStep={yLabelStep}
      xLabel={xLabel} yLabel={yLabel} title={title}
    >
      {({ toX, toY }) => {
        const lineYAtX = (x) => bestFitLine ? bestFitLine.slope * x + bestFitLine.intercept : null;
        return (
          <g>
            {/* Official ink: best-fit is black-dashed, the highlighted point is
                an OPEN circle, the residual a black dashed drop — emphasis by
                geometry, never color (Bluebook restyle 2026-08-13). */}
            {bestFitLine && (
              <line
                x1={toX(xMin)}
                y1={toY(bestFitLine.slope * xMin + bestFitLine.intercept)}
                x2={toX(xMax)}
                y2={toY(bestFitLine.slope * xMax + bestFitLine.intercept)}
                stroke="#000"
                strokeWidth={1.5}
                strokeDasharray="6,4"
              />
            )}
            {points.map(([px, py], i) => (
              <circle key={i} cx={toX(px)} cy={toY(py)} r="4" fill="#000" />
            ))}
            {highlightPoint && bestFitLine && showResidual && (
              <line
                x1={toX(highlightPoint[0])}
                y1={toY(highlightPoint[1])}
                x2={toX(highlightPoint[0])}
                y2={toY(lineYAtX(highlightPoint[0]))}
                stroke="#000"
                strokeWidth={1.2}
                strokeDasharray="3,3"
              />
            )}
            {highlightPoint && (
              <>
                <circle
                  cx={toX(highlightPoint[0])}
                  cy={toY(highlightPoint[1])}
                  r="5.5"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="1.6"
                />
                {highlightLabel && (
                  <text
                    x={toX(highlightPoint[0]) + 9}
                    y={toY(highlightPoint[1]) - 6}
                    fontSize="12"
                    fontFamily="Times New Roman, Georgia, serif"
                    fontStyle="italic"
                    fill="#000"
                  >
                    {highlightLabel}
                  </text>
                )}
              </>
            )}
          </g>
        );
      }}
    </SATGrid>
  );
};

// =============================================================================
// LINEAR LINE DIAGRAM - Line through points
// =============================================================================
export const LinearLineDiagram = ({ points = [], xRange = [-10, 10], yRange = [-10, 10] }) => {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  let slope = 1, intercept = 0;
  if (points.length >= 2) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    slope = (y2 - y1) / (x2 - x1);
    intercept = y1 - slope * x1;
  }

  const getY = (x) => slope * x + intercept;

  return (
    <SATGrid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          <line
            x1={toX(xMin - 5)} y1={toY(getY(xMin - 5))}
            x2={toX(xMax + 5)} y2={toY(getY(xMax + 5))}
            stroke="#333" strokeWidth="2"
          />
          {points.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// SIMPLE LINE DIAGRAM - Small coordinate system
// =============================================================================
export const SimpleLineDiagram = ({ points = [], xMax = 6, yMax = 12 }) => {
  let slope = 1, intercept = 0;
  if (points.length >= 2) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    slope = (y2 - y1) / (x2 - x1);
    intercept = y1 - slope * x1;
  }

  const getY = (x) => slope * x + intercept;

  return (
    <SATGrid xMin={-1} xMax={xMax} yMin={-1} yMax={yMax}>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          <line
            x1={toX(-2)} y1={toY(getY(-2))}
            x2={toX(xMax + 2)} y2={toY(getY(xMax + 2))}
            stroke="#333" strokeWidth="2"
          />
          {points.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// WAVY FUNCTION DIAGRAM - Cubic-like curve
// =============================================================================
export const WavyFunctionDiagram = ({ crossings = [-2, 1.5, 4.5], horizontalLine = 2.5 }) => {
  const generatePath = (toX, toY) => {
    let path = '';
    for (let x = -10; x <= 10; x += 0.1) {
      const y = -0.15 * (x - crossings[0]) * (x - crossings[1]) * (x - crossings[2]) + horizontalLine;
      if (y >= -10 && y <= 10) {
        if (!path) path = `M ${toX(x)} ${toY(y)}`;
        else path += ` L ${toX(x)} ${toY(y)}`;
      }
    }
    return path;
  };

  return (
    <SATGrid>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          {/* Horizontal reference line */}
          <line
            x1={toX(-10)} y1={toY(horizontalLine)}
            x2={toX(10)} y2={toY(horizontalLine)}
            stroke="#999" strokeWidth="1" strokeDasharray="5,5"
          />
          {/* Curve */}
          <path d={generatePath(toX, toY)} fill="none" stroke="#333" strokeWidth="2" />
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// GENERAL FUNCTION DIAGRAM - Passes through specific points
// =============================================================================
export const GeneralFunctionDiagram = ({ points = [[0, 3], [1, -2]], xRange = [-10, 10], yRange = [-10, 10] }) => {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  // Create a curve passing through points (simple linear interpolation for 2 points)
  let slope = 1, intercept = 0;
  if (points.length >= 2) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    slope = (y2 - y1) / (x2 - x1);
    intercept = y1 - slope * x1;
  }

  const getY = (x) => slope * x + intercept;

  return (
    <SATGrid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}>
      {({ toX, toY }) => (
        <g clipPath="url(#gridClip)">
          <line
            x1={toX(xMin - 2)} y1={toY(getY(xMin - 2))}
            x2={toX(xMax + 2)} y2={toY(getY(xMax + 2))}
            stroke="#333" strokeWidth="2"
          />
          {points.map(([px, py], i) => (
            <circle key={i} cx={toX(px)} cy={toY(py)} r="5" fill="#333" />
          ))}
        </g>
      )}
    </SATGrid>
  );
};

// =============================================================================
// TABLE DIAGRAM - For x/f(x) tables (2 columns)
// Official x/y value-table skin: white cells, black rules, serif math-italic
// column heads (matches the educator-bank tables — no colored fills).
// =============================================================================
export const TableDiagram = ({ rows = [], xHeader = "x", yHeader = "f(x)" }) => {
  return (
    <table style={{
      borderCollapse: 'collapse',
      fontSize: '15px',
      fontFamily: 'Times New Roman, Georgia, serif',
      margin: '0 auto',
      background: '#fff',
      color: '#111',
    }}>
      <thead>
        <tr>
          <th style={{ padding: '6px 26px', border: '1.5px solid #111', background: '#fff', fontWeight: 'normal', fontStyle: 'italic' }}>{xHeader}</th>
          <th style={{ padding: '6px 26px', border: '1.5px solid #111', background: '#fff', fontWeight: 'normal', fontStyle: 'italic' }}>{yHeader}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={{ padding: '5px 26px', border: '1px solid #111', textAlign: 'center' }}>{row[0]}</td>
            <td style={{ padding: '5px 26px', border: '1px solid #111', textAlign: 'center' }}>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// =============================================================================
// DATA TABLE DIAGRAM - For multi-column tables (like probability tables)
// Official data-table skin: white cells, black rules, bold sans headers,
// serif values — one skin everywhere (Bluebook restyle 2026-08-13).
// =============================================================================
export const DataTableDiagram = ({ headers = [], rows = [] }) => {
  return (
    <table style={{
      borderCollapse: 'collapse',
      fontSize: '15px',
      fontFamily: 'Times New Roman, Georgia, serif',
      margin: '0 auto',
      background: '#fff',
      color: '#111',
    }}>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} style={{
              padding: '7px 18px',
              border: '1.5px solid #111',
              background: '#fff',
              fontWeight: 'bold',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, colIdx) => (
              <td key={colIdx} style={{
                padding: '5px 18px',
                border: '1px solid #111',
                background: '#fff',
                textAlign: colIdx === 0 ? 'left' : 'center'
              }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// =============================================================================
// DOT PLOT DIAGRAM - For comparing distributions
// =============================================================================
export const DotPlotDiagram = ({
  data1 = [],
  data2 = [],
  title1 = "Data Set 1",
  title2 = "Data Set 2",
  xMin = 0,
  xMax = 10
}) => {
  const width = 340;
  const plotHeight = 80;
  const totalHeight = plotHeight * 2 + 60;
  const padding = 40;
  const plotWidth = width - 2 * padding;
  const scale = plotWidth / (xMax - xMin);

  const renderDotPlot = (data, yOffset, title) => {
    return (
      <g transform={`translate(0, ${yOffset})`}>
        {/* Title */}
        <text x={padding} y={-5} fontSize="12" fontFamily="Arial, sans-serif" fill="#333" fontWeight="500">{title}</text>

        {/* Axis line */}
        <line x1={padding} y1={plotHeight - 20} x2={width - padding} y2={plotHeight - 20} stroke="#444" strokeWidth="1.5" />

        {/* Tick marks and labels */}
        {Array.from({ length: xMax - xMin + 1 }, (_, i) => xMin + i).map(x => (
          <g key={x}>
            <line x1={padding + (x - xMin) * scale} y1={plotHeight - 20} x2={padding + (x - xMin) * scale} y2={plotHeight - 15} stroke="#444" strokeWidth="1" />
            <text x={padding + (x - xMin) * scale} y={plotHeight - 5} fontSize="10" textAnchor="middle" fill="#333">{x}</text>
          </g>
        ))}

        {/* Dots */}
        {data.map((item, i) => {
          const dots = [];
          for (let d = 0; d < item.count; d++) {
            dots.push(
              <circle
                key={`${i}-${d}`}
                cx={padding + (item.value - xMin) * scale}
                cy={plotHeight - 28 - d * 12}
                r="5"
                fill="#333"
              />
            );
          }
          return dots;
        })}
      </g>
    );
  };

  return (
    <svg width={width} height={totalHeight} style={{ display: 'block', margin: '0 auto' }}>
      <rect width={width} height={totalHeight} fill="#f5f5f5" />
      {renderDotPlot(data1, 20, title1)}
      {renderDotPlot(data2, plotHeight + 50, title2)}
    </svg>
  );
};

// =============================================================================
// NESTED RIGHT TRIANGLES - Two similar right triangles sharing a vertex
// =============================================================================
const NestedRightTrianglesDiagram = ({
  // Points: A (shared vertex), B, C (small triangle), D, E (large triangle)
  // Right angles at C and E; C on segment AE, B on segment AD
  labels = { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E' },
  sideLabels = {},  // e.g. { AB: '√34', AC: '3', CE: '21' }
  width = 320,
  height = 220,
}) => {
  // Layout: A top-left, horizontal line A→C→E, diagonal A→B→D
  // C and E have right angles (vertical lines down to B and D)
  const pad = 30;
  const A = [pad, pad];
  const C = [pad + 70, pad];
  const E = [width - pad, pad];
  const D = [width - pad, height - pad];
  // B is defined to lie ON segment AD (directly below C, since BC ⊥ AC), so
  // compute it from the diagonal instead of hardcoding — a fixed y put B ~37px
  // past the diagonal, drawing C→B overshooting the line B belongs to.
  const B = [C[0], A[1] + ((C[0] - A[0]) * (D[1] - A[1])) / (D[0] - A[0])];

  const rightAngleSize = 10;
  // Interior reference for pushing side labels to the outside.
  const interior = [(A[0] + D[0] + E[0]) / 3, (A[1] + D[1] + E[1]) / 3];

  // Halo'd serif label, italic for single-letter variables (vertices) — matches
  // the figure styling used across the geometry diagrams.
  const Label = ({ x, y, children, anchor = 'middle' }) => (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={14}
      fontFamily={SAT_FIGURE_FONT}
      fontStyle={isVariableLabel(children) ? 'italic' : 'normal'}
      fill="#000000"
      {...LABEL_HALO}
    >
      {children}
    </text>
  );

  // Vertex letter held just outside the vertex, away from the figure interior.
  const vertexPos = (p, dist = 14) => {
    const dx = p[0] - interior[0];
    const dy = p[1] - interior[1];
    const len = Math.hypot(dx, dy) || 1;
    return { x: p[0] + (dx / len) * dist, y: p[1] + (dy / len) * dist };
  };
  const av = vertexPos(A);
  const bv = vertexPos(B);
  const cv = { x: C[0], y: C[1] - 14 }; // C sits on the top edge → lift straight up
  const dv = vertexPos(D);
  const ev = vertexPos(E);

  const abPos = perpendicularLabelPos(A, B, interior, 16);
  const acPos = perpendicularLabelPos(A, C, interior, 16);
  const cePos = perpendicularLabelPos(C, E, interior, 16);

  return (
    <svg width={width} height={height} style={SAT_FIGURE_STYLE}>
      {/* Triangle outlines */}
      {/* Line A→E (horizontal top) */}
      <line x1={A[0]} y1={A[1]} x2={E[0]} y2={E[1]} stroke="#000000" strokeWidth={1.5} />
      {/* Line A→D (diagonal) */}
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} stroke="#000000" strokeWidth={1.5} />
      {/* Line C→B (vertical, small triangle) */}
      <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke="#000000" strokeWidth={1.5} />
      {/* Line E→D (vertical, large triangle) */}
      <line x1={E[0]} y1={E[1]} x2={D[0]} y2={D[1]} stroke="#000000" strokeWidth={1.5} />

      {/* Right angle marker at C */}
      <polyline
        points={`${C[0]},${C[1] + rightAngleSize} ${C[0] - rightAngleSize},${C[1] + rightAngleSize} ${C[0] - rightAngleSize},${C[1]}`}
        fill="none" stroke="#000000" strokeWidth={1.25}
      />
      {/* Right angle marker at E */}
      <polyline
        points={`${E[0]},${E[1] + rightAngleSize} ${E[0] - rightAngleSize},${E[1] + rightAngleSize} ${E[0] - rightAngleSize},${E[1]}`}
        fill="none" stroke="#000000" strokeWidth={1.25}
      />

      {/* Vertex labels */}
      <Label x={av.x} y={av.y}>{labels.A}</Label>
      <Label x={bv.x} y={bv.y}>{labels.B}</Label>
      <Label x={cv.x} y={cv.y}>{labels.C}</Label>
      <Label x={dv.x} y={dv.y}>{labels.D}</Label>
      <Label x={ev.x} y={ev.y}>{labels.E}</Label>

      {/* Side labels — perpendicular to each segment, on the outside */}
      {sideLabels.AB && <Label x={abPos.x} y={abPos.y}>{sideLabels.AB}</Label>}
      {sideLabels.AC && <Label x={acPos.x} y={acPos.y}>{sideLabels.AC}</Label>}
      {sideLabels.CE && <Label x={cePos.x} y={cePos.y}>{sideLabels.CE}</Label>}
    </svg>
  );
};

// =============================================================================
// MAIN QUESTION DIAGRAM COMPONENT - Switch based on type
// =============================================================================
// Official caption under any figure whose measurements aren't to scale.
// Authoring opt-in: diagram: { type, params: { ..., figureNote: true } }.
// Rendered by the dispatcher so every one of the 33 types supports it
// without per-component wiring. Serif, centered — exactly the Bluebook line.
const FigureNote = () => (
  <div
    style={{
      fontFamily: 'Times New Roman, Georgia, serif',
      fontSize: '14px',
      color: '#111',
      textAlign: 'center',
      marginTop: '8px',
    }}
  >
    Note: Figure not drawn to scale.
  </div>
);

const QuestionDiagram = ({ type, params = {} }) => {
  // Default to {} so cases that read a param before the {...params} spread
  // (e.g. 'table' → params.headers, 'parallelLines' → params.lineLabels) don't
  // throw on a diagram spec that omits params entirely.
  // figureNote is dispatcher-level furniture, not a component param — strip it
  // before the spread so components never see an unknown prop.
  const { figureNote, ...rest } = params;
  if (figureNote) {
    return (
      <div style={{ display: 'inline-block' }}>
        <QuestionDiagram type={type} params={rest} />
        <FigureNote />
      </div>
    );
  }
  params = rest;
  switch (type) {
    case 'rationalFunction':
      return <RationalFunctionDiagram {...params} />;
    case 'quadraticVertex':
    case 'quadratic':
      return <QuadraticDiagram {...params} />;
    case 'absoluteValue':
      return <AbsoluteValueDiagram {...params} />;
    case 'coordinatePoints':
      return <CoordinatePointsDiagram {...params} />;
    case 'quadraticIntercepts':
      return <QuadraticInterceptsDiagram {...params} />;
    case 'scatterplot':
      return <ScatterplotDiagram {...params} />;
    case 'linearLine':
      return <LinearLineDiagram {...params} />;
    case 'simpleLine':
      return <SimpleLineDiagram {...params} />;
    case 'table': {
      // Multi-column tables (3+ columns) use DataTableDiagram
      if (params.headers && params.headers.length > 2) {
        return <DataTableDiagram {...params} />;
      }
      // 2-column tables: map headers array to xHeader/yHeader if needed
      const xHeader = params.xHeader || (params.headers && params.headers[0]) || 'x';
      const yHeader = params.yHeader || (params.headers && params.headers[1]) || 'f(x)';
      return <TableDiagram {...params} xHeader={xHeader} yHeader={yHeader} />;
    }
    case 'linearFunctionGraph':
      return <LinearFunctionGraphDiagram {...params} />;
    case 'wavyFunction':
      return <WavyFunctionDiagram {...params} />;
    case 'generalFunction':
      return <GeneralFunctionDiagram {...params} />;
    case 'dotPlot':
      return <SATDotPlot {...params} />;
    case 'boxPlot':
      return <SATBoxPlot {...params} />;
    case 'dataTable':
      return <DataTableDiagram {...params} />;

    // --- Types delegating to graphs/ components ---
    case 'linearGraph':
      return <SATLinearGraph {...params} highlightPoints={params.showPoints || params.highlightPoints} />;
    case 'parabola':
      return <SATParabola {...params} />;
    case 'barChart':
      return <SATBarChart {...params} />;
    case 'circleWithSector':
      return <CircleWithSector {...params} />;
    case 'circleWithSquare':
      return <CircleWithSquare {...params} />;
    case 'circleWithInscribedTriangle':
      return <CircleWithInscribedTriangle {...params} />;
    case 'intersectingLines':
      return <SATIntersectingLines {...params} />;
    case 'piecewiseLinear':
      return <SATPiecewiseLinear {...params} title={params.label || params.title} />;
    case 'cubicGraph':
      return <SATCubicGraph {...params} />;
    case 'parallelLines': {
      const lineLabelsArray = params.lineLabels
        ? (Array.isArray(params.lineLabels)
            ? params.lineLabels
            : [params.lineLabels.m, params.lineLabels.n, params.lineLabels.t].filter(Boolean))
        : [];
      return <SATParallelLines {...params} lineLabels={lineLabelsArray} />;
    }
    case 'twoLineGraph':
      return <SATTwoLineGraph {...params} />;
    case 'twoWayTable':
      return <SATTable {...params} />;

    // --- Triangle diagrams ---
    case 'rightTriangle':
      return <RightTriangle {...params} />;
    case 'triangleWithAngles':
      return <TriangleWithAngles {...params} />;
    case 'rightTriangleWithAltitude':
      return <RightTriangleWithAltitude {...params} />;
    case 'similarTriangles':
      return <SimilarTriangles {...params} />;
    case 'nestedRightTriangles':
      return <NestedRightTrianglesDiagram {...params} />;

    default:
      return null;
  }
};

export default QuestionDiagram;
