import React from 'react';
import { useTranslation } from 'react-i18next';

export function LoadingState() {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-muted-foreground">{t('loading')}</p>
    </div>
  );
}