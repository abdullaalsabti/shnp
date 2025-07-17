import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import type { FormikProps } from "formik";
import type { FormikFormValues } from "../../utils/formikUtils";

interface TextInputProps {
  label: string;
  name: keyof FormikFormValues;
  required: boolean;
  placeholder: string;
  type: string;
  formik: FormikProps<FormikFormValues>;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const touched = props.formik.touched[props.name];
  const error = props.formik.errors[props.name];
  const isStringError = typeof error === "string";

  return (
    <div className="flex flex-col gap-1 mb-4 ">
      <label htmlFor={props.name} className="text-md text-stone-800 font-bold">
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>

      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.name}
        {...props.formik.getFieldProps(props.name)}
        className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 focus:outline-orange-500"
      />

      {touched && error && isStringError && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default TextInput;
