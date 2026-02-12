
import React from 'react';

interface Currency {
  code: string;
  symbol: string;
}

interface SimulatorCurrencyToggleProps {
  currencies: Currency[];
  currentCurrency: string;
  onCurrencyChange: (code: string) => void;
  label: string;
}

const SimulatorCurrencyToggle: React.FC<SimulatorCurrencyToggleProps> = ({ 
  currencies, currentCurrency, onCurrencyChange, label 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{label}</label>
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner-soft">
        {currencies.map(cur => (
          <button 
            key={cur.code} 
            onClick={() => onCurrencyChange(cur.code)} 
            className={`flex-1 py-2.5 rounded-xl text-[9px] font-black transition-all ${
              currentCurrency === cur.code 
                ? 'bg-white dark:bg-slate-700 text-orange-500 shadow-sm' 
                : 'text-orange-500/60 hover:text-orange-500'
            }`}
          >
            {cur.code}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimulatorCurrencyToggle;
