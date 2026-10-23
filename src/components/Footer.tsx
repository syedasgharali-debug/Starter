import React, { useState } from 'react';
import { Language } from '../types';
import { ShieldCheck, ArrowRight, CheckCircle2, FileText, Lock, Globe } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  currentLang?: Language;
  onRequestQuote?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestQuote }) => {
  const [legalModalContent, setLegalModalContent] = useState<
    'datenschutz' | 'impressum' | 'agb' | 'nda' | null
  >(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-black text-slate-300 border-t border-neutral-900 text-sm relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-neutral-900">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              <Logo variant="full" size="md" to="/" />
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium pt-1">
                Smart Grid AG • Schweiz
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Intelligente Rechnungsprüfung und Reklamationsabwicklung für Schweizer Finanzteams. Automatischer 3-Wege-Abgleich zur Vermeidung von Überzahlungen.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Swiss Made Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                <span>🇨🇭</span>
                <span>Swiss Made Software</span>
              </div>

              {/* Operational Status Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-900/60 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Alle Systeme betriebsbereit</span>
              </div>
            </div>
          </div>

          {/* Column 2: Produkt & KI */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Produkt & KI
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <a href="#problem" className="hover:text-white transition-colors">
                  Lösung
                </a>
              </li>
              <li>
                <a href="#funktion" className="hover:text-white transition-colors">
                  KI-Belegscanner
                </a>
              </li>
              <li>
                <a href="#funktion" className="hover:text-white transition-colors">
                  3-Way-Matching
                </a>
              </li>
              <li>
                <a href="#funktion" className="hover:text-white transition-colors">
                  Reklamations-Hub
                </a>
              </li>
              <li>
                <a href="#roi" className="hover:text-white transition-colors">
                  ROI-Rechner
                </a>
              </li>
              <li>
                <a href="#api" onClick={(e) => { e.preventDefault(); if (onRequestQuote) onRequestQuote(); }} className="hover:text-white transition-colors">
                  API-Dokumentation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Unternehmen & Compliance */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Unternehmen & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); setLegalModalContent('impressum'); }} className="hover:text-white transition-colors">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#karriere" onClick={(e) => { e.preventDefault(); if (onRequestQuote) onRequestQuote(); }} className="hover:text-white transition-colors">
                  Karriere
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModalContent('datenschutz')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Sicherheitsstandards (ISO 27001 & DSGVO)</span>
                </button>
              </li>
              <li>
                <a href="#partner" onClick={(e) => { e.preventDefault(); if (onRequestQuote) onRequestQuote(); }} className="hover:text-white transition-colors">
                  Partnerprogramm
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Updates */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Finance Intelligence Briefing
              </h4>
              <p className="text-xs text-slate-400 leading-normal">
                Monatliche Einblicke in B2B-Rechnungsprüfung. Kein Spam.
              </p>

              {subscribed ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vielen Dank für Ihre Anmeldung!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="E-Mail-Adresse eingeben"
                      required
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all pr-10"
                    />
                    <button
                      type="submit"
                      aria-label="Anmelden"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#3d9970] hover:bg-[#2f8a68] text-white transition-colors shadow-sm"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Jederzeit abstellbar. Schweizer Datenschutz konform.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            © 2026 Klar Solution SMART GRID AG. Alle Rechte vorbehalten.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => setLegalModalContent('datenschutz')}
              className="hover:text-emerald-400 transition-colors"
            >
              Datenschutz
            </button>
            <span className="text-slate-800">•</span>
            <button
              type="button"
              onClick={() => setLegalModalContent('impressum')}
              className="hover:text-emerald-400 transition-colors"
            >
              Impressum
            </button>
            <span className="text-slate-800">•</span>
            <button
              type="button"
              onClick={() => setLegalModalContent('agb')}
              className="hover:text-emerald-400 transition-colors"
            >
              AGB
            </button>
            <span className="text-slate-800">•</span>
            <button
              type="button"
              onClick={() => setLegalModalContent('nda')}
              className="hover:text-emerald-400 transition-colors"
            >
              NDA-Sicherheit
            </button>
          </div>
        </div>
      </div>

      {/* Styled Drawer Modal for Legal Links */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn text-slate-800">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto relative">
            <button
              type="button"
              onClick={() => setLegalModalContent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              ✕
            </button>

            {legalModalContent === 'datenschutz' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Datenschutzerklärung (Schweizer DSG & EU DSGVO)</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Datenschutz & Schweizer Datenhaltung
                </h3>
                <p>
                  KlarSolution (Smart Grid AG) verarbeitet Ihre Beleg- und Unternehmensdaten streng nach dem Schweizer Datenschutzgesetz (DSG) sowie der Europäischen Datenschutz-Grundverordnung (DSGVO).
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">
                  1. Server-Standort Schweiz (Kanton Zürich)
                </h4>
                <p>
                  Alle Belegdaten, OCR-Extrakte und Prüfberichte werden in nach ISO 27001 zertifizierten Schweizer Rechenzentren gehostet. Es erfolgt keine Weitergabe an unbefugte Dritte.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">
                  2. Zweckbindung & Verschlüsselung
                </h4>
                <p>
                  Ihre übermittelten Belege dienen ausschließlich der Durchführung des automatisierten 3-Wege-Abgleichs. Sämtliche Daten werden während der Übertragung (TLS 1.3) und im Ruhezustand (AES-256) verschlüsselt.
                </p>
              </div>
            )}

            {legalModalContent === 'impressum' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] font-bold">
                  <FileText className="w-4 h-4" />
                  <span>Impressum & Rechtliche Angaben</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Klar Solution – Smart Grid AG
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono space-y-1.5 text-slate-800">
                  <p>
                    <strong>Betreiberin:</strong> Smart Grid AG
                  </p>
                  <p>
                    <strong>Adresse:</strong> In der Au 44, 8706 Meilen, Schweiz
                  </p>
                  <p>
                    <strong>Telefon:</strong> +41 44 589 72 88
                  </p>
                  <p>
                    <strong>E-Mail:</strong> kontakt@klarsolution.ch
                  </p>
                  <p>
                    <strong>Handelsregister:</strong> Kanton Zürich (CH-020.3.044.102-5)
                  </p>
                  <p>
                    <strong>UID / MWST-Nr.:</strong> CHE-442.994.102
                  </p>
                </div>
              </div>
            )}

            {legalModalContent === 'agb' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] font-bold">
                  <Globe className="w-4 h-4" />
                  <span>Allgemeine Geschäftsbedingungen (AGB)</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  AGB für B2B-SaaS-Dienste
                </h3>
                <p>
                  Diese AGB regeln die Nutzung der B2B-Plattform KlarSolution durch Geschäftskunden. Mit der Registrierung oder Nutzung des Dienstes akzeptieren Sie diese Bestimmungen.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">
                  1. Leistungsumfang
                </h4>
                <p>
                  KlarSolution stellt eine Software-as-a-Service Plattform zur automatischen Analyse von Eingangsrechnungen und Belegen bereit.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">
                  2. Haftung & Gewährleistung
                </h4>
                <p>
                  KlarSolution prüft Belege mit maximaler Präzision. Die finale Freigabe von Zahlungen verbleibt stets bei den zeichnungsberechtigten Personen des Kunden.
                </p>
              </div>
            )}

            {legalModalContent === 'nda' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] font-bold">
                  <Lock className="w-4 h-4" />
                  <span>Vertraulichkeitsvereinbarung (NDA)</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Vertraulichkeitsgarantie & Anwendbares Recht
                </h3>
                <p>
                  Sämtliche hochgeladenen Rechnungen, Lieferantendaten und Preisvereinbarungen werden als streng vertrauliche Geschäftsgeheimnisse behandelt.
                </p>
                <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-slate-800">
                  Gerichtsstand & Anwendbares Recht: Ausschliesslich Schweizerisches Recht. Erfüllungsort und Gerichtsstand ist Zürich, Schweiz.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
