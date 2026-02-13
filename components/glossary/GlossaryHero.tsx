import React from 'react';
import { motion } from 'framer-motion';
import { SpellCheck } from 'lucide-react';
import SearchInput from '../ui/SearchInput';

interface GlossaryHeroProps {
  label: string;
  title: string;
  highlight: string;
  description: string;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  placeholder: string;
  resultsCount: number;
}

const GlossaryHero: React.FC<GlossaryHeroProps> = ({ 
  label, title, highlight, description, searchQuery, onSearchChange, placeholder, resultsCount 
}) => (
  <section className="relative h-[65vh] lg:h-auto pt-32 pb-20 overflow-hidden border-b border-slate-50 dark:border-slate-900 flex items-center">
    <div className="absolute inset-0 z-0 opacity-10">
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-10 w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-5 py-2.5 rounded-2xl border border-brand-primary/20 backdrop-blur-md"
      >
        <SpellCheck size={20} className="animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.85] italic"
      >
        {title} <br />
        <span className="text-brand-primary">{highlight}</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.1 }} 
        className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
      >
        {description}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }} 
        className="max-w-2xl mx-auto"
      >
        <SearchInput 
          value={searchQuery}
          onChange={onSearchChange}
          onClear={() => onSearchChange('')}
          placeholder={placeholder}
          resultsCount={resultsCount}
        />
      </motion.div>
    </div>
  </section>
);

export default GlossaryHero;