
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SpellCheck, 
  Lightbulb, 
  LayoutGrid,
  ChevronRight,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import { getGlossaryTerms } from '../data/glossary/terms';
import { GLOSSARY_CATEGORIES } from '../data/glossary/categories';

const GlossaryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const GLOSSARY_TERMS = useMemo(() => getGlossaryTerms(t), [t, i18n.language]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const getTermSlug = (term: string) => `term-${term.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '')}`;

  useEffect(() => {
    if (location.hash) {
      const termId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(termId);
        if (element) {
          const offset = 140;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          element.classList.add('ring-4', 'ring-brand-primary/30');
          setTimeout(() => element.classList.remove('ring-4', 'ring-brand-primary/30'), 3000);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory ? item.categoryId === activeCategory : true;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, activeCategory, GLOSSARY_TERMS]);

  const availableLetters = useMemo(() => {
    return Array.from(new Set(filteredTerms.map(t => t.letter)));
  }, [filteredTerms]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-slate-50 dark:border-slate-900">
        <div className="absolute inset-0 z-0 opacity-10">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-5 py-2.5 rounded-2xl border border-brand-primary/20 backdrop-blur-md">
            <SpellCheck size={20} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('glossary.label')}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.85] italic">
            {t('glossary.title')} <br />
            <span className="text-brand-primary">{t('glossary.highlight')}</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {t('glossary.desc')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-full shadow-2xl overflow-hidden px-8 py-1">
              <Search size={24} className="text-slate-300" />
              <input 
                type="text" 
                placeholder={t('glossary.search_placeholder')}
                className="w-full bg-transparent border-none py-5 pl-5 pr-4 text-base md:text-xl font-medium outline-none text-slate-950 dark:text-white placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden sm:flex text-[9px] font-black text-slate-300 uppercase bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                {filteredTerms.length} Results
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTER & ALPHA BAR */}
      <section className="sticky top-[70px] z-[60] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all">
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

          <div className="w-full flex items-center justify-center space-x-1 overflow-x-auto scrollbar-hide md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
             {alphabet.map(letter => {
               const isAvailable = availableLetters.includes(letter);
               return (
                 <button 
                   key={letter}
                   disabled={!isAvailable}
                   onClick={() => {
                     const firstTerm = filteredTerms.find(t => t.letter === letter);
                     if (firstTerm) navigate(`#${getTermSlug(firstTerm.term)}`);
                   }}
                   className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${isAvailable ? 'text-slate-900 dark:text-white hover:bg-brand-primary hover:text-white cursor-pointer' : 'text-slate-200 dark:text-slate-800 cursor-default'}`}
                 >
                   {letter}
                 </button>
               );
             })}
          </div>
        </div>
      </section>

      {/* TERMS LIST */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <AnimatePresence mode="popLayout">
          {filteredTerms.length > 0 ? (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTerms.map((item, idx) => (
                <motion.div 
                  layout
                  key={idx} 
                  id={getTermSlug(item.term)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] shadow-sm hover:shadow-3xl hover:border-brand-primary/20 transition-all duration-500 flex flex-col space-y-8 scroll-mt-40 overflow-hidden"
                >
                  {/* Decorative Letter */}
                  <span className="absolute -right-2 -top-6 text-9xl font-black text-slate-50 dark:text-white/5 italic select-none pointer-events-none group-hover:text-brand-primary/5 transition-colors">
                    {item.letter}
                  </span>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center font-black transition-all shadow-inner-soft group-hover:shadow-lg">
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
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {item.definition}
                    </p>
                  </div>

                  {item.proTip && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-3xl flex items-start space-x-4 relative z-10"
                    >
                      <Lightbulb size={20} className="text-brand-primary shrink-0 mt-0.5" />
                      <div className="space-y-1">
                         <span className="text-[8px] font-black uppercase tracking-widest text-brand-primary">Expert Tip</span>
                         <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 italic leading-relaxed">
                            {item.proTip}
                         </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-6 mt-auto border-t border-slate-50 dark:border-white/5 flex items-center justify-between relative z-10">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Younited Glossary v2.5</span>
                     <button className="text-slate-300 group-hover:text-brand-primary transition-colors">
                        <ChevronRight size={18} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-slate-50 dark:bg-slate-900/40 rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800"
            >
              <AlertCircle size={64} className="mx-auto text-slate-200 mb-8" />
              <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs mb-10">{t('glossary.no_results', { defaultValue: "Aucun terme trouvé" })}</p>
              <StandardButton variant="outline" onClick={() => {setSearchQuery(''); setActiveCategory(null);}}>
                {t('glossary.reset')}
              </StandardButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROMO BANNER */}
        <section className="mt-32 p-12 bg-slate-950 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="space-y-6 relative z-10 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none italic">{t('glossary.promo_title', { defaultValue: "PRÊT À CONCRÉTISER VOTRE PROJET ?" })}</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                {t('glossary.promo_desc', { defaultValue: "Maintenant que vous maîtrisez le lexique, passez à l'action. Réalisez votre simulation en 2 minutes." })}
              </p>
           </div>
           <div className="relative z-10 flex flex-col sm:flex-row gap-5">
              <StandardButton onClick={() => navigate('/simulateur')} className="!py-6 !px-12 shadow-brand shadow-brand-primary/40 group">
                <span>{t('nav.simulator')}</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </StandardButton>
           </div>
        </section>
      </div>
    </div>
  );
};

export default GlossaryPage;
