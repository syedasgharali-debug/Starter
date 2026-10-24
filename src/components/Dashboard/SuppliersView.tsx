import React from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { translations } from '../../translations/translations';
import { Users, AlertTriangle, ShieldCheck, Award, FileText } from 'lucide-react';

interface SuppliersViewProps {
  currentLang: Language;
}

export const SuppliersView: React.FC<SuppliersViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const { suppliers } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn text-slate-900">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-serif font-bold text-[#142032]">{t.dashTabSuppliers}</h1>
        <p className="text-xs text-gray-500 mt-1">
          Risiko-Scorecards, Compliance & Historische Fehlerquoten wichtiger B2B-Lieferanten
        </p>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Lieferant ({sup.country})
                </span>
                <h3 className="font-serif font-bold text-lg text-[#142032]">{sup.name}</h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  sup.riskLevel === 'High'
                    ? 'bg-[#fdf0ea] text-[#df6029]'
                    : sup.riskLevel === 'Medium'
                    ? 'bg-[#fff6ea] text-[#8a5a10]'
                    : 'bg-[#eef8f3] text-[#2d7d5d]'
                }`}
              >
                Risiko: {sup.riskLevel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#f7f9f8] p-3.5 rounded-xl">
              <div>
                <span className="text-gray-400 block">Geprüft</span>
                <strong className="text-[#142032]">{sup.totalInvoices} Rechnungen</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Fehlerquote</span>
                <strong className="text-[#df6029]">{sup.errorRatePct}%</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Überzahlungen</span>
                <strong className="font-mono text-[#df6029]">
                  CHF {sup.totalOverchargeCHF.toLocaleString('de-CH')}
                </strong>
              </div>
              <div>
                <span className="text-gray-400 block">Compliance</span>
                <strong className="text-[#3d9970]">{sup.complianceScore} / 100</strong>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
              <span>Letzter Audit: {sup.lastAuditDate}</span>
              <span className="font-bold text-[#3d9970] hover:underline cursor-pointer">
                Lieferanten-Profil anzeigen →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
