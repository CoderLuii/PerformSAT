// SATCircleDiagrams.jsx - Circle-related geometry diagrams for SAT questions
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

/**
 * CircleWithSector - Circle with a sector/arc marked (SAT-style like lesson diagrams)
 */
export const CircleWithSector = ({
  centralAngle = 90,
  angleLabel,
  radius: displayRadius,
  labelCenter = 'O',
  labelPoint1 = 'A',
  labelPoint2 = 'B',
  showAngleLabel = true,
  showAngleArc = false,
  showRadiusLabel = false,
  width = 280,
  height = 280,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // Convert angle to radians (start from top-right, go counterclockwise)
  const startAngle = -Math.PI / 4; // Start at -45 degrees for better visual
  const endAngle = startAngle + (centralAngle * Math.PI) / 180;

  // Calculate arc endpoints
  const x1 = centerX + radius * Math.cos(startAngle);
  const y1 = centerY + radius * Math.sin(startAngle);
  const x2 = centerX + radius * Math.cos(endAngle);
  const y2 = centerY + radius * Math.sin(endAngle);

  // Arc path (large arc flag depends on angle > 180)
  const largeArcFlag = centralAngle > 180 ? 1 : 0;

  // Sector path (filled) - sweep flag 1 for counterclockwise
  const sectorPath = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

  // Angle arc for display (smaller arc near center)
  const angleArcRadius = 25;
  const angleX1 = centerX + angleArcRadius * Math.cos(startAngle);
  const angleY1 = centerY + angleArcRadius * Math.sin(startAngle);
  const angleX2 = centerX + angleArcRadius * Math.cos(endAngle);
  const angleY2 = centerY + angleArcRadius * Math.sin(endAngle);
  const smallLargeArc = centralAngle > 180 ? 1 : 0;
  const angleArcPath = `M ${angleX1} ${angleY1} A ${angleArcRadius} ${angleArcRadius} 0 ${smallLargeArc} 1 ${angleX2} ${angleY2}`;

  // Label positions
  const labelOffset = 18;
  const point1LabelX = x1 + labelOffset * Math.cos(startAngle);
  const point1LabelY = y1 + labelOffset * Math.sin(startAngle);
  const point2LabelX = x2 + labelOffset * Math.cos(endAngle);
  const point2LabelY = y2 + labelOffset * Math.sin(endAngle);

  // Angle label position (in the middle of the angle arc)
  const angleLabelAngle = startAngle + (centralAngle * Math.PI) / 360;
  const isFraction = angleLabel && angleLabel.includes('/');
  const angleLabelRadius = isFraction ? 52 : 42;
  const angleLabelX = centerX + angleLabelRadius * Math.cos(angleLabelAngle);
  const angleLabelY = centerY + angleLabelRadius * Math.sin(angleLabelAngle);

  // Radius label position — held perpendicular to the radius segment so it
  // clears the line (the old fixed (-12,-8) offset could land on the stroke).
  const radiusLabelPos = perpendicularLabelPos(
    [centerX, centerY],
    [x1, y1],
    [centerX, centerY],
    14,
  );

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Official Bluebook ink (2026-08-13 restyle): black line art only —
          no fills, no color. Emphasis comes from the radii + angle arc. */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#000"
        strokeWidth={1.5}
      />

      {/* Sector boundary (radii drawn below); no fill */}
      <path
        d={sectorPath}
        fill="none"
        stroke="none"
      />

      {/* Radii */}
      <line
        x1={centerX}
        y1={centerY}
        x2={x1}
        y2={y1}
        stroke="#000"
        strokeWidth={1.5}
      />
      <line
        x1={centerX}
        y1={centerY}
        x2={x2}
        y2={y2}
        stroke="#000"
        strokeWidth={1.5}
      />

      {/* Angle arc near the center */}
      <path
        d={angleArcPath}
        fill="none"
        stroke="#000"
        strokeWidth={1.2}
      />

      {/* Center point */}
      <circle
        cx={centerX}
        cy={centerY}
        r={2.5}
        fill="#000"
      />

      {/* Center label */}
      <text
        x={centerX - 18}
        y={centerY + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelCenter) ? 'italic' : 'normal'}
        fontSize={15}
        fill="#000"
        {...LABEL_HALO}
      >
        {labelCenter}
      </text>

      {/* Point 1 label (A) */}
      <text
        x={point1LabelX}
        y={point1LabelY + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelPoint1) ? 'italic' : 'normal'}
        fontSize={15}
        fill="#000"
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labelPoint1}
      </text>

      {/* Point 2 label (B) */}
      <text
        x={point2LabelX}
        y={point2LabelY + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelPoint2) ? 'italic' : 'normal'}
        fontSize={15}
        fill="#000"
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labelPoint2}
      </text>

      {/* Angle label */}
      {showAngleLabel && (() => {
        const labelText = angleLabel || `${centralAngle}°`;
        const labelFill = "#000";
        const labelFont = SAT_FIGURE_FONT;

        // Render fractions as stacked numerator/denominator
        if (labelText.includes('/')) {
          const [numerator, denominator] = labelText.split('/');
          const fracWidth = Math.max(numerator.length, denominator.length) * 9 + 4;
          return (
            <g>
              <text
                x={angleLabelX}
                y={angleLabelY - 5}
                fontFamily={labelFont}
                fontSize={13}
                fontStyle={isVariableLabel(numerator) ? 'italic' : 'normal'}
                fill={labelFill}
                textAnchor="middle"
                {...LABEL_HALO}
              >
                {numerator}
              </text>
              <line
                x1={angleLabelX - fracWidth / 2}
                y1={angleLabelY + 1}
                x2={angleLabelX + fracWidth / 2}
                y2={angleLabelY + 1}
                stroke={labelFill}
                strokeWidth={1.5}
              />
              <text
                x={angleLabelX}
                y={angleLabelY + 14}
                fontFamily={labelFont}
                fontSize={13}
                fontStyle={isVariableLabel(denominator) ? 'italic' : 'normal'}
                fill={labelFill}
                textAnchor="middle"
                {...LABEL_HALO}
              >
                {denominator}
              </text>
            </g>
          );
        }

        return (
          <text
            x={angleLabelX}
            y={angleLabelY + 5}
            fontFamily={labelFont}
            fontSize={15}
            fontStyle={isVariableLabel(labelText) ? 'italic' : 'normal'}
            fill={labelFill}
            textAnchor="middle"
            {...LABEL_HALO}
          >
            {labelText}
          </text>
        );
      })()}

      {/* Radius label */}
      {showRadiusLabel && displayRadius && (
        <text
          x={radiusLabelPos.x}
          y={radiusLabelPos.y}
          fontFamily={SAT_FIGURE_FONT}
          fontStyle={isVariableLabel(String(displayRadius)) ? 'italic' : 'normal'}
          fontSize={13}
          fill="#000"
          textAnchor="middle"
          dominantBaseline="central"
          {...LABEL_HALO}
        >
          {displayRadius}
        </text>
      )}
    </svg>
  );
};

/**
 * CircleWithSquare - Square inscribed in a circle
 */
export const CircleWithSquare = ({
  labels = { A: 'A', B: 'B', C: 'C', D: 'D', O: 'O' },
  showDiagonals = false,
  width = 280,
  height = 280,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // Square vertices on circle (rotated 45° for aesthetic)
  const angle45 = Math.PI / 4;
  const vertices = [
    { x: centerX + radius * Math.cos(angle45), y: centerY - radius * Math.sin(angle45), label: labels.A || 'A' },
    { x: centerX + radius * Math.cos(angle45 + Math.PI / 2), y: centerY - radius * Math.sin(angle45 + Math.PI / 2), label: labels.B || 'B' },
    { x: centerX + radius * Math.cos(angle45 + Math.PI), y: centerY - radius * Math.sin(angle45 + Math.PI), label: labels.C || 'C' },
    { x: centerX + radius * Math.cos(angle45 + 3 * Math.PI / 2), y: centerY - radius * Math.sin(angle45 + 3 * Math.PI / 2), label: labels.D || 'D' },
  ];

  // Square path
  const squarePath = vertices.map((v, i) => (i === 0 ? `M ${v.x} ${v.y}` : `L ${v.x} ${v.y}`)).join(' ') + ' Z';

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />

      {/* Square */}
      <path
        d={squarePath}
        fill="rgba(0, 0, 0, 0.03)"
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
      />

      {/* Diagonals */}
      {showDiagonals && (
        <>
          <line
            x1={vertices[0].x}
            y1={vertices[0].y}
            x2={vertices[2].x}
            y2={vertices[2].y}
            stroke={styles.colors.gridLine}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
          <line
            x1={vertices[1].x}
            y1={vertices[1].y}
            x2={vertices[3].x}
            y2={vertices[3].y}
            stroke={styles.colors.gridLine}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        </>
      )}

      {/* Center point */}
      <circle
        cx={centerX}
        cy={centerY}
        r={3}
        fill={styles.colors.axis}
      />

      {/* Center label */}
      <text
        x={centerX + 10}
        y={centerY - 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labels.O || 'O') ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        {...LABEL_HALO}
      >
        {labels.O || 'O'}
      </text>

      {/* Vertex labels */}
      {vertices.map((v, i) => {
        const labelOffset = 15;
        const angle = angle45 + (i * Math.PI) / 2;
        const labelX = v.x + labelOffset * Math.cos(angle);
        const labelY = v.y - labelOffset * Math.sin(angle);
        return (
          <text
            key={`vertex-${i}`}
            x={labelX}
            y={labelY + 5}
            fontFamily={SAT_FIGURE_FONT}
            fontStyle={isVariableLabel(v.label) ? 'italic' : 'normal'}
            fontSize={styles.fontSize.tickLabel}
            fill={styles.colors.axis}
            textAnchor="middle"
            {...LABEL_HALO}
          >
            {v.label}
          </text>
        );
      })}
    </svg>
  );
};

/**
 * CircleInscribed - Circle with inscribed angle
 */
export const CircleInscribed = ({
  inscribedAngle = 45,
  labelCenter = 'O',
  labelPoints = ['P', 'Q', 'R'],
  showCentralAngle = false,
  width = 280,
  height = 280,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // Central angle is twice the inscribed angle
  const centralAngleRad = (inscribedAngle * 2 * Math.PI) / 180;

  // Point positions on circle
  // Q is at the top, P and R create the inscribed angle from Q
  const qAngle = Math.PI / 2; // Q at top
  const pAngle = qAngle - centralAngleRad / 2 - Math.PI / 4;
  const rAngle = qAngle + centralAngleRad / 2 + Math.PI / 4;

  const Q = { x: centerX + radius * Math.cos(qAngle), y: centerY - radius * Math.sin(qAngle) };
  const P = { x: centerX + radius * Math.cos(pAngle), y: centerY - radius * Math.sin(pAngle) };
  const R = { x: centerX + radius * Math.cos(rAngle), y: centerY - radius * Math.sin(rAngle) };

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />

      {/* Lines from inscribed angle vertex to arc endpoints */}
      <line
        x1={Q.x}
        y1={Q.y}
        x2={P.x}
        y2={P.y}
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
      />
      <line
        x1={Q.x}
        y1={Q.y}
        x2={R.x}
        y2={R.y}
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
      />

      {/* Central angle lines (optional) */}
      {showCentralAngle && (
        <>
          <line
            x1={centerX}
            y1={centerY}
            x2={P.x}
            y2={P.y}
            stroke={styles.colors.gridLine}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={R.x}
            y2={R.y}
            stroke={styles.colors.gridLine}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        </>
      )}

      {/* Center point */}
      <circle
        cx={centerX}
        cy={centerY}
        r={3}
        fill={styles.colors.axis}
      />

      {/* Points on circle */}
      <circle cx={Q.x} cy={Q.y} r={4} fill={styles.colors.pointFill} />
      <circle cx={P.x} cy={P.y} r={4} fill={styles.colors.pointFill} />
      <circle cx={R.x} cy={R.y} r={4} fill={styles.colors.pointFill} />

      {/* Labels */}
      <text
        x={centerX - 15}
        y={centerY + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelCenter) ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        {...LABEL_HALO}
      >
        {labelCenter}
      </text>

      <text
        x={Q.x}
        y={Q.y - 15}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelPoints[0] || 'Q') ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labelPoints[0] || 'Q'}
      </text>

      <text
        x={P.x + 15}
        y={P.y + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelPoints[1] || 'P') ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labelPoints[1] || 'P'}
      </text>

      <text
        x={R.x - 15}
        y={R.y + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labelPoints[2] || 'R') ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labelPoints[2] || 'R'}
      </text>
    </svg>
  );
};

/**
 * CircleWithInscribedTriangle - Circle with a triangle inscribed in it.
 * Supports a horizontal diameter and a third point on the upper arc
 * so the angle at one of the diameter endpoints can be highlighted.
 */
export const CircleWithInscribedTriangle = ({
  labels = { A: 'A', B: 'B', C: 'C', O: 'O' },
  angleAtA,             // string label, e.g., "30°"
  angleAtAValue = 30,   // degrees for placement of C on the arc
  showDiameter = true,
  showCenter = true,
  showRightAngleAtC = true,
  radiusLabel,          // optional radius label, e.g., "10"
  width = 280,
  height = 280,
}) => {
  const centerX = width / 2;
  const centerY = height / 2 + 20; // shift slightly down for top arc room
  const radius = Math.min(width, height) / 2 - 40;

  // Endpoints of horizontal diameter
  const A = { x: centerX - radius, y: centerY };
  const B = { x: centerX + radius, y: centerY };

  // C on the upper arc such that angle BAC equals angleAtAValue (degrees)
  // Using the inscribed angle / chord geometry: C lies at angle 2·angleAtAValue
  // from B around the center (above the diameter).
  const thetaFromCenter = (180 - 2 * angleAtAValue) * Math.PI / 180;
  const C = {
    x: centerX + radius * Math.cos(thetaFromCenter),
    y: centerY - radius * Math.sin(thetaFromCenter),
  };

  // Right-angle marker at C (small square along CA and CB)
  const renderRightAngleAtC = () => {
    const size = 12;
    const toA = { x: A.x - C.x, y: A.y - C.y };
    const toB = { x: B.x - C.x, y: B.y - C.y };
    const lenA = Math.hypot(toA.x, toA.y);
    const lenB = Math.hypot(toB.x, toB.y);
    const uA = { x: toA.x / lenA, y: toA.y / lenA };
    const uB = { x: toB.x / lenB, y: toB.y / lenB };
    const p1 = { x: C.x + uA.x * size, y: C.y + uA.y * size };
    const p2 = { x: p1.x + uB.x * size, y: p1.y + uB.y * size };
    const p3 = { x: C.x + uB.x * size, y: C.y + uB.y * size };
    return (
      <polyline
        points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
        fill="none"
        stroke={styles.colors.axis}
        strokeWidth={1}
      />
    );
  };

  // Angle arc at A between AB and AC
  const renderAngleAtA = () => {
    const arcR = 28;
    // AB direction from A: along +x (since B is right of A on horizontal diameter)
    // AC direction from A
    const angleAB = 0;
    const angleAC = Math.atan2(C.y - A.y, C.x - A.x); // SVG y is flipped; this returns negative for upward
    const startAngle = angleAB;
    const endAngle = angleAC;
    const x1 = A.x + arcR * Math.cos(startAngle);
    const y1 = A.y + arcR * Math.sin(startAngle);
    const x2 = A.x + arcR * Math.cos(endAngle);
    const y2 = A.y + arcR * Math.sin(endAngle);
    // sweep flag: 0 since we go counterclockwise in SVG (negative y direction)
    const arcPath = `M ${x1} ${y1} A ${arcR} ${arcR} 0 0 ${endAngle < startAngle ? 0 : 1} ${x2} ${y2}`;
    const midAngle = (startAngle + endAngle) / 2;
    const labelX = A.x + (arcR + 18) * Math.cos(midAngle);
    const labelY = A.y + (arcR + 18) * Math.sin(midAngle);
    return (
      <g>
        <path d={arcPath} fill="none" stroke={styles.colors.axis} strokeWidth={1.2} />
        {angleAtA && (
          <text
            x={labelX}
            y={labelY + 4}
            fontFamily={SAT_FIGURE_FONT}
            fontSize={13}
            fontStyle={isVariableLabel(angleAtA) ? 'italic' : 'normal'}
            fill={styles.colors.axis}
            textAnchor="middle"
            {...LABEL_HALO}
          >
            {angleAtA}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />

      {/* Diameter AB */}
      {showDiameter && (
        <line
          x1={A.x}
          y1={A.y}
          x2={B.x}
          y2={B.y}
          stroke={styles.colors.dataLine}
          strokeWidth={styles.strokeWidth.dataLine}
        />
      )}

      {/* Triangle ACB */}
      <polygon
        points={`${A.x},${A.y} ${C.x},${C.y} ${B.x},${B.y}`}
        fill="rgba(0, 0, 0, 0.02)"
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
      />

      {/* Optional radius label (drawn from O to C) */}
      {radiusLabel && (() => {
        const radiusLabelPos = perpendicularLabelPos(
          [centerX, centerY],
          [C.x, C.y],
          [centerX, centerY],
          14,
        );
        return (
          <g>
            <line
              x1={centerX}
              y1={centerY}
              x2={C.x}
              y2={C.y}
              stroke={styles.colors.gridLine}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <text
              x={radiusLabelPos.x}
              y={radiusLabelPos.y}
              fontFamily={SAT_FIGURE_FONT}
              fontStyle={isVariableLabel(String(radiusLabel)) ? 'italic' : 'normal'}
              fontSize={styles.fontSize.tickLabel}
              fill={styles.colors.axis}
              textAnchor="middle"
              dominantBaseline="central"
              {...LABEL_HALO}
            >
              {radiusLabel}
            </text>
          </g>
        );
      })()}

      {/* Right-angle marker at C */}
      {showRightAngleAtC && renderRightAngleAtC()}

      {/* Angle arc + label at A */}
      {renderAngleAtA()}

      {/* Center point */}
      {showCenter && <circle cx={centerX} cy={centerY} r={3} fill={styles.colors.axis} />}

      {/* Vertex points */}
      <circle cx={A.x} cy={A.y} r={3.5} fill={styles.colors.axis} />
      <circle cx={B.x} cy={B.y} r={3.5} fill={styles.colors.axis} />
      <circle cx={C.x} cy={C.y} r={3.5} fill={styles.colors.axis} />

      {/* Vertex labels */}
      <text
        x={A.x - 14}
        y={A.y + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labels.A) ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labels.A}
      </text>
      <text
        x={B.x + 14}
        y={B.y + 5}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labels.B) ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labels.B}
      </text>
      <text
        x={C.x}
        y={C.y - 10}
        fontFamily={SAT_FIGURE_FONT}
        fontStyle={isVariableLabel(labels.C) ? 'italic' : 'normal'}
        fontSize={styles.fontSize.tickLabel}
        fill={styles.colors.axis}
        textAnchor="middle"
        {...LABEL_HALO}
      >
        {labels.C}
      </text>
      {showCenter && (
        <text
          x={centerX + 8}
          y={centerY + 14}
          fontFamily={SAT_FIGURE_FONT}
          fontStyle={isVariableLabel(labels.O) ? 'italic' : 'normal'}
          fontSize={styles.fontSize.tickLabel}
          fill={styles.colors.axis}
          {...LABEL_HALO}
        >
          {labels.O}
        </text>
      )}
    </svg>
  );
};

const SATCircleDiagramsBundle = { CircleWithSector, CircleWithSquare, CircleInscribed, CircleWithInscribedTriangle };

export default SATCircleDiagramsBundle;
