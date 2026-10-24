import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language, InvoiceRecord } from '../../types';
import { translations } from '../../translations/translations';
import {
  Search,
  Filter,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Download,
  ChevronDown,
  Layers,
  HelpCircle,
  PlusCircle,
  Copy,
  Check,
} from 'lucide-react';

interface InvoicesViewProps {
  currentLang: Language;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const { invoices, addInvoice, updateInvoiceStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [letterCopied, setLetterCopied] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Invoice Modal state
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);
  const [newInvNum, setNewInvNum] = useState(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [newSupplier, setNewSupplier] = useState('Swiss Industrial Hydraulics AG');
  const [newPoNum, setNewPoNum] = useState('PO-2026-992');
  const [newBilledCHF, setNewBilledCHF] = useState('4200.00');
  const [newPoCHF, setNewPoCHF] = useState('3780.00');

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
    }, 3500);
  };

  const handleCopyLetter = (text: string) => {
    navigator.clipboard.writeText(text);
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2500);
  };

  const handleUpdateStatus = (invId: string, newStatus: InvoiceRecord['status'], actionLabel: string) => {
    updateInvoiceStatus(invId, newStatus);
    showToast(`Status für ${selectedInvoice?.invoiceNumber || invId}: ${actionLabel}`);
    setSelectedInvoice(null);
  };

  const handleCreateNewInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const billed = parseFloat(newBilledCHF) || 0;
    const po = parseFloat(newPoCHF) || 0;
    const variance = Math.max(0, billed - po);

    const newRecord: InvoiceRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber: newInvNum,
      supplierName: newSupplier,
      invoiceDate: new Date().toLocaleDateString('de-CH'),
      poNumber: newPoNum,
      totalBilledCHF: billed,
      totalPOCHF: po,
      varianceCHF: variance,
      status: variance > 0 ? 'discrepancy' : 'approved',
      discrepancyType: variance > 0 ? 'Price Variance' : 'Contract Terms',
      riskLevel: variance > 500 ? 'High' : 'Low',
      confidenceScore: 98,
      lineItems: [
        {
          id: `li-${Date.now()}`,
          description: `Materialposition ${newPoNum}`,
          poUnitPrice: po,
          billedUnitPrice: billed,
          poQuantity: 1,
          billedQuantity: 1,
          varianceCHF: variance,
          reason: variance > 0 ? `Abweichung (+CHF ${variance.toFixed(2)}) festgestellt` : '3-Wege-Match bestanden',
        },
      ],
      disputeLetter: variance > 0 ? `Sehr geehrte Damen und Herren,\n\nwir beanstanden die Rechnung ${newInvNum} über CHF ${billed.toFixed(2)} bezüglich ${newPoNum}.\n\nKlarSolution Audit` : '',
    };

    addInvoice(newRecord);
    setNewInvoiceModalOpen(false);
    showToast(`Rechnung ${newInvNum} erfolgreich erfasst!`);
  };

  // CSV Helpers
  const escapeCsv = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

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
    ]);

    const csvContent =
      '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KlarSolution_Rechnungen_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setExportMenuOpen(false);
    showToast(`CSV-Export erfolgreich (${filteredInvoices.length} Rechnungen)`);
  };

  return (
    <div className="space-y-6 animate-fadeIn relative text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#08271e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#3d9970] flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#3d9970]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#142032]">{t.dashTabInvoices}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Alle erfassten Eingangsrechnungen & 3-Wege-Matchings im Detail
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* New Invoice Modal CTA */}
          <button
            type="button"
            onClick={() => setNewInvoiceModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>+ Neue Eingangsrechnung erfassen</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="px-4 py-2.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-white" />
              <span>CSV Export ({filteredInvoices.length})</span>
            </button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-30 animate-fadeIn">
                <button
                  type="button"
                  onClick={handleExportFilteredSummaryCSV}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#eef8f3] text-xs font-bold text-gray-700 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#3d9970]" />
                  <span>Gefilterte Rechnungen exportieren</span>
                </button>
              </div>
            )}
          </div>
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

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              statusFilter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Alle ({invoices.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('discrepancy')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              statusFilter === 'discrepancy' ? 'bg-[#df6029] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Abweichung ({flaggedInvoices.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              statusFilter === 'approved' ? 'bg-[#3d9970] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Freigegeben
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left ltr:text-left rtl:text-right text-xs">
            <thead className="bg-slate-50 border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Rechnung #</th>
                <th className="p-4">Lieferant</th>
                <th className="p-4">PO Nummer</th>
                <th className="p-4">Datum</th>
                <th className="p-4">Billed Amount</th>
                <th className="p-4">Abweichung</th>
                <th className="p-4">Art</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  onClick={() => setSelectedInvoice(inv)}
                  className="hover:bg-[#eef8f3]/60 cursor-pointer transition-colors"
                >
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
                        <XCircle className="w-3 h-3" /> Gestoppt
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(inv);
                      }}
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

      {/* New Invoice Modal */}
      {newInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-scaleUp text-slate-900">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-[#142032] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#3d9970]" />
                <span>+ Neue Eingangsrechnung erfassen</span>
              </h3>
              <button
                type="button"
                onClick={() => setNewInvoiceModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Rechnungsnummer</label>
                <input
                  type="text"
                  required
                  value={newInvNum}
                  onChange={(e) => setNewInvNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Lieferant Name</label>
                <input
                  type="text"
                  required
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">PO Nummer (Bestellung)</label>
                <input
                  type="text"
                  required
                  value={newPoNum}
                  onChange={(e) => setNewPoNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rechnungsbetrag (CHF)</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={newBilledCHF}
                    onChange={(e) => setNewBilledCHF(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">PO Genehmigt (CHF)</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={newPoCHF}
                    onChange={(e) => setNewPoCHF(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono text-xs focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewInvoiceModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold hover:bg-gray-50"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold shadow-md"
                >
                  Erfassen & Prüfen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Detail Drawer */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-gray-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-scaleUp">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3d9970]">
                  Line-Item Audit Report
                </span>
                <h2 className="text-xl font-serif font-bold text-[#142032]">
                  {selectedInvoice.invoiceNumber} – {selectedInvoice.supplierName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-2xl text-xs">
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

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedInvoice.id, 'duplicate', 'Zahlungsstopp aktiviert')}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md"
              >
                Zahlung stoppen
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedInvoice.id, 'approved', 'Rechnung freigegeben')}
                className="px-4 py-2 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-xs shadow-md"
              >
                Freigegeben
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
