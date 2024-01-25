'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import ProgressBar from './ProgressBar';
import React from 'react';

interface ScoreIndicatorProps {
  score: number; 
  maxScore: number;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score, maxScore }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  return (
    <div className='space-y-2 flex flex-row flex-start items-center gap-4'>
      <div className='w-full'>
        <ProgressBar score={score} maxScore={maxScore} />
        <div className='flex justify-between text-xs '>
          <span>Low</span>
          <span>Quite low</span>
          <span>Quite high</span>
          <span>High</span>
        </div>
      </div>
      <div className='text-right'>
        <span className='text-red-600 font-bold'>{score}</span>
        <span className='text-custom-black font-bold'>/{maxScore}</span>
      </div>
    </div>
  );
};

export default ScoreIndicator;
