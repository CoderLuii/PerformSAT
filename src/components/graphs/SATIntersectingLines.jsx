// SATIntersectingLines.jsx - Two intersecting lines with angle labels
import React from 'react';
import {
  SAT_GRAPH_STYLES,
  SAT_FIGURE_STYLE,
  SAT_FIGURE_FONT,
  LABEL_HALO,
  isVariableLabel,
} from './SATGraphCore';

const styles = SAT_GRAPH_STYLES;

const SATIntersectingLines = ({
  angles = [],          // ['18°', 't°', '68°', '27°'] - four angles clockwise from right
  lineLabels = [],      // ['l', 'm'] for the two lines
  width = 280,
  height = 220,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const lineLength = Math.min(width, height) / 2 - 30;

  // Line angles (one horizontal-ish, one at an angle)
  const line1Angle = 15;  // degrees from horizontal
  const line2Angle = 75;  // degrees from horizontal

  // Calculate line endpoints
  const line1 = {
    x1: centerX - lineLength * Math.cos((line1Angle * Math.PI) / 180),
    y1: centerY + lineLength * Math.sin((line1Angle * Math.PI) / 180),
    x2: centerX + lineLength * Math.cos((line1Angle * Math.PI) / 180),
    y2: centerY - lineLength * Math.sin((line1Angle * Math.PI) / 180),
  };

  const line2 = {
    x1: centerX - lineLength * Math.cos((line2Angle * Math.PI) / 180),
    y1: centerY + lineLength * Math.sin((line2Angle * Math.PI) / 180),
    x2: centerX + lineLength * Math.cos((line2Angle * Math.PI) / 180),
    y2: centerY - lineLength * Math.sin((line2Angle * Math.PI) / 180),
  };

  // Draw angle arc helper
  const drawAngleArc = (startAngle, endAngle, label, radius = 30) => {
    if (!label) return null;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY - radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY - radius * Math.sin(endRad);

    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
    // Bump the standoff so labels like '128°'/'x°' clear the crossing lines.
    const labelRadius = radius + 24;
    const labelX = centerX + labelRadius * Math.cos(midAngle);
    const labelY = centerY - labelRadius * Math.sin(midAngle);

    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    const sweep = 0;

    return (
      <g>
        <path
          d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`}
          fill="none"
          stroke={styles.colors.axis}
          strokeWidth={1}
        />
        <text
          x={labelX}
          y={labelY + 4}
          fontFamily={SAT_FIGURE_FONT}
          fontStyle={isVariableLabel(label) ? 'italic' : 'normal'}
          fontSize={styles.fontSize.tickLabel}
          fill={styles.colors.axis}
          textAnchor="middle"
          {...LABEL_HALO}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
      {/* Line 1 */}
      <line
        x1={line1.x1}
        y1={line1.y1}
        x2={line1.x2}
        y2={line1.y2}
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
      />

      {/* Line 2 */}
      <line
        x1={line2.x1}
        y1={line2.y1}
        x2={line2.x2}
        y2={line2.y2}
        stroke={styles.colors.dataLine}
        strokeWidth={styles.strokeWidth.dataLine}
      />

      {/* Angle arcs */}
      {angles[0] && drawAngleArc(line1Angle, line2Angle, angles[0], 25)}
      {angles[1] && drawAngleArc(line2Angle, 180 + line1Angle, angles[1], 25)}
      {angles[2] && drawAngleArc(180 + line1Angle, 180 + line2Angle, angles[2], 25)}
      {angles[3] && drawAngleArc(180 + line2Angle, 360 + line1Angle, angles[3], 25)}

      {/* Line labels */}
      {lineLabels[0] && (
        <text
          x={line1.x2 + 10}
          y={line1.y2 + 5}
          fontFamily={SAT_FIGURE_FONT}
          fontSize={styles.fontSize.tickLabel}
          fontStyle={isVariableLabel(lineLabels[0]) ? 'italic' : 'normal'}
          fill={styles.colors.axis}
          {...LABEL_HALO}
        >
          {lineLabels[0]}
        </text>
      )}
      {lineLabels[1] && (
        <text
          x={line2.x2 + 10}
          y={line2.y2 + 5}
          fontFamily={SAT_FIGURE_FONT}
          fontSize={styles.fontSize.tickLabel}
          fontStyle={isVariableLabel(lineLabels[1]) ? 'italic' : 'normal'}
          fill={styles.colors.axis}
          {...LABEL_HALO}
        >
          {lineLabels[1]}
        </text>
      )}
    </svg>
  );
};

export default SATIntersectingLines;
