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

  // Interactive Calculator State
  const [invoiceVolume, setInvoiceVolume] = useState<number>(350); // Monatsvolumen
  const [avgInvoiceAmount, setAvgInvoiceAmount] = useState<number>(3200); // CHF
  const [estimatedErrorRate, setEstimatedErrorRate] = useState<number>(1.8); // %
  const [hourlyRate, setHourlyRate] = useState<number>(110); // CHF/Std

  // Calculator calculations
  const totalAnnualBilled = invoiceVolume * avgInvoiceAmount * 12;
  const annualRecoverableLoss = Math.round(totalAnnualBilled * (estimatedErrorRate / 100));
  const annualHoursSaved = Math.round((invoiceVolume * 12 * 8) / 60); // ~8 min saved per invoice
  const annualTimeSavingsCHF = annualHoursSaved * hourlyRate;
  const netEstimatedBenefit = annualRecoverableLoss + annualTimeSavingsCHF;

  // FAQ open states
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-white text-[#142032] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section id="start" className="relative min-h-[640px] pt-12 pb-16 lg:py-20 bg-gradient-to-b from-white via-[#f7fbf9] to-white border-b border-[#e2e7e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 text-center lg:text-left rtl:lg:text-right space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#eef8f3] border border-[#d6ebe1] px-4 py-1.5 rounded-full text-xs font-bold text-[#2d5c46]">
                <Sparkles className="w-4 h-4 text-[#3d9970]" />
                <span>{t.heroEyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-[#08271e] leading-[1.08]">
                <span className="text-[#3d9970] block">{t.heroHeading1}</span>
                <span>{t.heroHeading2}</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.heroLead}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuoteWithNotes()}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#245f49] via-[#2f815f] to-[#3d9970] text-white font-extrabold text-base shadow-xl hover:translate-y-[-2px] transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <span>{t.heroCtaPrimary}</span>
                </button>
                <a
                  href="#funktion"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl border border-gray-300 text-gray-800 font-bold text-base hover:bg-gray-50 transition-colors text-center"
                >
                  {t.heroCtaSecondary}
                </a>
              </div>

              {/* Trust Features List */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-500">
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3 py-1.5 rounded-full">{t.trustNoObligation}</span>
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3 py-1.5 rounded-full">{t.trustSwissCompany}</span>
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3 py-1.5 rounded-full">{t.trustDocumentedFindings}</span>
                <span className="bg-[#f4f8f6] border border-[#dbe9e2] px-3 py-1.5 rounded-full">{t.trustYouDecide}</span>
              </div>
            </div>

            {/* Right Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dce8e2] shadow-2xl space-y-4 hover:shadow-emerald-900/10 transition-shadow">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="font-extrabold text-sm text-[#08271e]">{t.sampleTitle}</span>
                  <span className="text-[11px] font-bold text-[#3d9970] bg-[#eef8f3] px-2.5 py-1 rounded-full border border-[#cbe4d7]">
                    {t.sampleBadge}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center p-3 bg-[#f7faf8] rounded-xl border border-gray-100">
                    <span className="text-gray-600">{t.samplePoAmount}</span>
                    <span className="font-extrabold text-[#08271e]">CHF 11'800.00</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#fdf4f0] rounded-xl border border-[#f3ded3]">
                    <span className="text-gray-700">{t.sampleInvoiceAmount}</span>
                    <span className="font-extrabold text-[#df6029]">CHF 12'400.00</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#fff6ea] rounded-xl border border-[#f2e2c1]">
                    <span className="font-bold text-[#8a5a10]">{t.sampleVarianceFound}</span>
                    <span className="font-extrabold text-[#8a5a10]">+ CHF 600.00</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 italic pt-1 leading-snug">
                  {t.sampleNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THOROUGH AUDIT SHOWCASE */}
      <section className="py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold tracking-wider uppercase text-[#3d9970]">
                {t.thoroughEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032] leading-tight">
                {t.thoroughTitle}
                <span className="text-[#3d9970]">{t.thoroughTitleAccent}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t.thoroughText}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onRequestQuoteWithNotes()}
                  className="px-6 py-3 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>{t.heroCtaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3] bg-gradient-to-br from-[#08271e] to-[#142032] p-8 text-white flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#86c8aa]">
                    <FileCheck2 className="w-4 h-4" />
                    <span>Systematischer Belegabgleich</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold">Transparente Dokumentation aller Abweichungen</h3>
                  <p className="text-sm text-gray-300">
                    Jede festgestellte Preis- oder Mengenabweichung wird einzeln mit den betroffenen Lieferscheinen und Bestellungen hinterlegt.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-center">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="block text-xl font-extrabold text-[#86c8aa]">100%</span>
                    <span className="text-[11px] text-gray-300">Prüfquote</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="block text-xl font-extrabold text-[#86c8aa]">0 CHF</span>
                    <span className="text-[11px] text-gray-300">Unentdeckte Falschabrechnung</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="block text-xl font-extrabold text-[#86c8aa]">24h</span>
                    <span className="text-[11px] text-gray-300">Erstanalyse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM & IMPACT SECTION */}
      <section id="problem" className="py-16 lg:py-24 bg-[#f7f9f8] border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
                {t.whyEyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032] leading-tight">
                {t.whyTitleLine1} <br />
                <span className="text-[#3d9970]">{t.whyTitleLine2}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t.whyLead}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="w-8 h-8 rounded-lg bg-[#eef8f3] text-[#3d9970] font-extrabold flex items-center justify-center text-sm">1</span>
                  <h3 className="font-bold text-base text-[#142032]">{t.whyReason1Title}</h3>
                  <p className="text-xs text-gray-600">{t.whyReason1Text}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="w-8 h-8 rounded-lg bg-[#eef8f3] text-[#3d9970] font-extrabold flex items-center justify-center text-sm">2</span>
                  <h3 className="font-bold text-base text-[#142032]">{t.whyReason2Title}</h3>
                  <p className="text-xs text-gray-600">{t.whyReason2Text}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="w-8 h-8 rounded-lg bg-[#eef8f3] text-[#3d9970] font-extrabold flex items-center justify-center text-sm">3</span>
                  <h3 className="font-bold text-base text-[#142032]">{t.whyReason3Title}</h3>
                  <p className="text-xs text-gray-600">{t.whyReason3Text}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="w-8 h-8 rounded-lg bg-[#eef8f3] text-[#3d9970] font-extrabold flex items-center justify-center text-sm">4</span>
                  <h3 className="font-bold text-base text-[#142032]">{t.whyReason4Title}</h3>
                  <p className="text-xs text-gray-600">{t.whyReason4Text}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#08271e] text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 text-[#86c8aa]">{t.whyImpactTitle}</h3>

              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#86c8aa] block">{t.whyImpact1Title}</span>
                  <p className="text-sm text-gray-300 leading-snug">{t.whyImpact1Text}</p>
                </div>
                <div className="border-b border-white/10 pb-4 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#86c8aa] block">{t.whyImpact2Title}</span>
                  <p className="text-sm text-gray-300 leading-snug">{t.whyImpact2Text}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#86c8aa] block">{t.whyImpact3Title}</span>
                  <p className="text-sm text-gray-300 leading-snug">{t.whyImpact3Text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE AUDIT & DOCUMENT MATCHING */}
      <section id="funktion" className="py-16 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              {t.whatEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              {t.whatTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t.whatLead}
            </p>
          </div>

          {/* 5 Audit Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-left rtl:text-right space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-lg">⧉</div>
              <h3 className="font-bold text-base text-[#142032]">{t.pillar1Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.pillar1Text}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-left rtl:text-right space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-lg">≠</div>
              <h3 className="font-bold text-base text-[#142032]">{t.pillar2Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.pillar2Text}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-left rtl:text-right space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-lg">#</div>
              <h3 className="font-bold text-base text-[#142032]">{t.pillar3Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.pillar3Text}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-left rtl:text-right space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-lg">∑</div>
              <h3 className="font-bold text-base text-[#142032]">{t.pillar4Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.pillar4Text}</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm text-left rtl:text-right space-y-3 hover:border-[#3d9970] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-lg">§</div>
              <h3 className="font-bold text-base text-[#142032]">{t.pillar5Title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t.pillar5Text}</p>
            </div>
          </div>

          {/* Document Matching Grid */}
          <div className="bg-[#f7f9f8] p-8 rounded-3xl border border-gray-200 text-left rtl:text-right space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#eef8f3] rounded-xl text-[#3d9970]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#142032]">{t.docMatchTitle}</h3>
                <p className="text-sm text-gray-600">{t.docMatchText}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-sm text-[#142032]">{t.docMatch1Title}</h4>
                <p className="text-xs text-gray-600">{t.docMatch1Text}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-sm text-[#142032]">{t.docMatch2Title}</h4>
                <p className="text-xs text-gray-600">{t.docMatch2Text}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-sm text-[#142032]">{t.docMatch3Title}</h4>
                <p className="text-xs text-gray-600">{t.docMatch3Text}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-sm text-[#142032]">{t.docMatch4Title}</h4>
                <p className="text-xs text-gray-600">{t.docMatch4Text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section id="nutzen" className="py-16 lg:py-24 bg-[#eef8f3] border-b border-[#d6ebe1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              {t.benefitEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              {t.benefitTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t.benefitLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left rtl:text-right">
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-xl">⌕</div>
              <h3 className="text-lg font-bold text-[#142032]">{t.benefitCard1Title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t.benefitCard1Text}</p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-xl">↓</div>
              <h3 className="text-lg font-bold text-[#142032]">{t.benefitCard2Title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t.benefitCard2Text}</p>
            </div>
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold text-xl">✓</div>
              <h3 className="text-lg font-bold text-[#142032]">{t.benefitCard3Title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t.benefitCard3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS STEPS */}
      <section id="ablauf" className="py-16 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              {t.processEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              {t.processTitle}
            </h2>
          </div>

          {/* 5 Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#3d9970] bg-white text-[#3d9970] font-extrabold text-lg flex items-center justify-center mx-auto shadow-sm">1</div>
              <h3 className="font-bold text-base text-[#142032]">{t.step1Title}</h3>
              <p className="text-xs text-gray-600">{t.step1Text}</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#3d9970] bg-white text-[#3d9970] font-extrabold text-lg flex items-center justify-center mx-auto shadow-sm">2</div>
              <h3 className="font-bold text-base text-[#142032]">{t.step2Title}</h3>
              <p className="text-xs text-gray-600">{t.step2Text}</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#3d9970] bg-white text-[#3d9970] font-extrabold text-lg flex items-center justify-center mx-auto shadow-sm">3</div>
              <h3 className="font-bold text-base text-[#142032]">{t.step3Title}</h3>
              <p className="text-xs text-gray-600">{t.step3Text}</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#3d9970] bg-white text-[#3d9970] font-extrabold text-lg flex items-center justify-center mx-auto shadow-sm">4</div>
              <h3 className="font-bold text-base text-[#142032]">{t.step4Title}</h3>
              <p className="text-xs text-gray-600">{t.step4Text}</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#3d9970] bg-[#3d9970] text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md">5</div>
              <h3 className="font-bold text-base text-[#142032]">{t.step5Title}</h3>
              <p className="text-xs text-gray-600">{t.step5Text}</p>
            </div>
          </div>

          {/* Sample Finding Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div className="p-6 bg-[#f7f9f8] rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-bold text-base text-[#142032]">{t.examplePanelTitle}</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between p-3 bg-white rounded-xl border border-gray-100">
                  <span>🛒 Bestellmenge</span>
                  <strong className="text-[#142032]">100 Stück</strong>
                </div>
                <div className="flex justify-between p-3 bg-white rounded-xl border border-gray-100">
                  <span>◇ Lieferschein</span>
                  <strong className="text-[#3d9970]">100 Stück</strong>
                </div>
                <div className="flex justify-between p-3 bg-[#fff3e6] text-[#df6029] rounded-xl border border-[#f5d0bc] font-bold">
                  <span>▱ Rechnung</span>
                  <span>120 Stück</span>
                </div>
                <div className="flex justify-between p-3 bg-[#fff3e6] text-[#df6029] rounded-xl border border-[#f5d0bc] font-extrabold">
                  <span>⚠ Abweichung</span>
                  <span>+ 20 Stück</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-bold text-base text-[#142032]">{t.findingPanelTitle}</h3>
              <div className="p-4 bg-[#eef8f3] border border-[#d6ebe1] rounded-xl space-y-1">
                <span className="text-[11px] font-extrabold text-[#3d9970] uppercase tracking-wider">{t.findingBadge}</span>
                <p className="text-xs sm:text-sm text-gray-800 leading-snug">{t.findingText}</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#dff1e8] text-[#2d7d5d] flex items-center justify-center font-bold flex-shrink-0">→</div>
                <div>
                  <strong className="block text-sm text-[#142032]">{t.nextStepsTitle}</strong>
                  <p className="text-xs text-gray-600 mt-1">{t.nextStepsText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & TIERS */}
      <section id="pricing" className="py-16 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              {t.pricingEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              {t.pricingTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t.pricingLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl border border-gray-200 bg-white flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">Standard</span>
                <h3 className="text-2xl font-serif font-bold text-[#142032]">{t.pkgStarterTitle}</h3>
                <div className="text-3xl font-extrabold text-[#286e52]">{t.pkgStarterPrice}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{t.pkgStarterDesc}</p>
                <ul className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3d9970]" /> Bis 200 Rechnungen / Monat</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3d9970]" /> Preis- & Mengenprüfung</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3d9970]" /> Dokumentierter Befundbericht</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Starter Auditing Paket')}
                className="w-full py-3 rounded-xl border border-[#08271e] text-[#08271e] font-bold text-xs hover:bg-[#eef8f3] transition-colors"
              >
                Anfrage starten
              </button>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="p-8 rounded-3xl border-2 border-[#3d9970] bg-[#08271e] text-white flex flex-col justify-between space-y-6 shadow-2xl relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#3d9970] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                {t.pkgPopularBadge}
              </span>

              <div className="space-y-4 pt-2">
                <span className="text-xs font-extrabold text-[#86c8aa] uppercase tracking-widest block">Pro Business</span>
                <h3 className="text-2xl font-serif font-bold text-white">{t.pkgProTitle}</h3>
                <div className="text-3xl font-extrabold text-[#86c8aa]">{t.pkgProPrice}</div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.pkgProDesc}</p>
                <ul className="space-y-2.5 text-xs text-gray-200 pt-4 border-t border-white/10">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#86c8aa]" /> Bis 1,000 Rechnungen / Monat</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#86c8aa]" /> KI-Anomalie & VAT-Plausibilität</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#86c8aa]" /> Vorlagen für Lieferanten-Reklamation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#86c8aa]" /> Kundenportal & Export-Tools</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Professional Audit Paket')}
                className="w-full py-3.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-sm shadow-lg transition-all"
              >
                Anfrage starten →
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-3xl border border-gray-200 bg-white flex flex-col justify-between space-y-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">Enterprise</span>
                <h3 className="text-2xl font-serif font-bold text-[#142032]">{t.pkgEnterpriseTitle}</h3>
                <div className="text-3xl font-extrabold text-[#286e52]">{t.pkgEnterprisePrice}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{t.pkgEnterpriseDesc}</p>
                <ul className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3d9970]" /> Unbegrenztes Rechnungsvolumen</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3d9970]" /> SAP / Abacus / Bexio Integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3d9970]" /> Dedizierter Audit Specialist</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes('Enterprise Complete Paket')}
                className="w-full py-3 rounded-xl border border-[#08271e] text-[#08271e] font-bold text-xs hover:bg-[#eef8f3] transition-colors"
              >
                Anfrage starten
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE ROI CALCULATOR */}
      <section className="py-16 lg:py-24 bg-[#08271e] text-white border-b border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-extrabold text-[#86c8aa] uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>{t.calcEyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              {t.calcTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              {t.calcLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10">
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>{t.calcInvoiceVolume}</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">{invoiceVolume} Rechnungen</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={invoiceVolume}
                  onChange={(e) => setInvoiceVolume(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>{t.calcAvgAmount}</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">CHF {avgInvoiceAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="250"
                  value={avgInvoiceAmount}
                  onChange={(e) => setAvgInvoiceAmount(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>{t.calcErrorRate}</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">{estimatedErrorRate}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={estimatedErrorRate}
                  onChange={(e) => setEstimatedErrorRate(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span>{t.calcHourlyRate}</span>
                  <span className="text-[#86c8aa] font-extrabold text-base">CHF {hourlyRate} / Std</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="250"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-[#3d9970] h-2 rounded-lg bg-white/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#123d2e] to-[#08271e] p-6 sm:p-8 rounded-2xl border border-[#3d9970]/30 shadow-2xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#86c8aa]">{t.calcEstLoss}</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  CHF {annualRecoverableLoss.toLocaleString()}
                </div>
                <span className="text-[11px] text-gray-400 block">Pro Jahr geschätzte Überzahlungen</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-300 block">{t.calcHoursSaved}</span>
                  <span className="text-xl font-bold text-[#86c8aa]">{annualHoursSaved} Std</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-300 block">{t.calcNetRoi}</span>
                  <span className="text-xl font-bold text-[#86c8aa]">~ {Math.round((annualRecoverableLoss / 5000) * 100)} %</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onRequestQuoteWithNotes(
                    `Einsparungsrechner Ergebnis: Monatsvolumen ${invoiceVolume} Rechnungen à CHF ${avgInvoiceAmount}, geschätztes Verlust-Potenzial: CHF ${annualRecoverableLoss.toLocaleString()} / Jahr.`
                  )
                }
                className="w-full py-3.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-sm shadow-xl transition-all"
              >
                {t.calcApplyButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="py-16 lg:py-24 bg-[#f7f9f8] border-b border-gray-200">
        <div className="max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              {t.faqEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              {t.faqTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t.faqLead}
            </p>
          </div>

          <div className="space-y-4">
            {[
              { q: t.faqQ1, a: t.faqA1 },
              { q: t.faqQ2, a: t.faqA2 },
              { q: t.faqQ3, a: t.faqA3 },
              { q: t.faqQ4, a: t.faqA4 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left ltr:text-left rtl:text-right font-serif font-bold text-lg text-[#142032] flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3d9970] transition-transform ${
                      faqOpenIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {faqOpenIndex === idx && (
                  <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. DIRECT CONTACT & QUOTE SECTION */}
      <section id="kontakt" className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#3d9970]">
              {t.contactEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142032]">
              {t.contactTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t.contactLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Direct Contact Info */}
            <div className="lg:col-span-5 bg-[#f7f9f8] p-8 rounded-3xl border border-gray-200 space-y-6">
              <h3 className="text-xl font-bold text-[#142032] border-b border-gray-200 pb-4">{t.contactDirectTitle}</h3>

              <div className="space-y-4">
                <a
                  href="tel:+41445897288"
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-[#3d9970] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-bold uppercase">Telefon Schweiz</span>
                    <strong className="text-base text-[#142032]">044 589 72 88</strong>
                  </div>
                </a>

                <a
                  href="mailto:info@klarsolution.com"
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-[#3d9970] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#eef8f3] text-[#3d9970] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-bold uppercase">E-Mail</span>
                    <strong className="text-base text-[#142032]">info@klarsolution.com</strong>
                  </div>
                </a>

                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-xs text-gray-400 block font-bold uppercase">Hauptsitz</span>
                  <strong className="text-sm text-[#142032] block">KlarSolution (Smart Grid AG)</strong>
                  <span className="text-xs text-gray-600 block">In der Au 44, 8706 Meilen, Schweiz</span>
                  <span className="text-[11px] text-gray-400 block pt-1">UID: CHE-442.994.102</span>
                </div>
              </div>
            </div>

            {/* Inline Quote Trigger Box */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-[#142032]">{t.contactFormTitle}</h3>
              <p className="text-sm text-gray-600">{t.contactFormHint}</p>

              <button
                type="button"
                onClick={() => onRequestQuoteWithNotes()}
                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#245f49] to-[#3d9970] text-white font-extrabold text-base shadow-xl hover:from-[#1a4a38] hover:to-[#2f8a68] transition-all flex items-center justify-center gap-2"
              >
                <span>{t.btnSubmitQuote}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#3d9970]" /> 100% Vertraulich</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#3d9970]" /> Schweizer NDA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LEGAL ACCORDIONS */}
      <section className="py-12 bg-[#f7f9f8] border-t border-gray-200 text-xs text-gray-600">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <details id="datenschutz" className="bg-white rounded-xl border border-gray-200 p-4">
            <summary className="font-bold cursor-pointer text-sm text-[#142032] select-none">
              {t.legalDatenschutzTitle}
            </summary>
            <div className="mt-4 space-y-2 leading-relaxed text-gray-600">
              <p>
                <strong>Verantwortliche Stelle:</strong> KlarSolution (Smart Grid AG), In der Au 44, 8706 Meilen, Schweiz.
              </p>
              <p>
                Wir verarbeiten Ihre Daten ausschliesslich zur Erfüllung Ihrer Anfrage und zur Durchführung der Kostenverlust-Prüfung gemäss dem Schweizer Datenschutzgesetz (DSG).
              </p>
            </div>
          </details>

          <details id="nda" className="bg-white rounded-xl border border-gray-200 p-4">
            <summary className="font-bold cursor-pointer text-sm text-[#142032] select-none">
              {t.legalNdaTitle}
            </summary>
            <div className="mt-4 space-y-2 leading-relaxed text-gray-600">
              <p>
                Alle übermittelten Lieferantenrechnungen, Verträge und Geschäftsdaten werden von KlarSolution streng vertraulich behandelt und ausschliesslich für die Analyse verwendet.
              </p>
            </div>
          </details>

          <details id="impressum" className="bg-white rounded-xl border border-gray-200 p-4">
            <summary className="font-bold cursor-pointer text-sm text-[#142032] select-none">
              {t.legalCompanyTitle}
            </summary>
            <div className="mt-4 space-y-2 leading-relaxed text-gray-600">
              <p>
                <strong>KlarSolution</strong> – Markenauftritt der Smart Grid AG<br />
                In der Au 44, 8706 Meilen, Schweiz<br />
                Büro: 044 589 72 88 | E-Mail: info@klarsolution.com<br />
                UID: CHE-442.994.102
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#08251d] text-[#aabbb4] py-8 text-xs border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>{t.footerCopyright}</span>
          <span>{t.footerSwitzerland}</span>
        </div>
      </footer>
    </div>
  );
};
