import React from "react";

interface ImgSlideProps {
  img: {
    id: number;
    imgUrl: string;
  };
}

const ImgSlide: React.FC<ImgSlideProps> = ({ img }) => {

  return (
    <div className="w-full h-[200px] md:h-[550px] group flex flex-row justify-center overflow-hidden">
      <img src={img.imgUrl} alt="Tip of Use Image" />
    </div>
  );
};

export default ImgSlide;
