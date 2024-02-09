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
} from "recharts";

const ReportVisualization: React.FC<ReportVisualizationProps> = ({
  categoryCount,
}) => {
  const t = useScopedI18n("verificationpage");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loader if you prefer
  }

  const data = [
    { name: "Gambling", count: categoryCount.gambling },
    { name: "Scam", count: categoryCount.scam },
    { name: "Fake", count: categoryCount.fake },
    { name: "Others", count: categoryCount.other },
  ];

  return (
    <div className="bg-custom-bg-moredetail flex flex-col justify-start items-center w-2/3 h-[450px] rounded-xl p-5">
      <h4 className="text-xl font-semibold">
        Number of each type of reporting
      </h4>
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
