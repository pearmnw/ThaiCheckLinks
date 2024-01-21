"use client";

import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";

const NavBar = () => {
  const t = useScopedI18n("navbar");
  const currentLocale = useCurrentLocale();
  const [header, setHeader] = useState(false);
  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  }, []);

  return (
    <div
      className={
        header
          ? "fixed w-[100%] text-[black] bg-gradient-to-r from-[#02006D] to-[#144EE3]"
          : "bg-[transparent]"
      }
    >
      <nav className="bg-[#CCD2DE]">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-baseline md:order-2 space-x-5">
            <Link
              href="/"
              className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#02006D] to-[#144EE3]"
            >
              Thai.Scamlinks
            </Link>
            <div className="flex items-center md:order-2 space-x-5">
              <Link
                href="/report"
                className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]"
              >
                {t("reportweb")}
              </Link>
              <Link
                href="/verification"
                className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]"
              >
                {t("verifyweb")}
              </Link>
            </div>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
            <LocaleSwitcher />
            <div>
              <Link
                href="/signin"
                className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]"
              >
                {t("signin")}
                {" | "}
              </Link>
              <Link
                href="/signup"
                className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]"
              >
                {t("signup")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
