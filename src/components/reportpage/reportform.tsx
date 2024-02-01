"use client";
import { useScopedI18n } from "@/locales/client";
import { useState } from "react";
import ReportLinkBar from "../searchbar/getreportlinkbar";

const ReportForm = () => {
  const t = useScopedI18n("report");

  const [formInput, setFormInput] = useState({
    userID: "",
    websiteurl: "",
    websitecategory: "",
    websitedetail: "",
    bankaccname: "",
    bankaccowner: "",
    bankaccnumber: "",
    successMsg: "",
  });

  const [formError, setFormError] = useState({
    userID: "",
    websiteurl: "",
    websitecategory: "",
    websitedetail: "",
    bankaccname: "",
    bankaccowner: "",
    bankaccnumber: "",
  });

  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
        {t("caption2")}
      </div>
      <ReportLinkBar />
      {/* <div> */}
      <div className="flex-row px-[17rem] justify-center items-center text-slate-700 text-xl font-semibold tracking-tight">
        <div className="flex pt-10 pb-3">
          {t("Catagory")}&nbsp;
          {":"}
          <div className="px-[1rem]">
            <select
              title="webcatagory"
              id="webcatagory"
              // onChange={({ target }) => {
              //   handleUserInput(target.name, target.value);
              // }}
              // name="WebsiteCategory"
              defaultValue={t("typefield")}
              className="w-[280px] h-11 pl-2 bg-white rounded-lg shadow font-normal text-neutral-500
              text-sm"
            >
              <option value="default">{t("typefield")}</option>
              <option value="gambling">{t("gambling")}</option>
              <option value="scam">{t("scam")}</option>
              <option value="fake">{t("fake")}</option>
              <option value="others">{t("others")}</option>
            </select>
          </div>
        </div>
        <div className="flex py-8">
          {t("moredetails")}&nbsp;
          {":"}
          <div className="px-[1rem]">
            <textarea
              id="message"
              name="websitedetail"
              rows={4}
              value={formInput.websitedetail}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              className="block w-[29rem] h-[10rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("details")}
            ></textarea>
          </div>
        </div>
        <div className="flex">
          {t("bankacc")}&nbsp;
          {":"}
          <div className="px-[1rem]">
            <input
              id="message"
              name="websitedetail"
              value={formInput.bankaccnumber}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              className="block w-[25rem] h-[3rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("banktext")}
            ></input>
          </div>
        </div>
        <div className="flex py-8">
          <select
            title="bankAcc"
            id="bankAcc"
            defaultValue={t("typefield")}
            className="w-[10.5rem] h-11 pl-2 bg-white rounded-lg shadow font-normal text-neutral-500
              text-sm"
          >
            <option value="default">บัญชีธนาคาร</option>
            <option value="scb">ธนาคารไทยพาณิช</option>
            <option value="kbtg">ธนาคารกรุงไทย</option>
            <option value="fake">ธนาคารทหารไทยธนชาติ</option>
            <option value="tmb">ธนาคารกรุงศรีอยุธยา</option>
            <option value="lhb">ธนาคารแลนด์แอนด์เฮาส์</option>
            <option value="gsb">ธนาคารออมสิน</option>
            <option value="others">อื่นๆ</option>
          </select>
          <div className="px-[2rem]">
            <input
              id="message"
              className="block w-[25rem] h-[3rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("banknum")}
            ></input>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="text-center py-[2.5rem]">
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
