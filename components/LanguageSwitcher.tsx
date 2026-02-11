import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  // Fix: Initialize useRef with null instead of the variable itself to avoid self-reference error
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'sv', label: 'Svenska', flag: '🇸🇪' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = async (code: string) => {
    if (code === i18n.language) {
      setIsOpen(false);
      return;
    }
    
    setIsPending(true);
    setIsOpen(false);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    await i18n.changeLanguage(code);
    setIsPending(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`p-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 border border-transparent ${isPending ? 'opacity-50' : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'}`}
        aria-label={t('labels.language')}
      >
        {isPending ? <Loader2 size={18} className="animate-spin text-brand-primary" /> : <Languages size={20} />}
        <span className="text-[10px] font-black uppercase hidden sm:inline tracking-tighter">{currentLang.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xl overflow-hidden z-[200]"
          >
            <div className="p-2 space-y-1">
              <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-800">
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">{t('labels.language')}</span>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    i18n.language === lang.code
                      ? 'bg-brand-primary text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">{lang.flag}</span>
                    <span className="uppercase tracking-tight">{lang.label}</span>
                  </div>
                  {i18n.language === lang.code && <Check size={14} className="animate-in fade-in zoom-in" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;