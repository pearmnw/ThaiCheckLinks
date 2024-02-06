'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React, { MouseEventHandler } from 'react';
import Header from './Header';
import Verify from './Verify';
import { ClassifyProps } from '@/lib/interface/verification/interface';

const Classify: React.FC<ClassifyProps> = ({ currentPercent, maxPercent }) => {
  const t = useScopedI18n('verificationpage');

  const categories = [
    {
      label: t('gambling-label'),
      currentPercent: currentPercent.gambling,
      maxPercent: maxPercent.gambling,
      color: 'text-red-600',
    },
    {
      label: t('scam-label'),
      currentPercent: currentPercent.scam,
      maxPercent: maxPercent.scam,
      color: 'text-orange-400',
    },
    {
      label: t('fake-label'),
      currentPercent: currentPercent.fake,
      maxPercent: maxPercent.fake,
      color: 'text-yellow-400',
    },
    {
      label: t('other-label'),
      currentPercent: currentPercent.normal,
      maxPercent: maxPercent.normal,
      color: 'text-green-600',
    },
  ];

  return (
    <div className='flex flex-col gap-3 justify-center items-start'>
      <Header />
      <Verify categories={categories} />
    </div>
  );
};

export default Classify;
