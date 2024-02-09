'use client';
import { useScopedI18n } from '@/locales/client';
import ProgressBar from './ProgressBar';
import React, { useEffect, useState } from 'react';
import { ScoreIndicatorProps } from '@/lib/interface/verification/interface';

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score, maxScore, color }) => {
  const t = useScopedI18n('verificationpage');
  
  return (
    <div className='flex flex-row flex-center items-center gap-4'>
      <div className='w-full'>
        <ProgressBar score={score} maxScore={maxScore} color={color} />
      </div>
      <div className='text-right text-3xl'>
        <span className='font-bold' style={{ color: color }}>{score}</span>
        <span className='text-custom-black font-bold'>/{maxScore}</span>
      </div>
    </div>
  );
};

export default ScoreIndicator;
