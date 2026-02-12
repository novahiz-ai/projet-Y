
import React from 'react';
import { Briefcase, Building2 } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';

const ActivityStep = ({ formData, setFormData, t }: any) => (
  <div className="space-y-10">
    <div className="space-y-3">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
        {t('form.activity_title')}
        <span className="text-brand-primary">{t('form.activity_highlight')}</span>
      </h1>
      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Détails de votre situation actuelle.</p>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-1">
        <FormLabel Icon={Briefcase}>{t('form.fields.job_title')}</FormLabel>
        <div className="flex space-x-3">
          <select 
            className="bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-bold outline-none text-slate-900 dark:text-white" 
            value={formData.jobStatus} 
            onChange={e => setFormData({...formData, jobStatus: e.target.value})}
          >
            <option value="cdi">{t('form.options.job_status.cdi')}</option>
            <option value="cdd">{t('form.options.job_status.cdd')}</option>
            <option value="indep">{t('form.options.job_status.indep')}</option>
            <option value="retraite">{t('form.options.job_status.retraite')}</option>
          </select>
          <FormInput 
            placeholder={t('form.placeholders.job_title')} 
            value={formData.jobTitle} 
            onChange={e => setFormData({...formData, jobTitle: e.target.value})} 
          />
        </div>
      </div>

      <div className="space-y-1">
        <FormLabel Icon={Building2}>{t('form.fields.employer')}</FormLabel>
        <FormInput 
          placeholder={t('form.placeholders.employer')} 
          value={formData.employerName} 
          onChange={e => setFormData({...formData, employerName: e.target.value})} 
        />
      </div>
    </div>
  </div>
);

export default ActivityStep;
