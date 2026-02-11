import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MousePointer2, FileSignature, Wallet, Zap, Sparkles } from 'lucide-react';

const ProcessSteps: React.FC = () => {
  const { t } = useTranslation();
  
  const stepsData = t('landing.steps.items', { returnObjects: true }) as any[];
  const stepLabel = t('landing.steps.step_label');
  
  const icons = [
    <MousePointer2 size={32} />, 
    <FileSignature size={32} />, 
    <Wallet size={32} />
  ];

  if (!Array.isArray(stepsData)) return null;

  // Animation variants for the icons/cards
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-40 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <Sparkles size={600} className="text-brand-primary" />
      </div>

      <div className="text-center mb-24 space-y-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-primary/10 rounded-full text-brand-primary border border-brand-primary/20"
        >
          <Zap size={14} className="fill-brand-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Quick & Easy</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.9] italic"
        >
          {t('landing.steps_title')}<span className="text-brand-primary">{t('landing.steps_highlight')}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] max-w-md mx-auto"
        >
          {t('landing.steps_desc')}
        </motion.p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* ANIMATED CONNECTING LINE - Desktop (Horizontal) */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] z-0">
          <svg width="100%" height="24" viewBox="0 0 800 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M0 12H800" 
              stroke="url(#gradient-horizontal)" 
              strokeWidth="4" 
              strokeDasharray="12 12"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient-horizontal" x1="0" y1="12" x2="800" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--brand-primary)" />
                <stop offset="1" stopColor="var(--brand-secondary)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ANIMATED CONNECTING LINE - Mobile (Vertical) */}
        <div className="lg:hidden absolute left-12 top-10 bottom-10 w-1 z-0">
           <svg width="4" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
              <motion.path 
                d="M2 0L2 2000" 
                stroke="url(#gradient-vertical)" 
                strokeWidth="4" 
                strokeDasharray="12 12"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient-vertical" x1="2" y1="0" x2="2" y2="1000" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--brand-primary)" />
                  <stop offset="1" stopColor="var(--brand-secondary)" />
                </linearGradient>
              </defs>
           </svg>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 relative z-10">
          {stepsData.map((item, i) => (
            <motion.div 
              key={i} 
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="flex lg:flex-col items-start lg:items-center space-x-8 lg:space-x-0"
            >
              {/* Icon Container */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-24 h-24 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 text-brand-primary rounded-[2.5rem] flex items-center justify-center shadow-xl relative z-10 group transition-all duration-500 hover:border-brand-primary/30">
                  <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {icons[i] || <Zap size={32} />}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-xs italic shadow-lg border-2 border-white dark:border-slate-800">
                    0{i + 1}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4 pt-4 lg:text-center flex-1">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.3em]">
                    {stepLabel} 0{i + 1}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-950 dark:text-white italic">
                    {item.title}.
                  </h4>
                </div>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-[280px] lg:mx-auto leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;