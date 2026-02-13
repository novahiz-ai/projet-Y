
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { LOAN_OFFERS } from '../constants';
import StandardButton from '../components/StandardButton';
import SimulatorControls from '../components/simulator/SimulatorControls';
import SimulationRecap from '../components/simulator/SimulationRecap';
import { calculateLoanDetails } from '../utils/loanMath';
import LegalWarning from '../components/LegalWarning';

const SimulatorPage: React.FC = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOfferId, setSelectedOfferId] = useState(LOAN_OFFERS[0].id);

  const selectedOffer = useMemo(() => 
    LOAN_OFFERS.find(o => o.id === selectedOfferId) || LOAN_OFFERS[0],
  [selectedOfferId]);

  const results = useMemo(() => 
    calculateLoanDetails(amount, duration, selectedOffer.minRate),
  [amount, duration, selectedOffer]);

  const currencies = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
    { code: 'GBP', symbol: '£' }
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-32 pb-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-5 py-2 rounded-2xl border border-brand-primary/20"
              >
                <TrendingUp size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Outil de Précision</span>
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic leading-[0.85] text-slate-950 dark:text-white">
                SIMULEZ VOTRE <br />
                <span className="text-brand-primary">AVENIR.</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                Configurez votre financement sur-mesure et recevez un accord de principe immédiat.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <SimulatorControls 
                selectedOfferId={selectedOfferId}
                onOfferChange={setSelectedOfferId}
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
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="p-10 bg-slate-950 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full"></div>
                <SimulationRecap 
                  results={results}
                  amount={amount}
                  rate={selectedOffer.minRate}
                  currencySymbol={currentCurrency.symbol}
                  onExport={() => {}}
                  onContinue={() => window.dispatchEvent(new CustomEvent('openSimulator'))}
                />
                
                <div className="mt-8 flex items-center justify-center space-x-3 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
                  <ShieldCheck size={18} />
                  <span>Taux Garanti {selectedOffer.minRate}%</span>
                </div>
              </div>

              <div className="p-8 bg-brand-primary/5 border border-brand-primary/10 rounded-[3rem] flex items-center space-x-6">
                <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap size={28} className="fill-current" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-slate-950 dark:text-white text-sm">Réponse Instantanée</h4>
                  <p className="text-xs text-slate-500 font-medium">Validation du dossier en 3 minutes chrono.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-40">
          <LegalWarning />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
