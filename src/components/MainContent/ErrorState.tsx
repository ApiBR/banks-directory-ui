import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-12">
      <p className="text-destructive">{message || t('error')}</p>
    </div>
  );
}