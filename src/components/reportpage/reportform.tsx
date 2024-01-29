"use client";
import { useScopedI18n } from "@/locales/client";
import SearchLinkBar from "../searchbar/searchlink";

const ReportForm = () => {
  const t = useScopedI18n("report");
  return (
    <>
      <div className="flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
        {t("caption2")}
      </div>
      <SearchLinkBar />
      {/* <div> */}
      <div className="flex-row px-[15rem] justify-center items-center text-slate-700 text-xl font-semibold tracking-tight">
        <div className="flex pt-10 pb-3">
          {t("Catagory")}&nbsp;
          {":"}
          <div className="px-[1rem]">
            <select
              id="webcatagory"
              defaultValue={t("typefield")}
              className="w-[280px] h-[60px] pl-2 bg-white rounded-lg shadow"
            >
              <option value="default">{t("typefield")}</option>
              <option value="gambling">{t("gambling")}</option>
              <option value="scam">{t("scam")}</option>
              <option value="fake">{t("fake")}</option>
              <option value="others">{t("others")}</option>
            </select>
          </div>
        </div>
        <div className="flex py-12">
          {t("moredetails")}&nbsp;
          {":"}
          <div className="px-[1rem]">
            {/* <input
              type="text"
              className="w-[497px] h-[163px] justify-center relative 5 bg-white bg-opacity-60 rounded-lg border border-neutral-200"
              placeholder={t("details")}
              aria-label="Search"
              aria-describedby="button-addon3"
            /> */}
            <textarea
              id="message"
              rows={4}
              className="block w-[497px] h-[163px] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("details")}
            ></textarea>
          </div>
        </div>
        <div className="flex">
          {t("bankacc")}&nbsp;
          {":"}
          <div className="px-[1rem]">
            <textarea
              id="message"
              rows={4}
              className="block w-[497px] h-[163px] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("banktext")}
            ></textarea>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="text-center py-[7rem]">
        <button
          className="items-center justify-center text-[16px] mr-2 bg-[#9F9FA4] text-white w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
          type="button"
          id="button-addon3"
          data-te-ripple-init
        >
          {t("reportbutt")}
        </button>
      </div>
    </>
  );
};
export default ReportForm;
