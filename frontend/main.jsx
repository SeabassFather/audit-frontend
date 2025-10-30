import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/design.css"; // Advanced styles
import "./assets/custom.css"; // Your styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
