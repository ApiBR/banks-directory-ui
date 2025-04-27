import React from 'react';
import { useTranslation } from 'react-i18next';

export function EmptyState() {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground text-lg">{t('noResults')}</p>
    </div>
  );
}