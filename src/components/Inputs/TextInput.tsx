import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import type { FormikProps } from "formik";
import type { FormikFormValues } from "../../utils/formikUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TextInputProps {
  label: string;
  formikName?: keyof FormikFormValues;
  name: string;
  required: boolean;
  placeholder: string;
  type: "text" | "email";
  formik?: FormikProps<FormikFormValues>;
  leadingIcon?: IconProp;
  trailingIcon?: IconProp;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const touched =
    props.formikName && props.formik && props.formik.touched[props.formikName];
  const error =
    props.formikName && props.formik && props.formik.errors[props.formikName];
  const isStringError = typeof error === "string";

  const fieldName = props.formikName ?? props.name;

  return (
    <div className="flex flex-col gap-1 mb-4 w-full ">
      <label htmlFor={props.name} className="text-md text-stone-800 font-bold">
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>

      <div className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 focus:outline-orange-500 flex flex-row justify-between">
        {props.leadingIcon && (
          <FontAwesomeIcon icon={props.leadingIcon} size="xl" />
        )}

        <input
          type={props.type}
          placeholder={props.placeholder}
          id={fieldName}
          {...(props.formik && props.formikName
            ? props.formik.getFieldProps(props.formikName)
            : {
                value: props.value,
                onChange: props.onChange,
              })}
          className="min-w-0 w-full mx-2.5"
          name={fieldName}
        />
        {props.trailingIcon && (
          <FontAwesomeIcon
            icon={props.trailingIcon}
            size="xl"
            className="bg-transparent"
          />
        )}
      </div>
      {touched && error && isStringError && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default TextInput;
