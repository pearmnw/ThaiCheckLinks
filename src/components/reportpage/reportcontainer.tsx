'use client';
import { useScopedI18n } from '@/locales/client';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import ReportLinkBar from '../searchbar/getreportlinkbar';
import ReportForm from './reportform';

const ReportContainer = () => {
  const [url, setUrl] = useState('');
  const t = useScopedI18n('report');
  const e = useScopedI18n('errormessage');

  useEffect(() => {
    // Set localStorage item when component mounts
    localStorage.setItem('prevpath', 'report');
  }, []);

  const [currentPercent, setCurrentPercent] = useState({
    fake: 0,
    gambling: 0,
    other: 0,
    scam: 0,
  });

  const [metaWebsite, setMetaWebsite] = useState({
    url: '',
    title: '',
    description: '',
    keyword: '',
    detail: '',
    status: true,
  });

  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);

  const [isLinkBarChanging, setIsLinkBarChanging] = useState<boolean>(false);

  const [showReportForm, setShowReportForm] = useState<boolean>(false);

  // function to set the URL, search bar, and undisplay the report form
  const handleInputChange = (value: any) => {
    setUrl(value);
    setIsLinkBarChanging(true);
    setShowReportForm(false);
  };

  const updateCurrentPercent = (newData: any) => {
    setCurrentPercent((prevCurrentPercent) => ({
      ...prevCurrentPercent,
      ...newData,
    }));
  };

  const updateMetaWebsite = (newData: any) => {
    setMetaWebsite((prevMetaWebsite) => ({
      ...prevMetaWebsite,
      ...newData,
    }));
  };

  // function to get the verification data from the Machine Learning
  const getVerifyResult = async () => {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('path', 'report');
    console.log(url);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    try {
      // Call API and get respond
      const resp = await axios.post('http://127.0.0.1:8000', formData);
      console.log(resp.data);
      if (
        resp.data.classify.fake == 0 &&
        resp.data.classify.scam == 0 &&
        resp.data.classify.other == 0 &&
        resp.data.classify.gambling == 0
      ) {
        throw {
          message: e('errurl1'),
        };
      } else {
        updateCurrentPercent(resp.data.classify);
        updateMetaWebsite(resp.data.meta_website);
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      if (axiosError.message === 'Network Error') {
        console.log(e('errurl2'));
      } else {
        console.log(axiosError.message);
      }
    }
  };

  const [formError, setFormError] = useState({
    websiteurl: '',
  });

  // function to check the inputed URL and display the error
  const checkURL = async () => {
    let hasError = false;
    const urlPattern =
      /([https?]{3,9}:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g;

    const inputError = {
      websiteurl: '',
    };

    if (!url) {
      hasError = true;
      setFormError({
        ...inputError,
        websiteurl: t('urlError'),
      });
    } else {
      if (!urlPattern.test(url)) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: t('urlError2'),
        });
      } else if (
        url.includes(' ') ||
        url.includes('%20') ||
        url.includes('&nbsp;') ||
        url.includes('..') ||
        url.includes('.com.com')
      ) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: t('urlError3'),
        });
      } else {
        setFormError({
          ...inputError,
          websiteurl: '',
        });
      }
    }
    return hasError;
  };

  // Function to call checkURL(), getVerifyResult() and set the handleVerifySuccess()
  const predictFunc = async () => {
    try {
      const hasURLError = await checkURL();
      if (!hasURLError) {
        await getVerifyResult();
        handleVerifySuccess(true);
      } else {
        handleVerifySuccess(false);
      }
    } catch (error: any) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const handleVerifySuccess = (value: any) => {
    if (value == true) {
      setVerifySuccess(true);
      setShowReportForm(true);
    } else {
      setVerifySuccess(false);
      setShowReportForm(false);
    }
    setIsLinkBarChanging(false);
  };

  return (
    <>
      <ReportLinkBar
        // get URL
        onInputChange={handleInputChange}
        onPredict={predictFunc}
      />
      <p className='text-[12px] font-[500] text-center text-red-600'>
        {formError.websiteurl}
      </p>
      {showReportForm && !isLinkBarChanging && (
        // Conditionally render ReportForm if it should be shown and ReportLinkBar is not changing
        <ReportForm
          url={url}
          metaWebsite={metaWebsite}
          currentPercent={currentPercent}
          verifySuccess={verifySuccess}
        />
      )}
      :<></>
    </>
  );
};

export default ReportContainer;
