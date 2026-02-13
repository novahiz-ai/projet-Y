import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SearchInput from '../ui/SearchInput';

interface HelpHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

const HelpHero: React.FC<HelpHeroProps> = ({ searchQuery, onSearchChange }) => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[70vh] lg:h-auto lg:min-h-[50vh] pt-32 lg:pt-40 pb-16 lg:pb-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 overflow-hidden flex items-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2000" 
          alt="Help Center" 
          className="w-full h-full object-cover opacity-10 dark:opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8 lg:space-y-12 relative z-10 w-full">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full border border-brand-primary/20 backdrop-blur-md mb-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('help.center_label')}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-4xl md:text-h1 font-black uppercase tracking-tighter italic text-slate-950 dark:text-white leading-[0.85]"
          >
            {t('help.title')} <br />
            <span className="text-brand-primary">{t('help.highlight')}</span>
          </motion.h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2 }} 
          className="max-w-2xl mx-auto"
        >
          <SearchInput 
            value={searchQuery}
            onChange={onSearchChange}
            onClear={() => onSearchChange('')}
            placeholder={t('help.search_placeholder')}
          />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
             {['Délai virement', 'Justificatifs', 'Remboursement', 'Sécurité'].map((tag) => (
               <button 
                 key={tag}
                 onClick={() => onSearchChange(tag)}
                 className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors border-b border-slate-200 dark:border-slate-800 pb-0.5"
               >
                 #{tag}
               </button>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpHero;