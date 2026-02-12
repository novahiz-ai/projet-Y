
import React from 'react';
import { LOAN_OFFERS } from '../../constants';
import ModernSelect from '../ModernSelect';
import SimulatorCurrencyToggle from './SimulatorCurrencyToggle';
import SliderInput from './SliderInput';
import { useTranslation } from 'react-i18next';

interface SimulatorControlsProps {
  selectedOfferId: string;
  onOfferChange: (id: string) => void;
  currency: string;
  onCurrencyChange: (code: string) => void;
  amount: number;
  onAmountChange: (val: number) => void;
  duration: number;
  onDurationChange: (val: number) => void;
  currencySymbol: string;
  currencies: any[];
}

const SimulatorControls: React.FC<SimulatorControlsProps> = ({
  selectedOfferId, onOfferChange, currency, onCurrencyChange,
  amount, onAmountChange, duration, onDurationChange,
  currencySymbol, currencies
}) => {
  const { t } = useTranslation();
  const selectedOffer = LOAN_OFFERS.find(o => o.id === selectedOfferId) || LOAN_OFFERS[0];

  return (
    <div className="space-y-8 lg:space-y-10 w-full max-w-xl mx-auto md:mx-0">
      <div className="hidden md:block space-y-1">
         <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none text-slate-950 dark:text-white">{t('simulator.title')}</h2>
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Projet de financement United</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        <ModernSelect 
          label={t('simulator.project')} 
          options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))} 
          value={selectedOfferId} 
          onChange={onOfferChange} 
        />
        <SimulatorCurrencyToggle 
          currencies={currencies} 
          currentCurrency={currency} 
          onCurrencyChange={onCurrencyChange} 
          label="Devise de référence" 
        />
      </div>

      <div className="space-y-4 lg:space-y-6">
        <SliderInput 
          label={t('simulator.amount')}
          value={amount}
          min={500}
          max={selectedOffer.maxAmount || 150000}
          step={100}
          unit={currencySymbol}
          unitColorClass="text-brand-primary"
          onChange={onAmountChange}
        />
        <SliderInput 
          label={t('simulator.duration')}
          value={duration}
          min={6}
          max={120}
          unit="mois"
          unitColorClass="text-brand-primary"
          gradientColor="var(--brand-primary)"
          onChange={onDurationChange}
        />
      </div>
    </div>
  );
};

export default SimulatorControls;
