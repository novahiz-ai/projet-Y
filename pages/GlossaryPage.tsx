import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, AlertCircle, ChevronRight } from 'lucide-react';
import StandardButton from '../components/StandardButton';
import { getGlossaryTerms } from '../data/glossary/terms';
import { GLOSSARY_CATEGORIES } from '../data/glossary/categories';
import GlossaryHero from '../components/glossary/GlossaryHero';
import GlossaryAlphabet from '../components/glossary/GlossaryAlphabet';
import FadeIn from '../components/ui/FadeIn';

const GlossaryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const GLOSSARY_TERMS = useMemo(() => getGlossaryTerms(t), [t, i18n.language]);
  const alphabet = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), []);

  const getTermSlug = useCallback((term: string) => 
    `term-${term.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '')}`, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory ? item.categoryId === activeCategory : true;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, activeCategory, GLOSSARY_TERMS]);

  const availableLetters = useMemo(() => 
    Array.from(new Set(filteredTerms.map(t => t.letter))), [filteredTerms]);

  const handleLetterClick = (letter: string) => {
    const firstTerm = filteredTerms.find(t => t.letter === letter);
    if (firstTerm) {
      const element = document.getElementById(getTermSlug(firstTerm.term));
      if (element) {
        window.scrollTo({ top: element.offsetTop - 140, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <GlossaryHero 
        label={t('glossary.label')}
        title={t('glossary.title')}
        highlight={t('glossary.highlight')}
        description={t('glossary.desc')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder={t('glossary.search_placeholder')}
        resultsCount={filteredTerms.length}
      />

      <section className="sticky top-[70px] lg:top-[100px] z-[60] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide shrink-0 pb-2 md:pb-0">
            <LayoutGrid size={14} className="text-slate-400 mr-2 shrink-0" />
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${!activeCategory ? 'bg-slate-950 border-slate-950 text-white dark:bg-white dark:border-white dark:text-slate-950' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'}`}
            >
              {t('glossary.all_themes')}
            </button>
            {GLOSSARY_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeCategory === cat.id ? 'bg-brand-primary border-brand-primary text-white shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'}`}
              >
                {t(`glossary.categories.${cat.id}`, { defaultValue: cat.label })}
              </button>
            ))}
          </div>

          <GlossaryAlphabet 
            alphabet={alphabet} 
            availableLetters={availableLetters} 
            onLetterClick={handleLetterClick} 
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <AnimatePresence mode="popLayout">
          {filteredTerms.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTerms.map((item, idx) => (
                <FadeIn 
                  key={idx} 
                  layout
                  id={getTermSlug(item.term)}
                  className="group relative p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] shadow-sm hover:shadow-3xl hover:border-brand-primary/20 transition-all duration-500 flex flex-col space-y-8 scroll-mt-40 overflow-hidden"
                >
                  <span className="absolute -right-2 -top-6 text-9xl font-black text-slate-50 dark:text-white/5 italic select-none pointer-events-none group-hover:text-brand-primary/5 transition-colors">
                    {item.letter}
                  </span>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center font-black transition-all shadow-inner-soft">
                      {item.letter}
                    </div>
                    <span className="px-4 py-1.5 bg-brand-primary/5 text-brand-primary rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-brand-primary/10">
                      {item.category}
                    </span>
                  </div>
                  <div className="space-y-4 relative z-10 flex-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white group-hover:text-brand-primary transition-colors leading-tight italic">
                      {item.term}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {item.definition}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/40 rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
              <AlertCircle size={64} className="mx-auto text-slate-200 mb-8" />
              <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs mb-10">{t('glossary.no_results')}</p>
              <StandardButton variant="outline" onClick={() => {setSearchQuery(''); setActiveCategory(null);}}>
                {t('glossary.reset')}
              </StandardButton>
            </div>
          )}
        </AnimatePresence>

        <section className="mt-32 p-12 lg:p-20 bg-slate-950 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="space-y-6 relative z-10 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none italic">{t('glossary.promo_title')}</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">{t('glossary.promo_desc')}</p>
           </div>
           <div className="relative z-10">
              <StandardButton onClick={() => navigate('/simulateur')} className="!py-6 !px-12 shadow-brand group">
                <span>Simulation</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </StandardButton>
           </div>
        </section>
      </div>
    </div>
  );
};

export default GlossaryPage;