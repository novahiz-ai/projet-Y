import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  ChevronLeft, 
  Check, 
  User, 
  Mail, 
  Briefcase, 
  Home, 
  Zap,
  ShieldCheck,
  Calendar,
  Phone,
  MapPin,
  Wallet,
  Building2,
  Lock,
  UploadCloud,
  CreditCard as IdCard,
  Eraser,
  FileCheck,
  Fingerprint
} from 'lucide-react';
import SignaturePad from 'signature_pad';
import StandardButton from './StandardButton';
import ModernSelect from './ModernSelect';
import CountrySelector, { Country } from './CountrySelector';
import CustomDatePicker from './CustomDatePicker';
import { LOAN_OFFERS } from '../constants';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: {
    loanId: string;
    amount: number;
    duration: number;
  } | null;
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({ isOpen, onClose, initialContext }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const totalSteps = 8;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  
  const idFileRef = useRef<HTMLInputElement>(null);
  const addressFileRef = useRef<HTMLInputElement>(null);
  const incomeFileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    loanId: 'perso',
    amount: 15000,
    duration: 48,
    civility: 'mr',
    firstName: '',
    lastName: '',
    birthDate: '',
    country: 'FR',
    familyStatus: 'single',
    dependents: '0',
    email: '',
    phone: '+33',
    address: '',
    city: '',
    zipCode: '',
    jobStatus: 'cdi',
    jobTitle: '',
    employerName: '',
    jobSeniority: '3',
    income: '',
    rent: '',
    currentLoans: '0',
    primaryBank: 'bourso',
    iban: '',
    docIdentity: null as string | null,
    docAddress: null as string | null,
    docIncome: null as string | null,
    docsUploaded: false
  });

  const phases = [
    { id: 1, label: t('form.phases.basics'), steps: [1, 2] },
    { id: 2, label: t('form.phases.situation'), steps: [3, 4] },
    { id: 3, label: t('form.phases.finances'), steps: [5, 6] },
    { id: 4, label: t('form.phases.finalize'), steps: [7, 8] }
  ];

  const currentPhase = phases.find(p => p.steps.includes(step)) || phases[0];

  useEffect(() => {
    if (isOpen && initialContext) {
      setFormData(prev => ({
        ...prev,
        loanId: initialContext.loanId || prev.loanId,
        amount: initialContext.amount || prev.amount,
        duration: initialContext.duration || prev.duration
      }));
      setStep(1);
    }
  }, [isOpen, initialContext]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateIban = (iban: string) => /^[A-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4,}(?:[ ]?[0-9]{1,4})?$/.test(iban.replace(/\s/g, ''));
  const validateZip = (zip: string) => /^[0-9]{5,10}$/.test(zip);

  const userAge = useMemo(() => {
    if (!formData.birthDate) return 0;
    const today = new Date();
    const birth = new Date(formData.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }, [formData.birthDate]);

  const isMinor = userAge > 0 && userAge < 18;

  useEffect(() => {
    if (step === 8 && canvasRef.current) {
      const initSignature = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth * ratio;
          canvas.height = parent.clientHeight * ratio;
          canvas.style.width = `${parent.clientWidth}px`;
          canvas.style.height = `${parent.clientHeight}px`;
          canvas.getContext("2d")?.scale(ratio, ratio);
        }
        signaturePadRef.current = new SignaturePad(canvas, { 
          penColor: '#6d28d9',
          backgroundColor: 'transparent',
          velocityFilterWeight: 0.7
        });
      };
      const timer = setTimeout(initSignature, 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNumericInput = (field: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const handleIbanInput = (value: string) => {
    const raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, iban: formatted }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.firstName.length >= 2 && formData.lastName.length >= 2 && !!formData.birthDate && !isMinor;
      case 3: return formData.jobTitle.length >= 3 && formData.employerName.length >= 2;
      case 4: return validateEmail(formData.email) && formData.phone.length >= 10 && formData.address.length >= 5 && validateZip(formData.zipCode);
      case 5: return Number(formData.income) > 0;
      case 6: return validateIban(formData.iban);
      case 7: return formData.docsUploaded;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    setDirection(1);
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  if (!isOpen) return null;

  const progressPercentage = Math.round((step / totalSteps) * 100);
  const inputClass = (error?: string) => `w-full bg-slate-50 dark:bg-slate-900 border-2 ${error ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-transparent focus:border-brand-primary/20'} rounded-2xl py-4 px-6 font-bold text-lg focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400`;
  const labelClass = "text-[10px] font-black uppercase text-slate-400 tracking-widest px-1 flex items-center space-x-2 mb-2";

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-white dark:bg-slate-950 flex flex-col h-screen overflow-hidden"
    >
      <header className="p-4 md:p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-50">
        <div className="max-w-4xl mx-auto w-full flex flex-col space-y-6">
          
          <div className="flex items-center justify-between">
            <button onClick={step === 1 ? onClose : handlePrev} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-500 flex items-center space-x-2">
              <ChevronLeft size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{t('form.step_back')}</span>
            </button>

            <div className="flex items-center space-x-1 sm:space-x-4">
               {phases.map((p) => {
                 const isActive = p.id === currentPhase.id;
                 const isPast = p.id < currentPhase.id;
                 return (
                   <div key={p.id} className="flex items-center">
                     <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
                          isActive ? 'bg-brand-primary text-white shadow-brand scale-110' : isPast ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}>
                          {isPast ? <Check size={14} /> : p.id}
                        </div>
                        <span className={`hidden sm:block mt-2 text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-brand-primary' : 'text-slate-400'}`}>
                          {p.label}
                        </span>
                     </div>
                     {p.id < 4 && <div className={`w-4 sm:w-10 h-0.5 mx-1 sm:mx-2 rounded-full ${p.id < currentPhase.id ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-slate-800'}`}></div>}
                   </div>
                 );
               })}
            </div>

            <button onClick={onClose} className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:bg-rose-500 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-end">
                <span className="text-[9px] font-black uppercase text-brand-primary tracking-[0.3em]">{currentPhase.label} • {t('form.step_label')} {step}/8</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{progressPercentage}% {t('form.completion_label')}</span>
             </div>
             <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progressPercentage}%` }} 
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-brand" 
                />
             </div>
          </div>

        </div>
      </header>

      <main className="flex-1 relative overflow-y-auto flex flex-col items-center py-10 scrollbar-hide">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step} custom={direction}
            initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
            className="w-full max-w-2xl px-6 flex-1 flex flex-col relative z-10"
          >
            
            {step === 1 && (
              <div className="space-y-10">
                <div className="space-y-3 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">{t('form.identity_title')}<span className="text-brand-primary">{t('form.identity_highlight')}</span></h1>
                  <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">{t('form.identity_desc')}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CountrySelector label={t('form.fields.tax_residency')} value={formData.country} onChange={(c) => setFormData({...formData, country: c.code, phone: c.dialCode})} className="md:col-span-2" />
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className={labelClass}><User size={12}/> <span>{t('form.fields.firstname')}</span></label>
                    <div className="flex space-x-3">
                      <select className="bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-bold outline-none text-slate-900 dark:text-white" value={formData.civility} onChange={e => setFormData({...formData, civility: e.target.value})}>
                        <option value="mr">{t('form.options.civility.mr')}</option>
                        <option value="mrs">{t('form.options.civility.mrs')}</option>
                        <option value="ms">{t('form.options.civility.ms')}</option>
                      </select>
                      <input type="text" placeholder={t('form.placeholders.firstname')} className={inputClass()} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={labelClass}><User size={12}/> <span>{t('form.fields.lastname')}</span></label>
                    <input type="text" placeholder={t('form.placeholders.lastname')} className={inputClass()} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
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

                <StandardButton onClick={handleNext} disabled={!isStepValid()} className="w-full !py-6 shadow-brand">
                  {t('form.next')}
                </StandardButton>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">{t('form.activity_title')}<span className="text-brand-primary">{t('form.activity_highlight')}</span></h1>
                <div className="space-y-6">
                   <ModernSelect 
                    label={t('form.fields.job_title')} 
                    options={[
                      {value:'cdi', label:t('form.options.job_status.cdi')}, 
                      {value:'cdd', label:t('form.options.job_status.cdd')}, 
                      {value:'indep', label:t('form.options.job_status.indep')}, 
                      {value:'retraite', label:t('form.options.job_status.retraite')}, 
                      {value:'etudiant', label:t('form.options.job_status.etudiant')}
                    ]} 
                    value={formData.jobStatus} 
                    onChange={v => setFormData({...formData, jobStatus: v})} 
                  />
                   <div className="space-y-1">
                      <label className={labelClass}><Briefcase size={12}/> <span>{t('form.fields.job_title')}</span></label>
                      <input type="text" placeholder={t('form.placeholders.job_title')} className={inputClass()} value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} />
                   </div>
                   <div className="space-y-1">
                      <label className={labelClass}><Building2 size={12}/> <span>{t('form.fields.employer')}</span></label>
                      <input type="text" placeholder={t('form.placeholders.employer')} className={inputClass()} value={formData.employerName} onChange={e => setFormData({...formData, employerName: e.target.value})} />
                   </div>
                </div>
                <StandardButton onClick={handleNext} disabled={!isStepValid()} className="w-full !py-6 shadow-brand">{t('form.next')}</StandardButton>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">{t('form.contact_title')}<span className="text-brand-primary">{t('form.contact_highlight')}</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 md:col-span-2">
                    <label className={labelClass}><Mail size={12}/> <span>{t('form.fields.email')}</span></label>
                    <input type="email" placeholder={t('form.placeholders.email')} className={inputClass(formData.email && !validateEmail(formData.email) ? 'err' : '')} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className={labelClass}><Phone size={12}/> <span>{t('form.fields.phone')}</span></label>
                    <input type="tel" className={inputClass()} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className={labelClass}><MapPin size={12}/> <span>{t('form.fields.address')}</span></label>
                    <input type="text" placeholder={t('form.placeholders.address')} className={inputClass()} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>{t('form.fields.zip')}</label>
                    <input type="text" placeholder={t('form.placeholders.zip')} className={inputClass(formData.zipCode && !validateZip(formData.zipCode) ? 'err' : '')} value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>{t('form.fields.city')}</label>
                    <input type="text" placeholder={t('form.placeholders.city')} className={inputClass()} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                </div>
                <StandardButton onClick={handleNext} disabled={!isStepValid()} className="w-full !py-6 shadow-brand">{t('form.next')}</StandardButton>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-10">
                <div className="space-y-3">
                  <h1 className="text-4xl font-black uppercase tracking-tighter italic">{t('form.funds_title')}<span className="text-brand-primary">{t('form.funds_highlight')}</span></h1>
                  <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">{t('form.funds_desc')}</p>
                </div>
                <div className="space-y-6">
                   <ModernSelect 
                    label={t('form.fields.bank')} 
                    options={[
                      {value:'sg', label:'Société Générale'}, 
                      {value:'bnpp', label:'BNP Paribas'}, 
                      {value:'revolut', label:'Revolut'}, 
                      {value:'bourso', label:'Boursorama'}, 
                      {value:'ca', label:'Crédit Agricole'}, 
                      {value:'autre', label: t('form.bank_other')}
                    ]} 
                    value={formData.primaryBank} 
                    onChange={v => setFormData({...formData, primaryBank: v})} 
                  />
                   <div className="space-y-1">
                     <label className={labelClass}><IdCard size={12}/> <span>{t('form.fields.iban')}</span></label>
                     <input type="text" placeholder="FR76 0000 0000 0000 0000 000" className={inputClass(formData.iban && !validateIban(formData.iban) ? 'err' : '')} value={formData.iban} onChange={e => handleIbanInput(e.target.value)} />
                   </div>
                </div>
                <StandardButton onClick={handleNext} disabled={!isStepValid()} className="w-full !py-6 shadow-brand">{t('form.next')}</StandardButton>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-10">
                <div className="text-center space-y-4">
                   <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-primary/10 rounded-full text-brand-primary">
                      <Fingerprint size={12} />
                      <span className="text-[8px] font-black uppercase tracking-widest">{t('form.id_validation')}</span>
                   </div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{t('form.sign_title')}<span className="text-brand-primary">{t('form.sign_highlight')}</span></h1>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] px-8 leading-relaxed">
                    {t('form.sign_desc')}
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-6 md:p-10 border border-slate-100 dark:border-slate-800 space-y-6">
                   <div className="aspect-[2.2/1] bg-white dark:bg-slate-950 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 overflow-hidden relative shadow-inner-soft">
                      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10" />
                   </div>
                   
                   <div className="flex flex-col items-center space-y-4">
                     <button onClick={() => signaturePadRef.current?.clear()} className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors flex items-center space-x-2 group">
                        <Eraser size={14} className="group-hover:rotate-12 transition-transform" />
                        <span className="underline underline-offset-4">{t('form.sign_reset')}</span>
                     </button>
                     
                     <div className="flex items-center space-x-2 text-[8px] font-black uppercase text-slate-400 tracking-widest italic opacity-50">
                        <Lock size={10} />
                        <span>{t('form.sign_cert')}</span>
                     </div>
                   </div>
                </div>

                <StandardButton 
                  onClick={() => {
                    if (signaturePadRef.current?.isEmpty()) {
                      alert(t('form.sign_desc'));
                      return;
                    }
                    onClose();
                  }} 
                  className="w-full !py-7 shadow-brand text-lg"
                >
                  {t('form.sign_submit')}
                </StandardButton>
              </div>
            )}

            {[2, 5, 7].includes(step) && (
              <div className="space-y-10">
                {step === 2 && <h1 className="text-4xl font-black uppercase tracking-tighter italic">{t('form.project_title')}<span className="text-brand-primary">{t('form.project_highlight')}</span></h1>}
                {step === 5 && <h1 className="text-4xl font-black uppercase tracking-tighter italic">{t('form.budget_title')}<span className="text-brand-primary">{t('form.budget_highlight')}</span></h1>}
                {step === 7 && <h1 className="text-4xl font-black uppercase tracking-tighter italic">{t('form.docs_title')}<span className="text-brand-primary">{t('form.docs_highlight')}</span></h1>}
                
                {step === 2 && (
                  <div className="space-y-6">
                    <ModernSelect label={t('form.fields.purpose')} options={LOAN_OFFERS.map(o => ({value:o.id, label:t(o.title)}))} value={formData.loanId} onChange={v => setFormData({...formData, loanId: v})} />
                    <div className="grid grid-cols-2 gap-6">
                       <input type="text" placeholder={t('form.placeholders.amount')} className={inputClass()} value={formData.amount} onChange={e => handleNumericInput('amount', e.target.value)} />
                       <input type="text" placeholder={t('form.placeholders.months')} className={inputClass()} value={formData.duration} onChange={e => handleNumericInput('duration', e.target.value)} />
                    </div>
                  </div>
                )}
                
                {step === 5 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1"><label className={labelClass}>{t('form.fields.income')}</label><input type="text" placeholder={t('form.placeholders.income')} className={inputClass()} value={formData.income} onChange={e => handleNumericInput('income', e.target.value)} /></div>
                     <div className="space-y-1"><label className={labelClass}>{t('form.fields.rent')}</label><input type="text" placeholder={t('form.placeholders.rent')} className={inputClass()} value={formData.rent} onChange={e => handleNumericInput('rent', e.target.value)} /></div>
                  </div>
                )}

                {step === 7 && (
                  <div className="space-y-4">
                    <div onClick={() => idFileRef.current?.click()} className={`p-6 border-2 border-dashed rounded-[2rem] flex items-center justify-between cursor-pointer transition-all ${formData.docIdentity ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                      <input type="file" ref={idFileRef} className="hidden" accept="image/*,.pdf" onChange={e => { if(e.target.files?.[0]) setFormData({...formData, docIdentity: e.target.files[0].name, docsUploaded: !!(formData.docAddress && formData.docIncome)}) }} />
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.docIdentity ? 'bg-emerald-50 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>
                          {formData.docIdentity ? <FileCheck size={24} /> : <IdCard size={24} />}
                        </div>
                        <p className="text-xs font-black uppercase">{formData.docIdentity || t('form.fields.id_doc')}</p>
                      </div>
                      {formData.docIdentity ? <Check size={18} className="text-emerald-500" /> : <UploadCloud size={18} />}
                    </div>
                    <div onClick={() => addressFileRef.current?.click()} className={`p-6 border-2 border-dashed rounded-[2rem] flex items-center justify-between cursor-pointer transition-all ${formData.docAddress ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                      <input type="file" ref={addressFileRef} className="hidden" accept="image/*,.pdf" onChange={e => { if(e.target.files?.[0]) setFormData({...formData, docAddress: e.target.files[0].name, docsUploaded: !!(formData.docIdentity && formData.docIncome)}) }} />
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.docAddress ? 'bg-emerald-50 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>
                          {formData.docAddress ? <FileCheck size={24} /> : <Home size={24} />}
                        </div>
                        <p className="text-xs font-black uppercase">{formData.docAddress || t('form.fields.address_doc')}</p>
                      </div>
                      {formData.docAddress ? <Check size={18} className="text-emerald-500" /> : <UploadCloud size={18} />}
                    </div>
                    <div onClick={() => incomeFileRef.current?.click()} className={`p-6 border-2 border-dashed rounded-[2rem] flex items-center justify-between cursor-pointer transition-all ${formData.docIncome ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                      <input type="file" ref={incomeFileRef} className="hidden" accept="image/*,.pdf" onChange={e => { if(e.target.files?.[0]) { const d = {...formData, docIncome: e.target.files[0].name}; d.docsUploaded = !!(d.docIdentity && d.docAddress && d.docIncome); setFormData(d); } }} />
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.docIncome ? 'bg-emerald-50 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>
                          {formData.docIncome ? <FileCheck size={24} /> : <Wallet size={24} />}
                        </div>
                        <p className="text-xs font-black uppercase">{formData.docIncome || t('form.fields.income_doc')}</p>
                      </div>
                      {formData.docIncome ? <Check size={18} className="text-emerald-500" /> : <UploadCloud size={18} />}
                    </div>
                  </div>
                )}
                
                <StandardButton onClick={handleNext} disabled={!isStepValid()} className="w-full !py-6 shadow-brand">{t('form.next')}</StandardButton>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-4 border-t border-slate-100 dark:border-slate-800 text-center shrink-0">
        <div className="flex items-center justify-center space-x-3 text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">
           <Lock size={12} className="text-emerald-500" />
           <span>{t('form.security_footer')}</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default ApplicationFormModal;