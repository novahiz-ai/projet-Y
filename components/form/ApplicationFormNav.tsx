import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardButton from '../StandardButton';

interface ApplicationFormNavProps {
  step: number;
  totalSteps: number;
  isStepValid: boolean;
  onNext: () => void;
  onClose: () => void;
}

const ApplicationFormNav: React.FC<ApplicationFormNavProps> = ({ 
  step, totalSteps, isStepValid, onNext, onClose 
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-12 md:mt-16 pb-10">
      <StandardButton 
        onClick={step === totalSteps ? onClose : onNext} 
        className={`w-full !py-6 shadow-brand active:scale-[0.98] transition-all duration-300 ${!isStepValid ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`} 
        disabled={!isStepValid}
      >
        <span className="text-base font-black tracking-widest uppercase">
          {step === totalSteps ? t('form.sign_submit') : t('form.next')}
        </span>
      </StandardButton>
      
      {!isStepValid && step !== totalSteps && (
        <p className="text-center mt-4 text-[9px] font-black uppercase tracking-widest text-rose-500 animate-pulse">
          {t('consent.warning').split('.')[0]}
        </p>
      )}
    </div>
  );
};

export default ApplicationFormNav;