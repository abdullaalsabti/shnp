import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  inverted?: boolean;
  additionalStyles?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // inherit native button props

const Button: React.FC<ButtonProps> = ({
  children,
  inverted = false,
  additionalStyles,
  ...rest
}) => {
  const baseStyles =
    "py-2 px-3 rounded-3xl shadow font-bold transition-colors duration-200";

  const normalStyles =
    "bg-orange-500 text-white hover:bg-orange-600 hover:text-white";

  const invertedStyles =
    "bg-white text-orange-500 border border-orange-500 hover:bg-orange-100";

  const combinedStyles = `${baseStyles} ${
    inverted ? invertedStyles : normalStyles
  } ${additionalStyles}`;

  return (
    <button type="button" className={combinedStyles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
