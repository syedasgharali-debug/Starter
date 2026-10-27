import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RBACGuard } from '../../components/dashboard/RBACGuard';
import { Language, UserAccount, UserRole } from '../../types';
import { Users, UserPlus, Shield, Search, CheckCircle2 } from 'lucide-react';

export const UsersRbacPage: React.FC<{ currentLang?: Language }> = () => {
  const { auditLogs, addAuditLog } = useApp();

  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: 'usr-001',
      name: 'KlarSolution Admin',
      email: 'admin@klarsolution.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2026-10-24 14:45',
      department: 'Executive Governance',
    },
    {
      id: 'usr-002',
      name: 'Dr. Beat Oberholzer',
      email: 'beat.oberholzer@klarsolution.com',
      role: 'Lead Auditor',
      status: 'Active',
      lastLogin: '2026-10-24 11:20',
      department: 'Finance & Compliance',
    },
    {
      id: 'usr-003',
      name: 'Marcelle Dupont',
      email: 'm.dupont@klarsolution.com',
      role: 'Finance Manager',
      status: 'Active',
      lastLogin: '2026-10-23 16:05',
      department: 'Accounts Payable',
    },
  ]);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Lead Auditor');
  const [dept, setDept] = useState('Finanzkontrolle');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      status: 'Active',
      lastLogin: 'Gerade eben',
      department: dept,
    };
    setUsers([newUser, ...users]);
    setModalOpen(false);
    setName('');
    setEmail('');
    showToast(`Benutzer ${name} als ${role} eingeladen!`);
    addAuditLog('Benutzer eingeladen', 'Security', `Neues Konto: ${email} (${role})`);
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
    );
    showToast('Benutzerstatus aktualisiert');
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RBACGuard pageTitle="Benutzer & RBAC-Rollen">
      <div className="space-y-6 animate-fadeIn text-slate-900">
        {toast && (
          <div className="fixed top-20 right-6 z-50 bg-[#08271e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#3d9970] flex items-center gap-3 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-[#3d9970]" />
            <span>{toast}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#142032]">Benutzer & RBAC-Rollenverwaltung</h1>
            <p className="text-xs text-gray-500 mt-1">
              Rollenzuweisung und Zugriffsberechtigungen für Revisionsleiter & Controller
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-emerald-400" />
            <span>+ Benutzer einladen</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Benutzer suchen..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#3d9970]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-gray-200 text-gray-400 font-bold uppercase">
              <tr>
                <th className="p-4">Name & E-Mail</th>
                <th className="p-4">Rolle</th>
                <th className="p-4">Abteilung</th>
                <th className="p-4">Letzter Login</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">
                    <div>{u.name}</div>
                    <div className="text-[11px] text-gray-400 font-mono font-normal">{u.email}</div>
                  </td>
                  <td className="p-4 font-extrabold text-[#3d9970]">{u.role}</td>
                  <td className="p-4 text-gray-600">{u.department}</td>
                  <td className="p-4 font-mono text-gray-500">{u.lastLogin}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(u.id)}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                    >
                      {u.status === 'Active' ? 'Sperren' : 'Aktivieren'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 text-xs text-slate-900 space-y-4 shadow-2xl">
              <h3 className="font-extrabold text-base text-[#142032]">Neuen Benutzer einladen</h3>
              <form onSubmit={handleAddUser} className="space-y-3">
                <div>
                  <label className="block font-bold mb-1">Vollständiger Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">E-Mail Adresse</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Rolle</label>
                  <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full p-2.5 border rounded-xl">
                    <option value="Lead Auditor">Lead Auditor</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div className="pt-2 flex gap-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="flex-1 p-2.5 border rounded-xl font-bold">
                    Abbrechen
                  </button>
                  <button type="submit" className="flex-1 p-2.5 bg-[#3d9970] text-white font-extrabold rounded-xl">
                    Einladen
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RBACGuard>
  );
};
