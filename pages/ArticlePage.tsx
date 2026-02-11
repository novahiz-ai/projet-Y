import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Clock, 
  User, 
  CheckCircle2, 
  Zap,
  Info
} from 'lucide-react';
import { getArticles } from '../data/articles';
import ArticleSidebar from '../components/ArticleSidebar';
import { ArticleSkeleton } from '../components/Skeleton';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const articles = useMemo(() => getArticles(t), [t]);
  const article = useMemo(() => articles.find(a => a.id === id), [articles, id]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    window.scrollTo(0, 0);
    if (!article && id) {
      navigate('/guide');
    }
    return () => clearTimeout(timer);
  }, [article, navigate, id]);

  useEffect(() => {
    if (isLoading || !article) return;

    const observers = article.sections.map(section => {
      const el = document.getElementById(section.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers?.forEach(o => o?.disconnect());
    };
  }, [article, isLoading]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (isLoading) return <div className="pt-32 max-w-7xl mx-auto px-6"><ArticleSkeleton /></div>;
  if (!article) return null;

  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 3);

  const handleSummaryClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 dark:from-brand-primary/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8 md:space-y-10 text-center lg:text-left">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/guide')}
            className="flex items-center space-x-2 text-slate-400 hover:text-brand-primary transition-colors font-black uppercase tracking-widest text-[9px] md:text-[10px] mx-auto lg:mx-0"
          >
            <ChevronLeft size={16} />
            <span>{t('ui.back', { ns: 'guide' })}</span>
          </motion.button>

          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-brand-primary/20"
            >
              {t('ui.dossier', { ns: 'guide' })} {article.categoryLabel}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900 dark:text-white max-w-4xl mx-auto lg:mx-0 italic"
            >
              {article.title}
            </motion.h1>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-primary">
                  <User size={14} />
                </div>
                <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{article.author}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-slate-400" />
                <p className="text-[10px] font-black uppercase tracking-widest">{article.readTime} {t('ui.read_time', { ns: 'guide' })}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <main className="lg:col-span-8 space-y-12 md:space-y-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl border-4 border-white dark:border-slate-800"
            >
              <img src={article.image} alt={article.title} className="w-full object-cover aspect-[16/10] md:aspect-video" />
            </motion.div>

            <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
                className="text-lg md:text-2xl font-black text-slate-900 dark:text-white italic leading-tight mb-12 md:mb-16 border-l-4 border-brand-primary pl-8"
              >
                {article.excerpt}
              </motion.p>
              
              {article.sections.map((section) => (
                <motion.div 
                  key={section.id} 
                  id={section.id} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={fadeInUp}
                  className="scroll-mt-32 mb-16 md:mb-20 last:mb-0"
                >
                  {section.type === 'text' && (
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950 dark:text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm">#</span>
                        {section.title}
                      </h2>
                      <p className="text-sm md:text-lg leading-relaxed">{section.content}</p>
                    </div>
                  )}

                  {section.type === 'highlight' && (
                    <div className="my-10 p-8 md:p-12 bg-slate-950 rounded-[3rem] text-white space-y-4 relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full"></div>
                      <div className="flex items-center space-x-3 text-brand-primary relative z-10">
                        <Info size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('ui.expert_note', { ns: 'guide' })}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black uppercase relative z-10 italic">{section.title}</h3>
                      <p className="text-slate-300 text-base md:text-xl relative z-10 font-medium leading-relaxed">{section.content}</p>
                    </div>
                  )}

                  {section.type === 'list' && (
                    <div className="space-y-8">
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{section.title}</h2>
                      <p className="text-sm md:text-lg opacity-80">{section.content}</p>
                      <div className="grid grid-cols-1 gap-4">
                        {section.items?.map((item, i) => (
                          <div key={i} className="flex items-start space-x-4 p-5 md:p-7 bg-slate-50 dark:bg-slate-900/50 rounded-2xl md:rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-all group">
                            <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 mt-1 shadow-brand">
                               <CheckCircle2 size={14} />
                            </div>
                            <span className="text-xs md:text-base font-bold text-slate-700 dark:text-slate-300 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </article>
          </main>

          <aside className="lg:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ArticleSidebar 
                article={article} 
                relatedArticles={relatedArticles} 
                onSummaryClick={handleSummaryClick}
                activeId={activeSection}
                onBrowseGuide={() => navigate('/guide')}
              />
            </motion.div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticlePage;