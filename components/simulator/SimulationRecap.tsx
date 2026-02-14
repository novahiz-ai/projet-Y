import React, { useEffect, useState } from 'react';
import { Download, Loader2, ArrowRight } from 'lucide-react';
import StandardButton from '../StandardButton';
import SimulatorCurrencyInfo from './SimulatorCurrencyInfo';
import SimulationPieChart from './SimulationPieChart';

interface SimulationRecapProps {
  results: {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
  };
  amount: number;
  rate: number;
  currencySymbol: string;
  isExporting?: boolean;
  onExport: () => void;
  onContinue: () => void;
  showActions?: boolean;
}

const SimulationRecap: React.FC<SimulationRecapProps> = ({ 
  results, amount, rate, currencySymbol, isExporting, onExport, onContinue, showActions = true 
}) => {
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');

  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--brand-primary').trim();
      if (color) setPrimaryColor(color);
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full h-full py-2">
      <div className="shrink-0">
        <SimulatorCurrencyInfo 
          monthlyPayment={results.monthlyPayment} 
          currencySymbol={currencySymbol} 
        />
      </div>

      <SimulationPieChart 
        amount={amount} 
        totalInterest={results.totalInterest} 
        primaryColor={primaryColor} 
        rate={rate} 
      />

      <div className="shrink-0 w-full grid grid-cols-2 gap-3 pb-2">
        <div className="p-3 lg:p-4 bg-slate-950 dark:bg-slate-900 rounded-[2rem] border border-slate-100/10 dark:border-slate-800 text-center shadow-sm">
          <p className="text-[8px] font-black text-white uppercase mb-1 tracking-wider opacity-60">Intérêts</p>
          <p className="text-sm font-black text-brand-primary italic transition-colors duration-500">{results.totalInterest.toLocaleString()} {currencySymbol}</p>
        </div>
        <div className="p-3 lg:p-4 bg-slate-950 dark:bg-slate-900 rounded-[2rem] border border-slate-100/10 dark:border-slate-800 text-center shadow-sm">
          <p className="text-[8px] font-black text-white uppercase mb-1 tracking-wider opacity-60">Total Dû</p>
          <p className="text-sm font-black text-orange-500 italic">{results.totalCost.toLocaleString()} {currencySymbol}</p>
        </div>
      </div>

      {showActions && (
        <div className="w-full flex gap-3 pt-2">
          <button 
            onClick={onExport} 
            disabled={isExporting} 
            className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all shadow-sm border border-slate-100 dark:border-slate-800 active:scale-95"
          >
            {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          </button>
          <StandardButton onClick={onContinue} className="flex-1 !py-3 shadow-brand group !rounded-xl">
            <span className="text-[11px] font-black uppercase tracking-widest">Continuer</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </StandardButton>
        </div>
      )}
    </div>
  );
};

export default SimulationRecap;