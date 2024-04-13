"use client";

import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

import SearchBarMain from "../searchbar/searchbarmain";
import API from "./API";
import Classification from "./Classification";
import Measurement from "./Measurement";
import Overall from "./Overall";
import Report from "./Report";

import {
  countStatus,
  defaultOverviewScore,
  getDomainName,
  getHighestVerifyScore,
  getMaliciousScore,
  makeRequest,
  scaleNumber,
} from "@/lib/utils";
import toast from "react-hot-toast";
import LoaderBanner from "../loading/LoaderBanner";
import ProgressBarLoader from "../loading/ProgressBarLoader";

export const VerificationContext = createContext<any>(null);

const Verification = () => {
  const t = useScopedI18n("verificationpage");
  const r = useScopedI18n("report");
  const e = useScopedI18n("errormessage");
  const currentLocale = useCurrentLocale();

  const [url, setUrl] = useState<string>("");
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
      _type: "",
    },
    highestVerifyOverall: {
      _count: 0,
      _type: "",
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
        name: "IPQuality",
        status: null,
      },
      {
        name: "URLHaus",
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
    url: "",
    title: "",
    description: "",
    keyword: "",
    detail: "",
    status: true,
  });

  const [verifySuccess, setVerifySuccess] = useState<boolean>(true);

  const getVerifyResult = async () => {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("path", "verification");
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";

    await axios
      .post("https://nationally-helped-haddock.ngrok-free.app", formData)
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

        const resp = await fetch("api/verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
          if (
            currentPercent.scam == 0 &&
            currentPercent.fake == 0 &&
            currentPercent.other == 0 &&
            currentPercent.gambling == 0
          ) {
            toast.custom((t) => (
              <div className="flex align-middle items-center justify-center w-full h-screen">
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-[#ffcc00]">
                      <svg
                        fill="#ffffff"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="70px"
                        height="70px"
                        viewBox="0 0 478.13 478.13"
                        xmlSpace="preserve"
                        stroke="#ffffff"
                        strokeWidth="0.00478125"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <g>
                              {" "}
                              <g>
                                {" "}
                                <circle
                                  cx="239.904"
                                  cy="314.721"
                                  r="35.878"
                                />{" "}
                                <path d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9 c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z" />{" "}
                                <path d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062 S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595 s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z" />{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      <h3 className="pl-5 text-[35px] font-semibold text-[#ffffff] dark:text-white">
                        {e("caution")}
                      </h3>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault(); // This line prevents the default form submission
                          toast.dismiss(t.id);
                        }}
                        className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-[10px] text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-4 md:p-5 text-justify space-y-4">
                      <p className="text-xl text-center font-medium text-gray-900">
                        {e("reporterrwebsiteinact")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ));
          } else {
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
          }
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
            // Still True because if the verification can not use the user still can report.
            setVerifySuccess(true);
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
        // toast.error(e("reporterrwebsiteinact"));
        toast.custom((t) => (
          <div className="flex align-middle items-center justify-center w-full h-screen">
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-[#ffcc00]">
                  <svg
                    fill="#ffffff"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="70px"
                    height="70px"
                    viewBox="0 0 478.13 478.13"
                    xmlSpace="preserve"
                    stroke="#ffffff"
                    strokeWidth="0.00478125"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <circle cx="239.904" cy="314.721" r="35.878" />{" "}
                            <path d="M256.657,127.525h-31.9c-10.557,0-19.125,8.645-19.125,19.125v101.975c0,10.48,8.645,19.125,19.125,19.125h31.9 c10.48,0,19.125-8.645,19.125-19.125V146.65C275.782,136.17,267.138,127.525,256.657,127.525z" />{" "}
                            <path d="M239.062,0C106.947,0,0,106.947,0,239.062s106.947,239.062,239.062,239.062c132.115,0,239.062-106.947,239.062-239.062 S371.178,0,239.062,0z M239.292,409.734c-94.171,0-170.595-76.348-170.595-170.596c0-94.248,76.347-170.595,170.595-170.595 s170.595,76.347,170.595,170.595C409.887,333.387,333.464,409.734,239.292,409.734z" />{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <h3 className="pl-5 text-[35px] font-semibold text-[#ffffff] dark:text-white">
                    {e("caution")}
                  </h3>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault(); // This line prevents the default form submission
                      toast.dismiss(t.id);
                    }}
                    className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-[10px] text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 text-justify space-y-4">
                  <p className="text-xl text-center font-medium text-gray-900">
                    {e("reporterrwebsiteinact")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
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
      let domainName = getDomainName(url);
      const response_ip_quality = await fetch(
        `/${currentLocale}/api/proxy?url=${domainName}`
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
            db.name === "IPQuality"
              ? {
                  ...db,
                  status:
                    data.spamming === true ||
                    data.malware === true ||
                    data.phishing === true ||
                    data.suspicious === true
                      ? t("FOUND")
                      : t("NOT FOUND"),
                }
              : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      } else {
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === "IPQuality" ? { ...db, status: t("NOT FOUND") } : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      }

      // URLHause API Database
      if (!response_url_haus.ok) {
        throw new Error(`HTTP error! status: ${response_url_haus.status}`);
      }
      const data = await response_url_haus.json();

      if (data.query_status == "ok") {
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === "URLHaus" ? { ...db, status: t("FOUND") } : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      } else {
        setOverviewScore((prev: any) => {
          const updatedDatabases = prev.hasAnotherDatabase.map((db: any) =>
            db.name === "URLHaus" ? { ...db, status: t("NOT FOUND") } : db
          );
          return { ...prev, hasAnotherDatabase: updatedDatabases };
        });
      }
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const [formError, setFormError] = useState({
    websiteurl: "",
  });

  const checkURL = async () => {
    let hasError = false;

    // URL Pattern will be change
    const urlPattern =
      /([https?]{3,9}:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g;
    const urlDomain =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/gm;
    const urlWithPathPattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}/gm;

    const urlWithSubdomainpattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/gm;

    const inputError = {
      websiteurl: "",
    };

    if (!url) {
      hasError = true;
      setFormError({
        ...inputError,
        websiteurl: r("urlError"),
      });
    } else {
      if (
        !urlPattern.test(url) &&
        !urlDomain.test(url) &&
        !urlWithPathPattern.test(url) &&
        !urlWithSubdomainpattern.test(url)
      ) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: r("urlError2"),
        });
      } else if (
        url.includes(" ") ||
        url.includes("%20") ||
        url.includes("&nbsp;") ||
        url.includes("..") ||
        // url.includes("[") ||
        // url.includes("]") ||
        url.includes(".com.com")
      ) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: "URL contains invalid characters.",
        });
      } else {
        setFormError({
          ...inputError,
          websiteurl: "",
        });
      }
    }
    return hasError;
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const predictBtn = async () => {
    try {
      setIsLoading(true);
      setProgress(0);

      const hasURLError = await checkURL();
      if (!hasURLError) {
        setProgress(20);

        await getVerifyResult();
        setProgress(40);

        setProgress(60);
        await fetchWebsiteDetail();

        setProgress(80);
        await getApi();

        setProgress(100);
        await delay(1000);
        setIsLoading(false);

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
      const maxScores = {
        gambling: 33,
        scam: 33,
        fake: 100,
        other: 33,
      };
      const targetPercentages = {
        gambling: 17.5,
        scam: 17.5,
        fake: 10,
        other: 0,
      };
      let adjustedScores = { gambling: 0, scam: 0, fake: 0, other: 0 };

      for (const category in currentPercent) {
        const score = currentPercent[category];
        const maxScore = maxScores[category];
        const targetPercentage = targetPercentages[category];

        adjustedScores[category] = (score / maxScore) * targetPercentage;
      }

      const totalAdjustedPercentage = Object.values(adjustedScores).reduce(
        (sum, value) => sum + value,
        0
      );

      console.log("New Percentage Object", adjustedScores);
      console.log("New Percentage of Overall Score:", totalAdjustedPercentage);
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
        "We here with sumUserReport: " + userReportCount.sumUserReport
      );

      const reportScore = Math.min(25, userReportCount.sumUserReport);
      let verifyScore = 0;
      if (highestVerifyOverall._type === "other") {
        verifyScore = newCriteria(currentPercent);
      } else {
        verifyScore = highestVerifyOverall._count;
      }
      const urlScore = maliciousUrlOverall;
      const apiScore = statusCount;

      const scaleReportFactor = scaleNumber(0, 30, 0, 25);
      const scaledVerifyFactor = scaleNumber(0, 50, 0, 100);
      const scaledUrlFactor = scaleNumber(0, 15, 0, 100);
      const scaledApiFactor = scaleNumber(0, 5, 0, 2);

      const scaledReportScore = (reportScore - 0) * scaleReportFactor + 0;

      const scaledVerifyScore =
        highestVerifyOverall._type !== "other"
          ? (verifyScore - 0) * scaledVerifyFactor + 0
          : verifyScore;
      const scaledUrlScore = (urlScore - 0) * scaledUrlFactor + 0;
      const scaledApiScore = (apiScore - 0) * scaledApiFactor + 0;

      const riskScoreOverall = Math.round(
        scaledReportScore + scaledVerifyScore + scaledUrlScore + scaledApiScore
      );

      // Display the whole score
      console.log("Report Score:", scaledReportScore);
      console.log("Verify Score:", scaledVerifyScore);
      console.log("Url Score:", scaledUrlScore);
      console.log("API Score:", scaledApiScore);
      console.log("Overall Risk Score:", riskScoreOverall);

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
      document.body.style.overflow = "hidden";

      return () => (document.body.style.overflow = originalStyle);
    }
  }, [isLoading]);

  return (
    <VerificationContext.Provider value={{ overviewScore }}>
      <section>
        {isLoading && (
          <div className="fixed flex flex-col items-center justify-center gap-12 z-50 h-screen w-full">
            {/* <Loader /> */}
            <ProgressBarLoader progress={progress} />
            <LoaderBanner />
          </div>
        )}

        <div className={`${isLoading ? "opacity-20" : ""}`}>
          <h1
            className={`relative bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3] bg-clip-text text-center text-[48px] font-extrabold text-transparent`}
          >
            {t("title")}
          </h1>
          <h2 className="flex justify-center bg-[#011E52] bg-clip-text px-[10rem] pb-6 text-center text-[24px] font-light leading-normal text-transparent ">
            {t("caption")}
          </h2>
          <SearchBarMain
            onPredict={predictBtn}
            url={url}
            setUrl={setUrl}
            setOverview={setOverviewScore}
          />
          <p className="text-[12px] font-[500] text-center text-red-600">
            {formError.websiteurl}
          </p>
          {overviewScore.isShow === true ? (
            <div className="mx-28 my-8 flex flex-col gap-8 rounded-lg border-2 border-solid border-slate-600 py-4">
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
            // <div className="mx-28 my-8 flex flex-row justify-center items-center gap-8 rounded-lg border-2 border-solid border-slate-600 py-4 h-screen">
            //   <h1 className="text-5xl text-custom-black font-bold">
            //     {t("No Result")}
            //   </h1>
            // </div>
            <></>
          )}
        </div>
      </section>
    </VerificationContext.Provider>
  );
};

export default Verification;
