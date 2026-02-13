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

  const handleBlur = () => {
    finishEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setInputValue(value.toString());
      setIsEditing(false);
    }
  };

  const finishEditing = () => {
    let numValue = parseInt(inputValue.replace(/\s/g, ''));
    if (isNaN(numValue)) numValue = min;
    
    const validatedValue = Math.min(max, Math.max(min, numValue));
    onChange(validatedValue);
    setIsEditing(false);
  };

  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 shadow-inner-soft">
      <div className="flex justify-between items-center px-1">
        <span className="font-black uppercase tracking-widest text-[7px] text-slate-400">{label}</span>
        <div 
          className="relative text-lg lg:text-xl font-black text-slate-950 dark:text-white italic tracking-tighter cursor-text hover:text-brand-primary transition-colors"
          onClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none w-24 text-right p-0 font-black italic text-brand-primary"
            />
          ) : (
            <>
              {value.toLocaleString()} 
              <span className={`${unitColorClass} text-xs lg:text-sm ml-1 select-none`}>{unit}</span>
            </>
          )}
        </div>
      </div>
      <div className="px-1 pb-1">
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