import React, { useEffect } from "react";
import { Outlet, useSubmit } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useApplicationSelector } from "../store/storeHooks";
import { getRemainingTokenDuration } from "../utils/auth";

const RootLayout: React.FC = () => {
  const { token, refreshToken } = useApplicationSelector(
    (state) => state.authState
  );
  const submit = useSubmit();

  useEffect(() => {
    if (!token || !refreshToken) {
      return;
    }

    const remainingTime = getRemainingTokenDuration();
    console.log(remainingTime);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, remainingTime);
  }, [token, refreshToken, submit]);

  return (
    <>
      <NavBar></NavBar>
      <Outlet />
    </>
  );
};

export default RootLayout;
