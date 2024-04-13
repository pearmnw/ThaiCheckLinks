"use client";
import { useScopedI18n } from "@/locales/client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import ReportLinkBar from "../searchbar/getreportlinkbar";
import ReportForm from "./reportform";

const ReportContainer = () => {
  const [url, setUrl] = useState("");
  const t = useScopedI18n("report");
  const e = useScopedI18n("errormessage");
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
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  // Update
  const [isLinkBarChanging, setIsLinkBarChanging] = useState<boolean>(false);
  const [showReportForm, setShowReportForm] = useState<boolean>(false);

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

  const getVerifyResult = async () => {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("path", "report");
    console.log(url);
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    try {
      const resp = await axios.post(
        "https://nationally-helped-haddock.ngrok-free.app",
        formData
      );
      console.log(resp.data);
      // resp.data.classify !== null
      if (
        resp.data.classify.fake == 0 &&
        resp.data.classify.scam == 0 &&
        resp.data.classify.other == 0 &&
        resp.data.classify.gambling == 0
      ) {
        throw {
          message: e("errurl1"),
        };
      } else {
        updateCurrentPercent(resp.data.classify);
        updateMetaWebsite(resp.data.meta_website);
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      if (axiosError.message === "Network Error") {
        // toast.error(e("errurl2"));
        console.log(e("errurl2"));
      } else {
        // toast.error(axiosError.message);
        console.log(axiosError.message);
      }
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
        websiteurl: t("urlError"),
      });
    } else {
      if (
        // !urlPattern.test(url) &&
        !urlDomain.test(url) &&
        !urlWithPathPattern.test(url) &&
        !urlWithSubdomainpattern.test(url)
      ) {
        hasError = true;
        setFormError({
          ...inputError,
          websiteurl: t("urlError2"),
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
          websiteurl: t("urlError3"),
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
      <p className="text-[12px] font-[500] text-center text-red-600">
        {formError.websiteurl}
      </p>
      {showReportForm &&
        !isLinkBarChanging && ( // Conditionally render ReportForm if it should be shown and ReportLinkBar is not changing
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
