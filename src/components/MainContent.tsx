import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { FilterControls } from './FilterControls';
import { BankCard } from './BankCard';
import { Bank } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = 'name' | 'compe' | 'ispb' | 'operationStarted' | 'registered' | 'pixStarted' | 'updated';
type PixFilterValue = 'all' | 'DRCT' | 'IDRT' | 'both' | 'not-psp';

export function MainContent() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [pixFilter, setPixFilter] = useState<PixFilterValue>('all');
  const [sortBy, setSortBy] = useState<SortOption>('compe');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [filters, setFilters] = useState<Record<string, 'all' | 'yes' | 'no'>>({
    Charge: 'all',
    CreditDocument: 'all',
    LegalCheque: 'all',
    DetectaFlow: 'all',
    PCR: 'all',
    PCRP: 'all',
  });

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/guibranco/BancosBrasileiros/refs/heads/main/data/bancos.json');
        if (!response.ok) {
          throw new Error('Failed to fetch banks data');
        }
        const data = await response.json();
        
        const uniqueBanksMap = new Map();
        
        data.forEach((bank: any) => {
          const existingBank = uniqueBanksMap.get(bank.ISPB);
          
          if (!existingBank || new Date(bank.DateUpdated) > new Date(existingBank.DateUpdated)) {
            uniqueBanksMap.set(bank.ISPB, {
              ...bank,
              Charge: bank.Charge === true,
              CreditDocument: bank.CreditDocument === true,
              LegalCheque: bank.LegalCheque === true,
              DetectaFlow: bank.DetectaFlow === true,
              PCR: bank.PCR === true,
              PCRP: bank.PCRP === true,
            });
          }
        });
        
        const transformedData = Array.from(uniqueBanksMap.values());
        setBanks(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const filteredBanks = useMemo(() => {
    const filtered = banks.filter(bank => {
      const searchTerm = search.toLowerCase();
      const matchesSearch = !search || 
        bank.LongName.toLowerCase().includes(searchTerm) ||
        bank.ShortName.toLowerCase().includes(searchTerm) ||
        (bank.COMPE && bank.COMPE.toLowerCase().includes(searchTerm));

      const matchesPixFilter = pixFilter === 'all' ||
        (pixFilter === 'DRCT' && bank.PixType === 'DRCT') ||
        (pixFilter === 'IDRT' && bank.PixType === 'IDRT') ||
        (pixFilter === 'both' && (bank.PixType === 'DRCT' || bank.PixType === 'IDRT')) ||
        (pixFilter === 'not-psp' && (!bank.PixType || bank.PixType === 'null'));

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === 'all') return true;
        const bankValue = bank[key as keyof Bank];
        return value === 'yes' ? bankValue === true : bankValue === false;
      });

      return matchesSearch && matchesFilters && matchesPixFilter;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'compe':
          comparison = (a.COMPE || '').localeCompare(b.COMPE || '');
          break;
        case 'ispb':
          comparison = a.ISPB.localeCompare(b.ISPB);
          break;
        case 'name':
          comparison = a.LongName.localeCompare(b.LongName);
          break;
        case 'operationStarted':
          comparison = new Date(a.DateOperationStarted).getTime() - new Date(b.DateOperationStarted).getTime();
          break;
        case 'registered':
          comparison = new Date(a.DateRegistered).getTime() - new Date(b.DateRegistered).getTime();
          break;
        case 'pixStarted':
          const aDate = a.DatePixStarted ? new Date(a.DatePixStarted).getTime() : 0;
          const bDate = b.DatePixStarted ? new Date(b.DatePixStarted).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case 'updated':
          comparison = new Date(a.DateUpdated).getTime() - new Date(b.DateUpdated).getTime();
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [search, filters, banks, pixFilter, sortBy, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBanks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanks = filteredBanks.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, filters, pixFilter, itemsPerPage]);

  const handleFilterChange = (key: string, value: 'all' | 'yes' | 'no') => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const { t } = useTranslation();
  const totalBanks = filteredBanks.length;
  const isFiltered = search || pixFilter !== 'all' || Object.values(filters).some(value => value !== 'all');

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="grow">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-card-foreground">{t('filters.title')}</h2>
            <div className="flex space-x-4 text-sm">
              <div className="text-muted-foreground">
                <span className="font-medium">{t('bank.count.total')}:</span> {totalBanks}
              </div>
              {isFiltered && (
                <div className="text-primary">
                  <span className="font-medium">{t('bank.count.filtered')}:</span> {filteredBanks.length}
                </div>
              )}
            </div>
          </div>
          <FilterControls 
            filters={filters} 
            onChange={handleFilterChange} 
            pixFilter={pixFilter}
            onPixFilterChange={setPixFilter}
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{t('error')}</p>
          </div>
        ) : filteredBanks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('noResults')}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-4 items-center sm:items-stretch sm:space-y-0 sm:flex-row sm:justify-between mb-4">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{t('pagination.itemsPerPage')}</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(parseInt(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="30" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                      <SelectItem value="90">90</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder={t('sort.options.compe')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compe">{t('sort.options.compe')}</SelectItem>
                      <SelectItem value="name">{t('sort.options.name')}</SelectItem>
                      <SelectItem value="ispb">{t('sort.options.ispb')}</SelectItem>
                      <SelectItem value="operationStarted">{t('sort.options.operationStarted')}</SelectItem>
                      <SelectItem value="registered">{t('sort.options.registered')}</SelectItem>
                      <SelectItem value="pixStarted">{t('sort.options.pixStarted')}</SelectItem>
                      <SelectItem value="updated">{t('sort.options.updated')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    onClick={toggleSortDirection}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    aria-label={sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}
                  >
                    {sortDirection === 'asc' ? (
                      <ArrowUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2 w-full sm:w-auto sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <span className="text-sm text-muted-foreground text-center whitespace-nowrap">
                  {t('pagination.showing', {
                    start: startIndex + 1,
                    end: Math.min(endIndex, totalBanks),
                    total: totalBanks
                  })}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm whitespace-nowrap">
                    {t('pagination.page', { current: currentPage, total: totalPages })}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentBanks.map((bank) => (
                <BankCard key={bank.ISPB} bank={bank} />
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center space-y-2">
              <span className="text-sm text-muted-foreground text-center">
                {t('pagination.showing', {
                  start: startIndex + 1,
                  end: Math.min(endIndex, totalBanks),
                  total: totalBanks
                })}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm whitespace-nowrap">
                  {t('pagination.page', { current: currentPage, total: totalPages })}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}