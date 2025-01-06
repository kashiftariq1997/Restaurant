import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuItems = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
  {items.map((item, index) => (
    <div
      key={index}
      className="flex flex-col gap-2 items-center text-center cursor-pointer"
      onClick={() => handleScroll(item.name)}
    >
      <div className="h-[75px] w-[75px] rounded-full overflow-hidden shadow-lg">
        <img
          className="h-full w-full object-cover"
          src={item.img}
          alt="Image"
        />
      </div>
      <p className="uppercase text-xs font-medium">{item.name}</p>
    </div>
  ))}
</>
  );
};

export default MenuItems;
