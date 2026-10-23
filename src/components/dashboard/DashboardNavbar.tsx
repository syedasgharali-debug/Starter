import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OperationalRole } from '../../types';
import {
  Building,
  Bell,
  UserCheck,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface DashboardNavbarProps {
  activeRole: OperationalRole;
  onRoleChange: (role: OperationalRole) => void;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  onSignOut: () => void;
}

const routeNames: Record<string, string> = {
  '/dashboard': 'Übersicht',
  '/dashboard/invoices': 'Rechnungs-Center',
  '/dashboard/scanner': 'KI-Belegscanner',
  '/dashboard/disputes': 'Reklamations-Hub',
  '/dashboard/suppliers': 'Lieferanten-Risiko',
  '/dashboard/settings': 'Billing & Pakete',
  '/dashboard/admin': 'Integrationen & Admin',
};

const roleBadges: Record<OperationalRole, string> = {
  Administrator: 'Vollzugriff & Freigabe',
  Controller: 'Finanzkontrolle & Export',
  Buchhalter: 'Belegerfassung & Buchung',
  Freigeber: 'Zahlungsfreigabe (bis CHF 100k)',
  Auditor: 'Revision & Audit-Trail',
};

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  activeRole,
  onRoleChange,
  userName,
  userEmail,
  userAvatarUrl,
  onSignOut,
}) => {
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentRouteName = routeNames[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
      {/* Left Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <span className="text-slate-400">Kundenbereich</span>
        <span className="text-slate-300">/</span>
        <span className="text-[#08271e] font-extrabold text-sm">{currentRouteName}</span>
      </div>

      {/* Right Controls Bar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time Sync Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Abacus / SAP Sync aktiv</span>
        </div>

        {/* Tenant Organization Switcher */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800">
          <Building className="w-3.5 h-3.5 text-[#3d9970]" />
          <span>Smart Grid AG</span>
          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-mono font-extrabold">
            Enterprise
          </span>
        </div>

        {/* 5-Role Switcher Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800">
          <UserCheck className="w-3.5 h-3.5 text-[#3d9970]" />
          <select
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as OperationalRole)}
            className="bg-transparent text-slate-900 font-extrabold text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="Administrator">Administrator (Vollzugriff)</option>
            <option value="Controller">Controller (Finanzübersicht)</option>
            <option value="Buchhalter">Buchhalter (Erfassung)</option>
            <option value="Freigeber">Freigeber (Zahlung)</option>
            <option value="Auditor">Auditor (Revision)</option>
          </select>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors relative"
            title="Benachrichtigungen"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 border-2 border-white"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-slate-900">Benachrichtigungen</span>
                <span className="text-[10px] font-bold text-[#3d9970] bg-[#eef8f3] px-2 py-0.5 rounded-full">
                  2 neu
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Abweichung festgestellt</span>
                    <span className="text-[10px] text-slate-400">vor 12 Min</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Rechnung RE-2026-8892 weist +CHF 450.00 Preisabweichung auf.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>ERP-Sync abgeschlossen</span>
                    <span className="text-[10px] text-slate-400">vor 1 Std</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    14 Belege erfolgreich nach Abacus exportiert.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Actions Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
          >
            {userAvatarUrl ? (
              <img
                src={userAvatarUrl}
                alt={userName}
                className="w-7 h-7 rounded-lg object-cover border border-[#3d9970]"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-[#08271e] text-white flex items-center justify-center font-bold text-xs">
                {userName.charAt(0)}
              </div>
            )}
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="font-extrabold text-xs text-slate-900">{userName}</span>
              <span className="text-[10px] text-[#3d9970] font-bold">{activeRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-3 space-y-2">
              <div className="border-b border-slate-100 pb-2">
                <strong className="block text-xs font-bold text-slate-900">{userName}</strong>
                <span className="text-[11px] text-slate-500 font-mono block truncate">{userEmail}</span>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#eef8f3] text-[#2f815f] text-[10px] font-extrabold">
                  {roleBadges[activeRole]}
                </span>
              </div>

              <Link
                to="/"
                onClick={() => setProfileDropdownOpen(false)}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>Zurück zur Website</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onSignOut();
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Abmelden</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
