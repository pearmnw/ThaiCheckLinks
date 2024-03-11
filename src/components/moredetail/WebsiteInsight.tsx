'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React, { useState } from 'react';
import CompanyData from './WebsiteInsight/CompanyData';
import Owner from './WebsiteInsight/Owner';
import WebsiteData from './WebsiteInsight/WebsiteData';
import ServerName from './WebsiteInsight/ServerName';
import Registrar from './WebsiteInsight/Registrar';
import axios from 'axios';
import WebsiteHeader from './WebsiteInsight/WebsiteHeader';
import WebsiteFeature from './WebsiteInsight/WebsiteFeature';
import { WebsiteInsightProps } from '@/lib/interface/moredetail/interface';

const WebsiteInsight: React.FC<WebsiteInsightProps> = ({ url, rank, websiteData }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-center items-start flex-col rounded-xl py-8 px-20 gap-4'>
      <WebsiteHeader url={url} />
      <WebsiteFeature  websiteData={websiteData} rank={rank} />
    </div>
  );
};

export default WebsiteInsight;
