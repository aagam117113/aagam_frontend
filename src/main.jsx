import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Make sure this line exists

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
