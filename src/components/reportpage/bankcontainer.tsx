"use client";
import { useScopedI18n } from "@/locales/client";
import React, { useState } from "react";

const BankContainer = () => {
  const t = useScopedI18n("report");

  const [open, setOpen] = useState(true);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const [formInput, setFormInput] = useState({
    bankaccountowner: "",
    bank: "",
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
      <div className="flex">
        <button
          id="states-button"
          data-dropdown-toggle="dropdown-states"
          className="flex"
          type="button"
          onClick={toggleDropdown}
        >
          {t("bankacc")}&nbsp;
          <svg
            className={`w-3 h-3 ms-3 m-auto transform ${
              open ? "" : "rotate-180"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>
      <div
        id="dropdown-states"
        className={`${open ? "" : "hidden"} bg-[#CCD2DE] m-2 p-8 rounded-md`}
      >
        <div className="px-[1rem]">
          <input
            id="bankaccountowner"
            name="bankaccountowner"
            value={formInput.bankaccountowner}
            onChange={({ target }) => {
              console.log("Selected value:", target.value);
              handleUserInput(target.name, target.value);
            }}
            className="block w-[25rem] h-[3rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("banktext")}
          />
        </div>
        <div className="flex pt-8">
          <select
            title="bank"
            id="bank"
            name="bank"
            value={formInput.bank}
            onChange={({ target }) => {
              console.log("Selected value:", target.value);
              handleUserInput(target.name, target.value);
            }}
            className="w-[10.5rem] h-11 pl-2 bg-white rounded-lg shadow font-normal text-neutral-500
  text-sm"
          >
            <option value="default">{t("bank")}</option>
            <option value="scb">{t("scb")}</option>
            <option value="kbtg">{t("kbtg")}</option>
            <option value="ktb">{t("ktb")}</option>
            <option value="ttb">{t("ttb")}</option>
            <option value="boa">{t("boa")}</option>
            <option value="lhb">{t("lhb")}</option>
            <option value="gsb">{t("gsb")}</option>
            <option value="others">{t("bankothers")}</option>
          </select>

          <div className="px-[1rem]">
            <input
              id="bankaccnumber"
              name="bankaccnumber"
              value={formInput.bankaccnumber}
              onChange={({ target }) => {
                console.log("Selected value:", target.value);
                handleUserInput(target.name, target.value);
              }}
              className="block w-[25rem] h-[3rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t("banknum")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankContainer;
