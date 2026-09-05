import React, { useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { NotificationButton } from './NotificationButton';
import { UserMenu } from './UserMenu';
import type { AppRoute } from '../../types';
import { routeTitles } from '../../hooks/useNavigation';

interface TopbarProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
  onToggleMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentPath,
  onNavigate,
  onToggleMobileMenu,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const routeInfo = routeTitles[currentPath] || routeTitles['/dashboard'];

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-20 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
              {routeInfo.title}
            </h1>
            <span className="hidden md:inline-flex text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {routeInfo.category}
            </span>
          </div>
          <p className="hidden sm:block text-xs text-slate-400 truncate">
            {routeInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right / Center: Global Search + Actions + User Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Global Search Bar */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Theme Toggle Icon */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2.5 rounded-xl border border-slate-200/90 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer shadow-2xs"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Icon with Popup */}
        <NotificationButton />

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Administrator Profile */}
        <UserMenu onNavigate={onNavigate} />
      </div>
    </header>
  );
};
