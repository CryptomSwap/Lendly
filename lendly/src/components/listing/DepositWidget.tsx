'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useI18n } from '@/i18n';
import { formatCurrencyILS } from '@/lib/format';

interface DepositWidgetProps {
  itemId: string;
  category: string;
  startDate?: Date;
  endDate?: Date;
  insurance?: boolean;
  pickupMethod?: 'pickup' | 'delivery';
}

interface DepositData {
  depositAmount: number;
  riskFactors: string[];
  deductible: number;
  claimWindow: string;
  explanation: {
    baseAmount: number;
    durationMultiplier: number;
    pickupMultiplier: number;
    insuranceDiscount: number;
  };
}

export function DepositWidget({
  itemId,
  category,
  startDate,
  endDate,
  insurance = false,
  pickupMethod = 'pickup',
}: DepositWidgetProps) {
  const { t, locale } = useI18n();
  const [depositData, setDepositData] = useState<DepositData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const animatedValue = useMotionValue(0);

  // Animate the deposit amount
  useAnimationFrame(() => {
    if (depositData && isExpanded) {
      const current = animatedValue.get();
      const target = depositData.depositAmount;
      const diff = target - current;
      
      if (Math.abs(diff) > 1) {
        animatedValue.set(current + diff * 0.1);
      } else {
        animatedValue.set(target);
      }
    }
  });

  useEffect(() => {
    if (startDate && endDate) {
      calculateDeposit();
    }
  }, [itemId, category, startDate, endDate, insurance, pickupMethod]);

  const calculateDeposit = async () => {
    if (!startDate || !endDate) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/risk/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          category,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          insurance,
          pickupMethod,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDepositData(data);
        animatedValue.set(0); // Reset for animation
      }
    } catch (error) {
      console.error('Deposit calculation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!depositData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('deposit.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">
            {isLoading ? t('common.loading') : t('booking.dates')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t('deposit.title')}
          <motion.div
            className="text-2xl font-bold text-blue-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatCurrencyILS(Math.round(animatedValue.get()), locale)}
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="explanation">
            <AccordionTrigger
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm"
            >
              {t('deposit.explanation')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">{t('deposit.baseAmount')}:</span>
                    <br />
                    {formatCurrencyILS(depositData.explanation.baseAmount, locale)}
                  </div>
                  <div>
                    <span className="font-medium">{t('deposit.deductible')}:</span>
                    <br />
                    {formatCurrencyILS(depositData.deductible, locale)}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">{t('deposit.riskFactors')}:</span>
                  <ul className="mt-1 space-y-1">
                    {depositData.riskFactors.map((factor, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        {factor}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t">
                  <span className="font-medium">{t('deposit.claimWindow')}:</span>
                  <br />
                  {depositData.claimWindow}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}