import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import type { FormikProps } from "formik";

interface SelectInputProps<T = any> {
  name: keyof T;
  label: string;
  required: boolean;
  placeholder: string;
  options: string[];
  formik: FormikProps<T>;
  valueNotIndex: boolean;
}

const SelectInput = <T = any,>(props: SelectInputProps<T>) => {
  const touched = props.formik.touched[props.name];
  const errors = props.formik.errors[props.name];
  const isStringError = typeof errors === "string";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (props.valueNotIndex) {
      // For single select with string values (like gender)
      props.formik.setFieldValue(props.name as string, event.target.value);
    } else {
      // For multi-select with index values (like roles)
      const selectedOptions = Array.from(event.target.selectedOptions).map(
        (option) => parseInt(option.value)
      );
      props.formik.setFieldValue(props.name as string, selectedOptions);
    }
  }

  return (
    <div className="flex flex-col gap-1 mb-4 ">
      <label
        htmlFor={props.name as string}
        className="text-md text-stone-800 font-bold"
      >
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>
      <select
        id={props.name as string}
        className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 focus:outline-orange-500 flex flex-row gap-3"
        {...props.formik.getFieldProps(props.name as string)}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {props.options.map((opt, index) => (
          <option value={props.valueNotIndex ? opt : index} key={opt}>
            {opt}
          </option>
        ))}
      </select>
      {touched && errors && isStringError && (
        <span className="text-red-500 text-sm">{errors}</span>
      )}
    </div>
  );
};

export default SelectInput;
