import React, { useState } from 'react';
import { Search, X, Command } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className, placeholder, onSearch }) => {
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  const defaultPlaceholder =
    user?.role === 'Doctor'
      ? 'Search patients, ID, or medical records...'
      : 'Search here...';

  const activePlaceholder = placeholder || defaultPlaceholder;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <div className={cn('relative flex items-center w-full max-w-xs md:max-w-sm', className)}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={activePlaceholder}
        className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200/90 py-2 pl-10 pr-16 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
      />
      <div className="absolute right-2.5 flex items-center gap-1">
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            <Command className="w-3 h-3" /> K
          </kbd>
        )}
      </div>
    </div>
  );
};
