import React, { useState } from "react";
import toTitleCase from "../../utils/toTitleCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { FormikProps } from "formik";
import type { FormikFormValues } from "../../utils/formikUtils";

interface PasswordInputProps {
  label: string;
  name: string;
  formikName?: keyof FormikFormValues;
  required: boolean;
  placeholder: string;
  formik?: FormikProps<FormikFormValues>;
  leadingIcon?: IconProp;
  iconStyling?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const fieldName = props.formikName ?? props.name;

  const touched = props.formikName && props.formik?.touched[props.formikName];
  const error = props.formikName && props.formik?.errors[props.formikName];
  const isStringError = typeof error === "string";

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      <label htmlFor={fieldName} className="text-md text-stone-800 font-bold">
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>

      <div className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 flex flex-row justify-between items-center focus-within:border-orange-500 focus-within:border-2">
        {props.leadingIcon && (
          <FontAwesomeIcon icon={props.leadingIcon} size="xl" />
        )}

        <input
          id={fieldName}
          type={isVisible ? "text" : "password"}
          placeholder={props.placeholder}
          className="text-md focus:outline-none min-w-0 w-full mx-2.5"
          {...(props.formik && props.formikName
            ? props.formik.getFieldProps(props.formikName)
            : {
                value: props.value ?? "",
                onChange: props.onChange,
              })}
          name={fieldName}
        />

        <button
          type="button"
          className="text-gray-500 text-sm bg-transparent p-0"
          onClick={handleToggleVisibility}
        >
          {isVisible ? (
            <FontAwesomeIcon icon={faEyeSlash} size="xl" />
          ) : (
            <FontAwesomeIcon icon={faEye} size="xl" />
          )}
        </button>
      </div>

      {touched && error && isStringError && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default PasswordInput;
