"use client";

import { useCurrentLocale, useScopedI18n } from "@/locales/client";

const SearchWordBar = () => {
  const t = useScopedI18n("detailpage");
  const currentLocale = useCurrentLocale();

  function checkcurrlocale() {
    console.log(currentLocale);
  }

  return (
    <>
      <div className="flex justify-center mb-3">
        <div className="flex justify-center items-center w-[650px] h-[66px] rounded-[50px] bg-[#121B2B]">
          <input
            type="search"
            className="ml-2 -mr-0.5 block min-w-0 flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#FFFFFF] outline-none transition duration-200 ease-in-out focus:z-[3]"
            placeholder={t("searchtext")}
            aria-label="Search"
            aria-describedby="button-addon3"
          />

          {/* Search button */}
          <button
            className="items-center justify-center text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex"
            type="button"
            id="button-addon3"
            data-te-ripple-init
          >
            {t("searchbutt")}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchWordBar;
