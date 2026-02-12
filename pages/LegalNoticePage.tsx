
import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Scale, 
  Lock, 
  AlertCircle,
  ChevronRight,
  Info,
  MapPin,
  Globe,
  Gavel,
  Mail,
  CheckCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LegalNoticePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { id: 'editeur', title: t('legal_page.sections.editeur'), icon: <Building2 size={18} /> },
    { id: 'agrement', title: t('legal_page.sections.agrement'), icon: <ShieldCheck size={18} /> },
    { id: 'hebergement', title: t('legal_page.sections.hebergement'), icon: <FileText size={18} /> },
    { id: 'donnees', title: t('legal_page.sections.donnees'), icon: <UserCheck size={18} /> },
    { id: 'mediation', title: t('legal_page.sections.mediation'), icon: <Scale size={18} /> },
    { id: 'cookies', title: t('legal_page.sections.cookies'), icon: <Lock size={18} /> },
    { id: 'propriete', title: t('legal_page.sections.propriete'), icon: <Gavel size={18} /> }
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

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      <div className="relative overflow-hidden h-[50vh] lg:h-auto lg:min-h-0 pt-24 lg:pt-32 pb-10 lg:pb-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500 flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
            alt="Legal background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-slate-50/80 to-transparent dark:from-slate-900/90 dark:via-slate-900/80 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center lg:text-left">
          <nav className="flex items-center justify-center lg:justify-start space-x-2 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 lg:mb-10">
            <button onClick={() => navigate('/')} className="hover:text-brand-primary transition-colors">{t('nav.home')}</button>
            <ChevronRight size={12} />
            <span className="text-slate-900 dark:text-white">{t('footer.legal')}</span>
          </nav>
          <div className="max-w-4xl mx-auto lg:mx-0 space-y-4 lg:space-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.9]">
              {t('legal_page.title')} <span className="text-brand-primary">{t('legal_page.highlight')}</span>
            </h1>
            <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed hidden sm:block">
              {t('legal_page.desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 lg:flex lg:gap-24">
        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-32 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-6">{t('legal_page.label')}</p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="flex items-center space-x-4 w-full text-left p-5 rounded-[1.5rem] hover:bg-slate-100 dark:hover:bg-slate-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {section.icon}
                </div>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:w-3/4 space-y-24">
          <section id="editeur" className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">{t('legal_page.editor_title')}</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p className="text-lg">Le site est édité par la société LOGO, leader du crédit instantané en Europe.</p>
              <div className="mt-6 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{t('legal_page.editor_identity')}</h4>
                  <ul className="list-none p-0 space-y-1 text-sm">
                    <li><strong className="text-slate-900 dark:text-white">LOGO SA</strong></li>
                    <li>Société Anonyme à Directoire et Conseil de Surveillance</li>
                    <li>Capital social : 81 216 024 €</li>
                    <li>RCS Paris : 517 586 376</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{t('legal_page.editor_contact')}</h4>
                  <ul className="list-none p-0 space-y-1 text-sm">
                    <li><MapPin size={12} className="inline mr-2" /> {t('legal_page.editor_address')}</li>
                    <li><Globe size={12} className="inline mr-2" /> www.logo-credit.fr</li>
                    <li><Mail size={12} className="inline mr-2" /> Younitedcreditfr@outlook.fr</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
