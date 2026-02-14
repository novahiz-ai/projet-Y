export interface LoanLimits {
  minAmount: number;
  maxAmount: number;
  minDuration: number;
  maxDuration: number;
  step: number;
}

export const LOAN_LIMITS_CONFIG: Record<string, LoanLimits> = {
  immo: {
    minAmount: 50000,
    maxAmount: 500000000, // 500 Millions
    minDuration: 60,      // 5 ans
    maxDuration: 360,     // 30 ans
    step: 5000
  },
  conso: {
    minAmount: 1000,
    maxAmount: 75000,
    minDuration: 12,
    maxDuration: 84,
    step: 100
  },
  perso: {
    minAmount: 1000,
    maxAmount: 50000,
    minDuration: 12,
    maxDuration: 60,
    step: 100
  },
  auto: {
    minAmount: 1000,
    maxAmount: 100000,
    minDuration: 12,
    maxDuration: 72,
    step: 100
  },
  travaux: {
    minAmount: 1000,
    maxAmount: 150000,
    minDuration: 12,
    maxDuration: 120,
    step: 500
  },
  rapide: {
    minAmount: 500,
    maxAmount: 10000,
    minDuration: 3,
    maxDuration: 36,
    step: 50
  },
  rachat: {
    minAmount: 5000,
    maxAmount: 250000,
    minDuration: 24,
    maxDuration: 180,
    step: 1000
  },
  projet: {
    minAmount: 1000,
    maxAmount: 50000,
    minDuration: 12,
    maxDuration: 60,
    step: 100
  }
};

export const getLimitsForOffer = (offerId: string): LoanLimits => {
  return LOAN_LIMITS_CONFIG[offerId] || LOAN_LIMITS_CONFIG.perso;
};