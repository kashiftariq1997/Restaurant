import React from "react";
import { TbRoute } from "react-icons/tb";
import track from "../../assets/header/track.png";
import { GoArrowRight } from "react-icons/go";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden  md:flex justify-center bg-secondaryVariant h-16 w-full text-white py-2">
      <div className="flex items-center w-full px-4 lg:max-w-[900px]">
        <div className="flex items-center gap-4">
          <div className="text-2xl rotate-270">
            <TbRoute />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">
              {t("yourOrderProcessStage")}
            </h3>
            <p className="text-xs font-medium">{t("YourOrderisConfirmed")}</p>
          </div>
        </div>
        <div className="ml-auto lg:mr-16 mr-4">
          <img src={track} alt="Image" />
        </div>
        <button
          className="bg-white text-secondaryVariant text-2xl rounded-full p-1"
          onClick={() => navigate("/my-orders")}
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Header;
