// Risk assessment logic
export interface RiskFactor {
  name: string;
  impact: number; // multiplier (1.0 = no impact, 2.0 = double risk)
  description: string;
}

export interface RiskAssessment {
  baseDepositILS: number;
  factors: RiskFactor[];
  finalDepositILS: number;
  deductibleILS: number;
}

// Base deposit amounts by category (in ILS)
const BASE_DEPOSITS = {
  DRONE: 2000,
  CAMERA: 1500,
  POWER_TOOL: 800,
  EVENTS: 1200,
  OTHER: 1000,
} as const;

// Deductible amounts by category (in ILS)
const DEDUCTIBLES = {
  DRONE: 500,
  CAMERA: 300,
  POWER_TOOL: 200,
  EVENTS: 400,
  OTHER: 250,
} as const;

export const assessRisk = (inputs: {
  category: keyof typeof BASE_DEPOSITS;
  startDate: Date;
  endDate: Date;
  pickupMethod: 'SELF_PICKUP' | 'COURIER' | 'LOCKER';
  insuranceEnabled: boolean;
  renterVerified: boolean;
}): RiskAssessment => {
  const factors: RiskFactor[] = [];
  let multiplier = 1.0;

  const baseDeposit = BASE_DEPOSITS[inputs.category];
  const deductible = DEDUCTIBLES[inputs.category];

  // Duration factor
  const totalDays = Math.ceil((inputs.endDate.getTime() - inputs.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (totalDays > 7) {
    const durationFactor = Math.min(1.5, 1 + (totalDays - 7) * 0.1);
    multiplier *= durationFactor;
    factors.push({
      name: 'משך השכרה ארוך',
      impact: durationFactor,
      description: `השכרה ל-${totalDays} ימים`,
    });
  }

  // Pickup method factor
  if (inputs.pickupMethod === 'COURIER') {
    multiplier *= 1.3;
    factors.push({
      name: 'איסוף באמצעות שליח',
      impact: 1.3,
      description: 'סיכון נוסף במשלוח',
    });
  } else if (inputs.pickupMethod === 'LOCKER') {
    multiplier *= 1.2;
    factors.push({
      name: 'איסוף מתא לוקר',
      impact: 1.2,
      description: 'סיכון נוסף באחסון',
    });
  }

  // Insurance factor (reduces deposit)
  if (inputs.insuranceEnabled) {
    multiplier *= 0.7;
    factors.push({
      name: 'ביטוח פרימיום',
      impact: 0.7,
      description: 'הפחתת ערבון עם ביטוח',
    });
  }

  // Verification factor
  if (!inputs.renterVerified) {
    multiplier *= 1.4;
    factors.push({
      name: 'שוכר לא מאומת',
      impact: 1.4,
      description: 'נדרש אימות נוסף',
    });
  }

  // Weekend/holiday factor (simplified)
  const isWeekend = inputs.startDate.getDay() === 5 || inputs.startDate.getDay() === 6;
  if (isWeekend) {
    multiplier *= 1.1;
    factors.push({
      name: 'השכרה בסוף שבוע',
      impact: 1.1,
      description: 'סיכון נוסף בסוף שבוע',
    });
  }

  const finalDeposit = Math.round(baseDeposit * multiplier);

  return {
    baseDepositILS: baseDeposit,
    factors,
    finalDepositILS: finalDeposit,
    deductibleILS: deductible,
  };
};

export const generateRiskExplanation = (assessment: RiskAssessment): string => {
  if (assessment.factors.length === 0) {
    return 'ערבון בסיסי לפי קטגוריה';
  }

  const factorDescriptions = assessment.factors.map(factor => 
    `${factor.description} (${factor.impact > 1 ? '+' : ''}${Math.round((factor.impact - 1) * 100)}%)`
  );

  return `ערבון מחושב לפי: ${factorDescriptions.join(', ')}`;
};
