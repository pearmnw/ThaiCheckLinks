"use client";

import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import SearchWordBar from "./searchbar/searchwordbar";
import { useEffect, useState } from "react";

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
}

// const currentLocale = useCurrentLocale();
const DetailsBox: React.FC<DetailsBoxProps> = ({ websiteUrl })  => {
  const t = useScopedI18n("detailpage");
  const [detail, setDetail] = useState<Detail[]>([]);  
  const [displayRange, setDisplayRange] = useState({ start: 0, end: 5 });
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/homemoredetail?WebsiteURL=${encodeURIComponent(websiteUrl)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        console.log(data); // Check if data is fetched properly

        setDetail(data);

        // Automatically show all items if there are 5 or fewer
        if (data.length <= 5) {
          setShowMore(true);
          setDisplayRange({ start: 0, end: data.length });
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [websiteUrl]);

  // function checkcurrlocale() {
  //   console.log(currentLocale);
  // }

  //========== see more detail function =========
    const toggleShowMore = () => {
      setShowMore((prevShowMore) => !prevShowMore);
    };

    const handleShowMoreClick = () => {
      setDisplayRange((prevRange) => ({
        start: prevRange.start,
        end: prevRange.end + 5, // Increase the end index by 5
      }));
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

    {/* TODO: Catagory selection, Search function, Details list component */}
    <div className="text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
        {t("title")}
        <div className="flex justify-center text-center text-[30px] font-semibold text-transparent bg-clip-text bg-[#011E52]">
          URL: 
          <div className="text-[30px] font-thin text-transparent bg-clip-text bg-[#011E52]">
            {/* TODO: This text may change to variable for the data in database */}
             {websiteUrl}
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
        <SearchWordBar />
      </div>
    


    {/* // ===================Detail box========================= */}
      {detail.slice(displayRange.start, displayRange.end).map((item, index) => (
              <div className="flex justify-center py-6" key={index}>
                <div className="block bg-[#CCD2DECF] w-[50rem] h-[25rem] rounded-[8px] text-[#121B2B] relative px-20">
                  <div className="pt-11 flex justify-center items-center">
                    <img
                      className="w-[5rem] h-[5rem] rounded-full"
                      src={item.UserPictureURL || '/defaultprofile.jpeg'}
                      alt="Rounded avatar"
                    />
                    <div className="flex-grow px-6 font-semibold text-[30px]">{item.UserName}</div>
                    <div className="font-normal text-[24px] absolute top-11 right-10 pr-6 pt-6">
                    {new Date(item.reporttime).toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                          hourCycle: 'h12',
                     }).replace(',', '')} {/* Removing the comma */}
                    </div>
                  </div>
                  <div className="mt-4 ">
                    <div className="pt-4 flex">
                      <div className="pl-2 font-semibold text-[24px]">Category: </div>
                      <div className="font-normal text-justify text-[22px] pl-2 mt-0.5">{item.WebCategoryName}</div>
                    </div>

                    <div className="pt-2 flex">
                      <div className="pl-2 font-semibold text-[24px]">Detail: </div>
                      <div className="font-normal text-justify text-[22px] pl-2 mt-0.5 line-clamp-3">{item.WebsiteReportedDetails}</div>
                    </div>

                    <div className="pt-2 flex">
                      <div className="pl-2 font-semibold text-[24px]">Bank: </div>
                      <div className="font-normal text-justify text-[22px] pl-2 mt-0.5">{`${item.BankName} ${item.BankAccountOwner} ${item.BankNumber}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Show more/less buttons */}
          {detail.length > 5 && (
              <div className="border-b-2 bg-[#BDC1C7] dark:border-white rounded px-6 py-4 w-[50rem] ml-14 flex justify-center" style={{ height: '5rem' }}>
                <div className="w-full flex justify-end space-x-4">
                  {(!showMore && detail.length > 5) && (
                    <button
                      className="text-[#011E52] underline text-xl font-bold"
                      onClick={handleShowMoreClick}
                    >
                      See More
                    </button>
                  )}
                  {(!showMore && detail.length > 5) && (
                    <button
                      className="text-[#011E52] underline text-xl font-bold"
                      onClick={handleShowAllClick}
                    >
                      See All
                    </button>
                  )}
                  {(!showMore || detail.length > 5) && (
                    <button
                      className="text-[#011E52] underline text-xl font-bold"
                      onClick={handleShowLessClick}
                    >
                      See Less
                    </button>
                  )}
              
                </div>
              </div>
          )}
    </>
  );
};

export default DetailsBox;