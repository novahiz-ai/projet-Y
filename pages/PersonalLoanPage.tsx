
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import ProjectIconsGrid from '../components/ProjectIconsGrid';
import EligibilityPillars from '../components/EligibilityPillars';
import OfferSummaryTable from '../components/OfferSummaryTable';

const PersonalLoanPage: React.FC = () => {
  const { t } = useTranslation();
  const navItems = [
    { id: 'definition', title: t('personal_loan.nav.definition') },
    { id: 'projets', title: t('personal_loan.nav.projets') },
    { id: 'eligibilite', title: t('personal_loan.nav.eligibilite') },
    { id: 'resume', title: t('personal_loan.nav.resume') }
  ];

  return (
    <LoanPageLayout 
      hero={{
        title: t('personal_loan.hero.title'),
        highlight: t('personal_loan.hero.highlight'),
        desc: t('personal_loan.hero.desc'),
        cta: t('personal_loan.hero.cta'),
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000"
      }}
      navItems={navItems}
      accentColor="text-indigo-600"
    >
      <section id="definition" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm"><Info size={32} /></div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('personal_loan.content.def_title')}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">{t('personal_loan.content.def_p1')}</p>
      </section>

      <section id="projets" className="space-y-10 scroll-mt-32">
        <h2 className="text-3xl font-black uppercase tracking-tight">{t('personal_loan.content.projects_title')}</h2>
        <ProjectIconsGrid />
      </section>

      <EligibilityPillars />

      <section id="resume" className="scroll-mt-32">
        <OfferSummaryTable 
          title={t('personal_loan.content.summary.title')}
          rows={[
            { label: t('personal_loan.content.summary.amount'), value: "1 000 — 60 000 €" },
            { label: t('personal_loan.content.summary.duration'), value: "6 — 84 " + t('simulator.months') },
            { label: t('personal_loan.content.summary.rate'), value: t('personal_loan.content.rate_val'), isHighlight: true }
          ]}
        />
      </section>
    </LoanPageLayout>
  );
};

export default PersonalLoanPage;
