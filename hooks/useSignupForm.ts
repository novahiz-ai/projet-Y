import { useState, useMemo } from 'react';

export const useSignupForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'FR',
    phonePrefix: '+33',
    phone: '',
    accountType: 'personal',
    targetBank: 'younited',
    pinCode: ''
  });

  const updateFormData = (fields: any) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const isStepValid = useMemo(() => {
    switch (step) {
      case 1: // Identity
        return !!(formData.firstName && formData.lastName && formData.sex);
      case 2: // Security
        return !!(formData.email.includes('@') && formData.password.length >= 8 && formData.password === formData.confirmPassword);
      case 3: // Info
        return !!(formData.birthDate && formData.country && formData.phone.length >= 8);
      case 4: // Account
        return !!(formData.accountType && formData.targetBank);
      case 5: // Pin
        return formData.pinCode.length === 6;
      default:
        return false;
    }
  }, [step, formData]);

  const handleNext = () => { 
    if (isStepValid) {
      setDirection(1); 
      setStep(prev => Math.min(prev + 1, 5)); 
    }
  };
  
  const handlePrev = () => { 
    setDirection(-1); 
    setStep(prev => Math.max(prev - 1, 1)); 
  };

  return {
    step,
    direction,
    formData,
    updateFormData,
    handleNext,
    handlePrev,
    isStepValid
  };
};