"use client";
import React, { useState } from "react";
import ReportLinkBar from "../searchbar/getreportlinkbar";
import ReportForm from "./reportform";

const ReportContainer = () => {
  const [url, setUrl] = useState("");
  const [currentPercent, setCurrentPercent] = useState({
    normal: 0,
    gambling: 0,
    scam: 0,
    fake: 0,
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

  const handleInputChange = (value: any) => {
    setUrl(value);
  };

  const handleMetaWebsite = (value: any) => {
    setMetaWebsite(value);
  };

  const handleCurrentPercent = (value: any) => {
    setCurrentPercent(value);
  };

  const handleVerifySuccess = (value: any) => {
    if (value == true) {
      setVerifySuccess(true);
    }
  };

  return (
    <>
      <ReportLinkBar
        onInputChange={handleInputChange}
        getMetaWebsite={handleMetaWebsite}
        getCurrentPercent={handleCurrentPercent}
        getSuccess={handleVerifySuccess}
      />
      <ReportForm
        url={url}
        metaWebsite={metaWebsite}
        currentPercent={currentPercent}
        verifySuccess={verifySuccess}
      />
    </>
  );
};

export default ReportContainer;
