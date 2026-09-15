// SATTriangleDiagrams.jsx - Triangle geometry diagrams for SAT questions
import React from 'react';
import {
  SAT_GRAPH_STYLES,
  SAT_FIGURE_STYLE,
  SAT_FIGURE_FONT,
  LABEL_HALO,
  isVariableLabel,
  perpendicularLabelPos,
} from './SATGraphCore';

const styles = SAT_GRAPH_STYLES;

// A figure label that holds itself off the strokes (white halo) and italicizes
// single-letter / short variable expressions the way the Digital SAT does.
export const FigureLabel = ({ x, y, text, anchor = 'middle', baseline = 'central', size = 14 }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    dominantBaseline={baseline}
    fontFamily={SAT_FIGURE_FONT}
    fontStyle={isVariableLabel(text) ? 'italic' : 'normal'}
    fontSize={size}
    fill={styles.colors.axis}
    {...LABEL_HALO}
  >
    {text}
  </text>
);

/**
 * RightTriangle - Basic right triangle with labeled sides and vertices
 */
export const RightTriangle = ({
  vertices,           // [[x1,y1], [x2,y2], [x3,y3]] - optional if using sides
  labels = [],        // Vertex labels ['A', 'B', 'C']
  sideLabels = [],    // Side labels ['a', 'b', 'c']
  rightAngleVertex = 1, // Index of vertex with right angle
  showRightAngle = true,
  width = 280,
  height = 220,
}) => {
  const padding = 40;

  // Default vertices if not provided (standard right triangle)
  const defaultVertices = [
    [padding, height - padding],                    // Bottom-left
    [width - padding, height - padding],            // Bottom-right (right angle)
    [width - padding, padding],                     // Top-right
  ];
  const verts = vertices || defaultVertices;

  // Scale vertices to fit
  let scaledVerts = verts;
  if (vertices) {
    const xs = vertices.map(v => v[0]);
    const ys = vertices.map(v => v[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const scaleX = (width - 2 * padding) / (maxX - minX || 1);
    const scaleY = (height - 2 * padding) / (maxY - minY || 1);
    const scale = Math.min(scaleX, scaleY);

    scaledVerts = vertices.map(([x, y]) => [
      padding + (x - minX) * scale,
      height - padding - (y - minY) * scale,
    ]);
  }

  // Right angle marker
  const rightAngleSize = 15;
  const rv = scaledVerts[rightAngleVertex];
  const prevIdx = (rightAngleVertex - 1 + 3) % 3;
  const nextIdx = (rightAngleVertex + 1) % 3;
  const prev = scaledVerts[prevIdx];
  const next = scaledVerts[nextIdx];

  // Calculate vectors for right angle marker
  const toPrev = [(prev[0] - rv[0]), (prev[1] - rv[1])];
  const toNext = [(next[0] - rv[0]), (next[1] - rv[1])];
  const lenPrev = Math.sqrt(toPrev[0] * toPrev[0] + toPrev[1] * toPrev[1]);
  const lenNext = Math.sqrt(toNext[0] * toNext[0] + toNext[1] * toNext[1]);
  const unitPrev = [toPrev[0] / lenPrev, toPrev[1] / lenPrev];
  const unitNext = [toNext[0] / lenNext, toNext[1] / lenNext];

  const ra1 = [rv[0] + unitPrev[0] * rightAngleSize, rv[1] + unitPrev[1] * rightAngleSize];
  const ra2 = [ra1[0] + unitNext[0] * rightAngleSize, ra1[1] + unitNext[1] * rightAngleSize];
  const ra3 = [rv[0] + unitNext[0] * rightAngleSize, rv[1] + unitNext[1] * rightAngleSize];

  // Label positions (outside the triangle)
  const labelOffset = 20;

  const center = [
    (scaledVerts[0][0] + scaledVerts[1][0] + scaledVerts[2][0]) / 3,
    (scaledVerts[0][1] + scaledVerts[1][1] + scaledVerts[2][1]) / 3,
  ];

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Triangle */}
      <polygon
        points={scaledVerts.map(v => v.join(',')).join(' ')}
        fill="none"
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
        strokeLinejoin="round"
      />

      {/* Right angle marker */}
      {showRightAngle && (
        <polyline
          points={`${ra1[0]},${ra1[1]} ${ra2[0]},${ra2[1]} ${ra3[0]},${ra3[1]}`}
          fill="none"
          stroke={styles.colors.axis}
          strokeWidth={1.25}
        />
      )}

      {/* Vertex labels — held just outside each vertex */}
      {labels.map((label, i) => {
        if (!label) return null;
        const v = scaledVerts[i];
        const dx = v[0] - center[0];
        const dy = v[1] - center[1];
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        return (
          <FigureLabel
            key={`vertex-${i}`}
            x={v[0] + (dx / len) * labelOffset}
            y={v[1] + (dy / len) * labelOffset}
            text={label}
          />
        );
      })}

      {/* Side labels — pushed perpendicular to each edge, off the line */}
      {sideLabels.map((label, i) => {
        if (!label) return null;
        const v1 = scaledVerts[i];
        const v2 = scaledVerts[(i + 1) % 3];
        const pos = perpendicularLabelPos(v1, v2, center, 18);
        return <FigureLabel key={`side-${i}`} x={pos.x} y={pos.y} text={label} />;
      })}
    </svg>
  );
};

/**
 * TriangleWithAngles - Triangle showing angle measures
 */
export const TriangleWithAngles = ({
  angleLabels = [],   // ['18°', 't°', '68°']
  vertexLabels = [],  // ['A', 'B', 'C']
  sideLabels = [],
  note = '',
  width = 280,
  height = 220,
}) => {
  const padding = 50;

  // Create a scalene triangle for better visibility of angles
  const vertices = [
    [padding + 20, height - padding],           // Bottom-left
    [width - padding - 10, height - padding],   // Bottom-right
    [width / 2 - 20, padding + 10],             // Top
  ];

  // Triangle centroid — used to push side labels perpendicular, away from the body
  const centroid = [
    (vertices[0][0] + vertices[1][0] + vertices[2][0]) / 3,
    (vertices[0][1] + vertices[1][1] + vertices[2][1]) / 3,
  ];

  // Angle arc drawing helper
  const drawAngleArc = (vertex, v1, v2, arcRadius = 25) => {
    const vec1 = [v1[0] - vertex[0], v1[1] - vertex[1]];
    const vec2 = [v2[0] - vertex[0], v2[1] - vertex[1]];
    const len1 = Math.sqrt(vec1[0] * vec1[0] + vec1[1] * vec1[1]);
    const len2 = Math.sqrt(vec2[0] * vec2[0] + vec2[1] * vec2[1]);
    const unit1 = [vec1[0] / len1, vec1[1] / len1];
    const unit2 = [vec2[0] / len2, vec2[1] / len2];

    const start = [vertex[0] + unit1[0] * arcRadius, vertex[1] + unit1[1] * arcRadius];
    const end = [vertex[0] + unit2[0] * arcRadius, vertex[1] + unit2[1] * arcRadius];

    // Determine sweep direction using cross product
    const cross = unit1[0] * unit2[1] - unit1[1] * unit2[0];
    const sweepFlag = cross > 0 ? 1 : 0;

    return {
      path: `M ${start[0]} ${start[1]} A ${arcRadius} ${arcRadius} 0 0 ${sweepFlag} ${end[0]} ${end[1]}`,
      labelPos: [
        vertex[0] + (unit1[0] + unit2[0]) * (arcRadius + 15) / 2,
        vertex[1] + (unit1[1] + unit2[1]) * (arcRadius + 15) / 2,
      ],
    };
  };

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Triangle */}
      <polygon
        points={vertices.map(v => v.join(',')).join(' ')}
        fill="none"
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
        strokeLinejoin="round"
      />

      {/* Angle arcs and labels */}
      {angleLabels.map((label, i) => {
        if (!label) return null;
        const vertex = vertices[i];
        const prevVertex = vertices[(i + 2) % 3];
        const nextVertex = vertices[(i + 1) % 3];
        const arc = drawAngleArc(vertex, prevVertex, nextVertex, 20);

        return (
          <g key={`angle-${i}`}>
            <path
              d={arc.path}
              fill="none"
              stroke={styles.colors.axis}
              strokeWidth={1}
            />
            <FigureLabel
              x={arc.labelPos[0]}
              y={arc.labelPos[1]}
              text={label}
              size={styles.fontSize.tickLabel - 1}
            />
          </g>
        );
      })}

      {/* Vertex labels — held just outside each vertex (radial offset) */}
      {vertexLabels.map((label, i) => {
        if (!label) return null;
        const v = vertices[i];
        const dx = v[0] - centroid[0];
        const dy = v[1] - centroid[1];
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const labelX = v[0] + (dx / len) * 25;
        const labelY = v[1] + (dy / len) * 25;

        return (
          <FigureLabel
            key={`vertex-${i}`}
            x={labelX}
            y={labelY}
            text={label}
          />
        );
      })}

      {/* Note */}
      {note && (
        <text
          x={width / 2}
          y={height - 10}
          fontFamily={SAT_FIGURE_FONT}
          fontSize={10}
          fontStyle="italic"
          fill={styles.colors.axis}
          textAnchor="middle"
          {...LABEL_HALO}
        >
          {note}
        </text>
      )}
    </svg>
  );
};

/**
 * RightTriangleWithAltitude - Right triangle with altitude to hypotenuse
 */
export const RightTriangleWithAltitude = ({
  vertexLabels = ['L', 'M', 'N', 'P'],
  rightAngleAt = 'M',
  altitudeFrom = 'P',
  sideLengths = {},
  width = 320,
  height = 220,
}) => {
  const padding = 50;

  // Triangle vertices (right angle at bottom-left)
  const L = [padding, height - padding];                    // Left vertex (top of hypotenuse)
  const N = [width - padding, height - padding];            // Right vertex (bottom of hypotenuse)
  const M = [padding + 50, padding + 30];                   // Top vertex (right angle)

  // Calculate altitude foot P on LN
  // P is where the altitude from M meets LN
  const LN = [N[0] - L[0], N[1] - L[1]];
  const LNlen = Math.sqrt(LN[0] * LN[0] + LN[1] * LN[1]);
  const LNunit = [LN[0] / LNlen, LN[1] / LNlen];
  const LM = [M[0] - L[0], M[1] - L[1]];
  const dotProduct = LM[0] * LNunit[0] + LM[1] * LNunit[1];
  const P = [L[0] + LNunit[0] * dotProduct, L[1] + LNunit[1] * dotProduct];

  // Right angle markers
  const rightAngleSize = 12;

  // Triangle centroid — used to push side-length labels perpendicular, off the line
  const centroid = [
    (L[0] + M[0] + N[0]) / 3,
    (L[1] + M[1] + N[1]) / 3,
  ];

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Triangle */}
      <polygon
        points={`${L[0]},${L[1]} ${M[0]},${M[1]} ${N[0]},${N[1]}`}
        fill="none"
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
        strokeLinejoin="round"
      />

      {/* Altitude MP */}
      <line
        x1={M[0]}
        y1={M[1]}
        x2={P[0]}
        y2={P[1]}
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
        strokeDasharray="5,3"
      />

      {/* Right angle at M */}
      <rect
        x={M[0] - rightAngleSize}
        y={M[1]}
        width={rightAngleSize}
        height={rightAngleSize}
        fill="none"
        stroke={styles.colors.axis}
        strokeWidth={1}
        transform={`rotate(${Math.atan2(N[1] - M[1], N[0] - M[0]) * 180 / Math.PI}, ${M[0]}, ${M[1]})`}
      />

      {/* Right angle at P (altitude to hypotenuse) */}
      <rect
        x={P[0]}
        y={P[1] - rightAngleSize}
        width={rightAngleSize}
        height={rightAngleSize}
        fill="none"
        stroke={styles.colors.axis}
        strokeWidth={1}
      />

      {/* Vertex labels — held just outside each vertex */}
      <FigureLabel x={L[0] - 15} y={L[1] + 5} text={vertexLabels[0]} anchor="start" baseline="middle" />
      <FigureLabel x={M[0] - 5} y={M[1] - 10} text={vertexLabels[1]} anchor="start" baseline="middle" />
      <FigureLabel x={N[0] + 10} y={N[1] + 5} text={vertexLabels[2]} anchor="start" baseline="middle" />
      <FigureLabel x={P[0]} y={P[1] + 20} text={vertexLabels[3]} />

      {/* Side length labels — pushed perpendicular to each segment, off the line */}
      {Object.entries(sideLengths).map(([side, length]) => {
        // Resolve the side name to its two endpoints (order-insensitive)
        const endpoints = {
          LP: [L, P], PL: [P, L],
          PM: [P, M], MP: [M, P],
          PN: [P, N], NP: [N, P],
          LM: [L, M], ML: [M, L],
          MN: [M, N], NM: [N, M],
        }[side];
        if (!endpoints) return null;
        const [a, b] = endpoints;

        // For the altitude PM (interior segment), push toward the side away from M's
        // body; for the outer sides, push away from the centroid.
        const interior = (side === 'PM' || side === 'MP') ? L : centroid;
        const pos = perpendicularLabelPos(a, b, interior, 16);

        return <FigureLabel key={side} x={pos.x} y={pos.y} text={String(length)} />;
      })}
    </svg>
  );
};

/**
 * SimilarTriangles - Two similar triangles side by side
 */
export const SimilarTriangles = ({
  triangle1 = {},
  triangle2 = {},
  width = 400,
  height = 200,
}) => {
  const padding = 30;
  const halfWidth = (width - padding * 3) / 2;

  const renderTriangle = (config, offsetX) => {
    const { vertices, labels = [], sideLabels = [] } = config;

    // Default vertices if not provided
    const defaultVerts = [
      [offsetX + padding, height - padding],
      [offsetX + halfWidth - padding, height - padding],
      [offsetX + halfWidth / 2, padding + 20],
    ];

    let scaledVerts = defaultVerts;
    if (vertices && vertices.length === 3) {
      const xs = vertices.map(v => v[0]);
      const ys = vertices.map(v => v[1]);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const scaleX = (halfWidth - 2 * padding) / (maxX - minX || 1);
      const scaleY = (height - 2 * padding) / (maxY - minY || 1);
      const scale = Math.min(scaleX, scaleY);

      scaledVerts = vertices.map(([x, y]) => [
        offsetX + padding + (x - minX) * scale,
        height - padding - (y - minY) * scale,
      ]);
    }

    // Per-triangle centroid (computed from this triangle's own scaledVerts)
    const centroid = [
      (scaledVerts[0][0] + scaledVerts[1][0] + scaledVerts[2][0]) / 3,
      (scaledVerts[0][1] + scaledVerts[1][1] + scaledVerts[2][1]) / 3,
    ];

    return (
      <g>
        <polygon
          points={scaledVerts.map(v => v.join(',')).join(' ')}
          fill="none"
          stroke={styles.colors.dataLine}
          strokeWidth={styles.strokeWidth.dataLine}
          strokeLinejoin="round"
        />

        {/* Vertex labels — held just outside each vertex (radial offset) */}
        {labels.map((label, i) => {
          if (!label) return null;
          const v = scaledVerts[i];
          const dx = v[0] - centroid[0];
          const dy = v[1] - centroid[1];
          const len = Math.sqrt(dx * dx + dy * dy) || 1;

          return (
            <FigureLabel
              key={`label-${i}`}
              x={v[0] + (dx / len) * 18}
              y={v[1] + (dy / len) * 18}
              text={label}
            />
          );
        })}

        {/* Side labels — pushed perpendicular to each edge, off the line */}
        {sideLabels.map((label, i) => {
          if (!label) return null;
          const v1 = scaledVerts[i];
          const v2 = scaledVerts[(i + 1) % 3];
          const pos = perpendicularLabelPos(v1, v2, centroid, 16);

          return <FigureLabel key={`side-${i}`} x={pos.x} y={pos.y} text={label} />;
        })}
      </g>
    );
  };

  return (
    // viewBox + width:100%/max-width keeps the pair pixel-identical at desktop
    // (the card is wider than `width`) while letting this 400px-wide figure —
    // the widest in the set — scale down inside a phone-width card.
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ ...SAT_FIGURE_STYLE, width: '100%', maxWidth: width, height: 'auto' }}
    >
      {renderTriangle(triangle1, 0)}
      {renderTriangle(triangle2, halfWidth + padding)}
    </svg>
  );
};

const SATTriangleDiagramsBundle = { RightTriangle, TriangleWithAngles, RightTriangleWithAltitude, SimilarTriangles };

export default SATTriangleDiagramsBundle;
