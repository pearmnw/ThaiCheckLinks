'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import Header from './Header';
import Riskscore from './Riskscore';
import Measurement from './Measurement';
import WebsiteInsight from './WebsiteInsight';
import SearchBarMain from '../searchbar/searchbarmain';
import API from './API';
import Caption from '../verification/Caption';
import axios from 'axios';
import { getDomainName } from '@/lib/utils';
import { makeRequest } from '@/lib/utils';
import { useState, useEffect } from 'react';

const websiteNoneData = {
  server: {
    name: '',
  },
  company: {
    organization: '',
    owner: '',
    address: '',
    country: '',
    email: '',
  },
  website_data: {
    title: '',
    desciption: '',
    ip: '',
    status_code: '',
    domain_age: '',
    ssl_valid: '',
    ssl_type: '',
    whois_register_date: '',
    whois_last_update_date: '',
    whois_renew_date: '',
    redirect_domain: '',
  },
  owner: {
    organization: '',
    ca: '',
    country: '',
  },
  registrar: {
    domain: '',
    iana_id: '',
  },
};

const Moredetail = () => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  const [url, setUrl] = useState('')

  const formData = new FormData();
  formData.append('url', url);
  formData.append('path', 'moredetail');
  
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [rank, setRank] = useState('');
  const [websiteData, setWebsiteData] = useState(websiteNoneData);
  const [identifyRisk, setIdentifyRisk] = useState('');
  const [checkIPQuality, setCheckIPQuality] = useState<any>(t('No Result'));
  const [checkURLHaus, setCheckURLHaus] = useState<any>(t('No Result'));

  const data = [
    { name: 'IPQuality', status: checkIPQuality },
    { name: 'URLHaus', status: checkURLHaus },
  ];

  const maxScore = 100;

  const identifyRiskFromScore = (riskScore: number) => {
    if (riskScore >= 0 && riskScore <= 38) {
      return 'low';
    } else if (riskScore >= 39 && riskScore <= 58) {
      return t('quite-low');
    } else if (riskScore >= 59 && riskScore <= 78) {
      return t('quite-high');
    } else if (riskScore >= 79 && riskScore <= 100) {
      return t('high');
    } else {
      return t('No Result');
    }
  };

  useEffect(() => {
    const riskLevel = identifyRiskFromScore(score);
    setIdentifyRisk(riskLevel);
  }, [score, t]);

  const getRiskScore = async () => {
    const response_ip_quality = await fetch(
      `/${currentLocale}/api/proxy?url=${url}`
    );
    // Risk Score Feature: Progress Bar
    if (response_ip_quality.ok) {
      const data = await response_ip_quality.json();
      if (data.risk_score) {
        setScore(data.risk_score);
      } else {
        setScore(0);
      }
      setChecked(true);
      console.log(data);
    } else {
      setScore(0);
    }
  }

  const getWebsiteInsight = async () => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    // Website Insight Feature: API Backend
    await axios
      .post('http://127.0.0.1:8000/', formData)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          setWebsiteData(resp.data.website_insight);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // Website Insight Feature: API Alexa Rank
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
  }

  const getApi = async () => {
    try {
      const response_ip_quality = await fetch(
        `/${currentLocale}/api/proxy?url=${url}`
      );

      let url_http = makeRequest(url);
      const response_url_haus = await fetch(
        `/${currentLocale}/api/urlhaus?url=${url_http}`
      );

      // IPQuality
      if (response_ip_quality.ok) {
        const data = await response_ip_quality.json();
        if (
          data.spamming === true ||
          data.malware === true ||
          data.phishing === true ||
          data.suspicious === true
        ) {
          setCheckIPQuality(t('FOUND'));
        } else {
          setCheckIPQuality(t('NOT FOUND'));
        }
      } else {
        setCheckIPQuality(t('NOT FOUND'));
      }

      // URLHause
      if (!response_url_haus.ok) {
        throw new Error(`HTTP error! status: ${response_url_haus.status}`);
      }
      const data = await response_url_haus.json();

      if (data.query_status == 'ok') {
        setCheckURLHaus(t('FOUND'));
      } else {
        setCheckURLHaus(t('NOT FOUND'));
      }

      console.log(data);
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const predictBtn = async () => {
    try {
      getRiskScore();
      getWebsiteInsight();
      getApi();
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <div className='text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3] '>
        {t('title')}
        <Caption />
        <SearchBarMain onPredict={predictBtn} url={url} setUrl={setUrl}/>
        <div className='flex justify-center flex-col border-solid border-2 mx-28 my-8 border-slate-600 rounded-lg py-14 px-8 gap-6'>
          <Header />
          <div className='flex justify-center flex-col item-center mx-12 gap-6'>
            <Riskscore checked={checked} identifyRisk={identifyRisk} score={score} maxScore={maxScore}/>
            <Measurement />
            <WebsiteInsight url={url} rank={rank} websiteData={websiteData}/>
            <API data={data} checkIPQuality={checkIPQuality} checkURLHaus={checkURLHaus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moredetail;
