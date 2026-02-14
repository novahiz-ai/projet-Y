import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormLabel, FormInput } from '../ui/FormControls';
import StandardButton from '../StandardButton';
import Logo from '../Logo';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white dark:bg-slate-950 md:bg-white/95 md:dark:bg-slate-900/95 md:backdrop-blur-xl p-8 md:rounded-[3rem] md:shadow-3xl md:border md:border-slate-100 md:dark:border-slate-800 relative w-full h-full min-h-screen md:min-h-0 md:w-[350px] md:h-[450px] flex flex-col justify-center md:justify-between"
    >
      <div className="space-y-6 md:space-y-6">
        <div className="flex flex-col items-center space-y-2 mb-4 md:mb-0">
          <Logo size="sm" />
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">Accès Client</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <FormLabel className="!text-[9px]">{t('auth.email_label')}</FormLabel>
            <FormInput type="email" placeholder="nom@exemple.com" className="!py-3 !text-sm" />
          </div>
          <div className="space-y-1">
            <FormLabel className="!text-[9px]">{t('auth.password_label')}</FormLabel>
            <FormInput type="password" placeholder="••••••••" className="!py-3 !text-sm" />
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-10 md:mt-0">
        <StandardButton className="w-full !py-4 shadow-brand">
          <span className="text-xs">{t('auth.login_btn')}</span>
          <ArrowRight size={16} />
        </StandardButton>

        <button 
          type="button"
          className="w-full flex items-center justify-center space-x-3 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
        >
          <GoogleIcon />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Google Auth</span>
        </button>

        <div className="flex flex-col items-center space-y-2">
          <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors">
            {t('auth.forgot_password')}
          </button>
          <div className="h-px w-8 bg-slate-100 dark:bg-slate-800" />
          <button 
            onClick={onSwitch}
            className="text-[9px] font-black uppercase tracking-widest text-brand-primary hover:underline"
          >
            {t('auth.no_account')} <span className="underline italic ml-1">S'inscrire</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;