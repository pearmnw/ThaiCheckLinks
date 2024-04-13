"use client";
import { CategoryCardProps } from "@/lib/interface/verification/interface";
import { useScopedI18n } from "@/locales/client";
import React from "react";
import CategoryLabel from "./CategoryLabel";
import ProgressDonut from "./ProgressDonut";

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  currentPercent,
  maxPercent,
  color,
}) => {
  const t = useScopedI18n("verificationpage");

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <ProgressDonut maxPercent={maxPercent} color={color} />
      <CategoryLabel label={label} currentPercent={currentPercent} />
    </div>
  );
};

export default CategoryCard;
