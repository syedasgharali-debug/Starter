import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useBilling, PlanTier, BillingCycle } from '../context/BillingContext';
import {
  X,
  Lock,
  CreditCard,
  QrCode,
  FileCheck2,
  Building2,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  initialPlan?: PlanTier;
  onClose: () => void;
  onSuccessRedirect?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  initialPlan = 'PROTECT',
  onClose,
  onSuccessRedirect,
}) => {
  const navigate = useNavigate();
  const { addAuditLog } = useApp();
  const { updatePlan } = useBilling();

  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(initialPlan);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [paymentGateway, setPaymentGateway] = useState<'credit_card' | 'twint' | 'invoice'>('credit_card');

  // Form Fields
  const [companyName, setCompanyName] = useState('Smart Grid AG');
  const [vatId, setVatId] = useState('CHE-442.994.102 MWST');
  const [billingEmail, setBillingEmail] = useState('rechnungen@smartgrid.ch');
  const [address, setAddress] = useState('In der Au 44');
  const [zipCity, setZipCity] = useState('8706 Meilen, Zürich');
  const [country, setCountry] = useState('Schweiz');

  // Credit Card Fields
  const [cardName, setCardName] = useState('Ali Kazmi');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('123');

  // Loading & Success state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const plansMap: Record<PlanTier, { name: string; label: string; monthlyPrice: number; limit: string }> = {
    CHECK: {
      name: 'Starter (CHECK)',
      label: 'Starter (CHECK)',
      monthlyPrice: 49,
      limit: 'Bis 55 Belege/Monat',
    },
    PROTECT: {
      name: 'Pro Standard (PROTECT)',
      label: 'Pro Standard (PROTECT)',
      monthlyPrice: 99,
      limit: 'Bis 120 Belege/Monat',
    },
    CONTROL: {
      name: 'Enterprise (CONTROL)',
      label: 'Enterprise (CONTROL)',
      monthlyPrice: 299,
      limit: 'Unbegrenzte Mandate',
    },
  };

  const currentPlanInfo = plansMap[selectedPlan];
  const isAnnual = billingCycle === 'annual';
  const monthlyRate = isAnnual ? currentPlanInfo.monthlyPrice * 0.85 : currentPlanInfo.monthlyPrice;
  const netAmountCHF = isAnnual ? monthlyRate * 12 : monthlyRate;
  const vatAmountCHF = netAmountCHF * 0.081;
  const grossAmountCHF = netAmountCHF + vatAmountCHF;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePlan(selectedPlan, billingCycle, {
        brand: 'Visa',
        last4: cardNumber.replace(/\s+/g, '').slice(-4) || '4242',
        expiryMonth: cardExpiry.split('/')[0] || '08',
        expiryYear: '20' + (cardExpiry.split('/')[1] || '28'),
        cardholderName: cardName,
        companyName,
        vatId,
      });

      addAuditLog(
        `KlarSolution Enterprise Checkout - ${currentPlanInfo.name} Freigeschaltet`,
        'ERP Sync',
        `Mandat: ${companyName} (${vatId}) · Zahlungsart: ${paymentGateway.toUpperCase()} · Betrag: CHF ${grossAmountCHF.toFixed(2)}`
      );

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        if (onSuccessRedirect) {
          onSuccessRedirect();
        } else {
          navigate('/dashboard');
        }
      }, 1800);
    } catch (err) {
      console.error('Checkout error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 relative my-8 animate-scaleUp">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#3d9970] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Abonnement erfolgreich aktiviert!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-semibold">
              Ihr Paket <strong>{currentPlanInfo.name}</strong> ist ab sofort für {companyName} aktiv.
              Sie werden direkt in Ihr produktives Cockpit weitergeleitet...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-slate-900">
            {/* Modal Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] text-[11px] font-extrabold mb-2 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KlarSolution Enterprise Checkout • ISO 27001</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Abonnement buchen & Cockpit freischalten
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Wählen Sie das Belegvolumen, Zahlungsart und Firmendaten für den Schweizer Vorsteuerabzug.
              </p>
            </div>

            {/* Plan Tier Selector Cards */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                1. Paket auswählen
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['CHECK', 'PROTECT', 'CONTROL'] as PlanTier[]).map((pKey) => {
                  const pObj = plansMap[pKey];
                  const isSel = selectedPlan === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      onClick={() => setSelectedPlan(pKey)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSel
                          ? 'border-[#3d9970] bg-emerald-50/60 ring-2 ring-[#3d9970]/20 shadow-md'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="block font-extrabold text-xs text-slate-900 mb-1">{pObj.label}</span>
                      <span className="block font-mono font-black text-sm text-[#08271e]">
                        CHF {pObj.monthlyPrice} <span className="text-[10px] text-slate-500 font-normal">/Monat</span>
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-1 font-semibold">{pObj.limit}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Billing Interval Toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="font-extrabold text-xs text-slate-900 block">Abrechnungs-Intervall</span>
                <span className="text-[11px] text-slate-500">Jährliche Zahlweise beinhaltet 15% Schweizer Partner-Rabatt</span>
              </div>
              <div className="inline-flex p-1 bg-slate-200 rounded-xl font-extrabold text-xs">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Monatlich
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    billingCycle === 'annual' ? 'bg-[#3d9970] text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <span>Jährlich</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px] font-black">-15%</span>
                </button>
              </div>
            </div>

            {/* Company & Contact Details */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                2. Firmen- & Rechnungsadresse (Vorsteuerabzug ESTV)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Firmenname *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Schweizer UID / MWST-Nr. *</label>
                  <input
                    type="text"
                    required
                    value={vatId}
                    onChange={(e) => setVatId(e.target.value)}
                    placeholder="CHE-442.994.102 MWST"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rechnungs-E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Strasse & Nr. *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">PLZ & Ort *</label>
                  <input
                    type="text"
                    required
                    value={zipCity}
                    onChange={(e) => setZipCity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Land</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                3. Zahlungsart wählen
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentGateway('credit_card')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentGateway === 'credit_card'
                      ? 'border-[#3d9970] bg-emerald-50/60 ring-2 ring-[#3d9970]/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#3d9970]" />
                  <div>
                    <span className="block font-extrabold text-xs text-slate-900">Kreditkarte</span>
                    <span className="block text-[10px] text-slate-500">Visa, Mastercard</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('twint')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentGateway === 'twint'
                      ? 'border-[#3d9970] bg-emerald-50/60 ring-2 ring-[#3d9970]/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#3d9970]" />
                  <div>
                    <span className="block font-extrabold text-xs text-slate-900">TWINT</span>
                    <span className="block text-[10px] text-slate-500">Sofort-Freischaltung</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('invoice')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentGateway === 'invoice'
                      ? 'border-[#3d9970] bg-emerald-50/60 ring-2 ring-[#3d9970]/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <FileCheck2 className="w-5 h-5 text-[#3d9970]" />
                  <div>
                    <span className="block font-extrabold text-xs text-slate-900">QR-Rechnung</span>
                    <span className="block text-[10px] text-slate-500">30 Tage Ziel</span>
                  </div>
                </button>
              </div>

              {/* Conditional Card inputs */}
              {paymentGateway === 'credit_card' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Karteninhaber</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Kartennummer</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ablauf (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CVC</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:border-[#3d9970]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Real-time Order Summary */}
            <div className="p-4 rounded-2xl bg-[#08271e] text-white space-y-2 text-xs font-mono shadow-md border border-neutral-900">
              <div className="flex justify-between text-slate-300 font-sans text-[11px]">
                <span>Abo-Paket:</span>
                <strong className="text-white font-mono">{currentPlanInfo.name} ({isAnnual ? 'Jährlich' : 'Monatlich'})</strong>
              </div>
              <div className="flex justify-between text-slate-300 font-sans text-[11px]">
                <span>Nettobetrag:</span>
                <strong className="text-white font-mono">CHF {netAmountCHF.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-slate-300 font-sans text-[11px]">
                <span>Schweizer MWST (8.1% ESTV):</span>
                <strong className="text-emerald-400 font-mono">CHF {vatAmountCHF.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white border-t border-white/20 pt-2 mt-1">
                <span className="font-sans">Bruttobetrag (Gesamtsumme):</span>
                <strong className="text-emerald-400 font-mono text-base">CHF {grossAmountCHF.toFixed(2)}</strong>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Verifiziere Zahlung & Aktiviere Cockpit...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Zahlungspflichtig abonnieren & Freischalten →</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
