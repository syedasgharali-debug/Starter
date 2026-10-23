import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import { Language, InvoiceRecord, SupplierRecord, OperationalRole } from './types';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MarqueeBar } from './components/MarqueeBar';
import { LandingPage } from './components/LandingPage';
import { OverviewView } from './components/Dashboard/OverviewView';
import { InvoicesView } from './components/Dashboard/InvoicesView';
import { ScannerView } from './components/Dashboard/ScannerView';
import { DisputesView } from './components/Dashboard/DisputesView';
import { SuppliersView } from './components/Dashboard/SuppliersView';
import { AdminView } from './components/Dashboard/AdminView';
import { BillingPage } from './pages/dashboard/BillingPage';
import { BillingProvider } from './context/BillingContext';

import { initialInvoices, initialSuppliers } from './data/sampleData';

export interface UserSession {
  isAuthenticated: boolean;
  name: string;
  email: string;
  role: OperationalRole;
  avatarUrl: string;
}

function LandingPageWrapper({ currentLang }: { currentLang: Language }) {
  const { handleOpenQuoteWithNotes } = useOutletContext<{
    handleOpenQuoteWithNotes: (notes?: string) => void;
  }>();

  return (
    <LandingPage
      currentLang={currentLang}
      onRequestQuoteWithNotes={handleOpenQuoteWithNotes}
    />
  );
}

function OverviewViewWrapper({
  currentLang,
  invoices,
  suppliers,
}: {
  currentLang: Language;
  invoices: InvoiceRecord[];
  suppliers: SupplierRecord[];
}) {
  const navigate = useNavigate();

  return (
    <OverviewView
      currentLang={currentLang}
      invoices={invoices}
      suppliers={suppliers}
      onNavigateToView={(view) => navigate(`/dashboard/${view}`)}
    />
  );
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('de');

  // User Session State
  const [userSession, setUserSession] = useState<UserSession>({
    isAuthenticated: true,
    name: 'Ali Kazmi',
    email: 'ali.kazmi@smartgrid.ch',
    role: 'Administrator',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });

  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialInvoices);
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>(initialSuppliers);

  // Sync html dir & lang for RTL/LTR support
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const handleAddAuditedInvoice = (newInv: InvoiceRecord) => {
    setInvoices((prev) => [newInv, ...prev]);
  };

  const handleLoginSuccess = (name: string, email: string, role: OperationalRole) => {
    setUserSession({
      isAuthenticated: true,
      name,
      email,
      role,
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
  };

  const handleSignOut = () => {
    setUserSession((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
  };

  const handleRoleChange = (newRole: OperationalRole) => {
    setUserSession((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  return (
    <BillingProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Routes with PublicLayout Wrapper */}
          <Route
            path="/"
            element={
              <PublicLayout
                currentLang={currentLang}
                onLanguageChange={setCurrentLang}
                isAuthenticated={userSession.isAuthenticated}
                userName={userSession.name}
                userEmail={userSession.email}
                userRole={userSession.role}
                userAvatarUrl={userSession.avatarUrl}
                onSignOut={handleSignOut}
                onLoginSuccess={handleLoginSuccess}
              />
            }
          >
            <Route
              index
              element={
                <LandingPageWrapper currentLang={currentLang} />
              }
            />
          </Route>

          {/* Isolated SaaS Dashboard Routes with DashboardLayout Wrapper */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout
                currentLang={currentLang}
                activeRole={userSession.role}
                onRoleChange={handleRoleChange}
                userName={userSession.name}
                userEmail={userSession.email}
                userAvatarUrl={userSession.avatarUrl}
                onSignOut={handleSignOut}
              />
            }
          >
            <Route
              index
              element={
                <OverviewViewWrapper
                  currentLang={currentLang}
                  invoices={invoices}
                  suppliers={suppliers}
                />
              }
            />
            <Route
              path="invoices"
              element={<InvoicesView currentLang={currentLang} invoices={invoices} />}
            />
            <Route
              path="scanner"
              element={
                <ScannerView
                  currentLang={currentLang}
                  onAddAuditedInvoice={handleAddAuditedInvoice}
                />
              }
            />
            <Route
              path="disputes"
              element={<DisputesView currentLang={currentLang} invoices={invoices} />}
            />
            <Route
              path="suppliers"
              element={<SuppliersView currentLang={currentLang} suppliers={suppliers} />}
            />
            <Route
              path="settings"
              element={<BillingPage currentLang={currentLang} />}
            />
            <Route
              path="billing"
              element={<BillingPage currentLang={currentLang} />}
            />
            <Route
              path="admin"
              element={<AdminView currentLang={currentLang} />}
            />
          </Route>

          {/* Catch-All Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </BillingProvider>
  );
}
