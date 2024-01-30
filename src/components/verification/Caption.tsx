import { useScopedI18n } from '@/locales/client';
import React from 'react'

const Caption = () => {
  const t = useScopedI18n('verificationpage')
  return (
    <div className='flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 '>
      {t('caption')}
    </div>
  );
}

export default Caption
