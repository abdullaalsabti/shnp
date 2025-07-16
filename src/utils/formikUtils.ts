import * as Yup from "yup";

export interface Document {
  documentTypeCode: string;
  urls: string[];
}

export interface WorkingDetailsModel {
  day: number; // DayOfWeek can be represented as number or string depending on usage
  from: string;
  to: string;
  id: number;
  restaurantId: number;
  fromHour: number;
  toHour: number;
}

export type FormikFormValues = {
  nameAr: string;
  nameEn: string;
  password: string;
  imageUrl: string;
  preferredLocale: string;
  district: string;
  documents: Document[];
  city: string;
  operationRepresentativePhoneNumber: string;
  email: string;
  foodCategories: number[];
  instagramSocialMediaLink: string;
  twitterSocialMediaLink: string;
  bankAccountIban: string;
  managementPhoneNumber: string;
  registrationNumber: string;
  workingDetails: WorkingDetailsModel[];
  operationRepresentativeFullNameAr: string;
  operationRepresentativeFullNameEn: string;
  operationRepresentativeEmailAddress: string;
  mainRestaurantBranchMapsLink: string;
  mainBranchNameEn: string;
  mainBranchNameAr: string;
  longitude: number;
  latitude: number;
  branchAddressName: string;
  branchStreet: string;
  branchAddressDescription: string;
  branchBuildingNumber: string;
  branchDistrict: string;
  branchCountry: string;
  branchCity: string;
};

export const initialValues: FormikFormValues = {
  nameAr: "",
  nameEn: "",
  password: "",
  imageUrl: "",
  preferredLocale: "",
  district: "",
  documents: [],
  city: "",
  operationRepresentativePhoneNumber: "",
  email: "",
  foodCategories: [],
  instagramSocialMediaLink: "",
  twitterSocialMediaLink: "",
  bankAccountIban: "",
  managementPhoneNumber: "",
  registrationNumber: "",
  workingDetails: [],
  operationRepresentativeFullNameAr: "",
  operationRepresentativeFullNameEn: "",
  operationRepresentativeEmailAddress: "",
  mainRestaurantBranchMapsLink: "",
  mainBranchNameEn: "",
  mainBranchNameAr: "",
  longitude: 0,
  latitude: 0,
  branchAddressName: "",
  branchStreet: "",
  branchAddressDescription: "",
  branchBuildingNumber: "",
  branchDistrict: "",
  branchCountry: "",
  branchCity: "",
};

export const yupValidationSchema = Yup.object({
  nameAr: Yup.string().required("Required"),
  nameEn: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  // imageUrl: Yup.string().required("Required"),
  // preferredLocale: Yup.string().required("Required"),
  // district: Yup.string().required("Required"),
  documents: Yup.array().of(Yup.object()).required("Required"),
  // city: Yup.string().required("Required"),
  operationRepresentativePhoneNumber: Yup.string().required("Required"),
  email: Yup.string().email("Enter a valid email").required("Required"),
  foodCategories: Yup.array()
    .of(Yup.number())
    .min(1, "Select at least one category")
    .required("Required"),
  // instagramSocialMediaLink: Yup.string().required("Required"),
  // twitterSocialMediaLink: Yup.string().required("Required"),
  bankAccountIban: Yup.string().required("Required"),
  managementPhoneNumber: Yup.string().required("Required"),
  registrationNumber: Yup.string().required("Required"),
  workingDetails: Yup.array().of(Yup.object()).required("Required"),
  operationRepresentativeFullNameAr: Yup.string().required("Required"),
  operationRepresentativeFullNameEn: Yup.string().required("Required"),
  operationRepresentativeEmailAddress: Yup.string()
    .email("Enter a valid email")
    .required("Required"),
  // mainRestaurantBranchMapsLink: Yup.string().required("Required"),
  // mainBranchNameEn: Yup.string().required("Required"),
  // mainBranchNameAr: Yup.string().required("Required"),
  // longitude: Yup.number().required("Required"),
  // latitude: Yup.number().required("Required"),
  // branchAddressName: Yup.string().required("Required"),
  // branchStreet: Yup.string().required("Required"),
  // branchAddressDescription: Yup.string().required("Required"),
  // branchBuildingNumber: Yup.string().required("Required"),
  // branchDistrict: Yup.string().required("Required"),
  // branchCountry: Yup.string().required("Required"),
  // branchCity: Yup.string().required("Required"),
});

export type FilePayload = {
  base: string;
  name: string;
};
export type FileDataResponse = {
  location: string;
  size: number;
  mimeType: string | null;
  name: string;
};

export const FileInputCodes = new Map<number, string>([
  [0, "RestaurantContract"],
  [1, "TaxCertificateNumber"],
  [2, "CompanyTaxRegistryRepresentative"],
  [3, "CommercialLicenseNumber"],
]);
