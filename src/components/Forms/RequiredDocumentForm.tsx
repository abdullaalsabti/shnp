import React from "react";
import { useTranslation } from "react-i18next";
import DocumentInput from "../Inputs/DocumentInput";
import SectionHeader from "../SectionHeader";
import type { FormikProps } from "formik";
import Button from "../Buttons/Button";
import {
  type FilePayload,
  type FileDataResponse,
  type FormikFormValues,
  FileInputCodes,
} from "../../utils/formikUtils";

type RequiredDocumentFormProps = {
  formik: FormikProps<FormikFormValues>;
};

const RequiredDocumentForm: React.FC<RequiredDocumentFormProps> = ({
  formik,
}) => {
  const { t } = useTranslation();

  const fileInputConfigs = [
    {
      label: t("form.documents.contract"),
      index: 0,
      optionalIcon: true,
    },
    {
      label: t("form.documents.restaurant_image"),
      index: 1,
      optionalIcon: false,
    },
    {
      label: t("form.documents.commercial_license"),
      index: 2,
      optionalIcon: false,
    },
    {
      label: t("form.documents.tax_certificate"),
      index: 3,
      optionalIcon: false,
    },
  ];
  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("could not read file"));
    });
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const base64Whole = await toBase64(file);
    console.log(base64Whole);
    const sliceIndex = base64Whole.indexOf("base64,");
    const base64 = base64Whole.slice(sliceIndex + 7);
    console.log(sliceIndex);
    console.log(base64);

    try {
      const payload: FilePayload = {
        base: base64,
        name: file.name,
      };

      const response = await fetch("https://app.shnp.me/api/blobs/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("failed to get response!");
      }
      const data: FileDataResponse = await response.json();
      const locationUrl = data.location;

      const docs = [...formik.values.documents];
      console.log("handle file change: ", index);
      docs[index] = {
        documentTypeCode: FileInputCodes.get(index) ?? "",
        urls: docs[index] ? [...docs[index].urls, locationUrl] : [locationUrl],
      };

      formik.setFieldValue("documents", docs);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="grid grid-cols-1">
        <SectionHeader
          title={t("form.documents.title")}
          subtitle={t("form.documents.subtitle")}
          number={2}
        />

        {fileInputConfigs.map((config) => (
          <DocumentInput
            key={config.index}
            label={config.label}
            name={`documents[${config.index}]`}
            onChange={(event) => {
              handleFileChange(event, config.index);
            }}
            optionalFile=""
            optionalIcon={config.optionalIcon}
            formik={formik}
            uploadedUrls={formik.values.documents[config.index]?.urls}
          />
        ))}
      </div>

      <div className="flex justify-end items-center">
        <Button type="submit" inverted={false}>
          {t("form.documents.create_account")}
        </Button>
      </div>
    </div>
  );
};

export default RequiredDocumentForm;
