import React from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { Topbar } from '../components/navigation/Topbar';
import type { AppRoute } from '../types';

interface MainLayoutProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  currentPath,
  onNavigate,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#f8fafd] flex">
      {/* 1. Left Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={onToggleSidebarCollapse}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={onCloseMobileMenu}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Topbar
          currentPath={currentPath}
          onNavigate={onNavigate}
          onToggleMobileMenu={onToggleMobileMenu}
        />

        {/* 3. Reusable Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
    </div>
  );
};
