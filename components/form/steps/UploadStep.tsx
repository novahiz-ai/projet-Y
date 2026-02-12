
import React from 'react';
import { FileUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormLabel } from '../../ui/FormControls';

const UploadStep = ({ formData, setFormData, t, idFileRef, addressFileRef, incomeFileRef }: any) => {
  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const UploadItem = ({ label, field, fileRef, Icon }: any) => (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brand-primary/40 transition-all group relative overflow-hidden">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-colors">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-tight">{label}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {formData[field] ? formData[field].name : "Aucun fichier"}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => fileRef.current?.click()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${formData[field] ? 'bg-emerald-500 text-white shadow-lg' : 'bg-brand-primary text-white shadow-brand'}`}
        >
          {formData[field] ? <CheckCircle2 size={18} /> : <FileUp size={18} />}
        </button>
      </div>
      <input 
        type="file" 
        ref={fileRef} 
        className="hidden" 
        onChange={e => handleFileChange(field, e.target.files?.[0] || null)} 
      />
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
          {t('form.docs_title')}
          <span className="text-brand-primary">{t('form.docs_highlight')}</span>
        </h1>
        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Format PDF, JPG ou PNG uniquement.</p>
      </div>

      <div className="space-y-4">
        <UploadItem label={t('form.fields.id_doc')} field="docIdentity" fileRef={idFileRef} Icon={CheckCircle2} />
        <UploadItem label={t('form.fields.address_doc')} field="docAddress" fileRef={addressFileRef} Icon={FileUp} />
        <UploadItem label={t('form.fields.income_doc')} field="docIncome" fileRef={incomeFileRef} Icon={FileUp} />
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-start space-x-3 border border-amber-100 dark:border-amber-900/20">
        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-amber-700 dark:text-amber-400 font-bold leading-relaxed uppercase tracking-tighter">
          Les copies doivent être parfaitement lisibles et non tronquées pour garantir un traitement immédiat.
        </p>
      </div>
    </div>
  );
};

export default UploadStep;
