import React, { useState } from 'react';
import { Language, AppView, OperationalRole } from '../types';
import { translations } from '../translations/translations';
import { Phone, LayoutDashboard, Globe, Menu, X, ArrowUpRight, LogIn, LogOut, User } from 'lucide-react';

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
  const t = translations[currentLang];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇨🇭' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
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

  return (
    <header className="sticky top-0 z-50 min-h-[84px] md:min-h-[92px] bg-white/95 backdrop-blur-md border-b border-[#e7ecea] shadow-sm transition-all">
      <div className="max-w-[1280px] mx-auto min-h-[84px] md:min-h-[92px] px-3 sm:px-6 flex items-center justify-between gap-2 md:gap-4">
        {/* Unified Brand Logo Badge Across Landing & Dashboard */}
        <a
          href="#top"
          onClick={(e) => {
            if (currentView !== 'landing') {
              e.preventDefault();
              onViewChange('landing');
            }
          }}
          className="flex-none flex items-center justify-center bg-[#08271e] text-white px-3.5 py-2.5 rounded-2xl border border-black/10 shadow-sm hover:scale-[1.02] transition-transform"
          aria-label="klar solution homepage"
        >
          <div className="flex flex-col text-center leading-tight">
            <span className="font-serif font-extrabold tracking-tight text-lg md:text-xl text-white font-sans">
              klar <span className="text-[#3d9970]">solution</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#a8cfbd] font-medium">
              Smart Grid AG
            </span>
          </div>
        </a>

        {/* Desktop Nav Links (Only when in landing view) */}
        {currentView === 'landing' && (
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-[#142032]">
            <a href="#problem" className="hover:text-[#3d9970] transition-colors py-1">
              Lösung
            </a>
            <a href="#funktion" className="hover:text-[#3d9970] transition-colors py-1">
              Funktionen
            </a>
            <a href="#ablauf" className="hover:text-[#3d9970] transition-colors py-1">
              Ablauf
            </a>
            <a href="#roi" className="hover:text-[#3d9970] transition-colors py-1">
              ROI-Rechner
            </a>
            <a href="#pakete" className="hover:text-[#3d9970] transition-colors py-1">
              Pakete
            </a>
            <a href="#kontakt" className="hover:text-[#3d9970] transition-colors py-1">
              Kontakt
            </a>
          </nav>
        )}

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ms-auto">
          {/* High-Contrast Phone Pill (White text on Emerald) */}
          <a
            href="tel:+41445897288"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#3d9970] text-white font-extrabold text-xs md:text-sm shadow-md hover:bg-[#2f815f] transition-all border border-[#3d9970]"
            title="Telefon KlarSolution"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>044 589 72 88</span>
          </a>

          {/* Action 1: "Anmelden" Login Button (or Authenticated User Profile) */}
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-extrabold text-xs md:text-sm border border-gray-300 shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4 text-[#3d9970]" />
              <span>Anmelden</span>
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-[#eef8f3] hover:bg-[#d5ebe0] text-[#142032] border border-[#3d9970]/30 transition-all shadow-sm"
              >
                {userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt={userName}
                    className="w-6 h-6 rounded-full object-cover border border-[#3d9970]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#3d9970] text-white flex items-center justify-center font-bold text-xs">
                    {userName.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="font-extrabold text-xs text-[#142032]">{userName}</span>
                  <span className="text-[10px] text-[#2d5c46] font-semibold">{userRole}</span>
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 ltr:right-0 rtl:left-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-fadeIn">
                  <div className="border-b border-gray-100 pb-2">
                    <strong className="block text-xs font-bold text-[#142032]">{userName}</strong>
                    <span className="text-[11px] text-gray-500 font-mono block truncate">{userEmail}</span>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#3d9970]/20 text-[#2d5c46] text-[10px] font-extrabold">
                      {userRole}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full text-left ltr:text-left rtl:text-right px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Abmelden</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action 2: "Kundenbereich" Protected Entry Point */}
          <button
            type="button"
            onClick={handleDashboardClick}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-extrabold transition-all shadow-md ${
              currentView === 'kundenbereich'
                ? 'bg-[#3d9970] text-white'
                : 'bg-[#08271e] hover:bg-[#123d2e] text-white border border-white/20'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#86c8aa]" />
            <span>
              {currentView === 'landing'
                ? 'Kundenbereich / Live-Dashboard →'
                : '← Zurück zur Website'}
            </span>
          </button>

          {/* Multi-Language Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-all"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#3d9970]" />
              <span className="uppercase">{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 ltr:right-0 rtl:left-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => toggleLang(item.code)}
                    className={`w-full text-left ltr:text-left rtl:text-right px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[#eef8f3] transition-colors ${
                      currentLang === item.code ? 'text-[#3d9970] bg-[#eef8f3] font-bold' : 'text-gray-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-sm">{item.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Drawer Toggle */}
          {currentView === 'landing' && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && currentView === 'landing' && (
        <div className="lg:hidden bg-[#08271e] text-white px-6 py-6 border-t border-white/10 flex flex-col gap-4 text-base font-semibold shadow-2xl animate-fadeIn">
          <a
            href="#problem"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            Lösung
          </a>
          <a
            href="#funktion"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            Funktionen
          </a>
          <a
            href="#ablauf"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            Ablauf
          </a>
          <a
            href="#roi"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            ROI-Rechner
          </a>
          <a
            href="#pakete"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            Pakete
          </a>
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            Kontakt
          </a>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="py-3 rounded-xl bg-white text-gray-900 font-extrabold text-center shadow-md flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#3d9970]" />
                <span>Anmelden</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="py-3 rounded-xl bg-red-600 text-white font-extrabold text-center shadow-md flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Abmelden ({userName})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleDashboardClick();
              }}
              className="py-3 rounded-xl bg-[#3d9970] text-white font-extrabold text-center shadow-lg flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Kundenbereich / Live-Dashboard →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
