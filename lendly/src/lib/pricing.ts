export function calcPricing(
  days: number, 
  dailyILS: number, 
  insurancePct = 0.05, 
  feePct = 0.18
) {
  const subtotal = days * dailyILS
  const insurance = Math.round(subtotal * insurancePct)
  const fee = Math.round(subtotal * feePct)
  const total = subtotal + insurance + fee
  
  return { subtotal, insurance, fee, total }
}
