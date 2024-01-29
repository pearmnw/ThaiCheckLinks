'use client';
import React from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import ProgressDonut from './ProgressDonut';

interface CategoryCardProps {
  label: string;
  currentPercent: number;
  maxPercent: number;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ label, currentPercent, maxPercent, color }) => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
  return (
    <div className='flex flex-col items-center p-4 w-full'>
      <ProgressDonut maxPercent={maxPercent} color={color} />
      <div className='mt-2 text-xl font-bold'>{label}</div>
      <div className='text-sm text-gray-600'>
        {t('update')} {currentPercent}%
      </div>
    </div>
  );
};

export default CategoryCard;
