import React, { useEffect } from "react";
import { NavLink, Form, useNavigate, useLocation } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  useApplicationDispatch,
  useApplicationSelector,
} from "../store/storeHooks";
import toTitleCase from "../utils/toTitleCase";
import splitAtCapitalLetter from "../utils/splitAtCapitalLetter";
import fetchRestaurantEmployeeProfileData from "../utils/fetchRestaurantPofile";
import ProfileSection from "./ProfileSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";

type NavBarProps = {
  onSidebarToggle?: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ onSidebarToggle }) => {
  const listItemClassName = "hover:text-orange-900 cursor-pointer";
  const { t, i18n } = useTranslation();
  const authState = useApplicationSelector((state) => state.authState);
  const dispatch = useApplicationDispatch();
  const profile = useApplicationSelector(
    (state) => state.restaurantProfileState.profile
  );
  const currentRoute = toTitleCase(
    splitAtCapitalLetter(useLocation().pathname.slice(1))
  );

  useEffect(() => {
    if (authState.token) {
      fetchRestaurantEmployeeProfileData(dispatch, authState, i18n);
    }
  }, [authState.token, dispatch]);

  console.log(authState);
  console.log(currentRoute);

  return (
    <nav className="bg-white  w-full">
      <div className="w-full mx-auto px-4 py-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          {authState.isAuthenticated && onSidebarToggle && (
            <button
              onClick={onSidebarToggle}
              className="block md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faBars} size="lg"></FontAwesomeIcon>
            </button>
          )}
          {!authState.isAuthenticated ? (
            <img
              src="/shanabLogo.png"
              alt="brand logo"
              className="h-10 w-30 object-cover"
            />
          ) : (
            <h2 className="font-bold text-xl">{currentRoute}</h2>
          )}
        </div>
        <ul className="flex gap-4 text-stone-500 font-medium items-center">
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
          {/* {authState.isAuthenticated && (
            <Form action="/logout" method="post">
              <button className="cursor-pointer">{t("logout")}</button>
            </Form>
          )} */}
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
          <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
          <div className="hidden md:block">
            {authState.isAuthenticated && profile && (
              <ProfileSection
                imgUrl={profile.imageUrl}
                name={i18n.language === "en" ? profile.nameEn : profile.nameAr}
              ></ProfileSection>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
