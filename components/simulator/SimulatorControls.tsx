import React, { useEffect, useRef } from 'react';
import { LOAN_OFFERS } from '../../constants';
import ModernSelect from '../ModernSelect';
import SimulatorCurrencyToggle from './SimulatorCurrencyToggle';
import SliderInput from './SliderInput';
import { useTranslation } from 'react-i18next';
import { getLimitsForOffer } from '../../data/simulator/limits';

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
  const limits = getLimitsForOffer(selectedOfferId);
  const prevOfferIdRef = useRef(selectedOfferId);

  // LOGIQUE DE PROTECTION SOUVERAINE : Auto-ajustement des limites
  useEffect(() => {
    if (prevOfferIdRef.current !== selectedOfferId) {
      // Si on change de type de projet, on réinitialise au minimum réaliste de ce projet
      // pour éviter des situations absurdes (ex: Immo à 500€)
      onAmountChange(limits.minAmount);
      onDurationChange(limits.minDuration);
      prevOfferIdRef.current = selectedOfferId;
    } else {
      // Ajustement simple pour rester dans les bornes si modification manuelle
      if (amount < limits.minAmount) onAmountChange(limits.minAmount);
      if (amount > limits.maxAmount) onAmountChange(limits.maxAmount);
      if (duration < limits.minDuration) onDurationChange(limits.minDuration);
      if (duration > limits.maxDuration) onDurationChange(limits.maxDuration);
    }
  }, [selectedOfferId, limits, amount, duration, onAmountChange, onDurationChange]);

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto md:mx-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          label="Devise" 
        />
      </div>

      <div className="space-y-4">
        <SliderInput 
          label={t('simulator.amount')}
          value={amount}
          min={limits.minAmount}
          max={limits.maxAmount}
          step={limits.step}
          unit={currencySymbol}
          onChange={onAmountChange}
        />
        <SliderInput 
          label={t('simulator.duration')}
          value={duration}
          min={limits.minDuration}
          max={limits.maxDuration}
          unit="mois"
          step={1}
          onChange={onDurationChange}
        />
      </div>
    </div>
  );
};

export default SimulatorControls;