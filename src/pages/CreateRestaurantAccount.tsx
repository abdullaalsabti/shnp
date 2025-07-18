import React from "react";
import RegistrationForm from "../components/Forms/RegistrationForm";
import RequiredDocumentForm from "../components/Forms/RequiredDocumentForm";
import { useFormik } from "formik";
import type { FormikFormValues } from "../utils/formikUtils";
import { yupValidationSchema, initialValues } from "../utils/formikUtils";
import toast from "../../node_modules/react-hot-toast/src/index";
import { loadingActions } from "../store/loadingSlice";
import { useApplicationDispatch } from "../store/storeHooks";

const CreateRestaurantAccountPage: React.FC = () => {
  const dispatch = useApplicationDispatch();

  async function handleSubmitForm(values: FormikFormValues) {
    dispatch(loadingActions.setIsLoading());
    console.log("CREATING ACCOUNT");
    try {
      const response = await fetch(
        "https://app.shnp.me/api/Restaurants?locale=en",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      console.log(response);
      const data = await response.json();

      if (!response.ok || Object.keys(data).length > 0) {
        const entries = Object.entries(data);
        entries.forEach(([key, value]) => {
          toast.error(`${key} : ${value}`, {
            style: {
              border: "1px solid black",
              padding: "1rem",
              fontFamily: "Urbanist",
              fontWeight: "bold",
            },
          });
        });
      }

      console.log("ACCOUNT CREATED", data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingActions.setIsNotLoading());
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: yupValidationSchema,
    onSubmit: handleSubmitForm,
  });

  const { isSubmitting } = formik;

  return (
    <>
      <h1 className="text-3xl font-medium text-left">
        Create A Restaurant Account
      </h1>
      {/* {isSubmitting && (
        <LoadingIndicator text="Submitting..."></LoadingIndicator>
      )} */}
      <div className={`${isSubmitting ? "blur-sm pointer-events-none" : ""}`}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-400/40 border border-gray-400/40">
            <div className="p-4">
              <RegistrationForm formik={formik}></RegistrationForm>
            </div>
            <div className="p-4">
              <RequiredDocumentForm formik={formik}></RequiredDocumentForm>
            </div>
          </div>
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
          <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
        </form>
      </div>
    </>
  );
};

export default CreateRestaurantAccountPage;
