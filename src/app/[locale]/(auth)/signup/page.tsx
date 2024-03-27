import SignUpForm from "@/components/form/signupform";
import { getScopedI18n } from "@/locales/server";

export default async function Signup() {
  const t = await getScopedI18n("signuppage");
  return (
    <>
      <div className="text-center text-[48px]">
        <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("signup")}
        </span>
        <SignUpForm />
      </div>
    </>
  );
}

{
  /* <div className="w-full">
        <SignUpForm />
      </div> */
}
