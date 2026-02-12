
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  resultsCount?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, onChange, placeholder, onClear, className = "", resultsCount 
}) => {
  return (
    <div className={`relative group w-full ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-indigo-500/20 rounded-[1.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
      <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm focus-within:shadow-xl focus-within:border-brand-primary/30 transition-all">
        <div className="pl-6 text-slate-400 group-focus-within:text-brand-primary transition-colors">
          <Search size={22} />
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Rechercher..."}
          className="w-full bg-transparent border-none py-4 lg:py-5 px-4 text-base lg:text-lg font-bold outline-none text-slate-950 dark:text-white placeholder:text-slate-400/60"
        />
        {value && onClear && (
          <button 
            onClick={onClear}
            className="p-2 mr-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        )}
        {resultsCount !== undefined && (
          <div className="hidden sm:flex items-center px-4 border-l border-slate-100 dark:border-slate-800">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
              {resultsCount} Résultat{resultsCount > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
