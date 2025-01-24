import React from "react";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Slider from "react-slick";
import { images } from "../../data";

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute bg-white rounded-full text-2xl sm:text-3xl text-lightGray p-1 sm:p-2 top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-10 cursor-pointer hover:bg-secondaryVariant hover:text-white transition-all"
    onClick={onClick}
  >
    <MdKeyboardArrowLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute bg-white rounded-full text-2xl sm:text-3xl text-lightGray p-1 sm:p-2 top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-10 cursor-pointer hover:bg-secondaryVariant hover:text-white transition-all"
    onClick={onClick}
  >
    <MdOutlineKeyboardArrowRight />
  </div>
);

export default function HeroSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="relative mb-6 px-2 sm:px-4 lg:px-8">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] -z-0 flex items-center justify-center"
          >
            <img
              className="h-full w-full object-contain transition-all duration-500 ease-in-out"
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
