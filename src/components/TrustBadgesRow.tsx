'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, Zap, CreditCard } from 'lucide-react';
import { t } from '@/lib/i18n';

interface TrustBadgesRowProps {
  locale?: 'en' | 'he';
}

export function TrustBadgesRow({ locale = 'en' }: TrustBadgesRowProps) {
  const badges = [
    {
      icon: CheckCircle,
      title: t('trust.verified_owners', locale),
      description: 'All owners verified',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Shield,
      title: t('trust.insured_items', locale),
      description: 'Full coverage included',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Zap,
      title: t('trust.instant_booking', locale),
      description: 'Book in seconds',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: CreditCard,
      title: t('trust.secure_payments', locale),
      description: 'Stripe powered',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-coral/5 to-teal/5 border-0">
      <CardContent className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${badge.bgColor} mb-3`}>
                  <IconComponent className={`h-6 w-6 ${badge.color}`} />
                </div>
                <h3 className="font-semibold text-deep-ink mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
