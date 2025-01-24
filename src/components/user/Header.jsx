import React from "react";
import { TbRoute } from "react-icons/tb";
import track from "../../assets/header/track.png";
import { GoArrowRight } from "react-icons/go";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-secondaryVariant w-full text-white py-4 px-6 md:h-16">
      {/* Order Stage Information */}
      <div className="flex items-center gap-4 mb-2 md:mb-0">
        <div className="text-xl md:text-2xl rotate-270">
          <TbRoute />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-sm md:text-base font-medium mb-1">
            {t("yourOrderProcessStage")}
          </h3>
          <p className="text-xs md:text-sm font-medium">
            {t("YourOrderisConfirmed")}
          </p>
        </div>
      </div>

      {/* Track Image */}
      <div className="w-full max-w-[100px] md:max-w-none md:w-auto h-auto mb-4 md:mb-0 flex-shrink-0">
        <img
          src={track}
          alt="Track"
          className="mx-auto md:ml-auto md:mr-16 object-contain w-full h-full"
        />
      </div>

      {/* Navigate Button */}
      <button
        className="bg-white text-secondaryVariant text-xl md:text-2xl rounded-full p-3 md:p-2 flex-shrink-0"
        onClick={() => navigate("/my-orders")}
      >
        <GoArrowRight />
      </button>
    </div>
  );
};

export default Header;
