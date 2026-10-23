import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/translations';
import {
  ShieldAlert,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  AlertTriangle,
  Mail,
  Phone,
  Building2,
  Lock,
  Calculator,
  Sparkles,
  Check,
  Zap,
  X,
  RefreshCw,
  Sliders,
  CheckCircle,
  HelpCircle,
  FileText,
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

  // Interactive 3-Way-Matching Simulation Card State
  const [activeSimTab, setActiveSimTab] = useState<'price' | 'duplicate' | 'vat'>('price');

  const simData = {
    price: {
      title: 'Preisabweichung im Rahmenvertrag',
      supplier: 'Holzbaugruppe AG',
      invNo: 'INV-2026-9904',
      poNo: 'PO-88201',
      invAmount: 12420,
      poAmount: 12000,
      discrepancy: 420,
      badgeText: '⚠ Preisabweichung +CHF 420.00',
      reason: 'Pos. 3 (Eichenparkett Select) wurde zu CHF 142/m² statt CHF 135/m² (Rahmenvertrag) abgerechnet.',
    },
    duplicate: {
      title: 'Erkanntes Duplikat',
      supplier: 'Elektro Zürcher AG',
      invNo: 'INV-2026-3312',
      poNo: 'PO-77402',
      invAmount: 4850,
      poAmount: 4850,
      discrepancy: 4850,
      badgeText: '🚫 Duplikat erkannt (-CHF 4\'850.00)',
      reason: 'Identischer Betrag und IBAN wurden bereits am 12.02.2026 unter Beleg #INV-2026-3100 beglichen.',
    },
    vat: {
      title: 'MWST & QR-IBAN Unstimmigkeit',
      supplier: 'Sanitär Technik GmbH',
      invNo: 'INV-2026-1180',
      poNo: 'PO-90112',
      invAmount: 8900,
      poAmount: 8900,
      discrepancy: 720,
      badgeText: '⚡ Geänderter IBAN & MWST-Satz',
      reason: 'Empfänger-IBAN weicht vom Stammsatz ab (Sicherheitsrisiko) + MWST mit 8.1% statt 2.6% berechnet.',
    },
  };

  const currentSim = simData[activeSimTab];

  // Upgraded Interactive ROI Calculator State (Yokoy / Ramp style)
  const [invoicesPerMonth, setInvoicesPerMonth] = useState<number>(500); // 100 bis 10'000
  const [avgInvoiceAmount, setAvgInvoiceAmount] = useState<number>(1200); // CHF 200 bis CHF 20'000

  // Dynamic ROI Calculations
  // 1. Estimated hours saved per month: 0.25h (15 min) manual processing time per invoice * 85% automation
  const hoursSavedPerMonth = Math.round(invoicesPerMonth * 0.25 * 0.85);

  // 2. Prevented cost loss in CHF per year: ~2.5% industry average overcharges / duplicates / price markups
  const totalVolumeAnnual = invoicesPerMonth * avgInvoiceAmount * 12;
  const preventedCostLossAnnual = Math.round(totalVolumeAnnual * 0.025);

  // 3. Payback period in days: Annual software investment (~CHF 1'188) vs daily prevented loss
  const dailySavings = Math.max(1, preventedCostLossAnnual / 365);
  const paybackPeriodDays = Math.max(1, Math.round(1188 / dailySavings));

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
    <div className="w-full bg-white text-slate-900 overflow-x-hidden font-sans">
      {/* 1. MODERN HERO SECTION */}
      <section id="start" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-[#2d5c46] shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#3d9970]" />
                <span>Next-Gen B2B Rechnungsprüfung für die Schweiz</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                <span>Sparen Sie bis zu </span>
                <span className="bg-gradient-to-r from-[#3d9970] via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  90% Zeit
                </span>
                <span className="block">bei der Rechnungsprüfung.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                klar solution prüft Rechnungen, Bestellungen und weitere Belege nachvollziehbar, erklärt Abweichungen und zeigt die nächsten Schritte. Ihr Team behält die Entscheidung.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  type="button"
                  onClick={() => onRequestQuoteWithNotes('Hero CTA: Live Demo anfragen')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#08271e] via-[#123d2e] to-[#245f49] hover:from-[#123d2e] hover:to-[#3d9970] text-white font-extrabold text-sm sm:text-base shadow-xl hover:scale-[1.02] transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <span>Kundenbereich / Live Demo →</span>
                </button>
                <a
                  href="#roi"
                  className="w-full sm:w-auto px-6 py-4 rounded-full border border-slate-200 bg-white text-slate-800 font-bold text-sm sm:text-base hover:bg-slate-50 transition-colors text-center shadow-xs"
                >
                  ROI-Rechner testen ›
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold text-slate-600">
                <span className="bg-slate-100/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full">✓ Entwickelt in der Schweiz</span>
                <span className="bg-slate-100/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full">✓ DSGVO & Schweizer DSG</span>
                <span className="bg-slate-100/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full">✓ Revisionssicher</span>
                <span className="bg-slate-100/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full">✓ Volle Freigabekontrolle</span>
              </div>
            </div>

            {/* Right Interactive 3-Way-Matching Simulation Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="font-extrabold text-xs text-slate-200 uppercase tracking-wider">
                      Live 3-Way-Matching Simulation
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                    KI-Analyse aktiv
                  </span>
                </div>

                {/* Interactive Simulation Switcher Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveSimTab('price')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeSimTab === 'price'
                        ? 'bg-[#3d9970] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Preisabweichung
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSimTab('duplicate')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeSimTab === 'duplicate'
                        ? 'bg-[#3d9970] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Duplikat
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSimTab('vat')}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeSimTab === 'vat'
                        ? 'bg-[#3d9970] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MWST / IBAN
                  </button>
                </div>

                {/* Document Match Display */}
                <div className="space-y-2 text-xs font-mono">
                  {/* Purchase Order (PO) */}
                  <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <div>
                      <span className="text-slate-400 font-sans block text-[10px]">Bestellung ({currentSim.poNo})</span>
                      <span className="font-bold text-slate-200">{currentSim.supplier}</span>
                    </div>
                    <span className="font-extrabold text-emerald-400">
                      CHF {currentSim.poAmount.toLocaleString('de-CH')}.00
                    </span>
                  </div>

                  {/* Eingangsrechnung (Invoice) */}
                  <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                    <div>
                      <span className="text-slate-400 font-sans block text-[10px]">Rechnung ({currentSim.invNo})</span>
                      <span className="font-bold text-slate-200">Eingangsbeleg PDF</span>
                    </div>
                    <span className="font-extrabold text-amber-400">
                      CHF {currentSim.invAmount.toLocaleString('de-CH')}.00
                    </span>
                  </div>

                  {/* Flagged Real-time AI Discrepancy Card */}
                  <div className="p-3.5 bg-gradient-to-r from-amber-950/60 to-red-950/60 rounded-xl border border-amber-500/40 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 font-sans flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>KI-Befund</span>
                      </span>
                      <span className="font-extrabold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 text-[11px]">
                        {currentSim.badgeText}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      {currentSim.reason}
                    </p>
                  </div>
                </div>

                {/* Simulated Action Bar */}
                <div className="pt-1 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">Empfohlene Aktion:</span>
                  <button
                    type="button"
                    onClick={() => onRequestQuoteWithNotes(`Simulation Test: ${currentSim.title}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1"
                  >
                    <span>Mängelrüge generieren →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LÖSUNG (#problem) */}
      <section id="problem" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#3d9970]">
              Lösung & Mehrwert
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Fehlerhafte Lieferantenrechnungen fallen nicht immer auf.
              <span className="text-[#3d9970] block">Sie kosten trotzdem Zeit und Geld.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Im Tagesgeschäft bleibt selten Zeit, jede Lieferantenrechnung im Detail mit Bestellung und Lieferschein abzugleichen. Abweichungen bleiben unbemerkt und erhöhen Ihre Beschaffungskosten schleichend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-emerald-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-[#3d9970] flex items-center justify-center font-extrabold text-sm">
                01
              </div>
              <h3 className="font-bold text-lg text-slate-900">Viele Rechnungen, wenig Zeit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manuelle Prüfungen erfassen selten alle Einzelpositionen, Mengenstufen oder geänderten IBAN-Verbindungen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-emerald-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-[#3d9970] flex items-center justify-center font-extrabold text-sm">
                02
              </div>
              <h3 className="font-bold text-lg text-slate-900">Preis- & Mengenabweichungen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Berechnete Einzelpreise weichen von Rahmenverträgen ab oder Teillieferungen werden als Vollmenge abgerechnet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-emerald-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-[#3d9970] flex items-center justify-center font-extrabold text-sm">
                03
              </div>
              <h3 className="font-bold text-lg text-slate-900">Unbemerkte Doppelabrechnungen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rechnungen werden nach Wochen erneut eingereicht oder Mahnspesen ohne vertragliche Grundlage aufgeschlagen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FUNKTIONEN (#funktion) */}
      <section id="funktion" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3d9970]">
              Funktionen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Der automatisierte 3-Wege-Abgleich
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              klar solution vergleicht die Rechnung parallel mit der Bestellung (PO) und dem Lieferschein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-emerald-50 text-[#3d9970] rounded-xl w-fit">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">OCR & Beleg-Extraktion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Erfasst Kopfdaten, Zeilenpositionen, MWST-Sätze und IBAN-Daten aus PDFs und Scans in Sekunden.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-emerald-50 text-[#3d9970] rounded-xl w-fit">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">3-Wege-Plausibilität</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatische Abstimmung zwischen Rechnung, Bestellung (PO) und Wareneingangsnachweis (Lieferschein).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Duplikats- & IBAN-Warnung</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Schützt vor doppelten Zahlungen und schlägt Alarm bei unbekannten oder geänderten Bankverbindungen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="p-3 bg-emerald-50 text-[#3d9970] rounded-xl w-fit">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Gutschrift- & OR-Vorlagen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generiert kaufmännische Mängelrügen nach Schweizer Obligationenrecht (OR Art. 82/107) auf Knopfdruck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UPGRADED INTERACTIVE ROI CALCULATOR (#roi) */}
      <section id="roi" className="py-16 lg:py-28 bg-[#08271e] text-white border-b border-slate-800 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Interaktiver ROI-Rechner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Berechnen Sie Ihr Einsparpotenzial
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Ermitteln Sie mit 2 Reglern die gesparten Arbeitsstunden, den verhinderten Überzahlungsschaden und Ihre Amortisationszeit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-900/90 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            {/* Sliders Column */}
            <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
              {/* Slider 1: Monatliches Rechnungsvolumen */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-slate-300">Monatliches Rechnungsvolumen:</span>
                  <span className="text-emerald-400 font-mono text-base sm:text-lg font-extrabold bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                    {invoicesPerMonth.toLocaleString('de-CH')} Belege / Monat
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={invoicesPerMonth}
                  onChange={(e) => setInvoicesPerMonth(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2.5 rounded-lg bg-slate-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100 Belege</span>
                  <span>5'000 Belege</span>
                  <span>10'000 Belege</span>
                </div>
              </div>

              {/* Slider 2: Durchschnittlicher Rechnungsbetrag */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-slate-300">Durchschnittlicher Rechnungsbetrag:</span>
                  <span className="text-emerald-400 font-mono text-base sm:text-lg font-extrabold bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                    CHF {avgInvoiceAmount.toLocaleString('de-CH')}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="20000"
                  step="100"
                  value={avgInvoiceAmount}
                  onChange={(e) => setAvgInvoiceAmount(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2.5 rounded-lg bg-slate-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>CHF 200</span>
                  <span>CHF 10'000</span>
                  <span>CHF 20'000</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1 leading-relaxed">
                <span className="font-bold text-slate-200 block">💡 Berechnungsgrundlage:</span>
                <p>
                  Basiert auf durchschnittlich 2.5% unbemerkten Preisabweichungen/Duplikaten im Schweizer B2B-Handel sowie 85% Automatisierung der manuellen Prüfzeit.
                </p>
              </div>
            </div>

            {/* Dynamic Outputs Column (Yokoy / Ramp Style Cards) */}
            <div className="lg:col-span-6 bg-gradient-to-b from-[#123d2e] to-[#08271e] p-6 sm:p-8 rounded-2xl border border-[#3d9970]/40 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Metric 1: Prevented Cost Loss */}
                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block">
                    Verhinderter Überzahlungsschaden / Jahr
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    CHF {preventedCostLossAnnual.toLocaleString('de-CH')}
                  </div>
                  <span className="text-[11px] text-slate-300 block">
                    Schutz vor Preisaufschlägen, Doppelzahlungen & Mengenfehlern
                  </span>
                </div>

                {/* Metric 2 & 3 Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-300 block">Stunden gespart / Monat</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      ~ {hoursSavedPerMonth} Std
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-300 block">Amortisation (Payback)</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {paybackPeriodDays} {paybackPeriodDays === 1 ? 'Tag' : 'Tage'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onRequestQuoteWithNotes(
                    `ROI Berechnung: ${invoicesPerMonth} Belege/Monat @ CHF ${avgInvoiceAmount} Avg Betrag`
                  )
                }
                className="w-full py-4 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-sm shadow-xl transition-all hover:scale-[1.01]"
              >
                Mit diesen Daten kostenlos testen →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPETITOR COMPARISON TABLE (#vergleich) ("Warum Klar Solution?") */}
      <section id="vergleich" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3d9970]">
              Warum Klar Solution?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Der direkte Marktvergleich
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Sehen Sie auf einen Blick, wie Klar Solution im Vergleich zu manuellen Kontrollen und traditioneller OCR-Software abschneidet.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xl bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 sm:p-5 font-extrabold text-sm w-2/5">Prüfkriterium</th>
                  <th className="p-4 sm:p-5 font-extrabold text-sm text-center bg-[#3d9970] text-white w-1/5">
                    klar solution
                  </th>
                  <th className="p-4 sm:p-5 font-extrabold text-sm text-center w-1/5">
                    Manuelle Prüfung
                  </th>
                  <th className="p-4 sm:p-5 font-extrabold text-sm text-center w-1/5">
                    Traditionelle OCR
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {/* Criterion 1 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Automatischer 3-Wege-Abgleich (Rechnung vs. PO vs. Lieferschein)
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <span className="text-amber-600 font-bold text-xs">Teilweise</span>
                  </td>
                </tr>

                {/* Criterion 2 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Schweizer MWST- & QR-IBAN-Validierung
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <span className="text-amber-600 font-bold text-xs">Manuell</span>
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                </tr>

                {/* Criterion 3 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    ERP-Echtzeitabgleich (Abacus, SAP, Bexio, Sage)
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                  </td>
                </tr>

                {/* Criterion 4 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Automatische Mängelrüge (OR Art. 82/107)
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                  </td>
                </tr>

                {/* Criterion 5 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    KI-Duplikats- & Falschzahlungs-Erkennung
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/50">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <X className="w-5 h-5 text-slate-300 mx-auto" />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <span className="text-amber-600 font-bold text-xs">Selten</span>
                  </td>
                </tr>

                {/* Criterion 6 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Inbetriebnahme & Zeit bis ROI
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-emerald-50/50 font-extrabold text-emerald-700">
                    Sofort (5 Min)
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    Keine (Hohe Kosten)
                  </td>
                  <td className="p-4 sm:p-5 text-center text-slate-500">
                    3-6 Monate
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. PAKETE (#pakete) */}
      <section id="pakete" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3d9970]">
              Pakete & Abo-Preise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Transparente Tarife ohne versteckte Gebühren
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Wählen Sie das passende Monatspaket für Ihr Belegvolumen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Package 1: CHECK */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between space-y-6 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Starter</span>
                <h3 className="text-2xl font-bold text-slate-900">CHECK</h3>
                <div className="text-3xl font-extrabold text-[#08271e] font-mono">
                  CHF 49 <span className="text-xs font-normal text-slate-500">/ Monat</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Bis 55 Rechnungen / Monat
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Automatische Rechnungsprüfung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Betrags- & Summenprüfung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Schweizer MWST-Plausibilität</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Automatische Duplikaterkennung</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Paket: CHECK (CHF 49/Monat)')}
                className="w-full py-3 rounded-full border border-[#08271e] text-[#08271e] font-bold text-xs hover:bg-emerald-50 transition-colors"
              >
                Paket wählen
              </button>
            </div>

            {/* Package 2: PROTECT (Featured / Am beliebtesten) */}
            <div className="p-8 rounded-3xl border-2 border-[#3d9970] bg-[#08271e] text-white flex flex-col justify-between space-y-6 shadow-2xl relative">
              <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#3d9970] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                Am beliebtesten
              </span>
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block">Pro Standard</span>
                <h3 className="text-2xl font-bold text-white">PROTECT</h3>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                  CHF 99 <span className="text-xs font-normal text-slate-300">/ Monat</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  71 bis 120 Rechnungen / Monat
                </p>
                <ul className="space-y-2.5 text-xs text-slate-200 pt-4 border-t border-white/10">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Alles aus Paket CHECK</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Automatische Prüfung vor Zahlung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Preis- & Mengenabweichungserkennung</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> IBAN-Änderungswarnungen</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Paket: PROTECT (CHF 99/Monat)')}
                className="w-full py-3.5 rounded-full bg-[#3d9970] hover:bg-[#2f815f] text-white font-extrabold text-sm shadow-lg transition-all"
              >
                Jetzt starten →
              </button>
            </div>

            {/* Package 3: CONTROL */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between space-y-6 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Enterprise</span>
                <h3 className="text-2xl font-bold text-slate-900">CONTROL</h3>
                <div className="text-3xl font-extrabold text-[#08271e] font-mono">
                  Auf Anfrage
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Große Belegvolumina & ERP-Integration
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Gesamter Prüf- und Freigabeprozess</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> 3-Wege-Abgleich (Rechnung vs. PO vs. Lieferschein)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> ERP-Anbindung (Abacus, SAP, Bexio, Sage)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#3d9970]" /> Dedizierter Revisions-Ansprechpartner</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Paket: CONTROL (Auf Anfrage)')}
                className="w-full py-3 rounded-full border border-[#08271e] text-[#08271e] font-bold text-xs hover:bg-emerald-50 transition-colors"
              >
                Angebot anfragen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KONTAKT (#kontakt) WITH NDA ACCEPTANCE CHECKBOX */}
      <section id="kontakt" className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Company Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3d9970]">
                Kontakt & Firmensitz
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Sprechen Sie mit unserem Revisions-Team
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rufen Sie uns an oder senden Sie Ihre Nachricht. Wir beraten Sie persönlich zu Ihren Prüfprozessen.
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[#3d9970]" />
                  <div>
                    <span className="font-extrabold text-sm block text-slate-900">klar solution – Smart Grid AG</span>
                    <span className="text-slate-500">In der Au 44, 8706 Meilen, Schweiz</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <Phone className="w-4 h-4 text-[#3d9970]" />
                  <a href="tel:+41445897288" className="hover:text-[#3d9970] text-sm font-bold text-slate-900">
                    044 589 72 88
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#3d9970]" />
                  <a href="mailto:kontakt@klarsolution.ch" className="hover:text-[#3d9970] text-slate-800">
                    kontakt@klarsolution.ch
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Prüfung anfragen</h3>
                <p className="text-xs text-slate-500 mt-1">Kurze Angaben genügen – wir melden uns umgehend.</p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 animate-fadeIn">
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Name (optional)</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ihr Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#3d9970] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ihre E-Mail *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="ihre.email@unternehmen.ch"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#3d9970] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nachricht (optional)</label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Kurze Beschreibung Ihres Belegvolumens oder Anliegens..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#3d9970] focus:outline-none"
                    />
                  </div>

                  {/* Mandatory NDA Acceptance Checkbox */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={ndaAccepted}
                      onChange={(e) => setNdaAccepted(e.target.checked)}
                      className="mt-0.5 accent-[#3d9970] w-4 h-4 rounded"
                    />
                    <span>
                      Ich akzeptiere die Vertraulichkeitsvereinbarung (NDA) für Schweizer Belegdaten.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#08271e] hover:bg-[#123d2e] text-white font-extrabold text-sm shadow-lg transition-all"
                  >
                    Prüfung jetzt anfragen →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
