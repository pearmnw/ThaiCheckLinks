"use client";

import { useScopedI18n } from "@/locales/client";
import { useState } from "react";

const ReportLinkBar = () => {
  const t = useScopedI18n("report");
  // const currentLocale = useCurrentLocale();
  const [url, setUrl] = useState("");

  const handleInputChange = (e: any) => {
    setUrl(e.target.value);
  };

  const handleClick = async () => {
    console.log(url);
    localStorage.setItem("url", url);
    console.log(localStorage.getItem("url"));
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
          >
            {t("searchbutt")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportLinkBar;
