import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, ChevronRight, Shield } from 'lucide-react';
import StandardButton from './StandardButton';
import TrustBadges from './ui/TrustBadges';
import StaggerContainer, { StaggerItem, staggerFadeInUp } from './ui/StaggerContainer';

interface TabletHeroSectionProps {
  onOpenApp: (context?: any) => void;
  onOpenSimulator: (offerId?: string) => void;
}

const TabletHeroSection: React.FC<TabletHeroSectionProps> = ({ onOpenApp, onOpenSimulator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative pt-48 pb-20 px-10 hidden md:block lg:hidden bg-white dark:bg-slate-950 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.45] dark:opacity-[0.55] scale-105 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white dark:from-slate-950/40 dark:via-transparent dark:to-slate-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/15 blur-[140px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none animate-glow"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        <StaggerContainer className="text-center space-y-6">
          <StaggerItem variants={staggerFadeInUp}>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic text-slate-950 dark:text-white leading-[0.85] text-balance">
              {t('landing.hero.title')} <br />
              <span className="text-brand-primary drop-shadow-sm">{t('landing.hero.highlight')}</span>
            </h1>
          </StaggerItem>

          <StaggerItem variants={staggerFadeInUp}>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              {t('landing.hero.desc')}
            </p>
          </StaggerItem>
        </StaggerContainer>

        <div className="grid grid-cols-12 gap-8 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="col-span-7 bg-slate-950 dark:bg-slate-900 rounded-[3rem] p-9 text-white relative overflow-hidden shadow-3xl flex flex-col justify-between border border-white/5"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/20 blur-3xl"></div>
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-brand">
                <Zap size={24} className="fill-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black uppercase italic leading-none tracking-tight">{t('landing.hero.simulate')}</h3>
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest opacity-80">{t('landing.hero.response_time_desc')}</p>
              </div>
            </div>
            <div className="pt-8">
              <StandardButton 
                onClick={() => onOpenSimulator()}
                className="w-full !rounded-xl shadow-brand !py-4 !text-[10px]"
              >
                <span className="tracking-[0.2em]">{t('form.next')}</span>
                <ChevronRight size={18} />
              </StandardButton>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="col-span-5 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800 rounded-[3rem] p-9 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-5">
              <div className="flex items-center space-x-3 text-brand-secondary">
                <Shield size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('landing.hero.total_security')}</span>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed uppercase tracking-tight">
                {t('landing.hero.security_text')}
              </p>
            </div>
            <button 
              onClick={() => onOpenApp({ express: true })}
              className="group flex items-center justify-between w-full p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg active:scale-95 transition-all hover:border-brand-primary/30"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 pl-2">{t('landing.hero.express')}</span>
              <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </button>
          </motion.div>
        </div>

        <div className="pt-8 flex justify-center border-t border-slate-100 dark:border-slate-900">
          <TrustBadges className="opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default TabletHeroSection;