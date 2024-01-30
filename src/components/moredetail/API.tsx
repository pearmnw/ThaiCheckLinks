import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { useState } from 'react';
import { makeRequest } from '@/lib/utils';
import TableDatabase from './ApiTable/TableDatabase';
import { APIProps } from '@/lib/interface/moredetail/interface';

const APIProps: React.FC<APIProps> = ({ data, checkIPQuality, checkURLHaus}) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();

  return (
    <div>
      <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-start items-center flex-col rounded-xl py-8 px-20 text-3xl gap-3'>
        {t('API-title')}
        <div className='overflow-hidden shadow-md sm:rounded-lg w-full'>
          <TableDatabase data={data} checkIPQuality={checkIPQuality} checkURLHaus={checkURLHaus} />
        </div>
      </div>
    </div>
  );
};

export default APIProps;