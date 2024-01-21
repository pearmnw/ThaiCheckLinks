"use client";

import { useCurrentLocale, useScopedI18n } from "@/locales/client";

const DetailsBox = () => {
  const t = useScopedI18n("detailpage");
  const currentLocale = useCurrentLocale();

  function checkcurrlocale() {
    console.log(currentLocale);
  }

  return (
    <>
      <div className="flex justify-center py-6">
        <div className="block bg-[#CCD2DECF] w-[50rem] h-[25rem] rounded-[8px] text-[#121B2B]">
          <div className="pt-11 flex justify-center items-center">
            <img
              className="w-[5rem] h-[5rem] rounded-full"
              src="/apichaya.jpg"
              alt="Rounded avatar"
            ></img>
            <div className="px-6 font-semibold text-[30px]"> {"Username"} </div>
            <div className="pl-[6rem] font-normal text-[24px]">
              {"04/11/2023 09:12:00 AM"}
            </div>
          </div>
          <div className="px-[5.5rem]">
            <div className="pt-4 flex">
              <div className="pl-2 font-semibold text-[24px]">
                {t("category")}
                {":"}
              </div>
              <div className="font-normal text-justify text-[22px] pl-2">
                {t("gambling")}
              </div>
            </div>

            <div className="pt-2 flex">
              <div className="pl-2 font-semibold text-[24px]">
                {t("detail")}
                {":"}
              </div>
              <div className="font-normal text-justify text-[22px] pl-2">
                {
                  "Tricking visitors into clicking on the link and forcing them to purchase the goods to make a profit, but once they make the profit, they can't remove it from the website."
                }
              </div>
            </div>

            <div className="pt-2 flex">
              <div className="pl-2 font-semibold text-[24px]">
                {t("bank")}
                {":"}
              </div>
              <div className="font-normal text-justify text-[22px] pl-2">
                {"Miss BadGirl BadGuys KBank 1234567890"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsBox;
