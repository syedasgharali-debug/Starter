import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSpreadsheet,
  ScanLine,
  AlertCircle,
  Users,
  CreditCard,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard',
      label: 'Übersicht',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      path: '/dashboard/invoices',
      label: 'Rechnungs-Center',
      icon: FileSpreadsheet,
    },
    {
      path: '/dashboard/scanner',
      label: 'KI-Belegscanner',
      icon: ScanLine,
      badge: 'KI 3.0',
    },
    {
      path: '/dashboard/disputes',
      label: 'Reklamations-Hub',
      icon: AlertCircle,
    },
    {
      path: '/dashboard/suppliers',
      label: 'Lieferanten-Risiko',
      icon: Users,
    },
    {
      path: '/dashboard/settings',
      label: 'Billing & Pakete',
      icon: CreditCard,
    },
    {
      path: '/dashboard/admin',
      label: 'Integrationen & Admin',
      icon: ShieldCheck,
    },
  ];

  const isPathActive = (itemPath: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === itemPath;
    }
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  return (
    <aside
      className={`bg-white border-r border-slate-200 h-screen flex flex-col justify-between transition-all duration-300 ease-in-out relative z-30 shadow-sm flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Logo & Header */}
      <div>
        <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-[#08271e] text-white flex items-center justify-center font-serif font-extrabold text-lg shadow-sm border border-[#3d9970]/30 group-hover:scale-105 transition-transform flex-shrink-0">
              k<span className="text-[#3d9970]">s</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col text-left leading-tight overflow-hidden whitespace-nowrap">
                <span className="font-serif font-extrabold tracking-tight text-base text-[#142032]">
                  klar <span className="text-[#3d9970]">solution</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                  Smart Grid AG
                </span>
              </div>
            )}
          </NavLink>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isPathActive(item.path, item.exact);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all relative group ${
                  active
                    ? 'bg-[#08271e] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    active ? 'text-[#86c8aa]' : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-[#3d9970]/20 text-[#2f815f] border border-[#3d9970]/30 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    {item.badge}
                  </span>
                )}

                {/* Tooltip on Collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs transition-colors border border-slate-200"
          title={isCollapsed ? 'Sidebar ausklappen' : 'Sidebar einklappen'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-600" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-slate-600" />
              <span className="text-slate-700">Navigation einklappen</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
