import React from 'react';
import { useApp } from '../../context/AppContext';
import { RBACGuard } from '../../components/dashboard/RBACGuard';
import { Language } from '../../types';
import { Database, Clock, CheckCircle2, RefreshCw, Building2 } from 'lucide-react';

export const AuditLogsPage: React.FC<{ currentLang?: Language }> = () => {
  const { auditLogs, clients, addAuditLog } = useApp();

  const handleRefresh = () => {
    addAuditLog('System-Prüfung manuell angestossen', 'Security', 'Revisionsprüfung für ISO 27001 Zertifikat erfolgreich.');
  };

  return (
    <RBACGuard pageTitle="ERP, Mandanten & Audit-Log">
      <div className="space-y-6 animate-fadeIn text-slate-900">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#142032]">ERP, Mandanten & Revisions-Audit-Log</h1>
            <p className="text-xs text-gray-500 mt-1">
              Multi-Tenant Mandantenverwaltung, SAP/Abacus Konnektoren & Chronologisches System-Audit-Log
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-900 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Audit-Log aktualisieren</span>
          </button>
        </div>

        {/* Multi-Tenant Mandates */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#142032] flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building2 className="w-4 h-4 text-[#3d9970]" />
            <span>Aktive Mandanten & ERP-Systeme</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {clients.map((cli) => (
              <div key={cli.id} className="p-4 rounded-xl border border-gray-200 bg-slate-50 space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-900 text-sm">{cli.companyName}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[10px]">
                    {cli.erpSystem}
                  </span>
                </div>
                <div className="text-gray-500 flex justify-between">
                  <span>Geprüftes Volumen:</span>
                  <span className="font-mono font-bold text-slate-800">
                    CHF {cli.totalAuditedCHF.toLocaleString('de-CH')}
                  </span>
                </div>
                <div className="text-gray-500 flex justify-between">
                  <span>Revisionsleiter:</span>
                  <span className="font-semibold text-emerald-700">{cli.leadAuditor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3d9970]" />
              <span>Chronologisches System-Audit-Log (Echtzeit)</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              ISO 27001 Revisionssicher
            </span>
          </div>

          <div className="divide-y divide-gray-100 text-xs max-h-[400px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3d9970] shrink-0" />
                    <span>{log.action}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px]">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px]">{log.details}</p>
                </div>
                <div className="text-right font-mono text-[11px] text-gray-400 shrink-0">
                  <div>{log.user}</div>
                  <div>{log.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RBACGuard>
  );
};
