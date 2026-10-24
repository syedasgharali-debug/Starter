import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldX, Lock, ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react';

export const Forbidden403: React.FC<{ pageTitle?: string }> = ({ pageTitle = 'Separates Admin-Panel' }) => {
  const navigate = useNavigate();
  const { userSession, effectiveRole, login, setSimulatedRole } = useApp();

  const handleSwitchToAdmin = () => {
    if (userSession.role === 'Administrator') {
      setSimulatedRole(null);
    } else {
      login('Ali Kazmi', 'ali.kazmi@smartgrid.ch', 'Administrator');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full border border-slate-200 shadow-xl text-center space-y-6 relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto shadow-inner">
          <ShieldX className="w-10 h-10 text-red-600" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 font-mono text-xs font-extrabold border border-red-200">
            <Lock className="w-3.5 h-3.5" />
            <span>HTTP 403 • Zugriff verweigert (RBAC Guard)</span>
          </div>
          <h2 className="text-2xl font-serif font-black text-slate-900">
            Keine Berechtigung für {pageTitle}
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Ihre aktuelle Rolle (<span className="font-extrabold text-slate-800">{effectiveRole}</span> – {userSession.email}) verfügt nur über Zugriff auf das <strong className="text-slate-800">Operative User-Panel</strong>. Admin-Einstellungen, SSO-APIs und Audit-Logs sind Administratoren vorbehalten.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
          <div className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Sicherheits-Information (ISO 27001):</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-normal">
            Aktivierte Rollentrennung schützt Mandanten-Stammdaten, SSO-Tokens und Compliance-Logs vor unbefugtem Zugriff.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zur Übersicht</span>
          </button>

          <button
            type="button"
            onClick={handleSwitchToAdmin}
            className="flex-1 py-3 px-4 rounded-xl bg-[#08271e] hover:bg-[#123d2e] text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-[#3d9970]" />
            <span>Als Admin anmelden</span>
          </button>
        </div>
      </div>
    </div>
  );
};
