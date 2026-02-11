import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

const EligibilityPillars: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
      
      {/* Bloc Principal - Situation Professionnelle */}
      <div className="lg:col-span-7 group relative bg-slate-50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_0_50px_-12px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 dark:bg-indigo-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-600/10 dark:group-hover:bg-indigo-600/20 transition-colors"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between space-y-12">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Briefcase size={32} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white italic">
                {t('eligibility.pro.title').split(' ')[0]} <span className="text-indigo-600 dark:text-indigo-400">{t('eligibility.pro.title').split(' ')[1]}</span>
              </h3>
              <p className="text-slate-600 dark:text-indigo-100/60 max-w-md leading-relaxed font-medium">
                {t('eligibility.pro.desc')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(t('eligibility.pro.labels', { returnObjects: true }) as string[]).map((label, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center space-x-2 shadow-sm dark:shadow-none">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white/80">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bloc Secondaire - Situation Personnelle */}
      <div className="lg:col-span-5 group relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 overflow-hidden transition-all duration-500 hover:border-brand-secondary/50">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-[60px] rounded-full group-hover:bg-brand-secondary/10 dark:group-hover:bg-brand-secondary/20 transition-colors"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
          <div className="w-14 h-14 bg-brand-secondary text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-rotate-3 transition-transform duration-500">
            <User size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{t('eligibility.perso.title')}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              {t('eligibility.perso.desc')}
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
             <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('eligibility.perso.analysis')}</span>
             <div className="flex -space-x-2">
                {[1,2,3].map(j => (
                  <div key={j} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800"></div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Bloc Tertiaire - Santé Financière */}
      <div className="lg:col-span-12 group relative bg-white dark:bg-gradient-to-r dark:from-indigo-950/50 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3.5rem] p-10 lg:p-12 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 shadow-sm dark:shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Zap size={14} className="text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{t('eligibility.banking.scoring')}</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none italic">
                {t('eligibility.banking.title').split(' ')[0]} <span className="text-emerald-500">{t('eligibility.banking.title').split(' ')[1]}</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
                {t('eligibility.banking.desc')}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-black/40 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('eligibility.banking.debt_ratio')}</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-500 italic">33 %</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-1/3 animate-[progress_2s_ease-out]"></div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
               <div className="flex-1 p-4 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm dark:shadow-none">
                  <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">{t('eligibility.banking.labels.past')}</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{t('eligibility.banking.labels.sain')}</p>
               </div>
               <div className="flex-1 p-4 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm dark:shadow-none">
                  <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">{t('eligibility.banking.labels.capacity')}</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{t('eligibility.banking.labels.optimal')}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/5 dark:bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          from { width: 0%; }
          to { width: 33%; }
        }
      `}} />
    </div>
  );
};

export default EligibilityPillars;