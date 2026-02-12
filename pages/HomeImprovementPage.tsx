
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Hammer, 
  LayoutGrid, 
  TrendingUp, 
  Paintbrush, 
  Leaf, 
  Info, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import LoanPageLayout from '../components/LoanPageLayout';
import OfferSummaryTable from '../components/OfferSummaryTable';
import StandardButton from '../components/StandardButton';
import ProjectIconsGrid from '../components/ProjectIconsGrid';
import { useNavigate } from 'react-router-dom';

const HomeImprovementPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'definition', title: t('travaux.nav.definition') },
    { id: 'projets', title: t('travaux.nav.projets') },
    { id: 'avantages', title: t('travaux.nav.avantages') },
    { id: 'ecoptz', title: t('travaux.nav.ecoptz') },
    { id: 'resume', title: t('travaux.nav.resume') }
  ];

  const projectsItems = t('travaux.content.projects_items', { returnObjects: true }) as any[];
  const ptzRows = t('travaux.content.ptz_table_rows', { returnObjects: true }) as any[];

  return (
    <LoanPageLayout 
      hero={{
        title: t('travaux.hero.title'),
        highlight: t('travaux.hero.highlight'),
        desc: t('travaux.hero.desc'),
        cta: t('travaux.hero.cta'),
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000",
        offerId: 'travaux'
      }}
      navItems={navItems}
      accentColorClass="text-orange-600"
    >
      <section id="definition" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner-soft">
             <Info size={32} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('travaux.content.def_title')}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">{t('travaux.content.def_p1')}</p>
        <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border-l-8 border-orange-500 italic shadow-sm text-xl">
          "{t('travaux.content.def_box')}"
        </div>
      </section>

      <section id="projets" className="space-y-12 scroll-mt-32">
        <h2 className="text-3xl font-black uppercase tracking-tight">{t('travaux.content.projects_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsItems.map((item: any, i: number) => (
            <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-transparent hover:border-orange-500/30 transition-all group">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 text-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {i === 0 ? <Hammer size={24}/> : i === 1 ? <LayoutGrid size={24}/> : i === 2 ? <TrendingUp size={24}/> : i === 3 ? <Paintbrush size={24}/> : <Leaf size={24}/>}
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-white">{item.t}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ecoptz" className="space-y-10 scroll-mt-32">
        <div className="flex items-center space-x-4">
          <HelpCircle size={32} className="text-emerald-600" />
          <h2 className="text-3xl font-black uppercase tracking-tight">{t('travaux.content.ptz_title')}</h2>
        </div>
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left">
             <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                   <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('travaux.content.ptz_table_th1')}</th>
                   <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('travaux.content.ptz_table_th2')}</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                {ptzRows.map((row: any, i: number) => (
                  <tr key={i} className={row.h ? "bg-emerald-500/5" : ""}>
                    <td className={`px-8 py-4 text-sm ${row.h ? "font-black text-emerald-600" : ""}`}>{row.t}</td>
                    <td className={`px-8 py-4 font-black ${row.h ? "text-emerald-600" : ""}`}>{row.v}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </section>

      <section id="resume" className="scroll-mt-32">
        <OfferSummaryTable 
          rows={[
            { label: "Montant", value: "1 000€ - 60 000€" },
            { label: "Taux", value: "Fixe dès 2.1%", isHighlight: true },
            { label: "Frais de dossier", value: "0€" }
          ]}
        />
      </section>
    </LoanPageLayout>
  );
};

export default HomeImprovementPage;
