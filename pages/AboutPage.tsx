
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Heart, Globe, Users, TrendingUp, Clock } from 'lucide-react';
import InfoPageLayout from '../components/layout/InfoPageLayout';
import FadeIn from '../components/ui/FadeIn';
import StatItem from '../components/ui/StatItem';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <InfoPageLayout 
      header={{
        title: t('about_page.title'),
        highlight: t('about_page.highlight'),
        description: t('about_page.desc'),
        label: t('about_page.label'),
        Icon: Globe
      }}
    >
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <FadeIn direction="right" className="space-y-8">
          <h2 className="text-4xl font-black uppercase tracking-tight">{t('about_page.mission_title')}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic border-l-4 border-brand-primary pl-8">
            "{t('about_page.mission_desc')}"
          </p>
          <div className="grid grid-cols-1 gap-6 pt-6">
            {[
              { icon: ShieldCheck, title: t('about_page.values.transparency'), desc: "Transparence totale des conditions.", color: "text-brand-primary" },
              { icon: Zap, title: t('about_page.values.speed'), desc: "Décisions algorithmiques en temps réel.", color: "text-amber-500" },
              { icon: Heart, title: t('about_page.values.fairness'), desc: "Traitement équitable pour tous.", color: "text-rose-500" }
            ].map((val, i) => (
              <div key={i} className="flex items-start space-x-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all hover:border-brand-primary/20">
                <div className={`w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${val.color}`}>
                  <val.icon size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-slate-900 dark:text-white mb-1">{val.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn direction="left" className="relative">
          <div className="absolute -inset-4 bg-brand-primary/10 blur-[100px] rounded-full"></div>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" alt="Team" className="relative rounded-[4rem] shadow-3xl border-4 border-white dark:border-slate-800 z-10" />
        </FadeIn>
      </section>

      <FadeIn className="bg-slate-950 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[120px] rounded-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <StatItem label="Clients en Europe" value="1M+" colorClass="text-brand-primary" size="lg" />
          <StatItem label="Pays d'activité" value="9" colorClass="text-brand-primary" size="lg" />
          <StatItem label="Disponibilité Digitale" value="24/7" colorClass="text-brand-primary" size="lg" />
        </div>
      </FadeIn>
    </InfoPageLayout>
  );
};

export default AboutPage;
