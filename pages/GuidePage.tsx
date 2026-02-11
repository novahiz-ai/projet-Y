
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Filter, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../data/articles';

const ARTICLES_PER_PAGE = 6;

const GuidePage: React.FC = () => {
  const { t, i18n } = useTranslation(['guide', 'common']);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const ARTICLES = useMemo(() => getArticles(t), [t, i18n.language]);

  const CATEGORIES = [
    { id: 'all', label: t('filters.all') },
    { id: 'immo', label: t('filters.immo') },
    { id: 'auto', label: t('filters.auto') },
    { id: 'travaux', label: t('filters.travaux') },
    { id: 'perso', label: t('filters.perso') },
    { id: 'rachat', label: t('filters.rachat') },
    { id: 'assurance', label: t('filters.assurance') },
    { id: 'projet', label: t('filters.projet') }
  ];

  const featuredArticles = useMemo(() => 
    ARTICLES.filter(a => a.isFeatured).slice(0, 3), 
  [ARTICLES]);

  useEffect(() => {
    if (featuredArticles.length === 0) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArticles]);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      return activeCategory === 'all' || art.category === activeCategory;
    });
  }, [activeCategory, ARTICLES]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('articles-list');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="w-full h-full object-cover opacity-5 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent dark:from-slate-950 dark:via-slate-950/40 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-[0.9] italic">
              {t('hero.title')} <br />
              <span className="text-brand-primary">LE GUIDE.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {t('hero.desc')}
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-primary/10 blur-[100px] rounded-full opacity-50"></div>
            <div className="relative overflow-hidden rounded-[3rem] aspect-video shadow-3xl bg-slate-100 dark:bg-slate-900 border-4 border-white dark:border-slate-800">
              {featuredArticles.map((art, idx) => (
                <div key={art.id} className={`absolute inset-0 transition-all duration-1000 ${idx === carouselIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                  <img src={art.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <span className="px-3 py-1 bg-brand-primary text-white rounded-lg text-[9px] font-black uppercase tracking-widest">{art.categoryLabel}</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{art.title}</h3>
                    <button onClick={() => navigate(`/guide/${art.id}`)} className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors font-black uppercase text-[10px] tracking-widest">
                      <span>{t('ui.read_more')}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-y border-slate-100 dark:border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          <Filter size={16} className="text-slate-400 mr-2 shrink-0" />
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => {setActiveCategory(cat.id); setCurrentPage(1);}} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-brand-primary text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100'}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        <div id="articles-list" className="space-y-12 scroll-mt-32">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8">
            <h3 className="text-2xl font-black uppercase tracking-tighter italic">Les <span className="text-brand-primary">Dossiers.</span></h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{filteredArticles.length} {t('ui.found')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {paginatedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onClick={() => navigate(`/guide/${art.id}`)} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-12">
              <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-brand-primary disabled:opacity-30 border border-slate-100 dark:border-slate-800"><ChevronLeft size={20} /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-12 h-12 rounded-2xl text-[10px] font-black border ${currentPage === i + 1 ? 'bg-brand-primary text-white' : 'bg-white dark:bg-slate-900'}`}>{i + 1}</button>
              ))}
              <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-brand-primary disabled:opacity-30 border border-slate-100 dark:border-slate-800"><ChevronRight size={20} /></button>
            </div>
          )}
        </div>

        <section className="relative py-20 bg-brand-primary rounded-[4rem] text-white text-center space-y-10 overflow-hidden shadow-brand">
           <div className="relative z-10 space-y-4 px-6">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">{t('ui.footer_banner.title')}</h2>
              <p className="text-indigo-100 max-w-xl mx-auto font-medium text-lg">{t('ui.footer_banner.desc')}</p>
           </div>
           <div className="relative z-10 flex justify-center">
              <StandardButton variant="white" onClick={() => navigate('/simulateur')} className="!text-brand-primary text-lg !px-12">
                <span>{t('ui.footer_banner.btn')}</span>
                <Zap size={20} />
              </StandardButton>
           </div>
        </section>
      </div>
    </div>
  );
};

export default GuidePage;
