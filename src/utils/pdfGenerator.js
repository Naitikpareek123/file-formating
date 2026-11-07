import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { THEMES } from './themes';
import { INDIA_POST_LOGO_BASE64 } from './indiapostLogo';

/**
 * Specialized PDF generator for India Post (DOP) RD Installment Report
 */
export function generateDopRdPdf({
  metadata,
  headers,
  rows,
  summaryRow,
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;

  // 1. Logo only — left aligned, crisp High-DPI PNG
  const logoW = 65;
  const logoH = 22.5;
  const logoX = margin;
  const logoY = 6;

  try {
    doc.addImage(INDIA_POST_LOGO_BASE64, 'PNG', logoX, logoY, logoW, logoH);
  } catch (e) {
    console.warn('Could not add logo to PDF:', e);
  }

  // 2. Document Title — directly under logo with official spacing
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(0, 0, 0);
  doc.text(metadata.reportTitle || 'RECURRING DEPOSIT INSTALLMENT REPORT', pageWidth / 2, 33, { align: 'center' });

  // 3. Search Criteria Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Search Criteria', margin, 39);

  let curY = 43;
  const lineSpacing = 3.6;

  const criteriaList = [
    `Agent Id: ${metadata.agentId || 'MI3227040100002'}`,
    `From Date: ${metadata.dateRange || '30-Oct-2026 To Date: 30-Oct-2026'}`,
    `List Reference No: ${metadata.listRefNo || 'C351538715'}`,
    `Status: ${metadata.status || 'Success'}`,
    `Cheque No.: ${metadata.chequeNo || ''}`,
    `Type Of Report: ${metadata.typeOfReport || 'SR'}`,
  ];

  criteriaList.forEach((line) => {
    doc.text(line, pageWidth / 2, curY, { align: 'center' });
    curY += lineSpacing;
  });

  // 4. Search Results Section
  curY += 1;
  doc.text('Search Results', margin, curY);

  curY += 4;
  doc.text('Total Amount:', pageWidth / 2, curY, { align: 'center' });
  curY += lineSpacing;
  doc.text('Total No Of Records:', pageWidth / 2, curY, { align: 'center' });

  curY += 3;

  // 5. Main Data Table
  const tableHeaders = [
    'S.NO\n.',
    'E-Banking\nRef No',
    'RD Account\nNumber',
    'Account Name',
    'RD\nDenominatio\nn',
    'RD Total\nDeposit\nAmount',
    'No of\nInstall\nments',
    'Rebate',
    'Default\nfee',
    'ASLAAS\nNumber',
    'Status',
    'Last Created\nDate & Time'
  ];

  const tableData = rows.map((r) => r.map((c) => (c !== null && c !== undefined ? String(c) : '')));

  autoTable(doc, {
    startY: curY,
    margin: { left: margin, right: margin },
    head: [tableHeaders],
    body: tableData,
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: 6,
      cellPadding: 1.1,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.15,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [184, 197, 242], // Exact pastel periwinkle #b8c5f2
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 6,
      halign: 'left',
      lineWidth: 0.15,
      lineColor: [0, 0, 0],
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 8 }, // S.NO
      1: { halign: 'left', cellWidth: 16 }, // E-Banking Ref No
      2: { halign: 'left', cellWidth: 18 }, // RD Account Number
      3: { halign: 'left', cellWidth: 26 }, // Account Name
      4: { halign: 'left', cellWidth: 17 }, // RD Denomination
      5: { halign: 'left', cellWidth: 17 }, // RD Total Deposit Amount
      6: { halign: 'center', cellWidth: 11 }, // No of Installments
      7: { halign: 'center', cellWidth: 10 }, // Rebate
      8: { halign: 'center', cellWidth: 11 }, // Default fee
      9: { halign: 'center', cellWidth: 18 }, // ASLAAS Number
      10: { halign: 'center', cellWidth: 12 }, // Status
      11: { halign: 'center', cellWidth: 26 }, // Last Created Date & Time
    },
  });

  // 6. Bottom Summary Table — full width, no border, blue header
  if (summaryRow) {
    const finalY = doc.lastAutoTable.finalY;
    const tableW = pageWidth - margin * 2; // full usable width
    const col0W = tableW / 2;
    const col1W = tableW / 2;

    // Header row — blue fill, no border
    doc.setFillColor(184, 197, 242); // #b8c5f2
    doc.rect(margin, finalY, tableW, 7, 'F');
    // Header text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 0, 0);
    doc.text('E-Banking Ref No', margin + 2, finalY + 4.5);
    doc.text('Total Deposit Amount', margin + col0W + 2, finalY + 4.5);

    // Data row — white fill, no border
    const dataY = finalY + 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 0, 0);
    doc.text(String(summaryRow.refNo || ''), margin + 2, dataY + 4.5);
    doc.text(String(summaryRow.totalDepositAmount || ''), margin + col0W + 2, dataY + 4.5);
  }

  // Save the PDF
  const safeFilename = `RDInstallmentReport_${metadata.listRefNo || 'export'}.pdf`;
  doc.save(safeFilename);
}

/**
 * Standard PDF generator for generic Excel sheets
 */
export function generateGenericPdf({
  title = 'Document Report',
  company = '',
  subtitle = '',
  dateStr = new Date().toLocaleDateString('en-GB'),
  headers = [],
  rows = [],
  visibleColumns = [],
  columnAlignments = {},
  themeId = 'corporate',
  orientation = 'portrait',
  pageSize = 'a4',
  fontSize = 9,
  includeTotals = true,
  summaryRow = null,
}) {
  const theme = THEMES[themeId] || THEMES.corporate;
  const doc = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: pageSize,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  let currentY = margin;

  if (company) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(theme.pdfHeaderColor[0], theme.pdfHeaderColor[1], theme.pdfHeaderColor[2]);
    doc.text(company.toUpperCase(), margin, currentY);
    currentY += 6;
  }

  if (title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59);
    doc.text(title, margin, currentY);
    currentY += 6;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);

  if (subtitle) {
    doc.text(subtitle, margin, currentY);
  }

  if (dateStr) {
    const dateText = `Generated: ${dateStr}`;
    const dateWidth = doc.getTextWidth(dateText);
    doc.text(dateText, pageWidth - margin - dateWidth, currentY);
  }

  currentY += 5;

  doc.setDrawColor(theme.pdfBorderColor[0], theme.pdfBorderColor[1], theme.pdfBorderColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 4;

  const filteredIndices = headers
    .map((h, i) => (visibleColumns.includes(h) ? i : -1))
    .filter((i) => i !== -1);

  const tableHeaders = filteredIndices.map((i) => headers[i]);
  const tableRows = rows.map((row) =>
    filteredIndices.map((colIdx) => {
      const val = row[colIdx];
      return val !== null && val !== undefined ? String(val) : '';
    })
  );

  const columnStyles = {};
  tableHeaders.forEach((header, idx) => {
    const align = columnAlignments[header] || 'left';
    columnStyles[idx] = { halign: align };
  });

  const tableOptions = {
    startY: currentY,
    margin: { top: margin, right: margin, bottom: 18, left: margin },
    head: [tableHeaders],
    body: tableRows,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: fontSize,
      cellPadding: fontSize <= 8 ? 2 : 2.8,
      lineColor: theme.pdfBorderColor,
      lineWidth: 0.2,
      textColor: [30, 41, 59],
    },
    headStyles: {
      fillColor: theme.pdfHeaderColor,
      textColor: theme.pdfHeaderText || [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
      fontSize: fontSize + 0.5,
    },
    alternateRowStyles: {
      fillColor: theme.pdfZebraColor,
    },
    didDrawPage: (data) => {
      const currentPage = data.pageNumber;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);

      const footerText = `Page ${currentPage}`;
      doc.text(footerText, pageWidth - margin - doc.getTextWidth(footerText), pageHeight - 8);

      const footerLeft = `${company || title || 'Excel Auto-Formatter'} | Confidential`;
      doc.text(footerLeft, margin, pageHeight - 8);
    },
  };

  if (includeTotals && summaryRow) {
    const footRow = filteredIndices.map((colIdx) => summaryRow[colIdx] || '');
    tableOptions.foot = [footRow];
    tableOptions.footStyles = {
      fillColor: theme.pdfSummaryColor,
      textColor: theme.pdfSummaryText,
      fontStyle: 'bold',
      lineColor: theme.pdfBorderColor,
      lineWidth: 0.3,
    };
  }

  autoTable(doc, tableOptions);

  const safeTitle = (title || 'report').replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
  doc.save(`${safeTitle}.pdf`);
}
