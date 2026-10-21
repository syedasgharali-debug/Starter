import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/translations';
import { Phone, Mail, ShieldCheck, ArrowRight, ChevronDown, FileText } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onRequestQuote }) => {
  const t = translations[currentLang];
  const [legalModalContent, setLegalModalContent] = useState<
    'datenschutz' | 'impressum' | 'nda' | null
  >(null);

  return (
    <footer className="bg-[#08251d] text-[#aabbb4] pt-14 pb-8 border-t border-white/10 text-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Logo Badge */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#top"
              className="inline-flex flex-col items-center justify-center bg-[#08271e] text-white px-4 py-3 rounded-2xl border border-white/15 shadow-md hover:scale-[1.02] transition-transform"
            >
              <span className="font-serif font-extrabold tracking-tight text-xl text-white">
                klar <span className="text-[#3d9970]">solution</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#a8cfbd] font-medium mt-0.5">
                Smart Grid AG
              </span>
            </a>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Prüfung von Belegen für Finanz- und Buchhaltungsteams. DSGVO-konform. Entwickelt in der Schweiz.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-semibold text-gray-300">
              <a
                href="tel:+41445897288"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#3d9970]" />
                <span>044 589 72 88</span>
              </a>
              <a
                href="mailto:kontakt@klarsolution.ch"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#3d9970]" />
                <span>kontakt@klarsolution.ch</span>
              </a>
            </div>
          </div>

          {/* Column 2: Produkt Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#86c8aa]">
              Produkt
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#problem" className="hover:text-white transition-colors">
                  Lösung
                </a>
              </li>
              <li>
                <a href="#funktion" className="hover:text-white transition-colors">
                  Wie es funktioniert
                </a>
              </li>
              <li>
                <a href="#roi" className="hover:text-white transition-colors">
                  ROI-Rechner
                </a>
              </li>
              <li>
                <a href="#pakete" className="hover:text-white transition-colors">
                  Pakete & Preise
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Unternehmen Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#86c8aa]">
              Unternehmen
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#kontakt" className="hover:text-white transition-colors">
                  Kontakt & Anfahrt
                </a>
              </li>
              <li>
                <a
                  href="mailto:kontakt@klarsolution.ch"
                  className="hover:text-white transition-colors"
                >
                  kontakt@klarsolution.ch
                </a>
              </li>
              <li>
                <a href="tel:+41445897288" className="hover:text-white transition-colors">
                  Telefon: 044 589 72 88
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Rechtliches & Primary CTA */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#86c8aa]">
              Rechtliches
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModalContent('datenschutz')}
                  className="hover:text-white transition-colors text-left"
                >
                  Datenschutz (DSGVO / DSG)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModalContent('impressum')}
                  className="hover:text-white transition-colors text-left"
                >
                  Impressum & Firmenangaben
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModalContent('nda')}
                  className="hover:text-white transition-colors text-left"
                >
                  Vertraulichkeitsvereinbarung (NDA)
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full py-3 px-4 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Analyse anfragen →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <div>© 2026 klar solution – Alle Rechte vorbehalten</div>
          <div className="flex items-center gap-2">
            <span>Entwickelt in der Schweiz</span>
            <span className="text-base">🇨🇭</span>
          </div>
        </div>
      </div>

      {/* Legal Content Drawer Modal */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/70 backdrop-blur-md animate-fadeIn text-[#142032]">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-gray-200 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setLegalModalContent(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>

            {legalModalContent === 'datenschutz' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef8f3] text-[#3d9970] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Datenschutzerklärung (Schweizer DSG & DSGVO)</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#142032]">
                  Datenschutz & Geodaten-Sicherheit
                </h3>
                <p>
                  KlarSolution verarbeitet Ihre Beleg- und Unternehmensdaten streng nach dem Schweizer Datenschutzgesetz (DSG) sowie der Europäischen Datenschutz-Grundverordnung (DSGVO).
                </p>
                <h4 className="font-bold text-sm text-[#142032] pt-2">
                  1. Server-Standort Schweiz
                </h4>
                <p>
                  Alle Belegdaten, OCR-Extrakte und Prüfberichte werden in nach ISO 27001 zertifizierten Schweizer Rechenzentren (Kanton Zürich) gehostet. Es erfolgt keine Weitergabe an unbefugte Dritte.
                </p>
                <h4 className="font-bold text-sm text-[#142032] pt-2">
                  2. Zweckbindung & Löschfristen
                </h4>
                <p>
                  Ihre übermittelten Belege dienen ausschließlich der Durchführung des automatisierten 3-Wege-Abgleichs. Sie behalten jederzeit die volle Datenhoheit.
                </p>
              </div>
            )}

            {legalModalContent === 'impressum' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef8f3] text-[#3d9970] font-bold">
                  <FileText className="w-4 h-4" />
                  <span>Impressum & Rechtliche Angaben</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#142032]">
                  KlarSolution – Smart Grid AG
                </h3>
                <div className="bg-[#f7f9f8] p-4 rounded-2xl border border-gray-200 font-mono space-y-1 text-gray-800">
                  <p>
                    <strong>Betreiberin:</strong> Smart Grid AG
                  </p>
                  <p>
                    <strong>Adresse:</strong> In der Au 44, 8706 Meilen, Schweiz
                  </p>
                  <p>
                    <strong>Telefon:</strong> 044 589 72 88
                  </p>
                  <p>
                    <strong>E-Mail:</strong> kontakt@klarsolution.ch
                  </p>
                  <p>
                    <strong>UID / MWST-Nr.:</strong> CHE-442.994.102
                  </p>
                </div>
              </div>
            )}

            {legalModalContent === 'nda' && (
              <div className="space-y-4 text-xs leading-relaxed">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef8f3] text-[#3d9970] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Vertraulichkeitsvereinbarung (NDA)</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#142032]">
                  Vertraulichkeit & Schiedsgericht Zürich
                </h3>
                <p>
                  Mit der Übermittlung von Testbelegen oder der Durchführung der automatischen Analyse verpflichten sich beide Parteien zur strengen Geheimhaltung aller Geschäftsgeheimnisse.
                </p>
                <p className="bg-[#f7f9f8] p-3 rounded-xl border border-gray-200 font-mono">
                  Gerichtsstand & Anwendbares Recht: Ausschliesslich Schweizerisches Recht unter Ausschluss des Wiener Kaufrechts. Erfüllungsort und Gerichtsstand ist Zürich, Schweiz.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
