import React, { useState } from 'react';
// Fix: Added MapPin to the imported icons from lucide-react
import { CreditCard, Landmark, Globe, ShieldCheck, Layers, MapPin } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';
import { motion } from 'framer-motion';

const FundsStep = ({ formData, setFormData, t }: any) => {
  const [protocol, setProtocol] = useState<'eu' | 'intl'>('eu');

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
          {t('form.funds_title')}
          <span className="text-brand-primary">{t('form.funds_highlight')}</span>
        </h1>
        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Versement sécurisé de vos fonds.</p>
      </div>

      {/* Protocol Switcher */}
      <div className="bg-slate-50 dark:bg-slate-900/40 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
        <button 
          onClick={() => setProtocol('eu')}
          className={`py-4 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-all ${protocol === 'eu' ? 'bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700' : 'text-slate-400'}`}
        >
          <ShieldCheck size={20} className={protocol === 'eu' ? 'text-brand-primary' : ''} />
          <span className="text-[10px] font-black uppercase tracking-widest">Europe (IBAN)</span>
        </button>
        <button 
          onClick={() => setProtocol('intl')}
          className={`py-4 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-all ${protocol === 'intl' ? 'bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700' : 'text-slate-400'}`}
        >
          <Globe size={20} className={protocol === 'intl' ? 'text-brand-primary' : ''} />
          <span className="text-[10px] font-black uppercase tracking-widest">International</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Bank Name - Manual Entry - Mandatory */}
        <div className="space-y-1">
          <FormLabel Icon={Landmark} required>Établissement bancaire</FormLabel>
          <FormInput 
            placeholder="Ex: BNP Paribas, Revolut, Chase..." 
            value={formData.primaryBank} 
            onChange={e => setFormData({...formData, primaryBank: e.target.value})} 
          />
        </div>

        {protocol === 'eu' ? (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-1 md:col-span-2">
              <FormLabel Icon={CreditCard} required>IBAN</FormLabel>
              <FormInput 
                placeholder="FR76 0000 0000 0000 0000 0000 000" 
                value={formData.iban} 
                onChange={e => setFormData({...formData, iban: e.target.value})} 
              />
            </div>
            <div className="space-y-1">
              <FormLabel Icon={Layers} optional>BIC / SWIFT</FormLabel>
              <FormInput 
                placeholder="ABCDEF12XXX" 
                value={formData.bic} 
                onChange={e => setFormData({...formData, bic: e.target.value})} 
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-1 md:col-span-2">
              <FormLabel Icon={CreditCard} required>Numéro de compte (Account Number)</FormLabel>
              <FormInput 
                placeholder="000123456789" 
                value={formData.accountNumber} 
                onChange={e => setFormData({...formData, accountNumber: e.target.value})} 
              />
            </div>
            <div className="space-y-1">
              <FormLabel Icon={Globe} required>SWIFT / Code Routage</FormLabel>
              <FormInput 
                placeholder="SWIFT Code" 
                value={formData.swift} 
                onChange={e => setFormData({...formData, swift: e.target.value})} 
              />
            </div>
            <div className="space-y-1">
              <FormLabel Icon={MapPin} optional>Adresse de la banque</FormLabel>
              <FormInput 
                placeholder="Ville, Pays" 
                value={formData.bankAddress} 
                onChange={e => setFormData({...formData, bankAddress: e.target.value})} 
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-brand-primary/5 rounded-[2.5rem] border border-brand-primary/10 flex items-start space-x-5">
         <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center shrink-0 shadow-sm"><ShieldCheck size={20} /></div>
         <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-950 dark:text-white leading-none">Sécurité des virements</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Nous supportons les virements SEPA et SWIFT pour une couverture mondiale instantanée.</p>
         </div>
      </div>
    </div>
  );
};

export default FundsStep;