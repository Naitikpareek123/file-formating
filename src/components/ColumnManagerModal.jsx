import React from 'react';
import { X, Check, Eye, EyeOff, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function ColumnManagerModal({
  isOpen,
  onClose,
  headers = [],
  visibleColumns = [],
  onToggleColumn,
  onSelectAll,
  onDeselectAll,
  columnAlignments = {},
  onChangeAlignment,
  columnTypes = {},
}) {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Manage Columns</h3>
            <p className="text-xs text-slate-500">
              Columns ko show/hide karein aur text alignment set karein
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">
            {visibleColumns.length} of {headers.length} Columns Visible
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectAll}
              className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
            >
              Show All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onDeselectAll}
              className="text-slate-600 hover:text-slate-800 font-medium hover:underline"
            >
              Hide All
            </button>
          </div>
        </div>

        {/* Column List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2.5">
          {headers.map((header) => {
            const isVisible = visibleColumns.includes(header);
            const currentAlign = columnAlignments[header] || (columnTypes[header] === 'number' ? 'right' : 'left');

            return (
              <div
                key={header}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isVisible
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-slate-100 bg-slate-50 opacity-60'
                }`}
              >
                {/* Column Toggle */}
                <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => onToggleColumn(header)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{header}</div>
                    <div className="text-[10px] text-slate-400 capitalize">
                      Type: {columnTypes[header] || 'text'}
                    </div>
                  </div>
                </label>

                {/* Alignment Buttons */}
                {isVisible && (
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0 ml-3">
                    <button
                      onClick={() => onChangeAlignment(header, 'left')}
                      className={`p-1 rounded ${
                        currentAlign === 'left' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="Align Left"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onChangeAlignment(header, 'center')}
                      className={`p-1 rounded ${
                        currentAlign === 'center' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="Align Center"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onChangeAlignment(header, 'right')}
                      className={`p-1 rounded ${
                        currentAlign === 'right' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="Align Right"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

