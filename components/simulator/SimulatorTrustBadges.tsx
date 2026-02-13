import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

const SimulatorTrustBadges: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
      <div className="flex items-center space-x-2">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Étude immédiate</span>
      </div>
      <div className="flex items-center space-x-2">
        <Zap size={14} className="text-brand-primary" />
        <span>Réponse en 3min</span>
      </div>
    </div>
  );
};

export default SimulatorTrustBadges;