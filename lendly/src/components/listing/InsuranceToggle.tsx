'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/i18n';
import { formatCurrencyILS } from '@/lib/format';

interface InsuranceToggleProps {
  subtotal: number;
  onToggle: (enabled: boolean, cost: number) => void;
  disabled?: boolean;
}

export function InsuranceToggle({ subtotal, onToggle, disabled = false }: InsuranceToggleProps) {
  const { t, locale } = useI18n();
  const [isEnabled, setIsEnabled] = useState(false);

  const insuranceCost = Math.round(subtotal * 0.1); // 10% insurance
  const deductible = Math.round(insuranceCost * 0.1); // 10% deductible

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    onToggle(enabled, enabled ? insuranceCost : 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isEnabled ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              🛡️
            </motion.div>
            <span>{t('insurance.title')}</span>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggle}
            disabled={disabled}
            className="data-[state=checked]:bg-blue-600"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('insurance.coverage')}</span>
            <motion.span
              className="font-medium"
              animate={{ color: isEnabled ? '#2563eb' : '#6b7280' }}
              transition={{ duration: 0.2 }}
            >
              {formatCurrencyILS(insuranceCost, locale)}
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isEnabled ? 1 : 0, 
              height: isEnabled ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{t('insurance.deductible')}:</span>
                <span>{formatCurrencyILS(deductible, locale)}</span>
              </div>
              <div className="text-xs bg-blue-50 p-2 rounded">
                {locale === 'he' 
                  ? 'כיסוי מלא לנזקים, גניבה ותקלות טכניות'
                  : 'Full coverage for damage, theft, and technical issues'
                }
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
