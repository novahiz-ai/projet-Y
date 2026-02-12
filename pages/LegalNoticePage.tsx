
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, Building2, Scale, Lock, MapPin, Globe, Gavel, Mail, FileText, UserCheck 
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { getNoticeContent } from '../data/legal/noticeContent';
import FadeIn from '../components/ui/FadeIn';

const LegalNoticePage: React.FC = () => {
  const { t } = useTranslation();
  const content = useMemo(() => getNoticeContent(t), [t]);

  const sections = [
    { id: 'editeur', title: t('legal_page.sections.editeur'), icon: <Building2 size={18} /> },
    { id: 'agrement', title: t('legal_page.sections.agrement'), icon: <ShieldCheck size={18} /> },
    { id: 'donnees', title: t('legal_page.sections.donnees'), icon: <UserCheck size={18} /> },
    { id: 'mediation', title: t('legal_page.sections.mediation'), icon: <Scale size={18} /> }
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
        title={t('legal_page.title')}
        highlight={t('legal_page.highlight')}
        description={t('legal_page.desc')}
        Icon={Gavel}
        label={t('legal_page.label')}
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"
        breadcrumb={[{ label: t('footer.legal') }]}
      />

      <div className="max-w-7xl mx-auto px-6 mt-20 lg:flex lg:gap-24">
        <aside className="hidden lg:block lg:w-1/4">
          <div className="sticky top-32 space-y-2 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Navigation</p>
            {sections.map((s) => (
              <button
                key={s.id} onClick={() => scrollTo(s.id)}
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
          <FadeIn id="editeur" className="space-y-8 scroll-mt-32">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center"><Building2 size={24} /></div>
              <h2 className="text-3xl font-black uppercase tracking-tight">{content.editor.title}</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p className="text-lg">{content.editor.p1}</p>
              <div className="mt-6 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{content.editor.identity}</h4>
                  <ul className="list-none p-0 space-y-1 text-sm font-bold">
                    <li><strong className="text-slate-900 dark:text-white">Younited SA</strong></li>
                    <li>RCS Paris : 517 586 376</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{content.editor.contact}</h4>
                  <ul className="list-none p-0 space-y-1 text-sm font-bold">
                    <li><MapPin size={12} className="inline mr-2" /> {content.editor.address}</li>
                    <li><Mail size={12} className="inline mr-2" /> Younitedcreditfr@outlook.fr</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn id="agrement" className="space-y-8 scroll-mt-32">
             <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center"><ShieldCheck size={24} /></div>
               <h2 className="text-3xl font-black uppercase tracking-tight">{content.licensing.title}</h2>
             </div>
             <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">{content.licensing.p1}</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.licensing.items.map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-black text-brand-primary mb-2 uppercase text-xs">{item.t}</h4>
                    <p className="text-sm font-medium text-slate-500">{item.d}</p>
                  </div>
                ))}
             </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
