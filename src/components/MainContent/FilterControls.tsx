import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type FilterValue = 'all' | 'yes' | 'no';
type PixFilterValue = 'all' | 'DRCT' | 'IDRT' | 'both' | 'not-psp';

interface FilterControlsProps {
  filters: Record<string, FilterValue>;
  onChange: (key: string, value: FilterValue) => void;
  pixFilter: PixFilterValue;
  onPixFilterChange: (value: PixFilterValue) => void;
}

export function FilterControls({ filters, onChange, pixFilter, onPixFilterChange }: FilterControlsProps) {
  const { t } = useTranslation();

  const filterLabels = {
    Charge: t('filters.labels.charge'),
    CreditDocument: t('filters.labels.creditDocument'),
    LegalCheque: t('filters.labels.legalCheque'),
    DetectaFlow: t('filters.labels.detectaFlow'),
    PCR: t('filters.labels.pcr'),
    PCRP: t('filters.labels.pcrp'),
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <Label className="mb-2">{t('filters.pixType.label')}</Label>
        <Select value={pixFilter} onValueChange={onPixFilterChange}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder={t('filters.pixType.all')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filters.pixType.all')}</SelectItem>
            <SelectItem value="DRCT">{t('filters.pixType.direct')}</SelectItem>
            <SelectItem value="IDRT">{t('filters.pixType.indirect')}</SelectItem>
            <SelectItem value="both">{t('filters.pixType.both')}</SelectItem>
            <SelectItem value="not-psp">{t('filters.pixType.notPsp')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(filterLabels).map(([key, label]) => (
          <div key={key} className="flex flex-col">
            <Label className="mb-2">{label}</Label>
            <Select value={filters[key]} onValueChange={(value) => onChange(key, value as FilterValue)}>
              <SelectTrigger>
                <SelectValue placeholder={t('filters.options.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.options.all')}</SelectItem>
                <SelectItem value="yes">{t('filters.options.yes')}</SelectItem>
                <SelectItem value="no">{t('filters.options.no')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}