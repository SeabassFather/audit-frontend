import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// If you have CSS or index.scss, import it here (uncomment if needed)
// import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error(
    'Root element not found: add <div id="root"></div> to your index.html'
  );
}

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
