import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StandardButton from '../../StandardButton';

interface SignupNavigationProps {
  step: number;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSwitch: () => void;
}

const SignupNavigation: React.FC<SignupNavigationProps> = ({ step, isStepValid, onNext, onPrev, onSwitch }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-6 space-y-3 shrink-0 border-t border-slate-50 dark:border-slate-800/50">
      <div className="flex items-center space-x-2">
        {step > 1 && (
          <button 
            onClick={onPrev} 
            className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-100 border border-slate-100 dark:border-slate-700 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <StandardButton 
          className={`flex-1 !py-4 shadow-brand !bg-brand-dark hover:!bg-brand-primary !rounded-xl ${!isStepValid ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`} 
          onClick={onNext}
          disabled={!isStepValid}
        >
          <span className="text-[10px] font-black tracking-widest uppercase">
            {step === 5 ? "Confirmer l'inscription" : t('form.next')}
          </span>
          <ArrowRight size={14} />
        </StandardButton>
      </div>
      
      <div className="text-center">
        <button 
          onClick={onSwitch} 
          className="text-[9px] font-black uppercase text-slate-400 hover:text-brand-primary underline underline-offset-4 transition-colors"
        >
          Déjà inscrit ? Connexion
        </button>
      </div>
    </div>
  );
};

export default SignupNavigation;