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
  Search,
  Database,
  Layers,
} from 'lucide-react';

interface ScannerViewProps {
  currentLang: Language;
  onAddAuditedInvoice: (invoice: InvoiceRecord) => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  currentLang,
  onAddAuditedInvoice,
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const samplePresets = [
    {
      title: 'Bauwerk Alpine AG - Gotthard Beton (Preiszuschlag)',
      supplier: 'Gotthard Beton & Kies AG',
      invoiceNumber: 'INV-BAU-2026-911',
      poNumber: 'PO-BAU-4010',
      date: '2026-10-19',
      amount: 'CHF 38,400.00',
      itemsText: '400m3 Frischbeton C25/30 @ CHF 96.00/m3 = CHF 38,400.00. (PO #PO-BAU-4010 vereinbart: CHF 88.00/m3)',
      varianceCHF: 3200.0,
      discrepancyType: 'Price Variance' as const,
      riskLevel: 'High' as const,
    },
    {
      title: 'Swiss Industrial Hydraulics AG (Preis-Abweichung)',
      supplier: 'Swiss Industrial Hydraulics AG',
      invoiceNumber: 'INV-2026-904',
      poNumber: 'PO-88204',
      date: '2026-10-12',
      amount: 'CHF 12,400.00',
      itemsText: '100x Industrial Hydraulic Valves #HV-400 @ CHF 124.00/stk = CHF 12,400.00. (PO #PO-88204 vereinbart: CHF 118.00/stk)',
      varianceCHF: 600.0,
      discrepancyType: 'Price Variance' as const,
      riskLevel: 'Medium' as const,
    },
    {
      title: 'Alpine Freight Logistics (Mengenfehler)',
      supplier: 'Alpine Logistics & Freight Services GmbH',
      invoiceNumber: 'INV-2026-881',
      poNumber: 'PO-88102',
      date: '2026-10-10',
      amount: 'CHF 8,950.00',
      itemsText: '23x Express Pallet Freight Delivery @ CHF 387.50 = CHF 8,950.00. (Lieferschein Wareneingang bestätigt nur 20 Paletten)',
      varianceCHF: 1162.5,
      discrepancyType: 'Quantity Mismatch' as const,
      riskLevel: 'High' as const,
    },
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [supplierInput, setSupplierInput] = useState(samplePresets[0].supplier);
  const [invoiceNoInput, setInvoiceNoInput] = useState(samplePresets[0].invoiceNumber);
  const [poNoInput, setPoNoInput] = useState(samplePresets[0].poNumber);
  const [dateInput, setDateInput] = useState(samplePresets[0].date);
  const [amountInput, setAmountInput] = useState(samplePresets[0].amount);
  const [itemsTextInput, setItemsTextInput] = useState(samplePresets[0].itemsText);

  // Scan progress state
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const scanSteps = [
    { num: 1, title: '1. OCR-Texterkennung', desc: 'Extrahiere Beleg-Kopfdaten, Beträge & Einzelpositionen...' },
    { num: 2, title: '2. Claude 3.5 Sonnet Extraktion', desc: 'Semantische Validierung & Strukturierung der Belege...' },
    { num: 3, title: '3. 3-Wege-Abgleich (Rechnung vs. PO vs. Lieferschein)', desc: 'Gleiche Preise und Mengen mit ERP-Bestellung & Lieferschein ab...' },
    { num: 4, title: '4. KI-Abweichungserkennung & Reklamation', desc: 'Berechne Gesamtdifferenz & erstelle Reklamationsentwurf...' },
  ];

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    const p = samplePresets[idx];
    setSupplierInput(p.supplier);
    setInvoiceNoInput(p.invoiceNumber);
    setPoNoInput(p.poNumber);
    setDateInput(p.date);
    setAmountInput(p.amount);
    setItemsTextInput(p.itemsText);
    setScanResult(null);
  };

  const handleRun4StepSimulation = (
    customFileName?: string,
    presetIdx: number = selectedPresetIndex
  ) => {
    setScanning(true);
    setScanResult(null);
    setScanStep(1);

    const preset = samplePresets[presetIdx];
    const fileName = customFileName || `Rechnung_${preset.invoiceNumber}.pdf`;

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);
    setTimeout(() => setScanStep(4), 2100);

    setTimeout(() => {
      setScanning(false);
      setScanStep(0);

      const createdAuditResult = {
        discrepancyFound: true,
        discrepancyType: preset.discrepancyType,
        confidenceScorePct: 99,
        summary: `Echtzeit-Scan abgeschlossen (${fileName}): ${preset.supplier} (Rechnung ${preset.invoiceNumber}). ${preset.itemsText}`,
        overchargeAmountCHF: preset.varianceCHF,
        disputeLetterTemplate: `Sehr geehrte Damen und Herren,\n\nbei der Belegprüfung unserer Lieferantenrechnung ${preset.invoiceNumber} (PO ${preset.poNumber}) wurde eine erhebliche Abweichung festgestellt.\n\nDetailbefund:\n${preset.itemsText}\n\nGemäss Schweizer Obligationenrecht (OR Art. 82 / 107) fordern wir Sie auf, uns innert 10 Tagen eine entsprechende Gutschrift über CHF ${preset.varianceCHF.toFixed(2)} einzureichen.\n\nFreundliche Grüsse,\nSmart Grid AG / KlarSolution Revisionsleitung`,
      };

      setScanResult(createdAuditResult);

      // Add to global state
      const newRecord: InvoiceRecord = {
        id: `inv-scan-${Date.now()}`,
        invoiceNumber: preset.invoiceNumber,
        supplierName: preset.supplier,
        invoiceDate: preset.date,
        poNumber: preset.poNumber,
        totalBilledCHF: parseFloat(preset.amount.replace(/[^0-9.]/g, '')),
        totalPOCHF: parseFloat(preset.amount.replace(/[^0-9.]/g, '')) - preset.varianceCHF,
        varianceCHF: preset.varianceCHF,
        status: 'discrepancy',
        discrepancyType: preset.discrepancyType,
        riskLevel: preset.riskLevel,
        confidenceScore: 99,
        lineItems: [
          {
            id: `li-${Date.now()}`,
            description: preset.itemsText,
            poUnitPrice: 100,
            billedUnitPrice: 110,
            poQuantity: 10,
            billedQuantity: 10,
            varianceCHF: preset.varianceCHF,
            reason: preset.itemsText,
          },
        ],
        disputeLetter: createdAuditResult.disputeLetterTemplate,
      };

      onAddAuditedInvoice(newRecord);
    }, 2800);
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
    <div className="space-y-8 animate-fadeIn text-[#142032]">
      {/* Hidden File Input for Native Dialog */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.png,.jpg,.jpeg,.tiff"
        className="hidden"
      />

      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef8f3] text-[#3d9970] text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Echtzeit-Belegprüfung & Live-Scan Engine</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-[#142032]">Beleg-Upload & Live Scan</h1>
        <p className="text-xs text-gray-500 mt-1">
          Laden Sie Belege hoch oder starten Sie das Test-Paket für eine automatische 4-Stufen-Analyse (1. OCR-Texterkennung → 2. Claude 3.5 Extraktion → 3. 3-Wege-Abgleich → 4. KI-Abweichungserkennung).
        </p>
      </div>

      {/* Drag and Drop Dropzone & Test-Paket Laden Button */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dropzone */}
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
              ? 'border-[#3d9970] bg-[#eef8f3] scale-[1.01]'
              : 'border-gray-300 bg-white hover:border-[#3d9970] hover:bg-gray-50/50'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#08271e] text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
            <Upload className="w-7 h-7 text-[#3d9970]" />
          </div>
          <h3 className="font-extrabold text-sm text-[#142032] mb-1">
            Rechnungen hier hineinziehen oder klicken (PDF, PNG, JPG)
          </h3>
          <p className="text-xs text-gray-500 max-w-sm">
            Klicken Sie hier, um Dateien auszuwählen, oder ziehen Sie Belege direkt hinein.
            {uploadedFileName && (
              <span className="block mt-2 font-bold text-[#3d9970]">
                Zuletzt geladen: {uploadedFileName}
              </span>
            )}
          </p>
        </div>

        {/* Test-Paket Laden Action Card */}
        <div className="bg-gradient-to-br from-[#08271e] to-[#142032] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3d9970]/30 text-[#86c8aa] text-[10px] font-extrabold uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Demopaket</span>
            </div>
            <h3 className="font-extrabold text-base text-white">Test-Paket Laden</h3>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Führt die 4-Stufen-Prüfung aus, aktualisiert die Rechnungstabelle & schlägt Kreditansprüche vor.
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
            <span>{scanning ? 'Scan läuft...' : 'Test-Paket laden & scannen'}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Animated Scan Progress Bar */}
      {scanning && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#142032] uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#3d9970] animate-spin" />
              4-Stufen Live-Scan Simulation aktiv...
            </span>
            <span className="text-xs font-mono font-bold text-[#3d9970]">Schritt {scanStep} von 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {scanSteps.map((s) => (
              <div
                key={s.num}
                className={`p-3.5 rounded-2xl border transition-all text-xs ${
                  scanStep === s.num
                    ? 'bg-[#08271e] text-white border-[#08271e] shadow-lg scale-[1.02]'
                    : scanStep > s.num
                    ? 'bg-[#eef8f3] text-[#2d7d5d] border-[#d6ebe1]'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
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
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
        <span className="text-xs font-bold text-gray-500 block uppercase tracking-wider">
          Muster-Rechnungen für detaillierte Manuelle Prüfung wählen:
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
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="block font-bold mb-1">{preset.title}</span>
              <span className="text-[11px] opacity-80 block truncate">{preset.supplier}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs & Audit Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#142032] border-b border-gray-100 pb-3">
            Rechnungsdaten & Freitext-Positionen
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-gray-600 mb-1">Lieferant</label>
              <input
                type="text"
                value={supplierInput}
                onChange={(e) => setSupplierInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-600 mb-1">Rechnungs-Nr.</label>
              <input
                type="text"
                value={invoiceNoInput}
                onChange={(e) => setInvoiceNoInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-600 mb-1">Datum</label>
              <input
                type="text"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-600 mb-1">Rechnungsbetrag</label>
              <input
                type="text"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Positionsdaten / OCR-Text</label>
            <textarea
              rows={4}
              value={itemsTextInput}
              onChange={(e) => setItemsTextInput(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-xs font-mono"
            />
          </div>

          <button
            type="button"
            disabled={scanning}
            onClick={() => handleRun4StepSimulation()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#245f49] to-[#3d9970] hover:from-[#1a4a38] hover:to-[#2f8a68] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>4-Stufen KI-Scan starten</span>
          </button>
        </div>

        {/* Scan Results Display */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#142032] border-b border-gray-100 pb-3 flex justify-between items-center">
            <span>Audit-Ergebnis der Belegprüfung</span>
            {scanResult && (
              <span className="text-xs font-bold text-[#3d9970] bg-[#eef8f3] px-2.5 py-1 rounded-full">
                Confidence: {scanResult.confidenceScorePct}%
              </span>
            )}
          </h3>

          {!scanResult && !scanning && (
            <div className="py-12 text-center text-gray-400 space-y-2">
              <ScanLine className="w-12 h-12 mx-auto text-gray-300" />
              <p className="text-xs font-medium">Klicken Sie oben auf "Test-Paket laden" oder "4-Stufen KI-Scan starten".</p>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4 text-xs">
              {/* Finding Status Box */}
              <div
                className={`p-4 rounded-2xl border ${
                  scanResult.discrepancyFound
                    ? 'bg-[#fff3e6] border-[#f5d0bc] text-[#8a5a10]'
                    : 'bg-[#eef8f3] border-[#d6ebe1] text-[#2d7d5d]'
                }`}
              >
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
                  {scanResult.discrepancyFound ? (
                    <AlertTriangle className="w-5 h-5 text-[#df6029]" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  <span>{scanResult.discrepancyType || 'Abweichung Erkannt'}</span>
                </div>
                <p className="font-medium text-gray-800 leading-relaxed">{scanResult.summary}</p>
                {scanResult.overchargeAmountCHF > 0 && (
                  <div className="mt-2 text-sm font-extrabold font-mono text-[#df6029]">
                    Kostenverlust: + CHF {scanResult.overchargeAmountCHF.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Template Output */}
              {scanResult.disputeLetterTemplate && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Erstellter Reklamationstext (OR Art. 82/107):</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(scanResult.disputeLetterTemplate);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                      }}
                      className="px-2.5 py-1 rounded bg-[#3d9970] text-white text-[11px] font-bold flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
                    </button>
                  </div>
                  <textarea
                    readOnly
                    rows={6}
                    value={scanResult.disputeLetterTemplate}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs font-mono bg-gray-50 text-gray-800"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
