import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Heart, FileText, Database, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);

  const dataFormats = [
    { format: 'CSV', url: 'https://github.com/guibranco/BancosBrasileiros/blob/main/data/bancos.csv' },
    { format: 'JSON', url: 'https://github.com/guibranco/BancosBrasileiros/blob/main/data/bancos.json' },
    { format: 'Markdown', url: 'https://github.com/guibranco/BancosBrasileiros/blob/main/data/bancos.md' },
    { format: 'SQL', url: 'https://github.com/guibranco/BancosBrasileiros/blob/main/data/bancos.sql' },
    { format: 'XML', url: 'https://github.com/guibranco/BancosBrasileiros/blob/main/data/bancos.xml' },
  ];

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-2">
              <span className="text-muted-foreground text-center sm:text-left">
                {t('footer.copyright', { year: currentYear })}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">{t('footer.developedBy')}</span>
                <a
                  href="https://guilherme.stracini.com.br/?utm_campaign=project&utm_media=api-br-banks-directory&utm_source=apibr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-[#FFCC29] transition-colors"
                >
                  <img
                    src="https://guilherme.stracini.com.br/photo.png"
                    alt="Guilherme Branco Stracini"
                    className="h-[44px] w-[24px] object-cover"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://guilherme.stracini.com.br/?utm_campaign=project&utm_media=api-br-catalog&utm_source=apibr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFCC29] transition-colors font-medium"
                >
                  Guilherme Branco Stracini
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-muted-foreground hover:text-foreground flex items-center space-x-2 transition-colors"
                  >
                    <Database className="h-5 w-5" />
                    <span>{t('footer.dataSources')}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute bottom-full mb-2 bg-popover border border-border rounded-lg shadow-lg py-2 min-w-[160px] right-0">
                      {dataFormats.map(({ format, url }) => (
                        <a
                          key={format}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          {format}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <a
                  href="https://github.com/ApiBR/banks-directory-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-2 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>{t('footer.github')}</span>
                </a>
                <Link
                  to="/changelog"
                  className="text-muted-foreground hover:text-foreground flex items-center space-x-2 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>{t('footer.changelog')}</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground whitespace-nowrap">
                <span>{t('footer.madeWith')}</span>
                <Heart className="h-5 w-5 text-green-500" />
                <span>{t('footer.inBrazil')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}