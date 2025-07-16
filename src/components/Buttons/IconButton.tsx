import type {
  IconDefinition,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type IconButtonProps = {
  icon: IconDefinition;
  children?: React.ReactNode;
  size?: SizeProp | undefined;
  additionalStyles?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "1x",
  additionalStyles = "",
  children,
  ...rest
}) => {
  return (
    <button
      className={`text-orange-500 font-bold px-2 py-1 ${additionalStyles}`}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} size={size}></FontAwesomeIcon>
      {children}
    </button>
  );
};

export default IconButton;
