
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  ArrowRight, 
  Shield, 
  CheckCircle, 
  Info,
  ChevronRight,
  Car,
  Home,
  TrendingUp,
  FileText,
  PlusCircle,
  ShieldAlert as ShieldAlertIcon,
  CheckCircle2
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const InsurancePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('maintien');

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
    { id: 'maintien', title: t('insurance.nav.maintien') },
    { id: 'auto', title: t('insurance.nav.auto') },
    { id: 'habitation', title: t('insurance.nav.habitation') },
    { id: 'emprunteur', title: t('insurance.nav.emprunteur') },
    { id: 'guides', title: t('insurance.nav.guides') },
    { id: 'resume', title: t('insurance.nav.resume') }
  ];

  const getArray = (key: string) => {
    const res = t(key, { returnObjects: true });
    return Array.isArray(res) ? res : [];
  };

  const autoItems = getArray('insurance.content.auto_items');
  const borrowerList = getArray('insurance.content.borrower_list');
  const summaryItems = getArray('insurance.content.summary_items');

  return (
    <div className="relative bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <section className="relative h-[50vh] lg:h-auto lg:min-h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000" 
            alt="Insurance" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-16 lg:pt-20 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[0.95] text-slate-900 dark:text-white tracking-tighter uppercase italic">
                  {t('insurance.hero.title')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-400">{t('insurance.hero.highlight')}</span>
                </h1>
                <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                  {t('insurance.hero.desc')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <StandardButton onClick={() => scrollTo('auto')} className="mx-auto lg:mx-0 !py-4 lg:!py-5 !px-8 lg:!px-10">
                  <span>{t('landing.view_catalog')}</span>
                  <ArrowRight size={18} />
                </StandardButton>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative bg-white/80 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200 dark:border-slate-800/50 p-8 rounded-[3rem] shadow-2xl space-y-8 transform rotate-1 hover:rotate-0 transition-all duration-700 max-w-[400px] mx-auto">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t('insurance.card.title')}</h3>
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-xl">
                    <Shield size={24} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('insurance.card.adhesion_t')}</span>
                    <span className="text-xl font-black text-indigo-600 italic">{t('insurance.card.adhesion_v')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content body remains same... */}
      <div className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-24">
          
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Dossier Assurance</p>
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
            
            <section id="maintien" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={28} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('insurance.content.maintien_title')}</h2>
              </div>
              <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black uppercase italic text-indigo-400">{t('insurance.content.maintien_h3')}</h3>
                  <p className="text-lg text-slate-300 leading-relaxed font-medium">{t('insurance.content.maintien_p')}</p>
                  <div className="pt-4">
                    <StandardButton variant="white" onClick={() => navigate('/simulateur')} className="!text-indigo-600 !px-8 shadow-3xl">
                      {t('insurance.content.maintien_btn')}
                    </StandardButton>
                  </div>
                </div>
              </div>
            </section>

            <section id="auto" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                    <Car size={28} />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('insurance.content.auto_title')}</h2>
                </div>
                <p className="text-slate-500 font-medium italic">{t('insurance.content.auto_p')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {autoItems.map((item: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] space-y-4 group hover:border-indigo-500 transition-all">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                      {i === 0 ? <Shield /> : i === 1 ? <PlusCircle /> : <ShieldCheck />}
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-slate-950 dark:text-white">{item.t}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="habitation" className="space-y-12 scroll-mt-32">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center">
                    <Home size={28} />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('insurance.content.habitation_title')}</h2>
                </div>
                <p className="text-slate-500 font-medium">{t('insurance.content.habitation_p')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-indigo-600 rounded-[3rem] text-white space-y-6 shadow-xl relative overflow-hidden">
                  <h4 className="text-xl font-black uppercase italic">{t('insurance.content.habitation_tenant_t')}</h4>
                  <p className="text-sm text-indigo-100 leading-relaxed">{t('insurance.content.habitation_tenant_p')}</p>
                </div>
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-xl relative overflow-hidden border border-slate-800">
                   <h4 className="text-xl font-black uppercase italic text-rose-400">{t('insurance.content.habitation_owner_t')}</h4>
                   <p className="text-sm text-slate-400 leading-relaxed">{t('insurance.content.habitation_owner_p')}</p>
                </div>
              </div>
            </section>

            <section id="emprunteur" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4">
                <ShieldCheck size={32} className="text-indigo-600" />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('insurance.content.borrower_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6 font-medium">
                <p>{t('insurance.content.borrower_p')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                   <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-l-8 border-indigo-600 italic">
                     {t('insurance.content.borrower_box')}
                   </div>
                   <div className="space-y-4">
                      {borrowerList.map((text: string, i: number) => (
                        <div key={i} className="flex items-center space-x-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                           <span className="text-xs font-bold uppercase">{text}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </section>

            <section id="resume" className="scroll-mt-32">
              <OfferSummaryTable 
                rows={summaryItems.map((item: any) => ({ label: item.t, value: item.v }))}
              />
            </section>

            <ContactSection accentColor="text-indigo-600" />
            
            <div className="pt-10">
               <div className="bg-brand-primary p-12 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
                  <div className="space-y-6 relative z-10 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tighter italic">{t('insurance.content.cta_title')}</h2>
                    <p className="text-indigo-100 font-bold text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">{t('insurance.content.cta_desc')}</p>
                  </div>
                  <StandardButton 
                    variant="white" 
                    className="w-full lg:w-auto mx-auto lg:mx-0 !bg-slate-950 !text-white !px-12 !py-6 !text-lg shadow-3xl group"
                    onClick={() => navigate('/simulateur')}
                  >
                     <span>{t('insurance.content.cta_btn')}</span>
                     <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </StandardButton>
               </div>
            </div>

            <LegalWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
