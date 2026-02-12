
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, SlidersHorizontal, Command } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchResults from './SearchResults';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] flex items-start justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full h-full md:h-auto md:max-h-[85vh] md:max-w-3xl md:mt-24 bg-white dark:bg-slate-900 md:rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center px-6 py-4 md:py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30">
              <div className="relative flex-1 flex items-center group">
                <SearchIcon size={22} className="text-brand-primary absolute left-4 group-focus-within:scale-110 transition-transform" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-12 pr-4 py-3.5 text-lg font-medium text-slate-900 dark:text-white outline-none transition-all shadow-inner-soft"
                />
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <div className="hidden md:flex items-center space-x-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">
                  <Command size={10} />
                  <span>K</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {query.length >= 2 ? (
                <SearchResults query={query} onClose={onClose} />
              ) : (
                <div className="p-10 text-center space-y-6">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                    <SlidersHorizontal size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">{t('search.try_terms')}</p>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {['Auto', 'Rachat', 'Taux', 'Immo'].map(term => (
                        <button 
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-primary hover:text-white hover:border-brand-primary rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 transition-all shadow-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center space-x-6">
                <span className="flex items-center gap-1.5"><span className="text-slate-900 dark:text-white">↑↓</span> {t('search.nav_tip')}</span>
                <span className="flex items-center gap-1.5"><span className="text-slate-900 dark:text-white">Enter</span> {t('search.open_tip')}</span>
                <span className="flex items-center gap-1.5"><span className="text-slate-900 dark:text-white">Esc</span> {t('search.close_tip')}</span>
              </div>
              <span className="text-brand-primary">{t('search.version')}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
