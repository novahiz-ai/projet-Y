import React from 'react';
import { motion } from 'framer-motion';

interface SignupProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const SignupProgressBar: React.FC<SignupProgressBarProps> = ({ currentStep, totalSteps }) => (
  <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
    <motion.div 
      className="h-full bg-brand-primary" 
      initial={{ width: 0 }}
      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);

export default SignupProgressBar;