'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React, { MouseEventHandler, useContext } from 'react';
import Header from './Header';
import Verify from './Verify';
import { ClassifyProps } from '@/lib/interface/verification/interface';
import { VerificationContext } from '../Verification';

const Classify = () => {
  const t = useScopedI18n('verificationpage');
  const { currentPercent, maxPercent } =
    useContext(VerificationContext).overviewScore;

  const categories = [
    {
      label: t('gambling-label'),
      currentPercent: currentPercent.gambling,
      maxPercent: maxPercent.maxGambling,
      color: 'text-red-600',
    },
    {
      label: t('scam-label'),
      currentPercent: currentPercent.scam,
      maxPercent: maxPercent.maxScam,
      color: 'text-orange-400',
    },
    {
      label: t('fake-label'),
      currentPercent: currentPercent.fake,
      maxPercent: maxPercent.maxFake,
      color: 'text-yellow-400',
    },
    {
      label: t('other-label'),
      currentPercent: currentPercent.other,
      maxPercent: maxPercent.maxOther,
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
