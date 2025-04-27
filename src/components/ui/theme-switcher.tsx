import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

interface ThemeSwitcherProps {
  variant?: 'default' | 'header';
}

export function ThemeSwitcher({ variant = 'default' }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`p-2 rounded-lg transition-colors ${
        variant === 'header'
          ? 'text-[hsl(var(--header-foreground))] hover:bg-[hsl(var(--header-foreground))/0.1]'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}