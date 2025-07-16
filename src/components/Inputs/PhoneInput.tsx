import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import "react-phone-number-input/style.css";
import ReactPhoneNumberInput, { type Value } from "react-phone-number-input";
import type { FormikFormValues } from "../../utils/formikUtils";
import type { FormikProps } from "formik";

interface PhoneInputProps {
  name: keyof FormikFormValues;
  label: string;
  required: boolean;
  placeholder: string;
  formik: FormikProps<FormikFormValues>;
}

const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const touched = props.formik.touched[props.name];
  const error = props.formik.errors[props.name];
  const isStringError = typeof error === "string";

  return (
    <div className="flex flex-col gap-1 mb-4 ">
      <label htmlFor={props.name} className="text-md text-stone-800 font-bold">
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>

      <div className="">
        <ReactPhoneNumberInput
          className="w-full border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 focus:outline-orange-500 flex flex-row gap-3 "
          onChange={(value: Value) =>
            props.formik.setFieldValue(props.name, value)
          }
          onBlur={() => props.formik.setFieldTouched(props.name, true)}
          placeholder={props.placeholder}
          value={props.formik.values[props.name] as string}
          defaultCountry="SA"
        ></ReactPhoneNumberInput>
      </div>

      {touched && error && isStringError && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default PhoneInput;
