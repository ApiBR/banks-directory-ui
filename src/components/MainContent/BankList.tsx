import React from 'react';
import { BankCard } from './BankCard';
import { Bank } from '@/types';

interface BankListProps {
  banks: Bank[];
}

export function BankList({ banks }: BankListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {banks.map((bank) => (
        <BankCard key={bank.ISPB} bank={bank} />
      ))}
    </div>
  );
}