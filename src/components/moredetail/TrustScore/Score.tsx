import { useScopedI18n } from '@/locales/client'
import React from 'react'
import ScoreIndicator from './ScoreIndicator';
import { ScoreProps } from '@/lib/interface/moredetail/interface';

const Score: React.FC<ScoreProps> = ({ score, maxScore }) => {
  const t = useScopedI18n('moredetailpage');

  return (
    <div className='flex flex-col justify-center items-start w-full'>
      <div className='p-4 w-full'>
        <ScoreIndicator score={score} maxScore={maxScore} />
      </div>
    </div>
  );
}

export default Score
