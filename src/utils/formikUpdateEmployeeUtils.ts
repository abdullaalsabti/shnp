import * as Yup from "yup";

export type FormikUpdateEmployeeFormValues = {
  dateOfBirth: string;
  email: string;
  fullNameAr: string;
  fullNameEn: string;
  gender: string;
  id: number;
  mobile: string;
  owner: boolean;
  preferredLocale: string;
  roles: string[];
};

export const initialFormikUpdateEmployeeFormValues: FormikUpdateEmployeeFormValues =
  {
    dateOfBirth: "",
    email: "",
    fullNameAr: "",
    fullNameEn: "",
    gender: "",
    id: 0,
    mobile: "",
    owner: false,
    preferredLocale: "en",
    roles: [],
  };

export const yupUpdateEmployeeFormValidationSchema = Yup.object({
  dateOfBirth: Yup.string().required("This field is required"),
  email: Yup.string()
    .required("This field is required")
    .email("must be a valid email"),
  fullNameAr: Yup.string().required("This field is required"),
  fullNameEn: Yup.string().required("This field is required"),
  gender: Yup.string().required("This field is required"),
  id: Yup.number().required("this field is required"),
  mobile: Yup.string().required("This field is required"),
  owner: Yup.boolean().required("This field is required"),
  preferredLocale: Yup.string().required("This field is required"),
  roles: Yup.array().of(Yup.string()),
});
