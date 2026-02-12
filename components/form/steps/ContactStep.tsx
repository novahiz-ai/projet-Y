
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';

const ContactStep = ({ formData, setFormData, t }: any) => (
  <div className="space-y-10">
    <div className="space-y-3">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
        {t('form.contact_title')}
        <span className="text-brand-primary">{t('form.contact_highlight')}</span>
      </h1>
      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Où pouvons-nous vous joindre ?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1 md:col-span-2">
        <FormLabel Icon={Mail}>{t('form.fields.email')}</FormLabel>
        <FormInput 
          type="email"
          placeholder={t('form.placeholders.email')} 
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})} 
        />
      </div>
      <div className="space-y-1">
        <FormLabel Icon={Phone}>{t('form.fields.phone')}</FormLabel>
        <FormInput 
          placeholder="+33 6 00 00 00 00" 
          value={formData.phone} 
          onChange={e => setFormData({...formData, phone: e.target.value})} 
        />
      </div>
      <div className="space-y-1">
        <FormLabel Icon={MapPin}>{t('form.fields.city')}</FormLabel>
        <FormInput 
          placeholder={t('form.placeholders.city')} 
          value={formData.city} 
          onChange={e => setFormData({...formData, city: e.target.value})} 
        />
      </div>
    </div>
  </div>
);

export default ContactStep;
