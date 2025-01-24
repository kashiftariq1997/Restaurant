import React, { useState, useEffect, useRef } from "react";

const MenuItems = ({ items, onItemClick }) => {
  const [activeItem, setActiveItem] = useState(null);
  const isClickedRef = useRef(false); // Tracks if a click has occurred

  useEffect(() => {
    const observerCallback = (entries) => {
      if (isClickedRef.current) return; // Ignore updates during click cooldown

      // Sort entries by their proximity to the viewport center
      const sortedEntries = [...entries].sort((a, b) => {
        const centerA = Math.abs(
          a.boundingClientRect.top +
            a.boundingClientRect.height / 2 -
            window.innerHeight / 2
        );
        const centerB = Math.abs(
          b.boundingClientRect.top +
            b.boundingClientRect.height / 2 -
            window.innerHeight / 2
        );
        return centerA - centerB;
      });

      // Find the most visible entry
      const visibleEntry = sortedEntries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        const id = visibleEntry.target.id;
        const index = items.findIndex((item) => item.name === id);
        setActiveItem(index);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // Trigger when at least 50% of the section is visible
    });

    items.forEach((item) => {
      const element = document.getElementById(item.name);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id, index) => {
    setActiveItem(index);
    isClickedRef.current = true; // Set click state
    const element = document.getElementById(id);

    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }

    // Notify parent component
    if (onItemClick) onItemClick();

    // Clear click state after 1 second
    setTimeout(() => {
      isClickedRef.current = false;
    }, 1000);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 sticky top-[70px] md:top-20">
      {/* Heading */}
      <h2 className="text-lg font-bold text-primary mb-4 md:text-xl">
        Categories
      </h2>

      {/* Menu Items */}
      <div className="flex flex-col gap-1 sm:gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 cursor-pointer rounded-md p-2 sm:p-3 ${
              activeItem === index ? "bg-gray-100" : ""
            }`}
            onClick={() => handleClick(item.name, index)}
          >
            {/* Image */}
            <div
              className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full overflow-hidden shadow-lg transition-all duration-300 ${
                activeItem === index
                  ? "border-2 border-pink-500 scale-105"
                  : "border border-transparent"
              }`}
            >
              <img
                className="h-full w-full object-cover"
                src={item.img}
                alt="Category"
              />
            </div>

            {/* Name */}
            <p
              className={`text-xs sm:text-sm md:text-base font-medium ${
                activeItem === index ? "text-pink-500" : "text-gray-700"
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
