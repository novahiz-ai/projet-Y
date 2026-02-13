import React from 'react';
import { ChevronLeft, X } from 'lucide-react';
import FormProgress from './FormProgress';

interface FormHeaderProps {
  step: number;
  totalSteps: number;
  onPrev: () => void;
  onClose: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ step, totalSteps, onPrev, onClose }) => {
  return (
    <header className="p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shrink-0">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-8">
          <button onClick={onPrev} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all shrink-0">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 max-w-md">
            <FormProgress currentStep={step} totalSteps={totalSteps} />
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all shrink-0">
            <X size={24} />
          </button>
      </div>
    </header>
  );
};

export default FormHeader;