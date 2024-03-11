import { useScopedI18n } from '@/locales/client';
import React from 'react'

const TableDatabaseHeader = () => {
  const t = useScopedI18n('verificationpage')

  return (
    <>
      <thead className='bg-custom-black text-custom-bg-moredetail'>
        <tr>
          <th
            scope='col'
            className='font-semibold px-6 py-4 text-center text-2xl'
          >
            {t('API-website-col')}
          </th>
          <th
            scope='col'
            className='font-semibold px-6 py-4 text-center text-2xl'
          >
            {t('API-inspection-result-col')}
          </th>
        </tr>
      </thead>
    </>
  );
}

export default TableDatabaseHeader
