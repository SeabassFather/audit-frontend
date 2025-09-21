import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntakeProvider } from "./contexts/intake";
import App from "./App";

createRoot(document.getElementById("root")).render(
 <BrowserRouter>
 <IntakeProvider>
 <App />
 </IntakeProvider>
 </BrowserRouter>
);

