import React, { useState } from 'react';
import { Language, AppView } from '../types';
import { translations } from '../translations/translations';
import { Phone, LayoutDashboard, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onRequestQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentView,
  onViewChange,
  onRequestQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 min-h-[84px] md:min-h-[92px] bg-white/95 backdrop-blur-md border-b border-[#e7ecea] shadow-sm transition-all">
      <div className="max-w-[1280px] mx-auto min-h-[84px] md:min-h-[92px] px-3 sm:px-6 flex items-center justify-between gap-2 md:gap-4">
        {/* Brand Logo */}
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
            <span className="font-extrabold tracking-tight text-lg md:text-xl text-white font-sans">
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
          {/* Sticky Phone Button - High Contrast Emerald Pill with White Text */}
          <a
            href="tel:+41445897288"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#3d9970] text-white font-extrabold text-xs md:text-sm shadow-md hover:bg-[#2f815f] transition-all border border-[#3d9970]"
            title="Call KlarSolution"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>044 589 72 88</span>
          </a>

          {/* View Switcher: Landing vs Kundenbereich */}
          <button
            type="button"
            onClick={() =>
              onViewChange(currentView === 'landing' ? 'kundenbereich' : 'landing')
            }
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md ${
              currentView === 'landing'
                ? 'bg-[#08271e] hover:bg-[#123d2e] text-white border border-white/20'
                : 'bg-[#3d9970] hover:bg-[#2f815f] text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#86c8aa]" />
            <span>{currentView === 'landing' ? 'Kundenbereich / Live-Dashboard →' : '← Zurück zur Website'}</span>
          </button>

          {/* Request Audit Quote Button (Landing mode) */}
          {currentView === 'landing' && (
            <button
              type="button"
              onClick={onRequestQuote}
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#202527] to-[#142032] text-white text-xs md:text-sm font-bold shadow-md hover:from-[#353d40] hover:to-[#08271e] transition-all border border-white/20"
            >
              <span>{t.requestReview}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#3d9970]" />
            </button>
          )}

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

          {/* Mobile Navigation Drawer Toggle */}
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
            {t.navWhyAudit}
          </a>
          <a
            href="#funktion"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            {t.navWhatWeAudit}
          </a>
          <a
            href="#nutzen"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            {t.navBenefits}
          </a>
          <a
            href="#ablauf"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            {t.navProcess}
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            {t.navPricing}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            {t.navFaq}
          </a>
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#3d9970] transition-colors py-1"
          >
            {t.navContact}
          </a>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="tel:+41445897288"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-bold"
            >
              <Phone className="w-4 h-4 text-[#3d9970]" />
              <span>044 589 72 88</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="py-3 rounded-xl bg-[#3d9970] text-white font-extrabold text-center shadow-lg"
            >
              {t.requestReview}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
