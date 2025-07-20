import React, { useEffect, useState } from "react";
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
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setSidebarIsOpen(!sidebarIsOpen);
  }

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
      {(!token || !refreshToken) && <NavBar />}
      {token && refreshToken ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={sidebarIsOpen} onToggle={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-2 flex flex-col">
              <NavBar onSidebarToggle={toggleSidebar} />
              <Outlet />
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
