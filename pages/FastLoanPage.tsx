
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ExpertCtaBanner from '../components/ui/ExpertCtaBanner';
import FadeIn from '../components/ui/FadeIn';

const FastLoanPage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'pourquoi', title: t('fast_loan.nav.pourquoi') },
    { id: 'criteres', title: t('fast_loan.nav.criteres') },
    { id: 'resume', title: t('fast_loan.nav.resume') }
  ];

  const criteriaItems = t('fast_loan.content.criteria_items', { returnObjects: true }) as any[];
  const summaryRows = t('fast_loan.content.summary_rows', { returnObjects: true }) as any[];

  return (
    <LoanPageLayout 
      hero={{
        title: t('fast_loan.hero.title'),
        highlight: t('fast_loan.hero.highlight'),
        desc: t('fast_loan.hero.desc'),
        cta: t('fast_loan.hero.cta'),
        image: "https://images.unsplash.com/photo-1554224155-1696413575b3?auto=format&fit=crop&q=80&w=2000",
        offerId: 'rapide'
      }}
      navItems={navItems}
      accentColorClass="text-yellow-600"
      accentHex="#eab308"
    >
      <FadeIn id="pourquoi" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-600/10 text-yellow-600 rounded-2xl flex items-center justify-center shadow-sm">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('fast_loan.content.why_title')}</h2>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6 font-medium">
          <p>{t('fast_loan.content.why_p1')}</p>
          <div className="bg-yellow-500/5 p-10 rounded-[3rem] border border-yellow-500/20 space-y-4 shadow-sm">
            <h4 className="font-black uppercase text-xs text-yellow-600">{t('fast_loan.content.why_box_t')}</h4>
            <p className="text-lg italic">"{t('fast_loan.content.why_box_p')}"</p>
          </div>
        </div>
      </FadeIn>

      <section id="criteres" className="space-y-12 scroll-mt-32">
        <FadeIn className="space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">{t('fast_loan.content.criteria_title')}</h2>
          <p className="text-slate-500 font-medium">{t('fast_loan.content.criteria_subtitle')}</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteriaItems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-start space-x-6 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm text-yellow-600 font-black group-hover:scale-110 transition-transform">0{i+1}</div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-slate-950 dark:text-white mb-2 text-base">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn id="resume" className="scroll-mt-32">
        <OfferSummaryTable rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v, isHighlight: r.h }))} />
        <ExpertCtaBanner 
          title={t('fast_loan.content.cta_title')}
          description={t('fast_loan.content.cta_desc')}
          buttonText={t('fast_loan.content.cta_btn')}
          variant="yellow"
          onClick={() => window.dispatchEvent(new CustomEvent('openSimulator', { detail: { offerId: 'rapide' } }))}
        />
      </FadeIn>
    </LoanPageLayout>
  );
};

export default FastLoanPage;
