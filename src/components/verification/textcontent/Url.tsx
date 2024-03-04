"use client";
import { UrlProps } from "@/lib/interface/verification/interface";
import { useScopedI18n } from "@/locales/client";
import React from "react";
import ScoreIndicator from "../../moredetail/TrustScore/ScoreIndicator";

const Url: React.FC<UrlProps> = ({ urlPercent }) => {
  const t = useScopedI18n("verificationpage");
  const malicious_url = urlPercent.malicious_proba;

  return (
    <div className="flex justify-center flex-col gap-6 w-full py-14 px-12 border-b-2 border-custom-black">
      <div className="flex flex-col justify-center items-start text-custom-black gap-5">
        <h2 className="text-3xl font-semibold">{t("malicious-url")}</h2>
      </div>
      <ScoreIndicator score={malicious_url} maxScore={100} />
    </div>
  );
};

export default Url;
