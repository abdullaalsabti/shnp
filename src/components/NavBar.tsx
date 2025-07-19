import React from "react";
import { NavLink, Form } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useApplicationSelector } from "../store/storeHooks";
const NavBar: React.FC = () => {
  const listItemClassName = "hover:text-orange-900 cursor-pointer";

  const { t } = useTranslation();
  const authState = useApplicationSelector((state) => state.authState);
  console.log(authState);
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
          {!authState.isAuthenticated && (
            <NavLink
              to={"/login"}
              className={(isActive) => (isActive ? listItemClassName : "")}
            >
              {t("login_nav")}
            </NavLink>
          )}
          {!authState.isAuthenticated && (
            <NavLink
              to={"/createRestaurantAccount"}
              className={(isActive) => (isActive ? listItemClassName : "")}
            >
              {t("create-account")}
            </NavLink>
          )}
          {authState.isAuthenticated && (
            <Form action="/logout" method="post">
              <button className="cursor-pointer">{t("logout")}</button>
            </Form>
          )}

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
