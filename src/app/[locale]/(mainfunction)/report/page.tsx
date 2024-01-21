import Link from "next/link";
import { getScopedI18n } from "../../../../locales/server";

export default async function report() {
  const t = await getScopedI18n("report");
  return (
    <>
      <div className="text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("title")}
        </span>
      </div>
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
}
