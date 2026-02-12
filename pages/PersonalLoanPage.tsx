
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight,
  Info,
  Zap,
  Gem,
  ShieldCheck,
  Smartphone,
  Lock,
  MousePointer2,
  ChevronRight,
  Target
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import EligibilityPillars from '../components/EligibilityPillars';
import ProjectIconsGrid from '../components/ProjectIconsGrid';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';
import OfferSummaryTable from '../components/OfferSummaryTable';

const PersonalLoanPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'definition', title: t('personal_loan.nav.definition') },
    { id: 'projets', title: t('personal_loan.nav.projets') },
    { id: 'processus', title: t('personal_loan.nav.processus') },
    { id: 'eligibilite', title: t('personal_loan.nav.eligibilite') },
    { id: 'resume', title: t('personal_loan.nav.resume') }
  ];

  return (
    <div className="relative bg-white dark:bg-slate-950 transition-colors duration-500">
      
      <section className="relative h-[50vh] lg:h-auto lg:min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000" 
            alt="Lifestyle" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20 scale-105 animate-[subtle-zoom_25s_infinite_alternate]"
          />
          {/* Enhanced Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white dark:from-slate-950/40 dark:via-slate-950/80 dark:to-slate-950"></div>
          
          {/* Animated Glow in Dark Mode */}
          <div className="hidden dark:block absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full animate-glow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-12 lg:pt-20 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] text-slate-900 dark:text-white tracking-tighter uppercase italic">
                  {t('personal_loan.hero.title')} <br />
                  <span className="text-vibrant">
                    {t('personal_loan.hero.highlight')}
                  </span>
                </h1>
                <p className="text-sm md:text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                  {t('personal_loan.hero.desc')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <StandardButton 
                  onClick={() => navigate('/simulateur', { state: { offerId: 'perso' } })} 
                  className="!py-4 lg:!py-5 !px-8 lg:!px-10 shadow-brand"
                >
                  <span>{t('personal_loan.hero.cta')}</span>
                  <ArrowRight size={18} />
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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center space-x-3 w-full text-left p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 font-bold transition-all text-slate-600 dark:text-slate-400 hover:text-indigo-600 group"
                >
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs uppercase tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="lg:w-3/4 space-y-32">
            <section id="definition" className="space-y-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
                  <Info size={32} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('personal_loan.content.def_title')}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
                {t('personal_loan.content.def_p1')}
              </p>
            </section>

            <section id="projets" className="space-y-10">
              <h2 className="text-3xl font-black uppercase tracking-tight">{t('personal_loan.content.projects_title')}</h2>
              <ProjectIconsGrid />
            </section>

            <EligibilityPillars />

            <section id="resume">
              <OfferSummaryTable 
                title={t('personal_loan.content.summary.title')}
                rows={[
                  { label: t('personal_loan.content.summary.amount'), value: "1 000 — 60 000 €" },
                  { label: t('personal_loan.content.summary.duration'), value: "6 — 84 " + t('simulator.months') },
                  { label: t('personal_loan.content.summary.rate'), value: t('personal_loan.content.rate_val'), isHighlight: true }
                ]}
              />
            </section>

            <ContactSection accentColor="text-indigo-600" />
            <LegalWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanPage;
