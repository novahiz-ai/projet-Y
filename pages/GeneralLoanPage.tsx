import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Clock, 
  Info,
  ChevronRight,
  HelpCircle,
  Users,
  XCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const GeneralLoanPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('definition');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveNav(id);
    }
  };

  const navItems = [
    { id: 'definition', title: t('mortgage.nav.definition') },
    { id: 'eligibilite', title: t('mortgage.nav.eligibilite') },
    { id: 'modele', title: t('mortgage.nav.modele') },
    { id: 'justificatifs', title: t('mortgage.nav.justificatifs') },
    { id: 'refus', title: t('mortgage.nav.refus') },
    { id: 'immo', title: t('mortgage.nav.immo') },
    { id: 'resume', title: t('mortgage.nav.resume') }
  ];

  const rawEligibility = t('mortgage.content.eligibility_items', { returnObjects: true });
  const eligibilityItems = Array.isArray(rawEligibility) ? rawEligibility : [];

  const rawModel = t('mortgage.content.model_list', { returnObjects: true });
  const modelList = Array.isArray(rawModel) ? rawModel : [];

  const rawJustif = t('mortgage.content.justif_rows', { returnObjects: true });
  const justifRows = Array.isArray(rawJustif) ? rawJustif : [];

  const rawSummary = t('mortgage.content.summary_rows', { returnObjects: true });
  const summaryRows = Array.isArray(rawSummary) ? rawSummary : [];

  return (
    <div className="relative bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000" 
            alt="Mortgage Guide" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter uppercase italic text-slate-950 dark:text-white">
                {t('mortgage.hero.title')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">{t('mortgage.hero.highlight')}</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                {t('mortgage.hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <StandardButton onClick={() => scrollTo('definition')}>
                  <span>{t('landing.view_catalog')}</span>
                  <ChevronRight size={20} />
                </StandardButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-24">
          
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Mortgage Dossier</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 text-rose-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'}`}
                >
                  <ChevronRight size={14} className={`${activeNav === item.id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
                  <span className="text-[11px] uppercase tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="lg:w-3/4 space-y-32">
            
            <section id="definition" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-rose-600/10 text-rose-600 rounded-2xl flex items-center justify-center">
                  <Info size={28} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('mortgage.content.def_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6">
                <p>{t('mortgage.content.def_p1')}</p>
                <p>{t('mortgage.content.def_p2')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                    <h4 className="font-black uppercase text-xs text-rose-600 mb-4">{t('mortgage.content.def_card1_t')}</h4>
                    <p className="text-sm">{t('mortgage.content.def_card1_p')}</p>
                  </div>
                  <div className="p-8 bg-rose-600 rounded-[2.5rem] text-white">
                    <h4 className="font-black uppercase text-xs mb-4 opacity-80">{t('mortgage.content.def_card2_t')}</h4>
                    <p className="text-sm">{t('mortgage.content.def_card2_p')}</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="eligibilite" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('mortgage.content.eligibility_title')}</h2>
                <p className="text-slate-500 font-medium">{t('mortgage.content.eligibility_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eligibilityItems.map((item: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-rose-500/30 rounded-[2.5rem] transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-rose-600 font-black mb-4 shadow-sm group-hover:scale-110 transition-transform">0{i+1}</div>
                    <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white mb-2">{item.t}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="modele" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <Users size={32} className="text-rose-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('mortgage.content.model_title')}</h2>
              </div>
              <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white space-y-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-slate-800/50">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase italic text-rose-500">{t('mortgage.content.model_h3')}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{t('mortgage.content.model_p')}</p>
                   </div>
                </div>
              </div>
            </section>

            <section id="justificatifs" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('mortgage.content.justif_title')}</h2>
                <p className="text-slate-500 font-medium">{t('mortgage.content.justif_subtitle')}</p>
              </div>
              <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('mortgage.content.justif_table_th1')}</th>
                      <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('mortgage.content.justif_table_th2')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium text-slate-500">
                    {justifRows.map((row: any, i: number) => (
                      <tr key={i}>
                        <td className="px-8 py-4 font-black text-slate-900 dark:text-white">{row.t}</td>
                        <td className="px-8 py-4">{row.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="refus" className="space-y-12 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <XCircle size={32} className="text-rose-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('mortgage.content.refusal_title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="p-10 bg-slate-50 dark:bg-slate-900 border-2 border-rose-500/20 rounded-[3rem] space-y-6">
                    <h4 className="text-lg font-black uppercase italic leading-none">{t('mortgage.content.refusal_card1_t')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{t('mortgage.content.refusal_card1_p')}</p>
                 </div>
                 <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[60px] rounded-full"></div>
                    <h4 className="text-lg font-black uppercase italic text-rose-400">{t('mortgage.content.refusal_card2_t')}</h4>
                    <p className="text-xs text-slate-400">{t('mortgage.content.refusal_card2_p')}</p>
                 </div>
              </div>
            </section>

            <section id="immo" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <Building2 size={32} className="text-rose-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('mortgage.content.immo_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6">
                <p>{t('mortgage.content.immo_p')}</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
                  <h4 className="text-xl font-black uppercase italic">{t('mortgage.content.immo_card_t')}</h4>
                  <p className="text-sm">{t('mortgage.content.immo_card_p')}</p>
                </div>
              </div>
            </section>

            <section id="resume" className="scroll-mt-32">
              <OfferSummaryTable 
                rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v }))}
              />
            </section>

            <ContactSection accentColor="text-rose-600" />
            
            <div className="pt-10">
               <div className="bg-rose-600 p-12 lg:p-16 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-rose-600/20">
                  <div className="space-y-6 relative z-10 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter italic">{t('mortgage.content.cta_h2')}</h2>
                    <p className="text-white/80 font-bold text-lg max-w-lg leading-relaxed">{t('mortgage.content.cta_p')}</p>
                  </div>
                  <StandardButton 
                    variant="white" 
                    className="w-full lg:w-auto !bg-slate-950 !text-white !px-12 !py-6 !text-lg shadow-3xl group"
                    onClick={() => navigate('/simulateur')}
                  >
                     <span>{t('mortgage.content.cta_btn')}</span>
                     <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </StandardButton>
               </div>
            </div>

            <LegalWarning />
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-mt-32 { scroll-margin-top: 128px; }
      `}} />
    </div>
  );
};

export default GeneralLoanPage;