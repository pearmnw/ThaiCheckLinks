'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React, { MouseEventHandler } from 'react';
import Header from './Header';
import Button from './Button';
import Verify from './Verify';
import Url from './Url';

interface ContentProps {
  onPredict: MouseEventHandler<HTMLButtonElement>;
  currentPercent: {
    normal: number;
    gambling: number;
    scam: number;
    fake: number;
  };
  maxPercent: {
    normal: number;
    gambling: number;
    scam: number;
    fake: number;
  };
  url: string;
}

const Classify: React.FC<ContentProps> = ({
  onPredict,
  currentPercent,
  maxPercent,
  url,
}) => {
  const categories = [
    {
      label: 'Gambling',
      currentPercent: currentPercent.gambling,
      maxPercent: maxPercent.gambling,
      color: 'text-red-600',
    },
    {
      label: 'Scam',
      currentPercent: currentPercent.scam,
      maxPercent: maxPercent.scam,
      color: 'text-orange-400',
    },
    {
      label: 'Fake',
      currentPercent: currentPercent.fake,
      maxPercent: maxPercent.fake,
      color: 'text-yellow-400',
    },
    {
      label: 'Others',
      currentPercent: currentPercent.normal,
      maxPercent: maxPercent.normal,
      color: 'text-green-600',
    },
  ];

  return (
    <div className='flex flex-col gap-3 justify-center items-start py-8 px-8'>
      <Header />
      <Button onPredict={onPredict} />
      <Verify categories={categories} />
    </div>
  );
};

export default Classify;
