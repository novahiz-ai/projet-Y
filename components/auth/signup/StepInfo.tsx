import React from 'react';
import { Phone } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';
import CustomDatePicker from '../../CustomDatePicker';
import CountrySelector from '../../CountrySelector';

interface StepProps {
  data: any;
  update: (fields: any) => void;
}

const StepInfo: React.FC<StepProps> = ({ data, update }) => {
  return (
    <div className="w-full space-y-5">
      <div className="space-y-1">
        <CustomDatePicker 
          label="Date de naissance" 
          value={data.birthDate} 
          onChange={val => update({ birthDate: val })} 
        />
      </div>
      <div className="space-y-1">
        <CountrySelector 
          label="Pays de résidence" 
          value={data.country} 
          onChange={country => update({ 
            country: country.code, 
            phonePrefix: country.dialCode 
          })} 
        />
      </div>
      <div className="space-y-1">
        <FormLabel Icon={Phone}>Téléphone</FormLabel>
        <div className="flex space-x-2">
          <div className="w-24 shrink-0 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center font-black text-brand-primary text-xs italic shadow-inner-soft">
            {data.phonePrefix}
          </div>
          <FormInput 
            placeholder="06 12 34..." 
            value={data.phone} 
            onChange={e => update({ phone: e.target.value })} 
          />
        </div>
      </div>
    </div>
  );
};

export default StepInfo;