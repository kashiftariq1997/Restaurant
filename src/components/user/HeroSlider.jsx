import React from "react";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Slider from "react-slick";
import { images } from "../../data";

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute bg-white rounded-full text-3xl text-lightGray p-1 top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer hover:bg-secondaryVariant hover:text-white transition-all"
    onClick={onClick}
  >
    <MdKeyboardArrowLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute bg-white rounded-full text-3xl text-lightGray p-1 top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer hover:bg-secondaryVariant hover:text-white transition-all"
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
    <div className="relative mb-0">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden h-[400px] -z-0"
          >
            <img
              className="h-full w-full object-cover transition-all duration-500 ease-in-out"
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
