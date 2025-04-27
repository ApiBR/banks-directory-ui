import React from 'react';
import { useTranslation } from 'react-i18next';

interface FilterHeaderProps {
  totalBanks: number;
  filteredCount: number;
  isFiltered: boolean;
}

export function FilterHeader({ totalBanks, filteredCount, isFiltered }: FilterHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium text-card-foreground">{t('filters.title')}</h2>
      <div className="flex space-x-4 text-sm">
        <div className="text-muted-foreground">
          <span className="font-medium">{t('bank.count.total')}:</span> {totalBanks}
        </div>
        {isFiltered && (
          <div className="text-primary">
            <span className="font-medium">{t('bank.count.filtered')}:</span> {filteredCount}
          </div>
        )}
      </div>
    </div>
  );
}