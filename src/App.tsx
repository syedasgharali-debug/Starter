import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import { Language, OperationalRole } from './types';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './components/LandingPage';
import { OverviewView } from './components/Dashboard/OverviewView';
import { InvoicesView } from './components/Dashboard/InvoicesView';
import { ScannerView } from './components/Dashboard/ScannerView';
import { DisputesView } from './components/Dashboard/DisputesView';
import { SuppliersView } from './components/Dashboard/SuppliersView';
import { AdminView } from './components/Dashboard/AdminView';
import { BillingPage } from './pages/dashboard/BillingPage';
import { UsersRbacPage } from './pages/dashboard/UsersRbacPage';
import { SsoApiPage } from './pages/dashboard/SsoApiPage';
import { AuditLogsPage } from './pages/dashboard/AuditLogsPage';
import { BillingProvider } from './context/BillingContext';
import { AppProvider, useApp } from './context/AppContext';

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

function OverviewViewWrapper() {
  const navigate = useNavigate();

  return (
    <OverviewView
      onNavigateToView={(view) => navigate(`/dashboard/${view}`)}
    />
  );
}

function AppRoutes({ currentLang, setCurrentLang }: { currentLang: Language; setCurrentLang: (lang: Language) => void }) {
  const { userSession, effectiveRole, login, logout, setSimulatedRole } = useApp();

  const handleLoginSuccess = (name: string, email: string, role: OperationalRole) => {
    login(name, email, role);
  };

  const handleRoleChange = (newRole: OperationalRole) => {
    if (userSession.role === 'Administrator') {
      if (newRole === 'Controller') {
        setSimulatedRole('Controller');
      } else {
        setSimulatedRole(null);
      }
    } else {
      if (newRole === 'Administrator') {
        login('Administrator', 'admin@klarsolution.com', 'Administrator');
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing & Landing Route */}
        <Route
          path="/"
          element={
            <PublicLayout
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              isAuthenticated={userSession.isAuthenticated}
              userName={userSession.name}
              userEmail={userSession.email}
              userRole={effectiveRole}
              userAvatarUrl={userSession.avatarUrl}
              onSignOut={logout}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        >
          <Route index element={<LandingPageWrapper currentLang={currentLang} />} />
        </Route>

        {/* /login Route opening SSO modal */}
        <Route
          path="/login"
          element={
            <PublicLayout
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              isAuthenticated={userSession.isAuthenticated}
              userName={userSession.name}
              userEmail={userSession.email}
              userRole={effectiveRole}
              userAvatarUrl={userSession.avatarUrl}
              initialAuthModalOpen={true}
              onSignOut={logout}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        >
          <Route index element={<LandingPageWrapper currentLang={currentLang} />} />
        </Route>

        {/* Isolated SaaS Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout
              currentLang={currentLang}
              activeRole={effectiveRole}
              onRoleChange={handleRoleChange}
              userName={userSession.name}
              userEmail={userSession.email}
              userAvatarUrl={userSession.avatarUrl}
              onSignOut={logout}
            />
          }
        >
          <Route index element={<OverviewViewWrapper />} />
          <Route path="invoices" element={<InvoicesView currentLang={currentLang} />} />
          <Route path="scanner" element={<ScannerView currentLang={currentLang} />} />
          <Route path="disputes" element={<DisputesView currentLang={currentLang} />} />
          <Route path="suppliers" element={<SuppliersView currentLang={currentLang} />} />
          <Route path="settings" element={<BillingPage currentLang={currentLang} />} />
          <Route path="billing" element={<BillingPage currentLang={currentLang} />} />
          
          {/* Admin Routes protected by RBACGuard */}
          <Route path="users" element={<UsersRbacPage currentLang={currentLang} />} />
          <Route path="sso-api" element={<SsoApiPage currentLang={currentLang} />} />
          <Route path="audit" element={<AuditLogsPage currentLang={currentLang} />} />
          <Route path="admin" element={<AdminView currentLang={currentLang} />} />
        </Route>

        {/* Catch-All Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('de');

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  return (
    <AppProvider>
      <BillingProvider>
        <AppRoutes currentLang={currentLang} setCurrentLang={setCurrentLang} />
      </BillingProvider>
    </AppProvider>
  );
}
