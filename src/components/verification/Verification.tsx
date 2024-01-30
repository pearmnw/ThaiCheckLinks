'use client';
import React, { useState } from 'react';
import { useScopedI18n } from '@/locales/client';
import axios from 'axios';
import SearchBarMain from '../searchbar/searchbarmain';
import Classification from './Classification';
import Caption from './Caption';


const Verification = () => {
  const t = useScopedI18n('verificationpage');
  const [url, setUrl] = useState('');

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

  const predictBtn = async () => {
    try {
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
        });
    } catch (error: any) {
      console.error(`An error occured: ${error}`);
    }
  };


  return (
    <div className='text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]'>
      {t('title')}
      <Caption />
      <SearchBarMain onPredict={predictBtn} url={url} setUrl={setUrl} />
      <Classification urlPercent={urlPercent} currentPercent={currentPercent} maxPercent={maxPercent}/>
    </div>
  );
};

export default Verification;
