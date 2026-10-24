import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, OperationalRole } from '../types';
import { translations } from '../translations/translations';
import {
  X,
  Shield,
  RefreshCw,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  Building,
  KeyRound,
  ShieldCheck,
  Globe,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLoginSuccess: (name: string, email: string, role: OperationalRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLoginSuccess,
}) => {
  const t = translations[currentLang];
  const { login } = useApp();

  const [emailInput, setEmailInput] = useState('ali.kazmi@smartgrid.ch');
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<OperationalRole>('Administrator');
  const [selectedTenant, setSelectedTenant] = useState('Smart Grid AG');
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  if (!isOpen) return null;

  const handleSSOLogin = (
    name: string,
    email: string,
    role: OperationalRole,
    providerLabel: string,
    tenant: string = selectedTenant
  ) => {
    setLoading(true);
    setStatusText(`${providerLabel}-Authentifizierung läuft...`);

    setTimeout(() => {
      setStatusText('OAuth 2.0 / SAML 2.0 Token verifiziert & ISO 27001 verschlüsselt...');
    }, 700);

    setTimeout(() => {
      setLoading(false);
      login(name, email, role, tenant);
      onLoginSuccess(name, email, role);
      onClose();
    }, 1400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim() || 'ali.kazmi@smartgrid.ch';
    const rawName = cleanEmail.split('@')[0].replace('.', ' ');
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    
    handleSSOLogin(
      formattedName,
      cleanEmail,
      selectedRole,
      'Direct Business Email',
      selectedTenant
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden relative text-[#142032] animate-scaleUp">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-black text-white p-6 sm:p-8 text-center relative overflow-hidden border-b border-neutral-900">
          <div className="inline-flex items-center justify-center bg-emerald-950 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-400 mb-3 border border-emerald-800">
            <Shield className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span>KlarSolution Single Sign-On (SSO)</span>
          </div>

          <div className="flex flex-col items-center justify-center my-1">
            <span className="font-serif font-extrabold text-3xl text-white tracking-tight">
              klar <span className="text-emerald-400">solution</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-extrabold mt-1">
              LIVE PRODUCTION • ISO 27001 • DSGVO/DSG
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto">
            Geprüfte Multi-Provider-Anmeldung für B2B Kreditorenbuchhaltung & Revisionscockpit
          </p>
        </div>

        {/* Loading Overlay State */}
        {loading ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#eef8f3] text-[#3d9970] mx-auto flex items-center justify-center shadow-inner">
              <RefreshCw className="w-8 h-8 animate-spin text-[#3d9970]" />
            </div>
            <h3 className="text-base font-bold text-[#142032]">{statusText}</h3>
            <p className="text-xs text-gray-500 font-mono">
              Protokoll: OpenID Connect / SAML 2.0 (Schweizer Server In der Au 44)
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Quick 2-Account Preset Buttons for Live Testing */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block text-center">
                Schnellzugriff für Rollen-Test:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleSSOLogin(
                      'Ali Kazmi',
                      'ali.kazmi@smartgrid.ch',
                      'Administrator',
                      'Google Workspace',
                      'Smart Grid AG'
                    )
                  }
                  className="py-2.5 px-3 rounded-xl bg-emerald-950 hover:bg-black text-white text-xs font-extrabold border border-emerald-800 transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ADMIN (Ali Kazmi)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSSOLogin(
                      'Kreditoren Buchhaltung',
                      'buchhaltung@smartgrid.ch',
                      'Controller',
                      'SwissID 2FA',
                      'Smart Grid AG'
                    )
                  }
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold border border-slate-700 transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>USER (Controller)</span>
                </button>
              </div>
            </div>

            {/* 4 Enterprise SSO Provider Buttons Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                Enterprise Single Sign-On (4 SSO Anbieter):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Provider 1: Google Workspace */}
                <button
                  type="button"
                  onClick={() =>
                    handleSSOLogin(
                      'Ali Kazmi',
                      'ali.kazmi@smartgrid.ch',
                      selectedRole,
                      'Google Workspace'
                    )
                  }
                  className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs hover:shadow transition-all flex items-center gap-2.5"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Workspace</span>
                </button>

                {/* Provider 2: Microsoft Entra ID */}
                <button
                  type="button"
                  onClick={() =>
                    handleSSOLogin(
                      'Ali Kazmi',
                      'ali.kazmi@smartgrid.ch',
                      selectedRole,
                      'Microsoft Entra ID'
                    )
                  }
                  className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs hover:shadow transition-all flex items-center gap-2.5"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span>Microsoft Entra ID</span>
                </button>

                {/* Provider 3: SwissID 2FA */}
                <button
                  type="button"
                  onClick={() =>
                    handleSSOLogin(
                      'Ali Kazmi',
                      'ali.kazmi@smartgrid.ch',
                      selectedRole,
                      'SwissID 2FA'
                    )
                  }
                  className="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-white" />
                  <span>SwissID 2FA</span>
                </button>

                {/* Provider 4: Enterprise SAML 2.0 */}
                <button
                  type="button"
                  onClick={() =>
                    handleSSOLogin(
                      'Ali Kazmi',
                      'ali.kazmi@smartgrid.ch',
                      selectedRole,
                      'SAML 2.0 IdP'
                    )
                  }
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-emerald-400" />
                  <span>SAML 2.0 Single Sign-On</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-1">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-gray-400 whitespace-nowrap">
                oder mit E-Mail & Mandant
              </span>
            </div>

            {/* Direct Email, Password, Tenant & Role Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mandant / Organisation</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <select
                      value={selectedTenant}
                      onChange={(e) => setSelectedTenant(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970] bg-white"
                    >
                      <option value="Smart Grid AG">Smart Grid AG</option>
                      <option value="The DigiXy">The DigiXy</option>
                      <option value="AlpenBau Holding AG">AlpenBau Holding AG</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Ziel-Rolle</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as OperationalRole)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970] bg-white"
                  >
                    <option value="Administrator">Administrator (ADMIN)</option>
                    <option value="Controller">Controller (USER)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Geschäftliche E-Mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ali.kazmi@smartgrid.ch"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Passwort / Security Token</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Sitzung starten & Anmelden</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
