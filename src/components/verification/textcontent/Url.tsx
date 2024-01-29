'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import axios from 'axios';
import { useState } from 'react';
import ScoreIndicator from '../../moredetail/TrustScore/ScoreIndicator';

interface UrlProps {
  url: string;
  urlPercent: {
    benign_proba: number;
    malicious_proba: number;
  };
}

const Url: React.FC<UrlProps> = ({ url, urlPercent }) => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
  const malicious_url = urlPercent.malicious_proba

  return (
    <div className='flex justify-center flex-col gap-6 w-full py-14 px-12 border-b-2 border-custom-black'>
      <div>{t('malicious-url')}</div>
      <ScoreIndicator score={malicious_url} maxScore={100} />
    </div>
  );
};

export default Url;
