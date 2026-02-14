import React from 'react';
import { User } from 'lucide-react';
import { FormLabel, FormInput } from '../../ui/FormControls';
import GenderSelector from '../../GenderSelector';

interface StepProps {
  data: any;
  update: (fields: any) => void;
}

const StepIdentity: React.FC<StepProps> = ({ data, update }) => (
  <div className="w-full space-y-5">
    <div className="space-y-1">
      <GenderSelector 
        value={data.sex} 
        onChange={v => update({ sex: v })} 
        required 
      />
    </div>
    <div className="space-y-1">
      <FormLabel Icon={User} required>Nom de famille</FormLabel>
      <FormInput 
        placeholder="Dupont" 
        value={data.lastName} 
        onChange={e => update({ lastName: e.target.value })} 
      />
    </div>
    <div className="space-y-1">
      <FormLabel Icon={User} required>Prénom</FormLabel>
      <FormInput 
        placeholder="Jean" 
        value={data.firstName} 
        onChange={e => update({ firstName: e.target.value })} 
      />
    </div>
  </div>
);

export default StepIdentity;