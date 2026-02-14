import React, { useState, useRef, useEffect } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString());
    }
  }, [value, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ne garder que les chiffres
    const val = e.target.value.replace(/\D/g, '');
    setInputValue(val);
    
    const num = parseInt(val);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    let numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < min) numValue = min;
    if (numValue > max) numValue = max;
    
    onChange(numValue);
    setInputValue(numValue.toString());
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-3 shadow-sm transition-all hover:border-brand-primary/20">
      <div className="flex justify-between items-center px-1">
        <span className="font-black uppercase tracking-widest text-[9px] text-slate-400">{label}</span>
        <div className="flex items-baseline space-x-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
              className="bg-transparent border-none outline-none w-32 text-right p-0 font-black italic text-xl text-brand-primary"
            />
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-xl lg:text-2xl font-black text-slate-950 dark:text-white italic tracking-tighter hover:text-brand-primary transition-colors text-right"
            >
              {value.toLocaleString()}
            </button>
          )}
          <span className={`${unitColorClass} text-xs font-black uppercase italic ml-1 select-none`}>{unit}</span>
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
          style={{ backgroundImage: `linear-gradient(to right, ${gradientColor} ${progress}%, #f1f5f9 ${progress}%)` }} 
          className="simulator-slider w-full h-1.5 appearance-none rounded-full cursor-pointer bg-slate-100 dark:bg-slate-800" 
        />
      </div>

      <div className="flex justify-between px-1">
        <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Min {min.toLocaleString()}</span>
        <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Max {max.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SliderInput;