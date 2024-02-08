'use client';
import React, { useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import axios from 'axios';
import SearchBarMain from '../searchbar/searchbarmain';
import Classification from './Classification';
import Loader from '../loading/Loader';
import ProgressBar from '../loading/ProgressBar';
import Report from './Report';
import Overall from './Overall';
import API from './API';
import { makeRequest } from '@/lib/utils';
import Measurement from './Measurement';


const Verification = () => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkIPQuality, setCheckIPQuality] = useState<any>(t('No Result'));
  const [checkURLHaus, setCheckURLHaus] = useState<any>(t('No Result'));

  const data = [
    { name: 'IPQuality', status: checkIPQuality },
    { name: 'URLHaus', status: checkURLHaus },
  ];

  const [currentPercent, setCurrentPercent] = useState({
    normal: 0,
    gambling: 0,
    scam: 0,
    fake: 0,
  });
  const [maxPercent, setMaxPercent] = useState({
    normal: 0,
    gambling: 0,
    scam: 0,
    fake: 0,
  });
  const [urlPercent, setUrlPercent] = useState({
    benign_proba: 0,
    malicious_proba: 0,
  });

  const formData = new FormData();
  formData.append('url', url);
  formData.append('path', 'verification');

  const updateCurrentPercent = (newData: any) => {
    setCurrentPercent((prevCurrentPercent) => ({
      ...prevCurrentPercent,
      ...newData,
    }));
  };

  const updateMaxPercent = (newData: any) => {
    setMaxPercent((prevMaxPercent) => ({
      ...prevMaxPercent,
      ...newData,
    }));
  };

  const updateUrlPercent = (newData: any) => {
    setUrlPercent((prevUrlPercent) => ({
      ...prevUrlPercent,
      ...newData,
    }));
  };

  const getVerifyResult = async () => {
    setProgress(0);

    // const interval = setInterval(() => {
    //   setProgress((oldProgress) => {
    //     if (oldProgress === 100) {
    //       clearInterval(interval);
    //       setIsLoading(false);
    //       return 100;
    //     }
    //     return Math.min(oldProgress + 10, 100);
    //   });
    // }, 1000);

    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';

    await axios
      .post('http://127.0.0.1:8000/', formData)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          updateCurrentPercent(resp.data.classify);

          // TODO: Update Max Percent with Database (UNDONE!!!)
          updateMaxPercent({ normal: 80, gambling: 10, scam: 10, fake: 45 });

          updateUrlPercent(resp.data.url_detection);
        }
      })
      .catch((error) => {
        console.log(error);
      })
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
      setIsLoading(true); // Start Loading
      await getVerifyResult();
      // await getApi();
    } catch (error: any) {
      console.error(`An error occured: ${error}`);
    } finally {
      setIsLoading(false); // Stop Loading
    }
  };

  

  return (
    <section>
      {isLoading && (
        <div className='fixed inset-0 flex flex-col gap-12 justify-center items-center'>
          <Loader />
          {/* <ProgressBar progress={progress} /> */}
        </div>
      )}

      <div className={`${isLoading ? 'opacity-20' : ''}`}>
        <h1
          className={`text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3] relative`}
        >
          {t('title')}
        </h1>
        <h2 className='flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 '>
          {t('caption')}
        </h2>
        <SearchBarMain onPredict={predictBtn} url={url} setUrl={setUrl} />
        <div className='flex flex-col border-solid border-2 mx-28 my-8 border-slate-600 rounded-lg gap-8 py-4'>
          <Overall />
          <Report />
          <Classification
            urlPercent={urlPercent}
            currentPercent={currentPercent}
            maxPercent={maxPercent}
          />
          <Measurement />
          <API
            data={data}
            checkIPQuality={checkIPQuality}
            checkURLHaus={checkURLHaus}
          />
        </div>
      </div>
    </section>
  );
};

export default Verification;
