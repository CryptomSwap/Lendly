'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { t } from '@/lib/i18n';

interface EmptyStateProps {
  onClearFilters?: () => void;
  locale?: 'en' | 'he';
}

export function EmptyState({ onClearFilters, locale = 'en' }: EmptyStateProps) {
  return (
    <Card className="bg-gray-50 border-0">
      <CardContent className="py-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">
              {t('empty.no_results', locale)}
            </h3>
            <p className="text-gray-500">
              {t('empty.try_adjusting', locale)}
            </p>
          </div>

          {onClearFilters && (
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="mt-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
