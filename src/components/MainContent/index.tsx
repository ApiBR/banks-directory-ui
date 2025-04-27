import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../SearchBar';
import { FilterControls } from '../FilterControls';
import { Bank } from '@/types';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { BankList } from './BankList';
import { SortControls, type SortOption } from './SortControls';
import { Pagination } from './Pagination';
import { FilterHeader } from './FilterHeader';

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

  const isFiltered = search || pixFilter !== 'all' || Object.values(filters).some(value => value !== 'all');

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (filteredBanks.length === 0) return <EmptyState />;

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="grow">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow-xs">
          <FilterHeader
            totalBanks={banks.length}
            filteredCount={filteredBanks.length}
            isFiltered={isFiltered}
          />
          <FilterControls 
            filters={filters} 
            onChange={handleFilterChange} 
            pixFilter={pixFilter}
            onPixFilterChange={setPixFilter}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredBanks.length}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
            <SortControls
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={setSortBy}
              onDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            />
          </div>

          <BankList banks={currentBanks} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredBanks.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </main>
  );
}