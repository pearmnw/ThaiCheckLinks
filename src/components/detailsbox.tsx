"use client";

import { useScopedI18n } from "@/locales/client";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./loading/Loader";
import SearchWordBar from "./searchbar/searchwordbar";

interface DetailsBoxProps {
  websiteUrl: string;
}

// Define the Detail interface
interface Detail {
  UserName: string;
  UserPictureURL: string;
  WebsiteURL: string;
  WebCategoryID: number;
  WebCategoryName: string;
  reporttime: Date;
  BankID: string;
  BankName: string;
  BankAccountOwner: string;
  BankNumber: string;
  WebsiteReportedDetails: string;
  PhoneNumber: string;
}
//
// const currentLocale = useCurrentLocale();
const DetailsBox: React.FC<DetailsBoxProps> = ({ websiteUrl }) => {
  const t = useScopedI18n("detailpage");
  const [detail, setDetail] = useState<Detail[]>([]);
  const [displayRange, setDisplayRange] = useState({ start: 0, end: 5 });
  const [showMore, setShowMore] = useState(false);
  const [filteredDetails, setFilteredDetails] = useState<Detail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({
    gambling: 0,
    scam: 0,
    fake: 0,
    others: 0,
  });
  const [clickedCategory, setClickedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `api/homemoredetail?WebsiteURL=${encodeURIComponent(websiteUrl)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // throw new Error("Failed to fetch data");
          toast.error("Failed to fetch data");
        } else {
          setIsLoading(false);
        }

        const data = await response.json();
        console.log(data); // Check if data is fetched properly

        setDetail(data);

        // Automatically show all items if there are 5 or fewer
        if (data.length <= 5) {
          setShowMore(true);
          setDisplayRange({ start: 0, end: data.length });
        }

        // Calculate category counts
        const counts = countReportsByCategory(data);
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [websiteUrl]);

  // function checkcurrlocale() {
  //   console.log(currentLocale);
  // }

  //==============Search==========
  useEffect(() => {
    // Filter details based on search term
    const filtered = detail.filter(
      (detail) =>
        detail.WebsiteReportedDetails.search(new RegExp(searchTerm, "iu")) !==
          -1 ||
        detail.BankName.search(new RegExp(searchTerm, "iu")) !== -1 ||
        detail.BankAccountOwner.search(new RegExp(searchTerm, "iu")) !== -1 ||
        detail.BankNumber.toString().includes(searchTerm) ||
        detail.PhoneNumber.toString().includes(searchTerm) ||
        detail.UserName.search(new RegExp(searchTerm, "iu")) !== -1
    );
    setFilteredDetails(filtered as Detail[]);
  }, [detail, searchTerm]);
  //========================

  const handleSearch = (term: SetStateAction<string>) => {
    setSearchTerm(term);
  };

  // Function to count the number of reports for each category
  const countReportsByCategory = (data: Detail[]) => {
    const counts: { [key: string]: number } = {
      gambling: 0,
      scam: 0,
      fake: 0,
      others: 0,
    };

    data.forEach((item) => {
      counts[item.WebCategoryName.toLowerCase()]++;
    });

    return counts;
  };

  // const handleCategoryClick = (category: SetStateAction<string>) => {
  //   setClickedCategory(category === clickedCategory ? "" : category);
  // };
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleCategoryClick = (category: string) => {
    const updatedSelectedCategories = new Set(selectedCategories);
    if (updatedSelectedCategories.has(category)) {
      updatedSelectedCategories.delete(category);
    } else {
      updatedSelectedCategories.add(category);
    }
    setSelectedCategories(updatedSelectedCategories);
  };

  //========== see more detail function =========
  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleShowMoreClick = () => {
    setDisplayRange((prevRange) => {
      const newEnd = prevRange.end + 5;
      const hasMoreDetails = newEnd < filteredDetails.length;
      if (!hasMoreDetails) {
        setShowMore(true);
      }
      return {
        start: prevRange.start,
        end: newEnd,
      };
    });
  };

  const handleShowLessClick = () => {
    setDisplayRange({ start: 0, end: 5 });
    setShowMore(false);
  };

  const handleShowAllClick = () => {
    setDisplayRange({ start: 0, end: detail.length });
    setShowMore(true);
  };

  const showMoreButton = !showMore && (
    <button onClick={handleShowMoreClick}>See More</button>
  );

  let showLessButton = null;
  if (!showMore && detail.length > 5) {
    showLessButton = <button onClick={handleShowLessClick}>See Less</button>;
  }

  const showAllButton = !showMore && detail.length > 5 && (
    <button onClick={handleShowAllClick}>See All</button>
  );

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-12">
          <Loader />
        </div>
      )}
      <div className={`${isLoading ? "opacity-20" : ""}`}>
        {/* TODO: Catagory selection, Search function, Details list component */}
        <div className="text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("title")}
          <div className="flex justify-center text-center text-[30px] font-semibold text-transparent bg-clip-text bg-[#011E52]">
            URL: &nbsp;
            <div className="text-[30px] font-thin text-transparent bg-clip-text bg-[#011E52]">
              {/* TODO: This text may change to variable for the data in database */}
              {websiteUrl}
            </div>
          </div>

          <div className="flex pt-4 pb-6 justify-center text-center text-[30px] font-semibold text-transparent bg-clip-text bg-[#011E52]">
            {t("category")}
            {":"} &nbsp;
            {/* =============================================== */}
            {/* ==== Button for filter when click = hide the detail box having that category ====*/}
            <div className="flex space-x-3 justify-center items-center drop-shadow-xl text-center text-[18px] font-medium text-transparent bg-clip-text bg-[#011E52]">
              {["G", "S", "F", "O"].map((category) => (
                <button
                  key={category}
                  className={`bg-${
                    selectedCategories.has(category) ? "[#BDC1C7]" : "[#CCD2DE]"
                  }  text-[#011E52] py-2 px-4 rounded inline-flex items-center`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <span className="">
                    {category === "G"
                      ? t("gamblingr")
                      : category === "S"
                      ? t("scamr")
                      : category === "F"
                      ? t("faker")
                      : t("othersr")}{" "}
                    {category === "G"
                      ? categoryCounts["gambling"]
                      : category === "S"
                      ? categoryCounts["scam"]
                      : category === "F"
                      ? categoryCounts["fake"]
                      : category === "O"
                      ? categoryCounts["others"]
                      : null}
                  </span>
                  {selectedCategories.has(category) ? (
                    <div className="ml-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="17"
                          height="17"
                          rx="1.5"
                          fill="white"
                          stroke="black"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="ml-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="17"
                          height="17"
                          rx="1.5"
                          fill="white"
                          stroke="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.6624 5.91285L7.28487 13.2904L3.32227 9.01818L4.17763 8.2248L7.31647 11.6089L13.8375 5.08789L14.6624 5.91285Z"
                          fill="black"
                          stroke="black"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {/* ==== ==================================================== ====*/}
          </div>
          <SearchWordBar onSearch={handleSearch} />
        </div>

        {/* // ===================Detail box========================= */}
        {filteredDetails
          .filter(
            (item) =>
              !selectedCategories.has(item.WebCategoryName.toUpperCase()[0])
          )
          .slice(displayRange.start, displayRange.end)
          .map((item, index) => (
            <div className="flex justify-center py-6" key={index}>
              <div className="block bg-[#CCD2DECF] w-[50rem] h-[25rem] rounded-[8px] text-[#121B2B] relative px-20">
                <div className="pt-11 flex justify-center items-center">
                  <img
                    className="w-[5rem] h-[5rem] rounded-full"
                    src={"/defaultprofile.jpeg"}
                    alt="Rounded avatar"
                  />
                  <div className="flex-grow px-6 font-semibold text-[30px]">
                    {searchTerm
                      ? // If there is a search term, conditionally render the highlighted search term
                        item.UserName.split(
                          new RegExp(`(${searchTerm})`, "gi")
                        ).map((part, index) =>
                          part.toLowerCase() === searchTerm.toLowerCase() ? (
                            <span
                              key={index}
                              style={{ backgroundColor: "#7F9BBC" }}
                            >
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )
                      : // If there is no search term, display the username as is
                        item.UserName}
                    {/* {`${t("user")} ${index + 1}`} */}
                  </div>
                  <div className="font-normal text-[24px] absolute top-11 right-10 pr-6 pt-6">
                    {new Date(item.reporttime)
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                        hourCycle: "h12",
                      })
                      .replace(",", "")}{" "}
                    {/* Removing the comma */}
                  </div>
                </div>
                <div className="mt-4 ">
                  <div className="pt-4 flex">
                    <div className="pl-2 font-semibold text-[24px]">
                      {t("category")} :{" "}
                    </div>
                    <div className="font-normal text-justify text-[22px] pl-2 mt-0.5">
                      {item.WebCategoryName === "Gambling"
                        ? t("gambling")
                        : item.WebCategoryName === "Scam"
                        ? t("scam")
                        : item.WebCategoryName === "Fake"
                        ? t("fake")
                        : t("others")}
                    </div>
                  </div>

                  <div className="pt-2 flex">
                    <div className="text-nowrap pl-2 font-semibold text-[24px]">
                      {t("detail")}&nbsp;:
                    </div>
                    <div className="font-normal text-justify text-[22px] pl-2 mt-0.5 line-clamp-3">
                      {searchTerm ? (
                        item.WebsiteReportedDetails.split(
                          new RegExp(`(${searchTerm})`, "gi")
                        ).map((part, index) =>
                          part.toLowerCase() === searchTerm.toLowerCase() ? (
                            <span
                              key={index}
                              style={{ backgroundColor: "#7F9BBC" }}
                            >
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )
                      ) : (
                        <span>{item.WebsiteReportedDetails}</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex">
                    <div className="pl-2 font-semibold text-[24px]">
                      {t("bank")} :{" "}
                    </div>
                    <div className="font-normal text-justify text-[22px] pl-2 mt-0.5">
                      {`${item.BankName} ${item.BankAccountOwner} ${item.BankNumber}`
                        .split(new RegExp(`(${searchTerm})`, "gi"))
                        .map((word, index) =>
                          isNaN(parseInt(word)) &&
                          word.toLowerCase() === searchTerm.toLowerCase() ? (
                            <span
                              key={index}
                              style={{ backgroundColor: "#7F9BBC" }}
                            >
                              {word}
                            </span>
                          ) : (
                            <span key={index}>{word}</span>
                          )
                        )}
                    </div>
                  </div>

                  <div className="pt-2 flex">
                    <div className="pl-2 font-semibold text-[24px]">
                      {t("phone")} :{" "}
                    </div>
                    <div className="font-normal text-justify text-[22px] pl-2 mt-0.5">
                      {`${item.PhoneNumber}`
                        .split(new RegExp(`(${searchTerm})`, "gi"))
                        .map((word, index) =>
                          isNaN(parseInt(word)) &&
                          word.toLowerCase() === searchTerm.toLowerCase() ? (
                            <span
                              key={index}
                              style={{ backgroundColor: "#7F9BBC" }}
                            >
                              {word}
                            </span>
                          ) : (
                            <span key={index}>{word}</span>
                          )
                        )}
                    </div>
                  </div>



                </div>
              </div>
            </div>
          ))}

        {/* Show more/less buttons */}
        {filteredDetails.filter(
          (item) =>
            !selectedCategories.has(item.WebCategoryName.toUpperCase()[0])
        ).length > 5 && (
          <div
            className="border-b-2 bg-[#BDC1C7] dark:border-white rounded px-6 py-4 w-[51rem] ml-16 flex justify-center"
            style={{ height: "5rem" }}
          >
            <div className="w-full flex justify-end space-x-4">
              {!showMore && detail.length > 5 && (
                <button
                  className="text-[#011E52] underline text-xl font-bold drop-shadow-lg"
                  onClick={handleShowMoreClick}
                >
                  {t("seemore")}
                </button>
              )}
              {!showMore && detail.length > 5 && (
                <button
                  className="text-[#011E52] underline text-xl font-bold drop-shadow-lg"
                  onClick={handleShowAllClick}
                >
                  {t("seeall")}
                </button>
              )}
              {(!showMore || detail.length > 5) && (
                <button
                  className="text-[#011E52] underline text-xl font-bold drop-shadow-lg"
                  onClick={handleShowLessClick}
                >
                  {t("seeless")}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsBox;
