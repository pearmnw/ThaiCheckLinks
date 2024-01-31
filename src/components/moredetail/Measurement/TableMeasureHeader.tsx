import { useScopedI18n } from '@/locales/client'
import React from 'react'

const TableMeasureHeader = () => {
  const t = useScopedI18n('measurement')

  return (
    <>
        <thead className=' text-gray-700 uppercase'>
          <tr>
            <th scope='col' className='py-3 px-6 text-green-600'>
              {t('positive')}
            </th>
            <th scope='col' className='py-3 px-6 text-red-600'>
              {t('negative')}
            </th>
          </tr>
        </thead>
    </>
  )
}

export default TableMeasureHeader
