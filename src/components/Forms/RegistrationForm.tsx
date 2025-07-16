import ExternalLinkInput from "../Inputs/ExternalLinkInput";
import PasswordInput from "../Inputs/PasswordInput";
import PhoneInput from "../Inputs/PhoneInput";
import TextInput from "../Inputs/TextInput";
import SectionHeader from "../SectionHeader";
import type {
  FormikFormValues,
  WorkingDetailsModel,
} from "../../utils/formikUtils";
import type { FormikProps } from "formik";
import { useState } from "react";
import HoursModal from "../Modals/HoursModal";
import WorkHourCards from "../WorkHourCards";
import { dayToNumber } from "../../utils/dayToNumber";
import SelectInput from "../Inputs/SelectInput";

type RegistrationFormProps = {
  formik: FormikProps<FormikFormValues>;
};

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [workDetailIndex, setWorkDetailIndex] = useState<number | null>(null);

  function handleSaveHours(
    day: string,
    fromHour: string,
    toHour: string
  ): void {
    const newEntry: WorkingDetailsModel = {
      day: dayToNumber(day),
      fromHour: parseInt(fromHour),
      toHour: parseInt(toHour),
      from: fromHour,
      to: toHour,
      id: 0, //FIXME: replace id with actual id
      restaurantId: 0, //FIXME: replace id with actual id
    };

    const existingWorkingDetails = [...props.formik.values.workingDetails]; //copy

    if (workDetailIndex !== null) {
      existingWorkingDetails[workDetailIndex] = newEntry;
    } else {
      existingWorkingDetails.push(newEntry);
    }

    props.formik.setFieldValue("workingDetails", [...existingWorkingDetails]);

    setWorkDetailIndex(null);
  }

  function handleEditHours(index: number) {
    setWorkDetailIndex(index);
    setModalIsOpen(true);
  }

  function hanldeDeleteHours(index: number) {
    const updated = props.formik.values.workingDetails.filter(
      (detail, idx) => idx !== index
    );
    props.formik.setFieldValue("workingDetails", updated);
  }

  return (
    <div>
      <SectionHeader
        title="Fill Out Restaurant Registration Form"
        subtitle="Fill out your personal information to create an account tied to a Restaurant and Continue"
        number={1}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 md:gap-x-10 lg:gap-x-15">
        <TextInput
          name="nameEn"
          label="Restaurant Name (English)"
          placeholder="Enter your restaurant name in English"
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="nameAr"
          label="Restaurant Name (Arabic)"
          placeholder="Enter your restaurant name in Arabic"
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          required
          type="email"
          formik={props.formik}
        />
        <TextInput
          name="bankAccountIban"
          label="Bank Account IBAN"
          placeholder="Enter your bank account IBAN"
          required
          type="text"
          formik={props.formik}
        />
        <PasswordInput
          name="password"
          label="Password"
          required
          placeholder="Enter your password"
          formik={props.formik}
        />
        {/* 
        <PasswordInput
          name="confirmPassword"
          label="confirmPassword"
          required
          placeholder="Enter your password"
          formik={props.formik}
        /> */}
        {/* You can add confirm password to state for UX but it doesn't exist in FormikFormValues */}
        <SelectInput
          formik={props.formik}
          label="Restaurant Type"
          name="foodCategories"
          options={["Healthy food", "Fast Food"]}
          placeholder="Select Type"
          required
        ></SelectInput>
        <TextInput
          name="registrationNumber"
          label="Commercial Registration Number"
          placeholder="Enter registration number consisting of 10 digits"
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="operationRepresentativeEmailAddress"
          label="Operation Representative Email"
          placeholder="Enter the restaurant representative's email"
          required
          type="email"
          formik={props.formik}
        />
        <PhoneInput
          name="operationRepresentativePhoneNumber"
          label="Operation Representative Phone"
          placeholder="Enter the restaurant representative's phone"
          required
          formik={props.formik}
        />
        <TextInput
          name="operationRepresentativeFullNameEn"
          label="Operation Representative Full Name (English)"
          placeholder="Enter the representative's full name in English"
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="operationRepresentativeFullNameAr"
          label="Operation Representative Full Name (Arabic)"
          placeholder="Enter the representative's full name in Arabic"
          required
          type="text"
          formik={props.formik}
        />
        <PhoneInput
          name="managementPhoneNumber"
          label="Management Phone Number"
          placeholder="Enter management phone number"
          required
          formik={props.formik}
        />
        <TextInput
          name="mainBranchNameAr"
          label="Main Branch Name (Arabic)"
          placeholder="Enter main branch name in Arabic"
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="mainBranchNameEn"
          label="Main Branch Name (English)"
          placeholder="Enter main branch name in English"
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchDistrict"
          label="Branch District"
          placeholder="Enter branch district"
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchAddressName"
          label="Branch Address Name"
          placeholder="Enter branch address name"
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchStreet"
          label="Branch Street"
          placeholder="Enter branch street"
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchBuildingNumber"
          label="Branch Building Number"
          placeholder="Enter branch building number"
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchAddressDescription"
          label="Branch Address Description"
          placeholder="Enter branch address description"
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="twitterSocialMediaLink"
          label="Twitter Account"
          placeholder="Enter your restaurant Twitter page"
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="instagramSocialMediaLink"
          label="Instagram Account"
          placeholder="Enter your restaurant Instagram page"
          required={false}
          type="text"
          formik={props.formik}
        />
        <ExternalLinkInput
          name="mainRestaurantBranchMapsLink"
          label="Google Maps Location"
          required={false}
          link="..."
          onClick={() => {}}
          overlay="map"
        />
        <div>
          <ExternalLinkInput
            name="workingDetails"
            label="Working hours"
            required={false}
            link="..."
            onClick={() => {
              setModalIsOpen(true);
            }}
            overlay="hours"
          />
          <WorkHourCards
            workDetails={props.formik.values.workingDetails}
            onEdit={handleEditHours}
            onDelete={hanldeDeleteHours}
          ></WorkHourCards>
        </div>
        {modalIsOpen && (
          <HoursModal
            workingHoursInstance={
              workDetailIndex !== null
                ? props.formik.values.workingDetails[workDetailIndex]
                : null
            }
            modalIsOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            formik={props.formik}
            onSave={handleSaveHours}
          ></HoursModal>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
