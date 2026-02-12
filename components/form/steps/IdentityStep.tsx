
import React from 'react';
import { User } from 'lucide-react';
import CountrySelector from '../../CountrySelector';
import CustomDatePicker from '../../CustomDatePicker';
import { FormLabel, FormInput } from '../../ui/FormControls';

const IdentityStep = ({ formData, setFormData, t, isMinor }: any) => (
  <div className="space-y-10">
    <div className="space-y-3">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
        {t('form.identity_title')}
        <span className="text-brand-primary">{t('form.identity_highlight')}</span>
      </h1>
      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">{t('form.identity_desc')}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CountrySelector 
        label={t('form.fields.tax_residency')} 
        value={formData.country} 
        onChange={(c) => setFormData({...formData, country: c.code, phone: c.dialCode})} 
        className="md:col-span-2" 
      />
      <div className="space-y-1 md:col-span-2">
        <FormLabel Icon={User}>{t('form.fields.firstname')}</FormLabel>
        <div className="flex space-x-3">
          <select 
            className="bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-bold outline-none text-slate-900 dark:text-white" 
            value={formData.civility} 
            onChange={e => setFormData({...formData, civility: e.target.value})}
          >
            <option value="mr">{t('form.options.civility.mr')}</option>
            <option value="mrs">{t('form.options.civility.mrs')}</option>
          </select>
          <FormInput 
            placeholder={t('form.placeholders.firstname')} 
            value={formData.firstName} 
            onChange={e => setFormData({...formData, firstName: e.target.value})} 
          />
        </div>
      </div>
      <div className="space-y-1">
        <FormLabel Icon={User}>{t('form.fields.lastname')}</FormLabel>
        <FormInput 
          placeholder={t('form.placeholders.lastname')} 
          value={formData.lastName} 
          onChange={e => setFormData({...formData, lastName: e.target.value})} 
        />
      </div>
      <div className="space-y-1">
        <CustomDatePicker 
          label={t('form.fields.birthdate')} 
          value={formData.birthDate} 
          onChange={val => setFormData({...formData, birthDate: val})} 
          error={isMinor} 
        />
        {isMinor && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 px-1">Accès réservé aux majeurs</p>}
      </div>
    </div>
  </div>
);

export default IdentityStep;
