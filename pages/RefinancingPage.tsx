
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, CheckCircle2, CreditCard, XCircle, Shield } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ExpertCtaBanner from '../components/ui/ExpertCtaBanner';
import FadeIn from '../components/ui/FadeIn';

const RefinancingPage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'definition', title: t('refinancing_loan.nav.definition') },
    { id: 'eligibilite', title: t('refinancing_loan.nav.eligibilite') },
    { id: 'resume', title: t('refinancing_loan.nav.resume') }
  ];

  const advList = t('refinancing_loan.content.adv_list', { returnObjects: true }) as any[];
  const summaryRows = t('refinancing_loan.content.summary_rows', { returnObjects: true }) as any[];

  return (
    <LoanPageLayout 
      hero={{
        title: t('refinancing_loan.hero.title'),
        highlight: t('refinancing_loan.hero.highlight'),
        desc: t('refinancing_loan.hero.desc'),
        cta: t('refinancing_loan.hero.cta'),
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=2000",
        offerId: 'rachat'
      }}
      navItems={navItems}
      accentColorClass="text-indigo-600"
      accentHex="#4f46e5"
    >
      <FadeIn id="definition" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm"><Info size={28} /></div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('refinancing_loan.content.def_title')}</h2>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-10 font-medium">
          <p>{t('refinancing_loan.content.def_p1')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {advList.map((adv: any, i: number) => (
              <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start space-x-5 hover:border-indigo-500/30 transition-all shadow-sm">
                <CheckCircle2 size={24} className="text-indigo-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-black uppercase text-sm text-slate-900 dark:text-white mb-1">{adv.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <section id="eligibilite" className="space-y-12 scroll-mt-32">
        <FadeIn className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">{t('refinancing_loan.content.elig_title')}</h2>
          <p className="text-slate-500 font-medium">{t('refinancing_loan.content.elig_subtitle')}</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white flex flex-col justify-center space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[80px] rounded-full"></div>
              <h3 className="text-2xl font-black uppercase italic leading-tight">{t('refinancing_loan.content.refusal_box_t')}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{t('refinancing_loan.content.refusal_box_p')}</p>
           </div>
           <div className="p-10 bg-slate-50 dark:bg-slate-900 border-2 border-rose-500/10 rounded-[3.5rem] space-y-6">
              <div className="flex items-center space-x-4 text-rose-600">
                 <XCircle size={32} />
                 <h4 className="font-black uppercase text-xl italic">{t('refinancing_loan.content.refusal_endett_t')}</h4>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('refinancing_loan.content.refusal_endett_p')}</p>
           </div>
        </div>
      </section>

      <FadeIn id="resume" className="scroll-mt-32">
        <OfferSummaryTable rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v, isHighlight: r.h }))} />
        <ExpertCtaBanner 
          title={t('refinancing_loan.content.cta_h2')}
          description={t('refinancing_loan.content.cta_p')}
          buttonText={t('refinancing_loan.content.cta_btn')}
          variant="indigo"
          onClick={() => window.dispatchEvent(new CustomEvent('openSimulator', { detail: { offerId: 'rachat' } }))}
        />
      </FadeIn>
    </LoanPageLayout>
  );
};

export default RefinancingPage;
