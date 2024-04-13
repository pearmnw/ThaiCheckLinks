import ChangeInfoForm from "@/components/form/changeinfoform";
import UnAuthProfile from "@/components/profilepage/unAuthProfile";
import { getServerSession } from "next-auth";
import { getScopedI18n } from "../../../../locales/server";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const t = await getScopedI18n("profilepage");
  if (session?.user) {
    return (
      <>
        <div className="text-center text-[48px] font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
            {t("title")}
          </span>
        </div>
        <ChangeInfoForm />
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
      <UnAuthProfile />
    </>
  );
}
