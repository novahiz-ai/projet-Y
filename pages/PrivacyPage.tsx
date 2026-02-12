
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, Lock, Eye, UserCheck, FileText, Database, 
  ChevronRight, Mail, Cookie
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { getPrivacyContent } from '../data/legal/privacyContent';
import FadeIn from '../components/ui/FadeIn';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const content = useMemo(() => getPrivacyContent(t), [t]);

  const sections = [
    { id: 'introduction', title: t('privacy_page.sections.introduction'), icon: <FileText size={18} /> },
    { id: 'collecte', title: t('privacy_page.sections.collecte'), icon: <Database size={18} /> },
    { id: 'finalites', title: t('privacy_page.sections.finalites'), icon: <Eye size={18} /> },
    { id: 'securite', title: t('privacy_page.sections.securite'), icon: <Lock size={18} /> },
    { id: 'droits', title: t('privacy_page.sections.droits'), icon: <UserCheck size={18} /> },
    { id: 'cookies', title: t('privacy_page.sections.cookies'), icon: <Cookie size={18} /> },
    { id: 'contact', title: t('privacy_page.sections.contact'), icon: <Mail size={18} /> }
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      <PageHeader 
        title={t('privacy_page.title')}
        highlight={t('privacy_page.highlight')}
        description={t('privacy_page.desc')}
        Icon={ShieldCheck}
        label="Protection des données"
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000"
        breadcrumb={[{ label: t('footer.privacy') }]}
      />

      <div className="max-w-7xl mx-auto px-6 mt-20 lg:flex lg:gap-24">
        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-32 space-y-2 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Navigation</p>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex items-center space-x-4 w-full text-left p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:w-3/4 space-y-24">
          <FadeIn id="introduction" className="space-y-6 scroll-mt-32">
            <h2 className="text-3xl font-black uppercase tracking-tight">{content.intro.title}</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
              <p>{content.intro.p1}</p>
              <p>{content.intro.p2}</p>
            </div>
          </FadeIn>

          <FadeIn id="collecte" className="space-y-10 scroll-mt-32">
             <h2 className="text-3xl font-black uppercase tracking-tight">{content.collection.title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.collection.items.map((item, i) => (
                   <div key={i} className="p-8 bg-slate-50/50 dark:bg-slate-900/20 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                      <h4 className="font-black uppercase text-brand-primary text-xs mb-4">{item.t}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                   </div>
                ))}
             </div>
          </FadeIn>

          <FadeIn id="finalites" className="space-y-6 scroll-mt-32">
             <h2 className="text-3xl font-black uppercase tracking-tight">{content.purposes.title}</h2>
             <ul className="space-y-4">
                {content.purposes.items.map((item, i) => (
                   <li key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                         <ShieldCheck size={14} />
                      </div>
                      <span className="text-base font-bold text-slate-600 dark:text-slate-400">{item}</span>
                   </li>
                ))}
             </ul>
          </FadeIn>

          <FadeIn id="securite" className="space-y-6 scroll-mt-32">
             <h2 className="text-3xl font-black uppercase tracking-tight">{content.security.title}</h2>
             <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full"></div>
                <h3 className="text-2xl font-black uppercase text-brand-primary italic relative z-10">{content.security.h3}</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-lg relative z-10">{content.security.p}</p>
             </div>
          </FadeIn>

          <FadeIn id="droits" className="space-y-10 scroll-mt-32">
             <h2 className="text-3xl font-black uppercase tracking-tight">{content.rights.title}</h2>
             <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">{content.rights.p}</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.rights.items.map((item, i) => (
                   <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
                      <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white mb-4">{item.t}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                   </div>
                ))}
             </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
