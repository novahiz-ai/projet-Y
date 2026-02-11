import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Clock, 
  Shield, 
  TrendingUp, 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  MapPin,
  IdCard,
  Building2,
  Scale,
  Banknote,
  Layers,
  MousePointer2
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const FastLoanPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('pourquoi');

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
    { id: 'pourquoi', title: t('fast_loan.nav.pourquoi') },
    { id: 'criteres', title: t('fast_loan.nav.criteres') },
    { id: 'garanties', title: t('fast_loan.nav.garanties') },
    { id: 'simulation', title: t('fast_loan.nav.simulation') },
    { id: 'justificatifs', title: t('fast_loan.nav.justificatifs') },
    { id: 'rachat', title: t('fast_loan.nav.rachat') },
    { id: 'resume', title: t('fast_loan.nav.resume') }
  ];

  const rawCriteria = t('fast_loan.content.criteria_items', { returnObjects: true });
  const criteriaItems = Array.isArray(rawCriteria) ? rawCriteria : [];

  const rawGuarantees = t('fast_loan.content.guarantee_list', { returnObjects: true });
  const guaranteeList = Array.isArray(rawGuarantees) ? rawGuarantees : [];

  const rawSimSteps = t('fast_loan.content.simulation_list', { returnObjects: true });
  const simulationList = Array.isArray(rawSimSteps) ? rawSimSteps : [];

  const rawJustifs = t('fast_loan.content.justif_items', { returnObjects: true });
  const justifItems = Array.isArray(rawJustifs) ? rawJustifs : [];

  const rawSummary = t('fast_loan.content.summary_rows', { returnObjects: true });
  const summaryRows = Array.isArray(rawSummary) ? rawSummary : [];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 transition-colors duration-500"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#fbbf2433,transparent_60%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-slate-900 dark:text-white transition-colors duration-500">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter uppercase italic">
                {t('fast_loan.hero.title')} <br />
                <span className="text-yellow-600 dark:text-yellow-500">{t('fast_loan.hero.highlight')}</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                {t('fast_loan.hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <Link to="/simulateur" state={{ offerId: 'rapide' }} className="group bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-4 rounded-[2rem] font-black text-base text-center transition-all transform hover:scale-105 shadow-xl shadow-yellow-500/20 flex items-center justify-center space-x-3">
                  <span>{t('fast_loan.hero.cta')}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center space-x-4 px-6 py-4 border border-slate-200 dark:border-slate-800 rounded-[2rem] backdrop-blur-md">
                   <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping"></div>
                   <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-white">{t('fast_loan.hero.open_banking')}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-yellow-500/10 blur-[100px] rounded-full translate-x-1/2"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200 dark:border-slate-800/50 p-8 rounded-[3rem] shadow-2xl space-y-8 transform rotate-1 hover:rotate-0 transition-transform duration-700 max-w-[400px] mx-auto">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t('fast_loan.card.title')}</h3>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-yellow-600 dark:text-yellow-500">
                    <Clock size={24} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-0.5">
                      <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest">{t('fast_loan.card.processing')}</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">Flash Processing</p>
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest">{t('fast_loan.card.response')}</p>
                      <p className="text-lg font-black text-yellow-600 dark:text-yellow-500">{t('fast_loan.card.immediate')}</p>
                   </div>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <ShieldCheck size={14} />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('fast_loan.card.trust')}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-24">
          
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Dossier Crédit Rapide</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 text-yellow-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-yellow-600'}`}
                >
                  <ChevronRight size={14} className={`${activeNav === item.id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
                  <span className="text-[11px] uppercase tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="lg:w-3/4 space-y-32">
            
            <section id="pourquoi" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-600/10 text-yellow-600 rounded-2xl flex items-center justify-center">
                  <AlertCircle size={28} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('fast_loan.content.why_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6">
                <p>{t('fast_loan.content.why_p1')}</p>
                <div className="bg-yellow-500/5 p-8 rounded-[3rem] border border-yellow-500/20 space-y-4">
                  <h4 className="font-black uppercase text-xs text-yellow-600">{t('fast_loan.content.why_box_t')}</h4>
                  <p className="text-sm">{t('fast_loan.content.why_box_p')}</p>
                </div>
              </div>
            </section>

            <section id="criteres" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('fast_loan.content.criteria_title')}</h2>
                <p className="text-slate-500 font-medium">{t('fast_loan.content.criteria_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {criteriaItems.map((item: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-start space-x-5">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm text-yellow-600 font-black">0{i+1}</div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-slate-900 dark:text-white mb-1 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="garanties" className="space-y-12 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <Shield size={32} className="text-yellow-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('fast_loan.content.guarantee_title')}</h2>
              </div>
              <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white space-y-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase italic text-yellow-500">{t('fast_loan.content.guarantee_h3')}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{t('fast_loan.content.guarantee_p')}</p>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                      {guaranteeList.map((item: any, i: number) => (
                        <div key={i} className="p-6 bg-white/5 rounded-2xl flex items-center space-x-4 border border-slate-800/30">
                          <CheckCircle2 size={24} className="text-emerald-500" />
                          <span className="text-xs font-bold uppercase">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </section>

            <section id="simulation" className="space-y-12 scroll-mt-32">
               <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('fast_loan.content.simulation_title')}</h2>
                <p className="text-slate-500 font-medium">{t('fast_loan.content.simulation_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
                    <Smartphone size={40} className="text-yellow-600" />
                    <h4 className="text-lg font-black uppercase italic">{t('fast_loan.content.simulation_box_t')}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{t('fast_loan.content.simulation_box_p')}</p>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-4">
                       {simulationList.map((text: any, i: number) => (
                         <div key={i} className="flex items-center space-x-4 text-sm font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                            <span>{text}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </section>

            <section id="justificatifs" className="space-y-12 scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tight text-center">{t('fast_loan.content.justif_title')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {justifItems.map((item: any, i: number) => (
                  <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] text-center space-y-3 border border-slate-100 dark:border-slate-800">
                    <div className="mx-auto w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-yellow-600 shadow-sm">
                      {i === 0 ? <IdCard size={20} /> : i === 1 ? <MapPin size={20} /> : i === 2 ? <Banknote size={20} /> : <FileText size={20} />}
                    </div>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-tight">{item.t}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="rachat" className="space-y-12 scroll-mt-32">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter">
                    {t('fast_loan.content.refinancing_title')} 
                    <span className="text-indigo-600 italic">{t('fast_loan.content.refinancing_highlight')}</span>
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-white dark:bg-slate-900 border-2 border-indigo-500/10 rounded-[3.5rem] space-y-6 shadow-sm">
                   <h4 className="text-lg font-black uppercase italic leading-none">{t('fast_loan.content.refinancing_card1_t')}</h4>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('fast_loan.content.refinancing_card1_p')}</p>
                </div>
                <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white space-y-6">
                   <h4 className="text-lg font-black uppercase italic leading-none text-indigo-400">{t('fast_loan.content.refinancing_card2_t')}</h4>
                   <p className="text-sm text-slate-400 leading-relaxed">{t('fast_loan.content.refinancing_card2_p')}</p>
                   <StandardButton variant="outline" className="w-full !border-indigo-500 !text-indigo-400 hover:!bg-indigo-500/10" onClick={() => navigate('/offres/rachat')}>
                      {t('fast_loan.content.refinancing_btn')}
                   </StandardButton>
                </div>
              </div>
            </section>

            <section id="resume" className="scroll-mt-32">
              <OfferSummaryTable 
                rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v, isHighlight: r.h }))}
              />
            </section>

            <ContactSection accentColor="text-yellow-600" />
            
            <div className="pt-10">
               <div className="bg-yellow-500 p-12 rounded-[4rem] text-slate-950 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
                  <div className="space-y-6 relative z-10 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-black leading-[0.9] uppercase tracking-tighter">{t('fast_loan.content.cta_title')}</h2>
                    <p className="text-slate-800 font-bold text-lg max-w-sm leading-relaxed">{t('fast_loan.content.cta_desc')}</p>
                  </div>
                  <StandardButton 
                    variant="white" 
                    className="w-full lg:w-auto !bg-slate-950 !text-white !px-12 !py-6 shadow-3xl group"
                    onClick={() => navigate('/simulateur', { state: { offerId: 'rapide' } })}
                  >
                     <span>{t('fast_loan.content.cta_btn')}</span>
                     <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </StandardButton>
               </div>
            </div>

            <LegalWarning />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FastLoanPage;