'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import axios from 'axios';
import { useState } from 'react';
import ScoreIndicator from '../../moredetail/TrustScore/ScoreIndicator';

interface UrlProps {
  url: string;
}

const Url: React.FC<UrlProps> = ({ url }) => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
  const formData = new FormData();
  formData.append('url', url);

  return (
    <div className='flex justify-center flex-col gap-6 w-full py-14 px-12 border-b-2 border-custom-black'>
      <div>{t('malicious-url')}</div>
      <ScoreIndicator score={10} maxScore={100} />
    </div>
  );
};

export default Url;
