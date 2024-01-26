'use client';
import React, { useState, useEffect } from 'react';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import Classify from './textcontent/Classify';
import axios from 'axios';
import Redirected from './Redirected';
import Url from './textcontent/Url';

interface VerificationProps {
  url: string;
}

const Verification: React.FC<VerificationProps> = ({ url }) => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
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

  const formData = new FormData();
  formData.append('url', url);

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

  const predictBtn = async () => {
    try {
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common['Accept'] = 'application/json';

      await axios
        .post('http://127.0.0.1:8000/', formData)
        .then((resp) => {
          // console.log(resp.data);
          if (resp.data) {
            updateCurrentPercent(resp.data.classify);

            // TODO: Update Max Percent with Database (UNDONE!!!)
            updateMaxPercent({ normal: 80, gambling: 10, scam: 10, fake: 45 });
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
    <div className='flex flex-col border-solid border-2 mx-28 my-8 border-slate-600 rounded-lg gap-8 py-4'>
      <Url url={url} />
      <Classify
        onPredict={predictBtn}
        currentPercent={currentPercent}
        maxPercent={maxPercent}
        url={url}
      />
      <Redirected />
    </div>
  );
};

export default Verification;
