'use client';
import React from 'react';
import { useScopedI18n } from '@/locales/client';
import { ProgressDonutProps } from '@/lib/interface/verification/interface';

const ProgressDonut: React.FC<ProgressDonutProps> = ({ maxPercent, color }) => {
  const t = useScopedI18n('verificationpage');

  const radius = 36;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (maxPercent / 100) * circumference;

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <svg
        width='150'
        height='150'
        viewBox='0 0 100 100'
        className='transform -rotate-90'
      >
        <circle
          className='text-gray-300'
          fill='transparent'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap='round'
          r={radius}
          cx='50'
          cy='50'
        />
        <circle
          className={color}
          fill='transparent'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          r={radius}
          cx='50'
          cy='50'
        />
      </svg>
      <div className='absolute text-2xl font-semibold text-custom-black'>
        {maxPercent}%
      </div>
    </div>
  );
};

export default ProgressDonut;
