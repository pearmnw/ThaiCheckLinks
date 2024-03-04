"use client";

import { useScopedI18n } from "@/locales/client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoaderOnButt from "../loading/LoaderOnButt";

const ReportLinkBar = ({
  onInputChange,
  getMetaWebsite,
  getCurrentPercent,
  getSuccess,
}: any) => {
  const t = useScopedI18n("report");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [currentPercent, setCurrentPercent] = useState({
    fake: 0,
    gambling: 0,
    other: 0,
    scam: 0,
  });
  // const [maxPercent, setMaxPercent] = useState({
  //   fake: 0,
  //   gambling: 0,
  //   other: 0,
  //   scam: 0,
  // });
  const [metaWebsite, setMetaWebsite] = useState({
    url: "",
    title: "",
    description: "",
    keyword: "",
    detail: "",
    status: true,
  });

  const [verifyInfo, setVerifyInfo] = useState({
    url: "",
    title: "",
    description: "",
    keyword: "",
    detail: "",
    status: true,
    normal: 0,
    gambling: 0,
    scam: 0,
    fake: 0,
  });

  const [formError, setFormError] = useState({
    websiteurl: "",
  });

  const formData = new FormData();
  formData.append("url", url);
  formData.append("path", "report");

  const updateCurrentPercent = (newData: any) => {
    setCurrentPercent((prevCurrentPercent) => ({
      ...prevCurrentPercent,
      ...newData,
    }));
  };

  // const updateMaxPercent = (newData: any) => {
  //   setMaxPercent((prevMaxPercent) => ({
  //     ...prevMaxPercent,
  //     ...newData,
  //   }));
  // };

  const updateMetaWebsite = (newData: any) => {
    setMetaWebsite((prevMetaWebsite) => ({
      ...prevMetaWebsite,
      ...newData,
    }));
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setUrl(value);
    onInputChange(value);
  };

  const getVerifyResult = async () => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";

    await axios
      .post("http://127.0.0.1:8000/", formData)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          updateCurrentPercent(resp.data.classify);

          // // TODO: Update Max Percent with Database (UNDONE!!!)
          // updateMaxPercent({ normal: 80, gambling: 10, scam: 10, fake: 45 });

          updateMetaWebsite(resp.data.meta_website);
        } else {
          throw { message: "Can not verify this website" };
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const checkURL = async () => {
    let hasError = false;
    const urlPattern = /^(https?:\/\/)/;
    const inputError = {
      websiteurl: "",
    };

    if (!url) {
      hasError = true;
      setFormError({
        ...inputError,
        websiteurl: t("urlError"),
      });
    } else {
      if (!urlPattern.test(url)) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: t("urlError2"),
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

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const hasURLError = await checkURL();
      if (!hasURLError) {
        await getVerifyResult();
        setIsLoading(false); // Stop Loading
        setIsSuccess(true);
        console.log(verifyInfo);
      } else {
        setIsLoading(false); // Stop Loading
        setIsSuccess(false);
        console.log(verifyInfo);
      }
    } catch (error: any) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const handleVerifyInfo = async () => {
    try {
      console.log(metaWebsite);
      console.log(currentPercent);

      getMetaWebsite(metaWebsite);
      getCurrentPercent(currentPercent);
      setIsSuccess(false);
      getSuccess(true);
    } catch (error: any) {
      console.error(`An error occurred: ${error}`);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-3">
        <div className="flex justify-center items-center w-[650px] h-[66px] rounded-[50px] bg-[#121B2B]">
          <div className="pl-5">
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
                />
              </svg>
            </span>
          </div>
          <input
            type="search"
            onChange={handleInputChange}
            className="ml-2 -mr-0.5 block min-w-0 flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#FFFFFF] outline-none transition duration-200 ease-in-out focus:z-[3]"
            placeholder={t("placeholder")}
            aria-label="Search"
            aria-describedby="button-addon3"
          />

          {/* Search button */}
          <button
            className="items-center justify-center text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
            type="button"
            id="button-addon3"
            data-te-ripple-init
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <div>
                <LoaderOnButt />
                {/* <ProgressBar progress={progress} /> */}
              </div>
            ) : (
              <div className="justify-center text-[16px] text-[#134BDE]">
                {t("searchbutt")}
              </div>
            )}
          </button>
        </div>
      </div>
      <p className="text-[12px] font-[500] text-center text-red-600">
        {formError.websiteurl}
      </p>
      <div className="flex justify-center mb-3">
        <button
          type="button"
          id="button-addon3"
          data-te-ripple-init
          onClick={handleVerifyInfo}
        >
          {isSuccess && !isLoading ? (
            <div
              className="items-center justify-center text-[16px] mr-2 bg-[#121B2B] text-white w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
              id="button-addon3"
              data-te-ripple-init
            >
              {t("reportbutt")}
            </div>
          ) : (
            <div></div>
          )}
        </button>
      </div>
    </>
  );
};

export default ReportLinkBar;
