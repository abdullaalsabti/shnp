import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import CreateRestaurantAccountPage from "./pages/CreateRestaurantAccount";
import { Toaster } from "../node_modules/react-hot-toast/src/components/toaster";
import useDirection from "./hooks/useDirection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "createRestaurantAccount",
        element: <CreateRestaurantAccountPage></CreateRestaurantAccountPage>,
      },
    ],
  },
]);

function App() {
  useDirection();

  return (
    <>
      <RouterProvider router={router}></RouterProvider>;<Toaster></Toaster>
    </>
  );
}

export default App;
