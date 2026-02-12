
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Building2, 
  Scale, 
  Lock, 
  MapPin, 
  Globe, 
  Gavel, 
  Mail, 
  FileText, 
  UserCheck 
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

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
      const offset = 140;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      <PageHeader 
        title={t('legal_page.title')}
        highlight={t('legal_page.highlight')}
        description={t('legal_page.desc')}
        label={t('legal_page.label')}
        Icon={Gavel}
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"
        breadcrumb={[{ label: t('footer.legal') }]}
      />

      <div className="max-w-7xl mx-auto px-6 mt-20 lg:flex lg:gap-24">
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
          <section id="editeur" className="space-y-8">
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
                  <ul className="list-none p-0 space-y-1 text-sm font-bold">
                    <li><strong className="text-slate-900 dark:text-white">LOGO SA</strong></li>
                    <li>Société Anonyme à Directoire</li>
                    <li>Capital : 81 216 024 €</li>
                    <li>RCS Paris : 517 586 376</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{t('legal_page.editor_contact')}</h4>
                  <ul className="list-none p-0 space-y-1 text-sm font-bold">
                    <li><MapPin size={12} className="inline mr-2" /> {t('legal_page.editor_address')}</li>
                    <li><Globe size={12} className="inline mr-2" /> www.logo.fr</li>
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
