import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../../src/components/Header';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock ThemeSwitcher and LanguageSwitcher components
vi.mock('./ThemeSwitcher', () => ({
    ThemeSwitcher: vi.fn(() => <div>Theme Switcher</div>),
}));

vi.mock('./LanguageSwitcher', () => ({
    LanguageSwitcher: vi.fn(() => <div>Language Switcher</div>),
}));

describe('Header', () => {
    it('should render the logo', () => {
        render(<Header />);
        const logo = screen.getByAltText('ApiBR Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'https://apibr.com/ApiBRLogo.png');
    });

    it('should render the title', () => {
        render(<Header />);
        expect(screen.getByText('title')).toBeInTheDocument(); // Based on translation key
    });

    it('should render the ThemeSwitcher and LanguageSwitcher components', () => {
        render(<Header />);
        expect(screen.getByText('Theme Switcher')).toBeInTheDocument();
        expect(screen.getByText('Language Switcher')).toBeInTheDocument();
    });

    it('should have the correct header structure and classes', () => {
        render(<Header />);
        const header = screen.getByRole('banner');
        expect(header).toHaveClass('bg-[hsl(var(--header))] border-b border-border');
    });
});
