import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { FormLabel } from '../../ui/FormControls';

interface StepProps {
  data: any;
  update: (fields: any) => void;
}

const StepPin: React.FC<StepProps> = ({ data, update }) => {
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 space-y-6">
      <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
        <Key size={32} />
      </div>
      <div className="w-full max-w-[240px] space-y-3">
        <FormLabel className="justify-center">Code PIN de sécurité</FormLabel>
        <div className="relative">
          <input 
            type={showPin ? "text" : "password"} 
            maxLength={6} 
            placeholder="••••••" 
            value={data.pinCode} 
            onChange={e => update({ pinCode: e.target.value.replace(/\D/g,'') })} 
            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl py-4 text-center text-2xl font-black tracking-[0.4em] text-brand-primary outline-none focus:border-brand-primary" 
          />
          <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary">
            {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <p className="text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest leading-relaxed">
        Ce code sera requis pour valider <br/> vos futures opérations.
      </p>
    </div>
  );
};

export default StepPin;