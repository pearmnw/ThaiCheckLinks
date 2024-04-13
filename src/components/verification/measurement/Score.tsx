import { useScopedI18n } from '@/locales/client'
import React from 'react'
import ScoreIndicator from './ScoreIndicator';
import { ScoreProps } from '@/lib/interface/verification/interface';

const Score: React.FC<ScoreProps> = ({ score, maxScore, color }) => {
  const t = useScopedI18n('verificationpage');

  return (
    <div className='flex flex-col justify-center items-start w-full'>
      <div className='w-full'>
        <ScoreIndicator score={score} maxScore={maxScore} color={color}/>
      </div>
    </div>
  );
}

export default Score
