
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import OfferSummaryTable from '../components/OfferSummaryTable';

const AutoLoanPage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'definition', title: t('auto_loan.nav.definition') },
    { id: 'apport', title: t('auto_loan.nav.apport') },
    { id: 'securite', title: t('auto_loan.nav.securite') },
    { id: 'resume', title: t('auto_loan.nav.resume') }
  ];

  return (
    <LoanPageLayout 
      hero={{
        title: t('auto_loan.hero.title'),
        highlight: t('auto_loan.hero.highlight'),
        desc: t('auto_loan.hero.desc'),
        cta: t('auto_loan.hero.cta'),
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000",
        offerId: 'auto'
      }}
      navItems={navItems}
      accentColorClass="text-emerald-600"
    >
      <section id="definition" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Info size={28} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('auto_loan.content.def_title')}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">{t('auto_loan.content.def_p1')}</p>
      </section>

      <section id="apport" className="space-y-10 scroll-mt-32">
        <h2 className="text-3xl font-black uppercase tracking-tight">{t('auto_loan.content.apport_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(t('auto_loan.content.apport_items', { returnObjects: true }) as any[]).map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-4">
              <h4 className="font-black uppercase text-xs text-emerald-600">{item.t}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="securite" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <ShieldCheck size={32} className="text-emerald-600" />
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('auto_loan.content.security_title')}</h2>
        </div>
        <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white space-y-10 relative overflow-hidden shadow-2xl">
           <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black uppercase italic text-emerald-400">{t('auto_loan.content.security_h3')}</h3>
              <ul className="space-y-3">
                 {(t('auto_loan.content.security_list', { returnObjects: true }) as string[]).map((text, i) => (
                   <li key={i} className="flex items-center space-x-3 text-xs"><CheckCircle2 size={16} className="text-emerald-500" /><span>{text}</span></li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      <section id="resume" className="scroll-mt-32">
        <OfferSummaryTable 
          rows={[
            { label: t('consumer_loan.content.summary.amount'), value: "1 000€ - 60 000€" },
            { label: t('consumer_loan.content.summary.duration'), value: "6 - 84 mois" },
            { label: t('consumer_loan.content.summary.rate'), value: "Fixe dès 2.5%", isHighlight: true }
          ]}
        />
      </section>
    </LoanPageLayout>
  );
};

export default AutoLoanPage;
