import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  error?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, label, error }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse initial date or default to 20 years ago for DOB context
  const initialDate = value ? new Date(value) : new Date(new Date().getFullYear() - 20, 0, 1);
  const [viewDate, setViewDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days');

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const handlePrev = () => {
    if (viewMode === 'days') setViewDate(new Date(currentYear, currentMonth - 1, 1));
    else if (viewMode === 'years') setViewDate(new Date(currentYear - 12, currentMonth, 1));
  };

  const handleNext = () => {
    if (viewMode === 'days') setViewDate(new Date(currentYear, currentMonth + 1, 1));
    else if (viewMode === 'years') setViewDate(new Date(currentYear + 12, currentMonth, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    onChange(newDate.toISOString().split('T')[0]);
    // On laisse l'utilisateur voir sa sélection avant de fermer ou on ferme direct selon préférence UX
    setIsOpen(false);
  };

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(i18n.language, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentYear, currentMonth);
    const startOffset = (firstDayOfMonth(currentYear, currentMonth) + 6) % 7; // Adjust to start Monday

    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const isSelected = selectedDate?.getDate() === d && 
                         selectedDate?.getMonth() === currentMonth && 
                         selectedDate?.getFullYear() === currentYear;
      
      days.push(
        <button
          key={d}
          type="button"
          onClick={() => handleDateClick(d)}
          className={`h-10 w-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
            isSelected 
              ? 'bg-brand-primary text-white shadow-brand scale-110' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const renderYears = () => {
    const startYear = currentYear - 6;
    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {Array.from({ length: 12 }, (_, i) => startYear + i).map(y => (
          <button
            key={y}
            type="button"
            onClick={() => { setViewDate(new Date(y, currentMonth, 1)); setViewMode('months'); }}
            className={`h-12 rounded-2xl text-xs font-bold transition-all ${
              y === currentYear ? 'bg-brand-primary text-white shadow-brand scale-105' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100'
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-1 relative">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1 flex items-center space-x-2 mb-2">
        <CalendarIcon size={12} />
        <span>{label}</span>
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-2xl py-4 px-6 font-bold text-lg text-left transition-all outline-none flex items-center justify-between ${
          error ? 'border-rose-500' : isOpen ? 'border-brand-primary ring-4 ring-brand-primary/10' : 'border-transparent'
        } ${!value ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}
      >
        <span>{value ? formatDateDisplay(new Date(value)) : "JJ / MM / AAAA"}</span>
        <CalendarIcon size={20} className={isOpen ? 'text-brand-primary' : 'text-slate-400'} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[380px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-3xl overflow-hidden"
            >
              {/* Header Control */}
              <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <button type="button" onClick={handlePrev} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-slate-400">
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex space-x-2">
                  <button 
                    type="button"
                    onClick={() => setViewMode(viewMode === 'months' ? 'days' : 'months')}
                    className="px-4 py-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white transition-all active:scale-95"
                  >
                    {months[currentMonth]}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setViewMode(viewMode === 'years' ? 'days' : 'years')}
                    className="px-4 py-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white transition-all active:scale-95"
                  >
                    {currentYear}
                  </button>
                </div>

                <button type="button" onClick={handleNext} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-slate-400">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Viewport */}
              <div className="p-6">
                {viewMode === 'days' && (
                  <>
                    <div className="grid grid-cols-7 mb-4">
                      {['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'].map(d => (
                        <div key={d} className="text-[9px] font-black text-slate-400 text-center uppercase tracking-widest">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {renderDays()}
                    </div>
                  </>
                )}

                {viewMode === 'months' && (
                  <div className="grid grid-cols-3 gap-3">
                    {months.map((m, i) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => { setViewDate(new Date(currentYear, i, 1)); setViewMode('days'); }}
                        className={`py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                          i === currentMonth ? 'bg-brand-primary text-white shadow-brand scale-105' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}

                {viewMode === 'years' && renderYears()}
              </div>
              
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => {
                    setViewDate(new Date());
                    setViewMode('days');
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors"
                >
                  Aujourd'hui
                </button>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-brand-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-brand active:scale-95 transition-all flex items-center space-x-2"
                >
                  <Check size={14} />
                  <span>Fermer</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDatePicker;