import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './components/theme-provider';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Changelog } from './components/Changelog';
import { Footer } from './components/Footer';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('htmlTitle');
  }, [t, i18n.language]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="brazilian-banks-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/changelog" element={<Changelog />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;