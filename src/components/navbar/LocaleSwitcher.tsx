"use client";

import { cn } from "@/lib/utils";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "@/locales/client";
import { Button } from "../ui/button";

const LocaleSwitcher = () => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const t = useScopedI18n("navbar");

  function handleClickEn() {
    console.log("Clicked En");
    changeLocale("en");
  }

  function handleClickTh() {
    console.log("Clicked Th");
    changeLocale("th");
  }

  return (
    <div>
      <div className="flex gap-x-2">
        <Button
          variant="outline"
          className={cn(
            `
            text-xs
            border
            border-zinc-700
            w-9
            h-9
            hover:bg-[#011E52] hover:text-[#ffff]`,
            currentLocale === "th"
              ? "bg-[#011E52] text-[#ffff]"
              : "bg-zinc-500/10"
          )}
          onClick={handleClickTh}
        >
          {/* {t("TH")} */}
          ไทย
        </Button>
        <Button
          variant="outline"
          className={cn(
            `
            text-xs
            border
            border-zinc-700
            w-12
            h-9
            hover:bg-[#011E52] hover:text-[#ffff]`,
            currentLocale === "en"
              ? "bg-[#011E52] text-[#ffff]"
              : "bg-zinc-500/10"
          )}
          onClick={handleClickEn}
        >
          {/* {t("EN")} */}
          English
        </Button>
      </div>
    </div>
  );
};

export default LocaleSwitcher;
