import React from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Bank } from '../../types';

interface BankCardProps {
  bank: Bank;
}

export function BankCard({ bank }: BankCardProps) {
  const { t } = useTranslation();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const BooleanIndicator = ({ value }: { value: boolean }) => (
    value ? 
      <Check className="h-5 w-5 text-green-500" /> : 
      <X className="h-5 w-5 text-gray-400" />
  );

  const getPixTypeDisplay = (pixType: string | null) => {
    switch (pixType) {
      case 'DRCT':
        return t('bank.pixType.direct');
      case 'IDRT':
        return t('bank.pixType.indirect');
      default:
        return t('bank.pixType.notPsp');
    }
  };

  const getPixTypeColor = (pixType: string | null) => {
    switch (pixType) {
      case 'DRCT':
        return 'bg-green-100 text-green-800';
      case 'IDRT':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{bank.LongName}</h3>
          <p className="text-sm text-gray-500">{bank.ShortName}</p>
        </div>
        <a 
          href={bank.Url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">COMPE</p>
          <p className="text-sm text-gray-900">{bank.COMPE}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">ISPB</p>
          <p className="text-sm text-gray-900">{bank.ISPB}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">CNPJ</p>
          <p className="text-sm text-gray-900">{bank.Document}</p>
        </div>
  
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{t('filters.pixType.label')}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPixTypeColor(bank.PixType)}`}>
            {getPixTypeDisplay(bank.PixType)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{t('filters.labels.charge')}</span>
          <BooleanIndicator value={bank.Charge} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{t('filters.labels.creditDocument')}</span>
          <BooleanIndicator value={bank.CreditDocument} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{t('filters.labels.legalCheque')}</span>
          <BooleanIndicator value={bank.LegalCheque} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{t('filters.labels.detectaFlow')}</span>
          <BooleanIndicator value={bank.DetectaFlow} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{t('filters.labels.pcr')}</span>
          <BooleanIndicator value={bank.PCR} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{t('filters.labels.pcrp')}</span>
          <BooleanIndicator value={bank.PCRP} />
        </div>
      </div>

      {bank.Products && bank.Products.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">{t('bank.products')}</p>
          <div className="flex flex-wrap gap-2">
            {bank.Products.map((product, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
        <div>
          <p>{t('bank.dates.operationStarted')}: {formatDate(bank.DateOperationStarted)}</p>
          <p>{t('bank.dates.pixStarted')}: {formatDate(bank.DatePixStarted)}</p>
        </div>
        <div>
          <p>{t('bank.dates.registered')}: {formatDate(bank.DateRegistered)}</p>
          <p>{t('bank.dates.updated')}: {formatDate(bank.DateUpdated)}</p>
        </div>
      </div>
    </div>
  );
}