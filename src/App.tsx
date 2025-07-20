import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import CreateRestaurantAccountPage from "./pages/CreateRestaurantAccount";
import { Toaster } from "../node_modules/react-hot-toast/src/components/toaster";
import useDirection from "./hooks/useDirection";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LoadingIndicator from "./components/LoadingIndicator";
import { useApplicationSelector } from "./store/storeHooks";
import { logoutAction } from "./pages/Logout";
import checkIsAuthLoader, { checkIsNotAuthLoader } from "./utils/auth";
import Dashboard from "./pages/Dashboard";
import ManageEmployees from "./pages/ManageEmployees";
import Menu from "./pages/Menu";
import Branches from "./pages/Branches";
import Orders from "./pages/Orders";
import OrderHistory from "./pages/OrderHistory";
import OpeningTimes from "./pages/OpeningTimes";
import Packages from "./pages/Packages";
import CustomerSubscriptions from "./pages/CustomerSubscriptions";
import CancelSubscriptions from "./pages/CancelSubscriptions";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "createRestaurantAccount",
        element: <CreateRestaurantAccountPage></CreateRestaurantAccountPage>,
        loader: checkIsNotAuthLoader,
      },
      {
        path: "login",
        element: <LoginPage></LoginPage>,
        loader: checkIsNotAuthLoader,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        loader: checkIsAuthLoader,
      },
      {
        path: "manageEmployees",
        element: <ManageEmployees></ManageEmployees>,
        loader: checkIsAuthLoader,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
        loader: checkIsAuthLoader,
      },
      {
        path: "branches",
        element: <Branches></Branches>,
        loader: checkIsAuthLoader,
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: checkIsAuthLoader,
      },
      {
        path: "orderHistory",
        element: <OrderHistory></OrderHistory>,
        loader: checkIsAuthLoader,
      },
      {
        path: "openingTimes",
        element: <OpeningTimes></OpeningTimes>,
        loader: checkIsAuthLoader,
      },
      {
        path: "packages",
        element: <Packages></Packages>,
        loader: checkIsAuthLoader,
      },
      {
        path: "customerSubscriptions",
        element: <CustomerSubscriptions></CustomerSubscriptions>,
        loader: checkIsAuthLoader,
      },
      {
        path: "cancelSubscriptions",
        element: <CancelSubscriptions></CancelSubscriptions>,
        loader: checkIsAuthLoader,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
        loader: checkIsAuthLoader,
      },
      {
        path: "logout",
        action: logoutAction,
        loader: logoutAction,
      },
    ],
  },
]);

function App() {
  useDirection();
  const isLoading = useApplicationSelector(
    (state) => state.loadingState.isLoading
  );

  return (
    <>
      <div className={isLoading ? "pointer-events-none" : ""}>
        <RouterProvider router={router}></RouterProvider>
      </div>
      {isLoading && <LoadingIndicator />}
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid black",
            padding: "1rem",
            fontFamily: "Urbanist",
            fontWeight: "bold",
          },
          success: {
            style: {
              background: "rgba(180, 233, 174, 0.8)",
            },
          },
          error: {
            style: {
              background: "rgba(255, 133, 133, 0.8)",
            },
          },
        }}
      ></Toaster>
    </>
  );
}

export default App;
