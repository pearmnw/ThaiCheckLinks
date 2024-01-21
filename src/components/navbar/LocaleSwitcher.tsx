"use client";

import { cn } from "@/lib/utils";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Button } from "../ui/button";

const LocaleSwitcher = () => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

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
            `rounded-full
            text-xs
            border
            border-zinc-700
            w-9
            h-9`,
            currentLocale === "th" ? "bg-zinc-500/50" : "bg-zinc-500/10"
          )}
          onClick={handleClickTh}
        >
          TH
        </Button>
        <Button
          variant="outline"
          className={cn(
            `rounded-full
            text-xs
            border
            border-zinc-700
            w-9
            h-9`,
            currentLocale === "en" ? "bg-zinc-500/50" : "bg-zinc-500/10"
          )}
          onClick={handleClickEn}
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default LocaleSwitcher;
