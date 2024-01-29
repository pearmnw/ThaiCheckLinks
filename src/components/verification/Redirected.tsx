'use client';
import React, { useState, useEffect } from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import Link from 'next/link';

const Redirected = () => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();

  return (
    <div>
      <Link href='/verification/moredetails'>
        <div className='text-3xl font-bold text-custom-black py-2 px-8 '>
          {t('readmore')}
        </div>
      </Link>
    </div>
  );
};

export default Redirected;
