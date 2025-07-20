import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

type MenuItemProps = {
  icon: IconProp;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  isActive = false,
  children,
  ...rest
}) => {
  const baseCss =
    "text-gray-200 rounded-xl w-full py-3 font-bold text-xl text-left px-2";
  let buttonCss = "";
  if (!isActive) {
    buttonCss = baseCss + " text-gray-400 hover:bg-gray-100";
  } else {
    buttonCss = baseCss + " text-white bg-orange-500 hover:bg-orange-500/80";
  }
  return (
    <button {...rest} className={buttonCss}>
      <div className="grid grid-cols-[70px_1fr] items-center">
        <FontAwesomeIcon
          icon={icon}
          className="mx-2 mr-5 "
        ></FontAwesomeIcon>
        <p className="text-[1rem]">{children}</p>
      </div>
    </button>
  );
};

export default MenuItem;
