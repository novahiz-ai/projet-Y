
import React from 'react';
import { CreditCard, Landmark } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';

const FundsStep = ({ formData, setFormData, t }: any) => (
  <div className="space-y-10">
    <div className="space-y-3">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
        {t('form.funds_title')}
        <span className="text-brand-primary">{t('form.funds_highlight')}</span>
      </h1>
      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">{t('form.funds_desc')}</p>
    </div>

    <div className="space-y-6">
      <div className="space-y-1">
        <FormLabel Icon={Landmark}>{t('form.fields.bank')}</FormLabel>
        <select 
          className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 font-bold outline-none text-slate-900 dark:text-white" 
          value={formData.primaryBank} 
          onChange={e => setFormData({...formData, primaryBank: e.target.value})}
        >
          <option value="bourso">Boursorama</option>
          <option value="bnp">BNP Paribas</option>
          <option value="socgen">Société Générale</option>
          <option value="other">{t('form.bank_other')}</option>
        </select>
      </div>

      <div className="space-y-1">
        <FormLabel Icon={CreditCard}>{t('form.fields.iban')}</FormLabel>
        <FormInput 
          placeholder="FR76 0000 0000 ..." 
          value={formData.iban} 
          onChange={e => setFormData({...formData, iban: e.target.value})} 
        />
      </div>
    </div>
  </div>
);

export default FundsStep;
