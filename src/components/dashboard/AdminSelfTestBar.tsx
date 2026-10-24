import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Eye, ShieldAlert, CheckCircle2, RefreshCw, UserCheck, Lock, Unlock } from 'lucide-react';

export const AdminSelfTestBar: React.FC = () => {
  const { userSession, simulatedRole, effectiveRole, setSimulatedRole, login, resetDatabase, addAuditLog } = useApp();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Only render if logged-in user account is Administrator
  if (userSession.role !== 'Administrator') return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSimulatedRole = (targetRole: 'Administrator' | 'Controller') => {
    if (targetRole === 'Controller') {
      setSimulatedRole('Controller');
      showToast('RBAC-Simulation aktiv: Ansicht als Controller (USER)');
    } else {
      setSimulatedRole(null);
      showToast('RBAC-Simulation beendet: Vollzugriff als Admin');
    }
  };

  const handleImpersonateUser = (email: string) => {
    if (email === 'buchhaltung@smartgrid.ch') {
      login('Kreditoren Buchhaltung', 'buchhaltung@smartgrid.ch', 'Controller');
      showToast('Eingeloggt als Controller: buchhaltung@smartgrid.ch');
    } else {
      login('Ali Kazmi', 'ali.kazmi@smartgrid.ch', 'Administrator');
      showToast('Eingeloggt als Admin: ali.kazmi@smartgrid.ch');
    }
  };

  const handleResetDB = () => {
    resetDatabase();
    setResetConfirmOpen(false);
    showToast('Datenbank auf Werkseinstellungen zurückgesetzt.');
  };

  return (
    <>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#08271e] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-[#3d9970] flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#3d9970]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Simulator Bar */}
      <div className={`w-full px-4 py-2.5 text-white flex flex-col md:flex-row items-center justify-between gap-3 border-b text-xs shadow-md transition-colors ${
        simulatedRole === 'Controller'
          ? 'bg-amber-950 border-amber-800 text-amber-200'
          : 'bg-[#08271e] border-emerald-900/80 text-emerald-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`px-2.5 py-1 rounded-lg font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5 ${
            simulatedRole === 'Controller'
              ? 'bg-amber-500 text-amber-950'
              : 'bg-[#3d9970] text-slate-950'
          }`}>
            <Shield className="w-3.5 h-3.5" />
            <span>Admin RBAC Simulator</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-300">
            <span>Aktuelle Ansicht:</span>
            <span className="font-extrabold text-white underline decoration-[#3d9970] decoration-2">
              {effectiveRole === 'Administrator' ? 'ADMIN (Vollzugriff)' : 'USER (Controller / Restricted)'}
            </span>
          </div>
        </div>

        {/* Live Simulator Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-300 hidden xl:inline">
            Ansicht testen:
          </span>

          <div className="inline-flex p-0.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <button
              type="button"
              onClick={() => handleToggleSimulatedRole('Administrator')}
              className={`px-3 py-1 rounded-lg font-extrabold text-[11px] transition-all flex items-center gap-1 ${
                effectiveRole === 'Administrator'
                  ? 'bg-[#3d9970] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Unlock className="w-3 h-3 text-emerald-200" />
              <span>ADMIN</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleSimulatedRole('Controller')}
              className={`px-3 py-1 rounded-lg font-extrabold text-[11px] transition-all flex items-center gap-1 ${
                effectiveRole === 'Controller'
                  ? 'bg-amber-500 text-amber-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>USER (Controller)</span>
            </button>
          </div>

          {/* User Account Impersonation Switcher */}
          <select
            value={userSession.email}
            onChange={(e) => handleImpersonateUser(e.target.value)}
            className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#3d9970]"
            title="Account wechseln"
          >
            <option value="ali.kazmi@smartgrid.ch">ali.kazmi@smartgrid.ch (ADMIN)</option>
            <option value="buchhaltung@smartgrid.ch">buchhaltung@smartgrid.ch (USER)</option>
          </select>

          {/* Reset DB Button */}
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/80 text-[11px] font-bold flex items-center gap-1 transition-colors"
            title="Lokale Datenbank auf Werkseinstellungen zurücksetzen"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset DB</span>
          </button>
        </div>
      </div>

      {/* Reset DB Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl space-y-4 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-base text-slate-900">Datenbank zurücksetzen?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Löscht alle in <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">klarsolution_prod_state</code> gespeicherten Belege, Rechnungen und Audit-Logs und stellt den Ursprungszustand wieder her.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleResetDB}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md"
              >
                Ja, Reset DB
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
