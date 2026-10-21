import React, { useState } from 'react';
import { Language, InvoiceRecord } from '../../types';
import { translations } from '../../translations/translations';
import { AlertCircle, Copy, Check, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface DisputesViewProps {
  currentLang: Language;
  invoices: InvoiceRecord[];
}

export const DisputesView: React.FC<DisputesViewProps> = ({ currentLang, invoices }) => {
  const t = translations[currentLang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const flaggedInvoices = invoices.filter(
    (inv) => inv.status === 'discrepancy' || inv.status === 'duplicate'
  );

  const totalFlaggedVariance = flaggedInvoices.reduce((acc, curr) => acc + curr.varianceCHF, 0);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#142032]">{t.dashTabDisputes}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Übersicht aller dokumentierten Reklamationen zur Rückforderung bei Lieferanten
          </p>
        </div>

        <div className="bg-[#fff3e6] border border-[#f5d0bc] px-4 py-2 rounded-2xl text-xs font-bold text-[#8a5a10]">
          Offenes Rückforderungsvolumen: <span className="text-[#df6029] font-mono text-sm font-extrabold">CHF {totalFlaggedVariance.toLocaleString()}</span>
        </div>
      </div>

      {/* Discrepancy List */}
      <div className="space-y-4">
        {flaggedInvoices.map((inv) => (
          <div key={inv.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#fdf0ea] text-[#df6029] rounded-xl font-bold">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#142032]">
                    {inv.supplierName} ({inv.invoiceNumber})
                  </h3>
                  <span className="text-xs text-gray-500">
                    PO: {inv.poNumber} · Datum: {inv.invoiceDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-extrabold text-[#df6029] bg-[#fff3e6] px-3 py-1 rounded-full">
                  + CHF {inv.varianceCHF.toLocaleString()} Abweichung
                </span>
              </div>
            </div>

            {/* Finding reason */}
            {inv.lineItems.length > 0 && (
              <div className="p-3.5 bg-gray-50 rounded-xl text-xs text-gray-700 space-y-1 border border-gray-100">
                <strong className="block text-[#142032]">Grund der Abweichung:</strong>
                <p>{inv.lineItems[0].reason}</p>
              </div>
            )}

            {/* Generated letter & Copy action */}
            {inv.disputeLetter && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                  <span>Generierter Reklamationstext für Lieferant:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(inv.id, inv.disputeLetter)}
                    className="px-3 py-1.5 rounded-lg bg-[#3d9970] hover:bg-[#2f8a68] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    {copiedId === inv.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === inv.id ? t.dashLetterCopied : t.dashCopyLetter}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={4}
                  value={inv.disputeLetter}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs font-mono bg-[#f7f9f8] text-gray-800"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
