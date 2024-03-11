import { getScopedI18n } from "@/locales/server";
import React from "react";

const success = async () => {
  const t = await getScopedI18n("reportsuccess");
  console.log("Report Success");
  return (
    <>
      <div className="text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("title")}
        </span>
      </div>
      <div className="flex justify-center text-center text-[24px] font-[300] leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
        {t("sub-title")}
        <br></br>
        {t("sub-title2")}
      </div>
      <div className="flex justify-center text-center">
        <svg
          width="412"
          height="411"
          viewBox="0 0 412 411"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            width="411"
            height="411"
            rx="205.5"
            fill="#32936F"
            fillOpacity="0.24"
          />
          <path
            d="M325.005 107.673C323.456 105.882 321.613 104.461 319.583 103.491C317.552 102.521 315.375 102.021 313.175 102.021C310.976 102.021 308.798 102.521 306.767 103.491C304.737 104.461 302.894 105.882 301.345 107.673L177.215 250.207L125.063 190.213C123.455 188.431 121.556 187.03 119.476 186.09C117.396 185.15 115.174 184.689 112.939 184.734C110.703 184.778 108.497 185.327 106.446 186.349C104.395 187.371 102.54 188.846 100.987 190.69C99.4332 192.535 98.2116 194.712 97.3918 197.097C96.572 199.483 96.1699 202.03 96.2086 204.594C96.2473 207.157 96.7259 209.687 97.6172 212.039C98.5085 214.39 99.795 216.518 101.403 218.299L165.385 291.668C166.934 293.458 168.776 294.88 170.807 295.85C172.837 296.82 175.015 297.319 177.215 297.319C179.414 297.319 181.592 296.82 183.622 295.85C185.653 294.88 187.496 293.458 189.044 291.668L325.005 135.76C326.696 133.97 328.046 131.799 328.969 129.382C329.892 126.965 330.369 124.355 330.369 121.716C330.369 119.078 329.892 116.468 328.969 114.051C328.046 111.634 326.696 109.462 325.005 107.673V107.673Z"
            fill="#32936F"
          />
        </svg>
      </div>
      <div className="text-center text-[48px] text-[#1C5842] font-extrabold">
        {t("successmess")}
      </div>
    </>
  );
};

export default success;
