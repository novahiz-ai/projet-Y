
import React from 'react';
import { Wallet } from 'lucide-react';
import ModernSelect from '../../ModernSelect';
import { FormLabel, FormInput } from '../../ui/FormControls';
import { LOAN_OFFERS } from '../../../constants';

const ProjectStep = ({ formData, setFormData, t }: any) => (
  <div className="space-y-10">
    <h1 className="text-4xl font-black uppercase tracking-tighter italic">
      {t('form.project_title')}
      <span className="text-brand-primary">{t('form.project_highlight')}</span>
    </h1>
    <div className="space-y-6">
      <ModernSelect 
        label={t('form.fields.purpose')} 
        options={LOAN_OFFERS.map(o => ({value:o.id, label:t(o.title)}))} 
        value={formData.loanId} 
        onChange={v => setFormData({...formData, loanId: v})} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-1">
           <FormLabel Icon={Wallet}>{t('form.fields.amount')}</FormLabel>
           <FormInput 
             type="number" 
             value={formData.amount} 
             onChange={e => setFormData({...formData, amount: Number(e.target.value)})} 
           />
         </div>
         <div className="space-y-1">
           <FormLabel Icon={Wallet}>{t('form.fields.months')}</FormLabel>
           <FormInput 
             type="number" 
             value={formData.duration} 
             onChange={e => setFormData({...formData, duration: Number(e.target.value)})} 
           />
         </div>
      </div>
    </div>
  </div>
);

export default ProjectStep;
