import ReportForm from "@/components/reportpage/reportform";
import UnAuth from "@/components/reportpage/unauth";
import { getServerSession } from "next-auth";
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
        <ReportForm />
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
