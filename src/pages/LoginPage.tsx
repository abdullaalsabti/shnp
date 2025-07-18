import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInput from "../components/Inputs/TextInput";
import { faLock, faPerson } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "../components/Inputs/PasswordInput";
import Button from "../components/Buttons/Button";
import toast from "../../node_modules/react-hot-toast/src/index";
import { useNavigate } from "react-router-dom";
import { loadingActions } from "../store/loadingSlice";
import { useApplicationDispatch } from "../store/storeHooks";
import { authSliceActions } from "../store/authSlice";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const dispatch = useApplicationDispatch();
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
    errors: { usr: string; pas: string };
  }>({
    username: "",
    password: "",
    errors: { usr: "", pas: "" },
  });

  async function handleLogin() {
    dispatch(loadingActions.setIsLoading());
    let hasErrors = false;
    const newErrors = { usr: "", pas: "" };

    if (credentials.username.trim().length === 0) {
      newErrors.usr = t("login.validation.username_required");
      hasErrors = true;
    }

    if (credentials.password.trim().length === 0) {
      newErrors.pas = t("login.validation.password_required");
      hasErrors = true;
    }

    setCredentials((prev) => ({ ...prev, errors: newErrors }));

    if (!hasErrors) {
      // Proceed with login logic
      console.log("Login attempt with:", {
        username: credentials.username,
        password: credentials.password,
      });

      try {
        const response = await fetch(
          "https://app-stg.shnp.me/api/restaurantemployees/login?locale=en",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          }
        );

        const data = await response.json();

        if (
          !response.ok ||
          response.status === 500 ||
          response.status === 400
        ) {
          Object.entries(data).forEach(([key, value]) => {
            toast.error(`field: ${key}, error: ${value}`);
          });
          throw new Error("problem logging in!");
        }
        console.log("LOGGED IN");
        console.log("DATA");

        toast.success("logged in!");

        const jwt: string = data["jwt"];
        const refreshToken: string = data["refreshToken"];

        dispatch(
          authSliceActions.login({ token: jwt, refreshToken: refreshToken })
        );

        // localStorage.setItem("jwt", jwt);
        // localStorage.setItem("refreshToken", refreshToken);

        navigator("/Home");
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(loadingActions.setIsNotLoading());
  }

  return (
    <div className="shadow px-10 py-10 flex flex-col justify-evenly items-center max-w-100 m-auto md:max-w-130">
      <img
        className="w-40 h-40 object-cover"
        src="/shanabLogo.png"
        alt="logo of shanap company"
      />
      <h2 className="text-center mt-1 mb-2 font-bold text-3xl">
        {t("login.title")}
      </h2>
      <p className="text-center mt-1 mb-2 font-medium">{t("login.subtitle")}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <TextInput
          label={t("login.username")}
          name="username"
          leadingIcon={faPerson}
          placeholder={t("login.username_placeholder")}
          type="text"
          required={true}
          onChange={(event) => {
            setCredentials((prev) => ({
              ...prev,
              username: event.target.value,
              errors: { ...prev.errors, usr: "" },
            }));
          }}
          value={credentials.username}
        />
        {credentials.errors.usr && (
          <span className="text-red-500 text-sm -mt-3 mb-2 text-left w-full">
            {credentials.errors.usr}
          </span>
        )}
        <PasswordInput
          name="password"
          label={t("login.password")}
          placeholder={t("login.password_placeholder")}
          leadingIcon={faLock}
          required={true}
          value={credentials.password}
          onChange={(event) =>
            setCredentials((prev) => ({
              ...prev,
              password: event.target.value,
              errors: { ...prev.errors, pas: "" },
            }))
          }
        />
        {credentials.errors.pas && (
          <span className="text-red-500 text-sm -mt-3 mb-2 text-left w-full">
            {credentials.errors.pas}
          </span>
        )}
        <div className="flex gap-2">
          <p className="font-medium">{t("login.forgot_password")}</p>
          <a
            href="#"
            className="text-orange-500 active:text-orange-500 hover:text-orange-700 underline"
          >
            {t("login.reset_password")}
          </a>
        </div>
        <Button
          additionalStyles="py-2 rounded-xl my-4 text-xl w-full"
          type="submit"
        >
          {t("login.join_button")}
        </Button>

        <Button
          additionalStyles="rounded-xl w-full"
          inverted={true}
          onClick={() => {
            navigator("/createRestaurantAccount");
          }}
        >
          {t("login.signup_button")}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
