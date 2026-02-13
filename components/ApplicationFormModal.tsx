import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StandardButton from './StandardButton';
import FormHeader from './form/FormHeader';
import FormFooter from './form/FormFooter';
import { useApplicationForm } from '../hooks/useApplicationForm';
import { 
  IdentityStep, ProjectStep, ActivityStep, ContactStep, FundsStep, BudgetStep, UploadStep, SignatureStep 
} from './form/FormSteps';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: any | null;
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({ isOpen, onClose, initialContext }) => {
  const { t } = useTranslation();
  const totalSteps = 8;
  const { step, direction, formData, setFormData, handleNext, handlePrev, isMinor } = useApplicationForm(isOpen, initialContext, totalSteps);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<any>(null);
  const idFileRef = useRef<HTMLInputElement>(null);
  const addressFileRef = useRef<HTMLInputElement>(null);
  const incomeFileRef = useRef<HTMLInputElement>(null);

  // Focus trap and accessibility
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[400] bg-white dark:bg-slate-950 flex flex-col h-screen overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <FormHeader 
        step={step} 
        totalSteps={totalSteps} 
        onPrev={step === 1 ? onClose : handlePrev} 
        onClose={onClose} 
      />

      <main className="flex-1 overflow-y-auto py-12 scrollbar-hide">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={step} 
              custom={direction} 
              initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: direction < 0 ? 30 : -30 }} 
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              {step === 1 && <IdentityStep formData={formData} setFormData={setFormData} t={t} isMinor={isMinor} />}
              {step === 2 && <ProjectStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 3 && <ActivityStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 4 && <ContactStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 5 && <FundsStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 6 && <BudgetStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 7 && <UploadStep formData={formData} setFormData={setFormData} t={t} idFileRef={idFileRef} addressFileRef={addressFileRef} incomeFileRef={incomeFileRef} />}
              {step === 8 && <SignatureStep canvasRef={canvasRef} signaturePadRef={signaturePadRef} t={t} />}
              
              <div className="mt-16 pb-10">
                <StandardButton 
                  onClick={step === totalSteps ? onClose : handleNext} 
                  className="w-full !py-6 shadow-brand active:scale-[0.98]" 
                  disabled={step === 1 && isMinor}
                >
                  <span className="text-base font-black tracking-widest">{step === totalSteps ? t('form.sign_submit') : t('form.next')}</span>
                </StandardButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <FormFooter />
    </motion.div>
  );
};

export default ApplicationFormModal;