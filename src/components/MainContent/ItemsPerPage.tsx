import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemsPerPageProps {
  value: number;
  onChange: (value: number) => void;
}

export function ItemsPerPage({ value, onChange }: ItemsPerPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {t('pagination.itemsPerPage')}
      </span>
      <Select
        value={value.toString()}
        onValueChange={(value) => onChange(parseInt(value))}
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
  );
}