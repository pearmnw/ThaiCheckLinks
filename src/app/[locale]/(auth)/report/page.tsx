import ReportContainer from "@/components/reportpage/reportcontainer";
import UnAuth from "@/components/reportpage/unauth";
import { getServerSession } from "next-auth";
import React from "react";
import { getScopedI18n } from "../../../../locales/server";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const report = async () => {
  const t = await getScopedI18n("report");
  const session = await getServerSession(authOptions);
  console.log("welcome to report page");

  if (session?.user) {
    return (
      <>
        <div className="text-center text-[48px] font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
            {t("title")}
          </span>
        </div>
        <div className="flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
          {t("caption2")}
        </div>
        <ReportContainer />
      </>
    );
  }
  return (
    <>
      <div className="text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("title")}
        </span>
      </div>
      <UnAuth />
    </>
  );
};

export default report;
