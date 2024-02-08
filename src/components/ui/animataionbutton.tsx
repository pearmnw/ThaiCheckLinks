"use client";
import { useScopedI18n } from "@/locales/client";

const AnimationButton = () => {
  const t = useScopedI18n("report");
  return (
    <button
      className="items-center justify-center text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
      type="button"
      id="button-addon3"
      data-te-ripple-init
    >
      <span>
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
      </span>
      {t("searchbutt")}
    </button>
  );
};
export default AnimationButton;
