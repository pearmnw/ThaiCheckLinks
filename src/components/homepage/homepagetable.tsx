"use client";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../loading/Loader";
import SearchDataHome from "../searchbar/searchdatahome";
import "./styles.css";

// =========== Api connect part =========

interface Website {
  id: number; //-> sequentialId
  WebsiteURL: string; //-> WebsiteURL
  WebCategoryName: string; //-> WebCategoryName
  reports: string; //-> numReports
  reporttime: Date;
}
// =========== ========= =========

const WebsiteTable = () => {
  // =========== Api connect part =========

  const [websites, setWebsites] = useState<Website[]>([]);
  const [displayRange, setDisplayRange] = useState({ start: 0, end: 10 });
  const [filteredDetails, setFilteredDetails] = useState<Website[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentLocale = useCurrentLocale();
  const t = useScopedI18n("homepage");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("api/homefilter", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // throw new Error("Failed to fetch data");
          toast.error("Failed to fetch data");
        } else {
          setIsLoading(false);
        }

        const data = await response.json();
        console.log(data); // Check if data is fetched properly
        setWebsites(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //     console.log('Websites State:', websites);
  // =========== ========= =========

  
  
  // State to track selected filter options
  const [selectedOptions, setSelectedOptions] = useState({
    default: "alldefaults",
    dateTime: "",
    category: "",
    report: "",
  });

  const handleRadioChange = (category: string, value: string) => {
    setSelectedOptions((prevState) => {
      // If the selected option is the default option,
      // uncheck all other options
      if (value === "alldefaults") {
        return {
          ...prevState,
          dateTime: "",
          category: "",
          report: "",
          [category]: value,
        };
      } else {
        // If the selected option is not the default option,
        // uncheck the default option and clear other fields
        return {
          ...prevState,
          default: "",
          dateTime: category === "dateTime" ? value : "",
          category: category === "category" ? value : "",
          report: category === "report" ? value : "",
        };
      }
    });

    // Reset displayed range to show default number of rows
    setDisplayRange({ start: 0, end: 10 });
    // Reset showMore state to false
    setShowMore(false);
  };
  

  //==============Search==========
  // useEffect(() => {
  //   // Filter details based on search term
  //   const filtered = websites.filter(
  //     (websites) =>
  //       websites.WebsiteURL.search(
  //         new RegExp(`\\b${searchTerm.trim()}\\b`, "iu")
  //       ) !== -1 ||
  //       websites.WebCategoryName.search(new RegExp(searchTerm, "iu")) !== -1
  //   );
  //   setFilteredDetails(filtered as Website[]);
  // }, [websites, searchTerm]);
  useEffect(() => {
    // Filter details based on search term
    const filtered = websites.filter(
      (website) =>
        website.WebsiteURL.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredDetails(filtered);
}, [websites, searchTerm]);

  //========================
  
  const handleSearch = (term: SetStateAction<string>) => {
    setSearchTerm(term);
  };

  // See more see less function
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleShowMoreClick = () => {
    let nextEnd = displayRange.end + 10;

    // Filter websites based on the search term
    const filteredWebsites = websites.filter(website => {
        const urlMatches = website.WebsiteURL.includes(searchTerm);
        return urlMatches;
    });

    // Show all remaining websites if nextEnd equals or exceeds the total number of filtered websites
    if (nextEnd >= filteredWebsites.length) {
        setShowMore(false); // Hide "See More" button
        nextEnd = filteredWebsites.length; // Set nextEnd to the total number of filtered websites
        setShowMore(true); 
    }

    setDisplayRange({
        start: displayRange.start,
        end: nextEnd,
    });
};


  const handleShowLessClick = () => {
    setDisplayRange({ start: 0, end: 10 }); // Reset display range to show less
    setShowMore(false); // Also set showMore to false when showing less
  };


  const handleShowAllClick = () => {
    let filteredDisplayedWebsites;
    if (searchTerm) {
      // Filter all websites based on whether the URL or category name contains the search term
      filteredDisplayedWebsites = websites.filter(website => {
        const urlMatches = website.WebsiteURL.includes(searchTerm);
        return urlMatches;
      });
    } else {
      // If there's no search term, show all displayed websites
      filteredDisplayedWebsites = displayedWebsites;
    }
    
    setFilteredDetails(filteredDisplayedWebsites);
    setShowMore(true);
  };
  
  
    const showMoreButton =!showMore && displayRange.end < websites.length -1 && (
      <button onClick={handleShowMoreClick}>{t("seemore")}</button>
    );

  
  const showAllButton = !showMore && displayRange.end < websites.length - 1 && (
    <button onClick={handleShowAllClick}>{t("seeall")}</button>
  );

  let showLessButton = null;
  if (!showMore && displayRange.end > 10 && websites.length > 10) {
    showLessButton = (
      <button onClick={handleShowLessClick}>{t("seeless")}</button>
    );
  } else if (showMore) {
    showLessButton = (
      <button onClick={handleShowLessClick}>{t("seeless")}</button>
    );
  }

  // Overlay filter function
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const toggleFilterOverlay = () => {
    setShowFilterOverlay(!showFilterOverlay);
  };
  // =========
  // const [displayMore, setDisplayMore] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilterOverlay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // ==========
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updateFilterPosition = () => {
      if (filterButtonRef.current) {
        const iconRect = filterButtonRef.current.getBoundingClientRect();
        const top = iconRect.bottom + 5; // Adjust as needed
        const left = iconRect.left;
        setFilterPosition({ top, left });
      }
    };

    if (showFilterOverlay && filterButtonRef.current) {
      updateFilterPosition();
      window.addEventListener("scroll", updateFilterPosition);
    }

    return () => {
      window.removeEventListener("scroll", updateFilterPosition);
    };
  }, [showFilterOverlay]);

  //  ================ API filter ================
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([]);
  const handleSortChange = (option: string) => {
    if (option === "alldefaults") {
      // Clear all selected sorting options
      setSelectedOptions({
        ...selectedOptions,
        default: "alldefaults",
        dateTime: "",
        category: "",
        report: "",
      });
    } else {
      // Update the selected sorting option
      setSelectedOptions({
        ...selectedOptions,
        default: "",
        [option]: option,
      });
    }
  };

  //====================
  useEffect(() => {
    let filteredWebsites = [...websites]; // Create a copy of the original websites array

    // Custom sorting function
    const customSort = (a: Website, b: Website): number => {
      // Sort by date if dateTime option is selected
      if (selectedOptions.dateTime) {
        const dateA = new Date(a.reporttime).getTime();
        const dateB = new Date(b.reporttime).getTime();
        if (selectedOptions.dateTime === "datenew") {
          return dateB - dateA; // Sort by date in descending order (newest first)
        } else if (selectedOptions.dateTime === "dateold") {
          return dateA - dateB; // Sort by date in ascending order (oldest first)
        }
      }

      // Sort by report count if report option is selected
      if (selectedOptions.report) {
        const reportA = parseInt(a.reports);
        const reportB = parseInt(b.reports);
        if (selectedOptions.report === "highreport") {
          return reportB - reportA; // Sort by report count in descending order
        } else if (selectedOptions.report === "lowreport") {
          return reportA - reportB; // Sort by report count in ascending order
        }
      }

      //   Sort by category if category option is selected
      if (selectedOptions.category) {
        const categoryA = a.WebCategoryName;
        const categoryB = b.WebCategoryName;
        const reportA = parseInt(a.reports);
        const reportB = parseInt(b.reports);
        const sortingKey =
          selectedOptions.category === "categoryG"
            ? "Gambling"
            : selectedOptions.category === "categoryS"
            ? "Scam"
            : selectedOptions.category === "categoryF"
            ? "Fake"
            : selectedOptions.category === "categoryO"
            ? "Others"
            : "";

        if (categoryA === sortingKey && categoryB === sortingKey) {
          // If both items belong to the same category, sort by report count in descending order
          return reportB - reportA;
        } else if (categoryA === sortingKey) {
          // If item A belongs to the selected category, it should come first
          return -1;
        } else if (categoryB === sortingKey) {
          // If item B belongs to the selected category, it should come first
          return 1;
        }
      }

      return 0; // Default case: no sorting applied
    };

    // Apply custom sorting function
    filteredWebsites.sort(customSort);

    setFilteredWebsites(filteredWebsites);
  }, [selectedOptions, websites]);

  const thaiToEnglishMap: Record<string, string> = {
    พนัน: "gambling",
    หลอกลวง: "scam",
    ปลอมแปลง: "fake",
    อื่นๆ: "others",
  };

  const displayedWebsites = showMore
  ? (searchTerm ? filteredWebsites.filter((website) => {
        const modifiedSearchTerm = searchTerm.trim().toLowerCase(); // Normalize search term
        const cleanURL = website.WebsiteURL.trim().toLowerCase(); // Normalize URL

        return cleanURL.includes(modifiedSearchTerm);
      }) : filteredWebsites)
  : filteredWebsites.filter((website) => {
      if (searchTerm) {
        const modifiedSearchTerm = searchTerm.trim().toLowerCase(); // Normalize search term
        const cleanURL = website.WebsiteURL.trim().toLowerCase(); // Normalize URL

        return cleanURL.includes(modifiedSearchTerm);
      } else {
        // If no searchTerm, show more websites without any filtering
        return true;
      }
    }).slice(0, displayRange.end);


  
  ///==============

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-12">
          <Loader />
        </div>
      )}
      <div className={`${isLoading ? "opacity-20" : ""}`}>
        <div>
          <SearchDataHome onSearch={handleSearch} />
        </div>

        {/* // ********* Table ********* */}
        <div className="flex flex-col mx-48 ">
          <div>
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-10">
              <div className="overflow-hidden rounded-2xl">
                <table className="min-w-full text-left text-sm font-light text-white ">
                  <thead className="border-b-2 bg-slate-950 font-medium dark:border-white">
                    <tr>
                      <th scope="col" colSpan={2} className="px-6 py-4">
                        <div className="flex justify-center items-center text-base">
                          {t("rank")}
                          {/* Ranking fraudulent links */}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-2">
                        <div className="flex justify-center items-center text-base">
                          {t("detail")}
                          {/* Details */}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-2">
                        <div className="flex justify-center items-center text-base">
                          {t("category")}
                          {/* Category */}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-2">
                        <div className="flex justify-center items-center text-base">
                          {t("reportnum")}
                          {/* Reports Number */}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-2">
                      <div className="flex flex-col items-center mt-3"> 
                      {/* <span className="text-xs">{t("sort")}</span>   */}
                        <button
                          title="button"
                          ref={filterButtonRef}
                          className="flex justify-center items-center"
                          onClick={toggleFilterOverlay}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            fill="none"
                            viewBox="0 0 24 25"
                          >
                            <path fill="url(#a)" d="M0 .5h24v24H0z" />
                            <defs>
                              <pattern
                                id="a"
                                width="1"
                                height="1"
                                patternContentUnits="objectBoundingBox"
                              >
                                <use href="#b" transform="scale(.02083)" />
                              </pattern>
                              <image
                                id="b"
                                width="45"
                                height="45"
                                data-name="image.png"
                                href="data:image/png;base64,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"
                              />
                            </defs>
                          </svg>
                        </button>
                        <span className="text-xs mt-1">{t("sort")}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#011E52]">
                    {/* ============== Link Api ========== */}

                    {/* {filteredWebsites.map((website, index )=> ( */}
                    {displayedWebsites.map((website, index) => (
                      <tr
                        className="border-b-2 bg-[#CCD2DE] dark:border-white"
                        key={website.id}
                      >
                        <td className="whitespace-nowrap pl-5 py-4 font-medium">
                          <div className="flex justify-center items-center px-1 py-1 rounded-3xl w-6 h-6  bg-[#3E547C]  text-white ">
                            {index + 1}
                          </div>
                        </td>

                        <td className="whitespace-nowrap py-4 url-column">
                          {website.WebsiteURL}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 ">
                          <Link
                            href={`${currentLocale}/${encodeURIComponent(
                              website.WebsiteURL
                            )}`}
                            passHref
                          >
                            <div className="flex justify-center items-center">
                              <p className="underline font-medium drop-shadow-lg" id="linkdetail">
                                {t("more")}
                                {/* More details */}
                              </p>
                            </div>
                          </Link>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex justify-center items-center">
                            <span>
                              {website.WebCategoryName === "Gambling"
                                ? t("gambling")
                                : website.WebCategoryName === "Scam"
                                ? t("scam")
                                : website.WebCategoryName === "Fake"
                                ? t("fake")
                                : t("others")}
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 ">
                          <div className="flex justify-center items-center">
                            {website.reports}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 "></td>
                      </tr>
                    ))}

                    {/* ********* See More See Less on Table ********* */}
                    {(!searchTerm || searchTerm.length < 10) &&
                        displayedWebsites.length >= 10 &&(
                        <tr className="border-b-2 bg-[#BDC1C7] dark:border-white">
                          <td colSpan={7} className="whitespace-nowrap px-6 py-4">
                            <div className="flex justify-end pr-10 font-bold text-[#011E52] underline text-lg drop-shadow-lg">
                              <div className="flex justify-center space-x-4">
                                {showMoreButton}
                                {showAllButton}
                                {showLessButton}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* //* ********* Table ********* * */}

          {/* Overlay Rectangle for Filters */}
          <div ref={containerRef}>
          {showFilterOverlay && filterButtonRef.current && (
            <div
              className="fixed w-48 bg-gray-900 backdrop-blur-sm bg-opacity-20 rounded-lg shadow-lg"
              style={{
                top: filterPosition.top + "px",
                left: filterPosition.left + "px",
              }}
            >
              <h2 className="text-lg font-semibold mb-2 px-5 pt-4 flex justify-start text-slate-950">
                {t("filter")}
                {/* Filter */}
              </h2>
              <hr className="mb-1 w-fulll h-1.5 border-0 bg-gray-900 bg-opacity-20" />
              {/* Date/Time */}
              <div className="mb-4">
                <div>
                  <label className="flex justify-start items-center mb-2 mt-4 px-4">
                    <input
                      type="radio"
                      className="form-radio w-6 h-6"
                      name="default"
                      value="alldefaults"
                      onChange={() =>
                        handleRadioChange("default", "alldefaults")
                      }
                      checked={selectedOptions.default === "alldefaults"}
                    />
                    <span className="ml-2 text-sm text-slate-950 font-normal ">
                      {t("alldefault")}
                      {/* All Defaults */}
                    </span>
                  </label>
                </div>

                <div>
                  <h3 className="font-medium text-base flex px-5 justify-start pb-2 text-slate-950">
                    {t("date")}
                    {/* Date/Time */}
                  </h3>
                  <div>
                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="dateTime"
                        value="dateold"
                        onChange={() =>
                          handleRadioChange("dateTime", "dateold")
                        }
                        checked={selectedOptions.dateTime === "dateold"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("old")}
                        {/* Oldest Date */}
                      </span>
                    </label>

                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="dateTime"
                        value="datenew"
                        onChange={() =>
                          handleRadioChange("dateTime", "datenew")
                        }
                        checked={selectedOptions.dateTime === "datenew"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("new")}
                        {/* Latest Date */}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-base flex px-5 justify-start pb-2 text-slate-950">
                    {t("report")}
                    {/* Report Number */}
                  </h3>
                  <div>
                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="report"
                        value="highreport"
                        onChange={() =>
                          handleRadioChange("report", "highreport")
                        }
                        checked={selectedOptions.report === "highreport"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("high")}
                        {/* Highest Report */}
                      </span>
                    </label>

                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="report"
                        value="lowreport"
                        onChange={() =>
                          handleRadioChange("report", "lowreport")
                        }
                        checked={selectedOptions.report === "lowreport"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("low")}
                        {/* Lowest Report */}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-base flex px-5 justify-start pb-2 text-slate-950">
                    {t("category")}
                    {/* Category */}
                  </h3>
                  <div>
                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="category"
                        value="categoryG"
                        onChange={() =>
                          handleRadioChange("category", "categoryG")
                        }
                        checked={selectedOptions.category === "categoryG"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {/* Gambling */}
                        {t("gambling")}
                      </span>
                    </label>

                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="category"
                        value="categoryS"
                        onChange={() =>
                          handleRadioChange("category", "categoryS")
                        }
                        checked={selectedOptions.category === "categoryS"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("scam")}
                        {/* Scam */}
                      </span>
                    </label>

                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="category"
                        value="categoryF"
                        onChange={() =>
                          handleRadioChange("category", "categoryF")
                        }
                        checked={selectedOptions.category === "categoryF"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("fake")}
                        {/* Fake */}
                      </span>
                    </label>

                    <label className="flex justify-start items-center mb-2 px-4">
                      <input
                        type="radio"
                        className="form-radio w-6 h-6 text-slate-950 "
                        name="category"
                        value="categoryO"
                        onChange={() =>
                          handleRadioChange("category", "categoryO")
                        }
                        checked={selectedOptions.category === "categoryO"}
                      />
                      <span className="ml-2 text-sm text-slate-950 font-normal">
                        {t("others")}
                        {/* Others */}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
          {/* Overlay Rectangle for Filters */}
        </div>
      </div>
    </>
  );
};

export default WebsiteTable;
