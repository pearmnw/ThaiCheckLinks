"use client";
import { useState } from "react";
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
  // Update
  const [isLinkBarChanging, setIsLinkBarChanging] = useState<boolean>(false);
  const [showReportForm, setShowReportForm] = useState<boolean>(false);

  const handleInputChange = (value: any) => {
    setUrl(value);
    setIsLinkBarChanging(true);
    setShowReportForm(false);
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
        onInputChange={handleInputChange}
        getMetaWebsite={handleMetaWebsite}
        getCurrentPercent={handleCurrentPercent}
        getSuccess={handleVerifySuccess}
      />
      {/* <ReportForm
        url={url}
        metaWebsite={metaWebsite}
        currentPercent={currentPercent}
        verifySuccess={verifySuccess}
      /> */}
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
