import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  Sparkles,
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
  '/dashboard/scanner': 'KI-Belegscanner 3.0',
  '/dashboard/disputes': 'Reklamations-Hub',
  '/dashboard/suppliers': 'Lieferanten-Risiko',
  '/dashboard/billing': 'Billing & Pakete',
  '/dashboard/settings': 'Billing & Pakete',
  '/dashboard/users': 'Benutzer & RBAC-Rollen',
  '/dashboard/sso-api': 'SSO, APIs & CLI-Setup',
  '/dashboard/audit': 'ERP, Mandanten & Audit-Log',
  '/dashboard/admin': 'Admin & Integrationen',
};

const roleBadges: Record<OperationalRole, string> = {
  Administrator: 'Vollzugriff & Freigabe',
  Controller: 'Finanzkontrolle & Export',
  Buchhalter: 'Belegerfassung & Buchung',
  Freigeber: 'Zahlungsfreigabe (bis CHF 100k)',
  Auditor: 'Revision & Audit-Trail',
};

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  userName,
  userEmail,
  userAvatarUrl,
  onSignOut,
}) => {
  const location = useLocation();
  const { userSession, effectiveRole, setSimulatedRole, setActiveTenant, login } = useApp();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentRouteName = routeNames[location.pathname] || 'Dashboard';

  const handleRoleSelectChange = (newRole: OperationalRole) => {
    if (userSession.role === 'Administrator') {
      if (newRole === 'Controller') {
        setSimulatedRole('Controller');
      } else {
        setSimulatedRole(null);
      }
    } else {
      if (newRole === 'Administrator') {
        login('Ali Kazmi', 'ali.kazmi@smartgrid.ch', 'Administrator');
      }
    }
  };

  return (
    <header className="h-16 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/60 border-b border-emerald-100 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
      {/* Left Breadcrumbs & Live Production Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-slate-400">Kundenbereich</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#08271e] font-extrabold text-sm">{currentRouteName}</span>
        </div>

        {/* Official Live Production Status Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[10px] font-black uppercase tracking-wider shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>LIVE PRODUCTION • ISO 27001 • DSGVO/DSG</span>
        </div>
      </div>

      {/* Right Controls Bar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Tenant Organization Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800">
          <Building className="w-3.5 h-3.5 text-[#3d9970]" />
          <select
            value={userSession.activeTenant}
            onChange={(e) => setActiveTenant(e.target.value)}
            className="bg-transparent text-slate-900 font-extrabold text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="Smart Grid AG">Smart Grid AG</option>
            <option value="The DigiXy">The DigiXy</option>
            <option value="AlpenBau Holding AG">AlpenBau Holding AG</option>
          </select>
        </div>

        {/* Role Selector / Status */}
        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800">
          <UserCheck className="w-3.5 h-3.5 text-[#3d9970]" />
          <select
            value={effectiveRole}
            onChange={(e) => handleRoleSelectChange(e.target.value as OperationalRole)}
            className="bg-transparent text-slate-900 font-extrabold text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="Administrator">Administrator (Vollzugriff)</option>
            <option value="Controller">Controller (Finanzkontrolle)</option>
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
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-slate-900">Live Audit-Meldungen</span>
                <span className="text-[10px] font-bold text-[#3d9970] bg-[#eef8f3] px-2 py-0.5 rounded-full">
                  ISO 27001 Aktiv
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>3-Way Matching Warnung</span>
                    <span className="text-[10px] text-slate-400">vor 2 Min</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    PO-2026-992: Swiss Industrial Hydraulics AG flagged (+CHF 789.60).
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>ERP Sync Status</span>
                    <span className="text-[10px] text-slate-400">vor 15 Min</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Konnektor Smart Grid AG (SAP S/4HANA) bereit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
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
              <span className="text-[10px] text-[#3d9970] font-bold">{effectiveRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-fadeIn">
              <div className="border-b border-slate-100 pb-2">
                <strong className="block text-xs font-bold text-slate-900">{userName}</strong>
                <span className="text-[11px] text-slate-500 font-mono block truncate">{userEmail}</span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#eef8f3] text-[#2f815f] text-[10px] font-extrabold">
                    {roleBadges[effectiveRole]}
                  </span>
                </div>
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
