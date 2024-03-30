'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import Loader from '../loading/Loader';
import SearchBarMain from '../searchbar/searchbarmain';
import API from './API';
import Classification from './Classification';
import Measurement from './Measurement';
import Overall from './Overall';
import Report from './Report';

import {
  countStatus,
  defaultOverviewScore,
  getHighestVerifyScore,
  getMaliciousScore,
  makeRequest,
  scaleNumber,
} from '@/lib/utils';
import toast from 'react-hot-toast';
import LoaderBanner from '../loading/LoaderBanner';
import ProgressBarLoader from '../loading/ProgressBarLoader';

export const VerificationContext = createContext<any>(null);

const Verification = () => {
  const t = useScopedI18n('verificationpage');
  const r = useScopedI18n('report');
  const e = useScopedI18n('errormessage');
  const currentLocale = useCurrentLocale();

  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const [overviewScore, setOverviewScore] = useState<any>({
    isShow: false,
    riskScoreOverall: 0,
    maliciousUrlOverall: 0,
    userReportCount: {
      gambling: 0,
      scam: 0,
      fake: 0,
      other: 0,
      sumUserReport: 0,
    },
    maxCategoryReport: {
      _count: 0,
      _type: '',
    },
    highestVerifyOverall: {
      _count: 0,
      _type: '',
    },
    currentPercent: {
      other: 0,
      gambling: 0,
      scam: 0,
      fake: 0,
    },
    maxPercent: {
      maxOther: 0,
      maxGambling: 0,
      maxScam: 0,
      maxFake: 0,
    },
    hasAnotherDatabase: [
      {
        name: 'IPQuality',
        status: null,
      },
      {
        name: 'URLHaus',
        status: null,
      },
    ],
  });

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

  const getVerifyResult = async () => {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('path', 'verification');
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';

    await axios
      .post('https://nationally-helped-haddock.ngrok-free.app', formData)
      .then(async (res) => {
        // Display Data
        console.log(res.data);

        const { currentPercent, urlDetection, isRisk, meta_website } = res.data;

        // TODO: Compare Current score with the max score in database, if that website was exist.
        // Find max of current Percent
        const highestVerifyOverall = getHighestVerifyScore(currentPercent);

        // Calculate Percent of URL
        const maliciousUrlOverall = getMaliciousScore(
          urlDetection.maliciousUrlPercent,
          isRisk.measurement
        );

        const resp = await fetch('api/verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            WebsiteURL: url,
            MetaWebsite: meta_website,
            CurrentPercent: currentPercent,
          }),
        });
        console.log(resp);
        const data = await resp.json();
        const { VerificationInfo } = data;
        console.log(data);
        // // Custome Max Percent
        // const maxPercent = {
        //   maxOther: 80,
        //   maxGambling: 10,
        //   maxScam: 10,
        //   maxFake: 44,
        // };

        // TODO: Update Max Percent with Database (UNDONE!!!)
        if (currentPercent != null) {
          if (VerificationInfo == null) {
            setOverviewScore((prev: any) => {
              return {
                ...prev,
                maxPercent: {
                  maxOther: currentPercent.other,
                  maxGambling: currentPercent.gambling,
                  maxScam: currentPercent.scam,
                  maxFake: currentPercent.fake,
                },
                currentPercent,
                highestVerifyOverall,
                maliciousUrlOverall,
              };
            });
          } else {
            setOverviewScore((prev: any) => {
              return {
                ...prev,
                maxPercent: {
                  maxOther: VerificationInfo.MOtherPercentage,
                  maxGambling: VerificationInfo.MGamblingPercentage,
                  maxScam: VerificationInfo.MScamPercentage,
                  maxFake: VerificationInfo.MFakePercentage,
                },
                currentPercent,
                highestVerifyOverall,
                maliciousUrlOverall,
              };
            });
          }
          setCurrentPercent((prev: any) => {
            return {
              ...prev,
              fake: currentPercent.fake,
              gambling: currentPercent.gambling,
              other: currentPercent.other,
              scam: currentPercent.scam,
            };
          });
          setMetaWebsite((prev: any) => {
            return {
              ...prev,
              url: meta_website.url,
              title: meta_website.title,
              description: meta_website.description,
              keyword: meta_website.keyword,
              detail: meta_website.detail,
              status: true,
            };
          });
          setVerifySuccess(true);
        } else {
          toast.error(e('reporterrwebsiteinact'));
          if (VerificationInfo == null) {
            setOverviewScore((prev: any) => {
              return {
                ...prev,
                maxPercent: {
                  maxOther: 0,
                  maxGambling: 0,
                  maxScam: 0,
                  maxFake: 0,
                },
                currentPercent: {
                  other: 0,
                  gambling: 0,
                  scam: 0,
                  fake: 0,
                },
              };
            });
            setVerifySuccess(false);
          } else {
            let highestVerifyOverallFromDB = getHighestVerifyScore(
              overviewScore.maxPercent
            );
            setOverviewScore((prev: any) => {
              return {
                ...prev,
                currentPercent,
                highestVerifyOverall: highestVerifyOverallFromDB,
                maliciousUrlOverall,
              };
            });
            setVerifySuccess(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(e('reporterrwebsiteinact'));
        setOverviewScore(defaultOverviewScore);
      });
  };

  const fetchWebsiteDetail = async () => {
    await fetch(`/${currentLocale}/api/report?url=${url}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { userReportCount, maxCategoryReport } = data;

        setOverviewScore((prev: any) => {
          return {
            ...prev,
            userReportCount,
            maxCategoryReport,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  const getApi = async () => {
    try {
      const response_ip_quality = await fetch(
        `/${currentLocale}/api/proxy?url=${url}`
      );

      let urlWithHttp = makeRequest(url);
      const response_url_haus = await fetch(
        `/${currentLocale}/api/urlhaus?url=${urlWithHttp}`
      );

      // IPQuality API Database
      if (response_ip_quality.ok) {
        const data = await response_ip_quality.json();
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === 'IPQuality'
              ? {
                  ...db,
                  status:
                    data.spamming === true ||
                    data.malware === true ||
                    data.phishing === true ||
                    data.suspicious === true
                      ? t('FOUND')
                      : t('NOT FOUND'),
                }
              : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      } else {
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === 'IPQuality' ? { ...db, status: t('NOT FOUND') } : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      }

      // URLHause API Database
      if (!response_url_haus.ok) {
        throw new Error(`HTTP error! status: ${response_url_haus.status}`);
      }
      const data = await response_url_haus.json();

      if (data.query_status == 'ok') {
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === 'URLHaus' ? { ...db, status: t('FOUND') } : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      } else {
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === 'URLHaus' ? { ...db, status: t('NOT FOUND') } : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      }
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const [formError, setFormError] = useState({
    websiteurl: '',
  });

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
        websiteurl: r('urlError'),
      });
    } else {
      if (!urlPattern.test(url)) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: r('urlError2'),
        });
      } else if (
        url.includes(' ') ||
        url.includes('%20') ||
        url.includes('&nbsp;') ||
        url.includes('..') ||
        url.includes('[') ||
        url.includes(']')
      ) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: 'URL contains invalid characters.',
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

  const predictBtn = async () => {
    try {
      setIsLoading(true);
      setProgress(0);

      const hasURLError = await checkURL();
      if (!hasURLError) {
        setProgress(20);

        await getVerifyResult();
        setProgress(40);

        await fetchWebsiteDetail();
        setProgress(60);

        await getApi();
        setProgress(80);

        setIsLoading(false);
        setProgress(100);

        setOverviewScore((prev: any) => {
          return { ...prev, isShow: true };
        });
      } else {
        setIsLoading(false);
        setProgress(0);
      }
    } catch (error: any) {
      console.error(`An error occured: ${error}`);
    }
  };

  const newCriteria = (
    currentPercent: Record<string, number>
  ): number | any => {
    try {
      const maxScores: Record<string, number> = {
        gambling: 33,
        scam: 33,
        fake: 100,
        other: 33,
      };
      const targetPercentages: Record<string, number> = {
        gambling: 17.5,
        scam: 17.5,
        fake: 10,
        other: 0,
      };
      let adjustedScores: Record<string, number> = { gambling: 0, scam: 0, fake: 0, other: 0 };

      for (const category in currentPercent) {
        const score = currentPercent[category];
        const maxScore = maxScores[category];
        const targetPercentage =
          targetPercentages[category];

        adjustedScores[category] =
          (score / maxScore) * targetPercentage;
      }

      const totalAdjustedPercentage = Object.values(adjustedScores).reduce(
        (sum, value) => sum + value,
        0
      );
      
      console.log("New Percentage Object", adjustedScores);
      console.log('New Percentage of Overall Score:', totalAdjustedPercentage);
      return totalAdjustedPercentage;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return 0; 
    }
  };

  useEffect((): any => {
    const getOverallScore = async () => {
      const {
        // Fix User Report Score Here
        userReportCount,
        currentPercent,
        highestVerifyOverall,
        maliciousUrlOverall,
        hasAnotherDatabase,
      } = overviewScore;

      let statusCount = await countStatus(hasAnotherDatabase);
      console.log(
        'We here with sumUserReport: ' + userReportCount.sumUserReport
      );

      const reportScore = Math.min(25, userReportCount.sumUserReport);
      let verifyScore = 0;
      if (highestVerifyOverall._type === 'other') {
        verifyScore = newCriteria(currentPercent);
      } else {
        verifyScore = highestVerifyOverall._count;
      }
      const urlScore = maliciousUrlOverall;
      const apiScore = statusCount;

      const scaledVerifyFactor = scaleNumber(0, 45, 0, 100);
      const scaledUrlFactor = scaleNumber(0, 20, 0, 100);
      const scaledApiFactor = scaleNumber(0, 10, 0, 2);

      const scaledVerifyScore = highestVerifyOverall._type !== 'other' ? (verifyScore - 0) * scaledVerifyFactor + 0 : verifyScore;
      const scaledUrlScore = (urlScore - 0) * scaledUrlFactor + 0;
      const scaledApiScore = (apiScore - 0) * scaledApiFactor + 0;

      const riskScoreOverall = Math.round(
        reportScore + scaledVerifyScore + scaledUrlScore + scaledApiScore
      );

      // Display the whole score
      console.log('Verify Score:', scaledVerifyScore);
      console.log('Url Score:', scaledUrlScore);
      console.log('API Score:', scaledApiScore);
      console.log('Overall Risk Score:', riskScoreOverall);

      setOverviewScore((prev: any) => {
        return {
          ...prev,
          riskScoreOverall,
        };
      });
    };

    if (!isLoading) {
      getOverallScore();
    } else {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => (document.body.style.overflow = originalStyle);
    }
  }, [isLoading]);

  return (
    <VerificationContext.Provider value={{ overviewScore }}>
      <section>
        {isLoading && (
          <div className='fixed flex flex-col items-center justify-center gap-12 z-50 h-screen w-full'>
            {/* <Loader /> */}
            <ProgressBarLoader progress={progress} />
            <LoaderBanner />
          </div>
        )}

        <div className={`${isLoading ? 'opacity-20' : ''}`}>
          <h1
            className={`relative bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3] bg-clip-text text-center text-[48px] font-extrabold text-transparent`}
          >
            {t('title')}
          </h1>
          <h2 className='flex justify-center bg-[#011E52] bg-clip-text px-[10rem] pb-6 text-center text-[24px] font-light leading-normal text-transparent '>
            {t('caption')}
          </h2>
          <SearchBarMain
            onPredict={predictBtn}
            url={url}
            setUrl={setUrl}
            setOverview={setOverviewScore}
          />
          <p className='text-[12px] font-[500] text-center text-red-600'>
            {formError.websiteurl}
          </p>
          {overviewScore.isShow === true ? (
            <div className='mx-28 my-8 flex flex-col gap-8 rounded-lg border-2 border-solid border-slate-600 py-4'>
              <Overall
                url={url}
                metaWebsite={metaWebsite}
                currentPercent={currentPercent}
                verifySuccess={verifySuccess}
              />
              <Report />
              <Classification />
              <Measurement />
              <API />
            </div>
          ) : (
            <div className='mx-28 my-8 flex flex-row justify-center items-center gap-8 rounded-lg border-2 border-solid border-slate-600 py-4 h-screen'>
              <h1 className='text-5xl text-custom-black font-bold'>
                {t('No Result')}
              </h1>
            </div>
          )}
        </div>
      </section>
    </VerificationContext.Provider>
  );
};

export default Verification;
