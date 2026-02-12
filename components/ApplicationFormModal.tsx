
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, Lock } from 'lucide-react';
import StandardButton from './StandardButton';
import FormProgress from './form/FormProgress';
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

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-white dark:bg-slate-950 flex flex-col h-screen overflow-hidden">
      <header className="p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-8">
            <button onClick={step === 1 ? onClose : handlePrev} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all shrink-0">
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 max-w-md"><FormProgress currentStep={step} totalSteps={totalSteps} /></div>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all shrink-0"><X size={24} /></button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto py-12">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction < 0 ? 50 : -50 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              {step === 1 && <IdentityStep formData={formData} setFormData={setFormData} t={t} isMinor={isMinor} />}
              {step === 2 && <ProjectStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 3 && <ActivityStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 4 && <ContactStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 5 && <FundsStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 6 && <BudgetStep formData={formData} setFormData={setFormData} t={t} />}
              {step === 7 && <UploadStep formData={formData} setFormData={setFormData} t={t} idFileRef={idFileRef} addressFileRef={addressFileRef} incomeFileRef={incomeFileRef} />}
              {step === 8 && <SignatureStep canvasRef={canvasRef} signaturePadRef={signaturePadRef} t={t} />}
              
              <div className="mt-16">
                <StandardButton onClick={step === totalSteps ? onClose : handleNext} className="w-full !py-6 shadow-brand" disabled={step === 1 && isMinor}>
                  <span>{step === totalSteps ? t('form.sign_submit') : t('form.next')}</span>
                </StandardButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="p-6 border-t border-slate-100 dark:border-slate-800 text-center shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <Lock size={12} className="text-emerald-500" />
           <span>Protection AES-256 • Certifié eIDAS</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default ApplicationFormModal;
