import { useScopedI18n } from "@/locales/client";
import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VerificationContext } from "../Verification";

const ReportVisualization = () => {
  const t = useScopedI18n("verificationpage");
  const [isMounted, setIsMounted] = useState(false);
  const { userReportCount } = useContext(VerificationContext).overviewScore;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const data = [
    { name: t("gambling-label"), count: userReportCount.gambling },
    { name: t("scam-label"), count: userReportCount.scam },
    { name: t("fake-label"), count: userReportCount.fake },
    { name: t("other-label"), count: userReportCount.other },
  ];

  const colors = ["#02016D", "#144EE3", "#4495C7", "#3E3B5A"];

  return (
    <div className="bg-custom-bg-moredetail flex flex-col justify-start items-center w-2/3 h-[450px] rounded-xl p-5">
      <h4 className="text-xl font-semibold">{t("report-label-bar-plot")}</h4>
      <div className="mt-10 flex flex-col justify-center items-center">
        <BarChart width={500} height={300} data={data}>
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" barSize={50}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <LabelList dataKey="count" position="top" className="text-3xl" />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default ReportVisualization;
