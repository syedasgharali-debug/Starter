import React, { useState } from 'react';
import { Language, AppView, OperationalRole } from '../types';
import { translations } from '../translations/translations';
import { Phone, LayoutDashboard, Globe, Menu, X, LogIn, LogOut, Sparkles, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onRequestQuote: () => void;
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  userRole: OperationalRole;
  userAvatarUrl?: string;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentView,
  onViewChange,
  onRequestQuote,
  isAuthenticated,
  userName,
  userEmail,
  userRole,
  userAvatarUrl,
  onOpenAuthModal,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇨🇭' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  const toggleLang = (code: Language) => {
    onLanguageChange(code);
    setLangDropdownOpen(false);
  };

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      onViewChange('kundenbereich');
    } else {
      onOpenAuthModal();
    }
  };

  const { themeMode, toggleTheme } = useApp();

  return (
    <>
      {/* Sticky Top Header Navigation */}
      <div className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-all">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo variant="full" size="md" to="/" />
          </div>

          {/* Core Navigation Links */}
          {currentView === 'landing' && (
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
              <a href="#funktion" className="hover:text-[#3d9970] transition-colors py-1">
                3-Wege-Prüfung
              </a>
              <a href="#roi" className="hover:text-[#3d9970] transition-colors py-1">
                ROI-Rechner
              </a>
              <a href="#pakete" className="hover:text-[#3d9970] transition-colors py-1">
                Pakete
              </a>
              <a href="#vergleich" className="hover:text-[#3d9970] transition-colors py-1">
                API & CLI
              </a>
            </nav>
          )}

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 1-Click Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs"
              title="Design-Modus wechseln"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">☀️ Helles Design</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">🌙 Dunkles Design</span>
                </>
              )}
            </button>

            {/* Phone Micro Action Button */}
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
              title="Kontakt & Telefon"
            >
              <Phone className="w-3.5 h-3.5 text-[#3d9970]" />
              <span className="hidden md:inline">044 589 72 88</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#3d9970]" />
                <span className="uppercase">{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1.5 overflow-hidden animate-fadeIn">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => toggleLang(item.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        currentLang === item.code ? 'text-[#3d9970] bg-emerald-50/60 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-sm">{item.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button with LogIn Icon */}
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all border border-slate-200"
              >
                <LogIn className="w-3.5 h-3.5 text-[#3d9970]" />
                <span>Anmelden</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-slate-800 font-extrabold text-xs border border-emerald-200/80 transition-all shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#3d9970]" />
                  <span>Anmelden</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-fadeIn">
                    <div className="border-b border-slate-100 pb-2">
                      <strong className="block text-xs font-bold text-slate-900">{userName}</strong>
                      <span className="text-[11px] text-slate-500 font-mono block truncate">{userEmail}</span>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-[#2d5c46] text-[10px] font-extrabold">
                        {userRole}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Abmelden</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Live Demo / Dashboard CTA */}
            <button
              type="button"
              onClick={handleDashboardClick}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold shadow-md transition-all hover:scale-[1.02] ${
                currentView === 'kundenbereich'
                  ? 'bg-[#3d9970] text-white'
                  : 'bg-gradient-to-r from-[#08271e] to-[#123d2e] hover:from-[#123d2e] hover:to-[#3d9970] text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {currentView === 'landing' ? 'Kundenportal' : 'Zum Cockpit →'}
              </span>
            </button>

            {/* Mobile Drawer Toggle */}
            {currentView === 'landing' && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && currentView === 'landing' && (
          <div className="mt-3 lg:hidden bg-[#08271e] text-white rounded-3xl p-6 border border-white/10 flex flex-col gap-3 text-sm font-semibold shadow-2xl animate-fadeIn">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Lösung
            </a>
            <a
              href="#funktion"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Funktionen
            </a>
            <a
              href="#roi"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              ROI-Rechner
            </a>
            <a
              href="#vergleich"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Warum Klar?
            </a>
            <a
              href="#pakete"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Pakete
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDashboardClick();
                }}
                className="py-3 rounded-2xl bg-[#3d9970] text-white font-extrabold text-center shadow-lg flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Kundenportal & Cockpit →</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Contact Modal (Phone & Direct Contact) */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#3d9970] flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Direkter Kontakt</h3>
                <p className="text-xs text-slate-500">KlarSolution AG • Schweiz</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs font-semibold">
              <div className="flex items-center justify-between text-slate-700">
                <span>Telefon Schweiz:</span>
                <a href="tel:+41445897288" className="text-[#3d9970] font-extrabold text-sm">
                  044 589 72 88
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>E-Mail Support:</span>
                <a href="mailto:info@klarsolution.com" className="text-slate-900 font-bold">
                  info@klarsolution.com
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Adresse:</span>
                <span className="text-slate-600 font-normal">8706 Meilen, Zürich</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setContactModalOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3 rounded-2xl bg-[#08271e] hover:bg-[#123d2e] text-white font-extrabold text-xs shadow-md transition-all"
            >
              Rückruf oder Demo anfragen →
            </button>
          </div>
        </div>
      )}
    </>
  );
};
