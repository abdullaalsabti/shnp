import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import type { FormikProps } from "formik";
import type { FormikFormValues } from "../../utils/formikUtils";

interface SelectInputProps {
  name: keyof FormikFormValues;
  label: string;
  required: boolean;
  placeholder: string;
  options: string[];
  formik: FormikProps<FormikFormValues>;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const touched = props.formik.touched[props.name];
  const errors = props.formik.errors[props.name];
  const isStringError = typeof errors === "string";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => parseInt(option.value)
    );
    props.formik.setFieldValue(props.name, selectedOptions);
  }

  return (
    <div className="flex flex-col gap-1 mb-4 ">
      <label
        htmlFor={props.name}
        className="text-md text-stone-800 font-bold text-left"
      >
        {toTitleCase(props.label) + (props.required ? "*" : "")}
      </label>
      <select
        id={props.name}
        className="border border-gray-500 rounded-xl shadow px-2 py-2 bg-gray-100 focus:outline-orange-500 flex flex-row gap-3"
        {...props.formik.getFieldProps(props.name)}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {props.options.map((opt, index) => (
          <option value={index} key={opt}>
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
