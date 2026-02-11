import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Layers, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  User, 
  Briefcase, 
  Info,
  CreditCard,
  AlertTriangle,
  FileText,
  PhoneCall,
  ChevronRight,
  Users,
  CheckCircle2,
  Scale,
  Shield,
  XCircle,
  History,
  Heart,
  Smartphone
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const RefinancingPage: React.FC = () => {
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
    { id: 'definition', title: t('refinancing_loan.nav.definition') },
    { id: 'eligibilite', title: t('refinancing_loan.nav.eligibilite') },
    { id: 'prets', title: t('refinancing_loan.nav.prets') },
    { id: 'assurance', title: t('refinancing_loan.nav.assurance') },
    { id: 'justificatifs', title: t('refinancing_loan.nav.justificatifs') },
    { id: 'refus', title: t('refinancing_loan.nav.refus') },
    { id: 'resume', title: t('refinancing_loan.nav.resume') }
  ];

  const rawAdv = t('refinancing_loan.content.adv_list', { returnObjects: true });
  const advList = Array.isArray(rawAdv) ? rawAdv : [];

  const rawElig = t('refinancing_loan.content.elig_list', { returnObjects: true });
  const eligList = Array.isArray(rawElig) ? rawElig : [];

  const rawIncl = t('refinancing_loan.content.loans_incl_list', { returnObjects: true });
  const inclList = Array.isArray(rawIncl) ? rawIncl : [];

  const rawIns = t('refinancing_loan.content.ins_card1_list', { returnObjects: true });
  const insList = Array.isArray(rawIns) ? rawIns : [];

  const rawJustif = t('refinancing_loan.content.justif_rows', { returnObjects: true });
  const justifRows = Array.isArray(rawJustif) ? rawJustif : [];

  const rawSummary = t('refinancing_loan.content.summary_rows', { returnObjects: true });
  const summaryRows = Array.isArray(rawSummary) ? rawSummary : [];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/5 blur-[120px] rounded-full translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-600/5 blur-[100px] rounded-full -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] text-slate-900 dark:text-white tracking-tighter uppercase italic">
                {t('refinancing_loan.hero.title')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">{t('refinancing_loan.hero.highlight')}</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                {t('refinancing_loan.hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <Link to="/simulateur" state={{ offerId: 'rachat' }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[2rem] font-black text-base text-center transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-3">
                  <span>{t('refinancing_loan.hero.cta')}</span>
                  <ArrowRight size={20} />
                </Link>
                <div className="flex items-center justify-center space-x-4 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm">
                  <div className="text-center">
                    <p className="text-xl font-black text-indigo-600">{t('refinancing_loan.hero.rate_val')}</p>
                    <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest">{t('refinancing_loan.hero.rate_label')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative max-w-[380px] mx-auto">
                <div className="relative bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-10 group">
                  <div className="flex justify-between items-center">
                    <div className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform">
                      <TrendingDown size={28} />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{t('refinancing_loan.card.saving_label')}</p>
                      <p className="text-2xl font-black text-indigo-600">{t('refinancing_loan.card.saving_val')}</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800/30">
                    <div className="flex items-center space-x-3">
                      <PhoneCall size={14} className="text-indigo-600" />
                      <span className="text-xs font-bold">+33 6 44 69 32 43</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={14} className="text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t('refinancing_loan.card.service_label')}</span>
                    </div>
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">{t('refinancing_loan.nav.resume')}</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'}`}
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
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Info size={28} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('refinancing_loan.content.def_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6 font-medium">
                <p>{t('refinancing_loan.content.def_p1')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {advList.map((adv: any, i: number) => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start space-x-4">
                      <CheckCircle2 size={20} className="text-indigo-600 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white mb-1">{adv.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{adv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="eligibilite" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('refinancing_loan.content.elig_title')}</h2>
                <p className="text-slate-500 font-medium">{t('refinancing_loan.content.elig_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eligList.map((item: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-transparent hover:border-indigo-500/30 transition-all group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      {i === 0 ? <User /> : i === 1 ? <Briefcase /> : i === 2 ? <Users /> : i === 3 ? <History /> : i === 4 ? <Scale /> : <Heart />}
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="prets" className="space-y-12 scroll-mt-32">
               <div className="flex items-center space-x-4">
                <CreditCard size={32} className="text-indigo-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('refinancing_loan.content.loans_title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <h4 className="text-lg font-black uppercase italic text-slate-900 dark:text-white">{t('refinancing_loan.content.loans_incl_t')}</h4>
                   <div className="grid grid-cols-1 gap-3">
                      {inclList.map((text: any, i: number) => (
                        <div key={i} className="flex items-center space-x-3 text-sm font-bold">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           <span>{text}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white space-y-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[60px] rounded-full"></div>
                   <div className="flex items-center space-x-3 text-rose-400">
                      <XCircle size={20} />
                      <h4 className="text-lg font-black uppercase italic">{t('refinancing_loan.content.loans_excl_t')}</h4>
                   </div>
                   <p className="text-slate-400 text-xs leading-relaxed font-medium">{t('refinancing_loan.content.loans_excl_p')}</p>
                </div>
              </div>
            </section>

            <section id="assurance" className="space-y-12 scroll-mt-32">
               <h2 className="text-3xl font-black uppercase tracking-tight">{t('refinancing_loan.content.ins_title')}</h2>
               <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium">
                  <p>{t('refinancing_loan.content.ins_p')}</p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-8 bg-white dark:bg-slate-900 border-2 border-indigo-500/10 rounded-[3rem] space-y-4">
                        <Shield size={24} className="text-indigo-600" />
                        <h4 className="font-black uppercase text-sm">{t('refinancing_loan.content.ins_card1_t')}</h4>
                        <ul className="text-xs space-y-2 list-none p-0">
                           {insList.map((text: any, i: number) => (
                             <li key={i} className="flex items-center space-x-2"><CheckCircle2 size={14} className="text-indigo-500" /> <span>{text}</span></li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </section>

            <section id="justificatifs" className="space-y-10 scroll-mt-32">
               <div className="flex items-center space-x-4">
                <FileText size={32} className="text-indigo-600" />
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('refinancing_loan.content.justif_title')}</h2>
              </div>
              <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('refinancing_loan.content.justif_th1')}</th>
                      <th className="px-8 py-5 font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">{t('refinancing_loan.content.justif_th2')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium text-slate-500">
                    {justifRows.map((row: any, i: number) => (
                      <tr key={i} className={row.h ? "bg-indigo-500/5" : ""}>
                        <td className={`px-8 py-4 font-black ${row.h ? 'text-indigo-600' : 'text-slate-900 dark:text-white'}`}>{row.t}</td>
                        <td className="px-8 py-4">{row.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="refus" className="space-y-12 scroll-mt-32">
               <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase tracking-tight">{t('refinancing_loan.content.refusal_title')}</h2>
                  <p className="text-slate-500 font-medium">{t('refinancing_loan.content.refusal_subtitle')}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-8">
                    <div className="p-8 bg-white dark:bg-slate-900 border-2 border-rose-500/20 rounded-[3rem] space-y-4">
                       <div className="flex items-center space-x-3 text-rose-600">
                          <AlertTriangle size={20} />
                          <h4 className="font-black uppercase text-sm">{t('refinancing_loan.content.refusal_endett_t')}</h4>
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed font-medium">{t('refinancing_loan.content.refusal_endett_p')}</p>
                    </div>
                  </div>
                  <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white flex flex-col justify-center space-y-6 shadow-xl relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-primary/10 blur-[80px] rounded-full"></div>
                     <h3 className="text-2xl font-black uppercase italic leading-tight">{t('refinancing_loan.content.refusal_box_t')}</h3>
                     <p className="text-slate-400 text-sm leading-relaxed">{t('refinancing_loan.content.refusal_box_p')}</p>
                     <StandardButton variant="white" onClick={() => navigate('/simulateur')} className="w-full !text-slate-950 !py-4">
                        {t('refinancing_loan.content.refusal_btn')}
                     </StandardButton>
                  </div>
               </div>
            </section>

            <section id="resume" className="scroll-mt-32">
              <OfferSummaryTable 
                rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v, isHighlight: r.h }))}
              />
            </section>

            <ContactSection accentColor="text-indigo-600" />
            
            <div className="pt-10">
               <div className="bg-indigo-600 p-12 lg:p-16 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                  <div className="space-y-6 relative z-10 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter italic">{t('refinancing_loan.content.cta_h2')}</h2>
                    <p className="text-white/80 font-bold text-lg max-w-lg leading-relaxed">{t('refinancing_loan.content.cta_p')}</p>
                  </div>
                  <StandardButton 
                    variant="white" 
                    className="w-full lg:w-auto !bg-slate-900 !text-white !px-12 !py-6 !text-lg shadow-3xl group"
                    onClick={() => navigate('/simulateur', { state: { offerId: 'rachat' } })}
                  >
                     <span>{t('refinancing_loan.content.cta_btn')}</span>
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

export default RefinancingPage;