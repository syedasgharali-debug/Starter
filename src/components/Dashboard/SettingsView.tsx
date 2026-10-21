import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../translations/translations';
import { Settings, CheckCircle2, Shield, Database, Bell, RefreshCw, Key } from 'lucide-react';

interface SettingsViewProps {
  currentLang: Language;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [autoApproveUnderCHF, setAutoApproveUnderCHF] = useState(50);
  const [minConfidenceScore, setMinConfidenceScore] = useState(90);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const erpIntegrations = [
    { name: 'SAP S/4HANA', type: 'ERP Connector', connected: true, lastSync: 'Heute, 15:42' },
    { name: 'Abacus Enterprise', type: 'Swiss ERP', connected: true, lastSync: 'Heute, 14:10' },
    { name: 'Bexio Cloud', type: 'SME Accounting', connected: false, lastSync: 'Nicht verbunden' },
    { name: 'QuickBooks B2B', type: 'Accounting', connected: false, lastSync: 'Nicht verbunden' },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-serif font-bold text-[#142032]">{t.dashTabSettings}</h1>
        <p className="text-xs text-gray-500 mt-1">
          ERP-Schnittstellen, Prüfungs-Schwellenwerte und Benachrichtigungseinstellungen
        </p>
      </div>

      {/* ERP Connectors */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#3d9970]" />
            <h3 className="font-bold text-base text-[#142032]">ERP & Buchhaltungs-Anbindungen</h3>
          </div>
          <span className="text-xs text-emerald-600 font-bold bg-[#eef8f3] px-3 py-1 rounded-full">
            2 Aktiv Verbunden
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {erpIntegrations.map((erp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-200 flex justify-between items-center bg-[#f7f9f8]"
            >
              <div>
                <strong className="block text-sm text-[#142032]">{erp.name}</strong>
                <span className="text-xs text-gray-500">{erp.type} · Sync: {erp.lastSync}</span>
              </div>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  erp.connected
                    ? 'bg-[#eef8f3] text-[#2d7d5d] border border-[#cfe3d8]'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {erp.connected ? '✓ Verbunden' : 'Verbinden'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Threshold & Rule Configuration Form */}
      <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
        <h3 className="font-bold text-base text-[#142032] border-b border-gray-100 pb-3">
          Schwellenwerte & Automatische Freigaberegeln
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Geringfügigkeitsgrenze (Toleranz ohne Alarm in CHF):
            </label>
            <input
              type="number"
              value={autoApproveUnderCHF}
              onChange={(e) => setAutoApproveUnderCHF(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-sm font-semibold"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Abweichungen unter CHF {autoApproveUnderCHF} werden automatisch toleriert.
            </span>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Mindest-Vertrauenswert der KI-Erkennung (%):
            </label>
            <input
              type="number"
              value={minConfidenceScore}
              onChange={(e) => setMinConfidenceScore(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-sm font-semibold"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Nur Scans mit Vertrauen &gt;= {minConfidenceScore}% werden automatisch eingestuft.
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <span>Einstellungen speichern</span>
          </button>

          {savedSuccess && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Einstellungen gespeichert!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
