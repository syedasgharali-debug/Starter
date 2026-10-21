import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/translations';
import { Footer } from './Footer';
import {
  ShieldAlert,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  AlertTriangle,
  HelpCircle,
  Mail,
  Phone,
  Building2,
  Lock,
  ChevronDown,
  Calculator,
  Percent,
  Clock,
  Sparkles,
  Check,
  Zap,
} from 'lucide-react';

interface LandingPageProps {
  currentLang: Language;
  onRequestQuoteWithNotes: (notes?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onRequestQuoteWithNotes,
}) => {
  const t = translations[currentLang];

  // Interactive ROI Calculator State (Exact prompt defaults)
  const [invoicesPerMonth, setInvoicesPerMonth] = useState<number>(200); // Rechnungen pro Monat
  const [discrepancyRatePct, setDiscrepancyRatePct] = useState<number>(20); // Anteil mit Abweichungen %
  const [handlingTimeMinutes, setHandlingTimeMinutes] = useState<number>(25); // Bearbeitungszeit pro Abweichung (Min)
  const [hourlyRateCHF, setHourlyRateCHF] = useState<number>(80); // Stundensatz (CHF)

  // Live ROI Calculations
  const monthlyDiscrepancies = Math.round(invoicesPerMonth * (discrepancyRatePct / 100));
  const monthlyHandlingHours = Math.round((monthlyDiscrepancies * handlingTimeMinutes) / 60);
  const annualHandlingCostCHF = Math.round(monthlyHandlingHours * 12 * hourlyRateCHF);
  const estimatedSavingsCHF = Math.round(annualHandlingCostCHF * 0.85); // 85% time & cost savings

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) {
      setFormError('Bitte geben Sie Ihre E-Mail-Adresse ein.');
      return;
    }
    if (!ndaAccepted) {
      setFormError('Bitte akzeptieren Sie die Vertraulichkeitsvereinbarung (NDA).');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-[#142032] overflow-x-hidden font-sans">
      {/* 1. HERO SECTION */}
      <section id="start" className="relative min-h-[600px] pt-10 pb-16 lg:py-20 bg-gradient-to-b from-white via-[#f7fbf9] to-white border-b border-[#e2e7e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 text-center lg:text-left rtl:lg:text-right space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#eef8f3] border border-[#d6ebe1] px-4 py-1.5 rounded-full text-xs font-bold text-[#2d5c46]">
                <Sparkles className="w-4 h-4 text-[#3d9970]" />
                <span>Intelligente Rechnungsprüfung für Unternehmen</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-[#08271e] leading-[1.08]">
                <span>Sparen Sie bis zu </span>
                <span className="text-[#3d9970]">90% Zeit</span>
                <span className="block">bei der Rechnungsprüfung.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                klar solution prüft Rechnungen, Bestellungen und weitere Belege nachvollziehbar, erklärt Abweichungen und zeigt die nächsten Schritte. Ihr Team behält die Entscheidung.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuoteWithNotes()}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#08271e] via-[#123d2e] to-[#245f49] hover:from-[#123d2e] hover:to-[#3d9970] text-white font-extrabold text-base shadow-xl hover:translate-y-[-2px] transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <span>Kundenbereich / Live-Dashboard →</span>
                </button>
                <a
                  href="#funktion"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl border border-gray-300 text-gray-800 font-bold text-base hover:bg-gray-50 transition-colors text-center"
                >
                  Funktionen entdecken ›
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-600">
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3.5 py-1.5 rounded-full">✓ Entwickelt in der Schweiz</span>
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3.5 py-1.5 rounded-full">✓ DSGVO-konform</span>
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3.5 py-1.5 rounded-full">✓ Nachvollziehbar dokumentierte Befunde</span>
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3.5 py-1.5 rounded-full">✓ Sie behalten die Freigabe</span>
              </div>
            </div>

            {/* Right Interactive Live Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dce8e2] shadow-2xl space-y-4 hover:shadow-emerald-900/10 transition-shadow">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="font-extrabold text-sm text-[#08271e]">Beispiel: Preisabweichung</span>
                  <span className="text-[11px] font-bold text-[#3d9970] bg-[#eef8f3] px-2.5 py-1 rounded-full border border-[#cbe4d7]">
                    Live-Abgleich
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between items-center p-3 bg-[#f7faf8] rounded-xl border border-gray-100">
                    <span className="text-gray-600 font-sans">Bestellung (PO-88204)</span>
                    <span className="font-extrabold text-[#08271e]">CHF 11'800.00</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#fdf4f0] rounded-xl border border-[#f3ded3]">
                    <span className="text-gray-700 font-sans">Rechnung (INV-2026-904)</span>
                    <span className="font-extrabold text-[#df6029]">CHF 12'400.00</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#fff6ea] rounded-xl border border-[#f2e2c1]">
                    <span className="font-bold text-[#8a5a10] font-sans">⚠ Erkannte Preisdifferenz</span>
                    <span className="font-extrabold text-[#8a5a10]">+ CHF 600.00</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 italic pt-1 leading-snug">
                  Automatischer 3-Wege-Abgleich erkennt Preisaufschläge vor Auszahlung und empfiehlt Zahlungsstopp oder Reklamation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LÖSUNG (#problem) */}
      <section id="problem" className="py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#3d9970]">
              Lösung & Mehrwert
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032] leading-tight">
              Fehlerhafte Lieferantenrechnungen fallen nicht immer auf.
              <span className="text-[#3d9970] block">Sie kosten trotzdem Zeit und Geld.</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Im Tagesgeschäft bleibt selten Zeit, jede Lieferantenrechnung im Detail mit Bestellung und Lieferschein abzugleichen. Abweichungen bleiben unbemerkt und erhöhen Ihre Beschaffungskosten schleichend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-lg text-[#142032]">Viele Rechnungen, wenig Zeit</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Manuelle Prüfungen erfassen selten alle Einzelpositionen, Mengenstufen oder geänderten IBAN-Verbindungen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-lg text-[#142032]">Preis- & Mengenabweichungen</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Berechnete Einzelpreise weichen von Rahmenverträgen ab oder Teillieferungen werden als Vollmenge abgerechnet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-lg text-[#142032]">Unbemerkte Doppelabrechnungen</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rechnungen werden nach Wochen erneut eingereicht oder Mahnspesen ohne vertragliche Grundlage aufgeschlagen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FUNKTIONEN (#funktion) */}
      <section id="funktion" className="py-16 lg:py-20 bg-[#f7f9f8] border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              Funktionen
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              Der automatisierte 3-Wege-Abgleich
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              klar solution vergleicht die Rechnung parallel mit der Bestellung (PO) und dem Lieferschein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-[#eef8f3] text-[#3d9970] rounded-xl w-fit">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#142032]">OCR & Beleg-Extraktion</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Erfasst Kopfdaten, Zeilenpositionen, MWST-Sätze und IBAN-Daten aus PDFs und Scans in Sekunden.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-[#eef8f3] text-[#3d9970] rounded-xl w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#142032]">3-Wege-Plausibilität</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Automatische Abstimmung zwischen Rechnung, Bestellung (PO) und Wareneingangsnachweis (Lieferschein).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-[#fff3e6] text-[#df6029] rounded-xl w-fit">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#142032]">Duplikats- & IBAN-Warnung</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Schützt vor doppelten Zahlungen und schlägt Alarm bei unbekannten oder geänderten Bankverbindungen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-[#eef8f3] text-[#3d9970] rounded-xl w-fit">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#142032]">Gutschrift- & OR-Vorlagen</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Generiert kaufmännische Mängelrügen nach Schweizer Obligationenrecht (OR Art. 82/107) auf Knopfdruck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABLAUF (#ablauf) */}
      <section id="ablauf" className="py-16 lg:py-20 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              Ablauf
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              In 5 Schritten zur revisionssicheren Belegprüfung
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="p-5 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#08271e] text-white font-extrabold text-xs flex items-center justify-center mx-auto">
                1
              </span>
              <h3 className="font-bold text-sm text-[#142032]">Beleg hochladen</h3>
              <p className="text-[11px] text-gray-500">PDF per Drag & Drop oder ERP-Schnittstelle übermitteln.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#08271e] text-white font-extrabold text-xs flex items-center justify-center mx-auto">
                2
              </span>
              <h3 className="font-bold text-sm text-[#142032]">OCR-Extraktion</h3>
              <p className="text-[11px] text-gray-500">Kopf- und Positionsdaten automatisch strukturiert auslesen.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#08271e] text-white font-extrabold text-xs flex items-center justify-center mx-auto">
                3
              </span>
              <h3 className="font-bold text-sm text-[#142032]">3-Wege-Abgleich</h3>
              <p className="text-[11px] text-gray-500">Mengen, Einzelpreise und MWST mit PO & Lieferschein abgleichen.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f7f9f8] border border-gray-200 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#fdf0ea] border border-[#f5d0bc] text-[#df6029] font-extrabold text-xs flex items-center justify-center mx-auto">
                4
              </span>
              <h3 className="font-bold text-sm text-[#142032]">Befund-Analyse</h3>
              <p className="text-[11px] text-gray-500">Erkannte Abweichungen transparent im Dashboard anzeigen.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#eef8f3] border border-[#3d9970]/30 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#3d9970] text-white font-extrabold text-xs flex items-center justify-center mx-auto">
                5
              </span>
              <h3 className="font-bold text-sm text-[#08271e]">Freigabe / Rüge</h3>
              <p className="text-[11px] text-gray-600">Freigeben, Rückfrage halten oder Reklamation generieren.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ROI CALCULATOR (#roi) */}
      <section id="roi" className="py-16 lg:py-24 bg-[#08271e] text-white border-b border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-extrabold text-[#86c8aa] uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>ROI-Rechner für Rechnungsprüfung</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Berechnen Sie Ihr Einsparpotenzial
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Ermitteln Sie die jährlichen Bearbeitungskosten und die Einsparung durch automatisierten 3-Wege-Abgleich.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10">
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Input 1: Rechnungen pro Monat */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>Rechnungen pro Monat:</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">{invoicesPerMonth} Belege</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={invoicesPerMonth}
                  onChange={(e) => setInvoicesPerMonth(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>

              {/* Input 2: Anteil mit Abweichungen % */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>Anteil mit Abweichungen (%):</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">{discrepancyRatePct}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={discrepancyRatePct}
                  onChange={(e) => setDiscrepancyRatePct(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>

              {/* Input 3: Bearbeitungszeit pro Abweichung (Min) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>Bearbeitungszeit pro Abweichung (Min):</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">{handlingTimeMinutes} Min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={handlingTimeMinutes}
                  onChange={(e) => setHandlingTimeMinutes(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>

              {/* Input 4: Stundensatz (CHF) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>Stundensatz Mitarbeiter (CHF):</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">CHF {hourlyRateCHF} / Std</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="250"
                  step="5"
                  value={hourlyRateCHF}
                  onChange={(e) => setHourlyRateCHF(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Outputs Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#123d2e] to-[#08271e] p-6 sm:p-8 rounded-2xl border border-[#3d9970]/30 shadow-2xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#86c8aa]">
                  Geschätztes Einsparpotenzial / Jahr
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  CHF {estimatedSavingsCHF.toLocaleString('de-CH')}
                </div>
                <span className="text-[11px] text-gray-300 block">
                  ~ 85% Reduktion manueller Prüf- und Korrekturkosten
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-300 block">Bearbeitungszeit / Monat</span>
                  <span className="text-xl font-bold text-[#86c8aa] font-mono">{monthlyHandlingHours} Std</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-300 block">Prüfkosten pro Jahr</span>
                  <span className="text-xl font-bold text-[#86c8aa] font-mono">CHF {annualHandlingCostCHF.toLocaleString('de-CH')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes(`ROI Berechnung: ${invoicesPerMonth} Belege/Monat`)}
                className="w-full py-3.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-xs shadow-lg transition-all"
              >
                Kundenbereich mit diesen Daten testen →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PAKETE (#pakete) */}
      <section id="pakete" className="py-16 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              Pakete & Abo-Preise
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              Transparente Tarife ohne versteckte Gebühren
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Wählen Sie das passende Monatspaket für Ihr Belegvolumen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Package 1: CHECK */}
            <div className="p-8 rounded-3xl border border-gray-200 bg-white flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">Starter</span>
                <h3 className="text-2xl font-serif font-bold text-[#142032]">CHECK</h3>
                <div className="text-3xl font-extrabold text-[#08271e] font-mono">
                  CHF 49 <span className="text-xs font-normal text-gray-500">/ Monat</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                  Bis 55 Rechnungen / Monat
                </p>
                <ul className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Automatische Rechnungsprüfung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Betrags- & Summenprüfung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Schweizer MWST-Plausibilität</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Automatische Duplikaterkennung</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Paket: CHECK (CHF 49/Monat)')}
                className="w-full py-3 rounded-xl border border-[#08271e] text-[#08271e] font-bold text-xs hover:bg-[#eef8f3] transition-colors"
              >
                Paket wählen
              </button>
            </div>

            {/* Package 2: PROTECT (Featured / Am beliebtesten) */}
            <div className="p-8 rounded-3xl border-2 border-[#3d9970] bg-[#08271e] text-white flex flex-col justify-between space-y-6 shadow-2xl relative">
              <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#3d9970] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Am beliebtesten
              </span>
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-[#86c8aa] uppercase tracking-widest block">Pro Standard</span>
                <h3 className="text-2xl font-serif font-bold text-white">PROTECT</h3>
                <div className="text-3xl font-extrabold text-[#86c8aa] font-mono">
                  CHF 99 <span className="text-xs font-normal text-gray-300">/ Monat</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                  71 bis 120 Rechnungen / Monat
                </p>
                <ul className="space-y-2.5 text-xs text-gray-200 pt-4 border-t border-white/10">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#86c8aa]" /> Alles aus Paket CHECK</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#86c8aa]" /> Automatische Prüfung vor Zahlung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#86c8aa]" /> Preis- & Mengenabweichungserkennung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#86c8aa]" /> IBAN-Änderungswarnungen</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Paket: PROTECT (CHF 99/Monat)')}
                className="w-full py-3.5 rounded-xl bg-[#3d9970] hover:bg-[#2f815f] text-white font-extrabold text-sm shadow-lg transition-all"
              >
                Jetzt starten →
              </button>
            </div>

            {/* Package 3: CONTROL */}
            <div className="p-8 rounded-3xl border border-gray-200 bg-white flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">Enterprise</span>
                <h3 className="text-2xl font-serif font-bold text-[#142032]">CONTROL</h3>
                <div className="text-3xl font-extrabold text-[#08271e] font-mono">
                  Auf Anfrage
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                  Große Belegvolumina & ERP-Integration
                </p>
                <ul className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Gesamter Prüf- und Freigabeprozess</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> 3-Wege-Abgleich (Rechnung vs. PO vs. Lieferschein)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> ERP-Anbindung (Abacus, SAP, Bexio, Sage)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Dedizierter Revisions-Ansprechpartner</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Paket: CONTROL (Auf Anfrage)')}
                className="w-full py-3 rounded-xl border border-[#08271e] text-[#08271e] font-bold text-xs hover:bg-[#eef8f3] transition-colors"
              >
                Angebot anfragen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KONTAKT (#kontakt) WITH NDA ACCEPTANCE CHECKBOX */}
      <section id="kontakt" className="py-16 lg:py-24 bg-[#f7f9f8] border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Company Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
                Kontakt & Firmensitz
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
                Sprechen Sie mit unserem Revisions-Team
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Rufen Sie uns an oder senden Sie Ihre Nachricht. Wir beraten Sie persönlich zu Ihren Prüfprozessen.
              </p>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[#3d9970]" />
                  <div>
                    <span className="font-extrabold text-sm block text-[#142032]">klar solution – Smart Grid AG</span>
                    <span className="text-gray-500">In der Au 44, 8706 Meilen, Schweiz</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <Phone className="w-4 h-4 text-[#3d9970]" />
                  <a href="tel:+41445897288" className="hover:text-[#3d9970] text-sm font-bold">
                    044 589 72 88
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#3d9970]" />
                  <a href="mailto:info@klarsolution.com" className="hover:text-[#3d9970]">
                    info@klarsolution.com
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#142032]">Prüfung anfragen</h3>
                <p className="text-xs text-gray-500 mt-1">Kurze Angaben genügen – wir melden uns umgehend.</p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#eef8f3] border border-[#d6ebe1] text-[#2d7d5d] space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-[#3d9970]" />
                  <h4 className="font-extrabold text-base">Vielen Dank! Ihre Anfrage wurde übermittelt.</h4>
                  <p className="text-xs leading-relaxed">
                    Unser Revisions-Team hat Ihre Nachricht erhalten und setzt sich innerhalb von 24 Stunden mit Ihnen in Verbindung.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Name (optional)</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ihr Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3d9970] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Ihre E-Mail *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="ihre.email@unternehmen.ch"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3d9970] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nachricht (optional)</label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Kurze Beschreibung Ihres Belegvolumens oder Anliegens..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3d9970] focus:outline-none"
                    />
                  </div>

                  {/* Mandatory NDA Acceptance Checkbox */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f7f9f8] border border-gray-200 cursor-pointer text-xs text-gray-700 font-medium">
                    <input
                      type="checkbox"
                      checked={ndaAccepted}
                      onChange={(e) => setNdaAccepted(e.target.checked)}
                      className="mt-0.5 accent-[#3d9970] w-4 h-4 rounded"
                    />
                    <span>
                      Ich akzeptiere die{' '}
                      <a href="#nda" className="text-[#3d9970] font-bold underline">
                        Vertraulichkeitsvereinbarung (NDA)
                      </a>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#08271e] hover:bg-[#123d2e] text-white font-extrabold text-sm shadow-lg transition-all"
                  >
                    Prüfung jetzt anfragen →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESTORED 4-COLUMN FOOTER */}
      <Footer
        currentLang={currentLang}
        onRequestQuote={() => onRequestQuoteWithNotes()}
      />
    </div>
  );
};
