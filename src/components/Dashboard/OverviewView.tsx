import React, { useMemo } from 'react';
import { Language, InvoiceRecord, SupplierRecord } from '../../types';
import { translations } from '../../translations/translations';
import {
  FileCheck2,
  TrendingDown,
  AlertTriangle,
  Award,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Activity,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts';

interface OverviewViewProps {
  currentLang: Language;
  invoices: InvoiceRecord[];
  suppliers: SupplierRecord[];
  onNavigateToView: (view: 'invoices' | 'scanner' | 'disputes' | 'suppliers') => void;
}

// Custom Tooltip for Recovered Amounts Sparkline
const RecoveredSparklineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#08271e] text-white px-3 py-1.5 rounded-xl text-[11px] font-mono shadow-xl border border-[#3d9970]/40">
        <div className="font-bold text-[#86c8aa]">{data.dateStr}</div>
        <div>Tagessumme: CHF {data.dailyRecovered.toLocaleString()}</div>
        <div className="text-[10px] opacity-75">Kumuliert: CHF {data.cumRecovery.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Audit Volume Sparkline
const VolumeSparklineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#08271e] text-white px-3 py-1.5 rounded-xl text-[11px] font-mono shadow-xl border border-[#3d9970]/40">
        <div className="font-bold text-[#86c8aa]">{data.dateStr}</div>
        <div>Belege geprüft: {data.dailyVolume} Stk</div>
        <div className="text-[10px] opacity-75">Gesamt geprüft: {data.cumVolume} Stk</div>
      </div>
    );
  }
  return null;
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentLang,
  invoices,
  suppliers,
  onNavigateToView,
}) => {
  const t = translations[currentLang];

  const totalAudited = 384;
  const totalOverchargesRecovered = invoices.reduce((acc, curr) => acc + curr.varianceCHF, 42100);
  const activeDiscrepanciesCount = invoices.filter((i) => i.status === 'discrepancy' || i.status === 'duplicate').length;
  const auditAccuracyPct = 99.4;

  // Generate deterministic 30-day trend dataset for sparklines
  const trendData30Days = useMemo(() => {
    const data = [];
    let cumVolume = 320;
    let cumRecovery = 28500;

    for (let i = 29; i >= 0; i--) {
      const date = new Date(2026, 9, 19); // 19. Oct 2026
      date.setDate(date.getDate() - i);
      const dayLabel = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      // Simulate daily metrics
      const dailyVolume = Math.max(1, Math.floor(3 + Math.sin(i * 0.8) * 3 + (i % 4 === 0 ? 3 : 0)));
      const dailyRecovered = Math.floor(dailyVolume * 310 + (i % 5 === 0 ? 1400 : 200) + Math.cos(i * 1.2) * 250);

      cumVolume += dailyVolume;
      cumRecovery += dailyRecovered;

      data.push({
        dateStr: dayLabel,
        dailyVolume,
        cumVolume,
        dailyRecovered,
        cumRecovery,
      });
    }
    return data;
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Subtitle */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#142032]">{t.dashTitle}</h1>
          <p className="text-xs text-gray-500 mt-1">{t.dashSubtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateToView('scanner')}
            className="px-4 py-2.5 rounded-xl bg-[#3d9970] hover:bg-[#2f8a68] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <span>{t.dashRunAiScanner}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Operational KPI Cards with Integrated Recharts Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Geprüfte Rechnungen + 30-Day Sparkline */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#3d9970]/50 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">Geprüfte Rechnungen</span>
              <div className="p-2 bg-[#eef8f3] text-[#3d9970] rounded-lg">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-extrabold text-[#142032]">384 Belege</div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+28% MTD</span>
              </span>
              <span className="text-gray-400 font-mono text-[10px]">30-Tage Trend</span>
            </div>
          </div>

          {/* Recharts Mini Sparkline Area Chart */}
          <div className="h-14 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData30Days} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="volumeSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d9970" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3d9970" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Tooltip content={<VolumeSparklineTooltip />} />
                <Area
                  type="monotone"
                  dataKey="dailyVolume"
                  stroke="#3d9970"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#volumeSparklineGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 2: Erkannte Abweichungen + 30-Day Sparkline */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#3d9970]/50 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">Erkannte Abweichungen</span>
              <div className="p-2 bg-[#fff3e6] text-[#df6029] rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-extrabold text-[#df6029] font-mono">
              CHF 14'250
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#df6029] font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>4 offene Fälle</span>
              </span>
              <span className="text-gray-400 font-mono text-[10px]">30-Tage Trend</span>
            </div>
          </div>

          {/* Recharts Mini Sparkline Area Chart */}
          <div className="h-14 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData30Days} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="recoveredSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#245f49" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#245f49" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Tooltip content={<RecoveredSparklineTooltip />} />
                <Area
                  type="monotone"
                  dataKey="dailyRecovered"
                  stroke="#245f49"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#recoveredSparklineGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 3: Verifizierte Zahlungen */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">Verifizierte Zahlungen</span>
              <div className="p-2 bg-[#eef8f3] text-[#3d9970] rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-extrabold text-[#3d9970] font-mono">
              CHF 182'400
            </div>
            <span className="text-[11px] text-[#3d9970] font-semibold block">✓ 3-Wege-Abgleich bestanden</span>
          </div>

          <div className="pt-2 text-[11px] text-gray-500 border-t border-gray-100 flex justify-between items-center">
            <span>Freigegeben zur Zahlung</span>
            <span className="font-bold text-[#3d9970]">100% Konform</span>
          </div>
        </div>

        {/* KPI 4: Revisionsstatus */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">Revisionsstatus</span>
              <div className="p-2 bg-[#eef8f3] text-[#3d9970] rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-serif font-extrabold text-[#142032]">100% DSGVO</div>
            <span className="text-[11px] text-emerald-600 font-semibold block">Revisionssicher & Geobeschränkt</span>
          </div>

          <div className="pt-2 text-[11px] text-gray-500 border-t border-gray-100 flex justify-between items-center">
            <span>Schweizer Rechenzentrum</span>
            <span className="font-bold text-[#3d9970]">ISO 27001</span>
          </div>
        </div>
      </div>

      {/* Discrepancy Breakdown & 6-Month Recovery Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Trend Chart Visual */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-[#142032]">Monatlich Identifizierte Kostenverluste (CHF)</h3>
              <p className="text-xs text-gray-500">Verlauf der letzten 6 Monate nach Belegprüfung</p>
            </div>
            <span className="text-xs font-bold text-[#3d9970] bg-[#eef8f3] px-3 py-1 rounded-full">
              Q3/Q4 2026
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { month: 'Mai', val: 4200, height: '35%' },
              { month: 'Jun', val: 6800, height: '55%' },
              { month: 'Jul', val: 8900, height: '70%' },
              { month: 'Aug', val: 7100, height: '60%' },
              { month: 'Sep', val: 11400, height: '88%' },
              { month: 'Okt', val: 14250, height: '100%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[11px] font-mono text-gray-500 group-hover:text-[#3d9970] transition-colors">
                  CHF {bar.val.toLocaleString()}
                </span>
                <div
                  style={{ height: bar.height }}
                  className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-[#245f49] to-[#3d9970] group-hover:from-[#2f815f] group-hover:to-[#4aa77d] transition-all shadow-sm"
                />
                <span className="text-xs font-bold text-gray-700">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discrepancy Breakdown by Type */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#142032] border-b border-gray-100 pb-3">
            Verteilung nach Abweichungsart
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Preisabweichungen</span>
                <span className="text-[#3d9970]">42%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#3d9970] w-[42%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Mengenfehler</span>
                <span className="text-[#3d9970]">28%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#245f49] w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Doppelabrechnungen</span>
                <span className="text-[#df6029]">18%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#df6029] w-[18%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Rechen- & MWST-Fehler</span>
                <span className="text-[#3d9970]">12%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#86c8aa] w-[12%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Flagged Invoices Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="font-bold text-base text-[#142032]">{t.dashRecentInvoices}</h3>
          <button
            type="button"
            onClick={() => onNavigateToView('invoices')}
            className="text-xs font-bold text-[#3d9970] hover:underline flex items-center gap-1"
          >
            <span>Alle anzeigen</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left ltr:text-left rtl:text-right text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Rechnung #</th>
                <th className="pb-3">Lieferant</th>
                <th className="pb-3">Datum</th>
                <th className="pb-3">Berechnet</th>
                <th className="pb-3">Abweichung</th>
                <th className="pb-3">Art</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {invoices.slice(0, 5).map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 font-bold font-mono text-[#142032]">{inv.invoiceNumber}</td>
                  <td className="py-3.5">{inv.supplierName}</td>
                  <td className="py-3.5 text-gray-500">{inv.invoiceDate}</td>
                  <td className="py-3.5 font-mono">CHF {inv.totalBilledCHF.toLocaleString()}</td>
                  <td className="py-3.5 font-mono font-bold text-[#df6029]">
                    {inv.varianceCHF > 0 ? `+ CHF ${inv.varianceCHF.toLocaleString()}` : '0.00'}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-semibold">
                      {inv.discrepancyType}
                    </span>
                  </td>
                  <td className="py-3.5">
                    {inv.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eef8f3] text-[#2d7d5d] text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Freigegeben
                      </span>
                    ) : inv.status === 'duplicate' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fdf0ea] text-[#df6029] text-[11px] font-bold">
                        <XCircle className="w-3 h-3" /> Doppelabrechnung
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff6ea] text-[#8a5a10] text-[11px] font-bold">
                        <AlertTriangle className="w-3 h-3" /> Abweichung
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
