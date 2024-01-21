import { getScopedI18n } from "@/locales/server";

export default async function privacypolicy() {
  const t = await getScopedI18n("privacypolicypage");
  return (
    <>
      <div>
        <div className="justify-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("title")}
        </div>
      </div>
    </>
  );
}
