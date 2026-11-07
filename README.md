# Excel Auto-Formatter, PDF & Direct Print Studio 📊🖨️

A complete web-based system where you can upload Excel or CSV files, have them automatically formatted into professional, publication-ready tables, export them to crisp vector PDFs, or print them directly with 1-click.

---

## 🚀 Key Features

1. **Excel & CSV Upload**:
   - Drag and drop or browse `.xlsx`, `.xls`, `.csv` files.
   - Multi-sheet support (switch effortlessly between sheets with sheet tabs).
   - Built-in instant sample data loader (Sales, Payroll, Inventory) to test instantly.

2. **Smart Automatic Formatting**:
   - Auto-aligns numbers to the right (using tabular monospace numerals) and text to the left/center.
   - Currency and percentage recognition with formatted commas (e.g. `17,400.00`).
   - Highlighted and capitalized table headers.
   - Status indicators / badges (e.g. Delivered, Pending, In Stock).
   - Zebra striping (alternating row backgrounds) for easy readability.
   - Auto-calculated Summary / Totals row at the bottom for numeric columns.

3. **Styling & Page Layout**:
   - **Themes**: Corporate Navy, Emerald Finance, Modern Charcoal, Royal Burgundy, Ocean Teal, Ink Minimalist.
   - **Page Sizes**: A4, Letter, Legal.
   - **Orientations**: Portrait & Landscape (auto-detects wide tables and suggests landscape).
   - **Font Sizes**: Compact (8pt), Normal (9.5pt), Large (11pt).
   - **Padding Densities**: Tight, Standard, Spacious.

4. **Document Header & Metadata Customizer**:
   - Editable Company / Organization Name.
   - Report Title & Subtitle.
   - Automated Date Stamp with toggle.

5. **Column Management**:
   - Show or hide any column (e.g. exclude internal IDs or sensitive data before printing).
   - Custom column text alignment (Left, Center, Right).

6. **Export & Print**:
   - **Direct Print**: Formats the document using `@media print` CSS rules, repeating headers on every page (`thead { display: table-header-group; }`), no cut rows across pages.
   - **Vector PDF Download**: Generates high-resolution downloadable PDFs using `jsPDF` + `jspdf-autotable`.
   - **Export Formatted Excel**: Re-export formatted tables back to Excel.

---

## 💻 How to Run

1. **Start the development server**:
   ```bash
   npm run dev
   ```
2. Open your browser at:
   ```
   http://localhost:5174/
   ```
