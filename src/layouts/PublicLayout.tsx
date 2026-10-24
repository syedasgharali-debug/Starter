import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Language, OperationalRole } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { KlaraChatbot } from '../components/KlaraChatbot';
import { ContactModal } from '../components/ContactModal';
import { AuthModal } from '../components/AuthModal';

interface PublicLayoutProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  userRole: OperationalRole;
  userAvatarUrl?: string;
  initialAuthModalOpen?: boolean;
  onSignOut: () => void;
  onLoginSuccess: (name: string, email: string, role: OperationalRole) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  currentLang,
  onLanguageChange,
  isAuthenticated,
  userName,
  userEmail,
  userRole,
  userAvatarUrl,
  initialAuthModalOpen = false,
  onSignOut,
  onLoginSuccess,
}) => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteNotes, setQuoteNotes] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(initialAuthModalOpen);

  const handleOpenQuoteWithNotes = (notes: string = '') => {
    setQuoteNotes(notes);
    setQuoteModalOpen(true);
  };

  const handleViewChange = (view: 'landing' | 'kundenbereich' | 'admin-portal') => {
    if (view === 'landing') {
      navigate('/');
    } else if (view === 'kundenbereich') {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        setAuthModalOpen(true);
      }
    } else if (view === 'admin-portal') {
      if (isAuthenticated) {
        navigate('/dashboard/admin');
      } else {
        setAuthModalOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#142032] font-sans selection:bg-[#3d9970] selection:text-white relative">
      {/* Public Marketing Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        currentView="landing"
        onViewChange={handleViewChange}
        onRequestQuote={() => handleOpenQuoteWithNotes()}
        isAuthenticated={isAuthenticated}
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
        userAvatarUrl={userAvatarUrl}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onSignOut={onSignOut}
      />

      {/* Main Public Route Outlet */}
      <main>
        <Outlet context={{ handleOpenQuoteWithNotes }} />
      </main>

      {/* Public Marketing 4-Column Footer */}
      <Footer
        currentLang={currentLang}
        onRequestQuote={() => handleOpenQuoteWithNotes()}
      />

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
        onLoginSuccess={(name, email, role) => {
          onLoginSuccess(name, email, role);
          setAuthModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
};
