import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import CreateRestaurantAccountPage from "./pages/CreateRestaurantAccount";
import { Toaster } from "../node_modules/react-hot-toast/src/components/toaster";
import useDirection from "./hooks/useDirection";
import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/HomePage";
import LoadingIndicator from "./components/LoadingIndicator";
import { useApplicationSelector } from "./store/storeHooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "createRestaurantAccount",
        element: <CreateRestaurantAccountPage></CreateRestaurantAccountPage>,
      },
      {
        path: "login",
        element: <LoginSignupPage></LoginSignupPage>,
      },
      {
        path: "home",
        element: <HomePage></HomePage>,
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
      {isLoading && (
       
          <LoadingIndicator />

      )}
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
