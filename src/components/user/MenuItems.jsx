import React from "react";

const MenuItems = ({ items }) => {
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
    <div className="bg-white shadow-md rounded-lg p-4 sticky top-[70px]">
      {/* Heading */}
      <h2 className="text-lg font-bold text-primary mb-4">Categories</h2>
      
      {/* Menu Items */}
      <div className="flex flex-col gap-0">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2"
            onClick={() => handleScroll(item.name)}
          >
            {/* Image */}
            <div className="h-12 w-12 rounded-full overflow-hidden shadow-lg">
              <img
                className="h-full w-full object-cover"
                src={item.img}
                alt="Category"
              />
            </div>

            {/* Name */}
            <p className="text-sm font-medium text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
