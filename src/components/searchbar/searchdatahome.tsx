"use client";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import React, { useState } from "react";

interface SearchWordBarProps {
  onSearch: (term: string) => void;
}

const SearchDataHome: React.FC<SearchWordBarProps> = ({ onSearch }) => {
  const t = useScopedI18n("homepage");
  const currentLocale = useCurrentLocale();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  function checkcurrlocale() {
    console.log(currentLocale);
  }

  return (
    <>
      <div className="flex justify-center mb-3">
        <div className="flex justify-center items-center w-[650px] h-[66px] rounded-[50px] bg-[#121B2B]">
          <div className="pl-6">
            <span className="flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM4 12.5C4 12.5 10 20.5 15.5 10C15.5 6.96243 13 4 10 4.5L7 8.5L4 12.5Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.7072 14.293L21.7072 20.293L20.293 21.7072L14.293 15.7072L15.7072 14.293Z"
                  fill="white"
                />
                <path
                  d="M16.5 10C16.5 13.866 13.866 16.5 10 16.5C6.13401 16.5 3.5 13.866 3.5 10C3.5 6.13401 6.5 3.5 10 3.5C13.866 3.5 16.5 6.13401 16.5 10Z"
                  fill="#121B2B"
                />
              </svg>
            </span>
          </div>

          <input
            type="search"
            className="ml-2 -mr-0.5 block min-w-0 flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#FFFFFF] outline-none transition duration-200 ease-in-out focus:z-[3]"
            placeholder={t("text")}
            aria-label="Search"
            aria-describedby="button-addon3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
          />

          {/* Search button */}
          <button
            className="items-center justify-center text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex hover:text-[#ffff] hover:bg-[#134BDE]"
            type="button"
            id="button-addon3"
            data-te-ripple-init
            onClick={handleSearch}
          >
            {t("searchbutt")}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchDataHome;
