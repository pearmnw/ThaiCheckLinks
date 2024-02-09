"use client";
import { useState } from "react";
import ReportLinkBar from "../searchbar/getreportlinkbar";
import ReportForm from "./reportform";

const ReportContainer = () => {
  const [url, setUrl] = useState("");

  const handleInputChange = (value: any) => {
    setUrl(value);
  };

  return (
    <>
      <ReportLinkBar onInputChange={handleInputChange} />
      <ReportForm url={url} />
    </>
  );
};

export default ReportContainer;
