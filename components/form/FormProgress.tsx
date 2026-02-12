
import React from 'react';
import { motion } from 'framer-motion';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-end px-1">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Progression</span>
          <p className="text-2xl font-black italic text-slate-950 dark:text-white leading-none">
            {Math.round(progress)}%
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Étape</span>
          <p className="text-lg font-black text-slate-600 dark:text-slate-300 leading-none">
            {currentStep} / {totalSteps}
          </p>
        </div>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-[0_0_15px_rgba(124,58,237,0.4)]"
        />
      </div>
    </div>
  );
};

export default FormProgress;
