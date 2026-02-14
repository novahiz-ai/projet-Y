import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GenderOption {
  value: string;
  label: string;
}

interface GenderSelectorProps {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange, required }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const options: GenderOption[] = [
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' },
    { value: 'non-binary', label: 'Non-binaire' },
    { value: 'agender', label: 'Agender' },
    { value: 'genderfluid', label: 'Genderfluid' },
    { value: 'queer', label: 'Queer' },
    { value: 'other', label: 'Autre' },
    { value: 'prefer-not-to-say', label: 'Préfère ne pas dire' }
  ];

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest flex items-center space-x-2">
          <User size={12} />
          <span>Genre</span>
        </label>
        {required && <span className="text-[8px] font-black uppercase tracking-tighter text-brand-primary opacity-70 italic">{t('labels.mandatory')}</span>}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 transition-all py-4 px-6 rounded-2xl text-left outline-none shadow-inner-soft hover:border-brand-primary/40"
      >
        <span className={`text-base font-bold uppercase tracking-tight ${value ? 'text-slate-950 dark:text-white' : 'text-slate-400'}`}>
          {selectedOption ? selectedOption.label : 'Sélectionnez votre genre'}
        </span>
        <ChevronRight size={18} className="text-slate-400" />
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
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Identité</h3>
                  <p className="text-2xl font-black italic text-slate-950 dark:text-white uppercase tracking-tighter">Votre Genre.</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-rose-500 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 gap-3 scrollbar-hide">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border-2 ${
                      value === opt.value 
                        ? 'bg-brand-primary/10 border-brand-primary' 
                        : 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent hover:border-slate-100'
                    }`}
                  >
                    <span className={`text-sm font-black uppercase tracking-tight ${value === opt.value ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                      {opt.label}
                    </span>
                    {value === opt.value && (
                      <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg">
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

export default GenderSelector;