'use client';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

import Loader from '../loading/Loader';
import SearchBarMain from '../searchbar/searchbarmain';
import API from './API';
import Classification from './Classification';
import Measurement from './Measurement';
import Overall from './Overall';
import Report from './Report';

import {
  countStatus,
  getHighestVerifyScore,
  getMaliciousScore,
  makeRequest,
  scaleNumber,
} from '@/lib/utils';

export const VerificationContext = createContext<any>(null);

const Verification = () => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();

  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    metaWebsite: {
      url: '',
      title: '',
      description: '',
      keyword: '',
      detail: '',
      status: true,
    },
  });

  const getVerifyResult = async () => {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('path', 'verification');
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';

    await axios
      .post('http://127.0.0.1:8000/', formData)
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
        const data = await resp.json();
        const { VerificationInfo } = data;
        console.log(data);
        const maxPercent = {
          maxOther: VerificationInfo.MOtherPercentage,
          maxGambling: VerificationInfo.MGamblingPercentage,
          maxScam: VerificationInfo.MScamPercentage,
          maxFake: VerificationInfo.MFakePercentage,
        };

        // TODO: Update Max Percent with Database (UNDONE!!!)
        if (currentPercent != null) {
          setOverviewScore((prev: any) => {
            return {
              ...prev,
              maxPercent: maxPercent,
              currentPercent,
              highestVerifyOverall,
              maliciousUrlOverall,
            };
          });
        } else {
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
          } else {
            let highestVerifyOverallFromDB = getHighestVerifyScore(maxPercent);
            setOverviewScore((prev: any) => {
              return {
                ...prev,
                maxPercent: maxPercent,
                currentPercent,
                highestVerifyOverall: highestVerifyOverallFromDB,
                maliciousUrlOverall,
              };
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
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

  const predictBtn = async () => {
    try {
      setIsLoading(true); // Start Loading
      await getVerifyResult();
      await fetchWebsiteDetail();
      await getApi();
    } catch (error: any) {
      console.error(`An error occured: ${error}`);
    } finally {
      setIsLoading(false); // Stop Loading
      setOverviewScore((prev: any) => {
        return { ...prev, isShow: true };
      });
    }
  };

  useEffect(() => {
    const getOverallScore = async () => {
      const {
        maxCategoryReport,
        highestVerifyOverall,
        maliciousUrlOverall,
        hasAnotherDatabase,
      } = overviewScore;
      let statusCount = await countStatus(hasAnotherDatabase);

      const reportScore =
        maxCategoryReport._type === 'other'
          ? 0
          : Math.min(25, maxCategoryReport._count);
      const verifyScore =
        highestVerifyOverall._type === 'other'
          ? 0
          : highestVerifyOverall._count;
      const urlScore = maliciousUrlOverall;
      const apiScore = statusCount;

      const scaledVerifyFactor = scaleNumber(0, 45, 0, 100);
      const scaledApiFactor = scaleNumber(0, 10, 0, 2);
      const scaledUrlFactor = scaleNumber(0, 20, 0, 100);

      const scaledVerifyScore = (verifyScore - 0) * scaledVerifyFactor + 0;
      const scaledUrlScore = (urlScore - 0) * scaledUrlFactor + 0;
      const scaledApiScore = (apiScore - 0) * scaledApiFactor + 0;

      const riskScoreOverall = Math.round(
        reportScore + scaledVerifyScore + scaledUrlScore + scaledApiScore
      );

      setOverviewScore((prev: any) => {
        return {
          ...prev,
          riskScoreOverall,
        };
      });
    };

    if (!isLoading) {
      getOverallScore();
    }
  }, [isLoading]);

  return (
    <VerificationContext.Provider value={{ overviewScore }}>
      <section>
        {isLoading && (
          <div className='fixed inset-0 flex flex-col items-center justify-center gap-12'>
            <Loader />
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
          {overviewScore.isShow === true ? (
            <div className='mx-28 my-8 flex flex-col gap-8 rounded-lg border-2 border-solid border-slate-600 py-4'>
              <Overall />
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
