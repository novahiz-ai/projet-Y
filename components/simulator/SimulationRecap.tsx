
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Download, Loader2, ArrowRight } from 'lucide-react';
import StandardButton from '../StandardButton';

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
    { name: 'Capital', value: amount, color: '#4f46e5' },
    { name: 'Intérêts', value: Math.max(1, results.totalInterest), color: '#818cf8' }
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Mensualité Estimée</span>
        <div className="flex items-center justify-center">
          <span className="text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">
            {results.monthlyPayment}
          </span>
          <span className="text-2xl font-black text-brand-primary ml-2 italic mt-4">{currencySymbol}</span>
        </div>
      </div>

      <div className="w-full h-40 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={chartData} cx="50%" cy="50%" 
              innerRadius="65%" outerRadius="85%" paddingAngle={5} 
              dataKey="value" stroke="none" animationDuration={800}
            >
              {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">TAEG Fixe</p>
          <p className="text-xl font-black text-brand-primary italic leading-none">{rate}%</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Intérêts</p>
          <p className="text-sm font-black">{results.totalInterest.toLocaleString()} {currencySymbol}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Total Dû</p>
          <p className="text-sm font-black text-brand-primary">{results.totalCost.toLocaleString()} {currencySymbol}</p>
        </div>
      </div>

      {showActions && (
        <div className="w-full flex gap-3">
          <button 
            onClick={onExport} 
            disabled={isExporting} 
            className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all shadow-sm border border-slate-100 dark:border-slate-700 active:scale-95"
          >
            {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
          </button>
          <StandardButton onClick={onContinue} className="flex-1 !py-4 shadow-brand group !rounded-2xl">
            <span>Continuer</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </StandardButton>
        </div>
      )}

      <div className="flex items-center space-x-3 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
        <ShieldCheck size={16} />
        <span>Taux Garanti Younited</span>
      </div>
    </div>
  );
};

export default SimulationRecap;
