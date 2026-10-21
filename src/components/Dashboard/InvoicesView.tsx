import React, { useState } from 'react';
import { Language, InvoiceRecord } from '../../types';
import { translations } from '../../translations/translations';
import {
  Search,
  Filter,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Eye,
  X,
  FileText,
  Download,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';

interface InvoicesViewProps {
  currentLang: Language;
  invoices: InvoiceRecord[];
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ currentLang, invoices }) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [letterCopied, setLetterCopied] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.poNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'discrepancy' && (inv.status === 'discrepancy' || inv.status === 'duplicate')) ||
      (statusFilter === 'processing' && (inv.status === 'processing' || inv.status === 'in_review')) ||
      (statusFilter === 'resolved' && inv.status === 'resolved') ||
      (statusFilter === 'approved' && inv.status === 'approved');

    return matchesSearch && matchesStatus;
  });

  const flaggedInvoices = filteredInvoices.filter(
    (inv) => inv.varianceCHF > 0 || inv.status === 'discrepancy' || inv.status === 'duplicate'
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyLetter = (text: string) => {
    navigator.clipboard.writeText(text);
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 3000);
  };

  // Helper to escape CSV cell value safely according to RFC 4180
  const escapeCsv = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  // 1. Export Overview of Filtered Invoices
  const handleExportFilteredSummaryCSV = () => {
    const headers = [
      'Invoice Number',
      'Supplier Name',
      'Invoice Date',
      'PO Number',
      'Total Billed (CHF)',
      'Total PO Amount (CHF)',
      'Variance (CHF)',
      'Status',
      'Discrepancy Type',
      'Risk Level',
      'Confidence Score (%)',
    ];

    const rows = filteredInvoices.map((inv) => [
      escapeCsv(inv.invoiceNumber),
      escapeCsv(inv.supplierName),
      escapeCsv(inv.invoiceDate),
      escapeCsv(inv.poNumber),
      escapeCsv(inv.totalBilledCHF.toFixed(2)),
      escapeCsv(inv.totalPOCHF.toFixed(2)),
      escapeCsv(inv.varianceCHF.toFixed(2)),
      escapeCsv(inv.status),
      escapeCsv(inv.discrepancyType),
      escapeCsv(inv.riskLevel),
      escapeCsv(`${inv.confidenceScore}%`),
    ]);

    const csvContent =
      '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `KlarSolution_Audit_Filtered_${statusFilter}_${dateStr}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setExportMenuOpen(false);
    showToast(`${t.dashExportSuccess}: ${filteredInvoices.length} Rechnungen exportiert.`);
  };

  // 2. Export Detailed Discrepancies and Line-Items CSV
  const handleExportDiscrepanciesLineItemsCSV = () => {
    const headers = [
      'Invoice Number',
      'Supplier Name',
      'Invoice Date',
      'PO Number',
      'Line Item Description',
      'PO Unit Price (CHF)',
      'Billed Unit Price (CHF)',
      'PO Quantity',
      'Billed Quantity',
      'Line Variance (CHF)',
      'Invoice Total Variance (CHF)',
      'Discrepancy Type',
      'Risk Level',
      'Audit Finding Reason',
    ];

    const rows: string[] = [];

    flaggedInvoices.forEach((inv) => {
      if (inv.lineItems && inv.lineItems.length > 0) {
        inv.lineItems.forEach((li) => {
          rows.push(
            [
              escapeCsv(inv.invoiceNumber),
              escapeCsv(inv.supplierName),
              escapeCsv(inv.invoiceDate),
              escapeCsv(inv.poNumber),
              escapeCsv(li.description),
              escapeCsv(li.poUnitPrice.toFixed(2)),
              escapeCsv(li.billedUnitPrice.toFixed(2)),
              escapeCsv(li.poQuantity),
              escapeCsv(li.billedQuantity),
              escapeCsv(li.varianceCHF.toFixed(2)),
              escapeCsv(inv.varianceCHF.toFixed(2)),
              escapeCsv(inv.discrepancyType),
              escapeCsv(inv.riskLevel),
              escapeCsv(li.reason),
            ].join(',')
          );
        });
      } else {
        // Fallback row if no sub-items
        rows.push(
          [
            escapeCsv(inv.invoiceNumber),
            escapeCsv(inv.supplierName),
            escapeCsv(inv.invoiceDate),
            escapeCsv(inv.poNumber),
            escapeCsv('General Invoice Discrepancy'),
            escapeCsv(inv.totalPOCHF.toFixed(2)),
            escapeCsv(inv.totalBilledCHF.toFixed(2)),
            escapeCsv(1),
            escapeCsv(1),
            escapeCsv(inv.varianceCHF.toFixed(2)),
            escapeCsv(inv.varianceCHF.toFixed(2)),
            escapeCsv(inv.discrepancyType),
            escapeCsv(inv.riskLevel),
            escapeCsv(inv.discrepancyType),
          ].join(',')
        );
      }
    });

    const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `KlarSolution_Flagged_Discrepancies_${dateStr}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setExportMenuOpen(false);
    showToast(`${t.dashExportSuccess}: ${rows.length} Positionen / ${flaggedInvoices.length} Abweichungen exportiert.`);
  };

  // 3. Export Single Selected Invoice Detail
  const handleExportSingleInvoiceCSV = (inv: InvoiceRecord) => {
    const headers = [
      'Invoice Number',
      'Supplier Name',
      'Invoice Date',
      'PO Number',
      'Item Description',
      'PO Unit Price (CHF)',
      'Billed Unit Price (CHF)',
      'PO Quantity',
      'Billed Quantity',
      'Variance (CHF)',
      'Reason',
    ];

    const rows = inv.lineItems.map((li) =>
      [
        escapeCsv(inv.invoiceNumber),
        escapeCsv(inv.supplierName),
        escapeCsv(inv.invoiceDate),
        escapeCsv(inv.poNumber),
        escapeCsv(li.description),
        escapeCsv(li.poUnitPrice.toFixed(2)),
        escapeCsv(li.billedUnitPrice.toFixed(2)),
        escapeCsv(li.poQuantity),
        escapeCsv(li.billedQuantity),
        escapeCsv(li.varianceCHF.toFixed(2)),
        escapeCsv(li.reason),
      ].join(',')
    );

    const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KlarSolution_${inv.invoiceNumber}_Audit.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast(`${t.dashExportSuccess}: ${inv.invoiceNumber}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#08271e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#3d9970] flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#3d9970]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* View Header with Multi-Option Export Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#142032]">{t.dashTabInvoices}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Alle erfassten Lieferantenrechnungen und Belegabgleiche im Detail
          </p>
        </div>

        {/* Enhanced Export Menu Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#245f49] to-[#3d9970] text-white text-xs font-bold shadow-md hover:from-[#1a4a38] hover:to-[#2f8a68] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-white" />
            <span>CSV Export ({filteredInvoices.length})</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exportMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {exportMenuOpen && (
            <div className="absolute right-0 ltr:right-0 rtl:left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-30 animate-fadeIn">
              <div className="px-4 py-2 border-b border-gray-100 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                {t.dashExportOptions}
              </div>

              {/* Option 1: Filtered Summary */}
              <button
                type="button"
                onClick={handleExportFilteredSummaryCSV}
                className="w-full text-left ltr:text-left rtl:text-right px-4 py-3 hover:bg-[#eef8f3] text-xs font-semibold text-gray-700 flex items-start gap-2.5 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#3d9970] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#142032]">{t.dashExportFilteredCsv}</strong>
                  <span className="text-[11px] text-gray-500">
                    {filteredInvoices.length} Rechnungen mit Status, PO-Vergleich & Salden
                  </span>
                </div>
              </button>

              {/* Option 2: Flagged Discrepancies Detailed */}
              <button
                type="button"
                onClick={handleExportDiscrepanciesLineItemsCSV}
                className="w-full text-left ltr:text-left rtl:text-right px-4 py-3 hover:bg-[#fff3e6] text-xs font-semibold text-gray-700 flex items-start gap-2.5 transition-colors border-t border-gray-50"
              >
                <AlertTriangle className="w-4 h-4 text-[#df6029] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#142032]">{t.dashExportDiscrepanciesCsv}</strong>
                  <span className="text-[11px] text-gray-500">
                    {flaggedInvoices.length} fehlerhafte Belege mit zeilenweiser Fehlerbegründung
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suche nach Rechnungsnr, Lieferant, PO..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'all' ? 'bg-[#08271e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.dashFilterAll}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('discrepancy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'discrepancy' ? 'bg-[#df6029] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Abweichung festgestellt ({flaggedInvoices.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('processing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'processing' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            In Prüfung
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('resolved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'resolved' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Bereinigt
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'approved' ? 'bg-[#3d9970] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.dashFilterApproved}
          </button>
        </div>
      </div>

      {/* Invoice Audit Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left ltr:text-left rtl:text-right text-xs">
            <thead className="bg-[#f7f9f8] border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Rechnung #</th>
                <th className="p-4">Lieferant</th>
                <th className="p-4">PO Nummer</th>
                <th className="p-4">Datum</th>
                <th className="p-4">Billed Amount</th>
                <th className="p-4">Abweichung</th>
                <th className="p-4">Abweichungsart</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold font-mono text-[#142032]">{inv.invoiceNumber}</td>
                  <td className="p-4">{inv.supplierName}</td>
                  <td className="p-4 font-mono text-gray-600">{inv.poNumber}</td>
                  <td className="p-4 text-gray-500">{inv.invoiceDate}</td>
                  <td className="p-4 font-mono font-semibold">CHF {inv.totalBilledCHF.toLocaleString()}</td>
                  <td className="p-4 font-mono font-bold text-[#df6029]">
                    {inv.varianceCHF > 0 ? `+ CHF ${inv.varianceCHF.toLocaleString()}` : 'CHF 0.00'}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-semibold text-[11px]">
                      {inv.discrepancyType}
                    </span>
                  </td>
                  <td className="p-4">
                    {inv.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eef8f3] text-[#2d7d5d] text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Freigegeben
                      </span>
                    ) : inv.status === 'duplicate' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fdf0ea] text-[#df6029] text-[11px] font-bold">
                        <XCircle className="w-3 h-3" /> Doppelabrechnung
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff6ea] text-[#8a5a10] text-[11px] font-bold">
                        <AlertTriangle className="w-3 h-3" /> Abweichung
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded-lg bg-[#eef8f3] hover:bg-[#d5ebe0] text-[#2d5c46] transition-colors"
                      title="Ansehen"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Line-Item Detail Drawer / Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-gray-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3d9970]">
                  Line-Item Audit Report
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#142032] mt-0.5">
                  {selectedInvoice.invoiceNumber} – {selectedInvoice.supplierName}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportSingleInvoiceCSV(selectedInvoice)}
                  className="px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5"
                  title="CSV Export für diesen Beleg"
                >
                  <Download className="w-3.5 h-3.5 text-[#3d9970]" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* General Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f7f9f8] rounded-2xl text-xs">
              <div>
                <span className="text-gray-400 block font-bold">PO Nummer</span>
                <strong className="text-[#142032]">{selectedInvoice.poNumber}</strong>
              </div>
              <div>
                <span className="text-gray-400 block font-bold">Rechnungsdatum</span>
                <strong className="text-[#142032]">{selectedInvoice.invoiceDate}</strong>
              </div>
              <div>
                <span className="text-gray-400 block font-bold">Total Berechnet</span>
                <strong className="text-[#142032]">CHF {selectedInvoice.totalBilledCHF.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-gray-400 block font-bold">Abweichung</span>
                <strong className="text-[#df6029]">CHF {selectedInvoice.varianceCHF.toLocaleString()}</strong>
              </div>
            </div>

            {/* Line Items Comparison */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-[#142032]">Zeilenweiser Belegabgleich (PO vs Rechnung)</h3>
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left ltr:text-left rtl:text-right text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold">
                    <tr>
                      <th className="p-3">Pos. Beschreibung</th>
                      <th className="p-3">PO Preis</th>
                      <th className="p-3">Rechnung Preis</th>
                      <th className="p-3">PO Mng</th>
                      <th className="p-3">Rechnung Mng</th>
                      <th className="p-3">Abweichung</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {selectedInvoice.lineItems.map((li) => (
                      <tr key={li.id}>
                        <td className="p-3 font-sans font-medium text-[#142032]">{li.description}</td>
                        <td className="p-3">CHF {li.poUnitPrice.toFixed(2)}</td>
                        <td className="p-3">CHF {li.billedUnitPrice.toFixed(2)}</td>
                        <td className="p-3">{li.poQuantity}</td>
                        <td className="p-3">{li.billedQuantity}</td>
                        <td className="p-3 font-bold text-[#df6029]">+ CHF {li.varianceCHF.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dispute Letter Template preview */}
            {selectedInvoice.disputeLetter && (
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-[#142032]">Vorlage für Lieferanten-Reklamation</h3>
                  <button
                    type="button"
                    onClick={() => handleCopyLetter(selectedInvoice.disputeLetter)}
                    className="px-3 py-1.5 rounded-lg bg-[#3d9970] text-white text-xs font-bold hover:bg-[#2f8a68] transition-colors flex items-center gap-1.5"
                  >
                    {letterCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{letterCopied ? t.dashLetterCopied : t.dashCopyLetter}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={5}
                  value={selectedInvoice.disputeLetter}
                  className="w-full p-3.5 rounded-2xl border border-gray-300 text-xs font-mono bg-gray-50 text-gray-800"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
