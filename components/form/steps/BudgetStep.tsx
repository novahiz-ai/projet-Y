
import React from 'react';
import { Wallet, Landmark } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';

const BudgetStep = ({ formData, setFormData, t }: any) => (
  <div className="space-y-10">
    <div className="space-y-3">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
        {t('form.budget_title')}
        <span className="text-brand-primary">{t('form.budget_highlight')}</span>
      </h1>
      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Analyse de vos capacités de remboursement.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1">
        <FormLabel Icon={Wallet}>{t('form.fields.income')}</FormLabel>
        <FormInput 
          type="number"
          placeholder={t('form.placeholders.income')} 
          value={formData.income} 
          onChange={e => setFormData({...formData, income: e.target.value})} 
        />
      </div>
      <div className="space-y-1">
        <FormLabel Icon={Landmark}>{t('form.fields.rent')}</FormLabel>
        <FormInput 
          type="number"
          placeholder={t('form.placeholders.rent')} 
          value={formData.rent} 
          onChange={e => setFormData({...formData, rent: e.target.value})} 
        />
      </div>
    </div>
  </div>
);

export default BudgetStep;
