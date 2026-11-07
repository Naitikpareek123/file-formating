import React, { useMemo } from 'react';
import { THEMES } from '../utils/themes';

export default function PrintableTableView({
  title,
  company,
  subtitle,
  dateStr,
  showDate,
  headers = [],
  rows = [],
  visibleColumns = [],
  columnAlignments = {},
  columnTypes = {},
  themeId = 'corporate',
  orientation = 'portrait',
  pageSize = 'a4',
  fontSize = 9.5,
  density = 'normal',
  zebraStripes = true,
  showBorders = true,
  includeTotals = true,
}) {
  const theme = THEMES[themeId] || THEMES.corporate;

  // Filter visible columns
  const activeHeaders = useMemo(() => {
    return headers.filter((h) => visibleColumns.includes(h));
  }, [headers, visibleColumns]);

  // Compute column indexes for quick access
  const activeColumnIndices = useMemo(() => {
    return activeHeaders.map((h) => headers.indexOf(h));
  }, [headers, activeHeaders]);

  // Helper to format cell values
  const formatCell = (val, colName) => {
    if (val === null || val === undefined || val === '') return '—';

    // Check if status-like
    const strVal = String(val).trim();
    const isStatus = ['status', 'state', 'condition'].some((s) => colName.toLowerCase().includes(s));
    if (isStatus) {
      const lower = strVal.toLowerCase();
      let badgeStyle = 'bg-slate-100 text-slate-700';
      if (lower.includes('deliver') || lower.includes('in stock') || lower.includes('paid') || lower.includes('active')) {
        badgeStyle = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      } else if (lower.includes('pend') || lower.includes('alert') || lower.includes('due') || lower.includes('ship')) {
        badgeStyle = 'bg-amber-50 text-amber-700 border border-amber-200';
      } else if (lower.includes('cancel') || lower.includes('failed') || lower.includes('out of stock')) {
        badgeStyle = 'bg-rose-50 text-rose-700 border border-rose-200';
      }
      return (
        <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeStyle}`}>
          {strVal}
        </span>
      );
    }

    // Number formatting
    if (typeof val === 'number') {
      // Check if integer or float
      if (Number.isInteger(val)) {
        return val.toLocaleString();
      }
      return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // If string is clean number
    const numClean = strVal.replace(/[$,₹€£%]/g, '');
    if (!isNaN(Number(numClean)) && numClean !== '' && strVal.length < 15) {
      const num = Number(numClean);
      const prefix = strVal.startsWith('$') ? '$' : strVal.startsWith('₹') ? '₹' : '';
      const suffix = strVal.endsWith('%') ? '%' : '';
      return `${prefix}${num.toLocaleString(undefined, { minimumFractionDigits: num % 1 !== 0 ? 2 : 0 })}${suffix}`;
    }

    // Date formatting if Date instance
    if (val instanceof Date) {
      return val.toLocaleDateString('en-GB');
    }

    return strVal;
  };

  // Padding classes based on density
  const paddingClass = useMemo(() => {
    switch (density) {
      case 'compact':
        return 'py-1 px-2.5';
      case 'relaxed':
        return 'py-3 px-4';
      default:
        return 'py-2 px-3';
    }
  }, [density]);

  // Calculate totals for numeric columns
  const summaryRow = useMemo(() => {
    if (!includeTotals || rows.length === 0) return null;

    return activeHeaders.map((header, colIdx) => {
      const actualColIdx = activeColumnIndices[colIdx];
      if (colIdx === 0) {
        return `TOTAL (${rows.length} Rows)`;
      }

      const type = columnTypes[header];
      if (type !== 'number') return '';

      // Calculate sum
      let sum = 0;
      let count = 0;
      rows.forEach((row) => {
        const cell = row[actualColIdx];
        if (cell !== null && cell !== undefined && cell !== '') {
          const num = typeof cell === 'number' ? cell : Number(String(cell).replace(/[$,₹€£%]/g, ''));
          if (!isNaN(num)) {
            sum += num;
            count++;
          }
        }
      });

      if (count === 0) return '';
      return Number.isInteger(sum)
        ? sum.toLocaleString()
        : sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
  }, [includeTotals, rows, activeHeaders, activeColumnIndices, columnTypes]);

  // Max width style for paper simulation
  const paperContainerStyle = {
    maxWidth: orientation === 'landscape' ? '1100px' : '820px',
  };

  return (
    <div className="w-full flex justify-center pb-16">
      {/* Dynamic Print CSS for automatic orientation */}
      <style>{`
        @media print {
          @page {
            size: ${pageSize} ${orientation};
            margin: 10mm;
          }
        }
      `}</style>

      {/* Paper Sheet Preview Container */}
      <div
        className="print-container w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300"
        style={paperContainerStyle}
      >
        <div className="p-8 sm:p-10">
          {/* Document Header Section */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                {company && (
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: theme.accentColor }}
                  >
                    {company}
                  </p>
                )}
                {title && (
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    {subtitle}
                  </p>
                )}
              </div>

              {showDate && dateStr && (
                <div className="sm:text-right shrink-0">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Report Date
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-0.5">{dateStr}</div>
                </div>
              )}
            </div>

            {/* Header Divider Line */}
            <div
              className="mt-4 h-0.5 w-full rounded-full"
              style={{ backgroundColor: theme.accentColor, opacity: 0.3 }}
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table
              className="w-full text-left border-collapse"
              style={{
                fontSize: `${fontSize}pt`,
                borderColor: showBorders ? theme.borderColor : 'transparent',
              }}
            >
              {/* Table Header */}
              <thead>
                <tr
                  style={{
                    backgroundColor: theme.headerBg,
                    color: theme.headerText,
                    borderBottom: `2px solid ${theme.headerBorder}`,
                  }}
                >
                  {activeHeaders.map((header) => {
                    const align =
                      columnAlignments[header] ||
                      (columnTypes[header] === 'number' ? 'right' : 'left');

                    return (
                      <th
                        key={header}
                        className={`${paddingClass} font-bold tracking-wider uppercase text-[10px] select-none`}
                        style={{
                          textAlign: align,
                          borderRight: showBorders ? `1px solid ${theme.headerBorder}` : 'none',
                        }}
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {rows.map((row, rowIdx) => {
                  const isEven = rowIdx % 2 === 0;
                  const rowBg = zebraStripes && !isEven ? theme.zebraBg : '#ffffff';

                  return (
                    <tr
                      key={rowIdx}
                      style={{
                        backgroundColor: rowBg,
                        borderBottom: showBorders ? `1px solid ${theme.borderColor}` : 'none',
                      }}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {activeHeaders.map((header, colIdx) => {
                        const actualIdx = activeColumnIndices[colIdx];
                        const cellVal = row[actualIdx];
                        const align =
                          columnAlignments[header] ||
                          (columnTypes[header] === 'number' ? 'right' : 'left');

                        return (
                          <td
                            key={`${rowIdx}-${colIdx}`}
                            className={`${paddingClass} text-slate-800 ${
                              columnTypes[header] === 'number' ? 'font-mono tabular-nums' : ''
                            }`}
                            style={{
                              textAlign: align,
                              borderRight: showBorders ? `1px solid ${theme.borderColor}` : 'none',
                            }}
                          >
                            {formatCell(cellVal, header)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>

              {/* Summary / Totals Row */}
              {includeTotals && summaryRow && (
                <tfoot>
                  <tr
                    style={{
                      backgroundColor: theme.summaryBg,
                      color: theme.summaryText,
                      borderTop: `2px solid ${theme.borderColor}`,
                      borderBottom: `2px solid ${theme.borderColor}`,
                    }}
                    className="font-bold text-xs"
                  >
                    {summaryRow.map((val, idx) => {
                      const header = activeHeaders[idx];
                      const align =
                        columnAlignments[header] ||
                        (columnTypes[header] === 'number' ? 'right' : 'left');

                      return (
                        <td
                          key={idx}
                          className={`${paddingClass} ${
                            columnTypes[header] === 'number' ? 'font-mono tabular-nums' : ''
                          }`}
                          style={{
                            textAlign: align,
                            borderRight: showBorders ? `1px solid ${theme.borderColor}` : 'none',
                          }}
                        >
                          {val || (idx === 0 ? 'TOTAL' : '')}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Document Footer Section */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400">
            <div>
              Generated via <strong className="text-slate-600">Excel Auto-Formatter</strong> • Official Copy
            </div>
            <div className="mt-1 sm:mt-0 font-medium">
              Page 1 • Confidential Document
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

