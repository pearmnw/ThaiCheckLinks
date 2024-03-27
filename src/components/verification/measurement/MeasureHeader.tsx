import { useScopedI18n } from "@/locales/client";
import Link from "next/link";

const MeasureHeader = () => {
  const t = useScopedI18n("verificationpage");

  return (
    <div className="flex flex-col justify-center items-start text-custom-black gap-5 w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-bold">{t("measure-title")}</h2>
        <div className="text-right">
          <button className="inline-block py-2 px-3 border border-gray-300 rounded-[10px] drop-shadow-xl bg-[#02006D] hover:border-[#134BDE] hover:bg-[#134BDE]">
            <Link href="#myOverall" className="flex items-center">
              <span className="text-[20px] text-[#ffff] font-semibold">
                {t("see-overview")}
              </span>
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 22"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#ffff]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            </Link>
          </button>
        </div>
      </div>

      <h3 className="text-3xl font-medium text-custom-blue">
        {t("measure-subtitle")}
      </h3>
    </div>
  );
};

export default MeasureHeader;
