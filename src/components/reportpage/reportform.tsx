"use client";
import { useScopedI18n } from "@/locales/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ReportForm = ({
  url,
  metaWebsite,
  currentPercent,
  verifySuccess,
}: any) => {
  const t = useScopedI18n("report");
  const u = useScopedI18n("signuppage");
  const router = useRouter();
  const userInfo = useSession();

  console.log(metaWebsite);
  console.log(currentPercent);
  const [inputFilled, setInputFilled] = useState(false);

  const [formInput, setFormInput] = useState({
    websitecategory: "",
    websitedetail: "",
    bankaccountowner: "",
    bank: "",
    bankaccnumber: "",
    phonenumber: "",
    successMsg: "",
  });

  const [formError, setFormError] = useState({
    websiteurl: "",
    websitecategory: "",
    websitedetail: "",
    bankaccname: "",
    bankaccountowner: "",
    bankaccnumber: "",
    phonenumber: "",
  });

  const [charCount, setCharCount] = useState(0);

  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });

    // Update character count
    setCharCount(value.length);

    // Check if the input field is filled and update the state
    setInputFilled(
      formInput.websitecategory !== "" && formInput.websitedetail !== ""
    );
  };

  const validateFormInput = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const inputError = validateFields();

    if (Object.values(inputError).some((error) => error !== "")) {
      setInputFilled(false);
      setFormError(inputError);
    } else {
      setInputFilled(true);
      onSubmit();
    }
  };

  const validateFields = () => {
    let hasErrors = false;

    const inputError = {
      userID: "",
      websiteurl: "",
      websitecategory: "",
      websitedetail: "",
      bankaccname: "",
      bankaccountowner: "",
      bankaccnumber: "",
      phonenumber: "",
    };

    if (!url) {
      inputError.websiteurl = t("urlError");
      hasErrors = true;
    }

    if (!formInput.websitecategory || formInput.websitecategory === "default") {
      inputError.websitecategory = t("webCatError");
      hasErrors = true;
    }

    if (!formInput.websitedetail) {
      inputError.websitedetail = t("moredetailError");
      hasErrors = true;
    } else {
      const validationResult = validateWebsiteDetail(formInput.websitedetail);
      if (validationResult) {
        inputError.websitedetail = validationResult;
        hasErrors = true;
      }
    }

    if (formInput.phonenumber) {
      const validationphone = validatePhoneNum(formInput.phonenumber);
      if (validationphone) {
        inputError.phonenumber = validationphone;
        hasErrors = true;
      }
    }
    return inputError;
  };

  const validateWebsiteDetail = (detail: string) => {
    const words = detail.toLowerCase().split(/[\s\u200B]+/);

    // Fix Range of character is 10 to 500
    if (detail.length < 10 || detail.length > 500) {
      return t("moredetailError2");
    }

    return null;
  };

  const validatePhoneNum = (phonenumber: string) => {
    if (phonenumber) {
      // check if phone number is least than 10 or more than 10
      if (phonenumber.length < 10 || phonenumber.length > 10) {
        console.log("wrong phonenum");
        return u("errphone");
      }
    }
    return null;
  };
  //---------------------- END Refactor of validateFormInput ---------------------//
  const onSubmit = async () => {
    try {
      console.log("Submit the report Here!!!");
      console.log("formInput:", formInput);
      console.log("formError:", formError);
      console.log(url);
      console.log(userInfo.data?.user.id);
      console.log(metaWebsite.url);
      console.log(currentPercent);
      console.log(currentPercent.other);
      // router.push("/report/success");
      const res = await fetch("api/linkreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: userInfo.data?.user.id,
          WebsiteURL: url,
          WebsiteCategory: formInput.websitecategory,
          BankID: formInput.bank,
          BankAccountOwner: formInput.bankaccountowner,
          BankNumber: formInput.bankaccnumber,
          PhoneNumber: formInput.phonenumber,
          WebsiteReportedDetails: formInput.websitedetail,
          MetaWebsite: metaWebsite,
          CurrentPercent: currentPercent,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok && data.websiteDetail) {
        toast.success(data.message);
        router.push("/report/success");
      } else {
        console.log("Report Failed");
        // toast.error(data.message);
        console.log(data.message);
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  if (verifySuccess == true) {
    return (
      <>
        <form onSubmit={validateFormInput}>
          <div className="flex-row px-[17rem] justify-center items-center text-slate-700 text-xl font-semibold tracking-tight">
            <div className="flex pt-5 pb-1">
              {t("Category")}&nbsp;
              {":"}
              <div className="px-[1rem]">
                <select
                  title="webcatagory"
                  id="webcatagory"
                  name="websitecategory"
                  value={formInput.websitecategory}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                    console.log("Selected value:", target.value);
                    console.log("category:", formInput.websitecategory);
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
            </div>
            <p className="text-[12px] font-[500] ml-[16rem] text-red-600">
              {formError.websitecategory}
            </p>

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
                    console.log("details:", formInput.websitedetail);
                  }}
                  // TODO: Let receive the paste text [Still not work]
                  onPaste={(event) => {
                    event.preventDefault();
                    // Get pastedText add with old text websitedetail
                    const pastedText = (
                      event.clipboardData || window.Clipboard
                    ).getData("text");
                    const newValue = formInput.websitedetail + pastedText;
                    handleUserInput("websitedetail", newValue);
                    // // Update inputFilled state after paste
                    setInputFilled(
                      formInput.websitecategory !== "" && pastedText !== ""
                    );
                  }}
                  required
                  className="w-full md:w-[25rem] h-[10rem] p-2 text-sm text-gray-900 bg-white bg-opacity-60 rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("details")}
                ></textarea>

                <p className="text-[12px] font-[500] text-red-600">
                  {formError.websitedetail}
                </p>
                <p className="text-end text-[12px] font-[500] text-gray-600">
                  {charCount} characters
                </p>
              </div>
            </div>

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
              className={`${
                open ? "" : "hidden"
              } bg-[#CCD2DE] m-2 px-4 py-8 rounded-md items-center`}
            >
              <div className="w-full justify-center items-center">
                <div className="flex justify-center items-center">
                  <section className="flex">
                    <p className="pr-2 text-[18px]">{t("bankacctxt")}</p>
                    <input
                      id="bankaccountowner"
                      name="bankaccountowner"
                      value={formInput.bankaccountowner}
                      onChange={({ target }) => {
                        console.log("Selected value:", target.value);
                        handleUserInput(target.name, target.value);
                      }}
                      className="block mx-auto w-[28rem] h-[2.5rem] p-2 text-sm text-gray-900 bg-white rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("banktext")}
                    />
                  </section>
                </div>
                <div className="flex justify-center items-center pb-4">
                  <div className="flex flex-col items-center pt-8 sm:flex-row">
                    <section className="flex pl-6">
                      <select
                        title="bank"
                        id="bank"
                        name="bank"
                        value={formInput.bank}
                        onChange={({ target }) => {
                          console.log("Selected value:", target.value);
                          handleUserInput(target.name, target.value);
                        }}
                        className="w-[12rem] h-8 pl-1 bg-white rounded-lg shadow font-normal text-neutral-500 m-auto
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
                        {/* <option value="others">{t("bankothers")}</option> */}
                      </select>

                      <div className="w-full sm:pl-4">
                        <input
                          id="bankaccnumber"
                          name="bankaccnumber"
                          value={formInput.bankaccnumber}
                          onChange={({ target }) => {
                            console.log("Selected value:", target.value);
                            handleUserInput(target.name, target.value);
                          }}
                          className="block w-[24rem] h-[2.5rem] p-2 text-sm text-gray-900 bg-white rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={t("banknum")}
                        />
                      </div>
                    </section>
                  </div>
                </div>
                <div className="flex justify-center items-center border-t-2 border-dashed border-white">
                  <section>
                    <p className="text-white text-[12px]">Or/And</p>
                  </section>
                </div>
                <div className="flex px-[4rem] pt-4">
                  <div className="flex justify-center items-center">
                    <section className="flex">
                      <p className="pr-2 text-[18px]">{t("phonenumtxt")}</p>
                      <input
                        id="phonenumber"
                        name="phonenumber"
                        value={formInput.phonenumber}
                        onChange={({ target }) => {
                          console.log("Selected value:", target.value);
                          handleUserInput(target.name, target.value);
                        }}
                        className="block mx-auto w-[28rem] h-[2.5rem] p-2 text-sm text-gray-900 bg-white rounded-lg border border-neutral-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={u("phntext")}
                      />
                    </section>
                  </div>
                </div>
                <p className="px-[13rem] text-[12px] font-[500] text-red-600">
                  {formError.phonenumber}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center py-[2.5rem]">
            <button
              className={`items-center justify-center text-[16px] mr-2 ${
                inputFilled ? "bg-[#121B2B]" : "bg-[#9F9FA4]"
              } text-white w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex`}
              type="submit"
              id="button-addon3"
              data-te-ripple-init
              disabled={!inputFilled}
            >
              {t("reportbutt")}
            </button>
          </div>
        </form>
      </>
    );
  } else {
    return <></>;
  }
};
export default ReportForm;
