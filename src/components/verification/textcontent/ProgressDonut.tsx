'use client';
import React from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

interface ProgressDonutProps {
  maxPercent: number;
  color: string;
}


const ProgressDonut: React.FC<ProgressDonutProps> = ({ maxPercent, color }) => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();

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
        {/* Background circle */}
        <circle
          className='text-gray-300'
          fill='transparent'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          r={radius}
          cx='50'
          cy='50'
        />
        {/* Foreground circle */}
        <circle
          className={color} // Make sure this is a valid Tailwind CSS class
          fill='transparent'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx='50'
          cy='50'
        />
      </svg>
      {/* Absolute positioned text */}
      <div className='absolute text-2xl font-semibold text-custom-black'>{maxPercent}%</div>
    </div>
  );
};

export default ProgressDonut;
