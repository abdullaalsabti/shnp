import React, { useEffect } from "react";
import { Outlet, useSubmit } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useApplicationSelector } from "../store/storeHooks";
import { getRemainingTokenDuration } from "../utils/auth";
import Sidebar from "../components/Sidebar";

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
      {(!token || !refreshToken) && <NavBar></NavBar>}
      {token && refreshToken ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={true} onToggle={() => {}}></Sidebar>
          <main className="flex-1 overflow-y-auto">
            <div className="p-2 flex flex-col">
              <NavBar></NavBar>
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      ) : (
        <div className="min-h-screen">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default RootLayout;
