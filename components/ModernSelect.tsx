import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * V15 — SOVEREIGN UI
 * Component: ATOMIC_SELECT
 */
export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode; // Extension pour compatibilité V15
}

interface ModernSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const ModernSelect: React.FC<ModernSelectProps> = ({ 
  options, 
  value, 
  onChange, 
  label, 
  placeholder = "Sélectionnez une option",
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`space-y-2 relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30 border transition-all py-4 px-6 rounded-2xl text-left outline-none shadow-inner-soft ${
            isOpen 
              ? 'border-brand-primary/40 ring-4 ring-brand-primary/5' 
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            {selectedOption?.icon && <span className="text-brand-primary shrink-0">{selectedOption.icon}</span>}
            <span className={`text-sm font-medium ${selectedOption ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown 
            size={18} 
            className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} 
          />
        </button>

        {/* Dropdown Pop-up */}
        <div 
          className={`absolute left-0 right-0 mt-3 z-[150] origin-top transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 scale-100 translate-y-0 visible' 
              : 'opacity-0 scale-95 -translate-y-2 invisible'
          }`}
        >
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-3xl overflow-hidden max-h-72 overflow-y-auto scrollbar-hide py-3">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-6 py-3.5 text-sm font-bold transition-colors text-left ${
                  value === option.value 
                    ? 'bg-brand-primary/10 text-brand-primary' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {option.icon && <span className="shrink-0 opacity-50">{option.icon}</span>}
                  <span className="uppercase tracking-tight">{option.label}</span>
                </div>
                {value === option.value && <Check size={16} className="shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSelect;