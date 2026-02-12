
import React from 'react';

interface SimulatorCurrencyInfoProps {
  monthlyPayment: number;
  currencySymbol: string;
}

const SimulatorCurrencyInfo: React.FC<SimulatorCurrencyInfoProps> = ({ monthlyPayment, currencySymbol }) => {
  return (
    <div className="text-center space-y-1">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Mensualité Estimée</span>
      <div className="flex items-center justify-center">
        <span className="text-[36px] font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">
          {monthlyPayment}
        </span>
        <span className="text-xl font-black text-slate-950 dark:text-white ml-2 italic mt-1 uppercase">euro</span>
        <span className="text-xl font-black text-orange-500 ml-1 italic mt-1">{currencySymbol}</span>
      </div>
    </div>
  );
};

export default SimulatorCurrencyInfo;
