import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  ChevronRight, 
  Search as SearchIcon,
  LayoutGrid,
  Zap,
  SpellCheck
} from 'lucide-react';
import { LOAN_OFFERS, getIcon } from '../constants';
import { getArticles } from '../data/articles';
import { getGlossaryTerms } from '../data/glossary/terms';
import i18n from '../i18n/config';

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const results = useMemo(() => {
    if (!query || query.length < 2) return null;

    const normalizedQuery = query.toLowerCase().trim();
    const availableLangs = Object.keys(i18n.services.resourceStore.data);

    const matchesAnyLanguage = (key: string, ns: string = 'common') => {
      return availableLangs.some(lang => {
        const translatedValue = i18n.getResource(lang, ns, key);
        if (typeof translatedValue === 'string') {
          return translatedValue.toLowerCase().includes(normalizedQuery);
        }
        return false;
      });
    };

    const matchedOffers = LOAN_OFFERS.filter(o => 
      matchesAnyLanguage(o.title) || 
      matchesAnyLanguage(o.description)
    ).map(o => ({ ...o, type: 'offer' as const }));

    const matchedArticles = getArticles(t).filter(a => 
      a.title.toLowerCase().includes(normalizedQuery) || 
      a.excerpt.toLowerCase().includes(normalizedQuery)
    ).slice(0, 3);

    const matchedGlossary = getGlossaryTerms(t).filter(termItem => 
      termItem.term.toLowerCase().includes(normalizedQuery)
    ).slice(0, 4);

    const pageKeys = [
      { id: 'guide', titleKey: 'nav.guide', path: '/guide', icon: <BookOpen size={16} /> },
      { id: 'aide', titleKey: 'nav.help', path: '/aide', icon: <Zap size={16} /> },
      { id: 'glossaire', titleKey: 'footer.glossary_fin', path: '/glossaire', icon: <LayoutGrid size={16} /> }
    ];

    const matchedPages = pageKeys.filter(p => matchesAnyLanguage(p.titleKey)).map(p => ({
      ...p,
      title: t(p.titleKey)
    }));

    return {
      offers: matchedOffers,
      articles: matchedArticles,
      glossary: matchedGlossary,
      pages: matchedPages
    };
  }, [query, t]);

  if (!results) return null;

  const hasAnyResult = results.offers.length > 0 || results.articles.length > 0 || results.pages.length > 0 || results.glossary.length > 0;

  const handleNavigate = (path: string, state?: any) => {
    navigate(path, { state });
    onClose();
  };

  const getTermSlug = (term: string) => `term-${term.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '')}`;

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98, x: '-50%' },
    visible: { 
      opacity: 1, y: 0, scale: 1, x: '-50%',
      transition: { type: 'spring', damping: 25, stiffness: 300, staggerChildren: 0.05 } 
    },
    exit: { opacity: 0, y: 10, scale: 0.99, x: '-50%' }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants} initial="hidden" animate="visible" exit="exit"
      className="fixed top-[85px] left-1/2 w-[calc(100vw-1.5rem)] md:w-[750px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden z-[200] max-h-[80vh] flex flex-col"
    >
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 scrollbar-hide">
        {!hasAnyResult ? (
          <div className="py-24 text-center space-y-8">
            <div className="w-24 h-24 bg-slate-100/50 dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-300">
              <SearchIcon size={48} strokeWidth={1.5} />
            </div>
            <div className="space-y-3">
              <p className="text-slate-500 dark:text-slate-400 font-black uppercase text-sm tracking-widest">{t('search.no_results')}</p>
              <p className="text-slate-400 text-xs italic uppercase tracking-tighter">{t('search.try_terms')}</p>
            </div>
          </div>
        ) : (
          <>
            {results.offers.length > 0 && (
              <div className="space-y-6">
                <h4 className="px-2 text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">{t('search.cat_offers')}</h4>
                <div className="grid gap-2">
                  {results.offers.map(offer => (
                    <motion.button
                      key={offer.id} variants={itemVariants} onClick={() => handleNavigate(`/offres/${offer.id}`)}
                      className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all group w-full active:scale-[0.99] text-left"
                    >
                      <div className="flex items-center space-x-5">
                        <div className={`w-12 h-12 ${offer.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-2 transition-all`}>
                          {getIcon(offer.icon, 24)}
                        </div>
                        <div>
                          <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">{t(offer.title)}</p>
                          <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-0.5">{t('labels.rate_from')} {offer.minRate}%</p>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all"><ChevronRight size={18} /></div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {results.pages.length > 0 && (
              <div className="space-y-6">
                <h4 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{t('search.cat_quick')}</h4>
                <div className="flex flex-wrap gap-3">
                  {results.pages.map(page => (
                    <motion.button
                      key={page.id} variants={itemVariants} onClick={() => handleNavigate(page.path)}
                      className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all text-[11px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700 shadow-sm group"
                    >
                      <span className="text-brand-primary group-hover:text-current transition-colors">{page.icon}</span>
                      <span>{page.title}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {results.glossary.length > 0 && (
              <div className="space-y-6">
                <h4 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{t('search.cat_glossary')}</h4>
                <div className="grid gap-2">
                  {results.glossary.map((item, idx) => (
                    <motion.button
                      key={idx} variants={itemVariants} onClick={() => handleNavigate(`/glossaire#${getTermSlug(item.term)}`)}
                      className="flex items-start p-6 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 transition-all group w-full space-x-6 text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl"
                    >
                      <div className="w-11 h-11 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0 flex items-center justify-center border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all"><SpellCheck size={20} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight italic">{item.term}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-1.5 leading-relaxed">{item.definition}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {results.articles.length > 0 && (
              <div className="space-y-6">
                <h4 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{t('search.cat_guides')}</h4>
                <div className="grid gap-3">
                  {results.articles.map(article => (
                    <motion.button
                      key={article.id} variants={itemVariants} onClick={() => handleNavigate(`/guide/${article.id}`)}
                      className="flex items-center p-4 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group w-full space-x-6 text-left border border-transparent hover:border-slate-100"
                    >
                      <div className="w-28 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-lg group-hover:scale-105 transition-transform"><img src={article.image} className="w-full h-full object-cover" alt="" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight truncate group-hover:text-brand-primary transition-colors">{article.title}</p>
                        <div className="flex items-center space-x-4 mt-2.5">
                           <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{article.categoryLabel}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                           <span className="text-[9px] text-brand-primary font-black uppercase tracking-widest">{article.readTime}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="p-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 text-center flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{t('search.results_for')} <span className="text-slate-900 dark:text-white">"{query}"</span></p>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
           <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
             <span className="text-[8px] font-black text-slate-400">↑↓</span>
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Nav</span>
           </div>
           <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
             <span className="text-[8px] font-black">Esc</span>
             <span className="text-[8px] font-black uppercase tracking-tighter">Close</span>
           </div>
           <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-brand-primary text-white rounded-lg shadow-brand">
             <span className="text-[8px] font-black">Enter</span>
             <span className="text-[8px] font-black uppercase tracking-tighter">Open</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResults;