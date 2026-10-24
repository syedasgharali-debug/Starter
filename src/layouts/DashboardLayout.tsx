import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { DashboardNavbar } from '../components/dashboard/DashboardNavbar';
import { AdminSelfTestBar } from '../components/dashboard/AdminSelfTestBar';
import { useApp } from '../context/AppContext';
import { Language, OperationalRole } from '../types';

interface DashboardLayoutProps {
  currentLang: Language;
  activeRole: OperationalRole;
  onRoleChange: (role: OperationalRole) => void;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  onSignOut: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentLang,
  activeRole,
  onRoleChange,
  userName,
  userEmail,
  userAvatarUrl,
  onSignOut,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { userSession, effectiveRole } = useApp();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-[#3d9970] selection:text-white">
      {/* Top Admin Self-Test & RBAC Simulator Bar */}
      <AdminSelfTestBar />

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Isolated Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main App Workspace Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          {/* Isolated App Top Navbar */}
          <DashboardNavbar
            activeRole={effectiveRole}
            onRoleChange={onRoleChange}
            userName={userSession.name || userName}
            userEmail={userSession.email || userEmail}
            userAvatarUrl={userSession.avatarUrl || userAvatarUrl}
            onSignOut={onSignOut}
          />

          {/* Scrollable Main View Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
            <div className="max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
