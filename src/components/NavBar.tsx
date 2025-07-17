import React from "react";
import { NavLink } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
const NavBar: React.FC = () => {
  const listItemClassName = "hover:text-orange-900 cursor-pointer";

  const { t } = useTranslation();

  return (
    <nav className="bg-white  w-full">
      <div className="w-full mx-auto px-4 py-2 flex flex-row items-center justify-between">
        <div>
          <img
            src="/shanabLogo.png"
            alt="brand logo"
            className="h-10 w-30 object-cover"
          />
        </div>
        <ul className="flex gap-4 text-stone-500 font-medium">
          <NavLink
            to={"/"}
            className={(isActive) => (isActive ? listItemClassName : "")}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to={"/createRestaurantAccount"}
            className={(isActive) => (isActive ? listItemClassName : "")}
          >
            {t("create-account")}
          </NavLink>

          <button
            onClick={() => {
              if (i18next.language === "en") {
                i18next.changeLanguage("ar");
              } else {
                i18next.changeLanguage("en");
              }
            }}
          >
            {i18next.language === "en" ? "العربية" : "English"}
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
