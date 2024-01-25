'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import ScoreIndicator from './TrustScore/ScoreIndicator';
import { useState, useEffect } from 'react';

interface MDTrustscoreProps {
  url: string
}

const MDTrustscore: React.FC<MDTrustscoreProps> = ({ url }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  const [score, setScore] = useState(0);
  const [identifyRisk, setIdentifyRisk] = useState('');
  const maxScore = 100;

  const identifyRiskFromScore = (riskScore: number) => {
    if (riskScore >= 0 && riskScore <= 38) {
      return 'low';
    } else if (riskScore >= 39 && riskScore <= 58) {
      return t('quite-low');
    } else if (riskScore >= 59 && riskScore <= 78) {
      return t('quite-high');
    } else if (riskScore >= 79 && riskScore <= 100) {
      return t('high');
    } else {
      return t('No Result');
    }
  };

  useEffect(() => {
    const riskLevel = identifyRiskFromScore(score);
    setIdentifyRisk(riskLevel);
  }, [score, t]); 

  const fetchTrustScore = async () => {
    try {
      const response_ip_quality = await fetch(
        `/${currentLocale}/api/proxy?url=${url}`
      );

      if (response_ip_quality.ok) {
        const data = await response_ip_quality.json();
        if (data.risk_score) {
          setScore(data.risk_score);
        } else {
          setScore(0);
        }
      } else {
        setScore(0);
      }
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-center items-start flex-col rounded-xl py-8 px-20'>
      <div className='flex flex-row flex-start items-center gap-5'>
        {t('trust-score')}
        <span className='text-red-600 font-bold'>{identifyRisk}</span>
      </div>
      <div className='flex flex-col justify-center items-start w-full'>
        <button
          onClick={fetchTrustScore}
          type='button'
          className='bg-custom-black text-white text-center py-2 px-4 rounded text-base'
          value='Demo'
        >
          Demo
        </button>
        <div className='p-4 w-full'>
          <ScoreIndicator score={score} maxScore={maxScore} />
        </div>
      </div>
    </div>
  );
};

export default MDTrustscore;
