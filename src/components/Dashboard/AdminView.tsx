import React, { useState } from 'react';
import { Language, UserAccount, SystemAuditLog, UserRole, MultiTenantClient, AuditorQueueItem } from '../../types';
import { translations } from '../../translations/translations';
import { initialMultiTenantClients, initialAuditorQueue } from '../../data/sampleData';
import {
  ShieldCheck,
  UserPlus,
  Lock,
  Unlock,
  Key,
  Users,
  Sliders,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Shield,
  Trash2,
  Mail,
  User,
  Clock,
  Server,
  Zap,
  Globe,
  Database,
  Eye,
  EyeOff,
  Building2,
  FileCheck2,
  Layers,
  Check,
  X,
  Edit3,
} from 'lucide-react';

interface AdminViewProps {
  currentLang: Language;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentAdminUser, setCurrentAdminUser] = useState<{
    name: string;
    email: string;
    role: UserRole;
  }>({
    name: 'Dr. Beat Oberholzer',
    email: 'admin@klarsolution.ch',
    role: 'Super Admin',
  });

  // Multi-tenant clients
  const [clients, setClients] = useState<MultiTenantClient[]>(initialMultiTenantClients);

  // Auditor Queue
  const [queue, setQueue] = useState<AuditorQueueItem[]>(initialAuditorQueue);

  // Login Modal Form State
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('admin@klarsolution.ch');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loginRole, setLoginRole] = useState<UserRole>('Super Admin');
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // User Management State
  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: 'usr-001',
      name: 'Dr. Beat Oberholzer',
      email: 'admin@klarsolution.ch',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2026-10-19 14:45',
      department: 'Executive Governance',
    },
    {
      id: 'usr-002',
      name: 'Marcelle Dupont',
      email: 'm.dupont@smartgrid.ch',
      role: 'Lead Auditor',
      status: 'Active',
      lastLogin: '2026-10-19 11:20',
      department: 'Finance & Compliance',
    },
    {
      id: 'usr-003',
      name: 'Dr. Marco Rossi',
      email: 'm.rossi@smartgrid.ch',
      role: 'Finance Manager',
      status: 'Active',
      lastLogin: '2026-10-18 16:05',
      department: 'Accounts Payable',
    },
    {
      id: 'usr-004',
      name: 'Stefan Huber',
      email: 's.huber@smartgrid.ch',
      role: 'ERP Specialist',
      status: 'Active',
      lastLogin: '2026-10-17 09:12',
      department: 'IT & Infrastructure',
    },
  ]);

  const [userSearch, setUserSearch] = useState('');
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Lead Auditor');
  const [newUserDept, setNewUserDept] = useState('Finance & Accounting');

  // Rule Engine & Tolerance Settings State
  const [toleranceCHF, setToleranceCHF] = useState<number>(25);
  const [lookbackDays, setLookbackDays] = useState<number>(180);
  const [vatRule81, setVatRule81] = useState<boolean>(true);
  const [vatRule26, setVatRule26] = useState<boolean>(true);
  const [vatRule38, setVatRule38] = useState<boolean>(true);
  const [autoFlagDuplicates, setAutoFlagDuplicates] = useState<boolean>(true);
  const [requireDualSignoff, setRequireDualSignoff] = useState<boolean>(true);

  // System Audit Logs
  const [logs, setLogs] = useState<SystemAuditLog[]>([
    {
      id: 'log-101',
      timestamp: '2026-10-19 14:45:12',
      user: 'Dr. Beat Oberholzer',
      action: 'Admin Session Authenticated',
      category: 'Security',
      status: 'Success',
      details: '2FA token verified via Swiss ID SSO',
    },
    {
      id: 'log-102',
      timestamp: '2026-10-19 13:10:04',
      user: 'Marcelle Dupont',
      action: 'Verified Discrepancy #q-001',
      category: 'Invoice Audit',
      status: 'Success',
      details: 'Approved Bauwerk Alpine AG credit claim (+CHF 3,200.00)',
    },
    {
      id: 'log-103',
      timestamp: '2026-10-19 11:05:33',
      user: 'System Bot (Gemini)',
      action: 'Batch Audit Scan Completed',
      category: 'Invoice Audit',
      status: 'Success',
      details: 'Processed 14 supplier invoices; 3 discrepancies flagged',
    },
    {
      id: 'log-104',
      timestamp: '2026-10-18 17:30:19',
      user: 'Stefan Huber',
      action: 'SAP S/4HANA Connector Sync',
      category: 'ERP Sync',
      status: 'Success',
      details: 'Synchronized 1,240 Purchase Order line items',
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentAdminUser({
      name: loginEmail.split('@')[0].toUpperCase(),
      email: loginEmail,
      role: loginRole,
    });
    setShowLoginModal(false);
    setAuthSuccessMsg(t.adminAuthSuccess || 'Admin session successfully authenticated.');
    setTimeout(() => setAuthSuccessMsg(null), 4000);

    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: loginEmail,
      action: 'Manual Admin Login',
      category: 'Security',
      status: 'Success',
      details: `Role granted: ${loginRole}`,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleVerifyQueueItem = (id: string, newStatus: 'Approved' | 'Discarded' | 'Adjusted') => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    const verifiedItem = queue.find((q) => q.id === id);
    setAuthSuccessMsg(
      `Finding ${verifiedItem?.invoiceNumber || ''} status updated to ${newStatus}.`
    );
    setTimeout(() => setAuthSuccessMsg(null), 4000);

    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentAdminUser.name,
      action: `Queue Action: ${newStatus}`,
      category: 'Invoice Audit',
      status: 'Success',
      details: `Discrepancy ${verifiedItem?.invoiceNumber || ''} for ${verifiedItem?.clientName || ''}`,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const createdUser: UserAccount = {
      id: `usr-00${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      lastLogin: 'Just now',
      department: newUserDept,
    };

    setUsers((prev) => [createdUser, ...prev]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserModalOpen(false);

    setAuthSuccessMsg(`User ${newUserName} successfully added as ${newUserRole}.`);
    setTimeout(() => setAuthSuccessMsg(null), 4000);
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.department.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn text-[#142032]">
      {/* Toast Notification */}
      {authSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#08271e] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#3d9970]/50 flex items-center gap-3 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#3d9970]" />
          <span>{authSuccessMsg}</span>
        </div>
      )}

      {/* Admin Title & Auth Banner */}
      <div className="bg-gradient-to-r from-[#08271e] via-[#0f382a] to-[#142032] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none p-6">
          <Shield className="w-64 h-64 text-[#3d9970]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3d9970]/20 border border-[#3d9970]/40 text-[#86c8aa] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>KlarSolution Revisionsleitung Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Admin & Auditor Governance Dashboard
            </h1>
            <p className="text-gray-300 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Multi-tenant client monitoring, lead auditor verification queue, rule engine parameters, and live compliance audit log.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {isAuthenticated ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3d9970] text-white flex items-center justify-center font-black text-lg shadow-inner">
                  {currentAdminUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                    <span>{currentAdminUser.name}</span>
                    <span className="px-2 py-0.5 rounded bg-[#3d9970]/40 text-[#a8cfbd] text-[10px] font-mono">
                      {currentAdminUser.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-300">{currentAdminUser.email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="ms-2 p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-200 transition-colors"
                  title="Sign Out Admin"
                >
                  <Unlock className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#3d9970] hover:bg-[#2f815f] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 1. Multi-Tenant Overview Table */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#142032] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#3d9970]" />
              <span>Multi-Tenant Client Mandates Overview</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Live audit status, total volume audited, and recovered savings across all client mandates.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#eef8f3] text-[#3d9970] text-xs font-bold font-mono">
            {clients.length} Mandates Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider bg-gray-50/50">
                <th className="py-3 px-3">Client Enterprise</th>
                <th className="py-3 px-3">ERP System</th>
                <th className="py-3 px-3">Audited Volume (CHF)</th>
                <th className="py-3 px-3">Recovered Savings (CHF)</th>
                <th className="py-3 px-3">Active Invoices</th>
                <th className="py-3 px-3">Lead Auditor</th>
                <th className="py-3 px-3 text-right">Mandate Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {clients.map((cli) => (
                <tr key={cli.id} className="hover:bg-[#eef8f3]/40 transition-colors">
                  <td className="py-3.5 px-3 font-extrabold text-gray-900 text-sm">
                    {cli.companyName}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-[11px] font-mono font-bold border border-slate-200">
                      {cli.erpSystem}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-gray-900">
                    CHF {cli.totalAuditedCHF.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-extrabold text-[#3d9970]">
                    CHF {cli.totalSavingsCHF.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="font-bold text-gray-800">{cli.activeInvoicesCount}</span>
                    <span className="text-gray-400 text-[10px] ms-1">({cli.flaggedDiscrepanciesCount} flagged)</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-gray-800">{cli.leadAuditor}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        cli.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cli.status === 'Audit In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {cli.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Lead Auditor Verification Queue */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#142032] flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#3d9970]" />
              <span>Auditor Verification Queue (Revisionsleitung)</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Review queue where Lead Auditors verify, adjust, or discard flagged high-value findings before release to client portals.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            {queue.filter((q) => q.status === 'Pending Verification').length} Pending Actions
          </span>
        </div>

        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.status === 'Pending Verification'
                  ? 'bg-amber-50/40 border-amber-200'
                  : item.status === 'Approved'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#142032]">{item.clientName}</span>
                    <span className="text-xs font-mono text-gray-500">({item.invoiceNumber})</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-bold">
                      {item.discrepancyType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">{item.supplierName}</span>: Billed{' '}
                    <span className="font-mono font-bold">CHF {item.billedCHF.toFixed(2)}</span> · Variance{' '}
                    <span className="font-mono font-extrabold text-[#df6029]">
                      +CHF {item.varianceCHF.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 italic bg-white/80 p-2 rounded-lg border border-gray-100">
                    "{item.notes}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'Pending Verification' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleVerifyQueueItem(item.id, 'Approved')}
                        className="px-3 py-1.5 rounded-xl bg-[#3d9970] hover:bg-[#2f815f] text-white text-xs font-extrabold shadow-sm flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify & Release</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerifyQueueItem(item.id, 'Discarded')}
                        className="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Discard</span>
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700">
                      Status: {item.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. User Access Control & Rule Engine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management Panel (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-extrabold text-[#142032] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3d9970]" />
                <span>User Access & Role Authorizations</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage compliance auditor accounts, roles, and security permissions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNewUserModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#08271e] hover:bg-[#123d2e] text-white text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4 text-[#3d9970]" />
              <span>Invite Compliance Officer</span>
            </button>
          </div>

          <div className="my-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users by name, email, or department..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-extrabold uppercase text-[10px] tracking-wider bg-gray-50/50">
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Last Login</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#eef8f3]/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#08271e] text-white font-bold flex items-center justify-center text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{user.name}</div>
                          <div className="text-[11px] text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{user.department}</td>
                    <td className="py-3.5 px-3 text-gray-500 font-mono text-[11px]">
                      {user.lastLogin}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          user.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : user.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          user.status === 'Active'
                            ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rule Engine & Tolerance Settings */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-gray-100 mb-5">
              <h2 className="text-lg font-extrabold text-[#142032] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#3d9970]" />
                <span>Rule Engine & Tolerance Settings</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Configure price variance floor, duplicate lookback window, and Swiss VAT validation rules.
              </p>
            </div>

            <div className="space-y-5">
              {/* Tolerance CHF slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2">
                  <span>Price Tolerance Floor</span>
                  <span className="font-mono text-[#3d9970] font-black text-sm">
                    CHF {toleranceCHF}.00
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="5"
                  value={toleranceCHF}
                  onChange={(e) => setToleranceCHF(Number(e.target.value))}
                  className="w-full accent-[#3d9970] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>CHF 0 (Strict)</span>
                  <span>CHF 250</span>
                  <span>CHF 500</span>
                </div>
              </div>

              {/* Lookback window */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2">
                  <span>Duplicate Search Window</span>
                  <span className="font-mono text-[#3d9970] font-black text-sm">
                    {lookbackDays} Days
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="365"
                  step="15"
                  value={lookbackDays}
                  onChange={(e) => setLookbackDays(Number(e.target.value))}
                  className="w-full accent-[#3d9970] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>30 Days</span>
                  <span>180 Days</span>
                  <span>365 Days</span>
                </div>
              </div>

              {/* Swiss VAT rules */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-700 block">Swiss VAT Validation Rules:</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="p-2 rounded-xl border border-gray-200 text-[11px] font-bold flex items-center justify-between cursor-pointer">
                    <span>8.1% Normal</span>
                    <input
                      type="checkbox"
                      checked={vatRule81}
                      onChange={(e) => setVatRule81(e.target.checked)}
                      className="accent-[#3d9970]"
                    />
                  </label>
                  <label className="p-2 rounded-xl border border-gray-200 text-[11px] font-bold flex items-center justify-between cursor-pointer">
                    <span>2.6% Reduz.</span>
                    <input
                      type="checkbox"
                      checked={vatRule26}
                      onChange={(e) => setVatRule26(e.target.checked)}
                      className="accent-[#3d9970]"
                    />
                  </label>
                  <label className="p-2 rounded-xl border border-gray-200 text-[11px] font-bold flex items-center justify-between cursor-pointer">
                    <span>3.8% Beherberg.</span>
                    <input
                      type="checkbox"
                      checked={vatRule38}
                      onChange={(e) => setVatRule38(e.target.checked)}
                      className="accent-[#3d9970]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setAuthSuccessMsg('Rule engine & tolerance parameters saved successfully.');
              setTimeout(() => setAuthSuccessMsg(null), 4000);
            }}
            className="w-full mt-6 py-3 rounded-xl bg-[#08271e] hover:bg-[#123d2e] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#3d9970]" />
            <span>Save Rule Engine Parameters</span>
          </button>
        </div>
      </div>

      {/* 4. Live Chronological Audit Log & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health Diagnostics */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="pb-4 border-b border-gray-100 mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#142032] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#3d9970]" />
              <span>Audit System Health</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
              100% Operational
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-[#3d9970]" />
                <div>
                  <div className="text-xs font-bold text-gray-800">Gemini 2.5 AI OCR Engine</div>
                  <div className="text-[10px] text-gray-400">Response Latency: 184ms</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">Active</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-xs font-bold text-gray-800">Express Audit Middleware</div>
                  <div className="text-[10px] text-gray-400">Memory: 42 MB / Port 3000</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">Healthy</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="text-xs font-bold text-gray-800">SAP / Abacus / Bexio Gateways</div>
                  <div className="text-[10px] text-gray-400">Last Sync: 12 minutes ago</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">Connected</span>
            </div>
          </div>
        </div>

        {/* Live Audit Log Feed (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="pb-4 border-b border-gray-100 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#142032] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#3d9970]" />
                <span>Live Chronological Audit Log</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time audit trail recording scan events, lead auditor sign-offs, and dispute notices.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const refreshedLog: SystemAuditLog = {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  user: 'System Inspector',
                  action: 'Manual Audit Log Refresh',
                  category: 'Security',
                  status: 'Success',
                  details: 'All security and audit tokens validated cleanly.',
                };
                setLogs((prev) => [refreshedLog, ...prev]);
              }}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              title="Refresh Logs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`p-1.5 rounded-lg ${
                      log.status === 'Success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {log.status === 'Success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      <span>{log.action}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded font-mono">
                        {log.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500">{log.details}</div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-gray-400">
                  <div>{log.user}</div>
                  <div>{log.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Sign-In Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-scaleUp">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#08271e] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-[#3d9970]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#142032]">Admin Security Portal</h3>
              <p className="text-xs text-gray-500 mt-1">
                Authenticate with enterprise credentials to access auditor governance features.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Enterprise Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Security Token / Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Select Authorization Role
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                >
                  <option value="Super Admin">Super Admin (Full Governance)</option>
                  <option value="Lead Auditor">Lead Auditor (Audit Control)</option>
                  <option value="Finance Manager">Finance Manager (Dispute Authorization)</option>
                  <option value="ERP Specialist">ERP Specialist (Integrations & Connectors)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#08271e] hover:bg-[#123d2e] text-white text-xs font-extrabold shadow-lg transition-all"
                >
                  Authenticate Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {newUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-scaleUp">
            <h3 className="text-xl font-extrabold text-[#142032] mb-1">Invite Compliance Officer</h3>
            <p className="text-xs text-gray-500 mb-5">
              Grant role-based access to your enterprise audit portal.
            </p>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Thomas Keller"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="t.keller@smartgrid.ch"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                >
                  <option value="Lead Auditor">Lead Auditor</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="ERP Specialist">ERP Specialist</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newUserDept}
                  onChange={(e) => setNewUserDept(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewUserModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#3d9970] hover:bg-[#2f815f] text-white text-xs font-extrabold shadow-md"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
