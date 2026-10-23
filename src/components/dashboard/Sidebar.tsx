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
import { Logo } from '../Logo';

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
      className={`bg-black border-r border-neutral-900 h-screen flex flex-col justify-between transition-all duration-300 ease-in-out relative z-30 shadow-2xl flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Logo & Header */}
      <div>
        <div className="h-28 bg-black border-b border-neutral-900 px-3 flex items-center justify-center overflow-hidden">
          <Logo
            variant={isCollapsed ? 'icon' : 'full'}
            size={isCollapsed ? 'sm' : 'md'}
            to="/"
          />
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
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
                    ? 'bg-emerald-950/80 text-white border border-emerald-800/60 shadow-sm'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    active ? 'text-emerald-400' : 'text-neutral-500 group-hover:text-neutral-300'
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/80 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    {item.badge}
                  </span>
                )}

                {/* Tooltip on Collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-white text-xs font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-neutral-900 bg-black">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white font-bold text-xs transition-colors border border-neutral-800"
          title={isCollapsed ? 'Sidebar ausklappen' : 'Sidebar einklappen'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-300">Navigation einklappen</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
