// Pricing calculation logic
import { PricingResult, PricingBreakdown } from './schemas';

export const calculatePricing = (params: {
  dailyPriceILS: number;
  startDate: Date;
  endDate: Date;
  depositILS: number;
  pickupMethod: 'SELF_PICKUP' | 'COURIER' | 'LOCKER';
  insuranceEnabled: boolean;
}): PricingResult => {
  const totalDays = Math.ceil((params.endDate.getTime() - params.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const subtotalILS = params.dailyPriceILS * totalDays;
  
  const breakdown: PricingBreakdown[] = [
    {
      description: `השכרה ל-${totalDays} ימים`,
      amountILS: subtotalILS,
    },
  ];

  let totalILS = subtotalILS;

  // Add pickup fees
  if (params.pickupMethod === 'COURIER') {
    const courierFee = 50; // ILS
    breakdown.push({
      description: 'דמי משלוח',
      amountILS: courierFee,
    });
    totalILS += courierFee;
  } else if (params.pickupMethod === 'LOCKER') {
    const lockerFee = 25; // ILS
    breakdown.push({
      description: 'דמי תא לוקר',
      amountILS: lockerFee,
    });
    totalILS += lockerFee;
  }

  // Add insurance fee
  if (params.insuranceEnabled) {
    const insuranceFee = Math.round(subtotalILS * 0.1); // 10% of rental
    breakdown.push({
      description: 'ביטוח פרימיום',
      amountILS: insuranceFee,
    });
    totalILS += insuranceFee;
  }

  return {
    dailyPriceILS: params.dailyPriceILS,
    totalDays,
    subtotalILS,
    depositILS: params.depositILS,
    totalILS,
    breakdown,
  };
};

// Calculate deposit based on risk assessment
export const calculateDeposit = (
  baseDepositILS: number,
  riskMultiplier: number
): number => {
  return Math.round(baseDepositILS * riskMultiplier);
};

// Format pricing for display
export const formatPricingBreakdown = (result: PricingResult): string[] => {
  return result.breakdown.map(item => 
    `${item.description}: ₪${item.amountILS.toLocaleString('he-IL')}`
  );
};
