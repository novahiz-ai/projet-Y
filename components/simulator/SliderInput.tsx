
import React from 'react';
import { getProgressPercentage } from '../../utils/loanMath';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  unitColorClass?: string;
  gradientColor?: string;
  onChange: (val: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ 
  label, value, min, max, step = 1, unit, unitColorClass = "text-brand-primary", gradientColor = "var(--brand-primary)", onChange 
}) => {
  const progress = getProgressPercentage(value, min, max);

  return (
    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-inner-soft">
      <div className="flex justify-between items-center px-1">
        <span className="font-black uppercase tracking-widest text-[9px] text-slate-400">{label}</span>
        <div className="text-2xl lg:text-3xl font-black text-slate-950 dark:text-white italic tracking-tighter">
          {value.toLocaleString()} <span className={`${unitColorClass} text-lg lg:text-xl ml-0.5`}>{unit}</span>
        </div>
      </div>
      <div className="px-1">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={e => onChange(Number(e.target.value))} 
          style={{ backgroundImage: `linear-gradient(to right, ${gradientColor} ${progress}%, #e2e8f0 ${progress}%)` }} 
          className="simulator-slider w-full h-1 appearance-none rounded-full cursor-pointer bg-slate-200" 
        />
      </div>
    </div>
  );
};

export default SliderInput;
