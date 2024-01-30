import { useScopedI18n } from '@/locales/client'
import React from 'react'
import { WebsiteHeaderProps } from '@/lib/interface/moredetail/interface'

const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({ url }) => {
  const t = useScopedI18n('moredetailpage')

  return (
    <>
      <h2 className='text-3xl'>{t('websiteinsight-title')}</h2>
      <h3 className='text-3xl font-normal'>URL: {url}</h3>
    </>
  );
}

export default WebsiteHeader;

