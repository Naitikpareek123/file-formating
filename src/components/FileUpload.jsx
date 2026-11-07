import React, { useRef, useState } from 'react';
import { UploadCloud, FileSpreadsheet, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FileUpload({ onFileSelect, isProcessing, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const isValidFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    return ['xlsx', 'xls', 'csv'].includes(ext);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-12 px-3 sm:px-6">
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Auto-Detection for India Post (DOP) & Standard Spreadsheets
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload Excel File & Get Instant Formatting
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 max-w-2xl mx-auto">
          Upload your raw Excel file (such as an <strong>RD Installment Report</strong> or standard spreadsheet). The system automatically eliminates empty columns, adds <strong>S.NO.</strong>, formats official layouts, and provides 1-click <strong>PDF Export</strong> or <strong>Direct Print</strong>.
        </p>
      </div>

      {error && (
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 group ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50/50 shadow-xs hover:shadow-md'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Drop your RD Installment Report or any Excel file here
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-5">
            Supports <strong className="text-slate-700">.xls, .xlsx, .csv</strong> files
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Choose File
          </button>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-2xl sm:rounded-3xl flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-800">Analyzing Excel sheet...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
