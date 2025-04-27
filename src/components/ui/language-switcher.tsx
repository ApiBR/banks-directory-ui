import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface LanguageSwitcherProps {
  variant?: 'default' | 'header';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage('banks-directory-language', i18n.language);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <Languages className={`h-5 w-5 ${variant === 'header' ? 'text-[hsl(var(--header-foreground))]' : 'text-muted-foreground'}`} />
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={`px-2 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
          variant === 'header' 
            ? 'bg-transparent text-[hsl(var(--header-foreground))] border-[hsl(var(--header-foreground))] hover:bg-[hsl(var(--header-foreground))/0.1]' 
            : 'bg-background text-foreground border-input'
        }`}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-background text-foreground">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}