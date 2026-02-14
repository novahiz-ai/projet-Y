import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MousePointer2, FileSignature, Wallet, Zap, Sparkles } from 'lucide-react';
import StaggerContainer from './ui/StaggerContainer';
import ProcessStepCard from './home/ProcessStepCard';

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
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] z-0">
          <svg width="100%" height="24" viewBox="0 0 800 24" fill="none">
            <motion.path 
              d="M0 12H800" 
              stroke="currentColor" 
              className="text-brand-primary/20"
              strokeWidth="4" 
              strokeDasharray="12 12"
            />
            <motion.path 
              d="M0 12H800" 
              stroke="var(--brand-primary)" 
              strokeWidth="4" 
              strokeDasharray="12 12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 relative z-10">
          {stepsData.map((item, i) => (
            <ProcessStepCard 
              key={i}
              index={i}
              icon={icons[i]}
              label={stepLabel}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ProcessSteps;