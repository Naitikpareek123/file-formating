import React from 'react';
import { INDIA_POST_LOGO_BASE64 } from '../utils/indiapostLogo';

export default function DopRdReportView({ metadata, headers, rows, summaryRow }) {
  return (
    <div className="w-full flex justify-center pb-16">
      {/* Dynamic Print CSS tuned for India Post RD format */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 5mm 6mm 5mm 6mm;
          }
          html, body {
            font-family: Arial, Helvetica, sans-serif !important;
            color: #000 !important;
            background: #fff !important;
            background-color: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          /* Reset all app page wrappers so no gray-blue background or outer shadows print */
          .min-h-screen, main, #root, #root > div, .pb-16 {
            background: #fff !important;
            background-color: #fff !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            box-shadow: none !important;
            border: none !important;
          }
          .dop-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 1.5mm 0 1.5mm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #fff !important;
            box-sizing: border-box !important;
          }
          .overflow-x-auto {
            overflow: visible !important;
          }
          .dop-table {
            border-collapse: collapse !important;
            width: 100% !important;
            min-width: 100% !important;
            table-layout: fixed !important;
            box-sizing: border-box !important;
            border: 1px solid #000 !important;
            border-right: 1.5px solid #000 !important;
          }
          .dop-table th, .dop-table td {
            border: 1px solid #000 !important;
            box-sizing: border-box !important;
          }
          .dop-table th:last-child, .dop-table td:last-child {
            border-right: 1.5px solid #000 !important;
          }
          thead {
            display: table-header-group !important;
          }
          tr {
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Sheet Simulation Container */}
      <div className="dop-container w-full max-w-[840px] bg-white rounded-lg border border-slate-300 shadow-xl p-3 sm:p-8 md:p-10 font-sans text-black">
        {/* Top Header: Logo — left aligned, extended length */}
        <div className="flex items-center justify-start mb-2">
          <div className="shrink-0 max-w-full" style={{ width: '350px' }}>
            <img
              src={INDIA_POST_LOGO_BASE64}
              alt="India Post Logo"
              className="w-full h-auto object-contain block"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center my-2">
          <h2 className="text-xs sm:text-[13px] font-bold text-black uppercase tracking-tight">
            {metadata.reportTitle || 'RECURRING DEPOSIT INSTALLMENT REPORT'}
          </h2>
        </div>

        {/* Search Criteria Section */}
        <div className="text-xs my-3">
          <div className="font-bold text-black mb-1 text-[11px]">Search Criteria</div>
          <div className="text-center space-y-0.5 font-bold text-[11px] text-black">
            <div>Agent Id: {metadata.agentId || 'MI3227040100002'}</div>
            <div>From Date: {metadata.dateRange || '30-Oct-2026 To Date: 30-Oct-2026'}</div>
            <div>List Reference No: {metadata.listRefNo || 'C351538715'}</div>
            <div>Status: {metadata.status || 'Success'}</div>
            <div>Cheque No.: {metadata.chequeNo || ''}</div>
            <div>Type Of Report: {metadata.typeOfReport || 'SR'}</div>
          </div>
        </div>

        {/* Search Results Section */}
        <div className="text-xs my-3">
          <div className="font-bold text-black mb-1 text-[11px]">Search Results</div>
          <div className="text-center space-y-0.5 font-bold text-[11px] text-black">
            <div>Total Amount:</div>
            <div>Total No Of Records:</div>
          </div>
        </div>

        {/* Main 12-Column Table — fixed layout with optimized column widths & mobile swipe */}
        <div className="w-full overflow-x-auto mt-3 sm:mt-4">
          <div className="sm:hidden no-print text-[10px] text-slate-500 font-medium text-right mb-1">
            Scroll table horizontally ↔
          </div>
          <table className="dop-table w-full min-w-[640px] sm:min-w-full border-collapse border border-black text-[9.5px]" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr className="bg-[#b8c5f2] text-black font-bold text-center leading-tight">
                <th className="border border-black px-0.5 py-1 text-center" style={{ width: '3.5%' }}>
                  S.NO<br />.
                </th>
                <th className="border border-black px-1 py-1 text-left" style={{ width: '9%' }}>
                  E-Banking<br />Ref No
                </th>
                <th className="border border-black px-1 py-1 text-left" style={{ width: '10%' }}>
                  RD Account<br />Number
                </th>
                <th className="border border-black px-1.5 py-1 text-left" style={{ width: '17.5%' }}>
                  Account Name
                </th>
                <th className="border border-black px-1 py-1 text-left" style={{ width: '9%' }}>
                  RD<br />Denominatio<br />n
                </th>
                <th className="border border-black px-1 py-1 text-left" style={{ width: '10%' }}>
                  RD Total<br />Deposit<br />Amount
                </th>
                <th className="border border-black px-0.5 py-1 text-center" style={{ width: '5%' }}>
                  No of<br />Install<br />ments
                </th>
                <th className="border border-black px-0.5 py-1 text-center" style={{ width: '5%' }}>
                  Rebate
                </th>
                <th className="border border-black px-0.5 py-1 text-center" style={{ width: '5%' }}>
                  Default<br />fee
                </th>
                <th className="border border-black px-0.5 py-1 text-center" style={{ width: '8.5%' }}>
                  ASLAAS<br />Number
                </th>
                <th className="border border-black px-0.5 py-1 text-center" style={{ width: '5%' }}>
                  Status
                </th>
                <th className="border border-black border-r-2 border-r-black px-1 py-1 text-center" style={{ width: '12.5%' }}>
                  Last Created<br />Date & Time
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="border border-black px-0.5 py-0.5 text-center font-normal">{row[0]}</td>
                  <td className="border border-black px-1 py-0.5 text-left font-normal text-[9px] break-all">{row[1]}</td>
                  <td className="border border-black px-1 py-0.5 text-left font-normal text-[9px] break-all">{row[2]}</td>
                  <td className="border border-black px-1.5 py-0.5 text-left font-normal break-words leading-tight">{row[3]}</td>
                  <td className="border border-black px-1 py-0.5 text-left whitespace-nowrap font-normal text-[9px]">{row[4]}</td>
                  <td className="border border-black px-1 py-0.5 text-left font-normal text-[9px] leading-tight">
                    {typeof row[5] === 'string' && row[5].includes('Cr.') ? (
                      <div>
                        <div>{row[5].replace('Cr.', '').trim()}</div>
                        <div className="text-[8.5px]">Cr.</div>
                      </div>
                    ) : (
                      row[5]
                    )}
                  </td>
                  <td className="border border-black px-0.5 py-0.5 text-center font-normal">{row[6]}</td>
                  <td className="border border-black px-0.5 py-0.5 text-center font-normal">{row[7]}</td>
                  <td className="border border-black px-0.5 py-0.5 text-center font-normal">{row[8]}</td>
                  <td className="border border-black px-0.5 py-0.5 text-center font-normal text-[9px] break-all">{row[9]}</td>
                  <td className="border border-black px-0.5 py-0.5 text-center font-normal text-[9px]">{row[10]}</td>
                  <td className="border border-black border-r-2 border-r-black px-0.5 py-0.5 text-center text-[8.5px] leading-tight font-normal">
                    {typeof row[11] === 'string' && row[11].includes(' ') ? (
                      <div>
                        <div>{row[11].split(' ')[0]}</div>
                        <div>{row[11].split(' ').slice(1).join(' ')}</div>
                      </div>
                    ) : (
                      row[11]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Table — full width, no border, mobile scroll aligned */}
        {summaryRow && (
          <div className="mt-0 overflow-x-auto">
            <table className="w-full min-w-[640px] sm:min-w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#b8c5f2] text-black font-bold">
                  <th className="px-3 py-1.5 text-left w-1/2">
                    E-Banking Ref No
                  </th>
                  <th className="px-3 py-1.5 text-left w-1/2">
                    Total Deposit Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-3 py-1.5 text-left font-normal">
                    {summaryRow.refNo}
                  </td>
                  <td className="px-3 py-1.5 text-left font-normal">
                    {summaryRow.totalDepositAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
