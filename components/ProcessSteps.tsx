
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <Sparkles size={600} className="text-brand-primary" />
      </div>

      <div className="text-center mb-24 space-y-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-3 px-6 py-2 bg-brand-primary/10 rounded-full text-brand-primary border border-brand-primary/20"
        >
          <Zap size={16} className="fill-brand-primary" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em]">Quick & Easy</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.9] italic"
        >
          {t('landing.steps_title')}<span className="text-brand-primary">{t('landing.steps_highlight')}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.4em] text-xs max-w-lg mx-auto"
        >
          {t('landing.steps_desc')}
        </motion.p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] z-0">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 relative z-10">
          {stepsData.map((item, i) => (
            <motion.div 
              key={i} 
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-28 h-28 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 text-brand-primary rounded-[3rem] flex items-center justify-center shadow-xl relative z-10 transition-all duration-500 group-hover:border-brand-primary/30">
                  <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {icons[i] || <Zap size={36} />}
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-sm italic shadow-lg border-2 border-white dark:border-slate-800">
                    0{i + 1}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">
                    {stepLabel} 0{i + 1}
                  </span>
                  <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-950 dark:text-white italic leading-none">
                    {item.title}.
                  </h4>
                </div>
                <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-[300px] mx-auto leading-relaxed font-medium">
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
