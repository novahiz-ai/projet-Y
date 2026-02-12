
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LOAN_OFFERS } from '../constants';
import ModernSelect from './ModernSelect';
import SimulationRecap from './simulator/SimulationRecap';
import { calculateLoanDetails, getProgressPercentage } from '../utils/loanMath';
import { exportElementToPdf } from '../utils/pdfExport';

const currencies = [{ code: 'EUR', symbol: '€' }, { code: 'USD', symbol: '$' }, { code: 'GBP', symbol: '£' }];

interface SimulatorModalProps {
  isOpen: boolean; onClose: () => void; onProceedToApp?: (context: any) => void; initialOfferId?: string;
}

const SimulatorModal: React.FC<SimulatorModalProps> = ({ isOpen, onClose, onProceedToApp, initialOfferId }) => {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const recapRef = useRef<HTMLDivElement>(null);
  
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOffer, setSelectedOffer] = useState(initialOfferId ? LOAN_OFFERS.find(o => o.id === initialOfferId) || LOAN_OFFERS[0] : LOAN_OFFERS[0]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const results = useMemo(() => calculateLoanDetails(amount, duration, selectedOffer.minRate), [amount, duration, selectedOffer]);
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const handleExport = async () => {
    if (!recapRef.current) return;
    setIsExporting(true);
    try {
      await exportElementToPdf(recapRef.current, `Simulation_United_${amount}.pdf`, { 
        dark: document.documentElement.classList.contains('dark'),
        title: 'VOTRE RÉCAPITULATIF UNITED'
      });
    } finally { setIsExporting(false); }
  };

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", damping: 25 }} className="relative w-full h-full md:max-w-5xl md:h-[550px] bg-white dark:bg-slate-950 md:rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800">
        <header className="shrink-0 px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl z-[100]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-brand"><TrendingUp size={16} /></div>
            <span className="text-lg font-black uppercase tracking-tighter text-slate-900 dark:text-white italic leading-none">{t('simulator.title')}</span>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:hover:bg-rose-500 dark:hover:text-white rounded-xl text-slate-500 transition-all"><X size={18} /></button>
        </header>
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          <div className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-hide pb-[200px] md:pb-8">
            <div className="space-y-8 w-full max-w-xl mx-auto md:mx-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ModernSelect label={t('simulator.project')} options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))} value={selectedOffer.id} onChange={val => setSelectedOffer(LOAN_OFFERS.find(o => o.id === val)!)} />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Devise</label>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                    {currencies.map(cur => (
                      <button key={cur.code} onClick={() => setCurrency(cur.code)} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${currency === cur.code ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-400'}`}>{cur.code}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-inner-soft">
                  <div className="flex justify-between items-center"><span className="font-black uppercase tracking-widest text-[9px] text-slate-400">{t('simulator.amount')}</span><div className="text-2xl font-black text-slate-950 dark:text-white italic">{amount.toLocaleString()} {currentCurrency.symbol}</div></div>
                  <input type="range" min="500" max={selectedOffer.maxAmount || 150000} step="100" value={amount} onChange={e => setAmount(Number(e.target.value))} style={{ backgroundImage: `linear-gradient(to right, var(--brand-primary) ${getProgressPercentage(amount, 500, selectedOffer.maxAmount || 150000)}%, #e2e8f0 ${getProgressPercentage(amount, 500, selectedOffer.maxAmount || 150000)}%)` }} className="simulator-slider w-full h-1 appearance-none rounded-full cursor-pointer bg-slate-200" />
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-inner-soft">
                  <div className="flex justify-between items-center"><span className="font-black uppercase tracking-widest text-[9px] text-slate-400">{t('simulator.duration')}</span><div className="text-2xl font-black text-slate-950 dark:text-white italic">{duration} <span className="text-brand-primary text-sm uppercase">{t('simulator.months')}</span></div></div>
                  <input type="range" min="6" max={120} step="1" value={duration} onChange={e => setDuration(Number(e.target.value))} style={{ backgroundImage: `linear-gradient(to right, #818cf8 ${getProgressPercentage(duration, 6, 120)}%, #e2e8f0 ${getProgressPercentage(duration, 6, 120)}%)` }} className="simulator-slider w-full h-1 appearance-none rounded-full cursor-pointer bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
          <div ref={recapRef} className="hidden md:flex md:w-[400px] p-10 bg-slate-50/50 dark:bg-slate-900/30 border-l border-slate-100 dark:border-slate-800">
            <SimulationRecap 
              results={results}
              amount={amount}
              rate={selectedOffer.minRate}
              currencySymbol={currentCurrency.symbol}
              isExporting={isExporting}
              onExport={handleExport}
              onContinue={() => onProceedToApp?.({...results, loanId: selectedOffer.id, amount, duration})}
            />
          </div>
        </main>
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: `.simulator-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 26px; height: 26px; background: #ffffff; border: 6px solid var(--brand-primary); border-radius: 50%; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }` }} />
    </motion.div>
  );
};

export default SimulatorModal;
