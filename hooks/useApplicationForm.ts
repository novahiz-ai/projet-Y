
import { useState, useEffect } from 'react';

export const useApplicationForm = (isOpen: boolean, initialContext: any, totalSteps: number) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  
  const [formData, setFormData] = useState({
    loanId: 'perso', amount: 15000, duration: 48, civility: 'mr', firstName: '', lastName: '', birthDate: '', country: 'FR',
    email: '', phone: '', city: '', jobStatus: 'cdi', jobTitle: '', employerName: '',
    income: '', rent: '', primaryBank: 'bourso', iban: '', docIdentity: null, docAddress: null, docIncome: null
  });

  useEffect(() => {
    if (isOpen && initialContext) {
      setFormData(prev => ({ ...prev, ...initialContext }));
      setStep(1);
    }
  }, [isOpen, initialContext]);

  const handleNext = () => { 
    setDirection(1); 
    setStep(prev => Math.min(prev + 1, totalSteps)); 
  };
  
  const handlePrev = () => { 
    setDirection(-1); 
    setStep(prev => Math.max(prev - 1, 1)); 
  };

  const isMinor = () => {
    if (!formData.birthDate) return false;
    const birth = new Date(formData.birthDate);
    const age = new Date().getFullYear() - birth.getFullYear();
    return age < 18;
  };

  return {
    step,
    direction,
    formData,
    setFormData,
    handleNext,
    handlePrev,
    isMinor: isMinor()
  };
};
