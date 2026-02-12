
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ChevronRight, 
  Search as SearchIcon,
  LayoutGrid,
  Zap,
  SpellCheck,
  ArrowRight
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

    // Deep search across all languages
    const matchesAnyLanguage = (key: string, ns: string = 'common') => {
      return availableLangs.some(lang => {
        const translatedValue = i18n.getResource(lang, ns, key);
        if (typeof translatedValue === 'string') {
          return translatedValue.toLowerCase().includes(normalizedQuery);
        } else if (typeof translatedValue === 'object' && translatedValue !== null) {
          // If it's an object (like offers_data.conso), check its string properties
          return Object.values(translatedValue).some(val => 
            typeof val === 'string' && val.toLowerCase().includes(normalizedQuery)
          );
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
      a.excerpt.toLowerCase().includes(normalizedQuery) ||
      matchesAnyLanguage(`articles.${a.id.replace('-', '')}.title`, 'guide')
    ).slice(0, 3);

    const matchedGlossary = getGlossaryTerms(t).filter(termItem => 
      termItem.term.toLowerCase().includes(normalizedQuery) ||
      matchesAnyLanguage(`glossary.terms.${termItem.categoryId}.t`)
    ).slice(0, 4);

    const pageKeys = [
      { id: 'guide', titleKey: 'nav.guide', path: '/guide', icon: <BookOpen size={16} /> },
      { id: 'aide', titleKey: 'nav.help', path: '/aide', icon: <Zap size={16} /> },
      { id: 'glossaire', titleKey: 'nav.glossary_label', path: '/glossaire', icon: <LayoutGrid size={16} /> }
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

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="p-6 md:p-10 space-y-12">
      {!hasAnyResult ? (
        <div className="py-24 text-center space-y-8">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-300">
            <SearchIcon size={48} strokeWidth={1.5} />
          </div>
          <div className="space-y-3">
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-sm tracking-widest">{t('search.no_results')}</p>
            <p className="text-slate-400 text-xs italic uppercase tracking-tighter">{t('search.try_terms')}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{t('search.results_for')} <span className="text-slate-900 dark:text-white">"{query}"</span></p>
          </div>

          {results.offers.length > 0 && (
            <div className="space-y-6">
              <h4 className="px-2 text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">{t('search.cat_offers')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.offers.map(offer => (
                  <motion.button
                    key={offer.id} variants={itemVariants} initial="hidden" animate="visible"
                    onClick={() => handleNavigate(`/offres/${offer.id}`)}
                    className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all group w-full active:scale-[0.99] text-left"
                  >
                    <div className="flex items-center space-x-5">
                      <div className={`w-12 h-12 ${offer.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-2 transition-all`}>
                        {getIcon(offer.icon, 24)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight">{t(offer.title)}</p>
                        <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-0.5">{t('labels.rate_from')} {offer.minRate}%</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all"><ChevronRight size={16} /></div>
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
                    key={page.id} variants={itemVariants} initial="hidden" animate="visible"
                    onClick={() => handleNavigate(page.path)}
                    className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all text-[11px] font-bold uppercase tracking-widest border border-slate-100 dark:border-slate-700 shadow-sm group"
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
                    key={idx} variants={itemVariants} initial="hidden" animate="visible"
                    onClick={() => handleNavigate(`/glossaire#${getTermSlug(item.term)}`)}
                    className="flex items-start p-6 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 transition-all group w-full space-x-6 text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xl"
                  >
                    <div className="w-11 h-11 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0 flex items-center justify-center border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all"><SpellCheck size={20} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight italic">{item.term}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.articles.map(article => (
                  <motion.button
                    key={article.id} variants={itemVariants} initial="hidden" animate="visible"
                    onClick={() => handleNavigate(`/guide/${article.id}`)}
                    className="flex flex-col p-4 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group w-full space-y-4 text-left border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                  >
                    <div className="w-full h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:scale-[1.02] transition-transform">
                      <img src={article.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight line-clamp-2 group-hover:text-brand-primary transition-colors leading-tight">{article.title}</p>
                      <div className="flex items-center justify-between mt-3">
                         <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{article.categoryLabel}</span>
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
  );
};

export default SearchResults;
