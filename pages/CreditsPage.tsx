
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Cpu, Palette, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreditsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <section className="relative h-[50vh] lg:h-auto pt-24 lg:pt-32 pb-10 lg:pb-20 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6 lg:space-y-10 relative z-10 w-full">
          <div className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-4 py-1.5 lg:py-2 rounded-xl border border-brand-primary/20 mx-auto">
            <LayoutGrid size={18} />
            <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest">{t('credits_page.label')}</span>
          </div>
          <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.9] italic">
            {t('credits_page.title')} <br />
            <span className="text-brand-primary">{t('credits_page.highlight')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base lg:text-xl text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            {t('credits_page.desc')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><Cpu size={24} /></div>
            <h3 className="text-xl font-black uppercase tracking-tight">{t('credits_page.tech_stack')}</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-500 list-none p-0">
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-primary" /> <span>React 19 / TypeScript</span></li>
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-primary" /> <span>Framer Motion (Animations)</span></li>
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-primary" /> <span>Tailwind CSS v3.4</span></li>
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-primary" /> <span>i18next / React-i18next</span></li>
            </ul>
          </div>
          <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-secondary shadow-sm"><Palette size={24} /></div>
            <h3 className="text-xl font-black uppercase tracking-tight">{t('credits_page.design_credits')}</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-500 list-none p-0">
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-secondary" /> <span>Lucide React (Iconographie)</span></li>
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-secondary" /> <span>Inter Font Family (Google Fonts)</span></li>
               <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-secondary" /> <span>Unsplash (Photographie)</span></li>
            </ul>
          </div>
        </div>

        <section className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex items-center space-x-8">
           <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm"><FileText size={28} className="text-slate-400" /></div>
           <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2">Note Légale</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">{t('credits_page.legal_notice')}</p>
           </div>
        </section>

        <div className="text-center pt-10">
           <button onClick={() => navigate('/')} className="text-brand-primary font-black uppercase text-[10px] tracking-[0.5em] hover:underline transition-all">Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
