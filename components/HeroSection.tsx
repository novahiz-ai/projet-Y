import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Car,
  Home,
  User,
  Heart,
  Clock,
  ShieldCheck,
  Zap,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  highlightText?: string;
  description: string;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  highlightText, 
  description,
  children 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    { id: "auto", label: t('landing.hero.projects.auto.label'), icon: <Car size={24} />, rate: "2.5%", color: "emerald", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000" },
    { id: "immo", label: t('landing.hero.projects.immo.label'), icon: <Home size={24} />, rate: "1.8%", color: "rose", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" },
    { id: "perso", label: t('landing.hero.projects.perso.label'), icon: <User size={24} />, rate: "3.9%", color: "indigo", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" },
    { id: "projet", label: t('landing.hero.projects.projet.label'), icon: <Heart size={24} />, rate: "3.5%", color: "cyan", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-950 pt-24 lg:pt-0">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.08] dark:opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white dark:from-slate-950 dark:via-slate-950/70 dark:to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="relative inline-block">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="text-4xl md:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic relative z-10 text-slate-950 dark:text-white"
                >
                  <div className="relative inline-block">
                    <span className="relative z-10">{title}</span>
                  </div>
                  <br />
                  <div className="relative inline-block mt-2">
                    <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 -rotate-1 scale-105 rounded-lg z-0" />
                    <span className="relative z-10 text-brand-primary drop-shadow-sm">{highlightText}</span>
                  </div>
                </motion.h1>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold leading-relaxed"
              >
                {description}
              </motion.p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProject(idx)}
                  className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center space-y-3 group ${
                    activeProject === idx 
                      ? 'bg-white dark:bg-slate-900 border-brand-primary shadow-2xl shadow-brand-primary/20 scale-105' 
                      : 'bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    activeProject === idx ? 'bg-brand-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {proj.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-950 dark:text-white leading-none mb-1">{proj.label}</p>
                    <p className={`text-[10px] font-black ${activeProject === idx ? 'text-brand-primary' : 'text-slate-400'}`}>{proj.rate}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6">{children}</div>

            <div className="flex items-center space-x-10 pt-10 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-brand-primary mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('landing.hero.trustpilot')}</p>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                <Clock size={18} className="text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('landing.hero.response_time')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[550px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: -15 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="relative w-full max-w-[450px] h-[450px] bg-slate-900 rounded-[4rem] shadow-3xl overflow-hidden border-8 border-white dark:border-slate-800 cursor-pointer group"
                onClick={() => navigate(`/offres/${projects[activeProject].id}`)}
              >
                <img src={projects[activeProject].image} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                
                <div className="absolute bottom-12 left-10 right-10 space-y-5 text-white">
                  <div className="space-y-1">
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{projects[activeProject].label}.</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-5xl font-black italic text-brand-primary">{projects[activeProject].rate}</span>
                      <div className="h-6 w-px bg-white/30" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{t('landing.hero.apr_fixed')}</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/20 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-white/60">
                      <Shield size={18} className="text-brand-primary" />
                      <span>{t('landing.hero.secured')}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Background floating blur */}
            <div className="absolute -z-10 w-80 h-80 bg-brand-primary/20 blur-[100px] rounded-full animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;