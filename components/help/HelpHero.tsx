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
    <section className="relative h-[75vh] lg:h-auto lg:min-h-[40vh] pt-24 lg:pt-32 pb-10 lg:pb-20 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#6d28d944,transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center space-y-6 lg:space-y-10 relative z-10 w-full">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-h1 font-black uppercase tracking-tighter italic text-slate-950 dark:text-white leading-[0.85]">
          {t('help.title')} <br />
          <span className="text-brand-primary">{t('help.highlight')}</span>
        </motion.h1>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto">
          <SearchInput 
            value={searchQuery}
            onChange={onSearchChange}
            onClear={() => onSearchChange('')}
            placeholder={t('help.search_placeholder')}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HelpHero;