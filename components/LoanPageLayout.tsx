
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ArrowRight } from 'lucide-react';
import StandardButton from './StandardButton';
import ContactSection from './ContactSection';
import LegalWarning from './LegalWarning';
import FadeIn from './ui/FadeIn';

interface NavItem { id: string; title: string; }

interface LoanPageLayoutProps {
  hero: { 
    title: string; 
    highlight: string; 
    desc: string; 
    cta: string; 
    image: string; 
    offerId: string; 
  };
  navItems: NavItem[];
  children: React.ReactNode;
  accentColorClass?: string;
  accentHex?: string;
}

const LoanPageLayout: React.FC<LoanPageLayoutProps> = ({ 
  hero, navItems, children, accentColorClass = "text-brand-primary", accentHex = "#7c3aed" 
}) => {
  const { t } = useTranslation();
  const [activeNav, setActiveNav] = useState(navItems[0]?.id);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
      setActiveNav(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos && (el.offsetTop + el.offsetHeight) > scrollPos) {
          setActiveNav(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500" style={{ '--accent-color': accentHex } as React.CSSProperties}>
      <section className="relative h-[50vh] lg:h-auto lg:min-h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={hero.image} alt="" className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-16 lg:pt-20 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <FadeIn direction="right" duration={1}>
              <div className="space-y-6 lg:space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter uppercase italic text-slate-950 dark:text-white">
                  {hero.title} <br /><span className={accentColorClass}>{hero.highlight}</span>
                </h1>
                <p className="text-sm md:text-lg text-slate-500 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">{hero.desc}</p>
                <div className="pt-2">
                  <StandardButton 
                    onClick={() => window.dispatchEvent(new CustomEvent('openSimulator', { detail: { offerId: hero.offerId } }))} 
                    className={`mx-auto lg:mx-0 shadow-xl`}
                    style={{ backgroundColor: accentHex }}
                  >
                    <span>{hero.cta}</span>
                    <ArrowRight size={18} />
                  </StandardButton>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="relative z-10 space-y-32 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:gap-24">
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Dossier Expertise</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-3 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeNav === item.id ? 'bg-white dark:bg-slate-800 shadow-md ' + accentColorClass : 'text-slate-600 dark:text-slate-400 hover:' + accentColorClass}`}
                >
                  <ChevronRight size={14} className={activeNav === item.id ? 'opacity-100' : 'opacity-0'} />
                  <span className="text-[11px] uppercase tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="lg:w-3/4 space-y-32">
            {children}
            <FadeIn>
              <ContactSection accentColor={accentColorClass} />
            </FadeIn>
            <FadeIn>
              <LegalWarning />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPageLayout;
