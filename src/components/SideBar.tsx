import React, { useState } from "react";
import {
  mainMenuListItems,
  restaurantMenuListItems,
  customerSubscriptionsMenuListItems,
  extraMenuListItems,
  type menuItemType,
} from "../utils/menuItemsList";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplicationSelector } from "../store/storeHooks";
import { useTranslation } from "react-i18next";
import ProfileSection from "./ProfileSection";
import MenuItem from "./menuItem";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const authState = useApplicationSelector((state) => state.authState);
  const { t, i18n } = useTranslation();
  const profile = useApplicationSelector(
    (state) => state.restaurantProfileState.profile
  );
  const employeeProfile = useApplicationSelector(
    (state) => state.restaurantEmployeeProfile.profile
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>(location.pathname);

  const isRTL = i18n.language === "ar";

  function handleItemClick(item: menuItemType) {
    setActiveRoute(item.route);
    console.log(item);
    navigate(item.route);
    if (window.innerWidth < 768) {
      onToggle();
    }
  }

  console.log(activeRoute);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-10 md:hidden"
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-full w-80 overflow-y-auto overflow-x-hidden bg-gray-50 
          ${isRTL ? "rounded-l-4xl" : "rounded-r-4xl"}
          fixed md:relative z-20 md:z-auto
          transform transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
          }
          md:translate-x-0
          ${isRTL ? "right-0 md:right-auto" : "left-0 md:left-auto"}
        `}
      >
        <div className="flex flex-col p-4">
          <img
            className="w-30 h-30 mb-6"
            src="shanabLogo.png"
            alt="logo of shanab company"
          />
          <div className="md:hidden mb-8">
            {authState.isAuthenticated && profile && employeeProfile && (
              <ProfileSection
                imgUrl={profile.imageUrl}
                name={i18n.language === "en" ? profile.nameEn : profile.nameAr}
                owner={employeeProfile?.owner}
                fullName={
                  i18n.language === "en"
                    ? employeeProfile.fullNameEn
                    : employeeProfile.fullNameAr
                }
              />
            )}
          </div>
          <div>
            <p className="font-bold text-xl mt-4 mb-1">Main</p>
            {mainMenuListItems.map((item) => (
              <MenuItem
                icon={item.icon}
                onClick={() => handleItemClick(item)}
                isActive={activeRoute === item.route}
                key={item.route}
              >
                {item.text}
              </MenuItem>
            ))}
          </div>
          <div className="mt-6">
            <p className="font-bold text-xl mt-4 mb-1">Restaurant</p>
            {restaurantMenuListItems.map((item) => (
              <MenuItem
                icon={item.icon}
                onClick={() => handleItemClick(item)}
                isActive={activeRoute === item.route}
                key={item.route}
              >
                {item.text}
              </MenuItem>
            ))}
          </div>
          <div className="mt-6">
            <p className="font-bold text-xl mt-4 mb-1">
              Customer Subscriptions
            </p>
            {customerSubscriptionsMenuListItems.map((item) => (
              <MenuItem
                icon={item.icon}
                onClick={() => handleItemClick(item)}
                isActive={activeRoute === item.route}
                key={item.route}
              >
                {item.text}
              </MenuItem>
            ))}
          </div>
          <div className="w-full h-px bg-gray-700 my-6"></div>
          <div>
            <p className="font-bold text-xl mt-4 mb-1">Extra</p>
            {extraMenuListItems.map((item) => (
              <MenuItem
                icon={item.icon}
                onClick={() => handleItemClick(item)}
                isActive={activeRoute === item.route}
                key={item.route}
              >
                {item.text}
              </MenuItem>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
