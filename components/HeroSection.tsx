import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getHeroProjects } from '../data/heroProjects';
import ProjectSelector from './hero/ProjectSelector';
import TrustBadges from './ui/TrustBadges';

interface HeroSectionProps {
  title: string;
  highlightText?: string;
  description: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, highlightText, description, children 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(0);
  const projects = useMemo(() => getHeroProjects(t), [t]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <section className="relative min-h-[85vh] md:min-h-[50vh] md:max-h-[50vh] lg:min-h-[85vh] lg:max-h-none w-full flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-950 pt-48 pb-20 md:pt-32 md:pb-12 lg:pt-52 lg:pb-32 transition-all duration-700">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2560" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.18] dark:opacity-[0.28] transition-opacity duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full animate-glow pointer-events-none" />
      </div>

      <div className="w-full max-w-[2560px] mx-auto px-6 lg:px-20 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:h-[450px] items-stretch">
          <div className="w-full lg:w-[65%] flex flex-col justify-between h-full py-2">
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tighter uppercase italic text-slate-950 dark:text-white"
              >
                <span className="block">{title}</span>
                <span className="text-brand-primary drop-shadow-sm">{highlightText}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-2xl text-base md:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
              >
                {description}
              </motion.p>
            </div>

            <div className="md:hidden lg:block mt-8 lg:mt-0">
              <ProjectSelector 
                projects={projects} 
                activeIndex={activeProject} 
                onSelect={setActiveProject} 
              />
            </div>

            <div className="flex flex-row items-center gap-4 pt-6 lg:pt-2">
              {children}
            </div>

            <div className="hidden lg:block pt-6 border-t border-slate-100 dark:border-slate-900/50">
              <TrustBadges />
            </div>
          </div>

          <div className="hidden lg:flex w-full lg:w-[35%] relative h-[300px] lg:h-[450px] justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.02, rotateY: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative w-[350px] h-full bg-slate-900 rounded-[3rem] shadow-3xl overflow-hidden border-[6px] border-slate-100 dark:border-slate-800 cursor-pointer group"
                onClick={() => navigate(`/offres/${projects[activeProject].id}`)}
              >
                <img src={projects[activeProject].image} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent" />
                
                <div className="absolute bottom-6 left-8 right-8 space-y-3 text-white">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
                      {t(projects[activeProject].labelKey)}.
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-black italic text-brand-primary">{projects[activeProject].rate}</span>
                      <div className="h-5 w-px bg-white/20" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/70">{t('landing.hero.apr_fixed')}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200/20 flex justify-between items-center">
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/50">Détails de l'offre</span>
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;