import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';

interface StepProps {
  data: any;
  update: (fields: any) => void;
}

const StepSecurity: React.FC<StepProps> = ({ data, update }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1">
        <FormLabel Icon={Mail}>Email personnel</FormLabel>
        <FormInput type="email" placeholder="exemple@email.com" value={data.email} onChange={e => update({ email: e.target.value })} />
      </div>
      <div className="space-y-1">
        <FormLabel Icon={Lock}>Mot de passe</FormLabel>
        <div className="relative">
          <FormInput type={showPass ? "text" : "password"} placeholder="••••••••" value={data.password} onChange={e => update({ password: e.target.value })} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary">
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <FormLabel Icon={Lock}>Confirmation</FormLabel>
        <div className="relative">
          <FormInput type={showConfirm ? "text" : "password"} placeholder="Re-saisir le mot de passe" value={data.confirmPassword} onChange={e => update({ confirmPassword: e.target.value })} />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary">
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepSecurity;