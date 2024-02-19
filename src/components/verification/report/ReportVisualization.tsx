import { ReportVisualizationProps } from "@/lib/interface/verification/interface";
import { useScopedI18n } from "@/locales/client";
import { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React, { useState, useEffect, useContext } from "react";
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

  return (
    <div className="bg-custom-bg-moredetail flex flex-col justify-start items-center w-2/3 h-[450px] rounded-xl p-5">
      <h4 className="text-xl font-semibold">{t("report-label-bar-plot")}</h4>
      <div className="mt-10 flex flex-col justify-center items-center">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <BarChart dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ReportVisualization;
