'use client';
import React from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import CategoryCard from './CategoryCard';

interface VerifyProps {
  categories: {
    label: string;
    currentPercent: number;
    maxPercent: number;
    color: string;
  }[];
}

const Verify: React.FC<VerifyProps> = ({ categories }) => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
  return (
    <div className='flex justify-center items-center w-full'>
      {categories.map((category) => (
        <CategoryCard key={category.label} {...category} />
      ))}
    </div>
  );
}

export default Verify
