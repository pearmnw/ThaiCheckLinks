'use client';
import React from 'react';
import CategoryCard from './Score/CategoryCard';
import { VerifyProps } from '@/lib/interface/verification/interface';

const Verify: React.FC<VerifyProps> = ({ categories }) => {
  return (
    <div className='flex justify-center items-center w-full'>
      {categories.map((category) => (
        <CategoryCard key={category.label} {...category} />
      ))}
    </div>
  );
};

export default Verify;
