import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Car, 
  Zap, 
  Info, 
  ArrowRight, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Shield,
  HelpCircle,
  Banknote,
  Gavel,
  History,
  CheckCircle2,
  Users,
  Building2
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const AutoLoanPage: React.FC = () => {
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
    { id: 'definition', title: t('auto_loan.nav.definition') },
    { id: 'apport', title: t('auto_loan.nav.apport') },
    { id: 'securite', title: t('auto_loan.nav.securite') },
    { id: 'pourquoi', title: t('auto_loan.nav.pourquoi') },
    { id: 'conditions', title: t('auto_loan.nav.conditions') },
    { id: 'assurance', title: t('auto_loan.nav.assurance') },
    { id: 'justificatifs', title: t('auto_loan.nav.justificatifs') },
    { id: 'resume', title: t('auto_loan.nav.resume') }
  ];

  const apportItems = t('auto_loan.content.apport_items', { returnObjects: true }) as any[];
  const securityList = t('auto_loan.content.security_list', { returnObjects: true }) as string[];
  const conditionsItems = t('auto_loan.content.conditions_items', { returnObjects: true }) as any[];
  const justifItems = t('auto_loan.content.justif_items', { returnObjects: true }) as any[];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000" 
            alt="Auto Loan" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic text-slate-950 dark:text-white">
                {t('auto_loan.hero.title')} <br />
                <span className="text-emerald-600">{t('auto_loan.hero.highlight')}</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                {t('auto_loan.hero.desc')}
              </p>
              <StandardButton variant="primary" className="!bg-emerald-600 hover:!bg-emerald-700 shadow-xl shadow-emerald-600/20" onClick={() => navigate('/simulateur', { state: { offerId: 'auto' } })}>
                <span>{t('auto_loan.hero.cta')}</span>
                <ArrowRight size={20} />
              </StandardButton>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-24">
          
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Dossier Crédit Auto</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'}`}
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
                <div className="w-12 h-12 bg-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Info size={28} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('auto_loan.content.def_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6">
                <p>{t('auto_loan.content.def_p1')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
                    <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white">{t('auto_loan.content.def_card1_title')}</h4>
                    <p className="text-sm">{t('auto_loan.content.def_card1_desc')}</p>
                  </div>
                  <div className="p-8 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-[2.5rem] border border-emerald-500/20 space-y-4">
                    <h4 className="font-black uppercase text-xs text-emerald-600">{t('auto_loan.content.def_card2_title')}</h4>
                    <p className="text-sm italic">{t('auto_loan.content.def_card2_desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="apport" className="space-y-10 scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tight">{t('auto_loan.content.apport_title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {apportItems && apportItems.map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-4">
                    <div className="text-emerald-600">
                      {i === 0 ? <TrendingDown size={24} /> : i === 1 ? <Banknote size={24} /> : <History size={24} />}
                    </div>
                    <h4 className="font-black uppercase text-xs tracking-tight">{item.t}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 italic">{t('auto_loan.content.apport_tip')}</p>
            </section>

            <section id="securite" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <ShieldCheck size={32} className="text-emerald-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('auto_loan.content.security_title')}</h2>
              </div>
              <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white space-y-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h3 className="text-xl font-black uppercase italic text-emerald-400">{t('auto_loan.content.security_h3')}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">{t('auto_loan.content.security_p')}</p>
                      <ul className="space-y-3">
                         {securityList && securityList.map((text, i) => (
                           <li key={i} className="flex items-center space-x-3 text-xs">
                              <CheckCircle2 size={16} className="text-emerald-500" />
                              <span>{text}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="p-8 bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] space-y-4">
                      <Gavel size={32} className="text-brand-primary" />
                      <h4 className="font-black uppercase text-xs">{t('auto_loan.content.security_legal_title')}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{t('auto_loan.content.security_legal_desc')}</p>
                   </div>
                </div>
              </div>
            </section>

            <section id="pourquoi" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('auto_loan.content.why_title')}</h2>
                <p className="text-slate-500 font-medium">{t('auto_loan.content.why_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <div className="flex items-start space-x-5">
                       <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                          <Zap size={24} />
                       </div>
                       <div>
                          <h4 className="font-black uppercase text-sm mb-1">{t('auto_loan.content.why_item1_t')}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{t('auto_loan.content.why_item1_d')}</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-5">
                       <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                          <Building2 size={24} />
                       </div>
                       <div>
                          <h4 className="font-black uppercase text-sm mb-1">{t('auto_loan.content.why_item2_t')}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{t('auto_loan.content.why_item2_d')}</p>
                       </div>
                    </div>
                 </div>
                 <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
                    <h4 className="text-lg font-black uppercase italic">{t('auto_loan.content.why_model_t')}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{t('auto_loan.content.why_model_d')}</p>
                    <div className="flex items-center space-x-3 pt-2">
                       <Users size={20} className="text-brand-primary" />
                       <span className="text-[10px] font-black uppercase tracking-widest">{t('auto_loan.content.why_model_stat')}</span>
                    </div>
                 </div>
              </div>
            </section>

            <section id="conditions" className="space-y-12 scroll-mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter italic">
                    {t('auto_loan.content.conditions_title')} <br />
                    <span className="text-emerald-600">{t('auto_loan.content.conditions_highlight')}</span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {conditionsItems && conditionsItems.map((item, i) => (
                   <div key={i} className="relative p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm group hover:border-emerald-500/30 transition-all">
                      <span className="absolute -top-4 -right-4 w-12 h-12 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-xs italic shadow-xl">{item.s}</span>
                      <h4 className="font-black uppercase text-xs mb-4 pr-6 leading-tight">{item.t}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.d}</p>
                   </div>
                 ))}
              </div>
            </section>

            <section id="assurance" className="space-y-12 scroll-mt-32">
               <h2 className="text-3xl font-black uppercase tracking-tight">{t('auto_loan.content.assurance_title')}</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                        <Shield size={24} className="text-emerald-600" />
                        <h4 className="font-black uppercase text-lg">{t('auto_loan.content.assurance_h4')}</h4>
                     </div>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('auto_loan.content.assurance_p')}</p>
                     <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">{t('auto_loan.content.assurance_tip_label')}</p>
                        <p className="text-xs italic">{t('auto_loan.content.assurance_tip_p')}</p>
                     </div>
                  </div>
                  <div className="p-10 bg-emerald-600 rounded-[3.5rem] text-white space-y-6 shadow-xl shadow-emerald-600/20">
                     <HelpCircle size={40} className="text-emerald-300" />
                     <h4 className="text-2xl font-black uppercase italic tracking-tighter">{t('auto_loan.content.assurance_zero_title')}</h4>
                     <p className="text-sm text-emerald-100 leading-relaxed">{t('auto_loan.content.assurance_zero_p')}</p>
                  </div>
               </div>
            </section>

            <section id="justificatifs" className="space-y-10 scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tight text-center">{t('auto_loan.content.justif_title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {justifItems && justifItems.map((p, i) => (
                  <div key={i} className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] text-center space-y-4 border border-slate-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 transition-all">
                    <div className="mx-auto w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                       <ShieldCheck size={28} />
                    </div>
                    <h4 className="font-black uppercase text-xs tracking-widest">{p.t}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase leading-relaxed">{p.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="resume" className="scroll-mt-32">
              <OfferSummaryTable 
                rows={[
                  { label: t('consumer_loan.content.summary.amount'), value: "1,000 to 60,000 euros" },
                  { label: t('consumer_loan.content.summary.duration'), value: "6 to 84 months" },
                  { label: t('consumer_loan.content.summary.response'), value: t('consumer_loan.content.summary.response_val'), isHighlight: true },
                  { label: t('consumer_loan.content.summary.type'), value: t('consumer_loan.content.summary.type_val') },
                  { label: t('consumer_loan.content.summary.rate'), value: "Fixed dès 2.5%", isHighlight: true }
                ]}
              />
            </section>

            <ContactSection accentColor="text-emerald-600" />

            <div className="pt-10">
               <div className="bg-emerald-600 p-12 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-xl shadow-emerald-600/20">
                  <div className="space-y-4 relative z-10 text-center lg:text-left">
                     <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">{t('auto_loan.content.cta_title')}</h2>
                     <p className="text-emerald-100 font-medium max-w-sm">{t('auto_loan.content.cta_desc')}</p>
                  </div>
                  <StandardButton 
                    variant="white" 
                    className="!text-emerald-600 !px-10 !py-5 shadow-2xl relative z-10"
                    onClick={() => navigate('/simulateur', { state: { offerId: 'auto' } })}
                  >
                     <span>{t('auto_loan.content.cta_btn')}</span>
                     <ArrowRight size={20} />
                  </StandardButton>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full"></div>
               </div>
            </div>

            <LegalWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLoanPage;