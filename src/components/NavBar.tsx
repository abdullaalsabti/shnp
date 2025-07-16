import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const listItemClassName = "hover:text-orange-900 cursor-pointer";

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
            Home
          </NavLink>
          <NavLink
            to={"/createRestaurantAccount"}
            className={(isActive) => (isActive ? listItemClassName : "")}
          >
            Create Account
          </NavLink>
          <NavLink
            to={"/order"}
            className={(isActive) => (isActive ? listItemClassName : "")}
          >
            Order
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
