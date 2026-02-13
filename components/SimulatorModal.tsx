import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, TrendingUp, Download, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LOAN_OFFERS } from '../constants';
import SimulationRecap from './simulator/SimulationRecap';
import SimulatorControls from './simulator/SimulatorControls';
import SimulatorMobileSticky from './simulator/SimulatorMobileSticky';
import SimulatorDesktopHeader from './simulator/SimulatorDesktopHeader';
import SimulatorTrustBadges from './simulator/SimulatorTrustBadges';
import { calculateLoanDetails } from '../utils/loanMath';
import { exportElementToPdf } from '../utils/pdfExport';
import StandardButton from './StandardButton';

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
      await exportElementToPdf(recapRef.current, `Simulation_Younited_${amount}.pdf`, { 
        dark: document.documentElement.classList.contains('dark'),
        title: 'VOTRE RÉCAPITULATIF'
      });
    } finally { setIsExporting(false); }
  };

  const handleContinue = () => onProceedToApp?.({...results, loanId: selectedOffer.id, amount, duration});

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 300, damping: 30 }} 
        className="relative w-full h-full md:max-w-6xl md:h-[500px] bg-white dark:bg-slate-950 md:rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        <button 
          onClick={onClose} 
          className="hidden md:flex absolute top-[15px] right-[15px] w-9 h-9 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl items-center justify-center text-slate-400 hover:text-rose-500 hover:shadow-lg transition-all z-[160] border border-slate-100 dark:border-slate-700 active:scale-90"
        >
          <X size={18} />
        </button>

        <header className="md:hidden shrink-0 px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl z-[100]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-brand"><TrendingUp size={16} /></div>
            <span className="text-base font-black uppercase tracking-tighter text-slate-950 dark:text-white italic leading-none">{t('simulator.title')}</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-500 transition-all active:scale-90"><X size={18} /></button>
        </header>

        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0">
          <div className="flex-1 p-[20px] md:p-[25px] overflow-y-auto pb-[240px] md:pb-[25px] flex flex-col">
            <SimulatorDesktopHeader />

            <div className="flex-1 min-h-0">
              <SimulatorControls 
                selectedOfferId={selectedOffer.id}
                onOfferChange={(id) => setSelectedOffer(LOAN_OFFERS.find(o => o.id === id)!)}
                currency={currency}
                onCurrencyChange={setCurrency}
                amount={amount}
                onAmountChange={setAmount}
                duration={duration}
                onDurationChange={setDuration}
                currencySymbol={currentCurrency.symbol}
                currencies={currencies}
              />
            </div>

            <div className="hidden md:flex flex-col space-y-6 pt-4 shrink-0">
              <SimulatorTrustBadges />
              <div className="flex gap-4 max-w-xl mx-auto md:mx-0">
                <StandardButton onClick={handleContinue} className="flex-1 !py-4 shadow-brand group !rounded-xl">
                  <span className="text-[11px] uppercase tracking-widest font-black">Continuer vers ma demande</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </StandardButton>
                <button 
                  onClick={handleExport} 
                  disabled={isExporting} 
                  className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95"
                >
                  {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div ref={recapRef} className="hidden md:flex md:w-[400px] lg:w-[450px] p-[25px] bg-slate-50/50 dark:bg-slate-900/30 border-l border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <SimulationRecap 
              results={results}
              amount={amount}
              rate={selectedOffer.minRate}
              currencySymbol={currentCurrency.symbol}
              isExporting={isExporting}
              onExport={handleExport}
              onContinue={() => {}} 
              showActions={false}
            />
          </div>

          <SimulatorMobileSticky 
            results={results} 
            currencySymbol={currentCurrency.symbol} 
            onContinue={handleContinue} 
            onExport={handleExport} 
            isExporting={isExporting} 
          />
        </main>
      </motion.div>
      <style dangerouslySetInnerHTML={{ __html: `.simulator-slider::-webkit-scrollbar { display: none; } .simulator-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; background: #ffffff; border: 5px solid var(--brand-primary); border-radius: 50%; cursor: pointer; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1); }` }} />
    </motion.div>
  );
};

export default SimulatorModal;