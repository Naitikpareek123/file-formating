import React from 'react';
import { FileSpreadsheet, Printer, FileDown, Download, Sparkles, RefreshCw } from 'lucide-react';

export default function Navbar({
  fileName,
  sheetNames = [],
  activeSheet,
  onSheetChange,
  onPrint,
  onExportPdf,
  onExportExcel,
  onReset,
  hasData,
}) {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & App Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-bold text-sm sm:text-lg text-slate-900 tracking-tight truncate">Excel Print Studio</h1>
                <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 uppercase tracking-wider">
                  Pro Formatter
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block truncate">
                Auto-Format Excel to Pristine PDF & Direct Print
              </p>
            </div>
          </div>

          {/* Sheet Selector (if multiple sheets exist) */}
          {sheetNames.length > 1 && (
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 max-w-xs overflow-x-auto">
              {sheetNames.map((sheet) => (
                <button
                  key={sheet}
                  onClick={() => onSheetChange(sheet)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${activeSheet === sheet
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {sheet}
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {hasData && (
              <>
                <button
                  onClick={onReset}
                  className="p-1.5 sm:p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200 hover:border-rose-200"
                  title="Upload New File"
                >
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={onExportExcel}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  Excel
                </button>

                <button
                  onClick={onExportPdf}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all active:scale-95"
                  title="Export PDF"
                >
                  <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="hidden xs:inline">Export </span>PDF
                </button>

                <button
                  onClick={onPrint}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-sm shadow-emerald-600/30 transition-all active:scale-95"
                  title="Print"
                >
                  <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Print<span className="hidden sm:inline"> Direct</span></span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

