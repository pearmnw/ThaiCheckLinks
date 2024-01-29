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

      <div className="text-center justify-center items-center">
        <button className="w-[296px] h-[50px] bg-gray-900 rounded-[23px]">
          <Link
            href="/signin"
            className="text-[24px] font-bold text-transparent bg-clip-text bg-white"
          >
            {t("signin")}
            {" | "}
          </Link>
          <Link
            href="/signup"
            className="text-[24px] font-bold text-transparent bg-clip-text bg-white"
          >
            {t("signup")}
          </Link>
        </button>
      </div>
    </>
  );
};
export default UnAuth;
