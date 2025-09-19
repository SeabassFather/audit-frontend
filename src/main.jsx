import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntakeProvider } from "./contexts/intake";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <BrowserRouter>
      <IntakeProvider>
        <App />
      </IntakeProvider>
    </BrowserRouter>
  </ErrorBoundary>
);