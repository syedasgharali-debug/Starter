import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  InvoiceRecord,
  SupplierRecord,
  SystemAuditLog,
  OperationalRole,
  MultiTenantClient,
  AuditorQueueItem,
} from '../types';
import {
  initialInvoices,
  initialSuppliers,
  initialMultiTenantClients,
  initialAuditorQueue,
} from '../data/sampleData';

const LOCAL_STORAGE_KEY = 'klarsolution_prod_state';

export interface UserSession {
  isAuthenticated: boolean;
  name: string;
  email: string;
  role: OperationalRole;
  avatarUrl: string;
  activeTenant: string;
}

const defaultUserSession: UserSession = {
  isAuthenticated: true,
  name: 'Ali Kazmi',
  email: 'ali.kazmi@smartgrid.ch',
  role: 'Administrator',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  activeTenant: 'Smart Grid AG',
};

const initialLogs: SystemAuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-10-24 14:45:12',
    user: 'Ali Kazmi (ali.kazmi@smartgrid.ch)',
    action: 'Session Authenticated - Google Workspace SSO',
    category: 'Security',
    status: 'Success',
    details: 'Role: Administrator · Mandat: Smart Grid AG · 2FA active',
  },
  {
    id: 'log-102',
    timestamp: '2026-10-24 13:10:04',
    user: 'Neural 3-Way Engine',
    action: '3-Way Matching Forensic Scan Completed',
    category: 'Invoice Audit',
    status: 'Success',
    details: 'Flagged PO-2026-992 discrepancy (Swiss Industrial Hydraulics AG: +CHF 789.60)',
  },
  {
    id: 'log-103',
    timestamp: '2026-10-24 11:05:33',
    user: 'System Inspector',
    action: 'Live Production Audit Policy Enforced',
    category: 'Security',
    status: 'Success',
    details: 'ISO 27001 · DSGVO/DSG Compliance active on Swiss Datacenter',
  },
];

export interface AppContextType {
  userSession: UserSession;
  simulatedRole: OperationalRole | null;
  effectiveRole: OperationalRole;
  themeMode: 'light' | 'dark';
  invoices: InvoiceRecord[];
  suppliers: SupplierRecord[];
  auditLogs: SystemAuditLog[];
  clients: MultiTenantClient[];
  queue: AuditorQueueItem[];
  
  // Actions
  toggleTheme: () => void;
  login: (name: string, email: string, role: OperationalRole, tenant?: string) => void;
  logout: () => void;
  setSimulatedRole: (role: OperationalRole | null) => void;
  setActiveTenant: (tenant: string) => void;
  addInvoice: (invoice: InvoiceRecord) => void;
  updateInvoiceStatus: (id: string, status: InvoiceRecord['status']) => void;
  verifyQueueItem: (id: string, newStatus: 'Approved' | 'Discarded' | 'Adjusted') => void;
  addAuditLog: (action: string, category: SystemAuditLog['category'], details: string) => void;
  resetDatabase: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage if present
  const loadStoredState = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          userSession: parsed.userSession || defaultUserSession,
          themeMode: parsed.themeMode || 'light',
          invoices: parsed.invoices || initialInvoices,
          suppliers: parsed.suppliers || initialSuppliers,
          auditLogs: parsed.auditLogs || initialLogs,
          clients: parsed.clients || initialMultiTenantClients,
          queue: parsed.queue || initialAuditorQueue,
        };
      }
    } catch (e) {
      console.error('Failed to load stored state from localStorage', e);
    }
    return {
      userSession: defaultUserSession,
      themeMode: 'light' as const,
      invoices: initialInvoices,
      suppliers: initialSuppliers,
      auditLogs: initialLogs,
      clients: initialMultiTenantClients,
      queue: initialAuditorQueue,
    };
  };

  const initialState = loadStoredState();

  const [userSession, setUserSession] = useState<UserSession>(initialState.userSession);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(initialState.themeMode);
  const [simulatedRole, setSimulatedRoleState] = useState<OperationalRole | null>(null);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialState.invoices);
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>(initialState.suppliers);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(initialState.auditLogs);
  const [clients, setClients] = useState<MultiTenantClient[]>(initialState.clients);
  const [queue, setQueue] = useState<AuditorQueueItem[]>(initialState.queue);

  // Effective role computation
  const effectiveRole: OperationalRole =
    userSession.role === 'Administrator' && simulatedRole ? simulatedRole : userSession.role;

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync theme mode to document element
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Persist state to localStorage on changes
  useEffect(() => {
    try {
      const stateToStore = {
        userSession,
        themeMode,
        invoices,
        suppliers,
        auditLogs,
        clients,
        queue,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [userSession, themeMode, invoices, suppliers, auditLogs, clients, queue]);

  const login = (name: string, email: string, role: OperationalRole, tenant?: string) => {
    const updatedUserSession: UserSession = {
      isAuthenticated: true,
      name,
      email,
      role,
      avatarUrl:
        role === 'Administrator'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      activeTenant: tenant || userSession.activeTenant || 'Smart Grid AG',
    };
    setUserSession(updatedUserSession);
    setSimulatedRoleState(null);

    addAuditLog(
      `Anmeldung verifiziert (${role})`,
      'Security',
      `SSO Session gestartet für ${name} (${email}) · Tenant: ${updatedUserSession.activeTenant}`
    );
  };

  const logout = () => {
    setUserSession((prev) => ({ ...prev, isAuthenticated: false }));
    setSimulatedRoleState(null);
    addAuditLog('Abmeldung', 'Security', `Sitzung beendet für ${userSession.email}`);
  };

  const setSimulatedRole = (role: OperationalRole | null) => {
    setSimulatedRoleState(role);
    if (role) {
      addAuditLog(
        `Admin Self-Test Mode: Rollen-Simulation (${role})`,
        'Security',
        `Administrator switched simulated view to ${role}`
      );
    } else {
      addAuditLog(
        'Admin Self-Test Mode: Simulation beendet',
        'Security',
        'Returned to full Administrator view'
      );
    }
  };

  const setActiveTenant = (tenant: string) => {
    setUserSession((prev) => ({ ...prev, activeTenant: tenant }));
    addAuditLog(
      'Mandanten-Wechsel',
      'ERP Sync',
      `Aktiver Mandant gewechselt auf: ${tenant}`
    );
  };

  const addAuditLog = (
    action: string,
    category: SystemAuditLog['category'],
    details: string
  ) => {
    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: `${userSession.name} (${userSession.email})`,
      action,
      category,
      status: 'Success',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addInvoice = (newInv: InvoiceRecord) => {
    const isDiscrepancy = newInv.totalBilledCHF > newInv.totalPOCHF || newInv.varianceCHF > 0;
    
    // Auto-generate dispute letter if missing
    let disputeLetter = newInv.disputeLetter;
    if (isDiscrepancy && !disputeLetter) {
      disputeLetter = `Kaufmännische Mängelrüge & Beanstandung nach OR Art. 82 / 107 & MWSTG Art. 26\nSmart Grid AG / KlarSolution Revisionsleitung\nIn der Au 44, 8706 Meilen, Schweiz\n\nAn: ${newInv.supplierName}\nRechnungsabteilung\n\nBetreff: Kaufmännische Mängelrüge zu Rechnung ${newInv.invoiceNumber} (Bestellung: ${newInv.poNumber})\n\nSehr geehrte Damen und Herren,\n\nbei der automatischen 3-Wege-Prüfung Ihrer Eingangsrechnung ${newInv.invoiceNumber} wurden folgende Unstimmigkeiten festgestellt:\n- In Rechnung gestellter Betrag: CHF ${newInv.totalBilledCHF.toFixed(2)}\n- Genehmigter Bestellwert (PO): CHF ${newInv.totalPOCHF.toFixed(2)}\n- Aufgedeckte Überbelastung: CHF ${newInv.varianceCHF.toFixed(2)}\n\nWir bitten Sie um Übermittlung einer korrigierten Gutschrift über CHF ${newInv.varianceCHF.toFixed(2)} innert 10 Tagen.\n\nFreundliche Grüsse,\nKlarSolution Revisionsabteilung · Smart Grid AG`;
    }

    const processedInvoice: InvoiceRecord = {
      ...newInv,
      status: isDiscrepancy ? 'discrepancy' : newInv.status || 'approved',
      disputeLetter: disputeLetter || '',
    };

    setInvoices((prev) => [processedInvoice, ...prev]);

    // Recalculate supplier risk scorecard & overbilled CHF in Lieferanten-Risiko
    setSuppliers((prevSuppliers) => {
      const existingSup = prevSuppliers.find(
        (s) =>
          s.name.toLowerCase().includes(newInv.supplierName.toLowerCase()) ||
          newInv.supplierName.toLowerCase().includes(s.name.toLowerCase())
      );

      if (existingSup) {
        return prevSuppliers.map((sup) => {
          if (sup.id === existingSup.id) {
            const totalInvoices = sup.totalInvoices + 1;
            const flaggedInvoices = isDiscrepancy ? sup.flaggedInvoices + 1 : sup.flaggedInvoices;
            const totalOverchargeCHF = sup.totalOverchargeCHF + processedInvoice.varianceCHF;
            const errorRatePct = parseFloat(((flaggedInvoices / totalInvoices) * 100).toFixed(1));
            const riskLevel = errorRatePct > 12 ? 'High' : errorRatePct > 5 ? 'Medium' : 'Low';

            return {
              ...sup,
              totalInvoices,
              flaggedInvoices,
              totalOverchargeCHF,
              errorRatePct,
              riskLevel,
              lastAuditDate: processedInvoice.invoiceDate,
            };
          }
          return sup;
        });
      } else {
        // Add new supplier record if not existing
        const newSupplierRecord: SupplierRecord = {
          id: `sup-${Date.now()}`,
          name: newInv.supplierName,
          country: 'CH',
          totalInvoices: 1,
          flaggedInvoices: isDiscrepancy ? 1 : 0,
          errorRatePct: isDiscrepancy ? 100.0 : 0.0,
          totalOverchargeCHF: processedInvoice.varianceCHF,
          riskLevel: isDiscrepancy ? 'High' : 'Low',
          lastAuditDate: processedInvoice.invoiceDate,
          complianceScore: isDiscrepancy ? 75 : 98,
        };
        return [newSupplierRecord, ...prevSuppliers];
      }
    });

    // Record event in Admin Audit Log
    addAuditLog(
      isDiscrepancy
        ? `FLAGGED: Mängelrüge erstellt (${processedInvoice.invoiceNumber})`
        : `APPROVED: 3-Wege-Match bestanden (${processedInvoice.invoiceNumber})`,
      'Invoice Audit',
      `Lieferant: ${processedInvoice.supplierName} · PO: ${processedInvoice.poNumber} · Billed: CHF ${processedInvoice.totalBilledCHF.toLocaleString()} · Overcharge: CHF ${processedInvoice.varianceCHF.toLocaleString()}`
    );
  };

  const updateInvoiceStatus = (id: string, status: InvoiceRecord['status']) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );

    const inv = invoices.find((i) => i.id === id);
    if (inv) {
      addAuditLog(
        `Rechnungsstatus geändert: ${inv.invoiceNumber}`,
        'Invoice Audit',
        `Neuer Status: ${status} · Lieferant: ${inv.supplierName}`
      );
    }
  };

  const verifyQueueItem = (id: string, newStatus: 'Approved' | 'Discarded' | 'Adjusted') => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    const item = queue.find((q) => q.id === id);
    if (item) {
      addAuditLog(
        `Auditor Queue Verifizierung: ${item.invoiceNumber}`,
        'Invoice Audit',
        `Status auf ${newStatus} gesetzt · Mandant: ${item.clientName} · Abweichung: CHF ${item.varianceCHF.toLocaleString()}`
      );
    }
  };

  const resetDatabase = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserSession(defaultUserSession);
    setSimulatedRoleState(null);
    setInvoices(initialInvoices);
    setSuppliers(initialSuppliers);
    setAuditLogs(initialLogs);
    setClients(initialMultiTenantClients);
    setQueue(initialAuditorQueue);
  };

  return (
    <AppContext.Provider
      value={{
        userSession,
        simulatedRole,
        effectiveRole,
        themeMode,
        invoices,
        suppliers,
        auditLogs,
        clients,
        queue,
        toggleTheme,
        login,
        logout,
        setSimulatedRole,
        setActiveTenant,
        addInvoice,
        updateInvoiceStatus,
        verifyQueueItem,
        addAuditLog,
        resetDatabase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
