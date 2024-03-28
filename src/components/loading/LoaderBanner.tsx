import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { tipOfUseImgs } from "./constants";
import ImgSlide from "./ImgSlide";

const LoaderBanner = () => {
  const swiperRef = useRef<any>();

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="flex justify-center items-center w-full relative overflow-hidden rounded-xl"
    >
      {tipOfUseImgs.map((img, _i) => (
        <SwiperSlide key={_i}>{<ImgSlide img={img} />}</SwiperSlide>
      ))}

      <button
        onClick={() => swiperRef.current.slidePrev()}
        className="text-black  absolute bottom-[50%] top-[50%] z-50 left-12 w-[52px] h-[52px] rounded-full bg-[#15141199] backdrop-blur items-center justify-center hidden md:flex hover:cursor-pointer"
      >
        <span className="sr-only">Next</span> {/* Visually hidden text */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.0898 19.92L8.56984 13.4C7.79984 12.63 7.79984 11.37 8.56984 10.6L15.0898 4.08"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <button
        onClick={() => swiperRef.current.slideNext()}
        className="text-black  absolute bottom-[50%] top-[50%] z-50 right-12 w-[52px] h-[52px] rounded-full bg-[#15141199] backdrop-blur  items-center justify-center hidden md:flex hover:cursor-pointer"
      >
        <span className="sr-only">Next</span> {/* Visually hidden text */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="rotate-180"
            fill="none"
          >
            <path
              d="M15.0898 19.92L8.56984 13.4C7.79984 12.63 7.79984 11.37 8.56984 10.6L15.0898 4.08"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </Swiper>
  );
};

export default LoaderBanner;
