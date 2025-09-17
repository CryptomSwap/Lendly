'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield } from 'lucide-react';
import { t } from '@/lib/i18n';

interface VerifyBadgeProps {
  verified?: boolean;
  insured?: boolean;
  locale?: 'en' | 'he';
}

export function VerifyBadge({ verified, insured, locale = 'en' }: VerifyBadgeProps) {
  if (!verified && !insured) return null;

  return (
    <div className="flex gap-1">
      {verified && (
        <Badge className="bg-green-500 text-white text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          {t('listing.verified', locale)}
        </Badge>
      )}
      {insured && (
        <Badge className="bg-blue-500 text-white text-xs">
          <Shield className="h-3 w-3 mr-1" />
          {t('listing.insured', locale)}
        </Badge>
      )}
    </div>
  );
}