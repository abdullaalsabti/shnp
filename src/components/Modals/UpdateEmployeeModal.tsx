import React, { useState } from "react";
import ReusableModal from "./ReusableModal";
import { useFormik } from "formik";
import {
  initialFormikUpdateEmployeeFormValues,
  yupUpdateEmployeeFormValidationSchema,
  type FormikUpdateEmployeeFormValues,
} from "../../utils/formikUpdateEmployeeUtils";
import TextInput from "../Inputs/TextInput";
import PhoneInput from "../Inputs/PhoneInput";
import SelectInput from "../Inputs/SelectInput";
import DateInput from "../Inputs/DateInput";
import {
  useApplicationDispatch,
  useApplicationSelector,
} from "../../store/storeHooks";
import { useTranslation } from "react-i18next";
import { loadingActions } from "../../store/loadingSlice";
import toast from "react-hot-toast";

type UpdateEmployeeModalProps = {
  modalIsOpen: boolean;
  onClose: () => void;
  onSave: (info: FormikUpdateEmployeeFormValues) => void;
};

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  modalIsOpen,
}) => {
  const employeeProfile = useApplicationSelector(
    (state) => state.restaurantEmployeeProfile.profile
  );
  const authState = useApplicationSelector((state) => state.authState);
  const formik = useFormik({
    initialValues: initialFormikUpdateEmployeeFormValues,
    validationSchema: yupUpdateEmployeeFormValidationSchema,
    onSubmit: handleSaveInputs,
  });

  const { i18n } = useTranslation();
  const dispatch = useApplicationDispatch();

  async function handleSaveInputs(values: FormikUpdateEmployeeFormValues) {
    dispatch(loadingActions.setIsLoading());
    formik.setFieldValue("id", employeeProfile!.id);
    formik.setFieldValue("owner", employeeProfile!.owner);
    formik.setFieldValue("preferredLocale", i18n.language);
    console.log("UPDATING EMPLOYEE...");
    try {
      const response = await fetch(
        `https://app-stg.shnp.me/api/RestaurantEmployees/${
          employeeProfile!.id
        }/update?locale=${i18n.language}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${authState.token}`,
          },
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Unknown error occurred");
        console.log(err);
      }
    } finally {
      dispatch(loadingActions.setIsNotLoading());
    }
  }

  return (
    <ReusableModal
      modalIsOpen={modalIsOpen}
      onClose={() => {}}
      onSave={() => formik.handleSubmit()}
      title="Update Employee"
    >
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-10">
        <TextInput
          label="Name in Arabic"
          required={true}
          name="fullNameAr"
          type="text"
          formik={formik}
          formikName={"fullNameAr"}
          placeholder="REPLACE ME LATER"
          // FIXME: replace placeholder text
        ></TextInput>
        <TextInput
          label="Name in English"
          required={true}
          name="fullNameEn"
          type="text"
          formik={formik}
          formikName={"fullNameEn"}
          placeholder="REPLACE ME LATER"
          // FIXME: replace placeholder text
        ></TextInput>
        <TextInput
          label="Email"
          required={true}
          name="email"
          type="email"
          formik={formik}
          formikName={"email"}
          placeholder="REPLACE ME LATER"
          // FIXME: replace placeholder text
        ></TextInput>
        <PhoneInput
          formik={formik}
          label="Phone Number"
          required={true}
          name="mobile"
          placeholder="0799999"
          // FIXME: replace placeholder text
        ></PhoneInput>
      </div>
      <div className="w-full">
        <SelectInput
          formik={formik}
          label="Roles"
          name="roles"
          options={[]}
          placeholder="Roles"
          required={false}
          valueNotIndex={false}
          // FIXME: ADD ROLES FROM THE STATE.
        ></SelectInput>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-10">
        <DateInput
          label="Date of Birth"
          name="dateOfBirth"
          placeholder=""
          required={false}
          formik={formik}
          formikName="dateOfBirth"
        ></DateInput>
        <SelectInput
          formik={formik}
          valueNotIndex={true}
          label="Gender"
          name="gender"
          options={["Male", "Female"]}
          placeholder="select your gender"
          required={false}
          // FIXME: FIX PLACEHOLDER FROM THE STATE.
        ></SelectInput>
      </div>
    </ReusableModal>
  );
};

export default UpdateEmployeeModal;
