import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PlanTier = 'CHECK' | 'PROTECT' | 'CONTROL';
export type BillingCycle = 'monthly' | 'annual';

export interface BillingReceipt {
  id: string;
  date: string;
  number: string;
  description: string;
  amountCHF: number;
  vatCHF: number;
  status: 'Bezahlt' | 'Offen';
  pdfUrl?: string;
}

export interface PaymentMethod {
  brand: 'Visa' | 'Mastercard' | 'American Express';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  companyName: string;
  vatId: string;
}

export interface BillingContextType {
  plan: PlanTier;
  billingCycle: BillingCycle;
  verifiedInvoicesCount: number;
  maxInvoicesLimit: number;
  renewalDate: string;
  paymentMethod: PaymentMethod;
  billingHistory: BillingReceipt[];
  discountCode: string | null;
  discountPct: number;
  applyDiscountCode: (code: string) => { success: boolean; discountPct: number; message: string };
  updatePlan: (newPlan: PlanTier, cycle: BillingCycle, cardDetails?: Partial<PaymentMethod>) => Promise<boolean>;
  updatePaymentMethod: (newMethod: Partial<PaymentMethod>) => void;
  downloadInvoicePDF: (receipt: BillingReceipt) => void;
}

const defaultPaymentMethod: PaymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expiryMonth: '08',
  expiryYear: '2028',
  cardholderName: 'KlarSolution Admin',
  companyName: 'KlarSolution AG',
  vatId: 'CHE-442.994.102',
};

const initialReceipts: BillingReceipt[] = [
  {
    id: 'rec_2026_10',
    date: '15.10.2026',
    number: 'INV-2026-9041',
    description: 'KlarSolution PROTECT - Monatliche Lizenz',
    amountCHF: 99.0,
    vatCHF: 7.43,
    status: 'Bezahlt',
  },
  {
    id: 'rec_2026_09',
    date: '15.09.2026',
    number: 'INV-2026-8120',
    description: 'KlarSolution PROTECT - Monatliche Lizenz',
    amountCHF: 99.0,
    vatCHF: 7.43,
    status: 'Bezahlt',
  },
  {
    id: 'rec_2026_08',
    date: '15.08.2026',
    number: 'INV-2026-7203',
    description: 'KlarSolution CHECK - Monatliche Lizenz',
    amountCHF: 49.0,
    vatCHF: 3.68,
    status: 'Bezahlt',
  },
];

const planLimits: Record<PlanTier, number> = {
  CHECK: 55,
  PROTECT: 1000,
  CONTROL: 10000,
};

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<PlanTier>('PROTECT');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [verifiedInvoicesCount] = useState<number>(384);
  const [renewalDate, setRenewalDate] = useState<string>('15. November 2026');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(defaultPaymentMethod);
  const [billingHistory, setBillingHistory] = useState<BillingReceipt[]>(initialReceipts);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPct, setDiscountPct] = useState<number>(0);

  const applyDiscountCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'KLAR2026' || cleanCode === 'SWISS15') {
      setDiscountCode(cleanCode);
      setDiscountPct(15);
      return {
        success: true,
        discountPct: 15,
        message: 'Gutschein "15% Schweizer KMU-Rabatt" erfolgreich angewendet!',
      };
    } else if (cleanCode === 'STARTUP') {
      setDiscountCode(cleanCode);
      setDiscountPct(20);
      return {
        success: true,
        discountPct: 20,
        message: 'Gutschein "20% Startup-Bonus" angewendet!',
      };
    } else {
      return {
        success: false,
        discountPct: 0,
        message: 'Ungültiger Rabattcode. Bitte prüfen Sie den Code.',
      };
    }
  };

  const updatePlan = async (
    newPlan: PlanTier,
    cycle: BillingCycle,
    cardDetails?: Partial<PaymentMethod>
  ): Promise<boolean> => {
    // Simulate payment processing latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setPlan(newPlan);
    setBillingCycle(cycle);

    if (cardDetails) {
      setPaymentMethod((prev) => ({ ...prev, ...cardDetails }));
    }

    // Set renewal date
    const today = new Date();
    if (cycle === 'annual') {
      today.setFullYear(today.getFullYear() + 1);
    } else {
      today.setMonth(today.getMonth() + 1);
    }
    const months = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    setRenewalDate(`${today.getDate()}. ${months[today.getMonth()]} ${today.getFullYear()}`);

    // Create a new billing receipt
    const basePrice = newPlan === 'CHECK' ? 49 : newPlan === 'PROTECT' ? 99 : 299;
    const finalPrice = cycle === 'annual' ? Math.round(basePrice * 12 * 0.85) : basePrice;
    const vat = parseFloat((finalPrice * 0.081).toFixed(2));

    const newReceipt: BillingReceipt = {
      id: `rec_${Date.now()}`,
      date: new Date().toLocaleDateString('de-CH'),
      number: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      description: `KlarSolution ${newPlan} - ${cycle === 'annual' ? 'Jährliche' : 'Monatliche'} Lizenz`,
      amountCHF: finalPrice,
      vatCHF: vat,
      status: 'Bezahlt',
    };

    setBillingHistory((prev) => [newReceipt, ...prev]);
    return true;
  };

  const updatePaymentMethod = (newMethod: Partial<PaymentMethod>) => {
    setPaymentMethod((prev) => ({ ...prev, ...newMethod }));
  };

  const downloadInvoicePDF = (receipt: BillingReceipt) => {
    // Construct printable HTML window for downloadable Swiss B2B invoice
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="utf-8">
        <title>Rechnung ${receipt.number} - KlarSolution</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #142032; padding: 40px; margin: 0; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-b: 2px solid #08271e; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #08271e; }
          .logo span { color: #3d9970; }
          .company-info { text-align: right; font-size: 12px; color: #4a5568; line-height: 1.5; }
          .invoice-title { font-size: 28px; font-weight: 800; margin-bottom: 5px; color: #08271e; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; font-size: 13px; }
          .meta-box { background: #f7f9f8; padding: 15px; rounded-radius: 10px; border: 1fr solid #e2e8f0; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #08271e; color: #fff; text-align: left; padding: 10px 15px; font-size: 12px; font-weight: bold; }
          td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
          .totals { width: 300px; margin-left: auto; font-size: 13px; line-height: 1.8; }
          .totals-row { display: flex; justify-content: space-between; }
          .totals-row.grand { font-size: 16px; font-weight: bold; border-top: 2px solid #08271e; padding-top: 8px; margin-top: 8px; }
          .footer { margin-top: 60px; pt-20 border-top: 1px solid #e2e8f0; font-size: 11px; color: #718096; text-align: center; }
          .btn-print { background: #3d9970; color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 20px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <button class="btn-print" onclick="window.print()">🖨️ PDF / Rechnung drucken</button>
        <div class="header">
          <div>
            <div class="logo">klar <span>solution</span></div>
            <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #718096; margin-top: 2px;">KlarSolution AG · Schweiz</div>
          </div>
          <div class="company-info">
            <strong>KlarSolution AG</strong><br>
            In der Au 44, 8706 Meilen<br>
            UID: CHE-442.994.102 MWST<br>
            info@klarsolution.com | 044 589 72 88
          </div>
        </div>

        <div class="invoice-title">RECHNUNG / QUITTUNG</div>
        <div style="font-size: 14px; font-weight: bold; color: #3d9970; margin-bottom: 20px;">Nummer: ${receipt.number}</div>

        <div class="meta-grid">
          <div class="meta-box">
            <strong>Rechnungsempfänger:</strong><br>
            ${paymentMethod.companyName}<br>
            z.Hd. ${paymentMethod.cardholderName}<br>
            UID/MWST-Nr.: ${paymentMethod.vatId}<br>
            Schweiz
          </div>
          <div class="meta-box">
            <strong>Rechnungsdaten:</strong><br>
            Rechnungsdatum: ${receipt.date}<br>
            Zahlungsstatus: <span style="color: #2e7d32; font-weight: bold;">${receipt.status}</span><br>
            Zahlungsart: ${paymentMethod.brand} (•••• ${paymentMethod.last4})
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Position / Beschreibung</th>
              <th style="text-align: center;">Menge</th>
              <th style="text-align: right;">Einzelpreis</th>
              <th style="text-align: right;">Gesamt (CHF)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${receipt.description}</strong><br><span style="font-size: 11px; color: #718096;">B2B Rechnungsprüfung & Autoreklamations-Suite</span></td>
              <td style="text-align: center;">1</td>
              <td style="text-align: right;">CHF ${(receipt.amountCHF - receipt.vatCHF).toFixed(2)}</td>
              <td style="text-align: right;">CHF ${(receipt.amountCHF - receipt.vatCHF).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <span>Nettobetrag:</span>
            <span>CHF ${(receipt.amountCHF - receipt.vatCHF).toFixed(2)}</span>
          </div>
          <div class="totals-row">
            <span>MWST (8.1% Schweizer Satz):</span>
            <span>CHF ${receipt.vatCHF.toFixed(2)}</span>
          </div>
          <div class="totals-row grand">
            <span>Gesamtbetrag:</span>
            <span>CHF ${receipt.amountCHF.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          Vielen Dank für das Vertrauen in KlarSolution. Diese Quittung gilt als berechtigter Vorsteuerabzugsnachweis gemäss Art. 26 MWSTG.<br>
          KlarSolution AG, In der Au 44, 8706 Meilen, Schweiz.
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <BillingContext.Provider
      value={{
        plan,
        billingCycle,
        verifiedInvoicesCount,
        maxInvoicesLimit: planLimits[plan],
        renewalDate,
        paymentMethod,
        billingHistory,
        discountCode,
        discountPct,
        applyDiscountCode,
        updatePlan,
        updatePaymentMethod,
        downloadInvoicePDF,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};
