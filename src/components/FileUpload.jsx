import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Printer,
  Layers,
  ChevronDown,
  HelpCircle,
  Zap,
} from 'lucide-react';

export default function FileUpload({ onFileSelect, isProcessing, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
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

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How to print India Post (DOP) RD installment report on A4 without cutting columns?',
      a: 'Simply upload your raw Excel file downloaded from the India Post portal. Excel Print Studio automatically identifies RD reports, strips blank unwanted columns, calculates optimal column proportions, injects sequential S.NO., and provides direct print without missing right-side borders.'
    },
    {
      q: 'Is my financial and account data safe & confidential?',
      a: 'Yes, 100%. Excel Print Studio is a pure client-side web application. All parsing, formatting, and PDF rendering happens locally inside your browser using JavaScript. No files or banking data are ever transmitted to or stored on any server.'
    },
    {
      q: 'Can I export the report directly as an official PDF?',
      a: 'Yes. Click on the "Export PDF" button in the top navigation bar to download an official A4 portrait PDF formatted with the India Post emblem header, agent details, and complete account schedule.'
    },
    {
      q: 'What spreadsheet formats are supported?',
      a: 'Excel Print Studio supports .xlsx, .xls, and .csv files from Microsoft Excel, Google Sheets, LibreOffice Calc, and Department of Posts (DOP) banking portals.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-3 sm:px-6">
      {/* Header section with SEO keywords */}
      <header className="text-center mb-6 sm:mb-9">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-semibold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Auto-Detection for India Post (DOP) & Standard Spreadsheets
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload Excel File & Get Instant Formatting
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload your raw Excel file (such as an <strong>India Post RD Installment Report</strong> or standard spreadsheet). The system automatically eliminates empty columns, adds <strong>S.NO.</strong>, formats official layouts, and provides 1-click <strong>PDF Export</strong> or <strong>Direct Print</strong>.
        </p>
      </header>

      {error && (
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs sm:text-sm shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Upload Card */}
      <section aria-label="Excel File Upload Area">
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
            aria-label="Upload Excel File"
          />

          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              Drop your RD Installment Report or any Excel file here
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Supports <strong className="text-slate-700">.xls, .xlsx, .csv</strong> files (100% in-browser processing)
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
      </section>

      {/* SEO Feature Highlights */}
      <section aria-label="Key Features" className="mt-10 sm:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Auto-Detects India Post (DOP)</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Recognizes Recurring Deposit schedule formats, strips excess columns, and formats the official logo header.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pixel-Perfect A4 Print & PDF</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Prevents cut off columns and missing borders with guaranteed 100% width alignment on standard A4 paper.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">100% Local Browser Privacy</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Zero data is uploaded or stored. Everything runs securely in your local browser using client-side JavaScript.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section aria-label="Frequently Asked Questions" className="mt-10 sm:mt-12">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-3 sm:py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
                >
                  <span className="pr-3">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
