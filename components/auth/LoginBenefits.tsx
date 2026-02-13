import React from 'react';
import { ShieldCheck, Zap, Heart } from 'lucide-react';
import Logo from '../Logo';
import { useTranslation } from 'react-i18next';

interface LoginBenefitsProps {
  isSignup?: boolean;
}

const LoginBenefits: React.FC<LoginBenefitsProps> = ({ isSignup }) => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden lg:block lg:col-span-6 space-y-12">
      <div className="space-y-8">
        <div className="mb-10"><Logo size="lg" /></div>
        <h1 className="text-5xl xl:text-7xl font-black uppercase tracking-tighter italic leading-[0.9] text-slate-950 dark:text-white">
          {isSignup ? t('auth.signup_title') : t('auth.login_title')} <br />
          <span className="text-brand-primary">{isSignup ? t('auth.signup_highlight') : t('auth.login_highlight')}</span>
        </h1>
        <p className="mt-8 text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md">
          {isSignup ? t('auth.signup_subtitle') : t('auth.login_subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-2">
          {isSignup ? <Zap className="text-brand-primary" size={24} /> : <ShieldCheck className="text-brand-primary" size={24} />}
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
            {isSignup ? 'Décision Rapide' : 'Sécurité Totale'}
          </p>
          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
            {isSignup ? 'Réponse en 3 minutes.' : 'Certifié eIDAS & RGPD.'}
          </p>
        </div>
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:border-slate-800" />)}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">1M+ Clients</p>
          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Confiance Européenne.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginBenefits;