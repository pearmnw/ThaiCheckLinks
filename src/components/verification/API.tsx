import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { useState } from 'react';
import { makeRequest } from '@/lib/utils';
import TableDatabase from './ApiTable/TableDatabase';
import { APIProps } from '@/lib/interface/moredetail/interface';
import Link from 'next/link';

const API = () => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();

  return (
    <section className='px-8 py-8 flex flex-col items-center gap-5' id="myAPI">
      <div className='flex flex-col justify-center items-start text-custom-black gap-5 w-full'>
        <div className='flex justify-between items-center w-full'>
          <h2 className='text-3xl font-bold'>{t('API-title')}</h2>
          <Link href='#myOverall'>
            <h2 className='text-2xl font-semibold underline'>
              {t('see-overview')}
            </h2>
          </Link>
        </div>
        <h3 className='text-3xl font-medium text-custom-blue'>
          {t('API-subtitle')}
        </h3>
      </div>

      <div className='overflow-hidden shadow-md sm:rounded-lg w-2/3'>
        <TableDatabase />
      </div>
    </section>
  );
};

export default API;
