"use client";
import { ProgressBarProps } from "@/lib/interface/moredetail/interface";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import React from "react";

const ProgressBar: React.FC<ProgressBarProps> = ({ score, maxScore }) => {
  const t = useScopedI18n("moredetailpage");
  const currentLocale = useCurrentLocale();
  const widthPercent = (score / maxScore) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-12 dark:bg-gray-700">
      <div
        className={`bg-red-600 h-12 rounded-full`}
        style={{ width: `${widthPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
