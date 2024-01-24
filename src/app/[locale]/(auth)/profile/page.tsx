import { getScopedI18n } from "../../../../locales/server";

export default async function Profile() {
  const t = await getScopedI18n("profilepage");
  return (
    <>
      <div className="text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("title")}
        </span>
      </div>
    </>
  );
}
