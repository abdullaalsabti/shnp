import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18next.ts";
import LoadingIndicator from "./components/LoadingIndicator.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={<LoadingIndicator></LoadingIndicator>}>
        <App />
      </React.Suspense>
    </Provider>
  </StrictMode>
);
