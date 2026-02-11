import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Heart, Globe, Users, TrendingUp } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.9] italic">
            {t('about_page.title')} <br />
            <span className="text-brand-primary italic">{t('about_page.highlight')}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {t('about_page.desc')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black uppercase tracking-tight">{t('about_page.mission_title')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic border-l-4 border-brand-primary pl-8">
              "{t('about_page.mission_desc')}"
            </p>
            <div className="grid grid-cols-1 gap-6 pt-6">
              {[
                { icon: <ShieldCheck className="text-brand-primary" />, title: t('about_page.values.transparency'), desc: "Toutes nos conditions sont lisibles et sans astérisques cachés." },
                { icon: <Zap className="text-amber-500" />, title: t('about_page.values.speed'), desc: "Des décisions en temps réel grâce à nos algorithmes propriétaires." },
                { icon: <Heart className="text-rose-500" />, title: t('about_page.values.fairness'), desc: "Un traitement équitable pour chaque profil d'emprunteur." }
              ].map((val, i) => (
                <div key={i} className="flex items-start space-x-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">{val.icon}</div>
                  <div><h4 className="font-black uppercase tracking-tight text-slate-900 dark:text-white mb-1">{val.title}</h4><p className="text-xs text-slate-500">{val.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 bg-brand-primary/10 blur-[100px] rounded-full"></div>
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Team" className="relative rounded-[4rem] shadow-3xl border-4 border-white dark:border-slate-800 z-10" />
          </div>
        </section>

        <section className="bg-slate-950 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[120px] rounded-full"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2"><p className="text-5xl font-black text-brand-primary italic">1M+</p><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clients en Europe</p></div>
              <div className="space-y-2"><p className="text-5xl font-black text-brand-primary italic">9</p><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pays d'activité</p></div>
              <div className="space-y-2"><p className="text-5xl font-black text-brand-primary italic">24/7</p><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Disponibilité Digitale</p></div>
           </div>
        </section>

        <ContactSection accentColor="text-brand-primary" />
        <LegalWarning />
      </div>
    </div>
  );
};

export default AboutPage;