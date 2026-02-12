
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, Loader2, ArrowRight } from 'lucide-react';
import StandardButton from '../StandardButton';
import SimulatorCurrencyInfo from './SimulatorCurrencyInfo';

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
  const chartData = [
    { name: 'Capital', value: amount, color: '#f97316' },
    { name: 'Intérêts', value: Math.max(1, results.totalInterest), color: '#ffffff' }
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full py-4">
      <SimulatorCurrencyInfo 
        monthlyPayment={results.monthlyPayment} 
        currencySymbol={currencySymbol} 
      />

      <div className="w-full h-64 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={chartData} cx="50%" cy="50%" 
              innerRadius="75%" outerRadius="100%" paddingAngle={6} 
              dataKey="value" stroke="none" animationDuration={1000}
            >
              {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">TAEG Fixe</p>
          <p className="text-2xl font-black text-brand-primary italic leading-none">{rate}%</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-950 dark:bg-slate-900 rounded-3xl border border-slate-800 text-center shadow-sm">
          <p className="text-[9px] font-black text-white uppercase mb-1">Intérêts</p>
          <p className="text-sm font-black text-white">{results.totalInterest.toLocaleString()} {currencySymbol}</p>
        </div>
        <div className="p-4 bg-slate-950 dark:bg-slate-900 rounded-3xl border border-slate-800 text-center shadow-sm">
          <p className="text-[9px] font-black text-white uppercase mb-1">Total Dû</p>
          <p className="text-sm font-black text-orange-500">{results.totalCost.toLocaleString()} {currencySymbol}</p>
        </div>
      </div>

      {showActions && (
        <div className="w-full flex gap-4 pt-2">
          <button 
            onClick={onExport} 
            disabled={isExporting} 
            className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all shadow-sm border border-slate-100 dark:border-slate-800 active:scale-95"
          >
            {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
          </button>
          <StandardButton onClick={onContinue} className="flex-1 !py-4 shadow-brand group !rounded-2xl">
            <span className="text-sm">Continuer</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </StandardButton>
        </div>
      )}
    </div>
  );
};

export default SimulationRecap;
