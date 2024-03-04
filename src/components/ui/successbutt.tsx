"use client";
import { useScopedI18n } from "@/locales/client";
import React from "react";

const SuccessButton = () => {
  const t = useScopedI18n("report");
  return (
    <button
      className="items-center justify-center text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[69px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
      type="button"
      id="button-addon3"
      data-te-ripple-init
    >
      <span>
        <svg
          className="w-6 h-6 text-[#32936F] dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m5 12 4.7 4.5 9.3-9"
          />
        </svg>
      </span>
      {t("searchbutt")}
    </button>
  );
};
export default SuccessButton;
