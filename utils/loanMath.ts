
/**
 * Calcule les détails d'un prêt (mensualité, intérêts, coût total).
 */
export const calculateLoanDetails = (amount: number, duration: number, annualRate: number) => {
  const monthlyRate = annualRate / 100 / 12;
  const n = duration;
  
  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = amount / duration;
  } else {
    monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }
  
  const totalCost = monthlyPayment * n;
  const totalInterest = totalCost - amount;
  
  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost)
  };
};

export const getProgressPercentage = (current: number, min: number, max: number) => {
  return ((current - min) / (max - min)) * 100;
};
