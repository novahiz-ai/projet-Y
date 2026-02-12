
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Search as SearchIcon,
  SpellCheck
} from 'lucide-react';
import { LOAN_OFFERS } from '../constants';
import { getArticles } from '../data/articles';
import { getGlossaryTerms } from '../data/glossary/terms';
import i18n from '../i18n/config';
import SearchCategorySection from './search/SearchCategorySection';
import SearchOfferResult from './search/SearchOfferResult';

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
        const val = i18n.getResource(lang, ns, key);
        if (typeof val === 'string') return val.toLowerCase().includes(normalizedQuery);
        if (typeof val === 'object' && val !== null) return Object.values(val).some(v => typeof v === 'string' && v.toLowerCase().includes(normalizedQuery));
        return false;
      });
    };

    const matchedOffers = LOAN_OFFERS.filter(o => matchesAnyLanguage(o.title) || matchesAnyLanguage(o.description));
    const matchedArticles = getArticles(t).filter(a => a.title.toLowerCase().includes(normalizedQuery) || matchesAnyLanguage(`articles.${a.id.replace('-', '')}.title`, 'guide')).slice(0, 3);
    const matchedGlossary = getGlossaryTerms(t).filter(termItem => termItem.term.toLowerCase().includes(normalizedQuery) || matchesAnyLanguage(`glossary.terms.${termItem.categoryId}.t`)).slice(0, 4);

    return { offers: matchedOffers, articles: matchedArticles, glossary: matchedGlossary };
  }, [query, t]);

  if (!results) return null;

  const hasAnyResult = results.offers.length > 0 || results.articles.length > 0 || results.glossary.length > 0;
  const itemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } };

  if (!hasAnyResult) {
    return (
      <div className="py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-300"><SearchIcon size={48} /></div>
        <div className="space-y-3">
          <p className="text-slate-500 font-bold uppercase text-sm tracking-widest">{t('search.no_results')}</p>
          <p className="text-slate-400 text-xs italic uppercase">{t('search.try_terms')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-12">
      {results.offers.length > 0 && (
        <SearchCategorySection title={t('search.cat_offers')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.offers.map(offer => (
              <SearchOfferResult 
                key={offer.id}
                offer={offer}
                title={t(offer.title)}
                rateLabel={t('labels.rate_from')}
                onClick={() => { navigate(`/offres/${offer.id}`); onClose(); }}
              />
            ))}
          </div>
        </SearchCategorySection>
      )}

      {results.glossary.length > 0 && (
        <SearchCategorySection title={t('search.cat_glossary')}>
          {results.glossary.map((item, idx) => (
            <motion.button key={idx} variants={itemVariants} initial="hidden" animate="visible" onClick={() => { navigate(`/glossaire#term-${item.term.toLowerCase().split(' ')[0]}`); onClose(); }} className="flex items-start p-6 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-800 transition-all group w-full space-x-6 text-left border border-transparent hover:border-slate-200 hover:shadow-xl">
              <div className="w-11 h-11 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0 flex items-center justify-center border border-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white transition-all"><SpellCheck size={20} /></div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight italic">{item.term}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-1.5 leading-relaxed">{item.definition}</p>
              </div>
            </motion.button>
          ))}
        </SearchCategorySection>
      )}

      {results.articles.length > 0 && (
        <SearchCategorySection title={t('search.cat_guides')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.articles.map(article => (
              <motion.button key={article.id} variants={itemVariants} initial="hidden" animate="visible" onClick={() => { navigate(`/guide/${article.id}`); onClose(); }} className="flex flex-col p-4 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group w-full space-y-4 text-left">
                <div className="w-full h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:scale-[1.02] transition-transform">
                  <img src={article.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight line-clamp-2 group-hover:text-brand-primary transition-colors leading-tight">{article.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </SearchCategorySection>
      )}
    </div>
  );
};

export default SearchResults;
