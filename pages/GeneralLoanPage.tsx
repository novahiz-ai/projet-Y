
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Building2, Users, CheckCircle2, XCircle } from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ExpertCtaBanner from '../components/ui/ExpertCtaBanner';
import FadeIn from '../components/ui/FadeIn';
import SectionHeading from '../components/ui/SectionHeading';

const GeneralLoanPage: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'definition', title: t('mortgage.nav.definition') },
    { id: 'eligibilite', title: t('mortgage.nav.eligibilite') },
    { id: 'justificatifs', title: t('mortgage.nav.justificatifs') },
    { id: 'resume', title: t('mortgage.nav.resume') }
  ];

  const eligibilityItems = t('mortgage.content.eligibility_items', { returnObjects: true }) as any[];
  const justifRows = t('mortgage.content.justif_rows', { returnObjects: true }) as any[];
  const summaryRows = t('mortgage.content.summary_rows', { returnObjects: true }) as any[];

  return (
    <LoanPageLayout 
      hero={{
        title: t('mortgage.hero.title'),
        highlight: t('mortgage.hero.highlight'),
        desc: t('mortgage.hero.desc'),
        cta: t('landing.view_catalog'),
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000",
        offerId: 'immo'
      }}
      navItems={navItems}
      accentColorClass="text-rose-600"
      accentHex="#e11d48"
    >
      <FadeIn id="definition" className="space-y-10 scroll-mt-32">
        <SectionHeading 
          title={t('mortgage.content.def_title')} 
          badgeIcon={Info} 
          badge="Concept Immo"
        />
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg grid grid-cols-1 md:grid-cols-2 gap-10 font-medium">
          <p>{t('mortgage.content.def_p1')}</p>
          <div className="p-8 bg-rose-600 rounded-[2.5rem] text-white">
            <h4 className="font-black uppercase text-xs mb-4 opacity-80">{t('mortgage.content.def_card2_t')}</h4>
            <p className="text-sm">{t('mortgage.content.def_card2_p')}</p>
          </div>
        </div>
      </FadeIn>

      <section id="eligibilite" className="space-y-12 scroll-mt-32">
        <SectionHeading 
          title={t('mortgage.content.eligibility_title')} 
          description={t('mortgage.content.eligibility_subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eligibilityItems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-rose-500/30 rounded-[2.5rem] transition-all group h-full">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-rose-600 font-black mb-4 shadow-sm group-hover:scale-110 transition-transform">0{i+1}</div>
                <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white mb-2">{item.t}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn id="justificatifs" className="scroll-mt-32 space-y-10">
        <SectionHeading title={t('mortgage.content.justif_title')} description={t('mortgage.content.justif_subtitle')} />
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('mortgage.content.justif_table_th1')}</th>
                <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('mortgage.content.justif_table_th2')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold text-slate-500">
              {justifRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-8 py-5 text-slate-900 dark:text-white">{row.t}</td>
                  <td className="px-8 py-5">{row.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      <FadeIn id="resume" className="scroll-mt-32">
        <OfferSummaryTable rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v }))} />
        <ExpertCtaBanner 
          title={t('mortgage.content.cta_h2')}
          description={t('mortgage.content.cta_p')}
          buttonText={t('mortgage.content.cta_btn')}
          variant="rose"
          onClick={() => window.dispatchEvent(new CustomEvent('openSimulator', { detail: { offerId: 'immo' } }))}
        />
      </FadeIn>
    </LoanPageLayout>
  );
};

export default GeneralLoanPage;
