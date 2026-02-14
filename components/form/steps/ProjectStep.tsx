import React, { useEffect, useRef } from 'react';
import ModernSelect from '../../ModernSelect';
import SliderInput from '../../simulator/SliderInput';
import { LOAN_OFFERS } from '../../../constants';
import { getLimitsForOffer } from '../../../data/simulator/limits';

const ProjectStep = ({ formData, setFormData, t }: any) => {
  const limits = getLimitsForOffer(formData.loanId);
  const prevLoanIdRef = useRef(formData.loanId);

  useEffect(() => {
    if (prevLoanIdRef.current !== formData.loanId) {
      // PROTECTION : Réinitialise systématiquement aux bornes du nouveau projet
      setFormData({
        ...formData, 
        amount: limits.minAmount,
        duration: limits.minDuration
      });
      prevLoanIdRef.current = formData.loanId;
    } else {
      // Garde-fous standards pour les entrées manuelles
      if (formData.amount < limits.minAmount) setFormData({...formData, amount: limits.minAmount});
      if (formData.amount > limits.maxAmount) setFormData({...formData, amount: limits.maxAmount});
      if (formData.duration < limits.minDuration) setFormData({...formData, duration: limits.minDuration});
      if (formData.duration > limits.maxDuration) setFormData({...formData, duration: limits.maxDuration});
    }
  }, [formData.loanId, limits]);

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
          {t('form.project_title')}
          <span className="text-brand-primary">{t('form.project_highlight')}</span>
        </h1>
        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Configurez les paramètres de votre financement.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <ModernSelect 
            label={t('form.fields.purpose')} 
            options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({value:o.id, label:t(o.title)}))} 
            value={formData.loanId} 
            onChange={v => setFormData({...formData, loanId: v})} 
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
           <SliderInput 
             label={t('form.fields.amount')}
             value={formData.amount}
             min={limits.minAmount}
             max={limits.maxAmount}
             step={limits.step}
             unit="€"
             onChange={(val) => setFormData({...formData, amount: val})}
           />
           <SliderInput 
             label={t('form.fields.months')}
             value={formData.duration}
             min={limits.minDuration}
             max={limits.maxDuration}
             step={1}
             unit="mois"
             onChange={(val) => setFormData({...formData, duration: val})}
           />
        </div>
      </div>
    </div>
  );
};

export default ProjectStep;