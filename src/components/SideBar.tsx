import React, { useState } from "react";
import {
  mainMenuListItems,
  restaurantMenuListItems,
  customerSubscriptionsMenuListItems,
  extraMenuListItems,
  type menuItemType,
} from "../utils/menuItemsList";
import MenuItem from "./menuItem";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [activeRoute, setActiveRoute] = useState<string>("/dashboard");
  const navigate = useNavigate();

  function handleItemClick(item: menuItemType) {
    setActiveRoute(item.route);
    console.log(item);
    navigate(item.route);
  }

  return (
    <>
      {/* for mobile screens: */}
      {isOpen && <div className="fixed left-0 z-10 md:hidden"></div>}
      {/* for tablet and desktop */}
      <aside className="h-full w-80 overflow-y-auto overflow-x-hidden bg-gray-50 rounded-r-4xl">
        <div className="flex flex-col p-4">
          <img
            className="w-30 h-30 mb-6"
            src="shanabLogo.png"
            alt="logo of shanab company"
          />
          <div>
            <p className="font-bold text-xl  mt-4 mb-1">Main</p>
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
            <p className="font-bold text-xl  mt-4 mb-1">Restaurant</p>
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
            <p className="font-bold text-xl  mt-4 mb-1">Extra</p>
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
