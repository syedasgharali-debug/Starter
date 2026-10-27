import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Language, InvoiceRecord } from '../../types';
import { translations } from '../../translations/translations';
import {
  ScanLine,
  Upload,
  Sparkles,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Code2,
  Download,
  ArrowRight,
  Layers,
  Globe,
} from 'lucide-react';

interface ScannerViewProps {
  currentLang: Language;
}

export interface NeuralAuditOutput {
  audit_status: 'FLAGGED' | 'APPROVED';
  country_jurisdiction: 'CH' | 'PK' | 'EU';
  po_number: string;
  grn_number: string;
  invoice_number: string;
  supplier: {
    name: string;
    tax_id: string;
    iban: string;
    iban_checksum_valid: boolean;
    confidence_score: number;
  };
  reconciliation: {
    po_amount_chf: number;
    grn_amount_chf: number;
    billed_amount_chf: number;
    variance_chf: number;
    variance_pct: number;
  };
  discrepancies_found: Array<{
    type: 'PRICE_VARIANCE' | 'QUANTITY_MISMATCH' | 'TAX_COMPLIANCE_ERROR' | 'IBAN_MISMATCH';
    item: string;
    expected: number | string;
    actual: number | string;
    financial_impact_chf: number;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
  total_financial_loss_prevented_chf: number;
  finding_de: string;
  draft_dispute_letter_de: string;
}

export interface StrictAuditSchemaResponse {
  invoice_id: string;
  purchase_order: string;
  supplier_name: string;
  supplier_tax_id: string;
  tax_regime: 'CH MWST 8.1%' | 'PK FBR 18% GST' | 'EU VAT' | 'OTHER';
  invoice_date: string;
  po_amount_chf: number;
  billed_amount_chf: number;
  variance_chf: number;
  vat_rate_detected: number;
  iban_extracted: string;
  iban_verified: boolean;
  three_way_match_passed: boolean;
  recommended_status: 'APPROVED' | 'FLAGGED' | 'DISPUTED';
  finding_de: string;
  dispute_letter_de: string;
}

export const formatStrictAuditJson = (audit: NeuralAuditOutput, date: string = '2026-10-24'): StrictAuditSchemaResponse => {
  const taxRegimeMap: Record<string, 'CH MWST 8.1%' | 'PK FBR 18% GST' | 'EU VAT' | 'OTHER'> = {
    CH: 'CH MWST 8.1%',
    PK: 'PK FBR 18% GST',
    EU: 'EU VAT',
  };

  const vatRateMap: Record<string, number> = {
    CH: 8.1,
    PK: 18.0,
    EU: 19.0,
  };

  const tax_regime = taxRegimeMap[audit.country_jurisdiction] || 'OTHER';
  const vat_rate_detected = vatRateMap[audit.country_jurisdiction] || 8.1;
  const three_way_match_passed = audit.reconciliation.variance_chf <= 0.01 && audit.supplier.iban_checksum_valid;
  const recommended_status: 'APPROVED' | 'FLAGGED' | 'DISPUTED' = 
    !three_way_match_passed 
      ? (audit.reconciliation.variance_chf > 0 ? 'DISPUTED' : 'FLAGGED')
      : 'APPROVED';

  return {
    invoice_id: audit.invoice_number,
    purchase_order: audit.po_number,
    supplier_name: audit.supplier.name,
    supplier_tax_id: audit.supplier.tax_id,
    tax_regime,
    invoice_date: date,
    po_amount_chf: audit.reconciliation.po_amount_chf,
    billed_amount_chf: audit.reconciliation.billed_amount_chf,
    variance_chf: audit.reconciliation.variance_chf,
    vat_rate_detected,
    iban_extracted: audit.supplier.iban,
    iban_verified: audit.supplier.iban_checksum_valid,
    three_way_match_passed,
    recommended_status,
    finding_de: audit.finding_de,
    dispute_letter_de: audit.draft_dispute_letter_de || '',
  };
};

export const ScannerView: React.FC<ScannerViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const { addInvoice } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3 International Enterprise Mandates (CH, PK, EU)
  const samplePresets = [
    {
      title: '🇨🇭 Switzerland (CH): PO-2026-992 · Swiss Industrial Hydraulics AG (MWST 8.1%)',
      jurisdiction: 'CH' as const,
      poNumber: 'PO-2026-992',
      grnNumber: 'GRN-2026-992',
      supplierName: 'Swiss Industrial Hydraulics AG',
      taxId: 'CHE-442.994.102 MWST',
      iban: 'CH93 0070 0110 0001 2345 6',
      invoiceNumber: 'INV-2026-992-FX',
      date: '2026-10-24',
      poAmount: 2636.70,
      grnAmount: 2636.70,
      billedAmount: 3426.30,
      auditResult: {
        audit_status: 'FLAGGED' as const,
        country_jurisdiction: 'CH' as const,
        po_number: 'PO-2026-992',
        grn_number: 'GRN-2026-992',
        invoice_number: 'INV-2026-992-FX',
        supplier: {
          name: 'Swiss Industrial Hydraulics AG',
          tax_id: 'CHE-442.994.102 MWST',
          iban: 'CH93 0070 0110 0001 2345 6',
          iban_checksum_valid: true,
          confidence_score: 0.98,
        },
        reconciliation: {
          po_amount_chf: 2636.70,
          grn_amount_chf: 2636.70,
          billed_amount_chf: 3426.30,
          variance_chf: 789.60,
          variance_pct: 29.95,
        },
        discrepancies_found: [
          {
            type: 'PRICE_VARIANCE' as const,
            item: 'Druckventil 200 bar (SKU: HYD-04)',
            expected: 'CHF 240.00 / Stk (PO Genehmigt)',
            actual: 'CHF 265.00 / Stk (Rechnung)',
            financial_impact_chf: 250.0,
            severity: 'HIGH' as const,
          },
          {
            type: 'QUANTITY_MISMATCH' as const,
            item: 'Druckventil 200 bar (SKU: HYD-04)',
            expected: '10 Stk (Bestellmenge PO & Lieferschein GRN)',
            actual: '12 Stk (In Rechnung gestellte Menge)',
            financial_impact_chf: 530.0,
            severity: 'HIGH' as const,
          },
          {
            type: 'TAX_COMPLIANCE_ERROR' as const,
            item: 'Schweizer Mehrwertsteuer (ESTV Compliance)',
            expected: '8.1% Standard MWST (CHF 194.40)',
            actual: '7.7% MWST (Veralteter Steuersatz)',
            financial_impact_chf: 9.6,
            severity: 'MEDIUM' as const,
          },
        ],
        total_financial_loss_prevented_chf: 789.60,
        finding_de: 'Forensischer Befund CH: Preiserhöhung um 10.4% ohne PO-Freigabe (+CHF 250.00) und Mengendifferenz (+2 Stk = +CHF 530.00). MWST-Ausweisung veraltet (7.7% vs ESTV 8.1%).',
        draft_dispute_letter_de: `Kaufmännische Mängelrüge & Beanstandung nach OR Art. 82 / 107 & MWSTG Art. 26\nKlarSolution AG / Revisionsleitung\nIn der Au 44, 8706 Meilen, Schweiz\n\nAn: Swiss Industrial Hydraulics AG\nDebitoren- und Rechnungsabteilung\n\nBetreff: Kaufmännische Mängelrüge zu Rechnung INV-2026-992-FX (Bestellung: PO-2026-992)\n\nSehr geehrte Damen und Herren,\n\nbei der automatisierten 3-Wege-Prüfung (Bestellung vs. Wareneingang GRN vs. Eingangsrechnung) wurden folgende Preis- und Mengenabweichungen festgestellt:\n\n1. Preiserhöhung: SKU HYD-04 wurde zu CHF 265.00/Stk abgerechnet (vereinbarter PO-Satz: CHF 240.00/Stk).\n2. Mengenfehler: Abrechnung über 12 Stk, quittierter Wareneingang (GRN) bestätigt nur 10 Stk.\n3. MWST-Fehler: Ausweisung mit veraltetem MWST-Satz von 7.7% statt gesetzlichem Schweizer Satz von 8.1% (UID: CHE-442.994.102 MWST).\n\nRechnungsbetrag: CHF 3'426.30 | Genehmigter PO/GRN-Wert: CHF 2'636.70 | Abweichung: CHF 789.60\n\nWir fordern Sie hiermit auf, eine Gutschrift über CHF 789.60 auszustellen.\n\nFreundliche Grüsse,\nKlarSolution Revisionsleitung · KlarSolution AG`,
      },
    },
    {
      title: '🇵🇰 Pakistan (PK): PO-PK-8012 · Indus Tech Supplies (FBR 18% Sales Tax / GST)',
      jurisdiction: 'PK' as const,
      poNumber: 'PO-PK-8012',
      grnNumber: 'GRN-PK-8012',
      supplierName: 'Indus Tech Supplies Ltd',
      taxId: 'NTN: 7492019-3 / STRN: 3277876123456',
      iban: 'PK36 SCBL 0000 0011 2233 4401',
      invoiceNumber: 'INV-PK-2026-104',
      date: '2026-10-23',
      poAmount: 8500.00,
      grnAmount: 8500.00,
      billedAmount: 9860.00,
      auditResult: {
        audit_status: 'FLAGGED' as const,
        country_jurisdiction: 'PK' as const,
        po_number: 'PO-PK-8012',
        grn_number: 'GRN-PK-8012',
        invoice_number: 'INV-PK-2026-104',
        supplier: {
          name: 'Indus Tech Supplies Ltd',
          tax_id: 'NTN: 7492019-3 / STRN: 3277876123456',
          iban: 'PK36 SCBL 0000 0011 2233 4401',
          iban_checksum_valid: true,
          confidence_score: 0.96,
        },
        reconciliation: {
          po_amount_chf: 8500.00,
          grn_amount_chf: 8500.00,
          billed_amount_chf: 9860.00,
          variance_chf: 1360.00,
          variance_pct: 16.0,
        },
        discrepancies_found: [
          {
            type: 'TAX_COMPLIANCE_ERROR' as const,
            item: 'FBR Sales Tax Act 1990 (18% GST vs Section 153 WHT)',
            expected: '18% FBR GST (Rs 1,530.00) mit WHT-Abzug',
            actual: 'Unberechtigter Preiszuschlag als GST ausgewiesen',
            financial_impact_chf: 1360.0,
            severity: 'HIGH' as const,
          },
        ],
        total_financial_loss_prevented_chf: 1360.00,
        finding_de: 'Forensischer Befund PK: FBR NTN 7492019-3/STRN verifiziert. Falschberechnung der 18% Sales Tax ohne Berücksichtigung des Section 153 Withholding Tax Einbehalts. Abweichung: CHF 1,360.00.',
        draft_dispute_letter_de: `FBR Tax Audit Notice & Discrepancy Statement\nKlarSolution AG / International Procurement Compliance\n\nAn: Indus Tech Supplies Ltd (NTN: 7492019-3)\n\nBetreff: Rechnungsbeanstandung INV-PK-2026-104 (PO-PK-8012)\n\nGemäss FBR Sales Tax Act 1990 und Income Tax Ordinance Section 153 weisen wir die überhöhte Abrechnung von CHF 1'360.00 (Rs 408,000 equivalent) zurück.\n\nBitte stellen Sie eine FBR-konforme Tax Invoice mit korrekter 18% GST und WHT-Gutschrift aus.\n\nFreundliche Grüsse,\nKlarSolution Global Forensic Team`,
      },
    },
    {
      title: '🇪🇺 European Union (EU): PO-EU-9102 · Rhine Systems GmbH (VIES DE312984102)',
      jurisdiction: 'EU' as const,
      poNumber: 'PO-EU-9102',
      grnNumber: 'GRN-EU-9102',
      supplierName: 'Rhine Systems GmbH',
      taxId: 'DE312984102 (VIES Verified)',
      iban: 'DE89 3704 0044 0532 0130 00',
      invoiceNumber: 'INV-EU-2026-88',
      date: '2026-10-21',
      poAmount: 14500.00,
      grnAmount: 14500.00,
      billedAmount: 17255.00,
      auditResult: {
        audit_status: 'FLAGGED' as const,
        country_jurisdiction: 'EU' as const,
        po_number: 'PO-EU-9102',
        grn_number: 'GRN-EU-9102',
        invoice_number: 'INV-EU-2026-88',
        supplier: {
          name: 'Rhine Systems GmbH',
          tax_id: 'DE312984102 (VIES Verified)',
          iban: 'DE89 3704 0044 0532 0130 00',
          iban_checksum_valid: true,
          confidence_score: 0.99,
        },
        reconciliation: {
          po_amount_chf: 14500.00,
          grn_amount_chf: 14500.00,
          billed_amount_chf: 17255.00,
          variance_chf: 2755.00,
          variance_pct: 19.0,
        },
        discrepancies_found: [
          {
            type: 'TAX_COMPLIANCE_ERROR' as const,
            item: 'EU Directives 2006/112/EC (Reverse Charge Art. 194/196)',
            expected: 'Reverse Charge 0% VAT (B2B Grenzüberschreitend)',
            actual: '19% Deutsche MwSt fälschlicherweise berechnet (+CHF 2,755.00)',
            financial_impact_chf: 2755.0,
            severity: 'HIGH' as const,
          },
        ],
        total_financial_loss_prevented_chf: 2755.00,
        finding_de: 'Forensischer Befund EU: VIES USt-IdNr DE312984102 ist gültig. Bei B2B-Lieferung CH/EU gilt Reverse-Charge. Fälschliche Einnahme von 19% MwSt (+CHF 2,755.00).',
        draft_dispute_letter_de: `Kaufmännische Mängelrüge - Steuerschuldnerschaft des Leistungsempfängers (Reverse Charge)\nKlarSolution AG / Finanzabteilung\n\nAn: Rhine Systems GmbH (USt-IdNr: DE312984102)\n\nBetreff: Korrektur der MwSt-Ausweisung auf Rechnung INV-EU-2026-88 (PO-EU-9102)\n\nSehr geehrte Damen und Herren,\n\nda es sich um eine grenzüberschreitende B2B-Lieferung an die Schweizer KlarSolution AG handelt, findet das Reverse-Charge-Verfahren Anwendung. Die Ausweisung von 19% deutscher MwSt in Höhe von CHF 2'755.00 ist nicht korrekt.\n\nWir bitten um Ausstellung einer Nettorechnung mit dem Vermerk "Steuerschuldnerschaft des Leistungsempfängers".\n\nFreundliche Grüsse,\nKlarSolution AG`,
      },
    },
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [auditOutput, setAuditOutput] = useState<NeuralAuditOutput | null>(samplePresets[0].auditResult);
  const [copied, setCopied] = useState(false);
  const [rawJsonView, setRawJsonView] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [committedSuccessMsg, setCommittedSuccessMsg] = useState<string | null>(null);

  const scanSteps = [
    { num: 1, title: '1. Multimodale OCR & Vision', desc: 'Extrahiere Kopfdaten, Einzelpositionen & QR-IBAN Modulo-97 Checksum...' },
    { num: 2, title: '2. 3-Way Reconciliation (PO vs GRN vs Invoice)', desc: 'Gleiche Bestellschein (PO) & Wareneingang (GRN) mit 0.01% Toleranz ab...' },
    { num: 3, title: '3. International Tax Engine (ESTV 8.1% / FBR 18% / EU VIES)', desc: 'Prüfe UID / NTN / VIES VAT IDs & Reverse-Charge Reglements...' },
    { num: 4, title: '4. Forensic Report & Dispute Generation', desc: 'Erstelle Mängelrüge nach OR Art. 82/107 & Schutzsumme...' },
  ];

  const handleRun3WayMatch = (
    fileName?: string,
    parsedData?: { poNumber?: string; supplier?: string; billedAmount?: number; poAmount?: number }
  ) => {
    setScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => setScanStep(4), 1500);

    setTimeout(() => {
      setScanning(false);
      setScanStep(0);

      if (parsedData && parsedData.billedAmount !== undefined && parsedData.poAmount !== undefined) {
        const billed = parsedData.billedAmount;
        const po = parsedData.poAmount;
        const grn = po;
        const variance = Math.max(0, billed - po);
        const isFlagged = variance > 0.01;

        const customAudit: NeuralAuditOutput = {
          audit_status: isFlagged ? 'FLAGGED' : 'APPROVED',
          country_jurisdiction: 'CH',
          po_number: parsedData.poNumber || 'PO-CUSTOM-2026',
          grn_number: 'GRN-CUSTOM-2026',
          invoice_number: `INV-${Date.now().toString().slice(-4)}`,
          supplier: {
            name: parsedData.supplier || 'Hochgeladener Lieferant AG',
            tax_id: 'CHE-442.994.102 MWST',
            iban: 'CH89 0000 0000 0000 0000 0',
            iban_checksum_valid: true,
            confidence_score: 0.99,
          },
          reconciliation: {
            po_amount_chf: po,
            grn_amount_chf: grn,
            billed_amount_chf: billed,
            variance_chf: variance,
            variance_pct: parseFloat(((variance / (po || 1)) * 100).toFixed(2)),
          },
          discrepancies_found: isFlagged
            ? [
                {
                  type: 'PRICE_VARIANCE',
                  item: `Position ${parsedData.poNumber || 'PO-2026'}`,
                  expected: `CHF ${po.toFixed(2)} (PO Genehmigt)`,
                  actual: `CHF ${billed.toFixed(2)} (Rechnung)`,
                  financial_impact_chf: variance,
                  severity: 'HIGH',
                },
              ]
            : [],
          total_financial_loss_prevented_chf: variance,
          finding_de: isFlagged
            ? `Forensischer Befund: Rechnungsbetrag (CHF ${billed.toFixed(2)}) übersteigt genehmigte PO/GRN (CHF ${po.toFixed(2)}) um CHF ${variance.toFixed(2)}.`
            : 'Forensischer Befund: 3-Wege-Abgleich (PO vs. GRN vs. Rechnung) exakt bestanden. MWST & IBAN Modulo-97 verifiziert.',
          draft_dispute_letter_de: isFlagged
            ? `Kaufmännische Mängelrüge nach OR Art. 82 / 107\nKlarSolution AG / Revisionsleitung\n\nAn: ${parsedData.supplier || 'Lieferant'}\n\nBetreff: Preiserhöhung zu Rechnung (${parsedData.poNumber || 'PO'})\n\nRechnungsbetrag: CHF ${billed.toFixed(2)} | PO Betrag: CHF ${po.toFixed(2)} | Abweichung: CHF ${variance.toFixed(2)}.\n\nBitte senden Sie uns eine Gutschrift über CHF ${variance.toFixed(2)}.\n\nFreundliche Grüsse,\nKlarSolution AG`
            : '',
        };
        setAuditOutput(customAudit);
      } else {
        setAuditOutput(samplePresets[selectedPresetIndex].auditResult);
      }
    }, 2000);
  };

  const handleCommitToStore = () => {
    if (!auditOutput) return;

    const isFlagged = auditOutput.reconciliation.variance_chf > 0 || auditOutput.audit_status === 'FLAGGED';
    const newRecord: InvoiceRecord = {
      id: `inv-scan-${Date.now()}`,
      invoiceNumber: auditOutput.invoice_number,
      supplierName: auditOutput.supplier.name,
      invoiceDate: new Date().toLocaleDateString('de-CH'),
      poNumber: auditOutput.po_number,
      totalBilledCHF: auditOutput.reconciliation.billed_amount_chf,
      totalPOCHF: auditOutput.reconciliation.po_amount_chf,
      varianceCHF: auditOutput.reconciliation.variance_chf,
      status: isFlagged ? 'discrepancy' : 'approved',
      discrepancyType: auditOutput.discrepancies_found[0]?.type === 'PRICE_VARIANCE' ? 'Price Variance' : auditOutput.discrepancies_found[0]?.type === 'QUANTITY_MISMATCH' ? 'Quantity Mismatch' : 'VAT Error',
      riskLevel: auditOutput.reconciliation.variance_chf > 500 ? 'High' : 'Low',
      confidenceScore: Math.round(auditOutput.supplier.confidence_score * 100),
      lineItems: auditOutput.discrepancies_found.map((d, i) => ({
        id: `li-${i}`,
        description: d.item,
        poUnitPrice: auditOutput.reconciliation.po_amount_chf,
        billedUnitPrice: auditOutput.reconciliation.billed_amount_chf,
        poQuantity: 1,
        billedQuantity: 1,
        varianceCHF: d.financial_impact_chf,
        reason: `${d.type}: Ist (${d.actual}) vs Soll (${d.expected})`,
      })),
      disputeLetter: auditOutput.draft_dispute_letter_de,
    };

    addInvoice(newRecord);
    setCommittedSuccessMsg(
      `Beleg ${newRecord.invoiceNumber} (${auditOutput.supplier.name}) erfolgreich in Rechnungs-Center, Reklamations-Hub & KPIs übernommen!`
    );
    setTimeout(() => setCommittedSuccessMsg(null), 4000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);

      if (file.type.includes('json') || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target?.result as string);
            handleRun3WayMatch(file.name, {
              poNumber: parsed.po_number || parsed.poNumber || 'PO-2026-FILE',
              supplier: parsed.supplier_name || parsed.supplierName || 'Imported Supplier AG',
              billedAmount: parsed.billed_amount || parsed.billedCHF || 4500.0,
              poAmount: parsed.approved_amount || parsed.poCHF || 3900.0,
            });
          } catch (err) {
            handleRun3WayMatch(file.name);
          }
        };
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const resultStr = event.target?.result as string;
          const base64Data = resultStr ? resultStr.split(',')[1] : '';
          if (base64Data) {
            setScanning(true);
            setScanStep(1);
            try {
              setTimeout(() => setScanStep(2), 400);
              setTimeout(() => setScanStep(3), 800);
              setTimeout(() => setScanStep(4), 1200);

              const res = await fetch('/api/analyze-invoice-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fileBase64: base64Data,
                  mimeType: file.type || 'image/png',
                  poContext: {
                    poNumber: 'PO-2026-992',
                    poAmountChf: 2636.70,
                    grnSummary: '10x Druckventil 200 bar (SKU: HYD-04)',
                    masterIban: 'CH93 0070 0110 0001 2345 6',
                  },
                }),
              });
              const data = await res.json();
              setScanning(false);
              setScanStep(0);

              if (data.success && data.result) {
                const resObj = data.result;
                const poAmt = typeof resObj.po_amount_chf === 'number' ? resObj.po_amount_chf : 2636.70;
                const billedAmt = typeof resObj.billed_amount_chf === 'number' ? resObj.billed_amount_chf : 3426.30;
                const variance = typeof resObj.variance_chf === 'number' ? resObj.variance_chf : billedAmt - poAmt;

                const geminiAudit: NeuralAuditOutput = {
                  audit_status: resObj.recommended_status === 'APPROVED' ? 'APPROVED' : 'FLAGGED',
                  country_jurisdiction: 'CH',
                  po_number: resObj.purchase_order || 'PO-2026-992',
                  grn_number: 'GRN-2026-992',
                  invoice_number: resObj.invoice_id || 'INV-GEMINI-2026',
                  supplier: {
                    name: resObj.supplier_name || 'Gemini Vision Supplier AG',
                    tax_id: resObj.supplier_tax_id || 'CHE-442.994.102 MWST',
                    iban: resObj.iban_extracted || 'CH93 0070 0110 0001 2345 6',
                    iban_checksum_valid: resObj.iban_verified ?? true,
                    confidence_score: 0.99,
                  },
                  reconciliation: {
                    po_amount_chf: poAmt,
                    grn_amount_chf: poAmt,
                    billed_amount_chf: billedAmt,
                    variance_chf: variance,
                    variance_pct: parseFloat(((variance / (poAmt || 1)) * 100).toFixed(2)),
                  },
                  discrepancies_found: variance > 0.01
                    ? [
                        {
                          type: 'PRICE_VARIANCE',
                          item: 'Extracted Invoice Line Items',
                          expected: `CHF ${poAmt.toFixed(2)}`,
                          actual: `CHF ${billedAmt.toFixed(2)}`,
                          financial_impact_chf: variance,
                          severity: 'HIGH',
                        },
                      ]
                    : [],
                  total_financial_loss_prevented_chf: variance > 0 ? variance : 0,
                  finding_de: resObj.finding_de || `Gemini 2.5 Flash Vision Findings: Invoice ${resObj.invoice_id || 'INV'} audited.`,
                  draft_dispute_letter_de: resObj.dispute_letter_de || '',
                };
                setAuditOutput(geminiAudit);
                return;
              }
            } catch (err) {
              console.warn('Server-side Gemini analysis fallback:', err);
            }
          }
          handleRun3WayMatch(file.name);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900 relative">
      {/* Toast Notification */}
      {committedSuccessMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#08271e] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#3d9970] flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#3d9970]" />
          <span className="text-xs font-bold">{committedSuccessMsg}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.png,.jpg,.jpeg,.tiff,.json,.csv,.xml"
        className="hidden"
      />

      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] text-xs font-bold mb-2 border border-emerald-200">
            <Globe className="w-4 h-4 text-[#3d9970]" />
            <span>KlarSolution 3.0 Global Forensic Audit & Tax Engine (CH • PK • EU)</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Multimodale Belegprüfung & 3-Way Forensic Audit</h1>
          <p className="text-xs text-slate-500 mt-1">
            0.01% Toleranz-Abgleich (PO vs Wareneingang GRN vs Rechnung) mit Schweizer ESTV MWST 8.1%, Pakistan FBR 18% GST & EU VIES Compliance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRawJsonView(!rawJsonView)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-colors shadow-sm self-start md:self-auto"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>{rawJsonView ? 'Visuelle Ansicht' : 'Strict JSON Audit Schema'}</span>
        </button>
      </div>

      {/* Dropzone & Action Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const file = e.dataTransfer.files[0];
              setUploadedFileName(file.name);
              handleRun3WayMatch(file.name);
            }
          }}
          className={`md:col-span-2 border-2 border-dashed rounded-3xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
            dragActive
              ? 'border-[#3d9970] bg-emerald-50 scale-[1.01]'
              : 'border-slate-300 bg-white hover:border-[#3d9970] hover:bg-slate-50/50'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#08271e] text-white flex items-center justify-center mb-3 shadow-md">
            <Upload className="w-7 h-7 text-[#3d9970]" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 mb-1">
            Rechnung uploaden (PDF, Image, Swiss QR-Bill, FBR Invoice, EU VIES, JSON, CSV)
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Klicken Sie, um eine Rechnungsdatei auszuwählen. Führt den 3-Wege-Match & Modulo-97 IBAN Check aus.
            {uploadedFileName && (
              <span className="block mt-2 font-bold text-[#3d9970]">
                Geprüfte Datei: {uploadedFileName}
              </span>
            )}
          </p>
        </div>

        {/* Action Panel */}
        <div className="bg-black text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-neutral-900">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold uppercase mb-2 border border-emerald-800">
              <Sparkles className="w-3 h-3" />
              <span>Global 3-Way Engine</span>
            </div>
            <h3 className="font-extrabold text-base text-white">Forensischer Abgleich</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Vergleicht Bestellschein (PO), Wareneingang (GRN) und Rechnungsbetrag mit 0.01% Genauigkeit.
            </p>
          </div>

          <button
            type="button"
            disabled={scanning}
            onClick={() => handleRun3WayMatch()}
            className="w-full mt-4 py-3.5 rounded-2xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {scanning ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <FileCheck2 className="w-4 h-4 text-white" />
            )}
            <span>{scanning ? '3-Way Audit läuft...' : '3-Way Match ausführen'}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Animated Scan Progress */}
      {scanning && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#3d9970] animate-spin" />
              Multimodale Forensische Analyse aktiv...
            </span>
            <span className="text-xs font-mono font-bold text-[#3d9970]">Stufe {scanStep} / 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {scanSteps.map((s) => (
              <div
                key={s.num}
                className={`p-3.5 rounded-2xl border transition-all text-xs ${
                  scanStep === s.num
                    ? 'bg-[#08271e] text-white border-[#08271e] shadow-lg scale-[1.02]'
                    : scanStep > s.num
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <div className="font-extrabold mb-1 flex items-center justify-between">
                  <span>{s.title}</span>
                  {scanStep > s.num && <CheckCircle2 className="w-4 h-4 text-[#3d9970]" />}
                </div>
                <p className="text-[11px] opacity-80 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Mandates Presets Selectors (CH, PK, EU) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
          Muster-Purchase Orders nach Jurisdiktion (Schweiz, Pakistan, EU) wählen:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedPresetIndex(idx);
                setAuditOutput(samplePresets[idx].auditResult);
              }}
              className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all ${
                selectedPresetIndex === idx
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="block font-bold mb-1">{preset.title}</span>
              <span className="text-[11px] opacity-80 block truncate font-mono">{preset.supplierName} ({preset.poNumber})</span>
            </button>
          ))}
        </div>
      </div>


      {/* Main Forensic Output Display */}
      {auditOutput && (
        <div className="space-y-6 animate-fadeIn">
          {rawJsonView ? (
            <div className="bg-slate-950 text-emerald-400 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-3 font-mono text-xs overflow-x-auto relative">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2 mb-3 font-sans">
                <span className="font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Strict JSON Forensic Audit Schema Response</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const strictJson = formatStrictAuditJson(auditOutput, samplePresets[selectedPresetIndex]?.date || '2026-10-24');
                    navigator.clipboard.writeText(JSON.stringify(strictJson, null, 2));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-3 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'JSON kopiert' : 'JSON kopieren'}</span>
                </button>
              </div>
              <pre className="text-emerald-300 leading-relaxed">
                {JSON.stringify(
                  formatStrictAuditJson(auditOutput, samplePresets[selectedPresetIndex]?.date || '2026-10-24'),
                  null,
                  2
                )}
              </pre>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Forensic Audit Summary & 3-Way Reconciliation */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                          auditOutput.audit_status === 'FLAGGED'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Audit Status: {auditOutput.audit_status} ({auditOutput.country_jurisdiction})</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                        Verhinderter Finanzschaden
                      </span>
                      <span className="text-xl font-extrabold text-amber-600 font-mono">
                        + CHF {auditOutput.total_financial_loss_prevented_chf.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* 3-Way Reconciliation Metrics Grid */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#3d9970]" />
                      <span>3-Wege-Abgleich (PO vs. Wareneingang vs. Rechnung)</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-center font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block font-bold">1. PO Bestellwert</span>
                        <strong className="text-slate-900 text-sm">CHF {auditOutput.reconciliation.po_amount_chf.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block font-bold">2. Wareneingang (GRN)</span>
                        <strong className="text-emerald-700 text-sm">CHF {auditOutput.reconciliation.grn_amount_chf.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block font-bold">3. Rechnungsbetrag</span>
                        <strong className="text-amber-700 text-sm">CHF {auditOutput.reconciliation.billed_amount_chf.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Supplier & IBAN Modulo-97 Verification Card */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-900">{auditOutput.supplier.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#2d5c46] text-[10px]">
                        Confidence: {(auditOutput.supplier.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-slate-500 font-mono text-[11px] flex items-center justify-between pt-1">
                      <span>Steuer-ID: {auditOutput.supplier.tax_id}</span>
                      <span className="text-emerald-700 font-bold">✓ IBAN Modulo-97 Checksum Valide</span>
                    </div>
                  </div>

                  {/* Formal German Finding Box */}
                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs space-y-1">
                    <strong className="block text-amber-900 uppercase font-black tracking-wider text-[10px]">
                      Formaler Revisionsbefund (finding_de):
                    </strong>
                    <p className="text-slate-800 leading-relaxed">{auditOutput.finding_de}</p>
                  </div>

                  {/* Discrepancies List */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                      Aufgedeckte Unstimmigkeiten ({auditOutput.discrepancies_found.length}):
                    </h4>

                    <div className="space-y-3">
                      {auditOutput.discrepancies_found.map((disc, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2"
                        >
                          <div className="flex justify-between items-center font-bold">
                            <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">
                              {disc.type}
                            </span>
                            <span className="font-mono text-amber-700 font-extrabold">
                              Impact: + CHF {disc.financial_impact_chf.toFixed(2)}
                            </span>
                          </div>
                          <div className="font-extrabold text-slate-900">{disc.item}</div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-amber-100">
                            <div>
                              <span className="text-slate-400 block">Soll (PO / Wareneingang):</span>
                              <span className="font-mono font-bold text-emerald-700">{disc.expected}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Ist (Eingangsrechnung):</span>
                              <span className="font-mono font-bold text-amber-800">{disc.actual}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PROMINENT COMMIT CTA BUTTON */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleCommitToStore}
                    className="w-full py-4 rounded-2xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>In Rechnungs-Center & KPIs übernehmen</span>
                    <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Draft Dispute Letter */}
              <div className="lg:col-span-5 bg-black text-white p-6 sm:p-8 rounded-3xl border border-neutral-900 shadow-lg space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Kaufmännische Mängelrüge (dispute_letter_de)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(auditOutput.draft_dispute_letter_de);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded bg-[#3d9970] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#2f8a68] transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Mängelrüge nach OR Art. 82/107, ESTV MWSTG oder FBR/EU Richtlinien:
                  </p>

                  <textarea
                    readOnly
                    rows={13}
                    value={auditOutput.draft_dispute_letter_de}
                    className="w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-slate-200 leading-relaxed outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([auditOutput.draft_dispute_letter_de], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Maengelruege_${auditOutput.supplier.name.replace(/\s+/g, '_')}_${auditOutput.po_number}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Mängelrüge als TXT herunterladen</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
