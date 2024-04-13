"use client";

import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";

const NavBar = () => {
  const { data: session, status } = useSession();
  const t = useScopedI18n("navbar");
  const [header, setHeader] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  // const scrollHeader = () => {
  //   if (window.scrollY >= 20) {
  //     setHeader(true);
  //   } else {
  //     setHeader(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", scrollHeader);

  //   return () => {
  //     window.addEventListener("scroll", scrollHeader);
  //   };
  // }, []);

  const isNavReportItemActive = (path: any) => {
    return pathname === path; // Check if current path matches navigation item path
  };
  const isNavVeriItemActive = (path: any) => {
    return pathname === path; // Check if current path matches navigation item path
  };

  return (
    <div
      className={
        header
          ? "w-[100%] text-[black] bg-gradient-to-r from-[#02006D] to-[#144EE3]"
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
              Thai.CheckLinks
            </Link>
            <div className="flex items-center md:order-2 space-x-5">
              {/* <Link
                href="/report"
                className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]"
              > */}
              <Link
                href="/report"
                className={`${
                  !isNavReportItemActive(`/${currentLocale}/report`)
                    ? "text-[24px] font-bold text-[#011E52] hover:text-[#144EE3]"
                    : "text-[24px] font-bold text-[#011E52] underline hover:text-[#144EE3]"
                }`}
              >
                {t("reportweb")}
              </Link>
              <Link
                href="/verification"
                // className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]"
                className={`${
                  !isNavVeriItemActive(`/${currentLocale}/verification`)
                    ? "text-[24px] font-bold text-[#011E52] hover:text-[#144EE3]"
                    : "text-[24px] font-bold text-[#011E52] underline hover:text-[#144EE3]"
                }`}
              >
                {t("verifyweb")}
              </Link>
            </div>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
            <LocaleSwitcher />

            {session?.user ? (
              <div className="flex">
                <Link href="/profile">
                  {/* <img
                    className="w-[3rem] h-[3rem] rounded-full"
                    src="/defaultprofileimg.png"
                    alt="Rounded avatar"
                  ></img> */}
                  <div className="relative w-10 h-10 overflow-hidden bg-[#011E52] rounded-full dark:bg-gray-600 hover:bg-gray-100">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </Link>
                <p className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]">
                  &nbsp;
                  {" | "}
                  &nbsp;
                </p>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52] hover:bg-[#144EE3]"
                >
                  {t("signout")}
                </button>
              </div>
            ) : (
              <div className="flex">
                <Link
                  href="/signin"
                  className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52] hover:bg-[#144EE3]"
                >
                  {t("signin")}&nbsp;
                </Link>
                <p className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52]">
                  {"|"}
                </p>
                <Link
                  href="/signup"
                  className="text-[24px] font-bold text-transparent bg-clip-text bg-[#011E52] hover:bg-[#144EE3]"
                >
                  &nbsp;{t("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
