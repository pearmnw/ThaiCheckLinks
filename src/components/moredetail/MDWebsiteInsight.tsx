'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React, { useState } from 'react';
import CompanyData from './WebsiteInsight/CompanyData';
import Owner from './WebsiteInsight/Owner';
import WebsiteData from './WebsiteInsight/WebsiteData';
import ServerName from './WebsiteInsight/ServerName';
import Registrar from './WebsiteInsight/Registrar';

interface MDWebsiteInsightProps {
  url: string;
}

const MDWebsiteInsight: React.FC<MDWebsiteInsightProps> = ({ url }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);

  const fetchWebsiteData = () => {
    // TODO: FETCH DATA FROM WHOIS
    console.log("Hello")
  }

  return (
    <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-center items-start flex-col rounded-xl py-8 px-20 gap-4'>
      <h2 className='text-3xl'>{t('websiteinsight-title')}</h2>
      <h3 className='text-3xl font-normal'>URL: {url}</h3>
      {/* <button
        onClick={fetchWebsiteData}
        type='button'
        className='bg-custom-black text-white text-center py-2 px-4 rounded text-base'
        value='Demo'
      >
        Demo
      </button> */}
      <div className="flex justify-center items-center flex-col w-full">
        <ServerName />
        <Owner />
        <CompanyData />
        <WebsiteData />
        <Registrar />
      </div>
    </div>
  );
};

export default MDWebsiteInsight;
