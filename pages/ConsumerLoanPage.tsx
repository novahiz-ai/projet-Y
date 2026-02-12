
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  ShoppingBag, 
  Zap, 
  ShieldCheck,
  Info,
  UserCheck,
  CheckCircle,
  Smartphone,
  ChevronRight,
  Lightbulb,
  Building2,
  Star,
  AlertTriangle
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import ProjectIconsGrid from '../components/ProjectIconsGrid';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const ConsumerLoanPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('avantages');

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
    { id: 'avantages', title: t('consumer_loan.nav.avantages') },
    { id: 'definition', title: t('consumer_loan.nav.definition') },
    { id: 'projets', title: t('consumer_loan.nav.projets') },
    { id: 'eligibilite', title: t('consumer_loan.nav.eligibilite') },
    { id: 'types', title: t('consumer_loan.nav.types') },
    { id: 'modele', title: t('consumer_loan.nav.modele') },
    { id: 'resume', title: t('consumer_loan.nav.resume') }
  ];

  const rawProjects = t('consumer_loan.content.projects_list', { returnObjects: true });
  const projectsList = Array.isArray(rawProjects) ? rawProjects : [];

  const rawEligibilityItems = t('consumer_loan.content.eligibility.items', { returnObjects: true });
  const eligibilityItems = Array.isArray(rawEligibilityItems) ? rawEligibilityItems : [];

  const rawVirtuousList = t('consumer_loan.content.model.virtuous_list', { returnObjects: true });
  const virtuousList = Array.isArray(rawVirtuousList) ? rawVirtuousList : [];

  return (
    <div className="relative bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-auto lg:min-h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=2000" 
            alt="Crédit Conso" 
            className="w-full h-full object-cover opacity-20 dark:opacity-15 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-16 lg:pt-20 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 lg:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase italic text-slate-950 dark:text-white">
                {t('consumer_loan.hero.title')} <br />
                <span className="text-vibrant">{t('consumer_loan.hero.highlight')}</span>
              </h1>
              <p className="text-sm md:text-lg text-slate-500 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('consumer_loan.hero.desc')}
              </p>
              <div className="pt-2">
                <StandardButton onClick={() => navigate('/simulateur', { state: { offerId: 'conso' } })} className="mx-auto lg:mx-0 !py-4 lg:!py-5 !px-8 lg:!px-10 shadow-brand">
                  <span>{t('consumer_loan.hero.cta')}</span>
                  <ArrowRight size={18} />
                </StandardButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* REST OF FILE INTACT */}
      <div className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-24">
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">{t('consumer_loan.nav.sidebar_label')}</p>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary'}`}>
                  <ChevronRight size={14} className={`${activeNav === item.id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
                  <span className="text-[11px] uppercase tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="lg:w-3/4 space-y-32">
            <section id="avantages" className="space-y-12 scroll-mt-32">
              <div className="space-y-4"><h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('consumer_loan.advantages.title')}</h2><p className="text-slate-500 font-medium">{t('consumer_loan.advantages.subtitle')}</p></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[{ icon: <Smartphone />, title: t('consumer_loan.advantages.online.title'), desc: t('consumer_loan.advantages.online.desc') },{ icon: <Zap />, title: t('consumer_loan.advantages.express.title'), desc: t('consumer_loan.advantages.express.desc') },{ icon: <ShieldCheck />, title: t('consumer_loan.advantages.secure.title'), desc: t('consumer_loan.advantages.secure.desc') }].map((item, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[3rem] space-y-6 border border-transparent hover:border-brand-primary/30 transition-all group">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 text-brand-primary rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">{React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}</div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
            <section id="definition" className="space-y-10 scroll-mt-32">
              <div className="flex items-center space-x-4"><Info size={32} className="text-brand-primary" /><h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('consumer_loan.content.def_title')}</h2></div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-6"><p>{t('consumer_loan.content.def_p1')}</p><div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border-l-8 border-brand-primary italic shadow-sm">"{t('consumer_loan.content.def_quote')}"</div></div>
            </section>
            <section id="projets" className="space-y-10 scroll-mt-32">
              <div className="space-y-2"><h2 className="text-3xl font-black uppercase tracking-tight">{t('consumer_loan.content.projects_title')}</h2><p className="text-slate-500 font-medium">{t('consumer_loan.content.projects_subtitle')}</p></div>
              <ProjectIconsGrid /><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">{projectsList.map((text: string, i: number) => ( <div key={i} className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800"><CheckCircle size={16} className="text-emerald-500 shrink-0" /><span className="text-xs font-bold uppercase tracking-tight">{text}</span></div> ))}</div>
            </section>
            <section id="eligibilite" className="space-y-12 scroll-mt-32">
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter">{t('consumer_loan.content.eligibility.title')}<span className="text-emerald-500 italic">{t('consumer_loan.content.eligibility.highlight')}</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{eligibilityItems.map((item: any, i: number) => ( <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm flex items-start space-x-5"><div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0"><span className="text-brand-primary font-black text-xs">0{i+1}</span></div><div><h4 className="font-black uppercase tracking-tight text-slate-900 dark:text-white mb-1 text-sm">{item.t}</h4><p className="text-xs text-slate-500 leading-relaxed font-medium">{item.d}</p></div></div> ))}</div>
            </section>
            <section id="resume" className="space-y-12 scroll-mt-32"><OfferSummaryTable title={t('consumer_loan.content.summary.title')} rows={[{ label: t('consumer_loan.content.summary.amount'), value: t('consumer_loan.content.summary.amount_val') },{ label: t('consumer_loan.content.summary.duration'), value: t('consumer_loan.content.summary.duration_val') },{ label: t('consumer_loan.content.summary.response'), value: t('consumer_loan.content.summary.response_val'), isHighlight: true },{ label: t('consumer_loan.content.summary.type'), value: t('consumer_loan.content.summary.type_val') },{ label: t('consumer_loan.content.summary.rate'), value: t('consumer_loan.content.summary.rate_val'), isHighlight: true }]} /><div className="flex items-center space-x-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic"><ShieldCheck size={14} /><span>{t('consumer_loan.content.summary.funds_notice')}</span></div></section>
            <ContactSection accentColor="text-brand-primary" />
            <LegalWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerLoanPage;
