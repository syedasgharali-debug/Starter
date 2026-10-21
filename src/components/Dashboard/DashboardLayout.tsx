import React from 'react';
import { Language, DashboardView, AppView } from '../../types';
import { translations } from '../../translations/translations';
import {
  LayoutDashboard,
  FileSpreadsheet,
  ScanLine,
  AlertCircle,
  Users,
  Settings,
  ArrowLeft,
  Building,
  Bell,
  Search,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface DashboardLayoutProps {
  currentLang: Language;
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onBackToLanding: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentLang,
  activeView,
  onViewChange,
  onBackToLanding,
  children,
}) => {
  const t = translations[currentLang];

  const menuItems: { id: DashboardView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: t.dashTabOverview, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'invoices', label: t.dashTabInvoices, icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'scanner', label: t.dashTabScanner, icon: <ScanLine className="w-4 h-4" /> },
    { id: 'disputes', label: t.dashTabDisputes, icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'suppliers', label: t.dashTabSuppliers, icon: <Users className="w-4 h-4" /> },
    { id: 'settings', label: t.dashTabSettings, icon: <Settings className="w-4 h-4" /> },
    { id: 'admin', label: t.dashTabAdmin || 'Admin Portal', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-[#142032] flex flex-col font-sans">
      {/* Top Portal Header */}
      <header className="bg-[#08271e] text-white sticky top-0 z-40 border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToLanding}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Zurück zur Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.backToLanding}</span>
          </button>

          <div className="h-6 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-serif font-extrabold text-lg text-white">
              klar <span className="text-[#3d9970]">solution</span>
            </span>
            <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-[#3d9970]/30 text-[#86c8aa] text-[10px] font-extrabold uppercase border border-[#3d9970]/40">
              Audit Cockpit
            </span>
          </div>
        </div>

        {/* User & Org info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <Building className="w-3.5 h-3.5 text-[#86c8aa]" />
            <span className="font-bold text-gray-200">Bauwerk Alpine AG</span>
            <span className="text-[10px] text-[#86c8aa] bg-[#3d9970]/30 px-1.5 py-0.5 rounded font-mono">
              Enterprise
            </span>
          </div>

          <button
            type="button"
            onClick={() => onViewChange('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              activeView === 'admin'
                ? 'bg-[#3d9970] text-white border-[#3d9970]'
                : 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#86c8aa]" />
            <span className="hidden md:inline">{t.dashTabAdmin || 'Admin Portal'}</span>
          </button>

          <button
            type="button"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#df6029] rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-gray-200 p-3 sm:p-4 flex-shrink-0">
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all ${
                  activeView === item.id
                    ? 'bg-[#08271e] text-white shadow-md'
                    : 'text-gray-600 hover:bg-[#eef8f3] hover:text-[#2f815f]'
                }`}
              >
                <span className={activeView === item.id ? 'text-[#86c8aa]' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
