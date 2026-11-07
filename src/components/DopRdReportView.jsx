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
            margin: 6mm 10mm 6mm 10mm;
          }
          body {
            font-family: Arial, Helvetica, sans-serif !important;
            color: #000 !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .dop-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .dop-table {
            border-collapse: collapse !important;
            width: 100% !important;
          }
          .dop-table th, .dop-table td {
            border: 1px solid #000 !important;
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
      <div className="dop-container w-full max-w-[840px] bg-white rounded-lg border border-slate-300 shadow-xl p-6 sm:p-8 font-sans text-black">
        {/* Top Header: Logo on Left & Govt of India Text on Right, compact like target */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* India Post Logo - rectangular landscape ratio */}
          <div className="shrink-0" style={{ width: '110px', height: '52px' }}>
            <img
              src={INDIA_POST_LOGO_BASE64}
              alt="India Post Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Vertical divider */}
          <div className="w-px h-12 bg-gray-400 shrink-0"></div>

          <div className="text-left">
            <p className="text-[11px] font-normal text-[#991b1b] leading-tight">Govt. of India</p>
            <p className="text-[11px] font-normal text-[#7f1d1d] leading-tight">Ministry of Communications</p>
            <h1 className="text-[17px] font-bold text-[#991b1b] leading-snug mt-0.5">Department of Posts</h1>
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center my-4">
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

        {/* Main 12-Column Table */}
        <div className="overflow-x-auto mt-4">
          <table className="dop-table w-full border-collapse border border-black text-[10px]">
            <thead>
              <tr className="bg-[#b8c5f2] text-black font-bold text-center">
                <th className="border border-black px-1 py-1.5 w-7 text-center">
                  S.NO<br />.
                </th>
                <th className="border border-black px-1 py-1.5 text-left w-16">
                  E-Banking<br />Ref No
                </th>
                <th className="border border-black px-1 py-1.5 text-left w-20">
                  RD Account<br />Number
                </th>
                <th className="border border-black px-1.5 py-1.5 text-left">
                  Account Name
                </th>
                <th className="border border-black px-1 py-1.5 text-left w-16">
                  RD<br />Denominatio<br />n
                </th>
                <th className="border border-black px-1 py-1.5 text-left w-16">
                  RD Total<br />Deposit<br />Amount
                </th>
                <th className="border border-black px-1 py-1.5 w-11 text-center">
                  No of<br />Install<br />ments
                </th>
                <th className="border border-black px-1 py-1.5 w-10 text-center">
                  Rebate
                </th>
                <th className="border border-black px-1 py-1.5 w-10 text-center">
                  Default<br />fee
                </th>
                <th className="border border-black px-1 py-1.5 w-16 text-center">
                  ASLAAS<br />Number
                </th>
                <th className="border border-black px-1 py-1.5 w-11 text-center">
                  Status
                </th>
                <th className="border border-black px-1 py-1.5 w-20 text-center">
                  Last Created<br />Date & Time
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="border border-black px-1 py-1 text-center font-normal">{row[0]}</td>
                  <td className="border border-black px-1 py-1 text-left font-normal">{row[1]}</td>
                  <td className="border border-black px-1 py-1 text-left font-normal">{row[2]}</td>
                  <td className="border border-black px-1.5 py-1 text-left font-normal">{row[3]}</td>
                  <td className="border border-black px-1 py-1 text-left whitespace-nowrap font-normal">{row[4]}</td>
                  <td className="border border-black px-1 py-1 text-left font-normal">
                    {/* Render amount with Cr. below like in target image */}
                    {typeof row[5] === 'string' && row[5].includes('Cr.') ? (
                      <div>
                        <div>{row[5].replace('Cr.', '').trim()}</div>
                        <div className="text-[9px]">Cr.</div>
                      </div>
                    ) : (
                      row[5]
                    )}
                  </td>
                  <td className="border border-black px-1 py-1 text-center font-normal">{row[6]}</td>
                  <td className="border border-black px-1 py-1 text-center font-normal">{row[7]}</td>
                  <td className="border border-black px-1 py-1 text-center font-normal">{row[8]}</td>
                  <td className="border border-black px-1 py-1 text-center font-normal">{row[9]}</td>
                  <td className="border border-black px-1 py-1 text-center font-normal">{row[10]}</td>
                  <td className="border border-black px-1 py-1 text-center text-[9px] leading-tight font-normal">
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

        {/* Summary Table at Bottom — matches target: blue header row, plain data row no outer border */}
        {summaryRow && (
          <div className="mt-3">
            <table className="border-collapse text-[11px]" style={{ minWidth: '380px' }}>
              <thead>
                <tr className="bg-[#b8c5f2] text-black font-bold">
                  <th className="border border-black px-3 py-1.5 text-left" style={{ width: '190px' }}>
                    E-Banking Ref No
                  </th>
                  <th className="border border-black px-3 py-1.5 text-left" style={{ width: '190px' }}>
                    Total Deposit Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-3 py-1.5 text-left font-normal border-l border-b border-r border-black">
                    {summaryRow.refNo}
                  </td>
                  <td className="px-3 py-1.5 text-left font-normal border-r border-b border-black">
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
