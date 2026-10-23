import React, { useState, useRef } from 'react';
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
  ShieldAlert,
  Database,
  Code2,
  Download,
} from 'lucide-react';

interface ScannerViewProps {
  currentLang: Language;
  onAddAuditedInvoice: (invoice: InvoiceRecord) => void;
}

export interface NeuralAuditOutput {
  audit_status: 'FLAGGED' | 'APPROVED';
  supplier: {
    name: string;
    iban: string;
    confidence_score: number;
  };
  discrepancies_found: Array<{
    type: 'PRICE_VARIANCE' | 'QUANTITY_MISMATCH' | 'TAX_CALCULATION_ERROR';
    item: string;
    expected: number | string;
    actual: number | string;
    financial_impact_chf: number;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
  total_financial_loss_prevented_chf: number;
  draft_dispute_letter_de: string;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  currentLang,
  onAddAuditedInvoice,
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Neural Audit Presets including prompt PO-2026-992
  const samplePresets = [
    {
      title: 'PO-2026-992: Swiss Industrial Hydraulics AG (Neural Forensic Audit)',
      poNumber: 'PO-2026-992',
      supplierName: 'Swiss Industrial Hydraulics AG',
      iban: 'CH93 0070 0110 0001 2345 6',
      invoiceNumber: 'INV-2026-992-FX',
      date: '2026-10-23',
      amount: 'CHF 3,426.30',
      itemsText: '12x Druckventil 200 bar (SKU: HYD-04) @ CHF 265.00/Stk (PO genehmigt: 10 Stk @ CHF 240.00/Stk). MWST ausgewiesen mit 7.7% statt 8.1%.',
      auditResult: {
        audit_status: 'FLAGGED' as const,
        supplier: {
          name: 'Swiss Industrial Hydraulics AG',
          iban: 'CH93 0070 0110 0001 2345 6',
          confidence_score: 0.98,
        },
        discrepancies_found: [
          {
            type: 'PRICE_VARIANCE' as const,
            item: 'Druckventil 200 bar (SKU: HYD-04)',
            expected: 'CHF 240.00 / Stk',
            actual: 'CHF 265.00 / Stk',
            financial_impact_chf: 250.0,
            severity: 'HIGH' as const,
          },
          {
            type: 'QUANTITY_MISMATCH' as const,
            item: 'Druckventil 200 bar (SKU: HYD-04)',
            expected: '10 Stk (Bestellmenge PO-2026-992)',
            actual: '12 Stk (In Rechnung gestellt)',
            financial_impact_chf: 530.0,
            severity: 'HIGH' as const,
          },
          {
            type: 'TAX_CALCULATION_ERROR' as const,
            item: 'Schweizer Mehrwertsteuer (ESTV Compliance)',
            expected: '8.1% MWST (CHF 194.40 bei PO-Wert)',
            actual: '7.7% MWST (Veralteter Steuersatz)',
            financial_impact_chf: 9.6,
            severity: 'MEDIUM' as const,
          },
        ],
        total_financial_loss_prevented_chf: 789.6,
        draft_dispute_letter_de: `Smart Grid AG / KlarSolution Revisionsleitung\nIn der Au 44, 8706 Meilen, Schweiz\n\nSwiss Industrial Hydraulics AG\nRechnungs- und Debitorenwesen\n\nBetreff: Kaufmännische Mängelrüge & Beanstandung zu Rechnung INV-2026-992-FX (PO-2026-992)\n\nSehr geehrte Damen und Herren,\n\nbei der automatisierten forensischen 3-Wege-Prüfung Ihrer Eingangsrechnung INV-2026-992-FX wurden folgende erhebliche Unstimmigkeiten festgestellt:\n\n1. Preiserhöhung: SKU HYD-04 (Druckventil 200 bar) wurde zu CHF 265.00/Stk abgerechnet (vereinbarter PO-Preis: CHF 240.00/Stk). Differenz: CHF 250.00.\n2. Mengenabweichung: Es wurden 12 Einheiten berechnet, obwohl gemäss Bestellschein PO-2026-992 und Wareneingang nur 10 Einheiten freigegeben wurden. Übercharge: CHF 530.00.\n3. MWST-Fehler: Die Ausweisung erfolgte mit dem veralteten MWST-Satz von 7.7% anstelle des gesetzlichen Schweizer Satzes von 8.1%.\n\nDer verhinderte Schaden beträgt insgesamt CHF 789.60.\n\nGemäss Schweizer Obligationenrecht (OR Art. 82 / Art. 107) fordern wir Sie auf, die vorliegende Rechnung zu stornieren und eine korrigierte Rechnung über CHF 2,594.40 (inkl. 8.1% MWST) sowie eine Gutschrift für die Differenz innert 10 Tagen auszustellen.\n\nFreundliche Grüsse,\nKlarSolution Neural Revisionsleitung\nSmart Grid AG`,
      },
    },
    {
      title: 'Bauwerk Alpine AG - Gotthard Beton & Kies AG (Beton-Preiszuschlag)',
      poNumber: 'PO-BAU-4010',
      supplierName: 'Gotthard Beton & Kies AG',
      iban: 'CH44 0023 0230 0044 1122 3',
      invoiceNumber: 'INV-BAU-2026-911',
      date: '2026-10-19',
      amount: 'CHF 38,400.00',
      itemsText: '400m3 Frischbeton C25/30 @ CHF 96.00/m3 = CHF 38,400.00. (PO #PO-BAU-4010 vereinbart: CHF 88.00/m3)',
      auditResult: {
        audit_status: 'FLAGGED' as const,
        supplier: {
          name: 'Gotthard Beton & Kies AG',
          iban: 'CH44 0023 0230 0044 1122 3',
          confidence_score: 0.99,
        },
        discrepancies_found: [
          {
            type: 'PRICE_VARIANCE' as const,
            item: 'Frischbeton C25/30 (400 m³)',
            expected: 'CHF 88.00 / m³',
            actual: 'CHF 96.00 / m³',
            financial_impact_chf: 3200.0,
            severity: 'HIGH' as const,
          },
        ],
        total_financial_loss_prevented_chf: 3200.0,
        draft_dispute_letter_de: `Sehr geehrte Damen und Herren,\n\nwir beanstanden die Rechnung INV-BAU-2026-911 bezüglich PO-BAU-4010. Der m³-Preis für Frischbeton C25/30 übersteigt den vertraglich fixierten Satz von CHF 88.00/m³ um CHF 8.00/m³.\n\nBitte übermitteln Sie uns eine Gutschrift über CHF 3'200.00.\n\nFreundliche Grüsse,\nSmart Grid AG / Bauwerk Alpine AG`,
      },
    },
    {
      title: 'Alpine Freight Logistics (Mengenfehler Transport)',
      poNumber: 'PO-88102',
      supplierName: 'Alpine Logistics & Freight Services GmbH',
      iban: 'CH88 0078 0000 8822 1100 4',
      invoiceNumber: 'INV-2026-881',
      date: '2026-10-10',
      amount: 'CHF 8,950.00',
      itemsText: '23x Express Pallet Freight Delivery @ CHF 387.50 = CHF 8,950.00. (Lieferschein Wareneingang bestätigt nur 20 Paletten)',
      auditResult: {
        audit_status: 'FLAGGED' as const,
        supplier: {
          name: 'Alpine Logistics & Freight Services GmbH',
          iban: 'CH88 0078 0000 8822 1100 4',
          confidence_score: 0.95,
        },
        discrepancies_found: [
          {
            type: 'QUANTITY_MISMATCH' as const,
            item: 'Express Pallet Freight Delivery',
            expected: '20 Paletten (gemäss Wareneingang)',
            actual: '23 Paletten (in Rechnung)',
            financial_impact_chf: 1162.5,
            severity: 'HIGH' as const,
          },
        ],
        total_financial_loss_prevented_chf: 1162.5,
        draft_dispute_letter_de: `Sehr geehrte Damen und Herren,\n\nauf Rechnung INV-2026-881 wurden 23 Paletten abgerechnet. Gemäss quittiertem Lieferschein wurden jedoch nur 20 Paletten zugestellt.\n\nWir bitten um Reduktion der Rechnungssumme um CHF 1'162.50.\n\nFreundliche Grüsse,\nSmart Grid AG / Revisionsabteilung`,
      },
    },
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const currentPreset = samplePresets[selectedPresetIndex];

  // Scan progress state
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [auditOutput, setAuditOutput] = useState<NeuralAuditOutput | null>(samplePresets[0].auditResult);
  const [copied, setCopied] = useState(false);
  const [rawJsonView, setRawJsonView] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const scanSteps = [
    { num: 1, title: '1. Multimodale OCR & Vision', desc: 'Extrahiere Kopfdaten, Einzelpositionen & QR-IBAN...' },
    { num: 2, title: '2. Purchase Order Reconciliation', desc: 'Abgleich mit PO-Context (PO-2026-992) & Stammdaten...' },
    { num: 3, title: '3. Neural Discrepancy & VAT Engine', desc: 'Prüfe Preissätze, Mengen, ESTV 8.1% MWST & Duplikate...' },
    { num: 4, title: '4. Forensic Report & Dispute Generation', desc: 'Erstelle Mängelrüge nach OR Art. 82/107 & Schutzsumme...' },
  ];

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setAuditOutput(samplePresets[idx].auditResult);
  };

  const handleRun4StepSimulation = (
    customFileName?: string,
    presetIdx: number = selectedPresetIndex
  ) => {
    setScanning(true);
    setScanStep(1);

    const preset = samplePresets[presetIdx];
    const fileName = customFileName || `Invoice_${preset.invoiceNumber}.pdf`;

    setTimeout(() => setScanStep(2), 600);
    setTimeout(() => setScanStep(3), 1200);
    setTimeout(() => setScanStep(4), 1800);

    setTimeout(() => {
      setScanning(false);
      setScanStep(0);
      setAuditOutput(preset.auditResult);

      // Add to global state
      const newRecord: InvoiceRecord = {
        id: `inv-scan-${Date.now()}`,
        invoiceNumber: preset.invoiceNumber,
        supplierName: preset.supplierName,
        invoiceDate: preset.date,
        poNumber: preset.poNumber,
        totalBilledCHF: parseFloat(preset.amount.replace(/[^0-9.]/g, '')),
        totalPOCHF: parseFloat(preset.amount.replace(/[^0-9.]/g, '')) - preset.auditResult.total_financial_loss_prevented_chf,
        varianceCHF: preset.auditResult.total_financial_loss_prevented_chf,
        status: preset.auditResult.audit_status === 'FLAGGED' ? 'discrepancy' : 'approved',
        discrepancyType: preset.auditResult.discrepancies_found[0]?.type === 'PRICE_VARIANCE' ? 'Price Variance' : preset.auditResult.discrepancies_found[0]?.type === 'QUANTITY_MISMATCH' ? 'Quantity Mismatch' : 'VAT Error',
        riskLevel: 'High',
        confidenceScore: Math.round(preset.auditResult.supplier.confidence_score * 100),
        lineItems: preset.auditResult.discrepancies_found.map((d, i) => ({
          id: `li-${i}`,
          description: d.item,
          poUnitPrice: 240,
          billedUnitPrice: 265,
          poQuantity: 10,
          billedQuantity: 12,
          varianceCHF: d.financial_impact_chf,
          reason: `${d.type}: Ist (${d.actual}) vs Soll (${d.expected})`,
        })),
        disputeLetter: preset.auditResult.draft_dispute_letter_de,
      };

      onAddAuditedInvoice(newRecord);
    }, 2400);
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      handleRun4StepSimulation(file.name, 0);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.png,.jpg,.jpeg,.tiff"
        className="hidden"
      />

      {/* Header */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#3d9970] text-xs font-bold mb-2 border border-emerald-200">
            <Sparkles className="w-4 h-4 text-[#3d9970]" />
            <span>KlarSolution Neural 3-Way Matching Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Multimodale Belegprüfung & Forensik</h1>
          <p className="text-xs text-slate-500 mt-1">
            Automatisierter Abgleich von Belegbildern/PDFs mit Purchase Order JSON zur Aufdeckung von Preiskorrekturen, Mengendifferenzen und Schweizer MWST-Fehlern.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRawJsonView(!rawJsonView)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-colors shadow-sm self-start md:self-auto"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>{rawJsonView ? 'Visuelle Ansicht' : 'Raw JSON Schema'}</span>
        </button>
      </div>

      {/* Drag & Drop Dropzone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={handleDropzoneClick}
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
              handleRun4StepSimulation(file.name, 0);
            } else {
              handleRun4StepSimulation('Uploaded_Invoice.pdf', 0);
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
            Rechnung uploaden oder ziehen (PDF, Image)
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Klicken Sie, um Belege hochzuladen. Startet automatisch den neuralen 3-Wege-Abgleich mit PO-2026-992.
            {uploadedFileName && (
              <span className="block mt-2 font-bold text-[#3d9970]">
                Analysiert: {uploadedFileName}
              </span>
            )}
          </p>
        </div>

        {/* Action Panel */}
        <div className="bg-gradient-to-br from-[#08271e] to-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold uppercase mb-2 border border-emerald-800">
              <Sparkles className="w-3 h-3" />
              <span>Neural 3-Way Engine</span>
            </div>
            <h3 className="font-extrabold text-base text-white">Forensische Live-Analyse</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Prüft Beleg gegen Purchase Order, validiert Schweizer 8.1% MWST und errechnet verhinderte Kostenverluste.
            </p>
          </div>

          <button
            type="button"
            disabled={scanning}
            onClick={() => handleRun4StepSimulation()}
            className="w-full mt-4 py-3.5 rounded-2xl bg-[#3d9970] hover:bg-[#2f8a68] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {scanning ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <FileCheck2 className="w-4 h-4 text-white" />
            )}
            <span>{scanning ? 'Neural Audit läuft...' : 'PO-2026-992 Forensik ausführen'}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Animated Scan Progress Bar */}
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

      {/* Preset Selectors */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
          Muster-Purchase Orders für 3-Way Reconciliation auswählen:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(idx)}
              className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all ${
                selectedPresetIndex === idx
                  ? 'bg-[#08271e] text-white border-[#08271e] shadow-md'
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
            /* RAW JSON Output View matching exact user schema */
            <div className="bg-slate-950 text-emerald-400 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-3 font-mono text-xs overflow-x-auto relative">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2 mb-3 font-sans">
                <span className="font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Strict JSON Response Schema (Audit Output)</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(auditOutput, null, 2));
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
                {JSON.stringify(auditOutput, null, 2)}
              </pre>
            </div>
          ) : (
            /* Visually Rich Forensic Accounting Dashboard Display */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Audit Summary & Discrepancy Breakdown */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
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
                      <span>Audit Status: {auditOutput.audit_status}</span>
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

                {/* Supplier Information Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{auditOutput.supplier.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#2d5c46] font-bold text-[10px]">
                      Confidence Score: {(auditOutput.supplier.confidence_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    IBAN: {auditOutput.supplier.iban} (Schweizer Clearing Verifiziert)
                  </div>
                </div>

                {/* Discrepancies Table */}
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
                            <span className="text-slate-400 block">Soll (PO / Vertraulich):</span>
                            <span className="font-mono font-bold text-emerald-700">{disc.expected}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Ist (Rechnung Beleg):</span>
                            <span className="font-mono font-bold text-amber-800">{disc.actual}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Draft Dispute Letter (German) */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-lg space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Kaufmännische Mängelrüge (OR Art. 82)</span>
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
                    Generiertes Schreiben für das Lieferanten-Debi-Team in Deutsch nach Schweizer Obligationenrecht:
                  </p>

                  <textarea
                    readOnly
                    rows={12}
                    value={auditOutput.draft_dispute_letter_de}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed outline-none focus:border-emerald-500"
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
                      a.download = `Maengelruege_${currentPreset.supplierName.replace(/\s+/g, '_')}_${currentPreset.invoiceNumber}.txt`;
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
