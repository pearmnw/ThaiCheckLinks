import SignInForm from "@/components/form/signinform";
import { getScopedI18n } from "../../../../locales/server";

export default async function Signin() {
  const t = await getScopedI18n("signinpage");
  return (
    <>
      <div className="items-center text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("signin")}
        </span>
      </div>
      <SignInForm />
    </>
  );
}
