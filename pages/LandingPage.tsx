import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ChevronRight, 
  Zap, 
  Car,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { LOAN_OFFERS } from '../constants';
import { getArticles } from '../data/articles';
import LoanCard from '../components/LoanCard';
import HeroSection from '../components/HeroSection';
import StandardButton from '../components/StandardButton';
import StatsBar from '../components/StatsBar';
import ProcessSteps from '../components/ProcessSteps';
import TestimonialsSection from '../components/TestimonialsSection';
import ArticleCard from '../components/ArticleCard';
import HomeRenovationSection from '../components/HomeRenovationSection';

interface LandingPageProps {
  onOpenApp: (context?: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onOpenApp }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const articles = useMemo(() => getArticles(t), [t]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="relative">
      <HeroSection 
        title={t('landing.hero.title')}
        highlightText={t('landing.hero.highlight')}
        description={t('landing.hero.desc')}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
          <StandardButton 
            onClick={() => navigate('/simulateur')}
            className="w-full sm:w-auto !py-5 !px-12 shadow-brand"
          >
            <Zap size={20} className="fill-white" />
            <span>{t('landing.hero.simulate')}</span>
          </StandardButton>

          <StandardButton 
            variant="outline"
            onClick={() => onOpenApp({ express: true })}
            className="w-full sm:w-auto !py-5 !px-12"
          >
            <ArrowRight size={20} />
            <span>{t('landing.hero.express')}</span>
          </StandardButton>
        </div>
      </HeroSection>

      <div className="relative z-10 bg-white dark:bg-slate-950 rounded-t-[4rem] lg:rounded-t-[6rem] mt-12 lg:-mt-16 transition-colors duration-500 pb-20">
        
        <div className="relative pt-12">
          <StatsBar />
        </div>

        <div className="space-y-32 py-24">
          
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                  {t('landing.solutions_title')}<span className="text-brand-primary">{t('landing.solutions_highlight')}</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">{t('landing.solutions_desc')}</p>
              </div>
              <Link to="/offres" className="group flex items-center justify-center space-x-3 bg-slate-100 dark:bg-slate-900 px-8 py-4 rounded-full text-slate-950 dark:text-white font-black uppercase text-[10px] tracking-widest hover:bg-brand-primary hover:text-white transition-all">
                <span>{t('landing.view_catalog')}</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {LOAN_OFFERS.slice(0, 4).map((offer) => (
                <motion.div key={offer.id} variants={fadeInUp}>
                  <LoanCard offer={offer} onExpressDemand={(ctx) => onOpenApp(ctx)} onClick={() => navigate(`/offres/${offer.id}`)} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
            <ProcessSteps />
          </motion.div>

          <HomeRenovationSection onDiscover={() => navigate('/offres/travaux')} />

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="p-10 lg:p-20 space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.95]">
                      {t('landing.auto_title')}<span className="text-emerald-600">{t('landing.auto_highlight')}</span> {t('landing.auto_subtitle')}
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                      {t('landing.auto_desc')}
                    </p>
                  </div>
                  <StandardButton 
                    className="!bg-emerald-600 hover:!bg-emerald-700 !px-12 shadow-emerald-600/20"
                    onClick={() => onOpenApp({ loanId: 'auto', amount: 15000, duration: 48 })}
                  >
                    <span>{t('landing.auto_cta')}</span>
                    <ArrowRight size={20} />
                  </StandardButton>
                </div>
                <div className="h-[400px] lg:h-full relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover animate-subtle-zoom" alt="" />
                </div>
              </div>
            </div>
          </motion.section>

          <TestimonialsSection />

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                  {t('landing.expertise_title')}<span className="text-brand-primary">{t('landing.expertise_highlight')}</span>
                </h2>
              </div>
              <Link to="/guide" className="group flex items-center space-x-3 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:opacity-80 transition-all">
                <span>{t('landing.access_guide')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {articles.slice(0, 3).map((article) => (
                <motion.div key={article.id} variants={fadeInUp}>
                   <ArticleCard article={article} onClick={() => navigate(`/guide/${article.id}`)} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;