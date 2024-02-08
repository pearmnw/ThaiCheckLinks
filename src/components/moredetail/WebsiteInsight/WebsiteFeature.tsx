import { useScopedI18n } from '@/locales/client'
import ServerName from './ServerName';
import Owner from './Owner';
import CompanyData from './CompanyData';
import WebsiteData from './WebsiteData';
import Registrar from './Registrar';
import React from 'react'
import { WebsiteFeatureProps } from '@/lib/interface/moredetail/interface';

const WebsiteFeature: React.FC<WebsiteFeatureProps> = ({ websiteData, rank}) => {
  const t = useScopedI18n('moredetailpage')

  return (
    <div className='flex justify-center items-center flex-col w-full'>
      <ServerName server={websiteData.server} />
      <Owner owner={websiteData.owner} />
      <CompanyData company={websiteData.company} />
      <WebsiteData websitedata={websiteData.website_data} rank={rank} />
      <Registrar registrar={websiteData.registrar} />
    </div>
  );
}

export default WebsiteFeature
