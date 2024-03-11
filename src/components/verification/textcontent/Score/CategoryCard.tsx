'use client';
import React from 'react';
import { useScopedI18n } from '@/locales/client';
import { CategoryCardProps } from '@/lib/interface/verification/interface';
import ProgressDonut from './ProgressDonut';
import CategoryLabel from './CategoryLabel';

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  currentPercent,
  maxPercent,
  color,
}) => {
  const t = useScopedI18n('verificationpage');
  
  return (
    <div className='flex flex-col items-center p-4 w-full'>
      <ProgressDonut maxPercent={maxPercent} color={color} />
      <CategoryLabel label={label} currentPercent={currentPercent} />
    </div>
  );
};

export default CategoryCard;
