
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
      <div className="relative overflow-hidden pt-32 pb-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000" 
            alt="Privacy background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-slate-50/80 to-transparent dark:from-slate-900/90 dark:via-slate-900/80 dark:to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[100px] rounded-full translate-x-1/2"></div>
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
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.intro_title')}</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
              <p>{t('privacy_page.intro_p1')}</p>
              <p>{t('privacy_page.intro_p2')}</p>
            </div>
          </section>

          <section id="collecte" className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Database size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.collect_title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collectItems.map((card, i) => (
                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-brand-primary/20 transition-colors">
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-3">{card.t}</h4>
                  <p className="text-sm leading-relaxed">{card.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="finalites" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Eye size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.purpose_title')}</h2>
            </div>
            <div className="space-y-4">
              {purposeItems.map((text, i) => (
                <div key={i} className="flex items-center space-x-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="securite" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.security_title')}</h2>
            </div>
            <div className="bg-indigo-600 p-10 rounded-[3rem] text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase">{t('privacy_page.security_h3')}</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    {t('privacy_page.security_p')}
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                   <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                      <Key size={32} />
                   </div>
                </div>
              </div>
            </div>
          </section>

          <section id="droits" className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <UserCheck size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.rights_title')}</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{t('privacy_page.rights_p')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {rightsItems.map((item, i) => (
                 <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight text-slate-900 dark:text-white">{item.t}</h4>
                    <p className="text-xs text-slate-500">{item.d}</p>
                 </div>
               ))}
            </div>
          </section>

          <section id="cookies" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Cookie size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.cookies_title')}</h2>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
               <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                 {t('privacy_page.cookies_p')}
               </p>
               <button className="flex items-center space-x-2 text-brand-primary font-black uppercase tracking-widest text-[10px] hover:underline">
                 <span>{t('privacy_page.cookies_btn')}</span>
                 <ExternalLink size={12} />
               </button>
            </div>
          </section>

          <section id="contact" className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('privacy_page.contact_title')}</h2>
            </div>
            <div className="bg-slate-950 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
               <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-xl font-black uppercase">{t('privacy_page.contact_h3')}</h3>
                  <p className="text-slate-400 text-sm font-medium">{t('privacy_page.contact_p')}</p>
               </div>
               <div className="flex flex-col space-y-3">
                  <a href="mailto:dpo@younited-credit.fr" className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-center">
                    {t('privacy_page.contact_btn')}
                  </a>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest text-center">{t('privacy_page.contact_notice')}</p>
               </div>
            </div>
          </section>

          <section className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
             <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="text-brand-primary" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Note</span>
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               {t('privacy_page.footer_note', { date: new Date().toLocaleDateString() })}
             </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
