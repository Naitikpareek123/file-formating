/**
 * Checks if raw grid matches India Post / DOP RD Installment Report
 */
export function checkAndParseDopRdReport(rawGrid) {
  const isDop = rawGrid.some((r) =>
    r && r.some((c) => typeof c === 'string' && c.toUpperCase().includes('RECURRING DEPOSIT INSTALLMENT REPORT'))
  );

  if (!isDop) return null;

  const metadata = {
    reportTitle: 'RECURRING DEPOSIT INSTALLMENT REPORT',
    agentId: '',
    dateRange: '',
    listRefNo: '',
    status: '',
    chequeNo: '',
    typeOfReport: 'SR',
  };

  rawGrid.forEach((r) => {
    if (!r) return;
    for (let i = 0; i < r.length; i++) {
      const cell = r[i];
      if (typeof cell === 'string') {
        const text = cell.trim();
        if (text.includes('Agent Id:')) metadata.agentId = r[i + 7] || r[i + 1] || '';
        if (text.includes('From Date:')) metadata.dateRange = r[i + 7] || r[i + 1] || '';
        if (text.includes('List Reference No:')) metadata.listRefNo = r[i + 7] || r[i + 1] || '';
        if (text.includes('Status:') && !metadata.status) metadata.status = r[i + 7] || r[i + 1] || '';
        if (text.includes('Cheque No.:')) metadata.chequeNo = r[i + 7] || r[i + 1] || '';
        if (text.includes('Type Of Report:')) metadata.typeOfReport = r[i + 7] || r[i + 1] || 'SR';
      }
    }
  });

  // Find header row containing 'RD Account Number'
  let headerRowIdx = -1;
  for (let i = 0; i < rawGrid.length; i++) {
    if (rawGrid[i] && rawGrid[i].includes('RD Account Number')) {
      headerRowIdx = i;
      break;
    }
  }

  if (headerRowIdx === -1) return null;

  const rawHeader = rawGrid[headerRowIdx];
  const keepCols = [
    'E-Banking Ref No',
    'RD Account Number',
    'Account Name',
    'RD Denomination',
    'RD Total Deposit Amount',
    'No of Installments',
    'Rebate',
    'Default fee',
    'ASLAAS Number',
    'Status',
    'Last Created Date & Time',
  ];

  const colIndices = [];
  const headers = ['S.NO.'];
  keepCols.forEach((col) => {
    const idx = rawHeader.indexOf(col);
    if (idx !== -1) {
      colIndices.push(idx);
      headers.push(col);
    }
  });

  const rows = [];
  let summaryRow = null;

  for (let i = headerRowIdx + 1; i < rawGrid.length; i++) {
    const row = rawGrid[i];
    if (!row) continue;

    // Check if this is the summary header row ('Total Deposit Amount')
    if (row.some((c) => typeof c === 'string' && c.includes('Total Deposit Amount'))) {
      const nextRow = rawGrid[i + 1] || [];
      const refIdx = row.findIndex((c) => typeof c === 'string' && c.includes('E-Banking Ref No'));
      const amtIdx = row.findIndex((c) => typeof c === 'string' && c.includes('Total Deposit Amount'));
      summaryRow = {
        refNo: nextRow[refIdx] || metadata.listRefNo,
        totalDepositAmount: nextRow[amtIdx] || '',
      };
      break;
    }

    // Check if valid data row
    const acctIdx = rawHeader.indexOf('RD Account Number');
    if (row[acctIdx]) {
      const parsedRow = [rows.length + 1];
      colIndices.forEach((idx) => {
        parsedRow.push(row[idx] || '');
      });
      rows.push(parsedRow);
    }
  }

  // Column types
  const columnTypes = {
    'S.NO.': 'number',
    'E-Banking Ref No': 'text',
    'RD Account Number': 'text',
    'Account Name': 'text',
    'RD Denomination': 'number',
    'RD Total Deposit Amount': 'number',
    'No of Installments': 'number',
    'Rebate': 'number',
    'Default fee': 'number',
    'ASLAAS Number': 'text',
    'Status': 'text',
    'Last Created Date & Time': 'text',
  };

  return {
    isDopRd: true,
    metadata,
    headers,
    rows,
    summaryRow,
    columnTypes,
  };
}

/**
 * Parses an Excel or CSV file into sheets and structured rows/columns
 */
export async function parseExcelFile(file) {
  const XLSX = await import('xlsx');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        const sheets = workbook.SheetNames.map((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const rawGrid = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
            blankrows: false,
          });

          if (!rawGrid || rawGrid.length === 0) {
            return {
              name: sheetName,
              headers: [],
              rows: [],
              columnTypes: {},
              isDopRd: false,
            };
          }

          // Check for specialized India Post RD format
          const dopParsed = checkAndParseDopRdReport(rawGrid);
          if (dopParsed) {
            return {
              name: sheetName,
              headers: dopParsed.headers,
              rows: dopParsed.rows,
              columnTypes: dopParsed.columnTypes,
              isDopRd: true,
              dopMetadata: dopParsed.metadata,
              dopSummary: dopParsed.summaryRow,
            };
          }

          // Generic Excel fallback
          let headerRowIndex = 0;
          for (let i = 0; i < Math.min(rawGrid.length, 5); i++) {
            const row = rawGrid[i];
            const nonBlankCount = row.filter((cell) => cell !== '' && cell !== null && cell !== undefined).length;
            if (nonBlankCount > 0) {
              headerRowIndex = i;
              break;
            }
          }

          const rawHeaders = rawGrid[headerRowIndex] || [];
          const headers = rawHeaders.map((h, idx) => {
            const str = String(h || '').trim();
            return str || `Column ${idx + 1}`;
          });

          const rawRows = rawGrid.slice(headerRowIndex + 1);
          const rows = rawRows.filter((r) => r.some((cell) => cell !== '' && cell !== null && cell !== undefined));

          const columnTypes = {};
          headers.forEach((h, colIdx) => {
            let numericCount = 0;
            let totalFilled = 0;

            rows.forEach((row) => {
              const val = row[colIdx];
              if (val !== '' && val !== null && val !== undefined) {
                totalFilled++;
                if (typeof val === 'number') {
                  numericCount++;
                } else if (typeof val === 'string') {
                  const cleaned = val.replace(/[$,₹€£%]/g, '').trim();
                  if (!isNaN(Number(cleaned)) && cleaned !== '') {
                    numericCount++;
                  }
                }
              }
            });

            columnTypes[h] = totalFilled > 0 && numericCount / totalFilled > 0.7 ? 'number' : 'text';
          });

          return {
            name: sheetName,
            headers,
            rows,
            columnTypes,
            isDopRd: false,
          };
        });

        resolve({
          fileName: file.name,
          sheets,
        });
      } catch (err) {
        console.error('Error parsing Excel file:', err);
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Export data to an Excel file
 */
export async function exportToExcel(filename, sheetName, headers, rows) {
  const XLSX = await import('xlsx');
  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Report');
  XLSX.writeFile(wb, `${filename.replace(/\.[^/.]+$/, '')}_formatted.xlsx`);
}
