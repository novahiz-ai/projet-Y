import React from 'react';
import { TrendingUp, HelpCircle, Zap, Phone, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PreFooterProps {
  onOpenApp?: () => void;
}

const PreFooter: React.FC<PreFooterProps> = ({ onOpenApp }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="hidden lg:block bg-slate-50/50 dark:bg-slate-950 py-24 transition-colors duration-500 border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col space-y-10">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center">
              <TrendingUp size={32} />
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider">
                {t('prefooter.smart_title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
                {t('prefooter.smart_desc')}
              </p>
            </div>
            <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                {t('prefooter.smart_label')}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col space-y-10">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
              <HelpCircle size={32} />
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider">
                {t('nav.resources_menu.help_label')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
                Une question sur votre dossier ? Accédez à notre centre d'aide complet.
              </p>
              <button 
                onClick={() => navigate('/aide')}
                className="text-emerald-500 font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 group"
              >
                <span>Accéder aux FAQ</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800">
               <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                Assistance Digitale
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-12 rounded-[3.5rem] shadow-2xl text-white flex flex-col space-y-10 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
            <div className="w-16 h-16 bg-white/10 text-brand-primary rounded-2xl flex items-center justify-center border border-white/10">
              <Zap size={32} className="fill-brand-primary" />
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider">
                {t('prefooter.speed_title')}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed font-medium">
                {t('prefooter.speed_desc')}
              </p>
            </div>
            <div className="pt-8 mt-auto">
               <button 
                onClick={() => onOpenApp ? onOpenApp() : navigate('/simulateur')}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-brand flex items-center justify-center space-x-4 active:scale-95"
               >
                 <span>{t('prefooter.speed_btn')}</span>
                 <ArrowRight size={18} />
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PreFooter;