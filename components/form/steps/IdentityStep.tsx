import React from 'react';
import { User, MapPin } from 'lucide-react';
import CountrySelector from '../../CountrySelector';
import CustomDatePicker from '../../CustomDatePicker';
import { FormLabel, FormInput } from '../../ui/FormControls';
import GenderSelector from '../../GenderSelector';

const IdentityStep = ({ formData, setFormData, t, isMinor }: any) => (
  <div className="space-y-10">
    <div className="space-y-3 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
        {t('form.identity_title')}
        <span className="text-brand-primary">{t('form.identity_highlight')}</span>
      </h1>
      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">{t('form.identity_desc')}</p>
    </div>

    <div className="grid grid-cols-1 gap-8">
      {/* Pays - Mandatory */}
      <CountrySelector 
        label={t('form.fields.tax_residency')} 
        value={formData.country} 
        onChange={(c) => setFormData({...formData, country: c.code, phone: c.dialCode})} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genre - Mandatory - Nouveau Pop-up Moderne */}
        <GenderSelector 
          value={formData.civility} 
          onChange={val => setFormData({...formData, civility: val})} 
          required 
        />

        {/* Nom - Mandatory - Remplaçant Prénom */}
        <div className="space-y-1">
          <FormLabel Icon={User} required>Nom complet</FormLabel>
          <FormInput 
            placeholder="Ex: Jean Dupont" 
            value={formData.lastName} 
            onChange={e => setFormData({...formData, lastName: e.target.value})} 
          />
        </div>
      </div>

      {/* Date de naissance - Mandatory */}
      <div className="space-y-1">
        <CustomDatePicker 
          label={t('form.fields.birthdate')} 
          value={formData.birthDate} 
          onChange={val => setFormData({...formData, birthDate: val})} 
          error={isMinor} 
        />
        {isMinor && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 px-1 animate-bounce">Accès réservé aux majeurs</p>}
      </div>
    </div>
  </div>
);

export default IdentityStep;