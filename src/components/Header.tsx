import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-[hsl(var(--header))] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://apibr.com/ApiBRLogo.png"
              alt="ApiBR Logo"
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-[hsl(var(--header-foreground))]">{t('title')}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher variant="header" />
            <LanguageSwitcher variant="header" />
          </div>
        </div>
      </div>
    </header>
  );
}