import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Smartphone, Zap, ShieldCheck, CheckCircle } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import ProjectIconsGrid from '../components/ProjectIconsGrid';
import OfferSummaryTable from '../components/OfferSummaryTable';
import FeatureGrid from '../components/ui/FeatureGrid';
import SectionHeading from '../components/ui/SectionHeading';
import FadeIn from '../components/ui/FadeIn';

const ConsumerLoanPage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'avantages', title: t('consumer_loan.nav.avantages') },
    { id: 'definition', title: t('consumer_loan.nav.definition') },
    { id: 'projets', title: t('consumer_loan.nav.projets') },
    { id: 'eligibilite', title: t('consumer_loan.nav.eligibilite') },
    { id: 'resume', title: t('consumer_loan.nav.resume') }
  ];

  const getSafeArray = (key: string) => {
    const res = t(key, { returnObjects: true });
    return Array.isArray(res) ? res : [];
  };

  const advantages = [
    { title: t('consumer_loan.advantages.online.title'), description: t('consumer_loan.advantages.online.desc'), icon: Smartphone },
    { title: t('consumer_loan.advantages.express.title'), description: t('consumer_loan.advantages.express.desc'), icon: Zap },
    { title: t('consumer_loan.advantages.secure.title'), description: t('consumer_loan.advantages.secure.desc'), icon: ShieldCheck }
  ];

  const eligibilityItems = getSafeArray('consumer_loan.content.eligibility.items').map((item: any, i: number) => ({
    title: item.t, description: item.d, number: `0${i+1}`
  }));

  const projectsList = getSafeArray('consumer_loan.content.projects_list') as string[];

  return (
    <LoanPageLayout 
      hero={{
        title: t('consumer_loan.hero.title'),
        highlight: t('consumer_loan.hero.highlight'),
        desc: t('consumer_loan.hero.desc'),
        cta: t('consumer_loan.hero.cta'),
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=2000",
        offerId: 'conso'
      }}
      navItems={navItems}
    >
      <section id="avantages" className="space-y-12 scroll-mt-32">
        <SectionHeading title={t('consumer_loan.advantages.title')} description={t('consumer_loan.advantages.subtitle')} />
        <FeatureGrid items={advantages} />
      </section>

      <FadeIn id="definition" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shadow-sm"><Info size={28} /></div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('consumer_loan.content.def_title')}</h2>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6 font-medium">
          <p>{t('consumer_loan.content.def_p1')}</p>
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border-l-8 border-brand-primary italic shadow-sm">"{t('consumer_loan.content.def_quote')}"</div>
        </div>
      </FadeIn>

      <section id="projets" className="space-y-10 scroll-mt-32">
        <SectionHeading title={t('consumer_loan.content.projects_title')} description={t('consumer_loan.content.projects_subtitle')} />
        <ProjectIconsGrid />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {projectsList.map((text, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <CheckCircle size={16} className="text-emerald-500 shrink-0" />
              <span className="text-xs font-black uppercase tracking-tight">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="eligibilite" className="space-y-12 scroll-mt-32">
        <SectionHeading title={t('consumer_loan.content.eligibility.title')} highlight={t('consumer_loan.content.eligibility.highlight')} />
        <FeatureGrid items={eligibilityItems} columns={2} variant="bordered" />
      </section>

      <section id="resume" className="scroll-mt-32">
        <OfferSummaryTable 
          rows={[
            { label: t('consumer_loan.content.summary.amount'), value: t('consumer_loan.content.summary.amount_val') },
            { label: t('consumer_loan.content.summary.duration'), value: t('consumer_loan.content.summary.duration_val') },
            { label: t('consumer_loan.content.summary.rate'), value: t('consumer_loan.content.summary.rate_val'), isHighlight: true }
          ]} 
        />
      </section>
    </LoanPageLayout>
  );
};

export default ConsumerLoanPage;