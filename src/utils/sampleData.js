export const sampleReports = {
  indiapost_rd: {
    sheetName: "RDInstallmentReport",
    isDopRd: true,
    metadata: {
      reportTitle: "RECURRING DEPOSIT INSTALLMENT REPORT",
      agentId: "MI3227040100002",
      dateRange: "30-Oct-2026 To Date: 30-Oct-2026",
      listRefNo: "C351538715",
      status: "Success",
      chequeNo: "",
      typeOfReport: "SR",
    },
    headers: [
      "S.NO.",
      "E-Banking Ref No",
      "RD Account Number",
      "Account Name",
      "RD Denomination",
      "RD Total Deposit Amount",
      "No of Installments",
      "Rebate",
      "Default fee",
      "ASLAAS Number",
      "Status",
      "Last Created Date & Time"
    ],
    rows: [
      [1, "C351538715", "020061404190", "VIMAL KUMAR JAIN", "2,000.00 Cr.", "2,000.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [2, "C351538715", "020063769338", "KISHAN  KUMHAR", "3,000.00 Cr.", "3,000.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [3, "C351538715", "020066354202", "NORATI DEVI", "700.00 Cr.", "700.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [4, "C351538715", "020105952961", "PRAHALAD MAL PARASHAR", "1,000.00 Cr.", "1,000.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [5, "C351538715", "020113957972", "DURGESH  REGAR", "1,000.00 Cr.", "1,000.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [6, "C351538715", "020116662980", "IMTIYAJ KHAN", "3,000.00 Cr.", "3,000.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [7, "C351538715", "020123634620", "KIRTI DANGAYACH", "3,000.00 Cr.", "3,000.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [8, "C351538715", "020130175731", "ANJUM BANO", "1,500.00 Cr.", "1,500.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"],
      [9, "C351538715", "020144984711", "PRASANNA DEVI", "4,500.00 Cr.", "4,500.00 Cr.", "1", "0.00", "0.00", "CARDAPPLY", "Success", "30-Oct-2026 09:40:09 PM"]
    ],
    summaryRow: {
      refNo: "C351538715",
      totalDepositAmount: "19,700.00"
    },
    columnTypes: {
      "S.NO.": "number",
      "E-Banking Ref No": "text",
      "RD Account Number": "text",
      "Account Name": "text",
      "RD Denomination": "number",
      "RD Total Deposit Amount": "number",
      "No of Installments": "number",
      "Rebate": "number",
      "Default fee": "number",
      "ASLAAS Number": "text",
      "Status": "text",
      "Last Created Date & Time": "text"
    }
  },
  sales: {
    sheetName: "Sales_Report_Q4",
    isDopRd: false,
    title: "Q4 Global Sales & Revenue Performance",
    company: "Apex Global Enterprises Ltd.",
    subtitle: "Consolidated Regional Sales & Commission Breakdown",
    data: [
      { "Order ID": "ORD-7821", "Client Name": "TechCorp Solutions", "Region": "North America", "Units Sold": 145, "Unit Price ($)": 120.00, "Total Revenue ($)": 17400.00, "Discount (%)": 5, "Net Amount ($)": 16530.00, "Status": "Delivered" },
      { "Order ID": "ORD-7822", "Client Name": "Nexus Dynamics", "Region": "Europe", "Units Sold": 82, "Unit Price ($)": 250.00, "Total Revenue ($)": 20500.00, "Discount (%)": 10, "Net Amount ($)": 18450.00, "Status": "Delivered" },
      { "Order ID": "ORD-7823", "Client Name": "Pacific Meridian", "Region": "Asia-Pacific", "Units Sold": 310, "Unit Price ($)": 85.50, "Total Revenue ($)": 26505.00, "Discount (%)": 8, "Net Amount ($)": 24384.60, "Status": "Delivered" },
      { "Order ID": "ORD-7824", "Client Name": "Vanguard Logistics", "Region": "Middle East", "Units Sold": 64, "Unit Price ($)": 450.00, "Total Revenue ($)": 28800.00, "Discount (%)": 12, "Net Amount ($)": 25344.00, "Status": "Pending" },
      { "Order ID": "ORD-7825", "Client Name": "Quantum Media", "Region": "North America", "Units Sold": 190, "Unit Price ($)": 95.00, "Total Revenue ($)": 18050.00, "Discount (%)": 5, "Net Amount ($)": 17147.50, "Status": "Delivered" },
      { "Order ID": "ORD-7826", "Client Name": "Starlight Industries", "Region": "Latin America", "Units Sold": 115, "Unit Price ($)": 160.00, "Total Revenue ($)": 18400.00, "Discount (%)": 7, "Net Amount ($)": 17112.00, "Status": "Delivered" }
    ]
  },
  payroll: {
    sheetName: "Payroll_Summary",
    isDopRd: false,
    title: "Monthly Staff Payroll & Compensation Statement",
    company: "Starlight Digital Corp",
    subtitle: "Department-wise Basic Salary, Allowances & Net Payout",
    data: [
      { "Emp Code": "EMP-101", "Full Name": "Aarav Sharma", "Department": "Engineering", "Designation": "Senior Architect", "Basic ($)": 5800, "HRA ($)": 1800, "Bonus ($)": 600, "Deductions ($)": 450, "Net Salary ($)": 7750 },
      { "Emp Code": "EMP-102", "Full Name": "Priya Verma", "Department": "Product Design", "Designation": "Lead UX Designer", "Basic ($)": 4900, "HRA ($)": 1500, "Bonus ($)": 400, "Deductions ($)": 380, "Net Salary ($)": 6420 },
      { "Emp Code": "EMP-103", "Full Name": "Rohan Patel", "Department": "Marketing", "Designation": "Growth Manager", "Basic ($)": 4200, "HRA ($)": 1300, "Bonus ($)": 750, "Deductions ($)": 320, "Net Salary ($)": 5930 },
      { "Emp Code": "EMP-104", "Full Name": "Sneha Kulkarni", "Department": "Human Resources", "Designation": "HR Director", "Basic ($)": 5100, "HRA ($)": 1600, "Bonus ($)": 500, "Deductions ($)": 400, "Net Salary ($)": 6800 }
    ]
  }
};
