import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormLabel, FormInput } from '../ui/FormControls';
import StandardButton from '../StandardButton';
import Logo from '../Logo';

interface SignupFormProps {
  onSwitch: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 rounded-[3rem] shadow-3xl border border-slate-100 dark:border-slate-800 relative w-[350px] h-[450px] flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <Logo size="sm" />
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-primary">Inscription</p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <FormLabel className="!text-[8px]">Prénom</FormLabel>
              <FormInput placeholder="Jean" className="!py-2 !text-xs !rounded-xl" />
            </div>
            <div className="space-y-1">
              <FormLabel className="!text-[8px]">Nom</FormLabel>
              <FormInput placeholder="Dupont" className="!py-2 !text-xs !rounded-xl" />
            </div>
          </div>
          <div className="space-y-1">
            <FormLabel className="!text-[8px]">{t('auth.email_label')}</FormLabel>
            <FormInput type="email" placeholder="email@exemple.com" className="!py-2 !text-xs !rounded-xl" />
          </div>
          <div className="space-y-1">
            <FormLabel className="!text-[8px]">{t('auth.password_label')}</FormLabel>
            <FormInput type="password" placeholder="••••••••" className="!py-2 !text-xs !rounded-xl" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <StandardButton className="w-full !py-4 shadow-brand !bg-emerald-500 hover:!bg-emerald-600">
          <span className="text-xs">Créer mon compte</span>
          <UserPlus size={16} />
        </StandardButton>

        <div className="text-center space-y-2">
          <p className="text-[8px] text-slate-400 font-bold uppercase">
            En m'inscrivant, j'accepte les conditions générales.
          </p>
          <div className="h-px w-8 bg-slate-100 dark:bg-slate-800 mx-auto" />
          <button 
            onClick={onSwitch}
            className="text-[9px] font-black uppercase tracking-widest text-brand-primary hover:underline"
          >
            {t('auth.have_account')} <span className="underline italic ml-1">Se connecter</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupForm;