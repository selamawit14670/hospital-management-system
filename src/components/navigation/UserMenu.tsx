import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, Activity, LogOut, Shield } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { AppRoute } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { DEMO_ACCOUNTS } from '../../data/demoAccounts';

interface UserMenuProps {
  onNavigate?: (path: AppRoute) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Fallback to demo admin if not logged in
  const activeUser = user || DEMO_ACCOUNTS.Administrator.user;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    onNavigate?.('/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Doctor':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Nurse':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Receptionist':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Patient':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-3 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 transition-all duration-150 cursor-pointer shadow-2xs text-left',
          isOpen && 'border-blue-400 bg-blue-50/40 ring-2 ring-blue-500/15'
        )}
        aria-expanded={isOpen}
      >
        {/* Avatar with Online Status Badge */}
        <div className="relative">
          <img
            src={activeUser.avatarUrl}
            alt={activeUser.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-lg object-cover border border-slate-200"
          />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"
            title="Online"
          />
        </div>

        {/* User Info (Hidden on very small screens) */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
            {activeUser.name}
          </span>
          <span className="text-[11px] font-medium text-slate-400 tracking-normal">
            {activeUser.role}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 transition-transform duration-200 ml-1',
            isOpen && 'rotate-180 text-blue-600'
          )}
        />
      </button>

      {/* User Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <img
                src={activeUser.avatarUrl}
                alt={activeUser.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-2xs"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{activeUser.name}</p>
                <p className="text-xs text-slate-500 truncate">{activeUser.email}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span
                    className={cn(
                      'text-[10px] font-semibold px-2 py-0.5 rounded border',
                      getRoleBadgeColor(activeUser.role)
                    )}
                  >
                    {activeUser.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Department / Subtitle info */}
          <div className="px-4 py-2 bg-blue-50/30 border-b border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="truncate">{activeUser.hospital}</span>
            <span className="text-emerald-600 font-semibold shrink-0">Active</span>
          </div>

          {/* Menu Options */}
          <div className="p-2 space-y-0.5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Personal Profile</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Workspace Preferences</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-slate-400" />
              <span>Session & Audit Logs</span>
            </button>
          </div>

          {/* Logout button */}
          <div className="p-2 border-t border-slate-100 bg-slate-50/40">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out ({activeUser.role})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
