import React, { useState } from "react";
import toTitleCase from "../../utils/toTitleCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import type { FormikFormValues } from "../../utils/formikUtils";
import type { FormikProps } from "formik";

interface PasswordInputProps {
  name: keyof FormikFormValues;
  formik: FormikProps<FormikFormValues>;
  label: string;
  required: boolean;
  placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const touched = props.formik.touched[props.name];
  const error = props.formik.errors[props.name];
  const isStringError = typeof error === "string";

  function toggleVisibility() {
    setIsVisible((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-1 mb-4 ">
      <label htmlFor={props.name} className="text-md text-stone-800 font-bold">
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>
      <div className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 flex flex-row justify-between items-center focus-within:border-orange-500 focus-within:border-2 ">
        <input
          type={isVisible ? "text" : "password"}
          id={props.name}
          placeholder={props.placeholder}
          className="text-md focus:outline-none min-w-0"
          {...props.formik.getFieldProps(props.name)}
        />
        <button
          type="button"
          className="text-gray-500 text-sm bg-transparent p-0"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <FontAwesomeIcon icon={faEyeSlash} size="xl" />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              size="xl"
              className="bg-transparent"
            />
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
