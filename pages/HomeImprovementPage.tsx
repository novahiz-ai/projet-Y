import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  CheckCircle, 
  Zap, 
  Shield, 
  Info, 
  ArrowRight, 
  Paintbrush, 
  Hammer, 
  Sun, 
  Wind, 
  Droplets,
  HardHat,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Clock,
  Briefcase,
  PhoneCall,
  Mail,
  ChevronRight,
  AlertTriangle,
  HelpCircle,
  Calculator,
  LayoutGrid,
  Leaf,
  Users,
  Building2,
  CheckCircle2
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const HomeImprovementPage: React.FC = () => {
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
    { id: 'definition', title: t('travaux.nav.definition') },
    { id: 'projets', title: t('travaux.nav.projets') },
    { id: 'avantages', title: t('travaux.nav.avantages') },
    { id: 'aides', title: t('travaux.nav.aides') },
    { id: 'ecoptz', title: t('travaux.nav.ecoptz') },
    { id: 'maprimerenov', title: t('travaux.nav.maprimerenov') },
    { id: 'resume', title: t('travaux.nav.resume') }
  ];

  const rawProjects = t('travaux.content.projects_items', { returnObjects: true });
  const projectsItems = Array.isArray(rawProjects) ? rawProjects : [];

  const rawWhy = t('travaux.content.why_list', { returnObjects: true });
  const whyList = Array.isArray(rawWhy) ? rawWhy : [];

  const rawPtz = t('travaux.content.ptz_table_rows', { returnObjects: true });
  const ptzRows = Array.isArray(rawPtz) ? rawPtz : [];

  const rawMpr = t('travaux.content.mpr_conditions_list', { returnObjects: true });
  const mprConditions = Array.isArray(rawMpr) ? rawMpr : [];

  const rawSummary = t('travaux.content.summary_rows', { returnObjects: true });
  const summaryRows = Array.isArray(rawSummary) ? rawSummary : [];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000" 
            alt="Rénovation Habitat" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/80 transition-colors duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white dark:from-slate-900 via-transparent to-orange-500/10 transition-colors duration-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 text-slate-900 dark:text-white transition-colors duration-500">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter uppercase italic">
                {t('travaux.hero.title')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{t('travaux.hero.highlight')}</span> <br />
                {t('travaux.hero.subtitle')}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                {t('travaux.hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <StandardButton onClick={() => navigate('/simulateur', { state: { offerId: 'travaux' } })} className="!bg-orange-500 hover:!bg-orange-600 shadow-orange-500/20">
                  {t('travaux.hero.cta')}
                </StandardButton>
                <div className="flex items-center justify-center space-x-4 px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
                  <div className="text-center">
                    <p className="text-xl font-black text-orange-600 dark:text-amber-400">{t('travaux.hero.rate_val')}</p>
                    <p className="text-[8px] text-slate-500 dark:text-slate-500 uppercase font-black tracking-widest">{t('travaux.hero.rate_label')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/80 dark:bg-slate-800/20 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden group max-w-[400px] mx-auto transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-[50px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="p-3 bg-orange-500 text-white rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform">
                    <TrendingUp size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t('travaux.card.title')}</p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-[10px] font-bold uppercase">{t('travaux.card.cap_t')}</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">60 000 €</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck size={16} className="text-orange-500" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{t('travaux.card.trust')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-24">
          
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">{t('travaux.nav.sidebar_label')}</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 text-orange-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-orange-600'}`}
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
                <Info size={32} className="text-orange-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('travaux.content.def_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6 font-medium">
                <p>{t('travaux.content.def_p1')}</p>
                <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border-l-8 border-orange-500 italic shadow-sm">
                  "{t('travaux.content.def_box')}"
                </div>
              </div>
            </section>

            <section id="projets" className="space-y-12 scroll-mt-32">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('travaux.content.projects_title')}</h2>
                <p className="text-slate-500 font-medium">{t('travaux.content.projects_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsItems.map((item: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-transparent hover:border-orange-500/30 transition-all group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 text-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      {i === 0 ? <Hammer size={24}/> : i === 1 ? <LayoutGrid size={24}/> : i === 2 ? <TrendingUp size={24}/> : i === 3 ? <Paintbrush size={24}/> : <Leaf size={24}/>}
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.t}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="avantages" className="space-y-12 scroll-mt-32">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter">{t('travaux.content.why_title')}<span className="text-orange-500 italic">{t('travaux.content.why_highlight')}</span></h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white space-y-6 relative overflow-hidden group shadow-2xl">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[100px] rounded-full"></div>
                   <h3 className="text-xl font-black uppercase italic">{t('travaux.content.why_model_title')}</h3>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium">
                     {t('travaux.content.why_model_desc')}
                   </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   {whyList.map((item: any, i: number) => (
                     <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center space-x-6">
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-orange-600 font-black text-xs">0{i+1}</div>
                        <div>
                           <h4 className="font-black uppercase tracking-tight text-xs">{item.t}</h4>
                           <p className="text-[10px] text-slate-500 font-medium">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </section>

            <section id="aides" className="space-y-12 scroll-mt-32">
               <h2 className="text-3xl font-black uppercase tracking-tight">{t('travaux.content.aides_title')}</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-8 bg-white dark:bg-slate-900 border-2 border-orange-500/20 rounded-[3rem] space-y-4">
                       <div className="flex items-center space-x-3 text-orange-600">
                          <CheckCircle size={20} />
                          <h4 className="font-black uppercase text-sm">{t('travaux.content.aides_tva_title')}</h4>
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed font-medium">
                         {t('travaux.content.aides_tva_desc')}
                       </p>
                    </div>
                  </div>
                  <div className="bg-emerald-600 p-10 rounded-[3.5rem] text-white flex flex-col justify-between shadow-xl shadow-emerald-500/20 relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 blur-[80px] rounded-full"></div>
                     <div className="space-y-4 relative z-10">
                        <Leaf size={40} className="text-emerald-300" />
                        <h3 className="text-2xl font-black uppercase italic leading-none">{t('travaux.content.aides_eco_title')}</h3>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                          {t('travaux.content.aides_eco_desc')}
                        </p>
                     </div>
                     <div className="pt-6 relative z-10">
                        <StandardButton variant="white" onClick={() => scrollTo('ecoptz')} className="!text-emerald-600 !py-3 !px-6 !text-[10px] w-full">
                           {t('travaux.content.aides_eco_btn')}
                        </StandardButton>
                     </div>
                  </div>
               </div>
            </section>

            {/* Section: Eco-PTZ Table */}
            <section id="ecoptz" className="space-y-10 scroll-mt-32">
               <div className="flex items-center space-x-4">
                <HelpCircle size={32} className="text-emerald-600" />
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('travaux.content.ptz_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium">
                 <p>{t('travaux.content.ptz_desc')}</p>
                 <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50 dark:bg-slate-900">
                          <tr>
                             <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('travaux.content.ptz_table_th1')}</th>
                             <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('travaux.content.ptz_table_th2')}</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {ptzRows.map((row: any, i: number) => (
                            <tr key={i} className={row.h ? "bg-emerald-500/5" : ""}>
                              <td className={`px-8 py-4 text-sm ${row.h ? "font-black text-emerald-600" : "font-bold"}`}>{row.t}</td>
                              <td className={`px-8 py-4 font-black ${row.h ? "text-emerald-600" : ""}`}>{row.v}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <p className="mt-4 text-xs italic">{t('travaux.content.ptz_footer')}</p>
              </div>
            </section>

            {/* Section: MaPrimeRénov */}
            <section id="maprimerenov" className="space-y-12 scroll-mt-32">
               <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase tracking-tight">{t('travaux.content.mpr_title')}</h2>
                  <p className="text-slate-500 font-medium">{t('travaux.content.mpr_subtitle')}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div className="space-y-3">
                       {mprConditions.map((text: string, i: number) => (
                         <div key={i} className="flex items-center space-x-3 text-sm font-bold">
                            <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                            <span>{text}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6">
                     <h4 className="text-xl font-black uppercase italic tracking-tighter">{t('travaux.content.mpr_help_title')}</h4>
                     <p className="text-slate-400 text-xs leading-relaxed">
                       {t('travaux.content.mpr_help_desc')}
                     </p>
                     <StandardButton variant="outline" className="w-full !border-slate-800 !text-white hover:!bg-white/10" onClick={() => window.open('https://www.maprimerenov.gouv.fr/', '_blank')}>
                        {t('travaux.content.mpr_help_btn')}
                     </StandardButton>
                  </div>
               </div>
            </section>

            <section id="resume" className="scroll-mt-32">
              <OfferSummaryTable 
                title={t('travaux.content.summary_title')}
                rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v, isHighlight: r.h }))}
              />
            </section>

            <ContactSection accentColor="text-orange-600" />
            
            <div className="pt-10">
               <div className="bg-orange-500 p-12 lg:p-16 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-orange-500/20">
                  <div className="space-y-6 relative z-10 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter">{t('travaux.content.cta_h2')}</h2>
                    <p className="text-white/80 font-bold text-lg max-w-lg leading-relaxed">
                      {t('travaux.content.cta_p')}
                    </p>
                  </div>
                  <StandardButton 
                    variant="white" 
                    className="w-full lg:w-auto !bg-slate-950 !text-white !px-12 !py-6 !text-lg shadow-3xl group"
                    onClick={() => navigate('/simulateur', { state: { offerId: 'travaux' } })}
                  >
                     <span>{t('travaux.content.cta_btn')}</span>
                     <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </StandardButton>
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 blur-[80px] rounded-full"></div>
               </div>
            </div>

            <LegalWarning />
          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-mt-32 { scroll-margin-top: 128px; }
      `}} />
    </div>
  );
};

export default HomeImprovementPage;