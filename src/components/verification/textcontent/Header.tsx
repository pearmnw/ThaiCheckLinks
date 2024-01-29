'use client';
import React from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

const Header = () => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();

  return (
    <div className='flex flex-col justify-center items-start text-custom-black gap-5'>
      <h2 className='text-3xl font-semibold'>{t('analysis-title')}</h2>
      <h3 className='text-3xl font-normal'>{t('analysis-subtitle')}</h3>
    </div>
  );
};

export default Header;
