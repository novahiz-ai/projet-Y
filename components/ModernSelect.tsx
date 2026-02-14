import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  flag?: string;
  subLabel?: string;
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
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 transition-all py-4 px-6 rounded-2xl text-left outline-none shadow-inner-soft hover:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5"
      >
        <div className="flex items-center space-x-3">
          {selectedOption?.flag && <span className="text-xl">{selectedOption.flag}</span>}
          {selectedOption?.icon && <span className="text-brand-primary">{selectedOption.icon}</span>}
          <span className={`text-sm font-bold uppercase tracking-tight ${selectedOption ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown size={18} className="text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-3xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{label || "Choisir une option"}</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${
                      value === option.value 
                        ? 'bg-brand-primary/10 border-2 border-brand-primary' 
                        : 'bg-slate-50/50 dark:bg-slate-800/50 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {option.flag && <span className="text-2xl">{option.flag}</span>}
                      {option.icon && <span className={value === option.value ? 'text-brand-primary' : 'text-slate-400'}>{option.icon}</span>}
                      <div className="text-left">
                        <p className={`text-sm font-black uppercase tracking-tight ${value === option.value ? 'text-brand-primary' : 'text-slate-900 dark:text-white'}`}>
                          {option.label}
                        </p>
                        {option.subLabel && <p className="text-[10px] text-slate-400 font-bold mt-0.5">{option.subLabel}</p>}
                      </div>
                    </div>
                    {value === option.value && (
                      <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernSelect;