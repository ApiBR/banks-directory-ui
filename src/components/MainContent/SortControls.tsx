import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 'name' | 'compe' | 'ispb' | 'operationStarted' | 'registered' | 'pixStarted' | 'updated';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: 'asc' | 'desc';
  onSortChange: (option: SortOption) => void;
  onDirectionChange: () => void;
}

export function SortControls({ sortBy, sortDirection, onSortChange, onDirectionChange }: SortControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
      <Select value={sortBy} onValueChange={onSortChange}>
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
        onClick={onDirectionChange}
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
  );
}