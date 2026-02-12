
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Cpu, Palette, FileText, ChevronRight } from 'lucide-react';
import InfoPageLayout from '../components/layout/InfoPageLayout';
import FadeIn from '../components/ui/FadeIn';

const CreditsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <InfoPageLayout 
      header={{
        title: t('credits_page.title'),
        highlight: t('credits_page.highlight'),
        description: t('credits_page.desc'),
        label: t('credits_page.label'),
        Icon: LayoutGrid
      }}
      maxContainerWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <FadeIn direction="right" className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><Cpu size={24} /></div>
          <h3 className="text-xl font-black uppercase tracking-tight">{t('credits_page.tech_stack')}</h3>
          <ul className="space-y-3 text-sm font-bold text-slate-500 list-none p-0">
             <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-primary" /> <span>React 19 / TypeScript</span></li>
             <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-primary" /> <span>Framer Motion / Tailwind v3.4</span></li>
          </ul>
        </FadeIn>
        <FadeIn direction="left" className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-secondary shadow-sm"><Palette size={24} /></div>
          <h3 className="text-xl font-black uppercase tracking-tight">{t('credits_page.design_credits')}</h3>
          <ul className="space-y-3 text-sm font-bold text-slate-500 list-none p-0">
             <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-secondary" /> <span>Lucide React / Unsplash</span></li>
             <li className="flex items-center space-x-2"><ChevronRight size={12} className="text-brand-secondary" /> <span>Inter Font Family</span></li>
          </ul>
        </FadeIn>
      </div>

      <FadeIn className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex items-center space-x-8">
         <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm"><FileText size={28} className="text-slate-400" /></div>
         <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2">Note Légale</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">{t('credits_page.legal_notice')}</p>
         </div>
      </FadeIn>
    </InfoPageLayout>
  );
};

export default CreditsPage;
