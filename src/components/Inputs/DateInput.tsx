import React from "react";
import toTitleCase from "../../utils/toTitleCase";
import type { FormikProps } from "formik";

interface DateInputProps<T = any> {
  label: string;
  formikName?: keyof T;
  name: string;
  required: boolean;
  placeholder: string;
  formik?: FormikProps<T>;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = <T = any,>(props: DateInputProps<T>) => {
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
        <input
          type="date"
          placeholder={props.placeholder}
          id={fieldName as string}
          {...(props.formik && props.formikName
            ? props.formik.getFieldProps(props.formikName as string)
            : {
                value: props.value,
                onChange: props.onChange,
              })}
          className="min-w-0 w-full mx-2.5"
          name={fieldName as string}
        />
      </div>
      {touched && error && isStringError && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default DateInput;
