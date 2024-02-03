"use client";
import { useScopedI18n } from "@/locales/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReportLinkBar from "../searchbar/getreportlinkbar";

const ReportForm = () => {
  const t = useScopedI18n("report");
  const router = useRouter();
  const websiteurl = localStorage.getItem("url");

  const [allData, setAllData] = useState({
    userID: "",
    websiteurl: "",
    websitecategory: "",
    websitedetail: "",
    bankaccountowner: "",
    bank: "",
    bankaccnumber: "",
  });

  const [formInput, setFormInput] = useState({
    userID: "",
    websitecategory: "",
    websitedetail: "",
    bankaccountowner: "",
    bank: "",
    bankaccnumber: "",
    successMsg: "",
  });

  const [formError, setFormError] = useState({
    userID: "",
    websitecategory: "",
    websitedetail: "",
    bankaccname: "",
    bankaccountowner: "",
    bankaccnumber: "",
  });

  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleAllInput = () => {
    setAllData({
      ...allData,
      userID: formInput.userID,
      websiteurl: websiteurl!,
      websitecategory: formInput.websitecategory,
      websitedetail: formInput.websitedetail,
      bankaccountowner: formInput.bankaccountowner,
      bank: formInput.bank,
      bankaccnumber: formInput.bankaccnumber,
    });
  };

  const validateFormInput = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let hasErrors = false;

    if (formInput.websitecategory === "default") {
      setFormError({
        ...formError,
        websitecategory: t("webCatError"),
      });
      console.log("Category not provided");
      hasErrors = true;
    } else {
      setFormError({
        ...formError,
        websitecategory: "",
      });
    }

    if (!formInput.websitedetail) {
      console.log("Website details not provided");
      setFormError({
        ...formError,
        websitedetail: t("moredetailError"),
      });
      hasErrors = true;
    } else {
      setFormError({
        ...formError,
        websitedetail: "",
      });
    }

    handleAllInput();

    if (!hasErrors) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    try {
      console.log(allData);
      // const res = await fetch("api/linkreport", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({}),
      // });
      // const data = await res.json();
      // if (res.ok) {
      //   toast.success(data.message);
      //   router.push("/success");
      // } else {
      //   console.log("Report Failed");
      //   toast.error(data.message);
      //   setFormInput((prevState) => ({
      //     ...prevState,
      //     successMsg: "",
      //   }));
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
        {t("caption2")}
      </div>
      <ReportLinkBar />
      <form onSubmit={validateFormInput}>
        <div className="flex-row px-[17rem] justify-center items-center text-slate-700 text-xl font-semibold tracking-tight">
          <div className="flex pt-10 pb-3">
            {t("Catagory")}&nbsp;
            {":"}
            <div className="px-[1rem]">
              <select
                title="webcatagory"
                id="webcatagory"
                name="websitecategory"
                value={formInput.websitecategory}
                onChange={({ target }) => {
                  console.log("Selected value:", target.value);
                  handleUserInput(target.name, target.value);
                }}
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
            <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
              {formError.websitecategory}
            </p>
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
                  console.log("Selected value:", target.value);
                  handleUserInput(target.name, target.value);
                }}
                required
                className="block w-[29rem] h-[10rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("details")}
              ></textarea>
            </div>
          </div>
          <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
            {formError.websitedetail}
          </p>

          <div className="flex">
            {t("bankacc")}&nbsp;
            {":"}
            <div className="px-[1rem]">
              <input
                id="bankaccholdername"
                name="bankaccholdername"
                value={formInput.bankaccountowner}
                onChange={({ target }) => {
                  console.log("Selected value:", target.value);
                  handleUserInput(target.name, target.value);
                }}
                className="block w-[25rem] h-[3rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("banktext")}
              />
            </div>
          </div>

          <div className="flex py-8">
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

            <div className="px-[2rem]">
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
        <div className="text-center py-[2.5rem]">
          <button
            className="items-center justify-center text-[16px] mr-2 bg-[#9F9FA4] text-white w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
            type="submit"
            id="button-addon3"
            data-te-ripple-init
          >
            {t("reportbutt")}
          </button>
        </div>
      </form>
    </>
  );
};
export default ReportForm;
