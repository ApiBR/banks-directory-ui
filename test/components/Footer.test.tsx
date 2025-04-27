import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../../src/components/Footer';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Footer', () => {
  it('should render the current year', () => {
    const currentYear = new Date().getFullYear();
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(`© ${currentYear} APIBR - Banks Directory`)).toBeInTheDocument();
  });

  it('should render developer name and photo', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByAltText('Guilherme Branco Stracini')).toBeInTheDocument();
    expect(screen.getByText('Guilherme Branco Stracini')).toBeInTheDocument();
  });

  it('should have GitHub and Changelog links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('should toggle the Data Sources dropdown when clicked', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const button = screen.getByText('Data Sources');
    expect(button).toBeInTheDocument();

    // Click to open
    fireEvent.click(button);
    expect(screen.getByText('CSV')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('Markdown')).toBeInTheDocument();
    expect(screen.getByText('SQL')).toBeInTheDocument();
    expect(screen.getByText('XML')).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(screen.queryByText('CSV')).not.toBeInTheDocument();
  });

  it('should display "Made with ❤️ in Brazil"', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText('Made with')).toBeInTheDocument();
    expect(screen.getByText('in Brazil')).toBeInTheDocument();
  });
});
