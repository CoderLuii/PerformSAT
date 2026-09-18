// SATBarChart.jsx - Professional bar chart component for SAT-style questions
import React from 'react';
import {
  SAT_GRAPH_STYLES,
  SAT_FIGURE_STYLE,
  LABEL_HALO,
} from './SATGraphCore';

const SATBarChart = ({
  title = '',
  data = [],
  xAxisLabel = '',
  yAxisLabel = '',
  yMax: providedYMax,
  yStep: providedYStep,
  width = 320,
  height = 280,
  barColor = '#000000',
}) => {
  const styles = SAT_GRAPH_STYLES;

  // Calculate padding
  const padding = { top: 40, right: 30, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate y-axis range
  const maxValue = Math.max(...data.map(d => d.value));
  const yMax = providedYMax || Math.ceil(maxValue * 1.1);
  const yStep = providedYStep || Math.ceil(yMax / 5);

  // Calculate bar dimensions
  const barCount = data.length;
  const barPadding = 0.3; // 30% padding between bars
  const totalBarWidth = chartWidth / barCount;
  const barWidth = totalBarWidth * (1 - barPadding);
  const barGap = totalBarWidth * barPadding / 2;

  // Y-axis scale
  const yScale = (value) => chartHeight - (value / yMax) * chartHeight;

  // Generate y-axis ticks
  const yTicks = [];
  for (let y = 0; y <= yMax; y += yStep) {
    yTicks.push(y);
  }

  return (
    <svg
      width={width}
      height={height}
      style={SAT_FIGURE_STYLE}
    >
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

      {/* Y-axis */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + chartHeight}
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />

      {/* Y-axis ticks and labels */}
      {yTicks.map((tick) => {
        const y = padding.top + yScale(tick);
        return (
          <g key={`y-tick-${tick}`}>
            {/* Grid line */}
            <line
              x1={padding.left}
              y1={y}
              x2={padding.left + chartWidth}
              y2={y}
              stroke={styles.colors.gridLine}
              strokeWidth={styles.strokeWidth.grid}
            />
            {/* Tick mark */}
            <line
              x1={padding.left - 5}
              y1={y}
              x2={padding.left}
              y2={y}
              stroke={styles.colors.axis}
              strokeWidth={styles.strokeWidth.tick}
            />
            {/* Label */}
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fontFamily={styles.font.axis}
              fontSize={styles.fontSize.tickLabel}
              fill={styles.colors.axis}
              {...LABEL_HALO}
            >
              {tick.toLocaleString()}
            </text>
          </g>
        );
      })}

      {/* X-axis */}
      <line
        x1={padding.left}
        y1={padding.top + chartHeight}
        x2={padding.left + chartWidth}
        y2={padding.top + chartHeight}
        stroke={styles.colors.axis}
        strokeWidth={styles.strokeWidth.axis}
      />

      {/* Bars and X-axis labels */}
      {data.map((item, index) => {
        const x = padding.left + index * totalBarWidth + barGap;
        const barHeight = (item.value / yMax) * chartHeight;
        const y = padding.top + chartHeight - barHeight;

        return (
          <g key={`bar-${index}`}>
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={barColor}
            />
            {/* X-axis label */}
            <text
              x={x + barWidth / 2}
              y={padding.top + chartHeight + 20}
              textAnchor="middle"
              fontFamily={styles.font.axis}
              fontSize={styles.fontSize.tickLabel}
              fill={styles.colors.axis}
            >
              {item.label}
            </text>
          </g>
        );
      })}

      {/* Y-axis label */}
      {yAxisLabel && (
        <text
          x={15}
          y={padding.top + chartHeight / 2}
          textAnchor="middle"
          fontFamily={styles.font.axis}
          fontSize={13}
          fill={styles.colors.axis}
          transform={`rotate(-90, 15, ${padding.top + chartHeight / 2})`}
        >
          {yAxisLabel}
        </text>
      )}

      {/* X-axis label */}
      {xAxisLabel && (
        <text
          x={padding.left + chartWidth / 2}
          y={height - 10}
          textAnchor="middle"
          fontFamily={styles.font.axis}
          fontSize={13}
          fill={styles.colors.axis}
        >
          {xAxisLabel}
        </text>
      )}
    </svg>
  );
};

export default SATBarChart;
