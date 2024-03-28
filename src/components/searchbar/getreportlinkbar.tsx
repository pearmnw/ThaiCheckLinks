"use client";

import { useScopedI18n } from "@/locales/client";
import { useState } from "react";
import LoaderOnButt from "../loading/LoaderOnButt";

const ReportLinkBar = ({ onInputChange, onPredict }: any) => {
  const t = useScopedI18n("report");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formData = new FormData();
  formData.append("url", url);
  formData.append("path", "report");

  const handleInputChange = (e: any) => {
    const value = e.target.value.trim();
    setUrl(value);
    onInputChange(value);
  };

  const handleClick = async () => {
    try {
      setIsLoading(true); // Set loading state to true when button is clicked
      await onPredict(); // Call the prediction function passed as prop
    } catch (error: any) {
      console.error(`An error occurred: ${error}`);
    } finally {
      setIsLoading(false); // Set loading state to false when processing is complete
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick(); // Trigger button click event
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
            onKeyDown={handleKeyPress} // Add key press event handler
            className="ml-2 -mr-0.5 block min-w-0 flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#FFFFFF] outline-none transition duration-200 ease-in-out focus:z-[3]"
            placeholder={t("placeholder")}
            value={url}
            aria-label="Search"
            aria-describedby="button-addon3"
          />

          {/* Search button */}
          <button
            className="items-center justify-center font-semibold text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex hover:text-[#ffff] hover:bg-[#134BDE]"
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
              <div className="justify-center text-[16px]">
                {t("searchbutt")}
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportLinkBar;
