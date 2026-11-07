import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import ControlsToolbar from './components/ControlsToolbar';
import DocumentHeaderEditor from './components/DocumentHeaderEditor';
import ColumnManagerModal from './components/ColumnManagerModal';
import PrintableTableView from './components/PrintableTableView';
import DopRdReportView from './components/DopRdReportView';
import { parseExcelFile, exportToExcel } from './utils/excelParser';
import { generateGenericPdf, generateDopRdPdf } from './utils/pdfGenerator';
import { sampleReports } from './utils/sampleData';
import { CheckCircle2, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

export default function App() {
  const [workbookData, setWorkbookData] = useState(null);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // View mode toggle for DOP reports: 'dop_official' vs 'customizable'
  const [viewMode, setViewMode] = useState('dop_official');

  // Generic Document Headers & Metadata
  const [company, setCompany] = useState('Apex Global Enterprises Ltd.');
  const [title, setTitle] = useState('Quarterly Performance & Financial Statement');
  const [subtitle, setSubtitle] = useState('Consolidated Operations & Department Summary');
  const [dateStr, setDateStr] = useState(
    new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  );
  const [showDate, setShowDate] = useState(true);

  // Styling & Print Options
  const [themeId, setThemeId] = useState('corporate');
  const [orientation, setOrientation] = useState('portrait');
  const [pageSize, setPageSize] = useState('a4');
  const [fontSize, setFontSize] = useState(9.5);
  const [density, setDensity] = useState('normal');
  const [zebraStripes, setZebraStripes] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  const [includeTotals, setIncludeTotals] = useState(true);

  // Columns & Alignment State
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [columnAlignments, setColumnAlignments] = useState({});
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  // Current Active Sheet
  const activeSheet = useMemo(() => {
    if (!workbookData || !workbookData.sheets || workbookData.sheets.length === 0) return null;
    return workbookData.sheets[activeSheetIndex] || workbookData.sheets[0];
  }, [workbookData, activeSheetIndex]);

  // When active sheet changes or workbook changes, setup state and document title for print
  useEffect(() => {
    if (workbookData?.fileName) {
      const cleanName = workbookData.fileName.replace(/\.[^/.]+$/, '');
      document.title = cleanName;
    }
  }, [workbookData]);

  // When active sheet changes, setup state
  useEffect(() => {
    if (activeSheet && activeSheet.headers) {
      setVisibleColumns(activeSheet.headers);

      if (activeSheet.isDopRd) {
        setThemeId('indiapost');
        setOrientation('portrait');
        setFontSize(7.5);
        setZebraStripes(false);
        setShowBorders(true);
        setViewMode('dop_official');
      } else {
        const initialAlignments = {};
        activeSheet.headers.forEach((h) => {
          initialAlignments[h] = activeSheet.columnTypes[h] === 'number' ? 'right' : 'left';
        });
        setColumnAlignments(initialAlignments);

        if (activeSheet.headers.length > 7) {
          setOrientation('landscape');
        } else {
          setOrientation('portrait');
        }
      }
    }
  }, [activeSheet]);

  // Handle user uploaded file
  const handleFileSelect = async (file) => {
    setIsProcessing(true);
    setError(null);
    try {
      const parsed = await parseExcelFile(file);
      if (parsed.sheets.length === 0 || parsed.sheets[0].headers.length === 0) {
        throw new Error('No valid tabular data found in the selected Excel file.');
      }
      setWorkbookData(parsed);
      setActiveSheetIndex(0);

      const firstSheet = parsed.sheets[0];
      if (firstSheet.isDopRd) {
        setTitle(firstSheet.dopMetadata?.reportTitle || 'RECURRING DEPOSIT INSTALLMENT REPORT');
        setCompany('Govt. of India - Department of Posts');
        setSubtitle(`Agent ID: ${firstSheet.dopMetadata?.agentId || ''}`);
      } else {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    } catch (err) {
      console.error(err);
      setError('Error processing Excel file. Please ensure the file is in valid .xlsx, .xls, or .csv format.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle sample file select
  const handleSampleSelect = (sampleKey) => {
    const sample = sampleReports[sampleKey];
    if (!sample) return;

    if (sample.isDopRd) {
      setWorkbookData({
        fileName: 'RDInstallmentReport_Sample.xls',
        sheets: [
          {
            name: sample.sheetName,
            headers: sample.headers,
            rows: sample.rows,
            columnTypes: sample.columnTypes,
            isDopRd: true,
            dopMetadata: sample.metadata,
            dopSummary: sample.summaryRow,
          },
        ],
      });
      setActiveSheetIndex(0);
      setThemeId('indiapost');
      setOrientation('portrait');
      setFontSize(7.5);
      setViewMode('dop_official');
      setTitle(sample.metadata.reportTitle);
      setCompany('Govt. of India - Department of Posts');
      return;
    }

    const headers = Object.keys(sample.data[0]);
    const rows = sample.data.map((item) => headers.map((h) => item[h]));
    const columnTypes = {};
    headers.forEach((h, colIdx) => {
      let isNumeric = true;
      rows.forEach((row) => {
        const val = row[colIdx];
        if (typeof val !== 'number') {
          const cleaned = String(val).replace(/[$,₹€£%]/g, '').trim();
          if (isNaN(Number(cleaned)) || cleaned === '') isNumeric = false;
        }
      });
      columnTypes[h] = isNumeric ? 'number' : 'text';
    });

    setWorkbookData({
      fileName: `${sample.sheetName}.xlsx`,
      sheets: [
        {
          name: sample.sheetName,
          headers,
          rows,
          columnTypes,
          isDopRd: false,
        },
      ],
    });
    setActiveSheetIndex(0);
    setCompany(sample.company);
    setTitle(sample.title);
    setSubtitle(sample.subtitle);
    setThemeId('corporate');
  };

  // Direct Print
  const handlePrint = () => {
    if (workbookData?.fileName) {
      document.title = workbookData.fileName.replace(/\.[^/.]+$/, '');
    }
    window.print();
  };

  // PDF Export
  const handleExportPdf = () => {
    if (!activeSheet) return;

    // Check if India Post RD report
    if (activeSheet.isDopRd && viewMode === 'dop_official') {
      generateDopRdPdf({
        fileName: workbookData?.fileName,
        metadata: activeSheet.dopMetadata || {
          reportTitle: 'RECURRING DEPOSIT INSTALLMENT REPORT',
          agentId: '',
          dateRange: '',
          listRefNo: '',
          status: 'Success',
          chequeNo: '',
          typeOfReport: 'SR',
        },
        headers: activeSheet.headers,
        rows: activeSheet.rows,
        summaryRow: activeSheet.dopSummary,
      });
      return;
    }

    // Generic PDF export
    const activeHeaders = activeSheet.headers.filter((h) => visibleColumns.includes(h));
    const activeColumnIndices = activeHeaders.map((h) => activeSheet.headers.indexOf(h));

    let summaryRow = null;
    if (includeTotals && activeSheet.rows.length > 0) {
      summaryRow = activeHeaders.map((header, colIdx) => {
        const actualColIdx = activeColumnIndices[colIdx];
        if (colIdx === 0) return `TOTAL (${activeSheet.rows.length} Rows)`;
        if (activeSheet.columnTypes[header] !== 'number') return '';

        let sum = 0;
        activeSheet.rows.forEach((row) => {
          const cell = row[actualColIdx];
          if (cell !== null && cell !== undefined && cell !== '') {
            const num = typeof cell === 'number' ? cell : Number(String(cell).replace(/[$,₹€£%]/g, ''));
            if (!isNaN(num)) sum += num;
          }
        });
        return Number.isInteger(sum)
          ? sum.toLocaleString()
          : sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      });
    }

    generateGenericPdf({
      fileName: workbookData?.fileName,
      title,
      company,
      subtitle,
      dateStr: showDate ? dateStr : '',
      headers: activeSheet.headers,
      rows: activeSheet.rows,
      visibleColumns,
      columnAlignments,
      themeId,
      orientation,
      pageSize,
      fontSize: fontSize - 1,
      includeTotals,
      summaryRow,
    });
  };

  // Excel Export
  const handleExportExcel = () => {
    if (!activeSheet) return;
    const filteredIndices = activeSheet.headers
      .map((h, i) => (visibleColumns.includes(h) ? i : -1))
      .filter((i) => i !== -1);

    const exportHeaders = filteredIndices.map((i) => activeSheet.headers[i]);
    const exportRows = activeSheet.rows.map((r) => filteredIndices.map((i) => r[i]));

    exportToExcel(
      workbookData?.fileName || 'Formatted_Report.xlsx',
      activeSheet.name,
      exportHeaders,
      exportRows
    );
  };

  // Reset File
  const handleReset = () => {
    setWorkbookData(null);
    setActiveSheetIndex(0);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        fileName={workbookData?.fileName}
        sheetNames={workbookData?.sheets.map((s) => s.name) || []}
        activeSheet={activeSheet?.name}
        onSheetChange={(sheetName) => {
          const idx = workbookData.sheets.findIndex((s) => s.name === sheetName);
          if (idx !== -1) setActiveSheetIndex(idx);
        }}
        onPrint={handlePrint}
        onExportPdf={handleExportPdf}
        onExportExcel={handleExportExcel}
        onReset={handleReset}
        hasData={!!activeSheet}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-6">
        {!activeSheet ? (
          <FileUpload
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
            error={error}
          />
        ) : (
          <div>
            {/* If India Post DOP RD Report is detected, show informative pill banner */}
            {activeSheet.isDopRd && (
              <div className="no-print mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    📮
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      India Post (DOP) RD Installment Report Detected!
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      Empty columns removed, <strong>S.NO.</strong> added, and formatted to match the official Department of Posts PDF layout.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setViewMode(viewMode === 'dop_official' ? 'customizable' : 'dop_official')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-900 transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    {viewMode === 'dop_official' ? (
                      <>
                        <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Custom Tools</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Official Format</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Custom controls toolbar if generic sheet OR user switched to customizable view */}
            {(!activeSheet.isDopRd || viewMode === 'customizable') && (
              <>
                <ControlsToolbar
                  themeId={themeId}
                  setThemeId={setThemeId}
                  orientation={orientation}
                  setOrientation={setOrientation}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  density={density}
                  setDensity={setDensity}
                  zebraStripes={zebraStripes}
                  setZebraStripes={setZebraStripes}
                  showBorders={showBorders}
                  setShowBorders={setShowBorders}
                  includeTotals={includeTotals}
                  setIncludeTotals={setIncludeTotals}
                  onOpenColumnManager={() => setIsColumnModalOpen(true)}
                  hiddenColumnsCount={activeSheet.headers.length - visibleColumns.length}
                />

                <DocumentHeaderEditor
                  company={company}
                  setCompany={setCompany}
                  title={title}
                  setTitle={setTitle}
                  subtitle={subtitle}
                  setSubtitle={setSubtitle}
                  dateStr={dateStr}
                  setDateStr={setDateStr}
                  showDate={showDate}
                  setShowDate={setShowDate}
                />
              </>
            )}

            {/* RENDER THE VIEW: Either Official India Post Layout or Generic Table */}
            {activeSheet.isDopRd && viewMode === 'dop_official' ? (
              <DopRdReportView
                metadata={activeSheet.dopMetadata || {}}
                headers={activeSheet.headers}
                rows={activeSheet.rows}
                summaryRow={activeSheet.dopSummary}
              />
            ) : (
              <PrintableTableView
                title={title}
                company={company}
                subtitle={subtitle}
                dateStr={dateStr}
                showDate={showDate}
                headers={activeSheet.headers}
                rows={activeSheet.rows}
                visibleColumns={visibleColumns}
                columnAlignments={columnAlignments}
                columnTypes={activeSheet.columnTypes}
                themeId={themeId}
                orientation={orientation}
                pageSize={pageSize}
                fontSize={fontSize}
                density={density}
                zebraStripes={zebraStripes}
                showBorders={showBorders}
                includeTotals={includeTotals}
              />
            )}

            {/* Column Manager Modal */}
            <ColumnManagerModal
              isOpen={isColumnModalOpen}
              onClose={() => setIsColumnModalOpen(false)}
              headers={activeSheet.headers}
              visibleColumns={visibleColumns}
              onToggleColumn={(header) => {
                if (visibleColumns.includes(header)) {
                  if (visibleColumns.length === 1) return;
                  setVisibleColumns(visibleColumns.filter((h) => h !== header));
                } else {
                  setVisibleColumns([...visibleColumns, header]);
                }
              }}
              onSelectAll={() => setVisibleColumns(activeSheet.headers)}
              onDeselectAll={() => setVisibleColumns([activeSheet.headers[0]])}
              columnAlignments={columnAlignments}
              onChangeAlignment={(header, align) =>
                setColumnAlignments((prev) => ({ ...prev, [header]: align }))
              }
              columnTypes={activeSheet.columnTypes}
            />
          </div>
        )}
      </main>
    </div>
  );
}
