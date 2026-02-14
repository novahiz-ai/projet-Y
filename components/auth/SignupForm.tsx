import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import { useSignupForm } from '../../hooks/useSignupForm';

// Modules d'étapes
import StepIdentity from './signup/StepIdentity';
import StepSecurity from './signup/StepSecurity';
import StepInfo from './signup/StepInfo';
import StepAccount from './signup/StepAccount';
import StepPin from './signup/StepPin';

// Composants de contrôle externalisés
import SignupProgressBar from './signup/SignupProgressBar';
import SignupNavigation from './signup/SignupNavigation';

const SignupForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { t } = useTranslation();
  const { 
    step, direction, formData, updateFormData, handleNext, handlePrev, isStepValid 
  } = useSignupForm();

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-slate-950 md:bg-white/95 md:dark:bg-slate-900/95 md:backdrop-blur-xl md:rounded-[3.5rem] md:shadow-3xl md:border md:border-slate-100 md:dark:border-slate-800 relative w-full h-full min-h-screen md:min-h-0 md:w-[400px] md:h-[640px] lg:md:h-[520px] flex flex-col overflow-hidden"
    >
      <SignupProgressBar currentStep={step} totalSteps={5} />

      <div className="p-8 flex-1 flex flex-col justify-center md:justify-start scrollbar-hide pt-16 md:pt-8">
        <div className="flex flex-col items-center space-y-1 mb-10 md:mb-6 shrink-0">
          <Logo size="sm" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-brand-primary mt-2 italic">
            {t('form.step_label')} {step} / 5
          </span>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step} 
              custom={direction} 
              variants={variants}
              initial="enter" 
              animate="center" 
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {step === 1 && <StepIdentity data={formData} update={updateFormData} />}
              {step === 2 && <StepSecurity data={formData} update={updateFormData} />}
              {step === 3 && <StepInfo data={formData} update={updateFormData} />}
              {step === 4 && <StepAccount data={formData} update={updateFormData} />}
              {step === 5 && <StepPin data={formData} update={updateFormData} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 md:mt-auto">
          <SignupNavigation 
            step={step} 
            isStepValid={isStepValid} 
            onNext={handleNext} 
            onPrev={handlePrev} 
            onSwitch={onSwitch}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SignupForm;