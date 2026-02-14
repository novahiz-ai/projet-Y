import { useState, useEffect, useMemo } from 'react';

export const useApplicationForm = (isOpen: boolean, initialContext: any, totalSteps: number) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  
  const [formData, setFormData] = useState({
    loanId: 'perso', amount: 15000, duration: 48, civility: '', firstName: '', lastName: '', birthDate: '', country: 'FR',
    email: '', phone: '', city: '', jobStatus: 'cdi', jobTitle: '', employerName: '',
    income: '', rent: '', primaryBank: '', iban: '', bic: '', accountNumber: '', swift: '', bankAddress: '',
    docIdentity: null, docAddress: null, docIncome: null
  });

  useEffect(() => {
    if (isOpen && initialContext) {
      setFormData(prev => ({ ...prev, ...initialContext }));
      setStep(1);
    }
  }, [isOpen, initialContext]);

  const handleNext = () => { 
    if (isStepValid) {
      setDirection(1); 
      setStep(prev => Math.min(prev + 1, totalSteps)); 
    }
  };
  
  const handlePrev = () => { 
    setDirection(-1); 
    setStep(prev => Math.max(prev - 1, 1)); 
  };

  const isMinor = useMemo(() => {
    if (!formData.birthDate) return false;
    const birth = new Date(formData.birthDate);
    const age = new Date().getFullYear() - birth.getFullYear();
    return age < 18;
  }, [formData.birthDate]);

  const isStepValid = useMemo(() => {
    switch (step) {
      case 1: // Identity
        return !!(formData.civility && formData.lastName && formData.lastName.length > 1 && formData.birthDate && !isMinor);
      case 2: // Project
        return !!(formData.amount > 0 && formData.duration > 0 && formData.loanId);
      case 3: // Activity
        return !!(formData.jobStatus && formData.jobTitle && formData.jobTitle.length > 2);
      case 4: // Contact
        return !!(formData.email.includes('@') && formData.phone && formData.city);
      case 5: // Funds
        // Bank Name is mandatory. Then either IBAN OR (AccNum AND SWIFT)
        const hasBank = !!formData.primaryBank;
        const hasEuCoords = !!formData.iban;
        const hasIntlCoords = !!(formData.accountNumber && formData.swift);
        return hasBank && (hasEuCoords || hasIntlCoords);
      case 6: // Budget
        return !!(formData.income !== '' && formData.rent !== '');
      case 7: // Docs
        return !!(formData.docIdentity && formData.docAddress && formData.docIncome);
      case 8: // Signature
        return true;
      default:
        return true;
    }
  }, [step, formData, isMinor]);

  return {
    step,
    direction,
    formData,
    setFormData,
    handleNext,
    handlePrev,
    isMinor,
    isStepValid
  };
};