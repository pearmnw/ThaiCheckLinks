'use client';
import { ProgressBarScoreProps } from '@/lib/interface/verification/interface';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React from 'react';


const ProgressBar: React.FC<ProgressBarScoreProps> = ({ score, maxScore, color }) => {
  const t = useScopedI18n('verificationpage');
  const widthPercent = (score / maxScore) * 100;

  return (
    <div className='w-full bg-gray-200 rounded-xl h-12 dark:bg-gray-700'>
      <div
        className={`h-12 rounded-xl`}
        style={{ width: `${widthPercent}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
