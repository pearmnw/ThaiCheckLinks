import { useScopedI18n } from '@/locales/client'
import React from 'react'
import Link from 'next/link'

const MeasureHeader = () => {
  const t = useScopedI18n('verificationpage')

  return (
    <div className='flex flex-col justify-center items-start text-custom-black gap-5 w-full'>
      <div className='flex justify-between items-center w-full'>
        <h2 className='text-3xl font-bold'>{t('measure-title')}</h2>
        <Link href='#myOverall'>
          <h2 className='text-2xl font-semibold underline'>
            {t('see-overview')}
          </h2>
        </Link>
      </div>

      <h3 className='text-3xl font-medium text-custom-blue'>
        {t('measure-subtitle')}
      </h3>
    </div>
  );
}

export default MeasureHeader
