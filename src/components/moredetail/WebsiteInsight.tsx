'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import React, { useState } from 'react';
import CompanyData from './WebsiteInsight/CompanyData';
import Owner from './WebsiteInsight/Owner';
import WebsiteData from './WebsiteInsight/WebsiteData';
import ServerName from './WebsiteInsight/ServerName';
import Registrar from './WebsiteInsight/Registrar';
import axios from 'axios';

interface WebsiteInsightProps {
  url: string;
}

const websiteNoneData = {
  server: {
    name: "",
  },
  company: {
    organization: "",
    owner: "",
    address: "",
    country: "",
    email: "",
  },
  website_data: {
    title: "",
    desciption: "",
    ip: "",
    status_code: "",
    domain_age: "",
    ssl_valid: "",
    ssl_type: "",
    whois_register_date: "",
    whois_last_update_date: "",
    whois_renew_date: "",
    redirect_domain: "",
  },
  owner: {
    organization: "",
    ca: "",
    country: "",
  },
  registrar: {
    domain: "",
    iana_id: "",
  },
};

const getDomainName = (url: string) => {
  try {
    if (url.startsWith('https://')) {
      url = url.replace(/^https?:\/\//, '');
    } 
    if (url.startsWith('http://')) {
      url = url.replace(/^https?:\/\//, '');
    }
    if (url.startsWith('www.')) {
      url = url.substring(4);
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return null; 
  }
  return url;
};

const WebsiteInsight: React.FC<WebsiteInsightProps> = ({ url }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [websiteData, setWebsiteData] = useState(websiteNoneData);
  const [rank, setRank] = useState('');
  const formData = new FormData();
  formData.append('url', url);
  formData.append('path', "moredetail")

  const fetchWebsiteData = async () => {
    try {
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common['Accept'] = 'application/json';

      await axios
        .post('http://127.0.0.1:8000/', formData)
        .then((resp) => {
          console.log(resp.data)
          if (resp.data) {
            setWebsiteData(resp.data.website_insight);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      const response = await fetch(
        `/${currentLocale}/api/alexa?url=${getDomainName(url)}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.rank) {
          setRank(data.rank as string);
        } else {
          setRank(t('No Result'));
        }
      } else {
        setRank(t('No Result'));
      }
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-center items-start flex-col rounded-xl py-8 px-20 gap-4'>
      <h2 className='text-3xl'>{t('websiteinsight-title')}</h2>
      <h3 className='text-3xl font-normal'>URL: {url}</h3>
      <button
        onClick={fetchWebsiteData}
        type='button'
        className='bg-custom-black text-white text-center py-2 px-4 rounded text-base'
        value='Demo'
      >
        Demo
      </button>
      <div className='flex justify-center items-center flex-col w-full'>
        <ServerName server={websiteData.server} />
        <Owner owner={websiteData.owner} />
        <CompanyData company={websiteData.company} />
        <WebsiteData websitedata={websiteData.website_data} rank={rank} />
        <Registrar registrar={websiteData.registrar} />
      </div>
    </div>
  );
};

export default WebsiteInsight;
