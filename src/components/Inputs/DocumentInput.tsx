import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import type { FormikFormValues } from "../../utils/formikUtils";
import { getIn, type FormikProps } from "formik";

interface DocumentInputProps {
  label: string;
  name: string;
  optionalIcon: boolean;
  optionalFile: string; //path to file?
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formik: FormikProps<FormikFormValues>;
  uploadedUrls: string[];
}

const DocumentInput: React.FC<DocumentInputProps> = (props) => {
  const { t } = useTranslation();
  const touched = getIn(props.formik.touched, props.name);
  const error = getIn(props.formik.errors, props.name);
  const isStringError = typeof error === "string";
  const previewContent = props.uploadedUrls?.map((url) => {
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url ?? "");
    const isPDF = /\.(pdf)$/i.test(url ?? "");

    let preview = null;
    if (url) {
      if (isImage) {
        preview = (
          <img
            src={url}
            alt={t("inputs.document.preview_alt")}
            className="w-25 h-25 object-cover rounded-md"
          />
        );
      } else if (isPDF) {
        preview = <a href={url}>{t("inputs.document.view_pdf")}</a>;
      } else {
        preview = <a href={url}>{t("inputs.document.download_file")}</a>;
      }
    }

    return preview;
  });

  // console.log(previewContent);

  return (
    <>
      <div className="flex max-h- flex-col gap-2 mt-6 bg-gray-100 border border-gray-500 p-4 items-start justify-center">
        <label htmlFor={props.name} className="font-bold text-sm">
          {props.label}
          {props.optionalIcon && (
            <>
              <FontAwesomeIcon
                icon={faDownload}
                size="1x"
                className="ml-3 text-orange-500"
              ></FontAwesomeIcon>
              <a href={props.optionalFile} download={true} content=""></a>
            </>
          )}
        </label>
        <div className="flex flex-row gap-2">
          <label
            htmlFor={props.name as string}
            className="text-xl text-stone-400 font-bold bg-gray-200 py-8 px-10 rounded-2xl"
          >
            <FontAwesomeIcon icon={faUpload} size="lg" />
          </label>

          {previewContent}
        </div>

        <input
          type="file"
          className="hidden"
          accept="application/pdf,image/*"
          id={props.name}
          onBlur={props.formik.handleBlur}
          onChange={props.onChange}
        />
      </div>
      {touched && error && isStringError && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </>
  );
};

export default DocumentInput;
