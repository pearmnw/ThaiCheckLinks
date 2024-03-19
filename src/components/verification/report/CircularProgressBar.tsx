import { CircularProgressBarProps } from "@/lib/interface/verification/interface";
import { useScopedI18n } from "@/locales/client";
import React, { useEffect, useState } from "react";

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ score }) => {
  const t = useScopedI18n("verificationpage");
  const [riskLabel, setRiskLabel] = useState("");
  const maxScore = 15;
  const normalizedScore = Math.min(score, maxScore); // Ensure score does not exceed 15
  const angle = (normalizedScore / maxScore) * 180; // Calculate angle based on normalized score
  const radius = 335;
  const x = 435,
    y = 390;

  const identifyRiskFromScore = (riskScore: number) => {
    if (score > 0 && score <= 5) {
      return t("low-count");
    } else if (score > 5 && score <= 10) {
      return t("quite-low-count");
    } else if (score > 10 && score <= 15) {
      return t("quite-high-count");
    } else if (score > 15) {
      return t("high-count");
    }
    return t("No Result");
  };

  useEffect(() => {
    setRiskLabel(label);
  }, [score, t]);

  const generateTicks = (radius: number, x: number, y: number) => {
    const ticks = [];
    // const majorTickSize = 20; // Size of major ticks
    // const minorTickSize = 10; // Size of minor ticks
    const tickLabelOffset = 40; // How far out from the major tick the label should be
    const totalDegrees = 180; // Semi-circle
    const majorIncrement = 5; // Major ticks every 25 units
    const minorIncrement = 5; // Minor ticks every 5 units (for more frequent ticks)

    for (let i = 0; i <= 15; i += minorIncrement) {
      let angle = (i / 15) * totalDegrees;

      const isMajorTick = i % majorIncrement === 0;
      // const tickSize = isMajorTick ? majorTickSize : minorTickSize;
      const { x: tickX, y: tickY } = polarToCartesian(x, y, radius, angle);

      if (isMajorTick) {
        const { x: labelX, y: labelY } = polarToCartesian(
          x,
          y,
          radius + tickLabelOffset,
          angle
        );

        ticks.push(
          <text
            key={`label-${i}`}
            x={labelX}
            y={labelY}
            fill="black"
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {i}
          </text>
        );
      }
    }

    return ticks;
  };

  const describeArc = (
    x: any,
    y: any,
    radius: any,
    startAngle: any,
    endAngle: any
  ) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  };

  // Convert polar coordinates to Cartesian
  const polarToCartesian = (
    centerX: any,
    centerY: any,
    radius: any,
    angleInDegrees: any
  ) => {
    var angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Get color based on the score
  const getColor = () => {
    if (score >= 0 && score <= 5) {
      return { color: "#04CE00", label: t("low-count") };
    } else if (score > 5 && score <= 10) {
      return { color: "#F2CC6B", label: t("quite-low-count") };
    } else if (score > 10 && score <= 15) {
      return { color: "#F97316", label: t("quite-high-count") };
    } else if (score > 15) {
      return { color: "#B51A36", label: t("high-count") };
    }
    return { color: "#ccc", label: t("No Result") };
  };

  const { color, label } = getColor();

  return (
    <div className="relative p-5">
      <svg
        width="400"
        height="200"
        viewBox="0 0 870 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#ccc"
          strokeWidth="25"
          strokeLinecap="round"
          d={describeArc(x, y, radius, 0, 180)}
        />
        {color && (
          <path
            fill="none"
            stroke={color}
            strokeWidth="25"
            strokeLinecap="round"
            d={describeArc(x, y, radius, 0, angle)}
          />
        )}
        {generateTicks(radius, x, y).map((tick, index) => (
          <React.Fragment key={index}>{tick}</React.Fragment>
        ))}
      </svg>
      <div className="absolute top-44 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold text-custom-black">
          {t("risk-value")}
        </p>
        <p className="text-4xl font-bold" style={{ color: color }}>
          {riskLabel}
        </p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
