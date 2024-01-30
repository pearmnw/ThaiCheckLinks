"use client";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { MouseEventHandler, useState } from "react"; 
import Verification from "../verification/Verification";

interface SearchBarMainProps {
  onPredict?: any;
  url: any;
  setUrl: any;
}

const SearchBarMain: React.FC<SearchBarMainProps> = ({ onPredict, url, setUrl }) => {
  const t = useScopedI18n('homepage');
  const currentLocale = useCurrentLocale();
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: any) => {
    setUrl(e.target.value);
  };

  return (
    <>
      <div className='flex justify-center mb-3'>
        <div className='flex justify-center items-center w-[650px] h-[66px] rounded-[50px] bg-[#121B2B]'>
          <div className='flex'>
            <button
              onClick={() => setOpen(!open)}
              type='button'
              className='w-[66px] h-[66px] bg-slate-700 rounded-tl-[48px] rounded-bl-[48px]'
            >
              <span className='flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-white dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 19 19'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7'
                  />
                </svg>
                <svg
                  className='w-[10px] h-[10px] ml-2 text-white dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 8'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2.5'
                    d='m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1'
                  />
                </svg>
              </span>
            </button>
            {/* <ul
              className={`bg-white mt-2 overflow-y-auto ${
                open ? "max-h-60" : "max-h-0"
              } `}
            >
              <li>
                <svg
                  className="w-5 h-5 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 19 19"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
                  />
                </svg>
              </li>
            </ul> */}
          </div>
          <input
            type='search'
            className='ml-2 -mr-0.5 block min-w-0 flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-[#FFFFFF] outline-none transition duration-200 ease-in-out focus:z-[3]'
            placeholder={t('text')}
            value={url}
            onChange={handleInputChange}
            aria-label='Search'
            aria-describedby='button-addon3'
          />

          {/* Search button */}
          <button
            className='items-center justify-center text-[16px] mr-2 bg-[#F5F5F5] text-[#134BDE] w-[170px] h-[50px] py-2 px-4 rounded-[50px] inline-flex'
            type='button'
            id='button-addon3'
            data-te-ripple-init
            onClick={onPredict}
          >
            {t('verify')}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBarMain;

{
  /* <svg
                className="w-3 h-3 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
                />
              </svg> */
}

// <svg
//   className="w-[20px] h-[20px] text-gray-800 dark:text-white"
//   aria-hidden="true"
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   viewBox="0 0 20 20"
// >
//   <path
//     stroke="currentColor"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     stroke-width="2.5"
//     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//   />
// </svg>
