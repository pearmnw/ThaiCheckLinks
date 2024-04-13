import { useScopedI18n } from "@/locales/client";
import { useContext, useEffect, useState } from "react";
import { VerificationContext } from "./Verification";
import IdentifyRisk from "./measurement/IdentifyRisk";
import MeasureHeader from "./measurement/MeasureHeader";
import Score from "./measurement/Score";

const Measurement = () => {
  const t = useScopedI18n("verificationpage");
  const { maliciousUrlOverall } = useContext(VerificationContext).overviewScore;

  const [checked, setChecked] = useState(true);
  const [riskLabel, setRiskLabel] = useState("");

  useEffect(() => {
    setRiskLabel(label);
  }, [maliciousUrlOverall, t]);

  const getColor = () => {
    if (maliciousUrlOverall > 0 && maliciousUrlOverall <= 25) {
      return { color: "#04CE00", label: t("low-count") };
    } else if (maliciousUrlOverall > 25 && maliciousUrlOverall <= 50) {
      return { color: "#F2CC6B", label: t("quite-low-count") };
    } else if (maliciousUrlOverall > 50 && maliciousUrlOverall <= 75) {
      return { color: "#F97316", label: t("quite-high-count") };
    } else if (maliciousUrlOverall > 75) {
      return { color: "#B51A36", label: t("high-count") };
    }
    return { color: "#ccc", label: t("No Result") };
  };

  const { color, label } = getColor();

  return (
    <section className="px-8 border-b-2 border-custom-black" id="myURL">
      <MeasureHeader />
      <div className="bg-custom-bg-moredetail w-full rounded-xl pt-5 pb-12 px-7 my-5">
        <div className="flex flex-col justify-center items-start gap-1">
          <IdentifyRisk checked={checked} color={color} riskLabel={riskLabel} />
          <Score score={maliciousUrlOverall} maxScore={100} color={color} />
        </div>
      </div>
    </section>
  );
};

export default Measurement;
