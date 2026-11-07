import React, { useRef, useState } from 'react';
import { UploadCloud, FileSpreadsheet, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FileUpload({ onFileSelect, onSampleSelect, isProcessing, error }) {
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
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Auto-Detection for India Post (DOP) & Any Excel
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Excel File Upload Karein & Instant Format Payein
        </h2>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
          Apni raw Excel file (jaise <strong>RD Installment Report</strong> ya standard Sheet) upload karein. System empty columns delete karega, <strong>S.NO.</strong> add karega, official layout banayega aur 1-click mein <strong>PDF</strong> ya <strong>Direct Print</strong> dega.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-sm">
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
        className={`relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-200 group ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50/50 shadow-sm hover:shadow-md'
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
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Yahan RD Installment Report ya koi bhi Excel file drop karein
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Supports <strong className="text-slate-700">.xls, .xlsx, .csv</strong> files
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Computer Se File Chunein
          </button>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-3xl flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-sm font-semibold text-slate-800">Excel sheet analyze ho rahi hai...</p>
            </div>
          </div>
        )}
      </div>

      {/* Featured: India Post RD Report 1-Click Demo */}
      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white uppercase">
                India Post (DOP)
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Aapki RD Installment Report Ka Demo Data
              </h4>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Check karein ki raw `.xls` file kaise exact official PDF format mein convert hoti hai (Logo + S.NO. + 12 Columns + Summary Total).
            </p>
          </div>
          <button
            onClick={() => onSampleSelect('indiapost_rd')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 transition-all flex items-center justify-center gap-1.5"
          >
            <span>📮</span> RD Report Demo Load Karein
          </button>
        </div>
      </div>

      {/* Other Instant Demo Samples */}
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Standard Business Reports Demo:
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <button
            onClick={() => onSampleSelect('sales')}
            className="flex items-center gap-3 p-3 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all text-xs font-semibold text-slate-800 hover:text-emerald-900"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
              📊
            </span>
            <div>
              <div className="font-bold">Sales & Revenue Report</div>
              <div className="text-[11px] font-normal text-slate-500">Corporate tables with auto sum</div>
            </div>
          </button>

          <button
            onClick={() => onSampleSelect('payroll')}
            className="flex items-center gap-3 p-3 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all text-xs font-semibold text-slate-800 hover:text-emerald-900"
          >
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold">
              💼
            </span>
            <div>
              <div className="font-bold">Staff Payroll Statement</div>
              <div className="text-[11px] font-normal text-slate-500">Salary & allowances breakdown</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
