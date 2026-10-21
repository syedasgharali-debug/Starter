import React, { useState } from 'react';
import { Language, OperationalRole } from '../types';
import { translations } from '../translations/translations';
import { X, Shield, RefreshCw, CheckCircle2, Lock, Mail, ArrowRight } from 'lucide-react';

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
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  if (!isOpen) return null;

  const handleSimulateLogin = (
    name: string = 'Ali Kazmi',
    email: string = 'ali.kazmi@smartgrid.ch',
    role: OperationalRole = 'Administrator',
    provider: string = 'Google'
  ) => {
    setLoading(true);
    setStatusText(`${provider}-Authentifizierung läuft...`);

    setTimeout(() => {
      setStatusText('Sitzung gesichert & SSO verifiziert...');
    }, 800);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(name, email, role);
      onClose();
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = emailInput ? emailInput.split('@')[0].replace('.', ' ') : 'Ali Kazmi';
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    handleSimulateLogin(
      formattedName,
      emailInput || 'ali.kazmi@smartgrid.ch',
      'Administrator',
      'Passwort'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden relative text-[#142032] animate-scaleUp">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#08271e] text-white p-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#86c8aa] mb-2 border border-white/10">
            <Shield className="w-3.5 h-3.5 mr-1 text-[#3d9970]" />
            <span>KlarSolution Single Sign-On (SSO)</span>
          </div>

          <div className="flex flex-col items-center justify-center my-1">
            <span className="font-serif font-extrabold text-2xl text-white">
              klar <span className="text-[#3d9970]">solution</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#a8cfbd] font-semibold mt-0.5">
              Smart Grid AG Schweiz
            </span>
          </div>
          <p className="text-xs text-gray-300 mt-2">
            Geprüfte Anmeldung für Kreditorenbuchhaltung & Revisionscockpit
          </p>
        </div>

        {/* Loading Overlay State */}
        {loading ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#eef8f3] text-[#3d9970] mx-auto flex items-center justify-center shadow-inner">
              <RefreshCw className="w-8 h-8 animate-spin text-[#3d9970]" />
            </div>
            <h3 className="text-lg font-bold text-[#142032]">{statusText}</h3>
            <p className="text-xs text-gray-500 font-mono">
              OAuth 2.0 / SAML 2.0 Verschlüsselung aktiv (ISO 27001)
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Prominent Google Sign-In Button */}
            <button
              type="button"
              onClick={() =>
                handleSimulateLogin(
                  'Ali Kazmi',
                  'ali.kazmi@smartgrid.ch',
                  'Administrator',
                  'Google'
                )
              }
              className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 group"
            >
              {/* Official Google Multi-colored SVG Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>Mit Google fortfahren</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-xs font-semibold text-gray-400 whitespace-nowrap">
                oder mit geschäftlicher E-Mail
              </span>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Geschäftliche E-Mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ali.kazmi@smartgrid.ch"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Passwort</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#08271e] hover:bg-[#123d2e] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Anmelden</span>
                <ArrowRight className="w-4 h-4 text-[#3d9970]" />
              </button>
            </form>

            {/* Quick Demo Login Preset Buttons */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block text-center">
                ⚡ Schnellzugriff für Live-Demo:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleSimulateLogin(
                      'Ali Kazmi',
                      'ali.kazmi@smartgrid.ch',
                      'Administrator',
                      'Demo-Admin'
                    )
                  }
                  className="py-2 px-3 rounded-xl bg-[#eef8f3] hover:bg-[#d5ebe0] text-[#2d5c46] text-xs font-extrabold border border-[#3d9970]/30 transition-colors text-center"
                >
                  ⚡ Als Admin einloggen
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSimulateLogin(
                      'Beat Oberholzer',
                      'beat.oberholzer@smartgrid.ch',
                      'Controller',
                      'Demo-Controller'
                    )
                  }
                  className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold border border-gray-300 transition-colors text-center"
                >
                  ⚡ Als Controller einloggen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
