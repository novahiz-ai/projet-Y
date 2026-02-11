
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// Fix: Added Zap to imports to resolve "Cannot find name 'Zap'" error
import { MousePointer2, FileSignature, Wallet, Zap } from 'lucide-react';

const ProcessSteps: React.FC = () => {
  const { t } = useTranslation();
  
  // On récupère les items traduits depuis la config i18n
  const stepsData = t('landing.steps.items', { returnObjects: true }) as any[];
  const stepLabel = t('landing.steps.step_label');
  
  // Liste des icônes statiques à mapper par index
  const icons = [
    <MousePointer2 size={32} />, 
    <FileSignature size={32} />, 
    <Wallet size={32} />
  ];

  // Sécurité si les données i18n ne sont pas encore chargées
  if (!Array.isArray(stepsData)) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
          {t('landing.steps_title')}<span className="text-brand-primary italic">{t('landing.steps_highlight')}</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">{t('landing.steps_desc')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
        <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-[2px] bg-slate-200 dark:bg-slate-800/50 z-0"></div>
        
        {stepsData.map((item, i) => (
          <div key={i} className="relative z-10 text-center space-y-8">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-brand-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-sm group hover:scale-110 transition-all duration-500">
              {icons[i] || <Zap size={32} />}
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest px-6 py-2 bg-brand-primary/10 rounded-full">
                {stepLabel} {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="text-2xl font-black uppercase tracking-tight mt-4 text-slate-950 dark:text-white">{item.title}</h4>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-[260px] mx-auto leading-relaxed font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
