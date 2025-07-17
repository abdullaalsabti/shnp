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
import { useTranslation } from "react-i18next";
import HoursModal from "../Modals/HoursModal";
import WorkHourCards from "../WorkHourCards";
import { dayToNumber } from "../../utils/dayToNumber";
import SelectInput from "../Inputs/SelectInput";
import getRandomId from "../../utils/getRandomId";

type RegistrationFormProps = {
  formik: FormikProps<FormikFormValues>;
};

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const { t } = useTranslation();
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
      id: getRandomId(), //FIXME: replace id with actual id
      restaurantId: 0,
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

  console.log(
    workDetailIndex,
    props.formik.values.workingDetails[workDetailIndex ?? 0]
  );

  function handleEditHours(index: number) {
    console.log("editing work detail at index: ", index);
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
        title={t("form.registration.title")}
        subtitle={t("form.registration.subtitle")}
        number={1}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 md:gap-x-10 lg:gap-x-15">
        <TextInput
          name="nameEn"
          label={t("form.registration.restaurant_name_en")}
          placeholder={t("form.placeholders.restaurant_name_en")}
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="nameAr"
          label={t("form.registration.restaurant_name_ar")}
          placeholder={t("form.placeholders.restaurant_name_ar")}
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="email"
          label={t("form.registration.email")}
          placeholder={t("form.placeholders.email")}
          required
          type="email"
          formik={props.formik}
        />
        <TextInput
          name="bankAccountIban"
          label={t("form.registration.bank_iban")}
          placeholder={t("form.placeholders.bank_iban")}
          required
          type="text"
          formik={props.formik}
        />
        <PasswordInput
          name="password"
          label={t("form.registration.password")}
          required
          placeholder={t("form.placeholders.password")}
          formik={props.formik}
        />
        <SelectInput
          formik={props.formik}
          label={t("form.registration.restaurant_type")}
          name="foodCategories"
          options={["Healthy food", "Fast Food"]}
          placeholder={t("form.placeholders.select_type")}
          required
        ></SelectInput>
        <TextInput
          name="registrationNumber"
          label={t("form.registration.registration_number")}
          placeholder={t("form.placeholders.registration_number")}
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="operationRepresentativeEmailAddress"
          label={t("form.registration.rep_email")}
          placeholder={t("form.placeholders.rep_email")}
          required
          type="email"
          formik={props.formik}
        />
        <PhoneInput
          name="operationRepresentativePhoneNumber"
          label={t("form.registration.rep_phone")}
          placeholder={t("form.placeholders.rep_phone")}
          required
          formik={props.formik}
        />
        <TextInput
          name="operationRepresentativeFullNameEn"
          label={t("form.registration.rep_name_en")}
          placeholder={t("form.placeholders.rep_name_en")}
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="operationRepresentativeFullNameAr"
          label={t("form.registration.rep_name_ar")}
          placeholder={t("form.placeholders.rep_name_ar")}
          required
          type="text"
          formik={props.formik}
        />
        <PhoneInput
          name="managementPhoneNumber"
          label={t("form.registration.management_phone")}
          placeholder={t("form.placeholders.management_phone")}
          required
          formik={props.formik}
        />
        <TextInput
          name="mainBranchNameAr"
          label={t("form.registration.branch_name_ar")}
          placeholder={t("form.placeholders.branch_name_ar")}
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="mainBranchNameEn"
          label={t("form.registration.branch_name_en")}
          placeholder={t("form.placeholders.branch_name_en")}
          required
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchDistrict"
          label={t("form.registration.branch_district")}
          placeholder={t("form.placeholders.branch_district")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchAddressName"
          label={t("form.registration.branch_address")}
          placeholder={t("form.placeholders.branch_address")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchStreet"
          label={t("form.registration.branch_street")}
          placeholder={t("form.placeholders.branch_street")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchBuildingNumber"
          label={t("form.registration.branch_building")}
          placeholder={t("form.placeholders.branch_building")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="branchAddressDescription"
          label={t("form.registration.branch_description")}
          placeholder={t("form.placeholders.branch_description")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="twitterSocialMediaLink"
          label={t("form.registration.twitter")}
          placeholder={t("form.placeholders.twitter")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <TextInput
          name="instagramSocialMediaLink"
          label={t("form.registration.instagram")}
          placeholder={t("form.placeholders.instagram")}
          required={false}
          type="text"
          formik={props.formik}
        />
        <ExternalLinkInput
          name="mainRestaurantBranchMapsLink"
          label={t("form.registration.maps_location")}
          required={false}
          link="..."
          onClick={() => {}}
          overlay="map"
        />
        <div>
          <ExternalLinkInput
            name="workingDetails"
            label={t("form.registration.working_hours")}
            required={false}
            link="..."
            onClick={() => {
              console.log("adding new detail...");
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
