import React, { useState } from 'react';
import { useBilling, PlanTier, BillingCycle } from '../../context/BillingContext';
import { Language } from '../../types';
import {
  CreditCard,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  Download,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileText,
  AlertCircle,
  HelpCircle,
  X,
  Tag,
  RefreshCw,
  Search,
  ChevronRight,
  Sliders,
} from 'lucide-react';

interface BillingPageProps {
  currentLang?: Language;
}

export const BillingPage: React.FC<BillingPageProps> = ({ currentLang = 'de' }) => {
  const {
    plan,
    billingCycle,
    verifiedInvoicesCount,
    maxInvoicesLimit,
    renewalDate,
    paymentMethod,
    billingHistory,
    discountCode,
    discountPct,
    applyDiscountCode,
    updatePlan,
    updatePaymentMethod,
    downloadInvoicePDF,
  } = useBilling();

  // Tier Selector Cadence Toggle
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(billingCycle);

  // Upgrade Modal State
  const [upgradeModalPlan, setUpgradeModalPlan] = useState<PlanTier | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Form states for checkout
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<{ success: boolean; text: string } | null>(null);

  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [cardholderName, setCardholderName] = useState(paymentMethod.cardholderName);
  const [companyName, setCompanyName] = useState(paymentMethod.companyName);
  const [vatId, setVatId] = useState(paymentMethod.vatId);

  // Payment Method Edit Modal State
  const [editPaymentModalOpen, setEditPaymentModalOpen] = useState(false);
  const [editPaymentSuccess, setEditPaymentSuccess] = useState(false);

  // Receipt Search State
  const [receiptSearch, setReceiptSearch] = useState('');

  const plansList: {
    id: PlanTier;
    name: string;
    monthlyPrice: number;
    annualMonthlyPrice: number;
    badge?: string;
    description: string;
    invoicesLimitStr: string;
    features: string[];
  }[] = [
    {
      id: 'CHECK',
      name: 'Starter CHECK',
      monthlyPrice: 49,
      annualMonthlyPrice: 41.65,
      description: 'Automatische Belegprüfung für kleinere Schweizer KMU',
      invoicesLimitStr: 'Bis zu 55 Rechnungen / Monat',
      features: [
        'Automatische OCR & Rechnungsprüfung',
        'MWST & Formale Vollständigkeitsprüfung',
        'Historische Duplikaterkennung',
        'Standard Export für Abacus / Bexio',
        'E-Mail Support',
      ],
    },
    {
      id: 'PROTECT',
      name: 'Professional PROTECT',
      monthlyPrice: 99,
      annualMonthlyPrice: 84.15,
      badge: 'Beliebteste Wahl für KMU',
      description: 'Umfassender Schutz vor Überzahlungen & Preiserhöhungen',
      invoicesLimitStr: 'Bis zu 1,000 Rechnungen / Monat',
      features: [
        'Alles aus Starter CHECK',
        'Prüfung vor Freigabe & IBAN-Sicherheitswarnung',
        'Preis- & Mengenabweichungs-Erkennung',
        'Automatische Mahnschreiben (OR Art. 82/107)',
        'Echtzeit-Dashboard & Lieferanten-Risiko Scorecard',
        'Prioritärer Support & Telefon-Helpline',
      ],
    },
    {
      id: 'CONTROL',
      name: 'Enterprise CONTROL',
      monthlyPrice: 299,
      annualMonthlyPrice: 254.15,
      description: 'Volle Audit-Garantie & maßgeschneiderte ERP-Integrationen',
      invoicesLimitStr: 'Unbegrenzte Belege & Multi-Entity',
      features: [
        'Alles aus Professional PROTECT',
        '3-Wege-Abgleich (Rechnung vs. PO vs. Lieferschein)',
        'Direkte Bi-Direktionale SAP & Abacus Anbindung',
        'Dedizierter Swiss Senior Revisionsleiter',
        'Custom Audit Rules & Freigabe-Hierarchien',
        'Garantierte SLA & Service-Level Agreement',
      ],
    },
  ];

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput) return;
    const res = applyDiscountCode(voucherInput);
    setVoucherMsg({ success: res.success, text: res.message });
  };

  const handleExecuteUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upgradeModalPlan) return;

    setCheckoutLoading(true);
    // Simulate payment sequence
    try {
      await updatePlan(upgradeModalPlan, selectedCycle, {
        brand: 'Visa',
        last4: cardNumber.replace(/\s+/g, '').slice(-4) || '4242',
        expiryMonth: cardExpiry.split('/')[0] || '08',
        expiryYear: '20' + (cardExpiry.split('/')[1] || '28'),
        cardholderName,
        companyName,
        vatId,
      });
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setUpgradeModalPlan(null);
      }, 2500);
    } catch {
      setCheckoutLoading(false);
    }
  };

  const handleSavePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    updatePaymentMethod({
      cardholderName,
      companyName,
      vatId,
      last4: cardNumber.replace(/\s+/g, '').slice(-4) || '4242',
      expiryMonth: cardExpiry.split('/')[0] || '08',
      expiryYear: '20' + (cardExpiry.split('/')[1] || '28'),
    });
    setEditPaymentSuccess(true);
    setTimeout(() => {
      setEditPaymentSuccess(false);
      setEditPaymentModalOpen(false);
    }, 1500);
  };

  const filteredReceipts = billingHistory.filter(
    (r) =>
      r.number.toLowerCase().includes(receiptSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(receiptSearch.toLowerCase()) ||
      r.date.includes(receiptSearch)
  );

  const usagePercent = Math.min(100, Math.round((verifiedInvoicesCount / maxInvoicesLimit) * 100));

  return (
    <div className="space-y-8 animate-fadeIn text-[#142032]">
      {/* Top Page Title */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#142032]">Billing & Paket-Verwaltung</h1>
          <p className="text-xs text-slate-500 mt-1">
            Schweizer B2B-Rechnungsprüfung: Transparente Abonnemente, Quittungen & Vorsteuerabzug
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>MWST-Nummer: {paymentMethod.vatId} (Aktiv)</span>
          </span>
        </div>
      </div>

      {/* 1. CURRENT PLAN CARD & USAGE METRICS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#08271e] text-[#86c8aa] text-xs font-extrabold uppercase tracking-wider">
                Aktiver Tarif
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status: Aktiv</span>
              </span>
            </div>

            <h2 className="text-3xl font-serif font-extrabold text-[#142032]">
              {plansList.find((p) => p.id === plan)?.name || plan}
            </h2>

            <p className="text-xs text-slate-600 font-medium max-w-xl">
              Nächste automatische Verlängerung am <strong className="text-slate-900">{renewalDate}</strong> (
              {billingCycle === 'annual' ? 'Jährliche Abrechnung - 15% Rabatt' : 'Monatliche Abrechnung'}).
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => {
                const targetElem = document.getElementById('tier-selector-grid');
                targetElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Plan upgraden</span>
            </button>

            <button
              type="button"
              onClick={() => setEditPaymentModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200 flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-slate-600" />
              <span>Zahlungsmittel bearbeiten</span>
            </button>
          </div>
        </div>

        {/* Usage Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#3d9970]" />
              <span>Monatliches Belegkontingent</span>
            </span>
            <span className="font-mono text-slate-900">
              {verifiedInvoicesCount.toLocaleString()} / {maxInvoicesLimit.toLocaleString()} Rechnungen verifiziert ({usagePercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              style={{ width: `${usagePercent}%` }}
              className="h-full bg-gradient-to-r from-[#245f49] to-[#3d9970] rounded-full transition-all duration-500 shadow-xs"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium pt-1">
            <span>Verifizierte Belege im laufenden Abrechnungsmonat</span>
            <span className="text-[#3d9970] font-bold">✓ Ausreichendes Kontingent vorhanden</span>
          </div>
        </div>
      </div>

      {/* 2. TIER SELECTOR GRID */}
      <div id="tier-selector-grid" className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#142032]">
            Wählen Sie das passende Paket für Ihr Unternehmen
          </h2>
          <p className="text-xs text-slate-600">
            Alle Pakete beinhalten die automatische Schweizer MWST-Validierung und Duplikaterkennung.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-extrabold ${selectedCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monatlich zahlen
            </span>

            <button
              type="button"
              onClick={() => setSelectedCycle(selectedCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`w-14 h-8 rounded-full p-1 transition-colors relative border ${
                selectedCycle === 'annual' ? 'bg-[#08271e] border-[#3d9970]' : 'bg-slate-200 border-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                  selectedCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-xs font-extrabold flex items-center gap-1.5 ${selectedCycle === 'annual' ? 'text-[#3d9970]' : 'text-slate-500'}`}>
              <span>Jährlich zahlen</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                15% sparen
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plansList.map((item) => {
            const isCurrent = plan === item.id;
            const price = selectedCycle === 'annual' ? item.annualMonthlyPrice : item.monthlyPrice;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all relative ${
                  item.badge
                    ? 'border-2 border-[#3d9970] shadow-xl ring-2 ring-[#3d9970]/10'
                    : 'border border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {item.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#08271e] text-[#86c8aa] px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-[#3d9970]">
                    {item.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-[#142032]">{item.name}</h3>
                    <p className="text-xs text-slate-500 min-h-[32px]">{item.description}</p>
                  </div>

                  <div className="py-2 border-y border-slate-100 flex items-baseline gap-1">
                    <span className="text-3xl font-serif font-extrabold text-[#142032]">
                      CHF {price.toFixed(price % 1 === 0 ? 0 : 2)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ Monat</span>
                    {selectedCycle === 'annual' && (
                      <span className="text-[10px] text-emerald-700 font-bold ml-auto bg-emerald-50 px-2 py-0.5 rounded">
                        jährlich abgerechnet
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    {item.invoicesLimitStr}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#3d9970] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  {isCurrent ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs cursor-default text-center border border-slate-200"
                    >
                      ✓ Aktueller Tarif
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setUpgradeModalPlan(item.id);
                        setCheckoutSuccess(false);
                      }}
                      className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                        item.badge
                          ? 'bg-[#3d9970] hover:bg-[#2f8a68] text-white'
                          : 'bg-[#08271e] hover:bg-[#123d2e] text-white'
                      }`}
                    >
                      <span>Zu {item.name} wechseln</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PAYMENT METHOD MANAGEMENT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#142032]">Hinterlegtes Zahlungsmittel</h3>
            <p className="text-xs text-slate-500">Ihre hinterlegte Firmen-Kreditkarte für automatische Abrechnungen</p>
          </div>

          <button
            type="button"
            onClick={() => setEditPaymentModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200"
          >
            Zahlungsmittel bearbeiten
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Kreditkarte</span>
              <CreditCard className="w-5 h-5 text-[#3d9970]" />
            </div>
            <div className="font-mono font-extrabold text-base text-slate-900">
              {paymentMethod.brand} •••• {paymentMethod.last4}
            </div>
            <div className="text-xs text-slate-500 font-medium">Ablaufdatum: {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Karteninhaber</span>
              <Building className="w-5 h-5 text-slate-400" />
            </div>
            <div className="font-bold text-sm text-slate-900">{paymentMethod.cardholderName}</div>
            <div className="text-xs text-slate-500 font-medium">{paymentMethod.companyName}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Schweizer UID / MWST-Nr.</span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="font-mono font-extrabold text-sm text-slate-900">{paymentMethod.vatId}</div>
            <div className="text-xs text-emerald-700 font-bold">✓ Vorsteuerabzugsberechtigt (ESTV)</div>
          </div>
        </div>
      </div>

      {/* 4. INVOICES & RECEIPTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#142032]">Abrechnungshistorie & Quittungen</h3>
            <p className="text-xs text-slate-500">Ihre offiziellen Schweizer MWST-Rechnungen zum PDF-Download</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={receiptSearch}
              onChange={(e) => setReceiptSearch(e.target.value)}
              placeholder="Rechnung suchen..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#3d9970]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Datum</th>
                <th className="pb-3">Rechnungs-Nr.</th>
                <th className="pb-3">Beschreibung</th>
                <th className="pb-3">Betrag (CHF)</th>
                <th className="pb-3">MWST (8.1%)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredReceipts.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 text-slate-600">{rec.date}</td>
                  <td className="py-3.5 font-mono font-bold text-[#142032]">{rec.number}</td>
                  <td className="py-3.5 text-slate-800">{rec.description}</td>
                  <td className="py-3.5 font-mono font-bold text-slate-900">CHF {rec.amountCHF.toFixed(2)}</td>
                  <td className="py-3.5 font-mono text-slate-500">CHF {rec.vatCHF.toFixed(2)}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => downloadInvoicePDF(rec)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#3d9970] hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto border border-slate-200"
                      title="PDF Quittung drucken / herunterladen"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF Herunterladen</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: STRIPE ELEMENTS CHECKOUT & UPGRADE FLOW */}
      {upgradeModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setUpgradeModalPlan(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutSuccess ? (
              <div className="py-12 text-center space-y-4 animate-scaleUp">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#142032]">Abonnement erfolgreich aktiviert!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Ihr Tarif wurde sofort auf <strong>{plansList.find((p) => p.id === upgradeModalPlan)?.name}</strong> aktualisiert. Eine Schweizer MWST-Quittung wurde in Ihre Abrechnungshistorie abgelegt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExecuteUpgrade} className="space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#eef8f3] text-[#3d9970]">
                      <Lock className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#3d9970]">
                      Stripe 256-Bit Verschlüsselte Zahlung
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#142032] mt-1">
                    Upgrade auf {plansList.find((p) => p.id === upgradeModalPlan)?.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Abrechnung: {selectedCycle === 'annual' ? 'Jährlich (15% Rabatt)' : 'Monatlich'}
                  </p>
                </div>

                {/* Price Summary Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  {(() => {
                    const selPlanObj = plansList.find((p) => p.id === upgradeModalPlan);
                    const baseVal = selectedCycle === 'annual' ? (selPlanObj?.annualMonthlyPrice || 0) * 12 : (selPlanObj?.monthlyPrice || 0);
                    const discVal = (baseVal * discountPct) / 100;
                    const netVal = baseVal - discVal;
                    const vatVal = netVal * 0.081;
                    const totalVal = netVal + vatVal;

                    return (
                      <>
                        <div className="flex justify-between font-medium text-slate-700">
                          <span>Nettobetrag ({selPlanObj?.name}):</span>
                          <span className="font-mono">CHF {baseVal.toFixed(2)}</span>
                        </div>
                        {discountPct > 0 && (
                          <div className="flex justify-between font-bold text-emerald-700">
                            <span>Rabatt ({discountPct}% Gutschein):</span>
                            <span className="font-mono">- CHF {discVal.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium text-slate-600">
                          <span>Schweizer MWST (8.1% ESTV):</span>
                          <span className="font-mono">CHF {vatVal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-extrabold text-sm text-slate-900 border-t border-slate-200 pt-2 mt-2">
                          <span>Gesamtsumme (CHF):</span>
                          <span className="font-mono text-[#3d9970]">CHF {totalVal.toFixed(2)}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Voucher Code Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Aktions- / Gutscheincode</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      placeholder="z.B. KLAR2026 oder SWISS15"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono uppercase focus:outline-none focus:border-[#3d9970]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                    >
                      Einlösen
                    </button>
                  </div>
                  {voucherMsg && (
                    <p className={`text-[11px] font-bold ${voucherMsg.success ? 'text-emerald-600' : 'text-red-600'}`}>
                      {voucherMsg.text}
                    </p>
                  )}
                </div>

                {/* Credit Card Inputs */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Karteninhaber</label>
                    <input
                      type="text"
                      required
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-[#3d9970]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kreditkartennummer</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                      <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ablaufdatum (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08/28"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVC / Sicherheitscode</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                    </div>
                  </div>
                </div>

                {/* Swiss B2B Enterprise Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Firmenname</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-[#3d9970]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Schweizer UID / MWST-Nr.</label>
                    <input
                      type="text"
                      required
                      value={vatId}
                      onChange={(e) => setVatId(e.target.value)}
                      placeholder="CHE-442.994.102"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={checkoutLoading}
                  className="w-full py-4 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Sichere Zahlung über Stripe verifizieren...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Kostenpflichtig bestellen →</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PAYMENT METHOD MODAL */}
      {editPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 relative">
            <button
              type="button"
              onClick={() => setEditPaymentModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-xl font-serif font-bold text-[#142032]">Zahlungsmittel bearbeiten</h3>
              <p className="text-xs text-slate-500">Aktualisieren Sie Ihre hinterlegten Karten- & Rechnungsdaten</p>
            </div>

            {editPaymentSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-[#142032]">Zahlungsmittel aktualisiert!</h4>
              </div>
            ) : (
              <form onSubmit={handleSavePaymentMethod} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Karteninhaber</label>
                  <input
                    type="text"
                    required
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kreditkartennummer</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ablaufdatum (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Schweizer UID / MWST-Nr.</label>
                    <input
                      type="text"
                      required
                      value={vatId}
                      onChange={(e) => setVatId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#08271e] hover:bg-[#123d2e] text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Änderungen speichern
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
