import React from 'react';
import { Plus, X, ChevronLeft, ChevronRight, ShieldCheck, Headphones } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { cn } from '../../utils/cn';
import type { AppRoute } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ROLE_NAVIGATION } from '../../data/navigationConfig';
import { ROLE_DEFAULT_ROUTES } from '../../data/demoAccounts';

interface SidebarProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { user } = useAuth();
  const activeRole = user?.role || 'Administrator';
  const roleNav = ROLE_NAVIGATION[activeRole] || ROLE_NAVIGATION.Administrator;
  const homeRoute = ROLE_DEFAULT_ROUTES[activeRole] || '/admin/dashboard';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-30 bg-white border-r border-slate-200/90 flex flex-col transition-all duration-300 ease-in-out',
          // Desktop & Tablet widths
          isCollapsed ? 'lg:w-20' : 'lg:w-68',
          // Mobile responsive slide-over drawer
          isMobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full lg:translate-x-0',
          'w-72'
        )}
      >
        {/* Brand Header */}
        <div className="h-18 px-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div
            onClick={() => onNavigate(homeRoute)}
            className="flex items-center gap-3 cursor-pointer select-none overflow-hidden"
          >
            {/* Logo Mark: Medical Cross */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
                  MediCare
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                </span>
                <span className="text-[11px] font-semibold text-blue-600 tracking-normal truncate">
                  {roleNav.badgeLabel}
                </span>
              </div>
            )}
          </div>

          {/* Close button on Mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Collapse Toggle button on Desktop */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items Area */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Main Menu Section */}
          <div>
            {(!isCollapsed || isMobileOpen) && (
              <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {activeRole.toUpperCase()} MENU
              </p>
            )}

            <div className="space-y-1">
              {roleNav.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isActive={currentPath === item.path}
                  isCollapsed={isCollapsed && !isMobileOpen}
                  onSelect={(path) => {
                    onNavigate(path);
                    onCloseMobile();
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Role Bottom Feature Card */}
        {(!isCollapsed || isMobileOpen) ? (
          <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 shrink-0">
            <div className="rounded-xl p-3.5 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-100/80 shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900 truncate">
                  {roleNav.footerCard.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                {roleNav.footerCard.subtitle}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-blue-100/60">
                <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                  <Headphones className="w-3 h-3" /> {roleNav.footerCard.actionLabel}
                </span>
                <span className="text-[10px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {roleNav.footerCard.badge}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Collapsed mini indicator */
          <div className="p-3 border-t border-slate-100 flex justify-center shrink-0">
            <div
              className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors"
              title={roleNav.footerCard.title}
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
