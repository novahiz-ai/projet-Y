import React from 'react';
import { Briefcase, Landmark } from 'lucide-react';
import { FormLabel } from '../../ui/FormControls';
import ModernSelect from '../../ModernSelect';
import { accountTypes, banks } from '../../../data/auth/signupData';

interface StepProps {
  data: any;
  update: (fields: any) => void;
}

const StepAccount: React.FC<StepProps> = ({ data, update }) => (
  <div className="w-full space-y-5">
    <div className="space-y-1">
      <FormLabel Icon={Briefcase}>Type de compte</FormLabel>
      <ModernSelect label="Type" options={accountTypes} value={data.accountType} onChange={v => update({ accountType: v })} />
    </div>
    <div className="space-y-1">
      <FormLabel Icon={Landmark}>Banque cible</FormLabel>
      <ModernSelect label="Établissement" options={banks} value={data.targetBank} onChange={v => update({ targetBank: v })} />
    </div>
  </div>
);

export default StepAccount;