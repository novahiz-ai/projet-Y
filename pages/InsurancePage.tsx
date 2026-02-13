import React from 'react';
import { useTranslation } from 'react-i18next';
import { Car, TrendingUp } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ExpertCtaBanner from '../components/ui/ExpertCtaBanner';
import FadeIn from '../components/ui/FadeIn';
import SectionHeading from '../components/ui/SectionHeading';

const InsurancePage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'maintien', title: t('insurance.nav.maintien') },
    { id: 'auto', title: t('insurance.nav.auto') },
    { id: 'habitation', title: t('insurance.nav.habitation') },
    { id: 'emprunteur', title: t('insurance.nav.emprunteur') },
    { id: 'resume', title: t('insurance.nav.resume') }
  ];

  const getSafeArray = (key: string) => {
    const res = t(key, { returnObjects: true });
    return Array.isArray(res) ? res : [];
  };

  const autoItems = getSafeArray('insurance.content.auto_items');
  const summaryItems = getSafeArray('insurance.content.summary_items');

  return (
    <LoanPageLayout 
      hero={{
        title: t('insurance.hero.title'),
        highlight: t('insurance.hero.highlight'),
        desc: t('insurance.hero.desc'),
        cta: t('landing.view_catalog'),
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000",
        offerId: 'assurance'
      }}
      navItems={navItems}
      accentColorClass="text-indigo-600"
      accentHex="#4f46e5"
    >
      <FadeIn id="maintien" className="scroll-mt-32 space-y-10">
        <SectionHeading title={t('insurance.content.maintien_title')} badgeIcon={TrendingUp} badge="Prévoyance" />
        <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black uppercase italic text-indigo-400">{t('insurance.content.maintien_h3')}</h3>
            <p className="text-lg text-slate-300 leading-relaxed font-medium">{t('insurance.content.maintien_p')}</p>
          </div>
        </div>
      </FadeIn>

      <section id="auto" className="scroll-mt-32 space-y-12">
        <SectionHeading title={t('insurance.content.auto_title')} description={t('insurance.content.auto_p')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {autoItems.map((item: any, i: number) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] space-y-4 group hover:border-indigo-500 transition-all h-full">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                  <Car size={24} />
                </div>
                <h4 className="font-black uppercase tracking-tight text-slate-950 dark:text-white text-xs">{item.t}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{item.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn id="habitation" className="scroll-mt-32 space-y-10">
        <SectionHeading title={t('insurance.content.habitation_title')} description={t('insurance.content.habitation_p')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 bg-indigo-600 rounded-[3rem] text-white space-y-4 shadow-xl">
            <h4 className="text-xl font-black uppercase italic">{t('insurance.content.habitation_tenant_t')}</h4>
            <p className="text-sm text-indigo-100 font-medium">{t('insurance.content.habitation_tenant_p')}</p>
          </div>
          <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-4 shadow-xl border border-slate-800">
            <h4 className="text-xl font-black uppercase italic text-rose-400">{t('insurance.content.habitation_owner_t')}</h4>
            <p className="text-sm text-slate-400 font-medium">{t('insurance.content.habitation_owner_p')}</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn id="resume" className="scroll-mt-32">
        <OfferSummaryTable rows={summaryItems.map((item: any) => ({ label: item.t, value: item.v }))} />
        <ExpertCtaBanner 
          title={t('insurance.content.cta_title')}
          description={t('insurance.content.cta_desc')}
          buttonText={t('insurance.content.cta_btn')}
          variant="brand"
          onClick={() => window.dispatchEvent(new CustomEvent('openSimulator', { detail: { offerId: 'assurance' } }))}
        />
      </FadeIn>
    </LoanPageLayout>
  );
};

export default InsurancePage;