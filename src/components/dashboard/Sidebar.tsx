import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  Lock,
  KeyRound,
  Database,
} from 'lucide-react';
import { Logo } from '../Logo';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { effectiveRole } = useApp();
  const isAdmin = effectiveRole === 'Administrator';

  const userNavItems = [
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
      label: 'KI-Belegscanner 3.0',
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
      path: '/dashboard/billing',
      label: 'Billing & Pakete',
      icon: CreditCard,
    },
  ];

  const adminNavItems = [
    {
      path: '/dashboard/users',
      label: 'Benutzer & RBAC-Rollen',
      icon: ShieldCheck,
    },
    {
      path: '/dashboard/sso-api',
      label: 'SSO, APIs & CLI-Setup',
      icon: KeyRound,
    },
    {
      path: '/dashboard/audit',
      label: 'ERP, Mandanten & Audit-Log',
      icon: Database,
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
      className={`bg-[#0a0d14] border-r border-slate-800/90 h-screen flex flex-col justify-between transition-all duration-300 ease-in-out relative z-30 shadow-2xl flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Logo & Branding Header */}
      <div className="flex-1 overflow-y-auto">
        <div className="h-24 bg-black border-b border-slate-800 px-3 flex items-center justify-center overflow-hidden">
          <Logo
            variant={isCollapsed ? 'icon' : 'full'}
            size={isCollapsed ? 'sm' : 'md'}
            to="/"
          />
        </div>

        {/* Group 1: Operatives User-Panel */}
        <div className="p-3 space-y-2 mt-2">
          {!isCollapsed && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-[11px] font-black uppercase tracking-wider flex items-center justify-between">
              <span>Operatives User-Panel</span>
            </div>
          )}

          {userNavItems.map((item) => {
            const Icon = item.icon;
            const active = isPathActive(item.path, item.exact);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black text-white transition-all relative group ${
                  active
                    ? 'bg-[#3d9970] text-white shadow-lg shadow-[#3d9970]/30 border border-emerald-400/40 scale-[1.01]'
                    : 'text-white hover:text-white hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    active ? 'text-white' : 'text-emerald-400 group-hover:text-emerald-300'
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left text-white font-extrabold">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-black rounded-md flex items-center gap-0.5 ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-900/90 text-emerald-300 border border-emerald-700/60'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    {item.badge}
                  </span>
                )}

                {/* Tooltip on Collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Group 2: Separates Admin-Panel */}
        <div className="p-3 space-y-2 border-t border-slate-800 mt-3">
          {!isCollapsed && (
            <div className="px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 text-[11px] font-black uppercase tracking-wider flex items-center justify-between">
              <span>Separates Admin-Panel</span>
              {!isAdmin && (
                <span className="text-[9px] text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded font-black border border-amber-800">
                  Gesperrt
                </span>
              )}
            </div>
          )}

          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const active = isPathActive(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={isCollapsed ? `${item.label} ${!isAdmin ? '(Gesperrt)' : ''}` : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black text-white transition-all relative group ${
                  active
                    ? 'bg-[#3d9970] text-white shadow-lg shadow-[#3d9970]/30 border border-emerald-400/40 scale-[1.01]'
                    : !isAdmin
                    ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                    : 'text-white hover:text-white hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    active
                      ? 'text-white'
                      : !isAdmin
                      ? 'text-amber-400'
                      : 'text-emerald-400 group-hover:text-emerald-300'
                  }`}
                />

                {!isCollapsed && (
                  <span className={`truncate flex-1 text-left text-white font-extrabold ${!isAdmin ? 'opacity-90' : ''}`}>
                    {item.label}
                  </span>
                )}

                {!isAdmin && (
                  <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                )}

                {/* Tooltip on Collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 flex items-center gap-2">
                    <span>{item.label}</span>
                    {!isAdmin && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-slate-800 bg-[#090c10]">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors border border-slate-700/80 shadow-xs"
          title={isCollapsed ? 'Sidebar ausklappen' : 'Sidebar einklappen'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#3d9970]" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-[#3d9970]" />
              <span className="font-extrabold text-white">Navigation einklappen</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
