import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  FileText, 
  Database, 
  ChevronRight, 
  Mail, 
  AlertCircle,
  Clock,
  ExternalLink,
  Cookie,
  Key
} from 'lucide-react';

const PrivacyPage: React.FC = () => {
  // Fix: Added 'const' to declare navigate
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const collectItems = t('privacy_page.collect_items', { returnObjects: true }) as any[];
  const purposeItems = t('privacy_page.purpose_items', { returnObjects: true }) as string[];
  const rightsItems = t('privacy_page.rights_items', { returnObjects: true }) as any[];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      <div className="relative overflow-hidden h-[50vh] lg:h-auto pt-32 pb-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500 flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000" 
            alt="Privacy background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-slate-50/80 to-transparent dark:from-slate-900/90 dark:via-slate-900/80 dark:to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10">
            <button onClick={() => navigate('/')} className="hover:text-brand-primary transition-colors">{t('nav.home')}</button>
            <ChevronRight size={12} />
            <span className="text-slate-900 dark:text-white">{t('footer.privacy')}</span>
          </nav>
          
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-tight">
              {t('privacy_page.title')} <br />
              <span className="text-brand-primary italic">{t('privacy_page.highlight')}</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              {t('privacy_page.desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 lg:flex lg:gap-24">
        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-32 space-y-2 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Navigation</p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="flex items-center space-x-4 w-full text-left p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {section.icon}
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:w-3/4 space-y-24">
          <section id="introduction" className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.intro_title')}</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
              <p>{t('privacy_page.intro_p1')}</p>
              <p>{t('privacy_page.intro_p2')}</p>
            </div>
          </section>

          <section id="collecte" className="space-y-10">
             <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.collect_title')}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(collectItems) && collectItems.map((item, i) => (
                   <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                      <h4 className="font-black uppercase text-brand-primary text-xs mb-4">{item.t}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                   </div>
                ))}
             </div>
          </section>

          <section id="finalites" className="space-y-6">
             <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.purpose_title')}</h2>
             <ul className="space-y-4">
                {Array.isArray(purposeItems) && purposeItems.map((item, i) => (
                   <li key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                         <ShieldCheck size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{item}</span>
                   </li>
                ))}
             </ul>
          </section>

          <section id="securite" className="space-y-6">
             <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.security_title')}</h2>
             <div className="bg-slate-950 p-10 rounded-[3rem] text-white space-y-6">
                <h3 className="text-xl font-black uppercase text-brand-primary italic">{t('privacy_page.security_h3')}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{t('privacy_page.security_p')}</p>
             </div>
          </section>

          <section id="droits" className="space-y-10">
             <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.rights_title')}</h2>
             <p className="text-slate-600 dark:text-slate-400 font-medium">{t('privacy_page.rights_p')}</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(rightsItems) && rightsItems.map((item, i) => (
                   <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
                      <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white mb-4">{item.t}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                   </div>
                ))}
             </div>
          </section>

          <section id="contact" className="space-y-6">
             <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.contact_title')}</h2>
             <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
                <h3 className="text-lg font-black uppercase">{t('privacy_page.contact_h3')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{t('privacy_page.contact_p')}</p>
                <button 
                  onClick={() => window.location.href = "mailto:dpo@younited-credit.fr"}
                  className="px-8 py-4 bg-brand-primary text-white rounded-full font-black text-xs uppercase tracking-widest shadow-brand active:scale-95 transition-all"
                >
                  {t('privacy_page.contact_btn')}
                </button>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{t('privacy_page.contact_notice')}</p>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Fix: Added default export to resolve the error in App.tsx
export default PrivacyPage;
