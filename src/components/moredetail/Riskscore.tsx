'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import ScoreIndicator from './TrustScore/ScoreIndicator';
import { useState, useEffect } from 'react';
import Score from './TrustScore/Score';
import IdentifyRisk from './TrustScore/IdentifyRisk';
import { RiskscoreProps } from '@/lib/interface/moredetail/interface';

const Riskscore: React.FC<RiskscoreProps> = ({
  checked,
  identifyRisk,
  score,
  maxScore,
}) => {
  const t = useScopedI18n('moredetailpage');

  return (
    <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-center items-start flex-col rounded-xl py-8 px-20'>
      <IdentifyRisk checked={checked} identifyRisk={identifyRisk} />
      <Score score={score} maxScore={maxScore} />
    </div>
  );
};

export default Riskscore;
