import React from 'react';
import { THEMES } from '../utils/themes';
import { 
  Palette, 
  RotateCw, 
  Sliders, 
  Type, 
  Columns, 
  Calculator, 
  Check, 
  FileText,
  AlignLeft,
  Grid
} from 'lucide-react';

export default function ControlsToolbar({
  themeId,
  setThemeId,
  orientation,
  setOrientation,
  pageSize,
  setPageSize,
  fontSize,
  setFontSize,
  density,
  setDensity,
  zebraStripes,
  setZebraStripes,
  showBorders,
  setShowBorders,
  includeTotals,
  setIncludeTotals,
  onOpenColumnManager,
  hiddenColumnsCount,
}) {
  return (
    <div className="no-print bg-white border border-slate-200 rounded-2xl p-4 shadow-xs mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Themes Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-emerald-600" />
            Theme:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.values(THEMES).map((th) => {
              const isSelected = themeId === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => setThemeId(th.id)}
                  title={th.name}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? 'border-slate-800 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-black/10"
                    style={{ backgroundColor: th.headerBg }}
                  />
                  <span>{th.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Setup: Orientation & Size */}
        <div className="flex items-center gap-3">
          {/* Orientation Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setOrientation('portrait')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                orientation === 'portrait'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-[10px]">📄</span> Portrait
            </button>
            <button
              onClick={() => setOrientation('landscape')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                orientation === 'landscape'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-[10px]">📃</span> Landscape
            </button>
          </div>

          {/* Page Size */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="px-2.5 py-1 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="a4">A4 Paper</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>
      </div>

      {/* Secondary Controls Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Typography & Density */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Font Size */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">Font:</span>
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setFontSize(8)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  fontSize === 8 ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Compact (8pt)
              </button>
              <button
                onClick={() => setFontSize(9.5)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  fontSize === 9.5 ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Normal (10pt)
              </button>
              <button
                onClick={() => setFontSize(11)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  fontSize === 11 ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Large (11pt)
              </button>
            </div>
          </div>

          {/* Density */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="font-medium">Padding:</span>
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => setDensity('compact')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  density === 'compact' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Tight
              </button>
              <button
                onClick={() => setDensity('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  density === 'normal' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setDensity('relaxed')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  density === 'relaxed' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                }`}
              >
                Spacious
              </button>
            </div>
          </div>
        </div>

        {/* Toggles & Columns Manager */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Zebra Stripes */}
          <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={zebraStripes}
              onChange={(e) => setZebraStripes(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="font-medium">Zebra Rows</span>
          </label>

          {/* Borders */}
          <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showBorders}
              onChange={(e) => setShowBorders(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="font-medium">Grid Borders</span>
          </label>

          {/* Auto Totals */}
          <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeTotals}
              onChange={(e) => setIncludeTotals(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="font-medium flex items-center gap-1">
              <Calculator className="w-3 h-3 text-emerald-600" />
              Auto Totals Row
            </span>
          </label>

          {/* Columns Modal Trigger */}
          <button
            onClick={onOpenColumnManager}
            className="flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-lg font-medium border border-slate-200 transition-colors"
          >
            <Columns className="w-3.5 h-3.5 text-slate-500" />
            <span>Columns</span>
            {hiddenColumnsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {hiddenColumnsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

