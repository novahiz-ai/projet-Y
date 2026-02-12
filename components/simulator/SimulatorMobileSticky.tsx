
import React from 'react';
import { ArrowRight, Download, Loader2 } from 'lucide-react';
import StandardButton from '../StandardButton';

interface SimulatorMobileStickyProps {
  results: {
    monthlyPayment: number;
    totalCost: number;
  };
  currencySymbol: string;
  onContinue: () => void;
  onExport: () => void;
  isExporting: boolean;
}

const SimulatorMobileSticky: React.FC<SimulatorMobileStickyProps> = ({ 
  results, currencySymbol, onContinue, onExport, isExporting 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[3.5rem] px-6 pt-6 pb-[15px] space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.3em]">Mensualité</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-[36px] font-black italic text-slate-900 dark:text-white leading-none">{results.monthlyPayment}</span>
            <span className="text-xl font-black text-brand-primary italic leading-none">{currencySymbol}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black uppercase text-orange-500 tracking-[0.3em]">Total dû</p>
          <p className="text-lg font-black italic text-slate-900 dark:text-white leading-none">
            {results.totalCost.toLocaleString()} <span className="text-brand-primary">{currencySymbol}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <StandardButton 
          onClick={onContinue} 
          className="flex-1 !py-4 shadow-brand !rounded-2xl !text-[10px]"
        >
          <span>Continuer</span>
          <ArrowRight size={16} />
        </StandardButton>
        <button 
          onClick={onExport}
          className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-800"
        >
          {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
        </button>
      </div>
    </div>
  );
};

export default SimulatorMobileSticky;
