import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18next.ts";
import LoadingIndicator from "./components/LoadingIndicator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Suspense fallback={<LoadingIndicator></LoadingIndicator>}>
      <App />
    </React.Suspense>
  </StrictMode>
);
