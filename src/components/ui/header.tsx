import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './language-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { Link } from 'react-router-dom';
import { Github, FileText } from 'lucide-react';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-[hsl(var(--header))] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <img 
              src="https://apibr.com/ApiBRLogo.png"
              alt="ApiBR Logo"
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-[hsl(var(--header-foreground))]">{t('title')}</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/ApiBR/banks-directory-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--header-foreground))] hover:text-[hsl(var(--header-foreground))/0.8] flex items-center space-x-2 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">{t('footer.github')}</span>
              </a>
              <Link
                to="/changelog"
                className="text-[hsl(var(--header-foreground))] hover:text-[hsl(var(--header-foreground))/0.8] flex items-center space-x-2 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span className="hidden sm:inline">{t('footer.changelog')}</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher variant="header" />
              <LanguageSwitcher variant="header" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}