import React, { useState, useEffect } from 'react';
import { Language, AppView, DashboardView, InvoiceRecord, SupplierRecord, OperationalRole } from './types';
import { Header } from './components/Header';
import { MarqueeBar } from './components/MarqueeBar';
import { LandingPage } from './components/LandingPage';
import { KlaraChatbot } from './components/KlaraChatbot';
import { ContactModal } from './components/ContactModal';
import { AuthModal } from './components/AuthModal';
import { SuiteSwitcher } from './components/SuiteSwitcher';

import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { OverviewView } from './components/Dashboard/OverviewView';
import { InvoicesView } from './components/Dashboard/InvoicesView';
import { ScannerView } from './components/Dashboard/ScannerView';
import { DisputesView } from './components/Dashboard/DisputesView';
import { SuppliersView } from './components/Dashboard/SuppliersView';
import { SettingsView } from './components/Dashboard/SettingsView';
import { AdminView } from './components/Dashboard/AdminView';

import { initialInvoices, initialSuppliers } from './data/sampleData';

export interface UserSession {
  isAuthenticated: boolean;
  name: string;
  email: string;
  role: OperationalRole;
  avatarUrl: string;
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('de');
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [dashboardTab, setDashboardTab] = useState<DashboardView>('overview');

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteNotes, setQuoteNotes] = useState('');

  // Authentication State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession>({
    isAuthenticated: true,
    name: 'Ali Kazmi',
    email: 'ali.kazmi@smartgrid.ch',
    role: 'Administrator',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  });

  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialInvoices);
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>(initialSuppliers);

  // Sync html dir & lang for RTL/LTR
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const handleOpenQuoteWithNotes = (notes: string = '') => {
    setQuoteNotes(notes);
    setQuoteModalOpen(true);
  };

  const handleAddAuditedInvoice = (newInv: InvoiceRecord) => {
    setInvoices((prev) => [newInv, ...prev]);
  };

  const handleLoginSuccess = (name: string, email: string, role: OperationalRole) => {
    setUserSession({
      isAuthenticated: true,
      name,
      email,
      role,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
    setCurrentView('kundenbereich');
  };

  const handleSignOut = () => {
    setUserSession((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
    setCurrentView('landing');
  };

  const handleRoleChange = (newRole: OperationalRole) => {
    setUserSession((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  return (
    <div className="min-h-screen bg-white text-[#142032] font-sans selection:bg-[#3d9970] selection:text-white relative">
      {/* Top Suite Switcher Pill Bar */}
      <SuiteSwitcher
        currentView={currentView}
        onViewChange={setCurrentView}
        currentLang={currentLang}
      />

      {/* Global Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentView={currentView}
        onViewChange={setCurrentView}
        onRequestQuote={() => handleOpenQuoteWithNotes()}
        isAuthenticated={userSession.isAuthenticated}
        userName={userSession.name}
        userEmail={userSession.email}
        userRole={userSession.role}
        userAvatarUrl={userSession.avatarUrl}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main View Router */}
      {currentView === 'landing' && (
        <main>
          <MarqueeBar currentLang={currentLang} />
          <LandingPage
            currentLang={currentLang}
            onRequestQuoteWithNotes={handleOpenQuoteWithNotes}
          />
        </main>
      )}

      {currentView === 'kundenbereich' && (
        <DashboardLayout
          currentLang={currentLang}
          activeView={dashboardTab}
          onViewChange={setDashboardTab}
          onBackToLanding={() => setCurrentView('landing')}
          activeRole={userSession.role}
          onRoleChange={handleRoleChange}
        >
          {dashboardTab === 'overview' && (
            <OverviewView
              currentLang={currentLang}
              invoices={invoices}
              suppliers={suppliers}
              onNavigateToView={(view) => setDashboardTab(view)}
            />
          )}

          {dashboardTab === 'invoices' && (
            <InvoicesView currentLang={currentLang} invoices={invoices} />
          )}

          {dashboardTab === 'scanner' && (
            <ScannerView
              currentLang={currentLang}
              onAddAuditedInvoice={handleAddAuditedInvoice}
            />
          )}

          {dashboardTab === 'disputes' && (
            <DisputesView currentLang={currentLang} invoices={invoices} />
          )}

          {dashboardTab === 'suppliers' && (
            <SuppliersView currentLang={currentLang} suppliers={suppliers} />
          )}

          {dashboardTab === 'settings' && (
            <SettingsView currentLang={currentLang} />
          )}

          {dashboardTab === 'admin' && (
            <AdminView currentLang={currentLang} />
          )}
        </DashboardLayout>
      )}

      {currentView === 'admin-portal' && (
        <DashboardLayout
          currentLang={currentLang}
          activeView="admin"
          onViewChange={setDashboardTab}
          onBackToLanding={() => setCurrentView('landing')}
          activeRole={userSession.role}
          onRoleChange={handleRoleChange}
        >
          <AdminView currentLang={currentLang} />
        </DashboardLayout>
      )}

      {/* Floating Klara AI Assistant Chatbot */}
      <KlaraChatbot
        currentLang={currentLang}
        onRequestQuote={() => handleOpenQuoteWithNotes()}
      />

      {/* Audit Quote Request Modal */}
      <ContactModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        currentLang={currentLang}
        prefilledNotes={quoteNotes}
      />

      {/* Auth / Google Sign-In Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentLang={currentLang}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
