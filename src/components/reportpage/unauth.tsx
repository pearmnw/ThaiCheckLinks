"use client";
import { useScopedI18n } from "@/locales/client";
import Link from "next/link";

const UnAuth = () => {
  const t = useScopedI18n("report");
  return (
    <>
      <div className="flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
        {t("caption")}
      </div>

      <div className="flex justify-center">
        <div className="flex text-center justify-center items-center w-[296px] h-[50px] bg-gray-900 rounded-[23px]">
          <button className="text-[24px] font-bold text-transparent bg-clip-text bg-white hover:text-[#CCD2DE]">
            <Link href="/signin">{t("signin")}</Link>
          </button>
          <p className="text-[24px] font-bold text-transparent bg-clip-text bg-white">
            &nbsp;{" | "}&nbsp;
          </p>

          <button className="text-[24px] font-bold text-transparent bg-clip-text bg-white hover:text-[#CCD2DE]">
            <Link
              href="/signup"
              // className="text-[24px] font-bold text-transparent bg-clip-text bg-white"
            >
              {t("signup")}
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
export default UnAuth;
