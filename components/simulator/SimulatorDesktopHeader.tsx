import React from 'react';
import { Calculator } from 'lucide-react';

const SimulatorDesktopHeader: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-3 mb-6 shrink-0">
      <div className="w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center">
        <Calculator size={18} />
      </div>
      <h2 className="text-xl font-black uppercase tracking-tighter italic text-slate-950 dark:text-white">
        Simulation <span className="text-brand-primary">personnalisée.</span>
      </h2>
    </div>
  );
};

export default SimulatorDesktopHeader;