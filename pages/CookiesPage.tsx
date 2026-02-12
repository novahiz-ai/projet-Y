import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Cookie, 
  Settings, 
  ShieldCheck, 
  BarChart3, 
  Target, 
  Info, 
  ChevronRight, 
  ExternalLink, 
  Clock,
  Lock,
  MousePointer2,
  AlertCircle
} from 'lucide-react';
import StandardButton from '../components/StandardButton';

const CookiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { id: 'definition', title: t('cookies_page.sections.definition'), icon: <Info size={18} /> },
    { id: 'types', title: t('cookies_page.sections.types'), icon: <Cookie size={18} /> },
    { id: 'gestion', title: t('cookies_page.sections.gestion'), icon: <Settings size={18} /> },
    { id: 'conservation', title: t('cookies_page.sections.conservation'), icon: <Clock size={18} /> },
    { id: 'tiers', title: t('cookies_page.sections.tiers'), icon: <ExternalLink size={18} /> }
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

  const typesItems = t('cookies_page.types_items', { returnObjects: true }) as any[];
  const retentionRows = t('cookies_page.retention_rows', { returnObjects: true }) as any[];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      <div className="relative overflow-hidden h-[50vh] lg:h-auto pt-32 pb-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500 flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Cookies background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-slate-50/80 to-transparent dark:from-slate-900/90 dark:via-slate-900/80 dark:to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[100px] rounded-full translate-x-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10">
            <button onClick={() => navigate('/')} className="hover:text-brand-primary transition-colors">{t('nav.home')}</button>
            <ChevronRight size={12} />
            <span className="text-slate-900 dark:text-white">{t('footer.cookies')}</span>
          </nav>
          
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-tight">
              {t('cookies_page.title')} <br />
              <span className="text-brand-primary italic">{t('cookies_page.highlight')}</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              {t('cookies_page.desc')}
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
          <section id="definition" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('cookies_page.def_title')}</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
              <p>{t('cookies_page.def_p1')}</p>
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-l-8 border-brand-primary italic shadow-sm transition-colors duration-500">
                "{t('cookies_page.def_quote')}"
              </div>
            </div>
          </section>

          <section id="types" className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('cookies_page.types_title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {typesItems.map((card, i) => (
                <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center gap-8 group">
                  <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    {i === 0 ? <Lock className="text-indigo-600" /> : i === 1 ? <BarChart3 className="text-emerald-600" /> : <Target className="text-rose-600" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight">{card.t}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{card.d}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm text-slate-400">
                      {card.s}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="gestion" className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Settings size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('cookies_page.manage_title')}</h2>
            </div>
            
            <div className="bg-slate-950 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <div className="space-y-4 text-center md:text-left relative z-10">
                  <h3 className="text-2xl font-black uppercase">{t('cookies_page.manage_h3')}</h3>
                  <p className="text-slate-400 font-medium max-w-md">
                    {t('cookies_page.manage_p')}
                  </p>
               </div>
               <div className="relative z-10">
                  <StandardButton 
                    onClick={() => console.log('Ouvrir centre de cookies')}
                    className="!bg-white !text-slate-950 hover:!opacity-90"
                  >
                    <span>{t('cookies_page.manage_btn')}</span>
                    <MousePointer2 size={18} />
                  </StandardButton>
               </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-500 text-sm italic font-medium">
               <p>{t('cookies_page.manage_note')}</p>
            </div>
          </section>

          <section id="conservation" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                <Clock size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{t('cookies_page.retention_title')}</h2>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-8 py-4 font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-widest">{t('cookies_page.retention_th1')}</th>
                    <th className="px-8 py-4 font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-widest">{t('cookies_page.retention_th2')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {retentionRows.map((row, i) => (
                    <tr key={i}>
                      <td className="px-8 py-4 text-sm font-bold">{row.t}</td>
                      <td className="px-8 py-4 text-sm text-slate-500">{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
             <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="text-brand-primary" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Info</span>
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               {t('cookies_page.footer_info')}
             </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;