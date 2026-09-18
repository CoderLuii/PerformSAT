// SATTable.jsx - Table component for SAT-style data display
import React from 'react';
import { SAT_GRAPH_STYLES } from './SATGraphCore';

const SATTable = ({
  headers = [],
  rows = [],
  xHeader,      // Alternative: header for x column
  yHeader,      // Alternative: header for y column (for function tables)
  title = '',
  highlightHeader = true,
  cellPadding = 10,
  minCellWidth = 50,
}) => {
  const styles = SAT_GRAPH_STYLES;

  // Handle alternative format: xHeader/yHeader with rows as [x, y] pairs
  let finalHeaders = headers;
  let finalRows = rows;

  if (xHeader && yHeader && headers.length === 0) {
    finalHeaders = [xHeader, yHeader];
    // If rows are [x, y] pairs, convert them to string arrays
    finalRows = rows.map(row => {
      if (Array.isArray(row) && row.length === 2) {
        return [String(row[0]), String(row[1])];
      }
      return row;
    });
  }

  // Table styles
  const tableStyle = {
    borderCollapse: 'collapse',
    fontFamily: styles.font.axis,
    fontSize: '14px',
    background: styles.colors.background,
    margin: '10px auto',
  };

  const headerStyle = {
    backgroundColor: styles.colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: `${cellPadding}px ${cellPadding + 5}px`,
    borderBottom: `2px solid ${styles.colors.axis}`,
    borderRight: `1px solid ${styles.colors.gridLine}`,
    minWidth: `${minCellWidth}px`,
  };

  const cellStyle = {
    textAlign: 'center',
    padding: `${cellPadding}px ${cellPadding + 5}px`,
    borderBottom: `1px solid ${styles.colors.gridLine}`,
    borderRight: `1px solid ${styles.colors.gridLine}`,
    minWidth: `${minCellWidth}px`,
  };

  const firstColStyle = {
    ...cellStyle,
    fontWeight: finalHeaders[0] === '' ? 'bold' : 'normal',
    backgroundColor: 'transparent',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {title && (
        <div
          style={{
            fontFamily: styles.font.axis,
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          {title}
        </div>
      )}
      <table style={tableStyle}>
        {finalHeaders.length > 0 && (
          <thead>
            <tr>
              {finalHeaders.map((header, index) => (
                <th
                  key={`header-${index}`}
                  style={{
                    ...headerStyle,
                    borderRight: index === finalHeaders.length - 1 ? 'none' : headerStyle.borderRight,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {finalRows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  style={{
                    ...(cellIndex === 0 && finalHeaders[0] === '' ? firstColStyle : cellStyle),
                    borderRight: cellIndex === row.length - 1 ? 'none' : cellStyle.borderRight,
                    borderBottom: rowIndex === finalRows.length - 1 ? 'none' : cellStyle.borderBottom,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SATTable;
