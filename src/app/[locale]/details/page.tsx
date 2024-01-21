import DetailsBox from "@/components/detailsbox";
import SearchWordBar from "@/components/searchbar/searchwordbar";
import { getScopedI18n } from "@/locales/server";

export default async function Details() {
  const t = await getScopedI18n("detailpage");
  const url = "";
  return (
    <>
      {/* TODO: Catagory selection, Search function, Details list component */}
      <div className="text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
        {t("title")}
        <div className="flex justify-center text-center text-[30px] font-semibold text-transparent bg-clip-text bg-[#011E52]">
          URL:
          <div className="text-[30px] font-thin text-transparent bg-clip-text bg-[#011E52]">
            {/* TODO: This text may change to variable for the data in database */}
            &nbsp; https://linkly.com/Bn41aCOlnxj
          </div>
        </div>

        <div className="flex pt-4 pb-6 justify-center text-center text-[30px] font-semibold text-transparent bg-clip-text bg-[#011E52]">
          {t("category")}
          {":"} &nbsp;
          <div className=" flex space-x-3 justify-center items-center text-center text-[18px] font-medium text-transparent bg-clip-text bg-[#011E52]">
            <button className="bg-[#CCD2DE] text-[#011E52] py-2 px-4 rounded inline-flex items-center">
              <span className="">
                {t("gambling")}
                {" 1K"}
              </span>
              <svg
                className="ml-3 w-2 h-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <button className="bg-[#CCD2DE] text-[#011E52] py-2 px-4 rounded inline-flex items-center">
              <span className="">
                {t("scam")}
                {" 10"}
              </span>
              <svg
                className="ml-3 w-2 h-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <button className="bg-[#CCD2DE] text-[#011E52] py-2 px-4 rounded inline-flex items-center">
              <span className="">
                {t("fake")} {" 5"}
              </span>
              <svg
                className="ml-3 w-2 h-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <button className="bg-[#CCD2DE] text-[#011E52] py-2 px-4 rounded inline-flex items-center">
              <span className="">
                {t("other")} {" 2"}
              </span>
              <svg
                className="ml-3 w-2 h-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
        <SearchWordBar />
        <DetailsBox />
        <DetailsBox />
        <DetailsBox />
      </div>
    </>
  );
}
