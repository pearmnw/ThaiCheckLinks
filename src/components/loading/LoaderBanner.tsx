import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { tipOfUseImgs } from "./constants";
import ImgSlide from "./ImgSlide";

const LoaderBanner = () => {
  const swiperRef = useRef<any>();

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="flex justify-center items-center w-full relative overflow-hidden rounded-xl"
      spaceBetween={50}
      slidesPerView={1}
    >
      {tipOfUseImgs.map((img, index) => (
        <SwiperSlide key={index}>
          <ImgSlide img={img} />
        </SwiperSlide>
      ))}

      <button
        title="swiper"
        onClick={() => swiperRef.current.slidePrev()}
        className="text-black absolute bottom-[50%] translate-y-[50%] z-50 left-12 w-[52px] h-[52px] rounded-full bg-[#15141199] backdrop-blur items-center justify-center hidden md:flex hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        title="swiper"
        onClick={() => swiperRef.current.slideNext()}
        className="text-black absolute bottom-[50%] translate-y-[50%] z-50 right-12 w-[52px] h-[52px] rounded-full bg-[#15141199] backdrop-blur items-center justify-center hidden md:flex hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </Swiper>
  );
};

export default LoaderBanner;
